
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
							value = el.data("on") ? true : false;
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
				el;
			// console.log(event);
			switch (event.type) {
				// standard dialog events
				case "dlg-ok":
				case "dlg-open":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
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
				el;
			// console.log(event);
			switch (event.type) {
				// standard dialog events
				case "dlg-ok":
				case "dlg-open":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
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
				el;
			// console.log(event);
			switch (event.type) {
				// standard dialog events
				case "dlg-ok":
				case "dlg-open":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
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
				case "dlg-ok":
				case "dlg-open":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
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
				el;
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
				el;
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
	dlgMezzoint: {
		name: "dlgMezzoint",
		preview: true,
		values: {},
		dispatch(event) {
			let APP = decoshop,
				Self = Dialogs.dlgMezzoint,
				Doc = Self.doc;
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
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				layers,
				pixels,
				copy,
				el;
			switch (event.type) {
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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

				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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

				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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

				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
			// console.log(event);
			switch (event.type) {
				case "set-cyan-red-value":
					event.target.html(event.value)
					/* falls through */
				case "apply-filter-data":
					return;
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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

				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				el;
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
				el;
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
				// standard dialog events
				case "dlg-open":
				case "dlg-ok":
				case "dlg-reset":
				case "dlg-preview":
				case "dlg-close":
					UI.doDialog({ ...event, type: `${event.type}-common`, name: Self.name });
					break;
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
				layers,
				pixels,
				copy,
				el;
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
