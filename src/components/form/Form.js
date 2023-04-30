import React, { useEffect } from "react";

import "./Form.css";

const Form = ({ onFormElementChanged, onFormSubmitted, formState }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Función que se invoca al seleccionar un input.
   * Selecciona los contenidos del mismo.
   */
  const handleFocus = (e) => {
    e.target.select();
  };

  const submitBtnClasses = ["btnSubmit"];

  if (!formState.formValido) submitBtnClasses.push("btnSubmit-invalido");

  return (
    <form className="form" onSubmit={onFormSubmitted}>
      <div className="form-grid">
        <label className="form-label" htmlFor="inputSalario">Salario nominal en pesos:</label>
        <input
          id="inputSalario"
          name="salarioNominal"
          className="form-control"
          type="number"
          min="0"
          onFocus={handleFocus}
          value={formState.salarioNominal}
          onChange={onFormElementChanged}
        ></input>
      </div>
      <h2 className="form-section my-4">Cálculo de aportes BPS</h2>
      <div className="form-grid">
        <label className="form-check-label" htmlFor="inputHijosACargo">¿Tiene hijos a cargo?</label>
        <input
          id="inputHijosACargo"
          name="tieneHijos"
          className="form-check-input"
          type="checkbox"
          checked={formState.tieneHijos}
          onChange={onFormElementChanged}
        ></input>
        <label className="form-check-label" htmlFor="inputConyujeACargo">¿Tiene cónyuge a cargo?</label>
        <input
          id="inputConyujeACargo"
          name="tieneConyuge"
          className="form-check-input"
          type="checkbox"
          checked={formState.tieneConyuge}
          onChange={onFormElementChanged}
        ></input>
      </div>
      <h2 className="form-section my-4">Cálculo de IRPF</h2>
      <h3 className="form-subSection mb-4">Cantidad de personas a cargo:</h3>
      <div className="form-grid">
        <label className="form-label" htmlFor="inputFactorDeduccion">Porcentaje de deducción de las personas a cargo:</label>
        <select
          id="inputFactorDeduccion"
          name="factorDeduccionPersonasACargo"
          className="form-control"
          value={formState.factorDeduccionPersonasACargo}
          onChange={onFormElementChanged}
        >
          <option value="1">100%</option>
          <option value="0.5">50%</option>
          <option value="0">No deducción</option>
        </select>
        <label className="form-label" htmlFor="inputHijosSinDiscapacidad">Cantidad de hijos sin discapacidad:</label>
        <input
          id="inputHijosSinDiscapacidad"
          name="cantHijosSinDiscapacidad"
          className="form-control"
          type="number"
          onFocus={handleFocus}
          min="0"
          value={formState.cantHijosSinDiscapacidad}
          onChange={onFormElementChanged}
        ></input>
        <label className="form-label" htmlFor="inputHijosConDiscapacidad">Cantidad de hijos con discapacidad:</label>
        <input
          id="inputHijosConDiscapacidad"
          name="cantHijosConDiscapacidad"
          className="form-control"
          type="number"
          onFocus={handleFocus}
          min="0"
          value={formState.cantHijosConDiscapacidad}
          onChange={onFormElementChanged}
        ></input>
      </div>
      <h3 className="form-subSection my-4">Si es profesional:</h3>
      <div className="form-grid">
        <label htmlFor="inputAportesFondoSolidaridad">¿Aporta al Fondo de Solidaridad?</label>
        <select
          id="inputAportesFondoSolidaridad"
          name="aportesFondoSolidaridad"
          className="form-select"
          value={formState.aportesFondoSolidaridad}
          onChange={onFormElementChanged}
        >
          <option value="0">No</option>
          <option value="0.5">1/2 BPC</option>
          <option value="1">1 BPC</option>
          <option value="2">2 BPC</option>
        </select>
        <label className="form-check-label" htmlFor="inputAdicionalFondoSolidaridad">¿Adicional Fondo de Solidaridad?</label>
        <input
          id="inputAdicionalFondoSolidaridad"
          name="adicionalFondoSolidaridad"
          className="form-check-input"
          type="checkbox"
          checked={formState.adicionalFondoSolidaridad}
          onChange={onFormElementChanged}
        />
        <label className="form-label" htmlFor="inputAportesCajaProfesionales">Aporte mensual a CJPPU o Caja Notarial:</label>
        <input
          id="inputAportesCajaProfesionales"
          name="aportesCJPPU"
          className="form-control"
          type="number"
          onFocus={handleFocus}
          min="0"
          value={formState.aportesCJPPU}
          onChange={onFormElementChanged}
        ></input>
        <label className="form-label" htmlFor="inputOtrasDeducciones">Otras deducciones:</label>
        <input
          id="inputOtrasDeducciones"
          name="otrasDeducciones"
          className="form-control"
          type="number"
          onFocus={handleFocus}
          min="0"
          value={formState.otrasDeducciones}
          onChange={onFormElementChanged}
        ></input>
      </div>
      <button key={+new Date()} className={`${submitBtnClasses.join(" ")} btn btn-primary  my-4 px-5 fs-5`}>
        Calcular
      </button>
    </form>
  );
};

export default Form;
