const writeJson = require('write-json'); 

const wordpress = require('../dist/wordpress.js')

fetchAll()

const path = 'dist/'

async function fetchAll(){
    
    const cities = await wordpress.fetchCities()
    console.log('- Received cities data')
    
    writeJson(path + 'cities.json', cities.data, function(err) {
        if (err) console.warn(err)
        console.log('- cities.json data is saved.');
    })

    const neighborhoods = await wordpress.fetchNeighborhoods()
    console.log('- Received neighborhoods data', neighborhoods)

    writeJson(path + 'neighborhoods.json', neighborhoods.data, function(err) {
        if (err) console.log(err)
        console.log('- neighborhoods.json data is saved.');
    })

    const vibeTaxonomy = await wordpress.fetchVibeTaxonomy()
    console.log('- Received vibe taxonomoy data', neighborhoods)

    writeJson(path + 'vibeTaxonomy.json', vibeTaxonomy.data, function(err) {
        if (err) console.log(err)
        console.log('- vibeTaxonomy.json data is saved.');
    })
}
