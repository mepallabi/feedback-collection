# AgenTAX - Performance Feedback Collection System

A modern, responsive web application built with React and Firebase for collecting and managing structured performance feedback. The system features a user-friendly feedback submission form and a secure admin dashboard for reviewing feedback.

## Features

### Public Feedback Form
- Clean, intuitive interface for feedback submission
- Star rating system for different performance areas
- Detailed comment sections for each feedback area
- Form validation and error handling
- Smooth animations and transitions using Framer Motion

### Admin Dashboard
- Secure authentication system
- Comprehensive feedback overview in a tabular format
- Detailed view for individual feedback submissions
- Real-time data updates using Firebase
- Responsive design for all device sizes

## Tech Stack

- **Frontend**: React.js with Vite
- **UI Framework**: Tailwind CSS
- **Animation**: Framer Motion
- **Backend/Database**: Firebase (Firestore)
- **Authentication**: Firebase Auth
- **Deployment**: Firebase Hosting

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd agentax
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a new project in Firebase Console
   - Enable Authentication and Firestore
   - Copy your Firebase configuration
   - Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/         # Reusable UI components
├── features/          # Feature-specific components
│   ├── auth/         # Authentication related components
│   ├── feedback/     # Feedback form and management
│   └── shared/       # Shared components like StarRating
├── config/           # Configuration files (Firebase etc.)
├── constants/        # Application constants
├── utils/           # Utility functions
└── App.jsx          # Main application component
```

## Routes

- `/` - Public feedback submission form
- `/admin` - Admin dashboard (requires authentication)

## Security

- Firebase Authentication for admin access
- Firestore security rules to protect data
- Environment variables for sensitive configuration
- Form validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js team for the amazing framework
- Firebase team for the backend infrastructure
- Tailwind CSS team for the utility-first CSS framework
- Framer Motion team for the animation library 