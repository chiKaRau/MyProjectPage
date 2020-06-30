import React, { useState } from "react";
import $ from "jquery";
import axios from "axios";

//Components
import ProjectsList from "./ProjectsList";

//Redux
import { insertProjectAction, projectListAction } from "./Redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function RemoveProjectPage() {
  const [isCheck, setIsCheck] = useState(false);
  const [isError, setIsError] = useState(false);
  const data = useSelector(state => state);
  const dispatch = useDispatch();

  if (data.DataReducer.ProjectData === "") {
    return <ProjectsList />;
  }

  return (
    <div
      id="removeProjectPage"
      class="d-flex flex-row flex-wrap justify-content-center align-content-center border"
    >
      <div>
        <h5>
          Are you sure you want to delete the Project{" "}
          {data.DataReducer.ProjectData.title} ?{" "}
        </h5>
        <div>
          <small for="isCheck" tyle={{ color: "white" }}>
            Please Check the Box if you want to delete!
          </small>
          <span> </span>
          <input
            id="isCheck"
            type="checkBox"
            checked={isCheck}
            onChange={() => {
              setIsCheck(!isCheck);
            }}
          />
        </div>

        <div>
          <button
            class="btn btn-primary"
            onClick={() => {
              if (isCheck) {
                try {
                  fetchProjectInfo(data.DataReducer.ProjectData._id);
                  dispatch(projectListAction());
                } catch (e) {
                  setIsError(true);
                }
              }
            }}
          >
            Delete
          </button>
        </div>

        {isError && (
          <>
            <small class="form-text" style={{ color: "white" }}>
              Something wrong. Please try again!
            </small>
            <br />
          </>
        )}
      </div>
    </div>
  );
}

function fetchProjectInfo(_id) {
  let url =
    "https://MyProjectPage--chikarau.repl.co/api/project/projectInfoRemove";
  return axios
    .post(url, {
      _id: _id
    })
    .then(res => res.data);
}
