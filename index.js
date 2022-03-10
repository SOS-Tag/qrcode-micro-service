import { customAlphabet } from "nanoid";
import express from "express";
import QRCode from "qrcode";

import Canvas from "canvas";

const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ234578", 8);
const regex = new RegExp("((?![0169IO])[A-Z0-9]){8}");

const app = express();

const res = {};

const IdGenerator = () => {
	return nanoid();
};

const drawQR = () => {
	const canvas = Canvas.createCanvas(400, 400);
	const ctx = canvas.getContext("2d");

	return canvas;
};

const QRCodeOptions = {
	errorCorrectionLevel: "H",
	type: "image/png",
	margin: 1,
	scale: 30,
	color: {
		dark: "#0B1F50",
		light: "#FFFFFF",
	},
};

app.get("/id", (req, res) => {
	const generatedId = IdGenerator();
	if (!regex.test(generatedId)) {
		res
			.status(500)
			.send({ error: "Id doesn't comply with standards - REGEX ERROR" });
	} else {
		res.status(200).json(IdGenerator());
	}
});

app.get("/check/:id", (req, res) => {
	const QRCodeId = req.params.id;
	if (!regex.test(QRCodeId)) {
		res.status(200).send({ result: false });
	} else {
		res.status(200).send({ result: true });
	}
});

app.get("/:id", (req, res) => {
	const QRCodeId = req.params.id;

	if (!regex.test(QRCodeId)) {
		res
			.status(500)
			.send({ error: "Id doesn't comply with standards - REGEX ERROR" });
	} else {
		res.setHeader("Content-Type", "image/png");
		const QRCanvas = drawQR();

		const url = "https://www.sostag.tech/" + QRCodeId;
		console.log(url);

		QRCode.toCanvas(QRCanvas, url, QRCodeOptions, function (err, url) {});

		QRCanvas.pngStream().pipe(res);

		res.status(200);
	}
});

app.get("/pdf/:id", (req, res) => {
	if (!regex.test(QRCodeId)) {
		res
			.status(500)
			.send({ error: "Id doesn't comply with standards - REGEX ERROR" });
	} else {
		res.setHeader("Content-Type", "image/png");
		const QRCanvas = drawQR();

		const url = "https://www.sostag.tech/" + QRCodeId;
		console.log(url);

		QRCode.toCanvas(QRCanvas, url, QRCodeOptions, function (err, url) {});

		QRCanvas.pngStream().pipe(res);

		res.status(200);
	}
});

app.listen(8080, () => {
	console.log("Server running");
});