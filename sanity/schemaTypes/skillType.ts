import { SparklesIcon, TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const skillType = defineType({
	name: "skill",
	title: "Skills",
	type: "document",
	icon: SparklesIcon,
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
			fields: [
				{
					name: "alt",
					title: "Alt",
					type: "string",
				},
			],
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "string",
			options: {
				list: [
					{ title: "Workflow", value: "workflow" },
					{ title: "Framework", value: "framework" },
					{ title: "Testing", value: "testing" },
					{ title: "Design", value: "design" },
					{ title: "Library", value: "library" },
					{ title: "Tool", value: "tool" },
					{ title: "Coding", value: "coding" },
					{ title: "Database", value: "database" },
				],
			},
		}),
		defineField({
			name: "familiarity",
			title: "Familiarity",
			type: "number",
			validation: (rule: any) => [
				rule.min(0).error("Min input should not less than 0 "),
				rule.max(100).warning("Max input should not greater than 100"),
			],
		}),
		defineField({
			name: "isDisplay",
			title: "To be display",
			type: "boolean",
		}),
	],
});
