import kuzzle from '../services/kuzzle'
import config from '../services/config'
import KuzzleDocumentEntity from './kuzzleDocumentEntity'

let kuzzleDocumentEntity = new KuzzleDocumentEntity();

export default {

    state: {

    },

    /**
     * Load data and create a mapping layer
     */
    loadDataFromKuzzle()
    {
        var filter = {
            from: 0,
            size: 10000
        };

        console.log(filter);

        kuzzle
            .collection(config.kuzzleCollection, config.kuzzleIndex)
            .searchPromise(filter)
            .then(res => {
                listDataGeojson = res.documents.map(document => {
                    return kuzzleDocumentEntity.fromDocumentToFeature(document);
                });

                console.log(listDataGeojson);
            });
    }

}