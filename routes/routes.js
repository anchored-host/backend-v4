const express = require("express");
const router = express.Router();
const networkAPI = require("../controllers/api");

router.get("/", (req, res) => {
  res.status(200).send({ message: "API IS FUNCTIONAL" });
});



router.get("/network", networkAPI.getNetwork);
router.post("/network", networkAPI.createNetwork);
router.delete("/network/:id", networkAPI.deleteNetwork);
router.delete("/network", networkAPI.deleteAllNetwork);

module.exports = router;
