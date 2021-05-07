'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Axios = require('axios');
var filter = require('lodash.filter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);
var filter__default = /*#__PURE__*/_interopDefaultLegacy(filter);

var vibeTaxonomy = [
	{
		id: 2224,
		count: 2,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/artistic/",
		name: "artistic",
		slug: "artistic",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"artistic Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/artistic/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/artistic/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/artistic/\",\"name\":\"artistic Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/artistic/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/2224"
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
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=2224"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=2224"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=2224"
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
		id: 1953,
		count: 2,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/botanical/",
		name: "botanical",
		slug: "botanical",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"botanical Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/botanical/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/botanical/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/botanical/\",\"name\":\"botanical Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/botanical/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1953"
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
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1953"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1953"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1953"
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
		id: 1100,
		count: 22,
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
		count: 6,
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
		count: 8,
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
		id: 1948,
		count: 3,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/creative/",
		name: "creative",
		slug: "creative",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"creative Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/creative/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/creative/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/creative/\",\"name\":\"creative Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/creative/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1948"
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
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1948"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1948"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1948"
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
		id: 1824,
		count: 2,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/diverse/",
		name: "diverse",
		slug: "diverse",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"diverse Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/diverse/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/diverse/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/diverse/\",\"name\":\"diverse Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/diverse/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/1824"
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
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=1824"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=1824"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=1824"
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
		count: 17,
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
		id: 2034,
		count: 1,
		description: "",
		link: "https://cms.vibemap.com/features/vibe/eclectic/",
		name: "eclectic",
		slug: "eclectic",
		taxonomy: "vibe",
		parent: 0,
		meta: [
		],
		acf: [
		],
		yoast_head: "<!-- This site is optimized with the Yoast SEO Premium plugin v14.9 - https://yoast.com/wordpress/plugins/seo/ -->\n<meta name=\"robots\" content=\"noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" />\n<meta property=\"og:locale\" content=\"en_US\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:title\" content=\"eclectic Archives | Vibemap\" />\n<meta property=\"og:url\" content=\"https://cms.vibemap.com/features/vibe/eclectic/\" />\n<meta property=\"og:site_name\" content=\"Vibemap\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<script type=\"application/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Organization\",\"@id\":\"https://cms.vibemap.com/#organization\",\"name\":\"Vibemap\",\"url\":\"https://cms.vibemap.com/\",\"sameAs\":[],\"logo\":{\"@type\":\"ImageObject\",\"@id\":\"https://cms.vibemap.com/#logo\",\"inLanguage\":\"en-US\",\"url\":\"https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png\",\"width\":3784,\"height\":876,\"caption\":\"Vibemap\"},\"image\":{\"@id\":\"https://cms.vibemap.com/#logo\"}},{\"@type\":\"WebSite\",\"@id\":\"https://cms.vibemap.com/#website\",\"url\":\"https://cms.vibemap.com/\",\"name\":\"Vibemap\",\"description\":\"Find your vibe\",\"publisher\":{\"@id\":\"https://cms.vibemap.com/#organization\"},\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":\"https://cms.vibemap.com/?s={search_term_string}\",\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"},{\"@type\":\"CollectionPage\",\"@id\":\"https://cms.vibemap.com/features/vibe/eclectic/#webpage\",\"url\":\"https://cms.vibemap.com/features/vibe/eclectic/\",\"name\":\"eclectic Archives | Vibemap\",\"isPartOf\":{\"@id\":\"https://cms.vibemap.com/#website\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"https://cms.vibemap.com/features/vibe/eclectic/\"]}]}]}</script>\n<!-- / Yoast SEO Premium plugin. -->",
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibe/2034"
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
					href: "https://cms.vibemap.com/wp-json/wp/v2/posts?vibe=2034"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/vibeset?vibe=2034"
				},
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/neighborhoods?vibe=2034"
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
		count: 5,
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
	}
];

var cities = [
	{
		id: 1450,
		date: "2020-06-10T17:38:01",
		date_gmt: "2020-06-10T17:38:01",
		guid: {
			rendered: "https://52.148.191.161/?post_type=city&#038;p=1450"
		},
		modified: "2021-04-23T19:48:03",
		modified_gmt: "2021-04-24T02:48:03",
		slug: "guadalajara",
		status: "publish",
		type: "city",
		link: "https://cms.vibemap.com/cities/guadalajara/",
		title: {
			rendered: "Guadalajara"
		},
		parent: 0,
		menu_order: 0,
		template: "",
		meta: [
		],
		acf: {
			icon: {
				ID: 17538,
				id: 17538,
				title: "Vibemap_City_Guadalajara",
				filename: "Vibemap_City_Guadalajara.png",
				filesize: 44648,
				url: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
				link: "https://cms.vibemap.com/cities/guadalajara/attachment/vibemap_city_guadalajara/",
				alt: "",
				author: "8",
				description: "",
				caption: "",
				name: "vibemap_city_guadalajara",
				status: "inherit",
				uploaded_to: 1450,
				date: "2020-08-31 14:25:25",
				modified: "2020-08-31 14:25:25",
				menu_order: 0,
				mime_type: "image/png",
				type: "image",
				subtype: "png",
				icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
				width: 501,
				height: 501,
				sizes: {
					thumbnail: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"thumbnail-width": 500,
					"thumbnail-height": 500,
					medium: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"medium-width": 501,
					"medium-height": 501,
					medium_large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"medium_large-width": 501,
					"medium_large-height": 501,
					large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"large-width": 501,
					"large-height": 501,
					"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"1536x1536-width": 501,
					"1536x1536-height": 501,
					"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"2048x2048-width": 501,
					"2048x2048-height": 501,
					"4K": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"4K-width": 501,
					"4K-height": 501,
					"1440p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"1440p-width": 501,
					"1440p-height": 501,
					"1080p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"1080p-width": 501,
					"1080p-height": 501,
					"720p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"720p-width": 501,
					"720p-height": 501,
					"480p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Guadalajara.png",
					"480p-width": 480,
					"480p-height": 480
				}
			},
			placemarker: {
				address: "Guadalajara, Jalisco, Mexico",
				lat: 20.65969879999999,
				lng: -103.3496092,
				zoom: 14,
				place_id: "ChIJm9MvtYyxKIQRUFeGvwKTPdY",
				name: "Guadalajara",
				city: "Guadalajara",
				state: "Jalisco",
				state_short: "Jal.",
				country: "Mexico",
				country_short: "MX"
			},
			subheading: "",
			description: "",
			colors: {
				color_1: "#CCCCCC",
				color_2: "#DDDDDD"
			},
			vibeset: {
				ID: 390,
				post_author: "1",
				post_date: "2020-06-02 17:53:32",
				post_date_gmt: "2020-06-02 17:53:32",
				post_content: "",
				post_title: "Buzzing",
				post_excerpt: "",
				post_status: "publish",
				comment_status: "closed",
				ping_status: "closed",
				post_password: "",
				post_name: "buzzing",
				to_ping: "",
				pinged: "",
				post_modified: "2021-03-23 15:45:31",
				post_modified_gmt: "2021-03-23 22:45:31",
				post_content_filtered: "",
				post_parent: 0,
				guid: "https://52.148.191.161/?post_type=vibeset&#038;p=390",
				menu_order: 0,
				post_type: "vibeset",
				post_mime_type: "",
				comment_count: "0",
				filter: "raw"
			},
			photos: false
		},
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city/1450"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/types/city"
				}
			],
			"wp:attachment": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/media?parent=1450"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		},
		location: {
			latitude: 20.65969879999999,
			longitude: -103.3496092
		},
		name: "Guadalajara"
	},
	{
		id: 1447,
		date: "2020-06-10T17:37:49",
		date_gmt: "2020-06-10T17:37:49",
		guid: {
			rendered: "https://52.148.191.161/?post_type=city&#038;p=1447"
		},
		modified: "2021-04-23T19:49:04",
		modified_gmt: "2021-04-24T02:49:04",
		slug: "oakland",
		status: "publish",
		type: "city",
		link: "https://cms.vibemap.com/cities/oakland/",
		title: {
			rendered: "Oakland"
		},
		parent: 0,
		menu_order: 0,
		template: "",
		meta: [
		],
		acf: {
			icon: {
				ID: 18603,
				id: 18603,
				title: "Vibemap_City_Oakland",
				filename: "Vibemap_City_Oakland.png",
				filesize: 50261,
				url: "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
				link: "https://cms.vibemap.com/cities/oakland/attachment/vibemap_city_oakland/",
				alt: "",
				author: "6",
				description: "",
				caption: "",
				name: "vibemap_city_oakland",
				status: "inherit",
				uploaded_to: 1447,
				date: "2020-09-05 22:24:09",
				modified: "2020-09-06 14:19:22",
				menu_order: 0,
				mime_type: "image/png",
				type: "image",
				subtype: "png",
				icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
				width: 501,
				height: 500,
				sizes: {
					thumbnail: "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"thumbnail-width": 500,
					"thumbnail-height": 499,
					medium: "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"medium-width": 501,
					"medium-height": 500,
					medium_large: "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"medium_large-width": 501,
					"medium_large-height": 500,
					large: "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"large-width": 501,
					"large-height": 500,
					"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"1536x1536-width": 501,
					"1536x1536-height": 500,
					"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"2048x2048-width": 501,
					"2048x2048-height": 500,
					"4K": "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"4K-width": 501,
					"4K-height": 500,
					"1440p": "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"1440p-width": 501,
					"1440p-height": 500,
					"1080p": "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"1080p-width": 501,
					"1080p-height": 500,
					"720p": "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"720p-width": 501,
					"720p-height": 500,
					"480p": "https://cms.vibemap.com/wp-content/uploads/2020/09/Vibemap_City_Oakland.png",
					"480p-width": 481,
					"480p-height": 480
				}
			},
			placemarker: {
				address: "Oakland, CA, USA",
				lat: 37.8043514,
				lng: -122.2711639,
				zoom: 14,
				place_id: "ChIJA-2qKIt9hYARZ5N1NdUVtHE",
				name: "Oakland",
				city: "Oakland",
				state: "California",
				state_short: "CA",
				country: "United States",
				country_short: "US"
			},
			name: "",
			description: "<div class=\"desc\">Oakland is located on the inner part of the bay area, right across the bridge from San Francisco. You will hear the locals refer to this side of the bay as &#8220;The East Bay&#8221;. Click on a neighborhood to learn more about it or visit our neighborhoods page. — Visit Oakland</div>\n",
			city: [
				{
					ID: 1441,
					post_author: "1",
					post_date: "2020-06-10 17:37:30",
					post_date_gmt: "2020-06-10 17:37:30",
					post_content: "",
					post_title: "Portland",
					post_excerpt: "",
					post_status: "publish",
					comment_status: "closed",
					ping_status: "closed",
					post_password: "",
					post_name: "portland",
					to_ping: "",
					pinged: "",
					post_modified: "2021-04-23 14:02:08",
					post_modified_gmt: "2021-04-23 21:02:08",
					post_content_filtered: "",
					post_parent: 0,
					guid: "https://52.148.191.161/?post_type=city&#038;p=1441",
					menu_order: 0,
					post_type: "city",
					post_mime_type: "",
					comment_count: "0",
					filter: "raw"
				}
			],
			map: false,
			photos: false,
			instagram_hashtag: "",
			vibes: false,
			colors: {
				color_1: "#eab010",
				color_2: "#19aa5d"
			},
			subheading: "",
			vibeset: {
				ID: 393,
				post_author: "1",
				post_date: "2020-06-02 17:54:38",
				post_date_gmt: "2020-06-02 17:54:38",
				post_content: "",
				post_title: "Playtime",
				post_excerpt: "",
				post_status: "publish",
				comment_status: "closed",
				ping_status: "closed",
				post_password: "",
				post_name: "playtime",
				to_ping: "",
				pinged: "",
				post_modified: "2021-01-04 17:27:52",
				post_modified_gmt: "2021-01-05 01:27:52",
				post_content_filtered: "",
				post_parent: 0,
				guid: "https://52.148.191.161/?post_type=vibeset&#038;p=393",
				menu_order: 0,
				post_type: "vibeset",
				post_mime_type: "",
				comment_count: "0",
				filter: "raw"
			}
		},
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city/1447"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/types/city"
				}
			],
			"wp:attachment": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/media?parent=1447"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		},
		location: {
			latitude: 37.8043514,
			longitude: -122.2711639
		},
		name: "Oakland"
	},
	{
		id: 1444,
		date: "2020-06-10T17:37:39",
		date_gmt: "2020-06-10T17:37:39",
		guid: {
			rendered: "https://52.148.191.161/?post_type=city&#038;p=1444"
		},
		modified: "2021-04-23T19:49:25",
		modified_gmt: "2021-04-24T02:49:25",
		slug: "san-francisco",
		status: "publish",
		type: "city",
		link: "https://cms.vibemap.com/cities/san-francisco/",
		title: {
			rendered: "San Francisco"
		},
		parent: 0,
		menu_order: 0,
		template: "",
		meta: [
		],
		acf: {
			icon: {
				ID: 20741,
				id: 20741,
				title: "Vibemap_Pictogram_City_SanFrancisco-15",
				filename: "Vibemap_Pictogram_City_SanFrancisco-15.png",
				filesize: 24963,
				url: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
				link: "https://cms.vibemap.com/cities/san-francisco/attachment/vibemap_pictogram_city_sanfrancisco-15/",
				alt: "iconic illustration of san francisco california",
				author: "8",
				description: "",
				caption: "",
				name: "vibemap_pictogram_city_sanfrancisco-15",
				status: "inherit",
				uploaded_to: 1444,
				date: "2020-09-16 16:57:53",
				modified: "2021-02-02 23:21:49",
				menu_order: 0,
				mime_type: "image/png",
				type: "image",
				subtype: "png",
				icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
				width: 501,
				height: 498,
				sizes: {
					thumbnail: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"thumbnail-width": 500,
					"thumbnail-height": 497,
					medium: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"medium-width": 501,
					"medium-height": 498,
					medium_large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"medium_large-width": 501,
					"medium_large-height": 498,
					large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"large-width": 501,
					"large-height": 498,
					"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"1536x1536-width": 501,
					"1536x1536-height": 498,
					"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"2048x2048-width": 501,
					"2048x2048-height": 498,
					"4K": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"4K-width": 501,
					"4K-height": 498,
					"1440p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"1440p-width": 501,
					"1440p-height": 498,
					"1080p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"1080p-width": 501,
					"1080p-height": 498,
					"720p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"720p-width": 501,
					"720p-height": 498,
					"480p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_SanFrancisco-15.png",
					"480p-width": 483,
					"480p-height": 480
				}
			},
			placemarker: {
				address: "San Francisco, CA, USA",
				lat: 37.7749295,
				lng: -122.4194155,
				zoom: 14,
				place_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
				name: "San Francisco",
				city: "San Francisco",
				city_short: "SF",
				state: "California",
				state_short: "CA",
				country: "United States",
				country_short: "US"
			},
			city: [
			],
			subheading: "",
			description: "",
			colors: {
				color_1: "#CCCCCC",
				color_2: "#DDDDDD"
			},
			vibeset: {
				ID: 262,
				post_author: "1",
				post_date: "2020-06-01 20:26:51",
				post_date_gmt: "2020-06-01 20:26:51",
				post_content: "",
				post_title: "Dreamy",
				post_excerpt: "",
				post_status: "publish",
				comment_status: "closed",
				ping_status: "closed",
				post_password: "",
				post_name: "dreamy",
				to_ping: "",
				pinged: "",
				post_modified: "2021-01-04 10:56:01",
				post_modified_gmt: "2021-01-04 18:56:01",
				post_content_filtered: "",
				post_parent: 0,
				guid: "https://52.148.191.161/?post_type=vibeset&#038;p=262",
				menu_order: 0,
				post_type: "vibeset",
				post_mime_type: "",
				comment_count: "0",
				filter: "raw"
			},
			photos: false
		},
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city/1444"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/types/city"
				}
			],
			"wp:attachment": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/media?parent=1444"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		},
		location: {
			latitude: 37.7749295,
			longitude: -122.4194155
		},
		name: "San Francisco"
	},
	{
		id: 1441,
		date: "2020-06-10T17:37:30",
		date_gmt: "2020-06-10T17:37:30",
		guid: {
			rendered: "https://52.148.191.161/?post_type=city&#038;p=1441"
		},
		modified: "2021-04-23T14:02:08",
		modified_gmt: "2021-04-23T21:02:08",
		slug: "portland",
		status: "publish",
		type: "city",
		link: "https://cms.vibemap.com/cities/portland/",
		title: {
			rendered: "Portland"
		},
		parent: 0,
		menu_order: 0,
		template: "",
		meta: [
		],
		acf: {
			icon: {
				ID: 20734,
				id: 20734,
				title: "Vibemap_Pictogram_City_Portland-17",
				filename: "Vibemap_Pictogram_City_Portland-17.png",
				filesize: 43710,
				url: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
				link: "https://cms.vibemap.com/cities/san-francisco/attachment/vibemap_pictogram_city_portland-17/",
				alt: "iconic illustration of portland oregon",
				author: "8",
				description: "",
				caption: "",
				name: "vibemap_pictogram_city_portland-17",
				status: "inherit",
				uploaded_to: 1444,
				date: "2020-09-16 16:57:51",
				modified: "2021-02-02 23:19:21",
				menu_order: 0,
				mime_type: "image/png",
				type: "image",
				subtype: "png",
				icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
				width: 501,
				height: 501,
				sizes: {
					thumbnail: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"thumbnail-width": 500,
					"thumbnail-height": 500,
					medium: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"medium-width": 501,
					"medium-height": 501,
					medium_large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"medium_large-width": 501,
					"medium_large-height": 501,
					large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"large-width": 501,
					"large-height": 501,
					"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"1536x1536-width": 501,
					"1536x1536-height": 501,
					"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"2048x2048-width": 501,
					"2048x2048-height": 501,
					"4K": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"4K-width": 501,
					"4K-height": 501,
					"1440p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"1440p-width": 501,
					"1440p-height": 501,
					"1080p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"1080p-width": 501,
					"1080p-height": 501,
					"720p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"720p-width": 501,
					"720p-height": 501,
					"480p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_Pictogram_City_Portland-17.png",
					"480p-width": 480,
					"480p-height": 480
				}
			},
			placemarker: {
				address: "Portland, OR, USA",
				lat: 45.5051064,
				lng: -122.6750261,
				zoom: 14,
				place_id: "ChIJJ3SpfQsLlVQRkYXR9ua5Nhw",
				name: "Portland",
				city: "Portland",
				state: "Oregon",
				state_short: "OR",
				country: "United States",
				country_short: "US"
			},
			colors: {
				color_1: "#ce2fae",
				color_2: "#4d9bbc"
			},
			description: "<p>The City of Roses</p>\n",
			vibeset: {
				ID: 387,
				post_author: "1",
				post_date: "2020-06-02 17:52:58",
				post_date_gmt: "2020-06-02 17:52:58",
				post_content: "",
				post_title: "Old School",
				post_excerpt: "",
				post_status: "publish",
				comment_status: "closed",
				ping_status: "closed",
				post_password: "",
				post_name: "old-school",
				to_ping: "",
				pinged: "",
				post_modified: "2021-03-23 15:46:19",
				post_modified_gmt: "2021-03-23 22:46:19",
				post_content_filtered: "",
				post_parent: 0,
				guid: "https://52.148.191.161/?post_type=vibeset&#038;p=387",
				menu_order: 0,
				post_type: "vibeset",
				post_mime_type: "",
				comment_count: "0",
				filter: "raw"
			},
			photos: [
				{
					ID: 36409,
					id: 36409,
					title: "AdobeStock_226932273",
					filename: "AdobeStock_226932273.jpeg",
					filesize: 840867,
					url: "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
					link: "https://cms.vibemap.com/cities/portland/attachment/adobestock_226932273/",
					alt: "Biking in the City of Portland Oregon",
					author: "6",
					description: "Biking in the City of Portland Oregon",
					caption: "Biking in the City of Portland Oregon. ",
					name: "adobestock_226932273",
					status: "inherit",
					uploaded_to: 1441,
					date: "2021-03-29 21:50:12",
					modified: "2021-03-29 21:50:32",
					menu_order: 0,
					mime_type: "image/jpeg",
					type: "image",
					subtype: "jpeg",
					icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
					width: 1920,
					height: 1315,
					sizes: {
						thumbnail: "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"thumbnail-width": 500,
						"thumbnail-height": 342,
						medium: "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"medium-width": 1051,
						"medium-height": 720,
						medium_large: "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"medium_large-width": 768,
						"medium_large-height": 526,
						large: "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"large-width": 1577,
						"large-height": 1080,
						"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"1536x1536-width": 1536,
						"1536x1536-height": 1052,
						"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"2048x2048-width": 1920,
						"2048x2048-height": 1315,
						"4K": "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"4K-width": 1920,
						"4K-height": 1315,
						"1440p": "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"1440p-width": 1920,
						"1440p-height": 1315,
						"1080p": "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"1080p-width": 1577,
						"1080p-height": 1080,
						"720p": "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"720p-width": 1051,
						"720p-height": 720,
						"480p": "https://cms.vibemap.com/wp-content/uploads/2020/06/AdobeStock_226932273.jpeg",
						"480p-width": 640,
						"480p-height": 438
					}
				}
			],
			subheading: "City of Roses"
		},
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city/1441"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/types/city"
				}
			],
			"wp:attachment": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/media?parent=1441"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		},
		location: {
			latitude: 45.5051064,
			longitude: -122.6750261
		},
		name: "Portland"
	},
	{
		id: 1438,
		date: "2020-06-10T17:37:22",
		date_gmt: "2020-06-10T17:37:22",
		guid: {
			rendered: "https://52.148.191.161/?post_type=city&#038;p=1438"
		},
		modified: "2021-04-23T19:49:40",
		modified_gmt: "2021-04-24T02:49:40",
		slug: "seattle",
		status: "publish",
		type: "city",
		link: "https://cms.vibemap.com/cities/seattle/",
		title: {
			rendered: "Seattle"
		},
		parent: 0,
		menu_order: 0,
		template: "",
		meta: [
		],
		acf: {
			icon: {
				ID: 17549,
				id: 17549,
				title: "Vibemap_City_Seattle",
				filename: "Vibemap_City_Seattle.png",
				filesize: 44705,
				url: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
				link: "https://cms.vibemap.com/cities/guadalajara/attachment/vibemap_city_seattle/",
				alt: "iconic illustration of seattle washington",
				author: "8",
				description: "",
				caption: "",
				name: "vibemap_city_seattle",
				status: "inherit",
				uploaded_to: 1450,
				date: "2020-08-31 14:25:29",
				modified: "2021-02-02 23:20:30",
				menu_order: 0,
				mime_type: "image/png",
				type: "image",
				subtype: "png",
				icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
				width: 501,
				height: 500,
				sizes: {
					thumbnail: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"thumbnail-width": 500,
					"thumbnail-height": 499,
					medium: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"medium-width": 501,
					"medium-height": 500,
					medium_large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"medium_large-width": 501,
					"medium_large-height": 500,
					large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"large-width": 501,
					"large-height": 500,
					"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"1536x1536-width": 501,
					"1536x1536-height": 500,
					"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"2048x2048-width": 501,
					"2048x2048-height": 500,
					"4K": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"4K-width": 501,
					"4K-height": 500,
					"1440p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"1440p-width": 501,
					"1440p-height": 500,
					"1080p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"1080p-width": 501,
					"1080p-height": 500,
					"720p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"720p-width": 501,
					"720p-height": 500,
					"480p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Seattle.png",
					"480p-width": 481,
					"480p-height": 480
				}
			},
			placemarker: {
				address: "Seattle, WA, USA",
				lat: 47.6062095,
				lng: -122.3320708,
				zoom: 14,
				place_id: "ChIJVTPokywQkFQRmtVEaUZlJRA",
				name: "Seattle",
				city: "Seattle",
				state: "Washington",
				state_short: "WA",
				country: "United States",
				country_short: "US"
			},
			subheading: "",
			description: "",
			colors: {
				color_1: "#CCCCCC",
				color_2: "#DDDDDD"
			},
			vibeset: {
				ID: 262,
				post_author: "1",
				post_date: "2020-06-01 20:26:51",
				post_date_gmt: "2020-06-01 20:26:51",
				post_content: "",
				post_title: "Dreamy",
				post_excerpt: "",
				post_status: "publish",
				comment_status: "closed",
				ping_status: "closed",
				post_password: "",
				post_name: "dreamy",
				to_ping: "",
				pinged: "",
				post_modified: "2021-01-04 10:56:01",
				post_modified_gmt: "2021-01-04 18:56:01",
				post_content_filtered: "",
				post_parent: 0,
				guid: "https://52.148.191.161/?post_type=vibeset&#038;p=262",
				menu_order: 0,
				post_type: "vibeset",
				post_mime_type: "",
				comment_count: "0",
				filter: "raw"
			},
			photos: false
		},
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city/1438"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/types/city"
				}
			],
			"wp:attachment": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/media?parent=1438"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		},
		location: {
			latitude: 47.6062095,
			longitude: -122.3320708
		},
		name: "Seattle"
	},
	{
		id: 1435,
		date: "2020-06-10T17:37:14",
		date_gmt: "2020-06-10T17:37:14",
		guid: {
			rendered: "https://52.148.191.161/?post_type=city&#038;p=1435"
		},
		modified: "2021-04-24T10:01:25",
		modified_gmt: "2021-04-24T17:01:25",
		slug: "vancouver",
		status: "publish",
		type: "city",
		link: "https://cms.vibemap.com/cities/vancouver/",
		title: {
			rendered: "Vancouver"
		},
		parent: 0,
		menu_order: 0,
		template: "",
		meta: [
		],
		acf: {
			icon: {
				ID: 17553,
				id: 17553,
				title: "Vibemap_City_Vancouver",
				filename: "Vibemap_City_Vancouver.png",
				filesize: 42146,
				url: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
				link: "https://cms.vibemap.com/cities/guadalajara/attachment/vibemap_city_vancouver/",
				alt: "iconic illustration of vancouver canada",
				author: "8",
				description: "",
				caption: "",
				name: "vibemap_city_vancouver",
				status: "inherit",
				uploaded_to: 1450,
				date: "2020-08-31 14:25:30",
				modified: "2021-02-02 23:21:10",
				menu_order: 0,
				mime_type: "image/png",
				type: "image",
				subtype: "png",
				icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
				width: 500,
				height: 500,
				sizes: {
					thumbnail: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"thumbnail-width": 500,
					"thumbnail-height": 500,
					medium: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"medium-width": 500,
					"medium-height": 500,
					medium_large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"medium_large-width": 500,
					"medium_large-height": 500,
					large: "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"large-width": 500,
					"large-height": 500,
					"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"1536x1536-width": 500,
					"1536x1536-height": 500,
					"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"2048x2048-width": 500,
					"2048x2048-height": 500,
					"4K": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"4K-width": 500,
					"4K-height": 500,
					"1440p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"1440p-width": 500,
					"1440p-height": 500,
					"1080p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"1080p-width": 500,
					"1080p-height": 500,
					"720p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"720p-width": 500,
					"720p-height": 500,
					"480p": "https://cms.vibemap.com/wp-content/uploads/2020/06/Vibemap_City_Vancouver.png",
					"480p-width": 480,
					"480p-height": 480
				}
			},
			placemarker: {
				address: "Vancouver, BC, Canada",
				lat: 49.2827291,
				lng: -123.1207375,
				zoom: 14,
				place_id: "ChIJs0-pQ_FzhlQRi_OBm-qWkbs",
				name: "Vancouver",
				city: "Vancouver",
				state: "British Columbia",
				state_short: "BC",
				country: "Canada",
				country_short: "CA"
			},
			subheading: "",
			description: "",
			colors: {
				color_1: "#CCCCCC",
				color_2: "#DDDDDD"
			},
			vibeset: {
				ID: 324,
				post_author: "1",
				post_date: "2020-06-02 17:48:38",
				post_date_gmt: "2020-06-02 17:48:38",
				post_content: "",
				post_title: "Quiet Energy",
				post_excerpt: "",
				post_status: "publish",
				comment_status: "closed",
				ping_status: "closed",
				post_password: "",
				post_name: "quiet-energy",
				to_ping: "",
				pinged: "",
				post_modified: "2021-01-04 10:55:44",
				post_modified_gmt: "2021-01-04 18:55:44",
				post_content_filtered: "",
				post_parent: 0,
				guid: "https://52.148.191.161/?post_type=vibeset&#038;p=324",
				menu_order: 0,
				post_type: "vibeset",
				post_mime_type: "",
				comment_count: "0",
				filter: "raw"
			},
			photos: false
		},
		_links: {
			self: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city/1435"
				}
			],
			collection: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/city"
				}
			],
			about: [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/types/city"
				}
			],
			"wp:attachment": [
				{
					href: "https://cms.vibemap.com/wp-json/wp/v2/media?parent=1435"
				}
			],
			curies: [
				{
					name: "wp",
					href: "https://api.w.org/{rel}",
					templated: true
				}
			]
		},
		location: {
			latitude: 49.2827291,
			longitude: -123.1207375
		},
		name: "Vancouver"
	}
];

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com';
const REST_PATH = '/wp-json/wp/v2/';

//import * as helpers from '../dist/helpers.js';

const helpers = require('./helpers.js');

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

    case 'cities':
      return filter.map(slug => {
        // Find taxonomy that match slug
        const matches = helpers.filterList(cities, slug, 'slug');

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
const fetchNeighborhoods = async (filters = defaultFilters, page = 1, postsPerPage = 100) => {
    //console.log('fetchNeighborhoods: ', filters)

    // TODO: Filter by vibe or other attributes
    const source = Axios__default['default'].CancelToken.source();
    console.log('Filtering neighborhoods by: ', filters);

    let response = await Axios__default['default'].get(`${GATSBY_WP_BASEURL}/wp-json/wp/v2/neighborhoods`, {
        cancelToken: source.token,
        params: {
          _embed: true,
          per_page: postsPerPage,
          page: page >= 1 ? page : 1,
          //before: buildTime, // Let's make sure posts that have a page built are the only ones being pulled in.
          categories: filters.category,
          vibesets: filters.vibesets.toString(),
          //vibe: 1073, //TODO: Filter by vibe taxonomy
          cities: getTaxonomyIds('cities', filters.cities).toString(),
          //cities: filters.cities.toString(),
        },
      })
      .catch(error => {
        console.error(error);
      });

    response.numPages = parseInt(response.headers["x-wp-totalpages"]);

    return response
};

// Get post categories
const fetchCategories = async (filters = defaultFilters, page = 1, postsPerPage = 100) => {
  //console.log('fetchNeighborhoods: ', filters)

  // TODO: Filter by vibe or other attributes
  const source = Axios__default['default'].CancelToken.source();
  console.log('Filtering neighborhoods by: ', filters);

  let response = await Axios__default['default'].get(`${GATSBY_WP_BASEURL}/wp-json/wp/v2/categories/`, {
      cancelToken: source.token,
    })
    .catch(error => {
      console.error(error);
    });

  //console.log('Got response: ', response)

  response.numPages = parseInt(response.headers["x-wp-totalpages"]);

  return response
};

const getCityInfo = (name = 'San Francisco', slug = null) => {
  let city = null;
  if (slug) {
      // Handle both string and array
      slug = slug.toString();
      // Filter cities in wordpress
      const findCitySlug = cities.filter(result => result.slug === slug.toString());
      city = findCitySlug.length > 0 ? findCitySlug[0] : null;
  } {
      const findCityName = cities.filter(result => result.name === name);
      city = findCityName.length > 0 ? findCityName[0] : null;
  }

  return city
};

const filterNeighborhoods = (neighborhoods, city = 'San Francisco', slug = null) => {
  // Look up city by slug
  if (slug) {
    // Handle both string and array
    slug = slug.toString();
    // Filter cities in wordpress
    const findCitySlug = cities.filter(result => result.slug === slug.toString());
    city = findCitySlug.length > 0 ? findCitySlug[0].title.rendered : null;
  }

  // Template of the array objects
  // return {
  //   id: neighborhood.id,
  //   title: neighborhood.title.rendered,
  //   subtitle: 'Neighborhood',
  //   imageUrl: image,
  //   url: neighborhood.link.replace(/^(?:\/\/|[^/]+)*/, ''),
  //   slug: neighborhood.slug,
  //   city: neighborhood.acf.map.city,
  // };
  const filterPredicate = (neighborhood) => neighborhood.city === city || neighborhood.title.includes(city);

  // Return all, if there's not city filter
  if (city || slug) {
    return filter__default['default'](neighborhoods, filterPredicate)
  } else {
    return neighborhoods
  }
};

const fetchVibeTaxonomy = async () => {
    const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}vibe`;
    const response = await Axios__default['default'].get(endpoint)
        .catch(error => console.error(error));

    return response
};

async function getPosts(filters = defaultFilters, stickyOnly = false, per_page = 20) {

  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts`;

  // Sticky posts to be shown first
  // TODO: Filter by the vibe or just score by it?
  let top_posts = await Axios__default['default'].get(endpoint, {
    params: {
      per_page: per_page,
      vibe: getTaxonomyIds('vibe', filters.vibe).toString(),
      cities: getTaxonomyIds('cities', filters.cities).toString(),
      sticky: true
    }
  }).catch(error => console.error(error));

  // All other recent posts
  let recent_posts = await Axios__default['default'].get(endpoint, {
    params: {
      per_page: per_page,
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

exports.fetchCategories = fetchCategories;
exports.fetchCities = fetchCities;
exports.fetchNeighborhoods = fetchNeighborhoods;
exports.fetchVibeTaxonomy = fetchVibeTaxonomy;
exports.filterNeighborhoods = filterNeighborhoods;
exports.getCityInfo = getCityInfo;
exports.getPosts = getPosts;
exports.getTaxonomyIds = getTaxonomyIds;
