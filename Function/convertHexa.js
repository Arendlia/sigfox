/**
 * Fonction convertDateAndHexa
 * 
 * Pour les besoins des graphiques cette fonction regroupe deux fonctions : ConvertTimestampToDatetime et convertHexaToJson
 * 
 * @param {timestamp} timestamp 
 * @param {*} value 
 * @returns {Array}
 */
function convertHexa(timestamp, value) {
    // Convert hexa
    const hexaT = parseInt(value.slice(0, 4), 16);
    const hexaH = parseInt(value.slice(4, 6), 16);
    const hexaB = parseInt(value.slice(6, 8), 16);
    const hexaString = hexaT.toString();
    const t = hexaString.slice(0, 4);

    const tabData = {'date': timestamp ,'temperature': parseInt(t) / 100, 'humidity': hexaH, 'battery': hexaB/150 * 100 };
    return tabData;
}

module.exports = convertHexa;