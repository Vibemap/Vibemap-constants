'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chroma = require('chroma-js');
var d3Scale = require('d3-scale');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chroma__default = /*#__PURE__*/_interopDefaultLegacy(chroma);

var vibes$1 = [
	{
		key: "absurd",
		name: "Absurd",
		definition: "Arousing amusement in the silly and illogical",
		affirmations: [
			"Not everything has to make sense",
			"Embrace the unknown"
		],
		popularity: 327946,
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
		name: "Academic"
	},
	{
		key: "adventurous",
		name: "Adventurous",
		definition: "Willingness to try new things.",
		affirmations: [
			"Everyday can be full of excitement"
		],
		popularity: 113000000,
		related: [
			"aquatic",
			"hiking",
			"scenic",
			"wild"
		]
	},
	{
		key: "active",
		name: "Active",
		definition: "Engaging and energetic pursuits",
		affirmations: [
			"Take a step forward",
			"A simple is positive movement"
		],
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
		key: "afternoon",
		name: "Afternoon",
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
		]
	},
	{
		key: "alternative",
		name: "Alternative",
		definition: "Open to other possibilities",
		affirmations: [
			"There are few deadends"
		],
		related: [
			"indie",
			"rebel"
		]
	},
	{
		key: "amazing",
		name: "Amazing",
		definition: "Unexpected wonder"
	},
	{
		key: "analog",
		name: "Analog",
		definition: "Throw it back to the old school ways",
		affirmations: [
			"Take it back to another time"
		],
		related: [
			"retro",
			"nostalgic",
			"throwback",
			"deepcut"
		]
	},
	{
		key: "antique",
		name: "Antique",
		definition: "Nostalgic collectables",
		affirmations: [
			"Add to your collection"
		],
		related: [
			"cottage",
			"collectable",
			"vintage",
			"nostalgic",
			"oldschool"
		]
	},
	{
		key: "art",
		name: "Art",
		definition: "Human creativity",
		affirmations: [
			"Imagine the world around you as a painting"
		],
		related: [
			"artsy",
			"interactive",
			"aesthetic",
			"creative"
		]
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
		popularity: 12000000,
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
		]
	},
	{
		key: "beautiful",
		name: "Beautiful",
		definition: "Pleasing to the senses",
		affirmations: [
			"Beauty is everywhere"
		],
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
		]
	},
	{
		key: "biking",
		name: "Biking",
		definition: "Human-powered movement",
		affirmations: [
			"Experience the freedom of cruising"
		],
		related: [
			"adventurous"
		]
	},
	{
		key: "blissful",
		name: "Blissful",
		definition: "Complete joy",
		affirmations: [
			"Bliss is near"
		]
	},
	{
		key: "boho",
		name: "Boho",
		alias: "Bohemian",
		definition: "Lacking the need to confirm to society",
		affirmations: [
			"You do you"
		],
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
		]
	},
	{
		key: "bookish",
		name: "Bookish",
		definition: "Enjoyment of stories and learning",
		affirmations: [
			"A good book can take you anywhere"
		]
	},
	{
		key: "boozy",
		name: "Boozy",
		definition: "Feeling intoxicated",
		affirmations: [
			"Let loose and celebrate anything"
		]
	},
	{
		key: "brunch",
		name: "Afternoon",
		related: [
			"afternoon",
			"boozy",
			"fun",
			"sunny"
		]
	},
	{
		key: "botanical",
		name: "Botanical",
		definition: "Natural goodness",
		affirmations: [
			"Sprout roots and grow"
		],
		related: [
			"fresh",
			"natural",
			"green",
			"plants",
			"airy"
		]
	},
	{
		key: "busy",
		name: "Busy",
		definition: "Full of activity",
		affirmations: [
			"Occupied but not preoccupied"
		]
	},
	{
		key: "buzzing",
		name: "Buzzing",
		definition: "A humming feeling or sounds",
		affirmations: [
			"Gotta have the funk",
			"Feel the vibration of a garden"
		],
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
		key: "calm",
		name: "Calm",
		definition: "Undisturbed and unshakable",
		affirmations: [
			"Embrace stillness"
		],
		popularity: 14000000,
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
		key: "campy",
		name: "Campy",
		definition: "Exaggerated and amusing humor",
		affirmations: [
			"Take it over the top"
		],
		related: [
			"fun",
			"funny"
		]
	},
	{
		key: "camp",
		name: "Camp",
		definition: "Into the wild",
		related: [
			"outdoorsy",
			"rugged",
			"scenic"
		]
	},
	{
		key: "carefree",
		name: "Carefree",
		definition: "No worries",
		affirmation: [
			"Let it all go"
		],
		related: [
			"calm",
			"chill",
			"relaxed"
		]
	},
	{
		key: "casual",
		name: "Casual",
		definition: "Relaxed and easy",
		affirmations: [
			"Go with the flow"
		],
		popularity: 21000000,
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
		related: [
			"affordable"
		]
	},
	{
		key: "children",
		name: "Children",
		definition: "Young and innocent",
		affirmations: [
			"Remember a happy place"
		],
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
		key: "cinematic",
		name: "Cinematic",
		definition: "Dramatic and moving",
		affirmations: [
			"Imagine the score to your adventure"
		]
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
		name: "Classy"
	},
	{
		key: "cold",
		name: "Cold"
	},
	{
		key: "colorful",
		name: "Colorful",
		definition: "Lively, expressive, and bright",
		affirmations: [
			"Imagine yourself as a mural"
		],
		related: [
			"artsy",
			"authentic",
			"dreamy"
		]
	},
	{
		key: "community",
		name: "Community",
		definition: "Your people",
		affirmations: [
			"Support those around you"
		],
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
		name: "Conversational"
	},
	{
		key: "cool",
		name: "Cool",
		definition: "Calm, collected, and always in style"
	},
	{
		key: "comfy",
		name: "Comfy"
	},
	{
		key: "cozy",
		name: "Cozy",
		definition: "Warm, snug, and loved",
		affirmations: [
			"Wrap yourself in something fluffy."
		]
	},
	{
		key: "crowded",
		name: "Crowded"
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
		]
	},
	{
		key: "craft",
		name: "Craft",
		definition: "Made with care and skill"
	},
	{
		key: "crazy",
		name: "Crazy"
	},
	{
		key: "creative",
		name: "Creative"
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
		name: "Dark"
	},
	{
		key: "dating",
		name: "Dating"
	},
	{
		key: "decorative",
		name: "Decorative"
	},
	{
		key: "deepcut",
		name: "Deep Cut",
		definition: "If you know, you know",
		affirmations: [
			"Appreciate what your childhood taught you"
		],
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
		name: "Delightful"
	},
	{
		key: "diverse",
		name: "Diverse",
		definition: "A variety of it all",
		affirmations: [
			"We are in this together"
		],
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
		name: "Dope"
	},
	{
		key: "dramatic",
		name: "Dramatic"
	},
	{
		key: "dreamy",
		name: "Dreamy",
		definition: "Magical or otherworldly",
		affirmations: [
			"Picture yourself anywhere you like"
		],
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
		key: "drinks",
		name: "Drinks"
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
		related: [
			"unique",
			"popular",
			"cool"
		]
	},
	{
		key: "earthy",
		name: "Earthy",
		related: [
			"sustainable",
			"green"
		]
	},
	{
		key: "eccentric",
		name: "Eccentric"
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
		related: [
			"sustainable",
			"earthy",
			"thrifting",
			"recycled"
		]
	},
	{
		key: "educational",
		name: "Educational"
	},
	{
		key: "elegant",
		name: "Elegant",
		definition: "Refined style and taste",
		affirmations: [
			"You deserve a slide of goodness"
		],
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
		definition: "Positivity and respect"
	},
	{
		key: "emotional",
		name: "Emotional"
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
		related: [
			"lively",
			"vibrant",
			"wild"
		]
	},
	{
		key: "entertaining",
		name: "Entertaining"
	},
	{
		key: "enthusiastic",
		name: "Enthusiastic"
	},
	{
		key: "entrepreneurial",
		name: "Entrepreneurial"
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
		related: [
			"fun",
			"adventurous"
		]
	},
	{
		key: "exclusive",
		name: "Exclusive"
	},
	{
		key: "experiential",
		name: "Experiential"
	},
	{
		key: "experimental",
		name: "Experimental"
	},
	{
		key: "explore",
		name: "Explore",
		definition: "A new path"
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
		related: [
			"together",
			"love"
		]
	},
	{
		key: "fancy",
		name: "Fancy"
	},
	{
		key: "fantastic",
		name: "Fantastic"
	},
	{
		key: "fashion",
		name: "Fashion"
	},
	{
		key: "fashionista",
		name: "Fashionista",
		definition: "All about the glam",
		related: [
			"treatyourself",
			"shopaholic"
		]
	},
	{
		key: "favorite",
		name: "Favorite"
	},
	{
		key: "feminist",
		name: "Feminist"
	},
	{
		key: "festive",
		name: "Festive",
		definition: "Cheerful and colorful gathering",
		affirmations: [
			"Be the life of the party"
		],
		related: [
			"celebratory",
			"wild",
			"fun",
			"loud"
		]
	},
	{
		key: "fierce"
	},
	{
		key: "film"
	},
	{
		key: "flavorful"
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
		key: "free",
		name: "Free",
		definition: "No cost"
	},
	{
		key: "friendly",
		name: "Friendly",
		definition: "Kind and inviting",
		affirmations: [
			"Open the door to friendship"
		]
	},
	{
		key: "fun",
		name: "Fun",
		definition: "Enjoyment and laughter",
		affirmations: [
			"Plan a playdate"
		]
	},
	{
		key: "funky",
		name: "Funky"
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
		related: [
			"fun",
			"comedy",
			"wild",
			"playful"
		]
	},
	{
		key: "futuristic",
		name: "Futuristic"
	},
	{
		key: "fresh",
		name: "Fresh",
		definition: "Nice, new, and refreshing",
		affirmation: [
			"Savor something crisp, sweet and made from light"
		]
	},
	{
		key: "games",
		name: "Games"
	},
	{
		key: "garden",
		name: "Garden",
		definition: "Growth of fruits and flowers",
		affirmation: [
			"Admire new growth in something old"
		]
	},
	{
		key: "gay",
		name: "Gay"
	},
	{
		key: "datespot",
		name: "Date Spot",
		definition: null,
		affirmations: [
			"Seek out your person"
		],
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
		key: "geeky",
		name: "Geeky",
		definition: "Profound Enthusiasm",
		affirmations: [
			"Belonging is a club for us all"
		],
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
		]
	},
	{
		key: "gentle",
		name: "Gentle"
	},
	{
		key: "glam",
		name: "Glam",
		definition: "Beautiful beyond compare.",
		affirmations: [
			"Your light is strong"
		],
		related: [
			"luxe",
			"beautiful",
			"exclusive",
			"fancy",
			"drip"
		]
	},
	{
		key: "gritter",
		name: "Glitter"
	},
	{
		key: "grimy",
		name: "Grimy"
	},
	{
		key: "grunge",
		name: "Grunge"
	},
	{
		key: "gothic",
		name: "Gothic"
	},
	{
		key: "harmonious",
		name: "Harmonious",
		definition: "Positive balance"
	},
	{
		key: "happy",
		name: "Happy"
	},
	{
		key: "healthy",
		name: "Healthy",
		definition: "All about what is good for you",
		affirmation: [
			"Make your self care a priority",
			"Take care of yourself"
		],
		related: [
			"natural",
			"hiking",
			"green"
		]
	},
	{
		key: "hearty",
		name: "Hearty"
	},
	{
		key: "hifi",
		name: "Hi Fi",
		definition: "All about that high quality",
		affirmations: [
			"You deserve the best"
		],
		related: [
			"exclusive",
			"fancy",
			"glam",
			"luxe",
			"authentic"
		]
	},
	{
		key: "hiking",
		name: "Hiking",
		definition: "Walking around in nature",
		affirmation: [
			"The outdoors is calling"
		],
		related: [
			"healthy",
			"adventurous",
			"outdoors"
		]
	},
	{
		key: "hipster",
		name: "Hipster"
	},
	{
		key: "historic",
		name: "Historic",
		definition: "Places of importance",
		affirmations: [
			"Cross paths with so many who came before"
		]
	},
	{
		key: "holistic"
	},
	{
		key: "hiddengem",
		name: "Hidden Gem",
		definition: "Not widely known",
		related: [
			"deepcut",
			"classic",
			"unique",
			"secret"
		]
	},
	{
		key: "hip",
		name: "Hip"
	},
	{
		key: "hippie",
		name: "Hippie",
		definition: "Chill out",
		affirmations: [
			"Dance to the beat of your own drum"
		],
		related: [
			"natural",
			"botanical",
			"chill",
			"radical",
			"wild"
		]
	},
	{
		key: "hygge",
		name: "Hygge",
		definition: "Cozy & Comfortable"
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
		related: [
			"proud",
			"community",
			"solidarity",
			"diverse"
		]
	},
	{
		key: "indie",
		name: "Indie",
		definition: "Independent and original"
	},
	{
		key: "innovative",
		name: "Innovative"
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
		name: "Intense"
	},
	{
		key: "interactive",
		name: "Interactive"
	},
	{
		key: "intergenerational",
		name: "Intergenerational"
	},
	{
		key: "international",
		name: "International"
	},
	{
		key: "interesting",
		name: "Interesting",
		definition: "Arousing curiosity and feeling"
	},
	{
		key: "intimate",
		name: "Intimate",
		definition: "Warmth of closeness",
		affirmations: [
			"Intimacy flourishes in safe spaces"
		],
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
		]
	},
	{
		key: "kitschy",
		name: "Kitschy",
		affirmations: [
			"The oddest things can bring the greatest joys"
		]
	},
	{
		key: "kindness",
		name: "Kindness"
	},
	{
		key: "kinky",
		name: "Kinky"
	},
	{
		key: "laidback",
		name: "Laid-back"
	},
	{
		key: "lax",
		name: "Lax"
	},
	{
		key: "laugh",
		name: "Laugh"
	},
	{
		key: "liberating",
		name: "Liberating"
	},
	{
		key: "lit",
		name: "Lit",
		definition: "It's happening",
		affirmations: [
			"Find yourself amongst the crowds"
		],
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
		related: [
			"community",
			"inclusive",
			"civic",
			"proud",
			"cultural"
		]
	},
	{
		key: "luxe",
		name: "Luxe",
		definition: "So glamourous",
		affirmations: [
			"You define your beauty"
		],
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
		name: "Messy"
	},
	{
		key: "mellow",
		name: "Mellow",
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
		related: [
			"colorful",
			"aquatic",
			"nautical",
			"sexy"
		]
	},
	{
		key: "minimalist",
		name: "Minimalist",
		definition: "Simple and good use of effort",
		affirmations: [
			"Freeing up mental space for new opportunities"
		],
		related: [
			"airy",
			"modern",
			"open"
		]
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
		key: "mingle",
		name: "Mingle"
	},
	{
		key: "modern",
		name: "Modern"
	},
	{
		key: "moody",
		name: "Moody",
		definition: "A sudden burst of a mood",
		affirmations: [
			"Be flexible as your personality evolves",
			"Stay tuned in with your feelings"
		],
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
		name: "Mysterious"
	},
	{
		key: "mystic",
		name: "Mystic",
		definition: "Holding onto that spiritual magic",
		affirmations: [
			"Your hold your own power"
		],
		related: [
			"witchy",
			"spiritual",
			"magical",
			"wild",
			"radical"
		]
	},
	{
		key: "natural",
		name: "Natural",
		definition: "Of the earth",
		affirmation: [
			"Be one with the land",
			"Be part of the natural world"
		],
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
		related: [
			"aquatic",
			"historic",
			"mermaid"
		]
	},
	{
		key: "nerdy",
		name: "Nerdy",
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
		key: "new"
	},
	{
		key: "nightlife",
		name: "Nightlife",
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
		definition: "Snack on"
	},
	{
		key: "nostalgic",
		name: "nostalgic",
		definition: "Rememberance of the past",
		affirmations: [
			"Recreate some aspect of local history",
			"A nostalgic experience is in your future"
		],
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
		name: "Novel"
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
		related: [
			"tropical",
			"hiddengem",
			"secret"
		]
	},
	{
		key: "old",
		name: "Old"
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
		key: "open",
		name: "Open"
	},
	{
		key: "optimistic",
		name: "Optimistic"
	},
	{
		key: "opulent",
		name: "Opulent"
	},
	{
		key: "organic",
		name: "Organic",
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
		name: "Outrageous"
	},
	{
		key: "participatory",
		name: "Participatory"
	},
	{
		key: "panoramic",
		name: "Panoramic",
		definition: "A wide beautiful view",
		related: [
			"scenic",
			"views"
		]
	},
	{
		key: "parisian",
		name: "Parisian",
		definition: "Everyday, effortless chic",
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
		related: [
			"airy",
			"cozy",
			"outdoors",
			"sunny"
		]
	},
	{
		key: "party",
		name: "Party"
	},
	{
		key: "passionate",
		name: "Passionate",
		definition: "The act of caring for something",
		affirmations: [
			"Lean in to what you care about"
		],
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
		definition: "Dreamy & Calm"
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
		name: "Perspective"
	},
	{
		key: "photo",
		name: "Photo"
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
		related: [
			"fun",
			"happy",
			"whimsical"
		]
	},
	{
		key: "picnic",
		name: "Picnic",
		definition: "Afternoon in the park",
		affirmations: [
			"Seeing an old view a new way"
		],
		related: [
			"chill",
			"outdoors",
			"sunny",
			"views"
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
		definition: "Ephemeral experiences"
	},
	{
		key: "positive",
		name: "Positive",
		definition: "Good vibes only",
		affirmations: [
			"Pass along good vibes"
		],
		related: [
			"happy",
			"open",
			"fun"
		]
	},
	{
		key: "posh",
		name: "Posh"
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
		related: [
			"community",
			"solidarity",
			"inspired",
			"radical",
			"civic"
		]
	},
	{
		key: "public",
		name: "Public"
	},
	{
		key: "punk",
		name: "Punk"
	},
	{
		key: "queer",
		name: "Queer"
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
		related: [
			"calm",
			"peaceful",
			"safe",
			"chill"
		]
	},
	{
		key: "quirky",
		name: "Quirky"
	},
	{
		key: "radical",
		name: "Radical",
		definition: "On the edge of the common",
		affirmation: [
			"Bravely go out into the world",
			"Move beyond your wildest dreams"
		],
		related: [
			"hippie",
			"rebel",
			"community",
			"proud",
			"solidarity"
		]
	},
	{
		key: "raunchy",
		name: "Raunchy"
	},
	{
		key: "rebel",
		name: "Rebel",
		definition: "Outside the box and savage af",
		affirmations: [
			"Learn the rules and bend them"
		],
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
		related: [
			"sustainable",
			"earthy",
			"thrifting"
		]
	},
	{
		key: "refreshing",
		name: "Refreshing"
	},
	{
		key: "relaxing",
		name: "Relaxing",
		definition: "Release of tension",
		affirmations: [
			"Doing nothing is fine",
			"Let go"
		]
	},
	{
		key: "rejuvenating",
		name: "Rejuvenating"
	},
	{
		key: "restorative",
		name: "Restorative"
	},
	{
		key: "reuse",
		name: "Reuse"
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
		name: "Revolutionary"
	},
	{
		key: "rock",
		name: "Rock"
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
		related: [
			"sensual",
			"love",
			"intimate"
		]
	},
	{
		key: "rugged",
		name: "Rugged",
		definition: "Wild & rough",
		related: [
			"outdoorsy",
			"hiking",
			"camp"
		]
	},
	{
		key: "rustic",
		name: "Rustic"
	},
	{
		key: "safe",
		name: "Safe"
	},
	{
		key: "sassy",
		name: "Sassy"
	},
	{
		key: "savory",
		name: "Savory"
	},
	{
		key: "scenic",
		name: "Scenic",
		definition: "Impressive and beautiful views",
		affirmations: [
			"Seeing an old view a new way"
		],
		related: [
			"outdoors",
			"views"
		]
	},
	{
		key: "shopaholic",
		name: "Shopaholid",
		definition: "Shop till you drop",
		related: [
			"treatyourself",
			"glam"
		]
	},
	{
		key: "selfcare",
		name: "Self Care",
		definition: "Take care of yourself",
		related: [
			"treatyourself",
			"healthy",
			"positive"
		]
	},
	{
		key: "secret",
		name: "Secret"
	},
	{
		key: "serene",
		name: "Serene"
	},
	{
		key: "sensual",
		name: "Sensual",
		definition: "Invoking the senses",
		affirmations: [
			"A warm embrace is so nourishing",
			"There is more love ahead"
		],
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
		related: [
			"dance",
			"jazzy",
			"lit",
			"turnedup"
		]
	},
	{
		key: "silly",
		name: "Silly"
	},
	{
		key: "simple",
		name: "Simple"
	},
	{
		key: "singing",
		name: "Singing"
	},
	{
		key: "slurpy",
		name: "Slurpy"
	},
	{
		key: "small",
		name: "Small"
	},
	{
		key: "smokey",
		name: "Smokey"
	},
	{
		key: "social",
		name: "Social",
		affirmations: [
			"Get together with good energy"
		]
	},
	{
		key: "sober",
		name: "Sober"
	},
	{
		key: "solidarity",
		name: "In Solidarity",
		alias: "in-solidarity",
		definition: "Common good",
		affirmations: [
			"Goodness in groups multiplies"
		],
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
		name: "Soothing"
	},
	{
		key: "soulful",
		name: "Soulful"
	},
	{
		key: "sophisticated",
		name: "Sophisticated"
	},
	{
		key: "sparkly",
		name: "Sparkly",
		related: [
			"colorful",
			"glitter"
		]
	},
	{
		key: "special",
		name: "Special"
	},
	{
		key: "spicy",
		name: "Spicy"
	},
	{
		key: "spontaneous",
		name: "Spontaneous"
	},
	{
		key: "sporty",
		name: "Sporty"
	},
	{
		key: "spooky",
		name: "Spooky"
	},
	{
		key: "strange",
		name: "Strange"
	},
	{
		key: "subversive",
		name: "Subversive"
	},
	{
		key: "summer",
		name: "Summer",
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
		definition: "Full of warmth and light",
		affirmations: [
			"Sunshine unites all life"
		]
	},
	{
		key: "sustainable",
		name: "Sustainable",
		definition: "Good for the long term",
		related: [
			"earthy",
			"green",
			"healthy"
		]
	},
	{
		key: "supportive",
		name: "Supportive"
	},
	{
		key: "sweet",
		name: "Sweet"
	},
	{
		key: "tasty",
		name: "Tasty"
	},
	{
		key: "thrifting",
		name: "Thrifting",
		definition: "Using a second time",
		related: [
			"earthy",
			"vintage",
			"sustainable"
		]
	},
	{
		key: "throwback",
		name: "Throwback",
		definition: "Of another time",
		affirmations: [
			"Hold your memories close"
		],
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
		key: "together",
		name: "Togetherness",
		definition: "Closeness and shared experiences",
		affirmations: [
			"Belonging is a club for us all"
		],
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
		key: "tourist",
		name: "Tourist"
	},
	{
		key: "treatyourself",
		name: "Treat Yourself",
		definition: "You deserve it",
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
		related: [
			"warm",
			"natural",
			"aquatic",
			"fun",
			"colorful"
		]
	},
	{
		key: "transgender",
		name: "Transgender"
	},
	{
		key: "transit",
		name: "Transit"
	},
	{
		key: "tranquil",
		name: "Tranquil"
	},
	{
		key: "trendy",
		name: "Trendy",
		definition: "Currents of taste",
		affirmations: [
			"Drop into something new"
		],
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
		related: [
			"colorful",
			"eclectic",
			"lush",
			"warm",
			"wild"
		]
	},
	{
		key: "vegan",
		name: "Vegan"
	},
	{
		key: "views",
		name: "Views"
	},
	{
		key: "urban",
		name: "Urban"
	},
	{
		key: "ugly",
		name: "Ugly"
	},
	{
		key: "underground",
		name: "Underground",
		definition: "If you know, you know",
		affirmations: [
			"You find what you need where you least expect it"
		],
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
		name: "Unexpected"
	},
	{
		key: "unique",
		name: "Unique"
	},
	{
		key: "upscale",
		name: "Upscale"
	},
	{
		key: "vast",
		name: "Vast"
	},
	{
		key: "vibe"
	},
	{
		key: "vibrant",
		name: "Vibrant",
		definition: "Full of energy and life",
		affirmations: [
			"Your presence helps make vibrancy",
			"Feel the pulse of life"
		]
	},
	{
		key: "views",
		name: "Views",
		definition: "Pleasing landscapes or environments",
		affirmations: [
			"Be present and look beyond"
		],
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
		related: [
			"civic",
			"proud",
			"community",
			"solidarity"
		]
	},
	{
		key: "walk",
		name: "Walk"
	},
	{
		key: "warm",
		name: "Warm"
	},
	{
		key: "weekend",
		name: "Weekend"
	},
	{
		key: "western",
		name: "Western"
	},
	{
		key: "whimsical",
		name: "Whimsical",
		definition: "Carefree and playful amusement",
		affirmation: [
			"Have fun for fun's sake",
			"Welcome free expression"
		],
		related: [
			"playful",
			"dreamy",
			"eclectic",
			"quirky"
		]
	},
	{
		key: "wholesome",
		name: "Wholesome"
	},
	{
		key: "witchy",
		name: "Witchy",
		definition: "In possession of the supernatural",
		affirmations: [
			"Your magic is strong"
		],
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
		related: [
			"adventurous",
			"tropical",
			"radical",
			"crazy",
			"eclectic"
		]
	},
	{
		key: "weird",
		name: "Weird"
	},
	{
		key: "young",
		name: "Young"
	},
	{
		key: "zen",
		name: "Zen"
	}
];

var entrepreneurial = {
	creative: 0.5,
	innovative: 0.44,
	adventurous: 0.38,
	experiential: 0.38,
	vibrant: 0.36,
	artisanal: 0.34,
	imaginative: 0.34,
	diverse: 0.33,
	eclectic: 0.33,
	small: 0.31,
	multicultural: 0.31,
	educational: 0.31,
	artsy: 0.3,
	unique: 0.3,
	social: 0.29
};
var colorful = {
	whimsical: 0.61,
	quirky: 0.53,
	lively: 0.51,
	playful: 0.49,
	funky: 0.48,
	beautiful: 0.47,
	imaginative: 0.47,
	vibrant: 0.47,
	eclectic: 0.46,
	decorative: 0.46,
	kitschy: 0.45,
	floral: 0.45,
	memorable: 0.44,
	elegant: 0.44,
	delightful: 0.43
};
var alternative = {
	innovative: 0.41,
	cheap: 0.33,
	holistic: 0.31,
	oasis: 0.3,
	safe: 0.3,
	energy: 0.3,
	experimental: 0.3,
	"new": 0.28,
	inclusive: 0.26,
	vegan: 0.26,
	imaginative: 0.26,
	participatory: 0.25,
	adventurous: 0.24,
	restorative: 0.24,
	transit: 0.23
};
var artsy = {
	hipster: 0.64,
	funky: 0.6,
	kitschy: 0.58,
	eclectic: 0.57,
	trendy: 0.56,
	indie: 0.56,
	quirky: 0.54,
	whimsical: 0.51,
	retro: 0.49,
	vibe: 0.47,
	aesthetic: 0.47,
	art: 0.46,
	nerdy: 0.46,
	upscale: 0.45,
	adventurous: 0.45
};
var friendly = {
	lively: 0.42,
	warm: 0.41,
	cozy: 0.37,
	quiet: 0.36,
	generous: 0.35,
	entertaining: 0.34,
	casual: 0.34,
	gentle: 0.34,
	vibrant: 0.34,
	playful: 0.33,
	safe: 0.33,
	quirky: 0.33,
	classy: 0.33,
	relaxing: 0.32,
	fun: 0.32
};
var hiking = {
	scenic: 0.43,
	outdoors: 0.36,
	relaxing: 0.34,
	bike: 0.31,
	adventurous: 0.28,
	picturesque: 0.28,
	walk: 0.27,
	tourist: 0.27,
	surfing: 0.26,
	rugged: 0.21,
	romantic: 0.21,
	brunch: 0.2,
	gourmet: 0.2,
	garden: 0.2,
	fun: 0.2
};
var magical = {
	strange: 0.51,
	delightful: 0.5,
	memorable: 0.49,
	beautiful: 0.47,
	blissful: 0.45,
	fantastic: 0.45,
	heavenly: 0.45,
	weird: 0.45,
	whimsical: 0.43,
	imaginative: 0.43,
	divine: 0.42,
	joyful: 0.4,
	crazy: 0.39,
	unique: 0.39,
	exciting: 0.38
};
var absurd = {
	outrageous: 0.74,
	silly: 0.65,
	weird: 0.52,
	crazy: 0.51,
	strange: 0.5,
	funny: 0.45,
	whimsical: 0.4,
	interesting: 0.39,
	ugly: 0.37,
	surprising: 0.37,
	subversive: 0.36,
	imaginative: 0.35,
	entertaining: 0.33,
	kitschy: 0.31,
	simple: 0.31
};
var walk = {
	mingle: 0.31,
	laugh: 0.3,
	hiking: 0.27,
	bike: 0.3,
	dance: 0.27,
	crowded: 0.25,
	kids: 0.24,
	beautiful: 0.23,
	fun: 0.23,
	picturesque: 0.22,
	singing: 0.22,
	outdoors: 0.21,
	quiet: 0.21,
	popup: 0.21,
	feeling: 0.21
};
var views = {
	perspective: 0.36,
	picturesque: 0.28,
	unique: 0.26,
	scenic: 0.25,
	diverse: 0.24,
	inclusive: 0.22,
	serene: 0.22,
	holistic: 0.21,
	beautiful: 0.2,
	aesthetic: 0.2,
	airy: 0.19,
	rooftop: 0.19,
	radical: 0.19,
	ambiance: 0.18,
	cultural: 0.18
};
var spicy = {
	savory: 0.72,
	flavorful: 0.69,
	tasty: 0.66,
	yummy: 0.62,
	sweet: 0.54,
	earthy: 0.53,
	hearty: 0.46,
	mouthwatering: 0.44,
	sensual: 0.43,
	gourmet: 0.42,
	funky: 0.41,
	soulful: 0.39,
	decadent: 0.38,
	authentic: 0.38,
	delightful: 0.38
};
var relief = {
	calm: 0.22,
	feeling: 0.21,
	soothing: 0.2,
	healing: 0.2,
	rejuvenating: 0.19,
	free: 0.18,
	volunteer: 0.18,
	generous: 0.17,
	transit: 0.16,
	kindness: 0.16,
	fresh: 0.16,
	smooth: 0.16,
	quick: 0.15,
	safe: 0.15,
	special: 0.15
};
var big = {
	small: 0.5,
	fantastic: 0.39,
	dramatic: 0.36,
	quick: 0.35,
	crazy: 0.33,
	vast: 0.32,
	exciting: 0.31,
	happy: 0.31,
	surprising: 0.3,
	silly: 0.3,
	memorable: 0.29,
	sweet: 0.28,
	interesting: 0.28,
	ugly: 0.28,
	fun: 0.28
};
var loud = {
	quiet: 0.4,
	laugh: 0.38,
	funny: 0.35,
	hearty: 0.34,
	joyful: 0.34,
	soothing: 0.32,
	buzzing: 0.32,
	playful: 0.3,
	crazy: 0.3,
	singing: 0.3,
	crowded: 0.29,
	lively: 0.29,
	silly: 0.29,
	entertaining: 0.28,
	colorful: 0.27
};
var decadent = {
	sensual: 0.51,
	kitschy: 0.49,
	savory: 0.49,
	yummy: 0.45,
	tasty: 0.45,
	posh: 0.44,
	blissful: 0.43,
	gourmet: 0.42,
	trendy: 0.42,
	boozy: 0.42,
	elegant: 0.42,
	artsy: 0.41,
	flavorful: 0.41,
	romantic: 0.41,
	campy: 0.4
};
var kitschy = {
	campy: 0.68,
	whimsical: 0.63,
	retro: 0.63,
	artsy: 0.58,
	funky: 0.56,
	quirky: 0.56,
	nostalgic: 0.54,
	decadent: 0.49,
	trendy: 0.49,
	hipster: 0.48,
	playful: 0.46,
	colorful: 0.45,
	silly: 0.45,
	aesthetic: 0.44,
	funny: 0.43
};
var playful = {
	whimsical: 0.66,
	sensual: 0.56,
	quirky: 0.56,
	gentle: 0.55,
	joyful: 0.55,
	funny: 0.53,
	imaginative: 0.53,
	delightful: 0.52,
	funky: 0.5,
	lively: 0.5,
	colorful: 0.49,
	campy: 0.48,
	earthy: 0.47,
	adventurous: 0.47,
	soulful: 0.47
};
var bookish = {
	nerdy: 0.64,
	artsy: 0.39,
	quirky: 0.38,
	playful: 0.37,
	romantic: 0.35,
	gentle: 0.33,
	conversational: 0.33,
	young: 0.3,
	quiet: 0.3,
	elegant: 0.3,
	kitschy: 0.29,
	earthy: 0.37,
	hipster: 0.37,
	adventurous: 0.36,
	whimsical: 0.32
};
var dance = {
	jazz: 0.53,
	singing: 0.51,
	folk: 0.43,
	funky: 0.38,
	soulful: 0.37,
	sensual: 0.36,
	art: 0.36,
	raunchy: 0.35,
	celebration: 0.34,
	fun: 0.32,
	queer: 0.32,
	joyful: 0.31,
	fashion: 0.31,
	playful: 0.3,
	nightlife: 0.3
};
var floral = {
	decorative: 0.56,
	garden: 0.51,
	botanical: 0.48,
	colorful: 0.45,
	whimsical: 0.42,
	fashion: 0.4,
	gourmet: 0.39,
	beautiful: 0.38,
	earthy: 0.37,
	tarot: 0.37,
	elegant: 0.37,
	design: 0.36,
	savory: 0.36,
	sensual: 0.35,
	funky: 0.35
};
var urban = {
	nightlife: 0.37,
	cultural: 0.36,
	artsy: 0.35,
	upscale: 0.39,
	hipster: 0.35,
	multicultural: 0.35,
	social: 0.34,
	modern: 0.34,
	futuristic: 0.32,
	civic: 0.31,
	transit: 0.31,
	grimy: 0.31,
	aesthetic: 0.31,
	vibrant: 0.31,
	queer: 0.31
};
var civic = {
	community: 0.49,
	local: 0.49,
	cultural: 0.44,
	social: 0.4,
	"public": 0.39,
	volunteer: 0.39,
	activist: 0.33,
	educational: 0.33,
	urban: 0.31,
	multicultural: 0.3,
	participatory: 0.29,
	historic: 0.26,
	vibrant: 0.26,
	entrepreneurial: 0.23,
	intergenerational: 0.23
};
var outdoors = {
	garden: 0.39,
	sunny: 0.38,
	relaxing: 0.38,
	fun: 0.37,
	hiking: 0.36,
	cold: 0.35,
	kids: 0.34,
	warm: 0.34,
	adventurous: 0.33,
	chill: 0.3,
	love: 0.3,
	comfy: 0.3,
	bike: 0.28,
	children: 0.28,
	scenic: 0.28
};
var crazy = {
	weird: 0.71,
	silly: 0.6,
	strange: 0.52,
	absurd: 0.51,
	funny: 0.53,
	fun: 0.51,
	wild: 0.47,
	outrageous: 0.47,
	fantastic: 0.45,
	love: 0.44,
	cool: 0.44,
	laugh: 0.44,
	magical: 0.39,
	happy: 0.39,
	funky: 0.39
};
var intergenerational = {
	social: 0.44,
	cultural: 0.41,
	multicultural: 0.37,
	experiential: 0.34,
	emotional: 0.34,
	participatory: 0.34,
	educational: 0.32,
	community: 0.3,
	kids: 0.3,
	queer: 0.29,
	urban: 0.28,
	children: 0.28,
	inclusive: 0.26,
	interactive: 0.26,
	romantic: 0.25
};
var earthy = {
	soulful: 0.61,
	sensual: 0.59,
	spicy: 0.53,
	airy: 0.53,
	elegant: 0.52,
	funky: 0.51,
	flavorful: 0.5,
	playful: 0.47,
	whimsical: 0.47,
	savory: 0.46,
	sweet: 0.44,
	beautiful: 0.44,
	gentle: 0.44,
	quirky: 0.43,
	serene: 0.43
};
var upscale = {
	posh: 0.58,
	trendy: 0.54,
	artsy: 0.45,
	gourmet: 0.49,
	elegant: 0.48,
	eclectic: 0.43,
	ambiance: 0.42,
	casual: 0.4,
	decadent: 0.39,
	urban: 0.39,
	funky: 0.38,
	nightlife: 0.38,
	oasis: 0.36,
	classy: 0.36,
	kitschy: 0.35
};
var sunny = {
	warm: 0.54,
	serene: 0.47,
	beautiful: 0.46,
	picturesque: 0.46,
	cool: 0.46,
	cold: 0.43,
	chill: 0.42,
	tropical: 0.42,
	blissful: 0.39,
	outdoors: 0.38,
	relaxing: 0.38,
	airy: 0.37,
	quiet: 0.37,
	delightful: 0.35,
	comfy: 0.34
};
var adventurous = {
	imaginative: 0.57,
	eclectic: 0.51,
	playful: 0.47,
	artsy: 0.45,
	delightful: 0.44,
	quirky: 0.43,
	romantic: 0.43,
	creative: 0.41,
	lively: 0.39,
	entrepreneurial: 0.38,
	entertaining: 0.44,
	exciting: 0.42,
	tasty: 0.41,
	funky: 0.41,
	whimsical: 0.41
};
var peaceful = {
	serene: 0.47,
	safe: 0.34,
	sunny: 0.32,
	quiet: 0.47,
	calm: 0.46,
	joyful: 0.4,
	gentle: 0.36,
	spontaneous: 0.35,
	sober: 0.33,
	inclusive: 0.31,
	participatory: 0.31,
	smooth: 0.31,
	beautiful: 0.3,
	blissful: 0.29,
	relaxing: 0.29
};
var quick = {
	simple: 0.47,
	smooth: 0.38,
	big: 0.35,
	cheap: 0.33,
	tasty: 0.32,
	hearty: 0.32,
	classy: 0.31,
	spontaneous: 0.31,
	dramatic: 0.31,
	sweet: 0.3,
	gentle: 0.29,
	happy: 0.28,
	refreshing: 0.28,
	fantastic: 0.27,
	lively: 0.27
};
var social = {
	intergenerational: 0.44,
	participatory: 0.43,
	civic: 0.4,
	educational: 0.39,
	multicultural: 0.37,
	feminist: 0.35,
	urban: 0.34,
	holistic: 0.33,
	"public": 0.31,
	queer: 0.31,
	local: 0.3,
	entrepreneurial: 0.29,
	subversive: 0.29,
	conversational: 0.27,
	radical: 0.27
};
var cold = {
	chill: 0.63,
	warm: 0.6,
	cool: 0.46,
	sunny: 0.43,
	outdoors: 0.35,
	dark: 0.34,
	feeling: 0.3,
	tropical: 0.29,
	intense: 0.27,
	fresh: 0.27,
	cozy: 0.27,
	refreshing: 0.26,
	hearty: 0.25,
	comfy: 0.25,
	drinks: 0.25
};
var sensual = {
	soulful: 0.61,
	earthy: 0.59,
	romantic: 0.58,
	playful: 0.56,
	decadent: 0.51,
	beautiful: 0.5,
	funky: 0.48,
	intimate: 0.47,
	elegant: 0.47,
	whimsical: 0.46,
	joyful: 0.46,
	cinematic: 0.44,
	raunchy: 0.44,
	airy: 0.44,
	soothing: 0.44
};
var brunch = {
	yummy: 0.49,
	gourmet: 0.48,
	tasty: 0.46,
	celebration: 0.41,
	flavorful: 0.39,
	drinks: 0.38,
	decadent: 0.37,
	savory: 0.37,
	hearty: 0.37,
	jazz: 0.36,
	eclectic: 0.36,
	vegan: 0.34,
	mouthwatering: 0.34,
	relaxing: 0.33,
	mingle: 0.33
};
var exciting = {
	interesting: 0.67,
	fantastic: 0.62,
	adventurous: 0.42,
	entertaining: 0.55,
	fun: 0.51,
	memorable: 0.5,
	innovative: 0.49,
	unique: 0.46,
	refreshing: 0.46,
	imaginative: 0.42,
	beautiful: 0.41,
	vibrant: 0.41,
	delightful: 0.41,
	interactive: 0.4,
	lively: 0.39
};
var entertaining = {
	lively: 0.59,
	exciting: 0.55,
	interesting: 0.54,
	tasty: 0.46,
	playful: 0.44,
	colorful: 0.41,
	interactive: 0.4,
	whimsical: 0.39,
	fantastic: 0.38,
	casual: 0.35,
	friendly: 0.34,
	fun: 0.58,
	memorable: 0.57,
	funny: 0.55,
	delightful: 0.54
};
var transit = {
	urban: 0.31,
	tourist: 0.3,
	"public": 0.28,
	bike: 0.28,
	alternative: 0.23,
	civic: 0.22,
	energy: 0.21,
	cultural: 0.18,
	relief: 0.16,
	social: 0.16,
	hipster: 0.16,
	safe: 0.15,
	community: 0.14,
	jazz: 0.14,
	crowded: 0.14
};
var inclusive = {
	participatory: 0.45,
	holistic: 0.38,
	diverse: 0.37,
	multicultural: 0.37,
	vibrant: 0.34,
	authentic: 0.32,
	peaceful: 0.31,
	friendly: 0.29,
	experiential: 0.28,
	eclectic: 0.28,
	interactive: 0.27,
	alternative: 0.26,
	intergenerational: 0.26,
	adventurous: 0.26,
	educational: 0.26
};
var intense = {
	fierce: 0.68,
	emotional: 0.39,
	exciting: 0.31,
	interesting: 0.28,
	atmosphere: 0.27,
	crowded: 0.27,
	ugly: 0.25,
	busy: 0.25,
	playful: 0.24,
	dramatic: 0.33,
	quiet: 0.31,
	lively: 0.31,
	active: 0.3,
	intimate: 0.3,
	spontaneous: 0.28
};
var design = {
	aesthetic: 0.49,
	innovative: 0.42,
	creative: 0.41,
	elegant: 0.38,
	retro: 0.37,
	futuristic: 0.37,
	floral: 0.36,
	reuse: 0.36,
	decorative: 0.36,
	fashion: 0.34,
	art: 0.33,
	imaginative: 0.32,
	diy: 0.31,
	funky: 0.3,
	unique: 0.3
};
var chill = {
	cold: 0.63,
	warm: 0.54,
	cool: 0.49,
	sunny: 0.42,
	cozy: 0.38,
	vibe: 0.36,
	relaxing: 0.35,
	soothing: 0.33,
	comfy: 0.31,
	outdoors: 0.3,
	ambiance: 0.3,
	atmosphere: 0.3,
	dark: 0.3,
	feeling: 0.3,
	blissful: 0.29
};
var nostalgic = {
	retro: 0.61,
	kitschy: 0.54,
	classic: 0.49,
	whimsical: 0.46,
	joyful: 0.45,
	memorable: 0.45,
	funky: 0.44,
	soulful: 0.42,
	artsy: 0.41,
	campy: 0.41,
	authentic: 0.41,
	delightful: 0.41,
	funny: 0.4,
	quirky: 0.4,
	refreshing: 0.4
};
var active = {
	healthy: 0.41,
	popular: 0.31,
	intense: 0.3,
	diverse: 0.3,
	quiet: 0.3,
	positive: 0.3,
	participatory: 0.29,
	vibrant: 0.29,
	adventurous: 0.28,
	exciting: 0.27,
	innovative: 0.25,
	friendly: 0.24,
	lively: 0.23,
	inclusive: 0.21,
	radical: 0.21
};
var sweet = {
	yummy: 0.6,
	spicy: 0.54,
	tasty: 0.57,
	savory: 0.54,
	delightful: 0.53,
	beautiful: 0.47,
	flavorful: 0.47,
	soulful: 0.45,
	refreshing: 0.45,
	earthy: 0.44,
	funny: 0.44,
	gentle: 0.44,
	playful: 0.43,
	sensual: 0.41,
	blissful: 0.41
};
var gourmet = {
	tasty: 0.56,
	savory: 0.53,
	yummy: 0.53,
	artisanal: 0.53,
	vegan: 0.52,
	upscale: 0.49,
	mouthwatering: 0.49,
	brunch: 0.48,
	flavorful: 0.47,
	spicy: 0.42,
	decadent: 0.42,
	trendy: 0.42,
	eclectic: 0.41,
	floral: 0.39,
	hearty: 0.38
};
var blissful = {
	serene: 0.54,
	heavenly: 0.48,
	magical: 0.45,
	decadent: 0.43,
	zen: 0.43,
	sweet: 0.41,
	beautiful: 0.41,
	sunny: 0.39,
	nostalgic: 0.39,
	sensual: 0.38,
	oasis: 0.36,
	boozy: 0.35,
	yummy: 0.35,
	love: 0.35,
	cinematic: 0.32
};
var free = {
	open: 0.35,
	cheap: 0.32,
	safe: 0.29,
	healthy: 0.28,
	exclusive: 0.27,
	friendly: 0.24,
	"public": 0.23,
	quick: 0.23,
	special: 0.22,
	"new": 0.21,
	simple: 0.21,
	interactive: 0.2,
	vegan: 0.2,
	popular: 0.2,
	peaceful: 0.19
};
var kindness = {
	love: 0.44,
	generous: 0.38,
	gentle: 0.37,
	soul: 0.35,
	joyful: 0.32,
	family: 0.31,
	healing: 0.27,
	laugh: 0.25,
	mom: 0.23,
	warm: 0.23,
	playful: 0.22,
	civic: 0.22,
	earthy: 0.22,
	sweet: 0.22,
	divine: 0.34
};
var small = {
	big: 0.5,
	vast: 0.39,
	rare: 0.33,
	entrepreneurial: 0.31,
	simple: 0.31,
	quiet: 0.31,
	generous: 0.29,
	local: 0.28,
	artisanal: 0.27,
	friendly: 0.26,
	diverse: 0.26,
	artsy: 0.25,
	quirky: 0.25,
	young: 0.25,
	cheap: 0.25
};
var relaxing = {
	soothing: 0.51,
	serene: 0.49,
	fun: 0.46,
	rejuvenating: 0.45,
	comfy: 0.44,
	blissful: 0.43,
	cozy: 0.41,
	outdoors: 0.38,
	sunny: 0.38,
	picturesque: 0.38,
	refreshing: 0.37,
	quiet: 0.37,
	warm: 0.37,
	scenic: 0.37,
	beautiful: 0.36
};
var soulful = {
	earthy: 0.61,
	sensual: 0.61,
	soul: 0.58,
	singing: 0.53,
	joyful: 0.48,
	folk: 0.48,
	playful: 0.47,
	sweet: 0.45,
	vibe: 0.45,
	gentle: 0.44,
	eclectic: 0.43,
	nostalgic: 0.42,
	romantic: 0.42,
	delightful: 0.41,
	flavorful: 0.4
};
var balance = {
	healthy: 0.28,
	calm: 0.27,
	perspective: 0.26,
	mindful: 0.26,
	smooth: 0.22,
	athletic: 0.21,
	cool: 0.21,
	craft: 0.2,
	energy: 0.2,
	vibe: 0.19,
	natural: 0.19,
	feeling: 0.19,
	intergenerational: 0.17,
	ambiance: 0.17,
	atmosphere: 0.17
};
var funny = {
	entertaining: 0.55,
	playful: 0.53,
	crazy: 0.53,
	interesting: 0.52,
	whimsical: 0.49,
	absurd: 0.45,
	sweet: 0.44,
	funky: 0.44,
	kitschy: 0.43,
	beautiful: 0.42,
	yummy: 0.41,
	nostalgic: 0.4,
	love: 0.4,
	ugly: 0.38,
	colorful: 0.36
};
var games = {
	fun: 0.3,
	weekend: 0.26,
	entertaining: 0.23,
	friendly: 0.18,
	crazy: 0.18,
	magical: 0.17,
	outdoors: 0.17,
	big: 0.16,
	dance: 0.16,
	walk: 0.13,
	playful: 0.12,
	kids: 0.29,
	hip: 0.22,
	retro: 0.22,
	athletic: 0.21
};
var ambiance = {
	vibe: 0.69,
	atmosphere: 0.62,
	airy: 0.5,
	aesthetic: 0.49,
	oasis: 0.47,
	serene: 0.45,
	authentic: 0.44,
	nightlife: 0.43,
	elegant: 0.43,
	kitschy: 0.42,
	upscale: 0.42,
	funky: 0.42,
	artsy: 0.41,
	earthy: 0.4,
	beautiful: 0.4
};
var craft = {
	diy: 0.31,
	creative: 0.3,
	imaginative: 0.3,
	floral: 0.28,
	folk: 0.28,
	decorative: 0.26,
	quirky: 0.25,
	eclectic: 0.25,
	entrepreneurial: 0.24,
	dance: 0.24,
	design: 0.24,
	gourmet: 0.23,
	tarot: 0.23,
	colorful: 0.22,
	experimental: 0.22
};
var happy = {
	joyful: 0.42,
	crazy: 0.39,
	exciting: 0.38,
	sweet: 0.35,
	funny: 0.33,
	friendly: 0.31,
	big: 0.31,
	nostalgic: 0.31,
	blissful: 0.31,
	entertaining: 0.3,
	relaxing: 0.3,
	peaceful: 0.28,
	quick: 0.28,
	magical: 0.24,
	adventurous: 0.24
};
var cultural = {
	multicultural: 0.58,
	social: 0.51,
	civic: 0.44,
	intergenerational: 0.41,
	urban: 0.36,
	kitschy: 0.3,
	artsy: 0.28,
	entrepreneurial: 0.27,
	nostalgic: 0.26,
	decadent: 0.25,
	ambiance: 0.24,
	colorful: 0.23,
	"public": 0.23,
	dance: 0.22,
	sensual: 0.22
};
var experiential = {
	creative: 0.51,
	holistic: 0.45,
	unique: 0.44,
	imaginative: 0.44,
	educational: 0.44,
	innovative: 0.43,
	participatory: 0.4,
	entrepreneurial: 0.38,
	multicultural: 0.38,
	exciting: 0.36,
	intimate: 0.36,
	authentic: 0.36,
	intergenerational: 0.34,
	adventurous: 0.34,
	sensual: 0.34
};
var community = {
	civic: 0.49,
	local: 0.44,
	cultural: 0.39,
	social: 0.38,
	"public": 0.35,
	kindness: 0.31,
	intergenerational: 0.3,
	urban: 0.27,
	entrepreneurial: 0.23,
	peaceful: 0.23,
	active: 0.23,
	small: 0.23,
	ambiance: 0.22,
	inclusive: 0.21,
	artsy: 0.19
};
var trending = {
	trendy: 0.9,
	post: 0.8,
	hipster: 0.8,
	cool: 0.75,
	artsy: 0.65,
	upscale: 0.54,
	retro: 0.51,
	kitschy: 0.49,
	fashion: 0.49,
	nightlife: 0.48,
	fancy: 0.45,
	comfy: 0.43,
	decadent: 0.42,
	gourmet: 0.42,
	quirky: 0.42,
	classy: 0.42,
	eclectic: 0.42,
	elegant: 0.42
};
var trendy = {
	artsy: 0.56,
	upscale: 0.54,
	posh: 0.53,
	retro: 0.51,
	kitschy: 0.49,
	fashion: 0.49,
	nightlife: 0.48,
	fancy: 0.45,
	comfy: 0.43,
	decadent: 0.42,
	gourmet: 0.42,
	quirky: 0.42,
	classy: 0.42,
	eclectic: 0.42,
	elegant: 0.42
};
var atmosphere = {
	ambiance: 0.62,
	vibe: 0.56,
	chill: 0.3,
	friendly: 0.28,
	relaxing: 0.28,
	loud: 0.27,
	intense: 0.27,
	peaceful: 0.26,
	earthy: 0.25,
	sunny: 0.25,
	entertaining: 0.25,
	nostalgic: 0.23,
	spicy: 0.2,
	outdoors: 0.2,
	blissful: 0.2
};
var boozy = {
	raunchy: 0.43,
	decadent: 0.42,
	blissful: 0.35,
	bookish: 0.31,
	earthy: 0.29,
	kitschy: 0.28,
	funny: 0.27,
	artsy: 0.26,
	playful: 0.26,
	crazy: 0.26,
	brunch: 0.26,
	sweet: 0.26,
	nostalgic: 0.25,
	soulful: 0.25,
	colorful: 0.24
};
var indie = {
	artsy: 0.56,
	film: 0.47,
	eclectic: 0.43,
	quirky: 0.4,
	queer: 0.39,
	folk: 0.38,
	diy: 0.37,
	soulful: 0.36,
	campy: 0.36,
	retro: 0.36,
	kitschy: 0.35,
	vibe: 0.35,
	nerdy: 0.33,
	creative: 0.32,
	experimental: 0.31
};
var interesting = {
	exciting: 0.67,
	entertaining: 0.54,
	weird: 0.54,
	strange: 0.53,
	funny: 0.52,
	refreshing: 0.48,
	memorable: 0.46,
	fun: 0.45,
	delightful: 0.45,
	lively: 0.44,
	silly: 0.42,
	unique: 0.41,
	quirky: 0.41,
	absurd: 0.39,
	imaginative: 0.39
};
var open = {
	free: 0.35,
	"public": 0.26,
	active: 0.26,
	lively: 0.26,
	exciting: 0.25,
	airy: 0.25,
	quiet: 0.25,
	inclusive: 0.23,
	warm: 0.23,
	alternative: 0.22,
	friendly: 0.22,
	"new": 0.22,
	vibrant: 0.21,
	intimate: 0.21,
	eclectic: 0.21
};
var jazz = {
	folk: 0.58,
	soulful: 0.57,
	dance: 0.53,
	eclectic: 0.49,
	nightlife: 0.42,
	artsy: 0.39,
	sensual: 0.39,
	singing: 0.39,
	gourmet: 0.37,
	queer: 0.37,
	earthy: 0.36,
	brunch: 0.36,
	soul: 0.36,
	vibe: 0.35,
	nostalgic: 0.32
};
var ugly = {
	messy: 0.56,
	weird: 0.42,
	silly: 0.42,
	strange: 0.41,
	funny: 0.38,
	absurd: 0.37,
	outrageous: 0.37,
	interesting: 0.36,
	crazy: 0.35,
	colorful: 0.3,
	classy: 0.29,
	dramatic: 0.29,
	big: 0.28,
	entertaining: 0.28,
	raunchy: 0.28
};
var crowded = {
	buzzing: 0.33,
	upscale: 0.32,
	loud: 0.29,
	sunny: 0.28,
	intense: 0.27,
	colorful: 0.26,
	walk: 0.25,
	small: 0.24,
	ambiance: 0.24,
	urban: 0.23,
	cold: 0.23,
	exciting: 0.22,
	chill: 0.22,
	relaxing: 0.22,
	artsy: 0.21
};
var emotional = {
	intense: 0.39,
	joyful: 0.39,
	intergenerational: 0.34,
	social: 0.34,
	soulful: 0.34,
	earthy: 0.33,
	sensual: 0.33,
	nostalgic: 0.32,
	playful: 0.31,
	entertaining: 0.31,
	ugly: 0.28,
	magical: 0.27,
	funny: 0.27,
	kindness: 0.25,
	exciting: 0.24
};
var gay = {
	transgender: 0.74,
	social: 0.27,
	artsy: 0.22,
	bookish: 0.21,
	funny: 0.21,
	dance: 0.2,
	civic: 0.19,
	friendly: 0.18,
	inclusive: 0.18,
	urban: 0.17,
	"public": 0.17,
	upscale: 0.17,
	sensual: 0.17,
	loud: 0.16,
	intergenerational: 0.15
};
var cinematic = {
	film: 0.6,
	indie: 0.46,
	sensual: 0.44,
	kitschy: 0.41,
	artsy: 0.4,
	soulful: 0.39,
	nostalgic: 0.37,
	decadent: 0.36,
	magical: 0.35,
	blissful: 0.32,
	playful: 0.31,
	earthy: 0.31,
	entertaining: 0.29,
	adventurous: 0.28,
	ambiance: 0.26
};
var fantastic = {
	exciting: 0.62,
	delightful: 0.51,
	fun: 0.5,
	happy: 0.49,
	magical: 0.45,
	crazy: 0.45,
	classy: 0.45,
	interesting: 0.44,
	memorable: 0.44,
	unique: 0.43,
	weird: 0.43,
	big: 0.39,
	refreshing: 0.39,
	entertaining: 0.38,
	cool: 0.37
};
var tropical = {
	sunny: 0.42,
	botanical: 0.4,
	warm: 0.35,
	floral: 0.34,
	cool: 0.33,
	serene: 0.32,
	colorful: 0.31,
	sensual: 0.31,
	blissful: 0.31,
	relaxing: 0.31,
	natural: 0.31,
	earthy: 0.3,
	spicy: 0.29,
	cold: 0.29,
	decadent: 0.28
};
var rock = {
	jazz: 0.45,
	folk: 0.45,
	indie: 0.43,
	soulful: 0.39,
	kitschy: 0.3,
	artsy: 0.27,
	dance: 0.26,
	earthy: 0.25,
	decadent: 0.23,
	adventurous: 0.22,
	boozy: 0.21,
	nostalgic: 0.2,
	loud: 0.19,
	urban: 0.19,
	sensual: 0.19
};
var savory = {
	spicy: 0.72,
	flavorful: 0.72,
	sweet: 0.54,
	gourmet: 0.53,
	mouthwatering: 0.5,
	decadent: 0.49,
	earthy: 0.46,
	delightful: 0.46,
	sensual: 0.4,
	brunch: 0.37,
	authentic: 0.37,
	floral: 0.36,
	soulful: 0.36,
	adventurous: 0.35,
	romantic: 0.35
};
var interactive = {
	experiential: 0.62,
	innovative: 0.48,
	exciting: 0.4,
	entertaining: 0.4,
	colorful: 0.32,
	interesting: 0.31,
	inclusive: 0.27,
	intergenerational: 0.26,
	design: 0.26,
	magical: 0.24,
	friendly: 0.23,
	playful: 0.23,
	social: 0.23,
	"new": 0.23,
	active: 0.22
};
var heavenly = {
	blissful: 0.48,
	magical: 0.45,
	serene: 0.45,
	sweet: 0.41,
	joyful: 0.39,
	soothing: 0.39,
	sensual: 0.38,
	decadent: 0.37,
	soul: 0.37,
	witchy: 0.36,
	strange: 0.36,
	delightful: 0.36,
	earthy: 0.35,
	mouthwatering: 0.35,
	airy: 0.34
};
var exclusive = {
	unique: 0.39,
	special: 0.34,
	interactive: 0.31,
	innovative: 0.31,
	upscale: 0.28,
	exciting: 0.28,
	posh: 0.28,
	free: 0.27,
	"new": 0.26,
	intimate: 0.26,
	experiential: 0.25,
	diverse: 0.24,
	popular: 0.23,
	authentic: 0.23,
	inclusive: 0.22
};
var beautiful = {
	delightful: 0.6,
	fantastic: 0.52,
	sensual: 0.5,
	colorful: 0.47,
	magical: 0.47,
	sweet: 0.47,
	sunny: 0.46,
	earthy: 0.44,
	funny: 0.42,
	exciting: 0.41,
	blissful: 0.41,
	soulful: 0.41,
	artsy: 0.4,
	ambiance: 0.4,
	decadent: 0.39
};
var yummy = {
	spicy: 0.62,
	flavorful: 0.61,
	sweet: 0.6,
	gourmet: 0.53,
	mouthwatering: 0.53,
	delightful: 0.53,
	brunch: 0.49,
	fun: 0.46,
	decadent: 0.45,
	weird: 0.42,
	kitschy: 0.41,
	funny: 0.41,
	refreshing: 0.41,
	earthy: 0.38,
	comfy: 0.38
};
var grimy = {
	kitschy: 0.41,
	futuristic: 0.41,
	nostalgic: 0.37,
	earthy: 0.36,
	artsy: 0.34,
	decadent: 0.34,
	soulful: 0.34,
	urban: 0.31,
	blissful: 0.3,
	colorful: 0.29,
	sensual: 0.29,
	ambiance: 0.29,
	bookish: 0.25,
	playful: 0.24,
	sunny: 0.24
};
var tasty = {
	yummy: 0.79,
	flavorful: 0.74,
	savory: 0.67,
	spicy: 0.66,
	mouthwatering: 0.64,
	hearty: 0.59,
	sweet: 0.57,
	gourmet: 0.56,
	delightful: 0.55,
	brunch: 0.46,
	entertaining: 0.46,
	decadent: 0.45,
	funky: 0.43,
	fun: 0.42,
	refreshing: 0.42
};
var treat = {
	rare: 0.28,
	decadent: 0.23,
	spicy: 0.21,
	gourmet: 0.21,
	sweet: 0.2,
	walk: 0.18,
	kindness: 0.18,
	friendly: 0.17,
	entertaining: 0.17,
	alternative: 0.16,
	free: 0.16,
	craft: 0.16,
	relaxing: 0.15,
	funny: 0.15,
	relief: 0.14
};
var kink = {
	weird: 0.31,
	chill: 0.27,
	crazy: 0.2,
	artsy: 0.17,
	funny: 0.17,
	alternative: 0.16,
	relaxing: 0.16,
	sensual: 0.15,
	absurd: 0.14,
	"new": 0.14,
	blissful: 0.14,
	adventurous: 0.13,
	quick: 0.13,
	spicy: 0.12,
	relief: 0.12
};
var rugged = {
	scenic: 0.35,
	adventurous: 0.32,
	earthy: 0.29,
	beautiful: 0.29,
	outdoors: 0.25,
	bookish: 0.24,
	tropical: 0.23,
	colorful: 0.22,
	intense: 0.22,
	design: 0.22,
	sweet: 0.22,
	friendly: 0.21,
	hiking: 0.21,
	upscale: 0.21,
	soulful: 0.21
};
var funky = {
	retro: 0.68,
	artsy: 0.6,
	soulful: 0.59,
	kitschy: 0.56,
	trendy: 0.56,
	earthy: 0.51,
	playful: 0.5,
	colorful: 0.48,
	sensual: 0.48,
	nostalgic: 0.44,
	funny: 0.44,
	ambiance: 0.42,
	spicy: 0.41,
	adventurous: 0.41,
	crazy: 0.39
};
var divine = {
	heavenly: 0.7,
	magical: 0.42,
	soul: 0.39,
	tarot: 0.39,
	sensual: 0.38,
	witchy: 0.35,
	joyful: 0.35,
	healing: 0.35,
	kindness: 0.34,
	strange: 0.34,
	love: 0.33,
	natural: 0.33,
	blissful: 0.32,
	serene: 0.32,
	earthy: 0.31
};
var whimsical = {
	playful: 0.66,
	kitschy: 0.63,
	colorful: 0.61,
	funky: 0.55,
	artsy: 0.51,
	funny: 0.49,
	earthy: 0.47,
	sensual: 0.46,
	nostalgic: 0.46,
	magical: 0.43,
	floral: 0.42,
	beautiful: 0.42,
	adventurous: 0.41,
	absurd: 0.4,
	entertaining: 0.39
};
var athletic = {
	classy: 0.28,
	dance: 0.25,
	fashion: 0.25,
	kids: 0.23,
	artsy: 0.22,
	creative: 0.22,
	outdoors: 0.21,
	balance: 0.21,
	games: 0.21,
	educational: 0.2,
	civic: 0.19,
	cultural: 0.19,
	beautiful: 0.19,
	sensual: 0.18,
	multicultural: 0.18
};
var oasis = {
	serene: 0.48,
	ambiance: 0.47,
	atmosphere: 0.37,
	upscale: 0.36,
	blissful: 0.36,
	artsy: 0.34,
	relaxing: 0.33,
	decadent: 0.32,
	earthy: 0.31,
	alternative: 0.3,
	sunny: 0.29,
	gourmet: 0.29,
	urban: 0.28,
	nostalgic: 0.28,
	kitschy: 0.25
};
var surprising = {
	interesting: 0.57,
	strange: 0.57,
	absurd: 0.37,
	exciting: 0.35,
	funny: 0.35,
	happy: 0.32,
	ugly: 0.32,
	big: 0.3,
	crazy: 0.29,
	entertaining: 0.28,
	sweet: 0.28,
	magical: 0.27,
	quick: 0.25,
	intense: 0.21,
	kitschy: 0.2
};
var healthy = {
	active: 0.41,
	positive: 0.39,
	happy: 0.35,
	friendly: 0.29,
	free: 0.28,
	balance: 0.28,
	big: 0.27,
	relaxing: 0.26,
	adventurous: 0.24,
	peaceful: 0.24,
	entertaining: 0.24,
	inclusive: 0.24,
	sweet: 0.23,
	blissful: 0.23,
	entrepreneurial: 0.22
};
var casual = {
	retro: 0.44,
	trendy: 0.43,
	upscale: 0.4,
	conversational: 0.39,
	playful: 0.38,
	funky: 0.38,
	comfy: 0.37,
	elegant: 0.37,
	classy: 0.36,
	intimate: 0.35,
	quirky: 0.34,
	fancy: 0.33,
	fashion: 0.33,
	eclectic: 0.33,
	fun: 0.32
};
var hipster = {
	artsy: 0.64,
	trendy: 0.59,
	indie: 0.58,
	nerdy: 0.56,
	funky: 0.55,
	kitschy: 0.48,
	retro: 0.48,
	queer: 0.46,
	vibe: 0.45,
	nightlife: 0.43,
	campy: 0.43,
	grimy: 0.42,
	quirky: 0.41,
	eclectic: 0.41,
	comfy: 0.39
};
var bike = {
	hiking: 0.31,
	walk: 0.3,
	outdoors: 0.28,
	transit: 0.28,
	scenic: 0.26,
	craft: 0.25,
	urban: 0.21,
	sunny: 0.17,
	gourmet: 0.17,
	happy: 0.17,
	artsy: 0.16,
	peaceful: 0.16,
	brunch: 0.16,
	design: 0.16,
	"public": 0.15
};
var artisanal = {
	gourmet: 0.53,
	artsy: 0.38,
	savory: 0.36,
	entrepreneurial: 0.34,
	hipster: 0.34,
	flavorful: 0.34,
	trendy: 0.33,
	eclectic: 0.33,
	craft: 0.32,
	earthy: 0.31,
	upscale: 0.31,
	authentic: 0.3,
	floral: 0.29,
	funky: 0.29,
	decorative: 0.28
};
var old = {
	young: 0.42,
	bookish: 0.23,
	"new": 0.22,
	nostalgic: 0.22,
	sweet: 0.19,
	magical: 0.18,
	kitschy: 0.15,
	earthy: 0.15,
	sunny: 0.15,
	soulful: 0.15,
	playful: 0.14,
	crazy: 0.14,
	colorful: 0.13,
	friendly: 0.13,
	big: 0.13
};
var hearty = {
	tasty: 0.59,
	yummy: 0.47,
	spicy: 0.46,
	savory: 0.46,
	sweet: 0.41,
	gourmet: 0.38,
	brunch: 0.37,
	earthy: 0.36,
	heavenly: 0.35,
	loud: 0.34,
	playful: 0.33,
	boozy: 0.33,
	healthy: 0.33,
	decadent: 0.32,
	quick: 0.32
};
var activist = {
	feminist: 0.42,
	civic: 0.33,
	radical: 0.32,
	queer: 0.3,
	social: 0.28,
	gay: 0.26,
	folk: 0.24,
	active: 0.23,
	rebel: 0.23,
	participatory: 0.19,
	transgender: 0.19,
	bookish: 0.18,
	belonging: 0.18,
	eclectic: 0.18,
	party: 0.18
};
var zen = {
	serene: 0.52,
	blissful: 0.43,
	funky: 0.39,
	cool: 0.37,
	soothing: 0.37,
	artsy: 0.35,
	oasis: 0.35,
	hipster: 0.35,
	weird: 0.35,
	refreshing: 0.34,
	vibe: 0.34,
	kitschy: 0.33,
	playful: 0.33,
	relaxing: 0.33,
	conversational: 0.33
};
var art = {
	artsy: 0.46,
	jazz: 0.39,
	aesthetic: 0.37,
	eclectic: 0.37,
	dance: 0.36,
	creative: 0.36,
	craft: 0.35,
	modern: 0.35,
	decorative: 0.35,
	cultural: 0.34,
	whimsical: 0.34,
	folk: 0.34,
	kitschy: 0.33,
	design: 0.33,
	cinematic: 0.33
};
var safe = {
	healthy: 0.45,
	calm: 0.38,
	peaceful: 0.34,
	friendly: 0.33,
	happy: 0.32,
	alternative: 0.3,
	free: 0.29,
	tasty: 0.24,
	active: 0.23,
	relaxing: 0.23,
	adventurous: 0.22,
	loud: 0.21,
	outdoors: 0.21,
	quick: 0.21,
	entertaining: 0.2
};
var simple = {
	quick: 0.47,
	tasty: 0.35,
	whimsical: 0.32,
	absurd: 0.31,
	sweet: 0.31,
	small: 0.31,
	funny: 0.3,
	interesting: 0.3,
	casual: 0.3,
	beautiful: 0.29,
	colorful: 0.26,
	playful: 0.26,
	entertaining: 0.26,
	yummy: 0.26,
	friendly: 0.25
};
var busy = {
	crowded: 0.41,
	happy: 0.34,
	active: 0.33,
	relaxing: 0.33,
	crazy: 0.3,
	exciting: 0.3,
	entertaining: 0.3,
	sunny: 0.28,
	open: 0.26,
	big: 0.25,
	intense: 0.25,
	quick: 0.24,
	trendy: 0.24,
	fantastic: 0.24,
	healthy: 0.24
};
var garden = {
	floral: 0.51,
	outdoors: 0.39,
	beautiful: 0.33,
	gourmet: 0.32,
	oasis: 0.32,
	tropical: 0.3,
	whimsical: 0.29,
	sunny: 0.28,
	art: 0.28,
	brunch: 0.27,
	bike: 0.27,
	earthy: 0.25,
	zen: 0.25,
	colorful: 0.24,
	artsy: 0.24
};
var love = {
	beautiful: 0.5,
	crazy: 0.44,
	kindness: 0.44,
	funny: 0.4,
	sweet: 0.38,
	happy: 0.37,
	fantastic: 0.37,
	sensual: 0.35,
	blissful: 0.35,
	yummy: 0.35,
	magical: 0.33,
	divine: 0.33,
	soulful: 0.32,
	playful: 0.31,
	entertaining: 0.31
};
var vegan = {
	gourmet: 0.52,
	yummy: 0.45,
	trendy: 0.41,
	tasty: 0.41,
	hipster: 0.39,
	flavorful: 0.38,
	artisanal: 0.36,
	decadent: 0.35,
	artsy: 0.34,
	brunch: 0.34,
	savory: 0.34,
	queer: 0.34,
	feminist: 0.34,
	spicy: 0.32,
	funky: 0.32
};
var legacy = {
	family: 0.26,
	modern: 0.26,
	soul: 0.24,
	historic: 0.24,
	vast: 0.23,
	nostalgic: 0.22,
	perspective: 0.22,
	cultural: 0.21,
	vibrant: 0.21,
	inspired: 0.2,
	reuse: 0.2,
	community: 0.18,
	mindful: 0.18,
	love: 0.17,
	diverse: 0.17
};
var weekend = {
	festive: 0.36,
	sunny: 0.26,
	games: 0.26,
	brunch: 0.25,
	picturesque: 0.25,
	busy: 0.24,
	celebration: 0.24,
	relaxing: 0.23,
	fun: 0.23,
	boozy: 0.22,
	memorable: 0.22,
	buzzing: 0.22,
	entertaining: 0.21,
	happy: 0.21,
	outdoors: 0.19
};
var volunteer = {
	community: 0.42,
	civic: 0.39,
	local: 0.37,
	kindness: 0.33,
	active: 0.3,
	entrepreneurial: 0.26,
	social: 0.24,
	activist: 0.23,
	experiential: 0.2,
	garden: 0.2,
	educational: 0.29,
	kids: 0.25,
	generous: 0.24,
	mom: 0.24,
	children: 0.23
};
var mingle = {
	brunch: 0.33,
	crowded: 0.33,
	walk: 0.31,
	treat: 0.3,
	casual: 0.29,
	dance: 0.27,
	entertaining: 0.27,
	love: 0.26,
	atmosphere: 0.25,
	ambiance: 0.24,
	colorful: 0.23,
	artsy: 0.23,
	yummy: 0.23,
	chill: 0.22,
	relaxing: 0.22
};
var unexpected = {
	surprising: 0.55,
	emotional: 0.35,
	interesting: 0.33,
	magical: 0.3,
	exciting: 0.29,
	absurd: 0.28,
	"new": 0.28,
	big: 0.27,
	divine: 0.27,
	heavenly: 0.25,
	ugly: 0.24,
	adventurous: 0.23,
	quick: 0.23,
	kink: 0.23,
	entertaining: 0.22
};
var children = {
	outdoors: 0.28,
	intergenerational: 0.28,
	community: 0.27,
	old: 0.26,
	"public": 0.25,
	social: 0.24,
	safe: 0.24,
	volunteer: 0.23,
	cultural: 0.21,
	garden: 0.21,
	kindness: 0.2,
	healthy: 0.19,
	urban: 0.18,
	peaceful: 0.18,
	games: 0.18
};
var wild = {
	crazy: 0.47,
	magical: 0.35,
	playful: 0.33,
	adventurous: 0.33,
	weird: 0.33,
	tropical: 0.31,
	colorful: 0.3,
	raunchy: 0.3,
	silly: 0.3,
	cool: 0.29,
	strange: 0.29,
	rare: 0.29,
	whimsical: 0.28,
	delightful: 0.28,
	scenic: 0.28
};
var surfing = {
	relaxing: 0.3,
	outdoors: 0.27,
	bike: 0.27,
	hiking: 0.26,
	fun: 0.26,
	zen: 0.23,
	diy: 0.23,
	cool: 0.22,
	nightlife: 0.22,
	sunny: 0.21,
	casual: 0.21,
	hipster: 0.21,
	popup: 0.21,
	adventurous: 0.2,
	jazz: 0.2
};
var dope = {
	hipster: 0.33,
	soul: 0.31,
	vibe: 0.3,
	crazy: 0.29,
	funky: 0.29,
	boozy: 0.26,
	queer: 0.24,
	kids: 0.23,
	raunchy: 0.23,
	mom: 0.23,
	sober: 0.23,
	weird: 0.23,
	indie: 0.21,
	grimy: 0.21,
	bike: 0.21
};
var energy = {
	alternative: 0.3,
	atmosphere: 0.23,
	entrepreneurial: 0.21,
	transit: 0.21,
	peaceful: 0.2,
	balance: 0.2,
	healthy: 0.2,
	athletic: 0.19,
	outdoors: 0.18,
	intense: 0.18,
	wild: 0.18,
	cold: 0.17,
	chill: 0.17,
	vegan: 0.17,
	big: 0.16
};
var witchy = {
	magical: 0.38,
	sensual: 0.37,
	funky: 0.37,
	earthy: 0.36,
	heavenly: 0.36,
	yummy: 0.36,
	artsy: 0.35,
	divine: 0.35,
	whimsical: 0.34,
	hipster: 0.34,
	sweet: 0.32,
	soulful: 0.31,
	funny: 0.31,
	beautiful: 0.3,
	kitschy: 0.29
};
var fun = {
	entertaining: 0.58,
	funny: 0.58,
	crazy: 0.51,
	exciting: 0.51,
	fantastic: 0.5,
	playful: 0.47,
	love: 0.47,
	relaxing: 0.46,
	yummy: 0.46,
	interesting: 0.45,
	beautiful: 0.43,
	tasty: 0.42,
	funky: 0.42,
	happy: 0.39,
	whimsical: 0.38
};
var gentle = {
	playful: 0.55,
	earthy: 0.44,
	sweet: 0.44,
	soulful: 0.44,
	sensual: 0.43,
	kindness: 0.37,
	peaceful: 0.36,
	hearty: 0.36,
	beautiful: 0.35,
	whimsical: 0.35,
	friendly: 0.34,
	bookish: 0.33,
	funny: 0.33,
	heavenly: 0.33,
	relaxing: 0.32
};
var kids = {
	children: 0.74,
	mom: 0.56,
	fun: 0.5,
	young: 0.43,
	outdoors: 0.34,
	educational: 0.34,
	crazy: 0.33,
	family: 0.32,
	intergenerational: 0.3,
	yummy: 0.3,
	love: 0.3,
	laugh: 0.3,
	funny: 0.29,
	games: 0.29,
	community: 0.29
};
var unique = {
	exciting: 0.46,
	experiential: 0.44,
	fantastic: 0.43,
	interesting: 0.41,
	"new": 0.4,
	interactive: 0.4,
	magical: 0.39,
	exclusive: 0.39,
	beautiful: 0.37,
	colorful: 0.32,
	whimsical: 0.32,
	entrepreneurial: 0.3,
	design: 0.3,
	funky: 0.28,
	adventurous: 0.27
};
var picturesque = {
	beautiful: 0.58,
	sunny: 0.46,
	oasis: 0.41,
	ambiance: 0.4,
	colorful: 0.39,
	relaxing: 0.38,
	artsy: 0.33,
	earthy: 0.32,
	upscale: 0.32,
	nostalgic: 0.32,
	magical: 0.31,
	rugged: 0.31,
	decadent: 0.3,
	kitschy: 0.3,
	blissful: 0.3
};
var diverse = {
	eclectic: 0.61,
	unique: 0.53,
	multicultural: 0.54,
	vibrant: 0.48,
	innovative: 0.47,
	colorful: 0.37,
	inclusive: 0.37,
	vast: 0.37,
	exciting: 0.36,
	creative: 0.36,
	entrepreneurial: 0.33,
	imaginative: 0.33,
	cultural: 0.32,
	holistic: 0.32,
	educational: 0.32
};
var holistic = {
	experiential: 0.45,
	unique: 0.4,
	participatory: 0.4,
	inclusive: 0.38,
	restorative: 0.37,
	innovative: 0.35,
	rejuvenating: 0.34,
	perspective: 0.34,
	healing: 0.34,
	social: 0.33,
	diverse: 0.32,
	tarot: 0.32,
	alternative: 0.31,
	multicultural: 0.31,
	soothing: 0.31
};
var quirky = {
	whimsical: 0.66,
	funky: 0.59,
	kitschy: 0.56,
	playful: 0.56,
	funny: 0.55,
	artsy: 0.54,
	colorful: 0.53,
	earthy: 0.43,
	adventurous: 0.43,
	trendy: 0.42,
	entertaining: 0.41,
	interesting: 0.41,
	hipster: 0.41,
	nostalgic: 0.4,
	indie: 0.4
};
var hip = {
	trendy: 0.4,
	hipster: 0.38,
	retro: 0.38,
	funky: 0.33,
	artsy: 0.3,
	quirky: 0.28,
	playful: 0.25,
	upscale: 0.25,
	healthy: 0.23,
	kitschy: 0.22,
	nostalgic: 0.22,
	games: 0.22,
	indie: 0.22,
	casual: 0.22,
	soulful: 0.2
};
var photo = {
	floral: 0.2,
	art: 0.2,
	artsy: 0.18,
	beautiful: 0.18,
	scenic: 0.17,
	kitschy: 0.16,
	exclusive: 0.16,
	colorful: 0.15,
	playful: 0.15,
	nostalgic: 0.15,
	design: 0.14,
	craft: 0.14,
	volunteer: 0.14,
	picturesque: 0.14,
	outdoors: 0.13
};
var young = {
	kids: 0.43,
	old: 0.42,
	children: 0.41,
	beautiful: 0.31,
	bookish: 0.3,
	adventurous: 0.3,
	healthy: 0.3,
	love: 0.29,
	nerdy: 0.29,
	gay: 0.28,
	entrepreneurial: 0.27,
	joyful: 0.27,
	classy: 0.27,
	transgender: 0.27,
	big: 0.26
};
var comfy = {
	funky: 0.5,
	relaxing: 0.44,
	trendy: 0.43,
	blissful: 0.42,
	artsy: 0.39,
	hipster: 0.39,
	yummy: 0.38,
	ambiance: 0.37,
	casual: 0.37,
	beautiful: 0.35,
	kitschy: 0.34,
	sunny: 0.34,
	sweet: 0.34,
	tasty: 0.34,
	nostalgic: 0.33
};
var outrageous = {
	absurd: 0.74,
	crazy: 0.47,
	funny: 0.42,
	ugly: 0.37,
	surprising: 0.35,
	decadent: 0.33,
	entertaining: 0.33,
	unexpected: 0.32,
	interesting: 0.31,
	whimsical: 0.31,
	fantastic: 0.29,
	colorful: 0.28,
	kitschy: 0.26,
	exciting: 0.24,
	boozy: 0.24
};
var refreshing = {
	interesting: 0.48,
	surprising: 0.47,
	exciting: 0.46,
	sweet: 0.45,
	tasty: 0.42,
	funky: 0.42,
	entertaining: 0.41,
	funny: 0.41,
	yummy: 0.41,
	nostalgic: 0.4,
	fantastic: 0.39,
	beautiful: 0.39,
	playful: 0.37,
	relaxing: 0.37,
	spicy: 0.36
};
var cool = {
	chill: 0.49,
	sunny: 0.46,
	cold: 0.46,
	crazy: 0.44,
	funny: 0.44,
	sweet: 0.41,
	funky: 0.41,
	beautiful: 0.38,
	fantastic: 0.37,
	yummy: 0.37,
	zen: 0.37,
	artsy: 0.36,
	trendy: 0.36,
	interesting: 0.36,
	playful: 0.35
};
var flavorful = {
	tasty: 0.74,
	savory: 0.72,
	spicy: 0.69,
	yummy: 0.61,
	earthy: 0.5,
	hearty: 0.48,
	sweet: 0.47,
	gourmet: 0.47,
	sensual: 0.42,
	decadent: 0.41,
	soulful: 0.4,
	brunch: 0.39,
	adventurous: 0.38,
	entertaining: 0.38,
	ambiance: 0.38
};
var rejuvenating = {
	relaxing: 0.45,
	magical: 0.32,
	nostalgic: 0.31,
	oasis: 0.29,
	healthy: 0.28,
	ambiance: 0.27,
	blissful: 0.26,
	"new": 0.25,
	fantastic: 0.25,
	beautiful: 0.25,
	funky: 0.25,
	exciting: 0.23,
	experiential: 0.23,
	trendy: 0.23,
	grimy: 0.23
};
var strange = {
	weird: 0.82,
	surprising: 0.57,
	interesting: 0.53,
	crazy: 0.52,
	magical: 0.51,
	funny: 0.51,
	absurd: 0.5,
	quirky: 0.5,
	ugly: 0.41,
	unexpected: 0.41,
	whimsical: 0.4,
	outrageous: 0.39,
	refreshing: 0.39,
	beautiful: 0.38,
	heavenly: 0.36
};
var joyful = {
	playful: 0.55,
	blissful: 0.53,
	soulful: 0.48,
	beautiful: 0.48,
	delightful: 0.48,
	sensual: 0.46,
	fun: 0.46,
	nostalgic: 0.45,
	whimsical: 0.45,
	happy: 0.42,
	colorful: 0.4,
	magical: 0.4,
	peaceful: 0.4,
	sweet: 0.4,
	emotional: 0.39
};
var cheap = {
	simple: 0.36,
	trendy: 0.35,
	tasty: 0.34,
	alternative: 0.33,
	quick: 0.33,
	silly: 0.33,
	free: 0.32,
	comfy: 0.32,
	kitschy: 0.29,
	safe: 0.29,
	funny: 0.27,
	crazy: 0.26,
	sweet: 0.26,
	yummy: 0.26,
	absurd: 0.25
};
var conversational = {
	playful: 0.44,
	gentle: 0.4,
	earthy: 0.39,
	casual: 0.39,
	lively: 0.39,
	quirky: 0.37,
	funny: 0.36,
	spontaneous: 0.36,
	intimate: 0.35,
	sensual: 0.34,
	experiential: 0.34,
	bookish: 0.33,
	entertaining: 0.33,
	interactive: 0.33,
	zen: 0.33
};
var raunchy = {
	campy: 0.51,
	playful: 0.44,
	sensual: 0.44,
	funny: 0.44,
	boozy: 0.43,
	kitschy: 0.42,
	funky: 0.41,
	outrageous: 0.4,
	spicy: 0.35,
	dance: 0.35,
	quirky: 0.35,
	soulful: 0.34,
	artsy: 0.33,
	entertaining: 0.33,
	gay: 0.33
};
var multicultural = {
	cultural: 0.58,
	diverse: 0.54,
	queer: 0.46,
	experiential: 0.38,
	intergenerational: 0.37,
	social: 0.37,
	inclusive: 0.37,
	urban: 0.35,
	community: 0.35,
	colorful: 0.32,
	jazz: 0.32,
	unique: 0.32,
	entrepreneurial: 0.31,
	artsy: 0.31,
	gay: 0.31
};
var sharing = {
	intimate: 0.28,
	inclusive: 0.24,
	"new": 0.23,
	love: 0.22,
	mingle: 0.22,
	relaxing: 0.21,
	social: 0.2,
	interactive: 0.2,
	surfing: 0.2,
	friendly: 0.19,
	intergenerational: 0.19,
	free: 0.18,
	simple: 0.18,
	playful: 0.17,
	exclusive: 0.17
};
var dark = {
	grimy: 0.4,
	strange: 0.37,
	weird: 0.35,
	cool: 0.3,
	witchy: 0.26,
	quiet: 0.35,
	cold: 0.34,
	magical: 0.33,
	airy: 0.33,
	cozy: 0.33,
	sunny: 0.32,
	warm: 0.32,
	beautiful: 0.31,
	futuristic: 0.31,
	chill: 0.3
};
var serene = {
	picturesque: 0.61,
	beautiful: 0.56,
	blissful: 0.54,
	zen: 0.52,
	relaxing: 0.49,
	oasis: 0.48,
	sunny: 0.47,
	peaceful: 0.47,
	ambiance: 0.45,
	heavenly: 0.45,
	earthy: 0.43,
	sensual: 0.43,
	whimsical: 0.39,
	colorful: 0.38,
	playful: 0.38
};
var international = {
	cultural: 0.27,
	community: 0.24,
	"public": 0.23,
	civic: 0.2,
	intense: 0.2,
	social: 0.19,
	"new": 0.18,
	entrepreneurial: 0.17,
	upscale: 0.17,
	fantastic: 0.17,
	urban: 0.16,
	exclusive: 0.16,
	friendly: 0.15,
	peaceful: 0.15,
	inclusive: 0.15
};
var soul = {
	soulful: 0.58,
	sensual: 0.42,
	love: 0.41,
	divine: 0.39,
	heavenly: 0.37,
	funky: 0.37,
	jazz: 0.36,
	kindness: 0.35,
	earthy: 0.34,
	sweet: 0.31,
	ambiance: 0.31,
	emotional: 0.31,
	beautiful: 0.31,
	grimy: 0.31,
	dope: 0.31
};
var fancy = {
	funky: 0.46,
	trendy: 0.45,
	artsy: 0.38,
	kitschy: 0.38,
	crazy: 0.35,
	adventurous: 0.35,
	gourmet: 0.35,
	tasty: 0.34,
	whimsical: 0.34,
	decadent: 0.33,
	beautiful: 0.33,
	casual: 0.33,
	yummy: 0.32,
	upscale: 0.31,
	simple: 0.31
};
var film = {
	cinematic: 0.6,
	indie: 0.47,
	novel: 0.39,
	artsy: 0.31,
	art: 0.28,
	funny: 0.27,
	raunchy: 0.27,
	kitschy: 0.24,
	sensual: 0.24,
	soulful: 0.24,
	dance: 0.23,
	nostalgic: 0.21,
	jazz: 0.2,
	entertaining: 0.19,
	cultural: 0.19
};
var airy = {
	elegant: 0.57,
	earthy: 0.53,
	serene: 0.51,
	ambiance: 0.5,
	funky: 0.5,
	comfy: 0.48,
	whimsical: 0.47,
	sensual: 0.44,
	flavorful: 0.4,
	soothing: 0.44,
	beautiful: 0.43,
	cozy: 0.42,
	artsy: 0.41,
	playful: 0.41,
	oasis: 0.4
};
var subversive = {
	absurd: 0.36,
	playful: 0.36,
	decadent: 0.35,
	kitschy: 0.35,
	funny: 0.35,
	whimsical: 0.34,
	sensual: 0.31,
	cinematic: 0.3,
	artsy: 0.29,
	social: 0.29,
	entertaining: 0.29,
	hipster: 0.29,
	adventurous: 0.28,
	peaceful: 0.27,
	bookish: 0.26
};
var nightlife = {
	trendy: 0.48,
	ambiance: 0.43,
	hipster: 0.43,
	jazz: 0.42,
	artsy: 0.41,
	decadent: 0.39,
	upscale: 0.38,
	oasis: 0.38,
	urban: 0.37,
	gourmet: 0.34,
	funky: 0.34,
	cultural: 0.33,
	brunch: 0.32,
	dance: 0.3,
	relaxing: 0.3
};
var family = {
	mom: 0.49,
	community: 0.43,
	children: 0.42,
	kids: 0.32,
	kindness: 0.31,
	emotional: 0.29,
	legacy: 0.26,
	social: 0.25,
	joyful: 0.25,
	fun: 0.2,
	quiet: 0.25,
	party: 0.25,
	love: 0.24,
	relaxing: 0.23,
	old: 0.23
};
var vibe = {
	ambiance: 0.69,
	funky: 0.57,
	atmosphere: 0.56,
	retro: 0.49,
	artsy: 0.47,
	soulful: 0.45,
	hipster: 0.45,
	nightlife: 0.41,
	nostalgic: 0.4,
	soul: 0.4,
	airy: 0.4,
	earthy: 0.39,
	fun: 0.39,
	cool: 0.38,
	kitschy: 0.37
};
var memorable = {
	entertaining: 0.57,
	delightful: 0.53,
	exciting: 0.5,
	magical: 0.49,
	interesting: 0.46,
	nostalgic: 0.45,
	funny: 0.45,
	beautiful: 0.45,
	colorful: 0.44,
	fantastic: 0.44,
	joyful: 0.44,
	fun: 0.39,
	tasty: 0.38,
	refreshing: 0.38,
	cinematic: 0.37
};
var soothing = {
	serene: 0.56,
	relaxing: 0.51,
	gentle: 0.51,
	blissful: 0.46,
	sensual: 0.44,
	rejuvenating: 0.44,
	airy: 0.44,
	earthy: 0.42,
	refreshing: 0.42,
	restorative: 0.41,
	soulful: 0.4,
	joyful: 0.4,
	healing: 0.4,
	warm: 0.4,
	sweet: 0.39
};
var experimental = {
	futuristic: 0.38,
	quirky: 0.33,
	eclectic: 0.36,
	artsy: 0.35,
	innovative: 0.35,
	adventurous: 0.31,
	indie: 0.31,
	funky: 0.31,
	whimsical: 0.31,
	novel: 0.31,
	alternative: 0.3,
	art: 0.3,
	aesthetic: 0.3,
	design: 0.29,
	imaginative: 0.29
};
var aesthetic = {
	design: 0.49,
	ambiance: 0.49,
	artsy: 0.47,
	decorative: 0.45,
	kitschy: 0.44,
	cinematic: 0.43,
	earthy: 0.41,
	sensual: 0.41,
	cultural: 0.4,
	funky: 0.39,
	whimsical: 0.39,
	vibe: 0.39,
	hipster: 0.38,
	trendy: 0.37,
	art: 0.37
};
var rooftop = {
	garden: 0.33,
	posh: 0.31,
	sunny: 0.26,
	outdoors: 0.25,
	airy: 0.22,
	picturesque: 0.21,
	nightlife: 0.21,
	diverse: 0.19,
	serene: 0.19,
	cool: 0.18,
	aesthetic: 0.18,
	unique: 0.17,
	joyful: 0.16,
	film: 0.16,
	holistic: 0.15
};
var participatory = {
	inclusive: 0.45,
	social: 0.43,
	experiential: 0.4,
	holistic: 0.4,
	interactive: 0.39,
	intergenerational: 0.34,
	peaceful: 0.31,
	community: 0.3,
	urban: 0.29,
	civic: 0.29,
	active: 0.29,
	entrepreneurial: 0.27,
	cultural: 0.26,
	casual: 0.26,
	alternative: 0.25
};
var popular = {
	favorite: 0.48,
	trendy: 0.4,
	colorful: 0.37,
	memorable: 0.34,
	interesting: 0.33,
	quirky: 0.33,
	unique: 0.3,
	diverse: 0.29,
	cheap: 0.26,
	classic: 0.33,
	friendly: 0.32,
	entertaining: 0.31,
	active: 0.31,
	simple: 0.31,
	inspired: 0.31
};
var quiet = {
	serene: 0.55,
	gentle: 0.45,
	cool: 0.4,
	lively: 0.39,
	smooth: 0.37,
	soothing: 0.36,
	calm: 0.63,
	peaceful: 0.47,
	busy: 0.44,
	loud: 0.4,
	sunny: 0.37,
	relaxing: 0.37,
	friendly: 0.36,
	safe: 0.36,
	classy: 0.36
};
var tourist = {
	nightlife: 0.44,
	picturesque: 0.4,
	cultural: 0.34,
	transit: 0.3,
	kitschy: 0.29,
	hiking: 0.27,
	tropical: 0.26,
	artsy: 0.25,
	upscale: 0.25,
	ambiance: 0.25,
	trendy: 0.23,
	crowded: 0.23,
	civic: 0.22,
	gourmet: 0.22,
	beautiful: 0.22
};
var festive = {
	joyful: 0.43,
	colorful: 0.4,
	celebration: 0.4,
	weekend: 0.36,
	nostalgic: 0.34,
	busy: 0.34,
	tasty: 0.33,
	floral: 0.32,
	fun: 0.32,
	decadent: 0.31,
	brunch: 0.3,
	entertaining: 0.3,
	relaxing: 0.3,
	boozy: 0.3,
	savory: 0.3
};
var mouthwatering = {
	tasty: 0.64,
	yummy: 0.53,
	savory: 0.5,
	gourmet: 0.49,
	flavorful: 0.47,
	spicy: 0.44,
	delightful: 0.44,
	memorable: 0.42,
	entertaining: 0.39,
	exciting: 0.36,
	fantastic: 0.36,
	hearty: 0.36,
	fancy: 0.36,
	decadent: 0.35,
	heavenly: 0.35
};
var folk = {
	jazz: 0.58,
	soulful: 0.48,
	rock: 0.45,
	dance: 0.43,
	earthy: 0.42,
	funky: 0.4,
	artsy: 0.38,
	indie: 0.38,
	nostalgic: 0.37,
	cultural: 0.37,
	kitschy: 0.35,
	hipster: 0.35,
	art: 0.34,
	whimsical: 0.33,
	urban: 0.29
};
var local = {
	civic: 0.49,
	community: 0.44,
	volunteer: 0.37,
	"public": 0.36,
	international: 0.33,
	social: 0.3,
	cultural: 0.3,
	urban: 0.28,
	small: 0.28,
	special: 0.26,
	folk: 0.24,
	"new": 0.22,
	craft: 0.21,
	multicultural: 0.21,
	entrepreneurial: 0.2
};
var calm = {
	quiet: 0.63,
	cool: 0.48,
	serene: 0.48,
	peaceful: 0.46,
	soothing: 0.44,
	smooth: 0.41,
	sober: 0.39,
	safe: 0.38,
	gentle: 0.38,
	warm: 0.34,
	atmosphere: 0.31,
	sunny: 0.3,
	relaxing: 0.3,
	healthy: 0.3,
	chill: 0.29
};
var belonging = {
	small: 0.19,
	activist: 0.18,
	family: 0.18,
	sharing: 0.17,
	rebel: 0.19,
	subversive: 0.17,
	posh: 0.17,
	upscale: 0.16,
	nostalgic: 0.16,
	cultural: 0.16,
	old: 0.16,
	authentic: 0.16,
	civic: 0.15,
	active: 0.15,
	southern: 0.15
};
var classy = {
	beautiful: 0.52,
	entertaining: 0.48,
	funky: 0.46,
	fancy: 0.46,
	fantastic: 0.45,
	cool: 0.43,
	memorable: 0.43,
	trendy: 0.42,
	playful: 0.41,
	sweet: 0.41,
	funny: 0.41,
	comfy: 0.41,
	quirky: 0.39,
	refreshing: 0.39,
	artsy: 0.38
};
var rebel = {
	subversive: 0.3,
	activist: 0.23,
	sensual: 0.18,
	gay: 0.17,
	peaceful: 0.16,
	rugged: 0.15,
	dope: 0.15,
	bookish: 0.14,
	small: 0.14,
	boozy: 0.14,
	tropical: 0.14,
	civic: 0.13,
	adventurous: 0.12,
	grimy: 0.12,
	hipster: 0.12
};
var modern = {
	futuristic: 0.51,
	aesthetic: 0.38,
	unique: 0.34,
	folk: 0.32,
	quirky: 0.31,
	airy: 0.31,
	fancy: 0.3,
	popular: 0.29,
	multicultural: 0.28,
	diverse: 0.26,
	cheap: 0.26,
	classic: 0.46,
	retro: 0.38,
	elegant: 0.38,
	"new": 0.37
};
var perspective = {
	views: 0.36,
	interesting: 0.35,
	holistic: 0.34,
	unique: 0.31,
	vibe: 0.28,
	balance: 0.26,
	refreshing: 0.26,
	positive: 0.26,
	diverse: 0.25,
	aesthetic: 0.25,
	feeling: 0.24,
	legacy: 0.22,
	exciting: 0.21,
	ambiance: 0.21,
	experiential: 0.21
};
var southern = {
	picturesque: 0.33,
	tourist: 0.27,
	local: 0.24,
	rebel: 0.24,
	folk: 0.19,
	diverse: 0.15,
	rooftop: 0.15,
	popular: 0.15,
	belonging: 0.15,
	dark: 0.14,
	family: 0.13,
	calm: 0.13,
	young: 0.12,
	serene: 0.12,
	international: 0.12
};
var creative = {
	experiential: 0.51,
	innovative: 0.51,
	entrepreneurial: 0.5,
	adventurous: 0.41,
	design: 0.41,
	artsy: 0.4,
	playful: 0.38,
	interactive: 0.37,
	whimsical: 0.37,
	quirky: 0.37,
	exciting: 0.36,
	cinematic: 0.36,
	art: 0.36,
	multicultural: 0.36,
	sensual: 0.35
};
var singing = {
	soulful: 0.53,
	dance: 0.51,
	folk: 0.42,
	joyful: 0.4,
	jazz: 0.39,
	laugh: 0.35,
	campy: 0.31,
	loud: 0.3,
	earthy: 0.3,
	love: 0.3,
	soul: 0.29,
	playful: 0.28,
	sensual: 0.28,
	funny: 0.28,
	beautiful: 0.28
};
var imaginative = {
	creative: 0.67,
	whimsical: 0.63,
	adventurous: 0.57,
	innovative: 0.56,
	playful: 0.53,
	entertaining: 0.52,
	quirky: 0.5,
	delightful: 0.5,
	colorful: 0.47,
	eclectic: 0.47,
	experiential: 0.44,
	magical: 0.43,
	sensual: 0.42,
	exciting: 0.42,
	lively: 0.42
};
var radical = {
	subversive: 0.43,
	dramatic: 0.42,
	modern: 0.29,
	outrageous: 0.26,
	imaginative: 0.26,
	rebel: 0.25,
	holistic: 0.24,
	refreshing: 0.24,
	strange: 0.24,
	popular: 0.24,
	aesthetic: 0.22,
	hip: 0.2,
	soul: 0.2,
	experimental: 0.2,
	diverse: 0.19
};
var inspired = {
	imaginative: 0.39,
	memorable: 0.38,
	whimsical: 0.37,
	love: 0.35,
	refreshing: 0.34,
	adventurous: 0.33,
	crazy: 0.32,
	fantastic: 0.32,
	quirky: 0.32,
	colorful: 0.31,
	interesting: 0.31,
	beautiful: 0.31,
	funky: 0.31,
	popular: 0.31,
	nostalgic: 0.3
};
var historic = {
	picturesque: 0.43,
	cultural: 0.42,
	nostalgic: 0.35,
	memorable: 0.34,
	beautiful: 0.33,
	modern: 0.32,
	unique: 0.31,
	magical: 0.3,
	exciting: 0.27,
	ambiance: 0.27,
	serene: 0.27,
	civic: 0.26,
	"new": 0.26,
	emotional: 0.25,
	fantastic: 0.25
};
var special = {
	unique: 0.4,
	exclusive: 0.34,
	magical: 0.33,
	"new": 0.31,
	fantastic: 0.29,
	big: 0.26,
	emotional: 0.26,
	local: 0.26,
	divine: 0.25,
	unexpected: 0.25,
	strange: 0.25,
	memorable: 0.25,
	festive: 0.24,
	brunch: 0.23,
	small: 0.23
};
var western = {
	southern: 0.82,
	picturesque: 0.33,
	urban: 0.28,
	local: 0.25,
	folk: 0.24,
	modern: 0.24,
	tourist: 0.23,
	rebel: 0.21,
	dark: 0.18,
	diverse: 0.17,
	multicultural: 0.17,
	international: 0.17,
	popular: 0.17,
	film: 0.15,
	experimental: 0.15
};
var dating = {
	old: 0.24,
	love: 0.24,
	raunchy: 0.22,
	gay: 0.21,
	sharing: 0.21,
	modern: 0.21,
	games: 0.2,
	ugly: 0.19,
	nightlife: 0.19,
	witchy: 0.18,
	trendy: 0.17,
	boozy: 0.17,
	casual: 0.17,
	surfing: 0.17,
	quirky: 0.17
};
var drinks = {
	brunch: 0.38,
	boozy: 0.36,
	gourmet: 0.35,
	yummy: 0.35,
	tasty: 0.33,
	spicy: 0.31,
	nightlife: 0.31,
	dance: 0.29,
	trendy: 0.27,
	mingle: 0.27,
	energy: 0.27,
	savory: 0.26,
	vegan: 0.26,
	cold: 0.25,
	casual: 0.25
};
var fresh = {
	"new": 0.44,
	refreshing: 0.41,
	tasty: 0.37,
	mouthwatering: 0.36,
	rejuvenating: 0.34,
	soothing: 0.34,
	healthy: 0.33,
	hearty: 0.32,
	spicy: 0.31,
	nostalgic: 0.29,
	cool: 0.29,
	flavorful: 0.29,
	savory: 0.28,
	yummy: 0.28,
	colorful: 0.27
};
var healing = {
	rejuvenating: 0.44,
	soothing: 0.4,
	holistic: 0.34,
	gentle: 0.29,
	soul: 0.29,
	joyful: 0.26,
	serene: 0.24,
	witchy: 0.21,
	calm: 0.2,
	sharing: 0.18,
	hip: 0.17,
	unique: 0.16,
	family: 0.16,
	singing: 0.16,
	refreshing: 0.15
};
var tarot = {
	divine: 0.39,
	floral: 0.37,
	magical: 0.34,
	whimsical: 0.32,
	art: 0.32,
	holistic: 0.32,
	colorful: 0.3,
	heavenly: 0.3,
	witchy: 0.3,
	dance: 0.28,
	sensual: 0.28,
	experiential: 0.27,
	jazz: 0.27,
	zen: 0.27,
	folk: 0.27
};
var educational = {
	cultural: 0.48,
	experiential: 0.44,
	interactive: 0.43,
	community: 0.41,
	social: 0.39,
	children: 0.38,
	multicultural: 0.37,
	kids: 0.34,
	civic: 0.33,
	intergenerational: 0.32,
	diverse: 0.32,
	entrepreneurial: 0.31,
	holistic: 0.3,
	art: 0.29,
	volunteer: 0.29
};
var smooth = {
	gentle: 0.41,
	calm: 0.41,
	quick: 0.38,
	soothing: 0.37,
	quiet: 0.37,
	serene: 0.34,
	cool: 0.33,
	classy: 0.31,
	airy: 0.28,
	dark: 0.26,
	comfy: 0.25,
	flavorful: 0.24,
	joyful: 0.23,
	conversational: 0.23,
	refreshing: 0.22
};
var campy = {
	kitschy: 0.68,
	funny: 0.52,
	raunchy: 0.51,
	whimsical: 0.49,
	playful: 0.48,
	cinematic: 0.48,
	funky: 0.46,
	quirky: 0.45,
	artsy: 0.44,
	sensual: 0.44,
	entertaining: 0.44,
	hipster: 0.43,
	vibe: 0.42,
	nostalgic: 0.41,
	decadent: 0.4
};
var generous = {
	hearty: 0.42,
	kindness: 0.38,
	gentle: 0.37,
	friendly: 0.35,
	happy: 0.33,
	tasty: 0.33,
	imaginative: 0.31,
	flavorful: 0.3,
	comfy: 0.28,
	diverse: 0.27,
	outrageous: 0.27,
	classy: 0.27,
	quiet: 0.26,
	joyful: 0.24,
	quirky: 0.23
};
var laugh = {
	funny: 0.63,
	fun: 0.54,
	crazy: 0.44,
	playful: 0.41,
	love: 0.41,
	joyful: 0.4,
	loud: 0.38,
	happy: 0.35,
	singing: 0.35,
	entertaining: 0.34,
	conversational: 0.33,
	nostalgic: 0.31,
	yummy: 0.31,
	mingle: 0.31,
	walk: 0.3
};
var lively = {
	entertaining: 0.59,
	colorful: 0.51,
	playful: 0.5,
	classy: 0.46,
	interesting: 0.44,
	quirky: 0.44,
	joyful: 0.43,
	friendly: 0.42,
	funny: 0.42,
	memorable: 0.42,
	imaginative: 0.42,
	tasty: 0.41,
	fun: 0.41,
	adventurous: 0.39,
	exciting: 0.39
};
var celebration = {
	joyful: 0.46,
	brunch: 0.41,
	festive: 0.4,
	fun: 0.35,
	dance: 0.34,
	historic: 0.29,
	multicultural: 0.28,
	memorable: 0.28,
	colorful: 0.26,
	happy: 0.26,
	cultural: 0.26,
	nostalgic: 0.25,
	ambiance: 0.25,
	atmosphere: 0.25,
	blissful: 0.24
};
var buzzing = {
	quiet: 0.36,
	busy: 0.35,
	lively: 0.34,
	crowded: 0.33,
	vibe: 0.33,
	loud: 0.32,
	crazy: 0.31,
	exciting: 0.29,
	mingle: 0.29,
	strange: 0.29,
	fantastic: 0.27,
	chill: 0.26,
	happy: 0.26,
	funky: 0.26,
	nightlife: 0.26
};
var lax = {
	cheap: 0.25,
	generous: 0.24,
	cozy: 0.35,
	relaxing: 0.23,
	crowded: 0.23,
	safe: 0.23,
	outrageous: 0.23,
	friendly: 0.22,
	absurd: 0.22,
	raunchy: 0.22,
	silly: 0.22,
	crazy: 0.19,
	boozy: 0.19,
	ugly: 0.19,
	grimy: 0.19
};
var retro = {
	funky: 0.68,
	kitschy: 0.63,
	nostalgic: 0.61,
	campy: 0.56,
	trendy: 0.51,
	artsy: 0.49,
	hipster: 0.48,
	whimsical: 0.45,
	casual: 0.44,
	ambiance: 0.4,
	decadent: 0.39,
	soulful: 0.38,
	design: 0.37,
	playful: 0.36,
	earthy: 0.36
};
var romantic = {
	sensual: 0.58,
	love: 0.49,
	beautiful: 0.45,
	playful: 0.44,
	blissful: 0.44,
	earthy: 0.43,
	adventurous: 0.43,
	whimsical: 0.43,
	soulful: 0.42,
	decadent: 0.41,
	cinematic: 0.4,
	artsy: 0.39,
	raunchy: 0.39,
	kitschy: 0.38,
	nostalgic: 0.38
};
var vibrant = {
	lively: 0.56,
	beautiful: 0.5,
	diverse: 0.48,
	colorful: 0.47,
	multicultural: 0.44,
	nightlife: 0.43,
	exciting: 0.41,
	serene: 0.41,
	funky: 0.39,
	oasis: 0.39,
	joyful: 0.38,
	ambiance: 0.37,
	entrepreneurial: 0.36,
	healthy: 0.36,
	friendly: 0.34
};
var intimate = {
	romantic: 0.5,
	sensual: 0.47,
	earthy: 0.39,
	emotional: 0.37,
	experiential: 0.36,
	beautiful: 0.36,
	entertaining: 0.35,
	soulful: 0.35,
	casual: 0.35,
	artsy: 0.34,
	playful: 0.34,
	ambiance: 0.34,
	mingle: 0.33,
	upscale: 0.3,
	adventurous: 0.3
};
var restorative = {
	healing: 0.56,
	rejuvenating: 0.47,
	soothing: 0.41,
	holistic: 0.37,
	aesthetic: 0.36,
	natural: 0.36,
	relaxing: 0.35,
	botanical: 0.35,
	serene: 0.34,
	magical: 0.32,
	experiential: 0.32,
	gentle: 0.32,
	sensual: 0.31,
	blissful: 0.31,
	heavenly: 0.31
};
var positive = {
	healthy: 0.39,
	happy: 0.35,
	interesting: 0.33,
	fantastic: 0.32,
	exciting: 0.31,
	active: 0.3,
	surprising: 0.28,
	refreshing: 0.28,
	perspective: 0.26,
	unexpected: 0.25,
	quiet: 0.25,
	friendly: 0.24,
	big: 0.24,
	"new": 0.24,
	holistic: 0.24
};
var spontaneous = {
	joyful: 0.45,
	playful: 0.41,
	conversational: 0.36,
	peaceful: 0.35,
	sensual: 0.35,
	imaginative: 0.35,
	romantic: 0.35,
	simple: 0.33,
	participatory: 0.33,
	unexpected: 0.32,
	radical: 0.32,
	lively: 0.32,
	intimate: 0.32,
	quick: 0.31,
	blissful: 0.31
};
var natural = {
	beautiful: 0.33,
	divine: 0.33,
	healthy: 0.33,
	unique: 0.33,
	serene: 0.32,
	tropical: 0.31,
	gentle: 0.31,
	earthy: 0.29,
	sensual: 0.29,
	cultural: 0.28,
	modern: 0.28,
	friendly: 0.27,
	blissful: 0.27,
	heavenly: 0.27,
	diverse: 0.27
};
var queer = {
	gay: 0.7,
	hipster: 0.46,
	multicultural: 0.46,
	artsy: 0.41,
	cultural: 0.39,
	indie: 0.39,
	jazz: 0.37,
	nightlife: 0.36,
	vegan: 0.34,
	raunchy: 0.33,
	subversive: 0.33,
	dance: 0.32,
	funky: 0.32,
	urban: 0.31,
	social: 0.31
};
var vast = {
	small: 0.39,
	diverse: 0.37,
	big: 0.32,
	natural: 0.3,
	grimy: 0.27,
	unique: 0.27,
	historic: 0.27,
	fantastic: 0.26,
	western: 0.26,
	magical: 0.24,
	cultural: 0.23,
	legacy: 0.23,
	oasis: 0.22,
	surprising: 0.22,
	urban: 0.21
};
var mom = {
	kids: 0.56,
	family: 0.49,
	children: 0.43,
	love: 0.35,
	crazy: 0.34,
	fun: 0.28,
	cool: 0.27,
	witchy: 0.25,
	soul: 0.24,
	young: 0.23,
	comfy: 0.21,
	quiet: 0.2,
	singing: 0.2,
	joyful: 0.19,
	quirky: 0.18
};
var botanical = {
	garden: 0.5,
	floral: 0.48,
	tropical: 0.4,
	natural: 0.39,
	tarot: 0.38,
	restorative: 0.35,
	gourmet: 0.32,
	whimsical: 0.32,
	cultural: 0.31,
	art: 0.31,
	colorful: 0.3,
	earthy: 0.29,
	sensual: 0.29,
	magical: 0.26,
	savory: 0.26
};
var messy = {
	ugly: 0.56,
	strange: 0.35,
	boozy: 0.34,
	smooth: 0.34,
	simple: 0.33,
	grimy: 0.32,
	colorful: 0.29,
	whimsical: 0.29,
	busy: 0.29,
	quirky: 0.29,
	intense: 0.28,
	funny: 0.28,
	interesting: 0.28,
	tasty: 0.28,
	comfy: 0.28
};
var dramatic = {
	surprising: 0.49,
	unexpected: 0.49,
	memorable: 0.44,
	radical: 0.42,
	historic: 0.37,
	big: 0.36,
	magical: 0.35,
	intense: 0.33,
	strange: 0.33,
	interesting: 0.32,
	emotional: 0.32,
	refreshing: 0.32,
	quick: 0.31,
	exciting: 0.3,
	cinematic: 0.3
};
var cozy = {
	comfy: 0.62,
	airy: 0.42,
	serene: 0.35,
	quiet: 0.34,
	picturesque: 0.33,
	dark: 0.33,
	quirky: 0.31,
	cool: 0.3,
	soothing: 0.3,
	vibe: 0.28,
	classy: 0.28,
	fancy: 0.27,
	strange: 0.26,
	refreshing: 0.25,
	raunchy: 0.25
};
var fashion = {
	trendy: 0.49,
	floral: 0.4,
	classy: 0.38,
	design: 0.34,
	hipster: 0.34,
	artsy: 0.33,
	casual: 0.33,
	retro: 0.33,
	dance: 0.31,
	art: 0.31,
	nightlife: 0.31,
	aesthetic: 0.31,
	sensual: 0.3,
	indie: 0.3,
	creative: 0.3
};
var authentic = {
	ambiance: 0.44,
	flavorful: 0.43,
	tasty: 0.42,
	unique: 0.42,
	nostalgic: 0.41,
	earthy: 0.4,
	retro: 0.4,
	spicy: 0.38,
	entertaining: 0.38,
	savory: 0.37,
	funky: 0.37,
	experiential: 0.36,
	kitschy: 0.35,
	sensual: 0.35,
	gourmet: 0.35
};
var eclectic = {
	diverse: 0.61,
	artsy: 0.57,
	funky: 0.57,
	quirky: 0.56,
	adventurous: 0.51,
	whimsical: 0.51,
	jazz: 0.49,
	imaginative: 0.47,
	colorful: 0.46,
	kitschy: 0.43,
	earthy: 0.43,
	upscale: 0.43,
	soulful: 0.43,
	indie: 0.43,
	vibe: 0.43
};
var delightful = {
	lively: 0.61,
	beautiful: 0.6,
	tasty: 0.55,
	entertaining: 0.54,
	whimsical: 0.54,
	sweet: 0.53,
	yummy: 0.53,
	refreshing: 0.53,
	memorable: 0.53,
	playful: 0.52,
	fantastic: 0.51,
	magical: 0.5,
	funny: 0.47,
	savory: 0.46,
	interesting: 0.45
};
var hidden_gem = {
	oasis: 0.44,
	picturesque: 0.4,
	tasty: 0.36,
	eclectic: 0.36,
	exciting: 0.35,
	nightlife: 0.35,
	interesting: 0.34,
	beautiful: 0.34,
	gourmet: 0.33,
	trendy: 0.32,
	yummy: 0.32,
	ambiance: 0.31,
	delightful: 0.31,
	fantastic: 0.3,
	artsy: 0.29
};
var feminist = {
	queer: 0.56,
	gay: 0.42,
	activist: 0.42,
	radical: 0.41,
	romantic: 0.32,
	mom: 0.3,
	campy: 0.29,
	fashion: 0.28,
	tarot: 0.25,
	retro: 0.25,
	spontaneous: 0.23,
	transgender: 0.37,
	social: 0.35,
	sensual: 0.35,
	subversive: 0.35
};
var posh = {
	upscale: 0.58,
	trendy: 0.53,
	fancy: 0.46,
	decadent: 0.44,
	cozy: 0.43,
	picturesque: 0.4,
	comfy: 0.4,
	boozy: 0.38,
	classy: 0.38,
	serene: 0.36,
	funky: 0.35,
	artsy: 0.34,
	gourmet: 0.34,
	beautiful: 0.33,
	grimy: 0.33
};
var fierce = {
	intense: 0.68,
	lively: 0.38,
	rugged: 0.3,
	quiet: 0.27,
	friendly: 0.26,
	ugly: 0.26,
	dramatic: 0.26,
	big: 0.25,
	wild: 0.25,
	messy: 0.25,
	cold: 0.24,
	popular: 0.24,
	mouthwatering: 0.24,
	radical: 0.24,
	playful: 0.23
};
var mindful = {
	happy: 0.34,
	balance: 0.26,
	healthy: 0.26,
	busy: 0.26,
	calm: 0.26,
	emotional: 0.25,
	festive: 0.23,
	generous: 0.23,
	big: 0.22,
	safe: 0.22,
	joyful: 0.22,
	adventurous: 0.21,
	creative: 0.21,
	friendly: 0.2,
	intense: 0.2
};
var sober = {
	boozy: 0.39,
	calm: 0.39,
	quiet: 0.36,
	peaceful: 0.33,
	joyful: 0.31,
	serene: 0.31,
	safe: 0.3,
	dark: 0.3,
	classy: 0.29,
	blissful: 0.28,
	playful: 0.27,
	bookish: 0.27,
	soulful: 0.27,
	refreshing: 0.27,
	positive: 0.27
};
var warm = {
	cold: 0.6,
	sunny: 0.54,
	chill: 0.54,
	cool: 0.53,
	cozy: 0.47,
	hearty: 0.43,
	comfy: 0.42,
	friendly: 0.41,
	airy: 0.4,
	soothing: 0.4,
	relaxing: 0.37,
	gentle: 0.37,
	quiet: 0.36,
	lively: 0.36,
	tropical: 0.35
};
var classic = {
	retro: 0.57,
	nostalgic: 0.49,
	modern: 0.46,
	campy: 0.45,
	funky: 0.44,
	kitschy: 0.43,
	delightful: 0.42,
	memorable: 0.41,
	inspired: 0.41,
	futuristic: 0.4,
	cinematic: 0.39,
	quirky: 0.39,
	favorite: 0.39,
	authentic: 0.38,
	whimsical: 0.37
};
var rare = {
	unique: 0.37,
	surprising: 0.36,
	strange: 0.36,
	special: 0.34,
	dramatic: 0.34,
	small: 0.33,
	unexpected: 0.33,
	beautiful: 0.31,
	historic: 0.31,
	wild: 0.29,
	memorable: 0.29,
	quiet: 0.29,
	classic: 0.29,
	treat: 0.28,
	quirky: 0.27
};
var party = {
	rebel: 0.29,
	boozy: 0.25,
	family: 0.25,
	decadent: 0.24,
	brunch: 0.24,
	inclusive: 0.23,
	celebration: 0.23,
	posh: 0.22,
	sober: 0.22,
	social: 0.21,
	civic: 0.2,
	subversive: 0.2,
	romantic: 0.2,
	spontaneous: 0.19,
	feminist: 0.19
};
var novel = {
	film: 0.39,
	cinematic: 0.35,
	experimental: 0.31,
	imaginative: 0.3,
	romantic: 0.29,
	botanical: 0.29,
	whimsical: 0.28,
	feminist: 0.28,
	classic: 0.27,
	delightful: 0.26,
	quirky: 0.25,
	inspired: 0.24,
	campy: 0.24,
	subversive: 0.21,
	modern: 0.21
};
var transgender = {
	gay: 0.74,
	queer: 0.62,
	feminist: 0.37,
	multicultural: 0.36,
	young: 0.27,
	vegan: 0.26,
	intimate: 0.26,
	cultural: 0.23,
	diverse: 0.23,
	raunchy: 0.22,
	nightlife: 0.22,
	social: 0.2,
	inclusive: 0.19,
	activist: 0.19,
	jazz: 0.18
};
var innovative = {
	unique: 0.56,
	imaginative: 0.56,
	creative: 0.51,
	exciting: 0.49,
	interactive: 0.48,
	diverse: 0.47,
	entrepreneurial: 0.44,
	experiential: 0.43,
	design: 0.42,
	alternative: 0.41,
	"new": 0.39,
	vibrant: 0.36,
	eclectic: 0.36,
	holistic: 0.35,
	experimental: 0.35
};
var popup = {
	walk: 0.21,
	surfing: 0.21,
	kitschy: 0.16,
	heavenly: 0.16,
	garden: 0.16,
	love: 0.16,
	witchy: 0.16,
	rooftop: 0.16,
	magical: 0.15,
	zen: 0.15,
	whimsical: 0.14,
	athletic: 0.14,
	quirky: 0.14,
	cool: 0.14,
	conversational: 0.14
};
var diy = {
	indie: 0.37,
	creative: 0.33,
	artsy: 0.32,
	garden: 0.32,
	retro: 0.32,
	design: 0.31,
	craft: 0.31,
	funky: 0.31,
	innovative: 0.3,
	trendy: 0.29,
	floral: 0.28,
	hipster: 0.28,
	artisanal: 0.27,
	zen: 0.27,
	vegan: 0.27
};
var reuse = {
	design: 0.36,
	sharing: 0.25,
	innovative: 0.25,
	diy: 0.25,
	creative: 0.22,
	retro: 0.22,
	alternative: 0.21,
	legacy: 0.2,
	aesthetic: 0.2,
	imaginative: 0.2,
	kitschy: 0.19,
	civic: 0.19,
	simple: 0.19,
	energy: 0.19,
	historic: 0.19
};
var weird = {
	strange: 0.82,
	crazy: 0.71,
	funny: 0.66,
	quirky: 0.56,
	interesting: 0.54,
	absurd: 0.52,
	funky: 0.49,
	fun: 0.49,
	cool: 0.46,
	magical: 0.45,
	surprising: 0.45,
	fantastic: 0.43,
	whimsical: 0.43,
	ugly: 0.42,
	beautiful: 0.42
};
var feeling = {
	vibe: 0.48,
	atmosphere: 0.39,
	happy: 0.37,
	emotional: 0.36,
	weird: 0.35,
	ambiance: 0.33,
	joyful: 0.33,
	nostalgic: 0.32,
	soul: 0.31,
	cold: 0.3,
	chill: 0.3,
	relaxing: 0.3,
	laugh: 0.3,
	warm: 0.3,
	blissful: 0.29
};
var favorite = {
	popular: 0.48,
	love: 0.4,
	memorable: 0.4,
	classic: 0.39,
	inspired: 0.34,
	fantastic: 0.32,
	yummy: 0.31,
	quirky: 0.31,
	interesting: 0.3,
	mouthwatering: 0.3,
	fun: 0.29,
	fancy: 0.29,
	delightful: 0.29,
	magical: 0.28,
	big: 0.28
};
var futuristic = {
	retro: 0.55,
	modern: 0.51,
	funky: 0.48,
	cinematic: 0.42,
	grimy: 0.41,
	whimsical: 0.4,
	campy: 0.4,
	classic: 0.4,
	kitschy: 0.39,
	imaginative: 0.39,
	design: 0.37,
	nostalgic: 0.36,
	"new": 0.34,
	artsy: 0.33,
	magical: 0.32
};
var scenic = {
	picturesque: 0.73,
	beautiful: 0.52,
	serene: 0.45,
	hiking: 0.43,
	tourist: 0.39,
	historic: 0.39,
	relaxing: 0.37,
	ambiance: 0.35,
	rugged: 0.35,
	delightful: 0.34,
	sunny: 0.33,
	adventurous: 0.33,
	romantic: 0.33,
	hidden_gem: 0.33,
	colorful: 0.32
};
var silly = {
	absurd: 0.65,
	funny: 0.64,
	weird: 0.62,
	crazy: 0.6,
	outrageous: 0.54,
	fun: 0.5,
	strange: 0.49,
	whimsical: 0.48,
	laugh: 0.47,
	kitschy: 0.45,
	campy: 0.45,
	playful: 0.42,
	interesting: 0.42,
	ugly: 0.42,
	entertaining: 0.41
};
var decorative = {
	floral: 0.56,
	whimsical: 0.51,
	colorful: 0.46,
	aesthetic: 0.45,
	garden: 0.44,
	kitschy: 0.42,
	botanical: 0.38,
	design: 0.36,
	art: 0.35,
	artsy: 0.34,
	earthy: 0.32,
	tarot: 0.32,
	beautiful: 0.31,
	restorative: 0.3,
	savory: 0.29
};
var nerdy = {
	bookish: 0.64,
	hipster: 0.56,
	quirky: 0.49,
	funny: 0.48,
	artsy: 0.46,
	weird: 0.45,
	campy: 0.44,
	silly: 0.44,
	cool: 0.42,
	funky: 0.4,
	kitschy: 0.38,
	playful: 0.38,
	retro: 0.37,
	futuristic: 0.37,
	witchy: 0.36
};
var elegant = {
	classy: 0.62,
	beautiful: 0.59,
	airy: 0.57,
	delightful: 0.53,
	earthy: 0.52,
	upscale: 0.48,
	funky: 0.48,
	serene: 0.48,
	sensual: 0.47,
	colorful: 0.44,
	whimsical: 0.44,
	fancy: 0.44,
	playful: 0.43,
	ambiance: 0.43,
	posh: 0.43
};
var vibes_matrix = {
	entrepreneurial: entrepreneurial,
	colorful: colorful,
	alternative: alternative,
	artsy: artsy,
	friendly: friendly,
	hiking: hiking,
	magical: magical,
	absurd: absurd,
	walk: walk,
	views: views,
	spicy: spicy,
	relief: relief,
	big: big,
	loud: loud,
	decadent: decadent,
	kitschy: kitschy,
	playful: playful,
	bookish: bookish,
	dance: dance,
	floral: floral,
	urban: urban,
	civic: civic,
	outdoors: outdoors,
	"public": {
	civic: 0.39,
	local: 0.36,
	community: 0.35,
	social: 0.31,
	transit: 0.28,
	educational: 0.28,
	open: 0.26,
	children: 0.25,
	free: 0.23,
	cultural: 0.23,
	international: 0.23,
	urban: 0.22,
	intimate: 0.22,
	participatory: 0.21,
	special: 0.2
},
	crazy: crazy,
	intergenerational: intergenerational,
	earthy: earthy,
	upscale: upscale,
	sunny: sunny,
	adventurous: adventurous,
	peaceful: peaceful,
	quick: quick,
	social: social,
	cold: cold,
	sensual: sensual,
	brunch: brunch,
	exciting: exciting,
	"new": {
	fresh: 0.44,
	unique: 0.4,
	innovative: 0.39,
	modern: 0.37,
	futuristic: 0.34,
	exciting: 0.32,
	special: 0.31,
	alternative: 0.28,
	experimental: 0.27,
	creative: 0.27,
	diverse: 0.26,
	historic: 0.26,
	quirky: 0.25,
	rejuvenating: 0.25,
	popular: 0.25
},
	entertaining: entertaining,
	transit: transit,
	inclusive: inclusive,
	intense: intense,
	design: design,
	chill: chill,
	nostalgic: nostalgic,
	active: active,
	sweet: sweet,
	gourmet: gourmet,
	blissful: blissful,
	free: free,
	kindness: kindness,
	small: small,
	relaxing: relaxing,
	soulful: soulful,
	balance: balance,
	funny: funny,
	games: games,
	ambiance: ambiance,
	craft: craft,
	happy: happy,
	cultural: cultural,
	experiential: experiential,
	community: community,
	trending: trending,
	trendy: trendy,
	atmosphere: atmosphere,
	boozy: boozy,
	indie: indie,
	interesting: interesting,
	open: open,
	jazz: jazz,
	ugly: ugly,
	crowded: crowded,
	emotional: emotional,
	gay: gay,
	cinematic: cinematic,
	fantastic: fantastic,
	tropical: tropical,
	rock: rock,
	savory: savory,
	interactive: interactive,
	heavenly: heavenly,
	exclusive: exclusive,
	beautiful: beautiful,
	yummy: yummy,
	grimy: grimy,
	tasty: tasty,
	treat: treat,
	kink: kink,
	rugged: rugged,
	funky: funky,
	divine: divine,
	whimsical: whimsical,
	athletic: athletic,
	oasis: oasis,
	surprising: surprising,
	healthy: healthy,
	casual: casual,
	hipster: hipster,
	bike: bike,
	artisanal: artisanal,
	old: old,
	hearty: hearty,
	activist: activist,
	zen: zen,
	art: art,
	safe: safe,
	simple: simple,
	busy: busy,
	garden: garden,
	love: love,
	vegan: vegan,
	legacy: legacy,
	weekend: weekend,
	volunteer: volunteer,
	mingle: mingle,
	unexpected: unexpected,
	children: children,
	wild: wild,
	surfing: surfing,
	dope: dope,
	energy: energy,
	witchy: witchy,
	fun: fun,
	gentle: gentle,
	kids: kids,
	unique: unique,
	picturesque: picturesque,
	diverse: diverse,
	holistic: holistic,
	quirky: quirky,
	hip: hip,
	photo: photo,
	young: young,
	comfy: comfy,
	outrageous: outrageous,
	refreshing: refreshing,
	cool: cool,
	flavorful: flavorful,
	rejuvenating: rejuvenating,
	strange: strange,
	joyful: joyful,
	cheap: cheap,
	conversational: conversational,
	raunchy: raunchy,
	multicultural: multicultural,
	sharing: sharing,
	dark: dark,
	serene: serene,
	international: international,
	soul: soul,
	fancy: fancy,
	film: film,
	airy: airy,
	subversive: subversive,
	nightlife: nightlife,
	family: family,
	vibe: vibe,
	memorable: memorable,
	soothing: soothing,
	experimental: experimental,
	aesthetic: aesthetic,
	rooftop: rooftop,
	participatory: participatory,
	popular: popular,
	quiet: quiet,
	tourist: tourist,
	festive: festive,
	mouthwatering: mouthwatering,
	folk: folk,
	local: local,
	calm: calm,
	belonging: belonging,
	classy: classy,
	rebel: rebel,
	modern: modern,
	perspective: perspective,
	southern: southern,
	creative: creative,
	singing: singing,
	imaginative: imaginative,
	radical: radical,
	inspired: inspired,
	historic: historic,
	special: special,
	western: western,
	dating: dating,
	drinks: drinks,
	fresh: fresh,
	healing: healing,
	tarot: tarot,
	educational: educational,
	smooth: smooth,
	campy: campy,
	generous: generous,
	laugh: laugh,
	lively: lively,
	celebration: celebration,
	buzzing: buzzing,
	lax: lax,
	retro: retro,
	romantic: romantic,
	vibrant: vibrant,
	intimate: intimate,
	restorative: restorative,
	positive: positive,
	spontaneous: spontaneous,
	natural: natural,
	queer: queer,
	vast: vast,
	mom: mom,
	botanical: botanical,
	messy: messy,
	dramatic: dramatic,
	cozy: cozy,
	fashion: fashion,
	authentic: authentic,
	eclectic: eclectic,
	delightful: delightful,
	hidden_gem: hidden_gem,
	feminist: feminist,
	posh: posh,
	fierce: fierce,
	mindful: mindful,
	sober: sober,
	warm: warm,
	classic: classic,
	rare: rare,
	party: party,
	novel: novel,
	transgender: transgender,
	innovative: innovative,
	popup: popup,
	diy: diy,
	reuse: reuse,
	weird: weird,
	feeling: feeling,
	favorite: favorite,
	futuristic: futuristic,
	scenic: scenic,
	silly: silly,
	decorative: decorative,
	nerdy: nerdy,
	elegant: elegant
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

    const vibeInfo = vibes$1.filter(item => vibe === item.key);

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
    vibes$1.filter(item => vibe === item.key);

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
const getVibes = () => {

    const all = vibes.vibes.forEach(vibe => vibe.key);

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

const getRelatedVibes = (vibes) => {
    let relatedVibes = vibes;
    vibes.map(vibe => {
        const vibeInfo = getVibeInfo(vibe);

        if (vibeInfo && vibeInfo.related) {
            relatedVibes = relatedVibes.concat(vibeInfo.related);
        }

        if (vibeInfo && vibeInfo.alias) {
            relatedVibes = relatedVibes.concat([vibeInfo.alias]);
        }
    });

    // Make it a unqiue set
    const relatedVibesUnique = [...new Set(relatedVibes)];
    return relatedVibesUnique
};

const getVibeStyle = (vibe) => {

    let vibe_styles = variables['color']['vibes'];

    let dark_gray = variables['color']['base']['gray']['1000'];
    let light_gray = variables['color']['base']['gray']['200'];

    let css = { color: dark_gray, background: light_gray };

    if (vibe in vibe_styles) {
        let primary = vibe_styles[vibe]['primary'];

        let luminance = chroma__default['default'](primary).luminance();
        let brightness = 1.2;
        if (luminance < 0.1) brightness += 2;
        if (luminance < 0.3) brightness += 1;

        let gradient = 'linear-gradient(45deg, ' + chroma__default['default'](primary).brighten(brightness).hex() + ' 0%, ' + light_gray + ' 75%)';

        css['background'] = gradient;
    }

    return css
  };

// Function derived from hand selecting point values for scaling then modeling exponential function for best fit
const yourvibe_scale_v1 = (x) => {
    let y = 1.061645 * (x**0.289052);
    console.log("x: ", x, "y: ", y);

    // Return only values such that 0<=y<=1
    if (y>1) {
        y = 1;
        console.log("y rounded down to 1");
    } else if (y<0) {
        y = 0;
        console.log("y rounded up to 0");
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
    console.log("i was called");
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
            console.log([vibe_m], my_vibes_fraction, fraction_counter);
        }

        // So long as vibes exist in matrix (prevent undefined errors), map place vibes and look for match
        if (vibe_m in vibes_matrix){
            console.log([vibe_m]);

            placevibes.map(vibe_p => {

                // If match, add corresponding cosine similarity score
                if (vibe_p in vibes_matrix[vibe_m])  {
                    console.log([vibe_p],vibes_matrix[vibe_m][vibe_p]);
                    related_vibes.push(vibes_matrix[vibe_m][vibe_p]);
                    console.log(related_vibes);
                }
            }
            );
        } 
    });

    // Count number of vibes remaining in place that are not direct matches
    let remaining_place_vibes = placevibes.length - fraction_counter;

    // If related vibes are found and not-direct matches are more than 1, combine all scores and take log_matches(related_vibes_score)
    if (related_vibes.length>=1 && (remaining_place_vibes)>1){
        var related_vibes_score = related_vibes.reduce((a, b) => a + b, 0); 
        console.log(related_vibes);

        // Add 1 to prevent any negative values. Can skew data for remaining_place_vibes == 2 or 3 but not significant
        if (related_vibes_score < 1) {
            related_vibes_score += 1;
        }
        // Change of Base, new variable that will be score normalized for remaining gap
        var remaining_score = Math.log10(10)/Math.log10(20);

        console.log(remaining_score, (related_vibes_score));

    // Avoid Log_1 division by zero/infinite error. Edge Casing
    } else if (related_vibes.length>=1 && (remaining_place_vibes)==1){
        var remaining_score = related_vibes[0];

    // No related matches found, score is zero
    } else {
        var remaining_score = 0;
    }
     
    // Scaled remaining portion of potential vibe score, for related not direct vibes
    let remaining_score_normalized = normalize_all(remaining_score, 0, 1, 0, (my_vibes_fraction*(myvibes.length-fraction_counter)));
    console.log(related_vibes, related_vibes_score, remaining_place_vibes, remaining_score_normalized);
    
    yourvibe += remaining_score_normalized;
    // Round using vibe scaling function. Default all 0 scores (no relation whatsoever) to 0.5 (50%)
    let yourvibe_rounded = yourvibe_scale_v1(yourvibe);
    if (yourvibe_rounded <= 0){
        yourvibe_rounded = 0.5;
    }
    console.log(yourvibe, yourvibe_rounded);

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
