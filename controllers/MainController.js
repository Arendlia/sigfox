let axios = require('axios');

exports.home = async (req, res) => {
    return res.render('search');
}

exports.sensor = async (req, res) => {
    try {
        let result = await axios({
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
        });
        let sensor = result.data
        if (sensor.group.id == process.env.API_SENSOR_GROUP) {
            result =  await axios({
                'method': 'GET',
                'url': process.env.API_URL+'/devices/'+req.query.id+'/messages',
                'headers': 
                {
                    'Content-Type': 'application/json'
                },
                'auth': {
                    'username': process.env.API_USERNAME,
                    'password': process.env.API_PASSWORD
                }
            });
        }

        

        return res.render('sensor', {'sensor': result.data});
    } catch (e) {
        
    }
}

exports.sensorMessagesAjax = async (req, res) => {
    let results = [];
    let url = process.env.API_URL+'/devices/'+req.query.id+'/messages';
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