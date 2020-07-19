import React from 'react'
import Seleccion from '../UserInfo/Tabs'
import { Modal, Button} from 'react-bootstrap';

class UserInfo extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            show : props.see

        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
   // const [show, setShow] = useState(false);

    handleClose() {
      //alert("ola")
      this.setState({show:false})};
    handleShow () {this.setState({show:true})};
    
    render(){
      const pacienteDemo = 
      {
        nombre: "Martin Canal",
        sexo: "Masculino",
        edad: 69,
        fechaIngreso: "2020-07-16T12:38:56.173",
        antecedentes: "Robo a mano armada",
        documento: "47681491",
        nacionalidad: "Uruguaya",
        telefono: "099 999 999",
        email: "marty@mcfly.com",
        departamento: "Maldonado",
        localidad: "San Carlos",
        direccion: "En algun contenedor por Maldonado Nuevo",
        contactos: [
            {
                nombre: "Elcon Tacto",
                telefono: "123"
            },
            {
                nombre: "Elotro Pybe",
                telefono: "123"
            }
        ],
        ficha: [
            {
                timestamp: "2020-07-16T12:39:02.381",
                medicoTratante: "Saah Sigod",
                nivelDeRiesgo: "Alto",
                detalles: "El paciente salio de su trabajo en la intendencia a bardear, y le metieron cuatro tiros, uno de ellos impacto en el testiculo izquierdo.",
                internacion: "Hospital",
                fechaDefuncion: null,
                fechaAlta: null
            }
        ]
    }
    const vemec={
      id:"VEMEC3",
    }
    console.log(this.props.paciente)
    let button; 
    if(this.props.button){
      button= <Button variant="primary" onClick={this.handleShow}>
                Accion Medica
              </Button>
    }
        return(

            <div >
              {button}
            
      
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
              //style={{maWidth: "90% !important"}}
              size="xl"
              
            >
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Seleccion paciente = {this.props.paciente} vemec = {vemec} close={this.handleClose}/>
              
              </Modal.Body>
              <Modal.Footer>
                
                <Button variant="primary" onClick={this.handleClose}>Cerrar</Button>
              </Modal.Footer>
            </Modal>
          </div>
          

        );

    }



}
export default UserInfo;