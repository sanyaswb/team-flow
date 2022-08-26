export class DEvent {
	private readonly setEvent: (handler: (e: Event) => void) => void;
	private readonly removeEvent: (handler: (e: Event) => void) => void

	constructor(
		setEvent: (handler: (e: Event) => void) => void,
		removeEvent: (handler: (e: Event) => void) => void
	) {
		this.setEvent = setEvent;
		this.removeEvent = removeEvent;
	}

	private callbacks: Array<(e?: Event) => void> = [];
	private started: boolean = false;

	private handler = (e: Event) => {
		for (const cb of this.callbacks) {
			cb(e);
		}
	}

	public add(cb: () => void) {
		this.callbacks.push(cb);

		if (!this.started) {
			this.setEvent(this.handler);
			this.started = true;
		}
	}

	public remove(cb: () => void) {
		this.callbacks = this.callbacks.filter(c => c !== cb);

		if (!this.callbacks.length && this.started) {
			this.removeEvent(this.handler);
			this.started = false;
		}
	}
}