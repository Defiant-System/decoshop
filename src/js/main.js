
@import "registry/index.js"

@import "classes/file.js"

@import "modules/ui.js"
@import "modules/panels.js"
@import "modules/adjustments.js"
@import "modules/dialogs.js"
@import "modules/engine.js"

@import "./modules/test.js"



let {
	PP,
	Action,
	ActionTypes,
	CanvasTools,
	PixelUtil,
	Point2D,
	Rect,
	exportHelper,
	languageManager,
	Misc,
} = await window.fetch("~/js/bundle.js");


const DefaultSettings = {
	pp: {
		as: 1,
		bcolor: 0,
		co: 0,
		eparams: { guides: false, grid: false, sels: true, paths: true, pgrid: true },
		extras: true,
		fcolor: 15452170,
		font: "DejaVuSans",
		lang: "en",
		rulers: true,
	},
	guides: {
		show: true,
		color: "#3583d0",
		sensitivity: 10,
	},
	grid: {
		show: false,
		type: "square", // isometric
		gap: 10,
		pixelGrid: false,
	},
	quickMask: {
		paint: "selected", // masked
		color: "#ff000070",
	}
};


const decoshop = {
	init() {
		// get settings or use default settings
		this.Settings = window.settings.getItem("settings") || DefaultSettings;
		// fast references
		this.els = {
			doc: $(document),
			content: window.find("content"),
			cvsWrapper: window.find(".cvs-wrapper"),
			toolsBar: window.find(".tools-bar"),
			blankView: window.find(".blank-view"),
			handleBox: window.find(".handle-box"),
		};
		// init sub objects
		Object.keys(this).filter(i => this[i]?.init).map(i => this[i].init());
		PP.init({ app: this, window });
		Engine.init();
		UI.init();
		Panels.init();
		Adjustments.init();
		Dialogs.init();

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	// short cut to active file
	get file() {
		return this.statusbar._activeFile;
	},
	dispatch(event) {
		let Self = decoshop,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.init":
				Self.dispatch({ type: "show-blank-view" });
				break;
			case "window.blur": break;
			case "window.focus": break;
			case "window.resize":
				// proxy event
				Engine.dispatch(event);
				break;
			case "window.keydown":
				Self.tools.move.dispatch({ type: "select-option", arg: "hand" });
				Self.tools.move.dispatch({ type: "enable" });
				break;
			case "window.keyup":
				Self.tools.move.dispatch({ type: "select-option", arg: "move" });
				Self.tools.move.dispatch({ type: "diable" });
				// reset canvas cursor
				break;
			case "open-file":
				// show FS dialog
				window.dialog.open({
					jpg: item => Self.dispatch(item),
					jpeg: item => Self.dispatch(item),
					png: item => Self.dispatch(item),
				});
				break;
			// custom events
			case "open-help":
				karaqu.shell("fs -u '~/help/toc.md'");
				break;
			case "open-dialog":
				UI.doDialog({ type: "dlg-open", name: event.arg });
				break;

			case "file-ready":
				Self.tools.zoom.dispatch({ type: "center-actual" });
				Self.sidebar.dispatch({ ...event, type: "refresh-panels" });
				break;

			// proxy events
			case "toggle-guides":
			case "toggle-rulers":
			case "toggle-grid":
			case "toggle-pixel-grid":
				return Engine.dispatch(event);
			case "toggle-statusbar":
				return Self.statusbar.dispatch(event);

			// ...otherwise
			default:
				el = event.el;
				if (el) {
					let rEl = el.parents("?[data-section]"),
						section = rEl.data("section");
					if (section) {
						return Self[section].dispatch(event);
					}
					rEl = el.parents(".inline-menubox");
					if (rEl.length) {
						return UI.dispatch(event);
					}
					rEl = el.parents(".dialog-box");
					if (rEl.length) {
						let name = rEl.data("dlg");
						return Dialogs[name]
							? Dialogs[name](event)
							: UI.doDialog({ ...event, type: `${event.type}-common` });;
					}
				} else {
					return Self.tools.dispatch(event);
				}
		}
	},
	blankView: @import "modules/blank-view.js",
	statusbar: @import "modules/statusbar.js",
	sidebar: @import "modules/sidebar.js",
	tools: @import "tools/index.js",
};

window.exports = decoshop;
