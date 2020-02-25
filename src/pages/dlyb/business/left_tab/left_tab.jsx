import React, { Component } from 'react'
import '@/pages/dlyb/business/left_tab/left_tab.less'

class LeftTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [
                { name: 'GIS分析' },
                { name: '图片分析' },
                { name: '剖面分析' },
                { name: '站点预报' },
                { name: '概率预报' },
                { name: '预报检验' },
            ]
        };
    }
    render() {
        return (
            <div className='LeftTab lb-moveFromLeft'>
                {
                    this.state.tabList.map((item, index)=> (
                        <div key={ index } className='tab_list'>
                            <div>{ item.name }</div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default LeftTab