import { ScreenProvider } from './main/screen-provider';
import { NavigationProvider } from './main/navigation-provider';
import { TestimonialsProvider } from './main/testimonials-provider';

export class RootProvider {
	public static providers = {
		screen: new ScreenProvider(),
		navigation: new NavigationProvider(),
		testimonials: new TestimonialsProvider()
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
export const testimonialsProvider = RootProvider.providers.testimonials;