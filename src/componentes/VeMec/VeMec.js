import React from "react";
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Grafica from "../Grafica/Grafica";
import Grafica2 from "../Grafica/Grafica2";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {unit} from "mathjs";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";

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
        this.onModificar = this.onModificar.bind(this);
        this.onBaja = this.onBaja.bind(this);
        this.onDetalles = this.onDetalles.bind(this);
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

    render() {
        let currentState = this.props.data.estados[0];
        let estado = <Alert variant="primary" className="h2 mt-3 mb-0 text-center">Este ventilador no tiene estados en el sistema.</Alert>;
        let currentUser = this.props.data.paciente;
        let usuario = (<></>);
        if(currentUser !== undefined) {
            usuario = (
                <>
                    <Row>
                        <Col><Field label={"Nombre"}> {currentUser.nombre} </Field></Col>
                        <Col><Field label={"Edad"}> {currentUser.edad} </Field></Col>
                        <Col><Field label={"Sexo"}> {currentUser.sexo} </Field></Col>
                    </Row>
                </>
            );
        }
        if(currentState !== undefined) {

            let puntosPresionEntrada = [];
            let puntosPresionSalida = [];
            let puntosBpm = [];

            if(this.props.data.graph !== undefined) {
                puntosPresionEntrada = this.props.data.graph.puntosPresionEntrada;
                puntosPresionSalida = this.props.data.graph.puntosPresionSalida;
                puntosBpm = this.props.data.graph.puntosBpm;
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
                        <Col><Field label={"Frecuencia de Aporte (v/m)"}>{currentState.frecuenciaDeAporte}</Field></Col>
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
                    <Grafica2 bpm={puntosBpm}/>
                </>
            );
        }

        let hasBattery = true
        let color
        hasBattery ? color = "#FFDA94" : color = "light" 
        return (
            <Card style={{maxWidth: 600, backgroundColor: color}}>
                <Card.Header>
                    <div className={"d-flex align-items-center"}>
                        {this.props.data.id}
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
                        {usuario}
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