import { Suspense } from 'react';
import { useApi } from './hooks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CustomerDetail, CustomerList, ErrorBoundary, Fallback } from './components';

/**
 * The main application component.
 * This component sets up the routing and wraps the main content in error boundary and suspense for async loading.
 * When the API data is being fetched, a loading message will be displayed. 
 * Once the data is loaded, the main application will be rendered with routing capabilities.
 * 
 * @returns {ReactElement} The rendered component.
 */
const App = () => {
  // Using the useApi hook to check if the API data is still loading
  const { loading } = useApi();

  // If the data is still loading, display a loading message
  if (loading) return <Fallback />;

  // Main app component
  return (
    // Router component for setting up routes
    <Router>
      {/* ErrorBoundary wraps the child components to catch any JavaScript errors that occur */}
      <ErrorBoundary>
        {/* Suspense ensures a fallback UI is shown until a condition is met, in this case until data is loaded */}
        <Suspense fallback={<Fallback />}>
          <div>
            <h1>Reward Points Dashboard</h1>
            {/* CustomerList component displays a list of customers */}
            <CustomerList />

            {/* Routes for different pages */}
            <Routes>
              {/* The Route for the detailed view of a single customer */}
              <Route path="/customer/:id" element={<CustomerDetail />} />
            </Routes>
          </div>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
