
// decoshop.tools.move

{
	init() {
		this.option = "move";
	},
	dispatch(event) {
		let APP = decoshop,
			Self = APP.tools.move,
			el;
		// console.log(event);
		switch (event.type) {
			// custom events
			case "select-option":
				Self.option = event.arg || "move";
				// set canvas cursor
				APP.els.content.removeClass("cursor-hand cursor-move").addClass(`cursor-${Self.option}`);
				break;
			case "enable":
				// set canvas cursor
				APP.els.content.addClass(`cursor-${Self.option}`);
				// bind event handler
				APP.els.cvsWrapper.on("mousedown", Self.doPan);
				break;
			case "disable":
				// reset canvas cursor
				APP.els.content.removeClass("cursor-hand cursor-move");
				// unbind event handler
				APP.els.cvsWrapper.off("mousedown", Self.doPan);
				break;
		}
	},
	doPan(event) {
		let APP = decoshop,
			Self = APP.tools.move,
			Drag = Self.drag;
		switch (event.type) {
			// native events
			case "mousedown":
				// prevent default behaviour
				event.preventDefault();
				// handle with "move" drag'n drop function
				if (Self.option === "move") return Self.doMove(event);

				let doc = PP.fk(),
					func = CanvasTools.Mi.if,
					offset = doc.u.R.clone(),
					click = {
						x: offset.x - (event.clientX * window.devicePixelRatio),
						y: offset.y - (event.clientY * window.devicePixelRatio),
					};
				// drag details
				Self.drag = { PP, func, doc, click };

				// prevent mouse from triggering mouseover
				APP.els.content.addClass("cover");
				// bind event handlers
				APP.els.doc.on("mousemove mouseup", Self.doPan);
				break;
			case "mousemove":
				let x = Drag.click.x + event.clientX,
					y = Drag.click.y + event.clientY;
				Drag.func(Drag.doc, x, y);
				Drag.PP.update();
				break;
			case "mouseup":
				// remove class
				APP.els.content.removeClass("cover");
				// unbind event handlers
				APP.els.doc.off("mousemove mouseup", Self.doPan);
				break;
		}
	},
	doMove(event) {
		let APP = decoshop,
			Self = APP.tools.move,
			Drag = Self.drag;
		switch (event.type) {
			// native events
			case "mousedown":
				let doc = PP.fk(),
					func = CanvasTools.Mi.if,
					offset = doc.u.R.clone(),
					click = {
						x: offset.x - (event.clientX * window.devicePixelRatio),
						y: offset.y - (event.clientY * window.devicePixelRatio),
					};
				// drag details
				Self.drag = { PP, func, doc, click };

				// prevent mouse from triggering mouseover
				APP.els.content.addClass("cover");
				// bind event handlers
				APP.els.doc.on("mousemove mouseup", Self.doMove);
				break;
			case "mousemove":
				let x = Drag.click.x + event.clientX,
					y = Drag.click.y + event.clientY;
				console.log( x, y );
				// Drag.func(Drag.doc, x, y);
				// Drag.PP.update();
				break;
			case "mouseup":
				// remove class
				APP.els.content.removeClass("cover");
				// unbind event handlers
				APP.els.doc.off("mousemove mouseup", Self.doMove);
				break;
		}
	}
}
