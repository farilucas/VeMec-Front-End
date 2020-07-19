import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";


class HistoriaClinica extends Component {

    constructor(props) {
        super(props)

        this.state = {
            

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
        
        if(name.localeCompare("defuncion") === 0 ){
            if(value.localeCompare("") !== 0){
                this.setState({
                    disableAlta: true
                });
                this.setState({
                    alta:""
                })
            }
            else{
                this.setState({
                    disableAlta: false
                });
            }
        }
        if(name.localeCompare("alta") === 0 ){
            if(value.localeCompare("") !== 0){
                this.setState({
                    disableDefuncion:true,
                });
                this.setState({
                    defuncion:""
                })
            }
            else{
                this.setState({
                    disableDefuncion: false
                });
            }
        }
    }


    async handleSubmit(event) {
        event.preventDefault();
       /*let res = fetch('localhost:8080'+`/api/v1/pacientes/{this.props.paciente.nacionalidad}/{this.props.paciente.documento}/ficha`  , {

            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
            
            paciente: this.props.paciente?.id,
            medicoTratante: this.state.medico,
            nivelDeRiesgo: this.state.riesgo,
            detalles:this.state.detalles,
            internacion: this.state.internacion,
            fechaDefuncion: (new Date(this.state.defuncion).toISOString()),
            fechaAlta: (new Date(this.state.alta).toISOString()),
                //fechaDeIngreso: (new Date(this.state.defuncion).toISOString())
            )
        })
        
        if(res.status !== 200) {
            alert("No se pudo ingresar accion");
            return;
        }
        */

       console.log(this.props)
       console.log(JSON.stringify(
        this.state))
        this.props.close()
    }


    async componentDidMount() {
        if(this.props.paciente?.ficha != null){
            this.setState({
            paciente: this.props.paciente?.id,
            nombre:this.props.paciente?.nombre,
            medico:this.props.paciente?.ficha[0]?.medicoTratante,
            riesgo: this.props.paciente?.ficha[0]?.nivelDeRiesgo,
            detalles:this.props.paciente?.ficha[0]?.detalles,
            vemec: this.props.vemec?.id,
            internacion: this.props.paciente?.ficha[0]?.internacion,
            defuncion:this.props.paciente?.ficha[0]?.fechaDefuncion,
            alta:this.props.paciente?.ficha[0]?.fechaAlta,
            disableAlta:'',
            disableDefuncion:'',
            vemecsL:'',
            fetchVemecs:true
            })
        }
        else{
            this.setState(
                {
                    disableAlta:'',
                    disableDefuncion:'',
                    vemecsL:'',
                    fetchVemecs:true
                }
            )
        }
        let res = await fetch('http://localhost:8080/api/v1/vemecs/libres' , {

            method: 'get',
            headers: { 'Content-Type': 'application/json' },
             })
        
        if(res.status !== 200) {
            alert("No se pudieron traer vemecs Libres");
            return;
        }
        let vemecsLibres =  await res.json()
        console.log(res.json)
        
        this.setState({vemecsL: vemecsLibres});
        this.setState({fetchVemecs: false})
        //this.vemecs()
    }
    
   async vemecs() {
      
        let res = await fetch('http://localhost:8080/api/v1/vemecs/libres' , {

            method: 'get',
            headers: { 'Content-Type': 'application/json' },
             })
        
        if(res.status !== 200) {
            alert("No se pudieron traer vemecs Libres");
            return;
        }
        let vemecsLibres = res.json()
        
        console.log('vemcs dentro del asynch',vemecsLibres)
       let vemecs = [{
                id:"VEMEC1"
            },
            {
                id:"VEMEC2"
            },
            {
                id:"VEMEC3"
            }
        ]
        //console.log(vemecsL)
        
        return 
   }

    render(
        
    ) {
        console.log(this.state.vemecsL)
        let vemecs;
        if(!this.state.fetchVemecs){
        vemecs = this.state.vemecsL?.map(vemec => {
            return (
            <option>{vemec.id}</option> 
            )
        })
        }
        let alta;
        let defuncion;
        if(this.state.disableAlta){
            //alert("oli")
            alta=
                <FormGroup>
                    <Form.Label>Dia de alta</Form.Label>
                    <FormControl
                        disabled
                        onChange={this.handleInputChange}
                        type="date"
                        name="alta"
                        value={this.state.alta}
                        id="alta" />
                </FormGroup>
        }
        else{
            //alert("oli2")
            alta=
                <FormGroup>
                    <Form.Label>Dia de alta</Form.Label>
                    <FormControl
                        
                        onChange={this.handleInputChange}
                        type="date"
                        name="alta"
                        value={this.state.alta}
                        id="alta" />
                </FormGroup>
        }

        if(this.state.disableDefuncion){
            defuncion= 
            <FormGroup>
            <Form.Label>Dia de defunsion</Form.Label>
            <FormControl
                disabled
                onChange={this.handleInputChange}
                type="date"
                name="defuncion"
                value={this.state.defuncion}
                id="defuncion" 
                
                />
                
            </FormGroup>
        }
        else{
            defuncion = 
                    <FormGroup>
                    <Form.Label>Dia de defunsion</Form.Label>
                    <FormControl
                    
                        onChange={this.handleInputChange}
                        type="date"
                        name="defuncion"
                        value={this.state.defuncion}
                        id="defuncion" 
                    
                        />
                    
                    </FormGroup>
        }

      
        
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
                                    value={this.props.paciente?.nombre}/>
                            </FormGroup>
                            <FormGroup controlId="detalles">
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl
                                    name="detalles"
                                    as="textarea" rows="3"
                                    placeholder="Ingrese Descripcion"
                                    value={this.state.detalles}
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
                                    value={this.state.riesgo}
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
                                    value={this.state.internacion}
                                >
                                    
                                    <option>Domicilio</option>
                                    <option>Hospital</option>
                                    <option>Campamento de Emergencia</option>

                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="vemec">
                                <FormLabel>Vemec Asociado</FormLabel>
                                <FormControl 
                                    as="select"
                                    name="vemec"
                                    onChange={this.handleInputChange}
                                    value={this.state.vemec}
                                >
                                    {vemecs}
                                </FormControl>
                            </FormGroup>
                            {alta}
                            {defuncion}
                            
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

export default HistoriaClinica