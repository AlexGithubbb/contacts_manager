const express = require('express');

const app = express();

const PORT = process.env.port || 5000;

app.get('/', (req, res) =>
  res.json({ message: 'welcome to the contact kepper api!' })
);

// get users
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
