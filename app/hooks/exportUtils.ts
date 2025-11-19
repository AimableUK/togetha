import { EditorJsBlock, EditorJsData } from "@/lib/utils";
import { Document, Paragraph, Packer, HeadingLevel, BorderStyle, TextRun, AlignmentType } from 'docx';
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

// --- Docx ---
// Types
export type AlignmentType =
    | typeof HeadingLevel.HEADING_1
    | typeof HeadingLevel.HEADING_2
    | typeof HeadingLevel.HEADING_3
    | typeof HeadingLevel.HEADING_4
    | typeof HeadingLevel.HEADING_5
    | typeof HeadingLevel.HEADING_6;

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

const decodeHtmlEntities = (text: string): string => {
    const entities: { [key: string]: string } = {
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&quot;': '"',
        '&#039;': "'",
        '&apos;': "'",
        '&nbsp;': ' ',
    };

    let decoded = text;
    for (const [entity, char] of Object.entries(entities)) {
        decoded = decoded.replace(new RegExp(entity, 'g'), char);
    }
    return decoded;
};

const sanitizeText = (text: string): string => {
    if (!text) return '';

    text = decodeHtmlEntities(text);

    return text
        .replace(/&nbsp;/g, ' ')
        .replace(/→/g, '->')
        .replace(/←/g, '<-')
        .replace(/↑/g, '^')
        .replace(/↓/g, 'v')
        .replace(/⚠/g, '!')
        .replace(/✓/g, '√')
        .replace(/✔/g, 'x')
        .replace(/★/g, '*')
        .replace(/•/g, '-')
        .replace(/—/g, '-')
        .replace(/–/g, '-')
        .replace(/…/g, '...')
        .replace(/[""]/g, '"')
        .replace(/['']/g, "'")
        .replace(/'/g, "'")
        .replace(/'/g, "'")
        .replace(/’/g, "'")
        .replace(/[^\x00-\x7F]/g, (char) => {
            const map: { [key: string]: string } = {
                'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
                'á': 'a', 'à': 'a', 'â': 'a', 'ä': 'a',
                'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
                'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
                'ó': 'o', 'ò': 'o', 'ô': 'o', 'ö': 'o',
            };
            return map[char] || '-';
        });
};

const stripHtml = (text: string): string => {
    return text.replace(/<[^>]*>/g, '');
};

const getAlignment = (block: EditorJsBlock): any => {
    const alignment = block.tunes?.alignmentTune?.alignment;
    const alignmentMap: Record<string, any> = {
        'center': 'center',
        'right': 'right',
        'justify': 'justify',
    };
    return alignmentMap[alignment as string] ;
};

const parseInlineFormatting = (htmlText: string): TextRun[] => {
    const runs: TextRun[] = [];
    let currentText = '';
    let isBold = false;
    let isItalic = false;
    let isUnderline = false;

    let i = 0;
    while (i < htmlText.length) {
        if (htmlText.substr(i, 3) === '<b>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: sanitizeText(currentText),
                    bold: isBold,
                    italics: isItalic,
                    underline: isUnderline ? {} : undefined,
                }));
                currentText = '';
            }
            isBold = true;
            i += 3;
        } else if (htmlText.substr(i, 4) === '</b>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: sanitizeText(currentText),
                    bold: isBold,
                    italics: isItalic,
                    underline: isUnderline ? {} : undefined,
                }));
                currentText = '';
            }
            isBold = false;
            i += 4;
        } else if (htmlText.substr(i, 3) === '<i>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: sanitizeText(currentText),
                    bold: isBold,
                    italics: isItalic,
                    underline: isUnderline ? {} : undefined,
                }));
                currentText = '';
            }
            isItalic = true;
            i += 3;
        } else if (htmlText.substr(i, 4) === '</i>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: sanitizeText(currentText),
                    bold: isBold,
                    italics: isItalic,
                    underline: isUnderline ? {} : undefined,
                }));
                currentText = '';
            }
            isItalic = false;
            i += 4;
        } else if (htmlText.substr(i, 3) === '<u>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: sanitizeText(currentText),
                    bold: isBold,
                    italics: isItalic,
                    underline: isUnderline ? {} : undefined,
                }));
                currentText = '';
            }
            isUnderline = true;
            i += 3;
        } else if (htmlText.substr(i, 4) === '</u>') {
            if (currentText) {
                runs.push(new TextRun({
                    text: sanitizeText(currentText),
                    bold: isBold,
                    italics: isItalic,
                    underline: isUnderline ? {} : undefined,
                }));
                currentText = '';
            }
            isUnderline = false;
            i += 4;
        } else {
            currentText += htmlText[i];
            i++;
        }
    }

    if (currentText) {
        runs.push(new TextRun({
            text: sanitizeText(currentText),
            bold: isBold,
            italics: isItalic,
            underline: isUnderline ? {} : undefined,
        }));
    }

    return runs.length > 0 ? runs : [new TextRun({ text: '' })];
};

const blockHandlers: Record<string, (block: EditorJsBlock) => Paragraph | Paragraph[]> = {
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
        const text = sanitizeText(headerData.text || '');
        return new Paragraph({
            children: [new TextRun({ text, bold: true, size: 24 * 2 })],
            heading: headingLevels[level] || HeadingLevel.HEADING_3,
            spacing: { after: 200 },
            alignment: getAlignment(block),
        });
    },

    paragraph: (block) => {
        const paraData = block.data as any;
        return new Paragraph({
            children: parseInlineFormatting(paraData.text || ''),
            spacing: { after: 150 },
            alignment: getAlignment(block),
        });
    },

    list: (block) => {
        const listData = block.data as any;
        const items = listData.items || [];

        if (listData.style === 'checklist') {
            return items.map((item: any) => {
                const checked = item.meta?.checked ? '✓' : '☐';
                const text = sanitizeText(item.content || '');
                return new Paragraph({
                    children: [new TextRun({ text: `${checked} ${text}` })],
                    spacing: { after: 100 },
                    alignment: getAlignment(block),
                });
            });
        }

        if (listData.style === 'ordered') {
            return items.map((item: any, idx: number) => {
                const text = sanitizeText(item.content || '');
                return new Paragraph({
                    children: [new TextRun({ text: `${idx + 1}. ${text}` })],
                    spacing: { after: 100 },
                    indent: { left: 200 },
                    alignment: getAlignment(block),
                });
            });
        }

        // unordered
        return items.map((item: any) => {
            const text = sanitizeText(item.content || '');
            return new Paragraph({
                children: [new TextRun({ text: `- ${text}` })],
                bullet: { level: 0 },
                spacing: { after: 100 },
                indent: { left: 200 },
                alignment: getAlignment(block),
            });
        });
    },

    code: (block) => {
        const codeData = block.data as any;
        const code = sanitizeText(codeData.code || '');
        return new Paragraph({
            children: [new TextRun({
                text: code,
                font: 'Courier New',
                size: 20,
                color: '666666',
            })],
            shading: { fill: 'f0f0f0' },
            border: {
                top: { color: 'cccccc', space: 1, style: BorderStyle.SINGLE, size: 6 },
                bottom: { color: 'cccccc', space: 1, style: BorderStyle.SINGLE, size: 6 },
                left: { color: 'cccccc', space: 1, style: BorderStyle.SINGLE, size: 6 },
                right: { color: 'cccccc', space: 1, style: BorderStyle.SINGLE, size: 6 },
            },
            spacing: { after: 150, before: 150 },
            indent: { left: 200, right: 200 },
            alignment: getAlignment(block),
        });
    },

    quote: (block) => {
        const quoteData = block.data as any;
        const text = sanitizeText(quoteData.text || '');
        const caption = sanitizeText(quoteData.caption || 'Anonymous');
        return new Paragraph({
            children: [
                new TextRun({
                    text: `"${text}"`,
                    italics: true,
                    size: 22 * 2,
                }),
                new TextRun({ text: '\n' }),
                new TextRun({
                    text: `- ${caption}`,
                    italics: true,
                    size: 20,
                    color: '666666',
                }),
            ],
            indent: { left: 720 },
            spacing: { before: 150, after: 150 },
            border: { left: { color: '4472c4', space: 1, style: BorderStyle.SINGLE, size: 12 } },
            alignment: getAlignment(block),
        });
    },

    warning: (block) => {
        const warningData = block.data as any;
        const title = sanitizeText(warningData.title || 'Warning');
        const message = sanitizeText(warningData.message || '');
        return [
            new Paragraph({
                children: [
                    new TextRun({ text: '[!] ', bold: true, size: 24 }),
                    new TextRun({ text: title, bold: true, size: 24 }),
                ],
                shading: { fill: 'fff3cd' },
                spacing: { before: 100, after: 100 },
                indent: { left: 200, right: 200 },
                alignment: getAlignment(block),
            }),
            new Paragraph({
                children: [new TextRun({ text: message })],
                shading: { fill: 'fff3cd' },
                spacing: { before: 50, after: 200 },
                indent: { left: 200, right: 200 },
                alignment: getAlignment(block),
            }),
        ];
    },

    delimiter: (block) => {
        return new Paragraph({
            children: [new TextRun({ text: '─'.repeat(50) })],
            spacing: { before: 200, after: 200 },
            alignment: getAlignment(block),
        });
    },

    image: (block) => {
        const imageData = block.data as any;
        const caption = sanitizeText(imageData.caption || 'Image');
        return new Paragraph({
            children: [new TextRun({ text: `[Image: ${caption}]`, italics: true })],
            spacing: { after: 150 },
            alignment: getAlignment(block),
        });
    },

    video: (block) => {
        const videoData = block.data as any;
        const caption = sanitizeText(videoData.caption || 'Video');
        return new Paragraph({
            children: [new TextRun({ text: `[Video: ${caption}]`, italics: true })],
            spacing: { after: 150 },
            alignment: getAlignment(block),
        });
    },
};

export async function editorJsToDOCX(data: EditorJsData): Promise<Buffer> {
    const children = (data.blocks || []).flatMap((block: EditorJsBlock) => {
        const type = block.type;
        const handler = blockHandlers[type] || blockHandlers[type.toLowerCase()];

        if (!handler) {
            console.warn(`No handler for block type: ${type}`);
            return [];
        }

        try {
            const result = handler(block);
            return Array.isArray(result) ? result : [result];
        } catch (error) {
            console.error(`Error processing block type ${type}:`, error);
            return [new Paragraph({ children: [new TextRun({ text: '[Error processing block]' })] })];
        }
    });

    if (children.length === 0) {
        children.push(new Paragraph(''));
    }

    return Packer.toBuffer(new Document({ sections: [{ children }] }));
}

// --- PDF ---

const wrapText = (text: string, maxWidth: number, fontSize: number, font: any): string[] => {
    const words = text.split(' ').filter(w => w.trim());
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (textWidth > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines.length > 0 ? lines : [''];
};

export async function editorJsToPDF(data: EditorJsData): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const normalFont = await pdfDoc.embedFont('Helvetica');
    const boldFont = await pdfDoc.embedFont('Helvetica-Bold');

    let page = pdfDoc.addPage([612, 792]); // US Letter size
    let yPosition = 750;
    const margin = 50;
    const bottomMargin = 50;
    const pageWidth = 612;
    const textWidth = pageWidth - (margin * 2);

    const blocks = data.blocks || [];

    for (const block of blocks) {
        const type = block.type?.toLowerCase();

        try {
            switch (type) {
                case 'header': {
                    const headerData = block.data as any;
                    const level = headerData.level || 1;
                    const sizes = [24, 20, 18, 16, 14, 12];
                    const size = sizes[level - 1] || 16;
                    const rawText = headerData.text || '';
                    const text = sanitizeText(stripHtml(rawText));

                    if (text.trim() === '') {
                        yPosition -= 10;
                        break;
                    }

                    // Check page space
                    if (yPosition < bottomMargin + size + 20) {
                        page = pdfDoc.addPage([612, 792]);
                        yPosition = 750;
                    }

                    const lines = wrapText(text, textWidth, size, boldFont);
                    for (const line of lines) {
                        page.drawText(line, {
                            x: margin,
                            y: yPosition,
                            size,
                            font: boldFont,
                            color: rgb(0, 0, 0),
                        });
                        yPosition -= size + 4;
                    }
                    yPosition -= 8;
                    break;
                }

                case 'paragraph': {
                    const paraData = block.data as any;
                    const rawText = paraData.text || '';
                    const text = sanitizeText(stripHtml(rawText));

                    if (text.trim() === '') {
                        yPosition -= 10;
                        break;
                    }

                    // Check page space
                    if (yPosition < bottomMargin + 30) {
                        page = pdfDoc.addPage([612, 792]);
                        yPosition = 750;
                    }

                    const lines = wrapText(text, textWidth, 11, normalFont);
                    for (const line of lines) {
                        page.drawText(line, {
                            x: margin,
                            y: yPosition,
                            size: 11,
                            font: normalFont,
                            color: rgb(0, 0, 0),
                        });
                        yPosition -= 18;
                    }
                    yPosition -= 8;
                    break;
                }

                case 'list': {
                    const listData = block.data as any;
                    const items = listData.items || [];

                    if (items.length === 0) break;

                    if (yPosition < bottomMargin + items.length * 20) {
                        page = pdfDoc.addPage([612, 792]);
                        yPosition = 750;
                    }

                    const listTextWidth = textWidth - 40;

                    if (listData.style === 'checklist') {
                        for (const item of items) {
                            const checked = item.meta?.checked ? '[x]' : '[ ]';
                            const rawText = item.content || '';
                            const text = sanitizeText(stripHtml(rawText));

                            if (!text.trim()) continue;

                            const lines = wrapText(text, listTextWidth, 11, normalFont);

                            page.drawText(checked, {
                                x: margin + 20,
                                y: yPosition,
                                size: 11,
                                font: normalFont,
                                color: rgb(0, 0, 0),
                            });

                            for (let i = 0; i < lines.length; i++) {
                                page.drawText(lines[i], {
                                    x: margin + 40,
                                    y: yPosition - i * 18,
                                    size: 11,
                                    font: normalFont,
                                    color: rgb(0, 0, 0),
                                });
                            }
                            yPosition -= lines.length * 18 + 4;
                        }
                    } else if (listData.style === 'ordered') {
                        for (let i = 0; i < items.length; i++) {
                            const rawText = items[i].content || '';
                            const text = sanitizeText(stripHtml(rawText));

                            if (!text.trim()) continue;

                            const lines = wrapText(text, listTextWidth, 11, normalFont);

                            page.drawText(`${i + 1}.`, {
                                x: margin + 20,
                                y: yPosition,
                                size: 11,
                                font: normalFont,
                                color: rgb(0, 0, 0),
                            });

                            for (let j = 0; j < lines.length; j++) {
                                page.drawText(lines[j], {
                                    x: margin + 40,
                                    y: yPosition - j * 18,
                                    size: 11,
                                    font: normalFont,
                                    color: rgb(0, 0, 0),
                                });
                            }
                            yPosition -= lines.length * 18 + 4;
                        }
                    } else {
                        // unordered
                        for (const item of items) {
                            const rawText = item.content || '';
                            const text = sanitizeText(stripHtml(rawText));

                            if (!text.trim()) continue;

                            const lines = wrapText(text, listTextWidth, 11, normalFont);

                            page.drawText('-', {
                                x: margin + 20,
                                y: yPosition,
                                size: 11,
                                font: normalFont,
                                color: rgb(0, 0, 0),
                            });

                            for (let i = 0; i < lines.length; i++) {
                                page.drawText(lines[i], {
                                    x: margin + 40,
                                    y: yPosition - i * 18,
                                    size: 11,
                                    font: normalFont,
                                    color: rgb(0, 0, 0),
                                });
                            }
                            yPosition -= lines.length * 18 + 4;
                        }
                    }
                    yPosition -= 8;
                    break;
                }

                case 'code': {
                    const codeData = block.data as any;
                    const code = sanitizeText(codeData.code || '');

                    if (!code.trim()) break;

                    if (yPosition < bottomMargin + 80) {
                        page = pdfDoc.addPage([612, 792]);
                        yPosition = 750;
                    }

                    const lines = code.split('\n');
                    const boxHeight = Math.max(50, lines.length * 16 + 20);

                    page.drawRectangle({
                        x: margin,
                        y: yPosition - boxHeight,
                        width: textWidth,
                        height: boxHeight,
                        color: rgb(0.94, 0.94, 0.94),
                        borderColor: rgb(0.8, 0.8, 0.8),
                        borderWidth: 1,
                    });

                    let codeY = yPosition - 15;
                    for (const line of lines) {
                        if (codeY < bottomMargin) {
                            page = pdfDoc.addPage([612, 792]);
                            codeY = 750;
                        }
                        page.drawText(line, {
                            x: margin + 8,
                            y: codeY,
                            size: 9,
                            font: normalFont,
                            color: rgb(0, 0, 0),
                            maxWidth: textWidth - 16,
                        });
                        codeY -= 14;
                    }
                    yPosition -= boxHeight + 15;
                    break;
                }

                case 'quote': {
                    const quoteData = block.data as any;
                    const rawText = quoteData.text || '';
                    const text = sanitizeText(stripHtml(rawText));
                    const caption = sanitizeText(quoteData.caption || 'Anonymous');

                    if (!text.trim()) break;

                    if (yPosition < bottomMargin + 50) {
                        page = pdfDoc.addPage([612, 792]);
                        yPosition = 750;
                    }

                    const quoteTextWidth = textWidth - 30;
                    const quoteLines = wrapText(text, quoteTextWidth, 10, normalFont);

                    let quoteY = yPosition;
                    for (const line of quoteLines) {
                        page.drawText(`"${line}"`, {
                            x: margin + 15,
                            y: quoteY,
                            size: 10,
                            font: normalFont,
                            color: rgb(0, 0, 0),
                        });
                        quoteY -= 18;
                    }

                    page.drawText(`- ${caption}`, {
                        x: margin + 15,
                        y: quoteY,
                        size: 9,
                        font: normalFont,
                        color: rgb(0.4, 0.4, 0.4),
                    });

                    yPosition = quoteY - 20;
                    break;
                }

                case 'warning': {
                    const warningData = block.data as any;
                    const title = sanitizeText(warningData.title || 'Warning');
                    const message = sanitizeText(warningData.message || '');

                    if (!title.trim() && !message.trim()) break;

                    if (yPosition < bottomMargin + 80) {
                        page = pdfDoc.addPage([612, 792]);
                        yPosition = 750;
                    }

                    const warningTextWidth = textWidth - 40;
                    const messageLines = wrapText(message, warningTextWidth, 10, normalFont);
                    const boxHeight = Math.max(70, messageLines.length * 14 + 40);

                    page.drawRectangle({
                        x: margin,
                        y: yPosition - boxHeight,
                        width: textWidth,
                        height: boxHeight,
                        color: rgb(1, 0.96, 0.88),
                        borderColor: rgb(1, 0.84, 0.5),
                        borderWidth: 1,
                    });

                    page.drawText(`[!] ${title}`, {
                        x: margin + 10,
                        y: yPosition - 15,
                        size: 11,
                        font: boldFont,
                        color: rgb(0, 0, 0),
                    });

                    let messageY = yPosition - 35;
                    for (const line of messageLines) {
                        page.drawText(line, {
                            x: margin + 10,
                            y: messageY,
                            size: 10,
                            font: normalFont,
                            color: rgb(0, 0, 0),
                        });
                        messageY -= 14;
                    }

                    yPosition -= boxHeight + 15;
                    break;
                }

                case 'delimiter': {
                    if (yPosition < bottomMargin + 40) {
                        page = pdfDoc.addPage([612, 792]);
                        yPosition = 750;
                    }

                    page.drawLine({
                        start: { x: margin, y: yPosition - 10 },
                        end: { x: pageWidth - margin, y: yPosition - 10 },
                        color: rgb(0.8, 0.8, 0.8),
                        thickness: 1,
                    });
                    yPosition -= 30;
                    break;
                }
            }
        } catch (error) {
            console.error(`Error processing block type ${type}:`, error);
        }
    }

    return pdfDoc.save();
}

