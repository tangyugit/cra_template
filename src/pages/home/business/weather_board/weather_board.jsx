import React, { Component } from 'react'
import '@/pages/home/business/weather_board/weather_board.less'

class WeatherBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skbw: true,
            gjyj: true,
            times: [
                { time: '15:50', A: '', B: '', C: '', D: '', E: '', F: '' },
                { time: '16:00', A: '', B: '', C: '2', D: '', E: '', F: '' },
                { time: '16:10', A: '', B: '', C: '2', D: '', E: '', F: '' },
                { time: '16:20', A: '', B: '', C: '2', D: '', E: '', F: '' },
                { time: '16:30', A: '', B: '', C: '2', D: '', E: '', F: '' },
                { time: '16:40', A: '', B: '', C: '2', D: '', E: '', F: '' },
                { time: '16:50', A: '', B: '', C: '2', D: '', E: '', F: '' },
                { time: '17:00', A: '', B: '', C: '', D: '', E: '', F: '' }
            ]
        };
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${require('@/assets/img/weather_board/bg.png')})` }} className='WeatherBoard'>
                <div className='weather'>
                    <div className='position_port ty_flex'>
                        <img src={ require('@/assets/img/weather_board/position.png') } alt=""/>
                        <div style={{ marginLeft: '9px' }}>广州白云机场</div>
                    </div>
                    <div className='time'>2020/02/13 08:00</div>
                    <div className='yz ty_flex'>
                        <div className='list_left_title'>云状</div>
                        <div style={{ paddingRight: '5px' }}>：</div>
                        <div className='list_left_text'>少云，云底高90m</div>
                    </div>
                    <div className='ldwd ty_flex'>
                        <div className='list_left_title'>露点温度</div>
                        <div style={{ paddingRight: '5px' }}>：</div>
                        <div className='list_left_text'>17℃</div>
                    </div>
                    <div className='njd ty_flex'>
                        <div className='list_left_title'>能见度</div>
                        <div style={{ paddingRight: '5px' }}>：</div>
                        <div className='list_left_text'>1300m</div>
                    </div>
                    <div className='xzhy ty_flex'>
                        <div className='list_left_title'>修正海压</div>
                        <div style={{ paddingRight: '5px' }}>：</div>
                        <div className='list_left_text'>1018hPa</div>
                    </div>
                    <div className='fsfx ty_flex'>
                        <div className='list_left_title'>风速风向</div>
                        <div style={{ paddingRight: '5px' }}>：</div>
                        <div className='list_left_text'>0m/s0°</div>
                    </div>
                    <div className='qxyxgl ty_flex'>
                        <div className='list_left_title'>气象影响概率</div>
                        <div style={{ paddingRight: '5px' }}>：</div>
                        <div className='list_left_text'>50%</div>
                    </div>
                    <img className='w_img' src={ require('@/assets/img/weather_board/weather.png') } alt=""/>
                    <div className='w_text'>多云</div>
                    <div className='w_tem'>18℃</div>
                </div>
                <div onClick={ this.skbw } className='tab_list'>
                    <span>机场实况报文</span>
                    {
                        this.state.skbw ?
                        <img src={ require('@/assets/img/weather_board/down.png') } alt=""/>
                        :
                        <img src={ require('@/assets/img/weather_board/up.png') } alt=""/>
                    }
                </div>
                {
                    this.state.skbw ? (
                        <div className='skbw'>
                            <div style={{ fontSize: '15px' }} className='list'>
                                <span>机场：ZGGG</span>
                                <span style={{ marginLeft: '40px' }}>观测时间： 2020/02/20 09:00(BJT)</span>
                            </div>
                            <div className='list'>
                                <span>地面风：</span>
                                <span>风向不定，风速：1m/s</span>
                            </div>
                            <div className='list'>
                                <span>能见度：</span>
                                <span>8000m</span>
                            </div>
                            <div className='list'>
                                <span>云：</span>
                                <span>漫天云，云底高1800m</span>
                            </div>
                            <div className='list'>
                                <span>温度：</span>
                                <span>16℃</span>
                            </div>
                            <div className='list'>
                                <span>露点：</span>
                                <span>11℃</span>
                            </div>
                            <div className='list'>
                                <span>修正海压：</span>
                                <span>1026hPa</span>
                            </div>
                            <div className='list'>
                                <span>无显著变化</span>
                            </div>
                        </div>
                    ) : ''
                }
                <div onClick={ this.gjyj } className='tab_list'>
                    <span>机场告警预警</span>
                    {
                        this.state.gjyj ?
                        <img src={ require('@/assets/img/weather_board/down.png') } alt=""/>
                        :
                        <img src={ require('@/assets/img/weather_board/up.png') } alt=""/>
                    }
                </div>
                {
                    this.state.gjyj ? (
                        <div>
                            <table className='tb'>
                                <tbody>
                                    <tr style={{ borderTop: '1px solid rgb(128,157,206)' }}>
                                        <td style={{ width: '107px', backgroundColor: 'rgb(1,30,89)', color: 'rgb(255,233,9)', fontSize: '16px', borderRight: '1px solid rgb(149,163,192)' }}>告警</td>
                                        <td style={{ backgroundColor: 'rgb(28,53,105)', borderRight: '1px solid rgb(149,163,192)' }}>导航点A</td>
                                        <td style={{ backgroundColor: 'rgb(28,53,105)', borderRight: '1px solid rgb(149,163,192)' }}>导航点B</td>
                                        <td style={{ backgroundColor: 'rgb(28,53,105)', borderRight: '1px solid rgb(149,163,192)' }}>导航点C</td>
                                        <td style={{ backgroundColor: 'rgb(28,53,105)', borderRight: '1px solid rgb(149,163,192)' }}>导航点D</td>
                                        <td style={{ backgroundColor: 'rgb(28,53,105)', borderRight: '1px solid rgb(149,163,192)' }}>导航点E</td>
                                        <td style={{ backgroundColor: 'rgb(28,53,105)' }}>导航点F</td>
                                    </tr>
                                    {
                                        this.state.times.map((item, index)=> (
                                            <tr key={ index }>
                                                <td style={{ backgroundColor: 'rgb(30,55,105)', borderTop: '1px solid rgb(173,194,219)', borderRight: '1px solid rgb(173,194,219)' }}>
                                                    <div className='td_con'>{ item.time }</div>
                                                </td>
                                                <td style={{ backgroundColor: 'rgb(81,222,136)', borderTop: index === 0 ? '1px solid rgb(173,194,219)' : '1px solid rgb(64,93,146)', borderRight: '1px solid rgb(64,93,146)' }}>
                                                    <div className='td_con'></div>
                                                </td>
                                                <td style={{ backgroundColor: 'rgb(81,222,136)', borderTop: index === 0 ? '1px solid rgb(173,194,219)' : '1px solid rgb(64,93,146)', borderRight: '1px solid rgb(64,93,146)' }}>
                                                    <div className='td_con'></div>
                                                </td>
                                                <td style={{ backgroundColor: 'rgb(255,233,9)', borderTop: index === 0 ? '1px solid rgb(173,194,219)' : '1px solid rgb(64,93,146)', borderRight: '1px solid rgb(64,93,146)' }}>
                                                    <div className='td_con'>
                                                        <img src={ require('@/assets/img/weather_board/icon2.png') } alt=""/>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: 'rgb(252,40,59)', borderTop: index === 0 ? '1px solid rgb(173,194,219)' : '1px solid rgb(64,93,146)', borderRight: '1px solid rgb(64,93,146)' }}>
                                                    <div className='td_con'>
                                                        <img src={ require('@/assets/img/weather_board/icon1.png') } alt=""/>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: 'rgb(81,222,136)', borderTop: index === 0 ? '1px solid rgb(173,194,219)' : '1px solid rgb(64,93,146)', borderRight: '1px solid rgb(64,93,146)' }}>
                                                    <div className='td_con'></div>
                                                </td>
                                                <td style={{ backgroundColor: 'rgb(81,222,136)', borderTop: index === 0 ? '1px solid rgb(173,194,219)' : '1px solid rgb(64,93,146)' }}>
                                                    <div className='td_con'></div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : ''
                }
            </div>
        )
    }
    skbw = async ()=> { //实况报文展开收缩
        await this.setState({ skbw: !this.state.skbw });
    }
    gjyj = async ()=> { //告警预警展开收缩
        await this.setState({ gjyj: !this.state.gjyj });
    }
}

export default WeatherBoard