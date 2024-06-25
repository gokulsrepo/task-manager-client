import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import API_URL from "../global";

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id, }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formattedDueDate ,setFormattedDueDate] = useState("");
  const [formattedStatus ,setFormattedStatus] = useState("");

  useEffect(() => {
    const getSingleTask = async () => {
      await axios
        .get(`${API_URL}/api/v1/task/single/${id}`)
        .then((res) => {
          const parts = res.data.task.dueDate.slice(0, 10).split(/\D/);
          const date = `${parts[2]}-${parts[1]}-${parts[0]}`;
          const statusCapitalize = res.data.task.status.replace(/^\w/, c => c.toUpperCase());
          setTitle(res.data.task.title);
          setDescription(res.data.task.description);
          setFormattedDueDate(date);
          setFormattedStatus(statusCapitalize)
        })
        .catch((error) => {
          console.log(error);
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
            <p>{title}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Description</p>
            <p>{description}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Due Date</p>
            <p>{formattedDueDate}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Status</p>
            <p>{formattedStatus}</p>
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
