import { EditorJsData } from "@/lib/utils";
import { Document, Paragraph, Packer, HeadingLevel, BorderStyle, TextRun } from 'docx';
import { PDFDocument, rgb } from 'pdf-lib';

function cleanTextForPlainText(text: string): string {
    text = text.replace(/&nbsp;/g, " ");
    text = text.replace(/<[^>]*>/g, "");
    return text;
}

export function editorJsToText(data: EditorJsData) {
    return data.blocks
        .map((b) => {
            const type = b.type;

            if (type === "header" || type === "Header") {
                return cleanTextForPlainText(b.data.text);
            }

            if (type === "paragraph" || type === "Paragraph") {
                return cleanTextForPlainText(b.data.text);
            }

            if (type === "list" || type === "List") {
                const listData = b.data as any;
                const items = listData.items.map((item: any) => ({
                    text: cleanTextForPlainText(item.content),
                    checked: item.meta?.checked ?? false
                }));

                if (listData.style === "checklist") {
                    return items
                        .map((i: any) => `${i.checked ? "[x]" : "[ ]"} ${i.text}`)
                        .join("\n");
                }

                if (listData.style === "ordered") {
                    return items
                        .map((i: any, idx: number) => `${idx + 1}. ${i.text}`)
                        .join("\n");
                }

                return items.map((i: any) => `• ${i.text}`).join("\n");
            }

            if (type === "code" || type === "Code") {
                const codeData = b.data as any;
                return `\`\`\`\n${cleanTextForPlainText(codeData.code)}\n\`\`\``;
            }

            if (type === "quote" || type === "Quote") {
                const quoteData = b.data as any;
                const cleanText = cleanTextForPlainText(quoteData.text);
                const caption = cleanTextForPlainText(quoteData.caption || "Anonymous");
                return `"${cleanText}"\n— ${caption}`;
            }

            if (type === "warning" || type === "Warning") {
                const warningData = b.data as any;
                const title = cleanTextForPlainText(warningData.title);
                const message = cleanTextForPlainText(warningData.message);
                return `⚠ ${title}\n${message}`;
            }

            if (type === "delimiter" || type === "Delimiter") {
                return "***";
            }

            return "";
        })
        .filter((block) => block.trim() !== "")
        .join("\n\n");
}

export function editorJsToMarkdown(data: EditorJsData) {
    return data.blocks
        .map((b) => {
            const type = b.type;

            switch (type) {
                case "header":
                case "Header": {
                    const headerData = b.data as any;
                    return `${"#".repeat(headerData.level)} ${headerData.text}`;
                }

                case "paragraph":
                case "Paragraph": {
                    const paraData = b.data as any;
                    return paraData.text;
                }

                case "list":
                case "List": {
                    const listData = b.data as any;
                    const items = listData.items.map((item: any) => item.content);

                    if (listData.style === "checklist") {
                        return items
                            .map((text: string, idx: number) => {
                                const checked = listData.items[idx].meta?.checked ? "x" : " ";
                                return `- [${checked}] ${text}`;
                            })
                            .join("\n");
                    }

                    if (listData.style === "ordered") {
                        return items
                            .map((text: string, idx: number) => `${idx + 1}. ${text}`)
                            .join("\n");
                    }

                    return items.map((text: string) => `- ${text}`).join("\n");
                }

                case "code":
                case "Code": {
                    const codeData = b.data as any;
                    return `\`\`\`\n${codeData.code}\n\`\`\``;
                }

                case "quote":
                case "Quote": {
                    const quoteData = b.data as any;
                    const cleanText = quoteData.text.replace(/&nbsp;/g, " ");
                    return `> ${cleanText}\n>\n> — ${quoteData.caption || "Anonymous"}`;
                }

                case "warning":
                case "Warning": {
                    const warningData = b.data as any;
                    return `**⚠ ${warningData.title}**\n\n${warningData.message}`;
                }

                case "delimiter":
                case "Delimiter":
                    return `---`;

                default:
                    return "";
            }
        })
        .filter((block) => block.trim() !== "")
        .join("\n\n");
}

export function editorJsToHTML(data: EditorJsData) {
    return data.blocks
        .map((b) => {
            const type = b.type;

            switch (type) {
                case "header":
                case "Header": {
                    const headerData = b.data as any;
                    const level = headerData.level || 1;
                    return `<h${level} class="heading-${level}">${headerData.text}</h${level}>`;
                }

                case "paragraph":
                case "Paragraph": {
                    const paraData = b.data as any;
                    return `<p class="paragraph">${paraData.text}</p>`;
                }

                case "list":
                case "List": {
                    const listData = b.data as any;
                    const items = listData.items.map((item: any) => item.content);

                    if (listData.style === "checklist") {
                        return `<ul class="checklist">
                            ${items
                                .map((text: string, idx: number) => {
                                    const checked = listData.items[idx].meta?.checked ? "checked" : "";
                                    return `  <li class="checklist-item"><input type="checkbox" disabled ${checked} /> <span>${text}</span></li>`;
                                })
                                .join("\n")}
                        </ul>`;
                    }

                    if (listData.style === "ordered") {
                        return `<ol class="ordered-list">
                        ${items.map((text: string) => `<li>${text}</li>`).join("\n")}
                        </ol>`;
                    }

                    return `<ul class="unordered-list">
                        ${items.map((text: string) => `  <li>${text}</li>`).join("\n")}
                        </ul>`;
                }

                case "code":
                case "Code": {
                    const codeData = b.data as any;
                    return `<pre class="code-block"><code>${escapeHTML(codeData.code)}</code></pre>`;
                }

                case "quote":
                case "Quote": {
                    const quoteData = b.data as any;
                    const cleanText = quoteData.text.replace(/&nbsp;/g, " ");
                    return `<blockquote class="quote">
                            <p class="quote-text">"${cleanText}"</p>
                            <footer class="quote-author">— ${quoteData.caption || "Anonymous"}</footer>
                        </blockquote>`;
                }

                case "warning":
                case "Warning": {
                    const warningData = b.data as any;
                    return `<div class="warning-box">
                        <div class="warning-header">
                            <span class="warning-icon">⚠</span>
                            <strong>${warningData.title}</strong>
                        </div>
                        <p class="warning-message">${warningData.message}</p>
                    </div>`;
                }

                case "delimiter":
                case "Delimiter":
                    return `<hr class="delimiter" />`;

                default:
                    return "";
            }
        })
        .filter((block) => block.trim() !== "")
        .join("\n");
}

function escapeHTML(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
}

function parseHtmlToTextRuns(text: string): TextRun[] {
    // Replace HTML entities
    text = text.replace(/&nbsp;/g, ' ');

    const runs: TextRun[] = [];
    let currentText = '';
    let bold = false;
    let italic = false;
    let underline = false;

    let i = 0;
    while (i < text.length) {
        if (text.slice(i, i + 3) === '<b>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: currentText,
                    bold,
                    italics: italic,
                    underline: underline ? {} : undefined,
                }));
                currentText = '';
            }
            bold = true;
            i += 3;
        } else if (text.slice(i, i + 4) === '</b>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: currentText,
                    bold,
                    italics: italic,
                    underline: underline ? {} : undefined,
                }));
                currentText = '';
            }
            bold = false;
            i += 4;
        } else if (text.slice(i, i + 3) === '<i>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: currentText,
                    bold,
                    italics: italic,
                    underline: underline ? {} : undefined,
                }));
                currentText = '';
            }
            italic = true;
            i += 3;
        } else if (text.slice(i, i + 4) === '</i>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: currentText,
                    bold,
                    italics: italic,
                    underline: underline ? {} : undefined,
                }));
                currentText = '';
            }
            italic = false;
            i += 4;
        } else if (text.slice(i, i + 3) === '<u>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: currentText,
                    bold,
                    italics: italic,
                    underline: underline ? {} : undefined,
                }));
                currentText = '';
            }
            underline = true;
            i += 3;
        } else if (text.slice(i, i + 4) === '</u>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: currentText,
                    bold,
                    italics: italic,
                    underline: underline ? {} : undefined,
                }));
                currentText = '';
            }
            underline = false;
            i += 4;
        } else {
            currentText += text[i];
            i++;
        }
    }

    if (currentText) {
        runs.push(new TextRun({
            text: currentText,
            bold,
            italics: italic,
            underline: underline ? {} : undefined,
        }));
    }

    return runs.length > 0 ? runs : [new TextRun({ text: '' })];
}

const blockHandlers: Record<string, (block: any) => Paragraph | Paragraph[]> = {
    header: (block) => {
        const headerData = block.data as any;
        const level = headerData.level || 1;
        const headingLevels = [
            HeadingLevel.HEADING_1,
            HeadingLevel.HEADING_1,
            HeadingLevel.HEADING_2,
            HeadingLevel.HEADING_3,
            HeadingLevel.HEADING_4,
            HeadingLevel.HEADING_5,
            HeadingLevel.HEADING_6,
        ];
        const children = parseHtmlToTextRuns(headerData.text || '');
        return new Paragraph({
            children,
            heading: headingLevels[level] || HeadingLevel.HEADING_3,
            spacing: { after: 200 },
        });
    },

    list: (block) => {
        const listData = block.data as any;
        const items = listData.items || [];

        if (listData.style === "checklist") {
            return items.map((item: any) => {
                const checked = item.meta?.checked ? "☑" : "☐";
                const children = parseHtmlToTextRuns(`${checked} ${item.content || ''}`);
                return new Paragraph({
                    children,
                    spacing: { after: 100 },
                });
            });
        }

        if (listData.style === "ordered") {
            return items.map((item: any, idx: number) => {
                const num = idx + 1;
                const children = parseHtmlToTextRuns(`${num}. ${item.content || ''}`);
                return new Paragraph({
                    children,
                    spacing: { after: 100 },
                    indent: { left: 200 },
                });
            });
        }

        return items.map((item: any) => {
            const children = parseHtmlToTextRuns(item.content || '');
            return new Paragraph({
                children,
                bullet: { level: 0 },
                spacing: { after: 100 },
            });
        });
    },

    paragraph: (block) => {
        const paraData = block.data as any;
        const children = parseHtmlToTextRuns(paraData.text || '');
        return new Paragraph({
            children,
            spacing: { after: 150 },
        });
    },

    delimiter: () => {
        return new Paragraph({
            text: '─'.repeat(50),
            spacing: { before: 200, after: 200 },
            alignment: 'center' as any,
        });
    },

    code: (block) => {
        const codeData = block.data as any;
        const children = parseHtmlToTextRuns(codeData.code || '');
        return new Paragraph({
            children: [new TextRun({ text: codeData.code || '', font: 'Courier New', size: 20 })],
            shading: { fill: 'f0f0f0' },
            border: {
                top: { color: 'cccccc', space: 1, style: BorderStyle.SINGLE },
                bottom: { color: 'cccccc', space: 1, style: BorderStyle.SINGLE },
                left: { color: 'cccccc', space: 1, style: BorderStyle.SINGLE },
                right: { color: 'cccccc', space: 1, style: BorderStyle.SINGLE },
            },
            spacing: { after: 150, before: 150 },
            indent: { left: 200, right: 200 },
        });
    },

    quote: (block) => {
        const quoteData = block.data as any;
        const cleanText = (quoteData.text || '').replace(/&nbsp;/g, ' ');
        const captionText = (quoteData.caption || 'Anonymous').replace(/&nbsp;/g, ' ');

        return new Paragraph({
            children: [
                new TextRun({
                    text: `"${cleanText}"`,
                    italics: true,
                    size: 22,
                }),
                new TextRun({ text: '\n' }),
                new TextRun({
                    text: `— ${captionText}`,
                    italics: true,
                    size: 20,
                }),
            ],
            indent: { left: 720 },
            spacing: { before: 150, after: 150 },
            border: { left: { color: '4472c4', space: 1, style: BorderStyle.SINGLE, size: 12 } },
        });
    },

    warning: (block) => {
        const warningData = block.data as any;
        const titleText = warningData.title || 'Warning';
        const messageText = warningData.message || '';

        return [
            new Paragraph({
                children: [
                    new TextRun({ text: '⚠ ', size: 28 }),
                    new TextRun({ text: titleText, bold: true, size: 24 }),
                ],
                shading: { fill: 'fff3cd' },
                spacing: { before: 100, after: 100 },
                indent: { left: 200, right: 200 },
            }),
            new Paragraph({
                children: [new TextRun({ text: messageText })],
                shading: { fill: 'fff3cd' },
                spacing: { before: 50, after: 200 },
                indent: { left: 200, right: 200 },
            }),
        ];
    },
};

export async function editorJsToDOCX(data: EditorJsData): Promise<Buffer> {
    const children = (data.blocks || []).flatMap((block: any) => {
        const type = block.type;
        const handler = blockHandlers[type] || blockHandlers[type.toLowerCase()];

        if (!handler) {
            return [];
        }

        const result = handler(block);
        return Array.isArray(result) ? result : [result];
    });

    if (children.length === 0) {
        children.push(new Paragraph(''));
    }

    return Packer.toBuffer(new Document({ sections: [{ children }] }));
}

export async function editorJsToPDF(data: EditorJsData): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const normalFont = await pdfDoc.embedFont('Helvetica');
    const boldFont = await pdfDoc.embedFont('Helvetica-Bold');

    let page = pdfDoc.addPage([612, 792]); // US Letter size
    let yPosition = 750;
    const margin = 50;
    const bottomMargin = 50;
    const pageHeight = 792;

    const blocks = data.blocks || [];

    for (const block of blocks) {
        const type = block.type;

        // Check if we need a new page
        if (yPosition < bottomMargin + 80) {
            page = pdfDoc.addPage([612, 792]);
            yPosition = 750;
        }

        try {
            switch (type) {
                case "header":
                case "Header": {
                    const headerData = block.data as any;
                    const level = headerData.level || 1;
                    const sizes = [24, 20, 18, 16, 14, 12];
                    const size = sizes[level - 1] || 16;
                    const text = headerData.text || '';

                    // Skip empty headers
                    if (text.trim() === '') {
                        yPosition -= 5;
                        break;
                    }

                    try {
                        page.drawText(text, {
                            x: margin,
                            y: yPosition,
                            size,
                            font: boldFont,
                            color: rgb(0, 0, 0),
                            maxWidth: 500,
                        });
                    } catch (e) {
                        // If emoji causes issues, draw without it
                        const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
                        if (cleanText) {
                            page.drawText(cleanText, {
                                x: margin,
                                y: yPosition,
                                size,
                                font: boldFont,
                                color: rgb(0, 0, 0),
                                maxWidth: 500,
                            });
                        }
                    }
                    yPosition -= size + 10;
                    break;
                }

                case "paragraph":
                case "Paragraph": {
                    const paraData = block.data as any;
                    const text = paraData.text || '';

                    page.drawText(text, {
                        x: margin,
                        y: yPosition,
                        size: 11,
                        font: normalFont,
                        color: rgb(0, 0, 0),
                        maxWidth: 500,
                    });
                    yPosition -= 22;
                    break;
                };

                case "list":
                case "List": {
                    const listData = block.data as any;
                    const items = listData.items || [];

                    if (listData.style === "checklist") {
                        for (const item of items) {
                            const checked = item.meta?.checked ? "[x]" : "[ ]";
                            const text = `${checked} ${item.content || ''}`;
                            page.drawText(text, {
                                x: margin + 20,
                                y: yPosition,
                                size: 11,
                                font: normalFont,
                                color: rgb(0, 0, 0),
                                maxWidth: 480,
                            });
                            yPosition -= 18;
                        }
                    } else if (listData.style === "ordered") {
                        for (let i = 0; i < items.length; i++) {
                            const text = `${i + 1}. ${items[i].content || ''}`;
                            page.drawText(text, {
                                x: margin + 20,
                                y: yPosition,
                                size: 11,
                                font: normalFont,
                                color: rgb(0, 0, 0),
                                maxWidth: 480,
                            });
                            yPosition -= 18;
                        }
                    } else {
                        // unordered
                        for (const item of items) {
                            const text = `• ${item.content || ''}`;
                            page.drawText(text, {
                                x: margin + 20,
                                y: yPosition,
                                size: 11,
                                font: normalFont,
                                color: rgb(0, 0, 0),
                                maxWidth: 480,
                            });
                            yPosition -= 18;
                        }
                    }
                    yPosition -= 5;
                    break;
                }

                case "code":
                case "Code": {
                    const codeData = block.data as any;
                    const code = codeData.code || '';

                    const boxHeight = 35;
                    page.drawRectangle({
                        x: margin,
                        y: yPosition - boxHeight,
                        width: 500,
                        height: boxHeight,
                        color: rgb(0.94, 0.94, 0.94),
                        borderColor: rgb(0.8, 0.8, 0.8),
                        borderWidth: 1,
                    });

                    page.drawText(code, {
                        x: margin + 8,
                        y: yPosition - 20,
                        size: 9,
                        font: normalFont,
                        color: rgb(0, 0, 0),
                        maxWidth: 484,
                    });
                    yPosition -= boxHeight + 12;
                    break;
                }

                case "quote":
                case "Quote": {
                    const quoteData = block.data as any;
                    const cleanText = (quoteData.text || '').replace(/&nbsp;/g, ' ');
                    const caption = quoteData.caption || 'Anonymous';

                    page.drawText(`"${cleanText}"`, {
                        x: margin + 15,
                        y: yPosition,
                        size: 10,
                        font: normalFont,
                        color: rgb(0, 0, 0),
                        maxWidth: 480,
                    });

                    page.drawText(`— ${caption}`, {
                        x: margin + 15,
                        y: yPosition - 10,
                        size: 9,
                        font: normalFont,
                        color: rgb(0.4, 0.4, 0.4),
                        maxWidth: 480,
                    });
                    yPosition -= 35;
                    break;
                }

                case "warning":
                case "Warning": {
                    const warningData = block.data as any;
                    const title = warningData.title || 'Warning';
                    const message = warningData.message || '';
                    const boxHeight = 55;

                    page.drawText(`⚠ ${title}`, {
                        x: margin + 10,
                        y: yPosition - 12,
                        size: 11,
                        font: boldFont,
                        color: rgb(0, 0, 0),
                    });

                    page.drawText(message, {
                        x: margin + 10,
                        y: yPosition - 32,
                        size: 10,
                        font: normalFont,
                        color: rgb(0, 0, 0),
                        maxWidth: 480,
                    });
                    yPosition -= boxHeight + 12;
                    break;
                }

                case "delimiter":
                case "Delimiter": {
                    page.drawLine({
                        start: { x: margin, y: yPosition - 8 },
                        end: { x: 612 - margin, y: yPosition - 8 },
                        color: rgb(0.8, 0.8, 0.8),
                        thickness: 1,
                    });
                    yPosition -= 20;
                    break;
                }
            }
        } catch (error) {
            console.error(`Error processing block type ${type}:`, error);
        }
    }

    return pdfDoc.save();
}
