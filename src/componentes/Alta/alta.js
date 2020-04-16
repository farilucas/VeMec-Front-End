import React from 'react';

class Alta extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            altaId: '',
            altaMarca: '',
            altaModelo: '',
            altaUbicacion: '',
        }
    }
    onIdChange = (event) => {
		this.setState({altaId: event.target.value});
	}
	onMarcaChange = (event) => {
		this.setState({altaMarca: event.target.value});
    }
    onModeloChange = (event) => {
        this.setState({ altaModelo: event.target.value });
    }
    onUbicacionChange = (event) => {
        this.setState({ altaUbicacion: event.target.value });
    }

    onSubmitAlta = () => {
        fetch('http://localhost:3000/Alta', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                altaId: this.state.altaId,
                altaMarca: this.state.altaMarca,
                altaModelo: this.state.altaModelo,
                altaUbicacion: this.state.altaUbicacion
            })
        })
            .then(response => response.json())
            .then(VeMec => {
                if (VeMec.id) {
                    this.props.loadVeMec(VeMec);
                    this.props.onRouteChange('home');
                }
            })
    }

    render(){
        return(
            <article>
                <main>
                    <div>
                        <fieldset id="alta">
                            <legend>Ingresar</legend>
                            <div>
                                <label htmlFor="altaId">Id</label>
                                <input
                                    onChange={this.onIdChange}
                                    type="text"
                                    name="altaId"
                                    id="altaId" />
                            </div>
                            <div>
                                <label htmlFor="Marca">Marca</label>
                                <input
                                    onChange={this.onMarcaChange}
                                    type="text"
                                    name="marca"
                                    id="marca" />
                            </div>
                            <div>
                                <label htmlFor="Modelo">Modelo</label>
                                <input
                                    onChange={this.onModeloChange}
                                    type="text"
                                    name="modelo"
                                    id="modelo" />
                            </div>
                            <div>
                                <label htmlFor="Ubicacion">Ubicacion</label>
                                <input
                                    onChange={this.onUbicacionChange}
                                    type="text"
                                    name="ubicacion"
                                    id="ubicacion" />
                            </div>
                            
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitAlta}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Ingresar" />
                        </div>
                    </div>
                </main>
            </article>
        );   
    }
    
}

export default Alta;