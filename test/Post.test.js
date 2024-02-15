const request = require('supertest');
const app = require('../index');
const Post = require('../models/Post');


describe('Testing POST /create', () => {
    const post1 = { title: 'Test title 1', content: 'Test 1 content' }

    it('Should create a new post', async () => {
        let postsCount = await Post.countDocuments({})
        const response = await request(app)
            .post("/create")
            .send(post1)
            .expect(201)

        const updatedCount = await Post.countDocuments({})
        expect(updatedCount).toBe(postsCount + 1)

        expect(response.body.newPost._id).toBeDefined()
        expect(response.body.newPost.createdAt).toBeDefined()
        expect(response.body.newPost.updatedAt).toBeDefined()
    })
});

describe('Testing GET/', () => {
    const post2 = { title: 'Test title 2', content: 'Test 2 content' }
    const post3 = { title: 'Test title 3', content: 'Test 3 content' }
    const post4 = { title: 'Test title 4', content: 'Test 4 content' }

    it('Should get all posts', async () => {
        await Post.create(post2)
        await Post.create(post3)
        await Post.create(post4)

        const response = await request(app)
            .get('/')
            .send(await Post.find({}))
            .expect(200)

        expect(response.body.allPosts).toHaveLength(4)
        expect(response.body.allPosts[0]).toMatchObject({ title: 'Test title 1', content: 'Test 1 content'})
        expect(response.body.allPosts[1]).toMatchObject({ title: 'Test title 2', content: 'Test 2 content' })
        expect(response.body.allPosts[2]).toMatchObject({ title: 'Test title 3', content: 'Test 3 content'})
        expect(response.body.allPosts[3]).toMatchObject({ title: 'Test title 4', content: 'Test 4 content' })

    })
})


afterAll(() => Post.deleteMany())