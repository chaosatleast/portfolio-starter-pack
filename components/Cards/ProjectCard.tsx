"use client";

import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ProjectCoverImage from "../ProjectCoverImage";
import React from "react";
import { CursorContext } from "../CursorEffect";
import Wrapper from "../Wrapper";

type ProjectCardProps = {
	image: SanityImage;
	title: string;
	_id: string;
	slug: string;
};

function ProjectCard({ image, title, _id, slug }: ProjectCardProps) {
	const router = useRouter();
	const { content, setContent, setVariants } = React.useContext(CursorContext);

	if (!setContent || !setVariants) return null;

	return (
		<Wrapper text="View">
			<div
				key={_id}
				className="relative h-[15rem] w-full overflow-hidden lg:h-[20rem] xl:h-[25rem]"
				onClick={() => {
					router.push(`/project/${slug}`);
				}}
			>
				{image ? (
					<ProjectCoverImage image={image} />
				) : (
					<div className="h-[15rem] w-full bg-neutral-900 lg:h-[20rem] xl:h-[25rem]"></div>
				)}
				<div className="absolute top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-35">
					<div className="w-[15rem] text-colors-vibrant-yellow">
						<span className="inline text-[2rem] font-black uppercase">
							{title}
						</span>
						<ArrowUpRight
							className="mb-3 inline-block h-[2.75rem] w-[2.75rem]"
							strokeWidth={2}
						/>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}

export default ProjectCard;
