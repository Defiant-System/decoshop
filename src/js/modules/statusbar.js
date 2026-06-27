
// decoshop.statusbar

{
	init() {
		// fast references
		this.els = {
			statusBar: window.find(".status-bar"),
		};
		// file stack
		this._stack = [];
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.statusbar,
			Detail = event.detail,
			file,
			el;
		// console.log( event );
		switch (event.type) {
			case "load-sample":
				event.names.map(async name => {
					// forward event to app
					let file = await Self.openLocal(`/cdn/img/2d-samples/${name}`);
					Self.dispatch({ type: "prepare-file", isSample: true, file });
				});
				break;
			case "set-zoom":
				// console.log(event.value);
				CanvasTools.gU.p8(Engine.doc.u, new Point2D(590, 495), false, event.value / 100);
				PP.update();
				break;
			case "open-file":
				// TODO
				// console.log(event);
				return;
				file = new File(event.file);
				// add to stack
				Self._stack.push(file);
				// add statusbar tab
				window.render({
					data: file.xNode,
					match: "//*[@name]",
					template: "statusbar-tab",
					prepend: Self.els.statusBar,
				}).then(() => {
					// add option to menubar
					window.menuBar.add({
						"parent": "//MenuBar/Menu[@name='Window']",
						"check-group": "selected-file",
						"is-checked": 1,
						"click": "select-file",
						"arg": file.id,
						"name": file.base,
					});
					//
					Self.dispatch({ type: "select-file", id: file.id });
				});
				break;
			case "select-file":
				el = event.el || Self.els.statusBar.find(`.file[data-arg="${event.id}"]`);
				Self.els.statusBar.find(".active").removeClass("active");
				el.addClass("active");

				// update option in menubar
				window.menuBar.update(`//MenuBar//Menu[@arg="${el.data("arg")}"]`, {"is-checked": "1"});

				// active file events
				if (Self._activeFile) Self._activeFile.dispatch({ type: "file.blur" });
				Self._activeFile = Self._stack.find(f => f.id === el.data("arg"));
				Self._activeFile.dispatch({ type: "file.focus" });
				break;
			case "close-file":
				break;
			case "get-unique-id":
				let ids = Self._stack.map(f => f._id);
				return Math.max.apply({}, [0, ...ids]) + 1;
			case "new-from-clipboard":
				break;

			case "prepare-file":
				if (!event.isSample) {
					// add file to "recent" list
					Self.blankView.dispatch({ ...event, type: "add-recent-file" });
				}
				// set up workspace
				Self.dispatch({ ...event, type: "setup-workspace" });
				break;
			case "setup-workspace":
				// show blank view
				APP.els.content.removeClass("show-blank-view");
				// reset window title handle
				window.el.removeClass("showing-blank-view");
				// open file + prepare workspace
				Self.dispatch({ ...event, type: "open-file" });
				break;
			case "show-blank-view":
				if (APP.els.content.hasClass("show-blank-view")) return;
				// stretches window title handle
				window.el.addClass("showing-blank-view");

				APP.blankView.dispatch({ type: "anim-show-view" });
				break;
		}
	},
	openLocal(url) {
		let parts = url.slice(url.lastIndexOf("/") + 1),
			[ name, kind ] = parts.split("."),
			file = new karaqu.File({ name, kind });
		// return promise
		return new Promise((resolve, reject) => {
			// fetch image and transform it to a "fake" file
			fetch(url)
				.then(resp => resp.blob())
				.then(blob => {
					// here the image is a blob
					file.blob = blob;
					file.size = blob.size;
					resolve(file);
				})
				.catch(err => reject(err));
		});
	}
}

