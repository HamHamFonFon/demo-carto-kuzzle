/**
 * Test promise : load carto openlayers and load kuzzle when ok
 */
import olMap from './map'
import KuzzleDocumentEntity from './kuzzleDocumentEntity'
// import kuzzleBridge from './kuzzleBridge'

let kuzzleDocumentEntityMock = new KuzzleDocumentEntity();

let loadMap = new Promise(
    (resolve, object) => {
        resolve(olMap.initMap());
    }
);

loadMap.then((map) => {

    var listGeoJsonMock = [];

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
            },
            "_kuzzle_info": {
                "author": "hamham",
                "createdAt": 1491941290910,
                "updatedAt": null,
                "updater": null,
                "active": true,
                "deletedAt": null
            }
        }
    };

    listGeoJsonMock.push(kuzzleDocumentEntityMock.fromDocumentToFeature(resultKuzzleMock.result));

    var layer = olMap.buildKuzzleLayer(listGeoJsonMock, resultKuzzleMock.collection);

    console.log(layer);
    map.addLayer(layer);
   // kuzzleBridge.loadDataFromKuzzle();
})
.catch((reason) => {
    console.log('Probleme: ' + reason);
});