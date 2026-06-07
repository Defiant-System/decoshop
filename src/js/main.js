
@import "registry/index.js"

@import "modules/misc.js"
@import "modules/color.js"
@import "modules/ui.js"
@import "modules/tabs.js"
@import "modules/projector.js"
@import "modules/dialogs.js"

@import "./modules/test.js"


let {
	Rect,
	WebGLContext,
	PixelUtil,
	PatternHelper,
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
			toolsBar: window.find(".tools-bar"),
			blankView: window.find(".blank-view"),
			handleBox: window.find(".handle-box"),
		};
		// init sub objects
		UI.init();
		Tabs.init();
		Object.keys(this).filter(i => this[i].init).map(i => this[i].init());
		// parses base64 items in "data.xml"
		this.dispatch({ type: "parse-base64" });

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
			case "parse-base64":
				let xNode = window.bluePrint.selectSingleNode(`//*[@base64]`),
					img = new Image;
				// exit if all is processed
				if (!xNode) return;
				
				// put base64 in image
				img.onload = () => {
					// put image in canvas to create blob
					let { cvs, ctx } = Misc.createCanvas(img.width, img.height);
					ctx.drawImage(img, 0, 0);
					// image to blob
					ctx.canvas.toBlob(async blob => {
						let name = `${xNode.getAttribute("name").sha1()}.png`;
						await window.cache.set({ name, blob });
						xNode.setAttribute("path", name);
						// clean up node
						xNode.removeAttribute("base64");
						// parse next
						Self.dispatch({ type: "parse-base64" });
					});
				};
				// start processing
				img.src = xNode.getAttribute("base64");
				break;
			case "setup-workspace":
				// show blank view
				Self.els.content.removeClass("show-blank-view");
				// reset window title handle
				window.el.removeClass("showing-blank-view");
				// open file + prepare workspace
				// Tabs.open(event.file, event);
				break;
			case "show-blank-view":
				if (Self.els.content.hasClass("show-blank-view")) return;
				// stretches window title handle
				window.el.addClass("showing-blank-view");

				let str = Tabs._stack.length ? "files-open" : "";
				// show blank view
				Self.els.content.addClass(str);

				Self.blankView.dispatch({ type: "anim-show-view" });
				break;

			case "open-dialog":
				UI.doDialog({ type: "dlg-open", name: event.arg });
				break;

			// proxy events
			case "toggle-statusbar":
				return Self.statusbar.dispatch(event);
			case "toggle-quick-mask-mode":
			case "toggle-paint-masked-area":
			case "enter-quick-mask-mode":
			case "exit-quick-mask-mode":
			case "select-tool":
				return Self.tools.dispatch(event);
			// case "box-head-tab":
				// return Self.sidebar.dispatch(event);

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
	sidebar: @import "sidebar/index.js",
	extras: @import "extras/index.js",
	tools: @import "tools/index.js",
};

window.exports = decoshop;
