import express from 'express';
import { db } from '../config/firebase.js';

const router = express.Router();

// Get all messages for the authenticated user
router.get('/', async (req, res) => {
  try {
    const messagesRef = db.collection('messages');
    const snapshot = await messagesRef
      .where('userId', '==', req.user.uid)
      .get();
    
    const messages = [];
    snapshot.forEach(doc => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Create a new message
router.post('/', async (req, res) => {
  try {
    const { phoneNumber, message, schedule } = req.body;
    const messageData = {
      userId: req.user.uid,
      phoneNumber,
      message,
      schedule,
      createdAt: new Date(),
      status: 'pending'
    };

    const docRef = await db.collection('messages').add(messageData);
    res.status(201).json({ id: docRef.id, ...messageData });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// Update a message
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { phoneNumber, message, schedule, status } = req.body;

    const messageRef = db.collection('messages').doc(id);
    const messageDoc = await messageRef.get();

    if (!messageDoc.exists) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (messageDoc.data().userId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await messageRef.update({
      phoneNumber,
      message,
      schedule,
      status,
      updatedAt: new Date()
    });

    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// Delete a message
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messageRef = db.collection('messages').doc(id);
    const messageDoc = await messageRef.get();

    if (!messageDoc.exists) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (messageDoc.data().userId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await messageRef.delete();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;
