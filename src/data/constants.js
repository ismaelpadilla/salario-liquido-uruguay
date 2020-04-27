/**
 * Valor BPC 2020.
 */
const BPC = 4519;

/**
 * Franjas de IPRF.
 *  - 'desde' y 'hasta' son los valores en BPC en los que está comprendida la franja.
 *    El valor de 'desde' está dentro de la franja, el de 'hasta' no.
 *  - 'tasa' es el porcentaje del impuesto.
 */
const IPRF_FRANJAS = [
  { desde: 0, hasta: 7, tasa: 0 },
  { desde: 7, hasta: 10, tasa: 10 },
  { desde: 10, hasta: 15, tasa: 15 },
  { desde: 15, hasta: 30, tasa: 24 },
  { desde: 30, hasta: 50, tasa: 25 },
  { desde: 50, hasta: 75, tasa: 27 },
  { desde: 75, hasta: 115, tasa: 31 },
  { desde: 115, hasta: 999, tasa: 36 },
];

/**
 * Porcentaje de aportes jubilatorios.
 */
const APORTES_JUBILATORIOS = 15;

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
const TOPE_AFAP = 188411;

/**
 * Porcentaje de deducciones de IRPF para personas con salario hasta 15 BPC.
 */
const TASA_DEDUCCIONES_HASTA15BPC = 10;
/**
 * Porcentaje de deducciones de IRPF para personas con salario desde 15 BPC.
 */
const TASA_DEDUCCIONES_DESDE15BPC = 8;

export {
  BPC,
  IPRF_FRANJAS,
  APORTES_JUBILATORIOS,
  APORTES_FONASA_HASTA25BPC,
  APORTES_FONASA_DESDE25BPC,
  APORTE_FRL,
  TOPE_AFAP,
  TASA_DEDUCCIONES_DESDE15BPC,
  TASA_DEDUCCIONES_HASTA15BPC,
};
