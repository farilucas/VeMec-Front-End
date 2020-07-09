import React, {Component} from 'react'
import Modal from "react-bootstrap/Button";
import Button from "react-bootstrap/Button";

class UserInfo extends Component{

    constructor(props) {
        super(props)

        this.state = {
            show : props.see

        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
   // const [show, setShow] = useState(false);

    handleClose() {this.setState({see:false})};
    handleShow () {this.setState({see:true})};
    
    render(){
        return(

            <>

            <Button variant="primary" onClick={this.handleShow}>
              Launch static backdrop modal
            </Button>
      
            <Modal
              show={this.show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                I will not close if you click outside me. Don't even try to press
                escape key.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary">Understood</Button>
              </Modal.Footer>
            </Modal>
          </>

        );

    }



}
export default UserInfo;