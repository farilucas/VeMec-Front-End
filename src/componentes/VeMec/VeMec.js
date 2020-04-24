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

    onModificar(e) {
        this.props.onRouteChange('Modificar', this.props.data.id);
    }

    onBaja(e) {
        this.props.onBaja(e, this.props.data.id);
    }

    onDetalles(e) {
        this.props.onRouteChange('Detalles', this.props.data.id);
    }

    render() {
        let currentState = this.props.data.estados[0];
        let estado = <h2>Este ventilador no tiene estados en el sistema.</h2>;

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
                        <Col><Field label={"Presion de Entrada"}>{currentState.presionEntrada}</Field></Col>
                        <Col><Field label={"Presion de Salida"}>{currentState.presionSalida}</Field></Col>
                    </Row>
                    <Row>
                        <Col><Field label={"Presion Minima"}>{currentState.presionMinima}</Field></Col>
                        <Col><Field label={"Presion Maxima"}>{currentState.presionMaxima}</Field></Col>
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
                    <Grafica presionEntrada={puntosPresionEntrada} presionSalida={puntosPresionSalida}/>
                </>
            );
        }

        return (
            <Card bg={"light"} style={{maxWidth: 600}}>
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