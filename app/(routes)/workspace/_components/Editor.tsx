"use client";

import React, { useEffect, useRef } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import CodeTool from "@editorjs/code";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";

const rawDocument = {
  time: Date.now(),
  blocks: [
    {
      type: "header",
      id: "1",
      data: {
        text: "📄 Document Heading",
        level: 2,
      },
    },
    {
      type: "paragraph",
      id: "3",
      data: {
        text: "Type your document or notes here, with your preferred styles... or type (/) to get started",
      },
    },
  ],
  version: "2.8.1",
};

const Editor = ({ fileId, fileData }: { fileId: any; fileData: FILE }) => {
  const ref = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

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
        delimiter: Delimiter,
        code: CodeTool,
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
      },
      onChange: async () => {
        setTimeout(async () => {
          const outputData = await editor.save();
          await updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          });
        }, 1000);
      },
      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
    });

    ref.current = editor;
  };

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
};

export default Editor;
