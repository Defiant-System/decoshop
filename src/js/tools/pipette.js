
// decoshop.tools.pipette

{
	init() {
		this.option = "pipette";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.pipette,
			el;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				Self.rect = Self.els.helpers[0].getBoundingClientRect();
				let { clientX, clientY, offsetX, offsetY } = event;
				Self.dispatch({ type: "mousemove", clientX, clientY, offsetX, offsetY });
				Self.els.sampler.addClass("show");
				break;
			case "mouseup":
				Self.els.sampler.removeClass("show");
				delete Self.rect;
				break;
			case "mousemove":
				if (!Self.rect) return;

				let Doc = APP.file.doc,
					docPoint = Doc.u.Zx(event.offsetX, event.offsetY),
					pixelCoord = new Point2D(Math.floor(docPoint.x), Math.floor(docPoint.y)),
					top = (event.clientY - Self.rect.top) * DPR,
					left = (event.clientX - Self.rect.left) * DPR,
					r = 0,
					g = 0,
					b = 0,
					a = 0;
				// Sample composite pixels when cursor is in-bounds and no vector selection is active
				if (!Doc.ajH() && new Rect(0, 0, Doc.m - 1, Doc.n - 1).xC(pixelCoord)) {
					let composite = Doc.LT(),
						pixelOffset = Doc.m * pixelCoord.y + pixelCoord.x << 2;
					r = composite[pixelOffset + 0],
					g = composite[pixelOffset + 1],
					b = composite[pixelOffset + 2],
					a = composite[pixelOffset + 3];
				}
				let curr = "#233",
					over = a === 0 ? curr : ColorLib.rgbToHex({ r, g, b, a });
				// move tip
				Self.els.sampler.css({ top, left, "--over": over, "--curr": curr });
				break;

			// custom events
			case "select-option":
				Self.option = event.arg || "pipette";
				break;
			case "enable":
				// fast references
				Self.els = {
					wrapper: APP.els.content.find(`.cvs-wrapper`),
					helpers: APP.els.content.find(`.cvs-helpers`),
					sampler: APP.els.content.find(`.cvs-helpers .color-sampler`),
				};
				// set cursor
				APP.els.content.addClass(`cursor-pipette-1`);
				// bind event handlers
				APP.els.cvs.on("mousedown mousemove mouseup", Self.dispatch);
				break;
			case "disable":
				// set cursor
				APP.els.content.removeClass(`cursor-pipette-1`);
				// unbind event handlers
				APP.els.cvs.off("mousedown mousemove mouseup", Self.dispatch);
				break;
		}
	}
}
