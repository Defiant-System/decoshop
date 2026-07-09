
// decoshop.tools.brush

{
	init() {
		// default option
		this.option = "brush";
		// default feather options
		this.feather = {
			brush: "sketchy",
			blend: "source-over",
			pressure: 100,
			size: 1,
		};

		let xShape = window.bluePrint.selectSingleNode("//TipShapes/*");

		// default preset
		this.preset = {
			name      : xShape.getAttribute("name"),
			roundness : +xShape.getAttribute("roundness"),
			angle     : +xShape.getAttribute("angle"),
			size      : +xShape.getAttribute("size"),
			tip       : Misc.createCanvas(30, 30),
			blend     : "normal",
			opacity   : 1,
		};
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.brush,
			top, left,
			rect,
			el;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				Self[`${Self.option}Tool`](event);
				break;
			case "mousemove":
				if (!event.top) {
					el = APP.els.cvs;
					rect = el[0].getBoundingClientRect();
				}
				// move tip
				top = event.top || (event.clientY - rect.top) * DPR;
				left = event.left || (event.clientX - rect.left) * DPR;
				Self.tip.css({ top, left });
				// update tip canvas if needed
				let docZoom = Self.doc?.u?.N || 1;
				if (Self.tipZoom !== docZoom) Self.updateTip();
				break;

			case "select-option":
				Self.option = event.arg || Self.option || "brush";
				break;
			case "enable":
				// fast reference to doc
				Self.doc = APP.file?.doc;
				// active canvas tool
				Self.tool = new CanvasTools.Yv();
				// mousemove for tool tip
				Self.tip = APP.els.content.find(`.cvs-wrapper .tool-tip`).removeClass("hidden");
				Self.tipCtx = Self.tip[0].getContext("2d", { willReadFrequently: true });
				Self.updateTip();
				// replaces mouse cursor with tip canvas
				APP.els.content.addClass("show-tip");

				// set draw color
				APP.file?.dispatch({ type: "set-foreground-color", rgb: [255,180,0] });

				// bind event handlers
				APP.els.cvs.on("mousedown mousemove", Self.dispatch);
				break;
			case "disable":
				// hide tip canvas
				Self.tip.addClass("hidden");
				// reset canvas
				APP.els.content.removeClass("show-tip");
				// unbind event handlers
				APP.els.cvs.off("mousedown mousemove", Self.dispatch);
				break;
		}
	},
	updateTip() {
		let APP = decoshop,
			Self = APP.tools.brush;

		if (!Self.tool) Self.tool = new CanvasTools.Yv();
		Self.tipZoom = Self.doc?.u?.N || 1;
		Self.tipData = BrushEngine.$I(Self.tool.HS.brush, PP.fB.pO.BF, Self.tipZoom, false);
		if (!Self.tipCtx) return;

		let { m: width, n: height } = Self.tipData.vD,
			iData = new ImageData(new Uint8ClampedArray(Self.tipData.Wq.buffer), width, height);
		Self.tip.attr({ width, height });
		Self.tipCtx.putImageData(iData, 0, 0);
		Self.tip.css({ width, height });
	},
	brushTool(event) {
		let APP = decoshop,
			Self = APP.tools.brush,
			Drag = Self.drag;

		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();

				let el = APP.els.cvs,
					rect = el[0].getBoundingClientRect(),
					doc = APP.file?.doc,
					pp = PP,
					pointer = {
						x: (event.clientX - rect.left) * DPR,
						y: (event.clientY - rect.top) * DPR,
						oW: true,
						uT: 1,
					};
				// select layer
				doc.g = [0];
				// init tool
				Self.tool.enable(doc, PP, PP.fB, PP.Ib);
				Self.tool.dJ(doc, PP, PP.fB, PP.Ib, pointer);
				PP.update(true);
				// drag info
				Self.drag = { el, pp, doc, pointer, rect };

				// prevent mouse from triggering mouseover
				APP.els.content.addClass("no-cursor");
				// bind event handlers
				APP.els.doc.on("mousemove mouseup", Self.brushTool);
				break;
			case "mousemove":
				let x = (event.clientX - Drag.rect.left) * DPR,
					y = (event.clientY - Drag.rect.top) * DPR;
				Self.tool.JP(Drag.doc, Drag.pp, Drag.pp.fB, Drag.pp.Ib, { ...Drag.pointer, x, y });
				Drag.pp.update(true);
				Self.dispatch({ type: "mousemove", top: y, left: x });
				break;
			case "mouseup":
				Self.tool.Nl(Drag.doc, Drag.pp, Drag.pp.fB, Drag.pp.Ib, { ...Drag.pointer, oW: false });
				Drag.pp.update(true);

				// remove class
				APP.els.content.removeClass("no-cursor");
				// unbind event handlers
				APP.els.doc.off("mousemove mouseup", Self.brushTool);
				break;
		}
	},
	pencilTool(event) {
		console.log("pencil", event);
	},
	heatherTool(event) {
		console.log("pencil", event);
	},
}
