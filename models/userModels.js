const User = require('../schemas/user')
const mongoose = require('mongoose')
const db = require('../db/connection')
const { generateSalt, hashPassword, validPassword } = require('../utils')

exports.selectUsers = async (queries) => {
  const {
    limit = 10,
    page = 1,
  } = queries

  if (!Number.isInteger(parseInt(limit)) ||
      !Number.isInteger(parseInt(page))) {
    return Promise.reject({status: 400, msg: 'Bad request - invalid sort'})
  }
  let result
  if (limit === '0') {
    result = await User.paginate(
      {},
      {
        sort: {created_at: -1},
        pagination: false,
        select: ['user_id', 'name', 'bio', 'avatar_url', 'username']
      }  
    )
    return {
      users: result.docs,
      totalPages: result.totalPages,
      page: result.page,
      totalResults: result.totalDocs
    }
  } else {
    const result = await User.paginate(
      {},
      {
        sort: {created_at: -1},
        offset: (page - 1) * limit,
        limit,
        select: ['user_id', 'name', 'bio', 'avatar_url', 'username']
      }  
    )
    if (page > result.totalPages) {
      return Promise.reject({status: 404, msg: 'Resource not found'})
    }
    return {
      users: result.docs,
      totalPages: result.totalPages,
      page: result.page,
      totalResults: result.totalDocs
    }
  }
}

exports.selectUserById = async (user_id) => {
  const result = await User.findOne(
    { _id: user_id })
    .select('user_id name bio avatar_url username')
  return result
}

exports.insertUser = async ({
  username,
  name,
  bio,
  avatar_url,
  password
}) => {
  if (!username || !password) {
    return Promise.reject({status: 400, msg: 'Bad request'})
  }
  const users = await User.find({})
    .select('username')

  if (users.map(user => user.username)
    .includes(username)) {
    return Promise.reject({status: 400, msg: 'Username is taken'})
  }

  const salt = generateSalt()

  const user = new User({
    username,
    name,
    bio,
    avatar_url,
    salt,
    hash: hashPassword(password, salt)
  })
  const result = await user.save()
  return result
}

exports.login = async ({username, password}) => {

}