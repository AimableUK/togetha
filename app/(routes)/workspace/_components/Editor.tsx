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
import { FILE } from "@/lib/utils";

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

interface EditorProps {
  fileId: any;
  fileData: FILE;
  setSavingWorkspace: React.Dispatch<React.SetStateAction<boolean>>;
}

const Editor = ({ fileId, fileData, setSavingWorkspace }: EditorProps) => {
  const editorRef = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.files.updateDocument);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!fileId || !fileData) return;
    if (editorRef.current) return;

    const holder = document.getElementById("editorjs");
    if (!holder) return;

    const AlignmentTuneTool = require("editorjs-text-alignment-blocktune");
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          shortcut: "CMD+SHIFT+H",
          tunes: ["alignmentTune"],
          config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 3,
          },
        },
        List: {
          class: EditorjsList,
          shortcut: "CMD+SHIFT+L",
          tunes: ["alignmentTune"],
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        paragraph: {
          class: Paragraph as unknown as ToolConstructable,
          shortcut: "CMD+SHIFT+G",
          inlineToolbar: true,
          tunes: ["alignmentTune"],
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
        alignmentTune: {
          class: AlignmentTuneTool,
          config: {
            default: "left",
            blocks: {
              list: "right",
            },
          },
        },
      },
      async onChange() {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(async () => {
          try {
            setSavingWorkspace(true);
            const data = await editor.save();
            await updateDocument({
              _id: fileId,
              document: JSON.stringify(data),
              editedAt: Date.now(),
            });
            setSavingWorkspace(false);
          } catch (err: any) {
            console.error(
              "Network error: your changes will be saved when back online"
            );
            setSavingWorkspace(false);
          }
        }, 100);
      },
      onReady() {
        editorRef.current = editor;
      },
      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [fileId]);

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
};

export default Editor;
