/**
 * @fileoverview This file contains the routes fort the frontend
 */

/**
 * @module routes/frontend
 */
let axios = require('axios');
let bKeepUncoding = require('../function/bKeepUncoding');
const bSwarmUncoding = require('../function/bSwarmUncoding');
let moment = require('moment');

/**
 * The home route
 * @param {Object} req - The request object
 * @param {Object} res - The response object 
 * @returns res.render('home')
 */
exports.home = async (req, res) => {
    return res.render('search');
}

/**
 * The home route
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns res.redirect
 */
exports.homePost = async (req, res) => {
    const id = req.body.id;
    res.redirect('/sensor/'+id);
}

/**
 * The sensor route.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
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
        moment.locale('fr');
        return res.render('sensor', {'sensor': result.data, 'apiUrl': process.env.API_URL, moment: moment});
    } catch (e) {
        if (e.response.status == 500) {
            res.redirect('/error/error-internal')
        }  
        if (e.response.status == 429) {
            res.redirect('/error/too-many-requests')
        }  
    }
}

/**
 * Get the messages for a sensor.
 * @function
 * @param {string} sensor - The sensor ID.
 * @param {number} limit - The number of messages to retrieve.
 * @param {number} offset - The offset of the messages to retrieve.
 * @returns {Object} - The response object.
 */
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

/**
 * Get the last message for a sensor.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getLastMessage = async(req, res) => {
    messages = await getMessages(req.params.id, 1);
    if (messages.error) {
        return res.send(messages);
    }
    return res.send(messages.data);
}

/**
 * Get all messages for a sensor.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getAllMessages = async (req, res) => {
    let results = [];
    let tabNewData = [];
    let limit = 100;
    let offset = 0;
    while (limit == 100) {
        // Waiting 1s to make next call to bypass API cooldown
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
    
    console.log(req.query['device-type'] == process.env.B_KEEP_DEVICETYPE);
    results.forEach((data) => {
        if (req.query['device-type']) {
            if (req.query['device-type'] == process.env.B_KEEP_DEVICETYPE) {
                tabNewData.push(bKeepUncoding(data.time, data.data));
            } else if (req.query['device-type'] == process.env.B_SWARM_DEVICETYPE) {
                tabNewData.push(bSwarmUncoding(data.time, data.data))
            }
        }
    })
    return res.send(tabNewData);
}