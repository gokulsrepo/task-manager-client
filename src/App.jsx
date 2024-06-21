import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle] = useState("Task Manager");

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                tasks={tasks}
                setTasks={setTasks}
                taskTitle={taskTitle}
              />
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
