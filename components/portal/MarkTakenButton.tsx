"use client";

import { useState, useTransition } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { markMedicationTaken } from "@/lib/actions/portal";

interface MarkTakenButtonProps {
  medicationId: string;
  patientId: string;
  alreadyTaken: boolean;
}

export function MarkTakenButton({ medicationId, patientId, alreadyTaken }: MarkTakenButtonProps) {
  const [taken, setTaken]            = useState(alreadyTaken);
  const [isPending, startTransition] = useTransition();

  if (taken) {
    return (
      <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-semibold bg-emerald-50 px-4 py-2 rounded-xl">
        <CheckCircle size={14} />
        Tomada hoy
      </div>
    );
  }

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          const { error } = await markMedicationTaken(medicationId, patientId);
          if (!error) setTaken(true);
        })
      }
      disabled={isPending}
      className="inline-flex items-center gap-1.5 bg-[#e7ba61] hover:bg-[#d4a94f] disabled:opacity-50 disabled:cursor-not-allowed text-[#11325b] font-bold text-xs px-4 py-2 rounded-xl transition-all duration-150"
    >
      {isPending ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
      {isPending ? "Registrando..." : "Marcar como tomada"}
    </button>
  );
}
