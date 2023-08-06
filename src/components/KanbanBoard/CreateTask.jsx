import { useState } from "react";
import Modal from "react-modal";

const CreateTask = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
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

    onSave({
      title,
      description,
      status,
      dueDate,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Create Task Modal"
      className="w-96 mx-auto p-6 rounded-lg shadow-lg bg-white"
      overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block font-medium">
          Title<span className="text-red-500">*</span>:
        </label>
        <input
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">
          Description<span className="text-red-500">*</span>:
        </label>
        <textarea
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">
          Ticket Type<span className="text-red-500">*</span>:
        </label>
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
        <label className="block font-medium">
          Due Date<span className="text-red-500">*</span>:
        </label>
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
        Save
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

export default CreateTask;
