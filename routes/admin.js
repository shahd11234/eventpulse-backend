const express = require('express');
const router = express.Router();
const User = require('../models/User');
const protect = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');

// Get all users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrganizers = await User.countDocuments({ role: 'organizer' });
    res.json({ totalUsers, totalOrganizers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;