"use client";
import TextWithIcon from "@/components/Animations/StaggerText/TextWithIcon";
import CreativeButton from "@/components/Buttons/CreativeButton";
import Wrapper from "@/components/Wrapper";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SidebarNav from "./SidebarNav";
import { get } from "http";
import { getBlogUrl } from "@/sanity/lib/actions";

function Navigation() {
	const pathname = usePathname();
	const router = useRouter();
	const [blogUrl, setBlogUrl] = React.useState("");

	useEffect(() => {
		const fetchBlogUrl = async () => {
			const response = await getBlogUrl();
			setBlogUrl(response[0].blogUrl);
		};
		fetchBlogUrl();
	}, []);

	const [activeSection, setActiveSection] = React.useState("");

	if (pathname.includes("/admin")) return null;

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

	return (
		<header
			className="flex w-full items-center justify-between px-5 py-4 font-roboto font-thin text-colors-white-300"
			style={{
				backgroundColor: "rgba(var(--background-black-rgb),0.4)",
				backdropFilter: "blur(20px)",
			}}
		>
			<div
				className="text-[0.75rem] hover:cursor-pointer md:text-[1.25rem]"
				onClick={() => {
					router.push("/");
				}}
			>
				<Wrapper variant="nav">
					<span className="font-black">ALICE</span> / PORTFOLIO24
				</Wrapper>{" "}
			</div>

			<nav className="flex items-center gap-1 md:gap-4">
				<div className="hidden items-center justify-between gap-8 text-xs font-normal md:flex md:text-[1rem]">
					{["About", "Skills", "Projects"].map((item) => (
						<>
							<Link
								key={item}
								href={`/#${item.toLowerCase()}`}
								className="my-auto self-stretch"
								onClick={() => setActiveSection(item.toLowerCase())}
							>
								<Wrapper variant="nav">
									<div className="relative">
										<motion.div
											className="absolute -top-2 left-1/2 hidden h-1.5 w-1.5 rounded-full bg-colors-vibrant-yellow"
											animate={
												activeSection == item.toLowerCase()
													? "active"
													: "inactive"
											}
											variants={variants}
										></motion.div>
										<div className="">{item}</div>
									</div>
								</Wrapper>
							</Link>
						</>
					))}
				</div>

				<div className="mx-2 hidden items-center justify-center text-xs font-normal md:flex md:text-[1rem]">
					<a
						href={blogUrl}
						rel="noreferrer"
						className="my-auto w-10 self-stretch"
					>
						<Wrapper variant="nav">
							<TextWithIcon
								icon={
									<ArrowUpRight
										className="-mb-0.5 -ml-1 inline h-[2rem] w-[1.5rem]"
										strokeWidth={1.5}
									/>
								}
							>
								<span className="">Blog</span>
							</TextWithIcon>
						</Wrapper>
					</a>
				</div>

				<Wrapper variant="nav">
					<CreativeButton
						onClick={() => {
							setActiveSection("contact");
							router.push("/#contact");
						}}
						isActive={activeSection === "contact"}
					>
						<div className="text-nowrap font-medium">Contact Me</div>
					</CreativeButton>
				</Wrapper>
				<SidebarNav blogUrl={blogUrl} />
			</nav>
		</header>
	);
}

export default Navigation;
