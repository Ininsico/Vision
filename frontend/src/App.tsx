import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Docs from './pages/Docs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Generate from './pages/Generate';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

// Get Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.warn('Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file');
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey || ''}>
      <Router>
        <Routes>
          {/* Auth routes without navbar/footer */}
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route path="/sign-up/*" element={<SignUp />} />

          {/* Admin routes without navbar/footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Protected App Routes (Sidebar Layout) */}
          <Route path="/generate" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Generate />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Public Routes (Navbar/Footer Layout) */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    {/* If signed in, redirect Home to Generate */}
                    <Route path="/" element={
                      <>
                        <SignedIn>
                          <Navigate to="/generate" replace />
                        </SignedIn>
                        <SignedOut>
                          <Home />
                        </SignedOut>
                      </>
                    } />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/docs" element={<Docs />} />
                    {/* Catch-all for 404s or unhandled paths */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
