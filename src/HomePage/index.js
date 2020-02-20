import React from 'react';
import SearchBar from '../Components/SearchBar/index.js';
import Theme from '../Components/Theme/index.js';
import './index.css';

export const HistoryContext = React.createContext();

export default (props) => {

    return (
        <HistoryContext.Provider value={props.history.push}>
            <div className='container'>
                <Theme></Theme>
                <SearchBar></SearchBar>
            </div>
        </HistoryContext.Provider>
    )
}