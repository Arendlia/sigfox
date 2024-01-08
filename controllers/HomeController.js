let axios = require('axios');

exports.home = async (req, res) => {
    const options = {
        'method': 'GET',
        'url': process.env.API_URL+'/devices/',
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
        console.log(result.data);
        return res.render('base', {'result': result.data});
    } catch (e) {
    }
}