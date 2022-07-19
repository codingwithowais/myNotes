const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Ushi is a good boy'
const fetchUser = require('../middlewares/getuser');
// To register a new User and store the user into the database. NO LOGIN REQUIRED
router.post('/newuser', [
  body('name', 'name must be at least 5 chractrers').isLength({ min: 5 }),

  body('password', 'password must be at least 5 chractrers').isLength({ min: 5 }), body('email').isEmail()], async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    try {
      if (user) {
        return res.send('Email already exists')
      }
      let salt = await bcrypt.genSalt(10);


      let hashPassword = await bcrypt.hash(req.body.password, salt);
      let newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      })
      const data = {
        user: {
          id: newUser.id
        }
      }
      var jwtToken = jwt.sign(data, JWT_SECRET);
      res.json({ jwtToken });


    }
    catch (error) {
      console.error(error.message)

      res.status(500).send('some error occured')
    }
  })

// To verify the user credentials :: NO LOGIN REQUIRED
let success = false;
router.post('/login', [
  

  body('password', 'Password must required').exists(), body('email', 'Please enter a valid Email').isEmail()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
      
        
        return res.status(400).json({
          error: 'Please login with correct credentials',
         
         
        })

      }
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        success = false
        return res.status(400).json({

          error: 'Please login with correct credentials',
          success:success

        })
      }
      const data = {
        user: {
          id: user.id
        }
      }
      var jwtToken = jwt.sign(data, JWT_SECRET);
      {success = "true"};

      res.json({ jwtToken});
    }
    catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });

    }


  });


// To get the user details by decoding the jwt token into the user id and then with the help of id:: LOGIN REQUIRED
router.get('/getuser', fetchUser,


  async (req, res) => {
    try {

     let userId = req.user.id;
      if (!userId) {
        res.status(401).send({ error: 'Unauthorised User' })

      }
      const user = await User.findById(userId).select("-password");
      res.send(user);
      
    }
    catch (error) {
      res.send('Server Error');
    }




  });



module.exports = router;

