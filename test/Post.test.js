const request = require('supertest');
const app = require('../index');
const Post = require('../models/Post');


describe("testing/create", () => {
    beforeAll(() => Post.deleteMany());
    const post = {title: "Título test", content: "Contenido para test"}
    it("Should create a new post", async() => {
        let postsCount = await Post.countDocuments({})
        expect(postsCount).toBe(postsCount)

        await request(app).post("/create").send(post).expect(201)
        let updatedCount = await Post.countDocuments({})
        expect(updatedCount).toBe(postsCount + 1)
    })
});

