import { ArrowRight } from "lucide-react";
import { PortableTextComponents } from "next-sanity";
export const descriptionStyle: PortableTextComponents = {
	marks: {
		strong: ({ children }) => (
			<strong className="font-bold text-colors-white-100">{children}</strong>
		),
	},
	list: ({ children }) => <ul className="my-2 h-fit w-full p-2">{children}</ul>,
	listItem: ({ children }) => (
		<li className="my-2 flex items-start gap-x-2">
			<div className="shrink-0">
				<ArrowRight
					size={20}
					className="mt-0.5 text-colors-vibrant-yellow"
				/>
			</div>

			<div className="w-full text-colors-white-400">{children}</div>
		</li>
	),
	block: {
		normal: ({ children }) => (
			<span className="leading-7 text-colors-white-200">
				{children}
				<br />
			</span>
		),
	},
};
