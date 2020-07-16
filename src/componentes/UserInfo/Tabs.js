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
        return(

            <Tabs defaultActiveKey="historiaClinica" transition={false} id="noanim-tab-example">
                <Tab eventKey="historiaClinica" title="Historia Clinica" >
                    <p>ola soy una historia clinicae</p>
                   

                    <Container fluid>
                        <Row>
                        <Col>    
                            <PDFViewer width="100%" height="300px">
                                <Historial />
                            </PDFViewer>        
                        </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="accionMedica" title="Accion Medica">
                    {alert(this.props.vemec.id)}
                    <AccionMedica  paciente = {this.props.paciente}   vemec = {this.props.vemec}   />
                </Tab>
            </Tabs>
          

        );

    }



}
export default Seleccion;