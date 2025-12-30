/* eslint-disable @typescript-eslint/no-require-imports */
// CommonJS wrapper for pdf-parse to ensure proper module resolution in Next.js
// pdf-parse v2 uses a class-based API
const { PDFParse } = require("pdf-parse");

module.exports = PDFParse;
