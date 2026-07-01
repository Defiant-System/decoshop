
class File {
	constructor(fsFile, opt={}) {
		// save reference to original FS file
		this._file = fsFile;
		this.id = fsFile.id;
		this.xNode = $.nodeFromString(`<i id="${this.id}" name="${this.base}" />`);

		fsFile.blob.arrayBuffer().then(buffer => {
			// last param "null" - optional completion callback
			exportHelper.openFile({ name: this.base || "image.png" }, buffer, PP.DE, null);

			this.doc = PP.fk();
			this.buildMipChain();

			this.xLayers = this.walkLayers(this.doc.root, 0);
			// console.log( xml );

			// update panels
			decoshop.dispatch({ type: "file-ready", file: this });
		});
	}

	get base() {
		return this._file.base;
	}

	buildMipChain() {
		// Seed the pyramid with the full-resolution composite and its bounds.
		let mipmap = [this.doc.LT(), new Rect(0, 0, this.doc.m, this.doc.n)];
		// Append progressively half-sized RGBA levels (mipmaps).
		PixelUtil.pyramidDownsampleRgba(mipmap);
		// store the chain
		this.mipmap = mipmap;
	}

	walkLayers(node, depth=0, x) {
		let xNode = x || $.nodeFromString(`<Layers/>`);

		if (depth === 0) {
			this.doc.U();
			this.doc.Po();
		}
		if (node.depth !== 0) {
			let name = node.j.getName(),
				blend = node.j.blendModeKey,
				buffer = node.j.buffer,
				opacity = node.j.opacity,
				add = node.j.add,
				isVisible = node.j.zD(),
				isFolder = node.j.IQ(),
				rect = node.j.rect,
				size = Panels.layers.thumbSize,
				{ width: w, height: h } = Misc.fitWithin(rect.m, rect.n, size, size),
				types = {
					"0": "image",
					"1": "mask",
					"3": "vector",
				},
				type = types[node.j.ht],
				xLayer = $.nodeFromString(`<i type="${type}" name="${name}" w="${w-4}" h="${h-4}"/>`);
			xNode.appendChild(xLayer);
		}

		if (node.children) {
			for (let child of node.children) {
				this.walkLayers(child, depth+1, xNode);
			}
		}

		return xNode;
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
