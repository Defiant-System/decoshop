
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
				Self = Panels.actions,
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
				Self = Panels.adjustments,
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
				Self = Panels.brush,
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
				Self = Panels.channels,
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
				Self = Panels.character,
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
				Self = Panels.color,
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
				Self = Panels.gallery,
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
				Self = Panels.glyphs,
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
				Self = Panels.guides,
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
				Self = Panels.histogram,
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
				Self = Panels.history,
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
				Self = Panels.info,
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
				Self = Panels.layers,
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
				Self = Panels.memory,
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
				Self = Panels.navigator,
				zoomTool,
				spectrum,
				index,
				value,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel":
					Self.root = APP.els.content.find(`.sidebar-wrapper div[data-box="navigator"]`);
					Self.miniRange = Self.root.find(`.box-foot .mini-range`);
					Self.miniValue = Self.root.find(`.box-foot .value`);
					Self.wrapper = Self.root.find(`.navigator-wrapper`);
					Self.maxW = parseInt(Self.wrapper.cssProp("--w"), 10);
					Self.maxH = parseInt(Self.wrapper.cssProp("--h"), 10);
					Self.cvs = Self.wrapper.find("canvas");
					Self.ctx = Self.cvs[0].getContext("2d", { willReadFrequently: true });
					Self.ctx.imageSmoothingEnabled = true;
					Self.ctx.imageSmoothingQuality = "high";
					// prepare range slider
					zoomTool = APP.tools.zoom;
					spectrum = zoomTool.spectrum;
					Self.miniRange.attr({
						min: 0,
						max: spectrum.length-1,
						value: spectrum.indexOf(zoomTool.value),
					});
					break;
				case "thumbnail-mip-chain":
					// Target max thumbnail edge: ~300 CSS px, scaled for the device pixel ratio.
					var edge = Self.maxW * window.devicePixelRatio,
						count = 0,
						doc = Engine.doc,
						// Seed the pyramid with the full-resolution composite and its bounds.
						mipmap = [doc.LT(), new Rect(0, 0, doc.m, doc.n)];
					// Append progressively half-sized RGBA levels (mipmaps).
					PixelUtil.pyramidDownsampleRgba(mipmap);
					// Skip the levels that are still larger than the display target.
					while (Math.max(mipmap[count + 1].m, mipmap[count + 1].n) > edge) {
						count += 2;
					}
					// Keep from the first small-enough level onward; EI[0]=pixels, EI[1]=rect.
					Self.EI = mipmap.slice(count);
					break;
				case "refresh":
	 				let w = event.doc.Ch.m,
	 					h = event.doc.Ch.n,
	 					{ width, height } = Misc.fitWithin(w, h, Self.maxW, Self.maxH);
	 				// update width & height for navigator panel
	 				Self.wrapper.css({ "--d": "block", "--w": `${width}px`, "--h": `${height}px` });

	 				Self.dispatch({ type: "thumbnail-mip-chain" });
					// PixelUtil.copyByteBuffer(event.doc, iData.data);

					var viewState = event.doc.u;
					// Smallest cached level: EI[0] = RGBA pixels, EI[1] = its Rect (size).
					var mipmap = Self.EI[0],
						rect = Self.EI[1],
						vw = rect.m,
						vh = rect.n,
						cvs = Self.cvs[0];
					// Size the canvas to the thumbnail's pixel dimensions.
					Self.cvs.attr({ width: vw, height: vh });
					// s.setElementSizePx(cvs, width, height);
					// Copy the thumbnail pixels into the canvas via an ImageData buffer.
					var iData = Self.ctx.createImageData(vw, vh);
					PixelUtil.copyByteBuffer(mipmap, iData.data);
					Self.ctx.putImageData(iData, 0, 0);
					// Touch a pixel to force the canvas to flush/realize the put (perf quirk).
					Self.ctx.getImageData(0, 0, 1, 1);

					// Map the visible viewport rect (aR, device px) to document coordinates via
					// Zx(), then scale to thumbnail space so the red box lines up with the image.
					var vRect = viewState.aR(),
						_local4350 = viewState.Zx(vRect.x, vRect.y),
						_local4352 = viewState.Zx(vRect.x + vRect.m, vRect.y + vRect.n),
						factor = vw / event.doc.m;
					// console.log( _local4350.x, _local4350.y, _local4352.x - _local4350.x, _local4352.y - _local4350.y );

					// Draw in document space; factor converts doc px -> thumbnail px.
					return;
					Self.ctx.scale(factor, factor);
					// Keep the outline a constant ~4 px regardless of the thumbnail scale.
					Self.ctx.lineWidth = 4 / factor;
					Self.ctx.strokeStyle = "#ff0000";
					// Red rectangle = currently visible region of the document.
					Self.ctx.strokeRect(_local4350.x, _local4350.y, _local4352.x - _local4350.x, _local4352.y - _local4350.y);
					break;
				case "zoom-in":
					zoomTool = APP.tools.zoom;
					spectrum = zoomTool.spectrum;
					index = Math.min(+Self.miniRange.attr("value")+1, spectrum.length-1);
					Self.miniRange.attr({ value: index });
					Self.miniValue.html(`${spectrum[index]}%`);
					break;
				case "zoom-out":
					zoomTool = APP.tools.zoom;
					spectrum = zoomTool.spectrum;
					index = Math.max(+Self.miniRange.attr("value")-1, 0);
					Self.miniRange.attr({ value: index });
					Self.miniValue.html(`${spectrum[index]}%`);
					break;
				case "update-zoom-value":
					Self.root.find(`.box-foot .value`).html(`${event.value}%`);
					break;
			}
		}
	},
	notes: {
		dispatch(event) {
			let APP = decoshop,
				Self = Panels.notes,
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
				Self = Panels.paragraph,
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
				Self = Panels.paths,
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
				Self = Panels.tool,
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
				Self = Panels.properties,
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
				Self = Panels.styles,
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
				Self = Panels.swatches,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel": break;
			}
		}
	},
};
