// providers
import { ScreenProvider } from '@providers/main/screen-provider';
import { NavigationProvider } from '@providers/main/navigation-provider';
import { TestimonialsProvider } from '@providers/main/testimonials-provider';
import { BrandsProvider } from '@providers/main/brands-provider';

export class RootProvider {
	public static providers = {
		screen: new ScreenProvider(),
		navigation: new NavigationProvider(),
		testimonials: new TestimonialsProvider(),
		brands: new BrandsProvider()
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
export const brandsProvider = RootProvider.providers.brands;