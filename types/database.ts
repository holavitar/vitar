export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      institutions: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          institution_id: string | null;
          role: "institution" | "patient";
          email: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id: string;
          institution_id?: string | null;
          role: "institution" | "patient";
          email: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          institution_id?: string | null;
          role?: "institution" | "patient";
          email?: string;
          name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      patients: {
        Row: {
          id: string;
          institution_id: string;
          name: string;
          condition: string;
          risk: "low" | "medium" | "high";
          adherence: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          institution_id: string;
          name: string;
          condition: string;
          risk: "low" | "medium" | "high";
          adherence: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          institution_id?: string;
          name?: string;
          condition?: string;
          risk?: "low" | "medium" | "high";
          adherence?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      medications: {
        Row: {
          id: string;
          patient_id: string;
          name: string;
          dose: string;
          schedule: string;
          frequency: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          name: string;
          dose: string;
          schedule: string;
          frequency: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          name?: string;
          dose?: string;
          schedule?: string;
          frequency?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      medication_logs: {
        Row: {
          id: string;
          medication_id: string;
          patient_id: string;
          taken_at: string;
          status: "taken" | "missed" | "pending";
          created_at: string;
        };
        Insert: {
          id?: string;
          medication_id: string;
          patient_id: string;
          taken_at: string;
          status: "taken" | "missed" | "pending";
          created_at?: string;
        };
        Update: {
          id?: string;
          medication_id?: string;
          patient_id?: string;
          taken_at?: string;
          status?: "taken" | "missed" | "pending";
          created_at?: string;
        };
        Relationships: [];
      };
      symptoms: {
        Row: {
          id: string;
          patient_id: string;
          type: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          type: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          type?: string;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          content?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      alerts: {
        Row: {
          id: string;
          patient_id: string;
          type: string;
          priority: "low" | "medium" | "high";
          status: "active" | "resolved";
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          type: string;
          priority: "low" | "medium" | "high";
          status?: "active" | "resolved";
          created_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          type?: string;
          priority?: "low" | "medium" | "high";
          status?: "active" | "resolved";
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
