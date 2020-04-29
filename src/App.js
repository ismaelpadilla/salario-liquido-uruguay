import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import Form from "./components/form/Form";
import Result from "./components/result/Result";
import calcularImpuestos from "./services/calculos";
import history from "./history";
import "./App.css";
import { ReactComponent as GithubLogo } from "./assets/githubLogo.svg";

class App extends React.Component {
  state = {
    formState: {
      salarioNominal: 0,
      tieneHijos: false,
      tieneConyuge: false,
      cantHijosSinDiscapacidad: 0,
      cantHijosConDiscapacidad: 0,
      aportesFondoSolidaridad: 0,
      adicionalFondoSolidaridad: false,
      aportesCJPPU: 0,
      otrasDeducciones: 0,
    },
    result: {
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
    },
  };

  /**
   * Función que se llama cuando el usuario modifica alguno de los inputs del formulario.
   */
  onFormElementChanged = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : Number(e.target.value);

    this.setState({ formState: { ...this.state.formState, [name]: value } });
  };

  /**
   * Función que se llama cuando el usuario hace submit en el formulario.
   */
  onFormSubmitted = (e) => {
    e.preventDefault();

    if (this.state.formState.salarioNominal > 0) {
      const {
        salarioLiquido,
        aportesJubilatorios,
        aportesFONASA,
        aporteFRL,
        detalleIRPF,
        totalIRPF,
      } = calcularImpuestos(
        this.state.formState.salarioNominal,
        this.state.formState.tieneHijos,
        this.state.formState.tieneConyuge,
        this.state.formState.cantHijosSinDiscapacidad,
        this.state.formState.cantHijosConDiscapacidad,
        this.state.formState.aportesFondoSolidaridad,
        this.state.formState.adicionalFondoSolidaridad,
        this.state.formState.aportesCJPPU,
        this.state.formState.otrasDeducciones
      );

      const result = {
        formSubmitted: true,
        salarioLiquido,
        aportesJubilatorios,
        aportesFONASA,
        aporteFRL,
        detalleIRPF,
        totalIRPF,
        aportesFondoSolidaridad: this.state.formState.aportesFondoSolidaridad,
        adicionalFondoSolidaridad: this.state.formState.adicionalFondoSolidaridad,
        aportesCJPPU: this.state.formState.aportesCJPPU,
      };
      this.setState({ result });
      if (salarioLiquido >= 0) history.push("result");
    }
  };

  render = () => {
    return (
      <Router history={history}>
        <div className="App">
          <div className="content">
            <header className="title">
              <h1>Salario líquido Uruguay</h1>
            </header>
            <Switch>
              <Route path="/result">
                <Result {...this.state.result}></Result>
              </Route>
              <Route exact path="/form">
                <main>
                  <Form
                    onFormElementChanged={this.onFormElementChanged}
                    onFormSubmitted={this.onFormSubmitted}
                    formState={this.state.formState}
                  ></Form>
                </main>
              </Route>
              <Redirect to="/form" />
            </Switch>
          </div>
          <footer className="footer">
            <div className="footer-content">
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
                <span className="footer-txt ultimaActualizacion">Última actualización: Abril 2019</span>
              </div>
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
  };
}

export default App;
