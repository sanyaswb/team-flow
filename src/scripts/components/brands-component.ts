// entities
import { DComponent } from '@d-entities/d-component';

// providers
import { brandsProvider } from '@providers/root-provider';

export class BrandsComponent extends DComponent {
	private list: HTMLUListElement;

	private amount: number;
	private _visible: number;

	constructor() {
		super();

		this.list = document.getElementById('brandsList') as HTMLUListElement;
		this.amount = brandsProvider.state.list.length;
		this._visible = 3;
	}

	private get visible(): number {
		return this._visible;
	}

	private set visible(value: number) {
		this._visible = value;
	}

	public init() {
		this.fillList();

		super.init();
	}

	private fillList(): void {
		for (const l of brandsProvider.state.list) {
			const li = document.createElement('li');
			li.className = 'brands__item';

			const link = document.createElement('a');
			link.className = 'brands__link';
			link.href = l.href;
			link.target = '_blank';

			const bwImg = new Image();
			bwImg.src = l.image;
			bwImg.className = 'brands__image brands__image_bw'
			bwImg.alt = l.name;

			const normalImg = new Image();
			normalImg.src = l.image;
			normalImg.className = 'brands__image brands__image_normal';
			normalImg.alt = l.name;

			link.appendChild(normalImg);
			link.appendChild(bwImg);
			li.appendChild(link);
			this.list.appendChild(li);
		}
	}
}