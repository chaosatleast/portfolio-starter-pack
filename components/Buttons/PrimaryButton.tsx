"use client";
import { color, motion } from "framer-motion";
import Wrapper from "../Wrapper";

export default function PrimaryButton({
	children,
	disabled = false,
	clickFunc,
}: {
	children: React.ReactNode;
	disabled?: boolean;
	clickFunc?: () => void;
}) {
	const variants = {
		disabled: {
			opacity: 0.5,
			cursor: "not-allowed",
			color: "var(--white-200)",
			border: "1px solid var(--white-200)",
			backgroundColor: "transparent",
			borderRadius: "0.5rem",
		},
		primary: {
			opacity: 1,
			color: "var(--white-200)",
			border: "1px solid var(--white-200)",
			backgroundColor: "transparent",
			borderRadius: "0.5rem",
		},

		hover: {
			opacity: 1,
			color: "var(--background-black)",
			backgroundColor: "var(--white-200)",
		},
	};

	return (
		<Wrapper variant="nav">
			{" "}
			<motion.button
				initial={disabled ? "disabled" : "primary"}
				variants={variants}
				whileHover={disabled ? "disabled" : "hover"}
				transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
				className="px-2 py-1 md:px-3 md:py-2"
				disabled={disabled}
				onClick={() => {
					console.log("Button clicked");
					if (clickFunc) clickFunc();
				}}
			>
				<div className="flex items-center justify-center">{children}</div>
			</motion.button>
		</Wrapper>
	);
}
