
// decoshop.tools.brush

{
	init() {
		// default option
		this.option = "brush";
	},
	dispatch(event) {
		let APP = decoshop,
			Proj = Projector,
			el;

		switch (event.type) {
			// native events
			case "mousedown":
				Self[`${Self.option}Tool`](event);
				break;
		}
	},
	pencilTool(event) {
		return console.log("pencil", event);
	},
	brushTool(event) {
		let APP = decoshop,
			Proj = Projector,
			image;

		switch (event.type) {
			// native events
			case "mousedown":
				break;
		}
	}
}
