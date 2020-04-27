import React, {Component} from 'react';
import Alta from './componentes/Alta/Alta';
import Modificar from './componentes/Modificar/Modificar';
import Navegacion from './componentes/Navigation/Navigation';
import Panel from "./componentes/Panel/Panel";
import ListaEstados from "./componentes/ListaEstados/ListaEstados";
import "bootstrap/dist/css/bootstrap.css";

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
                pSalida: 0
            }
        ]
    },
    route: 'Inicio',
    pagina: 'inicio'
}


class App extends Component {
    constructor(props) {
        super(props);
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



    onRouteChange = (route, vemec) => {
        if (route === 'Alta') {
            this.setState({pagina: 'alta', route});
        } else if (route === 'Inicio') {
            this.setState({pagina: 'inicio', route});
        } else if (route === 'Modificar') {
            this.setState({pagina: 'modificar', vemec, route});
        } else if (route === 'Detalles') {
            this.setState({pagina: 'detalles', vemec, route});
        }
    }

    render() {
        const {route, pagina} = this.state;

        let currentComponent;

        switch (route) {
            default:
            case 'Inicio':
                currentComponent = (
                    <div>
                        <Panel onRouteChange={this.onRouteChange}/>
                    </div>
                );
                break;

            case 'Alta':
                currentComponent = (
                    <div>
                        <Alta loadVeMec={this.loadVeMec} onRouteChange={this.onRouteChange}/>
                    </div>
                );
                break;

            case 'Modificar':
                currentComponent = (
                    <div>
                        <Modificar vemec={this.state.vemec} onRouteChange={this.onRouteChange}/>
                    </div>
                );
                break;

            case 'Detalles':
                currentComponent = (
                    <div>
                        <ListaEstados id={this.state.vemec} onRouteChange={this.onRouteChange}/>
                    </div>
                );
                break;
        }

        return (
            
            <div className="App">
                <Navegacion pagina={pagina} onRouteChange={this.onRouteChange}/>

                { currentComponent }
            </div>
        );
    }
}

export default App;
