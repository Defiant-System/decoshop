
// decoshop.tools.move

{
	init() {
		this.option = "move";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.move,
			el;
		// console.log(event);
		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "move";
				// set canvas cursor
				APP.els.content.removeClass("cursor-hand cursor-move").addClass(`cursor-${Self.option}`);
				break;
			case "enable":
				// set canvas cursor
				APP.els.content.addClass(`cursor-${Self.option}`);
				// bind event handler
				APP.els.cvsWrapper.on("mousedown", Self.doPan);
				break;
			case "disable":
				// reset canvas cursor
				APP.els.content.removeClass("cursor-hand cursor-move");
				// unbind event handler
				APP.els.cvsWrapper.off("mousedown", Self.doPan);
				break;
		}
	},
	doPan(event) {
		let APP = decoshop,
			Self = APP.tools.move,
			Drag = Self.drag;

		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();
				console.log(event);
				break;
			case "mousemove":
				break;
			case "mouseup":
				break;
		}
	}
}
