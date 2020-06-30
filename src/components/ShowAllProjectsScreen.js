import React, { useState } from "react";
import $ from "jquery";

export default function ShowAllProjectsScreen(props) {
  const [option, setOption] = useState("Latest");

  const handleSelectOption = option => {
    let optionValue = { createdAt: -1 };

    switch (option) {
      case "Latest":
        setOption("Latest");
        optionValue = { createdAt: -1 };
        break;
      case "Earliest":
        setOption("Earliest");
        optionValue = { createdAt: 1 };
        break;
      case "A-Z":
        setOption("A-Z");
        optionValue = { title: 1 };
        break;
      case "Z-A":
        setOption("Z-A");
        optionValue = { title: -1 };
        break;
      default:
        setOption("Latest");
        optionValue = { createdAt: -1 };
        break;
    }

    props.updateProjectAll(optionValue);
  };

  let displayListTypes = ["Latest", "Earliest", "A-Z", "Z-A"].map(
    (e, index) => (
      <div key={index++}>
        <h3
          onClick={() => {
            handleSelectOption(e);
            closeShowAllProjectsScreen(e);
          }}
          style={{ opacity: e === option ? 1 : 0.5 }}
        >
          {e}
        </h3>
      </div>
    )
  );

  return (
    <div
      id="showAllProjectsScreen"
      class="d-flex flex-row flex-wrap justify-content-center align-content-center"
      onClick={event => {
        closeShowAllProjectsScreen(event);
      }}
    >
      <div>{displayListTypes}</div>
    </div>
  );
}

function closeShowAllProjectsScreen(event) {
  $(document).ready(function() {
    $("#showAllProjectsScreen").css({ visibility: "hidden" });
  });
}
