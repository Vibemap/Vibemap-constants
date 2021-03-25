const writeJson = require('write-json'); 

const wordpress = require('../dist/wordpress.js')

fetchAll()

const path = 'dist/'

async function fetchAll(){
    
    const response = await wordpress.fetchCities()

    const cities = response.data.map(city => {
        city.location = {
            latitude : city.acf.placemarker.lat,
            longitude : city.acf.placemarker.lng 
        }
        city.name = city.title.rendered
        delete city.yoast_head

        return city
    })

    console.log('- Received cities data')
    
    writeJson(path + 'cities.json', cities, function(err) {
        if (err) console.warn(err)
        console.log('- cities.json data is saved.');
    })

    const neighborhoods = await wordpress.fetchNeighborhoods()
    //console.log('- Received neighborhoods data', neighborhoods)

    writeJson(path + 'neighborhoods.json', neighborhoods.data, function(err) {
        if (err) console.log(err)
        console.log('- neighborhoods.json data is saved.');
    })

    const vibeTaxonomy = await wordpress.fetchVibeTaxonomy()
    console.log('- Received vibe taxonomoy data')

    writeJson(path + 'vibeTaxonomy.json', vibeTaxonomy.data, function(err) {
        if (err) console.log(err)
        console.log('- vibeTaxonomy.json data is saved.');
    })
}
