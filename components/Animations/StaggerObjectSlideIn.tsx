"use client";

import { inView, motion, useAnimate, useInView } from "framer-motion";
import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
    staggerAmount?: number;
};

function StaggerObjectSlideIn({ children, className, staggerAmount }: Props) {
    const [scope, animate] = useAnimate();

    const isInView = useInView(scope, {
        once: true,
    });

    React.useEffect(() => {
        if (!scope.current) return;

        if (className && staggerAmount) {
            const elements = scope.current.querySelectorAll(`.${className}`);

            elements.forEach((element: any, index: number) => {
                inView(
                    element,
                    (info) => {
                        animate(
                            info.target,
                            {
                                y: [30, 0],
                                opacity: [0, 1],
                            },
                            {
                                duration: 0.5,
                                ease: "easeInOut",
                                delay: index * staggerAmount,
                            },
                        );
                    },
                    { margin: "0px 100px 0px 0px" },
                );
            });
        } else {
            if (isInView && !className) {
                animate(
                    scope.current,
                    {
                        y: [30, 0],
                        opacity: [0, 1],
                    },
                    {
                        duration: 0.5,
                        ease: "easeInOut",
                    },
                );
            }
        }
    }, [isInView]);
    return (
        <motion.div className="object-slide-in" ref={scope}>
            {children}
        </motion.div>
    );
}

export default StaggerObjectSlideIn;
