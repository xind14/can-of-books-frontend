import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from './About';

function App () {
  return (
    <>
      <Router>
          <Header />
          <Routes>
          <Route 
              exact path="/"
              element={<BestBooks />}
              >

            </Route>
            <Route 
              exact path="/about"
              element={<About />}
              >
            </Route>
            <Route 
              exact path="/profile"
              element={<Profile />}
              >

            </Route>
            
            
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>
      </>
  )
}

export default App;
