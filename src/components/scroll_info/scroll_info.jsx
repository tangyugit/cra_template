import React, { Component } from 'react'
import '@/components/scroll_info/scroll_info.less'

class ScrollInfo extends Component {
    constructor(props) {
        super(props);
        this.timing = null;
        this.state = {
            show: true,
            top: 0,
            steps: 1,
            spaceTime: 50,
        };
    }
    render() {
        return (
            this.state.show ? 
            <div className='ScrollInfo lb-moveFromRight'>
                <div className='title theme_bg'>
                    <span>滚动信息</span>
                    <img onClick={ this.close } className='close' src={ require('@/assets/img/common/close.png') } alt=""/>
                </div>
                <div className='scroll_con'>
                    <div style={{ top: `${this.state.top}px` }} className='scroll_con_main'>
                        <p>111111</p>
                        <p>22222</p>
                        <p>33333</p>
                        <p>44444</p>
                        <p>5555</p>
                        <p>666</p>
                        <p>777</p>
                        <p>888</p>
                        <p>999</p>
                        <p>aaaa</p>
                        <p>ffff</p>
                        <p>yyyyy</p>
                    </div>
                </div>
            </div>
            :
            <div onClick={ this.open } className='ScrollInfo_box theme_bg lb-rotateInNewspaper'>
                <span>《</span>
                <span style={{ marginLeft: '2px' }}>滚动信息</span>
            </div>
        )
    }
    componentDidMount() {
        this.interval();
    }
    interval = ()=> {
        this.timing = setInterval(async ()=> {
            let whole = document.getElementsByClassName('scroll_con_main')[0].clientHeight,
                con = document.getElementsByClassName('scroll_con')[0].clientHeight;
            await this.setState({
                top: this.state.top - this.state.steps <= con - whole ? 0 : this.state.top - this.state.steps
            });
        }, this.state.spaceTime);
    }
    close = ()=> {
        clearInterval(this.timing);
        this.timing = null;
        this.setState({ top: 0, show: false });
    }
    open = async ()=> {
        await this.setState({ top: 0, show: true });
        this.interval();
    }
}

export default ScrollInfo