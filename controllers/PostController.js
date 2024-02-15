const Post = require('../models/Post')

const PostController = {
    async createPost(req, res) {
        const { title, content } = req.body;

        if (!title && !content) return res.status(400).send({ message: 'Missing both title and content' })
        else if (!title) return res.status(400).send({ message: 'Missing title' })
        else if (!content) return res.status(400).send({ message: 'Missing content' })

        try {
            const newPost = await Post.create(req.body);
            res
                .status(201)
                .send({ message: 'Post successfully created!', newPost });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'Error: unable to create post', error });
        }
    },
    async getAllPosts(req, res) {
        try {
            const allPosts = await Post.find({});
            res
                .status(200)
                .send({ message: 'Your posts:', allPosts });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'Error: unable to find all posts' });
        }
    },
    async getPostById(req, res) {
        try {
            const thisPost = await Post.findById(req.params._id);
            res
                .status(200)
                .send({ message: 'Your post:', thisPost });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'Error: unable to find post (id)' });
        }
    },
    async getPostByTitle(req, res) {
        try {
            const regexTitle = new RegExp(req.params.title, "i")
            const foundPost = await Post.find({ title: regexTitle }).exec()
            res
                .status(200)
                .send({ message: 'Post successfully found!', foundPost })
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'Error: unable to find post (title)' });
        }
    },
    async updatePost(req, res) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(req.params._id, { title: req.body.title, content: req.body.content }, { new: true });
            res
                .status(200)
                .send({ message: 'Post updated successfully!', updatedPost });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'Error: unable to modify post' });
        }
    },
    async deletePost(req, res) {
        try {
            const deletedPost = await Post.findByIdAndDelete(req.params._id, { new: true });
            res
                .status(200)
                .send({ message: 'Post deleted successfully!', deletedPost });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'Error: Unable to delete post' });
        }
    },
    async getPaginatedPosts(req, res) {
        let pageNum
        req.params.page < 1 ? pageNum = 1 : pageNum = req.params.page

        const limit = 10
        const skip = limit * (pageNum - 1) //viene de sacar limit como factor común de: pageNum * limit - limit

        try {
            const totalPosts = await Post.countDocuments({})
            if (totalPosts === 0) res.status(200).send({ message: 'No posts stored in database!' })

            const pageContent = await Post.find({}).skip(skip).limit(limit)
            pageContent.length === 0
                ? res.status(200).send({ message: 'Not enough posts to reach this page' })
                : res.status(200).send(pageContent)
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'Error: unable to paginate posts' });
        }
    }
}

module.exports = PostController