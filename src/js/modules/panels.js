
const Panels = {
	init() {
		// init sub objects
		Object.keys(this)
			.filter(i => !["init"].includes(i))
			.map(i => this[i].dispatch({
				type: "init-panel",
				el: window.find(`div[data-box="${i}"]`),
			}));
	},
	// panel sub objects
	actions: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	adjustments: {
		dispatch(event) {
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
		}
	},
	brush: {
		dispatch(event) {
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
		}
	},
	channels: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	character: {
		dispatch(event) {
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
		}
	},
	color: {
		dispatch(event) {
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
		}
	},
	gallery: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	glyphs: {
		dispatch(event) {
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
		}
	},
	guides: {
		dispatch(event) {
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
		}
	},
	histogram: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	history: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	info: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	layers: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				gEl,
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
						el.find(".row:nth(0) .name").trigger("click");
						// el.find(".row:nth(0)").addClass("fx-expand");
					});
					break;
				case "select-layer":
					el = $(event.target);
					rEl = el.parents("?.row");
					gEl = el.parents(".group");
					// toggle visibility
					if (el.hasClass("icon-eye-on")) {
						if (rEl.index() === 0) gEl.toggleClass("hidden", el.hasClass("icon-eye-off"));
						el.toggleClass("icon-eye-off", el.hasClass("icon-eye-off"));

						if (el.parent().hasClass("fx-header")) {
							let fxList = el.parents(".fx-list");
							fxList.toggleClass("disabled", !el.hasClass("icon-eye-off"));
						}
						return;
					}
					if (el.hasClass("fx-applied")) {
						rEl.toggleClass("fx-expand", rEl.hasClass("fx-expand"));
						return;
					}
					// toggle row
					if (el.hasClass("icon-folder")) {
						gEl.toggleClass("expanded", gEl.hasClass("expanded"));
						return;
					}
					// select row
					if (rEl.length) {
						event.el.find(".active").removeClass("active");
						rEl.addClass("active");
					}
					// select mask
					event.el.find(".mask-active").removeClass("mask-active");
					if (el.hasClass("mask")) rEl.addClass("mask-active");
					break;
			}
		}
	},
	memory: {
		dispatch(event) {
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
		}
	},
	navigator: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel":
					break;
				case "refresh":
	 				let w = event.doc.Ch.m,
	 					h = event.doc.Ch.n,
	 					{ width, height } = Misc.fitWithin(w, h, 258, 138), // max-width: 258, max-height: 138
	 					cvs = APP.sidebar.els.root.find("canvas"),
	 					ctx = cvs[0].getContext("2d", { willReadFrequently: true }),
	 					iData = ctx.createImageData(width, height);
	 				// update width & height for navigator panel
	 				APP.sidebar.els.root.find(`.navigator-wrapper`).css({ "--d": "block", "--w": `${width}px`, "--h": `${height}px` });

					// PixelUtil.copyByteBuffer(event.doc, iData.data);
					console.log(Engine.doc.EI);
					console.log(Engine.doc.KP);
					console.log(Engine.doc);

					break;
			}
		}
	},
	notes: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	paragraph: {
		dispatch(event) {
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
		}
	},
	paths: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	tool: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	properties: {
		dispatch(event) {
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
		}
	},
	styles: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
	swatches: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
};
