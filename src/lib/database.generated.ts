/**
 * Generated from the live Supabase migrations imported on 2026-07-18 for
 * project uipsaeojwjehrbylfgrx. Regenerate after every forward migration.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Table<Row, Insert, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type ProfileRow = {
  account_status: string;
  created_at: string;
  display_name: string | null;
  updated_at: string;
  user_id: string;
};

export type Database = {
  public: {
    Tables: {
      account_deletion_requests: Table<
        { execute_after: string; request_id: string; requested_at: string; user_id: string },
        { execute_after: string; request_id?: string; requested_at?: string; user_id: string }
      >;
      course_entitlements: Table<
        {
          course_id: string;
          created_at: string;
          granted_at: string;
          id: string;
          revoked_at: string | null;
          source: string;
          source_ref: string | null;
          user_id: string;
        },
        {
          course_id: string;
          created_at?: string;
          granted_at?: string;
          id?: string;
          revoked_at?: string | null;
          source: string;
          source_ref?: string | null;
          user_id: string;
        }
      >;
      course_progress: Table<
        { completed_at: string; course_id: string; module_id: string; user_id: string },
        { completed_at?: string; course_id: string; module_id: string; user_id: string }
      >;
      depot_entitlements: Table<
        {
          activated_at: string | null;
          active_until: string | null;
          created_at: string;
          grace_until: string | null;
          grant_kind: string;
          granted_at: string;
          id: string;
          revoked_at: string | null;
          source_ref: string | null;
          user_id: string;
        },
        {
          activated_at?: string | null;
          active_until?: string | null;
          created_at?: string;
          grace_until?: string | null;
          grant_kind: string;
          granted_at?: string;
          id?: string;
          revoked_at?: string | null;
          source_ref?: string | null;
          user_id: string;
        }
      >;
      device_imports: Table<
        {
          batch_id: string;
          id: string;
          imported_at: string;
          imported_cycles: number;
          imported_decisions: number;
          imported_observations: number;
          imported_practices: number;
          source_fingerprint: string;
          source_schema_version: number;
          user_id: string;
        },
        {
          batch_id: string;
          id?: string;
          imported_at?: string;
          imported_cycles?: number;
          imported_decisions?: number;
          imported_observations?: number;
          imported_practices?: number;
          source_fingerprint: string;
          source_schema_version: number;
          user_id: string;
        }
      >;
      observation_notes: Table<
        {
          body: string;
          created_at: string;
          observation_id: string;
          sync_consent_at: string;
          updated_at: string;
          user_id: string;
        },
        {
          body: string;
          created_at?: string;
          observation_id: string;
          sync_consent_at: string;
          updated_at?: string;
          user_id: string;
        }
      >;
      observations: Table<
        {
          action_choice: string;
          created_at: string;
          cycle_id: string;
          id: string;
          observation_choice: string | null;
          parent_energy: string | null;
          practice_id: string;
          step: number;
          user_id: string;
        },
        {
          action_choice: string;
          created_at?: string;
          cycle_id: string;
          id: string;
          observation_choice?: string | null;
          parent_energy?: string | null;
          practice_id: string;
          step: number;
          user_id: string;
        }
      >;
      practice_cycles: Table<
        {
          current_step: number;
          ended_at: string | null;
          id: string;
          plan_snapshot: Json;
          practice_id: string;
          practice_revision: number;
          started_at: string;
          status: string;
          user_id: string;
        },
        {
          current_step?: number;
          ended_at?: string | null;
          id: string;
          plan_snapshot: Json;
          practice_id: string;
          practice_revision: number;
          started_at?: string;
          status?: string;
          user_id: string;
        }
      >;
      practices: Table<
        {
          age_track: string;
          boundary: string;
          created_at: string;
          expression_variant: string;
          id: string;
          language_child: string | null;
          language_other_adult: string | null;
          language_self: string | null;
          low_capacity_action: Json;
          normal_action: Json;
          principle_id: string;
          revision: number;
          signal: Json;
          situation: Json;
          status: string;
          template_id: string;
          template_version: number;
          tired_action: Json;
          title: string;
          updated_at: string;
          user_id: string;
          value: Json;
        },
        {
          age_track: string;
          boundary: string;
          created_at?: string;
          expression_variant: string;
          id: string;
          language_child?: string | null;
          language_other_adult?: string | null;
          language_self?: string | null;
          low_capacity_action: Json;
          normal_action: Json;
          principle_id: string;
          revision?: number;
          signal: Json;
          situation: Json;
          status?: string;
          template_id: string;
          template_version: number;
          tired_action: Json;
          title: string;
          updated_at?: string;
          user_id: string;
          value: Json;
        }
      >;
      profiles: Table<
        ProfileRow,
        {
          account_status?: string;
          created_at?: string;
          display_name?: string | null;
          updated_at?: string;
          user_id: string;
        }
      >;
      saved_language_cards: Table<
        { card_id: string; content_version: number; saved_at: string; user_id: string },
        { card_id: string; content_version?: number; saved_at?: string; user_id: string }
      >;
      sunday_decisions: Table<
        {
          created_at: string;
          cycle_id: string;
          decision: string;
          id: string;
          practice_id: string;
          size_choice: string;
          user_id: string;
        },
        {
          created_at?: string;
          cycle_id: string;
          decision: string;
          id: string;
          practice_id: string;
          size_choice: string;
          user_id: string;
        }
      >;
      sunday_notes: Table<
        {
          created_at: string;
          decision_id: string;
          observation_text: string | null;
          sync_consent_at: string;
          updated_at: string;
          user_id: string;
          user_note: string | null;
        },
        {
          created_at?: string;
          decision_id: string;
          observation_text?: string | null;
          sync_consent_at: string;
          updated_at?: string;
          user_id: string;
          user_note?: string | null;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: {
      activate_included_depot_access: { Args: Record<PropertyKey, never>; Returns: Json };
      activate_practice: {
        Args: { p_payload: Json; p_replace_active?: boolean };
        Returns: Json;
      };
      cancel_account_deletion: { Args: Record<PropertyKey, never>; Returns: Json };
      current_account_is_active: { Args: Record<PropertyKey, never>; Returns: boolean };
      current_depot_access_state: { Args: Record<PropertyKey, never>; Returns: string };
      delete_observation_note: { Args: { p_observation_id: string }; Returns: boolean };
      delete_sunday_note: { Args: { p_decision_id: string }; Returns: boolean };
      ensure_profile: { Args: Record<PropertyKey, never>; Returns: ProfileRow };
      get_account_state: { Args: Record<PropertyKey, never>; Returns: Json };
      import_local_practice_batch: {
        Args: { p_batch_id: string; p_payload: Json };
        Returns: Json;
      };
      land_practice_cycle: { Args: { p_payload: Json }; Returns: Json };
      record_observation: { Args: { p_payload: Json }; Returns: Json };
      request_account_deletion: { Args: Record<PropertyKey, never>; Returns: Json };
      save_observation_note: {
        Args: { p_body: string; p_consent: boolean; p_observation_id: string };
        Returns: Json;
      };
      save_sunday_note: {
        Args: {
          p_consent: boolean;
          p_decision_id: string;
          p_observation_text: string;
          p_user_note: string;
        };
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type PublicTables = Database['public']['Tables'];
export type Tables<Name extends keyof PublicTables> = PublicTables[Name]['Row'];
export type TablesInsert<Name extends keyof PublicTables> = PublicTables[Name]['Insert'];
export type TablesUpdate<Name extends keyof PublicTables> = PublicTables[Name]['Update'];
