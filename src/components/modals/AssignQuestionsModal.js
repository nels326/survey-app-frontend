import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function AssignQuestionsModal(props) {
  const { showAssignQuestionsModal, toggleAssignQuestionsModal, surveys, questions, getSurveys } = props;
  const [surveyIds, setSurveyIds] = useState([])
  const [questionIds, setQuestionIds] = useState([])

  const assignQuestions = async (e) => {
    e.preventDefault()

    let ids = {
      surveyIds: surveyIds,
      questionIds: questionIds
    }

    const response = await axios.post('http://localhost:8000' + '/api/survey_question', ids, {
      headers: {
        Accept: 'application/json'
      }
    }).catch(function (error) {
      console.log(error);
    });

    if (response?.status === 200) {
      getSurveys();
      toggleAssignQuestionsModal();
    }
  }

  const handleSurveySelect = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setSurveyIds(value)
  }

  const handleQuestionSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setQuestionIds(value)
  }

  return (
    <Modal show={showAssignQuestionsModal} onHide={toggleAssignQuestionsModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Assign questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group row m-t-30">
          <div className="col-sm-6 text-center">
            <label className="text-bold">Surveys</label>
            <select className="form-select height-25-rem mg-t-1" multiple onChange={(e) => handleSurveySelect(e)}>
              {
                surveys.map((survey, index) => (
                  <option key={index} value={survey.id}>{survey.name}</option>
                ))
              }
            </select>
          </div>
          <div className="col-sm-6 text-center">
            <label className="text-bold">Questions</label>
            <select className="form-select height-25-rem mg-t-1" multiple onChange={(e) => handleQuestionSelect(e)}>
              {
                questions.map((question, index) => (
                  <option key={index} value={question.id}>{question.name}</option>
                ))
              }
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleAssignQuestionsModal}>
          Close
        </Button>
        <Button variant="primary" onClick={assignQuestions}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
