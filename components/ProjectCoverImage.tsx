"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function ProjectCoverImage({ image }: { image: SanityImage }) {
    console.log(`--- image ---`, image);
    return (
        <motion.div
            className="relative h-full w-full"
            initial={{
                scale: 1.3,
            }}
        >
            <Image
                src={image.asset.url}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
            />
        </motion.div>
    );
}

export default ProjectCoverImage;
