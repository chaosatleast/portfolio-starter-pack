"use client";
import React from "react";

type Props = {
	x: number;
	y: number;
};

const useCursor = () => {
	const [cursorPosition, setCursorPosition] = React.useState<Props>({
		x: 0,
		y: 0,
	});

	React.useEffect(() => {
		const updateCursorPosition = (e: MouseEvent) => {
			setCursorPosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", updateCursorPosition);

		return () => {
			window.removeEventListener("mousemove", updateCursorPosition);
		};
	}, []);

	return cursorPosition;
};

export default useCursor;
