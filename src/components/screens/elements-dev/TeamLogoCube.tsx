import React, { useEffect, useRef } from "react";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

interface TeamLogoCubeProps {}

export const TeamLogoCube: React.FC<TeamLogoCubeProps> = ({}) => {
  const orbitControlRef = useRef(null);
  const ballRef = useRef(null);

  useEffect(() => {
    if (ballRef.current) {
      const timeLine = gsap.timeline({ paused: true });

      timeLine.to((ballRef.current as any).position, {
        x: 5,
        duration: 3,
        ease: "power2.out",
      });

      timeLine.to((ballRef.current as any).rotation, {
        y: Math.PI,
        duration: 3,
        ease: "power2.out",
      });

      //   timeLine.to(
      //     (ballRef.current as any).position,
      //     {
      //       y: 2.5,
      //       duration: 2,
      //       ease: "bounce.out",
      //     },
      //     "<"
      //   );

      timeLine.play();
    }
  }, [ballRef.current]);

  const texture = new THREE.TextureLoader().load(
    "https://assets.stickpng.com/images/62820e24341d5aa3cb7b7aef.png"
  );

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 5, 40]} />
      <OrbitControls
        ref={orbitControlRef}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={Math.PI / 4}
      />
      <mesh position={[0, 2.5, 0]} ref={ballRef} castShadow>
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial transparent />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"#1ea3d8"} />
      </mesh>

      <pointLight args={["white", 10]} position={[4, 1, 0]} />
      <pointLight args={["white", 10]} position={[-4, 1, 0]} />
      <pointLight args={["white", 10]} position={[0, 1, 4]} />

      <Environment background>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial side={THREE.BackSide} color={"yellow"} />
        </mesh>
      </Environment>
    </Canvas>
  );
};
