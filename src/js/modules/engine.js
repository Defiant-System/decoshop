
const Engine = {
	init() {
		// listen to events from engine
		PP.addEventListener(ActionTypes.E.hbi, this.fromEngine);
		// keeps track of open files
		this.xMemory = $.xmlFromString(`<Files/>`).documentElement;
	},
	raf(func) {
		if (this.timer) {
			cancelAnimationFrame(this.timer);
			delete this.timer;
		} else {
			this.timer = requestAnimationFrame(() => {
				func();
				delete this.timer;
			});
		}
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
				Self.dispatch({ type: "update-view-state", viewState: event.data.viewState });
				break;
			// open file -> canvas added to DOM
			case "file-canvas-added":
				APP.els.cvs = event.data.el;
				break;
			// proxy event to history panel
			case "history-changed":
				Panels.history.dispatch(event.data);
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
			vs,
			el;
		switch (type) {
			// karaqu events
			case "window.resize":
				PP.resize(event.width, event.height);
				Self.dispatch({ type: "update-view-state" });
				break;
			case "toggle-guides":
				// pp.fB.Wi
			case "toggle-grid":
			case "toggle-pixel-grid":
			case "toggle-rulers":
				value = !PP.fB.bI;
				// engine update
				PP.fB.bI = value;
				// ui update
				APP.els.content.toggleClass("show-rulers", !value);
				Self.dispatch({ type: "update-view-state" });
				break;
			case "update-view-state":
				rect = APP.els.content.find(".cvs-helpers").offset();
				if (PP.fB.bI) {
					rect.top += PixelUtil.y0.mT;
					rect.left += PixelUtil.y0.mT;
					rect.width -= PixelUtil.y0.mT * 2;
					rect.height -= PixelUtil.y0.mT * 2;
				}
				vs = event.viewState || APP.file.doc.u;
				vs.setAvailable(rect.left, rect.top, rect.width, rect.height);
				PP.update(true);
				break;
		}
	},
};
