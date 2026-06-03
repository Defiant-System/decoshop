
const Dialogs = {
	dlgLensCorrection(event) {
		/*
		 * 
		 */
		let APP = decoshop,
			Self = Dialogs,
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
	},
	dlgLayerStyle(event) {
		/*
		 * 
		 */
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFilterGallery" });
		}
	},
	dlgContourEditor(event) {
		/*
		 * 
		 */
		let APP = decoshop,
			Self = Dialogs,
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
	},
	dlgFilterGallery(event) {
		/*
		 * 
		 */
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFilterGallery" });
		}
	},
	dlgBrightnessContrast(event) {
		/*
		 * Brightness -  Min: -150   Max: 150
		 * Contrast -    Min: -100   Max: 100
		 */
		let APP = decoshop,
			Self = Dialogs,
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

			// standard dialog events
			case "dlg-ok":
			case "dlg-open":
			case "dlg-reset":
			case "dlg-preview":
			case "dlg-close":
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgBrightnessContrast" });
				break;
		}
	},
	dlgStroke(event) {
		let APP = decoshop,
			Self = Dialogs,
			pixels,
			copy;
		// console.log(event);
		switch (event.type) {
			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgStroke" });
		}
	},
	dlgGradientEditor(event) {
		let APP = decoshop,
			Self = Dialogs,
			val,
			selEl,
			el;
		// console.log(event);
		switch (event.type) {
			case "set-color-type":
				// update inline "selectbox"
				event.el.removeClass("opened").html(event.text);
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
	},
	dlgThreshold(event) {
		let APP = decoshop,
			Self = Dialogs,
			pixels,
			copy;
		switch (event.type) {
			// "fast events"
			case "set-amount":
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgThreshold" });
		}
	},
	dlgCrystallize(event) {
		let APP = decoshop,
			Self = Dialogs,
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
			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgCrystallize" });
		}
	},
	dlgPointillize(event) {
		let APP = decoshop,
			Self = Dialogs,
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
			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPointillize" });
		}
	},
	dlgMosaic(event) {
		let APP = decoshop,
			Self = Dialogs,
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
			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMosaic" });
		}
	},
	dlgMezzoint(event) {
		let APP = decoshop,
			Self = Dialogs,
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
			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMezzoint" });
		}
	},
	dlgColorHalftone(event) {
		let APP = decoshop,
			Self = Dialogs,
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
			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgColorHalftone" });
		}
	},
	dlgFill(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFill" });
		}
	},
	dlgNormalMap(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgNormalMap" });
		}
	},
	dlgTextureDilation(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgTextureDilation" });
		}
	},
	dlgBoxBlur(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgBoxBlur" });
		}
	},
	dlgGaussianBlur(event) {
		let APP = decoshop,
			Self = Dialogs,
			pixels,
			copy;
		switch (event.type) {
			// "fast events"
			case "set-radius":
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgGaussianBlur" });
		}
	},
	dlgLensBlur(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLensBlur" });
		}
	},
	dlgMotionBlur(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMotionBlur" });
		}
	},
	dlgRadialBlur(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgRadialBlur" });
		}
	},
	dlgSurfaceBlur(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSurfaceBlur" });
		}
	},
	dlgDisplace(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDisplace" });
		}
	},
	dlgKaleidoscope(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgKaleidoscope" });
		}
	},
	dlgPinch(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPinch" });
		}
	},
	dlgPolarCoordinates(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPolarCoordinates" });
		}
	},
	dlgRipple(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgRipple" });
		}
	},
	dlgShear(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgShear" });
		}
	},
	dlgSpherize(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSpherize" });
		}
	},
	dlgTwirl(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgTwirl" });
		}
	},
	dlgWave(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgWave" });
		}
	},
	dlgZigZag(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgZigZag" });
		}
	},
	dlgAddNoise(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgAddNoise" });
		}
	},
	dlgDustScratches(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDustScratches" });
		}
	},
	dlgMedian(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMedian" });
		}
	},
	dlgReduceNoise(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgReduceNoise" });
		}
	},
	dlgFibers(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFibers" });
		}
	},
	dlgLensFlare(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLensFlare" });
		}
	},
	dlgSmartSharpen(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSmartSharpen" });
		}
	},
	dlgUnsharpMask(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgUnsharpMask" });
		}
	},
	dlgDiffuse(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDiffuse" });
		}
	},
	dlgEmboss(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgEmboss" });
		}
	},
	dlgOilPaint(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgOilPaint" });
		}
	},
	dlgTraceContour(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgTraceContour" });
		}
	},
	dlgWind(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgWind" });
		}
	},
	dlgHighPass(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgHighPass" });
		}
	},
	dlgHsbHsl(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgHsbHsl" });
		}
	},
	dlgMaximum(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMaximum" });
		}
	},
	dlgMinimum(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMinimum" });
		}
	},
	dlgOffset(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgOffset" });
		}
	},
	dlgRepeat(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgRepeat" });
		}
	},
	dlgColorToAlpha(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgColorToAlpha" });
		}
	},
	dlgDither(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDither" });
		}
	},
	dlgParticles(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgParticles" });
		}
	},
	dlgCameraRaw(event) {
		let APP = decoshop,
			Self = Dialogs,
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

			default:
				/* Falls through to "master UI"
				 * Can be handled here if needed - just capture events:
				 * "dlg-ok", "dlg-open", "dlg-reset", "dlg-preview", "dlg-close"
				 */
				// handler standard dialog events
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgCameraRaw" });
		}
	},
	dlgLiquify(event) {
		let APP = decoshop,
			Self = Dialogs,
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
	},
	dlgAddGuides(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgAddGuides" });
				break;
		}
	},
	dlgCanvasSize(event) {
		let APP = decoshop,
			Self = Dialogs;
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgCanvasSize" });
				break;
		}
	},
	dlgImageSize(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgImageSize" });
				break;
		}
	},
	dlgBlackWhite(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgBlackWhite" });
				break;
		}
	},
	dlgExposure(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgExposure" });
				break;
		}
	},
	dlgVibrance(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgVibrance" });
				break;
		}
	},
	dlgColorBalance(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgColorBalance" });
				break;
		}
	},
	dlgHueSaturation(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgHueSaturation" });
				break;
		}
	},
	dlgLevels(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgLevels" });
				break;
		}
	},
	dlgMatchColor(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgMatchColor" });
				break;
		}
	},
	dlgPhotoFilter(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPhotoFilter" });
				break;
		}
	},
	dlgSelectiveColor(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectiveColor" });
				break;
		}
	},
	dlgCurves(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgCurves" });
				break;
		}
	},
	dlgChannelMixer(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgChannelMixer" });
				break;
		}
	},
	dlgGradientMap(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgGradientMap" });
				break;
		}
	},
	dlgReplaceColor(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgReplaceColor" });
				break;
		}
	},
	dlgSelectColorRange(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectColorRange" });
				break;
		}
	},
	dlgShadowHighlights(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgShadowHighlights" });
				break;
		}
	},
	dlgTrim(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgTrim" });
				break;
		}
	},
	dlgSelectModifyBorder(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifyBorder" });
				break;
		}
	},
	dlgSelectModifySmooth(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifySmooth" });
				break;
		}
	},
	dlgSelectModifyExpand(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifyExpand" });
				break;
		}
	},
	dlgSelectModifyContract(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifyContract" });
				break;
		}
	},
	dlgSelectModifyFeather(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgSelectModifyFeather" });
				break;
		}
	},
	dlgApplyImage(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgApplyImage" });
				break;
		}
	},
	dlgArtboard(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgArtboard" });
				break;
		}
	},
	dlgColorLookup(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgColorLookup" });
				break;
		}
	},
	dlgDuplicateInto(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgDuplicateInto" });
				break;
		}
	},
	dlgFileInfo(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgFileInfo" });
				break;
		}
	},
	dlgVariables(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgVariables" });
				break;
		}
	},
	dlgExportColorLookUp(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgExportColorLookUp" });
				break;
		}
	},
	dlgExportLayers(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgExportLayers" });
				break;
		}
	},
	dlgExportAs(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgExportAs" });
				break;
		}
	},
	dlgToolShape(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgToolShape" });
				break;
		}
	},
	dlgPreferences(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPreferences" });
				break;
		}
	},
	dlgPresetManager(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPresetManager" });
				break;
		}
	},
	dlgPixelator(event) {
		let APP = decoshop,
			Self = Dialogs,
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
				UI.doDialog({ ...event, type: `${event.type}-common`, name: "dlgPixelator" });
				break;
		}
	},
	dlgColors(event) {
		let APP = decoshop,
			Self = Dialogs,
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
};
