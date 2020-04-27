import {
  BPC,
  APORTES_JUBILATORIOS,
  TOPE_APORTES_JUBILATORIOS,
  APORTES_FONASA_HASTA25BPC,
  APORTES_FONASA_DESDE25BPC,
  APORTE_FRL,
  IRPF_FRANJAS,
  INCREMENTO_INGRESOS_GRAVADOS,
  ADICIONAL_FONDO_SOLIDARIDAD,
  TASA_DEDUCCIONES_DESDE15BPC,
  TASA_DEDUCCIONES_HASTA15BPC,
  DEDUCCION_HIJO_SIN_DISCAPACIDAD,
  DEDUCCION_HIJO_CON_DISCAPACIDAD,
} from "../data/constants";

/**
 * @typedef {Object} AportesBPS
 * @property {number} aportesJubilatorios - Aportes jubilatorios.
 * @property {number} aportesFONASA - Aportes FONASA.
 * @property {number} aporteFRL - Aportes FRL.
 *
 * @typedef {Object} DetalleBPS
 * @property {Array<number>} impuestoFranja - Arreglo que en la posición i tiene el impuesto a pagar correpondiente a
 *  la i-ésima franja de IRPF.
 * @property {number} deducciones - Cantidad de monto a deducir (antes de aplicar la tasa de 8 o 10%).
 *
 * @typedef {Object} ImpuestoIRPF
 * @property {DetalleBPS} detalleIRPF - Detalle del IRPF a pagar.
 * @property {number} totalIRPF - Total del IRPF a pagar.
 */

/**
 * Funcion que calcula los aportes al BPS.
 * @param {number} salarioNominal - Salario nominal en pesos.
 * @param {boolean} tieneHijos - True si tiene hijos a cargo, false en caso contrario.
 * @param {boolean} tieneConyuge - True si tiene conyuge a cargo, false en caso contrario.
 *
 * @returns {AportesBPS} - Un objeto que tiene los aportes jubilatorios, FONASA y FRL calculados.
 */
export const calcularAportesBPS = (salarioNominal, tieneHijos, tieneConyuge) => {
  // Calcular que valores usar en base al salario nominal en BPC
  const salarioEnBPC = salarioNominal / BPC;
  let valoresFonasa = null;
  if (salarioEnBPC > 2.5) valoresFonasa = APORTES_FONASA_DESDE25BPC;
  else valoresFonasa = APORTES_FONASA_HASTA25BPC;

  // Calcular porcentaje fonasa
  let porcentajeFonasa = valoresFonasa.base;
  if (tieneHijos) porcentajeFonasa += valoresFonasa.hijos;
  if (tieneConyuge) porcentajeFonasa += valoresFonasa.conyuge;

  // Calcular valores de retorno
  const aportesJubilatorios = Math.min(TOPE_APORTES_JUBILATORIOS, salarioNominal) * APORTES_JUBILATORIOS * 0.01;
  const aportesFONASA = salarioNominal * porcentajeFonasa * 0.01;
  const aporteFRL = salarioNominal * APORTE_FRL * 0.01;
  return { aportesJubilatorios, aportesFONASA, aporteFRL };
};

/**
 *
 * @param {number} salarioNominal - Salario nominal.
 * @param {number} cantHijosSinDiscapacidad - Cantida de hijos sin discapacidad.
 * @param {number} cantHijosConDiscapacidad - Cantida de hijos con discapacidad.
 * @param {number} aportesJubilatorios - Aportes jubilatorios.
 * @param {number} aportesFONASA - Aportes FONASA.
 * @param {number} aporteFRL - Aporte FRL.
 * @param {number} aportesFondoSolidaridad - Cantidad de BPC que se aportan al Fondo de Solidaridad.
 * @param {boolean} adicionalFondoSolidaridad - True si corresponde aportar adicional al Fondo de Solidaridad.
 * @param {number} aportesCJPPU - Aportes a la Caja de Profesionales Universitarios.
 * @param {number} otrasDeducciones - Otras deducciones.
 *
 * @returns {ImpuestoIRPF} - El monto total de IRPF y los detalles de las distintas franjas y deducciones.
 */
export const calcularIPRF = (
  salarioNominal,
  cantHijosSinDiscapacidad,
  cantHijosConDiscapacidad,
  aportesJubilatorios,
  aportesFONASA,
  aporteFRL,
  aportesFondoSolidaridad,
  adicionalFondoSolidaridad,
  aportesCJPPU,
  otrasDeducciones
) => {
  // info sobre deducciones
  // https://www.dgi.gub.uy/wdgi/page?2,rentas-de-trabajo-160,preguntas-frecuentes-ampliacion,O,es,0,PAG;CONC;1017;8;D;cuales-son-las-deducciones-personales-admitidas-en-la-liquidacion-del-irpf-33486;3;PAG;
  const salarioEnBPC = salarioNominal / BPC;
  let tasaDeducciones = null;
  if (salarioEnBPC > 15) tasaDeducciones = TASA_DEDUCCIONES_DESDE15BPC;
  else tasaDeducciones = TASA_DEDUCCIONES_HASTA15BPC;

  // Calcular si hay que aplicar el aumento a ingresos gravados Seguridad Social
  if (salarioEnBPC > 10) salarioNominal *= 1 + INCREMENTO_INGRESOS_GRAVADOS * 0.01;

  // Cantidad deducida del IRPF por los hijos
  const deduccionesHijos =
    cantHijosSinDiscapacidad * DEDUCCION_HIJO_SIN_DISCAPACIDAD +
    cantHijosConDiscapacidad * DEDUCCION_HIJO_CON_DISCAPACIDAD;

  const aporteAdicionalFondoSolidaridad = adicionalFondoSolidaridad ? ADICIONAL_FONDO_SOLIDARIDAD : 0;
  const deducciones =
    deduccionesHijos +
    aportesJubilatorios +
    aportesFONASA +
    aporteFRL +
    aportesFondoSolidaridad * BPC +
    aporteAdicionalFondoSolidaridad +
    aportesCJPPU +
    otrasDeducciones;

  // Cantidad de impuesto de IRPF de cada franja
  const detalleIRPF = { impuestoFranja: [], deducciones };

  IRPF_FRANJAS.forEach((franja) => {
    if (salarioNominal > franja.desde * BPC) {
      const impuesto = (Math.min(franja.hasta * BPC, salarioNominal) - franja.desde * BPC) * franja.tasa * 0.01;
      detalleIRPF.impuestoFranja.push(impuesto);
    } else {
      detalleIRPF.impuestoFranja.push(0);
    }
  });

  const totalIRPF = Math.max(
    0,
    detalleIRPF.impuestoFranja.reduce((a, b) => a + b, 0) - deducciones * tasaDeducciones * 0.01
  );

  return { detalleIRPF, totalIRPF };
};
