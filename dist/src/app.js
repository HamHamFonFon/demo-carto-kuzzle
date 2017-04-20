import Rx from 'rx'
import olMap from './map'
import kuzzleBridge from './kuzzleBridge'
import config from '../services/config';

/**
 * @param ol.Map()
 */
let sourceMap = olMap.initMap();

// TEST AVEC Observable
let sourceData = Rx.Observable.fromCallback(kuzzleBridge.loadDataFromKuzzle());

let subscription = sourceData.subscribe(
    x => {
        let f = new ol.format.GeoJSON();
        let feature = f.readFeature(x, {dataProjection: config.projectionTo, featureProjection: config.projectionFrom})
        olMap.getKuzzleLayer().getSource().addFeature(feature)
    },
    e => console.log('Error : %s', e),
    () => console.log('data loaded')
);

// TEST AVEC Promise
// let loadMap = new Promise(
//     (resolve, object) => {
//         resolve(kuzzleBridge.loadDataFromKuzzle());
//     }
// );
//
// // Retrieve data and push on map
// loadMap.then((data) => {
//
//     console.log(data); // -> pk retourne null ?
//
//     // 2: create a layer from data and adding them into map
//     let kuzzleLayer = olMap.buildKuzzleLayer(data, config.collection);
//
//     sourceMap.addLayer(kuzzleLayer);
// })
// .catch((reason) => {
//     console.log('Problem: ' + reason);
// });