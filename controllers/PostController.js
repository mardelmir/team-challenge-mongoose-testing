const Post = require('../models/Post')

const PostController = {
    async createPost(req, res) {
        const { title, content } = req.body;
        if (!title)
            return res
                .status(400)
                .send({ message: "Missing title" })

        else if (!content)
            return res
                .status(400)
                .send({ message: "Missing content" })


        try {
            const newPost = await Post.create(req.body);
            res.status(201).send({ message: 'Post created successfully!', newPost });
        } catch (error) {
            res
                .status(500)
                .send({ message: 'Problem creating Post!', error });
        }
    },
    async getAllPosts(req, res) {
        try {
            const allPosts = await Post.find({});
            res
                .status(200)
                .send({ message: 'Your Posts:', allPosts });
        } catch (error) {
            res
                .status(500)
                .send({ message: 'Problem finding your Posts!' });
        }
    },
    async getPostById(req, res) {
        try {
            const thisPost = await Post.findById(req.params._id);
            res.status(200).send({ message: 'Your post:', thisPost });
        } catch (error) {
            console.log(error);
            res
                .status(500)
                .send({ message: 'There was a problem searching for your post (id)' });
        }
    },
    async getPostByTitle(req, res) {
        try {
            const regexTitle = new RegExp(req.params.title, "i")
            const foundPost = await Post.find({ title: regexTitle }).exec()
            res
                .status(200)
                .send({ message: 'Post found successfully!', foundPost })

        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'There was a problem searching for your post (title)' });
        }
    },
    async updatePost(req, res) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params._id,
                { title: req.body.title, content: req.body.content },
                { new: true }
            );
            res
                .status(200)
                .send({ message: 'Post updated successfully!', updatedPost });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'There was a problem trying to modify the Post' });
        }
    },
    async deletePost(req, res) {
        try {
            const deletedPost = await Post.findByIdAndDelete(req.params._id, {
                new: true,
            });
            res.status(200).send({ message: 'Post successfully deleted', deletedPost });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: 'There was a problem trying to delete the Post' });
        }
    }
}

let page = 1
let skipNumber = 10
let posts10 = []

const getPostsBy10 = async (req, res) => {
    let totalPosts = await Post.countDocuments({})
    try {
        if (page == 1) {
            posts10 = await Post.find({}).limit(10)
            page++
            console.log(page)
        }
        else if (page > 1) {
            page++
            skipNumber + 10
            console.log(skipNumber)
            posts10 = await Post.find({}).skip(skipNumber).limit(10)
            console.log(posts10)
            if (posts10 == []) {
                res.status(200).send({ message: "No more posts!" });
            }
        }

        res.status(200).send({ message: "Your Posts:", posts10 });
    } catch (error) {
        res.status(500).send({ message: "Problem finding your Posts!" });
    }
};


module.exports = PostController