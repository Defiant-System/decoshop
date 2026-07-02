/**
* styleHelper (de-obfuscated partial from rest.js)
* Lines 78280-80093. Original identifier: styleHelper
*/

var StyleHelper = {};

StyleHelper.updateLayerTextStyle = function(l, d, G) {
	if (G == null) G = !0;
	var b = l.add.TySh,
		V = new je(b.zC, d),
		Q = StyleHelper.textToPathAndBounds(V, b);
	l.hD.path = Q.path;
	l.hD.Rj = [Q.QI, Q.vD];
	PixelUtil.pyramidDownsampleRgba(l.hD.Rj);
	l.hD.A_ = Q.vD.clone();
	if (G) {
		l.rect = Q.vD;
		l.buffer = Q.QI;
		l.U()
	}
	return [V, Q]
};

StyleHelper.textToPathAndBounds = function(l, d) {
	var G = l.ot(),
		t = 0,
		e;
	if (G.x == Infinity || G.W6()) return {
		QI: PixelUtil.allocBytes(0),
		vD: new Rect,
		xZ: new Rect
	};
	var b = l.ot(),
		V = StyleHelper.textLayerToPath(l, d),
		Q = PixelUtil.vec.flattenPath(V.C);
	for (var A = 0; A < l.xg.length; A++) {
		var I = l.xg[A].P0;
		if (I.StrokeFlag && I._LineWidth) t = Math.max(t, Math.ceil(d.D.Nw() * I._LineWidth / 2))
	}
	Q.rC(t, t);
	if (Q.W6()) return {
		QI: PixelUtil.allocBytes(0),
		vD: new Rect,
		xZ: new Rect
	};
	var y = PixelUtil.getScratch2dContext(Q.m, Q.n);
	y.translate(-Q.x, -Q.y);
	StyleHelper.drawPathToContext(V, y);
	if (l.xg.length != 0) {
		var M = dt.Wm(d),
			R = y.getImageData(0, 0, Q.m, Q.n);
		e = new Uint8Array(R.data.buffer);
		if (M == 0)
			for (var A = 0; A < e.length; A += 4) e[A + 3] = e[A + 3] > 80 ? 255 : 0;
		if (M == 3)
			for (var A = 0; A < e.length; A += 4) e[A + 3] = Math.min(255, e[A + 3] * 1.5)
	} else e = PixelUtil.allocBytes(Q.O() * 4);
	y.resetTransform();
	y.beginPath();
	return {
		QI: e,
		vD: Q,
		xZ: b,
		path: V
	}
};

StyleHelper.textLayerToPath = function(l, d) {
	var G = d.D,
		b = d.zC;
	StyleHelper.textScaleFactor = G.Nw();
	var V = dt.Wm(d),
		Q = Math.max(G.k * G.k, G.S5 * G.S5) < 1e-9 ? G : null;
	if (V == 3 || V == 4) Q = null;
	var t = {
		F: [],
		C: []
	};
	StyleHelper.processTextBlocks(l, t, Q, !0);
	StyleHelper.processTextBlocks(l, t, Q, !1);
	t = StyleHelper.applyMaskToPath(t, d, l);
	return t
};

StyleHelper.textScaleFactor = 1;

StyleHelper.applyMaskToPath = function(l, d, G) {
	if (l == null) return l;
	if (G && G.mK) PixelUtil.vec.transformCoords(l.C, G.mK, l.C);
	if (G && !PixelUtil.textWarp.T9(d.R8)) {
		var b = dt.Pa(d, G);
		if (!b.W6()) {
			if (l.F) {
				l = PixelUtil.vec.gM(l);
				var V = Math.min(b.m, b.n) / 8;
				if (V < 1) V = 1;
				l = PixelUtil.vec.subdividePath(l, V)
			}
			var Q = PixelUtil.textWarp.js(d.R8, b);
			PixelUtil.Xp.D(Q, l.C, b)
		}
	}
	var t = d.D;
	PixelUtil.vec.transformCoords(l.C, t, l.C);
	return l
};

StyleHelper.drawPathToContext = function(l, d) {
	d.save();
	d.miterLimit = 2;
	Typr.U.pathToContext({
		crds: l.C,
		cmds: l.F
	}, d);
	d.restore()
};

StyleHelper.textLayerFontsAvailable = function(l, d, G) {
	var b = je.ao2(G),
		V = l.zC,
		Q = V.ResourceDict.FontSet,
		t = V.ResourceDict.StyleSheetSet[0].StyleSheetData,
		I = V.EngineDict.StyleRun.RunLengthArray,
		y = V.EngineDict.StyleRun.RunArray,
		e = dt.dW(V),
		M = !0,
		R = {},
		J = 0;
	for (var A = 0; A < y.length; A++) {
		var n = y[A].StyleSheet.StyleSheetData.Font;
		if (n == null) n = t.Font;
		for (var r = 0; r < I[A]; r++) {
			var T = e.charCodeAt(J + r),
				j = n + "," + (T > 128 ? T : -1);
			if (R[j] == null) {
				R[j] = 1;
				if (d.U6(Q[n].Name, T) == null) M = !1
			}
		}
		J += I[A]
	}
	return M && b
};

StyleHelper.allTextLayersHaveFonts = function(l, d, G) {
	var b = !0;
	for (var V = 0; V < l.B.length; V++) {
		var Q = l.B[V],
			t = Q.add.TySh;
		if (t != null && !StyleHelper.textLayerFontsAvailable(t, d, G)) b = !1
	}
	return b
};

StyleHelper.rasterizeTextLayersWithFonts = function(l, d, G) {
	for (var b = 0; b < l.B.length; b++) {
		var V = l.B[b],
			Q = V.add.TySh;
		if (Q != null && StyleHelper.textLayerFontsAvailable(Q, d, G)) {
			StyleHelper.updateLayerTextStyle(V, d);
			l.U()
		}
	}
};

StyleHelper.processTextBlocks = function(l, d, G, b) {
	var V = new Matrix2D;
	for (var A = 0; A < l.GB.length; A++) StyleHelper.processTextLine(l.xg, l.GB[A], d, V, G, b)
};

StyleHelper.processTextLine = function(l, d, G, b, V, Q) {
	b.translate(d.sw.x, d.sw.y);
	for (var A = 0; A < d.Jj.length; A++) {
		var t = {},
			I = d.Jj[A];
		if (!I.lQ) break;
		var y = b.clone();
		y.translate(I.sw.x, I.sw.y);
		if (V) {
			var e = V.xu + y.xu * V.Qd;
			y.xu = (Math.round(e) - V.xu) / V.Qd
		}
		for (var M = I.start; M < I.end; M++) StyleHelper.appendGlyphToPath(l, d.Cm[M], d, t, G, y, Q)
	}
	b.translate(-d.sw.x, -d.sw.y)
};

StyleHelper.mirrorableBracketChars = "()<>[]{}\xAB\xBB\u0F3A\u0F3B\u0F3C\u0F3D\u169B\u169C\u2039\u203A\u2045\u2046\u207D\u207E\u208D\u208E\u2208\u2209\u220A\u220B\u220C\u220D\u2215\u223C\u223D\u2243\u2252\u2253\u2254\u2255\u2264\u2265\u2266\u2267\u2268\u2269\u226A\u226B\u226E\u226F\u2270\u2271\u2272\u2273\u2274\u2275\u2276\u2277\u2278\u2279\u227A\u227B\u227C\u227D\u227E\u227F\u2280\u2281\u2282\u2283\u2284\u2285\u2286\u2287\u2288\u2289\u228A\u228B\u228F\u2290\u2291\u2292\u2298\u22A2\u22A3\u22A6\u22A8\u22A9\u22AB\u22B0\u22B1\u22B2\u22B3\u22B4\u22B5\u22B6\u22B7\u22C9\u22CA\u22CB\u22CC\u22CD\u22D0\u22D1\u22D6\u22D7\u22D8\u22D9\u22DA\u22DB\u22DC\u22DD\u22DE\u22DF\u22E0\u22E1\u22E2\u22E3\u22E4\u22E5\u22E6\u22E7\u22E8\u22E9\u22EA\u22EB\u22EC\u22ED\u22F0\u22F1\u22F2\u22F3\u22F4\u22F6\u22F7\u22FA\u22FB\u22FC\u22FD\u22FE\u2308\u2309\u230A\u230B\u2329\u232A\u2768\u2769\u276A\u276B\u276C\u276D\u276E\u276F\u2770\u2771\u2772\u2773\u2774\u2775\u27C3\u27C4\u27C5\u27C6\u27C8\u27C9\u27CB\u27CD\u27D5\u27D6\u27DD\u27DE\u27E2\u27E3\u27E4\u27E5\u27E6\u27E7\u27E8\u27E9\u27EA\u27EB\u27EC\u27ED\u27EE\u27EF\u2983\u2984\u2985\u2986\u2987\u2988\u2989\u298A\u298B\u298C\u298D\u298E\u298F\u2990\u2991\u2992\u2993\u2994\u2995\u2996\u2997\u2998\u29B8\u29C0\u29C1\u29C4\u29C5\u29CF\u29D0\u29D1\u29D2\u29D4\u29D5\u29D8\u29D9\u29DA\u29DB\u29F5\u29F8\u29F9\u29FC\u29FD\u2A2B\u2A2C\u2A2D\u2A2E\u2A34\u2A35\u2A3C\u2A3D\u2A64\u2A65\u2A79\u2A7A\u2A7D\u2A7E\u2A7F\u2A80\u2A81\u2A82\u2A83\u2A84\u2A8B\u2A8C\u2A91\u2A92\u2A93\u2A94\u2A95\u2A96\u2A97\u2A98\u2A99\u2A9A\u2A9B\u2A9C\u2AA1\u2AA2\u2AA6\u2AA7\u2AA8\u2AA9\u2AAA\u2AAB\u2AAC\u2AAD\u2AAF\u2AB0\u2AB3\u2AB4\u2ABB\u2ABC\u2ABD\u2ABE\u2ABF\u2AC0\u2AC1\u2AC2\u2AC3\u2AC4\u2AC5\u2AC6\u2ACD\u2ACE\u2ACF\u2AD0\u2AD1\u2AD2\u2AD3\u2AD4\u2AD5\u2AD6\u2ADE\u2AE3\u2AE4\u2AE5\u2AEC\u2AED\u2AF7\u2AF8\u2AF9\u2AFA\u2E02\u2E03\u2E04\u2E05\u2E09\u2E0A\u2E0C\u2E0D\u2E1C\u2E1D\u2E20\u2E21\u2E22\u2E23\u2E24\u2E25\u2E26\u2E27\u2E28\u2E29\u3008\u3009\u300A\u300B\u300C\u300D\u300E\u300F\u3010\u3011\u3014\u3015\u3016\u3017\u3018\u3019\u301A\u301B\uFE59\uFE5A\uFE5B\uFE5C\uFE5D\uFE5E\uFE64\uFE65\uFF08\uFF09\uFF1C\uFF1E\uFF3B\uFF3D\uFF5B\uFF5D\uFF5F\uFF60\uFF62\uFF63";

StyleHelper.appendGlyphToPath = function(l, d, G, b, V, Q, t) {
	Q.translate(d.sw.x, d.sw.y);
	for (var I = d.H4; I <= d.Lt; I++) {
		var y = G.bt[I],
			e = y.vD.m,
			M = l[G.azO + y.I8],
			R = M.P0._FillBackgroundFlag;
		if (M.Aa == "\n" || t && !R) continue;
		var J = M.P0.FontSize / M.Jl.head.unitsPerEm,
			n = Q.clone();
		n.translate(y.sw.x + y.Fh * J, y.sw.y - y.HC * J);
		var r = new Matrix2D;
		r.scale(J, -J);
		if (M.An == 1 && StyleHelper.mirrorableBracketChars.indexOf(M.Aa) != -1) r.concat(new Matrix2D(-1, 0, 0, 1, e, 0));
		if (M.P0.FauxItalic) r.concat(new Matrix2D(1, 0, -Math.tan(.18), 1, 0, 0));
		r.translate(0, M.fI);
		r.scale(M.scale.x, M.scale.y);
		if (M.P0.BaselineShift != null) r.translate(0, -M.P0.BaselineShift);
		if (y.Ay != 0) {
			r.rotate(-y.Ay)
		}
		r.concat(n);
		var T = (M.P0._LineWidth ? M.P0._LineWidth : 1) * StyleHelper.textScaleFactor;
		if (t) {
			V.F.push(StyleHelper.colorToHexString(M.P0._FillBackgroundColor));
			var j = 1.005 * y.vD.n / J,
				g = new Rect(-y.Fh, -j * .27, 1.03 * y.vD.m / (J * M.scale.x), j);
			if (M.P0.StrokeFlag) g.rC(T / J, T / J);
			PixelUtil.vec.concat(V, PixelUtil.vec.simplifyPath(g), r);
			V.F.push("X");
			continue
		}
		if (M.P0.FillFlag) V.F.push(StyleHelper.colorToHexString(M.P0.FillColor));
		if (M.P0.StrokeFlag) V.F.push("O-" + StyleHelper.colorToHexString(M.P0.StrokeColor) + "-" + T);
		if (y.path.F.length != 0 && M.Aa != "\t") {
			if (M.P0.FauxBold) {
				var Y = M.P0.FontSize / 2048 * 27 * M.scale.x;
				r.cI += Y;
				PixelUtil.vec.concat(V, y.path, r);
				r.cI -= Y + Y;
				PixelUtil.vec.concat(V, y.path, r)
			} else PixelUtil.vec.concat(V, y.path, r)
		}
		if (M.Aa != "\n") {
			if (M.P0.Underline) {
				if (b.Rect == null) b.Rect = M.Jl.post.underlineThickness;
				if (b.adw == null) b.adw = M.Jl.post.underlinePosition;
				var k = 0,
					F = b.adw - b.Rect / 2,
					D = y.pf * 1.05,
					q = -b.Rect;
				PixelUtil.vec.concat(V, {
					F: ["M", "L", "L", "L", "Z"],
					C: [k, F, k + D, F, k + D, F + q, k, F + q]
				}, r)
			}
			if (M.P0.Strikethrough) {
				var H = M.Jl["OS/2"].yStrikeoutSize,
					W = M.Jl["OS/2"].yStrikeoutPosition,
					k = 0,
					F = W + H / 2,
					D = y.pf * 1.05,
					q = -H;
				PixelUtil.vec.concat(V, {
					F: ["M", "L", "L", "L", "Z"],
					C: [k, F, k + D, F, k + D, F + q, k, F + q]
				}, r)
			}
		}
		if (M.P0.FillFlag) V.F.push("X");
		if (M.P0.StrokeFlag) V.F.push("OX")
	}
	Q.translate(-d.sw.x, -d.sw.y)
};

StyleHelper.colorToHexString = function(l) {
	var d = dt.cc(l),
		G = (Math.round(d.o) << 16) + (Math.round(d.J) << 8) + Math.round(d.k);
	return "#" + PixelUtil.intToHex6(G)
};

function je(l, d) {
	var G = dt.WK(l),
		b, V, Q = dt.Cu(l),
		t = l._LineOrientation == 2 ? new Matrix2D : null,
		M, J;
	if (l.Curve) V = je.Ro(l.Curve);
	if (G != 0) {
		b = new Rect(Q[0], Q[1], Q[2], Q[3]);
		if (t) {
			var I = b.m;
			b.m = b.n;
			b.n = I;
			t.translate(0, -Q[2])
		}
		if (G == 2) {
			b.m = V[5] - V[4];
			b.n = 9999
		}
	}
	this.GB = [];
	this.xg = [];
	this.Ts = G;
	this.mK = t;
	var y = this.awj = dt.dW(l),
		e = -1,
		R = -1;
	for (var A = 0; A < y.length; A++) {
		var n = M,
			r = dt.axJ(l, A);
		if (r != e) {
			e = r;
			n = M = dt.anZ(l, r)
		}
		var T = J,
			r = dt.axu(l, A);
		if (r != R) {
			R = r;
			T = J = dt.a3r(l, r)
		}
		var j = {
				Aa: y.charAt(A),
				P0: n,
				Jl: null,
				IG: -1,
				c8: dt.a1s(l, A),
				fI: 0,
				scale: new Point2D(0, 0),
				SL: 0,
				lineHeight: 0,
				An: 0
			},
			g = l.ResourceDict.FontSet[n.Font].Name,
			Y = j.Jl = d.U6(g, y.charCodeAt(A));
		j.scale.x = n.HorizontalScale == null ? 1 : n.HorizontalScale;
		j.scale.y = n.VerticalScale == null ? 1 : n.VerticalScale;
		var k = Y["OS/2"],
			F = Y.hhea;
		if (n.FontCaps == 1 && j.Aa != j.Aa.toUpperCase()) {
			var D = k.sxHeight ? k.sxHeight / k.sTypoAscender : .76;
			j.scale.x *= D;
			j.scale.y *= D
		}
		var q = 1 / Y.head.unitsPerEm * n.FontSize;
		if (n.FontBaseline == 1) {
			var D = l.ResourceDict.SuperscriptSize;
			j.scale.x *= D;
			j.scale.y *= D;
			j.fI -= l.ResourceDict.SuperscriptPosition * n.FontSize
		}
		if (n.FontBaseline == 2) {
			var D = l.ResourceDict.SubscriptSize;
			j.scale.x *= D;
			j.scale.y *= D;
			j.fI += l.ResourceDict.SubscriptPosition * n.FontSize
		}
		j.SL = je.SL(Y) * n.FontSize;
		var H = T.AutoLeading;
		j.lineHeight = n.FontSize * (H == null ? 1.2 : H);
		if (n.AutoLeading == !1) j.lineHeight = n.Leading;
		if (j.lineHeight == 0) j.lineHeight = .01;
		this.xg.push(j)
	}
	var W = this.GB,
		Z = [0];
	for (var A = 0; A < l.EngineDict.ParagraphRun.RunLengthArray.length; A++) {
		var B = new je.ex(l, d, this.xg, A, b, Z, G == 1 ? V : null);
		W.push(B)
	}
	if (t) {
		if (G == 0) t.translate(0, W[0].Cm[0].SL / 2);
		t.rotate(-Math.PI / 2)
	}
	if (G == 2) {
		var a = l.Curve.Points,
			m = V[0],
			p = V[1],
			c = V[2],
			v = V[3],
			i = V[4],
			z = V[5];
		for (var A = 0; A < W.length; A++)
			for (var P = 0; P < W[A].Jj.length; P++)
				if (!(A == 0 && P == 0)) W[A].Jj[P].lQ = !1;
		var B = W[0],
			C = B.Jj[0];
		B.sw.T6(0, 0);
		C.sw.T6(0, 0);
		for (var P = C.start; P < C.end; P++) {
			var h = B.Cm[P],
				L = h.sw.x;
			h.sw.x = 0;
			for (var U = h.H4; U <= h.Lt; U++) {
				var S = B.bt[U],
					E = S.vD.m / 2;
				S.sw.x += L;
				var x = je.awL(m, (i + S.sw.x + E) % v);
				S.sw.x = x[0] - E * x[2];
				S.sw.y = x[1] - E * x[3];
				S.Ay = Math.atan2(x[3], x[2])
			}
		}
	}
}
je.SL = function(l) {
	var d = l._hh;
	if (d == null) {
		var G = Typr.U,
			b = G.codeToGlyph(l, 104),
			V = PixelUtil.vec.boundingBox(Typr.U.glyphToPath(l, b).crds).n;
		d = l._hh = V * (1 / l.head.unitsPerEm)
	}
	return d
};
je.prototype.aiR = function() {
	return !this.avE(0)
};
je.prototype.afS = function() {
	return this.avE(1)
};
je.prototype.avE = function(l) {
	var d = this.GB,
		G = !0,
		b = 0;
	for (var A = 0; A < d.length; A++) {
		var V = d[A].Jj,
			Q = V.length;
		b += Q;
		for (var t = 0; t < Q; t++) G &= V[t].lQ
	}
	return [G, b][l]
};
je.Ro = function(l, d, G) {
	if (d == null) d = .25;
	var b = l.Points,
		V = b.length,
		Q = V >>> 3,
		t = l.TextOnPathTRange,
		I = l.Reversed,
		J = 0,
		n = 0;
	if (I) {
		var y = b.slice(0);
		for (var A = 0; A < V; A += 2) {
			y[A] = b[V - 2 - A];
			y[A + 1] = b[V - 1 - A]
		}
		b = y;
		t = [Q - t[1] % Q, Q - t[0] % Q]
	}
	var e = [],
		M = [0],
		R = [0];
	for (var A = 0; A < V; A += 8) {
		var r = b[A + 6] - b[A + 0],
			T = b[A + 7] - b[A + 1],
			j = Math.round(Math.sqrt(r * r + T * T) / d),
			g = G && A == V - 8 ? j + 1 : j;
		for (var Y = 0; Y < g; Y++) {
			var k = Y / j,
				F = 1 - k,
				D = F * F * F * b[A + 0] + 3 * F * F * k * b[A + 2] + 3 * F * k * k * b[A + 4] + k * k * k * b[A + 6],
				q = F * F * F * b[A + 1] + 3 * F * F * k * b[A + 3] + 3 * F * k * k * b[A + 5] + k * k * k * b[A + 7];
			e.push(D, q);
			if (A + Y != 0) {
				var r = D - J,
					T = q - n;
				R.push(R[R.length - 1] + Math.sqrt(r * r + T * T));
				M.push((A >>> 3) + k)
			}
			J = D;
			n = q
		}
	}
	var d = R.length,
		H = R[d - 1],
		W = je.j8(t[0] % Q, M),
		Z = je.j8(t[1] % Q, M),
		B = R[W % d],
		a = R[Z % d];
	if (B >= a) a += H;
	return [e, M, R, H, B, a]
};
je.j8 = function(l, d) {
	var A = 0;
	while (d[A] < l) A++;
	return A
};
je.awL = function(l, d) {
	var G = 0,
		A = 0,
		b, V, Q;
	while (G < d) {
		b = l[A + 2] - l[A];
		V = l[A + 3] - l[A + 1];
		Q = Math.sqrt(b * b + V * V);
		G += Q;
		A += 2
	}
	return [l[A], l[A + 1], b / Q, V / Q]
};
je.prototype.a2g = function(l) {
	return this.xg[l]
};
je.prototype.a6$ = function(l) {
	for (var d = 0; d < this.GB.length; d++) {
		var G = this.GB[d];
		for (var b = 0; b < G.Jj.length; b++) {
			var V = G.Jj[b],
				Q = G.Cm[V.start].start,
				t = G.Cm[V.end - 1].end;
			if (Q < l && l < t) return [Q, t - 1]
		}
	}
	return [0, 1]
};
je.prototype.ai8 = function(l, d) {
	var G = -1,
		b = this.GB;
	if (this.Ts == 2) {
		var V = 1e9,
			Q = 0,
			t = b[0],
			I = t.Jj[0];
		for (var y = I.start; y < I.end; y++) {
			var e = t.Cm[y];
			for (var M = e.H4; M <= e.Lt; M++) {
				var R = t.bt[M],
					J = R.vD.m,
					n = l.x - R.sw.x,
					r = l.y - R.sw.y,
					T = n * n + r * r;
				if (T < V) {
					V = T;
					Q = R.I8
				}
			}
		}
		if (Q != 0 && this.awj.codePointAt(Q - 1) > 65535) Q--;
		return Q
	}
	for (var j = 0; j < b.length; j++) {
		var t = b[j];
		for (var g = 0; g < t.Jj.length; g++) {
			G++;
			var I = t.Jj[g],
				Y = t.Jj[g + 1];
			if (Y == null && j < b.length - 1) Y = b[j + 1].Jj[0];
			if (d != null) {
				if (G != d) continue
			} else {
				if (Y != null && t.sw.y + I.sw.y < l.y) continue
			}
			for (var y = I.start; y < I.end; y++) {
				var e = t.Cm[y];
				for (var M = e.H4; M <= e.Lt; M++) {
					var R = t.bt[M],
						J = R.vD.m,
						k = t.sw.x + I.sw.x + e.sw.x,
						F = k + R.sw.x,
						D = k + (M < e.Lt ? t.bt[M + 1].sw.x : R.sw.x + J);
					if (l.x <= D || y + 1 == I.end && M == e.Lt) {
						var q = t.azO + R.I8,
							H = this.xg[q],
							W = H.An & 1;
						if (H.Aa != "\n" && (W == 0 && l.x > F + J / 2 || W == 1 && l.x < F + J / 2)) q += this.awj.codePointAt(q) > 65535 ? 2 : 1;
						return q
					}
				}
			}
		}
	}
};
je.prototype.SJ = function(l) {
	var d = {
			vD: new Rect,
			yF: 0
		},
		G = 0;
	for (var b = 0; b < this.GB.length; b++) {
		var V = this.GB[b];
		for (var Q = 0; Q < V.Jj.length; Q++) {
			var t = V.Jj[Q];
			d.yF = G;
			G++;
			for (var I = t.start; I < t.end; I++) {
				var y = V.Cm[I];
				for (var e = y.start; e < y.end; e++) {
					if (e == l) {
						var M = this.xg[e],
							R = M.IG,
							J = V.bt[R].I8,
							n = 1;
						while (V.bt[R] != null && V.bt[R].I8 == J) {
							var r = V.bt[R],
								T = V.sw.x + t.sw.x + y.sw.x + r.sw.x,
								j = V.sw.y + t.sw.y + y.sw.y + r.sw.y;
							d.vD = d.vD.Cw(new Rect(T, j - M.lineHeight, r.vD.m, M.lineHeight));
							d.Ay = r.Ay;
							R += n
						}
						return d
					}
				}
			}
		}
	}
};
je.prototype.ot = function() {
	var l = Infinity,
		d = Infinity,
		G = -Infinity,
		b = -Infinity;
	for (var A = 0; A < this.GB.length; A++) {
		var V = this.GB[A];
		for (var Q = 0; Q < V.Jj.length; Q++) {
			var t = V.Jj[Q];
			if (!t.lQ) break;
			for (var I = t.start; I < t.end; I++) {
				var y = V.Cm[I];
				for (var e = y.H4; e <= y.Lt; e++) {
					var M = V.bt[e],
						R = M.vD,
						J = V.sw.x + t.sw.x + y.sw.x + M.sw.x,
						n = V.sw.y + t.sw.y + y.sw.y + M.sw.y;
					l = Math.min(l, J + R.x);
					d = Math.min(d, n + R.y);
					G = Math.max(G, J + R.x + R.m);
					b = Math.max(b, n + R.y + R.n)
				}
			}
		}
	}
	return new Rect(l, d, G - l, b - d)
};
je.g4 = function(l) {
	return 19968 <= l && l <= 40959 || 12288 <= l && l <= 12543
};
je.abU = function(l, d, G, b, V, Q, t) {
	var I = [Q],
		y = 0;
	for (var A = Q; A < t; A++) {
		if (G[A] == null) console.log(A, Q, t, G);
		var e = G[A].Aa,
			M = e.charCodeAt(0);
		if (M == 32 || M == 9) {
			I.push(y, A, 1, A + 1);
			y = 0
		} else if (M == 3851) {
			I.push(y + 1, A + 1);
			y = 0
		} else if (je.g4(M)) {
			I.push(y, A);
			y = 1
		} else if (A != Q && G[A].An != G[A - 1].An) {
			I.push(y, A);
			y = 1
		} else y++
	}
	I.push(y);
	var R = [];
	for (var A = 0; A < I.length; A += 2) {
		var J = I[A],
			n = I[A + 1];
		if (n == 0) continue;
		R.push(new je.a5q(l, d, G, b, V, J, n))
	}
	return R
};
je.a86 = function(l, d, G, b, V, Q, t) {
	var I = [0, d ? d.m : 1e9],
		y = [];
	if (b) {
		var e = l[Q].SL,
			M = V + (V == 0 ? e : l[Q].lineHeight),
			R = M - e * .9,
			J = PixelUtil.vec.KA(b[0], R),
			n = J.length,
			r = PixelUtil.vec.KA(b[0], M),
			T = r.length;
		if (n != 0 && T != 0) {
			var j = 0,
				g = 0,
				Y = [];
			while (j < n && g < T) {
				var k = Math.max(J[j], r[g]),
					F = J[j + 1],
					D = r[g + 1],
					q = Math.min(F, D);
				if (k < q) Y.push(k, q);
				if (F < D) j += 2;
				else g += 2
			}
			if (Y.length != 0) I = Y
		}
	}
	for (var H = 0; H < I.length; H += 2) {
		var W = 0,
			Z = Q,
			B = d ? I[H + 1] - I[H] - G.StartIndent - G.EndIndent - (Q == 0 ? G.FirstLineIndent : 0) : Infinity;
		while (Q != l.length) {
			var a = l[Q],
				m = W == 0 || (a.jS || a.F$) || W + a.vD.m < B;
			if (!m) break;
			W += a.vD.m;
			Q++
		}
		y.push(Q - Z)
	}
	t[0] = y;
	t[1] = I;
	t[2] = Q
};
je.apr = function(l, d) {
	var G = l.length,
		b = new Uint32Array(G),
		V = new Uint8Array(G),
		Q = 0;
	for (var A = 0; A < G; A++) {
		V[A] = 0;
		var t = l.charCodeAt(A);
		b[A] = t;
		if (t > Q) Q = t
	}
	if (Q > 1424) V = je.a3l(b, d);
	return V
};
je.a7J = function(l) {
	return l == "\xDF" ? l : l.toUpperCase()
};
je.ex = function(l, d, G, b, V, Q, t) {
	this.Cm = [];
	this.Jj = [];
	this.sw = new Point2D(0, 0);
	this.bt = null;
	this.Cm = null;
	this.P0 = dt.a3r(l, b);
	var I = this.P0,
		R = 0,
		r = "",
		k = 0,
		F = 1,
		S = 0;
	if (b != 0) {
		var y = I.SpaceBefore;
		if (y != null) Q[0] += y
	}
	var e = l.EngineDict.ParagraphRun.RunLengthArray,
		M = e[b];
	for (var A = 0; A < b; A++) R += e[A];
	var J = I._Direction ? I._Direction : 0;
	this.azO = R;
	var n = dt.dW(l).slice(R, R + M);
	for (var T = 0; T < n.length; T++) {
		var j = n.charAt(T);
		r += G[R + T].P0.FontCaps == 0 ? j : je.a7J(j)
	}
	n = r;
	var g = je.apr(n, J),
		Y = [],
		D = g[A] & 1,
		q = G[R].Jl;
	G[R].An = g[0];
	for (var A = 1; A < n.length; A++) {
		var j = G[R + A],
			H = g[A];
		j.An = H;
		if (H != D || j.Jl != q) {
			Y.push(k, F);
			k = A;
			F = 1;
			D = H;
			q = j.Jl
		} else F++
	}
	Y.push(k, F);
	var W = this.bt = [];
	for (var A = 0; A < Y.length; A += 2) {
		var Z = Y[A],
			B = Y[A + 1],
			a = (G[R + Z].An & 1) == 0,
			m = n.slice(Z, Z + B),
			p = Typr.U.shapeHB(G[R + Z].Jl, m, a),
			c = [],
			z = 0;
		for (var T = 0; T < p.length; T++) {
			var v = p[T];
			c.push({
				J: v.g,
				I8: v.cl,
				pf: v.ax,
				pi: v.ay,
				Fh: v.dx,
				HC: v.dy
			})
		}
		p = c;
		var i = p.slice(0);
		if (!a) i.reverse();
		for (var T = 0; T < m.length; T++) {
			while (z + 1 < i.length && i[z + 1].I8 <= T) {
				z++
			}
			while (z > 0 && i[z - 1].I8 == T) z--;
			G[R + Z + T].IG = W.length + (a ? z : i.length - z - 1)
		}
		for (var T = 0; T < p.length; T++) {
			W.push(p[T]);
			p[T].I8 += Z;
			var j = G[R + p[T].I8];
			if (j.c8 != -1 && j.c8 < j.Jl.maxp.numGlyphs) {
				p[T].J = j.c8;
				var P = j.Jl.hmtx;
				if (P) {
					var C = Object.keys(P)[0];
					p[T].pf = P[C][j.c8]
				}
			}
			if (j.Aa == "\n") p[T].pf = 0;
			if (j.Aa == "\t") p[T].pf = j.Jl.head.unitsPerEm * 36 / j.P0.FontSize
		}
	}
	var h = dt.jw(I),
		L = this.Cm = je.abU(l, d, G, R, W, R, R + M),
		U = this.Jj,
		E = -1,
		r = [null, null, 0];
	while (S < L.length) {
		je.a86(L, V, I, t, Q[0], S, r);
		E++;
		var x = {
				start: S,
				end: 0,
				vD: new Rect,
				sw: new Point2D(0, 0),
				lQ: !0
			},
			aI = 0,
			dK = 0;
		U.push(x);
		x.end = r[2];
		if (x.start == x.end) throw "e";
		var K = x.end == L.length;

		function u(i, Z, ka) {
			var hS = ka - Z >>> 1;
			for (var A = 0; A < hS; A++) {
				var eH = i[Z + A];
				i[Z + A] = i[ka - 1 - A];
				i[ka - 1 - A] = eH
			}
		}
		for (var bC = 1; bC < 5; bC++) {
			var O = -1;
			for (var A = x.start; A < x.end; A++) {
				var H = G[L[A].start].An;
				if (O == -1 && H >= bC) O = A;
				else if (O != -1 && H < bC) {
					u(L, O, A);
					O = -1
				}
			}
			var $ = x.end;
			if (J == 0 && L[$ - 1].jS) $--;
			if (O != -1) u(L, O, $)
		}
		var gX = r[0],
			_ = r[1],
			O = S,
			jI = S;
		for (var iw = 0; iw < _.length; iw += 2) {
			var hn = V ? _[iw + 1] - _[iw] - I.StartIndent - I.EndIndent - (S == 0 ? I.FirstLineIndent : 0) : Infinity,
				jq = 0;
			O = jI;
			jI += gX[iw >>> 1];
			var iv = this.aks(O, jI, L, J, V != null);
			if (V) {
				if (h == 1 || K && h == 4) jq = iv[1] + (hn - iv[0]);
				if (h == 2 || K && h == 5) jq = iv[1] + (hn - iv[0]) / 2;
				if (jI - O == 1 && L[O].vD.m > hn) jq = 0;
				if (E == 0) jq += I.FirstLineIndent;
				jq += I.StartIndent
			} else {
				if (h == 0) jq = I.StartIndent + I.FirstLineIndent;
				if (h == 1) jq = -iv[0] - I.EndIndent;
				if (h == 2) jq = -iv[0] / 2
			}
			jq += _[iw];
			if (V && h > 2 && (h == 6 || !K)) this.aih(O, jI, L, hn, J, jq);
			else {
				var kq = jq;
				for (var A = O; A < jI; A++) {
					var eE = L[A],
						e8 = eE.vD.m;
					eE.sw.x = kq;
					if (eE.ip == "\t") e8 = Math.ceil((kq + 4) / 36) * 36 - kq;
					kq += e8
				}
			}
		}
		S = x.end;
		for (var A = x.start; A < x.end; A++) {
			var jC = L[A].vD.clone();
			jC.pA(L[A].sw);
			x.vD = x.vD.Cw(jC);
			aI = Math.max(aI, L[A].SL);
			dK = Math.max(dK, L[A].lineHeight)
		}
		x.sw.y = E == 0 ? 0 : U[E - 1].sw.y + dK;
		if (E == 0) {
			if (b == 0 && V) Q[0] += aI;
			if (b != 0) Q[0] += dK;
			this.sw.y = Q[0]
		} else Q[0] += dK;
		if (V) x.lQ = this.sw.y + x.sw.y < V.y + V.n || b == 0 && E == 0
	}
	var d7 = I.SpaceAfter;
	if (d7 != null) Q[0] += d7
};
je.ex.prototype.aks = function(l, d, G, b, V) {
	var Q = 0,
		t = 0;
	for (var A = l; A < d; A++) Q += G[A].vD.m;
	if (V) {
		if (b == 0)
			for (var A = d - 1; A >= l; A--)
				if (G[A].jS || G[A].F$) Q -= G[A].vD.m;
				else break;
		if (b == 1)
			for (var A = l; A < d; A++)
				if (G[A].jS || G[A].F$) {
					var I = G[A].vD.m;
					Q -= I;
					t -= I
				} else break
	}
	return [Q, t]
};
je.ex.prototype.aih = function(l, d, G, b, V, Q) {
	var t = 0,
		I = 0,
		y = 0,
		e = 0;
	for (var A = l; A < d; A++)
		if (G[A].jS) y++;
		else {
			t += G[A].vD.m;
			I++
		}
	if (V == 0)
		for (var A = d - 1; A >= l; A--)
			if (G[A].jS || G[A].F$) {
				if (G[A].jS) {
					y--
				}
			} else break;
	if (V == 1)
		for (var A = l; A < d; A++)
			if (G[A].jS || G[A].F$) {
				if (G[A].jS) {
					y--;
					e++
				}
			} else break;
	if (I <= 1 || y == 0) {
		if (I == 1) G[l].sw.x = Q;
		return
	}
	var M = (b - t) / y,
		R = -e * M;
	for (var A = l; A < d; A++) {
		if (G[A].jS) this.bt[G[A].H4].vD.m = G[A].vD.m = M;
		G[A].sw.x = Q + R;
		R += G[A].vD.m
	}
};
je.a5q = function(l, d, G, b, V, Q, t) {
	this.ip = "";
	for (var A = 0; A < t; A++) this.ip += G[Q + A].Aa;
	this.jS = t == 1 && (G[Q].Aa == " " || G[Q].Aa == "\t");
	this.F$ = t == 1 && G[Q].Aa == "\n";
	this.start = Q;
	this.end = Q + t;
	this.vD = new Rect;
	this.sw = new Point2D(0, 0);
	this.SL = 0;
	this.lineHeight = 0;
	var I = 0,
		y = 0;
	if (t == 0) {
		this.lineHeight = G[Q].lineHeight;
		this.SL = G[Q].SL;
		this.vD = new Rect(0, -G[Q].lineHeight, 0, G[Q].lineHeight)
	}
	var e = G[Q].IG,
		M = G[Q + t - 1].IG;
	if (M < e) {
		var R = e;
		e = M;
		M = R
	}
	while (M + 1 < V.length && V[M].I8 == V[M + 1].I8) {
		M++
	}
	this.H4 = e;
	this.Lt = M;
	for (var J = e; J <= M; J++) {
		var n = V[J],
			r = G[b + n.I8],
			T = l._LineOrientation == 2 && (r.P0.BaselineDirection != 2 || je.g4(r.Aa.charCodeAt(0))),
			j = Typr.U.glyphToPath(r.Jl, n.J),
			D = 0;
		n.path = {
			F: j.cmds,
			C: j.crds
		};
		var g = r.P0.FontSize,
			Y = 1 / r.Jl.head.unitsPerEm * g;
		if (!r.P0.AutoKerning) I += r.P0.Kerning * 2 * Y * r.scale.x;
		n.sw = new Point2D(I, 0);
		n.Ay = 0;
		if (T && n.path.C.length > 0) {
			n.Ay = -Math.PI / 2;
			n.sw.x += g * .83;
			n.sw.y = -g * .3 + n.pf * Y / 2;
			n.pf = g / Y
		}
		var k = n.pf * Y * r.scale.x;
		n.vD = new Rect(0, -r.lineHeight, k, r.lineHeight);
		var F = n.vD.clone();
		F.pA(n.sw);
		if (r.P0.Tracking != null) D = r.P0.Tracking * .001 * g;
		if (r.P0.FauxBold == !0) D += .027 * g;
		I += k + D;
		if (t == 1 && r.Aa == " ") F.m += 2 * D;
		else if (t == 1 && r.Aa != null && je.g4(r.Aa.charCodeAt(0))) F.m += D;
		this.vD = this.vD.Cw(F);
		this.SL = Math.max(this.SL, r.SL);
		this.lineHeight = Math.max(this.lineHeight, r.lineHeight)
	}
};
je.MZ = 0;
je.ao2 = function(l) {
	if (je.MZ == 2) return !0;
	if (je.MZ == 1) return !1;
	je.MZ = 1;

	function d() {
		fetch("~/wasm/fribidi.wasm").then(function(G) {
			return G.arrayBuffer()
		}).then(function(G) {
			return WebAssembly.instantiate(G)
		}).then(function(G) {
			var b = G.instance.exports,
				V = b.memory,
				Q = 16,
				t = 256,
				I = 1,
				y = Q | t,
				e = Q | t | I;
			je.a3l = function(R, J) {
				var n = R.length,
					r = n * 4 + 4 + n * 4 + n * 4 + n;
				FormatHandler.eT(b, r + n + 1e7);
				var T = new Uint8Array(V.buffer),
					g = new Uint32Array(V.buffer),
					Y = b.calloc(r, 1),
					k = Y + n * 4,
					F = k + 4,
					D = F + n * 4,
					q = D + n * 4;
				g.set(R, Y >>> 2);
				g[k >>> 2] = J == 0 ? y : e;
				b.fribidi_get_bidi_types(Y, n, F);
				b.fribidi_get_bracket_types(Y, n, F, D);
				b.fribidi_get_par_embedding_levels_ex(F, D, n, k, q);
				var H = T.slice(q, q + n);
				b.free(Y);
				return H
			};
			je.MZ = 2;
			var M = new Action(ActionTypes.E.L, !0);
			M.data = {
				a: ActionTypes.$.kI,
				pb: "add",
				Oo: PsdResourceTypes.jz,
				G2: null
			};
			l.dispatch(M)
		})
	}
	Typr.U.initHB("~/wasm/hb.wasm", d);
	return !1
};

function dt() {}
dt.hf = function(l) {
	return JSON.parse(JSON.stringify(l))
};
dt.Df = function(l, d) {
	for (var G in d) l[G] = d[G]
};
dt.Iu = function(l, d, G, b) {
	var V = dt.atQ();
	if (G) dt.rW(V, 0, 0, G);
	var Q = new Matrix2D;
	if (b != null) Q.rotate(b);
	Q.translate(Math.round(l), Math.round(d));
	var t = {
		D: Q,
		zC: V
	};
	t.wi = dt.a8f();
	t.R8 = PixelUtil.textWarp.Q();
	t.xZ = new Rect;
	return t
};
dt.adk = function(l) {
	var d = ["CharacterDirection", 0];
	for (var A = 0; A < d.length; A += 2) {
		if (l[d[A]] != null && l[d[A]] != d[A + 1]) {
			throw "e";
			console.log(d[A], l[d[A]])
		}
	}
	if (l instanceof Array)
		for (var A = 0; A < l.length; A++) dt.adk(l[A]);
	else if (l instanceof Object)
		for (var G in l) dt.adk(l[G])
};
dt.jw = function(l, d) {
	if (d == null) d = l.Justification;
	var G = l._Direction ? l._Direction : 0;
	if (G == 1) {
		if (d == 0 || d == 3) d++;
		else if (d == 1 || d == 4) d--
	}
	return d
};
dt.Sz = function(l) {
	if (l.add == null) return;
	var d = l.zC,
		G = d.Curve,
		b = l.add.vmsk,
		V = b.i,
		Q = PixelUtil.vec.pathFromSvg(V, !0).C,
		t = l.D.clone();
	t.hI();
	PixelUtil.vec.transformCoords(Q, t, Q);
	var I = Q.slice(0, 8);
	for (var y = 8; y < Q.length; y += 6) I.push(Q[y - 2], Q[y - 1], Q[y], Q[y + 1], Q[y + 2], Q[y + 3], Q[y + 4], Q[y + 5]);
	G.Points = I;
	G.TextOnPathTRange = b.JG.slice(0);
	G.Reversed = b.as;
	if (dt.WK(d) == 1) {
		var G = je.Ro(d.Curve),
			e = PixelUtil.vec.boundingBox(G[0]);
		dt.mt(d, [0, 0, e.m, e.n].map(Math.round));
		for (var A = 0; A < I.length; A += 2) {
			I[A] -= e.x;
			I[A + 1] -= e.y
		}
		var M = new Matrix2D(1, 0, 0, 1, e.x, e.y);
		M.concat(l.D);
		l.D = M
	}
};
dt.MT = function(l) {
	if (l.add == null) return;
	var d = l.add.vmsk,
		G = l.zC.Curve,
		b = G.Points,
		V = {
			F: ["M"],
			C: [b[0], b[1]]
		};
	for (var A = 0; A < b.length; A += 8) {
		V.F.push("C");
		V.C.push(b[A + 2], b[A + 3], b[A + 4], b[A + 5], b[A + 6], b[A + 7])
	}
	PixelUtil.vec.transformCoords(V.C, l.D, V.C);
	var Q = PixelUtil.vec.QO(V, !0);
	d.i = Q;
	d.as = G.Reversed;
	d.JG = G.TextOnPathTRange.slice(0);
	l.add.vogk = w.Ba(Q)
};
dt.cc = function(l) {
	var d = {
		o: 0,
		J: 0,
		k: 0
	};
	if (l) {
		var G = l.Values;
		if (l.Type == 1) d = {
			o: G[1] * 255,
			J: G[2] * 255,
			k: G[3] * 255
		};
		else if (l.Type == 2) {
			var b = {
				classID: "CMYC",
				Cyn: {
					t: "doub",
					v: G[1] * 100
				},
				Mgnt: {
					t: "doub",
					v: G[2] * 100
				},
				Ylw: {
					t: "doub",
					v: G[3] * 100
				},
				Blck: {
					t: "doub",
					v: G[4] * 100
				}
			};
			d = PixelUtil.color.sampleGradientColor(b)
		} else console.log("Unknown color type")
	}
	return d
};
dt.alx = function(l) {
	for (var A = 0; A < l.length; A++) {
		var d = l[A].StyleSheet.StyleSheetData,
			G = d.FillColor;
		if (G && G.Type == 2) {
			var b = dt.cc(G);
			G.Type = 1;
			G.Values = [1, b.o / 255, b.J / 255, b.k / 255]
		}
	}
};
dt.Pa = function(l, d) {
	var G;
	if (dt.WK(l.zC) == 1) {
		var b = dt.Cu(l.zC);
		G = new Rect(0, 0, b[2] - b[0], b[3] - b[1])
	} else {
		G = d.ot();
		if (d.mK) {
			var V = d.mK.clone(),
				Q = PixelUtil.vec.simplifyPath(G);
			PixelUtil.vec.transformCoords(Q.C, V, Q.C);
			G = PixelUtil.vec.boundingBox(Q.C)
		}
	}
	return G
};
dt.mY = function(l) {
	var d = l[0];
	for (var A = 0; A < l.length; A++) d = dt.amh(d, l[A]);
	return d
};
dt.amh = function(l, d) {
	var G = {};
	for (var b in l)
		if (JSON.stringify(l[b]) == JSON.stringify(d[b])) G[b] = l[b];
	return G
};
dt.Wr = function(l, d) {
	var G = l.rA,
		b = -1;
	for (var A = 0; A < G.length; A++)
		if (G[A].Name == d) b = A;
	if (b == -1) {
		b = G.length;
		G.push({
			FontType: 1,
			Name: d,
			Script: 0,
			Synthetic: 0
		})
	}
	l.xg.Font = b
};
dt.dW = function(l) {
	return l.EngineDict.Editor.Text.replace(/\r/g, "\n").replace(/\u0003/g, "\n")
};
dt.H1 = function(l, d) {
	l.EngineDict.Editor.Text = d.replace(/\n/g, "\r")
};
dt.WK = function(l) {
	return l.Curve && l.Curve.TextOnPathTRange[0] >= 0 ? 2 : l.EngineDict.Rendered.Shapes.Children[0].ShapeType
};
dt.AO = function(l, d) {
	var G = l.EngineDict.Rendered.Shapes.Children[0];
	G.ShapeType = d;
	var b = G.Cookie.Photoshop;
	b.ShapeType = d;
	b.Base.ShapeType = d;
	if (d == 0) {
		delete b.BoxBounds;
		b.PointBase = [0, 0]
	}
	if (d == 1) {
		delete b.PointBase;
		b.BoxBounds = [0, 0, 1, 1]
	}
};
dt.Cu = function(l) {
	return l.EngineDict.Rendered.Shapes.Children[0].Cookie.Photoshop.BoxBounds
};
dt.mt = function(l, d) {
	l.EngineDict.Rendered.Shapes.Children[0].Cookie.Photoshop.BoxBounds = d
};
dt.a1s = function(l, d) {
	var G = l.EngineDict.AlternateGlyphRun;
	if (G == null) return -1;
	var b = dt.Zp(G.RunLengthArray, d).yj;
	if (G.RunArray[b] == null) return -1;
	var V = G.RunArray[b].Glyph;
	return V == null ? -1 : V
};
dt.a2i = function(l, d, G) {
	var b = l.EngineDict.AlternateGlyphRun;
	if (b == null) {
		b = l.EngineDict.AlternateGlyphRun = dt.aqz();
		b.RunArray.push({});
		b.RunLengthArray.push(dt.dW(l).length)
	}
	var V = dt.Zp(b.RunLengthArray, d),
		Q = V.yj,
		t = d - V.MK,
		I = b.RunArray[Q],
		y = JSON.stringify(I),
		e = b.RunLengthArray[Q];
	if (t != 0) {
		b.RunArray.splice(Q, 0, JSON.parse(y));
		b.RunLengthArray.splice(Q, 0, t);
		b.RunLengthArray[Q + 1] -= t;
		Q++;
		e -= t;
		t = 0
	}
	if (e != 1) {
		b.RunArray.splice(Q + 1, 0, JSON.parse(y));
		b.RunLengthArray.splice(Q + 1, 0, e - 1);
		b.RunLengthArray[Q] = 1;
		e = 1
	}
	I.Glyph = G
};
dt.axJ = function(l, d) {
	var G = l.EngineDict.StyleRun.RunLengthArray;
	return dt.Zp(G, d).yj
};
dt.anZ = function(l, d) {
	var G = l.ResourceDict.StyleSheetSet[0].StyleSheetData,
		b = {};
	for (var V in G) b[V] = G[V];
	var Q = l.EngineDict.StyleRun.RunArray[d].StyleSheet.StyleSheetData;
	dt.Df(b, Q);
	return b
};
dt.axu = function(l, d) {
	var G = l.EngineDict.ParagraphRun.RunLengthArray;
	return dt.Zp(G, d).yj
};
dt.a3r = function(l, d) {
	var G = l.ResourceDict.ParagraphSheetSet[0].Properties,
		b = {};
	for (var V in G) b[V] = G[V];
	var Q = l.EngineDict.ParagraphRun.RunArray[d].ParagraphSheet.Properties;
	dt.Df(b, Q);
	var t = ["StartIndent", "EndIndent", "FirstLineIndent"];
	for (var A = 0; A < 3; A++)
		if (b[t[A]] == null) b[t[A]] = 0;
	return b
};
dt.sT = function(l, d, G) {
	if (G == "") return;
	var b = dt.dW(l);
	dt.H1(l, b.substring(0, d) + G + b.substring(d, b.length));
	var V = l.EngineDict.StyleRun,
		Q = V.RunLengthArray,
		t = dt.Zp(Q, d - 1);
	Q[t.yj] += G.length;
	var I = l.EngineDict.AlternateGlyphRun;
	if (I) {
		var Q = I.RunLengthArray,
			t = dt.Zp(Q, d - 1);
		Q[t.yj] += G.length
	}
	var y = l.EngineDict.ParagraphRun,
		Q = y.RunLengthArray,
		e = dt.Zp(Q, d),
		M = G.split("\n");
	if (M.length == 1) {
		Q[e.yj] += G.length;
		return
	}
	Q.splice(e.yj + 1, 0, Q[e.yj] - (d - e.MK));
	y.RunArray.splice(e.yj + 1, 0, dt.hf(y.RunArray[e.yj]));
	Q[e.yj] -= Q[e.yj + 1];
	Q[e.yj] += M[0].length + 1;
	for (var A = 1; A < M.length - 1; A++) {
		y.RunArray.splice(e.yj + A, 0, dt.hf(y.RunArray[e.yj + A - 1]));
		y.RunLengthArray.splice(e.yj + A, 0, M[A].length + 1)
	}
	Q[e.yj + M.length - 1] += M[M.length - 1].length
};
dt.Iv = function(l, d, G) {
	var b = dt.dW(l);
	dt.H1(l, b.substring(0, d) + b.substring(G, b.length));
	dt.yH(l.EngineDict.ParagraphRun, d, G, !0);
	dt.yH(l.EngineDict.StyleRun, d, G, !1);
	var V = l.EngineDict.AlternateGlyphRun;
	if (V) dt.yH(V, d, G, !1)
};
dt.yH = function(l, d, G, b) {
	var V = l.RunLengthArray,
		Q = dt.Zp(V, d),
		t = dt.Zp(V, G),
		I = [];
	for (var A = 0; A < V.length; A++)
		for (var y = 0; y < V[A]; y++) I.push(A);
	I.splice(d, G - d);
	var e = [];
	for (var A = 0; A < V.length; A++) e.push(0);
	for (var A = 0; A < I.length; A++) e[I[A]]++;
	for (var A = 0; A < V.length; A++) {
		if (e[A] == 0) {
			e.splice(A, 1);
			V.splice(A, 1);
			l.RunArray.splice(A, 1);
			A--
		} else if (e[A] < V[A]) V[A] = e[A]
	}
	if (b && Q.yj != t.yj && Q.MK != d) {
		V[Q.yj] += V[Q.yj + 1];
		V.splice(Q.yj + 1, 1);
		l.RunArray.splice(Q.yj + 1, 1)
	}
};
dt.rW = function(l, d, G, b) {
	var V = l.EngineDict.Editor.Text.length;
	if (G == V - 2) G++;
	if (b.xg.Font != null) l.ResourceDict.FontSet = b.rA.slice(0);
	if (d <= G) dt.a8L(l.EngineDict.StyleRun, b.xg, d, G, !0);
	dt.a8L(l.EngineDict.ParagraphRun, b.GB, d, G, !1)
};
dt.Au = function(l, d, G) {
	var b = {
			rA: l.ResourceDict.FontSet.slice(0),
			xg: [],
			GB: []
		},
		V = l.EngineDict.StyleRun.RunLengthArray,
		Q = dt.Zp(V, d).yj,
		t = dt.Zp(V, G).yj;
	for (var A = Q; A <= t; A++) {
		var I = dt.hf(l.ResourceDict.StyleSheetSet[0].StyleSheetData),
			y = l.EngineDict.StyleRun.RunArray;
		if (y.length == 0) continue;
		var e = y[A].StyleSheet.StyleSheetData;
		dt.Df(I, e);
		b.xg.push(I)
	}
	var M = l.EngineDict.ParagraphRun.RunLengthArray,
		R = dt.Zp(M, d).yj,
		J = dt.Zp(M, G).yj;
	for (var A = R; A <= J; A++) {
		var n = l.EngineDict.ParagraphRun.RunArray;
		if (n.length == 0) continue;
		b.GB.push(dt.hf(n[A].ParagraphSheet.Properties))
	}
	b.xg = b.xg.length == 0 ? {} : dt.mY(b.xg);
	b.GB = b.GB.length == 0 ? {} : dt.mY(b.GB);
	return b
};
dt.a8L = function(l, d, G, b, V) {
	var Q = l.RunLengthArray;
	if (V) {
		var t = dt.Zp(Q, G);
		if (t.MK != G) {
			var I = Q[t.yj];
			Q.splice(t.yj, 0, G - t.MK);
			Q[t.yj + 1] = I - Q[t.yj];
			l.RunArray.splice(t.yj + 1, 0, dt.hf(l.RunArray[t.yj]))
		}
		var y = dt.Zp(Q, b);
		if (y.MK + Q[y.yj] - 1 != b) {
			var I = Q[y.yj];
			Q.splice(y.yj, 0, b - y.MK + 1);
			Q[y.yj + 1] = I - Q[y.yj];
			l.RunArray.splice(y.yj + 1, 0, dt.hf(l.RunArray[y.yj]))
		}
	}
	var t = dt.Zp(Q, G),
		y = dt.Zp(Q, b);
	if (V)
		for (var A = t.yj; A <= y.yj; A++) dt.Df(l.RunArray[A].StyleSheet.StyleSheetData, d);
	else
		for (var A = t.yj; A <= y.yj; A++) dt.Df(l.RunArray[A].ParagraphSheet.Properties, d)
};
dt.axr = function(l, d, G) {
	var b = l.EngineDict.StyleRun.RunLengthArray,
		V = [],
		Q = 0;
	for (var A = 0; A < b.length; A++) {
		var t = b[A];
		for (var I = 0; I < t; I++)
			if (d <= Q + I && Q + I < G) V.push(A);
		Q += t
	}
	var y = V[0],
		e = [];
	for (var A = 0; A < V.length; A++) {
		var M = V[A] - y;
		if (M == e.length) e.push(0);
		e[M]++
	}
	return e
};
dt.a87 = function(l) {
	var d = l.EngineDict.StyleRun,
		G = d.RunArray,
		b = d.RunLengthArray;
	for (var A = 0; A < b.length - 1; A++) {
		var V = G[A].StyleSheet.StyleSheetData,
			Q = G[A + 1].StyleSheet.StyleSheetData;
		if (JSON.stringify(V) == JSON.stringify(Q)) {
			G.splice(A + 1, 1);
			b[A] += b[A + 1];
			b.splice(A + 1, 1);
			A--
		}
	}
};
dt.Wm = function(l) {
	var d = l.wi.AntA.v.Annt;
	d = ["Anno", "antiAliasSharp", "AnCr", "AnSt", "AnSm"].indexOf(d);
	if (d == -1) d = 1;
	return d
};
dt.bU = function(l, d) {
	l.wi.AntA.v.Annt = ["Anno", "antiAliasSharp", "AnCr", "AnSt", "AnSm"][d]
};
dt.c6 = function(l, d) {
	var G, b;
	G = ["FontSize", "Leading", "BaselineShift", "_LineWidth"];
	b = l.xg;
	for (var A = 0; A < G.length; A++)
		if (b[G[A]] != null) b[G[A]] *= d;
	G = ["StartIndent", "EndIndent", "FirstLineIndent", "SpaceBefore", "SpaceAfter"];
	b = l.GB;
	for (var A = 0; A < G.length; A++)
		if (b[G[A]] != null) b[G[A]] *= d
};
dt.ae5 = function() {
	return dt.Au(dt.a1f, 0, 0)
};
dt.a8f = function() {
	return {
		classID: "TxLr",
		Txt: {
			t: "TEXT",
			v: "\0"
		},
		textGridding: {
			t: "enum",
			v: {
				textGridding: "None"
			}
		},
		Ornt: {
			t: "enum",
			v: {
				Ornt: "Hrzn"
			}
		},
		AntA: {
			t: "enum",
			v: {
				Annt: "antiAliasSharp"
			}
		},
		TextIndex: {
			t: "long",
			v: 0
		}
	}
};
dt.Zp = function(l, d) {
	var G = 0,
		A = 0;
	while (G + l[A] <= d) {
		G += l[A];
		A++
	}
	return {
		yj: A,
		MK: G
	}
};
dt.atQ = function() {
	var l = dt.hf(this.a1f);
	return l
};
dt.ayq = function(l, d) {
	var G = d.GB
};
dt.a0I = function(l, d) {
	var G = d.xg,
		b;
	b = l.Undl;
	if (b && b.v.Undl == "underlineOnLeftInVertical") G.Underline = !0;
	b = l.syntheticItalic;
	if (b) G.FauxItalic = b.v
};
dt.a6W = {
	Justification: 0,
	FirstLineIndent: 0,
	StartIndent: 0,
	EndIndent: 0,
	SpaceBefore: 0,
	SpaceAfter: 0,
	AutoHyphenate: !1,
	HyphenatedWordSize: 6,
	PreHyphen: 2,
	PostHyphen: 2,
	ConsecutiveHyphens: 8,
	Zone: 36,
	WordSpacing: [.8, 1, 1.33],
	LetterSpacing: [0, 0, 0],
	GlyphSpacing: [1, 1, 1],
	AutoLeading: 1.2,
	LeadingType: 0,
	Hanging: !1,
	Burasagari: !1,
	KinsokuOrder: 0,
	EveryLineComposer: !1,
	_Direction: 0,
	_ComposerEngine: 1
};
dt.a8l = {
	Font: 0,
	FontSize: 12,
	FauxBold: !1,
	FauxItalic: !1,
	AutoLeading: !0,
	Leading: 0,
	HorizontalScale: 1,
	VerticalScale: 1,
	Tracking: 0,
	AutoKerning: !0,
	Kerning: 0,
	BaselineShift: 0,
	FontCaps: 0,
	FontBaseline: 0,
	Underline: !1,
	Strikethrough: !1,
	Ligatures: !0,
	DLigatures: !1,
	BaselineDirection: 2,
	Tsume: 0,
	StyleRunAlignment: 2,
	Language: 0,
	NoBreak: !1,
	FillColor: {
		Type: 1,
		Values: [1, 0, 0, 0]
	},
	StrokeColor: {
		Type: 1,
		Values: [1, 0, 0, 0]
	},
	_FillBackgroundColor: {
		Type: 1,
		Values: [1, 0, 0, 0]
	},
	FillFlag: !0,
	StrokeFlag: !1,
	_LineWidth: 1,
	_FillBackgroundFlag: !1,
	FillFirst: !0,
	YUnderline: 1,
	OutlineWidth: 1,
	CharacterDirection: 0,
	HindiNumbers: !1,
	Kashida: 1,
	DiacriticPos: 2
};
dt.aqz = function() {
	return {
		RunArray: [],
		RunLengthArray: [],
		IsJoinable: 2
	}
};
dt.a1f = {
	EngineDict: {
		Editor: {
			Text: "\n"
		},
		ParagraphRun: {
			DefaultRunData: {
				ParagraphSheet: {
					DefaultStyleSheet: 0,
					Properties: {}
				},
				Adjustments: {
					Axis: [1, 0, 1],
					XY: [0, 0]
				}
			},
			RunArray: [{
				ParagraphSheet: {
					DefaultStyleSheet: 0,
					Properties: JSON.parse(JSON.stringify(dt.a6W))
				},
				Adjustments: {
					Axis: [1, 0, 1],
					XY: [0, 0]
				}
			}],
			RunLengthArray: [1],
			IsJoinable: 1
		},
		StyleRun: {
			DefaultRunData: {
				StyleSheet: {
					StyleSheetData: {}
				}
			},
			RunArray: [{
				StyleSheet: {
					StyleSheetData: {
						Font: 0,
						FontSize: 24,
						AutoKerning: !0,
						Kerning: 0
					}
				}
			}],
			RunLengthArray: [1],
			IsJoinable: 2
		},
		GridInfo: {
			GridIsOn: !1,
			ShowGrid: !1,
			GridSize: 18,
			GridLeading: 22,
			GridColor: {
				Type: 1,
				Values: [0, 0, 0, 1]
			},
			GridLeadingFillColor: {
				Type: 1,
				Values: [0, 0, 0, 1]
			},
			AlignLineHeightToGridFlags: !1
		},
		AntiAlias: 4,
		UseFractionalGlyphWidths: !0,
		Rendered: {
			Version: 1,
			Shapes: {
				WritingDirection: 0,
				Children: [{
					ShapeType: 0,
					Procession: 0,
					Lines: {
						WritingDirection: 0,
						Children: []
					},
					Cookie: {
						Photoshop: {
							ShapeType: 0,
							PointBase: [0, 0],
							Base: {
								ShapeType: 0,
								TransformPoint0: [1, 0],
								TransformPoint1: [0, 1],
								TransformPoint2: [0, 0]
							}
						}
					}
				}]
			}
		}
	},
	ResourceDict: {
		KinsokuSet: [{
			Name: "PhotoshopKinsokuHard",
			NoStart: "\u3001\u3002\uFF0C\uFF0E\u30FB\uFF1A\uFF1B\uFF1F\uFF01\u30FC\u2015\u2019\u201D\uFF09\u3015\uFF3D\uFF5D\u3009\u300B\u300D\u300F\u3011\u30FD\u30FE\u309D\u309E\u3005\u3041\u3043\u3045\u3047\u3049\u3063\u3083\u3085\u3087\u308E\u30A1\u30A3\u30A5\u30A7\u30A9\u30C3\u30E3\u30E5\u30E7\u30EE\u30F5\u30F6\u309B\u309C?!)]},.:;\u2103\u2109\xA2\uFF05\u2030",
			NoEnd: "\u2018\u201C\uFF08\u3014\uFF3B\uFF5B\u3008\u300A\u300C\u300E\u3010([{\uFFE5\uFF04\xA3\uFF20\xA7\u3012\uFF03",
			Keep: "\u2015\u2025",
			Hanging: "\u3001\u3002.,"
		}, {
			Name: "PhotoshopKinsokuSoft",
			NoStart: "\u3001\u3002\uFF0C\uFF0E\u30FB\uFF1A\uFF1B\uFF1F\uFF01\u2019\u201D\uFF09\u3015\uFF3D\uFF5D\u3009\u300B\u300D\u300F\u3011\u30FD\u30FE\u309D\u309E\u3005",
			NoEnd: "\u2018\u201C\uFF08\u3014\uFF3B\uFF5B\u3008\u300A\u300C\u300E\u3010",
			Keep: "\u2015\u2025",
			Hanging: "\u3001\u3002.,"
		}],
		MojiKumiSet: [{
			InternalName: "Photoshop6MojiKumiSet1"
		}, {
			InternalName: "Photoshop6MojiKumiSet2"
		}, {
			InternalName: "Photoshop6MojiKumiSet3"
		}, {
			InternalName: "Photoshop6MojiKumiSet4"
		}],
		TheNormalStyleSheet: 0,
		TheNormalParagraphSheet: 0,
		ParagraphSheetSet: [{
			Name: "Normal RGB",
			DefaultStyleSheet: 0,
			Properties: JSON.parse(JSON.stringify(dt.a6W))
		}],
		StyleSheetSet: [{
			Name: "Normal RGB",
			StyleSheetData: JSON.parse(JSON.stringify(dt.a8l))
		}],
		FontSet: [{
			Name: "DejaVuSans",
			Script: 0,
			FontType: 1,
			Synthetic: 0
		}, {
			Name: "AdobeInvisFont",
			Script: 0,
			FontType: 0,
			Synthetic: 0
		}, {
			Name: "MyriadHebrew-Regular",
			Script: 6,
			FontType: 0,
			Synthetic: 0
		}],
		SuperscriptSize: .583,
		SuperscriptPosition: .333,
		SubscriptSize: .583,
		SubscriptPosition: .333,
		SmallCapSize: .7
	}
};
