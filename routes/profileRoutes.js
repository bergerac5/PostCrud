const express = require("express");
const {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controller");

const router = express.Router();

// Route for creating a new profile
router.post("/", createProfile);  

// Route for getting all profiles with associated user data
router.get("/", getAllProfiles);  

// Route for getting a profile by ID with associated user data
router.get("/:id", getProfileById);  

// Route for updating a profile by ID
router.put("/:id", updateProfile);  

// Route for deleting a profile by ID
router.delete("/:id", deleteProfile);  

module.exports = router;
