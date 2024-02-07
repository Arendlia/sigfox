/**
 * @fileoverview This file contains the functions used to display the status of the environmental sensors and the data connection status on the dashboard.
 */

/**
 * This object contains the minimum and maximum thresholds for humidity indicating the danger, warning and success zones.
 * @type {Object}
 * 
 * value < or = minDanger or value > or = maxDanger --> danger color
 * value > or = minWarning and value < or = maxWarning --> success color
 * value > or = minDanger and value < minWarning --> warning color
 * value > minDanger and value < minWarning --> warning color
 * value < maxDanger and value > maxWarning --> warning color
 */
const humidityBornes = {
    "minDanger": 10,
    "minWarning": 30,
    "maxWarning": 60,
    "maxDanger": 70
}

/**
 * This object contains the minimum and maximum thresholds for temperature indicating the danger, warning and sucess zones.
 * @type {Object}
 * value < or = minDanger or value > or = maxDanger --> danger color
 * value > or = minWarning and value < or = maxWarning --> success color
 * value > or = minDanger and value < minWarning --> warning color
 * value > minDanger and value < minWarning --> warning color
 * value < maxDanger and value > maxWarning --> warning color
 */
const temperatureBornes = {
    "minDanger": -10,
    "minWarning": 16,
    "maxWarning": 22,
    "maxDanger": 31
}

/**
 * This object contains the minimum and maximum thresholds for the battery level, indicating the danger, warning and success zones.
 * @type {Object}
 * value < or = danger --> danger color
 * value > or = success --> success color
 * danger < value < success -->warning color
 */
const batteryBornes = {
    "danger": 30,
    "success": 70,
}

 /**
 * This function is used to check the humidity value and change the color of the humidity icon based on the value.
 */
function humidity(){
    var humidityValue = $('#humidityData').text()
    if(humidityValue > humidityBornes["minDanger"] && humidityValue < humidityBornes["minWarning"]){
        $('.fa-droplet').addClass('text-warning')
    }
    if(humidityValue <= humidityBornes["minDanger"] || humidityValue >= humidityBornes["maxDanger"]){
        $('.fa-droplet').addClass('text-danger')
    }
    if(humidityValue < humidityBornes["maxDanger"] && humidityValue > humidityBornes["maxWarning"]){
        $('.fa-droplet').addClass('text-warning')
    }
    if(humidityValue >= humidityBornes["minWarning"] && humidityValue <= humidityBornes["maxWarning"]){
        $('.fa-droplet').addClass('text-success')
    }
}
/**
* This function is used to check the temperature value and change the color of the temperature icon based on the value.
*/
function temperature(){
    var temperatureValue = $('#temperatureData').text()
    if(temperatureValue > temperatureBornes["minDanger"] && temperatureValue < temperatureBornes["minWarning"]){
        $('.fa-temperature-three-quarters').addClass('text-warning')
    }
    if(temperatureValue <= temperatureBornes["minDanger"] || temperatureValue >= temperatureBornes["maxDanger"]){
        $('.fa-temperature-three-quarters').addClass('text-danger')
    }
    if(temperatureValue < temperatureBornes["maxDanger"] && temperatureValue > temperatureBornes["maxWarning"]){
        $('.fa-temperature-three-quarters').addClass('text-warning')
    }
    if(temperatureValue >= temperatureBornes["minWarning"] && temperatureValue <= temperatureBornes["maxWarning"]){
        $('.fa-temperature-three-quarters').addClass('text-success')
    }
}
/**
* This function is used to check the battery value and change the color of the battery icon based on the value.
*/
function battery(){
    var batteryValue = $('#batteryData').text()
    if(batteryValue <= batteryBornes["danger"]){
        $('.fa-battery-three-quarters').addClass('text-danger')
    }
    if(batteryValue > batteryBornes["danger"] && batteryValue <= batteryBornes["success"]){
        $('.fa-battery-three-quarters').addClass('text-warning')
    }
    if(batteryValue >= batteryBornes["success"]){
        $('.fa-battery-three-quarters').addClass('text-success')
    }
}
/**
* This function is used to check the data connection status and change the color of the wifi icon based on the status.
*/
function connexion(){
    var dataValue = $('#dataWifi').text()
    if(dataValue == "Limitée" ){
        $('.fa-wifi').addClass('text-danger')
    }
    if(dataValue == "Bonne"){
        $('.fa-wifi').addClass('text-warning')
    }
    if(dataValue == "Très bonne"){
        $('.fa-wifi').addClass('text-success')
    }
}

/**
* Call all icons function to change their color based on their status.
*/
function setColors() {
    humidity()
    temperature()
    battery()
    connexion()
    $('#liveDataLoader').addClass('d-none');
    $('#liveData').removeClass('invisible');
}
