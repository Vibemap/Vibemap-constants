'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chroma = require('chroma-js');

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
		name: "Popular",
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
			"art"
		]
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
			"A positive attitude boosts your energy.",
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
		key: "grimy",
		name: "Grimy"
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
		key: "kink",
		name: "Kink"
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
		name: "Nnovel"
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
		name: "Rugged"
	},
	{
		key: "safe",
		name: "Safe"
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
		key: "small",
		name: "Small"
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
		key: "strange",
		name: "Strange"
	},
	{
		key: "subversive",
		name: "Subversive"
	},
	{
		key: "sunny",
		name: "Sunny",
		definition: "Full of warmth and light",
		affirmations: [
			"Sunshine units all life"
		]
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
			light: "#fdff00",
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
			pastel: "#cef4d1",
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
			light: "#0f358e",
			pastel: "#5172bf",
			primary: "#0f358e"
		},
		purple: {
			bright: "#9100ff",
			deep: "#3e00b3",
			light: "#d391fa",
			pastel: "#e5d0ff",
			primary: "#3e00b3"
		},
		magenta: {
			bright: "#ff00ff",
			deep: "#7e1a65",
			light: "#e779b8",
			pastel: "#f4e4db",
			primary: "#7e1a65"
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
			primary: "#c66900",
			secondary: "#e779b8"
		},
		adventurous: {
			primary: "#00b459",
			secondary: "#57b5b1"
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
			secondary: "#cef4d1"
		},
		architectural: {
			primary: "#7e1a65",
			secondary: "#fff3e0"
		},
		artsy: {
			primary: "#d391fa",
			secondary: "#006e59"
		},
		aquatic: {
			primary: "#0000ff",
			secondary: "#00cec8"
		},
		art: {
			primary: "#d391fa",
			secondary: "#00cec8"
		},
		authentic: {
			primary: "#dd2c00",
			secondary: "#ff9800"
		},
		aware: {
			primary: "#2d76cc",
			secondary: "#7e1a65",
			tertiary: "#fff3e0"
		},
		beautiful: {
			primary: "#3e00b3",
			secondary: "#e779b8"
		},
		belonging: {
			primary: "#f7941d",
			secondary: "#ffccbc"
		},
		blissful: {
			primary: "#e779b8",
			secondary: "#f1ffcf"
		},
		boho: {
			primary: "#d99566",
			secondary: "#7e1a65"
		},
		bold: {
			primary: "#ef7200",
			secondary: "#f4e4db"
		},
		boozy: {
			primary: "#ff5722",
			secondary: "#dd2c00"
		},
		botanical: {
			primary: "#006e59",
			secondary: "#d391fa"
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
			primary: "#ff9800",
			secondary: "#fded35",
			tertiary: "#c66900"
		},
		calm: {
			primary: "#57b5b1",
			secondary: "#3cd8ff"
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
			primary: "#5172bf",
			secondary: "#e5d0ff"
		},
		cheerful: {
			primary: "#f4e4db",
			secondary: "#fff3e0"
		},
		chill: {
			primary: "#57b5b1",
			secondary: "#d4ffdc",
			tertiary: "#ffffe4"
		},
		cinematic: {
			primary: "#205273",
			secondary: "#d391fa"
		},
		civic: {
			primary: "#ff5722",
			secondary: "#2d76cc"
		},
		classic: {
			primary: "#e55929",
			secondary: "#7e1a65"
		},
		colorful: {
			primary: "#d391fa",
			secondary: "#61ecb2"
		},
		community: {
			primary: "#ffccbc",
			secondary: "#e5d0ff"
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
			primary: "#ffc947",
			secondary: "#ef9b0d"
		},
		cultural: {
			primary: "#ef9b0d",
			secondary: "#e55929"
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
			secondary: "#fdff00"
		},
		drip: {
			primary: "#e55929",
			secondary: "#fded35"
		},
		diverse: {
			primary: "#e5d0ff",
			secondary: "#00ffe4"
		},
		dreamy: {
			primary: "#3e00b3",
			secondary: "#fded35",
			tertiary: "#57b5b1"
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
			primary: "#57b5b1",
			secondary: "#7e1a65"
		},
		edgy: {
			primary: "#0f358e",
			secondary: "#fff3e0"
		},
		energetic: {
			primary: "#ff9800",
			secondary: "#fded35",
			tertiary: "#ef9b0d"
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
			primary: "#e779b8",
			secondary: "#a0e5f7"
		},
		festive: {
			primary: "#9100ff",
			secondary: "#ffffe4"
		},
		fierce: {
			primary: "#a30000",
			secondary: "#ffccbc"
		},
		folk: {
			primary: "#006e59",
			secondary: "#ef9b0d"
		},
		fragrant: {
			primary: "#cef4d1",
			secondary: "#d4ffdc"
		},
		friendly: {
			primary: "#3cd8ff",
			secondary: "#d391fa"
		},
		fun: {
			primary: "#fded35",
			secondary: "#d391fa"
		},
		funny: {
			primary: "#00cec8",
			secondary: "#fded35"
		},
		generous: {
			primary: "#ffc947",
			secondary: "#a8f36a"
		},
		happy: {
			primary: "#ef9b0d",
			secondary: "#d4ffdc"
		},
		healthy: {
			primary: "#00b459",
			secondary: "#ffc947"
		},
		hippie: {
			primary: "#ff00ff",
			secondary: "#fded35"
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
			primary: "#ff9800",
			secondary: "#e779b8"
		},
		iconic: {
			primary: "#7e1a65",
			secondary: "#f4e4db"
		},
		inspired: {
			primary: "#57b5b1",
			secondary: "#58e86b"
		},
		intimate: {
			primary: "#7e1a65",
			secondary: "#ffccbc"
		},
		joyful: {
			primary: "#ff9800",
			secondary: "#9100ff"
		},
		kitschy: {
			primary: "#ffccbc",
			secondary: "#a30000"
		},
		legacy: {
			primary: "#d391fa",
			secondary: "#e5d0ff"
		},
		lit: {
			primary: "#fded35",
			secondary: "#ff5722"
		},
		lively: {
			primary: "#ff5722",
			secondary: "#00ffe4"
		},
		local: {
			primary: "#ff00ff",
			secondary: "#a8f36a"
		},
		loud: {
			primary: "#64ff00",
			secondary: "#0000ff"
		},
		love: {
			primary: "#ff0000",
			secondary: "#e5d0ff"
		},
		magical: {
			primary: "#ef9b0d",
			secondary: "#e779b8"
		},
		mindful: {
			primary: "#2d76cc",
			secondary: "#57b5b1"
		},
		minimalist: {
			primary: "#57b5b1",
			secondary: "#535156"
		},
		moody: {
			primary: "#205273",
			secondary: "#a30000"
		},
		musical: {
			primary: "#9100ff",
			secondary: "#ff9800"
		},
		mystic: {
			primary: "#e779b8",
			secondary: "#ff9800"
		},
		natural: {
			primary: "#00b459",
			secondary: "#ffccbc"
		},
		neon: {
			primary: "#64ff00",
			secondary: "#00ffe4"
		},
		"new": {
			primary: "#64ff00",
			secondary: "#e5d0ff"
		},
		nostalgic: {
			primary: "#2d76cc",
			secondary: "#d99566"
		},
		old: {
			primary: "#57b5b1",
			secondary: "#ffccbc"
		},
		oldschool: {
			primary: "#2d76cc",
			secondary: "#ef7200",
			tertiary: "#ffccbc"
		},
		outdoors: {
			primary: "#00b459",
			secondary: "#a8f36a"
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
			secondary: "#ff5722"
		},
		peaceful: {
			primary: "#57b5b1",
			secondary: "#0f358e"
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
			primary: "#e779b8",
			secondary: "#ffc947"
		},
		positive: {
			primary: "#ff9800",
			secondary: "#61ecb2"
		},
		quiet: {
			primary: "#5172bf",
			secondary: "#57b5b1"
		},
		quiet_energy: {
			primary: "#3cd8ff",
			secondary: "#cef4d1",
			tertiary: "#ffffe4"
		},
		radical: {
			primary: "#ff0000",
			secondary: "#fded35"
		},
		rebel: {
			primary: "#ff00ff",
			secondary: "#fdff00"
		},
		relaxing: {
			primary: "#2d76cc",
			secondary: "#c4f7f4"
		},
		retro: {
			primary: "#d391fa",
			secondary: "#e55929"
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
			primary: "#e5d0ff",
			secondary: "#fded35"
		},
		sleepy: {
			primary: "#57b5b1",
			secondary: "#5172bf"
		},
		social: {
			primary: "#dd2c00",
			secondary: "#ff9800",
			tertiary: "#ffccbc"
		},
		solidarity: {
			primary: "#9100ff",
			secondary: "#00ffe4",
			tertiary: "#fff3e0"
		},
		spiritual: {
			primary: "#3e00b3",
			secondary: "#f4e4db"
		},
		spontaneous: {
			primary: "#e5d0ff",
			secondary: "#f4e4db"
		},
		throwback: {
			primary: "#57b5b1",
			secondary: "#ff9800"
		},
		together: {
			primary: "#ff0000",
			secondary: "#ffccbc",
			tertiary: "#f1ffcf"
		},
		trendy: {
			primary: "#ff6434",
			secondary: "#e5d0ff"
		},
		trending: {
			primary: "#ffc947",
			secondary: "#d391fa"
		},
		tropical: {
			primary: "#61ecb2",
			secondary: "#fdff00"
		},
		trust: {
			primary: "#ffc947",
			secondary: "#e779b8"
		},
		underground: {
			primary: "#205273",
			secondary: "#7e1a65"
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
			primary: "#61ecb2",
			secondary: "#f1ffcf"
		},
		volunteer: {
			primary: "#ff9800",
			secondary: "#a8f36a"
		},
		whimsical: {
			primary: "#00cec8",
			secondary: "#fff3e0"
		},
		wild: {
			primary: "#64ff00",
			secondary: "#f1ffcf"
		},
		wistful: {
			primary: "#ffc947",
			secondary: "#f4e4db"
		},
		witchy: {
			primary: "#7e1a65",
			secondary: "#d391fa"
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

exports.getRelatedVibes = getRelatedVibes;
exports.getVibeGradient = getVibeGradient;
exports.getVibeInfo = getVibeInfo;
exports.getVibeStyle = getVibeStyle;
exports.getVibes = getVibes;
exports.getVibesFromVibeTimes = getVibesFromVibeTimes;
