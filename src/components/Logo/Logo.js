import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brains.png';

function Logo() {
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br4 shadow-3 " options={{ max : 50, speed: 300, }} style={{ height: 200, width: 190,}}>
                <div className="Tilt-inner pa3">
                    <img style={{height:180}} src={brain} alt='logo'/> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;