// entities
import { DProvider } from '@d-entities/d-provider';

// images
import lucy_niana from '@assets/images/testimonials/lucy-niana.png';
import mark_anderson from '@assets/images/testimonials/mark-anderson.png';
import angelina_snow from '@assets/images/testimonials/angelina-snow.png';
import jane_price from '@assets/images/testimonials/jane-price.png';
import ryan_dorkman from '@assets/images/testimonials/ryan-dorkman.png';
import lena_clark from '@assets/images/testimonials/lena-clark.png';

// interfaces
import { IReviewer } from '@interfaces/providers';
import { arrayMix, getRandomInt } from '../../helpers/math-helpers';

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
			status: 'done',
			position: 'member M12 team',
			message: 'message',
			online: false
		},
		{
			name: 'Mark',
			surname: 'Anderson',
			task: 'Upgrade Contract Agreement',
			photo: mark_anderson,
			rating: 5,
			status: 'pending',
			position: 'member M12 team',
			message: 'message',
			online: true
		},
		{
			name: 'Angelina',
			surname: 'Snow',
			task: 'Methodology Injecting',
			photo: angelina_snow,
			rating: 5,
			status: 'done',
			position: 'member M12 team',
			message: 'message',
			online: true
		},
		{
			name: 'Jane',
			surname: 'Price',
			task: 'Create Team Environment',
			photo: jane_price,
			rating: 4,
			status: 'pending',
			position: 'member M12 team',
			message: 'message',
			online: false
		},
		{
			name: 'Ryan',
			surname: 'Dorkman',
			task: 'Upgrade Contract Agreement',
			photo: ryan_dorkman,
			rating: 3,
			status: 'done',
			position: 'member M12 team',
			message: 'message',
			online: true
		},
		{
			name: 'Lena',
			surname: 'Clark',
			task: 'Refactor business plan',
			photo: lena_clark,
			rating: 4,
			status: 'pending',
			position: 'member M12 team',
			message: 'message',
			online: false
		}
	]
};

export class TestimonialsProvider extends DProvider<ITestimonialsProviderState> {
	constructor() {
		super(state);
	}

	public init() {
		this.mixReviewers();
		super.init();
	}

	private mixReviewers(): void {
		this.state.reviewers = arrayMix<IReviewer>(this.state.reviewers);
	}

	public getRandomReviewer(): IReviewer {
		const index = getRandomInt(0, this.state.reviewers.length - 1);
		const item = this.state.reviewers[index];
		this.state.reviewers.splice(index, 1);
		return item;
	}
}