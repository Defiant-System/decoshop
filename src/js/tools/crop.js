
// decoshop.tools.crop

{
	init() {
		this.option = "crop";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.crop;

		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "crop";
				break;
			case "enable":
				break;
			case "disable":
				break;
		}
	}
}
