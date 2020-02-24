import React, { Component } from 'react'
import '@/components/image_tool/image_tool.less'
import { message, Slider } from 'antd'

/*
** @ params ==>props: 
** src: 当前图片路径
** prev: 上一张回调
** next: 下一张回调
** interval: 动画播放回调
*/

class ImageTool extends Component {
    constructor(props) {
        super(props);
        this.timing = null;     //播放定时器
        this.state = {
            isImgLoaded: false, //图片是否加载完成
            imgScale: null,     //图片宽高比
            level: 1,           //放大缩小等级
            maxLevel: 3,        //最大放大等级
            rate: 0.1,          //放大缩小倍率
            rotate: 1,          //旋转方向
            oriWidth: null,     //容器原始宽度
            oriHeight: null,    //容器原始高度
            innerWidth: null,   //比例缩小宽度
            innerHeight: null,  //比例缩小高度
            play: false,        //是否播放
            playSpeed: 50,      //播放速度
            maxSpeed: 100,      //最大播放速度
            minSpeed: 1,        //最小播放速度
            showAniClass: false,//底部动画类 
            imgCon: { width: '100%', height: '100%', top: 0, left: 0 },
            imgConCon: { width: '100%', height: '100%', top: 0, left: 0, marginTop: 0, marginLeft: 0, transform: 'rotate(0deg)' }
        };
    }
    render() {
        return (
            <div onMouseEnter={ async ()=> await this.setState({ showAniClass: true }) } onMouseLeave={ async ()=> await this.setState({ showAniClass: false }) } className='ImageTool'>
                <img id='ImageTool-img' style={{ display: 'none' }} onLoad={ this.imgOnLoad } src={ this.props.src } alt=""/>
                {
                    this.state.isImgLoaded ? 
                    (
                        <div onMouseDown={ this.drag } ref={ this.imageCon } style={{
                            width: this.state.imgCon.width,
                            height: this.state.imgCon.height,
                            top: this.state.imgCon.top,
                            left: this.state.imgCon.left
                        }} id='image-con'>
                            <div style={{ 
                                backgroundSize: this.state.imgScale < (this.state.oriWidth/this.state.oriHeight) ? 'auto 100%' : '100% auto',
                                backgroundImage: `url(${this.props.src})`,
                                width: this.state.imgConCon.width,
                                height: this.state.imgConCon.height,
                                top: this.state.imgConCon.top,
                                left: this.state.imgConCon.left,
                                marginTop: this.state.imgConCon.marginTop,
                                marginLeft: this.state.imgConCon.marginLeft,
                                transform: this.state.imgConCon.transform,
                            }} id='image-con-con'></div>
                        </div>
                    )
                    :
                    ''
                }
                <div className={ `bottom_tool ty_flex ${ this.state.showAniClass ? 'lb-moveFromBottom_cancel' : 'ty_hide_cancel' }` }>
                    <div onClick={ this.prev } className='funcs' title='上一张'><img src={ require('@/assets/img/image_tools/houtui.png') } alt=""/></div>
                    <div onClick={ this.next } className='funcs' title='下一张'><img src={ require('@/assets/img/image_tools/qianjin.png') } alt=""/></div>
                    <div onClick={ this.imageUp } className='funcs' title='放大'><img src={ require('@/assets/img/image_tools/enlarge.png') } alt=""/></div>
                    <div onClick={ this.imageDown } className='funcs' title='缩小'><img src={ require('@/assets/img/image_tools/reduce.png') } alt=""/></div>
                    <div onClick={ this.turnLeft } className='funcs' title='左旋'><img src={ require('@/assets/img/image_tools/xiangzuoxuanzhuan.png') } alt=""/></div>
                    <div onClick={ this.turnRight } className='funcs' title='右旋'><img src={ require('@/assets/img/image_tools/xiangyouxuanzhuan.png') } alt=""/></div>
                    <div onClick={ this.reset } className='funcs' title='重置'><img src={ require('@/assets/img/image_tools/zhongzhi-.png') } alt=""/></div>
                    <div onClick={ this.savePlay } className='funcs' title='动画下载'><img src={ require('@/assets/img/image_tools/download.png') } alt=""/></div>
                    <div onClick={ this.savePicture } className='funcs' title='保存图片'><img src={ require('@/assets/img/image_tools/picture.png') } alt=""/></div>
                    {
                        !this.state.play ? 
                        <div onClick={ this.play } className='funcs' title='播放'><img src={ require('@/assets/img/image_tools/bofang.png') } alt=""/></div>
                        :
                        <div onClick={ this.pause } className='funcs' title='暂停'><img src={ require('@/assets/img/image_tools/zanting.png') } alt=""/></div>
                    }
                    <div className='ty_flex' style={{ width: '200px', lineHeight: '40px' }}>
                        <div style={{ marginRight: '10px', color: 'white' }}>Speed: </div>
                        <Slider onChange={ speed=> this.setState({ playSpeed: speed }) } style={{ flex: 1 }} disabled={ this.state.play } defaultValue={ this.state.playSpeed } max={ this.state.maxSpeed } min={ this.state.minSpeed } />
                        <div style={{ marginLeft: '10px', color: 'white' }}>{ this.state.playSpeed }</div>
                    </div>
                </div>
            </div>
        )
    }
    imgOnLoad = ()=> { //图片加载完成回调
        this.setState({
            isImgLoaded: true,
            imgScale: document.getElementById('ImageTool-img').width/document.getElementById('ImageTool-img').height
        });
    }
    imageCon = async res=> { //获取容器dom
        if(res) {
            await this.setState({ oriWidth: res.clientWidth, oriHeight: res.clientHeight });
            await this.setState({ innerWidth: res.clientWidth/(res.clientWidth/res.clientHeight), innerHeight: res.clientHeight/(res.clientWidth/res.clientHeight) });
        }
    }
    drag = e=> { //拖拽事件
        e.persist();
        let flag = true,
            click_x = e.clientX,
            click_y = e.clientY,
            ori_x = document.getElementById('image-con').offsetLeft,
            ori_y = document.getElementById('image-con').offsetTop;
        document.onmousemove = async ev => {
            if(flag) {
                let move_x = ev.clientX - click_x,
                    move_y = ev.clientY - click_y,
                    left = ori_x + move_x,
                    top = ori_y + move_y;
                if(left > 0) {
                    left = 0;
                }else if(left < (this.state.oriWidth - this.state.oriWidth * this.state.level)) {
                    left = this.state.oriWidth - this.state.oriWidth * this.state.level;
                }
                if(top > 0) {
                    top = 0;
                }else if(top < (this.state.oriHeight - this.state.oriHeight * this.state.level)) {
                    top = this.state.oriHeight - this.state.oriHeight * this.state.level;
                }
                await this.setState({ imgCon: { width: this.state.imgCon.width, height: this.state.imgCon.height, top: top, left: left } });
            }
        }
        document.onmouseup = ()=> {
            if(flag) {
                flag = false;
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
    imageUp = async ()=> { //放大
        this.pause();
        if(this.state.level >= this.state.maxLevel){
            message.warning('已放至最大！');
        }else{
            await this.setState({ level: this.state.level + this.state.rate });
            this.upDownCommon();
        }
    }
    imageDown = async ()=> { //缩小
        this.pause();
        if(this.state.level <= 1){
            message.warning('已缩至最小！');
        }else{
            await this.setState({ level: this.state.level - this.state.rate });
            this.upDownCommon();
        }
    }
    upDownCommon = async ()=> { //放大缩小公共事件
        await this.setState({ imgCon: { width: `${this.state.oriWidth * this.state.level}px`, height: `${this.state.oriHeight * this.state.level}px`, left: `-${(this.state.oriWidth * this.state.level - this.state.oriWidth)/2}px`, top: `-${(this.state.oriHeight * this.state.level - this.state.oriHeight)/2}px` } });
        if(this.state.rotate === 1 || this.state.rotate === 3) { //正向逆向
            await this.setState({ imgConCon: { width: '100%', height: '100%', top: 0, left: 0, marginTop: 0, marginLeft: 0, transform: this.state.rotate === 1 ? 'rotate(0deg)' : 'rotate(180deg)' } });
        }else { //左旋右旋
            await this.setState({ imgConCon: { width: `${this.state.innerWidth * this.state.level}px`, height: `${this.state.innerHeight * this.state.level}px`, top: '50%', left: '50%', marginTop: `-${(this.state.innerHeight * this.state.level)/2}px`, marginLeft: `-${(this.state.innerWidth * this.state.level)/2}px`, transform: this.state.rotate === 2 ? 'rotate(90deg)' : 'rotate(-90deg)' } });
        }
    }
    turnRight = async ()=> { //右旋
        this.pause();
        await this.setState({ rotate: this.state.rotate + 1 });
        if(this.state.rotate === 5) {
            await this.setState({ rotate: 1 });
        }
        await this.setState({ level: 1 });
        this.rotateFuncs();
    }
    turnLeft = async ()=> { //左旋
        this.pause();
        await this.setState({ rotate: this.state.rotate - 1 });
        if(this.state.rotate === 0) {
            await this.setState({ rotate: 4 });
        }
        await this.setState({ level: 1 });
        this.rotateFuncs();
    }
    rotateFuncs = async ()=> { //左旋右旋公共方法
        await this.setState({ imgCon: { width: '100%', height: '100%', left: 0, top: 0 } });
        if(this.state.rotate === 1) { //正向
            await this.setState({ imgConCon : { width: '100%', height: '100%', top: 0, left: 0, marginTop: 0, marginLeft: 0, transform: 'rotate(0deg)' } });
        }else if(this.state.rotate === 2) { //右旋
            await this.setState({ imgConCon: { width: `${this.state.innerWidth}px`, height: `${this.state.innerHeight}px`, top: '50%', left: '50%', marginTop: `-${this.state.innerHeight/2}px`, marginLeft: `-${this.state.innerWidth/2}px`, transform: 'rotate(90deg)' } });
        }else if(this.state.rotate === 3) { //逆向
            await this.setState({ imgConCon : { width: '100%', height: '100%', top: 0, left: 0, marginTop: 0, marginLeft: 0, transform: 'rotate(180deg)' } });
        }else { //左旋
            await this.setState({ imgConCon: { width: `${this.state.innerWidth}px`, height: `${this.state.innerHeight}px`, top: '50%', left: '50%', marginTop: `-${this.state.innerHeight/2}px`, marginLeft: `-${this.state.innerWidth/2}px`, transform: 'rotate(-90deg)' } });
        }
    }
    prev = ()=> { //上一张
        this.pause();
        this.reset();
        this.props.prev();
    }
    next = ()=> { //下一张
        this.pause();
        this.reset();
        this.props.next();
    }
    play = async ()=> { //播放
        this.reset();
        await this.setState({ play: true });
        this.startPlay();
    }
    startPlay = ()=> { //循环开始
        this.timing = setInterval(()=> {
            this.props.interval();
        }, this.state.playSpeed * 20);
    }
    pause = async ()=> { //暂停
        await this.setState({ play: false });
        this.clearTiming();
    }
    clearTiming = ()=> { //清除定时器
        clearInterval(this.timing);
        this.timing = null;
    }
    savePlay = ()=> { //动画下载
        this.pause();
    }
    savePicture = ()=> { //保存图片
        this.pause();
    }
    reset = async ()=> {
        this.pause();
        await this.setState({
            imgCon: { width: '100%', height: '100%', top: 0, left: 0 },
            imgConCon: { width: '100%', height: '100%', top: 0, left: 0, marginTop: 0, marginLeft: 0, transform: 'rotate(0deg)' },
            rotate: 1,
            level: 1
        });
        message.success('图片已重置！');
    }
}

export default ImageTool