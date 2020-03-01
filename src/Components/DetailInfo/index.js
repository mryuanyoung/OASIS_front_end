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
        return nextProps.detail !== this.props.detail;
    }

    render() {
        if (Object.keys(this.props.detail).length !== 0) {
            switch (this.props.method) {
                case 'paper':
                    return <PaperDetail {...this.props.detail}></PaperDetail>;
                case 'author':
                    return <AuthorDetail {...this.props.detail}></AuthorDetail>;
                default:
                    return <div>no data</div>;
            }
        }
        else {
            return <Spin></Spin>;
        }
    }
}

const mapStateToProps = ({ search, detail }) => {
    return {
        detail: detail,
        method: search.method
    };
}

export default connect(mapStateToProps)(Detail);