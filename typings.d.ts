interface IExperience {
	_id: string;
	_createdAt: string;
	order: number;
	company: string;
	position: string;
	description: any;
	endingPeriod: string;
	startingPeriod: string;
}

type Skill = {
	_id: string;
	_createdAt: Date;
	name: string;
	category: string;
	image: { asset: { url: string; _id: string } };
	familiarity: number;
	isDisplay: boolean;
};

interface IContact {
	_id: string;
	_createdAt: Date;
	platform: string;
	url: string;
}

type DevelopmentType = keyof typeof DevelopmentType;

type TackStack = keyof typeof TeckStack;

interface IProject {
	_id: string;
	_createdAt: string;
	order: number;
	title: string;
	description: string;
	devType: string;
	techUsed: string[];
	coverImage: SanityImage;
	screenshots: SanityImage[];
	demoUrl?: string;
	sourceCodeUrl?: string;
	isDisplay: boolean;
	slug: SanitySlug;
}

type SanityImage = {
	alt: string;
	asset: { url: string; _id: string };
};

type SanitySlug = {
	current: string;
	_type: string;
};

interface Project {
	_id: string;
	_createdAt: string;
	order: number;
	title: string;
	description: any;
	devType: string;
	techUsed: string[];
	coverImage: SanityImage;
	screenshots: SanityImage[];
	demoUrl?: string;
	sourceCodeUrl?: string;
	isDisplay: boolean;
	slug: SanitySlug;
}
