
class File {
	constructor(fsFile, opt={}) {
		// save reference to original FS file
		this._file = fsFile;
		this.id = fsFile.id;
		this.xNode = $.nodeFromString(`<i id="${this.id}" name="${this.base}" />`);
	}

	get base() {
		return this._file.base;
	}

	dispatch(event) {
		let APP = decoshop,
			Self = this,
			el;
		//console.log(event);
		switch (event.type) {
			// system event
			case "file.focus":
				break;
			case "file.blur":
				break;
		}
	}
}
