require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Setup Socket.io for real-time communication
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/emergency_db';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Routes
const alertRoutes = require('./routes/alertRoutes')(io);
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/alerts', alertRoutes);
app.use('/api/contacts', contactRoutes);

// Hardware specific endpoint shorthand (also handled in alertRoutes)
app.post('/api/hardware/trigger', (req, res) => {
  // Can be used by Arduino to just hit a simple endpoint
  // Need to redirect or handle it
  res.redirect(308, '/api/alerts/hardware');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Trigger restart
