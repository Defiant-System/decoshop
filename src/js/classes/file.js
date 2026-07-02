
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
			this.doc.U();
			this.doc.Po();

			if (Test.debug) {
				let { width: w, height: h } = Misc.fitWithin(this.doc.m, this.doc.n, 32, 32),
					xmlStr = Test.xLayers.replace(/\{\{w\}\}/g, w).replace(/\{\{h\}\}/g, h);
				this.xLayers = $.nodeFromString(xmlStr);
			} else {
				this.xLayers = this.walkLayers(this.doc.root, 0);
				// console.log(this.xLayers);
			}
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
		let xNode = x || $.nodeFromString(`<Layers/>`),
			walkChildren = xParent => {
				for (let child of node.children) {
					this.walkLayers(child, depth+1, xParent);
				}
			};

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
					"0": "layer-pixels", // Layer pixels (rect + buffer)
					"1": "raster-mask",  // Raster mask (c3())
					"2": "vector-mask",  // Vector mask (add.vmsk)
					"3": "smart-filter", // Smart-filter mask (vZ(doc).z)
				},
				type = isFolder ? "folder" : types[node.j.ht],
				xStr;
			switch (type) {
				case "layer-pixels":
					xStr = `<i type="${type}" name="${name}" w="${Math.max(w, 8)}" h="${Math.max(h, 8)}"/>`;
					break;
				case "raster-mask": break;
				case "vector-mask": break;
				case "smart-filter": break;
				case "folder":
					// LayerSectionType.none: 0,
					// LayerSectionType.open: 1,
					// LayerSectionType.closed: 2,
					// LayerSectionType.divider: 3
					let expanded = add.lsct === LayerSectionType.open ? 1 : 0;
					xStr = `<i type="group" name="${name}" expanded="${expanded}"/>`;
					break;
			}
			let xLayer = $.nodeFromString(xStr);
			xNode.insertBefore(xLayer, xNode.firstChild);

			if (node.children) walkChildren(xLayer);
		} else {
			if (node.children) walkChildren(xNode);
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
