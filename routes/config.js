var express = require('express');
var roomConfig = require('../models/roomConfig');

module.exports = function () {

    var router = express.Router();

    router.get('/config/:user', function (req, res) {

        roomConfig.getConfig(req.params.user, function (err, docs) {

          return   res.json(docs);
        })
    });

    return router;
};