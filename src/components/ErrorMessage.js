import React from "react";
import $ from "jquery";

export default function ErrorMessage() {
  return (
    <div id="errorMessage" class="text-center">
      <img
        style={{ width: "25%", height: "25%" }}
        src="https://uploads.codesandbox.io/uploads/user/ea14886a-d3cb-4078-a05b-a39d098edff8/5RsC-xxface.png"
        alt="xxface"
      />
      <h1>Ops!</h1>
      <h2>Something Wrong!</h2>
      <h2>Please try again!</h2>
    </div>
  );
}
