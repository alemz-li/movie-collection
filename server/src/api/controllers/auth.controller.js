import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    // Check if request includes name,email and password
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Invalid details' })

    // Check if email is registered in database
    const isRegistered = await User.findOne({ email })
    if (isRegistered)
      return res.status(409).json({ message: 'Email already registered' })

    // Check if user is the owner
    if (email !== process.env.OWNER_EMAIL)
      return res.status(409).json({ message: 'Only the owner can register' })

    // Hash user's password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    // Create user in User table
    await newUser.save()

    res.status(200).json({ message: 'User registered' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

export const logIn = async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if request includes email and password
    if (!email || !password)
      return res.status(400).json({ message: 'Missing details for log in' })

    // Check if email is registered in database
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Check if passwords is correct
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
      return res.status(401).json({ message: 'Invalid password' })

    // Valid user. Generate JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    // Create HTTPOnly cookie with JWT
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

export const hasCookie = async (req, res) => {
  res.send(true)
}

export const logout = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  })

  res.sendStatus(204)
}
