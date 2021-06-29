var express = require('express');
const app = require('../app');
var router = express.Router();

const spaceXController = require("../controllers/spaceX")

router.get("/getSpaceXData", spaceXController.getSpaceXData);

module.exports = router;
