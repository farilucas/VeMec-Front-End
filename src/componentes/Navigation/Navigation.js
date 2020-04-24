import React from 'react';

const Navigation = ({ onRouteChange, pagina }) => {
    let inicio = pagina === 'inicio' ? "" : <p onClick={() => onRouteChange('Inicio')} className="btn btn-primary">Ir al inicio</p>;
    let alta = pagina === 'alta' ? "" : <p onClick={() => onRouteChange('Alta')} className="btn btn-primary">Dar de alta un VeMec</p>;

    return (
       <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
           {inicio}
           {alta}
       </nav>
    );
}

export default Navigation;