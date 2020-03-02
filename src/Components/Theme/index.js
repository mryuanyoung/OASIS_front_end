import React from 'react';
import './theme.css';
import image from './OASIS.png'

export default (props) => {
    return (
        <>
            <img className='OASIS_logo' src={image} alt='logo'/>
            <div className='theme'>
                Online grAph System for acdemIcS
            </div>
        </>
    )
}