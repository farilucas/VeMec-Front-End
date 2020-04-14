import React from 'react';

const Navigation = ({ onRouteChange}) => {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('Alta')}>Dar de alta un VeMec</p>
            </nav>
        );
}

export default Navigation;