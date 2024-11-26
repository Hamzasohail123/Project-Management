import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "./Input";

// StatusBadge Component
const StatusBadge = ({ status }) => {
  if (!status) {
    return (
      <span className="bg-gray-500 text-white py-1 px-2 rounded">Unknown</span>
    );
  }

  const statusColors = {
    todo: "bg-red-500",
    inDev: "bg-blue-500",
    inQa: "bg-orange-500",
    done: "bg-green-500",
  };

  const backgroundColor = statusColors[status] || "bg-gray-500";

  return (
    <span className={`${backgroundColor} text-white py-1 px-2 rounded`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

function TaskLists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const data = useSelector((state) => state.tasks);
  
  console.log("List from Redux:", data);

  // Filter tasks based on the search query and selected status
  const filteredTasks = data.tasks.filter((task) => {
    const matchesSearch =
      task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.taskDetail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus ? task.taskStatus === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  // Handle task click and open modal
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="p-6 w-full bg-gray-50">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Task List</h2>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search tasks..."
          className="h-10 px-4 w-72 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Select Filter */}
        <select
          className="h-10 px-4 w-40 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="todo">Todo</option>
          <option value="inDev">In Development</option>
          <option value="inQa">In QA</option>
          <option value="done">Done</option>
        </select>
      </div>

      <ul className="list-none p-0 m-0 border rounded-lg">
        <li className="flex bg-indigo-600 shadow-lg text-white p-4 font-semibold">
          <span className="w-1/3">Task Title</span>
          <span className="w-1/2">Task Detail</span>
          <span className="w-1/4">Task Status</span>
        </li>

        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <li
              key={task.id}
              onClick={() => handleTaskClick(task)} // Open modal on task click
              className="flex p-4 border-b border-gray-300 bg-gray-50 shadow-sm cursor-pointer"
            >
              <span className="w-1/3">{task.taskTitle}</span>
              <span className="w-1/2">{task.taskDetail}</span>
              <span className="w-1/4 ml-10">
                <StatusBadge status={task.taskStatus} />
              </span>
            </li>
          ))
        ) : (
          <li className="text-center p-4">No tasks available</li>
        )}
      </ul>

      {/* Pagination  */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-md disabled:bg-gray-300"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"} border`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Modal for Task Details */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 sm:w-1/2 md:w-1/3">
            <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Task Details</h3>
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                <strong className="font-semibold">Title:</strong> {selectedTask.taskTitle}
              </p>
              <p>
                <strong className="font-semibold">Detail:</strong> {selectedTask.taskDetail}
              </p>
              <p>
                <strong className="font-semibold">Status:</strong> <StatusBadge status={selectedTask.taskStatus} />
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-5 py-1 rounded-md font-semibold text-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskLists;
