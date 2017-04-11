/**
 * Test promise : load carto openlayers and load kuzzle when ok
 */
import map from './map'
// import kuzzleBridge from './kuzzleBridge'


let loadMap = new Promise(
    (resolve, object) => {
        resolve(map.initMap());
    }
);

loadMap.then((map) => {
    console.log(map);
   // kuzzleBridge.loadDataFromKuzzle();
})
.catch((reason) => {
    console.log('Probleme: ' + reason);
});