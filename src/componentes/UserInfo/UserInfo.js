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
        return(

            <div >

            <Button variant="primary" onClick={this.handleShow}>
              Launch static backdrop modal
            </Button>
      
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
              style={{maWidth: "90% !important"}}
              size="xl"
            >
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Seleccion/>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>Understood</Button>
              </Modal.Footer>
            </Modal>
          </div>
          

        );

    }



}
export default UserInfo;