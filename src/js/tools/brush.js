
// decoshop.tools.brush

{
	init() {
		// default option
		this.option = "brush";
		// default feather options
		this.feather = {
			brush: "sketchy",
			blend: "source-over",
			pressure: 100,
			size: 1,
		};

		let xShape = window.bluePrint.selectSingleNode("//TipShapes/*");

		// default preset
		this.preset = {
			name      : xShape.getAttribute("name"),
			roundness : +xShape.getAttribute("roundness"),
			angle     : +xShape.getAttribute("angle"),
			size      : +xShape.getAttribute("size"),
			tip       : Misc.createCanvas(1, 1),
			blend     : "normal",
			opacity   : 1,
		};

		// subscribe to events
		window.on("set-fg-color", this.dispatch);
		window.on("set-bg-color", this.dispatch);
	},
	dispatch(event) {
		let APP = decoshop,
			// File = Proj.file,
			Self = APP.tools.brush,
			name,
			size,
			tip,
			image,
			width,
			height,
			roundness,
			angle,
			el;
		// console.log(event);
		switch (event.type) {
			// native events
			case "mousedown":
				Self[`${Self.option}Tool`](event);
				break;

			// subscribed events
			case "set-fg-color":
				// update file fg
				File.fgColor = event.detail.hex;
				// update content level variable
				APP.els.content.css({ "--fg-color": File.fgColor });
				// resize / rotate tip
				// Self.dispatch({ type: "resize-rotate-tip" });
				break;
			case "set-bg-color":
				// update file bg
				File.bgColor = event.detail.hex;
				// update content level variable
				APP.els.content.css({ "--bg-color": File.bgColor });
				break;

			// custom events
			case "select-color":
				name = event.el.hasClass("fg-color") ? "fg-color" : "bg-color";
				// open dialog
				UI.doDialog({
					type: "dlg-open",
					name: event.el.data("arg"),
					value: APP.els.content.cssProp(`--${name}`),
					// broadcast event
					callback: ev => window.emit(`set-${name}`, { hex: ev.value }),
				});
				break;
			case "switch-color":
				let c1 = APP.els.content.cssProp("--fg-color"),
					c2 = APP.els.content.cssProp("--bg-color");
				// broadcast event
				window.emit("set-fg-color", { hex: c2 });
				window.emit("set-bg-color", { hex: c1 });
				break;
			case "reset-color":
				// broadcast event
				window.emit("set-fg-color", { hex: "#ffffff" });
				window.emit("set-bg-color", { hex: "#000000" });
				break;
			case "select-preset-tip":
				el = APP.els.content.find(".option[data-change='select-preset-tip']");
				// get brush tip details
				name      = event.arg       ||  el.data("name")      || Self.preset.name;
				size      = event.size      || +el.data("size")      || Self.preset.size;
				roundness = event.roundness || +el.data("roundness") || Self.preset.roundness;
				angle     = event.angle     || +el.data("angle")     || Self.preset.angle;

				// prepare to load image into tip-canvas
				Self.preset.tipImage = new Image(size, size);
				Self.preset.name = name;
				Self.preset.tipImage.onload = () => {
					// resize / rotate tip
					Self.dispatch({ type: "resize-rotate-tip" });
					// callback if any
					if (event.callback) event.callback();
				};
				
				// load tip image
				Self.preset.tipImage.src = "~/icons/brush-preset-"+ Self.preset.name +".png";
				// update toolbar
				el.find(".tip-icon").css({"background-image": `url(${Self.preset.tipImage.src})`});
				el.find(".value span").html(size + el.data("suffix"));
				// update toolbar option
				el.data({ name, size, roundness, angle });
				break;
			case "resize-rotate-tip":
				// resize tip canvas
				size = Self.preset.size;
				angle = event.angle || Self.preset.angle;
				roundness = event.roundness || Self.preset.roundness;
				height = Math.round(size * (roundness / 100));

				let y = (size - height) >> 1,
					hS = size >> 1;
				Self.preset.tip.cvs.prop({ width: size, height: size });
				Self.preset.tip.ctx.translate(hS, hS);
				Self.preset.tip.ctx.rotate(angle * Math.PI / 180);
				Self.preset.tip.ctx.translate(-hS, -hS);
				Self.preset.tip.ctx.drawImage(Self.preset.tipImage, 0, y, size, height);
				Self.preset.tip.ctx.globalCompositeOperation = "source-atop"; // difference
				Self.preset.tip.ctx.fillStyle = APP.els.content.cssProp("--fg-color") || "#fff";
				Self.preset.tip.ctx.fillRect(0, 0, size, size);
				break;
			case "change-blend-mode":
				Self.preset.blend = event.value.toLowerCase().replace(/ /g, "-");
				break;
			case "change-size":
				// set tip size
				Self.preset.size = event.value;
				// update tip canvas
				Self.dispatch({ type: "resize-rotate-tip" });
				// update toolbar
				el = APP.els.content.find(".option[data-change='select-preset-tip']");
				el.find(".value span").html(event.value + el.data("suffix"));
				break;
			case "change-opacity":
				Self.preset.opacity = event.value / 100;
				break;
			case "change-hardness":
			case "change-flow":
				// console.log(event);
				break;
			// FEATHER
			case "change-feather-mode":
				Self.feather.brush = event.value.toLowerCase();
				break;
			case "change-feather-blend-mode":
				Self.feather.blend = event.value;
				break;
			case "change-feather-size":
				Self.feather.size = event.value;
				break;
			case "change-feather-pressure":
				Self.feather.pressure = event.value;
				break;

			case "select-option":
				Self.option = event.arg || Self.option || "brush";
				break;
			case "enable":
				// auto load preset tip
				Self.dispatch({ type: "select-preset-tip", ...this.preset });

				// Proj.cvs.on("mousedown", Self.dispatch);
				break;
			case "disable":
				// Proj.cvs.off("mousedown", Self.dispatch);
				break;
		}
	},
	pencilTool(event) {
		return console.log("pencil", event);
	},
	brushTool(event) {
		let APP = decoshop,
			image;

		switch (event.type) {
			// native events
			case "mousedown":
				break;
		}
	}
}
