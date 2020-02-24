import React, { Component } from 'react'
import '@/pages/home/business/tab_image/tab_image.less'
import ImageTool from '@/components/image_tool/image_tool'

class TabImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curId: 'ldskpt',
            cyqxcpList: [
                { id: 'ldskpt', name: '雷达实况拼图' },
                { id: 'ldhbwt', name: '雷达回波外推' },
                { id: 'ldhbyb', name: '雷达回波预报' },
                { id: 'jcldcp', name: '机场雷达产品' },
                { id: 'hwsd', name: '红外+闪电' },
                { id: 'kjgsd', name: '可见光+闪电' },
                { id: 'jsyb', name: '3小时降水预报' }
            ],
            cyfbcp: [
                { id: 'mdrs', name: 'MDRS通报表' },
                { id: 'ppt', name: '会商PPT' }
            ],
            testSrc: require('@/assets/img/test_img/2.jpg')
        };
    }
    render() {
        return (
            <div className='TabImage'>
                <div className='tabs ty_flex'>
                    <div className='title'>常用气象产品：</div>
                    {
                        this.state.cyqxcpList.map((item, index)=> (
                            <div onClick={ ()=> this.tabModify(item) } key={ index } className={`tab_list ${this.state.curId === item.id ? 'TabImage_active theme_bg' : ''}`}>{ item.name }</div>
                        ))
                    }
                </div>
                <div className='tabs ty_flex'>
                    <div className='title'>常用发布产品：</div>
                    {
                        this.state.cyfbcp.map((item, index)=> (
                            <div onClick={ ()=> this.tabModify(item) } key={ index } className={`tab_list ${this.state.curId === item.id ? 'TabImage_active theme_bg' : ''}`}>{ item.name }</div>
                        ))
                    }
                </div>
                {/* 图片展示区域 */}
                <div className='image_box'>
                    <div className='title_time'>2020年02月13日 10:00:00BJT</div>
                    <div className='box_con ty_flex'>
                        <div className='img_box'>
                            <ImageTool src={ this.state.testSrc } prev={()=> console.log('prev')} next={()=> console.log('next')} interval={()=> console.log('interval')} />
                        </div>
                        <div className='info'>
                            <div className='item'>基本反射率</div>
                            <div className='item_list'>
                                <span>雷达站名： </span>
                                <span>广州</span>
                            </div>
                            <div className='item_list'>
                                <span>观测日期： </span>
                                <span>2020-02-15</span>
                            </div>
                            <div className='item_list'>
                                <span>观测时间： </span>
                                <span>10:00:00BJT</span>
                            </div>
                            <div className='item_list'>
                                <span>数据范围： </span>
                                <span>230KM</span>
                            </div>
                            <div className='item_list'>
                                <span>显示仰角： </span>
                                <span>0.5/1.5/2.4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    tabModify = async ({ id })=> { //Tab切换
        await this.setState({ curId: id });
    }
}

export default TabImage