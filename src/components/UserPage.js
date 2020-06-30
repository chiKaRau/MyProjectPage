import React from "react";
import ProjectsListPage from "./ProjectsListPage";
import ProjectSidebar from "./ProjectSidebar";
import Header from "./Header";
import $ from "jquery";

export default function AdminPage() {
  return (
    <>
      <div id="main">
        <Header />
        <ProjectsListPage />
      </div>
      <ProjectSidebar />
    </>
  );
}
