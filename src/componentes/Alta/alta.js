import React from 'react';

class Alta extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            marca: '',
            modelo: '',
            ubicacion: '',
        }
        this.onIdChange = this.onIdChange.bind(this);
        this.onMarcaChange = this.onMarcaChange.bind(this);
        this.onModeloChange = this.onModeloChange.bind(this);
        this.onUbicacionChange = this.onUbicacionChange.bind(this);
        this.onSubmitAlta = this.onSubmitAlta.bind(this);
    }
    onIdChange = (event) => {
		this.setState({id: event.target.value});
	}
	onMarcaChange = (event) => {
		this.setState({marca: event.target.value});
    }
    onModeloChange = (event) => {
        this.setState({ modelo: event.target.value });
    }
    onUbicacionChange = (event) => {
        this.setState({ ubicacion: event.target.value });
    }


    onSubmitAlta(event) {
        event.preventDefault();
        fetch('http://localhost:8080/api/v1/vemecs/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                this.state
            )
        }).then(result => console.log('works', result))
            .catch(error => console.log('wornksnt', error))
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
                                    value={this.state.id}
                                    id="altaId" />
                            </div>
                            <div>
                                <label htmlFor="Marca">Marca</label>
                                <input
                                    onChange={this.onMarcaChange}
                                    type="text"
                                    name="marca"
                                    value={this.state.marca}
                                    id="marca" />
                            </div>
                            <div>
                                <label htmlFor="Modelo">Modelo</label>
                                <input
                                    onChange={this.onModeloChange}
                                    type="text"
                                    name="modelo"
                                    value={this.state.modelo}
                                    id="modelo" />
                            </div>
                            <div>
                                <label htmlFor="Ubicacion">Ubicacion</label>
                                <input
                                    onChange={this.onUbicacionChange}
                                    type="text"
                                    name="ubicacion"
                                    value={this.state.ubicacion}
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