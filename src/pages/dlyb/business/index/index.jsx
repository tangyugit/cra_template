import React, { Component } from 'react'
import '@/pages/dlyb/business/index/index.less'
import ScrollInfo from '@/components/scroll_info/scroll_info'
import Header from '@/components/header/header'
import LeftTab from '@/pages/dlyb/business/left_tab/left_tab'

class Index extends Component {
    render() {
        return (
            <div className='Index'>
                <Header id='dlyb' />
                <div className='mainx_box ty_flex'>
                    <LeftTab />
                </div>
                <div className='index_bottom theme_bg lb-moveFromBottom'></div>
                <ScrollInfo />
            </div>
        )
    }
}

export default Index