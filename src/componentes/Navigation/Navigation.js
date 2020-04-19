import React from 'react';

const Navigation = ({ onRouteChange, dadoDeAlta }) => {
       if (dadoDeAlta) {
           return (
               <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                   <p onClick={() => onRouteChange('Inicio')} className="btn btn-primary">Ir al inicio</p>
               </nav>
           );
       }
       else{
           return (
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('Alta')} className="btn btn-primary">Dar de alta un VeMec</p>
                </nav>
            );
       }
        
}

export default Navigation;