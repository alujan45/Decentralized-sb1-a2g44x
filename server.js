import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'dist')));

const devices = new Map();
const tasks = new Map();

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('registerDevice', (device) => {
    devices.set(socket.id, { ...device, socketId: socket.id });
    io.emit('devicesUpdated', Array.from(devices.values()));
  });

  socket.on('addTask', (task) => {
    tasks.set(task.id, { ...task, status: 'Pending' });
    distributeTask(task);
    io.emit('tasksUpdated', Array.from(tasks.values()));
  });

  socket.on('updateTaskStatus', ({ taskId, status }) => {
    const task = tasks.get(taskId);
    if (task) {
      task.status = status;
      io.emit('tasksUpdated', Array.from(tasks.values()));
    }
  });

  socket.on('disconnect', () => {
    devices.delete(socket.id);
    io.emit('devicesUpdated', Array.from(devices.values()));
  });
});

function distributeTask(task) {
  const availableDevices = Array.from(devices.values()).filter(device => device.status === 'Online');
  if (availableDevices.length > 0) {
    const randomDevice = availableDevices[Math.floor(Math.random() * availableDevices.length)];
    task.assignedTo = randomDevice.id;
    task.status = 'In Progress';
    io.to(randomDevice.socketId).emit('assignTask', task);
  }
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});