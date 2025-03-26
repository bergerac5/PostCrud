const { User, Profile, Post } = require("../models");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.status(201).json({
      message: 'User created successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users with profiles and posts
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Profile, Post], 
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { include: [Profile, Post] });
    if (!user) return res.status(404).json({
      message: "User not found" 
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({
       message: "User not found" 
    });

    await user.update({ username, email });
    res.status(200).json({ 
      message: "User updated successfully", user 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ 
      message: "User not found" 
    });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
};

// Export all functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
