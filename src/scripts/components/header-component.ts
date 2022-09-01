// entities
import { DComponent } from '@d-entities/d-component';

// providers
import { testimonialsProvider } from '@providers/root-provider';

// interfaces
import { IReviewer } from '@interfaces/providers';

export class HeaderComponent extends DComponent {
	private readonly headerAside: HTMLElement;

	constructor() {
		super();

		this.headerAside = document.getElementById('headerAside');
	}

	public init(): void {
		this.fillTestimonials();
	}

	private fillTestimonials(): void {
		this.fillReviewer(testimonialsProvider.getRandomReviewer(), this.headerAside.querySelector('.header__reviewer_normal'));
		this.fillReviewer(testimonialsProvider.getRandomReviewer(), this.headerAside.querySelector('.header__reviewer_reversed'));
	}

	fillReviewer(data: IReviewer, selector: HTMLElement): void {
		const elements = {
			name: selector.querySelector('.reviewer p'),
			imgContainer: selector.querySelector('.reviewer'),
			status: selector.querySelector('.comment .status'),
			fullName: selector.querySelector('.comment .name'),
			task: selector.querySelector('.comment .task'),
			rating: selector.querySelector('.comment .rating')
		};

		elements.name.textContent = data.name;

		const img = document.createElement('img');
		img.setAttribute('src', data.photo);
		img.setAttribute('alt', data.name);
		elements.imgContainer.prepend(img);

		elements.status.textContent = data.status;
		elements.status.classList.add(`status_${data.status}`);

		elements.fullName.textContent = `${data.name} ${data.surname}`;

		elements.task.textContent = data.task;

		elements.rating.classList.add(`rating_${data.rating}`);
	}

	public destroy(): void {

	}
}