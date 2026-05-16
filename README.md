# Labour Management Platform

A modern React-based web application for managing labour/workforce outsourcing business operations. This platform provides a complete solution for managing clients, labourers, assignments, attendance, payroll, and comprehensive reporting.

## Features

### Admin Dashboard
- **Dashboard**: Real-time analytics and key performance indicators
- **Client Management**: Add, edit, delete, and manage client accounts
- **Labour Management**: Register and track worker information and ratings
- **Assignment Management**: Create and manage worker-to-client assignments
- **Attendance Tracking**: Monitor daily worker attendance
- **Payroll Management**: Calculate and process worker salaries
- **Ratings & Performance**: Track worker performance ratings
- **Invoice Management**: Generate and track client invoices
- **Reports**: Comprehensive financial and operational reports
- **Settings**: Configure platform preferences

### Client Portal
- **Dashboard**: View company details and assigned workers
- **Worker Management**: View and rate assigned workers
- **Invoice Tracking**: Monitor billing and payments
- **Performance Ratings**: Rate worker performance

### Labour Portal
- **Dashboard**: Personal profile and overview
- **Job Assignments**: View assigned work positions
- **Attendance**: Track personal attendance records
- **Salary**: View salary details and payment history
- **Ratings**: View performance ratings and feedback

## Tech Stack

- **Frontend**: React 18
- **UI Framework**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **State Management**: Context API
- **Build Tool**: Vite
- **Node**: v18+

## Project Structure

```
src/
├── components/        # Reusable UI components (Layout, Cards, Tables, Forms, etc.)
├── pages/            # Page components for each feature
├── data/             # Mock data for demonstration
├── context/          # Context API providers for state management
├── utils/            # Helper functions and utilities
├── App.jsx           # Main application component with routing
├── main.jsx          # Application entry point
└── index.css         # Global styles

```

## Installation & Setup

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Key Pages

### Admin Panel
- `/admin/dashboard` - Main admin dashboard with analytics
- `/admin/clients` - Client management
- `/admin/labourers` - Labour management
- `/admin/assignments` - Assignment management
- `/admin/attendance` - Attendance tracking
- `/admin/payroll` - Payroll management
- `/admin/ratings` - Performance ratings
- `/admin/invoices` - Invoice management
- `/admin/reports` - Reports and analytics
- `/admin/settings` - Platform settings

### Client Portal
- `/client/dashboard` - Client dashboard
- `/client/workers` - View assigned workers
- `/client/invoices` - View invoices
- `/client/ratings` - Rate workers

### Labour Portal
- `/labourer/dashboard` - Personal dashboard
- `/labourer/assignments` - View job assignments
- `/labourer/attendance` - View attendance
- `/labourer/payroll` - View salary information
- `/labourer/ratings` - View performance ratings

## Demo Data

The application comes with comprehensive mock data including:
- 3 Sample Clients
- 5 Sample Labourers
- Multiple Assignments
- Attendance Records
- Payroll Data
- Performance Ratings
- Invoice Records

## Role-Based Access

The platform supports three user roles with dedicated workflows:

1. **Admin**: Full system access and management capabilities
2. **Client**: Can view assigned workers, invoices, and rate performance
3. **Labourer**: Can view assigned jobs, attendance, and salary information

Switch between roles using the role selector in the top-right corner of the application.

## Features Highlights

### Financial Management
- Revenue tracking and forecasting
- Payroll calculations and processing
- Commission tracking (configurable rate)
- Client invoicing and payment tracking
- Profit analysis and reporting

### Resource Management
- Client registration and contract management
- Worker registration with skills tracking
- Assignment scheduling and management
- Availability status tracking
- Document management

### Performance Monitoring
- Real-time attendance tracking
- Performance ratings (5-star scale)
- Individual metrics (quality, speed, discipline, communication)
- Worker performance analytics
- Top performer identification

### Reporting & Analytics
- Monthly revenue trends
- Payroll expense analysis
- Profit margin analysis
- Worker utilization metrics
- Client performance metrics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lightweight (~2MB bundle)
- Fast initial load time
- Responsive design for all screen sizes
- Optimized chart rendering with Recharts

## Future Enhancements

- Backend API integration
- Database persistence
- Real-time notifications
- Mobile app (React Native)
- Multi-language support
- GPS-based attendance
- Advanced analytics and ML predictions

## License

This project is created for demonstration purposes.

## Support

For issues, feature requests, or questions, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: May 2024
