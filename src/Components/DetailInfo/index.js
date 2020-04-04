import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Spin } from 'antd';
import PaperDetail from '../PaperDetailInfo/index';
import AuthorDetail from '../AuthorDetailInfo';
import InsDetail from '../InsDetailInfo';
import ConfDetail from '../ConfDetailInfo';


class Detail extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        if (!this.props.loading) {
            if (Object.keys(this.props.res).length !== 0) {
                switch (this.props.method) {
                    case 'paper':
                        return <PaperDetail {...this.props.res}></PaperDetail>;
                    case 'author':
                        return <AuthorDetail {...this.props.res}></AuthorDetail>;
                    case 'institution':
                        return <InsDetail {...this.props.res}></InsDetail>;
                    case 'conference':
                        return <ConfDetail {...this.props.res} />
                    default:
                        return <div>no data</div>;
                }
            }
            else {
                return <div>no data!</div>
            }
        }
        else {
            return <Spin></Spin>;
        }
    }
}

const mapStateToProps = ({ detail }) => {
    return {
        res: detail.res,
        method: detail.resType,
        loading: detail.loading,
        url: detail.url
    };
}

export default withRouter(connect(mapStateToProps)(Detail));