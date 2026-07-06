
// decoshop.sidebar

{
	init() {
		// fast references
		this.els = {
			root: window.find(".sidebar-wrapper"),
			extras: window.find(".extras-wrapper"),
			extraBar: window.find(".extras-bar"),
		};
		// 
		this.livePanels = ["navigator", "layers", "channels"];
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
				if (APP.els.content.hasClass("full-layers")) {
					Self.els.root.find(`.box-head > div[data-content="${el.data("target")}"]`).trigger("click");
					APP.tools.els.toolPanel.trigger("click");
					return;
				}
				Self.els.root.find(`.box-head > div[data-content="${el.data("target")}"]`).trigger("click");
				APP.tools.dispatch({ type: "toggle-sidebar" });
				break;
			case "refresh-panels":
				// forward event to panels to refresh
				Self.livePanels.map(name => Panels[name].dispatch({ ...event, type: "refresh" }));
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

				Self.els.extraBar.find(`.tool.down`).removeClass("down");
				Self.els.extraBar.find(`.tool[data-target="${el.data("content")}"]`).addClass("down");

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
				name = el.data("target");
				pEl = Self.els.extras.find(`div[data-box="${name}"]`).parents(".extra-box");

				if (el.hasClass("down")) { // already open - close
					event.el.find(".down").removeClass("down");
					pEl.cssSequence("!show", "transitionend", bEl => {
							let el = bEl.find(`.box-body > div[data-box="${name}"]`);
							Panels[name]?.dispatch({ type: "disable-panel", el });
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
					name = el.data("target");
					pEl.find(`.box-head div[data-content="${name}"]`).trigger("click");
					pEl.cssSequence("show", "transitionend", bEl => {
							let el = bEl.find(`.box-body > div[data-box="${name}"]`);
							Panels[name]?.dispatch({ type: "enable-panel", el });
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
						Panels[name].dispatch(event);
					}
				}
		}
	}
}
