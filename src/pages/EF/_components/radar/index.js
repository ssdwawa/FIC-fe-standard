import React from 'react';
import './index.scss';
const echarts = window.echarts
class Radar extends React.Component {
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

		//Chart point 点击事件
		myChart.on('click', (params) => {
			console.log(params)
		});

	}

	handleChartData(store) {
		//数据初始化
		let chartData = store.RadarData
		//Chart配置参数
		this.option = {
			color: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2'],
			tooltip: {},
			legend: {
				data: ["组合 2185",
					'组合 1883','当前组合'],
				bottom:'30%',
				right: '5%',
				orient: 'vertical'
			},
			radar: {
				// shape: 'circle',
				// name: {
				// 	textStyle: {
				// 		color: '#999',
				// 		padding: [3, 5]
				// 	}
				// },
				grid: {
					top: '20%',
					containLabel: true
				},
				indicator: [
					{
						"max": 0.1043626152,
						"name": "资产负债匹配"
					},
					{
						"max": 0.1054450776,
						"name": "收益"
					},
					{
						"max": 0.11728578239999998,
						"name": "经济资本"
					},
					{
						"max": 0.1554068364,
						"name": "波动性"
					},
					{
						"max": 1.2305326008,
						"name": "流动性"
					}
				],
				splitArea: {
					show: false
				}
			},
			series: [{
				type: 'radar',
				// areaStyle: {normal: {}},
				data: [
					{
						"name":"组合 2185",
						"value": [
						  0.086968846,
						  0.087870898,
						  0.097738152,
						  0.122585595,
						  0.871587868
						]
					  },
					  {
						"name": "组合 1883",
						"value": [
						  0.001616732,
						  -0.000437098,
						  0.00562947,
						  0.129505697,
						  1.025443834
						]
					  },
					  {
						"name": "当前组合",
						"value": [
						  0.008727204,
						  0.013454351000000002,
						  0.009253503,
						  0.121782899,
						  0.9681617770000001
						]
					  }
				]
			}]
		};
	}

	render() {
		return (
			<div id={this.props.id} style={{ height: this.props.height, width: this.props.width }}>

			</div>
		);
	}
}

export default Radar