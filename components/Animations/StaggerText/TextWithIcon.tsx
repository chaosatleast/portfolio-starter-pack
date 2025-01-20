"use client";

import React from "react";
import { delay, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { init } from "next/dist/compiled/webpack/webpack";

// Define animation variants
// const underlineVariants = {
// 	initial: {
// 		backgroundPosition: "100% 0",
// 	},
// 	hover: {
// 		backgroundPosition: "0% 0",
// 	},
// };

const iconVariants = {
	initial: {
		opacity: 0,
		scale: 0,
		y: 10,
		x: -10,
	},
	hover: {
		x: 1,
		y: 1,
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.5,
			delay: 0.1,
		},
	},
};

type Props = {
	children: React.ReactNode;
	icon: React.ReactNode;
};

const TextWithIcon: React.FC<Props> = ({ children, icon }) => {
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<motion.div
			className="relative flex h-full w-full items-center"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* <motion.div
				className="h-0.5 w-full absolute bottom-1 "
				style={{
					background:
						"linear-gradient(to right, var(--white-300) 50%, transparent 50%)",
					backgroundSize: "200% 100%",
					backgroundPosition: "100% 0",
				}}
				variants={underlineVariants}
				initial="initial"
				animate={isHovered ? "hover" : "initial"}
				transition={{ duration: 0.5 }}
			></motion.div> */}
			{children}
			<motion.div
				initial="initial"
				animate={isHovered ? "hover" : "initial"}
				variants={iconVariants}
			>
				{icon}
			</motion.div>
		</motion.div>
	);
};

export default TextWithIcon;
