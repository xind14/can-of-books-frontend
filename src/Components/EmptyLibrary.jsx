import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function EmptyLibrary(props) {
    if (props.show === true) {
    return (
      <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Book Collection Empty</Alert.Heading>
        <p>
          Please use the menu above to add books to your collection.
        </p>
      </Alert>
    );
  }
}

export default EmptyLibrary;