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

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/portal">
          <svg
            height="24"
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
              fill="#11325b"
              d="M98 64C98 73.7 94.2 83 87.4 89.8L58.8 118.4C51.7 125.5 42.3 129.1 32.8 129.1s-18.9-3.6-26-10.7C-.5 111.2-.5 100.2 6.7 92.9L35.3 64.3C42.4 57.2 51.8 53.6 61.3 53.6s18.9 3.6 26 10.7l.1.1C94.2 71 98 80.3 98 90Z"
              transform="translate(0 -9)"
            />
            <text
              x="133" y="117"
              fontFamily="Helvetica Now Display,Helvetica Neue,Helvetica,Arial,sans-serif"
              fontWeight="700" fontSize="96" fill="#11325b" letterSpacing="-2"
            >
              vitar
            </text>
          </svg>
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
  );
}
