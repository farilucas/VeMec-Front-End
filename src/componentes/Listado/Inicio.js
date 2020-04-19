import React from 'react';


class Inicio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            apellido: ''
        }

    }

    render(){
        return(
            <div>
                <p>Hola</p>
            </div>
        );
    }
}


export default Inicio;