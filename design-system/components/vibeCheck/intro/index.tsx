import React from "react";

import { Transition } from "semantic-ui-react";

function Intro() {
  return (
    <div>
      <div style={{ paddingTop: "4rem" }}>
        <Transition duration={500} animation="scale" transitionOnMount={true}>
          <h2>Everything has a vibration.</h2>
        </Transition>
        <Transition
          duration={500 * 2}
          animation="scale"
          transitionOnMount={true}
        >
          <h2>Take a deep breath.</h2>
        </Transition>
        <Transition
          duration={500 * 3}
          animation="scale"
          transitionOnMount={true}
        >
          <h2>Tune into your thoughts.</h2>
        </Transition>
        <Transition
          duration={500 * 4}
          animation="scale"
          transitionOnMount={true}
        >
          <h2>Let’s find your vibe.</h2>
        </Transition>
      </div>
      <div
        className="ripple"
        style={{
          background: "url(https://app.vibemap.com/svgs/ripple.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          filter: "blur(10px)",
          opacity: 0.4,
          position: "absolute",
          height: "100%",
          width: "100%",
          top: "10rem",
        }}
      />
    </div>
  );
}

export default Intro;
