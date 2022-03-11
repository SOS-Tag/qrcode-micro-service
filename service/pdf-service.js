import PDFDocument from "pdfkit";

function buildPDF(qrcode, shortUrl, dataCallback, endCallback) {
	const doc = new PDFDocument({ bufferPages: true, font: "Courier" });

	const imageSize = 450;
	const textWidth = 450;

	doc.on("data", dataCallback);
	doc.on("end", endCallback);
	doc
		.image(
			qrcode,
			doc.page.width / 2 - imageSize / 2,
			doc.page.height / 2 - imageSize / 2,
			{ fit: [imageSize, imageSize], align: "center", valign: "center" }
		)
		.rect(0, 0, imageSize, imageSize)
		.stroke();

	doc.fontSize(35);
	doc.text(
		shortUrl,
		doc.page.width / 2 - textWidth / 2,
		doc.page.height - 100,
		{
			width: textWidth,
			lineBreak: false,
			align: "center",
		}
	);

	doc.end();
}

export default buildPDF;
