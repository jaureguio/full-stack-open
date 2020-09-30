const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const { initializeDB, getUserList, dummyUser } = helper

const api = supertest(app)

beforeEach(async () => {
  await initializeDB()
})

afterAll(() => {
  mongoose.connection.close()
})

describe('when there are users registered', () => {
  test('registered users displays info about all its blogs', async () => {
    const { body: users } =
      await api
        .get('/api/users')
        .expect('Content-Type', /application\/json/)
        .expect(200)

    const { blogs } = users[0]

    expect(blogs[0].title).toBeDefined()
    expect(blogs[0].author).toBeDefined()
    expect(blogs[0].url).toBeDefined()
  })
})

describe('when adding a new user', () => {
  test('succeeds when valid username and password are provided', async () => {
    const usersAtStart = await getUserList()

    await api
      .post('/api/users')
      .send(dummyUser)
      .expect(201)

    const usersAtEnd = await getUserList()
    const usersNames = usersAtEnd.map((user) => user.name)

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usersNames).toContain(dummyUser.name)
  })

  test('fails with statuscode 400 when no username or password are provided', async () => {
    const usersAtStart = await getUserList()

    const invalidUserNoUsername = {
      name: 'Beatriz Guaita',
      password: 'bea12345'
    }
    const invalidUserNoPass = {
      name: 'Beatriz Guaita',
      username: 'beatricita',
    }

    const { body: invalidUsername } =
      await api
        .post('/api/users')
        .send(invalidUserNoUsername)
        .expect(400)

    const { body: invalidPass } =
      await api
        .post('/api/users')
        .send(invalidUserNoPass)
        .expect(400)

    const usersAtEnd = await getUserList()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(invalidUsername.error.toLowerCase()).toContain('username')
    expect(invalidPass.error.toLowerCase()).toContain('invalid password')
  })
})
