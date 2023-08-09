import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import ProjectDetailTasks from "./ProjectDetailTasks";
import CreateTask from "./CreateTask";
import EditTaskModal from "./EditTaskModal";

const base_url = process.env.REACT_APP_API_BASE_URL;

export default function ProjectDetailKanbanBoard({ columns, projectId }) {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowEditTaskModal(true);
  };

  const handleToggleCreateTaskModal = () => {
    setShowCreateTaskModal((prev) => !prev);
  };

  const handleSaveNewTask = (newTask) => {
    newTask.savedTicket.id = newTask.savedTicket._id;
    // Add the new task to the "In Queue" column
    const updatedBoardColumns = boardColumns.map((col) =>
      col.id === "0"
        ? { ...col, tasks: [...col.tasks, newTask.savedTicket] }
        : col
    );

    setBoardColumns(updatedBoardColumns);
  };
  //SAVE A DEEP COPY OF COLUMNS PROP
  const [boardColumns, setBoardColumns] = useState(
    JSON.parse(JSON.stringify(columns))
  );

  // FUNCTION TO UPDATE EXISTING TASK
  const handleUpdateTask = (updatedTask) => {
    // Find the column and task index using the original task ID
    const columnIndex = boardColumns.findIndex((col) =>
      col.tasks.some((task) => task.id === updatedTask.savedTicket._id)
    );

    if (columnIndex !== -1) {
      const taskIndex = boardColumns[columnIndex].tasks.findIndex(
        (task) => task.id === updatedTask.savedTicket._id
      );

      if (taskIndex !== -1) {
        // Update the task properties
        const updatedColumns = boardColumns.map((col, index) =>
          index === columnIndex
            ? {
                ...col,
                tasks: col.tasks.map((task) =>
                  task.id === updatedTask.savedTicket._id
                    ? { ...task, ...updatedTask.savedTicket }
                    : task
                ),
              }
            : col
        );

        setBoardColumns(updatedColumns);
      }
    }
  };

  //FUNCTION TO SYNC COLUMNS WITH DATABASE
  const syncColumnsWithDb = (projectId) => {
    //GET THE DEEP COPY OF COLUMNS PROP
    const updatedBoardColumns = JSON.parse(JSON.stringify(columns));

    // Fetch the data from the API using the project ID
    fetch(`${base_url}/api/v1/tickets`)
      .then((response) => response.json())
      .then((data) => {
        // Update the _id property to id for each task in the columns array
        const updatedColumns = data.columns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) => ({ ...task, id: task._id })),
        }));

        // Update the boardColumns state with the modified data
        setBoardColumns(updatedColumns);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //USE USEEFFECT TO SYNC BOARD COLUMNS DATA TO THE DATABASE
  useEffect(() => {
    syncColumnsWithDb();
  }, []);

  //FUNCTION TO HANDLE UPDATING TASK ON DB WHEN TASK IS MOVED TO A NEW COLUMN
  const handleColumnChange = function (id, taskColumn) {
    fetch(`${base_url}/api/v1/tickets/update`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ticketId: id, taskColumn }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.error(e));
  };

  //FUNCTION TO MANAGE UI CHANGES WHEN DRAGGING TASKS
  const onDragEnd = (result) => {
    const { destination, source } = result;
    console.log(destination, "DES");
    console.log(source, "source");

    //IF THERE IS NO DESTINATION, RETURN
    if (!destination) {
      return;
    }

    //IF THE MOVED TASK IS DRAGGED FROM AND DROP TO THE SAME PLACE IN THE SAME COLUMN, RETURN
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //FIND SOURCE COLUMN
    const sourceColumn = boardColumns.find(
      (column) => column.id === source.droppableId
    );

    //FIND DES COLUMN
    const destColumn = boardColumns.find(
      (column) => column.id === destination.droppableId
    );

    // IF SOURCE COLUMN OR DES COLUMN IS UNDEFINED, RETURN
    if (!sourceColumn || !destColumn) {
      return;
    }

    //GET TASKS OF SOURCE COLUMN
    const sourceTasks = [...sourceColumn.tasks];

    //GET TASKS OF DES COLUMN
    const desTasks = [...destColumn.tasks];

    //SPLICE OUT THE MOVED TASKS FROM THE SOURCE TASKS
    const [removedTasks] = sourceTasks.splice(source.index, 1);

    //IF MOVING WITHIN A COLUMN AND DROP THE MOVED TASK TO A NEW POSITION,ADD THE MOVED TASK BACK INTO THE SOURCE TASKS AT A NEW POSITION
    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, removedTasks);
    } else {
      //IF MOVING AMONG DIFFERENT COLUMNS, ADD THE MOVED TASK TO THE DESTINATION TASKS
      desTasks.splice(destination.index, 0, removedTasks);
      //UPDATE THE COLUMN ON DB
      handleColumnChange(removedTasks.id, destination.droppableId);
    }

    //SET THE NEW VALUE FOR THE BOARD COLUMNS STATE
    setBoardColumns(
      boardColumns.map((column) => {
        //UPDATE THE SOURCE TASKS TO THE CURRENT BOARD COLUMNS
        if (column.id === source.droppableId) {
          return { ...column, tasks: sourceTasks };
        }

        //UPDATE THE DES TASKS TO THE CURRENT BOARD COLUMNS
        if (column.id === destination.droppableId) {
          return { ...column, tasks: desTasks };
        }
        return column;
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="my-12 flex justify-between gap-[10px]">
        {/* TASK COLUMNS */}
        {boardColumns &&
          boardColumns.length &&
          boardColumns.map((col) => (
            <ProjectDetailTasks
              key={col.id}
              column={col}
              handleToggleCreateTaskModal={handleToggleCreateTaskModal}
              handleTaskClick={handleTaskClick}
            />
          ))}
      </div>
      {/* Render the CreateTask modal */}
      {showCreateTaskModal && (
        <CreateTask
          onClose={handleToggleCreateTaskModal}
          onSave={handleSaveNewTask}
        />
      )}
      {showEditTaskModal && (
        <EditTaskModal
          isOpen={showEditTaskModal}
          onClose={() => setShowEditTaskModal(false)}
          selectedTask={selectedTask}
          onSave={handleUpdateTask}
        />
      )}
    </DragDropContext>
  );
}
