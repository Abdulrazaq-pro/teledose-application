---

# Teledose

## Overview
Teledose is a web application that provides users the ability to communicate with a medical expert interfaced via AI to provide solutions to medical issues they might be facing,it allows them to input their symtoms or whatever issues they maybe facing and provides remedies to them.It also provides an interface to chat with our AI medical expert to place any health concerns they maybe facing.

## Table of Contents
1. [Project Setup](#project-setup)
2. [Technology Stack](#technology-stack)
3. [Approach](#approach)
4. [Code Architecture](#code-architecture)
5. [Features](#features)
6. [Deployment](#deployment)
## Project Setup
To get started with the project locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/Abdulrazaq-pro/teledose-application.git
cd teledose-application
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technology Stack
- **Frontend**: Nextjs,javascript, Vite
- **Backend**: Firebase (Authentication, Firestore),Python(AI architecture)
- **Styling**: CSS Modules
- **Deployment**: Vercel

## Approach
### Authentication and Authorization
The project employs Firebase Authentication to manage user login and registration. The authentication state is handled using `localStorage` to store the access token, which is then used to guard protected routes, ensuring only authenticated users can access specific pages like the medical dashboard.

### State Management
State management is handled primarily through React’s built-in `useState` and `useEffect` hooks. The application’s state is kept minimal and is managed at the component level where possible, reducing complexity and improving maintainability.

### Routing
Nextjs App Router is used to handle the navigation between different pages. The routing system ensures that users are redirected appropriately based on their authentication status, using conditional logic within the route definitions.

### Error Handling
The application includes basic error handling for authentication and data fetching processes. Errors are displayed to users through inline messages, ensuring clarity and transparency when issues arise.

## Code Architecture
### Directory Structure
The project is organized into a modular directory structure, with components, pages, and utility functions neatly separated:

```
teledose-application/
│
├── public/           # Static assets
├── src/
│   ├── Components/   # reusable components
│   ├── App/         # Main page components (Login, Signup)
│   ├── lib/        # Utility functions (e.g., validation, formatting)
        ├── firebaseConfig.js    # Firebase service configurations
        ├── utils.js    # api connections, helper functions configurations
        
│
└── package.json      # Project dependencies and scripts
```

### Key Components
- **Navbar**: Provides navigation links and dynamically updates based on the user’s authentication state.
- **Login**: Handles user login with form validation and error feedback.
- **Signup**: Manages new user registration.
- **Dashboard**: The main dashboard component where users interact with the app.
- **chat bot**: For general chat with the AI medical expert.
- **Symtom Checker**: For geting quick diagnosis for symtoms and remedies that might need to be taken.


### Firebase Integration
The Firebase configuration is set up in a dedicated service file (`firebaseConfig.js`), which initializes Firebase services such as Firestore and Authentication. The Firebase SDK is used to interact with these services, ensuring secure and reliable data handling.

### Protected Routes
The application employs a custom route protection mechanism using conditional rendering. Routes are conditionally rendered based on the presence of a valid authentication token in `localStorage`, ensuring that users must be logged in to access certain pages.

## Features
- User Authentication (Login/Signup)
- Symtom checke and telemedicine chatbot
- Responsive Design

## Deployment
- The application is deployed on Vercel, which provides continuous deployment from the GitHub repository. Any changes pushed to the main branch are automatically deployed.
---
