import React from 'react';
import './sass/_variables.scss';
import './sass/_base.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { AllBlogs, AllProducts, Blogview, Productview, Aboutus, Authenticate, Registration, Cart, Checkout, Contact, Homepage } from "./pages";
// import { Provider } from 'react-redux';
// import { store } from './app/store';
// import Routes from "./routing/Routes";


function App() {
  return (
    // <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/blogview" element={<Blogview />} />
          <Route path="/allprods" element={<AllProducts />} />
          <Route path="/prodview" element={<Productview />} />
          <Route path="/auth" element={<Authenticate />} />
          <Route path="/register" element={<Registration />} />
          {/* <PrivateRoute path="/cart" element={<Cart />} /> */}
          {/* <PrivateRoute path="/checkout" element={<Checkout />} /> */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    // </Provider>
  );
}

export default App;
