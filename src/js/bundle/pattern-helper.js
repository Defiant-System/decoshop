
var PatternHelper = {};
PatternHelper.KO = function(l, d) {
	function G(l, J) {
		if (l == null || !l.masterFXSwitch.v) return null;
		var n = l[J].v,
			r;
		if (n.length != 0) {
			r = n[0].v;
			if (!r.enab.v) r = null
		}
		return r
	}
	var b = d.SoCo,
		V = d.GdFl,
		Q = G(l, "solidFillMulti"),
		t = G(l, "gradientFillMulti");
	if (Q == null && t == null) return [b, V];
	var I = PatternHelper.avr;
	if (b && Q && t == null) {
		var y = JSON.parse(JSON.stringify(b));
		y.Clr.v = I(Q.Clr.v, b.Clr.v, Q);
		return [y, null]
	}
	if (V && Q && t == null) {
		var e = JSON.parse(JSON.stringify(V)),
			M = e.Grad.v.Clrs.v;
		for (var A = 0; A < M.length; A++) {
			var R = M[A].v.Clr;
			R.v = I(Q.Clr.v, R.v, Q)
		}
		return [null, e]
	}
	if (b && t) {
		var e = JSON.parse(JSON.stringify(t)),
			M = e.Grad.v.Clrs.v;
		for (var A = 0; A < M.length; A++) {
			var R = M[A].v.Clr;
			R.v = I(R.v, b.Clr.v, t)
		}
		return [null, e]
	}
	return [Q, t]
};
PatternHelper.ass = {
	oM: PixelUtil.allocBytes(4),
	tB: PixelUtil.allocBytes(4),
	o: new Rect(0, 0, 1, 1)
};
PatternHelper.avr = function(l, d, G) {
	var b = au.bS(G.Md.v.BlnM),
		V = G.Opct.v.val / 100,
		Q = PatternHelper.ass;
	l = PixelUtil.color.sampleGradientColor(l);
	d = PixelUtil.color.sampleGradientColor(d);
	Q.oM[0] = l.o;
	Q.oM[1] = l.J;
	Q.oM[2] = l.k;
	Q.oM[3] = 255;
	Q.tB[0] = d.o;
	Q.tB[1] = d.J;
	Q.tB[2] = d.k;
	Q.tB[3] = 255;
	PixelUtil.blend.compositeBlend(b, Q.oM, Q.o, Q.tB, Q.o, Q.o, V);
	return {
		classID: "RGBC",
		Rd: {
			t: "doub",
			v: Q.tB[0]
		},
		Grn: {
			t: "doub",
			v: Q.tB[1]
		},
		Bl: {
			t: "doub",
			v: Q.tB[2]
		}
	}
};
PatternHelper.aAA = function(l, d, G) {
	var b = l;
	l = l.slice(0);
	var V = au.CP[au.Point2D.indexOf(d.Md.v.BlnM)],
		Q = PixelUtil.color.sampleGradientColor(d.Clr.v),
		t = 4278190080 | Math.round(Q.k) << 16 | Math.round(Q.J) << 8 | Math.round(Q.o),
		I = PixelUtil.allocBytes(G.O() * 4);
	PixelUtil.andMaskUint32(I, t);
	PixelUtil.blend.compositeBlend(V, I, G, l, G, G, d.Opct.v.val / 100);
	for (var A = 0; A < l.length; A += 4) l[A + 3] = b[A + 3];
	return l
};
PatternHelper.es = function(l, d) {
	var G = ["Sz", "blur", "Sftn", "Dstn"];
	for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) {
		var b = LayerStyleConstants.effectOrder[A],
			V = l[LayerStyleConstants.effectMultiKeys[A]].v;
		for (var Q = 0; Q < V.length; Q++) {
			var t = V[Q].v;
			for (var I = 0; I < G.length; I++) {
				var y = t[G[I]];
				if (y) {
					var e = y.v.val,
						M = e;
					M = Math.max(e == 0 ? 0 : 1, M * d);
					if (b == "ChFX") M = Math.min(M, 250);
					if (b == "ebbl") {
						if (G[I] == "blur") M = Math.min(M, 250);
						if (G[I] == "Sftn") M = Math.min(M, 16)
					}
					y.v.val = Math.round(M)
				}
			}
			if (b == "ebbl" || b == "patternFill" || b == "FrFX")
				if (t.Ptrn && t.Scl) t.Scl.v.val = Math.max(1, Math.min(1e3, t.Scl.v.val * d))
		}
	}
};
PatternHelper.a94 = function(l, d, G) {
	var b = new Rect(-.5, -.5, 1, 1);
	for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) {
		var V = LayerStyleConstants.effectOrder[A],
			Q = l[LayerStyleConstants.effectMultiKeys[A]].v;
		for (var t = 0; t < Q.length; t++) {
			var I = Q[t].v,
				R;
			if (!I.enab.v) continue;
			var y = I.blur ? I.blur.v.val + 1 : 0,
				e = I.Ckmt ? I.Ckmt.v.val / 100 : 0,
				M = Math.round(y * e);
			if (V == "DrSh" || V == "IrSh" && G) {
				R = new Rect(-.5, -.5, 1, 1);
				R.rC(y, y);
				PatternHelper.IA(R, I, d, 0)
			}
			if (V == "OrGl" || V == "IrGl" && G) {
				R = new Rect(-.5, -.5, 1, 1);
				R.rC(y, y)
			}
			if (V == "FrFX") {
				var J = PatternHelper.B6(I),
					n = J[1];
				if (G) n = Math.max(J[0], n);
				R = new Rect(-.5, -.5, 1, 1);
				R.rC(Math.ceil(n), Math.ceil(n))
			}
			if (V == "ebbl") {
				var y = I.blur.v.val,
					r = I.bvlS.v.BESl;
				if (r == "Embs" || r == "PlEb") y /= 2;
				var T = ["OtrB", "InrB", "Embs", "PlEb", "strokeEmboss"],
					j = ["SfBL", "PrBL", "Slmt"],
					g = ["In", "Out"],
					Y = I.bvlT.v.bvlT != "SfBL" ? y : y * .43,
					k = Math.round(y);
				R = new Rect(-k - 1, -k - 1, 2 * k + 2, 2 * k + 2)
			}
			if (G && V == "ChFX") {
				R = new Rect(-.5, -.5, 1, 1);
				R.rC(y, y);
				var F = R.clone();
				PatternHelper.IA(R, I, d, 0);
				PatternHelper.IA(F, I, d, Math.PI);
				R = R.Cw(F)
			}
			if (R) b = b.Cw(R)
		}
	}
	if (b.x != Math.ceil(b.x)) {
		b.x = Math.ceil(b.x);
		b.m -= 1
	}
	if (b.y != Math.ceil(b.y)) {
		b.y = Math.ceil(b.y);
		b.n -= 1
	}
	b.m = Math.floor(b.m);
	b.n = Math.floor(b.n);
	return b
};
PatternHelper.B6 = function(l) {
	var d = 0,
		G = 0,
		b = l.Styl.v.FStl,
		V = l.Sz.v.val;
	if (b == "OutF") G = V;
	if (b == "InsF") d = V;
	if (b == "CtrF") d = G = V / 2;
	return [d, G]
};
PatternHelper.abJ = function(l) {
	if (WebGLContext.webglAvailable && l.VO == null) {
		l.VO = new WebGLContext.RgbaTexture(l.We.m, l.We.n);
		l.VO.set(l.QI);
		delete l.QI;
		if (l.BX) {
			l.L2 = new WebGLContext.AlphaChannel(l.We.m, l.We.n);
			l.L2.set(l.BX);
			delete l.BX
		}
		if (l.b8) {
			l.cx = new WebGLContext.AlphaChannel(l.We.m, l.We.n);
			l.cx.set(l.b8);
			delete l.b8
		}
	}
};
PatternHelper.a07 = function(l) {
	if (l.VO) l.VO.delete();
	if (l.L2) l.L2.delete();
	if (l.cx) l.cx.delete()
};
PatternHelper.arX = function(l) {
	if (l.all == null) return;
	for (var A = 0; A < l.all.length; A++) {
		PatternHelper.a07(l.all[A])
	}
};
PatternHelper.aet = function(l, d, G, b, V, Q) {
	var t = PatternHelper._r(G, b, l, d, V, Q);
	for (var A = 0; A < t.all.length; A++) PatternHelper.abJ(t.all[A]);
	return t
};
PatternHelper.ar2 = function(l) {
	for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) {
		var d = LayerStyleConstants.effectOrder[A],
			G = LayerStyleConstants.effectMultiKeys[A],
			b = l[G].v;
		for (var V = 0; V < b.length; V++) {
			var Q = b[V].v;
			if (Q.enab.v && ["patternFill", "GrFl", "SoFi"].indexOf(d) == -1) return !0
		}
	}
	return !1
};
PatternHelper._r = function(l, d, G, b, V, Q) {
	if (Q == null) Q = b;
	var t = 0,
		I = 0;
	for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) {
		var y = LayerStyleConstants.effectOrder[A],
			e = LayerStyleConstants.effectMultiKeys[A],
			M = l[e].v;
		for (var R = 0; R < M.length; R++) {
			var J = M[R].v;
			if (y == "DrSh" && J.enab.v && J.Ckmt.v.val > 0 && J.blur.v.val > 0) t = Math.max(t, Math.ceil(J.Ckmt.v.val * J.blur.v.val / 100));
			if (y == "OrGl" && J.enab.v && J.Ckmt.v.val > 0 && J.blur.v.val > 0 && J.GlwT.v.BETE == "SfBL") t = Math.max(t, Math.ceil(J.Ckmt.v.val * J.blur.v.val / 100));
			if (y == "OrGl" && J.enab.v && J.blur.v.val > 0 && J.GlwT.v.BETE == "PrBL") t = Math.max(t, J.blur.v.val);
			if (y == "FrFX" && J.enab.v && J.Sz.v.val > 0) {
				if (J.Styl.v.FStl == "OutF") t = Math.max(t, J.Sz.v.val);
				if (J.Styl.v.FStl == "CtrF") t = Math.max(t, Math.ceil(J.Sz.v.val / 2));
				I = Math.max(I, PatternHelper.B6(J)[1])
			}
		}
	}
	var n = new PatternHelper.hG(G, b, t, PatternHelper.ar2(l)),
		r = -b.x,
		T = -b.y,
		j = {
			type: {},
			all: []
		};
	for (var g = 0; g < LayerStyleConstants.effectOrder.length; g++) {
		var y = LayerStyleConstants.effectOrder[g],
			e = LayerStyleConstants.effectMultiKeys[g];
		j.type[y] = [];
		for (var Y = l[e].v.length - 1; Y >= 0; Y--) {
			var k = l[e].v[Y].v,
				H;
			if (!k.enab.v) continue;
			var F = k.blur ? k.blur.v.val : 0,
				D = k.Ckmt ? k.Ckmt.v.val / 100 : 0,
				q = F * D;
			if (y == "DrSh") {
				var W = n.je(q, F - q, !0),
					Z = W.uD,
					B = W.vD.clone();
				PatternHelper.hO(Z, k, !1);
				if (k.Cntn && k.Cntn.v) {
					var a = new Rect;
					PatternHelper.IA(a, k, V, 0);
					var m = B.clone();
					m.offset(-a.x, -a.y);
					m = m.Cw(B);
					var p = PixelUtil.allocBytes(m.O());
					PixelUtil.copyBufferRect(Z, B, p, m);
					var c = Math.sqrt(a.x * a.x + a.y * a.y),
						v = Z.slice(0);
					for (var A = 0; A < c - 1; A++) {
						var i = Math.round(-a.x * A / c),
							z = Math.round(-a.y * A / c),
							P = W.vD.clone();
						P.offset(i, z);
						PixelUtil.maxBlendMaskRect(v, P, p, m)
					}
					Z = p;
					B = m
				}
				B.offset(r, T);
				PatternHelper.IA(B, k, V, 0);
				var C = PixelUtil.allocBytes(B.O() * 4);
				PatternHelper.G4(C, k.Clr.v);
				PixelUtil.writeChannelToRgba(Z, C, 3);
				H = {
					QI: C,
					We: B,
					abH: k.layerConceals.v
				}
			} else if (y == "IrSh") {
				var W = n.je(q, F - q, !1);
				PatternHelper.IA(W.vD, k, V, 0);
				var B = n.rect().clone(),
					Z = PixelUtil.allocBytes(B.O());
				Z.fill(255);
				PixelUtil.copyBufferRect(W.uD, W.vD, Z, B);
				PatternHelper.hO(Z, k, !0, !0);
				var C = PixelUtil.allocBytes(B.O() * 4);
				PatternHelper.G4(C, k.Clr.v);
				PixelUtil.writeChannelToRgba(Z, C, 3);
				B.offset(r, T);
				H = {
					QI: C,
					We: B
				}
			} else if (y == "GrFl") {
				var C = PixelUtil.allocBytes(n.rect().O() * 4);
				PatternHelper.DQ(k, C, n.rect(), V, null, Q);
				var B = n.rect().clone();
				B.offset(r, T);
				H = {
					QI: C,
					We: B
				}
			} else if (y == "SoFi") {
				var C = PixelUtil.allocBytes(n.uD().length * 4);
				PatternHelper.G4(C, k.Clr.v);
				var B = n.rect().clone();
				B.offset(r, T);
				H = {
					QI: C,
					We: B
				}
			} else if (y == "ebbl") {
				var h = !1;
				if (h) console.log(k);
				var L = Date.now(),
					U = k.bvlS.v.BESl;
				if (U == "strokeEmboss") {
					var S = l.frameFXMulti.v;
					if (S.length == 0) continue;
					S = S[0].v;
					if (!S.enab.v) continue;
					var E = S.Styl.v.FStl;
					if (E == "OutF") U = "OtrB";
					if (E == "CtrF") U = "Embs";
					if (E == "InsF") U = "InrB"
				}
				var F = k.blur.v.val;
				if (F == 0) F = .7;
				if (U == "Embs" || U == "PlEb") F /= 2;
				var x = ["OtrB", "InrB", "Embs", "PlEb", "strokeEmboss"],
					K = ["SfBL", "PrBL", "Slmt"],
					u = ["In", "Out"],
					bC = k.bvlT.v.bvlT != "SfBL" ? F : F * .45,
					O = Math.round(F),
					$ = n.rect().clone(),
					gX = $.clone();
				gX.rC(O, O);
				var _ = gX.m,
					jI = gX.n,
					iw = _ * jI,
					hn = PixelUtil.allocBytes(iw);
				PixelUtil.copyBufferRect(n.uD(), $, hn, gX);
				var jq = new Float64Array(iw),
					iv = new Float64Array(iw);
				PixelUtil.style.iU(hn, jq, _, jI);
				PixelUtil.invertUint32Buffer(hn);
				PixelUtil.style.iU(hn, iv, _, jI);
				if (h) console.log("distTransform computed", Date.now() - L);
				for (var A = 0; A < iw; A++) iv[A] = iv[A] - jq[A];
				for (var A = 0; A < iw; A++) {
					var kq = iv[A];
					if (kq < -bC) iv[A] = -bC;
					else if (kq > bC) iv[A] = bC
				}
				if (h) console.log("summing + cropping", Date.now() - L);
				if (k.bvlT.v.bvlT == "SfBL") {
					var eE = Math.pow(F * .21, 1.22);
					if (!0) eE = Math.max(eE, 2);
					var e8 = PixelUtil.sX.pE(eE, 2);
					PixelUtil.sX._D(iv, jq, gX, e8[0] >>> 1);
					PixelUtil.sX._D(jq, iv, gX, e8[1] >>> 1)
				}
				if (h) console.log("blurring", Date.now() - L);
				var aI = iv,
					dK = aI.slice(0);
				if (k.useShape.v) {
					var jC = Math.min(100, k.Inpr.v.val + 1) / 100;
					if (U != "OtrB" && U != "InrB") jC = 1;
					var d7 = PixelUtil.presetThumb.j0(k.MpgS.v.Crv.v, 2e3),
						ka = Math.round(2e3 / jC);
					d7 = PixelUtil.presetThumb.ax6(d7, ka, U == "InrB");
					var hS = .5 / bC;
					for (var A = 0; A < iw; A++) {
						var eH = aI[A],
							kA = .99999 * (eH + bC) * hS;
						aI[A] = -bC + 2 * bC * d7[~~(kA * (ka - 1))]
					}
					if (h) console.log("applying shape", Date.now() - L)
				}
				if (k.useTexture.v) {
					var gq = PixelUtil.allocBytes(_ * jI * 4);
					PatternHelper.s2(k, gq, gX, V.add.Patt, d);
					var hb = PixelUtil.allocBytes(_ * jI);
					PixelUtil.rgbaToGrayPlane(gq, hb);
					var ex = PixelUtil.allocBytes(_ * jI);
					PixelUtil.sX.w3(hb, ex, gX, 1);
					hb = ex;
					var fs = F * k.textureDepth.v.val * (1 / 100) * (1 / 255);
					if (k.InvT.v) fs = -fs;
					for (var A = 0; A < iw; A++) aI[A] += -fs * hb[A];
					if (h) console.log("applying texture", Date.now() - L)
				}
				var f_ = (k.bvlT.v.bvlT == "SfBL" ? 1 : .5) * (k.bvlD.v.BESs == "In" ? 1 : -1) * k.srgR.v.val / 100;
				for (var A = 0; A < iw; A++) aI[A] *= f_;
				if (h) console.log("scaling", Date.now() - L);
				var bD = k.uglg && k.uglg.v ? V.ie() : k.lagl.v.val;
				bD = bD * (Math.PI / 180);
				var ae = k.uglg && k.uglg.v ? V.Yf() : k.Lald.v.val;
				ae = ae * (Math.PI / 180);
				var em = Math.cos(bD) * Math.cos(ae),
					dY = -Math.sin(bD) * Math.cos(ae),
					f7 = Math.sin(ae),
					bM = new Float64Array(iw),
					iP = new Float64Array(iw),
					jp = U == "PlEb";
				for (var hG = 0; hG < jI; hG++)
					for (var hf = 0; hf < _; hf++) {
						var A = hG * _ + hf,
							d2 = 0,
							gu = 0,
							jt = 1;
						if (hG != 0 && hG != jI - 1 && hf != 0 && hf != _ - 1) {
							var ip = aI[A - _ - 1],
								aQ = aI[A - _ + 1],
								iL = aI[A + _ - 1],
								jx = aI[A + _ + 1];
							d2 = -.125 * (aQ + 2 * aI[A + 1] + jx - (ip + 2 * aI[A - 1] + iL));
							gu = -.125 * (iL + 2 * aI[A + _] + jx - (ip + 2 * aI[A - _] + aQ))
						} else {
							var ep = aI[A];
							gu = -(hG == 0 ? aI[A + _] - ep : hG == jI - 1 ? ep - aI[A - _] : .5 * (aI[A + _] - aI[A - _]));
							d2 = -(hf == 0 ? aI[A + 1] - ep : hf == _ - 1 ? ep - aI[A - 1] : .5 * (aI[A + 1] - aI[A - 1]))
						}
						var gz = 1 / Math.sqrt(d2 * d2 + gu * gu + 1);
						d2 *= gz;
						gu *= gz;
						jt *= gz;
						var ed = d2 * em + gu * dY + jt * f7,
							bo = ed;
						if (jp) bo = -d2 * em - gu * dY + jt * f7;
						if (ed > 0) bM[A] = ed;
						if (bo > 0) iP[A] = bo
					}
				if (h) console.log("raycasting", Date.now() - L);
				if (k.Sftn.v.val != 0) {
					PixelUtil.sX.sU(bM, jq, gX, k.Sftn.v.val * .43);
					var d0 = jq,
						jq = bM,
						bM = d0;
					if (jp) {
						PixelUtil.sX.sU(iP, jq, gX, k.Sftn.v.val * .43);
						var d0 = jq,
							jq = iP,
							iP = d0
					} else PixelUtil.copyByteBuffer(bM, iP)
				}
				if (h) console.log("softening", Date.now() - L);
				var d7 = PixelUtil.presetThumb.j0(k.TrnS.v.Crv.v, 1024);
				for (var A = 0; A < iw; A++) {
					bM[A] = d7[~~(bM[A] * 1024)];
					iP[A] = d7[~~(iP[A] * 1024)]
				}
				if (h) console.log("contour remap", Date.now() - L);
				_ = Math.round(_);
				jI = Math.round(jI);
				var c0 = PixelUtil.allocBytes(_ * jI * 4);
				PatternHelper.G4(c0, k.hglC.v);
				var cv = PixelUtil.allocBytes(_ * jI * 4);
				PatternHelper.G4(cv, k.sdwC.v);
				var iH = PixelUtil.allocBytes(_ * jI * 4);
				PatternHelper.G4(iH, k.hglC.v);
				var bS = PixelUtil.allocBytes(_ * jI * 4);
				PatternHelper.G4(bS, k.sdwC.v);
				var gg = 1 / f7,
					bG = 1 / (1 - f7),
					hS = 1 / bC,
					jj = new Float64Array(1e3);
				for (var A = 0; A < 1e3; A++) jj[A] = Math.pow(A * .001, .2);
				for (var hG = 0; hG < jI; hG++)
					for (var hf = 0; hf < _; hf++) {
						var A = hG * _ + hf,
							ay = 4 * A + 3,
							cH = 0,
							e6 = 0;
						cH = bM[A];
						e6 = iP[A];
						var fi = Math.max(0, Math.min(.9999, (dK[A] + bC * .993) * hS));
						fi = jj[Math.floor(fi * 1e3)];
						var et = fi * (1 - Math.min(1, cH * gg)),
							aD = fi * (1 - Math.min(1, (1 - cH) * bG)),
							c7 = fi * (1 - Math.min(1, e6 * gg)),
							ga = fi * (1 - Math.min(1, (1 - e6) * bG));
						cv[ay] = Math.round(255 * et);
						c0[ay] = Math.round(255 * aD);
						bS[ay] = Math.round(255 * c7);
						iH[ay] = Math.round(255 * ga)
					}
				if (h) console.log("baking textures", Date.now() - L);
				gX = n.rect().clone();
				gX.rC(O, O);
				gX.offset(r, T);
				H = {
					aoZ: k.bvlS.v.BESl == "strokeEmboss"
				};
				var cY = au.bS(k.hglM.v.BlnM),
					i4 = k.hglO.v.val / 100,
					jS = au.bS(k.sdwM.v.BlnM),
					e7 = k.sdwO.v.val / 100;
				if (["InrB", "Embs", "PlEb"].indexOf(U) != -1) {
					H.Ei = {
						QI: c0,
						We: gX,
						xm: cY,
						Si: i4
					};
					H.p9 = {
						QI: cv,
						We: gX,
						xm: jS,
						Si: e7
					}
				}
				if (["OtrB", "Embs", "PlEb"].indexOf(U) != -1) {
					H.l2 = {
						QI: iH,
						We: gX,
						xm: cY,
						Si: i4
					};
					H.gp = {
						QI: bS,
						We: gX,
						xm: jS,
						Si: e7
					}
				}
				if (h) console.log(Date.now() - L)
			} else if (y == "patternFill") {
				var ct = n.rect(),
					C = PixelUtil.allocBytes(ct.O() * 4);
				PatternHelper.s2(k, C, ct, V.add.Patt, d);
				var B = ct.clone();
				B.offset(r, T);
				H = {
					QI: C,
					We: B
				}
			} else if (y == "ChFX") {
				var C = PixelUtil.allocBytes(n.uD().length * 4);
				PatternHelper.G4(C, k.Clr.v);
				var F = k.blur.v.val,
					bj = n.rect().clone();
				bj.rC(F, F);
				var jo = PixelUtil.allocBytes(bj.O()),
					er = PixelUtil.allocBytes(bj.O());
				PixelUtil.copyBufferRect(n.uD(), n.rect(), er, bj);
				PixelUtil.sX.Dj(er, jo, bj, F * .43);
				var iV = PixelUtil.presetThumb.d_(k.MpgS.v.Crv.v, 256, !0);
				PixelUtil.remapChannelsUint32(jo, iV);
				var h_ = PixelUtil.allocBytes(n.uD().length),
					i2 = PixelUtil.allocBytes(n.uD().length),
					kj = n.rect().clone();
				PatternHelper.IA(kj, k, V, 0);
				PixelUtil.copyBufferRect(jo, bj, h_, kj);
				kj = n.rect().clone();
				PatternHelper.IA(kj, k, V, Math.PI);
				PixelUtil.copyBufferRect(jo, bj, i2, kj);
				var a3 = h_.length;
				for (var A = 0; A < a3; A++) C[4 * A + 3] = Math.abs(h_[A] - i2[A]);
				if (k.Invr.v)
					for (var A = 0; A < a3; A++) C[4 * A + 3] = 255 - C[4 * A + 3];
				var B = n.rect().clone();
				B.offset(r, T);
				H = {
					QI: C,
					We: B
				}
			} else if (y == "OrGl") {
				var W;
				if (k.GlwT.v.BETE == "SfBL") W = n.je(q, F - q, !0);
				else W = n.af$(F, D, !0);
				var Z = W.uD,
					B = W.vD,
					ke = Z.slice(0);
				PatternHelper.asK(Z, k);
				var C = PixelUtil.allocBytes(B.O() * 4);
				if (k.Grad == null) {
					PatternHelper.G4(C, k.Clr.v);
					PatternHelper.hO(Z, k, !1)
				} else {
					PatternHelper.hO(Z, k, null);
					var b1 = {
						pr: Z,
						pW: 255,
						qx: 0,
						B7: B
					};
					PatternHelper.DQ(k, C, B, V, b1);
					var fb = k.Nose.v.val / 100,
						eg = B.m;
					for (var A = 0; A < ke.length; A++) {
						var gK = 255,
							cN = ke[A];
						if (cN < 32) {
							var iO = (cN + ke[A - 1] + ke[A + 1] + ke[A - eg] + ke[A + eg]) * .2 - 1;
							gK = Math.min(255, Math.round(Math.max(0, iO) * 8))
						}
						Z[A] = gK
					}
					PatternHelper.atl(Z, k)
				}
				PixelUtil.writeChannelToRgba(Z, C, 3);
				B.offset(r, T);
				H = {
					QI: C,
					We: B
				}
			} else if (y == "IrGl") {
				var W;
				if (k.GlwT.v.BETE == "SfBL") W = n.je(q, F - q, !1);
				else W = n.af$(F, D, !1);
				var Z = W.uD,
					B = W.vD;
				PatternHelper.asK(Z, k);
				if (k.glwS.v.IGSr == "SrcC") PixelUtil.invertUint32Buffer(Z);
				var C = PixelUtil.allocBytes(B.O() * 4);
				if (k.Grad == null) {
					PatternHelper.G4(C, k.Clr.v);
					PatternHelper.hO(Z, k, !0)
				} else {
					PatternHelper.hO(Z, k, null);
					var b1 = {
						pr: Z,
						pW: 255,
						qx: 0,
						B7: B
					};
					PatternHelper.DQ(k, C, B, V, b1);
					Z.fill(255);
					PatternHelper.atl(Z, k)
				}
				PixelUtil.writeChannelToRgba(Z, C, 3);
				B.offset(r, T);
				H = {
					QI: C,
					We: B
				}
			} else if (y == "FrFX") {
				var b6 = PatternHelper.B6(k),
					j7 = b6[0],
					iM = b6[1],
					B = n.rect().clone(),
					jr = null,
					bH = null;
				B.rC(Math.ceil(I), Math.ceil(I));
				if (iM > 0) {
					var W = n.je(iM, 0, !0);
					bH = W.uD;
					if (bH.length < B.O()) {
						bH = PixelUtil.allocBytes(B.O());
						PixelUtil.copyBufferRect(W.uD, W.vD, bH, B)
					}
				}
				if (j7 > 0) {
					var W = n.je(j7, 0, !1);
					jr = PixelUtil.allocBytes(B.O());
					jr.fill(255);
					PixelUtil.copyBufferRect(W.uD, W.vD, jr, B)
				}
				B.offset(r, T);
				var C = PixelUtil.allocBytes(B.O() * 4),
					gi = k.PntT.v.FrFl;
				if (gi == "SClr") PatternHelper.G4(C, k.Clr.v);
				if (gi == "GrFl") PatternHelper.DQ(k, C, B, V, n.a8J(j7, iM));
				if (gi == "Ptrn") PatternHelper.s2(k, C, B, V.add.Patt, d);
				H = {
					QI: C,
					We: B,
					b8: bH,
					BX: jr
				}
			}
			j.type[y].push(H);
			if (y == "ebbl") {
				if (H.Ei) j.all.push(H.Ei, H.p9);
				if (H.l2) j.all.push(H.l2, H.gp)
			} else {
				H.xm = au.bS(k.Md.v.BlnM);
				H.Si = k.Opct.v.val / 100, j.all.push(H)
			}
		}
	}
	return j
};
PatternHelper.HW = function(l) {
	var d = 1 / Math.sqrt(l.x * l.x + l.y * l.y + l.V8 * l.V8);
	l.x *= d;
	l.y *= d;
	l.V8 *= d
};
PatternHelper.as1 = function(l, d) {
	return {
		x: l.y * d.V8 - l.V8 * d.y,
		y: l.V8 * d.x - l.x * d.V8,
		V8: l.x * d.y - l.y * d.x
	}
};
PatternHelper.ahS = function(l, d) {
	return l.x * d.x + l.y * d.y + l.V8 * d.V8
};
PatternHelper.atl = function(l, d) {
	var G = d.Nose.v.val / 100;
	if (G > 0)
		for (var A = 0; A < l.length; A++) {
			var b = l[A];
			b = Math.min(510 - (1 + G) * PixelUtil.style.b_(A), b);
			l[A] = b
		}
};
PatternHelper.fS = function(l) {
	var d = PatternHelper.Ip(),
		G = l.channelRectDefaults,
		b = !1;
	for (var A = 0; A < 32; A += 8)
		if (G[A] + G[A + 1] + G[A + 4] + G[A + 5] != 0 || G[A + 2] + G[A + 3] + G[A + 6] + G[A + 7] != 1020) b = !0;
	if (b) {
		G = G.slice(0);
		for (var A = 0; A < 40; A += 4) {
			var V = G[A] / 255,
				Q = G[A + 1] / 255,
				t = G[A + 2] / 255,
				I = G[A + 3] / 255;
			G[A] = V - .001;
			G[A + 1] = V == Q ? 1e6 : 1 / (Q - V);
			G[A + 2] = t == I ? -1e6 : 1 / (t - I);
			G[A + 3] = I + .001
		}
	}
	var y = l.add.iOpa != null ? l.add.iOpa / 255 : d.fill,
		e = l.add.vstk;
	if (e && !e.fillEnabled.v && (!e.strokeEnabled.v || e.strokeStyleLineWidth.v.val == 0)) y = 0;
	return {
		fill: y,
		bc: b ? G : null,
		cD: l.add.brst != null ? l.add.brst : d.cD,
		acW: l.add.knko != null ? l.add.knko : d.acW,
		style: !1,
		x4: !1
	}
};
PatternHelper.Ip = function() {
	return {
		fill: 1,
		bc: null,
		cD: [1, 1, 1],
		acW: 0,
		style: !1,
		x4: !1
	}
};
PatternHelper.a4y = function(l, d, G, b, V, Q, t, I) {
	if (I == null) I = 1;
	if (t == null) t = new Matrix2D;
	var y = l.Rj[1].m,
		e = l.Rj[1].n,
		M = new Matrix2D,
		R = V < 2;
	if (R) M.translate(-y / 2, -e / 2);
	if (V == 0) {
		I *= Math.max(G / y, b / e)
	} else if (V == 1) {
		I *= Math.min(G / y, b / e)
	} else if (V == 2) {
		M.scale(1 / y, 1 / e);
		M.concat(t);
		M.scale(G, b)
	} else if (V == 3) {
		I = I
	}
	M.scale(I, I);
	if (R) M.translate(G / 2, b / 2);
	M.concat(Q);
	d.Ptrn.v.Idnt.v = l.id;
	d.Scl.v.val = Math.round(100 * M.Nw());
	d.Angl.v.val = Math.round(180 * Math.atan2(-M.k, M.aS) / Math.PI);
	d.Algn.v = !0;
	var J = d.phase.v;
	J.Hrzn.v = Math.round(M.cI);
	J.Vrtc.v = Math.round(M.xu)
};
PatternHelper.xQ = function(l, d) {
	if (d == null) return null;
	var G = l.Idnt.v,
		b = l.Nm.v;
	for (var A = 0; A < d.length; A++)
		if (d[A].id == G) return d[A];
	for (var A = 0; A < d.length; A++)
		if (d[A].name == b) return d[A];
	return null
};
PatternHelper.afI = function(l, d, G) {
	var b = ["patternFillMulti", "ebblMulti", "frameFXMulti"];
	for (var A = 0; A < b.length; A++) {
		var V = l.v[b[A]].v;
		for (var Q = 0; Q < V.length; Q++)
			if (V[Q].v.Ptrn) d.wJ(PatternHelper.xQ(V[Q].v.Ptrn.v, G))
	}
};
PatternHelper.aeG = function(l, d, G) {
	var b = ["patternFillMulti", "ebblMulti", "frameFXMulti"];
	for (var A = 0; A < b.length; A++) {
		var V = l.v[b[A]].v;
		for (var Q = 0; Q < V.length; Q++)
			if (V[Q].v.Ptrn) {
				var t = V[Q].v.Ptrn.v,
					I = PatternHelper.xQ(t, G),
					y = PatternHelper.xQ(t, d.add.Patt);
				if (I == null && y) G.push(y)
			}
	}
};
PatternHelper.s2 = function(l, d, G, b, V) {
	var Q = PatternHelper.xQ(l.Ptrn.v, b);
	if (Q != null && !G.W6()) {
		var t = Q.Rj,
			I = t[0],
			y = t[1],
			e = 0;
		PixelUtil.pyramidDownsampleRgba(t);
		var M = (l.Scl ? l.Scl.v.val : 100) / 100;
		while ((M < .3 || M == .5) && t[e + 2]) {
			M *= y.m / t[e + 3].m;
			e += 2;
			I = t[e];
			y = t[e + 1]
		}
		var R = PixelUtil.scale.s2(I, y.m, y.n),
			J = l.phase ? l.phase.v : {
				Hrzn: {
					v: 0
				},
				Vrtc: {
					v: 0
				}
			},
			n = l.Angl ? l.Angl.v.val : 0,
			r = -G.x + J.Hrzn.v - 1,
			T = -G.y + J.Vrtc.v - 1;
		if (l.Algn != null && !l.Algn.v) {} else {
			r += V.x;
			T += V.y
		}
		if (d) PixelUtil.scale.akB(R, d, G.m, G.n, M, M, r + 1, T + 1, n * Math.PI / 180);
		else return [R, M, r + 1, T + 1, n * Math.PI / 180]
	}
};
PatternHelper.DQ = function(l, d, G, b, V, Q) {
	if (Q == null) Q = G;
	var t = l.Type ? l.Type.v.GrdT : "shapeburst",
		I = l.Algn && l.Algn.v ? Q : new Rect(0, 0, b.m, b.n),
		y = l.Angl ? PixelUtil.color.gradientLineEndpoints(l, I) : [new Point2D(0, 0), new Point2D(100, 0)],
		e = y[0].x,
		M = y[0].y,
		R = y[1].x - e,
		J = y[1].y - M,
		n = Math.sqrt(R * R + J * J);
	n = 1 / (2 * n * n);
	var r = [R * n, J * n, -J * n, R * n],
		T = l.Rvrs ? l.Rvrs.v : !1,
		j = l.Dthr ? l.Dthr.v : !1;
	PixelUtil.color.renderGradient(l.Grad.v, d, G, r, e, M, T, LayerStyleConstants.gradientType.types.indexOf(t), 0, 0, V, j)
};
PatternHelper.ams = function(l, d, G) {
	for (var A = 0; A < l.all.length; A++) {
		var b = l.all[A];
		b.yz = b.We.clone();
		b.yz.offset(d, G)
	}
};
PatternHelper.avZ = function(l, d, G, b, V, Q) {
	var t = WebGLContext.webglAvailable ? PatternHelper.afs : PatternHelper.aak;
	PatternHelper.ams(d, G.x, G.y);
	var I = d.type.DrSh;
	for (var A = 0; A < I.length; A++)
		if (!I[A].abH) t(I[A], b, V, Q)
};
PatternHelper.afx = function(l, d, G, b, V, Q, t, I, y, e) {
	var M = G,
		R = WebGLContext.webglAvailable ? PatternHelper.afs : PatternHelper.aak,
		J = WebGLContext.webglAvailable ? WebGLContext.s.yp : PixelUtil.blend.aX,
		n;
	n = d.type.DrSh;
	for (var A = 0; A < n.length; A++)
		if (n[A].abH) R(n[A], b, V, Q);
	n = d.type.OrGl;
	for (var A = 0; A < n.length; A++) R(n[A], b, V, Q);
	var r = "patternFill GrFl SoFi ChFX IrGl IrSh".split(" ");
	for (var T = 0; T < r.length; T++) {
		var n = d.type[r[T]];
		for (var A = 0; A < n.length; A++) R(n[A], t, M, Q)
	}
	var j = d.type.ebbl[0],
		g = j != null && j.aoZ;
	n = d.type.FrFX;
	for (var A = 0; A < n.length; A++) {
		var Y = n[A];
		LayerTreeNode.fu.IY(I, e, y, e, Q);
		R(Y, y, e, Q);
		if (g && A == n.length - 1) {
			if (j.gp) R(j.gp, y, e, Q);
			if (j.l2) R(j.l2, y, e, Q);
			if (j.p9) R(j.p9, y, e, Q);
			if (j.Ei) R(j.Ei, y, e, Q)
		}
		if (Y.BX || Y.L2) J(y, e, t, M, WebGLContext.webglAvailable ? Y.L2 : Y.BX, Y.yz, 0, Q, 1);
		if (Y.b8 || Y.cx) J(y, e, b, V, WebGLContext.webglAvailable ? Y.cx : Y.b8, Y.yz, 0, Q, 1)
	}
	if (!g && j != null) {
		if (j.gp) R(j.gp, b, V, Q);
		if (j.l2) R(j.l2, b, V, Q);
		if (j.p9) R(j.p9, t, M, Q);
		if (j.Ei) R(j.Ei, t, M, Q)
	}
};
PatternHelper.aak = function(l, d, G, b) {
	var V = PatternHelper.Ip();
	V.fill = l.Si;
	V.style = !0;
	PixelUtil.blend.compositeBlend(l.xm, l.QI, l.yz, d, G, b, 1, V)
};
PatternHelper.afs = function(l, d, G, b) {
	var V = PatternHelper.Ip();
	V.fill = l.Si;
	V.style = !0;
	WebGLContext.s.ow(l.xm, l.VO, l.yz, d, G, b, 1, V)
};
PatternHelper.asK = function(l, d) {
	var G = 1 - d.Inpr.v.val / 100,
		b = 1 + Math.tan(G * (Math.PI / 2)),
		V = l.length;
	for (var A = 0; A < V; A++) l[A] = Math.min(255, Math.round(l[A] * b))
};
PatternHelper.hO = function(l, d, G, b) {
	var V = d.blur.v.val,
		Q = Math.round(V * (d.Ckmt.v.val / 100));
	if (V > Q) {
		var t = PixelUtil.presetThumb.d_(d.TrnS.v.Crv.v, 256, b != !0);
		PixelUtil.remapChannelsUint32(l, t)
	}
	if (G != null && d.Nose.v.val > 0) PixelUtil.style.kW(l, d.Nose.v.val / 100, G)
};
PatternHelper.G4 = function(l, d, G) {
	if (G == null) G = 255;
	var b = PixelUtil.color.sampleGradientColor(d),
		V = G << 24 | b.k << 16 | b.J << 8 | b.o,
		Q = new Uint32Array(l.buffer);
	Q.fill(V)
};
PatternHelper.IA = function(l, d, G, b) {
	var V = d.uglg && d.uglg.v ? G.ie() : d.lagl.v.val;
	V = V * Math.PI / 180 + b;
	var Q = Math.cos(V) * d.Dstn.v.val,
		t = Math.sin(V) * d.Dstn.v.val;
	l.x -= Math.round(Q);
	l.y += Math.round(t)
};
PatternHelper.bd = function(l) {
	if (l == null) return null;
	var d = l.frameFXMulti.v;
	if (d.length == 0) return null;
	d = d[0].v;
	var G = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default));
	PatternHelper.alP(d, G);
	return G
};
PatternHelper.alP = function(l, d) {
	var G = LayerStyleConstants.strokeOptions.paintTypes.indexOf(l.PntT.v.FrFl),
		b = [LayerStyleConstants.solidColorContentKeys, LayerStyleConstants.gradientContentKeys, LayerStyleConstants.patternContentKeys][G],
		V = d.strokeStyleContent.v = {
			classID: LayerStyleConstants.strokeStyle.contentLayerClassIDs[G]
		};
	for (var A = 0; A < b.length; A++) V[b[A]] = l[b[A]];
	d.strokeEnabled = l.enab;
	d.strokeStyleLineWidth = l.Sz;
	d.strokeStyleLineAlignment.v.strokeStyleLineAlignment = LayerStyleConstants.strokeStyle.lineAlignmentTypes[LayerStyleConstants.strokeOptions.positionTypes.indexOf(l.Styl.v.FStl)];
	d.strokeStyleOpacity = l.Opct;
	d.strokeStyleBlendMode = l.Md;
	d.strokeStyleLineJoinType.v.strokeStyleLineJoinType = "strokeStyleRoundJoin"
};
PatternHelper.CB = function(l, d) {
	var G = [];
	for (var A = 0; A < l.length; A++) G.push({
		t: "UntF",
		v: {
			type: "#Nne",
			val: Math.round(l[A] * d)
		}
	});
	return G
};
PatternHelper.at4 = function(l, d) {
	var G = l.opacity / 255 * (l.add.iOpa ? l.add.iOpa / 255 : 1),
		b = l.add.TySh,
		V = l.IQ() || l.VF() && l.add.vmsk && l.add.vstk.fillEnabled.v && l.add.vstk.strokeEnabled.v;
	if (b) {
		var Q = b.zC.EngineDict.StyleRun.RunArray,
			t = Q[0].StyleSheet.StyleSheetData,
			I = 0;
		if (t.FillFlag) I++;
		if (t.StrokeFlag) I++;
		if (t._FillBackgroundFlag) I++;
		if (I > 1) V = !0
	}
	return V && (d || G != 1 || l.blendModeKey != "pass" && l.blendModeKey != "norm")
};
PatternHelper.hG = function(l, d, G, b) {
	this.W3 = d.clone();
	this.aeb = d.clone();
	this.aeb.rC(G, G);
	if (b) {
		this.W3.rC(1, 1);
		this.hZ = PixelUtil.allocBytes(this.W3.O());
		PixelUtil.copyBufferRect(l, d, this.hZ, this.W3)
	} else this.hZ = l;
	this.DJ = null;
	this.gj = null;
	this.dl = null
};
PatternHelper.hG.prototype.uD = function() {
	return this.hZ
};
PatternHelper.hG.prototype.rect = function() {
	return this.W3
};
PatternHelper.hG.prototype.o5 = function() {
	return this.aeb
};
PatternHelper.hG.prototype.VB = function() {
	if (this.DJ) return this.DJ;
	this.DJ = this.uD().slice(0);
	PixelUtil.invertUint32Buffer(this.DJ);
	return this.DJ
};
PatternHelper.hG.prototype.UD = function() {
	if (this.gj) return this.gj;
	this.gj = new Float64Array(this.rect().O());
	PixelUtil.style.iU(this.VB(), this.gj, this.rect().m, this.rect().n);
	return this.gj
};
PatternHelper.hG.prototype.n6 = function() {
	if (this.dl) return this.dl;
	var l = this.o5(),
		d = PixelUtil.allocBytes(l.O());
	PixelUtil.copyBufferRect(this.uD(), this.rect(), d, l);
	this.dl = new Float64Array(l.O());
	PixelUtil.style.iU(d, this.dl, l.m, l.n);
	return this.dl
};
PatternHelper.hG.prototype.a8J = function(l, d) {
	var G = {
		pW: -d,
		qx: l,
		B7: null,
		pr: null
	};
	if (d == 0) {
		G.B7 = this.rect();
		G.pr = this.UD();
		return G
	}
	var b = this.n6().slice(0),
		V = this.o5();
	G.B7 = V;
	G.pr = b;
	for (var A = 0; A < b.length; A++) b[A] = -b[A];
	if (l == 0) return G;
	var Q = this.UD(),
		t = this.rect();
	for (var I = 0; I < t.n; I++)
		for (var y = 0; y < t.m; y++) {
			var e = I * t.m + y,
				M = (I + t.y - V.y) * V.m + y + t.x - V.x;
			b[M] += Q[e]
		}
	return G
};
PatternHelper.hG.prototype.je = function(l, d, G) {
	var b = Math.ceil(l + d),
		V = {
			vD: this.rect().clone(),
			uD: null
		};
	V.vD.rC(b, b);
	V.uD = PixelUtil.allocBytes(V.vD.O());
	if (l == 0 && d == 0) PixelUtil.copyByteBuffer(G ? this.uD() : this.VB(), V.uD);
	else {
		var Q = PixelUtil.allocBytes(V.vD.O());
		PixelUtil.copyBufferRect(this.uD(), this.rect(), Q, V.vD);
		if (!G) PixelUtil.invertUint32Buffer(Q);
		if (l != 0) {
			if (G) PixelUtil.style.Lr(Q, V.vD, this.n6(), this.o5(), l);
			else PixelUtil.style.Lr(Q, V.vD, this.UD(), this.rect(), l)
		}
		if (d != 0) PixelUtil.sX.Dj(Q, V.uD, V.vD, Math.max(1, d * .43));
		else V.uD = Q
	}
	return V
};
PatternHelper.hG.prototype.af$ = function(l, d, G) {
	var b = l * (d - .5),
		V = {
			vD: this.rect().clone(),
			uD: null
		};
	if (G) V.vD.rC(l, l);
	V.uD = PixelUtil.allocBytes(V.vD.O());
	var Q = V.vD.m,
		t = V.vD.n,
		I = G ? this.n6() : this.UD(),
		y = G ? this.o5() : this.rect(),
		e = V.vD,
		M = e.wD(y),
		Q = M.m,
		t = M.n,
		R = M.x - e.x,
		J = M.y - e.y,
		n = M.x - y.x,
		r = M.y - y.y,
		T = 1 - d * 2;
	for (var j = 0; j < t; j++)
		for (var g = 0; g < Q; g++) {
			var Y = I[(j + r) * y.m + g + n],
				k = Y / l;
			V.uD[(j + J) * e.m + g + R] = Math.max(0, Math.min(255, 255 - 255 * ((k + T) / (1 + T))))
		}
	return V
};
PatternHelper.acB = function(l, d, G, b) {
	var V = l.Lefx,
		Q = l.blendOptions;
	if (V) {
		var t = d.add.lmfx;
		if (G == null) G = t ? t.Scl.v.val : 100;
		d.add.lmfx = JSON.parse(JSON.stringify(V.v));
		if (d.add.lmfx.Scl == null) d.add.lmfx.Scl = {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 100
			}
		};
		PatternHelper.es(d.add.lmfx, G / d.add.lmfx.Scl.v.val);
		if (t) d.add.lmfx.Scl.v.val = t.Scl.v.val;
		var I = V.v.gagl;
		if (I && b) b.Sn(I.v.val)
	} else delete d.add.lmfx;
	if (Q) {
		Q = Q.v;
		if (Q.Md) d.blendModeKey = au.bS(Q.Md.v.BlnM);
		if (Q.Opct) d.opacity = Math.round(Q.Opct.v.val * 255 / 100);
		if (Q.fillOpacity) d.add.iOpa = Math.round(Q.fillOpacity.v.val * 255 / 100);
		if (Q.Blnd) {
			var y = [];
			for (var A = 0; A < 10; A++) y.push(0, 0, 255, 255);
			var e = Q.Blnd.v,
				M = "SrcB Srcl SrcW Srcm DstB Dstl DstW Dstt".split(" ");
			for (var A = 0; A < e.length; A++) {
				var R = e[A].v,
					J = 8 * ["Gry", "Rd", "Grn", "Bl"].indexOf(R.Chnl.v[0].v.enum);
				for (var n = 0; n < 8; n++) {
					y[J + n] = R[M[n]].v
				}
			}
			d.channelRectDefaults = y
		}
	}
};
PatternHelper.at$ = function(l) {
	var d = "SrcB Srcl SrcW Srcm DstB Dstl DstW Dstt".split(" "),
		G = [],
		b = l.channelRectDefaults;
	for (var A = 0; A < 4; A++) {
		var V = A * 8;
		if (b[V] + b[V + 1] + b[V + 4] + b[V + 5] == 0 && b[V + 2] + b[V + 3] + b[V + 6] + b[V + 7] == 4 * 255) continue;
		var Q = {
			t: "Objc",
			v: {
				classID: "Blnd",
				Chnl: {
					t: "obj ",
					v: [{
						t: "Enmr",
						v: {
							classID: "Chnl",
							typeID: "Chnl",
							enum: ["Gry", "Rd", "Grn", "Bl"][A]
						}
					}]
				}
			}
		};
		G.push(Q);
		for (var t = 0; t < 8; t++) Q.v[d[t]] = {
			t: "long",
			v: b[A * 8 + t]
		}
	}
	var I = {
		classID: "blendOptions"
	};
	if (l.blendModeKey != "norm") I.Md = {
		t: "enum",
		v: {
			BlnM: au.ci(l.blendModeKey)
		}
	};
	if (l.opacity != 255) I.Opct = {
		t: "UntF",
		v: {
			type: "#Prc",
			val: Math.round(l.opacity * 100 / 255)
		}
	};
	if (l.add.iOpa != null) I.fillOpacity = {
		t: "UntF",
		v: {
			type: "#Prc",
			val: Math.round(l.add.iOpa * 100 / 255)
		}
	};
	if (G.length != 0) I.Blnd = {
		t: "VlLs",
		v: G
	};
	var y = {
			Zc: {
				classID: "null",
				Idnt: {
					t: "TEXT",
					v: PsdDocument.Xb() + "-bd9f-11d5-b8ba-b73f8571793d"
				},
				Nm: {
					t: "TEXT",
					v: "Custom Style"
				}
			},
			x1: {
				classID: "Styl",
				blendOptions: {
					t: "Objc",
					v: I
				}
			}
		},
		e = l.add.lmfx;
	if (e) y.x1.Lefx = {
		t: "Objc",
		v: e
	};
	return y
};


	function es() {}
	es.hf = function(l) {
		return JSON.parse(JSON.stringify(l))
	};
	es._k = function(l) {
		var d = es.hf(es.age),
			G = d.Brsh.v;
		if (l != null) {
			delete G.Hrdn;
			G.classID = "sampledBrush";
			G.Nm = {
				t: "TEXT",
				v: "layer.png"
			}, G.sampledData = {
				t: "TEXT",
				v: l
			}
		}
		return d
	};
	es.age = {
		classID: "brushPreset",
		Nm: {
			t: "TEXT",
			v: "Custom Brush"
		},
		Brsh: {
			t: "Objc",
			v: {
				classID: "computedBrush",
				Dmtr: {
					t: "UntF",
					v: {
						type: "#Pxl",
						val: 15
					}
				},
				Hrdn: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 100
					}
				},
				Angl: {
					t: "UntF",
					v: {
						type: "#Ang",
						val: 0
					}
				},
				Rndn: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 100
					}
				},
				Spcn: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 25
					}
				},
				Intr: {
					t: "bool",
					v: !0
				},
				flipX: {
					t: "bool",
					v: !1
				},
				flipY: {
					t: "bool",
					v: !1
				}
			}
		},
		useTipDynamics: {
			t: "bool",
			v: !1
		},
		useScatter: {
			t: "bool",
			v: !1
		},
		dualBrush: {
			t: "Objc",
			v: {
				classID: "dualBrush",
				useDualBrush: {
					t: "bool",
					v: !1
				}
			}
		},
		brushGroup: {
			t: "Objc",
			v: {
				classID: "brushGroup",
				useBrushGroup: {
					t: "bool",
					v: !1
				}
			}
		},
		useTexture: {
			t: "bool",
			v: !1
		},
		usePaintDynamics: {
			t: "bool",
			v: !1
		},
		useColorDynamics: {
			t: "bool",
			v: !1
		},
		Wtdg: {
			t: "bool",
			v: !1
		},
		Nose: {
			t: "bool",
			v: !1
		},
		Rpt: {
			t: "bool",
			v: !1
		}
	};
	es.HW = {};
	es.HW.check = function(l) {
		var d = es.HW.jV;
		for (var A = 0; A < d.length; A++)
			if (l[d[A]] == null) l[d[A]] = JSON.parse(es.HW.vB[d[A]]);
		var G = [];
		for (var A = 0; A < d.length; A++) G.push(d[A]);
		var b = es.HW.a0k;
		for (var A = 0; A < b.length; A++) {
			var V = b[A][0],
				Q = b[A][1],
				t = !0;
			for (var I = 0; I < V.length; I++) t = t && l[V[I]].v == !0;
			if (t)
				for (var I = 0; I < Q.length; I++) {
					if (l[Q[I]] == null) console.log("Missing conditional parameter " + Q[I]);
					else G.push(Q[I])
				}
		}
		for (var y in l)
			if (G.indexOf(y) == -1) console.log("Extra parameter " + y);
		l = l.Brsh.v;
		d = es.HW.Q_.jV;
		for (var A = 0; A < d.length; A++)
			if (l[d[A]] == null) l[d[A]] = JSON.parse(es.HW.Q_.vB[d[A]]);
		G = [];
		for (var A = 0; A < d.length; A++)
			if (l[d[A]]) G.push(d[A]);
			else console.log("Missing default parameter " + d[A]);
		b = es.HW.Q_.awh[l.classID];
		for (var A = 0; A < b.length; A++)
			if (l[b[A]] == null && b[A] != "dtipsGridSize" && b[A] != "dtipsErodibleTipHeightMap" && l.acH != 1) console.log("Missing conditional parameter " + b[A]);
			else G.push(b[A]);
		for (var y in l)
			if (G.indexOf(y) == -1) console.log("Extra parameter " + y)
	};
	es.HW.awH = function(l) {
		var d = es.HW.a0k;
		for (var A = 0; A < d.length; A++) {
			var G = d[A][0],
				b = d[A][1],
				V = !0;
			for (var Q = 0; Q < G.length; Q++) V = V && l[G[Q]] && l[G[Q]].v == !0;
			if (V) {
				for (var Q = 0; Q < b.length; Q++)
					if (l[b[Q]] == null) {
						l[b[Q]] = JSON.parse(es.HW.vB[b[Q]])
					}
			} else
				for (var Q = 0; Q < b.length; Q++)
					if (l[b[Q]] != null) {
						delete l[b[Q]]
					}
		}
	};
	es.HW.Q_ = {};
	es.HW.Q_.jV = "classID Dmtr Angl Spcn Intr flipX flipY".split(" ");
	es.HW.Q_.vB = {
		flipX: "{\"t\":\"bool\",\"v\":false}",
		flipY: "{\"t\":\"bool\",\"v\":false}"
	};
	es.HW.Q_.awh = {
		computedBrush: ["Hrdn", "Rndn"],
		sampledBrush: ["Nm", "Rndn", "sampledData"],
		dBrush: "Shp Dnst Lngt clumping thickness stiffness physics".split(" "),
		dTips: "dtipsType Shp dtipsLengthRatio dtipsHardness dtipsGridSize dtipsErodibleTipHeightMap physics dtipsAirbrushCutoffAngle dtipsAirbrushGranularity dtipsAirbrushStreakiness dtipsAirbrushSplatSize dtipsAirbrushSplatCount".split(" ")
	};
	es.HW.a0k = [
		[
			["useTipDynamics"], "flipX flipY brushProjection minimumDiameter minimumRoundness tiltScale szVr angleDynamics roundnessDynamics".split(" ")
		],
		[
			["usePaintDynamics"],
			["prVr", "opVr", "wtVr", "mxVr"]
		],
		[
			["useBrushPose"], "overridePoseAngle overridePoseTiltX overridePoseTiltY overridePosePressure brushPosePressure brushPoseTiltX brushPoseTiltY brushPoseAngle".split(" ")
		],
		[
			["useTexture"], "TxtC interpretation textureBlendMode textureDepth minimumDepth textureDepthDynamics Txtr textureScale InvT textureBrightness textureContrast".split(" ")
		],
		[
			["useColorDynamics"], "clVr H Strt Brgh purity colorDynamicsPerTip".split(" ")
		],
		[
			["useScatter"],
			["Cnt", "countDynamics", "bothAxes", "scatterDynamics"]
		],
		[
			["useScatter", "bothAxes"],
			["Spcn"]
		]
	];
	es.HW.jV = "classID Nm Brsh useTipDynamics usePaintDynamics useColorDynamics useScatter useTexture useBrushSize useBrushPose Wtdg Nose Rpt dualBrush brushGroup".split(" ");
	es.HW.vB = {
		useBrushSize: "{\"t\":\"bool\",\"v\":false}",
		useBrushPose: "{\"t\":\"bool\",\"v\":false}",
		brushGroup: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brushGroup\",\"useBrushGroup\":{\"t\":\"bool\",\"v\":false}}}",
		flipX: "{\"t\":\"bool\",\"v\":false}",
		flipY: "{\"t\":\"bool\",\"v\":false}",
		brushProjection: "{\"t\":\"bool\",\"v\":false}",
		minimumDiameter: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}",
		minimumRoundness: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":25}}",
		tiltScale: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":200}}",
		szVr: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		angleDynamics: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		roundnessDynamics: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		prVr: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		opVr: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		wtVr: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		mxVr: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		overridePoseAngle: "{\"t\":\"bool\",\"v\":false}",
		overridePoseTiltX: "{\"t\":\"bool\",\"v\":true}",
		overridePoseTiltY: "{\"t\":\"bool\",\"v\":true}",
		overridePosePressure: "{\"t\":\"bool\",\"v\":true}",
		brushPosePressure: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":9}}",
		brushPoseTiltX: "{\"t\":\"long\",\"v\":0}",
		brushPoseTiltY: "{\"t\":\"long\",\"v\":0}",
		brushPoseAngle: "{\"t\":\"long\",\"v\":0}",
		TxtC: "{\"t\":\"bool\",\"v\":false}",
		interpretation: "{\"t\":\"bool\",\"v\":true}",
		textureBlendMode: "{\"t\":\"enum\",\"v\":{\"BlnM\":\"CBrn\"}}",
		textureDepth: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":37}}",
		minimumDepth: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":97}}",
		textureDepthDynamics: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		Txtr: "{\"t\":\"Objc\",\"v\":{\"classID\":\"Ptrn\",\"Nm\":{\"t\":\"TEXT\",\"v\":\"$$$/Presets/Patterns/Patterns_pat/Laidhorizontal=Laid-horizontal\"},\"Idnt\":{\"t\":\"TEXT\",\"v\":\"52a93427-f5d6-1172-a989-8dc82a43aa51\"}}}",
		textureScale: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":99}}",
		InvT: "{\"t\":\"bool\",\"v\":false}",
		textureBrightness: "{\"t\":\"long\",\"v\":14}",
		textureContrast: "{\"t\":\"long\",\"v\":100}",
		Cnt: "{\"t\":\"doub\",\"v\":4}",
		countDynamics: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":98}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		bothAxes: "{\"t\":\"bool\",\"v\":false}",
		scatterDynamics: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":56}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		clVr: "{\"t\":\"Objc\",\"v\":{\"classID\":\"brVr\",\"bVTy\":{\"t\":\"long\",\"v\":0},\"fStp\":{\"t\":\"long\",\"v\":100},\"jitter\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}},\"Mnm\":{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}}}",
		H: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}",
		Strt: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}",
		Brgh: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":36}}",
		purity: "{\"t\":\"UntF\",\"v\":{\"type\":\"#Prc\",\"val\":0}}",
		colorDynamicsPerTip: "{\"t\":\"bool\",\"v\":false}"
	};
