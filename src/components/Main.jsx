import React, { useState } from "react";
// import Sidebar from "./Sidebar";
import Column from "./Column";
import Modal from "./ModalForm";
import Button from "./Button";
import { useSelector } from "react-redux";

function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const taskss = useSelector((state) => state.tasks);
  console.log("these tasks are coming from redux store", taskss.tasks);

  const modalToggle = () => setIsOpen(!isOpen);
  // const closeModal = () => setIsOpen(!isOpen);



  const categorizedTasks = {
    todo: taskss.tasks.filter((task) => task.taskStatus === "todo"),
    inDev: taskss.tasks.filter((task) => task.taskStatus === "inDev"),
    inQa: taskss.tasks.filter((task) => task.taskStatus === "inQa"),
    done: taskss.tasks.filter((task) => task.taskStatus === "done"),
  };
  console.log(categorizedTasks.todo);

  return (
    <div className="flex w-full bg-gray-100">

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto border-2 bg-gray-50 p-6">
        <div className="flex  justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Track your projects, assign tasks, and monitor progress.
            </p>
          </div>

          {/* Button to Open Modal */}
          <Button onClick={modalToggle} text={"Create New Task"} />
        </div>

        {/* Kanban Columns (Todo, In Dev, In QA, Doneee) */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <Column title="Todo" tasks={categorizedTasks.todo} />
          <Column title="In Dev" tasks={categorizedTasks.inDev} />
          <Column title="In QA" tasks={categorizedTasks.inQa} />
          <Column title="Done" tasks={categorizedTasks.done} />
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isOpen} closeModal={modalToggle} />
    </div>
  );
}

export default Main;
