"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard",          label: "Resumen",       icon: LayoutDashboard },
  { href: "/dashboard/patients", label: "Pacientes",     icon: Users },
  { href: "/dashboard/alerts",   label: "Alertas",       icon: Bell },
  { href: "/dashboard/messages", label: "Mensajes",      icon: MessageSquare },
  { href: "/dashboard/settings", label: "Configuración", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-60 min-h-screen bg-[#11325b] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/dashboard">
          <svg
            height="26"
            viewBox="0 0 440 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Vitar"
          >
            <path
              fill="#e7ba61"
              d="M98 64C98 73.7 94.2 83 87.4 89.8L58.8 118.4C51.7 125.5 42.3 129.1 32.8 129.1s-18.9-3.6-26-10.7C-.5 111.2-.5 100.2 6.7 92.9L35.3 64.3C42.4 57.2 51.8 53.6 61.3 53.6s18.9 3.6 26 10.7l.1.1C94.2 71 98 80.3 98 90Z"
              transform="translate(21 9)"
            />
            <path
              fill="white"
              d="M98 64C98 73.7 94.2 83 87.4 89.8L58.8 118.4C51.7 125.5 42.3 129.1 32.8 129.1s-18.9-3.6-26-10.7C-.5 111.2-.5 100.2 6.7 92.9L35.3 64.3C42.4 57.2 51.8 53.6 61.3 53.6s18.9 3.6 26 10.7l.1.1C94.2 71 98 80.3 98 90Z"
              transform="translate(0 -9)"
            />
            <text
              x="133"
              y="117"
              fontFamily="Helvetica Now Display,Helvetica Neue,Helvetica,Arial,sans-serif"
              fontWeight="700"
              fontSize="96"
              fill="white"
              letterSpacing="-2"
            >
              vitar
            </text>
          </svg>
        </Link>
        <p className="text-white/40 text-[10px] mt-1.5" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
          Panel institucional
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-white/12 text-white"
                  : "text-white/55 hover:text-white hover:bg-white/8"
              )}
            >
              <Icon
                size={17}
                className={isActive ? "text-[#e7ba61]" : "text-white/40"}
              />
              {label}
              {/* Badge de alertas — solo en el ítem Alertas */}
              {label === "Alertas" && (
                <span className="ml-auto bg-[#ac1c37] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  5
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/45 hover:text-white hover:bg-white/8 text-sm font-medium transition-all duration-150"
        >
          <LogOut size={16} className="text-white/30" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
