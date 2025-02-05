import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Footer } from './components';
import AppRoute from './routes/AppRoute';
import { useCurrentUserQuery } from './store/features/auth/authApi';

function App() {
  const { data: user } = useCurrentUserQuery();
  const isAuthenticated = !!user;

  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <Navbar user={user} isAuthenticated={isAuthenticated} />
      <main className="flex-grow">
        <AppRoute />
      </main>
      {/* Footer always visible */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
