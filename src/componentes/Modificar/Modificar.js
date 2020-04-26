import React, { Component } from 'react'

class Modificar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            marca: '',
            modelo: '',
            ubicacion: '',

        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSbmit = this.handleSbmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleSbmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state));
        fetch('http://localhost:8080/api/v1/vemecs/' + this.props.vemec, {

            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                this.state
            )
        })
        .then(result => console.log('success====:', result))
        .catch(error => console.log('error============:', error));
    }


    componentDidMount() {
        console.log(this.state.vemec)
        fetch('http://localhost:8080/api/v1/vemecs/' + this.props.vemec)
            .then(response => response.json())
            .then(data =>

                this.setState({
                    id: data.id,
                    marca: data.marca,
                    modelo: data.modelo,
                    ubicacion: data.ubicacion,
                }
                ))
            .then(console.log(this.state))
        console.log(this.state)
    }

    render() {
        const styleAlta = {
            backgroundColor: "lightgray",
            height: "470px",
            width: "350px"
        }
        return (
            <div className="row justify-content-center " >
                <div className="form-group lg-col-1 border border-info" style={styleAlta} >
                    <h5 className="card-header justify-content-center info-color white-text text-center py-4 border border-info">
                        <strong>Modificar</strong>
                    </h5>
                    <form onSubmit={this.handleSbmit} >
                        <div className="form-group lg-col-1">
                            <label htmlFor="id">
                                Id:
          </label>
                            <input
                                className="form-control"
                                placeholder="Id Vemec"
                                id="id"
                                name="id"
                                type="text"
                                readOnly
                                value={this.state.id}
                                onChange={this.handleInputChange} />

                        </div>
                        <div className="form-group lg-col-1">
                            <label htmlFor="marca">
                                Marca:
          </label>
                            <input

                                className="form-control"
                                placeholder="Ingrese Marca"
                                id="marca"
                                name="marca"
                                type="text"
                                value={this.state.marca}
                                onChange={this.handleInputChange} />

                        </div>
                        <div className="form-group lg-col-1">
                            <label htmlFor="modelo">
                                Modelo:
              </label>
                            <input
                                className="form-control"
                                placeholder="Ingrese Modelo"
                                id="modelo"
                                name="modelo"
                                type="text"
                                value={this.state.modelo}
                                onChange={this.handleInputChange} />

                        </div>
                        <div className="form-group lg-col-1">
                            <label htmlFor="ubicacion">
                                Ubicacion:
              </label>
                            <input
                                className="form-control"
                                placeholder="Ingrese Ubicacion"
                                id="ubicacion"
                                name="ubicacion"
                                type="text"
                                value={this.state.ubicacion}
                                onChange={this.handleInputChange} />


                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary center">Enviar</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default Modificar