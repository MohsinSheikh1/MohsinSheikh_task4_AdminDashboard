const jwt = require('jsonwebtoken');

//middleware to check for token and validating it
module.exports = (req, res, next) => {
  //checking for token and verifying it
  try {
    const token = req.headers.authorization;
    jwt.verify(token, 'secret_password');
    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({message: "Authorization failed"});
  }
}
