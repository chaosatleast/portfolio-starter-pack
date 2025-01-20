"use client";

import { motion } from "framer-motion";
import React from "react";
import Wrapper from "../Wrapper";
type Props = {
	email: string;
	emailText?: string;
};

function ContactEmailButton({ email, emailText }: Props) {
	const [isHovered, setIsHovered] = React.useState(false);

	const textVariants = {
		initial: {
			backgroundPosition: "100% 0",
		},
		hover: {
			backgroundPosition: "0% 0",
		},
	};

	return (
		<div>
			<Wrapper variant="nav">
				<a href={`mailto:${email}`}>
					<motion.div
						className="relative h-full w-full after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-colors-vibrant-yellow after:transition-all after:duration-300 after:ease-in-out after:content-[''] hover:after:w-full after:md:bottom-4"
						onHoverStart={() => setIsHovered(true)}
						onHoverEnd={() => setIsHovered(false)}
					>
						<motion.h1
							className="h-full text-[1.75rem] font-black md:text-[3.75rem] lg:text-[4.75rem] xl:text-[5rem]"
							style={{
								background:
									"linear-gradient(to right, var(--vibrant-yellow) 50%, var(--white-100) 50%)",
								backgroundSize: "200% 100%",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
								color: "transparent",
							}}
							variants={textVariants}
							initial="initial"
							animate={isHovered ? "hover" : "initial"}
						>
							{emailText}
						</motion.h1>
					</motion.div>
				</a>
			</Wrapper>
		</div>
	);
}

export default ContactEmailButton;
