import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';
import Header from './components/ui/Header';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import AdminRoute from './components/admin/AdminRoute';

const Home = lazy(() => import('./pages/Home'));
const Store = lazy(() => import('./pages/Store/StorePage'));
const Offers = lazy(() => import('./pages/Offers'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const ProductDetail = lazy(() => import('./pages/Product/ProductDetail'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Account = lazy(() => import('./pages/Account'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <InventoryProvider>
          <Router>
            <Header />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Store />} />
                <Route path="/offers" element={<Offers />} />
                <Route
                  path="/admin/*"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </Suspense>
          </Router>
        </InventoryProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;