import React, { Component } from 'react'
import Grafica from './Grafica';

class VeMec extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            marca: props.marca,
            modelo: props.modelo,
            ubicacion: props.ubicacion,
            estados: props.estados
        };
    }

    render() {
        const VeMec1 = (
            <div className="VeMec" class="vemekun">
                <label>id: {this.state.id}</label>
                <label>marca: {this.state.marca}</label>
                <label>modelo: {this.state.modelo}</label>
                <label>ubicacion: {this.state.ubicacion}</label>
                <Grafica id={this.state.id} estados={this.state.estados} />
            </div>
          );
        return (VeMec1);
    }

}
export default VeMec