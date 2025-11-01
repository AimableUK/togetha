import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/lib/utils";

interface CanvasProps {
  fileId: any;
  fileData: FILE;
  setSavingWorkspace: React.Dispatch<React.SetStateAction<boolean>>;
}

const Canvas = ({ fileId, fileData, setSavingWorkspace }: CanvasProps) => {
  const { theme } = useTheme();
  const [whiteBoardData, setWhiteBoardData] = useState("");
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveWhiteBoard();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [whiteBoardData]);

  const saveWhiteBoard = async () => {
    setSavingWorkspace(true);
    await updateWhiteboard({
      _id: fileId,
      whiteboard: whiteBoardData,
    });
    setSavingWorkspace(false);
  };

  return (
    <div className="custom-styles h-[calc(100vh-53px)]">
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
