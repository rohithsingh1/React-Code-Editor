import "./App.css";
import CodeEditor from "./components/CodeEditor";
import { Wrapper } from "./styles/styles";
import {
  LanguageContext,
  initialValues,
  reducerFn,
} from "./useContext/useContext";
import React from "react";

function App() {
  const [currState, dispatchFn] = React.useReducer(reducerFn, initialValues);
  return (
    <div className="App">
      <LanguageContext.Provider value={{ currState, dispatchFn }}>
        <Wrapper>
          <h2>Code Editor</h2>
          <CodeEditor />
        </Wrapper>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
