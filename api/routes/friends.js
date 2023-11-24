const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.put("/", UsersController.Friends);



module.exports = router;
