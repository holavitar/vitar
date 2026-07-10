/**
 * Constantes de negocio para el cálculo de ROI y reinternaciones evitadas.
 *
 * Todos los valores provienen del Trabajo de Investigación Final (TIF) de Vitar,
 * §8.2 "Precio" (Marketing Mix) — págs. 24-25 y anexo 5.2.1. Se centralizan acá
 * como única fuente de verdad para que el modelo del dashboard sea trazable y
 * auditable contra el plan de negocios.
 */

/**
 * Costo total estimado de una reinternación evitable en el sistema de salud
 * argentino. El TIF fundamenta: día de internación clínica = ARS $412.793
 * (nomenclador CABA), internación promedio de 5-7 días + prácticas asociadas
 * "supera holgadamente los $2.960.000 por paciente" (anexo 5.2.1).
 */
export const COSTO_REINTERNACION_ARS = 2_960_000;

/**
 * Tipo de cambio oficial (venta, Banco Nación) usado en el TIF para expresar
 * los precios de suscripción — referencia 22/06/2026.
 */
export const TC_USD_ARS = 1_480;

/**
 * Nivel de adherencia a partir del cual se considera que el riesgo de
 * reinternación del paciente está clínicamente mitigado. El TIF plantea la
 * propuesta de valor como reducción de reinternaciones evitables atribuibles
 * a la mejora de la adherencia.
 */
export const UMBRAL_ADHERENCIA_MITIGADA = 80;

/**
 * Umbral crítico: por debajo se dispara la alerta automática (regla de negocio
 * ya implementada en el trigger de la base de datos).
 */
export const UMBRAL_ADHERENCIA_CRITICA = 60;

/** Planes de suscripción segmentados por cantidad de pacientes activos (TIF §8.2). */
export interface PlanVitar {
  id: "free" | "entry" | "core" | "premium";
  nombre: string;
  /** Rango de pacientes activos [min, max]. */
  pacientes: [number, number];
  /** Precio mensual en ARS (0 para el tier gratuito). */
  precioMensualARS: number;
}

// Precios de la tabla de planes del TIF (§8.2), en ARS/mes. Convertidos al TC
// oficial de $1.480: Entry US$2.400, Core US$5.000, Premium US$7.000.
export const PLANES: PlanVitar[] = [
  { id: "free", nombre: "Free", pacientes: [0, 5], precioMensualARS: 0 },
  { id: "entry", nombre: "Entry", pacientes: [6, 300], precioMensualARS: 3_552_000 },
  { id: "core", nombre: "Core", pacientes: [301, 630], precioMensualARS: 7_400_000 },
  { id: "premium", nombre: "Premium", pacientes: [631, 885], precioMensualARS: 10_360_000 },
];

/**
 * Devuelve el plan que corresponde a una institución según su cantidad de
 * pacientes activos. Si supera el máximo, cae en Premium.
 */
export function planPorPacientes(cantidadPacientes: number): PlanVitar {
  const plan = PLANES.find(
    (p) => cantidadPacientes >= p.pacientes[0] && cantidadPacientes <= p.pacientes[1]
  );
  return plan ?? PLANES[PLANES.length - 1];
}
