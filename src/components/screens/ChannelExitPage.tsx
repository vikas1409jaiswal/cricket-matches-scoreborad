import React from "react";

interface ChannelExitPageProps {}

export const ChannelExitPage: React.FC<ChannelExitPageProps> = ({}) => {
  return (
    <div>
      <img
        src="http://localhost:3012/images/exitpage/channelExit.png"
        alt="exit-page"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
};
