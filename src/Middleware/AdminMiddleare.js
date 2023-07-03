const jwt = require('jsonwebtoken');
const { UserModel } = require('../Models/UserModel/userModel');


// This is the admin credential to check the assignement;
// from here you can generate a token which isused in middleware
//  email:"admin@gmail.com";
// password=111
 



const authenticateAndAuthorize = async (req, res, next) => {
    // Get the token from the request headers or query parameters
    const token = req.headers.authorization || req.query.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, '12345');
  console.log(decoded,"SSS")
      // Assuming you have a User model with the role field
      const user = await UserModel.findById( decoded.userID);
      console.log(user)
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      // Attach the user object to the request for further use if needed
      req.user = user;
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error decoding token:', error);
      return res.status(400).json({ error: 'Internal Server Error || Unathorize' });
    }
  };
  
  module.exports={
    authenticateAndAuthorize
  }