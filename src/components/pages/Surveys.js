import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import Table from 'react-bootstrap/Table';
import AddSurveyModal from '../modals/AddSurveyModal';
import axios from 'axios';
import SurveyDetailsModal from '../modals/SurveyDetailsModal';
import EditSurveyModal from '../modals/EditSurveyModal';
import AssignQuestionsModal from '../modals/AssignQuestionsModal';

export default function Surveys() {
  const [showAddSurveyModal, setShowAddSurveyModal] = useState(false);
  const [showEditSurveyModal, setShowEditSurveyModal] = useState(false);
  const [showSurveyDetailsModal, setShowSurveyDetailsModal] = useState(false);
  const [showAssignQuestionsModal, setShowAssignQuestionsModal] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [viewId, setViewId] = useState(null)
  const [editId, setEditId] = useState(null)
  const [questions, setQuestions] = useState([]);

  const toggleAddSurveyModal = () => {
    setShowAddSurveyModal(!showAddSurveyModal)
  }

  const toggleEditSurveyModal = () => {

    // Set editId to null when hiding modal
    if (showEditSurveyModal) {
      setEditId(null)
    }

    setShowEditSurveyModal(!showEditSurveyModal)
  }

  const toggleSurveyDetailsModal = () => {
    setShowSurveyDetailsModal(!showSurveyDetailsModal)
  }

  const toggleAssignQuestionsModal = () => setShowAssignQuestionsModal(!showAssignQuestionsModal)

  const viewSurvey = (id) => {
    setViewId(id)
    toggleSurveyDetailsModal()
  }

  const editSurvey = (id) => {
    setEditId(id)
    toggleEditSurveyModal()
  }

  useEffect(() => {
    if (!showSurveyDetailsModal) {
      setViewId(null)
    }
  }, [showSurveyDetailsModal])

  const getSurveys = async () => {
    const response = await axios.get('http://localhost:8000' + '/api/survey/index', {
      headers: {
        Accept: 'application/json'
      }
    });

    setSurveys(response.data)
  }

  const getQuestions = async () => {
    const response = await axios.get('http://localhost:8000' + '/api/question/index', {
      headers: {
        Accept: 'application/json'
      }
    });

    setQuestions(response.data)
  }

  useEffect(() => {
    getSurveys();
    getQuestions();
  }, [])

  return (
    <>
      <Header />

      <main id="main">
        <button className="float-right" onClick={toggleAddSurveyModal}>Add Survey</button>
        <button className="float-right mg-r-1" onClick={toggleAssignQuestionsModal}>Assign Questions</button>
        <Table className="mg-t-3" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th className="text-center">View</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              surveys.map((survey, key) => {
                return (
                  <tr key={key}>
                    <td>{survey.id}</td>
                    <td>{survey.name}</td>
                    <td>{survey.description}</td>
                    <td className="text-center"><button onClick={() => viewSurvey(survey.id)}>View</button></td>
                    <td className="text-center"><button onClick={() => editSurvey(survey.id)}>Edit</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </main>

      <AddSurveyModal
        showAddSurveyModal={showAddSurveyModal}
        toggleAddSurveyModal={toggleAddSurveyModal}
        getSurveys={getSurveys}
        questions={questions}
      />

      <SurveyDetailsModal
        surveys={surveys}
        viewId={viewId}
        showSurveyDetailsModal={showSurveyDetailsModal}
        toggleSurveyDetailsModal={toggleSurveyDetailsModal}
      />

      <EditSurveyModal
        surveys={surveys}
        getSurveys={getSurveys}
        questions={questions}
        editId={editId}
        showEditSurveyModal={showEditSurveyModal}
        toggleEditSurveyModal={toggleEditSurveyModal}
      />

      <AssignQuestionsModal
        showAssignQuestionsModal={showAssignQuestionsModal}
        toggleAssignQuestionsModal={toggleAssignQuestionsModal}
        surveys={surveys}
        getSurveys={getSurveys}
        questions={questions}
      />

    </>
  )
}
