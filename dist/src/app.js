/**
 * Test promise : load carto openlayers and load kuzzle when ok
 */
import olMap from './map'
import KuzzleDocumentEntity from './kuzzleDocumentEntity'
// import kuzzleBridge from './kuzzleBridge'

// Instance of KuzzleDocument to Feature
let kuzzleDocumentEntityMock = new KuzzleDocumentEntity();

// Create Promise
let loadMap = new Promise(
    (resolve, object) => {
        resolve(olMap.initMap());
    }
);

loadMap.then((map) => {

    let listGeoJsonMock = [];

    // 1 : Get data from Kuzzle
    // kuzzleBridge.loadDataFromKuzzle();
    // resultKuzzleMock is a mock of a REST request on Kuzzle
    var resultKuzzleMock = {
        "requestId": "40b8a1bf-8af2-4ebc-aebc-f0efc29bafba",
        "status": 200,
        "error": null,
        "controller": "document",
        "action": "get",
        "collection": "ol4_default",
        "index": "local_index",
        "metadata": null,
        "result": {
            "_index": "local_index",
            "_type": "ol4_default",
            "_id": "AVteoXOkqi4FHLLrGCuu",
            "_version": 1,
            "found": true,
            "_source": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        3.9609146118164054,
                        43.624395670027354
                    ]
                },
                "fields": {
                    "name": "Test",
                    "date_creation": "2017-04-10"
                }
            }
        }
    };
    listGeoJsonMock.push(kuzzleDocumentEntityMock.fromDocumentToFeature(resultKuzzleMock.result));

    // 2: create a layer from data and adding them into map
    let kuzzleLayer = olMap.buildKuzzleLayer(listGeoJsonMock, resultKuzzleMock.collection);
    map.addLayer(kuzzleLayer);
})
.catch((reason) => {
    console.log('Probleme: ' + reason);
});