"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/FileList";
// import Embed from "@editorjs/embed";

const rawDocument = {
  time: Date.now(),
  blocks: [
    {
      type: "header",
      id: "1",
      data: {
        text: "📄 Project Documentation",
        level: 2,
      },
    },
    {
      type: "header",
      id: "2",
      data: {
        text: "Overview",
        level: 3,
      },
    },
    {
      type: "paragraph",
      id: "3",
      data: {
        text: "This document outlines the core features, goals, and implementation steps of the project.",
      },
    },
    {
      type: "header",
      id: "4",
      data: {
        text: "Features",
        level: 3,
      },
    },
    {
      type: "list",
      id: "5",
      data: {
        style: "unordered",
        items: ["User Authentication", "Data Visualization", "Offline Support"],
      },
    },
  ],
  version: "2.8.1",
};

const Editor = ({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) => {
  const ref = useRef<EditorJS | null>(null);
  const [document, setDocument] = useState(rawDocument);
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    if (fileData) initEditor();
  }, [fileData]);

  useEffect(() => {
    onSaveTrigger && onSaveDocument();
  }, [onSaveTrigger]);

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
        // embed: {
        //   class: Embed,
        //   config: {
        //     services: {
        //       youtube: true,
        //       coub: true,
        //     },
        //   },
        // },
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

      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : document,
    });

    ref.current = editor;
  };

  const onSaveDocument = () => {
    if (ref.current) {
      const promise = ref.current
        .save()
        .then((outputData) => {
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          });
        })
        .catch((error) => {
          toast("Error", {
            description: error?.response?.data?.detail || "Failed to save file",
          });
        });

      toast.promise(promise, {
        loading: "Saving...",
        success: () => ({
          message: "Document Updated!",
          description: `Document saved successfully!`,
        }),
        error: (error) => ({
          message: "Error",
          description:
            error?.response?.data?.detail || "Failed to process your request.",
        }),
      });
    }
  };

  return (
    <div>
      <div id="editorjs" className="ml-3"></div>
    </div>
  );
};

export default Editor;
