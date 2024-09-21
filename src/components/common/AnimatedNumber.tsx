import React, { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration: number;
  className?: string;
  showStar?: boolean;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration,
  className,
  showStar,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(value / (duration / 100));

    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setAnimatedValue(value);
        clearInterval(interval);
      } else {
        setAnimatedValue(start);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <span className={className || "default"}>
      {animatedValue}
      {showStar ? "*" : ""}
    </span>
  );
};
