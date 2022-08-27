// libs
import { v4 as getId } from 'uuid';

// system
import { DComponent } from '@d-entities/d-component';

// interfaces
import { ILink } from '@interfaces/providers';
import { TResolution, THeightBreakPoint, TWidthBreakPoint } from '@interfaces/screen';

// providers
import { navigationProvider, screenProvider } from '@providers/root-provider';

interface IBlock {
	id: string;
	active: boolean;
	element: HTMLElement;
	isMain: boolean;
}

export class BurgerComponent extends DComponent {
	private backBtn: HTMLButtonElement;
	private openBtn: HTMLButtonElement;
	private closeBtn: HTMLButtonElement;
	private menu: HTMLElement;
	private headerNavigation: HTMLElement;
	private burgerBlock: HTMLElement;
	private upperSection: HTMLElement;
	private upperLink: HTMLAnchorElement;

	private opened: boolean = false;
	private visible: boolean = true;

	private blocks: IBlock[] = [];

	private linkListeners: {
		el: HTMLAnchorElement;
		listener: (e: Event) => void;
	}[] = [];

	constructor() {
		super();

		this.backBtn = document.getElementById('burgerBtnBack') as HTMLButtonElement;
		this.openBtn = document.getElementById('burgerBtnOpen') as HTMLButtonElement;
		this.closeBtn = document.getElementById('burgerBtnClose') as HTMLButtonElement;
		this.menu = document.getElementById('burgerMenu') as HTMLElement;
		this.headerNavigation = document.getElementById('headerNavigation') as HTMLElement;
		this.burgerBlock = document.getElementById('burgerBlock') as HTMLElement;
		this.upperSection = document.getElementById('burgerUpperSection') as HTMLElement;
		this.upperLink = document.getElementById('burgerUpperLink') as HTMLAnchorElement;

		this.back = this.back.bind(this);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.onChangeResolution = this.onChangeResolution.bind(this);
		this.onChangeScrollY = this.onChangeScrollY.bind(this);
		this.onChangeWidthBreakPoint = this.onChangeWidthBreakPoint.bind(this);
		this.onChangeHeightBreakPoint = this.onChangeHeightBreakPoint.bind(this);

		const { resolution, scrollY } = screenProvider.state;

		this.checkVisibility(resolution, scrollY);

		this.normalLinkHandler = this.normalLinkHandler.bind(this);
	}

	public init(): void {
		this.setEvents();
		this.processMainLinks();
	}

	private processMainLinks(): void {
		const mainListId = getId();

		const list = document.createElement('ul');
		list.className = 'burger__list';
		list.id = mainListId;

		for (const mainLink of navigationProvider.state.headerLinks) {
			const hasChild = mainLink.childLinks && mainLink.childLinks.length;

			const item = document.createElement('li');
			item.className = 'burger__item';

			const link = document.createElement('a') as HTMLAnchorElement;
			link.className = 'burger__link';
			link.href = mainLink.href;
			link.innerText = mainLink.text;

			item.appendChild(link);
			list.appendChild(item);

			if (hasChild) {
				const id = getId();
				const listener = this.specialLinkHandler(id, mainLink);
				this.linkListeners.push({
					el: link,
					listener: listener
				});
				link.addEventListener('click', listener);

				this.processChildrenLinks(mainLink.childLinks, id);
			} else {
				const listener = this.normalLinkHandler;

				this.linkListeners.push({
					el: link,
					listener: listener
				});
				link.addEventListener('click', listener);
			}

			const listener = this.normalLinkHandler;
			const upperLink = this.upperLink;

			this.linkListeners.push({
				el: upperLink,
				listener: listener
			});
			upperLink.addEventListener('click', listener);
		}

		this.blocks.push({
			id: mainListId,
			active: true,
			element: list,
			isMain: true
		});

		this.burgerBlock.appendChild(list);
	}

	private processChildrenLinks(links: ILink[], id: string): void {
		const list = document.createElement('ul');
		list.className = 'burger__list';
		list.id = id;

		for (const l of links) {
			const item = document.createElement('li');
			item.className = 'burger__item';

			const link = document.createElement('a');

			link.className = 'burger__link';
			link.href = l.href;
			link.innerText = l.text;

			item.appendChild(link);
			list.appendChild(item);

			const listener = this.normalLinkHandler;

			this.linkListeners.push({
				el: link,
				listener: listener
			});
			link.addEventListener('click', listener);
		}

		this.blocks.push({
			id: id,
			active: false,
			element: list,
			isMain: false
		});
	}

	private normalLinkHandler(): void {
		this.closeBtn.click();
	}

	private specialLinkHandler(id: string, mainLink: ILink | null = null): (e: Event) => void {
		return (e: Event) => {
			e.preventDefault();
			this.switchBlocks(id, mainLink);
		}
	}

	private switchBlocks(id: string, mainLink: ILink | null = null): void {
		const currentBlock = this.blocks.find(block => block.active);
		const newBlock = this.blocks.find(block => block.id === id);

		this.burgerBlock.removeChild(currentBlock.element);
		this.burgerBlock.appendChild(newBlock.element);

		currentBlock.active = false;
		newBlock.active = true;

		if (!newBlock.isMain) {
			this.upperSection.style.display = 'flex';
		} else {
			this.upperSection.style.display = 'none';
		}

		if (mainLink) {
			this.upperLink.href = mainLink.href;
			this.upperLink.textContent = mainLink.text;
		}
	}

	private back(): void {
		const block = this.blocks.find(b => b.isMain);

		this.switchBlocks(block.id);
	}

	private open(): void {
		if (this.opened) {
			return ;
		}

		this.menu.classList.add('burger_opened');

		const { widthBreakPoint, heightBreakPoint } = screenProvider.state;

		if (
			widthBreakPoint === 'mobile-l' ||
			widthBreakPoint === 'mobile-p' ||
			heightBreakPoint !== 'default'
		) {
			document.body.style.overflowY = 'hidden';
		}

		this.opened = true;
	}

	private close(): void {
		if (!this.opened) {
			return ;
		}

		this.menu.classList.remove('burger_opened');

		document.body.style.overflowY = 'auto';

		this.opened = false;
	}

	private checkVisibility(resolution: TResolution, scrollY: number): void {
		switch (true) {
			case resolution === 'mobile':
			case scrollY > this.headerNavigation.offsetTop + this.headerNavigation.clientHeight:
				this.setVisibility(true);
				break;
			default:
				this.setVisibility(false);
		}
	}

	private setVisibility(value: boolean): void {
		if (value) {
			this.menu.style.display = 'flex';
		} else {
			this.menu.style.display = 'none';
			this.closeBtn.click();
		}

		this.visible = value;
	}

	private onChangeResolution(resolution: TResolution): void {
		const { scrollY } = screenProvider.state;

		this.checkVisibility(resolution, scrollY);
	}

	private onChangeWidthBreakPoint(widthBreakPoint: TWidthBreakPoint): void {
		if (
			this.opened && widthBreakPoint === 'mobile-l' ||
			this.opened && widthBreakPoint === 'mobile-p'
		) {
			document.body.style.overflowY = 'hidden';
		}
	}

	private onChangeHeightBreakPoint(heightBreakPoint: THeightBreakPoint): void {
		if (this.opened && heightBreakPoint !== 'default') {
			document.body.style.overflowY = 'hidden';
		}
	}

	private onChangeScrollY(scrollY: number) {
		const { resolution } = screenProvider.state;

		this.checkVisibility(resolution, scrollY);
	}

	private setEvents(): void {
		this.openBtn.addEventListener('click', this.open);
		this.closeBtn.addEventListener('click', this.close);
		this.backBtn.addEventListener('click', this.back);

		screenProvider.on('resolution', this.onChangeResolution);
		screenProvider.on('widthBreakPoint', this.onChangeWidthBreakPoint);
		screenProvider.on('heightBreakPoint', this.onChangeHeightBreakPoint);
		screenProvider.on('scrollY', this.onChangeScrollY);
	}

	public removeEvents(): void {
		this.openBtn.removeEventListener('click', this.open);
		this.closeBtn.removeEventListener('click', this.close);
		this.backBtn.removeEventListener('click', this.back);

		for (const l of this.linkListeners) {
			l.el.removeEventListener('click', l.listener);
		}

		screenProvider.off('resolution', this.onChangeResolution);
		screenProvider.off('widthBreakPoint', this.onChangeWidthBreakPoint);
		screenProvider.off('heightBreakPoint', this.onChangeHeightBreakPoint);
		screenProvider.off('scrollY', this.onChangeScrollY);
	}

	destroy(): void {
		this.removeEvents();
	}
}