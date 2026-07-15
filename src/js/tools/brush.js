
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
			case "mouseenter":
				// replaces mouse cursor with tip canvas
				Self.els.wrapper.addClass("show-tip");
				break;
			case "mouseleave":
				// reset canvas
				Self.els.wrapper.removeClass("show-tip");
				break;
			case "mousedown":
				Self[`${Self.option}Tool`](event);
				break;
			case "mousemove":
				if (!event.top) {
					el = APP.els.cvs;
					rect = el[0].getBoundingClientRect();
				}
				top = event.top || (event.clientY - rect.top) * DPR;
				left = event.left || (event.clientX - rect.left) * DPR;
				// move tip
				Self.els.tip.css({ top, left });
				break;

			case "select-option":
				Self.option = event.arg || Self.option || "brush";
				break;
			case "enable":
				// active canvas tool
				Self.tool = new CanvasTools.Yv();
				// fast references
				Self.els = {
					wrapper: APP.els.content.find(`.cvs-wrapper`),
					tip: APP.els.content.find(`.cvs-wrapper .tool-tip`),
				};

				// set draw color
				APP.file?.dispatch({ type: "set-foreground-color", rgb: [255,180,0] });

				// bind event handlers
				APP.els.cvs.on("mousedown mousemove mouseenter mouseleave", Self.dispatch);
				break;
			case "disable":
				// hide tip canvas
				// Self.els.tip.addClass("hidden");
				Self.els.wrapper.removeClass("show-tip");
				// unbind event handlers
				APP.els.cvs.off("mousedown mousemove mouseenter mouseleave", Self.dispatch);
				break;
		}
	},
	pencilTool(event) {
		console.log("pencil", event);
	},
	brushTool(event) {
		let APP = decoshop,
			Self = APP.tools.brush,
			Drag = Self.drag;
		// console.log(event);
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
				APP.els.content.addClass("cover");
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
				APP.els.content.removeClass("cover");
				// unbind event handlers
				APP.els.doc.off("mousemove mouseup", Self.brushTool);
				break;
		}
	},
}
