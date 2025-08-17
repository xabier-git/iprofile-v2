const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log("Auth.middleware.js: authenticateToken authHeader", authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.error("Auth.middleware.js: authenticateToken no token found");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Auth.middleware.js: authenticateToken JWT verification error :: ", err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      console.error("Auth.middleware.js: authorizeRole access denied", { user: req.user, requiredRole });
      return res.sendStatus(403); // Prohibido
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };