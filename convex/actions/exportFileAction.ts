"use node";

import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph } from "docx";
import { editorJsToHTML, editorJsToMarkdown, editorJsToText } from "@/app/hooks/exportUtils";
import { action } from "../_generated/server";
import { v } from "convex/values";

export const exportFileAction = action({
    args: {
        data: v.any(), // pass your EditorJsData
        format: v.string(),
        fileName: v.string(),
    },
    handler: async (ctx, { data, format, fileName }) => {
        let content: string;
        let mime: string;

        switch (format) {
            case "txt":
                content = editorJsToText(data);
                mime = "text/plain";
                break;
            case "md":
                content = editorJsToMarkdown(data);
                mime = "text/markdown";
                break;
            case "html":
                content = editorJsToHTML(data);
                mime = "text/html";
                break;
            case "pdf": {
                const doc = new PDFDocument();
                const chunks: Uint8Array[] = [];
                doc.on("data", (c: Uint8Array) => chunks.push(c));
                doc.text(editorJsToText(data));
                doc.end();
                const buffer: Buffer = await new Promise((resolve) =>
                    doc.on("end", () => resolve(Buffer.concat(chunks)))
                );
                content = buffer.toString("base64");
                mime = "application/pdf";
                break;
            }
            case "docx": {
                const doc = new Document({
                    sections: [
                        { children: [new Paragraph(editorJsToText(data))] },
                    ],
                });
                const buffer: Buffer = await Packer.toBuffer(doc);
                content = buffer.toString("base64");
                mime = "application/vnd.openxmlformats‑officedocument.wordprocessingml.document";
                break;
            }
            default:
                throw new Error("Invalid format");
        }

        return { content, mime, filename: fileName + "." + format };
    },
});
