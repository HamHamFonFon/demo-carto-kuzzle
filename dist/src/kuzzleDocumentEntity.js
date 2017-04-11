// import kuzzle from '../services/kuzzle'

class KuzzleDocumentEntity {

    /**
     * Convert Kuzzle document into GeoJSON
     * @param KuzzleDocument document
     * @returns {*}
     */
    fromDocumentToFeature(document)
    {
        var dataGeoJson = {};

        if (document) {
            var datasGeometry = document._source.location;
            var dataProperties = document._source.fields;

            dataGeoJson = {
                "id": document._id,
                'type': 'Feature',
                'geometry': datasGeometry,
                'properties': dataProperties
            };
        }

        return dataGeoJson;
    }

    /**
     * Transform a feature into a kuzzle document
     */
    fromFeatureToDocument()
    {

    }
}

export default KuzzleDocumentEntity;