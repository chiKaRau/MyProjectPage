import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkEmpty } from "../utils/utils";
import $ from "jquery";

//Redux
import { removeProjectDataAction } from "./Redux";
import { useDispatch } from "react-redux";

export default function ProjectForm(props) {
  const [title, setTitle] = useState(props.title);
  const [platform, setPlatform] = useState(props.platform);
  const [status, setStatus] = useState(props.status);
  const [demoUrl, setDemoUrl] = useState(props.demoUrl);
  const [sourceUrl, setSourceUrl] = useState(props.sourceUrl);
  const [imageUrl, setImageUrl] = useState(props.imageUrl);
  const [skills, setSkills] = useState(props.skills);
  const [numberOfPeople, setNumberOfPeople] = useState(props.numberOfPeople);
  const [skillText, setSkillText] = useState("");
  const [skillsJSONData, setSkillsJSONData] = useState([]);
  const [description, setDescription] = useState(props.description);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();

  const updateSkillsJSONDATA = async () => {
    try {
      let tempSkills = await fetchSkillsJSONDATA();
      setSkillsJSONData(tempSkills.data.sort());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    updateSkillsJSONDATA();
  }, []);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (
        !checkEmpty([
          title,
          platform,
          status,
          demoUrl,
          sourceUrl,
          numberOfPeople,
          imageUrl,
          description
        ])
      ) {
        setIsLoading(false);
        setIsSuccess(false);
        return;
      }

      await props.fetchFunction(
        props._id,
        title,
        platform,
        status,
        demoUrl,
        sourceUrl,
        numberOfPeople,
        skills,
        imageUrl,
        description
      );

      setTitle("");
      setPlatform("");
      setStatus("");
      setDemoUrl("");
      setSourceUrl("");
      setImageUrl("");
      setDescription("");
      setNumberOfPeople("");
      setSkills([]);
      setIsSuccess(true);
      setIsLoading(false);
      return dispatch(removeProjectDataAction());
    } catch (e) {
      console.log(e);
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);
    }
  }

  let displaySkills = skills.map((skill, index) => {
    return (
      <div
        key={index++}
        class=" m-1 p-1 border rounded"
        onClick={() => {
          setSkills(skills.filter(e => e !== skill));
        }}
      >
        {skill}
      </div>
    );
  });

  return (
    <div id="ProjectForm" class="p-5">
      <div class="text-center">
        {props.mode === "insert" && <h4>Add a new project</h4>}
        {props.mode === "update" && <h4>Update {props.title}</h4>}
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-10 offset-sm-2">
          <form onSubmit={handleLoginSubmit}>
            {isError && (
              <small class="form-text text-danger">
                Something wrong in Server. Please Try Again
              </small>
            )}
            <div>
              <div class="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                  class="form-control"
                  placeholder="Project Title"
                />
                {title === "" && (
                  <small class="form-text text-light">
                    Please fill in Title
                  </small>
                )}
              </div>

              <div class="form-group">
                <label>Platform</label>
                <input
                  type="text"
                  value={platform}
                  onChange={event => setPlatform(event.target.value)}
                  class="form-control"
                  placeholder="Browser"
                />
                {platform === "" && (
                  <small class="form-text text-light">
                    Please fill in Platform
                  </small>
                )}
              </div>

              <div class="form-group">
                <label>Status</label>
                <input
                  type="text"
                  value={status}
                  onChange={event => setStatus(event.target.value)}
                  class="form-control"
                  placeholder="Complete"
                />
                {status === "" && (
                  <small class="form-text text-light">
                    Please fill in Status
                  </small>
                )}
              </div>

              <div class="form-group">
                <label>DemoUrl</label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={event => setDemoUrl(event.target.value)}
                  class="form-control"
                  placeholder="https://chikarau.github.io/MyHomePage/"
                />
                {demoUrl === "" && (
                  <small class="form-text text-light">
                    Please fill in DemoUrl
                  </small>
                )}
              </div>

              <div class="form-group">
                <label>SourceUrl</label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={event => setSourceUrl(event.target.value)}
                  class="form-control"
                  placeholder="https://github.com/chiKaRau/MyHomePage"
                />
                {sourceUrl === "" && (
                  <small class="form-text text-light">
                    Please fill in SourceUrl
                  </small>
                )}
              </div>

              <div class="form-group">
                <label>ImageUrl</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={event => setImageUrl(event.target.value)}
                  class="form-control"
                  placeholder="https://via.placeholder.com/350x350.jpg"
                />
                {imageUrl === "" && (
                  <small class="form-text text-light">
                    Please fill in ImageUrl
                  </small>
                )}
              </div>

              <div class="form-group">
                <label>Number Of People</label>
                <input
                  type="text"
                  value={numberOfPeople}
                  onChange={event => setNumberOfPeople(event.target.value)}
                  class="form-control"
                  placeholder="Individual"
                />
                {numberOfPeople === "" && (
                  <small class="form-text text-light">
                    Please fill in numberOfPeople
                  </small>
                )}
              </div>

              <div class="form-group">
                <label>Description</label>
                <textarea
                  class="form-control"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                  placeholder="This project is...."
                  rows="7"
                />
                {description === "" && (
                  <small class="form-text text-light">
                    Please fill in Description
                  </small>
                )}
              </div>

              <div class="form-group">
                <label>
                  Skills: <div class="d-flex flex-wrap">{displaySkills}</div>
                </label>

                <br />
                <input
                  type="text"
                  list="data"
                  value={skillText}
                  onChange={event => setSkillText(event.target.value)}
                />
                <span> </span>
                <label>
                  <i
                    class="fa fa-plus-circle"
                    style={{ fontSize: 25 }}
                    aria-hidden="true"
                    onClick={() => {
                      if (!skills.includes(skillText) && skillText !== "") {
                        setSkills([skillText, ...skills]);
                      }
                      setSkillText("");
                    }}
                  />
                </label>

                <datalist id="data">
                  {skillsJSONData.map((item, key) => (
                    <option key={key} value={item} />
                  ))}
                </datalist>
              </div>
              <div>
                {isSuccess && (
                  <>
                    <small class="form-text text-light">Action Successed</small>
                    <br />
                  </>
                )}
                <input
                  type="submit"
                  disabled={isLoading}
                  class="btn btn-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function fetchSkillsJSONDATA(keyword) {
  let url = "https://MyProjectPage--chikarau.repl.co/api/getSkillsJSONData";
  return axios.get(url, { keyword: keyword }).then(res => res.data);
}
