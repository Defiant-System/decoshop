
// decoshop.tools.shape

{
	init() {
		// fast references
		this.rootEl = window.find(`.tool-options-shape`);
		this.handleBox = decoshop.els.handleBox;
		// handle-box types
		this.shapes = "circle ellipse rect polygon polyline path image line bezier".split(" ");
		// defaults
		this.option = "shape";
	},
	dispatch(event) {
		let APP = decoshop,
			File = APP.file,
			Self = APP.tools.shape,
			el;
		// console.log(event);
		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "shape";
				break;
			case "re-focus-shape":
				el = Self.svgItem;
				Self.dispatch({
					type: "focus-shape",
					oTop: File.oY + parseInt(el.css("top"), 10),
					oLeft: File.oX + parseInt(el.css("left"), 10),
					oWidth: parseInt(el.css("width"), 10),
					oHeight: parseInt(el.css("height"), 10),
					el,
				});
				break;
			case "focus-shape":
				// UI update handle-box
				let names = Self.shapes.join(","),
					child = event.el.find(names).get(0),
					name = child.prop("nodeName"),
					cn = ["show"],
					radius = +child.attr("rx"),
					angle = event.el.attr("rotate") || 0,
					css = {
						top: event.oTop,
						left: event.oLeft,
						width: event.oWidth,
						height: event.oHeight,
						"--rotate": `${angle}deg`,
						"--rc": `${radius-4}px`,
					};
				// this is temp solution
				// if (name === "path" && child.attr("d").split(" ").length === 4) {
				// 	name = "bezier";
				// }

				// reference to selected shape
				Self.svgItem = event.el;
				Self.shape = child;
				Self.shapeName = name;

				// shape has gradient
				let fill = Self.shape.css("fill"),
					stroke = Self.shape.css("stroke");
				if (fill === "none") fill = "rgba(0,0,0,0)";
				if (stroke === "none") stroke = "rgba(0,0,0,0)";
				
				if (fill.startsWith("url(")) {
					let xNode = event.el.find(fill.slice(5,-2)),
						gradientType = xNode.prop("nodeName"),
						top, left, width,
						dx, dy,
						angle;
					switch (gradientType) {
						case "radialGradient":
							top = (+xNode.attr("cy") * event.oHeight) + 1;
							left = (+xNode.attr("cx") * event.oWidth) + 1;
							width = +xNode.attr("r") * event.oWidth;
							angle = 45;
							break;
						case "linearGradient":
							top = ((+xNode.attr("y1") || 0) * event.oHeight) + 1;
							left = ((+xNode.attr("x1") || 0) * event.oWidth) + 1;
							dy = (+xNode.attr("y2") * event.oHeight) - top + 1;
							dx = (+xNode.attr("x2") * event.oWidth) - left + 1;
							width = Math.round(Math.sqrt(dx*dx + dy*dy));
							angle = Math.round(Math.atan2(dy, dx) * (180 / Math.PI));
							break;
					}
					css["--g-top"] = `${top}px`;
					css["--g-left"] = `${left}px`;
					css["--g-width"] = `${width}px`;
					css["--g-angle"] = `${angle}deg`;
					// add to class names
					cn.push("has-gradient");

					fill = ColorLib.gradientToStrip(xNode);
				} else {
					fill = ColorLib.rgbToHex(fill);
				}
				// update tool options bar
				Self.dispatch({
					type: "update-tool-options",
					strokeWidth: +child.attr("stroke-width"),
					fill,
					stroke,
					angle,
					radius,
					css,
				});
				// show handle-box
				Self.handleBox
					.removeClass("has-gradient")
					.addClass(cn.join(" "))
					.data({ type: name === "rect" ? "rect" : "box" })
					.css(css);
				break;
			case "update-tool-options":
				Self.rootEl.find(".fill-color").css({ "--color": event.fill });
				Self.rootEl.find(".stroke-color").css({ "--color": event.stroke });
				// stroke width
				el = Self.rootEl.find(`.option[data-arg="stroke-width"]`);
				el.find(`.value`).html(`${event.strokeWidth}${el.data("suffix")}`);

				el = Self.rootEl.find(".shape-width");
				el.html(`${event.css.width}${el.data("suffix")}`);

				el = Self.rootEl.find(".shape-height");
				el.html(`${event.css.height}${el.data("suffix")}`);

				el = Self.rootEl.find(".shape-rotation");
				el.html(`${event.angle}${el.data("suffix")}`);

				el = Self.rootEl.find(".shape-radius");
				el.html(`${event.radius}${el.data("suffix")}`);
				break;

			case "enable":
				// set default cursor for this tool
				APP.els.content.addClass("cursor-crosshair");
				// bind event handler
				APP.els.content.on("mousedown", ".vector-layer", Self.doMove);
				Self.handleBox.on("mousedown", Self.doResize);
				break;
			case "disable":
				// unset default cursor for this tool
				APP.els.content.removeClass("cursor-crosshair");
				// unbind event handler
				APP.els.content.off("mousedown", ".vector-layer", Self.doMove);
				Self.handleBox.off("mousedown", Self.doResize);
				break;
		}
	},
	doGradient(event) {
		let APP = decoshop,
			Self = APP.tools.shape,
			Drag = Self.drag,
			Gradient = Self.gradient;
		switch (event.type) {
			case "mousedown":
				break;
			case "mousemove":
				break;
			case "mouseup":
				break;
		}
	},
	doMove(event) {
		let APP = decoshop,
			Self = APP.tools.shape,
			Drag = Self.drag;
		switch (event.type) {
			case "mousedown":
				break;
			case "mousemove":
				break;
			case "mouseup":
				break;
		}
	},
	doRadius(event) {
		let APP = decoshop,
			Self = APP.tools.shape,
			Drag = Self.drag;
		switch (event.type) {
			case "mousedown":
				break;
			case "mousemove":
				break;
			case "mouseup":
				break;
		}
	},
	doRotate(event) {
		let APP = decoshop,
			Self = APP.tools.shape,
			Drag = Self.drag;
		switch (event.type) {
			case "mousedown":
				break;
			case "mousemove":
				break;
			case "mouseup":
				break;
		}
	},
	doResize(event) {
		let APP = decoshop,
			Self = APP.tools.shape,
			Drag = Self.drag;
		switch (event.type) {
			case "mousedown":
				break;
			case "mousemove":
				break;
			case "mouseup":
				break;
		}
	}
}
