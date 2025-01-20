import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                foregroundSkyBlue: "#0ae1f5",
                backgroundBlack: "var(--background-black)",
                colors: {
                    white: {
                        100: "#f2f1f0",
                        200: "#d9d5d2",
                        300: "#d9d9d9",
                        400: "#cccccc",
                    },
                    gray: {
                        100: "#737272",
                        200: "#a6a6a6",
                        300: "#403f3e",
                        400: "#262626",
                    },
                    yellowish: "#d9b282",
                    "vibrant-yellow": "#e6f285",
                    "watermelon-pink": "#d9597b",
                    "mint-green": "#c9d9c5",
                    "cloudy-blue": "#e4eaf2",
                },
            },
            fontFamily: {
                inter: ["var(--font-inter)"],
                bigShouldersText: ["var(--font-bigShouldersText)"],
                montserrat: ["var(--font-montserrat)"],
                playfairDisplay: ["var(--font-playfairDisplay)"],
                roboto: ["var(--font-roboto)"],
                workSans: ["var(--font-workSans)"],
                poppins: ["var(--font-poppins)"],
            },
        },
    },
    plugins: [],
};
export default config;
