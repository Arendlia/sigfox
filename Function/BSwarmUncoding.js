function BSwarmUncoding(value) {
    let lat = parseInt(value.slice(0, 8), 16).toString(2).padStart(4, '0');
    let lon = parseInt(value.slice(8, 16), 16).toString(2).padStart(4, '0');
    let temperature = parseInt(value.slice(16, 18), 16).toString(2).padStart(4, '0');

    let latInt = parseInt(lat, 2);
    let lonInt = parseInt(lon, 2);
    let temperatureInt = parseInt(temperature, 2);

    // Latitude decoding
    let latSign = (latInt & 0x80000000) ? -1 : 1;
    let latValue = latSign * (latInt & 0x7FFFFFFF);
    let latDegrees = Math.floor(latValue / 1000000);
    let latMinutes = ((latValue % 1000000) / 60) * 100;

    // Longitude decoding
    let lngSign = (lonInt & 0x80000000) ? -1 : 1;
    let lngValue = lngSign * (lonInt & 0x7FFFFFFF);
    let lngDegrees = Math.floor(lngValue / 1000000);
    let lngMinutes = ((lngValue % 1000000) / 60) * 100;
    console.log(lngDegrees);
    console.log(lngMinutes);

    // Temperature decoding
    let tempSign = (temperatureInt & 0x80000000) ? -1 : 1;
    let tempValue = tempSign * (temperatureInt & 0x7FFFFFFF);

    return {
        latitude: latDegrees + "." + latMinutes,
        longitude: lngDegrees + "." + lngMinutes,
        temperature: tempValue
    };
}

module.exports = hexToData;
