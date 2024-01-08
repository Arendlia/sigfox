let axios = require('axios');

exports.home = async (req, res) => {
    return res.render('search');
}

exports.sensor = async (req, res) => {
    const options = {
        'method': 'GET',
        'url': process.env.API_URL+'/devices/'+req.query.id,
        'headers': 
        {
            'Content-Type': 'application/json'
        },
        'auth': {
            'username': process.env.API_USERNAME,
            'password': process.env.API_PASSWORD
        }
    };
    try {
        const result = await axios(options);
        return res.render('sensor', {'result': result.data});
    } catch (e) {
    }

}