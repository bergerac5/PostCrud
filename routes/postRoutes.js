const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const router = express.Router();

// Routes for Posts
router.post("/", createPost);        // Create a new Post
router.get("/", getAllPosts);        // Get all Posts
router.get("/:id", getPostById);     // Get a single Post by ID
router.put("/:id", updatePost);      // Update a Post
router.delete("/:id", deletePost);   // Delete a Post

module.exports = router;
