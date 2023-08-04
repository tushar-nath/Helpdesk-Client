import PriorityTag from "./PriorityTag";
import { useState } from "react";

export default function ProjectDetailTask({
  taskAssigneeId,
  taskName,
  taskStatus,
  taskDuedate,
  taskDescription,
}) {
  const assigneeData = {
    name: "Jennifer Evans",
  };

  //STATE FOR THE TEXT ELLIPSIS
  const [haveEllipsis, setHaveEllipsis] = useState(true);

  return (
    <div className=" text-black font-normal text-sm bg-white border border-1 px-[15px] py-[20px] rounded-[5px]">
      {/* TASK NAME */}
      <p className="text-black text-xl mb-[13px]">{taskName}</p>

      {/* DESCRIPTION */}
      <p
        onClick={() => {
          setHaveEllipsis(!haveEllipsis);
        }}
        className={`mb-[17px] min-h-[60px]`}
      >
        {haveEllipsis && taskDescription.length > 90
          ? taskDescription.slice(0, 86) + "..."
          : taskDescription}
      </p>

      {/* PRIORITY */}
      <PriorityTag priority={taskStatus} />

      {/* AVATAR AND NAME */}
      <div className="my-[12px] flex font-normal text-sm gap-[14px] items-center">
        {/* <Avatar avatarSrc={assigneeData.avatarSrc} /> */}
        <p className="">{assigneeData.name}</p>
      </div>

      {/* TASK DUE DATE */}
      {taskDuedate && (
        <p className="font-normal text-sm">
          {new Date(taskDuedate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
