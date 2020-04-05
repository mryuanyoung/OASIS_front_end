import React from 'react';
import { LeftCircleTwoTone } from '@ant-design/icons';

import './index.css';


class Drag extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            x_start: 0,
            y_start: 0,
            x_off: 0,
            y_off: 0,
            hidden: true,
            dragStyle: {
                'transform': 'translate(70vw, 1vh)'
            },
            outStyle: {
                'visibility': 'hidden'
            }
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidMount() {
        const styles = getComputedStyle(this.ref.current);
        const trans = styles.getPropertyValue('transform').split(',');
        const x = Number(trans[trans.length-2]);
        let y = trans[trans.length-1];
        y = y.substring(0, y.length-1);
        y = Number(y);
        this.setState({ x_off: x, y_off: y });
        document.body.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        document.body.addEventListener('drop', e => {
            e.preventDefault();
            const x_end = e.clientX, y_end = e.clientY;
            const x_off = this.state.x_off + x_end - this.state.x_start + 10;
            const y_off = this.state.y_off + y_end - this.state.y_start + 10;
            this.setState({
                x_off,
                y_off,
                dragStyle: { 'transform': `translate(${x_off}px, ${y_off}px)` }
            });
        });
    }

    render() {
        return (
            <div
                className='drag'
                ref={this.ref}
                style={this.state.dragStyle}
                onDragStart={e => {
                    this.setState({ x_start: e.clientX, y_start: e.clientY });
                }}
            >
                <div id='slide' style={this.state.outStyle}></div>
                <LeftCircleTwoTone
                    twoToneColor='#1da57a'
                    draggable='true'
                    id='visi'
                    onClick={e => {
                        this.setState((state) => {
                            if (state.hidden) {
                                return {
                                    outStyle: {
                                        visibility: '',
                                        transform: 'translateX(-12vw)'
                                    },
                                    hidden: !state.hidden
                                }
                            }
                            else {
                                return {
                                    outStyle: {
                                        visibility: 'hidden',
                                    },
                                    hidden: !state.hidden
                                }
                            }
                        })
                    }} />
            </div>
        )
    }
}

export default Drag;