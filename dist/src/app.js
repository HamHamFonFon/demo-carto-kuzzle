/**
 * Test promise : load carto openlayers and load kuzzle when ok
 */
import olMap from './map'
import kuzzleBridge from './kuzzleBridge'
import config from '../services/config';

/**
 * @param ol.Map()
 */
let map = olMap.initMap();

// Create Promise
let loadMap = new Promise(
    (resolve, object) => {
        resolve(kuzzleBridge.loadDataFromKuzzle());
    }
);

// Retrieve data and push on map
loadMap.then((data) => {

    console.log(data); // -> pk retourne null ?

    // 2: create a layer from data and adding them into map
    let kuzzleLayer = olMap.buildKuzzleLayer(data, config.collection);

    map.addLayer(kuzzleLayer);
})
.catch((reason) => {
    console.log('Problem: ' + reason);
});