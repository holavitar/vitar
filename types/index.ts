import type { Database } from "./database";

// ── Row types ──────────────────────────────────────────────
export type Institution = Database["public"]["Tables"]["institutions"]["Row"];
export type User        = Database["public"]["Tables"]["users"]["Row"];
export type Patient     = Database["public"]["Tables"]["patients"]["Row"];
export type Medication  = Database["public"]["Tables"]["medications"]["Row"];
export type MedicationLog = Database["public"]["Tables"]["medication_logs"]["Row"];
export type Symptom     = Database["public"]["Tables"]["symptoms"]["Row"];
export type Message     = Database["public"]["Tables"]["messages"]["Row"];
export type Alert       = Database["public"]["Tables"]["alerts"]["Row"];

// ── Domain ─────────────────────────────────────────────────
export type Role = "institution" | "patient";
export type Risk = "low" | "medium" | "high";
export type AlertStatus = "active" | "resolved";
export type AlertPriority = "low" | "medium" | "high";
export type MedicationStatus = "taken" | "missed" | "pending";

// ── Derived / view types ───────────────────────────────────
export type PatientWithStats = Patient & {
  medications: Medication[];
  recentAlerts: Alert[];
};

export type DashboardKPIs = {
  totalPatients: number;
  averageAdherence: number;
  activeAlerts: number;
  avoideRehospitalizations: number;
};

export type AdherenceDataPoint = {
  date: string;
  adherence: number;
};
