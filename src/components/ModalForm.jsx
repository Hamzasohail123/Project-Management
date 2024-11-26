import { useDispatch } from "react-redux";
import { addTask, updateTask, deleteTask } from "../store/taskSlice";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modal({ isOpen, closeModal, taskToEdit }) {
  const dispatch = useDispatch();
  let [taskTitle, setTaskTitle] = useState("");
  let [taskDetail, setTaskDetail] = useState("");
  let [taskStatus, setTaskStatus] = useState("todo");

  const { isSignedIn } = useAuth();
  const nevigate = useNavigate();

  useEffect(() => {
    if (taskToEdit) {
      setTaskTitle(taskToEdit.taskTitle);
      setTaskDetail(taskToEdit.taskDetail);
      setTaskStatus(taskToEdit.taskStatus);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskDetail || !taskTitle) {
      return alert("require all fields to fill");
    }

    const task = {
      id: taskToEdit ? taskToEdit.id : null,
      taskTitle,
      taskDetail,
      taskStatus,
    };

    if (taskToEdit) {
      dispatch(updateTask(task));
      closeModal();
    } else {
      dispatch(addTask(task));
      closeModal();
    }
  };

  // const deleteMessage =()=> toast.success('Succesfully deleted')
  const handleDelete = (e) => {
    if (taskToEdit) {
      dispatch(deleteTask(taskToEdit.id));
      // deleteMessage()
      closeModal();
    } else {
      nevigate("/signin");
    }
  };

  return (
    <div>
      {/* <ToastContainer />  */}
      {/* Modal */}
      {isOpen ? (
        <div className="fixed transition ease-in-out delay-150 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 duration-300 opacity-100">
          <div className="bg-white p-8 rounded-lg w-1/3 max-w-xl shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                {taskToEdit ? "Update Task" : "Create New Task"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800"
              >
                <span className="text-3xl">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Status Dropdown */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Task Status
                  </label>
                  <select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    id="status"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="todo">Todo</option>
                    <option value="inDev">InDev</option>
                    <option value="inQa">InQA</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                {/* Task Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Task Title
                  </label>
                  <Input
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required="true"
                    type="text"
                    id="title"
                    placeholder="Enter task title"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                {/* Task Details */}
                <div>
                  <label
                    htmlFor="detail"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Task Details
                  </label>
                  <textarea
                    value={taskDetail}
                    onChange={(e) => setTaskDetail(e.target.value)}
                    required
                    id="detail"
                    placeholder="Enter task details"
                    className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    rows="4"
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                text={"Close"}
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all"
              />
              <Button
                type="submit"
                onClick={handleSubmit}
                text={taskToEdit ? "Update Task" : "Create new task"}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
              />

              {taskToEdit ? (
                <Button
                  text={taskToEdit ? "Delete Task" : null}
                  type="submit"
                  onClick={handleDelete}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
