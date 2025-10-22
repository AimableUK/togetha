import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FILE } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const Canvas = ({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) => {
  const { theme } = useTheme();
  const [whiteBoardData, setWhiteBoardData] = useState("");

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    if (onSaveTrigger > 0) saveWhiteBoard();
  }, [onSaveTrigger]);

  const saveWhiteBoard = async () => {
    toast.promise(
      (async () => {
        await updateWhiteboard({
          _id: fileId,
          whiteboard: whiteBoardData,
        });
      })(),
      {
        loading: "Saving...",
        success: () => ({
          message: "Canvas Updated!",
          description: "Canvas saved successfully!",
        }),
        error: (error) => ({
          message: "Error",
          description:
            error?.response?.data?.detail || "Failed to process your request.",
        }),
      }
    );
  };

  return (
    <div style={{ height: "680px" }} className="custom-styles ">
      {fileData && (
        <Excalidraw
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(JSON.stringify(excalidrawElements))
          }
          theme={theme === "dark" ? "dark" : "light"}
          UIOptions={{
            canvasActions: {
              changeViewBackgroundColor: false,
              loadScene: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.Group title="Main Actions">
              <MainMenu.DefaultItems.SearchMenu />
              <MainMenu.DefaultItems.SaveAsImage />
              <MainMenu.DefaultItems.Export />
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
              <MainMenu.DefaultItems.Help />
            </MainMenu.Group>
          </MainMenu>

          <WelcomeScreen>
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Logo>
                <Image
                  src="/logo.png"
                  alt="togetha logo"
                  width={40}
                  height={40}
                />
                <h3 className="font-bold">Togetha</h3>
              </WelcomeScreen.Center.Logo>
              <WelcomeScreen.Center.Heading>
                Make any drawing!!
              </WelcomeScreen.Center.Heading>
              <WelcomeScreen.Center.Menu>
                <WelcomeScreen.Center.MenuItemHelp />
              </WelcomeScreen.Center.Menu>
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};

export default Canvas;
