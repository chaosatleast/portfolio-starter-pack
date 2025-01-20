"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { createContext } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	children: React.ReactNode;
};

type CursorContextType = {
	content: string;
	variants: "default" | "nav" | "hover";
	setContent?: (content: string) => void; // Type the argument accordingly
	setVariants?: (variants: "default" | "nav" | "hover") => void; // Type the argument accordingly
};

export const CursorContext = createContext<CursorContextType>({
	content: "",
	variants: "default",
});

const CursorEffect: React.FC<Props> = ({ children }: Props) => {
	const [content, setContent] = React.useState<string>("");
	const [variants, setVariants] = React.useState<"default" | "nav" | "hover">(
		"default",
	);

	React.useEffect(() => {
		const updateCursorPosition = (e: MouseEvent) => {
			cursor.x.set(e.clientX);
			cursor.y.set(e.clientY);
		};

		window.addEventListener("mousemove", updateCursorPosition);

		return () => {
			window.removeEventListener("mousemove", updateCursorPosition);
		};
	}, []);

	const cursor = {
		x: useMotionValue(0),
		y: useMotionValue(0),
	};

	const smoothCursor = {
		x: useSpring(cursor.x, { stiffness: 400, damping: 40 }),
		y: useSpring(cursor.y, { stiffness: 400, damping: 40 }),
	};

	const cursorVariants = {
		hover: {
			width: 100,
			height: 100,
		},
		default: {
			width: 32,
			height: 32,
		},
		nav: {
			width: 60,
			height: 60,
		},
	};

	const contentVariants = {
		hover: {
			width: "100%",
			height: "100%",
			scale: 1.2,
			// background: "rgba(255, 255, 255, 0)",
			borderRadius: "50%",
			boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
			backdropFilter: "blur(9.1px)",
			WebkitBackdropFilter: "blur(9.1px)",
		},
		default: {
			width: "100%",
			height: "100%",
			background: "transparent",
			rotate: 360,
			transition: {
				rotate: {
					duration: 3,
					repeat: Infinity,
				},
			},
		},

		nav: {
			width: "100%",
			height: "100%",
			background: "transparent",
			transition: {},
		},
	};

	// Pathname check
	const pathname = usePathname();
	if (pathname.includes("/admin")) return <>{children}</>;

	return (
		<CursorContext.Provider
			value={{
				content,
				variants,
				setContent,
				setVariants,
			}}
		>
			<div className="">
				<motion.div
					style={{ left: smoothCursor.x, top: smoothCursor.y }}
					className="pointer-events-auto fixed z-[100] h-10 w-10 rounded-full border-[.5px] border-colors-mint-green text-sm text-colors-white-100"
					variants={cursorVariants}
					animate={variants}
				>
					<motion.div
						className={twMerge(
							"pointer-events-none flex items-center justify-center bg-black bg-opacity-50",
							`${
								variants == "default"
									? `after:absolute after:-top-1 after:left-2 after:h-[0.5rem] after:w-[0.5rem] after:rounded-full after:bg-colors-vibrant-yellow after:transition-all after:duration-300 after:ease-in-out after:content-['']`
									: variants == "nav"
										? `after:absolute after:-top-4 after:left-1 after:h-[0.5rem] after:w-[0.5rem] after:rounded-full after:bg-colors-vibrant-yellow after:transition-all after:duration-300 after:ease-in-out after:content-['']`
										: ""
							}`,
						)}
						variants={contentVariants}
						animate={variants}
						style={{}}
					>
						{content}
					</motion.div>
				</motion.div>
				{children}
			</div>
		</CursorContext.Provider>
	);
};

export default CursorEffect;
