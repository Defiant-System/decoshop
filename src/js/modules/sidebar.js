
// decoshop.sidebar

{
	init() {
		// fast references
		this.els = {
			root: window.find(".sidebar-wrapper"),
			extras: window.find(".extras-wrapper"),
			extraBar: window.find(".extras-bar"),
		};
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.sidebar,
			newBox,
			oldBox,
			toolIcon,
			name,
			pEl,
			el;
		// console.log(event);
		switch (event.type) {
			case "sidebar-tools":
				el = $(event.target);
				Self.els.root.find(`.box-head > div[data-content="${el.data("target")}"]`).trigger("click");
				APP.tools.dispatch({ type: "toggle-sidebar" });
				break;
			// proxied events
			case "box-head-tab":
				el = $(event.target);
				if (el.parents(".extra-box").length) return Self.dispatch({ ...event, type: "extras-head-tab" });
				if (el.hasClass("active") || !el.parent().hasClass("box-head")) return;
				el.parent().find(".active").removeClass("active");
				el.addClass("active");

				newBox = Self.els.root.find(`div[data-box="${el.data("content")}"]`);
				oldBox = newBox.parent().find("> div[data-box]:not(.hidden)");
				
				// UI update
				oldBox.addClass("hidden");
				newBox.removeClass("hidden");
				break;
			case "extras-head-tab":
				el = $(event.target);
				if (el.hasClass("active") || !el.parent().hasClass("box-head")) return;
				el.parent().find(".active").removeClass("active");
				el.addClass("active");

				newBox = Self.els.extras.find(`div[data-box="${el.data("content")}"]`);
				oldBox = newBox.parent().find("> div[data-box]:not(.hidden)");
				toolIcon = Self.els.extras.find(`.tool[data-target="${el.data("content")}"]`);

				// UI sync tabs with icons
				if (!toolIcon.hasClass("down")) {
					// update sidebar icon
					Self.els.extras.find(".tool.down").removeClass("down");
					toolIcon.addClass("down");
				}

				// UI update
				oldBox.addClass("hidden");
				newBox.removeClass("hidden");
				break;
			case "extras-tool-box":
				el = $(event.target).parents("?.tool");
				if (!el.length) return;
				pEl = Self.els.extras.find(`div[data-box="${el.data("target")}"]`).parents(".extra-box");

				if (el.hasClass("down")) { // already open - close
					event.el.find(".down").removeClass("down");
					pEl.cssSequence("!show", "transitionend", bEl => {
							// console.log(bEl);
						});
				} else {
					// check if any opened
					let opened = event.el.find(".down");
					if (opened.length && opened.parent([0] !== el.parent()[0])) {
						opened.trigger("click");
					}
					// pressed state
					el.addClass("down");
					// open right box
					pEl.find(`.box-head div[data-content="${el.data("target")}"]`).trigger("click");
					pEl.cssSequence("show", "transitionend", bEl => {
							// console.log(bEl);
						});
				}
				break;
			default:
				el = event.el;
				if (el) {
					pEl = el.parents("?[data-box]");
					name = pEl.data("box");
					if (name) {
						// forward event
						Panels[name](event);
					}
				}
		}
	}
}
