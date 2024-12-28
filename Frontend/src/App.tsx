import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignUpPage } from '@/pages/SignUp';
import { LoginPage } from '@/pages/Login';
import { ProductsPage } from '@/pages/Products';
import { InvoicePage } from '@/pages/Invoice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App;