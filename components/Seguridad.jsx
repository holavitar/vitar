"use client";
import { useState } from "react";

const ITEMS = [
  {
    icon: "🔐",
    title: "Cifrado TLS 1.3 + AES-256",
    detail: "Datos cifrados en tránsito (TLS 1.3) y en reposo (AES-256). Sin excepciones.",
    law: null,
  },
  {
    icon: "👥",
    title: "Control de acceso por roles",
    detail: "Cada profesional accede únicamente a los pacientes bajo su responsabilidad.",
    law: null,
  },
  {
    icon: "📋",
    title: "Ley 25.326 — Protección de datos",
    detail: "Los datos de salud son datos sensibles con protección reforzada desde la arquitectura.",
    law: "Ley 25.326",
  },
  {
    icon: "🏥",
    title: "Ley 26.529 — Derechos del paciente",
    detail: "Consentimiento informado integrado en el onboarding. Acceso a historia clínica garantizado.",
    law: "Ley 26.529",
  },
  {
    icon: "🔗",
    title: "HL7 FHIR R4 — Interoperabilidad",
    detail: "Compatibilidad nativa con el SURHCE (Ley 27.706) e inscripción en el ReNadPDiS.",
    law: "Ley 27.706",
  },
];

const LAYERS = [
  {
    label: "Capa de acceso",
    sub: "Autenticación multifactor · RBAC · Sesiones con expiración",
    color: "bg-white/10 border-white/20",
  },
  {
    label: "Capa de transporte",
    sub: "TLS 1.3 en tránsito · HTTPS obligatorio",
    color: "bg-[#e7ba61]/15 border-[#e7ba61]/30",
  },
  {
    label: "Capa de interoperabilidad",
    sub: "HL7 FHIR R4 · SURHCE · ReNadPDiS",
    color: "bg-white/6 border-white/12",
  },
  {
    label: "Capa de almacenamiento",
    sub: "AES-256 en reposo · Auditoría de accesos",
    color: "bg-[#e7ba61]/10 border-[#e7ba61]/20",
  },
];

const NORMS = [
  { label: "Ley 25.326", desc: "Datos personales" },
  { label: "Ley 26.529", desc: "Derechos del paciente" },
  { label: "Ley 27.706", desc: "Historia clínica electrónica" },
  { label: "Ley 25.506", desc: "Firma digital" },
  { label: "HL7 FHIR R4", desc: "Interoperabilidad" },
];

export default function Seguridad() {
  const [active, setActive] = useState(null);

  return (
    <section id="seguridad" className="bg-[#f2f2f2] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#11325b]/8 border border-[#11325b]/15 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#11325b]" />
            <span className="text-[#11325b] text-xs font-semibold uppercase tracking-widest">Seguridad</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#11325b] leading-tight mb-4"
            style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Seguridad desde el diseño, no como agregado
          </h2>
          <p
            className="text-[#11325b]/60 max-w-xl leading-relaxed"
            style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "13px" }}
          >
            Los datos clínicos de tus pacientes están protegidos en cada capa de la arquitectura.
            Cumplimiento normativo argentino vigente desde el origen del producto.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — checklist normativo interactivo */}
          <div className="space-y-3">
            {ITEMS.map((item, i) => (
              <button
                key={item.title}
                onClick={() => setActive(active === i ? null : i)}
                className="w-full text-left flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:border-[#11325b]/20 hover:shadow-md transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-[#11325b]/6 flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-[#11325b] text-sm">{item.title}</div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.law && (
                        <span className="text-[10px] font-semibold text-[#11325b]/60 border border-[#11325b]/15 rounded-full px-2 py-0.5">
                          {item.law}
                        </span>
                      )}
                      <span
                        className={`text-[#11325b]/40 text-xs transition-transform duration-200 ${
                          active === i ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </div>
                  </div>
                  {active === i && (
                    <div
                      className="text-gray-500 mt-2 leading-relaxed"
                      style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "12px" }}
                    >
                      {item.detail}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT — arquitectura de capas */}
          <div className="bg-[#11325b] rounded-2xl p-8">
            <div className="text-[#e7ba61] text-xs font-semibold uppercase tracking-widest mb-2">
              Arquitectura de seguridad
            </div>
            <p
              className="text-white/45 mb-7"
              style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: "11px" }}
            >
              Protección en cuatro capas independientes. Un fallo en una capa no compromete las demás.
            </p>

            <div className="space-y-2">
              {LAYERS.map((layer, i) => (
                <div key={layer.label}>
                  <div className={`rounded-xl border px-5 py-3.5 ${layer.color}`}>
                    <div className="text-white font-bold text-xs mb-0.5">{layer.label}</div>
                    <div
                      className="text-white/50"
                      style={{ fontSize: "10px", fontFamily: "Verdana, Geneva, sans-serif" }}
                    >
                      {layer.sub}
                    </div>
                  </div>
                  {i < LAYERS.length - 1 && (
                    <div className="flex justify-center my-1 text-white/20 text-xs">↓</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <div
                className="text-white/35 text-center"
                style={{ fontSize: "10px", fontFamily: "Verdana, Geneva, sans-serif" }}
              >
                Firma digital válida · Ley 25.506 · Consentimiento informado · Art. 13, Ley 26.529
              </div>
            </div>

            <div className="mt-7">
              <a
                href="#demo"
                className="inline-block bg-[#e7ba61] hover:bg-[#d4a94f] text-[#11325b] font-bold px-7 py-3.5 rounded-lg text-sm transition-all duration-200"
              >
                Solicitar demo gratuita →
              </a>
            </div>
          </div>
        </div>

        {/* Barra normativa */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {NORMS.map((n) => (
            <div
              key={n.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-center"
            >
              <div className="text-[#11325b] font-bold text-xs">{n.label}</div>
              <div
                className="text-[#11325b]/45 mt-0.5"
                style={{ fontSize: "10px", fontFamily: "Verdana, Geneva, sans-serif" }}
              >
                {n.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
