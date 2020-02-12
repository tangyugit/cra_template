import React, { Component } from 'react'
import '@/components/header/header.less'
import ThemePicker from '@/components/theme_picker/theme_picker'

class Header extends Component {
    constructor(props) {
        super(props);
        this.tabList = [
            { id: 'home', item: '首页', path: '/home.html' },
            { id: 'dlyb', item: '对流预报', path: '/dlyb.html' },
            { id: 'hszz', item: '会商制作', path: '/hszz.html' },
            { id: 'xtgl', item: '系统管理', path: '/xtgl.html' }
        ];
    }
    render() {
        return (
            <div className='Header theme_bg'>
                <div className='ty_flex'>
                    {
                        this.tabList.map((item, index)=> (
                            <div onClick={()=> this.jumpUrl(item)} key={ item.id } className={`tab_list ${ item.id === this.props.id ? 'tab_list_active' : '' }`}>{ item.item }</div>
                        ))
                    }
                </div>
                <div className='test'>
                    <span>主题</span>
                    <ThemePicker />
                </div>
            </div>
        )
    }
    jumpUrl = ({ path })=> {
        window.location.replace(`${process.env.REACT_APP_HOST_PORT}${path}`);
    }
}

export default Header