import { PatientTopBar } from "@/components/portal/PatientTopBar";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Soporte" };

export default function SupportPage() {
  return (
    <>
      <PatientTopBar title="Soporte" />
      <main className="flex-1 p-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center space-y-3">
          <div className="text-4xl">🩺</div>
          <h2
            className="font-bold text-[#11325b] text-base"
            style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            ¿Necesitás ayuda?
          </h2>
          <p
            className="text-gray-500 text-sm"
            style={{ fontFamily: "Verdana, Geneva, sans-serif" }}
          >
            Escribile directamente a tu equipo médico desde la sección Mensajes
            o contactá a soporte técnico en{" "}
            <a
              href="mailto:soporte@vitarsalud.com"
              className="text-[#11325b] underline"
            >
              soporte@vitarsalud.com
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
