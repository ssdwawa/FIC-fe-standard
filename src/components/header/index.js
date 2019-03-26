import React from 'react';
import { observer, inject } from 'mobx-react';

import './index.scss';

@inject('HeaderAndFooter')
@observer
class Header extends React.Component {
	constructor(props) {
		super(props)
	};


	render() {

		return (
			<div className="Header-wrap">
				<div className="content">
					<p className="logo-wrap font-h1">
						资产配置管理系统  | <span>平安集团</span> 
					</p>
				</div>
			</div>
		);
	}
}

export default Header