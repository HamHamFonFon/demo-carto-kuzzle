/**
 * Connexion to Kuzzle
 */
import Kuzzle from 'kuzzle-sdk'
import config from './config'

var optionsConnect = {
    defaultIndex: config.kuzzleIndex,
    autoReconnect: true,
    port : 7512,
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
};

var kuzzle = new Kuzzle(config.kuzzleUrl, optionsConnect, (err, res) => {
    if (err) {
        console.log(err.message);
    }
});

export default kuzzle;