import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function CustomerList() {
  const { customers } = useSelector((state) => state.points);
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCustomer(selectedId);
    
    if (selectedId) {
      navigate(`/customer/${selectedId}`);
    }
  };

  return (
    <select value={selectedCustomer} onChange={handleDropdownChange}>
      <option value="" disabled>Select a customer</option>
      {customers.map((customer) => (
        <option key={customer.id} value={customer.id}>
          {customer.name}
        </option>
      ))}
    </select>
  );
}
