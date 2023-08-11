import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function AddSurveyModal(props) {
  const { showAddSurveyModal, toggleAddSurveyModal, getSurveys, questions } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [questionIds, setQuestionIds] = useState([]);

  const saveSurvey = async (e) => {
    e.preventDefault()

    let survey = {
      name: name,
      description: description,
      questionIds: questionIds
    }

    const response = await axios.post('http://localhost:8000' + '/api/survey', survey, {
      headers: {
        Accept: 'application/json'
      }
    }).catch(function (error) {
      console.log(error);
    });

    if (response.status === 200) {
      getSurveys();
      toggleAddSurveyModal();
      resetFormStates();

      // Add confirmation toast
    } else {
      // Add error toast
    }
  }

  const resetFormStates = () => {
    setName('');
    setDescription('');
  }

  const handleQuestionSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setQuestionIds(value)
  }

  return (
    <Modal show={showAddSurveyModal} onHide={toggleAddSurveyModal}>
      <Modal.Header closeButton>
        <Modal.Title>New Survey</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group row m-t-30">
          <div className="col-sm-6">
            <label>Name</label>
            <input className="form-control" type="text" id="input-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-sm-6">
            <label>Description</label>
            <input className="form-control" type="text" id="input-description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Questions</label>
            <select className="form-select" value={questionIds} multiple onChange={(e) => handleQuestionSelect(e)}>
              {
                questions.map((question, index) => (
                  <option key={index} value={question.id} /*selected={questionIds?.includes(question.id)}*/>{question.name}</option>
                ))
              }
            </select>
          </div>
          <div className="col-sm-6">
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleAddSurveyModal}>
          Close
        </Button>
        <Button variant="primary" onClick={saveSurvey}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
