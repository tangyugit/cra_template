import React, { Component } from 'react'
import '@/pages/home/business/index/index.less'
import Header from '@/components/header/header'
import ImageTool from '@/components/image_tool/image_tool'
import TimeLine from '@/components/time_line/time_line'

class Index extends Component {
    constructor(props) {
        super(props);
        this.timeline = null;
        this.state = {
            index: 0,
            img: [
                { src: require('@/assets/img/test_img/2.jpg') },
                { src: require('@/assets/img/test_img/bg.jpg') },
                { src: require('@/assets/img/test_img/login_bg.jpg') },
                { src: require('@/assets/img/test_img/1.jpg') },
                { src: require('@/assets/img/test_img/3.jpg') },
                { src: require('@/assets/img/test_img/4.jpg') }
            ]
        };
    }
    componentDidMount() {
        this.timeline.init({
            startTime: new Date(),
            curTime: new Date(new Date().getTime() + 1*60*60*1000),
            hours: 4,
            timeSpace: 6
        });
    }
    render() {
        return (
            <div className='Index'>
                <Header id='home' />
                <div className='image_test'>
                    <ImageTool src={ this.state.img[this.state.index].src } prev={ this.prev } next={ this.next } interval={ this.next } />
                </div>
                <div className='timeline_test'>
                    <TimeLine onRef={ res=> this.timeline = res } getTimes={ e=> console.log(e)} />
                </div>
            </div>
        )
    }
    prev = async ()=> { //上一张
        if(this.state.index - 1 < 0) {
            await this.setState({ index: this.state.img.length - 1 });
            return false;
        }
        await this.setState({ index: this.state.index - 1 });
    }
    next = async ()=> { //下一张
        if(this.state.index + 1 === this.state.img.length) {
            await this.setState({ index: 0 });
            return false;
        }
        await this.setState({ index: this.state.index + 1 });
    }
}

export default Index