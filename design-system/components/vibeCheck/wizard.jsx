import React, { useState, useEffect } from 'react'

import { CarouselProvider, Slider, Slide, Dot, ButtonNext } from 'pure-react-carousel';

import { Button, Container } from 'semantic-ui-react'

import Bubbles from '@bit/vibemap.components.bubbles'

import Intro from './intro'
import EnergySlider from './energySlider'

import * as style_variables from 'vibemap-constants/design-system/build/json/variables.json'
import * as vibes from 'vibemap-constants/dist/vibes.json'

const VibeWizard = (props) => {

  const energyIndex = useMemo(() => Math.random() * 6, [])

  const [energy, setEnergy] = useState(null)
  const [energyVibes, setEnergyVibes] = useState([])

  const [color1, setColor1] = useState(undefined)
  const [color2, setColor2] = useState(undefined)

  const [selectedVibes, setSelectedVibes] = useState([])

  const currentSlide = 0
  const numSlides = 4
  const buttons = []

  for (let i = 0; i < numSlides; i++) {
    buttons.push(
      <Button
        size='mini'
        as={Dot}
        key={i}
        icon="circle thin" slide={i} />
    )
  }

  const vibe_styles = style_variables['default']['color']['vibes']

  const handleEnergyChange = (index = 0, previousIndex = 0) => {
    console.log('handleEnergyChange ', index)

    const energies = Object.keys(vibes['mood']);
    const energy = energies[index]
    const energyVibes = vibes['mood'][energy]

    setEnergy(energy)
    setEnergyVibes(energyVibes)

    if (energy in vibe_styles) {
      console.log('vibe_styles ', vibe_styles, energy)
      setColor1(vibe_styles[energy]['primary'])
      setColor2(vibe_styles[energy]['secondary'])
    }
  }

  const handleBubbles = (vibes) => {
    setSelectedVibes(vibes)
  }

  useEffect(() => {
    console.log('State changed for call back: ', energy)

    props.onChange({
      energy: energy,
      selectedVibes: selectedVibes
    })
  }, [energy, energyVibes, selectedVibes])

  return (
    <div>
      <CarouselProvider
        currentSlide={currentSlide}
        dragEnabled={false}
        naturalSlideWidth={0.8}
        naturalSlideHeight={1.5}
        totalSlides={4}
        visibleSlides={1}
        style={{ outline: 'none'}}>
        <Slider>
          <Slide>
            <Intro />
          </Slide>
          <Slide>
            <div style={{ paddingTop: '14rem' }}>
              <h2 style={{
                textAlign: 'center',
                textTransform: 'capitalize'
                }}>{energy}</h2>

                <EnergySlider
                  energyIndex={energyIndex}
                  color1={color1}
                  color2={color2}
                  label={energy}
                  showGradient={false}
                  onChange={handleEnergyChange} />
            </div>
          </Slide>
          <Slide>
            <div style={{ paddingTop: '12rem' }}>
              Pick 2
              <Bubbles
                width={300}
                data={energyVibes}
                onChange={handleBubbles} />
            </div>
          </Slide>
        </Slider>
        <Container textAlign="center">
          <Button.Group size='mini' basic>
            {buttons}
          </Button.Group>
          <br/><br/>
          <Button
            size='huge'
            color='black'
            as={ButtonNext}
            icon="arrow right">
            Next
          </Button>
        </Container>
      </CarouselProvider>
    </div>
  );
}

VibeWizard.defaultProps = {}

export default VibeWizard;

