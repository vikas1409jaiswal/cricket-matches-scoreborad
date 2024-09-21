import React from "react";
import { config } from "../configs";

interface ScreenWrapperProps {
  children: JSX.Element;
  className: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      style={{
        height: config.pageSize.height,
        background: "none",
        overflow: "hidden",
      }}
      className={className}
    >
      {children}
    </div>
  );
};
