import React from "react";
import VeMec from "../VeMec/VeMec";
import CardDeck from "react-bootstrap/CardDeck";
import Pagination from "react-js-pagination";
import Button from "react-bootstrap/Button";
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
            isFetching: false
        };
    }

    componentDidMount() {
        this.fetchData();
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
        return (this.state.vemecs !== nextState.vemecs) || (this.state.graphData !== nextState.graphData);
    }

    render() {
        let vemecs = this.state.vemecs.map(vemec => {
            let veMecData = {...vemec};
            veMecData.graph = this.state.graphData[vemec.id];

            return <VeMec data={veMecData} key={vemec.id}/>;
        })

        return (
            <div className={"m-5"}>
                <CardDeck>
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