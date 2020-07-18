import React, { Fragment } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Field extends React.PureComponent {
    render() {
        return (
            <Col>
                <div className={"d-flex justify-content-center"}>
                    <label className={"text-center bg-primary rounded-top w-100 text-white"}>
                        <b>{this.props.label}</b>
                        <p className={"m-0 bg-white border text-dark"}>{this.props.children}</p>
                    </label>
                </div>
            </Col>
        );
    }
}
class FichaMedica extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isFetching: true,
            isError: false,
            data: undefined
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
        await fetch(`http://localhost:8080/api/v1/pacientes/${this.props.nacionalidad}/${this.props.documento}`, {
            method: "get",
            headers: {"Content-Type": "application/json"},
        }).then(res => res.json())
        .then(res => {
            this.setState({
                data: res,
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

        if(this.state.data === undefined) {
            return (<div> Error </div>);
        } else {
            paciente = this.state.data;
        }

        return(
            <Fragment>
                {this.state.isFetching?(<div>Cargando ...</div>):(
                    <Fragment>
                        {this.state.isError?(<div>Error ...</div>):(
                            <Fragment>
                                <Row>
                                    <Field label="Nombre"> {paciente.nombre} </Field>
                                    <Field label="Edad"> {paciente.edad} </Field>
                                    <Field label="Sexo"> {paciente.sexo} </Field>
                                </Row>
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
                                <Row>
                                    <Field label="Telefono"> {paciente.telefono} </Field>
                                    <Field label="eMail"> {paciente.email} </Field>
                                </Row>
                                {paciente.contactos.map((contacto, index) =>
                                    <Row key={index}>
                                        <Field label="Contacto"> {contacto.nombre} </Field>
                                        <Field label="Telefono"> {contacto.telefono} </Field><hr/>
                                    </Row>
                                )}
                                <Row>
                                    <Field label="Antecedente clinico"> {paciente.antecedentes} </Field>
                                </Row>
                            </Fragment>
                        )}
                    </Fragment>
                )}
                {this.state.isFetching?(<div>Cargando ...</div>):(
                    <Fragment>
                        {this.state.isError?(<div>Error ...</div>):(
                            <Fragment>
                                {paciente.ficha.map((log, index) =>
                                    <Fragment key={index}>
                                        <Row>
                                            <Field label={log.timestamp}> {log.detalles} </Field>
                                        </Row>
                                        {log.vemec !== undefined &&
                                            <Fragment>
                                                <Row>
                                                    <Field label="Conectado a unidad"> {log.vemec.id + " : " + log.vemec.timestamp} </Field>
                                                </Row>
                                                <Row>
                                                    <Field label="Ubicacion de unidad"> {log.vemec.direccion} </Field>
                                                </Row>
                                            </Fragment>
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
                                    </Fragment>
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