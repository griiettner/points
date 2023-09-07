import { Suspense } from 'react';
import { useApi } from './hooks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CustomerDetail, CustomerList, ErrorBoundary, Fallback } from './components';

const App = () => {
  const { loading } = useApi();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
          <div>
            <h1>Reward Points Dashboard</h1>
            <CustomerList />

            <Routes>
              <Route path="/customer/:id" element={<CustomerDetail />} />
            </Routes>
          </div>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
