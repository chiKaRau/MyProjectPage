import React from "react";
import $ from "jquery";

//Redux
import { useSelector } from "react-redux";

//Components
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import LoginPanel from "./LoginPanel";

export default function Content() {
  const data = useSelector(state => state);

  return (
    <div class="App">
      {data.DataReducer.userRole === "user" && <UserPage />}
      {data.DataReducer.userRole === "admin" && <AdminPage />}
      <LoginPanel />
    </div>
  );
}

/*

Changing admin or user 
would change the #main margin left right

clicking projectBox would changing margin right

*/
