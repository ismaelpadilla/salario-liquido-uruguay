import { calcularAportesBPS } from "./calculos";

describe("Probar cálculo de aportes BPS", () => {
  test.each([
      [1000, false, false, 150, 30, 1],
      [1000, true, false, 150, 30, 1],
      [1000, false, true, 150, 50, 1],
      [1000, true, true, 150, 50, 1],
      [20000, false, false, 3000, 900, 20],
      [20000, true, false, 3000, 1200, 20],
      [20000, false, true, 3000, 1300, 20],
      [20000, true, true, 3000, 1600, 20],
])(
    "Calcula aportes BPS correctamente",
    (salarioNominal, tieneHijos, tieneConyuge, esperadoJubilatorio, esperadoFONASA, esperadoFRL) => {
      const resultado = calcularAportesBPS(salarioNominal, tieneHijos, tieneConyuge);

      // Lo esperado deberia estar a un valor razonable de lo obtenido, para evitar errores de redondeo
      expect(resultado.aportesJubilatorios).toBeCloseTo(esperadoJubilatorio);
      expect(resultado.aportesFONASA).toBeCloseTo(esperadoFONASA);
      expect(resultado.aporteFRL).toBeCloseTo(esperadoFRL);
    }
  );
});
