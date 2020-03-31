import React from 'react';
import SearchBar from '../Components/SearchBar/index.js';
import Theme from '../Components/Theme/index.js';
import './homePage.css';
import HotResearch from '../Components/HotResearch/index.js';

const HomePage = (props) => {

    return (
        <>
            <div className='container'>
                <Theme></Theme>
                <SearchBar></SearchBar>
                <HotResearch></HotResearch>
                <div className='gov'>
                    <span>@2019-2020 esruoc.top 版权所有 ICP证： </span><a href="http://www.beian.miit.gov.cn/" target='_blank' rel="noopener noreferrer">蜀ICP备19023801号</a>
                </div>
            </div>
        </>
    )
}
export default HomePage;