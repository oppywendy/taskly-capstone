const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");

router.post("/organizations", organizationController.createOrganization);
router.post(
  "/:organizationId/addUser",

  organizationController.addUser
);

module.exports = router;
