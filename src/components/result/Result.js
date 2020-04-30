import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { BPC, IRPF_FRANJAS, ADICIONAL_FONDO_SOLIDARIDAD } from "../../data/constants";
import history from "../../history";
import "./Result.css";

const Result = ({
  formSubmitted,
  salarioLiquido,
  aportesJubilatorios,
  aportesFONASA,
  aporteFRL,
  detalleIRPF,
  totalIRPF,
  aportesFondoSolidaridad,
  adicionalFondoSolidaridad,
  aportesCJPPU,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Para evitar que el usuario navegue directamente a esta pagina sin pasar por el formulario
  if (!formSubmitted) {
    history.push("/");
    return <span>Redirigiendo...</span>;
  }

  const totalFondoSolidaridadRedondeado = Number(
    ((aportesFondoSolidaridad * BPC) / 12 + (adicionalFondoSolidaridad ? ADICIONAL_FONDO_SOLIDARIDAD : 0)).toFixed(2)
  );

  const aportesCJPPURedondeado = Number(aportesCJPPU.toFixed(2));

  /**
   * Tabla con el detalle de cada franja del IRPF.
   */
  const tablaIRPF = IRPF_FRANJAS.map((franja, index) => {
    return (
      <React.Fragment key={index}>
        <span className="tablaIRPF-dato">{franja.desde} BPC</span>
        <span className="tablaIRPF-dato">{franja.hasta !== 0 ? franja.hasta + " BPC" : "-"}</span>
        <span className="tablaIRPF-dato">{franja.tasa}%</span>
        <span className="tablaIRPF-dato">{detalleIRPF.impuestoFranja[index]}</span>
      </React.Fragment>
    );
  });

  return (
    <div className="result">
      <Link className="btnVolver" to="/">
        Volver
      </Link>
      <div className="liquido">
        <span className="liquido-label"> Salario líquido:</span> <span className="liquido-dato">${salarioLiquido}</span>
      </div>
      <h2 className="result-section">Detalle BPS:</h2>
      <div className="detalleBPS">
        <span className="tablaBPS-label">Jubilatorio</span>
        <span className="tablaBPS-dato">{aportesJubilatorios}</span>
        <span className="tablaBPS-label">FONASA</span>
        <span className="tablaBPS-dato">{aportesFONASA}</span>
        <span className="tablaBPS-label">FRL</span>
        <span className="tablaBPS-dato">{aporteFRL}</span>
        <span className="tablaBPS-label">Total BPS:</span>
        <span className="tablaBPS-dato totalBPS">${aportesJubilatorios + aportesFONASA + aporteFRL}</span>
      </div>
      <h2 className="result-section">Detalle IRPF:</h2>
      <div className="detalleIRPF">
        <span className="tablaIRPF-head">Desde</span>
        <span className="tablaIRPF-head">Hasta</span>
        <span className="tablaIRPF-head">Tasa</span>
        <span className="tablaIRPF-head">Impuesto:</span>
        {tablaIRPF}
      </div>
      <div className="resumenIRPF">
        <span className="resumenIRPF-label">Deducciones:</span>
        <span className="resumenIRPF-dato resumenIRPF-deducciones">${detalleIRPF.deducciones}</span>
        <span className="resumenIRPF-label">Tasa deducciones:</span>
        <span className="resumenIRPF-dato resumenIRPF-tasa">{detalleIRPF.tasaDeducciones}%</span>
        <span className="resumenIRPF-labelTotal">Total IRPF:</span>
        <span className="resumenIRPF-dato resumenIRPF-total">${totalIRPF}</span>
      </div>
      <h2 className="result-section">Profesionales:</h2>
      <div className="detalleProfesionales">
        <span className="tablaProfesionales-label">Fondo Solidaridad:</span>
        <span className="tablaProfesionales-dato">${totalFondoSolidaridadRedondeado}</span>
        <span className="tablaProfesionales-label">Aportes CJPPU / Caja Notarial:</span>
        <span className="tablaProfesionales-dato">${aportesCJPPURedondeado}</span>
      </div>
    </div>
  );
};

export default Result;
