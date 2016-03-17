var express = require('express');
var RoomInstance = require('../models/RoomInstance');

module.exports = function () {

    var router = express.Router();


    router.get('/instances/:user', function (req, res) {

        RoomInstance.getInstance(req.params.user, function (err, docs) {

            res.json(docs);
        })
    });



    return router;
};