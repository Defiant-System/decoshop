
// decoshop.tools.stamp

{
	init() {
		this.option = "stamp";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.stamp;

		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "stamp";
				break;
			case "enable":
				break;
			case "disable":
				break;
		}
	}
}
