import {
  BPC,
  APORTES_JUBILATORIOS,
  APORTES_FONASA_HASTA25BPC,
  APORTES_FONASA_DESDE25BPC,
  APORTE_FRL,
} from "../data/constants";

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
  const aportesJubilatorios = salarioNominal * APORTES_JUBILATORIOS * 0.01;
  const aportesFONASA = salarioNominal * porcentajeFonasa * 0.01;
  const aporteFRL = salarioNominal * APORTE_FRL * 0.01;
  return { aportesJubilatorios, aportesFONASA, aporteFRL };
};
