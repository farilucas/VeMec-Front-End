import React, { Component } from 'react'

import VeMecList from './VeMecList.json';
import VeMec from './VeMec.js';

class Listado extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const Listado3 = (
      <div className="Listado">
        {VeMecList.map(co =>
          <VeMec id={co.id} marca={co.marca} modelo={co.modelo} ubicacion={co.ubicacion} estados={co.estados} />
        )}
      </div>
    );
    return (Listado3);
  }

}
export default Listado