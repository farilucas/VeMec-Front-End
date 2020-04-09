import React, {Component} from 'react';

const inicialState = {
  VeMec: {
    id: '',
    marca: '',
    modelo: '',
    ubicacion: 0,
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
}

class App extends Component {
  constructor() {
    super();
    this.state = inicialState;
  }

  loadUser = (data) => {
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

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('http://localhost:3000/api/vemecs', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/api/vemecs/{$id}', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        console.log(response);
        this.displayFaceBoxes(this.calculateFaceLocations(response))
      })
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <h1>Bienvenidos</h1>
        <input></input>
      </div>
    );
  }
}

export default App;
