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
        let this_ = this;

        // Callback function
        this.cb = (err, res) => {
            if (!err && 0 < res.total) {
                this_.state.kuzzleData = res.documents.map(document => {
                    return kuzzleDocumentEntity.fromDocumentToFeature(document);
                });

                console.log(this_.state.kuzzleData);
            } else {
                console.log(err.message);
            }
        };

        // Search function
        kuzzle
            .collection(config.kuzzleCollection, config.kuzzleIndex)
            .search({
                from: 0,
                size: 10000
            }, this.cb);

        // ?? comment retourner les datas ds la promise ???
        return this.state.kuzzleData;
    }

}