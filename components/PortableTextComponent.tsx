import { PortableTextComponents } from "@portabletext/react";

export const headerComponents: PortableTextComponents = {
    marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        strong: ({ children }) => (
            <strong className="font-bold text-colors-white-100">
                {children}{" "}
            </strong>
        ),
    },
    block: {
        normal: ({ children }) => (
            <span className="font-normal text-colors-white-200">
                {children}{" "}
            </span>
        ),
    },
};

export const bodyComponents: PortableTextComponents = {
    marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        strong: ({ children }) => (
            <strong className="font-medium text-colors-white-100">
                {children}
            </strong>
        ),
    },
    block: {
        normal: ({ children }) => (
            <span className="text-colors-white-400">{children} </span>
        ),
    },
};

export const commonComponents: PortableTextComponents = {
    marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        strong: ({ children }) => (
            <strong className="font-bold text-colors-white-100">
                {children}
            </strong>
        ),
    },
    block: {
        normal: ({ children }) => (
            <span className="font-light text-colors-white-400">
                {children}{" "}
            </span>
        ),
    },
};
