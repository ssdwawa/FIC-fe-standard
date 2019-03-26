import React from 'react';
import './index.scss';
const echarts = window.echarts
class ScaleSingle extends React.Component {
	constructor(props) {
		super(props)
		this.option = undefined
	};

	componentDidMount() {
		//首图绘制，数据初始化
		const store = this.props.store
		const myChart = echarts.init(document.getElementById(this.props.id));
		const areaData = store.dragChartData[0].series.return
		this.handleChartData(store)

		const fontData = this.calculate_metrics(areaData, 0, 1)

		this.option.graphic = [
			{
				type: 'text',
				z: 100,
				left: 690,
				top: '45%',
				style: {
					fill: '#333',
					text: [
						`${fontData[0].name} : ${fontData[0].value.toFixed(2)}`,
						`${fontData[1].name} : ${fontData[1].value.toFixed(2)}`
					].join('\n'),
					font: '14px Microsoft YaHei'
				}
			},
			{
				type: 'text',
				z: 100,
				left: 540,
				top: '50%',
				style: {
					fill: '#333',
					text: [
						0
					],
					font: '14px Microsoft YaHei'
				}
			},
			{
				type: 'text',
				z: 100,
				left: 930,
				top: '50%',
				style: {
					fill: '#333',
					text: [
						1
					],
					font: '14px Microsoft YaHei'
				}
			}
		]

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(this.option);

		myChart.dispatchAction({
			type: 'brush',
			areas: [
				{
					brushType: 'lineX',
					coordRange: [0, 1],
					xAxisIndex: 0
				}
			]

		});

		myChart.on('brushselected', (params) => {
			let postion = params.batch[0].areas[0].coordRange
			let range = params.batch[0].areas[0].range

			const fontData = this.calculate_metrics(areaData, postion[0], postion[1])

			if (postion[0] > -1.8 && postion[1] < 2.4) {
				this.option.graphic = [
					{
						type: 'text',
						z: 100,
						left: (range[0] + range[1]) / 2 - 50,
						top: '45%',
						style: {
							fill: '#333',
							text: [
								`${fontData[0].name} : ${fontData[0].value.toFixed(2)}`,
								`${fontData[1].name} : ${fontData[1].value.toFixed(2)}`
							].join('\n'),
							font: '14px Microsoft YaHei'
						}
					},
					{
						type: 'text',
						z: 100,
						left: range[0]-50,
						top: '50%',
						style: {
							fill: '#333',
							text: [
								postion[0].toFixed(2)
							],
							font: '14px Microsoft YaHei'
						}
					},
					{
						type: 'text',
						z: 100,
						left: range[1]+50,
						top: '50%',
						style: {
							fill: '#333',
							text: [
								postion[1].toFixed(2)
							],
							font: '14px Microsoft YaHei'
						}
					}
				]
				myChart.setOption(this.option);
			}

		});

		window.onresize = function () {
			myChart.resize();
		}
	}

	calculate_metrics(data, start, end) {
		var filtered_data = [];
		var sum = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i] <= end && data[i] > start) {
				filtered_data.push(data[i]);
				sum += data[i];
			}
		}

		const data_1 = { 'name': '区间均值', 'value': sum / filtered_data.length }
		const data_2 = { 'name': '区间概率', 'value': filtered_data.length / data.length }

		return [data_1, data_2]
	}

	handleChartData(store) {
		//数据初始化
		let chartData = store.dragChartData
		//Chart配置参数
		this.option = {
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
				left: '1%',
				right: '1%',
				top: '1%',
				containLabel: true
			},
			toolbox: {
				show: false,
				orient: 'vertical',
			},

			tooltip: {
				show: false,
				trigger: 'axis',
				axisPointer: {
					type: 'cross'
				}
			},

			brush: {
				xAxisIndex: 'all',
				brushLink: 'all',
				outOfBrush: {
					color: 'red'
				},
				z: 5,
			},

			series: [
				{
					type: 'line',
					smooth: true,
					symbol: 'none',
					sampling: 'average',
					itemStyle: {
						color: '#1890FF',

					},
					lineStyle: {
						opacity: 1
					},
					areaStyle: {
						color: '#1890FF',
						opacity: 0.1
					},
					data: chartData[0].series.data,
				},
				{
					name: 'test',
					type: 'scatter',
					itemStyle: {
						opacity: 0,
						color: 'rgb(255, 70, 131)'
					},
					data: chartData[0].series.data,
				}
			],
		};
	}

	render() {
		return (
			<div>
				<div id={this.props.id} style={{ height: this.props.height, width: this.props.width, margin: '0 auto' }}>

				</div>
			</div>

		);
	}
}

export default ScaleSingle