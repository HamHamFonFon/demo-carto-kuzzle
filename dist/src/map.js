import config from '../services/config'

export default {

    state: {
        map: null,
        osm: null,
        view: null,
        zoom: 10,
        coordinates: null,
        groupBaseMap: null,
        groupKuzzleMap: null,
        listStyleFeatures: [],
        zindex: 20
    },

    /**
     * Initialisation of map
     * @returns {null}
     */
    initMap()
    {
        this.state.coordinates = [config.longDefault, config.latDefault];

        this.state.listStyleFeatures = this.setStylesFeature();

        // OpenStreetmap base map
        this.state.osm = new ol.layer.Tile({
            title: 'Open Street Map',
            visible: true,
            type: 'overlays',
            source: new ol.source.OSM()
        });


        // Build view
        this.state.view = new ol.View({
            zoom: this.state.zoom,
            center: new ol.geom.Point(this.state.coordinates).transform(config.projectionTo, config.projectionFrom).getCoordinates()
        });

        // Build Map
        this.state.map = new ol.Map({
            layers: [this.state.osm],
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
            view: this.state.view,
        });

        return this.state.map;
    },

    /**
     *
     * @param listDataGeojson
     * @param collection
     */
    buildKuzzleLayer(listDataGeojson, collectionName)
    {
        var this_ = this;
        var layer = new ol.layer.Vector({
            'title': collectionName,
            'type': 'base',
            'visible': true
        });

        if (0 < listDataGeojson.length) {
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
        }

        // Set a z-index value
        layer.setZIndex(this.state.zindex);

        // Add style
        layer.setStyle(function(feature, resolution) {
            return this_.state.listStyleFeatures[feature.getGeometry().getType()]
        });

        return layer;
    },


    /**
     *
     * @param type
     */
    setStylesFeature()
    {
        return {

            'Point': [new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({ color: [255,110,64] }), // interieur // rgb(255,110,64)
                    stroke: new ol.style.Stroke({ color: [255,102,0,1] }), // bordure
                    radius: 5
                })
            })],

            'LineString': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: [255,110,64],
                    width: 4
                })
            })],

            'Polygon': [new ol.style.Style({
                fill: new ol.style.Fill({
                    color : 'rgba(255,110,64, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: [255,102,0,1],
                    width: 2
                })
            })],

            'Circle': [new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255,110,64, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: [255,102,0, 1],
                    width: 3
                })
            })]
        };
    }
}