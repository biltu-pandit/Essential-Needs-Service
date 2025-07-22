const express = require('express');
const router = express.Router()
module.exports = router;
const Admin=require('../model/Admin');

router.get('/', function (req, res) {
    res.send("This is Admin Page....!!!")
});
module.exports = router