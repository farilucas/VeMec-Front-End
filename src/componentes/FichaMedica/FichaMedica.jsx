import React, { Fragment } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Grafica from "../Grafica/Grafica";
import Grafica2 from "../Grafica/Grafica2";

class Field extends React.PureComponent {
    render() {
        return (
            <Col>
                <div className={"d-flex justify-content-center"}>
                    <label className={"text-center bg-info rounded-top w-100 text-white"}>
                        <b>{this.props.label}</b>
                        <p className={"m-0 bg-white border text-dark"}>{this.props.children}</p>
                    </label>
                </div>
            </Col>
        );
    }
}
//<FichaMedica pressureUnit={this.props.pressureUnit} paciene={currentUser}/>
class FichaMedica extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isFetching: true,
            isError: false,
            data: {
                paciente: this.props.paciente
            }
        }
    }
    
    componentDidMount(){
        this.fetchData();
    }

    async fetchData(){
        this.setState({
            isFetching: true,
            isError: false
        })
        await fetch(`http://localhost:8080/api/v1/pacientes/${this.props.paciente.nacionalidad}/${this.props.paciente.documento}/ficha`, {
            method: "get",
            headers: {"Content-Type": "application/json"},
        }).then(res => res.json())
        .then(res => {
            this.setState({
                data: {
                    ficha: res
                },
                isFetching: false
            })
        })
        .catch(error => {
            this.setState({
                isError: true
            })
        });
    }

    render () {
        
        let paciente;
        let ficha;

        if(this.state.data.paciente === undefined) {
            return (<div> No Existe Este Paciente </div>);
        } else {
            paciente = this.state.data.paciente;
            ficha = this.state.data.ficha;
        }

        return(
            <Fragment>
                <Card>
                    <Card.Header>
                        <Row>
                            <Field label="Nombre"> {paciente.nombre} </Field>
                            <Field label="Edad"> {paciente.edad} </Field>
                            <Field label="Sexo"> {paciente.sexo} </Field>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Field label="Cedula"> {paciente.documento} </Field>
                            <Field label="Nacionalidad"> {paciente.nacionalidad} </Field>
                        </Row>
                        <Row>
                            <Field label="Fecha de ingreso"> {paciente.fechaIngreso} </Field>
                        </Row>
                        <Row>
                            <Field label="Departamento"> {paciente.departamento} </Field>
                            <Field label="Localidad"> {paciente.localidad} </Field>
                            <Field label="Direccion"> {paciente.direccion} </Field>
                        </Row>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Field label="eMail"> {paciente.email} </Field>
                                    <Field label="Telefono"> {paciente.telefono} </Field>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                {paciente.contactos.map((contacto, index) =>
                                    <Row key={index}>
                                        <Field label="Contacto"> {contacto.nombre} </Field>
                                        <Field label="Telefono"> {contacto.telefono} </Field><hr/>
                                    </Row>
                                )}
                            </Card.Body>
                        </Card>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Field label="Antecedente clinico"> {paciente.antecedentes} </Field>
                        </Row>
                    </Card.Footer>
                </Card>
                {this.state.isFetching?(<div>Cargando ...</div>):(
                    <Fragment>
                        {this.state.isError?(<div>Error ...</div>):(
                            <Fragment>
                                {ficha.ficha.map((log, index) =>
                                    <Card key={index} className="mt-2">
                                        <Card.Header>
                                            <Row>
                                                <Field label={log.timestamp}> {log.detalles} </Field>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            {log.veMecId !== undefined &&
                                                <Row>
                                                    <Field label="Conectado a unidad"> {log.veMecId} </Field>
                                                </Row>
                                            }
                                            {log.medicacion !== undefined &&
                                                <Row>
                                                    <Field label="Medicamentos"> {log.medicacion} </Field>
                                                </Row>
                                            }
                                            <Row>
                                                <Field label="Medico tratante"> {log.medicoTratante} </Field>
                                            </Row>
                                            <Row>
                                                <Field label="Nivel de riesgo"> {log.nivelDeRiesgo} </Field>
                                            </Row>
                                            {log.fechaAlta !== undefined &&
                                                <Row>
                                                    <Field label="Fecha de Alta"> {log.fechaAlta} </Field>
                                                </Row>
                                            }
                                            {log.fechaDefuncion !== undefined &&
                                                <Row>
                                                    <Field label="Fecha de Defuncion"> {log.fechaDefuncion} </Field>
                                                </Row>    
                                            }
                                            {log.internacion !== undefined &&
                                                <Row>
                                                    <Field label="Tipo de internacion"> {log.internacion} </Field>
                                                </Row>
                                            }
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row>
                                                <Col><Grafica presionEntrada={ficha.puntos.puntosPresionEntrada} presionSalida={ficha.puntos.puntosPresionSalida} unit={this.props.pressureUnit}/></Col>
                                                <Col><Grafica2 bpm={ficha.puntos.puntosBpm}/></Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                )}
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

export default FichaMedica;