import React from 'react';
import { Card } from '../components/UI';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <Card title="General Settings">
        <div className="space-y-4">
          <div className="pb-4 border-b">
            <p className="font-medium text-gray-800">Platform Name</p>
            <p className="text-gray-600 text-sm">Labour Management Platform</p>
          </div>
          <div className="pb-4 border-b">
            <p className="font-medium text-gray-800">Version</p>
            <p className="text-gray-600 text-sm">1.0.0</p>
          </div>
          <div>
            <p className="font-medium text-gray-800">Commission Rate</p>
            <p className="text-gray-600 text-sm">15%</p>
          </div>
        </div>
      </Card>

      <Card title="Email Notifications">
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-gray-700">Send salary notifications</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-gray-700">Send assignment updates</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-gray-700">Send payment reminders</span>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
