import React, { Component } from 'react';

import SVG from 'react-inlinesvg'
import './gradient.scss'
class AnimatedGradient extends Component {
    // Follows the specification for images returned from the Vibemap database.
    componentDidMount(prevProps, prevState) {
        this.setCSS()
    }

    componentDidUpdate(prevProps, prevState) {
        this.setCSS()
    }

    setCSS() {
        let {
            blur,
            color1,
            color2,
            color3,
            color4,
            waveLevel
        } = this.props

        //console.log('setCSS: ', color1, color2, color3, color4)

        if (waveLevel === 'low') blur *= 2

        document.documentElement.style.setProperty('--color-1', color1)
        document.documentElement.style.setProperty('--color-2', color2)
        document.documentElement.style.setProperty('--color-3', color3)
        document.documentElement.style.setProperty('--color-4', color4)
        document.documentElement.style.setProperty('--blur', blur + 'px')
    }

    render() {
        let {
            className,
            height,
            src,
            size,
            waveLevel,
            color1,
            color2,
            color3,
            color4,
            vibemap_images } = this.props

        let svg = '/svgs/' + waveLevel + '.svg'

        return (
            <div
                className={"animatedGradient" + " " + className}
                style={{ height: height, width: '100%' }}>
                <div className='noise'></div>

                {/* ImapctAreact */}
                {/* <div className='color'></div> */}
                {/* ImapctAreact */}

                <div className='color' style={{
                    background: `linear-gradient(44deg, ${color1} 20%, ${color2} 100%)`
                }}></div>
                <div className='blur'>
                    <div
                        className={'wave ' + waveLevel}>
                        <SVG src={svg} />
                    </div>
                </div>
            </div>
        )
    }
}

// TODO: Add default props
AnimatedGradient.defaultProps = {
    src: null,
    blur: 20,
    color1: '#6B00D7',
    color2: '#FFC947',
    color3: '#61ECB2',
    color4: '#000045',
    className: 'gradient',
    height: '6rem',
    size: '10rem',
    waveLevel: 'low'
}

export default AnimatedGradient;