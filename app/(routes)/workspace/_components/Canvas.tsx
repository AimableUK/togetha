import React, { useEffect, useState, useRef } from "react";
import {
  Excalidraw,
  FONT_FAMILY,
  MainMenu,
  WelcomeScreen,
  exportToCanvas,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/lib/utils";
import { ImageDown } from "lucide-react";

interface CanvasProps {
  fileId: any;
  fileData: FILE;
  setSavingWorkspace: React.Dispatch<React.SetStateAction<boolean>>;
}

const Canvas = ({ fileId, fileData, setSavingWorkspace }: CanvasProps) => {
  const { theme } = useTheme();
  const [whiteBoardData, setWhiteBoardData] = useState("");
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  const excalidrawAPIRef = useRef<any>(null);

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
      editedAt: Date.now(),
    });
    setSavingWorkspace(false);
  };

  const handleExport = async () => {
    const api = excalidrawAPIRef.current;
    if (!api) return;

    const elements = api.getSceneElements();
    if (!elements || !elements.length) return;

    const appState = api.getAppState();
    const baseCanvas = await exportToCanvas({
      elements,
      appState: {
        ...appState,
        exportWithDarkMode: theme === "dark",
        exportBackground: true,
      },
      files: api.getFiles(),
      maxWidthOrHeight: 1080,
    });

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = baseCanvas.width;
    finalCanvas.height = baseCanvas.height + 50;
    const ctx = finalCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(baseCanvas, 0, 0);

    const logoImg = new window.Image();
    logoImg.src = "/logo.png";

    logoImg.onload = () => {
      const logoHeight = 20;
      const logoWidth = (logoImg.width / logoImg.height) * logoHeight;

      const padding = 5;
      const text = "TOGETHA";
      ctx.font = "bold 14px sans-serif";
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;

      const totalWidth = logoWidth + padding + textWidth;
      const footerTop = finalCanvas.height - 50 + 5;

      ctx.globalAlpha = 0.4;
      ctx.fillStyle = "#fff";
      ctx.fillRect(12, footerTop, totalWidth, 40);

      ctx.globalAlpha = 1;
      ctx.drawImage(
        logoImg,
        12,
        footerTop + (40 - logoHeight) / 2,
        logoWidth,
        logoHeight
      );

      ctx.fillStyle = "#000";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 12 + logoWidth + padding, footerTop + 45 / 2);

      const link = document.createElement("a");
      link.href = finalCanvas.toDataURL("image/png");
      link.download = "TogethaDrawing.png";
      link.click();
    };
  };

  return (
    <div className="custom-styles h-[calc(100vh-53px)]">
      {fileData && (
        <Excalidraw
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData.whiteboard),
            appState: {
              currentItemFontFamily: FONT_FAMILY.Nunito,
            },
          }}
          onChange={(elements) => setWhiteBoardData(JSON.stringify(elements))}
          excalidrawAPI={(api) => (excalidrawAPIRef.current = api)}
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
              <MainMenu.Item onSelect={handleExport}>
                <ImageDown />
                Export Image with Watermark
              </MainMenu.Item>
              <MainMenu.DefaultItems.SearchMenu />
              <MainMenu.DefaultItems.Export />
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
              {/* <MainMenu.DefaultItems.SaveAsImage /> */}
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
                Make any drawing
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
