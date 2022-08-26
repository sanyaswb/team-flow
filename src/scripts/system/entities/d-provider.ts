export class DProvider<IState extends {}> {
	public state: IState;
	private listeners: {
		[key in keyof IState]: Array<(value: unknown) => void>;
	} = {} as {
		[key in keyof IState]: Array<(value: unknown) => void>;
	};

	constructor(state: IState) {
		for (const key of Object.keys(state)) {
			this.listeners[key] = [];
		}

		const self = this;

		this.state = new Proxy<IState>(state, {
			set(target, prop, value) {
				const old = target[prop];

				target[prop] = value;

				if (old !== value && typeof old !== 'object' && typeof old !== 'function') {
					for (const l of self.listeners[prop]) {
						l(value);
					}
				} else if (typeof old === 'object' || typeof old === 'function') {
					if (JSON.stringify(old) === JSON.stringify(value)) {
						for (const l of self.listeners[prop]) {
							l(value);
						}
					}
				}

				return true;
			}
		});
	}

	public init() {
		//
	}

	public destroy() {
		for (const key of Object.getOwnPropertyNames(this.listeners)) {
			this.listeners[key] = [];
		}
	}

	public on(prop: keyof IState, listener: (value: any) => void) {
		if (!this.listeners[prop].find(listener)) {
			this.listeners[prop].push(listener);
		}
	}

	public once(prop: keyof IState, listener: (value: any) => void) {
		if (!this.listeners[prop].find(listener)) {
			this.listeners[prop].push((value) => {
				listener(value);

				this.listeners[prop] = this.listeners[prop].filter(l => l !== listener);
			});
		}
	}

	public off(prop: keyof IState, listener: (value: any) => void) {
		this.listeners[prop] = this.listeners[prop].filter(l => l !== listener);
	}
}