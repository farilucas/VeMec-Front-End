import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import NavItem from "react-bootstrap/NavItem";
import './Navigation.css';
import logo from '../../logo.png';

const Navigation = ({ onRouteChange, pagina }) => {
    //let inicio = pagina === 'inicio' ? "" : <p onClick={() => onRouteChange('Inicio')} className="btn btn-primary">Ir al inicio</p>;
    let inicio = <NavLink href="#" className="mr-2" eventKey="inicio" onClick={() => onRouteChange('Inicio')}>Inicio</NavLink>;

    //let alta = pagina === 'alta' ? "" : <p onClick={() => onRouteChange('Alta')} className="btn btn-primary">Dar de alta un VeMec</p>;
    let alta = <NavLink href="#" eventKey="alta" onClick={() => onRouteChange('Alta')}>Alta VeMec</NavLink>;
    let altaPaciente = <NavLink href="#" eventKey="alta" onClick={() => onRouteChange('AltaPaciente')}>Alta Paciente</NavLink>;


    return (
        <Navbar bg="light" className={"navbar-custom"}>
            <Navbar.Brand href="#"><img src={logo} alt="logo" height={50}/></Navbar.Brand>
            <Navbar.Collapse>
                <Nav variant="pills" activeKey={pagina}>
                    <NavItem>{inicio}</NavItem>
                    <NavItem>{alta}</NavItem>
                    <NavItem>{altaPaciente}</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;