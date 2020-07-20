import React from 'react';
import Pagination from "react-js-pagination";
import Table from 'react-bootstrap/Table';
import UserInfo from '../UserInfo/UserInfo'


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

        this.conFicha = []

        this.fetchData = this.fetchData.bind(this)
        this.toggleModalOnOff = this.toggleModalOnOff.bind(this)
    }

    componentDidMount(){
        this.fetchData()
    }

    toggleModalOnOff() {
        this.setState({ open: !this.state.open })
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
        //Page-1 porque las paginas empiezan en 0 en el API
        this.setState({ page: page - 1 }, this.fetchData.bind(this));
    }

    render(){
        let pacientes = this.state.pacientes.map(paciente => {
            let dataPaciente = {...paciente}
            
            let tieneFicha = this.state.pacientes.filter(paciente => (paciente.ficha && paciente.ficha.length > 0 && paciente.ficha[0].veMecId !== ''))
            let noFicha = this.state.pacientes.filter(paciente => !tieneFicha.includes(paciente))
            for (let paciente of noFicha) {
                if (this.conFicha.includes(paciente.documento)) {
                    this.conFicha.splice(this.conFicha.indexOf(paciente.documento), 1);
                }

                
            }
            for (let i = 0; i < tieneFicha.length; i++) {
                if (!this.conFicha.includes(tieneFicha[i].id)) {
                    this.conFicha.push(tieneFicha[i].id);
                }
            }

            return(    
                <tr key={dataPaciente.documento}>
                    <td>{dataPaciente.nombre}</td>
                    <td>{dataPaciente.documento}</td>
                    {   tieneFicha.includes(paciente)
                        ?<td>Entubado</td>
                        :<td>No entubado</td>
                    }
                    <td>
                    <UserInfo see={false} button={true} paciente= {dataPaciente}/>
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
                            <th>Situacion</th>
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
            </div>
        );
    }
}


export default ListarPacientes;