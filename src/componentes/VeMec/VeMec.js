import React from "react";
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Grafica from "../Grafica/Grafica";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {unit} from "mathjs";
import Alert from "react-bootstrap/Alert";
import Select from 'react-select';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Field extends React.PureComponent {
    render() {
        return (
            <div className={"d-flex justify-content-center"}>
                <label className={"text-center bg-primary rounded-top w-100 text-white"}>
                    <b>{this.props.label}</b>
                    <p className={"m-0 bg-white border text-dark"}>{this.props.children}</p>
                </label>
            </div>
        );
    }
}

class VeMec extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={
            open: false,
            pacientes: [],
            selectedPaciente: '',
            isClearable: true,
            isSearchable: true
        }
        this.toggleModalOn = this.toggleModalOn.bind(this);
        this.toggleModalOff = this.toggleModalOff.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onModificar = this.onModificar.bind(this);
        this.onBaja = this.onBaja.bind(this);
        this.onDetalles = this.onDetalles.bind(this);
    }

    toggleModalOn(){
        this.setState({open: true})
    }

    toggleModalOff(){
        this.setState({open: false})
    }

    onModificar() {
        this.props.onRouteChange('Modificar', this.props.data.id);
    }

    onBaja(e) {
        this.props.onBaja(e, this.props.data.id);
    }

    onDetalles() {
        this.props.onRouteChange('Detalles', this.props.data.id);
    }

    onAsignPaciente(event) {
        event.preventDefault();
        fetch(``, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                //id: this.state.selectedPaciente
            })
        }).catch((e) => console.log(e));
    } 

    onSelectChange(selectedOption) {
        this.setState({ selectedPaciente: selectedOption.value })
    }

    render() {
        let currentState = this.props.data.estados[0];
        let estado = <Alert variant="primary" className="h2 mt-3 mb-0 text-center">Este ventilador no tiene estados en el sistema.</Alert>;

        if(currentState !== undefined) {

            let puntosPresionEntrada = [];
            let puntosPresionSalida = [];

            if(this.props.data.graph !== undefined) {
                puntosPresionEntrada = this.props.data.graph.puntosPresionEntrada;
                puntosPresionSalida = this.props.data.graph.puntosPresionSalida
            }

            estado = (
                <>
                    <Row>
                        <Col><Field label={"Timestamp"}>{(new Date(currentState.timestamp)).toLocaleString()}</Field></Col>
                    </Row>
                    <Row>
                        <Col><Field label={`Presion de Entrada (${this.props.pressureUnit})`}>{unit(currentState.presionEntrada, 'Pa').toNumber(this.props.pressureUnit).toFixed(4).replace(/[.,]0000$/, "")}</Field></Col>
                        <Col><Field label={`Presion de Salida (${this.props.pressureUnit})`}>{unit(currentState.presionSalida, 'Pa').toNumber(this.props.pressureUnit).toFixed(4).replace(/[.,]0000$/, "")}</Field></Col>
                    </Row>
                    <Row>
                        <Col><Field label={`Presion Minima (${this.props.pressureUnit})`}>{unit(currentState.presionMinima, 'Pa').toNumber(this.props.pressureUnit).toFixed(4).replace(/[.,]0000$/, "")}</Field></Col>
                        <Col><Field label={`Presion Maxima (${this.props.pressureUnit})`}>{unit(currentState.presionMaxima, 'Pa').toNumber(this.props.pressureUnit).toFixed(4).replace(/[.,]0000$/, "")}</Field></Col>
                    </Row>
                    <Row>
                        <Col><Field label={"Volumen de Gas Aportado (cc)"}>{currentState.volumenGasAportado}</Field></Col>
                        <Col><Field label={"Frecuencia de Aporte (veces/minuto)"}>{currentState.frecuenciaDeAporte}</Field></Col>
                    </Row>
                    <Row>
                        <Col><Field label={"Porcentaje de Oxigeno (%)"}>{currentState.porcentajeOxigeno}</Field></Col>
                        <Col><Field label={"Humedad (%)"}>{currentState.humedad}</Field></Col>
                    </Row>
                    <Row>
                        <Col><Field label={"Temperatura de Entrada (°C)"}>{currentState.temperaturaSalida}</Field></Col>
                        <Col><Field label={"Temperatura de Salida (°C)"}>{currentState.temperaturaEntrada}</Field></Col>
                    </Row>
                    <Grafica presionEntrada={puntosPresionEntrada} presionSalida={puntosPresionSalida} unit={this.props.pressureUnit}/>
                </>
            );
        }

        //let pacientes = this.state.pacientes.map(paciente => {value: paciente, label: `${paciente.nombre} [${paciente.documento}]`});
        let hasBattery = true
        let color
        hasBattery ? color = "#FFDA94" : color = "light" 
        const options = [{value:'john', label: 'John'}, {value:'coffee boy', label: 'Coffee boy'}, {value:'frederic', label:'Frederic'}, {value:'nikoni', label:'NikoNi'}]
        return (
            <Card style={{maxWidth: 600, backgroundColor: color}}>
                <Card.Header>
                    <div className={"d-flex align-items-center"}>
                        {this.props.data.id}
                        <Button className={"ml-auto mr-2"} variant={"success"} onClick={this.toggleModalOn}>Asignar Paciente</Button>
                        <Modal
                            isOpen={this.state.open}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <ModalHeader closebutton>
                                Lista de Pacientes
                            </ModalHeader>
                            <ModalBody>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isClearable={this.state.isClearable}
                                    isSearchable={this.state.isSearchable}
                                    name="paciente"
                                    options={options}
                                    value={{value: this.state.selectedPaciente, label: this.state.selectedPaciente}}
                                    onChange={this.onSelectChange}
                                />
                                <Button size={"sm"} className={"ml-0 mt-1"} onClick={this.onAsignPaciente}>Confirmar</Button>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.toggleModalOff}>Close</Button>
                            </ModalFooter>
                        </Modal>
                        <Button onClick={this.onModificar} className={"ml-auto mr-2"} variant={"primary"} size={"sm"}><FontAwesomeIcon icon={faCog}/></Button>
                        <Button variant={"danger"} size={"sm"} onClick={this.onBaja}><FontAwesomeIcon icon={faTrash}/></Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col><Field label={"Marca"}>{this.props.data.marca}</Field></Col>
                            <Col><Field label={"Modelo"}>{this.props.data.modelo}</Field></Col>
                        </Row>
                        <Row>
                            <Col><Field label={"Ubicacion"}>{this.props.data.ubicacion}</Field></Col>
                        </Row>
                        {estado}
                    </Container>
                </Card.Body>
                <Card.Footer className={"d-flex"}>
                    <Button onClick={this.onDetalles} variant={"info"} size={"sm"} className={"mx-auto"}>Ver Detalles</Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default VeMec;