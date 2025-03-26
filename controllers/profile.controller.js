const { Profile, User } = require("../models");

// Create a new Profile for a user
const createProfile = async (req, res) => {
  try {
    const { userId, bio, birthday } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ 
      message: "User not found" 
    });

    // Create a new Profile
    const profile = await Profile.create({ userId, bio, birthday });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Profiles with associated User
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: { model: User, attributes: ["id", "username", "email"] }, 
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Profile by ID with associated User
const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id, {
      include: { model: User, attributes: ["id", "username", "email"] }, 
    });

    if (!profile) return res.status(404).json({
       message: "Profile not found" 
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Profile
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, birthday } = req.body;

    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ 
      message: "Profile not found" 
    });

    await profile.update({ bio, birthday });
    res.status(200).json({ 
      message: "Profile updated successfully", 
      profile 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Profile
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ 
      message: "Profile not found" 
    });

    await profile.destroy();
    res.status(200).json({ 
      message: "Profile deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions
module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
};
