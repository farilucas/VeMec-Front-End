import React from 'react';
import Button from 'react-bootstrap/Button';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';


class ListarPacientes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pacientes: [],
            open: false
        }
        this.fetchData = this.fetchData.bind(this)
        this.toggleModalOnOff = this.toggleModalOnOff.bind(this)
    }


    toggleModalOnOff() {
        this.setState({ open: !this.state.open })
    }

    async fetchData(){
        await fetch('url', {
            method: 'post',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => this.setState({pacientes: json}))
    }

    render(){
        let pacientes = this.state.pacientes.map(paciente => {
            let dataPaciente = {...paciente}
            return(
                <div>
                    <td>{dataPaciente.nombre}</td>
                    <td>{dataPaciente.ci}</td>
                    <td>
                        <Button onClick={this.toggleModalOnOff}>Accion Medica</Button>
                        <Modal
                            isOpen={this.state.open}
                            size='lg'
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <ModalHeader>
                                Accion Medica
                            </ModalHeader>
                            <ModalBody>
                                <span>Hola amigo de las cavernas</span>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.toggleModalOnOff}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </td>
                </div>
            )
        })
        return(
            <div>
                <table className='table' style={{ backgroundColor: '#A7A7A7'}}>
                    <thead>
                        <tr>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {pacientes}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


export default ListarPacientes;