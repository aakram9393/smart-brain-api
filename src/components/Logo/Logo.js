import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' options={{ max : 55 }} style={{ height: 150, width: 160 }}>
                    <div className='Tilt-inner pa1'> < img style= {{ paddingTop: '5px', height: 130, width: 150 }} src={brain} alt='logo' />
                    </div>
            </Tilt>

        </div>
    );
}

export default Logo;