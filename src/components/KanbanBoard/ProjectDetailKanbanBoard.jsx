import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import ProjectDetailTasks from "./ProjectDetailTasks";

export default function ProjectDetailKanbanBoard({ columns, projectId }) {
  //SAVE A DEEP COPY OF COLUMNS PROP
  const [boardColumns, setBoardColumns] = useState(
    JSON.parse(JSON.stringify(columns))
  );

  //FUNCTION TO SYNC COLUMNS WITH DATABASE
  const syncColumnsWithDb = (projectId) => {
    //GET THE DEEP COPY OF COLUMNS PROP
    // const updatedBoardColumns = JSON.parse(JSON.stringify(columns));
    // console.log(updatedBoardColumns);

    //GET ALL TASKS OF THE PROJECT BY USING PROJECT ID
    // fetch(`/api/v1.project/getTasks/${projectId}`)
    //   .then(res => res.json())
    //   .then(tasks => {
    //     console.log(tasks);
    //     tasks.map((task: Task) => {
    //       updatedBoardColumns.find((column: Column) => column.id === task.taskColumn)?.tasks.push(task);
    //     });
    //     return updatedBoardColumns;
    //   })
    //   .then((boardColumns: Column[]) => setBoardColumns(boardColumns));

    //FAKE DATA
    setBoardColumns([
      {
        id: "0",
        title: "In Queue",
        tasks: [
          {
            id: "0",
            assigneeId: "2",
            title: "Research and Strategy",
            description:
              "Conduct market research on the target audience's skincare preferences, buying behavior. Longer text.",
            status: "Medium",
            taskColumn: "0",
            dueDate: new Date("09-29-2023"),
            projectId: "1",
            reporterId: "1",
          },
          {
            id: "3",
            assigneeId: "4",
            title: "Competitor Analysis",
            description:
              "Analyze competitor's marketing strategies and identify gaps.",
            status: "Low",
            taskColumn: "0",
            dueDate: new Date("09-30-2023"),
            projectId: "1",
            reporterId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "In Progress",
        tasks: [
          {
            id: "1",
            assigneeId: "3",
            title: "Creative Development",
            description:
              "Brainstorm and present multiple creative concepts for the campaign.",
            status: "Medium",
            taskColumn: "1",
            dueDate: new Date("09-29-2023"),
            projectId: "1",
            reporterId: "1",
          },
          {
            id: "4",
            assigneeId: "5",
            title: "Design Prototypes",
            description:
              "Create design prototypes for the selected creative concept.",
            status: "High",
            taskColumn: "1",
            dueDate: new Date("10-05-2023"),
            projectId: "1",
            reporterId: "1",
          },
        ],
      },
      {
        id: "2",
        title: "Escalated",
        tasks: [
          {
            id: "2",
            assigneeId: "6",
            title: "Resource Allocation",
            description:
              "Allocate necessary resources for the campaign implementation.",
            status: "High",
            taskColumn: "2",
            dueDate: new Date("09-30-2023"),
            projectId: "1",
            reporterId: "1",
          },
        ],
      },
      {
        id: "3",
        title: "Resolved",
        tasks: [
          {
            id: "5",
            assigneeId: "7",
            title: "Campaign Launch",
            description:
              "Launch the marketing campaign and monitor initial performance.",
            status: "High",
            taskColumn: "3",
            dueDate: new Date("10-10-2023"),
            projectId: "1",
            reporterId: "1",
          },
        ],
      },
    ]);
  };

  //USE USEEFFECT TO SYNC BOARD COLUMNS DATA TO THE DATABASE
  useEffect(() => {
    syncColumnsWithDb(projectId);
  }, []);

  //FUNCTION TO HANDLE UPDATING TASK ON DB WHEN TASK IS MOVED TO A NEW COLUMN
  const handleColumnChange = function (id, taskColumn) {
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ taskColumn }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
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
      // handleColumnChange(removedTasks.id, destination.droppableId);
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
            <ProjectDetailTasks key={col.id} column={col} />
          ))}
      </div>
    </DragDropContext>
  );
}
