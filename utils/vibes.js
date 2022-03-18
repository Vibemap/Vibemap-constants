import LinearScale from 'linear-scale'
const jsonpack = require('jsonpack')

let allVibes = []
let vibeRelations = []
import { test_profile } from './test_user_profile.mjs'

try {
    // Unpack compressed vibes data
    const vibeTaxonomyPacked = require('../dist/vibesFromCMSTaxonomy.zip.json')
    allVibes = jsonpack.unpack(vibeTaxonomyPacked)

    const vibeRelationsPacked = require('../dist/vibeRelations.zip.json')
    vibeRelations = jsonpack.unpack(vibeRelationsPacked)

} catch (error) {
    console.log('Error upacking vibes ', error)
}


// TODO: Import as token var, not all objects
import * as style_variables from '../design-system/build/json/variables.json';

// Get vibe attributes
export const getVibeInfo = (vibe = 'chill') => {

    const vibeInfo = allVibes.find((item) => item.slug === vibe)

    if (vibeInfo) {
        return vibeInfo
    } else {
        return null
    }
}

export const getVibeGradient = (vibe = 'chill') => {
    let color1 = '#DDDDDD'
    let color2 = '#AAAAAA'

    const vibe_styles = style_variables['default']['color']['vibes']
    const vibeInfo = allVibes.filter(item => vibe === item.key)

    const vibeColors = vibe_styles[vibe]

    if (vibe_styles[vibe]) {
        color1 = vibeColors['primary']
        color2 = vibeColors['secondary']
    }

    const colorInfo = {
      color1: color1,
      color2: color2,
      gradient: `linear-gradient(44deg, ${color1} 20%, ${color2} 100% )`,
    }

    return colorInfo
}

// Print all vibes
export const getVibes = (format = 'keys') => {

    let all = []

    switch (format) {
        case 'keys':
            all = allVibes.map(vibe => vibe.slug)
            break;

        case 'all':
            all = allVibes
            break;

        // Else return all object
        default:
            all = allVibes
            break;
    }

    //console.log('getVibes ', all)
    return all
}

/*

Get a matrix or list of preferred vibes for the users.

possible scoring weights:
+ favorites: 1
+ upvotedVibes (.properties.vibes): 0.7
+ vibePoints (search vibes vibeCheckVibes):
+ myVibes (array): 1
+ vibeCheckHistory (array of objects, vibes):0.3
*/

// console.log(test_profile)
// helper function that creates a user "vibe profile." Essentially a list of the user's vibes weighted by how commonly user has interacted with said vibe
// pass in "extra_data" key of a user's profile.

export const getVibePreferences = (
    // Default to test profile
    returnFormat = `matrix`,
    data = test_profile
) => {
    console.log(`getVibePreferences `, returnFormat);
    // this should be imported instead. For testing, hard-coded here
    const allVibes = getVibes('keys')

    //console.log(allVibes.length)
    let matrix = allVibes.map(x => 0.0)

    console.log(`matrix `, matrix.length)

    // weights are currently arbitrarily defined. No hard science, editable
    const weights = {
        "favorites": 1.0,
        "myvibes": 1.0,
        "vibepoints": { "search": 0.1, "vibecheck": 0.4, "save": 0.5 },
        "upvotedvibes": { "vibenames": 0.4, "meta": 0.2 },
        "vibecheckhistory": 0.7,
    }
    const extra_data = data.extra_data

    // favorite place's vibes
    extra_data.favorites.forEach((place) => {
        place.properties.vibes.forEach((vibe) => {
            if (allVibes.includes(vibe)) {
                const index = allVibes.indexOf(x)
                matrix[index] = matrix[index] + weights["favorites"]
            }
        })
    })

    // user's "my vibes"
    extra_data.myVibes.map(function (x) {
        if (allVibes.includes(x)) {
            let index = allVibes.indexOf(x)
            matrix[index] = matrix[index] + weights["myvibes"]
        }
    })

    let vibe_reasons = ["vibe check", "search vibes"]
    // should result in 5 absurds
    // any action resulting in vibepoints, use associated vibes of actions
    // in future should include "vibe" and "check-in" as actions, include their vibes as well
    extra_data.vibePoints.forEach((vibePointEvent) => {
        if (vibePointEvent.reason === "search vibes") {
            vibePointEvent.searchVibes.forEach((searchedVibe) => {
                const index = allVibes.indexOf(searchedVibe)
                matrix[index] = matrix[index] + weights.vibepoints.search
            })
        }
        if (vibe_reasons.includes(vibePointEvent.reason)) {
            vibePointEvent.vibeCheckVibe[0].forEach((vibe) => {
                const index = allVibes.indexOf(vibe)
                matrix[index] = matrix[index] + weights.vibepoints.vibecheck
            })
        }
    })

    // tally both meta-data of the place where a vibe was upvoted (place's vibes)
    // as well as the vibes added (upvoted)
    for (const i in extra_data.upvotedVibes) {
        // console.log(extra_data.upvotedVibes[i].place.properties.vibes)
        let upvoted_vibes = extra_data.upvotedVibes[i].place.properties.vibes
        for (const j in upvoted_vibes) {
            if (allVibes.includes(upvoted_vibes[j])) {
                let index = allVibes.indexOf(upvoted_vibes[j])
                matrix[index] = matrix[index] + weights["upvotedvibes"]["meta"]
            }
        }
        extra_data.upvotedVibes[i].vibeNames.map(function (x) {
            if (allVibes.includes(x)) {
                let index = allVibes.indexOf(x)
                matrix[index] = matrix[index] + weights["upvotedvibes"]["vibenames"]
            }
        })
    }

    // vibecheck vibes are tallied as well
    extra_data.vibeCheckHistory.map(function (x) {
        x.vibes.map(function (y) {
            y.map(function (z) {
                if (allVibes.includes(z)) {
                    let index = allVibes.indexOf(z)
                    matrix[index] = matrix[index] + weights["vibecheckhistory"]
                }
            })
        })
    })

    // Join the matrix with vibes
    const vibesScored = matrix.map((score, i) => {
        const vibe = allVibes[i]

        return {
            key: vibe,
            score: score
        }
    })

    // Sort by score in decending order
    const vibesSorted = vibesScored.sort((a,b) => {
        return b.score - a.score
    })

    // Create an object of only vibes with scores
    const onlyPreferredVibes = vibesSorted.filter(vibe => vibe.score > 0)
    //console.log(`vibesWithScore `, onlyPreferredVibes);

    //console.dir(matrix, { 'maxArrayLength': null })
    // Return matrix or array
    return returnFormat == 'matrix'
        ? matrix
        : onlyPreferredVibes.map(vibe => vibe.key)
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

export const getRelatedVibes = (vibes = ['chill'], similarity = 0.4) => {
	let relatedVibes = []

    const vibesWithRelated = vibes.flatMap(vibe => {
		const vibeInfo = getVibeInfo(vibe)
		let allRelated = []

		if (vibeInfo && vibeInfo.related) {
			relatedVibes = relatedVibes.concat(vibeInfo.related)
		}

		if (vibeInfo && vibeInfo.alias) {
			allRelated = relatedVibes.concat([vibeInfo.alias])
		}

		const similarVibes = vibeRelations[vibe]
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

export const normalize_all = (
  val = 500,
  min = 1,
  max = 100,
  scale_low = 1,
  scale_high = 10
) => {
  var lin_scale = LinearScale()
    .domain([min, max])
    .range([scale_low, scale_high])

    const normalized = lin_scale(val)

    return normalized
}

/* Function responsible for returning "% Your Vibe" on place page using user inputted vibes (myvibes)
and a place's vibes (placevibes) as input. vibeRelations is a pre-calculated json of lexical relations between
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
        if (vibe_m in vibeRelations) {
          //console.log([vibe_m])

          placevibes.map((vibe_p) => {
            // If match, add corresponding cosine similarity score
            if (vibe_p in vibeRelations[vibe_m]) {
              related_vibes.push(vibeRelations[vibe_m][vibe_p])
            }
          })
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