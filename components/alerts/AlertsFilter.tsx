"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function AlertsFilter() {
  const router      = useRouter();
  const pathname    = usePathname();
  const searchParams = useSearchParams();
  const current     = searchParams.get("status") ?? "active";

  const set = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", val);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl w-fit">
      {[
        { value: "active",   label: "Activas" },
        { value: "resolved", label: "Resueltas" },
      ].map((opt) => (
        <button
          key={opt.value}
          onClick={() => set(opt.value)}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
            current === opt.value
              ? "bg-white text-[#11325b] shadow-sm"
              : "text-gray-500 hover:text-[#11325b]"
          }`}
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
