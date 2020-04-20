import React from "react";
import DataTable from "react-data-table-component";

class ListaEstados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            estados: [],
            page: 0,
            size: 10,
            sort: "timestamp,desc"
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

    onPageChange(page, totalRows) {
        this.setState(
            {page: page-1},
            this.fetchData.bind(this));
    }

    onChangeRowsPerPage(currentRowsPerPage, currentPage) {
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
        return (this.state.estados !== nextState.estados) || this.state.isFetching;
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

    //Criet  teibl
    render() {
         return (
             <>
                 <DataTable
                     progressPending={this.state.isFetching}
                     title={`Estados de ${this.props.id}`}
                     columns={this.#columns}
                     data={this.state.estados}
                     pagination={true}
                     paginationServer={true}
                     paginationDefaultPage={1}
                     paginationPerPage={this.state.size}
                     paginationTotalRows={this.state.totalElements}
                     onChangePage={this.onPageChange.bind(this)}
                     onChangeRowsPerPage={this.onChangeRowsPerPage.bind(this)}
                     onSort={this.onSort.bind(this)}
                 />
             </>
        );
    }
}

export default ListaEstados;