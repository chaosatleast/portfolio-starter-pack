import {
  Big_Shoulders_Text,
  Inter,
  Montserrat,
  Playfair_Display,
  Poppins,
  Roboto,
  Ubuntu_Mono,
  Work_Sans,
} from "next/font/google";

export const inter_init = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const bigShouldersText_init = Big_Shoulders_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bigShouldersText",
});

export const montserrat_init = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const workSans_init = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-workSans",
});

export const poppins_init = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const playfairDisplay_init = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfairDisplay",
});

export const roboto_init = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});
