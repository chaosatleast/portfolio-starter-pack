"use client";
import TextWithIcon from "@/components/Animations/StaggerText/TextWithIcon";
import CreativeButton from "@/components/Buttons/CreativeButton";
import Wrapper from "@/components/Wrapper";
import { cubicBezier, motion } from "framer-motion";
import { ArrowUpRight, MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function SidebarNav({ blogUrl }: { blogUrl: string }) {
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
	const [activeSection, setActiveSection] = React.useState("");
	const router = useRouter();
	const pathname = usePathname();

	const sidebarVariants = {
		active: {
			width: "100%",
			transition: {
				duration: 0.3,
				ease: cubicBezier(0.25, 0.1, 0.25, 1),
			},
		},

		inactive: {
			width: "0%",
		},
	};

	const variants = {
		active: {
			display: "block",
			opacity: 1,
			scale: 1,
			transition: { duration: 0.3, easings: ["easeInOut"] },
		},
		inactive: { opacity: 0, scale: 0, display: "none" },
		hidden: {
			display: "none",
		},
	};

	const variantsText = {
		active: {
			x: 15,
		},
		inactive: { x: 0 },
	};

	return (
		<Wrapper variant="nav">
			<motion.button
				className="ml-1 flex items-center md:hidden"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			>
				<MenuIcon
					className="h-[1.5rem] w-[1.5rem] text-colors-white-300"
					strokeWidth={1.5}
				/>
			</motion.button>
			<motion.div
				className="absolute right-0 top-0 z-50 flex h-screen w-screen flex-row justify-between"
				animate={isSidebarOpen ? "active" : "inactive"}
				variants={sidebarVariants}
				initial="inactive"
			>
				<motion.div className="h-screen w-[10%] bg-black bg-opacity-80 md:hidden"></motion.div>
				<motion.div className="w-[90%] bg-backgroundBlack px-5 pt-24 md:hidden">
					<motion.div className="flex items-baseline justify-between">
						<div
							className="text-[1.25rem] hover:cursor-pointer"
							onClick={() => {
								router.push("/");
								setIsSidebarOpen(false);
							}}
						>
							<Wrapper variant="nav">
								<div className="text-nowrap">
									<span className="font-black">ALICE</span> / PORTFOLIO24
								</div>
							</Wrapper>{" "}
						</div>
						<motion.button
							onClick={() => {
								setIsSidebarOpen(false);
							}}
						>
							<X
								className="mb-14 h-[3rem] w-[3rem]"
								strokeWidth={1}
							/>
						</motion.button>
					</motion.div>
					<div className="py-10">
						{["About", "Skills", "Projects"].map((item) => (
							<>
								<div
									key={item}
									className="my-auto"
									onClick={() => {
										setActiveSection(item.toLowerCase());
										setIsSidebarOpen(false);

										router.push(`/#${item.toLowerCase()}`);
									}}
								>
									<Wrapper variant="nav">
										<div className="relative">
											<motion.div
												className="absolute top-1/2 h-2 w-2 rounded-full bg-colors-vibrant-yellow"
												animate={
													activeSection == item.toLowerCase()
														? "active"
														: "inactive"
												}
												variants={variants}
												initial="hidden"
											></motion.div>
											<motion.div
												className="text-[3rem]"
												animate={
													activeSection == item.toLowerCase()
														? "active"
														: "inactive"
												}
												variants={variantsText}
												initial="inactive"
											>
												{item}
											</motion.div>
										</div>
									</Wrapper>
								</div>
							</>
						))}
					</div>
					<a
						href={blogUrl}
						rel="noreferrer"
						className="my-auto self-stretch"
					>
						<Wrapper variant="nav">
							<motion.div className="pt-10">
								<TextWithIcon
									icon={
										<>
											<ArrowUpRight
												className="-mb-0.5 inline h-[3rem] w-[3rem]"
												strokeWidth={1.5}
											/>
										</>
									}
								>
									<span className="text-[2.5rem]">Blog</span>
								</TextWithIcon>
							</motion.div>
						</Wrapper>
					</a>
					<Wrapper variant="nav">
						<motion.div className="pt-4">
							<CreativeButton
								onClick={() => {
									router.push("/#contact");
									setActiveSection("contact");
									setIsSidebarOpen(false);
								}}
								isActive={activeSection === "contact"}
							>
								<div className="m-1 text-nowrap text-[1rem] font-medium">
									Contact Me
								</div>
							</CreativeButton>
						</motion.div>
					</Wrapper>
				</motion.div>
			</motion.div>
		</Wrapper>
	);
}

export default SidebarNav;
