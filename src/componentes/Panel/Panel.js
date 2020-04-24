import React from "react";
import VeMec from "../VeMec/VeMec";
import CardDeck from "react-bootstrap/CardDeck";
import Pagination from "react-js-pagination";
import Form from "react-bootstrap/Form";
require("bootstrap/dist/css/bootstrap.css");

class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vemecs: [],
            graphData: {},
            pageNumber: 0,
            size: 3,
            totalElements: 0,
            totalPages: 0,
            isFetching: false,
            pressureUnit: 'Pa'
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    onUnitSelect(event) {
        this.setState({pressureUnit: event.target.value});
    }

    async fetchData() {
        this.setState({isFetching: true});

        let json = await fetch(`http://localhost:8080/api/v1/vemecs?page=${this.state.page}&size=${this.state.size}&sort=id`, {
            method: "get",
            headers: {"Content-Type": "application/json"},
        }).then(res => res.json());

        this.setState({
            vemecs: json.elements,
            ...json.pageMetadata
        });

        let newGraphData = {};
        let fetches = [];

        json.elements.forEach((vemec) => {
            //Para cada VeMec, se piden los datos para sus graficas
            //Esto no es optimo ni jodiendo, pero por ahora queda asi
            let promise = fetch(`http://localhost:8080/api/v1/vemecs/${vemec.id}/grafica`, {
                method: "get",
                headers: {"Content-Type": "application/json"},
            })
            .then(res => res.json())
            .then(puntos => {
                newGraphData[vemec.id] = puntos;
            });

            fetches.push(promise);
        });

        //Luego de que se obtienen los datos de todas las graficas, se settea el nuevo estado
        await Promise.all(fetches);

        this.setState({
            isFetching: false,
            graphData: newGraphData
        });
    }

    onPageChange(page) {
        //Page-1 porque las paginas empiezan en 0 en el API
        this.setState({page: page-1}, this.fetchData.bind(this));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.vemecs !== nextState.vemecs)
            || (this.state.graphData !== nextState.graphData)
            || (this.state.pressureUnit !== nextState.pressureUnit);
    }

    async onBaja(event, id) {
        event.preventDefault();
        await fetch('http://localhost:8080/api/v1/vemecs/' + id, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        });

        //Si eliminamos el ultimo elemento en la pagina, hay que settear la pagina a la anterior
        if(((this.state.totalElements - 1) / this.state.size) <= (this.state.page)) {
            this.setState({page: this.state.page - 1}, this.fetchData.bind(this));
        }
        else {
            this.fetchData();
        }
    }

    render() {
        if(this.state.vemecs.length === 0) {
            return (
                <div className={"m-5"}>
                    <h1 style={{textAlign: "center"}}>No hay ventiladores registrados en el sistema.</h1>
                </div>
            );
        }

        let vemecs = this.state.vemecs.map(vemec => {
            let veMecData = {...vemec};
            veMecData.graph = this.state.graphData[vemec.id];

            return <VeMec data={veMecData} key={vemec.id} pressureUnit={this.state.pressureUnit} onBaja={this.onBaja.bind(this)} onRouteChange={this.props.onRouteChange}/>;
        })

        return (
            <div className={"m-5"}>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Form.Group>
                        <Form.Label>Unidad de Presion</Form.Label>
                        <Form.Control as="select" size="sm" onChange={this.onUnitSelect.bind(this)}>
                            <option value={"Pa"}>Pascal</option>
                            <option value={"mmHg"}>Milimetros de Mercurio</option>
                            <option value={"mbar"}>Milibar</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <CardDeck style={{justifyContent: "center"}}>
                    {vemecs}
                </CardDeck>
                <div className={"d-flex justify-content-center mt-2"}>
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

export default Panel;