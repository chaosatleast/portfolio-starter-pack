import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { skillType } from "./skillType";
import { experienceType } from "./experienceType";
import { projectType } from "./projectType";
import { contactType } from "./contactType";
import { aboutMeType } from "./aboutMeTypes";
import { settingType } from "./settingType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        blockContentType,
        skillType,
        experienceType,
        projectType,
        contactType,
        aboutMeType,
        settingType,
    ],
};
