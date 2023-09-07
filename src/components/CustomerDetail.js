/**
 * CustomerDetail component
 *
 * This component displays detailed information of a specific customer. 
 * It fetches the customer's transaction history and total points from the Redux store,
 * then renders it in a structured format.
 *
 * @module components/CustomerDetail
 */

// Importing required hooks
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Importing utility function to calculate points
import { calculatePoints } from '../utils';

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

  // Filtering the customer's transaction history based on the customer id
  const customerHistory = history.filter((item) => item.customer === parseInt(id, 10));

  // Retrieving the customer's name based on the customer id
  const name = customers.find((customer) => customer.id === parseInt(id, 10)).name;

  // Calculating the total points for the customer's purchase history
  const totalPoints = customerHistory.reduce((acc, item) => acc + calculatePoints(item.amount), 0);

  // Component's return/render logic
  return (
    <div>
      <h2>Customer {name} Purchase History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {customerHistory.map((item, index) => {
            // Converting the transaction date to a formatted string
            let date = new Date(item.date);
            date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            return (
              <tr key={index}>
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
