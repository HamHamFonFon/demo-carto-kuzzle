import kuzzle from '../services/kuzzle'
import config from '../services/config'

// let kuzzleDocumentEntity = new KuzzleDocumentEntity();

export default {

    /**
     *
     */
    loadDataFromKuzzle()
    {

        console.log(config);
        kuzzle.collection(config.kuzzleCollection, config.kuzzleIndex).fetchAllDocuments((err, res) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(res);
            }
        });

    }

}