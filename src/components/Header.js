import React from "react";
import $ from "jquery";

//Redux
import { useSelector } from "react-redux";

export default function Header() {
  const data = useSelector(state => state);

  return (
    <div id="header" class="p-2">
      <div class="d-flex flex-row justify-content-start">
        {/**Return MyHomePage */}
        <div class="floatingObj mr-auto">
          <a href="https://chikarau.github.io/MyHomePage/">
            <i class="fa fa-arrow-left" aria-hidden="true" /> <span>Back</span>
          </a>
        </div>

        {/**Search Project */}
        <div class="m-2" onClick={openSearchProjectScreen}>
          <i class="fa fa-search" style={{ fontSize: 28 }} aria-hidden="true" />
        </div>

        {/**Search Project */}
        <div class="m-2" onClick={openShowAllProjectsScreen}>
          <i
            class="fa fa-list-ol"
            style={{ fontSize: 28 }}
            aria-hidden="true"
          />
        </div>

        {/**Login as Admin */}
        {data.DataReducer.userRole === "user" && (
          <div class="m-2">
            <Holdable onHold={openLoginPanel}>
              <i
                class="fa fa-user-secret"
                style={{ fontSize: 36 }}
                aria-hidden="true"
              />
            </Holdable>
          </div>
        )}
      </div>
    </div>
  );
}

function openLoginPanel() {
  $(document).ready(function() {
    $("#loginPanel").css({ display: "block" });
  });
}

function openSearchProjectScreen() {
  $(document).ready(function() {
    $("#searchProjectScreen").css({ visibility: "visible" });
  });
}

function openShowAllProjectsScreen() {
  $(document).ready(function() {
    $("#showAllProjectsScreen").css({ visibility: "visible" });
  });
}

function Holdable({ onHold, children }) {
  const [timer, setTimer] = React.useState(null);

  function onPointerDown(evt) {
    const event = { ...evt }; // convert synthetic event to real object
    const timeoutId = window.setTimeout(timesup.bind(null, event), 500);
    setTimer(timeoutId);
  }

  function onPointerUp(evt) {
    if (timer) {
      window.clearTimeout(timer);
      setTimer(null);
    }
  }

  function timesup(evt) {
    setTimer(null);
    onHold(evt);
  }

  return (
    <div onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      {children}
    </div>
  );
}
