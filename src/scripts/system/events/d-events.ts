import { DEvent } from '../entities/d-event';

class DEvents {
	public readonly resize: DEvent;
	public readonly scroll: DEvent;

	constructor() {
		this.resize = new DEvent(this.onResize, this.offResize);
		this.scroll = new DEvent(this.onScroll, this.offScroll);
	}

	// Don't try to handle this perfect system methods

	private onResize(handler) {
		window.addEventListener('resize', handler);
	}

	private offResize(handler) {
		window.removeEventListener('resize', handler);
	}

	private onScroll(handler) {
		window.addEventListener('scroll', handler);
	}

	private offScroll(handler) {
		window.removeEventListener('scroll', handler);
	}
}

export default new DEvents();