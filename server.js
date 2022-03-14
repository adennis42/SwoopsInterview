const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8081;

const jsonParser = bodyParser.json();
app.use(cors({
    origin: 'http://localhost:3000'
}), bodyParser.json())

const headers = { 'Ocp-Apim-Subscription-Key': '9a55560fbb5b4fd4ab1298470e15d8e5' }

const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/everything?q=biden&from=2022-03-13&to=2022-03-13&sortBy=popularity&apiKey=8b8e5b57c3194cb08717e727ad57b8b5',
    headers: headers
}

app.post('/api', jsonParser, function (req, res) {
    var searchCriteria = 'basketball';
    if (req.body.searchvalueBody != undefined) {
        searchCriteria = req.body.searchvalueBody;
    }
    const startDate = req.body.dateRange[0];
    const endDate = req.body.dateRange[1];
    console.log("REq => ", req.body.searchvalueBody == undefined)
    console.log("Search criteria => ", searchCriteria)
    axios.get('https://newsapi.org/v2/everything?q=' + searchCriteria + '&from=' + startDate + 'to=' + endDate + '&sortBy=popularity&apiKey=8b8e5b57c3194cb08717e727ad57b8b5')
        .then(result => {
            res.send(result.data);
        })
});
app.listen(PORT, console.log(`Server starting at ${PORT}`));