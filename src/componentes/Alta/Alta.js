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
    

    onSubmitAlta(event) {
        event.preventDefault();
        fetch('http://localhost:8080/api/v1/vemecs/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                this.state
            )
        })
        .then(() => this.props.onRouteChange('Inicio'));
    }

    render(){
        const styleAlta = {
            backgroundColor: "lightgray",
            height: "420px",
            width: "350px"
        }
        return(   
            <article>
                <main>
                    <div className="row justify-content-center" >
                        
                        <div className="form-group lg-col-1 border border-info" id="alta" style={styleAlta}>
                            <h5 className="card-header justify-content-center info-color white-text text-center py-4 border border-info">
                                <strong>Ingresar</strong>
                            </h5>
                            <form className="text-center" style={{color: "lightblue"}}>
                                <div className="form-group lg-col-1">
                                        <div className="form-group lg-col-1">
                                            <input
                                                onChange={this.onIdChange}
                                                className="form-control"
                                                type="text"
                                                placeholder="ID"
                                                name="altaId"
                                                value={this.state.id}
                                                id="altaId" />
                                        </div>
                                </div>
                                <div className="form-group lg-col-1">
                                    <input
                                        onChange={this.onMarcaChange}
                                        type="text"
                                        className="form-control"
                                        name="marca"
                                        placeholder="Marca"
                                        value={this.state.marca}
                                        id="marca" />
                                </div>
                                <div className="form-group lg-col-1">
                                    
                                    <input
                                        onChange={this.onModeloChange}
                                        type="text"
                                        className="form-control"
                                        name="modelo"
                                        placeholder="Modelo"
                                        value={this.state.modelo}
                                        id="modelo" />
                                </div>
                                <div className="form-group lg-col-1">
                                    
                                    <input
                                        onChange={this.onUbicacionChange}
                                        type="text"
                                        className="form-control"
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
                                    onClick={() => this.props.onRouteChange('Inicio')}
                                    className="btn btn-rounded btn-block my-4 waves-effect z-depth-0 btn-outline-danger"
                                    type="button"
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