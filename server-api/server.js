const mongoose = require('mongoose');
const Message = require('./messages/Message');

mongoose.connect('mongodb://sk4343:cu2uoK0HEequiey5@tux-mongo.cci.drexel.edu:27017/sk4343_info670_sp25', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'sk4343_info670_sp25'
}).then(() => {
  console.log('Connected to Drexel MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const messagesDir = path.join(__dirname, 'messages');

if (!fs.existsSync(messagesDir)) fs.mkdirSync(messagesDir);

app.use(cors());
app.use(bodyParser.json());

app.post('/sendMessage', async (req, res) => {
  const { sender, recipient, message } = req.body;
  try {
    const newMessage = new Message({ sender, recipient, message });
    await newMessage.save();
    res.json({ status: 'Message Sent (MongoDB)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'Failed to save message' });
  }
});


app.get('/retrieveMessages', async (req, res) => {
  const recipient = req.query.recipient;
  try {
    const messages = await Message.find({ recipient }).sort({ timestamp: -1 });
    res.json({ messages: messages.map(msg => `${msg.sender}: ${msg.message}`) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ messages: [] });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
