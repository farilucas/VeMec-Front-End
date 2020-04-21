import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class Baja extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            bajaId : '',
            isOpen : false
        }
    }
    toggleModal = () => {
        this.setState({
            isOpen : !this.state.isOpen
        });
        if(!this.state.isOpen){
            this.setState({
                bajaId : this.props.vemecId
            });
        }
    }
    toggleModalDelete = () => {
        this.toggleModal();
        this.BajaDelete();
    }
    BajaDelete = (props) =>{
        /*console.log("Baja fetch delete alcanzado");*/
        fetch('http://localhost:8080/api/v1/vemecs/' + this.state.bajaId ,{
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {console.log("Baja VeMec")})
            .catch(error => {console.log("Baja Error")})
    }
    render() {
        return(
            <div>
                <Button onClick={this.toggleModal}>&times;</Button>
                <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Eliminar VeMec
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Se eliminara este <abbr title="Ventilador Mecánico">VeMec</abbr> para siempre</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.toggleModal}>Close</Button>
                    <Button variant="danger" onClick={this.toggleModalDelete}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}
/* <Baja vemecId={VeMec.id}/> */
export default Baja;