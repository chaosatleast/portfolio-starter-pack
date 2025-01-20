import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title("Alice's Portfolio")
        .items([
            S.documentTypeListItem("skill").title("Skills"),
            S.documentTypeListItem("experience").title("Experiences"),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("contact").title("Contacts"),
            S.listItem()
                .title("About Me Settings")
                .child(
                    S.document().schemaType("aboutMe").documentId("aboutMe"),
                ),
            S.listItem()
                .title("Other Settings")
                .child(
                    S.document().schemaType("settings").documentId("settings"),
                ),
            S.divider(),
            ...S.documentTypeListItems().filter(
                (item) =>
                    item.getId() &&
                    ![
                        "skill",
                        "experience",
                        "project",
                        "contact",
                        "aboutMe",
                        "settings",
                    ].includes(item.getId()!),
            ),
        ]);
