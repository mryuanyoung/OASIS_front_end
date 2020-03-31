import React from 'react';
import throttle from '../../utils/throttle';

import './index.css';


class Drag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x_start: 0,
            y_start: 0,
            x_off: 0,
            y_off: 0,
            hidden: true,
            dragStyle: {
                'transform': 'translate(10px, 20px)'
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
        document.body.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        document.body.addEventListener('drop', e => {
            console.log('drop');
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
                draggable='true'
                style={this.state.dragStyle}
                onDragStart={e => {
                    console.log('drag start');
                    this.setState({ x_start: e.clientX, y_start: e.clientY });
                }}
            >
                <div id='slide' style={this.state.outStyle}></div>
                <div id='visi' onClick={e => {
                    this.setState((state) => {
                        if(state.hidden){
                            return {
                                outStyle: {
                                    visibility: '',
                                    transform: 'translateX(-12vw)'
                                },
                                hidden: !state.hidden
                            }
                        }
                        else{
                            return {
                                outStyle: {
                                    visibility: 'hidden',
                                },
                                hidden: !state.hidden
                            }
                        }
                    })
                }}>
                </div>
            </div>
        )
    }
}

export default Drag;