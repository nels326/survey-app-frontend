import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function AddQuestionModal(props) {
  const { showAddQuestionModal, toggleAddQuestionModal, getQuestions } = props;
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [type, setType] = useState('rating');

  const saveQuestion = async (e) => {
    e.preventDefault()

    let question = {
      name: name,
      text: text,
      type: type
    }

    const response = await axios.post('http://localhost:8000' + '/api/question', question, {
      headers: {
        Accept: 'application/json'
      }
    })

    if (response.status === 200) {
      getQuestions();
      toggleAddQuestionModal();
      resetFormStates();

      // Add confirmation toast message
    } else {
      // Add error toast message
    }
  }

  const resetFormStates = () => {
    setName('');
    setText('');
    setType('rating');
  }

  return (
    <Modal show={showAddQuestionModal} onHide={toggleAddQuestionModal}>
      <Modal.Header closeButton>
        <Modal.Title>New Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group row m-t-30">
          <div className="col-sm-6">
            <label>Name</label>
            <input className="form-control" type="text" id="input-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-sm-6">
            <label>Text</label>
            <input className="form-control" type="text" id="input-text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
        </div>
        <div className="form-group row m-t-30">
          <div className="col-sm-6">
            <label>Type</label>
            <select className="form-control" onChange={(e) => setType(e.target.value)}>
              <option value="rating">Rating</option>
              <option value="comment_only">Comment Only</option>
              <option value="multiple_choice">Multiple Choice</option>
            </select>
          </div>
          <div className="col-sm-6"></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleAddQuestionModal}>
          Close
        </Button>
        <Button variant="primary" onClick={saveQuestion}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
