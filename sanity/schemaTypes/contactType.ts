import { defineField, defineType } from "sanity";

export const contactType = defineType({
    name: "contact",
    title: "Contact",
    type: "document",
    fields: [
        defineField({
            name: "platform",
            title: "Platform",
            type: "string",
        }),
        defineField({
            name: "url",
            title: "Url",
            type: "string",
        }),
        
    ],
});
