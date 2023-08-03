import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Board = () => {
  const [tasks, setTasks] = useState({
    todo: [
      { id: "task-1", content: "Task 1" },
      { id: "task-2", content: "Task 2" },
    ],
    inProgress: [
      { id: "task-3", content: "Task 3" },
      { id: "task-4", content: "Task 4" },
    ],
    done: [{ id: "task-5", content: "Task 5" }],
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reorder tasks within the same column
      const columnTasks = Array.from(tasks[source.droppableId]);
      const [reorderedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, reorderedTask);

      setTasks({ ...tasks, [source.droppableId]: columnTasks });
    } else {
      // Move task to another column
      const sourceTasks = Array.from(tasks[source.droppableId]);
      const destinationTasks = Array.from(tasks[destination.droppableId]);

      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      });
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Tasks</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex">
          {/* To Do Column */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">To Do</h2>
            <Droppable droppableId="todo" key="todo">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-200 p-2 rounded"
                >
                  {tasks.todo.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="bg-white p-2 mb-2 rounded shadow"
                        >
                          {task.content}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>

          {/* In Progress Column */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">In Progress</h2>
            <Droppable droppableId="inProgress" key="inProgress">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-200 p-2 rounded"
                >
                  {tasks.inProgress.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="bg-white p-2 mb-2 rounded shadow"
                        >
                          {task.content}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>

          {/* Done Column */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Done</h2>
            <Droppable droppableId="done" key="done">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-200 p-2 rounded"
                >
                  {tasks.done.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="bg-white p-2 mb-2 rounded shadow"
                        >
                          {task.content}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
