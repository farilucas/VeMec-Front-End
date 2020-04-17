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
        fetch('http://localhost:8080/api/v1/vemecs/'+ this.props.vemec, {
        
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            this.state
          )
        }).then(result => console.log('success====:', result))
        .catch(error => console.log('error============:', error));
        
      }


    componentDidMount(){
      console.log(this.state.vemec)
        fetch('http://localhost:8080/api/v1/vemecs/'+ this.props.vemec)
        .then(response => response.json())
        .then(data =>
            
            this.setState({
                id: data.id,
                marca: data.marca,
                modelo : data.modelo,
                ubicacion : data.ubicacion,
            }
            ))
        .then(console.log(this.state))
        console.log(this.state)
    }
     render() {
         return (
             <div>
    <form onSubmit={this.handleSbmit}>
        <label>
          id:
          <input
            name="id"
            type="text"
            value= {this.state.id}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          marca:
          <input
            name="marca"
            type="text"
            value= {this.state.marca}
            onChange={this.handleInputChange} />
        </label>
        <label>
          modelo:
          <input
            name="modelo"
            type="text"
            value= {this.state.modelo}
            onChange={this.handleInputChange} />
        </label>
        <label>
          ubicacion:
          <input
            name="ubicacion"
            type="text"
            value= {this.state.ubicacion}
            onChange={this.handleInputChange} />
        </label>
        <button type="submit">submit</button>
      </form>
             </div>
         )
     }
 }
 
 export default Modificar
 