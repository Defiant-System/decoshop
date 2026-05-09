
// decoshop.tools.pipette

{
	init() {
		this.option = "pipette";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.pipette;

		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "pipette";
				break;
			case "enable":
				break;
			case "disable":
				break;
		}
	}
}
