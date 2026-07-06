"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { registerSymptom } from "@/lib/actions/portal";

const schema = z.object({
  type: z.enum(["dolor", "fatiga", "mareos", "otro"], {
    required_error: "Seleccioná un síntoma",
  }),
  notes: z.string().max(300, "Máximo 300 caracteres").optional(),
});

type FormData = z.infer<typeof schema>;

const SYMPTOMS = [
  { value: "dolor",  label: "Dolor",  emoji: "🤕" },
  { value: "fatiga", label: "Fatiga", emoji: "😴" },
  { value: "mareos", label: "Mareos", emoji: "💫" },
  { value: "otro",   label: "Otro",   emoji: "📝" },
] as const;

export function SymptomForm({ patientId }: { patientId: string }) {
  const [submitted, setSubmitted]    = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedType = watch("type");

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const { error } = await registerSymptom(patientId, data.type, data.notes ?? "");
      if (!error) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 3000);
      }
    });
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle size={24} className="text-emerald-500" />
        </div>
        <p className="font-semibold text-[#11325b] text-sm">Síntoma registrado correctamente</p>
        <p className="text-gray-400 text-xs" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
          Tu médico puede ver este registro en el sistema.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
          ¿Qué síntoma tenés?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SYMPTOMS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setValue("type", s.value, { shouldValidate: true })}
              className={`flex flex-col items-center gap-2 py-4 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                selectedType === s.value
                  ? "bg-[#11325b] border-[#11325b] text-white"
                  : "bg-[#f2f2f2] border-gray-100 text-gray-600 hover:border-[#11325b]/30"
              }`}
            >
              <span className="text-xl">{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>
        {errors.type && (
          <p className="text-[#ac1c37] text-xs mt-2">{errors.type.message}</p>
        )}
        <input type="hidden" {...register("type")} />
      </div>

      <div>
        <label htmlFor="notes" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Observaciones{" "}
          <span className="text-gray-400 font-normal normal-case">(opcional)</span>
        </label>
        <textarea
          id="notes"
          {...register("notes")}
          rows={3}
          placeholder="Describí cómo te sentís, desde cuándo, intensidad..."
          className="w-full bg-[#f2f2f2] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#11325b]/20 focus:border-[#11325b] transition-all resize-none"
          style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
        />
        {errors.notes && (
          <p className="text-[#ac1c37] text-xs mt-1">{errors.notes.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#e7ba61] hover:bg-[#d4a94f] disabled:opacity-50 disabled:cursor-not-allowed text-[#11325b] font-bold py-3.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isPending && <Loader2 size={14} className="animate-spin" />}
        {isPending ? "Guardando..." : "Guardar síntoma"}
      </button>
    </form>
  );
}
