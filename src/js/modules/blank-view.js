
// decoshop.blankView

{
	init() {
		// fast references
		this.els = {
			el: window.find(".blank-view"),
			content: window.find(".blank-view .blank-content"),
		};

		// get settings, if any
		let xList = $.xmlFromString(`<Recents/>`);
		let xSamples = window.bluePrint.selectSingleNode(`//Samples`);
		this.xRecent = window.settings.getItem("recents") || xList.documentElement;

		// parses base64 items in "data.xml"
		// this.dispatch({ type: "parse-base64" });

		Promise.all(this.xRecent.selectNodes("./*").map(async xItem => {
				let filepath = xItem.getAttribute("filepath"),
					check = await karaqu.shell(`fs -f '${filepath}'`);
				if (!check.result) {
					xItem.parentNode.removeChild(xItem)
				}
			}))
			.then(async () => {
				let target = this.els.content;

				// add recent files in to data-section
				xSamples.parentNode.append(this.xRecent);
				// render blank view
				await window.render({
					template: "blank-view",
					match: `//Data`,
					target,
				});
				// more fast references
				this.els.btnOpen = target.find(`.btn[data-click="open-filesystem"]`);
				this.els.btnClipboard = target.find(`.btn[data-click="new-from-clipboard"]`);
				this.els.btnClose = target.find(`.btn[data-click="close-view"]`);
				// reset content view "animations"
				setTimeout(() => decoshop.els.content.removeClass("no-anim"), 1000);
			});
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.blankView,
			file,
			el;
		// console.log(event);
		switch (event.type) {
			case "open-filesystem":
				APP.dispatch({ type: "open-file" });
				break;
			case "check-clipboard":
				// Self.els.btnClipboard.removeClass("disabled_");

				// navigator.clipboard.read().then(async clipboardItems => {
				// 	clipboardItems.map(clipboardItem => {
				// 		clipboardItem.types.map(async type => {
				// 			if (type.startsWith("image")) {
				// 				Self.els.btnClipboard.removeClass("disabled_");
				// 			} else {
				// 				Self.els.btnClipboard.addClass("disabled_");
				// 			}
				// 		});
				// 	});
				// });
				break;
			case "new-from-clipboard":
				navigator.clipboard.read().then(async clipboardItems => {
					clipboardItems.map(clipboardItem => {
						clipboardItem.types.map(async type => {
							if (type.startsWith("image")) {
								let blob = await clipboardItem.getType(type),
									file = new karaqu.File({ kind: "png" }),
									img = new Image;
								// here the image is a blob
								file.blob = blob;
								file.size = blob.size;
								// load blob inte temporary image to find out width/height
								img.onload = () => {
									APP.dispatch({
										type: "setup-workspace",
										width: img.width,
										height: img.height,
										file,
									});
								};
								img.src = URL.createObjectURL(blob);
							}
						});
					});
				});
				break;
			case "close-view":
				if (window.el.hasClass("showing-blank-view")) {
					Self.dispatch({
						type: "anim-hide-view",
						callback: () => {
							// reset start view
							APP.els.content.removeClass("files-open");
						}
					});
				} else karaqu.shell("win -c");
				break;
			case "select-sample":
				el = $(event.target);
				if (!el.hasClass("sample")) return;
				// animation sequence
				Self.dispatch({
					type: "anim-hide-view",
					callback: () => {
						let name = el.data("url");
						APP.statusbar.dispatch({ type: "load-sample", names: [name.slice(name.lastIndexOf("/")+1)] });
					}
				});
				break;
			case "select-preset":
				el = $(event.target);
				// animation sequence
				Self.dispatch({
					type: "anim-hide-view",
					callback: () => {
						let width = +el.data("width"),
							height = +el.data("height");
						// set up workspace
						APP.statusbar.dispatch({ type: "setup-workspace", width, height });
					}
				});
				break;
			case "select-recent-file":
				el = $(event.target);
				if (!el.hasClass("recent-file")) return;

				karaqu.shell(`fs -o '${el.data("file")}' null`)
					.then(exec => APP.dispatch(exec.result));
				break;
			case "anim-hide-view":
				// transition work view
				APP.els.content.cssSequence("seq-hide-blank-view", "transitionend", sEl => {
					if (sEl[0] === APP.els.content[0]) {
						APP.els.content.removeClass("show-blank-view seq-hide-blank-view");
						if (typeof event.callback === "function") event.callback();
					}
				});
				break;
			case "anim-show-view":
				// transition blank view
				APP.els.content.cssSequence("seq-show-blank-view", "transitionend", sEl => {
					// check clipboard for images
					Self.dispatch({ type: "check-clipboard" });

					if (sEl[0] === APP.els.content[0]) {
						sEl.addClass("show-blank-view")
							.removeClass("seq-show-blank-view prepare-seq-show-blank-view");
						if (typeof event.callback === "function") event.callback();
					}
				});
				break;
			case "add-recent-file":
				if (!event.file.path) return;
				let str = `<i name="${event.file.base}" filepath="${event.file.path}"/>`,
					xFile = $.nodeFromString(str),
					xExist = Self.xRecent.selectSingleNode(`//Recents/*[@filepath="${event.file.path}"]`);
				// remove entry if already exist
				if (xExist) xExist.parentNode.removeChild(xExist);
				// insert new entry at first position
				Self.xRecent.insertBefore(xFile, Self.xRecent.firstChild);
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
		}
	}
}
