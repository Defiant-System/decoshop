
const Panels = {
	actions(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	adjustments(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
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
			case "some-event": break;
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
			case "some-event": break;
		}
	},
	gallery(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	glyphs(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "toggle-glyph-background":
				if (event.el.hasClass("down")) {
					event.el.removeClass("down");
				} else {
					event.el.addClass("down");
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
			case "some-event": break;
		}
	},
	history(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	info(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	layer(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	layers(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	memory(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	navigator(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	notes(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
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
			case "some-event": break;
		}
	},
	tool(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	properties(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
	swatches(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "some-event": break;
		}
	},
};
