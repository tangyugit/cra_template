import React, { Component } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import routes from '@/router/home'
import ErrorPage from '@/components/error/error'
import ScrollInfo from '@/components/scroll_info/scroll_info'

class App extends Component {
	render() {
		let isLogin = true;
		return (
			<div className='Home'>
				<ScrollInfo />
				<HashRouter>
					<Switch>
						{/* 根据每条路由信息的auth字段判断当前路由是否需要拦截，
							若以拦截，把当前路由通过Redirect的state传递到登录页面，
							登陆成功，登录界面使用this.props.location.state.from.pathname回跳重定向之前的页面 */}
						{
							routes.map((item, index)=> (
								<Route exact key={ index } path={ item.path } render={ props=> (
									!item.auth ? 
									<item.component { ...props } />
									:
									(
										isLogin ? 
										<item.component { ...props } />
										:
										<Redirect to={{
											pathname: '/login',
											state: { from: props.location }
										}} />
									)
								) } />
							))
						}
						{/* 匹配不到的路由，显示错误页面 */}
						<Route component={ ErrorPage } />
					</Switch>
				</HashRouter>
			</div>
		)
	}
}

export default App