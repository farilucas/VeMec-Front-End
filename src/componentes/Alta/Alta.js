import React from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup"; 
import Button from "react-bootstrap/Button";
import API_URL from "../../Api";

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
        fetch(`${API_URL}/vemecs/`, {
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
                        
                        <Card className="form-group lg-col-1 border border-info" id="alta" style={styleAlta}>
                            <Card.Header className="text-center">
                                <strong>Ingresar</strong>
                            </Card.Header>
                            <Form>
                                <Card.Body className="pb-1">
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onIdChange}
                                            type="text"
                                            placeholder="ID"
                                            name="altaId"
                                            value={this.state.id}
                                            id="altaId" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onMarcaChange}
                                            type="text"
                                            name="marca"
                                            placeholder="Marca"
                                            value={this.state.marca}
                                            id="marca" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onModeloChange}
                                            type="text"
                                            name="modelo"
                                            placeholder="Modelo"
                                            value={this.state.modelo}
                                            id="modelo" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onUbicacionChange}
                                            type="text"
                                            name="ubicacion"
                                            placeholder="Ubicacion"
                                            value={this.state.ubicacion}
                                            id="ubicacion" />
                                    </FormGroup>
                                    <Button
                                        onClick={this.onSubmitAlta}
                                        variant="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">Agregar</Button>
                                    <Button
                                        onClick={() => this.props.onRouteChange('Inicio')}
                                        variant="btn btn-outline-danger  btn-rounded btn-block my-4 waves-effect z-depth-0">Cancelar</Button> 
                                </Card.Body>
                            </Form>
                        </Card>
                    </div>
                </main>
            </article>
        );   
    }
}

export default Alta;