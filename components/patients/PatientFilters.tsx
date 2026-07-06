"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCallback } from "react";

const RISK_OPTIONS = [
  { value: "",       label: "Todos" },
  { value: "high",   label: "Alto riesgo" },
  { value: "medium", label: "Riesgo medio" },
  { value: "low",    label: "Bajo riesgo" },
];

export function PatientFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentRisk   = searchParams.get("risk") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Buscador */}
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Buscar por nombre o condición..."
          defaultValue={currentSearch}
          onChange={(e) => updateParam("q", e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#11325b]/20 focus:border-[#11325b] transition-all"
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
        />
      </div>

      {/* Filtro de riesgo */}
      <div className="relative flex items-center gap-2">
        <SlidersHorizontal size={14} className="text-gray-400 flex-shrink-0" />
        <div className="flex gap-1.5">
          {RISK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("risk", opt.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                currentRisk === opt.value
                  ? "bg-[#11325b] text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-[#11325b]/30 hover:text-[#11325b]"
              }`}
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
