import React from "react";
import VeMec from "../VeMec/VeMec";
import CardDeck from "react-bootstrap/CardDeck";
import Pagination from "react-js-pagination";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Toast from "react-bootstrap/Toast";

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
            isFetching: true,
            pressureUnit: 'Pa',
        };

        this.criticos = [];

        this.fetchData = this.fetchData.bind(this);
        this.updateVeMecData = this.updateVeMecData.bind(this);

        this.isUpdating = false;
        this.playSound = this.playSound.bind(this);
        this.intervalHandle = setInterval(this.updateVeMecData, 2000);
    }

    componentDidMount() {
        this.fetchData();
        //this.playSound();
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
        }, this.playSound);

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
        this.criticos.splice(0);
        this.setState({page: page-1}, this.fetchData.bind(this));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.vemecs !== nextState.vemecs)
            || (this.state.graphData !== nextState.graphData)
            || (this.state.pressureUnit !== nextState.pressureUnit);
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandle);
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

    async updateVeMecData() {
        if(this.isFetching)
            return;

        await this.fetchData();
    }

    async playSound() {
        let vemecsCriticos = this.state.vemecs.filter(vemec => (vemec.estados && vemec.estados.length > 0 && vemec.estados[0].critico))
        let noCriticos = this.state.vemecs.filter(vemec => !vemecsCriticos.includes(vemec));
        console.log("En playSound")


        for(let veMec of noCriticos) {
            if(this.criticos.includes(veMec.id)) {
                this.criticos.splice(this.criticos.indexOf(veMec.id), 1);
            }
        }

        for(let i = 0; i < vemecsCriticos.length; ++i) {
            if(!this.criticos.includes(vemecsCriticos[i].id)) {
                let audio = new Audio('http://localhost:3000/WindowsExclamation.wav')

                audio.play();
                toast(`${vemecsCriticos[i].id} en estado critico.`, {
                    // position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                this.criticos.push(vemecsCriticos[i].id);
                console.log(this.criticos);
            }
        }


    }

    container(){
        return (<ToastContainer style={{ marginTop: '100px' }}/>)
    }

    render() {
        if(this.state.vemecs.length === 0 && !this.state.isFetching) {
            return (
                <div className="d-flex justify-content-center">
                    <Card className="mt-5">
                        <Card.Body className="">
                            <Alert variant="danger" className="h2 m-0">No hay ventiladores registrados en el sistema.</Alert>
                        </Card.Body>
                        <Card.Footer className={"d-flex"}>
                            <Button className={"mx-auto"} onClick={() => this.props.onRouteChange('Alta')} >Dar de Alta un VeMec</Button>
                        </Card.Footer>
                    </Card>
                </div>
            );
        }

        let vemecs = this.state.vemecs.map(vemec => {
            let veMecData = {...vemec};
            
            veMecData.graph = this.state.graphData[vemec.id];

            return <VeMec data={veMecData} key={vemec.id} pressureUnit={this.state.pressureUnit} onBaja={this.onBaja.bind(this)} onRouteChange={this.props.onRouteChange}/>;
        })

        //this.playSound()
        return (
            <div className={"m-5 d-flex flex-column"}>
                <div>
                    {this.container()}
                </div>
                <Card className="align-self-start">
                    <Card.Body className="px-2 py-1">
                        <Form.Group>
                            <Form.Label>Unidad de Presion</Form.Label>
                            <Form.Control as="select" size="sm" onChange={this.onUnitSelect.bind(this)}>
                                <option value={"Pa"}>Pascal</option>
                                <option value={"mmHg"}>Milimetros de Mercurio</option>
                                <option value={"mbar"}>Milibar</option>
                            </Form.Control>
                        </Form.Group>
                    </Card.Body>
                </Card>

                <CardDeck className="justify-content-center my-2">
                    {vemecs}
                </CardDeck>
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

export default Panel;