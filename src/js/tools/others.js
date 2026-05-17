
// decoshop.tools.others

{
	init() {
		this.option = "others";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.others;

		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "others";
				break;
			case "enable":
				break;
			case "disable":
				break;
		}
	}
}
