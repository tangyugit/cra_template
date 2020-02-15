import React, { Component } from 'react'
import '@/components/split_picture/split_picture.less'

class SplitPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            largeImageShow: false, //大图查看显示
            largeImageIndex: null, //大图对应邮票图下标
        };
    }
    render() {
        return (
            <div className='SplitPicture'>
                {/* 四分屏图 */}
                {
                    this.props.type === 'split' ? (
                        <div className='split ty_flex'>
                            {
                                this.props.splitImg.map((item, index)=> (
                                    <div key={ index } style={{ backgroundImage: `url(${item.src})` }} className='split_list'>
                                        <div className='split_list_time'>{ item.time }</div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : ''
                }
                {/* 邮票图 */}
                {
                    this.props.type === 'postage' ? (
                        <div className='postage ty_flex'>
                            {
                                this.props.postageImg.map((item, index)=> (
                                    <div onClick={ ()=> this.seeLargeImage(index) } key={ index } className='postage_list ty_flex'>
                                        <img src={ item.src } alt=""/>
                                        <div className='postage_list_time'>{ item.time }</div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : ''
                }
                {/* 放大查看 */}
                {
                    this.state.largeImageShow ? (
                        <div className='lookLarge'>
                            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className='lookLarge_box lb-flipInRight'>
                                    <div className='lookLarge_title theme_bg'>
                                        <span>{ this.props.postageImg[this.state.largeImageIndex].time }</span>
                                        <img onClick={ this.closeLargeImage } className='close' src={ require('@/assets/img/common/close.png') } alt=""/>
                                    </div>
                                    <div className='show_box'>
                                        <img className='show_box_con' src={ this.props.postageImg[this.state.largeImageIndex].src } alt=""/>
                                        <div onClick={ this.turnLeft } className='left'>
                                            <img style={{ left: '2px' }} className='show_box_jump' src={ require('@/assets/img/common/left.png') } alt=""/>
                                        </div>
                                        <div onClick={ this.turnRight } className='right'>
                                            <img style={{ right: '2px' }} className='show_box_jump' src={ require('@/assets/img/common/right.png') } alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        )
    }
    seeLargeImage = async index=> { //查看大图
        await this.setState({ largeImageIndex: index, largeImageShow: true });
    }
    closeLargeImage = async ()=> { //关闭大图
        await this.setState({ largeImageIndex: null, largeImageShow: false });
    }
    turnLeft = async ()=> { //预览上一张
        await this.setState({
            largeImageIndex: this.state.largeImageIndex - 1 < 0 ? this.props.postageImg.length - 1 : this.state.largeImageIndex - 1
        });
    }
    turnRight = async ()=> { //预览下一张
        await this.setState({
            largeImageIndex: this.state.largeImageIndex + 1 === this.props.postageImg.length ? 0 : this.state.largeImageIndex + 1
        });
    }
}

export default SplitPicture