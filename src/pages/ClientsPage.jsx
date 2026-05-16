import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, Button, Table, Modal, Input, Select, Badge } from '../components/UI';

const ClientsPage = () => {
  const { clients, addClient, updateClient, deleteClient } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    agreementType: 'Monthly Contract',
    billingAmount: '',
    contractStart: '',
    contractEnd: '',
    requiredLabourCount: '',
    status: 'Active',
    rating: '',
  });

  const handleOpenModal = (client = null) => {
    if (client) {
      setFormData(client);
      setEditingId(client.id);
    } else {
      setFormData({
        companyName: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        agreementType: 'Monthly Contract',
        billingAmount: '',
        contractStart: '',
        contractEnd: '',
        requiredLabourCount: '',
        status: 'Active',
        rating: '',
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingId) {
      updateClient(editingId, formData);
    } else {
      addClient(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      deleteClient(id);
    }
  };

  const columns = [
    { key: 'companyName', label: 'Company Name' },
    { key: 'contactPerson', label: 'Contact Person' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge
          text={row.status}
          variant={row.status === 'Active' ? 'success' : 'danger'}
        />
      ),
    },
    {
      key: 'billingAmount',
      label: 'Monthly Billing',
      render: (row) => `$${row.billingAmount.toLocaleString()}`,
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (row) => `⭐ ${row.rating}`,
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
        <h1 className="text-3xl font-bold text-gray-900">Clients Management</h1>
        <Button onClick={() => handleOpenModal()}>+ Add Client</Button>
      </div>

      <Card title={`Total Clients: ${clients.length}`}>
        <Table columns={columns} data={clients} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Edit Client' : 'Add New Client'}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />
          <Input
            label="Contact Person"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Enter contact person"
          />
          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
          <Select
            label="Agreement Type"
            name="agreementType"
            value={formData.agreementType}
            onChange={handleChange}
            options={[
              { value: 'Monthly Contract', label: 'Monthly Contract' },
              { value: 'Project Based', label: 'Project Based' },
              { value: 'Annual Contract', label: 'Annual Contract' },
            ]}
          />
          <Input
            label="Monthly Billing Amount"
            name="billingAmount"
            type="number"
            value={formData.billingAmount}
            onChange={handleChange}
            placeholder="Enter billing amount"
          />
          <Input
            label="Required Labour Count"
            name="requiredLabourCount"
            type="number"
            value={formData.requiredLabourCount}
            onChange={handleChange}
            placeholder="Enter labour count"
          />
          <Input
            label="Contract Start Date"
            name="contractStart"
            type="date"
            value={formData.contractStart}
            onChange={handleChange}
          />
          <Input
            label="Contract End Date"
            name="contractEnd"
            type="date"
            value={formData.contractEnd}
            onChange={handleChange}
          />
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
              { value: 'Suspended', label: 'Suspended' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ClientsPage;
