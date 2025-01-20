import TextSlideDown from "./Animations/StaggerText/TextSlideDown";
import TextSlideUp from "./Animations/StaggerText/TextSlideUp";
import CreativeImageReveal from "./CreativeImageReveal";

type Props = {
	image: SanityImage;
	name: string;
	positionSeekingFor: string;
};

function Landing1({ image, positionSeekingFor, name }: Props) {
	console.log(`profile pic image`, image);

	const splitName = name.split(" ");
	return (
		<div className="h-full w-full font-roboto">
			<div className="grid h-full w-full grid-cols-12">
				<div className="col-span-12 md:col-span-7">
					<div className="flex w-full flex-col items-center justify-center gap-y-10 xl:gap-y-16 2xl:gap-y-20">
						<div className="break-words pt-5 md:w-full md:max-w-[40ch] md:pl-10 md:pt-10 xl:max-w-[60ch]">
							<h1 className="font-roboto text-3xl font-light leading-tight text-colors-white-200 lg:text-4xl xl:text-5xl">
								<TextSlideDown
									textType="char"
									staggerAmount={1 / Math.pow(10, 2)}
								>
									{positionSeekingFor}
								</TextSlideDown>
							</h1>
						</div>
						<div className="relative flex h-96 w-full items-end justify-end md:h-96 lg:h-[425px] 2xl:h-[500px] 2xl:w-3/4">
							<CreativeImageReveal url={image.asset.url} />
						</div>
					</div>
				</div>
				<div className="col-span-12 md:col-span-5">
					<div className="flex h-full w-full items-end justify-start">
						<div className="w-fit">
							<h1 className="font-roboto text-5xl font-black uppercase leading-none text-colors-white-100 lg:text-6xl xl:text-8xl">
								<TextSlideUp
									textType="char"
									staggerAmount={1 / Math.pow(5, 2)}
								>
									{splitName[0]} <br /> {splitName.slice(1).join(" ")}
								</TextSlideUp>
							</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Landing1;
