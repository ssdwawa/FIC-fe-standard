import React from 'react';
import echarts from 'echarts';
class HeatMap extends React.Component {
	constructor(props) {
		super(props)
		this.option = undefined
	};

	
	componentDidMount() {
		const myChart = echarts.init(document.getElementById('HeatMap'));
		this.handleChartData(this.props.data)
		console.log(this.option)
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(this.option);
	}
	

	handleChartData(props) {
		console.log(props)
		//Chart配置参数
		this.option = {
			series: [
				{
					type:'treemap',
					data:props,
					breadcrumb:{
						show:false
					}
				}
			]
		};
	}

	render() {
		return (
			<div id='HeatMap'>

			</div>
		);
	}
}

export default HeatMap