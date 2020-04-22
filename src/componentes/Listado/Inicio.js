import React from 'react';


class Inicio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: ''
        }

    }

    onBajaIdChange = (event) => {
        this.setState({ id: event.target.value });
    }
    onBajaSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/api/v1/vemecs/' + this.props.id, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => { console.log("Sucess VeMec Deleted") })
            .catch(error => { console.log("Error on onBajaSubmit") })
    }

    render(){
        return(
            <div>
                <p>Hola</p>
                <input
                type="submit"
                onClick={this.onBajaSubmit}
                value="Dar de baja"
                />
            </div>
        );
    }
}


export default Inicio;