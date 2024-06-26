import React, { useState, useEffect, useContext } from "react";
import { themes, Prism } from "prism-react-renderer";
import { Button, Dropdown, Space } from "antd";
import { CodeHighlighter } from "./Highlighter";
import { allLanguages } from "../constants/language";
import { LanguageContext } from "../useContext/useContext";
import Editor from "./Editor";

(typeof global !== "undefined" ? global : window).Prism = Prism;

function CodeEditor() {
  const context = useContext(LanguageContext);
  const [theme, setTheme] = useState(themes.dracula);
  const [allThemes, setAllThemes] = useState([]);
  const [code, setCode] = useState(context.currState.jsx);
  const [styles, setStyles] = useState({
    root: {
      boxSizing: "border-box",
      fontFamily: '"Dank Mono", "Fira Code", monospace',
      ...themes.nightOwl.plain,
    },
  });
  const [language, setLanguage] = useState("jsx");

  useEffect(() => {
    setAllThemes(
      Object.entries(themes).map((ele, index) => {
        return {
          key: "" + ele[0],
          label: <span>{ele[0]}</span>,
        };
      })
    );
  }, []);

  const themeHandler = (theme) => {
    setTheme(themes[theme.key]);
    setStyles({
      root: {
        boxSizing: "border-box",
        fontFamily: '"Dank Mono", "Fira Code", monospace',
        ...themes[theme.key].plain,
      },
    });
  };

  const languageHandler = (language) => {
    setLanguage(language.key);
    const language1 = language.key;
    setCode(context.currState[language1]);
  };

  return (
    <>
      {allThemes.length ? (
        <>
          <Space direction="vertical" style={{ marginBottom: 10, padding: 10 }}>
            <Space wrap>
              <Dropdown
                menu={{
                  onClick: themeHandler,
                  items: allThemes,
                }}
                placement="bottom"
                arrow
                trigger={["click"]}
              >
                <Button style={{ marginRight: 20 }}>Themes</Button>
              </Dropdown>
              <Dropdown
                menu={{
                  onClick: languageHandler,
                  items: allLanguages,
                }}
                placement="bottomRight"
                arrow
                trigger={["click"]}
              >
                <Button>Language</Button>
              </Dropdown>
            </Space>
          </Space>
          <Editor
            value={code}
            onValueChange={(code) => {
              setCode(code);
            }}
            highlight={(code) =>
              CodeHighlighter({ code: code, language: language, theme: theme })
            }
            padding={3}
            style={styles.root}
            language={language}
          />
        </>
      ) : (
        <h2>Loading.....</h2>
      )}
    </>
  );
}

export default CodeEditor;
