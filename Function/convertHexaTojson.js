function convertHexaTojson(value) {
    const tabData = [];
    const hexaT = parseInt(value.slice(0, 4), 16);
    const hexaH = parseInt(value.slice(4, 6), 16);
    const hexaB = parseInt(value.slice(6, 8), 16);
    const hexaString = hexaT.toString();
    const t = hexaString.slice(0, 4);

    tabData.push(parseInt(t) / 100, hexaH, hexaB/150 * 100);

    parseInt(t) / 100;
    console.log(t);
    console.log("---");
    console.log(hexaH);
    console.log("---");
    console.log(hexaB);
// Cela affichera la chaîne de caractères correspondante
}

module.exports = convertHexaTojson;