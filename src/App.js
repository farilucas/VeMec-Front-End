import React, {Component} from 'react';
import Panel from "./componentes/Panel/Panel";
import ListaEstados from "./componentes/ListaEstados/ListaEstados";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render(){
    return (
      <div className="App">
        {/*<Panel/>*/}
        <ListaEstados id={"VEMEC1"}/>
      </div>
    );
  }
}

export default App;
