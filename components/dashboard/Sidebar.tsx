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
import { useSidebar } from "@/components/layout/sidebar-context";

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
  const { open, setOpen } = useSidebar();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {/* Backdrop (solo mobile, cuando el drawer está abierto) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#11325b] flex flex-col",
          "transform transition-transform duration-300 ease-in-out",
          "lg:static lg:z-auto lg:w-60 lg:translate-x-0 lg:min-h-screen",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/dashboard">
          {/* Logo institucional desde /public/logo.svg. El archivo es azul+dorado;
              sobre el sidebar oscuro se renderiza en blanco (brightness-0 invert). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Vitar" className="h-7 w-auto brightness-0 invert" />
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
              onClick={() => setOpen(false)}
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
    </>
  );
}
