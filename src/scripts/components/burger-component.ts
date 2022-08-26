// libs
import { v4 as getId } from 'uuid';

// system
import DEvents from '../system/events/d-events';
import { DComponent } from '../system/entities/d-component';

// interfaces
import { TResolution } from '../system/interfaces/screen';

// providers
import NavigationProvider, { ILink } from '../providers/navigation-provider'
import { getHeightBreakPoint, getWidthBreakPoint } from '../system/helpers/screen';

interface IBlock {
	id: string;
	active: boolean;
	element: HTMLElement;
	isMain: boolean;
}

export class BurgerComponent extends DComponent {
	private readonly navigationProvider = NavigationProvider;

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
	private resolution: TResolution = 'desktop';

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
		this.resize = this.resize.bind(this);
		this.scroll = this.scroll.bind(this);
		this.normalLinkHandler = this.normalLinkHandler.bind(this);
	}

	public init() {
		this.setEvents();
		this.resize();
		this.scroll();
		this.processMainLinks();
	}

	private processMainLinks() {
		const mainListId = getId();

		const list = document.createElement('ul');
		list.className = 'burger__list';
		list.id = mainListId;

		for (const mainLink of this.navigationProvider.state.headerLinks) {
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

	private normalLinkHandler() {
		this.closeBtn.click();
	}

	private specialLinkHandler(id: string, mainLink: ILink | null = null): (e: Event) => void {
		return (e: Event) => {
			e.preventDefault();
			this.switchBlocks(id, mainLink);
		}
	}

	private switchBlocks(id: string, mainLink: ILink | null = null) {
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

	private open() {
		if (this.opened) {
			return ;
		}

		this.menu.classList.add('burger_opened');

		const widthBreakPoint = getWidthBreakPoint();
		const heightBreakPoint = getHeightBreakPoint();

		if (
			widthBreakPoint === 'mobile-l' ||
			widthBreakPoint === 'mobile-p' ||
			heightBreakPoint !== 'default'
		) {
			document.body.style.overflowY = 'hidden';
		}

		this.opened = true;
	}

	private close() {
		if (!this.opened) {
			return ;
		}

		this.menu.classList.remove('burger_opened');
		document.body.style.overflowY = 'auto';

		this.opened = false;
	}

	private setVisibility(value: boolean) {
		if (value) {
			this.menu.style.display = 'flex';
		} else {
			this.menu.style.display = 'none';
			this.closeBtn.click();
		}

		this.visible = value;
	}

	private resize() {
		const resolution = window.innerWidth >= 1025 ? 'desktop' : 'mobile';

		if (this.resolution !== resolution && resolution === 'mobile') {
			this.setVisibility(true);
		} else if (this.resolution !== resolution && resolution === 'desktop') {
			this.resolution = resolution;
			this.scroll();
		}

		const widthBreakPoint = getWidthBreakPoint();
		const heightBreakPoint = getHeightBreakPoint();

		if (
			this.opened && widthBreakPoint === 'mobile-l' ||
			this.opened && widthBreakPoint === 'mobile-p' ||
			this.opened && heightBreakPoint !== 'default'
		) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'auto';
		}

		this.resolution = resolution;
	}

	private scroll() {
		const scrollPosition = window.scrollY;

		if (scrollPosition > this.headerNavigation.offsetTop + this.headerNavigation.clientHeight) {
			if (this.resolution !== 'mobile' && !this.visible) {
				this.setVisibility(true);
			}
		} else if (scrollPosition <= this.headerNavigation.offsetTop + this.headerNavigation.clientHeight) {
			if (this.resolution !== 'mobile' && this.visible) {
				this.setVisibility(false);
			}
		}
	}

	private setEvents() {
		this.openBtn.addEventListener('click', this.open);
		this.closeBtn.addEventListener('click', this.close);

		this.backBtn.addEventListener('click', this.back);

		DEvents.resize.add(this.resize);
		DEvents.scroll.add(this.scroll);
	}

	public removeEvents() {
		this.openBtn.removeEventListener('click', this.open);
		this.closeBtn.removeEventListener('click', this.close);

		this.backBtn.removeEventListener('click', this.back);

		for (const l of this.linkListeners) {
			l.el.removeEventListener('click', l.listener);
		}

		DEvents.resize.remove(this.resize);
		DEvents.scroll.remove(this.scroll);
	}

	destroy() {
		this.removeEvents();
	}
}