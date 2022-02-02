import React from "react";

import {
  CarouselProvider,
  Slider,
  Slide,
  Dot,
  ButtonNext,
} from "pure-react-carousel";

import { Button, Container } from "semantic-ui-react";

import Bubbles from "../../bubbles";

import Intro from "../intro";
import EnergySlider from "../energySlider";

import "./vibe-check.scss";

import * as style_variables from "../../../build/json/variables.json";
import * as vibes from "../../../../utils/vibes.json";

type VibeWizardProps = {
  onChange: Function;
};

function VibeWizard({ onChange }: VibeWizardProps) {
  const energyIndex = React.useMemo(() => Math.random() * 6, []);

  const [energy, setEnergy] = React.useState<string | undefined>();
  const [energyVibes, setEnergyVibes] = React.useState([]);

  const [color1, setColor1] = React.useState<string | undefined>();
  const [color2, setColor2] = React.useState<string | undefined>();

  const [selectedVibes, setSelectedVibes] = React.useState([]);

  const currentSlide = 0;
  const numSlides = 4;
  const buttons: Array<JSX.Element> = [];

  for (let i = 0; i < numSlides; i++) {
    buttons.push(
      <Button size="mini" as={Dot} key={i} icon="circle thin" slide={i} />
    );
  }

  const vibe_styles = style_variables["default"]["color"]["vibes"];

  const handleEnergyChange = (index = 0) => {
    const energies = Object.keys(vibes.mood);
    const energy = energies[index];
    const energyVibes = vibes.mood[energy];

    setEnergy(energy);
    setEnergyVibes(energyVibes);

    if (energy in vibe_styles) {
      setColor1(vibe_styles[energy].primary);
      setColor2(vibe_styles[energy].secondary);
    }
  };

  const handleBubbles = (vibes: any) => {
    setSelectedVibes(vibes);
  };

  React.useEffect(() => {
    console.log("State changed for call back: ", energy);

    onChange({
      energy: energy,
      selectedVibes: selectedVibes,
    });
  }, [energy, energyVibes, selectedVibes]);

  return (
    <div>
      <CarouselProvider
        currentSlide={currentSlide}
        dragEnabled={false}
        naturalSlideWidth={0.8}
        naturalSlideHeight={1.5}
        totalSlides={4}
        visibleSlides={1}
        // @ts-ignore
        style={{ outline: "none" }}
      >
        <Slider>
          <Slide index={0}>
            <Intro />
          </Slide>
          <Slide index={1}>
            <div style={{ paddingTop: "14rem" }}>
              <h2
                style={{
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                {energy}
              </h2>

              <EnergySlider
                energyIndex={energyIndex}
                color1={color1}
                color2={color2}
                label={energy}
                showGradient={false}
                onChange={handleEnergyChange}
              />
            </div>
          </Slide>
          <Slide index={2}>
            <div style={{ paddingTop: "12rem" }}>
              Pick 2
              <Bubbles
                width={300}
                data={energyVibes}
                onChange={handleBubbles}
              />
            </div>
          </Slide>
        </Slider>
        <Container textAlign="center">
          <Button.Group size="mini" basic>
            {buttons}
          </Button.Group>
          <br />
          <br />
          <Button size="huge" color="black" as={ButtonNext} icon="arrow right">
            Next
          </Button>
        </Container>
      </CarouselProvider>
    </div>
  );
}

export default VibeWizard;
