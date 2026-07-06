"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { resolveAlert } from "@/lib/actions/alerts";

interface ResolveAlertButtonProps {
  alertId: string;
}

export function ResolveAlertButton({ alertId }: ResolveAlertButtonProps) {
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const handleResolve = async () => {
    setLoading(true);
    const { error } = await resolveAlert(alertId);
    if (!error) setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
        <CheckCircle size={13} />
        Resuelta
      </span>
    );
  }

  return (
    <button
      onClick={handleResolve}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#11325b] hover:text-white bg-[#11325b]/8 hover:bg-[#11325b] px-3 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading
        ? <Loader2 size={12} className="animate-spin" />
        : <CheckCircle size={12} />
      }
      {loading ? "Resolviendo..." : "Marcar resuelta"}
    </button>
  );
}
