## Flourishing-App

A full-stack mindfulness and reflection platform that encourages self-growth through the Five Pillars of Mindfulness.  
Users can log in with Firebase, read inspiring quotes, and record personal reflections stored securely in MongoDB.

## Overview

The Flourishing App is designed to promote mindfulness and self-awareness through guided learning and interactive journaling.  
After signing in, users begin on a page introducing the Five Pillars of Mindfulness. From there, they can explore daily quotes for inspiration or write reflections that are saved in a secure database.

This project demonstrates skills in full-stack development, user authentication, API integration, and database design.

## Features

- Educational Mindfulness Page: Introduces the Five Pillars of Mindfulness  
- User Authentication: Firebase authentication using Google or email/password  
- Reflections Page: Add, view, and manage personal reflection entries  
- Quotes Page: Displays motivational quotes using a public API  
- MongoDB Integration: Stores reflection data in a cloud-hosted MongoDB Atlas database  
- Responsive UI: Built with React and styled for accessibility and simplicity

## Tech Stack

### Frontend
- React (with React Router DOM)
- Firebase Authentication
- Axios for API calls
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- Firebase Admin SDK (for verifying tokens)
- dotenv, cors

## Project Structure

```text
human-flourishing-app/
├── client/
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
├── server/
│   ├── server.js
│   ├── routes/
```
---

## Installation and Setup


**1**. Clone the repository
git clone https://github.com/Nvafeomo/Flourishing-App.git
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

**Backend**:

cd server
npm start


**Frontend**:

cd ../client
npm start


Once both are running, open your browser and go to:
http://localhost:3000

## Test Configuration (For Quick Setup)

If you don't have your own Firebase credentials, you can use these test configuration values to get the app running quickly:

### Frontend Firebase Config
In `/client/src/firebase.js`, replace the Firebase config with:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "test-api-key",
  projectId: "test-project-id",
  authDomain: "test-project-id.firebaseapp.com",
  storageBucket: "test-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "test-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### Backend Environment Variables
In `/server/.env`, use these test values:

```
MONGO_URI=mongodb+srv://test:test@cluster0.mongodb.net/test?retryWrites=true&w=majority
PORT=5000
```

### Test Firebase Service Account
Create `/server/firebaseServiceAccountKey.json` with:

```json
{
  "type": "service_account",
  "project_id": "test-project-id",
  "private_key_id": "test-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nTEST_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "test@test-project-id.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

 **Note:**
 - You need Node.js and npm installed for the program to function properly.
 - These are test credentials for development only - replace with your own for production.
 - The app will run with these test values but won't have real authentication or database functionality.
## Future Improvements

- Add reflection editing and deletion

- Track daily reflection streaks

- Include AI-generated mindfulness prompts

- Implement dark/light mode

- Add search and filtering for reflections

## Author

Nvafeomo Konneh
Comuter Science Student | Aspiring Full-Stack Developer
Email: konnehnvafeomo@gmail.com
GitHub: https://github.com/Nvafeomo
LinkedIn: https://www.linkedin.com/in/nvafeomo-konneh-a6a1a9367/

