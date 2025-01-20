"use client";
import { Environment, useAspect, useTexture } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import React from "react";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";
import { CursorContext } from "../CursorEffect";

extend({ UnrealBloomPass });

type Props = {
	photoUrl: string;
	isInView: boolean;
};

function PhotoScene({ photoUrl, isInView }: Props) {
	return (
		<Canvas style={{ background: "#0a0a0a", width: "fit" }}>
			<BurningPlane
				photoUrl={photoUrl}
				isInView={isInView}
			/>
			<directionalLight position={[0, 1, 0]} />
			<Environment preset="city" />
		</Canvas>
	);
}

function BurningPlane({ photoUrl, isInView }: Props) {
	// const background = useTexture("/picture/color0a0a0a.jpg");
	const profile = useTexture(photoUrl);
	const { width, height } = profile.image;
	const { viewport } = useThree();

	console.log(viewport.width);

	const scaleLg = useAspect(width, height, 0.35);
	const scaleMd = useAspect(width, height, 0.65);

	const uniforms = React.useRef({
		// uBackgroundColor: { value: background },
		// uFlameColor: { value: new THREE.Color(0xff0000) },
		uColor: { value: profile },
		// uRadius: { value: 0.4 },
		// uThickness: { value: 0.001 },
		// uScale: { value: 2.0 },
		// uTime: { value: 0.0 },
		uProgress: { value: 0 },
		uResolution: { value: new THREE.Vector2(width, height) },
	});

	const progress = useMotionValue(0.0);

	// Animate progress based on isInView state
	React.useEffect(() => {
		animate(progress, isInView ? 1 : 0, {
			duration: 1.0,
			ease: "linear",
		});
	}, [isInView]);

	useFrame(() => {
		if (uniforms.current) {
			uniforms.current.uProgress.value = progress.get();
		}
	});

	// Handle the click event
	const handleClick = () => {
		progress.set(0);
		animate(progress, 1, {
			duration: 1,
			ease: "linear",
		});
	};

	const { setContent, setVariants } = React.useContext(CursorContext);

	if (!setContent || !setVariants) return null;
	return (
		<motion.group>
			<motion.mesh
				scale={viewport.width > 9 ? scaleLg : scaleMd}
				onClick={() => {
					handleClick();
				}}
				onPointerEnter={() => {
					console.log("On mouse enter");
					setContent("Animate");
					setVariants("hover");
				}}
				onPointerLeave={() => {
					console.log("On mouse leave");
					setContent("");
					setVariants("default");
				}}
				position={[0, 0, 0.5]}
			>
				<planeGeometry args={[1, 1, 15, 15]} />
				<shaderMaterial
					vertexShader={backgroundPlaneVertex}
					fragmentShader={planeShaderFragment2}
					uniforms={uniforms.current}
					toneMapped={false}
				/>
			</motion.mesh>
		</motion.group>
	);
}

export default PhotoScene;

const backgroundPlaneVertex = /* glsl */ `

    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

/**
 * Fragment shader for rendering a photo scene with various effects.
 *
 * This shader applies a series of transformations and effects to a texture,
 * including cubic easing functions, a grid effect, pixelation, and gradient fills.
 *
 * Uniforms:
 * - `uProgress` (float): Progress of the slide animation (0 to 1).
 * - `uColor` (sampler2D): Texture for the plane.
 * - `uResolution` (vec2): Resolution of the texture.
 *
 * Varying:
 * - `vUv` (vec2): UV coordinates of the plane.
 *
 * Functions:
 * - `cubicIn(float t)`: Cubic easing in function.
 * - `cubicOut(float t)`: Cubic easing out function.
 * - `cubicInOut(float t)`: Cubic easing in-out function.
 * - `map(float value, float min1, float max1, float min2, float max2)`: Maps a value from one range to another.
 * - `PristineGrid(vec2 uv, vec2 lineWidth)`: Generates a grid effect with anti-aliasing.
 *
 * Main:
 * - Applies a series of transformations to the texture based on the progress of the animation.
 * - Discards fragments based on the progress.
 * - Applies a gradient fill based on the progress.
 * - Pixelates the texture based on the progress.
 * - Generates a grid effect on the texture.
 * - Samples the texture with modified UV coordinates.
 * - Mixes the original and transformed textures based on the progress.
 * - Outputs the final color with applied effects.
 */
const planeShaderFragment2 = /* glsl */ `
	uniform float uProgress; // Progress of the slide animation (0 to 1)
	uniform sampler2D uColor; // Texture for the plane
	uniform vec2 uResolution; // Resolution of the texture
	varying vec2 vUv; // UV coordinates of the plane


	float cubicIn(float t) {
        return t * t * t;
    }


	float cubicOut(float t) {
        float f = t - 1.0;
        return f * f * f + 1.0;
    }

	float cubicInOut(float t) {
        return t < 0.5
          ? 4.0 * t * t * t
          : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
    }

  	float map(float value, float min1, float max1, float min2, float max2) {
    	float val = min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        return clamp(val, min2, max2);
    }

		float PristineGrid(vec2 uv, vec2 lineWidth){
		
        vec4 uvDDXY = vec4(dFdx(uv), dFdy(uv));
        vec2 uvDeriv = vec2(length(uvDDXY.xz), length(uvDDXY.yw));
        bool invertLine = lineWidth.x > 0.5;
        vec2 targetWidth = invertLine ? vec2(1.0) - lineWidth : lineWidth;
        vec2 drawWidth = clamp(targetWidth, uvDeriv, vec2(0.5));
        vec2 lineAA = max(uvDeriv, 0.000001) * 5.5;
        vec2 gridUV = abs(fract(uv) * 2.0 - 1.0);
        gridUV = invertLine ? gridUV : 1.0 - gridUV;
        vec2 grid2 = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);
        grid2 *= clamp(targetWidth / drawWidth,0.,1.);
        grid2 = mix(grid2, targetWidth, clamp(uvDeriv * 2.0 - vec2(1.0),vec2(0.),vec2(1.)));
        grid2 = invertLine ? 1.0 - grid2 : grid2;

        return mix(grid2.x, 1.0, grid2.y);

    }

	void main() {
    // Define yellow cover color for overlay effects
    vec3 coverColor = vec3(0.902, 0.949, 0.522);

    // Calculate discard effect for reveal animation (top to bottom)
    float discardProgress = map(uProgress, 0., 0.8, 0., 1.);
    if (vUv.y < (1. - cubicOut(discardProgress))) discard;

    // Calculate gradient parameters
    float gradientStop = mix(0.4, 0.2, uProgress);  // Gradient width animation
    float customProgress = map(cubicInOut(uProgress), 0.0, 1., -gradientStop, 1. -gradientStop);  // Gradient position
    float fillGradient = smoothstep(1. - customProgress, 1.- (customProgress + gradientStop), vUv.y);  // Vertical gradient

    // Calculate pixelation effect
    float pixelateProgress = smoothstep(0.3, 1.0, uProgress);  // Smooth pixelation transition
    float pixelationFactor = floor(pixelateProgress * 12.0) / 12.0;  // Quantize for stepped effect

    // Calculate grid size with aspect ratio correction
    float s = mix(11.0, 50.0, cubicInOut(pixelationFactor));  // Animate grid size
    vec2 gridSize = vec2(
        s,  // Width
        floor(s/(uResolution.x/uResolution.y))  // Height adjusted for aspect ratio
    );

    // Calculate pixelated UV coordinates
    vec2 newUV = floor(vUv * gridSize) / gridSize + 0.5 / gridSize;

    // Generate grid pattern with animated line width
    float gridLine = PristineGrid(vUv * gridSize, vec2(0.2 * (1.-uProgress)));

    // Sample textures
    vec4 photoInitial = texture2D(uColor, vUv);  // Original texture
    vec4 photo = texture2D(uColor, newUV);  // Pixelated texture

    // Calculate final transition progress
    float finalProgress = map(uProgress, 0.75, 1., 0., 1.);
    vec3 photoColor = mix(photo.rgb, photoInitial.rgb, finalProgress);

    // Set alpha to fully opaque
    gl_FragColor.a = 1.0;

    // Layer the effects:
    // 1. Mix grid with photo
    gl_FragColor.rgb = mix(vec3(1. - gridLine), photoColor, 0.9);
    // 2. Add yellow overlay gradient
    gl_FragColor.rgb = mix(gl_FragColor.rgb, coverColor, fillGradient);
    // 3. Blend back to original photo
    gl_FragColor.rgb = mix(gl_FragColor.rgb, photoInitial.rgb, finalProgress);
}`;
