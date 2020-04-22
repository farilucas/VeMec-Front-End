import React from 'react';

class Alta extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            marca: '',
            modelo: '',
            ubicacion: '',
            route: 'Alta'
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
    onRouteChange = (route) => {
        this.setState({route: 'Inicio'});
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
                    <div className="card border border-info">
                        <h5 class="card-header info-color white-text text-center py-4 border border-info">
                            <strong>Ingresar</strong>
                        </h5>
                        <div class="card-body px-lg-5 pt-0" id="alta">
                            <form class="text-center" style={{color: "lightblue"}}>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="md-form">
                                            <input
                                                onChange={this.onIdChange}
                                                className="form-control border border-info form-rounded"
                                                type="text"
                                                placeholder="ID"
                                                name="altaId"
                                                value={this.state.id}
                                                id="altaId" />
                                        </div>
                                    </div>
                                </div>
                                <div className="md-form mt-0">
                                    <input
                                        onChange={this.onMarcaChange}
                                        type="text"
                                        className="form-control border border-info form-rounded"
                                        name="marca"
                                        placeholder="Marca"
                                        value={this.state.marca}
                                        id="marca" />
                                </div>
                                <div className="md-form">
                                    
                                    <input
                                        onChange={this.onModeloChange}
                                        type="text"
                                        className="form-control border border-info form-rounded"
                                        name="modelo"
                                        placeholder="Modelo"
                                        value={this.state.modelo}
                                        id="modelo" />
                                </div>
                                <div className="md-form">
                                    
                                    <input
                                        onChange={this.onUbicacionChange}
                                        type="text"
                                        className="form-control form-rounded border border-info "
                                        name="ubicacion"
                                        placeholder="Ubicacion"
                                        value={this.state.ubicacion}
                                        id="ubicacion" />
                                </div>
                                <input
                                onClick={this.onSubmitAlta}
                                className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                                type="submit"
                                value="Ingresar" />
                                <input
                                    onClick={() => this.onRouteChange=('Inicio')}
                                    className="btn btn-rounded btn-block my-4 waves-effect z-depth-0 btn-outline-danger"
                                    type="submit"
                                    value="Cancelar" />
                            </form>
                        </div>
                        
                            
                        
                    </div>
                </main>
            </article>
        );   
    }
    
}

export default Alta;