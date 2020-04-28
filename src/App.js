import React from "react";

import calcularImpuestos from "./services/calculos";
import "./App.css";
import Form from "./components/form/Form";

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
  };

  onFormElementChanged = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    console.log(name + ": " + value);

    this.setState({ formState: { ...this.state.formState, [name]: value } });
  };

  onFormSubmitted = (e) => {
    e.preventDefault();

    const { aportesJubilatorios, aportesFONASA, aporteFRL, detalleIRPF, totalIRPF } = calcularImpuestos(
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

    console.log({ aportesJubilatorios, aportesFONASA, aporteFRL, detalleIRPF, totalIRPF });
  };

  render = () => {
    return (
      <div className="App">
        <div className="content">
          <header className="title">
            <h1>Salario líquido Uruguay</h1>
          </header>
          <main>
            <Form
              onFormElementChanged={this.onFormElementChanged}
              onFormSubmitted={this.onFormSubmitted}
              formState={this.state.formState}
            ></Form>
          </main>
        </div>
        <footer className="footer">Creado por Ismael Padilla.</footer>
      </div>
    );
  };
}

export default App;
