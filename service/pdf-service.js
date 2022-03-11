import PDFDocument from "pdfkit";

function buildPDF(qrcode, dataCallback, endCallback) {
	const doc = new PDFDocument({ bufferPages: true, font: "Courier" });

	doc.on("data", dataCallback);
	doc.on("end", endCallback);

	doc.image(qrcode, {
		scale: 0.25,
		align: "center",
		valign: "center",
	});

	doc.end();
}

export default buildPDF;
