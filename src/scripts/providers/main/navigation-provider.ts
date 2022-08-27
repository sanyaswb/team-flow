// entities
import { DProvider } from '@d-entities/d-provider';

// interfaces
import { ILink } from '@interfaces/providers';

interface INavigationProviderState {
	headerLinks: ILink[];
}

const state: INavigationProviderState = {
	headerLinks: [
		{
			text: 'Product',
			href: '#product',
			childLinks: [
				{
					text: 'Partners',
					href: '#partners'
				},
				{
					text: 'Affiliate',
					href: '#affiliate'
				},
				{
					text: 'Integrations',
					href: '#integrations'
				},
				{
					text: 'Developers',
					href: '#developers'
				},
				{
					text: 'Students',
					href: '#students'
				},
				{
					text: 'Work OS',
					href: '#workOS'
				}
			]
		},
		{
			text: 'Solution',
			href: '#solution',
			childLinks: [
				{
					text: 'Project Management',
					href: '#projectManagement'
				},
				{
					text: 'Marketing',
					href: '#marketing'
				},
				{
					text: 'CRM and Sales',
					href: '#crmAndSales'
				},
				{
					text: 'Software Development',
					href: '#softwareDevelopment'
				},
				{
					text: 'Constructions',
					href: '#constructions'
				},
				{
					text: 'Creative Production',
					href: '#creativeProduction'
				},
				{
					text: 'Remote Work',
					href: '#remoteWork'
				},
				{
					text: 'HR',
					href: '#HR'
				},
				{
					text: 'IT',
					href: '#IT'
				},
				{
					text: 'See More Solutions',
					href: '#seeMoreSolutions'
				}
			]
		},
		{
			text: 'Enterprice',
			href: '#enterprice'
		},
		{
			text: 'Pricing',
			href: '#pricing'
		}
	]
};

export class NavigationProvider extends DProvider<INavigationProviderState> {
	constructor() {
		super(state);
	}
}