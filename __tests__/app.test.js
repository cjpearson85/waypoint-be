const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const {Route, Comment, User, Follow, Poi, CommentLike, RouteLike} = require('../schemas/index')
const mongoose = require('mongoose')
const setupTests = require('../setup-tests')
// const testData = require('../db/data/test-data/index')

// async function removeAllCollections () {
//   const collections = Object.keys(mongoose.connection.collections)
//   for (const collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName]
//     await collection.deleteMany()
//   }
// }

// async function dropAllCollections () {
//   const collections = Object.keys(mongoose.connection.collections)
//   for (const collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName]
//     try {
//       await collection.drop()
//     } catch (error) {
//       if (error.message === 'ns not found') return
//       if (error.message.includes('a background operation is currently running')) return
//       console.log(error.message)
//     }
//   }
// }

// async function seedAllCollections () {
//   await mongoose.connection.models.User.insertMany(testData.users)
//   await mongoose.connection.models.Route.insertMany(testData.routes)
//   await mongoose.connection.models.Follow.insertMany(testData.follows)
//   await mongoose.connection.models.Poi.insertMany(testData.pois)
//   await mongoose.connection.models.RouteLike.insertMany(testData.routeLikes)
//   await mongoose.connection.models.CommentLike.insertMany(testData.commentLikes)
// }

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/test`
  await mongoose.connect(url)
})

beforeEach(async () => {
  await setupTests.seedAllCollections()
})

afterEach(async () => {
  await setupTests.removeAllCollections()
})

afterAll(async () => {
  await setupTests.dropAllCollections()
  await mongoose.connection.close()
})

describe('Name of the group', () => {
  it('should ', async () => {
    const res = await request.get('/api/users')
    expect(res.body.users).toEqual()
  })
})