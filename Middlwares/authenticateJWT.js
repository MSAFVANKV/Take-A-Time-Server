// middleware/auth.js

import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {

  try {
    const token = req.cookies.token
    //   console.log(token,'authenticateJWT');
    
      if (!token) {
        return res.json({ msg: 'Authorization denied. No token provided.' });
      } else{
        jwt.verify(token, process.env.JWT_SECRET ,(err,decoded ) =>{
                if(err) {
                    res.json({ msg: 'wrong token !!' });
                }
                req.user = decoded;
                next()
        })
      }
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};

export default authenticateJWT;
