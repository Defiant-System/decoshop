
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
			let APP = decoshop,
				Self = Dialogs.dlgLensCorrection,
				Doc = Self.doc;
			// console.log(event);
			switch (event.type) {
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
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
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					// save applied value - to prevent re-render if it is same value as before
					Self.values = event.values;
					// safe & smooth raf
					Engine.raf(() => {
						let qv = FilterHelper.oT("LnCr");
						qv.LnIa.v = Self.values.amount.value;
						qv.LnSi.v = Self.values.scale.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "LnCr", qv, ve: false } });
						PP.update();
					});
					break;

				// standard dialog events
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
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "LnCr" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "LnCr" } });
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
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "LnCr" } });
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
	dlgLayerStyle: {
		name: "dlgLayerStyle",
		preview: true,
		values: {},
		dispatch(event) {
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
							Self.dispatch({ ...event, type: "select-index-item" });
						});
					} else {
						Self.dispatch({ ...event, type: "select-index-item" });
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
				// native events
				case "mousedown":
					// stop default behaviour
					event.preventDefault();
					event.stopPropagation();
					// trigger fake mousemove to re-render
					Self.dispatch({ type: "mousemove", offsetY: event.offsetY, offsetX: event.offsetX });
					// bind events
					UI.doc.on("mousemove mouseup", Self.dispatch);
					break;
				case "mousemove":
					Self.vars.cx = Math.min(Math.max(event.offsetX, 19), Self.vars.width);
					Self.vars.cy = Math.min(Math.max(event.offsetY, 19), Self.vars.height);

					Self.values.mid.value.x = Self.vars.cx / Self.vars.width;
					Self.values.mid.value.y = Self.vars.cy / Self.vars.height;

					Self.vars.maxDist = Math.hypot(Self.vars.cx, Self.vars.cy);
					// update cavas
					Self.dispatch({ type: "render-canvas" });
					// exit if "preview" is not enabled
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "mouseup":
					// unbind events
					UI.doc.off("mousemove mouseup", Self.dispatch);
					break;

				// "fast events"
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// update cavas
					Self.dispatch({ type: "render-canvas" });
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-mode":
					event.values = Self.values; // first copy values
					event.values.mode.value = event.target.getAttribute("data-value"); // then partial overwrite
					// update cavas
					Self.dispatch({ type: "render-canvas" });
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
						let qv = FilterHelper.oT("RdlB");
						qv.Amnt.v = Self.values.amount.value;
						qv.BlrM.v.BlrM = Self.values.mode.value;
						qv.Cntr.v.Hrzn.v = Self.values.mid.value.x;
						qv.Cntr.v.Vrtc.v = Self.values.mid.value.y;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "RdlB", qv, ve: false } });
						PP.update();
					});
					return;

				case "render-canvas":
					let ctx = Self.els.ctx,
						{ width: w, height: h, maxDist, cx, cy, spacing } = Self.vars,
						mode = Self.values.mode.value,
						amount = Self.values.amount.value / 100;
					// reset canvas
					Self.els.cvs.attr({ width: w, height: h });
					ctx.translate(-.5, -.5);
					ctx.strokeStyle = "#9aa";
					ctx.fillStyle="#788";

					if (mode === "Spn") {
						for (let y=19; y<h; y+=spacing) {
							for (let x=19; x<w; x+=spacing) {
								let dx = x - cx;
								let dy = y - cy;
								let r = Math.hypot(dx, dy);
								if (r < 5) {
									ctx.fillRect(x - 1, y - 1, 2, 2);
									continue;
								}
								// Arc length grows with distance from center and slider amount
								let len = 1 + amount * (r / maxDist) * 96;
								if (len < 2.5) {
									ctx.fillRect(Math.round(x) - 1, Math.round(y) - 1, 2, 2);
									continue;
								}
								// Arc of the circle centered at the focal point, through (x, y)
								let angle = Math.atan2(dy, dx);
								let half = (len / 2) / r;
								ctx.beginPath();
								ctx.arc(cx, cy, r, angle - half, angle + half);
								ctx.stroke();
							}
						}
					} else {
						for (let y=19; y<w; y+=spacing) {
							for (let x=19; x<h; x+=spacing) {
								let dx = cx - x;
								let dy = cy - y;
								let d = Math.hypot(dx, dy);
								if (d < 1e-3) {
									ctx.beginPath();
									ctx.arc(x, y, 1, 0, Math.TAU);
									ctx.fill();
									continue;
								}
								dx /= d;
								dy /= d;
								// length grows with distance from center
								let len = amount * (d/maxDist) * spacing * 1.85;
								if (len < 1) {
									ctx.beginPath();
									ctx.arc(x, y, 1, 0, Math.TAU);
									ctx.fill();
								} else {
									let l2 = len / 2;
									ctx.beginPath();
									ctx.moveTo(x - dx * l2, y - dy * l2);
									ctx.lineTo(x + dx * l2, y + dy * l2);
									ctx.stroke();
								}
							}
						}
					}
					break;

				case "dlg-open":
					// fast references
					Self.els = {
						root: event.dEl,
						cvs: event.dEl.find(".blur-cvs canvas"),
					};
					Self.doc = APP.file?.doc;
					// vars
					let width = +Self.els.cvs.prop("offsetWidth"),
						height = +Self.els.cvs.prop("offsetHeight");
					Self.vars = { width, height, cx: 125, cy: 125, spacing: 30 };
					Self.vars.maxDist = Math.hypot(Self.vars.cx, Self.vars.cy);
					// prepare canvas element
					Self.els.ctx = Self.els.cvs[0].getContext("2d", { willReadFrequently: true });
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.els.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// save initial state values
					Self.els.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					Self.values.mid = {
						default: { x: .5, y: .5 },
						value: { x: .5, y: .5 },
					};
					// update cavas
					Self.dispatch({ type: "render-canvas" });
					// bind events
					Self.els.cvs.on("mousedown", Self.dispatch);
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "RdlB" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "RdlB" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// reset mid-point
					Self.values.mid.value = structuredClone(Self.values.mid.default);
					// update cavas
					Self.dispatch({ type: "render-canvas" });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					// unbind events
					Self.els.cvs.off("mousedown", Self.dispatch);
					// common close
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "RdlB" } });
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
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// update cavas
					Self.dispatch({ type: "render-canvas" });
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-mode":
					event.values = Self.values; // first copy values
					event.values.mode.value = event.target.getAttribute("data-value"); // then partial overwrite
					// update cavas
					Self.dispatch({ type: "render-canvas" });
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
						let qv = FilterHelper.oT("Sphr");
						qv.Amnt.v = Self.values.amount.value;
						qv.SphM.v.SphM = Self.values.mode.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Sphr", qv, ve: false } });
						PP.update();
					});
					return;

				case "render-canvas":
					let ctx = Self.els.ctx,
						{ width: w, height: h } = Self.vars,
						mode = Self.values.mode.value,
						amount = -Self.values.amount.value / 100,
						spacing = 30,
						radius = 115,
						ox = 25,
						oy = 24,
						cx = 125,
						cy = 126,
						oxl = w + ox,
						oyl = h + oy,
						refine = 2;
					// reset canvas
					Self.els.cvs.attr({ width: w, height: h });
					ctx.translate(-.5, -.5);
					ctx.lineWidth = 1;
					// vertical lines
					for(let gx=-ox; gx<=oxl; gx+=spacing) {
						ctx.strokeStyle = gx === cx ? "#788" : "#677";
						ctx.beginPath();
						for(let gy=-oy; gy<=oyl; gy+=refine) {
							let p = Self.dispatch({ type: mode, cx, cy, gx, gy, amount, radius });
							if (gy === -oy) ctx.moveTo(p.x, p.y);
							else ctx.lineTo(p.x, p.y);
						}
						ctx.stroke();
					}
					// horizontal lines
					for(let gy=-oy; gy<=oyl; gy+=spacing) {
						ctx.beginPath();
						for(let gx=-ox; gx<=oxl; gx+=refine) {
							ctx.strokeStyle = gy === cy ? "#788" : "#677";
							let p = Self.dispatch({ type: mode, cx, cy, gx, gy, amount, radius });
							if (gx === -ox) ctx.moveTo(p.x, p.y);
							else ctx.lineTo(p.x, p.y);
						}
						ctx.stroke();
					}
					break;
				case "Nrml":
					let dx = event.gx - event.cx;
					let dy = event.gy - event.cy;
					let r2 = dx * dx + dy * dy;
					if (r2 >= event.radius * event.radius) return { x: event.gx, y: event.gy };
					// Point on sphere
					let nx = dx / event.radius;
					let ny = dy / event.radius;
					let nz = Math.sqrt(1 - nx * nx - ny * ny);
					// Negative sphere
					if (event.amount < 0) nz = -nz * .4;
					// Orthographic projection
					// perspective factor
					let scale = 1 / (1 + 0.5 * nz);
					let sx = nx * scale * event.radius;
					let sy = ny * scale * event.radius;
					// Blend with original grid
					let t = Math.abs(event.amount);
					return {
						x: Math.lerp(event.gx, event.cx + sx, t),
						y: Math.lerp(event.gy, event.cy + sy, t)
					};
				case "HrzO":
				case "VrtO":
					let func = v => {
							if (event.amount === 0) return v;
							// normalize to [-1,1]
							let u = (v - event.cx) / event.cx;
							// exponent from 0.35..3
							let exp = event.amount < 0
									? 1 + event.amount * 0.5
									: 1 + event.amount * 2.0;
							let s = Math.sign(u);
							u = Math.abs(u);
							u = Math.pow(u, exp);
							return event.cx + s * u * event.cx;
						};
					return event.type === "HrzO"
								? { x: func(event.gx), y: event.gy }
								: { x: event.gx, y: func(event.gy) };

				case "dlg-open":
					// fast references
					Self.els = {
						root: event.dEl,
						cvs: event.dEl.find(".sphere-cvs canvas"),
					};
					Self.doc = APP.file?.doc;
					// vars
					let width = +Self.els.cvs.prop("offsetWidth"),
						height = +Self.els.cvs.prop("offsetHeight");
					Self.vars = { width, height };
					// prepare canvas element
					Self.els.ctx = Self.els.cvs[0].getContext("2d", { willReadFrequently: true });
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.els.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// save initial state values
					Self.els.root.find(`.field-row .opt-group[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("default");
						Self.values[el.data("name")] = { default: value, value };
					});
					// update cavas
					Self.dispatch({ type: "render-canvas" });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Sphr" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.WH, data: { a: "confirm", _K: "Sphr" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					// update cavas
					Self.dispatch({ type: "render-canvas" });
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					PP.TA({ G: CanvasTools.WH, data: { a: "cancel", _K: "Sphr" } });
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
				case "set-amount":
					event.values = Self.values; // first copy values
					event.values.amount.value = event.value; // then partial overwrite
					// update cavas
					Self.dispatch({ type: "render-canvas" });
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
						let qv = FilterHelper.oT("Twrl");
						qv.Angl.v = Self.values.amount.value;
						PP.TA({ G: CanvasTools.WH, data: { a: "edit", _K: "Twrl", qv, ve: false } });
						PP.update();
					});
					return;

				case "render-canvas":
					let ctx = Self.els.ctx,
						{ width: w, height: h } = Self.vars,
						amount = Self.values.amount.value / 900,
						spacing = 50,
						oh = spacing >> 1,
						cx = 125,
						cy = 125,
						oxl = w + oh,
						oyl = h + oh,
						refine = 4;
					// reset canvas
					Self.els.cvs.attr({ width: w, height: h });
					ctx.translate(-.5, -.5);
					ctx.lineWidth = 1;
					// vertical grid lines
					for(let gx=-oh; gx<=oxl; gx+=spacing) {
						ctx.strokeStyle = gx === cx ? "#899" : "#677";
						ctx.beginPath();
						for(let gy=-oh; gy<=oyl; gy+=refine) {
							let p = Self.dispatch({ type: "twirl", w, h, gx, gy, cx, cy, amount });
							if (gy === -oh) ctx.moveTo(p.x, p.y);
							else ctx.lineTo(p.x, p.y);
						}
						ctx.stroke();
					}
					// horizontal grid lines
					for(let gy=-oh; gy<=oyl; gy+=spacing) {
						ctx.strokeStyle = gy === cy ? "#899" : "#677";
						ctx.beginPath();
						for(let gx=-oh; gx<=oxl; gx+=refine) {
							let p = Self.dispatch({ type: "twirl", w, h, gx, gy, cx, cy, amount });
							if (gx === -oh) ctx.moveTo(p.x, p.y);
							else ctx.lineTo(p.x, p.y);
						}
						ctx.stroke();
					}
					break;
				case "twirl":
					// centered coordinates
					let dx = event.gx - event.cx;
					let dy = event.gy - event.cy;
					// distance from center
					let r = Math.sqrt(dx*dx + dy*dy);
					// max influence radius
					let maxR = event.w * 0.5;
					// normalized distance
					let t = Math.max(0, 1 - r / maxR);
					// stronger near center
					// weaker toward edges
					let twist = event.amount * t * t * Math.TAU,
						a = Math.atan2(dy, dx) + twist;
					return {
						x: event.cx + Math.cos(a) * r,
						y: event.cy + Math.sin(a) * r
					};

				case "dlg-open":
					// fast references
					Self.els = {
						root: event.dEl,
						cvs: event.dEl.find(".twirl-cvs canvas"),
					};
					Self.doc = APP.file?.doc;
					// vars
					let width = +Self.els.cvs.prop("offsetWidth"),
						height = +Self.els.cvs.prop("offsetHeight");
					Self.vars = { width, height };
					// prepare canvas element
					Self.els.ctx = Self.els.cvs[0].getContext("2d", { willReadFrequently: true });
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// save initial state values
					Self.els.root.find(`.field-row input[data-default]`).map(elem => {
						let el = $(elem),
							value = parseInt(el.val(), 10);
						Self.values[el.attr("name")] = { default: value, value };
					});
					// update cavas
					Self.dispatch({ type: "render-canvas" });
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
					event.values.distribution.value = event.target.getAttribute("data-value"); // then partial overwrite
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
		doQRange(event) {
			let APP = decoshop,
				Self = Dialogs.dlgHueSaturation,
				Drag = Self.drag;
			// console.log(event);
			switch (event.type) {
				// native events
				case "mousedown":
					let el = $(event.target).parents("?[data-ux]").get(0),
						rEl = el.parents(".q-slider"),
						dEl = rEl.parents(".dialog-box"),
						hEl = rEl.find(".handle"),
						mEl = rEl.find(".mid-handle"),
						ux = el.data("ux");
					// identify which side of mid-handle, if needed
					if (ux === "qr-handle") {
						ux += event.offsetX <= +mEl.prop("offsetLeft") ? "-left" : "-right";
					}
					// console.log(ux);

					let target = {
							hmin: dEl.find(`span[data-id="range-low-min"]`),
							mmin: dEl.find(`span[data-id="range-low-mid-min"]`),
							mmax: dEl.find(`span[data-id="range-high-mid-max"]`),
							hmax: dEl.find(`span[data-id="range-high-max"]`),
						},
						base = [
							parseInt(target.hmin.text(), 10),
							parseInt(target.mmin.text(), 10),
							parseInt(target.mmax.text(), 10),
							parseInt(target.hmax.text(), 10),
						],
						values = rec => {
							// Derive [BgnR, BgnS, EndS, EndR] from outer/mid geometry.
							// Mid-handle is nested, so absolute mid = outerLeft + midLeft.
							let corr = v => Math.round(v < 0 ? v + 360 : v),
								rW = Drag.offset.rW,
								oL = rec.l1 != null ? rec.l1 : Drag.offset.hX,
								oW = rec.w1 != null ? rec.w1 : Drag.offset.hW,
								mL = rec.l2 != null ? rec.l2 : Drag.offset.mX,
								mW = rec.w2 != null ? rec.w2 : Drag.offset.mW,
								toDeg = px => corr(Math.lerp(-180, 180, px / rW));

							Drag.base[0] = toDeg(oL);             // BgnR — outer left
							Drag.base[1] = toDeg(oL + mL);        // BgnS — mid left
							Drag.base[2] = toDeg(oL + mL + mW);   // EndS — mid right
							Drag.base[3] = toDeg(oL + oW);        // EndR — outer right

							Drag.target.hmin.html(`${Drag.base[0]}°`);
							Drag.target.mmin.html(`${Drag.base[1]}°`);
							Drag.target.mmax.html(`${Drag.base[2]}°`);
							Drag.target.hmax.html(`${Drag.base[3]}°`);

							Self.dispatch({ type: "set-qRange", value: Drag.base });
						},
						offset = {
							cX: event.clientX,
							mX: +mEl.prop("offsetLeft"),
							mW: +mEl.prop("offsetWidth"),
							hX: +hEl.prop("offsetLeft"),
							hW: +hEl.prop("offsetWidth"),
							rW: +rEl.prop("offsetWidth"),
						},
						min = 0,
						max = offset.rW;

					// drag related info
					Self.drag = Drag = { el, rEl, hEl, mEl, base, values, target, ux, offset, min, max };

					// bind event handlers
					APP.els.content.addClass("no-dlg-cursor");
					UI.doc.on("mousemove mouseup", Self.doQRange);
					break;
				case "mousemove":
					let diff,
						l1, w1,
						l2, w2;
					switch (Drag.ux) {
						case "qr-handle-left":
							// Resize outer from left; mid is nested so its relative left stays put
							diff = event.clientX - Drag.offset.cX;
							l1 = Drag.offset.hX + diff;
							w1 = Drag.offset.hW - diff;
							w2 = Drag.offset.mW - diff;
							Drag.hEl.css({ left: l1, width: w1 });
							Drag.mEl.css({ width: w2 });
							Drag.values({ l1, w1, w2 });
							break;
						case "qr-handle-right":
							diff = event.clientX - Drag.offset.cX;
							w1 = Drag.offset.hW + diff;
							w2 = Drag.offset.mW + diff;
							Drag.hEl.css({ width: w1 });
							Drag.mEl.css({ width: w2 });
							Drag.values({ w1, w2 });
							break;
						case "qrm-handle":
							// Move whole range; widths unchanged, mid rides with outer
							diff = event.clientX - Drag.offset.cX;
							l1 = Drag.offset.hX + diff;
							Drag.hEl.css({ left: l1 });
							Drag.values({ l1 });
							break;

						case "qr-min":
							// Move outer-left only; keep mid/outer-right absolute positions fixed
							// (mid is nested → compensate relative left: l1+l2 stays constant).
							diff = event.clientX - Drag.offset.cX;
							l1 = Drag.offset.hX + diff;
							w1 = Drag.offset.hW - diff;
							l2 = Drag.offset.mX - diff;
							Drag.hEl.css({ left: l1, width: w1 });
							Drag.mEl.css({ left: l2 });
							Drag.values({ l1, w1, l2 });
							break;
						case "qrm-min":
							diff = event.clientX - Drag.offset.cX;
							l2 = Drag.offset.mX + diff;
							w2 = Drag.offset.mW - diff;
							Drag.mEl.css({ left: l2, width: w2 });
							Drag.values({ l2, w2 });
							break;
						case "qrm-max":
							diff = event.clientX - Drag.offset.cX;
							w2 = Drag.offset.mW + diff;
							Drag.mEl.css({ width: w2 });
							Drag.values({ w2 });
							break;
						case "qr-max":
							diff = event.clientX - Drag.offset.cX;
							w1 = Drag.offset.hW + diff;
							Drag.hEl.css({ width: w1 });
							Drag.values({ w1 });
							break;
					}
					break;
				case "mouseup":
					// unbind event handlers
					APP.els.content.removeClass("no-dlg-cursor");
					UI.doc.off("mousemove mouseup", Self.doQRange);
					break;
			}
		},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgHueSaturation,
				Doc = Self.doc,
				value,
				rng,
				el;
			switch (event.type) {
				// "fast events"
				case "set-hue":
					event.values = Self.values; // first copy values
					event.values.hue.value = event.value; // then partial overwrite
					// keep track of value
					rng = Self.values.colorRange.value;
					Self.values.hsl.value[rng][0] = event.value;
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-saturation":
					event.values = Self.values; // first copy values
					event.values.saturation.value = event.value; // then partial overwrite
					// keep track of value
					rng = Self.values.colorRange.value;
					Self.values.hsl.value[rng][1] = event.value;
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-lightness":
					event.values = Self.values; // first copy values
					event.values.lightness.value = event.value; // then partial overwrite
					// keep track of value
					rng = Self.values.colorRange.value;
					Self.values.hsl.value[rng][2] = event.value;
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-qRange":
					rng = Self.values.colorRange.value;
					event.values = Self.values; // first copy values
					event.values.qRange.value[rng] = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "toggle-colorize":
					event.values = Self.values; // first copy values
					event.values.colorize.value = event.el.data("value") === "on"; // then partial overwrite
					if (event.values.colorize.value) {
						// reset hsl; Photopea colorize default is [0, 50, 0]
						Self.values.hsl.value = structuredClone(Self.values.hsl.default);
						Self.values.hsl.value[0] = [0, 50, 0];
					} else {
						Self.values.hsl.value = structuredClone(Self.values.hsl.default);
					}
					// master range + keep hue/sat/lightness in sync with hsl
					Self.els.clrGroup.find(".master").trigger("click");
					Self.dispatch({ type: "sync-ui-with-hsl" });
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
						let qv = FilterHelper.oT("hue2"),
							hsl = Self.values.hsl.value,
							qRange = Self.values.qRange.value;
						qv.Clrz.v = !!Self.values.colorize.value;

						// Write every range — oT starts with empty Adjs, so a single-range
						// fZ would drop edits made on other channels.
						HueSaturationHelper.fZ(qv, 0, hsl[0]);
						for (let r = 1; r <= 6; r++) {
							HueSaturationHelper.fZ(qv, r, {
								I3: hsl[r],
								mE: qRange[r],
							});
						}

						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "hue2", qv, ve: false } });
						PP.update();
					});
					return;

				case "sync-ui-with-hsl":
					rng = Self.values.colorRange.value;
					let hsv = Self.values.hsl.value[rng];
					// keep slider fields in sync — apply-filter-data reads these
					if (Self.values.hue) Self.values.hue.value = hsv[0];
					if (Self.values.saturation) Self.values.saturation.value = hsv[1];
					if (Self.values.lightness) Self.values.lightness.value = hsv[2];

					let l1 = Math.round(Math.lerp(0, 200, (hsv[0] + 180)/360));
					Self.els.iHue.html(hsv[0]);
					Self.els.hHue.css({ left: l1 });

					l1 = Math.round(Math.lerp(0, 200, (hsv[1] + 100)/200));
					Self.els.iSaturation.html(hsv[1]);
					Self.els.hSaturation.css({ left: l1 });

					l1 = Math.round(Math.lerp(0, 200, (hsv[2] + 100)/200));
					Self.els.iLightness.html(hsv[2]);
					Self.els.hLightness.css({ left: l1 });
					break;
				case "sync-ui-with-qRange":
					rng = Self.values.colorRange.value;
					let [bgnR, bgnS, endS, endR] = Self.values.qRange.value[rng],
					    rW = +Self.els.qSlider.prop("offsetWidth") || 345,
					    px = v => (v + 180) / 360 * rW,
					    // unwrap so stops stay ordered left→right on the bar (ranges that cross 0° / 180°)
					    toSigned = d => { d = ((d % 360) + 360) % 360; return d > 180 ? d - 360 : d; },
					    s = [bgnR, bgnS, endS, endR].map(toSigned);
					Self.els.hmin.html(Self.values.qRange.value[rng][0] +"°");
					Self.els.mmin.html(Self.values.qRange.value[rng][1] +"°");
					Self.els.mmax.html(Self.values.qRange.value[rng][2] +"°");
					Self.els.hmax.html(Self.values.qRange.value[rng][3] +"°");
					// move sliders
					for (let i=1; i<4; i++) {
					    while (s[i] < s[i - 1]) {
					        s[i] += 360;
					    }
					}
					let p0 = px(s[0]), p1 = px(s[1]), p2 = px(s[2]), p3 = px(s[3]);
					Self.els.hOuter.css({
						left: Math.round(p0),      // outer left  ← BgnR
						width: Math.round(p3 - p0) // outer width ← EndR - BgnR
					});
					Self.els.hInner.css({
						left: Math.round(p1 - p0), // mid left (relative to outer) ← BgnS
						width: Math.round(p2 - p1) // mid width ← EndS - BgnS
					});
					break;

				case "toggle-in-image":
					// reset pipete state
					Self.dispatch({ type: "reset-pipette" });

					if (Self.els.tglInPic.hasClass("active")) {
						Self.els.tglInPic.removeClass("active");
						APP.els.content.removeClass(`cursor-ew-resize`);
						// bind event listener
						APP.els.cvsWrapper.off("mousedown", Self.dispatch);
					} else {
						Self.els.tglInPic.addClass("active");
						APP.els.content.addClass(`cursor-ew-resize`);
						// bind event listener
						APP.els.cvsWrapper.on("mousedown", Self.dispatch);
					}
					break;
				case "set-color-range":
					el = $(event.target).parents("?li");
					if (!el.length) return;
					event.el.find(".active").removeClass("active");
					el = el.addClass("active");
					// update color range value
					Self.values.colorRange.value = +el.data("arg");
					// ui update
					if (Self.values.colorRange.value === 0) {
						// master
						Self.els.rangeTools.addClass("hidden");
						Self.els.sliderTools.addClass("hidden");
						// reset pipete state
						Self.dispatch({ type: "reset-pipette" });
					} else {
						Self.els.rangeTools.removeClass("hidden");
						Self.els.sliderTools.removeClass("hidden");
						// TODO: calculate values for: x1, w1, x2, w2
						Self.dispatch({ type: "sync-ui-with-qRange" });
					}
					Self.dispatch({ type: "sync-ui-with-hsl" });
					break;
				case "reset-pipette":
					delete Self.pipette;
					// reset pipettes
					Self.els.root.find(".tool-items > span.active").removeClass("active");
					// reset cursor
					APP.els.content.removeClass(`cursor-pipette-1 cursor-pipette-2 cursor-pipette-3`);
					// toggle on the app cover
					UI.dispatch({ type: "toggle-dialog-cover", state: 1 });
					// bind event listener
					APP.els.cvsWrapper.off("mousedown", Self.dispatch);
					break;
				case "select-pipette":
					el = $(event.target);
					if (el.hasClass("active")) return Self.dispatch({ type: "reset-pipette" });
					// ui update
					el.parent().find(".active").removeClass("active");
					el.addClass("active");
					// save state
					Self.pipette = el.data("arg");
					// change cursor
					APP.els.content.removeClass(`cursor-pipette-1 cursor-pipette-2 cursor-pipette-3`);
					APP.els.content.addClass(`cursor-pipette-${Self.pipette}`);

					// toggle "off" the app cover
					UI.dispatch({ type: "toggle-dialog-cover", state: !1 });
					// bind event listener
					APP.els.cvsWrapper.on("mousedown", Self.dispatch);
					break;

				// standard dialog events
				case "dlg-open":
					// fast references
					Self.els = {
						root: event.dEl,
						clrGroup: event.dEl.find(".color-group"),
						tglInPic: event.dEl.find(".toggle-tool"),
						rangeTools: event.dEl.find(".has-ranges-tools"),
						sliderTools: event.dEl.find(".has-sliders-only"),

						iHue: event.dEl.find(`span[data-id="hue"]`),
						hHue: event.dEl.find(`.slider[data-range="hue"] .handle`),
						iSaturation: event.dEl.find(`span[data-id="saturation"]`),
						hSaturation: event.dEl.find(`.slider[data-range="saturation"] .handle`),
						iLightness: event.dEl.find(`span[data-id="lightness"]`),
						hLightness: event.dEl.find(`.slider[data-range="lightness"] .handle`),

						qSlider: event.dEl.find(".q-slider"),
						hOuter: event.dEl.find(".q-slider .handle"),
						hInner: event.dEl.find(".q-slider .mid-handle"),
						hmin: event.dEl.find(`span[data-id="range-low-min"]`),
						mmin: event.dEl.find(`span[data-id="range-low-mid-min"]`),
						mmax: event.dEl.find(`span[data-id="range-high-mid-max"]`),
						hmax: event.dEl.find(`span[data-id="range-high-max"]`),
					};
					Self.doc = APP.file?.doc;
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// color options
					Self.values.colorRange = { default: 0, value: 0 };

					// hue-sat-lig
					value = {
						0: [0, 0, 0], // master
						1: [0, 0, 0], // red
						2: [0, 0, 0], // yellow
						3: [0, 0, 0], // green
						4: [0, 0, 0], // cyan
						5: [0, 0, 0], // blue
						6: [0, 0, 0], // magenta
					};
					Self.values.hsl = { default: structuredClone(value), value };
					// ui sync
					Self.dispatch({ type: "sync-ui-with-hsl" });

					value = {
						1: [315, 345, 15, 45],   // red
						2: [15, 45, 75, 105],    // yellow
						3: [75, 105, 135, 165],  // green
						4: [135, 165, 195, 225], // cyan
						5: [195, 225, 255, 285], // blue
						6: [255, 285, 315, 345], // magenta
					};
					Self.values.qRange = { default: structuredClone(value), value };
					
					// save initial state values
					Self.els.root.find(`.field-row.has-basic-range .value span[data-default]`).map(elem => {
						let el = $(elem),
							def = parseInt(el.data("default"), 10),
							value = parseInt(el.html(), 10);
						Self.values[el.data("id")] = { default: def, value };
					});
					// togglers
					Self.els.root.find(`.toggler[data-name]`).map(elem => {
						let el = $(elem),
							value = el.data("value") === "on" ? true : false;
						Self.values[el.attr("data-name")] = { default: value, value };
					});
					// return console.log(Self.values);
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "hue2" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					Self.dispatch({ type: "unbind-reset-view" });
					// apply filter
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "hue2" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => { Self.values[key].value = Self.values[key].default; });
					Self.els.tglInPic.removeClass("active");
					// reset hsk values
					Self.values.hsl.value = structuredClone(Self.values.hsl.default);
					// reset qRange values
					Self.values.qRange.value = structuredClone(Self.values.qRange.default);
					// make master color range active (resets also "Self.values.colorRange")
					Self.els.clrGroup.find(".master").trigger("click");
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					Self.dispatch({ type: "unbind-reset-view" });
					// common dialog close
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "hue2" } });
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
	dlgLevels: {
		name: "dlgLevels",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgLevels,
				Doc = Self.doc,
				Drag = Self.drag,
				el;
			// console.log(event);
			switch (event.type) {
				// native events
				case "mousedown":
					// stop default behaviour
					event.preventDefault();
					event.stopPropagation();
					// drag target element
					el = $(event.target);
					if (el.parent().hasClass("cvs-wrapper")) {
						return Self.dispatch({ type: "pipette-color", orgEvent: event });
					}
					// drag info
					el = el.parents("?.handle");
					if (!el.length) return;

					let pEl = el.parent(),
						fFor = el.data("for"),
						h1 = pEl.find(".handle:nth-child(1)").removeClass("moved"),
						h2 = pEl.find(".handle:nth-child(2)").removeClass("moved"),
						h3 = pEl.find(".handle:nth-child(3)").removeClass("moved"),
						tgt1 = Self.els.root.find(`.value span[data-id="${h1.data("for")}"] input`),
						tgt2 = Self.els.root.find(`.value span[data-id="${h2.data("for")}"] input`),
						tgt3 = Self.els.root.find(`.value span[data-id="${h3.data("for")}"] input`),
						clickX = event.clientX - +el.prop("offsetLeft"),
						c = Self.values.channel.value,
						m0 = 0,
						m2 = 255,
						max = pEl.prop("offsetWidth"),
						min = 0,
						perc;

					switch (fFor) {
						case "input-shadows":
							max = +h3.prop("offsetLeft") - 2;
							break;
						case "input-midtones":
							min = +h1.prop("offsetLeft") + 1;
							max = +h3.prop("offsetLeft") - 1;
							break;
						case "input-highlights":
							min = +h1.prop("offsetLeft") + 1;
							break;
						case "output-shadows":
							max = +h2.prop("offsetLeft") - 1;
							break;
						case "output-highlights":
							min = +h1.prop("offsetLeft") + 1;
							break;
					}
					// moves dragged handle on top
					el.addClass("moved");
					perc = Math.invLerp(+h1.prop("offsetLeft"), +h3.prop("offsetLeft"), +h2.prop("offsetLeft"));
					// drag object
					Self.drag = { el, fFor, h1, h2, h3, tgt1, tgt2, tgt3, c, perc, clickX, min, max };
					// cover dialog UI
					Self.els.root.addClass("covered no-cursor");
					// bind events
					UI.doc.on("mousemove mouseup", Self.dispatch);
					break;
				case "mousemove":
					let left = Math.min(Math.max(event.clientX - Drag.clickX, Drag.min), Drag.max),
						l2, il, v;

					switch (Drag.fFor) {
						case "input-shadows":
							l2 = Math.lerp(left, Drag.max, Drag.perc);
							Drag.h2.css({ left: l2 });
							v = Math.lerp(0, 255, left/300) | 0;
							Drag.tgt1.val(v);
							Self.values.levels.value[Drag.c][0] = v;
							break;
						case "input-midtones":
							il = Math.invLerp(Drag.min, Drag.max, left);
							v = il <= 0.5
								? Math.lerp(9.9, .935, il*2)
								: Math.lerp(1.9, 0.1, il);
							Drag.tgt2.val(Misc.precision(v, 1e-2));
							Self.values.levels.value[Drag.c][4] = (v * 100) | 0;
							break;
						case "input-highlights":
							l2 = Math.lerp(Drag.min, left, Drag.perc);
							Drag.h2.css({ left: l2 });
							v = Math.lerp(1, 255, left/300) | 0;
							Drag.tgt3.val(v);
							Self.values.levels.value[Drag.c][1] = v;
							break;
						case "output-shadows":
							v = Math.lerp(0, 255, left/300) | 0;
							Drag.tgt1.val(v);
							Self.values.levels.value[Drag.c][2] = v;
							break;
						case "output-highlights":
							v = Math.lerp(1, 255, left/300) | 0;
							Drag.tgt2.val(v);
							Self.values.levels.value[Drag.c][3] = v;
							break;
					}

					Drag.el.css({ left });
					// exit if "preview" is not enabled
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "mouseup":
					// cover dialog UI
					Self.els.root.removeClass("covered no-cursor");
					// unbind events
					UI.doc.off("mousemove mouseup", Self.dispatch);
					break;

				// "fast" events
				case "set-channel":
					event.values = Self.values;
					event.values.channel.value = event.value;
					event.values.channel.text = event.text;
					Self.dispatch({ type: "render-canvas" });
					// ui sync
					Self.dispatch({ type: "sync-ui-with-levels" });
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "set-algorithm":
					// 4 types of algorithms
					event.values = Self.values;
					event.values.algorithm.value = event.value;
					event.values.algorithm.text = event.text;
					if (event.value === "-" || event.value === "") {
						// None → identity for all channels
						Self.values.levels.value = structuredClone(Self.values.levels.default);
					} else {
						let pixelCount = new Rect(0, 0, Doc.m, Doc.n).O(),
							histogram = PixelUtil.histogramFromRgba(Doc.LT()),
							mode = +event.value,
							// defaults: 0.1% clip each end
							computed = PixelUtil.levelsFromHistogram([mode, 0.1, 0.1], histogram);
						histogram[0][255] += 3 * (pixelCount - histogram[5]);
						for (let ch=1; ch<4; ch++) histogram[ch][255] += pixelCount - histogram[5];
						// recompute after padding if you want (or pad before calling levelsFromHistogram)
						for (let ch=0; ch<4; ch++) {
							let mid = computed[ch][2] == null ? 100 : ~~(100 + .75 * 100 * (computed[ch][2] - 128) / 128);
							Self.values.levels.value[ch] = [~~computed[ch][0], ~~computed[ch][1], 0, 255, mid];
						}
					}
					Self.dispatch({ type: "sync-ui-with-levels" });
					Self.dispatch({ type: "render-canvas" });
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					Self.values = event.values;
					Engine.raf(() => {
						let qv = FilterHelper.oT("levl");
						for (let ch=0; ch<4; ch++) {
							let value = Self.values.levels.value[ch];
							LevelsResource.fZ(qv, ch, value);
						}
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "levl", qv, ve: false } });
						PP.update();
					});
					return;

				case "render-canvas":
					let ctx = Self.els.ctx,
						{ width: w, height: h } = Self.vars,
						channel = +(Self.values.channel?.value ?? 0),
						// Source histogram is cached; RGB view remaps through current R/G/B levels
						// so pipette/algorithm changes update the graph.
						histogram = Self.vars.histogram,
						yScale,
						palette = ["#cdd", "#f99", "#7f7", "#99f"],
						color = palette[channel] || palette[0],
						gradient = ctx.createLinearGradient(0, 0, 0, h),
						bins;
					if (!histogram) {
						let pixelCount = new Rect(0, 0, Doc.m, Doc.n).O();
						histogram = PixelUtil.histogramFromRgba(Doc.LT());
						histogram[0][255] += 3 * (pixelCount - histogram[5]);
						for (let ch = 1; ch < 4; ch++) {
							histogram[ch][255] += pixelCount - histogram[5];
						}
						Self.vars.histogram = histogram;
					}
					if (channel === 0 && Self.values.levels?.value) {
						// Remap R/G/B source bins through current per-channel levels LUTs
						let qv = FilterHelper.oT("levl");
						for (let ch = 0; ch < 4; ch++) {
							LevelsResource.fZ(qv, ch, Self.values.levels.value[ch]);
						}
						// Keep composite identity while remapping
						LevelsResource.fZ(qv, 0, [0, 255, 0, 255, 100]);
						let fx = LayerEffectsHelper.buildEffect("levl", qv),
							luts = [fx.mK, fx._J, fx.xm];
						bins = new Float64Array(256);
						for (let c=0; c<3; c++) {
							let src = histogram[c + 1],
								lut = luts[c];
							for (let i=0; i<256; i++) {
								bins[lut[i]] += src[i];
							}
						}
						yScale = 6e3 / histogram[4] / 3;
					} else {
						bins = histogram[channel] || histogram[0];
						yScale = 6e3 / histogram[4];
						if (channel === 0) yScale /= 3;
					}
					gradient.addColorStop(0, color +"1");
					gradient.addColorStop(.3, color +"5");
					// reset canvas — logical space is 256×100, scaled to graph size
					Self.els.cvs.attr({ width: w, height: h });
					ctx.setTransform(w / 256, 0, 0, -h / 100, 0, h);
					ctx.beginPath();
					ctx.moveTo(-2, -2);
					for (let l=0; l<256; l++) {
						ctx.lineTo(l, bins[l] * yScale);
					}
					ctx.lineTo(258, -2);
					ctx.closePath();
					ctx.fillStyle = gradient;
					ctx.strokeStyle = color;
					ctx.lineWidth = .5;
					ctx.fill();
					ctx.stroke();
					break;
				case "sync-ui-with-levels":
					// select and loop "handle" elements and set "left"
					let ch = Self.values.channel.value;
					let cv = Self.values.levels.value[ch][0];
					let cl1 = Math.round(Math.lerp(0, 300, cv/255));
					Self.els.i1.val(cv);
					Self.els.hI1.css({ left: cl1 });

					cv = Self.values.levels.value[ch][1];
					let cl2 = Math.round(Math.lerp(0, 300, cv/255));
					Self.els.i3.val(cv);
					Self.els.hI3.css({ left: cl2 });

					cv = Self.values.levels.value[ch][4]/100;
					let cm = (cl2 - cl1) / 2,
						cl = cv <= 1
							? cm + Math.lerp(cm, cl1, cv)
							: Math.lerp(cm, cl1, cv/9.9);
					Self.els.i2.val(cv);
					Self.els.hI2.css({ left: cl });

					cv = Self.values.levels.value[ch][2];
					cl = Math.round(Math.lerp(0, 300, cv/255));
					Self.els.o1.val(cv);
					Self.els.hO1.css({ left: cl });

					cv = Self.values.levels.value[ch][3];
					cl = Math.round(Math.lerp(0, 300, cv/255));
					Self.els.o2.val(cv);
					Self.els.hO2.css({ left: cl });
					break;

				case "pipette-color":
					let packed = CanvasTools.lS.dh(Doc, { x: event.orgEvent.offsetX, y: event.orgEvent.offsetY }, 1),
						rgb = [(packed >>> 16) & 255, (packed >>> 8) & 255, packed & 255],
						levels = Self.values.levels.value,
						pipette = +Self.els.root.find(`.value .active i[data-pipette]`).data("pipette");
					
					for (let c=0; c<3; c++) {
						// channels 1=R, 2=G, 3=B
						let L = levels[c + 1].slice(); // [inB, inW, outB, outW, gamma×100]
						if (pipette === 1) {
							// shadows → input black
							L[0] = Math.min(rgb[c], L[1] - 2);
						} else if (pipette === 3) {
							// highlights → input white
							L[1] = Math.max(rgb[c], L[0] + 2);
						} else {
							// midtones → gamma
							let mean = (rgb[0] + rgb[1] + rgb[2]) / 3 / 255,
								ch = rgb[c] / 255;
							if (mean > 0 && ch > 0) {
								let g = Math.log(ch) / Math.log(mean);
								L[4] = Math.min(999, Math.max(10, Math.round(100 * g)));
							}
						}
						levels[c + 1] = L;
					}
					Self.dispatch({ type: "sync-ui-with-levels" });
					Self.dispatch({ type: "render-canvas" });
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "reset-pipette":
					// reset flag
					delete Self.isPipette;
					// toggle on the app cover
					UI.dispatch({ type: "toggle-dialog-cover", state: 1 });
					// bind event listener
					APP.els.cvsWrapper.off("mousedown", Self.dispatch);
					break;
				case "select-pipette":
					el = $(event.target).parents("?[data-pipette]");
					event.el.removeClass("pipette-active");
					event.el.find(".active").removeClass("active");
					APP.els.content.removeClass(`cursor-pipette-1 cursor-pipette-2 cursor-pipette-3`);
					if (!el.length) return Self.dispatch({ ...event, type: "reset-pipette" });

					event.el.addClass("pipette-active");
					el.parent().addClass("active");

					// change cursor
					APP.els.content.addClass(`cursor-pipette-${el.data("pipette")}`);
					// no need to bind more event listeners
					if (!Self.isPipette) {
						// keep track of state
						Self.isPipette = true;
						// toggle "off" the app cover
						UI.dispatch({ type: "toggle-dialog-cover", state: !1 });
						// bind event listener
						APP.els.cvsWrapper.on("mousedown", Self.dispatch);
					}
					break;

				case "unbind-reset-view":
					// remove potential pipette cursors
					APP.els.content.removeClass(`cursor-pipette-1 cursor-pipette-2 cursor-pipette-3`);
					// unbind events
					Self.els.root.find(".slider").off("mousedown", Self.dispatch);
					break;

				case "dlg-open":
					// fast references
					Self.els = {
						root: event.dEl,
						hI1: event.dEl.find(`.handle[data-for="input-shadows"]`),
						hI2: event.dEl.find(`.handle[data-for="input-midtones"]`),
						hI3: event.dEl.find(`.handle[data-for="input-highlights"]`),
						hO1: event.dEl.find(`.handle[data-for="output-shadows"]`),
						hO2: event.dEl.find(`.handle[data-for="output-highlights"]`),
						i1: event.dEl.find(`.value span[data-id="input-shadows"] input`),
						i2: event.dEl.find(`.value span[data-id="input-midtones"] input`),
						i3: event.dEl.find(`.value span[data-id="input-highlights"] input`),
						o1: event.dEl.find(`.value span[data-id="output-shadows"] input`),
						o2: event.dEl.find(`.value span[data-id="output-highlights"] input`),
						cvs: event.dEl.find(".graph.levels canvas"),
					};
					Self.doc = APP.file?.doc;
					// vars
					let width = +Self.els.cvs.prop("offsetWidth"),
						height = +Self.els.cvs.prop("offsetHeight");
					Self.vars = { width, height };
					// prepare canvas element
					Self.els.ctx = Self.els.cvs[0].getContext("2d", { willReadFrequently: true });
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// select options
					Self.els.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});
					// default levels
					let value = [
						// [60, 200, 0, 255, 23],
						[0, 255, 0, 255, 100],
						[0, 255, 0, 255, 100],
						[0, 255, 0, 255, 100],
						[0, 255, 0, 255, 100],
					];
					Self.values.levels = { default: structuredClone(value), value };
					// draw input levels histogram for the current document
					Self.dispatch({ type: "render-canvas" });
					// ui sync
					Self.dispatch({ type: "sync-ui-with-levels" });
					// bind events
					Self.els.root.find(".slider").on("mousedown", Self.dispatch);
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "levl" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					Self.dispatch({ type: "unbind-reset-view" });
					// apply filter
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "levl" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => {
						Self.values[key].value = Self.values[key].default;
						if (Self.values[key].text != null) Self.values[key].text = Self.els.root.find(`.option.select[data-name="${key}"] .value`).text();
					});
					// reset mid-point
					Self.values.levels.value = structuredClone(Self.values.levels.default);
					// ui sync + histogram (cached source) before re-applying preview
					Self.dispatch({ type: "sync-ui-with-levels" });
					Self.dispatch({ type: "render-canvas" });
					// re-apply identity levels for preview
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "dlg-close":
					Self.dispatch({ type: "unbind-reset-view" });
					// common dialog close
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "levl" } });
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
		doSlider(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCurves,
				Doc = Self.doc,
				Drag = Self.drag;
			switch (event.type) {
				// native events
				case "mousedown":
					// stop default behaviour
					event.preventDefault();
					event.stopPropagation();
					// drag info
					let el = $(event.target).parents("?.handle");
					if (!el.length) return;

					let svg = Self.els.svg,
						anchors = svg.find(".anchor"),
						anchor, aPos, aY,
						path = svg.find("path")[0],
						pEl = el.parent(),
						clickX = event.clientX + event.offsetX - +el.prop("offsetLeft"),
						ch = Self.values.channel.value,
						clamp = Self.clamp,
						max = { x: 250, y: 251, w: 250, h: 251 },
						min = { x: 0 },
						knots = svg.find(".anchor")
									.map(a => { a.id = $(a).prevAll(".anchor").length; return a; })
									.map(a => Self.parseAnchorPos(a)),
						dKnot;

					switch (el.data("for")) {
						case "input":
							anchor = anchors.get(0).addClass("active");
							aY = Self.parseAnchorPos(anchor[0])[1];
							aPos = Self.parseAnchorPos(anchors.get(1)[0]);
							max.x = aPos[0] - 1;
							dKnot = knots[+anchor[0].id];
							break;
						case "output":
							anchor = anchors.get(anchors.length-1).addClass("active");
							aY = Self.parseAnchorPos(anchor[0])[1];
							aPos = Self.parseAnchorPos(anchors.get(anchors.length-2)[0]);
							min.x = aPos[0] + 1;
							dKnot = knots[+anchor[0].id];
							break;
					}
					// moves dragged handle on top
					el.addClass("moved");
					// drag object
					Self.drag = { el, anchor, path, knots, dKnot, aY, ch, clickX, min, max };
					// cover dialog UI
					Self.els.root.addClass("covered no-cursor");
					// bind events
					UI.doc.on("mousemove mouseup", Self.doSlider);
					break;
				case "mousemove":
					let left = Math.min(Math.max(event.clientX - Drag.clickX, Drag.min.x), Drag.max.x);
					Drag.el.css({ left });
					// move "anchor"
					Drag.anchor[0].setAttribute("transform", `translate(${left}, ${Drag.aY})`);
					// update knot
					Drag.dKnot[0] = left;
					Drag.dKnot[1] = Drag.aY;
					// path follows knots; other anchors stay where they are
					Self.rebuildPath(Drag.path, Drag.knots, Drag.max, Self.clamp);

					// exit if "preview" is not enabled
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "mouseup":
					// reset anchor
					Drag.anchor.removeClass("active");
					// cover dialog UI
					Self.els.root.removeClass("covered no-cursor");
					// unbind events
					UI.doc.off("mousemove mouseup", Self.doSlider);
					break;
			}
		},
		clamp(v, lo, hi) {
			return Math.min(Math.max(v, lo), hi);
		},
		parseAnchorPos(el) {
			let m = (el.getAttribute("transform") || "").match(/translate\(\s*([-\d.]+)[,\s]+([-\d.]+)\s*\)/);
			return m ? [+m[1], +m[2]] : [0, 0];
		},
		rebuildPath(path, orgKnots, max, clamp, skip) {
			let knots = orgKnots.map(([x, y]) => [+x, +y]);
			// let knots = structuredClone(orgKnots);
			if (skip != null) knots.splice(skip, 1);
			if (knots.length < 2) return;

			// ensure strictly increasing X — duplicate X → 1/0 in PixelUtil.presetThumb.PW
			let xs = knots.map(([cx]) => cx);
			for (let i = 1; i < xs.length; i++) if (xs[i] <= xs[i - 1]) xs[i] = xs[i - 1] + 1;
			for (let i = xs.length - 2; i >= 0; i--) if (xs[i] >= xs[i + 1]) xs[i] = xs[i + 1] - 1;

			let curveData = knots.map(([, cy], i) => PixelUtil.presetThumb.yR(xs[i], max.w - cy, true)),
				parsed = PixelUtil.presetThumb.N6(curveData),
				segments = [];
			PixelUtil.presetThumb.tL(parsed.VT, parsed.M4, parsed.CG, segments);

			// SVG Y from curve Y; keep path inside the graph
			let toSvg = (x, y) => [clamp(x, 0, max.w), clamp(max.w - y, 0, max.h)],
				yFirst = clamp(knots[0][1], 0, max.h),
				yLast = clamp(knots[knots.length - 1][1], 0, max.h),
				[x0] = toSvg(xs[0], max.w - knots[0][1]),
				// flat lead-in to first anchor (visual only — not an editable knot)
				d = [`M 0 ${yFirst}`];
			if (x0 > 0) d.push(` L ${x0} ${yFirst}`);

			if (knots.length === 2) {
				let [x1, y1] = toSvg(xs[1], max.w - knots[1][1]);
				d.push(` L ${x1} ${y1}`);
			} else {
				// natural cubic spline → one C per knot span (Hermite derivatives in FK)
				for (let i = 0; i < knots.length - 1; i++) {
					let g = segments[i],
						j = g.VT.indexOf(xs[i]),
						xA = g.VT[j],
						yA = g.M4[j],
						xB = g.VT[j + 1],
						yB = g.M4[j + 1],
						dx = xB - xA,
						d0 = g.FK[j],
						d1 = g.FK[j + 1],
						[c1x, c1y] = toSvg(xA + dx / 3, yA + d0 * dx / 3),
						[c2x, c2y] = toSvg(xB - dx / 3, yB - d1 * dx / 3),
						[x1, y1] = toSvg(xB, yB);
					d.push(` C ${c1x} ${c1y} ${c2x} ${c2y} ${x1} ${y1}`);
				}
			}
			// flat lead-out from last anchor to right edge (visual only)
			if (xs[xs.length - 1] < max.w) d.push(` L ${max.w} ${yLast}`);
			path.setAttribute("d", d.join(""));
		},
		doSvgPath(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCurves,
				Doc = Self.doc,
				Drag = Self.drag;
			switch (event.type) {
				// native events
				case "mousedown":
					// stop default behaviour
					event.preventDefault();
					event.stopPropagation();

					// proxy if sketch mode
					if (Self.els.graph.hasClass("sketch-mode")) {
						return Self.doSketchMode(event);
					}
					
					let svg = Self.els.svg,
						path = svg.find("path")[0],
						rect = svg[0].getBoundingClientRect(),
						max = { x: 250, y: 251, w: 250, h: 251 },
						clamp = Self.clamp,
						el = $(event.target).parents("?.anchor");

					// click on empty area → insert a new anchor (sorted by element index) and rebuild curve
					if (!el.length) {
						let x = Math.round((event.clientX - rect.left) / (rect.width || 1) * max.w),
							y = Math.round((event.clientY - rect.top) / (rect.height || 1) * max.h);
						x = clamp(x, 1, max.w - 1);
						y = clamp(y, 0, max.h);
						// keep unique X among existing anchors
						let used = new Set([...svg[0].querySelectorAll(".anchor")].map(a => Self.parseAnchorPos(a)[0]));
						while (used.has(x) && x < max.w) x++;
						if (used.has(x)) while (used.has(x) && x > 0) x--;
						if (used.has(x)) return;

						let anchor = Self.generateSvgAnchor({ x, y }),
							next = [...svg[0].querySelectorAll(".anchor")]
								.find(a => Self.parseAnchorPos(a)[0] > x);
						if (next) svg[0].insertBefore(anchor, next);
						else svg[0].appendChild(anchor);

						let knots = svg.find(".anchor")
							.map(a => { a.id = $(a).prevAll(".anchor").length; return a; })
							.map(a => Self.parseAnchorPos(a));
						Self.rebuildPath(path, knots, max, clamp);
						el = $(anchor);
					}

					// drag info
					let knots = svg.find(".anchor")
							.map(a => { a.id = $(a).prevAll(".anchor").length; return a; })
							.map(a => Self.parseAnchorPos(a)),
						dKnot = knots[+el[0].id],
						min = { x: 0, y: 0 },
						nextEl = el.nextAll(".anchor"),
						prevEl = el.prevAll(".anchor"),
						kType = !prevEl.length ? "start" : (!nextEl.length ? "end" : prevEl.length),
						hidden = false;

					// keep at least 1px gap from neighbours (avoids duplicate X → NaN in spline)
					if (nextEl.length) max.x = Self.parseAnchorPos(nextEl[0])[0] - 1;
					if (prevEl.length) min.x = Self.parseAnchorPos(prevEl[0])[0] + 1;
					svg.find(".active").removeClass("active");
					el.addClass("active");
					// drag object
					Self.drag = { el, rect, hidden, dKnot, kType, path, knots, min, max, clamp };
					// cover dialog UI
					Self.els.root.addClass("covered no-cursor");
					// bind events
					UI.doc.on("mousemove mouseup", Self.doSvgPath);
					break;
				case "mousemove":
					let rawX = (event.clientX - Drag.rect.left) / Drag.rect.width * Drag.max.w,
						rawY = (event.clientY - Drag.rect.top) / Drag.rect.height * Drag.max.h,
						cx = Drag.dKnot[0],
						cy = Math.round(Math.min(Math.max(rawY, Drag.min.y), Drag.max.y)),
						skip;
					// only move X when neighbours leave a valid gap
					if (Drag.min.x <= Drag.max.x) {
						cx = Math.round(Math.min(Math.max(rawX, Drag.min.x), Drag.max.x));
					}
					// no need to continue if values are same as previous
					if (Drag.dKnot[0] === cx && Drag.dKnot[1] === cy) return;

					switch (Drag.kType) {
						case "start": Self.els.hInput.css({ left: cx }); break; // move slider start
						case "end": Self.els.hOutput.css({ left: cx }); break; // move slider end
						default:
							let isHidden = rawX < Drag.max.x && rawX > Drag.min.x;
							if (isHidden !== Drag.hidden) { // prevents touching DOM too much
								Drag.hidden = isHidden;
								Drag.el.toggleClass("hidden", isHidden);
							}
							// draw path without hidden anchor
							if (!isHidden) skip = Drag.kType;
					}
					// move "anchor"
					Drag.el[0].setAttribute("transform", `translate(${cx}, ${cy})`);
					// update knot
					Drag.dKnot[0] = cx;
					Drag.dKnot[1] = cy;
					// path follows knots; other anchors stay where they are
					Self.rebuildPath(Drag.path, Drag.knots, Drag.max, Self.clamp, skip);

					// exit if "preview" is not enabled
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;
				case "mouseup":
					// reset el & remove anchors tagged as "hidden"
					Drag.el.removeClass("active");
					Drag.el.parent().find(".anchor.hidden").remove();
					// cover dialog UI
					Self.els.root.removeClass("covered no-cursor");
					// unbind events
					UI.doc.off("mousemove mouseup", Self.doSvgPath);
					break;
			}
		},
		// Photopea sketch mode: channel data is a 256-long output LUT (not CrPt knots)
		isLut(curve) {
			return Array.isArray(curve) && curve.length === 256 && typeof curve[0] === "number";
		},
		identityLut() {
			return Array.from({ length: 256 }, (_, i) => i);
		},
		pathFromLut(path, lut, max = { w: 250 }) {
			let d = [];
			for (let i = 0; i < 256; i++) {
				let x = Math.round(i / 255 * max.w),
					y = Math.round(max.w - lut[i] / 255 * max.w);
				d.push(`${i ? "L" : "M"} ${x} ${y}`);
			}
			path.setAttribute("d", d.join(" "));
		},
		// Linearly fill LUT between two freehand samples (Photopea CurveEditor.Tk)
		paintSketchStroke(lut, x0, y0, x1, y1) {
			let clamp = this.clamp;
			x0 = clamp(Math.round(x0), 0, 255);
			y0 = clamp(Math.round(y0), 0, 255);
			x1 = clamp(Math.round(x1), 0, 255);
			y1 = clamp(Math.round(y1), 0, 255);
			let lo = x0, hi = x1, yLo = y0, yHi = y1;
			if (x1 < x0) {
				lo = x1; hi = x0; yLo = y1; yHi = y0;
			}
			lut[x1] = y1;
			if (lo !== hi) {
				for (let x = lo; x <= hi; x++) {
					lut[x] = Math.round(yLo + (x - lo) * (yHi - yLo) / (hi - lo));
				}
			}
		},
		svgClientToLut(clientX, clientY, rect, max = { w: 250, h: 251 }) {
			let sx = (clientX - rect.left) / (rect.width || 1) * max.w,
				sy = (clientY - rect.top) / (rect.height || 1) * max.h,
				clamp = this.clamp;
			return [
				clamp(Math.round(sx / max.w * 255), 0, 255),
				clamp(Math.round((max.w - sy) / max.w * 255), 0, 255),
			];
		},
		doSketchMode(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCurves,
				Doc = Self.doc,
				Drag = Self.drag;
			switch (event.type) {
				// native events
				case "mousedown":
					let svg = Self.els.svg,
						path = svg.find("path")[0],
						rect = svg[0].getBoundingClientRect(),
						max = { x: 250, y: 251, w: 250, h: 251 },
						clamp = Self.clamp,
						ch = +(Self.values.channel?.value ?? 0),
						lut = Self.values.curves.value[ch],
						{ clientY, clientX } = event;

					if (!Self.isLut(lut)) {
						lut = Self.identityLut();
						Self.values.curves.value[ch] = lut;
					}
					// drag object
					Self.drag = { clientY, lut, ch, path, rect, max };
					// trigger mousemove event
					Self.doSketchMode({ type: "mousemove", clientY, clientX });
					// cover dialog UI
					Self.els.root.addClass("covered no-cursor");
					// bind events
					UI.doc.on("mousemove mouseup", Self.doSketchMode);
					break;
				case "mousemove":
					let [dx, dy] = Self.svgClientToLut(event.clientX, event.clientY, Drag.rect, Drag.max);
					if (dx === Drag.lastX && dy === Drag.lastY) return;
					Self.paintSketchStroke(Drag.lut, Drag.lastX, Drag.lastY, dx, dy);
					Drag.lastX = dx;
					Drag.lastY = dy;

					Self.pathFromLut(Drag.path, Drag.lut, Drag.max);
					Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
					break;
				case "mouseup":
					// cover dialog UI
					Self.els.root.removeClass("covered no-cursor");
					// unbind events
					UI.doc.off("mousemove mouseup", Self.doSketchMode);
					break;
			}
		},
		generateSvgAnchor(p) {
			let transform = `translate(${p.x}, ${p.y})`,
				circles = `<circle cx="0" cy="0" r="3"></circle><circle cx="0" cy="0" r="6"></circle>`;
			return $.svgElem("g", { class: "anchor", transform }, circles);
		},		
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgCurves,
				Doc = Self.doc,
				Drag = Self.drag;
			switch (event.type) {
				// native events
				case "mousedown":
					// stop default behaviour
					event.preventDefault();
					event.stopPropagation();
					// drag target element
					let el = $(event.target);
					if (el.parent().hasClass("cvs-wrapper")) {
						let packed = CanvasTools.lS.dh(Doc, { x: event.offsetX, y: event.offsetY }, 1),
							rgb = [(packed >>> 16) & 255, (packed >>> 8) & 255, packed & 255],
							curves = Self.values.curves.value;

						// fourth tool (↕ / in-pic-edit): add/select knot on current channel, drag vertically to set output
						if (Self.isInPicEdit) {
							let ch = +(Self.values.channel?.value ?? 0),
								input = Math.round(ch === 0 ? (rgb[0] + rgb[1] + rgb[2]) / 3 : rgb[ch - 1]),
								pts = structuredClone(curves[ch]),
								idx = pts.findIndex(p => Math.round(p.v.Hrzn.v) === input),
								startY = event.clientY;
							if (idx === -1) {
								let pt = structuredClone(pts[0]);
								pt.v.Hrzn.v = input;
								pt.v.Vrtc.v = input;
								pts.push(pt);
								pts.sort((a, b) => a.v.Hrzn.v - b.v.Hrzn.v);
								idx = pts.findIndex(p => Math.round(p.v.Hrzn.v) === input);
							}
							curves[ch] = pts;
							Self.picEdit = { ch, idx, startY };
							Self.activeAnchorIdx = idx;
							Self.dispatch({ type: "sync-ui-with-curves", activeIndex: idx });
							Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
							UI.doc.on("mousemove mouseup", Self.dispatch);
							return;
						}

						// black / mid / white pipettes → always write R/G/B curve channels (1..3)
						let pipette = +Self.els.root.find(`i.active[data-click="select-pipette"]`).data("arg"),
							mean = (rgb[0] + rgb[1] + rgb[2]) / 3;
						if (!pipette) return;

						for (let c = 0; c < 3; c++) {
							let pts = structuredClone(curves[c + 1]),
								first = pts[0],
								last = pts[pts.length - 1];
							if (pipette === 1) {
								// shadows → move first knot's input (Hrzn)
								first.v.Hrzn.v = Math.min(rgb[c], last.v.Hrzn.v - 1);
							} else if (pipette === 3) {
								// highlights → move last knot's input (Hrzn)
								last.v.Hrzn.v = Math.max(rgb[c], first.v.Hrzn.v + 1);
							} else {
								// midtones → log-ratio knot at ~middle gray output
								let chv = rgb[c] / 255,
									m = mean / 255;
								if (mean > 0 && chv > 0) {
									let g = Math.min(999, Math.max(10, Math.round(100 * Math.log(chv) / Math.log(m)))),
										hx = Math.round(127 - Math.log(g / 100) * 127);
									hx = Math.max(first.v.Hrzn.v + 1, Math.min(last.v.Hrzn.v - 1, hx));
									if (pts.length === 2) {
										pts.splice(1, 0, PixelUtil.presetThumb.yR(hx, 127, true));
									} else {
										pts[1].v.Hrzn.v = hx;
										pts[1].v.Vrtc.v = 127;
									}
								}
							}
							curves[c + 1] = pts;
						}
						Self.dispatch({ type: "sync-ui-with-curves" });
						Self.dispatch({ type: "render-canvas" });
						Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
						return;
					}
					break;
				case "mousemove":
					if (Self.picEdit) {
						let { ch, idx, startY } = Self.picEdit,
							pts = Self.values.curves.value[ch],
							pt = pts[idx];
						// Vrtc = Hrzn + (startY - currentY)
						pt.v.Vrtc.v = Math.max(0, Math.min(255, Math.round(pt.v.Hrzn.v + (startY - event.clientY))));
						Self.dispatch({ type: "sync-ui-with-curves" });
						Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
					}
					break;
				case "mouseup":
					if (Self.picEdit) {
						delete Self.activeAnchorIdx;
						delete Self.picEdit;
						Self.els.svg.find("g.active").removeClass("active");
						UI.doc.off("mousemove mouseup", Self.dispatch);
						Self.dispatch({ type: "sync-ui-with-curves" });
						Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
					}
					break;

				// "fast" events
				case "apply-filter-data":
					if (!Doc || !Self.preview) return;
					Self.values = event.values;
					Engine.raf(() => {
						let qv = FilterHelper.oT("curv"),
							ch = +(Self.values.channel?.value ?? 0),
							max = { w: 250, h: 251 },
							points;
							
						if (event.fromValues || Self.sketchMode || Self.isLut(Self.values.curves.value[ch])) {
							points = Self.values.curves.value[ch];
						} else {
							points = [...Self.els.svg[0].querySelectorAll(".anchor")]
								.map(a => Self.parseAnchorPos(a))
								.sort((a, b) => a[0] - b[0])
								.map(([cx, cy]) => PixelUtil.presetThumb.yR(
									Math.round(cx / max.w * 255),
									Math.round((max.w - cy) / max.w * 255),
									true
								));
							Self.values.curves.value[ch] = points;
						}
						for (let c = 0; c < 4; c++) {
							CurvesResource.fZ(qv, c, Self.values.curves.value[c]);
						}
						PP.TA({ G: CanvasTools.Qi, data: { a: "edit", _K: "curv", qv, ve: false } });
						PP.update();
					});
					return;

				// custom events
				case "render-canvas": {
					let ctx = Self.els.ctx,
						{ width: w, height: h } = Self.vars,
						channel = +(Self.values.channel?.value ?? 0),
						// Source histogram is cached for the dialog session:
						// curve edits / preview / reset must not re-sample Doc.LT().
						histogram = Self.vars.histogram,
						yScale,
						// curves tint: RGB / R / G / B
						palette = ["#cdd", "#fcc", "#cfc", "#ccf"],
						color = palette[channel] || palette[0],
						gradient = ctx.createLinearGradient(0, 0, 0, h),
						bins;
					if (!histogram) {
						let pixelCount = new Rect(0, 0, Doc.m, Doc.n).O();
						histogram = PixelUtil.histogramFromRgba(Doc.LT());
						// account for fully transparent samples (same as histogram panel / levels)
						histogram[0][255] += 3 * (pixelCount - histogram[5]);
						for (let ch = 1; ch < 4; ch++) {
							histogram[ch][255] += pixelCount - histogram[5];
						}
						Self.vars.histogram = histogram;
					}
					bins = histogram[channel] || histogram[0];
					yScale = 6e3 / histogram[4];
					if (channel === 0) yScale /= 3;
					gradient.addColorStop(0, color + "1");
					gradient.addColorStop(.3, color + "5");
					// reset canvas — logical space is 256×100, scaled to graph size
					Self.els.cvs.attr({ width: w, height: h });
					ctx.setTransform(w / 256, 0, 0, -h / 100, 0, h);
					ctx.beginPath();
					ctx.moveTo(-2, -2);
					for (let l = 0; l < 256; l++) {
						ctx.lineTo(l, bins[l] * yScale);
					}
					ctx.lineTo(258, -2);
					ctx.closePath();
					ctx.fillStyle = gradient;
					// ctx.strokeStyle = color;
					// ctx.lineWidth = .5;
					ctx.fill();
					// ctx.stroke();
					break;
				}
				case "generate-path-anchors":
					let svg = Self.els.svg[0],
						path = svg.querySelector("path"),
						d = path?.getAttribute("d") || "",
						tokens = d.match(/[MLQCSTZmlqcstz]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || [],
						points = [],
						i = 0,
						x = 0,
						y = 0,
						add = (px, py) => points.push([px, py]),
						atQ = (x0, y0, x1, y1, x2, y2, t) => {
							let u = 1 - t;
							return [
								u * u * x0 + 2 * u * t * x1 + t * t * x2,
								u * u * y0 + 2 * u * t * y1 + t * t * y2,
							];
						},
						atC = (x0, y0, x1, y1, x2, y2, x3, y3, t) => {
							let u = 1 - t,
								uu = u * u,
								tt = t * t;
							return [
								uu * u * x0 + 3 * uu * t * x1 + 3 * u * tt * x2 + tt * t * x3,
								uu * u * y0 + 3 * uu * t * y1 + 3 * u * tt * y2 + tt * t * y3,
							];
						};
					while (i < tokens.length) {
						let cmd = tokens[i++];
						switch (cmd) {
							case "M":
							case "L":
								x = +tokens[i++];
								y = +tokens[i++];
								add(x, y);
								break;
							case "Q": {
								let x1 = +tokens[i++], y1 = +tokens[i++],
									x2 = +tokens[i++], y2 = +tokens[i++];
								add(...atQ(x, y, x1, y1, x2, y2, .5));
								x = x2;
								y = y2;
								add(x, y);
								break;
							}
							case "C": {
								let x1 = +tokens[i++], y1 = +tokens[i++],
									x2 = +tokens[i++], y2 = +tokens[i++],
									x3 = +tokens[i++], y3 = +tokens[i++];
								add(...atC(x, y, x1, y1, x2, y2, x3, y3, .5));
								x = x3;
								y = y3;
								add(x, y);
								break;
							}
							case "Z":
							case "z": break;
						}
					}
					// replace any existing anchor anchors
					svg.querySelectorAll(".anchor").forEach(el => el.remove());
					points
						.slice(1,-1) // first and last item is not user moveable
						.map((p, id) => {
							let [x, y] = p;
							let anchor = Self.generateSvgAnchor({ x, y });
							svg.appendChild(anchor);
						});
					break;

				case "sync-ui-with-curves": {
					let ch = +(Self.values.channel?.value ?? 0),
						max = { w: 250, h: 251 },
						curve = Self.values.curves?.value?.[ch],
						svg = Self.els.svg[0];
					if (!curve?.length) break;

					// CrPt (0..255, Y up) → SVG knots (0..250, Y down)
					let knots = curve.map(p => [
						Math.round(p.v.Hrzn.v / 255 * max.w),
						Math.round(max.w - p.v.Vrtc.v / 255 * max.w),
					]);
					// ensure unique X for spline safety
					for (let i = 1; i < knots.length; i++) {
						if (knots[i][0] <= knots[i - 1][0]) knots[i][0] = Math.min(max.w, knots[i - 1][0] + 1);
					}

					svg.querySelectorAll(".anchor").forEach(el => el.remove());
					knots.forEach(([x, y], i) => {
						let anchor = Self.generateSvgAnchor({ x, y }),
							activeIdx = event.activeIndex ?? Self.picEdit?.idx ?? Self.activeAnchorIdx;
						if (i === activeIdx) anchor.classList.add("active");
						svg.appendChild(anchor);
					});
					Self.rebuildPath(Self.els.path[0], knots, max, Self.clamp);
					Self.els.hInput.css({ left: knots[0][0] });
					Self.els.hOutput.css({ left: knots[knots.length - 1][0] });
					break;
				}
					
				case "set-channel":
					event.values = Self.values;
					event.values.channel.value = event.value;
					event.values.channel.text = event.text;
					delete Self.activeAnchorIdx;
					Self.dispatch({ type: "render-canvas" });
					// ui sync
					Self.dispatch({ type: "sync-ui-with-curves" });
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
					break;
				case "set-algorithm": {
					// Auto Enhance modes → curve points via levelsFromHistogram
					event.values = Self.values;
					event.values.algorithm.value = event.value;
					event.values.algorithm.text = event.text;

					if (event.value === "-" || event.value === "") {
						// None → identity for all channels
						Self.values.curves.value = structuredClone(Self.values.curves.default);
					} else {
						// reuse dialog-session source histogram (same as render-canvas)
						let histogram = Self.vars.histogram,
							mode = +event.value;
						if (!histogram) {
							let pixelCount = new Rect(0, 0, Doc.m, Doc.n).O();
							histogram = PixelUtil.histogramFromRgba(Doc.LT());
							histogram[0][255] += 3 * (pixelCount - histogram[5]);
							for (let c = 1; c < 4; c++) histogram[c][255] += pixelCount - histogram[5];
							Self.vars.histogram = histogram;
						}

						// [mode, clipShadows%, clipHighlights%] — defaults 0.1%
						let computed = PixelUtil.levelsFromHistogram([mode, 0.1, 0.1], histogram);
						for (let c = 0; c < 4; c++) {
							let black = Math.round(computed[c][0]),
								white = Math.round(computed[c][1]),
								mid = computed[c][2],
								points = [
									PixelUtil.presetThumb.yR(black, 0, true),
									PixelUtil.presetThumb.yR(white, 255, true),
								];
							if (mid != null) {
								points.splice(1, 0, PixelUtil.presetThumb.yR(128, Math.round(mid), true));
							}
							Self.values.curves.value[c] = points;
						}
					}

					Self.dispatch({ type: "sync-ui-with-curves" });
					Self.dispatch({ type: "render-canvas" });
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
					break;
				}
				case "reset-view":
					// reset path
					Self.els.path[0].setAttribute("d", Self.vars.defaultPath);
					// generate anchors based on path
					Self.dispatch({ type: "generate-path-anchors" });
					// reset handles
					Self.els.hInput.css({ left: 0 });
					Self.els.hOutput.css({ left: 250 });
					break;
				case "set-spline-mode":
					Self.els.toolSpline.addClass("active");
					Self.els.toolSketch.removeClass("active");
					Self.dispatch({ type: "reset-view" });

					// switch view
					Self.els.graph.removeClass("sketch-mode");
					delete Self.sketchMode;

					// switching mode resets to identity spline points
					Self.values.curves.value = structuredClone(Self.values.curves.default);
					Self.dispatch({ type: "sync-ui-with-curves" });
					Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
					break;
				case "set-sketch-mode":
					Self.els.toolSpline.removeClass("active");
					Self.els.toolSketch.addClass("active");
					Self.dispatch({ type: "reset-view" });
					// switch view
					Self.els.graph.addClass("sketch-mode");
					Self.sketchMode = true;
					// switching to sketch resets channels to identity 256 LUTs
					for (let c=0; c<4; c++) {
						Self.values.curves.value[c] = Self.identityLut();
					}
					
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
					break;

				case "reset-pipette":
					Self.els.pDark.removeClass("active");
					Self.els.pMid.removeClass("active");
					Self.els.pLight.removeClass("active");
					Self.els.inPicEdit.removeClass("active");
					APP.els.content.removeClass("cursor-pipette-1 cursor-pipette-2 cursor-pipette-3 cursor-ns-resize");
					// reset flag
					delete Self.isPipette;
					delete Self.isInPicEdit;
					delete Self.picEdit;
					// toggle "off" the app cover
					UI.dispatch({ type: "toggle-dialog-cover", state: 1 });
					// unbind event listeners
					APP.els.cvsWrapper.off("mousedown", Self.dispatch);
					UI.doc.off("mousemove mouseup", Self.dispatch);
					break;
				case "select-pipette":
					Self.els.inPicEdit.removeClass("active");
					delete Self.isInPicEdit;
					delete Self.picEdit;
					APP.els.content.removeClass("cursor-ns-resize");
					event.el.parent().find(`i.active[data-click="select-pipette"]`).removeClass("active");
					APP.els.content.removeClass(`cursor-pipette-1 cursor-pipette-2 cursor-pipette-3`);

					event.el.addClass("active");
					APP.els.content.addClass(`cursor-pipette-${event.el.data("arg")}`);

					// no need to bind more event listeners
					if (!Self.isPipette) {
						// keep track of state
						Self.isPipette = true;
						// toggle "off" the app cover
						UI.dispatch({ type: "toggle-dialog-cover", state: !1 });
						// bind event listener
						APP.els.cvsWrapper.on("mousedown", Self.dispatch);
					}
					break;

				case "mode-in-pic-edit":
					// "↕" sample tool: click image → knot on current channel, drag vertically → output
					Self.els.pDark.removeClass("active");
					Self.els.pMid.removeClass("active");
					Self.els.pLight.removeClass("active");
					APP.els.content.removeClass("cursor-pipette-1 cursor-pipette-2 cursor-pipette-3");
					Self.els.inPicEdit.addClass("active");
					Self.isInPicEdit = true;
					APP.els.content.addClass("cursor-ns-resize");
					if (!Self.isPipette) {
						Self.isPipette = true;
						UI.dispatch({ type: "toggle-dialog-cover", state: !1 });
						APP.els.cvsWrapper.on("mousedown", Self.dispatch);
					}
					break;

				case "unbind-reset-view":
					// remove potential pipette cursors
					APP.els.content.removeClass(`cursor-pipette-1 cursor-pipette-2 cursor-pipette-3 cursor-ns-resize`);
					// unbind events
					Self.els.root.find(".slider").off("mousedown", Self.doSlider);
					APP.els.cvsWrapper.off("mousedown", Self.dispatch);
					UI.doc.off("mousemove mouseup", Self.dispatch);
					break;

				case "dlg-open":
					// fast references
					Self.els = {
						root: event.dEl,
						graph: event.dEl.find(".graph.curves"),
						cvs: event.dEl.find(".graph.curves canvas"),
						svg: event.dEl.find(".graph.curves svg"),
						path: event.dEl.find(".graph.curves svg path"),
						hInput: event.dEl.find(`.slider .handle[data-for="input"]`),
						hOutput: event.dEl.find(`.slider .handle[data-for="output"]`),
						pDark: event.dEl.find(".tool-pipette-dark"),
						pMid: event.dEl.find(".tool-pipette-mid"),
						pLight: event.dEl.find(".tool-pipette-light"),
						inPicEdit: event.dEl.find(".tool-ns-resize"),
						toolSpline: event.dEl.find(".tool-spline"),
						toolSketch: event.dEl.find(".tool-sketch"),
					};
					Self.doc = APP.file?.doc;
					// vars
					let width = +Self.els.cvs.prop("offsetWidth"),
						height = +Self.els.cvs.prop("offsetHeight"),
						defaultPath = "M 0 250 L 0 250 L 250 0 L 250 0";
					Self.vars = { width, height, defaultPath };
					// prepare canvas element
					Self.els.ctx = Self.els.cvs[0].getContext("2d", { willReadFrequently: true });
					// reset values
					UI.doDialog({ ...event, type: `dlg-reset-common`, name: Self.name });
					// select options
					Self.els.root.find(`.field-row .option.select`).map(elem => {
						let el = $(elem),
							val = el.find(".value").text(),
							xVal = window.bluePrint.selectSingleNode(`${el.data("match")}/*[@type="option"][@name="${val}"]`),
							value = xVal.getAttribute("value");
						Self.values[el.data("name")] = { text: val, default: value, value };
					});

					// keep a per-channel cache so switching RGB/R/G/B doesn't lose curves
					let value = {
						0: [PixelUtil.presetThumb.yR(0, 0, true), PixelUtil.presetThumb.yR(255, 255, true)],
						1: [PixelUtil.presetThumb.yR(0, 0, true), PixelUtil.presetThumb.yR(255, 255, true)],
						2: [PixelUtil.presetThumb.yR(0, 0, true), PixelUtil.presetThumb.yR(255, 255, true)],
						3: [PixelUtil.presetThumb.yR(0, 0, true), PixelUtil.presetThumb.yR(255, 255, true)],
					};
					Self.values.curves = { default: structuredClone(value), value };

					// draw input levels histogram for the current document
					Self.dispatch({ type: "render-canvas" });
					// generate anchors based on path
					Self.dispatch({ type: "generate-path-anchors" });
					// bind events
					Self.els.svg.on("mousedown", Self.doSvgPath);
					Self.els.root.find(".slider").on("mousedown", Self.doSlider);
					// initial apply
					Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
					break;
				case "dlg-preview":
					Self.preview = event.el.data("value") === "on";
					if (Self.preview) {
						Self.dispatch({ type: "apply-filter-data", values: Self.values });
					} else {
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "curv" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					Self.dispatch({ type: "unbind-reset-view" });
					// apply filter
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "curv" } });
					PP.update();
					// close dialog
					UI.doDialog({ ...event, type: `dlg-close-common`, name: Self.name });
					break;
				case "dlg-reset":
					// close dialog
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					// make sure internally stored values are reverted to default values
					Object.keys(Self.values).map(key => {
						Self.values[key].value = Self.values[key].default;
						if (Self.values[key].text != null) Self.values[key].text = Self.els.root.find(`.option.select[data-name="${key}"] .value`).text();
					});
					// reset mid-point
					Self.values.curves.value = structuredClone(Self.values.curves.default);
					Self.dispatch({ type: "set-spline-mode" });
					Self.dispatch({ type: "reset-view" });
					// apply identity curves immediately
					Self.dispatch({ type: "apply-filter-data", values: Self.values, fromValues: true });
					// ui sync
					Self.dispatch({ type: "sync-ui-with-curves" });
					Self.dispatch({ type: "render-canvas" });
					break;
				case "dlg-close":
					Self.dispatch({ type: "unbind-reset-view" });
					// common dialog close
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "curv" } });
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
					event.values = Self.values; // first copy values
					event.values.gradient.value = event.value; // then partial overwrite
					// exit if "preview" is not enabled
					if (!Self.preview) return Self.values = event.values;
					Self.dispatch({ type: "apply-filter-data", values: Self.values });
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
						let idx = +Self.values.gradient.value.idx;
						qv.Grad = { t: "Objc", v: Registry.gradients.list[idx] };
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
							vEl = el.find(".gradient-strip"),
							[d1, d2] = vEl.data("default").split(","),
							def = { idx: d1, hash: d2 },
							[v1, v2] = vEl.data("value").split(","),
							value = { idx: v1, hash: v2 };
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
						PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "grdm" } });
						PP.update();
					}
					break;
				case "dlg-ok":
					PP.TA({ G: CanvasTools.Qi, data: { a: "confirm", _K: "grdm" } });
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
					PP.TA({ G: CanvasTools.Qi, data: { a: "cancel", _K: "grdm" } });
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
		cover: false,
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
