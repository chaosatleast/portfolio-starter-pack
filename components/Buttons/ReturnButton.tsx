"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
    pathnames: string;
};

const textVariants = {
    initial: {
        opacity: 1,
    },
    hover: {
        opacity: 0.7,
    },
};

const iconVariants = {
    initial: {
        opacity: 1,
    },
    hover: {
        opacity: [0.5, 0],
    },
};

const icon2Variants = {
    initial: {
        opacity: 0,
        left: 10,
        display: "none",
    },
    hover: {
        display: "block",
        left: 0,
        opacity: [0, 0.7],
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const ReturnButton = ({ pathnames }: Props) => {
    const router = useRouter();

    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            onClick={() => router.push(pathnames)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div className="flex items-center">
                <motion.div className="relative flex w-fit text-colors-white-100">
                    <motion.div
                        variants={iconVariants}
                        animate={isHovered ? "hover" : "initial"}
                        initial="initial"
                    >
                        <ArrowLeft className="mb-1 mr-1 inline-block h-[1rem] w-[1rem]" />
                    </motion.div>
                    <motion.div
                        variants={icon2Variants}
                        animate={isHovered ? "hover" : "initial"}
                        initial="initial"
                        className="absolute"
                    >
                        <ArrowLeft className="mb-1 mr-1 inline-block h-[1rem] w-[1rem]" />
                    </motion.div>
                    <motion.div
                        className="inline"
                        variants={textVariants}
                        animate={isHovered ? "hover" : "initial"}
                        initial="initial"
                    >
                        Back
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ReturnButton;
