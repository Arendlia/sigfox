const humidityBornes = {
    "minDanger": 10,
    "minWarning": 30,
    "maxWarning": 60,
    "maxDanger": 70
}

const temperatureBornes = {
    "minDanger": -10,
    "minWarning": 16,
    "maxWarning": 22,
    "maxDanger": 31
}

const batteryBornes = {
    "danger": 30,
    "success": 70,
}

$(function() {
    var humidityValue = $('#humidityData').text()
    var temperatureValue = $('#temperatureData').text()
    var batteryValue = $('#batteryData').text()
    var dataValue = $('#dataWifi').text()
    function humidity(){
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
    function temperature(){
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
    function battery(){
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
    function connexion(){
        if(dataValue == "Très Bonne" ){
            $('.fa-wifi').addClass('text-success')
        }
        if(dataValue == "Correcte"){
            $('.fa-wifi').addClass('text-warning')
        }
        if(dataValue == "Mauvaise"){
            $('.fa-wifi').addClass('text-danger')
        }
    }
    humidity()
    temperature()
    battery()
    connexion()
});