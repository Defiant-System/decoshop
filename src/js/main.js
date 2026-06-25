
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
	languageManager,
	Misc,
} = await window.fetch("~/js/bundle.js");


const DefaultSettings = {
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
			content: window.find("content"),
			cvsWrapper: window.find(".cvs-wrapper"),
			toolsBar: window.find(".tools-bar"),
			blankView: window.find(".blank-view"),
			handleBox: window.find(".handle-box"),
		};
		// init sub objects
		PP.init({ app: this, window });
		Engine.init();
		UI.init();
		Panels.init();
		Adjustments.init();
		Dialogs.init();
		Object.keys(this).filter(i => this[i].init).map(i => this[i].init());

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	dispatch(event) {
		let Self = decoshop,
			Tools = Self.tools,
			callback,
			name,
			args,
			layer,
			pixels,
			filtered,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.init":
				Self.dispatch({ type: "show-blank-view" });
				break;
			case "window.blur": break;
			case "window.focus": break;
			case "window.resize": break;
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
