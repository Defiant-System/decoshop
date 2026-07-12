
const Filters = {
	init() {
		// anything todo?
	},
	grayscale() {
		PP.TA({ G: CanvasTools.Qi, data: { a: "auto", nx: 3 } });
		PP.update();
	},
	invert() {
		PP.TA({ G: CanvasTools.Qi, data: { a: "start", ce: "nvrt" } });
		PP.update();
	},
	blur(_K="Blr ") {
		PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K, qv: null, ve: false } });
		PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K } });
		PP.update();
	},
	clouds(_K="Clds") {
		PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K, qv: null, ve: false } });
		PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K } });
		PP.update();
	},
	noise() {
		// Despeckle
		PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Dspc", qv: null, ve: false } });
		PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Dspc" } });
		PP.update();
	},
	sharpen(_K="Shrp") {
		PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K, qv: null, ve: false } });
		PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K } });
		PP.update();
	},
};
