// interfaces
import { TWidthBreakPoint } from '../interfaces/screen';
import { THeightBreakPoint } from '../interfaces/screen';

export const getWidthBreakPoint = (): TWidthBreakPoint => {
	switch (true) {
		case window.innerWidth <= 480:
			return 'mobile-p';
		case window.innerWidth <= 640:
			return 'mobile-l';
		case window.innerWidth <= 1024:
			return 'tablet';
		case window.innerWidth <= 1200:
			return 'desktop-s';
		case window.innerWidth <= 1440:
			return 'desktop-m';
		case window.innerWidth <= 1700:
			return 'desktop-l';
		case window.innerWidth > 1920:
			return 'desktop-xl';
		default:
			return 'desktop-l';
	}
}

export const getHeightBreakPoint = (): THeightBreakPoint => {
	switch (true) {
		case window.innerHeight <= 480:
			return 'mobile-l';
		case window.innerHeight <= 640:
			return 'mobile-p';
		default:
			return 'default';
	}
}