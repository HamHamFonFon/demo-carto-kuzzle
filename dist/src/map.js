import config from '../services/config'
// import kuzzleBridge from './kuzzleBridge'
import ol from 'openlayers'

export default {

    state: {
        map: null,
        osm: null,
        view: null,
        zoom: 13,
        coordinates: null,
        groupBaseMap: null,
        groupKuzzleMap: null
    },

    initMap()
    {
        this.state.coordinates = [config.longDefault, config.latDefault];

        // OpenStreetmap base map
        this.state.osm = new ol.layer.Tile({
            title: 'Open Street Map',
            visible: true,
            source: new ol.source.OSM()
        });

        this.state.groupBaseMap = new ol.layer.Group({
            title: "Base map",
            layers: [this.state.osm]
        });

        // Kuzzle layers
        // TODO build map layer

        // this.state.groupKuzzleMap = new ol.layer.Group({
        //     title: "Kuzzle maps",
        //     layers: []
        // });

        // Build view
        this.state.view = new ol.View({
            zoom: this.state.zoom,
            center:  new ol.geom.Point(this.state.coordinates).transform(this.state.projectionTo, this.state.projectionFrom).getCoordinates()
        });

        // var pointCenter = new ol.geom.Point([lon, lat]).transform(this.state.projectionTo, this.state.projectionFrom).getCoordinates();

        // Build Map
        this.state.map = new ol.Map({
            // layers: [this.state.groupBaseMap/*, this.state.groupKuzzleMap*/],
            layers: this.state.groupBaseMap,
            target: 'map',
            view: this.state.view
        });
    }
}