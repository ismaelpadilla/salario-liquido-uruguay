import React from "react";

import "./Form.css";

const Form = ({ onFormElementChanged, onFormSubmitted, formState }) => {
  return (
    <form className="form" onSubmit={onFormSubmitted}>
      <div className="form-grid">
        <label htmlFor="inputSalario">Salario nominal en pesos:</label>
        <input
          id="inputSalario"
          name="salarioNominal"
          className="form-input"
          type="number"
          value={formState.salarioNominal}
          onChange={onFormElementChanged}
        ></input>
      </div>
      <h2 className="form-section">Cálculo de aportes BPS</h2>
      <div className="form-grid">
        <label htmlFor="inputHijosACargo">¿Tiene hijos a cargo?</label>
        <input
          id="inputHijosACargo"
          name="tieneHijos"
          className="form-checkbox"
          type="checkbox"
          checked={formState.tieneHijos}
          onChange={onFormElementChanged}
        ></input>
        <label htmlFor="inputConyujeACargo">¿Tiene cónyuge a cargo?</label>
        <input
          id="inputConyujeACargo"
          name="tieneConyuge"
          className="form-checkbox"
          type="checkbox"
          checked={formState.tieneConyuge}
          onChange={onFormElementChanged}
        ></input>
      </div>
      <h2 className="form-section">Cálculo de IRPF</h2>
      <h3 className="form-subSection">Cantidad de personas a cargo:</h3>
      <div className="form-grid">
        <label htmlFor="inputFactorDeduccion">Porcentaje de deducción de las personas a cargo:</label>
        <select
          id="inputFactorDeduccion"
          name="factorDeduccionPersonasACargo"
          className="form-input"
          value={formState.factorDeduccionPersonasACargo}
          onChange={onFormElementChanged}
        >
          <option value="1">100%</option>
          <option value="0.5">50%</option>
          <option value="0">No deducción</option>
        </select>
        <label htmlFor="inputHijosSinDiscapacidad">Cantidad de hijos sin discapacidad:</label>
        <input
          id="inputHijosSinDiscapacidad"
          name="cantHijosSinDiscapacidad"
          className="form-input"
          type="number"
          value={formState.cantHijosSinDiscapacidad}
          onChange={onFormElementChanged}
        ></input>
        <label htmlFor="inputHijosConDiscapacidad">Cantidad de hijos con discapacidad:</label>
        <input
          id="inputHijosConDiscapacidad"
          name="cantHijosConDiscapacidad"
          className="form-input"
          type="number"
          value={formState.cantHijosConDiscapacidad}
          onChange={onFormElementChanged}
        ></input>
      </div>
      <h3 className="form-subSection">Si es profesional:</h3>
      <div className="form-grid">
        <label htmlFor="inputAportesFondoSolidaridad">¿Aporta al Fondo de Solidaridad?</label>
        <select
          id="inputAportesFondoSolidaridad"
          name="aportesFondoSolidaridad"
          className="form-input"
          value={formState.aportesFondoSolidaridad}
          onChange={onFormElementChanged}
        >
          <option value="0">No</option>
          <option value="0.5">1/2 BPC</option>
          <option value="1">1 BPC</option>
          <option value="2">2 BPC</option>
        </select>
        <label htmlFor="inputAdicionalFondoSolidaridad">¿Adicional Fondo de Solidaridad?</label>
        <input
          id="inputAdicionalFondoSolidaridad"
          name="adicionalFondoSolidaridad"
          className="form-input"
          type="checkbox"
          checked={formState.adicionalFondoSolidaridad}
          onChange={onFormElementChanged}
        />
        <label htmlFor="inputAportesCajaProfesionales">Aporte mensual a CJPPU o Caja Notarial:</label>
        <input
          id="inputAportesCajaProfesionales"
          name="aportesCJPPU"
          className="form-input"
          type="number"
          value={formState.aportesCJPPU}
          onChange={onFormElementChanged}
        ></input>
        <label htmlFor="inputOtrasDeducciones">Otras deducciones:</label>
        <input
          id="inputOtrasDeducciones"
          name="otrasDeducciones"
          className="form-input"
          type="number"
          value={formState.otrasDeducciones}
          onChange={onFormElementChanged}
        ></input>
      </div>
      <button className="btnSubmit">Calcular</button>
    </form>
  );
};

export default Form;
