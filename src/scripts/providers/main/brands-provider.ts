// entities
import { DProvider } from '@d-entities/d-provider';

// providers
import { IBrandLink } from '@interfaces/providers';

// assets
import adobe from '@assets/images/brands/logos/adobe.png';
import amazon from '@assets/images/brands/logos/amazon.png';
import code_exceptional from '@assets/images/brands/logos/code_exceptional.png';
import digital_ocean from '@assets/images/brands/logos/digital_ocean.png';
import ford from '@assets/images/brands/logos/ford.png';
import google from '@assets/images/brands/logos/google.png';
import novolex from '@assets/images/brands/logos/novolex.png';
import wix from '@assets/images/brands/logos/wix.png';

interface IBrandsProviderState {
	list: IBrandLink[];
}

const state: IBrandsProviderState = {
	list: [
		{
			name: 'Adobe',
			href: 'https://www.adobe.com/',
			image: adobe
		},
		{
			name: 'Amazon',
			href: 'https://www.amazon.com/',
			image: amazon
		},
		{
			name: 'Code Exceptional',
			href: 'https://www.code_exceptional.com/',
			image: code_exceptional
		},
		{
			name: 'Digital Ocean',
			href: 'https://www.digitalocean.com/',
			image: digital_ocean
		},
		{
			name: 'Ford',
			href: 'https://www.ford.com/',
			image: ford
		},
		{
			name: 'Google',
			href: 'https://google.com/',
			image: google
		},
		{
			name: 'Novolex',
			href: 'https://novolex.com',
			image: novolex
		},
		{
			name: 'Wix',
			href: 'https://wix.com',
			image: wix
		}
	]
};

export class BrandsProvider extends DProvider<IBrandsProviderState> {
	constructor() {
		super(state);
	}

	public init(): void {
		super.init();
	}
}