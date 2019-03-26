import { observable, action } from 'mobx';

import Ajax from 'utils/Ajax';
import { Api } from 'api/api';
import dragData from 'mockData/drag.json';
import EF from 'mockData/EF.json';
// import StackBar_1 from 'mockData/stackBar_1.json';
// import StackBar_2 from 'mockData/stackBar_2.json';
// import StackBar_3 from 'mockData/stackBar_3.json';
export default class HomeStore {

	constructor() {

	};

	@observable scaleChartData = undefined;

	@observable effectForentData = EF;

	@observable dragChartData = dragData.data;

	// @observable StackBar_1 = StackBar_1;

	// @observable StackBar_2 = StackBar_2;

	// @observable StackBar_3 = StackBar_3;

	@observable RadarData = undefined;

	@observable choicePointArry = [];

	@observable choicePointCount = 0;

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

	@action loadScaleData = (getId) => {
		Ajax.get(`use_cases/distribution/${getId}`).then((res) => {
			this.scaleChartData = res.data
		})
	}

	// @action loadEfficientFrontierData = () => {
	// 	Ajax.get(Api.efficient_frontier_load).then((res) => {
	// 		this.effectForentData = res.data
	// 	})
	// }

	// @action loadDragChartData = () => {
	// 	Ajax.get(Api.drag_chart_load).then((res) => {
	// 		this.dragChartData = res.data
	// 	})
	// }
}