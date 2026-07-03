
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

			// file doc properties
			case "toggle-layer-visibility":
				// return console.log(event);
				this.layers[event.id].Oj(event.value);
				this.doc.U();
				this.doc.bV = true;
				PP.update(true);
				break;
			case "toggle-fx-master-visibility":
				this.layers[event.id].add
					.lmfx.masterFXSwitch.v = event.value;
				this.layers[event.id].hD.q6 = true;
				this.doc.U();
				this.doc.i_ = true;
				PP.update(true);
				break;
			case "toggle-fx-visibility":
				// this.layers[event.id].add
				// 	.lmfx[LayerStyleConstants.effectMultiKeys[event.typeIndex]]
				// 	.v[event.instanceIndex].v.enab.v = event.value;
				// this.layers[event.id].hD.q6 = true;
				// this.doc.U();
				// this.doc.i_ = true;
				// PP.update(true);

				var action = new Action(ActionTypes.E.v, true);
				action.G = CanvasTools.yS;
				action.data = { a: LayerRecord.M0, j: event.layerIndex };
				PP.dispatch(action);

				console.log( this.doc );
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

	walkLayers(layerTreeNode, depth=0, x) {
		let Settings = decoshop.Settings.pp.panels.layers,
			layer = layerTreeNode.j,
			xNode = x || $.nodeFromString(`<Layers/>`),
			walkChildren = xParent => {
				for (let child of layerTreeNode.children) {
					this.walkLayers(child, depth+1, xParent);
				}
			};
		if (layerTreeNode.depth !== 0) {
			let name = layer.getName(),
				buffer = layer.buffer,
				rect = layer.rect,
				id = layer.add.lyid,
				hasCanvases = !this.layers[id],
				size = Panels.layers.thumbSize,
				{ width, height } = Misc.fitWithin(rect.m, rect.n, size, size),
				w = Math.max(width, 8),
				h = Math.max(height, 8),
				{ fxEnabled, fxExpanded, xFxList } = this.getLayerFxList(layer),
				ppTypes = {
					"0": "layer-pixels", // Layer pixels (rect + buffer)
					"1": "raster-mask",  // Raster mask (c3())
					"2": "vector-mask",  // Vector mask (layer.add.vmsk)
					"3": "smart-filter", // Smart-filter mask (vZ(doc).z)
				},
				ppType = ppTypes[layer.ht],
				isHidden = !layer.zD() ? 1 : 0,
				isFolder = layer.IQ(),
				type = "image",
				isFillWithVectorMask = layer.VF() && layer.add.vmsk,
				xStr;

			// save index of layer
			layer.index = this.doc.B.indexOf(layer);

			if (id == 4) console.log(layer);

			if (hasCanvases && layer.at == null) {
				layer.at = Misc.createCanvas({ width, height });
				layer.yY = Misc.createCanvas({ width, height });
				layer.bX = Misc.createCanvas({ width, height });
				layer.Fp = Misc.createCanvas({ width, height });
				this.layers[id] = layer;

				let maxThumbPx = Settings.thumbSize * window.devicePixelRatio,
					contentBounds = Settings.thumbBoundsMode == 0 ? rect : this.doc.Ch,
					contentThumbSize = Misc.scaleRectTo(contentBounds, maxThumbPx),
					tW = contentThumbSize.x,
					tH = contentThumbSize.y,
					maskThumbSize = Misc.scaleRectTo(this.doc, maxThumbPx);

				// Enforce minimum thumb dimensions; fill/text/folder rows get a fixed square size.
				if (layer.VF() && layer.add.vmsk == null || layer.add.TySh) {
					tW =
					tH = Math.max(tH, 32);
				// } else if (isFolder) {
				// 	tW = tH = 16
				} else {
					tW = Math.max(tW, 6);
					tH = Math.max(tH, 6)
				}
				switch (true) {
					case isFillWithVectorMask:
						if (hasCanvases && layer.add.vstk) PixelUtil.e2.ho(layer.at.ctx, tW, tH, contentBounds, layer.buffer, rect, !1, null, !layer.add.vstk.fillEnabled.v && !layer.add.vstk.strokeEnabled.v);
						if (hasCanvases) PixelUtil.e2.alc(layer.at.ctx, tW, tH)
						break;
					case layer.add.TySh != null:
						// if (hasCanvases) PixelUtil.e2.ayR(layer.at.ctx, tW, tH, layer.add.TySh);
						type = "text";
						break;
					case layer.add.SoCo:
						if (hasCanvases) PixelUtil.e2.auB(layer.at.ctx, tW, tH, layer.add.SoCo);
						break;
					case layer.add.GdFl:
						if (hasCanvases) PixelUtil.e2.aps(layer.at.ctx, tW, tH, layer.add.GdFl);
						break;
					case layer.add.PtFl:
						if (hasCanvases) PixelUtil.e2.apY(layer.at.ctx, tW, tH, layer.add.PtFl, l);
						break;
					case LayerEffectsHelper.detectAdjustmentKey(layer.add) != null:
						if (hasCanvases) PixelUtil.e2.aa7(layer.at.ctx, tW, tH, layer.add);
						break;
					case layer.add.SoLd:
						if (hasCanvases) PixelUtil.e2.ho(layer.at.ctx, tW, tH, contentBounds, layer.buffer, rect, !1);
						if (hasCanvases) PixelUtil.e2.alT(layer.at.ctx, tW, tH, layer.add.SoLd);
						break;
					case isFolder:
						type = "folder";
						break;
					default:
						if (hasCanvases) {
							if (layer.Eo()) {
								PixelUtil.e2.ho(layer.at.ctx, tW, tH, contentBounds, layer.buffer, rect, !1);
							} else {
								PixelUtil.e2.abf(layer.at.ctx, tW, tH) // locked / no pixel data → placeholder
							}
						}
				}
				var rasterMask = layer.c3();
				// Draw auxiliary thumbnails for masks (always scaled to document bounds).
				if (hasCanvases) {
					if (rasterMask) PixelUtil.e2.L6(layer.yY.ctx, maskThumbSize.x, maskThumbSize.y, d, rasterMask);
					if (layer.aW() && layer.vZ(l) && layer.vZ(l).z) {
						var filterMask = layer.vZ(l).z;
						PixelUtil.e2.L6(layer.Fp.ctx, maskThumbSize.x, maskThumbSize.y, d, filterMask)
					}
					if (!isFillWithVectorMask && layer.add.vmsk) {
						PixelUtil.e2.L6(layer.bX.ctx, maskThumbSize.x, maskThumbSize.y, d, layer.add.vmsk.c3(), !0)
					}
				}
				w = tW;
				h = tH;
			}
			switch (type) {
				case "image":
					xStr = `<i id="${id}" type="${type}" name="${name}" w="${w}" h="${h}" hidden="${isHidden}" fx-enabled="${fxEnabled}" fx-expanded="${fxExpanded}">${xFxList.join("")}</i>`;
					break;
				case "text":
					xStr = `<i id="${id}" type="${type}" name="${name}" hidden="${isHidden}" fx-enabled="${fxEnabled}" fx-expanded="${fxExpanded}">${xFxList.join("")}</i>`;
					break;
				case "smart": break;
				case "vector": break;
				case "folder":
					let expanded = layer.add.lsct === LayerSectionType.open ? 1 : 0;
					xStr = `<i id="${id}" type="group" name="${name}" expanded="${expanded}" hidden="${isHidden}">${xFxList.join("")}</i>`;
					break;
			}
			let xLayer = $.nodeFromString(xStr);
			xNode.insertBefore(xLayer, xNode.firstChild);

			if (layerTreeNode.children) walkChildren(xLayer);
		} else {
			if (layerTreeNode.children) walkChildren(xNode);
		}
		return xNode;
	}

	getLayerFxList(layer) {
		let lmfx = layer.add.lmfx;
		let fxEnabled = lmfx?.masterFXSwitch.v ? 1 : 0;
		let fxExpanded = layer.bn() ? 1 : 0;
		let xFxList = [];
		if (!lmfx) return { fxEnabled, fxExpanded, xFxList };
		LayerStyleConstants.ensureEffectMultiLists(lmfx);
		for (let i = 0; i < LayerStyleConstants.effectOrder.length; i++) {
			let typeId = LayerStyleConstants.effectOrder[i];           // e.g. "DrSh"
			let multiKey = LayerStyleConstants.effectMultiKeys[i];     // e.g. "dropShadowMulti"
			let instances = lmfx[multiKey].v;
			for (let j = 0; j < instances.length; j++) {
				let fx = instances[j].v;   // descriptor for this effect instance
				let nI = LayerStyleConstants.effectOrder.indexOf(fx.classID);
				let name = languageManager.get(LayerStyleConstants.effectDisplayNames[nI]);
				let enabled = !fx.enab.v ? 1 : 0;
				// list.push({
				// 	typeIndex: i,
				// 	instanceIndex: j,
				// 	typeId: typeId,                          // fx.classID
				// 	enabled: fxEnabled && fx.enab.v,
				// 	opacity: fx.Opct ? fx.Opct.v.val : null, // not all types have Opct
				// 	blendMode: fx.Md ? fx.Md.v.BlnM : null,
				// 	descriptor: fx
				// });
				xFxList.push(`<fx name="${name}" typeId="${typeId}" multiKey="${multiKey}" typeIndex="${i}" instanceIndex="${j}" hidden="${enabled}"/>`);
			}
		}
		return { fxEnabled, fxExpanded, xFxList };
	}
}
