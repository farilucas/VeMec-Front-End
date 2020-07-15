import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";

class Medicamento extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            medico: '',
            descripcion: '',

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
       /* fetch('http://localhost:8080/api/v1/vemecs/' + this.props.vemec, {

            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                this.state
            )
        })
        .then(() => this.props.onRouteChange('Inicio'))
        .catch(error => console.log('error============:', error));
        */
       console.log(JSON.stringify(
        this.state))
    }


   /* componentDidMount() {
        fetch('http://localhost:8080/api/v1/vemecs/' + this.props.vemec)
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
    */
    render() {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Card style={{minWidth: 350}}>
                    <Card.Header className="text-center">
                        <strong>Desentubar</strong>
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
                            <FormGroup controlId="descripcion">
                                <FormLabel>Medicamento</FormLabel>
                                <FormControl
                                    name="descripcion"
                                    as="textarea" rows="3"
                                    placeholder="Ingrese Descripcion"
                                    value={this.state.marca}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup controlId="medico">
                                <FormLabel>Descricpion</FormLabel>
                                <FormControl
                                    name="medico"
                                    type="text"
                                    placeholder="Ingrese Medico Tratante"
                                    value={this.state.modelo}
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

export default Medicamento