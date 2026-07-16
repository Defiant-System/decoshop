
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
		name: "dlgLensCorrection",
		preview: true,
		values: {},
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

				// standard dialog events
				case "dlg-open":
					// make sure layer style is covered
					window.find(`.dialog-box[data-dlg="dlgLayerStyle"]`).addClass("covered");
					break;
				case "dlg-close":
					// make sure layer style is covered
					window.find(`.dialog-box[data-dlg="dlgLayerStyle"]`).removeClass("covered");
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgLayerStyle: {
		name: "dlgLayerStyle",
		preview: true,
		values: {},
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
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgContourEditor: {
		name: "dlgContourEditor",
		preview: true,
		values: {},
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

				// standard dialog events
				case "dlg-open":
					// make sure layer style is covered
					window.find(`.dialog-box[data-dlg="dlgLayerStyle"]`).addClass("covered");
					break;
				case "dlg-close":
					// make sure layer style is covered
					window.find(`.dialog-box[data-dlg="dlgLayerStyle"]`).removeClass("covered");
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgFilterGallery: {
		name: "dlgFilterGallery",
		preview: true,
		values: {},
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
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgBrightnessContrast: {
		name: "dlgBrightnessContrast",
		preview: true,
		values: {},
		dispatch(event) {
			/*
			 * Brightness -  Min: -150   Max: 150
			 * Contrast -    Min: -100   Max: 100
			 */
			let APP = decoshop,
				Self = Dialogs.dlgBrightnessContrast,
				Doc = Self.doc;
			switch (event.type) {
				// "fast events"
				case "set-contrast":
					event.values = Self.values; // first copy values
					event.values.contrast.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-brightness":
					event.values = Self.values; // first copy values
					event.values.brightness.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-legacy":
					event.values = Self.values; // first copy values
					event.values.legacy.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("brit");
						qv.Brgh.v = Self.values.brightness.value;
						qv.Cntr.v = Self.values.contrast.value;
						qv.useLegacy.v = Self.values.legacy.value;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "brit", qv, ve: false } });
						PP.update();
					});
					return;
				
				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "brit" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "brit" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "brit" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				// standard dialog events
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgLayerPanelOptions: {
		name: "dlgLayerPanelOptions",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgBrightnessContrast,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// standard dialog events
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgScaleEffects: {
		name: "dlgScaleEffects",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgScaleEffects,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// standard dialog events
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgWarp: {
		name: "dlgWarp",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgWarp,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// standard dialog events
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgStroke: {
		name: "dlgStroke",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgStroke,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// standard dialog events
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgGradientEditor: {
		name: "dlgGradientEditor",
		preview: true,
		values: {},
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
					Self.dispatch({ type: "draw-gradient-preset", gradient: Self.vars.preset });
					return; // exit function for perf
				case "update-alpha-value":
					Self.vars.preset.Trns.v[0].v.Opct.v.val = event.value;
					Self.dispatch({ type: "draw-gradient-preset", gradient: Self.vars.preset });
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
					Self.dispatch({ type: "draw-gradient-preset", gradient: Self.vars.preset });
					Self.dispatch({ type: "plot-gradient-points", gradient: Self.vars.preset });
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
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSelectMagicCut: {
		name: "dlgSelectMagicCut",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectMagicCut,
				Doc = Self.doc;
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

				// standard dialog events
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSelectRefineEdge: {
		name: "dlgSelectRefineEdge",
		preview: true,
		values: {},
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

				// standard dialog events
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgQuickMaskOptions: {
		name: "dlgQuickMaskOptions",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgQuickMaskOptions,
				Doc = Self.doc;
			switch (event.type) {
				case "select-style":
					break;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgFlame: {
		name: "dlgFlame",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgFlame,
				Doc = Self.doc;
			switch (event.type) {
				case "select-style":
					el = $(event.target);
					event.el.parents(".fields").data({ show: el.data("id") });
					break;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgThreshold: {
		name: "dlgThreshold",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgThreshold,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-threshold":
					event.values = Self.values; // first copy values
					event.values.threshold.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("thrs");
						qv.Lvl.v = Self.values.threshold.value;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "thrs", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "thrs" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "thrs" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "thrs" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgCrystallize: {
		name: "dlgCrystallize",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCrystallize,
				Doc = Self.doc;
			switch (event.type) {
				// "fast events"
				case "set-size":
					event.values = Self.values; // first copy values
					event.values.size.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Crst");
						qv.ClSz.v = Self.values.size.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Crst", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Crst" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Crst" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Crst" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgPointillize: {
		name: "dlgPointillize",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPointillize,
				Doc = Self.doc;
			switch (event.type) {
				// "fast events"
				case "set-size":
					event.values = Self.values; // first copy values
					event.values.size.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Pntl");
						qv.ClSz.v = Self.values.size.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Pntl", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Pntl" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Pntl" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Pntl" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgMosaic: {
		name: "dlgMosaic",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMosaic,
				Doc = Self.doc;
			switch (event.type) {
				// "fast events"
				case "set-size":
					event.values = Self.values; // first copy values
					event.values.size.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Msc ");
						qv.ClSz.v.val = Self.values.size.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Msc ", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Msc " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Msc " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Msc " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgMezzotint: {
		name: "dlgMezzotint",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMezzotint,
				Doc = Self.doc;
			switch (event.type) {
				// "fast events"
				case "set-type":
					event.values = Self.values; // first copy values
					event.values.type.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Mztn");
						qv.MztT.v.MztT = Self.values.type.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Mztn", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// select options
					Self.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Mztn" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Mztn" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Mztn" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgColorHalftone: {
		name: "dlgColorHalftone",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgColorHalftone,
				Doc = Self.doc;
			switch (event.type) {
				// "fast events"
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-angle1":
					event.values = Self.values; // first copy values
					event.values.angle1.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-angle2":
					event.values = Self.values; // first copy values
					event.values.angle2.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-angle3":
					event.values = Self.values; // first copy values
					event.values.angle3.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-threshold":
					event.values = Self.values; // first copy values
					event.values.threshold.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("ClrH");
						qv.Rds.v = Self.values.radius.value;
						qv.Ang1.v = Self.values.angle1.value;
						qv.Ang2.v = Self.values.angle2.value;
						qv.Ang3.v = Self.values.angle3.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "ClrH", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "ClrH" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "ClrH" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "ClrH" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgFill: {
		name: "dlgFill",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgFill,
				Doc = Self.doc;
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

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgNormalMap: {
		name: "dlgNormalMap",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgNormalMap,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-blur":
					event.values = Self.values; // first copy values
					event.values.blur.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-scale":
					event.values = Self.values; // first copy values
					event.values.scale.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-invert":
					event.values = Self.values; // first copy values
					event.values.invert.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-high":
					event.values = Self.values; // first copy values
					event.values.high.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-medium":
					event.values = Self.values; // first copy values
					event.values.medium.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-low":
					event.values = Self.values; // first copy values
					event.values.low.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;

				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("lightFilterGradient");
						qv.blur.v = Self.values.blur.value;
						qv.textureScale.v = Self.values.scale.value / 100;
						qv.Scl.v = Self.values.invert.value ? 1 : -1;
						qv.Dtl.v[0].v = Self.values.high.value;
						qv.Dtl.v[1].v = Self.values.medium.value;
						qv.Dtl.v[2].v = Self.values.low.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "lightFilterGradient", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "lightFilterGradient" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "lightFilterGradient" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "lightFilterGradient" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgTextureDilation: {
		name: "dlgTextureDilation",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgTextureDilation,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-crop":
					event.values = Self.values; // first copy values
					event.values.crop.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Dila");
						qv.Crop.v.val = Self.values.crop.value;
						qv.Rds.v.val = Self.values.radius.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Dila", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Dila" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Dila" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Dila" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgBoxBlur: {
		name: "dlgBoxBlur",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgBoxBlur,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("boxblur");
						qv.Rds.v.val = Self.values.radius.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "boxblur", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "boxblur" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "boxblur" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "boxblur" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgGaussianBlur: {
		name: "dlgGaussianBlur",
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
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("GsnB");
						qv.Rds.v.val = Self.values.radius.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "GsnB", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "GsnB" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "GsnB" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "GsnB" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgLensBlur: {
		name: "dlgLensBlur",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgLensBlur,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-depth":
					event.values = Self.values; // first copy values
					event.values.depth.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-focal":
					event.values = Self.values; // first copy values
					event.values.focal.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-shape":
					event.values = Self.values; // first copy values
					event.values.shape.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-invert":
					event.values = Self.values; // first copy values
					event.values.invert.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-angle":
					event.values = Self.values; // first copy values
					event.values.angle.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-brightness":
					event.values = Self.values; // first copy values
					event.values.brightness.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-threshold":
					event.values = Self.values; // first copy values
					event.values.threshold.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-noise":
					event.values = Self.values; // first copy values
					event.values.noise.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-distribution":
					// first copy values
					event.values = Self.values;
					// then partial overwrite
					event.values.distribution.value = event.target.getAttribute("data-value");
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-monochromatic":
					event.values = Self.values; // first copy values
					event.values.monochromatic.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;

				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Bokh");
						switch (Self.values.depth.value) {
							case "BeIn": qv.BkDi.v.BtDi = "BeIn"; delete qv.BkDc; break;
							case "BeCt": qv.BkDi.v.BtDi = "BeIt"; qv.BkDc = { t: "enum", v: { BtDc: "BeCt" } }; break;
							case "BeCm": qv.BkDi.v.BtDi = "BeIt"; qv.BkDc = { t: "enum", v: { BtDc: "BeCm" } }; break;
						}
						qv.BkDp.v = Self.values.focal.value;
						qv.BkDs.v = Self.values.invert.value;
						qv.BkIs.v.BtIs = Self.values.shape.value;
						qv.BkIb.v = Self.values.radius.value;
						qv.BkIr.v = Self.values.angle.value;
						qv.BkSb.v = Self.values.brightness.value;
						qv.BkSt.v = Self.values.threshold.value;
						qv.BkNa.v = Self.values.noise.value;
						qv.BkNt.v.BtNt = Self.values.distribution.value;
						qv.BkNm.v = Self.values.monochromatic.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Bokh", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// select options
					Self.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Bokh" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Bokh" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Bokh" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgMotionBlur: {
		name: "dlgMotionBlur",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMotionBlur,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-angle":
					event.values = Self.values; // first copy values
					event.values.angle.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-distance":
					event.values = Self.values; // first copy values
					event.values.distance.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("MtnB");
						qv.Angl.v = -Self.values.angle.value;
						qv.Dstn.v.val = Self.values.distance.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "MtnB", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "MtnB" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "MtnB" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "MtnB" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgRadialBlur: {
		name: "dlgRadialBlur",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgRadialBlur,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSurfaceBlur: {
		name: "dlgSurfaceBlur",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSurfaceBlur,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-threshold":
					event.values = Self.values; // first copy values
					event.values.threshold.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("surfaceBlur");
						qv.Rds.v.val = Self.values.radius.value;
						qv.Thsh.v = Self.values.threshold.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "surfaceBlur", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "surfaceBlur" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "surfaceBlur" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "surfaceBlur" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgDisplace: {
		name: "dlgDisplace",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDisplace,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgKaleidoscope: {
		name: "dlgKaleidoscope",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgKaleidoscope,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-mirrors":
					event.values = Self.values; // first copy values
					event.values.mirrors.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-angle":
					event.values = Self.values; // first copy values
					event.values.angle.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Kale");
						qv.Mirr.v = Self.values.mirrors.value;
						qv.MRot.v = Self.values.angle.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Kale", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Kale" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Kale" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Kale" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgPinch: {
		name: "dlgPinch",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPinch,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Pnch");
						qv.Amnt.v = Self.values.amount.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Pnch", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Pnch" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Pnch" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Pnch" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgPolarCoordinates: {
		name: "dlgPolarCoordinates",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPolarCoordinates,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-coordinates":
					// first copy values
					event.values = Self.values;
					// then partial overwrite
					event.values.coordinates.value = event.value || event.target.getAttribute("data-value");
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Plr ");
						qv.Cnvr.v.Cnvr = Self.values.coordinates.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Plr ", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Plr " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Plr " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Plr " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgRipple: {
		name: "dlgRipple",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgRipple,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-size":
					// first copy values
					event.values = Self.values;
					// then partial overwrite
					event.values.size.value = event.target.getAttribute("data-value");
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Rple");
						qv.Amnt.v = Self.values.amount.value;
						qv.RplS.v.RplS = Self.values.size.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Rple", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Rple" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Rple" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Rple" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgShear: {
		name: "dlgShear",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgShear,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSpherize: {
		name: "dlgSpherize",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSpherize,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgTwirl: {
		name: "dlgTwirl",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgTwirl,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-angle":
					event.values = Self.values; // first copy values
					event.values.angle.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Twrl");
						qv.Angl.v = Self.values.angle.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Twrl", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Twrl" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Twrl" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Twrl" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgWave: {
		name: "dlgWave",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgWave,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgZigZag: {
		name: "dlgZigZag",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgZigZag,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-ridges":
					event.values = Self.values; // first copy values
					event.values.ridges.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-style":
					event.values = Self.values; // first copy values
					event.values.style.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("ZgZg");
						qv.Amnt.v = Self.values.amount.value;
						qv.NmbR.v = Self.values.ridges.value;
						qv.ZZTy.v.ZZTy = Self.values.style.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "ZgZg", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// select options
					Self.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "ZgZg" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "ZgZg" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "ZgZg" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgAddNoise: {
		name: "dlgAddNoise",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgAddNoise,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-distribution":
					event.values = Self.values; // first copy values
					event.values.distribution.value = event.value || event.target.getAttribute("data-value"); // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-monochromatic":
					event.values = Self.values; // first copy values
					event.values.monochromatic.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("AdNs");
						qv.Nose.v.val = Self.values.amount.value;
						qv.Dstr.v.Dstr = Self.values.distribution.value;
						qv.Mnch.v = Self.values.monochromatic.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "AdNs", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "AdNs" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "AdNs" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "AdNs" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgDustScratches: {
		name: "dlgDustScratches",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDustScratches,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-threshold":
					event.values = Self.values; // first copy values
					event.values.threshold.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("DstS");
						qv.Rds.v = Self.values.radius.value;
						qv.Thsh.v = Self.values.threshold.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "DstS", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "DstS" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "DstS" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "DstS" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgMedian: {
		name: "dlgMedian",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMedian,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Mdn ");
						qv.Rds.v.val = Self.values.radius.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Mdn ", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Mdn " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Mdn " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Mdn " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgReduceNoise: {
		name: "dlgReduceNoise",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgReduceNoise,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-strength":
					event.values = Self.values; // first copy values
					event.values.strength.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-detail":
					event.values = Self.values; // first copy values
					event.values.detail.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("denoise");
						qv.channelDenoise.v[0].v.Amnt.v = Self.values.strength.value;
						qv.channelDenoise.v[0].v.EdgF.v = Self.values.detail.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "denoise", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "denoise" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "denoise" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "denoise" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgFibers: {
		name: "dlgFibers",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgFibers,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-variance":
					event.values = Self.values; // first copy values
					event.values.variance.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-strength":
					event.values = Self.values; // first copy values
					event.values.strength.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "randomize-seed":
					event.values = Self.values; // first copy values
					event.values.random.value = Math.floor(Math.random() * 4294967295); // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Fbrs");
						qv.Vrnc.v = Self.values.variance.value;
						qv.Strg.v = Self.values.strength.value;
						qv.RndS.v = Self.values.random.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Fbrs", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// random seed
					let value = Math.floor(Math.random() * 4294967295);
					Self.values.random = { default: value, value };
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Fbrs" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Fbrs" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Fbrs" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgLensFlare: {
		name: "dlgLensFlare",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgLensFlare,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSmartSharpen: {
		name: "dlgSmartSharpen",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSmartSharpen,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("smartSharpen");
						qv.Amnt.v.val = Self.values.amount.value;
						qv.Rds.v.val = Self.values.radius.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "smartSharpen", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "smartSharpen" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "smartSharpen" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "smartSharpen" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgUnsharpMask: {
		name: "dlgUnsharpMask",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgUnsharpMask,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-threshold":
					event.values = Self.values; // first copy values
					event.values.threshold.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("UnsM");
						qv.Amnt.v.val = Self.values.amount.value;
						qv.Rds.v.val = Self.values.radius.value;
						qv.Thsh.v = Self.values.threshold.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "UnsM", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "UnsM" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "UnsM" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "UnsM" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgDiffuse: {
		name: "dlgDiffuse",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDiffuse,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-mode":
					event.values = Self.values; // first copy values
					event.values.mode.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Dfs ");
						qv.Md.v.DfsM = Self.values.mode.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Dfs ", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// select options
					Self.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Dfs " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Dfs " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Dfs " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgEmboss: {
		name: "dlgEmboss",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgEmboss,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-angle":
					event.values = Self.values; // first copy values
					event.values.angle.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-height":
					event.values = Self.values; // first copy values
					event.values.height.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Embs");
						qv.Angl.v = Self.values.angle.value;
						qv.Hght.v = Self.values.height.value;
						qv.Amnt.v = Self.values.amount.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Embs", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Embs" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Embs" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Embs" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgOilPaint: {
		name: "dlgOilPaint",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgOilPaint,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-cleanliness":
					event.values = Self.values; // first copy values
					event.values.cleanliness.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-brushScale":
					event.values = Self.values; // first copy values
					event.values.brushScale.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-microBrush":
					event.values = Self.values; // first copy values
					event.values.microBrush.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-specularity":
					event.values = Self.values; // first copy values
					event.values.specularity.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-angle":
					event.values = Self.values; // first copy values
					event.values.angle.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-lighting":
					event.values = Self.values; // first copy values
					event.values.lighting.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("oilPaint");
						qv.lightingOn.v = Self.values.lighting.value;
						qv.stylization.v = Self.values.radius.value;
						qv.brushScale.v = Self.values.brushScale.value;
						qv.microBrush.v = Self.values.microBrush.value;
						qv.LghD.v = Self.values.angle.value;
						qv.specularity.v = Self.values.specularity.value;
						qv.cleanliness.v = Self.values.cleanliness.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "oilPaint", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "oilPaint" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "oilPaint" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "oilPaint" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgTraceContour: {
		name: "dlgTraceContour",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgTraceContour,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-level":
					event.values = Self.values; // first copy values
					event.values.level.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-edge":
					// first copy values
					event.values = Self.values;
					// then partial overwrite
					event.values.edge.value = event.target.getAttribute("data-value");
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("TrcC");
						qv.Lvl.v = Self.values.level.value;
						qv.Edg.v.CntE = Self.values.edge.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "TrcC", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "TrcC" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "TrcC" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "TrcC" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgWind: {
		name: "dlgWind",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgWind,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-technique":
					event.values = Self.values; // first copy values
					event.values.technique.value = event.target.getAttribute("data-value");
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-direction":
					event.values = Self.values; // first copy values
					event.values.direction.value = event.target.getAttribute("data-value");
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Wnd ");
						qv.WndM.v.WndM = Self.values.technique.value;
						qv.Drct.v.Drct = Self.values.direction.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Wnd ", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Wnd " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Wnd " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Wnd " } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgHighPass: {
		name: "dlgHighPass",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgHighPass,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("HghP");
						qv.Rds.v.val = Self.values.radius.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "HghP", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "HghP" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "HghP" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "HghP" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgHsbHsl: {
		name: "dlgHsbHsl",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgHsbHsl,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-input":
					// first copy values
					event.values = Self.values;
					// then partial overwrite
					event.values.input.value = event.target.getAttribute("data-value");
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-output":
					// first copy values
					event.values = Self.values;
					// then partial overwrite
					event.values.output.value = event.target.getAttribute("data-value");
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("HsbP");
						qv.Inpt.v.ClrS = Self.values.input.value;
						qv.Otpt.v.ClrS = Self.values.output.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "HsbP", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "HsbP" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "HsbP" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "HsbP" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgMaximum: {
		name: "dlgMaximum",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMaximum,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-shape":
					event.values = Self.values; // first copy values
					event.values.shape.value = event.target.getAttribute("data-value"); // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Mxm ");
						qv.Rds.v.val = Self.values.radius.value;
						qv.preserveShape.v.preserveShape = Self.values.shape.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Mxm ", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Mxm " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Mxm " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Mxm " } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgMinimum: {
		name: "dlgMinimum",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMinimum,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-radius":
					event.values = Self.values; // first copy values
					event.values.radius.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-shape":
					event.values = Self.values; // first copy values
					event.values.shape.value = event.target.getAttribute("data-value"); // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Mnm ");
						qv.Rds.v.val = Self.values.radius.value;
						qv.preserveShape.v.preserveShape = Self.values.shape.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Mnm ", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Mnm " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Mnm " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Mnm " } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgOffset: {
		name: "dlgOffset",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgOffset,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-horizontal":
					event.values = Self.values; // first copy values
					event.values.horizontal.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-vertical":
					event.values = Self.values; // first copy values
					event.values.vertical.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-undefined":
					event.values = Self.values; // first copy values
					event.values.undefined.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Ofst");
						qv.Hrzn.v = Self.values.horizontal.value;
						qv.Vrtc.v = Self.values.vertical.value;
						qv.Fl.v.FlMd = Self.values.undefined.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Ofst", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// select options
					Self.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Ofst" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Ofst" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Ofst" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgRepeat: {
		name: "dlgRepeat",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgRepeat,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-scale":
					event.values = Self.values; // first copy values
					event.values.scale.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-shift":
					event.values = Self.values; // first copy values
					event.values.shift.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-spacex":
					event.values = Self.values; // first copy values
					event.values.spacex.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-spacey":
					event.values = Self.values; // first copy values
					event.values.spacey.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-angle":
					event.values = Self.values; // first copy values
					event.values.angle.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-auto-color":
					event.values = Self.values; // first copy values
					event.values.autoColor.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Rept");
						qv.Scl.v.val = Self.values.scale.value;
						qv.Rsft.v.val = Self.values.shift.value;
						qv.SpcX.v.val = Self.values.spacex.value;
						qv.SpcY.v.val = Self.values.spacey.value;
						qv.SpcC.v = Self.values.autoColor.value;
						qv.Angl.v = Self.values.angle.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Rept", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Rept" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Rept" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Rept" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgColorToAlpha: {
		name: "dlgColorToAlpha",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgColorToAlpha,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-color":
					event.values = Self.values; // first copy values
					event.values.color.value = ColorLib.hexToRgb(event.value);
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-transparency":
					event.values = Self.values; // first copy values
					event.values.transparency.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-opacity":
					event.values = Self.values; // first copy values
					event.values.opacity.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Ctoa");
						qv.Clr.v.Rd.v = Self.values.color.value.r;
						qv.Clr.v.Grn.v = Self.values.color.value.g;
						qv.Clr.v.Bl.v = Self.values.color.value.b;
						qv.Trsp.v.val = Self.values.transparency.value;
						qv.Opct.v.val = Self.values.opacity.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Ctoa", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// color palettes initial values
					Self.root.find(`.field-row .color-preset`).map(elem => {
						let el = $(elem),
							def = ColorLib.parseRgb(el.css("background-color")),
							value = ColorLib.parseRgb(el.css("background-color"));
						Self.values[el.data("name")] = { default: def, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Ctoa" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Ctoa" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Ctoa" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgDither: {
		name: "dlgDither",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDither,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-palette":
					event.values = Self.values; // first copy values
					event.values.palette.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-channels":
					// first copy values
					event.values = Self.values;
					// then partial overwrite
					event.values.channels.value = event.target.getAttribute("data-value");
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Dthr");
						qv.Plte.v = Self.values.palette.value;
						qv.Mthd.v = Self.values.channels.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Dthr", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// select options
					Self.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Dthr " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Dthr " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Dthr " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgParticles: {
		name: "dlgParticles",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgParticles,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-size":
					event.values = Self.values; // first copy values
					event.values.size.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-depth":
					event.values = Self.values; // first copy values
					event.values.depth.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-brightness":
					event.values = Self.values; // first copy values
					event.values.brightness.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-color":
					event.values = Self.values; // first copy values
					event.values.color.value = ColorLib.hexToRgb(event.value);
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-time":
					event.values = Self.values; // first copy values
					event.values.time.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-turbulance":
					event.values = Self.values; // first copy values
					event.values.turbulance.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-blink":
					event.values = Self.values; // first copy values
					event.values.blink.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-fall":
					event.values = Self.values; // first copy values
					event.values.fall.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "randomize-seed":
					event.values = Self.values; // first copy values
					event.values.random.value = Math.floor(Math.random() * 4294967295); // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("Part");
						qv.Cont.v = Self.values.count.value;
						qv.Size.v = Self.values.size.value;
						qv.Dpth.v = Self.values.depth.value;
						qv.Brgh.v = Self.values.brightness.value;

						qv.Clr.v.Rd.v = Self.values.color.value.r;
						qv.Clr.v.Grn.v = Self.values.color.value.g;
						qv.Clr.v.Bl.v = Self.values.color.value.b;

						qv.Time.v = Self.values.time.value;
						qv.Turb.v = Self.values.turbulance.value;
						qv.Blnk.v = Self.values.blink.value;
						qv.Fall.v = Self.values.fall.value;
						qv.RndS.v = Self.values.random.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Part", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// color palettes initial values
					Self.root.find(`.field-row .color-preset`).map(elem => {
						let el = $(elem),
							def = ColorLib.parseRgb(el.css("background-color")),
							value = ColorLib.parseRgb(el.css("background-color"));
						Self.values[el.data("name")] = { default: def, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// random seed
					let value = Math.floor(Math.random() * 4294967295);
					Self.values.random = { default: value, value };
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Part " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Part " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Part " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgCameraRaw: {
		name: "dlgCameraRaw",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCameraRaw,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgLiquify: {
		name: "dlgLiquify",
		preview: true,
		values: {},
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
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgAddGuides: {
		name: "dlgAddGuides",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgAddGuides,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-type":
					// exit if "preview" is not enabled
					if (!Self.preview) return;
					/* falls-through */
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgCanvasSize: {
		name: "dlgCanvasSize",
		preview: true,
		values: {},
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
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
			}
		}
	},
	dlgImageSize: {
		name: "dlgImageSize",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgImageSize,
				Doc = Self.doc;
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

				// standard dialog events
				case "dlg-open":
					// click on a preset
					requestAnimationFrame(() =>
						event.dEl.find(`.presets li[data-id="prst-2"]`).trigger("mousedown").trigger("click"));
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
			}
		}
	},
	dlgBlackWhite: {
		name: "dlgBlackWhite",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgBlackWhite,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "toggle-resample":
					event.values = Self.values; // first copy values
					event.values.resample.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-color":
					event.values = Self.values; // first copy values
					event.values.color.value = ColorLib.hexToRgb(event.value);
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-red":
					event.values = Self.values; // first copy values
					event.values.channelRed.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-yellow":
					event.values = Self.values; // first copy values
					event.values.channelYellow.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-green":
					event.values = Self.values; // first copy values
					event.values.channelGreen.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-cyan":
					event.values = Self.values; // first copy values
					event.values.channelCyan.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-blue":
					event.values = Self.values; // first copy values
					event.values.channelBlue.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-magenta":
					event.values = Self.values; // first copy values
					event.values.channelMagenta.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("blwh");
						qv.useTint.v = Self.values.resample.value;
						qv.tintColor.v.Rd.v = Self.values.color.value.r;
						qv.tintColor.v.Grn.v = Self.values.color.value.g;
						qv.tintColor.v.Bl.v = Self.values.color.value.b;
						qv.Rd.v = Self.values.channelRed.value;
						qv.Yllw.v = Self.values.channelYellow.value;
						qv.Grn.v = Self.values.channelGreen.value;
						qv.Cyn.v = Self.values.channelCyan.value;
						qv.Bl.v = Self.values.channelBlue.value;
						qv.Mgnt.v = Self.values.channelMagenta.value;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "blwh", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row.has-basic-range .value span[data-default]`).map(elem => {
						let el = $(elem),
							def = parseInt(el.data("default"), 10),
							value = parseInt(el.html(), 10);
						Self.values[el.data("id")] = { default: def, value };
					});
					// color palettes initial values
					Self.root.find(`.field-row .color-preset`).map(elem => {
						let el = $(elem),
							def = ColorLib.parseRgb(el.css("background-color")),
							value = ColorLib.parseRgb(el.css("background-color"));
						Self.values[el.data("name")] = { default: def, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "blwh" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "blwh" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "blwh" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgExposure: {
		name: "dlgExposure",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgExposure,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-exposure":
					event.values = Self.values; // first copy values
					event.values.exposure.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-offset":
					event.values = Self.values; // first copy values
					event.values.offset.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-gamma":
					event.values = Self.values; // first copy values
					event.values.gamma.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("expA");
						qv.Exps.v = Self.values.exposure.value;
						qv.Ofst.v = Self.values.offset.value;
						qv.gammaCorrection.v = Self.values.gamma.value;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "expA", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "expA" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "expA" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "expA" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgVibrance: {
		name: "dlgVibrance",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgVibrance,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-vibrance":
					event.values = Self.values; // first copy values
					event.values.vibrance.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-saturation":
					event.values = Self.values; // first copy values
					event.values.saturation.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("vibA");
						qv.vibrance.v = Self.values.vibrance.value;
						qv.Strt.v = Self.values.saturation.value;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "vibA", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "vibA" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "vibA" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "vibA" } });
					PP.update();
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgColorBalance: {
		name: "dlgColorBalance",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgColorBalance,
				Doc = Self.doc;
			switch (event.type) {
				case "set-tone":
					Self.values.tone.value = event.target.getAttribute("data-value");
					// ui sync
					Self.dispatch({ type: "sync-ui-with-levels" });
					break;
				case "toggle-luminosity":
					event.values = Self.values; // first copy values
					event.values.luminosity.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-cyan-red-value":
					event.values = Self.values; // first copy values
					event.values.levels.value[Self.values.tone.value]["cyan-red"] = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-magenta-green-value":
					event.values = Self.values; // first copy values
					event.values.levels.value[Self.values.tone.value]["magenta-green"] = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-yellow-blue-value":
					event.values = Self.values; // first copy values
					event.values.levels.value[Self.values.tone.value]["yellow-blue"] = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("blnc");
						// Shadows
						qv.ShdL.v[0].v = Self.values.levels.value.shadows["cyan-red"];
						qv.ShdL.v[1].v = Self.values.levels.value.shadows["magenta-green"];
						qv.ShdL.v[2].v = Self.values.levels.value.shadows["yellow-blue"];
						// Midtones
						qv.MdtL.v[0].v = Self.values.levels.value.midtones["cyan-red"];
						qv.MdtL.v[1].v = Self.values.levels.value.midtones["magenta-green"];
						qv.MdtL.v[2].v = Self.values.levels.value.midtones["yellow-blue"];
						// Highlights
						qv.HghL.v[0].v = Self.values.levels.value.highlights["cyan-red"];
						qv.HghL.v[1].v = Self.values.levels.value.highlights["magenta-green"];
						qv.HghL.v[2].v = Self.values.levels.value.highlights["yellow-blue"];
						// "Preserve Luminosity" toggler
						qv.PrsL.v = Self.values.luminosity.value;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "blnc", qv, ve: false } });
						PP.update();
					});
					return;

				case "sync-ui-with-levels":
					Self.root.find(".slider[data-range]").map(elem => {
						let sEl = $(elem),
							rng = sEl.data("range"),
							val = Self.values.levels.value[Self.values.tone.value][rng],
							min = parseInt(sEl.data("min"), 10),
							max = parseInt(sEl.data("max"), 10),
							sW = +sEl.prop("offsetWidth"),
							left = Math.invLerp(min, max, val) * sW;
						// handle left
						sEl.find(".handle").css({ left });
						// input value
						sEl.parent().find(`.value span[data-id="${rng}"]`).html(val);
					});
					break;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// prepare  level values
					Self.values.levels = {
						default: {
							shadows: { "cyan-red": 0, "magenta-green": 0, "yellow-blue": 0 },
							midtones: { "cyan-red": 0, "magenta-green": 0, "yellow-blue": 0 },
							highlights: { "cyan-red": 0, "magenta-green": 0, "yellow-blue": 0 },
						},
						value: {
							shadows: { "cyan-red": 0, "magenta-green": 0, "yellow-blue": 0 },
							midtones: { "cyan-red": 0, "magenta-green": 0, "yellow-blue": 0 },
							highlights: { "cyan-red": 0, "magenta-green": 0, "yellow-blue": 0 },
						},
					};
					// return console.log(Self.values);
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "blnc " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "blnc " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// reset dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// reset group values of levels
					Self.values.levels.value = structuredClone(Self.values.levels.default);
					// ui sync
					Self.dispatch({ type: "sync-ui-with-levels" });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "blnc " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgHueSaturation: {
		name: "dlgHueSaturation",
		preview: true,
		values: {},
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
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
			}
		}
	},
	dlgLevels: {
		name: "dlgLevels",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgLevels,
				Doc = Self.doc;
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgMatchColor: {
		name: "dlgMatchColor",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMatchColor,
				Doc = Self.doc;
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgPhotoFilter: {
		name: "dlgPhotoFilter",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPhotoFilter,
				Doc = Self.doc;
			switch (event.type) {
				case "set-color":
					event.values = Self.values; // first copy values
					let { r, g, b } = ColorLib.hexToRgb(event.value);
					event.values.color.value = PixelUtil.rgbToLab(r, g, b);
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-density":
					event.values = Self.values; // first copy values
					event.values.density.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-luminosity":
					event.values = Self.values; // first copy values
					event.values.luminosity.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("phfl");
						qv.Clr.v.Lmnc.v = Self.values.color.value.Hm;
						qv.Clr.v.A.v = Self.values.color.value.aS;
						qv.Clr.v.B.v = Self.values.color.value.k;
						qv.Dnst.v = Self.values.density.value;
						qv.PrsL.v = Self.values.luminosity.value;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "phfl", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// color palettes initial values
					Self.root.find(`.field-row .color-preset`).map(elem => {
						let el = $(elem),
							{ r, g, b } = ColorLib.parseRgb(el.css("background-color")),
							def = PixelUtil.rgbToLab(r, g, b),
							value = PixelUtil.rgbToLab(r, g, b);
						Self.values[el.data("name")] = { default: def, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "phfl" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "phfl" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "phfl" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSelectiveColor: {
		name: "dlgSelectiveColor",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectiveColor,
				Doc = Self.doc;
			switch (event.type) {
				case "set-mode":
					Self.values.mode.value = event.value;
					// ui sync
					Self.dispatch({ type: "sync-ui-with-colors" });
					break;
				case "toggle-absolute":
					event.values = Self.values; // first copy values
					event.values.absolute.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-cyan":
					event.values = Self.values; // first copy values
					event.values.colors.value[Self.values.mode.value].cyan = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-magenta":
					event.values = Self.values; // first copy values
					event.values.colors.value[Self.values.mode.value].magenta = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-yellow":
					event.values = Self.values; // first copy values
					event.values.colors.value[Self.values.mode.value].yellow = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-black":
					event.values = Self.values; // first copy values
					event.values.colors.value[Self.values.mode.value].black = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("selc");
						qv.Mthd = {
							t: "enum",
							v: { CrcM: Self.values.absolute.value ? "Absl" : "Rltv" }
						};
						let colorKeys = Object.keys(Self.values.colors.value);
						for (let i=0, il=colorKeys.length; i<il; i++) {
							let c = Self.values.colors.value[colorKeys[i]];
							SelectiveColorHelper.fZ(qv, i, [c.cyan, c.magenta, c.yellow, c.black]);
						}
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "selc", qv, ve: false } });
						PP.update();
					});
					return;

				case "sync-ui-with-colors":
					Self.root.find(".slider[data-range]").map(elem => {
						let sEl = $(elem),
							tgt = sEl.data("target"),
							clr = tgt.split("-")[1],
							val = Self.values.colors.value[Self.values.mode.value][clr],
							min = parseInt(sEl.data("min"), 10),
							max = parseInt(sEl.data("max"), 10),
							sW = +sEl.prop("offsetWidth"),
							left = Math.invLerp(min, max, val) * sW;
						// handle left
						sEl.find(".handle").css({ left });
						// input value
						sEl.parent().find(`.value span[data-id="${tgt}"]`).html(val);
					});
					break;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// select options
					Self.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// prepare  level values
					Self.values.colors = {
						default: {
							red: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							yellow: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							green: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							cyan: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							blue: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							magenta: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							white: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							neutral: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							black: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
						},
						value: {
							red: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							yellow: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							green: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							cyan: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							blue: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							magenta: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							white: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							neutral: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
							black: { cyan: 0, magenta: 0, yellow: 0, black: 0 },
						},
					};
					// return console.log(Self.values);
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "selc" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "selc" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// reset dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// reset group values of colors
					Self.values.colors.value = structuredClone(Self.values.colors.default);
					// ui sync
					Self.dispatch({ type: "sync-ui-with-colors" });
					// un-apply preview LUT (same as Cancel / preview off)
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "selc" } });
					PP.update();
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "selc" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgCurves: {
		name: "dlgCurves",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCurves,
				Doc = Self.doc;
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;

				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgChannelMixer: {
		name: "dlgChannelMixer",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgChannelMixer,
				Doc = Self.doc;
			switch (event.type) {
				case "set-input":
					Self.values.input.value = event.target.getAttribute("data-value");
					// ui sync
					Self.dispatch({ type: "sync-ui-with-channels" });
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-red-output":
					event.values = Self.values; // first copy values
					event.values.channels.value[Self.values.input.value]["range-red"] = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-green-output":
					event.values = Self.values; // first copy values
					event.values.channels.value[Self.values.input.value]["range-green"] = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-blue-output":
					event.values = Self.values; // first copy values
					event.values.channels.value[Self.values.input.value]["range-blue"] = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-total-output":
					event.values = Self.values; // first copy values
					event.values.channels.value[Self.values.input.value]["range-total"] = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;

					// safe & smooth raf
					Engine.raf(() => {
						// console.log(Self.values.channels.value);
						let Mo = Self.values.input.value === "gray",
							// 40% R + 40% G + 20% B → grayscale
							Z = Mo
								? [40, 40, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
								: Self.dispatch({ type: "channels-to-Z", channels: Self.values.channels.value }),
							qv = LayerEffectsHelper.buildChannelMixerDescriptor({ Mo, Z });
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "mixr", qv, ve: false } });
						PP.update();
					});
					return;

				case "channels-to-Z":
					let Z = new Array(20).fill(0);
					let map = [
						["red", 0],
						["green", 5],
						["blue", 10],
					];
					for (let [name, base] of map) {
						let ch = event.channels[name];
						Z[base + 0] = ch["range-red"];
						Z[base + 1] = ch["range-green"];
						Z[base + 2] = ch["range-blue"];
						Z[base + 4] = ch["range-total"];
					}
					return Z;
				case "sync-ui-with-channels":
					Self.root.find(".slider[data-range]").map(elem => {
						let sEl = $(elem),
							rng = sEl.data("range"),
							val = Self.values.channels.value[Self.values.input.value][rng],
							min = parseInt(sEl.data("min"), 10),
							max = parseInt(sEl.data("max"), 10),
							sW = +sEl.prop("offsetWidth"),
							left = Math.invLerp(min, max, val) * sW;
						// handle left
						sEl.find(".handle").css({ left });
						// input value
						sEl.parent().find(`.value span[data-id="${rng}"]`).html(val);
					});
					break;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// prepare  level values
					Self.values.channels = {
						default: {
							red: { "range-red": 100, "range-green": 0, "range-blue": 0, "range-total": 0 },
							green: { "range-red": 0, "range-green": 100, "range-blue": 0, "range-total": 0 },
							blue: { "range-red": 0, "range-green": 0, "range-blue": 100, "range-total": 0 },
							gray: { "range-red": 40, "range-green": 40, "range-blue": 20, "range-total": 0 },
						},
						value: {
							red: { "range-red": 100, "range-green": 0, "range-blue": 0, "range-total": 0 },
							green: { "range-red": 0, "range-green": 100, "range-blue": 0, "range-total": 0 },
							blue: { "range-red": 0, "range-green": 0, "range-blue": 100, "range-total": 0 },
							gray: { "range-red": 40, "range-green": 40, "range-blue": 20, "range-total": 0 },
						},
					};
					// return console.log(Self.values);
					// ui sync
					Self.dispatch({ type: "sync-ui-with-channels" });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "mixr " } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "mixr " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// reset group values of channels
					Self.values.channels.value = structuredClone(Self.values.channels.default);
					// ui sync
					Self.dispatch({ type: "sync-ui-with-channels" });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "mixr " } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgGradientMap: {
		name: "dlgGradientMap",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgGradientMap,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-gradient":
					break;
				case "toggle-reverse":
					event.values = Self.values; // first copy values
					event.values.reverse.value = event.el.data("value") === "on"; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("grdm");
						qv.Rvrs.v = Self.values.reverse.value;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "grdm", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row .opt-gradient`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// togglers
					Self.root.find(`.field-row .toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					console.log(Self.values);
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgPosterize: {
		name: "dlgPosterize",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPosterize,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				// "fast events"
				case "set-levels":
					event.values = Self.values; // first copy values
					event.values.levels.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					/* falls-through */
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("post");
						qv.Lvls.v = Self.values.levels.value;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "post", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "post" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "post" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "post" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgReplaceColor: {
		name: "dlgReplaceColor",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgReplaceColor,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "select-color-from-canvas":
					// TODO
					console.log(event);
					break;
				case "set-fuzziness":
					event.values = Self.values; // first copy values
					event.values.fuzziness.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-color":
					event.values = Self.values; // first copy values
					let { r, g, b } = ColorLib.hexToRgb(event.value);
					event.values.color.value = PixelUtil.rgbToLab(r, g, b);
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-hue":
					event.values = Self.values; // first copy values
					event.values.hue.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-saturation":
					event.values = Self.values; // first copy values
					event.values.saturation.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-lightness":
					event.values = Self.values; // first copy values
					event.values.lightness.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("rplc");
						qv.Fzns.v = Self.values.fuzziness.value;
						qv.H.v = Self.values.hue.value;
						qv.Strt.v = Self.values.saturation.value;
						qv.Lght.v = Self.values.lightness.value;
						qv.Mnm.v.Lmnc.v = Self.values.color.value.Hm;
						qv.Mnm.v.A.v = Self.values.color.value.aS;
						qv.Mnm.v.B.v = Self.values.color.value.k;
						qv.Mxm.v.Lmnc.v = Self.values.color.value.Hm;
						qv.Mxm.v.A.v = Self.values.color.value.aS;
						qv.Mxm.v.B.v = Self.values.color.value.k;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "rplc", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// color palettes initial values
					Self.root.find(`.field-row .color-preset`).map(elem => {
						let el = $(elem),
							{ r, g, b } = ColorLib.parseRgb(el.css("background-color")),
							def = PixelUtil.rgbToLab(r, g, b),
							value = PixelUtil.rgbToLab(r, g, b);
						Self.values[el.data("name")] = { default: def, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "rplc" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "rplc" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "rplc" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSelectColorRange: {
		name: "dlgSelectColorRange",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectColorRange,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;

				case "set-select-range":
					event.el.parents(".fields").data({ mode: event.value });
					break;


				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgShadowHighlights: {
		name: "dlgShadowHighlights",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgShadowHighlights,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-shadow-amount":
					event.values = Self.values; // first copy values
					event.values["shadow-amount"].value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-shadow-tone":
					event.values = Self.values; // first copy values
					event.values["shadow-tone"].value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-shadow-radius":
					event.values = Self.values; // first copy values
					event.values["shadow-radius"].value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-highlight-amount":
					event.values = Self.values; // first copy values
					event.values["highlight-amount"].value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-highlight-tone":
					event.values = Self.values; // first copy values
					event.values["highlight-tone"].value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-highlight-radius":
					event.values = Self.values; // first copy values
					event.values["highlight-radius"].value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-color":
					event.values = Self.values; // first copy values
					event.values.color.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("adaptCorrect");
						qv.sdwM.v.Amnt.v.val = Self.values["shadow-amount"].value;
						qv.sdwM.v.Wdth.v.val = Self.values["shadow-tone"].value;
						qv.sdwM.v.Rds.v = Self.values["shadow-radius"].value;
						qv.hglM.v.Amnt.v.val = Self.values["highlight-amount"].value;
						qv.hglM.v.Wdth.v.val = Self.values["highlight-tone"].value;
						qv.hglM.v.Rds.v = Self.values["highlight-radius"].value;
						qv.ClrC.v = Self.values.color.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "adaptCorrect", qv, ve: false } });
						PP.update();
					});
					return;
				
				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "adaptCorrect" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "adaptCorrect" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "adaptCorrect" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgTrim: {
		name: "dlgTrim",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgTrim,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSelectModifyBorder: {
		name: "dlgSelectModifyBorder",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifyBorder,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSelectModifySmooth: {
		name: "dlgSelectModifySmooth",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifySmooth,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSelectModifyExpand: {
		name: "dlgSelectModifyExpand",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifyExpand,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSelectModifyContract: {
		name: "dlgSelectModifyContract",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifyContract,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgSelectModifyFeather: {
		name: "dlgSelectModifyFeather",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgSelectModifyFeather,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgApplyImage: {
		name: "dlgApplyImage",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgApplyImage,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;

				case "change-target-mode":
					// update inline "selectbox"
					event.el.removeClass("opened").html(event.text);
					// update dbl-slider
					event.el.parents(".fields").data({ target: event.value });
					break;


				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgArtboard: {
		name: "dlgArtboard",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgArtboard,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgColorLookup: {
		name: "dlgColorLookup",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgColorLookup,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-lut":
					if (Self.lutCache[event.value]) {
						// get cached lut
						Self.values.lutProfile = Self.lutCache[event.value];
						// initial apply
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						let url = `/cdn/img/luts/${event.value}.cube`;
						$.fetch_(url, { responseType: "arrayBuffer" })
							.then(res => {
								// save lut to cache
								Self.lutCache[event.value] = LutProfileResource.Cd(res.arrayBuffer, `${event.value}.cube`)[0];
								Self.values.lutProfile = Self.lutCache[event.value];
								// initial apply
								Self.dispatch({ type: "apply-filter-data", values: Self.values });
							});
					}
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview || !Self.values.lutProfile) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("clrL");
						// merge profile fields (same as FilterEffectPanel.clrL.PY)
						qv.Nm = Self.values.lutProfile.Nm;
						qv.Dthr = Self.values.lutProfile.Dthr;
						qv.lookupType = Self.values.lutProfile.lookupType;
						qv.profile = Self.values.lutProfile.profile;
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "clrL", qv, ve: false } });
						PP.update();
					});
					return;

				case "dlg-open":
					Self.root = event.dEl;
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// select options
					Self.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});
					// store loaded luts
					Self.lutCache = {};
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "clrL" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "clrL" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// reset dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// un-apply preview LUT (same as Cancel / preview off)
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "clrL" } });
					PP.update();
					Object.keys(Self.values).map(key => {
						Self.values[key].value = Self.values[key].default;
					});
					delete Self.values.lutProfile;
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "clrL" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgDuplicateInto: {
		name: "dlgDuplicateInto",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgDuplicateInto,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgFileInfo: {
		name: "dlgFileInfo",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgFileInfo,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgVariables: {
		name: "dlgVariables",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgVariables,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgExportColorLookUp: {
		name: "dlgExportColorLookUp",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgExportColorLookUp,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgExportLayers: {
		name: "dlgExportLayers",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgExportLayers,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-count":
					event.values = Self.values; // first copy values
					event.values.count.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					return;

				case "set-export-mode":
					event.el.parents(".fields").data({ mode: event.el.text().toLowerCase() });
					break;
				case "set-export-type":
					event.el.parents(".fields").data({ export: event.text.toLowerCase() });
					break;


				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgExportAs: {
		name: "dlgExportAs",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgExportAs,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-export-format":
					event.el.parents(".options-wrapper").data({ show: event.text.toLowerCase() });
					break;
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
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
			}
		}
	},
	dlgToolShape: {
		name: "dlgToolShape",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgToolShape,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
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
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
			}
		}
	},
	dlgPreferences: {
		name: "dlgPreferences",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPreferences,
				selEl,
				Doc = Self.doc;
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
					
				default:
					/* Falls through to "master UI"
					 * Can be handled here if needed - just capture events:
					 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
					 */
					// handler standard dialog events
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
			}
		}
	},
	dlgPresetManager: {
		name: "dlgPresetManager",
		preview: true,
		values: {},
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
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
			}
		}
	},
	dlgPixelator: {
		name: "dlgPixelator",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgPixelator,
				Doc = Self.doc;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
					// click on a preset
					requestAnimationFrame(() =>
						event.dEl.find(`.presets li[data-id="prst-2"]`).trigger("mousedown").trigger("click"));
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
			}
		}
	},
	dlgColors: {
		name: "dlgColors",
		preview: true,
		values: {},
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
