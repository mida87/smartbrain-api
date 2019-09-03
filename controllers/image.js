const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9b2fb9741ba64efeaf58ec4484beb1ca'
});

const handleApiCall = (req, res) => {
    return app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => {
        console.error(err);
        res.status(400).json('unable to get entries')
    });
}

module.exports = { handleImage, handleApiCall };