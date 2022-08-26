// interfaces
import { THeightBreakPoint, TResolution, TWidthBreakPoint } from '../../interfaces/screen';

// entities
import { DProvider } from '../../system/entities/d-provider';

interface IScreenProviderState {
	width: number;
	height: number;
	resolution: TResolution;
	widthBreakPoint: TWidthBreakPoint;
	heightBreakPoint: THeightBreakPoint;
	scrollY: number;
}

const state: IScreenProviderState = {
	width: 0,
	height: 0,
	resolution: 'desktop',
	widthBreakPoint: 'default',
	heightBreakPoint: 'default',
	scrollY: 0
}

export class ScreenProvider extends DProvider<IScreenProviderState> {
	constructor() {
		super(state);

		this.onResize = this.onResize.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}

	public init(): void {
		this.onResize();
		this.onScroll();

		this.setEvents();
	}

	public destroy() {
		this.removeEvents();
		super.destroy();
	}

	private setEvents(): void {
		window.addEventListener('resize', this.onResize);
		window.addEventListener('scroll', this.onScroll);
	}

	private removeEvents(): void {
		window.removeEventListener('resize', this.onResize);
		window.removeEventListener('scroll', this.onScroll);
	}

	private onResize(): void {
		const width = window.innerWidth;
		const height = window.innerHeight;

		this.setResolution(width);
		this.setWidthBreakPoint(width);
		this.setHeightBreakPoint(height);
	}

	private onScroll(): void {
		this.state.scrollY = window.scrollY;
	}

	private setResolution(width: number): void {
		this.state.resolution = width <= 1024 ? 'mobile' : 'desktop';
	}

	private setWidthBreakPoint(width: number): void {
		switch (true) {
			case width <= 480:
				this.state.widthBreakPoint = 'mobile-p';
				break;
			case width <= 640:
				this.state.widthBreakPoint = 'mobile-l';
				break;
			case width <= 1024:
				this.state.widthBreakPoint = 'tablet';
				break;
			case width <= 1200:
				this.state.widthBreakPoint = 'desktop-s';
				break;
			case width <= 1440:
				this.state.widthBreakPoint = 'desktop-m';
				break;
			case width <= 1700:
				this.state.widthBreakPoint = 'desktop-l';
				break;
			case width > 1920:
				this.state.widthBreakPoint = 'desktop-xl';
				break;
			default:
				this.state.widthBreakPoint = 'default';
				break;
		}
	}

	private setHeightBreakPoint(height: number): void {
		switch (true) {
			case height <= 480:
				this.state.heightBreakPoint = 'mobile-l';
				break;
			case height <= 640:
				this.state.heightBreakPoint = 'mobile-p';
				break;
			default:
				this.state.heightBreakPoint = 'default';
				break;
		}
	}
}