
const UI = {
	init() {
		// fast references
		this.doc = $(document);
		this.content = window.find("content");

		// set id on font entries
		window.bluePrint.selectNodes(`//Fonts/f`).map((xFont, i) => xFont.setAttribute("_id", `m${i+1}`));

		let dlg = window.find(`.dialog-box[data-dlg="dlgColors"]`);
		this.els = {
			iHue: dlg.find(`input[name="color-hsl-hue"]`),
			iSaturation: dlg.find(`input[name="color-hsl-saturation"]`),
			iLightness: dlg.find(`input[name="color-hsl-lightness"]`),
			iRed: dlg.find(`input[name="color-rgb-red"]`),
			iGreen: dlg.find(`input[name="color-rgb-green"]`),
			iBlue: dlg.find(`input[name="color-rgb-blue"]`),
			iAlpha: dlg.find(`input[name="color-opacity"]`),
			iHex: dlg.find(`input[name="color-hex"]`),
		};
		// global css variables
		let APP = decoshop;
		this.content.css({ "--guide-color": APP.Settings.guides.color });

		// bind event handlers
		this.content.on("click", ".option .value, .inline-menu", this.dispatch);
		this.content.on("mousedown mouseup", "[data-ui], [data-dlg], .box-body", this.dispatch);
	},
	async dispatch(event) {
		let APP = decoshop,
			Self = UI,
			data,
			value,
			menu,
			min,
			max,
			rect,
			top,
			left,
			el;
		// console.log(event);
		switch (event.type) {
			case "click":
				el = $(event.target).parents("?[data-options]");
				value = el.data("options");
				if (!value || el.hasClass("disabled")) return;
				// make option active
				if (el.data("options") === "pop-gradient-strips") {
					let hash = el.find(".gradient-strip").data("hash"),
						aNode = window.bluePrint.selectSingleNode(`//Gradients/i[@active]`),
						gNode = window.bluePrint.selectSingleNode(`//Gradients/i[@hash="${hash}"]`);
					if (!gNode) gNode = window.bluePrint.selectSingleNode(`//Gradients/i[1]`);
					if (aNode) aNode.removeAttribute("active");
					if (gNode) gNode.setAttribute("active", 1);
				}
				// save reference to source element
				Self.srcEl = el.addClass("opened");
				// render menubox
				Self.menu = await window.render({
						template: value,
						append: Self.content,
						match: el.data("match") || false,
					});

				// position menubox
				rect = this.getBoundingClientRect();
				switch (el.data("pos")) {
					case "above":
						Self.menu.addClass("arrow-below");
						top = rect.top - window.top - rect.height - 39;
						left = rect.left - window.left + (rect.width >> 1) - (Self.menu[0].offsetWidth >> 1);
						break;
					case "left":
						Self.menu.addClass("arrow-right");
						top = rect.top - window.top - 11;
						left = rect.left - window.left - Self.menu[0].offsetWidth - 11;
						break;
					case "right":
						Self.menu.addClass("arrow-left");
						top = rect.top - window.top - 9;
						left = rect.left - window.left + rect.width + 10;
						break;
					default:
						top = rect.top - window.top + rect.height + 9;
						left = rect.left - window.left + (rect.width >> 1) - (Self.menu[0].offsetWidth >> 1);
				}
				Self.menu.css({ top, left });

				// set inital value - by associated event handler
				Self[Self.menu.data("ui")]({ type: "set-initial-value", el });

				// prevent mouse from triggering mouseover
				APP.els.content.addClass("cover");

				let srcMenu = Self.srcEl.parents(".inline-menubox");
				if (srcMenu.length) {
					Self.srcMenu = srcMenu.addClass("push-back");
				}

				let dEl = Self.srcEl.parents(".dialog-box");
				if (dEl.length) Self.dEl = dEl.addClass("covered");

				// event handler checks for clicks outside inline-menubox
				Self.doc.on("mousedown", Self.dispatch);
				break;
			case "mousedown":
				el = $(event.target);

				// console.log(Self.srcEl[0]);
				if (el.parents(".inline-menubox").length) {
					if (this === document) return;
					if (Self.dEl?.length) Self.dEl.removeClass("covered");
					// forward event to fitting handler
					Self[this.dataset.ui](event);
					// handles event differently for brush menu box
					if (this.dataset.ui === "doBrushTips" || this.dataset.select === "multi") return;
					return;
				} else if (el.parents("ul.opt-group").length) {
					// event handling option-group
					if (el.hasClass("active")) return;
					el.parent().find(".active").removeClass("active");
					el.addClass("active");
				} else if (el.parents(".box-body").length) {
					return Self.doPanel(event);
				} else if (el.parents("[data-dlg]").length) {
					return Self.doDialog(event);
				} else if (Self.srcMenu) {
					return Self.dispatch({ type: "clear-submenu" });
				} else if (Self.menu) {
					// clean up
					Self.menu.remove();
				}
				if (Self.srcEl) Self.srcEl.removeClass("opened");
				if (Self.dEl) Self.dEl.removeClass("covered");
				// uncover app UI
				APP.els.content.removeClass("cover");
				// unbind event handler
				Self.doc.off("mousedown", Self.dispatch);
				break;
			case "mouseup":
				el = $(event.target);
				if (Self.srcEl && !el.parents(".inline-menubox").length) {
					//reset origin element
					Self.srcEl.removeClass("opened");
					Self.srcEl = false;
				}
				break;
			// custom event
			case "toggle-dialog-cover":
				// prevent mouse from triggering mouseover
				APP.els.content.toggleClass("cover", !event.state);
				break;
			case "clear-submenu":
				if (Self.srcEl) Self.srcEl.removeClass("opened");
				if (Self.dEl) Self.dEl.removeClass("covered");
				Self.srcMenu.removeClass("push-back");
				Self.menu.remove();
				Self.menu = Self.srcMenu;
				// clean up
				delete Self.srcMenu;
				break;
			case "clear-menu":
				// clean up
				Self.menu.remove();
				// uncover app UI
				APP.els.content.removeClass("cover");
				// unbind event handler
				Self.doc.off("mousedown", Self.dispatch);
				break;
			default:
				// forward route events
				data = event.el.parents("[data-ui]").data("ui");
				Self[data](event);
		}
	},
	doGradients(event) {
		let APP = decoshop,
			Self = UI,
			dEl,
			el;
		// console.log(event);
		switch (event.type) {
			case "add-gradient-preset":
				APP.dispatch({ type: "open-dialog", arg: "dlgGradientEditor" });
				Self.dispatch({ type: "clear-menu" });
				break;
			case "select-gradient-strip":
				el = $(event.target).parents("?[data-hash]");
				if (!el.length) return;
				event.el.find(".active").removeClass("active");
				el.addClass("active");
				// update toolbar option selectbox
				Self.srcEl.find(".gradient-strip").data({ hash: el.data("hash") });
				// forward event
				dEl = Self.srcEl.parents(".dialog-box");
				if (dEl.length) {
					let func = Dialogs[dEl.data("dlg")].dispatch,
						type = Self.srcEl.data("change"),
						[idx, hash] = el.data("hash").split(",");
					if (func) func({ ...event, type, value: { idx, hash } });
					// clean up
					Self.dispatch({ type: "clear-menu" });
				}
				break;
		}
	},
	doDialogKnobValue(event) {
		let Self = UI,
			Drag = Self.drag;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();

				// prepare drag object
				let el = $(event.target),
					dEl = el.parents(".dialog-box"),
					dId = dEl.data("dlg"),
					bEl = dEl.find(".hover-knob"),
					kEl = bEl.find(".knob"),
					min = +el.data("min"),
					max = +el.data("max"),
					suffix = el.data("suffix") || "",
					type = el.data("change"),
					val = Math.round(((parseInt(el.text() || "0", 10) - min) / (max - min)) * 100),
					offset = val + event.clientY,
					func = Dialogs[dId].dispatch;

				// this might be panel element
				if (!dEl.length) {
					dEl = el.parents("[data-for]");
					dId = dEl.data("for");
					func = Adjustments[dId]
				}

				Self.drag = { el, bEl, kEl, min, max, type, offset, suffix, func };

				// reset knob
				kEl.data({ value: val });
				// show knob-bubble
				bEl.removeClass("hidden")
					.css({
						top: el.prop("offsetTop"),
						left: el.prop("offsetLeft"),
					});

				// bind event handlers
				Self.content.addClass("no-dlg-cursor");
				Self.doc.on("mousemove mouseup", Self.doDialogKnobValue);
				break;
			case "mousemove":
				// update knob
				let value = Math.max(Math.min(Drag.offset - event.clientY, 100), 0);
				Drag.kEl.data({ value });
				// update origin element value
				value = Math.round((value / 100) * (Drag.max - Drag.min));
				let str = value > 0 ? `${value}${Drag.suffix}` : "";
				Drag.el.html(str);

				if (Drag.value === value) return;
				Drag.value = value;
				
				// proxy changed value
				Drag.func({ type: Drag.type, value: Drag.value });
				break;
			case "mouseup":
				// proxy changed value
				Drag.func({ type: `after:${Drag.type}`, value: Drag.value });
				// hide knob-bubble
				Drag.bEl.cssSequence("close", "animationend", el => el.addClass("hidden").removeClass("close"));
				// unbind event handlers
				Self.content.removeClass("no-dlg-cursor");
				Self.doc.off("mousemove mouseup", Self.doDialogKnobValue);
				break;
		}
	},
	doDialogBars(event) {
		let Self = UI,
			Drag = Self.drag;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();

				// prepare drag object
				let el = $(event.target),
					dEl = el.parents(".dialog-box"),
					dId = dEl.data("dlg"),
					bEl = dEl.find(".hover-bubble"),
					offset = parseInt(el.cssProp("--value"), 10) - event.clientX,
					type = el.data("change"),
					min = 0,
					max = 100;
				Self.drag = { el, bEl, dId, min, max, type, offset };

				// show bubble
				bEl.removeClass("hidden")
					.css({
						top: el.parent().prop("offsetTop"),
						left: el.parent().prop("offsetLeft"),
					});

				// bind event handlers
				Self.content.addClass("no-dlg-cursor");
				Self.doc.on("mousemove mouseup", Self.doDialogBars);
				break;
			case "mousemove":
				// update bars icon UI
				let value = Math.max(Math.min(Drag.offset + event.clientX, Drag.max), Drag.min);
				Drag.el.css({ "--value": `${value}%` });
				// show value in bubble
				Drag.bEl.html(`${value}%`);

				if (Drag.value === value) return;
				Drag.value = value;

				// proxy changed value
				Dialogs[Drag.dId].dispatch({ type: Drag.type, value: Drag.value });
				break;
			case "mouseup":
				// proxy changed value
				Dialogs[Drag.dId].dispatch({ type: `after:${Drag.type}`, value: Drag.value });
				// hide bubble
				Drag.bEl.cssSequence("close", "animationend", el => el.addClass("hidden").removeClass("close"));
				// unbind event handlers
				Self.content.removeClass("no-dlg-cursor");
				Self.doc.off("mousemove mouseup", Self.doDialogBars);
				break;
		}
	},
	doGradientSlider(event) {
		let Self = UI,
			Drag = Self.drag;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();

				let el = $(event.target).parents("?[data-ux]").get(0),
					pEl = el.parents(".track"),
					gEl = el.parents(".gradient-slider"),
					dEl = el.parents(".dialog-box[data-dlg]"),
					dlgFunc = Dialogs[dEl.data("dlg")].dispatch,
					target = {},
					ux = el.data("ux"),
					offset = {
						x: +el.cssProp("--x") - event.clientX,
					},
					min = 0,
					max = +pEl.prop("offsetWidth");

				switch (ux) {
					case "gap-handle":
						dlgFunc({ type: `select-${ux}`, el });

						target.input = dEl.find(`input[data-name="alpha-location"]`);
						target.suffix = target.input.data("suffix");
						target.knob = target.input.parents(".field-row").find(".knob");
						break;
					case "gcp-handle":
						dlgFunc({ type: `select-${ux}`, el });

						target.input = dEl.find(`input[data-name="color-location"]`);
						target.suffix = target.input.data("suffix");
						target.knob = target.input.parents(".field-row").find(".knob");
						break;
					case "gam-handle":
					case "gcm-handle":
						dlgFunc({ type: `select-${ux}`, el });

						target.input = dEl.find(`input[data-name="midpoint-location"]`);
						target.suffix = target.input.data("suffix");
						target.knob = target.input.parents(".field-row").find(".knob");

						min += 9;
						max -= 9;
						break;
					case "gc-track":
						// add new point
						target = el.append(`<span class="point selected dragging" data-ux="gcp-handle" style="--c: #f00; --x: ${event.offsetX};"></span>`);
						// simulate new mousedown
						Self.doGradientSlider({
							type: "mousedown",
							target: target[0],
							clientX: event.clientX,
							preventDefault() {}
						});
						return;
				}

				gEl.find(".selected").removeClass("selected");
				el.addClass("selected dragging");

				// drag related info
				Self.drag = { el, pEl, gEl, ux, dlgFunc, offset, min, max, target };

				// bind event handlers
				gEl.addClass("no-cursor");
				Self.doc.on("mousemove mouseup", Self.doGradientSlider);
				break;
			case "mousemove":
				let diff = event.clientX + Drag.offset.x,
					left = Math.max(Math.min(Drag.max, diff), Drag.min),
					perc = left / (Drag.max - Drag.min);
				
				Drag.el.css({ "--x": left });
				// update input field
				Drag.target.input.val((perc * 100) | 0 + Drag.target.suffix);
				// forward event to dialog
				Drag.dlgFunc({ type: `update-${Drag.ux}`, el: Drag.el, perc });
				break;
			case "mouseup":
				// reset element
				Drag.el.removeClass("dragging");
				// unbind event handlers
				Drag.gEl.removeClass("no-cursor");
				Self.doc.off("mousemove mouseup", Self.doGradientSlider);
				break;
		}
	},
	doRange(event) {
		let Self = UI,
			Drag = Self.drag;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();

				let el = $(event.target).parents("?[data-ux]").get(0);

				if (el.data("ux") === "br-track") {
					let hEl = el.find(".handle");
					hEl.css({ left: event.offsetX - 5 });
					return Self.doRange({
						type: "mousedown",
						target: hEl[0],
						clientX: event.clientX,
						preventDefault() {},
					});
				}

				let pEl = el.parent(),
					dEl = pEl.parents(".dialog-box"),
					// get target elements for value update
					target = dEl.find(`[data-id="${pEl.data("target")}"]`),
					value = +pEl.cssProp("--val"),
					newValue = +pEl.cssProp("--val"),
					suffix = target.data("suffix") || "",
					type = pEl.data("change"),
					offset = {
						x: +el.prop("offsetLeft") - event.clientX,
					},
					range = {
						min: +pEl.data("min"),
						max: +pEl.data("max"),
					},
					min = 0,
					max = +pEl.prop("offsetWidth"),
					func = Dialogs[dEl.data("dlg")].dispatch;

				// this might be panel element
				if (!dEl.length) {
					dEl = el.parents("[data-for]");
					func = Adjustments[dEl.data("for")]
				}
				// drag related info
				Self.drag = { el, pEl, func, type, target, value, newValue, suffix, range, offset, min, max };

				// proxy changed value
				let l = +el.prop("offsetLeft"),
					v = Math.round(Math.lerp(range.min, range.max, l / max));
				target.html(v + suffix);
				func({ type, target, value: v });

				// bind event handlers
				Self.content.addClass("no-dlg-cursor");
				Self.doc.on("mousemove mouseup", Self.doRange);
				break;
			case "mousemove":
				let diff = event.clientX + Drag.offset.x,
					left = Math.max(Math.min(Drag.max, diff), Drag.min);
				
				Drag.el.css({ left });

				// let val = Math.round((left / Drag.max) * 255);
				let val = Math.round(Math.lerp(Drag.range.min, Drag.range.max, left / Drag.max));
				if (Drag.newValue === val) return;
				Drag.target.html(val + Drag.suffix);
				Drag.newValue = val;

				// proxy changed value
				Drag.func({ type: Drag.type, target: Drag.target, value: Drag.newValue });
				break;
			case "mouseup":
				// unbind event handlers
				Self.content.removeClass("no-dlg-cursor");
				Self.doc.off("mousemove mouseup", Self.doRange);
				break;
			case "set-initial-value":
				// initial value of slider
				event.dEl.find(".has-basic-range").map(elem => {
					let fEl = $(elem),
						vEl = fEl.find(".value span[data-default]"),
						sEl = fEl.find(".slider"),
						hEl = sEl.find(".handle"),
						val = parseInt(vEl.text(), 10),
						min = parseInt(sEl.data("min"), 10),
						max = parseInt(sEl.data("max"), 10),
						sW = +sEl.prop("offsetWidth"),
						left = Math.invLerp(min, max, val) * sW;
					// move handle
					hEl.css({ left });
				});
				break;
		}
	},
	doQRange(event) {
		let Self = UI,
			Drag = Self.drag;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();

				let el = $(event.target).parents("?[data-ux]").get(0),
					ux = el.data("ux");

				let pEl = el.parent(),
					dEl = pEl.parents(".dialog-box"),
					offset = {
						x: +el.prop("offsetLeft") - event.clientX,
					},
					min = 0,
					max = +pEl.prop("offsetWidth");
				// drag related info
				Self.drag = { el, pEl, offset, min, max };

				// bind event handlers
				Self.content.addClass("no-dlg-cursor");
				Self.doc.on("mousemove mouseup", Self.doQRange);
				break;
			case "mousemove":
				break;
			case "mouseup":
				// unbind event handlers
				Self.content.removeClass("no-dlg-cursor");
				Self.doc.off("mousemove mouseup", Self.doQRange);
				break;
		}
	},
	doDblRange(event) {
		let Self = UI,
			Drag = Self.drag;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();

				let el = $(event.target).parents("?[data-ux]"),
					ux = el.data("ux");

				let func = Drag[el.parents(`.dialog-box[data-dlg]`).data("dlg")],
					hEl = el.parents(`?[data-ux="r-handle"]`).addClass("hover"),
					type = hEl.data("change"),
					opW = +hEl.parent().prop("offsetWidth") - 1,
					oW = +hEl.prop("offsetWidth"),
					oL = +hEl.prop("offsetLeft"),
					offset = {
						x: +el.prop("offsetLeft") - event.clientX,
						w: oW + oL,
						opW,
						oL,
						oW,
					},
					min = 0,
					max = opW,
					els = [],
					value = [],
					newValue = [];
				// min & max values
				value.push(+hEl.cssProp("--min"));
				value.push(+hEl.cssProp("--max"));
				// prepare DOM elements
				els.push(el.parents(".field-row").find(`.min[data-id="${hEl.find(".min").data("for")}"]`));
				els.push(el.parents(".field-row").find(`.max[data-id="${hEl.find(".max").data("for")}"]`));

				switch (ux) {
					case "r-min":
						offset.x += +hEl.prop("offsetLeft");
						max = offset.w;
						break;
					case "r-max":
						offset.x += event.offsetX;
						max = opW - oL;
						break;
					case "r-handle":
						max = opW - oW;
						break;
				}
				// drag related info
				Self.drag = { el, ux, hEl, func, els, value, newValue, type, offset, min, max };

				// bind event handlers
				Self.content.addClass("no-dlg-cursor");
				Self.doc.on("mousemove mouseup", Self.doDblRange);
				break;
			case "mousemove":
				let diff = event.clientX + Drag.offset.x,
					data = {},
					val = [].concat(Drag.value);
				switch (Drag.ux) {
					case "r-min":
						data.left = Math.max(Math.min(Drag.max, diff), Drag.min);
						data.width = Drag.offset.w - data.left;
						Drag.hEl.css(data);

						val[0] = Math.round((data.left / Drag.offset.opW) * 255);
						val[1] = Math.round(((data.left + data.width) / Drag.offset.opW) * 255);
						break;
					case "r-max":
						data.width = Math.max(Math.min(Drag.max, diff), Drag.min);
						Drag.hEl.css(data);

						val[1] = Math.round(((Drag.offset.oL + data.width) / Drag.offset.opW) * 255);
						break;
					case "r-handle":
						data.left = Math.max(Math.min(Drag.max, diff), Drag.min);
						Drag.el.css(data);

						val[0] = Math.round((data.left / Drag.offset.opW) * 255);
						val[1] = Math.round(((data.left + Drag.offset.oW) / Drag.offset.opW) * 255);
						break;
				}
				if (Drag.newValue[0] === val[0] && Drag.newValue[1] === val[1]) return;
				Drag.newValue = val;

				// proxy changed value
				Drag.func({ type: Drag.type, els: Drag.els, value: Drag.newValue });
				break;
			case "mouseup":
				// reset range element
				Drag.hEl.removeClass("hover");
				// unbind event handlers
				Self.content.removeClass("no-dlg-cursor");
				Self.doc.off("mousemove mouseup", Self.doDblRange);
				break;
		}
	},
	doPanel(event) {
		let Self = UI,
			// Drag = Self.drag,
			// file,
			// value,
			// dEl,
			el;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				el = $(event.target);
				let ux = el.data("ux");

				switch (true) {
					case el.hasClass("toggler"):
						return el.data("value") === "on"
								? el.data({ value: "off" })
								: el.data({ value: "on" });
					case el.hasClass("color-box"):
						return Self.doColorBox(event);
					case el.hasClass("hue-bar"):
						return Self.doHueBar(event);
					case ux === "dlg-knob":
						return Self.doDialogKnobValue(event);
					// case ux === "ring-input":
					// 	return Self.doRing(event);
					case ux === "dlg-bars":
						return Self.doDialogBars(event);
					case ux === "gc-track":
					case ux === "gap-handle":
					case ux === "gam-handle":
					case ux === "gcm-handle":
					case ux === "gcp-handle":
						return Self.doGradientSlider(event);
					case ux === "br-track":
					case ux === "br-handle":
						return Self.doRange(event);
					case ux === "r-handle":
					case ux === "r-min":
					case ux === "r-max":
						return Self.doDblRange(event);
					case ux === "qr-handle":
					case ux === "qr-min":
					case ux === "qrm-handle":
					case ux === "qrm-min":
					case ux === "qrm-max":
					case ux === "qr-max":
						return Self.doQRange(event);
					case el.hasClass("knob"):
					case el.hasClass("pan-knob"):
						return Self.doDialogKnob(event);
					case el.parent().hasClass("covered"):
						return Self.dispatch({ type: "mousedown", target: el.parent()[0] });
				}
		}
	},
	doDialog(event) {
		let Self = UI,
			Drag = Self.drag,
			rect, top, left, x, y,
			dEl,
			el;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				el = $(event.target);
				let ux = el.data("ux");

				switch (true) {
					case el.hasClass("toggler"):
						return el.data("value") === "on"
								? el.data({ value: "off" })
								: el.data({ value: "on" });
					case el.hasClass("color-box"):
						return Self.doColorBox(event);
					case el.hasClass("hue-bar"):
						return Self.doHueBar(event);
					case ux === "dlg-knob":
						return Self.doDialogKnobValue(event);
					case ux === "ring-input":
						return Self.doRing(event);
					case ux === "dlg-bars":
						return Self.doDialogBars(event);
					case ux === "gc-track":
					case ux === "gap-handle":
					case ux === "gam-handle":
					case ux === "gcm-handle":
					case ux === "gcp-handle":
						return Self.doGradientSlider(event);
					case ux === "br-track":
					case ux === "br-handle":
						return Self.doRange(event);
					case ux === "r-handle":
					case ux === "r-min":
					case ux === "r-max":
						return Self.doDblRange(event);
					case ux === "qr-handle":
					case ux === "qr-min":
					case ux === "qrm-handle":
					case ux === "qrm-min":
					case ux === "qrm-max":
					case ux === "qr-max":
						return Self.doQRange(event);
					case el.hasClass("knob"):
					case el.hasClass("pan-knob"):
						return Self.doDialogKnob(event);
					case el.parent().hasClass("covered"):
						return Self.dispatch({ type: "mousedown", target: el.parent()[0] });
				}

				// prevent default behaviour
				event.preventDefault();

				let dlg = el.parents(".dialog-box"),
					offset = {
						y: +dlg.prop("offsetTop") - event.clientY,
						x: +dlg.prop("offsetLeft") - event.clientX,
					};
				Self.drag = { dlg, offset };

				// bind event handlers
				Self.content.addClass("no-cursor");
				Self.doc.on("mousemove mouseup", Self.doDialog);
				break;
			case "mousemove":
				top = event.clientY + Drag.offset.y;
				left = event.clientX + Drag.offset.x;
				Drag.dlg.css({ top, left });
				break;
			case "mouseup":
				// unbind event handlers
				Self.content.removeClass("no-cursor");
				Self.doc.off("mousemove mouseup", Self.doDialog);
				break;

			// custom events
			case "dlg-open":
				let param = event.name.split(",");
				event.args = param.slice(1);
				event.name = param[0];
				dEl = $(`.dialog-box[data-dlg="${event.name}"]`);

				rect = dEl.offset();
				top = rect.top + Math.random() * 80 | 0;
				left = rect.left + Math.random() * 80 | 0;
				let pDlg = dEl.parent().find(".dialog-box.showing").addClass("has-child"),
					zIndex = 101 + pDlg.length;

				dEl.css({ top, left, zIndex });
				// make sure knobs in dialog is synced with its sibling input element
				Self.doDialogKnob({ type: "set-initial-value", dEl });
				Self.doRing({ type: "set-initial-value", dEl });
				Self.doRange({ type: "set-initial-value", dEl });
				// auto forward open event

				if (Dialogs[event.name]) Dialogs[event.name].dispatch({ ...event, dEl });
				else Self.doDialog({ ...event, type: `${event.type}-common` });
				// prevent mouse from triggering mouseover
				Self.content.toggleClass("cover", ![true, undefined].includes(Dialogs[event.name].cover));
				// open dialog
				dEl.cssSequence("opening", "animationend", el => {
						el.addClass("showing").removeClass("opening");
					});
				break;
			case "dlg-close":
				// close dialog
				event.el.parents(".dialog-box")
					.cssSequence("closing", "animationend", el => {
						// prevent mouse from triggering mouseover
						Self.content.removeClass("cover");
						// re-activate "parent" dialog
						el.parent().find(".showing.has-child").removeClass("has-child");
						// reset element
						el.removeClass("showing closing").css({ top: "", left: "" });
					});
				break;
			/*
			case "dlg-undo-filter":
				// revert layer to initial state
				pixels = Dialogs.data.pixels;
				copy = new ImageData(new Uint8ClampedArray(pixels.data), pixels.width, pixels.height);
				// update layer
				Dialogs.data.layer.putImageData({ data: copy, noEmit: 1 });
				break;
			*/
			case "dlg-init-common":
				// obey "preview" flag
				event.dEl.find(`.buttons .toggler[data-click="dlg-preview"]`)
					.data({ value: Dialogs[event.name].preview ? "on" : "off" });
				break;
			case "dlg-open-common":
				if (!event.dEl) return;
				// collect default values
				event.dEl.find(`.field-row input`).map(elem => {
					let iEl = $(elem);
					// value[iEl.attr("name")] = parseInt(iEl.val(), 10);
				});
				// save reference to event
				Dialogs.srcEvent = event;
				// read preview toggler state
				Dialogs.preview = event.dEl.find(`.toggler[data-click="dlg-preview"]`).data("value") === "on";
				// apply -- In case Preview is turned off, apply filter on image
				Dialogs[event.name].dispatch({ type: "apply-filter-data" });
				break;
			case "dlg-ok-common":
				// TODO: apply changes
				Self.doDialog({ ...event, type: "dlg-close" });
				break;
			case "dlg-reset-common":
				dEl = event.dEl || event.el.parents(".dialog-box");
				// reset input fields
				dEl.find(`.field-row input[data-default]`).map(elem => {
					let iEl = $(elem),
						value = iEl.data("default");
					// update input field
					iEl.val(value);
				});
				// select options
				dEl.find(`.field-row .option.select .value[data-default]`).map(elem => {
					let iEl = $(elem),
						value = iEl.data("default");
					// update option select field
					iEl.html(value);
				});
				// select opt-groups
				dEl.find(`.field-row .opt-group[data-default]`).map(elem => {
					let iEl = $(elem),
						value = iEl.data("default");
					// update option select field
					iEl.find(".active").removeClass("active");
					iEl.find(`li[data-value="${value}"]`).addClass("active");
				});
				// make sure togglers are returned to default state
				dEl.find(`.toggler[data-default]`).map(elem => {
					let tEl = $(elem);
					tEl.data({ value: tEl.data("default") });
				});
				// make sure color presets are returned to default state
				dEl.find(`.field-row.has-basic-range`).map(elem => {
					let pEl = $(elem),
						vEl = pEl.find(".value span[data-default]"),
						hEl = pEl.find(".slider .handle"),
						sEl = hEl.parent(),
						val = parseInt(vEl.data("default"), 10),
						min = parseInt(sEl.data("min"), 10),
						max = parseInt(sEl.data("max"), 10),
						sW = +sEl.prop("offsetWidth"),
						left = Math.invLerp(min, max, val) * sW;
					vEl.html(val);
					hEl.css({ left });
				});
				// make sure color presets are returned to default state
				dEl.find(`.field-row .color-preset[data-default]`).map(elem => {
					let pEl = $(elem);
					pEl.css({ "background-color": pEl.data("default") });
				});
				// make sure knobs in dialog is synced with its sibling input element
				Self.doDialogKnob({ type: "set-initial-value", dEl });
				// make sure ring-input is returned to default state
				Self.doRing({ type: "set-initial-value", dEl });
				break;
			case "dlg-preview-common":
				// TODO: toggle canvas render
				break;
			case "dlg-close-common":
				Self.doDialog({ ...event, type: "dlg-close" });
				break;
		}
	},
	doFontExplorer(event) {
		let APP = decoshop,
			Self = UI,
			el;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				el = $(event.target);

				switch (el.data("ux")) {
					case "toggle-filter":
						el.toggleClass("active", el.hasClass("active"));
						Self.doFontExplorer({ type: "apply-filters" });
						break;
				}

				break;
			// custom events
			case "set-initial-value":
				break;
			case "select-font":
				el = $(event.target);
				console.log("selected font: ", el.text());
				// close inline menu
				Self.dispatch({ type: "clear-menu" });
				break;
			case "upload-font":
				Self.dispatch({ type: "clear-submenu" });
				Self.dispatch({ type: "clear-menu" });
				// trigger upload flow
				console.log("trigger upload flow");
				break;
			case "apply-filters":
				if (event.values?.includes("upload")) {
					return Self.doFontExplorer({ type: "upload-font" });
				}
				// identify filtering criterias
				let pEl = APP.els.content.find(`.inline-menubox[data-ui="doFontExplorer"]`),
					filters = event.values
							? event.values.map(e => `@c="${e}"`)
							: pEl.find(`.opt-group li.active`).map(e => `@c="${$(e).data("arg")}"`),
					match = `//Fonts/f[${filters.join(" or ")}]`;
				// render matches in virtual dom
				window.render({ template: "font-entry", match, vdom: true })
					.then(list => {
						pEl.find(".list-wrapper > div").map(elem => {
							let mEl = $(elem),
								isMatch = list.find(`div[_id="${mEl.attr("_id")}"]`).length;
							mEl.toggleClass("hidden", isMatch);
						});
					});
				break;
		}
	},
	doBrushTips(event) {
		let APP = decoshop,
			Self = UI,
			Drag = Self.drag,
			Tool = APP.tools[APP.tools._active],
			_round = Math.round,
			_min = Math.min,
			_max = Math.max,
			_cos = Math.cos,
			data = {},
			name,
			size,
			value,
			hardness,
			roundness,
			angle,
			image,
			el;
		//console.log(event);
		switch (event.type) {
			case "mousedown":
				el = $(event.target);
				// special handling for gyro events
				if (!["handle", "direction"].includes(el.prop("className"))) return;
				// prevent default behaviour
				event.preventDefault();

				Self.drag = {
					el: el.parent(),
					type: el.prop("className"),
					clientY: event.clientY,
					clientX: event.clientX,
					roundness: +Self.xShape.getAttribute("roundness"),
					angle: +Self.xShape.getAttribute("angle"),
				};

				if (Self.drag.type === "handle") {
					Self.drag.mirror = el.index() === 0 ? -1 : 1;
					Self.drag.value = 49.5 * (Self.drag.roundness / 100);
					Self.drag.min = 5;
					Self.drag.max = 49.5;
				} else {
					Self.drag.value = Self.drag.angle;
					Self.drag.min = -60;
					Self.drag.max = 60;
				}

				// bind event handlers
				Self.content.addClass("no-cursor");
				Self.doc.on("mousemove mouseup", Self.doBrushTips);
				break;
			case "mousemove":
				roundness = Drag.roundness;
				angle = Drag.angle;

				if (Drag.type === "handle") {
					// this type affects tip roundness
					value = Drag.value - (Drag.mirror * (Drag.clientY - event.clientY));
					value = _min(_max(value, Drag.min), Drag.max);
					data.height = value +"px";
					// set roundness
					roundness = _round((value / Drag.max) * 100);
				} else {
					// this type affects tip angle
					value = _min(_max(event.clientY - Drag.clientY, Drag.min), Drag.max);
					value = Drag.value + _round((value / 120) * 360);
					data.transform = `translateX(-50%) translateY(-50%) rotate(${value}deg)`;
					// set angle
					angle = (value + 360) % 360;
				}
				// UI update for gyro
				Drag.el.css(data);

				Self.doBrushTips({ type: "tip-menu-set-roundness-angle", roundness, angle });
				Self.doBrushTips({ type: "draw-preview-curve" });
				break;
			case "mouseup":
				// unbind event handlers
				Self.content.removeClass("no-cursor");
				Self.doc.off("mousemove mouseup", Self.doBrushTips);
				break;
			// custom events
			case "set-initial-value":
				Self.cvs = Self.menu.find(".preview canvas");
				Self.ctx = Self.cvs[0].getContext("2d", { willReadFrequently: true });
				Self.cvs.prop({ width: 206, height: 78 });

				// indicate currect tip in menu
				name = Self.srcEl.data("name");
				Self.menu.find(`.shape-list > div[data-name="${name}"]`).trigger("click");
				break;
			case "draw-preview-curve":
				// reset context
				Self.cvs.prop({ width: 206, height: 78 });
				Self.ctx.translate(4, 28);
				// Self.ctx.fillStyle = "#fff";

				image = Tool.preset.tip.cvs[0];
				size = Tool.preset.size;
				for (let i=0; i<180; i++) {
					Self.ctx.translate(1, _cos(i * 0.035) * .65);
					Self.ctx.drawImage(image, 0, 0, size, size, 0, 0, 17, 17);
				}
				break;
			case "tip-menu-set-tip":
				el = event.el;
				el.parent().find(".selected").removeClass("selected");
				el.addClass("selected");

				// assemble info about preset
				name = el.data("name");
				Self.xShape = window.bluePrint.selectSingleNode(`//TipShapes/*[@name="${name}"]`);
				size      = +Self.xShape.getAttribute("size");
				hardness  = +Self.xShape.getAttribute("hardness");
				roundness = +Self.xShape.getAttribute("roundness");
				angle     = +Self.xShape.getAttribute("angle");

				// dispatch event to be forwarded
				data = {
					type: Self.srcEl.data("change"),
					el: Self.srcEl,
					arg: name,
					callback: () => Self.doBrushTips({ type: "draw-preview-curve" })
				};
				if (data.type) APP.dispatch(data);


				Self.menu.find(".gyro").css({
					height: (roundness / 100) * 49.5 +"px",
					transform: `translateX(-50%) translateY(-50%) rotate(${angle}deg)`,
				});

				// update size range / field
				Self.menu.find(".tip-size input").val(size);
				Self.doBrushTips({ type: "tip-menu-set-size", value: size });
				
				// update hardness range / field
				Self.menu.find(".tip-hardness input").val(hardness);
				Self.doBrushTips({ type: "tip-menu-set-hardness", value: hardness });
				break;
			case "tip-menu-set-roundness-angle":
				// update xml node
				Self.xShape.setAttribute("roundness", event.roundness);
				Self.xShape.setAttribute("angle", event.angle);
				// forward event to active tool
				Tool.dispatch({ ...event, type: "resize-rotate-tip" });
				break;
			case "tip-menu-set-size":
				el = Self.menu.find(".tip-size .value");
				el.html(event.value + el.data("suffix"));

				// update xml node
				Self.xShape.setAttribute("size", event.value);
				// forward event to active tool
				Tool.dispatch({ ...event, type: "change-size"});
				break;
			case "tip-menu-set-hardness":
				el = Self.menu.find(".tip-hardness .value");
				el.html(event.value + el.data("suffix"));

				// update xml node
				Self.xShape.setAttribute("hardness", event.value);
				// forward event to active tool
				Tool.dispatch({ ...event, type: "change-hardness"});
				break;
		}
	},
	doSwatches(event) {
		let APP = decoshop,
			Self = UI,
			data,
			value,
			el;
		switch (event.type) {
			// native events
			case "mousedown":
				el = $(event.target).parents("?.swatch");
				if (!el.length) {
					event.preventDefault();
					event.stopPropagation();
					return;
				}
				// selected option - UI update
				el.parent().find(".selected").removeClass("selected");
				el.addClass("selected");
				
				let srcEl = Self.srcEl.hasClass("color-preset") ? Self.srcEl : Self.srcEl.find(".value");
				data = {
					type: Self.srcEl.data("change"),
					el: Self.srcEl,
					old: ColorLib.rgbToHex(srcEl.css("background-color")),
					value: ColorLib.rgbToHex(el.css("background-color")),
				};
				if (data.old === data.value) return;
				// dispatch event to be forwarded
				if (data.type) APP.dispatch(data);

				// update source element
				srcEl.css({ "background-color": data.value });
				// clean up
				// Self.srcEl = false;
				// Self.menu.remove();
				Self.dispatch({ type: "clear-menu" });
				break;
			// custom events
			case "set-initial-value":
				// initial value
				value = ColorLib.rgbToHex(event.el.find(".value").css("background-color"));
				Self.menu.find(`.swatch[style="background: ${value};"]`).addClass("selected")
				break;
		}
	},
	doRing(event) {
		let APP = decoshop,
			Self = UI,
			Drag = Self.drag;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				let el = $(event.target),
					dEl = el.parents(".dialog-box"),
					dlg = {
						dEl,
						func: Dialogs[dEl.data("dlg")].dispatch,
						type: el.data("change"),
					},
					iEl = el.nextAll("input:first"),
					deg = parseInt(el.css("--angle"), 10),
					min = -180,
					max = 180,
					clickY = event.clientY - deg;
				//drag info
				Self.drag = { el, iEl, clickY, min, max, dlg };
				// handle adjacent knobs
				let knob = iEl.parent().nextAll(".knob, .pan-knob");
				if (knob.length) {
					Self.drag.knob = knob;
					Self.drag.isPan = knob.hasClass("pan-knob") ? 50 : 0;
				}
				// pre-knob twist event
				dlg.func({ ...dlg, type: `before:${dlg.type}`, value: +el.data("value") });
				// prevent mouse from triggering mouseover
				APP.els.content.addClass("no-dlg-cursor");
				// bind event handlers
				Self.doc.on("mousemove mouseup", Self.doRing);
				break;
			case "mousemove":
				let angle = Math.min(Math.max(event.clientY - Drag.clickY, Drag.min), Drag.max);
				Drag.el.css({ "--angle": `${angle}deg` });
				// input element
				Drag.iEl.val(`${angle}°`).trigger("change");
				if (Drag.knob) {
					let v = Math.invLerp(-180, 180, angle) * 100;
					Drag.knob.data({ value: Math.round(v) - Drag.isPan });
				}
				// forward event (only if value has changed since last time)
				if (Drag.newValue != angle) Drag.dlg.func({ ...Drag.dlg, value: angle });
				// save value
				Drag.newValue = angle;
				break;
			case "mouseup":
				// post-knob twist event
				Drag.dlg.func({ ...Drag.dlg, type: `after:${Drag.dlg.type}`, value: Drag.newValue });
				// prevent mouse from triggering mouseover
				APP.els.content.removeClass("no-dlg-cursor");
				// bind event handlers
				Self.doc.off("mousemove mouseup", Self.doRing);
				break;
			// custom events
			case "set-initial-value":
				// initial value of ring input
				event.dEl.find(".ring-input").map(elem => {
					let rEl = $(elem),
						iEl = rEl.nextAll("input:first"),
						deg = parseInt(iEl.val(), 10);
					rEl.css({ "--angle": `${deg}deg` });
				});
				break;
		}
	},
	doSelectbox(event) {
		let APP = decoshop,
			Self = UI,
			data,
			value,
			el;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				el = $(event.target);
				if (!el.hasClass("option")) el = el.parents(".option");

				let isMultiSelect = el.parents(`[data-select="multi"]`).length;
				if (isMultiSelect) {
					el.toggleClass("selected", el.hasClass("selected"));
					data = {
						type: Self.srcEl.data("change"),
						el: Self.srcEl,
						values: el.parent().find(".selected").map(el => el.getAttribute("data-value")),
					};
					return APP.dispatch(data);
				} else {
					// selected option - UI update
					el.parent().find(".selected").removeClass("selected");
					el.addClass("selected");
				}

				data = {
					type: Self.srcEl.data("change") || el.data("click"),
					el: Self.srcEl,
					old: Self.srcEl.find(".value").html(),
					text: el.html(),
					value: el.data("value"),
				};
				if (data.old === data.value || !data.value) {
					// clean up
					Self.srcEl.removeClass("opened");
					// Self.srcEl = false;
					// Self.menu.remove();
					Self.dispatch({ type: "clear-menu" });
					return;
				}
				// make sure correct option is "checked"
				let xMenu = window.bluePrint.selectNodes(`//i[@type="option"][@click="${data.type}"]`);
				if (xMenu.length > 1) {
					xMenu.map(x => {
						if (x.getAttribute("arg") === data.value) x.setAttribute("is-checked", "1");
						else x.removeAttribute("is-checked");
					});
				}

				if (Self.srcEl.parents(".box-head").length) {
					// proxy to panel event handler
					Panels[Self.srcEl.parent().data("content")].dispatch(data);
				} else if (data.type) {
					// dispatch event to be forwarded
					APP.dispatch(data);
				}

				// update source element
				Self.srcEl.find(".value").html(data.text);
				// clean up
				Self.srcEl.removeClass("opened");
				// Self.srcEl = false;
				// Self.menu.remove();
				Self.dispatch({ type: "clear-menu" });
				break;
			// custom events
			case "set-initial-value":
				// initial value
				value = event.el.find(".value");
				if (!value.length) value = event.el;
				Self.menu.find(".option").map(elem => {
					if (elem.textContent === value.text()) {
						elem.className += " selected";
					}
				});
				break;
		}
	},
	doColorBox(event) {
		let APP = decoshop,
			Self = UI,
			Drag = Self.drag;
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();
				// get elements & align cursor
				let el = $(event.target),
					cursor = el.find(".cursor"),
					cEl = el.parents(".dlg-content");
				// UI / UX
				cursor.addClass("dragging")
					.css({ left: event.offsetX, top: event.offsetY });
				// prepare drag object
				Self.drag = {
					cEl,
					cursor,
					clickX: +cursor.prop("offsetLeft") - event.clientX,
					clickY: +cursor.prop("offsetTop") - event.clientY,
					min: { x: 0, y: 0 },
					max: {
						x: +el.prop("offsetWidth"),
						y: +el.prop("offsetHeight"),
					},
					hue: parseInt(Self.els.iHue.val(), 10),
					alpha: parseInt(Self.els.iAlpha.val(), 10) / 100,
				};
				// trigger mousemove
				Self.doColorBox({ type: "mousemove", clientY: event.clientY, clientX: event.clientX });
				// prevent mouse from triggering mouseover
				APP.els.content.addClass("no-dlg-cursor");
				// bind event handlers
				Self.doc.on("mousemove mouseup", Self.doColorBox);
				break;
			case "mousemove":
				let left = Math.min(Math.max(event.clientX + Drag.clickX, Drag.min.x), Drag.max.x),
					top = Math.min(Math.max(event.clientY + Drag.clickY, Drag.min.y), Drag.max.y);
				Drag.cursor.css({ top, left });

				// calculate color from pos
				let hsvValue = 1 - ((top / Drag.max.y * 100) / 100),
					hsvSaturation = (left / Drag.max.x * 100) / 100;
				Drag.lgh = (hsvValue / 2) * (2 - hsvSaturation);
				Drag.sat = (hsvValue * hsvSaturation) / (1.0001 - Math.abs(2 * Drag.lgh - 1));

				let hsl = { h: Drag.hue, s: Drag.sat, l: Drag.lgh, a: Drag.alpha };
				Drag.hex = ColorLib.hslToHex(hsl);
				Drag.rgb = ColorLib.hexToRgb(Drag.hex);

				// update color
				Drag.cEl.css({ "--color": Drag.hex });
				// saturation & lightness
				Self.els.iSaturation.val(Math.round(Drag.sat * 100) +"%");
				Self.els.iLightness.val(Math.round(Drag.lgh * 100) +"%");
				// rgb values
				Self.els.iRed.val(Drag.rgb.r);
				Self.els.iGreen.val(Drag.rgb.g);
				Self.els.iBlue.val(Drag.rgb.b);
				// hex value
				Self.els.iHex.val(Drag.hex.slice(1,7));
				break;
			case "mouseup":
				// UI / UX
				Drag.cursor.cssSequence("dropped", "animationend", el => el.removeClass("dropped dragging"));
				// remove class
				APP.els.content.removeClass("no-dlg-cursor");
				// unbind event handlers
				Self.doc.off("mousemove mouseup", Self.doColorBox);
				break;
			// custom events
			case "position-cursor":
				// position cursor
				let clr = event.value || "#ff0000",
					iHsv = ColorLib.hexToHsv(clr),
					iWidth = +event.dEl.find(".color-box").prop("offsetWidth"),
					iLeft = iWidth * iHsv.s,
					iTop = iWidth * (1-iHsv.v);
				event.dEl.find(".color-box .cursor").css({ top: iTop, left: iLeft });
				break;
		}
	},
	doHueBar(event) {
		let APP = decoshop,
			Self = UI,
			Drag = Self.drag;
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();
				// get elements & align cursor
				let el = $(event.target),
					cursor = el.find(".cursor").css({ top: event.offsetY }),
					cEl = el.parents(".dlg-content");
				// prepare drag object
				Self.drag = {
					cEl,
					cursor,
					clickY: +cursor.prop("offsetTop") - event.clientY,
					min: { y: 0 },
					max: { y: +el.prop("offsetHeight") },
					alpha: parseInt(Self.els.iAlpha.val(), 10) / 100,
					sat: parseInt(Self.els.iSaturation.val(), 10) / 100,
					lgh: parseInt(Self.els.iLightness.val(), 10) / 100,
				};
				// trigger mousemove
				Self.doHueBar({ type: "mousemove", clientY: event.clientY });
				// prevent mouse from triggering mouseover
				APP.els.content.addClass("no-dlg-cursor");
				// bind event handlers
				Self.doc.on("mousemove mouseup", Self.doHueBar);
				break;
			case "mousemove":
				let top = Math.min(Math.max(event.clientY + Drag.clickY, Drag.min.y), Drag.max.y),
					hue = Math.round((1-(top / Drag.max.y)) * 360);
				if (hue >= 360) hue = 0;
				// move cursor
				Drag.cursor.css({ top });
				// color box color
				Drag.hue = ColorLib.hslToHex({ h: hue, s: 1, l: .5, a: 1 });
				// real swatch color
				let hsl = { h: hue, s: Drag.sat, l: Drag.lgh, a: Drag.alpha };
				Drag.hex = ColorLib.hslToHex(hsl);
				Drag.rgb = ColorLib.hexToRgb(Drag.hex);
				// update color-box color
				Drag.cEl.css({ "--hue": Drag.hue, "--color": Drag.hex });
				// hue value
				Self.els.iHue.val(hue +"°");
				// saturation & lightness
				Self.els.iSaturation.val(Math.round(Drag.sat * 100) +"%");
				Self.els.iLightness.val(Math.round(Drag.lgh * 100) +"%");
				// rgb values
				Self.els.iRed.val(Drag.rgb.r);
				Self.els.iGreen.val(Drag.rgb.g);
				Self.els.iBlue.val(Drag.rgb.b);
				// hex value
				Self.els.iHex.val(Drag.hex.slice(1,7));
				break;
			case "mouseup":
				// remove class
				APP.els.content.removeClass("no-dlg-cursor");
				// unbind event handlers
				Self.doc.off("mousemove mouseup", Self.doHueBar);
				break;
			// custom events
			case "position-cursor":
				// position cursor
				let clr = event.value || "#ff0000",
					iHsl = ColorLib.hexToHsl(clr),
					iRgb = ColorLib.hexToRgb(clr),
					hueHex = ColorLib.hslToHex({ h: iHsl.h, s: 1, l: .5, a: 1 }),
					iHeight = +event.dEl.find(".hue-bar").prop("offsetHeight"),
					iTop = (1-(iHsl.h / 360)) * iHeight;
				// dialog content variables
				event.dEl.find(".dlg-content").css({
					"--color": clr,
					"--old-color": clr,
					"--alpha": 1,
					"--old-alpha": 1,
					"--hue": hueHex,
				});
				// hue bar cursor
				event.dEl.find(".hue-bar .cursor").css({ top: iTop });

				// hsl values
				Self.els.iHue.val(iHsl.h +"°");
				Self.els.iSaturation.val(Math.round(iHsl.s * 100) +"%");
				Self.els.iLightness.val(Math.round(iHsl.l * 100) +"%");
				// rgb values
				Self.els.iRed.val(iRgb.r);
				Self.els.iGreen.val(iRgb.g);
				Self.els.iBlue.val(iRgb.b);
				// hex value
				Self.els.iHex.val(clr.slice(1,7));
				break;
		}
	},
	doDialogKnob(event) {
		let Self = UI,
			Drag = Self.drag;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();
				// prepare drag event object
				let el = $(event.target).addClass("hover"),
					pEl = el.parent().addClass("hover"),
					dEl = pEl.parents(".dialog-box"),
					dlg = {
						dEl,
						func: Dialogs[dEl.data("dlg")].dispatch,
						type: el.data("change"),
					},
					src = pEl.find(".value input"),
					isPanKnob = el.hasClass("pan-knob");
				// might be panel element
				if (!dlg.dEl.length) {
					dlg.dEl = el.parents("[data-for]");
					dlg.func = Adjustments[dlg.dEl.data("for")]
				}
				// finally test for panel
				if (!dlg.dEl.length) {
					dlg.dEl = el.parents("[data-box]");
					dlg.func = Panels[dlg.dEl.data("box")]
				}
				// references needed for drag'n drop
				Self.drag = {
					el,
					src,
					dlg,
					isPanKnob,
					suffix: src.data("suffix") || "",
					min: isPanKnob ? -100 : 0,
					max: isPanKnob ? 100 : 100,
					value: parseInt(el.data("value"), 10),
					clientY: event.clientY,
				};

				let ringEl = src.parent().find(".ring-input");
				if (ringEl.length) {
					Self.drag.ringEl = ringEl;
				}

				if (src.data("scale")) {
					let spectrum = Misc.generateSpectrum(JSON.parse(src.data("scale"))),
						sLen = spectrum.length-1;
					// drag object
					Self.drag.val = { spectrum, sLen };
				} else {
					Self.drag.val = {
						min: isPanKnob ? 0 : +src.data("min"),
						max: +src.data("max") - +src.data("min"),
						step: +src.data("step") || 1,
					};
				}

				// pre-knob twist event
				dlg.func({ ...dlg, type: `before:${dlg.type}`, value: +el.data("value") });
				// bind event handlers
				Self.content.addClass("no-dlg-cursor");
				Self.doc.on("mousemove mouseup", Self.doDialogKnob);
				break;
			case "mousemove":
				let value = (Drag.clientY - event.clientY) + (Drag.isPanKnob ? Drag.value * 2 : Drag.value);
				value = Math.min(Math.max(value, Drag.min), Drag.max);
				if (Drag.isPanKnob) value = value >> 1;
				Drag.el.data({ value });

				let perc = value / 100,
					val, i;
				if (Drag.val.spectrum) {
					i = Math.round(Math.lerp(0, Drag.val.sLen, perc));
					val = Drag.val.spectrum[i];
				} else {
					i = Drag.val.step.toString().split(".")[1];
					val = +((Drag.val.max * perc) + Drag.val.min).toFixed(i ? i.length : 0);
				}
				Drag.src.val(val + Drag.suffix);
				if (Drag.ringEl) Drag.ringEl.css({ "--angle": `${val}deg` });
				// forward event (only if value has changed since last time)
				if (Drag.newValue != val) Drag.dlg.func({ ...Drag.dlg, value: val });
				// save value
				Drag.newValue = val;
				break;
			case "mouseup":
				// post-knob twist event
				Drag.dlg.func({ ...Drag.dlg, type: `after:${Drag.dlg.type}`, value: Drag.newValue });
				// reset parent element
				Drag.el.parent().removeClass("hover");
				Drag.el.removeClass("hover");
				// unbind event handlers
				Self.content.removeClass("no-dlg-cursor");
				Self.doc.off("mousemove mouseup", Self.doDialogKnob);
				break;
			// custom events
			case "set-initial-value":
				// initial value of knob
				event.dEl.find(".field-row.has-knob").map(rEl => {
					let row = $(rEl),
						iEl = row.find("input");
					if (iEl.data("scale")) {
						let spectrum = Misc.generateSpectrum(JSON.parse(iEl.data("scale"))),
							index = spectrum.indexOf(parseInt(iEl.val(), 10)),
							value = Math.round((index / spectrum.length) * 100);
						row.find(".knob").data({ value });
					} else {
						let min = +iEl.data("min"),
							max = +iEl.data("max"),
							val = parseInt(iEl.val(), 10),
							kEl = row.find(".knob");
						if (kEl.length) {
							kEl.data({ value: Math.round((val-min) / (max-min) * 100) });
						} else {
							kEl = row.find(".pan-knob");
							kEl.data({ value: Math.round((Math.invLerp(min, max, val) - .5) * 100) });
						}
					}
				});
				break;
		}
	},
	doContours(event) {
		let APP = decoshop,
			Self = UI,
			el;
		console.log(1222, event);
	},
	doPatterns(event) {
		let APP = decoshop,
			Self = UI,
			el;
		console.log(1333, event);
	},
	doKnob(event) {
		let APP = decoshop,
			Self = UI,
			Drag = Self.drag,
			value;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();
				
				let el = $(event.target),
					pEl = Self.srcEl.parents(`[data-section]`);
				value = parseInt(el.data("value"), 10);

				Self.drag = {
					el,
					value,
					type: Self.srcEl.data("change"),
					func: APP[pEl.data("section")].dispatch,
					src: Self.srcEl.find(".value"),
					suffix: Self.srcEl.data("suffix") || "",
					clientY: event.clientY,
					clientX: event.clientX,
				};

				if (Self.srcEl.data("scale")) {
					// drag object
					Self.drag.spectrum = Misc.generateSpectrum(JSON.parse(Self.srcEl.data("scale")));
					Self.drag.sLen = Self.drag.spectrum.length-1;
				} else {
					Self.drag.min = +Self.srcEl.data("min");
					Self.drag.max = +Self.srcEl.data("max");
				}

				// bind event handlers
				Self.content.addClass("no-cursor");
				Self.doc.on("mousemove mouseup", Self.doKnob);
				break;
			case "mousemove":
				value = (Drag.clientY - event.clientY) + Drag.value;
				value = Math.min(Math.max(value, 0), 100);
				Drag.el.data({ value });

				if (Drag.spectrum) {
					let index = Math.round(Math.lerp(0, Drag.sLen, value / 100));
					Drag.newValue = Drag.spectrum[index];
				} else {
					Drag.newValue = Drag.min + Math.round((value / 100) * (Drag.max - Drag.min));
				}
				Drag.src.html(Drag.newValue + Drag.suffix);

				let data = {
						type: Drag.type,
						el: Self.srcEl,
						old: Drag.value,
						value: Drag.newValue,
					};
				if (data.old !== data.value) Drag.func(data);
				break;
			case "mouseup":
				// data = {
				// 	type: Self.srcEl.data("change"),
				// 	el: Self.srcEl,
				// 	old: Drag.value,
				// 	value: Drag.newValue,
				// };
				// if (data.old === data.value) return;
				// dispatch event to be forwarded
				// if (data.type) APP.dispatch(data);

				// unbind event handlers
				Self.content.removeClass("no-cursor");
				Self.doc.off("mousemove mouseup", Self.doKnob);
				// clean up
				// Self.srcEl = false;
				// Self.menu.remove();
				break;
			// custom events
			case "set-initial-value":
				if (event.el.data("scale")) {
					let spectrum = Misc.generateSpectrum(JSON.parse(event.el.data("scale"))),
						index = spectrum.indexOf(parseInt(event.el.find(".value").text(), 10));
					value = Math.round((index / spectrum.length) * 100);
				} else {
					// initial value of knob
					let min = +event.el.data("min"),
						max = +event.el.data("max"),
						val = parseInt(event.el.find(".value").text(), 10);
					value = Math.round(Math.invLerp(min, max, val) * 100);
				}
				Self.menu.find(".knob").data({ value });
				break;
		}
	}
};
