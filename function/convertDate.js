/**
 * Convert a Unix timestamp to a human-friendly datetime string.
 * @param {number} timestamp - A Unix timestamp.
 * @returns {string} A human-friendly datetime string.
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