import React from 'react';
import SearchBar from '../Components/SearchBar/index.js';
import Theme from '../Components/Theme/index.js';
import './homePage.css';
import HotResearch from '../Components/HotResearch/index.js';

const HomePage = (props) => {

    return (
        <div className='container'>
            <Theme></Theme>
            <SearchBar></SearchBar>
            <HotResearch></HotResearch>
        </div>
    )
}
export default HomePage;