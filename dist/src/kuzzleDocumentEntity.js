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
            var datasGeometry = document.content.location;
            var dataProperties = document.content.fields;

            dataGeoJson = {
                "id": document.id,
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