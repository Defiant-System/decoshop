
const Engine = {
	init() {
		// listen to events from engine
		PP.addEventListener(ActionTypes.E.hbi, this.fromEngine);
	},
	fromEngine(event) {
		let APP = decoshop,
			Self = Engine,
			type = event.data.type,
			el;
		switch (type) {
			// APP init
			case "app-init":
				// Open PSD file (same flow as File > Open from URL)
				let action = new Action(ActionTypes.E.L, true);
				action.data = {
					a: ActionTypes.$.ub,
					Oo: { url: "/cdn/img/2d-samples/casey-lee.jpg" }
					// Oo: { url: "/cdn/img/2d-samples/robert-collins.jpg" }
					// Oo: { url: "/cdn/img/2d-samples/matthew-brodeur.jpg" }
					// Oo: { url: "/cdn/img/2d-samples/girl.psd" }
					// Oo: { url: "~/img/combo.webp" }
					// Oo: { url: "~/img/font-sheet.png" }
				};
				PP.dispatch(action);
				break;

			// open file (URL / path)
			case ActionTypes.$.ub:
				// hbi - setting canvas center origo
				// let doc = PP.fk(),
				// 	panX = -100 - doc.u.Vm.m / 2,
				// 	panY = -230 - doc.u.Vm.n / 2;
				// doc.u.R.T6(panX, panY);
				// doc.bV = true;
				// PP.update();

				// 	console.log(doc.u.R);
				// 	// hbi - read from history
				// 	console.log( 2222, languageManager.get(doc.history[0].name) );

				// 	// let history = doc.history;
				// 	// let currentIndex = doc.historyIndex;
				// 	// let currentState = doc.history[doc.historyIndex];
				// }, 100);
				break;

			// open file -> canvas added to DOM
			case "file-canvas-added":
				APP.els.cvs = event.data.el;
				// update panels
				Self.doc = PP.fk();
				APP.statusbar.dispatch({ type: "open-file", doc: Self.doc });
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
		}
	},
};
