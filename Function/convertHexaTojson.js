function convertHexaTojson(value) {
    const hexaT = parseInt(value.slice(0, 4), 16);
    const hexaH = parseInt(value.slice(4, 6), 16);
    const hexaB = parseInt(value.slice(6, 8), 16);
    const hexaString = hexaT.toString();
    const t = hexaString.slice(0, 4);

    const tabData = {'t': parseInt(t) / 100, 'h': hexaH, 'b': hexaB/150 * 100 };
    //console.log(tabData);
    return tabData;
    // Cela affichera la chaîne de caractères correspondante
}

module.exports = convertHexaTojson;