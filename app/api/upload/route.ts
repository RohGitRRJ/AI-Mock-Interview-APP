import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4} from 'uuid';
import PDFParser from 'pdf2json';
import path from 'path';
// export const config = {
//   runtime: 'nodejs',
// };
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll('filepond');
  let fileName = '';
  let parsedText = '';

  console.log('Uploaded files:', uploadedFiles);
  console.log(formData);

  if (uploadedFiles && uploadedFiles.length > 0) {
    // const uploadedFile = uploadedFiles[0];

    // console.log('Uploaded file type:', typeof uploadedFile);
    // console.log('Uploaded file instance:', uploadedFile);

    // if (uploadedFile instanceof File) {
    //   console.log('Uploaded file is a File instance:', uploadedFile);

    //   fileName = uuidv4();
    //   const tempDir = path.join('/tmp');
    //   const tempFilePath = path.join(tempDir, `${fileName}.pdf`);

    //   await fs.mkdir(tempDir, { recursive: true });

    //   const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    //   const uint8Array = new Uint8Array(fileBuffer);
    //   await fs.writeFile(tempFilePath, uint8Array);

    //   parsedText = await new Promise<string>((resolve, reject) => {
    //     const pdfParser = new (PDFParser as any)(null, 1);

    //     pdfParser.on('pdfParser_dataError', (errData: any) => {
    //       // console.error(errData.parserError);
    //       console.error("PDF Parse Error", errData);
    //       reject(errData.parserError);
    //     });

    //     pdfParser.on('pdfParser_dataReady', () => {
    //       console.log("PDF Parsed Successfully");
    //       resolve((pdfParser as any).getRawTextContent());
    //     });

    //     pdfParser.loadPDF(tempFilePath);
    //   });
    // } 
    const file = uploadedFiles.find((f) => f instanceof File);

if (file && file instanceof File) {
  console.log('Using file:', file);

  fileName = uuidv4();
  const tempDir = path.join('/tmp');
  const tempFilePath = path.join(tempDir, `${fileName}.pdf`);

  await fs.mkdir(tempDir, { recursive: true });

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const uint8Array = new Uint8Array(fileBuffer);
  await fs.writeFile(tempFilePath, uint8Array);

  parsedText = await new Promise<string>((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on('pdfParser_dataError', (errData: any) => {
      console.error("PDF Parse Error:", errData.parserError);
      reject(errData.parserError);
    });

    pdfParser.on('pdfParser_dataReady', () => {
      console.log("PDF Parsed Successfully");
      resolve(pdfParser.getRawTextContent());
    });

    pdfParser.loadPDF(tempFilePath);
  });
} 

    else {
      console.log('Uploaded file is not in the expected format.');
    }
  } 
  else {
    console.log('No files found.');
  }

  console.log('Parsed text:', parsedText);

  return new NextResponse(parsedText, {
    headers: {
      'Content-Type': 'text/plain',
      'FileName': fileName,
    },
  });
}
