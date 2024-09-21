import React, { useEffect } from "react";
import { ImageSlideShow } from "./../../common/ImageSlideShow";
import matchPhotos from "./../../../data/StaticData/matchPhotos.json";
import { speakText } from "./../../common/SpeakText";
import { config } from "../../../configs";

interface MomentCapturesProps {}

export const MomentCaptures: React.FC<MomentCapturesProps> = ({}) => {
  const imageBaseUrl = (indexes: [number, number]) =>
    `https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_960,q_50/lsci/db/PICTURES/CMS/${indexes.join(
      "/"
    )}`;

  useEffect(() => {
    if (config.language === "hindi") {
      speakText("मैच के कुछ महत्वपूर्ण दृश्य");
      speakText(
        "अगर आपको हमारी वीडियो पसंद आती है तो कृपया ऐसे और भी शानदार वीडियो के लिए हमारे चैनल को सब्सक्राइब करें। इस वीडियो को देखने के लिए धन्यवाद."
      );
    } else {
      speakText("Match special moments");
      speakText(
        "If you like our creation then please subscribe our channel for more such awesome videos. Thanks for watching this video."
      );
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 860,
        background:
          'url("https://i.pinimg.com/originals/df/54/6c/df546cabc6cf33ee7ae071423ad4cffe.jpg")',
        position: "relative",
      }}
    >
      <ImageSlideShow
        images={
          matchPhotos
            .find((x) => x.number === 100)
            ?.photos.map((x) => imageBaseUrl(x as [number, number])) as string[]
        }
        style={{
          border: "10px solid red",
          scale: 1.1,
        }}
      />
      <h2
        style={{
          zIndex: 1,
          color: "white",
          position: "absolute",
          marginTop: 650,
          marginRight: -800,
          backgroundColor: "green",
          padding: 10,
        }}
      >
        Credit: ESPN Cricinfo
      </h2>
    </div>
  );
};
