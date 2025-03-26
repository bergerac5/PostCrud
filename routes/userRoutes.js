const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

// Routes for Users
router.post("/", createUser);        
router.get("/", getAllUsers);        
router.get("/:id", getUserById);     
router.put("/:id", updateUser);      
router.delete("/:id", deleteUser);   

module.exports = router;
