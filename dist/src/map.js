import config from '../services/config'
// import kuzzleBridge from './kuzzleBridge'

export default {

    state: {
        map: null,
        osm: null,
        view: null,
        zoom: 10,
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
            type: 'overlays',
            source: new ol.source.OSM()
        });


        // Kuzzle layers
        this.state.kuzzleLayer = new ol.layer.Vector({
            type: 'base',
            visible: false
        });
        // TODO build map layer

        // this.state.groupKuzzleMap = new ol.layer.Group({
        //     title: "Kuzzle maps",
        //     layers: []
        // });

        // Build view
        this.state.view = new ol.View({
            zoom: this.state.zoom,
            center: new ol.geom.Point(this.state.coordinates).transform(config.projectionTo, config.projectionFrom).getCoordinates()
        });

        // Build Map
        this.state.map = new ol.Map({
            layers: [this.state.osm, this.state.kuzzleLayer],
            target: 'map',
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: false
                })
            }).extend([
                new ol.control.MousePosition({
                    coordinateFormat:  function(coordinate) {
                        return ol.coordinate.format(coordinate, 'Lat : {y} / Long : {x}', 4);
                    },
                    projection: config.projectionTo
                })
            ]),
            view: this.state.view
        });

        return this.state.map;
    },

    /**
     *
     * @param listDataGeojson
     * @param collection
     */
    buildKuzzleLayer(listDataGeojson, collection)
    {
        var layer = new ol.layer.Vector({
            'title': collection,
            'type': 'base',
            'visible': true
        });

        var dataGeoJSON = {
            "type": "FeatureCollection",
            "features": listDataGeojson
        };

        // Transform geojson into source vector
        var kGeoJSON = new ol.format.GeoJSON().readFeatures(dataGeoJSON, {featureProjection: config.projectionFrom});
        var kSource = new ol.source.Vector({
            features: kGeoJSON
        });

        // Add source to layer
        layer.setSource(kSource);

        // Add layer to map
        this.state.map.addLayer(layer);
    }
}