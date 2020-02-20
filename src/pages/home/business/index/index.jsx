import React, { Component } from 'react'
import '@/pages/home/business/index/index.less'
import Header from '@/components/header/header'
import WeatherBoard from '@/pages/home/business/weather_board/weather_board'

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
                <div style={{ margin: '20px 0 0 20px' }}>
                    <WeatherBoard />
                </div>
            </div>
        )
    }
}

export default Index