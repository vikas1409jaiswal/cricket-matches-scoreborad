import React from "react";

interface PlayerImageDemoProps {
  playerName: string;
  playerHref: string;
}

export const PlayerImageDemo: React.FC<PlayerImageDemoProps> = ({
  playerName,
  playerHref,
}) => {
  const { gridSide, margin, height, width } = {
    margin: 0,
    height: 600,
    width: 450,
    gridSide: 30,
  };
  return (
    <svg
      width={width}
      height={height}
      style={{ background: "none", margin, border: "none" }}
    >
      {/* <g className="grid">
        {Array.from(
          { length: height / gridSide - 1 },
          (_, index) => index + 1
        ).map((x) => (
          <line
            x1={0}
            y1={x * gridSide}
            x2={width}
            y2={x * gridSide}
            stroke="black"
            strokeOpacity={0.3}
          />
        ))}
        {Array.from(
          { length: width / gridSide - 1 },
          (_, index) => index + 1
        ).map((x) => (
          <line
            x1={x * gridSide}
            y1={0}
            x2={x * gridSide}
            y2={height}
            stroke="black"
            strokeOpacity={0.3}
          />
        ))}
      </g> */}
      <defs>
        <linearGradient id="imageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "pink", stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: "red", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M30,30 Q100,0 250,30 Q325,50 420,35 V570 H30 Z"
        stroke="darkblue"
        strokeWidth="5"
        fill="url(#imageGradient)"
      />
      <image
        xlinkHref="http://localhost:3012/images/team-logos/india.png"
        width="420"
        height="600"
        x="0"
        y="0"
      />
      <image
        xlinkHref={`http://localhost:3012/images/india/${
          playerHref?.split("/")[2]
        }.png`}
        width="390"
        height="560"
        x="30"
        y="30"
        style={{
          filter: "url(#imageGradient)",
        }}
      />
      <svg>
        <defs>
          <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <path
          id="arc"
          d="M30,625 A225,60 0 1,1 420,625"
          fill="none"
          stroke="red"
        />
        <text
          x="65%"
          y="90%"
          font-size="50"
          fontWeight="700"
          font-family="Impact"
          fill="white"
          text-anchor="middle"
          stroke="black"
          stroke-width="2"
          filter="url(#drop-shadow)"
        >
          <textPath href="#arc">{playerName.toUpperCase()}</textPath>
        </text>
      </svg>
    </svg>
  );
};
