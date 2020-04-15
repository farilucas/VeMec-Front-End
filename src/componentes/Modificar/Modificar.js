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
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      handleSbmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state));
        
      }


    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data =>
            this.setState({
                id: data.id,
                marca: data.title,
                modelo : data.title,
                ubicacion : data.title,
            }
            ))
        .then(console.log(this.state))

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
 