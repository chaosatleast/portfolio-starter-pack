"use client";

import { SkillType } from "@/types/enum";
import { CategoryScale, Chart, ChartDataset } from "chart.js";
import { Chart as ChartJs } from "chart.js/auto";
import { useInView } from "framer-motion";
import React from "react";
import { Line } from "react-chartjs-2";
import StaggerObjectSlideIn from "../Animations/StaggerObjectSlideIn";
import CreativeButton from "../Buttons/CreativeButton";

ChartJs.register(CategoryScale);
// ChartJs.register(ChartDataLabels);

type Props = {
	skills: Skill[];
};

interface ICustomDataset extends ChartDataset<"line", number[]> {
	colors?: string[];
	pointStyle?: any[];
}

const SAIL_POINT = 85;

function SkillLine({ skills }: Props) {
	console.log(skills);

	const graphRef = React.useRef<HTMLDivElement>(null);
	const isInView = useInView(graphRef, { once: true });

	const [formattedSkills, setFormattedSkills] = React.useState(skills);

	const [loadedImages, setLoadedImages] = React.useState<
		(HTMLImageElement | null)[]
	>([]);
	const [imagesLoaded, setImagesLoaded] = React.useState(false);
	const [activeType, setActiveType] = React.useState("all"); // New state for rotation angle

	const [isRender, setIsRender] = React.useState(false);

	React.useEffect(() => {
		const loadImages = async () => {
			console.log("reloading images");
			const images = await Promise.all(
				formattedSkills.map((skill) => {
					return new Promise<HTMLImageElement>((resolve, reject) => {
						const img = new Image();
						img.src = skill.image.asset.url;
						img.onload = () => resolve(img);
						img.onerror = () =>
							reject(new Error(`Failed to load image: ${img.src}`));
					});
				}),
			);

			setLoadedImages(images);
			setImagesLoaded(true);
		};

		loadImages().catch((error) => console.error(error));
	}, [formattedSkills]);

	React.useEffect(() => {
		console.log(`loadedImages`, loadedImages);
	}, [loadedImages]);

	React.useEffect(() => {
		const sortingSkill = () => {
			if (activeType === "all") {
				const filteredSkills = skills.sort(
					(a, b) => a.familiarity - b.familiarity,
				);
				setFormattedSkills(filteredSkills);
			} else {
				const filteredSkills = skills
					.filter((skill) => skill.category === activeType)
					.slice()
					.sort((a, b) => a.familiarity - b.familiarity);

				console.log("skillss", filteredSkills);
				console.log(
					"activeType",
					skills.filter((skill) => skill.category === activeType),
				);

				setFormattedSkills(filteredSkills);
			}
		};

		sortingSkill();
		setIsRender(true);
		setImagesLoaded(false);
	}, [activeType]);

	const afterLayoutPlugin = {
		id: "customLayout",
		afterLayout(chart: Chart) {
			const ctx = chart.ctx;
			const xAxis = chart.scales.x;
			if (formattedSkills.length > 1) {
				chart.data.datasets.forEach((dataset, index) => {
					const customDataset = dataset as typeof dataset & {
						colors: string[];
						pointStyle: any[];
					};

					const gradientStroke = ctx.createLinearGradient(
						xAxis.left,
						0,
						xAxis.right,
						0,
					);

					customDataset.colors.forEach((color, i) => {
						const stop = i / (customDataset.colors.length - 1); // Calculate the gradient stop position
						gradientStroke.addColorStop(stop, color);
					});

					// Apply the gradient to the customDataset
					customDataset.backgroundColor = gradientStroke;
					customDataset.borderColor = gradientStroke;
				});
			}
		},
		afterDatasetDraw: function (chart: Chart) {
			const ctx = chart.ctx;
			ctx.save();

			chart.getDatasetMeta(0).data.forEach((data, index) => {
				const { x, y } = data;

				// Draw the point with a white background
				ctx.beginPath();
				ctx.arc(x, y, 20, 0, Math.PI * 2);
				ctx.fillStyle = "#f2f1f0"; // Background color
				ctx.fill();

				// Draw the image once it's loaded
				console.log("loadedImages", loadedImages);
				if (imagesLoaded && loadedImages[index] instanceof HTMLImageElement) {
					ctx.drawImage(loadedImages[index], x - 17.5, y - 17.5, 35, 35);
				}
				ctx.closePath();
			});

			ctx.restore(); // Restore the context state
		},
	};

	const customColors = formattedSkills.map((skill) => {
		if (skill.familiarity >= SAIL_POINT) {
			return "#e6f285";
		} else {
			return "#403f3e";
		}
	});

	const totalDuration = 800;
	const delayBetweenPoints = totalDuration / formattedSkills.length;

	const skillTypes = Object.values(SkillType);
	const skillTypesKey = Object.keys(SkillType);

	return (
		<div className="">
			<StaggerObjectSlideIn
				className="skill-button"
				staggerAmount={1 / Math.pow(8, 2)}
			>
				<div className="flex flex-wrap gap-3">
					{skillTypes.map((skillType, index) => (
						<div
							className="skill-button shrink-0"
							key={skillTypesKey[index]}
						>
							<div className="skill-button">
								<CreativeButton
									onClick={() => {
										if (activeType !== skillTypesKey[index]) {
											setActiveType(skillTypesKey[index]);
											setIsRender(false);
										}
									}}
									isActive={activeType === skillTypesKey[index]}
								>
									{skillType}
								</CreativeButton>
							</div>
						</div>
					))}
				</div>
			</StaggerObjectSlideIn>

			<div className="relative overflow-x-auto pt-5">
				<div
					ref={graphRef}
					className="h-[320px] w-[1000px]"
				>
					{/* filter */}
					{imagesLoaded && isInView && isRender && (
						<Line
							data={{
								labels: formattedSkills.map((skill) => skill.name),
								datasets: [
									{
										label: "Level",
										data: formattedSkills.map((skill) => skill.familiarity),
										fill: false,
										colors: customColors,
										pointStyle: formattedSkills.map((skill) => "false"),
										pointHitRadius: 20,
										// pointRotation: formattedSkills.map((skill) => 0),
										animations: {
											x: {
												type: "number",
												easing: "linear",
												duration: delayBetweenPoints,
												from: NaN,
												delay(ctx) {
													let started = false;
													if (ctx.type !== "data" || started) {
														return 0;
													}
													started = true;
													console.log("ctx", ctx);
													return ctx.dataIndex * delayBetweenPoints;
												},
											},
										},
										tension: 0.5,
									},
								] as ICustomDataset[],
							}}
							plugins={[afterLayoutPlugin]}
							options={{
								layout: {
									padding: 20,
								},
								maintainAspectRatio: false,
								responsive: true,
								plugins: {
									legend: {
										display: false,
									},
									tooltip: {
										enabled: true,
									},
								},

								scales: {
									x: {
										ticks: {
											display: false,
											color: "rgb(209 213 219)",
											font: { size: 14, weight: 400 },
										},
										grid: {
											display: false,
										},
										border: {
											display: false,
										},
									},
									y: {
										beginAtZero: true,
										min: 20,
										max: 100,
										ticks: {
											stepSize: 5,
											crossAlign: "far",
											callback: function (value, index, ticks) {
												let labels: string[] = [];

												if (value == 50) {
													labels = ["I know the basics", "and good to go"];
													return labels;
												} else if (value == 85) {
													labels = ["I'm confident", "and ready to sail"];
													return labels;
												}
											},
											color: "#e4eaf2",
											font: { size: 14, weight: 400 },
										},
										border: {
											display: false,
										},

										grid: {
											color: function (context) {
												if (context.tick.value === 50) {
													return "#403f3e";
												} else if (context.tick.value === 85) {
													return "#e6f285";
												} else return "transparent";
											},
										},
									},
								},
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default SkillLine;
