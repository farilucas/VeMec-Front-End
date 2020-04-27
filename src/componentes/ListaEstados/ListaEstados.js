import React from "react";
import DataTable from "react-data-table-component";
import {unit} from "mathjs";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class ListaEstados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            estados: [],
            page: 0,
            size: 10,
            sort: "timestamp,desc",
            pressureUnit: "Pa"
        };
    }

    #columns = [
        {
            name: "Timestamp",
            sortable: true,
            selector: "timestamp"
        },
        {
            name: "Presion de Entrada",
            sortable: true,
            selector: "presionEntrada"
        },
        {
            name: "Presion de Salida",
            sortable: true,
            selector: "presionSalida"
        },
        {
            name: "Presion Maxima",
            sortable: true,
            selector: "presionMaxima"
        },
        {
            name: "Presion Minima",
            sortable: true,
            selector: "presionMinima"
        },
        {
            name: "Volumen de Gas Aportado",
            sortable: true,
            selector: "volumenGasAportado"
        },
        {
            name: "Frecuencia de Aporte",
            sortable: true,
            selector: "frecuenciaDeAporte"
        },
        {
            name: "Porcentaje de Oxigeno",
            sortable: true,
            selector: "porcentajeOxigeno"
        },
        {
            name: "Humedad",
            sortable: true,
            selector: "humedad"
        },
        {
            name: "Temperatura de Entrada",
            sortable: true,
            selector: "temperaturaEntrada"
        },
        {
            name: "Temperatura de Salida",
            sortable: true,
            selector: "temperaturaSalida"
        }
    ];

    componentDidMount() {
        this.fetchData()
    }

    onPageChange(page) {
        this.setState(
            {page: page-1},
            this.fetchData.bind(this));
    }

    onChangeRowsPerPage(currentRowsPerPage) {
        this.setState(
            {size: currentRowsPerPage},
            this.fetchData.bind(this));
    }

    onSort(column, direction) {
        this.setState(
            {sort: `${column.selector},${direction}`},
            this.fetchData.bind(this));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.estados !== nextState.estados)
            || this.state.isFetching !== nextState.isFetching
            || this.state.pressureUnit !== nextState.pressureUnit;
    }

    async fetchData() {
        this.setState({isFetching: true});

        let json = await fetch(`http://localhost:8080/api/v1/vemecs/${this.props.id}/estados?page=${this.state.page}&size=${this.state.size}&sort=${this.state.sort}`, {
            method: "get",
            headers: {"Content-Type": "application/json"},
        }).then(res => res.json());

        this.setState({
            estados: json.elements,
            isFetching: false,
            ...json.pageMetadata
        });
    }

    onUnitSelect(event) {
        this.setState({pressureUnit: event.target.value});
    }

    //Criet  teibl
    render() {
        const unitSelector = (
            <Form.Group className="m-0">
                <Form.Row className="m-0">
                    <Form.Label className="my-auto mr-2" style={{fontSize: "1rem"}}>Unidad de Presion</Form.Label>
                    <Col>
                        <Form.Control as="select" size="sm" onChange={this.onUnitSelect.bind(this)}>
                            <option value={"Pa"}>Pascal</option>
                            <option value={"mmHg"}>Milimetros de Mercurio</option>
                            <option value={"mbar"}>Milibar</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
            </Form.Group>
        );

         return (
             <>
                 <DataTable
                     className="mt-5"
                     progressPending={this.state.isFetching}
                     title={`Estados de ${this.props.id}`}
                     subHeader={true}
                     subHeaderAlign="right"
                     subHeaderComponent={unitSelector}
                     columns={this.#columns}
                     data={this.state.estados.map(estado => {
                         return {
                             ...estado,
                             presionMaxima: unit(estado.presionMaxima, 'Pa').toNumber(this.state.pressureUnit).toFixed(4).replace(/[.,]0000$/, ""),
                             presionMinima: unit(estado.presionMinima, 'Pa').toNumber(this.state.pressureUnit).toFixed(4).replace(/[.,]0000$/, ""),
                             presionEntrada: unit(estado.presionEntrada, 'Pa').toNumber(this.state.pressureUnit).toFixed(4).replace(/[.,]0000$/, ""),
                             presionSalida: unit(estado.presionSalida, 'Pa').toNumber(this.state.pressureUnit).toFixed(4).replace(/[.,]0000$/, "")
                         }
                     })}
                     pagination={true}
                     paginationServer={true}
                     paginationDefaultPage={1}
                     paginationPerPage={this.state.size}
                     paginationTotalRows={this.state.totalElements}
                     persistTableHead={true}
                     onChangePage={this.onPageChange.bind(this)}
                     onChangeRowsPerPage={this.onChangeRowsPerPage.bind(this)}
                     onSort={this.onSort.bind(this)}
                 />
             </>
        );
    }
}

export default ListaEstados;