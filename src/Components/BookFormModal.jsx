import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const url = import.meta.env.VITE_LOCAL_SERVER;

function BookFormModal({ setBooks,books, onHide }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let book = { title, description, status };
    console.log('Sending a book', book);
    try {
      let response = await axios.post(`${url}/books`, book);
      console.log('Server Response', response.data);
      setBooks((prevBooks)=>[...prevBooks, response.data]);
      onHide();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true} // Assuming you want to show the modal by default
      onHide={onHide}
    >
      <Modal.Header closeButton>
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
              />
              <Form.Control
                onChange={handleChange}
                name="description"
                placeholder="Book Description"
              />
              <Form.Select
                onChange={handleChange}
                name="status"
                aria-label="Default select example"
              >
                <option>Reading Status</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Favorites">Favorites</option>
                <option value="Recommended">Recommended</option>
              </Form.Select>
              <Button type="submit" variant="primary">
                Save Book
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}

export default BookFormModal;