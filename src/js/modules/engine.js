
const Engine = {
	init() {
		// listen to events from engine
		PP.addEventListener(ActionTypes.E.hbi, this.fromEngine);
		// keeps track of open files
		this.xMemory = $.xmlFromString(`<Files/>`).documentElement;
	},

	// Roll up E3 = [totalRam, totalGpu] from all children onto parent node.
	sumChildBytes(node) {
		node.E3 = [0, 0];
		for (var i = 0; i < node.LK.length; i++) {
			node.E3[0] += node.LK[i].E3[0];
			node.E3[1] += node.LK[i].E3[1];
		}
	},
	buildDocNode(doc) {
		let gpuAv = WebGLContext.webglAvailable ? 1 : 0,
			ram = doc.m * doc.n * 4,
			xFile = $.nodeFromString(`<i type="file" name="${doc.name}" ram="${ram}" gpu="${ram * gpuAv}" desc="Final Image"/>`);

		var docNode = {
				MS: doc.name,
				LK: [],
				Ts: 0
			},
			gpuOnDoc = WebGLContext.webglAvailable ? 1 : 0,
			ramOnDoc = 1 - gpuOnDoc,
			compositeNode = {
				MS: "Final Image",
				E3: [doc.m * doc.n * 4, gpuOnDoc * doc.m * doc.n * 4],
				Ts: 2
			};
		docNode.LK.push(compositeNode);
		for (var i = 0; i < doc.B.length; i++) {
			var layerNode = this.buildLayerNode(doc.B[i], xFile);
			if (layerNode.LK.length != 0) {
				docNode.LK.push(layerNode);
			}
		}
		var smartObjects = doc.add.lnk2;
		if (smartObjects)
		for (var i = 0; i < smartObjects.length; i++) {
			var so = smartObjects[i],
				soNode = {
					MS: so.bf,
					LK: [],
					Ts: 4
				},
				decodedBytes = 0;
			soNode.LK.push({
				MS: "Raw file",
				E3: [so.raw.length, 0]
			});
			if (so.hF) {
				for (var j = 0; j < so.hF.length; j += 2) {
					decodedBytes += so.hF[j].length;
				}
			}
			if (decodedBytes != 0) {
				soNode.LK.push({
					MS: "Decoded pixels",
					E3: [decodedBytes, 0]
				});
			}
			this.sumChildBytes(soNode);
			docNode.LK.push(soNode);
		}
		this.sumChildBytes(docNode);

		// console.log(docNode);
		console.log(xFile);
		this.xMemory.appendChild(xFile);

		return docNode;
	},
	buildLayerNode(layer, xFile) {
		var layerNode = {
				MS: layer.getName(),
				LK: [],
				Ts: 1
			},
			gpuOnLayer = WebGLContext.webglAvailable ? 1 : 0,
			ramOnLayer = 1 - gpuOnLayer,
			pixelCount = layer.rect.O();

		let xLayer = $.nodeFromString(`<i type="layer" name="${layer.getName()}" ram="0" gpu="0"/>`);
		xFile.insertBefore(xLayer, xFile.firstChild);

		if (pixelCount != 0) {
			// layerNode.LK.push({
			// 	MS: "Layer pixels",
			// 	E3: [pixelCount * 4, gpuOnLayer * pixelCount * 4]
			// });
			xLayer.setAttribute("desc", "Layer pixels");
			xLayer.setAttribute("ram", pixelCount * 4);
			xLayer.setAttribute("gpu", gpuOnLayer * pixelCount * 4);
		}
		if (layer.add.SoLd) {
			xLayer.setAttribute("icon", "icon-smart-object");
		}
		if (layer.add.lmfx && layer.hD.Pr.type) {
			var effectBuffers = layer.hD.Pr.type,
				blendPixelCount = 0;
			for (var effectKey in effectBuffers) {
				var effectBytes = 0;
				for (var inst = 0; inst < effectBuffers[effectKey].length; inst++)
				if (effectKey == "ebbl") {
					if (effectBuffers[effectKey][inst].Ei) effectBytes += effectBuffers[effectKey][inst].Ei.We.O();
					if (effectBuffers[effectKey][inst].p9) effectBytes += effectBuffers[effectKey][inst].p9.We.O();
					if (effectBuffers[effectKey][inst].l2) effectBytes += effectBuffers[effectKey][inst].l2.We.O();
					if (effectBuffers[effectKey][inst].gp) effectBytes += effectBuffers[effectKey][inst].gp.We.O();
				} else effectBytes += effectBuffers[effectKey][inst].We.O();
				if (effectBytes != 0) {
					// layerNode.LK.push({
					// 	MS: languageManager.get(LayerStyleConstants.effectDisplayNames[LayerStyleConstants.effectOrder.indexOf(effectKey)]),
					// 	E3: [ramOnLayer * effectBytes * 4, gpuOnLayer * effectBytes * 4],
					// 	Ts: 3
					// });

					let name = languageManager.get(LayerStyleConstants.effectDisplayNames[LayerStyleConstants.effectOrder.indexOf(effectKey)]),
						ram = ramOnLayer * effectBytes * 4,
						xChild = $.nodeFromString(`<i type="data" icon="icon-layer-fx" name="${name}" ram="${ram}" gpu="${ram * gpuOnLayer}"/>`);
					xLayer.insertBefore(xChild, xLayer.firstChild);
				}
			}
			if (layer.hD.VK) blendPixelCount += pixelCount;
			if (layer.hD.GA) blendPixelCount += pixelCount;
			if (layer.hD.Vn) blendPixelCount += pixelCount;
			if (layer.hD.Vn) blendPixelCount += pixelCount;
			if (layer.hD.me) blendPixelCount += pixelCount;
			if (layer.hD.dO) blendPixelCount += pixelCount;
			var extraBytes = layer.hD.tw ? layer.hD.tw.length : 0;
			if (blendPixelCount + extraBytes != 0) {
				// layerNode.LK.push({
				// 	MS: "Additional Blending Data",
				// 	E3: [ramOnLayer * blendPixelCount * 4 + extraBytes, gpuOnLayer * blendPixelCount * 4]
				// });

				let name = "Additional Blending Data",
					ram = ramOnLayer * blendPixelCount * 4 + extraBytes,
					xChild = $.nodeFromString(`<i type="data" name="${name}" ram="${ram}" gpu="${gpuOnLayer * blendPixelCount * 4}"/>`);
				xLayer.insertBefore(xChild, xLayer.firstChild);
			}
		}
		var rasterMask = layer.c3(),
			rasterMaskBytes = rasterMask ? rasterMask.rect.O() : 0;
		if (rasterMaskBytes != 0) {
			// layerNode.LK.push({
			// 	MS: "Raster Mask",
			// 	E3: [rasterMaskBytes, 0]
			// });

			let name = "Raster Mask",
				ram = rasterMaskBytes,
				xChild = $.nodeFromString(`<i type="data" icon="icon-layer-mask" name="${name}" ram="${ram}" gpu="${0}"/>`);
			xLayer.insertBefore(xChild, xLayer.firstChild);
		}
		var vectorMask = layer.add.vmsk,
			vectorMaskBytes = vectorMask && vectorMask.UG ? vectorMask.UG.rect.O() : 0;
		if (vectorMaskBytes != 0) {
			// layerNode.LK.push({
			// 	MS: "Vector Mask",
			// 	E3: [vectorMaskBytes, 0]
			// });

			let name = "Vector Mask",
				ram = vectorMaskBytes,
				xChild = $.nodeFromString(`<i type="data" icon="icon-vector-layer" name="${name}" ram="${ram}" gpu="${0}"/>`);
			xLayer.insertBefore(xChild, xLayer.firstChild);
		}
		// this.sumChildBytes(layerNode);
		return layerNode;
	},

	fromEngine(event) {
		let APP = decoshop,
			Self = Engine,
			type = event.data.type,
			rect,
			el;
		// console.log(event);
		switch (type) {
			// APP init
			case "app-init":
				break;
			case "init-view-state":
				Self.dispatch({ type: "update-view-state", viewState: event.data.viewState });
				break;
			// open file -> canvas added to DOM
			case "file-canvas-added":
				APP.els.cvs = event.data.el;

				// loop open files
				PP.Mt.map(doc => Self.buildDocNode(doc));

				// temp
				// $.xmlFromString(Test.xMemoryFiles).selectNodes("//Memory/*").map(xMemoryFile => {
				// 	Self.xMemory.appendChild(xMemoryFile);
				// });
				break;
			// proxy event to history panel
			case "history-changed":
				Panels.history.dispatch(event.data);
				break;
			default:
				// console.log(1111, event);
		}
	},
	dispatch(event) {
		let APP = decoshop,
			Self = Engine,
			type = event.type,
			value,
			rect,
			vs,
			el;
		switch (type) {
			// karaqu events
			case "window.resize":
				PP.resize(event.width, event.height);
				Self.dispatch({ type: "update-view-state" });
				break;
			case "toggle-guides":
				// pp.fB.Wi
			case "toggle-grid":
			case "toggle-pixel-grid":
			case "toggle-rulers":
				value = !PP.fB.bI;
				// engine update
				PP.fB.bI = value;
				// ui update
				APP.els.content.toggleClass("show-rulers", !value);
				Self.dispatch({ type: "update-view-state" });
				break;
			case "update-view-state":
				rect = APP.els.content.find(".cvs-helpers").offset();
				if (PP.fB.bI) {
					rect.top += PixelUtil.y0.mT;
					rect.left += PixelUtil.y0.mT;
					rect.width -= PixelUtil.y0.mT * 2;
					rect.height -= PixelUtil.y0.mT * 2;
				}
				vs = event.viewState || APP.file.doc.u;
				vs.setAvailable(rect.left, rect.top, rect.width, rect.height);
				PP.update(true);
				break;
		}
	},
};
