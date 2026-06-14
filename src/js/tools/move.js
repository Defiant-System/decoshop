
// decoshop.tools.move

{
	init() {
		this.option = "move";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.move,
			el;
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
				break;
			case "disable":
				// reset canvas cursor
				APP.els.content.removeClass("cursor-hand cursor-move");
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
				break;
			case "mousemove":
				break;
			case "mouseup":
				break;
		}
	}
}
