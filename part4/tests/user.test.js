const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const { initializeUsers, getUserList } = helper

const api = supertest(app)

beforeEach(async () => {
  await initializeUsers
})

afterAll(() => {
  mongoose.connection.close()
})

describe('when there are users registered', () => {

  test.skip('a user entry displays info about all its blogs', async () => {
    // TODO
  })
})

describe('when adding a new user', () => {
  test('succeeds when valid username and password are provided', async () => {
    const usersAtStart = await getUserList()

    const dummyUser = {
      name: 'Esteban Agostini',
      username: 'estaban1',
      password: 'esteban1234'
    }

    await api
      .post('/api/users')
      .send(dummyUser)
      .expect(201)

    const usersAtEnd = await getUserList()
    const usersNames = usersAtEnd.map((user) => user.name)

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usersNames).toContain(dummyUser.name)
  })

  test('fails eith statuscode 400 when no username or password are provided', async () => {

  })

  test('fails with statuscode 400 when username or password are shorter than 3 characters long', async () => {

  })

  test('when a new blog is added it references any registered user', async () => {

  })
})
