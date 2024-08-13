const jwt = require('jsonwebtoken');


  

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const authorizeVerified = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.user.id);

    if (!employee || !employee.verified) {
      return res.status(403).json({ message: 'Account not verified' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking verification status', error });
  }
};

module.exports = { authenticate, authorizeVerified };
