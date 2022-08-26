export interface ILink {
	text: string;
	href: string;
	childLinks?: ILink[];
}