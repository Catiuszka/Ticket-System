import React, { useState } from 'react';
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import Cookies from 'js-cookie';
import "../styles/Searchbar.css";

export default function Newtask() {
  const txt = Cookies.get('name');
  let user = "";
  if (txt) {
    const parts = txt.split(" ");
    user = parts[0];
  }

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [attachment, setAttachment] = useState('');

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  }
  const handleShow = () => setShow(true);

  const new_ticket = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description); 
    formData.append('category', category);
    formData.append('deadline', deadline); 
    formData.append('attachment', attachment);
    formData.append('user', user);

    try {
      const response = await fetch('http://localhost/projectx/task.php', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      console.log(data);

      if (data.success) {
        setShow(false);
      } 
      
      else if (data.error) {
        console.log("Error occurred during form submission.");
      }

    } catch (error) {
        console.error('There was an error:', error);
    }
  }

  return (
    <div>
      <Modal data-bs-theme="dark" show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header className="header-newTask" closeButton>
          <Modal.Title>New Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form data-bs-theme="dark" noValidate validated={validated} onSubmit={new_ticket} encType="multipart/form-data">

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control 
                type="text" 
                required 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                maxLength="50" 
              />
              <Form.Control.Feedback type="invalid">Please provide a title.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                required 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
              <Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
            </Form.Group>
            
            <Row>
              <Col xs={3}>
                <Form.Label>Category:</Form.Label>
                <Form.Select 
                  required 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                >
                  <option value="">Choose...</option>
                  <option value="1">Incident</option>
                  <option value="2">Problem</option>
                  <option value="3">Request</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
              </Col>

              <Col xs={3}>
                <Form.Label>Due to:</Form.Label>
                <Form.Control 
                  type="date" 
                  required 
                  value={deadline} 
                  onChange={(e) => setDeadline(e.target.value)} 
                />
                <Form.Control.Feedback type="invalid">Please provide a due date.</Form.Control.Feedback>
              </Col>
            
              <Col>
                <Form.Label>Attachments:</Form.Label>
                <Form.Control 
                  controlId="formFileDisabled"
                  type="file" 
                  multiple 
                  name="attachments" 
                  onChange={(e) => setAttachment(e.target.files)} 
                  disabled
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={new_ticket}>Send</Button>
        </Modal.Footer>
      </Modal>
      <Row className="mb-3 align-items-center">
        <Col xs={3} className="d-flex justify-content-end">
          <Button type="button" className="button-user" onClick={handleShow}>+ New Ticket</Button>
        </Col>
      </Row>
    </div>
  );
}