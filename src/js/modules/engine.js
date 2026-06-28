
const Engine = {
	init() {
		// listen to events from engine
		PP.addEventListener(ActionTypes.E.hbi, this.fromEngine);
	},
	fromEngine(event) {
		let APP = decoshop,
			Self = Engine,
			type = event.data.type,
			rect,
			el;
		// console.log(event);
		switch (type) {
			// APP init
			case "app-init":
				break;
			case "init-view-state":
				rect = APP.els.content.find(".cvs-helpers").offset();
				event.data.viewState.setAvailable(rect.left, rect.top, rect.width, rect.height);
				break;
			// open file -> canvas added to DOM
			case "file-canvas-added":
				APP.els.cvs = event.data.el;
				Self.doc = PP.fk();

				Self.dispatch({ type: "center-fit-doc" });
				// update panels
				APP.sidebar.dispatch({ type: "refresh-panels", doc: Self.doc });
				break;
			
			default:
				// console.log(1111, event);
		}
	},
	dispatch(event) {
		let APP = decoshop,
			Self = Engine,
			type = event.type,
			value,
			rect,
			el;
		switch (type) {
			// karaqu events
			case "window.resize":
				PP.resize(event.width, event.height);
				break;
			case "toggle-guides":
				// pp.fB.Wi
			case "toggle-grid":
			case "toggle-pixel-grid":
			case "toggle-rulers":
				value = !PP.fB.bI;
				// engine update
				PP.fB.bI = value;
				PP.update(true);
				// ui update
				APP.els.content.toggleClass("show-rulers", !value);
				// // update view state / "available rect"
				// Engine.dispatch({ type: "update-view-state" });
				break;
			case "update-view-state":
				rect = APP.els.content.find(".cvs-helpers").offset();
				Self.doc.u.setAvailable(rect.left, rect.top, rect.width, rect.height);
				PP.update(!PP.fB.bI);
				break;
			case "center-fit-doc":
				// avr is in device px; at 100% the image occupies doc.m x doc.n device px.
				let doc = Self.doc,
					u = doc.u,
					avr = u.aR();

				if (PP.fB.bI) {
					let rulerW = 17,
						margin = 3;
					avr.x += rulerW + margin;
					avr.m -= rulerW + (margin * 2);
				}

				let fit = Math.min(avr.m / doc.m, avr.n / doc.n);
				u.N = u.ma = Math.min(1, fit); // scale down to fit, never enlarge past 100%
				// Center the document in the available rect: measure where the doc center lands
				// with no pan, then shift the pan so it lands at the rect center.
				u.R.T6(0, 0);
				let c = u.dN(doc.m / 2, doc.n / 2);
				u.R.T6(
					Math.round(avr.x + avr.m / 2 - c.x),
					Math.round(avr.y + avr.n / 2 - c.y)
				);
				u.q8.T6(u.R.x, u.R.y);
				doc.bV = true;
				PP.update(true);
				break;
		}
	},
};
