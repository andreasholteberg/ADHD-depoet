-- Imported from the live Supabase migration history for project uipsaeojwjehrbylfgrx.
-- Live migration name: depot_schema. Do not edit retroactively.

create extension if not exists pgcrypto with schema extensions;
create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  account_status text not null default 'active'
    check (account_status in ('active', 'deletion_pending')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.account_deletion_requests (
  user_id uuid primary key references public.profiles (user_id) on delete cascade,
  request_id uuid not null default gen_random_uuid() unique,
  requested_at timestamptz not null default now(),
  execute_after timestamptz not null
);
create table public.course_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  course_id text not null,
  granted_at timestamptz not null default now(),
  source text not null check (source in ('purchase', 'manual')),
  source_ref text unique,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
create index course_entitlements_user_id_idx
  on public.course_entitlements (user_id);
create table public.depot_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  grant_kind text not null check (grant_kind in ('included', 'renewal', 'manual')),
  granted_at timestamptz not null default now(),
  activated_at timestamptz,
  active_until timestamptz,
  grace_until timestamptz,
  source_ref text unique,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  constraint depot_entitlement_dates_are_ordered check (
    (activated_at is null and active_until is null and grace_until is null)
    or (
      activated_at is not null
      and active_until is not null
      and grace_until is not null
      and activated_at <= active_until
      and active_until <= grace_until
    )
  )
);
create index depot_entitlements_user_id_idx
  on public.depot_entitlements (user_id);
create table public.course_progress (
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  course_id text not null,
  module_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_id, module_id)
);
create table public.saved_language_cards (
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  card_id text not null,
  content_version integer not null default 1 check (content_version > 0),
  saved_at timestamptz not null default now(),
  primary key (user_id, card_id)
);
create table public.practices (
  id uuid primary key,
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  template_id text not null,
  template_version integer not null check (template_version > 0),
  principle_id text not null,
  title text not null,
  status text not null default 'active' check (status in ('active', 'retired')),
  revision integer not null default 1 check (revision > 0),
  age_track text not null check (age_track in ('6_12', '13_17')),
  expression_variant text not null
    check (expression_variant in ('outward', 'locked', 'withdrawn', 'variable')),
  situation jsonb not null,
  signal jsonb not null,
  value jsonb not null,
  normal_action jsonb not null,
  tired_action jsonb not null,
  low_capacity_action jsonb not null,
  boundary text not null,
  language_self text,
  language_child text,
  language_other_adult text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);
create unique index one_active_practice_per_user
  on public.practices (user_id)
  where status = 'active';
create table public.practice_cycles (
  id uuid primary key,
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  practice_id uuid not null,
  practice_revision integer not null check (practice_revision > 0),
  plan_snapshot jsonb not null,
  status text not null default 'active' check (status in ('active', 'landed')),
  current_step integer not null default 1 check (current_step between 1 and 7),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  unique (id, user_id),
  foreign key (practice_id, user_id)
    references public.practices (id, user_id) on delete cascade,
  constraint landed_cycle_has_end check (
    (status = 'active' and ended_at is null)
    or (status = 'landed' and ended_at is not null)
  )
);
create unique index one_active_cycle_per_practice
  on public.practice_cycles (practice_id)
  where status = 'active';
create index practice_cycles_user_id_idx
  on public.practice_cycles (user_id);
create table public.observations (
  id uuid primary key,
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  practice_id uuid not null,
  cycle_id uuid not null,
  step integer not null check (step between 1 and 7),
  parent_energy text check (parent_energy in ('rom', 'sliten', 'tom')),
  action_choice text not null check (
    action_choice in (
      'noticed', 'prepared', 'tried_normal', 'tried_small', 'repaired', 'not_today'
    )
  ),
  observation_choice text check (
    observation_choice in ('more_room', 'about_same', 'more_friction', 'varied', 'not_sure')
  ),
  created_at timestamptz not null default now(),
  unique (id, user_id),
  foreign key (practice_id, user_id)
    references public.practices (id, user_id) on delete cascade,
  foreign key (cycle_id, user_id)
    references public.practice_cycles (id, user_id) on delete cascade
);
create index observations_cycle_id_idx on public.observations (cycle_id, created_at);
create index observations_user_id_idx on public.observations (user_id);
create table public.observation_notes (
  observation_id uuid primary key,
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  body text not null check (length(body) between 1 and 5000),
  sync_consent_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (observation_id, user_id)
    references public.observations (id, user_id) on delete cascade
);
create table public.sunday_decisions (
  id uuid primary key,
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  practice_id uuid not null,
  cycle_id uuid not null,
  size_choice text not null check (
    size_choice in (
      'too_large', 'about_possible', 'smaller_than_needed', 'varied', 'not_enough_experience'
    )
  ),
  decision text not null check (decision in ('repeat', 'shrink', 'move', 'replace', 'retire')),
  created_at timestamptz not null default now(),
  unique (id, user_id),
  foreign key (practice_id, user_id)
    references public.practices (id, user_id) on delete cascade,
  foreign key (cycle_id, user_id)
    references public.practice_cycles (id, user_id) on delete cascade
);
create index sunday_decisions_user_id_idx on public.sunday_decisions (user_id);
create table public.sunday_notes (
  decision_id uuid primary key,
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  observation_text text check (length(observation_text) <= 5000),
  user_note text check (length(user_note) <= 5000),
  sync_consent_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (decision_id, user_id)
    references public.sunday_decisions (id, user_id) on delete cascade,
  constraint sunday_note_has_content check (
    nullif(trim(observation_text), '') is not null
    or nullif(trim(user_note), '') is not null
  )
);
create table public.device_imports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (user_id) on delete cascade,
  batch_id uuid not null,
  source_schema_version integer not null check (source_schema_version > 0),
  source_fingerprint text not null,
  imported_practices integer not null default 0 check (imported_practices >= 0),
  imported_cycles integer not null default 0 check (imported_cycles >= 0),
  imported_observations integer not null default 0 check (imported_observations >= 0),
  imported_decisions integer not null default 0 check (imported_decisions >= 0),
  imported_at timestamptz not null default now(),
  unique (user_id, batch_id)
);
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function public.set_updated_at() from public, anon, authenticated;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();
create trigger practices_set_updated_at
before update on public.practices
for each row execute function public.set_updated_at();
create trigger observation_notes_set_updated_at
before update on public.observation_notes
for each row execute function public.set_updated_at();
create trigger sunday_notes_set_updated_at
before update on public.sunday_notes
for each row execute function public.set_updated_at();
