import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import API_URL from "../global";


const Home = ({ tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);

    // Fetch tasks from the server when the component mounts
    useEffect(() => {
      fetchTasks();
    });
  
    // Fetch tasks from the server
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/task/mytask`
        );
        setTasks(response.data.tasks); // Update tasks with fetched tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

  const deleteTask = async (id) => {
    await axios
      .delete(`${API_URL}/api/v1/task/delete/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => prevTasks.filter((tasks) => tasks._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col">
          <h1>{taskTitle}</h1>
          <p>Made by Gokul B</p>
        </div>
        <div className="col text-end">
          <Button variant="light" onClick={handleCreateModalShow}>
            Create Task
          </Button>
        </div>
      </div>
      <div className="row">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
              <Card style={{ marginBottom: "20px", minHeight: "400px" }}>
                <Card.Body className="d-flex justify-content-between flex-column ">
                  <Stack gap={2}>
                    <Card.Title className="mb-2" style={{ height: "50px" }}>
                      {task && task.title.length <= 40
                        ? task.title
                        : task.title.slice(0, 40) + "..."}
                    </Card.Title>
                    <Card.Text>
                      {task && task.description.length <= 300
                        ? task.description
                        : task.description.slice(0, 300) + "..."}
                    </Card.Text>
                  </Stack>
                  <Stack
                    direction="horizontal"
                    className="justify-content-end"
                    gap={2}
                  >
                     <FaEye
                      onClick={() => handleViewModalShow(task._id)}
                      className="fs-3 hover-effect"
                    />
                    <MdEdit
                      onClick={() => handleUpdateModalShow(task._id)}
                      className="fs-3 hover-effect"
                    />
                    <MdDelete
                      onClick={() => deleteTask(task._id)}
                      className="fs-3 hover-effect"
                    />
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h1>You dont have any tasks, <a href="#" onClick={handleCreateModalShow} >create one here</a></h1>
        )}
      </div>

      <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />

      <UpdateTaskModal
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        setTasks={setTasks}
      />

      <ViewTaskModal
        handleViewModalClose={handleViewModalClose}
        showViewModal={showViewModal}
        id={viewTaskId}
      />
    </div>
  );
};

export default Home;
