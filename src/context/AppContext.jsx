import React, { createContext, useState, useCallback, useEffect } from 'react';
import {
  mockClients,
  mockLabourers,
  mockAssignments,
  mockAttendance,
  mockPayroll,
  mockRatings,
  mockInvoices,
  mockReports,
} from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRole, setUserRoleState] = useState(() => {
    // Initialize from localStorage if available
    return localStorage.getItem('userRole') || 'admin';
  });
  
  const setUserRole = useCallback((role) => {
    setUserRoleState(role);
    localStorage.setItem('userRole', role);
  }, []);
  const [clients, setClients] = useState(mockClients);
  const [labourers, setLabourers] = useState(mockLabourers);
  const [assignments, setAssignments] = useState(mockAssignments);
  const [attendance, setAttendance] = useState(mockAttendance);
  const [payroll, setPayroll] = useState(mockPayroll);
  const [ratings, setRatings] = useState(mockRatings);
  const [invoices, setInvoices] = useState(mockInvoices);

  // Client Management
  const addClient = useCallback((client) => {
    const newClient = {
      ...client,
      id: Math.max(...clients.map(c => c.id), 0) + 1,
    };
    setClients([...clients, newClient]);
    return newClient;
  }, [clients]);

  const updateClient = useCallback((id, updatedClient) => {
    setClients(clients.map(c => c.id === id ? { ...c, ...updatedClient } : c));
  }, [clients]);

  const deleteClient = useCallback((id) => {
    setClients(clients.filter(c => c.id !== id));
  }, [clients]);

  // Labour Management
  const addLabourer = useCallback((labourer) => {
    const newLabourer = {
      ...labourer,
      id: Math.max(...labourers.map(l => l.id), 0) + 1,
    };
    setLabourers([...labourers, newLabourer]);
    return newLabourer;
  }, [labourers]);

  const updateLabourer = useCallback((id, updatedLabourer) => {
    setLabourers(labourers.map(l => l.id === id ? { ...l, ...updatedLabourer } : l));
  }, [labourers]);

  const deleteLabourer = useCallback((id) => {
    setLabourers(labourers.filter(l => l.id !== id));
  }, [labourers]);

  // Assignment Management
  const addAssignment = useCallback((assignment) => {
    const newAssignment = {
      ...assignment,
      id: Math.max(...assignments.map(a => a.id), 0) + 1,
    };
    setAssignments([...assignments, newAssignment]);
    return newAssignment;
  }, [assignments]);

  const updateAssignment = useCallback((id, updatedAssignment) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, ...updatedAssignment } : a));
  }, [assignments]);

  const deleteAssignment = useCallback((id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  }, [assignments]);

  // Attendance Management
  const markAttendance = useCallback((labourerId, date, status) => {
    const newAttendance = {
      id: Math.max(...attendance.map(a => a.id), 0) + 1,
      labourerId,
      labourerName: labourers.find(l => l.id === labourerId)?.fullName || 'Unknown',
      date,
      checkIn: status === 'Present' ? '9:00 AM' : '-',
      checkOut: status === 'Present' ? '5:00 PM' : '-',
      status,
      overtimeHours: 0,
    };
    setAttendance([...attendance, newAttendance]);
    return newAttendance;
  }, [attendance, labourers]);

  const value = {
    userRole,
    setUserRole,
    clients,
    addClient,
    updateClient,
    deleteClient,
    labourers,
    addLabourer,
    updateLabourer,
    deleteLabourer,
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    attendance,
    markAttendance,
    payroll,
    ratings,
    invoices,
    reports: mockReports,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
