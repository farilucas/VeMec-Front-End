import React from 'react'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";

export default class AltaPaciente extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nombre: '',
            sexo: '',
            edad: '',
            fechaDeIngreso: '',
            localizacion: '',
            ci:'',
            nacionalidad: '',
            telefono: '',
            mail: '',
            lugarDeResidencia: '',
            direccion: '',
            coordenadas: '',
            nombreFamiliar: '',
            telefonoFamiliar: '',
            antecedentes: ''
        }

        this.onNombreChange = this.onNombreChange.bind(this)
        this.onSexoChange = this.onSexoChange.bind(this)
        this.onEdadChange = this.onEdadChange.bind(this)
        this.onIngresoChange = this.onIngresoChange.bind(this)
        this.onLocalizacionChange = this.onLocalizacionChange.bind(this)
        this.onCiChange = this.onCiChange.bind(this)
        this.onNacionalidadChange = this.onNacionalidadChange.bind(this)
        this.onTelefonoChange = this.onTelefonoChange.bind(this)
        this. onMailChange = this.onMailChange.bind(this)
        this.onResidenciaChange = this.onResidenciaChange.bind(this)
        this.onDireccionChange = this.onDireccionChange.bind(this)
        this.onCoordenadasChange = this.onCoordenadasChange.bind(this)
        this.onNombreFamiliarChange = this.onNombreFamiliarChange.bind(this)
        this.onTelefonoFamiliarChange = this.onTelefonoFamiliarChange.bind(this)
        this.onAntecedentesChange = this.onAntecedentesChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onNombreChange = (event) => {
        this.setState({nombre: event.target.value})
    }
    onSexoChange = (event) => {
        this.setState({ sexo: event.target.value })
    }
    onEdadChange = (event) => {
        this.setState({ edad: event.target.value })
    }
    onIngresoChange = (event) => {
        this.setState({ fechaDeIngreso: event.target.value })
    }
    onLocalizacionChange = (event) => {
        this.setState({ localizacion: event.target.value })
    }
    onCiChange = (event) => {
        this.setState({ ci: event.target.value })
    }
    onNacionalidadChange = (event) => {
        this.setState({ nacionalidad: event.target.value })
    }
    onTelefonoChange = (event) => {
        this.setState({ telefono: event.target.value })
    }
    onMailChange = (event) => {
        this.setState({ mail: event.target.value })
    }
    onResidenciaChange = (event) => {
        this.setState({ lugarDeResidencia: event.target.value })
    }
    onDireccionChange = (event) => {
        this.setState({ direccion: event.target.value })
    }
    onCoordenadasChange = (event) => {
        this.setState({ coordenadas: event.target.value })
    }
    onNombreFamiliarChange = (event) => {
        this.setState({ nombreFamiliar: event.target.value })
    }
    onTelefonoFamiliarChange = (event) => {
        this.setState({ telefonoFamiliar: event.target.value })
    }
    onAntecedentesChange = (event) => {
        this.setState({ antecedentes: event.target.value })
    }

    onSubmit = (event) =>{
        event.preventDefault()
        fetch('', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                this.state
            )
        })
        .then(() => console.log(this.state))
        //.then(() => this.props.onRouteChange('Inicio'));
    }

    render(){
        return (
            <article>
                <main>
                    <div className="column" >
                        <Card className="form-group lg-col-1 border border-info" id="alta" style={{backgroundColor: 'lightgray'}}>
                            <Card.Header className="text-center">
                                <strong>Ingresar Paciente</strong>
                            </Card.Header>
                            <Form>
                                <Card.Body className="pb-1">
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onNombreChange}
                                            type="text"
                                            placeholder="Nombre"
                                            name="altaNombre"
                                            value={this.state.nombre}
                                            id="altaNombre" />
                                    </FormGroup>
                                    <FormGroup>
                                        <p className="text-center">Masculino: </p>
                                        <FormControl
                                            onChange={this.onSexoChange}
                                            type="radio"
                                            name="gender"
                                            value={this.state.sexo}
                                            id="sexo" />
                                        <p className="text-center">Femenino: </p>
                                        <FormControl
                                            onChange={this.onSexoChange}
                                            type="radio"
                                            name="gender"
                                            value={this.state.sexo}
                                            id="sexo" />
                                        <p className="text-center">Otro: </p>
                                        <FormControl
                                            onChange={this.onSexoChange}
                                            type="text"
                                            name="gender"
                                            value={this.state.sexo}
                                            id="sexo" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onEdadChange}
                                            type="number"
                                            name="edad"
                                            placeholder="Edad"
                                            value={this.state.edad}
                                            id="edad" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onLocalizacionChange}
                                            type="text"
                                            name="localizacion"
                                            placeholder="Localizacion"
                                            value={this.state.localizacion}
                                            id="localizacion" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onCiChange}
                                            type="text"
                                            name="ci"
                                            placeholder="CI"
                                            value={this.state.ci}
                                            id="ci" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onNacionalidadChange}
                                            type="text"
                                            name="nacionalidad"
                                            placeholder="Nacionalidad"
                                            value={this.state.nacionalidad}
                                            id="nacionalidad" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onTelefonoChange}
                                            type="text"
                                            name="telefono"
                                            placeholder="Telefono"
                                            value={this.state.telefono}
                                            id="telefono" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onMailChange}
                                            type="email"
                                            name="mail"
                                            placeholder="E-mail"
                                            value={this.state.mail}
                                            id="mail" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onResidenciaChange}
                                            type="textarea"
                                            name="residencia"
                                            placeholder="Lugar de Residencia"
                                            value={this.state.lugarDeResidencia}
                                            id="edad" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onDireccionChange}
                                            type="textarea"
                                            name="direccion"
                                            placeholder="Direccion"
                                            value={this.state.direccion}
                                            id="direccion" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onCoordenadasChange}
                                            type="number"
                                            name="coordenadas"
                                            placeholder="Coordenadas"
                                            value={this.state.coordenadas}
                                            id="coordenadas" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onNombreFamiliarChange}
                                            type="text"
                                            name="nombreFamiliar"
                                            placeholder="Nombre de Familiar de contacto"
                                            value={this.state.nombreFamiliar}
                                            id="nombreFamiliar" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onTelefonoFamiliarChange}
                                            type="text"
                                            name="telefonoFamiliar"
                                            placeholder="Telefono de Familiar de contacto"
                                            value={this.state.telefonoFamiliar}
                                            id="telefonoFamiliar" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onAntecedentesChange}
                                            type="textarea"
                                            name="antecedentes"
                                            placeholder="Antecedentes clinicos"
                                            value={this.state.antecedentes}
                                            id="antecedentes" />
                                    </FormGroup>
                                    {/* Hablar con Jorge */}
                                    {/* <FormGroup>
                                        <FormControl
                                            onChange={this.onIngresoChange}
                                            type="text"
                                            name="ubicacion"
                                            placeholder="Ubicacion"
                                            value={this.state.ubicacion}
                                            id="ubicacion" />
                                    </FormGroup> */}
                                    <Button
                                        onClick={this.onSubmit}
                                        variant="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">Agregar</Button>
                                    <Button
                                        onClick={() => this.props.onRouteChange('Inicio')}
                                        variant="btn btn-outline-danger  btn-rounded btn-block my-4 waves-effect z-depth-0">Cancelar</Button>
                                </Card.Body>
                            </Form>
                        </Card>
                    </div>
                </main>
            </article>
        );   
    }
}