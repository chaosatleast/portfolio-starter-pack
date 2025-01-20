"use client";

import { motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	isActive?: boolean;
};
const CreativeButton: React.FC<Props> = ({
	children,
	onClick,
	disabled = false,
	isActive = false,
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
		active: {
			backgroundColor: "var(--vibrant-yellow)",
		},
		inactive: {
			backgroundColor: "var(--white-400)",
		},
	};

	const primaryVariant = {
		hover: {
			x: -10,
			transition: {
				duration: 0.5,
				// easings: ["easeOut"],
			},
		},

		hoverInitial: {},
		active: {
			x: -10,
		},
	};

	const secondaryVariant = {
		hover: {
			scale: 48,
			backgroundColor: "var(--vibrant-yellow)",
			transition: {
				duration: 0.5,
				easings: ["circIn", "circOut"],
			},
		},

		hoverInitial: {
			opacity: 1,
		},
		active: {
			opacity: 0,
		},
	};

	return (
		<motion.div
			className={twMerge(
				`relative flex w-fit items-center gap-x-2 overflow-hidden rounded-full bg-colors-white-400 px-2 py-1 text-backgroundBlack outline-none md:px-4 md:py-1`,
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
			animate={isClicked ? "clicked" : isActive ? "active" : "inactive"}
			onClick={onClick}
			initial={disabled ? "disabled" : isActive ? "active" : "inactive"}
			variants={variants}
		>
			<motion.div
				className={twMerge(
					"pointer-events-none h-2 w-2 rounded-full bg-backgroundBlack",
				)}
				animate={
					isHovered
						? secondaryVariant.hover
						: isActive
							? "active"
							: "hoverInitial"
				}
				initial="hoverInitial"
				variants={secondaryVariant}
			></motion.div>

			<motion.div
				className="z-[2] text-[0.6rem] md:text-base"
				animate={
					isHovered
						? primaryVariant.hover
						: isActive
							? "active"
							: "hoverInitial"
				}
				initial="hoverInitial"
				variants={primaryVariant}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default CreativeButton;
