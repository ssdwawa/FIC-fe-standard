import React from 'react';
import './index.scss';
const echarts = window.echarts
class StackBar extends React.Component {
	constructor(props) {
		super(props)
		this.option = undefined;
		this.initOption = undefined
	};

	componentDidMount() {
		//首图绘制，数据初始化
		const store = this.props.store
		const myChart = echarts.init(document.getElementById(this.props.id));
		this.handleChartData(store)

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(this.option);
		this.initOption = this.option

		//Chart point 点击事件
		myChart.on('mouseover', (params) => {
			// myChart.setOption(this.initOption);
			this.renderBarColor(params.seriesName)
			myChart.setOption(this.option);
		});

		myChart.on('mouseout', (params) => {
			this.clearrBarColor()
			myChart.setOption(this.option);
		});

	}

	renderBarColor(seriesName) {
		const arry = this.option.series
		arry.map((v) => {
			if (v.name === seriesName) {
				v.itemStyle = {
					opacity: '1'
				}
			}
			else{
				v.itemStyle = {
					opacity: '0.5'
				}
			}

		})
		this.option.series = arry
	}

	clearrBarColor() {
		const arry = this.option.series
		arry.map((v) => {
			v.itemStyle = {
				opacity: '1'
			}
		})
		this.option.series = arry
	}


	handleChartData(store) {
		//数据初始化
		let chartData = store.StackBar_3
		console.log(chartData)
		//Chart配置参数
		this.option = {
			tooltip : {
				trigger: 'axis',
				position: function (point, params, dom, rect, size) {
					// 固定在顶部
					return [point[0], '30%'];
				},
			},
			color:['#1890FF','#2FC25B','#FACC14','#223273','#8543E0','#13C2C2'],
			legend: {
				data: ['组合 1883', '组合 2185' , '当前组合']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				axisLine:{
					lineStyle:{
						color:'#999'
					}
				}
			},
			yAxis: {
				type: 'category',
				data: ['组合 1883', '组合 2185','当前组合'],
				axisLine:{
					lineStyle:{
						color:'#999'
					}
				}
			},
			series: chartData.data.series
		};
	}

	render() {
		return (
			<div id={this.props.id} style={{ height: this.props.height, width: this.props.width , margin: '0 auto' }}>

			</div>
		);
	}
}

export default StackBar