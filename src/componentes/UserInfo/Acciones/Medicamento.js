import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

class Medicamento extends Component {

    constructor(props) {
        super(props)

        this.state = {
            paciente: this.props.paciente?.id,
            riesgo: '',
            detalles:'',
            vemec: '',
            internacion: '',
            defuncion:'',
            alta:'',

        };
        this.vemecs = this.vemecs.bind(this);
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
       console.log(this.props)
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
   vemecs() {
       const vemecs = [{
                id:"VEMEC1"
            },
            {
                id:"VEMEC2"
            },
            {
                id:"VEMEC3"
            }
        ]
        return vemecs
   }

    render(
        
    ) {
        let vemecs = this.vemecs().map(vemec => {
            return (
            <option>{vemec.id}</option> 
            )
        })
        return (
            <div className="d-flex justify-content-center mt-5">
                <Card style={{minWidth: 350}}>
                    <Card.Header className="text-center">
                        <strong>Suministrar</strong>
                    </Card.Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Card.Body className="pb-1">
                            <FormGroup controlId="nombre">
                                <FormLabel>Nombre</FormLabel>
                                <FormControl
                                    type="text"
                                    readOnly={true}
                                    value={this.props.paciente?.id}/>
                            </FormGroup>
                            <FormGroup controlId="detalles">
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl
                                    name="detalles"
                                    as="textarea" rows="3"
                                    placeholder="Ingrese Descripcion"
                                    value={this.state.modelo}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup controlId="medico">
                                <FormLabel>Medico</FormLabel>
                                <FormControl
                                    name="medico"
                                    type="text"
                                    placeholder="Ingrese Medico Tratante"
                                    value={this.state.medico}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup controlId="riesgo">
                                <FormLabel>Nivel de Riesgo</FormLabel>
                                <FormControl 
                                    as="select"
                                    name="riesgo"
                                    onChange={this.handleInputChange}
                                    value="Grave"
                                >
                                    <option>Bajo</option>
                                    <option>Medio</option>
                                    <option>Alto</option>
                                    <option>Grave</option>
                                    <option>Muy Grave</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="internacion">
                                <FormLabel>Tipo de Internacion</FormLabel>
                                <FormControl 
                                    as="select"
                                    name="internacion"
                                    onChange={this.handleInputChange}
                                    value="Hospital"
                                >
                                    
                                    <option>Domicilio</option>
                                    <option>Hospital</option>
                                    <option>Campamento de Emergencia</option>

                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="vemec">
                                <FormLabel>Nivel de Riesgo</FormLabel>
                                <FormControl 
                                    as="select"
                                    name="vemec"
                                    onChange={this.handleInputChange}
                                    value="VEMEC2"
                                >
                                    {vemecs}
                                </FormControl>
                            </FormGroup>
                            <Form.Group controlId="defuncion">
                                <Form.Label>Defuncion</Form.Label>
                                
                                <DatePicker
                                    selected={this.state.defuncion}
                                        onChange={(e) => {
                                            this.setState({
                                                defuncion: e
                                            });
                                            //setFieldValue('date', e);
                                            //setFieldTouched('date');
                                        }}
                                        
                                    
                                />
                                
                            </Form.Group>
                            <Form.Group controlId="defuncion">
                                <Form.Label>Alta</Form.Label>
                                
                                <DatePicker
                                    disabled
                                    selected={this.state.alta}
                                        onChange={(e) => {
                                            this.setState({
                                                alta: e
                                            });
                                            //setFieldValue('date', e);
                                            //setFieldTouched('date');
                                        }}
                                        
                                    
                                />
                                
                            </Form.Group>
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