const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const protect = require('../middleware/auth');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create event
router.post('/', protect, async (req, res) => {
  try {
    const event = new Event({ ...req.body, organizer: req.user._id });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update event
router.put('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete event
router.delete('/:id', protect, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;