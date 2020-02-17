import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import '@/components/theme_picker/theme_picker.less'

class ThemePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_color: '#477ae6',
            box_show: false
        };
    }
    render() {
        return (
            <div className='ThemePicker'>
                <div onClick={ this.boxShow } style={{ 'backgroundColor': this.state.cur_color }} className='theme_block btn_border_radius'></div>
                {
                    this.state.box_show ? 
                    <ChromePicker color={ this.state.cur_color } onChange={ this.colorChange } onChangeComplete={ this.colorChangeComplete } />
                    :
                    ''
                }
            </div>
        )
    }
    colorChange = ({ hex })=> { //拖拽过程
        this.setState({ cur_color: hex });
    }
    colorChangeComplete = ({ hex })=> { //鼠标停止，改变主题色
        window.less.modifyVars({
            '@primary-color': this.state.cur_color
        });
    }
    boxShow = ()=> {
        this.setState({ box_show: !this.state.box_show });
    }
}

export default ThemePicker