import React, {Component} from 'react';
import Alta from './componentes/Alta/Alta';
import Inicio from './componentes/Listado/Inicio';
import Navegacion from './componentes/Navigation/Navigation';

const inicialState = {
  VeMec: {
    id: '',
    marca: '',
    modelo: '',
    ubicacion: '',

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
        pSalida: 30
      } 
    ]
  },
  route: 'Inicio',
  dadoDeAlta: false,
  
}

class App extends Component {
  constructor() {
    super();
    this.state = inicialState;
  }

  loadVeMec = (data) => {
    this.setState({
      Estados: {
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
    if(route === 'Alta'){
      this.setState({ dadoDeAlta: true });
    }
    else{
      this.setState({dadoDeAlta: false});
    }
    this.setState({ route: route });
  }

  render(){
    const{route, dadoDeAlta} = this.state;
    return (
      <div className="App">
        <Navegacion dadoDeAlta={dadoDeAlta} onRouteChange={this.onRouteChange}/>
        {route === 'Inicio'
          ?<div>
            <Inicio onRouteChange={this.onRouteChange}/>
          </div>
          :( 
            route === 'Alta'
            ?<div>
              <Alta loadVeMec={this.loadVeMec} onRouteChange={this.onRouteChange}/>
            </div>
            :<div>

            </div>           
          )
            }
        
      </div>
    );
  }
}

export default App;
