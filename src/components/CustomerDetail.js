/**
 * CustomerDetail component
 *
 * This component displays detailed information of a specific customer. 
 * It fetches the customer's transaction history and total points from the Redux store,
 * then renders it in a structured format.
 *
 * @module components/CustomerDetail
 */

import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Importing utility function to calculate points
import { calculatePoints, sortColumns, COLUMN_DATE, COLUMN_AMOUNT, COLUMN_POINTS, SORT_ASC, SORT_DESC } from '../utils';

/**
 * CustomerDetail function component
 *
 * @returns {JSX.Element} - Rendered CustomerDetail component
 */
export function CustomerDetail() {
  // Using the useSelector hook to extract necessary data from the Redux store
  const { history, customers } = useSelector((state) => state.points);

  // Extracting the customer id from the URL using useParams hook
  const { id } = useParams();

  // State for sorting
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: SORT_ASC });

  // Filtering the customer's transaction history based on the customer id
  const customerHistory = history.filter((item) => item.customer === parseInt(id, 10));

  // Retrieving the customer's name based on the customer id
  const name = customers.find((customer) => customer.id === parseInt(id, 10)).name;

  // Calculating the total points for the customer's purchase history
  const totalPoints = customerHistory.reduce((acc, item) => acc + calculatePoints(item.amount), 0);

  // Sorting the customer's transaction history based on the sort configuration
  const sortedCustomerHistory = sortColumns(customerHistory, sortConfig);

  // State for sort classes
  const [sortClasses, setSortClasses] = useState({
    [COLUMN_DATE]: SORT_ASC,
    [COLUMN_AMOUNT]: '',
    [COLUMN_POINTS]: ''
  });
  
  // Event handler for sorting
  function handleSort(e) {
    // Extracting the sort key and direction from the clicked sort span
    const key = e.target.id;

    // Setting the sort direction
    const direction = sortConfig.key === key && sortConfig.direction === SORT_ASC ? SORT_DESC : SORT_ASC;

    // Update the sort configuration
    setSortConfig({ key, direction });

    // Reset all sort classes to default
    const updatedClasses = {
      [COLUMN_DATE]: '',
      [COLUMN_AMOUNT]: '',
      [COLUMN_POINTS]: ''
    };

    // Set the class for the clicked column
    updatedClasses[key] = direction;

    // Update the sortClasses state
    setSortClasses(updatedClasses);
  }

  // Component's return/render logic
  return (
    <div>
      <h2>Customer {name} Purchase History</h2>
      <table>
        <thead>
          <tr>
            <th>
              <span id={COLUMN_DATE} onClick={handleSort} className={sortClasses[COLUMN_DATE]}>
                Date
              </span>
            </th>
            <th>
              <span id={COLUMN_AMOUNT} onClick={handleSort} className={sortClasses[COLUMN_AMOUNT]}>
                Amount
              </span>
            </th>
            <th>
              <span id={COLUMN_POINTS} onClick={handleSort} className={sortClasses[COLUMN_POINTS]}>
                Points
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCustomerHistory.map((item, index) => {
            // Converting the transaction date to a formatted string
            let date = new Date(item.date);
            date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            return (
              <tr key={item.id}>
                <td>{date}</td>
                <td>${item.amount}</td>
                <td>{calculatePoints(item.amount)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <h3>Total Points: {totalPoints}</h3>
    </div>
  );
}
