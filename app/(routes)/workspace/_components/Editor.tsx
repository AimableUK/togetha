"use client";

import React, { useEffect } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

const Editor = () => {
  useEffect(() => {
    initEditor();
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 3,
          },
        },
        List: {
          class: EditorjsList,
          shortcut: "CMD+SHIFT+L",
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        paragraph: {
          class: Paragraph as unknown as ToolConstructable,
          shortcut: "CMD+SHIFT+G",
          inlineToolbar: true,
          config: {
            placeholder: "Write...",
          },
        },
      },

      holder: "editorjs",
    });
  };

  return (
    <div>
      <div id="editorjs" className="ml-3"></div>
    </div>
  );
};

export default Editor;
