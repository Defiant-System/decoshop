
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
					Self.root = APP.els.content.find(`[data-box="layers"] .box-content-wrapper`);
					Self.thumbSize = 32;
					break;
				case "refresh":
					window.render({
						data: event.file.xLayers,
						template: "layers-list",
						match: "//Layers",
						target: Self.root,
					}).then((el) => {
						// temp
						el.find(".row:nth(0) .name").trigger("click");
						// el.find(".row:nth(0)").addClass("fx-expand");

						Self.dispatch({ type: "refresh-thumbnails" });
					});
					break;
				case "refresh-thumbnails":
					Self.root.find(`.thumbnail canvas`).map(cvs => {
						let ctx = cvs.getContext("2d"),
							rEl = cvs.parentNode.parentNode,
							{ cache, rect } = APP.file.getlayerImageData(rEl.getAttribute("data-id")),
							iData = ctx.createImageData(rect.m, rect.n);

						cvs.width = rect.m;
						cvs.height = rect.n;
						PixelUtil.copyByteBuffer(cache, iData.data);

						ctx.putImageData(iData, 0, 0);
						// Touch a pixel to force the canvas to flush/realize the put (perf quirk).
						ctx.getImageData(0, 0, 1, 1);
					});
					break;
				case "toggle-layer-visibility":
					// layer.Oj(false); // set hidden (mutates layerFlags)
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
				// box footer
				case "add-layer-folder":
					Self.root.data({ size: "0" });
					break;
				case "add-layer":
					Self.root.data({ size: "1" });
					break;
				case "remove-layer":
					Self.root.data({ size: "2" });
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
				Doc = APP.file?.doc,
				zoomTool,
				spectrum,
				value,
				el;
			// console.log(event);
			switch (event.type) {
				// native events
				case "input":
				case "update-zoom":
					value = APP.tools.zoom.spectrum[event.target.value];
					Self.miniValue.html(`${value}%`);
					// update doc canvas
					let point = Doc.u.dN(Doc.m / 2, Doc.n / 2),
						smooth = event.type === "update-zoom";
					APP.tools.zoom.dispatch({ type: "do-zoom", value, point, smooth });
					break;

				// custom events
				case "init-panel":
					Self.root = APP.els.content.find(`.sidebar-wrapper div[data-box="navigator"]`);
					Self.viewRect = Self.root.find(`.view-rect`);
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
					// bind event handlers
					Self.miniRange.on("input", Self.dispatch);
					Self.viewRect.on("mousedown", Self.doPan);
					break;
				case "refresh":
					let doc = event.file.doc,
						{ width: w, height: h } = Misc.fitWithin(doc.Ch.m, doc.Ch.n, Self.maxW, Self.maxH);
					// update width & height for navigator panel
					Self.wrapper.css({ "--d": "block", "--w": `${w}px`, "--h": `${h}px` });
					Self.vw = w;
					Self.vh = h;

					// Target max thumbnail edge: ~300 CSS px, scaled for the device pixel ratio.
					var edge = Self.maxW * window.devicePixelRatio,
						count = 0,
						// Seed the pyramid with the full-resolution composite and its bounds.
						mipmap = [...APP.statusbar._activeFile.mipmap];
					// Skip the levels that are still larger than the display target.
					while (Math.max(mipmap[count+1].m, mipmap[count+1].n) > edge) {
						count += 2;
					}
					// Keep from the first small-enough level onward; cache[0]=pixels, cache[1]=rect.
					let cache = mipmap.slice(count),
						rect = cache[1];
					// Size the canvas to the thumbnail's pixel dimensions.
					Self.cvs.attr({ width: rect.m, height: rect.n });
					// Copy the thumbnail pixels into the canvas via an ImageData buffer.
					var iData = Self.ctx.createImageData(rect.m, rect.n);
					PixelUtil.copyByteBuffer(cache[0], iData.data);
					Self.ctx.putImageData(iData, 0, 0);
					// Touch a pixel to force the canvas to flush/realize the put (perf quirk).
					Self.ctx.getImageData(0, 0, 1, 1);
					break;

				case "zoom-in":
					value = Math.min(+Self.miniRange[0].value+1, APP.tools.zoom.spectrum.length-1);
					Self.miniRange[0].value = value;
					Self.dispatch({ type: "update-zoom", target: Self.miniRange[0] });
					break;
				case "zoom-out":
					value = Math.max(+Self.miniRange[0].value-1, 0);
					Self.miniRange[0].value = value;
					Self.dispatch({ type: "update-zoom", target: Self.miniRange[0] });
					break;
				case "recalc-view-rect":
					if (!Doc) break;
					// Map the work view (available rect) to navigator view-rect CSS vars.
					let u = Doc.u,
						aR = u.aR(),
						p0 = u.Zx(aR.x, aR.y),
						p1 = u.Zx(aR.x + aR.m, aR.y + aR.n),
						fx = Self.vw / Doc.m,
						fy = Self.vh / Doc.n,
						vr = {
							vx: p0.x * fx,
							vy: p0.y * fy,
							vw: (p1.x - p0.x) * fx,
							vh: (p1.y - p0.y) * fy,
						};
					if (vr.vx < 0) { vr.vw += vr.vx; vr.vx = 0; }
					if (vr.vy < 0) { vr.vh += vr.vy; vr.vy = 0; }
					if (vr.vx + vr.vw > Self.vw) vr.vw -= vr.vx + vr.vw - Self.vw;
					if (vr.vy + vr.vh > Self.vh) vr.vh -= vr.vy + vr.vh - Self.vh;

					Self.viewRect.css({
						"--vx": `${Math.round(vr.vx)}px`,
						"--vy": `${Math.round(vr.vy)}px`,
						"--vw": `${Math.round(vr.vw)}px`,
						"--vh": `${Math.round(vr.vh)}px`,
					});
					break;
				case "update-zoom-value":
					Self.root.find(`.box-foot .value`).html(`${event.value}%`);
					break;
			}
		},
		doPan(event) {
			let APP = decoshop,
				Self = Panels.navigator,
				Drag = Self.drag;
			switch (event.type) {
				case "mousedown":
					// prevent default behaviour
					event.preventDefault();
					// prepare drag object
					let el = $(event.target),
						rect = {
							x: parseInt(el.cssProp("--vx"), 10),
							y: parseInt(el.cssProp("--vy"), 10),
							w: parseInt(el.cssProp("--vw"), 10),
							h: parseInt(el.cssProp("--vh"), 10),
						},
						click = {
							x: rect.x - event.clientX,
							y: rect.y - event.clientY,
						},
						panFromNavPos = (vx, vy) => {
							let tX = vx * doc.m / Self.vw,
								tY = vy * doc.n / Self.vh;
							doc.u.R.T6(0, 0);
							let { x: sx, y: sy } = doc.u.dN(tX, tY);
							return {
								x: Math.round(avR.x - sx),
								y: Math.round(avR.y - sy),
							};
						},
						doc = APP.file.doc,
						avR = doc.u.aR(),
						// Pan limits matching CanvasTools.Mi.if (available rect + panSlack).
						slack = CanvasTools.Mi.panSlack || 0,
						panLimX = Math.abs(avR.m - doc.m * doc.u.N) / 2 + slack,
						panLimY = Math.abs(avR.n - doc.n * doc.u.N) / 2 + slack,
						fx = Self.vw / doc.m,
						fy = Self.vh / doc.n,
						saved = { x: doc.u.R.x, y: doc.u.R.y },
						min = { x: Infinity, y: Infinity },
						max = { x: -Infinity, y: -Infinity };
					for (let rx of [-panLimX, panLimX]) {
						for (let ry of [-panLimY, panLimY]) {
							doc.u.R.T6(rx, ry);
							let p0 = doc.u.Zx(avR.x, avR.y);
							let vx = p0.x * fx;
							let vy = p0.y * fy;
							if (vx < min.x) min.x = vx;
							if (vx > max.x) max.x = vx;
							if (vy < min.y) min.y = vy;
							if (vy > max.y) max.y = vy;
						}
					}
					doc.u.R.T6(saved.x, saved.y);
					doc.u.q8.T6(saved.x, saved.y);
					// save drag details
					Self.drag = { el, click, rect, doc, avR, panFromNavPos, min, max };

					// prevent mouse from triggering mouseover
					APP.els.content.addClass("no-cursor");
					// bind event handlers
					APP.els.doc.on("mousemove mouseup", Self.doPan);
					break;
				case "mousemove":
					let vx = Math.min(Math.max(event.clientX + Drag.click.x, Drag.min.x), Drag.max.x),
						vy = Math.min(Math.max(event.clientY + Drag.click.y, Drag.min.y), Drag.max.y),
						pan = Drag.panFromNavPos(vx, vy);
					// Navigator view-rect top-left -> work-view pan (available-rect aligned).
					CanvasTools.Mi.if(Drag.doc, pan.x, pan.y);
					Drag.doc.u.q8.T6(Drag.doc.u.R.x, Drag.doc.u.R.y);
					PP.update();
					Self.dispatch({ type: "recalc-view-rect" });
					break;
				case "mouseup":
					// remove class
					APP.els.content.removeClass("no-cursor");
					// unbind event handlers
					APP.els.doc.off("mousemove mouseup", Self.doPan);
					Self.dispatch({ type: "recalc-view-rect" });
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
