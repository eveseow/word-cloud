var Senti = require("../../database").Senti;

var axios = require("axios");

exports.list = function (req, resp) {
    Senti.findAll ({
        
    }). then (function(result) {
        resp.status(200)
            .type("application/json")
            .json(result);

    }).catch(function(err) {
        resp.status(500)
            .type("application/json")
            .json({error:true})
    });
}

exports.create = function (req, resp) {
    if (!req.body.info) {
        resp.status(400).json({ error: true })
    } else { // try to create the new record
        var newInfo = req.body.info;
        console.log(newInfo)

        delete newInfo['senti_id'];
        console.log("New Record to be inserted >>> " + newInfo);
        Senti.create(
        axios({
            method: 'POST',
            url: 'http://sentiment-backend-001-staging.azurewebsites.net/api',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formUrlEncoded({
                document: newInfo.term
            })
        })

            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        )
    }
}