import { useEffect, useState } from "react";

export interface ProgressBarProps {
  percent: number;
}

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  percent,
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(percent);
  }, [percent]);

  return (
    <div style={{ width: "100%", backgroundColor: "#e0e0e0", height: 10 }}>
      <div
        style={{
          width: `${percent}%`,
          backgroundColor: "#008000",
          height: "100%",
        }}
      />
    </div>
  );
};
