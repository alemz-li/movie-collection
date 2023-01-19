import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    const { jwt: token } = req.cookies
    if (!token) return res.status(401).json({ message: 'No token provided' })

    if (typeof token !== 'undefined') {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' })
        }

        req.userEmail = decoded.email
        next()
      })
    } else {
      return res.status(403).json({ message: 'No token provided' })
    }
  } catch (error) {
    return res.status(401).json('Unauthorized. Invalid token')
  }
}
