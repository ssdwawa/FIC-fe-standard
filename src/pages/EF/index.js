import React from 'react';
import { Router, Route, } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import './index.scss';
import EF from 'mockData/EF.json';
import Header from 'components/header';
import Radar from './_components/radar';
import ScaleSingle from './_components/scaleSingle'
import Scale from './_components/scale';
import StackBar from './_components/stackBar';
import StackBarSub from './_components/stackBar_sub';
import StackBarTri from './_components/stackBar_tri';
import EfficientFrontierChart from './_components/efficientFrontierChart/index';

@inject('EffectFornt')
@observer
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsed: false,
			current: '1',
			ani_bar_data: undefined,
			large_area_chart: undefined,
			large_scatter_chart: undefined
		};
	};

	componentDidMount() {
		// this.props.EffectFornt.loadEfficientFrontierData()
		// this.props.EffectFornt.loadDragChartData()
	}

	render() {
		// let { effectForentData, dragChartData } = this.props.EffectFornt

		// upload param set

		return (
			<div className="home-wrap">
				{/* <Header /> */}
				<div >
					{/* {effectForentData && dragChartData && */}
						<div className="chart-fake">
							<Route path="/" render={
								() =>
									<EfficientFrontierChart id="EfficientFrontierChart"
										width='110vw' height='88vh' top='-4vh'
										store={EF}
									/>} />
						</div>
					// }

				</div>
			</div>
		)
	}
}

export default Home

