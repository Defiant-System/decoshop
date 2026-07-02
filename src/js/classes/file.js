
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
		
	}

	walkLayers(layerTreeNode, depth=0, x) {
		let layer = layerTreeNode.j,
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
				size = Panels.layers.thumbSize,
				{ width, height } = Misc.fitWithin(rect.m, rect.n, size, size),
				w = Math.max(width, 8),
				h = Math.max(height, 8),
				{ masterFx, xFxList } = this.getLayerFxList(layer),
				types = {
					"0": "layer-pixels", // Layer pixels (rect + buffer)
					"1": "raster-mask",  // Raster mask (c3())
					"2": "vector-mask",  // Vector mask (layer.add.vmsk)
					"3": "smart-filter", // Smart-filter mask (vZ(doc).z)
				},
				isHidden = !layer.zD() ? 1 : 0,
				isFolder = layer.IQ(),
				type = isFolder ? "folder" : types[layer.ht],
				isFillWithVectorMask = layer.VF() && layer.add.vmsk,
				xStr;
			if (!this.layers[id]) {
				layer.at = Misc.createCanvas({ width, height });
				layer.yY = Misc.createCanvas({ width, height });
				layer.bX = Misc.createCanvas({ width, height });
				layer.Fp = Misc.createCanvas({ width, height });

				let G = true,
					thumbBoundsMode = 1, // 0 = scale by layer rect, 1 = scale by document rect
					contentBounds = thumbBoundsMode == 0 ? layer.rect : this.doc,
					maxThumbPx = 32 * window.devicePixelRatio,
					contentThumbSize = Misc.scaleRectTo(contentBounds, maxThumbPx),
					thumbW = contentThumbSize.x,
					thumbH = contentThumbSize.y,
					maskThumbSize = Misc.scaleRectTo(this.doc, maxThumbPx);
				switch (true) {
					case isFillWithVectorMask:
						if (G && layer.add.vstk) PixelUtil.e2.ho(layer.at.ctx, thumbW, thumbH, contentBounds, layer.buffer, layer.rect, !1, null, !layer.add.vstk.fillEnabled.v && !layer.add.vstk.strokeEnabled.v);
						if (G) PixelUtil.e2.alc(layer.at.ctx, thumbW, thumbH)
						break;
					case layer.add.TySh:
						if (G) PixelUtil.e2.ayR(layer.at.ctx, thumbH, thumbH, layer.add.TySh);
						break;
					case layer.add.SoCo:
						if (G) PixelUtil.e2.auB(layer.at.ctx, thumbH, thumbH, layer.add.SoCo);
						break;
					case layer.add.GdFl:
						if (G) PixelUtil.e2.aps(layer.at.ctx, thumbH, thumbH, layer.add.GdFl);
						break;
					case layer.add.PtFl:
						if (G) PixelUtil.e2.apY(layer.at.ctx, thumbH, thumbH, layer.add.PtFl, l);
						break;
					case LayerEffectsHelper.detectAdjustmentKey(layer.add) != null:
						if (G) PixelUtil.e2.aa7(layer.at.ctx, thumbH, thumbH, layer.add);
						break;
					case layer.add.SoLd:
						if (G) PixelUtil.e2.ho(layer.at.ctx, thumbW, thumbH, contentBounds, layer.buffer, layer.rect, !1);
						if (G) PixelUtil.e2.alT(layer.at.ctx, thumbW, thumbH, layer.add.SoLd);
						break;
					case layer.IQ(): break;
					default:
						if (G) {
							if (layer.Eo()) PixelUtil.e2.ho(layer.at.ctx, thumbW, thumbH, contentBounds, layer.buffer, layer.rect, !1);
							else PixelUtil.e2.abf(layer.at.ctx, thumbH, thumbH) // locked / no pixel data → placeholder
						}
				}
				var rasterMask = layer.c3();
				// Draw auxiliary thumbnails for masks (always scaled to document bounds).
				if (G) {
					if (rasterMask) PixelUtil.e2.L6(layer.yY.ctx, maskThumbSize.x, maskThumbSize.y, d, rasterMask);
					if (layer.aW() && layer.vZ(l) && layer.vZ(l).z) {
						var filterMask = layer.vZ(l).z;
						PixelUtil.e2.L6(layer.Fp.ctx, maskThumbSize.x, maskThumbSize.y, d, filterMask)
					}
					if (!isFillWithVectorMask && layer.add.vmsk) {
						PixelUtil.e2.L6(layer.bX.ctx, maskThumbSize.x, maskThumbSize.y, d, layer.add.vmsk.c3(), !0)
					}
				}
			}
			switch (type) {
				case "layer-pixels":
					xStr = `<i id="${id}" type="${type}" name="${name}" w="${w}" h="${h}" hidden="${isHidden}">${xFxList.join("")}</i>`;
					break;
				case "raster-mask": break;
				case "vector-mask": break;
				case "smart-filter": break;
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
