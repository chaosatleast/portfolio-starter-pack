import { PortableText } from "next-sanity";
import { TypedObject } from "sanity";
import SkillLine from "./Graph/SkillLine";
import { commonComponents } from "./PortableTextComponent";
import TextSlideDown from "./Animations/StaggerText/TextSlideDown";
import TextSlideUp from "./Animations/StaggerText/TextSlideUp";

type Props = {
    skillsHeaderContent: TypedObject[];
    skills: Skill[];
};

function Skill1({ skillsHeaderContent, skills }: Props) {
    const showingSkills = skills.filter((skill) => skill.isDisplay);
    return (
        <div className="mx-auto h-auto w-auto max-w-7xl">
            <div className="grid w-full grid-cols-12 space-y-6 md:space-y-1">
                <div className="col-span-12 flex w-full items-start justify-start md:col-span-5 lg:col-span-3">
                    <h1 className="text-nowrap text-3xl font-bold text-colors-white-100 lg:text-4xl">
                        <TextSlideDown
                            textType="char"
                            staggerAmount={1 / Math.pow(6, 2)}
                        >
                            Tech Stacks <br /> I'm Good At{" "}
                            <span className="text-xl font-medium">
                                /({showingSkills.length})
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
                            value={skillsHeaderContent}
                            components={commonComponents}
                        />
                    </TextSlideUp>
                </div>
                <div className="col-span-2"></div>
                <div className="col-span-12 max-w-screen-sm pt-10 text-base md:max-w-screen-md md:text-lg lg:col-span-10 lg:max-w-screen-lg xl:max-w-screen-xl xl:text-xl 2xl:max-w-screen-2xl">
                    <div className="pt-10">
                        <SkillLine skills={showingSkills} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Skill1;
