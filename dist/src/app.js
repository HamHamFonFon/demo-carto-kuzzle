/**
 * Test promise : load carto openlayers and load kuzzle when ok
 */
import olMap from './map'
import kuzzleBridge from './kuzzleBridge'
import config from '../services/config';

// Create Promise
let loadMap = new Promise(
    (resolve, object) => {
        resolve(olMap.initMap());
    }
);

// Retrieve data and push on map
loadMap.then((map) => {

    // 1 : Get data from Kuzzle
    kuzzleBridge.loadDataFromKuzzle();

    // 2: create a layer from data and adding them into map
    console.log(kuzzleBridge.state.kuzzleData);
    let kuzzleLayer = olMap.buildKuzzleLayer(kuzzleBridge.state.kuzzleData, config.collection);
    map.addLayer(kuzzleLayer);
})
.catch((reason) => {
    console.log('Probleme: ' + reason);
});