const express = require('express');
const connectDB = require('./config/db');
const app = express();

// connecting DB
connectDB();

// init Middleware (for using body-parser, it's already included in express,we just need to init it)
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({ message: 'welcome to the contact kepper api!' })
);

// get users
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
