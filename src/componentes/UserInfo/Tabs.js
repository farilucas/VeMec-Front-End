import React from 'react'
import { Tabs,Tab,Container,Row,Col } from 'react-bootstrap';
import AccionMedica from './AccionMedica'
import { PDFViewer } from '@react-pdf/renderer';
import Historial from './HistorialPdf/pdf-generator'
class Seleccion extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            show : props.see,
            historia:''

        };

        this.muertos = []

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
        // console.log('ficha', historia)
        this.setState({historia:historia})
        
   }
    render(){
        let accionMedica = null;
        if (this.props.paciente.ficha === null || (this.props.paciente.ficha.length > 0 && this.props.paciente.ficha[0].fechaDefuncion === null)) {
            accionMedica = (
                <Tab eventKey="accionMedica" title="Accion Medica">

                    <AccionMedica paciente={this.props.paciente} vemec={this.props.vemec} close={this.props.close} />
                </Tab>
            )
        }
        

        return(

            <Tabs defaultActiveKey="historiaClinica" transition={false} id="noanim-tab-example">
                <Tab eventKey="historiaClinica" title="Historia Clinica" >
                    <Container fluid >
                        <Row>
                            <Col style={{ height: "70vh" }}>    
                                <PDFViewer width="100%" height="100%">
                                    <Historial test={"ola"} ficha = {this.state.historia.ficha} />
                                </PDFViewer> 
                            </Col>
                        </Row>
                    </Container>
                </Tab>
                {accionMedica}
            </Tabs>
          

        );

    }



}
export default Seleccion;