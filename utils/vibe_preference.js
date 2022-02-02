import { test_profile } from './test_user_profile.mjs'

import { getVibes } from './vibes.js'


/*
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

const vibe_preference = (data) => {

    // this should be imported instead. For testing, hard-coded here
    const allVibes =  getVibes('keys')

    //console.log(allVibes.length)
    let matrix = allVibes.map(x => 0.0)

    // weights are currently arbitrarily defined. No hard science, editable
    const weights = {"favorites": 1.0,
                        "myvibes": 1.0,
                        "vibepoints": {"search": 0.1, "vibecheck": 0.4, "save": 0.5},
                        "upvotedvibes": {"vibenames": 0.4, "meta": 0.2},
                        "vibecheckhistory": 0.7,
                    }
    const extra_data = data.extra_data

    // favorite place's vibes
    for (const i in extra_data.favorites) {
        let temp = extra_data.favorites[i].properties.vibes
        temp.map(function(x) {if (allVibes.includes(x)) {
            let index = allVibes.indexOf(x)
            matrix[index] = matrix[index] + weights["favorites"]
        }})
    }

    // user's "my vibes"
    extra_data.myVibes.map(function(x) {
        if (allVibes.includes(x)) {
            let index = allVibes.indexOf(x)
            matrix[index] = matrix[index] + weights["myvibes"]
        }
    })

    let vibe_reasons = ["vibe check", "search vibes"]
    // should result in 5 absurds
    // any action resulting in vibepoints, use associated vibes of actions
    // in future should include "vibe" and "check-in" as actions, include their vibes as well
    extra_data.vibePoints.map(function(x) {
        if (x.reason === "search vibes") {
            for (const y in x.searchVibes) {
                let index = allVibes.indexOf(x.searchVibes[y])
                matrix[index] = matrix[index] + weights["vibepoints"]["search"]
            }
        }
        if (vibe_reasons.includes(x.reason)) {
            // console.log(x.vibeCheckVibe[0])
            for (const y in x.vibeCheckVibe[0]) {
                // console.log(x.vibeCheckVibe[0][y])
                let index = allVibes.indexOf(x.vibeCheckVibe[0][y])
                matrix[index] = matrix[index] + weights["vibepoints"]["vibecheck"]
            }
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
        extra_data.upvotedVibes[i].vibeNames.map(function(x) {
            if (allVibes.includes(x)) {
                let index = allVibes.indexOf(x)
                matrix[index] = matrix[index] + weights["upvotedvibes"]["vibenames"]
            }
        })
    }

    // vibecheck vibes are tallied as well
    extra_data.vibeCheckHistory.map(function(x) {
        x.vibes.map(function(y) {
            y.map(function(z) {
                if (allVibes.includes(z)) {
                    let index = allVibes.indexOf(z)
                    matrix[index] = matrix[index] + weights["vibecheckhistory"]
                }
            })
        })
    })


    console.dir(matrix, {'maxArrayLength': null})
    return matrix
}

vibe_preference(test_profile)