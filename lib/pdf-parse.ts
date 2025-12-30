// Utility module to handle pdf-parse CommonJS import
// This ensures proper handling of the CommonJS module in Next.js

// Import from CommonJS wrapper that properly handles the module
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFParse = require("./pdf-parse-wrapper.js");

export async function parsePdf(buffer: Buffer): Promise<{
  text: string;
  numPages: number;
  info: unknown;
  metadata: unknown;
}> {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    await parser.destroy();
    return {
      text: result.text || "",
      numPages: result.total || 0,
      info: result.info || null,
      metadata: result.metadata || null,
    };
  } catch (error) {
    await parser.destroy().catch(() => {
      // Ignore destroy errors
    });
    throw error;
  }
}
