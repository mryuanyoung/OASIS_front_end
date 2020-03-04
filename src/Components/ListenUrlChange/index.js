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
            const reg = /\/[^\/]+\/detail/;
            if(reg.test(pathname)){
                const method = pathname.match(/[^/]+/)[0];
                this.props.matchUrl(pathname+search, method);
            }
        })
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