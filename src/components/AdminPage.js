import React from "react";
import $ from "jquery";

//Components
import ProjectsListPage from "./ProjectsListPage";
import InsertProjectPage from "./InsertProjectPage";
import UpdateProjectPage from "./UpdateProjectPage";
import RemoveProjectPage from "./RemoveProjectPage";
import AdminSidebar from "./AdminSidebar";
import ProjectSidebar from "./ProjectSidebar";
import Header from "./Header";

//Redux
import { useSelector } from "react-redux";

export default function AdminPage() {
  const data = useSelector(state => state);

  return (
    <>
      <AdminSidebar />
      <div id="main">
        <Header />

        {data.DataReducer.adminCurrentPage === "ProjectListPage" && (
          <ProjectsListPage />
        )}
        {data.DataReducer.adminCurrentPage === "InsertProjectPage" && (
          <InsertProjectPage />
        )}
        {data.DataReducer.adminCurrentPage === "UpdateProjectPage" && (
          <UpdateProjectPage />
        )}
        {data.DataReducer.adminCurrentPage === "RemoveProjectPage" && (
          <RemoveProjectPage />
        )}
      </div>
      <ProjectSidebar />
    </>
  );
}
