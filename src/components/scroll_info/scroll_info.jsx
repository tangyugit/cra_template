import React, { Component } from 'react'
import '@/components/scroll_info/scroll_info.less'

class ScrollInfo extends Component {
    constructor(props) {
        super(props);
        this.timing = null;
        this.state = {
            show: true,        //展示滚动面板
            top: 0,            //默认滚动高度0
            steps: 1,          //每次滚动-1像素
            spaceTime: 50,     //定时间隔时间
            moreShow: false,    //展示更多标识
            moreId: 'jcyj',    //更多当前ID
            moreList: [
                { id: 'jcyj', title: '机场预警' },
                { id: 'zdqzytqyj', title: '终端区重要天气预警' },
                { id: 'qyyj', title: '区域预警' }
            ],
            moreCurDetail: [
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '首都机场', text: '的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' },
                { airport: '呼和浩特白塔机场', text: '影响呼和浩特白塔机场的霜天气已经结束，取消18日06:03发布的01号机场警报（霜）。02-08 09:14（BJT）' }
            ]
        };
    }
    render() {
        return (
            this.state.show ? 
            <div style={{ backgroundImage: `url(${ require('@/assets/img/scroll_info/bg.png') })` }} className='ScrollInfo lb-moveFromRight'>
                <img className='left' src={ require('@/assets/img/scroll_info/left.png') } alt=""/>
                <img className='right' src={ require('@/assets/img/scroll_info/left.png') } alt=""/>
                <img onClick={ this.close } className='close' src={ require('@/assets/img/common/close.png') } alt=""/>
                <div className='title'>气象通告</div>
                <div onMouseEnter={ this.pause } onMouseLeave={ this.interval } className='scroll_con'>
                    <div style={{ top: `${this.state.top}px` }} className='scroll_con_main'>
                        <div>就开始老地方很烦呢是接口的发文件发</div>
                        <div>zxczxc</div>
                        <div>zxczxc</div>
                        <div>213</div>
                        <div>3</div>
                        <div>axasdasd</div>
                        <div>231</div>
                        <div>jjjjj</div>
                        <div>xcbnn</div>
                        <div>sdfasdf</div>
                        <div>qqwweq</div>
                        <div>cvcxvxcv</div>
                        <div>sdfbx</div>
                        <div>dfsdsf</div>
                        <div> vxcv</div>
                        <div>hfgjh</div>
                        <div>3werwesr</div>
                        <div>dfg3ee</div>
                        <div>sdfgsd</div>
                        <div>sdfvv</div>
                        <div>vbdfdfg</div>
                        <div>rsdfsdfsdf</div>
                    </div>
                </div>
                <div onClick={ this.lookMore } className='btn' style={{ backgroundImage: `url(${require('@/assets/img/scroll_info/btn.png')})` }}>查看更多</div>
                {
                    this.state.moreShow ? (
                        <div className='more lb-flipInRight'>
                            <div className='title ty_flex theme_bg'>
                                {
                                    this.state.moreList.map((item, index)=> (
                                        <div onClick={ ()=> this.moreModify(item.id) } key={ index } className={`list ${this.state.moreId === item.id ? 'ScrollInfo_more_active' : ''}`}>{ item.title }</div>
                                    ))
                                }
                                <img onClick={ this.moreClose } className='close' src={ require('@/assets/img/common/close.png') } alt=""/>
                            </div>
                            <div className='more_main'>
                                {
                                    this.state.moreCurDetail.map((item, index)=> (
                                        <div style={{ backgroundColor: index%2 === 0 ? 'white' : 'rgb(235,238,243)' }} key={ index } className='list ty_flex'>
                                            <div className='m_left ty_flex'>
                                                <img src={ require('@/assets/img/scroll_info/plane.png') } alt=""/>
                                                <div>{ item.airport }</div>
                                            </div>
                                            <div className='m_right ty_flex'>{ item.text }</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : ''
                }
            </div>
            :
            <div onClick={ this.open } className='ScrollInfo_box theme_bg lb-rotateInNewspaper'>
                <span>《</span>
                <span style={{ marginLeft: '2px' }}>气象通告</span>
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
    close = ()=> { //整体关闭
        clearInterval(this.timing);
        this.timing = null;
        this.setState({ top: 0, show: false, moreShow: false, moreId: 'jcyj', moreCurDetail: [] });
    }
    open = async ()=> {
        await this.setState({ top: 0, show: true });
        this.interval();
    }
    pause = ()=> {
        clearInterval(this.timing);
        this.timing = null;
    }
    lookMore = async ()=> { //查看更多
        if(this.state.moreShow) {
            return false;
        }
        // await this.setState({ moreShow: true, moreId: 'jcyj', moreCurDetail: [] });
        await this.setState({ moreShow: true, moreId: 'jcyj' });
    }
    moreModify = async id=> {
        await this.setState({ moreId: id, moreCurDetail: [] });
    }
    moreClose = async ()=> { //关闭更多
        await this.setState({ moreShow: false, moreId: 'jcyj', moreCurDetail: [] });
    }
}

export default ScrollInfo