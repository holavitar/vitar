"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Pill,
  Bell,
  MessageSquare,
  Activity,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/layout/sidebar-context";

const NAV_ITEMS = [
  { href: "/portal",           label: "Inicio",         icon: Home },
  { href: "/portal/treatment", label: "Mi tratamiento", icon: Pill },
  { href: "/portal/symptoms",  label: "Síntomas",       icon: Activity },
  { href: "/portal/messages",  label: "Mensajes",       icon: MessageSquare },
];

const BOTTOM_ITEMS = [
  { href: "/portal/support", label: "Soporte", icon: HelpCircle },
];

export function PatientSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
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
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col",
          "transform transition-transform duration-300 ease-in-out",
          "lg:static lg:z-auto lg:w-56 lg:translate-x-0 lg:min-h-screen",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/portal">
          {/* Logo desde /public/logo.svg. El sidebar del paciente es blanco,
              así que el logo va en sus colores reales (azul + dorado). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Vitar" className="h-6 w-auto" />
        </Link>
        <p
          className="text-gray-400 text-[10px] mt-1"
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
        >
          Portal del paciente
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/portal"
              ? pathname === "/portal"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-[#11325b]/8 text-[#11325b]"
                  : "text-gray-500 hover:text-[#11325b] hover:bg-gray-50"
              )}
            >
              <Icon
                size={16}
                className={isActive ? "text-[#11325b]" : "text-gray-400"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-0.5">
        {BOTTOM_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-[#11325b] hover:bg-gray-50 transition-all duration-150"
          >
            <Icon size={16} className="text-gray-300" />
            {label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-[#11325b] hover:bg-gray-50 transition-all duration-150"
        >
          <LogOut size={16} className="text-gray-300" />
          Cerrar sesión
        </button>
      </div>
    </aside>
    </>
  );
}
