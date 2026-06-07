
// decoshop.extras

{
	init() {
		// fast references
		this.els = {
			root: window.find(".extras-wrapper"),
		};

		// init sub objects
		Object.keys(this).filter(i => this[i].init).map(i => this[i].init());
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.extras,
			pEl,
			el;
		// console.log(event);
		switch (event.type) {
			case "extras-tool-box":
				el = $(event.target).parents("?.tool");
				if (!el.length) return;
				pEl = Self.els.root.find(`div[data-box="${el.data("target")}"]`).parents(".extra-box");

				if (el.hasClass("down")) { // alread open - close
					event.el.find(".down").removeClass("down");
					pEl.cssSequence("!show", "transitionend", bEl => {
							// console.log(bEl);
						});
				} else {
					// pressed state
					event.el.find(".down").removeClass("down");
					el.addClass("down");
					// open right box
					pEl.find(`.box-head div[data-content="${el.data("target")}"]`).trigger("click");
					pEl.cssSequence("show", "transitionend", bEl => {
							// console.log(bEl);
						});
				}
				break;
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
					let pEl = el.parents("[data-box]"),
						name = pEl.data("box");
					if (name) {
						Self[name].dispatch(event);
					}
				}
		}
	},
}
