import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';


const url = import.meta.env.VITE_SERVER;

function BookFormModal(props){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('');
  };


  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'status') {
      setStatus(value);
    }
  }
  const handleAlertDismiss = () => {
    setShowSaveAlert(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let book = { title, description, status };
    console.log('Sending a book', book);
    try {
      let response = await axios.post(`${url}/books`, book);
      console.log('Server Response', response.data);
      setShowSaveAlert(true);
      resetForm();
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true} 
      onHide={props.onHide}
    >
      <Modal.Header>
        <Modal.Title>Add a Book!</Modal.Title>
        
      </Modal.Header>

      <Modal.Body>
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="bookForm3" controlId="bookForm">
              <Form.Control
                onChange={handleChange}
                name="title"
                placeholder="Book Title"
                value={title}
              />
              <Form.Control
                onChange={handleChange}
                name="description"
                placeholder="Book Description"
                value={description}

              />
              <Form.Select
                onChange={handleChange}
                name="status"
                value={status}
                aria-label="Default select example"
              >
                <option>Reading Status</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Favorites">Favorites</option>
                <option value="Recommended">Recommended</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
              <Alert show={showSaveAlert} variant="success"  dismissible onClose={handleAlertDismiss}>
          Book saved successfully!
        </Alert>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
                Save Book
              </Button>

      <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookFormModal;