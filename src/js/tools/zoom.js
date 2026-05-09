
// decoshop.tools.zoom

{
	init() {
		this.option = "zoom";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.zoom;

		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "zoom";
				break;
			case "enable":
				break;
			case "disable":
				break;
		}
	}
}
