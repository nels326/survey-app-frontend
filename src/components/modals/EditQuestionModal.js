import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function EditQuestionModal(props) {
  const { questions, getQuestions, editId, showEditQuestionModal, toggleEditQuestionModal } = props;
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [type, setType] = useState('')

  const saveQuestion = async (e) => {
    e.preventDefault()

    let question = {
      id: id,
      name: name,
      text: text,
      type: type
    }

    const response = await axios.patch('http://localhost:8000' + '/api/question/update/' + id, question, {
      headers: {
        Accept: 'application/json'
      }
    }).catch(function (error) {
      console.log(error);
    });

    if (response?.status === 200) {
      getQuestions();
      toggleEditQuestionModal();
    }
  }

  useEffect(() => {
    if (editId) {
      let currentQuestion = questions.find(obj => {
        return obj.id === editId
      })

      setId(currentQuestion.id)
      setName(currentQuestion.name)
      setText(currentQuestion.text)
      setType(currentQuestion.type)
    }
  }, [editId])

  return (
    <Modal show={showEditQuestionModal} onHide={toggleEditQuestionModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group row">
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
            <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="rating">Rating</option>
              <option value="comment_only">Comment Only</option>
              <option value="multiple_choice">Multiple Choice</option>
            </select>
          </div>
          <div className="col-sm-6"></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleEditQuestionModal}>
          Close
        </Button>
        <Button variant="primary" onClick={saveQuestion}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
