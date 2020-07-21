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
            isFetching: false,
            isError: false,
            paciente: this.props.paciente,
            data: {
                ficha: this.props.paciente.ficha
            }
        }
    }

    render () {
        
        let paciente;
        let ficha;

        if(this.state.paciente === undefined) {
            return (<div> No Existe Este Paciente </div>);
        } else {
            paciente = this.state.paciente;
            ficha = {ficha: this.props.ficha || [], puntos: this.props.puntos || []}
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
                        {
                            paciente.antecedentes !== null &&
                            <Row>
                                <Field label="Antecedente clinico"> {paciente.antecedentes} </Field>
                            </Row>
                        }
                    </Card.Footer>
                </Card>
                {this.state.isFetching?(<div>Cargando ...</div>):(
                    <Fragment>
                        {this.state.isError?(<div>Error ...</div>):(
                            <Fragment>
                                {ficha.ficha.map((log, index) =>
                                    <Card key={index} className="mt-4">
                                        <Card.Header>
                                            <Row>
                                                <Field label={"Ficha N°" + (index + 1)}> {log.timestamp + " : " + log.detalles} </Field>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Field label="Medico tratante"> {log.medicoTratante} </Field>
                                            </Row>
                                            <Row>
                                                <Field label="Nivel de riesgo"> {log.nivelDeRiesgo} </Field>
                                            </Row>
                                            {log.fechaAlta !== null &&
                                                <Row>
                                                    <Field label="Fecha de Alta"> {log.fechaAlta} </Field>
                                                </Row>
                                            }
                                            {log.fechaDefuncion !== null &&
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
                                    </Card>
                                )}
                                <Card className="mt-2">
                                    <Card.Body>
                                        <Row>
                                            <Col><Grafica canvasRef={this.props.canvasRef1} timeUnit="hour" tooltipFormat="dd-MM-yyyy HH:mm:ss" presionEntrada={ficha?.puntos?.puntosPresionEntrada} presionSalida={ficha?.puntos?.puntosPresionSalida} unit={"Pa"}/></Col>
                                            <Col><Grafica2 canvasRef={this.props.canvasRef2} timeUnit="hour" tooltipFormat="dd-MM-yyyy HH:mm:ss" bpm={ficha?.puntos?.puntosBpm}/></Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

export default FichaMedica;