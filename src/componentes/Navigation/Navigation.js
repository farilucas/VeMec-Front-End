import React from 'react';

const Navigation = ({ onRouteChange, pagina }) => {
       if (pagina === 'alta' ) {
           return (
               <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                   <p onClick={() => onRouteChange('Modificar')} className="btn btn-primary">Modificar un VeMec</p>
                   <p onClick={() => onRouteChange('Inicio')} className="btn btn-primary">Ir al inicio</p>
               </nav>
           );
       }
       else if(pagina === 'inicio'){
           return (
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('Alta')} className="btn btn-primary">Dar de alta un VeMec</p>
                    <p onClick={() => onRouteChange('Modificar')} className="btn btn-primary">Modificar un VeMec</p>
                </nav>
            );
       }
       else if(pagina === 'modificar'){
           return(
               <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                   <p onClick={() => onRouteChange('Alta')} className="btn btn-primary">Dar de alta un VeMec</p>
                   <p onClick={() => onRouteChange('Inicio')} className="btn btn-primary">Ir al inicio</p>
               </nav>
           );
       }
        
}

export default Navigation;