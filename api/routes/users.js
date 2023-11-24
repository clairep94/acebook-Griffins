const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.put("/", UsersController.Create);



module.exports = router;
