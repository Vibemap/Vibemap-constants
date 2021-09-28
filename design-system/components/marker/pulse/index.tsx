import React from "react";

import "./pulse.scss";

type PulseProps = {
  show: boolean;
  color: string;
};

function Pulse({ show, color }: PulseProps) {
  return (
    <div>
      {show && (
        <div
          className="marker-pulse"
          style={{
            background: color,
          }}
        />
      )}
    </div>
  );
}

Pulse.defaultProps = {
  color: "#ff00ff",
  show: false,
};

export default Pulse;
