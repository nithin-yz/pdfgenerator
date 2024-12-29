// auth.js (middleware)
const jwt = require('jsonwebtoken');  // Assuming you're using JWT for authentication

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from the Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    console.log("Decoded token:", decoded)
    req.userId = decoded.id;  // Attach userId to the request object
    console.log(req.userId)
    next();
  });
};

// Use module.exports to export the middleware function
module.exports = authenticateUser;
