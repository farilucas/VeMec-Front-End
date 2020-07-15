import React from 'react'
import { Tabs,Tab } from 'react-bootstrap';
import Medicamento from './Acciones/Medicamento'
class Acciones extends React.Component{

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

            <Tabs defaultActiveKey="suministrarMedicamento" transition={false} id="noanim-tab-example">
                <Tab eventKey="suministrarMedicamento" title="Suministrar Medicamento">
                    <Medicamento/>
                </Tab>
                <Tab eventKey="desentubar" title="Desentubar">
                    <p>voy a desentubar uwu</p>
                </Tab>
                <Tab eventKey="trasladar" title="Trasladar Paciente">
                    <p>Me van a trasladar</p>
                </Tab>
                <Tab eventKey="darElAlta" title="Dar El Alta">
                    <p>Dar de alta</p>
                </Tab>
                <Tab eventKey="modificarRiesgo" title="Modificar Nivel De Riesgo">
                    <p>Dar de alta</p>
                </Tab>
                <Tab eventKey="defuncion" title="Defuncion">
                    <p>Dar de alta</p>
                </Tab>
            </Tabs>
          

        );

    }



}
export default Acciones;