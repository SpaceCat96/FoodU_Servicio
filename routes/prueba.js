var express = require("express");
var models = require("../models");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
  models.place.findAll().then(users => {
    res.json(users);
  });
});

module.exports = router;
