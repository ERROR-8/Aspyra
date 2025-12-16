const express = require(`express`);
const router = express.Router();
const uctrl = require("../controller/userController");
const { authenticate, requireAdmin } = require('../middleware/auth');

// Admin-only: list and create users
router.post("/", authenticate, requireAdmin, uctrl.createUser);
router.get("/", authenticate, requireAdmin, uctrl.getuser);

// Authenticated: update own profile or admin can update any
router.put("/:id", authenticate, uctrl.updateUser);

// Authenticated: change password (only for own account)
router.post('/:id/password', authenticate, uctrl.changePassword);

// Admin-only: delete user
router.delete("/:id", authenticate, requireAdmin, uctrl.deleteUser);

module.exports = router;