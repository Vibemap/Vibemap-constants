const writeJson = require('write-json');
const wordpress = require('../dist/wordpress.js')
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

        return city
    })

    const badgesResponse = await wordpress.fetchBadges()

    const badges = badgesResponse.data.map(badge => {
        badge.key = badge.slug
        badge.count = parseInt(badge.acf.count)
        badge.description = badge.acf.description
        badge.has_location = badge.acf.has_location
        badge.map = badge.acf.map
        badge.event = badge.acf.event
        badge.icon = badge.acf.icon
        badge.name = badge.acf.name
        
        delete badge.excerpt
        delete badge['_links']
        delete badge.yoast_head
        delete badge.acf
        delete badge.content
        delete badge.title
        delete badge.guid

        return badge
    })

    console.log('- Received badges data ', badges)
    writeJson(path + 'badges.json', { badges : badges } , function(err) {
        if (err) console.warn(err)
        console.log('- badges.json data is saved.');
    })

    //console.log('- Cities data ', cities)

    writeJson(path + 'cities.json', cities, function(err) {
        if (err) console.warn(err)
        console.log('- cities.json data is saved.');
    })

    const categoriesResponse = await wordpress.fetchCategories()

    const postCategories = categoriesResponse.data.map(category => {
        delete category.yoast_head
        delete category['_links']
        return category
    })
    //console.log('- Received fetchCategories data', postCategories)

    writeJson(path + 'postCategories.json', postCategories, function(err) {
        if (err) console.log(err)
        console.log('- postCategories.json data is saved.');
    })

    const neighborhoodsResponse = await wordpress.fetchNeighborhoods()
    neighborhoods = neighborhoodsResponse.data.map(neighborhood => {
        neighborhood['map'] = neighborhood['acf']['map']
        delete neighborhood['_links']
        delete neighborhood['_embedded']
        delete neighborhood['acf']
        return neighborhood
    })
    console.log('- Received neighborhoods data')

    writeJson(path + 'neighborhoods.json', neighborhoods, function(err) {
        if (err) console.log(err)
        console.log('- neighborhoods.json data is saved.');
    })

    const vibeTaxonomy = await wordpress.fetchVibeTaxonomy()
    console.log('- Received vibe taxonomoy data')
    //console.log('vibeTaxonomy ', vibeTaxonomy.data)

    writeJson(path + 'vibeTaxonomy.json', vibeTaxonomy.data, function(err) {
        if (err) console.log(err)
        console.log('- vibeTaxonomy.json data is saved.');
    })
}
