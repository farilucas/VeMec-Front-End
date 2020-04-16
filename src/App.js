import React, {Component} from 'react';
import Alta from './componentes/Alta/Alta';
import Navegacion from './componentes/Navigation/Navigation';

const inicialState = {
  VeMec: {
    id: '',
    marca: '',
    modelo: '',
    ubicacion: '',
    route: 'Alta',
    Estados: [
      {
        pMax: 0,
        pMin: 0,
        VolGas: 0,
        FrecuenciaAporte: 0,
        ComposicionO2: 0,
        HumedadAire: 0,
        tEntrada: 0,
        tSalida: 0,
        pEntrada: 0,
        pSalida: 0
      } 
    ]
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = inicialState;
  }

  loadVeMec = (data) => {
    this.setState({
      VeMec: {
        id: data.id,
        marca: data.marca,
        modelo: data.modelo,
        ubicacion: data.ubicacion,
        pMax: data.pMax,
        pMin: data.pMin,
        VolGas: data.VolGas,
        FrecuenciaAporte: data.FrecuenciaAporte,
        ComposicionO2: data.ComposicionO2,
        HumedadAire: data.HumedadAire,
        tEntrada: data.tEntrada,
        tSalida: data.tSalida,
        pEntrada: data.pEntrada,
        pSalida: data.pSalida
      }
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }


  onRouteChange = (route) =>{
    this.setState({ route: route });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('http://localhost:3000/Alta', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/Alta', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.VeMec.id
            })
          })
        }
      })
      .catch(err => console.log(err));
  }

  render(){
    const{route} = this.state;
    return (
      <div className="App">
        <Navegacion onRouteChange={this.onRouteChange}/> 
        <Alta loadVeMec={this.loadUser} onRouteChange={this.onRouteChange}/>
      </div>
    );
  }
}

export default App;
