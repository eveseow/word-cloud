var User = require("../../database").User;

exports.list = function (req, resp) {
    User.findAll (

    ). then (function(result) {
        resp.status(200)
            .type("application/json")
            .json(result);

    }).catch(function(err) {
        resp.status(500)
            .type("application/json")
            .json({error:true})
    });
}

exports.create = function(req, resp) {
    if (!req.body.info) {
        resp.status(400).json({ error:true })
    } else { // try to create the new record
        var newInfo = req.body.info;
        console.log(newInfo)

        delete newInfo['id'];
        console.log("New Record to be inserted >>> " + newInfo);
        User.create(
            newInfo
        ).then((newRecord)=>{
            resp.status(200)
            .type("application/json")
            .json(newRecord);
        }).catch((error)=>{
            resp.status(500)
            .type("application/json")
            .json({error: true});
        });
    }
}