import React from 'react'
import { Tabs,Tab,Container,Row,Col } from 'react-bootstrap';
import AccionMedica from '../UserInfo/Medicamento'
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import Historial from './HistorialPdf/pdf-generator'
class Seleccion extends React.Component{

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
        const fakeFicha = [
            {
                timestamp: "2020-07-16T12:39:02.381",
                medicoTratante: "Saah Sigod",
                nivelDeRiesgo: "Alto",
                detalles: "El paciente salio de su trabajo en la intendencia a bardear, y le metieron cuatro tiros, uno de ellos impacto en el testiculo izquierdo.",
                internacion: "Hospital",
                fechaDefuncion: null,
                fechaAlta: null
            },
            {
                timestamp: "2020-07-18T12:39:02.381",
                medicoTratante: "Notumbo",
                nivelDeRiesgo: "Bajo",
                detalles: "Le rompieron el culo.",
                internacion: "Hospital",
                fechaDefuncion: "2020-07-17T12:39:02.381",
                fechaAlta: null
            }

        ]
        return(

            <Tabs defaultActiveKey="historiaClinica" transition={false} id="noanim-tab-example">
                <Tab eventKey="historiaClinica" title="Historia Clinica" >
                    <p>ola soy una historia clinicae</p>
                   

                    <Container fluid>
                        <Row>
                        <Col>    
                            <PDFViewer width="100%" height="300px">
                                <Historial test={"ola"} ficha = {fakeFicha} />
                            </PDFViewer>        
                        </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="accionMedica" title="Accion Medica">
                   
                    <AccionMedica  paciente = {this.props.paciente}   vemec = {this.props.vemec}   />
                </Tab>
            </Tabs>
          

        );

    }



}
export default Seleccion;