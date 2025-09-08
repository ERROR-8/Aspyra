const express = require(`express`);
const router = express.Router();
const ictrl = require(`../controller/jobController`);

router.post("/",ictrl.createJob);
router.get("/",ictrl.getJob);
router.put("/:id",ictrl.updateJob);
router.delete("/:id",ictrl.deletejob);

module.exports = router;