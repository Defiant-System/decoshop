
const Panels = {
	init() {
		// init sub objects
		Object.keys(this)
			.filter(i => !["init"].includes(i))
			.map(i => this[i]({
				type: "init-panel",
				el: window.find(`div[data-box="${i}"]`),
			}));
	},
	// panel sub objects
	actions(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	adjustments(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel":
				break;
			case "select-adjustment":
				el = $(event.target);
				event.el.find(".active").removeClass("active");
				el.addClass("active");
				// show correct content in panel
				APP.sidebar.els.extras.find(`.properties-wrapper div[data-apply="layer"]`).data({ show: el.data("target") });
				// TEMP: open corresponding dialog for visual comparison
				APP.els.content.find(`.dialog-box.showing`).removeClass("showing");
				APP.dispatch({ type: "open-dialog", arg: el.data("target") });
				break;
		}
	},
	brush(event) {
		let APP = decoshop,
			Self = Panels,
			pEl,
			el;
		// console.log(event);
		switch (event.type) {
			case "select-tip-options":
				el = $(event.target);
				pEl = el.parents(".brush-tips-wrapper");
				if (el.hasClass("active")) {
					if (el.data("target") === "tip-shape") {

					} else {
						el.removeClass("active");
					}
					pEl.data({ show: "tip-shape" });
				} else {
					el.addClass("active");
					pEl.data({ show: el.data("target") });
				}
				break;
		}
	},
	channels(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	character(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "select-font-style":
				event.el.find("> .active").removeClass("active");
				el = $(event.target).addClass("active");
				break;
		}
	},
	color(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "show-color-values":
				event.el.parent().find(".active").removeClass("active");
				event.el.addClass("active");
				break;
		}
	},
	css(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	gallery(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	glyphs(event) {
		let APP = decoshop,
			Self = Panels,
			val,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel":
				val = [...Array(96)].map((e, i) => `<b data-c="${String.fromCharCode(i+33)}"></b>`);
				event.el.find(`.glyph-list`).html(val.join(""));
				break;
			case "toggle-glyph-background":
				el = event.el.parents(`div[data-box="glyphs"]`);
				if (event.el.hasClass("down")) {
					event.el.removeClass("down");
					el.find(`.glyph-list`).data({ invert: 1 });
				} else {
					event.el.addClass("down");
					el.find(`.glyph-list`).data({ invert: 0 });
				}
				break;
		}
	},
	guides(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "toggle-preset-guides":
				el = $(event.target);
				if (el.hasClass("active")) {
					el.removeClass("active");
				} else {
					el.addClass("active");
				}
				break;
		}
	},
	histogram(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	history(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	info(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	layers(event) {
		let APP = decoshop,
			Self = Panels,
			rEl,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel":
				window.render({
					template: "layers-list",
					match: "//TempLayers",
					target: APP.els.content.find(`[data-box="layers"] .box-content-wrapper`),
				}).then((el) => {
					// temp
					el.find(".row").get(1).trigger("click");
				});
				break;
			case "select-layer":
				el = $(event.target);
				// toggle row
				if (el.hasClass("icon-folder")) {
					let gEl = el.parents(".group");
					gEl.toggleClass("expanded", gEl.hasClass("expanded"));
					return;
				}
				// select row
				rEl = el.parents("?.row");
				if (rEl) {
					event.el.find(".active").removeClass("active");
					rEl.addClass("active");
				}
				break;
		}
	},
	memory(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
			case "toggle-child-rows":
				el = event.el.parent();
				if (el.hasClass("expanded")) {
					el.removeClass("expanded");
				} else {
					el.addClass("expanded");
				}
				break;
		}
	},
	navigator(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	notes(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	paragraph(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "select-justify":
				event.el.find("> .active").removeClass("active");
				el = $(event.target).addClass("active");
				break;
		}
	},
	paths(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	tool(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	properties(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel":
				event.el.find(`div[data-for]`).map(elem => {
					let el = $(elem),
						dlg = window.find(`.dialog-box[data-dlg="${el.data("for")}"] .dlg-content .fields`);
					event.el.find(`div[data-for="${el.data("for")}"]`).html(dlg.html());
				});
				break;
			case "select-property-tab":
				el = $(event.target).parents("?li");
				if (!el.length) return;
				event.el.find("> .active").removeClass("active");
				el.addClass("active");
				el.parents("[data-tab]").data({ tab: el.data("id") });
				break;
		}
	},
	styles(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	swatches(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
};
