import React, { useEffect } from 'react';

import SVG from 'react-inlinesvg'
import styles from './animatedGradient.scss'

const AnimatedGradient = (props) => {
    // Follows the specification for images returned from the Vibemap database.
    useEffect(() => {
        setCSS()
    })

    const setCSS = () => {
        let { 
            blur, 
            color1, 
            color2, 
            color3,
            color4,            
            waveLevel 
        } = this.props

        console.log('setCSS: ', color1, color2, color3, color4)
        if (waveLevel === 'low') blur *= 2
        
        document.documentElement.style.setProperty('--color-1', color1)
        document.documentElement.style.setProperty('--color-2', color2)
        document.documentElement.style.setProperty('--color-3', color3)
        document.documentElement.style.setProperty('--color-4', color4)
        document.documentElement.style.setProperty('--blur', blur + 'px')
    }

    let { className, height, src, size, waveLevel, vibemap_images } = this.props

    let svg = '/svgs/' + waveLevel + '.svg'

    return (
        <div>test</div>
    )
}

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