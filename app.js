const express = require('express');
const app = express();
//import convertTimestampToDatetime from './Function/convertDate';



let date = convertTimestampToDatetime(1704701830000);
app.get('/', (req, res) => {
    res.send('Hello World!' + date)
  })



  function convertTimestampToDatetime(timestamp) {
    var date = new Date(timestamp);  
    return date;
  }
module.exports = app;