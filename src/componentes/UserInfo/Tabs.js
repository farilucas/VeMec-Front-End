import React from 'react'
import { Tabs,Tab } from 'react-bootstrap';
import Acciones from '../UserInfo/Acciones'
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
                <Tab eventKey="historiaClinica" title="Historia Clinica">
                    <p>ola soy una historia clinica</p>
                </Tab>
                <Tab eventKey="accionMedica" title="Accion Medica">
                    <Acciones/>
                </Tab>
            </Tabs>
          

        );

    }



}
export default Seleccion;