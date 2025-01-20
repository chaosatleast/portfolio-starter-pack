import CursorEffect from "@/components/CursorEffect";
import {
    bigShouldersText_init,
    inter_init,
    montserrat_init,
    playfairDisplay_init,
    poppins_init,
    roboto_init,
    workSans_init,
} from "./font";
import "./globals.css";
import Navigation from "./Navigation";

//!  metadata

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${inter_init.variable} ${poppins_init.variable} ${workSans_init.variable} ${playfairDisplay_init.variable} ${roboto_init.variable} ${bigShouldersText_init.variable} ${montserrat_init.variable} `}
        >
            <body>
                <main
                    className={` ${inter_init.variable} ${workSans_init.variable} ${playfairDisplay_init.variable} ${roboto_init.variable} ${bigShouldersText_init.variable} ${montserrat_init.variable} ${poppins_init.variable} fixed h-full w-screen overflow-y-auto scroll-smooth`}
                >
                    <div className="relative select-none">
                        <CursorEffect>
                            <div className="fixed top-0 z-50 w-full">
                                <Navigation />
                            </div>
                            {children}
                        </CursorEffect>
                    </div>
                </main>
            </body>
        </html>
    );
}
