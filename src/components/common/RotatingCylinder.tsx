import React, { useEffect, useRef } from "react";

import "./RotatingCylinder.scss";

interface RotatingCylinderProps {
  images: string[];
  isStopOnHover?: boolean;
  width: number;
  height: number;
  rotationSpeed: number;
  translateZ?: number;
  perspective?: number;
}

export const RotatingCylinder: React.FC<RotatingCylinderProps> = ({
  images,
  isStopOnHover,
  width,
  height,
  rotationSpeed,
  translateZ,
  perspective,
}) => {
  const containerRef = useRef(null);
  const cylinderRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current as any;
    const cylinder = cylinderRef.current as any;

    let rotation = 0;
    let rSpeed = rotationSpeed; // Adjust the rotation speed as needed

    const rotateCylinder = () => {
      rotation += rSpeed;
      cylinder.style.transform = `rotateY(${rotation}deg)`;
    };

    const interval = setInterval(rotateCylinder, 100);

    if (isStopOnHover) {
      container.addEventListener("mouseover", () => {
        rSpeed = 0; // Adjust the rotation speed when the mouse is over the container
      });

      container.addEventListener("mouseout", () => {
        rSpeed = rotationSpeed; // Stop the rotation when the mouse leaves the container
      });
    }

    return () => {
      clearInterval(interval);

      if (isStopOnHover) {
        container.removeEventListener("mouseover", () => {
          rSpeed = 0;
        });
        container.removeEventListener("mouseout", () => {
          rSpeed = 0;
        });
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        perspective: perspective || 1000,
        margin: "auto",
        width,
        height,
        background: "none",
      }}
    >
      <div
        ref={cylinderRef}
        style={{
          width,
          height,
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease",
          background: "none",
        }}
        className="rotating-cylinder"
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transform: `rotateY(${
                index * (360 / images.length)
              }deg) translateZ(${translateZ || 100}px)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              padding: "0px",
              background: "none",
              backgroundColor: "white",
              border: "2px solid black",
              marginTop: 10,
            }}
          >
            <img
              src={image}
              alt={`frame-img ${index + 1}`}
              style={{
                maxWidth: width,
                maxHeight: height,
                width: "95%",
                height: "95%",
                backgroundColor: "white",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
