import React from "react";
import $ from "jquery";

import { useSelector } from "react-redux";

export default function ProjectSidebar() {
  const data = useSelector(state => state);

  let skills =
    data.DataReducer.ProjectData.skills === undefined
      ? ""
      : data.DataReducer.ProjectData.skills.map(e => (
          <div class=" m-1 p-1 border">{e}</div>
        ));

  return (
    <div id="projectSidenav">
      <h3 class="text-center">{data.DataReducer.ProjectData.title}</h3>

      <div class="d-flex justify-content-center p-3">
        <img
          src={data.DataReducer.ProjectData.imageUrl}
          alt={data.DataReducer.ProjectData.title}
        />
      </div>

      <hr />

      <p>Status : {data.DataReducer.ProjectData.status}</p>
      <p>Platform : {data.DataReducer.ProjectData.platform}</p>
      <p>Number Of People : {data.DataReducer.ProjectData.numberOfPeople}</p>

      <p>
        DemoURL :{" "}
        <a href={data.DataReducer.ProjectData.demoUrl}>
          {" "}
          {data.DataReducer.ProjectData.demoUrl}
        </a>
      </p>
      <p>
        SourceUrl :{" "}
        <a href={data.DataReducer.ProjectData.sourceUrl}>
          {" "}
          {data.DataReducer.ProjectData.sourceUrl}
        </a>
      </p>
      <p>Desciption : {data.DataReducer.ProjectData.description}</p>
      <div>
        <p class="text-center">Skills</p>
        <div id="skills" class="d-flex flex-wrap">
          {skills}
        </div>
      </div>
      <div>
        <span onClick={closeProjectSidebar} class="closebtn">
          &times;
        </span>
      </div>
    </div>
  );
}

function closeProjectSidebar() {
  $(document).ready(function() {
    //Large Devices
    $("#projectSidenav").css({ width: "0px" });
    $("#main").css({ "margin-right": "0px" });
  });
}

$(window).scroll(function(event) {
  var scroll = $(window).scrollTop();

  if (scroll && window.innerWidth > 414) {
    closeProjectSidebar();
  }
});
