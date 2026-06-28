
// decoshop.tools.zoom

{
	init() {
		this.option = "zoom-plus";
		this.spectrum = Misc.generateSpectrum([12.5, 25, 50, 75, [100, 600, 100], 800, 1200, 1600, 3200, 6400]);
		this.value = 100;
		this.size = {
			ruler: 17,
			margin: 5,
		}
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.zoom,
			doc,
			avr,
			el;
		// console.log(event);
		switch (event.type) {
			// native events
			case "click":
				let index = Self.spectrum.indexOf(Self.value) + (Self.option === "zoom-plus" ? 1 : -1);
				Self.value = Self.spectrum[index];
				// CanvasTools.gU.p8(Engine.doc.u, new Point2D(event.offsetX, event.offsetY), false, Self.value / 100);
				// PP.update();

				let animateZoom = (target, ms) => {
					let u = Engine.doc.u,
						c = new Point2D(event.offsetX, event.offsetY),
						k = ms || 120,
						N0 = u.N,
						x0 = u.R.x,
						y0 = u.R.y;

					// Resolve final zoom + pan once (about c), then rewind to the start.
					CanvasTools.gU.p8(u, c, false, target);
					
					let N1 = u.N,
						x1 = u.R.x,
						y1 = u.R.y;
					u.N = u.ma = N0;
					u.R.T6(x0, y0);
					u.q8.T6(x0, y0);

					let e = 0,
						last = window.performance.now();
					requestAnimationFrame(function step(now) {
						e = Math.min(1, e + (now - last) / k);
						last = now;
						let t = 1 - Math.pow(1 - e, 3),             // easeOutCubic
							n = N0 * Math.pow(N1 / N0, t);           // geometric zoom interp
						u.N = u.ma = n;
						u.R.x = u.q8.x = x0 + (x1 - x0) * t;
						u.R.y = u.q8.y = y0 + (y1 - y0) * t;
						Engine.doc.bV = true;                               // claim anim; N==ma so update() won't re-ease
						PP.update();
						if (e < 1) requestAnimationFrame(step);
					});
				};

				animateZoom(Self.value / 100);

				// Zoom via the Zoom Tool action (sets N/R; ma/q8 lag → built-in smooth animation).
				// let t = new Action(ActionTypes.E.v, true);
				// t.G = CanvasTools.t7;
				// t.data = { a: "zoom", N: Self.value / 100 };
				// PP.dispatch(t);

				// update panel + status bar
				Panels.navigator.dispatch({ type: "update-zoom-value", value: Self.value });
				APP.statusbar.dispatch({ type: "update-zoom-value", value: Self.value });
				break;

			// custom events
			case "select-option":
				Self.option = event.arg || "zoom-plus";
				// set canvas cursor
				APP.els.content.removeClass("cursor-zoom-plus cursor-zoom-minus").addClass(`cursor-${Self.option}`);
				break;
			case "enable":
				// set canvas cursor
				APP.els.content.addClass(`cursor-${Self.option}`);
				// bind event handler
				APP.els.cvsWrapper.on("click", Self.dispatch);
				break;
			case "disable":
				// reset canvas cursor
				APP.els.content.removeClass("cursor-zoom-plus cursor-zoom-minus");
				// bind event handler
				APP.els.cvsWrapper.off("click", Self.dispatch);
				break;

			case "center-fit":
				Self.dispatch({ type: "center-actual", fit: 1 });
				break;
			case "center-actual":
				// avr is in device px; at 100% the image occupies doc.m x doc.n device px.
				doc = Engine.doc;
				avr = doc.u.aR();

				if (PP.fB.bI) {
					avr.y += Self.size.ruler;
					avr.x += Self.size.ruler;
					avr.m -= Self.size.ruler;
					avr.n -= Self.size.ruler;
				}
				if (event.fit) {
					avr.y += Self.size.margin;
					avr.x += Self.size.margin;
					avr.m -= (Self.size.margin * 2);
					avr.n -= (Self.size.margin * 2);
				}

				let fit = Math.min(avr.m / doc.m, avr.n / doc.n);
				fit = event.fit ? fit : Math.min(1, fit);
				doc.u.N =
				doc.u.ma = fit; // scale down to fit, never enlarge past 100%
				// Center the document in the available rect: measure where the doc center lands
				// with no pan, then shift the pan so it lands at the rect center.
				doc.u.R.T6(0, 0);
				let center = doc.u.dN(doc.m / 2, doc.n / 2);
				doc.u.R.T6(
					Math.round(avr.x + avr.m / 2 - center.x),
					Math.round(avr.y + avr.n / 2 - center.y)
				);
				doc.u.q8.T6(doc.u.R.x, doc.u.R.y);
				doc.bV = true;
				PP.update(true);
				break;
		}
	}
}
