/* Very rudimentary function to calculate how many points each action merits. In future, should 
break out into multiple functions, each with more nuanced specialization. Even content management*/
// Possible actions are [upvote_vibe, add_vibe, add_tip, save_place, check_in, enter_code, share]
// JS only has positional arguments, this function is set up to take named parameters
// This way 1 function, use any set of arguments you want in any order. MUST include action and place
// eg. add_points({action:"enter_code", place:place1, entered_code:"Salad", added_vibes:["chill"]})

export const add_points = ({action, place, added_vibes, added_tip, entered_code} = {}) => {
    
    const base_points = 10
    if (action == "add_vibe") {
        let num_vibes = added_vibes.length
        var points_scored = base_points * num_vibes
    } else if (action == "upvote_vibe") { 
        var points_scored = base_points * 0.3
    } else if (action == "add_tip") {
        if (added_tip.length > 30){
            var points_scored = base_points * 2
        } else {
            var points_scored = base_points * 1.5
        }
    } else if (action == "save_place") { 
        var points_scored = base_points
    } else if (action == "check_in") { 
        // a valid check-in or not should be validated client side using validate_check_in function from helpers.js
        var points_scored = base_points * 5  
    } else if (action == "enter_code") { 
        var points_scored = base_points * 10
    } else if (action == "share") { 
        var points_scored = base_points * 5
    }
    return points_scored
}