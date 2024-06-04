import React from "react";

export const LanguageContext = React.createContext();

export const actionTypes = {
  setJsxCode: "setJsxCode",
  setHtmlCode: "setHtmlCode",
  setCssCode: "setCssCode",
};

const jsxCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

const htmlCode = `
<body>
    <div id="root"></div>
  </body>
`;

const cssCode = `
.App-logo {
  height: 40vmin;
  pointer-events: none;
}
.App-link {
  color: #61dafb;
}
`;

export const initialValues = {
  jsx: jsxCode,
  html: htmlCode,
  css: cssCode,
};

export function reducerFn(currState, action) {
  switch (action.type) {
    case actionTypes.setJsxCode: {
      return {
        ...currState,
        jsx: action.payload,
      };
    }
    case actionTypes.setHtmlCode: {
      return {
        ...currState,
        html: action.payload,
      };
    }
    case actionTypes.setCssCode: {
      return {
        ...currState,
        css: action.payload,
      };
    }
    default: {
      return currState;
    }
  }
}
