const inverserOrdreOctets = require('./invertHexa');

function convertHexaTojson(value) {
    const hexInverse = inverserOrdreOctets(value.slice(0, 4));
    //console.log(hexInverse);
    const hexaT = parseInt(hexInverse, 16);
    const hexaH = parseInt(value.slice(4, 6), 16);
    const hexaB = parseInt(value.slice(6, 8), 16);
    const hexaString = hexaT.toString();
    const t = hexaString.slice(0, 4);

    const tabData = {'t': parseInt(t) / 100, 'h': hexaH, 'b': hexaB/150 * 100 };
    return tabData;
    // Cela affichera la chaîne de caractères correspondante
}

module.exports = convertHexaTojson;