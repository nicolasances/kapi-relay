var express = require('express');
var bodyParser = require("body-parser");
var httpRequest = require('request');

app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-correlation-id, x-msg-id");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    next();
});

app.use(bodyParser.json());

// APIS
app.get('/relay', (req, res) => {

    let httpReq = {
        url: "http://kapi-service:8080/status",
        method: 'GET'
    }

    httpRequest(httpReq, (err, resp, body) => {

        if (err != null) { failure({ code: 500, message: err }); return; }

        try {
            // Parse the body
            let responseBody = JSON.parse(body);

            // Success
            res.status(200).type('application/json').send({
                status: 'running',
                msg: 'Managed to relay to kapi-base!',
                relayedResponse: responseBody
            })

        } catch (e) {
            // Fail
            res.status(500).type('application/json').send({
                status: 'error',
                msg: 'Did not manage to relay to kapi-base!'
            })
        }

    });

});

app.listen(8080, () => {
    console.log('[kapi-relay] - Up and running');
});