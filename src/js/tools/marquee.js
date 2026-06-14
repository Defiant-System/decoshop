
// decoshop.tools.marquee

{
	init() {
		// default values
		this.option = "rectangle";
		this.method = "replace";
		this.polygon = [];
		this.polyCloseDist = 5;
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.marquee,
			Drag = Self.drag,
			color,
			mask,
			image,
			el;
		// console.log(event);
		switch (event.type) {
			// subscribed events
			case "mouse-move":
				if (!File.quickMask.show) {
					APP.els.content.toggleClass("cursor-move", !event.detail.isSelection);
				}
				break;

			// system events
			case "window.keystroke":

				switch (event.char) {
					case "esc":
						Self.dispatch({ type: "clear-selection" });
						Mask.dispatch({ type: "deselect" });
						break;
					case "del":
					case "backspace":
						if (event.altKey || event.metaKey) {
							color = event.altKey ? File.fgColor : File.bgColor;
							APP.dispatch({ type: "edit-action", arg: `fill,${color}` });
						} else {
							APP.dispatch({ type: "edit-action", arg: `delete` });
						}
						break;
				}

				break;

			// custom events
			case "select-option":
				Self.option = event.arg || "rectangle";
				break;
			case "select-method":
				Self.method = event.arg || "replace";
				break;
			case "clear-selection":
				// halt marching ants (if any) and make sure draw canvas is cleared
				Mask.ants.halt();
				// reset drawing canvas
				Mask.draw.cvs.prop({ width: window.innerWidth, height: window.innerHeight });
				
				if (Self.method === "replace") Mask.dispatch({ type: "deselect" });
				break;
			case "enable":
				// set default cursor for this tool
				APP.els.content.addClass("cursor-crosshair");
				// subscribe to events
				window.on("mouse-move", Self.dispatch);
				break;
			case "disable":
				// unset default cursor for this tool
				APP.els.content.removeClass("cursor-crosshair");
				// subscribe to events
				window.off("mouse-move", Self.dispatch);
				break;
			
			// proxy event
			case "deselect":
			case "select-all":
			case "select-none":
			case "inverse-selection":
				return Mask.dispatch(event);
		}
	},
	doMarquee(event) {
		let Self = decoshop.tools.marquee,
			oX = event.offsetX,
			oY = event.offsetY;
		// prevent default behaviour
		event.preventDefault();
		switch (Self.option) {
			case "magnetic":   return; /* TODO: spacial handling */
			case "lasso":      return Self.doLasso(event);
			case "polygon":    return Self.doPolygon(event);
			case "magic-wand": return Mask.dispatch({ type: "select-with-magic-wand", oX, oY });
			case "rectangle":  return Self.doRectangle(event);
			case "elliptic":   return Self.doEllipse(event);
		}
	},
	doPolygon(event) {
		let APP = decoshop,
			Self = APP.tools.marquee,
			mX = event.offsetX,
			mY = event.offsetY,
			[oX, oY] = event.shiftKey ? Self.fast.shiftForce(mX, mY) : [mX, mY],
			dX, dY, dist;
		switch (event.type) {
			case "mousedown":
				break;
			case "mousemove":
				break;
			case "close-loop":
				break;
		}
	},
	doLasso(event) {
		let APP = decoshop,
			Self = APP.tools.marquee,
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
	doRectangle(event) {
		let APP = decoshop,
			Self = APP.tools.marquee,
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
	doEllipse(event) {
		let APP = decoshop,
			Self = APP.tools.marquee,
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
