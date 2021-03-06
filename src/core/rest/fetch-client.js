let instance;
const timeResponse = 0.2 * 1000;

function bind(func, context) {
	return function() {
		return func.apply(context, arguments);
	};
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

const URL = 'http://e-banking-test-project.getsandbox.com';

class requestsManager {
	static instance() {
		if (!instance) {
			instance = new requestsManager();
		}
		return instance;
	}

	constructor() {
		this.bufferRequest = [];
		this.currentNextId = 0;
		this.methodList = [
			// лист методов которые не должны дублироваться
			'login',
			'getAssetsList',
			'getTickers',
		];
		this.methodResponse = [
			// лист методов которые должны получать ответ в любом случае
		];
		this.update();
	}

	generationId() {
		this.currentNextId += 1;
		if (+this.currentNextId > 9 * 1000) this.currentNextId = 0;
		return this.currentNextId + this.bufferRequest.length;
	}

	checkOpportunityRequest() {
		// return rest && socket && !isOffline;
		return true;
	}

	update() {
		setInterval(() => {
			this.bufferRequest.forEach(item => {
				if (!item.isWorkRequest && this.checkOpportunityRequest()) {
					item.method();
					item.isWorkRequest = true;
				}
				if (item.timeWait <= item.timeWork) {
					if (this.filterResponse(item.name)) item.callback(undefined);
					this.stopRequest(item.id);
				}
				if (!item.isWorkRequest) item.timeWork += 1;
				// console.log(item);
			});
		}, 1000);
	}

	filterRequest(nameMethod) {
		if (this.methodList.includes(nameMethod)) {
			return !this.bufferRequest.some(item => item.name === nameMethod);
		}
		return true;
	}

	filterResponse(nameMethod) {
		return this.methodResponse.includes(nameMethod);
	}

	addRequest(timeWait, method, name, params = {}, callBack) {
		if (this.filterRequest(name)) {
			const request = {
				timeWait,
				method,
				callBack,
				params,
				id: this.generationId(),
			};
			this.bufferRequest.push({
				id: request.id,
				method: this.startRequest(request),
				isWorkRequest: false,
				timeWork: 0,
				timeWait,
				name,
				callback: request.callBack,
			});
		}
	}

	stopRequest(id) {
		this.bufferRequest = this.bufferRequest.filter(element => element.id !== id);
	}

	startRequest(request) {
		return () => {
			try {
				request.isWorkRequest = true;
				const method = bind(request.method, this);
				method(response => {
					this.stopRequest(request.id);
					try {
						request.callBack(response);
					} catch (error) {
						console.log(error);
						console.log('requestError:', request);
					}
				}, request.params);
			} catch (error) {
				this.stopRequest(request.id);
			}
		};
	}

	async login(callBack, params) {
		console.log('request.login.params', params);
		const {email, password} = params;
		const responseFetch = await fetch(`${URL}/api/0/auth/login`, {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			body: `email=${email}&password=${password}`,
		});

		if (responseFetch.ok) {
			const responseFetchJSON = await responseFetch.json();
			callBack(({token} = responseFetchJSON));
		} else {
			callBack({error: 'Не верный логин или пароль'});
		}
	}

	async getAssetsList(callBack, params) {
		console.log('request.getAssetsList.params', params);
		const {token, page = 0, pageSize = 20, filter = 'all'} = params;
		const responseFetch = await fetch(
			`${URL}/api/0/assets?page=${page}&pageSize=${pageSize}&in=${filter}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (responseFetch.ok) {
			const responseFetchJSON = await responseFetch.json();
			console.log('assetsList', responseFetchJSON.content);
			callBack({responseFetchJSON});
		}
		callBack({error: responseFetch.status});
	}

	async getTickers(callBack, params) {
		console.log('request.getTickers.params', params);
		const {token, pairs = ['ABCUSD', 'USDABC', 'BTCABC', 'ABCBTC', 'ABCETH', 'ETHABC']} = params;
		const responseFetch = await fetch(`${URL}/api/0/assets/tickers`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				body: `pairs=${pairs}`,
			},
		});

		if (responseFetch.ok) {
			const responseFetchJSON = await responseFetch.json();
			callBack({responseFetchJSON});
		} else {
			callBack({error: responseFetch.status});
		}
	}
}

export default requestsManager;
