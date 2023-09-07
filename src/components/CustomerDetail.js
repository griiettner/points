import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { calculatePoints } from '../utils';

export function CustomerDetail() {
  const { history, customers } = useSelector((state) => state.points);
  const { id } = useParams();
  const customerHistory = history.filter((item) => item.customer === parseInt(id, 10));
  const name = customers.find((customer) => customer.id === parseInt(id, 10)).name;
  const totalPoints = customerHistory.reduce((acc, item) => acc + calculatePoints(item.amount), 0);

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
