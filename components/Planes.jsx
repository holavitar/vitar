import { PLANES, TC_USD_ARS } from "@/lib/config/roi";

// Servicios incluidos por plan (Marketing Mix — Producto/Servicios, TIF §8.1).
const SERVICIOS = {
  free: [
    "Seguimiento de hasta 5 pacientes",
    "Recordatorios de medicación",
    "Dashboard de adherencia básico",
  ],
  entry: [
    "Todo lo de Free",
    "Alertas automáticas de baja adherencia",
    "Mensajería institución ↔ paciente",
    "Reportes de adherencia",
  ],
  core: [
    "Todo lo de Entry",
    "Múltiples sedes y equipos médicos",
    "Panel de riesgo avanzado",
    "Soporte prioritario",
  ],
  premium: [
    "Todo lo de Core",
    "Integración HL7 / FHIR",
    "Onboarding dedicado y SLA",
    "Analítica y exportación de datos",
  ],
};

function precioMensual(plan) {
  if (plan.precioMensualARS === 0) return { ars: "Gratis", usd: null };
  // Sólo se publican los precios firmes del TIF (Free y Entry). Los tiers
  // superiores se cotizan según la institución.
  if (plan.id !== "entry") return { ars: "Consultar", usd: null };
  const ars = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(plan.precioMensualARS);
  const usd = Math.round(plan.precioMensualARS / TC_USD_ARS);
  return { ars, usd: `≈ US$${usd.toLocaleString("es-AR")}/mes` };
}

function rangoPacientes(plan) {
  const [min, max] = plan.pacientes;
  if (min === 0) return `Hasta ${max} pacientes`;
  return `${min} – ${max} pacientes`;
}

const HEADING = "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const BODY = "Verdana, Geneva, sans-serif";

export default function Planes() {
  return (
    <section id="planes" className="bg-[#f2f2f2] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#e7ba61]/20 border border-[#e7ba61]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e7ba61]" />
            <span className="text-[#11325b] text-xs font-semibold uppercase tracking-widest">Planes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#11325b] mb-3" style={{ fontFamily: HEADING }}>
            Un plan para cada institución
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto" style={{ fontFamily: BODY }}>
            Modelo freemium: empezá gratis y escalá según tu volumen de pacientes.
            El precio es inferior al de una sola reinternación evitable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANES.map((plan) => {
            const precio = precioMensual(plan);
            const destacado = plan.id === "entry";
            return (
              <div
                key={plan.id}
                className={
                  "rounded-2xl p-6 border flex flex-col gap-5 transition-all duration-300 hover:-translate-y-0.5 " +
                  (destacado
                    ? "bg-[#11325b] border-[#11325b] shadow-lg"
                    : "bg-white border-gray-100 shadow-sm hover:shadow-md")
                }
              >
                <div className="flex items-center justify-between">
                  <h3 className={"font-bold text-lg " + (destacado ? "text-white" : "text-[#11325b]")} style={{ fontFamily: HEADING }}>
                    {plan.nombre}
                  </h3>
                  {destacado && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#11325b] bg-[#e7ba61] rounded-full px-2 py-0.5">
                      Más elegido
                    </span>
                  )}
                </div>

                <div>
                  <div className={"font-bold leading-none " + (destacado ? "text-[#e7ba61]" : "text-[#11325b]")} style={{ fontFamily: HEADING, fontSize: precio.ars.length > 8 ? "20px" : "26px" }}>
                    {precio.ars}
                  </div>
                  {precio.usd && (
                    <div className={"text-[11px] mt-1 " + (destacado ? "text-white/50" : "text-gray-400")} style={{ fontFamily: BODY }}>
                      {precio.usd}
                    </div>
                  )}
                  <div className={"text-[11px] mt-2 " + (destacado ? "text-white/70" : "text-gray-500")} style={{ fontFamily: BODY }}>
                    {rangoPacientes(plan)}
                  </div>
                </div>

                <ul className="flex flex-col gap-2 flex-1">
                  {SERVICIOS[plan.id].map((serv) => (
                    <li key={serv} className="flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                        <path d="M20 6L9 17l-5-5" stroke={destacado ? "#e7ba61" : "#11325b"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={"text-[11px] leading-snug " + (destacado ? "text-white/80" : "text-gray-600")} style={{ fontFamily: BODY }}>
                        {serv}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#demo"
                  className={
                    "text-center text-sm font-bold rounded-lg py-2.5 transition-all duration-200 " +
                    (destacado
                      ? "bg-[#e7ba61] hover:bg-[#d4a94f] text-[#11325b]"
                      : "bg-[#11325b]/6 hover:bg-[#11325b]/10 text-[#11325b]")
                  }
                >
                  {plan.precioMensualARS === 0 ? "Empezar gratis" : "Solicitar demo"}
                </a>
              </div>
            );
          })}
        </div>

        {/* Nota de precio y plaza (TIF §8.2 y §8.3) */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 className="font-bold text-[#11325b] text-sm mb-1.5" style={{ fontFamily: HEADING }}>
              Fundamentación del precio
            </h4>
            <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: BODY }}>
              El costo mensual es menor al de una única reinternación evitable, por lo
              que el retorno se justifica desde el primer paciente intervenido.
              Facturación mensual o anual en ARS (ajustada por tipo de cambio oficial)
              o en USD según acuerdo institucional.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 className="font-bold text-[#11325b] text-sm mb-1.5" style={{ fontFamily: HEADING }}>
              Cómo se contrata
            </h4>
            <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: BODY }}>
              Venta directa B2B, 100% digital. El proceso arranca con una demo online
              y continúa con un onboarding acompañado de 90 días (configuración,
              capacitación y operación), integrándose al flujo clínico existente.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
