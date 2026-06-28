
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
				break;
			case "update-view-state":
				rect = APP.els.content.find(".cvs-helpers").offset();
				Self.doc.u.setAvailable(rect.left, rect.top, rect.width, rect.height);
				PP.update(!PP.fB.bI);
				break;
		}
	},
};
