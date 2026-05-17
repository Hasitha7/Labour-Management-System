import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ClientsPage from './pages/ClientsPage';
import LaboursPage from './pages/LaboursPage';
import AssignmentsPage from './pages/AssignmentsPage';
import AttendancePage from './pages/AttendancePage';
import PayrollPage from './pages/PayrollPage';
import RatingsPage from './pages/RatingsPage';
import InvoicesPage from './pages/InvoicesPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

// Client Pages
import ClientDashboard, { ClientWorkers, ClientInvoices, ClientRatings } from './pages/ClientPages';

// Labourer Pages
import LabourerDashboard, {
  LabourerJobs,
  LabourerAttendance,
  LabourerPayroll,
  LabourerRatings,
} from './pages/LabourerPages';

const App = () => {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<ClientsPage />} />
          <Route path="/admin/labourers" element={<LaboursPage />} />
          <Route path="/admin/assignments" element={<AssignmentsPage />} />
          <Route path="/admin/attendance" element={<AttendancePage />} />
          <Route path="/admin/payroll" element={<PayrollPage />} />
          <Route path="/admin/ratings" element={<RatingsPage />} />
          <Route path="/admin/invoices" element={<InvoicesPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />

          {/* Client Routes */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/workers" element={<ClientWorkers />} />
          <Route path="/client/invoices" element={<ClientInvoices />} />
          <Route path="/client/ratings" element={<ClientRatings />} />

          {/* Labourer Routes */}
          <Route path="/labourer/dashboard" element={<LabourerDashboard />} />
          <Route path="/labourer/assignments" element={<LabourerJobs />} />
          <Route path="/labourer/attendance" element={<LabourerAttendance />} />
          <Route path="/labourer/payroll" element={<LabourerPayroll />} />
          <Route path="/labourer/ratings" element={<LabourerRatings />} />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
};

export default App;
