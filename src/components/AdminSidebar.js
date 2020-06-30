import React from "react";
import $ from "jquery";

//Redux
import { insertProjectAction, projectListAction } from "./Redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const data = useSelector(state => state);

  return (
    <div class="text-center" id="adminSidenav">
      <h2>Admin Page</h2>

      <p
        style={{
          color:
            data.DataReducer.adminCurrentPage === "ProjectListPage"
              ? "white"
              : "#818181"
        }}
        onClick={() => {
          dispatch(projectListAction());
        }}
      >
        LIST
      </p>
      <p
        style={{
          color:
            data.DataReducer.adminCurrentPage === "InsertProjectPage"
              ? "white"
              : "#818181"
        }}
        onClick={() => {
          dispatch(insertProjectAction());
        }}
      >
        ADD
      </p>
    </div>
  );
}
