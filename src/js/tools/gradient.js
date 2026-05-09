
// decoshop.tools.gradient

{
	init() {
		this.option = "gradient";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.gradient;

		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "gradient";
				break;
			case "enable":
				break;
			case "disable":
				break;
		}
	}
}
