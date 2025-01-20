"use client";
import { useInView } from "framer-motion";
import React from "react";
import PhotoScene from "./Scene/PhotoScene";
import { set } from "sanity";

type Props = {
	url: string;
};

function CreativeImageReveal({ url }: Props) {
	const containerRef = React.useRef<HTMLDivElement>(null);

	const containerInView = useInView(containerRef, { once: true });

	const [isInView, setIsInView] = React.useState(false);

	React.useEffect(() => {
		if (containerInView) {
			console.log("containerInView", containerInView);
			setIsInView(true);
		}
	}, [containerInView]);
	return (
		<div
			className="h-full w-full"
			ref={containerRef}
		>
			<PhotoScene
				photoUrl={url}
				isInView={isInView}
			/>
		</div>
	);
}

export default CreativeImageReveal;
