"use client";

import React from "react";
import { CursorContext } from "./CursorEffect";

type Props = {
	children: React.ReactNode;
	text?: string;
	variant?: "default" | "nav" | "hover";
};

const Wrapper: React.FC<Props> = ({
	children,
	text,
	variant = "hover",
}: Props) => {
	const { setContent, setVariants } = React.useContext(CursorContext);

	if (!setContent || !setVariants) return null;

	return (
		<div
			className=""
			onMouseEnter={() => {
				console.log("On mouse enter");
				if (text) {
					setContent(text);
					setVariants(variant);
				} else {
					setContent("");
					setVariants(variant);
				}
			}}
			onMouseLeave={() => {
				console.log("On mouse leave");
				setContent("");
				setVariants("default");
			}}
			onMouseDown={() => {
				console.log("On mouse down");
				setContent("");
				setVariants("default");
			}}
		>
			{children}
		</div>
	);
};

export default Wrapper;
