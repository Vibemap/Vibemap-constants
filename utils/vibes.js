import chroma from 'chroma-js'
import {scaleLinear} from 'd3-scale'

// TODO: Reference the latest taxonmy from Wordpress
import allVibes from '../dist/vibes.json'

import vibes_matrix from './vibeRelations.json'

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
export const getVibes = (format = 'keys') => {

    let all = []

    switch (format) {
        case 'keys':
            all = allVibes.vibes.forEach(vibe => vibe.key)
            break;

        case 'all':
            all = allVibes.vibes
            break;

        // Else return all object
        default:
            all = allVibes.vibes
            break;
    }

    //console.log('getVibes ', all)
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

export const getRelatedVibes = (vibes, similarity = 0.4) => {
	let relatedVibes = vibes

	const vibesWithRelated = vibes.flatMap(vibe => {
		const vibeInfo = getVibeInfo(vibe)
		let allRelated = []

		if (vibeInfo && vibeInfo.related) {
			relatedVibes = relatedVibes.concat(vibeInfo.related)
		}

		if (vibeInfo && vibeInfo.alias) {
			allRelated = relatedVibes.concat([vibeInfo.alias])
		}

		const similarVibes = vibes_matrix[vibe]
		const mostSimilar = []
		for (vibe in similarVibes) {
			//console.log('Check most similar ', similarVibes[vibe], vibe)
			if (similarVibes[vibe] >= similarity) mostSimilar.push(vibe)
		}

		allRelated = relatedVibes.concat(mostSimilar)
		return allRelated
	})

	// Make it a unqiue set
	const relatedVibesUnique = [...new Set(vibesWithRelated)]
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

// Function derived from hand selecting point values for scaling then modeling exponential function for best fit
export const yourvibe_scale_v1 = (x) => {
    let y = 1.061645 * (x**0.289052)

    // Return only values such that 0<=y<=1
    if (y>1) {
        y = 1
        //console.log("y rounded down to 1")
    } else if (y<0) {
        y = 0
        //console.log("y rounded up to 0")
    }
    return y
}

const normalize_all = (val, min, max, scale_low, scale_high) => {
    var lin_scale = scaleLinear().domain([min, max]).range([scale_low, scale_high])
    return lin_scale(val)
}
/* Function responsible for returning "% Your Vibe" on place page using user inputted vibes (myvibes)
and a place's vibes (placevibes) as input. vibes_matrix is a pre-calculated json of lexical relations between
vibe words, generated using Google's pre-trained Word2Vec model
*/
export const percent_yourvibe = (myvibes, placevibes) => {
    let my_vibes_fraction = 1/myvibes.length

    // Running score of your vibe, default to 0
    let yourvibe = 0

    // Running list of vibes that have relation, but not perfect matches
    var related_vibes = []

    // fraction_counter tracks total perfect matches between myvibes and placevibes. Subtract from place vibes for remaining vibes to match
    let fraction_counter = 0
    myvibes.map(vibe_m => {

        // If there's a direct match, add fraction of total number of user vibes as score
        if(placevibes.includes(vibe_m)) {
            yourvibe += my_vibes_fraction
            fraction_counter += 1
            //console.log([vibe_m], my_vibes_fraction, fraction_counter)
        }

        // So long as vibes exist in matrix (prevent undefined errors), map place vibes and look for match
        if (vibe_m in vibes_matrix){
            //console.log([vibe_m])

            placevibes.map(vibe_p => {

                // If match, add corresponding cosine similarity score
                if (vibe_p in vibes_matrix[vibe_m])  {
                    related_vibes.push(vibes_matrix[vibe_m][vibe_p]);
                }
            }
            )
        }
    })

    // Count number of vibes remaining in place that are not direct matches
    let remaining_place_vibes = placevibes.length - fraction_counter

    // If related vibes are found and not-direct matches are more than 1, combine all scores and take log_matches(related_vibes_score)
    if (related_vibes.length>=1 && (remaining_place_vibes)>1){
        var related_vibes_score = related_vibes.reduce((a, b) => a + b, 0)

        // Add 1 to prevent any negative values. Can skew data for remaining_place_vibes == 2 or 3 but not significant
        if (related_vibes_score < 1) {
            related_vibes_score += 1
        }
        // Change of Base, new variable that will be score normalized for remaining gap
        var remaining_score = Math.log10(10)/Math.log10(20)

    // Avoid Log_1 division by zero/infinite error. Edge Casing
    } else if (related_vibes.length>=1 && (remaining_place_vibes)==1){
        var remaining_score = related_vibes[0]

    // No related matches found, score is zero
    } else {
        var remaining_score = 0
    }

    // Scaled remaining portion of potential vibe score, for related not direct vibes
    let remaining_score_normalized = normalize_all(remaining_score, 0, 1, 0, (my_vibes_fraction*(myvibes.length-fraction_counter)))

    yourvibe += remaining_score_normalized
    // Round using vibe scaling function. Default all 0 scores (no relation whatsoever) to 0.5 (50%)
    let yourvibe_rounded = yourvibe_scale_v1(yourvibe)
    if (yourvibe_rounded <= 0){
        yourvibe_rounded = 0.5
    }

    // Round after multiplying by 100 so not everything is just 1 (0.95 roudns to 1)
    return Math.round(yourvibe_rounded*100)
}