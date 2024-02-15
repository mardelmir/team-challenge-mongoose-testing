const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.post("/create", PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/id/:_id", PostController.getPostById);
router.get("/title/:title", PostController.getPostByTitle);
router.put("/id/:_id", PostController.updatePost);
router.delete("/id/:_id", PostController.deletePost);

//router.get("/postsWithPagination", PostController.getPostsBy10);

module.exports = router;
