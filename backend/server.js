const express = require('express');
const boardRoutes = require('./routes/boards');
const taskRoutes = require('./routes/tasks');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);


app.listen(3000, () => console.log('Server running on port 3000'));