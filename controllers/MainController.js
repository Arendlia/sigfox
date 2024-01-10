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

async function getMessages(sensor, limit, offset = 0) {
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
    });
    return {"data": result?.data?.data, "next": result?.data?.paging?.next};
}

exports.getFirstMessage = async(req, res) => {
    messages = await getMessages(req.params.id, 1);
    return messages.data;
}

exports.getAllMessages = async (req, res) => {
    let results = [];
    let limit = 100;
    let offset = 0;
    while (limit == 100) {
        if (offset != 0) {
            await new Promise(r => setTimeout(r, 1000));
        }
        messages = await getMessages(req.params.id, limit, offset);
        console.log(messages);
        results.push(messages?.data);
        if (messages?.next) {
            offset = offset+limit;
        } else {
            limit = 0;
        }
    }
    return res.send(results);
}