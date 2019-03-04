import React from 'react';
import {
	Layout, Menu, Breadcrumb, Icon,
} from 'antd';


import './index.scss';

const {
	Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsed: false,
			current: '1',
		};
	};

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	handleClick = (e) => {
		this.setState({
			current: e.key,
		});
	}

	render() {
		return (
			<div className="home-wrap">
				<Layout style={{ minHeight: '100vh' }}>
					<Sider
						collapsible
						collapsed={this.state.collapsed}
						onCollapse={this.onCollapse}
					>
						<div className="logo" >Chart Demo</div>
						<Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={[this.state.current]} mode="inline" onClick={this.handleClick}>
							<Menu.Item key="1">
								<Icon type="pie-chart" />
								<span>pie-chart</span>
							</Menu.Item>
							<Menu.Item key="2">
								<span>Option 2</span>
							</Menu.Item>
							<Menu.Item key="3">
								<span>File</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						<Content style={{ margin: '0 16px' }}>
							<div style={{ marginTop: '16px', padding: 24, background: '#fff', height: '88vh' }}>

							</div>
						</Content>
						<Footer style={{ textAlign: 'center' }}>
							Created by AlgoGraphics
			  </Footer>
					</Layout>
				</Layout>
			</div>

		);
	}
}

export default Home