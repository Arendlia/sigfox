let axios = require('axios');
let convertHexa = require('../function/convertHexa');

exports.home = async (req, res) => {
    return res.render('search');
}

exports.homePost = async (req, res) => {
    const id = req.body.id;
    res.redirect('/sensor/'+id);
}

exports.sensor = async (req, res) => {
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
        // TODO route capteur mauvais groupe
        // if (result.data.group.id != process.env.SENSOR_GROUP) {
        //     return res.render('badsensor', {'sensor': result.data});
        // }
        
        return res.render('sensor', {'sensor': result.data});
    } catch (e) {
        if (e.response.status == 500) {
            res.redirect('/error/error-internal')
        }  
        if (e.response.status == 429) {
            res.redirect('/error/too-many-requests')
        }  
    }
}

async function getMessages(sensor, limit, offset = 0) {
    try {
        result = await axios({
            'method': 'GET',
            'url': `${process.env.API_URL}/devices/${sensor}/messages?offset=${offset}&limit=${limit}`,
            'headers': 
            {
                'Content-Type': 'application/json'
            },
            'auth': {
                'username': process.env.API_USERNAME,
                'password': process.env.API_PASSWORD
            }
        })
        return {"data": result?.data?.data, "next": result?.data?.paging?.next, "status": result.status};
    } catch (error) {
        return {'error': error.response.data.message, 'status': error.response.status}
    }
}

exports.getLastMessage = async(req, res) => {
    messages = await getMessages(req.params.id, 1);
    if (messages.error) {
        return res.send(messages);
    }
    return res.send(messages.data);
}

exports.getAllMessages = async (req, res) => {
    let results = [];
    let tabNewData = [];
    let limit = 100;
    let offset = 0;
    while (limit == 100) {
        if (offset != 0) {
            await new Promise(r => setTimeout(r, 1000));
        }
        messages = await getMessages(req.params.id, limit, offset);
        if (messages.error) {
            return res.send(messages);
        }
        if (messages?.next) {
            offset = offset+limit;
        } else {
            limit = 0;
        }
        results.push(...messages?.data);     
    }
    results.forEach((data) => {
        tabNewData.push(convertHexa(data.time, data.data))
    })
    return res.send(tabNewData);
}