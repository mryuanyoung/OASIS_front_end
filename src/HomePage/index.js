import React from 'react';
import SearchBar from '../Components/SearchBar/index.js';
import Theme from '../Components/Theme/index.js';
import './homePage.css';


const HomePage = (props) => {

    return (
        <div className='container'>
            <Theme></Theme>
            <SearchBar></SearchBar>
        </div>
    )
}
export default HomePage;