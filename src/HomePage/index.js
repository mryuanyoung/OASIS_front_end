import React from 'react';
import SearchBar from '../Components/SearchBar/index.js';
import Theme from '../Components/Theme/index.js';
import './homePage.css';

export default (props) => {

    return (
        <div className='container'>
            <Theme></Theme>
            <SearchBar></SearchBar>
        </div>
    )
}