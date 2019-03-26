import React from 'react';
import { Slider, Menu, Button } from 'antd';
// import ecStat from 'ecStat';
import './index.scss';
import echarts from 'echarts';
import HeatMap from '../heatMap/index';

class EfficientFrontierChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: 'none',
			month: 4,
			clickCount: 0,
			marks: {
				0: '1个月',
				3: '3个月',
				6: '6个月',
				9: '9个月',
				12: '12个月',
				24: '第2年',
				36: '第3年',
			},
			HeatMapData:undefined
		}
		this.zoomValue = 8
		this.option = undefined
		this.ctrCount = false
		this.isPress = false
		this.choicePointArry = []
	};

	componentDidMount() {

		//滑轨初始化
		let tip = document.getElementsByClassName('ant-slider-handle')[0]

		tip.innerHTML = '12个月'

		//首图绘制，数据初始化
		const store = this.props.store
		const myChart = echarts.init(document.getElementById(this.props.id));
		this.handleChartData(store, this.state.month)
		myChart.setOption(this.option);

		//Chart point 点击事件
		myChart.on('click', (params) => {
			const month = this.state.month
			// 判断是否选中
			this.clickChartPoint(params.data.label)
			this.handleChartData(store, month)
			this.setPointSize(this.zoomValue)
			myChart.setOption(this.option);
			let count = this.props.store.choicePointCount
			this.setState({
				clickCount: count
			})
		});

		//zoom事件
		myChart.on('datazoom', (params) => {
			let zoomValue = params.end || params.batch[0].start || params.batch[0].startValue * 100
			console.log(zoomValue)
			// this.resetOption()
			if (zoomValue < 99) {
				this.zoomValue = 16
				// this.resetOption()
			}

			else {
				this.zoomValue = 8
				// this.initOption()
			}

		});

		myChart.on('mouseover', (params) => {
			if(this.zoomValue==16){
				this.setState({
					HeatMapData:params.data.assets
				})
			}
			
		});

		myChart.on('mouseout', () => {
			this.setState({
				HeatMapData:undefined
			})
		});

		//阻止浏览器指定区域的右键默认事件
		const chartDom = document.getElementById(this.props.id)
		chartDom.oncontextmenu = function () { return false; };

		// //右键点击打开配置菜单
		// myChart.getZr().on('contextmenu', (params) => {
		// 	this.setState({
		// 		showMenu: 'block',
		// 		X: params.event.screenX,
		// 		Y: params.event.screenY,
		// 	})
		// });

		//左键点击关闭配置菜单
		myChart.getZr().on('click', (params) => {
			this.setState({
				showMenu: 'none',
			})
		});

		document.onkeydown = (event) => {
			if (event.ctrlKey && event.keyCode == 66) {
				myChart.dispatchAction({
					type: 'dataZoom',
					// 开始位置的百分比，0 - 100
					start: 0,
					// 结束位置的百分比，0 - 100
					end: 100,
				})
				this.setPointSize(8)
				myChart.setOption(this.option)

			} else if (event.ctrlKey && !this.isPress) {
				console.log('is')
				this.option.series[0].large = true
				myChart.dispatchAction({
					type: 'takeGlobalCursor',
					key: 'dataZoomSelect',
					// 启动或关闭
					dataZoomSelectActive: true
				});
				myChart.setOption(this.option)
			}
			this.isPress = true
		}

		document.onkeyup = () => {
			myChart.dispatchAction({
				type: 'takeGlobalCursor',
				key: 'dataZoomSelect',
				// 启动或关闭
				dataZoomSelectActive: false
			});
			this.isPress = false
			this.option.series[0].large = false
			myChart.setOption(this.option)
		}

		document.onmouseup = () => {
			this.setPointSize(this.zoomValue)
			myChart.setOption(this.option);

		}

		window.onresize = function () {
			myChart.resize();
		}

	}

	//动态设置元素大小
	setPointSize(size) {
		this.option.series.map((v) => {
			v.symbolSize = size
		})
	}

	//动态设置提示框
	resetOption() {
		this.option.tooltip = {
			trigger: 'item',
			axisPointer: {
				type: 'cross',
				snap: true
			},
			showContent: true,
			position: function (point, params, dom, rect, size) {
				// 固定在顶部
				return [point[0], '10%'];
			},
			formatter: function (params) {
				console.log(params)
				let res =
					`<div>
					${
					params.data.assets.map((v) => {
						return `<p>${v.name} : ${v.value}</p>`
					}).join('')
					}
				</div>
				`
				return res;
			},
		}
	}

	// 初始化提示框
	initOption() {
		this.option.tooltip = {
			trigger: 'item',
			axisPointer: {
				type: 'cross',
				snap: true
			},
			showContent: false,
		}
	}

	handleChartData(store, monthIndex) {
		console.log(store)
		//数据初始化
		const chartData = store.data.series
		const { max_x, max_y, min_x, min_y } = store.data

		//Chart配置参数
		this.option = {
			// title: {
			// 	text: chartTitle
			// },

			tooltip: {
				trigger: 'line',
				axisPointer: {
					type: 'cross',
					snap: true
				},
				right: '5%',
				top: '5%',
				showContent: false,
			},
			toolbox: {
				orient: 'vertical',
				right: '5%',
				top: '-15%',
				feature: {
					dataZoom: {
						// icon:{
						// 	zoom:''
						// },
					}
				}
			},
			grid: {
				left: '55px',
				top: '5%',
				containLabel: true
			},

			xAxis: {
				min: min_x,
				max: max_x,
				axisLine: {
					lineStyle: {
						color: '#999'
					}
				}
			},
			yAxis: {
				min: min_y,
				max: max_y,
				axisLine: {
					lineStyle: {
						color: '#999'
					}
				}
			},

			dataZoom: [{
				type: 'inside',
				xAxisIndex: 0,
				filterMode: 'empty',
				zoomOnMouseWheel: 'false',

			},
			{
				type: 'inside',
				yAxisIndex: 0,
				filterMode: 'empty',
				zoomOnMouseWheel: 'false',

			}],
			animation: false,
			series: [
				//useless point
				{
					name: '其它组合',
					type: 'scatter',
					symbolSize: this.zoomValue,
					itemStyle: {
						color: '#bae7ff',
						opacity: 0.5,
						borderColor: '#fff',
						borderWidth: 1
					},
					emphasis: {
						itemStyle: {
							opacity: 0.87,
							color: '#fff',
							borderColor: '#2590FC',
							borderWidth: 4
						},
					},
					large: false,
					data: chartData[monthIndex].un_efficient_frontier
				},
				//vip point
				{
					name: '优化点',
					type: 'scatter',
					symbol: 'circle',
					symbolSize: this.zoomValue,
					itemStyle: {
						opacity: 0.87,
						color: '#2590FC',
					},
					emphasis: {
						itemStyle: {
							opacity: 0.87,
							color: '#fff',
							borderColor: '#2590FC',
							borderWidth: 4
						},
					},
					large: false,
					data: chartData[monthIndex].existing_portfolio
				},
				//line
				{
					name: '有效前沿',
					type: 'line',
					symbolSize: 8,
					symbol: 'circle',
					itemStyle: {
						opacity: 0.87,
						color: '#2590FC',
					},
					lineStyle: {
						opacity: 0.5,
						color: '#000',
						width: 2
					},
					smooth: true,
					emphasis: {
						itemStyle: {
							opacity: 0.87,
							color: '#fff',
							borderColor: '#2590FC',
							borderWidth: 4
						},
					},
					data: chartData[monthIndex].efficient_frontier.data
				},
				//choice
				{

					type: 'scatter',
					symbolSize: this.zoomValue,
					itemStyle: {
						opacity: 1,
						color: '#ffffff',
						borderColor: '#DF5F20',
						borderWidth: 4
					},
					data: chartData[monthIndex].efficient_frontier.data.map((v) => {
						if (this.choicePointArry.indexOf(v.label) > -1) {
							return v
						}
					})
				},
				{

					type: 'scatter',
					symbolSize: this.zoomValue,
					itemStyle: {
						opacity: 1,
						color: '#ffffff',
						borderColor: '#DF5F20',
						borderWidth: 4
					},
					data: chartData[monthIndex].un_efficient_frontier.map((v) => {
						if (this.choicePointArry.indexOf(v.label) > -1) {
							return v
						}
					})
				},
				//vip point
				{
					name: '优化点',
					type: 'scatter',
					symbol: 'circle',
					symbolSize: this.zoomValue,
					itemStyle: {
						opacity: 1,
						color: '#ffffff',
						borderColor: '#DF5F20',
						borderWidth: 4
					},
					large: false,
					data: chartData[monthIndex].existing_portfolio.map((v) => {
						if (this.choicePointArry.indexOf(v.label) > -1) {
							return v
						}
					})
				},
			]
		};
	}

	timeChange = (value) => {

		const monthArry = Object.keys(this.state.marks);

		const monthCount = monthArry.indexOf(value.toString())

		this.setState({
			month: monthCount
		})

		let tip = document.getElementsByClassName('ant-slider-handle')[0]

		tip.innerHTML = this.state.marks[value]

		var myChart = echarts.init(document.getElementById(this.props.id));
		this.handleChartData(this.props.store, monthCount)

		myChart.setOption(this.option);
	}

	clickChartPoint(label) {
		let result = this.choicePointArry.indexOf(label)

		if (result > -1) {
			this.choicePointArry.splice(result, 1);
			this.choicePointCount--
		} else {
			this.choicePointArry.push(label)
			this.choicePointCount++
		}
	}


	render() {

		return (
			<div className='EfficientFrontierChart-wrap' style={{ left: 800 }}>

				<div className="time-slider">
					<Slider style={{ left: 50 }} max={36} tooltipVisible={null} marks={this.state.marks} step={null} defaultValue={12} onChange={this.timeChange} />
				</div>
				<div id={this.props.id} style={{ height: this.props.height, width: this.props.width, top: this.props.top, margin: '0 0 0 0' }}>

				</div>
				{/* {this.state.clickCount > 1
					&& <Button type="primary" onClick={this.comply}>对比</Button>} */}
				{this.state.HeatMapData &&
					<div className="heatMap">
						<HeatMap data={this.state.HeatMapData} />
					</div>
				}

			</div>
		);
	}
}

export default EfficientFrontierChart