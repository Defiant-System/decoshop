
class File {
	constructor(fsFile, opt={}) {
		// save reference to original FS file
		this._file = fsFile;

	}

	render(opt={}) {
		
	}

	dispatch(event) {
		let APP = keane,
			Self = this,
			el;
		//console.log(event);
		switch (event.type) {
			// system event
			case "window.resize":
				break;
			// custom events
			case "resize-file":
				break;
		}
	}
}
