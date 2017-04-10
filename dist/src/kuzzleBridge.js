import kuzzle from './services/kuzzle'
import config from './services/config'

let kuzzleDocumentEntity = new KuzzleDocumentEntity();

export default {

    /**
     *
     */
    loadDataFromKuzzle()
    {

        var options = {

        };

        kuzzle.collection(config.kuzzleCollection, config.kuzzleIndex).fetchAllDocuments(options, (err, res) => {

        });

    }

}