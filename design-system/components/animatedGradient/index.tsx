import React from "react";

import SVG from "react-inlinesvg";
import "./animatedGradient.scss";

interface AnimatedGradientProps {
  blur: number;
  className: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  height: string;
  src: string;
  vibemap_images: any;
  waveLevel: string;
}

function AnimatedGradient({
  blur,
  className,
  color1,
  color2,
  color3,
  color4,
  height,
  waveLevel,
}: AnimatedGradientProps) {
  // Previously called setCSS
  React.useEffect(() => {
    if (waveLevel === "low") blur *= 2;

    try {
      document.documentElement.style.setProperty("--color-1", color1);
      document.documentElement.style.setProperty("--color-2", color2);
      document.documentElement.style.setProperty("--color-3", color3);
      document.documentElement.style.setProperty("--color-4", color4);
      document.documentElement.style.setProperty("--blur", blur + "px");
    } catch (error) {
      console.log("Problem setting document var: ", error);
    }
  }, [blur, color1, color2, color3, color4]);

  const svg = "/svgs/" + waveLevel + ".svg";

  return (
    <div
      className={"animatedGradient" + " " + className}
      style={{ height, width: "100%" }}
    >
      <div className="noise"></div>
      <div className="color"></div>
      <div className="blur">
        <div className={"wave " + waveLevel}>
          <SVG src={svg} height="auto" />
        </div>
      </div>
    </div>
  );
}

AnimatedGradient.defaultProps = {
  blur: 20,
  className: "gradient",
  color1: "#6B00D7",
  color2: "#FFC947",
  color3: "#61ECB2",
  color4: "#000045",
  height: "6rem",
  waveLevel: "low",
};

export default AnimatedGradient;
