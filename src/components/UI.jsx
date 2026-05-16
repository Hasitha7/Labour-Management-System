import React, { useState } from 'react';

export const Card = ({ title, children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
    {children}
  </div>
);

export const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded font-medium transition cursor-pointer';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-semibold text-gray-700">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Modal = ({ isOpen, title, children, onClose, onSave, saveText = 'Save' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        <div className="p-6">{children}</div>
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onSave}>{saveText}</Button>
        </div>
      </div>
    </div>
  );
};

export const StatCard = ({ title, value, subtitle, icon, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    red: 'bg-red-50 border-red-200 text-red-900',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  };

  return (
    <div className={`${colors[color]} border rounded-lg p-6`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-xs text-gray-600 mt-2">{subtitle}</p>}
        </div>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
    </div>
  );
};

export const Badge = ({ text, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-200 text-gray-800',
    success: 'bg-green-200 text-green-800',
    danger: 'bg-red-200 text-red-800',
    warning: 'bg-yellow-200 text-yellow-800',
    info: 'bg-blue-200 text-blue-800',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {text}
    </span>
  );
};

export const FormGroup = ({ label, children, error }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
    {children}
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);

export const Input = ({ label, name, type = 'text', placeholder, value, onChange, ...props }) => (
  <FormGroup label={label}>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </FormGroup>
);

export const Select = ({ label, name, options, value, onChange, ...props }) => (
  <FormGroup label={label}>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </FormGroup>
);
