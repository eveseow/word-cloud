var Word = require("../../database").Word;
var axios = require("axios");
var predicted;
var confident;

exports.list = function (req, resp) {

    Word.findAll({

    }).then(function (result) {
        resp.status(200)
            .type("application/json")
            .json(result);

    }).catch(function (err) {
        resp.status(500)
            .type("application/json")
            .json({ error: true })
    });
}

exports.listSession = function (req, resp) {

    var whereClauseSession = (req.params.session_id) ? { session_id: parseInt(req.params.session_id) } : {};
    Word.findAll({

        where: whereClauseSession

    }).then(function (result) {
        resp.status(200)
            .type("application/json")
            .json(result);

    }).catch(function (err) {
        resp.status(500)
            .type("application/json")
            .json({ error: true })
    });
}

exports.create = function (req, res) {
    if (!req.body.info) {
        res.status(400).json({ error: true })
    } else { // try to create the new record
        var newInfo = req.body.info;
        console.log(newInfo)

        delete newInfo['id'];
        console.log("New Record to be inserted >>> " + newInfo);

        axios({
            method: 'POST',
            url: 'http://sentiment-backend-001-staging.azurewebsites.net/api',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: `document=` + newInfo.term
        })
            .then(function (response) {
                // console.log(response.data.prediction)

                if (response.data.prediction.NEG > response.data.prediction.POS) {
                    // console.log(response.data.prediction.NEG)
                    predicted = "NEG"
                    confident = response.data.prediction.POS
                }
                else {
                    // console.log(response.data.prediction.POS)
                    predicted = "POS"
                    confident = response.data.prediction.POS
                }

                const tweet = new Word({
                    term_id: newInfo.term_id,
                    session_id: newInfo.session_id,
                    term: newInfo.term,
                    prediction: predicted,
                    confidence: confident,
                    createdAt: newInfo.createdAt
                })

                tweet.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the TWEET."
                        });
                    });

            }).catch((error) => {
                console.log(error)
            })
    }
}