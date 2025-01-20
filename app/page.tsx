import About from "@/components/About";
import Contact from "@/components/Contact";
import Landing1 from "@/components/Landing1";

import Project1 from "@/components/Project1";
import Skill1 from "@/components/Skill1";
import {
    getAboutMePageSettings,
    getContact,
    getExperiences,
    getPagesHeader,
    getProject,
    getSkills,
} from "@/sanity/lib/actions";

async function Page() {
    const projects = await getProject();
    const contacts = await getContact();
    const skills = await getSkills();
    const experience = await getExperiences();

    const aboutMeSettings = await getAboutMePageSettings();

    const pageSettings = await getPagesHeader();

    console.log(`--- aboutMeSettings ---`, aboutMeSettings);
    return (
        <div className="">
            <div className="" id="">
                <div
                    className="mx-5 h-screen max-h-[55rem] pb-24 pt-16 md:mx-0 md:pb-12 md:pt-24"
                    id="home"
                >
                    <Landing1
                        image={aboutMeSettings[0].image}
                        name={aboutMeSettings[0].name}
                        positionSeekingFor={
                            aboutMeSettings[0].positionSeekingFor
                        }
                    />
                </div>
                <div
                    className="flex h-full min-h-[60vh] items-center justify-center px-5 pt-16 md:px-16 md:pt-16 lg:px-32 lg:pt-48"
                    id="about"
                >
                    <About
                        headerContent={aboutMeSettings[0].headerContent}
                        bodyContent={aboutMeSettings[0].bodyContent}
                        experiences={experience}
                    />
                </div>
                <div
                    className="flex h-full items-center justify-center px-5 pt-12 md:max-h-[60vh] md:px-16 md:pt-16 lg:px-32 lg:pt-48"
                    id="skills"
                >
                    <Skill1
                        skills={skills}
                        skillsHeaderContent={
                            pageSettings[0].skillsHeaderContent
                        }
                    />
                </div>
                <div
                    className="flex h-full min-h-[60vh] items-center justify-center px-5 pt-12 md:px-16 md:pt-16 lg:px-32 lg:pt-48"
                    id="projects"
                >
                    <Project1
                        projects={projects}
                        projectHeaderContent={
                            pageSettings[0].projectsHeaderContent
                        }
                    />
                </div>
                <div
                    className="mx-auto h-[40rem] max-w-screen-2xl px-5 pt-12 md:px-16 md:pt-16 lg:h-[45rem] lg:px-32 lg:pt-24"
                    id="contact"
                >
                    <Contact
                        contactEmail={pageSettings[0].contactEmail}
                        emailText={pageSettings[0].emailText}
                        contacts={contacts}
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;
