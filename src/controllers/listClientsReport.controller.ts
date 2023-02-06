import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import printReport from "../utils/printReport";
import date from "date-and-time";
import { Request, Response } from "express";

const listClientsReportController = async (
  request: Request,
  response: Response
) => {
  const res = await printReport();

  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const printer = new PdfPrinter(fonts);

  const now = new Date();
  const value = date.format(now, "YYYY/MM/DD HH:mm:ss");

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: "Helvetica" },
    content: [
      {
        columns: [
          { text: "Relatório de clientes cadastrados", style: "header" },
        ],
      },
      {
        table: {
          heights: function (row) {
            return 20;
          },
          body: [
            [
              { text: "Id", style: "columnsTitle" },
              { text: "Name", style: "columnsTitle" },
              { text: "Email", style: "columnsTitle" },
              { text: "Contato", style: "columnsTitle" },
              { text: "Data de registro", style: "columnsTitle" },
            ],
            ...res,
          ],
        },
      },
    ],
    footer: [{ text: `Relatório Puke Pill - ${value}`, style: "footer" }],
    styles: {
      header: {
        fontSize: 15,
        bold: true,
        margin: [0, 0, 0, 15],
        alignment: "center",
      },
      columnsTitle: {
        fontSize: 10,
        bold: true,
        fillColor: "#E56353",
        color: "#FFF",
        alignment: "center",
        margin: 5,
      },
      footer: {
        alignment: "center",
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinitions);

  const chunks = [] as any;

  pdfDoc.on("data", (chunck) => {
    chunks.push(chunck);
  });
  pdfDoc.end();

  pdfDoc.on("end", () => {
    const result = Buffer.concat(chunks);
    response.end(result);
  });
};

export default listClientsReportController;
