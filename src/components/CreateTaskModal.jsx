import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import API_URL from "../global";

const CreateTaskModal = ({
  showCreateModal,
  handleCreateModalClose,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreateTask = async () => {
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      toast.error("Please fill out all fields.");
      return;
    }
    
    await axios
      .post(
        `${API_URL}/api/v1/task/post`,
        { title, description, dueDate },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => [...prevTasks, res.data.task]);
        setTitle("");
        setDescription("");
        handleCreateModalClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={3}>
            <label>Description</label>
            <textarea
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={3}>
            <label>Due Date</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateModalClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleCreateTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
