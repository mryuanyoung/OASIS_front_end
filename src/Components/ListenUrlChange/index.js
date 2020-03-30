import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { search } from '../DetailInfo/action';

class Listener extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.props.history.listen(({pathname, search}) => {
            document.documentElement.scrollTop = 0
            const reg = /\/[^\/]+\/detail/;
            if(reg.test(pathname)){
                const method = pathname.match(/[^/]+/)[0];
                this.props.matchUrl(pathname+search, method);
            }
        });

        const loca = JSON.parse(window.sessionStorage.getItem('location'));
        if(loca && (loca.pathname !== '/' || loca.search || loca.hash)){
            this.props.history.push(`${loca.pathname}?${loca.search}#${loca.hash}`);
        }

        window.addEventListener('beforeunload', (e) => {
            window.sessionStorage.setItem('location', JSON.stringify(this.props.history.location));
            this.props.history.push('/');
            // e.returnValue = "确定吗？";
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = ({ detail }) => {
    return {
        url: detail.url,
    };
}

const mapDispatchToProps = (dispatch) =>{
    return {
        matchUrl: (url, method) => {
            dispatch(search(url, method));
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Listener));