const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

userRouter.route('/')
  .get(async (_, res) => {
    const users = await User.find({})
    res.status(200).json(users)
  })
  .post(async (req, res) => {
    const { name, username, password } = req.body

    if(password.length < 8) {
      res.status(404)
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = User({
      name,
      username,
      passwordHash
    })

    const addedUser = await newUser.save()
    res.status(201).json(addedUser)
  })

module.exports = userRouter