"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendMessage } from "@/lib/actions/messages";
import { getConversation } from "@/lib/services/messages";
import type { MessageWithSender } from "@/lib/services/messages";

interface ChatWindowProps {
  currentUserId: string;
  currentUserName: string;
  patientId: string;
  patientName: string;
  initialMessages: MessageWithSender[];
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDay(dateStr: string) {
  const d         = new Date(dateStr);
  const today     = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString())     return "Hoy";
  if (d.toDateString() === yesterday.toDateString()) return "Ayer";
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "long" });
}

function groupByDay(messages: MessageWithSender[]) {
  const groups: { day: string; messages: MessageWithSender[] }[] = [];
  for (const msg of messages) {
    const day  = formatDay(msg.created_at);
    const last = groups[groups.length - 1];
    if (last?.day === day) {
      last.messages.push(msg);
    } else {
      groups.push({ day, messages: [msg] });
    }
  }
  return groups;
}

export function ChatWindow({
  currentUserId,
  patientId,
  patientName,
  initialMessages,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<MessageWithSender[]>(initialMessages);
  const [input, setInput]       = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError]       = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Polling cada 5 segundos
  useEffect(() => {
    const interval = setInterval(async () => {
      const fresh = await getConversation(currentUserId, patientId);
      setMessages(fresh);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentUserId, patientId]);

  const handleSend = () => {
    if (!input.trim() || isPending) return;
    const content = input.trim();
    setInput("");
    setError(null);

    // Optimistic update
    const optimistic: MessageWithSender = {
      id:          `temp-${Date.now()}`,
      sender_id:   currentUserId,
      receiver_id: patientId,
      content,
      created_at:  new Date().toISOString(),
      sender_name: "Vos",
    };
    setMessages((prev) => [...prev, optimistic]);

    startTransition(async () => {
      const { error } = await sendMessage(currentUserId, patientId, content);
      if (error) {
        setError(error);
        setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const grouped = groupByDay(messages);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3 bg-white flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-[#11325b]/10 flex items-center justify-center">
          <span className="text-[#11325b] font-bold text-xs">
            {patientName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </span>
        </div>
        <div>
          <div className="font-semibold text-[#11325b] text-sm">{patientName}</div>
          <div className="text-[10px] text-gray-400" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
            Paciente
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[#f2f2f2]">
        {grouped.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-10">
            No hay mensajes aún. Iniciá la conversación.
          </div>
        )}

        {grouped.map(({ day, messages: dayMsgs }) => (
          <div key={day}>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] text-gray-400 font-medium px-2"
                style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
                {day}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="space-y-2">
              {dayMsgs.map((msg) => {
                const isMe = msg.sender_id === currentUserId;
                return (
                  <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                      isMe
                        ? "bg-[#11325b] text-white rounded-br-sm"
                        : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-sm"
                    )}>
                      <p style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}>
                        {msg.content}
                      </p>
                      <p className={cn("text-[10px] mt-1 text-right", isMe ? "text-white/50" : "text-gray-400")}>
                        {formatTime(msg.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="px-4 py-2 bg-[#ac1c37]/8 border-t border-[#ac1c37]/20">
          <p className="text-[#ac1c37] text-xs">{error}</p>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí un mensaje... (Enter para enviar)"
            rows={1}
            className="flex-1 bg-[#f2f2f2] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#11325b]/20 focus:border-[#11325b] transition-all resize-none"
            style={{ fontFamily: "Verdana, Geneva, sans-serif", maxHeight: "120px" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isPending}
            className="w-10 h-10 rounded-xl bg-[#e7ba61] hover:bg-[#d4a94f] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150 flex-shrink-0"
          >
            {isPending
              ? <Loader2 size={16} className="text-[#11325b] animate-spin" />
              : <Send size={16} className="text-[#11325b]" />
            }
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-1.5 ml-1"
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
          Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
}
