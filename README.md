# Real Time Chat Server
This is the API/server for the Real-time Chat App. It handles user authentication, manages real-time communication, and stores chat messages.
You can find the client [here](https://github.com/cjxo/real-time-chat-client).
Please see the [live preview](https://real-time-chat-fullstack.onrender.com/). Pardon the delay of live preview loading, as I am using the free plan
of Render!

# Prerequisites
- Node.js
- PostgreSQL

# Environment Variables Setup
Create a .env file that contains the following variables:
- PG_CONNECTION_STRING - A PG connection string for the database. Please see [connectionString field of Config](https://node-postgres.com/apis/client).
- JWT_SECRET_KEY - A JWT secret key for jsonwebtoken operations. Please see the [secretOrPrivateKey parameter of jwt.sign](https://www.npmjs.com/package/jsonwebtoken).

# Installation
```bash
git clone https://github.com/cjxo/real-time-chat-server.git
cd real-time-chat-server
npm install
```

Next, we populate the database tables as follows
```bash
npm run populate
```

Finally, we run the server
```bash
npm run dev
```
The server will start and listen for incoming connections at http://localhost:3000

# Missing Features
- Supabase for storage
- Send Image Messaging
- Block User
- Two different users can message each other if and only if they have mutually added each other
- Update User Profile Pic