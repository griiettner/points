/**
 * CustomerList component
 *
 * This component displays a dropdown list of customers fetched from the Redux store.
 * Upon selecting a customer from the dropdown, the user is navigated to that specific
 * customer's detail page.
 *
 * @module components/CustomerList
 */

// Importing required hooks and utilities from React, Redux, and react-router-dom
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * CustomerList function component
 *
 * @returns {JSX.Element} - Rendered CustomerList component
 */
export function CustomerList() {
  // Using the useSelector hook to extract the list of customers from the Redux store
  const { customers } = useSelector((state) => state.points);

  // useNavigate hook from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  // Local component state to manage the currently selected customer
  const [selectedCustomer, setSelectedCustomer] = useState('');

  /**
   * Event handler function for dropdown change event.
   * On changing the dropdown, this function will navigate to the selected customer's detail page.
   *
   * @param {Event} e - The event object
   */
  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCustomer(selectedId);
    
    if (selectedId) {
      navigate(`/customer/${selectedId}`);
    }
  };

  // Component's return/render logic
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
