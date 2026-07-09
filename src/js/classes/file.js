
class File {
	constructor(fsFile, opt={}) {
		// save reference to original FS file
		this._file = fsFile;
		this.id = fsFile.id;
		this.layers = {};
		this.xNode = $.nodeFromString(`<i id="${this.id}" name="${this.base}" />`);
		this.xHistory = $.xmlFromString(`<History/>`).documentElement;

		// to be used here and there
		this.scratch = Misc.createCanvas(1, 1);

		fsFile.blob.arrayBuffer().then(buffer => {
			// last param "null" - optional completion callback
			exportHelper.openFile({ name: this.base || "image.png" }, buffer, PP.DE, null);

			this.doc = PP.fk();
			this.buildMipChain();
			this.doc.U();
			this.doc.Po();

			if (Test.debug) {
				let { width: w, height: h } = Misc.fitWithin(this.doc.m, this.doc.n, 32, 32),
					xLayers = Test.xLayers.replace(/\{\{w\}\}/g, w).replace(/\{\{h\}\}/g, h),
					xChannels = Test.xChannels.replace(/\{\{w\}\}/g, w).replace(/\{\{h\}\}/g, h);
				this.xLayers = $.nodeFromString(xLayers);
				this.xChannels = $.nodeFromString(xChannels);
			} else {
				this.xLayers = this.walkLayers(this.doc.root, 0);
				// console.log(this.xLayers);
				this.xChannels = this.walkChannels();
			}
			// update panels
			decoshop.dispatch({ type: "file-ready", file: this });
		});
	}

	get base() {
		return this._file.base;
	}

	addHistory(xNode) {
		if (this.xHistory.selectSingleNode(`./*[@id="${xNode.getAttribute("id")}"]`)) return;
		// this.xHistory.insertBefore(xNode, this.xHistory.firstChild);
		this.xHistory.appendChild(xNode);
	}

	dispatch(event) {
		let APP = decoshop,
			Self = this,
			action,
			el;
		//console.log(event);
		switch (event.type) {
			// system event
			case "file.focus":
				break;
			case "file.blur":
				break;

			case "set-background-color":
			case "set-foreground-color":
				let [r, g, b] = event.rgb,
					color = (r << 16) | (g << 8) | b;
				// hex = PixelUtil.hex6ToInt("ff6600")
				action = new Action(ActionTypes.E.L, true);
				action.data = {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.K5,
					y3: event.type === "set-foreground-color" ? 0 : 1, // 0 = foreground, 1 = background
					Z: color
				};
				PP.dispatch(action);
				break;

			case "add-layer-folder":
				PP.TA({ G: CanvasTools.yS, data: { a: LayerRecord.C2, Xu: "My Folder", wg: 3 } });
				// If multiple layers are selected, the UI uses LayerRecord.mQ instead (groups selected layers into a folder):
				// PP.TA({ G: CanvasTools.yS, data: { a: LayerRecord.mQ } });
				break;
			case "add-layer":
				PP.TA({ G: CanvasTools.yS, data: { a: LayerRecord.vx, Xu: "My Layer" } });

				let Settings = APP.Settings.pp.panels.layers,
					layer = Self.doc.root.children[1].j,
					id = layer.add.lyid,
					rect = layer.rect,
					maxThumbPx = Settings.thumbSize * DPR,
					contentBounds = Settings.thumbBoundsMode == 0 ? rect : Self.doc.Ch,
					contentThumbSize = Misc.scaleRectTo(contentBounds, maxThumbPx),
					tW = contentThumbSize.x,
					tH = contentThumbSize.y,
					xStr = `<i id="${id}" type="image" name="My Layer" w="${tW}" h="${tH}" />`,
					xLayer = $.nodeFromString(xStr);
				Self.xLayers.insertBefore(xLayer, Self.xLayers.firstChild)


				let size = Panels.layers.thumbSize,
					{ width, height } = Misc.fitWithin(rect.m, rect.n, size, size);

				layer.at = Misc.createCanvas(width, height);
				layer.yY = Misc.createCanvas(width, height);
				layer.bX = Misc.createCanvas(width, height);
				layer.Fp = Misc.createCanvas(width, height);
				Self.layers[id] = layer;

				Panels.layers.dispatch({ type: "update", file: this });
				break;
			case "remove-layer":
				PP.TA({ G: CanvasTools.yS, data: { a: LayerRecord.Qe } });
				// delete layer at index 2
				// PP.TA({ G: CanvasTools.yS, data: { a: LayerRecord.Qe, j: 2 } });
				break;

			// file doc properties
			case "toggle-layer-visibility":
				action = new Action(ActionTypes.E.v, true);
				action.G = CanvasTools.yS;
				action.data = { a: LayerRecord.mH, j: this.layers[event.id].index };
				PP.dispatch(action);
				PP.update(true);
				break;
			case "toggle-fx-master-visibility":
				action = new Action(ActionTypes.E.v, true);
				action.G = CanvasTools.yS;
				action.data = { a: LayerRecord.M0, j: this.layers[event.id].index };
				PP.dispatch(action);
				PP.update(true);
				break;
			case "toggle-fx-visibility":
				action = new Action(ActionTypes.E.v, true);
				action.G = CanvasTools.yS;
				action.data = {
					a: LayerRecord.f0,
					j: this.layers[event.id].index,
					index: [event.typeIndex, event.instanceIndex],
				};
				PP.dispatch(action);
				PP.update(true);
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

	getChannelImageData(id) {
		return this.channels[id];
	}

	walkChannels() {
		let xNode = $.nodeFromString(`<Channels/>`),
			docWidth = this.doc.m,
			docHeight = this.doc.n,
			fullDocBounds = new Rect(0, 0, docWidth, docHeight),
			// doc.u.MX = [R visible, G visible, B visible]; mirrored on the panel for click handlers
			channelVisibility = this.Pj = this.doc.u.MX.slice(0),
			visibleRgbCount = channelVisibility[0] + channelVisibility[1] + channelVisibility[2],
			w = Math.round(32 * DPR),
			h = w;
		
		// Keep thumbnail aspect ratio matching the document
		if (docWidth > docHeight) h = Math.round(h * docHeight / docWidth);else
		w = Math.round(w * docWidth / docHeight);

		this.channels = {};

		// --- RGB composite (index 0) + R, G, B channels (indices 1–3) ---
		// Row ids are negative: -1 = RGB, -2 = R, -3 = G, -4 = B
		let rgbLabels = ["RGB"].concat(LayerEffectsHelper.rgbChannels);
		rgbLabels.map((name, index) => {
			let id = -1 - index,
				cThumb = Misc.createCanvas(w, h),
				xChannel = $.nodeFromString(`<i type="channel" id="${id}" name="${name}" w="${w}" h="${h}"/>`);
			xNode.appendChild(xChannel);
			// creaate channel thumbnail
			PixelUtil.e2.ho(cThumb.ctx, w, h, fullDocBounds, this.doc.LT(), fullDocBounds, !1, index == 0 ? null : index - 1);
			this.channels[id] = cThumb;
		});

		return xNode;
	}

	getLayerImageData(id) {
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
				{ width: rW, height: rH } = Misc.fitWithin(this.doc.m, this.doc.n, size, size),
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
				extraAttr = [],
				xStr;

			// save index of layer
			layer.index = this.doc.B.indexOf(layer);

			if (hasCanvases && layer.at == null) {
				layer.at = Misc.createCanvas(width, height);
				layer.yY = Misc.createCanvas(width, height);
				layer.bX = Misc.createCanvas(width, height);
				layer.Fp = Misc.createCanvas(width, height);
				this.layers[id] = layer;

				let maxThumbPx = Settings.thumbSize * DPR,
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
				let isFillWithVectorMask = !!(layer.VF() && layer.add.vmsk);
				switch (true) {
					case isFillWithVectorMask:
						// if (layer.add.lyid === 37) console.log(1);
						if (hasCanvases && layer.add.vstk) PixelUtil.e2.ho(layer.at.ctx, tW, tH, contentBounds, layer.buffer, rect, !1, null, !layer.add.vstk.fillEnabled.v && !layer.add.vstk.strokeEnabled.v);
						// if (hasCanvases) PixelUtil.e2.alc(layer.at.ctx, tW, tH)
						if (hasCanvases) type = "shape";
						break;
					case layer.add.TySh != null:
						// if (hasCanvases) PixelUtil.e2.ayR(layer.at.ctx, tW, tH, layer.add.TySh);
						type = "text";
						break;
					case !!layer.add.SoCo:
						// if (layer.add.lyid === 37) console.log(2);
						if (hasCanvases) {
							tH = 24; tW = 16;
							PixelUtil.e2.auB(layer.at.ctx, tW, tH, layer.add.SoCo);
							extraAttr.push(`target="${this.getLayerKindTarget(layer)}"`);
							type = "adj";
							tW = w; tH = h;
						}
						break;
					case !!layer.add.GdFl:
						// if (layer.add.lyid === 37) console.log(3);
						if (hasCanvases) {
							tH = 24; tW = 16;
							PixelUtil.e2.aps(layer.at.ctx, tW, tH, layer.add.GdFl);
							extraAttr.push(`target="${this.getLayerKindTarget(layer)}"`);
							type = "adj";
							tW = w; tH = h;
						}
						break;
					case !!layer.add.PtFl:
						// if (layer.add.lyid === 37) console.log(4);
						if (hasCanvases) {
							tH = 24; tW = 16;
							PixelUtil.e2.apY(layer.at.ctx, tW, tH, layer.add.PtFl, this.doc);
							extraAttr.push(`target="${this.getLayerKindTarget(layer)}"`);
							type = "adj";
							tW = w; tH = h;
						}
						break;
					case LayerEffectsHelper.detectAdjustmentKey(layer.add) != null:
						// if (layer.add.lyid === 37) console.log(5);
						// if (hasCanvases) PixelUtil.e2.aa7(layer.at.ctx, tW, tH, layer.add);
						extraAttr.push(`target="${this.getLayerKindTarget(layer)}"`);
						type = "adj";
						break;
					case !!layer.add.SoLd:
						// if (layer.add.lyid === 37) console.log(6);
						if (hasCanvases) PixelUtil.e2.ho(layer.at.ctx, tW, tH, contentBounds, layer.buffer, rect, !1);
						// if (hasCanvases) PixelUtil.e2.alT(layer.at.ctx, tW, tH, layer.add.SoLd);
						type = "smart";
						break;
					case !!layer.add.artb:
						type = "artboard";
						break;
					case isFolder:
						type = "folder";
						break;
					default:
						if (hasCanvases) {
							if (layer.Eo()) {
								// if (layer.add.lyid === 37) console.log(7);
								PixelUtil.e2.ho(layer.at.ctx, tW, tH, contentBounds, layer.buffer, rect, !1);
							} else {
								// if (layer.add.lyid === 37) console.log(8);
								PixelUtil.e2.abf(layer.at.ctx, w, h) // locked / no pixel data → placeholder
								// extraAttr.push(`target="${this.getLayerKindTarget(layer)}"`);
								// type = "adj";
								// tW = w;
								// tH = h;
							}
						}
				}
				if (layer.usesClippingMask) extraAttr.push(`clip="1"`);
								
				var rasterMask = layer.c3();
				// Draw auxiliary thumbnails for masks (always scaled to document bounds).
				if (hasCanvases) {
					// if (layer.add.lyid === 37) console.log(9);
					let docBounds = new Rect(0, 0, this.doc.m, this.doc.n);
					if (rasterMask) {
						// use thumbnail dimensions
						tW = maskThumbSize.x;
						tH = maskThumbSize.y;
						// smooth mask thumbnail
						PixelUtil.e2.L6(this.scratch.ctx, tW * 2, tH * 2, docBounds, rasterMask);
						layer.yY.ctx.imageSmoothingEnabled = true;
						layer.yY.ctx.imageSmoothingQuality = "high";
						PixelUtil.e2.OO(layer.yY.ctx, tW, tH);
						layer.yY.ctx.drawImage(this.scratch.cvs[0], 0, 0, tW, tH);
						// OLD: PixelUtil.e2.L6(layer.yY.ctx, tW, tH, docBounds, rasterMask);
						extraAttr.push(`mask="1"`);
					}
					if (layer.aW() && layer.vZ(layerTreeNode) && layer.vZ(layerTreeNode).z) {
						// if (layer.add.lyid === 37) console.log(10);
						var filterMask = layer.vZ(layerTreeNode).z;
						PixelUtil.e2.L6(layer.Fp.ctx, maskThumbSize.x, maskThumbSize.y, docBounds, filterMask);
					}
					if (!isFillWithVectorMask && layer.add.vmsk) {
						// if (layer.add.lyid === 37) console.log(11);
						PixelUtil.e2.L6(layer.bX.ctx, maskThumbSize.x, maskThumbSize.y, docBounds, layer.add.vmsk.c3(), !0);
						// extraAttr.push(`vector="1"`);
					}
				}
				w = tW;
				h = tH;
			}
			// if (id === 39) console.log(extraAttr);
			switch (type) {
				case "image":
				case "shape":
				case "smart":
				case "adj":
					xStr = `<i id="${id}" type="${type}" name="${name}" ${extraAttr.join(" ")} w="${w}" h="${h}" hidden="${isHidden}" fx-enabled="${fxEnabled}" fx-expanded="${fxExpanded}">${xFxList.join("")}</i>`;
					break;
				case "text":
					xStr = `<i id="${id}" type="${type}" name="${name}" ${extraAttr.join(" ")} w="${rW}" h="${rH}" hidden="${isHidden}" fx-enabled="${fxEnabled}" fx-expanded="${fxExpanded}">${xFxList.join("")}</i>`;
					break;
				case "folder":
					let expanded = layer.add.lsct === LayerSectionType.open ? 1 : 0;
					xStr = `<i id="${id}" type="group" name="${name}" ${extraAttr.join(" ")} expanded="${expanded}" hidden="${isHidden}">${xFxList.join("")}</i>`;
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

	getLayerKindTarget(layer) {
		switch (true) {
			case !!layer.add.SoCo: return "dlgFillColor";
			case !!layer.add.GdFl: return "dlgFillGradient";
			case !!layer.add.PtFl: return "dlgFillPattern";
			default:
				let rec = {
						brit: "dlgBrightnessContrast", // brightnessEvent
						levl: "dlgLevels", // levels
						curv: "dlgCurves", // curves
						expA: "dlgExposure", // exposure
						vibA: "dlgVibrance", // vibrance
						hue2: "dlgHueSaturation", // hueSaturation
						blnc: "dlgColorBalance", // colorBalance
						blwh: "dlgBlackWhite", // blackAndWhite
						phfl: "dlgPhotoFilter", // photoFilter
						mixr: "dlgChannelMixer", // channelMixer
						clrL: "dlgColorLookup", // colorLookup
						nvrt: "dlgInvert", // invert
						post: "dlgPosterize", // posterization
						thrs: "dlgThreshold", // thresholdClassEvent
						grdm: "dlgGradientMap", // gradientMapEvent
						selc: "dlgSelectiveColor", // selectiveColor
						rplc: "dlgReplaceColor", // replaceColo
					},
					adjKey = LayerEffectsHelper.detectAdjustmentKey(layer.add);
				return rec[adjKey]
		}
		/*
		*/

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
