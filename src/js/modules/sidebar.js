
// decoshop.sidebar

{
	init() {
		// fast references
		this.els = {
			root: window.find(".sidebar-wrapper"),
		};
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.sidebar,
			el;
		// console.log(event);
		switch (event.type) {
			// proxied events
			case "box-head-tab":
				el = $(event.target);
				if (el.hasClass("active") || !el.parent().hasClass("box-head")) return;
				el.parent().find(".active").removeClass("active");
				el.addClass("active");

				let newBox = Self.els.root.find(`div[data-box="${el.data("content")}"]`),
					oldBox = newBox.parent().find("> div[data-box]:not(.hidden)");
				// signal events of change
				// Self[oldBox.data("box")].dispatch({ type: "disable" });
				// Self[newBox.data("box")].dispatch({ type: "enable" });
				// UI update
				oldBox.addClass("hidden");
				newBox.removeClass("hidden");
				break;
			default:
				el = event.el;
				if (el) {
					let pEl = el.parents("?[data-box]"),
						name = pEl.data("box");
					if (name) {
						// forward event
						Panels[name](event);
					}
				}
		}
	}
}
