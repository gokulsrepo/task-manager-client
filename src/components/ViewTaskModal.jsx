import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import API_URL from "../global";
var date;
var status_cap;

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState([]);
  useEffect(() => {
    const getSingleTask = async () => {
      await axios
        .get(`${API_URL}/api/v1/task/single/${id}`)
        .then((res) => {
          setTask(res.data.task);
          var parts = res.data.task.dueDate.slice(0,10).split(/\D/);
          date = `${parts[2]}-${parts[1]}-${parts[0]}`;
          status_cap = res.data.task.status.replace(/^\w/, c => c.toUpperCase());
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);
  
  
  return (
    <>
      <Modal show={showViewModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <p className="fw-bold mb-0">Title</p>
            <p>{task && task.title}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Description</p>
            <p>{task && task.description}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Due Date</p>
            <p>{task && date}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Status</p>
            <p>{task && status_cap}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Note</p>
            <p>Kindly reload the page to see the changes, if you updated the task.</p>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewTaskModal;
