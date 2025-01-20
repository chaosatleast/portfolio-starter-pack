import { defineField, defineType } from "sanity";
import { apiVersion } from "../env";

export const projectType = defineType({
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
        defineField({
            name: "order",
            title: "Order",
            type: "number",
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "blockContent",
        }),
        defineField({
            name: "devType",
            title: "Development Type",
            type: "string",
            options: {
                list: [
                    { title: "Web Development", value: "web_dev" },
                    { title: "App Development", value: "app_dev" },
                ],
            },
        }),
        defineField({
            name: "techUsed",
            title: "Tech Used",
            type: "array",
            of: [
                {
                    type: "string",
                    title: "Tech",
                    name: "tech",
                    options: {
                        list: [
                            { title: "NextJS", value: "nextjs" },
                            { title: "TailwindCSS", value: "tailwindCSS" },
                            { title: "Supabase", value: "supabase" },
                            { title: "Spotify API", value: "spotifyAPI" },
                            { title: "Framer Motion", value: "framer_motion" },
                            { title: "Stepzen", value: "stepzen" },
                            { title: "Mediastack API", value: "mediastck_api" },
                            {
                                title: "Open-Meteo API",
                                value: "open_meteo_api",
                            },
                            { title: "NextUI", value: "nextui" },
                            { title: "Typescript", value: "typescript" },
                            { title: "Vercel", value: "vercel" },
                            { title: "Sanity.io", value: "sanityio" },
                            { title: "Postgres SQL", value: "postgreSQL" },
                            { title: "React Three Fiber", value: "r3f" },
                            { title: "React", value: "react" },
                            { title: "StripeJS", value: "stripejs" },
                            { title: "LangChain", value: "langchain" },
                            { title: "Pinecone", value: "pinecone" },
                            { title: "OpenAi", value: "open_ai" },
                            { title: "Firebase", value: "firebase" },
                            { title: "GSAP", value: "gsap" },
                            { title: "MatterJS", value: "matterjs" },
                            { title: "Apollo Client", value: "apollo_client" },
                            { title: "GraphQL", value: "graphql" },
                            { title: "P5.js", value: "p5js" },
                        ],
                    },
                },
            ],
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", title: "Alt", type: "string" }],
        }),
        defineField({
            name: "screenshots",
            title: "Screenshots",
            type: "array",
            of: [
                {
                    name: "image",
                    type: "image",
                    title: "Image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alternative text",
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: "demoUrl",
            title: "Demo Url",
            type: "string",
        }),
        defineField({
            name: "sourceCodeUrl",
            title: "Source Code Url",
            type: "string",
        }),
        defineField({
            name: "isDisplay",
            title: "To be display",
            type: "boolean",
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                isUnique: async (slug, context) => {
                    // Search for all documents with the same slug
                    const query = `*[_type == "projects" && slug.current == $slug]`;

                    const documents = await context
                        .getClient({ apiVersion })
                        .fetch<IProject[]>(query, {
                            slug,
                        });
                    // Returns true if no documents are found, false otherwise
                    return documents.length <= 1;
                },
            },
        }),
    ],
});
