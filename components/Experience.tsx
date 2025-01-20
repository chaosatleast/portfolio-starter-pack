"use client";
import { motion } from "framer-motion";
import {
	ChevronsDown,
	ChevronsUp,
	CircleArrowOutUpRight,
	Minus,
} from "lucide-react";
import React from "react";
import Wrapper from "./Wrapper";
import CreativeOverlayButton from "./Buttons/CreativeOverlayButton";
import StaggerObjectSlideIn from "./Animations/StaggerObjectSlideIn";
import TextSlideDown from "./Animations/StaggerText/TextSlideDown";
import { PortableText } from "next-sanity";
import { descriptionStyle } from "./BlockContentStyle";

function Experience({ experiences }: { experiences: IExperience[] }) {
	const [isExpand, setIsExpand] = React.useState(true);

	return (
		<div className="flex h-full flex-col items-center justify-center gap-y-10 font-roboto">
			<motion.div
				initial={{
					height: 0,
					opacity: 1,
					overflow: "hidden",
					marginTop: "0px",
				}}
				animate={{
					transition: { type: "tween" },
					height: isExpand ? "auto" : 0,
					marginTop: isExpand ? "80px" : "0px",
				}}
				exit={{
					height: 0,
					opacity: 1,
					overflow: "hidden",
					marginTop: "0px",
				}}
				className=""
			>
				<div className="grid grid-cols-12 items-center gap-x-2 pb-6">
					<h1 className="col-span-12 w-full text-lg text-colors-gray-100 lg:col-span-2">
						<TextSlideDown
							textType="char"
							staggerAmount={1 / Math.pow(10, 2)}
						>
							Work Experiences
						</TextSlideDown>
					</h1>
					<div className="col-span-12 lg:col-span-10">
						<hr className="my-2 w-full border-t border-colors-gray-400" />
					</div>
				</div>
				<StaggerObjectSlideIn
					className="experience-card"
					staggerAmount={0.05}
				>
					<div className="flex justify-end">
						<div className="flex w-full flex-col gap-8 lg:w-4/5 xl:pl-4">
							{experiences
								.sort((a, b) => b.order - a.order)
								.map((exp: IExperience, index: number) => (
									<div
										key={exp._id}
										className="experience-card flex flex-col gap-2 text-colors-white-300"
									>
										<div className="">
											<h1 className="mr-2 inline text-nowrap text-2xl font-bold">
												{exp.position}
											</h1>
											<CircleArrowOutUpRight
												size={20}
												className="mb-1 mr-2 inline-block shrink-0 text-colors-vibrant-yellow"
											/>

											<span className="text-base font-light uppercase text-colors-gray-200">
												{exp.company}
											</span>
										</div>

										<div className="inline-flex w-1/3 items-center text-sm font-light text-colors-gray-100">
											<span className="h-fit text-nowrap">
												{new Date(exp.startingPeriod).toLocaleDateString(
													"en-GB",
													{
														year: "numeric",
														month: "short",
													},
												)}
											</span>

											<Minus
												size={20}
												strokeWidth={0.5}
												className="shrink-0 text-neutral-300"
											/>

											<span className="h-fit text-nowrap">
												{new Date(exp.endingPeriod).toLocaleDateString(
													"en-GB",
													{
														year: "numeric",
														month: "short",
													},
												)}
											</span>
										</div>

										<div className="text-base">
											<PortableText
												value={exp.description}
												components={descriptionStyle}
											/>
										</div>
									</div>
								))}
						</div>
					</div>
				</StaggerObjectSlideIn>
			</motion.div>
			<Wrapper variant="nav">
				<CreativeOverlayButton
					onClick={() => {
						setIsExpand(!isExpand);
					}}
				>
					{isExpand ? (
						<div className="flex items-center justify-center">
							<span className="inline"> Read Less </span>
							<ChevronsUp className="inline h-[1rem] w-[1rem] text-backgroundBlack md:h-[1.4rem] md:w-[1.4rem]" />
						</div>
					) : (
						<div className="flex items-center justify-center">
							<span className="inline"> Read More </span>
							<ChevronsDown className="inline h-[1rem] w-[1rem] text-backgroundBlack md:h-[1.4rem] md:w-[1.4rem]" />
						</div>
					)}
				</CreativeOverlayButton>
			</Wrapper>
		</div>
	);
}

export default Experience;
