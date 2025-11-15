import { EditorJsData } from "@/lib/utils";
import PDFDocument from "pdfkit";
import { Document, Paragraph, Packer, HeadingLevel, BorderStyle, TextRun } from 'docx';

export function editorJsToText(data: EditorJsData) {
    return data.blocks
        .map((b) => {
            switch (b.type) {
                case "paragraph":
                case "header":
                    return b.data.text;

                case "list":
                    return b.data.items.join("\n");

                case "code":
                    return `\`\`\`\n${b.data.code}\n\`\`\``;

                case "quote":
                    return `"${b.data.text}"\n— ${b.data.caption || "Anonymous"}`;

                case "warning":
                    return `⚠ ${b.data.title}\n${b.data.message}`;

                case "delimiter":
                    return "---";

                default:
                    return "";
            }
        })
        .join("\n\n");
}

export function editorJsToMarkdown(data: EditorJsData) {
    return data.blocks
        .map((b) => {
            switch (b.type) {
                case "header":
                    return `${"#".repeat(b.data.level)} ${b.data.text}`;
                case "paragraph":
                    return b.data.text;
                case "list":
                    return b.data.items.map((i) => `- ${i}`).join("\n");
                case "code":
                    return `\`\`\`\n${b.data.code}\n\`\`\``;
                case "quote":
                    return `> ${b.data.text}\n>\n> — ${b.data.caption || "Anonymous"}`;
                case "warning":
                    return `**${b.data.title}**\n${b.data.message}`;
                case "delimiter":
                    return `---`;
                default:
                    return "";
            }
        })
        .join("\n\n");
}

export function editorJsToHTML(data: EditorJsData) {
    return data.blocks
        .map((b) => {
            switch (b.type) {
                case "header":
                    return `<h${b.data.level}>${b.data.text}</h${b.data.level}>`;
                case "paragraph":
                    return `<p>${b.data.text}</p>`;
                case "list":
                    return `<ul>${b.data.items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
                case "code":
                    return `<pre><code>${b.data.code}</code></pre>`;
                case "quote":
                    return `<blockquote>${b.data.text}<footer>${b.data.caption || "Anonymous"}</footer></blockquote>`;
                case "warning":
                    return `<div class="warning"><strong>${b.data.title}</strong><p>${b.data.message}</p></div>`;
                case "delimiter":
                    return `<hr/>`;
                default:
                    return "";
            }
        })
        .join("");
}

export async function editorJsToPDF(data: EditorJsData): Promise<Buffer> {
    const doc = new PDFDocument();
    const chunks: Uint8Array[] = [];

    doc.on("data", (c: Uint8Array) => chunks.push(c));
    doc.text(editorJsToText(data));
    doc.end();

    const buffer: Buffer = await new Promise((resolve) =>
        doc.on("end", () => resolve(Buffer.concat(chunks)))
    );

    return buffer;
}

const blockHandlers: Record<string, (block: any) => Paragraph | Paragraph[]> = {
    header: (block) => new Paragraph({
        text: block.data.text || '',
        heading: [HeadingLevel.HEADING_2, HeadingLevel.HEADING_3, HeadingLevel.HEADING_4][block.data.level - 2] || HeadingLevel.HEADING_3,
    }),
    list: (block) => (block.data.items || []).map((item: string) =>
        new Paragraph({ text: item, bullet: { level: 0 } })
    ),
    paragraph: (block) => new Paragraph(block.data.text || ''),
    delimiter: () => new Paragraph('─'.repeat(50)),
    code: (block) => new Paragraph({
        text: block.data.code || '',
        shading: { fill: 'f0f0f0' },
        border: { top: { color: 'cccccc', space: 1, style: BorderStyle.SINGLE } },
    }),
    quote: (block) => new Paragraph({
        children: [new TextRun({ text: `"${block.data.text || ''}" — ${block.data.caption || ''}`, italics: true })],
        indent: { left: 720 },
    }),
    warning: (block) => [
        new Paragraph({
            children: [new TextRun({ text: block.data.title || 'Warning', bold: true })],
            shading: { fill: 'fff3cd' },
        }),
        new Paragraph({
            text: block.data.message || '',
            shading: { fill: 'fff3cd' },
        }),
    ],
};

export async function editorJsToDOCX(data: any): Promise<Buffer> {
    const children = data.blocks?.flatMap((block: any) =>
        (blockHandlers[block.type]?.(block) || new Paragraph(''))
    ) || [new Paragraph('')];

    return Packer.toBuffer(new Document({ sections: [{ children }] }));
}

