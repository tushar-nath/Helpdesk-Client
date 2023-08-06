import { useState } from "react";
import Modal from "react-modal";

const CreateTask = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSave = () => {
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
        <label className="block font-medium">Status:</label>
        <input
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
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
