import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import InventoryOverview from './pages/InventoryOverview';
import CategoryOverview from './pages/CategoryOverview';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryOverview />} />
          <Route path="/inventory/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<CategoryOverview />} />
          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
