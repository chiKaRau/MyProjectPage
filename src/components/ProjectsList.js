import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";

//Component
import SearchProjectScreen from "./SearchProjectScreen";
import ShowAllProjectsScreen from "./ShowAllProjectsScreen";
import ErrorMessage from "./ErrorMessage";

//Redux
import {
  addProjectDataAction,
  updateProjectAction,
  removeProjectAction
} from "./Redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ProjectsList() {
  const [projectAry, setProjectAry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [queryMode, setQueryMode] = useState("updateProject");
  const data = useSelector(state => state);
  const dispatch = useDispatch();

  const updateProjectByKeyword = async (event, keyword) => {
    try {
      event.preventDefault();

      if (keyword === "") {
        return;
      }

      setQueryMode("updateProjectByKeyword");
      setIsError(false);
      setIsLoading(true);
      let newAry = await fetchProjectByKeyword(keyword);
      setProjectAry(() => newAry.result);
      fadeInBoxes();
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
      console.log(e);
    }
  };

  const updateProjectAll = async option => {
    try {
      setQueryMode("updateProjectAll");
      setIsError(false);
      setIsLoading(true);
      let newAry = await fetchProjectInfoAll(option);
      setProjectAry(() => newAry.result);
      fadeInBoxes();
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
      console.log(e);
    }
  };

  //skip - skip from which boxes
  //limit - limit the quanlity of fetching
  const updateProject = async (skip, limit) => {
    try {
      if (queryMode === "updateProjectByKeyword") {
        return;
      }
      setQueryMode("updateProject");
      setIsError(false);
      setIsLoading(true);
      let newAry = await fetchProjectInfo(skip, limit);
      setProjectAry(() => [...projectAry, ...newAry.result]);
      fadeInBoxes();
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
      console.log(e);
    }
  };

  //ComponentDidmount
  useEffect(() => {
    updateProject(0, getInitialProjectBoxLength(window.innerWidth) + 1);
  }, []);

  //ComponentDidUpdate for Scroll
  useEffect(() => {
    const handleScroll = () => {
      //const currentScrollY = window.scrollY;
      //console.log(currentScrollY);
      try {
        const wrappedElement = document.getElementById("projectsList");
        if (
          wrappedElement.getBoundingClientRect().bottom <= window.innerHeight
        ) {
          updateProject(projectAry.length, 6);
        }
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
        console.log(e);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [projectAry]);

  let displayProjects = projectAry.map((e, index) => {
    return (
      <div
        key={index++}
        class={`m-3 ${
          data.DataReducer.userRole === "admin"
            ? "p-5 border border-light rounded"
            : "p-3"
        }`}
      >
        {data.DataReducer.userRole === "admin" && (
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-info mr-auto"
              onClick={() => {
                dispatch(addProjectDataAction({ data: e }));
                dispatch(updateProjectAction());
              }}
            >
              Edit
            </button>
            <button
              class="btn btn-danger"
              onClick={() => {
                dispatch(addProjectDataAction({ data: e }));
                dispatch(removeProjectAction());
              }}
            >
              Remove
            </button>
          </div>
        )}
        <div
          onClick={() => {
            dispatch(addProjectDataAction({ data: e }));
            openProjectSidebar();
          }}
          class="projectBox m-3"
        >
          <h5 class="text-center">{e.title}</h5>
          <div class="border rounded">
            <img src={e.imageUrl} alt={e.title} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div class="container-fluid" id="projectsList">
      {/**My Project */}
      <div class="d-flex flex-row flex-wrap justify-content-center p-3">
        <h2>My Project</h2>
      </div>
      {/**Error Messages and DisplayList*/}
      {!isError ? (
        <div class="d-flex flex-row flex-wrap justify-content-center">
          {displayProjects}
        </div>
      ) : (
        <ErrorMessage />
      )}

      {/**Loading Spinner */}
      {isLoading && (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/**Pop Up Screens */}
      <ShowAllProjectsScreen updateProjectAll={updateProjectAll} />
      <SearchProjectScreen updateProjectByKeyword={updateProjectByKeyword} />
    </div>
  );
}

function fadeInBoxes() {
  let offset = 0;
  $(".projectBox").each(function(i, obj) {
    setTimeout(function() {
      $(obj).css({ opacity: 1 });
    }, 50 + offset);
    offset += 50;
  });
}

function fetchProjectInfo(skip = 0, limit) {
  let url =
    "https://MyProjectPage--chikarau.repl.co/api/project/projectInfoQuery";
  return axios
    .post(url, {
      skip: skip,
      limit: limit
    })
    .then(res => res.data);
}

function getInitialProjectBoxLength(width) {
  //Large Devices
  if (width < 450) {
    return 3;
  } else if (width > 450 && width < 891) {
    return 6;
  } else if (width > 450 && width < 891) {
    return 9;
  } else if (width > 891 && width < 1158) {
    return 12;
  } else if (width > 1158 && width < 1441) {
    return 15;
  } else {
    return 18;
  }
}

function openProjectSidebar() {
  $(document).ready(function() {
    //Large Devices
    if (window.innerWidth <= 414) {
      $("#projectSidenav").css({ width: "100%" });
    } else {
      $("#projectSidenav").css({ width: "50%" });
    }
  });
}

function fetchProjectInfoAll(option) {
  let url =
    "https://MyProjectPage--chikarau.repl.co/api/project/projectInfoQueryAll";
  return axios.post(url, { option: option }).then(res => res.data);
}

function fetchProjectByKeyword(keyword) {
  let url =
    "https://MyProjectPage--chikarau.repl.co/api/project/projectInfoQueryByKeyword";
  return axios.post(url, { keyword: keyword }).then(res => res.data);
}
