import React, { Component } from 'react'
import '@/components/header/header.less'

class Header extends Component {
    constructor(props) {
        super(props);
        this.tabList = [
            { id: 'home', item: '首页', path: '/home.html' },
            { id: 'dlyb', item: '短临预报', path: '/dlyb.html' },
            { id: 'tqjj', item: '天气讲解', path: '/tqjj.html' },
            { id: 'xtgl', item: '系统管理', path: '/xtgl.html' }
        ];
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${require('@/assets/img/header/bg.png')})` }} className='Header theme_bg'>
                <img className='logo' src={ require('@/assets/img/header/logo.png') } alt=""/>
                <div className='hbox ty_flex'>
                    <div className='title'>中南空管局对流预警预报系统</div>
                    <div className='w_tabs ty_flex'>
                        {
                            this.tabList.map((item, index)=> (
                                <div onClick={()=> this.jumpUrl(item)} key={ item.id } className={`tab_list ${ item.id === this.props.id ? 'tab_list_active theme_fc' : '' }`}>{ item.item }</div>
                            ))
                        }
                    </div>
                    <div className='user'>
                        <div className='bg'></div>
                    </div>
                </div>
            </div>
        )
    }
    jumpUrl = ({ path })=> {
        window.location.replace(`${process.env.REACT_APP_HOST_PORT}${path}`);
    }
}

export default Header