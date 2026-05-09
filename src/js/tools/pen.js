
// decoshop.tools.pen

{
	init() {
		this.option = "pen";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.pen;

		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "pen";
				break;
			case "enable":
				break;
			case "disable":
				break;
		}
	}
}
