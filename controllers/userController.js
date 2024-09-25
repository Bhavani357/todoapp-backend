const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../database'); 
const User = require('../models/User');
const {findById} = require('../models/User')

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Define salt rounds
    const saltRounds = 10;

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert new user into the database
    const userId = uuidv4();
    await db.run(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, 
      [userId, name, email, hashedPassword]);

    // Generate JWT Token
    const token = jwt.sign({ userId }, 'secret', { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).send('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid password');

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, password } = req.body;

  try {
    const user = await findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let updatedFields = {
      name: name || user.name,   
      email: email || user.email, 
    };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    await db.run(
      `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,
      [updatedFields.name, updatedFields.email, updatedFields.password || user.password, userId]
    );

    res.json({ message: 'Profile updated successfully', user: updatedFields });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

module.exports = { signup, login , updateProfile};
