const express = require("express");
const router = express.Router();

// idhr controller se function call karao bc ab
const {
  signup,
  signin,
  google,
  signout,
} = require("../controller/auth.controler");
// const { signout } = require("../controller/user");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signout);

module.exports = router;
