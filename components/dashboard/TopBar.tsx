"use client";

import { Bell, Menu } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useSidebar } from "@/components/layout/sidebar-context";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { user } = useUser();
  const { setOpen } = useSidebar();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <header className="h-14 bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {/* Botón menú — solo mobile */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden w-9 h-9 -ml-1 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
          aria-label="Abrir menú"
        >
          <Menu size={20} className="text-[#11325b]" />
        </button>
        <div className="min-w-0">
        <h1
          className="text-[#11325b] font-bold text-base leading-tight truncate"
          style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-400 text-xs" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
            {subtitle}
          </p>
        )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Bell */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors">
          <Bell size={16} className="text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#ac1c37] rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#11325b] flex items-center justify-center">
            <span className="text-[#e7ba61] font-bold text-xs">{initials}</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold text-[#11325b] leading-tight">{user?.name ?? "—"}</div>
            <div className="text-[10px] text-gray-400" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
              Institución
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
