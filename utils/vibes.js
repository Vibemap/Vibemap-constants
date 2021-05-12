import chroma from 'chroma-js'

// TODO: how to reference the import, not copy the object
import * as allVibes from '../dist/vibes.json'

// TODO: Import as token var, not all objects
import * as style_variables from '../design-system/build/json/variables.json';

// Get vibe attributes
export const getVibeInfo = (vibe = 'chill') => {

    const vibeInfo = allVibes.vibes.filter(item => vibe === item.key)

    if (vibeInfo.length > 0) {
        return vibeInfo[0]
    } else {
        return null
    }
}

export const getVibeGradient = (vibe = 'chill') => {
    let color1 = '#DDDDDD'
    let color2 = '#AAAAAA'

    const vibe_styles = style_variables['default']['color']['vibes']
    const vibeInfo = allVibes.vibes.filter(item => vibe === item.key)

    const vibeColors = vibe_styles[vibe]

    if (vibe_styles[vibe]) {
        color1 = vibeColors['primary']
        color2 = vibeColors['secondary']
    }

    return {
        color1 : color1,
        color2 : color2,
        gradient : `linear-gradient(44deg, ${color1} 20%, ${color2} 100% )`
    }
}

// Print all vibes
export const getVibes = () => {

    const all = vibes.vibes.forEach(vibe => vibe.key)

    return all
}

// Get and sort vibe times
export const getVibesFromVibeTimes = (vibeTimes) => {
    const vibes = (vibeTimes && vibeTimes.length > 0)
        ? vibeTimes
            .sort((a,b) => b.score - a.score)
            .map(vibe => vibe.name)
        : []

    console.log('Handle these vibe times: ', vibeTimes, vibes)

    return vibes
}

export const getRelatedVibes = (vibes) => {
    let relatedVibes = vibes
    vibes.map(vibe => {
        const vibeInfo = getVibeInfo(vibe)

        if (vibeInfo && vibeInfo.related) {
            relatedVibes = relatedVibes.concat(vibeInfo.related)
        }

        if (vibeInfo && vibeInfo.alias) {
            relatedVibes = relatedVibes.concat([vibeInfo.alias])
        }
    })

    // Make it a unqiue set
    const relatedVibesUnique = [...new Set(relatedVibes)]
    return relatedVibesUnique
}

export const getVibeStyle = (vibe) => {

    let vibe_styles = style_variables['default']['color']['vibes']

    let dark_gray = style_variables['default']['color']['base']['gray']['1000']
    let light_gray = style_variables['default']['color']['base']['gray']['200']

    let css = { color: dark_gray, background: light_gray }

    if (vibe in vibe_styles) {
        let primary = vibe_styles[vibe]['primary']

        let luminance = chroma(primary).luminance()
        let brightness = 1.2
        if (luminance < 0.1) brightness += 2
        if (luminance < 0.3) brightness += 1

        let gradient = 'linear-gradient(45deg, ' + chroma(primary).brighten(brightness).hex() + ' 0%, ' + light_gray + ' 75%)'

        css['background'] = gradient
    }

    return css
  }
