// Popup.js
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Col from 'react-bootstrap/Col';

function Popup({ show, onClose, message }) {
  return (
    <Col md={6} className="mb-2">
      <Toast show={show} onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </Col>
  );
}

export default Popup;