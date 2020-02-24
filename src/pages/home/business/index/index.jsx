import React, { Component } from 'react'
import '@/pages/home/business/index/index.less'
import Header from '@/components/header/header'
import WeatherBoard from '@/pages/home/business/weather_board/weather_board'
import TabImage from '@/pages/home/business/tab_image/tab_image'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <div className='Index'>
                <Header id='home' />
                <div className='mainx_box'>
                    <div className='main ty_flex'>
                        <div className='m_left'>
                            <TabImage />
                        </div>
                        <WeatherBoard />
                    </div>
                </div>
                <div className='index_bottom theme_bg lb-moveFromBottom'></div>
            </div>
        )
    }
}

export default Index