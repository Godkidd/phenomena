// Use the dotenv package, to create environment variables

// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000

// Import express, and create a server

// Require morgan and body-parser middleware

// Have the server use morgan with setting 'dev'
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const db = require('./db');

// app.use(cors());
// app.use(express.json());
// app.use('/api', require('./api'));

// const port = process.env.PORT || 3000;

// app.listen(port, async () => {
//     try{
//         console.log(`listening on port ${port}`);
//         await db.client.connect();
//     }
//     catch(ex) {
//         console.log(ex);
//     }
    
// });

// Import cors 
// Have the server use cors()

// Have the server use bodyParser.json()

// Have the server use your api router with prefix '/api'

// Import the client from your db/index.js

// Create custom 404 handler that sets the status code to 404.

// Create custom error handling that sets the status code to 500
// and returns the error as an object


// Start the server listening on port PORT
// On success, connect to the database
