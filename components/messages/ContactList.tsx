"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  condition: string;
  lastMessage?: string;
}

interface ContactListProps {
  contacts: Contact[];
  selectedId?: string;
}

export function ContactList({ contacts, selectedId }: ContactListProps) {
  const router      = useRouter();
  const searchParams = useSearchParams();

  const select = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("patient", id);
    router.push(`/dashboard/messages?${params.toString()}`);
  };

  return (
    <div className="w-64 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
      <div className="px-4 py-3.5 border-b border-gray-50">
        <h3
          className="font-bold text-[#11325b] text-sm"
          style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Pacientes
        </h3>
        <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
          {contacts.length} contactos
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => {
          const initials = contact.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
          const isSelected = contact.id === selectedId;

          return (
            <button
              key={contact.id}
              onClick={() => select(contact.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-gray-50",
                isSelected
                  ? "bg-[#11325b]/6 border-l-2 border-l-[#11325b]"
                  : "hover:bg-gray-50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold",
                isSelected ? "bg-[#11325b] text-[#e7ba61]" : "bg-[#11325b]/10 text-[#11325b]"
              )}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "text-xs font-semibold truncate",
                  isSelected ? "text-[#11325b]" : "text-gray-700"
                )}>
                  {contact.name}
                </div>
                <div
                  className="text-[10px] text-gray-400 truncate"
                  style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
                >
                  {contact.condition}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
