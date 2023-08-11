import React, { useEffect, useState } from 'react'
import AddQuestionModal from '../modals/AddQuestionModal';
import Header from '../header/Header'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import EditQuestionModal from '../modals/EditQuestionModal';

export default function Questions() {
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteIds, setDeleteIds] = useState([]);

  const toggleAddQuestionModal = () => setShowAddQuestionModal(!showAddQuestionModal)

  const toggleEditQuestionModal = () => {
    // Set editId to null when hiding modal
    if (showEditQuestionModal) {
      setEditId(null)
    }
    setShowEditQuestionModal(!showEditQuestionModal)
  }

  const editQuestion = (id) => {
    setEditId(id)
    toggleEditQuestionModal()
  }

  const getQuestions = async () => {
    const response = await axios.get('http://localhost:8000' + '/api/question/index', {
      headers: {
        Accept: 'application/json'
      }
    });

    setQuestions(response.data)
  }

  const handleDeleteInputs = (e) => {
    // Add/remove ids from array
    if (e.target.checked) {
      setDeleteIds([...deleteIds, e.target.value]);
    } else {
      var array = [...deleteIds];
      var index = array.indexOf(e.target.value);

      if (index !== -1) {
        array.splice(index, 1);
        setDeleteIds(array)
      }
    }
  }

  const deleteQuestions = async () => {

    const response = await axios.post('http://localhost:8000' + '/api/question/delete', { deleteIds: deleteIds }, {
      headers: {
        Accept: 'application/json'
      }
    }).catch(function (error) {
      console.log(error);
    });

    if (response?.status === 200) {
      getQuestions();
    }
  }

  useEffect(() => {
    getQuestions();
  }, [])

  return (
    <>
      <Header />

      <main id="main">
        <button className="float-right" onClick={toggleAddQuestionModal}>Add Question</button>
        <button className="float-right mg-r-1" onClick={deleteQuestions}>Delete Questions</button>
        <Table className="mg-t-3" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Text</th>
              <th>Type</th>
              <th className="text-center">Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              questions.map((question, key) => {
                return (
                  <tr key={key}>
                    <td>{question.id}</td>
                    <td>{question.name}</td>
                    <td>{question.text}</td>
                    <td>{question.type}</td>
                    <td className="text-center"><button onClick={() => editQuestion(question.id)}>Edit</button></td>
                    <td className="text-center"><input className="w-1-rem h-1-rem question-delete" type="checkbox" value={question.id} onChange={(e) => handleDeleteInputs(e)}></input></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </main>

      <AddQuestionModal
        showAddQuestionModal={showAddQuestionModal}
        toggleAddQuestionModal={toggleAddQuestionModal}
        getQuestions={getQuestions}
      />

      <EditQuestionModal
        showEditQuestionModal={showEditQuestionModal}
        toggleEditQuestionModal={toggleEditQuestionModal}
        questions={questions}
        getQuestions={getQuestions}
        editId={editId}
      />

    </>
  )
}
