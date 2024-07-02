const express =require('express');
const router = express.Router();
const {connectToDb} = require('../db.js')

router.post('/login',async (req, res) => {
    const {email, password} = req.body
    console.log(email, password);
  
    try {
        const db = await connectToDb();
        const user = await db.collection('users').findOne({email, password});
        console.log(user)
        const userType = user.userType;
      // create a to
  
      res.status(200).json({email,userType})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
);  

module.exports = router;