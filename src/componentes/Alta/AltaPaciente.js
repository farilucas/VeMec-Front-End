import React from 'react'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import Collapse from "react-bootstrap/Collapse"
import Button from "react-bootstrap/Button";
import Select from 'react-select';
export default class AltaPaciente extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nombre: '',
            sexo: '',
            edad: '',
            fechaIngreso: '',
            localidad: '',
            documento:'',
            nacionalidad: '',
            telefono: '',
            email: '',
            departamento: '',
            direccion: '',
            contactos: [
                {
                    nombre: '',
                    telefono: ''
                },
                {
                    nombre: '',
                    telefono: ''
                }
            ],
            antecedentes: '',
        }

        this.onNombreChange = this.onNombreChange.bind(this)
        this.onSexoChange = this.onSexoChange.bind(this)
        this.onEdadChange = this.onEdadChange.bind(this)
        this.onIngresoChange = this.onIngresoChange.bind(this)
        this.onLocalidadChange = this.onLocalidadChange.bind(this)
        this.onCiChange = this.onCiChange.bind(this)
        this.onNacionalidadChange = this.onNacionalidadChange.bind(this)
        this.onTelefonoChange = this.onTelefonoChange.bind(this)
        this.onMailChange = this.onMailChange.bind(this)
        this.onDepartamentoChange = this.onDepartamentoChange.bind(this)
        this.onDireccionChange = this.onDireccionChange.bind(this)
        this.onContactosChange = this.onContactosChange.bind(this)
        this.onAntecedentesChange = this.onAntecedentesChange.bind(this)
        this.toggleCollapseOnOff = this.toggleCollapseOnOff.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onNombreChange = (event) => {
        this.setState({nombre: event.target.value})
    }
    onSexoChange = (event) => {
        this.setState({ sexo: event.currentTarget.value })
    }
    onEdadChange = (event) => {
        this.setState({ edad: event.target.value })
    }
    onIngresoChange = (event) => {
        this.setState({ fechaIngreso: event.target.value })
    }
    onLocalidadChange = (event) => {
        this.setState({ localidad: event.target.value })
    }
    onCiChange = (event) => {
        this.setState({ documento: event.target.value })
    }
    onNacionalidadChange = (event) => {
        this.setState({ nacionalidad: event.target.value })
    }
    onTelefonoChange = (event) => {
        this.setState({ telefono: event.target.value })
    }
    onMailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onDepartamentoChange = departamento => {
        this.setState({ departamento: departamento })
    }
    onDireccionChange = (event) => {
        this.setState({ direccion: event.target.value })
    }
    onContactosChange = (event, index) => {
        event.persist()
        this.setState(
            (prevState) => {
                let contactos = prevState.contactos
                contactos[index][event.target.name] = event.target.value
                //return {contactos: contactos.splice(-1,1)}
                return { contactos: contactos }
            }
        )
    }
    onAntecedentesChange = (event) => {
        this.setState({ antecedentes: event.target.value })
    }
    toggleCollapseOnOff(){
        this.setState({ open: !this.state.open})
    }

    async onSubmit(){
        let contactos = this.contactosVacios()
        if (this.state.nombre === '' || this.state.nacionalidad === '' || this.state.sexo === '' || this.state.edad === '' || this.state.fechaIngreso === '' || this.state.localidad === '' || this.state.documento === '' || this.state.telefono === '' || this.state.departamento === '' || this.state.direccion === '' || this.state.antecedentes === ''){
            alert('Hay campos sin rellenar')
        }
        else{
            let response = await fetch('http://localhost:8080/api/v1/pacientes', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                    nombre: this.state.nombre,
                    sexo: this.state.sexo,
                    edad: this.state.edad,
                    fechaIngreso: (new Date(this.state.fechaIngreso).toISOString()),
                    localidad: this.state.localidad,
                    documento: this.state.documento,
                    nacionalidad: this.state.nacionalidad,
                    telefono: this.state.telefono,
                    email: this.state.email,
                    departamento: this.state.departamento.value,
                    direccion: this.state.direccion,
                    contactos: contactos.length > 0 ? contactos : null,
                    antecedentes: this.state.antecedentes
                })
            })

            if(response.status === 409){
                alert("Paciente ya existente")
            }

        }

        this.props.onRouteChange('Inicio')
    }

    contactosVacios(){
        return this.state.contactos.filter(contacto =>  (contacto.nombre !== '' && contacto.telefono !== ''))
    }

    render(){
        const options = [
            { value: 'artigas', label: 'Artigas' },
            { value: 'canelones', label: 'Canelones' },
            { value: 'cerro largo', label: 'Cerro Largo' },
            { value: 'colonia', label: 'Colonia' },
            { value: 'durazno', label: 'Durazno' },
            { value: 'flores', label: 'Flores' },
            { value: 'florida', label: 'Florida' },
            { value: 'lavalleja', label: 'Lavalleja' },
            { value: 'maldonado', label: 'Maldonado' },
            { value: 'montevideo', label: 'Montevideo' },
            { value: 'paysandu', label: 'Paysandu' },
            { value: 'rio negro', label: 'Rio Negro' },
            { value: 'rivera', label: 'Rivera' },
            { value: 'rocha', label: 'Rocha' },
            { value: 'salto', label: 'Salto' },
            { value: 'san jose', label: 'San Jose' },
            { value: 'soriano', label: 'Soriano' },
            { value: 'tacuarembo', label: 'Tacuarembo' },
            { value: 'treinta y tres', label: 'Treinta y Tres' },
        ];
        return (
            <article>
                <main>
                    <div className="column" style={{ width: '40%', margin: '0 auto'}}>
                        <Card className="form-group lg-col-1 border border-info " id="alta" style={{backgroundColor: 'lightgray'}}>
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
                                            checked={this.state.nombre}
                                            id="altaNombre" />
                                    </FormGroup>
                                    <FormGroup as={Form.Row} className='d-flex justify-content-around'>
                                        <Form.Label className="text-center">Masculino: 
                                        <FormControl
                                            type="radio"
                                            name="gender"
                                            value="Masculino"
                                            checked={this.state.sexo === 'Masculino'}
                                            onChange={this.onSexoChange}
                                            id="sexo" /> </Form.Label>
                                        <Form.Label className="text-center">Femenino: 
                                        <FormControl
                                            type="radio"
                                            name="gender"
                                            value="Femenino"
                                            checked={this.state.sexo === 'Femenino'}
                                            onChange={this.onSexoChange}
                                            id="sexo" /></Form.Label>
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
                                            onChange={this.onCiChange}
                                            type="text"
                                            name="ci"
                                            placeholder="CI"
                                            value={this.state.documento}
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
                                        <Select
                                            onChange={this.onDepartamentoChange}
                                            type="text"
                                            name="Departamento"
                                            placeholder="Departamento"
                                            value={this.state.departamento}
                                            id="departamento" 
                                            options={options}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={this.onLocalidadChange}
                                            type="text"
                                            name="localidad"
                                            placeholder="Localidad"
                                            value={this.state.localidad}
                                            id="localidad" />
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
                                            value={this.state.email}
                                            id="mail" />
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
                                    <FormGroup>
                                        <p>Fecha de Ingreso del Paciente: </p>
                                        <FormControl
                                            onChange={this.onIngresoChange}
                                            type="date"
                                            name="fechaIngreso"
                                            placeholder="Fecha de Ingreso del Paciente"
                                            value={this.state.fechaIngreso}
                                            id="fechaIngreso" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={(e) => this.onContactosChange(e, 0)}
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre de Familiar de contacto"
                                            value={this.state.contactos[0].nombre}
                                            id="nombre" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            onChange={(e) => this.onContactosChange(e,0)}
                                            type="text"
                                            name="telefono"
                                            placeholder="Telefono de Familiar de contacto"
                                            value={this.state.contactos[0].telefono}
                                            id="telefono" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button
                                            onClick={this.toggleCollapseOnOff}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={this.state.open}
                                        >Agregar Familiar</Button>
                                        <Collapse in={this.state.open}>
                                            <div id="example-collapse-text">
                                                <FormGroup>
                                                    <FormControl
                                                        onChange={(e) => this.onContactosChange(e, 1)}
                                                        type="text"
                                                        name="nombre"
                                                        placeholder="Nombre de Familiar de contacto"
                                                        value={this.state.contactos[1].nombre}
                                                        id="nombre" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControl
                                                        onChange={(e) => this.onContactosChange(e, 1)}
                                                        type="text"
                                                        name="telefono"
                                                        placeholder="Telefono de Familiar de contacto"
                                                        value={this.state.contactos[1].telefono}
                                                        id="telefono" />
                                                </FormGroup>
                                            </div>
                                        </Collapse>
                                    </FormGroup>
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