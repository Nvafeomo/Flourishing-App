## Flourishing-App
A full-stack mindfulness and reflection platform that encourages self-growth through the Five Pillars of Mindfulness.
Users can log in with Firebase, read inspiring quotes, and record personal reflections stored securely in MongoDB.

## Overview

The Flourishing App is designed to promote mindfulness and self-awareness through guided learning and interactive journaling.
After signing in, users begin on a page introducing the Five Pillars of Mindfulness. From there, they can explore daily quotes for inspiration or write reflections that are saved in a secure database.

This project demonstrates skills in full-stack development, user authentication, API integration, and database design.

## Features

Educational Mindfulness Page: Introduces the Five Pillars of Mindfulness

User Authentication: Firebase authentication using Google or email/password

Reflections Page: Add, view, and manage personal reflection entries

Quotes Page: Displays motivational quotes using a public API

MongoDB Integration: Stores reflection data in a cloud-hosted MongoDB Atlas database

Responsive UI: Built with React and styled for accessibility and simplicity

## Tech Stack

**Frontend**

React (with React Router DOM)

Firebase Authentication

Axios for API calls

Tailwind CSS

**Backend**

Node.js

Express.js

MongoDB Atlas with Mongoose

Firebase Admin SDK (for verifying tokens)

dotenv, cors


##  Project Structure

```text
human-flourishing-app/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── MindfulnessPillars.jsx
│   │   │   ├── Reflections.jsx
│   │   │   └── Quotes.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   └── firebase.js
│   ├── package.json
│   └── public/
│
├── server/                 # Express backend
│   ├── server.js
│   ├── routes/
│   │   └── reflections.js
│   ├── models/
│   │   └── Reflection.js
│   ├── firebaseServiceAccountKey.json
│   └── package.json
│
└── .env                    # Environment variables

## Installation and Setup
**1**. Clone the repository
git clone https://github.com/your-username/Flourishing-App.git
cd Flourishing-App

**2**. Install dependencies

**Frontend**:

cd client
npm install


**Backend**:

cd ../server
npm install

**3**. Set up environment variables

Inside the /server directory, create a .env file and add:

MONGO_URI=<your MongoDB Atlas connection string>
PORT=5000

**4**. Add Firebase credentials

Place your Firebase Admin SDK key file in the /server folder and name it:

firebaseServiceAccountKey.json

**5**. Run the servers

Backend:

cd server
npm start


Frontend:

cd ../client
npm start


Once both are running, open your browser and go to:
http://localhost:3000

## Future Improvements

Add reflection editing and deletion

Track daily reflection streaks

Include AI-generated mindfulness prompts

Implement dark/light mode

Add search and filtering for reflections

## Author

Nvafeomo Konneh
Comuter Science Student | Aspiring Full-Stack Developer
Email: konnehnvafeomo@gmail.com

GitHub: https://github.com/Nvafeomo

LinkedIn: https://www.linkedin.com/in/nvafeomo-konneh-a6a1a9367/
