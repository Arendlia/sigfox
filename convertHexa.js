const inverserOrdreOctets = require("./invertHexa");

/**
 * Convert a hex string to a javascript object
 * @param {string} timestamp - The timestamp of the measurement
 * @param {string} value - The hex string to convert
 * @returns {Object} - The javascript object with the converted values
 */
function convertHexa(timestamp, value) {
    const hexInverse = inverserOrdreOctets(value.slice(0, 4));
    const prefixedHexInverse = '0x' + hexInverse;
    let hexaT = parseInt(prefixedHexInverse, 16);
    // Get signed int
    if ((hexaT & 0x8000) > 0) {
        hexaT = hexaT - 0x10000;
    }
    const hexaH = parseInt(value.slice(4, 6), 16);
    const hexaB = parseInt(value.slice(6, 8), 16);
    const hexaString = hexaT.toString();

    const tabData = {'date': timestamp ,'temperature': hexaT/100, 'humidity': hexaH, 'battery': hexaB/150 * 100 };
    return tabData;
}

module.exports = convertHexa;