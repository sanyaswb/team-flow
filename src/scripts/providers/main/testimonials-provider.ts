// entities
import { DProvider } from '@d-entities/d-provider';

// images
import lucy_niana from '@assets/images/testimonials/lucy-niana.png';
import mark_anderson from '@assets/images/testimonials/mark-anderson.png';

// interfaces
import { IReviewer } from '@interfaces/providers';

interface ITestimonialsProviderState {
	reviewers: IReviewer[];
}

const state: ITestimonialsProviderState = {
	reviewers: [
		{
			name: 'Lucy',
			surname: 'Niana',
			task: 'Develop Communication Plan',
			photo: lucy_niana,
			rating: 4,
			status: 'done'
		},
		{
			name: 'Mark',
			surname: 'Anderson',
			task: 'Upgrade Contract Agreement',
			photo: mark_anderson,
			rating: 5,
			status: 'pending'
		}
	]
}

export class TestimonialsProvider extends DProvider<ITestimonialsProviderState> {
	constructor() {
		super(state);
	}
}