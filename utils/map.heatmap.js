import chroma from 'chroma-js'

// Return heatmap colors by vibe
/* TODO: Only use primary vibe set colors on the second half of the heatmap */
/* TODO: Get colors from vibemap-constants */
export const getHeatmap = (colors, vibe) => {

    //let colors = color.map((color, i) => choroma(color).alpha(0.2))
    let heatmap = []

    let blue = '#008ae5'
    // UNUSED: let gray = '#B1E2E5'
    let yellow = '#F8EE32'
    // UNUSED: let pink = '#ED0A87'
    // UNUSED: let teal = '#32BFBF'
    let white = '#FFFFFF'

    let light_blue = '#54CAF2'
    let light_green = '#9DE862'
    let light_teal = '#7DCAA5'
    let light_pink = '#E479B0'
    let light_purple = '#BC94C4'
    let light_yellow = '#FFFCC5'
    // UNUSED: let light_orange = '#FBCBBD'
    let orange = '#F09C1F'

    /*
    let classic = ['blue', 'teal', 'yellow', 'orange']
    let blue_scale = ['gray', 'white', 'yellow', 'blue']
    let orange_scale = ['#B1E2E5',  'yellow', 'orange']
    let purple_scale = ['#B1E2E5', '#EDE70D', '#F27BA5', '#D76CE3']
    let spectral = chroma.scale('Spectral').colors(6).reverse()
    */

    let green_purple = "PiYG"

    const vibe_to_scale = {
        'calm': [white, light_blue, light_green, light_yellow],
        'buzzing': [white, light_pink, orange, light_yellow],
        'dreamy': [white, light_purple, orange, light_yellow],
        'oldschool': [blue, yellow,  orange],
        'playful': [white, light_teal, light_green, yellow],
        'solidarity': [white, light_yellow, yellow, orange],
        'together': [white, light_teal, light_yellow],
        'wild': green_purple
    }

    let scale = [white, light_purple, yellow, orange]

    if (vibe) scale = vibe_to_scale[vibe]

    //console.log('getHeatmap(colors, vibes): ', colors, vibe, scale)

    if (colors) {
        scale = chroma.scale([colors])
    }

    heatmap = chroma.scale(scale)
        .mode('lch') // lab
        //.domain([0, .1, 0.9, 1])
        .colors(6)


    heatmap = heatmap
        //.reverse()
        .map((color, i) => {
            let alpha = i * 0.2
            let rgb = chroma(color)
                .alpha(alpha)
                //.brighten(i * 0.05)
                .saturate(i * 0.05)
                .css()
            console.log('heat layer ', i, rgb)
            return rgb
        })

    /*
    heatmap = chroma.cubehelix()
        .lightness([0.3, 0.8])
        .scale() // convert to chroma.scale
        .correctLightness()
        .colors(6)

    heatmap = chroma.scale('Spectral')
        //.scale() // convert to chroma.scale
        .colors(6)
    */

    return heatmap
}

export const getVibeStyle = (vibe = 'chill') => {

    let vibe_styles = style_variables['default']['color']['vibes']

    let dark_gray = style_variables['default']['color']['base']['gray']['1000']
    let light_gray = style_variables['default']['color']['base']['gray']['200']

    let css = {
        color: dark_gray,
        background: light_gray
    }

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