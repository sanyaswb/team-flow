// entities
import { DProvider } from '../system/entities/d-provider';

// interfaces
import { THeightBreakPoint, TResolution, TWidthBreakPoint } from '../system/interfaces/screen';

interface IScreenProviderState {
	resolution: TResolution;
	widthBreakPoint: TWidthBreakPoint;
	heightBreakPoint: THeightBreakPoint;
}

class ScreenProvider extends DProvider<IScreenProviderState> {
	constructor(state: IScreenProviderState) {
		super(state);
	}

	onResize() {

	}

	onScroll() {

	}
}