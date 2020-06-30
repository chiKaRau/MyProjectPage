import React, { useState } from "react";
import $ from "jquery";

export default function SearchProjectScreen(props) {
  const [keyword, setKeyword] = useState("");
  return (
    <div
      id="searchProjectScreen"
      class="d-flex flex-row flex-wrap justify-content-center align-content-center"
      onClick={event => {
        closeSearchProjectScreen(event);
      }}
    >
      <form
        class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2"
        onSubmit={e => e.preventDefault()}
      >
        <div class="form__group field">
          <input
            type="text"
            class="form__field"
            placeholder="Search a project"
            required
            onChange={e => setKeyword(e.target.value)}
          />
        </div>

        <i
          id="searchProjectIcon"
          class="fa fa-search"
          style={{ fontSize: 28 }}
          aria-hidden="true"
          onClick={event => {
            event.preventDefault();
            props.updateProjectByKeyword(event, keyword);
            closeSearchProjectScreen(event);
          }}
        />
      </form>
    </div>
  );
}

function closeSearchProjectScreen(event) {
  if (
    [
      "searchProjectScreen",
      "searchProjectButton",
      "searchProjectIcon"
    ].includes(event.target.id)
  ) {
    $(document).ready(function() {
      $("#searchProjectScreen").css({ visibility: "hidden" });
    });
  }
}
