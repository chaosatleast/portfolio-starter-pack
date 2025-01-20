"use client";

import { motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
};
const CreativeOverlayButton: React.FC<Props> = ({
	children,
	onClick,
	disabled = false,
}) => {
	const [isHovered, setIsHovered] = React.useState(false);
	const [isClicked, setIsClicked] = React.useState(false);

	const variants = {
		clicked: {
			scale: 1.2,
			transition: {
				duration: 0.5,
				easings: ["circIn", "circOut"],
			},
		},
		disabled: {
			opacity: 0.2,
		},
	};

	const primaryVariant = {
		hover: {
			top: -70,
			scale: 1.5,
			transition: {
				duration: 0.5,
				easings: ["circIn", "circOut"],
			},
		},

		hoverInitial: {
			top: 0,
		},
	};

	const secondaryVariant = {
		hover: {
			top: 0,
			left: 0,
			scale: 1,
			width: "100%",
			transition: {
				duration: 0.5,
				easings: ["circIn", "circOut"],
			},
			opacity: 1,
			display: "block",
		},

		hoverInitial: {
			top: 70,
			left: 0,
			scale: 0.5,
			opacity: 0,
			display: "none",
		},
	};

	return (
		<motion.div
			className={twMerge(
				"relative w-fit overflow-hidden rounded-full bg-colors-white-400 px-3 py-1 text-backgroundBlack md:px-6 md:py-2",
				`${disabled ? "pointer-events-none cursor-not-allowed" : ""}`,
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onMouseDown={() => {
				setIsClicked(true);
			}}
			onMouseUp={() => {
				console.log("Creative Button clicked");
				setIsClicked(false);
			}}
			animate={isClicked ? "clicked" : ""}
			onClick={onClick}
			initial={disabled ? "disabled" : ""}
			variants={variants}
		>
			<motion.div
				className="pointer-events-none relative flex items-center justify-center text-[0.8rem] md:text-[1.2rem]"
				animate={isHovered ? primaryVariant.hover : primaryVariant.hoverInitial}
				variants={primaryVariant}
			>
				{children}
			</motion.div>
			<motion.div
				className="pointer-events-none absolute flex h-full w-full items-center justify-center rounded-full bg-colors-vibrant-yellow text-[0.8rem] md:text-[1.2rem]"
				animate={
					isHovered ? secondaryVariant.hover : secondaryVariant.hoverInitial
				}
				variants={secondaryVariant}
				initial="hoverInitial"
			>
				<div className="flex h-full w-full items-center justify-center rounded-full bg-colors-vibrant-yellow">
					{children}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default CreativeOverlayButton;
