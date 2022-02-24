const writeJson = require('write-json');
const jsonpack = require('jsonpack')

const wordpress = require('../dist/wordpress.js')
const vibes = require('../dist/vibes.js')

const vibes_matrix = require('../utils/vibeRelations.json')
const path = 'dist/'


fetchAll()

async function fetchAll(){

    const response = await wordpress.fetchCities()

    const cities = response.data.map(city => {
        city.location = {
            latitude : city.acf.placemarker.lat,
            longitude : city.acf.placemarker.lng
        }
        city.mailchimp_id = city.acf.mailchimp_id
        city.database_id = city.acf.database_id
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

    const badgesResponse = await wordpress.fetchBadges()

    const badges = badgesResponse.data.map(badge => {
        badge.key = badge.slug
        badge.count = parseInt(badge.acf.count)
        badge.description = badge.acf.description
        badge.has_location = badge.acf.has_location
        badge.location = badge.acf.location
        badge.map = badge.acf.map
        badge.event = badge.acf.event
        badge.icon = badge.acf.icon
        badge.name = badge.acf.name
        badge.type = badge.acf.type

        delete badge.count
        delete badge.excerpt
        delete badge['_links']
        delete badge.yoast_head
        delete badge.acf
        delete badge.date
        delete badge.date_gmt
        delete badge.modified
        delete badge.modified_gmt
        delete badge.author
        delete badge.featured_media
        delete badge.link
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

        if (badge.has_location) {
            badge.location = {
                ID: badge.location.ID,
                post_title: badge.location.post_title,
                post_name: badge.location.post_name
            }
            badge.map = {
                address: badge.map.address,
                lat: badge.map.lat,
                lng: badge.map.lng,
                city: badge.map.city,
                name: badge.map.name,
                zoom: badge.map.zoom,
            }
        }

        if (badge.icon) {
            badge.icon = {
                id: badge.icon.id,
                url: badge.icon.url,
                icon: badge.icon.icon
            }
        }

        return badge
    })

    //console.log('- Received badges data ', badges)
    writeJson(path + 'badges.json', { badges : badges } , function(err) {
        if (err) console.warn(err)
        console.log('- badges.json data is saved.');
    })

    //console.log('- Cities data ', cities)

    writeJson(path + 'cities.json', cities, function(err) {
        if (err) console.warn(err)
        console.log('- cities.json data is saved.');
    })

    // Also save to constants
    writeJson('constants/' + 'cities.json', cities, function (err) {
        if (err) console.warn(err)
        console.log('- cities.json data is saved.');
    })

    // Get all post categories
    const activitiesResponse = await wordpress.fetchActivityCategories()

    let activityCategories = activitiesResponse.data.map(category => {
        category.details = category.acf

        // Make sure categories and vibes are arrays
        if (category.details.sub_categories == false || category.details.sub_categories == undefined) category.details.sub_categories = []
        if (category.details.vibes == false || category.details.vibes == undefined) category.details.vibes = []

        category.details.vibes = category.details.vibes.map(vibe => ( vibe.slug ))
        category.details.sub_categories = category.details.sub_categories.map(sub_category => ({
            name: sub_category.name,
            description: sub_category.description,
            parent: sub_category.parent,
            slug: sub_category.slug,
            id: sub_category.term_id }
        ))

        delete category.acf
        delete category.taxonomy
        delete category.count
        delete category.yoast_head
        delete category.yoast_head_json
        delete category['_links']
        delete category.link
        delete category.meta
        delete category.term_id

        return category
    })

    // Add subcategories to parents
    activityCategories.forEach(category => {

        const parentIndex = activityCategories.findIndex(item => item.id == category.parent)
        const parentCategory = activityCategories.find(item => item.id == category.parent)

        if (parentCategory) {

            alreadyHasCategory = parentCategory.details.sub_categories.find( sub_category => sub_category.slug == category.slug )

            if (alreadyHasCategory == undefined) {
                const newSubCategory = category
                newSubCategory.term_id = newSubCategory.id
                delete newSubCategory.details
                delete newSubCategory.filter
                delete newSubCategory.term_group

                activityCategories[parentIndex].details.sub_categories.push(newSubCategory)
                // TODO: sort by name or MSV?
                console.log(`- category ${category.slug} added to ${parentCategory.slug}`)

            } else {
                console.log(`- cateogry ${category.slug} is already in ${parentCategory.slug}`)
            }
        }
    })

    writeJson(path + 'activityCategories.json', { activityCategories : activityCategories }, function (err) {
        if (err) console.log(err)
        console.log('- activityCategories.json data is saved.');
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

}
