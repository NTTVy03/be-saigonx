const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAccount = require('../models').UserAccount;

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  console.log("# Register API");

  const { username, password, email, fullName} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = { 
      username, 
      password: hashedPassword, 
      email, 
      fullName: (fullName ? fullName : username)
    };

    await UserAccount.create(user);

    res.status(201).json({
      message: "Register success"
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  console.log("# Login API");
  const { username, password } = req.body;
  try {
    const user = await UserAccount.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ 
      message: 'Login successful',
      accessToken
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  console.log("# Logout API");
  // Since we're not using refresh tokens or sessions, 
  // logout is handled on the client side by removing the token
  res.json({ message: 'Logout successful' });
};
