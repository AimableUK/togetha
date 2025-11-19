import { SecureFileResult } from "@/lib/utils";
import { editorJsToHTML, editorJsToMarkdown, editorJsToPDF, editorJsToText } from "./exportUtils";
import { editorJsToDOCX } from "./exportUtils";
import { toast } from "sonner";

export function useExportFile(fileData: SecureFileResult) {

  const download = async (format: "txt" | "md" | "html" | "pdf" | "docx") => {
    if (!fileData) return;

    const formatLabels: Record<string, string> = {
      txt: "Text",
      md: "Markdown",
      html: "HTML",
      pdf: "PDF",
      docx: "Word Document",
    };

    toast.promise(
      (async () => {
        const data = JSON.parse(fileData.document);
        let content: Blob | null = null;
        let filename = fileData.fileName + "." + format;

        // Conversion 
        switch (format) {
          case "txt":
            content = new Blob([editorJsToText(data)], { type: "text/plain" });
            break;

          case "md":
            content = new Blob([editorJsToMarkdown(data)], {
              type: "text/markdown",
            });
            break;

          case "html":
            content = new Blob([editorJsToHTML(data)], { type: "text/html" });
            break;

          case "docx": {
            const buffer = await editorJsToDOCX(data);
            content = new Blob([new Uint8Array(buffer)], {
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            break;
          }

          case "pdf": {
            const pdfBuffer = await editorJsToPDF(data);
            content = new Blob([new Uint8Array(pdfBuffer)], { type: "application/pdf" });
            break;
          }

          default:
            return;
        }

        // Download
        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      })(),
      {
        loading: `Converting to ${formatLabels[format]}...`,
        success: `Downloaded ${fileData.fileName}.${format}`,
        error: "Download failed",
      }
    );
  };

  return { download };
}
