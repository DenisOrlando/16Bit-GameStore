const { Router } = require("express");
const { logIn, signUp, getRole } = require("../controllers/Auth");
const { signIn, getUserInfo } = require("../controllers/Auth0");
const checkJwt = require("../middlewares/checkJwt");
const reqAdmin = require("../middlewares/reqAdmin");
const verifyJwt = require("../middlewares/verifyJwt");

const router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/getRole", checkJwt, getRole);
router.get("/getID", checkJwt, (req, res) => {
  const id = req.userId;
  res.status(200).send({ id: id });
});
router.post("/reqToken", checkJwt, (req, res) => {
  res.send("Token provided");
});
router.post("/reqAdmin", checkJwt, reqAdmin, (req, res) => {
  res.send("Authorized");
});

// Auth0 testing

router.get("/getUserInfo", verifyJwt, getUserInfo);

router.post("/signin", verifyJwt, signIn);

module.exports = router;
