function bSwarmUncoding(timestamp, value) {
    let latBinary = 0;
    let lngBinary = 0;
    let temperatureBinary = 0;
    let uncoded = {};

    if (value.length != 2) {
        latBinary = parseInt(value.slice(0, 8), 16).toString(2).padStart(32, '0');
        lngBinary = parseInt(value.slice(8, 16), 16).toString(2).padStart(32, '0');
        temperatureBinary = parseInt(value.slice(16, 18), 16).toString(2).padStart(8, '0');
        uncoded = {
            latitude: decodeLatitude(latBinary),
            longitude: decodeLongitude(lngBinary),
            temperature: decodeTemperature(temperatureBinary),
            date: timestamp
        }
    } else {
        temperatureBinary = parseInt(value).toString(2).padStart(8, '0');
        uncoded = {
            temperature: decodeTemperature(temperatureBinary),
            date: timestamp
        }
    }

    return uncoded;
}

// Latitude decoding
function decodeLatitude(binaryLatitude) {
    let latsliced = binaryLatitude.substring(1);
    let latInt = parseInt(latsliced, 2);
    let latDegrees = Math.floor(latInt / 1000000);
    let latMinutes = (((latInt / 1000000) % 1) / 60) * 100;
    let latitude = 0;
    if (binaryLatitude[0] == '1') {
        latDegrees = latDegrees * -1;
        latitude = latDegrees - latMinutes;
    } else {
        latitude = latDegrees + latMinutes;
    }
    return latitude.toFixed(5);
}

// Longitude decoding
function decodeLongitude(binaryLongitude) {
    let lngsliced = binaryLongitude.substring(1);
    let lngInt = parseInt(lngsliced, 2);
    let lngDegrees = Math.floor(lngInt / 1000000);
    let lngMinutes = (((lngInt / 1000000) % 1) / 60) * 100;
    let longitude = 0;
    if (binaryLongitude[0] == '1') {
        lngDegrees = lngDegrees * -1;
        longitude = lngDegrees - lngMinutes;
    } else {
        longitude = lngDegrees + lngMinutes;
    };
    return longitude.toFixed(5);
}

// Temperature decoding
function decodeTemperature(binaryTemperature) {
    let temperatureSliced = binaryTemperature.substring(1);
    let temperature = parseInt(temperatureSliced, 2);
    if (binaryTemperature[0] == '1') {
        temperature = temperature * -1;
    }
    return temperature
}

module.exports = bSwarmUncoding;
