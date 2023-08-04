import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Board from "./Board";
import ProjectDetailKanbanBoard from "./KanbanBoard/ProjectDetailKanbanBoard";
import { ClipLoader } from "react-spinners";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //COLUMNS
  const columns = [
    {
      id: "0",
      title: "To Do",
      tasks: [],
    },
    {
      id: "1",
      title: "In Progress",
      tasks: [],
    },
    {
      id: "2",
      title: "Done",
      tasks: [],
    },
  ];

  //PROJECT DATA
  const project = {
    id: "1",
    name: "Project Stellar Launch",
    description:
      "Project Stellar Launch aims to promote and generate buzz for a new luxury skincare line targeting affluent millennials. The campaign will focus on highlighting the brand's innovative ingredients, sustainable packaging, and personalized skincare solutions.",
    responsibles: [
      {
        name: "Emily Thompson",
        avatarSrc: "/assets/managementPages/Emily.png",
      },
    ],
    assignees: [
      {
        name: "Bright Ideas Advertising Agency",
        avatarSrc: "/assets/managementPages/agency_icon.svg",
      },
    ],
    duedate: "2023-09-30",
    budget: 500000,
    priority: "High",
    status: "To-do",
    projectGoals: [
      "Increase brand awareness among the target audience by 30%.",
      "Generate a minimum of 10,000 social media engagements (likes, shares, comments).",
      "Secure media coverage in at least three high-profile beauty and lifestyle publications.",
    ],
  };

  useEffect(() => {
    // Get the token from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      Cookies.set("jwt_token", token, { expires: 1 });
      // Call the API to get user data
      axios
        .get("http://localhost:3000/api/v1/api/user", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false); // Set loading to false even if there's an error
        });
    }
  }, []);

  if (loading) {
    // Show the loading spinner while waiting for the API call to complete
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ClipLoader color="black" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div className="min-h-screen items-center justify-center bg-gray-100">
      <div className="container mx-auto py-8">
        {/* PROJECT KANBAN BOARD */}
        {user && (
          <p className="text-black text-2xl font-semibold">
            Welcome, {user.name} !
          </p>
        )}
        <ProjectDetailKanbanBoard columns={columns} projectId={project.id} />
      </div>
    </div>
  );
}

export default Dashboard;
