import React from "react";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import { useSelector } from "react-redux";
import ProjectsList from "./ProjectsList";
import $ from "jquery";

export default function UpdateProjectPage() {
  const data = useSelector(state => state);

  if (data.DataReducer.ProjectData === "") {
    return <ProjectsList />;
  }

  return (
    <>
      <ProjectForm
        fetchFunction={fetchProjectInfo}
        mode={"update"}
        _id={data.DataReducer.ProjectData._id}
        title={data.DataReducer.ProjectData.title}
        platform={data.DataReducer.ProjectData.platform}
        status={data.DataReducer.ProjectData.status}
        numberOfPeople={data.DataReducer.ProjectData.numberOfPeople}
        demoUrl={data.DataReducer.ProjectData.demoUrl}
        sourceUrl={data.DataReducer.ProjectData.sourceUrl}
        skills={data.DataReducer.ProjectData.skills}
        imageUrl={data.DataReducer.ProjectData.imageUrl}
        description={data.DataReducer.ProjectData.description}
      />
    </>
  );
}

function fetchProjectInfo(
  _id,
  title,
  platform,
  status,
  demoUrl,
  sourceUrl,
  numberOfPeople,
  skills,
  imageUrl,
  description
) {
  let url =
    "https://MyProjectPage--chikarau.repl.co/api/project/projectInfoUpdate";
  return axios
    .post(url, {
      _id: _id,
      title: title,
      platform: platform,
      status: status,
      demoUrl: demoUrl,
      sourceUrl: sourceUrl,
      numberOfPeople: numberOfPeople,
      skills: skills,
      imageUrl: imageUrl,
      description: description
    })
    .then(res => res.data);
}
