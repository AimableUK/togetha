"use client";

import React, { useContext, useEffect, useRef } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import CodeTool from "@editorjs/code";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/lib/utils";
import ImageTool from "@editorjs/image";
import { useImageUploader } from "../hooks/useImageUploader";
import { TeamContext } from "@/app/FilesListContext";
import CropperTune from "editorjs-image-crop-resize";
import "editorjs-image-crop-resize/dist/cropper-tune.css";
import { toast } from "sonner";

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
  const previousImageStatesRef = useRef<Map<string, any>>(new Map());

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const { user } = useContext(TeamContext);

  const imageUploader = useImageUploader({
    fileId: fileId,
    teamId: fileData.teamId,
    userEmail: user?.email,
  });

  // Get dimensions from an image URL/dataURL
  const getImageDimensions = (
    imageUrl: string
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
      };
      img.src = imageUrl;
    });
  };

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
          inlineToolbar: true,
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
        image: {
          class: ImageTool,
          shortcut: "CMD+SHIFT+I",
          config: {
            uploader: imageUploader,
            features: {
              stretch: false,
              border: false,
              caption: false,
              background: false,
            },
          },
          tunes: ["CropperTune"],
        },
        CropperTune: {
          class: CropperTune,
        },
        delimiter: Delimiter,
        code: CodeTool,
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+Q",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        alignmentTune: {
          class: AlignmentTuneTool,
          config: {
            default: "left",
            blocks: {
              image: "left",
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

            // Check each image for crop changes
            for (const block of data.blocks) {
              if (block.type === "image") {
                const blockId = block.id as string;
                if (!blockId) continue;

                const croppedImage = block.tunes?.CropperTune?.croppedImage;
                const fileType = block.data.fileType;

                if (croppedImage) {
                  const previousState =
                    previousImageStatesRef.current.get(blockId);

                  if (
                    !previousState ||
                    previousState.croppedImage !== croppedImage
                  ) {
                    const dimensions = await getImageDimensions(croppedImage);

                    previousImageStatesRef.current.set(blockId, {
                      croppedImage,
                      dimensions,
                    });

                    block.data.file.url = croppedImage;
                    block.data.file.width = dimensions.width;
                    block.data.file.height = dimensions.height;
                  }
                  if (
                    fileType &&
                    !["image/jpeg", "image/jpg", "image/png"].includes(fileType)
                  ) {
                    toast.warning(
                      `Image format "${fileType}" may not be downloadable in DOCX. Use JPEG or PNG for best results.`
                    );
                  }
                }
              }
            }

            await updateDocument({
              _id: fileId,
              document: JSON.stringify(data),
              editedAt: Date.now(),
            });
            setSavingWorkspace(false);
          } catch (err: any) {
            toast.error(
              "Error: Currently Togetha can't handle large files, So prefer removing the last added element (e.g. image). If the error persists, immedietely Contact us"
            );
            console.log(
              "Error: Currently Togetha can't handle large files, So prefer removing the last added element (e.g. image). If the error persists, immedietely Contact us"
            );
            setSavingWorkspace(false);
          }
        }, 500);
      },
      onReady() {
        editorRef.current = editor;

        setTimeout(() => {
          const blocks = fileData?.document
            ? JSON.parse(fileData.document).blocks
            : [];

          blocks.forEach((block: any) => {
            if (block.type === "image") {
              previousImageStatesRef.current.set(block.id, {
                croppedImage: block.tunes?.CropperTune?.croppedImage,
                dimensions: {
                  width: block.data.file?.width || 0,
                  height: block.data.file?.height || 0,
                },
              });
            }
          });
        }, 300);
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
