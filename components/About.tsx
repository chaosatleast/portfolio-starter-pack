import { PortableText } from "next-sanity";
import { TypedObject } from "sanity";
import StaggerObjectSlideIn from "./Animations/StaggerObjectSlideIn";
import TextSlideDown from "./Animations/StaggerText/TextSlideDown";
import TextSlideUp from "./Animations/StaggerText/TextSlideUp";
import Experience from "./Experience";
import { bodyComponents, headerComponents } from "./PortableTextComponent";

interface IProps {
	headerContent: TypedObject[];
	bodyContent: TypedObject[];
	experiences: IExperience[];
}

function About({ headerContent, bodyContent, experiences }: IProps) {
	return (
		<div className="mx-auto h-auto w-auto max-w-7xl font-roboto">
			<div className="grid w-full grid-cols-12 space-y-6 md:space-y-1">
				<div className="col-span-12 flex w-full items-start justify-start md:col-span-3">
					<h1 className="text-nowrap text-3xl font-bold text-colors-white-100 lg:text-4xl xl:text-5xl">
						<TextSlideDown
							textType="char"
							staggerAmount={1 / Math.pow(4, 2)}
						>
							About Me
						</TextSlideDown>
					</h1>
				</div>
				<div className="col-span-12 text-lg md:col-span-9 lg:text-xl xl:text-2xl">
					<TextSlideUp
						textType="word"
						staggerAmount={1 / Math.pow(5, 2)}
					>
						<PortableText
							value={headerContent}
							components={headerComponents}
						/>
					</TextSlideUp>
				</div>
				<div className="col-span-2"></div>
				<div className="col-span-12 mx-auto text-base md:col-span-10 md:text-lg">
					<div className="md:pt-10">
						<TextSlideUp
							textType="word"
							staggerAmount={1 / Math.pow(10, 2)}
						>
							<PortableText
								value={bodyContent}
								components={bodyComponents}
							/>
						</TextSlideUp>
						<div className="">
							<StaggerObjectSlideIn>
								<Experience experiences={experiences} />
							</StaggerObjectSlideIn>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
