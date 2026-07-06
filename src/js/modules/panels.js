
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
				value,
				rEl,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel":
					Self.root = APP.els.content.find(`[data-box="channels"] .box-content-wrapper`);
					break;
				case "refresh":
					window.render({
						data: event.file.xChannels,
						template: "channels-list",
						match: "//Channels",
						target: Self.root,
					}).then((el) => {
						Self.dispatch({ type: "refresh-thumbnails" });
						// auto click on a row
						el.find(`.row:nth-child(1) .name`).trigger("click");
					});
					break;
				case "refresh-thumbnails":
					// thumbnail canvases
					Self.root.find(`.thumbnail canvas`).map(cvs => {
						let ctx = cvs.getContext("2d"),
							pEl = $(cvs).parents(".row[data-id]"),
							cId = pEl.data("id");
						if (!cId) return;
						// copy contents of canvas in memory
						let channel = APP.file.getChannelImageData(cId);
						if (channel.cvs[0].width > 0) {
							cvs.width = channel.cvs[0].width;
							cvs.height = channel.cvs[0].height;
							ctx.drawImage(channel.cvs[0], 0, 0);
						}
					});
					break;
				case "select-channel":
					el = $(event.target);
					rEl = el.parents("?.row");
					value = +rEl.data("id");
					if (el[0] === event.el[0]) return;

					if (el.hasClass("icon-eye-on")) {
						let icon = rEl.find(`.icon-eye-on`),
							v = icon.hasClass("icon-eye-off");
						icon.toggleClass(`icon-eye-off`, v);
						// toggle icon of sibling channels
						switch (value) {
							case -1: // rgb
								rEl.parent().find(`.icon-eye-on`).toggleClass(`icon-eye-off`, v);
								break;
							case -2: // r
							case -3: // g
							case -4: // b
								if (rEl.parent().find(".icon-eye-off").length > 1) v = false;
								rEl.parent().find(`.row[data-id="-1"] .icon-eye-on`).toggleClass(`icon-eye-off`, v);
								break;
						}
					} else {
						event.el.find(".active").removeClass("active");
						rEl.addClass("active");
						Self.root.find(`.icon-eye-off`).removeClass("icon-eye-off");
						// toggle icon of sibling channels
						switch (value) {
							case -1: // rgb
								break;
							case -2: // r
							case -3: // g
							case -4: // b
								rEl.parent().find(`.row:not([data-id="${value}"]) .icon-eye-on`).addClass(`icon-eye-off`);
								break;
						}
					}

					let MX = [0, 0, 0]
					rEl.parent().find(`.icon-eye-on`).map(iElem => {
						let iEl = $(iElem),
							id = Math.abs(+iEl.parents(".row").data("id"));
						if ([2, 3, 4].includes(id)) {
							MX[id-2] = iEl.hasClass("icon-eye-off") ? 0 : 1;
						}
					});
					// setcls is handled by Hand tool (f.Mi / _O) in the bundle, but that tool
					// is not registered in d.map — mutate channel visibility directly instead
					let doc = APP.file.doc;
					doc.u.MX = MX;
					doc.uK = doc.bV = true;
					PP.update(true);
					break;
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
				action,
				rEl,
				el;
			// console.log(event);
			switch (event.type) {
				case "init-panel":
					Self.root = APP.els.content.find(`.history-wrapper`);
					break;
				case "history-changed":
					let str = event.doc.history.map((state, index) => {
							let name = languageManager.get(state.name),
								skip = state.skipInHistoryPanel,
								xStr = `<i id="${state.aod}" icon="icon-folder-open" name="${name}" index="${index}" skip="${index}"/>`;
							// add file history as xml
							APP.file.addHistory($.nodeFromString(xStr));
						})
					// render 
					window.render({
						data: APP.file.xHistory,
						template: "history-list",
						match: "//History",
						target: Self.root,
					}).then((el) => {
						el.find(".item:last").addClass("active");
					});
					break;
				case "select-history-item":
					el = $(event.target);
					rEl = el.parents("?.item");
					if (el[0] === event.el[0]) return;
					
					action = new Action(ActionTypes.E.v, true);
					action.G = CanvasTools.lv;
					action.data = { a: "h_stepfwd", index: el.index() };
					PP.dispatch(action);
					PP.update(true);
					break;
				case "history-undo":
					action = new Action(ActionTypes.E.v, true);
					action.G = CanvasTools.lv;
					action.data = { a: "h_stepbck" };
					PP.dispatch(action);
					PP.update(true);
					break;
				case "history-redo":
					action = new Action(ActionTypes.E.v, true);
					action.G = CanvasTools.lv;
					action.data = { a: "h_stepfwd" };
					PP.dispatch(action);
					PP.update(true);
					break;
				case "clear-history":
					// TODO
					break;
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
				case "init-panel":
					el = APP.els.content.find(`[data-box="info"] .info-wrapper`);
					Self.els = {
						root: el,
						hslH: el.find(".value.hslH"),
						hslS: el.find(".value.hslS"),
						hslL: el.find(".value.hslL"),
						rgbR: el.find(".value.rgbR"),
						rgbG: el.find(".value.rgbG"),
						rgbB: el.find(".value.rgbB"),
						rgbA: el.find(".value.rgbA"),
						mouseX: el.find(".value.mouseX"),
						mouseY: el.find(".value.mouseY"),
						selHeight: el.find(".value.selHeight"),
						selWidth: el.find(".value.selWidth"),
						fileSize: el.find(".value.fileSize"),
					};
					break;
				case "enable-panel":
					console.log(event);
					break;
				case "disable-panel":
					console.log(event);
					break;
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
					Self.dispatch({ type: "set-thumbnail-size", value: APP.Settings.pp.panels.layers.thumbMultiplier });
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
					// thumbnail canvases
					Self.root.find(`.thumbnail canvas`).map(cvs => {
						let ctx = cvs.getContext("2d"),
							pEl = cvs.parentNode.parentNode,
							lId = pEl.getAttribute("data-id");
						if (!lId || ["text"].includes(pEl.parentNode.getAttribute("data-layer"))) return;
						// copy contents of canvas in memory
						let layer = APP.file.getLayerImageData(lId);
						if (layer.at.cvs[0].width > 0) {
							cvs.width = layer.at.cvs[0].width;
							cvs.height = layer.at.cvs[0].height;
							ctx.drawImage(layer.at.cvs[0], 0, 0);
						}
					});
					// mask canvases
					Self.root.find(`.mask canvas`).map(cvs => {
						let ctx = cvs.getContext("2d"),
							pEl = cvs.parentNode.parentNode,
							lId = pEl.getAttribute("data-id");
						if (!lId) return;
						// copy contents of canvas in memory
						let layer = APP.file.getLayerImageData(lId);
						cvs.width = layer.yY.cvs[0].width;
						cvs.height = layer.yY.cvs[0].height;
						ctx.drawImage(layer.yY.cvs[0], 0, 0);
					});
					break;
				case "select-layer":
					el = $(event.target);
					rEl = el.parents("?.row");
					gEl = el.parents(".group");
					if (el[0] === event.el[0]) return; // exit if clicked on empty area
					
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
					break;
				case "add-layer":
					break;
				case "remove-layer":
					break;
				
				// proxied events
				case "toggle-layer-visibility":
					rEl = event.el.parents("?.row");
					gEl = event.el.parents(".group");
					if (rEl.index() === 0) {
						gEl.toggleClass("hidden", event.el.hasClass("icon-eye-off"));
					}
					// eye icon update
					event.el.toggleClass("icon-eye-off", event.el.hasClass("icon-eye-off"));

					APP.file.dispatch({
						type: "toggle-layer-visibility",
						id: +event.el.parents(".layer-row-body").data("id"),
						value: !event.el.hasClass("icon-eye-off"),
					});
					break;
				case "toggle-fx-visibility":
					rEl = event.el.parents("li");
					event.el.toggleClass("icon-eye-off", event.el.hasClass("icon-eye-off"));

					if (event.el.parent().hasClass("fx-header")) {
						let fxList = event.el.parents(".fx-list");
						fxList.toggleClass("fx-disabled", !event.el.hasClass("icon-eye-off"));

						APP.file.dispatch({
							type: "toggle-fx-master-visibility",
							id: +event.el.parents(".row").find(".layer-row-body").data("id"),
							value: !event.el.hasClass("icon-eye-off"),
						});
					} else {
						// console.log("turn off one", rEl);
						APP.file.dispatch({
							type: "toggle-fx-visibility",
							id: +event.el.parents(".row").find(".layer-row-body").data("id"),
							value: !event.el.hasClass("icon-eye-off"),
							typeIndex: +rEl.data("typeIndex"),
							instanceIndex: +rEl.data("instanceIndex"),
						});
					}
					break;
				case "set-thumbnail-size":
					Self.root.data({ size: event.value });
					// save value to app settings
					APP.Settings.pp.panels.layers.thumbMultiplier = event.value;
					break;
				case "open-dialog":
					APP.dispatch({ ...event, arg: event.value });
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
						{ width: w, height: h } = Misc.fitWithin(doc.m, doc.n, Self.maxW, Self.maxH);
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
