import React from 'react'
import { Tabs,Tab,Container,Row,Col } from 'react-bootstrap';
import AccionMedica from './AccionMedica'
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import Historial from './HistorialPdf/pdf-generator'
class Seleccion extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            show : props.see,
            historia:''

        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
   // const [show, setShow] = useState(false);
    componentDidMount(){
        this.getFicha()
    }
    handleClose() {
      //alert("ola")
      this.setState({show:false})};
    handleShow () {this.setState({show:true})};
    
   async getFicha(){
       let res = await fetch('http://localhost:8080'+ `/api/v1/pacientes/${this.props.paciente.nacionalidad}/${this.props.paciente.documento}/ficha`  , {

            method: 'get',
            headers: { 'Content-Type': 'application/json' },
             })
        
        if(res.status !== 200) {
            alert("No se pudieron traer vemecs Libres");
            return;
        }
        
        let historia = await res.json()
        console.log('ficha', historia)
        this.setState({historia:historia})
        
   }
    render(){
        
        return(

            <Tabs defaultActiveKey="historiaClinica" transition={false} id="noanim-tab-example">
                <Tab eventKey="historiaClinica" title="Historia Clinica" >
                    <Container fluid>
                        <Row>
                        <Col>    
                        <PDFViewer width="100%" height="300px">
                                <Historial test={"ola"} ficha = {this.state.historia.ficha} />
                            </PDFViewer> 
                        </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="accionMedica" title="Accion Medica">
                   
                    <AccionMedica  paciente = {this.props.paciente}   vemec = {this.props.vemec}  close={this.props.close} />
                </Tab>
            </Tabs>
          

        );

    }



}
export default Seleccion;