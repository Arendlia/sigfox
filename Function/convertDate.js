/**
 * Function for convert timestamp to date js
 * Exemple
 * const convert = require('./Function/convertDate');
 * 
 * let date = convert(344954003)
 * 
 * @param {*} timestamp 
 * @returns 
 */

function convertTimestampToDatetime(timestamp) {
    let date = new Date(timestamp);
    const result = date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
    return result;
}
module.exports = convertTimestampToDatetime; 