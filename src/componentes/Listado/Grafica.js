import React, { Component } from 'react'

class Grafica extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            estados: props.estados
        };
    }

    render() {
        /* Magia de Jorge ? */
        /* lo de los timestamp es para ver que funque */
        const Grafica1 = (
            <div className="Grafica" class="Graficachan">
                {this.state.estados.map(estado =>
                    <label>timestamp: {estado.timestamp}</label>
                )}
            </div>
        );
        return (Grafica1);
    }

}
export default Grafica