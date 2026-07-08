
const Dialogs = {
	init() {
		// init sub objects
		Object.keys(this)
			.filter(i => !["init"].includes(i))
			.map(i => this[i].dispatch({
				type: "dlg-init",
				dEl: window.find(`div[data-dlg="${i}"]`),
			}));
	},
	// panel sub objects
	dlgLensCorrection: {
		dispatch(event) {
			/*
			 * 
			 */
			let APP = decoshop,
				Self = Dialogs.dlgLensCorrection,
				val,
				selEl,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-amount":
				case "set-scale":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					// make sure layer style is covered
					window.find(`.dialog-box[data-dlg="dlgLayerStyle"]`).addClass("covered");
					break;
				case "dlg-close":
					// make sure layer style is covered
					window.find(`.dialog-box[data-dlg="dlgLayerStyle"]`).removeClass("covered");
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLensCorrection" });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLensCorrection" });
			}
		}
	},
	dlgLayerStyle: {
		dispatch(event) {
			/*
			 * 
			 */
			let APP = decoshop,
				Self = Dialogs.dlgLayerStyle,
				index,
				val,
				selEl,
				el;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-slider-low":
					event.els[0].html(event.value[0]);
					event.els[1].html(event.value[1]);
					return;
				case "set-slider-high":
					event.els[0].html(event.value[0]);
					event.els[1].html(event.value[1]);
					return;

				case "select-index-item":
					index = 0;
					if (event.args.length) {
						event.dEl.find(`.style-list label`).map((el, i) => {
							let label = $(el).text();
							if (event.args[0] === label.replace("& ", "")) index = i+1;
						});
					}
					// auto select first item
					event.dEl.find(".style-list .option").get(index).trigger("click");
					break;
				case "selected-style-item":
					el = $(event.target).parents("?.option");
					if (!el.length) return;
					event.el.find(".selected").removeClass("selected");
					el.addClass("selected");

					selEl = el.find("label").length ? el.find("label") : el;
					el.parents(".dlg-content").find(".style-details").data({ show: selEl.html().replace("&amp; ", "") });
					break;
				case "change-blend-if":
					// update inline "selectbox"
					event.el.removeClass("opened").html(event.text);
					// update dbl-slider
					event.el.parents("fieldset").find(".dbl-slider").data({ mode: event.text.toLowerCase() });
					break;
				case "change-fill-type":
					// update inline "selectbox"
					event.el.removeClass("opened").html(event.text);
					// update what field options to show
					event.el.parents("fieldset").data({ show: event.text });
					break;
				case "change-glow-fill-type":
					// update inline "selectbox"
					event.el.removeClass("opened").html(event.text);
					// update what field options to show
					event.el.parents(".field-row").data({ show: event.text });
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					if (!event.dEl.find(".style-list .option").length) {
						window.render({
							template: "layer-style-list",
							match: `//LayerStyleOptions`,
							target: event.dEl.find(".style-list"),
						}).then(() => {
							Self.dlgLayerStyle({ ...event, type: "select-index-item" });
						});
					} else {
						Self.dlgLayerStyle({ ...event, type: "select-index-item" });
					}
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFilterGallery" });
			}
		}
	},
	dlgContourEditor: {
		dispatch(event) {
			/*
			 * 
			 */
			let APP = decoshop,
				Self = Dialogs.dlgContourEditor,
				val,
				selEl,
				el;
			// console.log(event);
			switch (event.type) {
				case "selected-style-item":
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					// make sure layer style is covered
					window.find(`.dialog-box[data-dlg="dlgLayerStyle"]`).addClass("covered");
					break;
				case "dlg-close":
					// make sure layer style is covered
					window.find(`.dialog-box[data-dlg="dlgLayerStyle"]`).removeClass("covered");
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgContourEditor" });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgContourEditor" });
			}
		}
	},
	dlgFilterGallery: {
		dispatch(event) {
			/*
			 * 
			 */
			let APP = decoshop,
				Self = Dialogs.dlgFilterGallery,
				val,
				selEl,
				el;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-filter-value":
					// console.log(event.value);
					return;

				case "hide-filter-options":
					el = Self.orgEl.parents(".dialog-box");
					el.removeClass("covered");
					// reset element
					el.find(".bubble-options").cssSequence("popOut", "animationend", el => el.removeClass("popup popOut"));
					el.find(".dlg-content").removeAttr("data-click");
					// clean up
					delete Self.orgEl;
					break;
				case "show-filter-options":
					Self.orgEl = event.el;
					el = event.el.parents(".dialog-box").addClass("covered");
					el.find(".dlg-content").data({ click: "hide-filter-options" });

					val = Self.orgEl.offset(".dlg-content").top - 14;
					el.find(".bubble-options").css({ "--top": `${val}px` }).addClass("popup");
					el.find(".bubble-options .selected").removeClass("selected");

					selEl = el.find(`.bubble-options [data-filter="${Self.orgEl.data("filter")}"]`).addClass("selected");
					selEl.parents(".bubble-content").scrollTop(selEl.offset(".bubble-content").top - 30);
					break;
				case "select-filter":
					event.el.find(".selected").removeClass("selected");

					el = $(event.target).addClass("selected");
					selEl = Self.orgEl.parents(".filter-row");
					Self.orgEl.data({ filter: el.data("filter") });
					// empty / re-render filter properties
					selEl.find(".filter-body").html("");
					if (selEl.hasClass("expanded")) {
						selEl.removeClass("expanded");
						selEl.find(".arrow").trigger("click");
					}
					break;
				case "toggle-filter-row":
					el = event.el.parents(".filter-row");
					if (el.hasClass("expanded")) {
						el.removeClass("expanded");
					} else {
						el.addClass("expanded");
						if (!el.find(".filter-body .field-row").length) {
							let name = el.find(`.filter[data-filter]`).data("filter"),
								match = `//Filters//i[@name="${name}"]`,
								target = el.find(".filter-body");
							// render filter options
							window.render({ template: "filter-options", match, target });
						}
					}
					break;
				case "toggle-filter":
					if (event.el.hasClass("icon-eye-on")) {
						event.el.removeClass("icon-eye-on").addClass("icon-eye-off");
					} else {
						event.el.removeClass("icon-eye-off").addClass("icon-eye-on");
					}
					break;
				case "remove-filter":
					selEl = event.el.parents(".active-filters");
					val = selEl.find(".filter-row").length - 1 > 1;
					selEl.toggleClass("one-left", val);

					event.el.parents(".filter-row").remove();
					break;
				case "add-filter":
					selEl = event.el.parents(".active-filters");
					selEl.removeClass("one-left");
					// render filter options
					window.render({
						template: "filter-row",
						match: `//Filters/i[1]/i[1]`,
						before: selEl.find(".add-filter"),
					});
					break;
				case "preview-zoom-out":
				case "preview-zoom-in":
					console.log(event);
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					if (!event.dEl.find(".bubble-options fieldset > div").length) {
						window.render({
							template: "filter-gallery-list",
							match: `//Filters`,
							target: event.dEl.find(".bubble-options .bubble-content"),
						});
						// reset filter list
						selEl = event.dEl.find(".active-filters");
						selEl.addClass("one-left");
						selEl.find(".filter-row").remove();
						// render filter options
						window.render({
							template: "filter-row",
							match: `//Filters/i[1]/i[1]`,
							before: selEl.find(".add-filter"),
						});
					}
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFilterGallery" });
			}
		}
	},
	dlgBrightnessContrast: {
		dispatch(event) {
			/*
			 * Brightness -  Min: -150   Max: 150
			 * Contrast -    Min: -100   Max: 100
			 */
			let APP = decoshop,
				Self = Dialogs.dlgBrightnessContrast,
				pixels,
				copy;
			switch (event.type) {
				// "fast events"
				case "set-contrast":
				case "set-brightness":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;
				
				// slow/once events
				case "before:set-contrast":
				case "before:set-brightness":
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-ok":
				case "dlg-open":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgBrightnessContrast" });
					break;
			}
		}
	},
	dlgLayerPanelOptions: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgBrightnessContrast,
				el;
			// console.log(event);
			switch (event.type) {
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-ok":
				case "dlg-open":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLayerPanelOptions" });
			}
		}
	},
	dlgScaleEffects: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgScaleEffects,
				el;
			// console.log(event);
			switch (event.type) {
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-ok":
				case "dlg-open":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgScaleEffects" });
			}
		}
	},
	dlgWarp: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgWarp,
				el;
			// console.log(event);
			switch (event.type) {
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-ok":
				case "dlg-open":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgWarp" });
			}
		}
	},
	dlgStroke: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgStroke,
				pixels,
				copy;
			// console.log(event);
			switch (event.type) {
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-ok":
				case "dlg-open":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgStroke" });
			}
		}
	},
	dlgGradientEditor: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgGradientEditor,
				value,
				dEl,
				el;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "update-gcp-handle":
					Self.vars.preset.Clrs.v[0].v.Lctn.v = event.perc * Self.vars.locationScale;
					Self.dlgGradientEditor({ type: "draw-gradient-preset", gradient: Self.vars.preset });
					return; // exit function for perf
				case "update-alpha-value":
					Self.vars.preset.Trns.v[0].v.Opct.v.val = event.value;
					Self.dlgGradientEditor({ type: "draw-gradient-preset", gradient: Self.vars.preset });
					return; // exit function for perf
				case "update-alpha-location":
					return; // exit function for perf

				// slower events
				case "select-gap-handle":
					dEl = event.el.parents(".dialog-box");
					dEl.find("fieldset").addClass("collapsed");
					dEl.find(`fieldset.fields-alpha`).removeClass("collapsed");
					break;
				case "select-gcp-handle":
					dEl = event.el.parents(".dialog-box");
					dEl.find("fieldset").addClass("collapsed");
					dEl.find(`fieldset.fields-color`).removeClass("collapsed");
					// update field values
					Self.els.iPointColor.css({ "--c": event.el.cssProp("--c") });
					value = +event.el.cssProp("--perc") * 100 | 0;
					Self.els.plInput.val(value + "%");
					Self.els.plKnob.data({ value });
					break;
				case "select-gam-handle":
					dEl = event.el.parents(".dialog-box");
					dEl.find("fieldset").addClass("collapsed");
					dEl.find(`fieldset.fields-midpoint`).removeClass("collapsed");
					break;
				case "select-gcm-handle":
					dEl = event.el.parents(".dialog-box");
					dEl.find("fieldset").addClass("collapsed");
					dEl.find(`fieldset.fields-midpoint`).removeClass("collapsed");
					break;
				case "set-color-type":
					// update inline "selectbox"
					event.el.removeClass("opened").html(event.text);
					break;
				case "select-gradient-preset":
					el = $(event.target);
					if (!el.parent().hasClass("preset-list")) return;

					el.parent().find(".active").removeClass("active");
					el.addClass("active");

					Self.vars.preset = { ...Registry.gradients.list[el.index()] };
					Self.dlgGradientEditor({ type: "draw-gradient-preset", gradient: Self.vars.preset });
					Self.dlgGradientEditor({ type: "plot-gradient-points", gradient: Self.vars.preset });
					break;
				case "draw-gradient-preset":
					let sw2 = Self.vars.stripWidth / 2,
						sh2 = Self.vars.stripHeight / 2,
						strip = new Rect(0, 0, Self.vars.stripWidth, Self.vars.stripHeight),
						gradientRect = new Rect(0, 0, Self.vars.stripWidth, Self.vars.stripHeight),
						stripImage = Self.els.ctx.getImageData(0, 0, Self.vars.stripWidth, Self.vars.stripHeight),
						checkerPixels = new Uint8Array(stripImage.data.buffer),
						gradientPixels = PixelUtil.allocBytes(Self.vars.stripWidth * Self.vars.stripHeight * 4),
						matrix = [1 / Self.vars.stripWidth, 0, 0, 1 / Self.vars.stripHeight];

					PixelUtil.fillCheckerboard(checkerPixels, Self.vars.stripWidth, Self.vars.stripHeight, 8);
					PixelUtil.color.renderGradient(event.gradient, gradientPixels, gradientRect, matrix, sw2, sh2, !1, 0, Self.vars.fgColor, Self.vars.bgColor);
					PixelUtil.blend.compositeBlend("norm", gradientPixels, strip, checkerPixels, strip, strip, 1);
					Self.els.ctx.clearRect(0, 0, Self.vars.stripWidth, Self.vars.stripHeight);
					Self.els.ctx.putImageData(stripImage, 0, 0);
					break;
				case "plot-gradient-points":
					let opacityStops = event.gradient.Trns.v,
						colorStops = event.gradient.Clrs.v,
						resolvedColors = PixelUtil.color.resolveGradientStops(event.gradient, Self.vars.fgColor, Self.vars.bgColor),
						opacityRowIndex = -1,
						aTrack = [],
						cTrack = [];

					for (let i=0; i<opacityStops.length; i++) {
						let stop = opacityStops[i].v,
							gray = Math.round(255 - 255 * stop.Opct.v.val / 100),
							perc = stop.Lctn.v / Self.vars.locationScale,
							stopX = Self.vars.stripWidth * perc,
							stopC = `rgb(${gray},${gray},${gray})`;
						// midpoint
						if (i != 0) {
							let prev = opacityStops[i - 1].v,
								midpointX = Self.vars.stripWidth * (prev.Lctn.v + (stop.Lctn.v - prev.Lctn.v) * stop.Mdpn.v / 100) / Self.vars.locationScale;
							aTrack.push(`<span class="mid" data-ux="gam-handle" style="--x: ${midpointX};"></span>`);
						}
						// alpha point
						aTrack.push(`<span class="point" data-ux="gap-handle" style="--c: ${stopC}; --x: ${stopX}; --perc: ${perc};"></span>`);
					}
					Self.els.trackAlpha.html(aTrack.join(""));

					for (let i=0; i<colorStops.length; i++) {
						let stop = colorStops[i].v,
							rgb = resolvedColors[0][i][0],
							perc = stop.Lctn.v / Self.vars.locationScale,
							stopX = Self.vars.stripWidth * perc,
							stopC = `rgb(${Math.round(rgb.o)},${Math.round(rgb.J)},${Math.round(rgb.k)})`;
						// midpoint
						if (i != 0) {
							var prev = colorStops[i - 1].v,
								midpointX = Self.vars.stripWidth * (prev.Lctn.v + (stop.Lctn.v - prev.Lctn.v) * stop.Mdpn.v / 100) / Self.vars.locationScale;
							cTrack.push(`<span class="mid" data-ux="gcm-handle" style="--x: ${midpointX};"></span>`);
						}
						// color point
						cTrack.push(`<span class="point" data-ux="gcp-handle" style="--c: ${stopC}; --x: ${stopX}; --perc: ${perc};"></span>`);
					}
					Self.els.trackColors.html(cTrack.join(""));
					break;
				
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					// fast references
					Self.els = {
						cvs: event.dEl.find(".gradient canvas"),
						iPointColor: event.dEl.find(`.fields-color .color-preset`),
						plInput: event.dEl.find(`.fields-color input[data-name="color-location"]`),
						plKnob: event.dEl.find(`.fields-color .knob`),
						trackAlpha: event.dEl.find(`.track[data-ux="ga-track"]`),
						trackColors: event.dEl.find(`.track[data-ux="gc-track"]`),
					};
					// vars used
					Self.vars = {
						fgColor: 0, // black
						bgColor: 16777215, // white
						locationScale: 4096,
						stripWidth: +Self.els.cvs.prop("offsetWidth"),
						stripHeight: +Self.els.cvs.prop("offsetHeight"),
						// preset: { ...Registry.gradients.list[8] },
					};
					// prepare canvas element
					Self.els.ctx = Self.els.cvs[0].getContext("2d", { willReadFrequently: true });
					Self.els.cvs.attr({
						width: Self.vars.stripWidth,
						height: Self.vars.stripHeight,
					});
					// render gradient preset list
					window.render({
						template: "preset-gradient-list",
						match: "//Gradients",
						target: event.dEl.find(".preset-fields"),
					}).then(() => {
						// click on a preset
						event.dEl.find(`.preset-fields li`).get(8).trigger("click");
						// trigger "selected" on for color point
						event.dEl.find(".gradient-slider .track.alpha .point:nth(0)").trigger("mousedown").trigger("mouseup");
						// event.dEl.find(".gradient-slider .track.colors .point:nth(0)").trigger("mousedown").trigger("mouseup");
					});
					break;
				case "dlg-close":
					// make sure layer style is covered
					window.find(`.dialog-box[data-dlg="dlgLayerStyle"]`).removeClass("covered");
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgGradientEditor" });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgGradientEditor" });
			}
		}
	},
	dlgSelectMagicCut: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectMagicCut,
				el;
			switch (event.type) {
				case "set-workarea-layout":
					el = $(event.target).parents("?li[data-id]");
					event.el.find(".active").removeClass("active");
					el.addClass("active");
					// update DOM layout
					event.el.parents(".dlg-content").find(`.work-cvs`).data({ layout: el.data("id") });
					break;
				case "set-mode":
					el = $(event.target);
					event.el.find(".active").removeClass("active");
					el.addClass("active");
					break;
				case "set-result-bg":
					el = $(event.target);
					event.el.find(".active").removeClass("active");
					el.addClass("active");
					// update DOM layout
					event.el.parents(".dlg-content").find(`.work-cvs`).data({ resultBg: el.data("id") });
					break;
				case "open-help-page":
					console.log(event.el.data("arg"));
					karaqu.shell("fs -u '~/help/toc.md'");
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectMagicCut" });
			}
		}
	},
	dlgSelectRefineEdge: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectRefineEdge,
				el;
			switch (event.type) {
				case "set-workarea-layout":
					el = $(event.target).parents("?li[data-id]");
					event.el.find(".active").removeClass("active");
					el.addClass("active");
					// update DOM layout
					event.el.parents(".dlg-content").find(`.work-cvs`).data({ layout: el.data("id") });
					break;
				case "set-mode":
					el = $(event.target);
					event.el.find(".active").removeClass("active");
					el.addClass("active");
					break;
				case "set-result-bg":
					el = $(event.target);
					event.el.find(".active").removeClass("active");
					el.addClass("active");
					// update DOM layout
					event.el.parents(".dlg-content").find(`.work-cvs`).data({ resultBg: el.data("id") });
					break;
				case "open-help-page":
					console.log(event.el.data("arg"));
					karaqu.shell("fs -u '~/help/toc.md'");
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectRefineEdge" });
			}
		}
	},
	dlgQuickMaskOptions: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgQuickMaskOptions,
				el;
			switch (event.type) {
				case "select-style":
					break;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgQuickMaskOptions" });
			}
		}
	},
	dlgFlame: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgFlame,
				el;
			switch (event.type) {
				case "select-style":
					el = $(event.target);
					event.el.parents(".fields").data({ show: el.data("id") });
					break;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFlame" });
			}
		}
	},
	dlgThreshold: {
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgThreshold,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-amount":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.value = event.value;

					// selected layer
					Doc.g = [0];
					// save raf
					let fn = () => {
							let qv = FilterHelper.oT("thrs");
							qv.Lvl.v =
							Self.values.amount.value = event.value;
							PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "thrs", qv, ve: false } });
							PP.update();
							delete Self.timer;
						};
					if (Self.timer) {
						cancelAnimationFrame(Self.timer);
						delete Self.timer;
					} else Self.timer = requestAnimationFrame(fn);

					return;

				// run once app opens
				case "dlg-init": break;
				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", value: Self.values.amount.value });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgThreshold" });
			}
		}
	},
	dlgCrystallize: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCrystallize,
				pixels,
				copy;
			switch (event.type) {
				// "fast events"
				case "set-size":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgCrystallize" });
			}
		}
	},
	dlgPointillize: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPointillize,
				pixels,
				copy;
			switch (event.type) {
				// "fast events"
				case "set-size":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPointillize" });
			}
		}
	},
	dlgMosaic: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMosaic,
				pixels,
				copy;
			switch (event.type) {
				// "fast events"
				case "set-size":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMosaic" });
			}
		}
	},
	dlgMezzoint: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMezzoint,
				pixels,
				copy;
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMezzoint" });
			}
		}
	},
	dlgColorHalftone: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgColorHalftone,
				pixels,
				copy;
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgColorHalftone" });
			}
		}
	},
	dlgFill: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgFill,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				case "change-fill-option":
					pEl = event.el.parents(".fields");
					pEl.find(`.field-row[data-option="Custom"]`).toggleClass("hidden", event.text === "Custom");
					pEl.find(`.field-row[data-option="Pattern"]`).toggleClass("hidden", event.text === "Pattern");
					// TODO: do something with event.value
					break;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFill" });
			}
		}
	},
	dlgNormalMap: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgNormalMap,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgNormalMap" });
			}
		}
	},
	dlgTextureDilation: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgTextureDilation,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgTextureDilation" });
			}
		}
	},
	dlgBoxBlur: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgBoxBlur,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgBoxBlur" });
			}
		}
	},
	dlgGaussianBlur: {
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgGaussianBlur,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-radius":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.value = event.value;

					// selected layer
					Doc.g = [0];
					// save raf
					let fn = () => {
							let qv = FilterHelper.oT("GsnB");
							qv.Rds.v.val =
							Self.values.radius.value = event.value;
							PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "GsnB", qv, ve: false } });
							PP.update();
							delete Self.timer;
						};
					if (Self.timer) {
						cancelAnimationFrame(Self.timer);
						delete Self.timer;
					} else Self.timer = requestAnimationFrame(fn);

					return;

				// run once app opens
				case "dlg-init": break;
				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", value: Self.values.radius.value });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", value: Self.values.radius.value });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "GsnB" } });
						PP.update();
					}
					break;
				case "dlg-reset":
					Self.root.find(`.field-row input[data-default]`).map(iEl => {
						Self.values[iEl.getAttribute("name")].value = Self.values[iEl.getAttribute("name")].default;
						iEl.value = iEl.getAttribute("data-default");
					});
					// make sure knobs in dialog is synced with its sibling input element
					UI.doDialogKnob({ type: "set-initial-value", dEl: Self.root });

					Self.dispatch({ type: "apply-filter-data", value: Self.values.radius.default });
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "GsnB" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: "dlgGaussianBlur" });

					// console.log(Doc);
					break;
				case "dlg-close": // cancel
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "GsnB" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgGaussianBlur" });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgGaussianBlur" });
			}
		}
	},
	dlgLensBlur: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgLensBlur,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLensBlur" });
			}
		}
	},
	dlgMotionBlur: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMotionBlur,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMotionBlur" });
			}
		}
	},
	dlgRadialBlur: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgRadialBlur,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgRadialBlur" });
			}
		}
	},
	dlgSurfaceBlur: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSurfaceBlur,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSurfaceBlur" });
			}
		}
	},
	dlgDisplace: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDisplace,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDisplace" });
			}
		}
	},
	dlgKaleidoscope: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgKaleidoscope,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgKaleidoscope" });
			}
		}
	},
	dlgPinch: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPinch,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPinch" });
			}
		}
	},
	dlgPolarCoordinates: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPolarCoordinates,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPolarCoordinates" });
			}
		}
	},
	dlgRipple: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgRipple,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgRipple" });
			}
		}
	},
	dlgShear: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgShear,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgShear" });
			}
		}
	},
	dlgSpherize: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSpherize,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSpherize" });
			}
		}
	},
	dlgTwirl: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgTwirl,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgTwirl" });
			}
		}
	},
	dlgWave: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgWave,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgWave" });
			}
		}
	},
	dlgZigZag: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgZigZag,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgZigZag" });
			}
		}
	},
	dlgAddNoise: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgAddNoise,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgAddNoise" });
			}
		}
	},
	dlgDustScratches: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDustScratches,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDustScratches" });
			}
		}
	},
	dlgMedian: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMedian,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMedian" });
			}
		}
	},
	dlgReduceNoise: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgReduceNoise,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgReduceNoise" });
			}
		}
	},
	dlgFibers: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgFibers,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFibers" });
			}
		}
	},
	dlgLensFlare: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgLensFlare,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLensFlare" });
			}
		}
	},
	dlgSmartSharpen: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSmartSharpen,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSmartSharpen" });
			}
		}
	},
	dlgUnsharpMask: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgUnsharpMask,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgUnsharpMask" });
			}
		}
	},
	dlgDiffuse: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDiffuse,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDiffuse" });
			}
		}
	},
	dlgEmboss: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgEmboss,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgEmboss" });
			}
		}
	},
	dlgOilPaint: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgOilPaint,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgOilPaint" });
			}
		}
	},
	dlgTraceContour: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgTraceContour,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgTraceContour" });
			}
		}
	},
	dlgWind: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgWind,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgWind" });
			}
		}
	},
	dlgHighPass: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgHighPass,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgHighPass" });
			}
		}
	},
	dlgHsbHsl: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgHsbHsl,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgHsbHsl" });
			}
		}
	},
	dlgMaximum: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMaximum,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMaximum" });
			}
		}
	},
	dlgMinimum: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMinimum,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMinimum" });
			}
		}
	},
	dlgOffset: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgOffset,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgOffset" });
			}
		}
	},
	dlgRepeat: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgRepeat,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgRepeat" });
			}
		}
	},
	dlgColorToAlpha: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgColorToAlpha,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgColorToAlpha" });
			}
		}
	},
	dlgDither: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDither,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDither" });
			}
		}
	},
	dlgParticles: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgParticles,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgParticles" });
			}
		}
	},
	dlgCameraRaw: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCameraRaw,
				pixels,
				copy,
				pEl;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				// run once app opens
				case "dlg-init": break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgCameraRaw" });
			}
		}
	},
	dlgLiquify: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgLiquify,
				pixels,
				copy,
				el;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				case "preview-zoom-out":
				case "preview-zoom-in":
					break;
				case "select-liquify-tool":
					el = $(event.target);
					event.el.find(".active").removeClass("active");
					el.addClass("active");
					break;
				case "set-liquify-background":
					event.el.parents(".field-row")
						.nextAll(".field-row").get(0).find(".option")
						.toggleClass("disabled", event.el.data("value") === "on");
					break;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLiquify" });
			}
		}
	},
	dlgAddGuides: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgAddGuides,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgAddGuides" });
					break;
			}
		}
	},
	dlgCanvasSize: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCanvasSize;
			switch (event.type) {
				// "fast events"
				case "set-canvas-width":
					Self.newDim.width = event.value;
					Self.dlgCanvasSize({ type: "set-canvas-resize-anchor" });
					return;
				case "set-canvas-height":
					Self.newDim.height = event.value;
					Self.dlgCanvasSize({ type: "set-canvas-resize-anchor" });
					return;

				case "set-canvas-resize-anchor":
					if (event.el && event.el[0] === event.target) return;

					let el = $(event.target);
					if (event.target) Self.index = el.index();

					let adjacent = [...Self.matrix[Self.index]], // clone adjacent matrix
						hCol = Self.oldDim.width >= Self.newDim.width,
						vCol = Self.oldDim.height >= Self.newDim.height;
					// compare old vs new dimensions
					adjacent = adjacent.map(e => {
						let v = e;
						switch (e) {
							case "n": if (vCol) v = "s"; break;
							case "e": if (hCol) v = "w"; break;
							case "w": if (hCol) v = "e"; break;
							case "s": if (vCol) v = "n"; break;
							case "ne": if (vCol && vCol) v = "sw"; break;
							case "nw": if (vCol && vCol) v = "se"; break;
							case "se": if (vCol && vCol) v = "nw"; break;
							case "sw": if (vCol && vCol) v = "ne"; break;
						}
						return v;
					});
					// iterate arrows
					Self.els.map((aElem, i) => {
						let aEl = $(aElem),
							cn = ["grid-arrow"];
						if (adjacent[i] > 0) cn.push("n");
						else cn.push(adjacent[i]);
						// update element class name
						aEl.prop({ className: cn.join(" ") });
					});
					break;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					// initial values
					Self.els = event.dEl.find(".grid-arrow");
					Self.oldDim = {
						width: parseInt(event.dEl.find(`input[name="canvas-width"]`).val(), 10),
						height: parseInt(event.dEl.find(`input[name="canvas-height"]`).val(), 10),
					};
					Self.newDim = {
						width: parseInt(event.dEl.find(`input[name="canvas-width"]`).val(), 10),
						height: parseInt(event.dEl.find(`input[name="canvas-height"]`).val(), 10),
					};
					Self.index = 4;
					Self.matrix = [
						[ "c", "w", -1, "s", "sw", -1, -1, -1, -1],
						[ "e", "c", "w", "se", "s", "sw", -1, -1, -1],
						[-1, "e", "c", -1, "se", "s", -1, -1, -1],
						[ "n", "nw", -1, "c", "w", -1, "s", "sw", -1],
						["ne", "n", "nw", "e", "c", "w", "se", "s", "sw"],
						[-1, "ne", "n", -1, "e", "c", -1, "se", "s"],
						[-1, -1, -1, "n", "nw", -1, "c", "w", -1],
						[-1, -1, -1, "ne", "n", "nw", "e", "c", "w"],
						[-1, -1, -1, -1, "ne", "n", -1, "e", "c"],
					];
					/* falls through */
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgCanvasSize" });
					break;
			}
		}
	},
	dlgImageSize: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgImageSize,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				
				case "toggle-ratio-linked":
					event.el.toggleClass("active", event.el.hasClass("active"));
					break;
				case "toggle-resampled":
					event.el.parents(".field-row")
						.nextAll(".field-row").get(0)
						.find(".option").toggleClass("disabled", event.el.data("value") === "on");
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					// click on a preset
					requestAnimationFrame(() =>
						event.dEl.find(`.presets li[data-id="prst-2"]`).trigger("mousedown").trigger("click"));
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgImageSize" });
					break;
			}
		}
	},
	dlgBlackWhite: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgBlackWhite,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgBlackWhite" });
					break;
			}
		}
	},
	dlgExposure: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgExposure,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgExposure" });
					break;
			}
		}
	},
	dlgVibrance: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgVibrance,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgVibrance" });
					break;
			}
		}
	},
	dlgColorBalance: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgColorBalance,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "set-cyan-red-value":
				case "set-magenta-green-value":
				case "set-yellow-blue-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgColorBalance" });
					break;
			}
		}
	},
	dlgHueSaturation: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgHueSaturation,
				value,
				el;
			switch (event.type) {
				// "fast events"
				case "set-hue-value":
				case "set-saturation-value":
				case "set-lightness-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;

				case "toggle-image-saturation":
					value = event.el.hasClass("active");
					event.el.toggleClass("active", value);
					break;
				case "set-color-range":
					el = event.el.parents(".dlg-content").find(".has-ranges-tools, .has-sliders-only");
					if (event.value === "0") {
						// master
						el.removeClass("show");
					} else {
						el.addClass("show");
						value = Self.colorRanges[event.text.toLowerCase()];
						el.find(".q-slider").css({
							"--x1": value.x1,
							"--w1": value.w1,
							"--w2": value.w2,
						});
					}
					break;
				case "select-pipette":
					event.el.find(".active").removeClass("active");
					el = $(event.target).addClass("active");
					console.log(el.data("arg"));
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					Self.colorRanges = {
						master:  {}, // q-slider not visible
						cyan:    { x1: 0, w1: 70, w2: 22 },
						blue:    { x1: 69, w1: 70, w2: 22 },
						magenta: { x1: 138, w1: 70, w2: 22 },
						red:     { x1: 207, w1: 70, w2: 22 },
						yellow:  { x1: 276, w1: 70, w2: 22 },
						green:   { x1: 345, w1: 70, w2: 22 },
					};
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgHueSaturation" });
					break;
			}
		}
	},
	dlgLevels: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgLevels,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLevels" });
					break;
			}
		}
	},
	dlgMatchColor: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMatchColor,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMatchColor" });
					break;
			}
		}
	},
	dlgPhotoFilter: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPhotoFilter,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPhotoFilter" });
					break;
			}
		}
	},
	dlgSelectiveColor: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectiveColor,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectiveColor" });
					break;
			}
		}
	},
	dlgCurves: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCurves,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgCurves" });
					break;
			}
		}
	},
	dlgChannelMixer: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgChannelMixer,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgChannelMixer" });
					break;
			}
		}
	},
	dlgGradientMap: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgGradientMap,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;

				case "select-gradient":
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgGradientMap" });
					break;
			}
		}
	},
	dlgPosterize: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPosterize,
				el;
			// console.log(event);
			switch (event.type) {
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPosterize" });
					break;
			}
		}
	},
	dlgReplaceColor: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgReplaceColor,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgReplaceColor" });
					break;
			}
		}
	},
	dlgSelectColorRange: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectColorRange,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;

				case "set-select-range":
					event.el.parents(".fields").data({ mode: event.value });
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectColorRange" });
					break;
			}
		}
	},
	dlgShadowHighlights: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgShadowHighlights,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgShadowHighlights" });
					break;
			}
		}
	},
	dlgTrim: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgTrim,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgTrim" });
					break;
			}
		}
	},
	dlgSelectModifyBorder: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifyBorder,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifyBorder" });
					break;
			}
		}
	},
	dlgSelectModifySmooth: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifySmooth,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifySmooth" });
					break;
			}
		}
	},
	dlgSelectModifyExpand: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifyExpand,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifyExpand" });
					break;
			}
		}
	},
	dlgSelectModifyContract: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifyContract,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifyContract" });
					break;
			}
		}
	},
	dlgSelectModifyFeather: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifyFeather,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifyFeather" });
					break;
			}
		}
	},
	dlgApplyImage: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgApplyImage,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;

				case "change-target-mode":
					// update inline "selectbox"
					event.el.removeClass("opened").html(event.text);
					// update dbl-slider
					event.el.parents(".fields").data({ target: event.value });
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgApplyImage" });
					break;
			}
		}
	},
	dlgArtboard: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgArtboard,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgArtboard" });
					break;
			}
		}
	},
	dlgColorLookup: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgColorLookup,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgColorLookup" });
					break;
			}
		}
	},
	dlgDuplicateInto: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDuplicateInto,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDuplicateInto" });
					break;
			}
		}
	},
	dlgFileInfo: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgFileInfo,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFileInfo" });
					break;
			}
		}
	},
	dlgVariables: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgVariables,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgVariables" });
					break;
			}
		}
	},
	dlgExportColorLookUp: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgExportColorLookUp,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgExportColorLookUp" });
					break;
			}
		}
	},
	dlgExportLayers: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgExportLayers,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;

				case "set-export-mode":
					event.el.parents(".fields").data({ mode: event.el.text().toLowerCase() });
					break;
				case "set-export-type":
					event.el.parents(".fields").data({ export: event.text.toLowerCase() });
					break;

				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgExportLayers" });
					break;
			}
		}
	},
	dlgExportAs: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgExportAs,
				el;
			// console.log(event);
			switch (event.type) {
				case "set-export-format":
					event.el.parents(".options-wrapper").data({ show: event.text.toLowerCase() });
					break;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					if (event.args.length) {
						let el = event.dEl.find(`.option.select[data-change="set-export-format"] .value`),
							text = event.args[0].toLowerCase();
						el.text(text);
						Self.dlgExportAs({ type: "set-export-format", el, text });
					}
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgExportAs" });
					break;
			}
		}
	},
	dlgToolShape: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgToolShape,
				el;
			// console.log(event);
			switch (event.type) {
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					if (event.args.length) {
						let el = event.dEl.find(`h2 span.type`),
							text = event.args[0].toLowerCase();
						el.text(text);
					}
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgToolShape" });
					break;
			}
		}
	},
	dlgPreferences: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPreferences,
				selEl,
				el;
			// console.log(event);
			switch (event.type) {
				case "select-pref-option":
					el = $(event.target).parents("?.option");
					if (!el.length) return;
					event.el.find(".selected").removeClass("selected");
					el.addClass("selected");

					selEl = el.find("label").length ? el.find("label") : el;
					el.parents(".dlg-content").find(".pref-details").data({ show: selEl.html().replace("&amp; ", "") });
					break;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPreferences" });
					break;
			}
		}
	},
	dlgPresetManager: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPresetManager,
				selEl,
				pEl,
				el;
			// console.log(event);
			switch (event.type) {
				case "select-preset-option":
					el = $(event.target).parents("?.option");
					if (!el.length) return;
					event.el.find(".selected").removeClass("selected");
					el.addClass("selected");

					selEl = el.find("label").length ? el.find("label") : el;
					pEl = el.parents(".dlg-content");
					pEl.data({ show: selEl.html().replace("&amp; ", "") });

					// render preset list if needed
					let target = pEl.find(`.preset-fields[data-name="${pEl.data("show")}"]`);
					if (!target.find("ul").length) {
						let records = {
								"Brush":       { template: "preset-brush-list", match: "//Brushes" },
								"Gradient":    { template: "preset-gradient-list", match: "//Gradients" },
								"Pattern":     { template: "preset-pattern-list", match: "//Patterns" },
								"Layer Style": { template: "preset-layer-style-list", match: "//LayerStyles" },
								"Shapes":      { template: "preset-shapes-list", match: "//Shapes" },
								"Contour":     { template: "preset-contour-list", match: "//Contours" },
							};
						window.render({ ...records[pEl.data("show")], target });
					}
					break;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					if (!event.args.length) {
						// auto select "brush"option
						event.args = ["Brush"];
					}
					el = event.dEl.find(`.presets .option:contains(${event.args[0]})`);
					if (el.length) el.trigger("click");
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPresetManager" });
					break;
			}
		}
	},
	dlgPixelator: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPixelator,
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					// click on a preset
					requestAnimationFrame(() =>
						event.dEl.find(`.presets li[data-id="prst-2"]`).trigger("mousedown").trigger("click"));
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPixelator" });
					break;
			}
		}
	},
	dlgColors: {
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgColors,
				value,
				el;
			switch (event.type) {
				// "fast events"
				case "set-color-opacity":
					Self.els.content.css({ "--alpha": event.value / 100 });
					return;

				// slow/once events
				case "before:set-color-opacity":
					// fast references
					Self.els = {
						content: event.dEl.find(".dlg-content"),
					};
					break;
				case "after:set-color-opacity":
					break;
					
				// run once app opens
				case "dlg-init": break;
				// standard dialog events
				case "dlg-open":
					// position cursors
					UI.doColorBox({ ...event, type: "position-cursor" });
					UI.doHueBar({ ...event, type: "position-cursor" });
					// save reference to event
					Self.srcEvent = event;
					break;
				case "dlg-ok":
					el = Self.srcEvent.dEl.find(".dlg-content");
					if (Self.srcEvent.callback) {
						Self.srcEvent.callback({
							value: el.cssProp("--color"),
							src: event.src,
						});
					}
					// close dialog
					Self.dlgColors({ ...event, type: "dlg-close" });
					break;
				case "dlg-close":
					UI.doDialog(event);
					// delete reference
					delete Self.srcEvent;
					break;
			}
		}
	}
};
