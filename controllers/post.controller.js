const { Post, User, Tag } = require("../models");

// Create a new Post
const createPost = async (req, res) => {
  try {
    const { userId, title, content, tagIds } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ 
      message: "User not found" 
    });

    // Create the post
    const post = await Post.create({ userId, title, content });

    // Ensure tagIds is an array and creating associations
    if (Array.isArray(tagIds) && tagIds.length > 0) {
      const tags = await Tag.findAll({ where: { id: tagIds } });

      if (tags.length !== tagIds.length) {
        return res.status(400).json({ message: 
          "Some tag IDs not found" 
        });
      }

      await post.setTags(tags); 
    } else {
      await post.setTags([]); 
    }

    res.status(201).json({ 
      message: "Post created successfully", 
      post 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Posts with User and Tags
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        { model: Tag, attributes: ["id", "name"] },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Post by ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [User, Tag],
    });

    if (!post) return res.status(404).json({ 
      message: "Post not found" 
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tagIds } = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ 
        message: "Post not found" 
      });
    }

    // Update post details
    await post.update({ title, content });

    // Ensure tagIds is an array and update associations
    if (Array.isArray(tagIds) && tagIds.length > 0) {
      const tags = await Tag.findAll({ where: { id: tagIds } });

      if (tags.length !== tagIds.length) {
        return res.status(400).json({ 
          message: "Some tag IDs not found" 
        });
      }

      await post.setTags(tags); 
    } else {
      await post.setTags([]); 
    }

    // Fetch updated post with tags
    const updatedPost = await Post.findByPk(id, {
      include: [{ model: Tag, through: { attributes: [] } }],
    });

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a Post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ 
      message: "Post not found" 
    });

    await post.destroy();
    res.status(200).json({ 
      message: "Post deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
