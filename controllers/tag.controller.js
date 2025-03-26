const { Tag, Post } = require("../models");

// Create a new Tag
const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const tag = await Tag.create({ name });
    res.status(201).json({ 
      message: "Tag created successfully", 
      tag 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        { model: Post, attributes: ["id", "title"] }, 
      ],
    });

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Tag by ID
const getTagById = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id, {
      include: [Post],
    });

    if (!tag) return res.status(404).json({ 
      message: "Tag not found" 
    });

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Tag
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ 
      message: "Tag not found" 
    });

    await tag.update({ name });

    res.status(200).json({ 
      message: "Tag updated successfully", 
      tag 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ 
      message: "Tag not found" 
    });

    await tag.destroy();
    res.status(200).json({ 
      message: "Tag deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions
module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};
