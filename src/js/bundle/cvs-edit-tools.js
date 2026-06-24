
// Global namespace for all Photopea canvas editing tools
const f = {};
// f.V = function(l) {
//     return window.devicePixelRatio || 1
// };
// Compute tool cursor size in document pixels
f.Jo = function(l, d) {
	return (d.a71 == "touch" ? 12 : 8) * window.devicePixelRatio / l.u.N
};

// Base class for all canvas editing tools
f.AbstractTool = function(l, d, G) {
	this.name = l;
	this.id = d;
	this.QF = null;
	if (G != null) this.mq = G
};

f.AbstractTool.prototype.TA = function(l, d, G, b, V) {};
f.AbstractTool.prototype.enable = function(l, d, G, b, V, Q) {
	var t = new Action(ActionTypes.E.L, !0);
	t.data = {
		a: ActionTypes.$.e5,
		ew: "default"
	};
	d.dispatch(t)
};

f.AbstractTool.prototype.disable = function(l, d, G, b, V) {};
f.AbstractTool.prototype.anf = function(l, d, G, b, V) {
	return !1
};
f.AbstractTool.prototype.dJ = function(l, d, G, b, V) {};
f.AbstractTool.prototype.AJ = function(l, d, G, b, V) {};
f.AbstractTool.prototype.JP = function(l, d, G, b, V) {};
f.AbstractTool.prototype.Nl = function(l, d, G, b, V, Q) {};
f.AbstractTool.prototype.h_ = function(l, d, G, b, V) {};
f.AbstractTool.prototype.o9 = function(l, d, G, b) {};
f.AbstractTool.prototype.Ew = function(l, d, G, b) {};
// History state handlers: applyRedo(data, doc) = redo this state; applyUndo(data, doc) = undo this state. Overridden per action type.
f.AbstractTool.prototype.applyRedo = function(l, d) {};
f.AbstractTool.prototype.applyUndo = function(l, d) {};
f.AbstractTool.prototype.A0 = function(l, d, G, b, V) {};
f.AbstractTool.prototype.BM = function(l, d) {};
f.AbstractTool.prototype.oH = function(l, d) {
	return !1
};
f.AbstractTool.prototype.Q0 = function(l, d) {
	return !1
};
f.AbstractTool.prototype.in = function() {
	return !1
};
f.AbstractTool.prototype.Py = function(l, d) {
	return !0
};
f.AbstractTool.prototype.v2 = function() {
	return null
};
f.AbstractTool.prototype.j6 = function(l, d, G) {};
f.AbstractTool.prototype.azC = function() {
	return !1
};
f.AbstractTool.prototype.fW = function(l, d, G, b) {};
f.AbstractTool.prototype.track = function(l) {
	var d = new Action(ActionTypes.E.g5, !0);
	d.data = l;
	l.FP = !0;
	this.QF.dispatch(d)
};
f.AbstractTool.nk = function(l, d, G, b) {
	var V = 10 * window.devicePixelRatio * (l.a71 == "touch" ? 2 : 1),
		Q = l.x + V,
		t = l.y - V,
		I = PixelUtil.y0.ij(d.m, G.m7, b, G.m, !0),
		y = PixelUtil.y0.ij(d.n, G.m7, b, G.n, !0);
	while (I.length < y.length) I = " " + I;
	while (I.length > y.length) y = " " + y;
	f.AbstractTool.JV(Q, t, ["width".charAt(0) + ": " + I, "Height".charAt(0) + ": " + y], G)
};
f.AbstractTool.JV = function(l, d, G, b) {
	function V(e, T, j, g, Y, k) {
		e.beginPath();
		e.moveTo(T, j + k);
		e.arcTo(T, j + Y, T + k, j + Y, k);
		e.arcTo(T + g, j + Y, T + g, j + Y - k, k);
		e.arcTo(T + g, j, T + g - k, j, k);
		e.arcTo(T, j, T, j + k, k)
	}
	var Q = window.devicePixelRatio,
		t = Math.round,
		I = t(11 * Q),
		y = f.AbstractTool.a45,
		M = 0;
	if (y == null) y = f.AbstractTool.a45 = document.createElement("canvas");
	var e = y.getContext("2d", { willReadFrequently: true });
	e.font = I + "px monospace";
	for (var A = 0; A < G.length; A++) M = Math.max(M, e.measureText(G[A]).width);
	var R = t(M + 12 * Q),
		J = t((G.length * 14 + 5) * Q),
		n = new Rect(l, d - J, R, J);
	if (y.width != R || y.height != J) {
		y.width = R;
		y.height = J;
		e.font = I + "px monospace"
	}
	e.clearRect(0, 0, R, J);
	e.fillStyle = "rgba(0,0,3,0.8)";
	V(e, 0, 0, R, J, t(4 * Q));
	e.fill();
	e.fillStyle = "rgba(255,255,255,1)";
	for (var A = 0; A < G.length; A++) e.fillText(G[A], t(6 * Q), t((A + 1) * 13 * Q));
	var r = [e.getImageData(0, 0, R, J).data, n.clone()];
	if (b) b.I.P4 = [r];
	return r
};
f.AbstractTool.a45 = null;
f.$C = "0";
f.Da = "1";
f.adL = "2";
f.amo = "3";
f.gc = "5";
f.abn = "6";
f.avT = "7";
f.aQ = "8";
f.we = "9";
f.ja = "10";
f.gt = "11";
f.E7 = "12";
f.AD = "13";
f.vn = "14";
f.e7 = "16";
f.vC = "18";
f.m4 = "19";
f.aH = "20";
f.gg = "21";
f.A9 = "22";
f.CV = "23";
f.zG = "24";
f.gS = "25";
f.uv = "27";
f.gN = "31";
f.Nm = "32";
f.qV = "34";
f.ahd = "35";
f.Yx = "36";
f.tf = "37";
f.K1 = "38";
f.l$ = "39";
f.S0 = "40";
f.GX = "41";
f.tA = "42";
f.YQ = "43";
f.a13 = "44";
f.zl = "47";
f.zk = "48";
f.o2 = "51";
f.Kp = "52";
f.LI = "54";
f.Rn = "55";
f.OZ = "56";
f.MO = "57";
f.YL = "58";
f._O = "59";
f.EW = "60";
f.t7 = "61";
f.QC = "70";
f.qK = "100";
f.tr = "101";
f.Z5 = "102";
f.v3 = "103";
f.MU = "120";
f.Qi = "230";
f.aAy = "231";
f.lv = "232";
f.yS = "233";
f.LY = "234";
f.WH = "235";
f.X6 = "236";
// Map Photoshop tool classID to internal tool id
f.avH = function(l) {
	var d = f.y5,
		G = null;
	for (var b in d)
		if (d[b][1].indexOf(l[1].classID) != -1) G = b;
	return G
};
f.y5 = {};
f.y5[f.CV] = ["tools/brush", ["PbTl"]];
f.y5[f.zG] = ["tools/pencil", ["PcTl"]];
f.y5[f.gN] = ["tools/eraser", ["ErTl"]];
// Base class for brush-based painting tools
f.BrushToolBase = function(l, d, G) {
	f.AbstractTool.call(this, l, d, G);
	this.HS = {
		brush: l ? es._k() : null,
		bmode: "norm",
		opacity: 1,
		flow: 1,
		smth: 0,
		samp: 0,
		emode: 0,
		wconf: [40, !0, !0],
		sall: !1,
		algnd: !1,
		sfrom: 0,
		alt: [!1],
		expo: .5,
		rng: 1,
		strn: .5,
		pdetail: !0,
		smode: 1,
		qsmode: 0,
		setop: 0,
		patch: 0
	};
	this.mN = null;
	this.CR = null;
	this.FE = null;
	this.ne = null;
	this.wN = null;
	this.wt = null;
	this.PX = null;
	this.fv = null;
	this.XM = null;
	this.Z4 = null;
	this.cn = null;
	this.Sg = null;
	this.Sd = null;
	this.SR = 1;
	this.Fb = !1;
	this.yr = null;
	this.caller = null
};
f.BrushToolBase.prototype = new f.AbstractTool;
f.BrushToolBase.prototype.Q0 = function(l, d) {
	return l.oW && d.l(KeyboardHandler.Zz)
};
f.BrushToolBase.prototype.AJ = function(l, d, G, b, V) {
	if (b.l(KeyboardHandler.Jm)) {
		this.wt = new Point2D(V.x, V.y);
		var Q = this.HS.brush.Brsh.v,
			t = Q.Dmtr.v.val,
			I = Q.Hrdn != null ? Q.Hrdn.v.val : -1;
		this.PX = [t, I, !0, JSON.parse(JSON.stringify(this.HS.brush)), V];
		this.ed(G)
	}
};
f.BrushToolBase.prototype.dq = function(l, d, G) {
	var b = this.PX,
		V = l.u.N,
		Q = G.x - b[4].x,
		t = G.y - b[4].y,
		I = b[0],
		y = b[1],
		e = Math.abs(Q) > Math.abs(t);
	if (e && b[2]) {
		var M = Math.round(2 * Q / V);
		I += M;
		G.x -= Q - .5 * M * V
	}
	if (!e && !b[2] && y != -1) {
		var M = Math.round(.25 * t);
		y += M;
		G.y -= t - 4 * M
	}
	I = Math.max(1, I);
	y = b[1] == -1 ? -1 : Math.max(0, Math.min(100, y));
	var R = b[3];
	R.Brsh.v.Dmtr.v.val = I;
	if (y != -1) R.Brsh.v.Hrdn.v.val = y;
	this.PX = [I, y, e, R, G];
	var J = iU.o4(R, d.pO.BF, V),
		n = J[1];
	n.x = Math.round(this.wt.x - n.m / 2);
	n.y = Math.round(this.wt.y - n.n / 2);
	l.I.iT = [J];
	var r = l.u.Zx(this.wt.x, this.wt.y);
	l.I.nO = {
		KB: [],
		wx: [r.x - I / 2, r.y, r.x + I / 2, r.y]
	};
	if (y != -1) l.I.nO.wx.push(r.x + 50 / V, r.y - y / 2, r.x + 50 / V, r.y + y / 2);
	l.uK = !0
};
f.BrushToolBase.prototype.h_ = function(l, d, G, b, V) {
	if (this.id == f.aH || this.id == f.gg) return;
	if (this.wt) {
		this.wt = null;
		this.Jh(JSON.parse(JSON.stringify(this.PX[3])));
		l.I.iT = [];
		l.I.nO = null;
		l.uK = !0;
		return
	}
	var Q = new Action(ActionTypes.E.L, !0);
	Q.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		a2q: "showBrushOpts",
		be: new Point2D(V.pf + 4, V.pi)
	};
	d.dispatch(Q)
};
f.BrushToolBase.prototype.Jh = function(l) {
	var d = new Action(ActionTypes.E.L, !0);
	d.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.Sq,
		Q_: l
	};
	this.caller.dispatch(d)
};
f.BrushToolBase.ML = function(l, d, G, b, V, Q) {
	if (l == null) l = "FrgC";
	if (d == null) d = "norm";
	if (G == null) G = 1;
	if (V == null) V = !1;
	var t = {
		classID: "Fl",
		Usng: {
			t: "enum",
			v: {
				FlCn: l
			}
		},
		Opct: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: Math.round(G * 100)
			}
		},
		PrsT: {
			t: "bool",
			v: V
		},
		Md: {
			t: "enum",
			v: {
				BlnM: au.ci(d)
			}
		}
	};
	if (l == "Clr") t.Clr = {
		t: "Objc",
		v: b
	};
	if (l == "contentAware") t.contentAwareColorAdaptationFill = {
		t: "bool",
		v: !0
	};
	if (l == "Ptrn") t.Ptrn = {
		t: "Objc",
		v: Q
	};
	return {
		kT: "fill",
		a0: t
	}
};
f.BrushToolBase.prototype.TA = function(l, d, G, b, V) {
	this.QF = d;
	var Q = G.FB.length;
	if (Q == 0 && !G.T8()) return;
	var t = Q != 0 ? -1 - G.FB[0] : G.g[0],
		I = G.B[t];
	if (l.a == "fromAction") {
		var y = l.lX,
			e = y.a0;
		if (e && e.null && e.null.v[0] && e.null.v[0].v.classID == "Path") {
			var M = G.LW(),
				R = M[0],
				J = M[1],
				n = R[J.length == 0 ? 0 : J[0]].add.vmsk;
			if (y.kT == "fill") {
				var r = n.c3(),
					T = V.Y7,
					j = this.HS,
					g = T >> 16 & 255,
					Y = T >> 8 & 255,
					k = T >> 0 & 255;
				this.hl(G, I, r, g, Y, k, Math.round(j.opacity * 255), j.bmode, "Fill Path")
			} else {
				for (var F = 0; F < 1e3; F++) {
					var D = PixelUtil.path.W7(n.i, F, !0);
					if (D == -1) {
						this.Nl(G, d, V, b, null);
						break
					}
					var q = n.i[D],
						H = n.i.slice(D, D + 1 + q.length),
						W = PixelUtil.vec.pathFromSvg(H, !0).C,
						Z = W.slice(0, 8);
					for (var B = 8; B < W.length; B += 6) Z.push(W[B - 2], W[B - 1], W[B], W[B + 1], W[B + 2], W[B + 3], W[B + 4], W[B + 5]);
					var a = {};
					a.Points = Z;
					a.TextOnPathTRange = n.JG.slice(0);
					var a = je.Ro(a, 2, q.type == 3),
						m = a[0];
					if (F == 0) this.dJ(G, d, V, b, G.u.dN(m[0], m[1]));
					else this.CR.moveTo(m[0], m[1]);
					var p = m.length,
						c = q.type == 0 ? p + 2 : p;
					for (var A = 2; A < c; A += 2) {
						var v = G.u.dN(m[A % p], m[(A + 1) % p]);
						v.oW = !0;
						this.JP(G, d, V, b, v, this.HS.flow)
					}
					this.CR.finish();
					this.zX(G)
				}
			}
		} else if (y.kT == "fill") {
			var i = e.PrsT ? e.PrsT.v : !1,
				z = I ? I.add.lspf : 0;
			if (i && I) {
				I.add.lspf = z == null ? 1 : z | 1
			}
			var P = (e.Opct ? e.Opct.v.val : 100) / 100,
				C = e.Md ? au.bS(e.Md.v.BlnM) : "norm",
				h = e.Usng.v.FlCn;
			if (h == "contentAware") {
				if (G.P == null) {
					alert("Select an area to heal first.");
					return
				}
				if (!G.T8()) return;
				this.Y6(G);
				this.rY(G, 0);
				var L = G.P,
					U = PixelUtil.allocBytes(L.rect.O() * 4);
				PixelUtil.writeChannelToRgba(L.channel, U, 3);
				this.E5(G, "sheal", U, L.rect, L.rect);
				this.U(G, L.rect);
				this.finish(G, L.rect)
			} else if (h == "Ptrn") {
				var S = V._N,
					E = G.P ? G.P.rect.clone() : new Rect(0, 0, G.m, G.n),
					x = PixelUtil.allocBytes(E.O() * 4);
				PatternHelper.s2(e, x, E, S, new Point2D(0, 0));
				this.Yr(G, I, G.P, x, "norm", [6, 48, 0, 2])
			} else {
				var T;
				if (h == "FrgC") T = V.Y7;
				else if (h == "BckC") T = V.GF;
				else if (h == "Blck") T = 0;
				else if (h == "Wht") T = 16777215;
				else if (h == "Gry") T = 8421504;
				else if (h == "Clr") {
					var K = PixelUtil.color.sampleGradientColor(e.Clr.v);
					T = K.o << 16 | K.J << 8 | K.k
				}
				var g = T >> 16 & 255,
					Y = T >> 8 & 255,
					k = T >> 0 & 255;
				this.hl(G, I, G.P, g, Y, k, Math.round(255 * P), C, [2, 3])
			}
			if (i && I) {
				I.add.lspf = z == null ? 0 : z
			}
		} else if (y.kT == "delete") {
			var u = t < 0 ? 1 : I.ht,
				L = G.P,
				gX;
			if (L == null) return;
			var bC = t < 0 ? G.vj[-t - 1] : u <= 0 ? null : u == 1 ? I.c3() : I.vZ(G).z,
				E = u <= 0 ? I.rect : bC.rect,
				O = u <= 0 ? L.rect.wD(E) : L.rect.clone();
			if (O.W6()) return;
			var $ = O.O();
			if (u <= 0) {
				gX = PixelUtil.allocBytes($ * 4);
				PixelUtil.blitRgbaRect(I.buffer, I.rect, gX, O)
			} else {
				gX = PixelUtil.allocBytes($);
				bC.extend(O);
				PixelUtil.copyBufferRect(bC.channel, bC.rect, gX, O)
			}
			if (0 <= t && I._l(G, L)) {
				if (u <= 0) {
					PixelUtil.andMaskUint32(gX, 0);
					PixelUtil.blitRgbaRect(I.IB.W5, I.IB.l8, gX, O)
				} else {
					gX.fill(255);
					PixelUtil.copyBufferRect(I.IB.W5, I.IB.l8, gX, O)
				}
			} else {
				if (u <= 0) {
					var _ = PixelUtil.allocBytes(gX.length >> 2);
					PixelUtil.extractChannelFromRgba(gX, _, 3);
					PixelUtil.blend.su(PixelUtil.getScratchByteBuffer(L.rect.O()), L.rect, _, O, L.channel, O, 1);
					PixelUtil.writeChannelToRgba(_, gX, 3)
				} else {
					var jI = PixelUtil.allocBytes(L.rect.O()),
						g = V.GF >>> 16 & 255,
						Y = V.GF >> 8 & 255,
						k = V.GF >> 0 & 255;
					jI.fill(Math.round(PixelUtil.luminanceRgb(g, Y, k)));
					PixelUtil.blend.su(jI, L.rect, gX, O, L.channel, O, 1)
				}
			}
			this.ta(G, !0, [2, 2], t, u, O, gX)
		}
	}
	if (l.a == "stroke") {
		var iw = l.aqY,
			L = G.P;
		if (L == null) {
			L = {
				rect: I.rect.clone(),
				channel: PixelUtil.allocBytes(I.rect.O())
			};
			PixelUtil.extractChannelFromRgba(I.buffer, L.channel, 3)
		}
		var hn = PatternHelper.B6(iw),
			jq = f.GS.abL(L, Math.ceil(hn[0]), Math.ceil(hn[1])),
			T = PixelUtil.color.sampleGradientColor(iw.Clr.v),
			g = Math.round(T.o),
			Y = Math.round(T.J),
			k = Math.round(T.k);
		this.hl(G, I, jq, g, Y, k, Math.round(255 * iw.Opct.v.val / 100), au.bS(iw.Md.v.BlnM), [14, 9])
	}
	if (l.a == "fillBMP") {
		this.Yr(G, I, G.P, l.z1, l.xm, l.Il)
	}
	if (l.a == "draw") {
		var iv = l.wH,
			kq = iv.rect;
		this.Y6(G);
		var eE = G.B[G.g[0]];
		if (l.apC && eE && eE.ht <= 0 && G.FB.length == 0) {
			kq = f.uj.amF(iv, G);
			eE.buffer = iv.buffer.slice(0);
			eE.rect = kq.clone()
		} else {
			var e8 = this.HS.bmode;
			this.HS.bmode = "norm";
			this.E5(G, "draw", iv.buffer, kq, kq.wD(new Rect(0, 0, G.m, G.n)));
			this.HS.bmode = e8
		}
		this.U(G, kq);
		G.i_ = !0;
		this.finish(G, kq, l.Il, l.apC)
	}
};
f.BrushToolBase.prototype.hl = function(l, d, G, b, V, Q, t, I, y) {
	var e = G == null ? new Rect(0, 0, l.m, l.n) : G.rect,
		M = t << 24 | Q << 16 | V << 8 | b << 0,
		R = PixelUtil.allocBytes(e.O() * 4);
	PixelUtil.andMaskUint32(R, M);
	this.Yr(l, d, G, R, I, y)
};
f.BrushToolBase.prototype.Yr = function(l, d, G, b, V, Q) {
	var t = l.FB.length != 0 ? -1 - l.FB[0] : l.g[0],
		I = t < 0 ? 1 : d.ht,
		y = t < 0 ? l.vj[-1 - t] : I <= 0 ? null : I == 1 ? d.c3() : d.vZ(l).z,
		e = I <= 0 ? d.rect : y.rect,
		M = G == null ? new Rect(0, 0, l.m, l.n) : G.rect,
		R = G == null ? PixelUtil.getWhiteMaskBuffer(l.m * l.n) : G.channel;
	if (G != null) PixelUtil.multiplyAlphaIntoRgba(R, b);
	var J = M.O(),
		n = PixelUtil.allocBytes(J * 4);
	if (I <= 0) PixelUtil.blitRgbaRect(d.buffer, d.rect, n, M);
	else {
		y.extend(M);
		n.fill(255);
		PixelUtil.grayPlaneToRgbaChannels(y.M$(M), n)
	}
	if (0 <= t && G && d._l(l, G) && I <= 0) {
		var r = d.IB.o7,
			T = d.IB.o7.slice(0);
		if (I <= 0) PixelUtil.copyByteBuffer(b, T);
		else PixelUtil.copyByteBuffer(fullc, T);
		var j = new HistoryState([2, 3], this);
		j.data = {
			a: "drawtemp",
			j: l.g[0],
			jd: I,
			a8c: r,
			a4B: T
		};
		l.pushHistoryState(j);
		this.applyRedo(j.data, l)
	} else {
		if (I <= 0) {
			var g;
			if (d.Ka(0)) {
				g = PixelUtil.allocBytes(M.O());
				PixelUtil.extractChannelFromRgba(n, g, 3)
			}
			PixelUtil.blend.compositeBlend(V, b, M, n, M, M, 1);
			if (d.Ka(0)) PixelUtil.writeChannelToRgba(g, n, 3)
		} else {
			PixelUtil.blend.compositeBlend(V, b, M, n, M, M, 1);
			var Y = PixelUtil.allocBytes(J);
			PixelUtil.rgbaToGrayPlane(n, Y);
			n = Y
		}
		this.ta(l, !0, Q, t, I, M, n)
	}
};
f.BrushToolBase.prototype.oH = function(l) {
	if (KeyboardHandler.rc.indexOf(l) != -1) return !0;
	return !1
};
f.BrushToolBase.prototype.o9 = function(l, d, G, b) {
	var V = this.HS.brush,
		Q = b.l(KeyboardHandler.Jm),
		t = Q != this.Fb,
		I = f.BrushToolBase.HK(V, b);
	if (I != null) this.Jh(I);
	if (!b.l(KeyboardHandler.wz) && b.Aq() != -1) {
		var y = KeyboardHandler.O0(Math.round(this.HS.opacity * 100), b.Aq()) / 100;
		this.ft({
			opacity: y
		}, d)
	}
	if (this.id == f.aQ && t && l != null) {
		var e = this.HS.qsmode;
		if (e == 2) e = l.P == null ? 0 : 1;
		else e = 2;
		this.ft({
			qsmode: e
		}, d)
	}
	this.Fb = Q;
	if (t) {
		if (l) this.SR = l.u.N;
		this.ed(G, b)
	}
};
f.BrushToolBase.HK = function(l, d) {
	var G = l.Brsh.v.Dmtr.v.val,
		b = l.Brsh.v.Hrdn != null ? l.Brsh.v.Hrdn.v.val : -1,
		V = G,
		Q = b,
		t = d.l(KeyboardHandler.Zz);
	if (d.l(KeyboardHandler.vz)) {
		if (t) b = 25 * Math.floor((b - 1) / 25);
		else {
			if (G <= 10) G--;
			else if (G <= 50) G = 5 * Math.floor((G - 1) / 5);
			else if (G <= 100) G = 10 * Math.floor((G - 1) / 10);
			else if (G <= 200) G = 25 * Math.floor((G - 1) / 25);
			else if (G <= 400) G = 50 * Math.floor((G - 1) / 50);
			else G = 100 * Math.floor((G - 1) / 100)
		}
	}
	if (d.l(KeyboardHandler.uM)) {
		if (t) b = 25 * Math.ceil((b + 1) / 25);
		else {
			if (G < 10) G++;
			else if (G < 50) G = 5 * Math.ceil((G + 1) / 5);
			else if (G < 100) G = 10 * Math.ceil((G + 1) / 10);
			else if (G < 200) G = 25 * Math.ceil((G + 1) / 25);
			else if (G < 400) G = 50 * Math.ceil((G + 1) / 50);
			else G = 100 * Math.ceil((G + 1) / 100)
		}
	}
	G = Math.max(1, G);
	b = Math.max(0, Math.min(100, b));
	if (Q == -1) b = -1;
	if (G != V || b != Q) {
		var I = JSON.parse(JSON.stringify(l));
		I.Brsh.v.Dmtr.v.val = G;
		if (Q != -1) I.Brsh.v.Hrdn.v.val = b;
		return I
	}
	return null
};
f.BrushToolBase.prototype.ed = function(l, d, G, b) {
	if (l.pO.list.length == 0) return;
	var V = this.id,
		Q;
	if ((V == f.uv || V == f.m4 || V == f.CV || V == f.zG) && (d != null && d.l(KeyboardHandler.Jm) || this.HS.alt[0])) Q = "crosshair";
	else {
		var t = this.SR,
			I = this.HS.brush;
		if ((V == f.uv || V == f.m4) && G && this.Sg && this.Sg.length == this.cn.O() * 4) {
			var y = G.u.Zx(b.x, b.y),
				e = this.a39(y),
				M = this.Sg,
				R = this.cn,
				J = new Rect(R.x + e.x, R.y + e.y, R.m, R.n),
				n = iU.o4(I, l.pO.BF, t),
				r = n[0],
				T = n[1],
				j = Math.ceil(T.m / t),
				g = new Rect(Math.round(y.x - j / 2), Math.round(y.y - j / 2), j, j),
				Y = PixelUtil.allocBytes(g.O() * 4),
				k, F;
			PixelUtil.blitRgbaRect(M, J, Y, g);
			if (t == 1) {
				k = Y;
				F = g
			} else {
				var D = new Matrix2D(t, 0, 0, t, 0, 0),
					q = f.NH.eJ([Y, g], D, !0);
				F = T.clone();
				F.x = q.rect.x;
				F.y = q.rect.y;
				if (F.XB(q.rect)) k = q.buffer;
				else {
					k = PixelUtil.allocBytes(F.O() * 4);
					PixelUtil.blitRgbaRect(q.buffer, q.rect, k, F)
				}
			}
			var H = this.HS.opacity / 255;
			for (var A = 0; A < k.length; A += 4) k[A + 3] = H * (r[A + 3] * k[A + 3]);
			iU.aAc(new Uint32Array(k.buffer), F, 4278190080, 4294967295);
			Q = {
				Wq: k,
				vD: F,
				Vl: new Point2D(F.m / 2, F.n / 2)
			}
		} else Q = iU.$I(I, l.pO.BF, t, V == f.gS || V == f.Nm)
	}
	var W = new Action(ActionTypes.E.L, !0);
	W.data = {
		a: ActionTypes.$.e5,
		ew: Q
	};
	if (this.caller) this.caller.dispatch(W)
};
f.BrushToolBase.prototype.enable = function(l, d, G, b) {
	this.mN = G;
	this.caller = d;
	this.Jh(JSON.parse(JSON.stringify(this.HS.brush)));
	if (l && l.u.N != 0) this.SR = l.u.N;
	this.ed(G, b)
};
f.BrushToolBase.prototype.BM = function(l, d) {
	if (d == PsdResourceTypes.Sq) {
		this.HS.brush = l.pO.Em;
		this.ed(l)
	}
};
f.BrushToolBase.prototype.A0 = function(l, d, G, b, V) {
	for (var Q in l) this.HS[Q] = l[Q];
	if (this.HS.alt[0]) this.ed(V, b, G)
};
f.BrushToolBase.prototype.auM = function(l) {
	var d = l.FB.length != 0 ? -1 - l.FB[0] : l.g[0],
		G = l.B[d],
		b = d < 0 ? 1 : G.ht,
		V = d < 0 ? l.vj[-d - 1] : b <= 0 ? null : b == 1 ? G.c3() : G.vZ(l).z,
		Q = V ? V.channel : G.buffer,
		t = (V ? V.rect : G.rect).clone();
	return [G, b, V, Q, t]
};
f.BrushToolBase.prototype.Y6 = function(l, d) {
	this.Sd = l.P == null ? null : {
		rect: l.P.rect.clone(),
		channel: l.P.channel.slice(0)
	};
	var G = this.Z4,
		b = this.auM(l),
		V = b[0],
		Q = b[1],
		t = b[2];
	this.Z4 = b[3];
	this.XM = b[4];
	var I = new Rect(0, 0, l.m, l.n),
		y = I.Cw(this.XM);
	if ((this.Fv() && Q <= 0 || y.XB(this.XM)) && d != !0) {
		if (G && G.length == this.Z4.length) {
			G.set(this.Z4);
			this.Z4 = G
		} else this.Z4 = this.Z4.slice(0)
	} else {
		if (t) t.extend(y);
		else V.extend(y)
	}
};
f.BrushToolBase.prototype.rY = function(l, d) {
	var G = this.auM(l),
		b = G[1],
		V = G[3],
		Q = G[4],
		t = [V, Q],
		I = d != null ? d : this.HS.sfrom;
	if (b <= 0 && I != 0) {
		t[1] = new Rect(0, 0, l.m, l.n);
		t[0] = l.LT(I == 1 && l.g[0] != l.B.length - 1 ? l.g[0] : null).slice(0)
	}
	this.cn = t[1].clone();
	this.Sg = t[0].slice(0)
};
f.BrushToolBase.prototype.I4 = function(l, d, G) {
	if (l.l(KeyboardHandler.Jm)) {
		var b = new Action(ActionTypes.E.v, !0);
		b.G = f.vn;
		b.data = {
			a: "pickhere",
			aoN: G
		};
		d.dispatch(b);
		return !0
	}
	return !1
};
f.BrushToolBase.prototype.Us = function(l, d, G, b, V, Q) {
	if (this.id != f.aQ && !l.T8(this.caller)) {
		this.CR = null;
		return
	}
	if (this.id != f.aQ && this.CR) return;
	this.Y6(l);
	var t = new Rect(0, 0, l.m, l.n),
		I = null;
	if (Q != null) {
		var y = l.FB.length != 0 ? -1 - l.FB[0] : l.g[0],
			e = l.B[y],
			M = y < 0 ? l.vj[-y - 1] : e.ht <= 0 ? null : e.ht == 1 ? e.c3() : e.vZ(l).z;
		I = PixelUtil.allocBytes(t.O() * 4);
		if (M) f.BrushToolBase.JW(this.Z4, this.XM, M.color, I, t);
		else PixelUtil.blitRgbaRect(this.Z4, this.XM, I, t)
	}
	var R = this.HS;
	if (this.CR && this.id == f.aQ && R.qsmode != 0 && l.P != null) {} else {
		var J = d.Y7,
			n = d.GF;
		if (this.yr == "erase") {
			var r = J;
			J = n;
			n = r
		}
		var T = this.id == f.aQ ? this.XM : t;
		this.CR = new iU(R.brush, d.pO.BF, d.pO.yO, {
			uh: V,
			FL: Q,
			a5w: R.smth * 50 / l.u.N,
			Xi: this.id == f.zG || R.emode == 1,
			ZV: l.ZV
		}, J, n, T, I)
	}
	if (this.id == f.aQ) {
		this.CR.akZ(R.brush, R.qsmode == 2 ? 0 : 16777215)
	}
	var j = l.u.Zx(b.x, b.y);
	if (G.l(KeyboardHandler.Zz) && this.FE) {
		var g = this.FE;
		this.CR.moveTo(g.x, g.y, b.uT);
		this.CR.lineTo(.001 * g.x + .999 * j.x, .001 * g.y + .999 * j.y, b.uT);
		this.CR.lineTo(j.x, j.y, b.uT)
	} else this.CR.moveTo(j.x, j.y, b.uT);
	this.FE = j;
	this.ne = j.clone();
	this.wN = new gA(j, l.u.Ay)
};
f.BrushToolBase.prototype.LJ = function(l, d, G) {
	if (l && l.u.N != 0 && l.u.N != this.SR) {
		this.SR = l.u.N;
		this.ed(G)
	}
};
f.BrushToolBase.prototype.$i = function(l, d, G, b) {
	if (this.CR == null) return;
	var V = l.B[l.g[0]],
		Q = l.u.Zx(b.x, b.y),
		t = this.wN.kx(Q, G);
	if (t.XB(this.FE)) return 1;
	this.CR.lineTo(t.x, t.y, b.uT);
	this.FE = t;
	if (this.id == f.uv || this.id == f.m4) {
		var I = this.t3(),
			y = 11;
		I = l.u.dN(Q.x - I.x, Q.y - I.y);
		var e = y >>> 1,
			M = new Rect(Math.round(I.x) - e, Math.round(I.y) - e, y, y),
			R = PixelUtil.allocBytes(M.O() * 4);
		PixelUtil.andMaskUint32(16777215);
		for (var A = 0; A < y; A++) R[(A * y + e) * 4 + 3] = R[(y * e + A) * 4 + 3] = 255;
		l.I.P4 = [
			[R, M]
		];
		l.uK = !0
	}
};
f.BrushToolBase.prototype.Ew = function(l, d, G, b) {
	if (G.QN != this.id) return;
	if (this.id != f.aQ || l == null) return;
	if (l.P == null || l.g[0] != this.a3P) {
		this.a3P = l.g[0];
		this.ft({
			qsmode: 0
		}, d)
	}
};
f.BrushToolBase.prototype.U = function(l, d) {
	if (l.FB.length != 0) {
		l.uK = !0;
		return
	}
	var G = l.B[l.g[0]];
	if (d == null) {
		d = this.CR.Ae();
		if (this.Fv() && G.ht <= 0) d = d.wD(this.XM)
	}
	var b = G.ht;
	if (b == 1 || b == 3) {
		var V = Math.round((b == 1 ? G.c3() : G.vZ(l).z).Vx * 2.4);
		d = d.clone();
		d.rC(V, V)
	}
	if (d.W6()) return;
	if (b <= 0) {
		G.U(d)
	}
	if (b == 1) {
		G.c3().y1 = !0;
		G.QJ(l, d)
	}
	if (b == 3) {
		G.U(d)
	}
	l.U(l.root.H5(d, l, l.g[0], !0))
};
f.BrushToolBase.prototype.Nl = function(l, d, G, b, V) {
	if (this.CR == null) return;
	this.CR.finish();
	if (this.id != f.vC && this.id != f.m4 && this.id != f.aQ) this.zX(l);
	if (this.id == f.uv || this.id == f.m4) {
		l.I.P4 = [];
		l.uK = !0
	}
	if (this.id == f.aQ) {
		var Q = l.P;
		l.P = this.Sd;
		var t = new Action(ActionTypes.E.v, !0);
		t.data = {
			a: "setsel",
			Il: this.name,
			P: Q
		};
		t.G = f.Da;
		d.dispatch(t);
		if (this.HS.qsmode == 0) this.ft({
			qsmode: 1
		}, d)
	} else {
		this.finish(l, this.CR.Y2());
		this.CR = null;
		this.fv = null
	}
	this.dir = 0
};
f.BrushToolBase.prototype.ft = function(l, d) {
	for (var G in l) this.HS[G] = l[G];
	var b = new Action(ActionTypes.E.L, !0);
	b.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		DY: l
	};
	d.dispatch(b)
};
f.BrushToolBase.prototype.Fv = function() {
	var l = this.id;
	return l == f.aQ || l == f.gN || l == f.l$ || l == f.S0 || l == f.GX || l == f.A9
};
f.BrushToolBase.prototype.finish = function(l, d, G, b, V) {
	var Q = l.FB.length != 0 ? -1 - l.FB[0] : l.g[0],
		t = l.B[Q],
		I = Q < 0 ? 1 : t.ht,
		y = Q < 0 ? l.vj[-Q - 1] : I <= 0 ? null : I == 1 ? t.c3() : t.vZ(l).z,
		e = y ? y.rect : t.rect,
		J;
	if (this.Fv() || !e.XB(this.XM)) {
		if (y == null) {
			if (this.Fv()) t.ww();
			else {
				var M = d.Cw(this.XM),
					R = PixelUtil.allocBytes(M.O() * 4);
				PixelUtil.blitRgbaRect(t.buffer, t.rect, R, M);
				t.buffer = R;
				t.rect = M
			}
		} else y.dispose();
		this.U(l, e)
	}
	if (I <= 0) {
		J = PixelUtil.allocBytes(d.O() * 4);
		PixelUtil.blitRgbaRect(this.Z4, this.XM, J, d)
	} else {
		J = PixelUtil.allocBytes(d.O());
		J.fill(y.color);
		PixelUtil.copyBufferRect(this.Z4, this.XM, J, d)
	}
	this.ta(l, !1, G ? G : this.name, Q, I, d, J, b, V)
};
f.BrushToolBase.prototype.ta = function(l, d, G, b, V, Q, t, I, y) {
	var e = t;
	if (V > 0) {
		e = PixelUtil.allocBytes(Q.O() * 4);
		f.BrushToolBase.JW(t, Q, 0, e, Q)
	}
	var M = new HistoryState(G, this);
	M.data = [{
		j: b,
		jd: V,
		vD: Q,
		XO: e
	}];
	if (I) M.data.lk = [l.P, null];
	if (y) M.data.lk = [this.Sd, l.P];
	l.pushHistoryState(M);
	if (d) this.applyRedo(M.data, l);
	else if (I) l.P = null;
	f.u2.asz(l, M.data)
};
f.BrushToolBase.prototype.applyUndo = function(l, d) {
	this.a3Z(l, d, !1)
};
f.BrushToolBase.prototype.applyRedo = function(l, d) {
	this.a3Z(l, d, !0)
};
f.BrushToolBase.prototype.a3Z = function(l, d, G) {
	if (l.a == "drawtemp") {
		var b = G ? l.a4B : l.a8c,
			V = d.B[l.j];
		V.IB.o7 = b;
		V.OX(d, 0, 0, d.P);
		V.U();
		d.i_ = !0
	} else {
		f.u2.fM(d, l);
		if (l.lk) {
			d.P = l.lk[G ? 1 : 0];
			d.Of = !0
		}
	}
	d.U()
};
f.BrushToolBase.prototype.zX = function(l) {
	this.E5(l, this.yr, this.CR.XI(), this.CR.Pa(), this.CR.Ae());
	this.U(l)
};
f.BrushToolBase.prototype.E5 = function(l, d, G, b, V) {
	var Q = this.HS,
		t = l.B[l.g[0]],
		I = l.FB.length != 0 ? l.vj[l.FB[0]] : t.ht <= 0 ? null : t.ht == 1 ? t.c3() : t.vZ(l).z,
		y = PixelUtil.allocBytes(V.O() * 4),
		e, M = t.Ka(0);
	if (I == null) {
		if (this.id == f.gg && d == "heal") PixelUtil.blitRgbaRect(t.buffer, t.rect, y, V);
		else PixelUtil.blitRgbaRect(this.Z4, this.XM, y, V);
		if (M) {
			e = PixelUtil.allocBytes(V.O());
			PixelUtil.extractChannelFromRgba(y, e, 3)
		}
	} else {
		f.BrushToolBase.JW(this.Z4, this.XM, I.color, y, V)
	}
	if (l.P && d != "qselect") {
		var R = V.wD(l.P.rect),
			J = PixelUtil.allocBytes(R.O() * 4);
		if (d == "copy") {
			var n = PixelUtil.allocBytes(R.O());
			PixelUtil.copyBufferRect(l.P.channel, l.P.rect, n, R);
			PixelUtil.blitRgbaRect(y, V, J, R);
			PixelUtil.blend.aX(G, b, J, R, n, R, 0, R, 1, !1)
		} else {
			PixelUtil.blitRgbaRect(G, b, J, R);
			PixelUtil.multiplyMaskIntoRgbaAlpha(l.P.channel, l.P.rect, J, R)
		}
		G = J;
		b = R
	}

	function r(g, kq) {
		var e8 = Math.max(kq.x, Math.min(kq.x + kq.m - 1, g.x)),
			aI = Math.max(kq.y, Math.min(kq.y + kq.n - 1, g.y));
		return new Point2D(e8, aI)
	}
	if (d == "idraw" || d == "ierase") {
		if (this.fv == null) this.fv = PixelUtil.allocBytes(this.XM.O());
		var T = this.HS.samp,
			j = this.mN.GF,
			g = r(this.FE, V),
			Y = T == 0 ? g : this.ne,
			k = Y.x,
			F = Y.y,
			D = f.xB.lu(this.Z4, this.XM, [Y, new Point2D(k - 2, F), new Point2D(k + 2, F), new Point2D(k, F - 2), new Point2D(k, F + 2)]);
		if (T == 2) D = [
			[j >>> 16 & 255, j >>> 8 & 255, j >>> 0 & 255, 255]
		];
		var q = f.xB.qe(y, V, g, D, this.HS.wconf),
			H = PixelUtil.allocBytes(V.O());
		PixelUtil.copyBufferRect(this.fv, this.XM, H, V);
		PixelUtil.QY.Cw(q, H, H);
		PixelUtil.copyBufferRect(H, V, this.fv, this.XM);
		PixelUtil.multiplyMaskIntoRgbaAlpha(H, V, G, b);
		d = d.slice(1)
	}
	if (d == "erase" && (f.u2.ac$(l) != 16777215 || I)) d = "draw";
	if (d == "draw") PixelUtil.blend.compositeBlend(Q.bmode, G, b, y, V, V, Q.opacity);
	else if (d == "erase") {
		var W = PixelUtil.allocBytes(V.O() * 4);
		PixelUtil.blitRgbaRect(G, b, W, V);
		if (I == null) {
			var Z = PixelUtil.allocBytes(V.O());
			PixelUtil.extractChannelFromRgba(W, Z, 3);
			PixelUtil.scaleRoundBytes(Z, Q.opacity);
			PixelUtil.invertUint32Buffer(Z);
			PixelUtil.multiplyMaskIntoRgbaAlpha(Z, V, y, V)
		} else {
			PixelUtil.andMaskUint32(W, 0, 4278190080);
			PixelUtil.blend.compositeBlend("norm", W, V, y, V, V, Q.opacity)
		}
	} else if (d == "clone" || d == "heal") {
		var B = this.t3(),
			a = this.cn.clone();
		a.offset(B.x, B.y);
		var m = V.clone();
		m.rC(1, 1);
		var p = PixelUtil.allocBytes(m.O() * 4),
			c = PixelUtil.allocBytes(m.O());
		PixelUtil.blitRgbaRect(G, b, p, m);
		PixelUtil.extractChannelFromRgba(p, c, 3);
		PixelUtil.andMaskUint32(p, 0);
		if (I == null) {
			PixelUtil.blitRgbaRect(this.Sg, a, p, m);
			var v = PixelUtil.allocBytes(m.O());
			PixelUtil.extractChannelFromRgba(p, v, 3);
			PixelUtil.multiplyBuffersPerChannel(v, c)
		} else f.BrushToolBase.JW(this.Sg, a, I.color, p, m);
		if (d == "clone") {
			PixelUtil.writeChannelToRgba(c, p, 3);
			PixelUtil.blend.compositeBlend(Q.bmode, p, m, y, V, V, Q.opacity)
		}
		if (d == "heal") {
			var i = c.slice(0);
			PixelUtil.round(i, 20);
			var z = PixelUtil.allocBytes(m.O() * 4);
			if (I == null) PixelUtil.blitRgbaRect(this.Z4, this.XM, z, m);
			else f.BrushToolBase.JW(this.Z4, this.XM, I.color, z, m);
			PixelUtil.blend.aX(p, m, z, m, i, m, 0, m, 1, !1);
			PixelUtil.f2.RQ(z, i, m);
			PixelUtil.blend.aX(z, m, y, V, c, m, 0, V, 1, !1)
		}
	} else if (d == "dodge" || d == "burn") {
		var p = PixelUtil.allocBytes(V.O() * 4),
			h = 1,
			L = 0,
			U = 0,
			S = 0;
		PixelUtil.blitRgbaRect(G, b, p, V);
		var P = V.O() * 4,
			C = f.BrushToolBase._y;
		if (this.Fb) {
			if (d == "dodge") d = "burn";
			else d = "dodge"
		}
		var E = Q.rng;
		if (d == "dodge") {
			L = [1 - h / 2, 1, 1 + h][E];
			U = [1, 1 / (1 + h), 1][E];
			S = [h / 2, 0, 0][E]
		}
		if (d == "burn") {
			L = [1 / (1 - h / 2), 1, 1 - h / 2][E];
			U = [1, 1 + h, 1][E];
			S = [-(h / 2) / (1 - h / 2), 0, 0][E]
		}
		for (var A = 0; A < P; A += 4) {
			var x = p[A + 3];
			y[A + 0] = C(y[A + 0], L, U, S, x);
			y[A + 1] = C(y[A + 1], L, U, S, x);
			y[A + 2] = C(y[A + 2], L, U, S, x)
		}
	} else if (d == "sponge" || d == "redeye") {
		var p = PixelUtil.allocBytes(V.O() * 4),
			c = PixelUtil.allocBytes(V.O());
		PixelUtil.blitRgbaRect(G, b, p, V);
		PixelUtil.extractChannelFromRgba(p, c, 3);
		PixelUtil.copyByteBuffer(y, p);
		var K = Q.smode;
		if (this.Fb) K = 1 - K;
		var u = FilterHelper.oT("hue2");
		if (d == "sponge") d8.fZ(u, 0, [0, [-50, 46][K],
			[6, 5][K]
		]);
		else d8.fZ(u, 1, {
			mE: [265, 305, 25, 55],
			I3: [0, -90, -70]
		});
		var bC = LayerEffectsHelper.buildEffect("hue2", u);
		LayerEffectsHelper.Qz(bC, p, p, V);
		PixelUtil.blend.aX(p, V, y, V, c, V, 0, V, 1, !1)
	} else if (d == "copy") PixelUtil.blitRgbaRect(G, b, y, V);
	else if (d == "sheal") {
		var p = PixelUtil.allocBytes(V.O() * 4),
			c = PixelUtil.allocBytes(V.O());
		PixelUtil.blitRgbaRect(G, b, p, V);
		PixelUtil.extractChannelFromRgba(p, c, 3);
		p.fill(0);
		var O = this.Sg,
			$ = this.cn;
		if (I) {
			O = PixelUtil.allocBytes($.O() * 4);
			f.BrushToolBase.JW(this.Sg, $, 0, O, $)
		}
		var gX = PixelUtil.Xa.RQ(O, $, c, p, V);
		if (gX != 0) PixelUtil.blitRgbaRect(O, $, p, V);
		if (this.HS.sfrom == 0) PixelUtil.blitRgbaRect(p, V, y, V);
		else {
			PixelUtil.blitRgbaRect(this.Z4, this.XM, y, V);
			PixelUtil.writeChannelToRgba(c, p, 3);
			PixelUtil.blend.compositeBlend("norm", p, V, y, V, V, 1)
		}
	} else if (d == "qselect") {
		var _ = this.XM,
			jI = _.m,
			iw = _.n,
			hn = jI * iw,
			jq = this.CR.XI(),
			D = this.Z4,
			iv = f.GS.xp,
			c = iv.Ir;
		c.fill(128);
		for (var A = 0; A < hn; A++) {
			var kq = jq[A << 2],
				eE = jq[(A << 2) + 3];
			if (eE == 255 && (kq == 0 || kq == 255)) c[A] = kq
		}
		c[0] = c[jI - 1] = 0;
		c[(iw >>> 1) * jI] = c[(iw >>> 1) * jI + jI - 1] = 0;
		f.WC.NB(iv, !0);
		l.P = {
			rect: _,
			channel: iv.P.slice(0)
		};
		l.Of = !0
	}
	if (I == null) {
		if (M) PixelUtil.writeChannelToRgba(e, y, 3);
		PixelUtil.blitRgbaRect(y, V, t.buffer, t.rect)
	} else f.BrushToolBase.HL(y, V, I)
};
f.BrushToolBase.t3 = function() {
	return null
};
f.BrushToolBase._y = function(l, d, G, b, V) {
	var Q = l * (1 / 255),
		t = b + d * Math.pow(Q, G),
		I = Math.round(t * V + Q * (255 - V));
	return Math.max(0, Math.min(255, I))
};
f.BrushToolBase.JW = function(l, d, G, b, V) {
	var Q = PixelUtil.allocBytes(V.O());
	Q.fill(G);
	PixelUtil.copyBufferRect(l, d, Q, V);
	b.fill(255);
	PixelUtil.grayPlaneToRgbaChannels(Q, b)
};
f.BrushToolBase.HL = function(l, d, G) {
	var b = PixelUtil.allocBytes(d.O());
	PixelUtil.rgbaToGrayPlane(l, b);
	PixelUtil.copyBufferRect(b, d, G.channel, G.rect)
};
// Base class for selection and wand-style tools
f.GS = function(l, d, G) {
	f.AbstractTool.call(this, l, d, G);
	this.HS = {
		binop: 0,
		feat: 0,
		cstr: {
			sA: 0,
			x: 3,
			y: 2
		},
		wconf: [16, !0, !0],
		anta: !0,
		sall: !1
	};
	this.B0 = new Point2D(-1, -1);
	this.Xm = new Point2D(-1, -1);
	this.sK = "default";
	this.QF = null;
	this.O1 = !1;
	this.ph = new jV;
	this.bE = !1;
	this.eC = null;
	this.As = null;
	this.zg = !1;
	this.uQ = !1
};
f.GS.prototype = new f.AbstractTool;
f.GS.prototype.a8O = function() {
	var l = this.HS,
		d = [l.binop, l.feat];
	if (this.id == f.we) d.push(l.wconf);
	return d
};
f.GS.prototype.a6m = function(l, d, G) {
	var b = this.HS;
	b.binop = l[0];
	b.feat = l[1];
	b.wconf = l[2];
	this.FJ(G)
};
f.GS.prototype.FJ = function(l) {
	var d = new Action(ActionTypes.E.L, !0);
	d.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		HS: this.HS
	};
	l.dispatch(d)
};
f.GS.xp = {
	key: ""
};
f.GS.TM = function(l, d, G) {
	var b = {
		kT: l,
		a0: {
			classID: "setd",
			null: {
				t: "obj ",
				v: [{
					t: "prop",
					v: {
						classID: "Chnl",
						keyID: "fsel"
					}
				}]
			}
		}
	};
	if (d) b.a0.T = d;
	if (G != null) b.a0.AntA = {
		t: "bool",
		v: G
	};
	return b
};
f.GS.op = function(l, d, G) {
	return f.GS.TM("set", {
		t: "Objc",
		v: {
			classID: l,
			Top: {
				t: "UntF",
				v: {
					type: "#Pxl",
					val: d.y
				}
			},
			Left: {
				t: "UntF",
				v: {
					type: "#Pxl",
					val: d.x
				}
			},
			Btom: {
				t: "UntF",
				v: {
					type: "#Pxl",
					val: d.y + d.n
				}
			},
			Rght: {
				t: "UntF",
				v: {
					type: "#Pxl",
					val: d.x + d.m
				}
			}
		}
	}, G)
};
f.GS.TW = function(l, d, G) {
	var b = [],
		V = [],
		t = "set";
	for (var A = 0; A < l.length; A += 2) {
		b.push(l[A]);
		V.push(l[A + 1])
	}
	var Q = {
		t: "Objc",
		v: {
			classID: "Plgn",
			Pts: {
				t: "ObAr",
				v: {
					classID: "Pnt",
					arr: [{
						id: "Hrzn",
						type: "UnFl",
						uID: "#Pxl",
						arr: b
					}, {
						id: "Vrtc",
						type: "UnFl",
						uID: "#Pxl",
						arr: V
					}]
				}
			}
		}
	};
	if (d) t = ["set", "addTo", "subtractFrom", "interfaceWhite"][d];
	return f.GS.TM(t, Q, G)
};
f.GS.aoq = function(l, d, G) {
	var b = {
			t: "Objc",
			v: {
				classID: "Pnt",
				Hrzn: {
					t: "UntF",
					v: {
						type: "#Pxl",
						val: l.x
					}
				},
				Vrtc: {
					t: "UntF",
					v: {
						type: "#Pxl",
						val: l.y
					}
				}
			}
		},
		V = f.GS.TM("set", b);
	V.a0.Tlrn = {
		t: "long",
		v: d[0]
	};
	V.a0.AntA = {
		t: "bool",
		v: d[1]
	};
	V.a0.Cntg = {
		t: "bool",
		v: d[2]
	};
	if (G == !0) V.a0.Mrgd = {
		t: "bool",
		v: G
	};
	return V
};
f.GS.Cc = function(l) {
	return f.GS.TM("set", {
		t: "enum",
		v: {
			Ordn: l ? "Al" : "None"
		}
	})
};
f.GS.BG = function(l, d, G) {
	var b = {
		classID: "null"
	};
	if (l != "border") b.selectionModifyEffectAtCanvasBounds = {
		t: "bool",
		v: G
	};
	var V = {
		e: "By",
		c: "By",
		b: "Wdth",
		f: "Rds",
		s: "Rds"
	}[l[0]];
	b[V] = {
		t: "UntF",
		v: {
			type: "#Pxl",
			val: d
		}
	};
	return {
		kT: l,
		a0: b
	}
};
f.GS.agz = function(l, d, G) {
	var b = {
			t: "obj ",
			v: [{
				t: "prop",
				v: {
					classID: "Chnl",
					keyID: "fsel"
				}
			}]
		},
		V = {
			t: "obj ",
			v: [{
				t: "Enmr",
				v: {
					classID: "Chnl",
					typeID: "Chnl",
					enum: d
				}
			}]
		};
	if (G) V.v.push({
		t: "name",
		v: {
			classID: "Lyr",
			val: G
		}
	});
	var Q = [{
			classID: "null",
			null: b,
			T: V
		}, {
			classID: "null",
			null: V,
			T: b
		}, {
			classID: "null",
			null: V,
			From: b
		}, {
			classID: "null",
			null: V,
			With: b
		}],
		t = ["set", "add", "subtract", "interfaceIconFrameDimmed"];
	return {
		kT: t[l],
		a0: Q[l]
	}
};
f.GS.ael = function(l, d) {
	var G = new Action(ActionTypes.E.L, !0);
	G.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.Z3
	};
	if (!d.Wi) l.dispatch(G);
	G.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.Xe
	};
	if (!d.hq.vF) l.dispatch(G)
};
f.GS.prototype.TA = function(l, d, G, b, V) {
	// adds to history
	// console.log(l);
	f.GS.ael(d, V);
	this.QF = d;
	var Q = l.a,
		t, I, y = new Rect(0, 0, G.m, G.n),
		jp = !1,
		hG, hf, d2, gu;
	if (Q == "fromAction") {
		var e = l.lX,
			M = e.kT,
			R = e.a0,
			J = R ? R.selectionModifyEffectAtCanvasBounds : null,
			n = J && J.v;
		if (M == "colorRange") {
			if (R.Clrs) {
				var r = R.Clrs.v.Clrs,
					T = 0,
					j = 255,
					g = ["Shdw", "Mdtn", "Hghl"].indexOf(r),
					D = .4;
				if (g == 0) j = 60;
				else if (g == 1) {
					T = 100;
					j = 150
				} else T = 190;
				var Y = ["shadows", "midtones", "highlights"][g],
					k = R[Y + "LowerLimit"],
					F = R[Y + "UpperLimit"];
				if (k) T = k.v;
				if (F) j = F.v;
				var q = R[Y + "Fuzziness"];
				if (q) D = q.v / 100;
				t = f.GS.bG(G, T, j, D, !0)
			} else {
				var T = R.Mnm.v,
					j = R.Mxm.v,
					D;
				T = {
					Hm: T.Lmnc.v,
					aS: T.A.v,
					k: T.B.v
				};
				j = {
					Hm: j.Lmnc.v,
					aS: j.A.v,
					k: j.B.v
				};
				D = R.Fzns.v / 200;
				t = f.GS.bG(G, T, j, D)
			}
			I = [7, 8]
		} else if (M == "inverse") {
			if (G.P == null) {
				alert("No selection!");
				return
			}
			t = {
				channel: PixelUtil.allocBytes(y.O()),
				rect: y
			};
			PixelUtil.copyBufferRect(G.P.channel, G.P.rect, t.channel, t.rect);
			PixelUtil.invertUint32Buffer(t.channel);
			I = [7, 2]
		} else if (M == "expand") {
			var H = R.By.v.val,
				W = G.P.rect.clone();
			W.rC(H, H);
			var Z = PixelUtil.allocBytes(W.O()),
				B = PixelUtil.allocBytes(W.O());
			PixelUtil.copyBufferRect(G.P.channel, G.P.rect, B, W);
			PixelUtil.style.stroke(B, Z, W, H);
			t = {
				channel: Z,
				rect: W
			};
			I = [7, 4]
		} else if (M == "contract") {
			var H = R.By.v.val,
				a = G.P.rect.clone();
			a.rC(1, 1);
			if (!n) a = a.wD(y);
			var B = PixelUtil.allocBytes(a.O()),
				m = PixelUtil.allocBytes(B.length);
			PixelUtil.copyBufferRect(G.P.channel, G.P.rect, B, a);
			PixelUtil.invertUint32Buffer(B);
			PixelUtil.style.stroke(B, m, a, H);
			PixelUtil.invertUint32Buffer(m);
			t = {
				channel: m,
				rect: a
			};
			PixelUtil.cropGrayChannelInPlace(t);
			I = [7, 5]
		} else if (M == "border") {
			var H = R.Wdth.v.val;
			t = f.GS.abL(G.P, H / 2, H / 2);
			I = [7, 9]
		} else if (M == "feather" || M == "smoothness") {
			var H = R.Rds.v.val;
			t = f.GS.arH(G.P, H, M == "smoothness", y, n);
			I = M == "feather" ? [7, 6] : [19, 3, 0]
		} else if (M == "move") {
			var p = R.T.v,
				W = G.P.rect.clone();
			W.x += p.Hrzn.v.val;
			W.y += p.Vrtc.v.val;
			t = {
				channel: G.P.channel,
				rect: W
			};
			I = [7, 7]
		} else if (M == "grow" || M == "similar") {
			var c = this.HS.wconf.slice(0);
			if (R.Tlrn) c[0] = R.Tlrn.v;
			c[2] = M == "grow";
			var v = G.LT(),
				i = new Rect(0, 0, G.m, G.n),
				z = G.P.rect,
				P = Math.round(Math.sqrt(z.O()) / 10),
				C = PixelUtil.allocBytes(i.O());
			PixelUtil.copyBufferRect(G.P.channel, z, C, i);
			var h = [];
			for (var L = 0; L < z.n; L += P)
				for (var U = (z.O() + L) % P; U < z.m; U += P)
					if (G.P.channel[L * z.m + U] == 255) {
						var S = new Point2D(z.x + U, z.y + L);
						h.push(S);
						if (c[2]) PixelUtil.QY.Cw(f.xB.qe(v, i, S, null, c), C, C)
					}
			if (!c[2]) PixelUtil.QY.Cw(f.xB.qe(v, i, S, f.xB.lu(v, i, h), c), C, C);
			t = {
				channel: C,
				rect: i
			};
			I = M == "grow" ? "Grow Selection" : "Similar Selection";
			console.log(R)
		} else {
			var E = R.null.v,
				x = R.AntA != null && R.AntA.v;

			function K(bS) {
				var gg = bS.Top.v.val,
					aQ = bS.Left.v.val;
				return new Rect(aQ, gg, bS.Rght.v.val - aQ, bS.Btom.v.val - gg)
			}

			function u(bS) {
				var gg = bS[0].arr,
					bG = bS[1].arr,
					jj = {
						C: [],
						F: []
					};
				for (var A = 0; A < gg.length; A++) {
					jj.F.push(A == 0 ? "M" : "L");
					jj.C.push(gg[A], bG[A])
				}
				jj.F.push("Z");
				return jj
			}
			var bC = ["set", "addTo", "subtractFrom", "interfaceWhite"].indexOf(M),
				O = R.T ? R.T.v : null;
			if (O && O.classID == "Elps") {
				t = this.arA(f.OU.abv(K(O)));
				I = [10, 4]
			} else if (O && O.classID == "Rctn") {
				var $ = K(O);
				t = {
					channel: PixelUtil.allocBytes($.O()),
					rect: $.clone()
				};
				t.channel.fill(255);
				I = [10, 15]
			} else if (O && O.classID == "ObSl") {
				var $ = K(O),
					gX = f.GS.xp,
					_ = gX.rect,
					jI = gX.Ir,
					iw = _.m,
					hn = _.n,
					jq = $.x - _.x,
					iv = jq + $.m - 1,
					kq = Math.max(jq, Math.min(iv, jq + iv >>> 1)),
					eE = $.y - _.y,
					e8 = eE + $.n - 1,
					aI = Math.max(eE, Math.min(e8, eE + e8 >>> 1)),
					dK = Math.max(jq, 0),
					jC = Math.min(iv, iw),
					d7 = Math.max(eE, 0),
					ka = Math.min(e8, hn);
				jI.fill(128);
				if (0 <= eE)
					for (var U = dK; U < jC; U++) jI[eE * iw + U] = 0;
				if (e8 < hn)
					for (var U = dK; U < jC; U++) jI[e8 * iw + U] = 0;
				if (0 <= jq)
					for (var L = d7; L < ka; L++) jI[L * iw + jq] = 0;
				if (iv < iw)
					for (var L = d7; L < ka; L++) jI[L * iw + iv] = 0;
				var hS = f.Sl.aqf,
					eH = Math.round($.m * hS),
					kA = Math.round($.n * hS);
				for (var U = Math.max(0, kq - eH); U < Math.min(iw, kq + eH); U++) jI[aI * iw + U] = 255;
				for (var L = Math.max(0, aI - kA); L < Math.min(hn, aI + kA); L++) jI[L * iw + kq] = 255;
				f.WC.NB(gX, !0);
				t = {
					channel: gX.P.slice(0),
					rect: _.clone()
				};
				I = [10, 44]
			} else if (O && O.classID == "Plgn") {
				t = this.arA(u(O.Pts.v.arr));
				I = [10, 9]
			} else if (O && O.classID == "Pnt") {
				t = f.xB.a4n(G, new Point2D(O.Hrzn.v.val, O.Vrtc.v.val), [R.Tlrn.v, x, R.Cntg == null || R.Cntg.v], R.Mrgd ? R.Mrgd.v : !1);
				I = [10, 12]
			} else if (O && O.Ordn == "None") {
				t = null;
				I = [7, 1]
			} else if (O && O.Ordn == "Al") {
				var gq = y;
				if (G.g.length != 0) {
					var hb = G.root.O4(G.g[0]);
					while (hb.parent && hb.parent.parent) hb = hb.parent;
					if (hb.j.add.artb) gq = hb.j.dA()
				}
				t = {
					channel: PixelUtil.allocBytes(gq.O()),
					rect: gq
				};
				t.channel.fill(255);
				I = [7, 0]
			} else if (O && O[0] && O[0].v.keyID == "WrPt") {
				var ex = {
					a: "frompath",
					X9: [-1, 0, 0]
				};
				this.TA(ex, d, G, b, V);
				return
			} else {
				var fs = ["set", "add", "subtract", "interfaceIconFrameDimmed"].indexOf(M),
					f_ = M == "set" ? O : E,
					bD = f_[0].v.enum,
					ex;
				if (bD == "Trsp" || bD == "Msk" || bD == "vectorMask" || bD == "Trgt") {
					var ae = G.g[0];
					if (f_.length == 2) ae = PsdDescriptorHelper.E8(G, f_[1]);
					var em = ["Trsp", "Msk", "vectorMask"].indexOf(bD);
					if (bD == "Trgt" && G.B[ae].ht == 1) em = 1;
					ex = {
						a: "fromlayer",
						X9: [ae, em, fs]
					}
				} else {
					if (f_[0].t == "name") {
						var ae = 0;
						for (var A = 0; A < G.vj.length; A++)
							if (G.vj[A].name == f_[0].v.val) ae = A;
						ex = {
							a: "fromchannel",
							X9: [-5 - ae, 0, fs]
						}
					} else {
						var dY = ["RGB", "Rd", "Grn", "Bl"].indexOf(bD);
						ex = {
							a: "fromchannel",
							X9: [-1 - dY, 0, fs]
						}
					}
				}
				this.TA(ex, d, G, b, V);
				return
			}
			if (t) {
				if (!x) PixelUtil.round(t.channel);
				if (R.Fthr) t = f.GS.arH(t, R.Fthr.v.val, !1);
				if (M != "set" && G.P != null) t = PixelUtil.QY.De(t, G.P, bC)
			}
		}
		if (M == "expand" || M == "contract")
			if (!n && !y.contains(t.rect)) {
				var f7 = t.rect.wD(y),
					bM = PixelUtil.allocBytes(f7.O());
				PixelUtil.copyBufferRect(t.channel, t.rect, bM, f7);
				t.channel = bM;
				t.rect = f7
			}
	}
	if (Q == "qmask") {
		jp = !0;
		var jt = G.kg(),
			i = new Rect(0, 0, G.m, G.n);
		if (jt) {
			t = jt.rect.XB(i) && PixelUtil.bufferUniformValue(jt.channel, 255) ? null : {
				rect: jt.rect.clone(),
				channel: jt.channel.slice(0)
			};
			hG = jt
		} else {
			t = null;
			hf = new LayerRecord.LayerMask;
			hf.color = 0;
			hf.name = "Quick Mask";
			hf.jv = !0;
			if (G.P) {
				hf.rect = G.P.rect.clone();
				hf.channel = G.P.channel.slice(0)
			} else {
				hf.rect = i;
				hf.channel = PixelUtil.allocBytes(hf.rect.O());
				hf.channel.fill(255)
			}
		}
		I = [6, 6, 1];
		G.i_ = !0
	}
	if (Q == "setsel") {
		t = l.P;
		I = l.Il
	}
	if (Q == "crange") {
		var T = l.V5,
			j = l.Mp;
		t = f.GS.bG(G, T, j, l.Zl);
		I = [7, 8]
	}
	if (Q == "fromlayer" || Q == "fromchannel" || Q == "frompath") {
		var ip = l.X9[0],
			em = l.X9[1],
			bC = l.X9[2];
		if (Q == "fromlayer") {
			if (ip == null) ip = G.g[0];
			var aQ = G.B[ip];
			if (em == 0) {
				var iL = aQ.rect,
					jx = aQ.buffer;
				if (iL.W6()) return;
				var ep = PixelUtil.allocBytes(jx.length >>> 2);
				PixelUtil.extractChannelFromRgba(jx, ep, 3);
				t = {
					channel: ep,
					rect: iL.clone()
				}
			} else {
				if (aQ.z == null) aQ.QJ(G);
				var gz = em == 1 ? aQ.c3() : aQ.z;
				t = f.GS.a2R(gz, y)
			}
			this.track(f.GS.agz(bC, ["Trsp", "Msk"][em], aQ.getName()))
		} else if (Q == "frompath") {
			var ed = G.LW(),
				bo = ed[1],
				ed = ed[0],
				cv = !0;
			if (ip == null)
				if (ed.length == 0 || bo.length == 0) return;
			var d0 = ed[bo[0]];
			if (ip != null)
				for (var A = 0; A < ed.length; A++)
					if (ed[A].sy == ip) d0 = ed[A];
			var gz = d0.add.vmsk.c3(),
				c0 = gz.Pa();
			if (c0.O() == 0) return;
			var ep = gz.ZR();
			if (l.X9[3] != null) cv = l.X9[3];
			if (!cv) {
				ep = ep.slice(0);
				PixelUtil.round(ep)
			}
			d2 = [JSON.stringify(G.yK), JSON.stringify(G.jP)];
			gu = ["[]", "[]"];
			G.yK = [];
			G.jP = [];
			t = {
				channel: ep,
				rect: c0
			}
		} else {
			if (ip == null) ip = f.GS.apd(G);
			t = f.GS.afQ(G, ip)
		}
		if (bC != 0 && G.P) t = PixelUtil.QY.De(t, G.P, bC);
		I = [14, 11]
	}
	if (t != null && PixelUtil.bufferUniformValue(t.channel, 0)) {
		t = null;
		I = [7, 1]
	}
	if (t) PixelUtil.cropGrayChannelInPlace(t);
	var iH = new HistoryState(I, this);
	iH.data = {
		a: "changesel",
		Sd: G.P,
		le: t,
		kg: jp,
		adZ: hG,
		avJ: hf,
		zw: d2,
		ag0: gu
	};
	G.pushHistoryState(iH);
	this.applyRedo(iH.data, G)
};
f.GS.apd = function(l) {
	var d = 0;
	if (l.FB.length != 0) d = -5 - l.FB[0];
	else if (JSON.stringify(l.u.MX) == "[1,1,1]") d = -1;
	else d = -2 - l.u.MX.indexOf(1);
	return d
};
f.GS.afQ = function(l, d) {
	var G, b = new Rect(0, 0, l.m, l.n);
	if (-5 < d & d < 0) {
		var V = -d - 1,
			Q = l.LT(),
			t = PixelUtil.allocBytes(b.O());
		if (V == 0) PixelUtil.rgbaToGrayPlane(Q, t);
		else PixelUtil.extractChannelFromRgba(Q, t, V - 1);
		G = {
			channel: t,
			rect: b.clone()
		}
	}
	if (d < -4) {
		G = f.GS.a2R(l.vj[-d - 5], b)
	}
	return G
};
f.GS.a2R = function(l, d) {
	var G, b;
	if (l.cc() == 0) {
		b = l.Pa().clone();
		if (b.O() == 0) return;
		G = l.ZR()
	} else {
		b = d;
		G = PixelUtil.allocBytes(b.O());
		l.Ua(b, G)
	}
	return {
		channel: G,
		rect: b
	}
};
f.GS.prototype.Q0 = function(l) {
	return this.bE || l.oW && this.id != f.gc
};
f.GS.prototype.rv = function(l, d, G) {
	var b = new Action(d, !0);
	b.data = G;
	l.dispatch(b)
};
f.GS.prototype.avi = function(l, d) {
	var G = new Action(ActionTypes.E.L, !0);
	G.data = {
		a: ActionTypes.$.e5,
		ew: d
	};
	l.dispatch(G)
};
f.GS.prototype.Pa = function(l, d, G) {
	d = l.P == null || this.ph.ti(1) || this.ph.bP(1) ? d : null;
	var b = this.B0,
		V = this.Xm;
	if (G) {
		b.x = Math.max(0, Math.min(l.m, b.x));
		b.y = Math.max(0, Math.min(l.n, b.y));
		V.x = Math.max(0, Math.min(l.m, V.x));
		V.y = Math.max(0, Math.min(l.n, V.y))
	}
	var Q = f.Ga.k2(b, V, d, !0, this.HS.cstr),
		t = Q[0].x,
		I = Q[0].y,
		y = new Rect(t, I, Q[1].x - t, Q[1].y - I);
	if (G) {
		y.x = Math.max(y.x, 0);
		y.y = Math.max(y.y, 0)
	}
	return y
};
f.GS.prototype.dJ = function(l, d, G, b, V) {
	this.uQ = !0;
	if (this.jc()) return;
	this.QF = d;
	this.O1 = !1;
	this.ph.dJ(b);
	this.B0 = l.u.Zx(V.x, V.y);
	this.B0 = f.Pq.aM(l, this.B0, G);
	if (this.aqD(l, this.B0, b)) {
		this.bE = !0;
		this.eC = l.P.rect.clone();
		return
	}
	this.JO(l, G, b, V);
	l.u.M9 = new Rect
};
f.GS.prototype.aqD = function(l, d, G) {
	var b = G.l(KeyboardHandler.Zz),
		V = G.l(KeyboardHandler.Jm);
	if (l.P && !b && !V && this.HS.binop == 0) return PixelUtil.pointInMask(d, l.P.channel, l.P.rect);
	return !1
};
f.GS.prototype.JP = function(l, d, G, b, V) {
	this.QF = d;
	if (this.zg) return;
	var Q = l.u.Zx(V.x, V.y);
	if (Point2D.yZ(this.B0, Q) * l.u.N > 5) {
		this.O1 = !0;
		this.ph.JP()
	}
	if (b.l(KeyboardHandler.Mm)) {
		if (this.As == null) this.As = new Point2D(Q.x - this.B0.x, Q.y - this.B0.y);
		this.B0.x = Q.x - this.As.x;
		this.B0.y = Q.y - this.As.y
	} else this.As = null;
	this.Xm = Q;
	if (!this.bE) this.Xm = f.Pq.aM(l, this.Xm, G);
	if (this.aqD(l, this.Xm, b)) this.avi(d, "move");
	else this.avi(d, this.sK);
	if (this.bE) {
		var t = this.eC.clone();
		t.x += this.Xm.x - this.B0.x;
		t.y += this.Xm.y - this.B0.y;
		var I = f.Pq.wA(l, t, G);
		l.P.rect.x = Math.round(this.Xm.x - this.B0.x + this.eC.x + I[0]);
		l.P.rect.y = Math.round(this.Xm.y - this.B0.y + this.eC.y + I[1]);
		l.Of = !0;
		f.Pq.If(l, t, I);
		return
	}
	this.D2(l, G, b, V, d);
	if (l.u.M9) l.u.M9 = this.Pa(l, b)
};
f.GS.prototype.jc = function() {
	return !1
};
f.GS.prototype.Nl = function(l, d, G, b, V, Q) {
	var t = this.uQ;
	this.uQ = !1;
	if (Q || !t) return;
	l.u.M9 = null;
	this.Xm = l.u.Zx(V.x, V.y);
	this.Xm = f.Pq.aM(l, this.Xm, G);
	if (this.bE) {
		this.bE = !1;
		if (l != null && l.I.Cj) {
			l.I.Cj = null;
			l.uK = !0
		}
		if (this.Xm.XB(this.B0) && this.RN() == 0) {
			this.rv(d, ActionTypes.E.g5, f.GS.Cc());
			return
		}
		this.a3h(l, this.eC, l.P.rect.clone());
		return
	}
	// console.log(l, G, b, V, d);
	this.qd(l, G, b, V, d);
	f.GS.ael(d, G);
	this.ph.Nl();
	this.m8(d)
};
f.GS.prototype.a3h = function(l, d, G) {
	var b = l.getHeadHistoryState();
	if (b != null && b.G == this && b.data.a == "movesel") {} else {
		b = new HistoryState([7, 7], this);
		b.data = {
			a: "movesel",
			CQ: d
		};
		l.pushHistoryState(b)
	}
	b.data.wv = G;
	this.applyRedo(b.data, l)
};
f.GS.prototype.AJ = function(l, d, G, b, V) {
	this.zg = !0
};
f.GS.prototype.h_ = function(l, d, G, b, V) {
	var Q = new Action(ActionTypes.E.L, !0);
	Q.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		Zm: V,
		T1: l,
		wQ: G
	};
	d.dispatch(Q);
	this.zg = !1
};
f.GS.prototype.o9 = function(l, d, G, b) {
	this.ph.o9(b);
	if (l != null && l.P != null) {
		var V = b._9();
		if (V.x != 0 || V.y != 0) {
			var Q = l.P.rect.clone();
			Q.x += V.x;
			Q.y += V.y;
			this.a3h(l, l.P.rect.clone(), Q)
		}
	}
	this.m8(d)
};
f.GS.prototype.m8 = function(l) {
	var d = new Action(ActionTypes.E.L, !0);
	d.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		Si: this.RN()
	};
	l.dispatch(d)
};
f.GS.prototype.RN = function() {
	var l = this.ph.ti(0),
		d = this.ph.bP(0);
	return f.GS.Wg(this.HS.binop, l, d)
};
f.GS.Wg = function(l, d, G) {
	if (d) l = 1;
	if (G) l = 2;
	if (d && G) l = 3;
	return l
};
f.GS.prototype.finish = function(l, d, G, b) {
	var V = l.P,
		Q = this.getSelection(l, d, G, b);
	if (Q == null) Q = f.GS.Cc();
	else {
		var t = this.HS.feat,
			I = this.RN();
		if (t != 0) Q.a0.Fthr = {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: t
			}
		};
		if (I != 0 && I != 4) Q.kT = ["", "addTo", "subtractFrom", "interfaceWhite", ""][I]
	}
	this.rv(this.QF, ActionTypes.E.g5, Q);
	this.B0.T6(-1, -1);
	this.Xm.T6(-1, -1)
};
f.GS.prototype.getSelection = function(l, d, G, b) {
	return null
};
f.GS.prototype.JO = function(l, d, G, b) {};
f.GS.prototype.D2 = function(l, d, G, b) {};
f.GS.prototype.qd = function(l, d, G, b) {};
f.GS.prototype.applyUndo = function(l, d) {
	var G = l.a;
	if (G == "changesel") d.P = l.Sd;
	if (G == "movesel") d.P.rect = l.CQ;
	if (l.kg) {
		if (l.adZ) {
			d.FB = [d.vj.length];
			d.vj.push(l.adZ)
		} else {
			d.vj.pop();
			d.FB = []
		}
	}
	if (l.zw) {
		d.yK = JSON.parse(l.zw[0]);
		d.jP = JSON.parse(l.zw[1])
	}
	d.Of = !0
};
f.GS.prototype.applyRedo = function(l, d) {
	var G = l.a;
	if (G == "changesel") d.P = l.le;
	if (G == "movesel") d.P.rect = l.wv;
	if (l.kg) {
		if (l.avJ) {
			d.FB = [d.vj.length];
			d.vj.push(l.avJ)
		} else {
			d.vj.pop();
			d.FB = []
		}
	}
	if (l.zw) {
		d.yK = JSON.parse(l.ag0[0]);
		d.jP = JSON.parse(l.ag0[1])
	}
	d.Of = !0
};
f.GS.prototype.A0 = function(l) {
	this.HS = l.HS
};
f.GS.prototype.arA = function(l) {
	var d = PixelUtil.vec.flattenPath(l.C);
	if (d.W6()) return null;
	var G = PixelUtil.getScratch2dContext(d.m, d.n);
	G.save();
	G.beginPath();
	G.translate(-d.x, -d.y);
	Typr.U.pathToContext({
		cmds: l.F,
		crds: l.C
	}, G);
	G.closePath();
	G.fill();
	G.restore();
	var b = PixelUtil.allocBytes(d.O()),
		V = G.getImageData(0, 0, d.m, d.n);
	PixelUtil.extractChannelFromRgba(V.data, b, 3);
	return {
		rect: d,
		channel: b
	}
};
f.GS.arH = function(l, d, G, b, V) {
	if (G) d = Math.round(d * .7);
	var Q = Math.ceil(2.6 * d),
		t = l.rect.clone();
	t.rC(Q, Q);
	if (b && !V) t = t.wD(b);
	var I = PixelUtil.allocBytes(t.O()),
		y = PixelUtil.allocBytes(I.length);
	PixelUtil.copyBufferRect(l.channel, l.rect, y, t);
	PixelUtil.sX.Dj(y, I, t, d);
	if (G) {
		var e = I.length;
		for (var A = 0; A < e; A++) {
			var M = (I[A] - 128) * d * 2.5;
			I[A] = Math.max(0, Math.min(255, Math.round(128 + M)))
		}
	}
	return {
		channel: I,
		rect: t
	}
};
f.GS.abL = function(l, d, G) {
	var b = Math.max(1, Math.ceil(G)),
		V = l.rect.clone();
	V.rC(b, b);
	var Q = V.O(),
		t = {
			channel: PixelUtil.allocBytes(Q),
			rect: V
		},
		I = PixelUtil.allocBytes(Q);
	PixelUtil.copyBufferRect(l.channel, l.rect, I, t.rect);
	if (G != 0) PixelUtil.style.stroke(I, t.channel, t.rect, G);
	else PixelUtil.copyByteBuffer(I, t.channel);
	var y = PixelUtil.allocBytes(Q);
	PixelUtil.invertUint32Buffer(I);
	if (d != 0) PixelUtil.style.stroke(I, y, t.rect, d);
	else PixelUtil.copyByteBuffer(I, y);
	PixelUtil.QY.wD(t.channel, y, t.channel);
	return t
};
f.GS.bG = function(l, d, G, b, V) {
	var Q = new Rect(0, 0, l.m, l.n),
		t = l.LT();
	if (l.P) {
		var I = l.P.rect.wD(Q),
			y = PixelUtil.allocBytes(I.O() * 4);
		PixelUtil.blitRgbaRect(t, Q, y, I);
		Q = I;
		t = y
	}
	var e = Q.O(),
		M = PixelUtil.allocBytes(e),
		R = 1 / b;
	if (V) {
		if (d >= G) d = G - 1;
		var J = d * (1 - b),
			n = d,
			r = G,
			T = G + (255 - G) * b,
			j = J == n ? 0 : 1 / (n - J),
			g = r == T ? 0 : 1 / (T - r);
		for (var A = 0; A < e; A++) {
			var Y = A << 2,
				k = PixelUtil.luminanceRgb(t[Y], t[Y + 1], t[Y + 2]),
				F = 0;
			if (k < J) F = 0;
			else if (k < n) F = (k - J) * j;
			else if (k <= r) F = 1;
			else if (k <= T) F = 1 - (k - r) * g;
			else F = 0;
			M[A] = t[Y + 3] * F * F
		}
	} else
		for (var A = 0; A < e; A++) {
			var Y = A << 2,
				D = PixelUtil.rgbToLab(t[Y], t[Y + 1], t[Y + 2]),
				F = PixelUtil.labBlendWeight(D, d, G, b, R);
			M[A] = t[Y + 3] * F
		}
	return {
		rect: Q,
		channel: M
	}
};
// Blur Tool
f.ZM = function() {
	f.BrushToolBase.call(this, "Blur Tool", f.Yx, "tools/blur");
	this.yr = "copy"
};
f.ZM.prototype = new f.BrushToolBase;
f.ZM.prototype.dJ = function(l, d, G, b, V) {
	var Q = b.l(KeyboardHandler.Jm) ? iU.wB : iU.Yx;
	this.Us(l, G, b, V, this.HS.strn, Q);
	if (this.CR == null) return;
	this.zX(l)
};
f.ZM.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Brush Tool
f.Yv = function() {
	f.BrushToolBase.call(this, "Brush Tool", f.CV, "tools/brush");
	this.yr = "draw"
};
f.Yv.prototype = new f.BrushToolBase;
f.Yv.prototype.dJ = function(l, d, G, b, V) {
	if (this.I4(b, d, V)) return;
	this.Us(l, G, b, V, this.HS.flow);
	if (this.CR == null) return;
	this.zX(l)
};
f.Yv.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Color Replacement Tool
f.fy = function() {
	f.BrushToolBase.call(this, "Color Replacement", f.gS, "tools/crepl");
	this.yr = "idraw";
	this.HS.bmode = "hue "
};
f.fy.prototype = new f.BrushToolBase;
f.fy.prototype.dJ = function(l, d, G, b, V) {
	if (this.I4(b, d, V)) return;
	this.Us(l, G, b, V, this.HS.flow);
	if (this.CR == null) return;
	this.zX(l)
};
f.fy.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Red Eye Tool
f.oA = function() {
	f.BrushToolBase.call(this, "Red Eye Tool", f.A9, "tools/redeye");
	this.HS.smode = 0;
	this.yr = "redeye"
};
f.oA.prototype = new f.BrushToolBase;
f.oA.prototype.dJ = function(l, d, G, b, V) {
	this.Us(l, G, b, V, this.HS.flow);
	if (this.CR == null) return;
	this.zX(l)
};
f.oA.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Pencil Tool
f.D0 = function() {
	f.BrushToolBase.call(this, "Pencil Tool", f.zG, "tools/pencil");
	this.yr = "draw"
};
f.D0.prototype = new f.BrushToolBase;
f.D0.prototype.dJ = function(l, d, G, b, V) {
	if (this.I4(b, d, V)) return;
	this.Us(l, G, b, V, this.HS.flow);
	if (this.CR == null) return;
	this.zX(l)
};
f.D0.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Burn Tool
f.BurnTool = function() {
	f.BrushToolBase.call(this, "Burn Tool", f.S0, "tools/burn");
	this.yr = "burn"
};
f.BurnTool.prototype = new f.BrushToolBase;
f.BurnTool.prototype.dJ = function(l, d, G, b, V) {
	this.Us(l, G, b, V, this.HS.expo / Math.E);
	if (this.CR == null) return;
	this.zX(l)
};
f.BurnTool.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Base class for clone/heal stamp tools
f.ix = function(l, d, G) {
	f.BrushToolBase.call(this, l == "" ? null : l ? l : [10, 1], d ? d : f.uv, G ? G : "tools/clone");
	this.yr = "clone";
	this.AY = null;
	this.R = null
};
f.ix.prototype = new f.BrushToolBase;
f.ix.prototype.dJ = function(l, d, G, b, V) {
	var Q = this.HS,
		t = Q.alt[0];
	if (b.l(KeyboardHandler.Jm) || b.l(KeyboardHandler.TY) || t) {
		this.AY = l.u.Zx(V.x, V.y);
		this.R = null;
		if (t) this.ft({
			alt: [!1]
		}, d);
		this.rY(l);
		this.ed(G, b, l, V);
		return
	}
	if (this.AY == null) {
		alert("Select clone source by holding Alt (or K) and clicking on the image.");
		return
	}
	this.ed(G, b);
	this.Us(l, G, b, V, this.HS.flow);
	if (this.CR == null) return;
	this.R = this.a39(l.u.Zx(V.x, V.y));
	this.zX(l)
};
f.ix.prototype.a39 = function(l) {
	var d = this.R;
	if (d == null || !this.HS.algnd) d = new Point2D(Math.round(l.x - this.AY.x), Math.round(l.y - this.AY.y));
	return d
};
f.ix.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) {
		if (this.AY != null) this.ed(G, b, l, V);
		return
	}
	if (!V.oW || this.AY == null) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
f.ix.prototype.t3 = function() {
	return this.R
};
// Base class for crop and perspective-crop tools
f.Gt = function(l, d, G) {
	f.AbstractTool.call(this, l, d, G);
	this.mx = {
		nV: {
			sA: 0,
			x: 0,
			y: 0
		},
		UP: !1
	};
	this.lZ = !1;
	this.JD = null;
	this.cursor = null;
	this.awU = 0;
	this.oS = null;
	this.B0 = null;
	this.ga = null;
	this.gY = !1
};
f.Gt.prototype = new f.AbstractTool;
f.Gt.prototype.in = function() {
	return this.JD != null
};
f.Gt.prototype.Q0 = function(l) {
	return this.B0 != null || this.JD && this.JD.aq5()
};
f.Gt.prototype.dJ = function(l, d, G, b, V) {
	this.oS = V;
	var Q = l.u.Zx(V.x, V.y),
		t = this.mx.nV,
		I = t.sA != 0 ? t.x / t.y : null,
		y = this.gY;
	this.gY = !1;
	if (this.JD) {
		var e = this.JD.Rg(Q, l.u.N);
		if (y && e == null) {
			this.JD.clear(l);
			this.JD = null
		} else {
			this.JD.dJ(l, G, b, Q, I, !1, V);
			return
		}
	}
	this.B0 = f.Pq.aM(l, Q, G)
};
f.Gt.prototype.i3 = function(l, d, G) {
	if (G == null) G = [l.x, l.y, l.x + l.m, l.y, l.x + l.m, l.y + l.n, l.x, l.y + l.n];
	return new gG(G, !0, !1, this.id == f.gt, !0, d, this.id == f.gt ? 2 : 0, this.id == f.gt ? 4 : 3)
};
f.Gt.prototype.ed = function(l) {
	var d = new Action(ActionTypes.E.L, !0);
	d.data = {
		a: ActionTypes.$.e5,
		ew: this.cursor
	};
	l.dispatch(d)
};
f.Gt.prototype.enable = function(l, d, G, b) {
	this.QF = d;
	this.cursor = "crosshair";
	this.ed(d);
	if (l != null && this.JD == null) {
		var V = l.P ? {
			DI: "cropby",
			ajO: 3
		} : {
			DI: "config",
			mx: this.mx,
			amr: !0
		};
		this.A0(V, d, l, b, G);
		if (l.P == null && this.mx.nV.sA == 0) this.gY = !0
	}
};
f.Gt.prototype.JP = function(l, d, G, b, V) {
	this.oS = V;
	var Q = l.u.Zx(V.x, V.y);
	if (!V.oW) {
		var t = "crosshair";
		if (this.JD) {
			var I = this.JD.Rg(Q, l.u.N, null, V);
			if (I) t = I;
			else t = "default"
		}
		if (t != this.cursor) {
			this.cursor = t;
			this.ed(d)
		}
	}
	if (this.JD) this.JD.JP(l, G, b, Q);
	else if (this.B0) {
		if (this.lZ) {
			l.I.Bt = {
				F: ["M", "L"],
				C: [this.B0.x, this.B0.y, Q.x, Q.y]
			}
		} else {
			var y = f.Ga.k2(this.B0, f.Pq.aM(l, Q, G), b, !0, this.mx.nV),
				e = y[0].x,
				M = y[0].y,
				R = this.ga = new Rect(e, M, y[1].x - e, y[1].y - M);
			l.I.Bt = PixelUtil.vec.simplifyPath(R);
			f.AbstractTool.nk(V, R, l, G)
		}
		l.uK = !0
	}
};
f.Gt.a3O = function(l, d, G) {
	var b, V, I, y;
	if (d <= G) {
		b = d;
		V = G
	} else {
		b = G;
		V = d
	}
	var Q = l - Math.floor((l + Math.PI) / (2 * Math.PI)) * 2 * Math.PI;
	Q = Math.abs(Q);
	if (Q > Math.PI / 2) Q = Math.PI - Q;
	var t = b / (V * Math.sin(Q) + b * Math.cos(Q));
	if (d <= G) {
		I = b * t;
		y = V * t
	} else {
		I = V * t;
		y = b * t
	}
	return {
		iJ: I,
		Tq: y
	}
};
f.Gt.prototype.Nl = function(l, d, G, b, V) {
	this.oS = V;
	var Q = l.u.Zx(V.x, V.y);
	if (this.JD == null) {
		var t = this.ga;
		if (this.B0 && (t || this.lZ)) {
			if (this.lZ) {
				var I = this.B0,
					y = Q;
				if (I.x > y.x) {
					var e = I;
					I = y;
					y = e
				}
				var I = Math.atan2(-(y.y - I.y), y.x - I.x),
					M = f.Gt.a3O(I, l.m, l.n),
					R = [0, 0, M.iJ, 0, M.iJ, M.Tq, 0, M.Tq],
					J = new Matrix2D;
				J.translate(-M.iJ / 2, -M.Tq / 2);
				J.rotate(I);
				J.translate(l.m / 2, l.n / 2);
				PixelUtil.vec.transformCoords(R, J, R);
				this.JD = this.i3(t, !1, R);
				l.I.Bt = null;
				this.lZ = !1
			} else {
				var n = this.mx.nV;
				this.JD = this.i3(t, n.sA != 0)
			}
			this.JD.cN(l, G);
			this.ga = null;
			this.rv(d, ActionTypes.E.L, {
				a: ActionTypes.$.vq,
				G: this.id,
				rl: !0
			});
			this.B0 = null;
			l.I.P4 = [];
			l.uK = !0
		}
		return
	}
	this.JD.Nl(l, G, b, Q);
	this.rv(d, ActionTypes.E.L, {
		a: ActionTypes.$.vq,
		G: this.id,
		rl: !0
	});
	var R = this.JD.Pn();
	if (Math.abs(R[0] - R[4]) < 2 && Math.abs(R[1] - R[5]) < 2) {
		this.disable(l, d, null, b);
		return
	}
	if (Date.now() - this.awU < 200 && this.JD.yo(Q)) {
		this.Qw(l, G);
		this.disable(l, d, G, b);
		return
	}
	this.awU = Date.now()
};
f.Gt.prototype.o9 = function(l, d, G, b) {
	var V = this.JD;
	if (V == null || this.oS && this.oS.oW) return;
	if (b.l(KeyboardHandler.lm)) {
		this.Qw(l, G);
		this.disable(l, d, G, b)
	} else if (b.l(KeyboardHandler.mp)) {
		this.disable(l, d, G, b)
	} else V.o9(l, G, b)
};
f.Gt.adf = function(l, d, G) {
	var b = {
		classID: "null",
		T: {
			t: "Objc",
			v: {
				classID: "Rctn",
				Top: {
					t: "UntF",
					v: {
						type: "#Pxl",
						val: l[1]
					}
				},
				Left: {
					t: "UntF",
					v: {
						type: "#Pxl",
						val: l[0]
					}
				},
				Btom: {
					t: "UntF",
					v: {
						type: "#Pxl",
						val: l[1] + l[3]
					}
				},
				Rght: {
					t: "UntF",
					v: {
						type: "#Pxl",
						val: l[0] + l[2]
					}
				}
			}
		},
		Angl: {
			t: "UntF",
			v: {
				type: "#Ang",
				val: d != null ? d : 0
			}
		},
		Dlt: {
			t: "bool",
			v: G != null ? G : !0
		},
		cropAspectRatioModeKey: {
			t: "enum",
			v: {
				cropAspectRatioModeClass: "pureAspectRatio"
			}
		},
		CnsP: {
			t: "bool",
			v: !1
		}
	};
	return {
		kT: "crop",
		a0: b
	}
};
f.Gt.bh = function(l, d) {
	if (d == null) d = [!0, !0, !0, !0];
	var G = {
			classID: "trim",
			trimBasedOn: {
				t: "enum",
				v: {
					trimBasedOn: ["topLeftPixelColor", "bottomRightPixelColor", "Trns"][l]
				}
			}
		},
		b = ["Top", "Left", "Btom", "Rght"];
	for (var A = 0; A < 4; A++) G[b[A]] = {
		t: "bool",
		v: d[A]
	};
	return {
		kT: "trim",
		a0: G
	}
};
f.Gt.amk = function(l, d, G, b) {
	var V = {
		classID: "null"
	};
	if (b != null) {
		V.Wdth = {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: l
			}
		};
		V.Hght = {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: d
			}
		};
		V.Intr = {
			t: "enum",
			v: {
				Intp: ["Nrst", "Blnr", "bicubicSharper"][b]
			}
		}
	}
	if (G != null) V.Rslt = {
		t: "UntF",
		v: {
			type: "#Rsl",
			val: G
		}
	};
	return {
		kT: "imageSize",
		a0: V
	}
};
f.Gt.ars = function(l, d, G) {
	if (G == null) G = 4;
	var b = Math.floor(G / 3),
		V = G % 3;
	return {
		kT: "canvasSize",
		a0: {
			classID: "null",
			Wdth: {
				t: "UntF",
				v: {
					type: "#Pxl",
					val: l
				}
			},
			Hght: {
				t: "UntF",
				v: {
					type: "#Pxl",
					val: d
				}
			},
			Hrzn: {
				t: "enum",
				v: {
					HrzL: ["Left", "Cntr", "Rght"][V]
				}
			},
			Vrtc: {
				t: "enum",
				v: {
					VrtL: ["Top", "Cntr", "Btom"][b]
				}
			}
		}
	}
};
f.Gt.prototype.TA = function(l, d, G, b, V) {
	var Q = new Rect(0, 0, G.m, G.n),
		t = [11, 3],
		I = G.m7,
		y = G.m / 2,
		e = G.n / 2,
		M = 1,
		E, x, K;
	if (l.a == "fromAction") {
		var R = l.lX,
			J = R.kT,
			n = R.a0,
			r = G.m / G.n,
			T = n.Wdth ? n.Wdth.v.val : -1,
			j = n.Hght ? n.Hght.v.val : -1,
			I = n.Rslt ? n.Rslt.v.val : null,
			g = n.Wdth ? n.Wdth.v.type : n.Hght ? n.Hght.v.type : -1,
			Y = 1,
			k;
		if (g == "#Prc") {
			if (T != -1) T = Math.round(G.m * T / 100);
			if (j != -1) j = Math.round(G.n * j / 100)
		}
		if (J == "imageSize") {
			if (n.Intr) {
				if (n.Intr.v.Intp == "Nrst") Y = 0;
				if (n.Intr.v.Intp == "bicubicSharper") Y = 2;
				if (T == -1 && j == -1) {
					var F = I / G.m7;
					T = Math.round(G.m * F);
					j = Math.round(G.n * F)
				}
				if (n.CnsP && n.CnsP.v) {
					if (T == -1) T = Math.round(j * r);
					if (j == -1) j = Math.round(T / r)
				}
			} else {
				if (g == "#Prc") I = Math.round(G.m7 * (G.m / T));
				else if (g == -1) I = Math.round(I);
				else throw "e";
				T = G.m;
				j = G.n
			}
			k = {
				a: "imgsize",
				rN: T,
				TN: j,
				Ti: I,
				Nq: Y
			}
		} else if (J == "canvasSize") {
			if (T == -1) T = G.m;
			if (j == -1) j = G.n;
			if (n.Rltv && n.Rltv.v == !0) {
				if (n.Wdth) T += G.m;
				if (n.Hght) j += G.n
			}
			var D = n.Vrtc ? n.Vrtc.v.VrtL : "Cntr",
				q = n.Hrzn ? n.Hrzn.v.HrzL : "Cntr";
			k = {
				a: "canvsize",
				rN: T,
				TN: j,
				BL: 3 * ["Top", "Cntr", "Btom"].indexOf(D) + ["Left", "Cntr", "Rght"].indexOf(q)
			}
		} else if (J == "revealAll") {
			k = {
				a: "revealAll"
			}
		} else if (J == "trim") {
			var H = {
				topLeftPixelColor: 0,
				bottomRightPixelColor: 1,
				Trns: 2
			}[n.trimBasedOn.v.trimBasedOn];
			if (H == null) throw "e";
			var W = ["Top", "Left", "Btom", "Rght"],
				Z = [!0, !0, !0, !0];
			for (var A = 0; A < 4; A++)
				if (n[W[A]]) Z[A] = n[W[A]].v;
			k = {
				a: "trim",
				a5b: H,
				Tf: Z
			}
		} else if (J == "crop") {
			var B, a, m, p;
			if (n.T) {
				var c = n.T.v,
					B = Math.round(c.Left.v.val),
					a = Math.round(c.Top.v.val),
					m = Math.round(c.Rght.v.val) - B,
					p = Math.round(c.Btom.v.val) - a
			} else {
				var v = G.P.rect;
				B = v.x;
				a = v.y;
				m = v.m;
				p = v.n
			}
			k = {
				a: "canvsize",
				rN: m,
				TN: p,
				R: new Point2D(B, a),
				auw: n.Dlt != null && n.Dlt.v
			}
		} else console.log(R);
		if (k) this.TA(k, d, G, b, V);
		return
	} else if (l.a == "imgsize") {
		Q = new Rect(0, 0, l.rN, l.TN);
		if (l.Ti) I = l.Ti;
		M = l.Nq
	} else if (l.a == "canvsize") {
		var i = l.BL != null ? l.BL : 0;
		Q = new Rect(0, 0, l.rN, l.TN);
		var z = G.m - l.rN,
			P = G.n - l.TN,
			C = Math.round(z / 2),
			h = Math.round(P / 2);
		if (i == 1 || i == 4 || i == 7) Q.x = C;
		if (i == 2 || i == 5 || i == 8) Q.x = z;
		if (i == 3 || i == 4 || i == 5) Q.y = h;
		if (i == 6 || i == 7 || i == 8) Q.y = P;
		if (l.R) {
			Q.x = l.R.x;
			Q.y = l.R.y
		}
	} else if (l.a == "rot" && (l.Z + 2 * Math.PI) % (Math.PI / 2) != 0) {
		var L = PixelUtil.vec.simplifyPath(Q).C,
			U = new Matrix2D;
		U.translate(-y, -e);
		U.rotate(l.Z);
		U.translate(y, e);
		PixelUtil.vec.transformCoords(L, U, L);
		Q = PixelUtil.vec.flattenPath(L)
	} else if (l.a == "rot" && l.Z != Math.PI && l.Z != -Math.PI) {
		Q = new Rect(y - G.n / 2, e - G.m / 2, G.n, G.m);
		if ((G.m + G.n & 1) == 1) {
			y = Math.floor(y);
			e = Math.floor(e);
			Q = new Rect(y - Math.floor(G.n / 2), e - Math.floor(G.m / 2), G.n, G.m);
			if ((G.m & 1) == 1 && l.Z != -Math.PI / 2) Q.y--;
			if ((G.n & 1) == 1 && l.Z == -Math.PI / 2) Q.x--
		}
	} else if (l.a == "trim") {
		t = [11, 12, 0];
		var S = G.LT(),
			v = new Rect(0, 0, G.m, G.n);
		Q = PixelUtil.tightBoundsFromRgba(S, v, l.a5b, l.Tf);
		if (Q.W6()) Q = v
	} else if (l.a == "revealAll") {
		t = [11, 12, 2];
		Q = G.root.Pa(G, !0)
	}
	var u = l.a == "canvsize" && l.auw;
	if (l.a == "imgsize" || l.a == "rot" || l.a == "scl" || u) {
		var bC = new Matrix2D;
		if (l.a == "imgsize") {
			t = [11, 10];
			bC.scale(l.rN / G.m, l.TN / G.n);
			K = G.Ww();
			for (var A = 0; A < K[0].length; A++) K[0][A][1] *= K[0][A][0] == 0 ? bC.aS : bC.Qd
		} else if (u) {} else {
			bC.translate(-y, -e);
			if (l.a == "rot") bC.rotate(l.Z);
			if (l.a == "scl") bC.scale(l.Z.x, l.Z.y);
			bC.translate(y, e);
			t = l.Il
		}
		x = PixelUtil.canvas.pu(bC);
		E = this.i1(G, V, !0, x, M, u ? Q : null)
	} else if (l.a == "auto-align") {
		if (G.g.length < 2) {
			alert("Select two or more layers.");
			return
		}
		var O = [];
		for (var A = 0; A < G.g.length; A++) {
			var $ = G.B[G.g[A]];
			if (!$.Eo() && $.add.SoLd == null) {
				alert("Unsupported layer selected.");
				return
			}
			if ($.rect.W6()) {
				alert("Empty layer selected.");
				return
			}
			O.push([$.buffer, $.rect])
		}
		var gX = PixelUtil.Gf.XC(O, 0);
		if (gX == null) {
			alert("No similarity found.");
			return
		}
		x = gX[1];
		var _ = G.g;
		G.g = G.g.slice(1);
		E = this.i1(G, V, !1, gX.slice(1), M);
		G.g = _;
		Q = G.root.Pa(G, !0);
		t = [2, 10, 1]
	}
	var jI = new Rect(0, 0, G.m, G.n);
	if (!Q.W6() && (!Q.XB(jI) || E != null)) {
		var iw = new HistoryState(t, this);
		iw.data = {
			aiW: G.m7,
			Ti: I,
			pt: E,
			w6: x,
			Nx: f.Gt.afE(G, Q, jI, E != null)
		};
		if (K) {
			iw.data.a8z = G.Ww();
			iw.data.ax0 = K
		}
		f.Gt.amm(G, iw.data, Q);
		G.pushHistoryState(iw);
		this.applyRedo(iw.data, G)
	}
};
f.Gt.afE = function(l, d, G, b) {
	if (l.Vp.length == 0) return null;
	var V = JSON.stringify(l.Vp),
		Q = JSON.parse(V);
	f.UA.a0O(Q, d, G, b);
	Q = JSON.stringify(Q);
	return [V, Q]
};
f.Gt.prototype.i1 = function(l, d, G, b, V, Q) {
	var t = {
		B: [],
		bg: null,
		SQ: null
	};
	if (G) {
		for (var A = 0; A < l.B.length; A++) t.B.push(A);
		for (var A = 0; A < l.t_.length; A++) t.B.push(-1 - A);
		for (var A = 0; A < l.vj.length; A++) t.B.push(-1e3 - A)
	} else t.B = l.g.slice(0);
	t.bg = f.NH.RL(l, t.B, !0);
	f.NH.tF(l, d, t.B, t.bg, V, b, null, !0, Q);
	t.SQ = f.NH.RL(l, t.B, !0);
	return t
};
f.Gt.prototype.applyRedo = function(l, d) {
	if (l.Ti) d.m7 = l.Ti;
	if (l.Nx) d.Vp = JSON.parse(l.Nx[1]);
	if (l.pt) {
		f.Gt.cS(d, PixelUtil.canvas.cX(l.w6));
		f.NH.Vk(d, l.pt.B, l.pt.SQ);
		if (l.ax0) d.Y$(l.ax0)
	}
	f.Gt.d0(d, l)
};
f.Gt.prototype.applyUndo = function(l, d) {
	if (l.aiW) d.m7 = l.aiW;
	if (l.Nx) d.Vp = JSON.parse(l.Nx[0]);
	f.Gt.I9(d, l);
	if (l.e6) d.u.R.Ac(l.e6);
	d.a2U();
	if (l.pt) {
		var G = PixelUtil.canvas.cX(l.w6).clone();
		G.hI();
		f.Gt.cS(d, G);
		f.NH.Vk(d, l.pt.B, l.pt.bg);
		if (l.a8z) d.Y$(l.a8z)
	}
};
f.Gt.cS = function(l, d) {
	for (var A = 0; A < l.B.length; A++) {
		var G = l.B[A];
		if (G.add.artb == null) continue;
		var b = PixelUtil.vec.simplifyPath(G.dA()).C;
		PixelUtil.vec.transformCoords(b, d, b);
		var V = PixelUtil.vec.flattenPath(b);
		G.P3(V)
	}
};
f.Gt.p5 = function(l) {
	var d = new Rect,
		G = 0,
		b = l.root.children.length;
	for (var A = 0; A < b; A++) {
		var V = l.root.children[A].j;
		if (V.add.artb == null) continue;
		d = d.Cw(V.dA());
		G++
	}
	var Q = new Rect(0, 0, l.m, l.n);
	if (!d.W6() && !Q.XB(d)) return d;
	return null
};
f.Gt.vd = function(l) {
	var d = f.Gt.p5(l);
	if (d) f.Gt.UP(l, d, !0);
	return d
};
f.Gt.UP = function(l, d, G) {
	var b = l.m,
		V = l.n,
		Q = d.m,
		t = d.n,
		I = d.x == 0 && d.y == 0;
	if (I && b == Q && V == t) return;
	l.m = Q;
	l.n = t;
	var y = [];
	for (var A = 0; A < l.B.length; A++) y.push(A);
	if (!I) f.Pq._P(l, y, null, -d.x, -d.y);
	for (var A = 0; A < l.B.length; A++) {
		l.B[A].QJ(l)
	}
	l.a2U();
	if (G) {
		var e = l.u.R,
			M = l.u.N;
		e.x += Math.round((d.x + (Q - b) / 2) * M);
		e.y += Math.round((d.y + (t - V) / 2) * M)
	} else l.u.R.T6(0, 0);
	if (l.P) l.P.rect.offset(-d.x, -d.y);
	var R = l.Ww();
	for (var J = 0; J < R[0].length; J++)
		if (R[1][J] == -1) {
			var n = l.qz[J];
			n[1] -= n[0] == 0 ? d.x : d.y
		}
	for (var A = 0; A < l.vj.length; A++) l.vj[A].rect.offset(-d.x, -d.y)
};
f.Gt.prototype.A0 = function(l, d, G, b, V) {
	if (l.DI == "commit") {
		this.Qw(G, V);
		this.disable(G, d, null, b)
	} else if (l.DI == "cancel") {
		this.disable(G, d, null, b)
	}
	var Q = null,
		t = new Rect(0, 0, G.m, G.n),
		I = this.mx.nV;
	if (l.DI == "config") {
		this.mx = l.mx;
		I = this.mx.nV;
		if (G == null || !l.amr) return;
		Q = t;
		if (I.sA == 1) {
			var y = I.x / I.y;
			if (Q.m / y < Q.n) Q.n = Math.round(Q.m / y);
			else Q.m = Math.round(Q.n * y)
		}
		if (I.sA == 2) {
			Q.m = I.x;
			Q.n = I.y
		}
		Q.x = Math.round((G.m - Q.m) / 2);
		Q.y = Math.round((G.n - Q.n) / 2)
	}
	if (l.DI == "straighten") {
		alert("Draw a line in the image.");
		this.lZ = !0
	}
	if (l.DI == "cropby") {
		if (G == null) return;
		var e = l.ajO,
			Q;
		if (e == 0) Q = G.root.Pa(G, !0);
		if (e == 1) {
			if (G.g.length == 0) alert("No layer is selected.");
			else {
				var M = G.root.O4(G.g[0]);
				Q = M.Pa(G, !0)
			}
		}
		if (e == 2) {
			if (G.g.length == 0) alert("No layer is selected.");
			else {
				Q = PixelUtil.tightBoundsFromRgba(G.LT(), t, 0);
				if (Q.W6()) Q = t.clone()
			}
		}
		if (e == 3) {
			if (G.P != null) Q = G.P.rect;
			else alert("There is no selection.")
		}
		if (e == 4) {
			Q = new Rect(0, 0, G.m, G.n)
		}
	}
	if (Q && Q.W6()) Q = null;
	if (Q != null) {
		this.JD = this.i3(Q, I.sA != 0);
		this.JD.cN(G, V);
		this.rv(d, ActionTypes.E.L, {
			a: ActionTypes.$.vq,
			G: this.id,
			rl: !0
		})
	}
};
f.Gt.prototype.Qw = function(l, d) {
	var G = this.JD.Pn(),
		b = PixelUtil.vec.flattenPath(G),
		V = this.aiP(l, G),
		Q = !1,
		t = this.mx.nV,
		I = this.mx.UP,
		y = t.x,
		e = t.y,
		J;
	if (this.id == f.ja && t.sA == 2 && V.O() != y * e) {
		V = new Rect(V.x, V.y, y, e);
		Q = !0
	}
	var M = PixelUtil.canvas.eP(G, V);
	M = PixelUtil.canvas.hI(M);
	var R = PixelUtil.canvas.Ue(M),
		n = Math.atan2(M[3], M[0]);
	if (Math.abs(n) > 1e-9 || !R || Q || I) J = this.i1(l, d, !0, M, 1, b);
	var r = new HistoryState(this.name, this),
		T = new Rect(0, 0, l.m, l.n);
	r.data = {
		pt: J,
		w6: M,
		e6: l.u.R.clone(),
		Nx: f.Gt.afE(l, V, T, !1)
	};
	f.Gt.amm(l, r.data, V);
	l.pushHistoryState(r);
	this.applyRedo(r.data, l);
	this.track(f.Gt.adf([b.x, b.y, b.m, b.n], null, I))
};
f.Gt.amm = function(l, d, G) {
	if (G == null) return;
	d.CQ = new Rect(0, 0, l.m, l.n);
	d.wv = G
};
f.Gt.d0 = function(l, d) {
	if (d.wv == null) return;
	f.Gt.UP(l, d.wv)
};
f.Gt.I9 = function(l, d) {
	if (d.wv == null) return;
	var G = d.CQ.clone();
	G.offset(-d.wv.x, -d.wv.y);
	f.Gt.UP(l, G)
};
f.Gt.prototype.aiP = function(l, d) {
	var G = PixelUtil.canvas.eP(d),
		b = PixelUtil.canvas.Ue(G),
		V = PixelUtil.canvas.cX(G),
		Q = V.cI,
		t = V.xu,
		I = Math.atan2(V.k, V.aS);
	V.rotate(I);
	var y = new Rect(Q, t, V.aS, V.Qd);
	if (!b) {
		function e(k, A, F) {
			var D = k[A] - k[F],
				q = k[A + 1] - k[F + 1];
			return Math.sqrt(D * D + q * q)
		}
		var M = e(d, 0, 2),
			R = e(d, 4, 6),
			J = Math.max(M, R),
			n = e(d, 2, 4),
			r = e(d, 6, 0),
			T = Math.max(n, r),
			j = f.Gt.ag4(d, l.m / 2, l.n / 2),
			g, Y;
		if (isNaN(j) || j == Infinity || j == -Infinity || Math.min(j, 1 / j) < .1) j = (M + R) / (n + r);
		if (J / T > j) {
			g = J * 1;
			Y = g / j
		} else {
			Y = T * 1;
			g = Y * j
		}
		y.m = g;
		y.n = Y
	}
	y.x = Math.round(y.x);
	y.y = Math.round(y.y);
	y.m = Math.round(y.m);
	y.n = Math.round(y.n);
	return y
};
f.Gt.ag4 = function(l, d, G) {
	var b = l[0] - d,
		V = l[1] - G,
		Q = l[2] - d,
		t = l[3] - G,
		I = l[6] - d,
		y = l[7] - G,
		e = l[4] - d,
		M = l[5] - G,
		R = ((V - M) * I - (b - e) * y + b * M - V * e) / ((t - M) * I - (Q - e) * y + Q * M - t * e),
		J = ((V - M) * Q - (b - e) * t + b * M - V * e) / ((y - M) * Q - (I - e) * t + I * M - y * e),
		n = -((J * y - V) * (R * t - V) + (J * I - b) * (R * Q - b)) / ((J - 1) * (R - 1));

	function r(j) {
		return j * j
	}
	var T = Math.sqrt((r(R - 1) + r(R * t - V) / n + r(R * Q - b) / n) / (r(J - 1) + r(J * y - V) / n + r(J * I - b) / n));
	if (R == 1 && J == 1) T = Math.sqrt((r(t - V) + r(Q - b)) / (r(y - V) + r(I - b)));
	return T
};
f.Gt.prototype.disable = function(l, d, G, b) {
	if (l == null) return;
	if (this.JD) this.JD.clear(l);
	this.JD = null;
	this.rv(d, ActionTypes.E.L, {
		a: ActionTypes.$.vq,
		G: this.id,
		rl: !1
	})
};
f.Gt.prototype.rv = function(l, d, G, b) {
	var V = new Action(d, !0);
	V.data = G;
	if (b) V.G = b;
	l.dispatch(V)
};
// Crop Tool
f.a6P = function() {
	f.Gt.call(this, "Crop Tool", f.ja, "tools/rcrop")
};
f.a6P.prototype = new f.Gt;
// Perspective Crop Tool
f.a7C = function() {
	f.Gt.call(this, "Perspective Crop", f.gt, "tools/pcrop")
};
f.a7C.prototype = new f.Gt;
// Dodge Tool
f.oX = function() {
	f.BrushToolBase.call(this, "Dodge Tool", f.l$, "tools/dodge");
	this.yr = "dodge"
};
f.oX.prototype = new f.BrushToolBase;
f.oX.prototype.dJ = function(l, d, G, b, V) {
	this.Us(l, G, b, V, this.HS.expo / Math.PI);
	if (this.CR == null) return;
	this.zX(l)
};
f.oX.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Eraser Tool
f.Vh = function() {
	f.BrushToolBase.call(this, "Eraser Tool", f.gN, "tools/eraser");
	this.yr = "erase"
};
f.Vh.prototype = new f.BrushToolBase;
f.Vh.prototype.dJ = function(l, d, G, b, V) {
	this.Us(l, G, b, V, this.HS.flow);
	if (this.CR == null) return;
	this.zX(l)
};
f.Vh.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	var Q = this.$i(l, G, b, V);
	this.zX(l)
};
// Background Eraser Tool
f.U8 = function() {
	f.BrushToolBase.call(this, "Background Eraser", f.Nm, "tools/beraser");
	this.yr = "ierase"
};
f.U8.prototype = new f.BrushToolBase;
f.U8.prototype.dJ = function(l, d, G, b, V) {
	if (this.I4(b, d, V)) return;
	this.Us(l, G, b, V, this.HS.flow);
	if (this.CR == null) return;
	this.zX(l)
};
f.U8.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Rectangle Select Tool
f.bm = function() {
	f.GS.call(this, "Rectangle Select", f.Da, "tools/rselect");
	this.sK = "crosshair"
};
f.bm.prototype = new f.GS;
f.bm.prototype.D2 = function(l, d, G, b) {
	if (!b.oW || !this.O1) return;
	var V = this.Pa(l, G, !0);
	l.I.Bt = PixelUtil.vec.simplifyPath(V);
	l.uK = !0;
	f.AbstractTool.nk(b, V, l, d)
};
f.bm.prototype.qd = function(l, d, G, b) {
	l.I.Bt = null;
	l.I.P4 = [];
	l.uK = !0;
	this.finish(l, d, G, b)
};
f.bm.prototype.getSelection = function(l, d, G, b) {
	if (this.B0.XB(this.Xm) || !this.O1) return null;
	var V = this.Pa(l, G, !0);
	if (V.W6()) return null;
	let r = f.GS.op("Rctn", V, this.HS.anta);
	return r
};
// Ellipse Select Tool
f.OU = function() {
	f.GS.call(this, "Ellipse Select", f.adL, "tools/eselect");
	this.sK = "crosshair"
};
f.OU.prototype = new f.GS;
f.OU.prototype.D2 = function(l, d, G, b) {
	if (!b.oW || !this.O1) return;
	var V = this.Pa(l, G);
	l.I.Bt = f.OU.abv(V);
	l.uK = !0;
	f.AbstractTool.nk(b, V, l, d)
};
f.OU.prototype.qd = function(l, d, G, b) {
	l.I.Bt = null;
	l.I.P4 = [];
	l.uK = !0;
	this.finish(l, d, G, b)
};
f.OU.prototype.getSelection = function(l, d, G, b) {
	if (this.B0.XB(this.Xm) || !this.O1) return null;
	var V = this.Pa(l, G);
	if (!V.N1(new Rect(0, 0, l.m, l.n))) return null;
	return f.GS.op("Elps", V, this.HS.anta)
};
f.OU.abv = function(l) {
	var d = l.x,
		G = l.y,
		b = l.x + l.m,
		V = l.y + l.n,
		Q = (d + b) / 2,
		t = (G + V) / 2,
		I = (d - b) / 2,
		y = (G - V) / 2,
		e = .5522848,
		M = {
			C: [Q, t - y],
			F: ["M", "C", "C", "C", "C"]
		};
	M.C.push(Q + e * I, t - y, Q + I, t - e * y, Q + I, t);
	M.C.push(Q + I, t + e * y, Q + e * I, t + y, Q, t + y);
	M.C.push(Q - e * I, t + y, Q - I, t + e * y, Q - I, t);
	M.C.push(Q - I, t - e * y, Q - e * I, t - y, Q, t - y);
	return M
};
// Eyedropper Tool
f.lS = function(l) {
	f.AbstractTool.call(this, "Eyedropper", l ? f.v3 : f.vn, "tools/eyedropper");
	this.Y3 = null;
	this.SG = 0;
	this.vt = null;
	this.il = 1;
	this.Cr = 2;
	this.akP = !0;
	this.yT = !1
};
f.lS.prototype = new f.AbstractTool;
f.lS.prototype.Q0 = function(l) {
	return l.oW
};
f.lS.prototype.TA = function(l, d, G, b, V) {
	if (l.a == "pickhere") this.hN(G, d, V, null, l.aoN);
	if (l.a == "supertool") this.Y3 = l.G
};
f.lS.prototype.dJ = function(l, d, G, b, V) {
	var Q = this.Y3;
	if (Q) {
		Q.dJ(l, d, G, b, V);
		return
	}
	this.SG = G.Y7;
	this.vt = V;
	var t = this.hN(l, null, G, b, V);
	this.ed(l, d, t, V)
};
f.lS.prototype.JP = function(l, d, G, b, V) {
	var Q = this.Y3;
	if (Q) {
		Q.JP(l, d, G, b, V);
		return
	}
	var t = this.vt;
	if (t) {
		var I = V.x - t.x,
			y = V.y - t.y,
			e = 1,
			M = new Point2D(t.x + I * e, t.y + y * e),
			R = this.hN(l, null, G, b, M);
		this.ed(l, d, R, M, new Point2D(I * (1 - e), y * (1 - e)))
	}
};
f.lS.prototype.ed = function(l, d, G, b, V) {
	var Q = this.akP,
		t = this.yT,
		e = 12,
		M = 11;
	if (l.u.N > 4) t = !1;
	if (!t && !Q) return;
	if (V == null) V = new Point2D(0, 0);
	var I = new Rect(0, 0, l.m, l.n),
		y = l.LT(),
		R = (e * 2 + 1) * M,
		J = new Point2D(R / 2, R / 2),
		n = new Rect(0, 0, R, R),
		r = PixelUtil.allocBytes(n.O() * 4),
		T = l.u.Zx(b.x, b.y),
		j = Math.floor(T.x),
		g = Math.floor(T.y),
		Y = new Matrix2D;
	Y.scale(1 / M, 1 / M);
	Y.translate(j - e, g - e);
	if (t) PixelUtil.scale.ue(y, I, Y, r, n);
	var k = (e - 3.4) * M,
		F = (e - 1.7) * M,
		D = e * M;
	for (var q = 0; q < R; q++)
		for (var H = 0; H < R; H++) {
			var W = Point2D.yZ(new Point2D(H, q), J);
			if (W > k) {
				if (Q) {
					var Z = Math.max(0, k - W + 1),
						B = (q * R + H) * 4,
						a = r[B + 3] << 24 | r[B] << 16 | r[B + 1] << 8 | r[B + 2],
						m = 255 << 24 | (q < D + M * .5 ? G : this.SG);
					if (W > F) {
						Z = Math.max(0, F - W + 1);
						a = m;
						m = 4286611584
					} else if (!t) {
						a = m & 16777215
					}
					r[B + 0] = (1 - Z) * (m >>> 16 & 255) + Z * (a >>> 16 & 255);
					r[B + 1] = (1 - Z) * (m >>> 8 & 255) + Z * (a >>> 8 & 255);
					r[B + 2] = (1 - Z) * (m >>> 0 & 255) + Z * (a >>> 0 & 255);
					r[B + 3] = (1 - Z) * (m >>> 24 & 255) + Z * (a >>> 24 & 255)
				}
				if (W > D) {
					r[(q * R + H) * 4 + 3] = Math.max(0, 255 * (D - W + 1))
				}
			}
		}

	function p(A) {
		var K = A << 2;
		r[K] = 0;
		r[K + 1] = 0;
		r[K + 2] = 0;
		r[K + 3] = 255
	}

	function c(A) {
		var K = A << 2;
		r[K] = 255;
		r[K + 1] = 255;
		r[K + 2] = 255;
		r[K + 3] = 255
	}
	var v = this.il * M + 2,
		i = R - v >>> 1,
		z = i + v - 1;
	if (t && v < R)
		for (var A = 0; A < v; A++) {
			var P = i * R + i + A,
				C = z * R + i + A,
				h = (i + A) * R + i,
				L = (i + A) * R + z;
			p(P);
			p(C);
			p(h);
			p(L);
			if (A != 0 && A != v - 1) {
				c(P + R);
				c(C - R);
				c(h + 1);
				c(L - 1)
			}
		}
	if (!t)
		for (var A = -9; A <= 9; A++) {
			if (-3 < A && A < 3) continue;
			var U = R >>> 1,
				H = U * R + U + A,
				q = (U + A) * R + U;
			c(H - R);
			p(H);
			c(H + R);
			c(q - 1);
			p(q);
			c(q + 1)
		}
	var S = f.AbstractTool.JV(0, 0, ["#" + PixelUtil.intToHex6(G), "RGB " + (G >>> 16 & 255) + "," + (G >>> 8 & 255) + "," + (G >>> 0 & 255)]),
		I = S[1];
	I.y = 0;
	I.x = R - I.m >>> 1;
	PixelUtil.blitRgbaRect(S[0], I, r, n);
	var E = {
			Wq: r,
			vD: n,
			Vl: new Point2D(J.x + V.x, J.y + V.y)
		},
		x = new Action(ActionTypes.E.L, !0);
	x.data = {
		a: ActionTypes.$.e5,
		ew: E
	};
	d.dispatch(x)
};
f.lS.prototype.Nl = function(l, d, G, b, V, Q) {
	this.hN(l, d, G, b, V);
	var t = this.Y3;
	if (t) {
		t.Nl(l, d, G, b, V);
		return
	}
	if (this.vt) {
		this.vt = null;
		if (Q) this.hN(l, d, G, b, V, this.SG);
		var I = new Action(ActionTypes.E.L, !0);
		I.data = {
			a: ActionTypes.$.e5,
			ew: "default"
		};
		d.dispatch(I)
	}
};
f.lS.prototype.hN = function(l, d, G, b, V, Q) {
	if (Q == null) Q = f.lS.dh(l, V, this.il, this.Cr);
	var t = new Action(ActionTypes.E.L);
	t.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.K5,
		y3: b && b.l(KeyboardHandler.Jm) ? 1 : 0,
		Z: Q
	};
	if (d) d.dispatch(t);
	return Q
};
f.lS.dh = function(l, d, G, b) {
	if (b == null) b = 2;
	var V = l.u.Zx(d.x, d.y),
		Q, t, I = l.g.length == 1 && l.B[l.g[0]].ht > 0,
		y = l.FB.length != 0,
		F = 0,
		D = 0,
		q = 0;
	if (I || y) {
		var e;
		if (y) e = l.vj[l.FB[0]];
		else {
			var M = l.B[l.g[0]];
			e = M.ht == 1 ? M.c3() : M.a7P()
		}
		t = e.Pa();
		if (!t.xC(V)) return e.color == 0 ? 0 : 16777215;
		Q = PixelUtil.allocBytes(t.O() * 4);
		Q.fill(255);
		var R = e.ZR();
		PixelUtil.grayPlaneToRgbaChannels(R, Q)
	} else if (b == 0 && l.g.length != 0) {
		var M = l.B[l.g[0]];
		Q = M.buffer;
		t = M.rect
	} else {
		Q = b == 2 ? l.LT() : l.LT(l.g[0]);
		t = new Rect(0, 0, l.m, l.n)
	}
	var J = Math.floor(V.x) - t.x,
		n = Math.floor(V.y) - t.y,
		r = (G - 1) / 2,
		T = Math.max(0, J - r),
		j = Math.max(0, n - r),
		g = Math.min(t.m, J + r + 1),
		Y = Math.min(t.n, n + r + 1),
		k = (g - T) * (Y - j);
	for (var J = T; J < g; J++)
		for (var n = j; n < Y; n++) {
			var A = 4 * (n * t.m + J);
			F += Q[A];
			D += Q[A + 1];
			q += Q[A + 2]
		}
	F = Math.round(F / k);
	D = Math.round(D / k);
	q = Math.round(q / k);
	return F << 16 | D << 8 | q
};
f.lS.prototype.A0 = function(l) {
	var d = l.HS;
	this.il = [1, 3, 5, 11, 31][d[0]];
	this.Cr = d[1];
	this.akP = d[2];
	this.yT = d[3]
};
// Gradient Tool
f.RK = function() {
	f.AbstractTool.call(this, "Gradient Tool", f.qV, "tools/gradient");
	this.HS = {
		K: JSON.parse(LayerStyleConstants.descriptorJsonFragments.ace).v,
		x1: "Lnr",
		as: !1,
		O_: !1,
		awp: "norm",
		uh: 1
	};
	this.yA = !1;
	this.Oh = null
};
f.RK.prototype = new f.AbstractTool;
f.RK.prototype.enable = function(l, d, G, b) {
	var V = new Action(ActionTypes.E.L, !0);
	V.data = {
		a: ActionTypes.$.e5,
		ew: "default"
	};
	d.dispatch(V)
};
f.RK.prototype.A0 = function(l) {
	this.HS = l.Oo
};
f.RK.prototype.dJ = function(l, d, G, b, V) {
	if (!l.T8()) return;
	this.Oh = l.u.Zx(V.x, V.y);
	this.Oh = f.Pq.aM(l, this.Oh, G);
	this.yA = !0
};
f.RK.prototype.JP = function(l, d, G, b, V) {
	if (!this.yA) return;
	var Q = l.u.Zx(V.x, V.y);
	Q = f.Pq.aM(l, Q, G);
	if (b.l(KeyboardHandler.Zz)) Q = f.RK.cR(this.Oh, Q);
	l.I.Bt = {
		C: [this.Oh.x, this.Oh.y, Q.x, Q.y],
		F: ["M", "L"]
	};
	l.I.jf = [this.Oh.x, this.Oh.y, Q.x, Q.y];
	l.uK = !0
};
f.RK.prototype.Nl = function(l, d, G, b, V) {
	if (!this.yA) return;
	var Q = l.B[l.g[0]],
		t = l.u.Zx(V.x, V.y);
	t = f.Pq.aM(l, t, G);
	if (b.l(KeyboardHandler.Zz)) t = f.RK.cR(this.Oh, t);
	var I = t.gu(this.Oh),
		y = Point2D.gO(this.Oh, t, .5),
		e = Math.atan2(I.y, I.x),
		M = Point2D.yZ(this.Oh, t),
		R = Math.sin(e),
		J = Math.cos(e);
	if (M > 2) {
		var n;
		if (l.P) n = l.P.rect;
		else n = new Rect(0, 0, l.m, l.n);
		var r = PixelUtil.allocBytes(n.O() * 4),
			T = this.HS,
			j = T.x1;
		if (j != "Lnr") {
			M *= 2;
			y = this.Oh
		}
		PixelUtil.color.renderGradient(T.K, r, n, [J * 1 / M, R * 1 / M, -R * 1 / M, J * 1 / M], y.x, y.y, T.as, LayerStyleConstants.gradientType.types.indexOf(j), G.Y7, G.GF, null, T.O_);
		var g = Math.round(T.uh * 256),
			Y = r.length;
		if (g != 256)
			for (var A = 0; A < Y; A += 4) r[A + 3] = r[A + 3] * g >>> 8;
		var k = new Action(ActionTypes.E.v);
		k.G = f.gN;
		k.data = {
			a: "fillBMP",
			z1: r,
			xm: T.awp,
			Il: this.name
		};
		d.dispatch(k)
	}
	l.I.Bt = null;
	l.I.jf = [];
	l.uK = !0;
	this.yA = !1
};
f.RK.prototype.TA = function(l, d, G, b, V) {
	function Q(J) {
		J = J.v;
		var n = J.Hrzn.v.val,
			r = J.Vrtc.v.val;
		return G.u.dN(n, r)
	}
	if (l.a == "fromAction") {
		var t = this.HS,
			I = this.HS = {};
		for (var y in t) I[y] = t[y];
		var e = l.lX.a0;
		if (e.Opct) I.uh = e.Opct.v.val / 100;
		if (e.Dthr) I.O_ = e.Dthr.v;
		if (e.Grad) I.K = e.Grad.v;
		if (e.Type) I.x1 = e.Type.v.GrdT;
		var M = Q(e.From),
			R = Q(e.T);
		this.dJ(G, d, V, b, M);
		this.Nl(G, d, V, b, R);
		this.HS = t
	}
};
f.RK.cR = function(l, d) {
	if (l.XB(d)) return l;
	var G = d.x - l.x,
		b = d.y - l.y,
		V = Math.abs(G),
		Q = Math.abs(b);
	if (V > Q) Q = V / 2 > Q ? 0 : V;
	if (Q > V) V = Q / 2 > V ? 0 : Q;
	V = G > 0 ? V : -V;
	Q = b > 0 ? Q : -Q;
	var t = Math.sqrt(G * G + b * b) / Math.sqrt(V * V + Q * Q);
	return new Point2D(l.x + V * t, l.y + Q * t)
};
f.RK.Gx = function(l, d, G, b, V, Q, t) {
	var I = new Rect(0, 0, d, G),
		y = PixelUtil.allocBytes(d * G * 4);
	PixelUtil.fillCheckerboard(y, d, G, 4);
	var e = Math.sin(b),
		M = Math.cos(b),
		R = PixelUtil.allocBytes(d * G * 4);
	PixelUtil.color.renderGradient(l, R, I, [M * 1 / d, e * 1 / d, -e * 1 / G, M * 1 / G], d / 2, G / 2, !1, 0, V, Q);
	PixelUtil.blend.compositeBlend("norm", R, I, y, I, I, 1);
	if (t) t.putImageData(new ImageData(new Uint8ClampedArray(y.buffer), d, G), 0, 0);
	else return FormatHandler.CY(y.buffer, d, G, null, null, !0)
};
f.RK.a9s = function(l, d, G) {
	var b = JSON.parse(JSON.stringify(l));
	if (b.Clrs)
		for (var A = 0; A < b.Clrs.v.length; A++) {
			var V = b.Clrs.v[A].v,
				Q = V.Type.v.Clry;
			if (Q == "UsrS") continue;
			var t = Q == "FrgC" ? d : G;
			V.Type.v.Clry = "UsrS";
			V.Clr = {
				t: "Objc",
				v: PixelUtil.color.rgbColorDescriptor({
					o: t >> 16 & 255,
					J: t >> 8 & 255,
					k: t & 255
				})
			}
		}
	return b
};
// Hand Tool
f.Mi = function() {
	f.AbstractTool.call(this, "Hand Tool", f._O, "tools/hand");
	this.In = !1;
	this.vt = new Point2D(0, 0);
	this.oP = null;
	this.vE = 0
};
f.Mi.prototype = new f.AbstractTool;
f.Mi.prototype.A0 = function(l, d, G, b) {
	this.In = l.In
};
f.Mi.prototype.TA = function(l, d, G, b, V) {
	var Q = l.a;
	if (Q == "setcls") {
		G.u.MX = l.MX;
		G.uK = !0;
		G.bV = !0
	}
	if (Q == "scroll" && !b.l(KeyboardHandler.Jm)) {
		if (b.l(KeyboardHandler.wz)) f.Mi.if(G, G.u.R.x - l.tc.y, G.u.R.y - l.tc.x);
		else f.Mi.if(G, G.u.R.x - l.tc.x, G.u.R.y - l.tc.y)
	}
};
f.Mi.prototype.enable = function(l, d, G, b) {
	this.oP = null;
	var V = new Action(ActionTypes.E.L, !0);
	V.data = {
		a: ActionTypes.$.e5,
		ew: "grab"
	};
	d.dispatch(V);
	if (l && Date.now() - this.vE < 300) {
		V.type = ActionTypes.E.v;
		V.G = f.t7;
		V.data = {
			a: "adapt",
			Z: "fitscr"
		};
		d.dispatch(V)
	}
	this.vE = Date.now()
};
f.Mi.prototype.dJ = function(l, d, G, b, V) {
	this.oP = l.u.R.clone();
	this.vt.T6(V.x, V.y)
};
f.Mi.prototype.JP = function(l, d, G, b, V) {
	if (!V.oW) return;
	if (this.oP == null) this.dJ(l, d, G, b, V);
	var Q = this.In ? d.Mt : [l];
	for (var A = 0; A < Q.length; A++) f.Mi.if(Q[A], this.oP.x + (V.x - this.vt.x), this.oP.y + (V.y - this.vt.y))
};
f.Mi.prototype.Nl = function(l, d, G, b, V) {
	this.oP = null
};
f.Mi.if = function(l, d, G) {
	var b = l.u.N,
		V = l.u.Vm,
		Q = V.m,
		t = V.n,
		I = l.m * b,
		y = l.n * b,
		e = I < Q && y < t,
		M = Q / 2 + I / 2 - 64,
		R = t / 2 + y / 2 - 64;
	l.u.R.T6(Math.max(-M, Math.min(M, d)), Math.max(-R, Math.min(R, G)));
	l.bV = !0
};
// Rotate View Tool
f.RotateViewTool = function() {
	f.AbstractTool.call(this, "Rotate View", f.EW, "tools/rview");
	this.vt = new Point2D(0, 0);
	this.FE = null;
	this.oe = null;
	this.vE = 0
};
f.RotateViewTool.prototype = new f.AbstractTool;
f.RotateViewTool.prototype.enable = function(l, d, G, b) {
	this.oP = null;
	var V = new Action(ActionTypes.E.L, !0);
	V.data = {
		a: ActionTypes.$.e5,
		ew: "grab"
	};
	d.dispatch(V);
	if (l && Date.now() - this.vE < 300 && l.u.Ay != 0) {
		l.u.Ay = 0;
		l.uK = !0
	}
	this.vE = Date.now();
	if (l) this.CK(l, d)
};
f.RotateViewTool.prototype.disable = function(l, d, G, b, V) {
	if (l) this.CK(l, d)
};
f.RotateViewTool.prototype.fW = function(l, d, G, b) {
	if (l) this.CK(l, d)
};
f.RotateViewTool.prototype.dJ = function(l, d, G, b, V) {
	this.vt.T6(V.x, V.y);
	var Q = l.u;
	this.FE = Q.Zx(Q.Vm.m / 2, Q.Vm.n / 2);
	this.oe = Q.Gb();
	var t = Q.Zx(Q.Vm.m / 2, Q.Vm.n / 2),
		I = Math.min(Q.Vm.m, Q.Vm.n) * .35 / Q.N,
		y = I * .2,
		e = t.x,
		M = t.y;
	l.I.Bt = {
		F: "M L L L L L".split(" "),
		C: [e, M, e, M - I, e + y, M, e, M + I, e - y, M, e, M - I]
	};
	l.uK = !0
};
f.RotateViewTool.prototype.azU = function(l) {
	var d = l.u,
		G = d.Zx(d.Vm.m / 2, d.Vm.n / 2);
	l.I.Bt = {
		F: ["M", "L"],
		C: [G.x, G.y, G.x, G.y - 200]
	}
};
f.RotateViewTool.prototype.JP = function(l, d, G, b, V) {
	if (!V.oW) return;
	var Q = l.u,
		t = this.FE,
		I = this.vt,
		y = new Point2D(Q.Vm.m / 2, Q.Vm.n / 2),
		e = Math.atan2(V.y - y.y, V.x - y.x),
		M = Math.atan2(I.y - y.y, I.x - y.x),
		R = Math.atan2(this.oe.k, this.oe.aS),
		J = e - M,
		n = Math.PI / 4;
	if (b.l(KeyboardHandler.Zz)) {
		J = R + n * Math.round((J - R) / n)
	}
	this.ao7(l, d, this.oe.clone(), t, J)
};
f.RotateViewTool.prototype.Nl = function(l, d, G, b, V) {
	l.I.Bt = null;
	l.uK = !0
};
f.RotateViewTool.prototype.A0 = function(l, d, G, b) {
	this.ao7(G, d, null, null, l.cg - G.u.Ay);
	G.u.Ay = l.cg
};
f.RotateViewTool.prototype.ao7 = function(l, d, G, b, V) {
	var Q = l.u;
	if (G == null) G = Q.Gb();
	if (b == null) b = Q.Zx(Q.Vm.m / 2, Q.Vm.n / 2);
	G.translate(-b.x, -b.y);
	G.rotate(V);
	G.translate(b.x, b.y);
	Q.ai7(G);
	if (l.m * Q.N < Q.Vm.m && l.n * Q.N < Q.Vm.n) Q.R.T6(0, 0);
	l.uK = !0;
	this.CK(l, d)
};
f.RotateViewTool.prototype.CK = function(l, d) {
	var G = new Action(ActionTypes.E.L, !0);
	G.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		cg: l.u.Ay
	};
	d.dispatch(G)
};
// Healing Brush Tool
f.da = function() {
	f.ix.call(this, "Healing Brush Tool", f.m4, "tools/hbrush")
};
f.da.prototype = new f.ix("");
f.da.prototype.Nl = function(l, d, G, b, V) {
	if (this.CR == null) return;
	this.E5(l, "heal", this.CR.XI(), this.CR.Pa(), this.CR.Y2());
	this.U(l, this.CR.Y2());
	f.BrushToolBase.prototype.Nl.call(this, l, d, G, b, V);
	if (!this.HS.algnd) this.R = null
};
// Type Tool constructor (horizontal or vertical)
f.tk = function(l) {
	f.AbstractTool.call(this, l ? "Vertical Type Tool" : "Type Tool", l ? f.zk : f.zl, l ? "tools/vtype" : "tools/htype");
	this.WR = [];
	this.wQ = null;
	this.caller = null;
	this.VL = 1;
	this.fF = null;
	this.at2 = 0;
	this.Yh = 0;
	this.aoz = null;
	this.um = null;
	this.lF = null;
	this.J2 = null;
	this.yB = null;
	this.tR = null;
	this.atO = null;
	this.A$ = null;
	this.JD = null;
	this.cT = null;
	this.app = null;
	this.R0 = !1;
	this.Jq = !1;
	this.PA = !1;
	this.TO = null;
	this.Ya = null;
	this.amn = null;
	this.qB = !1;
	this.ok = !1;
	this.LL = -1;
	this.Tp = -1;
	this.qT = document.createElement("textarea");
	this.qT.setAttribute("style", "font-family:Arial; font-size:14px; z-index:-1; position:absolute; top:0px; left:0px;  pointer-events: none; opacity:0; width:" + (window.innerWidth - 10) + "px; height:150px;");
	this.qT.addEventListener("input", this.oC.bind(this), !1);
	this.qT.addEventListener("keydown", this.a50.bind(this), !1);
	this.qT.addEventListener("keyup", this.avB.bind(this), !1)
};
f.tk.prototype = new f.AbstractTool;
f.tk.prototype.Q0 = function(l) {
	return l.oW
};
f.tk.prototype.Ew = function(l, d, G, b) {
	if (this.lF != null || this.id == f.zk) return;
	this.caller = d;
	var V = this.axo(l);
	if (V.length != 0) {
		var Q = null,
			t = [],
			I = [];
		for (var A = 0; A < V.length; A++) {
			var y = l.B[V[A]],
				e = y.add.TySh,
				M = 0,
				R = dt.dW(e.zC).length - 2,
				J = dt.Au(e.zC, M, R);
			dt.c6(J, e.D.Nw());
			if (J.xg.Font != null) J.xg.Font = J.rA[J.xg.Font].Name;
			Q = J.rA;
			t.push(J.xg);
			I.push(J.GB)
		}
		var J = {
			rA: Q,
			xg: dt.mY(t),
			GB: dt.mY(I)
		};
		if (J.xg.Font != null) dt.Wr(J, J.xg.Font);
		this.ad8(d, J, e)
	}
};
f.tk.prototype.axo = function(l) {
	var d = [];
	for (var A = 0; A < l.g.length; A++)
		if (l.B[l.g[A]] && l.B[l.g[A]].add.TySh) d.push(l.g[A]);
	return d
};
f.tk.prototype.TA = function(l, d, G, b, V) {
	var Q = l.a == "insertGlyph",
		t = l.a == "copyText",
		I = l.a == "selectAll";
	if ((Q || t || l.a == "insertText" || I) && this.lF) {
		var y = Q ? String.fromCharCode(65533) : l.Z,
			e = this.qT,
			M = e.value,
			R = e.selectionStart,
			J = e.selectionEnd;
		if (t) {
			ClipboardHandler.W4(new Blob([M.slice(R, J)], {
				type: "text/plain"
			}))
		} else if (I) {
			this.LL = e.selectionStart = 0;
			this.Tp = e.selectionEnd = M.length;
			this.Zs(G);
			e.focus()
		} else {
			e.value = M.slice(0, R) + y + M.slice(J);
			e.selectionStart = e.selectionEnd = R + y.length;
			this.oC(null, Q ? l.Z : null);
			e.focus()
		}
	}
	if (l.a == "updateStyles") {
		if (this.lF == null) {
			var n = this.axo(G),
				r = !1;
			if (n.length != 0) {
				this.rQ(G, d, V, n);
				for (var A = 0; A < n.length; A++) {
					var T = G.B[n[A]],
						j = T.add.TySh;
					dt.bU(j, this.VL);
					this.lF = T;
					var g = dt.dW(j.zC);
					this.LL = 0;
					this.Tp = g.length - 1;
					dt.rW(j.zC, this.LL, this.Tp, this.SX(V, j));
					var Y = this.Ug(G, V);
					if (Y == !1) r = !0
				}
				if (r) {
					this.qB = !0;
					return
				}
				this.kF(G, d)
			}
			return
		}
		this.Uw(V)
	}
	if (l.a.startsWith("warp")) {
		var k = this.ok;
		if (l.a == "warp" || l.a == "warpCancel") {
			if (this.lF == null) return;
			if (l.a == "warp") this.lF.add.TySh.R8 = l.$V;
			else this.lF.add.TySh.R8 = this.atO;
			this.Ug(G, V);
			if (!k) this.Zs(G)
		}
		if (l.a != "warp") this.qT.focus();
		if ((l.a == "warpConfirm" || l.a == "warpCancel") && k) {
			this.ok = !1;
			if (l.a == "warpConfirm") this.kF(G, d);
			else this.Ht(G, d)
		}
	}
	if (l.a == "editCurr") {
		if (V.QN != f.zl) {
			this.fF = V.QN;
			var F = new Action(ActionTypes.E.L, !0);
			F.data = {
				a: ActionTypes.$.yb,
				G: f.zl
			};
			d.dispatch(F)
		}
		if (this.lF != null) this.disable(G, d, V, b);
		this.wQ = V;
		this.caller = d;
		this.rQ(G, d, V, [l.ca]);
		var g = dt.dW(this.lF.add.TySh.zC);
		this.LL = 0;
		this.Tp = g.length - 1;
		this.Zs(G);
		this.vb();
		this.qT.focus()
	}
	if (l.a == "switchPntPrgr") {
		if (this.lF) return;
		var T = G.B[G.g[0]],
			j = T.add.TySh,
			D = j.D.Nw(),
			q = JSON.parse(JSON.stringify(j.zC)),
			H = dt.WK(q),
			W = H == 1 ? dt.Cu(q) : [0, 0, Math.round(T.rect.m * 1.05 / D), Math.round(T.rect.n * 1.25 / D)],
			Z = dt.Au(q, 0, 0),
			B = Z.rA[Z.xg.Font].Name,
			a = V.Hg.U6(B),
			m = [0, W[2], W[2] / 2][Z.GB.Justification % 3],
			p = a ? je.SL(a, B, Z.xg) : Z.xg.FontSize * .8;
		dt.AO(q, 1 - H);
		if (H == 0) {
			m = -m;
			p = -p;
			dt.mt(q, [0, 0, W[2], W[3]])
		}
		var c = new Matrix2D(1, 0, 0, 1, m, p);
		c.concat(j.D);
		this.TA({
			os: G.g[0],
			a: "newED",
			$B: q,
			D: c,
			a9f: [16, 3, H == 1 ? 0 : 1]
		}, d, G, b, V)
	}
	if (l.a == "newED") {
		var T = G.B[l.os],
			j = T.add.TySh,
			v = this.$l(G, [l.os]);
		j.zC = l.$B;
		if (l.D) j.D = l.D;
		if (StyleHelper.textLayerFontsAvailable(j, V.Hg, d)) {
			StyleHelper.updateLayerTextStyle(T, V.Hg, G);
			G.U()
		} else G.ya = !0;
		var i = new HistoryState(l.a9f ? l.a9f : this.name, this);
		i.data = {
			Pw: v,
			vh: this.$l(G, [l.os])
		};
		G.pushHistoryState(i)
	}
	if (l.a == "fromAction") {
		var z = l.lX.a0.Usng.v,
			P = z.TxtC.v,
			C = [];
		for (var A = 0; A < 2; A++) {
			var h = P[A == 0 ? "Hrzn" : "Vrtc"].v,
				y = h.val;
			if (h.type == "#Prc") y = (A == 0 ? G.m : G.n) * (y / 100);
			C[A] = y
		}
		this.t9(G, d, V, b, G.u.dN(C[0], C[1]), !0);
		var T = G.B[G.g[0]],
			j = T.add.TySh,
			L = j.zC,
			M = dt.dW(L);
		dt.Iv(L, 0, M.length - 1);
		dt.sT(L, 0, z.Txt.v.replace(/\r/g, "\n"));
		M = dt.dW(L);
		for (var H = 0; H < 2; H++) {
			var U = z[H == 0 ? "Txtt" : "paragraphStyleRange"].v;
			for (var A = 0; A < U.length; A++) {
				var S = U[A].v,
					R = S.From.v,
					J = Math.min(S.T.v - 1, M.length - 1);
				S = S[H == 0 ? "TxtS" : "paragraphStyle"].v;
				var E = dt.Au(L, R, J),
					x = H == 0 ? E.xg : E.GB;
				for (var K in S) {
					var u = S[K].v;
					if (K == "Sz") x.FontSize = Math.round(u.val * (u.type == "#Pnt" ? G.m7 / 72 : 1));
					else if (K == "fontPostScriptName") dt.Wr(E, u);
					else if (K == "Algn") x.Justification = {
						Left: 1,
						Cntr: 2
					}[u.Alg];
					else if (K == "leading") x.Leading = S[K].v.val;
					else if (K == "baselineShift") x.BaselineShift = S[K].v.val;
					else if (K == "autoLeading") x.AutoLeading = S[K].v;
					else if (K == "syntheticBold") x.FauxBold = S[K].v;
					else if (K == "syntheticItalic") x.FauxItalic = S[K].v;
					else if (K == "Trck") x.Tracking = S[K].v;
					else if (K == "verticalScale") x.VerticalScale = S[K].v / 100;
					else if (K == "horizontalScale") x.HorizontalScale = S[K].v / 100;
					else if (K == "Clr") x.FillColor = {
						Type: 1,
						Values: [1, u.Rd.v / 255, u.Grn.v / 255, u.Bl.v / 255]
					}
				}
				dt.rW(L, R, J, E)
			}
		}
		if (StyleHelper.allTextLayersHaveFonts(G, V.Hg, d)) StyleHelper.updateLayerTextStyle(T, V.Hg, G);
		else G.ya = !0;
		G.U();
		this.kF(G, d)
	}
};
f.tk.prototype.Uw = function(l) {
	var d = Math.min(this.LL, this.Tp),
		G = Math.max(this.LL, this.Tp),
		b = this.lF.add.TySh;
	dt.bU(b, this.VL);
	var V = this.SX(l, b);
	dt.rW(b.zC, d, G - 1, V);
	var Q = this.caller.fk(),
		t = this.Ug(Q, l);
	if (t) this.Zs(Q);
	if (document.activeElement.tagName.toLowerCase() != "input") this.qT.focus()
};
f.tk.prototype.oH = function(l) {
	return this.WR.indexOf(l) != -1
};
f.tk.prototype.enable = function(l, d, G, b) {
	var V = this.qT;
	d.e.appendChild(V);
	this.A$ = "default";
	this.ed(d)
};
f.tk.prototype.in = function() {
	return this.lF != null
};
f.tk.XW = function(l, d) {
	for (var A = l.B.length - 1; A >= 0; A--) {
		var G = l.B[A];
		if (G.add.TySh && G.rect.xC(d) && l.auD(A)) {
			var b = G.Ka(31);
			return b ? -2 : A
		}
	}
	return -1
};
f.tk.prototype.dJ = function(l, d, G, b, V) {
	this.wQ = G;
	this.caller = d;
	var Q = l.u.Zx(V.x, V.y),
		t = this.lF == null;
	if (t) {
		var I = f.tk.XW(l, Q);
		if (I == -2) {
			alert("This layer is Locked.");
			return
		}
		if (I >= 0 && !b.l(KeyboardHandler.Zz)) {
			if (!StyleHelper.textLayerFontsAvailable(l.B[I].add.TySh, G.Hg, d)) {
				alert("Fonts not loaded yet");
				return
			}
			this.rQ(l, d, G, [I])
		} else {
			this.PA = !0;
			this.TO = V;
			return
		}
	}
	var y = t ? -1 : dt.WK(this.lF.add.TySh.zC),
		e = this.cT ? this.cT : this.JD;
	if (e && e.dJ(l, G, b, Q, null, null, V) && PixelUtil.textWarp.T9(this.lF.add.TySh.R8) || !t && PixelUtil.vec.ny(Q, this.lF.rect) > 20 / l.u.N && (y == 0 || y == 1)) {
		this.R0 = !0;
		this.Ya = Q;
		this.amn = this.lF.add.TySh.D.clone();
		if (this.LL == -1 && this.Tp == -1) this.LL = this.Tp = this.my(Q)
	} else {
		if (this.yB == null) {
			alert("Fonts not loaded yet");
			return
		}
		this.Jq = !0;
		this.LL = this.Tp = this.my(Q);
		var M = Date.now();
		if (M - this.at2 > 300) this.Yh = 0;
		this.Yh++;
		this.at2 = M;
		if (this.Yh == 2) this.ad6();
		if (this.Yh == 3) this.a2z();
		if (this.Yh > 1) {
			this.Jq = !1
		}
	}
	this.vb();
	this.Zs(l)
};
f.tk.prototype.rQ = function(l, d, G, b) {
	var V = l.B[b[0]];
	this.lF = V;
	this.rv(d, ActionTypes.E.L, {
		a: ActionTypes.$.vq,
		G: this.id,
		DI: "showactive"
	});
	this.J2 = b;
	l.g = b.slice(0);
	l.rf();
	l.DF = !0;
	this.tR = this.$l(l, b);
	this.PR(V.add.TySh);
	this.Ug(l, G)
};
f.tk.prototype.PR = function(l) {
	if (dt.WK(l.zC) != 1) return;
	var d = dt.Cu(l.zC);
	d = new Rect(0, 0, d[2] - d[0], d[3] - d[1]);
	var G = [d.x, d.y, d.x + d.m, d.y, d.x + d.m, d.y + d.n, d.x, d.y + d.n];
	PixelUtil.vec.transformCoords(G, l.D, G);
	this.JD = new gG(G, !1, !1, !1, !0)
};
f.tk.prototype.ad6 = function() {
	var l = dt.dW(this.lF.add.TySh.zC);
	this.LL = this.ahv(l, this.LL);
	this.Tp = this.acZ(l, this.LL)
};
f.tk.prototype.ahv = function(l, d) {
	var G = " \t\n,.?!_-+=@#$%^&*'\"(){}[]\\/<>:;|",
		b = [];
	for (var A = 0; A < G.length; A++) b.push(G.charAt(A));
	var V = b.indexOf(l[d]) == -1 ? !0 : !1;
	for (var A = d - 1; A >= 0; A--)
		if (b.indexOf(l.charAt(A)) != -1 == V) return A + 1;
	return 0
};
f.tk.prototype.acZ = function(l, d) {
	var G = " \t\n,.?!_-+=@#$%^&*'\"(){}[]\\/<>:;|",
		b = [];
	for (var A = 0; A < G.length; A++) b.push(G.charAt(A));
	var V = b.indexOf(l[d]) == -1 ? !0 : !1;
	for (var A = d + 1; A < l.length; A++)
		if (b.indexOf(l.charAt(A)) != -1 == V) return A;
	return l.length - 1
};
f.tk.prototype.a2z = function() {
	var l = this.yB.a6$(this.LL);
	this.LL = l[0];
	this.Tp = l[1]
};
f.tk.prototype.ed = function(l) {
	var d = new Action(ActionTypes.E.L, !0);
	d.data = {
		a: ActionTypes.$.e5,
		ew: this.A$
	};
	l.dispatch(d)
};
f.tk.prototype.JP = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y),
		t = this.lF;
	if (!V.oW) {
		var I = "default",
			y = this.JD,
			e = this.cT ? this.cT : y;
		if (e && PixelUtil.textWarp.T9(t.add.TySh.R8)) {
			var M = e.Rg(Q, l.u.N, null, V);
			if (M) I = M;
			else if (e == y && y.yo(Q)) I = "text"
		} else if (t && PixelUtil.vec.ny(Q, t.rect) > 20 / l.u.N) I = "move";
		else if (f.tk.XW(l, Q) >= 0) I = "text";
		if (I != this.A$) {
			this.A$ = I;
			this.ed(d)
		}
	}
	var R = this.TO;
	if (this.PA && Math.min(V.x - R.x, V.y - R.y) > 4 / l.u.N) {
		this.PA = !1;
		this.t9(l, d, G, b, V);
		t = this.lF;
		this.R0 = !0;
		this.JD = new gG(null, !1, !1, !1, !0);
		var J = l.u.Zx(this.TO.x, this.TO.y);
		J.x = Math.round(J.x);
		J.y = Math.round(J.y);
		this.JD.dJ(l, G, b, J, null, null, V, l.u.Ay)
	}
	if (this.R0) {
		var n = t.add.TySh;
		if (this.cT) {
			this.cT.JP(l, G, b, Q);
			var r = PixelUtil.canvas.cX(PixelUtil.canvas.eP(this.cT.Pn(), this.app));
			n.D = r;
			this.Ug(l, G);
			dt.MT(n)
		} else if (this.JD) {
			this.JD.JP(l, G, b, Q);
			var T = n.D.clone(),
				j = Math.atan2(T.k, T.aS);
			T.rotate(j);
			var r = PixelUtil.canvas.cX(PixelUtil.canvas.eP(this.JD.Pn())),
				g = Math.atan2(r.k, r.aS);
			r.rotate(g);
			if (!isNaN(r.aS) && r.aS * r.Qd - r.k * r.S5 != 0) {
				var Y = new Rect(0, 0, r.aS / T.aS, r.Qd / T.Qd),
					k = Math.round(Y.m),
					F = Math.round(Y.n),
					D = n.zC.Curve;
				if (D) {
					var q = dt.Cu(n.zC),
						H = new Matrix2D(k / q[2], 0, 0, F / q[3], 0, 0);
					PixelUtil.vec.transformCoords(D.Points, H, D.Points);
					dt.MT(n)
				}
				dt.mt(n.zC, [0, 0, k, F]);
				n.D = PixelUtil.canvas.cX(PixelUtil.canvas.eP(this.JD.Pn(), Y));
				this.Ug(l, G);
				dt.MT(n)
			}
		} else {
			var W = Q.x - this.Ya.x,
				Z = Q.y - this.Ya.y;
			n.D = this.amn.clone();
			var B = new Point2D(n.D.cI + W, n.D.xu + Z);
			B = f.Pq.aM(l, B, G);
			n.D.cI = B.x;
			n.D.xu = B.y;
			this.Ug(l, G)
		}
	}
	if (this.Jq) this.Tp = this.my(Q);
	if (this.R0 || this.Jq) this.Zs(l)
};
f.tk.prototype.t9 = function(l, d, G, b, V, Q) {
	var t = l.LW(),
		I = t[0],
		y = t[1],
		e = l.V4();
	e.add.lnsr = "rend";
	var M = l.B.slice(0);
	e.tH("Text layer " + M.length);
	this.lF = e;
	var R = l.g.length == 0 ? l.B.length - 1 : l.g[l.g.length - 1],
		J = R + 1;
	if (M[R].add.lsct == LayerSectionType.open) J--;
	this.tR = {
		ih: M.slice(0),
		Sd: l.g.slice(0)
	};
	M.splice(J, 0, e);
	l.g = [J];
	this.LL = this.Tp = 0;
	l.g8(M);
	this.tR.Za = M.slice(0);
	this.tR.le = l.g.slice(0);
	this.rv(d, ActionTypes.E.L, {
		a: ActionTypes.$.vq,
		G: this.id,
		DI: "showactive"
	});
	var n = l.u.Zx(V.x, V.y),
		r = G.XG;
	console.log(r);
	if (this.id == f.zk) {
		r = JSON.parse(JSON.stringify(r));
		r.xg.BaselineDirection = 1
	}
	e.add.TySh = dt.Iu(n.x, n.y, r, l.u.Ay);
	var T = e.add.TySh,
		j = T.zC;
	if (this.id == f.zk) j._LineOrientation = 2;
	dt.bU(T, this.VL);
	if (V.oW) dt.AO(j, 1);
	else {
		dt.AO(j, 0);
		var g = I[y.pop()],
			Y = g ? g.add.vmsk : null;
		if (Q) Y = null;
		if (Y && !b.l(KeyboardHandler.Zz)) {
			Y = Y.clone();
			var k = Y.i,
				D, q;
			for (var A = 0; A < k.length; A++)
				if (k[A].H$ != null) k[A].H$ = 0;
			var F = 5 / l.u.N;
			D = PixelUtil.path.Rw(Y.i, n, !0, F);
			if (D.sy == -1) D = PixelUtil.path.Rw(Y.i, n);
			if (D.sy != -1) {
				dt.AO(j, 1);
				var H = PixelUtil.path.W7(k, D.sy),
					W = PixelUtil.path.fP(k, D.sy) - 1;
				k = Y.i = k.slice(0, 2).concat(k.slice(H, H + W + 1));
				Y.g = [];
				T.add = {
					vmsk: Y,
					vogk: LayerRecord.Ba(k)
				};
				j.Curve = {};
				dt.Sz(T);
				if (D.b5 != null) {
					var Z = je.Ro(j.Curve);
					PixelUtil.vec.transformCoords(Z[0], T.D, Z[0]);
					var B = PixelUtil.vec.ad(Z[0], n.x, n.y),
						a = G.XG.GB.Justification;
					if (a == 2 || a == 5) {
						var m = (Z[2][B] + Z[3] * .5) % Z[3];
						B = je.j8(m, Z[2])
					}
					var p = Z[1][B];
					p = p % W;
					Y.JG = [p, p];
					dt.Sz(T)
				} else this.PR(T)
			}
		}
	}
	return e
};
f.tk.prototype.Nl = function(l, d, G, b, V, Q) {
	if (Q) {
		this.PA = !1;
		return
	}
	if (this.lF == null && !this.PA) return;
	var t = l.u.Zx(V.x, V.y),
		I = this.PA;
	if (this.PA) {
		this.PA = !1;
		this.t9(l, d, G, b, V);
		this.Jq = !0
	}
	if (this.R0 || this.Jq) {
		this.Zs(l);
		this.vb();
		if (I) this.Uw(G)
	}
	if (this.R0 && this.JD) this.JD.Nl(l, G, b, t);
	this.R0 = this.Jq = !1;
	this.qT.focus()
};
f.tk.prototype.vb = function() {
	var l = this.lF.add.TySh,
		d = Math.min(this.LL, this.Tp),
		G = Math.max(this.LL, this.Tp),
		b, V;
	if (d == G) {
		var Q = dt.dW(l.zC);
		if (d == 0 || Q.charAt(d - 1) == "\n") b = V = d;
		else b = V = d - 1
	} else {
		b = d;
		V = G - 1
	}
	var t = dt.Au(l.zC, b, V);
	dt.c6(t, l.D.Nw());
	this.ad8(this.caller, t, l)
};
f.tk.prototype.ad8 = function(l, d, G) {
	this.rv(l, ActionTypes.E.L, {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.o$,
		XG: d
	});
	var b = this.VL = dt.Wm(G);
	this.rv(this.caller, ActionTypes.E.L, {
		a: ActionTypes.$.vq,
		G: this.id,
		DI: "changeAA",
		mz: b
	})
};
f.tk.prototype.h_ = function(l, d, G, b, V) {
	if (l == null) return;
	var Q = l.u.Zx(V.x, V.y),
		t = f.tk.XW(l, Q);
	if (t == -1) return;
	var I = new Action(ActionTypes.E.L, !0);
	I.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		DI: "showpan",
		a1w: this.lF != null,
		ca: t,
		Zm: V,
		T1: l,
		wQ: G
	};
	d.dispatch(I)
};
f.tk.prototype.ac0 = function() {
	var l = this.lF;
	if (l && !this.R0 && this.cT != null) {
		var d = this.caller.fk();
		this.cT.Nl(d, this.wQ, null, null);
		this.cT = null;
		this.PR(l.add.TySh);
		this.Zs(d)
	}
};
f.tk.prototype.disable = function(l, d, G, b) {
	var V = this.lF;
	this.kF(l, d)
};
f.tk.prototype.A0 = function(l, d, G, b, V) {
	if (this.ok) return;
	if (l.DI == "commit") this.kF(G, d);
	if (l.DI == "cancel") this.Ht(G, d);
	if (l.DI == "changeAA") {
		this.VL = l.mz;
		if (G != null) this.TA({
			a: "updateStyles"
		}, d, G, b, V)
	}
	if (l.DI == "showwarp") {
		if (G == null) return;
		if (this.lF == null) {
			var Q = G.B[G.g[0]],
				t = Q.add.TySh;
			if (t == null) return;
			this.rQ(G, d, V, [G.g[0]]);
			this.qT.focus();
			this.ok = !0
		}
		this.atO = this.lF.add.TySh.R8;
		var I = new Action(ActionTypes.E.L, !0);
		I.data = {
			a: ActionTypes.$.SN,
			GU: "textwarp"
		};
		d.dispatch(I)
	}
};
f.tk.prototype.BM = function(l, d) {
	if (d != PsdResourceTypes.jz) return;
	if (this.qB) {
		this.qB = !1;
		var G = this.caller.fk(),
			b = this.J2;
		for (var A = 0; A < b.length; A++) {
			this.lF = G.B[b[A]];
			this.Ug(G, l)
		}
		this.kF(G, this.caller);
		return
	}
	if (this.lF) this.Uw(l)
};
f.tk.prototype.SX = function(l, d) {
	var G = JSON.parse(JSON.stringify(l.XG));
	dt.c6(G, 1 / d.D.Nw());
	return G
};
f.tk.prototype.applyRedo = function(l, d) {
	if (l.Pw != null) this.Gj(d, l.vh);
	else this.a7x(d, l.Za, l.le)
};
f.tk.prototype.applyUndo = function(l, d) {
	if (l.Pw != null) this.Gj(d, l.Pw);
	else this.a7x(d, l.ih, l.Sd)
};
f.tk.prototype.Gj = function(l, d) {
	for (var A = 0; A < d.length; A++) {
		var G = d[A],
			b = G.os,
			V = l.B[b];
		V.buffer = G.XO;
		V.rect = G.vD.clone();
		V.U();
		V.hD.Rj = null;
		V.hD.path = null;
		var Q = V.add.TySh;
		Q.R8 = G.$V;
		Q.xZ = G.xZ.clone();
		Q.D = G.D.clone();
		Q.zC = JSON.parse(JSON.stringify(G.zC));
		V.er()
	}
	l.U()
};
f.tk.prototype.$l = function(l, d) {
	var G = [];
	for (var A = 0; A < d.length; A++) {
		var b = d[A],
			V = l.B[b],
			Q = V.add.TySh;
		G.push({
			os: b,
			D: Q.D.clone(),
			$V: JSON.parse(JSON.stringify(Q.R8)),
			xZ: Q.xZ.clone(),
			zC: JSON.parse(JSON.stringify(Q.zC)),
			XO: V.buffer.slice(0),
			vD: V.rect.clone()
		})
	}
	return G
};
f.tk.prototype.a7x = function(l, d, G) {
	l.g = G;
	l.g8(d);
	l.U();
	l.i_ = !0
};
f.tk.prototype.Ug = function(l, d, G) {
	if (G == null) G = !1;
	var b = this.lF.add.TySh;
	if (!StyleHelper.textLayerFontsAvailable(b, d.Hg, this.caller)) return !1;
	if (!G) {
		var V = dt.dW(b.zC);
		this.qT.value = V.slice(0, V.length - 1)
	}
	var Q = this.lF.rect,
		t = StyleHelper.updateLayerTextStyle(this.lF, d.Hg, l);
	this.yB = t[0];
	var I = t[1];
	if (PixelUtil.textWarp.T9(b.R8)) b.xZ = new Rect;
	else {
		if (dt.WK(b.zC) == 1) {
			var y = dt.Cu(b.zC),
				hZ = I.xZ.y;
			b.xZ = new Rect(0, hZ, y[2] - y[0], y[3] - y[1] - hZ)
		} else b.xZ = I.xZ
	}
	l.vp();
	l.U(l.root.H5(I.vD.Cw(Q), l, l.B.indexOf(this.lF)));
	return !0
};
f.tk.prototype.oC = function(l, d) {
	if (this.lF == null || this.ok) return;
	var G = this.qT.selectionStart,
		b = this.lF.add.TySh,
		V = dt.dW(b.zC),
		Q = this.qT.value + "\n",
		t = Math.min(this.LL, this.Tp),
		I = Math.max(this.LL, this.Tp),
		J = !1;
	this.LL = Math.min(G, t);
	if (Q.length - G < V.length - this.Tp) this.Tp = V.length - Q.length + G;
	if (V != Q) {
		while (this.LL > 0 && V.charAt(this.LL - 1) != Q.charAt(this.LL - 1)) this.LL--
	}
	var y = V.substring(0, this.LL),
		e = V.substring(this.Tp, V.length),
		M = Q.substring(this.LL, Q.length - e.length);
	dt.Iv(b.zC, this.LL, this.Tp);
	dt.sT(b.zC, this.LL, M);
	if (d != null) dt.a2i(b.zC, this.LL, d);
	var R = this.SX(this.wQ, b),
		n = -1,
		r = Array.from(M);
	for (var A = 0; A < r.length; A++) n = Math.max(n, r[A].codePointAt(0));
	if (n != -1 && n > 128 && n != 65533 && R.xg.Font != null) {
		var T = R.rA[R.xg.Font].Name,
			j = this.wQ.Hg.c0(n, T, R.rA);
		if (T != j) {
			dt.Wr(R, j);
			J = !0
		}
	}
	if (this.um != null && M == this.um) {
		var g = JSON.parse(this.aoz);
		R.xg = g.xg;
		R.rA = g.rA;
		J = !0
	}
	dt.rW(b.zC, this.LL, this.LL + M.length - 1, R);
	this.LL = this.Tp = y.length + M.length;
	var Y = this.caller.fk(),
		k = this.Ug(Y, this.wQ, !0);
	if (k) this.Zs(Y, !0);
	if (J) this.vb()
};
f.tk.prototype.avB = function(l) {
	var d = KeyboardHandler;
	if (!l.ctrlKey) this.ac0();
	l.stopPropagation()
};
f.tk.prototype.a50 = function(l) {
	l.stopPropagation();
	var d = l.ctrlKey || l.metaKey,
		G = KeyboardHandler,
		y = 0,
		e = 0,
		k = 0,
		c = !1;
	if (this.lF == null || this.ok) return;
	if (this.lF == null) return;
	var b = this.caller.fk();
	if (this.cT == null && d) {
		var V = this.lF.add.TySh,
			Q = dt.WK(V.zC),
			t;
		if (Q == 1) {
			t = dt.Cu(V.zC);
			t = new Rect(0, 0, t[2] - t[0], t[3] - t[1])
		} else t = this.yB.ot();
		var I = [t.x, t.y, t.x + t.m, t.y, t.x + t.m, t.y + t.n, t.x, t.y + t.n];
		PixelUtil.vec.transformCoords(I, V.D, I);
		this.cT = new gG(I, !0, !0, !1, !1);
		this.app = t;
		this.Zs(b)
	}
	if (G._Q(l.code, G.T7)) y = 1;
	if (G._Q(l.code, G.ld)) y = -1;
	if (G._Q(l.code, G.ZZ)) e = -1;
	if (G._Q(l.code, G.Wz)) e = 1;
	var M = G._Q(l.code, KeyboardHandler.IU),
		R = G._Q(l.code, KeyboardHandler.aiD);
	if (G._Q(l.code, KeyboardHandler.lm) && d) {
		this.kF(b, this.caller);
		return
	}
	if (G._Q(l.code, KeyboardHandler.mp)) {
		this.Ht(b, this.caller);
		return
	}
	if (G._Q(l.code, KeyboardHandler.Kn)) {
		l.preventDefault();
		var J = this.qT,
			n = J.value,
			r = J.selectionStart,
			T = J.selectionEnd;
		J.value = n.substring(0, r) + "\t" + n.substring(T);
		J.selectionStart = J.selectionEnd = r + 1;
		this.oC(null);
		return
	}
	var j = G._Q(l.code, G.W$),
		g = G._Q(l.code, G.Zw);
	if (d && (j || g)) {
		l.preventDefault();
		var Y = new Action(ActionTypes.E.v, !0);
		Y.G = f.t7;
		Y.data = {
			a: "zoom",
			K$: j
		};
		this.caller.dispatch(Y)
	}
	if (G._Q(l.code, G.Vy)) k = 1;
	if (G._Q(l.code, G.cb)) k = -1;
	var F = this.LL == this.Tp,
		D = d && l.shiftKey && k != 0 && !F;
	if (D || l.altKey && y != 0) {
		var q = JSON.parse(JSON.stringify(this.wQ.XG));
		if (D) {
			var H = q.xg.FontSize;
			if (H == null) H = 16;
			q.xg.FontSize = Math.max(1, H + k * (l.altKey ? 5 : 1))
		} else {
			if (F) {
				q.xg.Kerning += 20 * y;
				q.xg.AutoKerning = !1
			} else q.xg.Tracking += 20 * y
		}
		l.preventDefault();
		var W = new Action(ActionTypes.E.L, !0);
		W.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.o$,
			XG: q
		};
		this.caller.dispatch(W);
		var Y = new Action(ActionTypes.E.v, !0);
		Y.G = f.zl;
		Y.data = {
			a: "updateStyles"
		};
		this.caller.dispatch(Y);
		return
	}
	if ((G._Q(l.code, G.nA) || G._Q(l.code, G.QD)) && d) {
		var Z = this.LL,
			B = this.Tp;
		if (Z > B) {
			var a = Z;
			Z = B;
			B = a
		}
		var V = this.lF.add.TySh,
			m = dt.dW(V.zC);
		if (Z != B) {
			this.um = m.slice(Z, B);
			this.aoz = JSON.stringify(this.wQ.XG)
		}
	}
	var p = dt.dW(this.lF.add.TySh.zC);
	if (y != 0 || e != 0 || M || R) {
		l.preventDefault();
		var v = this.LL;
		if (y != 0) {
			if (d && y == -1) v = this.ahv(p, this.LL - 1);
			else if (d && y == 1) v = this.acZ(p, this.LL);
			else {
				var J = this.qT,
					n = J.value;
				v = this.LL + y;
				if (v != 0 && n.codePointAt(v - 1) > 65535) v += y
			}
		} else if (e != 0) {
			var i = this.yB.SJ(this.LL);
			if (e == -1 && i.yF == 0) v = 0;
			else if (e == 1 && i.yF == this.yB.afS() - 1) v = 99999999999;
			else v = this.yB.ai8(new Point2D(i.vD.x + i.vD.m / 2, 0), i.yF + e)
		} else if (M) {
			var z = this.LL - 1;
			while (z > 0 && p.charCodeAt(z) != 10) z--;
			v = z == 0 ? 0 : z + 1
		} else if (R) {
			var z = this.LL;
			while (z < p.length - 1 && p.charCodeAt(z) != 10) z++;
			v = z
		}
		v = Math.max(0, Math.min(p.length - 1, v));
		if (l.shiftKey) this.LL = v;
		else this.LL = this.Tp = v;
		c = !0
	}
	if (G._Q(l.code, KeyboardHandler.$) && d) {
		this.LL = 0;
		this.Tp = p.length - 1;
		c = !0
	}
	if (c) {
		this.vb();
		this.Zs(b)
	}
};
f.tk.alp = function(l, d) {
	var G = l.length;
	if (G != d.length) return !1;
	for (var A = 0; A < G; A++)
		if (l[A].os != d[A].os) return !1;
	return !0
};
f.tk.prototype.kF = function(l, d) {
	if (this.lF == null) return;
	this.lF.er();
	var G = this.tR;
	if (G instanceof Array) {
		var b = this.$l(l, this.J2),
			V = l.getHeadHistoryState();
		if (V != null && V.G == this && V.data.Pw && f.tk.alp(V.data.Pw, G)) V.data.vh = b;
		else {
			var Q = new HistoryState(this.name, this);
			Q.data = {
				Pw: G,
				vh: b
			};
			l.pushHistoryState(Q)
		}
	} else {
		var Q = new HistoryState(this.name, this);
		Q.data = {
			ih: G.ih,
			Za: G.Za,
			Sd: G.Sd,
			le: G.le
		};
		l.pushHistoryState(Q)
	}
	this.escape(l, d)
};
f.tk.prototype.Ht = function(l, d) {
	if (this.lF == null) return;
	if (this.tR instanceof Array) {
		this.Gj(l, this.tR);
		if (this.lF) dt.MT(this.lF.add.TySh)
	} else {
		l.g = this.tR.Sd;
		l.g8(this.tR.ih);
		l.i_ = !0
	}
	l.U();
	this.escape(l, d)
};
f.tk.prototype.escape = function(l, d) {
	this.ac0();
	this.lF = null;
	this.J2 = null;
	this.yB = null;
	this.JD = null;
	this.qT.blur();
	l.I.Bt = null;
	l.I.Y1 = null;
	l.I.jf = [];
	l.uK = !0;
	this.R0 = !1;
	this.Jq = !1;
	this.LL = this.Tp = -1;
	this.rv(d, ActionTypes.E.L, {
		a: ActionTypes.$.vq,
		G: this.id,
		DI: "hideactive"
	});
	if (this.fF) {
		var G = new Action(ActionTypes.E.L, !0);
		G.data = {
			a: ActionTypes.$.yb,
			G: this.fF
		};
		d.dispatch(G);
		this.fF = null
	}
};
f.tk.prototype.rv = function(l, d, G, b) {
	var V = new Action(d, !0);
	V.data = G;
	if (b) V.G = b;
	l.dispatch(V)
};
f.tk.prototype.my = function(l) {
	var d = this.lF.add.TySh,
		G = this.yB,
		b = d.D.clone();
	b.hI();
	var V = b.kD(l),
		Q = dt.Pa(d, G),
		t = PixelUtil.textWarp.js(d.R8, Q),
		I = PixelUtil.Xp.ard(t, V);
	if (I == null) I = new Float64Array(2);
	V = new Point2D(Q.x + I[0] * Q.m, Q.y + I[1] * Q.n);
	if (G.mK) {
		var y = G.mK.clone();
		y.hI();
		V = y.kD(V)
	}
	var e = G.ai8(V);
	return e
};
f.tk.prototype.Zs = function(l, d) {
	if (d == null) d = !1;
	var G = this.lF.add.TySh,
		b = dt.WK(G.zC),
		V = this.yB,
		Q = V ? dt.Pa(G, V) : null;
	l.I.jf = [];
	l.I.Bt = null;
	l.I.Y1 = null;
	var t = this.cT ? this.cT : this.JD;
	if (t) {
		t.cN(l, this.wQ, !PixelUtil.textWarp.T9(G.R8));
		var I = G.D.clone();
		I.hI();
		if (V && V.mK && V.Ts == 1) {
			var y = V.mK.clone();
			y.hI();
			I.concat(y)
		}
		PixelUtil.vec.transformCoords(l.I.jf, I, l.I.jf);
		PixelUtil.vec.transformCoords(l.I.Bt.C, I, l.I.Bt.C);
		if (V && V.mK == null && V.aiR()) {
			var e = Q.m - 20,
				M = Q.n + 8;
			l.I.Bt.C.push(e, M, e + 10, M, e + 5, M - 5, e + 5, M + 5);
			l.I.Bt.F.push("M", "L", "M", "L")
		}
	} else if (b == 0) this.afd(l, G, V);
	else l.I.Bt = {
		C: [],
		F: []
	};
	var R = Math.min(this.LL, this.Tp),
		J = Math.max(this.LL, this.Tp);
	if (!d) {
		this.qT.selectionStart = R;
		this.qT.selectionEnd = J
	}
	if (V != null) {
		var n = function(t, F) {
			var D = t.x,
				q = t.y + t.n,
				H = new Matrix2D;
			H.translate(-D, -q);
			H.rotate(-F);
			H.translate(D, q);
			t.y += t.n * .27;
			var k = PixelUtil.vec.simplifyPath(t);
			PixelUtil.vec.transformCoords(k.C, H, k.C);
			return k
		};
		if (R == J) {
			R = Math.max(R, 0);
			var r = V.SJ(R);
			if (r) {
				var T = r.vD,
					j = this.wQ.XG.xg.FontSize;
				if (j != null && j != 0) {
					j /= G.D.Nw();
					T.y += T.n - j;
					T.n = j
				}
				var g = V.a2g(R);
				if (g != null && g.An == 1) T.x += T.m;
				var Y = n(T, r.Ay).C;
				l.I.Bt.F.push("M", "L");
				l.I.Bt.C.push(Y[0], Y[1] - 1, Y[6], Y[7] - 1)
			}
		} else {
			l.I.Y1 = {
				C: [],
				F: []
			};
			for (var A = R; A < J; A++) {
				var r = V.SJ(A),
					k = n(r.vD, r.Ay);
				PixelUtil.vec.concat(l.I.Y1, k)
			}
		}
	}
	l.I.Bt = StyleHelper.applyMaskToPath(l.I.Bt, G, V);
	l.I.Y1 = StyleHelper.applyMaskToPath(l.I.Y1, G, V);
	l.I.jf = StyleHelper.applyMaskToPath({
		C: l.I.jf
	}, G, V).C;
	l.uK = !0
};
f.tk.prototype.afd = function(l, d, G) {
	if (G == null) return;
	l.I.jf.push(0, 0);
	if (l.I.Bt == null) l.I.Bt = {
		F: [],
		C: []
	};
	for (var A = 0; A < G.GB.length; A++) {
		var b = G.GB[A];
		for (var V = 0; V < b.Jj.length; V++) {
			var Q = b.Jj[V],
				t = b.sw.x + Q.sw.x + Q.vD.x,
				I = b.sw.y + Q.sw.y + Q.vD.y + Q.vD.n;
			l.I.Bt.F.push("M", "L");
			l.I.Bt.C.push(t, I, t + Q.vD.m, I)
		}
	}
	l.uK = !0
};
// Vertical Type Tool
f.ayg = function() {
	f.tk.call(this, !0)
};
f.ayg.prototype = new f.tk;
// Lasso Select Tool
f.Ri = function() {
	f.GS.call(this, "Lasso Select", f.gc, "tools/lasso");
	this.sK = "crosshair";
	this.wT = null;
	this.EH = null;
	this.Ya = null
};
f.Ri.prototype = new f.GS;
f.Ri.prototype.JO = function(l, d, G, b) {
	this.wT = this.B0;
	this.EH = {
		C: [this.wT.x, this.wT.y],
		F: ["M"]
	}
};
f.Ri.prototype.D2 = function(l, d, G, b) {
	this.Ya = b;
	var V = this.EH;
	if (V == null) return;
	if (!b.oW) {
		if (this.EH != null && this.NC > 1 && G.l(KeyboardHandler.Jm)) {
			V.C.pop();
			V.C.pop();
			V.C.push(this.Xm.x, this.Xm.y);
			l.I.Bt = V;
			l.uK = !0
		}
		return
	}
	V.F.push("L");
	V.C.push(this.Xm.x, this.Xm.y);
	this.wT = this.Xm;
	if (this.O1) {
		l.I.Bt = V;
		l.uK = !0
	}
};
f.Ri.prototype.in = function() {
	return this.EH != null
};
f.Ri.prototype.jc = function() {
	return this.EH != null
};
f.Ri.prototype.o9 = function(l, d, G, b) {
	f.GS.prototype.o9.call(this, l, d, G, b);
	if (this.EH && this.NC > 1 && this.Ya && !this.Ya.oW && !b.l(KeyboardHandler.Jm)) this.abc(l, G, b)
};
f.Ri.prototype.qd = function(l, d, G, b) {
	this.Ya = b;
	var V = this.EH;
	if (V == null) return;
	if (this.NC > 1 && G.l(KeyboardHandler.Jm)) {
		V.F.push("L");
		V.C.push(this.Xm.x, this.Xm.y);
		return
	}
	this.abc(l, d, G)
};
f.Ri.prototype.abc = function(l, d, G) {
	this.finish(l, d, G, this.Ya);
	this.EH = null;
	l.I.Bt = null;
	l.uK = !0
};
f.Ri.prototype.getSelection = function(l, d, G, b) {
	if (this.B0.XB(this.Xm) || !this.O1) return null;
	return f.GS.TW(this.EH.C, null, this.HS.anta)
};
// Move Tool
f.Pq = function() {
	f.AbstractTool.call(this, "Move Tool", f.$C, "tools/move");
	this.uy = new Point2D(0, 0);
	this.XT = new Point2D(0, 0);
	this.OJ = null;
	this.wN = null;
	this.hu = new Point2D(0, 0);
	this._B = null;
	this.mN = null;
	this.QF = null;
	this.vE = 0;
	this.$0 = null;
	this.k3 = [];
	this.B2 = null;
	this.CF = null;
	this.yA = !1;
	this.a = 0;
	this.mm = null;
	this.h8 = null;
	this.j4 = null;
	this.WX = !1;
	this.HS = {
		Pm: !0,
		yn: !1,
		nO: !1,
		anl: 1
	};
	this.aoc = !1;
	this.a56 = !1;
	this.JD = null;
	this.DM = null;
	this.iA = null;
	var l = [];
	for (var A = 0; A < PixelUtil.y0.Fc.length; A++) l.push({
		name: PixelUtil.y0.Fc[A],
		p: function(d, G, b) {
			return {
				Zj: G.hq.SF == b
			}
		}
	});
	// this.pz = new ContextPanel(l);
	// this.pz.addListener("select", this.Ux, this)
};
f.Pq.prototype = new f.AbstractTool;
f.AbstractTool.prototype.Q0 = function(l) {
	return this.yA && this.a != 2
};
f.Pq.prototype.azC = function() {
	return this.yA && (this.a == 0 || this.a == 1)
};
f.Pq.prototype.fW = function(l, d, G, b) {
	this.mi(l, -this.hu.x, -this.hu.y);
	this.hu.T6(0, 0);
	this.n7(l, null, G);
	this.Tr(l)
};
f.Pq.prototype.v2 = function() {
	var l = this.HS;
	return [l.Pm ? 1 : 0, l.yn ? 1 : 0, l.nO ? 1 : 0]
};
f.Pq.prototype.j6 = function(l, d, G) {
	var b = this.HS;
	if (l && l[0] != null) b.Pm = l[0] == 1;
	if (l && l[1] != null) b.yn = l[1] == 1;
	if (l && l[2] != null) b.nO = l[2] == 1;
	var V = new Action(ActionTypes.E.L, !0);
	V.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		Ye: b,
		axj: d
	};
	G.dispatch(V)
};
f.Pq.ajm = function(l, d, G, b, V, Q, t) {
	if (t == null) t = [!1, !0];
	var I = l.OM(null, V, !0),
		y, e;
	if (l.add.artd && l.g.length == 1 && l.B[l.g[0]].add.artb) {
		var R = l.B[l.g[0]].dA();
		y = l.LA(I, R, R)[0]
	} else {
		var J = new Rect(0, 0, l.m, l.n),
			y = l.LA(I, t[0] ? J : null, t[1] ? null : J)[0];
		delete y.add.artd;
		if (t[1]) {
			var n = PixelUtil.tightBoundsFromRgba(y.LT(), new Rect(0, 0, y.m, y.n), 2);
			f.Gt.UP(y, n)
		}
	}
	if (G != 1) {
		var r = new Rect(0, 0, Math.round(y.m * G), Math.round(y.n * G));
		f.Gt.UP(y, r);
		var T = [];
		for (var A = 0; A < y.B.length; A++) T.push(A);
		var j = f.NH.RL(y, T, !0);
		f.Gt.cS(y, new Matrix2D(G, 0, 0, G, 0, 0));
		f.NH.tF(y, b, T, j, 1, PixelUtil.canvas.pu(new Matrix2D(G, 0, 0, G, 0, 0)), null, !0);
		y.Po()
	} else if (e) {
		y.U();
		y.Po()
	}
	var g = [];
	for (var A = 0; A < d.length; A++)
		if (y.m * y.n != 0) g.push(FormatHandler.h9(y, d[A].toUpperCase(), null, null, Q ? Q[A] : null, b));
	return g
};
f.Pq.prototype.aox = function(l, d, G, b, V) {
	if (l == null || l.g.length == 0) return;
	var Q = f.Pq.ajm(l, [d], G, b, null)[0],
		t = new Action(ActionTypes.E.L, !0);
	t.data = {
		a: ActionTypes.$.hK,
		data: Q,
		name: l.B[l.g[0]].getName() + (G == 1 ? "" : "@" + G + "x") + "." + d
	};
	V.dispatch(t)
};
f.Pq.prototype.A0 = function(l, d, G, b, V) {
	if (l.y3 == "getPNG") {
		this.aox(G, "png", l.z3, V, d)
	} else if (l.y3 == "getSVG") {
		this.aox(G, "svg", l.z3, V, d)
	}
	if (l.y3 == "prms") {
		this.HS = l;
		this.Tr(G)
	}
};
f.Pq.arZ = function(l) {
	var hZ = l.length,
		G = 0;
	l.sort(function(Q, t) {
		return Q[0] + Q[1] / 2 - (t[0] + t[1] / 2)
	});
	var d = l[hZ - 1][0] + l[hZ - 1][1] - l[0][0];
	for (var A = 0; A < hZ; A++) G += l[A][1];
	var b = Math.round((d - G) / (hZ - 1)),
		V = l[0][0];
	for (var A = 0; A < hZ; A++) {
		l[A][0] = V;
		V += l[A][1] + b
	}
};
f.Pq.prototype.TA = function(l, d, G, b, V) {
	var Q = l.a;
	if (Q == "trsl") {
		var t = Math.round(l.wS),
			I = Math.round(l.ui);
		this.hu.T6(t, I);
		this.aY(G, d, b, V, !1, l.j);
		this.mi(G, t, I);
		this.n7(G, null, V)
	} else if (Q == "fcmy" || Q == "fvec") {
		var y = ["RGB", "CMYK"][l.Z] + " Color";
		if (Q == "fvec") y = ["Raster", "Vector"][l.Z] + " Mode";
		var e = new HistoryState(y, this);
		e.data = {
			a: l.a,
			mS: G.add[Q] == null ? 0 : G.add[Q],
			mz: l.Z
		};
		G.pushHistoryState(e);
		this.applyRedo(e.data, G)
	} else if (Q == "pview") {
		var Q = new HistoryState([8, 14], this);
		Q.data = {
			a: l.a
		};
		G.pushHistoryState(Q);
		this.applyRedo(Q.data, G)
	} else if (Q == "lockguides") {
		if (G) G.HH = !G.HH
	} else if (Q == "gids" || Q == "gidsFromLayer") {
		var M = l.h8,
			R, J;
		if (M == null) M = G.Ww();
		if (Q == "gids") {
			R = l.jh;
			var n = M[0].length,
				r = R[0].length;
			J = n == r ? [23, 2] : n > r ? [23, 3] : [23, 4];
			if (r == 0) J = [11, 15, 0]
		} else if (Q == "gidsFromLayer") {
			var T = [],
				j = [],
				g = G.bZ();
			for (var A = 0; A < G.g.length; A++) {
				var Y = G.B[G.g[A]].rect;
				if (Y.W6()) continue;
				T.push([0, Y.x], [1, Y.y], [0, Y.x + Y.m], [1, Y.y + Y.n]);
				j.push(g, g, g, g)
			}
			J = [11, 15, 1];
			R = G.Ww();
			f.Pq.eF(R, [T, j])
		}
		if (JSON.stringify(M) == JSON.stringify(R)) return;
		var Q = new HistoryState(J, this);
		Q.data = {
			a: 2,
			h8: M,
			jh: R
		};
		G.pushHistoryState(Q);
		this.applyRedo(Q.data, G)
	} else if (Q == "algn") {
		var k = l.Z;
		if (G == null) return;
		if (G.g.length < 2 && !(G.P != null && k != 3 && k != 7)) {
			alert("Select multiple layers");
			return
		}
		var F = G.P;
		G.P = null;
		var Y = F ? F.rect : f.NH.Pa(G);
		this.aY(G, d, b, V, !1);
		if (!this.yA) return;
		var D = this.$0,
			q = {},
			H = [],
			W = [],
			Z = [];
		for (var A = 0; A < D.length; A++) {
			var B = D[A];
			while (G.B[B].getName() == "</Layer group>") B++;
			var a = G.root.O4(B),
				m = a;
			while (a.parent != null) {
				a = a.parent;
				if (D.indexOf(a.index) != -1) m = a
			}
			var p = W.indexOf(m.index);
			if (p == -1) {
				p = W.length;
				W.push(m.index)
			}
			H[A] = p
		}
		var c = [],
			v = [],
			i = [];
		for (var A = 0; A < W.length; A++) {
			var z = f.NH.Pa(G, G.OM(!0, W[A]));
			i.push(z);
			var P = k == 3 ? [z.y, z.n] : [z.x, z.m];
			c[A] = P;
			v.push(P)
		}
		f.Pq.arZ(v);
		for (var A = 0; A < W.length; A++) {
			var z = i[A],
				C = z.x,
				h = z.y;
			if (k == 0) C = Y.x;
			if (k == 1) C = Y.x + (Y.m - z.m) / 2;
			if (k == 2) C = Y.x + (Y.m - z.m);
			if (k == 3) h = c[A][0];
			if (k == 4) h = Y.y;
			if (k == 5) h = Y.y + (Y.n - z.n) / 2;
			if (k == 6) h = Y.y + (Y.n - z.n);
			if (k == 7) C = c[A][0];
			Z.push(Math.round(C - z.x), Math.round(h - z.y))
		}
		var L = [];
		for (var A = 0; A < D.length; A++) {
			var U = H[A];
			L[2 * A] = Z[2 * U];
			L[2 * A + 1] = Z[2 * U + 1]
		}
		this.mi(G, 0, 0, null, L);
		var S = k == 3 || k == 7 ? [20, 4, 6] : [20, 4, k < 3 ? k : k - 1];
		this.n7(G, null, V, L, S);
		G.P = F
	} else if (Q == "disabAuto") {
		this.j6([!1], null, d)
	}
};
f.Pq.eF = function(l, d) {
	for (var A = 0; A < d[0].length; A++) {
		var G = d[0][A],
			b = d[1][A],
			V = !1;
		for (var Q = 0; Q < l[0].length; Q++) {
			var t = l[0][Q],
				I = l[1][Q];
			if (G[0] == t[0] && G[1] == t[1] && b == I) V = !0
		}
		if (!V) {
			l[0].push(G.slice(0));
			l[1].push(b)
		}
	}
};
f.Pq.prototype.enable = function(l, d, G, b, V) {
	this.mN = G;
	this.QF = d;
	this.WX = V ? !0 : !1;
	this.Tr(l);
	this.ed("default", d);
	this.o9(l, d, G, b)
};
f.Pq.prototype.disable = function(l, d, G, b) {
	this.akD(l)
};
f.Pq.prototype.akD = function(l) {
	if (l == null) return;
	if (this.JD) {
		this.JD.clear(l);
		this.JD = null
	}
	if (l.I.nO) {
		l.I.nO = null;
		l.uK = !0
	}
	if (l.I.Cj) {
		l.I.Cj = null;
		l.uK = !0
	}
	if (l.I.He[this.id]) {
		delete l.I.He[this.id];
		l.uK = !0
	}
	if (l.I.P4.length != 0) {
		l.I.P4 = [];
		l.uK = !0
	}
};
f.Pq.prototype.Ew = function(l, d, G, b) {
	if (G.QN != this.id) return;
	this.Tr(l)
};
f.Pq.prototype.Tr = function(l, d) {
	if (l == null) return;
	var G = this.HS;
	this.akD(l);
	if (!this.WX) {
		var b;
		if (G.yn || G.nO) b = PixelUtil.vec.f1(f.NH.Pa(l));
		if (G.yn && !b.W6()) {
			this.JD = new gG([b.x, b.y, b.x + b.m, b.y, b.x + b.m, b.y + b.n, b.x, b.y + b.n], !0);
			this.JD.cN(l, this.mN)
		}
		if (G.nO) {
			var V = null,
				M = null,
				R = !1;
			if (l.bZ() != -1) V = l.B[l.bZ()].dA();
			else V = new Rect(0, 0, l.m, l.n);
			l.I.nO = {
				KB: [b],
				wx: []
			};
			var Q = l.I.nO.wx,
				t = b.x + b.m,
				I = b.y + b.n,
				y = b.x + Math.floor(b.m / 2),
				e = b.y + Math.floor(b.n / 2);
			if (d) {
				var J = l.root.Rw(new Point2D(Math.floor(d.x), Math.floor(d.y)));
				if (J) {
					M = PixelUtil.vec.f1(J.j.VR(l));
					if (M.N1(b)) {
						R = (M.iL(b) || b.iL(M)) && !b.XB(M);
						if (!R) M = null
					}
				}
			}
			this.aub(b, Q);
			if (M != null) {
				l.I.nO.KB.push(M);
				var n = M.x + M.m,
					r = M.y + M.n,
					T = M.x + Math.floor(M.m / 2),
					j = M.y + Math.floor(M.n / 2);
				if (R) {
					var g = y,
						Y = e;
					if (b.iL(M)) {
						g = T;
						Y = j
					}
					Q.push(b.x, Y, M.x, Y);
					Q.push(t, Y, n, Y);
					Q.push(g, b.y, g, M.y);
					Q.push(g, I, g, r)
				} else {
					this.aub(M, Q);
					var k = I < M.y || r < b.y,
						F = t < M.x || n < b.x;
					if (t < M.x) Q.push(t, e, M.x, e);
					if (n < b.x) Q.push(n, e, b.x, e);
					if (I < M.y) Q.push(y, I, y, M.y);
					if (r < b.y) Q.push(y, r, y, b.y);
					if (k && !F) {
						if (b.x < M.x) Q.push(b.x, j, M.x, j);
						if (M.x < b.x) Q.push(M.x, e, b.x, e)
					}
				}
			} else {
				if (b.y > V.y) Q.push(y, V.y, y, b.y);
				if (I < V.y + V.n) Q.push(y, I, y, V.y + V.n);
				if (b.x > V.x) Q.push(V.x, e, b.x, e);
				if (t < V.x + V.m) Q.push(t, e, V.x + V.m, e)
			}
			l.uK = !0
		}
	}
	if (this.a == 2 && this.yA) {
		var D = new Rect(0, 0, l.m, l.n),
			q = l.bZ();
		if (q != -1) {
			var H = l.Ww(),
				W = H[1][this.$0];
			if (W == -1) W = q;
			D = l.B[W].dA()
		}
		var Z = l.qz[this.$0],
			B = Z[0],
			a = (B == 0 ? "X" : "Y") + ": " + PixelUtil.y0.ij(Z[1] - (B == 0 ? D.x : D.y), l.m7, this.mN, B == 0 ? D.m : D.n, !0);
		f.AbstractTool.JV(Math.round(this.OJ.x) + 10, Math.round(this.OJ.y) - 10, [a], l);
		l.uK = !0
	}
	if (this.a == 3 && this.yA) {
		var m = PixelUtil.vec.simplifyPath(this.mm);
		l.I.He[this.id] = {
			Bt: m
		};
		l.uK = !0
	}
};
f.Pq.prototype.aub = function(l, d) {
	var G = l.m,
		b = l.n,
		V = l.x + Math.floor(G * .2),
		Q = l.y + Math.floor(b * .2);
	d.push(V, l.y, V, l.y + b);
	d.push(l.x, Q, l.x + G, Q)
};
f.Pq.prototype.ed = function(l, d) {
	var G = {
			a: ActionTypes.$.e5,
			ew: l
		},
		b = new Action(ActionTypes.E.L, !0);
	b.data = G;
	d.dispatch(b)
};
f.Pq.prototype.oB = function(l) {
	var d = this.DM.sz()[0];
	if (d == this.iA.length) {
		var G = new Action(ActionTypes.E.L, !0);
		G.data = {
			a: ActionTypes.$.mb,
			oE: "psd"
		};
		this.QF.dispatch(G);
		return
	}
	var b = this._B,
		V = this.iA[d];
	this.ah0(b, V)
};
f.Pq.prototype.Ux = function(l) {
	var d = JSON.parse(JSON.stringify(this.mN.hq));
	d.SF = this.pz.sz()[0];
	var G = new Action(ActionTypes.E.L, !0);
	G.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.UW,
		mz: d
	};
	this.QF.dispatch(G)
};
f.Pq.prototype.h_ = function(l, d, G, b, V) {
	if (this.yA) this.Nl(l, d, G, b, V);
	this._B = l;
	this.mN = G;
	this.QF = d;
	var Q = l.u.Zx(V.x, V.y),
		t;
	if (f.Pq.lc(G, V, l.u)) {
		t = this.pz
	} else {
		if (this.DM) this.DM.removeEventListener("select", this.oB);
		var I = [];
		l.root.Rw(Q, I);
		if (I.length == 0) return;
		var y = [];
		this.iA = I;
		for (var A = 0; A < I.length; A++) y.push({
			name: l.B[I[A]].getName(),
			xX: A == I.length - 1
		});
		y.push({
			name: "Share ..."
		});
		// t = this.DM = new ContextPanel(y);
		// t.addListener("select", this.oB, this)
	}
	t.parent = d;
	t.refresh();
	t.update(l, G);
	var e = new Action(ActionTypes.E.L, !0);
	e.data = {
		a: ActionTypes.$.dY,
		A3: t,
		x: V.pf + 2,
		y: V.pi + 1
	};
	d.dispatch(e)
};
f.Pq.prototype.anf = function(l, d, G, b, V) {
	var Q = f.Pq.RV(l, V);
	return Q != -1 || f.Pq.lc(G, V, l.u)
};
f.Pq.RV = function(l, d) {
	if (l == null || l.add.artd == null) return -1;
	var G = l.u.Zx(d.x, d.y),
		b = 12 * window.devicePixelRatio / l.u.N;
	for (var A = 0; A < l.B.length; A++) {
		var V = l.B[A];
		if (!V.zD() || V.add.artb == null) continue;
		var Q = V.dA(),
			t = new Rect(Q.x, Q.y - 1.7 * b, b * V.getName().length * .5, b);
		if (t.xC(G)) return A
	}
	return -1
};
f.Pq.prototype.dJ = function(l, d, G, b, V) {
	var Q = f.Pq.RV(l, V),
		t = f.Pq.akj(l, l.u.Zx(V.x, V.y));
	if (Q != -1) {
		l.g = [Q];
		if (G.QN == f.$C) {
			var I = new Action(ActionTypes.E.L);
			I.data = {
				a: ActionTypes.$.yb,
				G: f.QC
			};
			d.dispatch(I)
		}
		return
	}
	if (t != -1) {
		l.u.$m = t;
		l.bV = !0;
		var I = new Action(ActionTypes.E.L, !0);
		I.data = {
			a: ActionTypes.$.B_,
			GU: PanelTabBase.xA.avR
		};
		d.dispatch(I);
		return
	}
	this.OJ = V;
	this.uy.T6(V.x, V.y);
	this.XT = l.u.Zx(V.x, V.y);
	this.wN = new gA(this.XT);
	this.aY(l, d, b, G, !0)
};
f.Pq.lc = function(l, d, G, b) {
	var V = PixelUtil.y0.mT,
		Q = G.Vm.n;
	return l.bI && (0 < d.x && d.x < V || 0 < d.y && d.y < V || b && 0 < d.x && d.x < 4 * V && Q - V < d.y && d.y < Q)
};
f.Pq.prototype.aY = function(l, d, G, b, V, Q) {
	var t, I = this.XT,
		y = !1;
	if (V) {
		var e = b.Wi && b.hq.qz;
		if (f.Pq.lc(b, this.uy, l.u)) {
			t = l.Ww();
			var M = l.Ww(),
				R = null;
			if (this.uy.x < PixelUtil.y0.mT) {
				R = [0, I.x]
			}
			if (this.uy.y < PixelUtil.y0.mT) {
				R = [1, I.y]
			}
			M[0].push(R);
			M[1].push(l.bZ(!0));
			l.Y$(M);
			if (!e) {
				var J = new Action(ActionTypes.E.L);
				if (!b.hq.qz) {
					J.data = {
						a: ActionTypes.$.kI,
						Oo: PsdResourceTypes.ef
					};
					d.dispatch(J)
				}
				if (!b.Wi) {
					J.data = {
						a: ActionTypes.$.kI,
						Oo: PsdResourceTypes.Z3
					};
					d.dispatch(J)
				}
				e = !0
			}
		}
		var n = this.atZ(l, I);
		if (e && n != null && !l.HH) {
			this.a = 2;
			this.h8 = t ? t : l.Ww();
			this.$0 = n;
			this.yA = !0;
			this.CF = f.NH.Pa(l);
			return
		}
		if (l.FB.length != 0) {
			this.a = 4;
			this.CF = l.vj[l.FB[0]].rect.clone();
			this.yA = !0;
			return
		}
		if (this.JD && this.JD.Rg(I, l.u.N, !0, this.OJ) != null) {
			var J = new Action(ActionTypes.E.L);
			J.data = {
				a: ActionTypes.$.yb,
				G: f.qK,
				a1Z: !0
			};
			d.dispatch(J);
			return
		}
		if (l.P && l.P.rect.xC(I)) {
			var r = Math.round(I.x),
				T = Math.round(I.y),
				j = l.P.rect;
			y = l.P.channel[(T - j.y) * j.m + r - j.x] > 128
		}
		if (!y && (!this.WX && this.HS.Pm || this.WX && this.HS.Pm && (G.l(KeyboardHandler.Zz) || l.g.length < 2))) {
			var g = this.atX(l, I, G);
			if (!g) {
				l.g = [];
				l.jP = null;
				l.i_ = l.Va = !0;
				this.a = 3;
				this.mm = new Rect;
				this.yA = !0;
				return
			}
		}
		if (G.l(KeyboardHandler.Jm) && !y) {
			var Y = new Action(ActionTypes.E.v);
			Y.G = f.yS;
			Y.data = {
				a: LayerRecord.ZY,
				ay$: !0
			};
			d.dispatch(Y)
		}
	}
	if (l.FB.length != 0) {
		this.a = 4;
		this.CF = l.vj[l.FB[0]].rect.clone();
		this.yA = !0;
		return
	}
	this.$0 = l.OM(Q == null, Q, null, !0);
	for (var A = 0; A < this.$0.length; A++) {
		var k = this.$0[A],
			F = l.B[k];
		if (F.Ka(2) || F.Ka(31) || l.jq(k)) {
			alert("This layer is Locked.");
			return
		}
	}
	if (l.add.artd && V) {
		var D = this.$0,
			q = !1;
		for (var A = 0; A < D.length; A++)
			if (l.B[D[A]].add.artb) q = !0;
		if (!q) {
			this.B2 = [l, l.B.slice(0), l.g.slice(0), -1];
			this.$0.sort(function(c, v) {
				return c - v
			})
		}
	}
	this.k3 = f.Pq.aqq(l, this.$0);
	this.a = 0;
	if (l.P && (!V || y) && l.g.length == 1 && l.T8(!1)) {
		if (!l.acG()) {
			this.yA = !1;
			return
		}
		var H = l.B[l.g[0]],
			W = G.l(KeyboardHandler.Jm);
		this.a = 1;
		var Z = l.history[l.historyIndex];
		if (Z.G == this && Z.data.a == 1 && Z.data.j == l.g[0] && H.ht == H.IB.ht && !W) {
			this.j4 = Z
		} else {
			var B = H.IB,
				a = !1,
				m;
			if (!H._l(l, l.P) || W) {
				a = !0;
				H.Ep(l, l.P, W)
			}
			if (H.IB.ht <= 0) {
				m = PixelUtil.allocBytes(H.IB.o7.length >> 2);
				PixelUtil.extractChannelFromRgba(H.IB.o7, m, 3)
			} else m = l.P.channel.slice(0);
			var p = {
				rect: H.IB.cG.clone(),
				channel: m
			};
			this.j4 = new HistoryState(W ? [12, 53] : [12, 54], this);
			this.j4.data = {
				a: 1,
				j: l.g[0],
				IB: H.IB,
				ap: B,
				Un: a,
				Sd: l.P,
				le: p,
				Qd: new Point2D(0, 0)
			};
			l.pushHistoryState(this.j4);
			l.P = p;
			l.Of = !0
		}
	}
	this.yA = !0;
	this.CF = f.NH.Pa(l)
};
f.Pq.prototype.atX = function(l, d, G) {
	var b = l.root.Rw(new Point2D(Math.floor(d.x), Math.floor(d.y)));
	if (b) {
		if (b.j.add.vmsk) l.uK = !0;
		var V = l.B.indexOf(b.j);
		if (this.HS.anl == 0) {
			var Q = l.root.O4(V);
			while (Q.parent && Q.parent.depth != 0 && Q.parent.j.add.artb == null) Q = Q.parent;
			V = Q.index
		}
		if (G.l(KeyboardHandler.Zz)) {
			var t = l.g.indexOf(V);
			if (t == -1) l.g.push(V);
			else if (l.g.length > 1) l.g.splice(t, 1)
		} else if (l.g.indexOf(V) == -1) {
			this.ah0(l, V)
		}
	}
	return b != null
};
f.Pq.prototype.ah0 = function(l, d) {
	l.B[d].ht = 0;
	l.g = [d];
	l.jP = null;
	l.rf();
	l.DF = !0;
	l.i_ = !0
};
f.Pq.akj = function(l, d) {
	var G = l.add.Anno;
	if (G == null || G.length == 0) return -1;
	var b = 30 / l.u.N;
	for (var A = 0; A < G.length; A++)
		if (new Rect(G[A][0], G[A][1], b, b).xC(d)) return A;
	return -1
};
f.Pq.prototype.JP = function(l, d, G, b, V) {
	this.OJ = V;
	var Q = l.u.Zx(V.x, V.y),
		n, r;
	if (this.wN && this.a < 2) Q = this.wN.kx(Q, b);
	if (!this.yA) {
		if (G.Wi && G.hq.qz && l && !l.HH) {
			var t = this.atZ(l, Q),
				I = "default",
				y = f.Pq.RV(l, V);
			if (t != null) I = ["col-resize", "row-resize"][l.qz[t][0]];
			else if (this.JD) {
				var e = this.JD.Rg(Q, l.u.N, null, V);
				if (e) I = e
			} else if (y != -1 || f.Pq.akj(l, Q) != -1) {
				I = "pointer"
			}
			this.ed(I, d)
		}
		this.Tr(l, Q);
		return
	}
	var M = this.XT,
		R = Math.round(Q.x - M.x) - this.hu.x,
		J = Math.round(Q.y - M.y) - this.hu.y;
	if (this.CF) {
		if (this.a == 2) {
			var T = [];
			if (l.P) T.push(l.P.rect);
			if (this.CF) T.push(this.CF);
			if (l.u.M9) T.push(l.u.M9);
			Q = f.Pq.aM(l, Q, G, [!1, T, !0])
		} else {
			r = this.CF.clone();
			r.offset(this.hu.x + R, this.hu.y + J);
			n = f.Pq.wA(l, r, G);
			var j = this.wN.aoW(b);
			if (j == 1) {
				n[0] = 0;
				n[2] = 1e9
			}
			if (j == 2) {
				n[1] = 0;
				n[3] = 1e9
			}
			R += Math.round(n[0]);
			J += Math.round(n[1])
		}
	}
	this.hu.x += R;
	this.hu.y += J;
	var g = this.B2;
	if (g && l == g[0]) {
		l.g8(g[1]);
		l.g = g[2].slice(0);
		g[3] = -1
	}
	this.mi(l, R, J, Q, null, b.l(KeyboardHandler.Zz));
	if (g && l == g[0]) {
		var Y = this.CF.clone();
		Y.offset(this.hu.x, this.hu.y);
		var k = Q,
			y = l.bZ(),
			F = -1;
		for (var A = 0; A < l.B.length; A++) {
			var D = l.B[A];
			if (!D.zD() || D.add.artb == null) continue;
			var q = D.dA();
			if (q.xC(k)) F = A
		}
		if (F != -1 && F != y) {
			var H = f.uj.Ys(l, this.$0, F, !0, null, !1);
			l.g8(H[0]);
			l.g = H[1];
			g[3] = F
		}
	}
	this.Tr(l, Q);
	if (n) f.Pq.If(l, r, n)
};
f.Pq.prototype.atZ = function(l, d) {
	var G = f.Jo(l, this.OJ);
	d = [d.x, d.y];
	var b = l.Ww(),
		V = l.bZ();
	for (var A = 0; A < b[0].length; A++) {
		var Q = b[0][A],
			t = b[1][A];
		if (t != -1 && t != V) continue;
		if (Math.abs(Q[1] - d[Q[0]]) < G) return A
	}
	return null
};
f.Pq.prototype.mi = function(l, d, G, b, V, Q) {
	if (this.a == 0) {
		if (V) f.Pq.W9(l, this.$0, this.k3, V);
		else f.Pq._P(l, this.$0, this.k3, d, G)
	} else if (this.a == 1) {
		var t = this.j4.data;
		t.Qd.offset(d, G);
		f.Pq.nL(l, t.j, d, G)
	} else if (this.a == 2) {
		var I = 1e-5;
		if (Q) I = l.u.N <= 1 ? 10 : 1;
		else if (l.u.N <= 1) I = 1;
		var y = I * Math.round(b.x / I),
			e = I * Math.round(b.y / I),
			M = [y, e],
			R = l.qz[this.$0];
		R[1] = M[R[0]]
	} else if (this.a == 3) {
		var J = this.XT,
			n = PixelUtil.vec.flattenPath([J.x, J.y, b.x, b.y]);
		this.mm = n;
		var r = [];
		l.root.a2W(n, r);
		if (JSON.stringify(l.g) != JSON.stringify(r)) {
			l.g = r;
			l.i_ = l.Va = !0
		}
	} else if (this.a == 4) {
		for (var A = 0; A < l.FB.length; A++) l.vj[l.FB[A]].rect.offset(d, G);
		l.uK = !0
	}
};
f.Pq.nL = function(l, d, G, b) {
	var V = l.B[d];
	l.P.rect.offset(G, b);
	V.OX(l, G, b, l.P);
	l.Of = !0;
	l.U()
};
f.Pq.prototype.Nl = function(l, d, G, b, V, Q) {
	this.n7(l, V, G);
	this.Tr(l);
	if (Date.now() - this.vE < 300 && !Q) {
		var t = f.tk.XW(l, l.u.Zx(V.x, V.y));
		if (f.Pq.lc(G, V, l.u, !0)) {
			var I = new Action(ActionTypes.E.L);
			if (V.y > l.u.Vm.n - 20) {
				I.data = {
					a: ActionTypes.$.SN,
					GU: "doczoom",
					mS: l.u.N * 100,
					P7: {
						Y: ActionTypes.E.v,
						G: f.t7,
						W: {
							a: "pzoom"
						}
					}
				}
			} else {
				I.data = {
					a: ActionTypes.$.SN,
					GU: "preferences"
				}
			}
			d.dispatch(I)
		} else if (t >= 0) {
			var y = new Action(ActionTypes.E.v, !0);
			y.G = f.zl;
			y.data = {
				a: "editCurr",
				ca: t
			};
			d.dispatch(y)
		}
	}
	this.vE = Date.now();
	f.Gt.vd(l)
};
f.Pq.prototype.n7 = function(l, d, G, b, V) {
	if (!this.yA) return;
	this.yA = !1;
	if (this.a == 0) {
		if (b) {
			this.atr(l, null, b, V)
		} else {
			if (this.hu.x == 0 && this.hu.y == 0) return;
			this.atr(l, this.hu.clone())
		}
		l.bV = !0
	} else if (this.a == 2) {
		var Q = 0;
		d = [d.x, d.y];
		var t = this.$0,
			I = l.qz[t],
			k8 = this.h8[0].length,
			y = l.qz.length;
		if (G.bI && d[I[0]] < PixelUtil.y0.mT) {
			var e = l.Ww();
			e[0].splice(t, 1);
			e[1].splice(t, 1);
			l.Y$(e);
			Q = 1;
			if (k8 == y - 1) return
		}
		if (k8 < y) Q = 2;
		var M = new HistoryState([
			[23, 2],
			[23, 3],
			[23, 4]
		][Q], this);
		M.data = {
			a: 2,
			h8: this.h8,
			jh: l.Ww()
		};
		l.pushHistoryState(M)
	} else if (this.a == 4) {
		var M = new HistoryState([12, 54], this);
		M.data = {
			a: 4,
			g: l.FB.slice(0),
			R: this.hu.clone()
		};
		l.pushHistoryState(M)
	}
	this.hu.T6(0, 0)
};
f.Pq.prototype.o9 = function(l, d, G, b) {
	var V = b._9(l ? l.u.Ay : 0);
	if (l != null && (V.x != 0 || V.y != 0)) {
		if (b.l(KeyboardHandler.Jm) && l.P == null) {
			var Q = new Action(ActionTypes.E.v);
			Q.G = f.yS;
			Q.data = {
				a: LayerRecord.ZY,
				ay$: !0
			};
			d.dispatch(Q)
		}
		this.hu.T6(V.x, V.y);
		this.aY(l, d, b, G, !1);
		if (!this.yA) return;
		this.mi(l, V.x, V.y);
		this.n7(l, null, G);
		this.Tr(l)
	}
	var t = b.l(KeyboardHandler.wz);
	if (!this.WX && this.a56 != t) {
		if (t) {
			this.aoc = this.HS.Pm;
			this.HS.Pm = !0
		} else {
			this.HS.Pm = this.aoc
		}
		this.a56 = t;
		var I = new Action(ActionTypes.E.L, !0);
		I.data = {
			a: ActionTypes.$.vq,
			G: this.id,
			Ye: this.HS
		};
		d.dispatch(I)
	}
};
f.Pq.prototype.applyUndo = function(l, d) {
	if (l.a == 0) {
		var G = l.jJ;
		if (G) {
			d.g8(G.ih);
			d.g = G.si.slice(0);
			d.U();
			d.i_ = !0
		}
		f.Pq.W9(d, l.g, l.TU, l.x7, !0);
		f.Gt.vd(d)
	} else if (l.a == "fcmy" || l.a == "fvec") {
		if (l.mS == 0) delete d.add[l.a];
		else d.add[l.a] = l.mS;
		d.uK = !0
	} else if (l.a == "pview") {
		d.ZV = !d.ZV;
		d.U()
	} else if (l.a == 2) {
		d.Y$(l.h8);
		d.uK = !0
	} else if (l.a == 4) {
		for (var A = 0; A < l.g.length; A++) d.vj[l.g[A]].rect.offset(-l.R.x, -l.R.y);
		d.uK = !0
	} else {
		var b = d.B[l.j];
		if (l.Un) {
			b.A6(d, l.ap);
			d.P = l.Sd;
			d.Of = !0;
			d.U();
			b.U()
		} else {
			f.Pq.nL(d, l.j, -l.Qd.x, -l.Qd.y)
		}
	}
};
f.Pq.prototype.applyRedo = function(l, d) {
	if (l.a == 0) {
		f.Pq.W9(d, l.g, l.TU, l.x7);
		var G = l.jJ;
		if (G) {
			d.g8(G.Za);
			d.g = G.u4.slice(0);
			d.U();
			d.i_ = !0
		}
		f.Gt.vd(d)
	} else if (l.a == "fcmy" || l.a == "fvec") {
		if (l.mz == 0) delete d.add[l.a];
		else d.add[l.a] = l.mz;
		d.uK = !0
	} else if (l.a == "pview") {
		d.ZV = !d.ZV;
		d.U()
	} else if (l.a == 2) {
		d.Y$(l.jh);
		d.uK = !0
	} else if (l.a == 4) {
		for (var A = 0; A < l.g.length; A++) d.vj[l.g[A]].rect.offset(l.R.x, l.R.y);
		d.uK = !0
	} else {
		var b = d.B[l.j];
		if (l.Un) {
			b.IB = l.IB;
			d.P = l.le;
			f.Pq.nL(d, l.j, 0, 0);
			b.U()
		} else {
			f.Pq.nL(d, l.j, l.Qd.x, l.Qd.y)
		}
	}
};
f.Pq.prototype.atr = function(l, d, G, b) {
	if (G) {
		var V = !0;
		for (var A = 0; A < G.length; A++)
			if (G[A] != 0) V = !1;
		if (V) return
	}
	var Q = l.history[l.historyIndex],
		t = this.B2,
		I = t != null && t[3] != -1 && t[0] == l;
	if (!I && G == null && Q.data && Q.G == this && Q.data.a == 0 && JSON.stringify(Q.data.g) == JSON.stringify(this.$0) && JSON.stringify(Q.data.TU) == JSON.stringify(this.k3)) {
		var y = Q.data.x7,
			e = Q.data.aoK.a0.T.v;
		e.Hrzn.v.val += d.x;
		e.Vrtc.v.val += d.y;
		for (var A = 0; A < y.length; A += 2) {
			y[A] += d.x;
			y[A + 1] += d.y
		}
	} else {
		if (d == null) d = new Point2D(G[0], G[1]);
		var M = {
				kT: "move",
				a0: {
					classID: "null",
					null: PsdDescriptorHelper.Fw("Lyr", !0),
					T: {
						t: "Objc",
						v: {
							classID: "Ofst",
							Hrzn: {
								t: "UntF",
								v: {
									type: "#Rlt",
									val: d.x
								}
							},
							Vrtc: {
								t: "UntF",
								v: {
									type: "#Rlt",
									val: d.y
								}
							}
						}
					}
				}
			},
			R = null;
		if (I) R = {
			ih: t[1],
			si: t[2],
			Za: l.B.slice(0),
			u4: l.g.slice(0)
		};
		this.B2 = null;
		var J = new HistoryState(b ? b : [12, 54], this);
		if (G) J.data = {
			a: 0,
			g: this.$0,
			TU: this.k3,
			jJ: R,
			x7: G
		};
		else J.data = {
			a: 0,
			g: this.$0,
			TU: this.k3,
			jJ: R,
			x7: f.Pq.a31(this.$0, d.x, d.y)
		};
		J.data.aoK = M;
		l.pushHistoryState(J);
		this.track(M)
	}
};
f.Pq.a31 = function(l, d, G) {
	var b = [];
	for (var A = 0; A < l.length; A++) b.push(d, G);
	return b
};
f.Pq._P = function(l, d, G, b, V) {
	f.Pq.W9(l, d, G, f.Pq.a31(d, b, V))
};
f.Pq.W9 = function(l, d, G, b, V) {
	if (d.length == 0) return;
	if (G == null) {
		G = [];
		for (var A = 0; A < d.length; A++) {
			G.push(l.B[d[A]].fV(l, !0))
		}
	}
	var Q = new Rect,
		t = new Rect(0, 0, l.m, l.n);
	for (var A = 0; A < d.length; A++) {
		var I = b[2 * A],
			y = b[2 * A + 1];
		if (V) {
			I = -I;
			y = -y
		}
		var e = l.B[d[A]],
			M = G[A];
		if (e.add.fxrp && (M.indexOf(0) != -1 || e.VF())) e.add.fxrp.offset(I, y);
		for (var R = 0; R < M.length; R++) {
			var J = M[R];
			if (J == 0) {
				e.rect.offset(I, y);
				if (e.aW() && e.vZ(l)) e.vZ(l).rect.offset(I, y);
				if (e.add.artb) {
					var n = e.dA();
					n.offset(I, y);
					e.P3(n);
					var r = e.add.artb.guideIndeces;
					r = r ? r.v : [];
					for (var T = 0; T < r.length; T++) {
						var j = l.qz[r[T].v];
						j[1] += j[0] == 0 ? I : y
					}
				}
				if (e.add.TySh) {
					e.add.TySh.D.translate(I, y);
					if (e.add.TySh.add) {
						e.add.TySh.add.vmsk.offset(I, y)
					}
				}
				if (e.add.SoLd) {
					var g = new Matrix2D(1, 0, 0, 1, I, y),
						Y = e.add.SoLd,
						k = f.NH.DO(Y.Trnf),
						F = f.NH.DO(Y.nonAffineTransform);
					PixelUtil.vec.transformCoords(k, g, k);
					PixelUtil.vec.transformCoords(F, g, F);
					Y.Trnf = f.NH.gx(k);
					Y.nonAffineTransform = f.NH.gx(F);
					f.NH.asF(Y, g)
				}
			}
			if (J == 1) e.c3().rect.offset(I, y);
			if (J == 2) {
				e.add.vmsk.offset(I, y);
				if (e.add.vogk) PixelUtil.X.D(e.add.vogk, [1, 0, I, 0, 1, y, 0, 0], []);
				if (e.hD.EH) {
					var D = e.hD.EH.or.C;
					PixelUtil.vec.transformCoords(D, new Matrix2D(1, 0, 0, 1, I, y), D)
				}
			}
			if (J == 3) {
				e.vZ(l).z.rect.offset(I, y);
				if (M.length == 1) e.U()
			}
		}
		if (M.length > 0) {
			var q = e.add.GdFl;
			if (q == null) q = e.add.PtFl;
			if (e.VF() && !e.WS() && e.add.vmsk != null && PixelUtil.path.XP(e.add.vmsk.i) && e.add.vmsk.Al == 255 && (q == null || q.Algn && q.Algn.v)) {
				e.rect.offset(I, y)
			} else e.QJ(l);
			var H = l.root.H5(e.VR(l), l, d[A]);
			if (e.add.artb) H = H.Cw(e.dA());
			Q = Q.Cw(H);
			H.offset(-I, -y);
			Q = Q.Cw(H);
			if (e._G() && e.z && e.z.color == 255) Q = Q.Cw(t);
			e.a79()
		}
	}
	l.U(PixelUtil.vec.f1(Q))
};
f.Pq.aqq = function(l, d) {
	var G = [];
	for (var A = 0; A < d.length; A++) {
		var b = l.B[d[A]];
		G.push(b.fV(l))
	}
	return G
};
f.Pq.If = function(l, d, G) {
	var b = {
			C: [],
			F: []
		},
		V = d.x + G[0],
		Q = d.y + G[1];
	if (G[2] != 1e9) {
		b.F.push("M", "L");
		var t = Q + d.n;
		if (G[4]) b.C.push(G[2], Math.min(Q, t, G[4][1]), G[2], Math.max(Q, t, G[4][1]));
		else b.C.push(G[2], Q, G[2], Q + d.n)
	}
	if (G[3] != 1e9) {
		b.F.push("M", "L");
		var I = V + d.m;
		if (G[5]) b.C.push(Math.min(V, I, G[5][0]), G[3], Math.max(V, I, G[5][0]), G[3]);
		else b.C.push(V, G[3], I, G[3])
	}
	if (b.C.length != 0) {
		l.I.Cj = b;
		l.uK = !0
	}
};
f.Pq.aM = function(l, d, G, b) {
	var V = f.Pq.aur(l, [
		[d.x],
		[d.y]
	], G, b);
	return new Point2D(d.x + V[0], d.y + V[1])
};
f.Pq.wA = function(l, d, G, b, V) {
	var Q = V == !0 ? 1 : .5,
		t = f.Pq.aur(l, [
			[d.x, d.x + Math.round(d.m * Q), d.x + d.m],
			[d.y, d.y + Math.round(d.n * Q), d.y + d.n]
		], G, b);
	return t
};
f.Pq.aur = function(l, d, G, b) {
	if (b == null) b = [!0, null, !0];
	var V = [0, 0, 1e9, 1e9, null, null];
	if (!G.gX) return V;
	var Q = JSON.parse(JSON.stringify(d));
	for (var t = 0; t < 2; t++) {
		var I = 1e9,
			y = d[t],
			e = 0,
			M = null;
		for (var R = 0; R < y.length; R++) {
			var J = f.Pq.aue(l, y[R], Q[1 - t][R], t, G, b),
				n = J[0];
			if (n != 1e9) Q[t][R] = n;
			if (n != 1e9 && Math.abs(n - y[R]) < Math.abs(I)) {
				I = n - y[R];
				e = n;
				M = J[1]
			}
		}
		if (I != 1e9) {
			V[t] = I;
			V[t + 2] = e;
			V[t + 4] = M
		}
	}
	return V
};
f.Pq.aue = function(l, d, G, b, V, Q) {
	var t = 1e9,
		I = null,
		y = V.v1,
		e = V.hq,
		M = [l.root];
	while (M.length != 0 && y[2]) {
		var R = M.pop(),
			J = R.j,
			n = J.rect;
		if (!J.zD()) continue;
		if (R.children)
			for (var A = 0; A < R.children.length; A++) M.push(R.children[A]);
		if (l.g.indexOf(R.index) != -1 || n.W6()) continue;
		var r = n.m,
			T = r >>> 1,
			j = n.n,
			g = j >>> 1,
			Y = t;
		if (b == 0) {
			if (Math.abs(n.x - d) < Math.abs(t - d)) t = n.x;
			if (Math.abs(n.x + T - d) < Math.abs(t - d)) t = n.x + T;
			if (Math.abs(n.x + r - d) < Math.abs(t - d)) t = n.x + r
		} else {
			if (Math.abs(n.y - d) < Math.abs(t - d)) t = n.y;
			if (Math.abs(n.y + g - d) < Math.abs(t - d)) t = n.y + g;
			if (Math.abs(n.y + j - d) < Math.abs(t - d)) t = n.y + j
		}
		if (Y != t) {
			I = [n.x + T, n.y + g]
		}
	}
	var k = t;
	t = 1e9;
	if (Q[0] && y[0] && e.qz && V.Wi) {
		var F = l.Ww(),
			D = F[0],
			q = F[1],
			H = l.bZ();
		for (var A = 0; A < D.length; A++)
			if ((q[A] == -1 || q[A] == H) && D[A][0] == b && Math.abs(D[A][1] - d) < Math.abs(t - d)) t = D[A][1]
	}
	if (y[1] && e.Sp && V.Wi) {
		var W = Math.round(PixelUtil.y0.Sw(e.rp, l.m7, l.m, e.v7));
		if (b == 1 && e.ra == 1) {
			var Z = G * .5 * Math.sqrt(4 / 3),
				B;
			W *= Math.sqrt(4 / 3);
			B = Math.round((d - Z) / W) * W + Z;
			if (Math.abs(B - d) < Math.abs(t - d)) t = B;
			B = Math.round((d + Z) / W) * W - Z;
			if (Math.abs(B - d) < Math.abs(t - d)) t = B
		} else {
			var B = Math.round(d / W) * W;
			if (Math.abs(B - d) < Math.abs(t - d)) t = B
		}
	}
	var a = l.Vp;
	if (y[3] && e.Vp && V.Wi && a.length != 0) {
		for (var A = 0; A < a.length; A++) {
			if (!Q[2] && l.Ci.indexOf(A) != -1) continue;
			var m = f.UA.LP(a, A);
			for (var p = 0; p < 3; p += 2)
				if (m[p + b] != d && Math.abs(m[p + b] - d) < Math.abs(t - d)) t = m[p + b]
		}
	}
	if (Q[1])
		for (var c = 0; c < Q[1].length; c++) {
			var n = Q[1][c],
				r = n.m,
				j = n.n,
				v = [n.x, n.y, n.x + (r >>> 1), n.y + (j >>> 1), n.x + r, n.y + j];
			for (var A = 0; A < 6; A += 2)
				if (Math.abs(v[A + b] - d) < Math.abs(t - d)) t = v[A + b]
		}
	if (y[4]) {
		var n = new Rect(0, 0, l.m, l.n),
			H = l.bZ();
		if (H != -1) n = l.B[H].dA();
		var r = n.m,
			j = n.n,
			v = [n.x, n.y, n.x + (r >>> 1), n.y + (j >>> 1), n.x + r, n.y + j];
		for (var A = 0; A < 6; A += 2)
			if (Math.abs(v[A + b] - d) < Math.abs(t - d)) t = v[A + b]
	}
	if (Math.abs(t - d) <= Math.abs(k - d)) I = null;
	else t = k;
	var i = Math.abs(t - d) <= 4 * window.devicePixelRatio / l.u.N ? t : 1e9;
	return [i, I]
};
// Magic Wand Tool
f.xB = function() {
	f.GS.call(this, "Magic Wand", f.we, "tools/mwand");
	this._j = null
};
f.xB.prototype = new f.GS;
f.xB.prototype.v2 = f.GS.prototype.a8O;
f.xB.prototype.j6 = f.GS.prototype.a6m;
f.xB.prototype.JO = function(l, d, G, b) {
	this._j = b;
	this.avC = this.HS.wconf[0];
	this.finish(l, d, G, b)
};
f.xB.prototype.D2 = function(l, d, G, b, V) {
	if (!b.oW) return;
	var Q = new Action(ActionTypes.E.v);
	Q.G = f.lv;
	Q.data = {
		a: "h_stepbck"
	};
	V.dispatch(Q);
	var t = b.x - this._j.x,
		I = Math.max(0, Math.min(255, Math.round(this.avC + t / 4)));
	this.HS.wconf[0] = I;
	this.FJ(V);
	this.finish(l, d, G, this._j)
};
f.xB.prototype.qd = function(l, d, G, b, V) {
	this.HS.wconf[0] = this.avC;
	this.FJ(V)
};
f.xB.prototype.getSelection = function(l, d, G, b) {
	var V = this.Xm;
	V = l.u.Zx(b.x, b.y);
	var Q = f.GS.aoq(new Point2D(Math.floor(V.x), Math.floor(V.y)), this.HS.wconf, this.HS.sall);
	return Q
};
f.xB.a4n = function(l, d, G, b, V) {
	if (d.x < 0 || d.x > l.m || d.y < 0 || d.y > l.n) return null;
	var Q, t = new Rect(0, 0, l.m, l.n);
	if (b) Q = l.LT();
	else {
		var I = l.g.length,
			e = null;
		if (I != 1) {
			alert(I == 0 ? "No layer selected." : "More than one layer selected.");
			return null
		}
		var y = l.B[l.g[0]];
		if (V) e = y.ht <= 0 ? null : y.ht == 1 ? y.c3() : y.vZ(l).z;
		if (e == null && y.add.lsct != null && y.add.lsct != LayerSectionType.none) {
			alert("No layer selected.");
			return null
		}
		if (e == null && t.XB(y.rect)) Q = y.buffer;
		else {
			Q = PixelUtil.allocBytes(t.O() * 4);
			if (e == null) PixelUtil.blitRgbaRect(y.buffer, y.rect, Q, t);
			else f.BrushToolBase.JW(e.channel, e.rect, e.color, Q, t)
		}
	}
	var M = f.xB.qe(Q, t, d, null, G),
		R = PixelUtil.tightBoundsFromGray(M, t),
		J = PixelUtil.allocBytes(R.O());
	PixelUtil.copyBufferRect(M, t, J, R);
	return {
		rect: R,
		channel: J
	}
};
f.xB.lu = function(l, d, G) {
	var b = d.m,
		V = d.n,
		t = 0,
		I = 0,
		y = 0,
		e = 0;
	l = new Uint32Array(l.buffer);
	var Q = [],
		M = G.length;
	for (var A = 0; A < M; A++) {
		var R = G[A],
			J = Math.round(R.x - .5 - d.x),
			n = Math.round(R.y - .5 - d.y);
		J = Math.max(0, Math.min(b - 1, J));
		n = Math.max(0, Math.min(V - 1, n));
		var r = n * b + J,
			T = l[r];
		Q.push([T & 255, T >> 8 & 255, T >> 16 & 255, T >>> 24])
	}
	return Q
};
f.xB.qe = function(l, d, G, b, V) {
	l = new Uint32Array(l.buffer);
	var Q = d.m,
		t = d.n,
		I = Q * t;
	if (b == null) b = f.xB.lu(l, d, [G]);
	var y = Math.round(G.x - .5 - d.x),
		e = Math.round(G.y - .5 - d.y),
		M = e * Q + y,
		R = Date.now(),
		J = PixelUtil.allocBytes(Q * t),
		n = V[0],
		r = 1 / n,
		T = V[1] && n > 0 ? 255 : 0;
	if (V[2]) {
		var j = PixelUtil.allocBytes(J.length),
			g = new Uint32Array(I),
			Y = 1;
		g[0] = y << 16 | e;
		j[M] = 1;
		while (Y > 0) {
			var k = g[Y - 1];
			Y--;
			var F = k >>> 16,
				D = k & 65535,
				A = D * Q + F,
				q = f.xB.CT(l[A], b);
			if (q > n) {
				var H = T * (1 - Math.max(0, Math.min(1, (q - n) * r)));
				J[A] = ~~H
			} else {
				J[A] = 255;
				if (D != t - 1 && j[A + Q] == 0) {
					g[Y++] = F << 16 | D + 1;
					j[A + Q] = 1
				}
				if (D != 0 && j[A - Q] == 0) {
					g[Y++] = F << 16 | D - 1;
					j[A - Q] = 1
				}
				if (F != Q - 1 && j[A + 1] == 0) {
					g[Y++] = F + 1 << 16 | D;
					j[A + 1] = 1
				}
				if (F != 0 && j[A - 1] == 0) {
					g[Y++] = F - 1 << 16 | D;
					j[A - 1] = 1
				}
			}
		}
	} else {
		for (var A = 0; A < I; A++) {
			var q = f.xB.CT(l[A], b);
			if (q <= n) J[A] = 255
		}
		for (var D = 0; D < t; D++)
			for (var F = 0; F < Q; F++) {
				var A = D * Q + F;
				if (J[A] == 0 && (F > 0 && (J[A - 1] == 255 || D > 0 && J[A - Q - 1] == 255 || D < t - 1 && J[A + Q - 1] == 255) || F < Q - 1 && (J[A + 1] == 255 || D > 0 && J[A - Q + 1] == 255 || D < t - 1 && J[A + Q + 1] == 255) || D > 0 && J[A - Q] == 255 || D < t - 1 && J[A + Q] == 255)) {
					var q = f.xB.CT(l[A], b),
						H = T * (1 - Math.max(0, Math.min(1, (q - n) * r)));
					J[A] = ~~H
				}
			}
	}
	return J
};
f.xB.CT = function(l, d) {
	var G = d.length,
		b = f.xB.acI(l, d[0]),
		A = 1;
	while (A != G) {
		b = Math.min(b, f.xB.acI(l, d[A]));
		A++
	}
	return b
};
f.xB.acI = function(l, d) {
	var G = l & 255,
		b = l >>> 8 & 255,
		V = l >>> 16 & 255,
		Q = l >>> 24 & 255;
	if (d[3] == 0) return Q < 5 ? 0 : 255;
	var t = Math.max(Math.abs(G - d[0]), Math.max(Math.abs(b - d[1]), Math.abs(V - d[2])));
	return Q == 0 ? 255 : t
};
// Content-Aware Move / Patch tool base class
f.zj = function(l, d) {
	if (d) f.BrushToolBase.call(this);
	else if (l) f.BrushToolBase.call(this, "Content-Aware Move Tool", f.gg, "tools/camove");
	else f.BrushToolBase.call(this, "Patch Tool", f.aH, "tools/patch");
	this.wT = null;
	this.EH = null;
	this.R = null;
	this.sw = null;
	this.gI = new Point2D;
	this.Xr = null;
	this.lC = null
};
f.zj.prototype = new f.BrushToolBase;
f.zj.prototype.dJ = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y);
	if (l.P && PixelUtil.pointInMask(Q, l.P.channel, l.P.rect)) {
		var t = new Rect(0, 0, l.m, l.n),
			I = t.wD(l.P.rect);
		if (!l.T8() || I.W6()) return;
		if (!0) {
			var y = PixelUtil.allocBytes(I.O());
			PixelUtil.copyBufferRect(l.P.channel, l.P.rect, y, I);
			l.P = {
				channel: y,
				rect: I
			}
		}
		this.Y6(l);
		this.rY(l);
		this.sw = Q;
		this.gI = new Point2D(Q.x - l.P.rect.x, Q.y - l.P.rect.y);
		this.lC = PixelUtil.allocBytes(l.P.rect.O() * 4);
		this.lC.fill(255);
		if (this.HS.patch == 1) {
			var e = l.B[l.g[0]];
			e.Ep(l, l.P, !0);
			if (e.IB == null) this.sw = null
		}
		this.Xr = l.P.rect.clone()
	} else {
		this.EH = {
			C: [Q.x, Q.y],
			F: ["M"]
		};
		this.wT = Q
	}
};
f.zj.prototype.JP = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y);
	if (this.sw) {
		if (this.HS.patch == 1) {
			if (l.FB.length == 0) {
				var t = l.B[l.g[0]].IB,
					I = Q.x - this.gI.x,
					y = Q.y - this.gI.y;
				f.Pq.nL(l, l.g[0], Math.round(I - t.cG.x), Math.round(y - t.cG.y))
			}
		} else this.auQ(l, Q, "clone")
	}
	if (this.wT) {
		this.EH.F.push("L");
		this.EH.C.push(Q.x, Q.y);
		this.wT = Q;
		l.I.Bt = this.EH;
		l.uK = !0
	}
};
f.zj.prototype.Nl = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y);
	if (this.sw) {
		var t = l.P.rect.clone();
		if (this.id == f.gg) {
			var I = l.B[l.g[0]];
			I.A6(l, I.IB);
			l.P.rect = this.Xr.clone();
			var y = PixelUtil.allocBytes(l.P.rect.O() * 4);
			PixelUtil.writeChannelToRgba(l.P.channel, y, 3);
			this.E5(l, "sheal", y, l.P.rect, l.P.rect);
			l.P.rect = t;
			t = t.Cw(this.Xr)
		}
		this.auQ(l, Q, "heal");
		this.finish(l, t, null, null, !0);
		l.U(t);
		this.sw = null
	}
	if (this.wT) {
		var e = f.GS.Wg(this.HS.setop, b.l(KeyboardHandler.Zz), b.l(KeyboardHandler.Jm)),
			M = new Action(ActionTypes.E.g5, !0);
		if (this.EH.C.length <= 4) M.data = f.GS.Cc();
		else M.data = f.GS.TW(this.EH.C, e);
		d.dispatch(M);
		this.wT = null;
		l.I.Bt = null;
		l.uK = !0
	}
};
f.zj.prototype.t3 = function() {
	return this.R
};
f.zj.prototype.A0 = function(l, d, G, b, V) {
	f.BrushToolBase.prototype.A0.call(this, l, d, G, b, V);
	this.ed(V, b)
};
f.zj.prototype.ed = function(l, d) {
	var G = "auto;";
	if (d != null && d.l(KeyboardHandler.Zz) && !d.l(KeyboardHandler.Jm) || this.HS.setop == "union") G = "copy";
	var b = new Action(ActionTypes.E.L, !0);
	b.data = {
		a: ActionTypes.$.e5,
		ew: G
	};
	if (this.caller) this.caller.dispatch(b)
};
f.zj.prototype.auQ = function(l, d, G) {
	var b = new Point2D(Math.round(this.sw.x - d.x), Math.round(this.sw.y - d.y));
	if (this.HS.patch == 1) b.T6(-b.x, -b.y);
	this.R = b;
	this.E5(l, G, this.lC, l.P.rect, l.P.rect);
	this.U(l, l.P.rect)
};
// Patch Tool (content-aware fill)
f.a99 = function() {
	f.zj.call(this, !0);
	this.HS.patch = 1
};
f.a99.prototype = new f.zj(!0, !0);
// Paint Bucket Tool
f.ym = function() {
	f.BrushToolBase.call(this, "Paint Bucket Tool", f.ahd, "tools/pbucket");
	this.nt = !1
};
f.ym.prototype = new f.BrushToolBase;
f.ym.prototype.enable = function(l, d, G, b) {
	var V = new Action(ActionTypes.E.L, !0);
	V.data = {
		a: ActionTypes.$.e5,
		ew: "default"
	};
	d.dispatch(V)
};
f.ym.prototype.BM = function(l, d) {};
f.ym.prototype.dJ = function(l, d, G, b, V) {
	this.nt = !0
};
f.ym.prototype.Nl = function(l, d, G, b, V, Q) {
	var t = this.nt;
	this.nt = !1;
	if (!t || Q) return;
	if (this.I4(b, d, V)) return;
	if (!l.T8()) return;
	var I = l.u.Zx(V.x, V.y),
		y = f.xB.a4n(l, I, this.HS.wconf, this.HS.sall, !0);
	if (y == null) return;
	var e = PixelUtil.allocBytes(y.rect.O() * 4);
	PixelUtil.andMaskUint32(e, (G.Y7 & 255) << 16 | (G.Y7 >> 8 & 255) << 8 | (G.Y7 >> 16 & 255) << 0);
	PixelUtil.writeChannelToRgba(y.channel, e, 3);
	this.Y6(l);
	this.E5(l, "draw", e, y.rect, y.rect);
	this.U(l, y.rect);
	this.finish(l, y.rect)
};
// Polygonal Lasso Select Tool
f.Pc = function() {
	f.GS.call(this, "Polygonal Lasso Select", f.abn, "tools/plasso");
	this.sK = "crosshair";
	this.WR = [];
	this.EJ = null;
	this.EH = null;
	this.a3w = 0
};
f.Pc.prototype = new f.GS;
f.Pc.prototype.disable = function(l, d, G, b) {
	this.gC(l)
};
f.Pc.prototype.JO = function(l, d, G, b) {
	this.WR = [KeyboardHandler.HD, KeyboardHandler.kJ]
};
f.Pc.prototype.oH = function(l) {
	return this.WR.indexOf(l) != -1
};
f.Pc.prototype.Q0 = function(l) {
	return this.EH != null
};
f.Pc.prototype.jc = function() {
	return this.EH != null
};
f.Pc.prototype.in = function() {
	return this.EH != null
};
f.Pc.prototype.D2 = function(l, d, G, b) {
	if (this.EH == null) return;
	var V = this.EH,
		Q = V.C,
		t = Q.length - 2,
		I = this.Xm;
	if (this.ph.bP(1) && G.l(KeyboardHandler.Jm) && b.oW) {
		Q.push(0, 0);
		V.F.push("L");
		t += 2
	} else if (G.l(KeyboardHandler.Zz)) I = f.RK.cR(new Point2D(Q[t - 2], Q[t - 1]), I);
	Q[t] = I.x;
	Q[t + 1] = I.y;
	l.I.Bt = V;
	l.uK = !0
};
f.Pc.prototype.qd = function(l, d, G, b) {
	var V = Date.now();
	if (this.EH == null) this.EH = {
		C: [this.Xm.x, this.Xm.y, this.Xm.x, this.Xm.y],
		F: ["M", "L"]
	};
	else {
		this.D2(l, d, G, b);
		if (V - this.a3w < 250 || Point2D.yZ(this.Xm, new Point2D(this.EH.C[0], this.EH.C[1])) < f.Jo(l, b)) {
			this.EJ = this.EH;
			this.finish(l, d, G, b);
			this.gC(l);
			return
		}
		this.EH.F.push("L");
		this.EH.C.push(this.Xm.x, this.Xm.y)
	}
	this.a3w = V;
	l.I.Bt = this.EH
};
f.Pc.prototype.gC = function(l) {
	this.EH = null;
	this.WR = [];
	if (l != null) {
		l.I.Bt = null;
		l.uK = !0
	}
};
f.Pc.prototype.o9 = function(l, d, G, b) {
	f.GS.prototype.o9.call(this, l, d, G, b);
	if (b.l(KeyboardHandler.mp) && this.EH == null && this.EJ && l.P != null) {
		var V = new Action(ActionTypes.E.v);
		V.G = f.lv;
		V.data = {
			a: "h_stepbck"
		};
		d.dispatch(V);
		this.JO(l, G, b, null);
		this.EH = this.EJ;
		return
	}
	if (this.EH == null) return;
	if (b.l(KeyboardHandler.HD) || b.l(KeyboardHandler.kJ)) {
		this.EH.C.pop();
		this.EH.C.pop();
		this.EH.F.pop();
		this.D2(l, G, b)
	}
	if (b.l(KeyboardHandler.lm)) {
		if (this.EH.C.length > 4) {
			this.EJ = this.EH;
			this.finish(l, G, b)
		}
		this.EH = null
	}
	if (b.l(KeyboardHandler.mp)) {
		this.EH = null
	}
	l.I.Bt = this.EH;
	l.uK = !0
};
f.Pc.prototype.getSelection = function(l, d, G, b) {
	return f.GS.TW(this.EH.C, null, this.HS.anta)
};
// Magnetic Lasso Select Tool
f.uu = function() {
	f.GS.call(this, "Magnetic Lasso Select", f.avT, "tools/mlasso");
	this.sK = "crosshair";
	this.WR = [];
	this.i = [];
	this.Ve = [];
	this.Jj = [];
	this.$P = null;
	this.ge = null;
	this.PU = null;
	this.vE = 0;
	this.WV = 0
};
f.uu.prototype = new f.GS;
f.uu.prototype.disable = function(l, d, G, b) {
	this.clear(l)
};
f.uu.prototype.Q0 = function(l) {
	return this.i.length != 0
};
f.uu.prototype.in = function() {
	return this.i.length != 0
};
f.uu.prototype.oH = function(l) {
	return this.WR.indexOf(l) != -1
};
f.uu.prototype.JO = function(l, d, G, b) {
	this.WR = [KeyboardHandler.HD, KeyboardHandler.kJ];
	var V = this.Z9(this.B0, l);
	if (this.i.length != 0 && (Point2D.yZ(V, this.i[0]) < f.Jo(l, b) || Date.now() - this.vE < 300)) {
		this.ds(l, this.i[0]);
		this.finish(l, d, G);
		this.clear(l);
		return
	}
	this.vE = Date.now();
	if (this.i.length != 0) V = this.ea(V, l);
	else {
		var Q = l.m,
			t = l.n,
			I = PixelUtil.allocBytes(Q * t),
			y = l.LT(),
			e = Q * t * 4;
		for (var A = 0; A < e; A += 4) I[A >>> 2] = ~~(.5 + PixelUtil.luminanceRgb(y[A], y[A + 1], y[A + 2]) * (y[A + 3] * (1 / 255)));
		this.$P = PixelUtil.kp.adD(I, Q, t);
		this.PU = new Uint16Array(I.length)
	}
	this.ds(l, V);
	this.WV = G.l(KeyboardHandler.Jm) ? 1 : 0;
	this.LO(l)
};
f.uu.prototype.ds = function(l, d) {
	var G = this.i;
	this.Ve[G.length] = this.Jj.length;
	if (G.length != 0) {
		PixelUtil.kp.Ev(this.ge, d.y * l.m + d.x);
		var b = this.n2(l, d);
		b.reverse();
		var V = f.uu.ae4(l, b);
		this.Jj = this.Jj.concat(V)
	}
	G.push(d);
	this.aal(l)
};
f.uu.prototype.aal = function(l) {
	var d = this.i[this.i.length - 1],
		G = d.y * l.m + d.x;
	this.ge = PixelUtil.kp.amf(this.$P.q5, this.$P._Z, G);
	this.PU.fill(0)
};
f.uu.prototype.Z9 = function(l, d) {
	return new Point2D(Math.floor(Math.max(0, Math.min(d.m - 1, l.x))), Math.floor(Math.max(0, Math.min(d.n - 1, l.y))))
};
f.uu.prototype.clear = function(l) {
	this.Jj = [];
	this.i = [];
	this.Ve = [];
	this.$P = null;
	this.ge = null;
	this.PU = null;
	if (l != null) {
		l.I.Bt = null;
		l.I.jf = [];
		l.uK = !0
	}
	this.WR = []
};
f.uu.prototype.D2 = function(l, d, G, b) {
	var V = this.i,
		Q = V.length;
	if (Q == 0) return;
	var t = this.ea(this.Z9(this.Xm, l), l),
		I = this.n2(l, t);
	for (var A = 0; A < I.length; A++) {
		var y = I[A],
			e = new Point2D(y % l.m, Math.floor(y / l.m));
		if (this.PU[y] > 30 && Point2D.yZ(e, V[Q - 1]) > 20) {
			this.ds(l, e);
			return
		}
		this.PU[y]++
	}
	if (this.WV == 1 && b.oW) this.ds(l, t);
	this.LO(l)
};
f.uu.prototype.LO = function(l) {
	var d = this.i;
	if (d.length != 0) {
		var G = this.ea(this.Z9(this.Xm, l), l),
			b = this.n2(l, G);
		b.reverse();
		var V = f.uu.ae4(l, b),
			Q = this.Jj.concat(V),
			t = l.I.Bt = {
				C: Q,
				F: ["M"]
			};
		for (var A = 2; A < Q.length; A += 2) t.F.push("L")
	}
	l.I.jf = [];
	for (var A = 0; A < d.length; A++) l.I.jf.push(d[A].x + .5, d[A].y + .5);
	l.uK = !0
};
f.uu.prototype.qd = function(l, d, G, b) {};
f.uu.prototype.o9 = function(l, d, G, b) {
	if (this.i.length == 0) return;
	if (b.l(KeyboardHandler.HD) || b.l(KeyboardHandler.kJ)) {
		this.i.pop();
		this.Jj = this.Jj.slice(0, this.Ve[this.i.length]);
		this.Ve.pop();
		if (this.i.length == 0) this.clear(l);
		else this.aal(l);
		this.LO(l)
	}
	if (b.l(KeyboardHandler.lm)) {
		var V = this.Z9(this.Xm, l);
		this.ds(l, V);
		this.finish(l, G, b);
		this.clear(l)
	}
	if (b.l(KeyboardHandler.mp)) {
		this.clear(l)
	}
};
f.uu.prototype.getSelection = function(l, d, G, b) {
	return f.GS.TW(this.Jj, null, this.HS.anta)
};
f.uu.prototype.n2 = function(l, d) {
	var G = this.i[this.i.length - 1],
		b = G.y * l.m + G.x,
		V = d.y * l.m + d.x;
	if (this.WV == 1) return [V, b];
	var Q = [V];
	while (V != b) {
		V = this.ge.GN[V];
		Q.push(V);
		if (Q.length > 5e3) {
			console.log(Q);
			throw "e"
		}
	}
	return Q
};
f.uu.ae4 = function(l, d) {
	var G = [],
		b = l.m;
	for (var A = 0; A < d.length; A++) {
		var V = d[A];
		G.push(V % b + .5, Math.floor(V / b) + .5)
	}
	return G
};
f.uu.prototype.ea = function(l, d) {
	var G = d.m,
		b = d.n,
		V = l.clone(),
		t = 3;
	PixelUtil.kp.Ev(this.ge, l.y * G + l.x);
	var Q = this.ge.mF[l.y * G + l.x];
	for (var I = -t + 1; I < t; I++)
		for (var y = -t + 1; y < t; y++) {
			var e = l.x + y,
				M = l.y + I;
			if (e < 0 || e >= G || M < 0 || M >= b) continue;
			PixelUtil.kp.Ev(this.ge, M * G + e);
			if (this.ge.mF[M * G + e] < Q) V.T6(e, M)
		}
	return V
};
f.C$ = function() {
	f.AbstractTool.call(this, "Ruler", f.e7, "tools/ruler");
	this.JG = null;
	this.ES = null;
	this.FC = null;
	this.D8 = null;
	this.DG = null
};
f.C$.prototype = new f.AbstractTool;
f.C$.prototype.Q0 = function(l) {
	return l.oW
};
f.C$.prototype.enable = function(l, d, G, b) {
	f.AbstractTool.prototype.enable.call(this, l, d, b, G);
	if (l) this.Tr(l)
};
f.C$.prototype.disable = function(l, d, G, b) {
	if (l) this.gC(l)
};
f.C$.prototype.TA = function(l, d, G, b, V) {
	this.JG = this.FC = null;
	this.Tr(G)
};
f.C$.prototype.dJ = function(l, d, G, b, V) {
	var Q = f.Jo(l, V),
		t = l.u.Zx(V.x, V.y);
	t.x = Math.round(t.x);
	t.y = Math.round(t.y);
	var I = this.JG;
	this.ES = I ? I.slice(0) : null;
	var y = I && Point2D.yZ(t, I[0]) < Q,
		e = I && Point2D.yZ(t, I[1]) < Q,
		M = I && I[2] && Point2D.yZ(t, I[2]) < Q;
	if (y || e || M) {
		if (b.l(KeyboardHandler.Jm) && I.length == 2) {
			if (e) {
				var R = I[0];
				I[0] = I[1];
				I[1] = R
			}
			I[2] = I[0].clone();
			this.FC = [2]
		} else this.FC = [y ? 0 : e ? 1 : 2]
	} else if (I && f.C$.atB(I[0], I[1], t) < Q && Math.min(I[0].x, I[1].x) - 5 <= t.x && t.x <= Math.max(I[0].x, I[1].x) + 5 && Math.min(I[0].y, I[1].y) - 5 <= t.y && t.y <= Math.max(I[0].y, I[1].y) + 5) {
		this.FC = [];
		this.DG = [];
		for (var A = 0; A < I.length; A++) {
			this.FC.push(A);
			this.DG.push(I[A].clone())
		}
		this.D8 = t
	} else {
		this.JG = [t.clone(), t.clone()];
		this.FC = [1]
	}
};
f.C$.prototype.JP = function(l, d, G, b, V) {
	if (this.FC == null) return;
	var Q = this.JG,
		t = this.FC,
		I = l.u.Zx(V.x, V.y);
	I.x = Math.round(I.x);
	I.y = Math.round(I.y);
	if (t.length > 1) {
		var y = I.x - this.D8.x,
			e = I.y - this.D8.y;
		for (var A = 0; A < Q.length; A++) {
			Q[A] = this.DG[A].clone();
			Q[A].offset(y, e)
		}
	} else {
		Q[t[0]].T6(I.x, I.y);
		if (b.l(KeyboardHandler.Zz)) {
			Q[t[0]] = f.RK.cR(Q[1 - t[0]], Q[t[0]])
		}
	}
	this.Tr(l);
	this.rv(d, ActionTypes.E.L, {
		a: ActionTypes.$.vq,
		G: this.id,
		afz: Q[0],
		xJ: Q[1],
		LB: Q[2],
		m7: l.m7,
		am2: l.m
	});
	l.u.M9 = PixelUtil.vec.flattenPath([Q[0].x, Q[0].y, Q[1].x, Q[1].y]);
	console.log(l.u.M9)
};
f.C$.prototype.Nl = function(l, d, G, b, V, Q) {
	this.FC = null;
	if (Q) {
		this.JG = this.ES.slice(0);
		this.Tr(l)
	}
};
f.C$.prototype.rv = function(l, d, G) {
	var b = new Action(d, !0);
	b.data = G;
	l.dispatch(b)
};
f.C$.prototype.Tr = function(l) {
	var d = this.JG;
	if (d == null) this.gC(l);
	else {
		var G = [d[1].x, d[1].y, d[0].x, d[0].y],
			b = ["M", "L"];
		if (d.length > 2) {
			G.push(d[2].x, d[2].y);
			b.push("L")
		}
		l.I.Bt = {
			F: b,
			C: G
		};
		l.I.jf = G
	}
	l.uK = !0
};
f.C$.prototype.gC = function(l) {
	l.I.Bt = null;
	l.I.jf = []
};
f.C$.atB = function(l, d, G) {
	var b = d.x - l.x,
		V = d.y - l.y,
		Q = Math.abs(V * G.x - b * G.y + d.x * l.y - d.y * l.x),
		t = Math.sqrt(b * b + V * V);
	return t == 0 ? 0 : Q / t
};
// Sharpen Tool
f.vL = function() {
	f.BrushToolBase.call(this, "Sharpen Tool", f.tf, "tools/sharpen");
	this.yr = "copy"
};
f.vL.prototype = new f.BrushToolBase;
f.vL.prototype.dJ = function(l, d, G, b, V) {
	var Q = this.HS.pdetail ? iU.wB : iU.tf;
	if (b.l(KeyboardHandler.Jm)) Q = iU.Yx;
	this.Us(l, G, b, V, this.HS.strn, Q);
	if (this.CR == null) return;
	this.zX(l)
};
f.vL.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Spot Healing Brush Tool
f.WE = function() {
	f.BrushToolBase.call(this, "Spot Healing Brush Tool", f.vC, "tools/shbrush");
	this.yr = "draw";
	this.HS.opacity = .5
};
f.WE.prototype = new f.BrushToolBase;
f.WE.prototype.dJ = function(l, d, G, b, V) {
	this.Us(l, G, b, V, 1);
	if (this.CR == null) return;
	this.rY(l);
	this.zX(l)
};
f.WE.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
f.WE.prototype.Nl = function(l, d, G, b, V) {
	if (this.CR == null) return;
	this.E5(l, "sheal", this.CR.XI(), this.CR.Pa(), this.CR.Y2(), null);
	this.U(l, this.CR.Y2());
	f.BrushToolBase.prototype.Nl.call(this, l, d, G, b, V)
};
// Smudge Tool
f.zB = function() {
	f.BrushToolBase.call(this, "Smudge Tool", f.K1, "tools/smudge");
	this.yr = "copy"
};
f.zB.prototype = new f.BrushToolBase;
f.zB.prototype.dJ = function(l, d, G, b, V) {
	this.Us(l, G, b, V, this.HS.strn, iU.K1);
	if (this.CR == null) return;
	this.zX(l)
};
f.zB.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Zoom Tool (zoom in)
f.gw = function() {
	f.BrushToolBase.call(this, "Sponge Tool", f.GX, "tools/sponge");
	this.yr = "sponge"
};
f.gw.prototype = new f.BrushToolBase;
f.gw.prototype.dJ = function(l, d, G, b, V) {
	this.Us(l, G, b, V, this.HS.flow);
	if (this.CR == null) return;
	this.zX(l)
};
f.gw.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	this.$i(l, G, b, V);
	this.zX(l)
};
// Zoom Tool (zoom out)
f.gU = function() {
	f.AbstractTool.call(this, "Zoom Tool", f.t7, "tools/zoom");
	this.hI = !1;
	this.K$ = !0;
	this.In = !1;
	this.pm = 0;
	this.JT = null;
	this.Oh = null;
	this.lU = 0;
	this.e6 = null;
	this.ahm = 0;
	// this.pz = new ContextPanel([{
	// 	name: [8, 0],
	// 	C0: "Ctrl + +"
	// }, {
	// 	name: [8, 1],
	// 	C0: "Ctrl + -",
	// 	xX: !0
	// }, {
	// 	name: [20, 3],
	// 	C0: "Ctrl + 0"
	// }, {
	// 	name: ["VAR0: 100%", [20, 2]],
	// 	C0: "Ctrl + 1"
	// }], [{
	// 	Y: ActionTypes.E.v,
	// 	G: f.t7,
	// 	W: {
	// 		a: "zoom",
	// 		K$: !0
	// 	}
	// }, {
	// 	Y: ActionTypes.E.v,
	// 	G: f.t7,
	// 	W: {
	// 		a: "zoom",
	// 		K$: !1
	// 	}
	// }, {
	// 	Y: ActionTypes.E.v,
	// 	G: f.t7,
	// 	W: {
	// 		a: "adapt",
	// 		Z: "fitscr"
	// 	}
	// }, {
	// 	Y: ActionTypes.E.v,
	// 	G: f.t7,
	// 	W: {
	// 		a: "adapt",
	// 		Z: "pixel"
	// 	}
	// }])
};
f.gU.prototype = new f.AbstractTool;
f.gU.prototype.h_ = function(l, d, G, b, V) {
	var Q = this.pz;
	Q.refresh();
	Q.parent = d;
	Q.update(l, G);
	var t = new Action(ActionTypes.E.L, !0);
	t.data = {
		a: ActionTypes.$.dY,
		A3: Q,
		x: V.pf + 2,
		y: V.pi + 1
	};
	d.dispatch(t)
};
f.gU.prototype.enable = function(l, d, G, b) {
	this.AA(d, b);
	if (l && Date.now() - this.pm < 300) this.TA({
		a: "adapt",
		Z: "pixel"
	}, d, l, b, G);
	this.pm = Date.now()
};
f.gU.prototype.dJ = function(l, d, G, b, V) {
	this.Oh = new Point2D(V.x, V.y);
	this.lU = l.u.N;
	this.e6 = l.u.R.clone()
};
f.gU.prototype.JP = function(l, d, G, b, V) {
	if (this.Oh == null) return;
	var Q = Math.exp(Math.log(this.lU) + (V.x - this.Oh.x) / 64);
	Q = Math.max(.02, Math.min(f.gU.QU[0], Q));
	l.u.N = this.lU;
	l.u.R = this.e6.clone();
	this.TA({
		a: "zoom",
		N: Q,
		OJ: this.Oh,
		In: this.In
	}, d, l, b, G)
};
f.gU.prototype.Nl = function(l, d, G, b, V) {
	if (Point2D.yZ(this.Oh, V) < 4) {
		var Q = this.axx(b);
		this.TA({
			a: "zoom",
			K$: Q,
			OJ: V,
			In: this.In
		}, d, l, b, G)
	}
	this.Oh = null
};
f.gU.QU = [128, 64, 32, 16, 12, 8, 6, 5, 4, 3, 2, 1, 2 / 3, 1 / 2, 1 / 2 * (2 / 3), 1 / 4, 1 / 4 * (2 / 3), 1 / 8, 1 / 8 * (2 / 3), 1 / 16, 1 / 16 * (2 / 3), 1 / 32, 1 / 32 * (2 / 3), 1 / 64];
f.gU.agP = function(l, d, G, b) {
	var V = 1;
	while (l * V * 1 / 2 > G || d * V * 1 / 2 > b) V *= 1 / 2;
	if (l * V * 2 / 3 > G || d * V * 2 / 3 > b) V *= 1 / 2;
	else if (l * V > G || d * V > b) V *= 2 / 3;
	return V
};
f.gU.asX = function(l, d) {
	var G = f.gU.a6z(l);
	if (d && G == 0) return l;
	if (!d && G == f.gU.QU.length - 1) return l;
	return f.gU.QU[d ? G - 1 : G + 1]
};
f.gU.a6z = function(l) {
	var d = 0;
	while (f.gU.QU[d] > l) d++;
	return d
};
f.gU.p8 = function(l, d, G, b) {
	var V = l.Kv;
	if (b == 0 || b == null) {
		b = f.gU.asX(l.N, G);
		if (b == l.N) return
	}
	var Q = l.Zx(d.x, d.y);
	Q.x = Math.max(0, Math.min(V.m, Q.x));
	Q.y = Math.max(0, Math.min(V.n, Q.y));
	if (!1) {} else {
		var t = l.Gb(),
			I = l.N / b;
		t.translate(-Q.x, -Q.y);
		t.scale(I, I);
		t.translate(Q.x, Q.y);
		l.ai7(t)
	}
};
f.gU.prototype.TA = function(l, d, G, b, V) {
	if (l.a == "pzoom") {
		if (typeof l.Z == "string") return;
		l = {
			a: "zoom",
			N: l.Z / 100
		}
	}
	var Q = 0,
		t = !1,
		I = null;
	if (l.a == "adapt") {
		var y = 0;
		if (l.Z == "pixel") y = 1;
		if (l.Z == "fitscr") {
			var y = 0,
				e = G.u.Vm.m,
				M = G.u.Vm.n,
				R = new Rect(0, 0, G.m, G.n),
				J = PixelUtil.vec.simplifyPath(R).C,
				n = new Matrix2D;
			n.rotate(G.u.Ay);
			PixelUtil.vec.transformCoords(J, n, J);
			var r = PixelUtil.vec.boundingBox(J),
				T = V.bI ? PixelUtil.y0.mT + 4 : 8;
			y = Math.min((e - T * 2) / r.m, (M - T * 2) / r.n);
			G.u.R.T6(0, 0)
		}
		I = new Point2D(Math.round(G.u.Vm.m / 2), Math.round(G.u.Vm.n / 2));
		Q = y;
		f.gU.p8(G.u, I, t, Q);
		G.bV = !0
	}
	if (l.a.startsWith("multi")) {
		function j(B) {
			var v = B[0].x - B[1].x,
				i = B[0].y - B[1].y;
			return Math.sqrt(v * v + i * i)
		}

		function g(B) {
			return new Point2D((B[0].x + B[1].x) / 2, (B[0].y + B[1].y) / 2)
		}
		var Y = l.Cs,
			k = g(Y);
		if (l.a == "multidown") {
			this.JT = [Y, G.u.N, G.u.Zx(k.x, k.y)]
		} else {
			var F = f.gU.QU;
			Q = this.JT[1] * j(Y) / j(this.JT[0]);
			Q = Math.max(F[F.length - 1], Math.min(F[0], Q));
			if (Q != G.u.N) f.gU.p8(G.u, k, t, Q);
			var D = this.JT[2],
				q = G.u.dN(D.x, D.y),
				H = G.u.R;
			H.x = Math.round(H.x + k.x - q.x);
			H.y = Math.round(H.y + k.y - q.y);
			G.bV = !0
		}
	}
	if (l.a == "scroll") {
		I = l.OJ;
		var F = f.gU.QU,
			W = l.tc.y,
			Z = 1 + Math.abs(W) * 8e-4 * (l.azv ? 10 : 1);
		if (W > 0) Z = 1 / Z;
		Q = G.u.N * Z;
		f.gU.p8(G.u, I, t, Math.min(F[0], Math.max(F[F.length - 1], Q)));
		G.bV = !0
	}
	if (l.a == "zoom") {
		var B = l.In ? d.Mt : [G];
		for (var A = 0; A < B.length; A++) {
			var a = B[A],
				m = a.u;
			I = l.OJ ? l.OJ : new Point2D(Math.round(m.Vm.m / 2), Math.round(m.Vm.n / 2));
			if (l.N != null) Q = l.N;
			else t = l.K$;
			f.gU.p8(m, I, t, Q);
			a.bV = !0
		}
	}
	if (l.a == "mskView") {
		var p = G.B[G.g[0]];
		if (p.ht <= 0) {
			p.ht = 1;
			G.i_ = !0
		}
		var c = p.ht == 3 ? p.vZ(G).z : p.c3();
		if (l.Z == 0) {
			G.u.MX = [1, 1, 1];
			c.jv = !1
		}
		if (l.Z == 1) {
			G.u.MX = [1, 1, 1];
			c.jv = !0
		}
		if (l.Z == 2) {
			G.u.MX = [0, 0, 0];
			c.jv = !0
		}
		for (var A = 0; A < G.vj.length; A++) G.vj[A].jv = !1;
		G.FB = [];
		G.uK = !0
	}
};
f.gU.prototype.o9 = function(l, d, G, b) {
	if (this.hI != b.l(KeyboardHandler.Jm)) {
		this.hI = b.l(KeyboardHandler.Jm);
		var V = {
				a: ActionTypes.$.vq,
				G: this.id,
				hI: this.hI
			},
			Q = new Action(ActionTypes.E.L, !0);
		Q.data = V;
		d.dispatch(Q);
		this.AA(d, b)
	}
};
f.gU.prototype.AA = function(l, d) {
	var G = new Action(ActionTypes.E.L, !0),
		b = this.axx(d);
	G.data = {
		a: ActionTypes.$.e5,
		ew: b ? "zoom-in" : "zoom-out"
	};
	l.dispatch(G)
};
f.gU.prototype.A0 = function(l, d, G, b) {
	this.K$ = l.K$;
	this.In = l.In;
	this.AA(d, b)
};
f.gU.prototype.axx = function(l) {
	var d = this.K$;
	if (l.l(KeyboardHandler.Mm) && l.l(KeyboardHandler.wz)) d = !0;
	if (this.hI) d = !d;
	return d
};
f.gU.a8m = function(l, d) {
	if (l.l(KeyboardHandler.W$) || l.l(KeyboardHandler.a8d)) {
		d.G = f.t7;
		d.data = {
			a: "zoom",
			K$: !0
		}
	}
	if (l.l(KeyboardHandler.Zw)) {
		d.G = f.t7;
		d.data = {
			a: "zoom",
			K$: !1
		}
	}
	if (l.l(KeyboardHandler.ZD)) {
		d.G = f.t7;
		d.data = {
			a: "adapt",
			Z: "fitscr"
		}
	}
	if (l.l(KeyboardHandler.wY)) {
		d.G = f.t7;
		d.data = {
			a: "adapt",
			Z: "pixel"
		}
	}
};
// Base class for pen and path editing tools
f.nr = function(l, d, G) {
	f.AbstractTool.call(this, l, d, G);
	this.v0 = null;
	this.mN = null;
	this.QF = null;
	this.an6 = 0
};
f.nr.prototype = new f.AbstractTool;
f.nr.xs = function(l) {
	var d = {
			t: "obj ",
			v: [{
				t: "prop",
				v: {
					classID: "Path",
					keyID: "WrPt"
				}
			}]
		},
		G = l == 0 ? {
			classID: "null",
			null: d,
			WhPt: {
				t: "bool",
				v: !0
			}
		} : {
			classID: "Strk",
			null: d,
			Usng: {
				t: "type",
				v: {
					classID: "PbTl"
				}
			},
			__name: "Stroke"
		};
	return {
		kT: l == 0 ? "fill" : "stroke",
		a0: G
	}
};
f.nr.prototype.enable = function(l, d, G, b, V) {
	this.mN = G;
	var Q = new Action(ActionTypes.E.L, !0);
	Q.data = {
		a: ActionTypes.$.e5,
		ew: "default"
	};
	d.dispatch(Q)
};
f.nr.prototype.h_ = function(l, d, G, b, V) {
	var Q = l.LW(),
		t = Q[0],
		I = Q[1];
	if (I.length == 0) return;
	var y = t[I[0]],
		e = y.add.vmsk,
		M = l.u.Zx(V.x, V.y),
		R = 4 * window.devicePixelRatio / l.u.N,
		J = new Rect(M.x - R, M.y - R, R * 2, R * 2),
		n = PixelUtil.path.o1(e.i, J)[0];
	if (n.length != 0) {
		e.OE = n;
		l.uK = !0
	}
	var r = PixelUtil.path.Rw(e.i, M).sy;
	if (r != -1) {
		e.g = [r];
		l.uK = !0
	}
	var T = new Action(ActionTypes.E.L, !0);
	T.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		Zm: V,
		T1: l,
		wQ: G
	};
	d.dispatch(T)
};
f.nr.prototype.a7I = function(l, d) {
	var G = new Action(ActionTypes.E.L, !0);
	G.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.Z3
	};
	if (!d.Wi) l.dispatch(G);
	G.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.fe
	};
	if (!d.hq.t_) l.dispatch(G)
};
f.nr.prototype.Ew = function(l, d, G, b) {
	if (G.QN != this.id) return;
	if (l.g.length == 0) return;
	var V = l.B[l.g[0]],
		Q = V.add.vmsk,
		t = V.add.vstk,
		I = f.nr.wR(l, l.g[0]);
	this.v0 = l;
	this.QF = d;
	if (V.VF() && Q != null && (JSON.stringify(t) != JSON.stringify(G.PB) || JSON.stringify(I) != JSON.stringify(G.Xf))) {
		this.an6 = Date.now();
		var y = new Action(ActionTypes.E.L, !0);
		y.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.pc,
			Z: I
		};
		d.dispatch(y);
		y.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.$o,
			Z: t
		};
		d.dispatch(y)
	}
};
f.nr.prototype.BM = function(l, d) {
	if (this.v0 == null) return;
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.pc || d == PsdResourceTypes.$o) {
		if (Date.now() - this.an6 < 50) return;
		var G = d == PsdResourceTypes.pc,
			b = this.v0,
			V = G ? l.Xf : l.PB,
			Q = [],
			t = b.g;
		for (var A = 0; A < t.length; A++) {
			var I = t[A],
				y = b.B[I];
			if (!y.VF() || y.add.vmsk == null) continue;
			Q.push(I)
		}
		var e = new Action(ActionTypes.E.v, !0);
		e.G = f.yS;
		e.data = {
			a: LayerRecord.sM,
			xn: Q,
			T3: G,
			Z: V
		};
		if (Q.length != 0) this.QF.dispatch(e)
	}
};
f.nr.prototype.anU = function(l) {
	if (typeof l == "number") {
		var d = new Action(ActionTypes.E.g5, !0);
		d.data = f.Ga.ML(0);
		d.data.a0.Usng.v.Type.v.Clr.v = PixelUtil.color.rgbColorDescriptor({
			o: l >>> 16 & 255,
			J: l >>> 8 & 255,
			k: l >>> 0 & 255
		});
		this.QF.dispatch(d)
	}
};
f.nr.prototype.TA = function(l, d, G, b, V) {
	this.QF = d;
	if (l.a == "newfill") {
		if (l.Ts == 0) {
			var Q = new Action(ActionTypes.E.L, !0);
			Q.data = {
				a: ActionTypes.$.SN,
				GU: "colorpicker",
				_A: V.Y7,
				qF: this.anU.bind(this)
			};
			d.dispatch(Q)
		}
	} else if (l.a == "pathedit") {
		var t = l.y3,
			I = "",
			y = G.t_.slice(0),
			e = G.yK.slice(0),
			M = G.t_.slice(0),
			R = G.yK.slice(0);
		if (t == "rnm") {
			var J = -1 - l.sy,
				n = y[J],
				r = PsdDocument.HE(l.name, n.add);
			if (J != 0) M[J] = r;
			else {
				R = [M.length];
				M.push(r);
				M[0] = PsdDocument.HE("Work Path")
			}
			I = "Rename"
		} else if (t == "new") {
			var r = PsdDocument.HE("Path " + y.length);
			if (l.a66) {
				var T = G.LW(),
					g = T[0],
					Y = T[1],
					k = g[Y[0]];
				r.add.vmsk = k.add.vmsk.clone();
				r.add.vogk = JSON.parse(JSON.stringify(k.add.vogk));
				if (k.sy == -1) {
					var F = M[R[0]] = PsdDocument.HE("Path " + y.length);
					F.name = k.name;
					F.sy = k.sy
				}
			}
			M.push(r);
			R = [M.length - 1];
			I = "New"
		} else if (t == "del") {
			if (R.length == 0) return;
			R.sort(function(c, K) {
				return c - K
			});
			if (R[0] == 0) {
				M[0] = PsdDocument.HE(y[0].name);
				R = R.slice(1)
			}
			var D = 0;
			while (R.length != 0) {
				M.splice(R[0] - D, 1);
				R = R.slice(1);
				D++
			}
			I = "Delete"
		} else if (t == "fromsel") {
			var q = M[0] = PsdDocument.HE("Work Path");
			R = [0];
			if (G.P == null) return;
			var H = G.P.channel.slice(0);
			for (var A = 0; A < H.length; A++) H[A] = H[A] > 128 ? 2 : 1;
			var W = G.P.rect.clone();
			W.rC(1, 1);
			var Z = PixelUtil.allocBytes(W.O());
			PixelUtil.copyBufferRect(H, G.P.rect, Z, W);
			var B = j0.Hu(Z, W.m, W.n, Math.round(W.O() * 5e-4)),
				g = j0.LW(B),
				a = new Matrix2D(1, 0, 0, 1, -1 + G.P.rect.x, -1 + G.P.rect.y);
			for (var A = 0; A < g.length; A++) PixelUtil.vec.transformCoords(g[A].path.C, a, g[A].path.C);
			for (var A = 0; A < g.length; A++) {
				var m = g[A];
				if (m.color == 1 && m.parent == -1) continue;
				var p = PixelUtil.vec.QO(g[A].path, !1);
				q.add.vmsk.i = q.add.vmsk.i.concat(p.slice(2))
			}
			q.add.vogk = LayerRecord.Ba(q.add.vmsk.i);
			I = "Selection to"
		}
		var c = new HistoryState(I + " Path", this);
		c.data = {
			ES: y,
			My: e,
			ag5: M,
			AZ: R
		};
		if (t == "fromsel") {
			c.data.Sd = G.P;
			c.data.le = null
		}
		G.pushHistoryState(c);
		this.applyRedo(c.data, G)
	} else {
		var v = l.Il,
			T = G.LW(l.a == "append" || l.a == "fromAction"),
			g = T[0],
			Y = T[1],
			q = g[Y[0]],
			i = q.add.vmsk,
			z = q.add.vogk,
			P = i.clone(),
			C = i.clone(),
			h = JSON.stringify(z);
		if (l.a == "fromAction") {
			var L = l.lX,
				U = L.kT,
				S = L.a0,
				E = S.T;
			if (U == "set") {
				if (E) {
					z.push(PixelUtil.X.nI(E) || PixelUtil.X.UH());
					C.i.push({
						type: 0,
						H$: 1,
						length: 0
					});
					PixelUtil.X.ry(z, C);
					v = [12, 76, 0]
				} else throw S
			} else if (U == "draw") {
				z = [PixelUtil.X.nI(S.Shp) || PixelUtil.X.UH()];
				C.i.push({
					type: 0,
					H$: 1,
					length: 0
				});
				PixelUtil.X.ry(z, C);
				f.nr.aql(C.i, S.AntA.v, V.Y7, d);
				return
			} else throw U
		} else if (l.a == "remove") {
			if (l.S6 && C.OE.length != 0) {
				C.i = PixelUtil.path.amX(C.i, C.OE, z, l.awx);
				var x = PixelUtil.path.Mh(C.i);
				for (var A = 0; A < C.g.length; A++)
					if (C.g[A] >= x) {
						C.g.splice(A, 1);
						A--
					}
				C.OE = [];
				v = "Delete Anchors"
			} else {
				if (C.g.length == 0) return;
				var D = 0;
				for (var A = 0; A < C.g.length; A++) {
					z.splice(C.g[A] + D, 1);
					D--
				}
				C.i = PixelUtil.path.aeH(C.i, C.g);
				C.g = [];
				C.OE = [];
				if (v == null) v = "Delete Paths"
			}
		}
		if (l.a == "append") {
			f.nr.zo(l.avn, C, z)
		}
		this.ey(G, q.sy, C, z);
		this.ak(G, v, q.sy, P, C.clone(), null, h, JSON.stringify(z))
	}
};
f.nr.aql = function(l, d, G, b) {
	var V = new LayerRecord.VectorMask;
	V.i = V.i.concat(l.slice(2));
	var Q = V.c3();
	if (!d) PixelUtil.round(Q.channel);
	var t = PixelUtil.allocBytes(Q.rect.O() * 4);
	PixelUtil.andMaskUint32(t, (G & 255) << 16 | (G >> 8 & 255) << 8 | (G >> 16 & 255) << 0);
	PixelUtil.writeChannelToRgba(Q.channel, t, 3);
	var I = new Action(ActionTypes.E.v, !0);
	I.G = f.CV;
	I.data = {
		a: "draw",
		wH: {
			buffer: t,
			rect: Q.rect.clone()
		},
		Il: this.name
	};
	b.dispatch(I)
};
f.nr.ii = function(l, d) {
	var G = PixelUtil.path.a2K(l.i, l.g),
		b = [];
	for (var A = 0; A < l.g.length; A++) b.push(JSON.parse(JSON.stringify(d[l.g[A]])));
	return [G, b]
};
f.nr.zo = function(l, d, G) {
	var b = PixelUtil.path.Mh(d.i),
		V = PixelUtil.path.Mh(l[0]);
	d.i = d.i.concat(l[0].slice(2));
	d.g = [];
	for (var A = 0; A < V; A++) d.g.push(b + A);
	for (var A = 0; A < V; A++) G.push(JSON.parse(JSON.stringify(l[1][A])))
};
f.nr.prototype.oH = function(l, d) {
	if (d == null) return !1;
	var G = d.LW(),
		b = G[0],
		V = G[1];
	if (V.length == 0) return !1;
	var Q = b[V[0]],
		t = Q.add.vmsk;
	if (t && t.g.length + t.OE.length != 0) return [KeyboardHandler.HD, KeyboardHandler.kJ].indexOf(l) != -1
};
f.nr.prototype.o9 = function(l, d, G, b) {
	if (l == null) return;
	var V = l.LW(),
		Q = V[0],
		t = V[1];
	if (t.length == 0) return;
	var I = Q[t[0]],
		y = I.add.vmsk;
	if (b.l(KeyboardHandler.mp) || b.l(KeyboardHandler.lm) || this.id == f.tA && b.l(KeyboardHandler.Ho)) {
		y.OE = [];
		l.uK = !0
	}
	if (y.g.length != 0) {
		var e = b._9(l ? l.u.Ay : 0);
		if (e.x != 0 || e.y != 0) {
			var M = y.clone(),
				R = y.clone(),
				J = new Matrix2D(1, 0, 0, 1, e.x, e.y),
				n = I.add.vogk,
				r = JSON.stringify(n);
			if (b.l(KeyboardHandler.Jm)) {
				var T = f.nr.ii(R, n);
				f.nr.zo(T, R, n)
			}
			PixelUtil.path.transformFlatCoords(R.i, J, R.g);
			PixelUtil.X.D(n, PixelUtil.canvas.pu(J), R.g);
			this.ey(l, I.sy, R, n);
			this.ak(l, "Move Paths", I.sy, M, R.clone(), !0, r, JSON.stringify(n))
		}
		if (b.l(KeyboardHandler.HD) || b.l(KeyboardHandler.kJ)) this.TA({
			a: "remove",
			S6: this.id == f.tA
		}, d, l, b, G)
	}
};
f.nr.prototype.ak = function(l, d, G, b, V, Q, t, I) {
	var y = new HistoryState(d, this);
	y.data = {
		b4: G,
		x9: b,
		hy: V,
		abl: Q,
		aAo: t,
		Vb: I
	};
	l.pushHistoryState(y)
};
f.nr.prototype.applyRedo = function(l, d) {
	if (l.b4 != null) this.ey(d, l.b4, l.hy.clone(), JSON.parse(l.Vb));
	else {
		d.t_ = l.ag5.slice(0);
		d.yK = l.AZ.slice(0);
		d.uK = d.i_ = !0
	}
	if (l.Sd || l.le) {
		d.P = l.le;
		d.Of = !0
	}
};
f.nr.prototype.applyUndo = function(l, d) {
	if (l.b4 != null) this.ey(d, l.b4, l.x9.clone(), JSON.parse(l.aAo));
	else {
		d.t_ = l.ES.slice(0);
		d.yK = l.My.slice(0);
		d.uK = d.i_ = !0
	}
	if (l.Sd || l.le) {
		d.P = l.Sd;
		d.Of = !0
	}
};
f.nr.prototype.ey = function(l, d, G, b) {
	var V = d < 0 ? l.t_[-1 - d] : d < 1e6 ? l.B[d] : l.B[d - 1e6].add.TySh,
		Q = V.add.vmsk;
	Q.channel = null;
	Q.y1 = !0;
	if (Q.UG) {
		Q.UG.channel = null;
		Q.UG.y1 = !0
	}
	V.add.vmsk = G;
	V.add.vogk = b;
	if (1e6 <= d) {
		dt.Sz(V);
		var t = l.B[d - 1e6],
			I = V,
			y = this.mN;
		StyleHelper.updateLayerTextStyle(t, y.Hg);
		l.U()
	} else if (0 <= d) {
		G.y1 = !0;
		V.QJ(l);
		l.U()
	}
	l.uK = l.i_ = !0
};
f.nr.wR = function(l, d) {
	var G = l.B[d],
		b = G.add.vstk,
		V = null;
	if (b && !b.fillEnabled.v) V = {
		hA: 0
	};
	else if (G.add.SoCo) V = {
		hA: 1,
		rU: G.add.SoCo
	};
	else if (G.add.GdFl) V = {
		hA: 2,
		rU: G.add.GdFl
	};
	else if (G.add.PtFl) V = {
		hA: 3,
		rU: G.add.PtFl
	};
	return V
};
f.nr.S2 = function(l, d) {
	var G = l.add.vmsk,
		b = l.add.vstk,
		V = d.hA;
	if (b) b.fillEnabled.v = V != 0;
	if (V > 0) {
		var Q = ["SoCo", "GdFl", "PtFl"][V - 1];
		for (var A = 0; A < 3; A++) delete l.add[["SoCo", "GdFl", "PtFl"][A]];
		l.add[Q] = d.rU
	}
};
// Base class for parametric shape drawing tools
f.Ga = function(l, d, G, b) {
	f.nr.call(this, l, d, G);
	this.HS = {
		shape: eU.oT(),
		pshape: 0,
		binop: 0,
		crad: 0,
		irad: 40,
		length: 4,
		sides: 5,
		width: 5,
		tolr: 5,
		tsiz: 300,
		cstr: {
			sA: 0
		},
		anta: !0,
		aopts: [!1, !1, 50, 100, 0]
	};
	this.ahV = b;
	this.RO = null;
	this.RE = null;
	this.Px = null;
	this.ph = new jV
};
f.Ga.prototype = new f.nr;
f.Ga.prototype.Q0 = function(l) {
	return l.oW && this.id != f.YQ
};
f.Ga.prototype.enable = function(l, d, G, b, V) {
	this.mN = G;
	var Q = new Action(ActionTypes.E.L, !0);
	Q.data = {
		a: ActionTypes.$.e5,
		ew: "crosshair"
	};
	d.dispatch(Q)
};
f.Ga.prototype.o9 = function(l, d, G, b) {
	f.nr.prototype.o9.call(this, l, d, G, b);
	this.ph.o9(b);
	this.m8(d, G)
};
f.Ga.prototype.m8 = function(l, d) {
	var G = new Action(ActionTypes.E.L, !0);
	G.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		Si: this.RN(d)
	};
	l.dispatch(G)
};
f.Ga.prototype.RN = function(l) {
	var d = this.ph.ti(0),
		G = this.ph.bP(0),
		b = f.GS.Wg(this.HS.binop, d, G);
	if (l.dV == 1 && b == 0) b = 1;
	return b
};
f.Ga.prototype.Vj = function(l, d, G, b) {};
f.Ga.prototype.dJ = function(l, d, G, b, V) {
	var Q = G.dV;
	if (Q != 2) this.a7I(d, G);
	if (Q == 2 && !l.T8()) return;
	var t = l.u.Zx(V.x, V.y);
	t = f.Pq.aM(l, t, G);
	this.Px = [t.x, t.y];
	this.RO = t;
	this.RE = new Point2D(0, 0);
	this.ph.dJ(b)
};
f.Ga.prototype.agn = function(l, d, G, b) {
	var V = [this.RO.clone(), d.clone()];
	G = this.ph.ti(1) || G.l(KeyboardHandler.Zz) || this.ph.bP(1) ? G : null;
	if (this.ahV) V = f.Ga.k2(V[0], V[1], G, !0, this.HS.cstr);
	if (l) l.u.M9 = new Rect(V[0].x, V[0].y, V[1].x - V[0].x, V[1].y - V[0].y);
	return this.Vj(V[0], V[1], this.ph.ti(1) && G.l(KeyboardHandler.Zz), this.Px, l.u, b)
};
f.Ga.prototype.a5H = function(l, d, G) {
	var b = l.u.Zx(d.x, d.y);
	if (this.id == f.YQ) return b;
	var V = this.HS.cstr;
	if (V.sA == 2) {
		var Q = new Rect(b.x - V.x, b.y - V.y, V.x, V.y),
			t = f.Pq.wA(l, Q, G);
		b.x += t[0];
		b.y += t[1];
		f.Pq.If(l, Q, t)
	} else b = f.Pq.aM(l, b, G);
	return b
};
f.Ga.prototype.JP = function(l, d, G, b, V) {
	if (this.RO == null) return;
	var Q = this.Px,
		t = Q.length,
		I = V ? this.a5H(l, V, G) : new Point2D(Q[t - 2], Q[t - 1]);
	if (b.l(KeyboardHandler.Mm)) this.RO = I.gu(this.RE);
	else this.RE = I.gu(this.RO);
	Q.push(I.x, I.y);
	if (this.HS.shape == null) this.HS.shape = G.t6[0];
	var y = this.agn(l, I, b, !0)[0],
		e = PixelUtil.vec.pathFromSvg(y);
	l.I.Bt = e;
	if (this.id != f.YQ && this.id != f.OZ && this.id != f.MO) f.AbstractTool.nk(V, l.u.M9, l, G);
	l.uK = !0;
	this.ph.JP()
};
f.Ga.prototype.a2L = function(l, d, G, b) {
	var V = l[4].clone();
	if (b) {
		V.x -= d / 2;
		V.y -= G / 2
	}
	if (this.id == f.OZ) {
		d /= 2;
		G /= 2;
		V.x += d;
		V.y += G;
		G = -G;
		d = 0
	}
	var Q = this.Vj(V, new Point2D(V.x + d, V.y + G), !1, this.Px);
	this.aiF(l[0], l[1], l[2], Q)
};
f.Ga.prototype.aiF = function(l, d, G, b) {
	var V = G.dV,
		Q = new Action(ActionTypes.E.g5, !0);
	if (V == 0) Q.data = f.Ga.a06(b[1], G);
	else if (V == 1) {
		var t = {
			__name: "Set",
			classID: "setd",
			null: {
				t: "obj ",
				v: [{
					t: "prop",
					v: {
						classID: "Path",
						keyID: "WrPt"
					}
				}]
			},
			T: b[1]
		};
		Q.data = {
			kT: "set",
			a0: t
		}
	} else {
		var t = {
			__name: "Draw",
			classID: "Draw",
			AntA: {
				t: "bool",
				v: !0
			},
			Shp: b[1]
		};
		Q.data = {
			kT: "draw",
			a0: t
		}
	}
	d.dispatch(Q);
	if (b[1].v.classID == "customShape" && b[1].v.Nm.v.startsWith("--")) {
		var I = l.LW(),
			y = I[0],
			e = I[1],
			M = y[e.pop()],
			R = M.add.vmsk,
			J = M.add.vogk;
		PixelUtil.X.Dv(J);
		var n = R.clone();
		n.i = b[0];
		this.ey(l, M.sy, n, J)
	}
};
f.Ga.prototype.Nl = function(l, d, G, b, V, Q) {
	if (this.RO == null) return;
	var t = this.a5H(l, V, G),
		I = this.RN(G),
		y = G.dV,
		e = this.Px,
		M = e.length;
	if (this.id == f.YQ && M <= 4) {} else if (M <= 4) {
		t.x = Math.round(t.x);
		t.y = Math.round(t.y);
		var R = new Action(ActionTypes.E.L);
		R.data = {
			a: ActionTypes.$.SN,
			GU: "createshape",
			awQ: this.a2L.bind(this),
			a5R: this.name,
			alI: [l, d, G, b, t]
		};
		if (!Q) d.dispatch(R)
	} else if (M != 2) {
		var J = this.agn(l, t, b),
			n = J[0],
			r = l.LW(!0),
			T = r[0],
			j = r[1],
			g = j.length - 1;
		if (y == 1 && n.length > 2 || y == 0 && I != 0 && g != -1 && T[j[g]].sy >= 0) {
			n[2].H$ = [1, 2, 3, 0][I - 1];
			var Y = T[j.pop()],
				k = Y.add.vmsk,
				F = Y.add.vogk,
				D = k.clone(),
				q = k.clone(),
				H = JSON.stringify(F);
			q.i = q.i.concat(n.slice(2));
			q.g = [PixelUtil.path.Mh(q.i) - 1];
			var W = PixelUtil.X.nI(J[1]);
			F.push(W ? W : PixelUtil.X.UH());
			this.ey(l, Y.sy, q, F);
			this.ak(l, this.name, Y.sy, D, q, null, H, JSON.stringify(F))
		} else if (y == 0) {
			this.aiF(l, d, G, J)
		} else if (y == 2) {
			f.nr.aql(n, this.HS.anta, G.Y7, d)
		}
	}
	this.RO = null;
	l.I.Bt = null;
	l.I.Cj = null;
	l.I.P4 = [];
	l.u.M9 = null;
	l.uK = !0;
	this.ph.Nl();
	this.m8(d, G)
};
f.Ga.prototype.A0 = function(l, d, G, b, V) {
	for (var G in l) this.HS[G] = l[G]
};
f.Ga.k2 = function(l, d, G, b, V) {
	var Q = l.x,
		t = l.y,
		I = d.x,
		y = d.y;
	if (V && V.sA == 2) {
		if (b) {
			I = Math.round(I);
			y = Math.round(y)
		}
		Q = I - V.x;
		t = y - V.y
	} else {
		var e = 0;
		if (V && V.sA == 1) e = V.y / V.x;
		else if (G && G.l(KeyboardHandler.Zz)) e = 1;
		if (e != 0) {
			if (b) {
				if (Q < I) Q = Math.floor(Q);
				else Q = Math.ceil(Q);
				if (t < y) t = Math.floor(t);
				else t = Math.ceil(t)
			}
			var M = Math.abs(I - Q),
				R = Math.abs(y - t),
				J = M;
			if (R / M < e) J *= R / M / e;
			I = I > Q ? Q + J : Q - J;
			y = y > t ? t + J * e : t - J * e
		}
		if (G && G.l(KeyboardHandler.Jm)) {
			Q -= I - Q;
			t -= y - t
		}
	}
	var l = new Point2D(Q, t),
		d = new Point2D(I, y);
	if (b) f.Ga.ap7(l, d);
	return [l, d]
};
f.Ga.ap7 = function(l, d) {
	if (l.x > d.x) {
		var G = l.x;
		l.x = d.x;
		d.x = G
	}
	if (l.y > d.y) {
		var G = l.y;
		l.y = d.y;
		d.y = G
	}
	l.x = Math.floor(l.x);
	l.y = Math.floor(l.y);
	d.x = Math.ceil(d.x);
	d.y = Math.ceil(d.y)
};
f.Ga.avd = function() {
	return {
		classID: "Mk",
		null: {
			t: "obj ",
			v: [{
				t: "Clss",
				v: {
					classID: "contentLayer"
				}
			}]
		},
		Usng: {
			t: "Objc",
			v: {
				classID: "contentLayer",
				Type: {
					t: "Objc",
					v: {}
				}
			}
		}
	}
};
f.Ga.ML = function(l, d) {
	var G = f.Ga.avd(),
		b = G.Usng.v.Type;
	if (d == null) {
		b.v = JSON.parse(JSON.stringify(LayerStyleConstants.defaultContentStyles[l]));
		b.v.classID = ["solidColorLayer", "gradientLayer", "patternLayer"][l]
	} else f.uj.ON(d, b.v, l);
	return {
		kT: "make",
		a0: G
	}
};
f.Ga.a06 = function(l, d) {
	var G = d.Xf,
		b = JSON.parse(JSON.stringify(d.PB));
	b.fillEnabled.v = G.hA != 0;
	var V = f.Ga.ML(Math.max(0, G.hA - 1), G.rU);
	V.a0.Usng.v.Shp = l;
	V.a0.Usng.v.strokeStyle = {
		t: "Objc",
		v: b
	};
	return V
};
// Pen Tool / Curvature Pen Tool constructor
f.Ud = function(l) {
	f.nr.call(this, l == 0 ? "Pen" : "Curvature Pen", l == 0 ? f.tA : f.a13, l == 0 ? "tools/pen" : "tools/cpen");
	this.WV = l;
	this.l1 = null;
	this.qC = null;
	this.MD = null;
	this.ap1 = 0;
	this.Fq = null;
	this.vN = !1;
	this.T0 = !1;
	this.m_ = !1;
	this.kw = !1;
	this.pm = 0
};
f.Ud.prototype = new f.nr;
f.Ud.prototype.Q0 = function(l) {
	return this.qC != null
};
f.Ud.prototype.o9 = function(l, d, G, b) {
	if (!b.l(KeyboardHandler.Jm)) this.m_ = !1;
	if (this.WV == 1 && (b.l(KeyboardHandler.HD) || b.l(KeyboardHandler.kJ)) && this.oH(KeyboardHandler.HD, l)) {
		this.TA({
			a: "remove",
			S6: !0
		}, d, l, b, G);
		return
	}
	f.nr.prototype.o9.call(this, l, d, G, b)
};
f.Ud.prototype.dJ = function(l, d, G, b, V) {
	this.l1 = V;
	this.a7I(d, G);
	var Q = l.u.Zx(V.x, V.y),
		T, j;
	Q.x = Math.round(Q.x);
	Q.y = Math.round(Q.y);
	var t = f.Pq.aM(l, Q, G),
		I = G.dV,
		y = this.ap1;
	if (I == 2) I = 0;
	var e = l.LW(I == 1),
		M = e[0],
		R = e[1],
		J = M[R.pop()],
		n = J ? J.add.vmsk : null;
	if (I == 0 && y != 0 && J && J.sy >= 0) I = 1;
	var r = f.Jo(l, V);
	if (n) T = PixelUtil.path.Rw(n.i, Q, !0, r);
	var g = b.l(KeyboardHandler.Jm);
	if (I == 0 && (n == null || n.OE.length == 0 && T.sy == -1)) {
		var Y = new Action(ActionTypes.E.g5, !0),
			k = PixelUtil.X.XU("customShape", [0, 0, 1, 1], null, null, null, "--");
		Y.data = f.Ga.a06(k, G);
		d.dispatch(Y);
		this.kw = !0;
		e = l.LW(!0);
		M = e[0];
		R = e[1];
		J = M[R.pop()];
		n = J.add.vmsk;
		n.i = n.i.slice(0, 2)
	}
	var F = J.add.vogk;
	this.qC = n.clone();
	this.MD = JSON.stringify(F);
	var D = n.i,
		q = PixelUtil.path.Mh(D);
	j = PixelUtil.path.o1(n.i, new Rect(Q.x - r, Q.y - r, r * 2, r * 2), n.OE);
	T = PixelUtil.path.Rw(n.i, Q, !0, r);
	var H = j[0].length + j[1].length + j[2].length;
	if (T.sy != -1 && j[0].length == 0) {
		var W = PixelUtil.path.W7(D, T.sy),
			Z = D[W].length;
		while (Z <= T.b5) {
			T.b5 -= Z;
			W += Z + 1
		}
		var B = {
				type: 4,
				Wf: t.clone(),
				H: t.clone(),
				UU: t.clone()
			},
			a = W + 2 + T.b5,
			m = W + 1 + (1 + T.b5) % Z,
			p = D[a - 1],
			c = D[m];
		if (!p.H.XB(p.UU) || !c.Wf.XB(c.H)) {
			var v = PixelUtil.vec.abd(p.H, p.UU, c.Wf, c.H, T.be);
			p.UU = v[0];
			B.Wf = v[1];
			B.H = v[2];
			B.UU = v[3];
			c.Wf = v[4]
		}
		D.splice(a, 0, B);
		D[W].length++;
		n.OE = [a];
		if (this.WV == 1) {
			B.Wf.x += 2;
			this.jF(n)
		}
	} else if (H != 0 && g) {
		var i = 0;
		for (var A = 0; A < 3; A++)
			if (j[A].length != 0) {
				i = j[A][0];
				this.T0 = A == 1;
				break
			}
		if (j[0].length != 0) {
			var z = n.i.length - 1,
				P = n.i[i];
			P.UU = P.H.clone();
			var C = P.type >= 3 ? 3 : 0;
			if (i != z) {
				P.Wf = P.H.clone();
				P.type = C + 1;
				this.m_ = !0
			} else P.type = C + 2
		}
		n.OE = [i]
	} else if (j[0].length == 1 && D[j[0][0] - 1] && (D[j[0][0] - 1].H != null || D[j[0][0] - 1].type == 0 || D[j[0][0] - 1].length == 1)) {
		var i = j[0][0];
		if (this.WV == 1) {
			var h = D[i],
				L = h.H,
				U = Math.abs(PixelUtil.vec.agB(h.Wf.x, h.Wf.y, L.x, L.y, h.UU.x, h.UU.y));
			if (U > .01) {
				h.Wf = L.clone();
				h.UU = L.clone()
			}
			if (Date.now() - this.pm < 300) {
				var S = h.Wf.XB(L) && h.UU.XB(L);
				if (S) h.UU.offset(2, 2);
				else {
					h.Wf = L.clone();
					h.UU = L.clone()
				}
				this.pm = 0
			} else this.pm = Date.now();
			n.OE = [i];
			this.jF(n)
		} else {
			var W = PixelUtil.path.W7(D, PixelUtil.path.dc(D, i)),
				k = D[W],
				E = W + k.length;
			if (i != E || k.type == 0) {
				D[W].length--;
				D.splice(i, 1);
				E--;
				if (k.length == 0) {
					D.splice(W, 1);
					E = -1
				}
			}
			if (E != -1) n.OE = [E];
			else n.OE = []
		}
	} else {
		var x = 0;
		if (n.OE.length != 1) {
			n.g = [q];
			D.push({
				type: 3,
				length: 1,
				H$: [1, 2, 3, 0][Math.max(0, y - 1)],
				_M: 0,
				c_: 0,
				jt: 0
			});
			x = D.length;
			F.push(PixelUtil.X.UH())
		} else {
			var h = n.OE[0],
				K = PixelUtil.path.dc(D, h),
				W = PixelUtil.path.W7(D, K);
			h = W + D[W].length;
			if (Point2D.yZ(Q, D[W + 1].H) < r) {
				D[W].type = 0;
				n.OE = [W + 1];
				this.Fq = t;
				this.vN = !0;
				this.ey(l, J.sy, n, F);
				l.uK = !0;
				return
			}
			D[W].length++;
			x = h + 1;
			if (h == W + 1 && D[W].length != 2) x = W + 1
		}
		if (b.l(KeyboardHandler.Zz) && D[x - 1] && D[x - 1].H) t = f.RK.cR(D[x - 1].H, t);
		var B = {
			type: 4,
			Wf: t.clone(),
			H: t.clone(),
			UU: t.clone()
		};
		D.splice(x, 0, B);
		n.OE = [x];
		this.Fq = t;
		if (this.WV == 1) {
			B.Wf.x += 2;
			this.jF(n)
		}
		this.pm = Date.now()
	}
	this.ey(l, J.sy, n, F);
	l.uK = !0
};
f.Ud.prototype.jF = function(l) {
	var d = l.i,
		G = l.OE[0],
		b = PixelUtil.path.W7(d, PixelUtil.path.dc(d, G)) + 1,
		V = d[b - 1].length;
	if (V < 3) return;
	var Q = [],
		t = [];
	for (var A = 0; A < 5; A++) {
		var I = b + (G - b - 2 + A + 5 * V) % V;
		t.push(I);
		var y = d[I].H;
		Q.push(y.x, y.y)
	}
	var e = PixelUtil.vec.transformCoordsH(Q);
	for (var A = 1; A < 4; A++) {
		var M = A * 4,
			R = d[t[A]],
			y = R.H,
			J = R.Wf.XB(y) && R.UU.XB(y);
		if (!J) {
			R.Wf.T6(e[M], e[M + 1]);
			R.UU.T6(e[M + 2], e[M + 3])
		} else {
			R.Wf = y.clone();
			R.UU = y.clone()
		}
	}
};
f.Ud.prototype.JP = function(l, d, G, b, V) {
	if (this.qC == null) return;
	var Q = this.l1;
	if (Q && Point2D.yZ(Q, V) < f.Jo({
			u: {
				N: 1
			}
		}, V)) return;
	this.l1 = null;
	var t = l.u.Zx(V.x, V.y),
		I = f.Pq.aM(l, t, G),
		y = l.LW(G.dV == 1),
		e = y[0],
		M = y[1],
		R = e[M.pop()],
		J = R.add.vmsk,
		n = J.i,
		r = n[J.OE[0]];
	if (this.WV == 1) {
		var T = r.H.XB(r.Wf) && r.H.XB(r.UU);
		r.H = t.clone();
		r.Wf = t.clone();
		r.UU = t.clone();
		if (!T) r.Wf.x += 2;
		this.jF(J)
	} else if (b.l(KeyboardHandler.Mm)) {
		if (b.l(KeyboardHandler.Zz)) I = f.RK.cR(this.Fq, I);
		var j = r.H.gu(r.UU),
			g = r.Wf.gu(r.H);
		r.UU = I;
		r.H = I.add(j);
		r.Wf = r.H.add(g)
	} else {
		if (b.l(KeyboardHandler.Zz)) I = f.RK.cR(r.H, I);
		if (this.T0) {
			var Y = r.Wf;
			r.Wf = r.UU;
			r.UU = Y
		}
		if (this.vN) {
			var k = Point2D.yZ(r.H, I),
				F = k == 0 ? 0 : Point2D.yZ(r.H, r.UU) / k;
			r.UU.x = r.H.x + F * (I.x - r.H.x);
			r.UU.y = r.H.y + F * (I.y - r.H.y)
		} else r.UU = I;
		if (b.l(KeyboardHandler.Jm) && !this.m_) r.type = 5;
		else {
			r.type = 4;
			r.Wf = r.H.add(r.H.gu(I))
		}
		this.Fq = I;
		if (this.T0) {
			var Y = r.Wf;
			r.Wf = r.UU;
			r.UU = Y
		}
	}
	this.ey(l, R.sy, J, R.add.vogk);
	l.uK = !0
};
f.Ud.prototype.Nl = function(l, d, G, b, V) {
	if (this.qC == null) return;
	var Q = l.LW(G.dV == 1),
		t = Q[0],
		I = Q[1],
		y = t[I.pop()],
		e = y.add.vmsk,
		M = y.add.vogk;
	if (this.vN) {
		e.OE = [];
		this.ey(l, y.sy, e, y.add.vogk)
	}
	var R = this.qC.i.length,
		J = e.i.length;
	if (!this.kw) this.ak(l, this.vN ? "Close Path" : (R == J ? "Move" : R < J ? "Add" : "Delete") + " Anchor Point", y.sy, this.qC, e.clone(), null, this.MD, JSON.stringify(M));
	this.kw = !1;
	this.vN = !1;
	this.T0 = !1;
	this.m_ = !1;
	this.qC = null
};
f.Ud.prototype.A0 = function(l, d, G, b, V) {
	this.ap1 = l.binop
};
// Free Pen Tool
f.YC = function() {
	f.Ga.call(this, "Free Pen", f.YQ, "tools/fpen", !1)
};
f.YC.prototype = new f.Ga;
f.YC.prototype.Vj = function(l, d, G, b, V, Q) {
	var t = b.length - 1,
		I = Math.sqrt((b[t - 1] - b[0]) * (b[t - 1] - b[0]) + (b[t] - b[1]) * (b[t] - b[1])) < 6 / V.N;
	return [PixelUtil.path.Op(b, I, Q), PixelUtil.X.XU("customShape", [0, 0, 1, 1], null, null, null, "--")]
};
// Path Selection Tool
f.yM = function() {
	f.nr.call(this, "Path Select", f.o2, "tools/pselect");
	this.bo = null;
	this.ng = !1;
	this.EH = null;
	this.qC = null;
	this.TX = null;
	this.MD = null;
	this.KT = null;
	this.CF = null;
	this.J7 = null;
	this.wN = null
};
f.yM.prototype = new f.nr;
f.yM.prototype.Q0 = function(l) {
	return l.oW
};
f.yM.prototype.dJ = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y),
		t = l.LW(),
		I = t[0],
		y = t[1],
		e, M;
	for (var A = 0; A < y.length; A++) {
		var R = I[y[A]],
			J = R.add.vmsk,
			n = PixelUtil.path.Rw(J.i, Q).sy;
		if (n != -1) {
			this.EH = e = R;
			M = n
		}
		for (var r = 0; r < J.JG.length; r++) {
			var T = PixelUtil.path.OT(J.i, J.JG[r]);
			if (T == null) continue;
			var j = Point2D.yZ(T, Q);
			if (j < 4 * window.devicePixelRatio / l.u.N) {
				var g = l.B[R.sy - 1e6].add.TySh,
					Y = g.zC.Curve,
					k = g.D,
					F = Y.Reversed;
				Y.Reversed = !1;
				var Y = je.Ro(g.zC.Curve);
				Y.Reversed = F;
				PixelUtil.vec.transformCoords(Y[0], k, Y[0]);
				this.J7 = [Y, r, k.aS * k.Qd - k.k * k.S5];
				this.EH = e = R;
				M = 0
			}
		}
		if (this.J7) break
	}
	if (e != null) {
		var J = e.add.vmsk;
		J.OE = [];
		var D = J.g.indexOf(M);
		if (b.l(KeyboardHandler.Zz)) {
			if (D == -1) {
				J.g.push(M);
				this.ng = !0
			} else J.g.splice(D, 1)
		} else {
			if (D == -1) J.g = [M];
			this.ng = !0
		}
		this.CF = PixelUtil.path.oh(J.i, J.g)
	}
	this.bo = Q;
	this.wN = new gA(Q);
	l.i_ = !0;
	l.uK = !0
};
f.yM.prototype.JP = function(l, d, G, b, V) {
	if (this.bo == null) return;
	var Q = l.u.Zx(V.x, V.y);
	if (this.ng) {
		Q = this.wN.kx(Q, b);
		var t = this.EH;
		if (this.qC == null) {
			this.qC = this.TX = t.add.vmsk.clone();
			this.MD = this.KT = JSON.stringify(t.add.vogk);
			if (b.l(KeyboardHandler.Jm)) {
				var I = this.qC.clone(),
					y = JSON.parse(this.MD),
					e = f.nr.ii(I, y);
				f.nr.zo(e, I, y);
				this.TX = I;
				this.KT = JSON.stringify(y)
			}
		}
		var I = this.TX.clone(),
			y = JSON.parse(this.KT);
		if (this.J7) {
			var M = this.J7,
				R = M[0][0],
				J = PixelUtil.vec.ad(R, Q.x, Q.y);
			I.JG[M[1]] = M[0][1][J];
			var n = R[J * 2],
				r = R[J * 2 + 1],
				T = (R[J * 2 + 2] - n) * (Q.y - r) - (R[J * 2 + 3] - r) * (Q.x - n);
			if (M[2] < 0) T = -T;
			I.as = T > 0
		} else {
			var j = this.CF.clone(),
				g = j.x,
				Y = j.y;
			j.offset(Q.x - this.bo.x, Q.y - this.bo.y);
			j.x = Math.round(j.x);
			j.y = Math.round(j.y);
			var k = f.Pq.wA(l, j, G),
				F = new Matrix2D(1, 0, 0, 1, j.x - g + k[0], j.y - Y + k[1]);
			PixelUtil.path.transformFlatCoords(I.i, F, I.g);
			PixelUtil.X.D(y, PixelUtil.canvas.pu(F), I.g);
			f.Pq.If(l, j, k)
		}
		this.ey(l, t.sy, I, y)
	} else {
		var D = this.bo;
		l.I.Bt = PixelUtil.vec.simplifyPath(new Rect(D.x, D.y, Q.x - D.x, Q.y - D.y));
		l.uK = !0
	}
};
f.yM.prototype.Nl = function(l, d, G, b, V) {
	if (this.bo == null) return;
	var Q = l.u.Zx(V.x, V.y),
		t = this.EH,
		I = t ? t.add.vmsk : null;
	if (this.ng) {
		var y = JSON.stringify(t.add.vogk);
		if (!this.bo.XB(Q)) this.ak(l, "Move Paths", t.sy, this.qC, I, null, this.MD, y);
		if (l != null && l.I.Cj) {
			l.I.Cj = null;
			l.uK = !0
		}
	} else {
		if (I) {
			var e = this.bo,
				M = new Rect(e.x, e.y, Q.x - e.x, Q.y - e.y),
				R = PixelUtil.path.a4s(I.i, M);
			if (b.l(KeyboardHandler.Zz)) {
				for (var A = 0; A < R.length; A++)
					if (I.g.indexOf(R[A]) == -1) I.g.push(R[A])
			} else I.g = R
		}
		l.I.Bt = null;
		l.uK = !0
	}
	this.bo = null;
	this.qC = null;
	this.J7 = null;
	this.ng = !1;
	this.wN = null
};
f.yM.prototype.Ew = function(l, d, G, b) {
	f.nr.prototype.Ew.call(this, l, d, G, b);
	if (G.QN != this.id) return;
	if (l.g.length == 0) return;
	var V = l.LW(),
		Q = V[0],
		t = V[1];
	if (t.length == 0) return;
	var I = Q[t[0]],
		y = I.add.vmsk,
		e = I.add.vstk,
		M = I.add.vogk,
		R = new Action(ActionTypes.E.L, !0);
	R.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		DI: "main",
		N4: y ? y : null,
		X: M
	};
	d.dispatch(R)
};
f.yM.prototype.A0 = function(l, d, G, b, V) {
	var Q = l.X9;
	if (Q.N4) {
		var t = G.LW(),
			I = t[0],
			y = t[1];
		if (y.length == 0) return;
		var e = I[y[0]],
			M = e.add.vmsk.clone(),
			R = JSON.stringify(e.add.vogk),
			J = Q.N4;
		this.ey(G, e.sy, J, Q.X);
		var n = [18, 5];
		if (M.i.length == J.i.length) n = M.g[0] == J.g[0] ? "Fill Rule" : "Path Order";
		this.ak(G, n, e.sy, M, J, null, R, JSON.stringify(Q.X))
	}
};
// Direct Selection Tool (anchor points)
f.ks = function() {
	f.nr.call(this, "Direct Select", f.Kp, "tools/dselect");
	this.R2 = -1;
	this.wI = -1;
	this.jx = null;
	this.bo = null;
	this.EH = null;
	this.qC = null;
	this.MD = null;
	this.v0 = null;
	this.vE = 0;
	this.ZX = {
		psnap: !1
	};
	this.wN = null
};
f.ks.prototype = new f.nr;
f.ks.prototype.Q0 = function(l) {
	return l.oW
};
f.ks.prototype.A0 = function(l) {
	this.ZX = l
};
f.ks.prototype.TA = function(l, d, G, b, V) {
	if (l.a == "crnr") {
		if (G == null) return;
		var Q = G.LW(),
			t = Q[0],
			I = Q[1];
		if (I.length == 0) {
			alert("No paths selected");
			return
		}
		var y = t[I[0]],
			e = y.add.vmsk;
		if (e.OE.length == 0) {
			alert("No corners selected");
			return
		}
		for (var A = 0; A < e.OE.length; A++) {
			var M = e.i[e.OE[A]];
			if (!M.H.XB(M.UU) || !M.H.XB(M.Wf)) {
				alert("Only sharp corners can be rounded");
				return
			}
		}
		if (this.qC == null) {
			this.qC = y.add.vmsk.clone();
			this.MD = JSON.stringify(y.add.vogk);
			this.EH = y;
			this.v0 = G
		}
		var R = new Action(ActionTypes.E.L, !0);
		R.data = {
			a: ActionTypes.$.SN,
			GU: "cornerradius",
			mS: 5,
			Fk: this.aup.bind(this)
		};
		d.dispatch(R)
	} else f.nr.prototype.TA.call(this, l, d, G, b, V)
};
f.ks.prototype.aup = function(l) {
	if (l == "confirm") {
		var d = this.v0,
			G = this.EH,
			b = G.add.vmsk,
			V = G.add.vogk;
		this.ak(d, [12, 94, 0], G.sy, this.qC, b, null, this.MD, JSON.stringify(V));
		this.gC();
		return
	}
	var b = this.qC.clone(),
		V = JSON.parse(this.MD),
		Q = b.OE;
	if (l == "cancel") {} else {
		var t = [];
		for (var A = 0; A < Q.length; A++) {
			var I = Q[A],
				y = PixelUtil.path.dc(b.i, I, !0),
				R = 0;
			if (t.indexOf(y) != -1) continue;
			t.push(y);
			var e = PixelUtil.path.W7(b.i, y, !0),
				M = b.i[e].length,
				J = [];
			for (var n = 0; n < M; n++) {
				var r = b.OE.indexOf(e + n + 1) == -1 ? 0 : l;
				J.push(r);
				if (r != 0) R++
			}
			PixelUtil.path.m9(b.i, e, J);
			for (var n = 0; n < Q.length; n++)
				if (Q[n] > e + M) Q[n] += R
		}
		this.Sm(b, V);
		b.OE = []
	}
	this.ey(this.v0, this.EH.sy, b, V);
	if (l == "cancel") this.gC()
};
f.ks.prototype.disable = function(l, d, G, b) {
	this.GM(l)
};
f.ks.prototype.dJ = function(l, d, G, b, V) {
	this.GM(l);
	var Q = l.u.Zx(V.x, V.y),
		R, J, n;
	this.jx = Q.clone();
	var t = l.LW(),
		I = t[0],
		y = t[1];
	if (y.length == 0) return;
	var e = f.Jo(l, V),
		M = new Rect(Q.x - e, Q.y - e, e * 2, e * 2);
	for (var r = 0; r < y.length; r++) {
		R = this.EH = I[y[r]];
		J = R.add.vmsk;
		n = PixelUtil.path.o1(J.i, M);
		if (n[0].length + n[1].length + n[2].length != 0) break
	}
	var T = [!1, !1, !1];
	for (var A = 0; A < 3; A++) {
		for (var j = 0; j < n[A].length; j++) {
			var g = n[A][j],
				Y = J.i[g];
			if (J.OE.indexOf(g) != -1 || A == 1 && J.OE.indexOf(g - 1) != -1 && !Y.H.XB(Y.Wf) || A == 2 && J.OE.indexOf(g + 1) != -1 && !Y.H.XB(Y.UU)) {
				n[A] = [g];
				T[A] = !0;
				break
			}
		}
	}
	if (n[0].length != 0 && (T[0] || !T[1] && !T[2])) {
		var k = n[0][0],
			F = J.OE.indexOf(k);
		if (b.l(KeyboardHandler.Zz)) {
			if (F == -1) J.OE.push(k);
			else {
				J.OE.splice(F, 1);
				l.uK = !0;
				return
			}
		} else if (F == -1) J.OE = [k];
		this.R2 = k;
		this.wI = 0
	} else if (n[1].length != 0 && T[1]) {
		this.R2 = n[1][0];
		this.wI = 1
	} else if (n[2].length != 0 && T[2]) {
		this.R2 = n[2][0];
		this.wI = 2
	} else {
		var D = PixelUtil.path.Rw(J.i, Q, !0, e);
		if (D.sy == -1) this.bo = Q;
		else {
			J.g = [D.sy];
			J.OE = []
		}
	}
	if (this.qC == null) {
		this.qC = R.add.vmsk.clone();
		this.MD = JSON.stringify(R.add.vogk)
	}
	this.wN = new gA(Q);
	l.uK = !0
};
f.ks.prototype.JP = function(l, d, G, b, V) {
	if (l == null) return;
	var Q = l.u.Zx(V.x, V.y),
		t = this.EH;
	if (this.R2 != -1) {
		var I = this.qC.clone(),
			y = t.add.vogk,
			e = I.i[this.R2];
		e = [e.H, e.Wf, e.UU][this.wI];
		if (b.l(KeyboardHandler.Zz)) {
			if (this.wI == 0) {
				Q = this.wN.kx(Q, b);
				Q.x += e.x - this.jx.x;
				Q.y += e.y - this.jx.y
			} else Q = f.RK.cR(I.i[this.R2].H, Q)
		} else {
			if (this.ZX.psnap) {
				Q.x = Math.round(Q.x);
				Q.y = Math.round(Q.y)
			}
			Q = f.Pq.aM(l, Q, G)
		}
		if (this.wI == 0) {
			var M = new Matrix2D(1, 0, 0, 1, Q.x - e.x, Q.y - e.y);
			PixelUtil.path.transformFlatCoords(I.i, M, null, I.OE)
		} else {
			var R = I.i[this.R2],
				J = R.Wf,
				n = R.UU;
			if (this.wI == 2) {
				J = R.UU;
				n = R.Wf
			}
			if (b.l(KeyboardHandler.Jm) && (R.type == 1 || R.type == 4)) R.type++;
			J.T6(Q.x, Q.y);
			if (R.type == 1 || R.type == 4) {
				var r = Point2D.yZ(J, R.H),
					T = Point2D.yZ(n, R.H);
				if (T != 0) {
					n.x = R.H.x - (J.x - R.H.x) * (T / r);
					n.y = R.H.y - (J.y - R.H.y) * (T / r)
				}
			}
		}
		this.Sm(I, y);
		this.ey(l, t.sy, I, y)
	} else if (this.bo != null) {
		var j = this.bo;
		l.I.Bt = PixelUtil.vec.simplifyPath(new Rect(j.x, j.y, Q.x - j.x, Q.y - j.y));
		l.uK = !0
	} else {
		var g = l.LW(),
			Y = g[0],
			k = g[1],
			t, I, q;
		if (k.length == 0) return;
		var F = f.Jo(l, V),
			D = new Rect(Q.x - F, Q.y - F, F * 2, F * 2);
		for (var H = 0; H < k.length; H++) {
			t = Y[k[H]];
			I = t.add.vmsk;
			q = PixelUtil.path.o1(I.i, D);
			if (q[0].length + q[1].length + q[2].length != 0) break
		}
		this.GM(l);
		for (var A = 0; A < 3; A++) {
			for (var W = 0; W < q[A].length; W++) {
				var Z = q[A][W],
					B = I.i[Z];
				B = A == 0 ? B.H : A == 1 ? B.Wf : B.UU;
				l.I.Qg.push(l.I.g2.length >>> 1);
				l.I.g2.push(B.x, B.y);
				l.uK = !0
			}
		}
	}
};
f.ks.prototype.GM = function(l) {
	if (l && l.I.g2.length != 0) {
		l.I.g2 = [];
		l.I.Qg = [];
		l.uK = !0
	}
};
f.ks.prototype.Nl = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y),
		t = this.EH,
		I = t ? t.add.vmsk : null,
		y = t ? t.add.vogk : null;
	if (this.R2 != -1) {
		if (Date.now() - this.vE < 300) {
			var e = I.i[this.R2],
				M = this.wI,
				R = null;
			if (M == 0) {
				var J = e.Wf.XB(e.H),
					n = e.UU.XB(e.H);
				if (!J && !n) {
					R = "Anchor Type";
					if (e.type == 1 || e.type == 4) e.type++;
					else {
						e.type--;
						e.UU = e.H.add(e.H.gu(e.Wf))
					}
				} else {
					R = "Add Handles";
					if (J && n) {
						e.Wf.x -= 30;
						e.UU.x += 30
					} else if (J) e.Wf = e.H.add(e.H.gu(e.UU));
					else if (n) e.UU = e.H.add(e.H.gu(e.Wf))
				}
			} else {
				R = "Remove Handle";
				if (M == 1) e.Wf.Ac(e.H);
				else e.UU.Ac(e.H)
			}
			this.Sm(I, y);
			this.ey(l, t.sy, I, y);
			this.ak(l, R, t.sy, this.qC, I, null, this.MD, JSON.stringify(y))
		} else if (!this.jx.XB(Q)) {
			this.ak(l, "Drag Anchors", t.sy, this.qC, I, null, this.MD, JSON.stringify(y))
		}
		this.vE = Date.now()
	} else if (this.bo != null) {
		var r = this.bo,
			T = new Rect(r.x, r.y, Q.x - r.x, Q.y - r.y);
		if (T.m < 0) T.x += T.m;
		if (T.n < 0) T.y += T.n;
		T.m = Math.abs(T.m);
		T.n = Math.abs(T.n);
		var j = PixelUtil.path.o1(I.i, T);
		I.OE = j[0].concat(b.l(KeyboardHandler.Zz) ? I.OE : []);
		l.I.Bt = null
	}
	this.gC();
	l.uK = !0
};
f.ks.prototype.gC = function() {
	this.EH = null;
	this.qC = null;
	this.bo = null;
	this.R2 = this.wI = -1;
	this.wN = null
};
f.ks.prototype.Sm = function(l, d) {
	for (var A = 0; A < l.OE.length; A++) {
		var G = PixelUtil.path.dc(l.i, l.OE[A]);
		PixelUtil.X.xy(d, G)
	}
};
f.ks.prototype.o9 = function(l, d, G, b) {
	if (l == null) return;
	var V = l.LW(),
		Q = V[0],
		t = V[1];
	if (t.length == 0) return;
	var I = Q[t[0]],
		y = I.add.vmsk;
	if (y == null || y.OE.length == 0) return;
	var e = I.add.vogk,
		M = JSON.stringify(e),
		R = b._9(l ? l.u.Ay : 0);
	if (R.x != 0 || R.y != 0) {
		var J = y.clone(),
			n = y.clone(),
			r = new Matrix2D(1, 0, 0, 1, R.x, R.y);
		PixelUtil.path.transformFlatCoords(n.i, r, null, n.OE);
		this.Sm(n, e);
		this.ey(l, I.sy, n, e);
		this.ak(l, "Move Anchors", l.g[0], J, n.clone(), !0, M, JSON.stringify(e))
	}
	if (b.l(KeyboardHandler.HD) || b.l(KeyboardHandler.kJ)) this.TA({
		a: "remove",
		S6: !0,
		awx: !0
	}, d, l, b, G)
};
f.ks.prototype.ak = function(l, d, G, b, V, Q, t, I) {
	var y = l.getHeadHistoryState();
	if (Q && y != null && y.G == this && y.data.abl && y.data.b4 == G && JSON.stringify(y.data.x9.OE) == JSON.stringify(b.OE)) {
		y.data.hy = V;
		y.data.Vb = I
	} else {
		var y = new HistoryState(d, this);
		y.data = {
			b4: G,
			x9: b,
			hy: V,
			abl: Q,
			aAo: t,
			Vb: I
		};
		l.pushHistoryState(y)
	}
};
// Rectangle Shape Tool
f.Rect = function() {
	f.Ga.call(this, "Rectangle", f.LI, "tools/rect", !0)
};
f.Rect.prototype = new f.Ga;
f.Rect.prototype.Vj = function(l, d, G) {
	var b = this.HS.crad,
		V = d.x - l.x,
		Q = d.y - l.y;
	return [PixelUtil.path.shapes.rect(l.x, l.y, V, Q, b), PixelUtil.X.XU("Rctn", [l.x, l.y, d.x, d.y], [b, b, b, b])]
};
// Ellipse Shape Tool
f.am = function() {
	f.Ga.call(this, "Ellipse", f.Rn, "tools/ellipse", !0)
};
f.am.prototype = new f.Ga;
f.am.prototype.Vj = function(l, d, G) {
	var b = d.x - l.x,
		V = d.y - l.y;
	return [PixelUtil.path.shapes.ellipse(l.x, l.y, b, V), PixelUtil.X.XU("Elps", [l.x, l.y, d.x, d.y])]
};
// Parametric Shape Tool
f.EU = function() {
	f.Ga.call(this, "Parametric Shape", f.OZ, "tools/pshape", !1);
	this.HS.aopts = [!1, !0, 50, 100, 0]
};
f.EU.prototype = new f.Ga;
f.EU.prototype.Vj = function(l, d, G) {
	var b = this.HS.pshape,
		V = this.HS.crad,
		Q = this.HS.irad / 100,
		t = this.HS.sides,
		I = this.HS.width,
		y = this.HS.aopts,
		e = this.HS.length,
		j;
	d = d.clone();
	var M = l.x,
		R = l.y,
		J = d.x,
		n = d.y,
		r = Math.sqrt((J - M) * (J - M) + (n - R) * (n - R)),
		T = Math.atan2(-n + R, J - M);
	if (G) T = Math.round(T * 180 / Math.PI / 15) * 15 * Math.PI / 180;
	if (b == 0) j = PixelUtil.path.shapes.polygon(M, R, r, T, t, V);
	if (b == 1) j = PixelUtil.path.shapes.star(M, R, r, T, t, V, Q);
	if (b == 2) j = PixelUtil.path.shapes.lineWeighted(l.x, l.y, d.x, d.y, I, y);
	if (b == 3) j = PixelUtil.path.shapes.pieWedge(M, R, r, T, e);
	return [j, PixelUtil.X.XU("customShape", [l.x, l.y, d.x, d.y], null, null, null, "--")]
};
f.EU.prototype.o9 = function(l, d, G, b) {
	f.Ga.prototype.o9.call(this, l, d, G, b);
	var V = b._9(),
		Q = this.HS,
		t, I;
	if (V.y != 0) {
		var y = -V.y,
			e = Q.pshape;
		if (e < 2) {
			t = "sides";
			I = Math.max(3, Math.min(100, Q.sides + y))
		} else if (e == 2) {
			t = "width";
			I = Math.max(1, Math.min(100, Q.width + y))
		} else if (e == 3) {
			t = "length";
			I = Math.max(4, Math.min(40, Q.length + y))
		}
	}
	if (V.x != 0) {
		t = "pshape";
		I = Math.max(0, Math.min(3, Q.pshape + V.x))
	}
	if (t) {
		var M = new Action(ActionTypes.E.L, !0),
			R = {};
		R[t] = I;
		Q[t] = I;
		M.data = {
			a: ActionTypes.$.vq,
			G: this.id,
			y3: "vals",
			ajy: R
		};
		d.dispatch(M);
		this.JP(l, d, G, b)
	}
};
// Line Shape Tool
f.pB = function() {
	f.Ga.call(this, "Line", f.MO, "tools/line", !1)
};
f.pB.prototype = new f.Ga;
f.pB.prototype.Vj = function(l, d, G) {
	var b = this.HS.width,
		V = this.HS.aopts;
	d = d.clone();
	if (G) {
		d = f.RK.cR(l, d)
	}
	return [PixelUtil.path.shapes.lineWeighted(l.x, l.y, d.x, d.y, b, V), PixelUtil.X.XU("Ln", null, null, [l.x, l.y, d.x, d.y], b, null, V)]
};
// Custom Shape Tool
f.sQ = function() {
	f.Ga.call(this, "Custom Shape", f.YL, "tools/cshape", !0)
};
f.sQ.prototype = new f.Ga;
f.sQ.prototype.Vj = function(l, d, G) {
	var b = this.HS.shape,
		V = b.W5.m / b.W5.n,
		Q = LayerRecord.VectorMask.FT(b.i);
	d = d.clone();
	if (G) {
		d.y = l.y + (d.x - l.x) / V
	}
	var t = d.x - l.x,
		I = d.y - l.y;
	PixelUtil.path.transformFlatCoords(Q, new Matrix2D(t, 0, 0, I, l.x, l.y));
	return [Q, PixelUtil.X.XU("customShape", [l.x, l.y, d.x, d.y], null, null, null, b.GC)]
};
// Base class for transform tools (bounding-box UI)
f.NH = function(l, d, G) {
	f.AbstractTool.call(this, l, d, G);
	this.vO = 0;
	this.B = null;
	this.fm = null;
	this.wQ = null;
	this.Nq = 1;
	this.Xy = !0;
	this.Ap = !1;
	this.cursor = null;
	this.ap = null;
	this.Sd = null;
	this.Un = !1;
	this.bg = null;
	this.a4c = 0;
	this.ty = null;
	this.WV = 0;
	this.CQ = null;
	this.JD = null;
	this.oF = null;
	this.Pv = null;
	this.adb = null;
	this.tC = null
};
f.NH.prototype = new f.AbstractTool;
f.NH.Lg = function(l, d, G) {
	var b = {
		classID: "null",
		null: PsdDescriptorHelper.Fw(G ? "Lyr" : "Dcmn", !0)
	};
	if (l) b.Angl = {
		t: "UntF",
		v: {
			type: "#Ang",
			val: d
		}
	};
	else b.Axis = {
		t: "enum",
		v: {
			Ornt: d
		}
	};
	return {
		kT: l ? "rotateEventEnum" : "flip",
		a0: b
	}
};
f.NH.prototype.h_ = function(l, d, G, b, V) {
	var Q = new Action(ActionTypes.E.L, !0);
	Q.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		Zm: V,
		T1: l,
		wQ: G
	};
	d.dispatch(Q);
	this.zg = !1
};
f.NH.prototype.Q0 = function(l) {
	return this.JD && this.JD.aq5()
};
f.NH.prototype.TA = function(l, d, G, b, V) {
	this.wQ = V;
	if (l.a == "again" && this.ty == null) return;
	if (!this.Py(G, V)) return;
	if (this.JD) {
		this.adN(l, this.JD.mr(), d, G, b, V);
		this.oa(G, V, 0, !0);
		this.Oc(G);
		return
	}
	this.abx(G, l.j == null, l.j);
	this.ahK(G);
	this.adN(l, l.ajS, d, G, b, V);
	this.kF(G, d, l.Il, !1)
};
f.NH.prototype.adN = function(l, d, G, b, V, Q) {
	var t = this.CQ;
	if (d == null) {
		var I = l.BL != null ? l.BL : 4;
		d = this.JD.at1()[I]
	}
	var y = d.x,
		e = d.y;
	if (l.a == "rot" && l.Z != Math.PI && (t.m + t.n & 1) == 1) {
		y = Math.floor(y);
		e = Math.floor(e)
	}
	var M = new Matrix2D;
	M.translate(-y, -e);
	if (l.a == "rot") M.rotate(l.Z);
	if (l.a == "scl") M.scale(l.Z.x, l.Z.y);
	if (l.a == "mat") M.concat(l.Z);
	M.translate(y, e);
	if (l.a == "again") M = this.ty;
	var R = PixelUtil.canvas.pu(M);
	if (l.a == "dtr") {
		var J = PixelUtil.canvas;
		R = J.mY(l.Z, J.Q(-y, -e));
		R = J.mY(J.Q(y, e), R)
	}
	var n = this.JD.Pn();
	PixelUtil.canvas.D(R, n);
	this.JD.wc(n);
	if (l.cB) {
		var r = l.cB.v;
		this.A0({
			DI: "switchWarp"
		}, G, b, V);
		this.A0({
			DI: "wrp",
			cB: r
		}, G, b, V)
	}
};
f.NH.prototype.in = function() {
	return !0
};
f.NH.prototype.Py = function(l, d) {
	if (l == null) return !1;
	if (this.id == f.tr) return l.P != null;
	var G = l.OM(!0, null, null, !0);
	if (this.id == f.Z5 && l.B[G[0]].rect.W6()) {
		alert("Layer is empty.");
		return !1
	}
	for (var A = 0; A < G.length; A++) {
		var b = l.B[G[A]];
		if (b.Ka(2) || b.Ka(31)) {
			alert("This layer is Locked.");
			return !1
		}
		if (b.add.artb) {
			alert("You can not transform the whole artboard");
			return !1
		}
		if (b.add.TySh)
			if (!StyleHelper.textLayerFontsAvailable(b.add.TySh, d.Hg)) return !1;
		if (b.add.SoLd) {
			if (G.length == 1 && !PixelUtil.textWarp.T9(b.add.SoLd.warp.v) && (b.c3() && b.c3().cv || b.add.vmsk && b.add.vmsk.cv)) {
				alert("Unlink masks before transforming Smart Object");
				return !1
			}
			if (!l.akz(b.add.SoLd.Idnt.v)) {
				alert("Unsupported format of the smart object (" + l.Lu(b.add.SoLd.Idnt.v).bf + ")");
				return !1
			}
		}
	}
	if (l.P == null) return !0;
	if (!l.T8()) return !1;
	return l.acG()
};
f.NH.prototype.dJ = function(l, d, G, b, V) {
	var Q = this.anw(V, l),
		t = Q[0],
		I = Q[1],
		y = this.WV == 0 ? this.JD : this.oF;
	l.u.N *= I;
	this.Ap = y.dJ(l, G, b, t, null, null, V);
	l.u.N /= I;
	if (this.Ap && y.yo(t)) {
		if (Date.now() - this.a4c < 250) this.kF(l, d, null, !0);
		this.a4c = Date.now()
	}
};
f.NH.prototype.ed = function(l) {
	var d = new Action(ActionTypes.E.L, !0);
	d.data = {
		a: ActionTypes.$.e5,
		ew: this.cursor
	};
	l.dispatch(d)
};
f.NH.prototype.anw = function(l, d) {
	var G = 1;
	l = d.u.Zx(l.x, l.y);
	if (this.WV == 1) {
		var b = PixelUtil.canvas.eP(this.JD.Pn(), this.CQ);
		G = PixelUtil.canvas.cX(b).Nw();
		var V = PixelUtil.canvas.hI(b);
		l = PixelUtil.canvas.acb(V, l)
	}
	return [l, G]
};
f.NH.prototype.JP = function(l, d, G, b, V) {
	var Q = this.anw(V, l),
		t = Q[0],
		I = Q[1],
		y = this.WV == 0 ? this.JD : this.oF;
	if (!V.oW) {
		var e = "default";
		if (y) {
			var M = y.Rg(t, l.u.N * I, null, V);
			if (M) e = M
		}
		if (e != this.cursor) {
			this.cursor = e;
			this.ed(d)
		}
	}
	if (!this.Ap) return;
	l.u.N *= I;
	y.JP(l, G, b, t, this.Xy);
	l.u.N /= I;
	this.oa(l, G, 0, !0);
	this.Oc(l);
	this.se(d)
};
f.NH.prototype.Nl = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y);
	this.JD.Nl(l, G, b, Q);
	this.Ap = !1
};
f.NH.prototype.o9 = function(l, d, G, b) {
	if (b.l(KeyboardHandler.lm)) this.kF(l, d, null, !0);
	else if (b.l(KeyboardHandler.mp)) this.Ht(l, d);
	else {
		var V = this.JD.o9(l, G, b);
		if (V) {
			this.oa(l, G, 0, !0);
			this.se(d)
		}
	}
};
f.NH.prototype.A0 = function(l, d, G, b) {
	if (l.DI == "commit") this.kF(G, d, null, !0);
	else if (l.DI == "cancel") this.Ht(G, d);
	else if (l.DI == "switchWarp") {
		this.WV = 1 - this.WV;
		this.a6y();
		this.Oc(G);
		this.se(d)
	} else if (l.DI == "wrp") {
		this.oF.aiS(l.cB);
		this.Oc(G);
		this.oa(G, this.wQ, 0, !0)
	} else if (l.DI == "ctyp") {
		this.JD.ave(l.eD);
		this.Oc(G);
		this.se(d)
	} else if (l.DI == "cen") {
		this.JD.ajb(l.Vl);
		this.Oc(G);
		this.oa(G, this.wQ, 0, !0)
	} else if (l.DI == "trn") {
		var V = PixelUtil.canvas.pu(l.p7),
			Q = this.CQ,
			t = PixelUtil.canvas.eP(this.JD.Pn(), this.CQ);
		V[6] = t[6], V[7] = t[7];
		var I = [Q.x, Q.y, Q.x + Q.m, Q.y, Q.x + Q.m, Q.y + Q.n, Q.x, Q.y + Q.n];
		PixelUtil.canvas.D(V, I);
		this.Nq = l.Nq;
		this.Xy = l.Xy;
		this.JD.wc(I);
		this.Oc(G);
		this.oa(G, this.wQ, 0, !0)
	}
};
f.NH.prototype.Oc = function(l) {
	if (this.WV == 0) this.JD.cN(l, this.wQ);
	else {
		this.oF.cN(l);
		var d = PixelUtil.canvas.eP(this.JD.Pn(), this.CQ);
		PixelUtil.canvas.D(d, l.I.Bt.C);
		PixelUtil.canvas.D(d, l.I.jf)
	}
};
f.NH.prototype.kF = function(l, d, G, b) {
	this.oa(l, this.wQ, this.Nq);
	var V = new HistoryState(G ? G : this.name, this),
		g = "";
	if (this.vO == 0) V.data = {
		type: this.vO,
		B: this.B,
		bg: this.fm,
		SQ: f.NH.RL(l, this.B)
	};
	else if (this.vO == 1) {
		var Q = l.B[this.B[0]],
			t;
		if (Q.IB.ht <= 0) {
			t = PixelUtil.allocBytes(Q.IB.cG.O());
			PixelUtil.extractChannelFromRgba(Q.IB.o7, t, 3)
		} else t = l.P.channel;
		var I = {
			rect: Q.IB.cG.clone(),
			channel: t
		};
		V.data = {
			type: this.vO,
			j: this.B[0],
			Sd: this.Sd,
			le: I,
			ap: this.ap,
			Un: this.Un,
			IB: Q.IB,
			bg: this.bg,
			SQ: {
				vD: Q.IB.cG,
				XO: Q.IB.o7
			}
		}
	} else if (this.vO == 2) {
		V.data = {
			type: this.vO,
			Sd: this.Sd,
			le: {
				rect: l.P.rect.clone(),
				channel: l.P.channel.slice(0)
			}
		}
	}
	l.pushHistoryState(V);
	var y = this.CQ,
		e = PixelUtil.canvas.eP(this.JD.Pn(), y),
		M = PixelUtil.canvas.cX(e),
		R = this.JD.mr(),
		J = new Matrix2D;
	J.translate(R.x, R.y);
	J.concat(M);
	J.translate(-R.x, -R.y);
	M = J.clone();
	var n = -Math.atan2(-M.k, M.aS),
		r = new Matrix2D;
	r.rotate(n);
	M.concat(r);

	function T(q, H) {
		return {
			t: "UntF",
			v: {
				type: ["#Pxl", "#Prc", "#Ang"][H],
				val: q
			}
		}
	}
	var j = PsdDescriptorHelper.Fw("Lyr", !0);
	if (this.id == f.tr) j.v[0] = {
		t: "prop",
		v: {
			classID: "Chnl",
			keyID: "fsel"
		}
	};
	var Y = f.NH.aiA;
	for (var k in Y)
		if (Y[k] == this.JD.MB) g = k;
	if (g == "") {
		g = "Qcsi";
		J.cI = J.xu = 0
	}
	var F = {
		classID: "null",
		null: j,
		FTcs: {
			t: "enum",
			v: {
				QCSt: g
			}
		},
		Intr: {
			t: "enum",
			v: {
				Intp: "Bcbc"
			}
		},
		Ofst: {
			t: "Objc",
			v: {
				__name: "Offset",
				classID: "Ofst",
				Hrzn: T(J.cI, 0),
				Vrtc: T(J.xu, 0)
			}
		},
		Skew: {
			t: "Objc",
			v: {
				classID: "Pnt",
				Hrzn: T(Math.atan(M.S5 / M.Qd) * 180 / Math.PI, 2),
				Vrtc: T(0, 2)
			}
		},
		Usng: {
			t: "Objc",
			v: {
				classID: "Pnt",
				Hrzn: T(100 * 0, 1),
				Vrtc: T(100 * 0, 1)
			}
		},
		Wdth: T(M.aS * 100, 1),
		Hght: T(M.Qd * 100, 1),
		Angl: T(n * 180 / Math.PI, 2)
	};
	if (g == "Qcsi") F.Pstn = {
		t: "Objc",
		v: {
			Hrzn: T(R.x, 0),
			Vrtc: T(R.y, 0)
		}
	};
	var D = this.oF ? this.oF.sl() : null;
	if (D && !PixelUtil.textWarp.T9(D)) {
		F.warp = {
			t: "Objc",
			v: D
		}
	}
	this.QF = d;
	this.track({
		kT: "transform",
		a0: F
	});
	this.escape(l, d, b)
};
f.NH.aiA = {
	Qcsa: 4,
	Qcs0: 0,
	Qcs1: 2,
	Qcs2: 8,
	Qcs3: 6,
	Qcs4: 1,
	Qcs5: 5,
	Qcs6: 7,
	Qcs7: 3
};
f.NH.prototype.Ht = function(l, d) {
	if (this.vO == 0) f.NH.Vk(l, this.B, this.fm);
	else if (this.vO == 1) {
		var G = l.B[this.B[0]];
		l.P = this.Sd;
		if (!this.Un) {
			G.IB.cG = this.bg.vD;
			G.IB.o7 = this.bg.XO;
			G.OX(l, 0, 0, l.P)
		} else {
			G.A6(l, this.ap)
		}
		l.U();
		l.Of = !0
	} else if (this.vO == 2) {
		l.P = this.Sd;
		l.Of = !0
	}
	this.escape(l, d, !0)
};
f.NH.prototype.escape = function(l, d, G) {
	this.JD.clear(l);
	this.JD = null;
	this.oF = null;
	this.tC = null;
	this.WV = 0;
	if (G) this.rv(d, ActionTypes.E.L, {
		a: ActionTypes.$.PN
	})
};
f.NH.prototype.applyRedo = function(l, d) {
	if (l.type == 0) f.NH.Vk(d, l.B, l.SQ);
	else {
		if (l.type == 1) {
			var G = d.B[l.j];
			if (l.Un) {
				G.IB = l.IB
			} else {
				G.IB.cG = l.SQ.vD;
				G.IB.o7 = l.SQ.XO
			}
			G.OX(d, 0, 0, d.P);
			d.U()
		}
		d.P = {
			rect: l.le.rect.clone(),
			channel: l.le.channel.slice(0)
		};
		d.Of = !0
	}
};
f.NH.prototype.applyUndo = function(l, d) {
	if (l.type == 0) f.NH.Vk(d, l.B, l.bg);
	else {
		if (l.type == 1) {
			var G = d.B[l.j];
			if (l.Un) {
				G.A6(d, l.ap)
			} else {
				G.IB.cG = l.bg.vD;
				G.IB.o7 = l.bg.XO;
				G.OX(d, 0, 0, d.P)
			}
			d.U()
		}
		d.P = l.Sd;
		d.Of = !0
	}
};
f.NH.prototype.abx = function(l, d, G) {
	l.LW();
	var b = [];
	if (G == null)
		for (var A = 0; A < l.yK.length; A++)
			if (l.t_[l.yK[A]].add.vmsk.i.length > 2) b.push(-1 - l.yK[A]);
	var V = [],
		Q = l.u.MX;
	if (Q[0] + Q[1] + Q[2] == 3)
		if (G != null || b.length == 0 || l.jP != null && l.jP.length != 0) {
			if (l.g.length == 1) {
				var t = l.B[l.g[0]];
				if (t.IQ() && t.VM) V = [l.g[0]]
			}
			if (V.length == 0) V = l.OM(d, G, null, !0)
		}
	V = V.concat(b);
	for (var A = 0; A < l.FB.length; A++) V.push(-1e3 - l.FB[A]);
	this.B = V
};
f.NH.prototype.enable = function(l, d, G, b, V, Q) {
	if (this.cursor == null) this.cursor = "default";
	this.ed(d);
	if (this.JD) return;
	this.wQ = G;
	this.abx(l, !0);
	this.ahK(l, Q && Q.fz != null && Q.fz != -1 ? Q.fz : null);
	this.se(d);
	this.Oc(l);
	if (Q && Q.fz == -1) this.A0({
		DI: "switchWarp"
	}, d, l, b)
};
f.NH.prototype.v2 = function() {
	return [this.Xy ? 1 : 0]
};
f.NH.prototype.j6 = function(l, d, G) {
	if (l && l[0] != null) this.Xy = l[0] == 1
};
f.NH.prototype.se = function(l) {
	var d = {
		a: ActionTypes.$.vq,
		G: this.id
	};
	if (this.WV == 0) {
		var G = PixelUtil.canvas.eP(this.JD.Pn(), this.CQ),
			b = PixelUtil.canvas.cX(G);
		d.p7 = {
			lV: b,
			eD: this.JD.adI(),
			Vl: this.JD.mr(),
			vD: this.CQ.clone(),
			Xy: this.Xy
		}
	} else {
		d.cB = this.oF.sl()
	}
	d.aaq = this.oF != null;
	this.rv(l, ActionTypes.E.L, d)
};
f.NH.prototype.ahK = function(l, d) {
	var G = this.id == f.tr,
		b = !0,
		V = this.B[0],
		Q = l.B[V],
		I = null,
		y = null;
	if (G) {
		this.vO = 2;
		this.Sd = l.P
	} else if (l.P && this.B.length == 1 && V >= 0 && !Q.rect.W6()) {
		this.vO = 1;
		this.Sd = l.P;
		this.ap = Q.IB;
		this.Un = !1;
		if (!Q._l(l, l.P)) {
			this.Un = !0;
			Q.Ep(l, l.P, !1)
		}
		this.bg = {
			XO: Q.IB.o7,
			vD: Q.IB.cG
		}
	} else {
		this.vO = 0;
		this.fm = f.NH.RL(l, this.B, null);
		for (var A = 0; A < this.fm.length; A++)
			if (this.fm[A][3] != null) b = !1
	}
	var t = this.vO == 1;
	if (this.fm && this.fm.length == 1) {
		var e = this.fm[0];
		if (e[2] != null && e[2].X) {
			var M = e[2].N4.g;
			if (M.length < 2) {
				y = e[2].X[M.length == 0 ? 0 : M[0]].v;
				if (!PixelUtil.X.TJ(y)) y = null
			}
		}
		if (e[3] == null) t = !0;
		if (e[4] != null) {
			I = l.B[this.B[0]].add.SoLd;
			if (e[1] || e[2]) t = !1
		}
	}
	var R = G ? l.P.rect.clone() : f.NH.Pa(l, this.B);
	this.CQ = R;
	if (!G && I) {
		var J = f.NH.DO(I.nonAffineTransform);
		this.CQ = PixelUtil.vec.boundingBox(PixelUtil.textWarp.js(I.warp.v));
		if (t) this.oF = new ht(I.warp.v);
		this.Pv = PixelUtil.canvas.eP(J, this.CQ);
		this.JD = new gG(J, !0, !0, b, !1, !1, d)
	} else {
		if (t || G) this.oF = new ht(PixelUtil.textWarp.Q(this.CQ));
		this.Pv = [1, 0, 0, 0, 1, 0, 0, 0];
		if (this.id == f.Z5) d = 3;
		this.JD = new gG([R.x, R.y, R.x + R.m, R.y, R.x + R.m, R.y + R.n, R.x, R.y + R.n], !0, !0, b, !1, !1, d)
	}
	this.adb = [1, 0, 0, 0, 1, 0, 0, 0];
	if (this.id == f.Z5) {
		var n, r;
		if (this.fm) {
			var T = this.fm[0][0],
				j = T.rV;
			n = j[0];
			r = j[1]
		} else if (this.bg) {
			n = this.bg.XO;
			r = this.bg.vD
		}
		this.tC = PixelUtil.UR.anH(n, r.m, r.n)
	}
};
f.NH.Pa = function(l, d) {
	if (d == null) d = l.OM(!0, null, null, !0);
	var G = new Rect,
		b = new Rect;
	if (l.P && d.length == 1 && d[0] >= 0) G = l.P.rect.clone();
	else
		for (var A = 0; A < d.length; A++) {
			var V = d[A],
				Q = 0 <= V ? l.B[V] : -1e3 < V ? l.t_[-1 - V] : l.vj[-1e3 - V],
				t = Q.add ? Q.add.vmsk : null,
				I = 0 <= V ? Q.VR(l, d.length == 1, !1, !0) : -1e3 < V ? PixelUtil.path.oh(t.i, d.length == 1 && t.g.length != 0 ? t.g : null) : Q.rect.clone();
			G = G.Cw(I);
			if (V > 0 && Q.add.artb) b = b.Cw(Q.dA())
		}
	return !b.W6() ? b : G
};
f.NH.prototype.rv = function(l, d, G, b) {
	var V = new Action(d, !0);
	V.data = G;
	if (b) V.G = b;
	l.dispatch(V)
};
f.NH.RL = function(l, d, G) {
	var b = [];
	for (var A = 0; A < d.length; A++) {
		var V = d[A],
			Q, t;
		if (V >= 0) {
			Q = l.B[V];
			t = Q.fV(l, G, !0)
		} else if (V > -1e3) {
			Q = l.t_[-1 - V];
			t = [2]
		} else {
			b.push([null, null, null, null, null, null, null, l.vj[-1e3 - V].clone()]);
			continue
		}
		var I = [],
			y = t.indexOf(0) != -1;
		if (y) {
			var e = {
				rV: Q.add.SoLd ? null : [Q.buffer.slice(0), Q.rect.clone()]
			};
			I.push(e);
			if (Q.aW()) {
				var M = Q.vZ(l);
				e.aoH = M.buffer.slice(0);
				e.a7w = M.rect.clone()
			}
		} else I.push(null);
		if (t.indexOf(1) != -1) I.push(Q.c3().clone());
		else I.push(null);
		if (t.indexOf(2) != -1) I.push({
			N4: Q.add.vmsk.clone(),
			JC: Q.add.vstk ? JSON.parse(JSON.stringify(Q.add.vstk)) : null,
			rU: Q.add.vstk ? f.nr.wR(l, V) : null,
			X: Q.add.vogk ? JSON.parse(JSON.stringify(Q.add.vogk)) : null
		});
		else I.push(null);
		if (Q.add.TySh && y) {
			dt.Sz(Q.add.TySh);
			I.push(Q.add.TySh.D.clone())
		} else I.push(null);
		if (Q.add.SoLd && y) I.push(JSON.parse(JSON.stringify(Q.add.SoLd)));
		else I.push(null);
		if (t.indexOf(3) != -1) I.push(Q.vZ(l).z.clone());
		else I.push(null);
		if (Q.add.lmfx) I.push(JSON.stringify(Q.add.lmfx));
		else I.push(null);
		b.push(I)
	}
	return b
};
f.NH.Vk = function(l, d, G) {
	for (var A = 0; A < d.length; A++) {
		var b = d[A],
			V = 0 <= b ? l.B[b] : -1e3 < b ? l.t_[-1 - b] : l.vj[-1e3 - b],
			Q = G[A];
		if (Q[0]) {
			if (Q[0].rV) {
				V.rect = Q[0].rV[1].clone();
				V.buffer = Q[0].rV[0].slice(0)
			}
			if (V.aW()) {
				var t = V.vZ(l);
				t.buffer = Q[0].aoH.slice(0);
				t.rect = Q[0].a7w.clone()
			}
		}
		if (Q[1]) {
			V.c3().channel = Q[1].channel.slice(0);
			V.c3().rect = Q[1].rect.clone();
			V.c3().y1 = !0
		}
		if (Q[2]) {
			V.add.vmsk = Q[2].N4.clone();
			if (Q[2].rU) f.nr.S2(V, Q[2].rU);
			if (Q[2].JC) V.add.vstk = JSON.parse(JSON.stringify(Q[2].JC));
			if (Q[2].X) V.add.vogk = JSON.parse(JSON.stringify(Q[2].X))
		}
		if (Q[3]) {
			V.add.TySh.D = Q[3].clone();
			dt.MT(V.add.TySh)
		}
		if (Q[4]) {
			V.add.SoLd = JSON.parse(JSON.stringify(Q[4]))
		}
		if (Q[5]) {
			var I = V.vZ(l).z;
			I.channel = Q[5].channel.slice(0);
			I.rect = Q[5].rect.clone()
		}
		if (Q[6]) {
			V.add.lmfx = JSON.parse(Q[6])
		}
		if (Q[7]) {
			V.channel = Q[7].channel.slice(0);
			V.rect = Q[7].rect.clone();
			V.y1 = !0
		}
		if (0 <= b) {
			V.QJ(l);
			V.U();
			if (Q[4]) V.kX(l, !1)
		}
	}
	l.U()
};
f.NH.tF = function(l, d, G, b, V, Q, t, I, y, e) {
	if (typeof Q[0] == "number") {
		var M = [];
		for (var A = 0; A < G.length; A++) M[A] = Q;
		Q = M
	}
	for (var A = 0; A < G.length; A++) {
		var R = Q[A],
			J = PixelUtil.canvas.cX(R),
			n = J.Nw(),
			r = G[A],
			T = 0 <= r ? l.B[r] : -1e3 < r ? l.t_[-1 - r] : l.vj[-1e3 - r],
			j = b[A];
		if (T.add && T.add.lmfx && I) PatternHelper.es(T.add.lmfx, n);
		if (j[0] && !j[3] && !j[4] && !j[5]) {
			var g = j[0].rV;
			if (y) {
				var Y = y.clone(),
					k = PixelUtil.allocBytes(Y.O() * 4);
				PixelUtil.blitRgbaRect(g[0], g[1], k, Y);
				g = [k, Y]
			}
			var F = f.NH.cY(g, V, R, t, V == 0 ? T.buffer.buffer : null, null, null, e);
			if (F) {
				T.rect = F.rect;
				T.buffer = F.buffer
			}
		}
		if (j[1]) {
			var D = T.c3();
			f.NH.mW(l, j[1], D, V, R, t, D.cv && t && !PixelUtil.textWarp.T9(t) && j[0] ? j[0].rV[1] : null);
			if (y) {
				var Y = T.rect.wD(y),
					q = PixelUtil.allocBytes(Y.O());
				PixelUtil.copyBufferRect(D.channel, D.rect, q, Y);
				D.channel = q;
				D.rect = Y
			}
		}
		if (j[2]) {
			var H = t && !PixelUtil.textWarp.T9(t),
				W = j[2].N4.clone(),
				Z = G.length == 1 && W.g.length != 0,
				B = G.length == 1 && W.OE.length > 1;
			if (B) Z = !1;
			var a = Z ? W.g : null,
				m = B ? W.OE : null;
			if (H) {
				var p = PixelUtil.textWarp.js(t);
				PixelUtil.canvas.D(R, p);
				PixelUtil.path.a05(W.i, p, a, m)
			} else PixelUtil.path.an_(W.i, R, a, m);
			if (T.add.vstk && I) {
				T.add.vstk.strokeStyleLineWidth.v.val = j[2].JC.strokeStyleLineWidth.v.val * n;
				var c = j[2].rU;
				if (c && c.hA == 3) {
					c = JSON.parse(JSON.stringify(c));
					var v = c.rU.phase.v;
					c.rU.Scl.v.val = Math.round(c.rU.Scl.v.val * n);
					v.Hrzn.v = Math.round(v.Hrzn.v * n);
					v.Vrtc.v = Math.round(v.Vrtc.v * n);
					f.nr.S2(T, c)
				}
			}
			if (T.add.vogk) {
				T.add.vogk = JSON.parse(JSON.stringify(j[2].X));
				if (H || B) PixelUtil.X.Dv(T.add.vogk);
				else PixelUtil.X.D(T.add.vogk, R, G.length > 1 ? [] : W.g, I)
			}
			W.Vx *= n;
			T.add.vmsk = W;
			if (T.add.vogk) PixelUtil.X.ry(T.add.vogk, T.add.vmsk)
		}
		if (j[3]) {
			var i = j[3].clone();
			i.concat(J);
			T.add.TySh.D = i;
			dt.MT(T.add.TySh);
			StyleHelper.updateLayerTextStyle(T, d.Hg)
		}
		if (j[4]) {
			var z = T.add.SoLd,
				P = f.NH.DO(j[4].nonAffineTransform);
			PixelUtil.canvas.D(R, P);
			var C = PixelUtil.vec.flattenPath(P);
			if (gG.LQ(P)) {
				if (t) {
					var h = PixelUtil.vec.boundingBox(PixelUtil.textWarp.js(j[4].warp.v)),
						q = PixelUtil.canvas.eP(P, h),
						L = PixelUtil.vec.boundingBox(PixelUtil.textWarp.js(t));
					P = [L.x, L.y, L.x + L.m, L.y, L.x + L.m, L.y + L.n, L.x, L.y + L.n];
					PixelUtil.canvas.D(q, P);
					z.warp.v = t
				}
				var U = PixelUtil.canvas.eP(P),
					S = P;
				if (!PixelUtil.canvas.Ue(U)) {
					U[6] = U[7] = 0;
					S = [0, 0, 1, 0, 1, 1, 0, 1];
					PixelUtil.canvas.D(U, S)
				}
				z.Trnf = f.NH.gx(S);
				z.nonAffineTransform = f.NH.gx(P);
				if (z.filterFX) z.filterFX = JSON.parse(JSON.stringify(j[4].filterFX));
				f.NH.asF(z, J);
				T.kX(l, V == 0, d.Hg)
			}
		}
		if (j[5]) f.NH.mW(l, j[5], T.vZ(l).z, V, R, t);
		if (j[7]) f.NH.mW(l, j[7], T, V, R, t);
		if (0 <= r) {
			if (V != 0) T.ww();
			T.QJ(l);
			T.U()
		}
	}
	l.U()
};
f.NH.aie = function(l, d) {
	var G = d.Nw(),
		b = 0;
	PixelUtil.pyramidDownsampleMask(l);
	while (G < .45 && b < l.length - 4) {
		b += 2;
		G *= 2;
		var V = new Matrix2D;
		V.scale(2, 2);
		V.concat(d);
		d = V
	}
	var Q = l[b],
		t = l[b + 1],
		I = t.m,
		y = t.n,
		e = PixelUtil.vec.simplifyPath(t).C;
	PixelUtil.vec.transformCoords(e, d, e);
	var M = PixelUtil.vec.flattenPath(e),
		R = PixelUtil.allocBytes(M.O()),
		J = M.x,
		n = M.y,
		r = M.m,
		T = M.n,
		j = d.clone();
	j.hI();
	var g = j.kD(new Point2D(0, 0)),
		Y = j.kD(new Point2D(1, 0)),
		k = Y.x - g.x,
		F = Y.y - g.y,
		D = I - .51,
		q = y - .51;
	for (var H = 0; H < T; H++) {
		var W = j.aS * (J + .5) + j.S5 * (H + n + .5) + j.cI,
			Z = j.k * (J + .5) + j.Qd * (H + n + .5) + j.xu;
		for (var B = 0; B < r; B++) {
			if (W < .5 || W > D || Z < .5 || Z > q) {} else R[H * r + B] = Math.floor(.5 + PixelUtil.canvas.awm(W, Z, Q, I, y));
			W += k;
			Z += F
		}
	}
	return {
		rect: M,
		channel: R
	}
};
f.NH.eJ = function(l, d, G, b, V, Q) {
	if (G == null) G = !1;
	return f.NH.cY(l, G ? 0 : 1, PixelUtil.canvas.pu(d), null, b, V, Q, G)
};
f.NH.cY = function(l, d, G, b, V, Q, t, I) {
	if (I == null) I = !1;
	if (I && t) throw "e";
	var y = {},
		J = 0,
		n = .3;
	if (b && !PixelUtil.textWarp.T9(b)) {
		var e = PixelUtil.textWarp.js(b);
		PixelUtil.canvas.D(G, e);
		y.rect = PixelUtil.vec.flattenPath(e);
		y.buffer = PixelUtil.allocBytes(y.rect.O() * 4);
		PixelUtil.Xp.drawImage(e, l[0], l[1].m, l[1].n, y.buffer, y.rect, d == 0);
		return y
	}
	PixelUtil.pyramidDownsampleRgba(l);
	var M = l[0],
		R = l[1],
		r = R.O() * PixelUtil.canvas.cX(G).Nw();
	if (I && r > 4e6) n = r > 8e6 ? 2.2 : 1.2;
	while (J + 3 < l.length && l[J + 3].O() > 16 && PixelUtil.canvas.Ue(G) && PixelUtil.canvas.cX(G).Nw() < n) {
		J += 2;
		var T = l[J],
			j = l[J + 1],
			g = R.m / j.m,
			Y = R.n / j.n;
		G = PixelUtil.canvas.mY(G, [1, 0, R.x, 0, 1, R.y, 0, 0]);
		G = PixelUtil.canvas.mY(G, [g, 0, 0, 0, Y, 0, 0, 0]);
		G = PixelUtil.canvas.mY(G, [1, 0, -R.x, 0, 1, -R.y, 0, 0]);
		R = j;
		M = T
	}
	var k = PixelUtil.canvas.mY(G, PixelUtil.canvas.pu(new Matrix2D(R.m, 0, 0, R.n, R.x, R.y))),
		F = [0, 0, 1, 0, 1, 1, 0, 1];
	PixelUtil.canvas.D(k, F);
	y.rect = PixelUtil.vec.flattenPath(F);
	if (t) y.rect = y.rect.wD(t);
	if (I) {
		while ((y.rect.m & 3) != 0) y.rect.m++;
		while ((y.rect.n & 3) != 0) y.rect.n++
	}
	if (!gG.LQ(F) || y.rect.m > 1e5 || y.rect.n > 1e5 || y.rect.O() > 3e4 * 3e4) return null;
	var D = y.rect.O() * 4;
	if (V && V.byteLength >= D && D >= V.byteLength >> 2) {
		y.buffer = new Uint8Array(V)
	} else {
		y.buffer = PixelUtil.allocBytes(D)
	}
	PixelUtil.canvas.drawImage(k, M, R.m, R.n, y.buffer, y.rect, d == 0, Q, I);
	if (d == 2 && y.buffer) {
		var q = y.rect.m,
			H = y.rect.n,
			W;
		W = [0, -1, 0, -1, 16, -1, 0, -1, 0];
		W = PixelUtil.s9.nn(W);
		var Z = y.buffer.slice(0);
		PixelUtil.s9.iZ(Z, y.buffer, q, H, W, 255, !1, !0)
	}
	if (y.buffer) return y
};
f.NH.mW = function(l, d, G, b, V, Q, t) {
	var I = d.rect,
		y = d.channel;
	if (t) {
		I = t;
		y = d.Ua(I)
	}
	if (d.color == 255) PixelUtil.invertUint32Buffer(y);
	var e = PixelUtil.allocBytes(I.O() * 4);
	PixelUtil.writeChannelToRgba(y, e, 3);
	var M = f.NH.cY([e, I], b, V, Q);
	if (M) {
		G.rect = M.rect;
		G.channel = PixelUtil.allocBytes(M.rect.O());
		PixelUtil.extractChannelFromRgba(M.buffer, G.channel, 3);
		G.y1 = !0
	}
	if (d.color == 255) {
		PixelUtil.invertUint32Buffer(y);
		if (M) PixelUtil.invertUint32Buffer(G.channel)
	}
};
f.NH.asF = function(l, d) {
	var G = l.filterFX;
	if (G) G = G.v.filterFXList;
	if (G) G = G.v;
	if (G)
		for (var b = 0; b < G.length; b++) {
			var V = G[b].v.Fltr;
			if (V == null || V.v.classID != "rigidTransform") continue;
			V = V.v;
			console.log(V);
			var Q = [];
			for (var t = 0; t < 4; t++) Q.push(V["PuX" + t].v, V["PuY" + t].v);
			PixelUtil.vec.transformCoords(Q, d, Q);
			for (var t = 0; t < 4; t++) {
				V["PuX" + t].v = Q[t * 2];
				V["PuY" + t].v = Q[t * 2 + 1]
			}
			var I = ["PinP", "posFinalPins"],
				y = ["originalVertexArray", "deformedVertexArray"],
				e = V.puppetShapeList.v;
			for (var M = 0; M < e.length; M++) {
				var R = e[M].v;
				for (var J = 0; J < I.length; J++) {
					var n = f.NH.DO(R[I[J]]);
					PixelUtil.vec.transformCoords(n, d, n);
					R[I[J]] = f.NH.gx(n);
					var r = new Uint8Array(R[y[J]].v),
						T = new Float32Array(r.buffer);
					PixelUtil.vec.transformCoords(T, d, T);
					var j = [];
					for (var g = 0; g < r.length; g++) j[g] = r[g];
					R[y[J]].v = j
				}
			}
		}
};
f.NH.DO = function(l) {
	var d = [],
		G = l.v.length;
	for (var A = 0; A < G; A++) d.push(l.v[A].v);
	return d
};
f.NH.gx = function(l) {
	var d = {
			t: "VlLs",
			v: []
		},
		G = l.length;
	for (var A = 0; A < G; A++) d.v.push({
		t: "doub",
		v: l[A]
	});
	return d
};
f.NH.prototype.a6y = function() {
	var l = PixelUtil.vec.boundingBox(PixelUtil.textWarp.js(this.oF.sl())),
		d = PixelUtil.canvas.eP(this.JD.Pn(), this.CQ),
		G = [l.x, l.y, l.x + l.m, l.y, l.x + l.m, l.y + l.n, l.x, l.y + l.n];
	PixelUtil.canvas.D(d, G);
	this.JD.wc(G);
	this.CQ = l
};
f.NH.prototype.oa = function(l, d, G, b) {
	var V = PixelUtil.canvas.eP(this.JD.Pn(), this.CQ);
	V = PixelUtil.canvas.mY(V, PixelUtil.canvas.hI(this.Pv));
	var Q = this.oF ? this.oF.sl() : null;
	if (this.vO == 0) {
		var t = this.ty = PixelUtil.canvas.cX(V);
		if (this.id == f.Z5) {
			var I = this.fm[0][0],
				y = I.rV,
				e = y[1],
				M = ~~(e.m * Math.max(0, t.aS)),
				R = ~~(e.n * Math.max(0, t.Qd)),
				J = new Rect(Math.round(t.aS * e.x + t.cI), Math.round(t.Qd * e.y + t.xu), M, R),
				n = PixelUtil.UR.D(this.tC, J),
				r = l.B[this.B[0]];
			r.buffer = n;
			r.rect = J;
			r.U();
			l.U()
		} else f.NH.tF(l, d, this.B, this.fm, G, V, Q, null, null, b)
	} else if (this.vO == 1) {
		var T = l.B[this.B[0]],
			e = this.bg.vD;
		if (T.ht <= 0) {
			var j = this.bg.XO,
				g = this.Sd,
				Y = null;
			if (Q && !PixelUtil.textWarp.T9(Q) && !g.rect.XB(e)) {
				var n = PixelUtil.allocBytes(g.rect.O() * 4);
				PixelUtil.blitRgbaRect(j, e, n, g.rect);
				j = n;
				e = g.rect
			}
			if (this.id == f.Z5) {
				var t = this.ty = PixelUtil.canvas.cX(V),
					M = ~~(e.m * Math.max(0, t.aS)),
					R = ~~(e.n * Math.max(0, t.Qd)),
					J = new Rect(Math.round(t.aS * e.x + t.cI), Math.round(t.Qd * e.y + t.xu), M, R),
					n = PixelUtil.UR.D(this.tC, J);
				Y = {
					buffer: n,
					rect: J
				}
			} else Y = f.NH.cY([j, e], G, V, Q);
			if (Y) {
				T.IB.o7 = Y.buffer;
				T.IB.cG = Y.rect;
				var k = PixelUtil.allocBytes(Y.rect.O());
				PixelUtil.extractChannelFromRgba(T.IB.o7, k, 3);
				l.P = {
					channel: k,
					rect: T.IB.cG.clone()
				}
			}
		} else {
			var F = PixelUtil.allocBytes(e.O() * 4);
			PixelUtil.writeChannelToRgba(this.bg.XO, F, 3);
			var Y = f.NH.cY([F, e], G, V, Q);
			if (Y) {
				T.IB.o7 = PixelUtil.allocBytes(Y.rect.O());
				PixelUtil.extractChannelFromRgba(Y.buffer, T.IB.o7, 3);
				T.IB.cG = Y.rect
			}
			this.aiX(l, G, V, Q)
		}
		T.OX(l, 0, 0, l.P);
		if (G != 0) {
			T.ww();
			PixelUtil.cropGrayChannelInPlace(l.P)
		}
		l.Of = !0;
		l.U()
	} else if (this.vO == 2) this.aiX(l, G, V, Q)
};
f.NH.prototype.aiX = function(l, d, G, b) {
	var V = this.Sd.rect,
		Q = PixelUtil.allocBytes(V.O() * 4);
	PixelUtil.writeChannelToRgba(this.Sd.channel, Q, 3);
	var t = f.NH.cY([Q, V], d, G, b),
		I = PixelUtil.allocBytes(t.rect.O());
	PixelUtil.extractChannelFromRgba(t.buffer, I, 3);
	l.P = {
		channel: I,
		rect: t.rect
	};
	l.Of = !0
};
f.NH.prototype.disable = function(l, d, G, b) {
	if (this.JD) this.kF(l, d, null, !0)
};
// Free Transform Tool
f.avo = function() {
	f.NH.call(this, "Free Transform", f.qK, "tools/transform")
};
f.avo.prototype = new f.NH;
// Transform Selection Tool
f.abB = function() {
	f.NH.call(this, "Transform Selection", f.tr, "tools/transform")
};
f.abB.prototype = new f.NH;
// Content-Aware Scale Tool
f.aug = function() {
	f.NH.call(this, "Content-Aware Scale", f.Z5, "tools/transform")
};
f.aug.prototype = new f.NH;
// Puppet Warp Tool
f.XR = function(l, d, G) {
	f.AbstractTool.call(this, "Puppet Warp", f.MU, "tools/transform");
	this.gH = [1, 1, 2, !0];
	this._K = "rigidTransform";
	this.G6 = null;
	this.aiI = null;
	this.b1 = null;
	this.kv = null;
	this.Ya = null;
	this.Wp = null;
	this.Kr = []
};
f.XR.prototype = new f.AbstractTool;
f.XR.prototype.in = function() {
	return !0
};
f.XR.a4t = function(l) {
	if (l == null) return !1;
	if (l.g.length != 1) return !1;
	var d = l.B[l.g[0]];
	return d.add.SoLd || l.T8(!1)
};
f.XR.prototype.Py = function(l, d) {
	return f.XR.a4t(l)
};
f.XR.prototype.enable = function(l, d, G, b, V, Q, t) {
	this.aiI = Q.iY;
	var I = Q.iY,
		y, T = null;
	if (I) {
		var e = l.B[I.j];
		if (e.add.SoLd.filterFX != null) {
			var M = e.add.SoLd.filterFX.v.filterFXList.v;
			if (M[I.index]) y = JSON.parse(JSON.stringify(M[I.index].v.Fltr.v))
		}
	}
	var R = y == null,
		e = l.B[l.g[0]],
		J = e.buffer,
		n = e.rect,
		r = e.add.SoLd;
	if (r) {
		var j = r.nonAffineTransform.v;
		T = [];
		for (var A = 0; A < 4; A++) T.push(j[A * 2].v, j[A * 2 + 1].v);
		if (R) this.DN("edit", d);
		var g = e.vZ(l);
		J = g.buffer;
		n = g.rect
	}
	this.G6 = {
		buffer: J.slice(0),
		rect: n.clone(),
		aq1: T
	};
	if (R) y = f.XR.U0(this.G6, this.gH);
	this.b1 = y;
	this.kv = f.XR.OA(this.b1, this.gH);
	this.ze();
	this.Tr(l);
	if (R) this.VP(d);
	var Y = new Action(ActionTypes.E.L, !0);
	Y.data = {
		a: ActionTypes.$.vq,
		G: this.id,
		Oo: this.gH
	};
	d.dispatch(Y);
	Y.data = {
		a: ActionTypes.$.e5,
		ew: "default"
	};
	d.dispatch(Y)
};
f.XR.prototype.disable = function(l, d, G, b) {
	if (this.kv) this.kF(l, d, !0)
};
f.XR.prototype.ze = function(l) {
	var d = this.kv;
	this.Kr = [];
	for (var A = 0; A < d.length; A++) {
		var G = d[A];
		for (var b = 0; b < G.g.length; b++) this.Kr.push([A, G.g[A]]);
		G.$G = PixelUtil.WB.qZ(G);
		if (l) PixelUtil.WB.q3(G)
	}
};
f.XR.prototype.A0 = function(l, d, G, b) {
	if (l.DI == "commit") this.kF(G, d, !0);
	else if (l.DI == "cancel") this.Ht(G, d, !0);
	else if (l.DI == "prm") {
		var V = !1;
		for (var A = 0; A < 3; A++)
			if (this.gH[A] != l.Oo[A]) V = !0;
		this.gH = l.Oo;
		if (V) {
			this.b1 = f.XR.U0(this.G6, this.gH, this.b1);
			this.kv = f.XR.OA(this.b1, this.gH);
			this.ze(!0);
			this.VP(d)
		}
		this.Tr(G)
	} else if (l.DI == "moveDepth") {
		var Q = this.kv;
		for (var t = 0; t < Q.length; t++) {
			var I = Q[t];
			for (var A = 0; A < I.g.length; A++) {
				var y = I.g[A];
				I.Bn[y] += l.a5h ? 1 : -1
			}
		}
		this.VP(d)
	}
};
f.XR.prototype.oH = function(l, d) {
	return l == KeyboardHandler.HD || l == KeyboardHandler.kJ
};
f.XR.prototype.o9 = function(l, d, G, b) {
	var V = b._9();
	if (b.l(KeyboardHandler.lm)) this.kF(l, d, !0);
	else if (b.l(KeyboardHandler.mp)) this.Ht(l, d, !0);
	else if (b.l(KeyboardHandler.HD) || b.l(KeyboardHandler.kJ)) {
		var Q = this.kv;
		for (var t = 0; t < Q.length; t++) {
			var I = Q[t];
			I.g.sort(function(M, R) {
				return R - M
			});
			for (var A = 0; A < I.g.length; A++) {
				var y = I.g[A],
					e = y * 2;
				I.Bn.splice(y, 1);
				I.l0.splice(y, 1);
				I.ZB.splice(y, 1);
				I.Y8.splice(y, 1);
				I.un.splice(e, 2);
				I.UM.splice(e, 2)
			}
			I.g = [];
			if (I.Y8.length == 0) {
				I.J1 = I.gd.slice(0);
				I.On = I.gd.slice(0)
			}
		}
		this.ze(!0);
		this.VP(d);
		this.Tr(l)
	} else if (V.x != 0 || V.y != 0) {
		this.aii(l, V.x, V.y, d);
		this.zP = null
	}
};
f.XR.prototype.kF = function(l, d, G) {
	this.DN("confirm", d);
	this.escape(l, d, G)
};
f.XR.prototype.Ht = function(l, d, G) {
	this.DN("cancel", d);
	this.escape(l, d, G)
};
f.XR.prototype.escape = function(l, d, G) {
	l.I.Bt = null;
	l.I.g2 = [];
	l.uK = !0;
	this.kv = null;
	var b = new Action(ActionTypes.E.L, !0);
	b.data = {
		a: ActionTypes.$.PN
	};
	if (G) d.dispatch(b)
};
f.XR.prototype.dJ = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y),
		t = Q.x,
		I = Q.y,
		y = this.kv,
		e = null,
		M = [0, 2, 4, 1.2, 1.2, 1.2],
		R = -1,
		J = f.Jo(l, V);
	for (var A = 0; A < y.length; A++) {
		var n = y[A],
			r = PixelUtil.vec.ad(n.UM, t, I, J);
		if (r != -1) e = [A, r];
		if (R == -1 && PixelUtil.WB.VD.ahA(n.On, n.F0, t, I)) R = A
	}
	if (e == null && R != -1) {
		var n = y[R];
		f.XR.ayL(n, t, I, t, I, 0);
		e = [R, n.Y8.length - 1];
		n.$G = PixelUtil.WB.qZ(n)
	}
	this.Ya = Q;
	if (e) {
		var T = y[e[0]].g.indexOf(e[1]) != -1;
		if (b.l(KeyboardHandler.Zz) && !T) {
			y[e[0]].g.push(e[1]);
			this.Kr.push(e)
		} else if (!T) {
			y[e[0]].g = [e[1]];
			this.Kr = [e]
		}
	}
	this.Tr(l)
};
f.XR.ayL = function(l, d, G, b, V, Q) {
	var t = PixelUtil.vec.ad(l.On, d, G);
	l.Y8.push(t);
	l.UM.push(b, V);
	l.un.push(l.On[t * 2] - d, l.On[t * 2 + 1] - G);
	l.ZB.push(0);
	l.l0.push(!1);
	l.Bn.push(Q)
};
f.XR.prototype.JP = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y),
		t = this.Ya;
	if (t) this.aii(l, Q.x - t.x, Q.y - t.y, d)
};
f.XR.prototype.aii = function(l, d, G, b) {
	var V = {},
		Q = this.Kr,
		t = this.kv;
	if (this.zP == null) {
		this.zP = [];
		for (var A = 0; A < t.length; A++) this.zP.push(t[A].UM.slice(0))
	}
	for (var A = 0; A < Q.length; A++) {
		var I = this.Kr[A],
			y = I[0],
			e = t[I[0]],
			M = I[1] * 2;
		e.UM[M + 0] = this.zP[y][M + 0] + d;
		e.UM[M + 1] = this.zP[y][M + 1] + G;
		V[y] = y
	}
	for (var y in V) PixelUtil.WB.q3(this.kv[V[y]]);
	this.Tr(l);
	this.VP(b)
};
f.XR.prototype.DN = function(l, d) {
	var G = new Action(ActionTypes.E.v, !0);
	G.G = f.WH;
	G.data = {
		a: l,
		iY: this.aiI,
		_K: this._K,
		qv: this.b1
	};
	d.dispatch(G)
};
f.XR.prototype.Nl = function(l, d, G, b, V) {
	this.Ya = null;
	this.zP = null
};
f.XR.prototype.VP = function(l) {
	f.XR.an8(this.kv, this.gH, this.b1);
	this.DN("edit", l)
};
f.XR.prototype.Tr = function(l) {
	var d = this.kv,
		G = this.b1;
	l.I.Bt = {
		C: [],
		F: []
	};
	l.I.g2 = [];
	l.I.Qg = [];
	for (var A = 0; A < d.length; A++) {
		var b = d[A];
		for (var V = 0; V < b.g.length; V++) l.I.Qg.push((l.I.g2.length >>> 1) + b.g[V]);
		l.I.g2 = l.I.g2.concat(b.UM);
		if (this.gH[3]) PixelUtil.vec.concat(l.I.Bt, PixelUtil.vec.aqe(b.On, b.F0))
	}
	l.uK = !0
};
f.XR.U0 = function(l, d, G) {
	var b = l.buffer,
		V = l.rect,
		Q = l.aq1,
		t = FilterHelper.oT("rigidTransform");
	if (Q)
		for (var A = 0; A < 4; A++) {
			t["PuX" + A].v = Q[A * 2];
			t["PuY" + A].v = Q[A * 2 + 1]
		}
	var I = t.puppetShapeList.v,
		y = PixelUtil.WB.am4(b, V.m, V.n, d[1], d[2]),
		e = [];
	for (var M = 0; M < y.length; M++) {
		var R = {
			classID: "puppetShape",
			rigidType: {
				t: "bool",
				v: !0
			},
			VrsM: {
				t: "long",
				v: 1
			},
			VrsN: {
				t: "long",
				v: 0
			},
			originalVertexArray: {
				t: "tdta",
				v: []
			},
			deformedVertexArray: {
				t: "tdta",
				v: []
			},
			indexArray: {
				t: "tdta",
				v: []
			},
			pinOffsets: {
				t: "VlLs",
				v: []
			},
			posFinalPins: {
				t: "VlLs",
				v: []
			},
			pinVertexIndices: {
				t: "VlLs",
				v: []
			},
			PinP: {
				t: "VlLs",
				v: []
			},
			PnRt: {
				t: "VlLs",
				v: []
			},
			PnOv: {
				t: "VlLs",
				v: []
			},
			PnDp: {
				t: "VlLs",
				v: []
			},
			meshQuality: {
				t: "long",
				v: 2
			},
			meshExpansion: {
				t: "long",
				v: 2
			},
			meshRigidity: {
				t: "long",
				v: 2
			},
			imageResolution: {
				t: "doub",
				v: 72
			},
			selectedPin: {
				t: "VlLs",
				v: []
			}
		};
		R.meshBoundaryPath = {
			t: "Objc",
			v: {
				classID: "pathClass",
				pathComponents: {
					t: "VlLs",
					v: [{
						t: "Objc",
						v: {
							classID: "PaCm",
							shapeOperation: {
								t: "enum",
								v: {
									shapeOperation: "xor"
								}
							},
							SbpL: {
								t: "VlLs",
								v: [{
									t: "Objc",
									v: {
										classID: "Sbpl",
										Clsp: {
											t: "bool",
											v: !0
										},
										Pts: {
											t: "VlLs",
											v: []
										}
									}
								}]
							}
						}
					}]
				}
			}
		};
		var J = y[M];
		I.push({
			t: "Objc",
			v: R
		});
		var n = J.gd.slice(0);
		PixelUtil.vec.transformCoords(n, new Matrix2D(1, 0, 0, 1, V.x, V.y), n);
		var r = J.F0;
		for (var A = 0; A < r.length; A += 3) {
			var T = r[A + 1];
			r[A + 1] = r[A + 2];
			r[A + 2] = T
		}
		e.push({
			F0: r,
			gd: n,
			J1: n,
			On: n,
			Y8: [],
			un: [],
			UM: [],
			$G: null,
			g: [],
			ZB: [],
			l0: [],
			Bn: []
		})
	}
	if (G) {
		var j = f.XR.OA(G, []),
			g = e[0];
		for (var A = 0; A < j.length; A++) {
			var Y = j[A];
			for (var k = 0; k < Y.g.length; k++) g.g.push((g.UM.length >>> 1) + Y.g[k]);
			for (var k = 0; k < Y.Y8.length; k++) {
				var F = Y.Y8[k] * 2,
					D = Y.gd[F] - Y.un[k * 2],
					q = Y.gd[F + 1] - Y.un[k * 2 + 1];
				f.XR.ayL(g, D, q, Y.UM[k * 2], Y.UM[k * 2 + 1], Y.Bn[k])
			}
		}
	}
	f.XR.an8(e, d, t);
	return t
};
f.XR.OA = function(l, d) {
	var G = f.NH.DO,
		b = l.puppetShapeList.v,
		V = [];
	for (var Q = 0; Q < b.length; Q++) {
		var t = b[Q].v;
		d[0] = t.meshRigidity.v - 1;
		d[1] = t.meshQuality.v - 1;
		d[2] = t.meshExpansion.v;
		var I = t.pinVertexIndices.v.length,
			y = t.meshBoundaryPath.v.pathComponents.v;
		if (y.length != 0) {
			var e = y[0].v.SbpL.v[0].v.Pts;
			e.v = []
		}
		var M = new Uint32Array(new Uint8Array(t.indexArray.v).buffer),
			R = new Float32Array(new Uint8Array(t.originalVertexArray.v).buffer),
			J = new Float32Array(new Uint8Array(t.deformedVertexArray.v).buffer),
			n = [],
			r = [],
			T = [];
		for (var A = 0; A < M.length; A++) n.push(M[A]);
		for (var A = 0; A < R.length; A++) {
			r.push(R[A]);
			T.push(J[A])
		}
		var j = G(t.pinVertexIndices),
			g = G(t.pinOffsets),
			Y = G(t.posFinalPins),
			k = G(t.PnRt),
			F = G(t.PnOv),
			D = G(t.PnDp),
			q = G(t.selectedPin);
		V.push({
			F0: n,
			gd: r,
			J1: T.slice(0),
			On: T,
			Y8: j,
			un: g,
			UM: Y,
			$G: null,
			ZB: k,
			l0: F,
			Bn: D,
			g: q
		})
	}
	return V
};
f.XR.an8 = function(l, d, G) {
	function b(J, n) {
		var r = [];
		for (var A = 0; A < J.length; A++) r.push({
			t: n,
			v: J[A]
		});
		return r
	}

	function V(J, n, r) {
		var T = new(r ? Uint32Array : Float32Array)(J),
			j = new Uint8Array(T.buffer);
		for (var A = 0; A < j.length; A++) n[A] = j[A]
	}
	var Q = G.puppetShapeList.v;
	for (var t = 0; t < Q.length; t++) {
		var I = l[t],
			y = Q[t].v;
		y.meshRigidity.v = d[0] + 1;
		y.meshQuality.v = d[1] + 1;
		y.meshExpansion.v = d[2];
		V(I.F0, y.indexArray.v, !0);
		V(I.gd, y.originalVertexArray.v);
		V(I.On, y.deformedVertexArray.v);
		var e = [];
		for (var A = 0; A < I.Y8.length; A++) {
			var M = I.Y8[A] * 2,
				R = A * 2;
			e[R] = I.gd[M] - I.un[R];
			e[R + 1] = I.gd[M + 1] - I.un[R + 1]
		}
		y.PinP.v = b(e, "doub");
		y.pinVertexIndices.v = b(I.Y8, "long");
		y.pinOffsets.v = b(I.un, "doub");
		y.posFinalPins.v = b(I.UM, "doub");
		y.PnRt.v = b(I.ZB, "long");
		y.PnOv.v = b(I.l0, "bool");
		y.PnDp.v = b(I.Bn, "doub");
		y.selectedPin.v = b(I.g, "long")
	}
};
// Slice Tool constructor
f.UA = function(l, d, G) {
	f.AbstractTool.call(this, l ? l : "Slice Tool", d ? d : f.E7, G ? G : "tools/slice");
	this.KP = null;
	this.QF = null;
	this.NF = null;
	this.a2o = null;
	this.hd = null;
	this.pz = null
};
f.UA.prototype = new f.AbstractTool;
f.UA.Rw = function(l, d) {
	var G = -1;
	for (var A = 0; A < l.length; A++) {
		var b = f.UA.LP(l, A);
		if (b[0] <= d.x && d.x <= b[2] && b[1] <= d.y && d.y <= b[3]) {
			G = A;
			break
		}
	}
	return G
};
f.UA.prototype.TA = function(l, d, G, b, V) {
	if (G == null) return;
	this.Vc(G);
	if (l.a == "fromAction") {
		var Q = l.lX,
			t = Q.kT,
			I = Q.a0,
			y = G.Ww(),
			e = G.bZ(),
			M = e == -1 ? new Rect(0, 0, G.m, G.n) : G.B[e].dA();
		if (t == "divide") {
			if (G.Ci.length != 0) {
				var R = G.Ci[0],
					J = f.UA.LP(G.Vp, R);
				M = new Rect(J[0], J[1], J[2] - J[0], J[3] - J[1]);
				G.Vp.splice(R, 1);
				G.Ci = []
			}
			y = [
				[],
				[]
			];
			for (var n = 0; n < 2; n++) {
				var r = ["Across", "Down"][n],
					T = I["pixels" + r] ? 0 : 1,
					j = I[["pixels", "slices"][T] + r];
				if (j == null) continue;
				j = j.v;
				var g = n == 0 ? M.x : M.y,
					Y = n == 0 ? M.m : M.n;
				if (T == 0)
					for (var A = 1; A * j < Y; A++) {
						y[0].push([n, g + A * j]);
						y[1].push(e)
					} else {
						var k = Math.floor(Y / j);
						for (var A = 1; A < j; A++) {
							y[0].push([n, g + A * k]);
							y[1].push(e)
						}
					}
			}
		}
		var F = [M.x, M.x + M.m],
			D = [M.y, M.y + M.n];
		for (var A = 0; A < y[0].length; A++) {
			var q = y[0][A],
				H = Math.round(q[1]),
				W = y[1][A];
			if (W != -1 && W != e) continue;
			if (q[0] == 0 && F.indexOf(H) == -1) F.push(H);
			if (q[0] == 1 && D.indexOf(H) == -1) D.push(H)
		}
		F.sort(function(P, C) {
			return P - C
		});
		D.sort(function(P, C) {
			return P - C
		});
		for (var Z = 1; Z < D.length; Z++)
			for (var B = 1; B < F.length; B++) {
				G.Vp.push(f.UA.XN());
				f.UA.pI(G.Vp, G.Vp.length - 1, [F[B - 1], D[Z - 1], F[B], D[Z]]);
				G.uK = !0
			}
	} else if (l.a == "reorder") {
		if (G.Ci.length == 0) return;
		var a = G.Vp,
			m = G.Ci;
		m.sort(function(P, C) {
			return P - C
		});
		console.log(m);
		var p = a.slice(0),
			c = [],
			v = [];
		for (var A = 0; A < m.length; A++) {
			var R = m[A],
				i = a[R];
			v.push(i);
			p.splice(p.indexOf(i), 1)
		}
		var z = Math.max(0, Math.min(p.length, m[0] - l.dir));
		for (var A = 0; A < v.length; A++) {
			p.splice(z + A, 0, v[A]);
			c.push(z + A)
		}
		G.Vp = p;
		G.Ci = c
	} else if (l.a == "delete") {
		var a = G.Vp.slice(0);
		for (var A = 0; A < G.Ci.length; A++) G.Vp.splice(G.Vp.indexOf(a[G.Ci[A]]), 1);
		G.Ci = []
	} else if (l.a == "deleteAll") {
		G.Vp = [];
		G.Ci = []
	} else {
		G.Vp[G.Ci[0]].v = l;
		G.uK = !0
	}
	this.Yc(G)
};
f.UA.prototype.enable = function(l, d, G, b, V, Q) {
	f.AbstractTool.prototype.enable.call(this, l, d, G, b, V, Q);
	if (!G.hq.Vp) {
		var t = new Action(ActionTypes.E.L, !0);
		t.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.T$
		};
		d.dispatch(t)
	}
};
f.UA.prototype.disable = function() {
	this.KP = null;
	this.QF = null
};
f.UA.prototype.h_ = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y),
		t = f.UA.Rw(l.Vp, Q);
	if (t == -1) return;
	this.KP = l;
	this.QF = d;
	l.Ci = [t];
	l.uK = !0;
	if (this.pz == null) {
		// this.pz = new ContextPanel([{
		// 	name: [5, 4]
		// }, {
		// 	name: [8, 11, 1],
		// 	pR: !0
		// }]);
		// this.pz.addListener("select", this.Ux, this)
	}
	var I = this.pz;
	I.parent = d;
	I.refresh();
	I.update(l, G);
	var y = new Action(ActionTypes.E.L, !0);
	y.data = {
		a: ActionTypes.$.dY,
		A3: I,
		x: V.pf + 2,
		y: V.pi + 1
	};
	d.dispatch(y)
};
f.UA.prototype.Ux = function(l) {
	var d = this.pz.sz()[0],
		G = this.KP;
	if (d == 0) {
		this.Vc(G);
		G.Vp.splice(G.Ci[0], 1);
		G.Ci = [];
		G.uK = !0;
		this.Yc(G)
	}
	if (d == 1) {
		var b = new Action(ActionTypes.E.L, !0);
		b.data = {
			a: ActionTypes.$.SN,
			GU: "soptions",
			Z: G.Vp[G.Ci[0]].v
		};
		this.QF.dispatch(b)
	}
};
f.UA.prototype.dJ = function(l, d, G, b, V) {
	if (l == null) return;
	this.Vc(l);
	var Q = l.u.Zx(V.x, V.y);
	Q = f.Pq.aM(l, Q, G, [!0, null, !1]);
	Q.x = Math.round(Q.x);
	Q.y = Math.round(Q.y);
	this.hd = Q;
	l.Vp.unshift(f.UA.XN());
	l.Ci = [0];
	f.UA.pI(l.Vp, 0, [Q.x, Q.y, Q.x + 20, Q.y + 20]);
	l.uK = !0
};
f.UA.prototype.JP = function(l, d, G, b, V) {
	if (this.NF == null) return;
	var Q = l.u.Zx(V.x, V.y),
		t = this.hd;
	Q = f.Pq.aM(l, Q, G, [!0, null, !1]);
	Q.x = Math.round(Q.x);
	Q.y = Math.round(Q.y);
	var I = [t.x, t.y, Q.x, Q.y];
	f.UA.ajZ(I);
	f.UA.pI(l.Vp, 0, I);
	l.uK = !0
};
f.UA.prototype.Nl = function(l, d, G, b, V) {
	this.Yc(l);
	this.hd = null
};
f.UA.prototype.Vc = function(l) {
	this.NF = JSON.stringify(l.Vp);
	this.a2o = JSON.stringify(l.Ci)
};
f.UA.prototype.Yc = function(l) {
	var d = JSON.stringify(l.Vp);
	if (d != this.NF) {
		var G = new HistoryState(this.name, this);
		G.data = {
			bg: this.NF,
			SQ: d,
			akN: this.a2o,
			axO: JSON.stringify(l.Ci)
		};
		l.pushHistoryState(G)
	}
	this.NF = null
};
f.UA.prototype.applyUndo = function(l, d) {
	d.Vp = JSON.parse(l.bg);
	d.Ci = JSON.parse(l.akN);
	d.uK = !0
};
f.UA.prototype.applyRedo = function(l, d) {
	d.Vp = JSON.parse(l.SQ);
	d.Ci = JSON.parse(l.axO);
	d.uK = !0
};
f.UA.prototype.oH = function(l, d) {
	return d != null && d.Ci.length != 0 && (l == KeyboardHandler.HD || l == KeyboardHandler.kJ)
};
f.UA.prototype.o9 = function(l, d, G, b) {
	if (l == null) return;
	if (b.l(KeyboardHandler.HD) || b.l(KeyboardHandler.kJ)) this.TA({
		a: "delete"
	}, d, l, b, G);
	var V = b._9();
	if (V.x != 0 || V.y != 0) {
		this.Vc(l);
		f.UA.Jq(l, V);
		this.Yc(l)
	}
};
f.UA.prototype.A0 = function(l, d, G, b, V) {};
f.UA.a0O = function(l, d, G, b) {
	var V = new Point2D(-d.x, -d.y),
		Q = d.m / G.m,
		t = d.n / G.n,
		I = [0, 0, d.m, d.n];
	for (var A = 0; A < l.length; A++) {
		var y = f.UA.LP(l, A);
		if (b) {
			y[0] = Math.round(y[0] * Q);
			y[1] = Math.round(y[1] * t);
			y[2] = Math.round(y[2] * Q);
			y[3] = Math.round(y[3] * t)
		} else {
			f.UA.I0(y, V);
			f.UA.aji(y, I)
		}
		if (y[0] >= y[2] || y[1] >= y[3]) {
			l.splice(A, 1);
			A--;
			continue
		}
		f.UA.pI(l, A, y)
	}
};
f.UA.Jq = function(l, d) {
	var G = l.Vp;
	for (var A = 0; A < l.Ci.length; A++) {
		var b = f.UA.LP(G, l.Ci[A]);
		f.UA.I0(b, d);
		f.UA.pI(G, l.Ci[A], b)
	}
};
f.UA.aji = function(l, d) {
	if (l[0] < d[0]) l[0] = d[0];
	if (l[1] < d[1]) l[1] = d[1];
	if (d[2] < l[2]) l[2] = d[2];
	if (d[3] < l[3]) l[3] = d[3]
};
f.UA.I0 = function(l, d) {
	l[0] = Math.round(l[0] + d.x);
	l[2] = Math.round(l[2] + d.x);
	l[1] = Math.round(l[1] + d.y);
	l[3] = Math.round(l[3] + d.y)
};
f.UA.pI = function(l, A, d) {
	var G = l[A].v.bounds.v;
	G.Left.v = d[0];
	G.Top.v = d[1];
	G.Rght.v = d[2];
	G.Btom.v = d[3]
};
f.UA.LP = function(l, A) {
	var d = l[A].v.bounds.v;
	return [d.Left.v, d.Top.v, d.Rght.v, d.Btom.v, A]
};
f.UA.ajZ = function(l) {
	if (l[2] < l[0]) {
		var d = l[0];
		l[0] = l[2];
		l[2] = d
	}
	if (l[2] == l[0]) l[2]++;
	if (l[3] < l[1]) {
		var d = l[1];
		l[1] = l[3];
		l[3] = d
	}
	if (l[3] == l[1]) l[3]++
};
f.UA.YR = function(l, d) {
	var G = 1e9,
		b = -1e9,
		V = 1e9,
		Q = -1e9;
	for (var A = 0; A < d.length; A++) {
		var t = f.UA.LP(l, d[A]);
		G = Math.min(G, t[0]);
		V = Math.min(V, t[1]);
		b = Math.max(b, t[2]);
		Q = Math.max(Q, t[3])
	}
	return [G, V, b, Q]
};
f.UA.XN = function() {
	return {
		t: "Objc",
		v: {
			classID: "slice",
			sliceID: {
				t: "long",
				v: 0
			},
			groupID: {
				t: "long",
				v: 0
			},
			origin: {
				t: "enum",
				v: {
					ESliceOrigin: "userGenerated"
				}
			},
			Type: {
				t: "enum",
				v: {
					ESliceType: "Img"
				}
			},
			bounds: {
				t: "Objc",
				v: {
					classID: "Rct1",
					Top: {
						t: "long",
						v: 0
					},
					Left: {
						t: "long",
						v: 0
					},
					Btom: {
						t: "long",
						v: 0
					},
					Rght: {
						t: "long",
						v: 0
					}
				}
			},
			url: {
				t: "TEXT",
				v: ""
			},
			null: {
				t: "TEXT",
				v: ""
			},
			Msge: {
				t: "TEXT",
				v: ""
			},
			altTag: {
				t: "TEXT",
				v: ""
			},
			cellTextIsHTML: {
				t: "bool",
				v: !0
			},
			cellText: {
				t: "TEXT",
				v: ""
			},
			horzAlign: {
				t: "enum",
				v: {
					ESliceHorzAlign: "default"
				}
			},
			vertAlign: {
				t: "enum",
				v: {
					ESliceVertAlign: "default"
				}
			},
			bgColorType: {
				t: "enum",
				v: {
					ESliceBGColorType: "None"
				}
			},
			topOutset: {
				t: "long",
				v: 0
			},
			leftOutset: {
				t: "long",
				v: 0
			},
			bottomOutset: {
				t: "long",
				v: 0
			},
			rightOutset: {
				t: "long",
				v: 0
			}
		}
	}
};
// Slice Select Tool
f.M2 = function() {
	f.UA.call(this, "Slice Select Tool", f.AD, "tools/sselect");
	this.hd = null;
	this.A4 = null;
	this.U2 = null;
	this.Wp = null;
	this.lB = !1
};
f.M2.prototype = new f.UA;
f.M2.prototype.dJ = function(l, d, G, b, V) {
	if (l == null) return;
	var Q = l.u.Zx(V.x, V.y),
		t = f.M2.azR(Q, 4 / l.u.N, l.Vp, l.Ci);
	t.pop();
	if (t.length != 0) {
		this.hd = Q;
		this.U2 = t;
		this.Vc(l);
		return
	}
	var I = l.Vp,
		y = f.UA.Rw(I, Q);
	if (y == -1) l.Ci = [];
	else {
		var e = l.Ci.indexOf(y);
		if (b.l(KeyboardHandler.Zz)) {
			if (e == -1) l.Ci.push(y);
			else l.Ci.splice(e, 1)
		} else {
			l.Ci.sort(function(T, j) {
				return T - j
			});
			if (e == -1) l.Ci = [y];
			this.hd = Q;
			this.Vc(l);
			this.A4 = f.UA.YR(I, l.Ci);
			this.Wp = [];
			for (var A = 0; A < l.Ci.length; A++) this.Wp.push(f.UA.LP(I, l.Ci[A]));
			if (b.l(KeyboardHandler.Jm)) {
				var M = I.slice(0),
					R = l.Ci,
					J = [];
				for (var A = 0; A < R.length; A++) {
					var y = R[A],
						n = M[y],
						r = I.indexOf(n);
					J.push(r);
					I.splice(r, 0, JSON.parse(JSON.stringify(n)))
				}
				l.Ci = J
			}
		}
	}
	l.uK = !0
};
f.M2.prototype.JP = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y);
	if (this.hd == null) {
		var t = f.M2.azR(Q, 4 / l.u.N, l.Vp, l.Ci),
			I = t.pop(),
			y = t.length == 0 ? "default" : ["ew", "nwse", "ns", "nesw"][I] + "-resize",
			e = new Action(ActionTypes.E.L, !0);
		e.data = {
			a: ActionTypes.$.e5,
			ew: y
		};
		d.dispatch(e);
		return
	}
	if (!this.lB && Q.XB(this.hd)) return;
	this.lB = !0;
	var M = l.Vp,
		t = this.U2;
	if (t) {
		Q = f.Pq.aM(l, Q, G, [!0, null, !1]);
		var R = Math.round(Q.x),
			J = Math.round(Q.y);
		for (var A = 0; A < t.length; A += 2) {
			var n = f.UA.LP(M, t[A]),
				r = t[A + 1];
			n[r] = (r & 1) == 0 ? R : J;
			f.UA.ajZ(n);
			f.UA.pI(M, t[A], n)
		}
	} else {
		var T = Q.gu(this.hd),
			g = this.A4.slice(0);
		f.UA.I0(g, T);
		var Y = new Rect(g[0], g[1], g[2] - g[0], g[3] - g[1]),
			k = f.Pq.wA(l, Y, G, [!0, null, !1], !0);
		f.Pq.If(l, Y, k);
		T.x += k[0];
		T.y += k[1];
		for (var A = 0; A < l.Ci.length; A++) f.UA.pI(M, l.Ci[A], this.Wp[A]);
		f.UA.Jq(l, T)
	}
	l.uK = !0
};
f.M2.prototype.Nl = function(l, d, G, b, V) {
	if (this.hd == null) return;
	this.Yc(l);
	l.I.Cj = null;
	l.uK = !0;
	this.hd = null;
	this.U2 = null;
	this.Wp = null;
	this.lB = !1
};
f.M2.azR = function(l, d, G, b) {
	var V = l.x,
		Q = l.y,
		t = [],
		I = -1,
		y = [];
	for (var A = 0; A < b.length; A++) {
		var e = b[A],
			M = f.UA.LP(G, e),
			R = M[0],
			J = M[1],
			n = M[2],
			r = M[3];
		if (V < R - d || n + d < V || Q < J - d || r + d < Q) continue;
		var T = [V < R + d, Q < J + d, n - d < V, r - d < Q],
			j = -1;
		for (var g = 0; g < 4; g++) {
			if (T[g] && T[g + 1 & 3]) j = 1 + 2 * (g & 1);
			if (T[g]) t.push(e, g)
		}
		if (j == -1) {
			if (T[0] || T[2]) j = 0;
			if (T[1] || T[3]) j = 2
		}
		if (j != -1) {
			I = j;
			y.push(e)
		}
	}
	var Y = t.length;
	for (var A = 0; A < Y; A += 2) {
		var e = t[A],
			k = t[A + 1],
			F = f.UA.LP(G, e)[k];
		for (var g = 0; g < b.length; g++) {
			var D = b[g];
			if (y.indexOf(D) != -1) continue;
			var M = f.UA.LP(G, D);
			if (M[k & 1] == F) t.push(D, k & 1);
			if (M[2 + (k & 1)] == F) t.push(D, 2 + (k & 1))
		}
	}
	t.push(I);
	return t
};
// Object Selection Tool
f.Sl = function() {
	f.GS.call(this, "Object Selection", f.amo, "tools/oselect");
	this.sK = "crosshair";
	this.a0d = 0
};
f.Sl.prototype = new f.GS;
f.Sl.prototype.JO = function(l, d, G, b) {
	if (Math.random() < 1 / (1 + this.a0d)) {
		alert("The cross should be fully inside the object.", 3500);
		this.a0d++
	}
};
f.Sl.prototype.D2 = function(l, d, G, b) {
	f.WC.k1(l, f.GS.xp, this.QF);
	if (!b.oW || !this.O1) return;
	var V = this.Pa(l, G, !1),
		Q = V.m,
		t = V.n,
		I = V.x,
		y = V.y,
		e = V.x + Q,
		M = V.y + t,
		R = I + Q / 2,
		J = y + t / 2,
		n = f.Sl.aqf;
	l.I.Bt = {
		C: [I, y, e, y, e, M, I, M, R - Q * n, J, R + Q * n, J, R, J - t * n, R, J + t * n],
		F: "M L L L Z M L M L".split(" ")
	};
	l.uK = !0
};
f.Sl.aqf = .12;
f.Sl.prototype.qd = function(l, d, G, b) {
	l.I.Bt = null;
	l.uK = !0;
	this.finish(l, d, G, b)
};
f.Sl.prototype.getSelection = function(l, d, G, b) {
	if (this.B0.XB(this.Xm) || !this.O1) return null;
	var V = this.Pa(l, G, !1),
		Q = l.B[l.g[0]];
	if (V.W6() || !V.N1(Q.rect)) return null;
	return f.GS.op("ObSl", V)
};
// Quick Selection Tool
f.WC = function() {
	f.BrushToolBase.call(this, "Quick Selection", f.aQ, "tools/qselect");
	this.yr = "qselect"
};
f.WC.prototype = new f.BrushToolBase;
f.WC.prototype.dJ = function(l, d, G, b, V) {
	f.WC.k1(l, f.GS.xp, d, !0);
	this.Us(l, G, b, V, 1);
	if (this.CR == null) return;
	this.zX(l)
};
f.WC.prototype.JP = function(l, d, G, b, V) {
	this.LJ(l, d, G);
	f.WC.k1(l, f.GS.xp, d);
	if (this.wt) this.dq(l, G, V);
	if (this.CR == null) return;
	if (!V.oW) return;
	var Q = this.$i(l, G, b, V);
	if (Q != 1) this.zX(l)
};
f.WC.k1 = function(l, d, G, b) {
	if (l && d.key != f.WC.Np(l)) {
		d.key = f.WC.Np(l);
		var V = l.B[l.g[0]].rect.O(),
			t = "Image Analysis ...";
		if (V == 0) return;
		var Q = V > 1e6 && b != !0,
			I = new Action(ActionTypes.E.L, !0);
		I.data = {
			a: ActionTypes.$.B8,
			wh: t
		};
		if (Q) G.dispatch(I);
		var y = function() {
			var e = f.WC.atg(l);
			for (var M in e) d[M] = e[M];
			var I = new Action(ActionTypes.E.L, !0);
			I.data = {
				a: ActionTypes.$.jn,
				wh: t
			};
			if (Q) G.dispatch(I)
		};
		if (b) y();
		else setTimeout(y, 30)
	}
};
f.WC.Np = function(l) {
	var d = l.g[0],
		G = l.B[d],
		b = G.rect,
		V = b.m,
		Q = b.n,
		t = V * Q,
		I = G.buffer;
	return [d, b.x, b.y, V, Q, I[0], I[1], I[2], I[3]].join(",")
};
f.WC.atg = function(l) {
	var d = l.g[0],
		G = l.B[d],
		b = G.rect,
		V = b.m,
		Q = b.n,
		t = V * Q,
		I = G.buffer,
		y = Date.now(),
		e = PixelUtil.allocBytes(t);
	e.fill(128);
	var M = PixelUtil.ml.uP(I, V, Q);
	console.log(Date.now() - y);
	var R = {
		key: f.WC.Np(l),
		ut: I,
		rect: b.clone(),
		iJ: V,
		Tq: Q,
		Zl: 12,
		azP: !1,
		Ir: e,
		YY: M,
		P: PixelUtil.allocBytes(t),
		SV: null,
		Qk: null,
		Vw: null
	};
	f.WC.NB(R);
	return R
};
f.WC.NB = function(l, d) {
	var G = l.iJ,
		b = l.Tq,
		V = 0,
		Q = 0,
		t = Date.now(),
		I = l.SV != null && PixelUtil.ml.alb(l.YY.F0, l.SV.F0, l.SV.TY, l.Ir);
	V = Date.now() - t;
	t = Date.now();
	if (!I && !l.azP) {
		l.SV = PixelUtil.ml.Op(l.YY, G, b, l.Ir, l.Zl);
		if (!PixelUtil.ml.alb(l.YY.F0, l.SV.F0, l.SV.TY, l.Ir)) {
			l.azP = !0;
			console.log("conflict")
		}
		l.Qk = PixelUtil.ml.au3(l.ut, G, b, l.SV.F0, l.SV.TY);
		l.Vw = [l.Qk[0].slice(0), []];
		Q = Date.now() - t;
		t = Date.now()
	}
	var t = Date.now();
	if (d) {
		l.Vw[0].set(l.Qk[0]);
		var y = l.Qk[1],
			e = l.Vw[1];
		for (var M = 0; M < y.length; M++) e[M] = y[M].slice(0);
		PixelUtil.ml.akF(l.SV.F0, G, b, l.SV.TY, l.Ir, l.P, l.Vw)
	}
};
// Artboard Tool
f.Ur = function() {
	f.AbstractTool.call(this, "Artboard Tool", f.QC, "tools/artb");
	this.Lx = null;
	this.Mq = !1;
	this.JD = null;
	this.zO = !1;
	this.ajD = null;
	this.pr = 100;
	this.UX = null;
	this.vE = 0
};
f.Ur.prototype = new f.AbstractTool;
f.Ur.prototype.TA = function(l, d, G, b, V) {
	this._C(G, l.a5U, d, l.fz)
};
f.Ur.abM = function(l, d) {
	var G = l[0],
		b = 0,
		V = 0;
	if (G == 0) V = -1;
	else if (G == 1) b = 1;
	else if (G == 2) V = 1;
	else b = -1;
	return [20 / d.ma, l[1] + b * 60 / d.ma, l[2] + V * 60 / d.ma]
};
f.Ur.prototype.A0 = function(l, d, G, b, V) {
	this.Lx = l.Oo;
	this.vE = Date.now()
};
f.Ur.prototype.Ew = function(l, d, G, b) {
	if (G.QN != this.id) return;
	if (l == null || l.g.length != 1) {
		this.gC(l);
		return
	}
	var V = l.g[0],
		Q = l.B[V],
		t = Q.add.artb;
	if (t == null) {
		this.gC(l);
		return
	}
	if (this.zO) return;
	if (Date.now() - this.vE > 50) {
		this.Lx = {};
		var I = ["artboardBackgroundType", "Clr"];
		for (var A = 0; A < I.length; A++)
			if (t[I[A]]) this.Lx[I[A]] = JSON.parse(JSON.stringify(t[I[A]]));
		var y = new Action(ActionTypes.E.L, !0);
		y.data = {
			a: ActionTypes.$.vq,
			G: this.id,
			Ye: this.Lx
		};
		d.dispatch(y)
	}
	var e = Q.dA(),
		M = PixelUtil.vec.simplifyPath(e).C,
		R = this.JD = new gG(M, !0, !1, !1, !0, !1, 3, !1);
	R.cN(l, G, !1);
	var J = {
		C: [1, 0],
		F: ["M"]
	};
	for (var A = 1; A < 30; A++) {
		var n = Math.PI * 2 * A / 30;
		J.C.push(Math.cos(n), Math.sin(n));
		J.F.push("L")
	}
	J.F.push("Z", "M", "L", "M", "L");
	J.C.push(-.5, 0, .5, 0, 0, -.5, 0, .5);
	var r = e.x + e.m / 2,
		T = e.y + e.n / 2,
		g = this.pr * 1.1,
		Y = this.ajD = [r, e.y, e.x + e.m, T, r, e.y + e.n, e.x, T],
		k = [0, -g, g, 0, 0, g, -g, 0],
		F = l.root.children;
	l.I.Iq = [];
	for (var A = 0; A < 4; A++) {
		var D = new Point2D(Y[A * 2] + k[A * 2], Y[A * 2 + 1] + k[A * 2 + 1]),
			q = !1;
		for (var H = 0; H < F.length; H++) {
			var Q = F[H].j;
			if (Q.add.artb == null) continue;
			var e = Q.dA();
			if (e.xC(D)) q = !0
		}
		if (q) {
			Y[A * 2] = 1e9;
			continue
		}
		l.I.Iq.push([A, Y[A * 2], Y[A * 2 + 1]])
	}
};
f.Ur.prototype.disable = function(l, d, G, b, V) {
	this.gC(l)
};
f.Ur.prototype.gC = function(l) {
	if (this.JD) {
		this.JD.clear(l);
		this.JD = null;
		l.I.Iq = null
	}
};
f.Ur.prototype.dJ = function(l, d, G, b, V) {
	this.vE = Date.now();
	var Q = l.u.Zx(V.x, V.y),
		t = this.JD;
	if (t) {
		var I = new Action(ActionTypes.E.v),
			y = t.aiq(null, Q, l, V);
		if (y < 9) {
			this.zO = t.dJ(l, G, b, Q, null, !0, V);
			return
		} else if (t.yo(Q)) {
			I.G = f.$C;
			I.data = {
				a: "disabAuto"
			};
			d.dispatch(I);
			var e = new Action(ActionTypes.E.L);
			e.data = {
				a: ActionTypes.$.yb,
				G: f.$C,
				a1Z: !0
			};
			d.dispatch(e);
			return
		} else {
			var M = -1,
				R = l.I.Iq;
			for (var A = 0; A < R.length; A++) {
				var J = f.Ur.abM(R[A], l.u);
				if (Point2D.yZ(Q, new Point2D(J[1], J[2])) < J[0]) M = R[A][0]
			}
			if (M != -1) {
				var n = l.B[l.g[0]].dA(),
					r = n.clone(),
					T = (M == 0 || M == 2 ? n.n : n.m) + this.pr;
				if (M == 0 || M == 3) T = -T;
				if (M == 0 || M == 2) n.y += T;
				else n.x += T;
				if (b.l(KeyboardHandler.Jm)) {
					var g = new Rect(0, 0, l.m, l.n);
					I.G = f.yS;
					I.data = {
						a: LayerRecord.ZY
					};
					d.dispatch(I);
					f.Pq._P(l, l.OM(null, l.g[0], null, !0), null, n.x - r.x, n.y - r.y);
					l.g = l.g.slice(l.g.length - 1);
					var Y = f.Gt.vd(l);
					if (Y) {
						var k = l.getHeadHistoryState();
						k.data.CQ = g;
						k.data.wv = Y;
						k.data.u4 = l.g
					}
				} else this._C(l, n, d);
				return
			}
		}
	}
	this.UX = f.Pq.aM(l, Q, G)
};
f.Ur.prototype._C = function(l, d, G, b) {
	if (b == null) b = 0;
	var V = l.B.slice(0),
		Q = [l.B.length + 1],
		t = l.V4();
	t.tH("Artboard " + (l.add.artd == null ? 1 : l.root.children.length + 1));
	t.add.lsct = LayerSectionType.open;
	t.P3(d);
	if (this.Lx) {
		var I = t.add.artb,
			y = this.Lx;
		for (var e in y) I[e] = y[e]
	}
	t.blendModeKey = "pass";
	t.layerFlags = 24;
	if (b == 0) {
		if (l.add.artd || d.wD(new Rect(0, 0, l.m, l.n)).W6()) V.push(l.En());
		else V.unshift(l.En())
	} else {
		var M = l.OM();
		M.sort(function(T, j) {
			return T - j
		});
		var R = f.uj.Ys(l, M, V.length - 1, !1, null, !1),
			J = R.pop(),
			n = R.pop();
		V = R.pop();
		V.splice(l.B.length - M.length, 0, l.En())
	}
	V.push(t);
	var r = new Action(ActionTypes.E.v);
	r.G = f.yS;
	r.data = {
		a: LayerRecord.OD,
		Za: V,
		le: Q,
		Il: [1, 16, 2]
	};
	G.dispatch(r)
};
f.Ur.prototype.JP = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y),
		t = this.JD,
		I = this.UX;
	if (t) {
		if (this.zO) {
			t.JP(l, G, b, Q)
		} else {
			var y = t.Rg(Q, l.u.N, null, V);
			if (y == null) y = "default";
			var e = new Action(ActionTypes.E.L, !0);
			e.data = {
				a: ActionTypes.$.e5,
				ew: y
			};
			d.dispatch(e)
		}
	}
	if (I) {
		var M = this.LP(l, Q, b, G);
		l.I.Bt = PixelUtil.vec.simplifyPath(M);
		l.uK = !0;
		f.AbstractTool.nk(V, M, l, G)
	}
};
f.Ur.prototype.Nl = function(l, d, G, b, V) {
	var Q = l.u.Zx(V.x, V.y),
		t = this.UX;
	if (this.zO) {
		this.JD.Nl(l, G, b, Q);
		this.zO = !1;
		var I = PixelUtil.vec.flattenPath(this.JD.Pn()),
			y = LayerRecord.vI(I),
			e = l.B[l.g[0]],
			M = JSON.parse(JSON.stringify(e.add.artb));
		M.artboardRect.v = y;
		var R = new Action(ActionTypes.E.v, !0);
		R.G = f.yS;
		R.data = {
			a: LayerRecord.ka,
			rX: M
		};
		d.dispatch(R)
	}
	if (t) {
		var J = this.LP(l, Q, b, G);
		if (J.O() > 20) this._C(l, J, d);
		l.I.Bt = null;
		l.uK = !0;
		this.UX = null;
		l.I.P4 = []
	}
};
f.Ur.prototype.LP = function(l, d, G, b) {
	var V = this.UX,
		Q = f.Pq.aM(l, d, b),
		t = f.Ga.k2(V, Q, G, !0);
	V = t[0];
	Q = t[1];
	return PixelUtil.vec.flattenPath([V.x, V.y, Q.x, Q.y])
};

// Free Transform bounding-box controller
function gG(l, d, G, b, V, Q, t, I) {
	this.ES = null;
	this.JG = l ? l.slice(0) : null;
	this.MB = 4;
	this.Xm = null;
	this.wd = null;
	this.S3 = null;
	this.Te = -1;
	this.YE = null;
	this.adK = !1;
	this.arg = [];
	for (var A = 0; A < 8; A++) this.arg.push(FormatHandler.ajL(0, PIMG.rotate, -.5, -.5, -45 - A * 45));
	this.a3G = d;
	this.a14 = G;
	this.alf = b;
	this.aoe = V;
	this._a = Q;
	this.fz = t;
	this.a77 = I == null ? 1 : I
}
gG.prototype.aq5 = function() {
	return this.Te != -1
};
gG.prototype.Pn = function() {
	return this.JG.slice(0)
};
gG.prototype.wc = function(l) {
	this.JG = l
};
gG.prototype.at1 = function() {
	return this.cV(this.JG)
};
gG.prototype.adI = function() {
	return this.MB
};
gG.prototype.ave = function(l) {
	this.MB = l
};
gG.prototype.mr = function(l) {
	if (l == null) l = this.JG;
	if (this.MB == 9) return this.Xm;
	else return this.cV(l)[this.MB]
};
gG.prototype.ajb = function(l) {
	if (this.MB == 9) this.Xm = l.clone();
	else {
		var d = this.mr(),
			G = new Matrix2D(1, 0, 0, 1, l.x - d.x, l.y - d.y);
		PixelUtil.vec.transformCoords(this.JG, G, this.JG)
	}
};
gG.prototype.Rg = function(l, d, G, b) {
	var V = this.wL(null, l, d, b),
		Q;
	if (V == 9) return "default";
	if (V == 10) {
		if (G) return null;
		return !this.a3G ? "move" : null
	}
	if (V == -1 || V == 4) return null;
	if (V == 11) {
		var t = this.mr().gu(l);
		Q = 90 - Math.atan2(t.y, t.x) * 180 / Math.PI;
		var I = Math.round(8 * (Q / 360));
		I = (I + 8) % 8;
		return this.arg[I]
	} else {
		var y = this.Jf(l, this.JG);
		Q = [135, 90, 45, 180, 0, 0, 225, 270, 315][V];
		var e = PixelUtil.canvas.eP(this.JG);
		Q += Math.atan2(-e[3], e[0]) * 180 / Math.PI;
		var M = "ew nesw ns nwse ew nesw ns nwse".split(" "),
			I = Math.round(8 * (Q / 360));
		I = (I + 8) % 8;
		return M[I] + "-resize"
	}
};
gG.prototype.Jf = function(l, d) {
	var G = PixelUtil.canvas.hI(PixelUtil.canvas.eP(d)),
		b = new Float64Array(2);
	PixelUtil.canvas.Gw(l.x, l.y, G, b);
	return new Point2D(b[0], b[1])
};
gG.prototype.yo = function(l) {
	var d = this.Jf(l, this.JG);
	return 0 <= d.x && d.x <= 1 && 0 <= d.y && d.y <= 1
};
gG.prototype.dJ = function(l, d, G, b, V, Q, t, I) {
	this.adK = Q;
	this.YE = b;
	var y = l.u.N,
		e;
	if (this.JG == null) b = f.Pq.aM(l, b, d);
	this.S3 = b.clone();
	if (this.JG == null) {
		if (I == null) I = 0;
		var M = new Matrix2D;
		M.rotate(I);
		var R = M.kD(new Point2D(1, 1));
		this.S3.offset(R.x, R.y);
		var J = V == null ? 1 : 1 / V,
			n = this.JG = [0, 0, 1, 0, 1, J, 0, J];
		M.translate(b.x, b.y);
		PixelUtil.vec.transformCoords(this.JG, M, this.JG);
		e = 8
	} else {
		e = this.wL(G, b, y, t);
		if (0 <= e && e <= 8) this.S3 = this.cV(this.JG)[e];
		if (e == 9) {
			this.MB = 9;
			this.Xm = b.clone()
		}
	}
	this.ES = this.JG.slice(0);
	this.Te = e;
	this.cN(l, d);
	this.wd = this.mr();
	return e != -1
};
gG.prototype.aiq = function(l, d, G, b) {
	return this.wL(l, d, G.u.N, b)
};
gG.prototype.wL = function(l, d, G, b) {
	var V = -1,
		Q = this.cV(),
		t = [0, 2, 6, 8, 1, 3, 5, 7],
		I = b ? f.Jo({
			u: {
				N: G
			}
		}, b) : 8 * window.devicePixelRatio / G,
		y = Point2D.yZ(Q[0], Q[2]),
		e = Point2D.yZ(Q[0], Q[6]),
		M = this.Jf(d, this.JG);
	M.x *= y;
	M.y *= e;
	var R = new Rect(0, 0, y, e);
	R.rC(I, I);
	if (V == -1)
		if (Point2D.yZ(this.mr(), d) < I) V = 9;
	if (V == -1)
		for (var A = 0; A < t.length; A++)
			if (Point2D.yZ(Q[t[A]], d) < I) V = t[A];
	if (V == -1 && R.xC(M)) {
		if (Math.abs(M.y - 0) < I) V = 1;
		if (Math.abs(M.x - 0) < I) V = 3;
		if (Math.abs(M.y - e) < I) V = 7;
		if (Math.abs(M.x - y) < I) V = 5
	}
	if (V == -1 && l && l.l(KeyboardHandler.Jm)) V = 9;
	if (V == -1 || this.fz == 4) {
		if (this.yo(d)) {
			if (this.a3G) V = 10
		} else {
			R.rC(3 * I, 3 * I);
			V = R.xC(M) && this.fz != 3 ? 11 : 10
		}
	}
	return V
};
gG.prototype.JP = function(l, d, G, b, V) {
	if (this.Te == -1) return;
	this.YE = b;
	var Q = G.l(KeyboardHandler.Zz),
		t = G.l(KeyboardHandler.Jm),
		I = G.l(KeyboardHandler.wz),
		y = l.u.N,
		e = this.S3,
		M = this.Te,
		R = this.cV(),
		J = f.Pq.aM(l, e, d),
		n = f.Pq.aM(l, b, d),
		r, T;
	if (M == 9) {
		var R = this.cV(),
			j = -1;
		for (var A = 0; A < R.length; A++)
			if (Point2D.yZ(R[A], n) * y < 10) j = A;
		this.MB = j == -1 ? 9 : j;
		this.Xm = Q ? f.RK.cR(J, n) : n.clone()
	} else if (M == 10) {
		T = PixelUtil.vec.boundingBox(this.ES);
		var g = T.x,
			Y = T.y;
		T.offset(b.x - e.x, b.y - e.y);
		if (this.ahb()) {
			T.x = Math.round(T.x);
			T.y = Math.round(T.y)
		}
		r = f.Pq.wA(l, T, d);
		var k = new Matrix2D(1, 0, 0, 1, T.x - g + r[0], T.y - Y + r[1]);
		PixelUtil.vec.transformCoords(this.ES, k, this.JG)
	} else if (M == 11) {
		var F = this.mr(this.ES),
			D = F.gu(b),
			q = F.gu(e),
			H = Math.atan2(D.y, D.x),
			W = Math.atan2(q.y, q.x),
			k = new Matrix2D(1, 0, 0, 1, -F.x, -F.y),
			Z = Math.PI / 12;
		if (Q) k.rotate(Math.round((W - H) / Z) * Z);
		else k.rotate(W - H);
		k.translate(F.x, F.y);
		PixelUtil.vec.transformCoords(this.ES, k, this.JG)
	} else {
		if (V && !I) Q = !Q;
		var B, a = this.ES,
			m = M == 0 || M == 2 || M == 6 || M == 8;
		if (this.fz == 1) {
			if (m) Q = t = I = !0
		} else if (this.fz == 2 && m && this.adK != !0) I = !0;
		if (this.fz == 3) I = !1;
		if (this.alf && m && I) {
			var A = [0, 0, 2, 0, 0, 0, 6, 0, 4, 0][M],
				p = -1,
				c = n.x,
				v = n.y;
			if (Q) {
				var i = A + 6 & 7,
					z = A + 10 & 7,
					P = gG.agW(a[A], a[A + 1], a[i], a[i + 1], n.x, n.y),
					C = gG.agW(a[A], a[A + 1], a[z], a[z + 1], n.x, n.y),
					h = P[2] < C[2] ? P : C;
				c = h[0];
				v = h[1];
				if (t) p = P[2] < C[2] ? i : z
			} else if (t) p = A + 4 & 7;
			B = a.slice(0);
			if (p != -1) {
				var L = a[p],
					U = a[p + 1],
					S = (a[A] + L) / 2,
					E = (a[A + 1] + U) / 2;
				B[p] = S - (c - S);
				B[p + 1] = E - (v - E)
			}
			B[A] = c;
			B[A + 1] = v
		} else if (m && t) {
			var F = this.wd,
				x = F.x,
				K = F.y,
				u = J.x - x,
				bC = J.y - K,
				O = 1,
				$ = 1;
			if (Math.abs(u) >= 1) O = (n.x - x) / u;
			if (Math.abs(bC) >= 1) $ = (n.y - K) / bC;
			if (Q || this._a) O = $ = (O + $) / 2;
			var k = new Matrix2D;
			k.translate(-x, -K);
			k.scale(O, $);
			k.translate(x, K);
			B = a.slice(0);
			PixelUtil.vec.transformCoords(B, k, B)
		} else {
			if (this.ahb()) {
				n.x = Math.round(n.x);
				n.y = Math.round(n.y)
			}
			var gX = [0, 1, 2, 5, 8, 7, 6, 3],
				_ = gX[(gX.indexOf(M) + 4) % 8],
				jI = [];
			for (var A = 0; A < 3; A++)
				for (var p = 0; p < 3; p++) jI.push(new Point2D(p / 2, A / 2));
			var F = this.wd,
				iw = this.Jf(n, a),
				hn = this.Jf(e, a),
				jq = t && (this.MB == 4 || this.MB == 9) ? this.Jf(F, a) : jI[_],
				iv = new Matrix2D,
				kq = new Matrix2D,
				O = (iw.x - jq.x) / (hn.x - jq.x);
			if (O == 0) O = 1e-4;
			var $ = (iw.y - jq.y) / (hn.y - jq.y);
			if ($ == 0) $ = 1e-4;
			if (this.aoe) {
				O = Math.max(O, 0);
				$ = Math.max($, 0)
			}
			if (M == 0 || M == 2 || M == 6 || M == 8) {
				if (Q || this._a) iv.scale(O, O);
				else iv.scale(O, $)
			}
			if (M == 1 || M == 3 || M == 5 || M == 7) {
				var eE = this._a || Q,
					e8 = I && Q;
				if (M == 1 || M == 7) iv.scale(eE ? $ : 1, e8 ? 1 : $);
				else iv.scale(e8 ? 1 : O, eE ? O : 1);
				if (this.a14 && I) {
					if (M == 1 || M == 7) kq.S5 = (iw.x - jq.x) / (iw.y - jq.y);
					else kq.k = (iw.y - jq.y) / (iw.x - jq.x)
				}
			}
			var k = new Matrix2D;
			k.translate(-jq.x, -jq.y);
			k.concat(iv);
			k.concat(kq);
			k.translate(jq.x, jq.y);
			B = [0, 0, 1, 0, 1, 1, 0, 1];
			PixelUtil.vec.transformCoords(B, k, B);
			var h = PixelUtil.canvas.eP(a);
			PixelUtil.canvas.D(h, B)
		}
		if (gG.LQ(B)) this.JG = B
	}
	this.cN(l, d);
	if (r) f.Pq.If(l, T, r)
};
gG.agW = function(l, d, G, b, V, Q) {
	var t = G - l,
		I = b - d,
		y = V - l,
		e = Q - d,
		M = t * t + I * I,
		R = y * t + e * I,
		J = R / M,
		n = l + J * t,
		r = d + J * I,
		T = V - n,
		j = Q - r;
	return [n, r, Math.sqrt(T * T + j * j)]
};
gG.prototype.ahb = function() {
	var l = this.JG;
	return Math.abs(l[1] - l[3]) < 1e-6 && Math.abs(l[2] - l[4]) < 1e-6 || Math.abs(l[0] - l[2]) < 1e-6 && Math.abs(l[3] - l[5]) < 1e-6
};
gG.LQ = function(l) {
	return PixelUtil.vec.bM(l) || PixelUtil.vec.bM([l[6], l[7], l[4], l[5], l[2], l[3], l[0], l[1]])
};
gG.prototype.Nl = function(l, d, G, b) {
	this.Te = -1;
	this.YE = null;
	l.I.Cj = null;
	l.I.P4 = [];
	l.uK = !0
};
gG.prototype.o9 = function(l, d, G) {
	var b = G._9(l ? l.u.Ay : 0);
	if (b.x || b.y) {
		var V = new Matrix2D(1, 0, 0, 1, b.x, b.y);
		PixelUtil.vec.transformCoords(this.JG, V, this.JG);
		this.cN(l, d);
		return !0
	}
	return !1
};
gG.prototype.cV = function(l) {
	if (l == null) l = this.JG;
	var d = l[6] - l[0],
		G = l[7] - l[1],
		b = l[4] - l[2],
		V = l[5] - l[3],
		Q = [l[0], l[1], l[2], l[3], l[0] + d / 2, l[1] + G / 2, l[2] + b / 2, l[3] + V / 2, l[6], l[7], l[4], l[5]],
		t = [];
	for (var A = 0; A < 3; A++) {
		var I = A * 4,
			y = Q[I + 0],
			e = Q[I + 1],
			M = Q[I + 2],
			R = Q[I + 3];
		t.push(new Point2D(y, e));
		t.push(new Point2D(y + (M - y) / 2, e + (R - e) / 2));
		t.push(new Point2D(M, R))
	}
	return t
};
gG.prototype.cN = function(l, d, G) {
	if (G == null) G = !1;
	var b = this.cV(),
		V = b[0],
		Q = b[2],
		t = b[6],
		I = b[8];
	l.I.Bt = {
		F: [],
		C: []
	};
	l.I.Bt.F.push("M", "L", "L", "L", "Z");
	l.I.Bt.C.push(V.x, V.y, Q.x, Q.y, I.x, I.y, t.x, t.y);
	var y = this.a77;
	if (y > 1) {
		l.I.Ru = JSON.parse(JSON.stringify(l.I.Bt));
		var e = Q.gu(V),
			M = t.gu(V),
			R = I.gu(Q),
			J = I.gu(t);
		for (var A = 1; A < y; A++) {
			l.I.Bt.F.push("M", "L", "M", "L");
			var n = A / y;
			l.I.Bt.C.push(V.x + e.x * n, V.y + e.y * n, t.x + J.x * n, t.y + J.y * n);
			l.I.Bt.C.push(V.x + M.x * n, V.y + M.y * n, Q.x + R.x * n, Q.y + R.y * n)
		}
	}
	l.u.M9 = new Rect(0, 0, Point2D.yZ(b[0], b[2]), Point2D.yZ(b[0], b[6]));
	if (this.Te != -1 && this.Te < 9 && this.YE) {
		var r = l.u.dN(this.YE.x, this.YE.y);
		f.AbstractTool.nk(r, l.u.M9, l, d)
	}
	if (!G) {
		l.I.jf = [];
		for (var A = 0; A < b.length; A++)
			if (A != 4) l.I.jf.push(b[A].x, b[A].y);
		var T = this.mr();
		l.I.jf.push(T.x, T.y)
	}
	l.uK = !0
};
gG.prototype.clear = function(l) {
	l.u.M9 = null;
	l.I.Cj = null;
	l.I.Bt = null;
	l.I.Ru = null;
	l.I.jf = [];
	l.uK = !0
};

// On-canvas transform handle hit-testing helper
function ht(l, d) {
	this.$V = null;
	this.Te = -1;
	this.aiS(l)
}
ht.prototype.sl = function() {
	return JSON.parse(JSON.stringify(this.$V))
};
ht.prototype.aiS = function(l) {
	this.$V = JSON.parse(JSON.stringify(l))
};
ht.prototype.yo = function(l) {
	return !0
};
ht.prototype.Rg = function(l, d, G, b) {
	var V = this.wL(l, d, b);
	if (V == -1) return "default";
	return "pointer"
};
ht.prototype.dJ = function(l, d, G, b, V, Q, t) {
	this.Te = this.wL(b, l.u.N, t);
	return this.Te != -1
};
ht.prototype.wL = function(l, d, G) {
	var b = this.alZ(),
		V = -1,
		Q = 1e6;
	for (var A = 0; A < b.length; A++) {
		var t = Point2D.yZ(b[A], l);
		if (t < Q) {
			V = A;
			Q = t
		}
	}
	return Q < (G ? f.Jo({
		u: {
			N: d
		}
	}, G) * 2 : 20 * window.devicePixelRatio / d) ? V : -1
};
ht.prototype.JP = function(l, d, G, b) {
	if (this.Te == -1) return;
	var V = l.u.N,
		Q = this.Te,
		t = PixelUtil.textWarp.js(this.$V);
	t[Q * 2] = b.x;
	t[Q * 2 + 1] = b.y;
	PixelUtil.textWarp.VH(t, this.$V)
};
ht.prototype.Nl = function(l, d, G, b) {
	this.Te = -1;
	l.uK = !0
};
ht.prototype.o9 = function(l, d, G) {
	var b = G._9();
	if (b.x || b.y) {
		var V = new Matrix2D(1, 0, 0, 1, b.x, b.y);
		PixelUtil.vec.transformCoords(this.JG, V, this.JG);
		this.cN(l)
	}
};
ht.prototype.alZ = function(l) {
	var d = PixelUtil.textWarp.js(this.$V),
		G = [];
	for (var A = 0; A < d.length; A += 2) G.push(new Point2D(d[A], d[A + 1]));
	return G
};
ht.prototype.cN = function(l) {
	var d = this.alZ();
	l.I.Bt = {
		F: [],
		C: []
	};
	l.I.Bt.F.push("M", "C", "C", "C", "C");
	var G = [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4, 0];
	for (var A = 0; A < G.length; A++) l.I.Bt.C.push(d[G[A]].x, d[G[A]].y);
	l.I.Bt.F.push("M", "L", "L", "M", "L", "L", "M", "L", "L", "M", "L", "L");
	G = [4, 0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8];
	for (var A = 0; A < G.length; A++) l.I.Bt.C.push(d[G[A]].x, d[G[A]].y);
	l.I.jf = [];
	for (var A = 0; A < d.length; A++) l.I.jf.push(d[A].x, d[A].y);
	l.uK = !0
};
ht.prototype.clear = function(l) {
	l.I.Bt = null;
	l.I.jf = [];
	l.uK = !0
};

// Shift/Alt modifier key state tracker for tools
function jV() {
	this.Pg = !1;
	this.Nk = !1;
	this.a0g = !1;
	this.aes = !1;
	this.rB = !1;
	this.Fb = !1;
	this.JY = 0;
	this.NC = 0
}
jV.prototype.dJ = function(l) {
	this.Pg = !0;
	this.Nk = !1;
	this.rB = l.l(KeyboardHandler.Zz);
	this.Fb = l.l(KeyboardHandler.Jm);
	this.JY = this.rB ? 0 : 1;
	this.NC = this.Fb ? 0 : 1
};
jV.prototype.o9 = function(l) {
	var d = this.aes = l.l(KeyboardHandler.Zz),
		G = this.a0g = l.l(KeyboardHandler.Jm);
	if (this.Nk) {
		if (this.JY == 0 && !d) this.JY++;
		if (this.JY == 1 && d) this.JY++;
		if (this.NC == 0 && !G) this.NC++;
		if (this.NC == 1 && G) this.NC++
	}
};
jV.prototype.JP = function() {
	this.Nk = !0
};
jV.prototype.Nl = function() {
	this.Pg = !1
};
jV.prototype.bP = function(A) {
	if (A == 0) return this.Pg ? this.Fb : this.a0g;
	if (A == 1) return this.Nk ? this.NC == 2 : !1
};
jV.prototype.ti = function(A) {
	if (A == 0) return this.Pg ? this.rB : this.aes;
	if (A == 1) return this.Nk ? this.JY == 2 : !1
};
// History panel: handles Undo/Redo and History list UI actions. Uses doc.history + doc.historyIndex.
f.History = function() {
	f.AbstractTool.call(this, "History", f.lv);
	this.nextIsUndo = !0;   // "next is undo" (true after an action or redo; false after an undo)
	this.lastHistoryIndexForShortcut = 0    // last known historyIndex when toggling undo/redo (for keyboard repeat behavior)
};
f.History.prototype = new f.AbstractTool;
f.History.prototype.TA = function(l, d, G, b) {
	G.bV = !0;
	if (l.a == "h_itemchange") {
		// User clicked a history list item: undo or redo until doc.historyIndex === l.index
		if (l.index < G.historyIndex)
			for (var A = G.historyIndex; A > l.index; A--) this.performUndo(G);
		if (l.index > G.historyIndex)
			for (var A = G.historyIndex; A < l.index; A++) this.performRedo(G)
	}
	if (l.a == "h_stepfwd") this.performRedo(G);
	if (l.a == "h_stepbck") this.performUndo(G);
	if (l.a == "h_undoredo") {
		// Single shortcut (e.g. Ctrl+Z): alternate undo then redo. nextIsUndo = "next keypress is undo"
		var V = this.nextIsUndo || this.lastHistoryIndexForShortcut != G.historyIndex;
		if (V) {
			this.performUndo(G);
			V = !1
		} else {
			this.performRedo(G);
			V = !0
		}
		this.nextIsUndo = V;
		this.lastHistoryIndexForShortcut = G.historyIndex
	}
	if (l.a == "h_clear") {
		if (!window.confirm("Do you really want to clear all states in History? You won't be able to undo it.")) return;
		G.history = [new HistoryState([1, 0], null)];
		G.historyIndex = 0
	} else this.nextIsUndo = !0
};
// Undo one step: call current state's applyUndo, then decrement historyIndex
f.History.prototype.performUndo = function(l) {
	if (l.historyIndex == 0) return;
	var d = l.history[l.historyIndex];
	d.G.applyUndo(d.data, l);
	l.historyIndex--
};
// Redo one step: call next state's applyRedo, then increment historyIndex
f.History.prototype.performRedo = function(l) {
	if (l.historyIndex == l.history.length - 1) return;
	var d = l.history[l.historyIndex + 1];
	d.G.applyRedo(d.data, l);
	l.historyIndex++
};
// Layers panel controller
f.uj = function() {
	f.AbstractTool.call(this, "Layers", f.yS);
	this.QF = null
};
f.uj.prototype = new f.AbstractTool;
f.uj.prototype.TA = function(l, d, G, b, V) {
	this.QF = d;
	var Q = l.a,
		t = l.j != null ? l.j : G.g.length != 0 ? G.g[0] : G.B.length - 1,
		I = G.B[t];
	G.i_ = !0;
	var y = b.l(KeyboardHandler.Jm),
		e = b.l(KeyboardHandler.Zz),
		M = b.l(KeyboardHandler.wz);
	if (Q == LayerRecord.Vg && G.P == null && (G.g.length > 1 || !G.T8(!1))) Q = LayerRecord.ZY;
	if (Q == LayerRecord.zZ) {
		var R = new HistoryState([6, 33], this),
			J = I.IQ() ? ["pass"].concat(au.CP) : au.CP,
			n = J[l.mz],
			r = l.j != null ? [l.j] : G.g,
			T = JSON.stringify(r),
			j = [];
		for (var A = 0; A < r.length; A++) j.push(G.B[r[A]].blendModeKey);
		R.data = {
			a: Q,
			xn: T,
			XY: j,
			mz: n
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G);
		this.track(PsdDescriptorHelper.D1("Md", {
			t: "enum",
			v: {
				BlnM: au.ci(n)
			}
		}))
	}
	if (Q == LayerRecord.y$) {
		var R, g = G.getHeadHistoryState(),
			r = l.j != null ? [l.j] : G.g,
			T = JSON.stringify(r);
		if (g && g.data && g.data.a == Q && g.data.xn == T) R = g;
		else {
			var Y = PsdDescriptorHelper.D1("Opct", {
				t: "UntF",
				v: {
					type: "#Prc",
					val: 0
				}
			});
			this.track(Y);
			var j = [];
			for (var A = 0; A < r.length; A++) j.push(G.B[r[A]].opacity);
			R = new HistoryState([6, 32], this);
			R.data = {
				a: Q,
				xn: T,
				XY: j,
				mz: l.mz,
				KU: Y.a0
			};
			G.pushHistoryState(R)
		}
		R.data.mz = l.mz;
		R.data.KU.T.v.Opct.v.val = Math.round(l.mz * 100 / 255);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.Ij) {
		if (I.add.iOpa == null) I.add.iOpa = 255;
		var R, g = G.getHeadHistoryState();
		if (g && g.data && g.data.a == Q && g.data.j == t) R = g;
		else {
			R = new HistoryState("Fill Opacity Change", this);
			R.data = {
				a: Q,
				j: t,
				XY: I.add.iOpa,
				mz: l.mz
			};
			G.pushHistoryState(R)
		}
		R.data.mz = l.mz;
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.ss) {
		var k = l.mz,
			F = l.j != null ? [l.j] : G.g.slice(0),
			D = [],
			q = [],
			R;
		for (var H = 0; H < F.length; H++) {
			var W = G.B[F[H]];
			if (W.add.lspf == null) W.add.lspf = 0;
			var j = W.add.lspf,
				n = j;
			for (var A = 0; A < k[0].length; A++) {
				var Z = k[1][A],
					B = 1 << Z;
				if ((n & B) == 0 && k[0][A]) n ^= B;
				else if ((n & B) != 0 && !k[0][A]) n ^= B
			}
			D.push(j);
			q.push(n)
		}
		var g = G.getHeadHistoryState(),
			r = JSON.stringify(F);
		if (g && g.data && g.data.a == Q && JSON.stringify(g.data.xn) == r) {
			R = g;
			R.data.mz = q
		} else {
			var R = new HistoryState([6, 57, 1], this);
			R.data = {
				a: Q,
				xn: r,
				XY: D,
				mz: q
			};
			G.pushHistoryState(R)
		}
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.rh) {
		var a = "----",
			m = l.pX,
			n = null;
		for (var A = 0; A < ScriptingEngine.scriptBridge.layerStyleTypeKeys.length; A++)
			if (I.add[ScriptingEngine.scriptBridge.layerStyleTypeKeys[A]]) a = ScriptingEngine.scriptBridge.layerStyleTypeKeys[A];
		var p = I.add[a];
		if (m == "TySh") n = dt.Iu(50, 50, V.XG);
		var R = new HistoryState("Layer Type", this);
		R.data = {
			a: Q,
			j: t,
			abk: [a, p],
			pX: [m, n]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.mH) {
		var F = [];
		if (y) {
			var c = G.getHeadHistoryState(),
				v = c ? c.data : null;
			if (c != null && c.G == this && v.a == LayerRecord.mH && v.xn.length != 1) {
				var i = new Action(ActionTypes.E.v);
				i.G = f.lv;
				i.data = {
					a: "h_stepbck"
				};
				d.dispatch(i);
				if (v.j == t) return
			}
			var z = G.root.O4(t),
				P = z,
				C = [l.j];
			while (P.parent != G.root) {
				C.push(P.parent.index);
				P = P.parent
			}
			for (var A = 0; A < G.B.length; A++) {
				var h = G.B[A],
					P = G.root.O4(A),
					L = C.indexOf(A) != -1 ? !0 : h.zD() && z.depth < P.depth;
				if (L != h.zD()) F.push(A)
			}
		} else if (l.xn) F = l.xn;
		else {
			F.push(t);
			var U = G.B[t].zD(),
				Y = {
					kT: U ? "hide" : "show",
					a0: {
						classID: U ? "Hd" : "Shw",
						null: {
							t: "VlLs",
							v: [PsdDescriptorHelper.Fw("Lyr", !0)]
						}
					}
				};
			this.track(Y)
		}
		var R = new HistoryState("Layer visibility", this, !0);
		R.data = {
			a: Q,
			xn: F,
			j: t
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.bj) {
		if (V.QN == f.QC) {
			var S = new Action(ActionTypes.E.L);
			S.data = {
				a: ActionTypes.$.yb,
				G: f.$C
			};
			d.dispatch(S)
		}
		var E = l.ayc,
			x = l.VY,
			bC, escape = !1,
			O = !1;
		if (l.St) {
			if (M && (x == 0 || x == 1 || x == 2)) {
				var K = 0;
				if (e) K++;
				if (y) K += 2;
				var u = new Action(ActionTypes.E.v, !0);
				u.G = f.Da;
				u.data = {
					a: "fromlayer",
					X9: [l.j, x, K]
				};
				d.dispatch(u);
				return
			}
		}
		var Y = {
			kT: "select",
			a0: {
				classID: "null",
				MkVs: {
					t: "bool",
					v: !1
				}
			}
		};
		G.adQ();
		if (b.l(KeyboardHandler.wz) || l.ib == 0) {
			var $ = G.g.indexOf(t);
			if ($ == -1) G.g.push(t);
			else if (G.g.length > 1) {
				if (l.ib != 0) G.g.splice($, 1)
			}
			G.g.sort(function(R, f4) {
				return R - f4
			});
			Y.a0.selectionModifier = {
				t: "enum",
				v: {
					selectionModifierType: "addToSelection"
				}
			};
			bC = t
		} else if (e && !y && x > 0) {
			Q = x == 1 ? LayerRecord.sF : x == 2 ? LayerRecord.dD : LayerRecord.W0;
			escape = !0
		} else if ((e || l.ib == 1) && G.g.length > 0) {
			var gX = Math.min(t, G.g[0]),
				_ = Math.max(t, G.g[G.g.length - 1]);
			G.g = [];
			for (var A = gX; A <= _; A++)
				if (G.B[A].add.lsct != LayerSectionType.divider) G.g.push(A);
			Y.a0.selectionModifier = {
				t: "enum",
				v: {
					selectionModifierType: "addToSelectionContinuous"
				}
			};
			bC = t
		} else {
			bC = t;
			if (t >= G.B.length) return;
			var h = G.B[t];
			if (h && h.IQ() && l.ahZ) h.add.lsct = LayerSectionType.open;
			else if (G.g.length == 1 && G.g[0] == t && Math.max(0, x) == h.ht) {
				O = !0;
				G.i_ = !1
			}
			if (!O) {
				G.g = [t];
				G.rf()
			}
		}
		if (!O) {
			if (bC != null && bC < G.B.length) {
				Y.a0.null = {
					t: "obj ",
					v: [{
						t: "name",
						v: {
							classID: "Lyr",
							val: G.B[bC].getName()
						}
					}]
				}, this.track(Y)
			}
			if (!escape) {
				console.log("no escape");
				if (G.g.length == 1) {
					var jI = G.g[0];
					for (var A = 0; A < G.B.length; A++) {
						if (A == jI) continue;
						var W = G.B[A];
						W.ht = 0;
						W.VM = !1
					}
					var I = G.B[jI];
					if (x == 2) {
						I.VM = !I.VM;
						G.yK = []
					} else if (I) {
						I.ht = x <= 0 ? 0 : x
					}
				} else
					for (var A = 0; A < G.B.length; A++) {
						var W = G.B[A];
						W.ht = 0;
						W.VM = !1
					}
				G.jP = null;
				G.bV = !0
			}
		}
		if (l.St && y) {
			if ((x == 1 || x == 3) && E != null) {
				var u = new Action(ActionTypes.E.v, !0);
				u.G = f.t7;
				u.data = {
					a: "mskView",
					Z: E != 0 ? 0 : e ? 1 : 2
				};
				d.dispatch(u)
			} else {
				this.TA({
					a: LayerRecord.Gk,
					j: l.j
				}, d, G, b, V)
			}
		}
	}
	if (Q == LayerRecord.sF || Q == LayerRecord.W0) {
		var iw = Q == LayerRecord.sF,
			hn = iw ? I.c3() : I.vZ(G).z;
		if (hn == null) return;
		var R = new HistoryState(hn.isEnabled ? iw ? [6, 15] : [6, 42] : iw ? [6, 14] : [6, 41], this);
		R.data = {
			a: Q,
			j: t
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.dD) {
		var hn = I.add.vmsk;
		if (hn == null) return;
		var R = new HistoryState(hn.isEnabled ? [6, 17] : [6, 16], this);
		R.data = {
			a: Q,
			j: t
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.ac5) {
		var jq = I.add.lsct == LayerSectionType.open ? LayerSectionType.closed : LayerSectionType.open,
			P = G.root.O4(G.B.indexOf(I)),
			eE = !1;
		if (b.l(KeyboardHandler.wz)) {
			var iv = P.parent;
			for (var A = 0; A < iv.children.length; A++) {
				var kq = iv.children[A].j;
				if (kq.IQ()) kq.add.lsct = jq
			}
		} else I.add.lsct = jq;
		for (var A = 0; A < G.g.length; A++) {
			var e8 = G.g[A];
			if (P.Vd < e8 && e8 < P.index) eE = !0
		}
		if (eE) G.g = [P.index];
		G.bV = !0
	}
	if (Q == LayerRecord.Gk) {
		if (!G.Hz(t)) return;
		var R = new HistoryState(I.usesClippingMask ? [6, 19] : [6, 18], this);
		R.data = {
			a: Q,
			j: t
		};
		G.pushHistoryState(R);
		if (l.mz == null || l.mz != I.usesClippingMask) this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.ami) {
		if (I.bn()) I.layerFlags -= 32;
		else I.layerFlags += 32;
		G.bV = !0
	}
	if (Q == LayerRecord.M0 || Q == LayerRecord.Wj) {
		var R;
		if (Q == LayerRecord.M0) R = new HistoryState(I.add.lmfx.masterFXSwitch.v ? [6, 30, 0] : [6, 29], this);
		if (Q == LayerRecord.Wj) R = new HistoryState(I.add.SoLd.filterFX.v.enab.v ? [6, 44] : [6, 43], this);
		R.data = {
			a: Q,
			j: t
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.f0 || Q == LayerRecord.GQ) {
		var jI = l.index,
			R;
		if (Q == LayerRecord.f0) R = new HistoryState(I.add.lmfx[LayerStyleConstants.effectMultiKeys[jI[0]]].v[jI[1]].v.enab.v ? [6, 30, 0] : [6, 29], this);
		if (Q == LayerRecord.GQ) R = new HistoryState(I.add.SoLd.filterFX.v.filterFXList.v[jI].v.enab.v ? [6, 44] : [6, 43], this);
		R.data = {
			a: Q,
			j: t,
			index: l.index
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.R4) {
		if (l.src == l.hw) return;
		var aI = G.B[l.src],
			dK = G.B[l.hw],
			jC = aI.add.lmfx ? JSON.stringify(aI.add.lmfx) : "",
			d7 = dK.add.lmfx ? JSON.stringify(dK.add.lmfx) : "";
		if (dK.add.lmfx == null) {
			dK.add.lmfx = JSON.parse(LayerStyleConstants.defaultLayerStyleJson);
			for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) dK.add.lmfx[LayerStyleConstants.effectMultiKeys[A]] = {
				t: "VlLs",
				v: []
			}
		}
		if (l.aN == null) {
			dK.add.lmfx = JSON.parse(jC);
			if (!y) delete aI.add.lmfx
		} else {
			var ka = l.aN[0],
				hS = LayerStyleConstants.effectMultiKeys[ka];
			if (LayerStyleConstants.multiInstanceEffectTypes.indexOf(LayerStyleConstants.effectOrder[ka]) == -1) dK.add.lmfx[hS].v = [];
			dK.add.lmfx[hS].v.push(aI.add.lmfx[hS].v[l.aN[1]]);
			if (!y) aI.add.lmfx[hS].v.splice(l.aN[1], 1)
		}
		var eH = aI.add.lmfx ? JSON.stringify(aI.add.lmfx) : "",
			kA = dK.add.lmfx ? JSON.stringify(dK.add.lmfx) : "";
		if (!dK.bn()) dK.layerFlags += 32;
		var R = new HistoryState("Move Layer Styles", this);
		R.data = {
			a: Q,
			eB: l.src,
			Ui: l.hw,
			ady: jC,
			a74: d7,
			akR: eH,
			ahP: kA
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.Sk) {
		if (l.src != null) t = l.src;
		var W = G.B[t],
			gq = JSON.stringify(W.add.SoLd),
			hb = JSON.parse(gq),
			ex = hb.filterFX.v.filterFXList.v;
		ex.splice(l.aN, 1);
		var R = new HistoryState([6, 53], this);
		R.data = {
			a: LayerRecord.z5,
			TU: [{
				b4: t,
				Jy: [gq, JSON.stringify(hb)]
			}]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.agf) {
		var fs = y,
			aI = G.B[l.src],
			dK = G.B[l.hw],
			f_ = [];
		if (aI != dK && dK.add.SoLd == null) {
			alert("Target layer is not a smart object!");
			return
		}
		if (aI == dK && !fs && l.aN == l._L) return;
		if (aI == dK && l.aN == -1) return;
		var bD = aI.vZ(G),
			gq = JSON.stringify(aI.add.SoLd),
			hb = JSON.parse(gq),
			ex = hb.filterFX.v.filterFXList.v;
		if (aI == dK) {
			ex.splice(l._L, 0, ex[l.aN]);
			if (!fs) ex.splice(l.aN + (l.aN < l._L ? 0 : 1), 1);
			f_.push({
				b4: l.src,
				Jy: [gq, JSON.stringify(hb)]
			})
		} else if (l.aN == -1) {
			var ae = hb.filterFX;
			if (!fs) {
				delete hb.filterFX;
				f_.push({
					b4: l.src,
					Jy: [gq, JSON.stringify(hb)],
					zK: [bD, null]
				})
			}
			var em = dK.aW() ? dK.vZ(G) : null,
				dY = PsdDocument.aff(bD),
				f7 = JSON.stringify(dK.add.SoLd),
				bM = JSON.parse(f7);
			bM.placed.v = dY.id;
			bM.filterFX = ae;
			f_.push({
				b4: l.hw,
				Jy: [f7, JSON.stringify(bM)],
				zK: [em, dY]
			})
		} else {
			var iP = ex[l.aN];
			if (!fs) {
				ex.splice(l.aN, 1);
				f_.push({
					b4: l.src,
					Jy: [gq, JSON.stringify(hb)]
				})
			}
			var f7 = JSON.stringify(dK.add.SoLd),
				bM = JSON.parse(f7);
			if (bM.filterFX == null) bM.filterFX = FilterHelper.A8();
			var jp = bM.filterFX.v.filterFXList.v;
			jp.splice(l._L, 0, iP);
			var hG = {
				b4: l.hw,
				Jy: [f7, JSON.stringify(bM)]
			};
			if (!dK.aW()) {
				var dY = PsdDocument.auv(dK.add.SoLd.placed.v);
				hG.zK = [null, dY]
			}
			f_.push(hG)
		}
		var R = new HistoryState([6, 52], this);
		R.data = {
			a: LayerRecord.z5,
			TU: f_
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.JX) {
		var hn = I.c3(),
			R = new HistoryState(hn.cv ? [6, 26] : [6, 25], this);
		R.data = {
			a: Q,
			j: t
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G);
		this.track({
			kT: "set",
			a0: {
				classID: "setd",
				null: {
					t: "obj ",
					v: [PsdDescriptorHelper.Fw("Lyr", !0)]
				},
				T: {
					t: "Objc",
					v: {
						classID: "Lyr",
						Usrs: {
							t: "bool",
							v: hn.cv
						}
					}
				}
			}
		})
	}
	if (Q == LayerRecord.GD) {
		var hn = I.add.vmsk,
			R = new HistoryState(hn.cv ? [6, 28] : [6, 27], this);
		R.data = {
			a: Q,
			j: t
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord._T) {
		var R = new HistoryState("Variables / Datasets", this),
			hf = JSON.stringify([G.tJ, G.rw]);
		if (hf == l.Z) return;
		R.data = {
			a: Q,
			aiC: hf,
			a49: l.Z
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.ll) {
		var d2 = [],
			R;
		for (var A = 0; A < G.g.length; A++) {
			var H = G.g[A],
				h = G.B[H];
			if (h.add.vogk) d2.push(H, JSON.stringify(h.add.vogk))
		}
		for (var A = 0; A < G.yK.length; A++) {
			var H = G.yK[A],
				h = G.t_[H];
			if (h.add.vogk) d2.push(-1 - H, JSON.stringify(h.add.vogk))
		}
		PixelUtil.X.aA4(G, l.Z, l.azV);
		var gu = [];
		for (var A = 0; A < G.g.length; A++) {
			var H = G.g[A],
				h = G.B[H];
			if (h.add.vogk) gu.push(H, JSON.stringify(h.add.vogk))
		}
		for (var A = 0; A < G.yK.length; A++) {
			var H = G.yK[A],
				h = G.t_[H];
			if (h.add.vogk) gu.push(-1 - H, JSON.stringify(h.add.vogk))
		}
		var g = G.getHeadHistoryState();
		if (g && g.data && g.data.a == Q) {
			var jt = !0;
			for (var A = 0; A < d2.length; A += 2)
				if (d2[A] != g.data.av[A]) jt = !1;
			if (jt) {
				R = g;
				R.data.DY = gu
			}
		}
		if (R == null) {
			var R = new HistoryState([12, 91, 1], this);
			R.data = {
				a: Q,
				av: d2,
				DY: gu
			};
			G.pushHistoryState(R)
		}
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.ka) {
		var ip = JSON.stringify(I.add.artb),
			aQ = JSON.stringify(l.rX),
			R;
		G.B[t].add.artb = JSON.parse(aQ);
		var iL = new Rect(0, 0, G.m, G.n),
			jx = f.Gt.p5(G),
			g = G.getHeadHistoryState();
		if (g && g.data && g.data.a == Q && g.data.j == t) {
			R = g;
			R.data.rX = aQ
		}
		if (R == null) {
			var R = new HistoryState("Editing Artboard", this);
			R.data = {
				a: Q,
				j: t,
				aya: ip,
				rX: aQ,
				CQ: iL
			};
			G.pushHistoryState(R)
		}
		R.data.wv = jx;
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.B1) {
		var gu = G.vj.slice(0),
			ep = G.FB.slice(0),
			gz = G.P,
			ed = G.P;
		if (l.y3 == "fromAction") {
			var bo = l.Z.kT,
				d0 = l.Z.a0;
			if (bo == "make" || bo == "duplicate") {
				var c0 = gu.length,
					iH = !1,
					bS = !1;
				if (G.kg()) c0--;
				var cv = new LayerRecord.LayerMask;
				cv.name = "Alpha " + (c0 + 1);
				if (bo == "make") {
					var gg = d0.Nw.v;
					cv.color = 0;
					ep = [c0];
					cv.jv = !0;
					cv.bu = gg.Opct.v;
					if (gg.Nm) cv.name = gg.Nm.v;
					if (gg.classID == "SCch") {
						iH = !0;
						ed = null;
						cv.Ts = 1
					}
				} else {
					var bG = d0.null.v[0].v;
					if (bG.keyID == "fsel") iH = !0;
					else {
						var jj = f.GS.apd(G);
						ed = f.GS.afQ(G, jj);
						cv.color = 0;
						cv.rect = ed.rect;
						cv.channel = ed.channel
					}
				}
				if (iH) {
					cv.color = 0;
					if (G.P) {
						cv.rect = G.P.rect.clone();
						cv.channel = G.P.channel.slice(0)
					}
					if (bS) {
						cv.color = 255 - cv.color;
						PixelUtil.invertUint32Buffer(cv.channel)
					}
				}
				for (var A = 0; A < G.vj.length; A++) G.vj[A].jv = !1;
				G.u.MX = [0, 0, 0];
				gu.splice(c0, 0, cv)
			} else if (bo == "delete") {
				if (I && I.c3() && I.ht == 1) {
					this.TA({
						a: LayerRecord.uU
					}, d, G, b, V);
					return
				}
				var ay = G.FB;
				ay.sort(function(R, f4) {
					return f4 - R
				});
				if (ay.length == 0) return;
				for (var A = 0; A < ay.length; A++) gu.splice(ay[A], 1);
				ep = [];
				G.u.MX = [1, 1, 1]
			} else if (bo == "hide") {
				gu[ep[0]] = gu[ep[0]].clone();
				gu[ep[0]].jv = !1
			}
		}
		if (l.y3 == "rnm") {
			gu[l.sy] = gu[l.sy].clone();
			gu[l.sy].name = l.name
		}
		var R = new HistoryState("Channel Edit", this);
		R.data = {
			a: Q,
			av: G.vj.slice(0),
			My: G.FB.slice(0),
			DY: gu,
			AZ: ep,
			Sd: gz,
			le: ed
		};
		this.applyRedo(R.data, G);
		G.pushHistoryState(R)
	}
	if (Q == LayerRecord.OD) {
		var cH = new Rect(0, 0, G.m, G.n),
			R = new HistoryState(l.Il, this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: l.Za,
			si: G.g.slice(0),
			u4: l.le
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G);
		var e6 = f.Gt.vd(G);
		if (e6) {
			R.data.CQ = cH;
			R.data.wv = e6
		}
	}
	if (Q == LayerRecord.Qe) {
		var fi = G.OM(null, l.j),
			aD = 1e10;
		if (fi.length == 0) return;
		if (G.B.length == fi.length) {
			alert("Project must have at least 1 layer");
			return
		}
		var et = [];
		for (var A = 0; A < G.B.length; A++)
			if (fi.indexOf(A) == -1) et.push(G.B[A]);
		for (var A = 0; A < fi.length; A++) aD = Math.min(aD, fi[A]);
		aD = Math.max(aD - 1, 0);
		while (et[aD].name == "</Layer group>") aD++;
		this.track({
			kT: "delete",
			a0: {
				classID: "Dlt",
				null: PsdDescriptorHelper.Fw("Lyr", !0)
			}
		});
		var iL = new Rect(0, 0, G.m, G.n),
			R = new HistoryState([6, 31], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: et,
			si: G.g.slice(0),
			u4: [aD]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G);
		var jx = f.Gt.p5(G);
		if (jx) {
			R.data.wv = jx;
			R.data.CQ = iL;
			f.Gt.vd(G)
		}
	}
	if (Q == LayerRecord.Ok) {
		if (!b.l(KeyboardHandler.Zz)) return;
		var R = new HistoryState("Switch Layer Link", this);
		R.data = {
			a: Q,
			j: l.j
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.cr) {
		var ay = l.awT ? l.awT : G.g,
			c7 = 0,
			i4 = !1;
		if (ay.length == 0) return;
		if (ay.length == 1 && G.B[ay[0]].folderStackIndex == 0) {
			alert("Select multiple layers");
			return
		}
		var ga = [];
		for (var A = 0; A < G.B.length; A++) {
			var cY = G.B[A].folderStackIndex;
			ga.push(cY);
			c7 = Math.max(c7, cY)
		}
		var jS = -1,
			e7 = -1;
		for (var A = 0; A < ay.length; A++) {
			var cY = G.B[ay[A]].folderStackIndex;
			if (cY == 0) i4 = !0;
			else if (jS == -1 || jS == cY) jS = cY;
			else e7 = cY
		}
		if (!i4)
			for (var A = 0; A < ay.length; A++) G.B[ay[A]].folderStackIndex = 0;
		else if (jS != -1 && e7 == -1)
			for (var A = 0; A < ay.length; A++) G.B[ay[A]].folderStackIndex = jS;
		else
			for (var A = 0; A < ay.length; A++) G.B[ay[A]].folderStackIndex = c7 + 1;
		var ct = [];
		for (var A = 0; A < G.B.length; A++) {
			var cY = G.B[A].folderStackIndex;
			if (ct[cY] == null) ct[cY] = 0;
			ct[cY]++
		}
		for (var A = 0; A < G.B.length; A++) {
			var cY = G.B[A].folderStackIndex;
			if (ct[cY] == 1) G.B[A].folderStackIndex = 0
		}
		var bj = ga;
		ga = [];
		for (var A = 0; A < G.B.length; A++) {
			var cY = G.B[A].folderStackIndex;
			ga.push(cY);
			c7 = Math.max(c7, cY)
		}
		var R = new HistoryState(i4 ? [6, 54, 0] : [6, 54, 1], this);
		R.data = {
			a: LayerRecord.cr,
			a7X: bj,
			ay8: ga
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.ZY && (l.j != null || G.g.length != 0) || Q == LayerRecord.zY) {
		var jo = G.OB(Q == LayerRecord.ZY ? l.j : t, null, l.ay$),
			er;
		if (Q == LayerRecord.zY) {
			var W = jo[0],
				bo = W.add.SoLd.Idnt.v,
				iV = G.Lu(bo).clone();
			W.add.SoLd.Idnt.v = iV.AN = PsdDocument.Xb() + bo.slice(8);
			G.add.lnk2.push(iV)
		}
		if (Q == LayerRecord.ZY) {
			var h_ = {
				kT: "duplicate",
				a0: {
					classID: "null",
					null: PsdDescriptorHelper.Fw("Lyr", !0)
				}
			};
			if (l.Xu) {
				jo[jo.length - 1].tH(l.Xu);
				h_.Nm = {
					t: "TEXT",
					v: l.Xu
				}
			}
			this.track(h_);
			l.a24 = l.j
		}
		Q = LayerRecord.Bl;
		l.B = jo;
		l.Lf = G;
		l.IC = G
	}
	if (Q == LayerRecord.Bl) {
		var i2, kj, a3 = l.Lf,
			ke = l.IC,
			cN = 0,
			iO = 0,
			bH = !1,
			gi, a0 = 0,
			g5 = 0;
		if (a3 != ke) {
			console.log("ADDLAYERS different projs");
			var i2 = new Rect(0, 0, a3.m, a3.n),
				kj = new Rect(0, 0, ke.m, ke.n),
				b1 = [],
				fb = [];
			for (var A = 0; A < l.B.length; A++) {
				var W = l.B[A];
				if (W.add.SoLd == null) continue;
				var bo = W.add.SoLd.Idnt.v;
				if (b1.indexOf(bo) == -1) {
					b1.push(bo);
					fb.push(PsdDocument.Xb() + bo.slice(8))
				}
				W.add.SoLd.Idnt.v = fb[b1.indexOf(bo)];
				var bD = W.vZ(a3);
				if (bD) {
					a3.mP(bD);
					ke.p_(bD)
				}
			}
			if (b1.length > 0) {
				if (ke.add.lnk2 == null) ke.add.lnk2 = [];
				for (var A = 0; A < b1.length; A++) {
					var eg = a3.Lu(b1[A]),
						iV = eg.clone();
					iV.AN = fb[A];
					ke.add.lnk2.push(iV)
				}
			}
		}
		var gz = ke.g.slice(0);
		gz.sort(function(R, f4) {
			return R - f4
		});
		var et = ke.B.slice(0),
			ed = [],
			gK = -1;
		for (var A = 0; A < gz.length; A++) gK = Math.max(gK, gz[A]);
		if (l.a24 != null) gK = l.a24;
		var b6 = a3.bZ();
		if (l.Fa) {
			gK = l.Fa - 1;
			var j7 = ke.B[l.Fa].dA();
			cN += j7.x;
			iO += j7.y
		}
		if (b6 != -1 && (a3 != ke || l.Fa)) {
			var iM = a3.B[b6].dA();
			cN -= iM.x;
			iO -= iM.y
		}
		var jr = ke.Ww();
		for (var A = 0; A < jr[0].length; A++) {
			var cj = jr[1][A];
			if (cj != -1) jr[1][A] = et[cj]
		}
		gK++;
		for (var A = 0; A < l.B.length; A++) {
			var h = l.B[A],
				iA = h.add.artb;
			et.splice(gK, 0, h);
			ed.push(gK);
			gK++;
			if (iA) {
				gi = !0;
				var g9 = iA.guideIndeces;
				if (g9) {
					g9 = g9.v;
					for (var h1 = 0; h1 < g9.length; h1++) {
						jr[0].push(a3.qz[g9[h1].v].slice(0));
						jr[1].push(h);
						bH = !0
					}
				}
			}
		}
		for (var A = 0; A < jr[0].length; A++) {
			var cj = jr[1][A];
			if (cj != -1) jr[1][A] = et.indexOf(cj)
		}
		for (var A = 0; A < l.B.length; A++) {
			var h = l.B[A];
			if (h.add.lsct == LayerSectionType.divider) {
				if (a0 == 0) g5++;
				a0++
			} else if (h.IQ()) a0--
		}
		if (g5 == 1) ed = [gK - 1];
		var R = new HistoryState([6, 0], this);
		R.data = {
			a: LayerRecord.OD,
			ih: ke.B.slice(0),
			Za: et,
			si: gz,
			u4: ed
		};
		if (bH) {
			R.data.FV = [ke.Ww(), jr]
		}
		ke.pushHistoryState(R);
		this.applyRedo(R.data, ke);
		if (cN != 0 || iO != 0) f.Pq._P(ke, ke.OM(), null, cN, iO);
		if (gi) {
			R.data.CQ = new Rect(0, 0, ke.m, ke.n);
			R.data.wv = f.Gt.p5(ke);
			f.Gt.vd(ke)
		}
	}
	if (Q == LayerRecord.amI) {
		var dj = l.j != null ? [l.j] : G.OM(),
			et = G.B.slice(0);
		for (var A = 0; A < dj.length; A++) {
			var h = G.B[dj[A]].clone();
			h.IO(G);
			et.splice(dj[A], 1, h)
		}
		var R = new HistoryState([6, 8], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: et,
			si: G.g.slice(0),
			u4: G.g.slice(0)
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.aqo) {
		var et = G.B.slice(0),
			h = et[G.g[0]] = et[G.g[0]].clone(),
			jA = h.add.lmfx,
			jb, j7;
		delete h.add.lmfx;
		var jv = G.g[0],
			cz = jv + 1;
		if (h.IQ()) {
			var fB = G.B[G.g[0]].hD;
			j7 = fB.aqy;
			jb = fB.tw;
			var P = G.root.O4(jv);
			jv = P.Vd
		} else {
			j7 = h.rect;
			jb = PixelUtil.allocBytes(j7.O());
			PixelUtil.extractChannelFromRgba(h.buffer, jb, 3)
		}
		var eC = PatternHelper._r(jA, h.add.fxrp, jb, j7, G, j7).type;
		for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) {
			var iW = LayerStyleConstants.effectOrder[A],
				jf = eC[iW];
			jf.reverse();
			for (var h1 = 0; h1 < jf.length; h1++) {
				var f9 = jf[h1],
					r = G.V4(),
					iC = A > 7;
				if (iW == "ebbl") {
					if (f9.p9 || f9.Ei) {
						var fP = f9.p9 ? f9.p9 : f9.Ei;
						if (f9.p9) delete f9.p9;
						else delete f9.Ei;
						if (f9.Ei || f9.l2) h1--
					} else if (f9.l2 || f9.gp) {
						var fP = f9.gp ? f9.gp : f9.l2;
						if (f9.gp) {
							delete f9.gp;
							if (f9.l2) h1--
						}
						iC = !0
					}
					f9 = fP
				}
				r.blendModeKey = f9.xm;
				r.opacity = Math.round(255 * f9.Si);
				r.buffer = f9.QI;
				r.rect = f9.We.clone();
				r.rect.offset(j7.x, j7.y);
				if (iW == "FrFX") {
					r.buffer = r.buffer.slice(0);
					PixelUtil.writeChannelToRgba(f9.b8 ? f9.b8 : f9.BX, r.buffer, 3);
					if (f9.b8) {
						iC = !0;
						delete f9.b8;
						if (f9.BX) h1--
					}
				}
				r.usesClippingMask = !iC;
				r.tH(h.getName() + "'s " + languageManager.get(LayerStyleConstants.effectDisplayNames[A]));
				et.splice(iC ? jv : cz, 0, r);
				if (iC) cz++
			}
		}
		var R = new HistoryState("Styles to Layers", this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: et,
			si: G.g.slice(0),
			u4: [cz - 1]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.pL) {
		var dj = G.OM(),
			et = G.B.slice(0),
			at = new Rect(0, 0, G.m, G.n);
		for (var A = 0; A < dj.length; A++) {
			var cg = G.B[dj[A]],
				ac = cg.zD();
			cg.Oj(!0);
			var j$ = G.root.O4(dj[A]);
			if (cg.IQ()) continue;
			if (j$ == null) continue;
			var h = cg.clone();
			h.IO(G);
			var bw = j$.Pa(G, !0),
				ca = G.B;
			G.g8([cg]);
			G.U();
			G.Po();
			h.buffer = PixelUtil.allocBytes(bw.O() * 4);
			PixelUtil.blitRgbaRect(G.LT(), at, h.buffer, bw);
			h.rect = bw;
			h.opacity = 255;
			h.add.iOpa = 255;
			h.blendModeKey = "norm";
			h.U();
			h.hD.q6 = !0;
			G.g8(ca);
			if (h.add.lmfx) delete h.add.lmfx;
			h.z = h.UG = null;
			et.splice(dj[A], 1, h);
			h.Oj(ac);
			cg.Oj(ac)
		}
		var R = new HistoryState([6, 34], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: et,
			si: G.g.slice(0),
			u4: G.g.slice(0)
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.aon) {
		var dj = G.OM(),
			et = G.B.slice(0);
		for (var A = 0; A < dj.length; A++) {
			var h = G.B[dj[A]],
				fX = h.add.TySh;
			if (fX == null) continue;
			var W = new je(fX.zC, V.Hg),
				bb = PixelUtil.vec.s6(StyleHelper.textLayerToPath(W, fX));
			for (var eh in bb) {
				var fI = bb[eh],
					kq = h.clone();
				delete kq.add.TySh;
				kq.layerFlags = kq.layerFlags | 1 << 4;
				kq.add.SoCo = JSON.parse(JSON.stringify(LayerStyleConstants.defaultContentStyles[0]));
				var fd = kq.add.SoCo.Clr.v;
				fd.Rd.v = parseInt(eh.slice(1, 3), 16);
				fd.Grn.v = parseInt(eh.slice(3, 5), 16);
				fd.Bl.v = parseInt(eh.slice(5, 7), 16);
				var dS = new LayerRecord.VectorMask;
				dS.i = PixelUtil.vec.QO(fI, !1);
				if (kq.add.vmsk != null) {
					kq.add.vmsk.a2d();
					dS.concat(kq.add.vmsk)
				}
				kq.add.vmsk = dS;
				kq.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default));
				kq.Ba();
				kq.QJ(G);
				et.splice(et.indexOf(h), 0, kq)
			}
			et.splice(et.indexOf(h), 1)
		}
		var ed = G.g.slice(0);
		for (var A = ed.length - 1; A >= 0; A--)
			if (ed[A] >= et.length) ed.splice(A, 1);
		var R = new HistoryState([6, 40], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: et,
			si: G.g.slice(0),
			u4: ed
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.ZP) {
		var eX = G.g.length,
			hp, ks;
		if (eX < 2) {
			alert("Select two or more layers.");
			return
		}
		for (var A = 0; A < eX; A++) {
			var iM = G.B[G.g[A]].rect;
			hp = A == 0 ? iM : hp.wD(iM);
			ks = A == 0 ? iM : ks.Cw(iM)
		}
		if (hp.O() * 1.2 > ks.O()) {
			alert("stacking images");
			var dU = [],
				eK = [];
			for (var A = 0; A < eX; A++) {
				var h = G.B[G.g[A]];
				dU.push(h.buffer);
				eK.push(h.rect)
			}
			var hr = PixelUtil.az5.kt(dU, eK),
				aK = hr[0],
				h9 = hr[1],
				g1 = [];
			for (var A = 0; A < eX; A++) {
				var hn = new LayerRecord.LayerMask;
				hn.color = 255;
				hn.rect = h9;
				hn.channel = aK[A];
				g1.push(G.g[A], null, hn)
			}
			var R = new HistoryState("Focus-Stack", this);
			R.data = {
				a: LayerRecord.Yi,
				Qc: g1
			};
			G.pushHistoryState(R);
			this.applyRedo(R.data, G);
			return
		}
		if (!G.fU()) return;
		var kq = G.B[G.g[0]].clone(),
			et = [];
		for (var A = 0; A < G.B.length; A++)
			if (G.g.indexOf(A) == -1) et.push(G.B[A]);
		et.splice(G.g[0], 0, kq);
		for (var A = 1; A < eX; A++)
			if (G.B[G.g[A]].rect.O() > 2e6) {
				alert("Blended areas are too large.");
				return
			}
		for (var A = 1; A < eX; A++) {
			var h = G.B[G.g[A]],
				h9 = h.rect.clone();
			h9.rC(1, 1);
			var f4 = PixelUtil.allocBytes(h9.O() * 4);
			PixelUtil.blitRgbaRect(h.buffer, h.rect, f4, h9);
			kq.extend(h9);
			var cs = PixelUtil.allocBytes(h9.O() * 4);
			PixelUtil.blitRgbaRect(kq.buffer, kq.rect, cs, h9);
			var R = PixelUtil.allocBytes(h9.O());
			PixelUtil.extractChannelFromRgba(f4, R, 3);
			PixelUtil.round(R, 200);
			PixelUtil.writeChannelToRgba(R, f4, 3);
			PixelUtil.blend.compositeBlend("norm", f4, h9, cs, h9, h9, 1);
			PixelUtil.f2.RQ(cs, R, h9);
			PixelUtil.blitRgbaRect(cs, h9, kq.buffer, kq.rect)
		}
		var R = new HistoryState([2, 10, 0], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: et,
			si: G.g.slice(0),
			u4: [G.g[0]]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.JQ) {
		var et = G.B.slice(0),
			ep = G.g.slice(0);
		for (var A = 0; A < et.length; A++) {
			var h = et[A],
				iT = h.add.vmsk;
			if (h.VF() && iT && h.add.vstk.strokeEnabled.v && !h.add.vstk.fillEnabled.v) {
				var dL = iT.i,
					hD = 0,
					hP = -1;
				for (var h1 = 0; h1 < dL.length; h1++) {
					if ((dL[h1].type == 0 || dL[h1].type == 3) && dL[h1].H$ != -1) {
						hD++;
						if (dL[h1].type == 3 && hP == -1) {
							dL[h1]._M = dL[h1].H$ = 1;
							hP = h1
						}
					}
				}
				if (hD > 1 && hP != -1 && hD < 10) {
					console.log("separating an open path into a new layer");
					h = h.clone();
					iT = h.add.vmsk;
					dL = iT.i;
					var r = dL[hP].length,
						fD = h.clone();
					fD.add.lyid = G.NE();
					iT.i = dL.slice(0, 2).concat(dL.slice(hP, hP + r + 1));
					iT.g = [];
					h.QJ(G);
					h.U();
					var c3 = fD.add.vmsk.i;
					fD.add.vmsk.i = c3.slice(0, hP).concat(c3.slice(hP + r + 1, c3.length));
					fD.add.vmsk.g = [];
					fD.QJ(G);
					et[A] = h;
					et.splice(A + 1, 0, fD);
					for (var h1 = 0; h1 < ep.length; h1++)
						if (ep[h1] > A) ep[h1]++;
					var cX = ep.indexOf(A);
					if (cX != -1) {
						ep.splice(cX + 1, 0, A + 1)
					}
				}
			}
		}
		if (et.length != G.B.length) {
			var R = new HistoryState("Splitting open paths", this);
			R.data = {
				a: LayerRecord.OD,
				ih: G.B.slice(0),
				Za: et,
				si: G.g.slice(0),
				u4: ep
			};
			G.pushHistoryState(R);
			this.applyRedo(R.data, G)
		}
	}
	if (Q == LayerRecord.md) {
		this.TA({
			a: LayerRecord.JQ
		}, d, G, b, V);
		var gz = G.g.slice(0),
			ca = G.B.slice(0),
			dj = G.OM();
		if (dj.length == 0) return;
		G.ayT(dj, !1, l.oE);
		var R = new HistoryState([6, 36, 0], this);
		R.data = {
			a: LayerRecord.OD,
			ih: ca,
			Za: G.B.slice(),
			si: gz,
			u4: G.g.slice(0)
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.aeu) {
		var gq = I.add.SoLd;
		if (gq == null) return;
		var bo = gq.Idnt.v,
			as = G.Lu(bo);
		as.LT(!1);
		var gO = as.hF[0],
			h9 = as.hF[1];
		if (PixelUtil.hasTransparentAlpha(gO)) {
			alert("The smart object contains transparency.");
			return
		}
		var dn = FormatHandler.jA("jpg").bi([
			[FilterHelper.buffer]
		], h9.m, h9.n, [90]);
		this.TA({
			a: LayerRecord.vH,
			data: new Uint8Array(dn),
			bf: "image.jpg"
		}, d, G, b, V);
		console.log(G.add);
		return
	}
	if (Q == LayerRecord.vH) {
		var at = l.Kv,
			bo = l.id;
		if (at == null) at = G;
		if (bo == null) bo = I.add.SoLd.Idnt.v;
		var eg = at.Lu(bo),
			iV = eg.clone();
		iV.raw = l.data;
		iV.bf = l.bf;
		var c6 = FormatHandler.aJ(l.data.buffer);
		if (c6 == "psd") {
			iV.Rr = "8BIM";
			iV.hA = "8BPB"
		} else {
			iV.Rr = "    ";
			iV.hA = "    "
		}
		iV.LT(!1);
		eg.LT(!1);
		var R = new HistoryState([6, 36, 1], this);
		R.data = {
			a: LayerRecord.vH,
			id: bo,
			Bv: eg,
			d7: iV
		};
		at.pushHistoryState(R);
		this.applyRedo(R.data, at)
	}
	if (Q == LayerRecord.OF) {
		var R = new HistoryState([6, 36, 4], this);
		R.data = {
			a: Q,
			j: t,
			mS: I.add.SoLd.Impr.v.classID,
			mz: l.mz
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.abT) {
		var fY, e0;
		if (l.tZ) {
			fY = l.Kv;
			e0 = l.tZ
		} else {
			l.Kv.vp();
			l.Kv.vo();
			l.Kv.U();
			l.Kv.Po();
			l.Kv.LT();
			fY = FormatHandler.jA("PSD").bi(l.Kv, 0, 0, [!0, !0]);
			e0 = l.Kv.name
		}
		if (!(fY instanceof ArrayBuffer)) throw "e";
		fY = new Uint8Array(fY);
		var $ = l.ca;
		if ($ == null) {
			if (G.g.length == 0) $ = G.g.length;
			else {
				var e8 = G.g[G.g.length - 1],
					r = G.B[e8];
				$ = r.IQ() ? e8 : e8 + 1
			}
		}
		var e4 = new Rect(0, 0, G.m, G.n),
			aV = G.bZ();
		if (aV != -1) e4 = G.B[aV].dA();
		var ey = G.rM(fY, e0, null, null, e4, V.Hg, d),
			et = G.B.slice(0);
		et.splice($, 0, ey);
		var R = new HistoryState([6, 36, 2], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(),
			Za: et,
			si: G.g.slice(0),
			u4: [et.indexOf(ey)]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.WW && l.y3 == "merge") {
		var cE = [],
			kd = G.root.children,
			gx = 0;
		for (var A = 0; A < kd.length; A++) {
			var P = kd[A],
				h = P.j,
				dN = P.children,
				e5 = !0;
			if (!h.IQ() || dN.length == 0) continue;
			for (var h1 = 0; h1 < dN.length; h1++)
				if (!dN[h1].j.getName().startsWith("_a_")) {
					e5 = !1;
					break
				}
			if (e5) cE.push(G.B.indexOf(h))
		}
		var fA = [];
		for (var A = 0; A < cE.length; A++)
			if (G.g.indexOf(cE[A]) != -1) fA.push(cE[A]);
		if (fA.length >= 2) cE = fA;
		if (cE.length < 2) {
			alert("At least two animation folders needed (whose layers start with \"_a_\").", 3500);
			return
		}
		var fC = [];
		for (var A = 0; A < cE.length; A++) fC.push(G.B[cE[A]].getName());
		var jf = [];
		for (var f3 = 0; f3 < cE.length; f3++) {
			var P = G.root.O4(cE[f3]),
				hG = [
					[],
					[], 0, f3
				];
			jf.push(hG);
			for (var A = 0; A < P.children.length; A++) {
				var H = P.children[A].index,
					h = P.children[A].j,
					cv = h.getName(),
					iI = 20,
					ch = cv.split(",");
				if (ch.length > 1) {
					var jH = parseInt(ch.pop());
					if (!isNaN(jH) && jH != 0) iI = jH
				}
				hG[0].push(h);
				hG[1].push(iI);
				hG[2] += iI
			}
		}
		jf.sort(function(R, f4) {
			return f4[2] - R[2]
		});
		var e3 = jf[0],
			bT = e3[2];
		for (var cj = 1; cj < jf.length; cj++) {
			var hG = jf[cj],
				cU = 1,
				ho = hG[1].slice(0),
				gR = 0;
			while ((cU + 1) * hG[2] <= e3[2]) {
				cU++;
				ho = ho.concat(hG[1])
			}
			hG[1] = ho;
			hG[2] *= cU;
			var j2 = e3[2] / hG[2];
			for (var A = 0; A < hG[1].length; A++) {
				var fq = Math.floor(hG[1][A] * j2);
				hG[1][A] = fq;
				gR += fq
			}
			while (gR < bT) {
				gR++;
				hG[1][hG[1].length - 1]++
			}
			hG[2] = gR
		}
		var bn = [],
			hq = [],
			fq = [];
		for (var A = 0; A < jf.length; A++) {
			bn.push(0);
			hq.push(0)
		}
		while (gx < bT) {
			var ah = 1e9,
				c0 = -1;
			for (var A = 0; A < jf.length; A++) {
				var fV = jf[A][1],
					jv = bn[A];
				if (jv != fV.length && hq[A] + fV[jv] < gx + ah) {
					c0 = A;
					ah = hq[A] + fV[jv] - gx
				}
			}
			hq[c0] += jf[c0][1][bn[c0]];
			bn[c0]++;
			if (ah != 0) {
				fq.push(ah);
				gx += ah
			}
		}
		for (var A = 1; A < fq.length; A++) {
			var fZ = fq[A];
			if (fZ < 16 && (fq[A - 1] < 16 || A < fq.length - 1 && 16 <= fq[A + 1])) {
				fq[A - 1] += fZ;
				fq.splice(A, 1);
				A--
			}
		}
		var ac = [],
			at = new Rect(0, 0, G.m, G.n);
		for (var A = 0; A < G.B.length; A++) {
			ac[A] = G.B[A].zD();
			G.B[A].Oj(!1)
		}
		var gm = G.g.slice(0);
		G.g = cE;
		var fi = G.OM();
		fi.sort(function(R, f4) {
			return R - f4
		});
		var et = [];
		for (var A = 0; A < G.B.length; A++) {
			if (fi.indexOf(A) == -1) et.push(G.B[A])
		}
		jf.sort(function(R, f4) {
			return R[3] - f4[3]
		});

		function h8(fV, hI) {
			var A = 0,
				g7 = 0;
			while (g7 + fV[A] <= hI) {
				g7 += fV[A];
				A++
			}
			return A
		}
		gx = 0;
		et.splice(fi[0], 0, G.En());
		for (var fp = 0; fp < fq.length; fp++) {
			var F = [];
			for (var A = 0; A < jf.length; A++) {
				var jv = h8(jf[A][1], gx) % jf[A][0].length,
					h = jf[A][0][jv];
				F.push(h)
			}
			var h = G.V4();
			for (var A = 0; A < jf.length; A++) {
				var iY = F[A],
					iv = G.B[cE[A]];
				iY.Oj(!0);
				iv.Oj(!0)
			}
			G.U();
			G.Po();
			var gO = G.LT();
			h.rect = PixelUtil.tightBoundsFromRgba(gO, at, 2);
			h.buffer = PixelUtil.allocBytes(h.rect.O() * 4);
			PixelUtil.blitRgbaRect(gO, at, h.buffer, h.rect);
			for (var A = 0; A < jf.length; A++) {
				var iY = F[A],
					iv = G.B[cE[A]];
				iY.Oj(!1);
				iv.Oj(!1)
			}
			h.Oj(fp == 0);
			h.tH("_a_frm" + fp + "," + fq[fp]);
			et.splice(fi[0] + 1 + fp, 0, h);
			gx += fq[fp]
		}
		var h = G.V4();
		h.tH(fC.join(" + "));
		h.blendModeKey = "pass";
		h.add.lsct = LayerSectionType.closed;
		h.layerFlags = 24;
		et.splice(fi[0] + 1 + fq.length, 0, h);
		for (var A = 0; A < G.B.length; A++) G.B[A].Oj(ac[A]);
		var R = new HistoryState([6, 12, 0], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B,
			Za: et,
			si: gm,
			u4: [fi[0] + 1 + fq.length]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.Oy || Q == LayerRecord.Qn) {
		var eP = G.g.length == 1 && !G.B[G.g[0]].IQ(),
			f1 = !0,
			ey = null,
			ed;
		if (eP && G.g[0] == 0) return;
		var ca = G.B.slice(0),
			gz = G.g.slice(0);
		if (eP) G.g = [t, t - 1];
		if (Q == LayerRecord.Qn) {
			G.g = [];
			for (var A = 0; A < G.B.length; A++)
				if (G.B[A].zD()) G.g.push(A)
		}
		var dj = G.OM();
		dj.sort(function(R, f4) {
			return R - f4
		});
		var it = new Rect,
			at = new Rect(0, 0, G.m, G.n);
		for (var A = 0; A < dj.length; A++) {
			var H = dj[A],
				h = G.B[H];
			if (h.IQ() || h.getName() == "</Layer group>") continue;
			f1 = f1 && h.VF() && h.add.vmsk != null;
			it = it.Cw(G.root.O4(H).Pa(G, !0))
		}
		if (f1) {
			var iT = null;
			for (var A = 0; A < dj.length; A++) {
				var r = G.B[dj[A]];
				if (r.rect.O() == 0) continue;
				if (ey == null) {
					ey = r.clone();
					iT = ey.add.vmsk
				} else {
					var r = G.B[dj[A]],
						c3 = LayerRecord.VectorMask.FT(r.add.vmsk.i);
					iT.i = iT.i.concat(c3.slice(2));
					ey.add.vogk = ey.add.vogk.concat(JSON.parse(JSON.stringify(r.add.vogk)))
				}
			}
			ey.add.vmsk.y1 = !0;
			ey.QJ(G)
		} else if (at.iL(it)) {
			ey = G.V4();
			ey.tH(G.B[dj[dj.length - 1]].getName());
			ey.rect = it;
			ey.buffer = PixelUtil.allocBytes(it.O() * 4);
			var dT = G.add.artd;
			delete G.add.artd;
			var fE = G.LT(dj);
			if (dT) G.add.artd = dT;
			PixelUtil.blitRgbaRect(fE, at, ey.buffer, it);
			ey.ww();
			ey.U()
		} else {
			G.ayT(dj, !0);
			ey = G.B[G.g[0]];
			G.B.splice(G.g[0], 1);
			var fa = G.Lu(ey.add.SoLd.Idnt.v);
			G.add.lnk2.splice(G.add.lnk2.indexOf(fa), 1);
			delete ey.add.SoLd
		}
		var dV = y,
			al = -1;
		if (l.a0 && l.a0.Dplc && l.a0.Dplc.v) dV = !0;
		if (dV && Q == LayerRecord.Qn && G.B[gz[0]].Eo() && G.B[gz[0]].rect.W6()) {
			al = gz[0]
		}
		if (al != -1 || eP) {
			var kp = G.B[al != -1 ? al : t - 1];
			ey.tH(kp.getName());
			ey.add.lclr = kp.add.lclr
		}
		var et = [];
		for (var A = 0; A < G.B.length; A++)
			if (dV || dj.indexOf(A) == -1)
				if (A != al) et.push(G.B[A]);
		var hV = dj[dj.length - 1],
			gH = hV == G.B.length - 1 ? null : G.B[hV + 1],
			i_ = gH ? et.indexOf(gH) : et.length;
		et.splice(i_, 0, ey);
		ed = [i_];
		var R = new HistoryState([6, 12, 0], this);
		R.data = {
			a: LayerRecord.OD,
			ih: ca,
			Za: et,
			si: gz,
			u4: ed
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.ai4) {
		var kq = G.V4();
		kq.rect = new Rect(0, 0, G.m, G.n);
		kq.buffer = PixelUtil.allocBytes(kq.rect.O() * 4);
		PixelUtil.andMaskUint32(kq.buffer, 4294967295);
		PixelUtil.blend.compositeBlend("norm", G.LT(), kq.rect, kq.buffer, kq.rect, kq.rect, 1);
		kq.tH("Background");
		kq.add.lspf = 1 << 2;
		var R = new HistoryState([6, 12, 1], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(),
			Za: [kq],
			si: G.g.slice(0),
			u4: [0]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	var bY = Q == LayerRecord.Vg || Q == LayerRecord.fG;
	if (Q == LayerRecord.vx || Q == LayerRecord.uz || Q == LayerRecord.yl || Q == LayerRecord.H0 || bY) {
		var h = bY ? G.OB()[0] : G.V4(),
			by = "Layer",
			iF = l.Xu,
			am = !1,
			eY, il;
		if (Q == LayerRecord.yl) by = "Shape";
		if (bY) {
			if (G.P) {
				var cg = G.B[G.g[0]],
					bd = cg.VA(G, G.P);
				if (bd == null) {
					alert("Copied area is empty");
					return
				}
				h.rect = bd.rect;
				h.buffer = bd.XO;
				h.IO(G);
				h.Oj(!0)
			} else iF = h.getName();
			h.add.lspf = 0;
			h.usesClippingMask = !1;
			if ((h.layerFlags & 1) != 0) h.layerFlags--
		}
		if (Q == LayerRecord.H0) {
			h.rect = f.uj.amF(l.wH, G);
			h.buffer = l.wH.buffer.slice(0);
			if (l.bl && G.P) {
				h.z = new LayerRecord.LayerMask;
				h.z.rect = G.P.rect;
				h.z.color = 0;
				h.z.channel = G.P.channel.slice(0)
			}
		}
		if (Q == LayerRecord.vx) {
			this.track({
				kT: "make",
				a0: {
					classID: "Mk",
					null: PsdDescriptorHelper.Fw("Lyr")
				}
			})
		}
		if (Q == LayerRecord.uz) {
			h.layerFlags |= 16;
			var kc = l.a0.Usng.v,
				aH = kc.Type.v,
				eZ = LayerEffectsHelper.invertedClassIdToKey[aH.classID];
			by = languageManager.get(LayerEffectsHelper.names[eZ]);
			if (kc.Nm) iF = kc.Nm.v;
			h.add[eZ] = FilterHelper.oT(eZ);
			if (h.add[eZ] == null) h.add[eZ] = {};
			for (var gs in aH) h.add[eZ][gs] = JSON.parse(JSON.stringify(aH[gs]));
			h.z = f.uj.a9r(G);
			h.ht = 1
		}
		if (Q == LayerRecord.yl) {
			h.layerFlags |= 16;
			var d0 = l.a0,
				kc = d0.Usng.v,
				fk = kc.Type.v,
				i6 = kc.Shp;
			if (kc.Nm) iF = kc.Nm.v;
			if (i6 == null) {
				var eM = G.LW(),
					bb = eM[0],
					bQ = eM[1];
				if (bQ.length != 0 && bb[bQ[0]].sy < 0) {
					var dP = bb[bQ[0]].add;
					h.add.vmsk = dP.vmsk.clone();
					h.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default));
					h.add.vogk = JSON.parse(JSON.stringify(dP.vogk));
					G.yK = []
				} else h.z = f.uj.a9r(G)
			} else {
				h.add.vmsk = new LayerRecord.VectorMask;
				h.add.vstk = JSON.parse(JSON.stringify(kc.strokeStyle ? kc.strokeStyle.v : LayerStyleConstants.strokeStyle.default));
				h.add.vogk = [];
				if (i6) {
					var gP = PixelUtil.X.nI(i6);
					if (gP) {
						h.add.vogk = [gP];
						h.add.vmsk.i.push({
							type: 0,
							H$: 1,
							length: 0
						});
						PixelUtil.X.ry(h.add.vogk, h.add.vmsk)
					} else {
						i6 = i6.v;
						var gB = i6.classID;
						if (gB == "Plgn") {
							var bE = i6.Cntr.v,
								iM = i6.corner.v;
							bE = new Point2D(bE.Hrzn.v.val, bE.Vrtc.v.val);
							iM = new Point2D(iM.Hrzn.v.val, iM.Vrtc.v.val);
							h.add.vmsk.i = PixelUtil.path.shapes.polygon(bE.x, bE.y, Math.sqrt(iM.x * iM.x + iM.y * iM.y), Math.atan2(iM.y, iM.x), i6.sides.v, 0)
						} else if (gB == "customShape") {
							var bL = PixelUtil.X.gq(i6),
								kz = bL[2] - bL[0],
								ge = bL[3] - bL[1],
								cI = V.t6,
								dF, jD;
							for (var A = 0; A < cI.length; A++)
								if (cI[A].GC == i6.Nm.v) dF = cI[A];
							if (dF) {
								jD = LayerRecord.VectorMask.FT(dF.i);
								PixelUtil.path.transformFlatCoords(jD, new Matrix2D(kz, 0, 0, ge, bL[0], bL[1]))
							} else jD = PixelUtil.path.shapes.rect(bL[0], bL[1], kz, ge, 0);
							h.add.vmsk.i = jD
						}
						h.Ba()
					}
				}
			}
			var c8 = {
					solidColorLayer: 0,
					gradientLayer: 1,
					patternLayer: 2
				}[fk.classID],
				gZ = ["SoCo", "GdFl", "PtFl"][c8];
			h.add[gZ] = JSON.parse(JSON.stringify(LayerStyleConstants.defaultContentStyles[c8]));
			if (c8 == 0) h.add[gZ].Clr.v = PixelUtil.color.rgbColorDescriptor(PixelUtil.intToRgb(V.Y7));
			f.uj.ON(fk, h.add[gZ], c8);
			if (i6 == null) by = languageManager.get([6, 48, 0, c8]);
			if (gZ == "PtFl") {
				var bF = h.add[gZ].Ptrn.v,
					ch = PatternHelper.xQ(bF, V._N);
				if (ch == null) ch = PatternHelper.xQ(bF, G.add.Patt);
				bF.Idnt.v = ch.id;
				G.wJ(ch)
			}
			h.QJ(G)
		}
		var eX = f.uj.Zo(G, by + " ");
		h.tH(by + " " + (eX + 1));
		if (iF) h.tH(iF);
		var iE = G.g.length == 0 ? G.B.length - 1 : G.g[G.g.length - 1],
			b5 = G.B[iE];
		if (Q == LayerRecord.yl && b5.Eo() && b5.rect.W6()) {
			am = !0;
			h.tH(b5.getName());
			eY = iE
		} else {
			eY = iE + (Q == LayerRecord.vx && M && !e ? 0 : 1);
			if (b5 && b5.add.lsct == LayerSectionType.open) eY--
		}
		if (l.atP) eY = Math.max(0, eY - 1);
		var et = G.B.slice(0);
		if (Q == LayerRecord.fG) {
			var bp = et[G.g[0]] = et[G.g[0]].clone(),
				gC = G.P.channel.slice(0);
			PixelUtil.invertUint32Buffer(gC);
			PixelUtil.multiplyMaskIntoRgbaAlpha(gC, G.P.rect, bp.buffer, bp.rect)
		}
		et.splice(eY, am ? 1 : 0, h);
		var bV = [5, 2];
		if (Q == LayerRecord.vx) bV = [6, 13];
		if (Q == LayerRecord.uz) bV = [6, 1];
		if (Q == LayerRecord.yl) {
			bV = [6, 48, 1];
			var i6 = l.a0.Usng.v.Shp;
			if (i6) {
				var b3 = {
					Rctn: [10, 32],
					Ln: [10, 35],
					Elps: [10, 33],
					Plgn: [12, 93, 0],
					customShape: [10, 31]
				}[i6.v.classID];
				if (b3) bV = b3
			}
		}
		if (bY) {
			bV = [6, 49, Q == LayerRecord.Vg ? 0 : 1]
		}
		if (bY || Q == LayerRecord.yl || Q == LayerRecord.H0 || Q == LayerRecord.uz)
			if (G.P) il = [G.P, null];
		var R = new HistoryState(bV, this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: et,
			si: G.g.slice(0),
			u4: [eY],
			u$: il
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G);
		if (Q == LayerRecord.yl && i6 == null && c8 != 0 || Q == LayerRecord.uz) {
			var S = new Action(ActionTypes.E.L);
			S.data = {
				a: ActionTypes.$.B_,
				GU: PanelTabBase.xA.uB
			};
			d.dispatch(S)
		}
	}
	if (Q == LayerRecord.C2) {
		var h = G.V4(),
			by = "Folder",
			eX = f.uj.Zo(G, by + " ");
		h.tH(by + " " + (eX + 1));
		h.blendModeKey = "pass";
		h.add.lsct = LayerSectionType.open;
		h.layerFlags = 24;
		if (l.Xu) h.tH(l.Xu);
		if (l.wg != null) h.add.lclr = l.wg;
		var hK = G.En(),
			iE = t,
			eY = iE + (M ? 0 : 1),
			et = G.B.slice(0);
		et.splice(eY, 0, hK, h);
		var R = new HistoryState([6, 20], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: et,
			si: G.g.slice(0),
			u4: [eY + 1]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.jD || Q == LayerRecord.CU) {
		var cx = Q == LayerRecord.jD ? l.source : G.g[0],
			ik, en, kt = G.g.indexOf(cx) != -1,
			jZ = y | l.a1R,
			hA, ah = null;
		if (kt) hA = G.OM();
		else hA = G.CL(cx);
		hA.sort(function(R, f4) {
			return R - f4
		});
		if (Q == LayerRecord.jD) {
			ik = l.target;
			en = l.yu > .5
		} else if (l.target != null) {
			ik = Math.min(l.target, G.B.length - 1);
			en = l.target < G.B.length;
			G.DF = !0
		} else {
			var gY = l.y3;
			en = gY > 1;
			if (gY == 0) {
				ik = G.B.length - 1
			}
			if (gY == 1) {
				ik = hA[hA.length - 1] + 1;
				var r = G.CL(ik);
				if (r.indexOf(cx) == -1) ik += r.length - 1
			}
			if (gY == 2) {
				ik = hA[0] - 1;
				var r = G.CL(ik);
				if (r.indexOf(cx) == -1) ik -= r.length - 1
			}
			if (gY == 3) {
				ik = 0;
				if (G.B[0].add.lnsr == "bgnd") ik++
			}
			if (ik < 0 || ik > G.B.length - 1) return;
			G.DF = !0
		}
		if (hA.indexOf(ik) != -1 && !jZ) return;
		var jh = f.uj.Ys(G, hA, ik, en, jZ ? G.OB(kt ? null : cx) : null, Q == LayerRecord.jD && l.yu > .8),
			eJ = jh.pop(),
			ep = jh.pop(),
			et = jh.pop(),
			gt = G.g;
		G.g = [cx];
		var b6 = G.bZ();
		G.g = [ik];
		var eR = G.bZ();
		if (eR == ik && !en) eR = -1;
		G.g = gt;
		if (cx == b6) {} else if (b6 != eR) {
			var ah = new Point2D(0, 0);
			if (b6 != -1) {
				var h9 = G.B[b6].dA();
				ah.x -= h9.x;
				ah.y -= h9.y
			}
			if (eR != -1) {
				var h9 = G.B[eR].dA();
				ah.x += h9.x;
				ah.y += h9.y
			}
		}
		var R = new HistoryState(jZ ? [6, 0] : [6, 35], this);
		R.data = {
			a: LayerRecord.OD,
			ih: G.B.slice(0),
			Za: et,
			si: G.g.slice(0),
			u4: ep,
			JZ: ah
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G);
		var d0 = {
			classID: "move",
			null: PsdDescriptorHelper.Fw("Lyr", !0),
			T: {
				t: "obj ",
				v: [{
					t: "indx",
					v: {
						classID: "Lyr",
						val: eJ + (en ? 0 : 1)
					}
				}]
			},
			Adjs: {
				t: "bool",
				v: !1
			},
			Vrsn: {
				t: "long",
				v: 5
			},
			Dplc: {
				t: "long",
				v: jZ
			}
		};
		this.track({
			kT: "move",
			a0: d0
		})
	}
	if (Q == LayerRecord.mQ) {
		if (l.VB) {
			if (I == null || !I.IQ()) return;
			var P = G.root.O4(t),
				gF = G.B.indexOf(P.a9j),
				et = G.B.slice(0);
			et.splice(t, 1);
			et.splice(gF, 1);
			var ep = [];
			for (var A = gF; A < t - 1; A++) ep.push(A);
			var R = new HistoryState("Ungroup Layers", this);
			R.data = {
				a: LayerRecord.OD,
				ih: G.B.slice(0),
				Za: et,
				si: G.g.slice(0),
				u4: ep
			};
			G.pushHistoryState(R);
			this.applyRedo(R.data, G)
		} else {
			var h = G.V4(),
				hu = "Folder ";
			h.tH(hu + (f.uj.Zo(G, hu) + 1));
			h.blendModeKey = "pass";
			if (l.Xu) h.tH(l.Xu);
			if (l.wg != null) h.add.lclr = l.wg;
			h.add.lsct = G.g.length == 1 ? LayerSectionType.open : LayerSectionType.closed;
			h.layerFlags = 24;
			var hK = G.En(),
				hA = G.OM();
			if (hA.length == 0) return;
			hA.sort(function(R, f4) {
				return R - f4
			});
			var et = [];
			for (var A = 0; A < G.B.length; A++)
				if (hA.indexOf(A) == -1) et.push(G.B[A]);
			var iE = G.g[G.g.length - 1] - hA.length;
			et.splice(iE + 1, 0, hK);
			for (var A = 0; A < hA.length; A++) et.splice(iE + 2 + A, 0, G.B[hA[A]]);
			et.splice(iE + 2 + hA.length, 0, h);
			var R = new HistoryState([6, 9], this);
			R.data = {
				a: LayerRecord.OD,
				ih: G.B.slice(0),
				Za: et,
				si: G.g.slice(0),
				u4: [et.indexOf(h)]
			};
			G.pushHistoryState(R);
			this.applyRedo(R.data, G);
			var Y = {
				kT: "make",
				FP: !0
			};
			Y.a0 = {
				classID: "Mk",
				null: PsdDescriptorHelper.Fw("layerSection"),
				From: PsdDescriptorHelper.Fw("Lyr", !0),
				Usng: {
					t: "Objc",
					v: {
						classID: "layerSection",
						Nm: {
							t: "TEXT",
							v: h.getName()
						}
					}
				}
			};
			this.track(Y)
		}
	}
	if (Q == LayerRecord.ai0) {
		if (G.g.length != 1) return;
		var $ = G.g[0],
			bt = y;
		if (G.B[$].c3() == null && !b.l(KeyboardHandler.wz)) {
			Q = LayerRecord.a5;
			l.fz = G.P ? !bt ? "RvlS" : "HdSl" : !bt ? "RvlA" : "HdAl"
		} else {
			Q = LayerRecord.dL;
			l.ajQ = !0
		}
	}
	if (Q == LayerRecord.a5) {
		if (G.g.length != 1) return;
		var $ = G.g[0],
			h = G.B[$];
		if (h.add.vmsk && h.z == null) h.QJ(G);
		var jW = h.c3();
		if (jW == null || l.agD) {
			var R = new HistoryState([6, 21], this),
				dM = new LayerRecord.LayerMask,
				ce = l.fz,
				kk = ce == "RvlS" || ce == "HdSl";
			if (ce == "RvlS" || ce == "HdAl" || ce == "Trns") dM.color = 0;
			if (kk) {
				dM.channel = G.P.channel.slice(0);
				dM.rect = G.P.rect.clone();
				if (ce == "HdSl") PixelUtil.invertUint32Buffer(dM.channel)
			}
			if (ce == "Trns") {
				dM.rect = h.rect.clone();
				dM.channel = PixelUtil.allocBytes(h.rect.O());
				PixelUtil.extractChannelFromRgba(h.buffer, dM.channel, 3)
			}
			R.data = {
				a: LayerRecord.Yi,
				Qc: [$, jW, dM],
				u$: kk ? [G.P, null] : null
			};
			G.pushHistoryState(R);
			this.applyRedo(R.data, G);
			G.B[$].ht = 1;
			this.track({
				kT: "make",
				a0: {
					__name: "Make",
					classID: "Mk",
					Nw: {
						t: "type",
						v: {
							classID: "Chnl"
						}
					},
					At: {
						t: "obj ",
						v: [{
							t: "Enmr",
							v: {
								classID: "Chnl",
								typeID: "Chnl",
								enum: "Msk"
							}
						}]
					},
					Usng: {
						t: "enum",
						v: {
							UsrM: ce
						}
					}
				}
			})
		}
	} else if (Q == LayerRecord.aqH) {
		var aI = G.B[l.src],
			dK = G.B[l.hw],
			R = new HistoryState([6, 21], this),
			d4 = aI.c3(),
			fH = dK.c3(),
			hn = [l.src, d4, null, l.hw, fH, d4];
		if (y || e) {
			var cv = d4.clone();
			if (y) hn = [l.hw, fH, cv];
			else hn[5] = cv;
			if (e) {
				PixelUtil.invertUint32Buffer(cv.channel);
				cv.color = 255 - cv.color
			}
		}
		R.data = {
			a: LayerRecord.Yi,
			Qc: hn
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.uU) {
		if (G.g.length != 1) return;
		var $ = t,
			iG = G.B[$].c3();
		if (iG != null) {
			var R = new HistoryState([6, 22], this);
			R.data = {
				a: LayerRecord.Yi,
				Qc: [t, iG, null]
			};
			G.pushHistoryState(R);
			this.applyRedo(R.data, G)
		}
	}
	if (Q == LayerRecord.n9) {
		var ca = G.B.slice(0),
			kq = I.clone(),
			a$ = kq.c3();
		PixelUtil.multiplyMaskIntoRgbaAlpha(a$.Ua(kq.rect), kq.rect, kq.buffer, kq.rect);
		f.uj.f9(G, kq);
		kq.ww();
		G.B[G.g[0]] = kq;
		var R = new HistoryState([5, 8], this);
		R.data = {
			a: LayerRecord.OD,
			ih: ca,
			Za: G.B.slice(),
			si: G.g.slice(0),
			u4: G.g.slice(0)
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.ev) {
		if (G.g.length != 1) return;
		var $ = G.g[0];
		if (G.B[$].vZ(G).z == null) {
			var R = new HistoryState([6, 45], this);
			R.data = {
				a: Q,
				j: $,
				z: new LayerRecord.LayerMask
			};
			G.pushHistoryState(R);
			this.applyRedo(R.data, G)
		}
	}
	if (Q == LayerRecord.V2) {
		if (G.g.length != 1) return;
		var $ = G.g[0];
		if (G.B[$].vZ(G).z != null) {
			var R = new HistoryState([6, 46], this);
			R.data = {
				a: Q,
				j: $,
				z: G.B[$].vZ(G).z
			};
			G.pushHistoryState(R);
			this.applyRedo(R.data, G)
		}
	}
	if (Q == LayerRecord.OL) {
		if (l.src == null && G.g.length != 1) return;
		if (l.src != null) t = l.src;
		if (G.B[t].aW()) {
			var R = new HistoryState([6, 47], this),
				gq = JSON.stringify(G.B[t].add.SoLd),
				hb = JSON.parse(gq);
			delete hb.filterFX;
			R.data = {
				a: LayerRecord.z5,
				TU: [{
					b4: t,
					Jy: [gq, JSON.stringify(hb)],
					zK: [G.B[t].vZ(G), null]
				}]
			};
			G.pushHistoryState(R);
			this.applyRedo(R.data, G)
		}
	}
	if (Q == LayerRecord.dL) {
		if (G.g.length != 1) return;
		if (I.add.vmsk == null) {
			var R = new HistoryState([6, 23], this),
				dL = G.LW(),
				ay = dL[1],
				dL = dL[0],
				dM, gP;
			if (l.ajQ && ay.length != 0) {
				var dP = dL[ay[0]].add;
				dM = dP.vmsk.clone();
				gP = dP.vogk
			} else {
				dM = new LayerRecord.VectorMask;
				gP = [];
				dM.i[1].all = l.afG ? 0 : 1
			}
			R.data = {
				a: Q,
				j: t,
				Dx: !0,
				z: dM,
				X: JSON.stringify(gP),
				JC: null
			};
			if (I.VF()) {
				R.data.JC = JSON.stringify(LayerStyleConstants.strokeStyle.default)
			}
			G.pushHistoryState(R);
			this.applyRedo(R.data, G)
		}
	}
	if (Q == LayerRecord.Es) {
		var aI = G.B[l.src],
			dK = G.B[l.hw];
		if (dK.add.vmsk) return;
		var R = new HistoryState([6, 23], this),
			iT = aI.add.vmsk;
		R.data = {
			j: l.hw,
			Dx: aI.VM,
			z: iT.clone(),
			X: JSON.stringify(aI.add.vogk),
			JC: aI.add.vstk ? JSON.stringify(aI.add.vstk) : null
		};
		if (y) {
			R.data.a = LayerRecord.dL
		} else {
			R.data.a = Q;
			R.data.src = l.src;
			R.data.hw = l.hw
		}
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.W1 || Q == LayerRecord.g_) {
		if (G.g.length != 1) return;
		var h = G.B[t],
			iT = h.add.vmsk;
		if (iT != null) {
			var g6 = Q == LayerRecord.g_,
				R = new HistoryState(g6 ? [6, 8] : [6, 24], this);
			R.data = {
				a: LayerRecord.W1,
				j: t,
				Dx: h.VM,
				z: iT,
				X: JSON.stringify(h.add.vogk),
				JC: h.add.vstk ? JSON.stringify(h.add.vstk) : null
			};
			if (g6) {
				R.data.UG = iT.c3(h.add.vstk)
			}
			G.pushHistoryState(R);
			this.applyRedo(R.data, G)
		}
	}
	if (Q == LayerRecord.sG) {
		var R = new HistoryState("Metadata", this);
		R.data = {
			a: Q,
			bg: JSON.stringify(G.CD),
			SQ: JSON.stringify(l.SQ)
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.w0) {
		var fR = l.hw ? l.hw : G,
			ao = fR.name,
			iF = l.Z + ".psd";
		if (ao == iF) return;
		var R = new HistoryState([6, 37], this);
		R.data = {
			a: Q,
			ada: ao,
			Xu: iF
		};
		if (l.avM != !0) fR.pushHistoryState(R);
		this.applyRedo(R.data, fR)
	}
	if (Q == LayerRecord.WW && l.y3.endsWith("makeframes")) {
		var hh = [],
			cB = l.y3.startsWith("make");
		for (var A = 0; A < G.g.length; A++) {
			var H = G.g[A],
				h = G.B[H],
				hx = h.getName(),
				cJ = hx.startsWith("_a_");
			if (cB == cJ || h.add.lsct == LayerSectionType.divider) continue;
			var av = cB ? "_a_" + hx : hx.slice(3);
			hh.push([H, hx, av, h.add.lnsr, null])
		}
		var R = new HistoryState([6, 37], this);
		R.data = {
			a: LayerRecord.oY,
			Oo: hh
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.oY) {
		var ao = I.getName(),
			iF = l.name.substring(0, 255);
		if (ao == iF) return;
		var R = new HistoryState([6, 37], this);
		R.data = {
			a: Q,
			Oo: [
				[t, ao, iF, I.add.lnsr, null]
			]
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G);
		this.track(PsdDescriptorHelper.D1("Nm", {
			t: "TEXT",
			v: iF
		}))
	}
	if (Q == LayerRecord.dZ) {
		var ec = G.OM(),
			aU = [],
			aS = [];
		for (var A = 0; A < ec.length; A++) {
			aU.push(G.B[ec[A]].add.lclr);
			aS.push(l.anr)
		}
		var R = new HistoryState([6, 38], this);
		R.data = {
			a: Q,
			B: ec,
			asD: aU,
			wg: aS
		};
		G.pushHistoryState(R);
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.fx) {
		var R = G.history[G.historyIndex];
		if (R != null && R.G == this && R.data.a == Q && R.data.j == l.NT && R.data.mz.GP == l.iQ.GP) R.data.mz = l.iQ;
		else {
			R = new HistoryState("Mask Density / Feather", this);
			R.data = {
				a: Q,
				j: l.NT,
				mS: G.B[l.NT].NM(l.iQ.GP),
				mz: l.iQ
			};
			G.pushHistoryState(R)
		}
		this.applyRedo(R.data, G)
	}
	if (Q == LayerRecord.sM) {
		var cw = JSON.stringify(l.Z),
			bx = JSON.parse(cw),
			R = G.history[G.historyIndex];
		if (R != null && R.G == this && R.data.a == Q && R.data.T3 == l.T3 && R.data.xn.join(",") == l.xn.join(",")) {
			for (var A = 0; A < l.xn.length; A++) R.data.Zq[A] = bx;
			if (R.data.a0 && bx.hA != 0) f.uj.ON(bx.rU, R.data.a0.T.v, bx.hA - 1)
		} else {
			R = new HistoryState([11, 6], this);
			R.data = {
				a: Q,
				xn: l.xn,
				T3: l.T3,
				av8: [],
				Zq: []
			};
			var ic = !1;
			for (var A = 0; A < l.xn.length; A++) {
				var H = l.xn[A],
					h = G.B[H],
					aX = l.T3 ? f.nr.wR(G, H) : JSON.parse(JSON.stringify(h.add.vstk));
				R.data.av8.push(aX);
				R.data.Zq.push(bx);
				if (JSON.stringify(aX) != cw) ic = !0
			}
			if (!ic) return;
			G.pushHistoryState(R);
			if (l.T3 && bx.hA > 0) {
				var d0 = R.data.a0 = {
					classID: "setd",
					null: PsdDescriptorHelper.Fw("contentLayer", !0),
					T: {
						t: "Objc",
						v: {}
					}
				};
				f.uj.ON(bx.rU, d0.T.v, bx.hA - 1);
				this.track({
					kT: "set",
					a0: d0
				})
			}
		}
		if (l.T3 && bx.hA == 3) G.wJ(PatternHelper.xQ(bx.rU.Ptrn.v, V._N));
		if (!l.T3) {
			var gT = bx.strokeStyleContent.v;
			if (gT.classID == LayerStyleConstants.strokeStyle.contentLayerClassIDs[2]) G.wJ(PatternHelper.xQ(gT.Ptrn.v, V._N))
		}
		this.applyRedo(R.data, G)
	}
};
f.uj.Ys = function(l, d, G, b, V, Q) {
	var t = l.B[G],
		I = [];
	if (V) I = l.B.slice(0);
	else
		for (var A = 0; A < l.B.length; A++)
			if (d.indexOf(A) == -1) I.push(l.B[A]);
	var y = I.indexOf(t);
	if (Q && t.IQ() && t.add.lsct == LayerSectionType.closed) y -= l.CL(G).length - 1;
	var e = [];
	for (var A = 0; A < d.length; A++) {
		var M = y + (b ? 0 : 1) + A,
			R = V ? V[A] : l.B[d[A]];
		I.splice(M, 0, R);
		e.push(M)
	}
	return [I, e, y]
};
f.uj.ON = function(l, d, G) {
	var b = [LayerStyleConstants.solidColorContentKeys, LayerStyleConstants.gradientContentKeys, LayerStyleConstants.patternContentKeys][G];
	if (d.classID == null) d.classID = ["solidColorLayer", "gradientLayer", "patternLayer"][G];
	for (var A = 0; A < b.length; A++)
		if (l[b[A]]) d[b[A]] = JSON.parse(JSON.stringify(l[b[A]]))
};
f.uj.a9r = function(l) {
	var d = new LayerRecord.LayerMask;
	if (l.P != null) {
		d.color = 0;
		d.channel = l.P.channel.slice(0);
		d.rect = l.P.rect.clone()
	}
	return d
};
f.uj.$x = function(l, d, G, b, V) {
	var Q = b.m / G.m,
		t = b.n / G.n,
		I = b.m / 2,
		y = b.n / 2,
		e = PixelUtil.vec.simplifyPath(b).C;
	for (var A = 0; A < l.B.length; A++) {
		var M = l.B[A],
			R = M.add.SoLd;
		if (R == null || R.Idnt.v != d) continue;
		if (Q != 1 || t != 1) {
			var J = f.NH.DO(R.nonAffineTransform),
				n = PixelUtil.canvas.eP(J, b),
				r = new Matrix2D;
			r.translate(-I, -y);
			r.scale(Q, t);
			r.translate(I, y);
			var T = PixelUtil.canvas.mY(n, PixelUtil.canvas.pu(r)),
				j = e.slice(0);
			PixelUtil.canvas.D(T, j);
			R.Trnf = f.NH.gx(j);
			R.nonAffineTransform = f.NH.gx(j);
			if (PixelUtil.textWarp.T9(R.warp.v)) {
				var g = R.warp.v.bounds.v;
				g.Rght.v.val = b.m;
				g.Btom.v.val = b.n
			}
		}
		M.kX(l, null, V)
	}
	l.U()
};
f.uj.a1E = function(l, d, G) {
	d.color = 255 - d.color;
	PixelUtil.invertUint32Buffer(d.channel);
	d.y1 = !0;
	l.QJ(G);
	G.U()
};
f.uj.prototype.applyUndo = function(l, d) {
	var G = l.a,
		b = d.B[l.j];
	d.i_ = !0;
	if (G == LayerRecord.vH) {
		d.add.lnk2.splice(d.add.lnk2.indexOf(l.d7), 1, l.Bv);
		f.uj.$x(d, l.id, l.d7.hF[1], l.Bv.hF[1])
	}
	if (G == LayerRecord.OF) {
		b.add.SoLd.Impr.v.classID = l.mS;
		b.kX(d)
	}
	if (G == LayerRecord.zZ) {
		var V = JSON.parse(l.xn);
		for (var A = 0; A < V.length; A++) d.B[V[A]].blendModeKey = l.XY[A];
		d.U()
	}
	if (G == LayerRecord.y$) {
		var V = JSON.parse(l.xn);
		for (var A = 0; A < V.length; A++) d.B[V[A]].opacity = l.XY[A];
		d.U()
	}
	if (G == LayerRecord.ss) {
		var V = JSON.parse(l.xn);
		for (var A = 0; A < V.length; A++)
			if (d.B[V[A]].add.lsct != LayerSectionType.divider) d.B[V[A]].add.lspf = l.XY[A]
	}
	if (G == LayerRecord.rh) {
		var Q = l.pX,
			t = l.abk;
		delete b.add[Q[0]];
		if (t[0] != "----") b.add[t[0]] = t[1]
	}
	if (G == LayerRecord.Ij) {
		b.add.iOpa = l.XY;
		d.U()
	}
	if (G == LayerRecord.mH) {
		for (var A = 0; A < l.xn.length; A++) {
			var I = d.B[l.xn[A]];
			I.Oj(!I.zD())
		}
		d.U()
	}
	if (G == LayerRecord.sF) {
		var y = b.c3();
		y.isEnabled = !y.isEnabled;
		b.QJ(d);
		d.U()
	}
	if (G == LayerRecord.W0) {
		var y = b.vZ(d).z;
		y.isEnabled = !y.isEnabled;
		b.U();
		d.U()
	}
	if (G == LayerRecord.dD) {
		var y = b.add.vmsk;
		y.isEnabled = !y.isEnabled;
		if (!y.isEnabled) {
			if (b.UG) {
				b.z = b.UG;
				b.UG = null
			} else b.z = null
		} else if (b.z) {
			b.UG = b.z;
			b.z = null
		}
		b.QJ(d);
		d.U()
	}
	if (G == LayerRecord.Gk) {
		b.usesClippingMask = !b.usesClippingMask;
		d.U()
	}
	if (G == LayerRecord.M0) {
		b.add.lmfx.masterFXSwitch.v = !b.add.lmfx.masterFXSwitch.v;
		b.hD.q6 = !0;
		d.U()
	}
	if (G == LayerRecord.Wj) {
		b.add.SoLd.filterFX.v.enab.v = !b.add.SoLd.filterFX.v.enab.v;
		b.yN(d);
		d.U()
	}
	if (G == LayerRecord.f0) {
		var e = l.index,
			M = b.add.lmfx[LayerStyleConstants.effectMultiKeys[e[0]]].v[e[1]].v;
		M.enab.v = !M.enab.v;
		b.hD.q6 = !0;
		d.U()
	}
	if (G == LayerRecord.R4) {
		var R = d.B[l.eB],
			J = d.B[l.Ui],
			n = l.ady,
			r = l.a74;
		if (n == "") delete R.add.lmfx;
		else R.add.lmfx = JSON.parse(n);
		if (r == "") delete J.add.lmfx;
		else J.add.lmfx = JSON.parse(r);
		R.hD.q6 = !0;
		J.hD.q6 = !0;
		d.U()
	}
	if (G == LayerRecord.GQ) {
		var T = b.add.SoLd.filterFX.v.filterFXList.v[l.index].v;
		T.enab.v = !T.enab.v;
		b.yN(d);
		d.U()
	}
	if (G == LayerRecord.at8) {
		b.add.SoLd.filterFX.v = JSON.parse(JSON.stringify(l.ajs));
		b.yN(d);
		d.U()
	}
	if (G == LayerRecord.JX) {
		var y = b.c3();
		y.cv = !y.cv
	}
	if (G == LayerRecord.GD) {
		var y = b.add.vmsk;
		y.cv = !y.cv
	}
	if (G == LayerRecord._T) {
		var j = JSON.parse(l.aiC);
		d.tJ = j[0];
		d.rw = j[1]
	}
	if (G == LayerRecord.ll) {
		var j = l.av;
		for (var A = 0; A < j.length; A += 2) {
			var g = j[A],
				I = g >= 0 ? d.B[g] : d.t_[-1 - g];
			I.add.vogk = JSON.parse(j[A + 1]);
			PixelUtil.X.ry(I.add.vogk, I.add.vmsk);
			if (g >= 0) I.QJ(d)
		}
		d.U()
	}
	if (G == LayerRecord.ka) {
		b.add.artb = JSON.parse(l.aya);
		d.U();
		f.Gt.I9(d, l)
	}
	if (G == LayerRecord.B1) {
		d.P = l.Sd;
		d.vj = l.av.slice(0);
		d.FB = l.My.slice(0);
		d.uK = d.bV = !0
	}
	if (G == LayerRecord.Ok) {
		b.layerLinkEnabled = !b.layerLinkEnabled
	}
	if (G == LayerRecord.cr) {
		var Y = l.a7X;
		for (var A = 0; A < Y.length; A++) d.B[A].folderStackIndex = Y[A]
	}
	if (G == LayerRecord.OD) {
		if (l.JZ) f.Pq._P(d, d.g, null, -l.JZ.x, -l.JZ.y);
		if (l.si) d.g = l.si;
		if (l.u$) d.P = l.u$[0];
		d.jP = null;
		d.U();
		d.g8(l.ih);
		f.Gt.I9(d, l);
		if (l.FV) d.Y$(l.FV[0])
	}
	if (G == LayerRecord.Yi) {
		for (var A = 0; A < l.Qc.length; A += 3) f.uj.f9(d, d.B[l.Qc[A]], l.Qc[A + 1]);
		if (l.u$) {
			var k = l.u$[0];
			if (k == null) delete d.P;
			else d.P = k
		}
	}
	if (G == LayerRecord.ev) {
		b.vZ(d).z = null;
		b.U();
		d.U()
	}
	if (G == LayerRecord.V2) {
		b.vZ(d).z = l.z;
		b.U();
		d.U()
	}
	if (G == LayerRecord.z5) {
		f.uj.ac1(d, l.TU, 0)
	}
	if (G == LayerRecord.dL) {
		f.uj.Oa(d, b, !0)
	}
	if (G == LayerRecord.Es) {
		f.uj.Oa(d, d.B[l.hw], l.z.isEnabled);
		f.uj.jX(d, d.B[l.src], l)
	}
	if (G == LayerRecord.W1) {
		if (l.UG) f.uj.f9(d, b, null);
		f.uj.jX(d, b, l)
	}
	if (G == LayerRecord.sG) {
		d.CD = JSON.parse(l.bg)
	}
	if (G == LayerRecord.w0) {
		d.name = l.ada
	}
	if (G == LayerRecord.oY) {
		for (var A = 0; A < l.Oo.length; A++) {
			var F = l.Oo[A],
				I = d.B[F[0]];
			I.tH(F[1]);
			if (F[3]) I.add.lnsr = F[3];
			else delete I.add.lnsr
		}
	}
	if (G == LayerRecord.dZ) {
		for (var A = 0; A < l.B.length; A++) d.B[l.B[A]].add.lclr = l.asD[A]
	}
	if (G == LayerRecord.sM) {
		var D = l.av8;
		for (var A = 0; A < l.xn.length; A++) {
			var I = d.B[l.xn[A]],
				q = D[A];
			if (!l.T3) I.add.vstk = JSON.parse(JSON.stringify(q));
			else f.nr.S2(I, JSON.parse(JSON.stringify(q)));
			I.Kq(d)
		}
		d.U()
	}
	if (G == LayerRecord.fx) {
		b.adV(l.mS);
		b.QJ(d);
		d.U()
	}
	d.bV = !0
};
f.uj.prototype.applyRedo = function(l, d) {
	var G = l.a,
		b = d.B[l.j];
	d.i_ = !0;
	if (G == LayerRecord.vH) {
		d.add.lnk2.splice(d.add.lnk2.indexOf(l.Bv), 1, l.d7);
		f.uj.$x(d, l.id, l.Bv.hF[1], l.d7.hF[1])
	}
	if (G == LayerRecord.OF) {
		b.add.SoLd.Impr.v.classID = l.mz;
		b.kX(d)
	}
	if (G == LayerRecord.zZ) {
		var V = JSON.parse(l.xn);
		for (var A = 0; A < V.length; A++) d.B[V[A]].blendModeKey = l.mz;
		d.U()
	}
	if (G == LayerRecord.y$) {
		var V = JSON.parse(l.xn);
		for (var A = 0; A < V.length; A++) d.B[V[A]].opacity = l.mz;
		d.U()
	}
	if (G == LayerRecord.ss) {
		var V = JSON.parse(l.xn);
		for (var A = 0; A < V.length; A++)
			if (d.B[V[A]].add.lsct != LayerSectionType.divider) d.B[V[A]].add.lspf = l.mz[A]
	}
	if (G == LayerRecord.rh) {
		var Q = l.abk,
			t = l.pX;
		delete b.add[Q[0]];
		if (t[0] != "----") b.add[t[0]] = t[1]
	}
	if (G == LayerRecord.Ij) {
		b.add.iOpa = l.mz;
		d.U()
	}
	if (G == LayerRecord.mH) {
		for (var A = 0; A < l.xn.length; A++) {
			var I = d.B[l.xn[A]];
			I.Oj(!I.zD())
		}
		d.U()
	}
	if (G == LayerRecord.sF) {
		var y = b.c3();
		y.isEnabled = !y.isEnabled;
		b.QJ(d);
		d.U()
	}
	if (G == LayerRecord.W0) {
		var y = b.vZ(d).z;
		y.isEnabled = !y.isEnabled;
		b.U();
		d.U()
	}
	if (G == LayerRecord.dD) {
		var y = b.add.vmsk;
		y.isEnabled = !y.isEnabled;
		if (!y.isEnabled) {
			if (b.UG) {
				b.z = b.UG;
				b.UG = null
			} else b.z = null
		} else if (b.z) {
			b.UG = b.z;
			b.z = null
		}
		b.QJ(d);
		d.U()
	}
	if (G == LayerRecord.Gk) {
		b.usesClippingMask = !b.usesClippingMask;
		d.U()
	}
	if (G == LayerRecord.M0) {
		b.add.lmfx.masterFXSwitch.v = !b.add.lmfx.masterFXSwitch.v;
		b.hD.q6 = !0;
		d.U()
	}
	if (G == LayerRecord.Wj) {
		b.add.SoLd.filterFX.v.enab.v = !b.add.SoLd.filterFX.v.enab.v;
		b.yN(d);
		d.U()
	}
	if (G == LayerRecord.f0) {
		var e = l.index,
			M = b.add.lmfx[LayerStyleConstants.effectMultiKeys[e[0]]].v[e[1]].v;
		M.enab.v = !M.enab.v;
		b.hD.q6 = !0;
		d.U()
	}
	if (G == LayerRecord.R4) {
		var R = d.B[l.eB],
			J = d.B[l.Ui],
			n = l.akR,
			r = l.ahP;
		if (n == "") delete R.add.lmfx;
		else R.add.lmfx = JSON.parse(n);
		if (r == "") delete J.add.lmfx;
		else J.add.lmfx = JSON.parse(r);
		R.hD.q6 = !0;
		J.hD.q6 = !0;
		d.U()
	}
	if (G == LayerRecord.GQ) {
		var T = b.add.SoLd.filterFX.v.filterFXList.v[l.index].v;
		T.enab.v = !T.enab.v;
		b.yN(d);
		d.U()
	}
	if (G == LayerRecord.at8) {
		b.add.SoLd.filterFX.v = JSON.parse(JSON.stringify(l.a5y));
		b.yN(d);
		d.U()
	}
	if (G == LayerRecord.JX) {
		var y = b.c3();
		y.cv = !y.cv
	}
	if (G == LayerRecord.GD) {
		var y = b.add.vmsk;
		y.cv = !y.cv
	}
	if (G == LayerRecord._T) {
		var j = JSON.parse(l.a49);
		d.tJ = j[0];
		d.rw = j[1]
	}
	if (G == LayerRecord.ll) {
		var j = l.DY;
		for (var A = 0; A < j.length; A += 2) {
			var g = j[A],
				I = g >= 0 ? d.B[g] : d.t_[-1 - g];
			I.add.vogk = JSON.parse(j[A + 1]);
			PixelUtil.X.ry(I.add.vogk, I.add.vmsk);
			if (g >= 0) I.QJ(d)
		}
		d.U()
	}
	if (G == LayerRecord.ka) {
		b.add.artb = JSON.parse(l.rX);
		d.U();
		f.Gt.d0(d, l)
	}
	if (G == LayerRecord.B1) {
		d.P = l.le;
		d.vj = l.DY.slice(0);
		d.FB = l.AZ.slice(0);
		d.uK = d.bV = !0
	}
	if (G == LayerRecord.Ok) {
		b.layerLinkEnabled = !b.layerLinkEnabled
	}
	if (G == LayerRecord.cr) {
		var Y = l.ay8;
		for (var A = 0; A < Y.length; A++) d.B[A].folderStackIndex = Y[A]
	}
	if (G == LayerRecord.OD) {
		d.adQ();
		var k = l.Za,
			F = 0,
			D;
		for (var A = 0; A < k.length; A++) {
			var I = k[A],
				q = I.add.lsct;
			if (q == LayerSectionType.divider) F++;
			else if (q == LayerSectionType.open || q == LayerSectionType.closed) F--;
			if (I.add.artb && F != 0) D = "Artboards can not be inside folders."
		}
		if (D) {
			d.history.pop();
			d.historyIndex--;
			alert(D);
			return
		}
		f.Gt.d0(d, l);
		if (l.u4) d.g = l.u4;
		if (l.u$) d.P = l.u$[1];
		d.jP = null;
		d.U();
		d.g8(l.Za);
		if (l.JZ) f.Pq._P(d, d.g, null, l.JZ.x, l.JZ.y);
		if (l.FV) d.Y$(l.FV[1])
	}
	if (G == LayerRecord.Yi) {
		for (var A = 0; A < l.Qc.length; A += 3) f.uj.f9(d, d.B[l.Qc[A]], l.Qc[A + 2]);
		if (l.u$) {
			var H = l.u$[1];
			if (H == null) delete d.P;
			else d.P = H
		}
	}
	if (G == LayerRecord.ev) {
		b.vZ(d).z = l.z;
		LayerRecord.initSmartFilterMask(b, d);
		b.ht = 0;
		b.U();
		d.U()
	}
	if (G == LayerRecord.V2) {
		b.vZ(d).z = null;
		b.ht = 0;
		b.U();
		d.U()
	}
	if (G == LayerRecord.z5) {
		f.uj.ac1(d, l.TU, 1)
	}
	if (G == LayerRecord.dL) {
		f.uj.jX(d, b, l)
	}
	if (G == LayerRecord.Es) {
		f.uj.Oa(d, d.B[l.src], l.z.isEnabled);
		f.uj.jX(d, d.B[l.hw], l)
	}
	if (G == LayerRecord.W1) {
		f.uj.Oa(d, b, l.z.isEnabled);
		if (l.UG) f.uj.f9(d, b, l.UG)
	}
	if (G == LayerRecord.sG) {
		d.CD = JSON.parse(l.SQ)
	}
	if (G == LayerRecord.w0) {
		d.name = l.Xu
	}
	if (G == LayerRecord.oY) {
		for (var A = 0; A < l.Oo.length; A++) {
			var W = l.Oo[A],
				I = d.B[W[0]];
			I.tH(W[2]);
			if (W[4]) I.add.lnsr = W[4];
			else delete I.add.lnsr
		}
	}
	if (G == LayerRecord.dZ) {
		for (var A = 0; A < l.B.length; A++) d.B[l.B[A]].add.lclr = l.wg[A]
	}
	if (G == LayerRecord.sM) {
		var Z = l.Zq;
		for (var A = 0; A < l.xn.length; A++) {
			var I = d.B[l.xn[A]],
				B = Z[A];
			if (!l.T3) I.add.vstk = JSON.parse(JSON.stringify(B));
			else f.nr.S2(I, JSON.parse(JSON.stringify(B)));
			I.Kq(d)
		}
		d.U()
	}
	if (G == LayerRecord.fx) {
		b.adV(l.mz);
		b.QJ(d);
		d.U()
	}
	d.bV = !0
};
f.uj.Zo = function(l, d) {
	var G = 0;
	for (var A = 0; A < l.B.length; A++) {
		var b = l.B[A].getName();
		if (b.startsWith(d)) {
			var V = b.slice(d.length).trim(),
				Q = parseInt(V);
			if (!isNaN(Q) && Q + "" == V && Q > G) G = Q
		}
	}
	return G
};
f.uj.ac1 = function(l, d, G) {
	for (var A = 0; A < d.length; A++) {
		var b = d[A],
			V = l.B[b.b4];
		if (b.Jy) {
			V.add.SoLd = JSON.parse(b.Jy[G])
		}
		if (b.zK) {
			if (b.zK[1 - G] != null) l.mP(b.zK[1 - G]);
			if (b.zK[G] != null) l.p_(b.zK[G]);
			else V.ht = 0
		}
		V.kX(l)
	}
};
f.uj.amF = function(l, d) {
	var G = l.XM,
		b = l.rect.clone();
	if (G != null && (G.x != d.m || G.y != d.n)) {
		b.x = Math.floor((d.m - b.m) / 2);
		b.y = Math.floor((d.n - b.n) / 2)
	} else if (G == null) {
		var V = new Rect(0, 0, d.m, d.n),
			Q = d.bZ();
		if (Q != -1) V = d.B[Q].dA();
		b.x += V.x;
		b.y += V.y
	}
	return b
};
f.uj.abj = function(l, d) {
	if (d.UG) d.UG = null;
	else d.z = null;
	d.QJ(l);
	l.U();
	d.ht = 0
};
f.uj.f9 = function(l, d, G) {
	var b = d.c3();
	if (b == null && G == null) return;
	if (b) f.uj.abj(l, d);
	if (G == null) return;
	if (d.z) d.UG = G;
	else d.z = G;
	d.QJ(l);
	l.U()
};
f.uj.Oa = function(l, d, G) {
	if (d.UG && G) {
		d.z = d.UG;
		d.UG = null
	} else if (d.z && G) {
		d.z = null
	}
	delete d.add.vogk;
	delete d.add.vstk;
	delete d.add.vmsk;
	d.QJ(l);
	d.VM = !1;
	l.jP = [];
	l.U()
};
f.uj.jX = function(l, d, G) {
	d.add.vogk = JSON.parse(G.X);
	if (G.JC) d.add.vstk = JSON.parse(G.JC);
	else delete d.add.vstk;
	d.add.vmsk = G.z.clone();
	if (d.z && d.add.vmsk.isEnabled) d.UG = d.z;
	d.QJ(l);
	d.VM = G.Dx;
	l.jP = [l.B.indexOf(d)];
	l.yK = [];
	l.U()
};
// Layer Styles panel controller
f.Tt = function() {
	f.AbstractTool.call(this, "Layer Styles", f.LY);
	this.Iw = null;
	this.xd = null;
	this.gs = null;
	this.UF = [];
	this.dM = null
};
f.Tt.prototype = new f.AbstractTool;
f.Tt.prototype.TA = function(l, d, G, b, V) {
	var Q = l.j;
	if (Q == null) Q = G.g[0];
	var t = G.B[Q],
		I = l.sy;
	if (this.Iw == null) {
		this.gs = f.Tt.fS(G, t);
		this.Iw = JSON.stringify(this.gs);
		if (t.add.lmfx) this.xd = JSON.stringify(t.add.lmfx)
	}
	if (t.add.lmfx == null) {
		t.add.lmfx = JSON.parse(LayerStyleConstants.defaultLayerStyleJson);
		for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) t.add.lmfx[LayerStyleConstants.effectMultiKeys[A]] = {
			t: "VlLs",
			v: []
		}
	}
	if (l.a == "scaleeffects") {
		if (l.Z == "confirm" || l.Z == "cancel") {
			this.TA({
				a: l.Z
			}, d, G, b, V);
			return
		}
		t.add.lmfx = JSON.parse(this.xd);
		PatternHelper.es(t.add.lmfx, l.Z / 100)
	} else if (l.a == "changeprop") {
		var y = null;
		if (I != 0) {
			var e = this.UF[I[0]];
			if (e == null) e = LayerStyleConstants.defaultEffectJsonStrings[I[0]];
			e = JSON.parse(e);
			var M = t.add.lmfx[LayerStyleConstants.effectMultiKeys[I[0]]].v;
			if (M[I[1]] == null) M[I[1]] = {
				t: "Objc",
				v: e
			};
			y = M[I[1]].v;
			for (var R in e)
				if (y[R] == null) y[R] = e[R]
		}
		if (l.a == "changeprop") {
			if (I == 0) {
				this.gs[l.Xt].v = l.Z;
				f.Tt.Dc(G, t, this.gs)
			} else if (l.Xt == "lagl") {
				if (y.uglg && y.uglg.v) {
					G.Sn(l.Z.val);
					this.gs.gagl.v.val = G.ie()
				} else y[l.Xt].v = l.Z
			} else if (l.Xt == "Lald") {
				if (y.uglg.v) {
					G.Q1(l.Z.val);
					this.gs.aaT = G.Yf()
				} else y[l.Xt].v = l.Z
			} else if ((I[0] == 3 || I[0] == 8) && (l.Xt == "Clr" || l.Xt == "Grad")) {
				if (l.Xt == "Clr") {
					y.Clr = {
						t: "Objc",
						v: l.Z
					};
					delete y.Grad
				}
				if (l.Xt == "Grad") {
					y.Grad = {
						t: "Objc",
						v: l.Z
					};
					delete y.Clr
				}
			} else {
				y[l.Xt].v = l.Z
			}
			if (I != 0) this.UF[I[0]] = JSON.stringify(y)
		}
		if (I != 0)
			if (y.Ptrn) G.wJ(PatternHelper.xQ(y.Ptrn.v, V._N))
	} else if (l.a == "setstl") {
		var J = l.Z.Lefx;
		if (J) PatternHelper.afI(J, G, V._N);
		PatternHelper.acB(l.Z, t, null, G);
		this.gs = f.Tt.fS(G, t)
	} else if (l.a == "st_dupsingle") {
		var n = t.add.lmfx[LayerStyleConstants.effectMultiKeys[l.yD[0]]].v;
		if (n[l.yD[1]] == null) return;
		var r = JSON.parse(JSON.stringify(n[l.yD[1]]));
		n.splice(l.yD[1], 0, r)
	} else if (l.a == "st_movsingle") {
		var T = l.yD[1],
			n = t.add.lmfx[LayerStyleConstants.effectMultiKeys[l.yD[0]]].v;
		if (n[l.yD[1]] == null) return;
		var j = Math.max(0, Math.min(n.length - 1, T + l.as_)),
			g = n[j];
		n[j] = n[T];
		n[T] = g
	} else if (l.a == "cancel") {
		if (this.xd == null) delete t.add.lmfx;
		else t.add.lmfx = JSON.parse(this.xd);
		f.Tt.Dc(G, t, JSON.parse(this.Iw));
		this.Iw = null;
		this.xd = null
	} else if (l.a == "confirm") {
		var Y = JSON.stringify(t.add.lmfx),
			k = new HistoryState([11, 6], this);
		k.data = {
			B: [Q],
			lO: [this.xd],
			Gv: [Y],
			BD: [this.Iw],
			q9: [JSON.stringify(this.gs)]
		};
		G.pushHistoryState(k);
		this.Iw = null;
		this.xd = null;
		if (Y != null) {
			var F = JSON.parse(Y);
			ia.Kk(F);
			F.classID = "Lefx";
			delete F.masterFXSwitch;
			var D = new Action(ActionTypes.E.g5);
			D.Fj = !0;
			D.data = {
				kT: "set",
				FP: !0
			};
			var q = PsdDescriptorHelper.Fw("Lyr", !0);
			q.v.splice(0, 0, {
				t: "prop",
				v: {
					classID: "Prpr",
					keyID: "Lefx"
				}
			});
			D.data.a0 = {
				__name: "Set",
				classID: "setd",
				null: q,
				T: {
					t: "Objc",
					v: F
				}
			};
			d.dispatch(D)
		}
	} else if (l.a == "st_copy") {
		this.dM = [this.Iw, this.xd];
		this.Iw = null;
		this.xd = null
	} else if (l.a == "st_paste" || l.a == "st_clear") {
		if (l.a == "st_paste" && this.dM == null) return;
		var H = l.j != null ? [l.j] : G.g.slice(0),
			W = [],
			Z = [],
			B = [],
			a = [];
		for (var A = 0; A < H.length; A++) {
			var t = G.B[H[A]],
				m = f.Tt.fS(G, t);
			W.push(t.add.lmfx ? JSON.stringify(t.add.lmfx) : null);
			B.push(JSON.stringify(m));
			if (l.a == "st_paste") {
				Z.push(this.dM[1]);
				a.push(this.dM[0])
			} else {
				Z.push(null);
				m.lrMd.v = 0;
				m.Opct.v.val = 100;
				m.iOpa.v.val = 100;
				m.blIf = {
					v: []
				};
				for (var p = 0; p < 10; p++) m.blIf.v.push(0, 0, 255, 255);
				a.push(JSON.stringify(m))
			}
		}
		var k = new HistoryState([11, 6], this);
		k.data = {
			B: H,
			lO: W,
			Gv: Z,
			BD: B,
			q9: a
		};
		this.applyRedo(k.data, G);
		G.pushHistoryState(k);
		this.Iw = null;
		this.xd = null
	} else {
		var c = this.gs,
			F = null;
		if (l.a == "st_delsingle") {
			F = JSON.parse(this.xd);
			F[LayerStyleConstants.effectMultiKeys[l.yD[0]]].v.splice(l.yD[1], 1);
			F = JSON.stringify(F)
		}
		if (F == null) delete t.add.lmfx;
		else t.add.lmfx = JSON.parse(F);
		if (c != null) f.Tt.Dc(G, t, c);
		var k = new HistoryState([11, 6], this);
		k.data = {
			B: [l.j],
			lO: [this.xd],
			Gv: [F],
			BD: [this.Iw],
			q9: [JSON.stringify(c)]
		};
		G.pushHistoryState(k);
		this.Iw = null;
		this.xd = null
	}
	t.hD.q6 = !0;
	G.i_ = !0;
	G.U()
};
f.Tt.fS = function(l, d) {
	if (d.add.iOpa == null) d.add.iOpa = 255;
	if (d.add.brst == null) d.add.brst = [1, 1, 1];
	var G = d.IQ() ? ["pass"].concat(au.CP) : au.CP;
	return {
		lrMd: {
			v: G.indexOf(d.blendModeKey)
		},
		Opct: {
			v: {
				type: "#Prc",
				val: Math.round(d.opacity * 100 / 255)
			},
			t: "UntF"
		},
		iOpa: {
			v: {
				type: "#Prc",
				val: Math.round(d.add.iOpa * 100 / 255)
			},
			t: "UntF"
		},
		blIf: {
			v: d.channelRectDefaults.slice(0)
		},
		brst: {
			v: d.add.brst
		},
		gagl: {
			t: "UntF",
			v: {
				type: "#Ang",
				val: l.ie()
			}
		},
		aaT: l.Yf(),
		IQ: d.IQ()
	}
};
f.Tt.Dc = function(l, d, G) {
	var b = d.IQ() ? ["pass"].concat(au.CP) : au.CP;
	d.blendModeKey = b[G.lrMd.v];
	d.opacity = Math.round(G.Opct.v.val * 255 / 100);
	d.add.iOpa = Math.round(G.iOpa.v.val * 255 / 100);
	d.channelRectDefaults = G.blIf.v.slice(0);
	d.add.brst = G.brst.v.slice(0);
	l.Sn(G.gagl.v.val);
	l.Q1(G.aaT)
};
f.Tt.prototype.applyUndo = function(l, d) {
	for (var A = 0; A < l.B.length; A++) {
		var G = d.B[l.B[A]],
			b = l.lO[A];
		if (b == null) delete G.add.lmfx;
		else G.add.lmfx = JSON.parse(b);
		f.Tt.Dc(d, G, JSON.parse(l.BD[A]));
		G.hD.q6 = !0
	}
	d.i_ = !0;
	d.U()
};
f.Tt.prototype.applyRedo = function(l, d) {
	for (var A = 0; A < l.B.length; A++) {
		var G = d.B[l.B[A]],
			b = l.Gv[A];
		if (b == null) delete G.add.lmfx;
		else G.add.lmfx = JSON.parse(b);
		f.Tt.Dc(d, G, JSON.parse(l.q9[A]));
		G.hD.q6 = !0
	}
	d.i_ = !0;
	d.U()
};
// Layer Comps panel controller
f.hE = function() {
	f.AbstractTool.call(this, "Layer Comps", f.X6)
};
f.hE.prototype = new f.AbstractTool;
f.hE.prototype.TA = function(l, d, G, b) {
	var V = JSON.parse(JSON.stringify(G.MV)),
		Q = JSON.parse(JSON.stringify(G.MV)),
		t = null,
		I = null,
		y = null,
		e = -1,
		M = !1;
	if (l.a == "delLC") {
		var R = f.hE.Q2(G.MV, l.sy),
			J = G.MV.lastAppliedComp ? G.MV.lastAppliedComp.v : 0;
		Q.list.v.splice(R, 1);
		if (J == l.sy) delete Q.lastAppliedComp;
		t = "Delete Layer Comp"
	}
	if (l.a == "editLC") {
		var R = f.hE.Q2(G.MV, l.sy),
			n = Q.list.v[R].v;
		if (l.Xu != null) n.Nm.v = l.Xu;
		if (l.aqX != null) {
			var r = l.aqX,
				T = n.capturedInfo.v,
				j = T & (1 << r) - 1;
			T = T >> r;
			if ((T & 1) == 1) T--;
			else T++;
			n.capturedInfo.v = (T << r) + j
		}
		t = "Layer Comp properties"
	}
	if (l.a == "setLC") {
		f.hE.aw(G);
		if (l.sy == 0) delete Q.lastAppliedComp;
		else Q.lastAppliedComp = {
			t: "long",
			v: l.sy
		};
		t = "Switch Layer Comp";
		M = !0
	}
	if (l.a == "updLC") {
		f.hE.aw(G);
		I = f.hE.ayr(G, l.sy);
		y = f.hE.mG(G, l.sy);
		Q.lastAppliedComp = {
			t: "long",
			v: l.sy
		};
		t = "Update Layer Comp";
		e = l.sy;
		M = !0
	}
	if (l.a == "addLC") {
		f.hE.aw(G);
		var g = 1;
		for (var A = 0; A < Q.list.v.length; A++) g = Math.max(g, Q.list.v[A].v.compID.v) + 1;
		g += Math.floor(Math.random() * 1e4);
		var Y = {
			t: "Objc",
			v: {
				classID: "Comp",
				Nm: {
					t: "TEXT",
					v: "New Comp " + (Q.list.v.length + 1)
				},
				compID: {
					t: "long",
					v: g
				},
				capturedInfo: {
					t: "long",
					v: 7
				}
			}
		};
		Q.list.v.push(Y);
		Q.lastAppliedComp = {
			t: "long",
			v: g
		};
		t = "New Layer Comp";
		var k = f.hE.mG(G, g);
		f.hE.eX(G, k, g)
	}
	var F = new HistoryState(t, this);
	F.data = {
		a8$: V,
		a9k: Q,
		apK: I,
		asI: y,
		sy: e,
		LO: M
	};
	this.applyRedo(F.data, G);
	G.pushHistoryState(F)
};
f.hE.prototype.applyRedo = function(l, d) {
	d.MV = l.a9k;
	d.i_ = !0;
	if (l.asI) f.hE.eX(d, l.asI, l.sy);
	if (l.LO) {
		var G = d.MV.lastAppliedComp ? d.MV.lastAppliedComp.v : 0,
			b = f.hE.Q2(d.MV, G),
			V = b == -1 ? null : d.MV.list.v[b].v,
			Q = V ? V.capturedInfo.v : 7;
		f.hE.rq(d, G, Q);
		d.U()
	}
};
f.hE.prototype.applyUndo = function(l, d) {
	d.MV = l.a8$;
	d.i_ = !0;
	if (l.apK) f.hE.eX(d, l.apK, l.sy);
	if (l.LO) {
		var G = d.MV.lastAppliedComp ? d.MV.lastAppliedComp.v : 0,
			b = f.hE.Q2(d.MV, G),
			V = b == -1 ? null : d.MV.list.v[b].v,
			Q = V ? V.capturedInfo.v : 7;
		f.hE.rq(d, G, Q);
		d.U()
	}
};
f.hE.aw = function(l) {
	if (l.MV.lastAppliedComp != null || !l.BE) return;
	var d = f.hE.mG(l, 0);
	f.hE.eX(l, d, 0);
	l.BE = !1
};
f.hE.LX = function(l, d, G) {
	l.v.Hrzn.v += d;
	l.v.Vrtc.v += G
};
f.hE.Q2 = function(l, d) {
	var G = l.list.v;
	for (var A = 0; A < G.length; A++)
		if (G[A].v.compID.v == d) return A;
	return -1
};
f.hE.alO = function(l) {
	var d = l.layerSettings.v,
		V = null;
	if (d.length == 0) return;
	var G = "compList enab Ofst blendOptions Lefx FXRefPoint imageMask vectorMask layerSpecific".split(" "),
		b = d[0].v;
	if (b.enab == null) b.enab = {
		t: "bool",
		v: !0
	};
	if (b.Ofst == null) b.Ofst = {
		t: "Objc",
		v: {
			classID: "null",
			Hrzn: {
				t: "long",
				v: 0
			},
			Vrtc: {
				t: "long",
				v: 0
			}
		}
	};
	for (var A = 0; A < d.length; A++) {
		var Q = d[A].v;
		if (V == null) V = JSON.parse(JSON.stringify(Q));
		else
			for (var t = 0; t < G.length; t++) {
				var I = G[t];
				if (Q[I]) V[I] = JSON.parse(JSON.stringify(Q[I]))
			}
		d[A].v = JSON.parse(JSON.stringify(V))
	}
};
f.hE.a2Z = function(l, d) {
	var G = l.add.shmd.cmls,
		b = G.layerSettings.v;
	for (var V = 0; V < b.length; V++) {
		var Q = b[V].v,
			t = Q.compList.v[0].v;
		if (t == d) return V
	}
	return -1
};
f.hE.a8I = function(l, d) {
	var G = f.hE.a2Z(l, d);
	return G == -1 ? null : l.add.shmd.cmls.layerSettings.v[G].v
};
f.hE.rq = function(l, d, G) {
	for (var A = 0; A < l.B.length; A++) {
		var b = l.B[A],
			V = b.add.shmd.cmls;
		if (V == null) continue;
		var Q = V.layerSettings.v,
			t = f.hE.a8I(b, d);
		if (t == null) {
			b.Oj(!1);
			continue
		}
		if ((G & 1) != 0) {
			if (t.enab) b.Oj(t.enab.v);
			else b.Oj(!0)
		}
		if ((G & 2) != 0) {
			if (t.Ofst) {
				var I = t.Ofst.v,
					y = b.VR(l),
					e = Math.round(I.Hrzn.v - y.x),
					M = Math.round(I.Vrtc.v - y.y);
				if (e != 0 || M != 0) f.Pq._P(l, [A], null, e, M)
			}
		}
		if ((G & 4) != 0) {
			if (t.Lefx) {
				var R = JSON.parse(JSON.stringify(t.Lefx.v));
				ia.sB(R);
				if (JSON.stringify(R) != JSON.stringify(b.add.lmfx)) {
					b.add.lmfx = R;
					b.hD.q6 = !0
				}
			} else delete b.add.lmfx;
			if (t.blendOptions) {
				var J = t.blendOptions.v;
				if (J.Opct) b.opacity = Math.round(255 * J.Opct.v.val / 100);
				if (J.fillOpacity) b.add.iOpa = Math.round(255 * J.fillOpacity.v.val / 100);
				if (J.Md) b.blendModeKey = b.add.lsct == LayerSectionType.divider ? "norm" : au.bS(J.Md.v.BlnM)
			} else {
				b.opacity = 255;
				b.blendModeKey = b.IQ() ? "pass" : "norm";
				b.add.iOpa = 255
			}
		}
	}
};
f.hE.ayr = function(l, d) {
	var G = {};
	for (var A = 0; A < l.B.length; A++) {
		var b = l.B[A];
		if (b.add.shmd == null || b.add.shmd.cmls == null) continue;
		G["l" + b.add.lyid] = JSON.parse(JSON.stringify(f.hE.a8I(b, d)))
	}
	return G
};
f.hE.mG = function(l, d) {
	var G = {};
	for (var A = 0; A < l.B.length; A++) {
		var b = l.B[A],
			V = b.add.lyid;
		G["l" + V] = f.hE.alg(l, b, d)
	}
	return G
};
f.hE.alg = function(l, d, G) {
	var b = d.add.shmd ? d.add.shmd.cmls : null,
		V = {
			classID: "null"
		},
		Q = d.VR(l),
		t = {
			t: "Objc",
			v: {
				classID: "null",
				Hrzn: {
					t: "long",
					v: Q.x
				},
				Vrtc: {
					t: "long",
					v: Q.y
				}
			}
		};
	V.compList = {
		t: "VlLs",
		v: [{
			t: "long",
			v: G
		}]
	};
	V.enab = {
		t: "bool",
		v: d.zD()
	};
	V.Ofst = JSON.parse(JSON.stringify(t));
	V.FXRefPoint = JSON.parse(JSON.stringify(b && b.origFXRefPoint ? b.origFXRefPoint : t));
	V.blendOptions = {
		t: "Objc",
		v: {
			classID: "null",
			Md: {
				t: "enum",
				v: {
					BlnM: au.ci(d.blendModeKey)
				}
			},
			Opct: {
				t: "UntF",
				v: {
					type: "#Prc",
					val: 100 * d.opacity / 255
				}
			},
			fillOpacity: {
				t: "UntF",
				v: {
					type: "#Prc",
					val: d.add.iOpa != null ? 100 * d.add.iOpa / 255 : 100
				}
			}
		}
	};
	if (d.add.vmsk) {
		V.vectorMask = {
			t: "Objc",
			v: {
				classID: "null"
			}
		};
		V.vectorMask.v.Ofst = JSON.parse(JSON.stringify(t))
	}
	if (d.add.lmfx) {
		V.Lefx = {
			t: "Objc",
			v: JSON.parse(JSON.stringify(d.add.lmfx))
		};
		ia.Kk(V.Lefx.v)
	}
	return V
};
f.hE.ao4 = function(l, d) {
	var G = d.add.lyid;
	if (d.add.shmd == null) d.add.shmd = {};
	if (d.add.shmd.cmls == null) {
		d.add.shmd.cmls = {
			classID: "null",
			LyrI: {
				t: "long",
				v: G
			},
			layerSettings: {
				t: "VlLs",
				v: [{
					t: "Objc",
					v: f.hE.alg(l, d, 0)
				}]
			}
		}
	}
};
f.hE.eX = function(l, d, G) {
	for (var A = 0; A < l.B.length; A++) {
		var b = l.B[A],
			V = b.add.lyid;
		f.hE.ao4(l, b);
		var Q = b.add.shmd.cmls,
			t = Q.layerSettings.v,
			I = d["l" + V];
		if (I != null) I = {
			t: "Objc",
			v: JSON.parse(JSON.stringify(I))
		};
		var y = f.hE.a2Z(b, G);
		if (y == -1) {
			if (I == null) continue;
			else t.push(I)
		} else {
			if (I == null) t.splice(y, 1);
			else t[y] = I
		}
	}
};
f.hE.Uc = function(l, d) {
	for (var A = 0; A < l.B.length; A++) {
		var G = l.B[A],
			b = G.add.lyid;
		if (G.add.shmd == null || G.add.shmd.cmls == null) continue;
		var V = G.VR(l),
			Q = Math.round(V.x),
			t = Math.round(V.y);
		if (!d) {
			Q = -Q;
			t = -t
		}
		var I = G.add.shmd.cmls,
			y = I.layerSettings.v;
		if (I.origFXRefPoint) f.hE.LX(I.origFXRefPoint, -Q, -t);
		for (var e = 0; e < y.length; e++) {
			var M = y[e].v;
			f.hE.LX(M.Ofst, Q, t);
			var R = M.imageMask,
				J = M.vectorMask;
			if (R && R.v.Ofst) f.hE.LX(R.v.Ofst, Q, t);
			if (J && J.v.Ofst) f.hE.LX(J.v.Ofst, Q, t)
		}
	}
};
// Adjustment layer properties edit panel
f.u2 = function() {
	f.AbstractTool.call(this, "Adjust Edit", f.Qi);
	this.SQ = null;
	this.Kz = null
};
f.u2.prototype = new f.AbstractTool;
f.u2.NS = function(l, d, G, b) {
	if (b) d /= 4;
	var V = 0,
		Q = 0,
		t = 255,
		I = 0,
		y = 0,
		e = 255;
	while (Q + l[V] < d) {
		Q += l[V];
		V++
	}
	while (I + l[t] < d) {
		I += l[t];
		t--
	}
	if (b) {
		V -= Math.round(l[V] / (G / 32));
		t += Math.round(l[t] / (G / 32));
		if (V < 0) y = Math.round(-V * 255 / (t - V));
		if (t > 255) e = 255 - Math.round((t - 255) * 255 / (t - V))
	}
	return [Math.max(V, 0), Math.min(t, 255), y, e, 100]
};
f.u2.prototype.TA = function(l, d, G, b, V) {
	var Q = l.a;
	if (Q == "auto") {
		var t = l.nx,
			I = f.u2.getData(G);
		for (var A = 0; A < I.length; A++) {
			var y = I[A],
				e;
			if (t < 3) {} else {
				var M = FilterHelper.oT("hue2");
				d8.fZ(M, 0, [0, -100, 0]);
				e = LayerEffectsHelper.buildEffect("hue2", M)
			}
			LayerEffectsHelper.Qz(e, y.XO, y.gB, y.vD)
		}
		f.u2.y7(G, I);
		f.u2.h0(G, I, t < 3 ? [4, 16, t] : [19, 7, 0], this);
		G.U()
	}
	if (Q == "edit_layer") this.aaB(l, d, G, b);
	if (Q == "edit" || Q == "confirm" || Q == "cancel") this.Yl(l, d, G, V, !0);
	if (Q == "start") {
		if (G.g.length == 0) return;
		var R = G.B[G.g[0]];
		if (R.add.SoLd && R.ht <= 0 && G.FB.length == 0) {
			var J = new Action(ActionTypes.E.v, !0);
			J.G = f.WH;
			J.data = {
				a: "start",
				_K: l.ce,
				qv: l.qv
			};
			d.dispatch(J);
			return
		}
		if (!G.fU(d, null, !0)) return;
		if (FilterEffectPanel[l.ce] && l.qv == null) {
			if (G.g.length != 1) alert("Will be applied to " + G.g.length + " layers.");
			var J = new Action(ActionTypes.E.L, !0);
			J.data = {
				a: ActionTypes.$.SN,
				GU: "afw_" + l.ce
			};
			d.dispatch(J)
		} else {
			this.Yl({
				a: "edit",
				qv: l.qv,
				_K: l.ce
			}, d, G, V);
			this.Yl({
				a: "confirm",
				_K: l.ce
			}, d, G, V)
		}
	}
};
f.u2.prototype.aaB = function(l, d, G, b) {
	var V = l.a,
		Q = G.g[0],
		t = G.B[Q],
		I = LayerEffectsHelper.detectAdjustmentKey(t.add),
		y = JSON.parse(JSON.stringify(t.add[I])),
		J;
	for (var e in l.Z) y[e] = l.Z[e];
	var M = JSON.parse(JSON.stringify(y));
	for (var e in LayerEffectsHelper.m3)
		if (LayerEffectsHelper.m3[e] == I) M.classID = e;
	var R = G.history[G.historyIndex];
	if (R && R.G == this && R.data.mS != null && R.data.j == Q) J = R;
	else {
		var n = new Action(ActionTypes.E.g5, !0),
			r = {
				classID: "setd",
				null: PsdDescriptorHelper.Fw("AdjL", !0),
				T: {
					t: "Objc",
					v: M
				}
			};
		n.data = {
			FP: !0,
			kT: "set",
			a0: r
		};
		d.dispatch(n);
		var J = new HistoryState([6, 39], this);
		J.data = {
			j: Q,
			mS: t.add[I],
			mz: y,
			KU: r
		};
		G.pushHistoryState(J)
	}
	J.data.mz = y;
	J.data.KU.T.v = M;
	this.applyRedo(J.data, G)
};
f.u2.getData = function(l, d, G) {
	var b = [],
		V = new Rect(0, 0, l.m, l.n),
		Q = l.FB.length != 0 ? [-1 - l.FB[0]] : l.g;
	for (var A = 0; A < Q.length; A++) {
		var t = Q[A],
			I = t < 0 ? null : l.B[t],
			y = {
				j: t,
				jd: t < 0 ? 1 : I.ht
			};
		b.push(y);
		var e = l.vj[-1 - t];
		if (0 <= t) e = I.ht <= 0 ? null : I.ht == 1 ? I.c3() : I.vZ(l).z;
		var M = e ? e.rect : I.rect;
		if (l.P) {
			y.vD = l.P.rect.wD(d || e != null ? V : M)
		} else y.vD = d || e != null ? M.Cw(V) : M.clone();
		if (G) y.vD = G[A].vD.clone();
		var R = y.vD.O();
		y.XO = PixelUtil.allocBytes(R * 4);
		if (e) f.BrushToolBase.JW(e.channel, e.rect, e.color, y.XO, y.vD);
		else PixelUtil.blitRgbaRect(I.buffer, M, y.XO, y.vD);
		y.gB = y.XO.slice(0);
		if (l.P) {
			y.Qc = PixelUtil.allocBytes(R);
			PixelUtil.copyBufferRect(l.P.channel, l.P.rect, y.Qc, y.vD)
		}
	}
	return b
};
f.u2.abb = function(l, d, G) {
	if (d == null) return d;
	var b = LayerEffectsHelper.Gs(l, d),
		Q;
	if (b == -1) return d;
	var V = G.length >>> 2,
		t = PixelUtil.histogramFromRgba(G),
		I = .001 * V;
	if (b == 0 || b == 2) Q = [
		[0, 255, 0, 255, 100], f.u2.NS(t[1], I, V, b == 2), f.u2.NS(t[2], I, V, b == 2), f.u2.NS(t[3], I, V, b == 2)
	];
	if (b == 1) Q = [f.u2.NS(t[0], I * .33, V, !1), [0, 255, 0, 255, 100],
		[0, 255, 0, 255, 100],
		[0, 255, 0, 255, 100]
	];
	var y = FilterHelper.oT("levl");
	for (var A = 0; A < 4; A++) hg.fZ(y, A, Q[A]);
	return y
};
f.u2.a12 = function(l, d, G, b) {
	var V, Q;
	if (G.t == "name") {
		var t = 0;
		for (var I = 0; I < l.B.length; I++)
			if (l.B[I].getName() == G.v.val) t = I;
		if (l == d && t == b.j) {
			V = b.XO;
			Q = b.vD
		} else {
			var y = l.B[t];
			V = y.buffer;
			Q = y.rect
		}
	} else {
		Q = new Rect(0, 0, l.m, l.n);
		V = l == d ? b.Wq : l.LT()
	}
	return [V, Q]
};
f.u2.prototype.Yl = function(l, d, G, b) {
	if (this.SQ == null) {
		if (l._K == "aply") G.B[G.g[0]].extend(new Rect(0, 0, G.m, G.n));
		this.SQ = f.u2.getData(G, null, l._K == "fade" ? G.getHeadHistoryState().data : null);
		if (l._K == "aply" || l._K == "matc") this.SQ[0].Wq = G.LT()
	}
	if (l.a == "edit") {
		this.Kz = [l._K, l.qv];
		var V = this.SQ[0],
			Q = f.u2.abb(l._K, l.qv, V.XO),
			t = LayerEffectsHelper.buildEffect(l._K, Q);
		if (l._K == "fade" || l._K == "matc" || l._K == "aply") t = l.qv;
		if (t != null) {
			for (var I = 0; I < this.SQ.length; I++) {
				var y = this.SQ[I];
				if (l.ve) PixelUtil.copyByteBuffer(y.XO, y.gB);
				else if (l._K == "fade") {
					var e = au.bS(l.qv.Md.v.BlnM),
						M = l.qv.Opct.v.val / 100,
						R = G.getHeadHistoryState().data[I];
					PixelUtil.copyByteBuffer(R.XO, y.gB);
					if (e == "norm") PixelUtil.blend.aX(y.XO, y.vD, y.gB, y.vD, null, null, null, y.vD, M);
					else {
						var J = PatternHelper.Ip();
						J.x4 = !0;
						for (var A = 0; A < R.XO.length; A += 4)
							if (R.XO[A + 3] != y.XO[A + 3]) {
								J = null;
								break
							}
						PixelUtil.blend.compositeBlend(e, y.XO, y.vD, y.gB, y.vD, y.vD, M, J)
					}
				} else if (l._K == "matc") {
					var n;
					if (t.noReference && t.noReference.v) n = y.XO;
					else {
						var r = t.Srce.v,
							T = r[1].v.val,
							j = d.Mt,
							g = G;
						for (var A = 0; A < j.length; A++)
							if (j[A].name == T) g = j[A];
						var Y = f.u2.a12(g, G, r[0], y);
						n = Y[0]
					}
					aL(y.XO, y.vD.m, y.vD.n, n, y.gB, [t.Lght.v, t.ClrR.v, t.Fade.v, t.neutralizeColor ? t.neutralizeColor.v : !1])
				} else if (l._K == "aply") {
					t = t.With.v;
					var k = t.T.v,
						Y = f.u2.a12(G, G, k[1], y),
						n = Y[0],
						F = Y[1],
						D = t.Clcl ? t.Clcl.v.Clcn : null,
						e = D ? au.bS(D) : "norm",
						M = t.Opct ? t.Opct.v.val / 100 : 1,
						q = ["RGB", "Rd", "Grn", "Bl", "Trsp"].indexOf(k[0].v.enum),
						Q = t.Invr && t.Invr.v;
					if (Q || q != 0) {
						n = n.slice(0);
						if (Q) PixelUtil.invertRgbInPlace(n);
						if (q != 0) {
							var H = PixelUtil.allocBytes(F.O());
							PixelUtil.extractChannelFromRgba(n, H, q - 1);
							if (q == 4) PixelUtil.invertUint32Buffer(H);
							for (var W = 0; W < 3; W++) PixelUtil.writeChannelToRgba(H, n, W)
						}
					}
					if (D == "Add" || D == "Sbtr") {
						var Z = 1 / t.Scl.v,
							B = t.Ofst.v,
							a = D == "Add" ? 1 : -1,
							m = new Uint8ClampedArray(y.gB.buffer);
						for (var A = 0; A < n.length; A += 4) {
							m[A] = (y.XO[A] + a * n[A]) * Z + B;
							m[A + 1] = (y.XO[A + 1] + a * n[A + 1]) * Z + B;
							m[A + 2] = (y.XO[A + 2] + a * n[A + 2]) * Z + B
						}
					} else {
						var J = PatternHelper.Ip();
						J.x4 = t.PrsT && t.PrsT.v;
						y.gB.fill(0);
						y.gB.set(y.XO);
						PixelUtil.blend.compositeBlend(e, n, F, y.gB, y.vD, y.vD, M, J)
					}
				} else LayerEffectsHelper.Qz(t, y.XO, y.gB, y.vD)
			}
			f.u2.y7(G, this.SQ)
		}
	}
	if (l.a == "cancel") {
		f.u2.a7s(G, this.SQ);
		this.SQ = null
	}
	if (l.a == "confirm") {
		var p = {
				fade: [2, 11],
				aply: [2, 12],
				matc: [4, 18]
			},
			c = p[l._K];
		if (c == null) c = LayerEffectsHelper.names[l._K];
		var v = LayerEffectsHelper.Gs(l._K, this.Kz[1]);
		if (v != -1) c = [4, 16, v];
		f.u2.h0(G, this.SQ, c, this);
		this.SQ = null;
		if (v == -1) f.u2.j1(d, this.Kz)
	}
	G.U()
};
f.u2.j1 = function(l, d) {
	var G = d[0],
		b = d[1],
		V, Q;
	if (LayerEffectsHelper.actionEventNames[G]) {
		V = LayerEffectsHelper.actionEventNames[G];
		if (FilterEffectPanel[G]) Q = b
	}
	if (FilterHelper.Tb[G]) {
		V = FilterHelper.Tb[G];
		if (FilterEffectPanel[G]) Q = b
	}
	if (G == "fade") {
		V = "fade";
		Q = b
	}
	if (G == "matc") {
		V = "matchColor";
		Q = b
	}
	if (G == "aply") {
		V = "applyImageEvent";
		Q = b
	}
	if (V == null) return;
	var t = new Action(ActionTypes.E.g5, !0);
	t.data = {
		FP: !0,
		kT: V
	};
	if (Q) {
		Q = JSON.parse(JSON.stringify(Q));
		t.data.a0 = Q
	}
	l.dispatch(t)
};
f.u2.a7s = function(l, d) {
	f.u2.fM(l, d)
};
f.u2.h0 = function(l, d, G, b) {
	for (var A = 0; A < d.length; A++) {
		var V = d[A],
			Q = l.B[V.j],
			t = V.j < 0 ? l.vj[-1 - V.j] : V.jd <= 0 ? null : V.jd == 1 ? Q.c3() : Q.vZ(l).z;
		if (t) {
			t.dispose();
			t.y1 = !0;
			if (Q) Q.QJ(l)
		} else {
			Q.ww();
			Q.U()
		}
		delete V.gB;
		delete V.Qc
	}
	var I = new HistoryState(G, b);
	I.data = d;
	l.pushHistoryState(I);
	l.i_ = !0
};
f.u2.y7 = function(l, d, G) {
	for (var A = 0; A < d.length; A++) {
		var b = d[A],
			V = l.B[b.j],
			Q = G ? b.XO : b.gB,
			t = b.vD;
		if (b.jd == 0) {
			V.extend(t);
			if (b.Qc) {
				PixelUtil.blitRgbaRect(b.XO, t, V.buffer, V.rect);
				PixelUtil.blend.aX(Q, t, V.buffer, V.rect, b.Qc, t, 0, t, 1)
			} else PixelUtil.blitRgbaRect(Q, t, V.buffer, V.rect)
		} else {
			var I = b.j < 0 ? l.vj[-1 - b.j] : b.jd == 1 ? V.c3() : V.vZ(l).z;
			I.extend(t);
			if (b.Qc) {
				var y = PixelUtil.allocBytes(t.O() * 4);
				PixelUtil.copyByteBuffer(b.XO, y);
				PixelUtil.blend.aX(Q, t, y, t, b.Qc, t, 0, t, 1);
				f.BrushToolBase.HL(y, t, I)
			} else f.BrushToolBase.HL(Q, t, I);
			I.y1 = !0;
			if (V) V.QJ(l)
		}
		if (V) V.U()
	}
	if (!G) f.u2.asz(l, d)
};
f.u2.fM = function(l, d) {
	for (var A = 0; A < d.length; A++) {
		var G = d[A],
			b = l.B[G.j],
			V = G.vD,
			Q = PixelUtil.allocBytes(V.O() * 4);
		if (G.jd == 0) {
			PixelUtil.blitRgbaRect(b.buffer, b.rect, Q, V);
			b.extend(V);
			PixelUtil.blitRgbaRect(G.XO, V, b.buffer, b.rect);
			b.ww()
		} else {
			var t = G.j < 0 ? l.vj[-1 - G.j] : G.jd == 1 ? b.c3() : b.vZ(l).z;
			f.BrushToolBase.JW(t.channel, t.rect, t.color, Q, V);
			t.extend(V);
			f.BrushToolBase.HL(G.XO, V, t);
			t.dispose();
			t.y1 = !0;
			if (b) b.QJ(l)
		}
		G.XO = Q;
		if (b) b.U()
	}
	l.i_ = !0
};
f.u2.asz = function(l, d) {
	var G = f.u2.ac$(l),
		b = ~G;
	if (G == 16777215) return;
	for (var A = 0; A < d.length; A++) {
		var V = d[A],
			Q = l.B[V.j],
			t = V.vD;
		if (V.jd != 0) continue;
		Q.extend(t);
		var I = t.x - Q.rect.x,
			y = t.y - Q.rect.y,
			e = Q.rect.m,
			M = new Uint32Array(V.XO.buffer),
			R = new Uint32Array(Q.buffer.buffer);
		for (var J = 0; J < t.n; J++)
			for (var n = 0; n < t.m; n++) {
				var r = J * t.m + n,
					T = (J + y) * e + (n + I);
				R[T] = R[T] & G | M[r] & b
			}
		Q.ww();
		Q.U()
	}
	l.U()
};
f.u2.ac$ = function(l) {
	var d = l.u.MX;
	return d[2] * 16711680 | d[1] * 65280 | d[0] * 255
};
f.u2.prototype.applyUndo = function(l, d) {
	var G = d.B[l.j];
	if (l.mS != null) G.add[LayerEffectsHelper.detectAdjustmentKey(G.add)] = l.mS;
	else f.u2.fM(d, l);
	d.U()
};
f.u2.prototype.applyRedo = function(l, d) {
	var G = d.B[l.j];
	if (l.mS != null) G.add[LayerEffectsHelper.detectAdjustmentKey(G.add)] = l.mz;
	else f.u2.fM(d, l);
	d.U()
};
// Smart Filter properties edit panel
f.uY = function() {
	f.AbstractTool.call(this, "Filter Edit", f.WH);
	this.SQ = null;
	this.vX = null;
	this.a = null;
	this.Kz = null
};
f.uY.prototype = new f.AbstractTool;
f.uY.prototype.TA = function(l, d, G, b, V) {
	if (l.a == "start") {
		if (G.g.length == 0) return;
		var Q = G.B[G.g[0]];
		if (Q.add.SoLd && Q.ht <= 0 && G.FB.length == 0) {} else if (!G.fU(d, null, !0)) return;
		var t = l._K;
		if ((FilterEffectPanel[t] || FilterHelper.d[t]) && l.qv == null) {
			if (G.g.length != 1) alert("Will be applied to " + G.g.length + " layers.");
			var I = new Action(ActionTypes.E.L, !0);
			I.data = f.uY.avp(t, this.Zb(G, t));
			d.dispatch(I)
		} else {
			var y = {
				a: "edit",
				_K: t,
				qv: l.qv,
				iY: this.Zb(G)
			};
			this.TA(y, d, G, b, V);
			y.a = "confirm";
			delete y.qv;
			this.TA(y, d, G, b, V)
		}
	}
	if (l.a == "edit" || l.a == "cancel" || l.a == "confirm") {
		if (l.a == "edit") this.Kz = [l._K, l.qv];
		if (l.iY) this.a3$(l, d, G, V);
		else this.ah3(l, d, G, V)
	}
	if (l.a == "applylast" && this.Kz != null) {
		var y = {
			a: "edit",
			_K: this.Kz[0],
			qv: this.Kz[1],
			iY: this.Zb(G)
		};
		this.TA(y, d, G, b, V);
		y.a = "confirm";
		delete y.qv;
		this.TA(y, d, G, b, V)
	}
};
f.uY.avp = function(l, d) {
	var G = FilterHelper.d[l];
	if (G) return {
		a: ActionTypes.$.yb,
		G: G,
		Ye: {
			iY: d
		}
	};
	else return {
		a: ActionTypes.$.SN,
		GU: "afw_" + l,
		iY: d
	}
};
f.uY.prototype.Zb = function(l, d) {
	var G = l.B[l.g[0]],
		b;
	if (G.add.SoLd && G.ht <= 0 && l.FB.length == 0) {
		b = {
			j: l.g[0],
			index: 0
		};
		if (G.add.SoLd.filterFX != null) {
			var V = G.add.SoLd.filterFX.v.filterFXList.v;
			b.index = V.length;
			for (var A = 0; A < V.length; A++)
				if (FilterHelper.ko(V[A].v) == d && FilterHelper.d[d]) b.index = A
		}
	}
	return b
};
f.uY.prototype.a3$ = function(l, d, G, b) {
	var V = G.B[l.iY.j],
		Q = l._K;
	if (l.a == "edit") {
		if (this.a == null) {
			var t = FilterHelper.names[Q];
			if (t == null) t = LayerEffectsHelper.names[Q];
			if (Q == "blendOptions") t = [14, 10];
			this.a = new HistoryState(t, this);
			this.a.data = {
				iY: l.iY,
				aa3: JSON.parse(JSON.stringify(V.add.SoLd))
			}
		}
		if (!V.aW()) {
			V.add.SoLd.filterFX = FilterHelper.A8();
			this.a.data.zK = PsdDocument.auv(V.add.SoLd.placed.v);
			G.p_(this.a.data.zK);
			V.kX(G)
		}
		var I = V.add.SoLd.filterFX.v.filterFXList.v;
		if (I[l.iY.index] == null) {
			I.push(FilterHelper.bO(Q, b))
		}
		if (l.qv) {
			I[l.iY.index].v.enab.v = l.ve != !0;
			if (Q == "blendOptions") I[l.iY.index].v.blendOptions.v = l.qv;
			else I[l.iY.index].v.Fltr.v = l.qv
		}
		this.a.data.ayD = JSON.parse(JSON.stringify(V.add.SoLd));
		this.applyRedo(this.a.data, G)
	}
	if (l.a == "cancel") {
		if (this.a) this.applyUndo(this.a.data, G);
		this.a = null
	}
	if (l.a == "confirm") {
		if (this.a) G.pushHistoryState(this.a);
		f.u2.j1(d, this.Kz);
		this.a = null
	}
};
f.uY.prototype.nA = function(l) {
	return {
		o: l >>> 16,
		J: l >>> 8 & 255,
		k: l & 255
	}
};
f.uY.prototype.ah3 = function(l, d, G, b) {
	if (this.SQ == null) {
		var V = FilterHelper.dn(l._K, l.qv);
		this.SQ = f.u2.getData(G, V.x != 0 || V.y != 0)
	}
	if (l.a == "edit") {
		var Q = JSON.stringify(l.qv);
		if ((l.qv == null || Q != this.vX) && l.ve != !0)
			for (var A = 0; A < this.SQ.length; A++) {
				var t = this.SQ[A],
					I = {
						rect: t.vD,
						buffer: t.XO
					},
					y = {
						rect: t.vD,
						buffer: t.gB
					};
				if (l._K == "Avrg" && t.Qc) {
					I.buffer = t.XO.slice(0);
					PixelUtil.multiplyAlphaIntoRgba(t.Qc, I.buffer)
				}
				// console.log( l._K, I, l.qv, this.nA(b.Y7), this.nA(b.GF), y, [G.add.lnk2 ? G.add.lnk2 : [], G.B[G.g[0]].c3(), G.vj, G.LW()] );
				FilterHelper.Qz(l._K, I, l.qv, this.nA(b.Y7), this.nA(b.GF), y, [G.add.lnk2 ? G.add.lnk2 : [], G.B[G.g[0]].c3(), G.vj, G.LW()]);
				if (l._K == "Avrg" && t.Qc) {
					var e = t.XO.length;
					for (var A = 0; A < e; A += 4) t.gB[A + 3] = t.XO[A + 3]
				}
				this.vX = Q
			}
		f.u2.y7(G, this.SQ, l.ve)
	}
	if (l.a == "cancel") {
		f.u2.a7s(G, this.SQ);
		this.SQ = null;
		this.vX = null
	}
	if (l.a == "confirm") {
		f.u2.h0(G, this.SQ, FilterHelper.names[l._K], this);
		this.SQ = null;
		this.vX = null;
		f.u2.j1(d, this.Kz)
	}
	G.U();
	G.i_ = !0
};
f.uY.prototype.applyUndo = function(l, d) {
	if (l.iY) {
		var G = d.B[l.iY.j];
		if (l.zK) d.mP(l.zK);
		G.add.SoLd = JSON.parse(JSON.stringify(l.aa3));
		if (G.aW()) G.yN(d);
		else {
			G.kX(d);
			G.ht = 0
		}
	} else f.u2.fM(d, l);
	d.U();
	d.i_ = !0
};
f.uY.prototype.applyRedo = function(l, d) {
	if (l.iY) {
		var G = d.B[l.iY.j];
		if (l.zK) d.p_(l.zK);
		G.add.SoLd = JSON.parse(JSON.stringify(l.ayD));
		if (G.aW()) G.yN(d);
		else G.kX(d);
		if (!G.bn()) G.layerFlags += 32
	} else f.u2.fM(d, l);
	d.U();
	d.i_ = !0
};
