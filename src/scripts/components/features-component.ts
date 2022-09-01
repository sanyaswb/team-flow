// entities
import { DComponent } from '@d-entities/d-component';

// providers
import { screenProvider, testimonialsProvider } from '@providers/root-provider';
import { IReviewer } from '@interfaces/providers';

// helpers
import { arrayMix } from '../helpers/math-helpers';

export class FeaturesComponent extends DComponent {
	private svgContainer: HTMLElement;
	private featuresSvgTestimonials: HTMLElement;
	private svgUserInfo: HTMLElement;

	private listeners: Array<{
		el: SVGImageElement;
		listener: (e?: Event) => void;
	}> = [];

	constructor() {
		super();

		this.onScrollY = this.onScrollY.bind(this);
	}

	public init() {
		this.svgContainer = document.getElementById('featuresSvgContainer')
		// @ts-ignore
		this.featuresSvgTestimonials = document.getElementById('featuresSvgTestimonials') as SVGElement;
		this.svgUserInfo = document.getElementById('featuresSvgUserInfo') as HTMLElement;

		this.fillSvgTestimonials();
		this.setEvents();

		super.init();
	}

	private setEvents(): void {
		screenProvider.on('scrollY', this.onScrollY)
	}

	private removeEvents(): void {
		screenProvider.off('scrollY', this.onScrollY);

		for (const l of this.listeners) {
			l.el.removeEventListener('mouseover', l.listener);
		}
	}

	private onScrollY(scrollY: number): void {
		if (Math.floor(scrollY) > this.svgContainer.offsetTop - this.svgContainer.clientHeight - 100) {
			this.showElements();
			screenProvider.off('scrollY', this.onScrollY);
		}
	};

	private fillSvgTestimonials(): void {
		const selectors = this.featuresSvgTestimonials.querySelectorAll('image');

		selectors.forEach((s) => {
			const reviewer = testimonialsProvider.getRandomReviewer();
			s.setAttribute('href', reviewer.photo);
			s.setAttribute('data-data', JSON.stringify(reviewer));

			const listener = (e) => {
				// @ts-ignore
				const data = JSON.parse(e.target.dataset.data) as IReviewer;
				this.showUserInfo(data);
			}

			s.addEventListener('mouseover', listener);

			this.listeners.push({el: s, listener: listener});
		});
	}

	private showElements(): void {
		// @ts-ignore
		const images = arrayMix([...this.svgContainer.querySelectorAll('image')]);
		// @ts-ignore
		const circles = arrayMix([...this.svgContainer.querySelectorAll('circle')]);

		images.forEach((el, index) => {
			setTimeout(() => {
				el.style.opacity = '1';
			}, index * 300);
		});

		circles.forEach((el, index) => {
			setTimeout(() => {
				el.style.opacity = '1';
			}, index * 100);
		});
	}

	private showUserInfo(data: IReviewer): void {
		this.svgUserInfo.innerHTML = `
			<div class="user-info__photo ${data.online ? 'user-info__photo_online' : 'user-info__photo_offline'}">
				<img src="${data.photo}" alt="${data.name}" />
			</div>
			<aside class="user-info__aside">
				<span class="user-info__status ${data.status === 'done' ? 'user-info__status_done' : 'user-info__status_pending'}">
					${data.status === 'done' ? 'Task Done' : 'Task In Progress'}
				</span>
				<div class="user-info__rating user-info__rating_${data.rating}">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</aside>
			<div class="user-info__about">
				<h4 class="user-info__name">${data.name}</h4>
				<p class="user-info__position">${data.position}</p>
			</div>
			<button class="button_preset-1 user-info__button">${data.message}</button>
		`;
	}

	public destroy() {
		this.removeEvents();
		super.destroy();
	}
}