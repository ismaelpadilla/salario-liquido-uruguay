/**
 * Valor BPC 2022.
 */
const BPC = 5164;

/**
 * Franjas de IPRF.
 *  - 'desde' y 'hasta' son los valores en BPC en los que está comprendida la franja.
 *
 *    El valor de 'desde' está dentro de la franja, el de 'hasta' no.
 *
 *    La última franja tiene valor 0 en "hasta".
 *  - 'tasa' es el porcentaje del impuesto.
 */
const IRPF_FRANJAS = [
  { desde: 0, hasta: 7, tasa: 0 },
  { desde: 7, hasta: 10, tasa: 10 },
  { desde: 10, hasta: 15, tasa: 15 },
  { desde: 15, hasta: 30, tasa: 24 },
  { desde: 30, hasta: 50, tasa: 25 },
  { desde: 50, hasta: 75, tasa: 27 },
  { desde: 75, hasta: 115, tasa: 31 },
  { desde: 115, hasta: 0, tasa: 36 },
];

/**
 * Porcentaje de aportes jubilatorios.
 */
const APORTES_JUBILATORIOS = 15;

/**
 * Maximo del salario nominal sobre el cual aplican los aportes jubilatorios.
 */
const TOPE_APORTES_JUBILATORIOS = 215179;

/**
 * Porcentaje de aportes FONASA para personas con salario hasta a 2.5 BPC.
 */
const APORTES_FONASA_HASTA25BPC = { base: 3, conyuge: 2, hijos: 0 };
/**
 * Porcentaje de aportes FONASA para personas con salario mayor a 2.5 BPC.
 */
const APORTES_FONASA_DESDE25BPC = { base: 4.5, conyuge: 2, hijos: 1.5 };

/**
 * Porcentaje de aporte FRL.
 */
const APORTE_FRL = 0.1;

/**
 * Tope AFAP.
 */
const TOPE_AFAP = 215179;

/**
 * Porcentaje de incremento de ingresos gravados que aplica si la renta computable es mayor a 10 BPC.
 */
const INCREMENTO_INGRESOS_GRAVADOS = 6;

/**
 * Porcentaje de deducciones de IRPF para personas con salario hasta 15 BPC.
 */
const TASA_DEDUCCIONES_HASTA15BPC = 10;
/**
 * Porcentaje de deducciones de IRPF para personas con salario desde 15 BPC.
 */
const TASA_DEDUCCIONES_DESDE15BPC = 8;

/**
 * Cantidad deducida del IRPF por cada hijo sin discapacidad.
 */
const DEDUCCION_HIJO_SIN_DISCAPACIDAD = (13 * BPC) / 12;
/**
 * Cantidad deducida del IRPF por cada hijo con discapacidad.
 */
const DEDUCCION_HIJO_CON_DISCAPACIDAD = (26 * BPC) / 12;

/**
 * Adicional al fondo de solidaridad que debe pagarse en carreras de duracion igual o mayor
 * a cinco años.
 */
const ADICIONAL_FONDO_SOLIDARIDAD = ((5 / 3) * BPC) / 12;

export {
  BPC,
  IRPF_FRANJAS,
  APORTES_JUBILATORIOS,
  TOPE_APORTES_JUBILATORIOS,
  APORTES_FONASA_HASTA25BPC,
  APORTES_FONASA_DESDE25BPC,
  APORTE_FRL,
  TOPE_AFAP,
  INCREMENTO_INGRESOS_GRAVADOS,
  ADICIONAL_FONDO_SOLIDARIDAD,
  TASA_DEDUCCIONES_DESDE15BPC,
  TASA_DEDUCCIONES_HASTA15BPC,
  DEDUCCION_HIJO_SIN_DISCAPACIDAD,
  DEDUCCION_HIJO_CON_DISCAPACIDAD,
};
