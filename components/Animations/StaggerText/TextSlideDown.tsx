"use client";

import { splitType } from "@/sanity/lib/helper";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import React, { useEffect } from "react";
import SplitType from "split-type";

type Props = {
    children: React.ReactNode;
    textType: "line" | "word" | "char";
    staggerAmount?: number;
};

function TextSlideDown({ children, textType, staggerAmount }: Props) {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope, { once: true });

    const staggerMenuItems = stagger(staggerAmount, {
        ease: (p) => Math.sin(p),
    });

    React.useEffect(() => {
        if (!scope.current) return;

        if (isInView) {
            const textSplit: SplitType = new SplitType(scope.current, {
                types: splitType(textType),
            });

            if (textSplit?.words || textSplit?.chars || textSplit?.lines) {
                animate(
                    `.${textType}`,
                    { opacity: [0, 1], y: [-20, 0] },
                    {
                        duration: 0.2,
                        ease: "linear",
                        delay: staggerMenuItems,
                    },
                );
            }
        }
    }, [isInView]);

    return (
        <div>
            <motion.div className="text" ref={scope}>
                {children}
            </motion.div>
        </div>
    );
}

export default TextSlideDown;
