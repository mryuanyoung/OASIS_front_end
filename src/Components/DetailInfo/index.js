import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import PaperDetail from '../PaperDetailInfo/index';
import AuthorDetail from '../AuthorDetailInfo';

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.res !== this.props.res || nextProps.loading !== this.props.loading;
    }

    render() {
        if (!this.props.loading) {
            if (Object.keys(this.props.res).length !== 0) {
                switch (this.props.method[0]) {
                    case 'paper':
                        return <PaperDetail {...this.props.res}></PaperDetail>;
                    case 'author':
                        return <AuthorDetail {...this.props.res}></AuthorDetail>;
                    default:
                        return <div>no data</div>;
                }
            }
            else{
                return <div>no data!</div>
            }
        }
        else {
            return <Spin></Spin>;
        }
    }
}

const mapStateToProps = ({ search, detail }) => {
    return {
        res: detail.res,
        method: search.method,
        loading: detail.loading
    };
}

export default connect(mapStateToProps)(Detail);