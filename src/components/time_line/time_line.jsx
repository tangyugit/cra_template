import React, { Component } from 'react'
import '@/components/time_line/time_line.less'
import moment from 'moment'

/*
** 父组件调用init();
** hours: 总范围小时数，单位：h
** timeSpace: 每个单位间隔，单位：min
** startTime：起始时间，new Date()
** curTime: 当前位置时间，new Date()
** 回调：getTimes(res)，获取时间数组，当前时间
*/

class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.param = null;      //父组件调用传参
        this.timing = null;     //页面定时器
        this.state = {
            play: false,        //播放暂停标识
            timeArr: [],        //显示的时间数组
            momentArr: [],      //时刻时间数组
            curPosition: 0,     //时间条位置百分比
            text_time: '--',    //当前显示时间
            chartsOpen: false,  //默认不展开charts图
        };
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    render() {
        return (
            <div className='TimeLine theme_bg'>
                <div className='box ty_flex'>
                    {/* 功能集合 */}
                    <div className='time_line_left ty_flex'>
                        <div onClick={ this.left } style={{ backgroundImage: `url(${ require('@/assets/img/image_tools/houtui.png') })` }} className='list' title='后退'></div>
                        {
                            this.state.play ?
                            <div onClick={ this.pause } style={{ backgroundImage: `url(${ require('@/assets/img/image_tools/zanting.png') })` }} className='list' title='暂停'></div>
                            :
                            <div onClick={ this.play } style={{ backgroundImage: `url(${ require('@/assets/img/image_tools/bofang.png') })` }} className='list' title='播放'></div>
                        }
                        <div onClick={ this.right } style={{ backgroundImage: `url(${ require('@/assets/img/image_tools/qianjin.png') })` }} className='list' title='前进'></div>
                        {
                            this.state.chartsOpen ?
                            <div onClick={ this.closeCharts } style={{ backgroundImage: `url(${ require('@/assets/img/common/shousuo.png') })` }} className='list' title='收缩'></div>
                            :
                            <div onClick={ this.openCharts } style={{ backgroundImage: `url(${ require('@/assets/img/common/zhankai.png') })` }} className='list' title='展开'></div>
                        }
                    </div>
                    {/* 时间条内容 */}
                    <div className='con'>
                        {/* 时间显示dom */}
                        <div className='times ty_flex'>
                            {
                                this.state.timeArr.map((item, index)=> (
                                    <div onClick={ ()=> this.timingClick(index) } key={ index } className='timeShow'>
                                        <span>{ item }</span>
                                        <img src={ require('@/assets/img/common/xia.png') } alt=""/>
                                    </div>
                                ))
                            }
                        </div>
                        {/* charts图内容 */}
                        <div style={{ height: `${this.state.chartsOpen ? '200' : '26'}px` }} onClick={ this.lineClick } className='charts'>
                            charts区域预留
                        </div>
                        {/* 时间条 */}
                        <div onClick={ this.lineClick } className='time_line_box'>
                            <div style={{ width: this.state.curPosition }} className='cur_line'></div>
                            {/* 拖拽点 */}
                            <div onMouseDown={ this.drag } style={{ left: this.state.curPosition, height: `${this.state.chartsOpen ? '206' : '32'}px` }} className='time_line_point'>
                                <div className='bt_line'></div>
                                <div style={{ backgroundImage: `url(${ require('@/assets/img/common/xia.png') })` }} className='bottom_img'></div>
                            </div>
                        </div>
                        {/* 单独展示时间，内容 */}
                        <div style={{ left: this.state.curPosition }} className='time_text theme_bg'>
                            <div className='list'>{ this.state.text_time }</div>
                            <img src={ require('@/assets/img/common/xia.png') } alt=""/>
                        </div>
                    </div>
                    <div style={{ width: '50px' }}></div>
                </div>
            </div>
        )
    }
    init = async param=> { //组件初始化
        this.reset();
        this.param = param;
        let { hours, timeSpace, startTime, curTime } = this.param; //调用参数
        let timeArr = [], momentArr = [], curPosition = 0, text_time = '';
        curPosition = `${(((curTime.getTime() - startTime.getTime()) / (hours*60*60*1000))*100).toString()}%`;
        text_time = `${moment(new Date(curTime)).format('MM')}-${moment(new Date(curTime)).format('DD')} ${moment(new Date(curTime)).format('HH')}:${moment(new Date(curTime)).format('mm')}`;
        for(let i=0, len=hours*60/timeSpace + 1; i<len; i++) {
            let cur = startTime.getTime() + i*timeSpace*60*1000;
            timeArr.push(`${moment(new Date(cur)).format('HH')}:${moment(new Date(cur)).format('mm')}`);
            momentArr.push(cur);
        }
        await this.setState({ timeArr, momentArr, curPosition, text_time });
    }
    reset = async ()=> { //状态重置
        this.param = null;
        this.timing = null;
        await this.setState({ play: false, timeArr: [], momentArr: [], curPosition: 0, text_time: '--', chartsOpen: false });
    }
    left = async ()=> { //后退
        this.pause();
        let { hours, timeSpace } = this.param; //调用参数
        let oneSpace = ((timeSpace*60*1000) / (hours*60*60*1000)) * 100,
            curPercent = parseFloat(this.state.curPosition);
        let curPosition = curPercent - oneSpace;
        if(curPosition < 0) {
            curPosition = 100 + curPosition;
        }
        await this.setState({ curPosition: `${curPosition.toString()}%` });
        await this.setState({ text_time: this.getTextTime() });
        this.getTimes();
    }
    right = async ()=> { //前进
        this.pause();
        let { hours, timeSpace } = this.param; //调用参数
        let oneSpace = ((timeSpace*60*1000) / (hours*60*60*1000)) * 100,
            curPercent = parseFloat(this.state.curPosition);
        let curPosition = curPercent + oneSpace;
        if(curPosition > 100) {
            curPosition = curPosition - 100;
        }
        await this.setState({ curPosition: `${curPosition.toString()}%` });
        await this.setState({ text_time: this.getTextTime() });
        this.getTimes();
    }
    drag = e=> { //拖拽点事件
        this.pause();
        e.persist();
        let flag = true, click_x = e.clientX, ori_x = document.getElementsByClassName('time_line_point')[0].offsetLeft;
        document.onmousemove = async ev => {
            if(flag) {
                let move_x = ev.clientX - click_x,
                    left = ori_x + move_x;
                if(left < 0) {
                    left = 0;
                }
                if(left > document.getElementsByClassName('time_line_box')[0].clientWidth) {
                    left = document.getElementsByClassName('time_line_box')[0].clientWidth;
                }
                await this.setState({ curPosition: `${((left/document.getElementsByClassName('time_line_box')[0].clientWidth)*100).toString()}%` });
                await this.setState({ text_time: this.getTextTime() });
            }
        }
        document.onmouseup = ()=> {
            if(flag) {
                flag = false;
                document.onmousemove = null;
                document.onmouseup = null;
                this.getTimes();
            }
        }
    }
    lineClick = async e=> { //时间条点击
        this.pause();
        e.persist();
        // 拖拽时禁用click事件
        if(e.target.className === 'time_line_point' || e.target.className === 'bt_line' || e.target.className === 'bottom_img') {
            return false;
        }
        let left = e.pageX - document.getElementsByClassName('time_line_left')[0].clientWidth;
        await this.setState({ curPosition: `${((left/document.getElementsByClassName('time_line_box')[0].clientWidth)*100).toString()}%` });
        await this.setState({ text_time: this.getTextTime() });
        this.getTimes();
    }
    timingClick = async index=> { //具体时刻点击
        this.pause();
        let { hours, timeSpace } = this.param; //调用参数
        let percent = `${(((index*timeSpace*60*1000) / (hours*60*60*1000)) * 100).toString()}%`;
        await this.setState({ curPosition: percent });
        await this.setState({ text_time: this.getTextTime() });
        this.getTimes();
    }
    play = async ()=> { //播放
        await this.setState({ play: true });
        this.timing = setInterval(async ()=> {
            let curPercent = parseFloat(this.state.curPosition);
            let curPosition = curPercent + 0.5;
            if(curPosition > 100) {
                curPosition = curPosition - 100;
            }
            await this.setState({ curPosition: `${curPosition.toString()}%` });
            await this.setState({ text_time: this.getTextTime() });
            this.getTimes();
        }, 50);
    }
    pause = async ()=> { //暂停
        await this.setState({ play: false });
        clearInterval(this.timing);
        this.timing = null;
    }
    computedPosition = ()=> { //计算当前位置时间 new Date()类型
        let { hours, startTime } = this.param; //调用参数
        let cur = hours*60*60*1000*(parseFloat(this.state.curPosition)/100);
        return new Date(startTime.getTime() + cur);
    }
    getTextTime = ()=> { //获取当前显示的时间
        return `${moment(this.computedPosition()).format('MM')}-${moment(this.computedPosition()).format('DD')} ${moment(this.computedPosition()).format('HH')}:${moment(this.computedPosition()).format('mm')}`;
    }
    getTimes = ()=> { //获取时间回调
        this.props.getTimes({ momentArr: this.state.momentArr, curTime: this.computedPosition() });
    }
    openCharts = async ()=> { //展开charts图
        if(this.state.chartsOpen) {
            return false;
        }
        await this.setState({ chartsOpen: true });
    }
    closeCharts = async ()=> { //收缩charts图
        if(!this.state.chartsOpen) {
            return false;
        }
        await this.setState({ chartsOpen: false });
    }
}

export default TimeLine