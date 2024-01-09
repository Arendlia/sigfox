let axios = require('axios');

exports.home = async (req, res) => {
    return res.render('search');
}

exports.homePost = async (req, res) => {
    console.log(req);
    const id = req.body.id;
    res.redirect('/sensor/'+id);
}

exports.sensor = async (req, res) => {
    console.log('top')
    try {
        let result = await axios({
            'method': 'GET',
            'url': process.env.API_URL+'/devices/'+req.params.id,
            'headers': 
            {
                'Content-Type': 'application/json'
            },
            'auth': {
                'username': process.env.API_USERNAME,
                'password': process.env.API_PASSWORD
            }
        });
        return res.render('sensor', {'sensor': result.data});
    } catch (e) {
        
    }
}

exports.getFirstMessage = async (req, res) => {
    let url = process.env.API_URL+'/devices/'+req.params.id+'/messages?limit1';
    let results = await axios({
        'method': 'GET',
        'url': url,
        'headers': 
        {
            'Content-Type': 'application/json'
        },
        'auth': {
            'username': process.env.API_USERNAME,
            'password': process.env.API_PASSWORD
        }
    });
    return res.send(results.data)
}

exports.sensorMessagesAjax = async (req, res) => {
    let results = [];
    let url = process.env.API_URL+'/devices/'+req.params.id+'/messages';
    let result = {};
    while (url) {
        if (result != {}) {
            await new Promise(r => setTimeout(r, 1000));
        }
        result = await axios({
            'method': 'GET',
            'url': url,
            'headers': 
            {
                'Content-Type': 'application/json'
            },
            'auth': {
                'username': process.env.API_USERNAME,
                'password': process.env.API_PASSWORD
            }
        });
        console.log(result.status);
        results.push(result?.data?.data);
        url = result?.data?.paging?.next ?? null;
    }
    return res.send(results);
}