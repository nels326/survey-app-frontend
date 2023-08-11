import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default function SurveyDetailsModal(props) {
  const { viewId, surveys, showSurveyDetailsModal, toggleSurveyDetailsModal } = props;
  const [currentSurvey, setCurrentSurvey] = useState(null)

  useEffect(() => {
    if (viewId) {
      let currentSurvey = surveys.find(obj => {
        return obj.id === viewId
      })

      setCurrentSurvey(currentSurvey)
    }
  }, [viewId])

  return (
    <Modal show={showSurveyDetailsModal} onHide={toggleSurveyDetailsModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Survey Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-bold">Name</h4>
        <span>{currentSurvey?.name}</span>

        <h4 className="mg-t-3 text-bold">Description</h4>
        <span>{currentSurvey?.description}</span>

        <h4 className="mg-t-3 text-bold">Created at</h4>
        <span>{currentSurvey?.created_at}</span>

        <h4 className="mg-t-3 text-bold">Last updated at</h4>
        <span>{currentSurvey?.updated_at}</span>

        <h4 className="mg-t-3 text-bold">Questions</h4>
        <Table className="mg-t-1" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Text</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {
              currentSurvey?.questions.map((question, index) => (
                <tr key={index}>
                  <td>{question.id}</td>
                  <td>{question.name}</td>
                  <td>{question.text}</td>
                  <td>{question.type}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleSurveyDetailsModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
