import React, { useState } from "react";
import $ from "jquery";

//Axios
import axios from "axios";

//Redux
import { loginasAdminAction } from "./Redux";
import { useDispatch } from "react-redux";

export default function LoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  async function handleLoginSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    if (username === "" || password === "") {
      setIsError(true);
    }

    try {
      await fetchProjectAccountInfo(username, password);
      dispatch(loginasAdminAction());
      openAdminSidebar();
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log(e);
      setIsError(true);
    }

    setIsLoading(false);
  }

  return (
    <div id="loginPanel">
      <div class="loginPanel-content">
        <div class="loginPanel-header">
          <span onClick={closeLoginPanel} class="closebtn">
            &times;
          </span>
          <h2 class="p-3">Login as Administrator</h2>
        </div>
        <div class="loginPanel-body border">
          {isError && (
            <small class="form-text text-muted">
              Incorrect username or passworld
            </small>
          )}
          <div class="row">
            <div class="col-sm-10 offset-sm-2">
              <form onSubmit={handleLoginSubmit}>
                <div class="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    onChange={event => setUsername(event.target.value)}
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                    class="form-control"
                  />
                </div>
                <div class="p-2">
                  <input
                    type="submit"
                    disabled={isLoading}
                    class="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function fetchProjectAccountInfo(username, password) {
  let url =
    "https://MyProjectPage--chikarau.repl.co/api/project/projectAccountInfoQuery";
  return axios
    .post(url, {
      username: username.toLowerCase(),
      password: password
    })
    .then(res => res.data);
}

function closeLoginPanel() {
  $(document).ready(function() {
    $("#loginPanel").css({ display: "none" });
  });
}

function openAdminSidebar() {
  $(document).ready(function() {
    //Large Devices
    if (window.innerWidth > 414) {
      $("#adminSidenav").css({ width: "160px" });
      $("#main").css({ "margin-left": "160px" });
      closeLoginPanel();
    }
  });
}
