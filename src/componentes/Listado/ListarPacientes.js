import React from 'react';
import Pagination from "react-js-pagination";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
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
            open: false,
            pageNumber: 0,
            size: 20,
            totalElements: 0,
            totalPages: 0,
        }
        this.fetchData = this.fetchData.bind(this)
        this.toggleModalOnOff = this.toggleModalOnOff.bind(this)
        this.fetchFiltered = this.fetchFiltered.bind(this)
    }

    componentDidMount(){
        this.fetchData()
    }

    toggleModalOnOff() {
        this.setState({ open: !this.state.open })
    }

    onFilterSelect(event){
        this.fetchFiltered(event.target.value)
    }

    async fetchFiltered(filtro){
        let json = await fetch(`http://localhost:8080/api/v1/pacientes/${filtro}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        
        this.setState({
            pacientes: json.elements,
            ...json.pageMetadata
        });
    }

    async fetchData(){
        let json = await fetch('http://localhost:8080/api/v1/pacientes', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        
        this.setState({
            pacientes: json.elements,
            ...json.pageMetadata
        });
    }

    onPageChange(page) {
        this.setState({ page: page - 1 }, this.fetchData.bind(this));
    }

    render(){
        let pacientes = this.state.pacientes.map( (paciente, index) => {
            let dataPaciente = {...paciente}
            return(    
                <tr key={index}>
                    <td>{dataPaciente.nombre}</td>
                    <td>{dataPaciente.documento}</td>
                    <td>
                        <Button  onClick={this.toggleModalOnOff}>Accion Medica</Button>
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
                </tr>
            )
        })
        return(
            <div>
                <Table bordered variant='dark' className='text-center'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Accion Medica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes}
                    </tbody>
                </Table>
                <div className={"d-flex justify-content-center"}>
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={this.state.pageNumber + 1}
                        itemsCountPerPage={this.state.size}
                        totalItemsCount={this.state.totalElements}
                        pageRangeDisplayed={3}
                        onChange={this.onPageChange.bind(this)}
                    />
                </div>
                <Card className="align-self-start">
                    <Card.Body className="px-2 py-1">
                        <Form.Group>
                            <Form.Label>Filtro de Pacientes</Form.Label>
                            <Form.Control as="select" size="sm" onChange={this.onFilterSelect.bind(this)}>
                                <option value={1}>Sin filtro</option>
                                <option value={2}>Domicilio</option>
                                <option value={3}>Campamento de Emergencia</option>
                                <option value={4}>Cuidados Intensivos</option>
                            </Form.Control>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}


export default ListarPacientes;