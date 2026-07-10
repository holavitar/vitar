import { createClient } from "@/lib/supabase/server";
import type { RoiMetrics } from "@/types";
import {
  COSTO_REINTERNACION_ARS,
  UMBRAL_ADHERENCIA_MITIGADA,
  planPorPacientes,
} from "@/lib/config/roi";

/**
 * Calcula el ROI institucional a partir de la adherencia de los pacientes.
 *
 * Modelo (TIF §8.2): cada paciente que alcanza una adherencia ≥ umbral
 * representa una reinternación evitable mitigada. El ahorro se valoriza con el
 * costo de una reinternación (ARS $2.960.000) y se contrasta con el costo de la
 * suscripción del plan que le corresponde a la institución por su cantidad de
 * pacientes activos.
 */
export async function getRoiMetrics(institutionId: string): Promise<RoiMetrics> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("patients")
    .select("adherence")
    .eq("institution_id", institutionId);

  const patients = data ?? [];
  const totalPacientes = patients.length;

  const reinternacionesEvitadas = patients.filter(
    (p) => p.adherence >= UMBRAL_ADHERENCIA_MITIGADA
  ).length;

  const plan = planPorPacientes(totalPacientes);

  const ahorroBrutoARS = reinternacionesEvitadas * COSTO_REINTERNACION_ARS;
  const costoMensualARS = plan.precioMensualARS;
  const ahorroNetoARS = ahorroBrutoARS - costoMensualARS;
  const roiMultiplo =
    costoMensualARS > 0
      ? Math.round((ahorroBrutoARS / costoMensualARS) * 10) / 10
      : 0;

  return {
    reinternacionesEvitadas,
    ahorroBrutoARS,
    costoMensualARS,
    ahorroNetoARS,
    roiMultiplo,
    plan: plan.nombre,
    costoReinternacionARS: COSTO_REINTERNACION_ARS,
  };
}
