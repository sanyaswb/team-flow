export interface ILink {
	text: string;
	href: string;
	childLinks?: ILink[];
}

export interface IReviewer {
	name: string;
	surname: string;
	task: string;
	photo: string;
	rating: number;
	status: 'done' | 'pending';
	position: string;
	message: string;
	online: boolean;
}

export interface IBrandLink {
	name: string;
	image: string;
	href: string;
}