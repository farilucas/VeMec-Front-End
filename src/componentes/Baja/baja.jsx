import React from 'react';

class Baja extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            bajaId : ''
        }
    }
    onBajaIdChange = (event) => {
        this.setState({bajaId: event.target.value});
    }
    onBajaSubmit = (event) => {
        event.preventDefault();
        
        fetch('http://localhost:8080/api/v1/vemecs/' + this.state.bajaId ,{
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {console.log("Sucess VeMec Deleted")})
            .catch(error => {console.log("Error on onBajaSubmit")})
    }
    /* Cambiar a una lista de datos basicos del aparato con un boton para eliminar, despues, ... quizas ... */
    render() {
        return(
            <div>
                <form onSubmit={this.onBajaSubmit}>
                    <label htmlFor="id">Id de VeMec a eliminar:</label>
                    <input name="id" type="text" value={this.state.bajaId} onChange={this.onBajaIdChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
/* <Baja/> */
export default Baja;