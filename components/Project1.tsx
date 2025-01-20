import { PortableText } from "next-sanity";
import { TypedObject } from "sanity";
import ProjectCard from "./Cards/ProjectCard";
import { commonComponents } from "./PortableTextComponent";
import TextSlideUp from "./Animations/StaggerText/TextSlideUp";
import TextSlideDown from "./Animations/StaggerText/TextSlideDown";
import StaggerObjectSlideIn from "./Animations/StaggerObjectSlideIn";

type Props = {
    projects: Project[];
    projectHeaderContent: TypedObject[];
};

function Project1({ projects, projectHeaderContent }: Props) {
    const showingProjects = projects.filter((project) => project.isDisplay);
    console.log(`showingProjects`, showingProjects);
    return (
        <div className="mx-auto h-auto w-auto max-w-7xl font-inter">
            <div className="grid w-full grid-cols-12 space-y-6 md:space-y-1">
                <div className="col-span-12 flex w-full items-start justify-start md:col-span-5 lg:col-span-3">
                    <h1 className="text-nowrap text-3xl font-bold text-colors-white-100 lg:text-4xl">
                        <TextSlideDown
                            textType="char"
                            staggerAmount={1 / Math.pow(6, 2)}
                        >
                            Projects <br /> I've Built{" "}
                            <span className="text-xl font-medium">
                                /(
                                {showingProjects.length})
                            </span>
                        </TextSlideDown>
                    </h1>
                </div>
                <div className="col-span-12 font-inter text-lg font-thin md:col-span-7 lg:col-span-9 lg:text-xl xl:text-2xl">
                    <TextSlideUp
                        textType="word"
                        staggerAmount={1 / Math.pow(8, 2)}
                    >
                        <PortableText
                            value={projectHeaderContent}
                            components={commonComponents}
                        />
                    </TextSlideUp>
                </div>
                <div className="col-span-2"></div>
                <div className="col-span-12 max-w-screen-sm pt-10 text-base md:max-w-screen-md md:text-lg lg:col-span-10 lg:max-w-screen-lg xl:max-w-screen-xl xl:text-xl 2xl:max-w-screen-2xl">
                    <StaggerObjectSlideIn
                        className="project-card"
                        staggerAmount={0.05}
                    >
                        <div className="mx-auto grid grid-cols-1 gap-5 pt-10 md:grid-cols-2">
                            {showingProjects.map((project) => (
                                <>
                                    <div className="project-card">
                                        <ProjectCard
                                            image={project.coverImage}
                                            title={project.title}
                                            _id={project._id}
                                            slug={project.slug.current}
                                        />
                                    </div>
                                </>
                            ))}
                        </div>
                    </StaggerObjectSlideIn>
                </div>
            </div>
        </div>
    );
}

export default Project1;
