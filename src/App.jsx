import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App () {
  return (
    <>
      <h1>Can-of-Books</h1>
      <div>
        <Header />
        {/* <BestBooks booklist = {bookdata} /> */}
        <Footer />
      </div>
    </>
  )
}

export default App;
