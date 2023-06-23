const fs = require('fs');
const writeJson = require('write-json');
const jsonpack = require('jsonpack')
const yaml = require('js-yaml');

const wordpress = require('../dist/wordpress.js')
const vibes = require('../dist/vibes.js')

const vibes_matrix = require('../utils/vibeRelations.json')
const path = 'dist/'

fetchAll()

async function fetchAll(){

    const response = await wordpress.fetchCities()

    // ⚡️  Get Cities
    const cities = response.data.map(city => {
        city.location = {
            latitude : city.acf.placemarker.lat,
            longitude : city.acf.placemarker.lng
        }
        city.centerpoint = [city.acf.placemarker.lng, city.acf.placemarker.lat]
        city.mailchimp_id = city.acf.mailchimp_id
        city.database_id = city.acf.database_id
        city.radius = parseInt(city.acf.radius)
        city.type = city.acf.type
        city.name = city.title.rendered

        delete city.yoast_head
        delete city.acf
        delete city.categories
        delete city.database_id
        delete city.link
        delete city.title

        return city
    })

    // Write data to file console.log('- Cities data ', cities)
    writeJson(path + 'cities.json', cities, function(err) {
        if (err) console.warn(err)
        console.log('- cities.json data is saved.');
    })

    // ⚡️  Get Badges
    const badgesResponse = await wordpress.fetchBadges()
    const badges = badgesResponse.data.map(badge => {
        badge.key = badge.slug
        badge.count = parseInt(badge.acf.count)
        badge.description = badge.acf.description
        badge.has_location = badge.acf.has_location
        badge.locations = badge.acf.locations
        badge.map = badge.acf.map
        badge.event = badge.acf.event
        badge.icon = badge.acf.icon
        badge.name = badge.acf.name
        badge.type = badge.acf.type

        if (badge.has_location) {
            location = badge.locations[0]
            badge.location = {
                ID: location.ID,
                post_title: location.post_title,
                post_name: location.post_name
            }
            if (badge.map) {
                badge.map = {
                    address: badge.map.address,
                    lat: badge.map.lat,
                    lng: badge.map.lng,
                    city: badge.map.city,
                    name: badge.map.name,
                    zoom: badge.map.zoom,
                }
            }
        }

        if (badge.icon) {
            badge.icon = {
                id: badge.icon.id,
                url: badge.icon.url,
                icon: badge.icon.icon
            }
        }

        delete badge.count
        delete badge.excerpt
        delete badge['_links']
        delete badge.yoast_head
        delete badge.acf
        delete badge.categories
        delete badge.date
        delete badge.date_gmt
        delete badge.modified
        delete badge.modified_gmt
        delete badge.author
        delete badge.featured_media
        delete badge.id
        delete badge.icon.id
        delete badge.link
        delete badge.locations
        delete badge.menu_order
        delete badge.template
        delete badge.format
        delete badge.meta
        delete badge.yoast_head_json
        delete badge.content
        delete badge.tags
        delete badge.title
        delete badge.url
        delete badge.guid

        return badge
    })
    // Write data to file: console.log('- Received badges data ', badges)
    writeJson(path + 'badges.json', { badges : badges } , function(err) {
        if (err) console.warn(err)
        console.log('- badges.json data is saved.');
    })

    // Also save to constants
    writeJson('constants/' + 'cities.json', cities, function (err) {
        if (err) console.warn(err)
        console.log('- cities.json data is saved.');
    })

    // ⚡️  Get Activity Categories and Relations
    const activitiesResponse = await wordpress.fetchActivityCategories()
    let activityCategories = activitiesResponse.map(category => {
        category.title = category.name
        category.details = category.acf

        // Make sure categories and vibes are arrays
        if (category.details.sub_categories == false || category.details.sub_categories == undefined) category.details.sub_categories = []
        if (category.details.vibes == false || category.details.vibes == undefined) category.details.vibes = []

        category.details.search_term = category.details.search_term == "" || category.details.search_term == undefined
            ? category.details.search_term = null
            : category.details.search_term

        category.details.vibes = category.details.vibes.map(vibe => ( vibe.slug ))
        category.details.sub_categories = category.details.sub_categories.map(sub_category => ({
            slug: sub_category.slug,
            id: sub_category.term_id
        }))

        delete category.acf
        delete category.taxonomy
        delete category.count
        delete category.yoast_head
        delete category.yoast_head_json
        delete category['_links']
        delete category.link
        delete category.meta
        delete category.title
        delete category.details.hide_legacy_fields
        delete category.details.search_term
        delete category.details.seo_focus_keyword
        delete category.details.seo_title
        delete category.details.verb
        delete category.details.vibeset
        delete category.term_id

        return category
    })

    // Add subcategories to parents
    activityCategories.forEach((category, index) => {

        const parents = category.details.parent_categories

        if (category.slug && category.slug == "all") category.level = 1

        if (parents) {
            category.details.parent_categories.forEach(parent => {
                const parentID = parent.term_taxonomy_id

                const parentIndex = activityCategories.findIndex(item => item.id == parentID)
                const parentCategory = activityCategories.find(item => item.id == parentID)
                //const parentCategory = category.details.parent_categories ? category.details.parent_categories[0] : null
                //console.log(`TODO: Get parent categories `, category);

                // Remove parent category, after lookup
                delete category.details.parent_categories

                if (category.slug == "all") category.level = 1

                if (parentCategory) {
                    // Set parent category and index
                    const firstParent = activityCategories[index].parent_slug = parents[0].slug
                    //console.log(`Add subcategories to parents `, category.slug, parentCategory.slug)

                    // Include a value for the level of hierarchy
                    if (firstParent == "all" || parentCategory.slug == "all") {
                        category.level = 2
                    } else {
                        // FIXME: Should hanlde deeper levels
                        console.log('parentCategory.level', firstParent, firstParent.level)
                        category.level = parent.level
                            ? parent.level + 1
                            : 3
                    }

                    // Add subcategories to parents
                    alreadyHasCategory = parentCategory.details && parentCategory.details.sub_categories.find(sub_category => sub_category.slug == category.slug)
                    console.log(`alreadyHasCategory `, alreadyHasCategory, parentIndex);
                    if (alreadyHasCategory == undefined) {
                        const newSubCategory = { ...category }
                        newSubCategory.term_id = newSubCategory.id

                        delete newSubCategory.description
                        delete newSubCategory.details
                        delete newSubCategory.filter
                        delete newSubCategory.level
                        delete newSubCategory.name
                        delete newSubCategory.parent
                        delete newSubCategory.parent_slug
                        delete newSubCategory.term_id
                        delete newSubCategory.title
                        delete newSubCategory.term_group
                        console.log('Reduce size of sub cat ', newSubCategory);

                        activityCategories[parentIndex].details.sub_categories.push(newSubCategory)
                        // TODO: sort by name or MSV?
                        console.log(`- category ${category.slug} added to ${parentCategory.slug}`)

                    } else {
                        console.log(`- cateogry ${category.slug} is already in ${parentCategory.slug}`)
                    }
                } else {
                    console.log(`Couldn't find parent category for ${category.slug} ${parentIndex}`, category)
                }

            })
        }

        return false

        // TODO: This the primary parent category, but there can be multiple
        const parentID = category.details.parent_categories
            ? category.details.parent_categories[0].term_taxonomy_id
            : null

    })

    writeJson(path + 'activityCategories.json', { activityCategories : activityCategories }, function (err) {
        if (err) console.log(err)
        console.log('- activityCategories.json data is saved.');
    })

    const activityCategoriesPacked = jsonpack.pack(activityCategories)
    writeJson(path + 'activityCategories.zip.json', activityCategoriesPacked, function (err) {
        if (err) console.log(err)
        console.log('- activityCategoriesPacked data is saved.');
    })

    // Get all post categories
    const categoriesResponse = await wordpress.fetchCategories()

    const postCategories = categoriesResponse.data.map(category => {
        delete category.meta
        delete category.taxonomy
        delete category.yoast_head
        delete category.yoast_head_json
        delete category['_links']
        return category
    })

    writeJson(path + 'postCategories.json', postCategories, function(err) {
        if (err) console.log(err)
        console.log('- postCategories.json data is saved.');
    })

    // Get all neighborhooods
    const neighborhoodsResponse = await wordpress.fetchNeighborhoods()
    neighborhoods = neighborhoodsResponse.data.map(neighborhood => {
        neighborhood['map'] = neighborhood['acf']['map']
        neighborhood['radius'] = neighborhood['acf']['radius']
        neighborhood['boundary'] = neighborhood['acf']['boundary']
        neighborhood['name'] = neighborhood['title']['rendered']

        neighborhood['location'] = {
            latitude: neighborhood.map.lat,
            longitude: neighborhood.map.lng,
            zoom: neighborhood.map.zoom
        }
        neighborhood['map'] = {
            lat: neighborhood.map.lat,
            lng: neighborhood.map.lng,
            zoom: neighborhood.map.zoom
        }

        delete neighborhood['_links']
        delete neighborhood['_embedded']
        delete neighborhood['acf']
        delete neighborhood['boundary']
        delete neighborhood['categories']
        delete neighborhood['content']
        delete neighborhood['featured_media']
        delete neighborhood['id']
        delete neighborhood['link']
        delete neighborhood['title']
        delete neighborhood['type']

        return neighborhood
    })
    console.log('- Received neighborhoods data')

    writeJson(path + 'neighborhoods.json', neighborhoods, function(err) {
        if (err) console.log(err)
        console.log('- neighborhoods.json data is saved.');
    })

    let vibeTaxonomy = await wordpress.fetchVibeTaxonomy()
    const allVibes = vibes.getVibes('all')
    //console.log('All vibeTaxonomy ', vibeTaxonomy)

    vibeTaxonomy = vibeTaxonomy.map(taxonomy => {
        //console.log('taxonomy ', taxonomy)
        const vibeLookup = allVibes.find(vibe => vibe.key == taxonomy.slug )
        //console.log('For vibe from Wordpress: ', taxonomy)

        if (vibeLookup && vibeLookup.related) {
            console.log('Found match: ', vibeLookup)
        }

        // Rename and reduce
        taxonomy.details = taxonomy.acf
        taxonomy.details.msv = parseInt(taxonomy.details.msv)
        delete taxonomy.details.activity_taxonomy
        delete taxonomy.details.icon

        //console.log('taxonomy.details.vibes ', taxonomy.slug, typeof (taxonomy.details.vibes), taxonomy.details.vibes.length)
        if (taxonomy.details.vibes != undefined && taxonomy.details.vibes.length > 0) {
            taxonomy.details.vibes = taxonomy.details.vibes.map(vibe => ( vibe.slug ))
        }

        if (taxonomy.details.affirmations) {
            let affirmations = []

            taxonomy.details.affirmations.forEach(item => {
                if (item.affirmation && item.affirmation.length > 0) {
                    affirmations.push(item.affirmation)
                }
            })

            taxonomy.details.affirmations = affirmations
        }

        delete taxonomy.acf
        delete taxonomy.link
        delete taxonomy.id
        return taxonomy
    })

    /* TODO: This is just for sync purposes
    allVibes.map(vibe => {
        const vibeLookup = vibeTaxonomy.find(taxonomy => taxonomy.slug == vibe.key)

        if (vibeLookup) {
            //console.log('Found vibe in Wordpress? ', vibe)
        } else {
            console.log('!! Missing from Wordpress? ', vibe)
        }

    })
    */
    //console.log('- Received vibe taxonomoy data ', vibeTaxonomy)
    //console.log('vibeTaxonomy ', vibeTaxonomy.data)
    const taxonomoyPacked = jsonpack.pack(vibeTaxonomy)
    writeJson(path + 'vibesFromCMSTaxonomy.zip.json', taxonomoyPacked, function(err) {
        if (err) console.log(err)
        console.log('- vibeTaxonomy.json data is saved.');
    })

    const vibeRelationsPacked = jsonpack.pack(vibes_matrix)
    writeJson(
      path + 'vibeRelations.zip.json',
      vibeRelationsPacked,
      function (err) {
        if (err) console.log(err)
        console.log('- vibeRelations.zip.json data is saved.')
      }
    )

    writeJson(path + 'vibesFromCMSTaxonomy.json', vibeTaxonomy, function (err) {
      if (err) console.log(err)
      console.log('- vibeTaxonomy.json data is saved.')
    })

    // Map categories to existing Yaml file used on the backend
    const yamlActivityCategories = yaml.dump({
        categories : activityCategories.map(activityCategory => {
            activityCategory.icon = activityCategory.details.icon
            activityCategory.sub_categories = activityCategory.details.sub_categories.map(sub_category => {
                delete sub_category.description
                delete sub_category.parent
                delete sub_category.title

                return sub_category
            })
            activityCategory.related_vibes = activityCategory.details.vibes
            activityCategory.popularity = activityCategory.details.msv
                ? activityCategory.details.msv
                : 0

            delete activityCategory.details
            return activityCategory
        })},
        { sortKeys : true }
    )

    fs.writeFileSync(
        __dirname + '/../constants/categories.yml',
        yamlActivityCategories,
        'utf8'
    )
    // Map vibes to existing Yaml file used on the backend
    const yamlVibes = yaml.dump({
        vibes: vibeTaxonomy.map(vibe => {
            vibe.definition = vibe.description
            vibe.related = vibe.details.vibes
            vibe.popularity = vibe.details.msv
            vibe.key = vibe.slug

            delete vibe.description
            delete vibe.details
            return vibe
        })
    }, { sortKeys: true })

    fs.writeFileSync(
        __dirname + '/../constants/vibes.yml',
        yamlVibes,
        'utf8'
    )

}
