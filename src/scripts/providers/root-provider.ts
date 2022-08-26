import { ScreenProvider } from './main/screen-provider';
import { NavigationProvider } from './main/navigation-provider';

export class RootProvider {
	public static providers = {
		screen: new ScreenProvider(),
		navigation: new NavigationProvider()
	}

	public static init() {
		for (const key of Object.getOwnPropertyNames(RootProvider.providers)) {
			RootProvider.providers[key].init();
		}
	}

	public static destroy() {
		for (const key of Object.getOwnPropertyNames(RootProvider.providers)) {
			RootProvider.providers[key].destroy();
		}
	}
}

export const screenProvider = RootProvider.providers.screen;
export const navigationProvider = RootProvider.providers.navigation;