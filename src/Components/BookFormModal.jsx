import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';

const url = import.meta.env.VITE_LOCAL_SERVER;


function BookFormModal(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const[status, setStatus]= useState('');

  function handleChange(event){
    let name = event.target.name;
    let value = event.target.value;
    if (name==="title") {setTitle(value)}
    if (name==="description"){setDescription(value)}
    if (name==="status"){setStatus(value)}
  }

function handleSubmit = async(event)=>{
  event.preventDefault();
  let book = {title, description, status};
  console.log("Sending a book", book);
  try{
    let response = await axios.post(`${url}/books`, book);
    console.log("Server Response", response.data);
    props.setBooks([...props.books, response.data])
    props.onHide();
  } catch (error){
    console.error(error.message)
  }
}


  return (
    <Modal show={show} onHide={handleClose}>
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    </Modal>
  );
}

export default StaticExample;