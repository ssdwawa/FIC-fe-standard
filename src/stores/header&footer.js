import { observable, action } from 'mobx';

import Ajax from 'utils/Ajax';
import {Api} from 'api/api';

export default class HeaderAndFooter {

	constructor() {

	};

	@observable scaleChartData = undefined;


	@action loadEfficientFrontierData = () => {
		Ajax.get(Api.efficient_frontier_load).then((res) => {
			this.effectForentData = res.data
		})
	}
}