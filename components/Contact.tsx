"use client";

import { motion } from "framer-motion";
import { Copyright } from "lucide-react";
import InfiniteMarquee from "./Animations/InfiniteMarquee";
import StaggerObjectSlideIn from "./Animations/StaggerObjectSlideIn";
import TextSlideUp from "./Animations/StaggerText/TextSlideUp";
import ContactButton from "./Buttons/ContactButton";
import ContactEmailButton from "./Buttons/ContactEmailButton";

type Props = {
	contacts: IContact[];
	contactEmail: string;
	isAvailableForWork?: boolean;
	emailText?: string;
};

function Contact({
	contacts,
	contactEmail,
	emailText,
	isAvailableForWork = true,
}: Props) {
	return (
		<div className="h-full w-full font-roboto">
			<div className="h-full overflow-hidden rounded-2xl border border-colors-gray-400">
				<InfiniteMarquee text="Let's Talk" />
				<div className="flex h-[16rem] flex-col justify-between lg:h-[20rem]">
					<div className="flex flex-col items-center justify-center gap-y-2 text-colors-white-300">
						<h3 className="texst-center text-[1.15rem] font-light leading-none md:text-[2rem]">
							<TextSlideUp
								textType="char"
								staggerAmount={1 / Math.pow(10, 2)}
							>
								Looking for new talent?
							</TextSlideUp>
						</h3>
						<StaggerObjectSlideIn>
							<ContactEmailButton
								emailText={emailText}
								email={contactEmail}
							/>
						</StaggerObjectSlideIn>
					</div>
					<div className="flex h-full items-end justify-center gap-y-2">
						<div className="flex flex-col items-center justify-center">
							<h4 className="text-[0.75rem] font-thin md:text-[1rem]">
								<TextSlideUp
									textType="char"
									staggerAmount={1 / Math.pow(10, 2)}
								>
									You can also find me on,
								</TextSlideUp>
							</h4>

							<StaggerObjectSlideIn
								className="contact-button"
								staggerAmount={1 / Math.pow(3, 2)}
							>
								<div className="flex flex-wrap gap-3 pt-4">
									{contacts.map((contact) => (
										<>
											<div className="contact-button">
												<ContactButton
													key={contact._id}
													{...contact}
												/>
											</div>
										</>
									))}
								</div>
							</StaggerObjectSlideIn>
						</div>
					</div>
					<div className="flex h-48 items-end justify-center">
						<div className="relative flex items-center justify-center text-colors-white-300">
							<div className="relative flex h-7 w-8 items-center justify-center">
								<motion.div className="absolute z-[2] h-1.5 w-1.5 rounded-full bg-colors-vibrant-yellow"></motion.div>

								{/* First Pulse */}
								<motion.div
									className="absolute z-[2] h-1.5 w-1.5 rounded-full bg-colors-vibrant-yellow"
									animate={{
										scale: [1.0, 2.0, 1.0],
										opacity: [0.6, 0.4, 0.2],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								></motion.div>
								{/* Second Pulse */}
								<motion.div
									className="absolute z-0 h-3 w-3 rounded-full border border-colors-vibrant-yellow bg-backgroundBlack"
									animate={{
										scale: [1, 1.75, 1],
										opacity: [1, 0.5, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut",
										repeatType: "reverse",
									}}
								></motion.div>
							</div>

							<span className="inline text-[1rem] font-thin md:text-[1.15rem]">
								<TextSlideUp
									textType="char"
									staggerAmount={1 / Math.pow(10, 2)}
								>
									Available for Full-Time Position
								</TextSlideUp>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="flex h-16 items-center justify-center">
				<div className="text-colors-gray-200">
					<Copyright
						strokeWidth={1}
						size={14}
						className="mb-0.5 mr-1 inline"
					/>
					<span className="text-sm font-normal">
						Alice Chin Xin Yi 2024. All rights reserved.
					</span>
				</div>
			</div>
		</div>
	);
}

export default Contact;
