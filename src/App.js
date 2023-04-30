import React, { useState } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import Form from "./components/form/Form";
import Result from "./components/result/Result";
import calcularImpuestos from "./services/calculos";
import history from "./history";
import "./App.css";
import { ReactComponent as GithubLogo } from "./assets/githubLogo.svg";
import pjsonn from "../package.json";

function App() {
  const [formState, setFormState] = useState({
    salarioNominal: 0,
    tieneHijos: false,
    tieneConyuge: false,
    factorDeduccionPersonasACargo: 1,
    cantHijosSinDiscapacidad: 0,
    cantHijosConDiscapacidad: 0,
    aportesFondoSolidaridad: 0,
    adicionalFondoSolidaridad: false,
    aportesCJPPU: 0,
    otrasDeducciones: 0,
    formValido: true,
  });

  const [result, setResult] = useState({
    formSubmitted: false,
    salarioLiquido: 0,
    aportesJubilatorios: 0,
    aportesFONASA: 0,
    aporteFRL: 0,
    detalleIRPF: 0,
    totalIRPF: 0,
    aportesFondoSolidaridad: 0,
    adicionalFondoSolidaridad: false,
    aportesCJPPU: 0,
  });
  /**
   * Función que se llama cuando el usuario modifica alguno de los inputs del formulario.
   */
  const onFormElementChanged = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : Number(e.target.value);

    setFormState({ ...formState, [name]: value, formValido: true });
  };

  /**
   * Función que se llama cuando el usuario hace submit en el formulario.
   */
  const onFormSubmitted = (e) => {
    e.preventDefault();

    if (formState.salarioNominal > 0) {
      const {
        salarioLiquido,
        aportesJubilatorios,
        aportesFONASA,
        aporteFRL,
        detalleIRPF,
        totalIRPF,
      } = calcularImpuestos(
        formState.salarioNominal,
        formState.tieneHijos,
        formState.tieneConyuge,
        formState.factorDeduccionPersonasACargo,
        formState.cantHijosSinDiscapacidad,
        formState.cantHijosConDiscapacidad,
        formState.aportesFondoSolidaridad,
        formState.adicionalFondoSolidaridad,
        formState.aportesCJPPU,
        formState.otrasDeducciones
      );

      const newResult = {
        formSubmitted: true,
        salarioLiquido,
        aportesJubilatorios,
        aportesFONASA,
        aporteFRL,
        detalleIRPF,
        totalIRPF,
        aportesFondoSolidaridad: formState.aportesFondoSolidaridad,
        adicionalFondoSolidaridad: formState.adicionalFondoSolidaridad,
        aportesCJPPU: formState.aportesCJPPU,
      };
      setResult(newResult);
      if (salarioLiquido >= 0) {
        setFormState({ ...formState, formValido: true });
        history.push("result");
      } else {
        setFormState({ ...formState, formValido: false });
      }
    } else {
      setFormState({ ...formState, formValido: false });
    }
  };

  return (
    <Router history={history}>
    <div className="App">
      <div className="content">
        <header className="title">
          <h1 className="title-text">
            Salario líquido Uruguay <span className="anio">2022</span>
          </h1>
        </header>
       
          <Switch>
            <Route path="/result">
              <Result {...result}></Result>
            </Route>
            <Route exact path="/form">
              <main>
                <Form
                  onFormElementChanged={onFormElementChanged}
                  onFormSubmitted={onFormSubmitted}
                  formState={formState}
                ></Form>
              </main>
            </Route>
            <Redirect to="/form" />
          </Switch>
        
      </div>
      <footer className="footer">
        <div className="footer-about">
          <span className="footer-txt autor">
            Creado por{" "}
            <a
              className="autor-link"
              href="https://www.linkedin.com/in/ismaelpadilla/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ismael Padilla.
            </a>
          </span>
          <span className="footer-txt ultimaActualizacion">v{pjsonn.version} - Última actualización: Marzo 2022</span>
        </div>
        <a
          href="https://github.com/ismaelpadilla/salario-liquido-uruguay"
          aria-label="Source code"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo className="githubLogo" />
        </a>
      </footer>
    </div>
    </Router>
  );
}

export default App;
