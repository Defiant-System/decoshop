
class File {
	constructor(fsFile, opt={}) {
		// save reference to original FS file
		this._file = fsFile;
		this.id = fsFile.id;
		this.layers = {};
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
				console.log(this.xLayers);
			}
			// update panels
			decoshop.dispatch({ type: "file-ready", file: this });
		});
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

	buildMipChain() {
		// Seed the pyramid with the full-resolution composite and its bounds.
		let mipmap = [this.doc.LT(), new Rect(0, 0, this.doc.m, this.doc.n)];
		// Append progressively half-sized RGBA levels (mipmaps).
		PixelUtil.pyramidDownsampleRgba(mipmap);
		// store the chain
		this.mipmap = mipmap;
	}

	getlayerImageData(id) {
		return this.layers[id];
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
				buffer = node.j.buffer,
				rect = node.j.rect,
				add = node.j.add,
				id = add.lyid,
				isHidden = !node.j.zD() ? 1 : 0,
				isFolder = node.j.IQ(),
				size = Panels.layers.thumbSize,
				{ width, height } = Misc.fitWithin(rect.m, rect.n, size, size),
				w = Math.max(width, 8),
				h = Math.max(height, 8),
				{ masterFx, xFxList } = this.getLayerFxList(node.j),
				types = {
					"0": "layer-pixels", // Layer pixels (rect + buffer)
					"1": "raster-mask",  // Raster mask (c3())
					"2": "vector-mask",  // Vector mask (add.vmsk)
					"3": "smart-filter", // Smart-filter mask (vZ(doc).z)
				},
				type = isFolder ? "folder" : types[node.j.ht],
				xStr;
			if (buffer && rect) {
				let chain = [buffer, rect.clone()],
					edge = 64,
					count = 0;
				PixelUtil.pyramidDownsampleRgba(chain);

				// Skip the levels that are still larger than the display target.
				while (Math.max(chain[count+1].m, chain[count+1].n) > edge) {
					count += 2;
				}
				let cache = chain.slice(count);
				this.layers[id] = { cache: chain[0], rect: cache[1] };
			}
			switch (type) {
				case "layer-pixels":
					xStr = `<i id="${id}" type="${type}" name="${name}" w="${w}" h="${h}" hidden="${isHidden}">${xFxList.join("")}</i>`;
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
					xStr = `<i id="${id}" type="group" name="${name}" expanded="${expanded}" hidden="${isHidden}">${xFxList.join("")}</i>`;
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

	getLayerFxList(layer) {
		var lmfx = layer.add.lmfx;
		if (!lmfx) return { masterFx: undefined, xFxList: [] };
		LayerStyleConstants.ensureEffectMultiLists(lmfx);
		var masterFx = lmfx.masterFXSwitch.v;
		var xFxList = [];
		for (var i = 0; i < LayerStyleConstants.effectOrder.length; i++) {
			var typeId = LayerStyleConstants.effectOrder[i];           // e.g. "DrSh"
			var multiKey = LayerStyleConstants.effectMultiKeys[i];     // e.g. "dropShadowMulti"
			var instances = lmfx[multiKey].v;
			for (var j = 0; j < instances.length; j++) {
				var fx = instances[j].v;   // descriptor for this effect instance
				var nI = LayerStyleConstants.effectOrder.indexOf(fx.classID);
				var name = languageManager.get(LayerStyleConstants.effectDisplayNames[nI]);
				var enabled = !fx.enab.v ? 1 : 0;
				// list.push({
				// 	typeIndex: i,
				// 	instanceIndex: j,
				// 	typeId: typeId,                          // fx.classID
				// 	enabled: masterFx && fx.enab.v,
				// 	opacity: fx.Opct ? fx.Opct.v.val : null, // not all types have Opct
				// 	blendMode: fx.Md ? fx.Md.v.BlnM : null,
				// 	descriptor: fx
				// });
				xFxList.push(`<fx name="${name}" hidden="${enabled}"/>`);
			}
		}
		return { masterFx, xFxList };
	}
}
