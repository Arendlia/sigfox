const inverserOrdreOctets = require("./invertHexa");
/**
 * Fonction convertDateAndHexa
 * 
 * Pour les besoins des graphiques cette fonction regroupe deux fonctions : ConvertTimestampToDatetime et convertHexaToJson
 * 
 * @param {timestamp} timestamp 
 * @param {*} value 
 * @returns {Array}
 */
function BKeepUncoding(timestamp, value) {
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

module.exports = BKeepUncoding;