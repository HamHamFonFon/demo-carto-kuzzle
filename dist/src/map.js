// import config from '../services/config'
// import kuzzleBridge from './kuzzleBridge'
import map from 'ol/map'

export default {

    state: {
        map: null,
        osm: null,
        view: null,
        zoom: 13,
        groupBaseMap: null,
        groupKuzzleMap: null
    },

    initMap()
    {

        // Build view
        this.state.view = new ol.View({
            zoom: this.state.zoom
        });

        // OpenStreetmap base map
        this.state.osm = new ol.layer.Tile({
            title: 'Open Street Map',
            visible: true,
            type: 'overlays',
            source: new ol.source.OSM()
        });

        this.state.groupBaseMap = new ol.layer.Group({
            title: "Base map",
            layers: [this.state.osm]
        });

        // Kuzzle layers
        // TODO build map layer

        this.state.groupKuzzleMap = new ol.layer.Group({
            title: "Kuzzle maps",
            layers: []
        });

        // Build Map
        this.state.map = new Map({
            layers: [this.state.groupBaseMap, this.state.groupKuzzleMap],
            target: 'map',
            view: this.state.view
        });
    }
}