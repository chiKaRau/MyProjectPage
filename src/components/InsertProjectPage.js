import React from "react";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import $ from "jquery";

export default function InsertProjectPage() {
  return (
    <>
      <ProjectForm
        fetchFunction={fetchProjectInfo}
        mode={"insert"}
        _id={""}
        title={""}
        platform={""}
        status={""}
        demoUrl={""}
        numberOfPeople={""}
        sourceUrl={""}
        skills={[]}
        imageUrl={""}
        description={""}
      />
    </>
  );
}

function fetchProjectInfo(
  _id = "",
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
    "https://MyProjectPage--chikarau.repl.co/api/project/projectInfoInsert";
  return axios
    .post(url, {
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
