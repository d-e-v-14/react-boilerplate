# Prerequisites
- Node.js
- npm (automatically with node)
- Google account

Check versions:

```bash
node -v
npm -v
```
### Step 1: Create a React app 

```bash
npm create vite@latest my-app
```
- Select Framework: React
- Variant: JavaScript (For now)

Then
```bash
cd my-app
npm install
```
### Step 2: Install Tailwind CSS

- Install dependencies
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
This will create two files:
- tailwind.config.js
- postcss.config.js

### Step 3: Configure Tailwind

- update the tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Replace index.css with: 
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Run the app

``` npm run dev ```

## Setting up firebse console

### Step 1: Create Firebase Project

- Go to: https://console.firebase.google.com/
- Create a new firebase project
- Enter project name
- Click create

### Step 2: Enable Google Authentication
- Go to Authentication under Build
- Click Get Started
- Select google 
- Enable it and select support email
- Click Save

### Step 3: Register Web App
- Go to Project Settings
- Scroll down to your apps
- Select Web app
- Name the Web app
- Click register

``` 
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain.com",
  projectId: "your-project_id-a2469",
  storageBucket: "your-project_id-a2469.firebasestorage.app",
  messagingSenderId: "your-messaging-Sending-id",
  appId: "your-app-id"
};
```
### Step 4: Install Firebase in React

```npm install firebase```
### Step 5: Setup Firebase Config file
``` src/firebase.js```
```
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```
### Step 6: Use Environment Variables (MUST)
```.env```
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```


