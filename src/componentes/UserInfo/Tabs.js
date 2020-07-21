import React from 'react'
import { Tabs,Tab,Container,Row,Col, Button } from 'react-bootstrap';
import AccionMedica from './AccionMedica'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import Historial from './HistorialPdf/pdf-generator'
import FichaMedica from '../FichaMedica/FichaMedica';
class Seleccion extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            show : props.see,
            historia:'',
            dataPresion: '',
            dataBpm: ''
        };

        this.canvasRef1 = React.createRef();
        this.canvasRef2 = React.createRef();

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.setDataPresion = this.setDataPresion.bind(this);
        this.setDataBpm = this.setDataBpm.bind(this);

        this.generarImagenes = this.generarImagenes.bind(this);
    }

    generarImagenes() {
        this.setDataPresion(this.canvasRef1.current.toDataURL('image/png', 1.0));
        this.setDataBpm(this.canvasRef2.current.toDataURL('image/png', 1.0));
    }

    setDataPresion(data) {
        this.setState({ dataPresion: data });
    }

    setDataBpm(data) {
        this.setState({ dataBpm: data });
    }

   
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

                    <AccionMedica onRouteChange={this.props.onRouteChange} paciente={this.props.paciente} vemec={this.props.vemec} close={this.props.close} />
                </Tab>
            )
        }
        
        return(

            <Tabs defaultActiveKey="fichamedica" transition={false} id="noanim-tab-example">
                <Tab title="Ficha Medica" eventKey="fichamedica">
                    <FichaMedica canvasRef1={this.canvasRef1} canvasRef2={this.canvasRef2} paciente={this.props.paciente} ficha={this.state.historia.ficha} puntos={this.state.historia.puntos}/>
                    
                    <div className="d-flex justify-content-center mt-3 flex-column align-items-center">
                        <Button className={"align-self-center mb-2"} onClick={this.generarImagenes}>Generar PDF</Button>
                        {this.state.dataPresion && this.state.dataBpm && this.state.dataPresion !== "data:," && this.state.dataBpm !== "data:," &&
                            <PDFDownloadLink document={< Historial dataPresion={this.state.dataPresion} dataBpm={this.state.dataBpm} ficha={this.state.historia.ficha} paciente={this.props.paciente} />}
                                fileName={`reporte.pdf`}>
                                Descargar PDF
                            </PDFDownloadLink>}
                    </div>
                    
                    
                </Tab>
                {accionMedica}
            </Tabs>
          

        );

    }



}
export default Seleccion;