import { defineType, defineArrayMember, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const settingType = defineType({
    title: "Settings",
    name: "settings",
    type: "document",
    fields: [
        // defineField({
        // 	name: "bio",
        // 	title: "Bio",
        // 	type: "array",
        // 	of: [
        // 		defineArrayMember({
        // 			type: "block",
        // 			styles: [{ title: "Normal", value: "normal" }],
        // 			lists: [],
        // 		}),
        // 	],
        // }),

        defineField({
            title: "Projects Header Content",
            name: "projectsHeaderContent",
            type: "array",
            of: [
                defineArrayMember({
                    type: "block",
                    // Styles let you define what blocks can be marked up as. The default
                    // set corresponds with HTML tags, but you can set any title or value
                    // you want, and decide how you want to deal with it where you want to
                    // use your content.
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H1", value: "h1" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "H4", value: "h4" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [{ title: "Bullet", value: "bullet" }],
                    // Marks let you mark up inline text in the Portable Text Editor
                    marks: {
                        // Decorators usually describe a single property – e.g. a typographic
                        // preference or highlighting
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                            { title: "Code", value: "code" },
                            { title: "Underline", value: "underline" },
                            { title: "Strike", value: "strike-through" },
                        ],
                        // Annotations can be any object structure – e.g. a link or a footnote.
                        annotations: [
                            {
                                title: "URL",
                                name: "link",
                                type: "object",
                                fields: [
                                    {
                                        title: "URL",
                                        name: "href",
                                        type: "url",
                                    },
                                ],
                            },
                        ],
                    },
                }),
                // You can add additional types here. Note that you can't use
                // primitive types such as 'string' and 'number' in the same array
                // as a block type.
                defineArrayMember({
                    type: "image",
                    icon: ImageIcon,
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alternative Text",
                        },
                    ],
                }),
            ],
        }),

        defineField({
            title: "Skills Header Content",
            name: "skillsHeaderContent",
            type: "array",
            of: [
                defineArrayMember({
                    type: "block",
                    // Styles let you define what blocks can be marked up as. The default
                    // set corresponds with HTML tags, but you can set any title or value
                    // you want, and decide how you want to deal with it where you want to
                    // use your content.
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H1", value: "h1" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "H4", value: "h4" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [{ title: "Bullet", value: "bullet" }],
                    // Marks let you mark up inline text in the Portable Text Editor
                    marks: {
                        // Decorators usually describe a single property – e.g. a typographic
                        // preference or highlighting
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                            { title: "Code", value: "code" },
                            { title: "Underline", value: "underline" },
                            { title: "Strike", value: "strike-through" },
                        ],
                        // Annotations can be any object structure – e.g. a link or a footnote.
                        annotations: [
                            {
                                title: "URL",
                                name: "link",
                                type: "object",
                                fields: [
                                    {
                                        title: "URL",
                                        name: "href",
                                        type: "url",
                                    },
                                ],
                            },
                        ],
                    },
                }),
                // You can add additional types here. Note that you can't use
                // primitive types such as 'string' and 'number' in the same array
                // as a block type.
                defineArrayMember({
                    type: "image",
                    icon: ImageIcon,
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alternative Text",
                        },
                    ],
                }),
            ],
        }),

        defineField({
            name: "resume",
            title: "Resume",
            type: "file",
            options: {
                accept: "application/pdf", // restrict to only PDFs
            },
        }),
        defineField({
            name: "contactEmail",
            title: "Contact Email",
            type: "string",
            validation: (Rule) =>
                Rule.regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
                    name: "email", // Error message name
                    invert: false, // Set `true` to allow pattern mismatch
                }).error("Please enter a valid email address."),
        }),
        defineField({
            name: "emailText",
            title: "Email Text",
            type: "string",
        }),
        defineField({
            name: "blogUrl",
            title: "Blog Url",
            type: "string",
        }),
    ],
});
