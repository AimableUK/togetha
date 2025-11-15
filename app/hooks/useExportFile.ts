import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function useExportFile() {
  const exportFile = useMutation(api.files.exportFile);

  const download = async (_id: string, format: "txt" | "md" | "html" | "pdf" | "docx", userEmail: string) => {
    try {
      const result = await exportFile({ _id: _id as Id<"files">, format, userEmail });
      if (!result?.content || !result?.mime || !result?.filename) return;

      const blob = ["pdf", "docx"].includes(format)
        ? new Blob([Uint8Array.from(atob(result.content), (c) => c.charCodeAt(0))], { type: result.mime })
        : new Blob([result.content], { type: result.mime });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = result.filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return { download };
}
