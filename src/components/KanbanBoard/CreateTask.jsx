import { useState } from "react";
import Modal from "react-modal";
import { showToast } from "react-next-toast";
import { ClipLoader } from "react-spinners";

const base_url = process.env.REACT_APP_API_BASE_URL;

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
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    // Perform validation to check if all the required fields are filled
    if (!title || !description || !status || !dueDate) {
      setError("Please fill out all the necessary fields.");
      return;
    }

    setLoading(true);
    // Create a new task object with the data to be saved
    const newTask = {
      title,
      description,
      status,
      dueDate,
    };

    // Make the API call to save the new task
    fetch(`${base_url}/api/v1/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save the task.");
        }
        // Assuming the API responds with the saved task data, you can parse the response as JSON
        return response.json();
      })
      .then((savedTaskData) => {
        // Pass the saved task data to the onSave callback to handle it in the parent component if needed
        setLoading(false);
        onSave(savedTaskData);
        showToast.success("Created a task successfully!");
        onClose(); // Close the modal after saving
      })
      .catch((error) => {
        setError("An error occurred while saving the task.");
        setLoading(false);
        showToast.error(`Couldn't create task. Please try again later! `, 3000);
        console.error(error);
      });
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

export default CreateTask;
