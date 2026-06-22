
@import "registry/index.js"

@import "classes/file.js"

@import "modules/misc.js"
@import "modules/color.js"
@import "modules/ui.js"
@import "modules/panels.js"
@import "modules/adjustments.js"
@import "modules/dialogs.js"

@import "./modules/test.js"


// to be part of bundle
@import "bundle/ext/upng.js"

@import "bundle/rect.js"
@import "bundle/point-2d.js"
@import "bundle/event-emitter.js"
@import "bundle/ui-component.js"
@import "bundle/base-app-ui.js"
@import "bundle/export-helper.js"
@import "bundle/style-helper.js"
@import "bundle/font-helper.js"
@import "bundle/format-handler.js"
@import "bundle/keyboard-handler.js"
@import "bundle/clipboard-handler.js"
@import "bundle/link-bar.js"
@import "bundle/command-palette.js"
@import "bundle/dialog-manager.js"
@import "bundle/language-manager.js"
@import "bundle/app-state.js"
@import "bundle/pixel-util.js"
@import "bundle/webgl-context.js";
@import "bundle/pattern-helper.js";
@import "bundle/lab-color-data.js"
@import "bundle/layer-record.js"
@import "bundle/layer-effects-helper.js"
@import "bundle/history-state.js"
@import "bundle/document-view-state.js"
@import "bundle/psd-document.js"
@import "bundle/psd-descriptor-helper.js"
@import "bundle/psd-resource-types.js"
@import "bundle/riff-chunk-parser.js"
@import "bundle/action.js"

@import "bundle/dom-ui-helper.js"

@import "bundle/photopea.js"


// let {
// 	Rect,
// 	WebGLContext,
// 	PixelUtil,
// 	PatternHelper,
// } = await window.fetch("~/js/bundle.js");

const pp = new PhotopeaApp;


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
			toolsBar: window.find(".tools-bar"),
			blankView: window.find(".blank-view"),
			handleBox: window.find(".handle-box"),
		};
		// init sub objects
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
