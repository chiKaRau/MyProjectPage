import React from "react";
import "./styles.scss";

//Redux
import Redux from "./components/Redux";
import { Provider } from "react-redux";

//Components
import Content from "./components/Content";

export default function App() {
  return (
    <Provider store={Redux()}>
      <div>
        <Content />
      </div>
    </Provider>
  );
}

/*

Changing admin or user 
would change the #main margin left right

clicking projectBox would changing margin right

*/
