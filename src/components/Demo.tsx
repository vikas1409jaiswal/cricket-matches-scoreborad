import React, { Suspense, useEffect, useMemo, useRef } from "react";
// import { motion, MotionCanvas, LayoutCamera } from "framer-motion/three";
import { Html, Shadow, Stats, Text3D, Text } from "@react-three/drei";
import { useThree, useFrame, Canvas, useLoader } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import * as fs from "fs";
import base64Arr from "./../data/StaticData/teamLogoBase64.json";
import { useQuery } from "react-query";
import axios from "axios";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import india from "./../images/india.png";
import font from "./Font.json";

export const Demo = ({}) => {
  return <Scene isFullscreen={true} />;
};

// oftShadows();

type SceneProps = {
  isFullscreen: boolean;
};

export const Scene: React.FC<SceneProps> = ({ isFullscreen }) => {
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <Three />
      </Suspense>
    </Canvas>
  );
};

export type ThreeDTextProps = {
  text: string;
  depth?: number;
};

export const ThreeDText: React.FC<ThreeDTextProps> = ({
  text,
  depth = 0.5,
}) => {
  const fontData = {
    boundingBox: {
      yMax: 1000, // Replace with your specific value
      yMin: 500, // Replace with your specific value
    },
    familyName: "Arial", // Replace with your specific font family
    glyphs: {}, // Replace with the actual glyphs data
    resolution: 50, // Replace with your specific value
    underlineThickness: 10, // Replace with your specific value
  };

  return (
    <>
      {/* <ambientLight /> */}
      <pointLight position={[10, 10, 10]} />
      {/* <Text
        font={"Arial"}
        fontSize={3}
        color="red"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 6, 0]}
        textAlign="center"
        depthOffset={5}
        outlineWidth={0.1}
        outlineColor={"darkblue"}
        outlineBlur={0.1}
        outlineOffsetY={0.1}
        outlineOffsetX={0.1}
        strokeWidth={0.04}
        strokeColor={"white"}
        strokeOpacity={0.3}
        fillOpacity={1}
      >
        {text}
      </Text> */}
      <Text3D
        font={{
          boundingBox: { yMax: 100, yMin: 10 },
          familyName: "Arial",
          glyphs: {},
          resolution: 50,
          underlineThickness: 10,
        }}
      >
        Hello world!
        <meshBasicMaterial />
      </Text3D>
    </>
  );
};

interface ThreeProps {}

export const Three: React.FC<ThreeProps> = ({}) => {
  const orbitControlRef = useRef(null);
  const ballRef = useRef(null);

  // useFrame((state) => {
  //   const { x, y } = state.mouse;
  //   const angleOfAzimuthalRotation = Math.PI;
  //   const angleOfPolarRotation = Math.PI;
  //   if (orbitControlRef.current) {
  //     (orbitControlRef.current as any).setAzimuthalAngle(
  //       x * angleOfAzimuthalRotation
  //     );
  //     (orbitControlRef.current as any).setPolarAngle(
  //       Math.PI / 2 - (y + 1) * angleOfPolarRotation
  //     );
  //     (orbitControlRef.current as any).update();
  //   }
  // });

  useEffect(() => {
    if (ballRef.current) {
      const timeLine = gsap.timeline({ paused: true });

      timeLine.to((ballRef.current as any).position, {
        x: 5,
        duration: 3,
        ease: "power2.out",
      });

      timeLine.to(
        (ballRef.current as any).position,
        {
          y: 2.5,
          duration: 2,
          ease: "bounce.out",
        },
        "<"
      );

      timeLine.play();

      // gsap.to((ballRef.current as any).position, {
      //   x: 5,
      //   y: 0.5,
      //   duration: time,
      //   ease: "power2.out",
      // });
    }
  }, [ballRef.current]);

  const cubeRef = useRef(null);

  // useEffect(() => {
  //   if (cubeRef.current) {
  //     const timeLine = gsap.timeline({ paused: true });

  //     timeLine.to((cubeRef.current as any).rotation, {
  //       y: 10 * Math.PI,
  //       duration: 60,
  //       ease: "power2.out",
  //     });

  //     timeLine.play();
  //   }
  // }, [cubeRef.current]);

  const texture = new THREE.TextureLoader().load(india);

  console.log((base64Arr as any)[1].base64);

  // const { isLoading, data } = useQuery([
  //   "photo",
  //   () =>
  //     axios.get(
  //       "http://localhost:3012/images-team-logos/deccan-gladiators.png"
  //     ),
  // ]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 40]} />
      <OrbitControls
        ref={orbitControlRef}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={Math.PI / 4}
      />
      <Text3D
        font={"./Font.json"}
        size={10}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        Vikas
        <meshMatcapMaterial color={"red"} />
      </Text3D>
      //Ball
      {/* <mesh position={[0, 10, 0]} ref={ballRef} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh> */}
      <mesh position={[0, 12.5, 0]} ref={ballRef} castShadow>
        <boxGeometry args={[5, 5, 5]} />
        <meshLambertMaterial map={texture} color="yellow" alphaTest={0.5} />
      </mesh>
      {/* <mesh position={[0, 10, 10]} ref={ballRef} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh> */}
      //Floor
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100, 1]} />
        <meshStandardMaterial color={"#1ea3d8"} side={THREE.DoubleSide} />
      </mesh>
      {/* <ambientLight args={["#ffffff", 0.25]} /> */}
      {/* <directionalLight args={["white", 1]} position={[-4, 1, 0]} /> */}
      <pointLight args={["white", 10]} position={[4, 1, 0]} />
      <pointLight args={["white", 10]} position={[-4, 1, 0]} />
      <pointLight args={["white", 10]} position={[0, 1, 4]} />
      {/* <spotLight
        args={["#ffffff", 500, 10, Math.PI / 2, 0.4]}
        position={[0, 5, 0]}
        castShadow
      /> */}
      <Environment background>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial side={THREE.BackSide} color={"yellow"} />
        </mesh>
      </Environment>
    </>
  );
};
