'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chroma = require('chroma-js');
var d3Scale = require('d3-scale');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chroma__default = /*#__PURE__*/_interopDefaultLegacy(chroma);

var vibes = [
	{
		key: "absurd",
		name: "Absurd",
		definition: "Arousing amusement in the silly and illogical",
		affirmations: [
			"Not everything has to make sense",
			"Embrace the unknown"
		],
		popularity: 10,
		related: [
			"funny",
			"outrageous",
			"comedy",
			"silly",
			"weird",
			"crazy",
			"strange",
			"whimsical"
		]
	},
	{
		key: "academic",
		name: "Academic",
		popularity: 260
	},
	{
		key: "active",
		name: "Active",
		definition: "Engaging and energetic pursuits",
		affirmations: [
			"Take a step forward",
			"A simple is positive movement"
		],
		popularity: 260,
		related: [
			"healthy",
			"athletic",
			"hiking"
		]
	},
	{
		key: "activist",
		name: "Activist",
		definition: "Bringing about positive change",
		affirmations: [
			"Fairness and justice are a jam",
			"Challenging the status quo",
			"Showing up for a fair, kind, joyous world",
			"What new solutions can you bring about?"
		],
		popularity: 10,
		related: [
			"civic",
			"vegan",
			"solidarity",
			"community",
			"radical",
			"belonging",
			"inclusive"
		]
	},
	{
		key: "adventurous",
		name: "Adventurous",
		definition: "Willingness to try new things.",
		affirmations: [
			"Everyday can be full of excitement"
		],
		popularity: 2000,
		related: [
			"aquatic",
			"hiking",
			"scenic",
			"wild"
		]
	},
	{
		key: "aesthetic",
		name: "Aesthetic",
		popularity: 390
	},
	{
		key: "afternoon",
		name: "Afternoon",
		popularity: 10,
		related: [
			"lazy",
			"sunny",
			"relaxed"
		]
	},
	{
		key: "airy",
		name: "Airy",
		definition: "Spacious, light-filled bliss",
		affirmations: [
			"Take a deep breath of light air"
		],
		popularity: 10
	},
	{
		key: "aloha",
		name: "Aloha",
		popularity: 10
	},
	{
		key: "alternative",
		name: "Alternative",
		definition: "Open to other possibilities",
		affirmations: [
			"There are few deadends"
		],
		popularity: 100,
		related: [
			"indie",
			"rebel"
		]
	},
	{
		key: "amazing",
		name: "Amazing",
		definition: "Unexpected wonder",
		popularity: 400
	},
	{
		key: "analog",
		name: "Analog",
		definition: "Throw it back to the old school ways",
		affirmations: [
			"Take it back to another time"
		],
		popularity: 40,
		related: [
			"retro",
			"nostalgic",
			"throwback",
			"deepcut"
		]
	},
	{
		key: "angelic",
		name: "Angelic",
		popularity: 10
	},
	{
		key: "antique",
		name: "Antique",
		definition: "Nostalgic collectables",
		affirmations: [
			"Add to your collection"
		],
		popularity: 400,
		related: [
			"cottage",
			"collectable",
			"vintage",
			"nostalgic",
			"oldschool"
		]
	},
	{
		key: "arctic",
		name: "Arctic",
		popularity: 10
	},
	{
		key: "art",
		name: "Art",
		definition: "Human creativity",
		affirmations: [
			"Imagine the world around you as a painting"
		],
		popularity: 400,
		related: [
			"artsy",
			"interactive",
			"aesthetic",
			"creative"
		]
	},
	{
		key: "art-deco",
		name: "Art-Deco",
		popularity: 10
	},
	{
		key: "artsy",
		name: "Artsy",
		definition: "Surrounded and made from art",
		affirmations: [
			"Listening to that creative energy",
			"The art of living with others",
			"Listen to your creative energy today",
			"Your vision is paying off",
			"The world needs your creativity",
			"Creative energy exists in all aspects of your life"
		],
		popularity: 110,
		related: [
			"artsy",
			"creative",
			"aesthetic"
		]
	},
	{
		key: "artisanal",
		name: "Artisanal",
		definition: "Handmade and traditional crafts",
		affirmations: [
			"Appreciate the care put into things"
		],
		popularity: 10,
		related: [
			"craft",
			"handmade"
		]
	},
	{
		key: "authentic",
		name: "Authentic",
		definition: "Original, genuine, and true",
		affirmations: [
			"Being yourself is attractive",
			"Looking at the world through through fresh eyes",
			"Make a new ritual that speaks to your truest self",
			"Stay alert for a unique gem today",
			"Individuality is exciting"
		],
		popularity: 200,
		related: [
			"family",
			"legacy",
			"unique",
			"inclusive",
			"vibrant",
			"eclectic"
		]
	},
	{
		key: "aquatic",
		name: "Aquatic",
		definition: "Under the sea",
		affirmations: [
			"Be at peace amongst the water"
		],
		popularity: 10,
		related: [
			"mermaid",
			"nautical",
			"adventurous",
			"colorful"
		]
	},
	{
		key: "aware",
		name: "Aware",
		definition: "An open understanding",
		affirmations: [
			"Elevate your knowledge"
		],
		popularity: 10
	},
	{
		key: "badass",
		name: "Badass",
		popularity: 10
	},
	{
		key: "bagel",
		name: "Bagel",
		popularity: 10
	},
	{
		key: "beautiful",
		name: "Beautiful",
		definition: "Pleasing to the senses",
		affirmations: [
			"Beauty is everywhere"
		],
		popularity: 400,
		related: [
			"dreamy",
			"art",
			"classy",
			"glam"
		]
	},
	{
		key: "belonging",
		name: "Belonging",
		definition: "A place that invites and feels right",
		affirmations: [
			"Find a home away from home",
			"You belong here",
			"Tune into the vibration around you"
		],
		popularity: 10,
		related: [
			"inclusive",
			"friendly",
			"community"
		]
	},
	{
		key: "big",
		name: "Big",
		definition: "Of great size or intensity",
		affirmations: [
			"There is always more"
		],
		popularity: 10
	},
	{
		key: "biking",
		name: "Biking",
		definition: "Human-powered movement",
		affirmations: [
			"Experience the freedom of cruising"
		],
		popularity: 700,
		related: [
			"adventurous"
		]
	},
	{
		key: "blessed",
		name: "Blessed",
		popularity: 10
	},
	{
		key: "blissful",
		name: "Blissful",
		definition: "Complete joy",
		affirmations: [
			"Bliss is near"
		],
		popularity: 10
	},
	{
		key: "boho",
		name: "Boho",
		alias: "Bohemian",
		definition: "Lacking the need to confirm to society",
		affirmations: [
			"You do you"
		],
		popularity: 90,
		related: [
			"hippie",
			"natural",
			"floral"
		]
	},
	{
		key: "bold",
		name: "Bold",
		definition: "Strong and vivid",
		affirmations: [
			"Build in confidence"
		],
		popularity: 90
	},
	{
		key: "bookish",
		name: "Bookish",
		definition: "Enjoyment of stories and learning",
		affirmations: [
			"A good book can take you anywhere"
		],
		popularity: 10
	},
	{
		key: "boozy",
		name: "Boozy",
		definition: "Feeling intoxicated",
		affirmations: [
			"Let loose and celebrate anything"
		],
		popularity: 10
	},
	{
		key: "boujee",
		name: "Boujee",
		popularity: 10
	},
	{
		key: "botanical",
		name: "Botanical",
		definition: "Natural goodness",
		affirmations: [
			"Sprout roots and grow"
		],
		popularity: 110,
		related: [
			"fresh",
			"natural",
			"green",
			"plant",
			"airy"
		]
	},
	{
		key: "boutique",
		name: "Boutique",
		popularity: 260
	},
	{
		key: "breezy",
		name: "Breezy",
		popularity: 10
	},
	{
		key: "brunch",
		name: "Brunch",
		popularity: 8000,
		related: [
			"afternoon",
			"boozy",
			"fun",
			"sunny"
		]
	},
	{
		key: "busy",
		name: "Busy",
		definition: "Full of activity",
		affirmations: [
			"Occupied but not preoccupied"
		],
		popularity: 10
	},
	{
		key: "buzzing",
		name: "Buzzing",
		definition: "A humming feeling or sounds",
		affirmations: [
			"Gotta have the funk",
			"Feel the vibration of a garden"
		],
		popularity: 10,
		related: [
			"energetic",
			"dance",
			"busy",
			"shimmy",
			"jazzy",
			"lively",
			"popular",
			"trending",
			"wild"
		]
	},
	{
		key: "california",
		name: "California",
		popularity: 110
	},
	{
		key: "calm",
		name: "Calm",
		definition: "Undisturbed and unshakable",
		affirmations: [
			"Embrace stillness"
		],
		popularity: 170,
		related: [
			"blissful",
			"casual",
			"chill",
			"comfy",
			"low-key",
			"serene",
			"cozy",
			"peaceful",
			"relaxing",
			"soothing",
			"quiet",
			"refreshing"
		]
	},
	{
		key: "camp",
		name: "Camp",
		definition: "Into the wild",
		popularity: 300,
		related: [
			"outdoorsy",
			"rugged",
			"scenic"
		]
	},
	{
		key: "campy",
		name: "Campy",
		definition: "Exaggerated and amusing humor",
		affirmations: [
			"Take it over the top"
		],
		popularity: 10,
		related: [
			"fun",
			"funny"
		]
	},
	{
		key: "cannabis",
		name: "Cannabis",
		popularity: 10
	},
	{
		key: "candlelit",
		name: "Candlelit",
		popularity: 10
	},
	{
		key: "carefree",
		name: "Carefree",
		definition: "No worries",
		affirmation: [
			"Let it all go"
		],
		popularity: 10,
		related: [
			"calm",
			"chill",
			"relaxed"
		]
	},
	{
		key: "caribbean",
		name: "Caribbean",
		popularity: 40
	},
	{
		key: "casual",
		name: "Casual",
		definition: "Relaxed and easy",
		affirmations: [
			"Go with the flow"
		],
		popularity: 200,
		related: [
			"chill"
		]
	},
	{
		key: "celebratory",
		name: "Celebratory",
		definition: "Enjoying something special",
		affirmations: [
			"Applaud the people growing alongside you",
			"There are many causes to celebrate",
			"Express love to your road dogs"
		],
		popularity: 10,
		related: [
			"festive",
			"fun",
			"wild",
			"loud"
		]
	},
	{
		key: "cheap",
		name: "Cheap",
		definition: "Worth more than the cost",
		affirmations: [
			"Free as in freedom"
		],
		popularity: 2000,
		related: [
			"affordable",
			"inclusive"
		]
	},
	{
		key: "chic",
		name: "Chic",
		popularity: 260,
		related: [
			"affordable",
			"inclusive"
		]
	},
	{
		key: "children",
		name: "Children",
		definition: "Young and innocent",
		affirmations: [
			"Remember a happy place"
		],
		popularity: 10,
		related: [
			"family",
			"playful"
		]
	},
	{
		key: "chill",
		name: "Chill",
		definition: "Relaxed in a way you want to be around",
		affirmations: [
			"Refused to be rushed",
			"Super calm vibes are in your future",
			"Living in the moment is part of being chill"
		],
		popularity: 200,
		related: [
			"casual",
			"low-key",
			"cozy",
			"relaxing",
			"soothing",
			"comfy",
			"blissful",
			"calm",
			"refreshing"
		]
	},
	{
		key: "christmas",
		name: "Christmas",
		popularity: 400
	},
	{
		key: "cinematic",
		name: "Cinematic",
		definition: "Dramatic and moving",
		affirmations: [
			"Imagine the score to your adventure"
		],
		popularity: 10
	},
	{
		key: "civic",
		name: "Civic",
		definition: "Being a part of the city",
		affirmations: [
			"Community = a force far greater than money",
			"Show up in every way you can",
			"Collectively-minded is a cool way to be",
			"Consider new ways to engage in civic pride",
			"Our collective dreams can be reached together"
		],
		popularity: 40,
		related: [
			"community",
			"solidarity",
			"activist",
			"local",
			"cultural",
			"volunteer",
			"vibrant"
		]
	},
	{
		key: "classic",
		name: "Classic",
		definition: "Outstanding over time",
		affirmations: [
			"Rituals bring perspective",
			"Timeless outlasts trends",
			"Embrace one retro activity today"
		],
		popularity: 500,
		related: [
			"retro",
			"traditional",
			"throwback",
			"old-school",
			"analog"
		]
	},
	{
		key: "classy",
		name: "Classy",
		popularity: 30
	},
	{
		key: "coastal",
		name: "Coastal",
		popularity: 200
	},
	{
		key: "cold",
		name: "Cold",
		popularity: 90
	},
	{
		key: "colorful",
		name: "Colorful",
		definition: "Lively, expressive, and bright",
		affirmations: [
			"Imagine yourself as a mural"
		],
		popularity: 100,
		related: [
			"artsy",
			"authentic",
			"dreamy"
		]
	},
	{
		key: "comfy",
		name: "Comfy",
		popularity: 40
	},
	{
		key: "community",
		name: "Community",
		definition: "Your people",
		affirmations: [
			"Support those around you"
		],
		popularity: 20,
		related: [
			"civic",
			"activist",
			"local",
			"solidarity",
			"cultural",
			"proud"
		]
	},
	{
		key: "conversational",
		name: "Conversational",
		popularity: 10
	},
	{
		key: "cool",
		name: "Cool",
		popularity: 6000
	},
	{
		key: "cottagecore",
		name: "Cottagecore",
		definition: "Calm, collected, and always in style",
		popularity: 90
	},
	{
		key: "courageous",
		name: "Courageous",
		popularity: 50
	},
	{
		key: "costume",
		name: "Costume",
		popularity: 10
	},
	{
		key: "cozy",
		name: "Cozy",
		definition: "Warm, snug, and loved",
		affirmations: [
			"Wrap yourself in something fluffy."
		],
		popularity: 200
	},
	{
		key: "craft",
		name: "Craft",
		definition: "Made with care and skill",
		popularity: 320
	},
	{
		key: "crazy",
		name: "Crazy",
		popularity: 60
	},
	{
		key: "creative",
		name: "Creative",
		popularity: 200
	},
	{
		key: "crisp",
		name: "Crisp",
		popularity: 20
	},
	{
		key: "crowded",
		name: "Crowded",
		popularity: 10
	},
	{
		key: "crunchy",
		name: "Crunchy",
		popularity: 10
	},
	{
		key: "cultural",
		name: "Cultural",
		definition: "Ideas and identities",
		affirmations: [
			"Find inspiration in a group",
			"Roam through new teachings today",
			"Connect to a place and its story today",
			"Take an artsy path today",
			"Take in the cultural diversity"
		],
		popularity: 90,
		related: [
			"proud",
			"community",
			"diverse",
			"inclusive"
		]
	},
	{
		key: "cute",
		name: "Cute",
		definition: "Endearing and youthful",
		affirmations: [
			"Picture your favorite animal playing"
		],
		popularity: 210
	},
	{
		key: "cutty",
		name: "Cutty",
		popularity: 10
	},
	{
		key: "curious",
		name: "Curious",
		definition: "Eager to learn and explore",
		affirmations: [
			"Free to grow and roam",
			"Learning about yourself is the same as learning about the world",
			"Make space for a new lesson today",
			"Find space to daydream today"
		],
		popularity: 10,
		related: [
			"adventurous",
			"eclectic",
			"wild",
			"fun",
			"playful",
			"artsy",
			"entertaining",
			"funky"
		]
	},
	{
		key: "dance",
		name: "Dance",
		definition: "Shakin' & swayin'",
		affirmations: [
			"Move with the beat of the music"
		],
		popularity: 600,
		related: [
			"jazzy",
			"lit",
			"turnedup",
			"shimmy",
			"poppin"
		]
	},
	{
		key: "dark",
		name: "Dark",
		popularity: 10
	},
	{
		key: "datespot",
		name: "Date Spot",
		definition: null,
		affirmations: [
			"Seek out your person"
		],
		popularity: 10,
		related: [
			"intimate",
			"love",
			"romantic",
			"sensual",
			"belonging",
			"fun",
			"savory",
			"tasty"
		]
	},
	{
		key: "dating",
		name: "Dating",
		popularity: 300
	},
	{
		key: "decorative",
		name: "Decorative",
		popularity: 10
	},
	{
		key: "deepcut",
		name: "Deep Cut",
		definition: "If you know, you know",
		affirmations: [
			"Appreciate what your childhood taught you"
		],
		popularity: 10,
		related: [
			"hiddengem",
			"exclusive",
			"nostalgic",
			"retro",
			"throwback",
			"analog"
		]
	},
	{
		key: "delightful",
		name: "Delightful",
		popularity: 10
	},
	{
		key: "design",
		name: "Design",
		popularity: 110
	},
	{
		key: "dive",
		name: "Dive",
		popularity: 80
	},
	{
		key: "diverse",
		name: "Diverse",
		definition: "A variety of it all",
		affirmations: [
			"We are in this together"
		],
		popularity: 60,
		related: [
			"multicultural",
			"community",
			"inclusive"
		]
	},
	{
		key: "diy",
		name: "DIY",
		definition: "Do-It-Yourself",
		affirmations: [
			"Make use of what you have in abundance"
		],
		popularity: 100,
		related: [
			"crafty",
			"homemade",
			"artsy",
			"art",
			"earthy"
		]
	},
	{
		key: "dope",
		name: "Dope",
		popularity: 20
	},
	{
		key: "dramatic",
		name: "Dramatic",
		popularity: 10
	},
	{
		key: "dreamy",
		name: "Dreamy",
		definition: "Magical or otherworldly",
		affirmations: [
			"Picture yourself anywhere you like"
		],
		popularity: 10,
		related: [
			"artsy",
			"colorful",
			"creative",
			"curious",
			"inspired",
			"hippie",
			"open",
			"airy",
			"whimsical"
		]
	},
	{
		key: "dress-up",
		name: "Dress-up",
		popularity: 10
	},
	{
		key: "drinks",
		name: "Drinks",
		popularity: 100
	},
	{
		key: "drinking",
		name: "Drinking",
		definition: "Tasty beverages with friends",
		affirmations: [
			"Give a toast to absent friends",
			"Be gentle with yourself today",
			"Take some downtime today",
			"Keep a full bottle of water with you today"
		],
		popularity: 200,
		related: [
			"party",
			"lively",
			"tasty"
		]
	},
	{
		key: "drip",
		name: "Drip",
		definition: "All the swagger",
		affirmations: [
			"Always be yourself"
		],
		popularity: 10,
		related: [
			"luxe",
			"glam",
			"popular",
			"wild",
			"trendy"
		]
	},
	{
		key: "dynamic",
		name: "Dynamic",
		definition: "Constantly changing and evolving",
		affirmations: [
			"Try shifting your mindset today",
			"Let’s be kind together.",
			"Make a list of all the things you’re grateful for rn.",
			"Stay open to new ideas today"
		],
		popularity: 20,
		related: [
			"unique",
			"popular",
			"cool"
		]
	},
	{
		key: "earthy",
		name: "Earthy",
		popularity: 10,
		related: [
			"sustainable",
			"green"
		]
	},
	{
		key: "eccentric",
		name: "Eccentric",
		popularity: 20
	},
	{
		key: "eclectic",
		name: "Eclectic",
		definition: "Diverse styles and tastes",
		affirmations: [
			"Living life in full",
			"Discover your next favorite thing",
			"Picture new possibilities",
			"Challenge yourself today",
			"Always keep those tricks up your sleeves",
			"Stay ahead of life's infinite possibilities",
			"You are unique"
		],
		popularity: 10,
		related: [
			"funky",
			"quirky",
			"whimsical",
			"indie",
			"delightful",
			"curious"
		]
	},
	{
		key: "eco",
		name: "Eco",
		alias: "Ecological",
		popularity: 60,
		related: [
			"sustainable",
			"earthy",
			"thrifting",
			"recycled"
		]
	},
	{
		key: "educational",
		name: "Educational",
		popularity: 30
	},
	{
		key: "eerie",
		name: "Eerie",
		popularity: 10
	},
	{
		key: "elegant",
		name: "Elegant",
		definition: "Refined style and taste",
		affirmations: [
			"You deserve a slide of goodness"
		],
		popularity: 20,
		related: [
			"fancy",
			"exclusive",
			"classic",
			"glam",
			"luxe"
		]
	},
	{
		key: "elevated",
		name: "Elevated",
		definition: "Positivity and respect",
		popularity: 400
	},
	{
		key: "emo",
		name: "Emo",
		popularity: 10
	},
	{
		key: "emotional",
		name: "Emotional",
		popularity: 30
	},
	{
		key: "enchanted",
		name: "Enchanted",
		popularity: 10
	},
	{
		key: "energetic",
		name: "Energetic",
		definition: "Full of vitality and possibility",
		affirmations: [
			"A positive attitude boosts your energy",
			"Let your path look different today",
			"The world needs your energy today"
		],
		popularity: 100,
		related: [
			"lively",
			"vibrant",
			"wild"
		]
	},
	{
		key: "entertaining",
		name: "Entertaining",
		popularity: 110
	},
	{
		key: "enthusiastic",
		name: "Enthusiastic",
		popularity: 10
	},
	{
		key: "entrepreneurial",
		name: "Entrepreneurial",
		popularity: 10
	},
	{
		key: "euro",
		name: "Euro",
		popularity: 10
	},
	{
		key: "evergreen",
		name: "Evergreen",
		popularity: 10
	},
	{
		key: "exciting",
		name: "Exciting",
		definition: "Beyond stoked",
		affirmation: [
			"It’s time for one new daily ritual!",
			"Stay open to deeper connections today.",
			"The world needs your enthusiasm. Get out there.",
			"Stay open to adventure"
		],
		popularity: 400,
		related: [
			"fun",
			"adventurous"
		]
	},
	{
		key: "exclusive",
		name: "Exclusive",
		popularity: 10
	},
	{
		key: "experiential",
		name: "Experiential",
		popularity: 10
	},
	{
		key: "experimental",
		name: "Experimental",
		popularity: 10
	},
	{
		key: "explore",
		name: "Explore",
		definition: "A new path",
		popularity: 200
	},
	{
		key: "family",
		name: "Family",
		definition: "Together with parents, children, and friends",
		affirmations: [
			"Taking time to show the genes some love",
			"Pouring good love into my people",
			"Take time to enjoy your people",
			"Send a loved one your favorite poem",
			"Engage more with family + community",
			"Organize your family heirlooms="
		],
		popularity: 1000,
		related: [
			"together",
			"love"
		]
	},
	{
		key: "fancy",
		name: "Fancy",
		popularity: 50
	},
	{
		key: "fantastic",
		name: "Fantastic",
		popularity: 20
	},
	{
		key: "farout",
		name: "Farout",
		popularity: 10
	},
	{
		key: "fashion",
		name: "Fashion",
		popularity: 400
	},
	{
		key: "fashionista",
		name: "Fashionista",
		definition: "All about the glam",
		popularity: 10,
		related: [
			"treatyourself",
			"shopaholic"
		]
	},
	{
		key: "favorite",
		name: "Favorite",
		popularity: 400
	},
	{
		key: "feminist",
		name: "Feminist",
		popularity: 10
	},
	{
		key: "femme",
		name: "Femme",
		popularity: 10
	},
	{
		key: "festive",
		name: "Festive",
		definition: "Cheerful and colorful gathering",
		affirmations: [
			"Be the life of the party"
		],
		popularity: 40,
		related: [
			"celebratory",
			"wild",
			"fun",
			"loud"
		]
	},
	{
		key: "fierce",
		name: "fierce",
		popularity: 10
	},
	{
		key: "film",
		name: "Film",
		popularity: 10
	},
	{
		key: "flavorful",
		name: "Flavorful",
		popularity: 10
	},
	{
		key: "folk",
		name: "Folk",
		definition: "Traditions of everyday people",
		affirmations: [
			"Make time to look at the Moon",
			"Honor the wisdom traditions",
			"Get outside for some life-giving light today.",
			"Look within for warmth"
		],
		popularity: 200,
		related: [
			"traditional",
			"classic",
			"retro",
			"throwback",
			"nostalgic",
			"old-school"
		]
	},
	{
		key: "foodie",
		name: "Foodie",
		popularity: 4000
	},
	{
		key: "free",
		name: "Free",
		definition: "No cost",
		popularity: 2000
	},
	{
		key: "fresh",
		name: "Fresh",
		definition: "Nice, new, and refreshing",
		affirmation: [
			"Savor something crisp, sweet and made from light"
		],
		popularity: 200
	},
	{
		key: "frosty",
		name: "Frosty",
		popularity: 10
	},
	{
		key: "friendly",
		name: "Friendly",
		definition: "Kind and inviting",
		affirmations: [
			"Open the door to friendship"
		],
		popularity: 60
	},
	{
		key: "fun",
		name: "Fun",
		definition: "Enjoyment and laughter",
		affirmations: [
			"Plan a playdate"
		],
		popularity: 6000
	},
	{
		key: "funky",
		name: "Funky",
		popularity: 130
	},
	{
		key: "funny",
		name: "Funny",
		definition: "Comedic relief",
		affirmations: [
			"Remember to laugh",
			"A Laughter is essential to survival.",
			"Truth comes through laughter.",
			"Creative optimism is your outlook today.",
			"Engage in creative laughter today."
		],
		popularity: 1000,
		related: [
			"fun",
			"comedy",
			"wild",
			"playful"
		]
	},
	{
		key: "fusion",
		name: "Fusion",
		popularity: 10
	},
	{
		key: "futuristic",
		name: "Futuristic",
		popularity: 70
	},
	{
		key: "games",
		name: "Games",
		popularity: 2400
	},
	{
		key: "garden",
		name: "Garden",
		definition: "Growth of fruits and flowers",
		affirmation: [
			"Admire new growth in something old"
		],
		popularity: 1000
	},
	{
		key: "gay",
		name: "Gay",
		popularity: 90
	},
	{
		key: "geeky",
		name: "Geeky",
		definition: "Profound Enthusiasm",
		affirmations: [
			"Belonging is a club for us all"
		],
		popularity: 10,
		related: [
			"nerdy"
		]
	},
	{
		key: "generous",
		name: "Generous",
		definition: "Abundance of giving",
		affirmations: [
			"Pay something forward"
		],
		popularity: 10
	},
	{
		key: "gentle",
		name: "Gentle",
		popularity: 10
	},
	{
		key: "glam",
		name: "Glam",
		definition: "Beautiful beyond compare.",
		affirmations: [
			"Your light is strong"
		],
		popularity: 10,
		related: [
			"luxe",
			"beautiful",
			"exclusive",
			"fancy",
			"drip"
		]
	},
	{
		key: "granola",
		name: "Granola",
		popularity: 10
	},
	{
		key: "grateful",
		name: "Grateful",
		popularity: 10
	},
	{
		key: "gritter",
		name: "Glitter",
		popularity: 10
	},
	{
		key: "grimy",
		name: "Grimy",
		popularity: 10
	},
	{
		key: "grunge",
		name: "Grunge",
		popularity: 10
	},
	{
		key: "gothic",
		name: "Gothic",
		popularity: 30
	},
	{
		key: "halloween",
		name: "Halloween",
		popularity: 50
	},
	{
		key: "handmade",
		name: "Handmade",
		popularity: 40
	},
	{
		key: "hanukkah",
		name: "Hanukkah",
		popularity: 10
	},
	{
		key: "harmonious",
		name: "Harmonious",
		definition: "Positive balance",
		popularity: 10
	},
	{
		key: "happy",
		name: "Happy",
		popularity: 260
	},
	{
		key: "healthy",
		name: "Healthy",
		definition: "All about what is good for you",
		affirmation: [
			"Make your self care a priority",
			"Take care of yourself"
		],
		popularity: 200,
		related: [
			"natural",
			"hiking",
			"green"
		]
	},
	{
		key: "hearty",
		name: "Hearty",
		popularity: 10
	},
	{
		key: "helpful",
		name: "Helpful",
		popularity: 10
	},
	{
		key: "heritage",
		name: "Heritage",
		popularity: 40
	},
	{
		key: "hidden-gem",
		name: "Hidden Gem",
		definition: "Not widely known",
		popularity: 180,
		related: [
			"deepcut",
			"classic",
			"unique",
			"secret"
		]
	},
	{
		key: "hifi",
		name: "Hi Fi",
		definition: "All about that high quality",
		affirmations: [
			"You deserve the best"
		],
		popularity: 70,
		related: [
			"exclusive",
			"fancy",
			"glam",
			"luxe",
			"authentic"
		]
	},
	{
		key: "highbrow",
		name: "Highbrow",
		popularity: 10
	},
	{
		key: "hiking",
		name: "Hiking",
		definition: "Walking around in nature",
		affirmation: [
			"The outdoors is calling"
		],
		popularity: 1600,
		related: [
			"healthy",
			"adventurous",
			"outdoors"
		]
	},
	{
		key: "hip",
		name: "Hip",
		popularity: 60
	},
	{
		key: "hip-hop",
		name: "Hip Hop",
		popularity: 10
	},
	{
		key: "hippie",
		name: "Hippie",
		definition: "Chill out",
		affirmations: [
			"Dance to the beat of your own drum"
		],
		popularity: 90,
		related: [
			"natural",
			"botanical",
			"chill",
			"radical",
			"wild"
		]
	},
	{
		key: "hipster",
		name: "Hipster",
		popularity: 200
	},
	{
		key: "historic",
		name: "Historic",
		definition: "Places of importance",
		affirmations: [
			"Cross paths with so many who came before"
		],
		popularity: 800
	},
	{
		key: "holiday",
		name: "Holiday",
		popularity: 10
	},
	{
		key: "holistic",
		name: "Holistic",
		popularity: 10
	},
	{
		key: "hollywood",
		name: "Hollywood",
		popularity: 20
	},
	{
		key: "Homemade",
		name: "Homemade",
		popularity: 10
	},
	{
		key: "hot",
		name: "Hot",
		popularity: 80
	},
	{
		key: "hangover",
		name: "Hangover",
		popularity: 10
	},
	{
		key: "hustle",
		name: "Hustle",
		popularity: 10
	},
	{
		key: "hygge",
		name: "Hygge",
		definition: "Cozy & Comfortable",
		popularity: 20
	},
	{
		key: "inclusive",
		name: "Inclusive",
		definition: "Open to everyone",
		affirmations: [
			"Embracing the other. This is love.",
			"Finding common ground takes a good heart",
			"Be especially open to the beauty of others today",
			"Love is the most healing medicine",
			"Who’s missing? Work on acknowledgement and awareness today",
			"Set an intention to bridge the gap today"
		],
		popularity: 40,
		related: [
			"proud",
			"community",
			"solidarity",
			"diverse"
		]
	},
	{
		key: "industrial",
		name: "Industrial",
		popularity: 10
	},
	{
		key: "indie",
		name: "Indie",
		definition: "Independent and original",
		popularity: 70
	},
	{
		key: "influencial",
		name: "Influencial",
		popularity: 10
	},
	{
		key: "innovative",
		name: "Innovative",
		popularity: 20
	},
	{
		key: "inventive",
		name: "Inventive",
		popularity: 10
	},
	{
		key: "inspired",
		name: "Inspired",
		definition: "Brilliant and life affirming",
		affirmations: [
			"Spiritual places are calling",
			"Your inner beauty is shining",
			"Smiling makes the brain think happy thoughts",
			"Breathe deeper"
		],
		popularity: 40,
		related: [
			"whimsical",
			"love",
			"refreshing",
			"classic",
			"joyful"
		]
	},
	{
		key: "intense",
		name: "Intense",
		popularity: 10
	},
	{
		key: "interactive",
		name: "Interactive",
		popularity: 200
	},
	{
		key: "intergenerational",
		name: "Intergenerational",
		popularity: 10
	},
	{
		key: "international",
		name: "International",
		popularity: 10
	},
	{
		key: "interesting",
		name: "Interesting",
		definition: "Arousing curiosity and feeling",
		popularity: 400
	},
	{
		key: "intimate",
		name: "Intimate",
		definition: "Warmth of closeness",
		affirmations: [
			"Intimacy flourishes in safe spaces"
		],
		popularity: 40,
		related: [
			"sensual",
			"love",
			"small",
			"quiet",
			"datespot"
		]
	},
	{
		key: "jazzy",
		name: "Jazzy",
		definition: "Eye catching style",
		popularity: 10,
		related: [
			"shimmy",
			"colorful",
			"wild",
			"dance",
			"stylish",
			"musical"
		]
	},
	{
		key: "juicy",
		name: "Juicy",
		popularity: 10
	},
	{
		key: "justice",
		name: "Justice"
	},
	{
		key: "joyful",
		name: "Joyful",
		definition: "Feeling great pleasure and happiness",
		affirmations: [
			"Be happy with yourself",
			"Looking for joy is a pleasure itself"
		],
		popularity: 20
	},
	{
		key: "kidcore",
		name: "Kidcore",
		popularity: 10
	},
	{
		key: "kitschy",
		name: "Kitschy",
		affirmations: [
			"The oddest things can bring the greatest joys"
		],
		popularity: 10
	},
	{
		key: "kindness",
		name: "Kindness",
		popularity: 30
	},
	{
		key: "kinky",
		name: "Kinky",
		popularity: 80
	},
	{
		key: "kosher",
		name: "Kosher",
		popularity: 30
	},
	{
		key: "laidback",
		name: "Laid-back",
		popularity: 10
	},
	{
		key: "latenight",
		name: "Late Night",
		popularity: 10
	},
	{
		key: "lax",
		name: "Lax",
		popularity: 10
	},
	{
		key: "laugh",
		name: "Laugh",
		popularity: 10
	},
	{
		key: "legacy",
		name: "Legacy",
		popularity: 10
	},
	{
		key: "legit",
		name: "Legit",
		popularity: 10
	},
	{
		key: "liberating",
		name: "Liberating",
		popularity: 10
	},
	{
		key: "lit",
		name: "Lit",
		definition: "It's happening",
		affirmations: [
			"Find yourself amongst the crowds"
		],
		popularity: 20,
		related: [
			"poppin",
			"wild",
			"radical",
			"loud",
			"crazy",
			"dance",
			"shimmy",
			"lively",
			"hifi",
			"vibrant",
			"turnedup",
			"drip"
		]
	},
	{
		key: "literary",
		name: "Literary",
		popularity: 10
	},
	{
		key: "lively",
		name: "Lively",
		definition: "Full of energy and activity",
		affirmations: [
			"Enjoy the sound of indistinct chatter",
			"Stay open to having a wild experience today",
			"Visualize a vibrant space. Now let’s go.",
			"Set a new intention today.",
			"Find a setting full of activity and excitement today"
		],
		popularity: 10,
		related: [
			"loud",
			"popular",
			"trendy",
			"vibrant"
		]
	},
	{
		key: "loud",
		name: "Loud",
		definition: "It's turned up",
		affirmations: [
			"Let your voice be heard"
		],
		popularity: 10,
		related: [
			"lively"
		]
	},
	{
		key: "local",
		name: "Local",
		definition: "Belonging to a nearby area and community",
		affirmations: [
			"Actively supporting my network",
			"Making time for mutual growth",
			"Today's mantra, I am home",
			"Spread that local love today",
			"See some local history today"
		],
		popularity: 6000,
		related: [
			"community",
			"inclusive",
			"civic",
			"proud",
			"cultural"
		]
	},
	{
		key: "lunch",
		name: "Lunch",
		popularity: 200,
		related: [
			"casual",
			"nosh",
			"snacky",
			"tasty"
		]
	},
	{
		key: "lumberjack",
		name: "Lumberjack",
		popularity: 60
	},
	{
		key: "luxe",
		name: "Luxe",
		definition: "So glamourous",
		affirmations: [
			"You define your beauty"
		],
		popularity: 10,
		related: [
			"beautiful",
			"glam",
			"exclusive",
			"fancy",
			"drip",
			"pretty"
		]
	},
	{
		key: "luxury",
		name: "Luxury",
		definition: "So fancy",
		affirmations: [
			"You define your beauty"
		],
		popularity: 80,
		related: [
			"beautiful",
			"glam",
			"exclusive",
			"fancy",
			"drip",
			"pretty"
		]
	},
	{
		key: "love",
		name: "Love",
		definition: "Profound affection for yourself and others",
		affirmations: [
			"The magnificent opportunities of an open heart",
			"Devotion is a powerful lesson",
			"Valuing the unions in our life",
			"A healthy dose of acceptance helps"
		],
		popularity: 40,
		related: [
			"romantic",
			"intimate",
			"family"
		]
	},
	{
		key: "magical",
		name: "Magical",
		definition: "Beyond the ordinary",
		affirmations: [
			"Life bringing surprises & triumphs",
			"There is magic in showing up",
			"Find inspiration is somewhere unexpected",
			"Remember how extraordinary you are",
			"Radiate your warm, friendly energy",
			"Serendipity is best experienced with others"
		],
		popularity: 60,
		related: [
			"whimsical",
			"witchy",
			"unique",
			"delightful",
			"eclectic",
			"wild",
			"strange"
		]
	},
	{
		key: "messy",
		name: "Messy",
		popularity: 20
	},
	{
		key: "mellow",
		name: "Mellow",
		popularity: 10,
		related: [
			"chill",
			"calm"
		]
	},
	{
		key: "mermaid",
		name: "Mermaid",
		definition: "From the land to the sea",
		affirmations: [
			"Be authentically yourself"
		],
		popularity: 20,
		related: [
			"colorful",
			"aquatic",
			"nautical",
			"sexy"
		]
	},
	{
		key: "mid-century",
		name: "Mid-century",
		popularity: 10
	},
	{
		key: "mindful",
		name: "Mindful",
		definition: "Aware of the present",
		affirmations: [
			"Dig. Deep. Down.",
			"Envision a new way of being",
			"Turning your gaze toward yourself",
			"Show up for yourself today",
			"Make sure your needs are met",
			"Each moment is new",
			"Wherever you go, you’re the person you’ll meet when you get there"
		],
		popularity: 30,
		related: [
			"zen",
			"chill",
			"quite",
			"calm",
			"relaxing",
			"inspired"
		]
	},
	{
		key: "minimalist",
		name: "Minimalist",
		definition: "Simple and good use of effort",
		affirmations: [
			"Freeing up mental space for new opportunities"
		],
		popularity: 10,
		related: [
			"airy",
			"modern",
			"open"
		]
	},
	{
		key: "mingle",
		name: "Mingle",
		popularity: 10
	},
	{
		key: "modern",
		name: "Modern",
		popularity: 90
	},
	{
		key: "moody",
		name: "Moody",
		definition: "A sudden burst of a mood",
		affirmations: [
			"Be flexible as your personality evolves",
			"Stay tuned in with your feelings"
		],
		popularity: 10,
		related: [
			"dark",
			"eclectic",
			"mood",
			"quiky",
			"nightlife",
			"intense"
		]
	},
	{
		key: "morning",
		name: "Morning",
		popularity: 40,
		related: [
			"aware",
			"bright",
			"fresh",
			"sunny"
		]
	},
	{
		key: "musical",
		name: "Musical",
		definition: "Sounds of feeling and harmony",
		affirmations: [
			"Curating a joyful playfist",
			"Music is like mother’s medicine",
			"Slow down with a slow jam today"
		],
		popularity: 10,
		related: [
			"jazzy",
			"shimmy",
			"dance",
			"loud",
			"relaxing",
			"fun"
		]
	},
	{
		key: "mysterious",
		name: "Mysterious",
		popularity: 20
	},
	{
		key: "mystic",
		name: "Mystic",
		definition: "Holding onto that spiritual magic",
		affirmations: [
			"Your hold your own power"
		],
		popularity: 10,
		related: [
			"witchy",
			"spiritual",
			"magical",
			"wild",
			"radical"
		]
	},
	{
		key: "namaste",
		name: "Namaste",
		popularity: 10
	},
	{
		key: "natural",
		name: "Natural",
		definition: "Of the earth",
		affirmation: [
			"Be one with the land",
			"Be part of the natural world"
		],
		popularity: 60,
		related: [
			"hiking",
			"botanical",
			"fresh",
			"outdoors",
			"mystic",
			"green",
			"plant"
		]
	},
	{
		key: "nautical",
		name: "Nautical",
		popularity: 10,
		related: [
			"aquatic",
			"historic",
			"mermaid"
		]
	},
	{
		key: "neighborhood",
		name: "Neighborhood",
		popularity: 130,
		related: [
			"local",
			"community"
		]
	},
	{
		key: "nerdy",
		name: "Nerdy",
		popularity: 10,
		related: [
			"geeky",
			"curious"
		]
	},
	{
		key: "neon",
		name: "Neon",
		definition: "All the bright lights",
		affirmation: [
			"Shine your brightest"
		],
		popularity: 70,
		related: [
			"colorful",
			"dance",
			"shimmy",
			"drip",
			"bright",
			"nightlife",
			"drinking"
		]
	},
	{
		key: "new",
		name: "New",
		popularity: 200
	},
	{
		key: "new-wave",
		name: "New Wave",
		popularity: 10
	},
	{
		key: "nightlife",
		name: "Nightlife",
		popularity: 200,
		related: [
			"buzzing",
			"latenight",
			"musical",
			"lively"
		]
	},
	{
		key: "nosh",
		name: "Nosh",
		definition: "Snack on",
		popularity: 60
	},
	{
		key: "nostalgic",
		name: "nostalgic",
		definition: "Rememberance of the past",
		affirmations: [
			"Recreate some aspect of local history",
			"A nostalgic experience is in your future"
		],
		popularity: 10,
		related: [
			"analog",
			"classic",
			"histroic",
			"deepcut",
			"old-school",
			"traditional",
			"retro",
			"throwback",
			"traditional",
			"vintage"
		]
	},
	{
		key: "novel",
		name: "Novel",
		popularity: 10
	},
	{
		key: "oasis",
		name: "Oasis",
		definition: "Like finding water in the desert",
		affirmation: [
			"Share a hidden gem",
			"Trust what feels easy today",
			"Take one action toward improving wellness today",
			"Prioritize what your body needs right now",
			"Turn the volume down on the world today."
		],
		popularity: 80,
		related: [
			"tropical",
			"hiddengem",
			"secret"
		]
	},
	{
		key: "ocean",
		name: "Ocean",
		popularity: 90
	},
	{
		key: "old",
		name: "Old",
		popularity: 400
	},
	{
		key: "oldschool",
		name: "Old School",
		alias: "old-school",
		definition: "Respect for the coolness of earlier eras",
		affirmations: [
			"Remember to keep it evergreen",
			"Recreate some aspect of local history",
			"A nostalgic experience is in your future"
		],
		popularity: 80,
		related: [
			"analog",
			"classic",
			"histroic",
			"deepcut",
			"nostalgic",
			"old-school",
			"traditional",
			"retro",
			"throwback",
			"vintage"
		]
	},
	{
		key: "old-world",
		name: "Old-World",
		popularity: 10
	},
	{
		key: "open",
		name: "Open",
		popularity: 10
	},
	{
		key: "oregon",
		name: "Oregon",
		popularity: 10
	},
	{
		key: "optimistic",
		name: "Optimistic",
		popularity: 10
	},
	{
		key: "opulent",
		name: "Opulent",
		popularity: 10
	},
	{
		key: "organic",
		name: "Organic",
		popularity: 180,
		related: [
			"sustainable",
			"healthy"
		]
	},
	{
		key: "outdoors",
		name: "Outdoors",
		definition: "Outside in open air",
		affirmations: [
			"Nurturing the soul through nature",
			"Explore the sun, the stars, the elements and yourself",
			"Being one with the sun, the stars, the elements"
		],
		popularity: 100,
		related: [
			"adventurous",
			"hiking",
			"scenic",
			"views",
			"garden",
			"sunny",
			"relaxing",
			"adventurous",
			"experiential",
			"rugged",
			"natural"
		]
	},
	{
		key: "outdoorsy",
		name: "Outdoorsy",
		definition: "Beinging one with the land",
		popularity: 320,
		related: [
			"adventurous",
			"rugged",
			"hiking",
			"scenic",
			"views",
			"garden",
			"camp",
			"sunny",
			"relaxing",
			"adventurous",
			"experiential",
			"rugged",
			"natural"
		]
	},
	{
		key: "outrageous",
		name: "Outrageous",
		popularity: 10
	},
	{
		key: "paranormal",
		name: "Paranormal",
		popularity: 10
	},
	{
		key: "participatory",
		name: "Participatory",
		popularity: 10
	},
	{
		key: "panoramic",
		name: "Panoramic",
		definition: "A wide beautiful view",
		popularity: 200,
		related: [
			"scenic",
			"views"
		]
	},
	{
		key: "paradise",
		name: "Paradise",
		popularity: 10
	},
	{
		key: "parisian",
		name: "Parisian",
		definition: "Everyday, effortless chic",
		popularity: 10,
		related: [
			"stylish",
			"classy",
			"modern",
			"minimalist"
		]
	},
	{
		key: "park",
		name: "Park",
		definition: "The outdoor spaces we all share",
		affirmations: [
			"Enjoy a break and people watch"
		],
		popularity: 170,
		related: [
			"airy",
			"cozy",
			"outdoors",
			"sunny"
		]
	},
	{
		key: "party",
		name: "Party",
		popularity: 50
	},
	{
		key: "passionate",
		name: "Passionate",
		definition: "The act of caring for something",
		affirmations: [
			"Lean in to what you care about"
		],
		popularity: 10,
		related: [
			"love",
			"sensual",
			"caring",
			"intimate"
		]
	},
	{
		key: "patio",
		name: "Patio",
		definition: "Relaxation shared outdoors",
		affirmations: [
			"Enjoy a break and people watch"
		],
		popularity: 480,
		related: [
			"airy",
			"cozy",
			"outdoors",
			"sunny"
		]
	},
	{
		key: "pastel",
		name: "Pastel",
		definition: "Dreamy & Calm",
		popularity: 10
	},
	{
		key: "peaceful",
		name: "Peaceful",
		definition: "Tranquil and undisturbed",
		affirmations: [
			"Finding room to breathe",
			"Breathe deeper",
			"A slice of something soothing and lush",
			"Take the amount of space you need to feel comfortable",
			"Pools of peace can be found within"
		],
		popularity: 110,
		related: [
			"chill",
			"serene",
			"calm",
			"joyful",
			"gentle",
			"safe",
			"inclusive"
		]
	},
	{
		key: "perspective",
		name: "Perspective",
		popularity: 10
	},
	{
		key: "photo",
		name: "Photo",
		popularity: 10
	},
	{
		key: "picnic",
		name: "Picnic",
		definition: "Afternoon in the park",
		affirmations: [
			"Seeing an old view a new way"
		],
		popularity: 10,
		related: [
			"chill",
			"outdoors",
			"sunny",
			"views"
		]
	},
	{
		key: "plant",
		name: "Plant",
		popularity: 400
	},
	{
		key: "playful",
		name: "Playful",
		definition: "Fun and games",
		affirmations: [
			"Make an errand a game",
			"Take time to enjoy pets & animals",
			"Breathe deeper",
			"You are already blossoming",
			"Reconnect with your inner child"
		],
		popularity: 10,
		related: [
			"fun",
			"happy",
			"whimsical"
		]
	},
	{
		key: "popular",
		name: "Popular",
		definition: "It's lit",
		affirmations: [
			"Joy multiplies when shared widely",
			"Do one activity beloved by many",
			"Follow one trend today",
			"Reconnect with a big city landmark",
			"Look at the city with fresh eyes"
		],
		popularity: 260,
		related: [
			"trendy",
			"lit",
			"vibrant",
			"lively"
		]
	},
	{
		key: "popping",
		name: "Poppin'",
		definition: "It's on fire.",
		popularity: 10,
		related: [
			"turnedup",
			"lively",
			"vibrant",
			"wild",
			"loud"
		]
	},
	{
		key: "popup",
		name: "Popup",
		definition: "Ephemeral experiences",
		popularity: 40
	},
	{
		key: "posh",
		name: "Posh",
		popularity: 140
	},
	{
		key: "positive",
		name: "Positive",
		definition: "Good vibes only",
		affirmations: [
			"Pass along good vibes"
		],
		popularity: 390,
		related: [
			"happy",
			"open",
			"fun"
		]
	},
	{
		key: "pretty",
		name: "Pretty",
		popularity: 10
	},
	{
		key: "proud",
		name: "Proud",
		definition: "Deserved power and pleasure",
		affirmations: [
			"Speaking truth without hesitation",
			"Reclaiming our stories",
			"Find a new way to engage in civic pride",
			"Give attention to your story",
			"Write yourself a love letter",
			"Our collective dreams can be reached together",
			"Act in service of your core values"
		],
		popularity: 10,
		related: [
			"community",
			"solidarity",
			"inspired",
			"radical",
			"civic"
		]
	},
	{
		key: "pumpkin",
		name: "Pumpkin",
		popularity: 10
	},
	{
		key: "public",
		name: "Public",
		popularity: 10
	},
	{
		key: "punk",
		name: "Punk",
		popularity: 70
	},
	{
		key: "queer",
		name: "Queer",
		popularity: 10
	},
	{
		key: "quiet",
		name: "Quiet",
		definition: "A space with little noise",
		affirmations: [
			"Being comfortable in silence",
			"Listen for that divine intelligence",
			"Establish a calm environment today",
			"Be grounded and completely present"
		],
		popularity: 30,
		related: [
			"calm",
			"peaceful",
			"safe",
			"chill"
		]
	},
	{
		key: "quirky",
		name: "Quirky",
		popularity: 10
	},
	{
		key: "radical",
		name: "Radical",
		definition: "On the edge of the common",
		affirmation: [
			"Bravely go out into the world",
			"Move beyond your wildest dreams"
		],
		popularity: 10,
		related: [
			"hippie",
			"rebel",
			"community",
			"proud",
			"solidarity"
		]
	},
	{
		key: "rainbow",
		name: "Rainbow",
		popularity: 10
	},
	{
		key: "raunchy",
		name: "Raunchy",
		popularity: 10
	},
	{
		key: "rebel",
		name: "Rebel",
		definition: "Outside the box and savage af",
		affirmations: [
			"Learn the rules and bend them"
		],
		popularity: 40,
		related: [
			"solidarity",
			"unexpected",
			"wild",
			"proud",
			"activist"
		]
	},
	{
		key: "recyled",
		name: "Recyled",
		popularity: 10,
		related: [
			"sustainable",
			"earthy",
			"thrifting"
		]
	},
	{
		key: "refined",
		name: "Refined",
		popularity: 40
	},
	{
		key: "refreshing",
		name: "Refreshing",
		popularity: 10
	},
	{
		key: "relaxing",
		name: "Relaxing",
		definition: "Release of tension",
		affirmations: [
			"Doing nothing is fine",
			"Let go"
		],
		popularity: 170
	},
	{
		key: "rejuvenating",
		name: "Rejuvenating",
		popularity: 10
	},
	{
		key: "renowned",
		name: "Renowned",
		popularity: 10
	},
	{
		key: "restorative",
		name: "Restorative",
		popularity: 10
	},
	{
		key: "reuse",
		name: "Reuse",
		popularity: 10
	},
	{
		key: "retro",
		name: "Retro",
		definition: "Styles of the past",
		affirmations: [
			"Honor the things that came before",
			"Give respect to the coolness of earlier eras",
			"Vintage is built to last - go explore why"
		],
		popularity: 240,
		related: [
			"nostalgic",
			"traditional",
			"classic",
			"funky",
			"eclectic",
			"throwback",
			"analog",
			"deepcut"
		]
	},
	{
		key: "revolutionary",
		name: "Revolutionary",
		popularity: 10
	},
	{
		key: "rock",
		name: "Rock",
		popularity: 120
	},
	{
		key: "romantic",
		name: "Romantic",
		definition: "Grand feelings, especially love",
		affirmations: [
			"Nothing nourishes like a warm embrace",
			"There is more love awaiting",
			"Love is there even when not easy to see"
		],
		popularity: 400,
		related: [
			"sensual",
			"love",
			"intimate"
		]
	},
	{
		key: "roadhouse",
		name: "Roadhouse",
		popularity: 10,
		related: [
			"cozy",
			"lively",
			"rebel"
		]
	},
	{
		key: "rowdy",
		name: "Rowdy",
		popularity: 10
	},
	{
		key: "rugged",
		name: "Rugged",
		definition: "Wild & rough",
		popularity: 10,
		related: [
			"outdoorsy",
			"hiking",
			"camp"
		]
	},
	{
		key: "rustic",
		name: "Rustic",
		popularity: 10
	},
	{
		key: "safe",
		name: "Safe",
		popularity: 10
	},
	{
		key: "sassy",
		name: "Sassy",
		popularity: 10
	},
	{
		key: "savory",
		name: "Savory",
		popularity: 10
	},
	{
		key: "scenic",
		name: "Scenic",
		definition: "Impressive and beautiful views",
		affirmations: [
			"Seeing an old view a new way"
		],
		popularity: 380,
		related: [
			"outdoors",
			"views"
		]
	},
	{
		key: "scuba",
		name: "Scuba",
		popularity: 10
	},
	{
		key: "shopaholic",
		name: "Shopaholid",
		definition: "Shop till you drop",
		popularity: 10,
		related: [
			"treatyourself",
			"glam"
		]
	},
	{
		key: "seasonal",
		name: "Seasonal",
		popularity: 10
	},
	{
		key: "selfcare",
		name: "Self Care",
		definition: "Take care of yourself",
		popularity: 400,
		related: [
			"treatyourself",
			"healthy",
			"positive"
		]
	},
	{
		key: "secret",
		name: "Secret",
		popularity: 280
	},
	{
		key: "serene",
		name: "Serene",
		popularity: 10
	},
	{
		key: "sensual",
		name: "Sensual",
		definition: "Invoking the senses",
		affirmations: [
			"A warm embrace is so nourishing",
			"There is more love ahead"
		],
		popularity: 10,
		related: [
			"romantic",
			"intimate",
			"love"
		]
	},
	{
		key: "shimmy",
		name: "Shimmy",
		definition: "Shakin' & swayin'",
		affirmations: [
			"Move with the beat of the music"
		],
		popularity: 10,
		related: [
			"dance",
			"jazzy",
			"lit",
			"turnedup"
		]
	},
	{
		key: "silly",
		name: "Silly",
		popularity: 140
	},
	{
		key: "simple",
		name: "Simple",
		popularity: 70
	},
	{
		key: "singing",
		name: "Singing",
		popularity: 10
	},
	{
		key: "skate",
		name: "Skate",
		popularity: 10
	},
	{
		key: "slurpy",
		name: "Slurpy",
		popularity: 10
	},
	{
		key: "small",
		name: "Small",
		popularity: 20
	},
	{
		key: "smokey",
		name: "Smokey",
		popularity: 10
	},
	{
		key: "social",
		name: "Social",
		affirmations: [
			"Get together with good energy"
		],
		popularity: 10
	},
	{
		key: "snacky",
		name: "Snacky",
		popularity: 10,
		related: [
			"nosh",
			"tasty"
		]
	},
	{
		key: "snowy",
		name: "Snowy",
		popularity: 10
	},
	{
		key: "sober",
		name: "Sober",
		popularity: 10
	},
	{
		key: "solidarity",
		name: "In Solidarity",
		alias: "in-solidarity",
		definition: "Common good",
		affirmations: [
			"Goodness in groups multiplies"
		],
		popularity: 20,
		related: [
			"community",
			"inclusive",
			"positive",
			"proud",
			"black-owned",
			"women-owned"
		]
	},
	{
		key: "soothing",
		name: "Soothing",
		popularity: 10
	},
	{
		key: "soulful",
		name: "Soulful",
		popularity: 40
	},
	{
		key: "sophisticated",
		name: "Sophisticated",
		popularity: 10
	},
	{
		key: "sparkly",
		name: "Sparkly",
		popularity: 10,
		related: [
			"colorful",
			"glitter"
		]
	},
	{
		key: "special",
		name: "Special",
		popularity: 90
	},
	{
		key: "spicy",
		name: "Spicy",
		popularity: 80
	},
	{
		key: "spontaneous",
		name: "Spontaneous",
		popularity: 900
	},
	{
		key: "sporty",
		name: "Sporty",
		popularity: 10
	},
	{
		key: "spooky",
		name: "Spooky",
		popularity: 140
	},
	{
		key: "strange",
		name: "Strange",
		popularity: 40
	},
	{
		key: "sublime",
		name: "Sublime",
		popularity: 40
	},
	{
		key: "subversive",
		name: "Subversive",
		popularity: 10
	},
	{
		key: "sugary",
		name: "Sugary",
		popularity: 10
	},
	{
		key: "summer",
		name: "Summer",
		popularity: 200,
		related: [
			"buzzing",
			"free",
			"happy",
			"fun",
			"chill"
		]
	},
	{
		key: "sunny",
		name: "Sunny",
		popularity: 40
	},
	{
		key: "sunset",
		name: "Sunset",
		definition: "Full of warmth and light",
		affirmations: [
			"Sunshine unites all life"
		],
		popularity: 1800
	},
	{
		key: "sunny",
		name: "Sunny",
		popularity: 10
	},
	{
		key: "surf",
		name: "Surf",
		popularity: 10
	},
	{
		key: "sustainable",
		name: "Sustainable",
		definition: "Good for the long term",
		popularity: 80,
		related: [
			"earthy",
			"green",
			"healthy"
		]
	},
	{
		key: "supportive",
		name: "Supportive",
		popularity: 10
	},
	{
		key: "sweet",
		name: "Sweet",
		popularity: 10
	},
	{
		key: "tasty",
		name: "Tasty",
		popularity: 20
	},
	{
		key: "thrift",
		name: "Thrift",
		definition: "Using a second time",
		popularity: 90,
		related: [
			"earthy",
			"vintage",
			"sustainable"
		]
	},
	{
		key: "tiki",
		name: "Tiki",
		popularity: 10
	},
	{
		key: "throwback",
		name: "Throwback",
		definition: "Of another time",
		affirmations: [
			"Hold your memories close"
		],
		popularity: 10,
		related: [
			"classic",
			"exclusive",
			"nostalgic",
			"retro",
			"analog"
		]
	},
	{
		key: "turnedup",
		name: "Turned Up",
		definition: "Volume up",
		affirmations: [
			"You are the life of the party"
		],
		popularity: 10,
		related: [
			"dance",
			"lively",
			"vibrant",
			"wild",
			"lit",
			"hifi",
			"drip",
			"loud"
		]
	},
	{
		key: "taco",
		name: "Taco",
		popularity: 180
	},
	{
		key: "together",
		name: "Togetherness",
		definition: "Closeness and shared experiences",
		affirmations: [
			"Belonging is a club for us all"
		],
		popularity: 10,
		related: [
			"civic",
			"community",
			"family",
			"local",
			"love",
			"friendly",
			"romantic",
			"social"
		]
	},
	{
		key: "tokyo",
		name: "Tokyo",
		popularity: 40
	},
	{
		key: "tourist",
		name: "Tourist",
		popularity: 400
	},
	{
		key: "treatyourself",
		name: "Treat Yourself",
		definition: "You deserve it",
		popularity: 10,
		related: [
			"sweet",
			"decadent",
			"fancy"
		]
	},
	{
		key: "tropical",
		name: "Tropical",
		definition: "Warm & exciting",
		affirmations: [
			"Find your life's adventure"
		],
		popularity: 10,
		related: [
			"warm",
			"natural",
			"aquatic",
			"fun",
			"colorful"
		]
	},
	{
		key: "traditional",
		name: "Traditional",
		popularity: 30
	},
	{
		key: "transformative",
		name: "Transformative",
		popularity: 10
	},
	{
		key: "transit",
		name: "Transit",
		popularity: 10
	},
	{
		key: "tranquil",
		name: "Tranquil",
		popularity: 10
	},
	{
		key: "trending",
		name: "Trendy",
		definition: "Currents of taste",
		affirmations: [
			"Drop into something new"
		],
		popularity: 140,
		related: [
			"trendy",
			"posh",
			"hipster",
			"cool",
			"hip"
		]
	},
	{
		key: "trendy",
		name: "Trendy",
		definition: "Currents of taste",
		affirmations: [
			"Drop into something new"
		],
		popularity: 4000,
		related: [
			"popular"
		]
	},
	{
		key: "trippy",
		name: "Trippy",
		definition: "Different then expected",
		affirmations: [
			"Look for the unexpected"
		],
		popularity: 10,
		related: [
			"unexpected",
			"colorful",
			"hiddengem",
			"wild",
			"radical"
		]
	},
	{
		key: "tropical",
		name: "Tropical",
		definition: "Warm and lush",
		affirmations: [
			"Look for the unexpected"
		],
		popularity: 10,
		related: [
			"colorful",
			"eclectic",
			"lush",
			"warm",
			"wild"
		]
	},
	{
		key: "trust",
		name: "Trust",
		popularity: 10
	},
	{
		key: "utopian",
		name: "Utopian",
		popularity: 10
	},
	{
		key: "ugly",
		name: "Ugly",
		popularity: 10
	},
	{
		key: "underground",
		name: "Underground",
		definition: "If you know, you know",
		affirmations: [
			"You find what you need where you least expect it"
		],
		popularity: 400,
		related: [
			"hiddengem",
			"exclusive",
			"hidden",
			"deepcut",
			"classic",
			"punk",
			"secret"
		]
	},
	{
		key: "unexpected",
		name: "Unexpected",
		popularity: 10
	},
	{
		key: "unique",
		name: "Unique",
		popularity: 400
	},
	{
		key: "upscale",
		name: "Upscale",
		popularity: 10
	},
	{
		key: "urban",
		name: "Urban",
		popularity: 40
	},
	{
		key: "vacation",
		name: "Vacation",
		popularity: 140
	},
	{
		key: "vast",
		name: "Vast",
		popularity: 10
	},
	{
		key: "vegan",
		name: "Vegan",
		popularity: 700
	},
	{
		key: "vegetarian",
		name: "Vegetarian",
		popularity: 200
	},
	{
		key: "vibe",
		name: "Vibe",
		popularity: 10
	},
	{
		key: "vibrant",
		name: "Vibrant",
		definition: "Full of energy and life",
		affirmations: [
			"Your presence helps make vibrancy",
			"Feel the pulse of life"
		],
		popularity: 10
	},
	{
		key: "vip",
		name: "VIP",
		popularity: 320
	},
	{
		key: "visionary",
		name: "Visionary",
		popularity: 10
	},
	{
		key: "views",
		name: "Views",
		definition: "Pleasing landscapes or environments",
		affirmations: [
			"Be present and look beyond"
		],
		popularity: 1400,
		related: [
			"scenic",
			"adventure",
			"aesthetic"
		]
	},
	{
		key: "vintage",
		name: "Vintage",
		definition: "In and of the past",
		affirmations: [
			"Honor things that came before"
		],
		popularity: 1300,
		related: [
			"nostalgic",
			"thrifting",
			"retro",
			"analog",
			"oldschool",
			"traditional",
			"authentic",
			"lofi",
			"throwback"
		]
	},
	{
		key: "volunteer",
		name: "Volunteer",
		definition: "Spacious, light-filled bliss",
		affirmations: [
			"Joining forces creates abundance",
			"Service gives perspective",
			"Small acts can be mighty",
			"Help others get new perspective today",
			"Service tackles the greatest challenges",
			"Do one thing to strengthen and unite",
			"Build a world of joyful belonging"
		],
		popularity: 400,
		related: [
			"civic",
			"proud",
			"community",
			"solidarity"
		]
	},
	{
		key: "walk",
		name: "Walk",
		popularity: 80
	},
	{
		key: "wander",
		name: "Wander",
		popularity: 10
	},
	{
		key: "warm",
		name: "Warm",
		popularity: 260
	},
	{
		key: "waterfront",
		name: "Waterfront",
		popularity: 300
	},
	{
		key: "weird",
		name: "Weird",
		popularity: 60
	},
	{
		key: "weekend",
		name: "Weekend",
		popularity: 480
	},
	{
		key: "western",
		name: "Western",
		popularity: 140
	},
	{
		key: "whimsical",
		name: "Whimsical",
		definition: "Carefree and playful amusement",
		affirmation: [
			"Have fun for fun's sake",
			"Welcome free expression"
		],
		popularity: 20,
		related: [
			"playful",
			"dreamy",
			"eclectic",
			"quirky"
		]
	},
	{
		key: "wholesome",
		name: "Wholesome",
		popularity: 10
	},
	{
		key: "witchy",
		name: "Witchy",
		definition: "In possession of the supernatural",
		affirmations: [
			"Your magic is strong"
		],
		popularity: 140,
		related: [
			"magical",
			"botanical",
			"spiritual",
			"natural",
			"radical",
			"wild",
			"quirky",
			"eclectic",
			"mystic"
		]
	},
	{
		key: "wild",
		name: "Wild",
		definition: "Natural and uninhibited",
		affirmations: [
			"Nature shows us ways of being"
		],
		popularity: 140,
		related: [
			"adventurous",
			"tropical",
			"radical",
			"crazy",
			"eclectic"
		]
	},
	{
		key: "woodsy",
		name: "Woodsy",
		popularity: 10
	},
	{
		key: "wintry",
		name: "Wintry",
		popularity: 10
	},
	{
		key: "yoga",
		name: "Yoga",
		popularity: 260
	},
	{
		key: "young",
		name: "Young",
		popularity: 20
	},
	{
		key: "yuletide",
		name: "Yuletide",
		popularity: 10
	},
	{
		key: "zen",
		name: "Zen",
		popularity: 90
	}
];
var energy = [
	"bright",
	"bubbly",
	"buzzing",
	"chill",
	"dynamic",
	"frenetic",
	"intense",
	"jazzy",
	"lively",
	"low-key",
	"mellow",
	"nervous",
	"quiet",
	"rejuvenating",
	"relaxing",
	"sleepy",
	"spooky",
	"stirring",
	"still"
];
var mood = {
	calm: [
		"chill",
		"mindful",
		"peaceful",
		"botanical",
		"minimalist",
		"beautiful",
		"healthy",
		"positive",
		"boho",
		"moody",
		"mystic"
	],
	dreamy: [
		"authentic",
		"whimsical",
		"musical",
		"hippie",
		"witchy",
		"mindful",
		"eclectic",
		"natural",
		"vintage",
		"curious",
		"artsy",
		"inspired"
	],
	nostalgic: [
		"analog",
		"retro",
		"authentic",
		"vintage",
		"musical",
		"throwback",
		"folk",
		"kitschy",
		"oldschool",
		"historic",
		"cozy"
	],
	aware: [
		"activist",
		"civic",
		"cultural",
		"diverse",
		"community",
		"proud",
		"positive",
		"generous",
		"radical",
		"inclusive",
		"joyful"
	],
	social: [
		"passionate",
		"belonging",
		"community",
		"datespot",
		"festive",
		"fun",
		"family",
		"intimate",
		"love",
		"romantic"
	],
	energetic: [
		"colorful",
		"eclectic",
		"lit",
		"wild",
		"lively",
		"loud",
		"popular",
		"trendy",
		"neon",
		"drip",
		"shimmy"
	],
	adventurous: [
		"aquatic",
		"eclectic",
		"family",
		"outdoors",
		"playful",
		"natural",
		"rebel",
		"scenic",
		"healthy",
		"tropical",
		"wild",
		"DIY"
	]
};
var atmosphere = [
	"airy",
	"antique",
	"aquatic",
	"arboraceous",
	"artsy",
	"balmy",
	"beach",
	"breezy",
	"bright",
	"chaotic",
	"chill",
	"classy",
	"clean",
	"colorful",
	"comfortable",
	"creative",
	"cold",
	"cool",
	"dark",
	"diverse",
	"dreamy",
	"dry",
	"dusk",
	"dynamic",
	"earthy",
	"eclectic",
	"elegant",
	"elevated",
	"floral",
	"foggy",
	"fragrant",
	"fresh",
	"funky",
	"garden",
	"grassy",
	"green",
	"gritty",
	"hazy",
	"historic",
	"homey",
	"industrial",
	"interesting",
	"inviting",
	"lively",
	"loud",
	"lush",
	"maritime",
	"modern",
	"musical",
	"natural",
	"nautical",
	"new",
	"old",
	"open",
	"pastoral",
	"peaceful",
	{
		pleasant: null,
		definition: "A sense of happiness"
	},
	"radiant",
	"rainey",
	"refreshing",
	"rocky",
	"soothing",
	"simple",
	"snowy",
	"spacious",
	"spooky",
	"strange",
	"stuffy",
	"sultry",
	"sunny",
	"sunset",
	"surf",
	"strange",
	"tranquil",
	"tropical",
	"underground",
	"verdant",
	"vibrant",
	"warm",
	"western",
	"wild"
];
var flavor = [
	"bitter",
	"bold",
	"boozy",
	"cheesy",
	"classic",
	"cool",
	"creamy",
	"crunchy",
	"decadent",
	"fruity",
	"fresh",
	"hot",
	"intense",
	"lovely",
	"mouth-watering",
	"nutty",
	"piquant",
	"pungent",
	"rare",
	"rich",
	"salty",
	"savory",
	"sizzling",
	"smoking",
	"smoky",
	"sour",
	"spicy",
	"succulent",
	"sweet",
	"tangy",
	"tart",
	"tasty",
	"toasty",
	"unique",
	"velvety",
	"zesty"
];
var social$1 = [
	"active",
	"adventurous",
	"amazed",
	"amused",
	"bohemian",
	"casual",
	"celebratory",
	"cheerful",
	"compassionate",
	"convivial",
	"courageous",
	"cozy",
	"cultural",
	"creative",
	"crowded",
	"diverse",
	"eccentric",
	"enchanting",
	"entertaining",
	"exchange",
	"exclusive",
	"family",
	"festive",
	"folk",
	"friendly",
	"fun",
	"funny",
	"gay",
	"geeky",
	"generous",
	"genial",
	"genuine",
	"helpful",
	"inclusive",
	"insightful",
	"keen",
	"loud",
	"loving",
	"passionate",
	"popular",
	"positive",
	"proud",
	"quirky",
	"sensual",
	"solidarity",
	"spiritual",
	"supportive",
	"together",
	"trendy",
	"traditional",
	"volunteer",
	"wholesome",
	"wonderful",
	"youthful"
];
var qualities = [
	"authentic",
	"handmade",
	"local",
	"organic",
	"native",
	"pure",
	"susaintable",
	"traditional",
	"vintage"
];
var activities = [
	"art",
	"biking",
	"craft",
	"dance",
	"fashion",
	"music"
];
var allVibes = {
	vibes: vibes,
	energy: energy,
	mood: mood,
	atmosphere: atmosphere,
	flavor: flavor,
	social: social$1,
	qualities: qualities,
	activities: activities
};

var absurd = {
	outrageous: 0.7,
	silly: 0.6,
	weird: 0.5,
	crazy: 0.5,
	strange: 0.5,
	funny: 0.4,
	whimsical: 0.4,
	interesting: 0.3,
	ugly: 0.3,
	subversive: 0.3,
	entertaining: 0.3,
	kitschy: 0.3,
	simple: 0.3,
	campy: 0.3,
	curious: 0.3,
	delightful: 0.3,
	trippy: 0.3
};
var adventurous = {
	eclectic: 0.5,
	playful: 0.4,
	artsy: 0.4,
	delightful: 0.4,
	energetic: 0.4,
	entertaining: 0.4,
	quirky: 0.4,
	romantic: 0.4,
	exciting: 0.4,
	creative: 0.4,
	funky: 0.4,
	tasty: 0.4,
	whimsical: 0.4,
	lively: 0.3,
	sensual: 0.3,
	bold: 0.3,
	entrepreneurial: 0.3,
	flavorful: 0.3,
	curious: 0.3,
	fun: 0.3,
	bookish: 0.3,
	passionate: 0.3,
	beautiful: 0.3,
	classy: 0.3,
	colorful: 0.3,
	dreamy: 0.3,
	fancy: 0.3,
	interesting: 0.3,
	joyful: 0.3,
	luxe: 0.3,
	moody: 0.3,
	savory: 0.3,
	experiential: 0.3,
	innovative: 0.3,
	jazzy: 0.3,
	kitschy: 0.3,
	refreshing: 0.3,
	soulful: 0.3,
	spicy: 0.3,
	authentic: 0.3,
	boho: 0.3,
	crazy: 0.3,
	elegant: 0.3,
	inspired: 0.3,
	outdoors: 0.3,
	scenic: 0.3,
	wild: 0.3,
	futuristic: 0.3,
	relaxing: 0.3,
	retro: 0.3,
	rugged: 0.3,
	trippy: 0.3,
	cute: 0.3,
	experimental: 0.3,
	friendly: 0.3,
	geeky: 0.3,
	minimalist: 0.3,
	serene: 0.3,
	vibrant: 0.3,
	dynamic: 0.3,
	intimate: 0.3,
	musical: 0.3,
	raunchy: 0.3,
	trendy: 0.3,
	young: 0.3
};
var active = {
	healthy: 0.4,
	energetic: 0.3,
	dynamic: 0.3,
	busy: 0.3,
	popular: 0.3,
	diverse: 0.3,
	intense: 0.3,
	positive: 0.3,
	quiet: 0.3,
	volunteer: 0.3
};
var activist = {
	feminist: 0.4,
	hippie: 0.3,
	civic: 0.3,
	radical: 0.3,
	queer: 0.3
};
var afternoon = {
	morning: 0.8,
	weekend: 0.55,
	sunny: 0.3
};
var airy = {
	dreamy: 0.5,
	elegant: 0.5,
	minimalist: 0.55,
	serene: 0.5,
	funky: 0.5,
	jazzy: 0.4,
	comfy: 0.4,
	whimsical: 0.4,
	sensual: 0.4,
	soothing: 0.4,
	beautiful: 0.4,
	luxe: 0.4,
	cozy: 0.4,
	artsy: 0.4,
	moody: 0.4,
	playful: 0.4,
	delightful: 0.4,
	flavorful: 0.4,
	oasis: 0.4,
	vibe: 0.4,
	warm: 0.4,
	soulful: 0.3,
	trippy: 0.3,
	lively: 0.3,
	colorful: 0.3,
	kitschy: 0.3,
	patio: 0.3,
	retro: 0.3,
	sunny: 0.3,
	vibrant: 0.3,
	eclectic: 0.3,
	sweet: 0.3,
	boho: 0.3,
	classy: 0.3,
	intimate: 0.3,
	quirky: 0.3,
	refreshing: 0.3,
	upscale: 0.3,
	gentle: 0.3,
	joyful: 0.3,
	dark: 0.3,
	futuristic: 0.3,
	grimy: 0.3,
	neon: 0.3,
	spicy: 0.3,
	tasty: 0.3,
	trendy: 0.3,
	decorative: 0.3,
	energetic: 0.3,
	glam: 0.3,
	lit: 0.3,
	modern: 0.3,
	cute: 0.3,
	posh: 0.3,
	zen: 0.3
};
var alternative = {
	innovative: 0.4,
	oasis: 0.3,
	safe: 0.3
};
var analog = {
	hifi: 0.3,
	retro: 0.3,
	oldschool: 0.3
};
var antique = {
	vintage: 0.6,
	decorative: 0.4,
	art: 0.4,
	eclectic: 0.4,
	kitschy: 0.3,
	classic: 0.3,
	retro: 0.3,
	whimsical: 0.3,
	historic: 0.3,
	authentic: 0.3,
	artisanal: 0.3,
	craft: 0.3,
	elegant: 0.3,
	artsy: 0.3,
	garden: 0.3
};
var art = {
	antique: 0.4,
	artsy: 0.4,
	eclectic: 0.3,
	creative: 0.3,
	dance: 0.3,
	minimalist: 0.3,
	craft: 0.3,
	decorative: 0.3,
	modern: 0.3,
	cultural: 0.3,
	folk: 0.3,
	vintage: 0.3,
	whimsical: 0.3,
	cinematic: 0.3,
	kitschy: 0.3,
	experiential: 0.3,
	sensual: 0.3,
	botanical: 0.3,
	fashion: 0.3,
	experimental: 0.3,
	vibrant: 0.3
};
var artsy = {
	hipster: 0.6,
	boho: 0.6,
	funky: 0.6,
	kitschy: 0.5,
	eclectic: 0.5,
	indie: 0.5,
	trendy: 0.5,
	quirky: 0.5,
	hippie: 0.5,
	whimsical: 0.5,
	minimalist: 0.5,
	geeky: 0.4,
	retro: 0.4,
	cute: 0.4,
	dreamy: 0.4,
	luxe: 0.4,
	trippy: 0.4,
	vibe: 0.4,
	art: 0.4,
	glam: 0.4,
	nerdy: 0.4,
	adventurous: 0.4,
	upscale: 0.4,
	campy: 0.4,
	jazzy: 0.4,
	moody: 0.4,
	airy: 0.4,
	nightlife: 0.4,
	playful: 0.4,
	queer: 0.4,
	sensual: 0.4,
	weird: 0.4,
	beautiful: 0.4,
	cinematic: 0.4,
	creative: 0.4,
	bookish: 0.3,
	comfy: 0.3,
	elegant: 0.3,
	romantic: 0.3,
	artisanal: 0.3,
	classy: 0.3,
	fancy: 0.3,
	folk: 0.3,
	casual: 0.3,
	colorful: 0.3,
	cool: 0.3,
	cozy: 0.3,
	experimental: 0.3,
	fun: 0.3,
	urban: 0.3,
	witchy: 0.3,
	zen: 0.3,
	decorative: 0.3,
	funny: 0.3,
	grimy: 0.3,
	intimate: 0.3,
	oasis: 0.3,
	oldschool: 0.3,
	posh: 0.3,
	vegan: 0.3,
	fashion: 0.3,
	futuristic: 0.3,
	musical: 0.3,
	neon: 0.3,
	raunchy: 0.3,
	vibrant: 0.3,
	vintage: 0.3,
	crazy: 0.3,
	delightful: 0.3,
	diy: 0.3,
	silly: 0.3,
	soulful: 0.3,
	film: 0.3,
	antique: 0.3,
	curious: 0.3,
	entrepreneurial: 0.3,
	feminist: 0.3,
	flavorful: 0.3,
	hip: 0.3,
	parisian: 0.3,
	scenic: 0.3
};
var artisanal = {
	artsy: 0.3,
	savory: 0.3,
	vegan: 0.3,
	vintage: 0.3,
	entrepreneurial: 0.3,
	flavorful: 0.3,
	hipster: 0.3,
	luxe: 0.3,
	boho: 0.3,
	eclectic: 0.3,
	trendy: 0.3,
	craft: 0.3,
	tasty: 0.3,
	antique: 0.3,
	parisian: 0.3,
	upscale: 0.3,
	authentic: 0.3
};
var authentic = {
	flavorful: 0.4,
	tasty: 0.4,
	antique: 0.3,
	unique: 0.4,
	retro: 0.4,
	vintage: 0.3,
	classic: 0.3,
	entertaining: 0.3,
	spicy: 0.3,
	elegant: 0.3,
	funky: 0.3,
	savory: 0.3,
	experiential: 0.3,
	eclectic: 0.3,
	intimate: 0.3,
	kitschy: 0.3,
	sensual: 0.3,
	soulful: 0.3,
	modern: 0.3,
	upscale: 0.3,
	adventurous: 0.3,
	inspired: 0.3,
	beautiful: 0.3,
	cinematic: 0.3,
	historic: 0.3,
	inclusive: 0.3,
	whimsical: 0.3,
	campy: 0.3,
	casual: 0.3,
	colorful: 0.3,
	interactive: 0.3,
	passionate: 0.3,
	vibrant: 0.3,
	artisanal: 0.3,
	lively: 0.3,
	mystic: 0.3,
	oldschool: 0.3,
	refreshing: 0.3,
	vibe: 0.3,
	weird: 0.3
};
var aquatic = {
	tropical: 0.3,
	botanical: 0.3,
	mermaid: 0.3,
	park: 0.3,
	garden: 0.3,
	urban: 0.3
};
var beautiful = {
	delightful: 0.6,
	elegant: 0.5,
	serene: 0.5,
	classy: 0.5,
	dreamy: 0.5,
	fantastic: 0.5,
	scenic: 0.5,
	love: 0.5,
	sensual: 0.5,
	vibrant: 0.5,
	cute: 0.4,
	joyful: 0.4,
	colorful: 0.4,
	magical: 0.4,
	sweet: 0.4,
	sunny: 0.4,
	romantic: 0.4,
	airy: 0.4,
	fun: 0.4,
	funky: 0.4,
	funny: 0.4,
	whimsical: 0.4,
	weird: 0.4,
	blissful: 0.4,
	exciting: 0.4,
	soulful: 0.4,
	artsy: 0.4,
	refreshing: 0.3,
	cool: 0.3,
	lively: 0.3,
	luxe: 0.3,
	playful: 0.3,
	strange: 0.3,
	crazy: 0.3,
	moody: 0.3,
	tasty: 0.3,
	unique: 0.3,
	flavorful: 0.3,
	intimate: 0.3,
	kitschy: 0.3,
	passionate: 0.3,
	relaxing: 0.3,
	adventurous: 0.3,
	comfy: 0.3,
	gentle: 0.3,
	interesting: 0.3,
	quirky: 0.3,
	soothing: 0.3,
	entertaining: 0.3,
	hidden_gem: 0.3,
	minimalist: 0.3,
	trippy: 0.3,
	eclectic: 0.3,
	fancy: 0.3,
	garden: 0.3,
	glam: 0.3,
	historic: 0.3,
	natural: 0.3,
	oasis: 0.3,
	posh: 0.3,
	proud: 0.3,
	ugly: 0.3,
	warm: 0.3,
	authentic: 0.3,
	boho: 0.3,
	dynamic: 0.3,
	mermaid: 0.3,
	tropical: 0.3,
	dark: 0.3,
	decorative: 0.3,
	futuristic: 0.3,
	happy: 0.3,
	inspired: 0.3,
	jazzy: 0.3,
	mystic: 0.3,
	quiet: 0.3,
	trendy: 0.3,
	vibe: 0.3,
	young: 0.3,
	cozy: 0.3,
	energetic: 0.3,
	modern: 0.3,
	peaceful: 0.3,
	vintage: 0.3,
	witchy: 0.3,
	zen: 0.3
};
var belonging = {
	vintage: 0.3
};
var big = {
	small: 0.5,
	fantastic: 0.3,
	dramatic: 0.3,
	crazy: 0.3,
	vast: 0.3,
	exciting: 0.3,
	happy: 0.3,
	silly: 0.3
};
var biking = {
	hiking: 0.5,
	outdoors: 0.4,
	scenic: 0.3,
	park: 0.3,
	walk: 0.3,
	transit: 0.3,
	nightlife: 0.3,
	fun: 0.3
};
var blissful = {
	dreamy: 0.5,
	serene: 0.5,
	joyful: 0.5,
	soothing: 0.4,
	magical: 0.4,
	delightful: 0.4,
	romantic: 0.4,
	relaxing: 0.4,
	zen: 0.4,
	comfy: 0.4,
	trippy: 0.4,
	beautiful: 0.4,
	sweet: 0.4,
	sunny: 0.3,
	sensual: 0.3,
	hippie: 0.3,
	oasis: 0.3,
	refreshing: 0.3,
	boozy: 0.3,
	love: 0.3,
	soulful: 0.3,
	strange: 0.3,
	quiet: 0.3,
	weird: 0.3,
	celebratory: 0.3,
	cozy: 0.3,
	cinematic: 0.3,
	jazzy: 0.3,
	moody: 0.3,
	whimsical: 0.3,
	happy: 0.3,
	luxe: 0.3,
	restorative: 0.3,
	spontaneous: 0.3,
	tropical: 0.3,
	funky: 0.3,
	grimy: 0.3,
	hearty: 0.3,
	playful: 0.3
};
var boho = {
	hipster: 0.6,
	luxe: 0.6,
	artsy: 0.6,
	glam: 0.6,
	trendy: 0.6,
	funky: 0.5,
	hippie: 0.5,
	retro: 0.5,
	fashion: 0.4,
	vibe: 0.4,
	jazzy: 0.4,
	eclectic: 0.4,
	indie: 0.4,
	nightlife: 0.4,
	posh: 0.4,
	dreamy: 0.4,
	feminist: 0.4,
	soulful: 0.4,
	kitschy: 0.4,
	minimalist: 0.4,
	queer: 0.4,
	sensual: 0.4,
	comfy: 0.4,
	elegant: 0.4,
	parisian: 0.4,
	campy: 0.3,
	cute: 0.3,
	romantic: 0.3,
	upscale: 0.3,
	witchy: 0.3,
	folk: 0.3,
	trippy: 0.3,
	boozy: 0.3,
	casual: 0.3,
	quirky: 0.3,
	raunchy: 0.3,
	vegan: 0.3,
	airy: 0.3,
	bookish: 0.3,
	grimy: 0.3,
	moody: 0.3,
	nerdy: 0.3,
	urban: 0.3,
	classy: 0.3,
	geeky: 0.3,
	hip: 0.3,
	playful: 0.3,
	vintage: 0.3,
	adventurous: 0.3,
	artisanal: 0.3,
	whimsical: 0.3,
	beautiful: 0.3,
	classic: 0.3,
	cozy: 0.3,
	spicy: 0.3,
	vibrant: 0.3,
	brunch: 0.3,
	futuristic: 0.3,
	mermaid: 0.3,
	oldschool: 0.3,
	weird: 0.3,
	zen: 0.3
};
var bold = {
	radical: 0.4,
	adventurous: 0.3,
	dramatic: 0.4,
	colorful: 0.3,
	whimsical: 0.3,
	minimalist: 0.3,
	refreshing: 0.3,
	classy: 0.3,
	creative: 0.3,
	inspired: 0.3,
	playful: 0.3,
	funky: 0.3,
	vibrant: 0.3,
	futuristic: 0.3,
	fresh: 0.3,
	innovative: 0.3,
	outrageous: 0.3
};
var bookish = {
	nerdy: 0.6,
	geeky: 0.5,
	artsy: 0.3,
	cute: 0.3,
	quirky: 0.3,
	dreamy: 0.3,
	hipster: 0.3,
	moody: 0.3,
	playful: 0.3,
	adventurous: 0.3,
	boho: 0.3,
	energetic: 0.3,
	romantic: 0.3,
	conversational: 0.3,
	gentle: 0.3,
	hippie: 0.3,
	whimsical: 0.3,
	boozy: 0.3,
	curious: 0.3,
	elegant: 0.3,
	quiet: 0.3,
	young: 0.3
};
var boozy = {
	drinking: 0.4,
	raunchy: 0.4,
	boho: 0.3,
	blissful: 0.3,
	sober: 0.3,
	posh: 0.3,
	drinks: 0.3,
	romantic: 0.3,
	celebratory: 0.3,
	hippie: 0.3,
	hipster: 0.3,
	messy: 0.3,
	moody: 0.3,
	nerdy: 0.3,
	hearty: 0.3,
	campy: 0.3,
	grimy: 0.3,
	bookish: 0.3,
	quirky: 0.3,
	silly: 0.3,
	dreamy: 0.3,
	festive: 0.3,
	nightlife: 0.3
};
var brunch = {
	tasty: 0.4,
	patio: 0.4,
	flavorful: 0.3,
	drinks: 0.3,
	hearty: 0.3,
	savory: 0.3,
	eclectic: 0.3,
	celebratory: 0.3,
	vegan: 0.3,
	mingle: 0.3,
	relaxing: 0.3,
	delightful: 0.3,
	fun: 0.3,
	luxe: 0.3,
	nightlife: 0.3,
	spicy: 0.3,
	trendy: 0.3,
	boho: 0.3,
	elegant: 0.3,
	festive: 0.3,
	funky: 0.3,
	upscale: 0.3
};
var botanical = {
	garden: 0.5,
	tropical: 0.4,
	natural: 0.3,
	aquatic: 0.3,
	decorative: 0.3,
	restorative: 0.3,
	whimsical: 0.3,
	art: 0.3,
	cultural: 0.3,
	mystic: 0.3,
	colorful: 0.3
};
var busy = {
	quiet: 0.4,
	crowded: 0.4,
	buzzing: 0.3,
	festive: 0.3,
	happy: 0.3,
	active: 0.3,
	relaxing: 0.3,
	fun: 0.3,
	crazy: 0.3,
	entertaining: 0.3,
	exciting: 0.3
};
var buzzing = {
	popping: 0.5,
	busy: 0.3,
	quiet: 0.3,
	curious: 0.3,
	lively: 0.3,
	crowded: 0.3,
	vibe: 0.3,
	loud: 0.3,
	crazy: 0.3,
	weird: 0.3
};
var calm = {
	quiet: 0.6,
	cool: 0.4,
	serene: 0.4,
	peaceful: 0.4,
	soothing: 0.4,
	sober: 0.3,
	gentle: 0.3,
	safe: 0.3,
	warm: 0.3,
	healthy: 0.3,
	relaxing: 0.3,
	sunny: 0.3
};
var campy = {
	kitschy: 0.6,
	retro: 0.5,
	funny: 0.5,
	raunchy: 0.5,
	trippy: 0.5,
	whimsical: 0.4,
	cinematic: 0.4,
	jazzy: 0.4,
	playful: 0.4,
	glam: 0.4,
	cute: 0.4,
	funky: 0.4,
	classic: 0.4,
	quirky: 0.4,
	silly: 0.4,
	artsy: 0.4,
	entertaining: 0.4,
	nerdy: 0.4,
	sensual: 0.4,
	hipster: 0.4,
	vibe: 0.4,
	dreamy: 0.4,
	futuristic: 0.4,
	geeky: 0.4,
	moody: 0.4,
	musical: 0.4,
	witchy: 0.4,
	boho: 0.3,
	fun: 0.3,
	minimalist: 0.3,
	soulful: 0.3,
	weird: 0.3,
	film: 0.3,
	romantic: 0.3,
	subversive: 0.3,
	delightful: 0.3,
	indie: 0.3,
	luxe: 0.3,
	mermaid: 0.3,
	hippie: 0.3,
	classy: 0.3,
	eclectic: 0.3,
	laugh: 0.3,
	oldschool: 0.3,
	boozy: 0.3,
	spicy: 0.3,
	authentic: 0.3,
	cool: 0.3,
	singing: 0.3,
	vintage: 0.3,
	absurd: 0.3,
	casual: 0.3,
	dance: 0.3,
	neon: 0.3,
	outrageous: 0.3,
	queer: 0.3,
	sweet: 0.3,
	tasty: 0.3
};
var casual = {
	retro: 0.4,
	trendy: 0.4,
	upscale: 0.4,
	conversational: 0.3,
	funky: 0.3,
	playful: 0.3,
	boho: 0.3,
	comfy: 0.3,
	elegant: 0.3,
	hipster: 0.3,
	luxe: 0.3,
	artsy: 0.3,
	classy: 0.3,
	cute: 0.3,
	entertaining: 0.3,
	geeky: 0.3,
	intimate: 0.3,
	kitschy: 0.3,
	friendly: 0.3,
	minimalist: 0.3,
	quirky: 0.3,
	eclectic: 0.3,
	fancy: 0.3,
	fashion: 0.3,
	colorful: 0.3,
	fun: 0.3,
	refreshing: 0.3,
	romantic: 0.3,
	authentic: 0.3,
	cool: 0.3,
	cozy: 0.3,
	glam: 0.3,
	lively: 0.3,
	sensual: 0.3,
	spontaneous: 0.3,
	whimsical: 0.3,
	campy: 0.3,
	oldschool: 0.3,
	simple: 0.3,
	vibe: 0.3
};
var celebratory = {
	joyful: 0.5,
	festive: 0.4,
	boozy: 0.3,
	brunch: 0.3,
	blissful: 0.3,
	playful: 0.3,
	spontaneous: 0.3,
	hearty: 0.3,
	colorful: 0.3,
	lively: 0.3,
	dance: 0.3,
	happy: 0.3,
	delightful: 0.3,
	fun: 0.3,
	tasty: 0.3,
	savory: 0.3,
	serene: 0.3,
	warm: 0.3
};
var cheap = {
	fancy: 0.4,
	simple: 0.3,
	trendy: 0.3,
	tasty: 0.3,
	alternative: 0.3,
	silly: 0.3,
	comfy: 0.3,
	free: 0.3
};
var children = {
	family: 0.4,
	young: 0.4,
	educational: 0.3
};
var chill = {
	cool: 0.4,
	sunny: 0.4,
	cozy: 0.3,
	vibe: 0.3,
	relaxing: 0.4,
	soothing: 0.3,
	comfy: 0.3,
	dark: 0.3,
	outdoors: 0.3,
	warm: 0.3
};
var cinematic = {
	film: 0.6,
	trippy: 0.5,
	campy: 0.4,
	musical: 0.5,
	indie: 0.4,
	dreamy: 0.4,
	sensual: 0.4,
	futuristic: 0.4,
	minimalist: 0.4,
	kitschy: 0.4,
	artsy: 0.4,
	romantic: 0.4,
	classic: 0.3,
	delightful: 0.3,
	soulful: 0.3,
	jazzy: 0.3,
	moody: 0.3,
	oldschool: 0.3,
	whimsical: 0.3,
	creative: 0.3,
	modern: 0.3,
	retro: 0.3,
	magical: 0.3,
	novel: 0.3,
	glam: 0.3,
	grimy: 0.3,
	art: 0.3,
	cultural: 0.3,
	hipster: 0.3,
	luxe: 0.3,
	quirky: 0.3,
	authentic: 0.3,
	blissful: 0.3,
	savory: 0.3,
	experiential: 0.3,
	playful: 0.3,
	dramatic: 0.3,
	subversive: 0.3
};
var civic = {
	community: 0.4,
	local: 0.4,
	cultural: 0.4,
	social: 0.4,
	"public": 0.3,
	volunteer: 0.3,
	activist: 0.3,
	educational: 0.3,
	urban: 0.3
};
var classic = {
	retro: 0.5,
	campy: 0.4,
	funky: 0.4,
	inspired: 0.4,
	futuristic: 0.4,
	cinematic: 0.3,
	favorite: 0.3,
	authentic: 0.3,
	vintage: 0.55,
	modern: 0.4,
	oldschool: 0.4,
	kitschy: 0.4,
	delightful: 0.4,
	jazzy: 0.4,
	minimalist: 0.3,
	quirky: 0.3,
	luxe: 0.3,
	elegant: 0.3,
	whimsical: 0.3,
	classy: 0.3,
	antique: 0.3,
	glam: 0.3,
	refreshing: 0.3,
	trippy: 0.3,
	dreamy: 0.3,
	musical: 0.3,
	eclectic: 0.3,
	fancy: 0.3,
	popular: 0.3,
	soulful: 0.3,
	boho: 0.3,
	playful: 0.3,
	entertaining: 0.3,
	folk: 0.3,
	magical: 0.3,
	tasty: 0.3,
	trendy: 0.3,
	unique: 0.3,
	cute: 0.3,
	dramatic: 0.3,
	fun: 0.3,
	interesting: 0.3,
	romantic: 0.3,
	weird: 0.3
};
var classy = {
	elegant: 0.6,
	beautiful: 0.5,
	delightful: 0.4,
	entertaining: 0.4,
	cute: 0.4,
	fancy: 0.4,
	funky: 0.4,
	lively: 0.4,
	fantastic: 0.4,
	cool: 0.4,
	glam: 0.4,
	luxe: 0.4,
	minimalist: 0.4,
	retro: 0.4,
	trendy: 0.4,
	vintage: 0.4,
	comfy: 0.4,
	funny: 0.4,
	playful: 0.4,
	sweet: 0.4,
	quirky: 0.3,
	refreshing: 0.3,
	artsy: 0.3,
	fashion: 0.3,
	posh: 0.3,
	energetic: 0.3,
	kitschy: 0.3,
	sensual: 0.3,
	silly: 0.3,
	casual: 0.3,
	classic: 0.3,
	quiet: 0.3,
	soulful: 0.3,
	tasty: 0.3,
	upscale: 0.3,
	vibe: 0.3,
	adventurous: 0.3,
	airy: 0.3,
	bold: 0.3,
	jazzy: 0.3,
	moody: 0.3,
	serene: 0.3,
	boho: 0.3,
	campy: 0.3,
	colorful: 0.3,
	eclectic: 0.3,
	exciting: 0.3,
	friendly: 0.3,
	fun: 0.3,
	dreamy: 0.3,
	romantic: 0.3,
	gentle: 0.3,
	happy: 0.3,
	love: 0.3,
	passionate: 0.3,
	raunchy: 0.3,
	interesting: 0.3,
	whimsical: 0.3,
	weird: 0.3
};
var cold = {
	chill: 0.6,
	warm: 0.6,
	cool: 0.4,
	sunny: 0.4,
	outdoors: 0.3,
	dark: 0.3
};
var colorful = {
	whimsical: 0.6,
	funky: 0.4,
	beautiful: 0.4,
	quirky: 0.5,
	lively: 0.5,
	playful: 0.4,
	vibrant: 0.4,
	decorative: 0.4,
	eclectic: 0.4,
	kitschy: 0.4,
	elegant: 0.4,
	delightful: 0.4,
	cute: 0.4,
	entertaining: 0.4,
	neon: 0.4,
	festive: 0.4,
	joyful: 0.4,
	jazzy: 0.3,
	trippy: 0.3,
	serene: 0.3,
	airy: 0.3,
	bold: 0.3,
	diverse: 0.3,
	energetic: 0.3,
	interesting: 0.3,
	popular: 0.3,
	artsy: 0.3,
	fun: 0.3,
	funny: 0.3,
	adventurous: 0.3,
	celebratory: 0.3,
	classy: 0.3,
	sensual: 0.3,
	tasty: 0.3,
	dreamy: 0.3,
	magical: 0.3,
	trendy: 0.3,
	casual: 0.3,
	exciting: 0.3,
	flavorful: 0.3,
	interactive: 0.3,
	moody: 0.3,
	raunchy: 0.3,
	savory: 0.3,
	scenic: 0.3,
	soothing: 0.3,
	spicy: 0.3,
	strange: 0.3,
	sunny: 0.3,
	unique: 0.3,
	authentic: 0.3,
	curious: 0.3,
	dynamic: 0.3,
	futuristic: 0.3,
	inspired: 0.3,
	refreshing: 0.3,
	silly: 0.3,
	tropical: 0.3,
	warm: 0.3,
	botanical: 0.3,
	cozy: 0.3,
	fancy: 0.3,
	friendly: 0.3,
	minimalist: 0.3,
	retro: 0.3,
	ugly: 0.3,
	vintage: 0.3,
	wild: 0.3,
	weird: 0.3
};
var community = {
	civic: 0.4,
	local: 0.4,
	family: 0.4,
	volunteer: 0.4,
	educational: 0.4,
	cultural: 0.3,
	social: 0.3,
	"public": 0.3,
	vibrant: 0.3,
	kindness: 0.3,
	diverse: 0.3,
	intergenerational: 0.3,
	participatory: 0.3
};
var conversational = {
	playful: 0.4,
	gentle: 0.4,
	casual: 0.3,
	bookish: 0.3,
	lively: 0.3,
	quirky: 0.3,
	funny: 0.3,
	spontaneous: 0.3,
	intimate: 0.3,
	experiential: 0.3,
	sensual: 0.3,
	delightful: 0.3,
	elegant: 0.3,
	entertaining: 0.3,
	interactive: 0.3,
	laugh: 0.3,
	simple: 0.3,
	zen: 0.3,
	jazzy: 0.3,
	nerdy: 0.3,
	soulful: 0.3,
	whimsical: 0.3
};
var cool = {
	warm: 0.5,
	chill: 0.4,
	calm: 0.4,
	cold: 0.4,
	cute: 0.4,
	refreshing: 0.4,
	sunny: 0.4,
	weird: 0.4,
	crazy: 0.4,
	funny: 0.4,
	classy: 0.4,
	geeky: 0.4,
	fun: 0.4,
	nerdy: 0.4,
	funky: 0.4,
	retro: 0.4,
	sweet: 0.4,
	quiet: 0.4,
	beautiful: 0.3,
	vibe: 0.3,
	comfy: 0.3,
	fantastic: 0.3,
	silly: 0.3,
	zen: 0.3,
	artsy: 0.3,
	interesting: 0.3,
	oldschool: 0.3,
	soothing: 0.3,
	trendy: 0.3,
	playful: 0.3,
	quirky: 0.3,
	dreamy: 0.3,
	futuristic: 0.3,
	minimalist: 0.3,
	moody: 0.3,
	relaxing: 0.3,
	trippy: 0.3,
	kitschy: 0.3,
	tropical: 0.3,
	strange: 0.3,
	campy: 0.3,
	casual: 0.3,
	curious: 0.3,
	friendly: 0.3,
	hipster: 0.3,
	cozy: 0.3,
	dark: 0.3,
	serene: 0.3,
	spicy: 0.3,
	tasty: 0.3
};
var comfy = {
	funky: 0.5,
	luxe: 0.4,
	airy: 0.4,
	blissful: 0.4,
	classy: 0.4,
	boho: 0.4,
	cozy: 0.6,
	relaxing: 0.4,
	trendy: 0.4,
	retro: 0.4,
	warm: 0.4,
	cute: 0.4,
	elegant: 0.4,
	posh: 0.4,
	artsy: 0.3,
	fancy: 0.3,
	hipster: 0.3,
	serene: 0.3,
	casual: 0.3,
	cool: 0.3,
	minimalist: 0.3,
	beautiful: 0.3,
	glam: 0.3,
	fun: 0.3,
	kitschy: 0.3,
	patio: 0.3,
	quiet: 0.3,
	sunny: 0.3,
	sweet: 0.3,
	tasty: 0.3,
	vibe: 0.3,
	dreamy: 0.3,
	intimate: 0.3,
	quirky: 0.3,
	rugged: 0.3,
	soothing: 0.3,
	weird: 0.3,
	cheap: 0.3,
	hearty: 0.3,
	chill: 0.3,
	grimy: 0.3,
	jazzy: 0.3,
	oasis: 0.3,
	zen: 0.3,
	delightful: 0.3,
	friendly: 0.3,
	happy: 0.3,
	hippie: 0.3,
	outdoors: 0.3,
	safe: 0.3,
	whimsical: 0.3
};
var cozy = {
	comfy: 0.6,
	warm: 0.4,
	intimate: 0.4,
	posh: 0.4,
	airy: 0.4,
	relaxing: 0.4,
	chill: 0.3,
	friendly: 0.3,
	artsy: 0.3,
	funky: 0.3,
	lax: 0.3,
	luxe: 0.3,
	romantic: 0.3,
	serene: 0.3,
	elegant: 0.3,
	quiet: 0.3,
	blissful: 0.3,
	patio: 0.3,
	grimy: 0.3,
	messy: 0.3,
	boho: 0.3,
	quirky: 0.3,
	trendy: 0.3,
	beautiful: 0.3,
	dark: 0.3,
	casual: 0.3,
	crowded: 0.3,
	dreamy: 0.3,
	colorful: 0.3,
	cool: 0.3,
	cute: 0.3,
	eclectic: 0.3,
	soothing: 0.3,
	sunny: 0.3,
	sweet: 0.3,
	upscale: 0.3
};
var crowded = {
	busy: 0.4,
	grimy: 0.3,
	buzzing: 0.3,
	mingle: 0.3,
	upscale: 0.3,
	cozy: 0.3,
	quiet: 0.3,
	open: 0.3,
	trendy: 0.3
};
var cultural = {
	social: 0.5,
	educational: 0.4,
	civic: 0.4,
	community: 0.3,
	art: 0.3,
	cinematic: 0.3,
	botanical: 0.3,
	historic: 0.4,
	intergenerational: 0.4,
	musical: 0.4,
	queer: 0.3,
	folk: 0.3,
	modern: 0.3,
	urban: 0.3,
	experiential: 0.3,
	feminist: 0.3,
	tourist: 0.3,
	nightlife: 0.3,
	vibrant: 0.3,
	diverse: 0.3,
	kitschy: 0.3,
	local: 0.3
};
var cute = {
	funny: 0.6,
	silly: 0.5,
	beautiful: 0.4,
	artsy: 0.4,
	campy: 0.4,
	classy: 0.4,
	cool: 0.4,
	playful: 0.5,
	nerdy: 0.55,
	weird: 0.55,
	quirky: 0.5,
	funky: 0.5,
	geeky: 0.5,
	kitschy: 0.5,
	sweet: 0.5,
	whimsical: 0.5,
	fun: 0.4,
	delightful: 0.4,
	retro: 0.4,
	trendy: 0.4,
	crazy: 0.4,
	dreamy: 0.4,
	love: 0.4,
	colorful: 0.4,
	comfy: 0.4,
	fancy: 0.4,
	glam: 0.4,
	hipster: 0.4,
	mermaid: 0.4,
	laugh: 0.4,
	raunchy: 0.4,
	boho: 0.3,
	strange: 0.3,
	tasty: 0.3,
	bookish: 0.3,
	curious: 0.3,
	elegant: 0.3,
	ugly: 0.3,
	moody: 0.3,
	romantic: 0.3,
	casual: 0.3,
	hippie: 0.3,
	interesting: 0.3,
	trippy: 0.3,
	entertaining: 0.3,
	gentle: 0.3,
	luxe: 0.3,
	witchy: 0.3,
	friendly: 0.3,
	sensual: 0.3,
	spicy: 0.3,
	lively: 0.3,
	simple: 0.3,
	adventurous: 0.3,
	happy: 0.3,
	posh: 0.3,
	zen: 0.3,
	airy: 0.3,
	classic: 0.3,
	cozy: 0.3,
	jazzy: 0.3,
	joyful: 0.3,
	oldschool: 0.3,
	shimmy: 0.3,
	young: 0.3
};
var craft = {
	art: 0.3,
	artisanal: 0.3,
	antique: 0.3,
	diy: 0.3,
	creative: 0.3,
	whimsical: 0.3
};
var crazy = {
	weird: 0.7,
	funny: 0.5,
	absurd: 0.5,
	cute: 0.4,
	cool: 0.4,
	adventurous: 0.3,
	big: 0.3,
	silly: 0.6,
	strange: 0.5,
	fun: 0.5,
	outrageous: 0.4,
	wild: 0.4,
	fantastic: 0.4,
	laugh: 0.4,
	love: 0.4,
	curious: 0.4,
	funky: 0.3,
	happy: 0.3,
	magical: 0.3,
	trippy: 0.3,
	interesting: 0.3,
	beautiful: 0.3,
	quirky: 0.3,
	fancy: 0.3,
	nerdy: 0.3,
	ugly: 0.3,
	exciting: 0.3,
	geeky: 0.3,
	hippie: 0.3,
	artsy: 0.3,
	dreamy: 0.3,
	inspired: 0.3,
	buzzing: 0.3,
	entertaining: 0.3,
	moody: 0.3,
	popping: 0.3,
	busy: 0.3,
	loud: 0.3,
	passionate: 0.3,
	sweet: 0.3
};
var creative = {
	experiential: 0.5,
	adventurous: 0.4,
	artsy: 0.4,
	playful: 0.3,
	passionate: 0.3,
	quirky: 0.3,
	vibrant: 0.3,
	whimsical: 0.3,
	art: 0.3,
	cinematic: 0.3,
	musical: 0.3,
	sensual: 0.3,
	bold: 0.3,
	innovative: 0.5,
	entrepreneurial: 0.5,
	dynamic: 0.4,
	energetic: 0.3,
	interactive: 0.3,
	diverse: 0.3,
	eclectic: 0.3,
	exciting: 0.3,
	entertaining: 0.3,
	subversive: 0.3,
	unique: 0.3,
	diy: 0.3,
	fun: 0.3,
	funky: 0.3,
	minimalist: 0.3,
	indie: 0.3,
	refreshing: 0.3,
	craft: 0.3,
	fashion: 0.3
};
var curious = {
	strange: 0.6,
	interesting: 0.5,
	crazy: 0.4,
	adventurous: 0.3,
	cute: 0.3,
	buzzing: 0.3,
	bookish: 0.3,
	colorful: 0.3,
	absurd: 0.3,
	artsy: 0.3,
	weird: 0.5,
	quirky: 0.4,
	happy: 0.4,
	funny: 0.4,
	passionate: 0.3,
	refreshing: 0.3,
	silly: 0.3,
	geeky: 0.3,
	playful: 0.3,
	delightful: 0.3,
	eclectic: 0.3,
	nerdy: 0.3,
	exciting: 0.3,
	mindful: 0.3,
	love: 0.3,
	magical: 0.3,
	whimsical: 0.3,
	cool: 0.3,
	entertaining: 0.3,
	inspired: 0.3,
	lively: 0.3,
	unexpected: 0.3,
	zen: 0.3
};
var dance = {
	singing: 0.5,
	folk: 0.4,
	art: 0.3,
	celebratory: 0.3,
	campy: 0.3,
	musical: 0.4,
	shimmy: 0.4,
	jazzy: 0.4,
	funky: 0.3,
	soulful: 0.3,
	sensual: 0.3,
	raunchy: 0.3,
	glam: 0.3,
	fun: 0.3,
	queer: 0.3,
	fashion: 0.3,
	joyful: 0.3,
	mermaid: 0.3,
	nightlife: 0.3,
	playful: 0.3
};
var dark = {
	moody: 0.4,
	grimy: 0.4,
	cold: 0.3,
	airy: 0.3,
	beautiful: 0.3,
	chill: 0.3,
	neon: 0.3,
	strange: 0.3,
	quiet: 0.3,
	weird: 0.3,
	dreamy: 0.3,
	lit: 0.3,
	cozy: 0.3,
	magical: 0.3,
	trippy: 0.3,
	sunny: 0.3,
	warm: 0.3,
	futuristic: 0.3,
	cool: 0.3,
	sober: 0.3
};
var dating = {
	romantic: 0.3
};
var decorative = {
	whimsical: 0.5,
	antique: 0.4,
	colorful: 0.4,
	garden: 0.4,
	botanical: 0.3,
	art: 0.3,
	artsy: 0.3,
	airy: 0.3,
	beautiful: 0.3,
	kitschy: 0.4,
	elegant: 0.3,
	patio: 0.3,
	minimalist: 0.3,
	diy: 0.3,
	luxe: 0.3,
	neon: 0.3,
	retro: 0.3,
	festive: 0.3,
	flavorful: 0.3,
	quirky: 0.3,
	restorative: 0.3
};
var delightful = {
	lively: 0.6,
	beautiful: 0.6,
	entertaining: 0.5,
	elegant: 0.5,
	fantastic: 0.5,
	classy: 0.4,
	funny: 0.4,
	cute: 0.4,
	fun: 0.4,
	interesting: 0.4,
	adventurous: 0.4,
	blissful: 0.4,
	colorful: 0.4,
	flavorful: 0.4,
	funky: 0.4,
	exciting: 0.4,
	gentle: 0.4,
	airy: 0.4,
	eclectic: 0.4,
	hearty: 0.3,
	energetic: 0.3,
	conversational: 0.3,
	tasty: 0.55,
	whimsical: 0.5,
	refreshing: 0.5,
	sweet: 0.5,
	playful: 0.5,
	dreamy: 0.5,
	magical: 0.5,
	quirky: 0.4,
	joyful: 0.4,
	savory: 0.4,
	jazzy: 0.4,
	romantic: 0.4,
	serene: 0.4,
	sensual: 0.4,
	classic: 0.4,
	soulful: 0.4,
	kitschy: 0.4,
	trippy: 0.4,
	cinematic: 0.3,
	strange: 0.3,
	silly: 0.3,
	spicy: 0.3,
	weird: 0.3,
	musical: 0.3,
	soothing: 0.3,
	campy: 0.3,
	love: 0.3,
	witchy: 0.3,
	sunny: 0.3,
	curious: 0.3,
	scenic: 0.3,
	vibrant: 0.3,
	moody: 0.3,
	artsy: 0.3,
	brunch: 0.3,
	inspired: 0.3,
	simple: 0.3,
	unique: 0.3,
	celebratory: 0.3,
	hidden_gem: 0.3,
	absurd: 0.3,
	comfy: 0.3,
	fancy: 0.3,
	intimate: 0.3,
	minimalist: 0.3,
	relaxing: 0.3
};
var diverse = {
	unique: 0.5,
	colorful: 0.3,
	creative: 0.3,
	cultural: 0.3,
	active: 0.3,
	community: 0.3,
	eclectic: 0.6,
	dynamic: 0.5,
	vibrant: 0.4,
	innovative: 0.4,
	inclusive: 0.3,
	vast: 0.3,
	exciting: 0.3,
	passionate: 0.3,
	energetic: 0.3,
	entrepreneurial: 0.3,
	educational: 0.3,
	holistic: 0.3,
	lively: 0.3,
	together: 0.3,
	experiential: 0.3,
	interactive: 0.3,
	interesting: 0.3
};
var diy = {
	decorative: 0.3,
	creative: 0.3,
	artsy: 0.3,
	oldschool: 0.3,
	retro: 0.3,
	craft: 0.3,
	hifi: 0.3,
	indie: 0.3,
	geeky: 0.3,
	garden: 0.3,
	funky: 0.3,
	innovative: 0.3
};
var dramatic = {
	unexpected: 0.4,
	bold: 0.4,
	big: 0.3,
	cinematic: 0.3,
	classic: 0.3,
	radical: 0.4,
	historic: 0.3,
	magical: 0.3,
	intense: 0.3,
	strange: 0.3,
	emotional: 0.3,
	interesting: 0.3,
	refreshing: 0.3,
	dynamic: 0.3,
	spontaneous: 0.3,
	exciting: 0.3,
	positive: 0.3
};
var dreamy = {
	moody: 0.6,
	airy: 0.5,
	blissful: 0.5,
	beautiful: 0.5,
	delightful: 0.5,
	artsy: 0.4,
	cinematic: 0.4,
	boho: 0.4,
	cute: 0.4,
	campy: 0.4,
	bookish: 0.3,
	adventurous: 0.3,
	classic: 0.3,
	cool: 0.3,
	dark: 0.3,
	colorful: 0.3,
	comfy: 0.3,
	classy: 0.3,
	crazy: 0.3,
	cozy: 0.3,
	boozy: 0.3,
	trippy: 0.6,
	sensual: 0.6,
	romantic: 0.5,
	whimsical: 0.5,
	jazzy: 0.5,
	soulful: 0.5,
	serene: 0.55,
	minimalist: 0.5,
	funky: 0.5,
	soothing: 0.5,
	playful: 0.5,
	sweet: 0.4,
	kitschy: 0.4,
	quirky: 0.4,
	magical: 0.4,
	elegant: 0.4,
	grimy: 0.4,
	joyful: 0.4,
	vibe: 0.4,
	weird: 0.4,
	nerdy: 0.4,
	hippie: 0.4,
	mystic: 0.4,
	retro: 0.4,
	futuristic: 0.4,
	luxe: 0.4,
	witchy: 0.4,
	zen: 0.4,
	gentle: 0.3,
	strange: 0.3,
	fancy: 0.3,
	geeky: 0.3,
	glam: 0.3,
	hipster: 0.3,
	refreshing: 0.3,
	sunny: 0.3,
	eclectic: 0.3,
	intimate: 0.3,
	love: 0.3,
	funny: 0.3,
	silly: 0.3,
	musical: 0.3,
	neon: 0.3,
	savory: 0.3,
	energetic: 0.3,
	indie: 0.3,
	inspired: 0.3,
	lively: 0.3,
	mermaid: 0.3,
	folk: 0.3,
	relaxing: 0.3
};
var drinks = {
	brunch: 0.3,
	boozy: 0.3,
	tasty: 0.3,
	drinking: 0.5,
	nightlife: 0.3,
	spicy: 0.3
};
var drinking = {
	drinks: 0.5,
	boozy: 0.4,
	sober: 0.4,
	nightlife: 0.3
};
var drip = {
	soothing: 0.3
};
var dynamic = {
	vibrant: 0.5,
	diverse: 0.5,
	creative: 0.4,
	active: 0.3,
	beautiful: 0.3,
	colorful: 0.3,
	dramatic: 0.3,
	adventurous: 0.3,
	energetic: 0.5,
	exciting: 0.4,
	innovative: 0.4,
	unique: 0.4,
	lively: 0.4,
	interactive: 0.3,
	interesting: 0.3,
	passionate: 0.3,
	fantastic: 0.3,
	refreshing: 0.3,
	eclectic: 0.3,
	experiential: 0.3,
	elegant: 0.3,
	entertaining: 0.3,
	modern: 0.3,
	playful: 0.3
};
var eclectic = {
	diverse: 0.6,
	artsy: 0.5,
	quirky: 0.5,
	adventurous: 0.5,
	colorful: 0.4,
	boho: 0.4,
	antique: 0.4,
	delightful: 0.4,
	art: 0.3,
	airy: 0.3,
	brunch: 0.3,
	creative: 0.3,
	authentic: 0.3,
	dreamy: 0.3,
	classy: 0.3,
	curious: 0.3,
	artisanal: 0.3,
	beautiful: 0.3,
	campy: 0.3,
	casual: 0.3,
	classic: 0.3,
	cozy: 0.3,
	funky: 0.5,
	whimsical: 0.5,
	jazzy: 0.4,
	musical: 0.4,
	indie: 0.4,
	kitschy: 0.4,
	lively: 0.4,
	soulful: 0.4,
	upscale: 0.4,
	vibe: 0.4,
	elegant: 0.4,
	energetic: 0.4,
	minimalist: 0.4,
	trendy: 0.4,
	trippy: 0.4,
	vintage: 0.4,
	folk: 0.4,
	hipster: 0.4,
	luxe: 0.4,
	retro: 0.4,
	entertaining: 0.3,
	unique: 0.3,
	interesting: 0.3,
	intimate: 0.3,
	vibrant: 0.3,
	exciting: 0.3,
	hippie: 0.3,
	tasty: 0.3,
	experimental: 0.3,
	hidden_gem: 0.3,
	innovative: 0.3,
	nightlife: 0.3,
	playful: 0.3,
	weird: 0.3,
	dynamic: 0.3,
	entrepreneurial: 0.3,
	refreshing: 0.3,
	serene: 0.3,
	hearty: 0.3,
	inspired: 0.3,
	sensual: 0.3,
	outrageous: 0.3,
	posh: 0.3,
	savory: 0.3,
	subversive: 0.3,
	vegan: 0.3,
	witchy: 0.3,
	flavorful: 0.3,
	futuristic: 0.3,
	geeky: 0.3,
	glam: 0.3,
	joyful: 0.3,
	oasis: 0.3,
	oldschool: 0.3,
	strange: 0.3
};
var educational = {
	cultural: 0.4,
	community: 0.4,
	social: 0.3,
	children: 0.3,
	civic: 0.3,
	diverse: 0.3,
	experiential: 0.4,
	interactive: 0.4,
	innovative: 0.3,
	intergenerational: 0.3,
	entrepreneurial: 0.3,
	holistic: 0.3
};
var elegant = {
	classy: 0.6,
	beautiful: 0.5,
	airy: 0.5,
	minimalist: 0.5,
	delightful: 0.5,
	dreamy: 0.4,
	colorful: 0.4,
	boho: 0.4,
	comfy: 0.4,
	artsy: 0.3,
	decorative: 0.3,
	authentic: 0.3,
	casual: 0.3,
	classic: 0.3,
	cute: 0.3,
	cozy: 0.3,
	adventurous: 0.3,
	conversational: 0.3,
	antique: 0.3,
	bookish: 0.3,
	brunch: 0.3,
	luxe: 0.5,
	funky: 0.4,
	serene: 0.4,
	upscale: 0.4,
	sensual: 0.4,
	jazzy: 0.4,
	fancy: 0.4,
	whimsical: 0.4,
	playful: 0.4,
	posh: 0.4,
	eclectic: 0.4,
	trendy: 0.4,
	retro: 0.4,
	simple: 0.4,
	lively: 0.4,
	soulful: 0.4,
	flavorful: 0.3,
	futuristic: 0.3,
	intimate: 0.3,
	kitschy: 0.3,
	modern: 0.3,
	quirky: 0.3,
	romantic: 0.3,
	tasty: 0.3,
	entertaining: 0.3,
	vintage: 0.3,
	sweet: 0.3,
	vibrant: 0.3,
	glam: 0.3,
	moody: 0.3,
	gentle: 0.3,
	soothing: 0.3,
	energetic: 0.3,
	fashion: 0.3,
	joyful: 0.3,
	quiet: 0.3,
	refreshing: 0.3,
	unique: 0.3,
	dynamic: 0.3,
	innovative: 0.3,
	savory: 0.3,
	rugged: 0.3,
	scenic: 0.3
};
var emotional = {
	joyful: 0.3,
	dramatic: 0.3,
	intense: 0.3,
	intimate: 0.3,
	passionate: 0.3,
	unexpected: 0.3,
	intergenerational: 0.3,
	social: 0.3,
	soulful: 0.3,
	romantic: 0.3,
	sensual: 0.3,
	moody: 0.3,
	entertaining: 0.3,
	playful: 0.3,
	experiential: 0.3
};
var energetic = {
	lively: 0.5,
	dynamic: 0.5,
	adventurous: 0.4,
	eclectic: 0.4,
	passionate: 0.4,
	playful: 0.4,
	vibrant: 0.4,
	joyful: 0.4,
	entertaining: 0.4,
	soulful: 0.4,
	funky: 0.3,
	jazzy: 0.3,
	exciting: 0.3,
	gentle: 0.3,
	active: 0.3,
	classy: 0.3,
	colorful: 0.3,
	creative: 0.3,
	sensual: 0.3,
	young: 0.3,
	entrepreneurial: 0.3,
	spontaneous: 0.3,
	bookish: 0.3,
	friendly: 0.3,
	healthy: 0.3,
	moody: 0.3,
	delightful: 0.3,
	intense: 0.3,
	diverse: 0.3,
	quirky: 0.3,
	refreshing: 0.3,
	elegant: 0.3,
	hearty: 0.3,
	loud: 0.3,
	airy: 0.3,
	dreamy: 0.3,
	fun: 0.3,
	funny: 0.3,
	innovative: 0.3,
	serene: 0.3,
	vibe: 0.3,
	beautiful: 0.3
};
var entertaining = {
	lively: 0.5,
	delightful: 0.5,
	classy: 0.4,
	adventurous: 0.4,
	campy: 0.4,
	colorful: 0.4,
	authentic: 0.3,
	casual: 0.3,
	beautiful: 0.3,
	cute: 0.3,
	creative: 0.3,
	absurd: 0.3,
	conversational: 0.3,
	classic: 0.3,
	crazy: 0.3,
	curious: 0.3,
	busy: 0.3,
	fun: 0.5,
	exciting: 0.55,
	funny: 0.55,
	interesting: 0.5,
	tasty: 0.4,
	energetic: 0.4,
	playful: 0.4,
	passionate: 0.4,
	quirky: 0.4,
	refreshing: 0.4,
	silly: 0.4,
	interactive: 0.4,
	eclectic: 0.3,
	whimsical: 0.3,
	fantastic: 0.3,
	flavorful: 0.3,
	joyful: 0.3,
	elegant: 0.3,
	intimate: 0.3,
	friendly: 0.3,
	laugh: 0.3,
	relaxing: 0.3,
	kitschy: 0.3,
	outrageous: 0.3,
	raunchy: 0.3,
	dynamic: 0.3,
	emotional: 0.3,
	innovative: 0.3,
	love: 0.3,
	popular: 0.3,
	romantic: 0.3,
	festive: 0.3,
	happy: 0.3
};
var entrepreneurial = {
	creative: 0.5,
	adventurous: 0.3,
	vibrant: 0.3,
	artisanal: 0.3,
	diverse: 0.3,
	artsy: 0.3,
	innovative: 0.4,
	experiential: 0.3,
	energetic: 0.3,
	eclectic: 0.3,
	passionate: 0.3,
	educational: 0.3,
	small: 0.3,
	unique: 0.3
};
var exciting = {
	refreshing: 0.4,
	adventurous: 0.4,
	beautiful: 0.4,
	delightful: 0.4,
	creative: 0.3,
	diverse: 0.3,
	crazy: 0.3,
	classy: 0.3,
	curious: 0.3,
	colorful: 0.3,
	big: 0.3,
	busy: 0.3,
	dramatic: 0.3,
	interesting: 0.6,
	fantastic: 0.6,
	entertaining: 0.55,
	fun: 0.5,
	innovative: 0.4,
	dynamic: 0.4,
	unique: 0.4,
	proud: 0.4,
	vibrant: 0.4,
	interactive: 0.4,
	passionate: 0.4,
	lively: 0.3,
	energetic: 0.3,
	happy: 0.3,
	magical: 0.3,
	tasty: 0.3,
	eclectic: 0.3,
	weird: 0.3,
	experiential: 0.3,
	hidden_gem: 0.3,
	joyful: 0.3,
	funny: 0.3,
	strange: 0.3,
	futuristic: 0.3,
	"new": 0.3,
	intense: 0.3,
	positive: 0.3,
	funky: 0.3
};
var exclusive = {
	unique: 0.3,
	special: 0.3,
	innovative: 0.3,
	interactive: 0.3
};
var experiential = {
	creative: 0.5,
	unique: 0.4,
	authentic: 0.3,
	adventurous: 0.3,
	conversational: 0.3,
	cultural: 0.3,
	art: 0.3,
	cinematic: 0.3,
	diverse: 0.3,
	interactive: 0.6,
	holistic: 0.4,
	educational: 0.4,
	innovative: 0.4,
	participatory: 0.4,
	entrepreneurial: 0.3,
	exciting: 0.3,
	intimate: 0.3,
	intergenerational: 0.3,
	sensual: 0.3,
	dynamic: 0.3,
	restorative: 0.3,
	fun: 0.3,
	social: 0.3,
	emotional: 0.3
};
var experimental = {
	eclectic: 0.3,
	futuristic: 0.3,
	artsy: 0.3,
	innovative: 0.3,
	minimalist: 0.3,
	trippy: 0.3,
	quirky: 0.3,
	adventurous: 0.3,
	funky: 0.3,
	indie: 0.3,
	novel: 0.3,
	whimsical: 0.3,
	alternative: 0.3,
	art: 0.3
};
var family = {
	community: 0.4,
	children: 0.4,
	kindness: 0.3
};
var fancy = {
	classy: 0.4,
	luxe: 0.4,
	elegant: 0.4,
	cheap: 0.4,
	cute: 0.4,
	comfy: 0.3,
	artsy: 0.3,
	dreamy: 0.3,
	adventurous: 0.3,
	crazy: 0.3,
	beautiful: 0.3,
	casual: 0.3,
	classic: 0.3,
	colorful: 0.3,
	delightful: 0.3,
	funky: 0.4,
	posh: 0.4,
	trendy: 0.4,
	silly: 0.4,
	retro: 0.3,
	kitschy: 0.3,
	minimalist: 0.3,
	futuristic: 0.3,
	quirky: 0.3,
	weird: 0.3,
	geeky: 0.3,
	hifi: 0.3,
	romantic: 0.3,
	tasty: 0.3,
	vintage: 0.3,
	whimsical: 0.3,
	glam: 0.3,
	jazzy: 0.3,
	parisian: 0.3,
	nerdy: 0.3,
	simple: 0.3,
	upscale: 0.3,
	fantastic: 0.3,
	hipster: 0.3,
	modern: 0.3
};
var fantastic = {
	exciting: 0.6,
	beautiful: 0.5,
	delightful: 0.5,
	fun: 0.5,
	happy: 0.4,
	proud: 0.4,
	classy: 0.4,
	crazy: 0.4,
	magical: 0.4,
	interesting: 0.4,
	unique: 0.4,
	weird: 0.4,
	big: 0.3,
	refreshing: 0.3,
	entertaining: 0.3,
	cool: 0.3,
	lively: 0.3,
	love: 0.3,
	tasty: 0.3,
	passionate: 0.3,
	strange: 0.3,
	dynamic: 0.3,
	funny: 0.3,
	vibrant: 0.3,
	favorite: 0.3,
	inspired: 0.3,
	positive: 0.3,
	silly: 0.3,
	sweet: 0.3,
	fancy: 0.3,
	generous: 0.3,
	hidden_gem: 0.3,
	joyful: 0.3
};
var fashion = {
	trendy: 0.4,
	boho: 0.4,
	classy: 0.3,
	artsy: 0.3,
	casual: 0.3,
	art: 0.3,
	dance: 0.3,
	creative: 0.3,
	glam: 0.4,
	luxe: 0.4,
	hipster: 0.3,
	retro: 0.3,
	elegant: 0.3,
	nightlife: 0.3,
	vintage: 0.3,
	indie: 0.3,
	sensual: 0.3
};
var favorite = {
	popular: 0.4,
	classic: 0.3,
	love: 0.4,
	inspired: 0.3,
	fantastic: 0.3,
	quirky: 0.3,
	interesting: 0.3
};
var feminist = {
	queer: 0.5,
	boho: 0.4,
	activist: 0.4,
	cultural: 0.3,
	artsy: 0.3,
	hippie: 0.4,
	radical: 0.4,
	transgender: 0.3,
	sensual: 0.3,
	social: 0.3,
	subversive: 0.3,
	glam: 0.3,
	vegan: 0.3,
	hipster: 0.3,
	romantic: 0.3,
	folk: 0.3
};
var festive = {
	celebratory: 0.4,
	joyful: 0.4,
	colorful: 0.4,
	busy: 0.3,
	boozy: 0.3,
	brunch: 0.3,
	decorative: 0.3,
	entertaining: 0.3,
	weekend: 0.3,
	lively: 0.3,
	tasty: 0.3,
	fun: 0.3,
	relaxing: 0.3,
	savory: 0.3
};
var fierce = {
	lively: 0.3,
	intense: 0.6,
	passionate: 0.3,
	rugged: 0.3
};
var film = {
	cinematic: 0.6,
	novel: 0.3,
	campy: 0.3,
	artsy: 0.3,
	indie: 0.4,
	musical: 0.3,
	romantic: 0.3
};
var flavorful = {
	tasty: 0.7,
	authentic: 0.4,
	delightful: 0.4,
	airy: 0.4,
	brunch: 0.3,
	adventurous: 0.3,
	entertaining: 0.3,
	beautiful: 0.3,
	artisanal: 0.3,
	colorful: 0.3,
	artsy: 0.3,
	savory: 0.7,
	spicy: 0.6,
	hearty: 0.4,
	sweet: 0.4,
	sensual: 0.4,
	soulful: 0.4,
	elegant: 0.3,
	refreshing: 0.3,
	vegan: 0.3,
	funky: 0.3,
	playful: 0.3,
	jazzy: 0.3,
	lively: 0.3,
	vibrant: 0.3,
	whimsical: 0.3,
	fun: 0.3,
	joyful: 0.3,
	soothing: 0.3,
	funny: 0.3,
	kitschy: 0.3,
	luxe: 0.3,
	eclectic: 0.3,
	generous: 0.3,
	gentle: 0.3
};
var folk = {
	soulful: 0.4,
	dance: 0.4,
	eclectic: 0.4,
	jazzy: 0.4,
	musical: 0.4,
	rock: 0.4,
	hippie: 0.4,
	mystic: 0.4,
	singing: 0.4,
	funky: 0.4,
	artsy: 0.3,
	boho: 0.3,
	indie: 0.3,
	cultural: 0.3,
	hipster: 0.3,
	kitschy: 0.3,
	quirky: 0.3,
	art: 0.3,
	trippy: 0.3,
	whimsical: 0.3,
	modern: 0.3,
	classic: 0.3,
	dreamy: 0.3,
	feminist: 0.3,
	minimalist: 0.3,
	queer: 0.3,
	retro: 0.3,
	vibe: 0.3
};
var free = {
	open: 0.3,
	cheap: 0.3
};
var friendly = {
	lively: 0.4,
	cozy: 0.3,
	energetic: 0.3,
	entertaining: 0.3,
	warm: 0.4,
	quiet: 0.3,
	generous: 0.3,
	casual: 0.3,
	gentle: 0.3,
	vibrant: 0.3,
	classy: 0.3,
	cute: 0.3,
	playful: 0.3,
	quirky: 0.3,
	safe: 0.3,
	fun: 0.3,
	popular: 0.3,
	relaxing: 0.3,
	adventurous: 0.3,
	cool: 0.3,
	happy: 0.3,
	colorful: 0.3,
	comfy: 0.3,
	tasty: 0.3
};
var fun = {
	entertaining: 0.5,
	laugh: 0.5,
	exciting: 0.5,
	funny: 0.5,
	crazy: 0.5,
	fantastic: 0.5,
	silly: 0.5,
	weird: 0.4,
	cute: 0.4,
	love: 0.4,
	playful: 0.4,
	joyful: 0.4,
	relaxing: 0.4,
	delightful: 0.4,
	interesting: 0.4,
	beautiful: 0.4,
	cool: 0.4,
	funky: 0.4,
	tasty: 0.4,
	lively: 0.4,
	quirky: 0.4,
	refreshing: 0.4,
	campy: 0.3,
	happy: 0.3,
	vibe: 0.3,
	whimsical: 0.3,
	adventurous: 0.3,
	outdoors: 0.3,
	colorful: 0.3,
	artsy: 0.3,
	biking: 0.3,
	interactive: 0.3,
	kitschy: 0.3,
	comfy: 0.3,
	geeky: 0.3,
	classy: 0.3,
	creative: 0.3,
	magical: 0.3,
	retro: 0.3,
	sweet: 0.3,
	trippy: 0.3,
	brunch: 0.3,
	casual: 0.3,
	dance: 0.3,
	festive: 0.3,
	flavorful: 0.3,
	friendly: 0.3,
	busy: 0.3,
	celebratory: 0.3,
	energetic: 0.3,
	experiential: 0.3,
	glam: 0.3,
	classic: 0.3,
	games: 0.3,
	healthy: 0.3,
	nerdy: 0.3,
	strange: 0.3,
	sunny: 0.3
};
var funky = {
	jazzy: 0.6,
	artsy: 0.6,
	boho: 0.5,
	eclectic: 0.5,
	retro: 0.6,
	trippy: 0.6,
	quirky: 0.5,
	soulful: 0.5,
	vibe: 0.5,
	kitschy: 0.5,
	trendy: 0.5,
	hipster: 0.55,
	minimalist: 0.55,
	whimsical: 0.55,
	cute: 0.5,
	dreamy: 0.5,
	luxe: 0.5,
	glam: 0.5,
	airy: 0.5,
	comfy: 0.5,
	playful: 0.5,
	weird: 0.4,
	colorful: 0.4,
	elegant: 0.4,
	futuristic: 0.4,
	sensual: 0.4,
	campy: 0.4,
	classy: 0.4,
	fancy: 0.4,
	hippie: 0.4,
	moody: 0.4,
	oldschool: 0.4,
	vintage: 0.4,
	classic: 0.4,
	funny: 0.4,
	grimy: 0.4,
	beautiful: 0.4,
	tasty: 0.4,
	delightful: 0.4,
	fun: 0.4,
	refreshing: 0.4,
	adventurous: 0.4,
	cool: 0.4,
	geeky: 0.4,
	neon: 0.4,
	raunchy: 0.4,
	spicy: 0.4,
	folk: 0.4,
	nerdy: 0.4,
	crazy: 0.3,
	energetic: 0.3,
	indie: 0.3,
	lively: 0.3,
	sweet: 0.3,
	vibrant: 0.3,
	zen: 0.3,
	casual: 0.3,
	dance: 0.3,
	upscale: 0.3,
	authentic: 0.3,
	flavorful: 0.3,
	witchy: 0.3,
	musical: 0.3,
	rock: 0.3,
	cozy: 0.3,
	hifi: 0.3,
	posh: 0.3,
	shimmy: 0.3,
	soothing: 0.3,
	joyful: 0.3,
	modern: 0.3,
	nightlife: 0.3,
	savory: 0.3,
	serene: 0.3,
	silly: 0.3,
	strange: 0.3,
	creative: 0.3,
	hip: 0.3,
	bold: 0.3,
	queer: 0.3,
	vegan: 0.3,
	diy: 0.3,
	experimental: 0.3,
	inspired: 0.3,
	interesting: 0.3,
	blissful: 0.3,
	brunch: 0.3,
	exciting: 0.3,
	hearty: 0.3,
	magical: 0.3,
	popping: 0.3
};
var funny = {
	weird: 0.6,
	cute: 0.6,
	fun: 0.5,
	entertaining: 0.55,
	crazy: 0.5,
	campy: 0.5,
	silly: 0.6,
	laugh: 0.6,
	quirky: 0.55,
	playful: 0.5,
	interesting: 0.5,
	strange: 0.5,
	whimsical: 0.4,
	nerdy: 0.4,
	delightful: 0.4,
	absurd: 0.4,
	cool: 0.4,
	funky: 0.4,
	raunchy: 0.4,
	sweet: 0.4,
	geeky: 0.4,
	kitschy: 0.4,
	beautiful: 0.4,
	lively: 0.4,
	outrageous: 0.4,
	classy: 0.4,
	refreshing: 0.4,
	curious: 0.4,
	love: 0.4,
	joyful: 0.3,
	trippy: 0.3,
	ugly: 0.3,
	colorful: 0.3,
	conversational: 0.3,
	moody: 0.3,
	loud: 0.3,
	subversive: 0.3,
	tasty: 0.3,
	artsy: 0.3,
	exciting: 0.3,
	fantastic: 0.3,
	dreamy: 0.3,
	gentle: 0.3,
	happy: 0.3,
	jazzy: 0.3,
	romantic: 0.3,
	sensual: 0.3,
	soulful: 0.3,
	passionate: 0.3,
	spicy: 0.3,
	energetic: 0.3,
	flavorful: 0.3,
	hipster: 0.3,
	witchy: 0.3,
	retro: 0.3,
	simple: 0.3,
	vibe: 0.3
};
var futuristic = {
	retro: 0.55,
	funky: 0.4,
	cinematic: 0.4,
	elegant: 0.3,
	experimental: 0.3,
	trippy: 0.5,
	modern: 0.5,
	minimalist: 0.4,
	grimy: 0.4,
	campy: 0.4,
	classic: 0.4,
	dreamy: 0.4,
	whimsical: 0.4,
	geeky: 0.3,
	kitschy: 0.3,
	oldschool: 0.3,
	neon: 0.3,
	weird: 0.3,
	nerdy: 0.3,
	quirky: 0.3,
	innovative: 0.3,
	strange: 0.3,
	fancy: 0.3,
	glam: 0.3,
	luxe: 0.3,
	cool: 0.3,
	jazzy: 0.3,
	"new": 0.3,
	airy: 0.3,
	artsy: 0.3,
	adventurous: 0.3,
	exciting: 0.3,
	magical: 0.3,
	trendy: 0.3,
	urban: 0.3,
	unique: 0.3,
	beautiful: 0.3,
	bold: 0.3,
	colorful: 0.3,
	dark: 0.3,
	hipster: 0.3,
	moody: 0.3,
	vintage: 0.3,
	boho: 0.3,
	eclectic: 0.3,
	inspired: 0.3,
	sensual: 0.3
};
var fresh = {
	"new": 0.4,
	bold: 0.3,
	refreshing: 0.4,
	tasty: 0.3,
	rejuvenating: 0.3,
	soothing: 0.3,
	healthy: 0.3,
	warm: 0.3,
	hearty: 0.3,
	spicy: 0.3
};
var games = {
	fun: 0.3
};
var garden = {
	patio: 0.5,
	botanical: 0.5,
	decorative: 0.4,
	beautiful: 0.3,
	aquatic: 0.3,
	diy: 0.3,
	antique: 0.3,
	park: 0.4,
	outdoors: 0.3,
	oasis: 0.3,
	tropical: 0.3
};
var gay = {
	transgender: 0.7,
	feminist: 0.4,
	queer: 0.7,
	raunchy: 0.3,
	hipster: 0.3,
	nightlife: 0.3
};
var geeky = {
	nerdy: 0.8,
	bookish: 0.5,
	cute: 0.5,
	artsy: 0.4,
	cool: 0.4,
	funny: 0.4,
	campy: 0.4,
	dreamy: 0.3,
	diy: 0.3,
	casual: 0.3,
	curious: 0.3,
	boho: 0.3,
	crazy: 0.3,
	adventurous: 0.3,
	hipster: 0.5,
	quirky: 0.5,
	weird: 0.4,
	hippie: 0.4,
	silly: 0.4,
	funky: 0.4,
	oldschool: 0.4,
	retro: 0.4,
	futuristic: 0.3,
	kitschy: 0.3,
	trendy: 0.3,
	trippy: 0.3,
	indie: 0.3,
	playful: 0.3,
	sweet: 0.3,
	fancy: 0.3,
	fun: 0.3,
	glam: 0.3,
	minimalist: 0.3,
	queer: 0.3,
	raunchy: 0.3,
	romantic: 0.3,
	whimsical: 0.3,
	witchy: 0.3,
	moody: 0.3,
	zen: 0.3,
	eclectic: 0.3
};
var generous = {
	kindness: 0.3,
	hearty: 0.4,
	gentle: 0.3,
	friendly: 0.3,
	happy: 0.3,
	tasty: 0.3,
	warm: 0.3,
	fantastic: 0.3,
	flavorful: 0.3,
	proud: 0.3,
	sweet: 0.3
};
var gentle = {
	delightful: 0.4,
	conversational: 0.4,
	dreamy: 0.3,
	calm: 0.3,
	energetic: 0.3,
	generous: 0.3,
	beautiful: 0.3,
	airy: 0.3,
	cute: 0.3,
	friendly: 0.3,
	bookish: 0.3,
	elegant: 0.3,
	classy: 0.3,
	playful: 0.55,
	soothing: 0.5,
	serene: 0.4,
	quiet: 0.4,
	soulful: 0.4,
	sweet: 0.4,
	sensual: 0.4,
	joyful: 0.4,
	jazzy: 0.3,
	moody: 0.3,
	kindness: 0.3,
	warm: 0.3,
	hearty: 0.3,
	peaceful: 0.3,
	whimsical: 0.3,
	lively: 0.3,
	funny: 0.3,
	relaxing: 0.3,
	restorative: 0.3,
	natural: 0.3,
	zen: 0.3,
	flavorful: 0.3,
	quirky: 0.3,
	refreshing: 0.3,
	romantic: 0.3
};
var glam = {
	boho: 0.6,
	luxe: 0.6,
	funky: 0.5,
	fashion: 0.4,
	campy: 0.4,
	artsy: 0.4,
	classy: 0.4,
	cute: 0.4,
	dreamy: 0.3,
	classic: 0.3,
	comfy: 0.3,
	cinematic: 0.3,
	beautiful: 0.3,
	dance: 0.3,
	airy: 0.3,
	casual: 0.3,
	retro: 0.55,
	trendy: 0.5,
	hipster: 0.4,
	vibe: 0.4,
	kitschy: 0.4,
	posh: 0.4,
	hippie: 0.4,
	indie: 0.4,
	jazzy: 0.4,
	minimalist: 0.4,
	raunchy: 0.4,
	soulful: 0.3,
	trippy: 0.3,
	sensual: 0.3,
	nightlife: 0.3,
	parisian: 0.3,
	futuristic: 0.3,
	neon: 0.3,
	rock: 0.3,
	romantic: 0.3,
	elegant: 0.3,
	feminist: 0.3,
	geeky: 0.3,
	fancy: 0.3,
	grimy: 0.3,
	moody: 0.3,
	nerdy: 0.3,
	queer: 0.3,
	fun: 0.3,
	hifi: 0.3,
	playful: 0.3,
	vintage: 0.3,
	eclectic: 0.3,
	musical: 0.3,
	witchy: 0.3
};
var grimy = {
	dreamy: 0.4,
	funky: 0.4,
	futuristic: 0.4,
	moody: 0.4,
	hipster: 0.4,
	neon: 0.4,
	kitschy: 0.4,
	trippy: 0.4,
	dark: 0.4,
	retro: 0.3,
	boho: 0.3,
	crowded: 0.3,
	artsy: 0.3,
	cinematic: 0.3,
	jazzy: 0.3,
	serene: 0.3,
	soulful: 0.3,
	airy: 0.3,
	minimalist: 0.3,
	posh: 0.3,
	vibe: 0.3,
	boozy: 0.3,
	cozy: 0.3,
	glam: 0.3,
	hippie: 0.3,
	messy: 0.3,
	weird: 0.3,
	comfy: 0.3,
	indie: 0.3,
	urban: 0.3,
	blissful: 0.3,
	nerdy: 0.3,
	oldschool: 0.3,
	underground: 0.3
};
var happy = {
	proud: 0.6,
	fantastic: 0.4,
	curious: 0.4,
	crazy: 0.3,
	fun: 0.3,
	exciting: 0.3,
	generous: 0.3,
	joyful: 0.4,
	passionate: 0.3,
	love: 0.3,
	healthy: 0.3,
	laugh: 0.3,
	positive: 0.3,
	sweet: 0.3,
	weird: 0.3,
	busy: 0.3,
	mindful: 0.3,
	funny: 0.3,
	interesting: 0.3,
	celebratory: 0.3,
	safe: 0.3,
	strange: 0.3,
	beautiful: 0.3,
	big: 0.3,
	blissful: 0.3,
	classy: 0.3,
	cute: 0.3,
	friendly: 0.3,
	quiet: 0.3,
	refreshing: 0.3,
	silly: 0.3,
	comfy: 0.3,
	entertaining: 0.3,
	relaxing: 0.3
};
var healthy = {
	safe: 0.4,
	active: 0.4,
	energetic: 0.3,
	happy: 0.3,
	fresh: 0.3,
	calm: 0.3,
	positive: 0.3,
	tasty: 0.3,
	vibrant: 0.3,
	hearty: 0.3,
	natural: 0.3,
	warm: 0.3,
	lively: 0.3,
	fun: 0.3,
	young: 0.3
};
var hearty = {
	flavorful: 0.4,
	generous: 0.4,
	delightful: 0.3,
	brunch: 0.3,
	celebratory: 0.3,
	gentle: 0.3,
	boozy: 0.3,
	healthy: 0.3,
	comfy: 0.3,
	eclectic: 0.3,
	energetic: 0.3,
	fresh: 0.3,
	blissful: 0.3,
	funky: 0.3,
	tasty: 0.5,
	savory: 0.4,
	spicy: 0.4,
	warm: 0.4,
	sweet: 0.4,
	lively: 0.3,
	loud: 0.3,
	joyful: 0.3,
	playful: 0.3,
	jazzy: 0.3,
	refreshing: 0.3,
	soulful: 0.3,
	sunny: 0.3
};
var hifi = {
	oldschool: 0.3,
	diy: 0.3,
	analog: 0.3,
	funky: 0.3,
	fancy: 0.3,
	glam: 0.3,
	retro: 0.3,
	minimalist: 0.3,
	trippy: 0.3,
	weird: 0.3
};
var hiking = {
	biking: 0.5,
	scenic: 0.4,
	outdoors: 0.3,
	relaxing: 0.3
};
var hipster = {
	artsy: 0.6,
	boho: 0.6,
	trendy: 0.5,
	campy: 0.4,
	cute: 0.4,
	comfy: 0.3,
	dreamy: 0.3,
	bookish: 0.3,
	casual: 0.3,
	artisanal: 0.3,
	boozy: 0.3,
	cinematic: 0.3,
	cool: 0.3,
	hippie: 0.6,
	indie: 0.5,
	geeky: 0.5,
	nerdy: 0.5,
	funky: 0.55,
	kitschy: 0.4,
	retro: 0.4,
	glam: 0.4,
	luxe: 0.4,
	queer: 0.4,
	vibe: 0.4,
	nightlife: 0.4,
	grimy: 0.4,
	eclectic: 0.4,
	quirky: 0.4,
	trippy: 0.4,
	vegan: 0.3,
	hip: 0.3,
	jazzy: 0.3,
	minimalist: 0.3,
	neon: 0.3,
	oldschool: 0.3,
	parisian: 0.3,
	rock: 0.3,
	folk: 0.3,
	urban: 0.3,
	upscale: 0.3,
	zen: 0.3,
	fashion: 0.3,
	soulful: 0.3,
	witchy: 0.3,
	weird: 0.3,
	feminist: 0.3,
	posh: 0.3,
	funny: 0.3,
	futuristic: 0.3,
	gay: 0.3,
	moody: 0.3,
	fancy: 0.3,
	vintage: 0.3,
	whimsical: 0.3
};
var historic = {
	cultural: 0.4,
	scenic: 0.3,
	dramatic: 0.3,
	vintage: 0.3,
	antique: 0.3,
	beautiful: 0.3,
	authentic: 0.3,
	modern: 0.3,
	unique: 0.3,
	magical: 0.3
};
var holistic = {
	experiential: 0.4,
	participatory: 0.4,
	unique: 0.4,
	inclusive: 0.3,
	restorative: 0.3,
	innovative: 0.3,
	perspective: 0.3,
	rejuvenating: 0.3,
	social: 0.3,
	diverse: 0.3,
	alternative: 0.3,
	soothing: 0.3,
	educational: 0.3
};
var hidden_gem = {
	oasis: 0.4,
	eclectic: 0.3,
	exciting: 0.3,
	beautiful: 0.3,
	tasty: 0.3,
	nightlife: 0.3,
	interesting: 0.3,
	scenic: 0.3,
	trendy: 0.3,
	delightful: 0.3,
	fantastic: 0.3
};
var hip = {
	trendy: 0.4,
	hipster: 0.3,
	boho: 0.3,
	funky: 0.3,
	artsy: 0.3,
	retro: 0.3
};
var hippie = {
	hipster: 0.6,
	boho: 0.5,
	artsy: 0.5,
	funky: 0.4,
	folk: 0.4,
	geeky: 0.4,
	glam: 0.4,
	kitschy: 0.4,
	nerdy: 0.4,
	trippy: 0.4,
	vegan: 0.4,
	feminist: 0.4,
	retro: 0.4,
	dreamy: 0.4,
	vibe: 0.4,
	queer: 0.3,
	luxe: 0.3,
	trendy: 0.3,
	eclectic: 0.3,
	zen: 0.3,
	rock: 0.3,
	jazzy: 0.3,
	quirky: 0.3,
	minimalist: 0.3,
	soulful: 0.3,
	weird: 0.3,
	grimy: 0.3,
	mermaid: 0.3,
	neon: 0.3,
	radical: 0.3,
	urban: 0.3,
	whimsical: 0.3,
	mystic: 0.3,
	vintage: 0.3,
	witchy: 0.3,
	indie: 0.4,
	blissful: 0.3,
	boozy: 0.3,
	campy: 0.3,
	cute: 0.3,
	activist: 0.3,
	crazy: 0.3,
	bookish: 0.3,
	comfy: 0.3
};
var inclusive = {
	participatory: 0.4,
	holistic: 0.3,
	diverse: 0.3,
	authentic: 0.3,
	vibrant: 0.3,
	peaceful: 0.3
};
var indie = {
	hipster: 0.5,
	artsy: 0.5,
	film: 0.4,
	cinematic: 0.4,
	boho: 0.4,
	eclectic: 0.4,
	rock: 0.4,
	trippy: 0.4,
	glam: 0.4,
	hippie: 0.4,
	quirky: 0.4,
	funky: 0.3,
	oldschool: 0.3,
	queer: 0.3,
	folk: 0.3,
	geeky: 0.3,
	musical: 0.3,
	diy: 0.3,
	campy: 0.3,
	retro: 0.3,
	soulful: 0.3,
	kitschy: 0.3,
	minimalist: 0.3,
	vibe: 0.3,
	moody: 0.3,
	trendy: 0.3,
	jazzy: 0.3,
	nerdy: 0.3,
	creative: 0.3,
	dreamy: 0.3,
	experimental: 0.3,
	grimy: 0.3,
	fashion: 0.3,
	nightlife: 0.3,
	underground: 0.3
};
var innovative = {
	unique: 0.5,
	creative: 0.5,
	exciting: 0.4,
	diverse: 0.4,
	dynamic: 0.4,
	experiential: 0.4,
	alternative: 0.4,
	holistic: 0.3,
	adventurous: 0.3,
	bold: 0.3,
	diy: 0.3,
	interactive: 0.4,
	entrepreneurial: 0.4,
	"new": 0.3,
	eclectic: 0.3,
	futuristic: 0.3,
	vibrant: 0.3,
	experimental: 0.3,
	educational: 0.3,
	passionate: 0.3,
	elegant: 0.3,
	energetic: 0.3,
	entertaining: 0.3,
	exclusive: 0.3,
	modern: 0.3,
	quirky: 0.3,
	participatory: 0.3,
	proud: 0.3
};
var inspired = {
	classic: 0.4,
	favorite: 0.3,
	adventurous: 0.3,
	authentic: 0.3,
	bold: 0.3,
	crazy: 0.3,
	delightful: 0.3,
	eclectic: 0.3,
	fantastic: 0.3,
	beautiful: 0.3,
	colorful: 0.3,
	dreamy: 0.3,
	funky: 0.3,
	curious: 0.3,
	futuristic: 0.3,
	whimsical: 0.3,
	love: 0.3,
	passionate: 0.3,
	refreshing: 0.3,
	minimalist: 0.3,
	quirky: 0.3,
	retro: 0.3,
	interesting: 0.3,
	mystic: 0.3,
	popular: 0.3,
	spontaneous: 0.3,
	vintage: 0.3,
	weird: 0.3
};
var intense = {
	fierce: 0.6,
	emotional: 0.3,
	energetic: 0.3,
	passionate: 0.3,
	dramatic: 0.3,
	exciting: 0.3,
	active: 0.3,
	lively: 0.3,
	quiet: 0.3,
	intimate: 0.3
};
var interactive = {
	experiential: 0.6,
	innovative: 0.4,
	educational: 0.4,
	entertaining: 0.4,
	exciting: 0.4,
	unique: 0.4,
	participatory: 0.3,
	creative: 0.3,
	dynamic: 0.3,
	fun: 0.3,
	conversational: 0.3,
	colorful: 0.3,
	authentic: 0.3,
	exclusive: 0.3,
	lively: 0.3,
	interesting: 0.3,
	diverse: 0.3
};
var intergenerational = {
	cultural: 0.4,
	emotional: 0.3,
	experiential: 0.3,
	educational: 0.3,
	community: 0.3,
	social: 0.4,
	participatory: 0.3
};
var international = {
	local: 0.3
};
var interesting = {
	exciting: 0.6,
	curious: 0.5,
	entertaining: 0.5,
	funny: 0.5,
	delightful: 0.4,
	fun: 0.4,
	fantastic: 0.4,
	absurd: 0.3,
	crazy: 0.3,
	eclectic: 0.3,
	colorful: 0.3,
	cool: 0.3,
	dynamic: 0.3,
	adventurous: 0.3,
	beautiful: 0.3,
	cute: 0.3,
	hidden_gem: 0.3,
	happy: 0.3,
	dramatic: 0.3,
	funky: 0.3,
	inspired: 0.3,
	interactive: 0.3,
	classic: 0.3,
	classy: 0.3,
	diverse: 0.3,
	favorite: 0.3,
	weird: 0.5,
	strange: 0.5,
	refreshing: 0.4,
	lively: 0.4,
	silly: 0.4,
	quirky: 0.4,
	unique: 0.4,
	tasty: 0.3,
	ugly: 0.3,
	perspective: 0.3,
	popular: 0.3,
	positive: 0.3,
	unexpected: 0.3,
	magical: 0.3,
	outrageous: 0.3,
	whimsical: 0.3,
	simple: 0.3,
	trippy: 0.3
};
var intimate = {
	cozy: 0.4,
	elegant: 0.3,
	eclectic: 0.3,
	emotional: 0.3,
	beautiful: 0.3,
	experiential: 0.3,
	airy: 0.3,
	authentic: 0.3,
	casual: 0.3,
	conversational: 0.3,
	entertaining: 0.3,
	artsy: 0.3,
	dreamy: 0.3,
	comfy: 0.3,
	adventurous: 0.3,
	delightful: 0.3,
	intense: 0.3,
	romantic: 0.5,
	sensual: 0.4,
	soulful: 0.3,
	playful: 0.3,
	serene: 0.3,
	mingle: 0.3,
	raunchy: 0.3,
	unique: 0.3,
	lively: 0.3,
	spontaneous: 0.3,
	moody: 0.3,
	musical: 0.3,
	patio: 0.3,
	quiet: 0.3,
	relaxing: 0.3,
	upscale: 0.3
};
var jazzy = {
	funky: 0.6,
	dreamy: 0.5,
	airy: 0.4,
	campy: 0.4,
	boho: 0.4,
	folk: 0.4,
	eclectic: 0.4,
	elegant: 0.4,
	artsy: 0.4,
	delightful: 0.4,
	dance: 0.4,
	glam: 0.4,
	classic: 0.4,
	colorful: 0.3,
	energetic: 0.3,
	cinematic: 0.3,
	gentle: 0.3,
	hipster: 0.3,
	classy: 0.3,
	hippie: 0.3,
	adventurous: 0.3,
	flavorful: 0.3,
	futuristic: 0.3,
	grimy: 0.3,
	funny: 0.3,
	indie: 0.3,
	blissful: 0.3,
	fancy: 0.3,
	beautiful: 0.3,
	conversational: 0.3,
	comfy: 0.3,
	hearty: 0.3,
	cute: 0.3,
	soulful: 0.7,
	trippy: 0.5,
	musical: 0.55,
	playful: 0.55,
	sensual: 0.55,
	minimalist: 0.5,
	retro: 0.5,
	whimsical: 0.5,
	moody: 0.4,
	kitschy: 0.4,
	vibe: 0.4,
	singing: 0.4,
	soothing: 0.4,
	joyful: 0.4,
	luxe: 0.4,
	quirky: 0.4,
	romantic: 0.3,
	lively: 0.3,
	savory: 0.3,
	oldschool: 0.3,
	sweet: 0.3,
	raunchy: 0.3,
	shimmy: 0.3,
	spicy: 0.3,
	witchy: 0.3,
	refreshing: 0.3,
	rock: 0.3,
	serene: 0.3,
	nerdy: 0.3,
	vintage: 0.3,
	weird: 0.3,
	tasty: 0.3,
	trendy: 0.3
};
var joyful = {
	celebratory: 0.5,
	blissful: 0.5,
	beautiful: 0.4,
	delightful: 0.4,
	energetic: 0.4,
	fun: 0.4,
	dreamy: 0.4,
	festive: 0.4,
	happy: 0.4,
	colorful: 0.4,
	gentle: 0.4,
	emotional: 0.3,
	entertaining: 0.3,
	funny: 0.3,
	adventurous: 0.3,
	exciting: 0.3,
	airy: 0.3,
	funky: 0.3,
	hearty: 0.3,
	elegant: 0.3,
	flavorful: 0.3,
	dance: 0.3,
	cute: 0.3,
	eclectic: 0.3,
	fantastic: 0.3,
	playful: 0.55,
	serene: 0.5,
	soulful: 0.4,
	sensual: 0.4,
	spontaneous: 0.4,
	whimsical: 0.4,
	lively: 0.4,
	jazzy: 0.4,
	laugh: 0.4,
	magical: 0.4,
	peaceful: 0.4,
	singing: 0.4,
	soothing: 0.4,
	sweet: 0.4,
	love: 0.3,
	passionate: 0.3,
	vibrant: 0.3,
	romantic: 0.3,
	moody: 0.3,
	refreshing: 0.3,
	strange: 0.3,
	trippy: 0.3,
	loud: 0.3,
	quiet: 0.3,
	quirky: 0.3,
	relaxing: 0.3,
	sunny: 0.3,
	kindness: 0.3,
	musical: 0.3,
	tasty: 0.3,
	weird: 0.3,
	sober: 0.3,
	vibe: 0.3,
	proud: 0.3,
	warm: 0.3
};
var kitschy = {
	campy: 0.6,
	retro: 0.6,
	jazzy: 0.4,
	whimsical: 0.6,
	artsy: 0.5,
	funky: 0.5,
	quirky: 0.5,
	cute: 0.5,
	trippy: 0.5,
	trendy: 0.4,
	dreamy: 0.4,
	hipster: 0.4,
	minimalist: 0.4,
	playful: 0.4,
	colorful: 0.4,
	glam: 0.4,
	neon: 0.4,
	silly: 0.4,
	luxe: 0.4,
	classic: 0.4,
	eclectic: 0.4,
	funny: 0.4,
	hippie: 0.4,
	boho: 0.4,
	decorative: 0.4,
	raunchy: 0.4,
	sensual: 0.4,
	vintage: 0.4,
	cinematic: 0.4,
	grimy: 0.4,
	weird: 0.4,
	delightful: 0.4,
	elegant: 0.3,
	futuristic: 0.3,
	geeky: 0.3,
	mermaid: 0.3,
	fancy: 0.3,
	nerdy: 0.3,
	romantic: 0.3,
	airy: 0.3,
	antique: 0.3,
	classy: 0.3,
	vibe: 0.3,
	beautiful: 0.3,
	moody: 0.3,
	musical: 0.3,
	tasty: 0.3,
	authentic: 0.3,
	casual: 0.3,
	folk: 0.3,
	fun: 0.3,
	indie: 0.3,
	subversive: 0.3,
	upscale: 0.3,
	adventurous: 0.3,
	comfy: 0.3,
	savory: 0.3,
	soulful: 0.3,
	art: 0.3,
	cool: 0.3,
	entertaining: 0.3,
	spicy: 0.3,
	zen: 0.3,
	scenic: 0.3,
	absurd: 0.3,
	flavorful: 0.3,
	modern: 0.3,
	oldschool: 0.3,
	sweet: 0.3,
	cultural: 0.3,
	posh: 0.3,
	rock: 0.3
};
var kindness = {
	solidarity: 0.4,
	joyful: 0.3,
	love: 0.4,
	generous: 0.3,
	gentle: 0.3,
	volunteer: 0.3,
	community: 0.3,
	family: 0.3
};
var kink = {
	weird: 0.3
};
var lax = {
	cozy: 0.3
};
var laugh = {
	funny: 0.6,
	fun: 0.5,
	crazy: 0.4,
	cute: 0.4,
	happy: 0.3,
	entertaining: 0.3,
	campy: 0.3,
	conversational: 0.3,
	silly: 0.4,
	love: 0.4,
	playful: 0.4,
	joyful: 0.4,
	weird: 0.4,
	loud: 0.3,
	singing: 0.3,
	shimmy: 0.3,
	nerdy: 0.3,
	mingle: 0.3,
	quirky: 0.3,
	walk: 0.3
};
var lit = {
	dark: 0.3,
	airy: 0.3,
	neon: 0.3,
	popping: 0.3,
	warm: 0.3
};
var lively = {
	delightful: 0.6,
	entertaining: 0.5,
	energetic: 0.5,
	colorful: 0.5,
	classy: 0.4,
	interesting: 0.4,
	dynamic: 0.4,
	eclectic: 0.4,
	friendly: 0.4,
	funny: 0.4,
	fun: 0.4,
	elegant: 0.4,
	adventurous: 0.3,
	conversational: 0.3,
	exciting: 0.3,
	funky: 0.3,
	airy: 0.3,
	beautiful: 0.3,
	fierce: 0.3,
	fantastic: 0.3,
	hearty: 0.3,
	buzzing: 0.3,
	celebratory: 0.3,
	festive: 0.3,
	flavorful: 0.3,
	gentle: 0.3,
	cute: 0.3,
	casual: 0.3,
	diverse: 0.3,
	dreamy: 0.3,
	healthy: 0.3,
	intense: 0.3,
	authentic: 0.3,
	curious: 0.3,
	interactive: 0.3,
	vibrant: 0.5,
	playful: 0.5,
	quirky: 0.4,
	joyful: 0.4,
	tasty: 0.4,
	passionate: 0.3,
	quiet: 0.3,
	jazzy: 0.3,
	serene: 0.3,
	refreshing: 0.3,
	whimsical: 0.3,
	warm: 0.3,
	soulful: 0.3,
	sensual: 0.3,
	intimate: 0.3,
	spontaneous: 0.3,
	spicy: 0.3
};
var loud = {
	laugh: 0.3,
	quiet: 0.4,
	funny: 0.3,
	hearty: 0.3,
	joyful: 0.3,
	passionate: 0.3,
	buzzing: 0.3,
	energetic: 0.3,
	soothing: 0.3,
	crazy: 0.3,
	playful: 0.3,
	singing: 0.3
};
var local = {
	civic: 0.4,
	community: 0.4,
	international: 0.3,
	cultural: 0.3,
	volunteer: 0.3,
	"public": 0.3,
	social: 0.3
};
var luxe = {
	boho: 0.6,
	glam: 0.6,
	elegant: 0.5,
	funky: 0.5,
	comfy: 0.4,
	artsy: 0.4,
	fancy: 0.4,
	fashion: 0.4,
	hipster: 0.4,
	airy: 0.4,
	classy: 0.4,
	eclectic: 0.4,
	dreamy: 0.4,
	beautiful: 0.3,
	classic: 0.3,
	hippie: 0.3,
	casual: 0.3,
	campy: 0.3,
	adventurous: 0.3,
	cozy: 0.3,
	futuristic: 0.3,
	artisanal: 0.3,
	cute: 0.3,
	cinematic: 0.3,
	brunch: 0.3,
	blissful: 0.3,
	decorative: 0.3,
	flavorful: 0.3,
	trendy: 0.5,
	upscale: 0.5,
	posh: 0.5,
	retro: 0.5,
	minimalist: 0.5,
	kitschy: 0.4,
	sensual: 0.4,
	jazzy: 0.4,
	vintage: 0.4,
	nightlife: 0.3,
	vibe: 0.3,
	zen: 0.3,
	quirky: 0.3,
	whimsical: 0.3,
	parisian: 0.3,
	serene: 0.3,
	modern: 0.3,
	romantic: 0.3,
	savory: 0.3,
	soulful: 0.3,
	trippy: 0.3,
	vegan: 0.3,
	neon: 0.3,
	oasis: 0.3,
	spicy: 0.3,
	tasty: 0.3,
	witchy: 0.3
};
var love = {
	beautiful: 0.5,
	romantic: 0.4,
	fun: 0.4,
	crazy: 0.4,
	cute: 0.4,
	laugh: 0.4,
	favorite: 0.4,
	funny: 0.4,
	fantastic: 0.3,
	happy: 0.3,
	delightful: 0.3,
	blissful: 0.3,
	inspired: 0.3,
	dreamy: 0.3,
	curious: 0.3,
	classy: 0.3,
	entertaining: 0.3,
	passionate: 0.5,
	kindness: 0.4,
	weird: 0.4,
	joyful: 0.3,
	sweet: 0.3,
	sensual: 0.3,
	magical: 0.3,
	soulful: 0.3,
	strange: 0.3,
	playful: 0.3,
	silly: 0.3,
	vibe: 0.3,
	outdoors: 0.3,
	singing: 0.3
};
var magical = {
	strange: 0.5,
	joyful: 0.4,
	mystic: 0.5,
	delightful: 0.5,
	beautiful: 0.4,
	dreamy: 0.4,
	blissful: 0.4,
	fantastic: 0.4,
	weird: 0.4,
	whimsical: 0.4,
	crazy: 0.3,
	unique: 0.3,
	exciting: 0.3,
	sweet: 0.3,
	witchy: 0.3,
	trippy: 0.3,
	cinematic: 0.3,
	dramatic: 0.3,
	musical: 0.3,
	quirky: 0.3,
	wild: 0.3,
	colorful: 0.3,
	dark: 0.3,
	fun: 0.3,
	love: 0.3,
	romantic: 0.3,
	special: 0.3,
	curious: 0.3,
	futuristic: 0.3,
	interesting: 0.3,
	rejuvenating: 0.3,
	restorative: 0.3,
	serene: 0.3,
	silly: 0.3,
	soothing: 0.3,
	classic: 0.3,
	playful: 0.3,
	refreshing: 0.3,
	funky: 0.3,
	historic: 0.3,
	mermaid: 0.3,
	unexpected: 0.3
};
var messy = {
	boozy: 0.3,
	cozy: 0.3,
	grimy: 0.3,
	ugly: 0.5,
	weird: 0.3,
	strange: 0.3,
	silly: 0.3,
	simple: 0.3
};
var mermaid = {
	cute: 0.4,
	kitschy: 0.3,
	aquatic: 0.3,
	campy: 0.3,
	whimsical: 0.3,
	neon: 0.3,
	witchy: 0.3,
	beautiful: 0.3,
	dreamy: 0.3,
	hippie: 0.3,
	mystic: 0.3,
	boho: 0.3,
	dance: 0.3,
	magical: 0.3,
	shimmy: 0.3
};
var minimalist = {
	elegant: 0.5,
	airy: 0.55,
	funky: 0.55,
	dreamy: 0.5,
	retro: 0.5,
	jazzy: 0.5,
	luxe: 0.5,
	kitschy: 0.4,
	trippy: 0.5,
	whimsical: 0.5,
	artsy: 0.5,
	futuristic: 0.4,
	moody: 0.4,
	sensual: 0.4,
	quirky: 0.4,
	cinematic: 0.4,
	classy: 0.4,
	eclectic: 0.4,
	soulful: 0.4,
	zen: 0.4,
	boho: 0.4,
	glam: 0.4,
	modern: 0.4,
	playful: 0.4,
	trendy: 0.4,
	campy: 0.3,
	classic: 0.3,
	serene: 0.3,
	oldschool: 0.3,
	fancy: 0.3,
	hipster: 0.3,
	simple: 0.3,
	vibe: 0.3,
	art: 0.3,
	bold: 0.3,
	comfy: 0.3,
	decorative: 0.3,
	experimental: 0.3,
	indie: 0.3,
	soothing: 0.3,
	beautiful: 0.3,
	casual: 0.3,
	cool: 0.3,
	hippie: 0.3,
	creative: 0.3,
	geeky: 0.3,
	grimy: 0.3,
	hifi: 0.3,
	inspired: 0.3,
	adventurous: 0.3,
	refreshing: 0.3,
	vintage: 0.3,
	colorful: 0.3,
	delightful: 0.3,
	folk: 0.3,
	musical: 0.3,
	neon: 0.3
};
var mindful = {
	happy: 0.3,
	curious: 0.3,
	proud: 0.3
};
var mingle = {
	brunch: 0.3,
	crowded: 0.3,
	intimate: 0.3,
	laugh: 0.3,
	walk: 0.3
};
var modern = {
	futuristic: 0.5,
	classic: 0.4,
	minimalist: 0.4,
	elegant: 0.3,
	cinematic: 0.3,
	cultural: 0.3,
	art: 0.3,
	authentic: 0.3,
	funky: 0.3,
	folk: 0.3,
	historic: 0.3,
	airy: 0.3,
	dynamic: 0.3,
	innovative: 0.3,
	beautiful: 0.3,
	fancy: 0.3,
	retro: 0.3,
	"new": 0.3,
	urban: 0.3,
	unique: 0.3,
	luxe: 0.3,
	trendy: 0.3,
	oldschool: 0.3,
	kitschy: 0.3,
	quirky: 0.3,
	vibrant: 0.3,
	vintage: 0.3
};
var moody = {
	dreamy: 0.6,
	trippy: 0.55,
	jazzy: 0.4,
	playful: 0.5,
	sensual: 0.5,
	soulful: 0.5,
	minimalist: 0.4,
	funky: 0.4,
	romantic: 0.4,
	quirky: 0.4,
	whimsical: 0.4,
	dark: 0.4,
	grimy: 0.4,
	artsy: 0.4,
	serene: 0.4,
	airy: 0.4,
	soothing: 0.4,
	vibe: 0.4,
	campy: 0.4,
	nerdy: 0.4,
	cinematic: 0.3,
	gentle: 0.3,
	weird: 0.3,
	beautiful: 0.3,
	bookish: 0.3,
	cute: 0.3,
	funny: 0.3,
	joyful: 0.3,
	kitschy: 0.3,
	witchy: 0.3,
	adventurous: 0.3,
	boho: 0.3,
	classy: 0.3,
	energetic: 0.3,
	sweet: 0.3,
	boozy: 0.3,
	cool: 0.3,
	elegant: 0.3,
	indie: 0.3,
	quiet: 0.3,
	delightful: 0.3,
	oldschool: 0.3,
	strange: 0.3,
	blissful: 0.3,
	colorful: 0.3,
	emotional: 0.3,
	geeky: 0.3,
	glam: 0.3,
	raunchy: 0.3,
	crazy: 0.3,
	futuristic: 0.3,
	hipster: 0.3,
	intimate: 0.3,
	sober: 0.3,
	zen: 0.3,
	retro: 0.3,
	spicy: 0.3
};
var morning = {
	afternoon: 0.8,
	weekend: 0.5,
	sunny: 0.3
};
var musical = {
	jazzy: 0.55,
	singing: 0.5,
	kitschy: 0.3,
	magical: 0.3,
	joyful: 0.3,
	soulful: 0.5,
	cinematic: 0.5,
	dance: 0.4,
	folk: 0.4,
	eclectic: 0.4,
	whimsical: 0.4,
	campy: 0.4,
	cultural: 0.4,
	trippy: 0.3,
	indie: 0.3,
	romantic: 0.3,
	delightful: 0.3,
	film: 0.3,
	creative: 0.3,
	funky: 0.3,
	rock: 0.3,
	classic: 0.3,
	quirky: 0.3,
	sensual: 0.3,
	artsy: 0.3,
	playful: 0.3,
	dreamy: 0.3,
	intimate: 0.3,
	raunchy: 0.3,
	adventurous: 0.3,
	glam: 0.3,
	minimalist: 0.3
};
var mystic = {
	magical: 0.5,
	folk: 0.4,
	dreamy: 0.4,
	sensual: 0.4,
	witchy: 0.4,
	trippy: 0.3,
	zen: 0.3,
	strange: 0.3,
	soulful: 0.3,
	romantic: 0.3,
	whimsical: 0.3,
	weird: 0.3,
	beautiful: 0.3,
	botanical: 0.3,
	inspired: 0.3,
	mermaid: 0.3,
	soothing: 0.3,
	authentic: 0.3,
	hippie: 0.3,
	restorative: 0.3,
	serene: 0.3
};
var natural = {
	botanical: 0.3,
	beautiful: 0.3,
	healthy: 0.3,
	gentle: 0.3,
	restorative: 0.3,
	unique: 0.3,
	serene: 0.3,
	spontaneous: 0.3,
	tropical: 0.3,
	vast: 0.3
};
var nerdy = {
	geeky: 0.8,
	bookish: 0.6,
	hipster: 0.5,
	cute: 0.55,
	funny: 0.4,
	artsy: 0.4,
	campy: 0.4,
	hippie: 0.4,
	cool: 0.4,
	dreamy: 0.4,
	funky: 0.4,
	futuristic: 0.3,
	boho: 0.3,
	crazy: 0.3,
	boozy: 0.3,
	curious: 0.3,
	indie: 0.3,
	glam: 0.3,
	fancy: 0.3,
	conversational: 0.3,
	fun: 0.3,
	grimy: 0.3,
	quirky: 0.4,
	weird: 0.4,
	silly: 0.4,
	moody: 0.4,
	kitschy: 0.3,
	playful: 0.3,
	oldschool: 0.3,
	retro: 0.3,
	trippy: 0.3,
	witchy: 0.3,
	queer: 0.3,
	romantic: 0.3,
	whimsical: 0.3,
	raunchy: 0.3,
	sweet: 0.3,
	trendy: 0.3,
	jazzy: 0.3,
	laugh: 0.3,
	subversive: 0.3,
	strange: 0.3,
	zen: 0.3
};
var neon = {
	kitschy: 0.4,
	grimy: 0.4,
	trippy: 0.4,
	colorful: 0.4,
	funky: 0.4,
	lit: 0.3,
	mermaid: 0.3,
	retro: 0.4,
	dark: 0.3,
	futuristic: 0.3,
	hipster: 0.3,
	glam: 0.3,
	whimsical: 0.3,
	airy: 0.3,
	artsy: 0.3,
	dreamy: 0.3,
	nightlife: 0.3,
	trendy: 0.3,
	decorative: 0.3,
	hippie: 0.3,
	campy: 0.3,
	luxe: 0.3,
	minimalist: 0.3,
	parisian: 0.3
};
var nightlife = {
	trendy: 0.4,
	boho: 0.4,
	luxe: 0.3,
	tourist: 0.4,
	hipster: 0.4,
	vibrant: 0.4,
	artsy: 0.4,
	vibe: 0.4,
	oasis: 0.3,
	upscale: 0.3,
	urban: 0.3,
	glam: 0.3,
	queer: 0.3,
	eclectic: 0.3,
	hidden_gem: 0.3,
	funky: 0.3,
	cultural: 0.3,
	brunch: 0.3,
	drinking: 0.3,
	neon: 0.3,
	drinks: 0.3,
	fashion: 0.3,
	posh: 0.3,
	biking: 0.3,
	boozy: 0.3,
	dance: 0.3,
	gay: 0.3,
	indie: 0.3,
	parisian: 0.3,
	raunchy: 0.3,
	relaxing: 0.3,
	romantic: 0.3,
	scenic: 0.3
};
var novel = {
	film: 0.3,
	cinematic: 0.3,
	experimental: 0.3
};
var oasis = {
	serene: 0.4,
	hidden_gem: 0.4,
	airy: 0.4,
	nightlife: 0.3,
	vibrant: 0.3,
	blissful: 0.3,
	upscale: 0.3,
	soothing: 0.3,
	zen: 0.3,
	artsy: 0.3,
	beautiful: 0.3,
	quiet: 0.3,
	relaxing: 0.3,
	garden: 0.3,
	scenic: 0.3,
	comfy: 0.3,
	refreshing: 0.3,
	vibe: 0.3,
	alternative: 0.3,
	eclectic: 0.3,
	luxe: 0.3
};
var old = {
	young: 0.4
};
var oldschool = {
	retro: 0.5,
	classic: 0.4,
	funky: 0.4,
	minimalist: 0.3,
	nerdy: 0.3,
	jazzy: 0.3,
	moody: 0.3,
	modern: 0.3,
	kitschy: 0.3,
	trippy: 0.4,
	geeky: 0.4,
	futuristic: 0.3,
	hifi: 0.3,
	indie: 0.3,
	cinematic: 0.3,
	cool: 0.3,
	hipster: 0.3,
	zen: 0.3,
	artsy: 0.3,
	vintage: 0.3,
	campy: 0.3,
	vibe: 0.3,
	diy: 0.3,
	refreshing: 0.3,
	weird: 0.3,
	soulful: 0.3,
	authentic: 0.3,
	boho: 0.3,
	casual: 0.3,
	cute: 0.3,
	eclectic: 0.3,
	grimy: 0.3,
	rock: 0.3
};
var open = {
	free: 0.3,
	crowded: 0.3
};
var outdoors = {
	biking: 0.4,
	garden: 0.3,
	relaxing: 0.3,
	love: 0.3,
	patio: 0.3,
	sunny: 0.3,
	fun: 0.3,
	hiking: 0.3,
	cold: 0.3,
	warm: 0.3,
	adventurous: 0.3,
	chill: 0.3,
	comfy: 0.3
};
var outrageous = {
	absurd: 0.7,
	crazy: 0.4,
	funny: 0.4,
	entertaining: 0.3,
	bold: 0.3,
	eclectic: 0.3,
	interesting: 0.3,
	campy: 0.3,
	weird: 0.4,
	raunchy: 0.4,
	strange: 0.3,
	ugly: 0.3,
	subversive: 0.3,
	unexpected: 0.3,
	whimsical: 0.3
};
var participatory = {
	inclusive: 0.4,
	social: 0.4,
	experiential: 0.4,
	holistic: 0.4,
	interactive: 0.3,
	intergenerational: 0.3,
	spontaneous: 0.3,
	vibrant: 0.3,
	peaceful: 0.3,
	community: 0.3,
	innovative: 0.3
};
var parisian = {
	boho: 0.4,
	glam: 0.3,
	hipster: 0.3,
	romantic: 0.3,
	luxe: 0.3,
	fancy: 0.3,
	artisanal: 0.3,
	artsy: 0.3,
	trendy: 0.3,
	posh: 0.3,
	vintage: 0.3,
	sensual: 0.3,
	neon: 0.3,
	nightlife: 0.3
};
var park = {
	garden: 0.4,
	aquatic: 0.3,
	scenic: 0.3,
	biking: 0.3,
	tourist: 0.3,
	patio: 0.3,
	walk: 0.3
};
var party = {
	social: 0.6
};
var passionate = {
	love: 0.5,
	energetic: 0.4,
	proud: 0.4,
	entertaining: 0.4,
	exciting: 0.4,
	happy: 0.3,
	lively: 0.3,
	curious: 0.3,
	joyful: 0.3,
	creative: 0.3,
	emotional: 0.3,
	vibrant: 0.3,
	adventurous: 0.3,
	beautiful: 0.3,
	diverse: 0.3,
	fierce: 0.3,
	dynamic: 0.3,
	fantastic: 0.3,
	inspired: 0.3,
	intense: 0.3,
	sensual: 0.3,
	soulful: 0.3,
	entrepreneurial: 0.3,
	loud: 0.3,
	playful: 0.3,
	young: 0.3,
	funny: 0.3,
	innovative: 0.3,
	authentic: 0.3,
	classy: 0.3,
	romantic: 0.3,
	crazy: 0.3
};
var patio = {
	garden: 0.5,
	brunch: 0.4,
	outdoors: 0.3,
	airy: 0.3,
	decorative: 0.3,
	comfy: 0.3,
	upscale: 0.3,
	cozy: 0.3,
	relaxing: 0.3,
	sunny: 0.3,
	intimate: 0.3,
	park: 0.3
};
var peaceful = {
	serene: 0.4,
	participatory: 0.3,
	quiet: 0.4,
	calm: 0.4,
	joyful: 0.4,
	gentle: 0.3,
	spontaneous: 0.3,
	safe: 0.3,
	sober: 0.3,
	sunny: 0.3,
	inclusive: 0.3,
	solidarity: 0.3,
	beautiful: 0.3
};
var perspective = {
	interesting: 0.3,
	holistic: 0.3,
	views: 0.3,
	unique: 0.3
};
var photo = {
	cute: 0.4
};
var playful = {
	whimsical: 0.6,
	cute: 0.5,
	joyful: 0.55,
	quirky: 0.5,
	sensual: 0.5,
	gentle: 0.55,
	jazzy: 0.55,
	funny: 0.5,
	moody: 0.5,
	delightful: 0.5,
	dreamy: 0.5,
	funky: 0.5,
	lively: 0.5,
	colorful: 0.4,
	campy: 0.4,
	energetic: 0.4,
	adventurous: 0.4,
	fun: 0.4,
	soulful: 0.4,
	kitschy: 0.4,
	conversational: 0.4,
	entertaining: 0.4,
	raunchy: 0.4,
	romantic: 0.4,
	elegant: 0.4,
	sweet: 0.4,
	silly: 0.4,
	trippy: 0.4,
	airy: 0.4,
	artsy: 0.4,
	classy: 0.4,
	laugh: 0.4,
	minimalist: 0.4,
	spontaneous: 0.4,
	celebratory: 0.3,
	weird: 0.3,
	beautiful: 0.3,
	casual: 0.3,
	creative: 0.3,
	nerdy: 0.3,
	serene: 0.3,
	bookish: 0.3,
	geeky: 0.3,
	refreshing: 0.3,
	soothing: 0.3,
	retro: 0.3,
	subversive: 0.3,
	cool: 0.3,
	curious: 0.3,
	eclectic: 0.3,
	flavorful: 0.3,
	boho: 0.3,
	intimate: 0.3,
	vibe: 0.3,
	warm: 0.3,
	bold: 0.3,
	friendly: 0.3,
	hearty: 0.3,
	musical: 0.3,
	passionate: 0.3,
	spicy: 0.3,
	wild: 0.3,
	zen: 0.3,
	classic: 0.3,
	strange: 0.3,
	tasty: 0.3,
	cinematic: 0.3,
	dynamic: 0.3,
	emotional: 0.3,
	glam: 0.3,
	love: 0.3,
	magical: 0.3,
	savory: 0.3,
	shimmy: 0.3,
	blissful: 0.3,
	dance: 0.3,
	loud: 0.3
};
var popular = {
	favorite: 0.4,
	colorful: 0.3,
	classic: 0.3,
	interesting: 0.3,
	friendly: 0.3,
	active: 0.3,
	entertaining: 0.3,
	inspired: 0.3,
	trendy: 0.4,
	quirky: 0.3,
	simple: 0.3,
	unique: 0.3
};
var popping = {
	buzzing: 0.5,
	weird: 0.3,
	lit: 0.3,
	crazy: 0.3,
	strange: 0.3,
	funky: 0.3
};
var popup = {
	walk: 0.3
};
var positive = {
	healthy: 0.3,
	happy: 0.3,
	interesting: 0.3,
	fantastic: 0.3,
	exciting: 0.3,
	active: 0.3,
	dramatic: 0.3
};
var posh = {
	upscale: 0.5,
	luxe: 0.5,
	parisian: 0.3,
	nightlife: 0.3,
	kitschy: 0.3,
	trendy: 0.5,
	fancy: 0.4,
	boho: 0.4,
	glam: 0.4,
	cozy: 0.4,
	elegant: 0.4,
	comfy: 0.4,
	boozy: 0.3,
	classy: 0.3,
	serene: 0.3,
	funky: 0.3,
	artsy: 0.3,
	beautiful: 0.3,
	grimy: 0.3,
	hipster: 0.3,
	cute: 0.3,
	eclectic: 0.3,
	airy: 0.3,
	romantic: 0.3
};
var proud = {
	happy: 0.6,
	fantastic: 0.4,
	exciting: 0.4,
	passionate: 0.4,
	beautiful: 0.3,
	mindful: 0.3,
	generous: 0.3,
	innovative: 0.3,
	joyful: 0.3
};
var queer = {
	gay: 0.7,
	transgender: 0.6,
	feminist: 0.5,
	hipster: 0.4,
	artsy: 0.4,
	boho: 0.4,
	cultural: 0.3,
	hippie: 0.3,
	indie: 0.3,
	nightlife: 0.3,
	nerdy: 0.3,
	vegan: 0.3,
	geeky: 0.3,
	raunchy: 0.3,
	subversive: 0.3,
	dance: 0.3,
	funky: 0.3,
	glam: 0.3,
	social: 0.3,
	urban: 0.3,
	weird: 0.3,
	activist: 0.3,
	campy: 0.3,
	folk: 0.3,
	trippy: 0.3
};
var quiet = {
	calm: 0.6,
	peaceful: 0.4,
	loud: 0.4,
	lively: 0.3,
	moody: 0.3,
	joyful: 0.3,
	oasis: 0.3,
	intimate: 0.3,
	serene: 0.55,
	gentle: 0.4,
	busy: 0.4,
	cool: 0.4,
	relaxing: 0.3,
	sunny: 0.3,
	buzzing: 0.3,
	classy: 0.3,
	friendly: 0.3,
	safe: 0.3,
	sober: 0.3,
	soothing: 0.3,
	warm: 0.3,
	dark: 0.3,
	blissful: 0.3,
	comfy: 0.3,
	cozy: 0.3,
	sweet: 0.3,
	elegant: 0.3,
	beautiful: 0.3,
	crowded: 0.3,
	happy: 0.3,
	intense: 0.3,
	small: 0.3,
	active: 0.3,
	bookish: 0.3,
	zen: 0.3
};
var quirky = {
	whimsical: 0.6,
	funky: 0.5,
	eclectic: 0.5,
	kitschy: 0.5,
	playful: 0.5,
	nerdy: 0.4,
	lively: 0.4,
	minimalist: 0.4,
	moody: 0.4,
	jazzy: 0.4,
	luxe: 0.3,
	magical: 0.3,
	joyful: 0.3,
	weird: 0.5,
	funny: 0.55,
	artsy: 0.5,
	cute: 0.5,
	colorful: 0.5,
	geeky: 0.5,
	strange: 0.5,
	delightful: 0.4,
	dreamy: 0.4,
	retro: 0.4,
	campy: 0.4,
	adventurous: 0.4,
	silly: 0.4,
	trippy: 0.4,
	curious: 0.4,
	trendy: 0.4,
	entertaining: 0.4,
	fun: 0.4,
	hipster: 0.4,
	interesting: 0.4,
	indie: 0.4,
	refreshing: 0.4,
	classic: 0.3,
	classy: 0.3,
	unique: 0.3,
	bookish: 0.3,
	elegant: 0.3,
	sweet: 0.3,
	boho: 0.3,
	conversational: 0.3,
	creative: 0.3,
	futuristic: 0.3,
	crazy: 0.3,
	romantic: 0.3,
	airy: 0.3,
	beautiful: 0.3,
	cool: 0.3,
	fancy: 0.3,
	folk: 0.3,
	hippie: 0.3,
	raunchy: 0.3,
	vibe: 0.3,
	vintage: 0.3,
	witchy: 0.3,
	casual: 0.3,
	musical: 0.3,
	soulful: 0.3,
	tasty: 0.3,
	cinematic: 0.3,
	comfy: 0.3,
	energetic: 0.3,
	experimental: 0.3,
	friendly: 0.3,
	popular: 0.3,
	subversive: 0.3,
	inspired: 0.3,
	savory: 0.3,
	zen: 0.3,
	boozy: 0.3,
	cozy: 0.3,
	favorite: 0.3,
	innovative: 0.3,
	modern: 0.3,
	decorative: 0.3,
	gentle: 0.3,
	laugh: 0.3,
	sensual: 0.3,
	unexpected: 0.3
};
var radical = {
	bold: 0.4,
	subversive: 0.4,
	dramatic: 0.4,
	feminist: 0.4,
	activist: 0.3,
	spontaneous: 0.3,
	hippie: 0.3
};
var raunchy = {
	campy: 0.5,
	funny: 0.4,
	playful: 0.4,
	sensual: 0.4,
	boozy: 0.4,
	kitschy: 0.4,
	funky: 0.4,
	glam: 0.4,
	cute: 0.4,
	outrageous: 0.4,
	romantic: 0.3,
	silly: 0.3,
	boho: 0.3,
	dance: 0.3,
	quirky: 0.3,
	retro: 0.3,
	spicy: 0.3,
	jazzy: 0.3,
	nerdy: 0.3,
	soulful: 0.3,
	artsy: 0.3,
	entertaining: 0.3,
	gay: 0.3,
	geeky: 0.3,
	intimate: 0.3,
	queer: 0.3,
	subversive: 0.3,
	colorful: 0.3,
	moody: 0.3,
	whimsical: 0.3,
	classy: 0.3,
	musical: 0.3,
	trippy: 0.3,
	adventurous: 0.3,
	nightlife: 0.3,
	wild: 0.3,
	weird: 0.3
};
var rebel = {
	subversive: 0.3,
	feminist: 0.3
};
var refreshing = {
	delightful: 0.5,
	interesting: 0.4,
	cool: 0.4,
	exciting: 0.4,
	funky: 0.4,
	entertaining: 0.4,
	funny: 0.4,
	fresh: 0.4,
	fun: 0.4,
	quirky: 0.4,
	beautiful: 0.3,
	classy: 0.3,
	fantastic: 0.3,
	flavorful: 0.3,
	curious: 0.3,
	dreamy: 0.3,
	lively: 0.3,
	playful: 0.3,
	blissful: 0.3,
	bold: 0.3,
	airy: 0.3,
	classic: 0.3,
	joyful: 0.3,
	adventurous: 0.3,
	dynamic: 0.3,
	inspired: 0.3,
	eclectic: 0.3,
	energetic: 0.3,
	jazzy: 0.3,
	casual: 0.3,
	dramatic: 0.3,
	elegant: 0.3,
	oldschool: 0.3,
	colorful: 0.3,
	creative: 0.3,
	happy: 0.3,
	hearty: 0.3,
	magical: 0.3,
	minimalist: 0.3,
	oasis: 0.3,
	authentic: 0.3,
	gentle: 0.3,
	sweet: 0.4,
	soothing: 0.4,
	tasty: 0.4,
	rejuvenating: 0.4,
	strange: 0.3,
	weird: 0.3,
	relaxing: 0.3,
	serene: 0.3,
	vibrant: 0.3,
	retro: 0.3,
	spicy: 0.3,
	unique: 0.3,
	vibe: 0.3,
	warm: 0.3,
	zen: 0.3,
	savory: 0.3,
	sunny: 0.3,
	sensual: 0.3,
	whimsical: 0.3,
	soulful: 0.3,
	trendy: 0.3,
	trippy: 0.3,
	silly: 0.3
};
var relaxing = {
	fun: 0.4,
	comfy: 0.4,
	blissful: 0.4,
	cozy: 0.4,
	outdoors: 0.3,
	quiet: 0.3,
	refreshing: 0.3,
	beautiful: 0.3,
	chill: 0.3,
	cool: 0.3,
	entertaining: 0.3,
	hiking: 0.3,
	brunch: 0.3,
	busy: 0.3,
	joyful: 0.3,
	oasis: 0.3,
	patio: 0.3,
	adventurous: 0.3,
	friendly: 0.3,
	gentle: 0.3,
	calm: 0.3,
	delightful: 0.3,
	dreamy: 0.3,
	festive: 0.3,
	happy: 0.3,
	intimate: 0.3,
	nightlife: 0.3,
	soothing: 0.5,
	serene: 0.4,
	rejuvenating: 0.4,
	sunny: 0.3,
	scenic: 0.3,
	warm: 0.3,
	restorative: 0.3,
	zen: 0.3,
	romantic: 0.3,
	tropical: 0.3
};
var rejuvenating = {
	relaxing: 0.4,
	restorative: 0.4,
	soothing: 0.4,
	refreshing: 0.4,
	vibrant: 0.3,
	fresh: 0.3,
	holistic: 0.3,
	magical: 0.3,
	serene: 0.3
};
var restorative = {
	rejuvenating: 0.4,
	soothing: 0.4,
	holistic: 0.3,
	natural: 0.3,
	botanical: 0.3,
	relaxing: 0.3,
	serene: 0.3,
	experiential: 0.3,
	gentle: 0.3,
	magical: 0.3,
	blissful: 0.3,
	sensual: 0.3,
	decorative: 0.3,
	mystic: 0.3,
	zen: 0.3
};
var reuse = {
	vintage: 0.6
};
var retro = {
	funky: 0.6,
	kitschy: 0.6,
	classic: 0.5,
	campy: 0.5,
	futuristic: 0.55,
	glam: 0.55,
	minimalist: 0.5,
	luxe: 0.5,
	oldschool: 0.5,
	boho: 0.5,
	jazzy: 0.5,
	artsy: 0.4,
	hipster: 0.4,
	cute: 0.4,
	quirky: 0.4,
	casual: 0.4,
	classy: 0.4,
	comfy: 0.4,
	hippie: 0.4,
	cool: 0.4,
	dreamy: 0.4,
	eclectic: 0.4,
	elegant: 0.4,
	geeky: 0.4,
	authentic: 0.4,
	neon: 0.4,
	fancy: 0.3,
	hifi: 0.3,
	hip: 0.3,
	modern: 0.3,
	airy: 0.3,
	nerdy: 0.3,
	cinematic: 0.3,
	grimy: 0.3,
	indie: 0.3,
	playful: 0.3,
	refreshing: 0.3,
	antique: 0.3,
	raunchy: 0.3,
	fashion: 0.3,
	fun: 0.3,
	adventurous: 0.3,
	diy: 0.3,
	inspired: 0.3,
	decorative: 0.3,
	colorful: 0.3,
	folk: 0.3,
	funny: 0.3,
	moody: 0.3,
	vintage: 0.6,
	trendy: 0.5,
	trippy: 0.5,
	vibe: 0.4,
	whimsical: 0.4,
	soulful: 0.3,
	weird: 0.3,
	sensual: 0.3,
	upscale: 0.3,
	tasty: 0.3,
	zen: 0.3,
	sweet: 0.3
};
var rock = {
	folk: 0.4,
	indie: 0.4,
	funky: 0.3,
	hipster: 0.3,
	hippie: 0.3,
	musical: 0.3,
	glam: 0.3,
	jazzy: 0.3,
	kitschy: 0.3,
	oldschool: 0.3,
	soulful: 0.3,
	trippy: 0.3,
	underground: 0.3
};
var romantic = {
	dreamy: 0.5,
	intimate: 0.5,
	love: 0.4,
	beautiful: 0.4,
	moody: 0.4,
	blissful: 0.4,
	playful: 0.4,
	adventurous: 0.4,
	delightful: 0.4,
	cinematic: 0.4,
	artsy: 0.3,
	boho: 0.3,
	jazzy: 0.3,
	raunchy: 0.3,
	elegant: 0.3,
	kitschy: 0.3,
	musical: 0.3,
	campy: 0.3,
	joyful: 0.3,
	boozy: 0.3,
	cute: 0.3,
	dating: 0.3,
	quirky: 0.3,
	bookish: 0.3,
	cozy: 0.3,
	glam: 0.3,
	nerdy: 0.3,
	parisian: 0.3,
	fancy: 0.3,
	emotional: 0.3,
	funny: 0.3,
	geeky: 0.3,
	luxe: 0.3,
	magical: 0.3,
	mystic: 0.3,
	casual: 0.3,
	classy: 0.3,
	feminist: 0.3,
	entertaining: 0.3,
	passionate: 0.3,
	classic: 0.3,
	film: 0.3,
	gentle: 0.3,
	nightlife: 0.3,
	posh: 0.3,
	sensual: 0.5,
	whimsical: 0.4,
	soulful: 0.4,
	sweet: 0.3,
	spicy: 0.3,
	savory: 0.3,
	spontaneous: 0.3,
	trippy: 0.3,
	serene: 0.3,
	scenic: 0.3,
	strange: 0.3,
	weird: 0.3,
	relaxing: 0.3,
	silly: 0.3,
	witchy: 0.3
};
var rugged = {
	comfy: 0.3,
	adventurous: 0.3,
	elegant: 0.3,
	fierce: 0.3,
	scenic: 0.3
};
var safe = {
	healthy: 0.4,
	calm: 0.3,
	quiet: 0.3,
	peaceful: 0.3,
	friendly: 0.3,
	happy: 0.3,
	alternative: 0.3,
	comfy: 0.3
};
var savory = {
	flavorful: 0.7,
	delightful: 0.4,
	hearty: 0.4,
	authentic: 0.3,
	brunch: 0.3,
	artisanal: 0.3,
	jazzy: 0.3,
	adventurous: 0.3,
	funky: 0.3,
	kitschy: 0.3,
	refreshing: 0.3,
	cinematic: 0.3,
	colorful: 0.3,
	dreamy: 0.3,
	luxe: 0.3,
	quirky: 0.3,
	eclectic: 0.3,
	elegant: 0.3,
	playful: 0.3,
	celebratory: 0.3,
	festive: 0.3,
	spicy: 0.7,
	tasty: 0.6,
	sweet: 0.5,
	sensual: 0.4,
	soulful: 0.3,
	romantic: 0.3,
	vegan: 0.3,
	whimsical: 0.3
};
var scenic = {
	beautiful: 0.5,
	hiking: 0.4,
	historic: 0.3,
	biking: 0.3,
	park: 0.3,
	delightful: 0.3,
	adventurous: 0.3,
	hidden_gem: 0.3,
	colorful: 0.3,
	kitschy: 0.3,
	oasis: 0.3,
	artsy: 0.3,
	elegant: 0.3,
	nightlife: 0.3,
	serene: 0.4,
	tourist: 0.3,
	relaxing: 0.3,
	rugged: 0.3,
	romantic: 0.3,
	sunny: 0.3,
	whimsical: 0.3
};
var serene = {
	beautiful: 0.5,
	dreamy: 0.55,
	quiet: 0.55,
	joyful: 0.5,
	oasis: 0.4,
	peaceful: 0.4,
	moody: 0.4,
	minimalist: 0.3,
	lively: 0.3,
	playful: 0.3,
	refreshing: 0.3,
	posh: 0.3,
	intimate: 0.3,
	luxe: 0.3,
	jazzy: 0.3,
	magical: 0.3,
	natural: 0.3,
	mystic: 0.3,
	soothing: 0.5,
	blissful: 0.5,
	zen: 0.5,
	airy: 0.5,
	relaxing: 0.4,
	calm: 0.4,
	elegant: 0.4,
	gentle: 0.4,
	sunny: 0.4,
	scenic: 0.4,
	delightful: 0.4,
	sensual: 0.4,
	vibrant: 0.4,
	comfy: 0.3,
	whimsical: 0.3,
	colorful: 0.3,
	soulful: 0.3,
	classy: 0.3,
	cozy: 0.3,
	funky: 0.3,
	grimy: 0.3,
	restorative: 0.3,
	romantic: 0.3,
	trippy: 0.3,
	upscale: 0.3,
	vibe: 0.3,
	eclectic: 0.3,
	strange: 0.3,
	sweet: 0.3,
	tropical: 0.3,
	warm: 0.3,
	adventurous: 0.3,
	energetic: 0.3,
	sober: 0.3,
	celebratory: 0.3,
	cool: 0.3,
	rejuvenating: 0.3
};
var sensual = {
	dreamy: 0.6,
	romantic: 0.5,
	soulful: 0.6,
	playful: 0.5,
	jazzy: 0.55,
	moody: 0.5,
	beautiful: 0.5,
	funky: 0.4,
	trippy: 0.4,
	elegant: 0.4,
	intimate: 0.4,
	minimalist: 0.4,
	joyful: 0.4,
	whimsical: 0.4,
	airy: 0.4,
	campy: 0.4,
	cinematic: 0.4,
	raunchy: 0.4,
	soothing: 0.4,
	delightful: 0.4,
	gentle: 0.4,
	luxe: 0.4,
	serene: 0.4,
	spicy: 0.4,
	flavorful: 0.4,
	kitschy: 0.4,
	artsy: 0.4,
	boho: 0.4,
	sweet: 0.4,
	mystic: 0.4,
	savory: 0.4,
	adventurous: 0.3,
	blissful: 0.3,
	glam: 0.3,
	classy: 0.3,
	energetic: 0.3,
	witchy: 0.3,
	dance: 0.3,
	vibe: 0.3,
	authentic: 0.3,
	creative: 0.3,
	feminist: 0.3,
	love: 0.3,
	retro: 0.3,
	spontaneous: 0.3,
	colorful: 0.3,
	conversational: 0.3,
	experiential: 0.3,
	musical: 0.3,
	passionate: 0.3,
	cute: 0.3,
	emotional: 0.3,
	funny: 0.3,
	lively: 0.3,
	vibrant: 0.3,
	art: 0.3,
	eclectic: 0.3,
	refreshing: 0.3,
	casual: 0.3,
	parisian: 0.3,
	restorative: 0.3,
	subversive: 0.3,
	tasty: 0.3,
	tropical: 0.3,
	zen: 0.3,
	fashion: 0.3,
	futuristic: 0.3,
	quirky: 0.3
};
var shimmy = {
	dance: 0.4,
	funky: 0.3,
	jazzy: 0.3,
	laugh: 0.3,
	playful: 0.3,
	cute: 0.3,
	mermaid: 0.3,
	singing: 0.3
};
var silly = {
	absurd: 0.6,
	funny: 0.6,
	crazy: 0.6,
	cute: 0.5,
	outrageous: 0.5,
	fun: 0.5,
	laugh: 0.4,
	campy: 0.4,
	kitschy: 0.4,
	nerdy: 0.4,
	quirky: 0.4,
	fancy: 0.4,
	geeky: 0.4,
	interesting: 0.4,
	playful: 0.4,
	entertaining: 0.4,
	delightful: 0.3,
	raunchy: 0.3,
	classy: 0.3,
	cool: 0.3,
	curious: 0.3,
	funky: 0.3,
	messy: 0.3,
	cheap: 0.3,
	dreamy: 0.3,
	artsy: 0.3,
	fantastic: 0.3,
	magical: 0.3,
	boozy: 0.3,
	colorful: 0.3,
	happy: 0.3,
	love: 0.3,
	big: 0.3,
	refreshing: 0.3,
	weird: 0.6,
	strange: 0.4,
	whimsical: 0.4,
	ugly: 0.4,
	simple: 0.3,
	trippy: 0.3,
	sweet: 0.3,
	romantic: 0.3,
	wild: 0.3
};
var simple = {
	elegant: 0.4,
	silly: 0.3,
	minimalist: 0.3,
	cheap: 0.3,
	conversational: 0.3,
	cute: 0.3,
	delightful: 0.3,
	absurd: 0.3,
	fancy: 0.3,
	casual: 0.3,
	funny: 0.3,
	interesting: 0.3,
	tasty: 0.3,
	messy: 0.3,
	spontaneous: 0.3,
	whimsical: 0.3,
	popular: 0.3,
	small: 0.3,
	sweet: 0.3
};
var singing = {
	musical: 0.5,
	jazzy: 0.4,
	joyful: 0.4,
	laugh: 0.3,
	shimmy: 0.3,
	loud: 0.3,
	love: 0.3,
	soulful: 0.5,
	dance: 0.5,
	folk: 0.4,
	campy: 0.3
};
var small = {
	big: 0.5,
	entrepreneurial: 0.3,
	quiet: 0.3,
	vast: 0.3,
	simple: 0.3,
	upscale: 0.3
};
var social = {
	cultural: 0.5,
	intergenerational: 0.4,
	participatory: 0.4,
	civic: 0.4,
	educational: 0.3,
	community: 0.3,
	feminist: 0.3,
	emotional: 0.3,
	holistic: 0.3,
	experiential: 0.3,
	"public": 0.3,
	queer: 0.3,
	local: 0.3,
	urban: 0.3
};
var sober = {
	drinking: 0.4,
	boozy: 0.3,
	calm: 0.3,
	quiet: 0.3,
	peaceful: 0.3,
	joyful: 0.3,
	moody: 0.3,
	serene: 0.3,
	dark: 0.3,
	safe: 0.3
};
var solidarity = {
	kindness: 0.4,
	peaceful: 0.3
};
var soothing = {
	serene: 0.5,
	dreamy: 0.5,
	gentle: 0.5,
	relaxing: 0.5,
	blissful: 0.4,
	airy: 0.4,
	calm: 0.4,
	rejuvenating: 0.4,
	sensual: 0.4,
	jazzy: 0.4,
	refreshing: 0.4,
	moody: 0.4,
	restorative: 0.4,
	joyful: 0.4,
	soulful: 0.4,
	warm: 0.4,
	sweet: 0.3,
	trippy: 0.3,
	delightful: 0.3,
	playful: 0.3,
	zen: 0.3,
	cool: 0.3,
	quiet: 0.3,
	whimsical: 0.3,
	beautiful: 0.3,
	funky: 0.3,
	minimalist: 0.3,
	oasis: 0.3,
	fresh: 0.3,
	chill: 0.3,
	comfy: 0.3,
	elegant: 0.3,
	colorful: 0.3,
	flavorful: 0.3,
	loud: 0.3,
	magical: 0.3,
	drip: 0.3,
	holistic: 0.3,
	mystic: 0.3,
	cozy: 0.3,
	spicy: 0.3
};
var soulful = {
	jazzy: 0.7,
	sensual: 0.6,
	funky: 0.5,
	dreamy: 0.5,
	singing: 0.5,
	musical: 0.5,
	moody: 0.5,
	joyful: 0.4,
	playful: 0.4,
	minimalist: 0.4,
	intimate: 0.3,
	kitschy: 0.3,
	lively: 0.3,
	mystic: 0.3,
	passionate: 0.3,
	quirky: 0.3,
	raunchy: 0.3,
	luxe: 0.3,
	love: 0.3,
	oldschool: 0.3,
	refreshing: 0.3,
	folk: 0.4,
	sweet: 0.4,
	vibe: 0.4,
	gentle: 0.4,
	boho: 0.4,
	eclectic: 0.4,
	energetic: 0.4,
	romantic: 0.4,
	beautiful: 0.4,
	delightful: 0.4,
	elegant: 0.4,
	flavorful: 0.4,
	soothing: 0.4,
	airy: 0.3,
	campy: 0.3,
	cinematic: 0.3,
	glam: 0.3,
	rock: 0.3,
	spicy: 0.3,
	retro: 0.3,
	whimsical: 0.3,
	dance: 0.3,
	classy: 0.3,
	indie: 0.3,
	savory: 0.3,
	serene: 0.3,
	authentic: 0.3,
	blissful: 0.3,
	adventurous: 0.3,
	emotional: 0.3,
	grimy: 0.3,
	hipster: 0.3,
	hippie: 0.3,
	tasty: 0.3,
	classic: 0.3,
	funny: 0.3,
	artsy: 0.3,
	hearty: 0.3,
	witchy: 0.3,
	conversational: 0.3,
	vibrant: 0.3
};
var special = {
	exclusive: 0.3,
	magical: 0.3,
	"new": 0.3,
	unique: 0.4
};
var spicy = {
	savory: 0.7,
	flavorful: 0.6,
	tasty: 0.6,
	sweet: 0.5,
	hearty: 0.4,
	sensual: 0.4,
	funky: 0.4,
	soulful: 0.3,
	authentic: 0.3,
	delightful: 0.3,
	refreshing: 0.3,
	romantic: 0.3,
	raunchy: 0.3,
	adventurous: 0.3,
	jazzy: 0.3,
	airy: 0.3,
	cute: 0.3,
	kitschy: 0.3,
	playful: 0.3,
	brunch: 0.3,
	campy: 0.3,
	colorful: 0.3,
	funny: 0.3,
	vegan: 0.3,
	boho: 0.3,
	drinks: 0.3,
	fresh: 0.3,
	lively: 0.3,
	warm: 0.3,
	cool: 0.3,
	luxe: 0.3,
	moody: 0.3,
	soothing: 0.3
};
var spontaneous = {
	joyful: 0.4,
	playful: 0.4,
	celebratory: 0.3,
	conversational: 0.3,
	energetic: 0.3,
	peaceful: 0.3,
	romantic: 0.3,
	sensual: 0.3,
	participatory: 0.3,
	simple: 0.3,
	intimate: 0.3,
	lively: 0.3,
	radical: 0.3,
	natural: 0.3,
	unexpected: 0.3,
	blissful: 0.3,
	casual: 0.3,
	dramatic: 0.3,
	inspired: 0.3,
	whimsical: 0.3,
	subversive: 0.3
};
var strange = {
	curious: 0.6,
	interesting: 0.5,
	crazy: 0.5,
	funny: 0.5,
	magical: 0.5,
	absurd: 0.5,
	quirky: 0.5,
	cute: 0.3,
	delightful: 0.3,
	dreamy: 0.3,
	outrageous: 0.3,
	refreshing: 0.3,
	beautiful: 0.3,
	dark: 0.3,
	mystic: 0.3,
	futuristic: 0.3,
	blissful: 0.3,
	fantastic: 0.3,
	joyful: 0.3,
	messy: 0.3,
	funky: 0.3,
	dramatic: 0.3,
	exciting: 0.3,
	moody: 0.3,
	colorful: 0.3,
	cool: 0.3,
	happy: 0.3,
	love: 0.3,
	playful: 0.3,
	popping: 0.3,
	eclectic: 0.3,
	fun: 0.3,
	nerdy: 0.3,
	weird: 0.8,
	silly: 0.4,
	ugly: 0.4,
	unexpected: 0.4,
	whimsical: 0.4,
	trippy: 0.3,
	sweet: 0.3,
	serene: 0.3,
	witchy: 0.3,
	romantic: 0.3,
	unique: 0.3,
	zen: 0.3
};
var subversive = {
	radical: 0.4,
	campy: 0.3,
	absurd: 0.3,
	playful: 0.3,
	feminist: 0.3,
	funny: 0.3,
	kitschy: 0.3,
	outrageous: 0.3,
	queer: 0.3,
	quirky: 0.3,
	raunchy: 0.3,
	nerdy: 0.3,
	rebel: 0.3,
	trippy: 0.3,
	creative: 0.3,
	whimsical: 0.3,
	eclectic: 0.3,
	sensual: 0.3,
	weird: 0.3,
	cinematic: 0.3,
	spontaneous: 0.3
};
var sunny = {
	serene: 0.4,
	warm: 0.5,
	beautiful: 0.4,
	cool: 0.4,
	cold: 0.4,
	chill: 0.4,
	tropical: 0.4,
	blissful: 0.3,
	afternoon: 0.3,
	outdoors: 0.3,
	relaxing: 0.3,
	airy: 0.3,
	quiet: 0.3,
	dreamy: 0.3,
	delightful: 0.3,
	comfy: 0.3,
	joyful: 0.3,
	refreshing: 0.3,
	scenic: 0.3,
	colorful: 0.3,
	dark: 0.3,
	peaceful: 0.3,
	sweet: 0.3,
	patio: 0.3,
	calm: 0.3,
	cozy: 0.3,
	fun: 0.3,
	hearty: 0.3,
	morning: 0.3
};
var sweet = {
	savory: 0.5,
	tasty: 0.5,
	spicy: 0.5,
	delightful: 0.5,
	cute: 0.5,
	dreamy: 0.4,
	beautiful: 0.4,
	flavorful: 0.4,
	refreshing: 0.4,
	soulful: 0.4,
	funny: 0.4,
	gentle: 0.4,
	playful: 0.4,
	blissful: 0.4,
	classy: 0.4,
	cool: 0.4,
	hearty: 0.4,
	sensual: 0.4,
	joyful: 0.4,
	funky: 0.3,
	soothing: 0.3,
	love: 0.3,
	magical: 0.3,
	quirky: 0.3,
	whimsical: 0.3,
	weird: 0.3,
	romantic: 0.3,
	airy: 0.3,
	elegant: 0.3,
	geeky: 0.3,
	happy: 0.3,
	jazzy: 0.3,
	moody: 0.3,
	strange: 0.3,
	comfy: 0.3,
	nerdy: 0.3,
	fun: 0.3,
	quiet: 0.3,
	serene: 0.3,
	silly: 0.3,
	sunny: 0.3,
	warm: 0.3,
	witchy: 0.3,
	fantastic: 0.3,
	kitschy: 0.3,
	simple: 0.3,
	campy: 0.3,
	cozy: 0.3,
	crazy: 0.3,
	generous: 0.3,
	retro: 0.3
};
var tasty = {
	flavorful: 0.7,
	savory: 0.6,
	spicy: 0.6,
	hearty: 0.5,
	sweet: 0.5,
	delightful: 0.55,
	brunch: 0.4,
	entertaining: 0.4,
	funky: 0.4,
	authentic: 0.4,
	fun: 0.4,
	refreshing: 0.4,
	adventurous: 0.4,
	lively: 0.4,
	cute: 0.3,
	interesting: 0.3,
	elegant: 0.3,
	exciting: 0.3,
	beautiful: 0.3,
	eclectic: 0.3,
	fresh: 0.3,
	healthy: 0.3,
	classy: 0.3,
	fantastic: 0.3,
	hidden_gem: 0.3,
	funny: 0.3,
	simple: 0.3,
	cheap: 0.3,
	colorful: 0.3,
	comfy: 0.3,
	fancy: 0.3,
	airy: 0.3,
	drinks: 0.3,
	festive: 0.3,
	generous: 0.3,
	artisanal: 0.3,
	celebratory: 0.3,
	classic: 0.3,
	campy: 0.3,
	cool: 0.3,
	friendly: 0.3,
	vegan: 0.4,
	kitschy: 0.3,
	quirky: 0.3,
	soulful: 0.3,
	trendy: 0.3,
	whimsical: 0.3,
	joyful: 0.3,
	playful: 0.3,
	retro: 0.3,
	sensual: 0.3,
	jazzy: 0.3,
	luxe: 0.3,
	warm: 0.3
};
var together = {
	diverse: 0.3
};
var tourist = {
	nightlife: 0.4,
	scenic: 0.3,
	cultural: 0.3,
	park: 0.3,
	transit: 0.3
};
var tropical = {
	sunny: 0.4,
	botanical: 0.4,
	aquatic: 0.3,
	warm: 0.3,
	cool: 0.3,
	beautiful: 0.3,
	serene: 0.3,
	blissful: 0.3,
	colorful: 0.3,
	natural: 0.3,
	relaxing: 0.3,
	sensual: 0.3,
	wild: 0.3,
	garden: 0.3
};
var transgender = {
	gay: 0.7,
	queer: 0.6,
	feminist: 0.3
};
var transit = {
	biking: 0.3,
	tourist: 0.3,
	urban: 0.3
};
var trendy = {
	boho: 0.6,
	hipster: 0.5,
	luxe: 0.5,
	artsy: 0.5,
	funky: 0.5,
	posh: 0.5,
	retro: 0.5,
	upscale: 0.5,
	glam: 0.5,
	fashion: 0.4,
	kitschy: 0.4,
	nightlife: 0.4,
	cute: 0.4,
	fancy: 0.4,
	casual: 0.4,
	comfy: 0.4,
	classy: 0.4,
	eclectic: 0.4,
	elegant: 0.4,
	quirky: 0.4,
	vegan: 0.4,
	hip: 0.4,
	minimalist: 0.4,
	popular: 0.4,
	geeky: 0.3,
	hippie: 0.3,
	cool: 0.3,
	vibe: 0.3,
	cheap: 0.3,
	indie: 0.3,
	tasty: 0.3,
	artisanal: 0.3,
	colorful: 0.3,
	modern: 0.3,
	nerdy: 0.3,
	parisian: 0.3,
	airy: 0.3,
	brunch: 0.3,
	futuristic: 0.3,
	hidden_gem: 0.3,
	neon: 0.3,
	vintage: 0.3,
	beautiful: 0.3,
	classic: 0.3,
	cozy: 0.3,
	refreshing: 0.3,
	adventurous: 0.3,
	crowded: 0.3,
	jazzy: 0.3,
	urban: 0.3,
	vibrant: 0.3,
	whimsical: 0.3
};
var trending = {
	trendy: 0.6
};
var trippy = {
	dreamy: 0.6,
	funky: 0.6,
	jazzy: 0.5,
	moody: 0.55,
	cinematic: 0.5,
	kitschy: 0.5,
	minimalist: 0.5,
	futuristic: 0.5,
	campy: 0.5,
	artsy: 0.4,
	hippie: 0.4,
	indie: 0.4,
	oldschool: 0.4,
	quirky: 0.4,
	blissful: 0.4,
	eclectic: 0.4,
	neon: 0.4,
	playful: 0.4,
	grimy: 0.4,
	delightful: 0.4,
	hipster: 0.4,
	airy: 0.3,
	colorful: 0.3,
	crazy: 0.3,
	geeky: 0.3,
	glam: 0.3,
	musical: 0.3,
	boho: 0.3,
	funny: 0.3,
	mystic: 0.3,
	magical: 0.3,
	nerdy: 0.3,
	classic: 0.3,
	cute: 0.3,
	experimental: 0.3,
	joyful: 0.3,
	beautiful: 0.3,
	cool: 0.3,
	dark: 0.3,
	folk: 0.3,
	fun: 0.3,
	adventurous: 0.3,
	luxe: 0.3,
	hifi: 0.3,
	raunchy: 0.3,
	refreshing: 0.3,
	absurd: 0.3,
	interesting: 0.3,
	queer: 0.3,
	whimsical: 0.55,
	weird: 0.5,
	retro: 0.5,
	soulful: 0.5,
	sensual: 0.4,
	vibe: 0.4,
	strange: 0.3,
	soothing: 0.3,
	zen: 0.3,
	rock: 0.3,
	romantic: 0.3,
	subversive: 0.3,
	serene: 0.3,
	silly: 0.3,
	witchy: 0.3
};
var vegan = {
	hippie: 0.4,
	tasty: 0.4,
	trendy: 0.4,
	hipster: 0.3,
	flavorful: 0.3,
	artisanal: 0.3,
	boho: 0.3,
	artsy: 0.3,
	brunch: 0.3,
	feminist: 0.3,
	queer: 0.3,
	savory: 0.3,
	funky: 0.3,
	spicy: 0.3,
	eclectic: 0.3,
	luxe: 0.3
};
var views = {
	perspective: 0.3,
	holistic: 0.3
};
var urban = {
	nightlife: 0.3,
	modern: 0.3,
	social: 0.3,
	queer: 0.3,
	transit: 0.3,
	upscale: 0.3,
	cultural: 0.3,
	artsy: 0.3,
	boho: 0.3,
	hipster: 0.3,
	futuristic: 0.3,
	civic: 0.3,
	grimy: 0.3,
	hippie: 0.3,
	vibrant: 0.3,
	aquatic: 0.3,
	trendy: 0.3,
	underground: 0.3
};
var ugly = {
	messy: 0.5,
	silly: 0.4,
	weird: 0.4,
	strange: 0.4,
	funny: 0.3,
	absurd: 0.3,
	cute: 0.3,
	outrageous: 0.3,
	interesting: 0.3,
	crazy: 0.3,
	beautiful: 0.3,
	colorful: 0.3
};
var underground = {
	rock: 0.3,
	grimy: 0.3,
	indie: 0.3,
	urban: 0.3
};
var unexpected = {
	dramatic: 0.4,
	strange: 0.4,
	emotional: 0.3,
	interesting: 0.3,
	outrageous: 0.3,
	spontaneous: 0.3,
	curious: 0.3,
	magical: 0.3,
	quirky: 0.3
};
var unique = {
	innovative: 0.5,
	diverse: 0.5,
	dynamic: 0.4,
	exciting: 0.4,
	experiential: 0.4,
	fantastic: 0.4,
	authentic: 0.4,
	interesting: 0.4,
	holistic: 0.4,
	interactive: 0.4,
	"new": 0.4,
	special: 0.4,
	eclectic: 0.3,
	exclusive: 0.3,
	magical: 0.3,
	quirky: 0.3,
	beautiful: 0.3,
	refreshing: 0.3,
	creative: 0.3,
	modern: 0.3,
	intimate: 0.3,
	natural: 0.3,
	colorful: 0.3,
	delightful: 0.3,
	elegant: 0.3,
	futuristic: 0.3,
	classic: 0.3,
	historic: 0.3,
	perspective: 0.3,
	entrepreneurial: 0.3,
	popular: 0.3
};
var upscale = {
	posh: 0.5,
	luxe: 0.5,
	trendy: 0.5,
	elegant: 0.4,
	artsy: 0.4,
	eclectic: 0.4,
	casual: 0.4,
	boho: 0.3,
	urban: 0.3,
	funky: 0.3,
	nightlife: 0.3,
	classy: 0.3,
	oasis: 0.3,
	airy: 0.3,
	hipster: 0.3,
	kitschy: 0.3,
	authentic: 0.3,
	patio: 0.3,
	serene: 0.3,
	retro: 0.3,
	crowded: 0.3,
	artisanal: 0.3,
	fancy: 0.3,
	brunch: 0.3,
	cozy: 0.3,
	intimate: 0.3
};
var vast = {
	small: 0.3,
	diverse: 0.3,
	big: 0.3,
	natural: 0.3
};
var vibe = {
	funky: 0.5,
	retro: 0.4,
	boho: 0.4,
	jazzy: 0.4,
	artsy: 0.4,
	glam: 0.4,
	hipster: 0.4,
	soulful: 0.4,
	dreamy: 0.4,
	eclectic: 0.4,
	trippy: 0.4,
	campy: 0.4,
	hippie: 0.4,
	moody: 0.4,
	nightlife: 0.4,
	airy: 0.4,
	fun: 0.3,
	cool: 0.3,
	kitschy: 0.3,
	minimalist: 0.3,
	chill: 0.3,
	classy: 0.3,
	sensual: 0.3,
	indie: 0.3,
	comfy: 0.3,
	buzzing: 0.3,
	grimy: 0.3,
	beautiful: 0.3,
	energetic: 0.3,
	authentic: 0.3,
	casual: 0.3,
	folk: 0.3,
	funny: 0.3,
	weird: 0.3,
	luxe: 0.3,
	trendy: 0.3,
	quirky: 0.3,
	playful: 0.3,
	refreshing: 0.3,
	serene: 0.3,
	vibrant: 0.3,
	zen: 0.3,
	oldschool: 0.3,
	joyful: 0.3,
	love: 0.3,
	oasis: 0.3,
	vintage: 0.3,
	warm: 0.3,
	tasty: 0.3
};
var vibrant = {
	lively: 0.5,
	dynamic: 0.5,
	beautiful: 0.5,
	diverse: 0.4,
	energetic: 0.4,
	colorful: 0.4,
	nightlife: 0.4,
	exciting: 0.4,
	serene: 0.4,
	funky: 0.3,
	oasis: 0.3,
	eclectic: 0.3,
	joyful: 0.3,
	airy: 0.3,
	creative: 0.3,
	passionate: 0.3,
	refreshing: 0.3,
	entrepreneurial: 0.3,
	healthy: 0.3,
	innovative: 0.3,
	elegant: 0.3,
	rejuvenating: 0.3,
	community: 0.3,
	delightful: 0.3,
	fantastic: 0.3,
	flavorful: 0.3,
	friendly: 0.3,
	inclusive: 0.3,
	unique: 0.3,
	vibe: 0.3,
	artsy: 0.3,
	cultural: 0.3,
	sensual: 0.3,
	bold: 0.3,
	participatory: 0.3,
	adventurous: 0.3,
	authentic: 0.3,
	boho: 0.3,
	modern: 0.3,
	urban: 0.3,
	art: 0.3,
	soulful: 0.3,
	trendy: 0.3
};
var vintage = {
	antique: 0.6,
	retro: 0.6,
	classic: 0.55,
	funky: 0.4,
	classy: 0.4,
	eclectic: 0.4,
	kitschy: 0.4,
	luxe: 0.4,
	authentic: 0.3,
	elegant: 0.3,
	historic: 0.3,
	artisanal: 0.3,
	quirky: 0.3,
	art: 0.3,
	boho: 0.3,
	fancy: 0.3,
	oldschool: 0.3,
	artsy: 0.3,
	trendy: 0.3,
	campy: 0.3,
	fashion: 0.3,
	futuristic: 0.3,
	glam: 0.3,
	inspired: 0.3,
	beautiful: 0.3,
	colorful: 0.3,
	hipster: 0.3,
	hippie: 0.3,
	vibe: 0.3,
	whimsical: 0.3,
	jazzy: 0.3,
	parisian: 0.3,
	minimalist: 0.3,
	modern: 0.3
};
var volunteer = {
	community: 0.4,
	civic: 0.3,
	local: 0.3,
	kindness: 0.3,
	active: 0.3
};
var walk = {
	biking: 0.3,
	mingle: 0.3,
	laugh: 0.3,
	park: 0.3
};
var warm = {
	cold: 0.6,
	chill: 0.5,
	sunny: 0.5,
	cool: 0.5,
	cozy: 0.4,
	hearty: 0.4,
	comfy: 0.4,
	friendly: 0.4,
	airy: 0.4,
	soothing: 0.4,
	gentle: 0.3,
	relaxing: 0.3,
	lively: 0.3,
	quiet: 0.3,
	tropical: 0.3,
	calm: 0.3,
	outdoors: 0.3,
	playful: 0.3,
	refreshing: 0.3,
	beautiful: 0.3,
	fresh: 0.3,
	healthy: 0.3,
	lit: 0.3,
	dark: 0.3,
	serene: 0.3,
	sweet: 0.3,
	colorful: 0.3,
	generous: 0.3,
	spicy: 0.3,
	celebratory: 0.3,
	joyful: 0.3,
	tasty: 0.3,
	vibe: 0.3
};
var weekend = {
	afternoon: 0.55,
	morning: 0.5,
	festive: 0.3
};
var whimsical = {
	playful: 0.6,
	quirky: 0.6,
	kitschy: 0.6,
	colorful: 0.6,
	dreamy: 0.5,
	funky: 0.55,
	trippy: 0.55,
	delightful: 0.5,
	cute: 0.5,
	artsy: 0.5,
	decorative: 0.5,
	eclectic: 0.5,
	minimalist: 0.5,
	jazzy: 0.5,
	campy: 0.4,
	funny: 0.4,
	silly: 0.4,
	airy: 0.4,
	sensual: 0.4,
	joyful: 0.4,
	retro: 0.4,
	elegant: 0.4,
	moody: 0.4,
	magical: 0.4,
	romantic: 0.4,
	musical: 0.4,
	sweet: 0.3,
	lively: 0.3,
	mermaid: 0.3,
	luxe: 0.3,
	nerdy: 0.3,
	neon: 0.3,
	mystic: 0.3,
	raunchy: 0.3,
	refreshing: 0.3,
	outrageous: 0.3,
	weird: 0.4,
	beautiful: 0.4,
	adventurous: 0.4,
	absurd: 0.4,
	futuristic: 0.4,
	strange: 0.4,
	entertaining: 0.3,
	serene: 0.3,
	fun: 0.3,
	soulful: 0.3,
	bold: 0.3,
	cinematic: 0.3,
	classic: 0.3,
	creative: 0.3,
	inspired: 0.3,
	soothing: 0.3,
	antique: 0.3,
	gentle: 0.3,
	art: 0.3,
	fancy: 0.3,
	subversive: 0.3,
	tasty: 0.3,
	vintage: 0.3,
	witchy: 0.3,
	boho: 0.3,
	flavorful: 0.3,
	folk: 0.3,
	geeky: 0.3,
	savory: 0.3,
	authentic: 0.3,
	blissful: 0.3,
	bookish: 0.3,
	botanical: 0.3,
	curious: 0.3,
	simple: 0.3,
	unique: 0.3,
	zen: 0.3,
	casual: 0.3,
	experimental: 0.3,
	hippie: 0.3,
	interesting: 0.3,
	spontaneous: 0.3,
	classy: 0.3,
	conversational: 0.3,
	comfy: 0.3,
	craft: 0.3,
	hipster: 0.3,
	scenic: 0.3,
	trendy: 0.3
};
var witchy = {
	campy: 0.4,
	dreamy: 0.4,
	mystic: 0.4,
	boho: 0.3,
	magical: 0.3,
	funky: 0.3,
	sensual: 0.3,
	delightful: 0.3,
	moody: 0.3,
	nerdy: 0.3,
	artsy: 0.3,
	quirky: 0.3,
	cute: 0.3,
	hipster: 0.3,
	jazzy: 0.3,
	mermaid: 0.3,
	trippy: 0.3,
	whimsical: 0.3,
	geeky: 0.3,
	strange: 0.3,
	sweet: 0.3,
	eclectic: 0.3,
	funny: 0.3,
	romantic: 0.3,
	soulful: 0.3,
	beautiful: 0.3,
	glam: 0.3,
	hippie: 0.3,
	luxe: 0.3,
	weird: 0.3
};
var wild = {
	crazy: 0.4,
	magical: 0.3,
	adventurous: 0.3,
	playful: 0.3,
	tropical: 0.3,
	colorful: 0.3,
	silly: 0.3,
	weird: 0.3,
	raunchy: 0.3
};
var weird = {
	strange: 0.8,
	crazy: 0.7,
	funny: 0.6,
	silly: 0.6,
	quirky: 0.5,
	cute: 0.55,
	interesting: 0.5,
	absurd: 0.5,
	trippy: 0.5,
	curious: 0.5,
	fun: 0.4,
	funky: 0.4,
	cool: 0.4,
	geeky: 0.4,
	magical: 0.4,
	nerdy: 0.4,
	dreamy: 0.4,
	fantastic: 0.4,
	whimsical: 0.4,
	beautiful: 0.4,
	outrageous: 0.4,
	ugly: 0.4,
	artsy: 0.4,
	kitschy: 0.4,
	laugh: 0.4,
	love: 0.4,
	campy: 0.3,
	playful: 0.3,
	popping: 0.3,
	delightful: 0.3,
	futuristic: 0.3,
	moody: 0.3,
	refreshing: 0.3,
	sweet: 0.3,
	witchy: 0.3,
	exciting: 0.3,
	messy: 0.3,
	retro: 0.3,
	vibe: 0.3,
	dark: 0.3,
	eclectic: 0.3,
	fancy: 0.3,
	happy: 0.3,
	romantic: 0.3,
	subversive: 0.3,
	zen: 0.3,
	blissful: 0.3,
	hipster: 0.3,
	hippie: 0.3,
	comfy: 0.3,
	wild: 0.3,
	grimy: 0.3,
	joyful: 0.3,
	mystic: 0.3,
	oldschool: 0.3,
	hifi: 0.3,
	jazzy: 0.3,
	kink: 0.3,
	queer: 0.3,
	boho: 0.3,
	buzzing: 0.3,
	classic: 0.3,
	classy: 0.3,
	colorful: 0.3,
	inspired: 0.3,
	raunchy: 0.3,
	special: 0.3
};
var young = {
	old: 0.4,
	children: 0.4,
	energetic: 0.3,
	passionate: 0.3,
	beautiful: 0.3,
	adventurous: 0.3,
	bookish: 0.3,
	cute: 0.3,
	healthy: 0.3,
	sunny: 0.3
};
var zen = {
	serene: 0.5,
	blissful: 0.4,
	minimalist: 0.4,
	dreamy: 0.4,
	funky: 0.3,
	mystic: 0.3,
	trippy: 0.3,
	cool: 0.3,
	hippie: 0.3,
	soothing: 0.3,
	luxe: 0.3,
	artsy: 0.3,
	hipster: 0.3,
	oasis: 0.3,
	oldschool: 0.3,
	weird: 0.3,
	refreshing: 0.3,
	vibe: 0.3,
	conversational: 0.3,
	kitschy: 0.3,
	playful: 0.3,
	relaxing: 0.3,
	quirky: 0.3,
	whimsical: 0.3,
	comfy: 0.3,
	cute: 0.3,
	geeky: 0.3,
	gentle: 0.3,
	moody: 0.3,
	retro: 0.3,
	sensual: 0.3,
	airy: 0.3,
	beautiful: 0.3,
	boho: 0.3,
	curious: 0.3,
	nerdy: 0.3,
	quiet: 0.3,
	restorative: 0.3,
	strange: 0.3
};
var vibes_matrix = {
	absurd: absurd,
	adventurous: adventurous,
	active: active,
	activist: activist,
	afternoon: afternoon,
	airy: airy,
	alternative: alternative,
	analog: analog,
	antique: antique,
	art: art,
	artsy: artsy,
	artisanal: artisanal,
	authentic: authentic,
	aquatic: aquatic,
	beautiful: beautiful,
	belonging: belonging,
	big: big,
	biking: biking,
	blissful: blissful,
	boho: boho,
	bold: bold,
	bookish: bookish,
	boozy: boozy,
	brunch: brunch,
	botanical: botanical,
	busy: busy,
	buzzing: buzzing,
	calm: calm,
	campy: campy,
	casual: casual,
	celebratory: celebratory,
	cheap: cheap,
	children: children,
	chill: chill,
	cinematic: cinematic,
	civic: civic,
	classic: classic,
	classy: classy,
	cold: cold,
	colorful: colorful,
	community: community,
	conversational: conversational,
	cool: cool,
	comfy: comfy,
	cozy: cozy,
	crowded: crowded,
	cultural: cultural,
	cute: cute,
	craft: craft,
	crazy: crazy,
	creative: creative,
	curious: curious,
	dance: dance,
	dark: dark,
	dating: dating,
	decorative: decorative,
	delightful: delightful,
	diverse: diverse,
	diy: diy,
	dramatic: dramatic,
	dreamy: dreamy,
	drinks: drinks,
	drinking: drinking,
	drip: drip,
	dynamic: dynamic,
	eclectic: eclectic,
	educational: educational,
	elegant: elegant,
	emotional: emotional,
	energetic: energetic,
	entertaining: entertaining,
	entrepreneurial: entrepreneurial,
	exciting: exciting,
	exclusive: exclusive,
	experiential: experiential,
	experimental: experimental,
	family: family,
	fancy: fancy,
	fantastic: fantastic,
	fashion: fashion,
	favorite: favorite,
	feminist: feminist,
	festive: festive,
	fierce: fierce,
	film: film,
	flavorful: flavorful,
	folk: folk,
	free: free,
	friendly: friendly,
	fun: fun,
	funky: funky,
	funny: funny,
	futuristic: futuristic,
	fresh: fresh,
	games: games,
	garden: garden,
	gay: gay,
	geeky: geeky,
	generous: generous,
	gentle: gentle,
	glam: glam,
	grimy: grimy,
	happy: happy,
	healthy: healthy,
	hearty: hearty,
	hifi: hifi,
	hiking: hiking,
	hipster: hipster,
	historic: historic,
	holistic: holistic,
	hidden_gem: hidden_gem,
	hip: hip,
	hippie: hippie,
	inclusive: inclusive,
	indie: indie,
	innovative: innovative,
	inspired: inspired,
	intense: intense,
	interactive: interactive,
	intergenerational: intergenerational,
	international: international,
	interesting: interesting,
	intimate: intimate,
	jazzy: jazzy,
	joyful: joyful,
	kitschy: kitschy,
	kindness: kindness,
	kink: kink,
	lax: lax,
	laugh: laugh,
	lit: lit,
	lively: lively,
	loud: loud,
	local: local,
	luxe: luxe,
	love: love,
	magical: magical,
	messy: messy,
	mermaid: mermaid,
	minimalist: minimalist,
	mindful: mindful,
	mingle: mingle,
	modern: modern,
	moody: moody,
	morning: morning,
	musical: musical,
	mystic: mystic,
	natural: natural,
	nerdy: nerdy,
	neon: neon,
	"new": {
	fresh: 0.4,
	unique: 0.4,
	innovative: 0.3,
	modern: 0.3,
	futuristic: 0.3,
	exciting: 0.3,
	special: 0.3
},
	nightlife: nightlife,
	novel: novel,
	oasis: oasis,
	old: old,
	oldschool: oldschool,
	open: open,
	outdoors: outdoors,
	outrageous: outrageous,
	participatory: participatory,
	parisian: parisian,
	park: park,
	party: party,
	passionate: passionate,
	patio: patio,
	peaceful: peaceful,
	perspective: perspective,
	photo: photo,
	playful: playful,
	popular: popular,
	popping: popping,
	popup: popup,
	positive: positive,
	posh: posh,
	proud: proud,
	"public": {
	civic: 0.3,
	local: 0.3,
	community: 0.3,
	social: 0.3
},
	queer: queer,
	quiet: quiet,
	quirky: quirky,
	radical: radical,
	raunchy: raunchy,
	rebel: rebel,
	refreshing: refreshing,
	relaxing: relaxing,
	rejuvenating: rejuvenating,
	restorative: restorative,
	reuse: reuse,
	retro: retro,
	rock: rock,
	romantic: romantic,
	rugged: rugged,
	safe: safe,
	savory: savory,
	scenic: scenic,
	serene: serene,
	sensual: sensual,
	shimmy: shimmy,
	silly: silly,
	simple: simple,
	singing: singing,
	small: small,
	social: social,
	sober: sober,
	solidarity: solidarity,
	soothing: soothing,
	soulful: soulful,
	special: special,
	spicy: spicy,
	spontaneous: spontaneous,
	strange: strange,
	subversive: subversive,
	sunny: sunny,
	sweet: sweet,
	tasty: tasty,
	together: together,
	tourist: tourist,
	tropical: tropical,
	transgender: transgender,
	transit: transit,
	trendy: trendy,
	trending: trending,
	trippy: trippy,
	vegan: vegan,
	views: views,
	urban: urban,
	ugly: ugly,
	underground: underground,
	unexpected: unexpected,
	unique: unique,
	upscale: upscale,
	vast: vast,
	vibe: vibe,
	vibrant: vibrant,
	vintage: vintage,
	volunteer: volunteer,
	walk: walk,
	warm: warm,
	weekend: weekend,
	whimsical: whimsical,
	witchy: witchy,
	wild: wild,
	weird: weird,
	young: young,
	zen: zen
};

var asset = {
	font: {
		icon: {
			name: "Nantes",
			woff: "https://etldev.blob.core.windows.net/fonts/Nantes-Regular.woff"
		}
	}
};
var color = {
	base: {
		white: "#ffffff",
		black: "#000000",
		gray: {
			"50": "#f9f7fc",
			"100": "#efeff4",
			"200": "#e2e2ed",
			"300": "#e4e4ea",
			"400": "#d1d0d8",
			"500": "#b2b1bc",
			"600": "#9999a3",
			"700": "#7d7c84",
			"800": "#535156",
			"900": "#3c3b3f",
			"1000": "#242326"
		},
		yellow: {
			bright: "#fdff00",
			deep: "#ef9b0d",
			light: "#fef483",
			pastel: "#f1ffcf",
			primary: "#fded35"
		},
		lime: {
			bright: "#64ff00",
			deep: "#58e86b",
			light: "#a8f36a",
			pastel: "#d4ffdc",
			primary: "#78ec6c"
		},
		green: {
			bright: "#54ff95",
			deep: "#006e59",
			light: "#61ecb2",
			pastel: "#b4ffd9",
			primary: "#00b459"
		},
		teal: {
			bright: "#00ffe4",
			deep: "#205273",
			light: "#00cec8",
			pastel: "#c4f7f4",
			primary: "#57b5b1"
		},
		blue: {
			bright: "#0000ff",
			deep: "#000045",
			light: "#3cd8ff",
			pastel: "#a0e5f7",
			primary: "#2d76cc"
		},
		violet: {
			bright: "#6b00d7",
			deep: "#190087",
			light: "#5172bf",
			pastel: "#cad8f9",
			primary: "#1d54d7"
		},
		purple: {
			bright: "#9100ff",
			deep: "#4e0089",
			light: "#d391fa",
			pastel: "#e5d0ff",
			primary: "#b34eff"
		},
		magenta: {
			bright: "#ff00ff",
			deep: "#7e1a65",
			light: "#e779b8",
			pastel: "#ffc4ff",
			primary: "#c400c4"
		},
		red: {
			bright: "#ff0000",
			deep: "#a30000",
			light: "#ff6434",
			pastel: "#ffccbc",
			primary: "#dd2c00"
		},
		orange: {
			bright: "#ef7200",
			deep: "#e55929",
			light: "#d99566",
			pastel: "#fff3e0",
			primary: "#ff5722"
		},
		golden: {
			bright: "#f7941d",
			deep: "#c66900",
			light: "#ffc947",
			pastel: "#ffffe4",
			primary: "#ff9800"
		}
	},
	heatmap: {
		first: "rgba(255, 200, 71, 0.8)",
		second: "rgba(255, 0, 255, 0.8)",
		third: "rgba(178, 77, 255, 0.8)",
		fourth: "rgba(161, 230, 247, 0.6)",
		fifth: "rgba(205, 244, 208, 0.4)",
		sixth: "#f9f7fc"
	},
	vibes: {
		absurd: {
			primary: "#a8f36a",
			secondary: "#00ffe4"
		},
		active: {
			primary: "#64ff00",
			secondary: "#c4f7f4"
		},
		activist: {
			primary: "#e779b8",
			secondary: "#ef9b0d"
		},
		adventurous: {
			primary: "#64ff00",
			secondary: "#00cec8",
			tertiary: "#c4f7f4"
		},
		alternative: {
			primary: "#f7941d",
			secondary: "#ffc947"
		},
		airy: {
			primary: "#fff3e0",
			secondary: "#f1ffcf"
		},
		analog: {
			primary: "#205273",
			secondary: "#ef7200"
		},
		antique: {
			primary: "#d99566",
			secondary: "#57b5b1"
		},
		artisanal: {
			primary: "#ffccbc",
			secondary: "#b4ffd9"
		},
		architectural: {
			primary: "#c400c4",
			secondary: "#fff3e0"
		},
		artsy: {
			primary: "#d391fa",
			secondary: "#006e59"
		},
		aquatic: {
			primary: "#0000ff",
			secondary: "#00ffe4"
		},
		art: {
			primary: "#d391fa",
			secondary: "#00cec8"
		},
		authentic: {
			primary: "#f7941d",
			secondary: "#b34eff"
		},
		aware: {
			primary: "#9100ff",
			secondary: "#00ffe4",
			tertiary: "#fff3e0"
		},
		beautiful: {
			primary: "#e5d0ff",
			secondary: "#e779b8"
		},
		belonging: {
			primary: "#f7941d",
			secondary: "#fdff00"
		},
		blissful: {
			primary: "#e779b8",
			secondary: "#f1ffcf"
		},
		boho: {
			primary: "#fff3e0",
			secondary: "#c66900"
		},
		bold: {
			primary: "#ef7200",
			secondary: "#ffc4ff"
		},
		boozy: {
			primary: "#ff5722",
			secondary: "#dd2c00"
		},
		botanical: {
			primary: "#b4ffd9",
			secondary: "#006e59"
		},
		bright: {
			primary: "#fdff00",
			secondary: "#d4ffdc"
		},
		busy: {
			primary: "#e55929",
			secondary: "#ff9800"
		},
		buzzing: {
			primary: "#c66900",
			secondary: "#fded35",
			tertiary: "#ffc947"
		},
		calm: {
			primary: "#ffffe4",
			secondary: "#d4ffdc",
			tertiary: "#3cd8ff"
		},
		celebration: {
			primary: "#ff9800",
			secondary: "#f1ffcf"
		},
		celebratory: {
			primary: "#ff9800",
			secondary: "#d391fa"
		},
		charming: {
			primary: "#cad8f9",
			secondary: "#e5d0ff"
		},
		cheerful: {
			primary: "#ffc4ff",
			secondary: "#fff3e0"
		},
		chill: {
			primary: "#a0e5f7",
			secondary: "#ffccbc",
			tertiary: "#f1ffcf"
		},
		cinematic: {
			primary: "#205273",
			secondary: "#d391fa"
		},
		civic: {
			primary: "#00cec8",
			secondary: "#205273"
		},
		classic: {
			primary: "#e55929",
			secondary: "#c400c4"
		},
		colorful: {
			primary: "#ff00ff",
			secondary: "#00cec8"
		},
		community: {
			primary: "#ffccbc",
			secondary: "#c400c4"
		},
		contemplative: {
			primary: "#a0e5f7",
			secondary: "#c4f7f4"
		},
		cool: {
			primary: "#57b5b1",
			secondary: "#3cd8ff"
		},
		courageous: {
			primary: "#d391fa",
			secondary: "#fff3e0"
		},
		collective: {
			primary: "#f1ffcf",
			secondary: "#000045"
		},
		collectable: {
			primary: "#d391fa",
			secondary: "#f1ffcf"
		},
		cozy: {
			primary: "#ffffe4",
			secondary: "#cad8f9"
		},
		cultural: {
			primary: "#b34eff",
			secondary: "#ff00ff"
		},
		curious: {
			primary: "#00cec8",
			secondary: "#ef9b0d"
		},
		cute: {
			primary: "#e779b8",
			secondary: "#fded35"
		},
		creative: {
			primary: "#a0e5f7",
			secondary: "#9100ff"
		},
		crowded: {
			primary: "#000045",
			secondary: "#ffccbc"
		},
		datespot: {
			primary: "#ff00ff",
			secondary: "#ff0000"
		},
		drip: {
			primary: "#e55929",
			secondary: "#4e0089"
		},
		diverse: {
			primary: "#e5d0ff",
			secondary: "#00ffe4"
		},
		diy: {
			primary: "#5172bf",
			secondary: "#d391fa"
		},
		dreamy: {
			primary: "#d391fa",
			secondary: "#a0e5f7",
			tertiary: "#f1ffcf"
		},
		drinking: {
			primary: "#ff5722",
			secondary: "#dd2c00"
		},
		dynamic: {
			primary: "#9100ff",
			secondary: "#78ec6c"
		},
		eclectic: {
			primary: "#ffffe4",
			secondary: "#64ff00"
		},
		edgy: {
			primary: "#1d54d7",
			secondary: "#fff3e0"
		},
		energetic: {
			primary: "#ffc947",
			secondary: "#fded35",
			tertiary: "#c66900"
		},
		energy: {
			primary: "#ff5722",
			secondary: "#ff9800"
		},
		exciting: {
			primary: "#fded35",
			secondary: "#ff00ff"
		},
		family: {
			primary: "#f1ffcf",
			secondary: "#9100ff"
		},
		festive: {
			primary: "#ffc947",
			secondary: "#ff00ff"
		},
		fierce: {
			primary: "#a30000",
			secondary: "#ffccbc"
		},
		folk: {
			primary: "#a30000",
			secondary: "#fded35"
		},
		fragrant: {
			primary: "#b4ffd9",
			secondary: "#d4ffdc"
		},
		friendly: {
			primary: "#3cd8ff",
			secondary: "#d391fa"
		},
		fun: {
			primary: "#ffffe4",
			secondary: "#00ffe4"
		},
		funny: {
			primary: "#00cec8",
			secondary: "#fded35"
		},
		generous: {
			primary: "#2d76cc",
			secondary: "#a8f36a"
		},
		happy: {
			primary: "#ef9b0d",
			secondary: "#d4ffdc"
		},
		healthy: {
			primary: "#c4f7f4",
			secondary: "#58e86b"
		},
		hippie: {
			primary: "#ffc4ff",
			secondary: "#ff9800"
		},
		historic: {
			primary: "#c66900",
			secondary: "#fff3e0"
		},
		hopeful: {
			primary: "#f7941d",
			secondary: "#d4ffdc"
		},
		inclusive: {
			primary: "#6b00d7",
			secondary: "#61ecb2"
		},
		iconic: {
			primary: "#7e1a65",
			secondary: "#ffc4ff"
		},
		inspired: {
			primary: "#b4ffd9",
			secondary: "#58e86b"
		},
		intimate: {
			primary: "#dd2c00",
			secondary: "#ffccbc"
		},
		joyful: {
			primary: "#3cd8ff",
			secondary: "#ffc4ff"
		},
		kitschy: {
			primary: "#ffccbc",
			secondary: "#006e59"
		},
		legacy: {
			primary: "#d391fa",
			secondary: "#e5d0ff"
		},
		lit: {
			primary: "#fded35",
			secondary: "#ff0000"
		},
		lively: {
			primary: "#ff5722",
			secondary: "#61ecb2"
		},
		local: {
			primary: "#ff00ff",
			secondary: "#a8f36a"
		},
		loud: {
			primary: "#ff5722",
			secondary: "#64ff00"
		},
		love: {
			primary: "#c400c4",
			secondary: "#b34eff"
		},
		magical: {
			primary: "#ef9b0d",
			secondary: "#c400c4"
		},
		mindful: {
			primary: "#fef483",
			secondary: "#d99566"
		},
		minimalist: {
			primary: "#e2e2ed",
			secondary: "#c4f7f4"
		},
		moody: {
			primary: "#ffccbc",
			secondary: "#190087"
		},
		musical: {
			primary: "#00ffe4",
			secondary: "#9100ff"
		},
		mystic: {
			primary: "#f1ffcf",
			secondary: "#c400c4"
		},
		natural: {
			primary: "#61ecb2",
			secondary: "#ffccbc"
		},
		neon: {
			primary: "#fdff00",
			secondary: "#64ff00"
		},
		"new": {
			primary: "#64ff00",
			secondary: "#e5d0ff"
		},
		nostalgic: {
			primary: "#fff3e0",
			secondary: "#190087",
			tertiary: "#d99566"
		},
		old: {
			primary: "#57b5b1",
			secondary: "#ffccbc"
		},
		"old-school": {
			primary: "#190087",
			secondary: "#d99566",
			tertiary: "#fff3e0"
		},
		outdoors: {
			primary: "#78ec6c",
			secondary: "#3cd8ff"
		},
		party: {
			primary: "#9100ff",
			secondary: "#ffccbc"
		},
		patio: {
			primary: "#fded35",
			secondary: "#a8f36a"
		},
		passionate: {
			primary: "#ff6434",
			secondary: "#ffc947"
		},
		peaceful: {
			primary: "#3cd8ff",
			secondary: "#fff3e0"
		},
		playful: {
			primary: "#00cec8",
			secondary: "#a8f36a",
			tertiary: "#00cec8"
		},
		playtime: {
			primary: "#00cec8",
			secondary: "#a8f36a",
			tertiary: "#00cec8"
		},
		popular: {
			primary: "#e779b8",
			secondary: "#ffc947"
		},
		proud: {
			primary: "#0000ff",
			secondary: "#3cd8ff"
		},
		positive: {
			primary: "#ffc4ff",
			secondary: "#fded35"
		},
		quiet: {
			primary: "#cad8f9",
			secondary: "#57b5b1"
		},
		quiet_energy: {
			primary: "#3cd8ff",
			secondary: "#b4ffd9",
			tertiary: "#ffffe4"
		},
		radical: {
			primary: "#c400c4",
			secondary: "#00ffe4"
		},
		rebel: {
			primary: "#205273",
			secondary: "#ffccbc"
		},
		relaxing: {
			primary: "#2d76cc",
			secondary: "#c4f7f4"
		},
		retro: {
			primary: "#2d76cc",
			secondary: "#ef9b0d"
		},
		romantic: {
			primary: "#ff0000",
			secondary: "#e5d0ff"
		},
		rousing: {
			primary: "#c4f7f4",
			secondary: "#f1ffcf"
		},
		scenic: {
			primary: "#58e86b",
			secondary: "#c4f7f4"
		},
		sensual: {
			primary: "#7e1a65",
			secondary: "#ffccbc"
		},
		serene: {
			primary: "#d4ffdc",
			secondary: "#fded35"
		},
		shimmy: {
			primary: "#d391fa",
			secondary: "#2d76cc"
		},
		sleepy: {
			primary: "#57b5b1",
			secondary: "#cad8f9"
		},
		social: {
			primary: "#ff0000",
			secondary: "#ffccbc",
			tertiary: "#f1ffcf"
		},
		solidarity: {
			primary: "#9100ff",
			secondary: "#00ffe4",
			tertiary: "#fff3e0"
		},
		spiritual: {
			primary: "#4e0089",
			secondary: "#ffc4ff"
		},
		spontaneous: {
			primary: "#e5d0ff",
			secondary: "#ffc4ff"
		},
		throwback: {
			primary: "#7e1a65",
			secondary: "#9100ff"
		},
		together: {
			primary: "#ff0000",
			secondary: "#ffccbc",
			tertiary: "#f1ffcf"
		},
		trendy: {
			primary: "#fef483",
			secondary: "#ff00ff"
		},
		trending: {
			primary: "#ffc947",
			secondary: "#d391fa"
		},
		tropical: {
			primary: "#54ff95",
			secondary: "#ff00ff"
		},
		trust: {
			primary: "#ffc947",
			secondary: "#e779b8"
		},
		underground: {
			primary: "#1d54d7",
			secondary: "#d391fa"
		},
		unique: {
			primary: "#0000ff",
			secondary: "#e5d0ff"
		},
		vibrant: {
			primary: "#9100ff",
			secondary: "#ffccbc"
		},
		views: {
			primary: "#3cd8ff",
			secondary: "#a0e5f7"
		},
		vintage: {
			primary: "#d99566",
			secondary: "#dd2c00"
		},
		volunteer: {
			primary: "#ff9800",
			secondary: "#a8f36a"
		},
		whimsical: {
			primary: "#3cd8ff",
			secondary: "#54ff95"
		},
		wild: {
			primary: "#00b459",
			secondary: "#006e59"
		},
		wistful: {
			primary: "#ffc947",
			secondary: "#ffc4ff"
		},
		witchy: {
			primary: "#e779b8",
			secondary: "#a30000"
		},
		witty: {
			primary: "#205273",
			secondary: "#a0e5f7"
		},
		zen: {
			primary: "#57b5b1",
			secondary: "#2d76cc"
		}
	},
	gradients: {
		quiet_energy: "#57b5b1 #d391fa"
	},
	text: {
		dark: "#3c3b3f",
		muted: "#535156",
		light: "#d1d0d8"
	},
	ui: {
		button: {
			active: "#3c3b3f",
			disabled: "#9999a3"
		},
		tab: {
			active: "#3c3b3f",
			disabled: "#b2b1bc"
		}
	}
};
var column = {
	gap: {
		desktop: "1.5rem",
		mobile: "0.5rem",
		list: "1.75rem"
	}
};
var margin = {
	center: "0 auto"
};
var padding = {
	item: "2.5rem",
	section: "3.5rem"
};
var post = {
	text: {
		block: {
			heading: 30,
			subheading: 18
		},
		card: {
			title: 20,
			description: 14,
			category: 16
		},
		caption: 16,
		category: 18,
		cite: 16,
		heading: {
			title: 36,
			subheading: 30,
			heading1: 36,
			heading2: 34,
			heading3: 30,
			heading4: 26,
			heading5: 20,
			heading6: 18
		},
		list: 18,
		info: 16,
		paragraph: 18,
		pullquote: 32
	}
};
var transitions = {
	base: {
		"default": "0.35s ease !default"
	}
};
var font = {
	family: {
		sans: "Public Sans",
		serif: "Nantes"
	},
	height: {
		base: 1.2,
		large: 1.6,
		small: 1,
		tall: 1.8,
		none: 0
	},
	size: {
		base: 16,
		normal: 16,
		small: 14,
		tiny: 12,
		micro: 10,
		large: 18
	},
	weight: {
		base: 300,
		light: 200,
		normal: 300,
		link: 400,
		medium: 500,
		bold: 700
	}
};
var units = {
	base: {
		base: 4,
		huge: 12,
		large: 8,
		nano: 0.4,
		small: 2,
		tiny: 1
	}
};
var variables = {
	asset: asset,
	color: color,
	column: column,
	"line-height": {
	tall: 1.8,
	large: 1.6,
	base: 1.2,
	small: 1,
	none: 0
},
	margin: margin,
	padding: padding,
	post: post,
	transitions: transitions,
	font: font,
	units: units
};

// Get vibe attributes
const getVibeInfo = (vibe = 'chill') => {

    const vibeInfo = allVibes.vibes.filter(item => vibe === item.key);

    if (vibeInfo.length > 0) {
        return vibeInfo[0]
    } else {
        return null
    }
};

const getVibeGradient = (vibe = 'chill') => {
    let color1 = '#DDDDDD';
    let color2 = '#AAAAAA';

    const vibe_styles = variables['color']['vibes'];
    allVibes.vibes.filter(item => vibe === item.key);

    const vibeColors = vibe_styles[vibe];

    if (vibe_styles[vibe]) {
        color1 = vibeColors['primary'];
        color2 = vibeColors['secondary'];
    }

    return {
        color1 : color1,
        color2 : color2,
        gradient : `linear-gradient(44deg, ${color1} 20%, ${color2} 100% )`
    }
};

// Print all vibes
const getVibes = (format = 'keys') => {

    let all = [];

    switch (format) {
        case 'keys':
            all = allVibes.vibes.forEach(vibe => vibe.key);
            break;

        case 'all':
            all = allVibes.vibes;
            break;

        // Else return all object
        default:
            all = allVibes.vibes;
            break;
    }

    //console.log('getVibes ', all)
    return all
};

// Get and sort vibe times
const getVibesFromVibeTimes = (vibeTimes) => {
    const vibes = (vibeTimes && vibeTimes.length > 0)
        ? vibeTimes
            .sort((a,b) => b.score - a.score)
            .map(vibe => vibe.name)
        : [];

    console.log('Handle these vibe times: ', vibeTimes, vibes);

    return vibes
};

const getRelatedVibes = (vibes, similarity = 0.4) => {
	let relatedVibes = vibes;

	const vibesWithRelated = vibes.flatMap(vibe => {
		const vibeInfo = getVibeInfo(vibe);
		let allRelated = [];

		if (vibeInfo && vibeInfo.related) {
			relatedVibes = relatedVibes.concat(vibeInfo.related);
		}

		if (vibeInfo && vibeInfo.alias) {
			allRelated = relatedVibes.concat([vibeInfo.alias]);
		}

		const similarVibes = vibes_matrix[vibe];
		const mostSimilar = [];
		for (vibe in similarVibes) {
			//console.log('Check most similar ', similarVibes[vibe], vibe)
			if (similarVibes[vibe] >= similarity) mostSimilar.push(vibe);
		}

		allRelated = relatedVibes.concat(mostSimilar);
		return allRelated
	});

	// Make it a unqiue set
	const relatedVibesUnique = [...new Set(vibesWithRelated)];
	return relatedVibesUnique
};

const getVibeStyle = (vibe) => {

    let vibe_styles = variables['color']['vibes'];

    let dark_gray = variables['color']['base']['gray']['1000'];
    let light_gray = variables['color']['base']['gray']['200'];

    let css = { color: dark_gray, background: light_gray };

    if (vibe in vibe_styles) {
        let primary = vibe_styles[vibe]['primary'];

        let luminance = chroma__default["default"](primary).luminance();
        let brightness = 1.2;
        if (luminance < 0.1) brightness += 2;
        if (luminance < 0.3) brightness += 1;

        let gradient = 'linear-gradient(45deg, ' + chroma__default["default"](primary).brighten(brightness).hex() + ' 0%, ' + light_gray + ' 75%)';

        css['background'] = gradient;
    }

    return css
  };

// Function derived from hand selecting point values for scaling then modeling exponential function for best fit
const yourvibe_scale_v1 = (x) => {
    let y = 1.061645 * (x**0.289052);

    // Return only values such that 0<=y<=1
    if (y>1) {
        y = 1;
        //console.log("y rounded down to 1")
    } else if (y<0) {
        y = 0;
        //console.log("y rounded up to 0")
    }
    return y
};

const normalize_all = (val, min, max, scale_low, scale_high) => {
    var lin_scale = d3Scale.scaleLinear().domain([min, max]).range([scale_low, scale_high]);
    return lin_scale(val)
};
/* Function responsible for returning "% Your Vibe" on place page using user inputted vibes (myvibes)
and a place's vibes (placevibes) as input. vibes_matrix is a pre-calculated json of lexical relations between
vibe words, generated using Google's pre-trained Word2Vec model
*/
const percent_yourvibe = (myvibes, placevibes) => {
    let my_vibes_fraction = 1/myvibes.length;

    // Running score of your vibe, default to 0
    let yourvibe = 0;

    // Running list of vibes that have relation, but not perfect matches
    var related_vibes = [];

    // fraction_counter tracks total perfect matches between myvibes and placevibes. Subtract from place vibes for remaining vibes to match
    let fraction_counter = 0;
    myvibes.map(vibe_m => {

        // If there's a direct match, add fraction of total number of user vibes as score
        if(placevibes.includes(vibe_m)) {
            yourvibe += my_vibes_fraction;
            fraction_counter += 1;
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
            );
        }
    });

    // Count number of vibes remaining in place that are not direct matches
    let remaining_place_vibes = placevibes.length - fraction_counter;

    // If related vibes are found and not-direct matches are more than 1, combine all scores and take log_matches(related_vibes_score)
    if (related_vibes.length>=1 && (remaining_place_vibes)>1){
        // Change of Base, new variable that will be score normalized for remaining gap
        var remaining_score = Math.log10(10)/Math.log10(20);

    // Avoid Log_1 division by zero/infinite error. Edge Casing
    } else if (related_vibes.length>=1 && (remaining_place_vibes)==1){
        var remaining_score = related_vibes[0];

    // No related matches found, score is zero
    } else {
        var remaining_score = 0;
    }

    // Scaled remaining portion of potential vibe score, for related not direct vibes
    let remaining_score_normalized = normalize_all(remaining_score, 0, 1, 0, (my_vibes_fraction*(myvibes.length-fraction_counter)));

    yourvibe += remaining_score_normalized;
    // Round using vibe scaling function. Default all 0 scores (no relation whatsoever) to 0.5 (50%)
    let yourvibe_rounded = yourvibe_scale_v1(yourvibe);
    if (yourvibe_rounded <= 0){
        yourvibe_rounded = 0.5;
    }

    // Round after multiplying by 100 so not everything is just 1 (0.95 roudns to 1)
    return Math.round(yourvibe_rounded*100)
};

exports.getRelatedVibes = getRelatedVibes;
exports.getVibeGradient = getVibeGradient;
exports.getVibeInfo = getVibeInfo;
exports.getVibeStyle = getVibeStyle;
exports.getVibes = getVibes;
exports.getVibesFromVibeTimes = getVibesFromVibeTimes;
exports.percent_yourvibe = percent_yourvibe;
exports.yourvibe_scale_v1 = yourvibe_scale_v1;
