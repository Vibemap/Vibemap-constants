import React from "react";

import CircularSliderImport from "@fseehawer/react-circular-slider";
import Gradient from "../../animatedGradient";

const CircularSlider = CircularSliderImport.default;

type EnergySliderProps = {
  color1?: string;
  color2?: string;
  energyIndex: number;
  label: string;
  onChange: Function;
  showGradient: boolean;
};

function EnergySlider({
  color1,
  color2,
  energyIndex,
  label,
  onChange,
  showGradient,
}: EnergySliderProps) {
  const oddOrEven = energyIndex & 1 ? "odd" : "even";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className={"energy " + oddOrEven}>
        {showGradient && <Gradient color1={color1} color2={color2} />}
        <div className={"label"}>{label}</div>
      </div>
      <CircularSlider
        dataIndex={energyIndex}
        knobColor="#666666"
        knobDraggable={true}
        min={0}
        max={6}
        width={200}
        hideLabelValue={true}
        progressColorFrom="#EEEEEE"
        progressColorTo="#DDDDDD"
        onChange={onChange}
      />
    </div>
  );
}

EnergySlider.defaultProps = {
  label: "Calm",
  showGradient: true,
};

export default EnergySlider;
