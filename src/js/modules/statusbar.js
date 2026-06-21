
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
			Detail = event.detail;
		// console.log( event );
		switch (event.type) {
			case "open-file":
				console.log(event);
				break;
			case "select-file":
				break;
			case "close-file":
				break;
			case "get-unique-id":
				let ids = Self._stack.map(f => f._id);
				return Math.max.apply({}, [0, ...ids]) + 1;
			case "new-from-clipboard":
				break;
			
			case "setup-workspace":
				// show blank view
				APP.els.content.removeClass("show-blank-view");
				// reset window title handle
				window.el.removeClass("showing-blank-view");
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

