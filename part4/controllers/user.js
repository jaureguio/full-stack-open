const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const utils = require('../utils')

const { config } = utils

userRouter.route('/')
  .get(async (_, res) => {
    const users =
      await User
        .find({})
        .populate('blogs', {
          url: 1,
          title: 1,
          author: 1,
          id: 1
        })

    res.status(200).json(users)
  })
  .post(async (req, res) => {
    const { name, username, password } = req.body

    if(!password || password.length < 3) {
      return res.status(400).send({ error: 'invalid password, it must be at least 3 characters long' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      name,
      username,
      passwordHash
    })

    const addedUser = await newUser.save()
    const userForToken = {
      username: addedUser.username,
      id: addedUser._id
    }
    const token = jwt.sign(userForToken, config.SECRET)

    res.status(201).send({
      token,
      username: addedUser.username,
      name: addedUser.name
    })
  })

module.exports = userRouter