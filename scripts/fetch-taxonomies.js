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
        city.name = city.title.rendered
        delete city.yoast_head
        delete city.acf

        return city
    })

    console.log('- Received cities data')
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

    const neighborhoods = await wordpress.fetchNeighborhoods()
    console.log('- Received neighborhoods data', neighborhoods)

    writeJson(path + 'neighborhoods.json', neighborhoods.data, function(err) {
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
