// Node.js REPL file just for testing your vibe percentage calculation functions
const vibes_matrix = {
    "entrepreneurial": {
        "creative": 0.5,
        "innovative": 0.44,
        "adventurous": 0.38,
        "experiential": 0.38,
        "vibrant": 0.36,
        "artisanal": 0.34,
        "imaginative": 0.34,
        "diverse": 0.33,
        "eclectic": 0.33,
        "small": 0.31,
        "multicultural": 0.31,
        "educational": 0.31,
        "artsy": 0.3,
        "unique": 0.3,
        "social": 0.29
    },
    "colorful": {
        "whimsical": 0.61,
        "quirky": 0.53,
        "lively": 0.51,
        "playful": 0.49,
        "funky": 0.48,
        "beautiful": 0.47,
        "imaginative": 0.47,
        "vibrant": 0.47,
        "eclectic": 0.46,
        "decorative": 0.46,
        "kitschy": 0.45,
        "floral": 0.45,
        "memorable": 0.44,
        "elegant": 0.44,
        "delightful": 0.43
    },
    "alternative": {
        "innovative": 0.41,
        "cheap": 0.33,
        "holistic": 0.31,
        "oasis": 0.3,
        "safe": 0.3,
        "energy": 0.3,
        "experimental": 0.3,
        "new": 0.28,
        "inclusive": 0.26,
        "vegan": 0.26,
        "imaginative": 0.26,
        "participatory": 0.25,
        "adventurous": 0.24,
        "restorative": 0.24,
        "transit": 0.23
    },
    "artsy": {
        "hipster": 0.64,
        "funky": 0.6,
        "kitschy": 0.58,
        "eclectic": 0.57,
        "trendy": 0.56,
        "indie": 0.56,
        "quirky": 0.54,
        "whimsical": 0.51,
        "retro": 0.49,
        "vibe": 0.47,
        "aesthetic": 0.47,
        "art": 0.46,
        "nerdy": 0.46,
        "upscale": 0.45,
        "adventurous": 0.45
    },
    "friendly": {
        "lively": 0.42,
        "warm": 0.41,
        "cozy": 0.37,
        "quiet": 0.36,
        "generous": 0.35,
        "entertaining": 0.34,
        "casual": 0.34,
        "gentle": 0.34,
        "vibrant": 0.34,
        "playful": 0.33,
        "safe": 0.33,
        "quirky": 0.33,
        "classy": 0.33,
        "relaxing": 0.32,
        "fun": 0.32
    },
    "hiking": {
        "scenic": 0.43,
        "outdoors": 0.36,
        "relaxing": 0.34,
        "bike": 0.31,
        "adventurous": 0.28,
        "picturesque": 0.28,
        "walk": 0.27,
        "tourist": 0.27,
        "surfing": 0.26,
        "rugged": 0.21,
        "romantic": 0.21,
        "brunch": 0.2,
        "gourmet": 0.2,
        "garden": 0.2,
        "fun": 0.2
    },
    "magical": {
        "strange": 0.51,
        "delightful": 0.5,
        "memorable": 0.49,
        "beautiful": 0.47,
        "blissful": 0.45,
        "fantastic": 0.45,
        "heavenly": 0.45,
        "weird": 0.45,
        "whimsical": 0.43,
        "imaginative": 0.43,
        "divine": 0.42,
        "joyful": 0.4,
        "crazy": 0.39,
        "unique": 0.39,
        "exciting": 0.38
    },
    "absurd": {
        "outrageous": 0.74,
        "silly": 0.65,
        "weird": 0.52,
        "crazy": 0.51,
        "strange": 0.5,
        "funny": 0.45,
        "whimsical": 0.4,
        "interesting": 0.39,
        "ugly": 0.37,
        "surprising": 0.37,
        "subversive": 0.36,
        "imaginative": 0.35,
        "entertaining": 0.33,
        "kitschy": 0.31,
        "simple": 0.31
    },
    "walk": {
        "mingle": 0.31,
        "laugh": 0.3,
        "hiking": 0.27,
        "bike": 0.3,
        "dance": 0.27,
        "crowded": 0.25,
        "kids": 0.24,
        "beautiful": 0.23,
        "fun": 0.23,
        "picturesque": 0.22,
        "singing": 0.22,
        "outdoors": 0.21,
        "quiet": 0.21,
        "popup": 0.21,
        "feeling": 0.21
    },
    "views": {
        "perspective": 0.36,
        "picturesque": 0.28,
        "unique": 0.26,
        "scenic": 0.25,
        "diverse": 0.24,
        "inclusive": 0.22,
        "serene": 0.22,
        "holistic": 0.21,
        "beautiful": 0.2,
        "aesthetic": 0.2,
        "airy": 0.19,
        "rooftop": 0.19,
        "radical": 0.19,
        "ambiance": 0.18,
        "cultural": 0.18
    },
    "spicy": {
        "savory": 0.72,
        "flavorful": 0.69,
        "tasty": 0.66,
        "yummy": 0.62,
        "sweet": 0.54,
        "earthy": 0.53,
        "hearty": 0.46,
        "mouthwatering": 0.44,
        "sensual": 0.43,
        "gourmet": 0.42,
        "funky": 0.41,
        "soulful": 0.39,
        "decadent": 0.38,
        "authentic": 0.38,
        "delightful": 0.38
    },
    "relief": {
        "calm": 0.22,
        "feeling": 0.21,
        "soothing": 0.2,
        "healing": 0.2,
        "rejuvenating": 0.19,
        "free": 0.18,
        "volunteer": 0.18,
        "generous": 0.17,
        "transit": 0.16,
        "kindness": 0.16,
        "fresh": 0.16,
        "smooth": 0.16,
        "quick": 0.15,
        "safe": 0.15,
        "special": 0.15
    },
    "big": {
        "small": 0.5,
        "fantastic": 0.39,
        "dramatic": 0.36,
        "quick": 0.35,
        "crazy": 0.33,
        "vast": 0.32,
        "exciting": 0.31,
        "happy": 0.31,
        "surprising": 0.3,
        "silly": 0.3,
        "memorable": 0.29,
        "sweet": 0.28,
        "interesting": 0.28,
        "ugly": 0.28,
        "fun": 0.28
    },
    "loud": {
        "quiet": 0.4,
        "laugh": 0.38,
        "funny": 0.35,
        "hearty": 0.34,
        "joyful": 0.34,
        "soothing": 0.32,
        "buzzing": 0.32,
        "playful": 0.3,
        "crazy": 0.3,
        "singing": 0.3,
        "crowded": 0.29,
        "lively": 0.29,
        "silly": 0.29,
        "entertaining": 0.28,
        "colorful": 0.27
    },
    "decadent": {
        "sensual": 0.51,
        "kitschy": 0.49,
        "savory": 0.49,
        "yummy": 0.45,
        "tasty": 0.45,
        "posh": 0.44,
        "blissful": 0.43,
        "gourmet": 0.42,
        "trendy": 0.42,
        "boozy": 0.42,
        "elegant": 0.42,
        "artsy": 0.41,
        "flavorful": 0.41,
        "romantic": 0.41,
        "campy": 0.4
    },
    "kitschy": {
        "campy": 0.68,
        "whimsical": 0.63,
        "retro": 0.63,
        "artsy": 0.58,
        "funky": 0.56,
        "quirky": 0.56,
        "nostalgic": 0.54,
        "decadent": 0.49,
        "trendy": 0.49,
        "hipster": 0.48,
        "playful": 0.46,
        "colorful": 0.45,
        "silly": 0.45,
        "aesthetic": 0.44,
        "funny": 0.43
    },
    "playful": {
        "whimsical": 0.66,
        "sensual": 0.56,
        "quirky": 0.56,
        "gentle": 0.55,
        "joyful": 0.55,
        "funny": 0.53,
        "imaginative": 0.53,
        "delightful": 0.52,
        "funky": 0.5,
        "lively": 0.5,
        "colorful": 0.49,
        "campy": 0.48,
        "earthy": 0.47,
        "adventurous": 0.47,
        "soulful": 0.47
    },
    "bookish": {
        "nerdy": 0.64,
        "artsy": 0.39,
        "quirky": 0.38,
        "playful": 0.37,
        "romantic": 0.35,
        "gentle": 0.33,
        "conversational": 0.33,
        "young": 0.3,
        "quiet": 0.3,
        "elegant": 0.3,
        "kitschy": 0.29,
        "earthy": 0.37,
        "hipster": 0.37,
        "adventurous": 0.36,
        "whimsical": 0.32
    },
    "dance": {
        "jazz": 0.53,
        "singing": 0.51,
        "folk": 0.43,
        "funky": 0.38,
        "soulful": 0.37,
        "sensual": 0.36,
        "art": 0.36,
        "raunchy": 0.35,
        "celebration": 0.34,
        "fun": 0.32,
        "queer": 0.32,
        "joyful": 0.31,
        "fashion": 0.31,
        "playful": 0.3,
        "nightlife": 0.3
    },
    "floral": {
        "decorative": 0.56,
        "garden": 0.51,
        "botanical": 0.48,
        "colorful": 0.45,
        "whimsical": 0.42,
        "fashion": 0.4,
        "gourmet": 0.39,
        "beautiful": 0.38,
        "earthy": 0.37,
        "tarot": 0.37,
        "elegant": 0.37,
        "design": 0.36,
        "savory": 0.36,
        "sensual": 0.35,
        "funky": 0.35
    }
}

const place_vibes_to_use = ["artsy", "botanical", "creative", "dance"]
const my_vibes = ["floral", "patio", "playful", "dance"]

const percent_yourvibe = (myvibes, placevibes, vibes_matrix) => {
    console.log("i was called")
    
    let yourvibe = 0 
    for (j = 0; j < placevibes.length-1; j++) {
        let vibe = myvibes[j]
        console.log(vibes_matrix[vibe])
        for (i = 0; i < placevibes.length-1; i++) {
            if (placevibes[i] in vibes_matrix[vibe])  {
                console.log(placevibes[i])
                yourvibe = yourvibe + vibes_matrix[vibe][placevibes[i]];
            }
          }
    }
    if (yourvibe > 1){
        yourvibe = 1
    }
    return yourvibe*100
}
const percent_yourvibe2 = (myvibes, placevibes) => {
    console.log("i was called")
    
    let yourvibe = 0 
    myvibes.map(vibe => {
        console.log([vibe])
        for (i = 0; i < placevibes.length-1; i++) {
            if (placevibes[i] in vibes_matrix[vibe])  {
                console.log(placevibes[i])
                yourvibe = yourvibe + vibes_matrix[vibe][placevibes[i]];
            }
          }
    })
    if (yourvibe > 1){
        yourvibe = 1
    }
    return yourvibe*100
}

const yourvibe_scale_v1 = (x) => {
    let y = 1.061645 * (x**0.289052)
    console.log(y)
    return y
}
const percent_yourvibe3 = (myvibes, placevibes) => {
    console.log("i was called")
    
    let yourvibe = 0 
    myvibes.map(vibe_m => {
        if (vibe_m in vibes_matrix){
            console.log([vibe_m])
            if(placevibes.includes(vibe_m)) {
                yourvibe += 1/myvibes.length
                console.log([vibe_m], 1/myvibes.length)
            }
            placevibes.map(vibe_p => {
                if (vibe_p in vibes_matrix[vibe_m])  {
                    console.log([vibe_p])
                    yourvibe = yourvibe + vibes_matrix[vibe_m][vibe_p];
                }
            }
            )
        }    
    })
    yourvibe_rounded = yourvibe_scale_v1(yourvibe)
    console.log(yourvibe, yourvibe_rounded)
    return Math.round(yourvibe_rounded*100)
}
console.log(percent_yourvibe3(my_vibes, place_vibes_to_use))

console.log(yourvibe_scale_v1(0.05))