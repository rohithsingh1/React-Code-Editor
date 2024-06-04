import React, { useEffect, useRef, useContext } from "react";
import { LanguageContext, actionTypes } from "../useContext/useContext";

function Editor(props) {
  const { value, onValueChange, highlight, style, padding, language } = props;

  const context = useContext(LanguageContext);

  let input = useRef(null);

  const contentStyle = {
    paddingTop: typeof padding === "object" ? padding.top : padding,
    paddingRight: typeof padding === "object" ? padding.right : padding,
    paddingBottom: typeof padding === "object" ? padding.bottom : padding,
    paddingLeft: typeof padding === "object" ? padding.left : padding,
  };

  useEffect(() => {
    recordCurrentState();
  }, []);

  const recordCurrentState = () => {
    if (!input) return;
  };

  const highlighted = highlight(value);

  const updateLanguage = (code) => {
    if (language === "jsx") {
      context.dispatchFn({
        type: actionTypes.setJsxCode,
        payload: code,
      });
    }
    if (language === "html") {
      context.dispatchFn({
        type: actionTypes.setHtmlCode,
        payload: code,
      });
    }
    if (language === "css") {
      context.dispatchFn({
        type: actionTypes.setCssCode,
        payload: code,
      });
    }
  };

  function handleChange(e) {
    const { value } = e.currentTarget;
    onValueChange(value);
    updateLanguage(value);
  }
  return (
    <div style={{ ...styles.container, ...style }}>
      <pre
        aria-hidden="true"
        style={{ ...styles.editor, ...styles.highlight, ...contentStyle }}
        {...(typeof highlighted === "string"
          ? { dangerouslySetInnerHTML: { __html: highlighted + "<br />" } }
          : { children: highlighted })}
      />
      <textarea
        ref={(c) => (input = c)}
        style={{
          ...styles.editor,
          ...styles.textarea,
          ...contentStyle,
        }}
        value={value}
        onChange={(e) => handleChange(e)}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        data-gramm={false}
      />
    </div>
  );
}

export default Editor;

const styles = {
  container: {
    position: "relative",
    textAlign: "left",
    boxSizing: "border-box",
    padding: 0,
    overflow: "hidden",
  },
  textarea: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    resize: "none",
    color: "inherit",
    overflow: "hidden",
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    WebkitTextFillColor: "transparent",
  },
  highlight: {
    position: "relative",
    pointerEvents: "none",
  },
  editor: {
    margin: 0,
    border: 0,
    background: "none",
    boxSizing: "inherit",
    display: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontStyle: "inherit",
    fontVariantLigatures: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    tabSize: "inherit",
    textIndent: "inherit",
    textRendering: "inherit",
    textTransform: "inherit",
    whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
  },
};
