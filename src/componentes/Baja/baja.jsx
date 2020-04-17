import React from 'react';

class Baja extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            bajaId = ''
        }
    }
    onBajaIdChange = (event) => {
        this.setState({bajaId: event.target.value});
    }
    onBajaSubmit = () => {
        event.preventDefault();
        fetch('http://localhost:3000/api/vemecs/' + this.props.bajaId ,{
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {console.log("Sucess VeMec Deleted")})
            .catch(error => {console.log("Error on onBajaSubmit")})
    }
    /* Cambiar a una lista de datos basicos con boton para eliminar despues */
    render() {
        return(
            <div>
                <form onSubmit={this.onBajaSubmit}>
                    <label for="id">Id de VeMec a eliminar:</label>
                    <input name="id" type="text" value={this.state.bajaId} onChange={this.onBajaIdChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
/* <Baja/> */
export default Baja;