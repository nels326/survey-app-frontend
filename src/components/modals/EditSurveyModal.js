import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function EditSurveyModal(props) {
  const { surveys, getSurveys, editId, showEditSurveyModal, toggleEditSurveyModal, questions } = props;
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [questionIds, setQuestionIds] = useState([])

  const saveSurvey = async (e) => {
    e.preventDefault()

    let survey = {
      id: id,
      name: name,
      description: description,
      questionIds: questionIds
    }

    const response = await axios.patch('http://localhost:8000' + '/api/survey/update/' + id, survey, {
      headers: {
        Accept: 'application/json'
      }
    }).catch(function (error) {
      console.log(error);
    });

    if (response?.status === 200) {
      getSurveys();
      toggleEditSurveyModal();
    }
  }

  const handleQuestionSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setQuestionIds(value)
  }

  useEffect(() => {
    if (editId) {
      let currentSurvey = surveys.find(obj => {
        return obj.id === editId
      })

      // Get array of current question id's
      let ids = currentSurvey.questions.map(question => question.id);

      setId(currentSurvey.id)
      setName(currentSurvey.name)
      setDescription(currentSurvey.description)      
      setQuestionIds(ids)
    }
  }, [editId])

  return (
    <Modal show={showEditSurveyModal} onHide={toggleEditSurveyModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Survey</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Name</label>
            <input className="form-control" type="text" id="input-name" value={name || ''} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-sm-6">
            <label>Description</label>
            <input className="form-control" type="text" id="input-description" value={description || ''} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <label>Questions</label>
            <select className="form-select height-10-rem" multiple value={questionIds || ''} onChange={(e) => handleQuestionSelect(e)}>
              {
                questions.map((question, index) => (
                  <option key={index} value={question.id}>{question.name}</option>
                ))
              }
            </select>
          </div>
          <div className="col-sm-6">
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleEditSurveyModal}>
          Close
        </Button>
        <Button variant="primary" onClick={saveSurvey}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
