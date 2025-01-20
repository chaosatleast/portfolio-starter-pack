export const splitType = (textType: string) => {
	if (textType === "line") {
		return "lines";
	} else {
		return "words,chars";
	}
};
