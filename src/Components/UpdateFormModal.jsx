import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const url = import.meta.env.VITE_LOCAL_SERVER;

function UpdateFormModal(props) {
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [book, setBook] = useState({});

  function handleChange(event) {
    setBook({ ...book, [event.target.name]: event.target.value });
  }
  const handleAlertDismiss = () => {
    setShowUpdateAlert(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(book);
    console.log("Updating a book", book);
    setBook({ title: "", description: "", status: "" });
    setShowUpdateAlert(true);
  };
  useEffect(() => {
    console.log("props.updateBook changed");
    setBook(props.book || {});
  }, [props.book]);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header>
        <Modal.Title>Update a Book!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="bookForm3" controlId="bookForm">
              <Form.Control
                onChange={handleChange}
                name="title"
                placeholder="Book Title"
                defaultValue={props.book.title}
              />
              <Form.Control
                onChange={handleChange}
                name="description"
                placeholder="Book Description"
                defaultValue={props.book.description}
              />
              <Form.Select
                onChange={handleChange}
                name="status"
                defaultValue={props.book.status}
                aria-label="Default select example"
              >
                <option value="" disabled>Reading Status</option>
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
        <Alert
          show={showUpdateAlert}
          variant="success"
          dismissible
          onClose={handleAlertDismiss}
        >
          Book updated successfully!
        </Alert>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
          Update Book
        </Button>

        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateFormModal;
