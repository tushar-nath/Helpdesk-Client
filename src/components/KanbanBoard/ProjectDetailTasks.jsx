import ProjectDetailTask from "./ProjectDetailTask";
// import Image from 'next/image';
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function ProjectDetailTasks({
  column,
  handleToggleCreateTaskModal,
  handleTaskClick,
}) {
  return (
    <div
      className={`p-[10px] border border-solid border-[#363636] rounded-[10px] flex flex-col flex-1 h-fit`}
    >
      {/* TASK TYPE */}
      {column && (
        <p className="text-base font-semibold ml-[14px] mt-[12px] mb-[30px]">
          {column.title} ({column.tasks.length})
        </p>
      )}
      <Droppable key={column.id} droppableId={column.id}>
        {(provided, _snapshot) => (
          <div
            className={`${
              column.tasks.length > 0 ? "h-full" : "max-h-[275px]"
            }`}
          >
            {/* TASK LIST */}
            <ul
              className="list-none mb-[10px]"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column && column.tasks.length > 0 ? (
                column.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, _snapshot) => (
                      <li
                        className="rounded-[5px] mt-[10px]"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleTaskClick(task)}
                      >
                        <ProjectDetailTask
                          key={index}
                          taskAssigneeId={task.assigneeId}
                          taskDescription={task.description}
                          taskDuedate={task.dueDate}
                          taskName={task.title}
                          taskStatus={task.status}
                        />
                      </li>
                    )}
                  </Draggable>
                ))
              ) : (
                // SHOW THIS TEXT WHEN THERE ARE NO TASKS
                <p className="text-center mt-[10px] mb-[36px] text-xs text-[#ABADAE] font-normal">
                  Create a new task or simply drag and drop to change the
                  subtask status.
                </p>
              )}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>

      {/* BUTTON TO ADD TASKS */}
      <button
        className={`w-full h-[45px] rounded-[5px] bg-[#141414] py-[13px] flex justify-center gap-3px`}
        onClick={handleToggleCreateTaskModal}
      >
        {/* <Image src={'/assets/managementPages/plus_icon.svg'} alt="plus_icon" priority={false} width={18} height={18} /> */}
        <span className="text-sm text-[#F4F4F4] font-normal"> Add a task</span>
      </button>
    </div>
  );
}
