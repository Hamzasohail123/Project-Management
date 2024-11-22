import React from "react";

function TaskCard({ title, description, onClick }) {
  return (
    <div
      // onClick={onClick}
      className="bg-gray-50 p-3 rounded-md shadow-sm mb-4 cursor-pointer"
    >
      <h3 className="text-md font-medium text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default TaskCard;
