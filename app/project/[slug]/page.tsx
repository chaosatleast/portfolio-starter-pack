import StaggerObjectSlideIn from "@/components/Animations/StaggerObjectSlideIn";
import TextSlideDown from "@/components/Animations/StaggerText/TextSlideDown";
import { descriptionStyle } from "@/components/BlockContentStyle";
import CreativeOverlayButton from "@/components/Buttons/CreativeOverlayButton";
import ReturnButton from "@/components/Buttons/ReturnButton";
import Wrapper from "@/components/Wrapper";
import { getProjectBySlug } from "@/sanity/lib/actions";
import { DevelopmentType, TechStack } from "@/types/enum";
import { ArrowUpRight } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Props = {
    params: {
        slug: string;
    };
};

async function Page({ params: { slug } }: Props) {
    const project = await getProjectBySlug(slug);
    const foundProject = project && project.length == 1 && project[0];

    console.log(`foundProject`, foundProject);
    return (
        <div className="relative h-full w-full font-roboto">
            {/* Cover Image  */}
            <div className="relative h-64 w-screen overflow-hidden bg-neutral-900 md:h-96">
                {foundProject.coverImage ? (
                    <Image
                        src={foundProject.coverImage.asset.url}
                        alt={foundProject.coverImage.asset.url}
                        fill
                        objectFit="cover"
                        loading="lazy"
                        className="object-center"
                    />
                ) : (
                    <></>
                )}
            </div>
            <div className="flex flex-col gap-y-4 px-5 pb-24 pt-12 md:px-16 md:pt-24 lg:mx-auto lg:max-w-5xl">
                {/* Return Button */}
                <Wrapper variant="nav">
                    <ReturnButton pathnames="/#projects" />
                </Wrapper>
                {/* Project Title */}
                <div className="flex h-full w-full items-center">
                    <div className="w-fit text-colors-vibrant-yellow">
                        <span className="inline text-[2rem] font-black uppercase leading-tight md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]">
                            <TextSlideDown
                                textType="char"
                                staggerAmount={1 / Math.pow(4, 2)}
                            >
                                {foundProject.title}
                            </TextSlideDown>
                        </span>
                    </div>
                </div>
                {/* Buttons */}
                <StaggerObjectSlideIn
                    className="creative-button"
                    staggerAmount={0.1}
                >
                    <div className="flex flex-row flex-wrap gap-x-2 md:gap-x-4">
                        <div className="creative-button">
                            <Wrapper variant="nav">
                                <CreativeOverlayButton
                                    disabled={!foundProject.sourceCodeUrl}
                                >
                                    <a
                                        href={foundProject.sourceCodeUrl}
                                        target="_blank"
                                    >
                                        <div className="">
                                            <span className="inline text-sm font-normal leading-none">
                                                Source Code
                                            </span>
                                            <ArrowUpRight
                                                className="inline-block h-[1rem] w-[1rem] md:h-[1.25rem] md:w-[1.25rem]"
                                                strokeWidth={2}
                                            />
                                        </div>
                                    </a>
                                </CreativeOverlayButton>
                            </Wrapper>
                        </div>

                        <div className="creative-button">
                            <Wrapper variant="nav">
                                <CreativeOverlayButton
                                    disabled={!foundProject.demoUrl}
                                >
                                    <a
                                        href={foundProject.demoUrl}
                                        target="_blank"
                                    >
                                        <div className="">
                                            <span className="inline text-sm font-normal leading-none">
                                                Live Demo
                                            </span>
                                            <ArrowUpRight
                                                className="inline-block h-[1rem] w-[1rem] md:h-[1.25rem] md:w-[1.25rem]"
                                                strokeWidth={2}
                                            />
                                        </div>
                                    </a>
                                </CreativeOverlayButton>
                            </Wrapper>
                        </div>
                    </div>
                </StaggerObjectSlideIn>
                {/* Details */}

                <StaggerObjectSlideIn
                    staggerAmount={0.2}
                    className="project-info"
                >
                    <>
                        <div className="space-y-6 pt-14">
                            {/* Description */}
                            <div className="project-info">
                                <div className="project-section">
                                    <h1 className="project-detail-title">
                                        Description
                                    </h1>
                                    <hr className="project-line" />
                                </div>
                                <div className="project-detail-info">
                                    <PortableText
                                        value={foundProject.description}
                                        components={descriptionStyle}
                                    />
                                </div>
                            </div>
                            {/* Development Type */}
                            <div className="project-info">
                                <div className="project-section">
                                    <h1 className="project-detail-title">
                                        Development Type
                                    </h1>
                                    <hr className="project-line" />
                                </div>
                                <div className="project-detail-info">
                                    <div className="text-left">
                                        {
                                            DevelopmentType[
                                                foundProject.devType as keyof typeof DevelopmentType
                                            ]
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack */}

                            <div className="project-info">
                                <div className="project-section">
                                    <h1 className="project-detail-title">
                                        Tech Stacks
                                    </h1>
                                    <hr className="project-line" />
                                </div>
                                <div className="project-detail-info">
                                    <div className="flex flex-wrap gap-2">
                                        {foundProject.techUsed.map(
                                            (tech: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className={`shrink-0 rounded-lg bg-colors-gray-400 p-1 px-2 text-base`}
                                                >
                                                    {
                                                        TechStack[
                                                            tech as keyof typeof TechStack
                                                        ]
                                                    }
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Screenshots */}

                            <div className="project-info">
                                <div className="project-section">
                                    <h1 className="project-detail-title">
                                        Screenshots
                                    </h1>
                                    <hr className="project-line" />
                                </div>
                                <div className="project-detail-info">
                                    <div className="flex flex-col space-y-8">
                                        {foundProject.screenshots &&
                                            foundProject.screenshots.map(
                                                (item: SanityImage) => (
                                                    <div
                                                        key={item.asset._id}
                                                        className="relative aspect-[16/9] w-full overflow-hidden rounded-lg"
                                                    >
                                                        <Image
                                                            className="rounded-lg"
                                                            src={item.asset.url}
                                                            alt={item.alt}
                                                            height={1080}
                                                            width={1920}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                ),
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </StaggerObjectSlideIn>
            </div>
        </div>
    );
}

export default Page;
