const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
  //+  Get token from the header
  // x-auth-token , c'est nous qui le definisons le nom qu'on veut
  // req.headers : dans cet object , il y aura 'x-auth-token , req.headers['x-auth-token']
  // req.headers.x-auth-token
  // req.get('x-auth-token')
  const token = req.header('x-auth-token'); //+ take a specifi headers

  // console.log(token, req.headers);

  //+ check if not token
  if (!token) {
    // 401: unauthoried
    return res.status(401).json({ msg: 'No token , authorization denied' });
  }

  try {
    const decoded = await jwt.verify(token, config.get('jwtSecret'));

    // * Create a new property in request object
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
