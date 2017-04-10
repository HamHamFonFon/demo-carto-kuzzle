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

kuzzle = new Kuzzle(config.kuzzleUrl, optionsConnect, function(err, res) {
    if (err) {
        console.log(err.message);
    } else {
        console.log(res);
    }
});

export default kuzzle;