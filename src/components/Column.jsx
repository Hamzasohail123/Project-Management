import React, { useState } from "react";
import TaskCard from "./TaskCard";
import Modal from "./ModalForm";

function Column({ title, tasks }) {
  let [isOpenModal, setIsOpenModal] = useState(false);
  let [editTask, setEditTask] = useState(null);

  const handleCardClick = (task, e) => {
    console.log("handle card click", e);
    setEditTask(e);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setEditTask(null);
  };

  const handleDelete = () => {
    console.log("object");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="mt-4">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            onClick={(e) => {
              handleCardClick(e, task);
            }}
          >
            <TaskCard title={task.taskTitle} description={task.taskDetail} />
          </div>
        ))}
      </div>
      <Modal
        closeModal={closeModal}
        isOpen={isOpenModal}
        taskToEdit={editTask}
        handleCardClick={handleCardClick}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Column;
