# WhatsApp Message Sender

This project is a web application developed for sending automated WhatsApp messages to specified phone numbers. It allows users to schedule and send messages at desired times.

## 🚀 Features

- Automated WhatsApp message sending
- User-friendly interface
- Firebase Authentication (via Backend)
- Message scheduling with cron jobs
- Multiple phone number support
- Message sending history tracking

## 🛠️ Technologies

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios

### Backend
- Node.js
- Express.js
- Firebase Authentication
- Firebase Firestore

## 📋 Requirements

- Node.js (v18 or higher)
- npm or yarn
- Firebase project and credentials

## 🔧 Installation

1. Clone the project:
```bash
git clone https://github.com/username/wp-message-sender.git
cd wp-message-sender
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
   - Create `.env` file for backend:
```
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
PORT=3001
```
   - Create `.env` file for frontend:
```
REACT_APP_API_URL=http://localhost:3001
```

## 🚀 Running the Application

1. Start the backend:
```bash
cd backend
npm run dev
```

2. Start the frontend:
```bash
cd frontend
npm start
```

The application will start running at http://localhost:3000

## 📝 Usage

1. Log in to the application (authentication handled by backend)
2. Add recipient phone numbers
3. Create the message you want to send
4. Set up message sending schedule using cron expressions
5. Start the scheduled messages

## 🔒 Security

- All Firebase operations are handled securely through the backend
- Firebase Authentication for user management
- Firebase Security Rules for data access control
- HTTPS support
- Rate limiting implemented
- Secure storage of phone numbers and messages in Firestore

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/newFeature`)
3. Commit your changes (`git commit -am 'Added new feature'`)
4. Push to the branch (`git push origin feature/newFeature`)
5. Create a Pull Request
