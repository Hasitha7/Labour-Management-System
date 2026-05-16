import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, Button, Table, Modal, Input, Select, Badge } from '../components/UI';

const LaboursPage = () => {
  const { labourers, addLabourer, updateLabourer, deleteLabourer } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    skills: '',
    experience: '',
    contact: '',
    address: '',
    joiningDate: '',
    salaryType: 'Monthly',
    bankDetails: '',
    availability: true,
    rating: '',
    assignedClient: '',
    status: 'Active',
  });

  const handleOpenModal = (labourer = null) => {
    if (labourer) {
      setFormData(labourer);
      setEditingId(labourer.id);
    } else {
      setFormData({
        fullName: '',
        nic: '',
        skills: '',
        experience: '',
        contact: '',
        address: '',
        joiningDate: '',
        salaryType: 'Monthly',
        bankDetails: '',
        availability: true,
        rating: '',
        assignedClient: '',
        status: 'Active',
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    if (editingId) {
      updateLabourer(editingId, formData);
    } else {
      addLabourer(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this labourer?')) {
      deleteLabourer(id);
    }
  };

  const columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'nic', label: 'NIC' },
    { key: 'skills', label: 'Skills', render: (row) => Array.isArray(row.skills) ? row.skills.join(', ') : row.skills },
    { key: 'experience', label: 'Experience (Yrs)', render: (row) => `${row.experience} years` },
    {
      key: 'availability',
      label: 'Availability',
      render: (row) => (
        <Badge
          text={row.availability ? 'Available' : 'Unavailable'}
          variant={row.availability ? 'success' : 'warning'}
        />
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (row) => `⭐ ${row.rating}`,
    },
    {
      key: 'assignedClient',
      label: 'Assigned To',
      render: (row) => row.assignedClient || 'Unassigned',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => handleOpenModal(row)}
            className="text-xs px-2 py-1"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(row.id)}
            className="text-xs px-2 py-1"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Labourers Management</h1>
        <Button onClick={() => handleOpenModal()}>+ Add Labourer</Button>
      </div>

      <Card title={`Total Labourers: ${labourers.length}`}>
        <Table columns={columns} data={labourers} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Edit Labourer' : 'Add New Labourer'}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />
          <Input
            label="NIC/ID"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            placeholder="Enter NIC number"
          />
          <Input
            label="Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., Electrical Work, Installation"
          />
          <Input
            label="Experience (Years)"
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Enter years of experience"
          />
          <Input
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
          <Input
            label="Joining Date"
            name="joiningDate"
            type="date"
            value={formData.joiningDate}
            onChange={handleChange}
          />
          <Select
            label="Salary Type"
            name="salaryType"
            value={formData.salaryType}
            onChange={handleChange}
            options={[
              { value: 'Monthly', label: 'Monthly' },
              { value: 'Weekly', label: 'Weekly' },
              { value: 'Daily', label: 'Daily' },
            ]}
          />
          <Input
            label="Bank Details"
            name="bankDetails"
            value={formData.bankDetails}
            onChange={handleChange}
            placeholder="Enter bank account details"
          />
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'On Leave', label: 'On Leave' },
              { value: 'Inactive', label: 'Inactive' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default LaboursPage;
