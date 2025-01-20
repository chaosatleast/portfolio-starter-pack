"use client";
import {
    motion,
    useAnimationFrame,
    useInView,
    useMotionValue,
} from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

function InfiniteMarquee({ text }: { text: string }) {
    const marqueeRef = useRef<HTMLDivElement>(null); // Main container
    const item1Ref = useRef<HTMLDivElement>(null); // First content block
    const item2Ref = useRef<HTMLDivElement>(null); // Second content block
    const x1 = useMotionValue(0); // Position of the first content block
    const x2 = useMotionValue(0); // Position of the second content block
    const [itemWidth, setItemWidth] = useState(0); // Dynamically store content width
    const speed = 1; // Scrolling speed

    const isInView = useInView(marqueeRef);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (!item2Ref.current) return;
    //         const item2Left = item2Ref.current.offsetLeft;
    //         console.log("x2:", x2.get(), "item2Left:", item2Left);
    //         console.log("X1", x1.get());
    //     }, 1000); // Log every 5 seconds

    //     return () => clearInterval(interval); // Clean up on component unmount
    // }, [x2, itemWidth]);

    // Main animation loop
    useAnimationFrame(() => {
        if (!isInView || !item1Ref.current || !item2Ref.current) return;

        console.log("Marquee is in view");
        const item2Left = item2Ref.current.offsetLeft;
        // Move content blocks every frame
        x1.set(x1.get() + speed * -1); // Move the first block to the left
        x2.set(x2.get() - speed); // Move the second block to the left
        // When the first block runs out of the viewport, connect it to the back of the second block
        if (x1.get() < -item2Left) {
            x1.set(item2Left + 10);
        }

        // When the second block runs out of the viewport, connect it to the back of the first block
        if (x2.get() < -item2Left * 2) {
            x2.set(x1.get());
        }
    });

    return (
        <motion.div
            ref={marqueeRef}
            className="relative flex w-full overflow-hidden whitespace-nowrap"
        >
            {/* First content block */}
            <motion.div
                ref={item1Ref}
                className="inline-block pr-10 text-[12rem] font-black uppercase text-white text-opacity-10"
                style={{
                    translateX: x1, // Dynamically update position based on x1
                }}
            >
                {text}
            </motion.div>

            {/* Second content block */}
            <motion.div
                ref={item2Ref}
                className="inline-block pr-10 text-[12rem] font-black uppercase text-white text-opacity-10"
                style={{
                    translateX: x2, // Dynamically update position based on x2
                }}
            >
                {text}
            </motion.div>
        </motion.div>
    );
}

export default InfiniteMarquee;
