'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@mapbox/geo-viewport');
require('d3-scale');
require('@turf/turf');
require('chroma-js');
require('dayjs');
require('lodash.escaperegexp');
require('lodash.filter');
require('fuse.js');
require('dayjs/plugin/isBetween');
require('truncate');
require('url');
require('querystring');
var helpers = require('./helpers.js');
var Axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);

var vibeTaxonomy = [
	{
		id: 1100,
		count: 2,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/buzzing/",
		name: "buzzing",
		slug: "buzzing",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"buzzing Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/buzzing/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/buzzing/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/buzzing/\",\"name\":\"buzzing Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/buzzing/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1100"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1100"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1100"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1100"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	},
	{
		id: 1060,
		count: 3,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/chill/",
		name: "Chill",
		slug: "chill",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"Chill Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/chill/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/chill/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/chill/\",\"name\":\"Chill Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/chill/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1060"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1060"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1060"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1060"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	},
	{
		id: 1103,
		count: 3,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/colorful/",
		name: "colorful",
		slug: "colorful",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"colorful Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/colorful/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/colorful/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/colorful/\",\"name\":\"colorful Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/colorful/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1103"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1103"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1103"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1103"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	},
	{
		id: 1106,
		count: 4,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/dreamy/",
		name: "dreamy",
		slug: "dreamy",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"dreamy Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/dreamy/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/dreamy/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/dreamy/\",\"name\":\"dreamy Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/dreamy/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1106"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1106"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1106"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1106"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	},
	{
		id: 1109,
		count: 2,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/family/",
		name: "family",
		slug: "family",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"family Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/family/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/family/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/family/\",\"name\":\"family Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/family/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1109"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1109"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1109"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1109"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	},
	{
		id: 1166,
		count: 2,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/friendly/",
		name: "friendly",
		slug: "friendly",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"friendly Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/friendly/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/friendly/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/friendly/\",\"name\":\"friendly Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/friendly/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1166"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1166"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1166"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1166"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	},
	{
		id: 1064,
		count: 3,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/fun/",
		name: "Fun",
		slug: "fun",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"Fun Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/fun/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/fun/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/fun/\",\"name\":\"Fun Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/fun/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1064"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1064"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1064"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1064"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	},
	{
		id: 1073,
		count: 3,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/historic/",
		name: "historic",
		slug: "historic",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"historic Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/historic/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/historic/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/historic/\",\"name\":\"historic Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/historic/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1073"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1073"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1073"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1073"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	},
	{
		id: 1070,
		count: 2,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/in-solidarity/",
		name: "in-solidarity",
		slug: "in-solidarity",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"in-solidarity Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/in-solidarity/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/in-solidarity/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/in-solidarity/\",\"name\":\"in-solidarity Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/in-solidarity/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1070"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1070"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1070"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1070"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	},
	{
		id: 1414,
		count: 0,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/mindful/",
		name: "mindful",
		slug: "mindful",
		taxonomy: "vibe",
		parent: 1106,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"mindful Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/mindful/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/mindful/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/mindful/\",\"name\":\"mindful Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/mindful/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1414"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/taxonomies/vibe"
				}
			],
			up: [
				{
					embeddable: true,
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1106"
				}
			],
			"wp:post_type": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1414"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1414"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1414"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		}
	}
];

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com';
const REST_PATH = '/wp-json/wp/v2/';

const defaultFilters = {
  categories: [],
  cities: [],
  vibesets: [],
  vibe: []
};

// Get a list of Wordpress taxonomy or category ids by slug
// If empty, i.e. the slug isn't use, returns an empty array, 
// which will search for everything. 
const getTaxonomyIds = (type, filter) => {
  
  switch (type) {
    case 'vibe':
      return filter.map(slug => {
        // Find taxonomy that match slug
        const matches = helpers.filterList(vibeTaxonomy, slug, 'slug');
        return matches.length > 0 
          ? matches.map(match => match.id)
          : []
      })
  }
  return []
};

const fetchCities = async () => {
  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}city`;
  const response = await Axios__default['default'].get(endpoint)
      .catch(error => console.error(error));
  
  return response
};

// TODO: Sort by location
// TODO: SOrt by vibe match 
const fetchNeighborhoods = async (filters = defaultFilters) => {

    const postsPerPage = 20;

    //console.log('fetchNeighborhoods: ', filters)

    // TODO: Filter by vibe or other attributes
    const source = Axios__default['default'].CancelToken.source();

    let response = await Axios__default['default'].get(`${GATSBY_WP_BASEURL}/wp-json/wp/v2/neighborhoods`, {
        cancelToken: source.token,
        params: {
          _embed: true,
          per_page: postsPerPage,
          page:  1,
          //before: buildTime, // Let's make sure posts that have a page built are the only ones being pulled in.
          categories: filters.category,
          vibesets: filters.vibesets.toString(),
          //vibe: 1073, //TODO: Filter by vibe taxonomy
          cities: filters.cities.toString(),
        },
      })
      .catch(error => {
        console.error(error);
      });

    response.numPages = parseInt(response.headers["x-wp-totalpages"]);

    return response
};

const fetchVibeTaxonomy = async () => {
    const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}vibe`;
    const response = await Axios__default['default'].get(endpoint)
        .catch(error => console.error(error));
    
    return response
};

async function getPosts(filters = defaultFilters, stickyOnly = false) {
  
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts`;

  // Sticky posts to be shown first
  // TODO: Filter by the vibe or just score by it?
  let top_posts = await Axios__default['default'].get(endpoint, {
    params: { 
      per_page: 20,
      vibe: getTaxonomyIds('vibe', filters.vibe).toString(),
      sticky: true 
    }
  }).catch(error => console.error(error));

  // All other recent posts
  let recent_posts = await Axios__default['default'].get(endpoint, {
    params: {
      per_page: 20,
      vibe: getTaxonomyIds('vibe', filters.vibe).toString(),
      sticky: false
    }
  }).catch(error => console.error(error));

  // Only sticky posts
  if (stickyOnly === true) {
    return top_posts
  }

  // Put stick posts on top
  recent_posts.data = top_posts.data.concat(recent_posts.data);  
  
  console.log('recent_posts.data length: ', recent_posts.data.length);

  return recent_posts
}

exports.fetchCities = fetchCities;
exports.fetchNeighborhoods = fetchNeighborhoods;
exports.fetchVibeTaxonomy = fetchVibeTaxonomy;
exports.getPosts = getPosts;
exports.getTaxonomyIds = getTaxonomyIds;
