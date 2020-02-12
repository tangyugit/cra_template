import React, { Component } from 'react'
import '@/pages/home/business/index/index.less'
import Header from '@/components/header/header'
import ImageTool from '@/components/image_tool/image_tool'

class Index extends Component {
    render() {
        return (
            <div className='Index'>
                <Header id='home' />
                <div className='image_test'>
                    <ImageTool />
                </div>
            </div>
        )
    }
}

export default Index