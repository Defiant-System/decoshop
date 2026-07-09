
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
		// for (var y in l)
		// 	if (G.indexOf(y) == -1) console.log("Extra parameter " + y); // hbi
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
		// for (var y in l)
		// 	if (G.indexOf(y) == -1) console.log("Extra parameter " + y); // hbi
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
	function gA(l, d) {
		this.a5l = l;
		this.Ay = d == null ? 0 : d;
		this.dir = 0
	}
	gA.prototype.kx = function(l, d) {
		var G = this.a5l,
			b = new Point2D(l.x - G.x, l.y - G.y),
			V = new Matrix2D;
		V.rotate(-this.Ay);
		b = V.kD(b);
		if (this.dir == 0 && !G.XB(l)) this.dir = Math.abs(b.x) < Math.abs(b.y) ? 1 : 2;
		if (d.l(KeyboardHandler.Zz)) {
			if (this.dir == 1) b.x = 0;
			if (this.dir == 2) b.y = 0
		}
		V.hI();
		b = V.kD(b);
		var Q = new Point2D(G.x + b.x, G.y + b.y);
		return Q
	};
	gA.prototype.aoW = function(l) {
		if (l.l(KeyboardHandler.Zz)) return this.dir;
		return 0
	};
	var b4 = function() {
		function l() {
			this.arh = {}
		}
		l.a1b = function(d, G) {
			var b = d.clone();
			b.cI -= Math.floor(b.cI);
			b.xu -= Math.floor(b.xu);
			var V = new Point2D(G, 0),
				Q = new Point2D(0, G),
				t = b.kD(V),
				I = b.kD(Q),
				y = new Point2D(b.cI, b.xu);
			return [t, I, y]
		};
		l.afb = function(d, G) {
			var b = Point2D.yZ;
			return b(d[0], G[0]) + b(d[1], G[1]) + b(d[2], G[2]);
			return dsum
		};
		l.prototype.ar$ = function(d) {
			var G = this.arh,
				b = G[d];
			if (b == null) b = G[d] = {
				G_: [],
				eg: 0,
				O: 0,
				ato: 0,
				aqj: 0
			};
			b.eg = Date.now();
			while (Object.keys(G).length > 3) {
				var V = "",
					Q = Date.now();
				for (var t in G) {
					var I = G[t].eg;
					if (I < Q) {
						Q = I;
						V = t
					}
				}
				delete G[V]
			}
			return b
		};
		l.prototype.aeQ = function(d, G) {
			var b = d.G_,
				V, Q = 1e6;
			for (var A = 0; A < b.length; A++) {
				var t = b[A],
					I = l.afb(t.Vx, G);
				if (I < Q) {
					V = t;
					Q = I
				}
			}
			return V
		};
		l.prototype.ald = function(d, G) {
			var b = d.G_;
			b.push(G);
			d.O += G.rect.O();
			if (b.length > 1e3 || d.O > 100 * 100 * 1600) {
				console.log("pruning", d.O, b.length);
				b.sort(function(Q, t) {
					return t.eg - Q.eg
				});
				while (b.length > 500 || d.O > 100 * 100 * 800) {
					var V = b.pop();
					d.O -= V.rect.O()
				}
			}
		};
		return l
	}();

	function iU(l, d, G, b, V, Q, t, I, y) {
		this.BF = d;
		this.yO = G;
		this.GF = Q;
		this.X9 = b;
		this.ne = null;
		this.FE = null;
		this.en = 0;
		this.a8i = 0;
		this.adr = 0;
		this.eK = 0;
		this.xF = 0;
		this.ED = y == null ? Math.floor(Math.random() * 16777215) : y;
		this.tY = y == null ? Math.floor(Math.random() * 16777215) : y;
		this.uA = new Rect;
		this.mn = new Rect;
		if (I != null) {
			this.QI = I
		} else {
			var e = iU.a9K;
			if (e.length != t.O() * 4) e = PixelUtil.allocBytes(t.O() * 4);
			else e.fill(0);
			this.QI = iU.a9K = e
		}
		this.rect = t.clone();
		this.pS = [];
		this.wO = [];
		this.Xm = null;
		this.Y7 = 0;
		this.k = null;
		this.a9C = "";
		this._e = null;
		this.akZ(l, V)
	}
	iU.a9K = PixelUtil.allocBytes(16);
	iU.prototype.akZ = function(l, d) {
		this.Y7 = d;
		this.k = l;
		this.a9C = JSON.stringify(l) + JSON.stringify(this.X9.Xi);
		this._e = iU.a4l(this.k, this.BF, this.yO)
	};
	iU.prototype.moveTo = function(l, d, G) {
		G = this.adh(G);
		this.en = G;
		var b = new Point2D(l, d),
			V = this.k.Brsh.v.Dmtr.v.val;
		this.ne = b.clone();
		this.FE = b.clone();
		this.Xm = b.clone();
		this.pS = [l, d];
		this.wO = [G];
		if (this.X9.FL != iU.K1) {
			var Q = this.k.angleDynamics,
				t = Q ? Q.v.bVTy.v == 6 : !1;
			this.mj(t ? new Rect : this.aqh(b, this.a6u(G), G, new Point2D(0, 0)))
		}
		this.eK = b.clone()
	};
	iU.prototype.lineTo = function(l, d, G) {
		G = this.adh(G);
		var b = this.pS,
			V = b.length,
			Q = b[V - 2],
			t = b[V - 1];
		if (l == Q && d == t) return;
		var I = this.k.Brsh.v.Dmtr.v.val,
			y = Math.ceil(I) + 1,
			e = new Rect(Math.round(Q), Math.round(t), 0, 0);
		e.rC(y, y);
		var M = new Rect(Math.round(l), Math.round(d), 0, 0);
		M.rC(y, y);
		this.pS.push(l, d);
		this.wO.push(G);
		V += 2;
		if (V >= 6) this.mj(this.aj7(V))
	};
	iU.prototype.adh = function(l) {
		if (l == null) l = 1;
		l = Math.max(.05, Math.min(5, l));
		if (isNaN(l)) {
			alert("Pressure is not a number");
			throw "e"
		}
		return l
	};
	iU.prototype.mj = function(l) {
		this.uA = l;
		this.mn = this.mn.Cw(l)
	};
	iU.prototype.finish = function() {
		var l = this.pS,
			d = l.length,
			G;
		if (d == 4) G = this.a5c(l[d - 2], l[d - 1], this.wO[(d >> 1) - 1], !0);
		if (d > 4) G = this.aj7(d + 2);
		if (G) this.mj(G)
	};
	iU.prototype.Pa = function() {
		return this.rect.clone()
	};
	iU.prototype.Ae = function() {
		return this.uA.wD(this.rect)
	};
	iU.prototype.Y2 = function() {
		return this.mn.wD(this.rect)
	};
	iU.prototype.XI = function() {
		return this.QI
	};
	iU.prototype.aj7 = function(l) {
		var d = this.pS,
			G = this.wO,
			b = d[l - 6],
			V = d[l - 5],
			Q = d[l - 4],
			t = d[l - 3],
			I = G[(l >> 1) - 3],
			y = G[(l >> 1) - 2],
			e = new Point2D(0, 0),
			M = new Point2D(0, 0);
		if (8 <= l) e = iU.a1L(d[l - 8], d[l - 7], b, V, Q, t);
		if (l <= d.length) M = iU.a1L(d[l - 2], d[l - 1], Q, t, b, V);
		var R = b + e.x,
			J = V + e.y,
			n = Q + M.x,
			r = t + M.y,
			T = new Rect,
			j = this.a7k() ? 1 : 10;
		for (var A = 0; A < j; A++) {
			var g = (A + 1) / j,
				Y = 1 - g,
				k = Y * Y * Y * b + 3 * g * Y * Y * R + 3 * g * g * Y * n + g * g * g * Q,
				F = Y * Y * Y * V + 3 * g * Y * Y * J + 3 * g * g * Y * r + g * g * g * t,
				D = this.a5c(k, F, I + g * (y - I));
			T = T.Cw(D)
		}
		return T
	};
	iU.a1L = function(l, d, G, b, V, Q) {
		var t = l - G,
			I = d - b,
			y = V - G,
			e = Q - b,
			M = Math.sqrt(t * t + I * I),
			R = Math.sqrt(y * y + e * e),
			J = Math.acos((t * y + I * e) / (M * R)) / Math.PI,
			n = .35,
			r = .1;
		J = r + J * (n - r);
		var T = V - l,
			j = Q - d,
			g = Math.sqrt(T * T + j * j),
			Y = J * R / g;
		return new Point2D(T * Y, j * Y)
	};
	iU.prototype.a5c = function(l, d, G, b) {
		var V = new Rect,
			Q = this.X9.a5w;
		if (Q == null) Q = 0;
		if (Q == 0 || b) {
			V = this.a5u(l, d, G);
			return V
		}
		var t = this.Xm,
			I = l - t.x,
			y = d - t.y,
			e = Math.sqrt(I * I + y * y);
		I /= e;
		y /= e;
		if (e > Q) {
			var M = t.x + I * (e - Q),
				R = t.y + y * (e - Q);
			V = this.a5u(M, R, G);
			this.Xm.T6(M, R)
		}
		return V
	};
	iU.prototype.a7k = function() {
		var l = this.k,
			d = l.Brsh.v.Dmtr.v.val;
		return this.X9.Xi && d == 1
	};
	iU.prototype.a5u = function(l, d, G) {
		var b = new Rect,
			V = new Point2D(l, d),
			Q = this.X9.FL,
			t = V.gu(this.FE);
		t.normalize(1);
		var I = Point2D.yZ(this.FE, V),
			y = -this.a8i,
			e = this.FE.clone();
		if (this.a7k()) {
			if (I > .99) {
				var M = this.FE;
				iU.abK(M, V, this.QI, this.rect, this.v8(this.k));
				b = PixelUtil.vec.flattenPath([M.x, M.y, V.x, V.y]);
				y = I
			} else V = this.FE
		} else
			while (!0) {
				var R = this.en + (G - this.en) * (Math.max(0, y) / I),
					J = this.a6u(R),
					n = this.avh() * (J + this.adr) / 2 * this._e.a9F;
				if (Q == iU.K1) n = 1;
				n = Math.max(n, .5);
				if (y + n < I) {
					y += n;
					this.xF += n;
					var r = new Point2D(this.FE.x + t.x * y, this.FE.y + t.y * y),
						g = 1;
					if (Q == iU.K1) {
						var T = e.clone();
						T.x += t.x > 0 ? 1 : -1;
						var j = e.clone();
						j.y += t.y > 0 ? 1 : -1;
						if (Point2D.yZ(T, r) < Point2D.yZ(j, r)) r = T;
						else r = j;
						y = Point2D.yZ(r, this.FE)
					}
					if (this.k.useScatter.v == !0) {
						g = this.k.Cnt.v;
						var Y = this.k.countDynamics.v.jitter.v.val / 100,
							k = Y * (-1 + 2 * this.Yj());
						g += Math.round(g * k)
					}
					for (var A = 0; A < g; A++) {
						var F = this.aqh(r, J, G, t);
						b = b.Cw(F)
					}
					e = r
				} else break
			}
		this.a8i = I - y;
		this.FE = V;
		this.en = G;
		return b
	};
	iU.prototype.avh = function() {
		var l = this.k.Brsh.v,
			d = l.Spcn.v.val,
			G = Math.max(5, l.Rndn.v.val);
		return G / 100 * (d / 100)
	};
	iU.prototype.a6u = function(l) {
		var d = this.k,
			G = d.Brsh.v.Dmtr.v.val;
		if (d.useTipDynamics.v) {
			var b = G * (d.minimumDiameter.v.val / 100);
			G = b + (G - b) * (1 - this.Yj(this.tY) * (d.szVr.v.jitter.v.val / 100));
			G *= iU.Pk(d, "szVr", l, this.xF)
		}
		return G
	};
	iU.Pk = function(l, d, G, b) {
		var V = 1,
			Q = l[d].v,
			t = Q.bVTy.v,
			I = Q.fStp.v;
		if (t == 1) V *= Math.max(0, (I - b) / I);
		if (t == 2) V *= G;
		return V
	};
	iU.prototype.aqh = function(l, d, G, b) {
		var V = this.X9.uh,
			T = 0;
		V = Math.min(1, V);
		var Q = this.k,
			t = this.k.Brsh.v,
			I = t.Dmtr.v.val,
			y = this.X9,
			e = y.FL,
			M = y.amR,
			R = this._e.Rj[1],
			J = new Matrix2D;
		J.translate(-R.m / 2, -R.n / 2);
		J.scale(1 / this._e.a70, 1 / this._e.a70);
		J.scale(d / I, d / I);
		J.scale(1, Math.max(5, t.Rndn.v.val) / 100);
		if (Q.usePaintDynamics && Q.usePaintDynamics.v) {
			var n = Q.opVr.v.jitter.v.val / 100,
				r = Q.prVr.v.jitter.v.val / 100;
			V *= 1 - this.Yj() * n;
			V *= 1 - this.Yj() * r;
			V *= iU.Pk(Q, "opVr", G, this.xF) * iU.Pk(Q, "prVr", G, this.xF)
		}
		if (Q.useTipDynamics.v) {
			var j = Q.angleDynamics.v,
				g = Q.minimumRoundness.v.val / 100;
			J.scale(1, g + (1 - g) * Math.round(100 - this.Yj() * Q.roundnessDynamics.v.jitter.v.val) / 100);
			T += (-.5 + this.Yj()) * 4 * Math.PI * (j.jitter.v.val / 100);
			T += iU.Pk(Q, "angleDynamics", G, this.xF) * 2 * Math.PI;
			if (j.bVTy.v == 6) T += Math.atan2(-b.y, b.x)
		}
		T += t.Angl.v.val * (Math.PI / 180);
		J.rotate(T);
		if (Q.useScatter.v) {
			var Y = (-1 + 2 * this.Yj()) * Q.scatterDynamics.v.jitter.v.val / 100;
			J.translate(-Y * d * b.y, Y * d * b.x)
		}
		J.translate(l.x, l.y);
		var k = this.a0L(J, l, d),
			F = k.rect.clone();
		if (e == null) {
			var D = this.v8(Q);
			PixelUtil.andMaskUint32(k.bY, Math.round(D.k * 255) << 16 | Math.round(D.J * 255) << 8 | Math.round(D.o * 255) << 0, 4278190080);
			if (this.mn.W6() && this.rect.XB(k.rect) && V == 1) this.QI = k.bY.slice(0);
			else {
				var q = -1,
					H = 2,
					W = -1,
					Z = 2;
				if (!y.ZV) {
					q = W = 0;
					H = Z = 1
				}
				for (var B = W; B < Z; B++)
					for (var a = q; a < H; a++) {
						var m = k.rect.clone();
						m.x += a * this.rect.m;
						m.y += B * this.rect.n;
						if (m.N1(this.rect)) {
							F = F.Cw(m);
							PixelUtil.blend.ayk(k.bY, m, this.QI, this.rect, m, V)
						}
					}
			}
		}
		if (e == iU.K1) {
			var p = new Point2D(k.rect.x + k.rect.m / 2, k.rect.y + k.rect.n / 2),
				c = Math.round(p.x - this.eK.x),
				v = Math.round(p.y - this.eK.y),
				i = k.rect.clone();
			i.offset(-c, -v);
			var z = i.wD(this.rect);
			z.offset(c, v);
			PixelUtil.blitRgbaRect(this.QI, this.rect, k.bY, i);
			PixelUtil.blend.xR(k.bY, k.rect, this.QI, this.rect, k.Ir, k.rect, V)
		}
		if (e == iU.Yx || e == iU.tf || e == iU.wB) {
			var P = k.rect.wD(this.rect),
				C;
			if (P.XB(k.rect)) C = k.Ir;
			else {
				C = PixelUtil.allocBytes(P.O());
				PixelUtil.copyBufferRect(k.Ir, k.rect, C, P)
			}
			var h = PixelUtil.allocBytes(P.O() * 4);
			PixelUtil.blitRgbaRect(this.QI, this.rect, h, P);
			if (e == iU.tf) {
				var L = h.slice(0),
					U = PixelUtil.s9.nn([-1, -1, -1, -1, 25, -1, -1, -1, -1]);
				PixelUtil.s9.iZ(h, L, P.m, P.n, U, 0);
				PixelUtil.copyByteBuffer(L, h)
			} else if (e == iU.wB) {
				var S = FilterHelper.oT("UnsM");
				S.Amnt.v.val = 15;
				S.Thsh.v = 0;
				S.Rds.v.val = 5;
				var L = PixelUtil.allocBytes(h.length);
				FilterHelper.Qz("UnsM", {
					buffer: h,
					rect: P
				}, S, 0, 0, {
					buffer: L,
					rect: P
				});
				PixelUtil.copyByteBuffer(L, h)
			} else {
				FilterHelper.OR(1, PixelUtil.sX.Eh, h, P)
			}
			PixelUtil.blend.xR(h, P, this.QI, this.rect, C, P, V)
		}
		this.adr = d;
		this.eK = p;
		this.tY++;
		return F
	};
	iU.prototype.v8 = function(l) {
		var d = iU.ar9(this.Y7);
		if (l.useColorDynamics && l.useColorDynamics.v) {
			var G = 1 - this.Yj() * l.clVr.v.jitter.v.val / 100,
				b = iU.ar9(this.GF);
			d.o = G * d.o + (1 - G) * b.o;
			d.J = G * d.J + (1 - G) * b.J;
			d.k = G * d.k + (1 - G) * b.k;
			var V = (-.5 + this.Yj()) * l.H.v.val / 100,
				Q = (-1 + 2 * this.Yj()) * l.Strt.v.val / 100,
				t = (-1 + 2 * this.Yj()) * l.Brgh.v.val / 100,
				I = PixelUtil.rgbToHsb(d.o, d.J, d.k);
			I.Tq = (I.Tq + V + 1) % 1;
			I.Lm = I.Lm + Q;
			if (I.Lm < 0) I.Lm = -I.Lm;
			if (I.Lm > 1) I.Lm = 1 - (I.Lm - 1);
			I.qv = I.qv + t;
			if (I.qv < 0) I.qv = -I.qv;
			if (I.qv > 1) I.qv = 1 - (I.qv - 1);
			d = PixelUtil.hsbToRgb(I.Tq, I.Lm, I.qv)
		}
		return d
	};
	iU.prototype.HW = function(l) {
		return Math.max(0, Math.min(1, l))
	};
	iU.prototype.Yj = function(l) {
		if (l == null) {
			l = this.ED++
		}
		return iU.hash(l)
	};
	iU.ar9 = function(l) {
		return {
			o: (l >> 16 & 255) / 255,
			J: (l >> 8 & 255) / 255,
			k: (l >> 0 & 255) / 255
		}
	};
	iU.hash = function(l) {
		l = l ^ 61 ^ l >> 16;
		l = l + (l << 3);
		l = l ^ l >> 4;
		l = l * 668265261;
		l = l ^ l >> 15;
		return (l & 16777215) / 16777215
	};
	iU.ayd = new b4;
	iU.prototype.a0L = function(l, d, G) {
		var b = Math.sqrt(this._e.Rj[1].O()),
			V = b * l.Nw(),
			Q = V < 10 ? 1 : V < 50 ? 1.5 : V < 200 ? 3 : 8;
		if (V < 30) Q = 0;
		var t = iU.ayd,
			I = t.ar$(this.a9C),
			y = this.X9.Xi;
		if (y) {
			l = l.clone();
			l.cI = Math.floor(l.cI);
			l.xu = Math.floor(l.xu)
		}
		var e = b4.a1b(l, b),
			M = t.aeQ(I, e);
		if (M && b4.afb(M.Vx, e) > Q) M = null;
		if (M) {
			M.rect.x = Math.round(M.apT.x + l.cI);
			M.rect.y = Math.round(M.apT.y + l.xu);
			if (y) {
				M.rect.x = Math.round(d.x - M.rect.m / 2);
				M.rect.y = Math.round(d.y - M.rect.n / 2)
			}
			M.eg = Date.now()
		} else {
			var R = Math.round(this.k.Brsh.v.Dmtr.v.val),
				J;
			if (y && R <= 3) {
				J = {
					channel: PixelUtil.allocBytes(R * R),
					rect: new Rect(Math.round(d.x - R / 2), Math.round(d.y - R / 2), R, R)
				};
				J.channel.fill(255)
			} else if (l.aS == 1 && l.k == 0 && l.S5 == 0 && l.Qd == 1) {
				J = {
					channel: this._e.Rj[0],
					rect: this._e.Rj[1].clone()
				};
				J.rect.x = Math.round(l.cI);
				J.rect.y = Math.round(l.xu)
			} else {
				if (l.Nw() > 1e-4) J = f.NH.aie(this._e.Rj, l)
			}
			if (y) {
				for (var A = 0; A < J.channel.length; A++) J.channel[A] = J.channel[A] > 127 ? 255 : 0
			}
			if (J == null) J = {
				channel: PixelUtil.allocBytes(0),
				rect: new Rect
			};
			M = {
				bY: PixelUtil.allocBytes(J.rect.O() * 4),
				Ir: J.channel,
				rect: J.rect,
				apT: new Point2D(J.rect.x - l.cI, J.rect.y - l.xu),
				Vx: e,
				eg: Date.now()
			};
			PixelUtil.writeChannelToRgba(M.Ir, M.bY, 3);
			if (I) t.ald(I, M)
		}
		return M
	};
	iU.a4l = function(l, d, G) {
		var b, V, Q, t = l.Brsh.v.Dmtr.v.val,
			I = l.Brsh.v.classID;
		if (I == "computedBrush") {
			var y = l.Brsh.v.Hrdn.v.val / 100;
			V = t < 100 ? 1.4 : 1;
			Q = 1;
			b = PixelUtil.aze.a0q(t, y, V)
		}
		if (I == "sampledBrush") {
			var e;
			for (var A = 0; A < d.length; A++)
				if (d[A].id == l.Brsh.v.sampledData.v) e = d[A];
			b = e.Rj;
			var M = b[1];
			V = Math.max(M.m, M.n) / t;
			Q = Math.min(M.m, M.n) / Math.max(M.m, M.n)
		}
		return {
			a70: V,
			a9F: Q,
			Rj: b
		}
	};
	iU.T = null;
	iU.k_ = null;
	iU.Gx = function(l, d, G, b, V, Q) {
		var t = iU.T,
			I = iU.k_;
		if (t == null) {
			iU.T = t = document.createElement("canvas");
			iU.k_ = I = t.getContext("2d", { willReadFrequently: true })
		}
		if (Q == null) Q = b;
		if (t.width != Q || t.height != V) {
			t.width = Q;
			t.height = V
		} else I.clearRect(0, 0, Q, V);
		I.fillStyle = "#000000";
		I.font = Math.floor(10 * window.devicePixelRatio) + "px sans-serif";
		var y = l.Brsh.v.Dmtr.v.val,
			e = "" + y,
			M = l.useBrushSize;
		if (M && M.v) e = "---";
		var R = I.measureText(e);
		I.fillText(e, (b - R.width) / 2, V - 2);
		var J = b,
			n = V - 10 * window.devicePixelRatio,
			r = Math.min(J, n),
			T = l.Brsh.v.classID;
		if (T == "computedBrush") {
			I.translate(J / 2, n / 2);
			I.rotate(-l.Brsh.v.Angl.v.val * Math.PI / 180);
			I.scale(1, .1 + .9 * l.Brsh.v.Rndn.v.val / 100);
			var j = Math.min(.95 * r / 2, y / 2) + .5,
				Y = .9 * l.Brsh.v.Hrdn.v.val / 100,
				k = I.createRadialGradient(0, 0, 0, 0, 0, j);
			k.addColorStop(Y, "rgba(0,0,0,1)");
			k.addColorStop((.5 + Y) / 1.5, "rgba(0,0,0,.5)");
			k.addColorStop(1, "rgba(0,0,0,0)");
			I.fillStyle = k;
			I.fillRect(-j, -j, 2 * j, 2 * j);
			I.setTransform(1, 0, 0, 1, 0, 0)
		} else if (T == "sampledBrush") {
			var F, Z = 0;
			for (var A = 0; A < d.length; A++)
				if (d[A].id == l.Brsh.v.sampledData.v) F = d[A];
			var D = F.Rj;
			PixelUtil.pyramidDownsampleMask(D);
			var q = D[0],
				H = D[1].m,
				W = D[1].n;
			while ((H > J || W > n) && D[Z + 2]) {
				Z += 2;
				q = D[Z];
				H = D[Z + 1].m;
				W = D[Z + 1].n
			}
			if (H * W != 0) {
				var B = PixelUtil.allocBytes(H * W * 4);
				PixelUtil.writeChannelToRgba(q, B, 3);
				var a = new ImageData(new Uint8ClampedArray(B.buffer), H, W);
				I.putImageData(a, Math.round((J - H) / 2), Math.round((n - W) / 2))
			}
		} else {}
		return t.toDataURL()
	};
	iU.o4 = function(l, d, G, b) {
		if (G == 0) G = 1;
		var V = l.Brsh.v,
			Q = V.Dmtr.v.val,
			t = V.Dmtr.v.val = Math.min(b != null ? Math.round(b * 2.6) : 3e3, Q * G),
			I = V.Hrdn ? V.Hrdn.v.val / 100 : 1,
			y = b != null ? b : Math.round(t * (1 + .55 * (1 - I))) + 4,
			R;
		y = Math.max(15, Math.min(y, 3e3));
		var e = new Rect(0, 0, y, y),
			M = new iU(l, d, null, {
				uh: 1
			}, 16711712, 0, e);
		V.Dmtr.v.val = Q;
		M.moveTo(e.m / 2, e.n / 2);
		var J = M.XI(),
			n = M.Pa();
		if (e.XB(n)) R = J;
		else {
			R = PixelUtil.allocBytes(e.O() * 4);
			PixelUtil.blitRgbaRect(J, n, R, e)
		}
		return [R, e, t]
	};
	iU.aAc = function(l, d, G, b) {
		var V = d.m,
			Q = V >>> 1;
		for (var A = 0; A < 4; A++) {
			var t = 6 - A;
			l[V * (Q - t) + Q - 1] = b;
			l[V * (Q - t) + Q] = G;
			l[V * (Q - t) + Q + 1] = b;
			l[V * (Q + t) + Q - 1] = b;
			l[V * (Q + t) + Q] = G;
			l[V * (Q + t) + Q + 1] = b;
			l[V * (Q - 1) + Q - t] = b;
			l[V * Q + Q - t] = G;
			l[V * (Q + 1) + Q - t] = b;
			l[V * (Q - 1) + Q + t] = b;
			l[V * Q + Q + t] = G;
			l[V * (Q + 1) + Q + t] = b
		}
	};
	iU.$I = function(l, d, G, b) {
		var V = iU.o4(l, d, G),
			Q = V[0].slice(0),
			t = V[1],
			I = V[2],
			y = t.O(),
			e = PixelUtil.allocBytes(y);
		PixelUtil.extractChannelFromRgba(Q, e, 3);
		var M = PixelUtil.allocBytes(y);
		PixelUtil.P.alH(e, M, t, window.devicePixelRatio > 1.9);
		if (I < 3 || PixelUtil.bufferUniformValue(M, 0) || b && I > 12) {
			iU.aAc(M, t, 255, 0)
		}
		var R = [3, 5, 3, 4, 8, 4, 3, 5, 3];
		R = PixelUtil.s9.nn(R);
		PixelUtil.s9.Eu(M, e, t.m, t.n, R);
		PixelUtil.andMaskUint32(Q, 4294967295);
		PixelUtil.writeChannelToRgba(e, Q, 3);
		for (var A = 0; A < y; A++)
			if (M[A] == 255) {
				Q[A << 2] = Q[(A << 2) + 1] = Q[(A << 2) + 2] = 0;
				Q[(A << 2) + 3] = 255
			}
		return {
			Wq: Q,
			vD: t,
			Vl: new Point2D(t.m / 2, t.n / 2)
		}
	};
	iU.abK = function(l, d, G, b, V) {
		var Q = 4278190080 | Math.round(V.k * 255) << 16 | Math.round(V.J * 255) << 8 | Math.round(V.o * 255) << 0;
		G = new Uint32Array(G.buffer);
		var t = Math.floor(l.x),
			I = Math.floor(l.y),
			y = Math.floor(d.x),
			e = Math.floor(d.y),
			M = Math.abs(y - t),
			R = Math.abs(e - I),
			J = t < y ? 1 : -1,
			n = I < e ? 1 : -1,
			r = M - R;
		while (!0) {
			G[I * b.m + t] = Q;
			if (t == y && I == e) break;
			var T = 2 * r;
			if (T > -R) {
				r -= R;
				t += J
			}
			if (T < M) {
				r += M;
				I += n
			}
		}
	};
	iU.K1 = "0";
	iU.Yx = "1";
	iU.tf = "2";
	iU.wB = "3";
