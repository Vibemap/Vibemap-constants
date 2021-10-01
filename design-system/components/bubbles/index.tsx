import React from "react";
import BubbleChart from "@vibemap/react-bubble-chart-d3";

import "./bubbles.scss";
import * as styleVariables from "../../build/json/variables.json";

const baseColor = "#dddde4";
const borderColor = "#CCCCCC";

type BubblesProps = {
  data: any;
  onChange?: Function;
  showLegend: boolean;
  height: number;
  width: number;
};

function Bubbles({ data, onChange, showLegend, height, width }: BubblesProps) {
  const [selected, setSelected] = React.useState<Array<string>>([]);

  function handleBubbleClick(label: string) {
    const indexOfLabel = selected.indexOf(label);
    const isSelected = indexOfLabel >= 0;
    let updated = [...selected];

    if (isSelected) {
      updated = selected.filter((item) => item !== label);
    } else {
      updated.push(label);
    }
    setSelected(updated);

    // Use callback, if passed
    if (onChange) onChange(updated);
  }

  const vibeStyles = styleVariables.color.vibes;

  const bubbleData = data.map((item: string) => {
    const isSelected = selected.indexOf(item) >= 0;

    const className = isSelected ? item + " active" : item;
    let color = baseColor;
    let lineColor = borderColor;

    try {
      color = vibeStyles[item]["primary"];
      lineColor = vibeStyles[item]["secondary"];
    } catch (error) {
      console.log("problem with: ", item);
    }

    const opacity = isSelected ? 0.6 : 0.1;

    return {
      label: item,
      className: className,
      value: item.length,
      color: color,
      lineColor: lineColor,
      opacity: opacity,
    };
  });

  return (
    <BubbleChart
      graph={{
        zoom: 1.0,
        offsetX: 0,
        offsetY: 0,
      }}
      width={width}
      height={height}
      padding={8} // optional value, number that set the padding between bubbles
      showLegend={showLegend} // optional value, pass false to disable the legend.
      valueFont={{
        family: "Public Sans",
        display: "none",
        size: 12,
        color: "#fff",
        weight: "bold",
      }}
      showValueFont={false}
      labelFont={{
        family: "Public Sans",
        size: 16,
        color: "#444444",
        opacity: 1.0,
      }}
      //Custom bubble/legend click functions such as searching using the label, redirecting to other page
      bubbleClickFun={handleBubbleClick}
      data={bubbleData}
    />
  );
}

Bubbles.defaultProps = {
  data: ["chill", "fun"],
  showLegend: false,
  height: 400,
  width: 400,
};

export default Bubbles;
