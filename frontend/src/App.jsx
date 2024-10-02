import React from 'react';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Navbar, Footer } from "./components";
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
  );
}

export default App;
