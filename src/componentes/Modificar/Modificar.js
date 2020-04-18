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
    }).then(result => console.log('success====:', result))
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
    return (
      <div class="row justify-content-center ">
        <form onSubmit={this.handleSbmit} > 
          <div class="form-group lg-col-1">
            <label for="id">
              Id:
          </label>
            <input
              class="form-control"
              placeholder="Id Vemec"
              id="id"
              name="id"
              type="text"
              readOnly
              value={this.state.id}
              onChange={this.handleInputChange} />

          </div>
          <div div class="form-group lg-col-1">
            <label for="marca">
              Marca:
          </label>
            <input

              class="form-control"
              placeholder="Ingrese Marca"
              id="marca"
              name="marca"
              type="text"
              value={this.state.marca}
              onChange={this.handleInputChange} />

          </div>
          <div class="form-group lg-col-1">
            <label for="modelo">
              Modelo:
              </label>
          <input
                class="form-control"
                placeholder="Ingrese Modelo"
                id="modelo"
                name="modelo"
                type="text"
                value={this.state.modelo}
                onChange={this.handleInputChange} />

          </div>
          <div class="form-group lg-col-1">
            <label for="ubicacion">
              Ubicacion:
              </label>
          <input
                class="form-control"
                placeholder="Ingrese Ubicacion"
                id="ubicacion"
                name="ubicacion"
                type="text"
                value={this.state.ubicacion}
                onChange={this.handleInputChange} />
            
            
          </div>
          <div class="col">
            <button type="submit" class="btn btn-primary center">Enviar</button>
          </div>
          
        </form>
      </div>
    )
  }
}

export default Modificar
