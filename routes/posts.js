const express = require("express");
const routes = express.Router();
const PostController = require("../controllers/PostController");

routes.post("/create", PostController.createPost);
routes.get("/", PostController.getPosts);
routes.get("/id/:_id", PostController.getPostById);
routes.get("/title/:title", PostController.getPostByTitle);
routes.get("/postsWithPagination", PostController.getPostsBy10);
routes.put("/id/:_id", PostController.updatePost);
routes.delete("/id/:_id", PostController.deletePost);

module.exports = routes;
