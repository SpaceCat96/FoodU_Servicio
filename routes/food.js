var express = require('express');
var models = require('../models');
var aws = require('../libs/aws-s3');
var router = express.Router();
const index = require('../config/index');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/Comida';

router.get('/', function (req, res) {
  models.food.findAll({
    include:[{
      model:models.student
    }]
  }).then(comida => {
    res.json(comida);
  });
});

router.post('/create', function (req, res) {
  const { documento } = req.files;
  const { name, descr, precio,stock,stu } = req.body    
  try {
    var nm = aws.putObject(NEW_BUCKET_NAME, documento);
    console.log("Posiblenombre : "+nm);
    
    models.food.create({
        FoodName: name,
        FoodDescr: descr,
        FoodPrecio: precio,
        FoodStock: stock,
        StudentID: stu,
        FoodImg: nm,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }).then( fd => {
      res.json({
          status: "ok",
          operation: "create",
          id: fd.FoodID,
      });
    });


  } catch (err) {
    console.log(err)
  }
});

module.exports = router;