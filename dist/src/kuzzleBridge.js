import kuzzle from '../services/kuzzle'
import config from '../services/config'
import KuzzleDocumentEntity from './kuzzleDocumentEntity'

let kuzzleDocumentEntity = new KuzzleDocumentEntity();

export default {

    state: {
        kuzzleData: null
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

        let this_ = this;

        kuzzle
            .collection(config.kuzzleCollection, config.kuzzleIndex)
            .search(filter, (err, res) => {
                if (!err && 0 < res.total) {
                    this_.state.kuzzleData = res.documents.map(document => {
                        return kuzzleDocumentEntity.fromDocumentToFeature(document);
                    });
                } else {
                    console.log(err.message);
                }
            });
            // .then(res => {
            //     listDataGeojson = res.documents.map(document => {
            //         return kuzzleDocumentEntity.fromDocumentToFeature(document);
            //     });
            //
            // });

        // console.log(listDataGeojson);
    }

}