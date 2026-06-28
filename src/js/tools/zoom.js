
// decoshop.tools.zoom

{
	init() {
		this.option = "zoom-plus";
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
			// custom events
			case "select-option":
				Self.option = event.arg || "zoom-plus";
				// set canvas cursor
				APP.els.content.removeClass("cursor-zoom-plus cursor-zoom-minus").addClass(`cursor-${Self.option}`);
				break;
			case "enable":
				// set canvas cursor
				APP.els.content.addClass(`cursor-${Self.option}`);
				break;
			case "disable":
				// reset canvas cursor
				APP.els.content.removeClass("cursor-zoom-plus cursor-zoom-minus");
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
