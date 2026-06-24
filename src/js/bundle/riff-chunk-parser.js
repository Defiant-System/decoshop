/**
* riffChunkParser (de-obfuscated partial from rest.js)
* Lines 40178-63614. Original identifier: riffChunkParser
*/

// RIFF/LIST chunk parser for binary container formats
var RiffChunkParser = {};

RiffChunkParser.Cd = function(l, d) {
	var G = new Uint8Array(l);
	return RiffChunkParser.xw(G, 0, d)
};

RiffChunkParser.xw = function(l, d, G) {
	var b = X.Lv,
		V = X.Ko,
		Q = {
			AN: V(l, d, 4),
			R: d + 8,
			size: b(l, d + 4)
		};
	if (G && G[Q.size] != null) Q.size = G[Q.size];
	if (Q.AN == "RIFF" || Q.AN == "LIST") {
		Q.az = V(l, d + 8, 4)
	}
	if (Q.size < 0 || Q.R + Q.size > l.length) throw "e";
	if (Q.AN == "RIFF" || Q.AN == "LIST" && (Q.az != "cmpr" && Q.az != "stlt")) {
		Q.sub = [];
		d += 12;
		var t = Q.R + Q.size;
		while (d < t) {
			var I = RiffChunkParser.xw(l, d, G);
			Q.sub.push(I);
			d += 8 + I.size + (I.size & 1)
		}
	}
	return Q
};

// CorelDRAW CDR file parser module (IIFE)
var CdrParser = function() {
	function l(x, K) {
		var u = null;
		if (x.sub == null) return u;
		for (var A = 0; A < x.sub.length; A++) {
			var bC = x.sub[A];
			if (bC.AN == K || bC.az == K) u = bC
		}
		return u
	}

	function d(x) {
		if (x == 32) return 300;
		else if (x < 49) return 0;
		else if (x < 58) return 100 * (x - 48);
		else if (x < 65) return 0;
		return 100 * (x - 55)
	}
	var G;

	function b(x, K) {
		var u = new Uint8Array(x);
		K.ya = !0;
		G = {};
		var bC = X.Ko(u, 0, 2);
		if (bC == "WL") {
			alert("Unsupported CDR version")
		} else {
			var O, $, gX, iw, jC = 300,
				hS = 0;
			if (bC == "PK") {
				$ = UZIP.parse(u);
				u = $["content/root.dat"];
				gX = X.Kw($["content/dataFileList.dat"]).split("\n")
			}
			O = RiffChunkParser.Cd(u.buffer);
			console.log(O);
			var _ = d(u[11]),
				jI = {
					data: u,
					R: 0,
					EE: _
				};
			jI.yE = jI.EE < 600 ? 16 : 32;
			H(u, jI, gX, $, O.sub, 0);
			var hn = [];
			if ($) {
				iw = l(O, "doc ");
				V(iw);
				var jq = O.sub;
				for (var A = 0; A < jq.length; A++)
					if (jq[A].az == "page") hn.push(jq[A]);
				hn = hn.slice(1)
			} else if (l(O, "cmpr") == null) {
				iw = l(O, "page");
				hn.push(iw)
			} else {
				var iv = l(O, "cmpr").sub;
				iw = iv[0];
				hn = [iv.slice(1)[1]];
				V(iw)
			}
			var kq = l(iw, "mcfg").Z,
				eE = kq.az8,
				e8 = eE.x * .1,
				aI = eE.x * hn.length + e8 * (hn.length - 1),
				dK = eE.y;
			jC /= kf.t2(new Rect(0, 0, Math.round(aI * jC), Math.round(dK * jC)), 8192 * 8192);
			var d7 = Math.round(aI * jC),
				ka = Math.round(dK * jC);
			K.m = d7;
			K.n = ka;
			K.buffer = PixelUtil.allocBytes(K.m * K.n * 4);
			for (var A = 0; A < hn.length; A++) {
				var eH = new Matrix2D(jC, 0, 0, -jC, eE.x * jC / 2 + hS, eE.y * jC / 2);
				Q(hn[A], iw, K, eH);
				var kA = K.B[K.B.length - 1];
				kA.P3(new Rect(Math.round(hS), 0, Math.round(eE.x * jC), Math.round(eE.y * jC)));
				kA.tH("Page " + (A + 1));
				hS += eE.x * jC + e8 * jC
			}
			K._8(hn.length)
		}
	}

	function V(x) {
		var K = l(x, "filt").sub,
			u = l(x, "otlt").sub,
			bC = l(x, "fntt");
		if (bC) bC = bC.sub;
		x.YX = {};
		for (var A = 0; A < K.length; A++) x.YX[K[A].sub[0].Z.id] = K[A].sub[0].Z;
		x.u1 = {};
		for (var A = 0; A < u.length; A++) x.u1[u[A].Z.id] = u[A].Z;
		if (bC) {
			x.fonts = {};
			for (var A = 0; A < bC.length; A++) x.fonts[bC[A].Z.id] = bC[A].Z
		}
	}

	function Q(x, K, u, bC) {
		var O = x.az ? x.az : x.AN,
			$ = l(x, "lgob"),
			gX = l(x, "txsm"),
			_ = null,
			jI = null;
		if ($) {
			_ = l($, "trfl");
			jI = l($, "loda")
		} else if (l(x, "lobj")) jI = l(x, "lobj");
		var iw = _ ? _.sub[0].lV.clone() : new Matrix2D;
		iw.concat(bC);
		var hn = u.V4();
		if (O == "page" || O == "layr" || O == "grp ") {
			hn.tH((O == "page" ? "Page" : "Group") + " " + u.B.length);
			hn.add.lsct = LayerSectionType.open;
			hn.blendModeKey = "pass";
			hn.layerFlags = 24;
			var jq = [];
			if (O == "page") jq = l(x, "gobj").sub;
			if (O == "layr") jq = x.sub.slice(2);
			if (O == "grp ") jq = x.sub.slice(4);
			if (jq.length == 0) return;
			u.B.push(u.En());
			for (var A = jq.length - 1; A >= 0; A--) Q(jq[A], K, u, bC)
		} else if (O == "obj " && jI.Z && jI.Z.path) {
			var iv, kq;
			if (K.YX) {
				iv = K.YX[jI.Z.a7p];
				kq = K.u1[jI.Z.a4m]
			}
			if (iv == null) iv = jI.Z.a4o;
			if (kq == null) kq = jI.Z.akV;
			hn = t(u, jI.Z.path, bC, iw, iv, kq)
		} else if (O == "obj " && gX) {
			var eE = jI.Z.awB,
				e8 = jI.Z.aqK,
				jC = "";
			hn.add.TySh = dt.Iu(0, 0);
			var aI = iw.Nw();
			hn.add.TySh.D.translate(iw.cI, iw.xu);
			var dK = hn.add.TySh.zC,
				d7 = gX.Z.fd;
			if (d7 == null) return;
			for (var A = 0; A < d7.length; A++) {
				var ka = d7[A],
					hS = jC.length;
				jC += ka.text + "\n";
				dt.sT(dK, hS, ka.text + "\n");
				if (ka.text == "") continue;
				var eH = I(ka.a3k, K),
					kA = eH.alL,
					gq = K.fonts[kA.aus],
					hb = dt.Au(dK, hS, jC.length);
				if (eH.align == 3) hb.GB.Justification = 1;
				else if (eH.align == 2) hb.GB.Justification = 2;
				else hb.GB.Justification = 0;
				var ex = eH.fill.Z;
				if (gq.Ot) dt.Wr(hb, gq.Ot);
				hb.xg.FillColor = {
					Type: 1,
					Values: [1, ex[0], ex[1], ex[2]]
				};
				hb.xg.FontSize = Math.round(kA.fontSize * bC.Nw());
				dt.rW(dK, hS, jC.length - 1, hb)
			}
			if (e8) {
				dt.AO(dK, 0)
			} else {
				dt.AO(dK, 1);
				dt.mt(dK, [0, 0, Math.round(eE.x * iw.aS), Math.round(-eE.y * iw.Qd)])
			}
			hn.tH(jC.slice(0, 10))
		} else {
			hn = null
		}
		if (hn) u.B.push(hn)
	}

	function t(x, K, u, bC, O, $) {
		var gX = x.V4();
		gX.tH("Object " + x.B.length);
		gX.layerFlags |= 16;
		gX.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default));
		var _ = gX.add.vstk;
		_.strokeEnabled.v = !1;
		gX.add.vmsk = new LayerRecord.VectorMask;
		gX.add.vmsk.i = PixelUtil.vec.QO(K, !1);
		PixelUtil.path.transformFlatCoords(gX.add.vmsk.i, bC);
		var jI = O && O.type != 0,
			iw = jI && O.Z != null ? O.Z : [0, 0, 0];
		a7.Ty(iw, gX, bC, PixelUtil.path.oh(gX.add.vmsk.i));
		_.fillEnabled.v = jI;
		if ($ && $.ahY != 1) {
			_.strokeEnabled.v = !0;
			_.strokeStyleLineAlignment.v.strokeStyleLineAlignment = "strokeStyleAlignCenter";
			var hn = _.strokeStyleLineWidth.v.val = $.lineWidth * u.Nw(),
				jq = $.color;
			_.strokeStyleContent.v.Clr.v = PixelUtil.color.rgbColorDescriptor({
				o: jq[0] * 255,
				J: jq[1] * 255,
				k: jq[2] * 255
			});
			if ($.z9.length != 0) _.strokeStyleLineDashSet.v = PatternHelper.CB($.z9, 4 / hn);
			var iv = $.aiu,
				kq = $.arz;
			if (kq != 0) {
				var eE = K.C,
					A = eE.length - 4,
					e8 = eE[A],
					aI = eE[A + 1],
					dK = eE[A + 2],
					jC = eE[A + 3],
					d7 = new Matrix2D;
				d7.scale(.15, .15);
				d7.rotate(-Math.PI / 2 + Math.atan2(jC - aI, -(dK - e8)));
				d7.translate(dK, jC);
				d7.concat(bC);
				if (G[kq]) {
					var ka = t(x, G[kq], u, d7, jq, null);
					x.B.push(ka)
				}
			}
		}
		gX.Ba();
		gX.QJ(x);
		return gX
	}

	function I(x, K) {
		var u = l(K, "stlt").Z,
			bC = JSON.parse(JSON.stringify(u.Pr[x]));
		if (bC.Ss != 0) {
			var O = u.Pr[bC.Ss];
			for (var $ in O)
				if (bC[$] == null || bC[$] == 0) bC[$] = O[$];
			delete bC.Ss
		}
		bC.align = u.ay_[bC.a29];
		bC.fill = K.YX[u.ae6[bC.ajC]];
		bC.alX = K.u1[u.akA[bC.ane]];
		bC.alL = u.ajV[bC.a9$];
		return bC
	}

	function y(A) {
		var hZ = A.data[A.R];
		A.R += 1;
		return hZ
	}

	function e(A) {
		var hZ = X._w(A.data, A.R);
		A.R += 2;
		return hZ
	}

	function M(A) {
		var hZ = X.Lv(A.data, A.R);
		A.R += 4;
		return hZ
	}

	function R(A) {
		var hZ = X.Lv(A.data, A.R);
		A.R += 8;
		return hZ
	}

	function J(A) {
		var hZ = X.V6(A.data, A.R);
		A.R += 2;
		return hZ
	}

	function n(A) {
		var hZ = X.EY(A.data, A.R);
		A.R += 4;
		return hZ
	}

	function r(A) {
		var hZ = X.Ub(A.data, A.R);
		A.R += 8;
		return hZ
	}

	function T(A) {
		if (A.R >= A.data.length) throw "e";
		var x = 0;
		while (A.data[A.R + x] != 0) x++;
		var K = X.Ko(A.data, A.R, x);
		A.R += x + 1;
		return K
	}

	function j(A) {
		var x = "";
		while (!0) {
			var K = e(A);
			if (K == 0) break;
			x += String.fromCharCode(K)
		}
		return x
	}

	function g(x) {
		var K = M(x),
			u = (K & 4294901760) >>> 16,
			bC = (K & 65535) / 65535;
		return u + bC
	}

	function Y(x) {
		if (x.EE < 600) return Math.PI * J(x) / 1800;
		return Math.PI * n(x) / 18e7
	}

	function k(x) {
		if (x.EE < 1500) return F(x);
		else return r(x) / 254e3
	}

	function F(x) {
		if (x.EE < 600) return J(x) / 1e3;
		else return n(x) / 254e3
	}

	function D(x) {
		if (x.EE < 600) return e(x);
		else return M(x)
	}

	function q(x) {
		if (x.EE < 600) return J(x);
		else return n(x)
	}

	function H(x, K, u, bC, O, $) {
		var gX, _, jI;
		for (var iw = 0; iw < O.length; iw++) {
			var hn = K.EE,
				jq = O[iw];
			K.data = x;
			K.R = jq.R + (jq.AN == "LIST" ? 4 : 0);
			if (bC && jq.sub == null) {
				gX = M(K);
				_ = M(K);
				jI = M(K);
				var iv = e(K);
				if (iv != 0) throw "e";
				var kq = e(K);
				if (kq > 32) throw "e";
				K.R -= 16;
				if (gX != 4294967295) {
					K.data = bC["content/data/" + u[gX]];
					K.R = jI
				}
			}
			if (jq.AN == "vrsn") {
				if (jq.size == 16) K.R += 8;
				var eE = e(K);
				K.EE = eE;
				console.log("Version", eE);
				K.yE = eE < 600 ? 16 : 32
			} else if (jq.AN == "DISP") {} else if (jq.AN == "LIST" && jq.az == "cmpr") {
				var e8 = M(K),
					aI = M(K),
					dK = M(K),
					jC = M(K),
					d7 = new Uint8Array(K.data.buffer, K.R + 8 + 2, e8 - 6 - 8),
					ka = pako.inflateRaw(d7),
					gq = 0;
				K.R += e8;
				d7 = new Uint8Array(K.data.buffer, K.R + 8 + 2);
				var hS = pako.inflateRaw(d7),
					eH = [];
				for (var kA = 0; kA < hS.length; kA += 4) eH.push(X.Lv(hS, kA));
				jq.sub = [];
				while (gq < ka.length) {
					var hb = RiffChunkParser.xw(ka, gq, eH);
					gq = hb.R + hb.size;
					jq.sub.push(hb)
				}
				var ex = {
					data: ka,
					R: 0,
					EE: hn,
					yE: K.yE
				};
				H(ka, ex, u, bC, jq.sub, $ + 1)
			} else if (jq.AN == "LIST" && jq.az == "stlt" || jq.AN == "stlt") {
				if (gX == 4294967295) return;
				var fs = K.R,
					ip = 32;
				jq.Z = {};
				var f_ = M(K);
				if (f_ == 0) return;
				jq.Z.ae6 = v(K, hn >= 1300);
				jq.Z.akA = v(K);
				jq.Z.ajV = {};
				var bD = M(K);
				for (var A = 0; A < bD; A++) {
					var ae = M(K);
					K.R += hn < 1e3 ? 12 : 20;
					var em = e(K),
						dY = e(K);
					K.R += 8;
					var f7 = F(K);
					K.R += hn < 1e3 ? 12 : 20;
					jq.Z.ajV[ae] = {
						aus: em,
						av4: dY,
						fontSize: f7
					}
				}
				jq.Z.ay_ = v(K);
				var bM = M(K);
				K.R += 52 * bM;
				var iP = M(K);
				K.R += 152 * iP;
				var jp = M(K);
				K.R += 784 * jp;
				var hG = M(K);
				for (var A = 0; A < hG; A++) {
					K.R += 40;
					if (hn > 1300) K.R += 4;
					if (hn >= 1300) {
						if (M(K)) K.R += 68;
						else K.R += 12
					} else {
						K.R += 20;
						if (hn >= 1e3) K.R += 8;
						if (M(K)) K.R += 8;
						K.R += 8
					}
				}
				var hf = M(K);
				jq.Z.aeJ = {};
				for (var A = 0; A < hf; A++) {
					var d2 = M(K),
						gu = {};
					K.R += 12;
					gu.right = F(K);
					gu.afH = F(K);
					gu.left = F(K);
					jq.Z.aeJ[d2] = gu
				}
				var jt = M(K);
				if (hn >= 1300) ip += 4;
				K.R += ip * jt;
				var aQ = M(K);
				K.R += 28 * aQ;
				if (hn > 800) {
					var iL = M(K);
					K.R += 12 * iL
				}
				jq.Z.Pr = {};
				for (var A = 0; A < f_; A++) {
					var jx = M(K),
						ep = M(K),
						gz = {};
					gz.Ss = M(K);
					K.R += 8;
					var ed = M(K);
					if (hn >= 1200) ed *= 2;
					K.R += ed;
					gz.ajC = M(K);
					gz.ane = M(K);
					if (jx > 1) {
						gz.a9$ = M(K);
						gz.a29 = M(K);
						gz.asN = M(K);
						gz.a0o = M(K);
						if (hn > 800) gz.a4D = M(K)
					}
					if (jx > 2) {
						gz.arB = M(K);
						gz.af7 = M(K);
						gz.afF = M(K);
						gz.aAw = M(K);
						gz.a9_ = M(K)
					}
					jq.Z.Pr[ep] = gz
				}
			} else if (jq.AN == "LIST") H(x, K, u, bC, jq.sub, $ + 1);
			else if (jq.AN == "txsm") {
				jq.Z = {};
				if (hn < 600) throw "e";
				if (hn < 700) throw "e";
				if (hn >= 1600) {
					jq.Z = c(K);
					return
				}
				if (hn >= 1500) K.R += 37;
				else K.R += 36;
				if (M(K)) {
					if (hn < 800) K.R += 32
				}
				if (hn < 800) K.R += 4;
				jq.Z.akI = M(K);
				jq.Z.fd = [];
				K.R += 48;
				if (hn >= 800) {
					if (M(K)) {
						K.R += 32;
						if (hn >= 1300) K.R += 8
					}
				}
				if (hn >= 1500) K.R += 12;
				var jx = M(K),
					bo = 1,
					d0 = !1;
				if (!jx) {
					if (hn >= 800) K.R += 4;
					if (hn > 800) K.R += 2;
					if (hn >= 1400) K.R += 2;
					K.R += 24;
					if (hn < 800) K.R += 8;
					bo = M(K)
				}
				for (var kA = 0; kA < bo; kA++) {
					var c0 = M(K),
						A = 0;
					if (hn >= 1300 && jx) K.R++;
					K.R++;
					var f_ = M(K),
						cv = [];
					for (A = 0; A < f_; A++) {
						var iH = y(K),
							gg = 0;
						y(K);
						var bS = y(K);
						if (hn >= 800) gg = y(K);
						var gz = {};
						if (bS & 1) {
							gz.aus = e(K);
							var bG = e(K);
							if (bG) gz.axY = bG
						}
						if (bS & 2) K.R += 4;
						if (bS & 4) gz.a2k = F(K);
						if (bS & 8) K.R += 4;
						if (bS & 16) K.R += 4;
						if (bS & 32) K.R += 4;
						if (bS & 64) {
							gz.ajC = M(K);
							if (hn >= 1500) K.R += 48
						}
						if (bS & 128) {
							gz.ane = M(K)
						}
						if (gg & 8) {
							if (hn >= 1300) {
								var jj = M(K);
								if (K.R + jj * 2 >= K.data.length) {
									d0 = !0;
									break
								}
								K.R += jj * 2
							} else K.R += 4
						}
						if (gg & 32) {
							var ay = y(K);
							if (ay) K.R += 52
						}
						if (iH == 2)
							if (hn >= 1300) K.R += 48;
						cv.push(gz)
					}
					if (d0) {
						break
					}
					var cH = M(K);
					if (K.R + cH * 4 > K.data.length) break;
					var e6 = [];
					for (A = 0; A < cH; A++) {
						var fi = 0;
						if (hn >= 1200) fi = R(K) & 4294967295;
						else fi = M(K);
						e6[A] = fi >> 16 | fi & 1
					}
					var et = cH;
					if (hn >= 1200) et = M(K);
					var aD = T(K);
					jq.Z.fd.push({
						a3k: c0,
						text: aD,
						Pr: cv
					})
				}
			} else if (jq.AN == "arrw") jq.Z = W(K);
			else if (jq.AN == "font") {
				var c7 = K.R,
					ga = e(K),
					cY = e(K),
					i4 = "";
				K.R += 14;
				if (K.EE >= 1200) i4 = j(K);
				else i4 = T(K);
				jq.Z = {
					id: ga,
					aqn: cY,
					name: i4
				};
				if (bC) {
					var jS = c7 + _;
					while (K.data[K.R] == 0) K.R++;
					K.R += 2;
					var e7 = j(K);
					while (K.data[K.R] == 0) K.R++;
					while (K.data[K.R] <= 2) K.R += 4;
					jq.Z.Ot = j(K)
				}
			} else if (["IKEY", "ICMT", "pfrd", "bcfg"].indexOf(jq.AN) != -1) {} else if (jq.AN == "flgs") jq.Z = M(K);
			else if (jq.AN == "bbox") {
				var ct = F(K),
					bj = F(K),
					jo = F(K),
					er = F(K);
				jq.Z = new Rect(ct, bj, jo - ct, er - bj)
			} else if (jq.AN == "fild") {
				var iV = M(K),
					i2;
				if (hn >= 1300) K.R += 8;
				var h_ = e(K);
				if (h_ == 0) {} else if (h_ == 1) {
					K.R += hn >= 1300 ? 13 : 2;
					i2 = S(K)
				} else if (h_ == 2) {
					K.R += hn >= 1300 ? 8 : 2;
					var kj = y(K),
						a3 = 0;
					if (hn >= 1300) {
						K.R += 17;
						a3 = J(K)
					} else if (hn >= 600) {
						K.R += 19;
						a3 = n(K)
					} else {
						K.R += 11;
						a3 = J(K)
					}
					var ke = Y(K),
						b1 = .5 + q(K),
						fb = .5 + q(K) - .5;
					if (hn >= 600) K.R += 2;
					var eg = D(K) & 255,
						gK = y(K) / 100;
					K.R++;
					var cN = D(K) & 65535;
					if (hn >= 1300) K.R += 3;
					var iO = [];
					for (var A = 0; A < cN; A++) {
						var b6 = S(K);
						if (hn >= 1400) K.R += 26;
						else if (hn >= 1300) K.R += 5;
						var j7 = (D(K) & 65535) / 100;
						if (hn >= 1300) K.R += 3;
						iO.push([j7, b6])
					}
					i2 = {
						typ: kj == 1 ? "lin" : "rad",
						crds: [b1 - Math.cos(ke) / 2, fb - Math.sin(ke) / 2, b1, fb],
						grad: iO,
						mat: [1, 0, 0, 1, 0, 0]
					}
				} else console.log("Unknown fill type", h_);
				jq.Z = {
					id: iV,
					type: h_,
					Z: i2
				}
			} else if (jq.AN == "outl") {
				var iM = M(K);
				if (hn >= 1300) {
					var jr = 0,
						bH = 0;
					while (jr != 1) {
						K.R += bH;
						jr = M(K);
						bH = M(K)
					}
				}
				var gi = e(K),
					cj = e(K),
					iA = e(K);
				if (hn < 1300 && hn >= 600) K.R += 2;
				var g9 = F(K),
					h1 = e(K) / 100;
				if (hn >= 600) K.R += 2;
				var a0 = Y(K);
				if (hn >= 1300) K.R += 46;
				else if (hn >= 600) K.R += 52;
				var i2 = S(K);
				if (hn < 600) K.R += 10;
				else K.R += 16;
				var g5 = e(K),
					dj = K.R,
					ef = [];
				for (var A = 0; A < g5; ++A) ef.push(e(K));
				if (hn < 600) K.R = dj + 20;
				else K.R = dj + 22;
				var jA = M(K),
					jb = M(K);
				jq.Z = {
					id: iM,
					ahY: gi,
					a5G: cj,
					a7K: iA,
					lineWidth: g9,
					color: i2,
					z9: ef,
					aiu: jA,
					arz: jb
				}
			} else if (jq.AN == "mcfg") {
				if (1300 <= hn) K.R += 12;
				else if (900 <= hn) K.R += 4;
				else if (600 <= hn && hn < 700) K.R += 28;
				var jv = 0,
					cz = 0;
				if (hn < 400) {
					K.R += 2;
					var ct = F(K),
						bj = F(K),
						jo = F(K),
						er = F(K);
					jv = Math.abs(jo - ct);
					cz = Math.abs(er - bj)
				} else {
					jv = F(K);
					cz = F(K)
				}
				jq.Z = {
					az8: new Point2D(jv, cz)
				}
			} else if (jq.AN == "loda" || jq.AN == "lobj") {
				var fs = K.R,
					fB = D(K),
					eC = D(K),
					iW = D(K),
					jf = D(K),
					f9 = D(K),
					iC = [],
					fP = [],
					A = 0,
					at = null;
				K.R = fs + iW;
				while (A < eC) iC[A++] = D(K);
				K.R = fs + jf;
				while (A > 0) fP[--A] = D(K);
				jq.Z = {};
				for (A = 0; A < eC; A++) {
					K.R = fs + iC[A];
					var cg = fP[A];
					if (cg == 30) {
						if (hn >= 400 && f9 == 1 || hn < 400 && f9 == 0) {
							jq.Z.path = p(K)
						} else if (hn >= 400 && f9 == 2 || hn < 400 && f9 == 1) {
							jq.Z.path = m(K)
						} else if (hn >= 400 && f9 == 3 || hn < 400 && f9 == 2) {
							jq.Z.path = C(K)
						} else if (f9 == 37) {
							jq.Z.path = P(K)
						} else if (hn >= 400 && f9 == 4 || hn < 400 && f9 == 3) {
							jq.Z.aqK = i(K)
						} else if (hn >= 400 && f9 == 6 || hn < 400 && f9 == 5) {
							jq.Z.awB = z(K)
						} else console.log(f9)
					} else if (cg == 20) {
						if (hn < 400) jq.Z.a4o = B(K);
						else jq.Z.a7p = M(K)
					} else if (cg == 10) {
						if (hn < 400) jq.Z.akV = a(K);
						else jq.Z.a4m = M(K)
					} else if (cg == 200) jq.Z.aAg = D(K);
					else if (cg == 100) {
						if (hn < 400) at = Z(K)
					}
				}
				if (at && jq.Z.path) PixelUtil.vec.transformCoords(jq.Z.path.C, at, jq.Z.path.C)
			} else if (jq.AN == "trfd") {
				var fs = K.R,
					fB = D(K),
					eC = D(K),
					iW = D(K);
				K.R = fs + iW;
				var iC = [];
				for (var A = 0; A < eC; A++) iC[A] = D(K);
				for (var A = 0; A < eC; A++) {
					K.R = fs + iC[A];
					if (hn >= 1300) K.R += 8;
					var ac = e(K);
					if (ac == 8) {
						var j$, bw, ct, ca, fX, bj;
						if (hn >= 600) K.R += 6;
						if (hn >= 500) {
							j$ = r(K);
							bw = r(K);
							ct = r(K) / (hn < 600 ? 1e3 : 254e3);
							ca = r(K);
							fX = r(K);
							bj = r(K) / (hn < 600 ? 1e3 : 254e3)
						} else throw "e";
						jq.lV = new Matrix2D(j$, ca, bw, fX, ct, bj)
					} else console.log(ac)
				}
			} else if (!1) {
				console.log(jq);
				var bb = Math.min(jq.size, 32);
				console.log(X.Ly(x, jq.R, bb));
				console.log(X.aAs(x, jq.R, bb))
			}
		}
	}

	function W(x) {
		var K = M(x);
		x.R += 4;
		var u = e(x);
		x.R += 4;
		var bC = [];
		for (var O = 0; O < u; O++) bC.push(y(x));
		x.R += 1;
		var $ = [];
		for (var gX = 0; gX < u; gX++) {
			var _ = [];
			_[1] = F(x);
			_[0] = F(x);
			$.push(_)
		}
		var jI = L($, bC);
		G[K] = jI
	}

	function Z(x) {
		var K = 0,
			u = 0,
			bC = 0,
			O = 0,
			$ = 0,
			gX = 0;
		if (x.EE >= 300) {
			var _ = x.R;
			x.R += 10;
			var jI = D(x);
			x.R = _ + jI;
			K = g(x);
			u = g(x);
			bC = n(x) / 1e3;
			O = g(x);
			$ = g(x);
			gX = n(x) / 1e3
		} else {
			bC = F(x);
			gX = F(x);
			K = g(x);
			u = g(x);
			bC += g(x) / 1e3;
			O = g(x);
			$ = g(x);
			gX += g(x) / 1e3
		}
		return new Matrix2D(K, u, O, $, bC, gX)
	}

	function B(x) {
		var K = y(x);
		if (K == 0) return null;
		else if (K == 1) return S(x);
		else console.log(K)
	}

	function a(x) {
		var K = y(x);
		K <<= 1;
		var u = F(x),
			bC = e(x) / 100,
			O = Y(x),
			$ = S(x);
		return {
			ahY: K,
			lineWidth: u,
			color: $,
			z9: [],
			aiu: 0,
			arz: 0
		}
	}

	function m(x) {
		var K = F(x),
			u = F(x),
			bC = Y(x),
			O = Y(x),
			$ = PixelUtil.vec.pathFromSvg(PixelUtil.path.shapes.ellipse(0, 0, K, u));
		return $
	}

	function p(x) {
		var K = x.EE,
			u = k(x),
			bC = k(x),
			O = 0,
			$ = 0,
			gX = 0,
			_ = 0,
			jI = 0,
			iw = 1,
			hn = 1;
		if (K < 1500) {
			_ = k(x);
			gX = K < 900 ? _ : k(x);
			$ = K < 900 ? _ : k(x);
			O = K < 900 ? _ : k(x)
		} else {
			var jq = r(x);
			if (jq != 0) iw = jq;
			jq = r(x);
			if (jq != 0) hn = jq;
			var iv = y(x);
			x.R += 7;
			if (iv == 0) {
				_ = r(x);
				jI = y(x);
				x.R += 15;
				gX = r(x);
				x.R += 16;
				$ = r(x);
				x.R += 16;
				O = r(x);
				var kq = Math.abs(u * iw / 2),
					eE = Math.abs(bC * hn / 2);
				_ *= kq < eE ? kq : eE;
				gX *= kq < eE ? kq : eE;
				$ *= kq < eE ? kq : eE;
				O *= kq < eE ? kq : eE
			} else {
				_ = k(x);
				jI = y(x);
				x.R += 15;
				gX = k(x);
				x.R += 16;
				$ = k(x);
				x.R += 16;
				O = k(x)
			}
		}
		return PixelUtil.vec.pathFromSvg(PixelUtil.path.shapes.rect(0, 0, u, bC, [O, $, gX, _]))
	}

	function c(x) {
		var K = M(x),
			bC = 0;
		x.R += 37;
		var u = M(x);
		for (var A = 0; A < u; A++) {
			var O = M(x);
			bC = O;
			x.R += 48;
			var $ = M(x);
			if ($ == 1) x.R += 12 * 4;
			else x.R += 8;
			if (!K) {
				x.R += 16;
				var gX = M(x);
				if (x.EE > 1600) x.R += gX;
				else x.R += gX * 2
			}
		}
		var _ = {
				akI: bC,
				fd: []
			},
			jI = M(x);
		for (var iw = 0; iw < jI; iw++) {
			var hn = M(x),
				kA = "";
			x.R += 1;
			if (K) x.R += 1;
			var jq = M(x);
			if (x.EE < 1700) jq *= 2;
			var iv = X.Ko(x.data, x.R, jq);
			x.R += jq;
			var kq = M(x);
			for (var A = 0; A < kq; A++) {
				x.R += 2;
				var eE = e(x),
					e8 = e(x);
				if (e8 & 4) {
					var aI = M(x);
					aI *= 2;
					x.R += aI
				}
				if (eE || e8 & 4) {
					var dK = M(x);
					if (x.EE < 1700) dK *= 2;
					var jC = X.Ko(x.data, x.R, dK);
					x.R += dK
				}
			}
			var d7 = M(x),
				ka = [];
			for (var A = 0; A < d7; A++) {
				var hS = R(x) & 4294967295;
				ka[A] = hS >> 16 | hS & 1
			}
			var eH = M(x);
			for (var A = 0; A < d7; A++) {
				var gq = ka[A],
					hb = 0;
				if (gq == 0 || gq == 2 || gq == 4 || gq == 6) hb = x.data[x.R++];
				else if (gq == 1 || gq == 3) hb = x.data[x.R++] + x.data[x.R++] * 256;
				else throw gq;
				kA += String.fromCharCode(hb)
			}
			var ex = kA.split("\r");
			for (var A = 0; A < ex.length; A++) _.fd.push({
				text: ex[A],
				a3k: hn,
				Pr: []
			})
		}
		return _
	}

	function v(x, K) {
		var u = {},
			bC = M(x);
		for (var A = 0; A < bC; A++) {
			var O = M(x);
			x.R += 4;
			var $ = M(x);
			u[O] = $;
			if (K) x.R += 48
		}
		return u
	}

	function i(x) {
		var K = F(x),
			u = F(x);
		return new Point2D(K, u)
	}

	function z(x) {
		x.R += 4;
		var K = F(x),
			u = F(x);
		return new Point2D(K, u)
	}

	function P(x) {
		x.R += 4;
		var K = e(x) + e(x);
		x.R += 16;
		var u = h(x, K);
		return u
	}

	function C(x) {
		var K = e(x);
		x.R += 2;
		return h(x, K)
	}

	function h(x, K) {
		var u = [],
			bC = [];
		for (var A = 0; A < K; A++) u.push([F(x), F(x)]);
		for (var A = 0; A < K; A++) bC.push(y(x));
		return L(u, bC)
	}

	function L(x, K) {
		var u = {
				C: [],
				F: []
			},
			bC = 0,
			O = 0,
			$ = 0;
		for (var A = 0; A < x.length; A++) {
			var bC = x[A][0],
				O = x[A][1],
				gX = K[A];
			if (!(gX & 64) && !(gX & 128)) {
				u.C.push(bC, O);
				u.F.push("M");
				$ += 2
			} else if (gX & 64 && !(gX & 128)) {
				u.C.push(bC, O);
				u.F.push("L");
				$ += 2
			} else if (!(gX & 64) && gX & 128) {
				u.C.push(bC, O);
				u.F.push("C");
				$ += 6
			} else if (gX & 64 && gX & 128) {
				u.C.push(bC, O)
			}
		}
		if ($ != u.C.length) throw "e";
		return u
	}

	function U(x, K) {
		var u = X.Lv;
		K += 8;
		var bC = u(x, K);
		K += 4;
		var O = u(x, K);
		K += 4;
		K += 4 * 7;
		var $ = K,
			gX = PixelUtil.allocBytes(bC * O * 4);
		K += 1024;
		for (var _ = 0; _ < O; _++)
			for (var jI = 0; jI < bC; jI++) {
				var A = _ * bC + jI,
					iw = (O - _ - 1) * bC + jI,
					hn = x[K + A] << 2,
					jq = iw << 2;
				gX[jq + 0] = x[$ + hn + 2];
				gX[jq + 1] = x[$ + hn + 1];
				gX[jq + 2] = x[$ + hn + 0];
				gX[jq + 3] = 255
			}
		return {
			QI: gX,
			rect: new Rect(0, 0, bC, O)
		}
	}

	function S(x) {
		var K = x.EE,
			u = 0,
			bC = 0,
			O = 0;
		if (K >= 500) {
			u = e(x);
			if (u == 1 && K >= 1300) u = 25;
			if (u == 30) {
				u = 25;
				bC = 30
			} else {
				bC = e(x);
				x.R += 4
			}
			O = M(x)
		} else if (K >= 400) throw "e";
		else {
			u = y(x);
			O = M(x)
		}
		return E(u, bC, O)
	}

	function E(x, K, u) {
		var bC = [0, 0, 0];
		if (x == 2 || x == 3 || x == 9 || x == 17) {
			var O = [u >>> 0 & 255, u >>> 8 & 255, u >>> 16 & 255, u >>> 24 & 255];
			if (x == 2)
				for (var A = 0; A < 4; A++) O[A] = Math.round(255 * O[A] / 100);
			for (var A = 0; A < 4; A++) O[A] /= 255;
			bC = UDOC.Color.cmykToRgb(O)
		} else if (x == 1 || x == 5) {
			bC = [u >>> 0 & 255, u >>> 8 & 255, u >>> 16 & 255];
			for (var A = 0; A < 3; A++) bC[A] = bC[A] / 255;
			if (x == 5) bC.reverse()
		} else console.log("Unknown color model " + x, u, u.toString(16));
		return bC
	}
	return {
		Cd: b
	}
}(),
k4 = function() {
	var l, d, G = new ArrayBuffer(4),
		b = new Uint8Array(G),
		V = new Uint32Array(G),
		Q = new Float32Array(G);

	function t(J, n) {
		for (var r = 0; r < J.length; r++)
			if (J[r][0] == n) return J[r]
	}

	function I() {
		var J = 0,
			n = 0,
			r = 0;
		do {
			r = l[d++];
			J |= (r & 127) << n;
			n += 7
		} while (r & 128 && n < 35);
		return J >>> 0
	}

	function y(J, n, r, T, j) {
		l = J;
		d = n;
		var g = T[0] == "mesg",
			Y = T[2],
			k = {},
			F = 1,
			D = g ? 1e9 : Y.length;
		while (F <= D) {
			var q = F;
			if (g) {
				q = I();
				if (q == 0) break
			}
			var H = t(Y, q),
				W = H[2],
				Z = H[1] == 1,
				B = Z ? I() : 1,
				a = new Array(B);
			if (W == 3) {
				if (!Z) throw "e";
				a = l.slice(d, d + B);
				d += B
			} else
				for (var A = 0; A < B; A++) {
					var m;
					if ((W & 1) == 1) {
						if (W == 1) m = l[d++] == 1;
						else if (W == 3) m = l[d++];
						else if (W == 5) {
							var p = I();
							m = p & 1 ? ~(p >>> 1) : p >>> 1
						} else if (W == 7) m = I();
						else if (W == 9) {
							if (l[d] == 0) {
								m = 0;
								d++
							} else {
								b[0] = l[d];
								b[1] = l[d + 1];
								b[2] = l[d + 2];
								b[3] = l[d + 3];
								var c = V[0];
								V[0] = c << 23 | c >>> 9;
								m = Q[0];
								d += 4
							}
						} else if (W == 11) {
							var v = e(l, d);
							m = v[0];
							d += v[1] + 1
						} else throw W
					} else {
						var i = r[W >>> 1];
						if (i[0] == "enum") {
							var z = l[d++];
							if (z > 127) throw "e";
							m = i[2][z]
						} else {
							var P = y(l, d, r, i, j + 1);
							m = P[0];
							d = P[1]
						}
					}
					a[A] = m
				}
			k[H[3]] = Z ? a : a[0];
			F++
		}
		return [k, d]
	}

	function e(J, n) {
		var r = n;
		while (J[r] != 0) r++;
		return [X.Kw(J, n, r - n), r - n]
	}

	function M(J, n) {
		var r = n;
		while (J[r] != 0) r++;
		for (var A = n; A < r; A++)
			if (J[A] > 127) throw "e";
		return X.Ko(J, n, r - n)
	}

	function R(J) {
		l = J;
		d = 1;
		var n = [];
		while (d < J.length) {
			var r = d,
				T = n.length,
				j = M(J, d);
			d += j.length + 1;
			var g = I();
			if (g > 2) throw "e";
			var Y = I(),
				k = [];
			for (var A = 0; A < Y; A++) {
				var F = M(J, d);
				d += F.length + 1;
				var D = I(),
					q = I(),
					H = I();
				k.push(g == 0 ? F : [H, q, D, F])
			}
			n.push([
				["enum", "strc", "mesg"][g], j, k
			])
		}
		return n
	}
	return {
		a2X: R,
		aaU: y
	}
}();

// Figma .fig file parser namespace
function fm() {}
fm.Cd = function(l, d) {
var G = new Uint8Array(l),
	b = 8,
	V, M = 0,
	z = 0;
if (G[0] == 80 && G[1] == 75) {
	V = UZIP.parse(l);
	G = V["canvas.fig"]
}
var Q = X.Lv(G, b);
b += 4;
var t = [];
while (b < G.length) {
	var I = X.Lv(G, b);
	b += 4;
	var y = G.slice(b, b + I);
	if (G[b] == 137 && G[b + 1] == 80) {} else y = UZIP.inflateRaw(y);
	t.push(y);
	b += I
}
var e = k4.a2X(t[0]);
for (var A = 0; A < e.length; A++)
	if (e[A][1] == "Message") M = A;
var R = k4.aaU(t[1], 0, e, e[M], 0)[0],
	J = {
		b5: {},
		rx: {},
		apW: {},
		kh: V
	},
	n = R.nodeChanges;
for (var r = 0; r < n.length; r++) {
	var T = n[r],
		j = T.guid;
	J.rx[j.sessionID + "," + j.localID] = T
}
for (var r = 0; r < n.length; r++) {
	var T = n[r],
		j = T.parentIndex;
	if (j) {
		var g = fm.p2(J.rx, j.guid);
		if (g.children == null) g.children = [];
		g.children.push(T)
	}
}
var Y = n[0],
	k = Y.children,
	F = new Rect,
	D = [],
	q = [];
for (var j = 0; j < k.length; j++) {
	var H = k[j],
		W = H.children;
	if (H.name == "Internal Only Canvas" || W == null) continue;
	var Z = new Rect;
	for (var A = 0; A < W.length; A++) {
		var B = W[A],
			a = B.transform,
			m = B.size;
		if (a.m00 == 1 && a.m10 == 0 && a.m01 == 0 && a.m11 == 1) {
			var p = new Rect(a.m02, a.m12, m.x, m.y);
			Z = Z.Cw(p)
		}
	}
	var c = F.n == 0 ? 0 : F.n + 100,
		v = Z.clone();
	v.x = 0;
	v.y = c;
	F = F.Cw(v);
	D[j] = Z;
	q[j] = c
}
var i = kf.t2(new Rect(0, 0, F.m, F.n), 8192 * 8192);
d.m = Math.round(F.m / i);
d.n = Math.round(F.n / i);
d.buffer = PixelUtil.allocBytes(d.m * d.n * 4);
for (var j = 0; j < k.length; j++) {
	var H = k[j],
		W = H.children;
	if (H.name == "Internal Only Canvas" || W == null) continue;
	W.sort(fm.as7);
	var P = new Matrix2D(1, 0, 0, 1, -D[j].x, q[j] - D[j].y);
	P.scale(1 / i, 1 / i);
	for (var A = 0; A < W.length; A++) {
		var B = W[A];
		fm.kU(B, [], P, R.blobs, d, 0, J);
		z++
	}
}
d._8(z);
d.ya = !0;
if (i != 1) alert("File scaled down " + i + "x")
};
fm.kU = function(l, d, G, b, V, Q, t) {
var I = fm,
	B = !1,
	a, c, v, i;
d = JSON.parse(JSON.stringify(d));
var y = l.overrideKey ? l.overrideKey : l.guid;
for (var A = 0; A < d.length; A++) {
	var e = d[A],
		M = e.guidPath.guids;
	if (I.ajG(M[0], y)) {
		if (M.length == 1) {
			var R = {};
			for (var J in l) R[J] = e[J] != null ? e[J] : l[J];
			l = R
		} else e.guidPath.guids = M.slice(1)
	}
}
var n = l.type,
	r = l.children,
	T = l.size,
	j = l.effects,
	g = V.V4();
g.tH(l.name);
g.Oj(l.visible);
g.opacity = Math.round(l.opacity * 255);
var Y = I.Aw(l.transform),
	k = Y.clone();
k.concat(G);
if (T == null) T = {
	x: 0,
	y: 0
};
var F = new Rect(Math.round(k.cI), Math.round(k.xu), Math.round(T.x * k.Nw()), Math.round(T.y * k.Nw()));
if (F.m == 0 || isNaN(F.m)) F.m = 100;
if (F.n == 0 || isNaN(F.n)) F.n = 100;
var D = l.fillPaints,
	q = l.inheritFillStyleID;
if (q) {
	var R = I.p2(t.rx, q);
	if (R) D = R.fillPaints
}
if (D == null) D = [];
var D = I.aqT(D),
	H = D[0],
	W = l.strokePaints,
	q = l.inheritFillStyleIDForStroke;
if (q) {
	var R = I.p2(t.rx, q);
	if (R) W = R.fillPaints
}
if (W == null) W = [];
var W = I.aqT(W),
	Z = "BOOLEAN_OPERATION LINE RECTANGLE ROUNDED_RECTANGLE ELLIPSE VECTOR REGULAR_POLYGON STAR".split(" ").indexOf(n) != -1;
if (Z || n == "FRAME") {
	a = new LayerRecord.VectorMask;
	I.a0m(l, b, a);
	B = PixelUtil.path.Bi(a.i);
	PixelUtil.path.transformFlatCoords(a.i, k);
	var m = PixelUtil.vec.f1(PixelUtil.path.oh(a.i));
	if (!m.W6()) F = m;
	if (t.b5.N4 && H) {
		var p = LayerRecord.VectorMask.FT(t.b5.N4.i);
		for (var A = 2; A < p.length; A++)
			if (p[A].H$ != null) p[A].H$ = 3;
		a.i = a.i.concat(p.slice(2))
	}
}
if (H && H.type == "IMAGE") {
	i = H.imageScaleMode;
	c = I.LT(b, fm.Or(H), t);
	var z = c.uA.m / c.uA.n,
		P = T.x / T.y;
	v = Math.abs(z - P)
}
if (n == "FRAME") {} else if (Z && B && c && (i == "FIT" || i == "FILL" && v <= .05)) {
	var C = I.LT(b, fm.Or(H), t, !0),
		h = V.rM(C, g.getName(), 0, 0);
	h.layerFlags = g.layerFlags;
	h.opacity = g.opacity;
	g = h;
	var L = new Rect(0, 0, T.x, T.y);
	if (i == "FIT") {
		var U = c.uA.m,
			S = c.uA.n,
			E = Math.min(T.x / U, T.y / S),
			x = U * E,
			K = S * E;
		L = new Rect(L.x + (L.m - x) / 2, L.y + (L.n - K) / 2, x, K)
	}
	var u = PixelUtil.vec.simplifyPath(L).C;
	PixelUtil.vec.transformCoords(u, k, u);
	g.add.SoLd.Trnf = f.NH.gx(u);
	g.add.SoLd.nonAffineTransform = f.NH.gx(u);
	var bC = [],
		j = l.effects,
		O = H.paintFilter;
	if (j)
		for (var A = 0; A < j.length; A++)
			if (j[A].type == "FOREGROUND_BLUR") {
				var $ = j[A],
					gX = FilterHelper.bO("GsnB", {});
				bC.push(gX);
				gX.v.enab.v = $.visible;
				gX.v.Fltr.v.Rds.v.val = $.radius / 2.4
			}
	if (O && O.exposure != 0) {
		var gX = FilterHelper.bO("brit", {});
		bC.push(gX);
		gX.v.Fltr.v.Brgh.v = Math.round(O.exposure * 160);
		gX.v.Fltr.v.useLegacy.v = !0
	}
	if (O && O.vibrance != 0) {
		var gX = FilterHelper.bO("vibA", {});
		bC.push(gX);
		console.log(gX);
		gX.v.Fltr.v.Strt.v = Math.round(Math.round(O.vibrance * 100))
	}
	if (bC.length != 0) {
		g.add.SoLd.filterFX = FilterHelper.A8();
		V.p_({
			id: g.add.SoLd.placed.v,
			rect: new Rect,
			buffer: PixelUtil.allocBytes(1),
			z: new LayerRecord.LayerMask
		});
		g.add.SoLd.filterFX.v.filterFXList.v = bC
	}
	g.kX(V, !1);
	I.a4w(t, g, V)
} else if (Z) {
	I.acs(g, a, l, H, W, k, F, b, V, t);
	if (j)
		for (var A = 0; A < j.length; A++) {
			var $ = j[A];
			if ($.type != "FOREGROUND_BLUR") continue;
			a.Vx = $.radius / 2.4
		}
	g.Ba();
	g.QJ(V)
} else if (n == "TEXT") {
	var _ = l.textData,
		jI = _.layoutSize,
		iw = ["LEFT", "RIGHT", "CENTER"].indexOf(l.textAlignHorizontal);
	g.add.lnsr = "rend";
	g.add.TySh = dt.Iu(0, 0);
	g.add.TySh.xZ = new Rect(0, 0, 100, 100);
	var hn = k.clone();
	g.add.TySh.D = hn;
	var jq = g.add.TySh.zC,
		iv = _.characters;
	if (l.textCase == "TITLE") {
		for (var A = 0; A < iv.length; A++)
			if (A == 0 || iv[A - 1] == " ") {
				var kq = iv.slice(0, A),
					eE = iv.slice(A + 1);
				iv = kq + iv[A].toUpperCase() + eE
			}
	}
	iv = iv.replace(/\u2028/g, "\n");
	iv = iv.replace(/\u2029/g, "\n");
	iv = iv.replace(/\r\n/g, " \n");
	dt.sT(jq, 0, iv);
	var e8 = l.textAutoResize,
		aI = _.baselines;
	if (e8 == "WIDTH_AND_HEIGHT") {
		var dK = iw == 0 ? 0 : iw == 1 ? jI.x : jI.x / 2,
			jC = aI ? aI[0].position.y : 0;
		hn.translate(dK * k.Nw(), jC * k.Nw());
		dt.AO(jq, 0)
	} else if (e8 == "HEIGHT" || e8 == "NONE" || e8 == null) {
		var jC = aI ? aI[0].position.y - l.fontSize * .7 : 0;
		hn.translate(0, jC * k.Nw());
		dt.AO(jq, 1);
		dt.mt(jq, [0, 0, Math.round(jI.x), Math.round((e8 == "NONE" ? 1.8 : 1) * jI.y)])
	} else throw e8;
	if (iv != "") {
		var d7 = dt.Au(jq, 0, 1);
		I.asU(l, k, T, d7, g, b, V, t);
		dt.rW(jq, 0, iv.length, d7);
		var ka = _.characterStyleIDs,
			hS = _.styleOverrideTable;
		if (ka) {
			ka = ka.slice(0);
			for (var A = 0; A < ka.length; A++)
				if (iv[A] == "\n") ka[A] = -A - 1;
			var eH = [0],
				kA = 0,
				gq = 0;
			for (var A = 0; A < ka.length; A++) {
				gq++;
				var hb = ka[A];
				if (A == 0 || hb == ka[A - 1]) {} else {
					eH.push(gq - 1, A);
					gq = 1
				}
			}
			eH.push(gq);
			for (var A = 0; A < eH.length; A += 2) {
				var ex = eH[A],
					fs = eH[A + 1];
				if (iv[ex] == "\n") continue;
				var hb = ka[ex];
				if (hb != 0) {
					var f_;
					for (var bD = 0; bD < hS.length; bD++)
						if (hS[bD].styleID == hb) f_ = hS[bD];
					var d7 = dt.Au(jq, ex, ex + 1);
					I.asU(f_, k, T, d7, g, b, V, t);
					dt.rW(jq, ex, ex + fs - 1, d7)
				}
			}
		}
	}
} else if (n == "SYMBOL") {} else if (n == "INSTANCE") {
	var ae = l.symbolData,
		em = ae.symbolOverrides,
		R = I.p2(t.rx, ae.symbolID);
	if (R) r = R.children;
	else console.log(l.name, "symbol not found", ae.symbolID);
	d = d.slice(0);
	for (var A = 0; A < em.length; A++) d.push(em[A])
} else console.log(n);
if (!1) {} else if (r && !Z) {
	V.B.push(V.En());
	var dY = !1,
		f7 = Q == 0 && n != "SYMBOL" && n != "INSTANCE";
	if (f7) {
		if (F.W6()) console.log(F);
		g.P3(F)
	}
	H = D[D.length - 1];
	if (f7 && H && H.type == "SOLID") {
		var bM = H.color;
		g.add.artb.artboardBackgroundType.v = 4;
		g.add.artb.Clr = I.eq(bM)
	} else if ((H || W[0]) && a) {
		var iP = V.V4();
		iP.tH("Background");
		I.acs(iP, a, l, H, W, k, F, b, V, t);
		iP.Ba();
		iP.QJ(V);
		V.B.push(iP);
		dY = !0
	}
	r.sort(I.as7);
	var jp = t.b5;
	t.b5 = {};
	for (var hG = 0; hG < r.length; hG++) I.kU(r[hG], d, k, b, V, Q + 1, t);
	t.b5 = jp;
	g.add.lsct = !1 ? LayerSectionType.open : LayerSectionType.closed;
	g.blendModeKey = "pass";
	var hf = g.zD();
	g.layerFlags = 24;
	g.Oj(hf);
	var d2 = Q != 0 && D.length != 0 && !l.frameMaskDisabled && l.containerSupportsFillStrokeAndCorners;
	if (!dY && d2 && a) {
		g.add.vmsk = a;
		g.Ba();
		g.QJ(V)
	} else I.a4w(t, g, V);
	V.B.push(g)
} else if (l.mask) {
	if (a) {
		t.b5.N4 = a
	}
} else {
	var gu = [],
		gz = 1;
	if (j)
		for (var jt = 0; jt < j.length; jt++) {
			var $ = j[jt],
				ip = $.color,
				aQ = $.type,
				iL = ["DROP_SHADOW", "INNER_SHADOW"].indexOf(aQ);
			if (iL != -1) {
				var jx = ["DrSh", "IrSh"][iL],
					ep = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf(jx)]);
				gu.push([jx, ep]);
				ep.enab.v = $.visible;
				ep.Md.v.BlnM = au.ci(I.apb($.blendMode));
				ep.Opct.v.val = Math.round(100 * ip.a);
				ep.blur.v.val = Math.round($.radius * k.Nw());
				ep.Clr = I.eq(ip);
				var dK = $.offset.x,
					jC = $.offset.y;
				ep.uglg.v = !1;
				ep.lagl.v.val = Math.round(180 / Math.PI * Math.atan2(jC, -dK));
				ep.Dstn.v.val = Math.round(Math.sqrt(dK * dK + jC * jC) * k.Nw())
			}
		}
	if (n == "TEXT" && D[0] && D[0].type != "SOLID") gz = 0;
	for (var A = gz; A < D.length; A++) {
		var ed = D[A],
			bo = I.UT(l, ed, k, F, b, V, t);
		if (bo[0] == "GdFl") gu.push(["GrFl", bo[1]]);
		else if (bo[0] == "SoCo") gu.push(["SoFi", bo[1]]);
		else if (bo[0] == "PtFl") gu.push(["patternFill", bo[1]]);
		else if (bo[0] == "None") {} else throw bo
	}
	if (!Z)
		for (var A = 0; A < W.length; A++) {
			var ed = W[A],
				bo = I.UT(l, ed, k, F, b, V, t);
			if (bo[0] == "SoCo") {
				var ep = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("FrFX")]);
				gu.push(["FrFX", ep]);
				ep.enab = bo[1].enab;
				ep.Opct = bo[1].Opct;
				ep.Md = bo[1].Md;
				ep.Clr = bo[1].Clr;
				ep.Sz.v.val = l.strokeWeight
			}
		}
	if (gu.length != 0) {
		var d0 = JSON.parse(LayerStyleConstants.defaultLayerStyleJson);
		for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) d0[LayerStyleConstants.effectMultiKeys[A]] = {
			t: "VlLs",
			v: []
		};
		for (var A = 0; A < gu.length; A++) {
			var c0 = gu[A],
				jx = LayerStyleConstants.effectMultiKeys[LayerStyleConstants.effectOrder.indexOf(c0[0])];
			d0[jx].v.unshift({
				t: "Objc",
				v: c0[1]
			})
		}
		if (r == null) g.add.lmfx = d0
	}
	V.B.push(g)
}
};
fm.acs = function(l, d, G, b, V, Q, t, I, y, e) {
var M = fm;
l.layerFlags |= 16;
l.add.vmsk = d;
var R = l.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default)),
	J = M.UT(G, b, Q, t, I, y, e);
if (J[0] == "None") {
	R.fillEnabled.v = !1;
	l.add.SoCo = J[1]
} else {
	M.Q9(J, l);
	l.add[J[0]] = J[1]
}
var J = M.UT(G, V[0], Q, t, I, y, e);
if (J[0] != "None") {
	var R = l.add.vstk;
	R.strokeEnabled.v = !0;
	R.strokeStyleLineWidth.v.val = G.strokeWeight * Q.Nw();
	R.strokeStyleLineAlignment.v.strokeStyleLineAlignment = LayerStyleConstants.strokeStyle.lineAlignmentTypes[["INSIDE", "CENTER", "OUTSIDE"].indexOf(G.strokeAlign)];
	var n = {
			SoCo: "SoFi",
			GdFl: "GrFl",
			PtFl: "patternFill"
		}[J[0]],
		r = ["SoFi", "GrFl", "patternFill"].indexOf(n),
		T = [LayerStyleConstants.solidColorContentKeys, LayerStyleConstants.gradientContentKeys, LayerStyleConstants.patternContentKeys][r];
	R.strokeStyleContent.v = {
		classID: LayerStyleConstants.strokeStyle.contentLayerClassIDs[0]
	};
	var j = G.dashPattern;
	if (j) R.strokeStyleLineDashSet.v = PatternHelper.CB(j, 1 / G.strokeWeight);
	var g = R.strokeStyleContent.v = {
		classID: LayerStyleConstants.strokeStyle.contentLayerClassIDs[r]
	};
	for (var A = 0; A < T.length; A++) g[T[A]] = J[1][T[A]];
	if (!R.fillEnabled.v) M.Q9(J, l)
}
};
fm.Q9 = function(l, d) {
var G = l[1].Opct.v.val;
if (G != 100) d.opacity = Math.round(d.opacity / 255 * (G / 100) * 255)
};
fm.as7 = function(l, d) {
var G = l.parentIndex.position,
	b = d.parentIndex.position;
return G > b ? 1 : -1
};
fm.aqT = function(l) {
for (var A = 1; A < l.length; A++) {
	var d = l[A];
	if (d.type == "IMAGE" && d.opacity == 1) {
		l = l.slice(A);
		break
	}
}
for (var A = 0; A < l.length; A++) {
	var d = l[A],
		G = d.imageThumbnail;
	if (d.type == "IMAGE" && (d.image == null || d.image.dataBlob == null) && G && G.dataBlob) d.image = G;
	if (!d.visible) {
		l.splice(A, 1);
		A--
	}
}
return l
};
fm.a4w = function(l, d, G) {
if (l.b5.N4) {
	d.add.vmsk = l.b5.N4.clone();
	d.Ba();
	d.QJ(G)
}
};
fm.asU = function(l, d, G, b, V, Q, t, I) {
var y = l.fontSize,
	e = l.lineHeight,
	M = l.fontName,
	R = l.textAlignHorizontal,
	J = l.textTracking,
	n = l.textCase,
	r = l.textDecoration;
if (y == null) y = b.xg.FontSize;
if (M) {
	var T = M.postscript;
	if (T == "") {
		var j = M.family,
			g = M.style;
		T = j.split(" ").join("") + "-" + g
	}
	dt.Wr(b, T)
}
if (y != null) b.xg.FontSize = Math.round(y);
if (r == "UNDERLINE") b.xg.Underline = !0;
if (J) b.xg.Tracking = Math.round(J * 1e3);
if (n) b.xg.FontCaps = n == "UPPER" ? 2 : 0;
if (e && (e.units != "PERCENT" || e.value != 100)) {
	if (y == null) y = 15;
	var Y = e.value;
	if (e.units == "PERCENT") Y = 1 * y * Y / 100;
	if (e.units == "RAW") Y = 1 * y * Y;
	b.xg.AutoLeading = !1;
	b.xg.Leading = Math.round(Y)
}
if (R) b.GB.Justification = ["LEFT", "RIGHT", "CENTER"].indexOf(R);
var k = l.fillPaints,
	F = l.inheritFillStyleID;
if (F) {
	var D = fm.p2(I.rx, F);
	if (D) k = D.fillPaints
}
if (k && k[0]) {
	var q = fm.UT(l, k[0], d, G, Q, t, I);
	if (q[0] == "SoCo") {
		var H = PixelUtil.color.sampleGradientColor(q[1].Clr.v);
		b.xg.FillColor = {
			Type: 1,
			Values: [1, H.o / 255, H.J / 255, H.k / 255]
		};
		fm.Q9(q, V)
	}
}
};
fm.UT = function(l, d, G, b, V, Q, t) {
var I = fm,
	y, e, M = l.size;
if (d) {
	var R = d.type,
		J = ["GRADIENT_LINEAR", "GRADIENT_RADIAL", "GRADIENT_DIAMOND", "GRADIENT_ANGULAR"].indexOf(R);
	if (R == "SOLID") {
		y = "SoCo";
		var n = d.color;
		e = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("SoFi")]);
		e.Clr = I.eq(n)
	} else if (J != -1) {
		var r = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("GrFl")]),
			T = r.Grad.v;
		T.Intr.v = 0;
		r.Type.v.GrdT = ["Lnr", "Rdl", "Dmnd", "Angl"][J];
		var j = [],
			g = d.stops;
		for (var A = 0; A < g.length; A++) {
			var Y = g[A],
				k = Y.color;
			j.push([Y.position, [k.r, k.g, k.b], k.a])
		}
		PixelUtil.color.stopsToDescriptor(j, T);
		var F = I.Aw(d.transform);
		F.hI();
		var D = F.clone();
		if (M) D.scale(M.x, M.y);
		D.concat(G);
		var q = new Point2D(0, .5),
			H = new Point2D(1, .5);
		q = D.kD(q);
		H = D.kD(H);
		if (!0) {
			q.x = H.x + .5 * (q.x - H.x);
			q.y = H.y + .5 * (q.y - H.y)
		}
		PixelUtil.color.gradientFromEndpoints(q, H, b, r);
		if (J == 3) {
			if (D.aS * D.Qd - D.k * D.S5 < 0) r.Rvrs.v = !r.Rvrs.v
		}
		y = "GdFl";
		e = r
	} else if (R == "IMAGE") {
		var r = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("patternFill")]),
			F = I.Aw(d.transform);
		F.hI();
		var W = fm.Or(d),
			Z = t.apW[W];
		if (Z == null) {
			var B = I.LT(V, W, t);
			Z = t.apW[W] = {};
			Z.id = PsdDocument.Xb() + "-d71c-11e5-b1ae-a548a96e5f9f";
			Z.Rj = [new Uint8Array(B.data), B.uA];
			if (F.aS < 0) {
				var a = Z.Rj[0].slice(0);
				PixelUtil.canvas.U5(a, Z.Rj[0], B.uA.m, B.uA.n)
			}
			Z.name = "someImage";
			Q.wJ(Z)
		}
		if (F.aS < 0) F.aS = -F.aS;
		var m = ["FILL", "FIT", "STRETCH", "TILE"].indexOf(d.imageScaleMode),
			p = m == 3 ? d.scale : 1;
		PatternHelper.a4y(Z, r, M.x, M.y, m, G, F, p);
		y = "PtFl";
		e = r
	} else throw R;
	if (e) e.Opct = {
		t: "UntF",
		v: {
			type: "#Prc",
			val: Math.round(d.opacity * 100)
		}
	}
}
if (y == null || d.opacity < .001) {
	y = "None";
	e = {
		classID: "null",
		Clr: {
			t: "Objc",
			v: PixelUtil.color.rgbColorDescriptor({
				o: 0,
				J: 0,
				k: 0
			})
		}
	}
}
return [y, e]
};
fm.Or = function(l) {
var d = l.image,
	G = d.dataBlob;
if (G == null) {
	G = "";
	for (var A = 0; A < 20; A++) G += d.hash[A].toString(16).padStart(2, "0")
}
return G
};
fm.LT = function(l, d, G, b) {
if (l[d]) {
	var V = l[d];
	if (b) return V.bytes;
	if (V.rslt) return V.rslt;
	var Q = V.bytes.buffer,
		t = FormatHandler.aJ(Q),
		I = FormatHandler.jA(t);
	try {
		V.rslt = I.gR(Q)[0]
	} catch (dk) {
		V.rslt = {
			data: PixelUtil.allocBytes(4),
			uA: new Rect(0, 0, 1, 1)
		}
	}
	return V.rslt
} else {
	if (b) return G.kh["images/" + d];
	var Q = G.kh["images/" + d].buffer;
	if (G.kh["images/-" + d]) return G.kh["images/-" + d];
	var t = FormatHandler.aJ(Q);
	if (t == "fpng") t = "png";
	var I = FormatHandler.jA(t);
	G.kh["images/-" + d] = I.gR(Q)[0];
	return G.kh["images/-" + d]
}
};
fm.a0m = function(l, d, G) {
var b = l.type,
	V = l.size,
	Q = l.cornerRadius,
	e;
if (Q == null) Q = 0;
var t = V.x,
	I = V.y,
	y = [Q, Q, Q, Q],
	M = ["rectangleTopLeftCornerRadius", "rectangleTopRightCornerRadius", "rectangleBottomRightCornerRadius", "rectangleBottomLeftCornerRadius"];
for (var A = 0; A < 4; A++)
	if (l[M[A]] != null) y[A] = l[M[A]];
if (b == "RECTANGLE" || b == "ROUNDED_RECTANGLE" || b == "FRAME") {
	e = PixelUtil.path.shapes.rect(0, 0, t, I, y)
} else if (b == "ELLIPSE") {
	var R = l.arcData,
		J = R ? R.startingAngle : 0,
		n = R ? R.endingAngle : 2 * Math.PI,
		r = R ? R.innerRadius : 0;
	if (J == 0 && n > 1.999 * Math.PI) e = PixelUtil.path.shapes.ellipse(0, 0, t, I, 0);
	else e = PixelUtil.path.shapes.ellipseArc(t / 2, I / 2, I / 2, J, n);
	if (r != 0 && r != 1) {
		var T = LayerRecord.VectorMask.FT(e).slice(3);
		T.reverse();
		for (var A = 0; A < T.length; A++) {
			var j = T[A],
				g = j.Wf;
			j.Wf = j.UU;
			j.UU = g
		}
		var Y = new Matrix2D;
		Y.translate(-t / 2, -I / 2);
		Y.scale(r, r);
		Y.translate(t / 2, I / 2);
		PixelUtil.path.transformFlatCoords(T, Y);
		e = e.concat(T);
		e[2].length *= 2
	}
} else if (b == "LINE") {
	e = PixelUtil.path.shapes.rect(0, 0, t, I, 0);
	e.pop();
	e.pop();
	e[2].length = 2
} else if (b == "STAR") {
	e = PixelUtil.path.shapes.star(t / 2, I / 2, t / 2, 2 * Math.PI * (1 / 4), 5, 0, l.starInnerScale)
} else if (b == "REGULAR_POLYGON") {
	e = PixelUtil.path.shapes.polygon(.5, .5, .5, Math.PI / 2, l.count, 0);
	var k = new Matrix2D;
	k.scale(t, I);
	PixelUtil.path.transformFlatCoords(e, k)
} else if (b == "BOOLEAN_OPERATION") {
	e = [{
		type: 6
	}, {
		type: 8,
		all: 0
	}];
	var F = l.children,
		D = ["XOR", "UNION", "SUBTRACT", "INTERSECT"].indexOf(l.booleanOperation);
	if (D == -1) throw l;
	if (F == null) F = [];
	for (var A = 0; A < F.length; A++) {
		var q = F[A],
			H = new LayerRecord.VectorMask,
			W = fm.a0m(q, d, H);
		if (H.i == null) continue;
		PixelUtil.path.transformFlatCoords(H.i, fm.Aw(q.transform));
		e = e.concat(H.i.slice(2))
	}
	for (var A = 3; A < e.length; A++)
		if (e[A].H$ != null) e[A].H$ = D
} else if (b == "VECTOR") {
	var Z, B, L = 3;
	if (!0) {
		var a = l.vectorData;
		if (a == null) return;
		Z = a.normalizedSize;
		B = a.vectorNetworkBlob
	}
	var m = d[B].bytes,
		p = new Uint32Array(m.buffer),
		c = new Float32Array(m.buffer),
		v = p[0],
		i = p[1],
		z = p[2],
		P = [],
		C = [],
		h = [],
		U = L + v * 3,
		S = U + i * 7;
	for (var A = 0; A < v; A++) {
		var E = L + A * 3,
			x = new Point2D(c[E + 1], c[E + 2]);
		P.push(x)
	}
	for (var A = 0; A < i; A++) {
		var K = U + A * 7;
		C.push([p[K + 0], p[K + 1], c[K + 2], c[K + 3], p[K + 4], c[K + 5], c[K + 6]])
	}
	for (var A = 0; A < z; A++) {
		var u = p[S + 1],
			bC = h[A] = [];
		S += 2;
		for (var O = 0; O < u; O++) {
			var $ = p[S++],
				gX = bC[O] = [];
			for (var _ = 0; _ < $; _++) gX[_] = p[S + _];
			S += $
		}
	}
	if (S != p.length) throw "e";
	if (z == 0) {
		var jI = -1;
		for (var A = 0; A < i; A++) {
			if (jI == -1) {} else {
				var iw = -1;
				for (var O = A; O < i; O++)
					if (C[O][4] == jI) iw = O;
				for (var O = A; O < i; O++)
					if (C[O][1] == jI) iw = O;
				if (iw != -1) {
					var hn = 0,
						g = C[iw];
					C[iw] = C[A];
					C[A] = g;
					if (g[1] != jI) {
						hn = g[1];
						g[1] = g[4];
						g[4] = hn;
						hn = g[2];
						g[2] = g[5];
						g[5] = hn;
						hn = g[3];
						g[3] = g[6];
						g[6] = hn
					}
				}
			}
			jI = C[A][4]
		}
		h.push([
			[]
		]);
		for (var A = 0; A < i; A++) h[0][0].push(A)
	}
	var jq = [],
		iv = [];
	for (var kq = 0; kq < h.length; kq++) {
		for (var eE = 0; eE < h[kq].length; eE++) {
			var e8 = h[kq][eE],
				aI = 0;
			if (e8.length > 1) {
				var dK = C[e8[0]],
					d7 = C[e8[1]];
				aI = dK[4] == d7[1] ? 1 : 0
			}
			for (var A = 0; A < e8.length; A++) {
				var ka = C[e8[A]],
					hS = 1,
					eH = 4;
				if (aI == 0) {
					hS = 4;
					eH = 1
				}
				var kA = P[ka[hS]],
					gq = P[ka[eH]];
				if (A == 0) {
					iv.push("M");
					jq.push(kA.x, kA.y)
				}
				iv.push("C");
				jq.push(kA.x + ka[hS + 1], kA.y + ka[hS + 2], gq.x + ka[eH + 1], gq.y + ka[eH + 2], gq.x, gq.y)
			}
		}
	}
	e = PixelUtil.vec.QO({
		C: jq,
		F: iv
	}, !1);
	if (Q != 0) {
		var y = [],
			hb = e[2].length;
		for (var A = 0; A < hb; A++) y.push(Q);
		if (PixelUtil.path.ju(e)) PixelUtil.path.m9(e, 2, y)
	}
	var ex = new Matrix2D;
	ex.scale(Z.x == 0 ? 1 : V.x / Z.x, Z.y == 0 ? 1 : V.y / Z.y);
	PixelUtil.path.transformFlatCoords(e, ex)
}
G.i = e
};
fm.p2 = function(l, d) {
return l[d.sessionID + "," + d.localID]
};
fm.ajG = function(l, d) {
return l.sessionID == d.sessionID && l.localID == d.localID
};
fm.apb = function(l) {
var d = {
	NORMAL: "norm",
	MULTIPLY: "mul ",
	SCREEN: "scrn",
	COLOR_DODGE: "div ",
	COLOR_BURN: "idiv",
	HARD_LIGHT: "hLit",
	DARKEN: "dark",
	LUMINOSITY: "lum ",
	OVERLAY: "over"
}[l];
if (d == null) throw l;
return d
};
fm.eq = function(l) {
return {
	t: "Objc",
	v: PixelUtil.color.rgbColorDescriptor({
		o: l.r * 255,
		J: l.g * 255,
		k: l.b * 255
	})
}
};
fm.Aw = function(l) {
var d = [l.m00, l.m10, l.m01, l.m11, l.m02, l.m12];
for (var A = 0; A < 6; A++)
	if (Math.abs(d[A]) < 1e-20) d[A] = 0;
return new Matrix2D(d[0], d[1], d[2], d[3], d[4], d[5])
};

// Figma PNG / flat document parser namespace
function aJ() {}
aJ.Cd = function() {
var l = X.Ko;

function d(n, r, T, j) {
	var g = j ? [] : {};
	while (r < n.length - 1 && n[r] != 125) {
		var Y = l(n, r, 3),
			k = l(n, r + 3, 1),
			F;
		r += 4;
		r++;
		if (k == "v") {
			var D = d(n, r, T + 1, Y == "ELM" || Y == "TIL");
			F = D.Z;
			r = D.R
		} else if (k == "i" || k == "f") {
			var q = r;
			while (n[q] != 125) q++;
			var H = l(n, r, q - r);
			F = k == "i" ? parseInt(H, 16) : parseFloat(H);
			r = q + 1
		} else if (k == "s") {
			var W = X.TD(n, r),
				H = "";
			r += 2;
			for (var A = 0; A < W; A++) H += String.fromCharCode(n[r + 2 * A + 1]);
			F = H;
			r = r + 2 * W + 1
		} else if (k == "b") {
			F = n[r] == 49;
			r = r + 2
		} else throw "e";
		if (j) g.push([Y, F]);
		else if (g[Y] == null) g[Y] = F;
		else {
			if (!(g[Y] instanceof Array)) g[Y] = [g[Y]];
			g[Y].push(F)
		}
	}
	r++;
	return {
		Z: g,
		R: r
	}
}

function G(n, r) {
	var T = b(n).slice(1),
		n = r.Clr.v;
	n.Rd.v = T[0] * 255;
	n.Grn.v = T[1] * 255;
	n.Bl.v = T[2] * 255
}

function b(n) {
	return [(n >>> 24 & 255) / 255, (n >>> 16 & 255) / 255, (n >>> 8 & 255) / 255, (n >>> 0 & 255) / 255]
}

function V(n, r) {
	var T = r & 4278190080 | (r & 255) << 16 | (r >>> 8 & 255) << 8 | r >>> 16 & 255;
	new Uint32Array(n.buffer).fill(T)
}

function Q(n, r) {
	var T = n.TSZ,
		j = n.WPX,
		g = n.HPX,
		Y = n.TIL,
		k = new Rect(0, 0, j, g),
		F = PixelUtil.allocBytes(j * g * 4),
		D = 0;
	for (var q = 0; q < g; q += T)
		for (var H = 0; H < j; H += T) {
			var W = new Rect(H, q, T, T),
				Z, B = Y[D];
			if (B[0] == "TMC") {
				Z = PixelUtil.allocBytes(W.O() * 4);
				V(Z, B[1])
			} else if (B[0] == "TID") {
				Z = r[B[1]]
			}
			PixelUtil.blitRgbaRect(Z, W, F, k);
			D++
		}
	return [F, k]
}

function t(n, r) {
	n = new Uint8Array(n);
	var T = 8,
		j, g = {},
		i = 0;
	while (T < n.length) {
		var Y = X.q(n, T);
		T += 4;
		var k = l(n, T, 4);
		T += 4;
		if (k == "mkTS") {
			var F = pako.inflate(n.slice(T, T + Y)),
				D = d(F, 0, 0);
			j = D.Z
		} else if (k == "mkBT") {
			var q = X.q(n, T + 4),
				H = X.q(n, T + 8),
				F = pako.inflate(n.slice(T + 76, T + Y));
			if (H == 0)
				for (var A = 0; A < F.length; A += 4) {
					var W = F[A],
						Z = F[A + 1],
						B = F[A + 2],
						a = F[A + 3];
					F[A + 3] = W;
					F[A + 2] = a;
					F[A + 1] = B;
					F[A] = Z
				} else {
					var m = PixelUtil.allocBytes(F.length * 4);
					m.fill(255);
					PixelUtil.grayPlaneToRgbaChannels(F, m);
					F = m
				}
			g[q] = F
		}
		T += Y + 4
	}
	var p = j.PDC,
		c = p ? p instanceof Array ? p : [p] : [j.MKB],
		v = new Rect;
	for (var A = 0; A < c.length; A++) {
		var z = c[A];
		v = v.Cw(new Rect(0, i, z.WID, z.HIT));
		i += z.HIT + 100
	}
	r.m = v.m;
	r.n = v.n;
	r.buffer = PixelUtil.allocBytes(v.O() * 4);
	r._8(c.length);
	i = 0;
	for (var P = 0; P < c.length; P++) {
		r.B.push(r.En());
		var z = c[P],
			C = z.WID,
			h = z.HIT,
			L = z.BGC,
			U = (z.LYL ? z : j).LYL.LAY,
			x = 3;
		for (var A = 0; A < U.length; A++) y(U[A], r, null, g, new Matrix2D(1, 0, 0, 1, -z.XLC, -z.YLC + i));
		var S = r.V4();
		r.B.push(S);
		var E = new Rect(0, i, C, h);
		i += h + 100;
		S.P3(E);
		if (L >>> 24 != 0) {
			var K = PixelUtil.color.rgbColorDescriptor({
				o: L >>> 16 & 255,
				J: L >>> 8 & 255,
				k: L >>> 0 & 255
			});
			S.add.artb.Clr = {
				t: "Objc",
				v: K
			};
			x = 4
		}
		S.add.artb.artboardBackgroundType.v = x;
		S.tH(z.PGN ? z.PGN : "Page " + (P + 1));
		S.add.lsct = LayerSectionType.closed;
		S.blendModeKey = "pass";
		S.layerFlags = 24
	}
}

function I(n, r, T) {
	var j = n[r];
	return j instanceof Array ? j[T] : j
}

function y(n, r, T, j, g) {
	var Y = r.V4();
	if (n.VIS != null) Y.Oj(n.VIS);
	if (n.VIF != null) Y.Oj(n.VIF.VIS);
	if (n.OPA != null) Y.opacity = Math.round(255 * n.OPA / 1e3);
	Y.blendModeKey = n.CLL || T == "GRP" ? "pass" : "norm";
	if (n.BLD != null) {
		var k = n.BLD,
			F = {
				"0": "norm",
				"2": "mul ",
				"4": "over",
				"5": "scrn",
				"7": "diss",
				"9": "dark",
				"10": "lite",
				"37": "idiv",
				"30": "norm",
				"39": "lbrn",
				"41": "vLit"
			}[k + ""];
		if (F == null) console.log(n.OBN, k);
		else Y.blendModeKey = F;
		if (k == 30) Y.opacity >>>= 1
	}
	if (n.CLL) {
		Y.tH(n.LNM);
		r.B.push(r.En());
		var D = n.CLL.CEL;
		if (D.length == null) D = [D];
		for (var q = D.length - 1; q >= 0; q--) {
			var H = D[q].ELM;
			for (var A = H.length - 1; A >= 0; A--) y(H[A][1], r, H[A][0], j, g)
		}
		Y.add.lsct = n.DIS ? LayerSectionType.open : LayerSectionType.closed;
		Y.layerFlags |= 24
	} else if (T == "GRP") {
		var W = Y.add.lmfx = M(n.EFL),
			Z;
		r.B.push(r.En());
		var H = n.ELM;
		if (n.MNA) {
			Z = H[0][1];
			H = H.slice(1)
		}
		Y.tH("Group: " + H.length + " objects");
		for (var A = H.length - 1; A >= 0; A--) y(H[A][1], r, H[A][0], j, g);
		if (Z) {
			if (n.MRX) {
				var B = Q(Z, j),
					a = Y.z = new LayerRecord.LayerMask;
				a.rect = B[1].clone();
				a.rect.x = Z.XLC;
				a.rect.y = Z.YLC + g.xu;
				a.channel = PixelUtil.allocBytes(a.rect.O());
				PixelUtil.extractChannelFromRgba(B[0], a.channel, 0);
				PixelUtil.invertUint32Buffer(a.channel)
			} else {
				e(Y, Z, g);
				Y.Ba();
				Y.QJ(r)
			}
		}
		Y.add.lsct = LayerSectionType.closed;
		Y.layerFlags |= 24
	} else if (T == "IMG") {
		Y.tH(n.OBN ? n.OBN : "Bitmap");
		var B = Q(n, j);
		Y.rect = B[1].clone();
		Y.rect.x = n.XLC;
		Y.rect.y = n.YLC + g.xu;
		Y.buffer = B[0]
	} else if (T == "TXT") {
		var m = n.TFS,
			p = m.TRN instanceof Array ? m.TRN.length : 1,
			z = "",
			P = "Arial",
			C = 20,
			h = 0;
		Y.add.lnsr = "rend";
		Y.add.TySh = dt.Iu(0, 0);
		Y.add.TySh.xZ = new Rect(0, 0, 100, 100);
		var c = new Matrix2D(1, 0, 0, 1, n.LFT, n.TOP);
		if (n.MTX) {
			var v = n.MTX,
				a = new Matrix2D(v.M00, v.M01, v.M10, v.M11, v.M20, v.M21);
			c.concat(a)
		}
		c.concat(g);
		Y.add.TySh.D = c;
		var i = Y.add.TySh.zC;
		for (var A = 0; A < p; A++) {
			var L = I(m, "TRN", A);
			if (L == null) continue;
			L = L.replaceAll("\x18", "'").replaceAll("\x19", "'").replaceAll("\x1C", "'").replaceAll("\x1D", "'");
			L = L.replaceAll("\x03", "\n").replaceAll("\r", "\n");
			dt.sT(i, z.length, L);
			var U = dt.Au(i, 0, 1),
				S = I(m, "FON", A);
			if (S) P = S;
			dt.Wr(U, P);
			var E = I(m, "PTS", A);
			if (E != null) C = E;
			U.xg.FontSize = Math.round(C);
			var x = I(m, "LED", A);
			if (x != null) {
				U.xg.Leading = x * C;
				U.xg.AutoLeading = !1
			}
			var K = I(m, "UND", A);
			if (K != null) {
				U.xg.Underline = K
			}
			var u = I(m, "ITL", A);
			if (u != null) {
				U.xg.FauxItalic = u
			}
			var bC = I(m, "FCL", A);
			if (bC != null) h = bC;
			U.xg.FillColor = {
				Type: 1,
				Values: b(h)
			};
			var O = I(m, "JST", A);
			if (O != null) U.GB.Justification = [0, 2, 1, 3, 5, 4, 6, 7, 8][O];
			dt.rW(i, z.length, z.length + L.length, U);
			z += L
		}
		Y.tH(z.slice(0, 255));
		var $ = n.RIT - n.LFT,
			gX = n.BOT - n.TOP;
		if (n.IMG) {
			y(n.IMG, r, "IMG", j, g);
			var _ = r.B.pop();
			Y.buffer = _.buffer;
			Y.rect = _.rect.clone()
		}
		dt.AO(i, 1);
		dt.mt(i, [0, 0, $, gX])
	} else if (T == "PTH") {
		Y.tH(n.OBN ? n.OBN : "Path");
		Y.layerFlags |= 16;
		var jI = !1;
		e(Y, n, g);
		var iw = Y.add.vmsk,
			hn = Y.add.vstk,
			jq = PixelUtil.path.oh(iw.i),
			iv = n.PAT,
			kq = iv.BPL,
			eE = iv.FPL,
			e8 = iv.TXF;
		if (eE && eE.FEF) iw.Vx += eE.FEF / 2.4;
		if (kq) {
			var aI = kq.CAT;
			hn.strokeEnabled.v = !0;
			hn.strokeStyleLineWidth.v.val = kq.BDI;
			hn.strokeStyleLineAlignment.v.strokeStyleLineAlignment = LayerStyleConstants.strokeStyle.lineAlignmentTypes[n.BRP];
			G(iv.BCL, hn.strokeStyleContent.v);
			if (aI != "bc_Basic" && aI != "bc_Pencil") jI = !0
		}
		if (eE == null) {
			hn.fillEnabled.v = !1;
			Y.add.SoCo = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("SoFi")]);
			G(0, Y.add.SoCo)
		} else if (eE.CAT == "fc_Solid") {
			Y.add.SoCo = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("SoFi")]);
			G(n.PAT.FCL, Y.add.SoCo)
		} else if (eE.CAT == "fc_Linear" || eE.CAT == "fc_Circular" || eE.CAT == "fc_Elliptical") {
			var dK = eE.CAT == "fc_Linear",
				jC = Y.add.GdFl = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("GrFl")]),
				d7 = jC.Grad.v,
				ka = [],
				hS = eE.FGL,
				eH, kA = [];
			if (hS.FGY) {
				var gq = hS.FGY,
					eH = gq.FG0.FGI,
					kA = gq.FG1.FGI
			} else eH = hS.FGV.FGI;
			for (var A = 0; A < eH.length; A++) {
				var hb = eH[A],
					ex = b(hb.FGC),
					fs = 1;
				if (kA.length == eH.length) fs = b(kA[A].FGC)[0];
				ka.push([hb.FGP, ex.slice(1), fs])
			}
			jC.Type.v.GrdT = dK ? "Lnr" : "Rdl";
			PixelUtil.color.stopsToDescriptor(ka, d7);
			d7.Intr.v = 0;
			var f_ = n.PRI ? n.PRI : n,
				bD = new Point2D(f_.PSX, f_.PSY),
				ae = new Point2D(f_.PEX, f_.PEY);
			if (eE.CAT == "fc_Elliptical" && f_.PFX != null) {
				var em = new Point2D(f_.PFX, f_.PFY),
					dY = Point2D.yZ(bD, ae),
					f7 = Point2D.yZ(bD, em);
				if (f7 < dY) {
					var bM = dY;
					dY = f7;
					f7 = bM
				}
				ae = new Point2D(bD.x + (dY + f7) / 2, bD.y);
				if (dY / f7 < .5) jI = !0
			}
			if (dK) {
				bD.x = (bD.x + ae.x) / 2;
				bD.y = (bD.y + ae.y) / 2
			}
			PixelUtil.color.gradientFromEndpoints(bD, ae, jq, jC)
		} else console.log(eE.CAT);
		var W = Y.add.lmfx = M(n.EFL, iw);
		if (eE && eE.FTB != 0 && e8) {
			var B = Q(e8.MSK, j),
				iP = {};
			iP.id = PsdDocument.Xb() + "-d71c-11e5-b1ae-a548a96e5f9f";
			iP.name = "someImage";
			iP.Rj = B;
			r.wJ(iP);
			var jp = B[0];
			for (var A = 0; A < jp.length; A += 4) {
				jp[A + 3] = 255 - jp[A];
				jp[A] = jp[A + 1] = jp[A + 2] = 255
			}
			var jC = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("patternFill")]);
			jC.Opct.v.val = Math.round(eE.FTB / 10);
			jC.Algn.v = !0;
			jC.Ptrn.v.Idnt.v = iP.id;
			W.patternFillMulti.v.unshift({
				t: "Objc",
				v: jC
			})
		}
		if (jI && n.IMG) {
			y(n.IMG, r, "IMG", j, g);
			var hG = r.B[r.B.length - 1];
			hG.opacity = Y.opacity;
			return
		}
		Y.Ba();
		Y.QJ(r)
	} else if (T == "URL") return;
	else {
		console.log("unknown layer type", T, n);
		Y.tH("Layer")
	}
	r.B.push(Y)
}

function e(n, r, T) {
	if (r.PBL == null) return;
	var j = n.add.vmsk = new LayerRecord.VectorMask,
		g = n.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default)),
		Y = r.PBL.PBP;
	if (!(Y instanceof Array)) Y = [Y];
	for (var k = 0; k < Y.length; k++) {
		var F = Y[k].PBT;
		if (F == null) continue;
		if (!(F instanceof Array)) F = [F];
		var D = Y[k].ISC ? 0 : 3;
		j.i.push({
			type: D,
			length: F.length,
			H$: 0,
			_M: 2,
			c_: 0,
			jt: 0
		});
		for (var A = 0; A < F.length; A++) {
			var q = F[A],
				H = q.XLC,
				W = q.YLC,
				Z = [H, W, H, W, H, W],
				B = "XPC YPC XLC YLC XSC YSC".split(" ");
			for (var a = 0; a < 6; a++) {
				var m = B[a],
					p = q[m];
				if (p != null) Z[a] = p
			}
			j.i.push({
				type: D + 2,
				H: new Point2D(H, W),
				Wf: new Point2D(Z[0], Z[1]),
				UU: new Point2D(Z[4], Z[5])
			})
		}
	}
	PixelUtil.path.transformFlatCoords(j.i, T)
}

function M(n, r) {
	var T = JSON.parse(LayerStyleConstants.defaultLayerStyleJson);
	for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) T[LayerStyleConstants.effectMultiKeys[A]] = {
		t: "VlLs",
		v: []
	};
	if (n == null) return T;
	var j = n.EPS;
	if (!(j instanceof Array)) j = [j];
	for (var A = 0; A < j.length; A++) {
		var g = j[A].DCE,
			Y = {};
		for (var k = 0; k < g.length; k++) Y[g[k].DCK] = g[k].DCV;
		if (Y.EffectIsVisible == "false") continue;
		var F = Y.mkbFile_WriteOnly_TemporaryEffectUiName;
		if (F == "Gaussian Blur..." && r) {
			r.Vx += parseFloat(Y.gaussian_blur_radius);
			continue
		}
		var D = ["Drop Shadow", "Inner Bevel", "Inner Glow", "Glow"].indexOf(F);
		if (D == -1) {
			continue
		}
		var q = ["DrSh", "ebbl", "IrGl", "OrGl"][D],
			H = LayerStyleConstants.effectMultiKeys[LayerStyleConstants.effectOrder.indexOf(q)],
			W = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf(q)]);
		T[H].v.unshift({
			t: "Objc",
			v: W
		});
		if (q == "DrSh") {
			W.uglg.v = !1;
			R(Y, "ShadowDistance", W, "Dstn");
			R(Y, "ShadowBlur", W, "blur");
			R(Y, "ShadowAngle", W, "lagl", 180);
			W.Opct.v.val = 100;
			J(Y, "ShadowColor", W, "Clr")
		}
		if (q == "IrGl") {
			W.Md.v.BlnM = "Nrml";
			var Z = Y.MaskSoftness,
				B = Y.GlowWidth;
			if (Z && B) {
				Z = parseInt(Z);
				B = parseInt(B);
				W.blur.v.val = B + Z;
				W.Ckmt.v.val = Math.round(100 * B / (B + Z))
			}
			R(Y, "BevelContrast", W, "Opct");
			J(Y, "OuterBevelColor", W, "Clr")
		}
		if (q == "OrGl") {
			W.Md.v.BlnM = "Nrml";
			var Z = Y.MaskSoftness,
				B = Y.GlowWidth;
			if (Z && B) {
				Z = parseInt(Z);
				B = parseInt(B);
				W.blur.v.val = B + Z
			}
			R(Y, "BevelContrast", W, "Opct");
			J(Y, "OuterBevelColor", W, "Clr")
		}
		if (q == "ebbl") {
			W.uglg.v = !1;
			R(Y, "BevelWidth", W, "blur");
			R(Y, "AngleSoftness", W, "Sftn");
			R(Y, "BevelContrast", W, "srgR");
			R(Y, "LightAngle", W, "lagl")
		}
	}
	return T
}

function R(n, r, T, j, g) {
	var Y = n[r];
	if (g == null) g = 0;
	if (Y) T[j].v.val = parseInt(Y) + g
}

function J(n, r, T, j) {
	var g = n[r];
	if (g) {
		g = g.slice(1);
		if (g.length == 6) g = g + "ff";
		if (g.length != 8) throw "e";
		var Y = b(parseInt(g, 16)),
			k = T[j].v;
		k.Rd.v = Y[0] * 255;
		k.Grn.v = Y[1] * 255;
		k.Bl.v = Y[2] * 255;
		T.Opct.v.val = Math.round(T.Opct.v.val / 100 * Y[3] * 100)
	}
}
return t
}();

// Adobe Illustrator (.ai) file parser namespace
function cp() {}
cp.Cd = function() {
function l(p, c, v) {
	var i = !1,
		z = Date.now(),
		P = D(p, i);
	if (i) console.log("part found", Date.now() - z);
	z = Date.now();
	var C = F(P),
		h = C.Layer,
		L = C.Header;
	if (i) console.log(C);
	var U = h[0];
	U = C.Layer[0];
	if (i) console.log("document parsed", Date.now() - z);
	z = Date.now();
	C.Setup.Gradient = k(C.Setup.Gradient, P);
	if (i) console.log("grads loaded", Date.now() - z);
	z = Date.now();
	C.Setup.Pattern = Y(C.Setup.Pattern, P);
	if (i) console.log("patts loaded", Date.now() - z);
	z = Date.now();
	C.Setup.DocumentData = g(C.Setup.DocumentData, P).pop();
	if (i) console.log("docdata loaded", Date.now() - z);
	z = Date.now();
	C.Setup.SVGFilter = g(C.Setup.SVGFilter, P);
	if (i) console.log("svgfilter loaded", Date.now() - z);
	z = Date.now();
	var S = L.Cropmarks,
		E = L.BoundingBox.split(" ").map(parseFloat),
		x = L.ArtSize ? L.ArtSize.split(" ").map(parseFloat) : [E[2] - E[0], E[3] - E[1]];
	c.m = Math.round(x[0]);
	c.n = Math.round(x[1]);
	var K = [1, 0, 0, 1, -E[0] + (c.m - (E[2] - E[0])) / 2, -E[1] + (c.n - (E[3] - E[1])) / 2];
	K[3] = -1;
	K[5] = c.n - K[5];
	if (S) {
		S = S.split(" ").map(parseFloat);
		c.m = Math.round(S[2] - S[0]);
		c.n = Math.round(S[3] - S[1]);
		K = [1, 0, 0, -1, -S[0], c.n + S[1]]
	}
	var u = C.Setup.DocumentData;
	if (u && u[0] && u[0].ArtboardArray) {
		var bC = u[0].ArtboardArray;
		if (bC.length != 1) console.log(bC.length, "artboards");
		var O = new Rect,
			$ = [];
		for (var A = 0; A < bC.length; A++) {
			var gX = bC[A],
				_ = gX.PositionPoint1,
				jI = gX.PositionPoint2,
				iw = _[0],
				hn = Math.min(_[1], jI[1]),
				jq = jI[0],
				iv = Math.max(_[1], jI[1]),
				kq = new Rect(iw, hn, jq - iw, iv - hn);
			$.push(kq);
			O = O.Cw(kq)
		}
		c.m = Math.round(O.m);
		c.n = Math.round(O.n);
		K[4] = -O.x;
		K[5] = O.y + c.n;
		if (bC.length != 1) {
			c.B.push(c.En());
			for (var A = 0; A < $.length; A++) {
				var gX = bC[A],
					kq = $[A],
					eE = c.V4();
				eE.tH(gX.Name);
				c.B.push(eE);
				eE.add.SoCo = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("SoFi")]);
				var e8 = eE.add.SoCo.Clr.v;
				e(e8, [1, 1, 1]);
				var iw = kq.x,
					hn = kq.y,
					jq = iw + kq.m,
					iv = hn + kq.n,
					aI = [iw, hn, jq, hn, jq, iv, iw, iv];
				PixelUtil.vec.transformCoords(aI, R(K), aI);
				n(eE, {
					cmds: ["M", "L", "L", "L", "Z"],
					crds: aI
				}, c);
				eE.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default))
			}
			var eE = c.V4();
			eE.tH("_Artboards_");
			eE.add.lsct = LayerSectionType.closed;
			eE.blendModeKey = "pass";
			eE.layerFlags = 24;
			c.B.push(eE)
		}
	}
	if (u && u[0] && u[0]["#document"]) {
		var dK = u[0]["#document"],
			jC = dK["xmlnode-children"][0];
		if (jC && jC["xmlnode-children"]) jC = jC["xmlnode-children"][0];
		if (jC["xmlnode-nodename"] == "variableSets") {
			var d7 = jC["xmlnode-children"][0]["xmlnode-children"],
				ka = d7[0],
				hS = d7[1],
				eH = m(ka);
			c.tJ = c4.a7b("<variableSets><variableSet>" + eH + "</variableSet></variableSets>");
			if (hS) {
				var kA = m(hS),
					gq = c.rw = c4.asJ(kA);
				for (var A = 0; A < gq.length; A++)
					for (var hb = 0; hb < gq[A].length; hb++) gq[A][hb] = gq[A][hb].trim()
			}
		}
	}
	var ex = 1 / kf.t2(new Rect(0, 0, c.m, c.n), 8192 * 8192);
	while (c.m * c.n * ex * ex < 800 * 800) ex *= 2;
	while (v && Math.max(c.m * ex, c.n * ex) < Math.max(v[0], v[1])) ex++;
	c.m = Math.round(c.m * ex);
	c.n = Math.round(c.n * ex);
	c.m7 = Math.round(72 * ex);
	c.buffer = PixelUtil.allocBytes(c.m * c.n * 4);
	for (var A = 0; A < 6; A++) K[A] *= ex;
	G = [0, 0, 0];
	b = [0, 0, 0];
	V = "SoCo";
	for (var fs = 0; fs < h.length; fs++) {
		var f_ = h[fs];
		f_.Raster = d(f_, "Raster");
		f_.Place = d(f_, "Place");
		var bD = T(P, f_);
		Q(c, bD, K, C, f_, P)
	}
	if (i) console.log("layers created", Date.now() - z);
	z = Date.now()
}

function d(p, c) {
	var v = p.Layer,
		i = p[c];
	if (i == null) i = [];
	if (v) {
		for (var A = 0; A < v.length; A++) {
			var z = v[A],
				P = z[c] = d(z, c);
			i = i.concat(P)
		}
		i.sort(function(C, h) {
			return C._begin - h._begin
		})
	}
	return i
}
var G, b, V;

function Q(p, c, v, i, z, P) {
	var C = "",
		h = 0,
		L = "",
		U = !1,
		S = {},
		E = UDOC.Geometry,
		x = UDOC.getState(),
		K = "norm",
		u = 1,
		bC = !1,
		O = 0,
		gX = null,
		_ = !1,
		jI = 0,
		iw = null,
		hn, jq, iv = 0,
		kq = 0,
		eE = 0,
		dK = 0,
		jC = !1;
	x.ctm = v;
	var $ = [],
		e8 = [],
		aI = [];
	for (var d7 = 0; d7 < c.length; d7++) {
		var ka = c[d7],
			gq = 1e9;
		if (ka[0] == "%") {
			if (ka == "%_/ArtDictionary :" && jI == 0) gX = [ka.slice(2)];
			else if (gX != null) {
				if (ka == "%_" && jI == 0) {
					var hS = W(gX)[0],
						eH = hS.AI10_ArtUID;
					if (eH && !eH.startsWith("XMLID")) p.B[p.B.length - 1].tH(B(eH));
					gX = null
				} else {
					gX.push(ka.slice(_ ? 1 : 2));
					if (ka == "%_X=") jI++;
					if (ka == "%_X+") jI--;
					if (ka == "%_/Binary : /ASCII85Decode ,") _ = !0;
					if (_ && ka.endsWith("~>")) _ = !1
				}
			} else if (iw) {
				hn += (hn == "" ? "" : " ") + ka.slice(2);
				if (hn.endsWith("X#")) {
					iw.push(hn.slice(0, hn.length - 3));
					hn = ""
				}
			}
			continue
		} else if (ka == "/Mesh X!") {
			iw = [];
			hn = "";
			continue
		} else if (ka == "/End X!") {
			t(iw, x, p);
			iw = null;
			continue
		}
		var kA = "Xa XR m l c f U u *U w J j M d".split(" "),
			hb = -1,
			ex = ka.indexOf("(") != -1;
		for (var A = 0; A < kA.length; A++) {
			var fs = ka.indexOf(" " + kA[A] + " ");
			if (fs != -1 && fs < gq && !ex) {
				gq = fs;
				hb = A
			}
		}
		if (hb != -1) {
			U = !0;
			var f_ = gq + 1 + kA[hb].length;
			c[d7] = ka.slice(0, f_);
			var bD = c[d7 + 1];
			if (bD == null || bD[0] == "%" || hb > 9) c.splice(d7 + 1, 0, ka.slice(f_));
			else c[d7 + 1] = (ka.slice(f_) + " " + bD).replace(/\s\s+/g, " ");
			d7--;
			continue
		}
		ka = ka.trim();
		var ae = ka.split(" "),
			em = ae[ae.length - 1],
			dY = em.toLowerCase(),
			f7 = ae.map(parseFloat);
		if (em == "m") E.moveTo(x, f7[0], f7[1]);
		else if (em == "L" || em == "l") E.lineTo(x, f7[0], f7[1]);
		else if (em == "V" || em == "v") {
			var bM = x.pth.crds,
				iP = x.cpos[0],
				jp = x.cpos[1];
			E.curveTo(x, iP, jp, f7[0], f7[1], f7[2], f7[3]);
			var hG = bM.length;
			bM[hG - 6] = iP;
			bM[hG - 5] = jp
		} else if (em == "Y" || em == "y") E.curveTo(x, f7[0], f7[1], f7[2], f7[3], f7[2], f7[3]);
		else if (em == "C" || em == "c") E.curveTo(x, f7[0], f7[1], f7[2], f7[3], f7[4], f7[5]);
		else if (em == "H" || em == "h") {
			if (em == dY) E.closePath(x);
			$.push(JSON.parse(JSON.stringify(x.pth)))
		} else if (em == "Xy") {
			K = ["norm", "mul ", "scrn", "over", "sLit", null, "div "][f7[0]];
			u = f7[1];
			if (K == null) {
				K = "norm";
				console.log("unknown blend mode", f7[0])
			}
		} else if (em == "Xd") {
			var hf = p.B[p.B.length - 1];
			hf.opacity = Math.round(255 * u);
			hf.blendModeKey = hf.IQ() && K == "norm" ? "pass" : K
		} else if (em == "AE") iv = f7[0];
		else if (em == "Ae") kq = f7[0];
		else if (em == "Xw") eE = f7[0];
		else if (em == "*") {
			var d2 = x.pth.crds,
				gu = x.ctm,
				fs = d2[0] == d2[2] ? 0 : 1;
			p.qz.push([fs, d2[fs]]);
			E.newPath(x)
		} else if (em == "XN") jq = ka.split(" ")[0];
		else if (em == "XI") {
			var jt = z.Raster,
				ip, aQ;
			if (jt == null || jt.length == 0) {
				console.log("no Raster");
				continue
			}
			if (ka != "XI") {
				continue
			} else {
				if (jt[h].Data == null) {
					continue
				}
				var iL = jt[h++].Data,
					jx = iL._begin,
					ep = iL._end;
				while (P[jx] != 88) jx++;
				jx += 3;
				ip = P.slice(jx, ep);
				aQ = c[d7 - 2].split(" ").map(parseFloat)
			}
			var gz = aQ.slice(8),
				ed = gz[2],
				bo = gz[3],
				d0 = ed * bo,
				c0 = PixelUtil.allocBytes(d0 * 4);
			c0.fill(255);
			var cv = gz[7],
				iH = gz[8],
				bS = gz[6],
				gg = Math.ceil(ed * cv * bS / 8);
			if (cv == 1) {
				if (bS == 8)
					for (var A = 0; A < d0; A++)
						for (var bG = 0; bG < 3; bG++) c0[4 * A + bG] = ip[A];
				else if (bS == 1)
					for (var jj = 0; jj < bo; jj++)
						for (var ay = 0; ay < ed; ay++)
							for (var bG = 0; bG < 3; bG++) c0[4 * (jj * ed + ay) + bG] = 255 * (ip[jj * gg + (ay >>> 3)] >>> 7 - (ay & 7) & 1);
				else throw bS
			} else if (cv == 3)
				for (var A = 0; A < d0; A++)
					for (var bG = 0; bG < 3; bG++) c0[4 * A + bG] = ip[3 * A + bG];
			else if (cv == 4 || cv == 5)
				for (var A = 0; A < d0; A++) {
					var cH = J([ip[cv * A + 0] / 255, ip[cv * A + 1] / 255, ip[cv * A + 2] / 255, ip[cv * A + 3] / 255]);
					c0[4 * A + 0] = cH[0] * 255;
					c0[4 * A + 1] = cH[1] * 255;
					c0[4 * A + 2] = cH[2] * 255
				} else if (cv == 7)
					for (var A = 0; A < d0; A++) {
						c0[4 * A + 0] = ip[cv * A + 0];
						c0[4 * A + 1] = ip[cv * A + 1];
						c0[4 * A + 2] = ip[cv * A + 2]
					} else console.log("unknown number of channels", cv);
			if (iH == 1) {
				var e6 = bo * gg;
				for (var A = 0; A < d0; A++) c0[4 * A + 3] = ip[e6 + A]
			}
			var fi = PixelUtil.isSimpleFlatImage(c0, ed, bo) ? "JPG" : "PNG";
			if (ed * bo < 700 * 700) fi = "PNG";
			var et = FormatHandler.jA(fi).bi([
					[c0.buffer]
				], ed, bo),
				aD = p.rM(new Uint8Array(et), "<Image>", 0, 0);
			p.B.push(aD);
			aD.blendModeKey = K;
			aD.opacity = Math.round(255 * u);
			aD.Oj(eE == 0);
			var v = new Matrix2D;
			v.scale(1, -1);
			v.concat(R(aQ.slice(1)));
			v.concat(R(x.ctm));
			var c7 = aD.rect.clone();
			c7.x = c7.y = 0;
			var ae = PixelUtil.vec.simplifyPath(c7).C;
			PixelUtil.vec.transformCoords(ae, v, ae);
			aD.add.SoLd.Trnf = f.NH.gx(ae);
			aD.add.SoLd.nonAffineTransform = f.NH.gx(ae);
			aD.kX(p, !1)
		} else if (em == "Ln") {
			C = y(ka)
		} else if (em == "u" || em == "q" || em == "Lb") {
			e8.push(kq == 1);
			aI.push((em == "Lb" ? 1 - f7[0] : eE) == 0);
			if (bC) continue;
			p.B.push(p.En())
		} else if (em == "U" || em == "Q" || em == "LB") {
			if (e8.length == 0 || aI.length == 0) throw d7;
			var ga = e8.pop(),
				cY = aI.pop();
			if (em == "LB") ga = iv == 1;
			if (bC) continue;
			var aD = p.V4();
			aD.tH((em == "U" ? "<Group>" : "<Clip Group>") + L);
			if (em == "LB") aD.tH(C);
			if (em == "Q" && $.length != 0) {
				var i4 = $.pop(),
					jS = UDOC.Geometry.isBox(i4, [0, 0, p.m, p.n]);
				if (!jS) n(aD, i4, p)
			}
			aD.add.lsct = ga ? LayerSectionType.open : LayerSectionType.closed;
			aD.blendModeKey = "pass";
			aD.layerFlags = 24;
			aD.Oj(cY);
			p.B.push(aD);
			if (jC) {
				if (p.B[p.B.length - 3].getName() == "</Layer group>") {
					p.B.pop();
					p.B.splice(p.B.length - 2, 1)
				}
				jC = !1
			}
		} else if (em == "Bb" || em == "Bh" || em == "BB") {} else if (em == "Bg") {
			var e7 = i.Setup.Gradient,
				ct = e7[y(ka)];
			if (ct == null) {
				console.log("gradient not found");
				for (var bj in e7) {
					ct = e7[bj];
					break
				}
			}
			V = "GdFl";
			G = I(ct.Ts, ct.ayv)
		} else if (em == "Bm" || em == "Xm") {
			var jo = G.Type.v.GrdT;
			if (jo == "Lnr" && em != "Xm" || jo == "Rdl" && em != "Bm") continue;
			var er = new Point2D(0, 0),
				iV = new Point2D(1, 0),
				h_ = new Matrix2D;
			h_.concat(R(f7));
			h_.concat(R(x.ctm));
			er = h_.kD(er);
			iV = h_.kD(iV);
			var i2 = PixelUtil.vec.boundingBox(x.pth.crds);
			if (i2.W6()) i2 = PixelUtil.vec.boundingBox([er.x, er.y, iV.x, iV.y]);
			if (jo == "Lnr") {
				er.x = (er.x + iV.x) / 2;
				er.y = (er.y + iV.y) / 2
			}
			PixelUtil.color.gradientFromEndpoints(er, iV, i2, G)
		} else if (em == "p") {
			var kj = y(ka),
				a3 = i.Setup.Pattern[kj];
			if (a3.raw == null) {
				var i2 = a3.W5,
					ed = Math.round(i2[2] - i2[0]),
					bo = Math.round(i2[3] - i2[1]),
					hS = new PsdDocument;
				hS.m = ed;
				hS.n = bo;
				hS.buffer = PixelUtil.allocBytes(ed * bo * 4);
				Q(hS, a3.ov, [1, 0, 0, -1, -a3.W5[0], bo + a3.W5[1]], i, z, P);
				a3.raw = new Uint8Array(FormatHandler.jA("PSD").bi(hS))
			}
			var ke = ka.slice(ka.indexOf(")") + 2),
				b1 = ke.slice(0, ke.indexOf("[") - 1).split(" ").map(parseFloat),
				fb = ke.slice(ke.indexOf("[") + 1, ke.indexOf("]")).split(" ").map(parseFloat);
			V = "patt";
			G = [kj, b1, fb]
		} else if (em == "J" || em == "j" || em == "w" || em == "M" || em == "d") {
			for (var A = 1; A < ae.length; A++) {
				var eg = ae[A],
					gK = f7[A - 1];
				if (eg == "w") x.lwidth = gK;
				if (eg == "j") x.ljoin = gK;
				if (eg == "J") x.lcap = gK;
				if (eg == "d") {
					var cN = ka.slice(ka.indexOf("[") + 1, ka.indexOf("]")).trim();
					if (cN.length != 0) {
						var iO = cN.split(" ").map(parseFloat);
						x.dash = iO
					} else if (cN == "") x.dash = []
				}
			}
		} else if (dY == "xa" || dY == "xx") {
			var b6 = f7[4] == null ? f7.slice(0, 3) : [f7[4], f7[5], f7[6]];
			if (dY == "xx" && f7[f7.length - 2] == 2) b6 = J(f7);
			V = "SoCo";
			if (em == "Xa" || em == "Xx") G = b6;
			else b = b6
		} else if (dY == "xk") {
			var b6, j7 = f7[f7.length - 2],
				iM = f7[f7.length - 3];
			if (j7 == 0) b6 = J(f7);
			else if (j7 == 1) {
				b6 = [f7[4], f7[5], f7[6]];
				for (var A = 0; A < 3; A++) b6[A] = iM * 1 + (1 - iM) * b6[A]
			} else throw ka;
			V = "SoCo";
			if (em == "Xk") G = b6;
			else b = b6
		} else if (dY == "k" || dY == "x") {
			if (dY == "x") {
				f7.pop();
				var jr = 1 - f7.pop();
				for (var A = 0; A < 4; A++) f7[A] *= jr
			}
			var b6 = J(f7);
			V = "SoCo";
			if (em == dY) G = b6;
			else b = b6
		} else if (dY == "g") {
			var b6 = [f7[0], f7[0], f7[0]];
			V = "SoCo";
			if (em == dY) G = b6;
			else b = b6
		} else if (dY == "n") {
			if (!bC) E.newPath(x)
		} else if (em == "*u") {
			bC = !0;
			O = 0
		} else if (em == "*U" || dY == "s" || dY == "f" || dY == "b") {
			if (em != "*U" && bC) {
				if (dY == "f" || dY == "b") O |= 1;
				if (dY == "s" || dY == "b") O |= 2;
				continue
			}
			if (em == dY) E.closePath(x);
			if (em == "*U") {
				bC = !1
			}
			var aD;
			if (V == "patt") {
				var a3 = i.Setup.Pattern[G[0]];
				aD = p.rM(a3.raw, "<Pattern>", 0, 0);
				var c7 = aD.rect.clone();
				c7.x = c7.y = 0;
				var ae = PixelUtil.vec.simplifyPath(c7).C,
					fb = R(G[2]);
				fb.cI = fb.xu = 0;
				PixelUtil.vec.transformCoords(ae, fb, ae);
				aD.add.SoLd.Trnf = f.NH.gx(ae);
				aD.add.SoLd.nonAffineTransform = f.NH.gx(ae);
				aD.kX(p, !1)
			} else {
				aD = p.V4();
				aD.layerFlags |= 16;
				var bH = aD.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default));
				bH.strokeEnabled.v = bH.fillEnabled.v = !1;
				if (V == "SoCo") {
					aD.add.SoCo = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("SoFi")]);
					var gi = aD.add.SoCo.Clr.v;
					e(gi, G)
				}
				if (V == "GdFl") aD.add.GdFl = G;
				if (dY == "f" || dY == "b" || em == "*U" && O & 1) bH.fillEnabled.v = !0;
				if (dY == "s" || dY == "b" || em == "*U" && O & 2) a7.Q5(bH, x, 1, a7.JU(b))
			}
			aD.tH("<" + (em == "*U" ? "Compound " : "") + "Path>" + L);
			aD.blendModeKey = K;
			aD.opacity = Math.round(255 * u);
			aD.Oj(eE == 0);
			n(aD, x.pth, p);
			p.B.push(aD);
			E.newPath(x)
		} else if (em == "," && ae[0] == "/XMLUID") {
			var hf = p.B[p.B.length - 1];
			for (var A = 0; A < p.tJ.length; A++)
				if ("(" + p.tJ[A].docRef + ")" == ae[2]) p.tJ[A].docRef = "id('" + hf.add.lyid + "')"
		} else if (em == "," && ae[1] == "/FreeUndo") {
			dK = f7[0]
		} else if (em == "," && ae[1] == "/StoryIndex") {
			var cj = i.Setup.TextDocument,
				jb = null;
			if (!(cj instanceof Array)) cj = i.Setup.TextDocument = j(cj, P);
			var iA = cj[0],
				g9 = cj[2];
			if (iA._DocumentResources) iA = cj[0] = DescriptorMapper.encodeDescriptor(iA);
			else DescriptorMapper.decodeDescriptor(iA);
			var aD = p.V4();
			aD.add.lnsr = "rend";
			aD.add.TySh = dt.Iu(0, 0);
			var h1 = f7[0];
			if (dK == 1) {
				for (var A = 1; A < 60; A++) {
					var bD = c[d7 + A];
					if (bD.endsWith("/StoryIndex ,")) {
						h1 = parseFloat(bD.slice(2, bD.indexOf(" ")));
						jC = !0;
						break
					}
				}
				dK = 0
			}
			var a0 = actionHelper.applyMergedTextDescriptors(iA),
				g5 = aD.add.TySh.zC = a0[h1];
			if (g5 == null) {
				console.log("text not found");
				jC = !1;
				continue
			}
			aD.tH(dt.dW(g5).slice(0, 50));
			aD.blendModeKey = K;
			aD.opacity = Math.round(255 * u);
			aD.Oj(eE == 0);
			var jr = iA._1._1[h1]._1._0[0]._0;
			jr = parseInt(jr.slice(1));
			var dj = iA._0._8._0,
				ef = dj[jr]._0;
			if (ef._0) jb = M(ef._0);
			else if (ef._1) jb = M(ef._1._0);
			else jb = M(ef._2._2).slice(3);
			if (jb.length != 2) {
				var i2 = PixelUtil.vec.boundingBox(jb);
				jb = [i2.x, i2.y];
				if (i2.O() != 0) {
					dt.AO(g5, 1);
					dt.mt(g5, [0, 0, Math.round(i2.m), Math.round(i2.n)])
				}
			}
			var jv = new Matrix2D,
				cz = new Matrix2D(1, 0, 0, 1, jb[0], jb[1]),
				fB = new Matrix2D(1, 0, 0, 1, -g9[0], -g9[1]),
				eC = R(x.ctm),
				iW = new Matrix2D;
			if (ef._2 && ef._2._2) {
				var v = M(ef._2._2);
				iW = new Matrix2D(v[0], v[1], v[2], v[3], v[4], v[5])
			}
			jv.concat(cz);
			jv.concat(iW);
			jv.concat(fB);
			jv.scale(1, -1);
			jv.concat(eC);
			aD.add.TySh.D = jv;
			p.B.push(aD);
			p.ya = !0
		} else if (em == "Tp") {
			S.lV = R(f7)
		} else if (em == "Tf") {
			S.font = ae[0].slice(2)
		} else if (em == "Tk") {
			var aD = p.V4();
			aD.add.lnsr = "rend";
			var jf = aD.add.TySh = dt.Iu(0, 0),
				g5 = jf.zC,
				h_ = S.lV.clone(),
				f9 = h_.Nw();
			h_.concat(R(x.ctm));
			var iC = new Matrix2D(1 / f9, 0, 0, -1 / f9, 0, 0);
			iC.concat(h_);
			jf.D = iC;
			var fP = y(ka);
			aD.tH(fP);
			dt.sT(g5, 0, fP);
			var at = dt.Au(g5, 0, fP.length);
			at.xg.FontSize = f9;
			at.xg.FillColor = {
				Type: 1,
				Values: [1, G[0], G[1], G[2]]
			};
			dt.Wr(at, S.font);
			dt.rW(g5, 0, fP.length, at);
			p.B.push(aD);
			p.ya = !0
		} else if (U && f7.length > 3) {
			var cg = !1;
			for (var A = 0; A < f7.length; A++)
				if (isNaN(f7[A])) cg = !0;
			if (!cg) c[d7 + 1] = (ka + " " + c[d7 + 1]).replace(/\s\s+/g, " ")
		}
	}
}

function t(p, c, v) {
	var i = UDOC.Geometry,
		z = [],
		P = [],
		C = "/DeviceGray",
		h = 1,
		L = [],
		U = 1;
	for (var S = 0; S < p.length; S++) {
		var E = p[S];
		if (E.endsWith(" /CS")) {
			var x = E.indexOf("/NChannel"),
				K = E.indexOf("/Process");
			if (E.startsWith("/DeviceRGB")) {
				C = "/DeviceRGB";
				h = 3
			} else if (E.startsWith("/DeviceGray")) {
				C = "/DeviceGray";
				h = 1
			} else if (E.startsWith("/DeviceCMYK")) {
				C = "/DeviceCMYK";
				h = 4;
				L = [
					[1, 0, 0, 0],
					[0, 1, 0, 0],
					[0, 0, 1, 0],
					[0, 0, 0, 1]
				]
			} else if (x != -1) {
				C = "/DeviceCMYK";
				h = parseInt(E.slice(x - 2, x - 1));
				var u = 1;
				for (var A = 0; A < h; A++) {
					u = E.indexOf("[", u);
					L[h - 1 - A] = E.slice(u + 1, u + 8).split(" ").map(parseFloat);
					u++
				}
			} else if (K) {
				C = "/DeviceGray";
				h = 1
			} else throw E
		} else if (E[0] == "[") {
			var bC = E.indexOf("]"),
				O = E.slice(1, bC).split(" ").map(parseFloat),
				$ = E.slice(bC + 2),
				gX, _, jI, iw, hn, jq;
			if ($ == "/Size" || $ == "/P" || $ == "/R") continue;
			if ($ == "/S" || $ == "/A") {
				gX = O[0];
				_ = O[1];
				jI = O[2];
				iw = O[3];
				hn = O[4];
				jq = O[5]
			} else if ($ == "/N") {
				var iv = h + (U == 1 ? 0 : 1),
					kq;
				gX = O[iv + 0];
				_ = O[iv + 1];
				jI = O[iv + 2];
				iw = O[iv + 3];
				hn = O[iv + 5];
				jq = O[iv + 6];
				if (C == "/DeviceRGB") kq = O.slice(0, 3);
				else if (C == "/DeviceGray") kq = [O[0], O[0], O[0]];
				else if (C == "/DeviceCMYK") {
					var eE = [0, 0, 0, 0];
					for (var A = 0; A < h; A++) {
						var e8 = O[A],
							aI = L[A];
						eE[0] += e8 * aI[0];
						eE[1] += e8 * aI[1];
						eE[2] += e8 * aI[2];
						eE[3] += e8 * aI[3]
					}
					kq = J(eE)
				} else throw kq;
				kq.push(O[h]);
				P.push([kq, gX, _])
			} else throw $;
			z.push([$, hn, jq, gX, _, jI, iw])
		} else if (E == "/E") {
			var dK = z.slice(0),
				jC = 0;
			for (var A = 0; A < z.length; A++) {
				var d7 = z[A][0];
				if (d7 == "/N") {
					jC++;
					continue
				}
				var ka = A,
					hS = A + 1;
				while (z[hS][0] != "/N" && hS < z.length) hS++;
				if (jC == 0 || jC == 3) {
					for (var eH = 0; eH < hS - ka; eH++) dK[ka + eH] = z[hS - 1 - eH]
				} else
					for (var eH = ka; eH < hS; eH++) {
						var kA = dK[eH],
							gq = kA[1];
						kA[1] = kA[5];
						kA[5] = gq;
						gq = kA[2];
						kA[2] = kA[6];
						kA[6] = gq
					}
				A = hS - 1
			}
			z = [];
			for (var A = 0; A < dK.length; A++) {
				var kA = dK[A];
				z.push(kA[1], kA[2], kA[3], kA[4], kA[5], kA[6])
			}
			var hb = z.length;
			i.moveTo(c, z[2], z[3]);
			for (var A = 0; A < hb; A += 6) {
				var jI = z[(A + 4) % hb],
					iw = z[(A + 5) % hb],
					hn = z[(A + 6) % hb],
					jq = z[(A + 7) % hb],
					gX = z[(A + 8) % hb],
					_ = z[(A + 9) % hb];
				i.curveTo(c, jI, iw, hn, jq, gX, _)
			}
			i.closePath(c);
			z = []
		} else if (E.endsWith("/Version")) U = parseFloat(E[0])
	}
	var ex = v.V4();
	ex.layerFlags |= 16;
	ex.tH("<Mesh>");
	var fs = ex.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default));
	fs.strokeEnabled.v = !1;
	if (P.length >= 2) {
		var f_ = 0,
			bD = 0,
			ae = 0;
		for (var A = 0; A < P.length; A++)
			for (var eH = A + 1; eH < P.length; eH++) {
				var em = P[A][0],
					dY = P[eH][0],
					f7 = em[0] - dY[0],
					bM = em[1] - dY[1],
					iP = em[2] - dY[2],
					jp = Math.sqrt(f7 * f7 + bM * bM + iP * iP);
				if (jp > ae) {
					ae = jp;
					f_ = A;
					bD = eH
				}
			}
		var hG = P[f_],
			hf = P[bD],
			d2 = ex.add.GdFl = I(0, [
				[0, hG[0]],
				[1, hf[0]]
			]),
			gu = R(c.ctm),
			jt = gu.kD(new Point2D(hG[1], hG[2])),
			ip = gu.kD(new Point2D(hf[1], hf[2])),
			aQ = PixelUtil.vec.boundingBox(c.pth.crds);
		jt.x = (jt.x + ip.x) / 2;
		jt.y = (jt.y + ip.y) / 2;
		PixelUtil.color.gradientFromEndpoints(jt, ip, aQ, d2)
	}
	n(ex, c.pth, v);
	v.B.push(ex);
	i.newPath(c)
}

function I(p, c) {
	var G = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("GrFl")]),
		v = G.Grad.v;
	v.Intr.v = 0;
	G.Type.v.GrdT = ["Lnr", "Rdl"][p];
	PixelUtil.color.stopsToDescriptor(c, v);
	return G
}

function y(p) {
	var c = p.indexOf(")");
	while (p[c - 1] == "\\") c = p.indexOf(")", c + 1);
	return p.slice(p.indexOf("(") + 1, c).replaceAll("\\", "")
}

function e(p, G) {
	p.Rd.v = G[0] * 255;
	p.Grn.v = G[1] * 255;
	p.Bl.v = G[2] * 255
}

function M(p) {
	var c = [];
	for (var A = 0; A < p.length; A++) c[A] = parseFloat(p[A].slice(1));
	return c
}

function R(p) {
	return new Matrix2D(p[0], p[1], p[2], p[3], p[4], p[5])
}

function J(p) {
	return PixelUtil.lutSkinToneFromDesc(p)
}

function n(p, c, v) {
	p.add.vmsk = new LayerRecord.VectorMask;
	if (c.crds.length != 0) p.add.vmsk.i = r(c);
	p.Ba();
	p.QJ(v)
}

function r(p) {
	var c = {
			C: p.crds,
			F: p.cmds
		},
		v = PixelUtil.vec.QO(c, !1);
	return v
}

function T(p, c) {
	var v = [],
		U = 0,
		K = 0;
	for (var i = 0; i < 2; i++) {
		var z = c[["Raster", "Place"][i]];
		if (z) {
			for (var A = 0; A < z.length; A++) {
				var P = z[A][
					["Data", "PlacedObjectPreview"][i]
				];
				if (P == null) continue;
				var C = P._begin,
					h = P._end;
				if (C > h) C = h;
				v.push([C, h])
			}
		}
	}
	v.sort(function(bC, O) {
		return bC[0] - O[0]
	});
	var L = [c._begin];
	for (var A = 0; A < v.length; A++) {
		var S = v[A],
			C = S[0] + 32;
		L.push(C, S[1]);
		U += S[1] - C
	}
	L.push(c._end);
	var E = c._end - c._begin,
		x = new Uint8Array(E - U);
	for (var A = 0; A < L.length; A += 2) {
		var C = L[A],
			u = L[A + 1] - C;
		x.set(new Uint8Array(p.buffer, C, u), K);
		K += u
	}
	return X.Kw(x).split(/\r\n|\r|\n/)
}

function j(p, c) {
	if (p == null) return [];
	var v = T(c, p),
		i = "",
		z = "",
		P = 0,
		C;
	for (var A = 2; A < v.length; A++) {
		var h = v[A];
		if (h[0] == "%") {
			if (P == 0) i += h.slice(1);
			else z += h.slice(1)
		} else if (h == ";") P++;
		else if (h.endsWith("/RulerOrigin ,")) C = h.split(" ").slice(0, 2).map(parseFloat)
	}
	var L = [i, z],
		U = [];
	for (var A = 0; A < 2; A++) {
		var S = L[A],
			E = new Uint8Array(S.length);
		X.KQ(E, 0, S);
		var x = FromPS.F.ASCII85Decode({
				buff: E,
				off: 0
			}),
			K = i0.Cd(x);
		U.push(K)
	}
	U.push(C);
	return U
}

function g(p, c) {
	if (p == null) return [];
	var v = T(c, p);
	v = v.slice(1);
	for (var A = 0; A < v.length; A++) {
		var i = v[A];
		if (i[0] == "%") v[A] = i.slice(i[1] == "_" ? 2 : 1)
	}
	var z = W(v);
	return z
}

function Y(p, c) {
	var v = {};
	if (p == null) return v;
	for (var A = 0; A < p.length; A++) {
		var i = T(c, p[A]),
			z = i[1],
			P = y(z),
			C = z.slice(z.indexOf(")") + 2).split(" ").map(parseFloat),
			h = [];
		for (var L = 2; L < i.length; L++) h.push(i[L].slice(2));
		v[P] = {
			W5: C,
			ov: h
		}
	}
	return v
}

function k(p, c) {
	var v = {},
		i, z;
	if (p == null) return v;
	var P = [];
	for (var A = 0; A < p.length; A++) {
		var C = T(c, p[A]);
		for (var h = 0; h < C.length; h++) {
			var L = C[h];
			if (L.endsWith("%_Bs")) {
				var U = L.slice(0, L.length - 4);
				if (!U.endsWith(" ")) U += " ";
				L = U + "%_BS"
			}
			if (L[0] == "(") {
				i = y(L);
				var S = L.split(")"),
					E = S[1].split(" ");
				z = parseInt(E[1])
			} else if (L.endsWith("%_BS")) {
				var S = L.split(" "),
					bC, O = 1;
				S.pop();
				S = S.map(parseFloat);
				var x = S.pop(),
					K = S.pop(),
					u = S.pop();
				if (u == 0) bC = [S[0], S[0], S[0]];
				else if (u == 2 || u == 4) bC = [S[4], S[5], S[6]];
				else if (u == 1 || u == 3) bC = J(S);
				else if (u == 6) {
					if (S.length == 3) bC = [S[0], S[0], S[0]];
					else bC = J(S);
					O = S.pop()
				} else {
					throw u
				}
				P.push([x / 100, bC, O, K / 100])
			} else if (L == "BD") {
				for (var $ = 0; $ < P.length - 1; $++) P[$][3] = P[$ + 1][3];
				P.sort(function(gX, _) {
					return gX[0] - _[0]
				});
				v[i] = {
					Ts: z,
					ayv: P
				};
				P = []
			}
		}
	}
	return v
}

function F(p) {
	var c = "Gradient PluginObject Symbol Pattern PatternLayer BrushPattern Encoding Raster Layer Resource Place Rider".split(" "),
		v = Date.now(),
		i = 0,
		z = [],
		P = {
			Header: {}
		},
		C = [P],
		h = p.length;
	while (i < h) {
		var L = i;
		while (L != h && p[L] != 13 && p[L] != 10) {
			L++
		}
		if (p[i] == 37 && p[i + 1] == 95 && p[i + 2] == 37) i += 2;
		if (p[i] == 37 && (p[i + 1] == 37 || p[i + 1] == 65)) {
			var U = X.Ko(p, i, L - i);
			if (U == "%%EOF") break;
			if (U == "%%EndComments" || U == "%EndComments" || U == "%AI5_Begin_NonPrinting" || U == "%AI5_End_NonPrinting--" || U.startsWith("%AI17_Begin_Content_if_version_gt") || U == "%AI17_End_Versioned_Content") {} else {
				var S = U.indexOf("Begin"),
					E = Math.max(U.indexOf("_End"), U.indexOf("%End"));
				if (S != -1 && U[S - 1] != "%" && U[S - 1] != "_") S = -1;
				if (S != -1) {
					var x = U.slice(S + 5).split(":")[0],
						K = {
							_begin: i,
							_end: i
						},
						u = C[C.length - 1];
					if (c.indexOf(x) != -1) {
						if (u[x] == null) u[x] = [];
						u[x].push(K)
					} else {
						if (u[x] != null) {
							console.log(C);
							throw U
						}
						u[x] = K
					}
					C.push(K);
					if (U.startsWith("%%BeginData")) {
						L = X.dp(p, "%%EndData", i)
					} else if (U == "%AI9_BeginDocumentData") L = X.dp(p, "%AI9_EndDocumentData", L);
					else if (U == "%AI11_BeginTextDocument") L = X.dp(p, "%AI11_EndTextDocument", L)
				} else if (E != -1) {
					if (C.length > 1) C.pop()._end = i
				} else if (C.length == 1 && (U.startsWith("%AI") || U.startsWith("%%") && U.indexOf(" ") != -1)) {
					var bC = 1;
					if (U.startsWith("%AI"))
						while (U[bC] != "_" && bC < U.length) bC++;
					var O = U.indexOf(":");
					if (O == -1) O = U.indexOf(" ");
					var $ = U.slice(bC + 1, O),
						gX = U.slice(O + 1).trim();
					P.Header[$] = gX
				}
			}
		}
		i = L;
		if (p[i] == 13) i++;
		if (p[i] == 10) i++
	}
	return P
}

function D(p, c) {
	var v = Date.now(),
		i = new Uint8Array(p),
		z, P = i[2] == 68;
	if (c) console.log(!P ? "EPS" : "PDF");
	if (P) {
		var C = X.dp(i, "/AIMetaData "),
			iw = !1,
			hn = !1;
		while (i[C] != 60) C--;
		C--;
		var h = X.dp(i, ">>", C),
			L = X.Ko(i, C + 2, h - C - 2).split("/"),
			U = [];
		for (var A = 0; A < L.length; A++) {
			var S = L[A],
				E = S.startsWith("AIPrivateData"),
				x = S.startsWith("AIPDFPrivateData");
			if (!E && !x) continue;
			var K = S.trim().split(/\s+/),
				u = parseInt(K[1]),
				bC = parseInt(K[0].slice(E ? 13 : 16));
			U.push([bC, u])
		}
		if (c) console.log("--- map made", Date.now() - v);
		v = Date.now();
		var O = FromPDF.indexOfXref(i),
			$ = [],
			gX = FromPDF.readXrefTrail(i, O, $),
			_ = {
				buff: i,
				off: 0
			},
			jI = new Array(U.length),
			jq = C;
		for (var A = 0; A < U.length; A++) {
			var bC = U[A][0],
				u = U[A][1],
				iv = FromPDF.getIndirect(u, 0, _, $),
				kq = iv.buff,
				eE = iv["/Filter"],
				e8 = 0;
			if (eE != null && typeof eE == "string") eE = [eE];
			var aI = X.Ko(kq, e8, e8 + 20);
			if (aI == "%AI12_CompressedData") {
				e8 += 20;
				iw = !0
			} else if (aI == "%AI24_ZStandard_Data") {
				e8 += 20;
				hn = !0
			}
			kq = new Uint8Array(kq.buffer, kq.byteOffset + e8, kq.length - e8);
			if (eE)
				for (var dK = 0; dK < eE.length; dK++) {
					var jC = eE[dK];
					if (jC == "/FlateDecode") kq = pako.inflate(kq);
					else if (jC == "/ASCIIHexDecode") kq = FromPS.F.HexDecode({
						buff: kq,
						off: 0
					});
					else if (jC == "/ASCII85Decode") kq = FromPS.F.ASCII85Decode({
						buff: kq,
						off: 0
					});
					else throw jC
				}
			jI[bC - 1] = kq
		}
		if (c) console.log("--- arrays found", Date.now() - v);
		v = Date.now();
		var d7 = X.Ko(jI[0], 0, 13);
		if (d7 == "%%BoundingBox" || d7 == "%AI7_Thumbnai") jI = jI.slice(1);
		if (d7 == "%AI24_ZStanda") {
			jI[0] = jI[0].slice(20);
			hn = !0
		}
		if (X.Ko(jI[0], 0, 13) == "%AI12_Compres") {
			jI[0] = jI[0].slice(20);
			iw = !0
		}
		z = q(jI);
		if (c) console.log("--- concatenated", Date.now() - v);
		v = Date.now();
		if (iw) z = UZIP.inflate(z);
		if (hn) z = FormatHandler.R5.OY(z);
		if (c) console.log("--- inflated", Date.now() - v);
		v = Date.now()
	} else {
		var ka = X.Kw(i);
		if (ka.indexOf("%AI5_BeginLayer") != -1) {
			z = i
		} else {
			var hS = ka.split(/[\n\r]+/),
				eH = [],
				kA = !1;
			for (var gq = 0; gq < hS.length; gq++) {
				var hb = hS[gq].trim();
				if (hb == "%AI9_PrivateDataEnd") {
					kA = !1;
					break
				} else if (hb == "%AI9_DataStream" || hb == "%AI24_DataStream") {
					kA = !0
				} else if (kA) eH.push(hb.slice(1))
			}
			var fs = X.zE(eH.join("")),
				f_ = FromPS.F.ASCII85Decode({
					buff: fs,
					off: 0
				});
			if (f_[0] == 120 && f_[1] == 156) z = UZIP.inflate(f_);
			else z = FormatHandler.R5.OY(f_)
		}
	}
	return z
}

function q(p) {
	var c = 0,
		i = 0;
	for (var A = 0; A < p.length; A++) c += p[A].length;
	var v = new Uint8Array(c);
	for (var A = 0; A < p.length; A++) {
		var z = p[A];
		v.set(z, i);
		i += z.length
	}
	return v
}

function H(p, c) {
	for (var A = 0; A < c.length; A++)
		if (p.startsWith(c[A])) return !0;
	return !1
}

function W(p) {
	var c = [],
		v = [],
		top = -1,
		i, z = null,
		P = null,
		C = null,
		h = 0;
	for (var L = 0; L < p.length; L++) {
		var U = p[L];
		if (i) {
			U = i + U;
			i = null
		}
		var S = "\t".repeat(c.length);
		if (z != null) {
			z.push(U);
			if (U.endsWith("~>")) {
				var E = X.zE(z.join("")),
					x = FromPS.F.ASCII85Decode({
						off: 0,
						buff: E
					});
				c.push(x);
				v.push(!1);
				top++;
				z = null
			}
		} else if (C != null) {
			if (U == "X+") {
				if (h == 1) {
					c.push(C);
					v.push(!1);
					top++;
					C = null
				} else h--
			} else if (U == "X=") h++;
			else C.push(U)
		} else if (P != null) {
			if (U == "/Def ; ") {
				c.push(P);
				v.push(!1);
				top++;
				P = null
			} else P.push(U)
		} else if (U == "/Binary : /ASCII85Decode ,") {
			z = []
		} else if (U == "X=") {
			C = [];
			h++
		} else if (U == "/FillStyle : 0 O") {
			P = ["0 O"]
		} else if (U == "/SVGFilter :" || U == "; /Def ;") continue;
		else if (U.startsWith("/XMLUIDREF :")) {
			var K = Z(U);
			c[top][K[4]] = K[2]
		} else if (U.startsWith("/") && U[1].toUpperCase() != U[1].toLowerCase()) {
			if (U.startsWith("/XMLUID")) {
				var K = Z(U);
				if (v[top]) throw "e";
				c[top][K[4]] = K[2]
			}
			if (U.startsWith("/GObjRef")) {
				var K = Z(U);
				if (K.length == 7) {
					if (v[top]) throw "e";
					c[top][K[5]] = K[2]
				} else {
					if (!v[top]) throw "e";
					c[top].push(K[2])
				}
			} else {
				var u = U.startsWith("/Array") || U.startsWith("/Document");
				c.push(u ? [] : {});
				v.push(u);
				top++
			}
		} else if (U.endsWith(",")) {
			var bC, O, K = Z(U);
			K.pop();
			if (K[0] == ";" || K.length == 1 || U == " ,") {
				O = c.pop();
				v.pop();
				top--;
				bC = v[top] ? null : K.pop()
			} else {
				bC = v[top] ? null : K.pop();
				var $ = K.pop(),
					gX = K[0];
				if ($ == "/Int") O = parseInt(gX);
				else if ($ == "/Real") O = parseFloat(gX);
				else if ($ == "/Bool") O = gX == "1";
				else if ($ == "/String" || $ == "/UnicodeString") O = K.join("");
				else if ($ == "/RealMatrix" || $ == "/RealPoint" || $ == "/RealPointRelToROrigin") O = K.map(parseFloat);
				else throw $
			}
			if (v[top]) c[top].push(O);
			else c[top][bC] = O
		} else if (U == ";") {} else if (U == "") {} else {
			if (U.indexOf("/RealPoint") != -1) {} else if (U.startsWith("(") && U.endsWith(")")) {} else if (U.endsWith("/RealMatrix")) {} else throw U;
			i = i ? i + U : U
		}
	}
	return c
}

function Z(p) {
	var c = 0,
		v = [];
	while (c < p.length) {
		var i = p[c],
			z = i.charCodeAt(0);
		if (i == " ") c++;
		else if (i == "," || i == ";" || i == ":") {
			v.push(i);
			c++
		} else if (i == "(") {
			var P = c + 1;
			while (!(p[P] == ")" && p[P - 1] != "\\")) P++;
			var C = p.slice(c + 1, P);
			v.push(C);
			c = P + 1
		} else if (i == "/" || i == "-" || 48 <= z && z <= 57) {
			var P = c;
			while (p[P] != " ") P++;
			v.push(p.slice(c, P));
			c = P
		} else throw i
	}
	return v
}

function B(p) {
	var c = "";
	for (var A = 0; A < p.length; A++) {
		if (p[A] == "_" && p[A + 1] == "x") {
			var hZ = parseInt(p.slice(A + 2, A + 4), 16);
			c += String.fromCharCode(hZ);
			A += 4
		} else if (p[A] == "_") c += " ";
		else c += p[A]
	}
	return c
}

function a(p) {
	var c = "xmlnode-nodename",
		v = "xmlnode-nodevalue",
		i = "xmlnode-attributes",
		z = "xmlnode-children",
		P = p[c],
		C = p[i],
		h = p[z],
		L = {
			_nam: P
		};
	for (var U in C) {
		var S = C[U];
		if (Object.keys(S[i]).length != 0 || S[z].length != 0) throw "e";
		if (S[c] != U) throw "e";
		L[U] = S[v]
	}
	if (h.length == 0) return L;
	var E = L.cln = [];
	for (var A = 0; A < h.length; A++) E.push(a(h[A]));
	return L
}

function m(p) {
	var c = "xmlnode-nodename",
		v = "xmlnode-nodevalue",
		i = "xmlnode-attributes",
		z = "xmlnode-children",
		P = p[c].split(":").pop().replace("#", ""),
		C = p[i],
		h = p[z],
		L = "<" + P;
	for (var U in C)
		if (U != "xmlns" && U != "xmlns:v") L += " " + U.split(":").pop() + "=\"" + C[U][v] + "\"";
	L += ">" + (h.length == 0 ? "" : "\n");
	for (var A = 0; A < h.length; A++) L += m(h[A]);
	if (p[v]) L += p[v];
	return L + "</" + P + ">\n"
}
return l
}();

// Adobe InDesign low-level storage parser namespace
function dr() {}
dr.Cd = function() {
var l, d, G, b, V, g, Y, k;

function Q(i) {
	return X.Ub(l, i)
}

function t(i) {
	return X._w(l, i)
}

function I(i) {
	return X.Lv(l, i)
}

function y(i) {
	return X.EY(l, i)
}

function e(i, z) {
	var P = [];
	for (var A = 0; A < z; A++) P.push(I(i + A * 4));
	return P
}

function M(i, z) {
	var P = [];
	for (var A = 0; A < z; A++) P.push(Q(i + A * 8));
	return P
}

function R(i) {
	return I((i + 1) * 4096 - 12)
}

function J(i) {
	return I((i + 1) * 4096 - 8)
}

function n(i, d, z, P) {
	if (b[i] == null) b[i] = [];
	b[i].push([P, new Uint8Array(l.buffer, d, z)])
}

function r(i, z, P, C) {
	var h = G[i],
		d = h * 4096;
	d = d + I(d + 4096 - 24 - 12 - z * 4);
	var L = t(d),
		U = l[d + 2],
		S = l[d + 3];
	if (z != U) throw U;
	if (S == 0) n(C, d + 4, P, 9);
	else {
		var E = t(d + 6),
			x = I(d + 8);
		n(C, d + 12, L - 12, 9);
		r(x, E, P - (L - 12), C)
	}
}

function T() {
	var i = I(352),
		z = I(i * 4096 + 128),
		P = I(936);
	G = [];
	b = {};
	V = {};
	for (var A = 0; A < 1e9; A++) {
		var C = I(P * 4096 + 128 + A * 4);
		if (C == 0) break;
		var h = e(C * 4096 + 128, 4096 - 128 - 12 >>> 2);
		G = G.concat(h)
	}
	for (var L = 0; L < G.length; L++) {
		var U = G[L],
			S = R(U);
		if (S != 6) continue;
		var d = U * 4096,
			E = I(d);
		d += 4;
		for (var A = 0; A < E; A++) {
			var x = I(d);
			d += 4;
			var K = I(d);
			d += 4;
			var u = I(d);
			d += 4;
			var bC = I(d);
			d += 4;
			if (x == 0) V[K] = u;
			else {
				var O = u & 65535,
					$ = u >>> 16;
				if ($ == 0) n(K, bC * 4096, O, 8);
				else r(bC, $, O, K)
			}
		}
	}
	var g = {};
	for (var gX in b) {
		var _ = b[gX],
			jI = _.length;
		if (jI == 1) g[gX] = _[0][1];
		else {
			var iw = 0,
				d = 0;
			for (var A = 0; A < jI; A++) iw += _[A][1].length;
			var hn = g[gX] = new Uint8Array(iw);
			for (var A = 0; A < jI; A++) {
				hn.set(_[A][1], d);
				d += _[A][1].length
			}
		}
	}
	return g
}

function j(d, i) {
	var z = i ? I(d) : t(d),
		P = "";
	d += i ? 4 : 2;
	while (P.length < z) {
		var C = l[d++],
			h = l[d++],
			L = 0,
			U = "";
		C += (h & 15) * 256;
		h = h & 240;
		for (var A = 0; A < C; A++) {
			if (h == 64) L = l[d++];
			else if (h == 128) L = l[d++] | l[d++] << 8;
			else throw h;
			U += String.fromCharCode(L)
		}
		P += U
	}
	return [P, d]
}

function F(d, i, z) {
	var P = e(d, i);
	for (var A = 0; A < i; A++) {
		z.push(A);
		if (P[A] > Y) throw "e";
		P[A] = q(P[A], z);
		z.pop()
	}
	return P
}
var D = {};

function q(i, z) {
	if (k.indexOf(i) != -1) return g[i];
	if (i == 0) return null;
	if (g[i] == null) return null;
	if (!(g[i] instanceof Uint8Array)) return g[i];
	var P = l,
		d = 0;
	l = g[i];
	k.push(i);
	var C = V[i].toString(16),
		h = g[i] = {
			_type: v[C] ? v[C] + ":" + C : "typ-" + C,
			_eid: i
		};
	while (d + 8 < l.length) {
		var L = I(d);
		d += 4;
		var U = L.toString(16),
			S = I(d);
		d += 4;
		var E = d + S;
		if (d + S > l.length) {
			h._bin = l;
			break
		}
		H(U, a, h, d, S, z);
		d = E
	}
	l = P;
	k.pop();
	return h
}

function H(i, z, P, d, C, h) {
	var L = z[i + ":" + P._type];
	if (L == null) L = z[i];
	h.push(L ? L[0] == "" ? i : L[0] : i);
	if (L) {
		var U = L[0],
			S = null,
			E = L[1];
		if (U == "") U = E + "-" + i;
		if (p[E] && C != p[E]) {
			console.log(E);
			console.log(i, L);
			console.log(l.slice(d, d + C));
			throw "e"
		}
		if (E == "mat") S = M(d, 6);
		else if (E == "mmat") S = [q(I(d), h), M(d + 6, 6)];
		else if (E == "rect") S = M(d, 4);
		else if (E == "mrct") {
			S = M(d, 4);
			S.push(t(d + 32))
		} else if (E == "doub") S = Q(d);
		else if (E == "pointArr") {
			var x = t(d);
			S = e(d + 2, x * 2)
		} else if (E == "usrt") S = t(d);
		else if (E == "uint") S = I(d);
		else if (E == "pntr" || E == "ptr6") {
			S = q(I(d), h)
		} else if (E == "bool2") {
			if (t(d) != 0 && t(d) != 1) throw t(d);
			S = t(d) == 1
		} else if (E == "bool4") {
			if (I(d) != 0 && I(d) != 1) throw i + "," + I(d);
			S = I(d) == 1
		} else if (E == "color") {
			if (C != 38 && C != 30) throw C;
			var K = I(d),
				u = t(d + 4);
			S = [K];
			for (var A = 0; A < u; A++) S.push(Q(d + 6 + A * 8))
		} else if (E == "path") {
			var bC = d + C;
			S = [];
			var O = I(d);
			d += 4;
			for (var A = 0; A < O; A++) {
				var $ = [
					[]
				];
				S.push($);
				var gX = I(d);
				d += 4;
				for (var _ = 0; _ < gX; _++) {
					var K = I(d);
					d += 4;
					if (K < 2) {
						$[0].push([K, Q(d), Q(d + 8), Q(d + 16), Q(d + 24), Q(d + 32), Q(d + 40)]);
						d += 48
					} else if (K == 2) {
						$[0].push([K, Q(d), Q(d + 8)]);
						d += 16
					} else throw K
				}
				$.push(t(d));
				d += 2
			}
		} else if (E == "ptrAndList") {
			var jI = I(d),
				iw = I(d + 4);
			S = F(d + 8, iw, h);
			S.unshift(q(jI, h))
		} else if (E == "ptrArray" || E == "ptrArrayX") {
			var hn = C >> 2;
			if (E == "ptrArray") {
				hn = I(d);
				d += 4;
				if (C != 4 + hn * 4) throw C
			}
			S = F(d, hn, h)
		} else if (E == "ptrArray2") {
			var hn = I(d);
			d += 4;
			S = F(d, hn, h);
			d += hn * 4;
			hn = I(d);
			d += 4;
			S.push(F(d, hn, h))
		} else if (E == "cldrn") {
			var jq = I(d),
				iv = I(d + 4),
				hn = I(d + 8);
			S = {
				$: q(jq, h),
				Zt: q(iv, h),
				iV: F(d + 12, hn, h)
			};
			if (C != 12 + hn * 4) {
				console.log(i, sa);
				throw "e"
			}
			if (jq == 0) throw jq
		} else if (E == "aprnc") {
			var hn = I(d);
			d += 4;
			S = {};
			for (var A = 0; A < hn; A++) {
				var kq = I(d),
					eE = t(d + 4),
					e8 = t(d + 6);
				d += 8;
				var aI = c[kq.toString(16)];
				if (aI == null) aI = "prm-" + kq.toString(16);
				else aI = B(aI);
				S[aI] = [];
				for (var _ = 0; _ < e8; _++) {
					var dK = I(d),
						jC = t(d + 4),
						d7 = null;
					d += 6;
					if (dK == 28264) d7 = Q(d);
					else if (dK == 28263) d7 = I(d);
					else if (dK == 279) d7 = q(I(d), h);
					else if (dK == 28261) d7 = t(d) == 1;
					else if (dK == 28265) d7 = [Q(d), Q(d + 4)];
					else if (dK == 83231) d7 = j(d + 3)[0];
					else if (dK == 28259 || dK == 28260 || dK == 23094 || dK == 67679) {
						d7 = l.slice(d, d + jC)
					} else throw dK.toString(16);
					S[aI].push(d7);
					d += jC
				}
			}
		} else if (E == "lopts") {
			S = {
				a1i: t(d + 0) == 1,
				show: t(d + 2) == 1,
				atF: t(d + 4) == 1,
				jj: I(d + 10),
				name: j(d + 21)[0]
			}
		} else if (E == "origin") {
			var bC = d + C;
			if (l[d++] != 1) throw "e";
			var x = I(d);
			d += 4;
			var ka = X.Ko(l, d, x);
			d += x;
			if (l[d++] != 1) throw "e";
			var hS = l[d++];
			if (hS != 1 && hS != 53) throw hS;
			var eH = t(d);
			d += 2;
			if (eH != 0 && eH != 1) throw eH;
			var kA = I(d);
			d += 4;
			if (kA != 0 && kA != 1) throw kA;
			var gq = I(d);
			d += 4;
			if (gq != 0 && gq != 2 && gq != 3) throw gq;
			var hb = I(d);
			d += 4;
			var ex = j(d, !0);
			d = ex[1];
			ex = ex[0];
			var fs = I(d),
				f_ = I(d + 4);
			d += 8;
			var bD = I(d);
			d += 4;
			if (bD != 0) throw bD;
			var ae = I(d);
			d += 4;
			d += 3;
			var em = j(d)[0];
			d += 2 + 2 + em.length;
			S = {
				file: ka,
				id: ex,
				oE: em
			}
		} else if (E == "string") S = j(d + 3)[0];
		else if (E == "relEnt") {
			var dY = t(d);
			d += 2;
			S = [];
			for (var A = 0; A < dY; A++) S.push([I(d + A * 8), q(I(d + A * 8 + 4), h)])
		} else if (E == "textData") {
			var bC = d + C,
				f7 = I(d);
			d += 4;
			var kq = I(d);
			d += 4;
			var u = t(d);
			d += 2;
			var bM = [];
			for (var A = 0; A < u; A++) {
				var iP = I(d);
				d += 4;
				if (f7 == 514) bM.push(j(d, !0)[0]);
				else if (f7 == 515) {
					var jp = I(d),
						i = I(d + 4),
						hG = W(d + 8, h);
					bM.push([jp, q(i, h), hG])
				} else if (f7 == 516) {
					var jp = I(d),
						i = I(d + 4),
						hf = t(d + 8),
						hG = W(d + 8, h);
					bM.push([jp, q(i, h), hG])
				} else bM.push(l.slice(d, d + iP));
				d += iP
			}
			if (bC - d != 12) throw bC - d;
			S = bM
		} else if (E == "storyProps") {
			var d2 = I(d);
			if (t(d + 4) > 1) throw "e";
			var gu = q(I(d + 6), h),
				u = I(d + 10),
				jt = q(I(d + 14 + u * 4), h);
			S = {
				a3E: d2,
				anS: gu,
				iV: F(d + 14, u, h),
				arS: jt,
				apD: e(d + 14 + u * 4 + 4, 4)
			}
		} else if (E == "styleProps") S = W(d, h);
		else if (E == "bounds") {
			var ip = d,
				dY = I(d);
			d += 4;
			S = [];
			for (var A = 0; A < dY; A++) {
				var aQ = [];
				S.push(aQ);
				for (var _ = 0; _ < 4; _++) aQ.push(Q(d + _ * 8));
				d += 32;
				aQ.push(l[d]);
				d++
			}
			if (d != ip + C) throw "e"
		} else if (E == "columnPos") {
			var dY = I(d);
			d += 4;
			S = [M(d, dY), Q(d + dY * 8)];
			d += dY * 8 + 8
		} else if (E == "StyleName") {
			S = [I(d + 4)]
		} else if (E == "fontName") {
			var bC = d + C;
			S = [t(d)];
			d += 2;
			for (var A = 0; A < 2; A++) {
				var ka = j(d + 3);
				d = ka[1];
				S.push(ka[0])
			}
			S.push(I(d));
			d += 4;
			var iL = t(d);
			d += 2;
			S.push(iL);
			var jx = t(d);
			d += 2;
			var ep = [];
			S.push(ep);
			for (var gz = 0; gz < jx; gz++) {
				var ed = [];
				ep.push(ed);
				var ka = j(d + 3);
				d = ka[1];
				ed.push(ka[0]);
				var bo = t(d);
				d += 2;
				var ka = X.Ko(l, d, bo);
				d += bo;
				ed.push(ka);
				for (var A = 0; A < 3; A++) {
					var ka = j(d + 3);
					d = ka[1];
					ed.push(ka[0])
				}
				ed.push(I(d));
				d += 4;
				var ka = j(d, !0);
				d = ka[1];
				ed.push(ka[0])
			}
			if (d + 4 != bC) throw "e";
			S.push(I(d))
		} else throw E;
		if (P[U] != null) {
			console.log(U, P[U], S);
			console.log(h.slice(0));
			console.log(eid, i, d, P[U], L, S);
			throw "e"
		}
		P[U] = S
	} else {
		var d0 = l.slice(d, d + C);
		P["prop-" + i] = d0
	}
	h.pop()
}

function W(d, i) {
	var z = t(d);
	d += 2;
	var P = {};
	for (var A = 0; A < z; A++) {
		var C = I(d);
		d += 4;
		var h = C.toString(16),
			L = t(d);
		d += 2;
		var U = t(d);
		d += 2;
		for (var S = 0; S < U; S++) {
			var E = I(d);
			d += 4;
			var x = t(d);
			d += 2;
			H(h, m, P, d, x, i);
			d += x
		}
	}
	return P
}

function Z(i) {
	l = new Uint8Array(i);
	g = T();
	var z = g[2147483649];
	z = X.Kw(z, 4, z.length - 4);
	delete g[2147483649];
	Y = 0;
	for (var P in g) Y = Math.max(Y, parseInt(P));
	k = [];
	var C = {};
	for (var P in g) C[P] = g[P];
	for (var P in g) q(parseInt(P), []);
	return g
}

function B(i) {
	i = i.split(" ").join("");
	return i[0].toLowerCase() + i.slice(1)
}
var a = {
		"2d2": ["", "bool2"],
		"1623": ["", "bool2"],
		"2c32": ["visible", "bool2"],
		cd1f: ["", "bool2"],
		"1b8": ["", "bool4"],
		"2c2d": ["locked", "bool4"],
		"118": ["", "uint"],
		"119": ["bitmap", "uint"],
		"117": ["", "uint"],
		"117:Page:50f": ["color", "pntr"],
		"117:Fill:1f05": ["parentFill", "pntr"],
		"56c": ["", "uint"],
		bf31: ["", "uint"],
		ca58: ["", "uint"],
		cade: ["", "uint"],
		"313": ["", "pntr"],
		a6b: ["trapPreset", "pntr"],
		e02: ["", "pntr"],
		"170d": ["bitmapFill", "pntr"],
		"1b916": ["", "pntr"],
		"205": ["columns", "ptrAndList"],
		"220": ["obj228", "ptrAndList"],
		"2ab": ["story", "ptrArrayX"],
		"302": ["layer", "ptr6"],
		"21f": ["rect", "rect"],
		"27e": ["", "rect"],
		"2d6": ["rect", "rect"],
		"565": ["rect", "rect"],
		"5dd": ["rect", "rect"],
		"1633": ["rect", "rect"],
		"51a": ["margins", "mrct"],
		"151": ["transform", "mat"],
		"2de": ["transform", "mat"],
		"40d": ["transform", "mat"],
		"56e": ["transform", "mat"],
		"5cc": ["transform", "mat"],
		"140f": ["mTransform", "mmat"],
		"14527": ["transform", "mat"],
		"528": ["columnPos", "columnPos"],
		"261": ["relEnt", "relEnt"],
		"262": ["textData", "textData"],
		"15b": ["children", "cldrn"],
		"2c8": ["children", "cldrn"],
		"303": ["children", "cldrn"],
		"503": ["children", "cldrn"],
		"28dc": ["children", "cldrn"],
		"104e5": ["children", "cldrn"],
		"1b95a": ["children", "cldrn"],
		"1f01": ["color", "color"],
		"162b": ["path", "path"],
		"6e03": ["appearance", "aprnc"],
		"304": ["lopts", "lopts"],
		"2c10": ["name", "string"],
		"8c92": ["origin", "origin"],
		"3e05": ["name", "fontName"],
		"20f": ["", "ptrArrayX"],
		"210": ["", "ptrArrayX"],
		"211": ["", "ptrArrayX"],
		"222": ["stories", "ptrArray2"],
		"223": ["stoProps", "storyProps"],
		"23f": ["styProps", "styleProps"],
		"2c6b": ["bounds", "bounds"],
		"230": ["name", "StyleName"],
		"301": ["layers", "ptrArray"],
		"501": ["spreads", "ptrArray"],
		"4c01": ["sections", "ptrArray"],
		"1401": ["masterSpreads", "ptrArray"],
		a67: ["", "ptrArray"],
		"1f05": ["colors", "ptrArray"],
		"1f0c": ["", "ptrArray"],
		"1f60": ["", "ptrArray"],
		"1f61": ["", "ptrArray"],
		"288a": ["", "ptrArray"],
		"377c": ["textFrames", "ptrArray"],
		"3e06": ["", "ptrArray"],
		"1081d": ["", "ptrArray"]
	},
	m = {
		"1b01": ["fillColor", "pntr"],
		"1b02": ["fontStyle", "string"],
		"1b03": ["FontSize", "doub"],
		"1b11": ["FontCaps", "usrt"],
		"1b16": ["StartIndent", "doub"],
		"1b17": ["EndIndent", "doub"],
		"1b18": ["FirstLineIndent", "doub"],
		"1b1b": ["leading", "doub"],
		"1b26": ["SpaceBefore", "doub"],
		"1b27": ["SpaceAfter", "doub"],
		"1b2a": ["Underline", "bool2"],
		"1b2b": ["font", "pntr"],
		"1b3c": ["FontBaseline", "usrt"],
		"1b3d": ["Strikethrough", "bool2"],
		"1b7e": ["align", "usrt"]
	},
	p = {
		mmat: 54,
		mat: 48,
		mrct: 34,
		rect: 32,
		doub: 8,
		ptr6: 6,
		uint: 4,
		pntr: 4,
		bool4: 4,
		bool2: 2,
		usrt: 2
	},
	c = {
		"10816": "Object Opacity",
		"10891": "Stroke Opacity",
		"10892": "Stroke Blending Mode",
		"10893": "Stroke Knockout Group",
		"10894": "Stroke Isolate Blending",
		"108d8": "Fill Opacity",
		"108d9": "Fill Blending Mode",
		"108da": "Fill Knockout Group",
		"108db": "Fill Isolate Blending",
		"10817": "Object Blending Mode",
		"10818": "Object Knockout Group",
		"10819": "Object Isolate Blending",
		"6e64": "Stroke Swatch",
		"6e65": "Stroke Weight",
		"6e66": "Stroke Tint",
		"6e6e": "Stroke Type",
		"6e68": "Fill Swatch",
		"6e69": "Fill Tint",
		"6e6b": "Stroke Cap",
		"6e6c": "Stroke Join",
		"6e6d": "Stroke Mitre Limit",
		"6e8c": "Stroke Align Stroke",
		"6e71": "Stroke Start Arrrowhead",
		"6e72": "Stroke End Arrrowhead",
		"6e89": "Stroke Gap Color Swatch",
		"6e8a": "Stroke Gap Tint",
		"6e84": "Stroke Arrowhead Align",
		"6e95": "Stroke Start Arrowhead Scale",
		"6e96": "Stroke End Arrowhead Scale",
		"6e8f": "Corner 1 Shape",
		"6e6f": "Corner 2 Shape",
		"6e90": "Corner 3 Shape",
		"6e91": "Corner 4 Shape",
		"6e70": "Corner 1 Size",
		"6e92": "Corner 2 Size",
		"6e93": "Corner 3 Size",
		"6e94": "Corner 4 Size",
		"1081a": "Drop Shadow",
		"1081b": "Drop Shadow DX",
		"1081c": "Drop Shadow DY",
		"1081e": "Drop Shadow Opacity",
		"1081f": "Drop Shadow BMode",
		"10820": "Drop Shadow Size",
		"10837": "Drop Shadow Color",
		"1084d": "Inner Shadow",
		"1084e": "Inner Shadow Color",
		"1084f": "Inner Shadow BMode",
		"10850": "Inner Shadow Opacity",
		"10851": "Inner Shadow Angle",
		"10852": "Inner Shadow Dist",
		"10855": "Inner Shadow Size",
		"10857": "Oglow",
		"10858": "Oglow BMode",
		"10859": "Oglow Opacity",
		"1085b": "Oglow Color",
		"1086d": "Oglow Choke",
		"1085e": "Oglow Size",
		"1085f": "Iglow",
		"10860": "Iglow BMode",
		"10861": "Iglow Opacity",
		"10863": "Iglow Color",
		"10865": "Iglow Choke",
		"10866": "Iglow Size",
		"10868": "Bevel",
		"1086b": "Bevel Depth",
		"1086d": "Bevel Size",
		"1086f": "Bevel Angle",
		"10870": "Bevel Alt",
		"10872": "Bevel ColorH",
		"10873": "Bevel BModeH",
		"10874": "Bevel OpacityH",
		"10875": "Bevel ColorS",
		"10875": "Bevel BModeS",
		"10877": "Bevel OpacityS",
		"10878": "Satin",
		"10879": "Satin Color",
		"1087a": "Satin BMode",
		"1087b": "Satin Opacity",
		"1087c": "Satin Angle",
		"1087d": "Satin Dist",
		"1087e": "Satin Size",
		"1087f": "Satin Invert",
		"10821": "Basic Feather",
		"10822": "Basic Feather Width",
		"10895": "Stroke Drop Shadow",
		"10899": "Stroke Drop Shadow Blending Mode",
		"1eb8f": "GradientFeatherSetting GradientStart",
		"1eb8e": "GradientFeatherSetting Length",
		"14534": "name"
	},
	v = {
		e01: "Document",
		"301": "RESpread",
		"236": "REParStyle",
		"302": "Layer",
		"401": "Group",
		"501": "Spread",
		"50f": "Page",
		"227": "Column",
		"201": "Story",
		"205": "Style",
		"263": "TextFrame",
		a32: "Trapping",
		"1f05": "Fill",
		"3e03": "Font",
		"6201": "Path",
		ca18: "StoryText"
	};
return Z
}();

// Adobe InDesign (INDD) document importer namespace
function f2() {}
f2.Cd = function() {
var l = 0;

function d(R, J) {
	var n = dr.Cd(R),
		m = 1;
	l = 0;
	var r = n[1],
		T = r.spreads,
		j = [],
		g = new Rect;
	for (var Y = 0; Y < T.length; Y++) {
		var k = T[Y],
			F = k.children.iV,
			D = b(k),
			q = F[0].children.iV,
			H = new Rect;
		for (var W = 0; W < q.length; W++) {
			var Z = q[W],
				B = b(Z);
			B.concat(D);
			var a = G(Z);
			a.offset(B.cI, B.xu);
			a = PixelUtil.vec.f1(a);
			H = H.Cw(a)
		}
		j.push(H);
		g = g.Cw(H)
	}
	while (Math.sqrt(g.O()) * m < 1e3) m++;
	J.m = g.m * m;
	J.n = g.n * m;
	J.buffer = new Uint8Array(4 * J.m * J.n);
	J.ya = !0;
	J._8(T.length);
	for (var Y = 0; Y < T.length; Y++) {
		var k = T[Y],
			F = k.children.iV,
			p = J.V4();
		p.layerFlags = 24;
		p.add.lsct = LayerSectionType.open;
		p.tH("Artboard " + (Y + 1));
		var c = j[Y].clone();
		c.offset(-g.x, -g.y);
		c.x *= m;
		c.y *= m;
		c.m *= m;
		c.n *= m;
		c = PixelUtil.vec.f1(c);
		p.P3(c);
		p.blendModeKey = "pass";
		J.B.push(J.En());
		var D = b(k);
		D.translate(-g.x, -g.y);
		D.scale(m, m);
		var v = {};
		for (var i = 0; i < F.length - 1; i++) {
			var z = F[i],
				P = z.children.iV,
				C = J.V4(),
				h = z.layer.lopts;
			if (h.name == "Internal_pages_layer_name" || v[h.name]) continue;
			v[h.name] = !0;
			C.layerFlags = 24;
			C.add.lsct = LayerSectionType.open;
			C.tH(h.name);
			C.Oj(h.show);
			if (h.a1i) C.add.lspf = 1 << 31;
			C.blendModeKey = "pass";
			J.B.push(J.En());
			for (var A = 0; A < P.length; A++) y(P[A], J, D, n);
			J.B.push(C)
		}
		J.B.push(p)
	}
}

function G(R) {
	var J = R.rect;
	return new Rect(J[0], J[1], J[2] - J[0], J[3] - J[1])
}

function b(R) {
	var J = R.transform;
	return new Matrix2D(J[0], J[1], J[2], J[3], J[4], J[5])
}

function V(R) {
	var J = R.color,
		n = R.parentFill,
		T;
	if (J == null && n) J = n.color;
	if (J == null) {
		console.log("strange color", R);
		return [0, 0, 0]
	}
	var r = J[0];
	if (r == 5) T = J.slice(1);
	else if (r == 6) T = UDOC.Color.cmykToRgb(J.slice(1));
	else if (r == 7) {
		var j = PixelUtil.labToRgb(J[1], J[2], J[3]);
		T = [j.o / 255, j.J / 255, j.k / 255]
	} else if (r == 14) {
		T = J.slice(1);
		console.log("unsure about the color")
	} else {
		console.log(J);
		throw r
	}
	return T
}

function Q(R) {
	var J = V(R);
	return PixelUtil.color.rgbColorDescriptor({
		o: J[0] * 255,
		J: J[1] * 255,
		k: J[2] * 255
	})
}

function t(R) {
	return "norm,mul ,scrn,over,sLit,hLit,div ,idiv,dark,lite,diff,smud,hue ,sat ,colr,lum ".split(",")[R]
}

function I(R, J) {
	var A = 0,
		n = 0;
	while (n + R[A][0] <= J) {
		n += R[A][0];
		A++
	}
	R = R[A][1].textData;
	A = 0;
	while (n + R[A][0] <= J) {
		n += R[A][0];
		A++
	}
	return R[A]
}

function y(R, J, n, r) {
	var T = R.transform ? b(R) : new Matrix2D;
	T.concat(n);
	n = T;
	var j = R.path,
		g = R.appearance,
		Y = R.visible,
		k = R.children ? R.children.iV : null,
		F = J.V4();
	if (Y != null) F.Oj(Y);
	var D = k && k.length == 1 && k[0].bitmapFill,
		q = R["bool2-1623"] && k && k.length == 1 && k[0].rect && k[0]._type.startsWith("TextFrame");
	if (D) {
		F.tH("bitmap");
		var H = k[0],
			W = G(H),
			Z = b(H);
		Z.concat(n);
		var B = H.bitmapFill.bitmap;
		B = r[B]._bin;
		if (B.length != B.buffer.byteLength) B = B.slice(0);
		var a = J.rM(B, "img.jpg", 0, 0);
		a.layerFlags = F.layerFlags;
		F = a;
		var m = [0, 0, W.m, 0, W.m, W.n, 0, W.n];
		PixelUtil.vec.transformCoords(m, Z, m);
		F.add.SoLd.Trnf = f.NH.gx(m);
		F.add.SoLd.nonAffineTransform = f.NH.gx(m);
		F.kX(J, !1);
		var p = H.path;
		if (p && p.length != 0) F.add.vmsk = M(p, Z, g);
		else if (j && j.length != 0) F.add.vmsk = M(j, n, g);
		F.Ba();
		F.QJ(J)
	} else if (q) {
		if (g && g.strokeSwatch) {
			var c = J.V4();
			e(c, J, g, j, n);
			J.B.push(c)
		}
		var v = k[0],
			W = G(v),
			Z = b(v),
			_ = 0;
		Z.concat(n);
		var i = v.children.iV[0],
			z = i.obj228,
			P = z[0].story[1],
			C = P.stoProps.anS.relEnt,
			h = P.stoProps.iV[0].relEnt,
			L = P.stoProps.iV[1]["ptrArrayX-210"][0].textData,
			U = r[C[0][1].textData[0][1].name[0]],
			S = U ? U.styProps : {};
		L = L.join("").replace(/\r/g, "\n");
		var E = -1;
		while ((E = L.indexOf("\uFFFC")) != -1) {
			L = L.slice(0, E) + (L[E - 1] == "\n" ? " " : " ") + L.slice(E + 1)
		}
		F.tH(L.slice(0, 255));
		F.add.lnsr = "rend";
		F.add.TySh = dt.Iu(0, 0);
		F.add.TySh.xZ = W;
		F.add.TySh.D = Z;
		var x = F.add.TySh.zC;
		dt.sT(x, 0, L);
		var K = dt.Au(x, 0, L.length);
		K.xg.FontSize = 10;
		dt.rW(x, 0, L.length, K);
		var u = [];
		if (L.length != 0) {
			var bC = I(C, 0),
				O = I(h, 0),
				$ = 1;
			for (var A = 1; A < L.length; A++) {
				var j = I(C, A),
					gX = I(h, A);
				if (j != bC || gX != O) {
					u.push($);
					$ = 0
				}
				bC = j;
				O = gX;
				$++
			}
			if ($ != 0) u.push($)
		}
		for (var A = 0; A < u.length; A++) {
			var jI = I(h, _),
				iw = u[A],
				hn = Math.min(_ + iw, L.length - 1),
				jq = jI[2],
				iv = jI[1].styProps;
			if (iv == null) iv = {};
			var kq = I(C, _),
				eE = kq[1].styProps,
				e8 = kq[2],
				aI = {};
			for (var dK in S) aI[dK] = S[dK];
			for (var dK in eE) aI[dK] = eE[dK];
			for (var dK in e8) aI[dK] = e8[dK];
			for (var dK in iv) aI[dK] = iv[dK];
			for (var dK in jq) aI[dK] = jq[dK];
			var K = dt.Au(x, _, hn),
				jC = ["FontSize", "FontCaps", "Underline", "Strikethrough", "FontBaseline"],
				d7 = jC.concat(["StartIndent", "EndIndent", "FirstLineIndent", "SpaceBefore", "SpaceAfter"]);
			for (var ka = 0; ka < d7.length; ka++) {
				var dK = d7[ka],
					hS = ka < jC.length ? K.xg : K.GB;
				if (aI[dK] != null) hS[dK] = aI[dK]
			}
			if (aI.fillColor) {
				var eH = V(aI.fillColor);
				K.xg.FillColor = {
					Type: 1,
					Values: [1].concat(eH)
				}
			}
			if (aI.font) {
				var kA = aI.font.name[5],
					gq = aI.fontStyle;
				if (gq == null) gq = "Regular";
				for (var hb = 0; hb < kA.length; hb++)
					if (kA[hb][0] == gq) dt.Wr(K, kA[hb][1])
			}
			if (aI.leading != null && aI.leading > 1) {
				K.xg.Leading = aI.leading;
				K.xg.AutoLeading = !1
			}
			if (aI.align != null) K.GB.Justification = [0, 2, 1, 6, 3, 5, 4, 0, 0, 0][aI.align];
			dt.rW(x, _, hn, K);
			_ += iw
		}
		dt.AO(x, 1);
		dt.mt(x, [0, 0, Math.round(W.m), Math.round(W.n)])
	} else if (R._type.startsWith("Path") && (k == null || k.length == 0) && j) {
		e(F, J, g, j, n)
	} else {
		var ex = R["prop-14526"];
		if (k == null && ex) {
			var fs = r[X.Lv(ex, 20)];
			k = [fs]
		}
		if (k) {
			if (j && j.length != 0) {
				F.add.vmsk = M(j, n, g);
				F.Ba();
				F.QJ(J)
			}
			F.tH("group");
			F.layerFlags = 24;
			F.add.lsct = LayerSectionType.open;
			J.B.push(J.En());
			for (var A = 0; A < k.length; A++) y(k[A], J, n, r)
		}
	}
	if (g) {
		var f_ = g.objectBlendingMode,
			bD = g.objectOpacity,
			ae = g.fillTint,
			dY = !1;
		if (f_) F.blendModeKey = t(f_[0]);
		if (bD) F.opacity = Math.round(F.opacity * bD[0] / 100);
		if (!D && ae) F.opacity = Math.round(F.opacity * ae[0] / 100);
		var em = JSON.parse(LayerStyleConstants.defaultLayerStyleJson);
		for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) em[LayerStyleConstants.effectMultiKeys[A]] = {
			t: "VlLs",
			v: []
		};
		var f7 = "dropShadow innerShadow satin bevel iglow oglow".split(" "),
			bM = "DrSh IrSh ChFX ebbl IrGl OrGl".split(" ");
		for (var A = 0; A < f7.length; A++) {
			var iP = f7[A];
			if (g[iP] && g[iP][0]) {
				var hf = g[iP],
					gu = 135,
					ip = 10;
				dY = !0;
				var d2 = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf(bM[A])]);
				em[LayerStyleConstants.effectMultiKeys[LayerStyleConstants.effectOrder.indexOf(bM[A])]].v.push({
					t: "Objc",
					v: d2
				});
				if (g[iP + "Color"]) d2.Clr.v = Q(g[iP + "Color"][0]);
				else if (f7[A] == "iglow" || f7[A] == "oglow") d2.Clr.v = PixelUtil.color.rgbColorDescriptor({
					o: 255,
					J: 255,
					k: 255
				});
				if (g[iP + "ColorH"]) d2.hglC.v = Q(g[iP + "ColorH"][0]);
				if (g[iP + "ColorS"]) d2.sdwC.v = Q(g[iP + "ColorS"][0]);
				if (g[iP + "BMode"]) d2.Md.v.BlnM = au.ci(t(g[iP + "BMode"][0]));
				if (g[iP + "BModeH"]) d2.hglM.v.BlnM = au.ci(t(g[iP + "BModeH"][0]));
				if (g[iP + "BModeS"]) d2.sdwM.v.BlnM = au.ci(t(g[iP + "BModeS"][0]));
				if (g[iP + "Opacity"]) d2.Opct.v.val = g[iP + "Opacity"][0];
				if (g[iP + "OpacityH"]) d2.hglO.v.val = g[iP + "OpacityH"][0];
				if (g[iP + "OpacityS"]) d2.sdwO.v.val = g[iP + "OpacityS"][0];
				if (g[iP + "Size"]) d2.blur.v.val = g[iP + "Size"][0];
				if (g[iP + "Angle"]) gu = g[iP + "Angle"][0];
				if (g[iP + "Dist"]) ip = g[iP + "Dist"][0];
				if (g[iP + "DX"]) {
					var aQ = g[iP + "DX"][0],
						iL = g[iP + "DY"][0];
					ip = Math.round(Math.sqrt(aQ * aQ + iL * iL));
					gu = Math.round(Math.atan2(iL, -aQ) * 180 / Math.PI)
				}
				if (d2.lagl) d2.lagl.v.val = gu;
				if (d2.Dstn) d2.Dstn.v.val = ip;
				if (d2.uglg) d2.uglg.v = !1;
				if (g[iP + "Invert"]) d2.Invr.v = g[iP + "Invert"][0];
				else if (f7[A] == "satin") d2.Invr.v = !1;
				if (g[iP + "Alt"]) d2.Lald.v.val = g[iP + "Alt"][0];
				if (g[iP + "Depth"]) d2.srgR.v.val = g[iP + "Depth"][0];
				if (g[iP + "Choke"]) d2.Ckmt.v.val = g[iP + "Choke"][0]
			}
		}
		if (dY) F.add.lmfx = em
	}
	if (R.name) F.tH(R.name);
	else if (g && g.name) F.tH(g.name[0]);
	J.B.push(F)
}

function e(R, J, n, r, T) {
	R.tH("path");
	R.layerFlags |= 16;
	R.add.vmsk = M(r, T, n);
	var j = R.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default)),
		g = null;
	if (n) {
		var Y = n.strokeSwatch,
			k = n.fillSwatch,
			F = n.basicFeather,
			D = n.basicFeatherWidth,
			q = n.strokeWeight;
		j.strokeEnabled.v = Y != null;
		j.fillEnabled.v = k != null;
		if (F) R.add.vmsk.Vx = D ? D[0] : 9;
		if (Y) {
			j.strokeStyleLineWidth.v.val = q ? q[0] : 1;
			g = Q(Y[0]);
			j.strokeStyleContent.v.Clr.v = g
		}
		if (k) {
			g = Q(k[0])
		}
	}
	if (g) R.add.SoCo = {
		classID: "null",
		Clr: {
			t: "Objc",
			v: g
		}
	};
	R.Ba();
	R.QJ(J)
}

function M(R, J, n) {
	var r = new LayerRecord.VectorMask,
		T = r.i;
	for (var j = 0; j < R.length; j++) {
		var g = R[j],
			Y = g[0].length,
			k = g[1] == 0,
			F = k ? 0 : 3;
		T.push({
			type: F,
			length: Y,
			H$: 0,
			_M: 2,
			c_: 0,
			jt: 0
		});
		for (var A = 0; A < Y; A++) {
			var D = g[0][A],
				q = D[0],
				H = new Point2D(D[1], D[2]),
				W = new Point2D(D[3], D[4]),
				Z = new Point2D(D[5], D[6]);
			if (q == 0 || q == 1) T.push({
				type: F + 2,
				Wf: H,
				H: W,
				UU: Z
			});
			else if (q == 2) T.push({
				type: F + 2,
				Wf: H,
				H: H,
				UU: H
			});
			else throw q
		}
	}
	PixelUtil.path.transformFlatCoords(T, J);
	return r
}
return d
}();
// Sketch (.sketch) file parser module (IIFE)
var dy = function(l) {
	function d(t, I) {
		var y = [];
		for (var A = 0; A < 9; A++) {
			var e = X.q(t, I + A * 4);
			if (A % 3 == 2) y.push((e >>> 30) + (e & 1073741823) / 1073741823);
			else y.push((e >>> 16) + (e & 65535) / 65535)
		}
		return y
	}

	function G(t, I, y, e) {
		var M = {},
			R = X.q,
			J = X.TD;
		while (I < y) {
			var n = I,
				r = X.q(t, I);
			I += 4;
			var T = X.Ko(t, I, 4);
			I += 4;
			if (r == 0) throw "e";
			if (r == 1) {
				r = X.fD(t, I);
				I += 8
			}
			var j = n + r,
				g = "".padStart(e, "\t"),
				Y = {};
			if (T == "mvhd") {
				var k = t[I];
				if (k != 0) throw "e";
				I += 4;
				Y.aku = R(t, I);
				I += 4;
				Y.af0 = R(t, I);
				I += 4;
				Y.CN = R(t, I);
				I += 4;
				Y.duration = R(t, I);
				I += 4;
				Y.ahR = R(t, I);
				I += 4;
				Y.volume = J(t, I);
				I += 2;
				I += 10;
				Y.a8X = d(t, I);
				I += 4 * 9;
				Y.abX = [];
				for (var A = 0; A < 6; A++) Y.abX.push(R(t, I + A * 4));
				I += 4 * 6;
				Y.ajT = R(t, I);
				I += 4
			} else if (T == "tkhd") {
				var k = t[I];
				if (k != 0) throw "e";
				I += 4;
				Y.aku = R(t, I);
				I += 4;
				Y.af0 = R(t, I);
				I += 4;
				Y.aiw = R(t, I);
				I += 4;
				I += 4;
				Y.duration = R(t, I);
				I += 4;
				I += 8;
				Y.j = J(t, I);
				I += 2;
				Y.avQ = J(t, I);
				I += 2;
				Y.volume = J(t, I);
				I += 2;
				I += 2;
				Y.a8X = d(t, I);
				I += 4 * 9;
				Y.iJ = R(t, I) >>> 16;
				I += 4;
				Y.Tq = R(t, I) >>> 16;
				I += 4
			} else if (T == "mdhd") {
				Y.layerFlags = R(t, I);
				I += 4;
				Y.aku = R(t, I);
				I += 4;
				Y.af0 = R(t, I);
				I += 4;
				Y.CN = R(t, I);
				I += 4;
				Y.duration = R(t, I);
				I += 4;
				Y.lang = J(t, I);
				I += 2;
				Y.cm = J(t, I);
				I += 2
			} else if (T == "hdlr") {
				var F = R(t, I);
				I += 4;
				if (F != 0) throw F;
				Y.Ts = X.Ko(t, I, 4);
				I += 4;
				Y.a4b = X.Ko(t, I, 4);
				I += 4;
				Y.asv = R(t, I);
				I += 4;
				Y.layerFlags = R(t, I);
				I += 4;
				Y.ayC = R(t, I);
				I += 4;
				var D = I;
				while (t[D] != 0) D++;
				Y.name = X.Ko(t, I, D - I);
				I += D - I + 1
			} else if (T == "stsd") {
				var F = R(t, I);
				I += 4;
				if (F != 0) throw F;
				var q = R(t, I);
				I += 4;
				if (q != 1) throw q;
				var H = R(t, I);
				I += 4;
				Y.kk = X.Ko(t, I, 4);
				I += 4;
				if (Y.kk == "mett") {
					Y.anL = X.Ko(t, I, j - I)
				} else {
					for (var A = 0; A < 6; A++)
						if (t[I + A] != 0) throw "e";
					I += 6;
					Y.a54 = J(t, I);
					I += 2;
					Y.a8U = J(t, I);
					I += 2;
					Y.aah = J(t, I);
					I += 2;
					Y.atz = R(t, I);
					I += 4;
					if ("mp4v avc1 encv s263 vp09 hvc1".split(" ").indexOf(Y.kk) != -1) {
						Y.a1V = R(t, I);
						I += 4;
						Y.afr = R(t, I);
						I += 4;
						Y.a6s = [J(t, I), J(t, I + 2)];
						I += 4;
						Y.a1v = [R(t, I) / (1 << 16), R(t, I + 4) / (1 << 16)];
						I += 8;
						var W = R(t, I);
						I += 4;
						if (W != 0) throw "e";
						var Z = J(t, I);
						I += 2;
						if (Z != 1) throw "e";
						var B = t[I];
						I++;
						Y.asZ = X.Ko(t, I, B);
						I += 31;
						Y.a7W = J(t, I);
						I += 2;
						var a = J(t, I);
						I += 2;
						if (a != 65535) throw "e";
						if (I != j) Y.aj0 = G(t, I, j, e + 1)
					} else if (["mp4a", "enca", "samr", "sawb", "ec-3"].indexOf(Y.kk) != -1) {
						Y.vj = J(t, I);
						I += 2;
						Y.ao$ = J(t, I);
						I += 2;
						var m = J(t, I);
						I += 2;
						if (m != 0) throw m;
						var p = J(t, I);
						I += 2;
						if (p != 0) throw p;
						Y.acv = R(t, I) / (1 << 16);
						I += 4
					} else if (Y.kk == "tx3g") {} else throw Y.kk
				}
			} else if (T == "stts" || T == "stsz" || T == "stco" || T == "stsc" || T == "ctts") {
				var F = R(t, I),
					c = 0,
					i = 0;
				I += 4;
				if (F != 0) throw F;
				if (T == "stsz") {
					c = R(t, I);
					I += 4
				}
				var v = R(t, I) * (T == "stsc" ? 3 : T == "stts" || T == "ctts" ? 2 : 1);
				I += 4;
				Y = [];
				for (var A = 0; A < v; A++) {
					if (c != 0) Y.push(c);
					else {
						Y.push(R(t, I));
						I += 4
					}
				}
				for (var A = 0; A < v; A++) i += Y[A]
			} else if (T == "co64") {
				var F = R(t, I);
				I += 4;
				if (F != 0) throw F;
				var v = R(t, I);
				I += 4;
				Y = [];
				for (var A = 0; A < v; A++) {
					Y.push(X.fD(t, I));
					I += 8
				}
			} else if (T == "moov" || T == "trak" || T == "mdia" || T == "minf" || T == "dinf" || T == "stbl") {
				Y = G(t, I, j, e + 1)
			} else {
				Y.R = I;
				Y.E3 = r
			}
			I = j;
			if (T == "trak") {
				if (M[T] == null) M[T] = [];
				M[T].push(Y)
			} else {
				if (M[T] != null) throw T;
				M[T] = Y
			}
		}
		return M
	}

	function b(t) {
		var I = new Uint8Array(t);
		return G(I, 0, I.length, 0)
	}

	function V(t, I, y) {
		var e = Q(t, I),
			M = e.mdia.minf.stbl,
			R = M.stsc,
			J = 0,
			n = 0;
		for (var A = 0; A < R.length; A += 3) {
			var r = (A + 3 < R.length ? R[A + 3] : 1e4) - R[A],
				T = n + r * R[A + 1];
			if (n <= y && y < T) {
				while (n + R[A + 1] <= y) {
					J++;
					n += R[A + 1]
				}
				break
			}
			J += r;
			n = T
		}
		var j = M.stco;
		if (j == null) j = M.co64;
		var g = j[J];
		while (n < y) {
			g += M.stsz[n];
			n++
		}
		return [g, M.stsz[y]]
	}

	function Q(t, I) {
		var y = t.moov.trak;
		for (var A = 0; A < y.length; A++)
			if (y[A].mdia.hdlr.a4b == I) return y[A]
	}
	return {
		Cd: b,
		a8N: V,
		azs: Q
	}
}();
