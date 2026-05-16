# Labour Management Platform - Development Instructions

## Project Overview
A React-based labour management and workforce outsourcing platform designed for customer demo. Frontend-only with mock data, supporting three main user roles: Admin, Clients, and Labourers.

## Tech Stack
- React 18 + Vite
- Tailwind CSS for styling
- React Router for navigation
- Recharts for data visualizations
- Context API for state management
- Mock data for demo (no backend required)

## Key Features
- Admin Dashboard with analytics
- Client Management (add/edit/delete clients)
- Labour Management (worker registration and tracking)
- Task/Assignment Management (shift planning)
- Attendance Tracking
- Salary & Payroll Management
- Client Billing
- Commission Tracking
- Labour Rating System
- Reports & Analytics

## Project Structure
```
src/
├── components/          # Reusable React components
├── pages/              # Page components for each feature
├── data/               # Mock data and constants
├── hooks/              # Custom React hooks
├── context/            # Context API providers
├── styles/             # Global styles
├── utils/              # Helper functions
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## Development Setup
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start development server
3. Open http://localhost:5173 in browser

## Build & Deployment
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Key Pages
- Admin Dashboard
- Clients page (manage clients)
- Labourers page (manage workers)
- Assignments (shift scheduling)
- Attendance tracking
- Payroll management
- Ratings & Performance
- Reports & Analytics
- Settings

## Styling
- Tailwind CSS utility classes
- Responsive design for all screen sizes
- Light theme with professional business styling

## Notes for Demo
- All data is mock/hardcoded for demonstration
- No authentication required for demo
- Can switch between Admin/Client/Labour views
- Charts and reports show sample data
