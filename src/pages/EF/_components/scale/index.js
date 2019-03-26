import React from 'react';
import './index.scss';
const echarts = window.echarts
class ScaleChart extends React.Component {
	constructor(props) {
		super(props)
		this.option = undefined
	};

	componentDidMount() {
		//首图绘制，数据初始化
		const store = this.props.store
		const myChart = echarts.init(document.getElementById(this.props.id));
		this.handleChartData(store)

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(this.option);

		myChart.dispatchAction({
			type: 'brush',
			areas: [
				{
					brushType: 'lineX',
					coordRange: ['Mon', 'Thu'],
					xAxisIndex: 0
				}
			]
		});

		//右键点击打开配置菜单
		myChart.getZr().on('dblclick', () => {

		});
	}

	handleChartData(store) {
		//数据初始化
		let chartData = store.dragChartData
		//Chart配置参数
		this.option = {
			color: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2'],
			tooltip: {
				trigger: 'axis',
				axisPointer:{
					type:'line',
					axis :'x'
				}
			},
			xAxis: {
				axisLine:{
					lineStyle:{
						color:'#999'
					}
				}
			},
			yAxis: {
				axisLine:{
					lineStyle:{
						color:'#999'
					}
				}
			},
			grid: {
				left: '0',
				right: '1%',
				top: '1%',
				containLabel: true
			},
			legend: {
				bottom:'2%',
				left:'0%',
			},
			series: [
				{
					name: '组合 2185',
					type: 'line',
					smooth: true,
					symbol: 'none',
					sampling: 'average',
					data: chartData[0].series.data,
				},
				{
					name: '组合 1883',
					type: 'line',
					smooth: true,
					symbol: 'none',
					sampling: 'average',
					data: chartData[1].series.data,
				},
				{
					name: '当前组合',
					type: 'line',
					smooth: true,
					symbol: 'none',
					sampling: 'average',
					data: chartData[2].series.data,
				}
			],
			
		};
	}


	render() {
		return (
			<div>
				<div id={this.props.id} style={{ height: this.props.height, width: this.props.width ,  margin: '0 auto'}}>

				</div>
			</div>

		);
	}
}

export default ScaleChart