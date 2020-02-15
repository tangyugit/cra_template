import React, { Component } from 'react'
import '@/pages/dlyb/business/index/index.less'
import Header from '@/components/header/header'
import SplitPicture from '@/components/split_picture/split_picture'
import { Button } from 'antd'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            splitImg: [
                { src: require('@/assets/img/test_img/2.jpg'), time: '0120-0208' },
                { src: require('@/assets/img/test_img/bg.jpg'), time: '0220-0308' },
                { src: require('@/assets/img/test_img/login_bg.jpg'), time: '0320-0408' },
                { src: require('@/assets/img/test_img/1.jpg'), time: '0420-0508' }
            ],
            postageImg: [
                { src: require('@/assets/img/test_img/2.jpg'), time: '0120-0208' },
                { src: require('@/assets/img/test_img/bg.jpg'), time: '0220-0308' },
                { src: require('@/assets/img/test_img/login_bg.jpg'), time: '0320-0408' },
                { src: require('@/assets/img/test_img/1.jpg'), time: '0420-0508' },
                { src: require('@/assets/img/test_img/3.jpg'), time: '0620-0708' },
                { src: require('@/assets/img/test_img/4.jpg'), time: '0720-0808' }
            ],
            type: 'split'
        };
    }
    render() {
        return (
            <div className='Index'>
                <Header id='dlyb' />
                <div className='split_test'>
                    <Button onClick={ async ()=> await this.setState({ type: 'split' }) } type="primary">四分屏显示</Button>
                    <Button onClick={ async ()=> await this.setState({ type: 'postage' }) } type="primary">邮票图显示</Button>
                    <SplitPicture type={ this.state.type } splitImg={ this.state.splitImg } postageImg={ this.state.postageImg } />
                </div>
            </div>
        )
    }
}

export default Index