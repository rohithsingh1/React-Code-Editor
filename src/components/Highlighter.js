import { Highlight } from "prism-react-renderer";
import React, { Fragment } from "react";

export const CodeHighlighter = ({ code = "", language = "jsx", theme }) => {
  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <Fragment>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => {
                  return <span key={key} {...getTokenProps({ token })} />;
                })}
              </div>
            ))}
          </Fragment>
        );
      }}
    </Highlight>
  );
};
