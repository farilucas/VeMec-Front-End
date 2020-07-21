import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";
import API_URL from "../../Api";

class Modificar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            marca: '',
            modelo: '',
            ubicacion: '',

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        fetch(`${API_URL}/vemecs/${this.props.vemec}`, {

            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                this.state
            )
        })
        .then(() => this.props.onRouteChange('Inicio'))
        .catch(error => console.log('error============:', error));
    }


    componentDidMount() {
        fetch(`${API_URL}/vemecs/${this.props.vemec}`)
        .then(response => response.json())
        .then(data =>
            this.setState({
                id: data.id,
                marca: data.marca,
                modelo: data.modelo,
                ubicacion: data.ubicacion,
            })
        );
    }

    render() {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Card style={{minWidth: 350}}>
                    <Card.Header className="text-center">
                        <strong>Modificar</strong>
                    </Card.Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Card.Body className="pb-1">
                            <FormGroup controlId="id">
                                <FormLabel>Id</FormLabel>
                                <FormControl
                                    type="text"
                                    readOnly={true}
                                    value={this.state.id}/>
                            </FormGroup>
                            <FormGroup controlId="marca">
                                <FormLabel>Marca</FormLabel>
                                <FormControl
                                    name="marca"
                                    type="text"
                                    placeholder="Ingrese Marca"
                                    value={this.state.marca}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup controlId="modelo">
                                <FormLabel>Modelo</FormLabel>
                                <FormControl
                                    name="modelo"
                                    type="text"
                                    placeholder="Ingrese Marca"
                                    value={this.state.modelo}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup controlId="ubicacion">
                                <FormLabel>Ubicacion</FormLabel>
                                <FormControl
                                    name="ubicacion"
                                    type="text"
                                    placeholder="Ingrese Marca"
                                    value={this.state.ubicacion}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" type="submit">Enviar</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Modificar