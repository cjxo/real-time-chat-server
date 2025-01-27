# Real Time Chat Server
This is the API/server for the Real-time Chat App. It handles user authentication, manages real-time communication, and stores chat messages.
You can find the client [here](https://github.com/cjxo/real-time-chat-client).
Please see the [live preview](https://real-time-chat-fullstack.onrender.com/). Pardon the delay of live preview loading, as I am using the free plan
of Render!

# Prerequisites
- Node.js
- PostgreSQL
- Supabase Account
    - Create an account at [supabase](https://supabase.com/) and create a project.
    - Once you created a project, you will want to grab the Project URL and anon Project API key
    under the API settings.

# Environment Variables Setup
Create a .env file that contains the following variables:
- PGUSER
- PGPASSWORD
- PGDATABASE
- PGPORT
- PGHOST
- JWT_SECRET_KEY
- SUPABASE_PROJ_URL
- SUPABASE_API_KEY

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
- Image Messaging
- Block User
- Two different users can message each other if and only if they have mutually added each other.
- Update User Profile Pic
