
var LayerSectionType = {
	none: 0,
	open: 1,
	closed: 2,
	divider: 3
};


function LayerRecord() {
	this.rect = null;
	this.buffer = null;
	this.blendModeKey = "norm";
	this.opacity = 255;
	this.usesClippingMask = !1;
	this.layerFlags = 0;
	this.folderStackIndex = 0;
	this.layerLinkEnabled = !0;
	this.channelRectDefaults = [];
	for (var A = 0; A < 10; A++) this.channelRectDefaults.push(0, 0, 255, 255);
	this.name = null;
	this.add = {};
	this.nB = null;
	this.P5 = null;
	this.z = null;
	this.UG = null;
	this.a80 = 30;
	this.at = null;
	this.yY = null;
	this.bX = null;
	this.Fp = null;
	this.ht = 0;
	this.VM = !1;
	this.IB = null;
	this.hD = new LayerRecord.DZ
}

LayerRecord.DZ = function() {
	this.IJ = !0;
	this.q6 = !0;
	this.tw = PixelUtil.allocBytes(0);
	this.anO = PixelUtil.allocBytes(0);
	this.Gg = null;
	this.Pr = {};
	this.a1K = null;
	this.nZ = null;
	this.b2 = null;
	this.Km = null;
	this.L$ = null;
	this.VK = null;
	this.GA = null;
	this.Vn = null;
	this.me = null;
	this.dO = null;
	this.aa = null;
	this.d1 = null;
	this.R6 = !1
};

LayerRecord.DZ.prototype.a2c = function() {
	this.IJ = null;
	this.q6 = !1;
	this.Gg = null;
	this.R6 = WebGLContext.webglAvailable
};

LayerRecord.DZ.prototype.ap4 = function() {
	PatternHelper.arX(this.Pr);
	this.tw = PixelUtil.allocBytes(0);
	this.anO = PixelUtil.allocBytes(0);
	if (this.Km) this.Km.delete();
	if (this.L$) this.L$.delete();
	this.Km = null;
	this.L$ = null;
	var l = [this.VK, this.GA, this.Vn, this.me, this.dO, this.aa];
	for (var A = 0; A < 6; A++)
		if (l[A] != null && l[A] instanceof WebGLContext.RgbaTexture) l[A].delete();
	this.VK = null;
	this.GA = null;
	this.Vn = null;
	this.me = null;
	this.dO = null;
	this.aa = null
};

LayerRecord.prototype.U = function(l) {
	if (l == null) l = this.rect.clone();
	if (this.hD.Gg == null) this.hD.Gg = l;
	else this.hD.Gg = this.hD.Gg.Cw(l)
};

LayerRecord.prototype.IQ = function() {
	return this.add.lsct == LayerSectionType.open || this.add.lsct == LayerSectionType.closed
};

LayerRecord.prototype.VF = function() {
	var l = this.add;
	return l.SoCo != null || l.GdFl != null || l.PtFl != null
};

LayerRecord.prototype.a79 = function() {
	var l = this.add.lmfx;
	if (l == null) return;
	var d = ["GrFl", "patternFill"];
	for (var A = 0; A < d.length; A++) {
		var G = LayerStyleConstants.effectMultiKeys[LayerStyleConstants.effectOrder.indexOf(d[A])],
			b = l[G].v;
		if (b.length == 0) continue;
		for (var V = 0; V < b.length; V++) {
			var Q = b[V].v;
			if (Q.enab.v && (Q.Algn == null || !Q.Algn.v)) this.hD.q6 = !0
		}
	}
};

LayerRecord.prototype.agN = function() {
	var l = this.z,
		d = this.hD.IJ;
	if (this.VF()) l = this.c3();
	if (!WebGLContext.webglAvailable) return l.ZR();
	if (this.hD.L$ == null || d || WebGLContext.webglAvailable != this.hD.R6) {
		var G = l.Pa(),
			b = this.hD.L$,
			V = null;
		if (d != !0 && d != null) {
			V = d.clone();
			V.offset(-G.x, -G.y)
		}
		if (b == null || b.m != G.m || b.n != G.n) {
			b = this.hD.L$ = new WebGLContext.AlphaChannel(G.m, G.n);
			V = null
		}
		b.set(l.ZR(), V)
	}
	return this.hD.L$
};

LayerRecord.prototype.af9 = function(l) {
	var d = this.rect,
		G = this.buffer;
	if (!WebGLContext.webglAvailable) {
		var b = this._I(l, G, d);
		if (b) {
			G = b.QI;
			d = b.rect
		}
		return G
	}
	if (this.hD.Gg != null || WebGLContext.webglAvailable != this.hD.R6) {
		var b = this._I(l, G, d);
		if (b) {
			G = b.QI;
			d = b.rect
		}
		var V = d;
		if (WebGLContext.webglAvailable != this.hD.R6 || this.hD.Km == null || this.hD.Km.m != V.m || this.hD.Km.n != V.n) {
			if (this.hD.Km) this.hD.Km.delete();
			this.hD.Km = new WebGLContext.RgbaTexture(V.m, V.n);
			this.hD.Km.set(G)
		} else {
			var Q = this.hD.Gg.clone();
			Q.offset(-d.x, -d.y);
			this.hD.Km.set(G, Q)
		}
	}
	return this.hD.Km
};

LayerRecord.prototype.WS = function() {
	var l = this.z;
	if (this.VF()) l = this.c3();
	return l != null && l.isEnabled && (!l.rect.W6() || l.cc() != 255)
};

LayerRecord.prototype._I = function(l, d, G) {
	if (this.aW()) {
		var b = this.vZ(l);
		if (b.z && b.z.isEnabled && (!b.z.rect.W6() || b.z.color == 0)) {
			var V = this.add.SoLd.filterFX.v;
			b.z.Al = V.filterMaskDensity ? V.filterMaskDensity.v : 255;
			b.z.Vx = V.filterMaskFeather ? V.filterMaskFeather.v : 0;
			var Q = b.buffer,
				t = b.rect;
			if (!t.XB(G)) {
				t = G.clone();
				Q = PixelUtil.allocBytes(t.O() * 4);
				PixelUtil.blitRgbaRect(b.buffer, b.rect, Q, t)
			}
			var I = b.z.Ua(G);
			PixelUtil.invertUint32Buffer(I);
			d = d.slice(0);
			PixelUtil.blend.aX(Q, t, d, G, I, G, 0, G, 1);
			return {
				QI: d,
				rect: G
			}
		}
	}
};

LayerRecord.prototype.avc = function() {
	var l = {
		ql: !1,
		SC: !1,
		Fh: 0,
		HC: 0
	};
	if (this.add.vmsk && this.add.vmsk.isEnabled) l.SC = !0;
	if (this.c3() && this.c3().isEnabled) l.ql = !0;
	if (l.ql && l.SC) {
		l.Fh = this.c3().rect.x - this.add.vmsk.c3().rect.x;
		l.HC = this.c3().rect.y - this.add.vmsk.c3().rect.y
	}
	return l
};

LayerRecord.prototype.QJ = function(l, d) {
	this.hD.EH = null;
	if (d && this.c3().Vx != 0) {
		d = d.clone();
		var G = Math.round(this.c3().Vx * 2.4);
		d.rC(G, G)
	}
	var b = !1;
	if (this.add.lsct == LayerSectionType.divider) return;
	var V = this,
		Q = this.c3() != null && this.c3().y1,
		t = this.add.vmsk != null && this.add.vmsk.y1,
		I = this.avc(),
		y = JSON.stringify(I) != this.hD.a1K || I.ql && Q || I.SC && t;
	if (y) {
		if (I.SC) {
			var e = this.add.vmsk.c3();
			if (I.ql) {
				this.z = this.c3().mergeWith(e);
				this.hD.nZ = new Point2D(this.z.rect.x - this.c3().rect.x, this.z.rect.y - this.c3().rect.y)
			} else this.z = e
		}
		if (this.z) b = !0;
		if (this.z) this.hD.b2 = new Point2D(this.rect.x - this.z.rect.x, this.rect.y - this.z.rect.y);
		if (I.ql) this.c3().y1 = !1;
		if (I.SC) this.add.vmsk.y1 = !1;
		this.U(d)
	} else {
		if (I.ql && I.SC) {
			this.z.rect.x = this.c3().rect.x + this.hD.nZ.x;
			this.z.rect.y = this.c3().rect.y + this.hD.nZ.y
		}
	}
	if (V.VF()) {
		this.Kq(l)
	}
	if (V.Eo()) {
		var M;
		if (this.z) M = new Point2D(this.rect.x - this.z.rect.x, this.rect.y - this.z.rect.y);
		if (this.z && this.z.isEnabled && (this.hD.b2 == null || !M.XB(this.hD.b2))) {
			this.hD.b2 = M;
			this.U(d);
			b = !0
		}
	}
	if (LayerEffectsHelper.detectAdjustmentKey(V.add) != null) b = !0;
	if (b) {
		var R = this.hD.IJ;
		if (d && R && R != !0) R = R.Cw(d);
		else R = d ? d : !0;
		this.hD.IJ = R
	}
	this.hD.a1K = JSON.stringify(I)
};
/** Re-rasterize vector fill + stroke into this layer’s buffer (`psdDoc` supplies canvas size and pattern refs). */

LayerRecord.prototype.Kq = function(psdDoc) {
	var layer = this,
		vectorStroke = layer.add.vstk,
		fullDocRect = new Rect(0, 0, psdDoc.m, psdDoc.n),
		patternRect,
		vectorMaskRaster = layer.add.vmsk ? layer.add.vmsk.c3() : null,
		applyFillAndPattern = !0,
		strokeAlignIndex;
	if (vectorMaskRaster && vectorMaskRaster.isEnabled && vectorMaskRaster.cc() === 0) {
		patternRect = vectorMaskRaster.Pa().clone()
	} else {
		patternRect = fullDocRect
	}
	var userRasterMask = layer.c3();
	if (userRasterMask && userRasterMask.isEnabled && userRasterMask.cc() === 0) {
		patternRect = patternRect.wD(layer.z.Pa())
	}
	var hasVectorStroke = vectorMaskRaster && vectorStroke;
	if (vectorStroke && (!vectorStroke.strokeEnabled.v || vectorStroke.strokeStyleLineWidth.v.val == 0)) {
		hasVectorStroke = !1
	}
	if (vectorStroke && !vectorStroke.fillEnabled.v && hasVectorStroke) {
		applyFillAndPattern = !1
	}
	var pixelBuffer = PixelUtil.allocBytes(patternRect.O() * 4);
	if (applyFillAndPattern) {
		if (layer.add.SoCo) PatternHelper.G4(pixelBuffer, layer.add.SoCo.Clr.v);
		if (layer.add.GdFl) {
			var gradientClipRect = vectorMaskRaster && vectorMaskRaster.color === 0 ? PixelUtil.path.oh(layer.add.vmsk.i, null, !0) : null;
			PatternHelper.DQ(layer.add.GdFl, pixelBuffer, patternRect, psdDoc, null, gradientClipRect)
		}
		if (layer.add.PtFl) PatternHelper.s2(layer.add.PtFl, pixelBuffer, patternRect, psdDoc.add.Patt, layer.add.fxrp)
	}
	if (hasVectorStroke) {
		strokeAlignIndex = LayerStyleConstants.strokeStyle.lineAlignmentTypes.indexOf(vectorStroke.strokeStyleLineAlignment.v.strokeStyleLineAlignment)
	}
	if (vectorMaskRaster) {
		var savedVectorMaskDensity = vectorMaskRaster.Al;
		if (hasVectorStroke) vectorMaskRaster.Al = 255;
		var vectorComposite = PixelUtil.allocBytes(patternRect.O());
		if (vectorMaskRaster.cc() !== 0) vectorComposite.fill(Math.round(vectorMaskRaster.cc()));
		if (vectorMaskRaster.isEnabled) {
			var vectorBounds = vectorMaskRaster.Pa(),
				vectorPixels = vectorMaskRaster.ZR();
			if (vectorBounds.XB(patternRect)) PixelUtil.copyByteBuffer(vectorPixels, vectorComposite);
			else PixelUtil.copyBufferRect(vectorPixels, vectorBounds, vectorComposite, patternRect)
		}
		if (hasVectorStroke && strokeAlignIndex === 2) {} else {
			if (layer.add.SoCo && applyFillAndPattern) {
				PixelUtil.writeChannelToRgba(vectorComposite, pixelBuffer, 3)
			} else PixelUtil.multiplyMaskIntoRgbaAlpha(vectorComposite, patternRect, pixelBuffer, patternRect)
		}
		if (hasVectorStroke) vectorMaskRaster.Al = savedVectorMaskDensity
	}
	layer.buffer = pixelBuffer;
	layer.rect = patternRect;
	if (hasVectorStroke) {
		var strokeContent = vectorStroke.strokeStyleContent.v,
			strokeKind = LayerStyleConstants.strokeStyle.contentLayerClassIDs.indexOf(strokeContent.classID),
			vectorMaskForStroke = layer.add.vmsk.c3(vectorStroke);
		if (strokeAlignIndex !== 0 && !layer.rect.XB(fullDocRect)) layer.extend(layer.rect.Cw(vectorMaskForStroke.Pa()));
		var savedStrokeMaskDensity = vectorMaskForStroke.Al;
		vectorMaskForStroke.Al = 255;
		var strokeMaskChannel = vectorMaskForStroke.Ua(layer.rect);
		vectorMaskForStroke.Al = savedStrokeMaskDensity;
		if (vectorMaskForStroke.color === 255) PixelUtil.invertUint32Buffer(strokeMaskChannel);
		var strokeBuffer = PixelUtil.allocBytes(layer.rect.O() * 4);
		if (strokeKind === 0) PatternHelper.G4(strokeBuffer, strokeContent.Clr.v);
		if (strokeKind === 1) PatternHelper.DQ(strokeContent, strokeBuffer, layer.rect, psdDoc, null, vectorMaskRaster.color === 0 ? vectorMaskRaster.rect : null);
		if (strokeKind === 2) PatternHelper.s2(strokeContent, strokeBuffer, layer.rect, psdDoc.add.Patt, layer.add.fxrp);
		var strokeOpacity = vectorStroke.strokeStyleOpacity.v.val / 100;
		if (strokeOpacity !== 1) PixelUtil.scaleRoundBytes(strokeMaskChannel, strokeOpacity);
		if (vectorMaskForStroke.color === 255) strokeAlignIndex = 2 - strokeAlignIndex;
		if (strokeAlignIndex < 2) {
			PixelUtil.blend.aX(strokeBuffer, layer.rect, layer.buffer, layer.rect, strokeMaskChannel, layer.rect, 255, layer.rect, 1, !1);
			if (strokeAlignIndex === 0) PixelUtil.multiplyAlphaIntoRgba(vectorComposite, layer.buffer)
		}
		if (strokeAlignIndex === 2) {
			PixelUtil.multiplyAlphaIntoRgba(strokeMaskChannel, strokeBuffer);
			PixelUtil.invertUint32Buffer(vectorComposite);
			PixelUtil.blend.aX(strokeBuffer, layer.rect, layer.buffer, layer.rect, vectorComposite, patternRect, 255, layer.rect, 1, !1);
			PixelUtil.invertUint32Buffer(vectorComposite)
		}
		if (vectorMaskForStroke.Al !== 255) {
			var strokeScratch = strokeBuffer.slice(0);
			PixelUtil.andMaskUint32(strokeScratch, 4278190080, 16777215);
			PixelUtil.blend.compositeBlend("norm", strokeScratch, layer.rect, layer.buffer, layer.rect, layer.rect, 1 - vectorMaskForStroke.Al / 255)
		}
		var restoreVectorMaskDensity = vectorMaskRaster.Al;
		vectorMaskRaster.Al = 255;
		this.anO = vectorMaskRaster.Ua(layer.rect);
		vectorMaskRaster.Al = restoreVectorMaskDensity
	}
	layer.U()
};

LayerRecord.prototype.kX = function(l, d, G) {
	var b = this,
		V = b.add.SoLd.Idnt.v,
		Q = b.add.SoLd,
		t = PixelUtil.vec.boundingBox(f.NH.DO(Q.nonAffineTransform)),
		I = l.a7(V, Q.Crop ? Q.Crop.v : null, [t.m, t.n], Q.Impr.v.classID, G),
		n = 1;
	if (I == null) return;
	var y = I.hF;
	Q.Sz.v.Wdth.v = y[1].m;
	Q.Sz.v.Hght.v = y[1].n;
	var e = I.m7 == null ? Q.Rslt.v.val : I.m7,
		M = Q.warp.v,
		R = f.NH.DO(Q.nonAffineTransform),
		J = y[1].clone();
	J.m *= n;
	J.n *= n;
	J.x = (y[1].m - J.m) / 2;
	J.y = (y[1].n - J.n) / 2;
	var r = PixelUtil.canvas.eP(R, J);
	if (M && !PixelUtil.textWarp.T9(M)) {
		var t = PixelUtil.vec.boundingBox(PixelUtil.textWarp.js(M)),
			T = t.x,
			j = t.y,
			g = 1 / t.m,
			Y = 1 / t.n;
		r = PixelUtil.canvas.eP(R);
		r = PixelUtil.canvas.mY(r, [g, 0, -T * g, 0, Y, -j * Y, 0, 0])
	}
	var k = f.NH.cY(y, d ? 0 : 1, r, M, null, null, null, d);
	if (k == null) {
		b.buffer = PixelUtil.allocBytes();
		b.rect = new Rect
	} else if (b.aW()) {
		var F = b.vZ(l);
		F.buffer = k.buffer;
		F.rect = k.rect.clone();
		this.yN(l, d);
		if (F.z && F.z.rect.W6()) LayerRecord.initSmartFilterMask(b, l)
	} else {
		b.buffer = k.buffer;
		b.rect = k.rect
	}
	b.QJ(l);
	b.U();
	l.U()
};

LayerRecord.prototype.yN = function(l, d) {
	if (d == null) d = !1;
	var G = this.vZ(l),
		b = this.add.SoLd.filterFX.v,
		V = FilterHelper.abE(b),
		I = G.rect.clone();
	I.rC(V.x, V.y);
	var y = {
		buffer: null,
		rect: I
	};
	y.buffer = PixelUtil.allocBytes(y.rect.O() * 4);
	PixelUtil.blitRgbaRect(G.buffer, G.rect, y.buffer, y.rect);
	if (b.enab.v && d == !1) {
		var e = b.filterFXList.v;
		for (var A = 0; A < e.length; A++) {
			var M = e[A].v;
			if (M.enab.v == !1) continue;
			var R = M.blendOptions.v,
				J = au.bS(R.Md.v.BlnM),
				n = R.Opct.v.val / 100,
				r = PixelUtil.color.sampleGradientColor(M.FrgC.v),
				T = PixelUtil.color.sampleGradientColor(M.BckC.v),
				j = FilterHelper.ko(M),
				g = {
					buffer: PixelUtil.allocBytes(y.buffer.length),
					rect: y.rect.clone()
				},
				Y = M.Fltr ? M.Fltr.v : null;
			if (LayerEffectsHelper.classIdToKey[j] != null) {
				var k = LayerEffectsHelper.classIdToKey[j],
					F = LayerEffectsHelper.buildEffect(k, Y);
				if (F) LayerEffectsHelper.Qz(F, y.buffer, g.buffer, y.rect)
			} else FilterHelper.Qz(j, y, Y, r, T, g, [l.add.lnk2 ? l.add.lnk2 : [], this.c3(), l.vj]);
			if (J == "norm" && n == 1) y = g;
			else if (J == "norm") {
				PixelUtil.blend.aX(g.buffer, g.rect, y.buffer, y.rect, null, null, null, y.rect, n)
			} else {
				PixelUtil.blend.compositeBlend(J, g.buffer, g.rect, y.buffer, y.rect, y.rect, n)
			}
		}
	}
	this.rect = y.rect;
	this.buffer = y.buffer;
	this.ww();
	this.U();
	l.U()
};

LayerRecord.prototype.Ep = function(l, d, G) {
	this.IB = this.aro(l, d, G)
};

LayerRecord.prototype.VA = function(l, d) {
	var G = this.aro(l, d, !0);
	if (G == null) return null;
	var b = {
		VY: G.ht,
		XO: G.o7,
		rect: G.cG
	};
	if (b.VY == 1 || b.VY == 3) {
		var V = b.rect,
			Q = PixelUtil.allocBytes(V.m * V.n * 4);
		PixelUtil.writeChannelToRgba(b.XO, Q, 0);
		PixelUtil.writeChannelToRgba(b.XO, Q, 1);
		PixelUtil.writeChannelToRgba(b.XO, Q, 2);
		PixelUtil.copyAlphaToRgba(l.P.channel, l.P.rect, Q, V);
		b.XO = Q
	}
	return b
};

LayerRecord.prototype.aro = function(l, d, G) {
	var b, V, Q, t, I, y, e;
	if (this.ht <= 0) {
		var M = PixelUtil.allocBytes(this.rect.O());
		PixelUtil.extractChannelFromRgba(this.buffer, M, 3);
		b = PixelUtil.QY.De(d, {
			channel: M,
			rect: this.rect
		}, 3);
		if (b == null) return null;
		var R = PixelUtil.tightBoundsFromGray(b.channel, b.rect);
		t = b.rect.clone();
		I = this.rect.clone();
		V = PixelUtil.allocBytes(t.O() * 4);
		PixelUtil.blitRgbaRect(this.buffer, I, V, t);
		PixelUtil.writeChannelToRgba(b.channel, V, 3);
		Q = this.buffer.slice(0);
		if (!G) {
			var J = d.channel.slice(0);
			PixelUtil.invertUint32Buffer(J);
			PixelUtil.multiplyMaskIntoRgbaAlpha(J, d.rect, Q, I)
		}
		y = this.buffer.slice(0);
		e = this.rect.clone()
	}
	if (this.ht == 1 || this.ht == 3) {
		var n = this.ht == 1 ? this.c3() : this.vZ(l).z;
		t = d.rect.clone();
		I = n.rect.clone();
		V = n.M$(t);
		var Q = n.channel.slice(0);
		if (!G) PixelUtil.blend.su(n.color == 255 ? PixelUtil.getWhiteMaskBuffer(t.O()) : PixelUtil.getScratchByteBuffer(t.O()), t, Q, I, d.channel, t, 1);
		y = n.channel.slice(0);
		e = n.rect.clone()
	}
	return {
		ht: this.ht,
		o7: V,
		cG: t,
		W5: Q,
		l8: I,
		s3: y,
		A_: e
	}
};

LayerRecord.prototype.A6 = function(l, d) {
	var G = this.IB;
	if (G.ht == 0) {
		this.rect = G.A_;
		this.buffer = G.s3;
		this.U()
	}
	if (G.ht == 1 || G.ht == 3) {
		var b = G.ht == 1 ? this.c3() : this.vZ(l).z;
		b.channel = G.s3;
		b.rect = G.A_;
		if (this.ht == 1) {
			b.y1 = !0;
			this.QJ(l)
		}
		if (this.ht == 3) this.U()
	}
	this.IB = d
};

LayerRecord.prototype._l = function(l, d) {
	if (this.ht <= 0 && d.rect.XB(this.rect)) {
		var G = PixelUtil.allocBytes(this.rect.O());
		PixelUtil.extractChannelFromRgba(this.buffer, G, 3);
		if (PixelUtil.rgbaBuffersEqual(l.P.channel, G)) {
			var b = this.rect,
				V = this.buffer;
			this.IB = {
				ht: this.ht,
				o7: V.slice(0),
				cG: b.clone(),
				W5: PixelUtil.allocBytes(0),
				l8: new Rect,
				s3: PixelUtil.allocBytes(0),
				A_: new Rect
			};
			return !0
		}
	}
	var Q = this.IB;
	if (Q == null) return !1;
	if (Q.ht != this.ht) return !1;
	if (!d.rect.XB(Q.cG)) return !1;
	var t = Q.l8.Cw(Q.cG);
	if (Q.ht <= 0) {
		if (!t.XB(this.rect)) return !1;
		var I = PixelUtil.allocBytes(Q.o7.length >> 2);
		PixelUtil.extractChannelFromRgba(Q.o7, I, 3);
		if (!PixelUtil.rgbaBuffersEqual(d.channel, I)) return !1;
		var y = PixelUtil.allocBytes(t.m * t.n * 4);
		PixelUtil.blitRgbaRect(Q.W5, Q.l8, y, t);
		PixelUtil.blend.compositeBlend("norm", Q.o7, Q.cG, y, t, t, 1);
		return PixelUtil.rgbaBuffersEqual(y, this.buffer)
	}
	if (Q.ht == 1 || Q.ht == 3) {
		var e = Q.ht == 1 ? this.c3() : this.vZ(l).z;
		if (!t.XB(e.rect)) return !1;
		var M = PixelUtil.allocBytes(t.O());
		M.fill(e.color);
		PixelUtil.copyBufferRect(Q.W5, Q.l8, M, t);
		PixelUtil.blend.su(Q.o7, Q.cG, M, t, d.channel, t, 1);
		return PixelUtil.rgbaBuffersEqual(M, e.channel)
	}
};

LayerRecord.prototype.OX = function(l, d, G, b) {
	var V = this.IB;
	V.cG.offset(d, G);
	var Q = V.l8.Cw(V.cG);
	if (V.ht <= 0) {
		var t = PixelUtil.allocBytes(Q.O() * 4);
		PixelUtil.blitRgbaRect(V.W5, V.l8, t, Q);
		PixelUtil.blend.compositeBlend("norm", V.o7, V.cG, t, Q, Q, 1);
		this.buffer = t;
		this.rect = Q;
		this.U()
	} else {
		var I = this.ht == 1 ? this.c3() : this.vZ(l).z,
			y = PixelUtil.allocBytes(Q.O());
		y.fill(I.color);
		PixelUtil.copyBufferRect(V.W5, V.l8, y, Q);
		PixelUtil.blend.su(V.o7, V.cG, y, Q, b.channel, Q, 1);
		I.channel = y;
		I.rect = Q.clone();
		if (this.ht == 1) {
			I.y1 = !0;
			this.QJ(l)
		}
		if (this.ht == 3) this.U()
	}
};

LayerRecord.prototype.and = function() {
	var l = [-1, 0, 1, 2];
	if (this.z) l.push(-2);
	if (this.UG) l.push(-3);
	return l
};

LayerRecord.prototype.getName = function() {
	return this.add.luni ? this.add.luni : this.name
};

LayerRecord.prototype.tH = function(hZ) {
	this.add.luni = this.name = hZ
};

LayerRecord.prototype.er = function(l) {
	var d = this.add.lnsr,
		G = this.add.TySh;
	if (d == "rend" && G) {
		var b = dt.dW(G.zC);
		this.tH(b.slice(0, b.length - 1).replace(/(?:\r\n|\r|\n)/g, " ").slice(0, 32))
	}
};

LayerRecord.prototype.zD = function() {
	return (this.layerFlags & 1 << 1) == 0
};

LayerRecord.prototype.Eo = function() {
	return (this.layerFlags & 1 << 4) == 0
};

LayerRecord.prototype.bn = function() {
	return (this.layerFlags & 1 << 5) != 0
};

LayerRecord.prototype.a4U = function() {
	var l = this;
	if (l.add.lnsr != "bgnd") {
		l.add.lnsr = "bgnd";
		l.tH("Background");
		l.add.lspf = 1 << 2
	}
};

LayerRecord.prototype.adM = function() {
	var l = this;
	if (l.add.lnsr == "bgnd") {
		delete l.add.lnsr;
		l.tH("Layer 0");
		l.add.lspf = 0
	}
};

LayerRecord.prototype.Ka = function(l) {
	var d = this.add.lspf;
	return d == null ? !1 : (d >> l & 1) != 0
};

LayerRecord.prototype.Oj = function(l) {
	if (l && !this.zD()) this.layerFlags -= 2;
	if (!l && this.zD()) this.layerFlags += 2
};

LayerRecord.prototype.sc = function() {
	var l = this.add.lmfx;
	if (l == null) return !1;
	for (var d in l) {
		if (d == "masterFXSwitch") continue;
		if (d == "Scl") continue;
		if (d == "classID") continue;
		if (l[d].v.length > 0) return !0
	}
	return !1
};

LayerRecord.prototype.aW = function() {
	return this.add.SoLd != null && this.add.SoLd.filterFX != null
};

LayerRecord.prototype._G = function() {
	var l = this.add.lmfx;
	if (l == null) return !1;
	if (!l.masterFXSwitch.v) return !1;
	for (var d in l) {
		if (d == "masterFXSwitch") continue;
		if (d == "Scl") continue;
		if (d == "classID") continue;
		var G = l[d].v;
		for (var A = 0; A < G.length; A++)
			if (G[A].v.enab.v) return !0
	}
	return !1
};

LayerRecord.prototype.VR = function(l, d, G, b) {
	var V = new Rect,
		Q = this.fV(l, G, b);
	if (Q.indexOf(0) != -1) V = V.Cw(this.rect);
	if (Q.indexOf(1) != -1) {
		var t = this.c3(),
			I = t.Pa();
		V = G && t.cc() == 0 ? V.W6() ? I : V.wD(I) : V.Cw(I)
	}
	if (Q.indexOf(2) != -1) {
		var y = this.add.vmsk,
			e = this.add.vstk,
			M;
		if (d) {
			M = PixelUtil.path.oh(y.i, y.g.length != 0 ? y.g : null)
		} else M = PixelUtil.path.oh(y.i);
		if (!b && e && e.strokeEnabled.v) {
			var R = e.strokeStyleLineAlignment.v.strokeStyleLineAlignment,
				J = e.strokeStyleLineJoinType.v.strokeStyleLineJoinType;
			if (R != "strokeStyleAlignInside") {
				var n = e.strokeStyleLineWidth.v.val;
				if (J == "strokeStyleMiterJoin") M = new Rect(0, 0, l.m, l.n);
				else M.rC(n, n)
			}
		}
		V = V.Cw(M)
	}
	if (Q.indexOf(3) != -1) V = V.Cw(this.vZ(l).z.Pa());
	if (Q.length == 0 && this.VF()) V = b ? new Rect(0, 0, 0, 0) : new Rect(0, 0, l.m, l.n);
	return V
};

LayerRecord.prototype.jL = function() {
	var l = this.add.artb,
		d = l.artboardBackgroundType.v,
		G = 0;
	if (d == 1) G = 4294967295;
	else if (d == 2) G = 4278190080;
	else if (d == 3) G = 0;
	else if (d == 4) {
		G = l.Clr.v;
		G = 255 << 24 | G.Bl.v << 16 | G.Grn.v << 8 | G.Rd.v
	} else throw d;
	return G
};

LayerRecord.prototype.dA = function() {
	var l = this.add.artb.artboardRect.v,
		d = l.Btom.v,
		G = l.Left.v,
		b = l.Rght.v,
		top = l.Top.v;
	return new Rect(G, top, b - G, d - top)
};

LayerRecord.prototype.P3 = function(l) {
	var d = LayerRecord.vI(l);
	if (this.add.artb == null) this.add.artb = {
		classID: "artboard",
		artboardRect: {
			t: "Objc",
			v: null
		},
		artboardBackgroundType: {
			t: "long",
			v: 1
		}
	};
	this.add.artb.artboardRect.v = d
};

LayerRecord.vI = function(l) {
	var d = {
		classID: "classFloatRect",
		Top: {
			t: "doub",
			v: 0
		},
		Left: {
			t: "doub",
			v: 0
		},
		Btom: {
			t: "doub",
			v: 0
		},
		Rght: {
			t: "doub",
			v: 0
		}
	};
	d.Btom.v = l.y + l.n;
	d.Left.v = l.x;
	d.Rght.v = l.x + l.m;
	d.Top.v = l.y;
	return d
};

LayerRecord.prototype.fV = function(l, d, G) {
	var b = [],
		V = this;
	if (!d && V.VM && G) {
		b.push(2)
	} else if (V.ht <= 0 || d) {
		if (V.Eo())
			if (!this.rect.W6()) b.push(0);
		if (V.c3() && !V.c3().rect.W6())
			if (V.c3().cv || d) b.push(1);
		if (V.add.vmsk)
			if (V.add.vmsk.cv || d) b.push(2);
		if (V.aW() && V.vZ(l).z && !V.vZ(l).z.rect.W6()) b.push(3)
	} else if (V.ht == 1) {
		b.push(1);
		if (V.c3().cv && !V.c3().rect.W6()) {
			if (V.Eo())
				if (!this.rect.W6()) b.push(0);
			if (V.add.vmsk)
				if (V.add.vmsk.cv) b.push(2)
		}
	} else if (V.ht == 3 && !V.vZ(l).z.rect.W6()) b.push(3);
	if (V.add.artb && b.indexOf(0) == -1) b.push(0);
	b.sort();
	return b
};

LayerRecord.prototype.c3 = function() {
	var l = this;
	return l.UG ? l.UG : l.add.vmsk && l.add.vmsk.isEnabled ? null : l.z
};

LayerRecord.prototype.vZ = function(l) {
	var d = this.add.SoLd.placed.v,
		G = l.add.FEid;
	if (G == null) return null;
	for (var A = 0; A < G.length; A++)
		if (G[A].id == d) return G[A];
	return null
};

LayerRecord.initSmartFilterMask = function(l, d) {
	var G = l.vZ(d);
	if (G == null || G.z == null) return;
	var b = G.z,
		V = l.rect.clone();
	if (G.rect && !G.rect.W6()) V = V.Cw(G.rect);
	if (V.W6()) V = new Rect(0, 0, d.m, d.n);
	b.rect = V;
	b.channel = PixelUtil.allocBytes(V.O());
	b.channel.fill(b.color);
	b.y1 = !0
};

LayerRecord.prototype.extend = function(l) {
	PixelUtil.cropRgbaBuffer(this, l)
};

LayerRecord.prototype.abC = function(l, d, G) {
	var b = l.clone();
	if (this._G()) {
		var V = this.add.lmfx,
			Q = d.root.O4(d.B.indexOf(this)),
			t = V.gradientFillMulti.v,
			I = !1;
		for (var A = 0; A < t.length; A++)
			if (t[A].v.enab.v && t[A].v.Algn.v) I = !0;
		if (I) b = b.Cw(Q.Pa(d, !1));
	var y = PatternHelper.a94(this.add.lmfx, d, G);
		b.offset(y.x, y.y);
		b.m += y.m;
		b.n += y.n
	}
	return b
};

LayerRecord.prototype.ww = function() {
	if (this.Eo()) PixelUtil.cropRgbaAlphaOpaque(this);
	var l = this.c3();
	if (l) l.dispose()
};

LayerRecord.prototype.clone = function() {
	var l = new LayerRecord;
	l.rect = this.rect.clone();
	l.buffer = this.buffer.slice(0);
	l.blendModeKey = this.blendModeKey;
	l.opacity = this.opacity;
	l.usesClippingMask = this.usesClippingMask;
	l.layerFlags = this.layerFlags;
	l.name = this.name;
	l.channelRectDefaults = this.channelRectDefaults.slice(0);
	if (this.z) l.z = this.z.clone();
	if (this.UG) l.UG = this.UG.clone();
	for (var d in this.add) l.add[d] = ia.clone(d, this.add[d]);
	return l
};

LayerRecord.prototype.IO = function(l) {
	var d = this;
	if (d.add.TySh) delete d.add.TySh;
	if (d.add.SoLd) {
		var G = this._I(l, this.buffer, this.rect);
		if (G) {
			this.buffer = G.QI;
			this.rect = G.rect;
			this.U()
		}
		delete d.add.SoLd
	}
	if (d.add.SoCo || d.add.GdFl || d.add.PtFl) {
		if (d.add.vogk) delete d.add.vogk;
		if (d.add.SoCo) delete d.add.SoCo;
		if (d.add.GdFl) delete d.add.GdFl;
		if (d.add.PtFl) delete d.add.PtFl;
		if (d.add.vmsk) {
			console.log(d.UG, d.z);
			delete d.add.vmsk;
			if (d.UG == null && d.z) delete d.z;
			else if (d.UG != null && d.z != null) {
				d.z = d.UG;
				delete d.UG
			}
		}
	}
	if (!d.IQ() && LayerEffectsHelper.detectAdjustmentKey(d.add) == null && !this.Eo()) this.layerFlags -= 16
};

LayerRecord.prototype.NM = function(l) {
	var d = 255,
		G = 0;
	if (l == 2) {
		var b = this.add.SoLd.filterFX.v;
		if (b.filterMaskDensity) d = b.filterMaskDensity.v;
		if (b.filterMaskFeather) G = b.filterMaskFeather.v
	} else {
		var V = l == 0 ? this.c3() : this.add.vmsk;
		d = V.Al;
		G = V.Vx
	}
	return {
		GP: l,
		XS: d,
		wk: G
	}
};

LayerRecord.prototype.adV = function(l) {
	if (l.GP == 2) {
		var d = this.add.SoLd.filterFX.v;
		if (l.XS == 255) delete d.filterMaskDensity;
		else d.filterMaskDensity = {
			t: "long",
			v: l.XS
		};
		if (l.wk == 0) delete d.filterMaskFeather;
		else d.filterMaskFeather = {
			t: "doub",
			v: l.wk
		};
		this.U()
	} else {
		var G = l.GP == 0 ? this.c3() : this.add.vmsk;
		G.Al = l.XS;
		G.Vx = l.wk;
		G.y1 = !0
	}
};

LayerRecord.prototype.Ba = function() {
	var l = this,
		d = l.add.vmsk;
	if (d == null) return;
	l.add.vogk = PixelUtil.X.anb(d.i)
};

LayerRecord.Ba = function(l) {
	var d = [],
		G = PixelUtil.path.Mh(l);
	for (var b = 0; b < G; b++) d.push(PixelUtil.X.UH());
	return d
};


LayerRecord.LayerMask = function() {
	this.name = "Mask";
	this.jv = !1;
	this._A = {
		o: 255,
		J: 0,
		k: 0
	};
	this.bu = 50;
	this.Ts = 0;
	this.color = 255;
	this.cv = !0;
	this.isEnabled = !0;
	this.CX = !1;
	this.Al = 255;
	this.Vx = 0;
	this.rect = new Rect;
	this.channel = PixelUtil.allocBytes(0);
	this.cT = null;
	this.acT = null;
	this.y1 = !0
};
/** Bounds used when compositing this mask (includes feather padding when {@link LayerRecord.LayerMask#Vx} is non-zero). */

LayerRecord.LayerMask.prototype.Pa = function() {
	return this.getFeatheredRect()
};
/** Mask “spot” / density value (0–255) used with layer compositing; same field as {@link LayerRecord.LayerMask#color} for bitmap masks. */

LayerRecord.LayerMask.prototype.cc = function() {
	return this.color
};
/** Copy mask channel samples from this mask into a buffer sized for {@code rect} (same coordinate system as {@link PixelUtil.copyBufferRect}). */

LayerRecord.LayerMask.prototype.M$ = function(rect) {
	var out = PixelUtil.allocBytes(rect.O());
	out.fill(this.color);
	PixelUtil.copyBufferRect(this.channel, this.rect, out, rect);
	return out
};

LayerRecord.LayerMask.prototype.Ua = function(rect) {
	return this.M$(rect)
};

LayerRecord.LayerMask.prototype.mergeWith = function(l) {
	if (!this.isEnabled) return l;
	var d = new LayerRecord.LayerMask;
	d.color = Math.round(this.cc() * l.cc() / 255);
	if (this.cc() == 0 && l.cc() == 0) d.rect = this.Pa().wD(l.Pa());
	else if (l.cc() == 0) d.rect = l.Pa().clone();
	else if (this.cc() == 0) d.rect = this.Pa().clone();
	else d.rect = this.Pa().Cw(l.Pa());
	d.channel = this.Ua(d.rect);
	d.Al = 255;
	d.Vx = 0;
	var G = l.Ua(d.rect);
	PixelUtil.multiplyMaskIntoGray(G, d.rect, d.channel, d.rect);
	return d
};

LayerRecord.LayerMask.prototype.getFeatheredRect = function() {
	if (this.Vx == 0) return this.rect;
	var l = Math.ceil(this.Vx * 2.2),
		d = this.rect.clone();
	if (d.y == 0) {
		if (d.x == 0) d.m += l;
		else d.rC(l, 0);
		d.n += l
	} else d.rC(l, l);
	return d
};

LayerRecord.LayerMask.prototype.getBlurredChannel = function() {
	if (this.Vx == 0 && this.Al == 255) return this.channel;
	if (this.Vx == 0) {
		var l = this.channel.slice(0);
		PixelUtil.invertUint32Buffer(l);
		PixelUtil.scaleRoundBytes(l, this.Al / 255);
		PixelUtil.invertUint32Buffer(l);
		return l
	}
	var d = this.getFeatheredRect(),
		G = this.M$(d),
		l = PixelUtil.allocBytes(d.O());
	PixelUtil.sX.Dj(G, l, d, this.Vx);
	if (this.Al != 255) {
		PixelUtil.invertUint32Buffer(l);
		PixelUtil.scaleRoundBytes(l, this.Al / 255);
		PixelUtil.invertUint32Buffer(l)
	}
	return l
};

LayerRecord.LayerMask.prototype.ZR = function() {
	return this.getBlurredChannel()
};

LayerRecord.LayerMask.prototype.getEffectiveOpacity = function() {
	return Math.round(255 - (255 - this.color) * (this.Al / 255))
};

LayerRecord.LayerMask.prototype.extend = function(l) {
	PixelUtil.extend(this, l, this.color)
};

LayerRecord.LayerMask.prototype.dispose = function() {
	if (this.color == 255) PixelUtil.invertUint32Buffer(this.channel);
	PixelUtil.cropGrayChannelInPlace(this);
	if (this.color == 255) PixelUtil.invertUint32Buffer(this.channel)
};

LayerRecord.LayerMask.prototype.clone = function() {
	var l = new LayerRecord.LayerMask;
	l.name = this.name;
	l.jv = this.jv;
	l._A = this._A;
	l.bu = this.bu;
	l.Ts = this.Ts;
	l.color = this.color;
	l.cv = this.cv;
	l.isEnabled = this.isEnabled;
	l.CX = this.CX;
	l.Al = this.Al;
	l.Vx = this.Vx;
	l.rect = this.rect.clone();
	l.channel = this.channel.slice(0);
	return l
};

LayerRecord.LayerMask.prototype.renderToRect = function(l, d) {
	if (d == null) d = PixelUtil.allocBytes(l.O());
	d.fill(this.color);
	PixelUtil.copyBufferRect(this.channel, this.rect, d, l);
	return d
};

LayerRecord.LayerMask.prototype.applyToRect = function(l, d) {
	var G = this.getFeatheredRect(),
		b = this.getBlurredChannel();
	if (d == null) d = PixelUtil.allocBytes(l.O());
	d.fill(this.cc());
	PixelUtil.copyBufferRect(b, G, d, l);
	return d
};

LayerRecord.VectorMask = function() {
	this.cv = !0;
	this.isEnabled = !0;
	this.Al = 255;
	this.Vx = 0;
	this.i = [{
		type: 6
	}, {
		type: 8,
		all: 0
	}];
	this.JG = [-3, -3];
	this.as = !1;
	this.UG = null;
	this.y1 = !0;
	this.g = [];
	this.OE = []
};

LayerRecord.VectorMask.prototype.offset = function(l, d) {
	this.UG = this.c3();
	PixelUtil.path.transformFlatCoords(this.i, new Matrix2D(1, 0, 0, 1, l, d));
	this.UG.rect.offset(l, d)
};

LayerRecord.VectorMask.prototype.c3 = function(l) {
	if (!this.y1 && this.UG && l == null) {
		this.UG.isEnabled = this.isEnabled;
		return this.UG
	}
	var d = PixelUtil.path.oh(this.i),
		G = "strokeStyleLineAlignment",
		b = "strokeStyleLineJoinType";
	if (d.O() > 2e4 * 2e4) d = new Rect(0, 0, 100, 100);
	if (l && l[G].v[G] != "strokeStyleAlignInside") {
		var V = 1;
		if (l[b].v[b] == "strokeStyleMiterJoin") {
			var Q = PixelUtil.path.a6M(this.i),
				t = Q / 2,
				I = Math.sin(t),
				y = Math.cos(t);
			y /= I;
			I = 1;
			var V = Math.sqrt(y * y + I * I);
			if (isNaN(V) || V < 1) V = 1
		}
		V *= l[G].v[G] == "strokeStyleAlignOutside" ? 1 : .5;
		var e = Math.ceil(l.strokeStyleLineWidth.v.val * V);
		e = Math.min(e, 600);
		d.rC(e, e)
	}
	d = PixelUtil.vec.f1(d);
	var M = new LayerRecord.LayerMask;
	M.color = PixelUtil.path.XP(this.i) ? 0 : 255;
	M.cv = this.cv;
	M.isEnabled = this.isEnabled;
	M.CX = !0;
	M.rect = d;
	M.Al = this.Al;
	M.Vx = this.Vx;
	M.channel = PixelUtil.allocBytes(M.rect.O());
	if (!d.W6()) PixelUtil.path.akw(this.i, M.channel, M.rect, l);
	if (l == null) {
		this.UG = M;
		this.y1 = !1
	}
	return M
};

LayerRecord.VectorMask.prototype.clone = function() {
	var l = new LayerRecord.VectorMask;
	l.cv = this.cv;
	l.isEnabled = this.isEnabled;
	l.Al = this.Al;
	l.Vx = this.Vx;
	l.i = LayerRecord.VectorMask.FT(this.i);
	l.JG = this.JG.slice(0);
	l.as = this.as;
	l.g = this.g.slice(0);
	l.OE = this.OE.slice(0);
	return l
};

LayerRecord.VectorMask.prototype.concat = function(l) {
	var d = l.i.slice(2);
	if (d.length == 0) return;
	d[0].H$ = 3;
	this.i = this.i.concat(d)
};

LayerRecord.VectorMask.FT = function(l) {
	var d = [];
	for (var A = 0; A < l.length; A++) {
		var G = l[A];
		if (G.type > 5 || G.type == 0 || G.type == 3) d.push(JSON.parse(JSON.stringify(G)));
		else d.push({
			type: G.type,
			Wf: G.Wf.clone(),
			H: G.H.clone(),
			UU: G.UU.clone()
		})
	}
	return d
};

LayerRecord.VectorMask.a9T = function(l, d, G) {
	if (l.length != d.length) return !1;
	for (var A = 2; A < l.length; A++) {
		var b = l[A],
			V = d[A];
		if (b.type != V.type) return !1;
		if (b.type == 0 || b.type == 3) {
			if (b.length != V.length || !G && b.H$ != V.H$) return !1
		} else if (!b.Wf.XB(V.Wf) || !b.H.XB(V.H) || !b.UU.XB(V.UU)) return !1
	}
	return !0
};

LayerRecord.VectorMask.prototype.a2d = function() {
	var l = this.i;
	for (var A = 3; A < l.length; A++)
		if (l[A].type == 0 || l[A].type == 3) l[A].H$ = -1
};

LayerRecord.aA = function() {
	this.type = null;
	this.X7 = 2;
	this.AN = null;
	this.bf = "";
	this.hA = "";
	this.Rr = "";
	this.open = 0;
	this.raw = null;
	this.hF = null;
	this.ah_ = "";
	this.ya = !1
};

LayerRecord.aA.prototype.clone = function() {
	var l = new LayerRecord.aA;
	l.type = this.type;
	l.X7 = this.X7;
	l.AN = this.AN;
	l.bf = this.bf;
	l.hA = this.hA;
	l.Rr = this.Rr;
	l.open = this.open;
	l.raw = new Uint8Array(this.raw.buffer.slice(0));
	return l
};

LayerRecord.aA.prototype.LT = function(l, d, G, b, V) {
	if (G == null) G = "none";
	var Q = this,
		t = FormatHandler.aJ(Q.raw.buffer),
		I = t == "svg" || t == "pdf" || t == "ai";
	if (Q.hF) {
		var y = d && I && Math.max(Q.hF[1].m, Q.hF[1].n) < Math.max(d[0], d[1]);
		if (!y && G == this.ah_ && !Q.ya) return
	}
	this.ah_ = G;
	if (!I) l = 0;
	if (t == null) {
		alert("Unsupported format: " + X.Ko(Q.raw, 0, 4));
		return null
	}
	var e = FormatHandler.jA(t);
	if (e.zm) {
		var M = new PsdDocument(name + (t == "psd" ? "" : "-" + t) + ".psd"),
			R;
		e.gR(Q.raw.buffer, M, d);
		var J = new Rect(0, 0, M.m, M.n);
		if ("avrg maxx medn minn rang stdv summ vari".split(" ").indexOf(G) != -1) {
			var n = [];
			for (var A = 0; A < M.B.length; A++) {
				var r = M.B[A],
					T = r.buffer;
				if (!r.rect.XB(J)) {
					T = PixelUtil.allocBytes(J.O() * 4);
					PixelUtil.blitRgbaRect(r.buffer, r.rect, T, J);
					console.log("resizing")
				}
				n.push(T)
			}
			R = PixelUtil.allocBytes(J.O() * 4);
			PixelUtil.stack.stack(n, R, G)
		} else {
			for (var A = 0; A < M.B.length; A++)
				if (M.B[A].VF()) M.B[A].QJ(M);
			if (b && M.ya) {
				var j = StyleHelper.allTextLayersHaveFonts(M, b, V);
				Q.ya = !j;
				if (j) StyleHelper.rasterizeTextLayersWithFonts(M, b, V)
			}
			M.vp();
			M.U();
			M.Po();
			R = M.LT()
		}
		Q.hF = [R, J];
		Q.m7 = M.m7 != null && M.m7 != 0 ? M.m7 : 72
	} else if (e) {
		var g = e.gR(Q.raw.buffer)[0];
		Q.hF = [new Uint8Array(g.data), g.uA];
		Q.m7 = g.m7 != null && g.m7 != 0 ? g.m7 : 72
	}
	if (Q.hF) {
		if (l == 1) {
			var T = Q.hF[0],
				Y = Q.hF[1],
				k = PixelUtil.allocBytes(Y.O());
			PixelUtil.extractChannelFromRgba(T, k, 3);
			var F = PixelUtil.tightBoundsFromGray(k, Y),
				D = PixelUtil.allocBytes(F.O() * 4);
			PixelUtil.blitRgbaRect(T, Y, D, F);
			F.x = F.y = 0;
			Q.hF = [D, F]
		}
		PixelUtil.pyramidDownsampleRgba(Q.hF)
	}
};

LayerRecord.ZY = "0";

LayerRecord.Qe = "2";

LayerRecord.cr = "2.5";

LayerRecord.Ok = "2.6";

LayerRecord.md = "3";

LayerRecord.vH = "4";

LayerRecord.OF = "4.5";

LayerRecord.aeu = "4.6";

LayerRecord.abT = "5";

LayerRecord.zY = "5.5";

LayerRecord.amI = "6";

LayerRecord.pL = "7";

LayerRecord.aqo = "8";

LayerRecord.Oy = "9";

LayerRecord.Qn = "9.3";

LayerRecord.ai4 = "9.5";

LayerRecord.WW = "9.6";

LayerRecord.sF = "10";

LayerRecord.dD = "11";

LayerRecord.W0 = "12";

LayerRecord.a5 = "13";

LayerRecord.uU = "13.1";

LayerRecord.aqH = "13.2";

LayerRecord.n9 = "13.3";

LayerRecord.Yi = "13.4";

LayerRecord.dL = "14";

LayerRecord.W1 = "14.1";

LayerRecord.Es = "14.2";

LayerRecord.g_ = "14.3";

LayerRecord.JX = "17";

LayerRecord.GD = "18";

LayerRecord.ai0 = "19";

LayerRecord.ll = "19.5";

LayerRecord.B1 = "19.6";

LayerRecord.ka = "19.7";

LayerRecord._T = "19.8";

LayerRecord.zZ = "20";

LayerRecord.y$ = "21";

LayerRecord.ss = "21.5";

LayerRecord.Ij = "22";

LayerRecord.rh = "22.5";

LayerRecord.mH = "23";

LayerRecord.ahf = "24";

LayerRecord.bj = "25";

LayerRecord.ac5 = "26";

LayerRecord.ami = "27";

LayerRecord.M0 = "28";

LayerRecord.f0 = "29";

LayerRecord.Bl = "30";

LayerRecord.Gk = "31";

LayerRecord.vx = "32";

LayerRecord.C2 = "33";

LayerRecord.uz = "34";

LayerRecord.H0 = "35";

LayerRecord.jD = "36";

LayerRecord.R4 = "36.5";

LayerRecord.mQ = "37";

LayerRecord.CU = "37.5";

LayerRecord.as4 = "37.6";

LayerRecord.oY = "38";

LayerRecord.w0 = "38.5";

LayerRecord.sG = "38.6";

LayerRecord.OD = "39";

LayerRecord.dZ = "40";

LayerRecord.aon = "41";

LayerRecord.ZP = "42";

LayerRecord.Wj = "50";

LayerRecord.GQ = "51";

LayerRecord.ev = "52";

LayerRecord.V2 = "53";

LayerRecord.OL = "54";

LayerRecord.agf = "54.5";

LayerRecord.Sk = "54.6";

LayerRecord.at8 = "54.7";

LayerRecord.z5 = "54.8";

LayerRecord.sM = "55";

LayerRecord.yl = "56";

LayerRecord.Vg = "57";

LayerRecord.fG = "58";

LayerRecord.fx = "59";

LayerRecord.JQ = "60";

function LayerTreeNode() {
	this.depth = 0;
	this.index = -1;
	this.j = null;
	this.a9j = null;
	this.Vd = -1;
	this.children = null;
	this.parent = null;
	this.Pt = null
}

LayerTreeNode.prototype.asb = function(l, d) {
	if (this.depth != 0) l.push(this.j.getName());
	if (this.children)
		for (var A = 0; A < this.children.length; A++) this.children[A].asb(l, d);
	if (l.length > d.qv.length) d.qv = l.slice(0);
	if (this.depth != 0) l.pop()
};

LayerTreeNode.prototype.a4j = function() {
	var l = 0;
	if (this.j.IQ()) {
		for (var A = 0; A < this.children.length; A++) l += this.children[A].a4j()
	} else if (this.j.buffer) l += this.j.buffer.length;
	return l
};

LayerTreeNode.prototype.O4 = function(l) {
	var d = this.Pt[l];
	return this.Pt[l]
};

LayerTreeNode.prototype.a2W = function(l, d) {
	var G = this.j;
	if (!G.zD() || G.Ka(2) || G.Ka(31)) return null;
	if (G.WS()) {
		var b = G.z.rect.N1(l);
		if (!b && G.z.color == 0) return
	}
	if (G.IQ()) {
		for (var A = 0; A < this.children.length; A++) {
			var hZ = this.children[A];
			hZ.a2W(l, d)
		}
	} else if (G.rect.N1(l)) d.push(this.index)
};

LayerTreeNode.prototype.Rw = function(l, d) {
	var G = this.j;
	if (!G.zD() || G.Ka(2) || G.Ka(31)) return null;
	if (G.WS()) {
		if (G.z.rect.xC(l)) {
			if (!PixelUtil.pointInMask(l, G.z.channel, G.z.rect)) return null
		} else if (G.z.color == 0) return null
	}
	if (G.IQ()) {
		if (G.add.artb && !G.dA().xC(l)) return null;
		for (var A = this.children.length - 1; A >= 0; A--) {
			var hZ = this.children[A],
				b = hZ.Rw(l, d);
			if (b && d == null) return b
		}
		return null
	} else if (G.add.TySh && G.rect.xC(l) || PixelUtil.pointInRgbaAlpha(l, G.buffer, G.rect)) {
		if (d == null) return this;
		else d.push(this.index)
	}
	return null
};

LayerTreeNode.prototype.aeR = function(l) {
	var d = this.j;
	if (!d.zD() || d.Ka(2) || d.Ka(31)) return null;
	var G = d.add.vmsk;
	if (G && G.isEnabled) {
		var b = PixelUtil.path.Rw(G.i, l).sy;
		if (b != -1) return {
			a53: this,
			a8Y: b
		}
	}
	if (d.IQ()) {
		if (d.add.artb && !d.dA().xC(l)) return null;
		for (var A = this.children.length - 1; A >= 0; A--) {
			var hZ = this.children[A],
				V = hZ.aeR(l);
			if (V) return V
		}
		return null
	}
	return null
};

LayerTreeNode.prototype.Ou = function(l, d) {
	l.push(this.index);
	if (this.j.IQ()) {
		l.push(this.Vd);
		if (d)
			if (this.j.ht == 1 && this.j.c3().cv == !1) return;
		for (var A = 0; A < this.children.length; A++) this.children[A].Ou(l)
	}
};

LayerTreeNode.fw = function() {
	var l = document.createElement("canvas");
	return l.getContext("2d", { willReadFrequently: true })
};

LayerTreeNode.a5V = function(l, d) {
	var G, b;
	if (l.m > l.n) {
		G = d;
		b = Math.floor(d * (l.n / l.m))
	} else {
		G = Math.floor(d * (l.m / l.n));
		b = d
	}
	return new Point2D(G, b)
};

LayerTreeNode.hC = 32;

LayerTreeNode.iR = 1;

LayerTreeNode.prototype.Gx = function(l, d, G) {
	var b = LayerTreeNode.iR,
		V = this.j;
	if (V.IQ() && V.add.artb != null) d = V.dA();
	var Q = b == 0 ? V.rect : d;
	if (Q.W6() || V.add.TySh) Q = d;
	var t = LayerTreeNode.hC * window.devicePixelRatio,
		I = LayerTreeNode.a5V(Q, t),
		y = I.x,
		e = I.y,
		M = LayerTreeNode.a5V(d, t);
	if (V.VF() && V.add.vmsk == null || V.add.TySh) y = e = Math.max(e, 16);
	else if (V.IQ()) {
		y = e = 16
	} else {
		y = Math.max(y, 6);
		e = Math.max(e, 6)
	}
	if (G && V.at == null) {
		V.at = LayerTreeNode.fw();
		V.yY = LayerTreeNode.fw();
		V.bX = LayerTreeNode.fw();
		V.Fp = LayerTreeNode.fw()
	}
	var R = V.VF() && V.add.vmsk;
	if (R) {
		if (G && V.add.vstk) PixelUtil.e2.ho(V.at, y, e, Q, V.buffer, V.rect, !1, null, !V.add.vstk.fillEnabled.v && !V.add.vstk.strokeEnabled.v);
		if (G) PixelUtil.e2.alc(V.at, y, e)
	} else if (V.add.TySh) {
		if (G) PixelUtil.e2.ayR(V.at, e, e, V.add.TySh)
	} else if (V.add.SoCo) {
		if (G) PixelUtil.e2.auB(V.at, e, e, V.add.SoCo)
	} else if (V.add.GdFl) {
		if (G) PixelUtil.e2.aps(V.at, e, e, V.add.GdFl)
	} else if (V.add.PtFl) {
		if (G) PixelUtil.e2.apY(V.at, e, e, V.add.PtFl, l)
	} else if (LayerEffectsHelper.detectAdjustmentKey(V.add) != null) {
		if (G) PixelUtil.e2.aa7(V.at, e, e, V.add)
	} else if (V.add.SoLd) {
		if (G) PixelUtil.e2.ho(V.at, y, e, Q, V.buffer, V.rect, !1);
		if (G) PixelUtil.e2.alT(V.at, y, e, V.add.SoLd)
	} else if (V.IQ()) {} else {
		if (G) {
			if (V.Eo()) PixelUtil.e2.ho(V.at, y, e, Q, V.buffer, V.rect, !1);
			else {
				PixelUtil.e2.abf(V.at, e, e)
			}
		}
	}
	var J = V.c3();
	if (G) {
		if (J) PixelUtil.e2.L6(V.yY, M.x, M.y, d, J);
		if (V.aW() && V.vZ(l) && V.vZ(l).z) {
			var n = V.vZ(l).z;
			PixelUtil.e2.L6(V.Fp, M.x, M.y, d, n)
		}
		if (!R && V.add.vmsk) {
			PixelUtil.e2.L6(V.bX, M.x, M.y, d, V.add.vmsk.c3(), !0)
		}
	}
	if (J || V.add.vmsk) e = Math.max(e, M.y);
	V.a80 = Math.max(e, 16);
	if (G != !0 && V.IQ() && (V.add.lsct == LayerSectionType.open || l.B.length < 4e3))
		for (var A = 0; A < this.children.length; A++) this.children[A].Gx(l, d)
};

LayerTreeNode.prototype.anv = function(l, d, G, b) {
	this.depth = G;
	var V = l[d];
	if (b == null) b = [];
	this.Pt = b;
	if (V.add.lsct == LayerSectionType.divider) {
		this.a9j = V;
		this.Vd = d - 1;
		this.children = [];
		var A = d + 1;
		while (!0) {
			var Q = l[A];
			if (Q == null) console.log(A, l.length);
			if (Q.add.lsct == LayerSectionType.open || Q.add.lsct == LayerSectionType.closed) {
				if (V.add.lyid == Q.add.lyid) V.add.lyid += 16777215;
				this.j = Q;
				this.index = A - 1;
				b[this.index] = this;
				b[d - 1] = this;
				break
			}
			var t = new LayerTreeNode;
			t.parent = this;
			A = t.anv(l, A, G + 1, b);
			this.children.push(t)
		}
		return A + 1
	} else {
		this.j = V;
		this.index = d - 1;
		b[this.index] = this;
		return d + 1
	}
};

LayerTreeNode.prototype.H5 = function(l, d, G, b) {
	var V = this.O4(G),
		Q = l;
	while (V.parent != null) {
		Q = V.j.abC(Q, d, b);
		V = V.parent
	}
	return Q
};

LayerTreeNode.prototype.Pa = function(l, d) {
	var G = this.j,
		b = new Rect;
	if (!G.zD()) return b;
	var V = G.c3();
	if (G.IQ())
		for (var A = 0; A < this.children.length; A++) {
			var Q = this.children[A].Pa(l, !0);
			b = b.Cw(Q)
		} else if (LayerEffectsHelper.detectAdjustmentKey(G.add) != null) b = G.WS() && G.z.color == 0 ? G.z.Pa().clone() : new Rect(0, 0, l.m, l.n);
		else if (G.VF() && G.add.vmsk && G.add.vmsk.isEnabled && G.add.vstk) {
		b = G.rect.clone()
	} else if (G.VF() && V && V.isEnabled && V.cc() != 0) b = new Rect(0, 0, l.m, l.n);
	else {
		b = G.VR(l, !1, !0);
		if (G.add.vmsk) b = PixelUtil.vec.f1(b)
	}
	return d ? G.abC(b, l) : b
};

LayerTreeNode.fu = {
	delete: function(l) {
		if (l && l.m) l.delete()
	},
	Q: function(l, d) {
		return WebGLContext.webglAvailable ? new WebGLContext.RgbaTexture(l, d) : PixelUtil.allocBytes(l * d * 4)
	},
	SA: function(l, d, G) {
		if (WebGLContext.webglAvailable) {
			if (l == null || l.m != d || l.n != G) {
				LayerTreeNode.fu.delete(l);
				return new WebGLContext.RgbaTexture(d, G)
			}
		} else {
			if (l == null || !(l instanceof Uint8Array) || l.length != d * G * 4) {
				LayerTreeNode.fu.delete(l);
				return PixelUtil.allocBytes(d * G * 4)
			}
		}
		return l
	},
	IY: function(l, d, G, b, V) {
		(WebGLContext.webglAvailable ? WebGLContext.copyTexSubImage : PixelUtil.blitRgbaRect)(l, d, G, b, V)
	},
	aX: function(l, d, G, b, V, Q, t, I, A, y, e) {
		(WebGLContext.webglAvailable ? WebGLContext.s.yp : PixelUtil.blend.aX)(l, d, G, b, V, Q, t, I, A, y, e)
	},
	avs: function(l, d, G, b, V, Q, t, I) {
		var y = G.clone(),
			e = V.m,
			M = V.n,
			R = y.x,
			J = y.y,
			n = y.x + y.m > e ? -1 : 0,
			r = y.x < 0 ? 2 : 1,
			T = y.y + y.n > M ? -1 : 0,
			j = y.y < 0 ? 2 : 1;
		for (var g = T; g < j; g++)
			for (var Y = n; Y < r; Y++) {
				y.x = R + Y * e;
				y.y = J + g * M;
				LayerTreeNode.fu.Iz(l, d, y, b, V, Q, t, I)
			}
	},
	Iz: function(l, d, G, b, V, Q, t, I) {
		if (WebGLContext.webglAvailable) WebGLContext.s.ow(l, d, G, b, V, Q, t, I);
		else PixelUtil.blend.compositeBlend(l, d, G, b, V, Q, t, I)
	},
	FI: function(l, d, G) {
		if (WebGLContext.webglAvailable) {
			WebGLContext.setFramebufferViewport(l);
			WebGLContext.clearWithColorMask(d, G)
		} else PixelUtil.andMaskUint32(l, d, G)
	},
	asi: function(l, d, G, b, V) {
		if (WebGLContext.webglAvailable) {
			WebGLContext.s.yp(null, null, b, V, l, d, G, V, 1, !1)
		} else {
			if (G == 255) PixelUtil.multiplyMaskIntoRgbaAlpha(l, d, b, V);
			else {
				var Q = PixelUtil.allocBytes(d.O());
				PixelUtil.copyAlphaFromRgba(b, V, Q, d);
				PixelUtil.multiplyBuffersPerChannel(l, Q);
				PixelUtil.andMaskUint32(b, 0, 16777215);
				PixelUtil.copyAlphaToRgba(Q, d, b, V)
			}
		}
	},
	L9: function(l, d, G, b) {
		if (WebGLContext.webglAvailable) WebGLContext.s.yp(null, null, G, b, l, d, 0, b, 1, !1);
		else PixelUtil.multiplyMaskPlanesAlpha(l, d, G, b)
	}
};

LayerTreeNode.prototype.Zf = function(l, d, G, b, V, Q) {
	var t = typeof Q == "number";
	if (!this.j.IQ() && (t && this.index > Q || !t && Q.indexOf(this.index) == -1)) {
		return
	}
	var I = this.j,
		y = PatternHelper.fS(I),
		e = LayerTreeNode.fu,
		M = I.VF() ? I.c3() : I.z;
	if (!I.zD()) return;
	if (I.WS() && M.rect.W6() && M.cc() == 0) {
		return
	}
	if (I.add.vstk == null && this.Pa(b, !1).W6()) {
		return
	}
	var R = this.Pa(b, !0).wD(G);
	if (!d.XB(G) && !G.N1(R)) return;
	if (I.IQ() && I.add.artb) {
		var J = I.dA();
		G = G.wD(J)
	}
	var n = LayerTreeNode.aaV(I, V, y);
	if (!n) {
		this.adi(l, d, G, b, V, Q);
		return
	}
	I.hD.VK = e.SA(I.hD.VK, R.m, R.n);
	e.IY(l, d, I.hD.VK, R, G);
	this.adi(I.hD.VK, R, G, b, V, Q);
	e.aX(I.hD.VK, R, l, d, null, null, 0, G, I.opacity / 255, I.blendModeKey == "diss", y.cD)
};

LayerTreeNode.aaV = function(l, d, G) {
	if (G.cD[0] * G.cD[1] * G.cD[2] == 0) return !0;
	return l.opacity != 255 && (d.length != 0 || l.IQ() || l._G())
};

LayerTreeNode.abD = {
	hD: {}
};

LayerTreeNode.prototype.adi = function(l, d, G, b, V, Q) {
	var t = this.j,
		I = PatternHelper.fS(t),
		y = LayerEffectsHelper.detectAdjustmentKey(t.add) != null,
		e = LayerTreeNode.fu,
		M = LayerTreeNode.aaV(t, V, I),
		R = M ? 1 : t.opacity / 255,
		J = t.VF() ? t.c3() : t.z,
		n = t.IQ() && I.bc == null && (t.blendModeKey == "pass" || t.add.artb) && !(V.length > 0 || I.fill != 1 || t._G()),
		r = !t.IQ() && !y && !t._G() && V.length == 0,
		T = y && !t._G() && V.length == 0,
		D = null,
		q = null,
		H = null,
		m;
	if (n || r || T) {
		var j = l,
			g = d;
		if (t.WS()) {
			g = this.Pa(b, !1);
			j = t.hD.me = e.SA(t.hD.me, g.m, g.n);
			e.IY(l, d, t.hD.me, g)
		}
		if (n) this.rH(j, g, G, b, Q);
		if (r) e.Iz(t.blendModeKey, t.af9(b), t.rect, j, g, G, R, I);
		if (T) {
			var Y = t.WS() && J.cc() == 0 ? J.Pa().clone() : g.clone(),
				k = t.hD;
			if (Y.XB(new Rect(0, 0, b.m, b.n))) k = LayerTreeNode.abD;
			k.Vn = this.atN(j, g, k.Vn, Y, t.add);
			I.x4 = !0;
			e.Iz(t.blendModeKey, k.Vn, Y, j, g, G, R, I)
		}
		if (t.WS()) e.aX(j, g, l, d, t.agN(), J.Pa(), J.cc(), G, 1, t.blendModeKey == "diss");
		t.hD.a2c();
		return
	}
	var F = t.IQ() && t.blendModeKey == "pass" && (V.length > 0 || I.fill != 1 || t._G()),
		Y = t.rect;
	if (t.IQ()) {
		Y = this.Pa(b, !1);
		H = t.hD.Vn = e.SA(t.hD.Vn, Y.m, Y.n);
		e.FI(H, 0);
		this.rH(H, Y, Y, b, Q);
		q = e.SA(t.hD.GA, Y.m, Y.n);
		e.IY(H, Y, q, Y)
	} else if (y) {
		Y = t.WS() && J.cc() == 0 ? J.Pa().clone() : d.clone();
		q = e.SA(t.hD.GA, Y.m, Y.n);
		e.FI(q, 4294967295)
	} else {
		Y = t.rect;
		D = t.af9(b);
		q = e.SA(t.hD.GA, Y.m, Y.n);
		e.IY(D, Y, q, Y)
	}
	t.hD.GA = q;
	if (t.WS()) e.asi(t.agN(), J.Pa(), J.cc(), q, Y);
	if (t._G())
		if (t.hD.Gg || t.hD.q6 || t.hD.R6 != WebGLContext.webglAvailable || t.hD.IJ || t.IQ()) {
			var W = t.add.vmsk,
				Z = PixelUtil.allocBytes(Y.O());
			if (PatternHelper.ar2(t.add.lmfx)) {
				if (WebGLContext.webglAvailable) {
					if (!t.IQ() && t.c3() == null && t.rect.XB(Y) && W == null) PixelUtil.extractChannelFromRgba(t.buffer, Z, 3);
					else {
						var B = PixelUtil.allocBytes(Y.O() * 4);
						q.get(B);
						PixelUtil.extractChannelFromRgba(B, Z, 3)
					}
				} else PixelUtil.extractChannelFromRgba(q, Z, 3)
			}
			if (t.hD.q6 || t.hD.R6 != WebGLContext.webglAvailable || !PixelUtil.rgbaBuffersEqual(Z, t.hD.tw)) {
				var a = null;
				if (t.VF() && W && W.isEnabled && W.c3().color == 0) a = W.c3().rect;
				PatternHelper.arX(t.hD.Pr);
				t.hD.Pr = PatternHelper.aet(Z, Y, t.add.lmfx, t.add.fxrp, b, a);
				t.hD.tw = Z;
				t.hD.aqy = Y
			}
		}
	if (t._G()) PatternHelper.avZ(t.add.lmfx, t.hD.Pr, Y, l, d, G);
	if (t.IQ()) {
		D = e.SA(t.hD.me, Y.m, Y.n);
		e.FI(D, 0);
		if (t.blendModeKey == "pass") e.IY(l, d, D, Y);
		if (F) e.L9(H, Y, D, Y);
		this.rH(D, Y, G, b, Q);
		t.hD.me = D
	}
	if (y) {
		D = t.hD.me = this.atN(l, d, t.hD.me, Y, t.add)
	}
	if (t.IQ() || y) m = D;
	else {
		m = e.SA(t.hD.me, Y.m, Y.n);
		e.IY(D, Y, m, Y, G);
		t.hD.me = m
	}
	e.FI(m, 4278190080, 16777215);
	for (var A = 0; A < V.length; A++) V[A].Zf(m, Y, G, b, [], Q);
	var p = t.hD.dO = e.SA(t.hD.dO, Y.m, Y.n);
	e.IY(l, d, p, Y, G);
	if (y) I.x4 = !0;
	e.Iz(t.blendModeKey == "pass" ? "norm" : t.blendModeKey, m, Y, p, Y, G, 1, I);
	if (t._G()) {
		var c = t.hD.Pr.type.FrFX,
			v = null;
		if (c.length != 0) {
			v = c[0];
			for (var A = 0; A < c.length; A++)
				if (c[A].yz.m > v.yz.m) v = c[A];
			t.hD.aa = e.SA(t.hD.aa, v.yz.m, v.yz.n);
			e.IY(l, d, t.hD.aa, v.yz, G);
			t.hD.d1 = e.SA(t.hD.d1, v.yz.m, v.yz.n)
		}
		PatternHelper.afx(t.add.lmfx, t.hD.Pr, Y, l, d, G, p, t.hD.aa, t.hD.d1, v ? v.yz : null)
	}
	if (!WebGLContext.webglAvailable) {
		var i = PixelUtil.allocBytes(Y.O());
		PixelUtil.extractChannelFromRgba(q, i, 3);
		q = i
	}
	e.aX(p, Y, l, d, q, Y, 0, G, 1, t.blendModeKey == "diss");
	t.hD.a2c()
};

LayerTreeNode.prototype.atE = function(l, d, G, b) {
	var V = this.j,
		Q = V.add.lmfx,
		t = V.add.TySh,
		I = V.add.SoLd,
		r = !1,
		j = null;
	if (!V.zD()) return;
	if (!V.rect.W6() && !V.rect.N1(b)) return;
	d.save();
	if (V.add.artb) {
		var y = V.dA();
		d.beginPath();
		d.rect(y.x, y.y, y.m, y.n);
		d.clip();
		b = b.wD(y);
		var e = V.jL();
		if (e != 0) {
			var y = e >>> 16 & 255,
				M = e >>> 8 & 255,
				R = e & 255;
			d.fillStyle = "#" + PixelUtil.intToHex6(R << 16 | M << 8 | y);
			d.fillRect(b.x, b.y, b.m, b.n)
		}
	}
	var J = V.opacity / 255 * (V.add.iOpa ? V.add.iOpa / 255 : 1);
	d.globalAlpha *= J;
	d.globalCompositeOperation = au.El[au.CP.indexOf(V.blendModeKey)];
	var n = [];
	LayerStyleToCss.appendLayerEffectsToCss(l, Q, n);
	for (var A = 0; A < n.length; A++) {
		var T = n[A];
		if (T.startsWith("filter: drop-shadow")) {
			T = T.slice(20, -1).split(" ");
			d.shadowOffsetX = parseFloat(T[0]) * l.u.N;
			d.shadowOffsetY = parseFloat(T[1]) * l.u.N;
			d.shadowBlur = parseFloat(T[2]) * l.u.N * 2.4;
			d.shadowColor = T[3];
			r = !0
		}
	}
	var g = PatternHelper.at4(V, r);
	if (g) {
		j = d;
		var Y = document.createElement("canvas");
		Y.width = d.canvas.width;
		Y.height = d.canvas.height;
		var k = d.getTransform();
		d = Y.getContext("2d", { willReadFrequently: true });
		d.setTransform(k.a, k.b, k.c, k.d, k.e, k.f)
	}

	function F(x, K) {
		var D = x.hD.EH;
		if (D == null) D = x.hD.EH = PixelUtil.vec.bW(x.add.vmsk.i, K);
		return D
	}
	if (V.add.vmsk && !V.VF()) {
		var D = F(V, !1),
			q = D.or;
		d.beginPath();
		Typr.U.pathToContext({
			cmds: q.F,
			crds: q.C
		}, d);
		d.clip()
	}

	function H(x, K) {
		return LayerStyleToCss.rgbToCssColor({
			o: x[0] * 255,
			J: x[1] * 255,
			k: x[2] * 255
		}, K)
	}

	function W(v, x, K, u) {
		if (v.Ptrn) {
			var bC = PatternHelper.s2(v, null, new Rect(0, 0, 1, 1), x, K);
			u.save();
			u.translate(bC[2], bC[3]);
			u.scale(bC[1], bC[1]);
			u.rotate(-bC[4]);
			return bC
		}
		var O = colorSpaceHelper.buildGradientOrColor(v, new Matrix2D, V.rect);
		if (O.length == 3) return [H(O), 1];
		else {
			var $, gX = O.crds,
				_ = O.grad;
			if (O.typ == "lin") $ = d.createLinearGradient(gX[0], gX[1], gX[2], gX[3]);
			else $ = d.createRadialGradient(gX[0], gX[1], gX[2], gX[3], gX[4], gX[5]);
			for (var A = 0; A < _.length; A++) $.addColorStop(_[A][0], H(_[A][1], _[A][2]));
			return [$, 1]
		}
	}
	if (V.IQ()) {
		for (var A = 0; A < this.children.length; A++) this.children[A].atE(l, d, G, b)
	} else if (t) {
		var Z = !0;
		if (V.hD.path == null) {
			Z = StyleHelper.textLayerFontsAvailable(t, G.Hg);
			if (Z) StyleHelper.updateLayerTextStyle(V, G.Hg, !1)
		}
		if (Z) {
			if (l.u.N < 1) LayerTreeNode.arp(l, V, d, new Matrix2D(1, 0, 0, 1, V.rect.x, V.rect.y), V.hD.Rj);
			else if (V.hD.path) {
				d.save();
				d.translate(V.rect.x - V.hD.A_.x, V.rect.y - V.hD.A_.y);
				StyleHelper.drawPathToContext(V.hD.path, d);
				d.restore()
			}
		}
	} else if (V.VF() && V.add.vmsk) {
		var B = V.add.vmsk,
			a = V.add.vstk,
			Q = V.add.lmfx,
			m = a.fillEnabled.v;
		if (!a.strokeEnabled.v) a = PatternHelper.bd(Q);
		var p = a ? LayerStyleConstants.strokeStyle.lineAlignmentTypes.indexOf(a.strokeStyleLineAlignment.v.strokeStyleLineAlignment) : -1,
			D = F(V, p != -1),
			q = D.or;
		if (B.Vx != 0) d.filter = "blur(" + B.Vx * l.u.N + "px)";
		d.beginPath();
		Typr.U.pathToContext({
			cmds: q.F,
			crds: q.C
		}, d);
		var c = p == 2 ? [1, 0] : [0, 1];
		for (var A = 0; A < 2; A++) {
			if (c[A] == 0 && m) {
				var v = PatternHelper.KO(Q, V.add),
					i = v[0],
					z = v[1];
				v = V.add.PtFl;
				v = v ? v : i ? i : z;
				v = W(v, l.add.Patt, V.add.fxrp, d);
				d.fillStyle = v[0];
				d.fill(["nonzero", "evenodd"][V.hD.EH.cG]);
				if (v.length > 2) d.restore();
				if (p == 0) d.clip()
			}
			if (c[A] == 1 && a) {
				var P = W(a.strokeStyleContent.v, l.add.Patt, V.add.fxrp, d);
				d.strokeStyle = P[0];
				PixelUtil.path.Q5(a, d, 1 / P[1]);
				d.stroke();
				if (P.length > 2) d.restore()
			}
		}
	} else if (!V.rect.W6()) {
		var C = null,
			h = null;
		if (I) {
			var L = I.filterFX;
			if (L) {
				var v = L.v.filterFXList.v;
				for (var A = 0; A < v.length; A++) {
					var T = v[A].v;
					if (!T.enab.v) continue;
					var U = FilterHelper.ko(T);
					if (U == "GsnB") {
						d.filter = "blur(" + T.Fltr.v.Rds.v.val * l.u.N + "px)"
					}
				}
			}
			var S = I.Idnt.v,
				E = l.a7(S, I.Crop ? I.Crop.v : null);
			C = PixelUtil.canvas.wV(I);
			h = E.hF
		}
		LayerTreeNode.arp(l, V, d, C, h)
	}
	if (g) {
		j.save();
		j.setTransform(1, 0, 0, 1, 0, 0);
		j.drawImage(d.canvas, 0, 0);
		j.restore();
		d = j
	}
	d.globalAlpha /= J;
	d.globalCompositeOperation = "source-over";
	d.restore()
};

LayerTreeNode.arp = function(l, d, G, b, V) {
	if (b == null) b = new Matrix2D;
	var Q = d.buffer,
		t = d.rect;
	if (V) {
		var I = b.Nw() * l.u.N,
			y = 0;
		while (1 << y / 2 < .5 / I && y + 2 < V.length) y += 2;
		Q = V[y];
		t = V[y + 1];
		t = t.clone();
		t.x = t.y = 0;
		var I = 1 << y / 2,
			e = new Matrix2D;
		e.scale(I, I);
		e.concat(b);
		b = e
	}
	if (t.W6()) return;
	var M = document.createElement("canvas");
	M.width = t.m;
	M.height = t.n;
	var R = M.getContext("2d", { willReadFrequently: true });
	R.putImageData(new ImageData(new Uint8ClampedArray(Q.buffer), t.m, t.n), 0, 0);
	G.transform(b.aS, b.k, b.S5, b.Qd, b.cI, b.xu);
	G.drawImage(M, t.x, t.y);
	b.hI();
	G.transform(b.aS, b.k, b.S5, b.Qd, b.cI, b.xu)
};

LayerTreeNode.prototype.atN = function(l, d, G, b, V) {
	var Q = LayerEffectsHelper.detectAdjustmentKey(V),
		t;
	if (Q) t = LayerEffectsHelper.buildEffect(Q, V[Q]);
	var I = LayerTreeNode.fu;
	G = I.SA(G, b.m, b.n);
	if (!(WebGLContext.webglAvailable && d.XB(b))) I.IY(l, d, G, b);
	if (t) {
		if (WebGLContext.webglAvailable) {
			var y = b.clone();
			y.x = y.y = 0;
			if (d.XB(b)) {
				WebGLContext.setFramebufferViewport(G, y);
				LayerEffectsHelper.wF(t, l.glTexture, y)
			} else {
				WebGLContext.setFramebufferViewport(G, b);
				G.copyToAuxTexture(b);
				LayerEffectsHelper.wF(t, G.auxTexture, y)
			}
		} else LayerEffectsHelper.Qz(t, G, G, b)
	}
	return G
};

LayerTreeNode.prototype.rH = function(l, d, G, b, V) {
	var Q = d,
		t = Q.m,
		I = Q.n,
		y = Q.x,
		e = Q.y,
		hZ = G,
		M = hZ.x,
		R = hZ.y,
		J = -1,
		n = -1,
		r = 2,
		T = 2;
	if (!b.ZV) {
		J = n = 0;
		r = T = 1
	}
	var j = this.children;
	for (var A = 0; A < j.length; A++) {
		var g = [];
		for (var Y = A + 1; Y < j.length; Y++)
			if (j[Y].j.usesClippingMask) g.push(j[Y]);
			else break;
		for (var k = n; k < T; k++)
			for (var F = J; F < r; F++) {
				Q.x = y + F * t;
				Q.y = e + k * I;
				hZ.x = M + F * t;
				hZ.y = R + k * I;
				j[A].Zf(l, Q, hZ, b, g, V)
			}
		A += g.length
	}
	Q.x = y;
	Q.y = e;
	hZ.x = M;
	hZ.y = R
};


function LayerStyleConstants() {}


LayerStyleConstants.effectOrder = "ebbl FrFX IrSh IrGl ChFX SoFi GrFl patternFill OrGl DrSh".split(" ");

LayerStyleConstants.effectMultiKeys = "ebblMulti frameFXMulti innerShadowMulti IrGlMulti ChFXMulti solidFillMulti gradientFillMulti patternFillMulti OrGlMulti dropShadowMulti".split(" ");

LayerStyleConstants.effectDisplayNames = [
	[14, 4],
	[14, 9],
	[14, 1],
	[14, 3],
	[14, 8],
	[14, 5],
	[14, 6],
	[14, 7],
	[14, 2],
	[14, 0]
];

LayerStyleConstants.multiInstanceEffectTypes = ["DrSh", "IrSh", "SoFi", "GrFl", "FrFX"];

LayerStyleConstants.solidColorContentKeys = ["Clr"];

LayerStyleConstants.gradientContentKeys = "Grad Rvrs Type Algn Angl Dthr Scl Ofst".split(" ");

LayerStyleConstants.patternContentKeys = ["Ptrn", "Angl", "Scl", "Algn", "phase"];

LayerStyleConstants.descriptorJsonFragments = {
	jj: "{\"t\":\"Objc\",\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"v\":0,\"t\":\"doub\"},\"Grn\":{\"v\":0,\"t\":\"doub\"},\"Bl\":{\"v\":0,\"t\":\"doub\"}}}",
	a8M: "{\"t\":\"Objc\",\"v\":{\"classID\":\"Grdn\",\"Nm\":{\"t\":\"TEXT\",\"v\":\"Two Color\"               },\"GrdF\":{\"t\":\"enum\",\"v\":{\"GrdF\":\"CstS\"}},\"Intr\":{\"t\":\"doub\",\"v\":4096},\"Clrs\":{\"t\":\"VlLs\",\"v\":[{\"t\":\"Objc\",\"v\":{\"classID\":\"Clrt\",\"Type\":{\"t\":\"enum\",\"v\":{\"Clry\":\"UsrS\"}},\"Lctn\":{\"t\":\"long\",\"v\":0},\"Mdpn\":{\"t\":\"long\",\"v\":50},\"Clr\":{\"t\":\"Objc\",\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"t\":\"doub\",\"v\":0},\"Grn\":{\"t\":\"doub\",\"v\":0},\"Bl\":{\"t\":\"doub\",\"v\":0}}}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"Clrt\",\"Clr\":{\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"v\":255,\"t\":\"doub\"},\"Grn\":{\"v\":255,\"t\":\"doub\"},\"Bl\":{\"v\":255,\"t\":\"doub\"}},\"t\":\"Objc\"},\"Type\":{\"v\":{\"Clry\":\"UsrS\"},\"t\":\"enum\"},\"Lctn\":{\"v\":4096,\"t\":\"long\"},\"Mdpn\":{\"v\":50,\"t\":\"long\"}},\"t\":\"Objc\"}]},\"Trns\":{\"v\":[{\"v\":{\"classID\":\"TrnS\",\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\":100},\"t\":\"UntF\"},\"Lctn\":{\"v\":0,\"t\":\"long\"},\"Mdpn\":{\"v\":50,\"t\":\"long\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"TrnS\",\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\":100},\"t\":\"UntF\"},\"Lctn\":{\"v\":4096,\"t\":\"long\"},\"Mdpn\":{\"v\":50,\"t\":\"long\"}},\"t\":\"Objc\"}],\"t\":\"VlLs\"}}}",
	ace: "{\"t\":\"Objc\",\"v\":{\"classID\":\"Grdn\",\"Nm\":{\"t\":\"TEXT\",\"v\":\"Foreground to Background\"},\"GrdF\":{\"t\":\"enum\",\"v\":{\"GrdF\":\"CstS\"}},\"Intr\":{\"t\":\"doub\",\"v\":4096},\"Clrs\":{\"t\":\"VlLs\",\"v\":[{\"t\":\"Objc\",\"v\":{\"classID\":\"Clrt\",\"Type\":{\"t\":\"enum\",\"v\":{\"Clry\":\"FrgC\"}},\"Lctn\":{\"t\":\"long\",\"v\":0},\"Mdpn\":{\"t\":\"long\",\"v\":50}}},{\"t\":\"Objc\",\"v\":{\"classID\":\"Clrt\",\"Type\":{\"t\":\"enum\",\"v\":{\"Clry\":\"BckC\"}},\"Lctn\":{\"t\":\"long\",\"v\":4096},\"Mdpn\":{\"t\":\"long\",\"v\":50}}}]},\"Trns\":{\"t\":\"VlLs\",\"v\":[{\"t\":\"Objc\",\"v\":{\"classID\":\"TrnS\",\"Opct\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":100}},\"Lctn\":{\"t\":\"long\",\"v\":0},\"Mdpn\":{\"t\":\"long\",\"v\":50}}},{\"t\":\"Objc\",\"v\":{\"classID\":\"TrnS\",\"Opct\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":100}},\"Lctn\":{\"t\":\"long\",\"v\":4096},\"Mdpn\":{\"t\":\"long\",\"v\":50}}}]}}}",
	a9B: "{\"t\":\"Objc\",\"v\":{\"classID\":\"Grdn\",\"Nm\":{\"t\":\"TEXT\",\"v\":\"Custom\"                  },\"GrdF\":{\"t\":\"enum\",\"v\":{\"GrdF\":\"ClNs\"}},\"ShTr\":{\"t\":\"bool\",\"v\":false},\"VctC\":{\"t\":\"bool\",\"v\":false},\"ClrS\":{\"t\":\"enum\",\"v\":{\"ClrS\":\"RGBC\"}},\"RndS\":{\"t\":\"long\",\"v\":1466092501},\"Smth\":{\"t\":\"long\",\"v\":2048},\"Mnm\":{\"t\":\"VlLs\",\"v\":[{\"t\":\"long\",\"v\":0},{\"t\":\"long\",\"v\":0},{\"t\":\"long\",\"v\":0},{\"t\":\"long\",\"v\":0}]},\"Mxm\":{\"t\":\"VlLs\",\"v\":[{\"t\":\"long\",\"v\":100},{\"t\":\"long\",\"v\":100},{\"t\":\"long\",\"v\":100},{\"t\":\"long\",\"v\":100}]}}}",
	ni: "{\"t\":\"Objc\",\"v\":{\"classID\":\"Ptrn\",\"Nm\":{\"v\":\"orangeslices\",\"t\":\"TEXT\"},\"Idnt\":{\"v\":\"c7acb22a-47a6-11de-919a-bf574370eaaf\",\"t\":\"TEXT\"}}}"
};

LayerStyleConstants.descriptorJsonFragments.jj = "\"Clr\": " + LayerStyleConstants.descriptorJsonFragments.jj;

LayerStyleConstants.descriptorJsonFragments.K = "\"Grad\":" + LayerStyleConstants.descriptorJsonFragments.a8M + ",\"Scl\":{\"v\":{\"type\":\"#Prc\",\"val\":100},\"t\":\"UntF\"},\"Algn\":{\"v\":true,\"t\":\"bool\"},\"Angl\":{\"v\":{\"type\":\"#Ang\",\"val\":90},\"t\":\"UntF\"},\"Rvrs\":{\"v\":false,\"t\":\"bool\"},\"Type\":{\"v\":{\"GrdT\":\"Lnr\"},\"t\":\"enum\"},\"Ofst\":{\"v\":{\"classID\":\"Pnt\",\"Hrzn\":{\"v\":{\"type\":\"#Prc\",\"val\":0},\"t\":\"UntF\"},\"Vrtc\":{\"v\":{\"type\":\"#Prc\",\"val\":0},\"t\":\"UntF\"}},\"t\":\"Objc\"},\"Dthr\":{\"v\":false,\"t\":\"bool\"}";

LayerStyleConstants.descriptorJsonFragments.ni = "\"Ptrn\":" + LayerStyleConstants.descriptorJsonFragments.ni + ",\"Scl\":{\"v\":{\"type\":\"#Prc\",\"val\":100},\"t\":\"UntF\"},\"Algn\":{\"v\":true,\"t\":\"bool\"},\"Angl\":{\"v\":{\"type\":\"#Ang\",\"val\": 0},\"t\":\"UntF\"},\"phase\":{\"v\":{\"classID\":\"Pnt\",\"Hrzn\":{\"v\":0,\"t\":\"doub\"},\"Vrtc\":{\"v\":0,\"t\":\"doub\"}},\"t\":\"Objc\"}";

LayerStyleConstants.defaultLayerStyleJson = "{ \"classID\": \"null\", \"Scl\": {\"t\": \"UntF\", \"v\": { \"type\": \"#Prc\",\"val\": 100} }, \"masterFXSwitch\": {\"t\": \"bool\",\"v\": true} }";

LayerStyleConstants.ensureEffectMultiLists = function(lmfx) {
	if (lmfx == null) return;
	for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) {
		var G = LayerStyleConstants.effectMultiKeys[A];
		if (lmfx[G] == null) lmfx[G] = {
			t: "VlLs",
			v: []
		};
		else if (lmfx[G].v == null) lmfx[G].v = []
	}
};

LayerStyleConstants.defaultEffectJsonStrings = ["{\"classID\":\"ebbl\",       \"enab\":{\"v\":true,\"t\":\"bool\"},  \"hglM\":{\"t\":\"enum\",\"v\":{\"BlnM\":\"Scrn\"}},\"hglC\":{\"t\":\"Objc\",\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"t\":\"doub\",\"v\":255},\"Grn\":{\"t\":\"doub\",\"v\":255},\"Bl\":{\"t\":\"doub\",\"v\":255}}},\"hglO\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":75}},\"sdwM\":{\"t\":\"enum\",\"v\":{\"BlnM\":\"Mltp\"}},\"sdwC\":{\"t\":\"Objc\",\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"t\":\"doub\",\"v\":0},\"Grn\":{\"t\":\"doub\",\"v\":0},\"Bl\":{\"t\":\"doub\",\"v\":0}}},\"sdwO\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":75}},\"bvlT\":{\"t\":\"enum\",\"v\":{\"bvlT\":\"SfBL\"}},\"bvlS\":{\"t\":\"enum\",\"v\":{\"BESl\":\"InrB\"}},\"uglg\":{\"t\":\"bool\",\"v\":true},\"lagl\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Ang\",\"val\":120}},\"Lald\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Ang\",\"val\":30}},\"srgR\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":100}},\"blur\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Pxl\",\"val\":5}},\"bvlD\":{\"t\":\"enum\",\"v\":{\"BESs\":\"In\"}},\"TrnS\":{\"t\":\"Objc\",\"v\":{\"classID\":\"ShpC\",\"Nm\":{\"t\":\"TEXT\",\"v\":\"Linear\"},\"Crv\":{\"t\":\"VlLs\",\"v\":[{\"t\":\"Objc\",\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"t\":\"doub\",\"v\":0},\"Vrtc\":{\"t\":\"doub\",\"v\":0}}},{\"t\":\"Objc\",\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"t\":\"doub\",\"v\":255},\"Vrtc\":{\"t\":\"doub\",\"v\":255}}}]}}},\"antialiasGloss\":{\"t\":\"bool\",\"v\":false},\"Sftn\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Pxl\",\"val\":0}},\"useShape\":{\"t\":\"bool\",\"v\":false},\"MpgS\":{\"t\":\"Objc\",\"v\":{\"classID\":\"ShpC\",\"Nm\":{\"t\":\"TEXT\",\"v\":\"Linear\"},\"Crv\":{\"t\":\"VlLs\",\"v\":[{\"t\":\"Objc\",\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"t\":\"doub\",\"v\":0},\"Vrtc\":{\"t\":\"doub\",\"v\":0}}},{\"t\":\"Objc\",\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"t\":\"doub\",\"v\":255},\"Vrtc\":{\"t\":\"doub\",\"v\":255}}}]}}},\"AntA\":{\"t\":\"bool\",\"v\":false},\"Inpr\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":28}},\"useTexture\":{\"t\":\"bool\",\"v\":false},\"InvT\":{\"t\":\"bool\",\"v\":false},\"Algn\":{\"t\":\"bool\",\"v\":true},\"Scl\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":100}},\"textureDepth\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":100}},\"Ptrn\":{\"t\":\"Objc\",\"v\":{\"classID\":\"Ptrn\",\"Nm\":{\"t\":\"TEXT\",\"v\":\"orangeslices\"},\"Idnt\":{\"t\":\"TEXT\",\"v\":\"c7acb22a-47a6-11de-919a-bf574370eaaf\"}}},\"phase\":{\"t\":\"Objc\",\"v\":{\"classID\":\"Pnt\",\"Hrzn\":{\"t\":\"doub\",\"v\":0},\"Vrtc\":{\"t\":\"doub\",\"v\":0}}}}", "{\"classID\":\"FrFX\",       \"enab\":{\"v\":true,\"t\":\"bool\"},  \"Md\":{\"v\":{\"BlnM\":\"Nrml\"},\"t\":\"enum\"},\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\":100},\"t\":\"UntF\"},\"Styl\":{\"v\":{\"FStl\":\"OutF\"},\"t\":\"enum\"},\"PntT\":{\"v\":{\"FrFl\":\"SClr\"},\"t\":\"enum\"},\"Sz\":{\"v\":{\"type\":\"#Pxl\",\"val\":3},\"t\":\"UntF\"}," + LayerStyleConstants.descriptorJsonFragments.jj + "," + LayerStyleConstants.descriptorJsonFragments.K + "," + LayerStyleConstants.descriptorJsonFragments.ni + "}", "{\"classID\":\"IrSh\",       \"enab\":{\"v\":true,\"t\":\"bool\"},  \"Md\":{\"v\":{\"BlnM\":\"Mltp\"},\"t\":\"enum\"},\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\": 75},\"t\":\"UntF\"},\"Clr\":{\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"v\":0,\"t\":\"doub\"},\"Grn\":{\"v\":0,\"t\":\"doub\"},\"Bl\":{\"v\":0,\"t\":\"doub\"}},\"t\":\"Objc\"},\"uglg\":{\"v\":true,\"t\":\"bool\"},\"lagl\":{\"v\":{\"type\":\"#Ang\",\"val\":120},\"t\":\"UntF\"},\"Dstn\":{\"v\":{\"type\":\"#Pxl\",\"val\":5},\"t\":\"UntF\"},\"Ckmt\":{\"v\":{\"type\":\"#Pxl\",\"val\":0},\"t\":\"UntF\"},\"blur\":{\"v\":{\"type\":\"#Pxl\",\"val\":5},\"t\":\"UntF\"},\"Nose\":{\"v\":{\"type\":\"#Prc\",\"val\":0},\"t\":\"UntF\"},\"AntA\":{\"v\":false,\"t\":\"bool\"},\"TrnS\":{\"v\":{\"classID\":\"ShpC\",\"Nm\":{\"v\":\"Linear\",\"t\":\"TEXT\"},\"Crv\":{\"v\":[{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":0,\"t\":\"doub\"},\"Vrtc\":{\"v\":0,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":255,\"t\":\"doub\"},\"Vrtc\":{\"v\":255,\"t\":\"doub\"}},\"t\":\"Objc\"}],\"t\":\"VlLs\"}},\"t\":\"Objc\"}}", "{\"classID\":\"IrGl\",       \"enab\":{\"v\":true,\"t\":\"bool\"},  \"Md\":{\"v\":{\"BlnM\":\"Scrn\"},\"t\":\"enum\"},\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\": 75},\"t\":\"UntF\"},\"Clr\":{\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"v\":255,\"t\":\"doub\"},\"Grn\":{\"v\":255,\"t\":\"doub\"},\"Bl\":{\"v\":189.99710083007812,\"t\":\"doub\"}},\"t\":\"Objc\"},\"GlwT\":{\"v\":{\"BETE\":\"SfBL\"},\"t\":\"enum\"},\"Ckmt\":{\"v\":{\"type\":\"#Pxl\",\"val\":0},\"t\":\"UntF\"},\"blur\":{\"v\":{\"type\":\"#Pxl\",\"val\":5},\"t\":\"UntF\"},\"ShdN\":{\"v\":{\"type\":\"#Prc\",\"val\":0},\"t\":\"UntF\"},\"Nose\":{\"v\":{\"type\":\"#Prc\",\"val\":0},\"t\":\"UntF\"},\"AntA\":{\"v\":false,\"t\":\"bool\"},\"glwS\":{\"v\":{\"IGSr\":\"SrcE\"},\"t\":\"enum\"},\"TrnS\":{\"v\":{\"classID\":\"ShpC\",\"Nm\":{\"v\":\"Linear\",\"t\":\"TEXT\"},\"Crv\":{\"v\":[{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":0,\"t\":\"doub\"},\"Vrtc\":{\"v\":0,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":255,\"t\":\"doub\"},\"Vrtc\":{\"v\":255,\"t\":\"doub\"}},\"t\":\"Objc\"}],\"t\":\"VlLs\"}},\"t\":\"Objc\"},\"Inpr\":{\"v\":{\"type\":\"#Prc\",\"val\":50},\"t\":\"UntF\"}}", "{\"classID\":\"ChFX\",       \"enab\":{\"v\":true,\"t\":\"bool\"},  \"Md\":{\"v\":{\"BlnM\":\"Mltp\"},\"t\":\"enum\"},\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\": 50},\"t\":\"UntF\"},\"Clr\":{\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"v\":0,\"t\":\"doub\"},\"Grn\":{\"v\":0,\"t\":\"doub\"},\"Bl\":{\"v\":0,\"t\":\"doub\"}},\"t\":\"Objc\"},\"AntA\":{\"v\":false,\"t\":\"bool\"},\"Invr\":{\"v\":true,\"t\":\"bool\"},\"lagl\":{\"v\":{\"type\":\"#Ang\",\"val\":19},\"t\":\"UntF\"},\"Dstn\":{\"v\":{\"type\":\"#Pxl\",\"val\":11},\"t\":\"UntF\"},\"blur\":{\"v\":{\"type\":\"#Pxl\",\"val\":14},\"t\":\"UntF\"},\"MpgS\":{\"v\":{\"classID\":\"ShpC\",\"Nm\":{\"v\":\"Gaussian\",\"t\":\"TEXT\"},\"Crv\":{\"v\":[{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":0,\"t\":\"doub\"},\"Vrtc\":{\"v\":0,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":32,\"t\":\"doub\"},\"Vrtc\":{\"v\":7,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":64,\"t\":\"doub\"},\"Vrtc\":{\"v\":38,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":96,\"t\":\"doub\"},\"Vrtc\":{\"v\":101,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":128,\"t\":\"doub\"},\"Vrtc\":{\"v\":166,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":159,\"t\":\"doub\"},\"Vrtc\":{\"v\":209,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":191,\"t\":\"doub\"},\"Vrtc\":{\"v\":235,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":223,\"t\":\"doub\"},\"Vrtc\":{\"v\":248,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":255,\"t\":\"doub\"},\"Vrtc\":{\"v\":255,\"t\":\"doub\"}},\"t\":\"Objc\"}],\"t\":\"VlLs\"}},\"t\":\"Objc\"}}", "{\"classID\":\"SoFi\",       \"enab\":{\"v\":true,\"t\":\"bool\"},  \"Md\":{\"v\":{\"BlnM\":\"Nrml\"},\"t\":\"enum\"},\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\":100},\"t\":\"UntF\"}," + LayerStyleConstants.descriptorJsonFragments.jj + "}", "{\"classID\":\"GrFl\",       \"enab\":{\"v\":true,\"t\":\"bool\"},  \"Md\":{\"v\":{\"BlnM\":\"Nrml\"},\"t\":\"enum\"},\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\":100},\"t\":\"UntF\"}," + LayerStyleConstants.descriptorJsonFragments.K + "}", "{\"classID\":\"patternFill\",\"enab\":{\"v\":true,\"t\":\"bool\"},  \"Md\":{\"v\":{\"BlnM\":\"Nrml\"},\"t\":\"enum\"},\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\":100},\"t\":\"UntF\"}," + LayerStyleConstants.descriptorJsonFragments.ni + "}", "{\"classID\":\"OrGl\",       \"enab\":{\"v\":true,\"t\":\"bool\"},  \"Md\":{\"v\":{\"BlnM\":\"Scrn\"},\"t\":\"enum\"},\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\": 75},\"t\":\"UntF\"},\"Clr\":{\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"v\":255,\"t\":\"doub\"},\"Grn\":{\"v\":255,\"t\":\"doub\"},\"Bl\":{\"v\":189.99710083007812,\"t\":\"doub\"}},\"t\":\"Objc\"},\"GlwT\":{\"v\":{\"BETE\":\"SfBL\"},\"t\":\"enum\"},\"Ckmt\":{\"v\":{\"type\":\"#Pxl\",\"val\":0},\"t\":\"UntF\"},\"blur\":{\"v\":{\"type\":\"#Pxl\",\"val\":5},\"t\":\"UntF\"},\"Nose\":{\"v\":{\"type\":\"#Prc\",\"val\":0},\"t\":\"UntF\"},\"ShdN\":{\"v\":{\"type\":\"#Prc\",\"val\":0},\"t\":\"UntF\"},\"AntA\":{\"v\":false,\"t\":\"bool\"},\"TrnS\":{\"v\":{\"classID\":\"ShpC\",\"Nm\":{\"v\":\"Linear\",\"t\":\"TEXT\"},\"Crv\":{\"v\":[{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":0,\"t\":\"doub\"},\"Vrtc\":{\"v\":0,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":255,\"t\":\"doub\"},\"Vrtc\":{\"v\":255,\"t\":\"doub\"}},\"t\":\"Objc\"}],\"t\":\"VlLs\"}},\"t\":\"Objc\"},\"Inpr\":{\"v\":{\"type\":\"#Prc\",\"val\":50},\"t\":\"UntF\"}}", "{\"classID\":\"DrSh\",       \"enab\":{\"v\":true,\"t\":\"bool\"},  \"Md\":{\"v\":{\"BlnM\":\"Mltp\"},\"t\":\"enum\"},\"Opct\":{\"v\":{\"type\":\"#Prc\",\"val\": 57},\"t\":\"UntF\"},\"Clr\":{\"v\":{\"classID\":\"RGBC\",\"Rd\":{\"v\":0,\"t\":\"doub\"},\"Grn\":{\"v\":0,\"t\":\"doub\"},\"Bl\":{\"v\":0,\"t\":\"doub\"}},\"t\":\"Objc\"},\"uglg\":{\"v\":true,\"t\":\"bool\"},\"lagl\":{\"v\":{\"type\":\"#Ang\",\"val\":120},\"t\":\"UntF\"},\"Dstn\":{\"v\":{\"type\":\"#Pxl\",\"val\":27},\"t\":\"UntF\"},\"Ckmt\":{\"v\":{\"type\":\"#Pxl\",\"val\":0},\"t\":\"UntF\"},\"blur\":{\"v\":{\"type\":\"#Pxl\",\"val\":13},\"t\":\"UntF\"},\"Nose\":{\"v\":{\"type\":\"#Prc\",\"val\":0},\"t\":\"UntF\"},\"AntA\":{\"v\":false,\"t\":\"bool\"},\"TrnS\":{\"v\":{\"classID\":\"ShpC\",\"Nm\":{\"v\":\"Line\xE1rn\xED\",\"t\":\"TEXT\"},\"Crv\":{\"v\":[{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":0,\"t\":\"doub\"},\"Vrtc\":{\"v\":0,\"t\":\"doub\"}},\"t\":\"Objc\"},{\"v\":{\"classID\":\"CrPt\",\"Hrzn\":{\"v\":255,\"t\":\"doub\"},\"Vrtc\":{\"v\":255,\"t\":\"doub\"}},\"t\":\"Objc\"}],\"t\":\"VlLs\"}},\"t\":\"Objc\"},\"layerConceals\":{\"v\":true,\"t\":\"bool\"},\"Cntn\":{\"v\":false,\"t\":\"bool\"}}"];

LayerStyleConstants.gradientType = {
	types: "Lnr Rdl Angl Rflc Dmnd shapeburst".split(" "),
	names: [
		[19, 0, 0],
		[19, 0, 1],
		[19, 0, 2],
		[19, 0, 3],
		[19, 0, 4],
		[19, 0, 5]
	]
};

LayerStyleConstants.strokeOptions = {
	positionTypes: ["InsF", "CtrF", "OutF"],
	positionNames: [
		[19, 5, 2],
		[19, 5, 1],
		[19, 5, 0]
	],
	paintTypes: ["SClr", "GrFl", "Ptrn"],
	paintTypeNames: [
		[13, 0],
		[12, 37],
		[12, 62]
	]
};

LayerStyleConstants.glowTechnique = {
	types: ["SfBL", "PrBL"],
	names: [
		[19, 1, 0],
		[19, 1, 1]
	],
	sourceTypes: ["SrcC", "SrcE"],
	sourceNames: [
		[19, 5, 1],
		[12, 69]
	]
};

LayerStyleConstants.bevelEmboss = {
	types: ["OtrB", "InrB", "Embs", "PlEb", "strokeEmboss"],
	styleNames: [
		[19, 2, 0],
		[19, 2, 1],
		[19, 2, 2],
		[19, 2, 3],
		[19, 2, 4]
	],
	techniqueTypes: ["SfBL", "PrBL", "Slmt"],
	techniqueNames: [
		[19, 3, 0],
		[19, 3, 1],
		[19, 3, 2]
	],
	dir: [
		[19, 4, 0],
		[19, 4, 1]
	]
};

LayerStyleConstants.strokeStyle = {
	lineCapTypes: ["strokeStyleButtCap", "strokeStyleRoundCap", "strokeStyleSquareCap"],
	lineAlignmentTypes: ["strokeStyleAlignInside", "strokeStyleAlignCenter", "strokeStyleAlignOutside"],
	lineJoinTypes: ["strokeStyleMiterJoin", "strokeStyleRoundJoin", "strokeStyleBevelJoin"],
	contentLayerClassIDs: ["solidColorLayer", "gradientLayer", "patternLayer"],
	default: {
		classID: "strokeStyle",
		strokeStyleVersion: {
			t: "long",
			v: 2
		},
		strokeEnabled: {
			t: "bool",
			v: !1
		},
		fillEnabled: {
			t: "bool",
			v: !0
		},
		strokeStyleLineWidth: {
			t: "UntF",
			v: {
				type: "#Pnt",
				val: 1
			}
		},
		strokeStyleLineDashOffset: {
			t: "UntF",
			v: {
				type: "#Pnt",
				val: 0
			}
		},
		strokeStyleMiterLimit: {
			t: "doub",
			v: 100
		},
		strokeStyleLineCapType: {
			t: "enum",
			v: {
				strokeStyleLineCapType: "strokeStyleButtCap"
			}
		},
		strokeStyleLineJoinType: {
			t: "enum",
			v: {
				strokeStyleLineJoinType: "strokeStyleMiterJoin"
			}
		},
		strokeStyleLineAlignment: {
			t: "enum",
			v: {
				strokeStyleLineAlignment: "strokeStyleAlignCenter"
			}
		},
		strokeStyleScaleLock: {
			t: "bool",
			v: !1
		},
		strokeStyleStrokeAdjust: {
			t: "bool",
			v: !1
		},
		strokeStyleLineDashSet: {
			t: "VlLs",
			v: []
		},
		strokeStyleBlendMode: {
			t: "enum",
			v: {
				BlnM: "Nrml"
			}
		},
		strokeStyleOpacity: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 100
			}
		},
		strokeStyleContent: {
			t: "Objc",
			v: JSON.parse("{\"classID\":\"solidColorLayer\"," + LayerStyleConstants.descriptorJsonFragments.jj + "}")
		},
		strokeStyleResolution: {
			t: "doub",
			v: 72
		}
	}
};

LayerStyleConstants.defaultContentStyles = [{
	classID: "null",
	Clr: JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[5]).Clr
}, {
	classID: "null",
	Grad: JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[6]).Grad,
	Dthr: {
		t: "bool",
		v: !1
	},
	Rvrs: {
		t: "bool",
		v: !1
	},
	Angl: {
		t: "UntF",
		v: {
			type: "#Ang",
			val: 0
		}
	},
	Type: {
		t: "enum",
		v: {
			GrdT: "Lnr"
		}
	},
	Algn: {
		t: "bool",
		v: !0
	},
	Scl: {
		t: "UntF",
		v: {
			type: "#Prc",
			val: 100
		}
	},
	Ofst: {
		t: "Objc",
		v: {
			classID: "Pnt",
			Hrzn: {
				t: "UntF",
				v: {
					type: "#Prc",
					val: 0
				}
			},
			Vrtc: {
				t: "UntF",
				v: {
					type: "#Prc",
					val: 0
				}
			}
		}
	}
}, {
	classID: "null",
	Ptrn: JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[7]).Ptrn,
	Algn: {
		v: !0,
		t: "bool"
	},
	Scl: {
		v: {
			type: "#Prc",
			val: 100
		},
		t: "UntF"
	},
	Angl: {
		v: {
			type: "#Ang",
			val: 0
		},
		t: "UntF"
	},
	phase: {
		v: {
			classID: "Pnt",
			Hrzn: {
				v: 0,
				t: "doub"
			},
			Vrtc: {
				v: 0,
				t: "doub"
			}
		},
		t: "Objc"
	}
}];

