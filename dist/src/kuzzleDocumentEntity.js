import kuzzle from '../services/kuzzle'

class KuzzleDocumentEntity {

    /**
     * Convert Kuzzle document into GeoJSON
     * @param KuzzleDocument document
     * @returns {*}
     */
    fromDocumentToFeature(document)
    {

        var dataGeoJson = {
            "id": null,
            'type': 'Feature',
            'geometry': null,
            'properties': []
        };

        return dataGeoJson;
    }

    fromFeatureToDocument()
    {

    }
}

export default KuzzleDocumentEntity;