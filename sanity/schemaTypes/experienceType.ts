import { defineField, defineType } from "sanity";

export const experienceType = defineType({
    name: "experience",
    title: "Experiences",
    type: "document",
    fields: [
        defineField({
            name: "order",
            title: "Order",
            type: "number",
        }),
        defineField({
            name: "position",
            title: "Position",
            type: "string",
        }),
        defineField({
            name: "company",
            title: "Company",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "blockContent",
        }),
        defineField({
            name: "startingPeriod",
            title: "Starting Period",
            type: "string",
        }),
        defineField({
            name: "endingPeriod",
            title: "Ending Period",
            type: "string",
        }),
    ],
});
