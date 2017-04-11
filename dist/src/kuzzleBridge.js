import kuzzle from '../services/kuzzle'
import config from '../services/config'

// let kuzzleDocumentEntity = new KuzzleDocumentEntity();

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

        kuzzle
            .collection(config.kuzzleCollection, config.kuzzleIndex)
            .searchPromise(filter)
            .then(res => {
                console.log(res);
            });
    }

}