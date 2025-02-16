import fs from 'fs';
import path from 'path';
import { PDFDocument } from '../src/index';

const inputPath = path.join(
  __dirname,
  '..',
  'assets',
  'pdfs',
  'american_flag.pdf',
);

const outputPath = path.join(
  __dirname,
  '..',
  'assets',
  'pdfs',
  'american_flag_page_0.pdf',
);

(async () => {
  const src = fs.readFileSync(inputPath);
  const srcDoc = await PDFDocument.load(src);
  const dstDoc = await PDFDocument.create();

  const [extractedPage] = await dstDoc.copyPages(srcDoc, [0]);
  dstDoc.addPage(extractedPage);

  const dst = await dstDoc.save();

  fs.writeFileSync(outputPath, dst);
})();
