import React, { useState } from "react";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import { showToast } from "react-next-toast";

const base_url = process.env.REACT_APP_API_BASE_URL;

const EditTaskModal = ({ isOpen, onClose, selectedTask, onSave }) => {
  const [title, setTitle] = useState(selectedTask.title);
  const [description, setDescription] = useState(selectedTask.description);
  const [status, setStatus] = useState(selectedTask.status);
  const [dueDate, setDueDate] = useState(selectedTask.dueDate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ticketTypes = [
    "Grievance",
    "Reimbursement",
    "Asset Allocation",
    "Client Request",
    "Onboarding",
    "Change Request",
    "Marketing",
  ];

  const handleSave = () => {
    // Perform validation to check if all the required fields are filled
    if (!title || !description || !status || !dueDate) {
      setError("Please fill out all the necessary fields.");
      return;
    }

    setLoading(true);
    const updatedTask = {
      ...selectedTask,
      title,
      description,
      status,
      dueDate,
      ticketId: selectedTask.id,
    };

    // Make the API call to update the task
    fetch(`${base_url}/api/v1/tickets/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        showToast.success("Task updated successfully!");
        setLoading(false);
        onClose();
        onSave(data);
      })
      .catch((error) => {
        setError("An error occurred while updating the task.");
        setLoading(false);
        showToast.error("Couldn't update task. Please try again later!", 3000);
        console.error(error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Task Modal"
      className="w-96 mx-auto p-6 rounded-lg shadow-lg bg-white"
      overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block font-medium">Title:</label>
        <input
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Description:</label>
        <textarea
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Ticket Type:</label>
        <select
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Ticket Type</option>
          {ticketTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium">Due Date:</label>
        <input
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button
        className="rounded-[5px] bg-[#141414] text-white py-2 px-4 rounded-md mr-2"
        onClick={handleSave}
      >
        {loading ? (
          <div style={{ position: "relative", top: "3px" }}>
            <ClipLoader size={16} color={"#ffffff"} />
          </div>
        ) : (
          "Save"
        )}
      </button>
      <button
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
        onClick={onClose}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default EditTaskModal;
