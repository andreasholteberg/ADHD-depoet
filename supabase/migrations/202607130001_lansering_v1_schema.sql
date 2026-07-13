-- Depoet lansering v1: code-ready Supabase schema.
-- This migration is committed as source only. It must be reviewed and applied
-- explicitly in a Supabase project before any live backend is enabled.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  email text,
  current_focus text,
  selected_weekly_goal text,
  onboarding_answers jsonb,
  sync_consent jsonb,
  free_text_sync_consent jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_cards (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

create table if not exists public.opt_ins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  opt_ins jsonb,
  pause_until text check (pause_until is null or pause_until in ('one_week', 'one_month', 'indefinite')),
  email_consent jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reflections (
  user_id uuid not null references auth.users(id) on delete cascade,
  local_id text not null,
  date text,
  check_in text,
  reflection text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, local_id)
);

create table if not exists public.sunday_reports (
  user_id uuid not null references auth.users(id) on delete cascade,
  local_id text not null,
  report_date timestamptz,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, local_id)
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'pending' check (status in ('pending', 'active', 'unsubscribed', 'bounced')),
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  subscriber_id uuid references public.subscribers(id) on delete cascade,
  type text not null,
  status text not null default 'pending' check (status in ('pending', 'granted', 'revoked')),
  version text not null,
  text_snapshot text,
  consented_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.send_log (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid references public.subscribers(id) on delete set null,
  message_type text not null,
  variant_key text,
  sent_at timestamptz not null default now(),
  provider_message_id text
);

create table if not exists public.pauses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  subscriber_id uuid references public.subscribers(id) on delete cascade,
  pause_until text,
  resume_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.saved_cards enable row level security;
alter table public.progress enable row level security;
alter table public.opt_ins enable row level security;
alter table public.reflections enable row level security;
alter table public.sunday_reports enable row level security;
alter table public.subscribers enable row level security;
alter table public.consents enable row level security;
alter table public.send_log enable row level security;
alter table public.pauses enable row level security;

drop policy if exists "profiles own rows" on public.profiles;
create policy "profiles own rows" on public.profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "saved_cards own rows" on public.saved_cards;
create policy "saved_cards own rows" on public.saved_cards
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "progress own rows" on public.progress;
create policy "progress own rows" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "opt_ins own rows" on public.opt_ins;
create policy "opt_ins own rows" on public.opt_ins
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "reflections own rows" on public.reflections;
create policy "reflections own rows" on public.reflections
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "sunday_reports own rows" on public.sunday_reports;
create policy "sunday_reports own rows" on public.sunday_reports
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Email/subscriber tables intentionally have no anon/authenticated policies.
-- Supabase Edge Functions use service role for double opt-in, unsubscribe,
-- preference updates, dispatch and send logs.

create or replace function public.delete_current_user_data()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'not_authenticated';
  end if;

  delete from public.sunday_reports where user_id = current_user_id;
  delete from public.reflections where user_id = current_user_id;
  delete from public.opt_ins where user_id = current_user_id;
  delete from public.progress where user_id = current_user_id;
  delete from public.saved_cards where user_id = current_user_id;
  delete from public.pauses where user_id = current_user_id;
  update public.subscribers
    set user_id = null, updated_at = now()
    where user_id = current_user_id;
  delete from public.consents where user_id = current_user_id;
  delete from public.profiles where user_id = current_user_id;
end;
$$;

revoke all on function public.delete_current_user_data() from public;
grant execute on function public.delete_current_user_data() to authenticated;
