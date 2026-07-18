/**
* labColorData (de-obfuscated partial from rest.js)
* Lines 19640-33217. Original identifier: labColorData
*/

var LabColorHelper = {};
LabColorHelper.referenceWhitePoint = {
	x: .34567,
	y: .3585
};

LabColorHelper.temperatureTable = [{
	o: 0,
	Qb: .18006,
	qv: .26352,
	sA: -.24341
}, {
	o: 10,
	Qb: .18066,
	qv: .26589,
	sA: -.25479
}, {
	o: 20,
	Qb: .18133,
	qv: .26846,
	sA: -.26876
}, {
	o: 30,
	Qb: .18208,
	qv: .27119,
	sA: -.28539
}, {
	o: 40,
	Qb: .18293,
	qv: .27407,
	sA: -.3047
}, {
	o: 50,
	Qb: .18388,
	qv: .27709,
	sA: -.32675
}, {
	o: 60,
	Qb: .18494,
	qv: .28021,
	sA: -.35156
}, {
	o: 70,
	Qb: .18611,
	qv: .28342,
	sA: -.37915
}, {
	o: 80,
	Qb: .1874,
	qv: .28668,
	sA: -.40955
}, {
	o: 90,
	Qb: .1888,
	qv: .28997,
	sA: -.44278
}, {
	o: 100,
	Qb: .19032,
	qv: .29326,
	sA: -.47888
}, {
	o: 125,
	Qb: .19462,
	qv: .30141,
	sA: -.58204
}, {
	o: 150,
	Qb: .19962,
	qv: .30921,
	sA: -.70471
}, {
	o: 175,
	Qb: .20525,
	qv: .31647,
	sA: -.84901
}, {
	o: 200,
	Qb: .21142,
	qv: .32312,
	sA: -1.0182
}, {
	o: 225,
	Qb: .21807,
	qv: .32909,
	sA: -1.2168
}, {
	o: 250,
	Qb: .22511,
	qv: .33439,
	sA: -1.4512
}, {
	o: 275,
	Qb: .23247,
	qv: .33904,
	sA: -1.7298
}, {
	o: 300,
	Qb: .2401,
	qv: .34308,
	sA: -2.0637
}, {
	o: 325,
	Qb: .24792,
	qv: .34655,
	sA: -2.4681
}, {
	o: 350,
	Qb: .25591,
	qv: .34951,
	sA: -2.9641
}, {
	o: 375,
	Qb: .264,
	qv: .352,
	sA: -3.5814
}, {
	o: 400,
	Qb: .27218,
	qv: .35407,
	sA: -4.3633
}, {
	o: 425,
	Qb: .28039,
	qv: .35577,
	sA: -5.3762
}, {
	o: 450,
	Qb: .28863,
	qv: .35714,
	sA: -6.7262
}, {
	o: 475,
	Qb: .29685,
	qv: .35823,
	sA: -8.5955
}, {
	o: 500,
	Qb: .30505,
	qv: .35907,
	sA: -11.324
}, {
	o: 525,
	Qb: .3132,
	qv: .35968,
	sA: -15.628
}, {
	o: 550,
	Qb: .32129,
	qv: .36011,
	sA: -23.325
}, {
	o: 575,
	Qb: .32931,
	qv: .36038,
	sA: -40.77
}, {
	o: 600,
	Qb: .33724,
	qv: .36051,
	sA: -116.45
}];
// LabColorHelper.estimateColorTemperature — xy chromaticity → correlated color temperature (K) + tint
LabColorHelper.estimateColorTemperature = function(l) {
	var d = LabColorHelper.temperatureTable,
		G = 2 * l.x / (1.5 - l.x + 6 * l.y),
		b = 3 * l.y / (1.5 - l.x + 6 * l.y),
		V = 0,
		Q = 0,
		t = 0;
	for (; t < 31; t++) {
		V = b - d[t].qv - d[t].sA * (G - d[t].Qb);
		if (t > 0 && V < 0) {
			break
		}
		Q = V
	}
	while (t >= d.length) t--;
	V /= Math.sqrt(1 + d[t].sA * d[t].sA);
	Q /= Math.sqrt(1 + d[t - 1].sA * d[t - 1].sA);
	var I = Q / (Q - V),
		y = 1e6 / ((d[t].o - d[t - 1].o) * I + d[t - 1].o),
		e = G - ((d[t].Qb - d[t - 1].Qb) * I + d[t - 1].Qb),
		M = b - ((d[t].qv - d[t - 1].qv) * I + d[t - 1].qv),
		R = Math.sqrt(1 + d[t].sA * d[t].sA),
		J = 1 / R,
		n = d[t].sA / R,
		r = Math.sqrt(1 + d[t - 1].sA * d[t - 1].sA),
		T = 1 / r,
		j = d[t - 1].sA / r,
		g = (J - T) * I + T,
		Y = (n - j) * I + j,
		k = Math.sqrt(g * g + Y * Y);
	g /= k;
	Y /= k;
	var F = (e * g + M * Y) * -3e3;
	return {
		q1: y,
		Mr: F
	}
};

// LabColorHelper.temperatureToChromaticity — color temperature (K) + tint → xy chromaticity
LabColorHelper.temperatureToChromaticity = function(l, d) {
	var G = LabColorHelper.temperatureTable,
		b = 1e6 / l,
		V = 1;
	for (; V < 31; V++) {
		if (b < G[V].o) {
			break
		}
	}
	var Q = (G[V].o - b) / (G[V].o - G[V - 1].o),
		t = (G[V - 1].Qb - G[V].Qb) * Q + G[V].Qb,
		I = (G[V - 1].qv - G[V].qv) * Q + G[V].qv,
		y = Math.sqrt(1 + G[V].sA * G[V].sA),
		e = 1 / y,
		M = G[V].sA / y,
		R = Math.sqrt(1 + G[V - 1].sA * G[V - 1].sA),
		J = 1 / R,
		n = G[V - 1].sA / R,
		r = (J - e) * Q + e,
		T = (n - M) * Q + M,
		j = Math.sqrt(r * r + T * T);
	r /= j;
	T /= j;
	t += r * d / -3e3;
	I += T * d / -3e3;
	return {
		x: 1.5 * t / (t - 4 * I + 2),
		y: I / (t - 4 * I + 2)
	}
};

// LabColorHelper.xyzToChromaticity — XYZ tristimulus → xy chromaticity
LabColorHelper.xyzToChromaticity = function(l) {
	var d = l[0] + l[1] + l[2];
	return {
		x: l[0] / d,
		y: l[1] / d
	}
};

// LabColorHelper.chromaticityToTristimulus — xy chromaticity → normalized XYZ (Y=1)
LabColorHelper.chromaticityToTristimulus = function(l) {
	return {
		x: l.x / l.y,
		y: 1,
		V8: (1 - l.x - l.y) / l.y
	}
};

// LabColorHelper.computeChromaticAdaptationMatrix — Bradford chromatic adaptation matrix between two whites
LabColorHelper.computeChromaticAdaptationMatrix = function(l, d) {
	var G = PixelUtil.mat4._3([.8951, .2664, -.1614, -.7502, 1.7135, .0367, .0389, -.0685, 1.0296]),
		b = [l.x, l.y, l.V8, 0],
		V = [d.x, d.y, d.V8, 0];
	b = PixelUtil.mat4.Uz(G, b);
	V = PixelUtil.mat4.Uz(G, V);
	var Q = V[0] / b[0],
		t = V[1] / b[1],
		I = V[2] / b[2],
		y = PixelUtil.mat4._3([Q, 0, 0, 0, t, 0, 0, 0, I]),
		e = PixelUtil.mat4.hI(G);
	return PixelUtil.mat4.multiply(PixelUtil.mat4.multiply(e, y), G)
};

PixelUtil.raw.HW = {};
PixelUtil.raw.sg = function(l) {
	l *= 8;
	var d = [8, 10, 12, 14, 16];
	for (var G in CAMS) {
		var b = CAMS[G];
		if (b.length == 4) continue;
		var V = b[4],
			Q = b[5];
		for (var A = 0; A < d.length; A++)
			if (V * Q * d[A] == l) return [G, d[A]]
	}
	var t = [
		[4e3, 3e3]
	];
	for (var A = 0; A < t.length; A++) {
		var b = t[A],
			V = b[0],
			Q = b[1];
		for (var A = 0; A < d.length; A++)
			if (V * Q * d[A] == l) return [b, d[A]]
	}
	return null
};

PixelUtil.raw.aaa = function(l) {
	var l = new Uint8Array(l);
	for (var A = 0; A < l.length; A += 2) {
		var d = l[A];
		l[A] = l[A + 1];
		l[A + 1] = d
	}
	var G = PixelUtil.raw.sg(l.length),
		b = CAMS[G[0]];
	if (b == null) b = [
		[8489, -2583, -1036, -8051, 15583, 2643, -1307, 1407, 7354], 0, 1e3, 64383, G[0][0], G[0][1]
	];
	var V = b[4],
		Q = b[5],
		t = Math.max(b[2], 116),
		I = {
			data: l,
			oK: 1,
			width: V,
			height: Q,
			t256: [V],
			t257: [Q],
			t258: [G[1]],
			t277: [1],
			t33421: [2, 2],
			t33422: PixelUtil.raw.Uk[b[1]],
			t50706: [1, 2, 0, 0],
			t50714: [t, t, t, t],
			t50717: [b[3]],
			t50721: b[0].slice(0),
			t50723: [1, 0, 0, 0, 1, 0, 0, 0, 1],
			t50728: [.64, 1, .46],
			t50778: [17]
		};
	for (var A = 0; A < 9; A++) I.t50721[A] /= 1e4;
	return I
};

PixelUtil.raw.uN = function(l) {
	if (l == null || l.length == 0 || typeof l[0] == "number") return l;
	var d = [];
	for (var A = 0; A < l.length; A++) d[A] = l[A][1] == 0 ? 0 : l[A][0] / l[A][1];
	return d
};

PixelUtil.raw.Uk = [
	[2, 1, 1, 0],
	[0, 1, 1, 2],
	[1, 0, 2, 1],
	[1, 2, 0, 1]
];
PixelUtil.raw.normalize = function(l, d) {
	if (l.t50706 != null || l.t271[0].startsWith("Hasselblad")) {
		var G = [50714, 50718, 50719, 50720, 50721, 50722, 50723, 50724, 50727, 50728, 50730, 50731, 50732, 50734, 50736, 50738, 50739, 50780, 50964, 50965];
		for (var A = 0; A < G.length; A++)
			if (l["t" + G[A]] != null) l["t" + G[A]] = PixelUtil.raw.uN(l["t" + G[A]]);
		if (l.t271 && l.t271[0].startsWith("Hasselblad")) {
			l.t50706 = [1, 2, 0, 0];
			l.t33422 = PixelUtil.raw.Uk[1];
			l.t50723 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
			l.t50778 = [17];
			if (!l.isLE)
				for (var A = 0; A < l.data.length; A += 2) {
					var b = l.data[A];
					l.data[A] = l.data[A + 1];
					l.data[A + 1] = b
				}
		}
		if (l.t272 && l.t272[0] == "HERO10 Black") {
			l.t50728 = [.469725, 1, .739884];
			if (!l.t305[0].startsWith("Adobe")) {
				var V = new Uint16Array(l.data.buffer);
				for (var A = 0; A < V.length; A++) V[A] >>>= 2
			}
		}
		return
	}
	var Q = l.t258[0],
		t = l.exifIFD,
		d = new Uint8Array(d);
	l.t50706 = [1, 2, 0, 0];
	var I = l.t272[0].trim();
	if (I.indexOf(" ") == -1) I = l.t271[0].trim() + " " + I;
	if (l.t50708 == null) l.t50708 = [I];
	var y = I.toLowerCase(),
		e = CAMS,
		M = e[y];
	if (M == null)
		for (var R in e)
			if (y.startsWith(R)) M = e[R];
	if (M == null) alert("Unknown camera:" + I);
	else {
		var J = M[2];
		l.t50714 = [J, J, J, J];
		if (l.t272 == "Canon EOS REBEL T3") M[3] = 13584;
		l.t50717 = [M[3]];
		l.t50721 = M[0].slice(0);
		for (var A = 0; A < 9; A++) l.t50721[A] = l.t50721[A] * (1 / 1e4)
	}
	l.t50723 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
	if (l.t50728 == null) l.t50728 = [.35, 1, .6];
	l.t50778 = [17];
	if (l.t271[0].startsWith("SONY")) {
		var n = UTIF["_bin" + (l.isLE ? "LE" : "BE")],
			r = l.t28688,
			D;
		if (JSON.stringify(r) != "[8000,10400,12900,14100]") console.log(r);
		if (r) {
			var T = [0, 0, 0, 0, 0, 4095],
				j = new Uint16Array(16385);
			for (var A = 0; A < 4; A++) {
				var g = r[A] >>> 2;
				T[A + 1] = g;
				if (g > 4095) throw "e"
			}
			for (var A = 0; A < 16385; A++) j[A] = A;
			for (var A = 0; A < 5; A++)
				for (var Y = T[A] + 1; Y <= T[A + 1]; Y++) j[Y] = j[Y - 1] + (1 << A);
			var k = d.length * 8 < l.width * l.height * Q;
			if (k) l.t50712 = j
		} else console.log("no curve");
		var F = l.dngPrvt;
		if (F) {
			var q = F.t29184[0],
				H = F.t29185[0],
				W = (l.isLE ? X.Lv : X.q)(F.t29217, 0),
				Z = new Uint32Array(d.slice(q, q + (H & 4294967292)).buffer),
				B = new Uint32Array(H >>> 2);
			PixelUtil.raw.auI(Z, B, H >>> 2, W);
			var a = new Uint8Array(q + H);
			a.set(new Uint8Array(B.buffer), q);
			var m = [];
			UTIF._readIFD(n, a, q, m, 0, !1);
			var p = m.pop(),
				c = p.t29458;
			l.t50728 = [c[1] / c[0], 1, c[1] / c[3]];
			l.t50730 = [.5];
			var v = p.t29891;
			l.t50829 = [v[1], v[0], v[3], v[2]]
		} else if (t.makerNote && t.makerNote.t8208) {
			var D = t.makerNote,
				i = D.t8208,
				z = i.length,
				P = 0,
				C = new Uint8Array(256);
			for (var A = 249; A < 256; A++) C[A] = A;
			for (var A = 0; A < 249; A++) C[A * A * A % 249] = A;
			for (var A = 0; A < z; A++) i[A] = C[i[A]];
			if (z == 6604) P = 612;
			else throw "e";
			var c = [];
			for (var A = 0; A < 3; A++) c.push(X.V6(i, P + A * 2));
			console.log(c);
			l.t50728 = [c[1] / c[0], 1, c[1] / c[2]]
		} else console.log("no white balance");
		if (l.width * l.height * 1.5 == l.t279[0]) {
			J = J >>> 2;
			l.t50714 = [J, J, J, J];
			l.t50717 = [M[3] >>> 2]
		}
	} else if (l.t271[0].startsWith("Canon")) {
		var d = l.data,
			h = d.slice(0),
			L = l.t50752,
			U = [],
			E = 0;
		if (L == null || L[0] == 0 && L[1] == 0) U.push(l.width);
		else {
			for (var A = 0; A < L[0]; A++) U.push(L[1]);
			U.push(L[2])
		}
		var S = l.width * 2,
			x = l.t50885 && l.t50885[0] == 4;
		if (!x)
			for (var K = 0; K < U.length; K++) {
				var u = U[K],
					bC = 2 * E,
					O = 2 * u;
				for (var $ = 0; $ < l.height; $ += 2) {
					var gX = $ * S + bC,
						_ = l.height * bC + $ * O;
					for (var A = 0; A < O; A++) {
						d[gX + A] = h[_ + A];
						d[gX + A + S] = h[_ + A + O]
					}
				}
				E += u
			} else {
				for (var K = 0; K < U.length; K++) {
					var u = U[K] / ((L[0] * L[1] + L[2]) / l.width);
					for (var $ = 0; $ < l.height; $++) {
						var gX = ($ * l.width + E) * 6,
							_ = (l.height * E + $ * u) * 6;
						for (var A = 0; A < u * 6; A++) d[gX + A] = h[_ + A]
					}
					E += u
				}
				var jI = new Uint16Array(d.buffer),
					iw = new Uint16Array(1),
					hn = new Int16Array(iw.buffer);
				for (var A = 0; A < jI.length; A += 3) {
					var jq = jI[A],
						iv = jI[A + 1],
						kq = jI[A + 2];
					iw[0] = iv << 2;
					iv = hn[0] >> 2;
					iw[0] = kq << 2;
					kq = hn[0] >> 2;
					jI[A + 0] = Math.max(0, kq + jq);
					jI[A + 1] = Math.max(0, (jq << 12) - iv * 778 - (kq << 11) >> 12);
					jI[A + 2] = Math.max(0, iv + jq)
				}
			}
		var D = t.makerNote;
		if (D.t16385) {
			var eE = D.t224,
				d7 = 0;
			if (eE) {
				var q = l.t50719 = [eE[5], eE[6]],
					e8 = l.t50720 = [eE[7] + 1 - eE[5], eE[8] + 1 - eE[6]],
					aI = D.t154;
				if (aI) {
					q[0] += aI[3];
					q[1] += aI[4];
					e8[0] = aI[1];
					e8[1] = aI[2]
				}
			}
			var dK = D.t16385,
				jC = dK.length;
			if (jC == 582) d7 = 1;
			else if (jC == 653) d7 = 2;
			else if (jC == 796) d7 = 3;
			else if ([692, 674, 702, 1227, 1250, 1251, 1337, 1338, 1346].indexOf(jC) != -1) d7 = 4;
			else if (jC == 5120) {
				d7 = 5;
				dK = new Int16Array(dK.slice(0).buffer)
			} else if (jC == 1273 || jC == 1275) d7 = 6;
			else if ([1312, 1313, 1316, 1506].indexOf(jC) != -1) d7 = 7;
			else if ([1560, 1592, 1353, 1602].indexOf(jC) != -1) d7 = 8;
			else throw "e" + jC;
			var ka = dK[0],
				hS = [null, [25, 166],
					[34, 286],
					[63, 196],
					[63],
					[71, ka == -4 ? 333 : 264],
					[63, 251],
					[63, ka == 10 ? 504 : 728],
					[63, 326]
				],
				P = hS[d7][0],
				eH = hS[d7][1];
			if (d7 == 4) {
				if (dK[0] == 2) eH = 231;
				else if (dK[0] == 3) eH = 231;
				else if (dK[0] == 4) eH = 231;
				else if (dK[0] == 5) eH = 231;
				else if (dK[0] == 6) eH = 231;
				else if (dK[0] == 7) eH = 231;
				else if (dK[0] == 9) eH = 231;
				else throw "e"
			}
			l.t50728 = [dK[P + 1] / dK[P], 1, dK[P + 1] / dK[P + 3]];
			var J = eH == null ? 1024 : dK[eH];
			if (d7 != 4) l.t50714 = [J, J, J, J]
		} else {
			l.t50728 = [.4, 1, .6]
		}
		if (x) {
			l.t277 = [3];
			l.t50728 = [1, 1, 1];
			l.t50714 = [0, 0, 0, 0]
		}
	} else if (l.t271[0].startsWith("NIKON")) {
		var D = t.makerNote,
			kA = l.isLE ? X.V6 : X.Ar,
			bD = 0,
			ae = 0,
			bM, jt = 0;
		if (D.t61) {
			var gq = D.t61,
				hb = [];
			for (var A = 0; A < 4; A++) hb[A] = gq[A] / Math.pow(2, 14 - Q);
			l.t50714 = hb
		}
		if (D.t3585) {
			var ex = D.t3585,
				A = 0,
				q = 22;
			while (q < ex.length && A != -4) {
				var fs = X.Lv(ex, q);
				q += 4;
				q += 14;
				A = X.Lv(ex, q) - 4;
				q += 4;
				if (fs == 1990472198) {
					if (ex[q] != 0) throw "Flip"
				}
				if (fs == 1990472199) {
					var f_ = X.V6(ex, q);
					if (f_ == 0) l.oK = 1;
					else if (f_ == 270) l.oK = 8;
					else throw "e " + f_
				}
				q += A
			}
		}
		if (D.t183) {
			var em = D.t183,
				e8 = [];
			for (var A = 0; A < 6; A++) e8.push(kA(em, 16 + A * 2));
			bD = e8[0];
			ae = e8[1]
		}
		if (D.t3614) {
			var dY = D.t3614;
			bD = X.Lv(dY, 8);
			ae = X.Lv(dY, 12)
		}
		if (bD != 0 && Math.max(bD, ae) < Math.max(l.width, l.height)) {
			if (bD < ae) {
				var b = bD;
				bD = ae;
				ae = b
			}
			var E = l.width - bD >>> 1,
				$ = l.height - ae >>> 1;
			l.t50829 = [$, E, $ + ae, E + bD]
		} else l.t50829 = [8, 8, l.height - 8, l.width - 56];
		var f7 = D.t69;
		if (f7) l.t50829 = [f7[1], f7[0], f7[1] + f7[3], f7[0] + f7[2]];
		if (D.t12) {
			var iP = PixelUtil.raw.uN(D.t12);
			bM = [1 / iP[0], 1, 1 / iP[1]]
		} else if (D.t151) {
			var jp = PixelUtil.raw.ag$(D, 151),
				hG = jp[0],
				f5 = jp[1],
				hf = jp[2];
			if (hG == "0100" && f5 >= 80) throw "e";
			else if (hG == "0102") {
				var d2 = [];
				for (var A = 0; A < 4; A++) d2.push(kA(hf, 6 + A * 2));
				bM = [d2[1] / d2[0], 1, d2[1] / d2[3]]
			} else if (hG == "0103" && f5 >= 26) {
				var d2 = [];
				for (var A = 0; A < 4; A++) d2.push(kA(hf, 16 + A * 2));
				bM = [d2[1] / d2[0], 1, d2[3] / d2[2]]
			} else if (hG == "0204" && f5 >= 564 || hG == "0205" && f5 >= 284) {
				var q = hG == "0204" ? 6 : 14,
					d2 = [];
				for (var A = 0; A < 4; A++) d2.push(kA(hf, q + A * 2));
				bM = [d2[1] / d2[0], 1, d2[1] / d2[3]]
			} else throw "e"
		} else console.log("no white balance info");
		if (I == "NIKON D1") bM = [1, 1, 1];
		if (bM) l.t50728 = bM;
		var gu = D.t150 ? D.t150 : D.t140;
		if (gu) {
			var ip = gu[jt++],
				aQ = gu[jt++],
				ep;
			if (ip == 73 || aQ == 88) jt += 2110;
			jt += 8;
			var iL = 1 << Q & 32767,
				jx = kA(gu, jt);
			jt += 2;
			var j = [];
			if (jx > 1) ep = Math.floor(iL / (jx - 1));
			if (ip == 68 && aQ == 32 && ep > 0) {
				for (A = 0; A < jx; A++) {
					j[A * ep] = kA(gu, jt);
					jt += 2
				}
				for (A = 0; A < iL; A++) j[A] = Math.floor((j[A - A % ep] * (ep - A % ep) + j[A - A % ep + ep] * (A % ep)) / ep)
			} else if (ip != 70 && jx <= 16385) {
				iL = jx;
				for (var A = 0; A < jx; A++) j[A] = kA(gu, jt + 2 * A);
				jt += 2 * jx
			}
			var gz = l.t272[0];
			if (j.length != 0) l.t50712 = new Uint16Array(j);
			if (l.t258[0] == 14 && l.t50717 && l.t50717[0] < 1e4) {
				console.log("fixing white");
				l.t50717[0] *= 4
			}
		}
	} else if (I.startsWith("FujiFilm")) {} else if (I.startsWith("Panasonic")) {
		if (l.t277 == null) l.t277 = [1]
	} else alert("Unknown camera " + I)
};

PixelUtil.raw.auI = function(l, d, G, b) {
	if (0 == G) return;
	var V = new Uint32Array(128),
		Q = new Uint8Array(V.buffer),
		t = 127,
		I = 0,
		y = 0;
	for (var t = 0; t < 4; t++) V[t] = b = (b * 15625 >>> 0) * 3125 + 1 >>> 0;
	V[3] = V[3] << 1 | (V[0] ^ V[2]) >>> 31;
	for (var t = 4; t < 127; t++) V[t] = (V[t - 4] ^ V[t - 2]) << 1 | (V[t - 3] ^ V[t - 1]) >>> 31;
	for (var t = 0; t < 127; t++) V[t] = X.q(Q, t * 4);
	for (; G > 0; G--) {
		V[t & 127] = V[t + 1 & 127] ^ V[t + 1 + 64 & 127];
		var e = V[t & 127],
			M = l[I];
		M ^= e;
		d[y] = M;
		I++;
		y++;
		t++
	}
};

PixelUtil.raw.a2m = function(l, d) {
	var G = X.Ko(d, 0, 4),
		b = PixelUtil.raw.aip;
	for (var A = 0; A < b.length; A++)
		if (b[A][0] == l && G.startsWith(b[A][1]) && (b[A][2] == 0 || b[A][2] == d.length)) return b[A];
	throw "e"
};

PixelUtil.raw.aq0 = function(l) {
	if (l.t29 == null) return [];
	var d = PixelUtil.raw.a4S,
		G = PixelUtil.raw.anh,
		b = l.t29[0],
		V = 0,
		t = 0;
	for (var A = 0; A < b.length; A++) {
		var Q = b.charCodeAt(A);
		V = V * 10 + (48 <= Q && Q <= 57 ? Q - 48 : Q % 10)
	}
	var f5 = l.t167[0];
	for (var A = 0; A < 4; A++) t ^= f5 >>> (A << 3) & 255;
	var I = d[V & 255],
		y = G[t & 255];
	return [I, y, 96]
};

PixelUtil.raw.ag$ = function(l, d) {
	var G = l["t" + d],
		f5 = G.length,
		b = PixelUtil.raw.a2m(d, G),
		V = X.Ko(G, 0, 4),
		Q, t = b[4];
	if (t == null) Q = G.slice(4);
	else {
		Q = new Uint8Array(f5 - t);
		var I = PixelUtil.raw.aq0(l),
			y = I[0],
			e = I[1],
			M = I[2];
		for (var A = 0; A < Q.length; A++) {
			e = e + y * M++ & 255;
			Q[A] = G[t++] ^ e
		}
	}
	return [V, f5, Q]
};

PixelUtil.raw.aip = [
	[145, "0208", 0, 0, 4],
	[145, "0209", 0, 1, 4],
	[145, "0210", 5291, 2, 4],
	[145, "0210", 5303, 3, 4],
	[145, "02", 0, 4, 4],
	[145, "01", 0, 5, null],
	[151, "0100", 0, 0, null],
	[151, "0102", 0, 1, null],
	[151, "0103", 0, 4, null],
	[151, "0204", 0, 3, 284],
	[151, "0205", 0, 2, 4],
	[151, "0206", 0, 3, 284],
	[151, "0207", 0, 3, 284],
	[151, "0208", 0, 3, 284],
	[151, "0209", 0, 5, 284],
	[151, "02", 0, 3, 284],
	[152, "0100", 0, 0, null],
	[152, "0101", 0, 1, null],
	[152, "0201", 0, 1, 4],
	[152, "0202", 0, 1, 4],
	[152, "0203", 0, 1, 4],
	[152, "0204", 0, 2, 4],
	[168, "0100", 0, 0, null],
	[168, "0101", 0, 0, null],
	[168, "0102", 0, 1, null],
	[168, "0103", 0, 2, null]
];
PixelUtil.raw.a4S = [193, 191, 109, 13, 89, 197, 19, 157, 131, 97, 107, 79, 199, 127, 61, 61, 83, 89, 227, 199, 233, 47, 149, 167, 149, 31, 223, 127, 43, 41, 199, 13, 223, 7, 239, 113, 137, 61, 19, 61, 59, 19, 251, 13, 137, 193, 101, 31, 179, 13, 107, 41, 227, 251, 239, 163, 107, 71, 127, 149, 53, 167, 71, 79, 199, 241, 89, 149, 53, 17, 41, 97, 241, 61, 179, 43, 13, 67, 137, 193, 157, 157, 137, 101, 241, 233, 223, 191, 61, 127, 83, 151, 229, 233, 149, 23, 29, 61, 139, 251, 199, 227, 103, 167, 7, 241, 113, 167, 83, 181, 41, 137, 229, 43, 167, 23, 41, 233, 79, 197, 101, 109, 107, 239, 13, 137, 73, 47, 179, 67, 83, 101, 29, 73, 163, 19, 137, 89, 239, 107, 239, 101, 29, 11, 89, 19, 227, 79, 157, 179, 41, 67, 43, 7, 29, 149, 89, 89, 71, 251, 229, 233, 97, 71, 47, 53, 127, 23, 127, 239, 127, 149, 149, 113, 211, 163, 11, 113, 163, 173, 11, 59, 181, 251, 163, 191, 79, 131, 29, 173, 233, 47, 113, 101, 163, 229, 7, 53, 61, 13, 181, 233, 229, 71, 59, 157, 239, 53, 163, 191, 179, 223, 83, 211, 151, 83, 73, 113, 7, 53, 97, 113, 47, 67, 47, 17, 223, 23, 151, 251, 149, 59, 127, 107, 211, 37, 191, 173, 199, 197, 197, 181, 139, 239, 47, 211, 7, 107, 37, 73, 149, 37, 73, 109, 113, 199];
PixelUtil.raw.anh = [167, 188, 201, 173, 145, 223, 133, 229, 212, 120, 213, 23, 70, 124, 41, 76, 77, 3, 233, 37, 104, 17, 134, 179, 189, 247, 111, 97, 34, 162, 38, 52, 42, 190, 30, 70, 20, 104, 157, 68, 24, 194, 64, 244, 126, 95, 27, 173, 11, 148, 182, 103, 180, 11, 225, 234, 149, 156, 102, 220, 231, 93, 108, 5, 218, 213, 223, 122, 239, 246, 219, 31, 130, 76, 192, 104, 71, 161, 189, 238, 57, 80, 86, 74, 221, 223, 165, 248, 198, 218, 202, 144, 202, 1, 66, 157, 139, 12, 115, 67, 117, 5, 148, 222, 36, 179, 128, 52, 229, 44, 220, 155, 63, 202, 51, 69, 208, 219, 95, 245, 82, 195, 33, 218, 226, 34, 114, 107, 62, 208, 91, 168, 135, 140, 6, 93, 15, 221, 9, 25, 147, 208, 185, 252, 139, 15, 132, 96, 51, 28, 155, 69, 241, 240, 163, 148, 58, 18, 119, 51, 77, 68, 120, 40, 60, 158, 253, 101, 87, 22, 148, 107, 251, 89, 208, 200, 34, 54, 219, 210, 99, 152, 67, 161, 4, 135, 134, 247, 166, 38, 187, 214, 89, 77, 191, 106, 46, 170, 43, 239, 230, 120, 182, 78, 224, 47, 220, 124, 190, 87, 25, 50, 126, 42, 208, 184, 186, 41, 0, 60, 82, 125, 168, 73, 59, 45, 235, 37, 73, 250, 163, 170, 57, 167, 197, 167, 80, 17, 54, 251, 198, 103, 74, 245, 165, 18, 101, 126, 176, 223, 175, 78, 179, 97, 127, 47];
PixelUtil.O7 = {};
PixelUtil.O7.O7 = function(l, d, G, b, V) {
	if (b == null) b = 3;
	if (V == null) V = !0;
	var Q = l.m,
		t = l.n,
		I = 1 / Q,
		y = Q * t,
		e = Date.now(),
		M = !1,
		R = PixelUtil.O7.MM(G, Q, t, 255, 128),
		J = PixelUtil.O7.MM(G, Q, t, 0, 128),
		O = 0;
	if (M) console.log("extract contours", Date.now() - e);
	e = Date.now();
	var n = function(iP, jp) {
		var hG = iP << 2,
			hf = jp << 2;
		return d[hG] + d[hG + 1] + d[hG + 2] - (d[hf] + d[hf + 1] + d[hf + 2])
	};
	R.sort(n);
	J.sort(n);
	var r = PixelUtil.allocBytes(y),
		T = PixelUtil.allocBytes(y),
		j = [],
		g = new Uint32Array(Q * t);
	g.fill(4294967295);
	for (var A = 0; A < y; A++)
		if (G[A] == 0) T[A] = 255;
		else if (G[A] == 255) r[A] = 255;
	else {
		g[A] = j.length;
		j.push(A)
	}
	var Y = R.length,
		k = J.length,
		F = j.length;

	function D(iP, jp, hG, hf) {
		var d2 = iP.length,
			gu = new Array(d2 * 2);
		for (var A = 0; A < d2; A++) {
			var z = iP[A],
				P = ~~(z * hf),
				C = z - P * hG,
				dY = z << 2;
			gu[A * 2] = C << 16 | P;
			gu[A * 2 + 1] = jp[dY] << 16 | jp[dY + 1] << 8 | jp[dY + 2]
		}
		return gu
	}
	var q = D(R, d, Q, I),
		H = D(J, d, Q, I),
		W = D(j, d, Q, I);
	if (M) console.log("Itemize", Date.now() - e, "Unknown:", F, Y, k);
	e = Date.now();
	var Z = PixelUtil.style.i5(r, Q, t, !0),
		B = PixelUtil.style.i5(T, Q, t, !0),
		a = new Array(F),
		m = new Array(F),
		p = new Array(F),
		c = new Array(F),
		v = new Array(F);
	if (M) console.log("Dist transform", Date.now() - e);
	e = Date.now();
	var i = PixelUtil.O7.mF;
	for (var A = 0; A < F; A++) {
		var z = j[A],
			P = ~~(z * I),
			C = z - P * Q,
			h = Z[z << 1],
			L = Z[(z << 1) + 1],
			U = Math.sqrt(h * h + L * L),
			S = B[z << 1],
			E = B[(z << 1) + 1],
			x = Math.sqrt(S * S + E * E);
		a[A] = 1 / U;
		m[A] = 1 / x;
		var K = Math.floor(PixelUtil.blend.b_(z * 17) * Y),
			u = Math.floor(PixelUtil.blend.b_(z * 19) * k);
		p[A] = K;
		c[A] = u;
		v[A] = i(W[A * 2], W[A * 2 + 1], q[K * 2], q[K * 2 + 1], H[u * 2], H[u * 2 + 1], a[A], m[A], 1e9)
	}
	var bC = [-Q - 1, -Q, -Q + 1, -1, 1, Q - 1, Q, Q + 1];
	while (Math.floor(Math.max(Y, k) * Math.pow(.5, O)) > 1) O++;
	for (var $ = 0; $ < b; $++) {
		var gX = 0;
		for (var A = 0; A < F; A++) {
			var z = j[A],
				P = ~~(z * I),
				C = z - P * Q,
				_ = a[A],
				jI = m[A],
				iw = W[A * 2],
				hn = W[A * 2 + 1],
				jq = v[A],
				K = p[A],
				u = c[A],
				dK = 1;
			if (P != 0 && C != 0 && C != Q - 1 && P != t - 1)
				for (var iv = 0; iv < 8; iv++) {
					var kq = g[z + bC[iv]];
					if (kq == 4294967295) continue;
					var eE = p[kq],
						e8 = c[kq];
					if (eE == K && e8 == u) continue;
					var aI = i(iw, hn, q[eE * 2], q[eE * 2 + 1], H[e8 * 2], H[e8 * 2 + 1], _, jI, jq);
					if (aI < jq) {
						jq = aI;
						K = eE;
						u = e8
					}
				}
			for (var jC = 0; jC < O; jC++) {
				var d7 = ~~(Y * dK),
					ka = ~~(k * dK);
				dK *= .5;
				var hS = PixelUtil.blend.b_(z + $ * 17 + jC * 31),
					eH = PixelUtil.blend.b_(z + $ * 29 + jC * 63),
					kA = Math.max(0, K - d7),
					gq = Math.min(K + d7, Y - 1),
					hb = Math.max(0, u - ka),
					fs = Math.min(u + ka, k - 1),
					eE = kA + ~~(hS * (gq - kA)),
					e8 = hb + ~~(eH * (fs - hb)),
					aI = i(iw, hn, q[eE * 2], q[eE * 2 + 1], H[e8 * 2], H[e8 * 2 + 1], _, jI, jq);
				if (aI < jq) {
					jq = aI;
					K = eE;
					u = e8
				}
			}
			v[A] = jq;
			p[A] = K;
			c[A] = u;
			gX += jq
		}
	}
	if (M) console.log(gX);
	if (M) console.log("iterations", Date.now() - e);
	e = Date.now();
	var f_ = G.slice(0);
	for (var A = 0; A < F; A++) {
		var bD = PixelUtil.O7.alpha(W[A * 2 + 1], q[p[A] * 2 + 1], H[c[A] * 2 + 1]);
		f_[j[A]] = ~~(.5 + 255 * bD)
	}
	f_ = PixelUtil.q7.af1(f_, d, new Rect(0, 0, Q, t), 16, .01 * .01);
	if (M) console.log("guided filter", Date.now() - e);
	e = Date.now();
	if (V)
		for (var A = 0; A < y; A++)
			if (G[A] == 255 || G[A] == 0) f_[A] = G[A];
	var ae = d.slice(0);
	for (var A = 0; A < F; A++) {
		var em = j[A],
			K = R[p[A]],
			jq = v[A],
			dY = em << 2,
			f7 = f_[em],
			bM = (f7 >= 250 ? em : K) << 2;
		ae[dY] = d[bM];
		ae[dY + 1] = d[bM + 1];
		ae[dY + 2] = d[bM + 2]
	}
	PixelUtil.writeChannelToRgba(f_, ae, 3);
	if (M) console.log(Date.now() - e);
	e = Date.now();
	return ae
};

PixelUtil.O7.mF = function(l, d, G, b, V, Q, t, I, y) {
	var e = l >>> 16,
		M = l & 65535,
		R = e - (G >>> 16),
		J = M - (G & 65535),
		n = e - (V >>> 16),
		r = M - (V & 65535),
		T = Math.sqrt(R * R + J * J) * t,
		j = Math.sqrt(n * n + r * r) * I;
	if (T + j >= y) return 1e9;
	var g = PixelUtil.O7.auG(d, b, Q);
	return g + T + j
};

PixelUtil.O7.auG = function(l, d, G) {
	var b = l >>> 16,
		V = l >>> 8 & 255,
		Q = l & 255,
		t = d >>> 16,
		I = d >>> 8 & 255,
		y = d & 255,
		e = G >>> 16,
		M = G >>> 8 & 255,
		R = G & 255,
		J = PixelUtil.O7.alpha(l, d, G),
		n = b - (J * t + (1 - J) * e),
		r = V - (J * I + (1 - J) * M),
		T = Q - (J * y + (1 - J) * R);
	return Math.sqrt(n * n + r * r + T * T)
};

PixelUtil.O7.alpha = function(l, d, G) {
	var b = l >>> 16,
		V = l >>> 8 & 255,
		Q = l & 255,
		t = d >>> 16,
		I = d >>> 8 & 255,
		y = d & 255,
		e = G >>> 16,
		M = G >>> 8 & 255,
		R = G & 255,
		J = t - e,
		n = I - M,
		r = y - R,
		T = b - e,
		j = V - M,
		g = Q - R,
		Y = J * J + n * n + r * r,
		k = Y == 0 ? .5 : (T * J + j * n + g * r) / Y;
	return Math.max(0, Math.min(1, k))
};

PixelUtil.O7.adq = function(l) {};
PixelUtil.O7.MM = function(l, d, G, b, V) {
	var Q = [],
		t = d - 1,
		I = G - 1;
	for (var y = 1; y < I; y++)
		for (var e = 1; e < t; e++) {
			var A = y * d + e;
			if (l[A] == b && (l[A - d - 1] == V || l[A - d] == V || l[A - d + 1] == V || (l[A - 1] == V || l[A + 1] == V) || (l[A + d - 1] == V || l[A + d] == V || l[A + d + 1] == V))) Q.push(A)
		}
	return Q
};

PixelUtil.q7 = {};
PixelUtil.q7.auR = function(l, d, G, b, V) {
	var Q = G.m,
		t = G.n,
		I = Q * t,
		y = PixelUtil.q7.fJ,
		e = PixelUtil.allocBytes(I * 4),
		M;
	PixelUtil.andMaskUint32(e, 4294967295);
	var R = G,
		J = l,
		n = d,
		r = b;
	PixelUtil.writeChannelToRgba(l, e, 0);
	M = PixelUtil.downsampleRgbaWeighted(e, G);
	M = PixelUtil.downsampleRgbaWeighted(M.QI, M.rect);
	R = M.rect;
	r = b >>> 2;
	console.log(R, r);
	J = PixelUtil.allocBytes(R.O());
	PixelUtil.extractChannelFromRgba(M.QI, J, 0);
	PixelUtil.writeChannelToRgba(d, e, 0);
	M = PixelUtil.downsampleRgbaWeighted(e, G);
	M = PixelUtil.downsampleRgbaWeighted(M.QI, M.rect);
	n = PixelUtil.allocBytes(R.O());
	PixelUtil.extractChannelFromRgba(M.QI, n, 0);
	var T = PixelUtil.q7.amq(J, n, R, r, V),
		j = T[0],
		g = T[1],
		Y = new Rect(0, 0, R.m * 2, R.n * 2);
	j = y(j, R, Y, !0);
	j = y(j, Y, G, !0);
	g = y(g, R, Y, !0);
	g = y(g, Y, G, !0);
	var k = PixelUtil.allocBytes(I);
	for (var A = 0; A < I; A++) k[A] = Math.max(0, Math.min(255, Math.floor(.5 + (j[A] * d[A] + 255 * g[A]))));
	return k
};

PixelUtil.q7.fJ = function(l, d, G, b) {
	var V = G.m,
		Q = G.n,
		t = d.m,
		I = d.n,
		y = PixelUtil.q7.Wu,
		e = new Float32Array(V * Q);
	for (var M = 0; M < I; M++) {
		var R = (M + M) * V;
		for (var J = 0; J < t; J++) {
			if (!0 || J == 0 || M == 0 || J == t - 1 || M == I - 1) e[R] = e[R + 1] = e[R + V] = e[R + V + 1] = l[M * t + J];
			else {
				e[R] = y(J + .25, M + .25, l, t, I);
				e[R + 1] = y(J + .75, M + .25, l, t, I);
				e[R + V] = y(J + .25, M + .75, l, t, I);
				e[R + V + 1] = y(J + .75, M + .75, l, t, I)
			}
			R += 2
		}
	}
	return e
};

PixelUtil.q7.Wu = function(l, d, G, b, V) {
	l -= .499999;
	d -= .499999;
	var Q = Math.floor(l),
		t = Math.floor(d),
		I = t * b + Q,
		y = l - Q,
		e = d - t,
		M = (1 - e) * (1 - y),
		R = (1 - e) * y,
		J = e * (1 - y),
		n = e * y;
	if (G[I] == null || G[I + b + 1] == null) {
		console.log(l, d, b, V);
		throw "e"
	}
	return M * G[I + 0] + R * G[I + 1] + J * G[I + b + 0] + n * G[I + b + 1]
};

PixelUtil.q7.amq = function(l, d, G, b, V) {
	var Q = G.m,
		t = G.n,
		I = Q * t,
		y = PixelUtil.q7.cJ,
		e = PixelUtil.q7.Q,
		M = PixelUtil.sX._D,
		R = PixelUtil.q7.yI,
		d = y(d),
		l = y(l),
		J = e(I);
	M(d, J, G, b);
	var n = e(I);
	M(l, n, G, b);
	var r = e(I);
	R(d, d, r);
	M(r, r, G, b);
	var T = e(I);
	R(d, l, T);
	M(T, T, G, b);
	var j = e(I),
		g = e(I);
	for (var A = 0; A < I; A++) {
		var Y = J[A],
			k = n[A],
			F = r[A] - Y * Y,
			D = T[A] - Y * k,
			q = D / (F + V),
			H = k - q * Y;
		j[A] = q;
		g[A] = H
	}
	var W = e(I);
	M(j, W, G, b);
	var Z = e(I);
	M(g, Z, G, b);
	return [W, Z]
};

PixelUtil.q7.af1 = function(l, d, G, b, V) {
	var Q = G.m,
		t = G.n,
		I = Q * t,
		y = PixelUtil.q7.fJ,
		e = Date.now(),
		M = !1,
		R = G,
		J = l,
		n = d,
		r = b;
	R = new Rect(0, 0, Q >>> 2, t >>> 2);
	r = b >>> 2;
	J = PixelUtil.q7.a8y(l, Q, t);
	n = PixelUtil.q7.ar6(d, Q, t);
	if (M) console.log(Date.now() - e);
	e = Date.now();
	var T = PixelUtil.q7.ax1(J, n, R, r, V),
		j = T[0],
		g = T[1],
		Y = T[2],
		k = T[3];
	if (M) console.log(Date.now() - e);
	e = Date.now();
	var F = PixelUtil.allocBytes(I);
	for (var D = 0; D < t; D++)
		for (var q = 0; q < Q; q++) {
			var A = D * Q + q,
				H = (D >>> 2) * (Q >>> 2) + (q >>> 2),
				W = A << 2,
				Z = j[H] * d[W] + g[H] * d[W + 1] + Y[H] * d[W + 2] + k[H] * 255;
			F[A] = Math.max(0, Math.min(255, ~~(.5 + Z)))
		}
	if (M) console.log(Date.now() - e);
	e = Date.now();
	return F
};

PixelUtil.q7.a8y = function(l, d, G) {
	var b = d >>> 2,
		V = G >>> 2,
		Q = PixelUtil.allocBytes(d * G);
	for (var t = 0; t < V; t++)
		for (var I = 0; I < b; I++) Q[t * b + I] = l[t * d + I << 2];
	return Q
};

PixelUtil.q7.ar6 = function(l, d, G) {
	var b = d >>> 2,
		V = G >>> 2,
		Q = PixelUtil.allocBytes(d * G * 4);
	for (var t = 0; t < V; t++)
		for (var I = 0; I < b; I++) {
			var y = t * b + I << 2,
				e = t * d + I << 4;
			Q[y] = l[e];
			Q[y + 1] = l[e + 1];
			Q[y + 2] = l[e + 2];
			Q[y + 3] = l[e + 3]
		}
	return Q
};

PixelUtil.q7.ax1 = function(l, d, G, b, V) {
	var Q = G.m,
		t = G.n,
		I = Q * t,
		y = PixelUtil.q7.cJ,
		e = PixelUtil.q7.Q,
		M = PixelUtil.sX._D,
		R = PixelUtil.q7.yI,
		l = y(l),
		J = new WebGLContext.RgbaFloatPlanes(Q * t);
	PixelUtil.rgbaToChannelPlanes(d, J);
	var d = [y(J.o), y(J.J), y(J.k)],
		n = PixelUtil.q7.a03(l, d, G, b, V),
		r = e(I);
	M(l, r, G, b);
	var T = e(I);
	R(d[0], l, T);
	M(T, T, G, b);
	var j = e(I);
	R(d[1], l, j);
	M(j, j, G, b);
	var g = e(I);
	R(d[2], l, g);
	M(g, g, G, b);
	var Y = e(I),
		k = e(I),
		F = e(I),
		D = e(I);
	for (var A = 0; A < I; A++) {
		var q = r[A],
			H = n.uk[A],
			W = n.h5[A],
			Z = n.s_[A],
			B = T[A] - H * q,
			a = j[A] - W * q,
			m = g[A] - Z * q;
		Y[A] = n.av5[A] * B + n.V9[A] * a + n.Rt[A] * m;
		k[A] = n.V9[A] * B + n.ao5[A] * a + n.Gi[A] * m;
		F[A] = n.Rt[A] * B + n.Gi[A] * a + n.awb[A] * m;
		D[A] = q - Y[A] * H - k[A] * W - F[A] * Z
	}
	M(Y, Y, G, b);
	M(k, k, G, b);
	M(F, F, G, b);
	M(D, D, G, b);
	return [Y, k, F, D]
};

PixelUtil.q7.a03 = function(l, d, G, b, V) {
	var Q = G.m,
		t = G.n,
		I = Q * t,
		y = PixelUtil.q7.Q,
		e = PixelUtil.sX._D,
		M = PixelUtil.q7.yI,
		R = {};
	R.uk = y(I);
	e(d[0], R.uk, G, b);
	R.h5 = y(I);
	e(d[1], R.h5, G, b);
	R.s_ = y(I);
	e(d[2], R.s_, G, b);
	var J = y(I);
	M(d[0], d[0], J);
	e(J, J, G, b);
	var n = y(I);
	M(d[0], d[1], n);
	e(n, n, G, b);
	var r = y(I);
	M(d[0], d[2], r);
	e(r, r, G, b);
	var T = y(I);
	M(d[1], d[1], T);
	e(T, T, G, b);
	var j = y(I);
	M(d[1], d[2], j);
	e(j, j, G, b);
	var g = y(I);
	M(d[2], d[2], g);
	e(g, g, G, b);
	R.av5 = J;
	R.V9 = n;
	R.Rt = r;
	R.ao5 = T;
	R.Gi = j;
	R.awb = g;
	for (var A = 0; A < I; A++) {
		var Y = R.uk[A],
			k = R.h5[A],
			F = R.s_[A],
			D = J[A] - Y * Y + V,
			q = n[A] - Y * k,
			H = r[A] - Y * F,
			W = T[A] - k * k + V,
			Z = j[A] - k * F,
			B = g[A] - F * F + V,
			a = W * B - Z * Z,
			m = Z * H - q * B,
			p = q * Z - W * H,
			c = D * B - H * H,
			v = H * q - D * Z,
			i = D * W - q * q,
			z = a * D + m * q + p * H,
			P = 1 / z;
		R.av5[A] = a * P;
		R.V9[A] = m * P;
		R.Rt[A] = p * P;
		R.ao5[A] = c * P;
		R.Gi[A] = v * P;
		R.awb[A] = i * P
	}
	return R
};

PixelUtil.q7.Q = function(l) {
	return new Float32Array(l)
};

PixelUtil.q7.cJ = function(l) {
	var d = l.length,
		G = new Float32Array(d);
	for (var A = 0; A < d; A++) G[A] = l[A] * (1 / 255);
	return G
};

PixelUtil.q7.yI = function(l, d, G) {
	for (var A = 0; A < l.length; A++) G[A] = l[A] * d[A]
};

PixelUtil._i = {};
PixelUtil._i.N8 = function(l, d, G, b) {
	var V = l[d] - G[b],
		Q = l[d + 1] - G[b + 1],
		t = l[d + 2] - G[b + 2];
	return Math.sqrt(V * V + Q * Q + t * t) * (1 / 441.7)
};

PixelUtil._i.getSelection = function(l, d, G) {
	var b = d * G,
		V = PixelUtil.allocBytes(b),
		Q = !1,
		t = Math.round(G * .7),
		I = 1,
		y = new Uint32Array(12),
		e = PixelUtil.allocBytes(12);
	for (var M = 0; M < t; M++)
		for (var R = 0; R < d; R++) {
			if (R < I || M < I || R > d - I - 1 || M > G - I - 1) {
				var A = M * d + R,
					J = A << 2,
					n = 0;
				if (M < I) n = 4;
				else if (R > d - I - 1) n = 8;
				y[n] += l[J];
				y[n + 1] += l[J + 1];
				y[n + 2] += l[J + 2];
				y[n + 3]++;
				V[A] = 255
			}
		}
	for (var A = 0; A < 12; A += 4)
		for (var r = 0; r < 3; r++) e[A + r] = y[A + r] / y[A + 3];
	var T = new Float32Array(b);
	for (var A = 0; A < b; A++) {
		var J = A * 4,
			j = PixelUtil._i.N8(l, J, e, 0),
			g = PixelUtil._i.N8(l, J, e, 4),
			Y = PixelUtil._i.N8(l, J, e, 8),
			k = Math.max(j, Math.max(g, Y));
		T[A] = j + g + Y - k
	}
	PixelUtil._i.Zu(T);
	var F = Date.now(),
		D = new Float32Array(b),
		q = [],
		H = PixelUtil.allocBytes(b);
	for (var A = 0; A < 3; A++) {
		PixelUtil.extractChannelFromRgba(l, H, A);
		var W = new Uint16Array(b);
		q.push(W);
		PixelUtil._i.a4A(H, V, d, G, W)
	}
	if (Q) console.log("MBD", Date.now() - F);
	F = Date.now();
	for (var A = 0; A < b; A++) D[A] = q[0][A] + q[1][A] + q[2][A];
	PixelUtil._i.Zu(D);
	for (var A = 0; A < b; A++) D[A] += .4 * T[A];
	var Z = d >>> 1,
		t = G >>> 1,
		B = 1 / Math.sqrt(Z * Z + t * t);
	for (var M = 0; M < G; M++)
		for (var R = 0; R < d; R++) {
			var a = R - Z,
				m = M - t,
				p = 1 - Math.sqrt(a * a + m * m) * B;
			D[M * d + R] *= p
		}
	if (Q) console.log("Centeredness", Date.now() - F);
	F = Date.now();
	for (var A = 0; A < b; A++) V[A] = D[A] * 255;
	var c = Math.round(d / 120),
		v = Math.round(c * .8);
	if (Q) console.log(c, v);
	PixelUtil.u5.kt(V, V, d, G, c + c + 1, !1);
	if (Q) console.log("erosion", Date.now() - F);
	F = Date.now();
	for (var A = 0; A < b; A++) D[A] = V[A];
	PixelUtil._i.Zu(D);
	var i = PixelUtil.allocBytes(256);
	for (var A = 0; A < 256; A++) i[A] = 256 / (1 + Math.exp(-20 * (A / 255 - .5)));
	for (var A = 0; A < b; A++) {
		var z = ~~(D[A] * 255 + .5);
		V[A] = i[z]
	}
	if (Q) console.log("Simoid", Date.now() - F);
	F = Date.now();
	return V
};

PixelUtil._i.Zu = function(l) {
	var d = l.length,
		G = 0;
	for (var A = 0; A < d; A++) G = Math.max(G, l[A]);
	var b = 1 / G;
	for (var A = 0; A < d; A++) l[A] = l[A] * b
};

PixelUtil._i.a4A = function(l, d, G, b, V) {
	var Q = G * b,
		t = l.slice(0),
		I = l.slice(0);
	for (var A = 0; A < Q; A++) V[A] = d[A] == 255 ? 0 : 65535;
	PixelUtil._i.x6(l, I, t, V, G, b);
	PixelUtil._i.Jt(l, I, t, V, G, b);
	PixelUtil._i.x6(l, I, t, V, G, b);
	PixelUtil._i.Jt(l, I, t, V, G, b);
	return V
};

PixelUtil._i.x6 = function(l, d, G, b, V, Q) {
	for (var t = 1; t < V; t++) PixelUtil._i.ns(t, -1, l, d, G, b);
	for (var I = 1; I < Q; I++) {
		PixelUtil._i.ns(I * V, -V, l, d, G, b);
		for (var t = 1; t < V; t++) {
			var A = I * V + t;
			PixelUtil._i.ns(A, -1, l, d, G, b);
			PixelUtil._i.ns(A, -V, l, d, G, b)
		}
	}
};

PixelUtil._i.Jt = function(l, d, G, b, V, Q) {
	for (var t = V - 2; t >= 0; t--) PixelUtil._i.ns(V * Q - V + t, 1, l, d, G, b);
	for (var I = Q - 2; I >= 0; I--) {
		PixelUtil._i.ns(I * V + V - 1, V, l, d, G, b);
		for (var t = V - 2; t >= 0; t--) {
			var A = I * V + t;
			PixelUtil._i.ns(A, 1, l, d, G, b);
			PixelUtil._i.ns(A, V, l, d, G, b)
		}
	}
};

PixelUtil._i.ns = function(A, l, d, G, b, V) {
	var Q = A + l,
		t = d[A],
		I = G[Q],
		y = b[Q];
	if (I < t) I = t;
	else if (t < y) y = t;
	var e = I - y;
	if (V[Q] != 65535 && e < V[A]) {
		V[A] = e;
		G[A] = I;
		b[A] = y
	}
};

PixelUtil.GJ = {};
PixelUtil.GJ.filter = function(l, d, G, b) {
	var V = d.m,
		Q = d.n,
		t = V * Q,
		I = b[0],
		y = b[1],
		e = b[2],
		M = b[3],
		R = b[4],
		J = b[5],
		n = b[6],
		r = Date.now(),
		T = new Float32Array(V * Q * 4);
	PixelUtil.GJ.alk(l, V, Q, T);
	var j = Math.ceil(I * Math.sqrt(-2 * Math.log(.1))),
		g = new ArrayBuffer(t * 4),
		Y = new Float32Array(g),
		k = new Float32Array(t),
		F = new Float32Array(t);
	for (var A = 0; A < t; A++) {
		var D = A * 4;
		Y[A] = T[D];
		k[A] = T[D + 1];
		F[A] = T[D + 2]
	}
	PixelUtil.sX.sU(Y, Y, d, j * 1 / 2.4, 2);
	PixelUtil.sX.sU(k, k, d, j * 1 / 2.4, 2);
	PixelUtil.sX.sU(F, F, d, j * 1 / 2.4, 2);
	for (var A = 0; A < t; A++) {
		var D = A * 4;
		T[D] = Y[A];
		T[D + 1] = k[A];
		T[D + 2] = F[A]
	}
	var q = new Uint8Array(g);
	for (var A = 0; A < t; A++) {
		var D = A * 4,
			H = A * 4,
			Y = T[D],
			k = T[D + 1],
			F = T[D + 2],
			W = Math.sqrt((Y - F) * (Y - F) + 4 * k * k),
			Z = (Y + F + W) * .5,
			B = (Y + F - W) * .5,
			a = B - F,
			m = k,
			p = a * a + m * m;
		if (p != 0) {
			var c = Math.sqrt(p),
				v = 1 / c;
			a *= v;
			m *= v
		}
		q[H] = 128 + 127 * a;
		q[H + 1] = 128 + 127 * m
	}
	var i = 1.3 * y + 2,
		z = M * (2 / 10),
		P = l.slice();
	if (WebGLContext.webglAvailable) {
		var C = new Float32Array([1 / V, 1 / Q]),
			h = WebGLContext.getOrCreateTexture(0, V, Q);
		h.set(P);
		var L = WebGLContext.getOrCreateTexture(1, V, Q);
		L.set(q);
		WebGLContext.setFramebufferViewport(h, d);
		if (R) {
			h.copyToAuxTexture(d);
			WebGLContext.filter.wF({
				type: WebGLContext.filter.axl,
				wl: C,
				azE: 1 / e,
				a8_: z
			}, h.auxTexture)
		}
		h.copyToAuxTexture(d);
		WebGLContext.filter.wF({
			type: WebGLContext.filter.ET,
			qY: L.glTexture,
			wl: C,
			acr: i,
			a0W: 2
		}, h.auxTexture);
		if (R) {
			h.copyToAuxTexture(d);
			WebGLContext.filter.wF({
				type: WebGLContext.filter.apw,
				wl: C,
				a7M: new Float32Array(n),
				arm: J
			}, h.auxTexture)
		}
		h.get(G)
	} else {
		if (R) PixelUtil.GJ.kW(1 / e, z, P, V, Q);
		PixelUtil.GJ.ET(P, G, q, V, Q, i);
		if (R) PixelUtil.GJ.a7N(V, Q, G, n, J)
	}
	var U = t * 4;
	for (var A = 3; A < U; A += 4) G[A] = l[A]
};

PixelUtil.GJ.ET = function(l, d, G, b, V, Q) {
	var t = Math.ceil(2 * Q),
		I = -1 / (2 * Q * Q),
		y = [],
		e = 1;
	for (var A = 0; A < t + 20; A++) y[A] = Math.exp(A * A * I);
	var M = [0, 0, 0, 0];
	for (var R = 0; R < V; R++) {
		for (var J = 0; J < b; J++) {
			var n = R * b + J,
				r = n * 4,
				T = 1,
				j = l[r],
				g = l[r + 1],
				Y = l[r + 2],
				k = l[r + 3],
				F = (G[r] - 128) * (1 / 127),
				D = (G[r + 1] - 128) * (1 / 127),
				q = F,
				H = D,
				W = J == 0 ? .51 : .49,
				Z = R == 0 ? .51 : .49;
			for (var A = 0; A < 2; A++) {
				var B = J + W,
					a = R + Z,
					m = 0;
				while (m < t) {
					if (B < .5 || b - .5 < B || a < .5 || V - .5 < a) break;
					var p = ~~B,
						c = ~~a,
						v = c * b + p,
						i = v * 4,
						z = (G[i] - 128) * (1 / 127),
						P = (G[i + 1] - 128) * (1 / 127);
					if (z * q + P * H < 0) {
						z = -z;
						P = -P
					}
					q = z;
					H = P;
					B += e * z;
					a += e * P;
					if (B < .5 || b - .5 < B || a < .5 || V - .5 < a) break;
					var C = ~~B,
						h = ~~a,
						L = h * b + C << 2;
					m += e;
					var U = y[~~m];
					PixelUtil.canvas.w2(B, a, l, b, V, M);
					j += M[0] * U;
					g += M[1] * U;
					Y += M[2] * U;
					k += M[3] * U;
					T += U
				}
				q = -F;
				H = -D
			}
			var S = 1 / T;
			d[r] = ~~(.5 + j * S);
			d[r + 1] = ~~(.5 + g * S);
			d[r + 2] = ~~(.5 + Y * S);
			d[r + 3] = ~~(.5 + k * S)
		}
	}
};

PixelUtil.GJ.a7N = function(l, d, G, b, V) {
	for (var Q = 0; Q < d; Q++)
		for (var t = 0; t < l; t++) {
			var I = Q * l + t << 2,
				y = 1 + PixelUtil.GJ.afv(t, Q, G, l, d, b) * V;
			G[I] = Math.max(0, Math.min(255, G[I] * y));
			G[I + 1] = Math.max(0, Math.min(255, G[I + 1] * y));
			G[I + 2] = Math.max(0, Math.min(255, G[I + 2] * y))
		}
};

PixelUtil.GJ.afv = function(l, d, G, b, V, Q) {
	var t = G[(d * b + Math.max(0, l - 1)) * 4 + 3],
		I = G[(d * b + Math.min(b - 1, l + 1)) * 4 + 3],
		y = G[(Math.max(0, d - 1) * b + l) * 4 + 3],
		e = G[(Math.min(V - 1, d + 1) * b + l) * 4 + 3],
		M = .7,
		R = (I - t) * (1 / 255),
		J = .7,
		n = (e - y) * (1 / 255),
		r = -R * J,
		T = -M * n,
		j = M * J,
		g = Math.sqrt(r * r + T * T + j * j),
		Y = 1 / g,
		k = r * Y,
		F = T * Y,
		D = j * Y,
		q = Q[0] * k + Q[1] * F + Q[2] * D;
	return q
};

PixelUtil.GJ.kW = function(l, d, G, b, V) {
	function Q(I, e, M) {
		return Math.max(e, Math.min(M, I))
	}
	for (var t = 0; t < V; t++)
		for (var I = 0; I < b; I++) {
			var y = PixelUtil.GJ.aow(I + .5, t + .5, l, d);
			G[(t * b + I) * 4 + 3] = Math.max(0, Math.min(255, y * 255))
		}
};

PixelUtil.GJ.aow = function(l, d, G, b) {
	function V(H, W, Z) {
		return (1 - Z) * H + Z * W
	}
	var Q = (l + 613) * G,
		t = (d + 117) * G,
		I = ~~Q,
		y = ~~t,
		e = Q - I,
		M = t - y,
		R = Math.sin(11),
		J = Math.cos(I) * R,
		n = Math.cos(I + 1) * R,
		r = Math.cos(y) * R,
		T = Math.cos(y + 1) * R,
		hZ = PixelUtil.GJ.hash(J, r),
		j = PixelUtil.GJ.hash(n, r),
		g = PixelUtil.GJ.hash(J, T),
		Y = PixelUtil.GJ.hash(n, T),
		k = V(hZ, j, e),
		F = V(g, Y, e),
		D = V(k, F, M);
	D = D < .5 ? 0 : 1;
	var q = D + b * PixelUtil.GJ.hash(Math.cos(Q) * R, Math.cos(t) * R);
	return q * (1 / 3)
};

PixelUtil.GJ.hash = function(l, d) {
	var G = Math.sin(l * 11.697096 + d * 73.32456) * 12157.47691;
	return G - Math.floor(G)
};

PixelUtil.GJ.alk = function(l, d, G, b) {
	var V = [-1, 0, 1, -2, 0, 2, -1, 0, 1],
		Q = [-1, -2, -1, 0, 0, 0, 1, 2, 1],
		t = d - 1,
		I = G - 1,
		y = d * 4;
	for (var e = 1; e < I; e++)
		for (var M = 1; M < t; M++) {
			var A = e * d + M,
				R = A * 4,
				J = PixelUtil.GJ.tX(l, R, y, V),
				n = PixelUtil.GJ.tX(l, R, y, Q),
				r = PixelUtil.GJ.tX(l, R + 1, y, V),
				T = PixelUtil.GJ.tX(l, R + 1, y, Q),
				j = PixelUtil.GJ.tX(l, R + 2, y, V),
				g = PixelUtil.GJ.tX(l, R + 2, y, Q);
			b[R] = J * J + r * r + j * j;
			b[R + 1] = J * n + r * T + j * g;
			b[R + 2] = n * n + T * T + g * g
		}
	PixelUtil.GJ.azh(b, d, G)
};

PixelUtil.GJ.tX = function(l, d, G, b) {
	return l[d - G - 4] * b[0] + l[d - G] * b[1] + l[d - G + 4] * b[2] + l[d - 4] * b[3] + l[d] * b[4] + l[d + 4] * b[5] + l[d + G - 4] * b[6] + l[d + G] * b[7] + l[d + G + 4] * b[8]
};

PixelUtil.GJ.azh = function(l, d, G) {
	function b(y, A, e) {
		var M = A * 4,
			R = e * 4;
		y[R] = y[M];
		y[R + 1] = y[M + 1];
		y[R + 2] = y[M + 2]
	}
	var V = d - 1,
		Q = G - 1;
	b(l, d + 1, 0);
	b(l, 2 * d - 2, d - 1);
	for (var t = 1; t < V; t++) b(l, d + t, t);
	for (var I = 1; I < Q; I++) {
		b(l, I * d + 1, I * d);
		b(l, I * d + d - 2, I * d + d - 1)
	}
	for (var t = 1; t < V; t++) b(l, (G - 2) * d + t, (G - 1) * d + t);
	b(l, (I - 2) * d + 1, (I - 1) * d);
	b(l, (I - 1) * d - 2, I * d - 1)
};

// PixelUtil.brushStamp — brush tip stamp / preset thumbnail rendering helpers
PixelUtil.fd = function() {
	function l(e, M, R, J) {
		var n = new Float32Array(e * e),
			r = e / 2;
		for (var T = 0; T < e; T++)
			for (var j = 0; j < e; j++) {
				var g = j + R - r,
					Y = T + J - r;
				n[T * e + j] = Math.max(0, Math.min(1, M + .5 - Math.sqrt(g * g + Y * Y)))
			}
		return n
	}
	var d = [],
		b = null;

	function G(e, M, R, J) {
		var n = Math.floor(M * 10),
			r = d[n],
			T = e * 8,
			j = T >>> 1;
		if (r == null) {
			r = d[n] = [];
			var g = new Rect(0, 0, T, T),
				Y = e / 2 / (1 + .2 * M),
				k = Math.floor(e * n * .1);
			for (var F = 0; F < 2; F++)
				for (var D = 0; D < 2; D++) {
					var q = l(T, Y, .25 + D * .5, .25 + F * .5),
						H = 0;
					PixelUtil.sX.sU(q, q, g, k);
					while (q[T * j + H] < .005) H++;
					if (H != 0) H--;
					var W = 2 * (j - H),
						Z = new Rect(H, H, W, W),
						B = new Float32Array(W * W);
					for (var a = 0; a < W; a++)
						for (var m = 0; m < W; m++) B[a * W + m] = q[(H + a) * T + H + m];
					r.push([B, Z])
				}
		}
		var p = Math.floor(R),
			c = Math.floor(J),
			v = R - p,
			i = J - c,
			z = v < .5 ? 1 : 0,
			P = i < .5 ? 1 : 0;
		r = r[P * 2 + z];
		var Z = r[1].clone();
		Z.x += p - j;
		Z.y += c - j;
		return [r[0], Z]
	}

	function V(e, M, R) {
		if (b == null) {
			b = new Uint8Array(4e4);
			for (var A = 0; A < 4e4; A++) b[A] = Math.min(255, ~~(.5 + 255 * PixelUtil.srgbToLinear(A * (1 / 255))))
		}
		var J = e.length;
		for (var A = 0; A < J; A++) {
			var n = e[A],
				r = ~~(255 * n);
			M[A] = b[r] << 24 | R
		}
	}

	function Q(e, M, R, J, n) {
		var r = M.wD(J),
			T = Math.max(0, r.x - M.x),
			j = Math.max(0, r.x - J.x),
			g = Math.max(0, r.y - M.y),
			Y = Math.max(0, r.y - J.y),
			k = r.m,
			F = r.n;
		for (var A = 0; A < F; A++) {
			var D = (g + A) * M.m + T,
				q = (Y + A) * J.m + j;
			for (var H = 0; H < k; H++) {
				R[q + H] += n * e[D + H]
			}
		}
	}
	var t = -1;

	function I(e, M, R, J, n) {
		var r = Math.round(J[1] * M * R * .01),
			T = J[2],
			j = J[3],
			g = J[4],
			Y = J[5],
			k = J[6],
			F = J[7],
			D = J[8],
			q = J[9],
			H = J[10] ? J[10] : 1,
			U = !1;
		if (T != t) {
			d = [];
			t = T
		}
		var W = Date.now(),
			Z = new Rect(0, 0, M, R),
			B = new y(J[0]);
		if (n) e.fill(0);
		var a = new Float32Array(n ? e.buffer : M * R);
		for (var A = 0; A < r; A++) {
			var m = B.get() * M,
				p = B.get() * R,
				c = B.get() * j,
				v = B.get() * T * 4,
				i = (B.get() + k) * Math.TAU,
				z = B.get() * T * 4,
				P = (B.get() + 2 * k) * Math.TAU;
			m += q * (v * Math.cos(i) + z * Math.cos(P));
			p += q * (v * Math.sin(i) + z * Math.sin(P));
			if (D) p = p + k * R * H;
			var C = G(T, c, m, p % R),
				h = g,
				L = B.get();
			if (F) h = .5 + .5 * g * (.5 + .5 * Math.sin((2 * k + L) * 2 * Math.PI));
			Q(C[0], C[1], a, Z, h)
		}
		if (U) console.log(Date.now() - W, "add floats");
		W = Date.now();
		var S = new Uint8Array(a.buffer);
		V(a, new Uint32Array(S.buffer), Y.k << 16 | Y.J << 8 | Y.o);
		if (U) console.log(Date.now() - W, "toInt");
		W = Date.now();
		if (!n) {
			PixelUtil.blend.compositeBlend("scrn", S, Z, e, Z, Z, 1);
			if (U) console.log(Date.now() - W, "blendOver")
		}
	}

	function y(e) {
		this.kQ = 123456789;
		this.zF = 987654321;
		this.z = 4294967295;
		this.ED(e)
	}
	y.prototype.ED = function(A) {
		this.kQ = 123456789 + A & this.z;
		this.zF = 987654321 - A & this.z
	};
	y.prototype.get = function() {
		this.zF = 36969 * (this.zF & 65535) + (this.zF >> 16) & this.z;
		this.kQ = 18e3 * (this.kQ & 65535) + (this.kQ >> 16) & this.z;
		var e = (this.zF << 16) + (this.kQ & 65535) >>> 0;
		e /= 4294967296;
		return e
	};
	return {
		Q6: I
	}
}();
PixelUtil.KK = {};
PixelUtil.KK.Hs = function(l, d, G, b) {
	var V = l[d * 2],
		Q = l[d * 2 + 1],
		t = l[G * 2],
		I = l[G * 2 + 1],
		y = l[b * 2],
		e = l[b * 2 + 1];
	return V * I + t * e + y * Q - y * I - t * Q - V * e
};

PixelUtil.KK.ux = function(l, d) {
	var G = [],
		b = [],
		V = [],
		Q = {};
	for (var A = 0; A < d.length; A += 3) {
		var I = ~~(A * (1 / 3)),
			y = d[A + 0],
			e = d[A + 1],
			M = d[A + 2],
			R = PixelUtil.KK.Hs(l, y, e, M);
		if (R > 0) {
			var J = e;
			e = M;
			M = J
		}
		var n = Q[M + "-" + e],
			r = Q[e + "-" + y],
			T = Q[y + "-" + M],
			j = [M, n, I, null],
			g = [e, r, I, j],
			Y = [y, T, I, g];
		j[3] = Y;
		if (n) n[1] = j;
		if (r) r[1] = g;
		if (T) T[1] = Y;
		Q[M + "-" + y] = Y;
		Q[y + "-" + e] = g;
		Q[e + "-" + M] = j;
		G[y] = g;
		V[A] = g;
		G[e] = j;
		V[A + 1] = j;
		G[M] = Y;
		V[A + 2] = Y;
		b[I] = g
	}
	return {
		JF: G,
		kM: b,
		uR: V
	}
};

PixelUtil.KK.avt = function(l) {
	var d = [],
		G = l.kM;
	for (var A = 0; A < G.length; A++) {
		var b = G[A];
		d.push(b[0]);
		b = b[3];
		d.push(b[0]);
		b = b[3];
		d.push(b[0])
	}
	return d
};

PixelUtil.KK.a3_ = function(l, d, G, b) {
	var V = l[d * 2],
		Q = l[d * 2 + 1],
		t = l[G * 2],
		I = l[G * 2 + 1],
		y = l[b * 2],
		e = l[b * 2 + 1],
		M = t - V,
		R = I - Q,
		J = y - V,
		n = e - Q,
		r = M * (V + t) + R * (Q + I),
		T = J * (V + y) + n * (Q + e),
		j = 2 * (M * (e - I) - R * (y - t));
	if (Math.abs(j) < 1e-5) {
		var g = Math.min(V, t, y),
			Y = Math.min(Q, I, e),
			k = (Math.max(V, t, y) - g) * .5,
			F = (Math.max(Q, I, e) - Y) * .5;
		return [g + k, Y + F, k * k + F * F, 1]
	}
	var D = (n * r - R * T) / j,
		q = (M * T - J * r) / j,
		k = D - V,
		F = q - Q;
	return [D, q, k * k + F * F, 0]
};

PixelUtil.KK.ary = function(l, d, G) {
	var b = G[1],
		V = G[3],
		Q = V[3],
		t = b[3],
		I = t[3],
		y = G[2],
		e = b[2],
		M = G[0],
		R = b[0],
		J = V[0],
		n = t[0],
		r = PixelUtil.KK.a3_(l, R, n, J),
		T = l[M * 2] - r[0],
		j = l[M * 2 + 1] - r[1],
		g = T * T + j * j > r[2] && r[3] == 0 && PixelUtil.KK.Hs(l, n, M, J) < 0 && PixelUtil.KK.Hs(l, J, R, n) < 0;
	if (g) {
		G[0] = J;
		b[0] = n;
		G[3] = Q;
		Q[3] = t;
		t[3] = G;
		b[3] = I;
		I[3] = V;
		V[3] = b;
		V[2] = e;
		t[2] = y;
		d.kM[e] = I;
		d.kM[y] = Q;
		d.JF[R] = t;
		d.JF[M] = V
	}
	return g
};

PixelUtil.KK.atU = function(l, d, G) {
	var b = l[d * 2] - l[G * 2],
		V = l[d * 2 + 1] - l[G * 2 + 1];
	return Math.sqrt(b * b + V * V)
};

PixelUtil.KK.a6d = function(l, d, G) {
	var b = G[1],
		V = G[3],
		Q = V[3],
		t, I, y = G[2],
		e, M = G[0],
		R = Q[0],
		J = V[0],
		n;
	if (b) {
		t = b[3];
		I = t[3];
		e = b[2];
		n = t[0]
	}
	var r = l.length >>> 1;
	l[2 * r] = (l[2 * R] + l[2 * M]) * .5;
	l[2 * r + 1] = (l[2 * R + 1] + l[2 * M + 1]) * .5;
	if (!0) {
		var T = y,
			j = G,
			g = d.kM.length,
			Y = [r, null, T, j],
			k = [J, Y, g, Q];
		Y[1] = k;
		var F = [r, null, g, k];
		V[3] = Y;
		Q[3] = F;
		Q[2] = g;
		d.kM[T] = V;
		d.kM[g] = F;
		d.JF[M] = V;
		d.JF[J] = Q;
		d.uR.push(Y, k, F)
	}
	if (b) {
		var D = e,
			q = b,
			H = g + 1;
		F[1] = q, q[1] = F;
		var W = [r, null, D, q],
			Z = [n, W, H, I];
		W[1] = Z;
		var B = [r, j, H, Z];
		j[1] = B;
		t[3] = W;
		I[3] = B;
		I[2] = H;
		d.kM[D] = t;
		d.kM[H] = I;
		d.JF[R] = t;
		d.JF[n] = I;
		d.uR.push(W, Z, B)
	}
	d.JF[r] = j
};

PixelUtil.KK.nz = function(l, d) {
	var G = 0;
	while (!0) {
		var b = G;
		for (var A = 0; A < d.uR.length; A++) {
			var V = d.uR[A];
			if (V[1] == null) continue;
			var Q = PixelUtil.KK.ary(l, d, V);
			if (Q) {
				G++;
				break
			}
		}
		if (b == G) break
	}
	return G != 0
};

PixelUtil.KK.a1N = function(l, d, G, b) {
	var V = 0;
	for (var A = 0; A < b; A++) {
		var Q = null,
			t = 0;
		for (var I = 0; I < d.uR.length; I++) {
			var y = d.uR[I],
				e = PixelUtil.KK.atU(l, y[0], y[3][3][0]) * (y[1] ? 1 : 2);
			if (e > t) {
				Q = y;
				t = e
			}
		}
		if (t > G) {
			PixelUtil.KK.a6d(l, d, Q);
			V++
		}
	}
	return V != 0
};

PixelUtil.KK.a3c = function(l, d) {
	var G = [],
		J = 0;
	for (var A = 0; A < l.length; A++) G.push(0);
	for (var A = 0; A < d.uR.length; A++) {
		var b = d.uR[A],
			V = b[0],
			Q = b[3][3][0],
			t = l[V * 2],
			I = l[V * 2 + 1],
			y = l[Q * 2],
			e = l[Q * 2 + 1],
			M = t - y,
			R = I - e;
		G[V * 2] += -M;
		G[V * 2 + 1] += -R;
		G[Q * 2] += M;
		G[Q * 2 + 1] += R
	}
	for (var A = 0; A < l.length; A += 2) {
		var n = A >>> 1,
			r = d.JF[n],
			b = r,
			T = !0;
		do {
			if (b[1] == null) {
				T = !1;
				break
			}
			b = b[1][3]
		} while (b != r);
		if (T) {
			var j = .02;
			l[A] += j * G[A];
			l[A + 1] += j * G[A + 1];
			J += j * (G[A] * G[A] + G[A + 1] * G[A + 1])
		}
	}
	return J
};

PixelUtil.KK.aaF = function(l, d, G) {
	var b = PixelUtil.vec.boundingBox(l),
		V = PixelUtil.KK.ux(l, d);
	PixelUtil.KK.nz(l, V);
	for (var Q = 0; Q < 300; Q++) {
		var t = !1,
			I = !1;
		t = PixelUtil.KK.a1N(l, V, G, 5);
		if (t) I = PixelUtil.KK.nz(l, V);
		var y = PixelUtil.KK.a3c(l, V);
		if (!t && !I && y < 1e-4) {
			break
		}
	}
	return PixelUtil.KK.avt(V)
};

PixelUtil.WB = {};
PixelUtil.WB.q3 = function(l) {
	var d = l.$G,
		G = l.gd,
		b = l.F0,
		V = l.J1,
		Q = l.On,
		t = l.UM,
		I = l.un,
		y = PixelUtil.mat3.Hn,
		Y, k, F = 0;

	function e(hZ) {
		var gX = new Array(hZ);
		for (var A = 0; A < hZ; A++) gX[A] = 0;
		return gX
	}
	var M = G.length >>> 1,
		R = e(d.BV * 2),
		J = e(d.BV),
		n = e(d.BV),
		r = Date.now();
	for (var A = 0; A < l.Y8.length; A++) {
		var T = d.az6 + A,
			j = d.iJ * (t[A * 2] + I[A * 2]),
			g = d.iJ * (t[A * 2 + 1] + I[A * 2 + 1]);
		R[T * 2] = j;
		R[T * 2 + 1] = g;
		J[T] = j;
		n[T] = g
	}
	d.aim.TG(V, d.a8p.Hn(R), .01, Y, k);
	for (var A = 0; A < d.a4C.uR.length; A++) {
		var D = d.a4C.uR[A],
			q = D[3][3][0],
			H = D[0],
			W = D[3][0],
			Z = D[1] ? D[1][3][0] : W;
		if (D[1] && q > H) continue;
		var B = G[q * 2],
			a = G[q * 2 + 1],
			m = G[H * 2],
			p = G[H * 2 + 1],
			c = V[q * 2],
			v = V[q * 2 + 1],
			i = V[H * 2],
			z = V[H * 2 + 1],
			P = V[W * 2],
			C = V[W * 2 + 1],
			h = V[Z * 2],
			L = V[Z * 2 + 1],
			U = [c, v, i, z, P, C];
		if (D[1]) U.push(h, L);
		var S = y(d.aos[F], U),
			E = S[0],
			x = S[1],
			K = 1 / Math.sqrt(E * E + x * x);
		E *= K;
		x *= K;
		var u = m - B,
			bC = p - a;
		J[F] = E * u + x * bC;
		n[F] = -x * u + E * bC;
		F++
	}
	var O = new Array(M),
		$ = new Array(M);
	for (var A = 0; A < M; A++) {
		O[A] = Q[A * 2];
		$[A] = Q[A * 2 + 1]
	}
	d.ahc.TG(O, d.a63.Hn(J), .5);
	d.ahc.TG($, d.a63.Hn(n), .5);
	for (var A = 0; A < M; A++) {
		Q[A * 2] = O[A];
		Q[A * 2 + 1] = $[A]
	}
};

PixelUtil.WB.qZ = function(l) {
	var d = l.gd,
		G = l.F0,
		b = l.Y8,
		V = PixelUtil.mat3.multiply,
		Q = Date.now(),
		t = PixelUtil.KK.ux(d, G),
		I = d.length >>> 1,
		y = 0,
		r = 0,
		x = 1e3;
	for (var A = 0; A < t.uR.length; A++) y += t.uR[A][1] ? .5 : 1;
	var e = y + b.length,
		M = [],
		R = new PixelUtil.qi(e * 2, I * 2),
		J = new PixelUtil.qi(e, I),
		n = [
			[
				[-1, 0, 1, 0, 0, 0],
				[0, -1, 0, 1, 0, 0]
			],
			[
				[-1, 0, 1, 0, 0, 0, 0, 0],
				[0, -1, 0, 1, 0, 0, 0, 0]
			]
		],
		T = [],
		j = [];
	for (var A = 0; A < t.uR.length; A++) {
		var g = t.uR[A],
			Y = g[3][3][0],
			k = g[0],
			F = g[3][0],
			D = g[1] ? g[1][3][0] : F;
		if (g[1] && Y > k) continue;
		var q = d[Y * 2],
			H = d[Y * 2 + 1],
			W = d[k * 2],
			Z = d[k * 2 + 1],
			B = d[F * 2],
			a = d[F * 2 + 1],
			m = d[D * 2],
			p = d[D * 2 + 1],
			c = [
				[q, H, 1, 0],
				[H, -q, 0, 1],
				[W, Z, 1, 0],
				[Z, -W, 0, 1],
				[B, a, 1, 0],
				[a, -B, 0, 1]
			];
		if (g[1]) c.push([m, p, 1, 0], [p, -m, 0, 1]);
		var v = PixelUtil.mat3.Bo(c),
			i = V(linear.invert(V(v, c)), v);
		i.pop();
		i.pop();
		M.push(i);
		var z = W - q,
			P = Z - H,
			C = n[g[1] ? 1 : 0];
		C = PixelUtil.mat3.gu(C, V([
			[z, P],
			[P, -z]
		], i));
		var h = [Y * 2, Y * 2 + 1, k * 2, k * 2 + 1, F * 2, F * 2 + 1, D * 2, D * 2 + 1],
			L = g[1] ? 8 : 6,
			U = [];
		for (var S = 0; S < L; S++) U.push([h[S], C[0][S], C[1][S]]);
		U.sort(function(gX, _) {
			return gX[0] - _[0]
		});
		for (var E = 0; E < 2; E++) {
			for (var S = 0; S < L; S++) {
				T[S] = U[S][0];
				j[S] = U[S][1 + E]
			}
			R.cl(j, T, L)
		}
		if (Y < k) J.cl([-1, 1], [Y, k], 2);
		else J.cl([1, -1], [k, Y], 2);
		r++
	}
	for (var A = 0; A < b.length; A++) {
		var K = b[A];
		R.cl([x], [K * 2], 1);
		R.cl([x], [K * 2 + 1], 1);
		J.cl([x], [K], 1)
	}
	var u = R.Bo(),
		bC = u.PD(u),
		O = J.Bo(),
		$ = O.PD(O);
	return {
		az6: y,
		BV: e,
		a8p: u,
		aim: bC,
		a63: O,
		ahc: $,
		a4C: t,
		aos: M,
		iJ: x
	}
};

PixelUtil.WB.am4 = function(l, d, G, b, V) {
	var Q = new Rect(0, 0, d, G),
		t = PixelUtil.allocBytes(Q.O());
	PixelUtil.extractChannelFromRgba(l, t, 3);
	PixelUtil.round(t, 70);
	var I = PixelUtil.tightBoundsFromGray(t, Q),
		y = [.1, .065, .035][b] * Math.max(I.m, I.n),
		e = V + 1,
		M = d + e * 2,
		R = G + e * 2,
		J = new Rect(-e, -e, M, R),
		n = PixelUtil.allocBytes(J.O());
	PixelUtil.copyBufferRect(t, Q, n, J);
	var r = n.slice(0);
	for (var T = 0; T < V; T++) {
		for (var j = 1; j < R - 1; j++) {
			for (var g = 1; g < M - 1; g++) {
				var A = j * M + g;
				r[A] = n[A - M] | n[A - 1] | n[A] | n[A + 1] | n[A + M]
			}
		}
		var Y = r;
		r = n;
		n = Y
	}
	var k = j0.Hu(n, M, R, Math.round(I.O() * 5e-4)),
		F = j0.LW(k),
		D = new Matrix2D(1, 0, 0, 1, -e, -e);
	for (var A = 0; A < F.length; A++) {
		var q = F[A];
		PixelUtil.vec.transformCoords(q.path.C, D, q.path.C);
		q.gd = PixelUtil.WB.a7a(q.path);
		q.F0 = PixelUtil.vec.axR(q.gd);
		q.F0 = PixelUtil.KK.aaF(q.gd, q.F0, y)
	}
	return F
};

PixelUtil.WB.a7a = function(l) {
	var d = [],
		G = l.C,
		b = l.F.length - 1,
		V = 0,
		Q = 0;
	for (var t = 0; t < b; t++) {
		var A = t * 6,
			I = G[A + 6] - G[A + 0],
			y = G[A + 7] - G[A + 1],
			e = Math.ceil(Math.sqrt(I * I + y * y));
		for (var M = 0; M < e; M++) {
			var R = M / e,
				J = 1 - R,
				n = J * J * J * G[A + 0] + 3 * J * J * R * G[A + 2] + 3 * J * R * R * G[A + 4] + R * R * R * G[A + 6],
				r = J * J * J * G[A + 1] + 3 * J * J * R * G[A + 3] + 3 * J * R * R * G[A + 5] + R * R * R * G[A + 7];
			d.push(n, r);
			V = n;
			Q = r
		}
	}
	d = PixelUtil.vec.uf(d, 1);
	var T = [],
		j = d.length;
	for (var A = 0; A < j; A += 2) {
		var r = d.pop(),
			n = d.pop();
		T.push(n, r)
	}
	return T
};

PixelUtil.WB.aaS = function(l, d, G, b) {
	function V(W, Z, B, a, m) {
		var p = m[W * 2] - m[Z * 2],
			c = m[W * 2 + 1] - m[Z * 2 + 1],
			v = Math.sqrt(p * p + c * c);
		if (B[W].indexOf(Z) == -1) {
			B[W].push(Z);
			a[W].push(v)
		}
		if (B[Z].indexOf(W) == -1) {
			B[Z].push(W);
			a[Z].push(v)
		}
	}
	var Q = l.length >>> 1,
		t = new Array(Q);
	if (G.length == 0) {
		t.fill(0);
		return t
	}
	var I = new Array(Q),
		y = new Array(Q);
	for (var A = 0; A < Q; A++) {
		I[A] = [];
		y[A] = []
	}
	for (var A = 0; A < d.length; A += 3) {
		V(d[A], d[A + 1], I, y, l);
		V(d[A], d[A + 2], I, y, l);
		V(d[A + 1], d[A + 2], I, y, l)
	}
	var e = new Float64Array(Q * 2),
		M = new Uint32Array(Q * 2);
	e.fill(1e9);
	var R = new Uint8Array(Q);
	for (var J = 0; J < G.length; J++) {
		R.fill(0);
		var n = ["---", [0, G[J]]];
		while (n.length != 1) {
			var r = PixelUtil.el.Ky(n),
				T = r[0],
				j = r[1];
			if (R[j] == 1) continue;
			var g = j << 1;
			if (T < e[g]) {
				e[g + 1] = e[g];
				M[g + 1] = M[g];
				e[g] = T;
				M[g] = J
			} else if (T < e[g + 1]) {
				e[g + 1] = T;
				M[g + 1] = J
			}
			R[j] = 1;
			var Y = I[j],
				k = y[j];
			for (var A = 0; A < Y.length; A++) {
				var F = Y[A];
				if (R[F] != 1) {
					PixelUtil.el.yx(n, [T + k[A], F])
				}
			}
		}
	}
	for (var A = 0; A < Q; A++) {
		var g = A << 1,
			D = e[g],
			q = e[g + 1],
			H = 1 / (D + q);
		t[A] = (1 - D * H) * b[M[g]] + (1 - q * H) * b[M[g + 1]]
	}
	return t
};

PixelUtil.WB.au0 = function(l) {
	var d = {
			F: [],
			C: []
		},
		G = [l];
	while (G.length != 0) {
		var b = G.pop(),
			V = b.W5;
		if (b.a8j instanceof Array || b.axX instanceof Array) {
			d.F.push("M", "L", "L", "L", "Z");
			d.C.push(V[0], V[1], V[2], V[1], V[2], V[3], V[0], V[3])
		} else G.push(b.a8j, b.axX)
	}
	return d
};

PixelUtil.WB.wK = function(l, d, G, b, V, Q, t, I, y, e) {
	var M = Math.round(e.length / 3),
		R = new Array(M);
	for (var A = 0; A < M; A++) R[A] = A;
	R.sort(function(n, r) {
		return y[e[n * 3]] - y[e[r * 3]]
	});
	for (var A = 0; A < M; A++) {
		var J = R[A] * 3;
		PixelUtil.WB.aqt(e[J] * 2, e[J + 1] * 2, e[J + 2] * 2, t, I, l, d, G, b, V, Q)
	}
};

PixelUtil.WB.aqt = function(l, d, G, b, V, Q, t, I, y, e, M) {
	var R = PixelUtil.WB.VD,
		J = [l, d, G, 1.2, 1.2, 1.2, 0],
		n = [0, 0, 0, 0],
		r = V[l],
		T = V[l + 1],
		j = V[d],
		g = V[d + 1],
		Y = V[G],
		k = V[G + 1],
		F = Math.max(0, Math.min(t - 1, b[l])),
		D = Math.max(0, Math.min(t - 1, b[d])),
		q = Math.max(0, Math.min(t - 1, b[G])),
		H = Math.max(0, Math.min(I - 1, b[l + 1])),
		W = Math.max(0, Math.min(I - 1, b[d + 1])),
		Z = Math.max(0, Math.min(I - 1, b[G + 1])),
		B = j - r,
		a = g - T,
		m = Y - r,
		p = k - T,
		c = 1 / (B * p - m * a + 1e-9),
		v = Math.max(0, Math.floor(Math.min(r, j, Y))),
		i = Math.min(e, Math.ceil(Math.max(r, j, Y))),
		z = Math.max(0, Math.floor(Math.min(T, g, k))),
		P = Math.min(M, Math.ceil(Math.max(T, g, k)));
	for (var C = z; C < P; C++)
		for (var h = v; h < i; h++) {
			var L = h + .5 - r,
				U = C + .5 - T,
				S = (L * p - m * U) * c,
				E = (B * U - L * a) * c;
			if (S >= 0 && E >= 0 && S + E <= 1) {
				var x = 1 - S - E,
					K = F * x + D * S + q * E,
					u = H * x + W * S + Z * E;
				PixelUtil.canvas.w2(K, u, Q, t, I, n);
				PixelUtil.WB.ajd(n, y, C * e + h << 2)
			}
		}
};

PixelUtil.WB.ajd = function(l, d, G) {
	var b = d[G],
		V = d[G + 1],
		Q = d[G + 2],
		t = d[G + 3],
		I = 1 - l[3] * (1 / 255);
	d[G] = ~~(.5 + l[0] + b * I);
	d[G + 1] = ~~(.5 + l[1] + V * I);
	d[G + 2] = ~~(.5 + l[2] + Q * I);
	d[G + 3] = ~~(.5 + l[3] + t * I)
};

PixelUtil.WB.VD = function() {
	var l = function(G, b, V, Q) {
			var t = Q[0],
				I = Q[1],
				y = Q[2],
				e = G[t + 0],
				M = G[t + 1],
				R = G[I + 0],
				J = G[I + 1],
				n = G[y + 0],
				r = G[y + 1],
				T = R - e,
				j = J - M,
				g = n - e,
				Y = r - M,
				k = b - e,
				F = V - M,
				D = T * Y - g * j,
				q = 1 / (D + 1e-9),
				H = (k * Y - g * F) * q,
				W = (T * F - k * j) * q;
			if (H >= 0 && W >= 0 && H + W <= 1) {
				Q[3] = 1 - H - W;
				Q[4] = H;
				Q[5] = W;
				return 1
			}
			return 0
		},
		d = function(G, b, V, Q) {
			var t = [0, 0, 0, 0, 0, 0];
			for (var A = 0; A < b.length; A += 3) {
				t[0] = b[A] * 2;
				t[1] = b[A + 1] * 2;
				t[2] = b[A + 2] * 2;
				if (l(G, V, Q, t) == 1) return !0
			}
			return !1
		};
	return {
		ay9: l,
		ahA: d
	}
}();
PixelUtil.UR = {};
PixelUtil.UR.anH = function(l, d, G) {
	var b = PixelUtil.allocBytes(d * G * 4),
		V = !1;
	PixelUtil.canvas.s7(l, d, G, b, [G, d, 0, 1, 0, 1, 0, 0]);
	return [PixelUtil.UR.FF(l, d, G, V), PixelUtil.UR.FF(b, G, d, V)]
};

PixelUtil.UR.D = function(l, d) {
	var G = !1,
		b = l[0],
		V = l[1],
		Q = b[1],
		t = b[2],
		I = b[3],
		y = d.m,
		e = d.n;
	if (t == y && I == e) Q = Q.slice(0);
	else if (I != e) {
		var M = PixelUtil.allocBytes(t * e * 4);
		PixelUtil.UR.iF(V, e, M, G);
		Q = PixelUtil.allocBytes(t * e * 4);
		PixelUtil.canvas.s7(M, e, t, Q, [t, e, 0, 1, 0, 1, 0, 0]);
		if (t != y) {
			b = PixelUtil.UR.FF(Q, t, e, G);
			Q = PixelUtil.allocBytes(y * e * 4);
			PixelUtil.UR.iF(b, y, Q, G)
		}
	} else if (t != y) {
		Q = PixelUtil.allocBytes(y * I * 4);
		PixelUtil.UR.iF(b, y, Q, G)
	}
	return Q
};

PixelUtil.UR.FF = function(l, d, G, b) {
	var V = Date.now(),
		Q = new Uint16Array(d * G),
		t = 1;
	PixelUtil.UR.a20(l, d, G, Q);
	var I = Math.ceil(d / t),
		y = new Uint32Array(t),
		e = new Uint32Array(t),
		I = Math.floor(d / t);
	for (var M = 0; M < t; M++) e[M] = M < t - 1 ? I : d - (t - 1) * I;
	for (var R = 0; R < G; R++) {
		var A = R * d;
		for (var M = 0; M < t; M++) {
			var I = e[M];
			for (var J = 0; J < I; J++) y[M] += Q[A + J];
			A += I
		}
	}
	if (b) {
		console.log(Date.now() - V, "cost");
		V = Date.now()
	}
	var n = new Uint32Array(d),
		r = new Uint32Array(d),
		T = new Uint32Array(d * G);
	for (var J = 0; J < d; J++) {
		T[(G - 1) * d + J] = Q[(G - 1) * d + J]
	}
	for (var R = G - 2; R >= 0; R--) {
		var j = R * d;
		for (var M = 0; M < t; M++) {
			var I = e[M];
			T[j] = Q[j] + Math.min(T[j + d], T[j + d + 1]);
			for (var J = 1; J < I - 1; J++) {
				var A = j + J;
				T[A] = Q[A] + Math.min(T[A + d - 1], Math.min(T[A + d], T[A + d + 1]))
			}
			j += I - 1;
			T[j] = Q[j] + Math.min(T[j + d - 1], T[j + d]);
			j++
		}
	}
	if (b) {
		console.log(Date.now() - V, "Building M");
		V = Date.now()
	}

	function g(a, m) {
		return a < m ? a : m
	}

	function Y(A, a) {
		var m = r[A],
			p = T[a],
			c = ~~(m * p * 1e-4);
		return c
	}
	var k = new Uint8Array(d * G),
		F = new Uint32Array(d);
	for (var A = 0; A < d; A++) {
		n[A] = A;
		r[A] = Q[A]
	}
	for (var R = 1; R < G; R++) {
		var D = 0,
			j = R * d;
		for (var M = 0; M < t; M++) {
			var I = e[M],
				A = j;
			F[D] = Y(D, A);
			var q = F[D] + Y(D + 1, A + 1),
				H = Y(D, A + 1) + Y(D + 1, A);
			F[D + 1] = g(q, H);
			for (var J = 2; J < I; J++) {
				var A = j + J,
					W = F[D + J - 1] + Y(D + J - 1, A - 1),
					Z = F[D + J - 2] + Y(D + J - 1, A - 2) + Y(D + J - 2, A - 1);
				F[D + J] = g(W, Z)
			}
			var J = I - 1;
			while (J >= 2) {
				var A = j + J,
					W = F[D + J - 1] + Y(D + J - 1, A - 1),
					Z = F[D + J - 2] + Y(D + J - 1, A - 2) + Y(D + J - 2, A - 1);
				if (F[D + J] == W) {
					k[A - d] = 1;
					J -= 1
				} else {
					k[A - d] = 0;
					k[A - d - 1] = 2;
					J -= 2
				}
			}
			var A = j;
			if (J == 0) {
				k[A - d] = 1
			} else {
				if (F[D + 1] == q) {
					k[A + 1 - d] = 1;
					k[A - d] = 1
				} else {
					k[A + 1 - d] = 0;
					k[A - d] = 2
				}
			}
			j += I;
			D += I
		}
		PixelUtil.UR.ack(R, d, k, Q, n, r, !0, V)
	}
	if (b) {
		console.log(Date.now() - V, "Matching");
		V = Date.now()
	}
	var B = Q;
	return [UZIP.adler(l, 0, l.length), l, d, G, t, e, y, n, r, k, B]
};

PixelUtil.UR.iF = function(l, d, G, b) {
	var V = l.slice(0),
		Q = V.shift(),
		t = V.shift(),
		I = V.shift(),
		y = V.shift(),
		e = V.shift(),
		M = V.shift(),
		R = V.shift(),
		J = V.shift(),
		n = V.shift().slice(0),
		r = V.shift(),
		T = V.shift(),
		j = Date.now(),
		g = Math.abs(I - d),
		Y = Math.floor(g / e),
		k = new Uint32Array(e),
		D = 0,
		q = 1e9,
		W = 0,
		Z = 0,
		B = 0;
	for (var F = 0; F < e; F++) k[F] = F < e - 1 ? Y : g - (e - 1) * Y;
	T.fill(0);
	for (var H = 0; H < I; H++) {
		D = Math.max(D, n[H]);
		q = Math.min(q, n[H])
	}
	for (var F = 0; F < e; F++) {
		var a = M[F],
			Y = k[F];
		for (var m = 0; m < Y; m++) {
			var p = 0,
				c = 1e9;
			for (var H = 0; H < a; H++)
				if (n[Z + H] < c) {
					c = n[Z + H];
					p = Z + H
				}
			if (d < I) n[p] = 1e9;
			else n[p] *= 1.2;
			if (B < I / 3) W += c;
			var v = J[p],
				i = T[v],
				z = i < 65280 ? 65280 : i + 1;
			if (z < 65280) throw "e";
			for (var P = 0; P < y; P++) {
				var A = P * I + v;
				T[A] = z;
				v += r[A] - 1
			}
			B++
		}
		Z += a
	}
	if (b) {
		console.log(Date.now() - j, "Removing best seams");
		j = Date.now()
	}

	function C(A, L) {
		var U = A << 2,
			S = L << 2;
		G[U] = t[S];
		G[U + 1] = t[S + 1];
		G[U + 2] = t[S + 2];
		G[U + 3] = t[S + 3]
	}
	for (var P = 0; P < y; P++) {
		var h = 0,
			A = P * I;
		for (var H = 0; H < d; H++, h++) {
			if (d < I) {
				while (T[A + h] == 65280) h++;
				C(P * d + H, P * I + h)
			} else {
				C(P * d + H, P * I + h);
				while (T[A + h] >= 65280) {
					T[A + h]--;
					H++;
					C(P * d + H, P * I + h)
				}
			}
		}
	}
	if (b) {
		console.log(Date.now() - j, "Shifting image pixels");
		j = Date.now()
	}
};

PixelUtil.UR.ack = function(l, d, G, b, V, Q) {
	var t = 0,
		A = l * d;
	while (t < d) {
		if (G[A - d] == 1) {
			Q[t] = Q[t] + b[A];
			t++;
			A++
		} else {
			var I = V[t];
			V[t] = V[t + 1];
			V[t + 1] = I;
			var y = Q[t];
			Q[t] = Q[t + 1] + b[A];
			Q[t + 1] = y + b[A + 1];
			t += 2;
			A += 2
		}
	}
};

PixelUtil.UR.a20 = function(l, d, G, b) {
	function V(l, A, y) {
		var R = A << 2,
			J = y << 2,
			n = l[R] - l[J],
			r = l[R + 1] - l[J + 1],
			T = l[R + 2] - l[J + 2];
		return Math.abs(n) + Math.abs(r) + Math.abs(T)
	}
	for (var Q = 1; Q < d; Q++) {
		var t = V(l, Q, Q - 1);
		b[Q - 1] += t;
		b[Q] += t
	}
	for (var I = 1; I < G; I++) {
		var y = I * d,
			t = V(l, y, y - d);
		b[y] += t;
		b[y - d] += t;
		for (var Q = 1; Q < d; Q++) {
			var A = I * d + Q,
				e = V(l, A, A - 1),
				M = V(l, A, A - d);
			b[A - d] += M;
			b[A - 1] += e;
			b[A] += M + e
		}
	}
	for (var I = 0; I < G; I++) {
		b[I * d] *= 2;
		b[I * d + d - 1] *= 2
	}
	for (var A = 0; A < b.length; A++)
		if (b[A] == 0) b[A] = 1
};

// PixelUtil.brushPresetTree — parse ABR r4000 brush preset folder tree
PixelUtil.R7 = function() {
	function l() {
		return 1953e6 + Math.floor(Math.random() * 999999)
	}

	function d(F, D) {
		var q = D[0] - F[0],
			H = D[1] - F[1];
		return q * q + H * H
	}

	function G(F, D, q, H, W, Z, B, a) {
		var m = q - F,
			p = H - D,
			c = PixelUtil.vec.yd(F, D, m, p, W, Z, B - W, a - Z),
			v = [F + c * m, D + c * p],
			i = c > 0 ? [
				[
					[F, D], v, !1, 0, 1
				],
				[
					[W, Z], v, !1, 0, 5
				]
			] : [
				[
					[q, H], v, !1, 0, 1
				],
				[
					[B, a], v, !1, 0, 5
				]
			];
		return i
	}

	function b(F) {
		F = F.map(Math.round);
		var D = G(F[0], F[1], F[2], F[3], F[6], F[7], F[4], F[5]),
			q = G(F[0], F[1], F[6], F[7], F[2], F[3], F[4], F[5]),
			H = [D, q],
			W = [D[0][1], q[0][1]];
		for (var A = 0; A < 2; A++) {
			var Z = W[1 - A],
				B = H[A];
			if (d(B[0][0], Z) < d(B[1][0], Z)) {
				var a = B[0];
				B[0] = B[1];
				B[1] = a
			}
		}
		var m = [l(), 0, -1, 0, [0, 0], D[0], D[1], q[0], q[1]];
		return m
	}

	function V(F) {
		var D = F[5],
			q = F[6],
			H = F[7],
			W = F[8],
			Z = D[0],
			B = q[0],
			a = W[0],
			m = H[1],
			p = D[1],
			c = a[0],
			v = a[1],
			i = m[0] - c,
			z = m[1] - v,
			P = PixelUtil.vec.yd(c, v, i, z, B[0], B[1], p[0] - B[0], p[1] - B[1]);
		return [c + P * i, v + P * z, c, v, Z[0], Z[1], B[0], B[1]]
	}

	function Q(F, D) {
		return F[0] == D[0] && F[1] == D[1]
	}

	function t(F, D, q) {
		var H = F[1],
			W = F[0][0] - H[0],
			Z = F[0][1] - H[1],
			B = Math.sqrt(W * W + Z * Z);
		W /= B;
		Z /= B;
		for (var a = 0; a < q.length; a++) {
			var m = q[a];
			if (m[0] != D[1] && m[1] != D[0]) continue;
			for (var A = 0; A < 4; A++) {
				var p = m[5 + A],
					c = p[0];
				if (!Q(H, p[1])) continue;
				var v = c[0] - H[0],
					i = c[1] - H[1];
				B = Math.sqrt(v * v + i * i);
				v /= B;
				i /= B;
				var z = v * W + i * Z;
				if (Math.abs(z - 1) < 1e-7) return !0
			}
		}
		return !1
	}

	function I(F, D) {
		PixelUtil.canvas.D(F, D);
		return D
	}

	function y(F) {
		var D = [];
		for (var q = 0; q < F.length; q++) {
			var H = F[q],
				W = H[1];
			for (var Z = 0; Z < W.length; Z++) {
				var B = W[Z],
					a = [],
					m = PixelUtil.canvas.eP(V(B), new Rect(0, 0, 1, 1));
				for (var A = 0; A < 4; A++) {
					a[A] = t(B[5 + A], B, W)
				}
				if (!a[0]) {
					D.push([I(m, [1, .5]), q, Z, 0, 0]);
					if (!a[2]) D.push([I(m, [1, 1]), q, Z, 0, 1])
				}
				if (!a[1]) {
					D.push([I(m, [0, .5]), q, Z, 1, 0]);
					if (!a[3]) D.push([I(m, [0, 0]), q, Z, 1, 1])
				}
				if (!a[2]) {
					D.push([I(m, [.5, 1]), q, Z, 2, 0]);
					if (!a[1]) D.push([I(m, [0, 1]), q, Z, 2, 1])
				}
				if (!a[3]) {
					D.push([I(m, [.5, 0]), q, Z, 3, 0]);
					if (!a[0]) D.push([I(m, [1, 0]), q, Z, 3, 1])
				}
			}
		}
		return D
	}

	function e(F, D, q) {
		var H = q[0],
			W = q[1],
			Z = D.x - F[0],
			B = D.y - F[1],
			a = PixelUtil.vec.yd(F[0], F[1], Z, B, W[0], W[1], H[0] - W[0], H[1] - W[1]);
		return [F[0] + a * Z, F[1] + a * B]
	}

	function M(F, D, q) {
		F = JSON.parse(JSON.stringify(F));
		var H = F[D[1]][1][D[2]],
			W = D[3],
			Z = D[4];
		if (Z == 1) return F;
		if (W == 0 || W == 2) {
			var B = H[5 + W],
				a = H[5 + 2 - W],
				m = H[5 + (W == 0 ? 3 : 1)],
				p = B[1];
			B[0] = a[0] = e(p, q, a);
			m[0] = e(p, q, m)
		} else {
			var m = H[5 + W],
				p = m[1],
				B = H[5 + (W == 3 ? 0 : 2)];
			m[0] = e(p, q, B)
		}
		return F
	}

	function R(F, D, q) {
		var H = D[0] - F[0],
			W = D[1] - F[1],
			Z = PixelUtil.vec.yd(q[0], q[1], -W, H, F[0], F[1], H, W);
		return [q[0] - W * Z, q[1] + H * Z]
	}

	function J(F, D, q) {
		var H = q[0],
			W = q[1],
			I = R(F, D, q),
			Z = I[0],
			B = I[1],
			a = R(F, q, D),
			m = PixelUtil.vec.yd(Z, B, H - Z, W - B, D[0], D[1], a[0] - D[0], a[1] - D[1]);
		return [Z + (H - Z) * m, B + (W - B) * m]
	}

	function n(F, D, q) {
		F = JSON.parse(JSON.stringify(F));
		var H = F[D[1]][1][D[2]],
			W = D[3],
			Z = D[4];
		if (Z == 1) return F;
		var B = H[5][1],
			a = H[7][1],
			m = J(B, a, q),
			p = JSON.parse(JSON.stringify(H));
		F[D[1]][1].push(p);
		p[0] = l();
		p[1] = H[0];
		if (W == 0 || W == 1) {
			p[7][1] = p[8][1] = m;
			if (W == 1) {
				p[5][0] = p[7][0] = H[6][0];
				p[8][0] = V(H).slice(0, 2)
			}
		} else {
			p[5][1] = p[6][1] = m;
			if (W == 3) {
				p[5][0] = p[7][0] = H[8][0];
				p[6][0] = V(H).slice(0, 2)
			}
		}
		return F
	}

	function r(F, D, q) {
		var hZ = F.length >> 1,
			H, W = F[2 * hZ - 3] - q,
			Z = F[2 * hZ - 2] - D,
			B = F[2 * hZ - 1] - q,
			a = !1,
			m = 0;
		for (var A = 0; A < hZ; A++) {
			H = Z;
			W = B;
			Z = F[2 * A] - D;
			B = F[2 * A + 1] - q;
			if (W == B) continue;
			a = B > W
		}
		for (var A = 0; A < hZ; A++) {
			H = Z;
			W = B;
			Z = F[2 * A] - D;
			B = F[2 * A + 1] - q;
			if (W < 0 && B < 0) continue;
			if (W > 0 && B > 0) continue;
			if (H < 0 && Z < 0) continue;
			if (W == B && Math.min(H, Z) <= 0) return !0;
			if (W == B) continue;
			var p = H + (Z - H) * -W / (B - W);
			if (p == 0) return !0;
			if (p > 0) m++;
			if (W == 0 && a && B > W) m--;
			if (W == 0 && !a && B < W) m--;
			a = B > W
		}
		return (m & 1) == 1
	}

	function T(F, D, q) {
		for (var H = 0; H < F.length; H++) {
			var W = F[H][1];
			for (var Z = 0; Z < W.length; Z++) {
				var B = V(W[Z]);
				if (r(B, D, q)) return [H, Z]
			}
		}
	}

	function j(F, D) {
		for (var q = 0; q < F.length; q++) {
			var H = F[q][1],
				W = D[q];
			if (W.length == 0) continue;
			var Z = g(H, W);
			for (var B = 0; B < H.length; B++) {
				if (Z.indexOf(H[B][0]) != -1) {
					H.splice(B, 1);
					B--
				}
			}
		}
		for (var q = 0; q < F.length; q++)
			if (F[q][1].length == 0) {
				F.splice(q, 1);
				q--
			}
		return F
	}

	function g(F, D) {
		var q = [];
		for (var A = 0; A < 10; A++)
			for (var H = 0; H < F.length; H++) {
				var W = F[H];
				if (D.indexOf(H) != -1 || q.indexOf(W[1]) != -1)
					if (q.indexOf(W[0]) == -1) q.push(W[0])
			}
		return q
	}

	function Y(F) {
		var D = X.Ko(F, 0, F.length),
			q = D.split("\n").slice(1);

		function H() {
			return parseFloat(q.shift())
		}

		function W() {
			var bC = [H(), H()];
			Z(1);
			return bC
		}

		function Z(hZ) {
			for (var A = 0; A < hZ; A++) q.shift()
		}
		var B = [],
			a = H();
		for (var m = 0; m < a; m++) {
			var p = H(),
				c = H(),
				v = [];
			B.push([p, v]);
			for (var i = 0; i < c; i++) {
				var z = H(),
					P = H(),
					C = H(),
					h = H(),
					L = W(),
					U = [z, P, C, h, L];
				v.push(U);
				for (var A = 0; A < 4; A++) {
					var S = W(),
						E = W(),
						x = H() == 1,
						K = H(),
						u = H();
					U.push([S, E, x, K, u])
				}
			}
		}
		return B
	}

	function k(F) {
		function D(c) {
			q.push(c[0], c[1], "")
		}
		var q = ["tNaF203"];
		q.push(F.length);
		for (var H = 0; H < F.length; H++) {
			q.push(F[H][0]);
			var W = F[H][1];
			q.push(W.length);
			for (var Z = 0; Z < W.length; Z++) {
				var B = W[Z];
				q.push(B[0], B[1], B[2], B[3]);
				D(B[4]);
				for (var A = 0; A < 4; A++) {
					var a = B[5 + A];
					D(a[0]);
					D(a[1]);
					q.push(a[2] ? 1 : 0, a[3], a[4])
				}
			}
		}
		var m = q.join("\n"),
			p = new Uint8Array(m.length);
		X.KQ(p, 0, m);
		return p
	}
	return {
		Cd: Y,
		CO: k,
		anF: V,
		a1z: b,
		Pn: y,
		a3p: M,
		arq: function(F, D) {
			return D && D[4] == 1 && F[D[1]][1].length == 1
		},
		aar: function(F, D) {
			return D && D[4] == 0
		},
		akp: n,
		aqx: j,
		Ou: g,
		atK: T
	}
}();
// PixelUtil.meshWarp — displacement mesh grid sampling and warp application
PixelUtil.mv = function() {
	var l = 0,
		d = 0,
		b = 15,
		Q = 256;

	function G(M, R, J, n, r, T) {
		var j = (r - 1) * R,
			g = T * R;
		return M[g + n] - M[g + J - 1] - M[j + n] + M[j + J - 1]
	}
	var V = Math.round(b / 8),
		t = [];

	function I(M, R) {
		for (var J = 0; J < R.length; J++) {
			var n = R[J],
				r = 0,
				T = 0,
				j = M[n.Xw],
				g = j.uD,
				Y = j.iJ,
				k = j.Tq;
			for (var F = -b; F <= b; F++)
				for (var D = -b; D <= b; D++) {
					var q = D + n.ao_,
						H = F + n.apZ;
					if (D * D + F * F > b * b || q < 0 || H < 0 || q >= Y || H >= Y) continue;
					var W = g[H * Y + q];
					r += D * W;
					T += F * W
				}
			n.cg = Math.atan2(T, r)
		}
	}

	function y(M, R, J, n, r) {
		var T = ~~(M + .5),
			j = ~~(R + .5);
		return G(J, n, T - V, T + V, j - V, j + V)
	}

	function e(M, R, J, n, r) {
		l = n;
		d = r;
		if (t.length == 0) {
			var T = new PixelUtil.blend.IR(16200817),
				k = 8,
				F = 0;

			function j(gX) {
				var B = gX[0] - gX[2],
					a = gX[1] - gX[3];
				return B * B + a * a
			}

			function g() {
				var gX = 0,
					_ = 0;
				while (gX === 0) gX = T.get();
				while (_ === 0) _ = T.get();
				return Math.sqrt(-2 * Math.log(gX)) * Math.cos(2 * Math.PI * _)
			}
			var Y = g,
				D = [];
			while (F != Q) {
				var q = Math.max(-b, Math.min(b, Y() * k)),
					H = Math.max(-b, Math.min(b, Y() * k)),
					W = Math.max(-b, Math.min(b, Y() * k)),
					Z = Math.max(-b, Math.min(b, Y() * k)),
					B = q - W,
					a = H - Z,
					m = Math.sqrt(B * B + a * a);
				if (m < 3 || m > 12) continue;
				t.push(q, H, W, Z);
				F++
			}
		}
		var p = 20;
		for (var c = 0; c < R.length; c++) {
			var v = R[c],
				i = M[v.Xw],
				z = i.gy,
				J = i.uD,
				n = i.iJ,
				r = i.Tq,
				P = v.ao_,
				C = v.apZ,
				h = v.cg,
				L = Math.cos(h),
				U = Math.sin(h),
				S = new Uint8Array(Q >>> 3);
			v.a0 = S;
			for (var A = 0; A < Q; A++) {
				var E = A * 4,
					q = t[E + 0],
					H = t[E + 1],
					W = t[E + 2],
					Z = t[E + 3],
					x = L * q - U * H,
					K = U * q + L * H,
					u = L * W - U * Z,
					bC = U * W + L * Z,
					O = y(P + x, C + K, z, n, r),
					$ = y(P + u, C + bC, z, n, r);
				S[A >>> 3] |= (O < $ ? 0 : 1) << (A & 7)
			}
		}
	}
	return {
		a2h: I,
		a0U: e
	}
}();
// PixelUtil.meshDetect — detect mesh control points from displacement map
PixelUtil.a3m = function() {
	function l(d, G) {
		var b = [
				[9]
			],
			V = Date.now(),
			Q = [];
		for (var t = 0; t < d.length; t++) {
			var I = d[t],
				y = I.gy,
				e = I.iJ,
				M = I.Tq,
				n = 9,
				k = 1,
				v = 24;
			if (y == null) continue;
			var R = new Float32Array(e * M),
				J = new Uint8Array(e * M),
				r = n >>> 1,
				T = r >>> 1,
				j = Math.round(n / 3);
			if (j != n / 3) throw "e";
			var g = 1 / (n * n),
				Y = 1.2 * (n / 9);
			for (var F = r + 1; F < M - r; F += k)
				for (var D = r + 1; D < e - r; D += k) {
					var q = PixelUtil.integralRectSum(y, e, D - T, D + T, F - r, F + r) - 3 * PixelUtil.integralRectSum(y, e, D - T, D + T, F - r + j, F + r - j),
						H = PixelUtil.integralRectSum(y, e, D - r, D + r, F - T, F + T) - 3 * PixelUtil.integralRectSum(y, e, D - r + j, D + r - j, F - T, F + T),
						W = D - r + 1,
						Z = D + r - 1,
						B = F - r + 1,
						a = F + r - 1,
						m = PixelUtil.integralRectSum(y, e, W, D - 1, B, F - 1) + PixelUtil.integralRectSum(y, e, D + 1, Z, F + 1, a) - PixelUtil.integralRectSum(y, e, D + 1, Z, B, F - 1) - PixelUtil.integralRectSum(y, e, W, D - 1, F + 1, a),
						p = (H * q - .9 * m * (.9 * m)) * (g * g);
					R[F * e + D] = Math.abs(p);
					J[F * e + D] = p < 0 ? 0 : 1
				}
			var c = e * k;
			for (var F = v; F < M - v; F += k)
				for (var D = v; D < e - v; D += k) {
					var A = F * e + D,
						i = R[A];
					if (i < 16) continue;
					if (R[A - k] >= i || R[A + k] >= i) continue;
					if (R[A - c - k] >= i || R[A - c] >= i || R[A - c + k] >= i) continue;
					if (R[A + c - k] >= i || R[A + c] >= i || R[A + c + k] >= i) continue;
					Q.push({
						x: ~~(D * I.z3 + .5),
						y: ~~(F * I.z3 + .5),
						ao_: D,
						apZ: F,
						Xw: t,
						Z: i,
						amB: J[A],
						Lm: Y
					})
				}
		}
		if (G != null) {
			Q.sort(function(E, x) {
				return x.Z - E.Z
			});
			Q = Q.slice(0, G)
		}
		return Q;
		var z = [];
		for (var A = 0; A < Q.length; A++) {
			var P = !0,
				C = Q[A];
			for (var h = 0; h < Q.length; h++) {
				var L = Q[h];
				if (h != A && L.Z > C.Z && (L.Xw == C.Xw + 1 || L.Xw == C.Xw - 1)) {
					var U = C.x - L.x,
						S = C.y - L.y;
					if (U * U + S * S < 5) {
						P = !1;
						break
					}
				}
			}
			if (P) z.push(C)
		}
		console.log(Q.length, z.length);
		return z
	}
	return {
		a58: l
	}
}();
PixelUtil.Gf = {};
PixelUtil.Gf.akK = function(l) {
	var d = l.length,
		G = PixelUtil.Gf.g3(l, !1),
		V = 0,
		Q = 1;
	throw "e";
	var b = [];
	for (var A = 0; A < d; A++) b[A] = PixelUtil.Gf.r1(G[A]);
	var t = l[0][1],
		I = PixelUtil.Gf.match(G[V], G[Q], b[Q]);
	console.log(I.length);
	var y = Math.max(Math.min(I.length, 40), I.length * .54);
	y = Math.min(y, 200);
	var e = I.slice(0, y),
		M = PixelUtil.gn.a9L(G[V], G[Q], e, t.m, t.n),
		R = PixelUtil.gn.ad5(M, [0, 0, 0], 1),
		J = t.m / 2,
		n = t.n / 2,
		r = 1 / Math.max(J, n);
	for (var A = 0; A < 1; A++) {
		var T = e[A],
			j = G[V][T[0]],
			g = G[Q][T[1]],
			Y = PixelUtil.gn.adW(R, r * (j.x - J), r * (j.y - n), r * (g.x - J), r * (g.y - n))
	}
	var k = PixelUtil.gn.ad$(M, t),
		F = [];
	for (var A = 0; A < 2; A++) {
		var D = k[A],
			q = [D[0][0], D[0][1], D[0][2], D[1][0], D[1][1], D[1][2], D[2][0], D[2][1]],
			H = f.NH.cY(l[A], null, q);
		F.push([H.buffer, H.rect])
	}
	return [PixelUtil.Gf.aaW(F[0], F[1], G[V], G[Q], e, M, k, t)]
};

PixelUtil.Gf.XC = function(l, d) {
	var G = l.length,
		b = !1,
		V = Date.now(),
		Q = PixelUtil.Gf.g3(l, !1, 1e4);
	if (b) console.log("Descriptors ready", Date.now() - V);
	V = Date.now();
	for (var A = 0; A < G; A++) {
		var t = l[A][1];
		for (var I = 0; I < Q[A].length; I++) {
			Q[A][I].x += t.x;
			Q[A][I].y += t.y
		}
	}
	if (b) console.log("shifted", Date.now() - V);
	V = Date.now();
	var y = [];
	for (var A = 0; A < G; A++) y[A] = PixelUtil.Gf.r1(Q[A]);
	if (b) console.log("trees built", Date.now() - V);
	V = Date.now();
	var e = [];
	for (var A = 0; A < G - 1; A++)
		for (var I = A + 1; I < G; I++) {
			var M = PixelUtil.Gf.match(Q[A], Q[I], y[I]);
			if (b) console.log("Matches found", A, I, M.length);
			M = M.slice(0, M.length >>> 1);
			if (M.length < 10) return null;
			var R = PixelUtil.Gf.aaL(Q[A], Q[I], M, 2);
			e.push([A, I, M, R])
		}
	e.sort(function(Z, B) {
		return B[2].length - Z[2].length
	});
	if (b) console.log("Matches found", Date.now() - V);
	V = Date.now();
	var J = [],
		n = new UnionFind(G);
	for (var A = 0; A < e.length; A++) {
		var r = e[A],
			T = n.find(r[0]),
			j = n.find(r[1]);
		if (T != j) {
			J.push(r);
			n.link(T, j)
		}
	}
	var g = [];
	for (var A = 0; A < G; A++) g[A] = [1, 0, 0, 0, 1, 0, 0, 0];
	var Y = [0],
		k = new Uint8Array(G);
	k[Y[0]] = 1;
	while (Y.length != 0) {
		var j = Y.pop(),
			R = g[j],
			F = [];
		for (var A = 0; A < J.length; A++) {
			var r = J[A],
				D = r[0],
				q = r[1];
			if (D == j && k[q] == 0) {
				g[q] = PixelUtil.canvas.mY(R, r[3]);
				Y.push(q);
				k[q] = 1
			}
			if (q == j && k[D] == 0) {
				g[D] = PixelUtil.canvas.mY(R, PixelUtil.canvas.hI(r[3]));
				Y.push(D);
				k[D] = 1
			}
		}
	}
	if (d == null) {
		var H = [];
		for (var A = 0; A < G; A++) H.push([g[A][2], A]);
		H.sort(function(Z, B) {
			return Z[0] - B[0]
		});
		d = H[H.length >>> 1][1]
	}
	var W = PixelUtil.canvas.hI(g[d]);
	for (var A = 0; A < G; A++) g[A] = PixelUtil.canvas.mY(g[A], W);
	if (b) console.log("Transforms reordered", Date.now() - V);
	V = Date.now();
	return g
};

PixelUtil.Gf.g3 = function(l, d, G) {
	var b = [],
		V = !1;
	for (var A = 0; A < l.length; A++) {
		var Q = l[A][0],
			t = l[A][1],
			I = t.m,
			y = t.n,
			e = PixelUtil.allocBytes(t.O());
		PixelUtil.rgbaToGrayPlane(Q, e);
		var M = Date.now(),
			R = PixelUtil.Gf.aww(e, t, !0);
		if (V) console.log("Pyramid built ---------------", Date.now() - M);
		M = Date.now();
		var J = PixelUtil.a3m.a58(R, G);
		if (V) console.log("SURF Generation", Date.now() - M);
		M = Date.now();
		if (!d) {
			PixelUtil.mv.a2h(R, J);
			if (V) console.log("ORB Orientations", Date.now() - M);
			M = Date.now();
			PixelUtil.mv.a0U(R, J, e, I, y);
			if (V) console.log("ORB Descriptors", Date.now() - M);
			M = Date.now()
		}
		b.push(J)
	}
	return b
};

PixelUtil.Gf.aww = function(l, d, G) {
	var b = [],
		V = [l, d];
	PixelUtil.pyramidDownsampleMask(V);
	if (G) {
		var Q = PixelUtil.downsampleMask3x3(l, d),
			t = Q.rect,
			I = [Q.QI, t];
		PixelUtil.pyramidDownsampleMask(I)
	}
	for (var A = 0; A < V.length; A++) {
		var y = V[2 * A],
			e = V[2 * A + 1],
			M = e.m,
			R = e.n,
			J = Math.min(M, R);
		if (J < 30) break;
		if (J < 1600) b.push({
			uD: y,
			iJ: M,
			Tq: R,
			z3: 1 << A,
			gy: PixelUtil.buildIntegralImage(y, M, R)
		});
		if (!G) continue;
		var y = I[2 * A],
			e = I[2 * A + 1],
			M = e.m,
			R = e.n,
			J = Math.min(M, R);
		if (J < 30) break;
		if (J < 1600) b.push({
			uD: y,
			iJ: M,
			Tq: R,
			z3: (1 << A) * 3 / 2,
			gy: PixelUtil.buildIntegralImage(y, M, R)
		})
	}
	return b
};

PixelUtil.Gf.aaL = function(l, d, G, b) {
	var V = Date.now(),
		Q, t = 0,
		I = 0,
		y = G.length,
		e = new Float64Array(2);
	for (var M = 0; M < 3e3; M++) {
		var R = ~~(Math.random() * y),
			J = ~~(Math.random() * y),
			n = ~~(Math.random() * y),
			r = ~~(Math.random() * y),
			c = 0,
			v = 0;
		if (R == J || R == n || R == r || J == n || J == r || n == r) continue;
		var T = G[R],
			j = G[J],
			g = G[n],
			Y = G[r],
			k = l[T[0]],
			F = d[T[1]],
			D = l[j[0]],
			q = d[j[1]],
			H = l[g[0]],
			W = d[g[1]],
			Z = l[Y[0]],
			B = d[Y[1]],
			a = [k.x, k.y, D.x, D.y, H.x, H.y, Z.x, Z.y],
			m = [F.x, F.y, q.x, q.y, W.x, W.y, B.x, B.y],
			p = PixelUtil.canvas.ud(a, m);
		if (p[0] == 0 && p[1] == 0 && p[3] == 0 && p[4] == 0) continue;
		var i = y - t + 2;
		for (var A = 0; A < y && A - c < i; A++) {
			var z = l[G[A][0]],
				P = d[G[A][1]];
			PixelUtil.canvas.Gw(P.x, P.y, p, e);
			var C = e[0] - z.x,
				h = e[1] - z.y,
				L = C * C + h * h;
			if (L < b) {
				c++;
				v += L
			}
		}
		if (c > t || c == t && v < I) {
			Q = p;
			t = c;
			I = v
		}
	}
	return Q
};

var k8 = new Uint8Array(256);
for (var A = 0; A < 256; A++) {
	var f5 = 0,
		hZ = A;
	while (hZ != 0) {
		hZ = hZ & hZ - 1;
		f5++
	}
	k8[A] = f5
}
PixelUtil.Gf.a0S = function(l, d, G) {
	var b = 0,
		V = l.length;
	for (var A = 0; A < V && b < G; A++) b += k8[l[A] ^ d[A]];
	return b
};

PixelUtil.Gf.aeP = function(l, d, G, top, b) {
	if (b[G] == 1) return;
	var V = PixelUtil.Gf.a0S(l.a0, d.a0, top[0]);
	if (V < top[0]) {
		if (V < top[2]) {
			top[0] = top[2];
			top[1] = top[3];
			top[2] = V;
			top[3] = G
		} else {
			top[0] = V;
			top[1] = G
		}
	}
	b[G] = 1
};

PixelUtil.Gf.r1 = function(l) {
	var d = [],
		G = [],
		b = [
			[],
			[]
		],
		V = 4;
	for (var A = 0; A < l.length; A++)(l[A].amB == 0 ? d : G).push(A);
	for (var Q = 0; Q < 2; Q++) {
		var t = new Array(V),
			I = [],
			y = Q == 0 ? d : G,
			e = y.length / 256,
			M = [];
		for (var R = 0; R < 32; R++) {
			var J = new Array(256),
				T = 0;
			for (var n = 0; n < 256; n++) J[n] = [];
			for (var n = 0; n < y.length; n++) {
				var r = y[n];
				J[l[r].a0[R]].push(r)
			}
			for (var n = 0; n < 256; n++) T += Math.abs(J[n].length - e);
			M.push([T, R, J])
		}
		M.sort(function(j, g) {
			return j[0] - g[0]
		});
		var I = [],
			t = [];
		b[Q] = [I, t];
		for (var A = 0; A < V; A++) {
			I.push(M[A][1]);
			t.push(M[A][2])
		}
	}
	return b
};

PixelUtil.Gf.match = function(l, d, G) {
	var b = [],
		V = new Uint16Array(d.length);
	V.fill(65535);
	var Q = new Uint8Array(d.length),
		top = new Uint32Array(4),
		t = [];
	for (var I = 0; I < l.length; I++) {
		var y = l[I],
			e = y.a0;
		top.fill(1e6);
		Q.fill(0);
		var M = G[y.amB];
		for (var R = 0; R < M[1].length; R++) {
			var J = M[1][R][e[M[0][R]]];
			for (var n = 0; n < J.length; n++) {
				var r = J[n];
				PixelUtil.Gf.aeP(y, d[r], r, top, Q)
			}
		}
		if (top[2] < 50 && top[2] < top[0] * .5) {
			var T = V[top[3]];
			if (T == 65535) {
				V[top[3]] = b.length;
				b.push([I, top[3], top[2]])
			} else if (top[2] < b[T][2]) {
				b[T] = [I, top[3], top[2]]
			}
		}
	}
	b.sort(function(j, g) {
		return j[2] - g[2]
	});
	return b
};

PixelUtil.Gf.azw = function(l) {
	var d = new Rect;
	for (var A = 0; A < l.length; A++) d = d.Cw(l[A][1]);
	var G = PixelUtil.allocBytes(d.O() * 4);
	for (var A = 0; A < l.length; A++) PixelUtil.blend.compositeBlend("norm", l[A][0], l[A][1], G, d, d, 1);
	return [G, d]
};

PixelUtil.Gf.aaW = function(l, d, G, b, V, Q, t, I) {
	var y = l[1].clone(),
		e = y.clone();
	y.x = y.y = 0;
	var M = d[1].clone(),
		R = M.clone();
	M.x = M.y = 0;
	M.x = y.m;
	var J = y.Cw(M),
		n = R.y - e.y,
		r = PixelUtil.allocBytes(J.O() * 4);
	PixelUtil.blitRgbaRect(l[0], y, r, J);
	PixelUtil.blitRgbaRect(d[0], new Rect(M.x, M.y + n, M.m, M.n), r, J);
	var T = document.createElement("canvas");
	T.width = J.m;
	T.height = J.n;
	var j = T.getContext("2d", { willReadFrequently: true });
	j.lineWidth = .5;
	j.putImageData(new ImageData(new Uint8ClampedArray(r.buffer), J.m, J.n), 0, 0);
	if (Q) {
		var g = Q[0],
			Y = PixelUtil.mat3.Bo(g),
			k = y.m,
			F = I.m;
		for (var A = 0; A < V.length; A++) {
			var D = V[A],
				l = G[D[0]],
				d = b[D[1]];
			j.strokeStyle = "#ff0000";
			j.beginPath();
			var q = PixelUtil.gn.a4i(Y, t[0], d, 0, F),
				H = PixelUtil.gn.a4i(g, t[1], l, 0, F);
			j.moveTo(-e.x + q[0], -e.y + q[1]);
			j.lineTo(-e.x + q[2], -e.y + q[3]);
			j.moveTo(k - R.x + H[0], -R.y + n + H[1]);
			j.lineTo(k - R.x + H[2], -R.y + n + H[3]);
			j.stroke()
		}
	}
	if (V) {
		var W = V.length;
		for (var A = 0; A < W; A++) {
			var D = V[A],
				l = G[D[0]],
				d = b[D[1]];
			j.strokeStyle = "#ffff00"
		}
	}
	var Z = new Uint8Array(j.getImageData(0, 0, J.m, J.n).data.buffer);
	if (!1) {
		for (var B = 0; B < 2; B++) {
			var a = B == 0 ? G : b,
				m = B * y.m;
			for (var A = 0; A < a.length; A++) {
				var p = a[A],
					c = ~~p.x,
					v = ~~p.y,
					i = (v * J.m + c + m) * 4;
				Z[i + 1] = Z[i + 2] = p.a2_ * 60;
				Z[i + 0] = 0;
				Z[i + 3] = 255
			}
		}
	}
	return [Z, J]
};

PixelUtil.stack = {};
PixelUtil.stack.stack = function(l, d, G) {
	var b = l.length,
		V = d.length;
	if (b == 1) {
		d.set(l[0]);
		return
	}
	if (G == "avrg" || G == "stdv" || G == "summ" || G == "vari") {
		var Q = 1 / b;
		for (var A = 0; A < V; A++) {
			var t = 0;
			for (var I = 0; I < b; I++) t += l[I][A];
			var y = ~~(t * Q + .5);
			if (G == "avrg" || (A & 3) == 3) d[A] = y;
			else if (G == "summ") d[A] = 255 * Math.pow(Math.min(255, t) * (1 / 255), 1 / 2.4);
			else {
				var e = 0;
				for (var I = 0; I < b; I++) {
					var M = l[I][A] - y;
					e += M * M
				}
				var R = Math.sqrt(e * Q) * (1 / 255);
				if (G == "stdv") d[A] = 255 * Math.pow(R, 1 / 2.4);
				else d[A] = 255 * Math.pow(R * R, 1 / 2.4)
			}
		}
	} else if (G == "maxx") {
		for (var A = 0; A < V; A++) {
			var J = 0;
			for (var I = 0; I < b; I++) J = Math.max(J, l[I][A]);
			d[A] = J
		}
	} else if (G == "minn") {
		for (var A = 0; A < V; A++) {
			var J = 255;
			for (var I = 0; I < b; I++) J = Math.min(J, l[I][A]);
			d[A] = J
		}
	} else if (G == "medn" || G == "rang") {
		var n = function(g, Y) {
				return g - Y
			},
			r = new Array(b),
			T = 0,
			j = 0;
		if ((b & 1) == 0) {
			j = b >>> 1;
			T = j - 1
		} else {
			T = j = b >>> 1
		}
		for (var A = 0; A < V; A++) {
			for (var I = 0; I < b; I++) r[I] = l[I][A];
			r.sort(n);
			if (G == "medn") d[A] = r[T] + r[j] >>> 1;
			else d[A] = (A & 3) == 3 ? r[b - 1] : r[b - 1] - r[0]
		}
	} else console.log(G)
};

PixelUtil.ml = {};
PixelUtil.ml.abY = function(l, d, G, b) {
	var V = Date.now(),
		Q = new Uint32Array(d * G),
		t = new Uint8Array(d * G);
	while (!0) {
		t.fill(0);
		Q.fill(0);
		var I = [],
			y = 0;
		for (var e = 0; e < G; e++) {
			for (var M = 0; M < d; M++) {
				var A = e * d + M;
				if (t[A] == 0) {
					var R = I.length,
						J = PixelUtil.ml.uJ(l, d, G, M, e, t, Q, R);
					I.push([R, M, e, J[0], J[1], l[A]]);
					if (J[0] < b) y++
				}
			}
		}
		if (y == 0) break;
		var n = I.length,
			r = new UnionFind(n),
			T = [];
		for (var A = 0; A < n; A++) T.push([]);
		for (var A = 0; A < n; A++) {
			var J = I[A],
				j = J[4],
				g = 0,
				Y = 0;
			if (J[3] >= b) continue;
			var R = J[0];
			for (var k = 0; k < j.length; k += 2) {
				var F = Q[j[k + 1] * d + j[k]],
					D = I[F];
				if (D[3] > Y) {
					Y = D[3];
					g = F
				}
			}
			if (r.find(R) != r.find(g)) {
				r.link(R, g);
				T[R].push(g);
				T[g].push(R)
			}
		}
		var q = new Uint32Array(n);
		q.fill(4294967295);
		var H = new Uint32Array(n);
		for (var A = 0; A < n; A++) {
			if (q[A] != 4294967295 || T[A].length == 0) continue;
			var W = [A],
				Z = [A],
				B = A,
				a = I[A][3];
			while (Z.length != 0) {
				var m = Z.pop(),
					p = T[m];
				for (var k = 0; k < p.length; k++) {
					var c = p[k];
					if (W.indexOf(c) == -1) {
						W.push(c);
						Z.push(c);
						var v = I[c];
						if (v[3] > a) {
							a = v[3];
							B = c
						}
					}
				}
			}
			for (var k = 0; k < W.length; k++) {
				q[W[k]] = B;
				var i = I[B];
				H[W[k]] = l[i[2] * d + i[1]]
			}
		}
		for (var e = 0; e < G; e++)
			for (var M = 0; M < d; M++) {
				var A = e * d + M,
					z = q[Q[A]];
				if (z != 4294967295) l[A] = H[z]
			}
	}
};

PixelUtil.ml.uJ = function(l, d, G, b, V, Q, t, I) {
	var y = [b, V],
		e = l[V * d + b],
		M = 0,
		R = [];
	Q[V * d + b] = 1;
	while (y.length != 0) {
		var J = y.pop(),
			n = y.pop(),
			A = J * d + n;
		t[A] = I;
		M++;
		if (J != G - 1)
			if (l[A + d] == e) {
				if (Q[A + d] == 0) {
					y.push(n, J + 1);
					Q[A + d] = 1
				}
			} else R.push(n, J + 1);
		if (J != 0)
			if (l[A - d] == e) {
				if (Q[A - d] == 0) {
					y.push(n, J - 1);
					Q[A - d] = 1
				}
			} else R.push(n, J - 1);
		if (n != d - 1)
			if (l[A + 1] == e) {
				if (Q[A + 1] == 0) {
					y.push(n + 1, J);
					Q[A + 1] = 1
				}
			} else R.push(n + 1, J);
		if (n != 0)
			if (l[A - 1] == e) {
				if (Q[A - 1] == 0) {
					y.push(n - 1, J);
					Q[A - 1] = 1
				}
			} else R.push(n - 1, J)
	}
	return [M, R]
};

PixelUtil.ml.a0M = function(l, d, G, b, V) {
	var Q = PixelUtil.ml.sa(l.buffer, d, G).SV,
		t = Date.now(),
		I = [];
	for (var A = 0; A < Q.length; A++) {
		var y = Q[A],
			e = 1;
		for (var M = 0; M < e; M++) I.push(y.S5)
	}
	var R = new Uint32Array(I),
		J = UPNG.quantize.getKDtree(new Uint8Array(R.buffer), b),
		n = [d, 1, -d, -1, d + 1, -d + 1, -d - 1, d - 1, d + d, 2, -d - d, -2, d + d - 1, d + d + 1, d + 2, -d + 2, -d - d + 1, -d - d - 1, -d - 2, d - 2, d + d + 2, -d - d + 2 - d - d - 2, d + d - 2],
		r = new Uint8Array(d * G),
		T = l;
	for (var j = 0; j < G; j++)
		for (var g = 0; g < d; g++) {
			var A = j * d + g << 2,
				Y = T[A] * (1 / 255),
				k = T[A + 1] * (1 / 255),
				F = T[A + 2] * (1 / 255),
				D = T[A + 3] * (1 / 255),
				q = PixelUtil.ml.mA(J, Y, k, F, D, V);
			if (q == null) {
				var H = [],
					W = 0;
				while (W < 20) {
					var Z = j * d + g + n[W] << 2,
						B = T[Z] * (1 / 255),
						a = T[Z + 1] * (1 / 255),
						m = T[Z + 2] * (1 / 255),
						p = T[Z + 3] * (1 / 255),
						c = PixelUtil.ml.mA(J, B, a, m, p, .005);
					if (c != null) {
						if (H.indexOf(c) == -1) {
							H.push(c);
							c.hU = 1
						} else c.hU++
					}
					W++
				}
				H.sort(function(D, F) {
					return F.hU - D.hU
				});
				while (H.length != 0 && H[H.length - 1].hU < 3) H.pop();
				if (H.length == 0) q = PixelUtil.ml.mA(J, Y, k, F, D, 100);
				else if (H.length == 1) q = H[0];
				else if (H.length == 2) {
					var v = H[0],
						i = H[1],
						z = v.est.q,
						P = i.est.q,
						C = P[0] - z[0],
						h = P[1] - z[1],
						L = P[2] - z[2],
						U = P[3] - z[3],
						S = Y - z[0],
						E = k - z[1],
						x = F - z[2],
						K = D - z[3],
						u = C * C + h * h + L * L + U * U,
						bC = S * S + E * E + x * x + K * K,
						O = (S * C + E * h + x * L + K * U) / u,
						$ = bC - O * O * u;
					if ($ < .5) q = O < .5 ? v : i;
					else {
						q = PixelUtil.ml.mA(J, Y, k, F, D, 100)
					}
				} else {
					var v = H[0],
						i = H[1],
						gX = H[2],
						z = v.est.q,
						P = i.est.q,
						_ = gX.est.q,
						jI = z[0] - _[0],
						iw = z[1] - _[1],
						hn = z[2] - _[2],
						jq = z[3] - _[3],
						iv = P[0] - _[0],
						kq = P[1] - _[1],
						eE = P[2] - _[2],
						e8 = P[3] - _[3],
						aI = _[0] - Y,
						dK = _[1] - k,
						jC = _[2] - F,
						d7 = _[3] - D,
						ka = jI * jI + iw * iw + hn * hn + jq * jq,
						hS = jI * iv + iw * kq + hn * eE + jq * e8,
						eH = aI * jI + dK * iw + jC * hn + d7 * jq,
						kA = jI * iv + iw * kq + hn * eE + jq * e8,
						gq = iv * iv + kq * kq + eE * eE + e8 * e8,
						hb = aI * iv + dK * kq + jC * eE + d7 * e8,
						ex = 1 / (hS * kA - ka * gq),
						O = (gq * eH - hb * hS) * ex,
						fs = (hb * ka - eH * kA) * ex,
						f_ = 1 - O - fs,
						bD = Math.max(O, fs, f_);
					if (bD == O) q = v;
					else if (bD == fs) q = i;
					else q = gX
				}
			}
			r[A >> 2] = q.ind
		}
	return {
		F0: r,
		SV: J[1]
	}
};

PixelUtil.ml.sa = function(l, d, G) {
	var b = [],
		V = {},
		Q = d - 1,
		t = G - 1,
		I = 0,
		y = new Uint32Array(l),
		e = [-d - 1, -d, -d + 1, -1, 1, d - 1, d, d + 1, d + d, 2, -d - d, -2, d + d - 1, d + d + 1, d + 2, -d + 2, -d - d + 1, -d - d - 1, -d - 2, d - 2, d + d + 2, -d - d + 2 - d - d - 2, d + d - 2];
	for (var M = 1; M < t; M++)
		for (var R = 1; R < Q; R++) {
			var J = M * d + R,
				n = y[J],
				r = !0;
			for (var A = 0; A < 8; A++) r = r && y[J + e[A]] == n;
			if (r) {
				I++;
				var T = V[n];
				if (T == null) {
					V[n] = b.length;
					b.push({
						S5: n,
						q5: 1
					})
				} else b[T].q5++
			}
		}
	return {
		SV: b,
		avm: I
	}
};

PixelUtil.ml.mA = function(l, d, G, b, V, Q) {
	var t = UPNG.quantize.getNearest(l[0], d, G, b, V);
	return PixelUtil.ml.a6T(t, d, G, b, V) < Q ? t : null
};

PixelUtil.ml.a6T = function(l, d, G, b, V) {
	var Q = l.est.q,
		t = d - Q[0],
		I = G - Q[1],
		y = b - Q[2],
		e = V - Q[3];
	return t * t + I * I + y * y + e * e
};

PixelUtil.ml.uP = function() {
	function l(g, Y, k, F, D, q) {
		var H = [],
			W = q,
			Z = q,
			B = q >>> 2;
		for (var a = 0; a < D; a++)
			for (var m = 0; m < F; m++) {
				var p = ~~((m + .5) * W),
					c = ~~((a + .5) * Z),
					v = 1e9,
					i = Math.max(0, p - B),
					z = Math.min(Y, p + B + 1),
					P = Math.max(0, c - B),
					C = Math.min(k, c + B + 1);
				for (var h = P; h < C; h++)
					for (var L = i; L < z; L++) {
						var U = d(g, Y, L, h);
						if (U < v) {
							p = L;
							c = h;
							v = U
						}
					}
				var S = (c * Y + p) * 4;
				H.push(p, c)
			}
		return H
	}

	function d(g, Y, k, F) {
		var D = (F * Y + k) * 4,
			q = Y * 4,
			H = G(g, D - 4, D) + G(g, D, D + 4),
			W = G(g, D - q, D) + G(g, D, D + q);
		return H + W
	}

	function G(g, Y, k) {
		var F = g[Y] - g[k],
			D = g[Y + 1] - g[k + 1],
			q = g[Y + 2] - g[k + 2];
		return F * F + D * D + q * q
	}
	var b = 0,
		V = 0;

	function Q(g, Y, k, F) {
		V++;
		if (F < b) b = F;
		g[F].push(Y, k)
	}

	function t(g) {
		V--;
		while (g[b].length == 0) b++
	}

	function I(g, Y, k, F, D) {
		b = 0;
		V = 0;
		var q = Y * k,
			H = Math.round(Math.min(Y, k) / (F ? F : 50)),
			i = 0,
			z = 16;
		if (H == 0) H = 1;
		var W = (D ? D : 30) / H,
			Z = Math.floor(Y / H),
			B = Math.floor(k / H),
			a = new Uint16Array(q);
		for (var A = 0; A < q; A++) a[A] = 65535;
		var m = l(g, Y, k, Z, B, H),
			p = m.length >>> 1;
		if (p > 65535) throw p;
		var c = [];
		for (var A = 0; A < 1e3 + k; A++) c.push([]);
		var v = [0, 1, 0, -1, -1, 0, 1, 0],
			P = Math.min(B, 5),
			C = new Uint32Array(p * 6);
		for (var h = 0; h < B; h += P) {
			var L = Math.min(h + P + 1, B);
			for (var U = h; U < L; U++)
				for (var S = 0; S < Z; S++) {
					var A = U * Z + S,
						E = A * 2,
						x = m[E + 1] << 16 | m[E];
					Q(c, x, A, m[E + 1] >>> z)
				}
			var K = Math.min(k, L * H);
			if (h + P >= B) K = k;
			while (V != 0) {
				t(c);
				var u = c[b].pop(),
					bC = c[b].pop(),
					O = bC >>> 16,
					$ = bC & 65535,
					A = O * Y + $;
				if (a[A] == 65535) {
					var gX = u * 6,
						_ = A << 2;
					a[A] = u;
					C[gX] += g[_];
					C[gX + 1] += g[_ + 1];
					C[gX + 2] += g[_ + 2];
					C[gX + 3] += $;
					C[gX + 4] += O;
					C[gX + 5]++;
					var jI = O >>> z;
					if (O != K - 1 && a[A + Y] == 65535) Q(c, O + 1 << 16 | $, u, y(g, Y, W, $, O + 1, C, gX) + jI);
					if (O != 0 && a[A - Y] == 65535) Q(c, O - 1 << 16 | $, u, y(g, Y, W, $, O - 1, C, gX) + jI);
					if ($ != 0 && a[A - 1] == 65535) Q(c, O << 16 | $ - 1, u, y(g, Y, W, $ - 1, O, C, gX) + jI);
					if ($ != Y - 1 && a[A + 1] == 65535) Q(c, O << 16 | $ + 1, u, y(g, Y, W, $ + 1, O, C, gX) + jI)
				}
			}
			if (K != O) {
				var iw = (h + P) * Z;
				C.fill(0, iw * 6, (iw + Z) * 6);
				for (var O = (h + P - 2) * H; O < K; O++)
					for (var $ = 0; $ < Y; $++) {
						var A = O * Y + $;
						if (a[A] >= iw) {
							a[A] = 65535
						}
					}
			}
		}
		return {
			F0: a,
			TY: p,
			lo: C
		}
	}
	PixelUtil.ml.Op = function(g, Y, k, F, D) {
		var q = g.TY,
			H = Y * k,
			W = g.lo,
			Z = g.F0,
			B = n(F, Z, q, H),
			a = new UnionFind(q),
			z = 0;
		for (var m = 1; m < k; m++)
			for (var p = 1; p < Y; p++) {
				var A = m * Y + p,
					c = Z[A],
					v = 0;
				if ((v = Z[A - 1]) != c && B[v] == B[c] && e(W, 0, c * 6, v * 6) < D) a.link(c, v);
				if ((v = Z[A - Y]) != c && B[v] == B[c] && e(W, 0, c * 6, v * 6) < D) a.link(c, v)
			}
		var i = new Uint16Array(q);
		i.fill(65535);
		var P = new Uint16Array(q);
		for (var A = 0; A < q; A++) {
			var C = a.find(A);
			if (i[C] == 65535) i[C] = z++;
			P[A] = i[C]
		}
		var h = new Uint16Array(H);
		for (var A = 0; A < H; A++) h[A] = P[Z[A]];
		return {
			F0: h,
			TY: z
		}
	};
	PixelUtil.ml.alb = function(g, Y, k, F) {
		var D = PixelUtil.allocBytes(k),
			q = Y.length,
			H = 0;
		for (var A = 0; A < q && H != 3; A++) {
			var W = F[A];
			if (W == 0 || W == 255) {
				var Z = Y[A],
					B = 2 - (W >>> 7);
				D[Z] = H = D[Z] | B
			}
		}
		return H != 3
	};

	function y(g, Y, k, F, D, q, H) {
		var W = (D * Y + F) * 4,
			Z = q[H + 5],
			B = 1 / Z,
			a = g[W] * Z - q[H],
			m = g[W + 1] * Z - q[H + 1],
			p = g[W + 2] * Z - q[H + 2],
			c = F * Z - q[H + 3],
			v = D * Z - q[H + 4],
			i = Math.sqrt(a * a + m * m + p * p),
			z = Math.sqrt(c * c + v * v);
		return ~~((i + k * z) * B + .5)
	}

	function e(g, Y, k, F) {
		var D = 1 / g[k + 5],
			q = 1 / g[F + 5],
			H = g[k] * D - g[F] * q,
			W = g[k + 1] * D - g[F + 1] * q,
			Z = g[k + 2] * D - g[F + 2] * q,
			B = g[k + 3] * D - g[F + 3] * q,
			a = g[k + 4] * D - g[F + 4] * q,
			m = Math.sqrt(H * H + W * W + Z * Z),
			p = Math.sqrt(B * B + a * a);
		return ~~(m + Y * p + .5)
	}

	function M(g, Y, k) {
		var F = PixelUtil.downsampleRgbaMean(g, new Rect(0, 0, Y, k)),
			D = F.rect.m,
			q = F.rect.n,
			H = I(F.QI, D, q),
			W = H.F0,
			Z = Date.now(),
			B = new Uint16Array(Y * k);
		B.fill(65535);
		for (var a = 0; a < q; a++) {
			for (var m = 0; m < D; m++) {
				var p = a * D + m,
					A = (a << 1) * Y + (m << 1),
					c = W[p];
				if (W[p - D] != c || W[p - 1] != c || W[p + 1] != c || W[p + D] != c) c = 65535;
				B[A] = c;
				B[A + 1] = c;
				B[A + Y] = c;
				B[A + Y + 1] = c
			}
		}
		H.F0 = B;
		return H
	}

	function R(g, Y) {
		var A = 0,
			k = g.length;
		while (A != k && g[A] != Y) A += 2;
		return A == k ? -1 : A
	}

	function J(g, A) {
		if (A == g.length - 2) {
			g.pop();
			g.pop()
		} else {
			g[A + 1] = g.pop();
			g[A] = g.pop()
		}
	}
	PixelUtil.ml.au3 = function(g, Y, k, F, D) {
		var q = new Uint32Array(D * 4400),
			d = [];
		for (var A = 0; A < D; A++) d.push([]);
		for (var H = 0; H < k; H++)
			for (var W = 0; W < Y; W++) {
				var A = H * Y + W,
					Z = A << 2,
					B = F[A],
					a = 0,
					m = g[Z] >>> 4,
					p = g[Z + 1] >>> 4,
					c = g[Z + 2] >>> 4;
				q[B * 4400 + (m << 8 | p << 4 | c)]++;
				q[B * 4400 + 4096]++;
				q[B * 4400 + 4100 + (m << 4 | p)]++;
				q[B * 4400 + 4360 + m]++;
				if (W != 0 && (a = F[A - 1]) != B && R(d[B], a) == -1) {
					d[B].push(a, 0);
					d[a].push(B, 0)
				}
				if (H != 0 && (a = F[A - Y]) != B && R(d[B], a) == -1) {
					d[B].push(a, 0);
					d[a].push(B, 0)
				}
			}
		for (var A = 0; A < D; A++) {
			var c = d[A];
			for (var v = 0; v < c.length; v += 2) c[v + 1] = j(q, A, c[v])
		}
		return [q, d]
	};

	function n(g, Y, k, F) {
		var D = PixelUtil.allocBytes(k);
		for (var A = 0; A < F; A++) {
			var q = g[A];
			if (q == 0 || q == 255) D[Y[A]] = 2 - (q >>> 7)
		}
		return D
	}
	PixelUtil.ml.akF = function(g, Y, k, F, D, q, H) {
		var W = Y * k,
			Z = H[0],
			d = H[1],
			B = new UnionFind(F),
			a = n(D, g, F, W),
			m = -1,
			p = !0,
			c = 0;
		for (var A = 0; A < F; A++)
			if (a[A] == 1) {
				if (m == -1) m = A;
				else B.link(A, m)
			}
		if (m == -1) {
			for (var A = 0; A < W; A++) q[A] = D[A] == 255 ? 255 : 0;
			return
		}
		while (p) {
			while (p) {
				p = !1;
				for (var A = 0; A < F; A++) {
					if (a[A] == 0) {
						var v = r(d[A]);
						if (a[v] == 1) {
							a[A] = a[v];
							p = !0;
							B.link(A, v)
						}
					}
				}
			}
			p = !0;
			c = 0;
			while (p) {
				p = !1;
				for (var A = 0; A < F; A++) {
					if (a[A] == 0) {
						var v = r(d[A]);
						if (a[v] == 0) {
							var i = A * 4400,
								z = v * 4400;
							for (var P = 0; P < 4400; P += 2) {
								Z[i + P] += Z[z + P];
								Z[i + P + 1] += Z[z + P + 1]
							}
							T(d, Z, A, v);
							c++;
							a[v] = 3;
							p = !0;
							B.link(A, v)
						}
					}
				}
			}
			p = c != 0
		}
		var C = B.find(m);
		for (var A = 0; A < F; A++) a[A] = B.find(A) == C ? 255 : 0;
		for (var A = 0; A < W; A++) {
			q[A] = a[g[A]]
		}
		for (var A = 0; A < W; A++) {
			var v = D[A];
			if (v == 0 || v == 255) q[A] = v
		}
	};

	function r(g) {
		var Y = 0,
			k = 0,
			F = g.length;
		for (var D = 0; D < F; D += 2) {
			var q = g[D + 1];
			if (q > k) {
				k = q;
				Y = D
			}
		}
		return g[Y]
	}

	function T(d, g, Y, k) {
		var F = d[Y],
			D = d[k];
		J(F, R(F, k));
		J(D, R(D, Y));
		for (var A = 0; A < D.length; A += 2) {
			var q = D[A],
				H = d[q];
			J(H, R(H, k));
			if (R(H, Y) == -1) {
				H.push(Y, 0);
				F.push(q, 0)
			}
		}
		for (var A = 0; A < F.length; A += 2) {
			var q = F[A],
				H = d[q],
				W = j(g, Y, q);
			F[A + 1] = W;
			H[R(H, Y) + 1] = W
		}
	}

	function j(g, Y, k) {
		var F = 0,
			D = 4096,
			q = Y * 4400,
			H = k * 4400;
		for (var W = 0; W < 16; W++) {
			if (g[q + 4360 + W] == 0 || g[H + 4360 + W] == 0) continue;
			for (var Z = 0; Z < 16; Z++) {
				var B = W << 4 | Z;
				if (g[q + 4100 + B] == 0 || g[H + 4100 + B] == 0) continue;
				var a = q + (B << 4),
					m = H + (B << 4);
				for (var A = 0; A < 16; A++) F += Math.sqrt(g[a + A] * g[m + A])
			}
		}
		var p = F / Math.sqrt(g[q + D] * g[H + D]);
		return ~~(999.99999 * p)
	}
	return I
}();
PixelUtil.YW = {};
PixelUtil.YW.a9U = function() {
	var l = 11,
		d = 7,
		G = l >>> 1,
		hZ = d >>> 1,
		b = 2,
		V = 2e3 / b,
		Q = [],
		I = null,
		y = "";

	function t(M, R, J) {
		var n = (M[R + 0] - M[J + 0]) * (1 / 255),
			r = (M[R + 1] - M[J + 1]) * (1 / 255),
			T = (M[R + 2] - M[J + 2]) * (1 / 255),
			j = (M[R + 3] - M[J + 3]) * (1 / 255),
			g = n * n * .125 + r * r * .25 + T * T * .5 + j * j;
		return Q[~~(g * V)]
	}

	function e(M, R, J, n, r, T) {
		var j = Date.now(),
			g = PixelUtil.allocBytes(R * J);
		PixelUtil.rgbaToGrayPlane(M, g);
		var Y = UZIP.adler(g, 0, R * J);
		if (Y != y) {
			var k = PixelUtil.buildIntegralImage(g, R, J);
			I = PixelUtil.allocBytes(R * J * 4);
			y = Y;
			var F = [1, 1 / 9, 1 / 25, 1 / 49, 1 / 81];
			for (var D = 0; D < J; D++)
				for (var q = 0; q < R; q++)
					for (var A = 0; A < 4; A++) {
						var H = Math.max(1, q - A),
							W = Math.min(R - 1, q + A),
							Z = Math.max(1, D - A),
							B = Math.min(J - 1, D + A),
							a = PixelUtil.integralRectSum(k, R, H, W, Z, B);
						if (isNaN(a)) throw q + "," + D + "," + A + "," + a;
						I[(D * R + q) * 4 + A] = a * F[A]
					}
		}
		if (WebGLContext.webglAvailable) {
			var m = WebGLContext.getOrCreateTexture(0, R, J);
			m.set(M);
			var p = WebGLContext.getOrCreateTexture(1, R, J);
			p.set(I);
			var c = WebGLContext.getOrCreateTexture(2, R, J);
			WebGLContext.setFramebufferViewport(c);
			WebGLContext.filter.wF({
				type: WebGLContext.filter.atu,
				wl: new Float32Array([1 / R, 1 / J]),
				acO: p.glTexture,
				agI: r,
				acd: T
			}, m.glTexture);
			c.get(n)
		} else {
			for (var A = 0; A < 2e3; A++) Q[A] = Math.exp(-(A / 2e3) * b * (100 + (1 - r) * (1 - r) * 1e4));
			var v = hZ + 2;
			for (var D = v; D < J - v; D++)
				for (var q = v; q < R - v; q++) {
					var i = 0,
						z = 0,
						P = 0,
						C = 0;
					for (var h = 0; h < l; h++)
						for (var L = 0; L < l; L++) {
							var U = q + L - G,
								S = D + h - G;
							if (U == q && S == D || U < v || S < v || U >= R - v || S >= J - v) continue;
							var E = t(I, (D * R + q) * 4, (S * R + U) * 4),
								x = S * R + U << 2;
							i += E * M[x + 0];
							z += E * M[x + 1];
							P += E * M[x + 2];
							C += E
						}
					if (C == 0) {
						continue
					}
					var K = 1 / C,
						u = (D * R + q) * 4;
					n[u + 0] = ~~((1 - T) * K * i + T * n[u + 0]);
					n[u + 1] = ~~((1 - T) * K * z + T * n[u + 1]);
					n[u + 2] = ~~((1 - T) * K * P + T * n[u + 2])
				}
		}
	}
	return e
}();
// PixelUtil.bezierPatch — cubic Bezier patch evaluation for mesh warping
PixelUtil.az5 = function() {
	var l = 6,
		d = l >>> 1,
		G = [
			[-.0662912607, -.0855816496],
			[.1104854346, -.0855816496],
			[.6629126074, .1711632992],
			[.6629126074, .1711632992],
			[.1104854346, -.0855816496],
			[-.0662912607, -.0855816496],
			[0, 0],
			[0, 0]
		],
		b = [
			[-.0662912607, .0855816496],
			[-.1104854346, -.0855816496],
			[.6629126074, -.1711632992],
			[-.6629126074, .1711632992],
			[.1104854346, .0855816496],
			[.0662912607, -.0855816496],
			[0, 0],
			[0, 0]
		];

	function V(T, j) {
		var g = !1,
			Y = T.length,
			k = j[0],
			H = 5,
			Z = 0,
			B = 0;
		for (var A = 1; A < Y; A++) k = k.Cw(j[A]);
		if ((k.m & 1) != 0) k.m++;
		if ((k.n & 1) != 0) k.n++;
		var F = k.m,
			D = k.n,
			q = Math.max(F, D);
		while (q >>> H > 8 && H < 10) H++;
		var W = 1 << H;
		if (F % W != 0) Z = W - F % W;
		if (D % W != 0) B = W - D % W;
		k.rC(Z >>> 1, B >>> 1);
		F = k.m;
		D = k.n;
		if (F % W != 0 || D % W != 0) throw "e";
		var a = Date.now(),
			m = [],
			p = PixelUtil.allocBytes(k.O()),
			c = [],
			v = F * D,
			i = new Float32Array(F * D * 2);
		for (var A = 0; A < Y; A++) {
			var z = j[A],
				P = PixelUtil.allocBytes(z.O());
			PixelUtil.rgbaToGrayPlane(T[A], P);
			p.fill(0);
			PixelUtil.copyBufferRect(P, z, p, k);
			m.push(p.slice(0));
			var C = z.x - k.x,
				h = z.y - k.y,
				L = C + z.m - 2,
				U = h + z.n;
			for (var S = 0; S < z.n; S++) {
				var E = (S + h) * F;
				for (var x = 0; x < C; x++) p[E + x] = p[E + C];
				for (var x = L; x < F; x++) p[E + x] = p[E + L - 1]
			}
			for (var x = 0; x < F; x++) {
				for (var S = 0; S < h; S++) p[S * F + x] = p[h * F + x];
				for (var S = U; S < D; S++) p[S * F + x] = p[(U - 1) * F + x]
			}
			var K = new Float32Array(F * D * 2);
			c.push(K);
			for (var u = 0; u < v; u++) K[u * 2] = p[u] * (1 / 255);
			y(K, i, F, D, H);
			Q(K, F, D, H)
		}
		if (g) console.log("to gray, decompose", Date.now() - a);
		a = Date.now();
		var bC = PixelUtil.allocBytes(F * D);
		for (var S = 0; S < D; S++)
			for (var x = 0; x < F; x++) {
				var O = 0,
					$ = 0,
					gX = S * F + x << 1;
				for (var A = 0; A < Y; A++) {
					var _ = c[A],
						jI = _[gX],
						iw = _[gX + 1],
						hn = jI * jI + iw * iw;
					if (hn > $) {
						$ = hn;
						O = A
					}
				}
				bC[gX >>> 1] = O
			}
		if (g) console.log("max abs value", Date.now() - a);
		a = Date.now();
		t(bC, F, D, H);
		I(bC, F, D);
		if (g) console.log("denoise", Date.now() - a);
		a = Date.now();
		var jq = i.slice(0);
		for (var S = 0; S < D; S++)
			for (var x = 0; x < F; x++) {
				var A = S * F + x,
					gX = A << 1,
					iv = c[bC[A]];
				jq[gX] = iv[gX];
				jq[gX + 1] = iv[gX + 1]
			}
		e(jq, i, F, D, H);
		if (g) console.log("compose", Date.now() - a);
		a = Date.now();
		for (var u = 0; u < v; u++) {
			var hn = jq[u * 2] * 255,
				O = 0,
				$ = 1e9;
			for (var A = 0; A < Y; A++) {
				var kq = Math.abs(m[A][u] - hn);
				if (kq < $) {
					$ = kq;
					O = A
				}
				m[A][u] = 0
			}
			m[O][u] = 255
		}
		if (g) console.log("toRGB", Date.now() - a);
		a = Date.now();
		return [m, k]
	}

	function Q(T, j, g, Y) {
		var k = j >>> Y,
			F = g >>> Y,
			D = 1e-4;
		for (var q = 0; q < g; q++)
			for (var H = 0; H < j; H++) {
				if (H < k && q < F) continue;
				var W = (q * j + H) * 2,
					Z = T[W],
					B = T[W + 1],
					a = Z * Z + B * B;
				if (a < D) Z = B = 0;
				else {
					var m = (a - D) / a;
					Z *= m;
					B *= m
				}
				T[W] = Z;
				T[W + 1] = B
			}
	}

	function t(T, j, g, Y) {
		for (var k = 0; k < Y; k++) {
			var F = j >>> k,
				D = g >>> k,
				q = F >>> 1,
				H = D >>> 1;
			for (var W = 0; W < H; W++)
				for (var Z = 0; Z < q; Z++) {
					var B = W * j + q + Z,
						a = (W + H) * j + q + Z,
						m = (W + H) * j + Z,
						p = T[B],
						c = T[a],
						v = T[m];
					if (p == c == v) {} else if (p == c) T[m] = p;
					else if (c == v) T[B] = c;
					else if (p == v) T[a] = p
				}
		}
	}

	function I(T, j, g) {
		for (var Y = 1; Y < g - 1; Y++)
			for (var k = 1; k < j - 1; k++) {
				var A = Y * j + k,
					F = T[A - j],
					D = T[A - 1],
					q = T[A],
					H = T[A + 1],
					W = T[A + j],
					Z = F == D && F == H || F == H && H == W || H == W && D == W || F == D && W == D;
				if (Z) T[A] = F == D ? F : D == H ? D : F;
				else if (q > F && q > D && q > H && q > W) T[A] = F + D + H + W >>> 2;
				else if (q < F && q < D && q < H && q < W) T[A] = F + D + H + W >>> 2
			}
	}

	function y(T, j, g, Y, k) {
		for (var A = 0; A < k; A++) {
			var F = g >>> A,
				D = Y >>> A;
			M(T, j, g, Y, F, D)
		}
	}

	function e(T, j, g, Y, k) {
		for (var A = k - 1; A >= 0; A--) {
			var F = g >> A,
				D = Y >> A;
			R(T, j, g, Y, F, D)
		}
	}

	function M(T, j, g, Y, k, F) {
		n(T, j, g, Y, k, F, !0);
		n(j, T, g, Y, k, F, !1)
	}

	function R(T, j, g, Y, k, F) {
		r(T, j, g, Y, k, F, !0);
		r(j, T, g, Y, k, F, !1)
	}

	function J(T, j, g, Y, k, F) {
		var D = g * Y + j << 1;
		T[D] = k;
		T[D + 1] = F
	}

	function n(T, j, g, Y, k, F, D) {
		var f5 = D ? k : F,
			q = D ? F : k,
			H = q >>> 1;
		for (var W = 0; W < f5; W++) {
			for (var Z = 0; Z < q; Z += 2) {
				var B = 0,
					a = 0,
					m = 0,
					p = 0,
					c = Z >>> 1;
				for (var v = 0; v < 6; v++) {
					var i = Z + v - 3;
					if (i < 0) i = q + i;
					if (i >= q) i = i - q;
					var z = (D ? i * g + W : W * g + i) << 1,
						P = T[z],
						C = T[z + 1],
						h = G[v],
						L = b[v];
					B += P * h[0] - C * h[1];
					a += C * h[0] + P * h[1];
					m += P * L[0] - C * L[1];
					p += C * L[0] + P * L[1]
				}
				if (D) {
					J(j, W, c, g, B, a);
					J(j, W, c + H, g, m, p)
				} else {
					J(j, c, W, g, B, a);
					J(j, c + H, W, g, m, p)
				}
			}
		}
	}

	function r(T, j, g, Y, k, F, D) {
		var f5 = D ? k : F,
			q = D ? F : k,
			H = q >>> 1,
			W, Z, B, a;
		for (var m = 0; m < f5; m++) {
			for (var p = 0; p < q; p++) {
				var c = 0,
					v = 0;
				for (var i = p + 3 & 1; i < 6; i += 2) {
					var z = p - i + 3 >> 1;
					if (z < 0) z = H + z;
					if (z >= H) z = z - H;
					if (D) {
						W = m;
						Z = z;
						B = m;
						a = z + H
					} else {
						Z = m;
						W = z;
						a = m;
						B = z + H
					}
					var P = Z * g + W << 1,
						C = a * g + B << 1,
						h = T[P],
						L = T[P + 1],
						U = T[C],
						S = T[C + 1],
						E = G[i],
						x = b[i];
					c += h * E[0] + U * x[0];
					c += L * E[1] + S * x[1];
					v += L * E[0] + S * x[0];
					v -= h * E[1] + U * x[1]
				}
				if (D) J(j, m, p, g, c, v);
				else J(j, p, m, g, c, v)
			}
		}
	}
	return {
		kt: V
	}
}();
var j0 = function() {
	function l() {
		this.O = 0;
		this.tU = 0;
		this.x0 = {};
		this.Le = [];
		this.X1 = 1e5;
		this.$n = 1e5;
		this.G1 = -1;
		this.UE = -1;
		this.color = 0
	}

	function d(hZ) {
		this.r4 = hZ;
		this._K = new Array(hZ);
		this.S5 = new Array(hZ * 6);
		this.azz = 0;
		this.sx = new Array(hZ * 2);
		this.alpha = new Array(hZ);
		this.Os = new Array(hZ);
		this.kq = new Array(hZ)
	}

	function G(V, Q, t, I) {
		function y(j, g, V, Q) {
			return V[Q * g + j]
		}

		function e(A) {
			var H = V.length;
			while (A < H && V[A] == 0) A++;
			return A < H ? A : -1
		}

		function M(j, g, H) {
			for (var A = 2; A < 5; A++) {
				var W = 0;
				for (var Z = -A + 1; Z <= A - 1; Z++) {
					W += y(j + Z, g + A - 1, V, Q) == H ? 1 : -1;
					W += y(j + A - 1, g + Z - 1, V, Q) == H ? 1 : -1;
					W += y(j + Z - 1, g - A, V, Q) == H ? 1 : -1;
					W += y(j - A, g + Z, V, Q) == H ? 1 : -1
				}
				if (W > 0) return 1;
				else if (W < 0) return 0
			}
			return 0
		}

		function R(H, r) {
			var T = new l,
				j = H,
				g = r,
				W = 0,
				Z = 1,
				B;
			T.color = V[r * Q + H];
			T.sign = y(H, r, V, Q) == T.color ? "+" : "-";
			while (1) {
				T.Le.push(j, g);
				if (j > T.G1) T.G1 = j;
				if (j < T.X1) T.X1 = j;
				if (g > T.UE) T.UE = g;
				if (g < T.$n) T.$n = g;
				T.tU++;
				j += W;
				g += Z;
				T.O -= j * Z;
				if (j == H && g == r) break;
				var a = y(j + (W + Z - 1 >> 1), g + (Z - W - 1 >> 1), V, Q) == T.color,
					m = y(j + (W - Z - 1 >> 1), g + (Z + W - 1 >> 1), V, Q) == T.color;
				if (m && !a) {
					if (I.K7 == "right" || I.K7 == "black" && T.sign == "+" || I.K7 == "white" && T.sign == "-" || I.K7 == "majority" && M(j, g, T.color) || I.K7 == "minority" && !M(j, g, T.color)) {
						B = W;
						W = -Z;
						Z = B
					} else {
						B = W;
						W = Z;
						Z = -B
					}
				} else if (m) {
					B = W;
					W = -Z;
					Z = B
				} else if (!a) {
					B = W;
					W = Z;
					Z = -B
				}
			}
			return T
		}
		var J = 0,
			n = [];
		while (!0) {
			var J = e(J);
			if (J == -1) break;
			var r = Math.floor(J / Q),
				T = R(J - r * Q, r);
			for (var A = 0; A < T.Le.length - 2; A += 2) {
				var j = T.Le[A],
					g = T.Le[A + 1],
					Y = g * Q + j;
				if (j == T.Le[A + 2] && g + 1 == T.Le[A + 3] && V[Y] != 0) j0.fill(Y, V, Q, 0)
			}
			if (T.O > I.a9o) n.push(T)
		}
		for (var A = 0; A < n.length; A++) n[A].parent = -1;
		var k = Date.now();
		for (var A = 1; A < n.length; A++) {
			var F = n[A];
			for (var D = A - 1; D >= 0; D--) {
				var q = n[D];
				if (F.X1 < q.X1 || F.G1 > q.G1 || F.$n < q.$n || F.UE > q.UE) continue;
				if (!j0._S(q.Le, F.Le[0] + .5, F.Le[1] + .5)) continue;
				F.parent = D;
				break
			}
		}
		return n
	}

	function b(V, Q) {
		function t(W, Z, B, a, m) {
			this.x = W;
			this.y = Z;
			this.S$ = B;
			this.zy = a;
			this.tq = m
		}

		function I(W, hZ) {
			return (hZ + W) % hZ
		}

		function y(W, Z, B, a) {
			return W * a - B * Z
		}

		function e(W, Z, B, a) {
			return W * B + Z * a
		}

		function M(W, Z, B) {
			if (W <= B) return W <= Z && Z < B;
			else return W <= Z || Z < B
		}

		function R(W, Z, B) {
			var a = 0;
			a += Z * W[0] * Z;
			a += Z * W[1] * B;
			a += Z * W[2];
			a += B * W[3] * Z;
			a += B * W[4] * B;
			a += B * W[5];
			a += W[6] * Z;
			a += W[7] * B;
			a += W[8];
			return a
		}

		function J(W, Z, B) {
			return Z + W * (B - Z)
		}

		function n(W, Z, B, a) {
			var m = Math.sign(B - W),
				p = -Math.sign(a - Z);
			return m * (B - W) - p * (a - Z)
		}

		function r(W, Z) {
			return Math.sqrt(W * W + Z * Z)
		}

		function T(W, Z, B, a, m) {
			var p = 1 - W;
			return p * p * p * Z + 3 * (p * p * W) * B + 3 * (W * W * p) * a + W * W * W * m
		}

		function j(W, Z, B, a, m, p, c, v) {
			var i = y(W, Z, c, v),
				z = y(B, a, c, v),
				P = y(m, p, c, v),
				C = i - 2 * z + P,
				h = -2 * i + 2 * z,
				L = i,
				U = h * h - 4 * C * L;
			if (C == 0 || U < 0) return -1;
			var S = Math.sqrt(U),
				E = (-h + S) / (2 * C),
				x = (-h - S) / (2 * C);
			if (E >= 0 && E <= 1) return E;
			else if (x >= 0 && x <= 1) return x;
			else return -1
		}

		function g(H) {
			var A, W, Z;
			H.qm = H.Le[0];
			H.awC = H.Le[1];
			H.HN = [];
			var B = H.HN;
			B.push(new t(0, 0, 0, 0, 0));
			for (A = 0; A < H.tU; A++) {
				W = H.Le[A << 1] - H.qm;
				Z = H.Le[(A << 1) + 1] - H.awC;
				B.push(new t(B[A].x + W, B[A].y + Z, B[A].S$ + W * Z, B[A].zy + W * W, B[A].tq + Z * Z))
			}
		}

		function Y(H) {
			var hZ = H.tU,
				W = H.Le,
				Z, B = new Array(hZ),
				a = new Array(hZ),
				m = new Array(4),
				p, c, v, i, z, P, C, h, L, U, S, A, E, x, K, u, bC, O, $ = 0;
			H.aD = new Array(hZ);
			for (A = hZ - 1; A >= 0; A--) {
				if (W[A << 1] != W[$ << 1] && W[(A << 1) + 1] != W[($ << 1) + 1]) $ = A + 1;
				a[A] = $
			}
			for (A = hZ - 1; A >= 0; A--) {
				var gX = I(A + 1, hZ) << 1;
				m[0] = m[1] = m[2] = m[3] = 0;
				Z = (3 + 3 * (W[gX] - W[A << 1]) + (W[gX + 1] - W[(A << 1) + 1])) / 2;
				m[Z]++;
				p = 0;
				c = 0;
				v = 0;
				i = 0;
				$ = a[A];
				x = A;
				while (1) {
					S = 0;
					Z = (3 + 3 * Math.sign(W[$ * 2] - W[x * 2]) + Math.sign(W[$ * 2 + 1] - W[x * 2 + 1])) / 2;
					m[Z]++;
					if (m[0] && m[1] && m[2] && m[3]) {
						B[A] = x;
						S = 1;
						break
					}
					L = W[$ * 2] - W[A * 2];
					U = W[$ * 2 + 1] - W[A * 2 + 1];
					if (y(p, c, L, U) < 0 || y(v, i, L, U) > 0) {
						break
					}
					if (Math.abs(L) <= 1 && Math.abs(U) <= 1) {} else {
						z = L + (U >= 0 && (U > 0 || L < 0) ? 1 : -1);
						P = U + (L <= 0 && (L < 0 || U < 0) ? 1 : -1);
						if (y(p, c, z, P) >= 0) {
							p = z;
							c = P
						}
						z = L + (U <= 0 && (U < 0 || L < 0) ? 1 : -1);
						P = U + (L >= 0 && (L > 0 || U < 0) ? 1 : -1);
						if (y(v, i, z, P) <= 0) {
							v = z;
							i = P
						}
					}
					x = $;
					$ = a[x];
					if (!M($, A, x)) {
						break
					}
				}
				if (S == 0) {
					C = Math.sign(W[$ * 2] - W[x * 2]);
					h = Math.sign(W[$ * 2 + 1] - W[x * 2 + 1]);
					L = W[x * 2] - W[A * 2];
					U = W[x * 2 + 1] - W[A * 2 + 1];
					K = y(p, c, L, U);
					u = y(p, c, C, h);
					bC = y(v, i, L, U);
					O = y(v, i, C, h);
					E = 1e7;
					if (u < 0) {
						E = Math.floor(K / -u)
					}
					if (O > 0) {
						E = Math.min(E, Math.floor(-bC / O))
					}
					B[A] = I(x + E, hZ)
				}
			}
			E = B[hZ - 1];
			H.aD[hZ - 1] = E;
			for (A = hZ - 2; A >= 0; A--) {
				if (M(A + 1, B[A], E)) {
					E = B[A]
				}
				H.aD[A] = E
			}
			for (A = hZ - 1; M(I(A + 1, hZ), E, H.aD[A]); A--) {
				H.aD[A] = E
			}
		}

		function k(H) {
			function W(H, A, Z) {
				var hZ = H.tU,
					L = H.Le,
					U = H.HN,
					S, E, x, K, u, a, bC, O, h, $, gX, _, jI, iw, hn = 0;
				if (Z >= hZ) {
					Z -= hZ;
					hn = 1
				}
				if (hn == 0) {
					S = U[Z + 1].x - U[A].x;
					E = U[Z + 1].y - U[A].y;
					K = U[Z + 1].zy - U[A].zy;
					x = U[Z + 1].S$ - U[A].S$;
					u = U[Z + 1].tq - U[A].tq;
					a = Z + 1 - A
				} else {
					S = U[Z + 1].x - U[A].x + U[hZ].x;
					E = U[Z + 1].y - U[A].y + U[hZ].y;
					K = U[Z + 1].zy - U[A].zy + U[hZ].zy;
					x = U[Z + 1].S$ - U[A].S$ + U[hZ].S$;
					u = U[Z + 1].tq - U[A].tq + U[hZ].tq;
					a = Z + 1 - A + hZ
				}
				gX = (L[A << 1] + L[Z << 1]) / 2 - L[0];
				_ = (L[(A << 1) + 1] + L[(Z << 1) + 1]) / 2 - L[1];
				iw = L[Z << 1] - L[A << 1];
				jI = -(L[(Z << 1) + 1] - L[(A << 1) + 1]);
				bC = (K - 2 * S * gX) / a + gX * gX;
				O = (x - S * _ - E * gX) / a + gX * _;
				h = (u - 2 * E * _) / a + _ * _;
				$ = jI * jI * bC + 2 * jI * iw * O + iw * iw * h;
				return Math.sqrt($)
			}
			var A, Z, B, a, hZ = H.tU,
				m = new Array(hZ + 1),
				p = new Array(hZ + 1),
				c = new Array(hZ),
				v = new Array(hZ + 1),
				i = new Array(hZ + 1),
				z = new Array(hZ + 1),
				P, C, h;
			for (A = 0; A < hZ; A++) {
				h = I(H.aD[I(A - 1, hZ)] - 1, hZ);
				if (h == A) {
					h = I(A + 1, hZ)
				}
				if (h < A) {
					c[A] = hZ
				} else {
					c[A] = h
				}
			}
			Z = 1;
			for (A = 0; A < hZ; A++) {
				while (Z <= c[A]) {
					v[Z] = A;
					Z++
				}
			}
			A = 0;
			for (Z = 0; A < hZ; Z++) {
				i[Z] = A;
				A = c[A]
			}
			i[Z] = hZ;
			B = Z;
			A = hZ;
			for (Z = B; Z > 0; Z--) {
				z[Z] = A;
				A = v[A]
			}
			z[0] = 0;
			m[0] = 0;
			for (Z = 1; Z <= B; Z++) {
				for (A = z[Z]; A <= i[Z]; A++) {
					C = -1;
					for (a = i[Z - 1]; a >= v[A]; a--) {
						P = W(H, a, A) + m[a];
						if (C < 0 || P < C) {
							p[A] = a;
							C = P
						}
					}
					m[A] = C
				}
			}
			H.ayo = B;
			H.a1A = new Array(B);
			for (A = hZ, Z = B - 1; A > 0; Z--) {
				A = p[A];
				H.a1A[Z] = A
			}
		}

		function F(H) {
			function W(H, A, P, c, v, jq) {
				var hZ = H.tU,
					iv = H.HN,
					kq = 0,
					h;
				while (P >= hZ) {
					P -= hZ;
					kq += 1
				}
				while (A >= hZ) {
					A -= hZ;
					kq -= 1
				}
				while (P < 0) {
					P += hZ;
					kq -= 1
				}
				while (A < 0) {
					A += hZ;
					kq += 1
				}
				var eE = iv[P + 1].x - iv[A].x + kq * iv[hZ].x,
					e8 = iv[P + 1].y - iv[A].y + kq * iv[hZ].y,
					aI = iv[P + 1].zy - iv[A].zy + kq * iv[hZ].zy,
					dK = iv[P + 1].S$ - iv[A].S$ + kq * iv[hZ].S$,
					jC = iv[P + 1].tq - iv[A].tq + kq * iv[hZ].tq,
					C = P + 1 - A + kq * hZ;
				c[jq] = eE / C;
				c[jq + 1] = e8 / C;
				var d7 = (aI - eE * eE / C) / C,
					ka = (dK - eE * e8 / C) / C,
					hS = (jC - e8 * e8 / C) / C,
					eH = (d7 + hS + Math.sqrt((d7 - hS) * (d7 - hS) + 4 * ka * ka)) / 2;
				d7 -= eH;
				hS -= eH;
				if (Math.abs(d7) >= Math.abs(hS)) {
					h = Math.sqrt(d7 * d7 + ka * ka);
					if (h != 0) {
						v[jq] = -ka / h;
						v[jq + 1] = d7 / h
					}
				} else {
					h = Math.sqrt(hS * hS + ka * ka);
					if (h != 0) {
						v[jq] = -hS / h;
						v[jq + 1] = ka / h
					}
				}
				if (h == 0) {
					v[jq] = v[jq + 1] = 0
				}
			}
			var Z = H.ayo,
				B = H.a1A,
				hZ = H.tU,
				a = H.Le,
				m = H.qm,
				p = H.awC,
				c = new Array(Z * 2),
				v = new Array(Z * 2),
				i = new Array(Z),
				z = new Array(3),
				A, P, C, h, E, x, K, u, bC, O, $;
			H.x0 = new d(Z);
			for (A = 0; A < Z; A++) {
				P = B[I(A + 1, Z)];
				P = I(P - B[A], hZ) + B[A];
				c[A << 1] = 0;
				c[(A << 1) + 1] = 0;
				v[A << 1] = 0;
				v[(A << 1) + 1] = 0;
				W(H, B[A], P, c, v, A << 1)
			}
			for (A = 0; A < Z; A++) {
				i[A] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
				var L = v[A << 1] * v[A << 1] + v[(A << 1) + 1] * v[(A << 1) + 1],
					U = 1 / L;
				if (L != 0) {
					z[0] = v[(A << 1) + 1];
					z[1] = -v[A << 1];
					z[2] = -z[1] * c[(A << 1) + 1] - z[0] * c[A << 1];
					for (h = 0; h < 3; h++) {
						i[A][h * 3 + 0] = z[h] * z[0] * U;
						i[A][h * 3 + 1] = z[h] * z[1] * U;
						i[A][h * 3 + 2] = z[h] * z[2] * U
					}
				}
			}
			var S = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			for (A = 0; A < Z; A++) {
				S[0] = S[1] = S[2] = S[3] = S[4] = S[5] = S[6] = S[7] = S[8] = S[9] = 0;
				var gX = a[B[A] << 1] - m,
					_ = a[(B[A] << 1) + 1] - p,
					jI = 0,
					iw = 0;
				P = I(A - 1, Z);
				for (h = 0; h < 9; h += 3) {
					S[h + 0] = i[P][h + 0] + i[A][h + 0];
					S[h + 1] = i[P][h + 1] + i[A][h + 1];
					S[h + 2] = i[P][h + 2] + i[A][h + 2]
				}
				while (1) {
					var hn = S[0] * S[4] - S[1] * S[3];
					if (hn != 0) {
						jI = (-S[2] * S[4] + S[5] * S[0]) / hn;
						iw = (S[2] * S[3] - S[5] * S[0]) / hn;
						break
					}
					if (S[0] > S[4]) {
						z[0] = -S[1];
						z[1] = S[0]
					} else if (S[4]) {
						z[0] = -S[4];
						z[1] = S[3]
					} else {
						z[0] = 1;
						z[1] = 0
					}
					var L = z[0] * z[0] + z[1] * z[1],
						U = 1 / L;
					z[2] = -z[1] * _ - z[0] * gX;
					for (h = 0; h < 3; h++) {
						S[h * 3 + 0] += z[h] * z[0] * U;
						S[h * 3 + 1] += z[h] * z[1] * U;
						S[h * 3 + 2] += z[h] * z[2] * U
					}
				}
				E = Math.abs(jI - gX);
				x = Math.abs(iw - _);
				if (E <= .5 && x <= .5) {
					H.x0.sx[A << 1] = jI + m;
					H.x0.sx[(A << 1) + 1] = iw + p;
					continue
				}
				K = R(S, gX, _);
				bC = gX;
				O = _;
				if (S[0] != 0) {
					for ($ = 0; $ < 2; $++) {
						iw = _ - .5 + $;
						jI = -(S[1] * iw + S[2]) / S[0];
						E = Math.abs(jI - gX);
						u = R(S, jI, iw);
						if (E <= .5 && u < K) {
							K = u;
							bC = jI;
							O = iw
						}
					}
				}
				if (S[4] != 0) {
					for ($ = 0; $ < 2; $++) {
						jI = gX - .5 + $;
						iw = -(S[3] * jI + S[5]) / S[4];
						x = Math.abs(iw - _);
						u = R(S, jI, iw);
						if (x <= .5 && u < K) {
							K = u;
							bC = jI;
							O = iw
						}
					}
				}
				for (h = 0; h < 2; h++) {
					for (C = 0; C < 2; C++) {
						jI = gX - .5 + h;
						iw = _ - .5 + C;
						u = R(S, jI, iw);
						if (u < K) {
							K = u;
							bC = jI;
							O = iw
						}
					}
				}
				H.x0.sx[A << 1] = bC + m;
				H.x0.sx[(A << 1) + 1] = O + p
			}
		}

		function D(H) {
			var W = H.x0.r4,
				Z = H.x0,
				A, B, a, m, p, c, v, i, z;
			for (A = 0; A < W; A++) {
				B = I(A + 1, W);
				a = I(A + 2, W);
				var P = Z.sx[A << 1],
					C = Z.sx[(A << 1) + 1],
					h = Z.sx[a << 1],
					L = Z.sx[(a << 1) + 1],
					U = Z.sx[B << 1],
					S = Z.sx[(B << 1) + 1],
					E = J(.5, h, U),
					x = J(.5, L, S);
				p = n(P, C, h, L);
				if (p != 0) {
					m = y(U - P, S - C, h - P, L - C) / p;
					m = Math.abs(m);
					c = m > 1 ? 1 - 1 / m : 0;
					c = c * (1 / .75)
				} else {
					c = 4 / 3
				}
				Z.Os[B] = c;
				var K = 3 * B << 1;
				if (c >= Q.aaI) {
					Z._K[B] = 0;
					Z.S5[K + 0] = Z.S5[K + 1] = 0;
					Z.S5[K + 2] = U;
					Z.S5[K + 3] = S;
					Z.S5[K + 4] = E;
					Z.S5[K + 5] = x
				} else {
					if (c < .55) {
						c = .55
					} else if (c > 1) {
						c = 1
					}
					var u = .5 + .5 * c;
					Z._K[B] = 1;
					Z.S5[K] = J(u, P, U);
					Z.S5[K + 1] = J(u, C, S);
					Z.S5[K + 2] = J(u, h, U);
					Z.S5[K + 3] = J(u, L, S);
					Z.S5[K + 4] = E;
					Z.S5[K + 5] = x
				}
				Z.alpha[B] = c;
				Z.kq[B] = .5
			}
			Z.abq = 1
		}

		function q(H) {
			function W() {
				this.te = 0;
				this.fY = 0;
				this.jT = 0;
				this.g$ = 0;
				this.Matrix2D = 0;
				this.sA = 0;
				this.Lm = 0;
				this.alpha = 0
			}

			function Z(H, A, P, gq, hb, bC, O) {
				var a = H.x0.r4,
					ex = H.x0.S5,
					fs = H.x0.sx;
				if (A == P) return 1;
				var f_ = A,
					U = I(A + 1, a),
					bD = I(f_ + 1, a),
					dK = fs[A << 1],
					jC = fs[(A << 1) + 1],
					ae = fs[U << 1],
					em = fs[(U << 1) + 1],
					dY = bC[bD];
				if (dY == 0) return 1;
				var f7 = r(dK - ae, jC - em);
				for (f_ = bD; f_ != P; f_ = bD) {
					var bD = I(f_ + 1, a),
						bM = I(f_ + 2, a),
						iP = fs[bD << 1],
						jp = fs[(bD << 1) + 1],
						hG = fs[bM << 1],
						hf = fs[(bM << 1) + 1];
					if (bC[bD] != dY) return 1;
					if (Math.sign(y(ae - dK, em - jC, hG - iP, hf - jp)) != dY) return 1;
					if (e(ae - dK, em - jC, hG - iP, hf - jp) < f7 * r(iP - hG, jp - hf) * -.999847695156) return 1
				}
				var d2 = I(A, a) * 3 + 2 << 1,
					gu = I(A + 1, a) << 1,
					jt = I(P, a) << 1,
					ip = I(P, a) * 3 + 2 << 1,
					jq = ex[d2],
					iv = ex[d2 + 1],
					aQ = fs[gu],
					iL = fs[gu + 1],
					jx = fs[jt],
					ep = fs[jt + 1],
					gz = ex[ip],
					ed = ex[ip + 1],
					$ = fs[0],
					gX = fs[1];
				d2 = P * 3 + 2 << 1;
				var bo = ex[d2],
					d0 = ex[d2 + 1],
					S = O[P] - O[A];
				S -= y(bo - $, d0 - gX, bo - $, d0 - gX) / 2;
				if (A >= P) {
					S += O[a]
				}
				var c0 = aQ - jq,
					cv = iL - iv,
					iH = jx - jq,
					bS = ep - iv,
					gg = gz - jq,
					bG = ed - iv,
					jj = y(c0, cv, iH, bS),
					ay = y(c0, cv, gg, bG),
					cH = y(iH, bS, gg, bG),
					e6 = jj + cH - ay;
				if (ay == jj) return 1;
				var u = cH / (cH - e6),
					K = ay / (ay - jj),
					fi = ay * u / 2;
				if (fi == 0) return 1;
				var et = S / fi,
					E = 2 - Math.sqrt(4 - et / .3);
				gq.fY = J(u * E, jq, aQ);
				gq.jT = J(u * E, iv, iL);
				gq.g$ = J(K * E, gz, jx);
				gq.Matrix2D = J(K * E, ed, ep);
				gq.alpha = E;
				gq.sA = u;
				gq.Lm = K;
				aQ = gq.fY;
				iL = gq.jT;
				jx = gq.g$;
				ep = gq.Matrix2D;
				gq.te = 0;
				for (f_ = I(A + 1, a); f_ != P; f_ = bD) {
					bD = I(f_ + 1, a);
					var aD = fs[f_ << 1],
						c7 = fs[(f_ << 1) + 1],
						iP = fs[bD << 1],
						jp = fs[(bD << 1) + 1];
					u = j(aQ - jq, iL - iv, jx - aQ, ep - iL, gz - jx, ed - ep, iP - aD, jp - c7);
					if (u < -.5) return 1;
					var ga = T(u, jq, aQ, jx, gz),
						cY = T(u, iv, iL, ep, ed),
						f7 = r(iP - aD, jp - c7);
					if (f7 == 0) return 1;
					var i4 = y(iP - aD, jp - c7, ga - aD, cY - c7) / f7;
					if (Math.abs(i4) > hb) return 1;
					if (e(iP - aD, jp - c7, ga - aD, cY - c7) < 0 || e(aD - iP, c7 - jp, ga - iP, cY - jp) < 0) {
						return 1
					}
					gq.te += i4 * i4
				}
				for (f_ = A; f_ != P; f_ = bD) {
					bD = I(f_ + 1, a);
					var d2 = f_ * 3 + 2 << 1,
						gu = bD * 3 + 2 << 1,
						jS = ex[d2],
						e7 = ex[d2 + 1],
						ct = ex[gu],
						bj = ex[gu + 1];
					u = j(aQ - jq, iL - iv, jx - aQ, ep - iL, gz - jx, ed - ep, ct - jS, bj - e7);
					if (u < -.5) return 1;
					var ga = T(u, jq, aQ, jx, gz),
						cY = T(u, iv, iL, ep, ed),
						f7 = r(ct - jS, bj - e7);
					if (f7 == 0) return 1;
					var i4 = y(ct - jS, bj - e7, ga - jS, cY - e7) / f7,
						jo = y(ct - jS, bj - e7, fs[bD << 1] - jS, fs[(bD << 1) + 1] - e7) / f7;
					jo *= .75 * H.x0.alpha[bD];
					if (jo < 0) {
						i4 = -i4;
						jo = -jo
					}
					if (i4 < jo - hb) return 1;
					if (i4 < jo) {
						gq.te += (i4 - jo) * (i4 - jo)
					}
				}
				return 0
			}
			var B = H.x0,
				a = B.r4,
				m = B.sx,
				p = new Array(a + 1),
				c = new Array(a + 1),
				v = new Array(a + 1),
				i = new Array(a + 1),
				z, A, P, C, h = new W,
				L, U, S, E, x, K, u, bC = new Array(a),
				O = new Array(a + 1);
			for (A = 0; A < a; A++) {
				if (B._K[A] == "CURVE") {
					var $ = m[I(A - 1, a) << 1],
						gX = m[(I(A - 1, a) << 1) + 1],
						_ = m[A << 1],
						jI = m[(A << 1) + 1],
						iw = m[I(A + 1, a) << 1],
						hn = m[(I(A + 1, a) << 1) + 1];
					bC[A] = Math.sign(y(_ - $, jI - gX, iw - _, hn - jI))
				} else {
					bC[A] = 0
				}
			}
			S = 0;
			O[0] = 0;
			var jq = B.sx[0],
				iv = B.sx[1];
			for (A = 0; A < a; A++) {
				U = I(A + 1, a);
				if (B._K[U] == "CURVE") {
					E = B.alpha[U];
					var kq = A * 3 + 2 << 1,
						eE = U * 3 + 2 << 1,
						e8 = B.S5[kq],
						aI = B.S5[kq + 1],
						dK = m[U << 1],
						jC = m[(U << 1) + 1],
						d7 = B.S5[eE],
						ka = B.S5[eE + 1];
					S += .3 * E * (4 - E) * y(dK - e8, jC - aI, d7 - e8, ka - aI) / 2;
					S += y(e8 - jq, aI - iv, d7 - jq, ka - iv) / 2
				}
				O[A + 1] = S
			}
			p[0] = -1;
			c[0] = 0;
			v[0] = 0;
			for (P = 1; P <= a; P++) {
				p[P] = P - 1;
				c[P] = c[P - 1];
				v[P] = v[P - 1] + 1;
				for (A = P - 2; A >= 0; A--) {
					C = Z(H, A, I(P, a), h, Q.a4Z, bC, O);
					if (C) {
						break
					}
					if (v[P] > v[A] + 1 || v[P] == v[A] + 1 && c[P] > c[A] + h.te) {
						p[P] = A;
						c[P] = c[A] + h.te;
						v[P] = v[A] + 1;
						i[P] = h;
						h = new W
					}
				}
			}
			z = v[a];
			x = new d(z);
			K = new Array(z);
			u = new Array(z);
			P = a;
			for (A = z - 1; A >= 0; A--) {
				var hS = I(P, a),
					eH = A * 3 + 0 << 1,
					kA = hS * 3 + 0 << 1;
				if (p[P] == P - 1) {
					x._K[A] = B._K[hS];
					x.S5[eH] = B.S5[kA];
					x.S5[eH + 1] = B.S5[kA + 1];
					x.S5[eH + 2] = B.S5[kA + 2];
					x.S5[eH + 3] = B.S5[kA + 3];
					x.S5[eH + 4] = B.S5[kA + 4];
					x.S5[eH + 5] = B.S5[kA + 5];
					x.sx[A << 1] = B.sx[hS << 1];
					x.sx[(A << 1) + 1] = B.sx[(hS << 1) + 1];
					x.alpha[A] = B.alpha[hS];
					x.Os[A] = B.Os[hS];
					x.kq[A] = B.kq[hS];
					K[A] = u[A] = 1
				} else {
					x._K[A] = "CURVE";
					x.S5[eH] = i[P].fY;
					x.S5[eH + 1] = i[P].jT;
					x.S5[eH + 2] = i[P].g$;
					x.S5[eH + 3] = i[P].Matrix2D;
					x.S5[eH + 4] = B.S5[kA + 4];
					x.S5[eH + 5] = B.S5[kA + 5];
					x.sx[A << 1] = J(i[P].Lm, B.S5[kA + 4], m[hS << 1]);
					x.sx[(A << 1) + 1] = J(i[P].Lm, B.S5[kA + 5], m[(hS << 1) + 1]);
					x.alpha[A] = i[P].alpha;
					x.Os[A] = i[P].alpha;
					K[A] = i[P].Lm;
					u[A] = i[P].sA
				}
				P = p[P]
			}
			for (A = 0; A < z; A++) {
				U = I(A + 1, z);
				x.kq[A] = K[A] / (K[A] + u[U])
			}
			x.abq = 1;
			H.x0 = x
		}
		for (var A = 0; A < V.length; A++) {
			var H = V[A];
			g(H);
			Y(H);
			k(H);
			F(H);
			D(H);
			if (Q.a89) q(H)
		}
	}
	return {
		aax: G,
		az_: b
	}
}();
// j0.traceContours — extract closed paths from binary mask (marching squares + simplification)
j0.Hu = function(l, d, G, b) {
	var V = {
			K7: "minority",
			a9o: b,
			a89: !0,
			aaI: 1,
			a4Z: .2
		},
		Q = j0.aax(l, d, G, V);
	j0.az_(Q, V);
	return Q
};

// j0.contoursToPaths — convert internal contour records → SVG-style path { F, C }
j0.LW = function(l) {
	var d = [];
	for (var A = 0; A < l.length; A++) {
		var G = l[A],
			b = G.x0,
			V = ["M"],
			Q = [b.S5[(b.r4 - 1) * 6 + 4], b.S5[(b.r4 - 1) * 6 + 5]];
		for (var t = 0; t < b.r4; t++) {
			var I = t * 6;
			if (b._K[t] == 1) {
				V.push("C");
				for (var y = 0; y < 6; y++) Q.push(b.S5[I + y])
			} else if (b._K[t] == 0) {
				V.push("L");
				for (var y = 2; y < 4; y++) Q.push(b.S5[I + y])
			}
		}
		V.push("Z");
		d.push({
			parent: G.parent,
			color: G.color,
			path: {
				C: Q,
				F: V
			}
		})
	}
	return d
};

// j0.pointInPolygon — ray-casting point-in-polygon test
j0._S = function(l, d, G) {
	var hZ = l.length >> 1,
		b, V = l[2 * hZ - 3] - G,
		Q = l[2 * hZ - 2] - d,
		t = l[2 * hZ - 1] - G,
		I = t > V,
		y = 0;
	for (var A = 0; A < hZ; A++) {
		b = Q;
		V = t;
		Q = l[2 * A] - d;
		t = l[2 * A + 1] - G;
		if (V == t) continue;
		I = t > V
	}
	for (var A = 0; A < hZ; A++) {
		b = Q;
		V = t;
		Q = l[2 * A] - d;
		t = l[2 * A + 1] - G;
		if (V < 0 && t < 0) continue;
		if (V > 0 && t > 0) continue;
		if (b < 0 && Q < 0) continue;
		if (V == t && Math.min(b, Q) <= 0) return !0;
		if (V == t) continue;
		var e = b + (Q - b) * -V / (t - V);
		if (e == 0) return !0;
		if (e > 0) y++;
		if (V == 0 && I && t > V) y--;
		if (V == 0 && !I && t < V) y--;
		I = t > V
	}
	return (y & 1) == 1
};

// j0.fillPolygon — scanline fill polygon into raster mask
j0.fill = function(l, d, G, b) {
	var V = d[l],
		Q = [l],
		t = 0;
	while (t < Q.length) {
		var I = Q[t];
		t++;
		d[I] = b;
		if (d[I - G] == V) {
			Q.push(I - G);
			d[I - G] = 254
		}
		if (d[I - 1] == V) {
			Q.push(I - 1);
			d[I - 1] = 254
		}
		if (d[I + 1] == V) {
			Q.push(I + 1);
			d[I + 1] = 254
		}
		if (d[I + G] == V) {
			Q.push(I + G);
			d[I + G] = 254
		}
	}
};

var cL = function() {
	function l(I) {
		return Math.max(0, Math.min(1, I))
	}

	function d(I, y) {
		var e = y < 0 ? -y : y;
		if (I > 1) I = .99;
		I = I * .99;
		var R = Math.pow(e / 5, .16),
			J = Math.pow(2, e < 1 ? e : 1 + (e - 1) * .8);
		if (y < 0) J = 1 / J;
		I = R * (1 - Math.pow(1 - I, J)) + (1 - R) * I;
		return I
	}

	function G(I, y) {
		var e = y / 100;
		I = I * .99;
		I = e * (.5 - .5 * Math.cos(I * Math.PI)) + (1 - e) * I;
		return I
	}
	var b = PixelUtil.mat4.aoE(1, 1, 1, -.3),
		V = PixelUtil.mat4.hI(b);

	function Q(I, y, e, M, R, J, n) {
		var r = I[e],
			T = I[e + 1],
			j = I[e + 2],
			g = PixelUtil.mat4.Uz(b, [r, T, j, 1]);
		r = g[0];
		T = g[1];
		j = g[2];
		r = d(r, M);
		T = d(T, M);
		j = d(j, M);
		var g = PixelUtil.mat4.Uz(V, [r, T, j, 1]);
		r = g[0];
		T = g[1];
		j = g[2];
		r = l(r);
		T = l(T);
		j = l(j);
		r = G(r, R);
		T = G(T, R);
		j = G(j, R);
		var Y = hX.a7m(r, T, j, J);
		r = Y[0];
		T = Y[1];
		j = Y[2];
		r = l(r);
		T = l(T);
		j = l(j);
		if (n) {
			var k = new Uint8Array(4);
			k[0] = ~~(.5 + r * 255);
			k[1] = ~~(.5 + T * 255);
			k[2] = ~~(.5 + j * 255);
			LayerEffectsHelper.Qz(n, k, k, new Rect(0, 0, 1, 1));
			r = k[0] / 255;
			T = k[1] / 255;
			j = k[2] / 255
		}
		y[e] = r;
		y[e + 1] = T;
		y[e + 2] = j
	}

	function t(I, y, e, M, R, J) {
		var n = R.Temp ? R.Temp.v : 0,
			r = R.Tint ? R.Tint.v : 0,
			T = R.Ex12 ? R.Ex12.v : 0,
			j = R.Cr12 ? R.Cr12.v : 0,
			g = R.Vibr ? R.Vibr.v : 0,
			Y = R.Strt ? R.Strt.v : 0,
			k = hX.eP(n, r),
			F = null;
		T += k.a8H;
		if (g != 0 || Y != 0) F = LayerEffectsHelper.buildEffect("vibA", {
			Strt: R.Strt,
			vibrance: R.Vibr
		});
		console.log(F);
		var D = Date.now();
		if (J) {
			var q = Math.pow(2, T),
				H = I.length;
			T = 0;
			var W = new Float32Array(4e3);
			for (var A = 0; A < 4e3; A++) {
				var Z = A * (1 / 1e3);
				Z = PixelUtil.srgbToLinear(Z);
				Z *= q;
				Z = PixelUtil.linearToSrgb(Z);
				Z = l(Z);
				W[A] = Z
			}
			for (var A = 0; A < H; A += 3) {
				M[A] = W[~~(I[A] * 1e3)];
				M[A + 1] = W[~~(I[A + 1] * 1e3)];
				M[A + 2] = W[~~(I[A + 2] * 1e3)]
			}
			console.log(Date.now() - D, "Exposure normalizing");
			D = Date.now()
		} else M.set(I);
		if (T != 0 || j != 0 || n != 0 || r != 0 || F) {
			var B = 17,
				a = 1 / (B - 1),
				m = B * B * B,
				p = new Array(m * 3);
			for (var c = 0; c < B; c++)
				for (var v = 0; v < B; v++)
					for (var i = 0; i < B; i++) {
						var A = c * B * B + v * B + i,
							z = A * 3;
						p[z] = c * a;
						p[z + 1] = v * a;
						p[z + 2] = i * a
					}
			for (var A = 0; A < m; A++) Q(p, p, A * 3, T, j, k, F);
			console.log(Date.now() - D, "making LUT");
			D = Date.now();
			ICC.U.applyLUTFloat(p, B, M, M);
			console.log(Date.now() - D, "applying LUT");
			D = Date.now()
		}
	}
	return t
}();

// d3 - BrushResource (.abr brush presets resource handler)
function d3() {}
// BrushResource.importFromBuffer — parse .abr v6+ → { BF samples, yO patterns, list descriptors }
d3.Cd = function(l) {
	var d = new Uint8Array(l),
		G = 0,
		b = {
			BF: [],
			yO: [],
			list: []
		},
		V = X.TD(d, G);
	G += 2;
	if (V <= 2) {
		return d3.aaE(d)
	}
	var Q = X.TD(d, G);
	G += 2;
	var t = X.Ko(d, G, 8);
	G += 8;
	var I = X.q(d, G);
	G += 4;
	if (I > 0) b.BF = d3.Vs(d, G, I, Q, V);
	G += I;
	var y = X.Ko(d, G, 8);
	G += 8;
	var e = X.q(d, G);
	G += 4;
	if (e > 0) b.yO = fv.V_(d, G, e);
	G += e;
	var M = X.Ko(d, G, 8);
	G += 8;
	var R = X.q(d, G);
	G += 4;
	if (R > 0) {
		var J = {};
		jO.V$(d, J, G + 4);
		b.list = J.Brsh.v
	}
	G += R;
	var n = b.list;
	for (var A = 0; A < n.length; A++) {
		es.HW.check(n[A].v)
	}
	return b
};

// BrushResource.setName — rename brush descriptor (Nm field)
d3.Pl = function(l, d) {
	l.v.Nm.v = d
};

// BrushResource.importLegacy — parse .abr v2 sample list format
d3.aaE = function(l) {
	var d = {
			BF: [],
			yO: [],
			list: []
		},
		G = 0,
		b = X.TD(l, G);
	G += 2;
	var V = X.TD(l, G);
	G += 2;
	for (var A = 0; A < V; A++) {
		var Q = X.TD(l, G);
		G += 2;
		var t = X.q(l, G);
		G += 4;
		var I = G;
		if (Q == 2) {
			var y = {};
			d.BF.push(y);
			var e = X.q(l, I);
			I += 4;
			var M = X.TD(l, I);
			I += 2;
			if (b == 2) {
				var R = X.zf(l, I);
				I += 4 + R.length * 2 + 2
			}
			y.id = PsdDocument.Xb() + "-d71c-11e5-b1ae-a548a96e5f9f";
			I++;
			I += 8;
			y.vD = X.NK(l, I);
			I += 16;
			var J = X.TD(l, I);
			I += 2;
			var n = l[I];
			I++;
			var r = db.c7(!1, J, l, y.vD.m, y.vD.n, I, n);
			d3.wE(y, r);
			var T = es._k(y.id),
				j = T.Brsh.v;
			j.Dmtr.v.val = y.vD.m;
			j.Spcn.v.val = M;
			d.list.push({
				t: "Objc",
				v: T
			})
		}
		G += t
	}
	return d
};

// BrushResource.exportToBuffer — brush set → .abr file bytes
d3.IN = function(l) {
	var d = new GrowableByteBuffer,
		G = 0,
		b = 0;
	X.pg(d, G, 6);
	G += 2;
	X.pg(d, G, 2);
	G += 2;
	X.zr(d, G, "8BIMsamp");
	G += 8;
	G += 4;
	b = G;
	G = d3.sD(d, G, l.BF);
	X._b(d, b - 4, G - b);
	X.zr(d, G, "8BIMpatt");
	G += 8;
	G += 4;
	b = G;
	G = fv.WQ(d, G, l.yO);
	X._b(d, b - 4, G - b);
	var V = {
		classID: "null",
		Brsh: {
			t: "VlLs",
			v: l.list
		}
	};
	X.zr(d, G, "8BIMdesc");
	G += 8;
	G += 4;
	b = G;
	X._b(d, G, 16);
	G += 4;
	G += jO.TH(d, V, G);
	X._b(d, b - 4, G - b);
	return d.data.slice(0, G).buffer
};

// BrushResource.parseSamples — read 8BIMsamp brush sample records
d3.Vs = function(l, d, G, b, V) {
	var Q = X.q,
		t = X.NK,
		I = d + G,
		y = [];
	while (d < I) {
		var e = {};
		y.push(e);
		var M = Q(l, d);
		d += 4;
		var R = d,
			J = X.Qh(l, d);
		d += J.length;
		e.id = J.ip;
		if (b == 1) {
			d += 9;
			e.vD = t(l, d);
			d += 16
		} else {
			d += 7;
			var n = Q(l, d);
			d += 4;
			e.vD = t(l, d);
			d += 16;
			var r = Q(l, d);
			d += 4;
			d += r * 4;
			var T = Q(l, d);
			d += 4;
			var j = Q(l, d);
			d += 4;
			var g = t(l, d);
			d += 16
		}
		var Y = X.TD(l, d);
		d += 2;
		var k = l[d];
		d += 1;
		var F = db.c7(!1, Y, l, e.vD.m, e.vD.n, d, k);
		d3.wE(e, F);
		if (M % 4 != 0) M += 4 - M % 4;
		d = R + M
	}
	return y
};

// BrushResource.attachSamplePixels — bind decoded tip pixels to brush entry
d3.wE = function(l, d) {
	var G = l.vD.clone();
	G.x = G.y = 0;
	l.Rj = [d, G]
};

// BrushResource.writeSamples — serialize sample records into .abr
d3.sD = function(l, d, G) {
	var b = X._b,
		V = X.ZE;
	for (var A = 0; A < G.length; A++) {
		var Q = G[A],
			t = d + 4,
			y = 56,
			M = 1;
		d += 4;
		X.OH(l, d, Q.id);
		d += Q.id.length + 2;
		l.ensureCapacity(d, 1);
		l.data[d] = 1;
		d += 3;
		b(l, d, 3);
		d += 4;
		var I = d;
		d += 4;
		V(l, d, Q.vD);
		d += 16;
		b(l, d, y);
		d += 4;
		d += y * 4;
		b(l, d - 4, 1);
		var e = d;
		d += 4;
		b(l, d, 8);
		d += 4;
		V(l, d, Q.vD);
		d += 16;
		X.pg(l, d, 8);
		d += 2;
		l.ensureCapacity(d, 1);
		l.data[d] = M;
		d++;
		var R = Q.Rj[0];
		l.ensureCapacity(d, Q.vD.O() * 2);
		d = db.hH(!1, R, l.data, Q.vD.m, Q.vD.n, d, M);
		l.ensureCapacity(d, 8);
		d += 8;
		var J = d - t;
		b(l, t - 4, J);
		b(l, I, J - 49);
		b(l, e, J - 305);
		if (J % 4 != 0) d += 4 - J % 4
	}
	return d
};


// cb - CurvesResource (.acv curves adjustment preset resource handler)
function cb() {}
// CurvesResource.importFromBuffer — parse .acv → curves adjustment descriptor
cb.Cd = function(l, d) {
	var G = new Uint8Array(l),
		b = [],
		V = 0,
		Q = X.TD(G, V);
	V += 2;
	if (Q != 4) {
		throw "Unknown version of curves: " + Q
	}
	var t = X.TD(G, V);
	V += 2;
	for (var A = 0; A < t; A++) {
		var I = cb.oN(G, V);
		V += 2 + 2 * I.length;
		b.push(I)
	}
	if (V != G.length) {
		var y = X.Ko(G, V, 4);
		V += 4;
		var e = X.TD(G, V);
		V += 2;
		var M = X.TD(G, V);
		V += 2;
		if (M != 0) throw "extra curves for channels"
	}
	var R = cb.EQ(b, 0);
	R.presetKind = {
		t: "long",
		v: 3
	};
	R.presetFileName = {
		t: "TEXT",
		v: d.split("/").pop().split(".")[0]
	};
	return [R]
};

// CurvesResource.readFromPsd — read curves data from PSD resource block
cb.nj = function(l, d, G) {
	var b = d,
		V = [],
		Q = l[d];
	d += 3;
	var t = X.q(l, d);
	d += 4;
	for (var A = 0; A < 4; A++) {
		var I = t >>> A & 1;
		if (I) {
			if (Q == 0) {
				var y = cb.oN(l, d);
				d += 2 + 2 * y.length
			} else {
				var y = cb.agt(l, d);
				d += 256
			}
			V.push(y)
		} else V.push(Q == 0 ? [0, 0, 255, 255] : cb.aoh())
	}
	var e = cb.EQ(V, Q);
	return e
};

// CurvesResource.buildDescriptor — channel curve arrays → ActionDescriptor
cb.EQ = function(l, d) {
	var G = FilterHelper.oT("curv");
	for (var A = 0; A < 4; A++) {
		if (d == 0) {
			var b = l[A],
				V = [];
			for (var Q = 0; Q < b.length; Q += 2) V.push(PixelUtil.presetThumb.yR(b[Q], b[Q + 1], !0));
			cb.fZ(G, A, V)
		} else cb.fZ(G, A, l[A])
	}
	return G
};

// CurvesResource.writeToPsd — curves descriptor → PSD resource bytes
cb.qJ = function(l, d, G) {
	var b = [];
	for (var A = 0; A < 4; A++) {
		var V = cb.RX(G, A);
		if (V.length == 256) b.push(V);
		else {
			var Q = [];
			for (var t = 0; t < V.length; t++) Q.push(V[t].v.Hrzn.v, V[t].v.Vrtc.v);
			b.push(Q)
		}
	}
	var I = d,
		y = b[0].length == 256 ? 1 : 0;
	l.ensureCapacity(d, 3);
	l.data[d] = y;
	l.data[d + 1] = 0;
	l.data[d + 2] = 1;
	d += 3;
	X._b(l, d, 15);
	d += 4;
	for (var A = 0; A < 4; A++) {
		var e = b[A];
		if (y == 0) {
			cb.a7g(l, d, e);
			d += 2 + 2 * e.length
		} else {
			cb.anq(l, d, e);
			d += 256
		}
	}
	return d - I
};

// CurvesResource.defaultCurve — flat 0–255 identity curve points
cb.aoh = function() {
	var l = [];
	for (var A = 0; A < 256; A++) l.push(A);
	return l
};

// CurvesResource.setChannelCurve — set curve points for channel index
cb.fZ = function(l, d, G) {
	var b = hg.M_("CrvA", d);
	if (G.length < 256) b.Crv = {
		t: "VlLs",
		v: G
	};
	else {
		b.Mpng = {
			t: "VlLs",
			v: []
		};
		for (var A = 0; A < 256; A++) b.Mpng.v[A] = {
			t: "long",
			v: G[A]
		}
	}
	b = {
		t: "Objc",
		v: b
	};
	var V = l.Adjs.v,
		Q = hg._o(V, d);
	if (Q == -1) V.push(b);
	else V[Q] = b
};

// CurvesResource.getChannelCurve — get curve points for channel index
cb.RX = function(l, d) {
	var G = l.Adjs.v,
		b = hg._o(G, d);
	if (b == -1) {
		if (G.length == 0 || G[0].v.Crv) return [PixelUtil.presetThumb.yR(0, 0, !0), PixelUtil.presetThumb.yR(255, 255, !0)];
		if (G[0].v.autoMachineLearning || G[0].v.AuCo) return [PixelUtil.presetThumb.yR(0, 0, !0), PixelUtil.presetThumb.yR(128, 160, !0), PixelUtil.presetThumb.yR(255, 255, !0)];
		var V = [];
		for (var A = 0; A < 256; A++) V.push(A);
		return V
	}
	var Q = G[b].v;
	if (Q.Crv) return Q.Crv.v;
	if (Q.Mpng) {
		var V = [];
		for (var A = 0; A < 256; A++) V.push(Q.Mpng.v[A].v);
		return V
	}
	return [PixelUtil.presetThumb.yR(0, 0, !0), PixelUtil.presetThumb.yR(255, 255, !0)]
};

// CurvesResource.readChannelName — read ASCII channel name from .acv
cb.oN = function(l, d) {
	var G = [],
		b = X.TD(l, d);
	d += 2;
	for (var V = 0; V < b; V++) {
		var Q = X.TD(l, d);
		d += 2;
		var t = X.TD(l, d);
		d += 2;
		G.push(t, Q)
	}
	return G
};

// CurvesResource.findChannelIndex — find channel by enum id
cb.a7g = function(l, d, G) {
	var b = G.length / 2;
	X.pg(l, d, b);
	d += 2;
	for (var V = 0; V < b; V++) {
		X.pg(l, d, G[V * 2 + 1]);
		d += 2;
		X.pg(l, d, G[V * 2 + 0]);
		d += 2
	}
};

// CurvesResource.makeChannelRef — build channel enum reference object
cb.agt = function(l, d) {
	var G = [];
	for (var A = 0; A < 256; A++) G.push(l[d + A]);
	return G
};

// CurvesResource.interpolateCurve — evaluate curve at input level
cb.anq = function(l, d, G) {
	l.ensureCapacity(d, 256);
	for (var A = 0; A < 256; A++) l.data[d + A] = G[A]
};


// d8 - HueSaturationHelper (hue2 adjustment preset binary codec)
function d8() {}
// HueSaturationHelper.readFromPsd — parse hue2 preset block → adjustment descriptor
d8.nj = function(l, d, G) {
	var b = {},
		V = X.TD(l, d);
	d += 2;
	b._s = l[d] == 1;
	d++;
	d++;
	b.O8 = [X.Ar(l, d), X.Ar(l, d + 2), X.Ar(l, d + 4)];
	d += 6;
	b.QV = [X.Ar(l, d), X.Ar(l, d + 2), X.Ar(l, d + 4)];
	d += 6;
	b.Vi = [];
	for (var A = 0; A < 6; A++) {
		var Q = {};
		Q.mE = [X.Ar(l, d), X.Ar(l, d + 2), X.Ar(l, d + 4), X.Ar(l, d + 6)];
		d += 8;
		Q.I3 = [X.Ar(l, d), X.Ar(l, d + 2), X.Ar(l, d + 4)];
		d += 6;
		b.Vi.push(Q)
	}
	var t = FilterHelper.oT("hue2"),
		I = b;
	if (t.Clrz == null) t.Clrz = {
		t: "bool",
		v: !1
	};
	t.Clrz.v = I._s;
	for (var A = 0; A < 7; A++) {
		var y = A == 0 ? I._s ? I.O8 : I.QV : I.Vi[A - 1];
		d8.fZ(t, A, y)
	}
	return t
};

// HueSaturationHelper.makeHslObject — [H,S,L] → Hst2 descriptor object
d8.axd = function(l) {
	return {
		classID: "Hst2",
		H: {
			t: "long",
			v: l[0]
		},
		Strt: {
			t: "long",
			v: l[1]
		},
		Lght: {
			t: "long",
			v: l[2]
		}
	}
};

// HueSaturationHelper.findAdjustmentIndex — find Adjs entry by channel/local id
d8._o = function(l, d) {
	for (var A = 0; A < l.length; A++) {
		var G = l[A].v.LclR;
		if (d == 0 && G == null || G != null && G.v == d) return A
	}
	return -1
};

// HueSaturationHelper.setAdjustment — write one hue/sat channel adjustment
d8.fZ = function(l, d, G) {
	var b = d == 0 ? G : G.I3,
		V = d8.axd(b);
	if (d != 0) {
		var Q = G.mE;
		V.LclR = {
			t: "long",
			v: d
		}, V.BgnR = {
			t: "long",
			v: Q[0]
		};
		V.BgnS = {
			t: "long",
			v: Q[1]
		};
		V.EndS = {
			t: "long",
			v: Q[2]
		};
		V.EndR = {
			t: "long",
			v: Q[3]
		}
	}
	V = {
		t: "Objc",
		v: V
	};
	var t = l.Adjs.v,
		I = d8._o(t, d);
	if (I == -1) t.push(V);
	else t[I] = V
};

// HueSaturationHelper.getAdjustment — read one hue/sat channel adjustment
d8.RX = function(l, d) {
	var G = l.Adjs.v,
		b = d8._o(G, d);
	if (b == -1) {
		if (d == 0) return [0, 0, 0];
		else return [{
			mE: [315, 345, 15, 45],
			I3: [0, 0, 0]
		}, {
			mE: [15, 45, 75, 105],
			I3: [0, 0, 0]
		}, {
			mE: [75, 105, 135, 165],
			I3: [0, 0, 0]
		}, {
			mE: [135, 165, 195, 225],
			I3: [0, 0, 0]
		}, {
			mE: [195, 225, 255, 285],
			I3: [0, 0, 0]
		}, {
			mE: [255, 285, 315, 345],
			I3: [0, 0, 0]
		}][d - 1]
	}
	var V = G[b].v,
		Q = [V.H.v, V.Strt.v, V.Lght.v];
	if (d == 0) return Q;
	return {
		I3: Q,
		mE: [V.BgnR.v, V.BgnS.v, V.EndS.v, V.EndR.v]
	}
};

// HueSaturationHelper.writeToPsd — hue2 descriptor → preset binary block
d8.qJ = function(l, d, G) {
	var b = {
		_s: G.Clrz ? G.Clrz.v : !1,
		Vi: []
	};
	b.O8 = b.QV = d8.RX(G, 0);
	for (var A = 1; A < 7; A++) b.Vi.push(d8.RX(G, A));
	var V = 2 + 2 + 12 + 6 * 14,
		Q = l.data;
	l.ensureCapacity(d, V);
	X.fh(Q, d, 2);
	d += 2;
	Q[d] = b._s ? 1 : 0;
	d++;
	d++;
	X.RD(Q, d + 0, b.O8[0]);
	X.RD(Q, d + 2, b.O8[1]);
	X.RD(Q, d + 4, b.O8[2]);
	d += 6;
	X.RD(Q, d + 0, b.QV[0]);
	X.RD(Q, d + 2, b.QV[1]);
	X.RD(Q, d + 4, b.QV[2]);
	d += 6;
	for (var A = 0; A < 6; A++) {
		var t = b.Vi[A].mE,
			I = b.Vi[A].I3;
		X.RD(Q, d + 0, t[0]);
		X.RD(Q, d + 2, t[1]);
		X.RD(Q, d + 4, t[2]);
		X.RD(Q, d + 6, t[3]);
		d += 8;
		X.RD(Q, d + 0, I[0]);
		X.RD(Q, d + 2, I[1]);
		X.RD(Q, d + 4, I[2]);
		d += 6
	}
	return V
};


// hg - LevelsResource (.alv levels adjustment preset resource handler)
function hg() {}
const LevelsResource = hg;

// LevelsResource.importFromBuffer — parse .alv → levels adjustment descriptor
hg.Cd = function(l) {
	var d = new Uint8Array(l),
		G = 2,
		b = [];
	for (var A = 0; A < 29; A++) {
		var V = [];
		b.push(V);
		for (var Q = 0; Q < 5; Q++) V.push(X.TD(d, G + A * 10 + Q * 2))
	}
	G += 29 * 10;
	if (G < d.length) {
		var t = X.Ko(d, G, 4);
		G += 4;
		var I = X.TD(d, G);
		G += 2;
		var y = X.TD(d, G);
		G += 2;
		var e = y - 29;
		for (var A = 0; A < e; A++) {
			var V = [];
			b.push(V);
			for (var Q = 0; Q < 5; Q++) V.push(X.TD(d, G + A * 10 + Q * 2))
		}
	}
	var M = FilterHelper.oT("levl");
	for (var A = 0; A < 4; A++) hg.fZ(M, A, b[A]);
	return M
};

// LevelsResource.makeChannelRef — build channel enum reference for levels
hg.M_ = function(l, A) {
	var d = ["Cmps", "Rd", "Grn", "Bl"],
		G = {
			t: "obj ",
			v: [{
				t: "Enmr",
				v: {
					classID: "Chnl",
					typeID: "Chnl",
					enum: d[A]
				}
			}]
		};
	return {
		classID: l,
		Chnl: G
	}
};

// LevelsResource.findChannelIndex — find channel entry by id
hg._o = function(l, d) {
	var G = {
		Cmps: 0,
		Rd: 1,
		Grn: 2,
		Bl: 3
	};
	for (var A = 0; A < l.length; A++) {
		var b = l[A].v,
			V = G[b.Chnl.v[0].v.enum];
		if (V == d) return A
	}
	return -1
};

// LevelsResource.setChannelLevels — set input/output/gamma for channel
hg.fZ = function(l, d, G) {
	var b = hg.M_("LvlA", d);
	b.Inpt = {
		t: "VlLs",
		v: [{
			t: "long",
			v: G[0]
		}, {
			t: "long",
			v: G[1]
		}]
	};
	b.Otpt = {
		t: "VlLs",
		v: [{
			t: "long",
			v: G[2]
		}, {
			t: "long",
			v: G[3]
		}]
	};
	b.Gmm = {
		t: "doub",
		v: G[4] / 100
	};
	b = {
		t: "Objc",
		v: b
	};
	var V = l.Adjs.v,
		Q = hg._o(V, d);
	if (Q == -1) V.push(b);
	else V[Q] = b
};

// LevelsResource.getChannelLevels — read [inBlack,inWhite,gamma,outBlack,outWhite] for channel
hg.RX = function(l, d) {
	var G = [0, 255, 0, 255, 100],
		b = l.Adjs.v,
		V = hg._o(b, d);
	if (V == -1) return G;
	var Q = b[V].v;
	if (Q.Inpt) {
		G[0] = Q.Inpt.v[0].v;
		G[1] = Q.Inpt.v[1].v
	}
	if (Q.Otpt) {
		G[2] = Q.Otpt.v[0].v;
		G[3] = Q.Otpt.v[1].v
	}
	if (Q.Gmm) {
		G[4] = Math.round(Q.Gmm.v * 100)
	}
	return G
};

// LevelsResource.exportToBuffer — levels descriptor → .alv file bytes
hg.IN = function(l, d) {
	var G = [],
		b = 0;
	for (var A = 0; A < 4; A++) G.push(hg.RX(d, A));
	while (G.length < 29) G.push([0, 255, 0, 255, 100]);
	l.ensureCapacity(0, 2 + 10 * 29);
	X.fh(l.data, b, 2);
	b += 2;
	for (var A = 0; A < 29; A++) {
		var V = G[A];
		for (var Q = 0; Q < 5; Q++) X.fh(l.data, b + A * 10 + Q * 2, V[Q])
	}
	b += 29 * 10;
	if (G.length == 29) return b;
	l.ensureCapacity(b, 8 + 10 * (G.length - 29));
	X.KQ(l.data, b, "Lvls");
	b += 4;
	X.fh(l.data, b, 3);
	b += 2;
	X.fh(l.data, b, G.length);
	b += 2;
	var t = G.length - 29;
	for (var A = 0; A < t; A++) {
		var V = G[29 + A];
		for (var Q = 0; Q < 5; Q++) X.fh(l.data, b + A * 10 + Q * 2, V[Q])
	}
	b += 10 * t;
	return b
};


// d1 - LayerStyleResource (.asl layer styles resource handler)
function d1() {}
// LayerStyleResource.importFromBuffer — parse .asl → layer style descriptor list
d1.Cd = function(l) {
	var d = new Uint8Array(l),
		G = 2,
		b = {
			rL: [],
			RY: []
		},
		V = X.Ko(d, G, 4);
	G += 4;
	var Q = X.TD(d, G);
	G += 2;
	var t = X.q(d, G);
	G += 4;
	b.rL = fv.V_(d, G, t);
	G += t;
	var I = X.q(d, G);
	G += 4;
	for (var A = 0; A < I; A++) {
		var y = X.q(d, G);
		G += 4;
		var e = G,
			M = {
				Zc: {},
				x1: {}
			};
		b.RY.push(M);
		G += 4;
		G += jO.V$(d, M.Zc, G);
		G += 4;
		G += jO.V$(d, M.x1, G);
		G = e + y;
		var R = M.x1.blendOptions,
			J = M.x1.Lefx;
		if (R && Object.keys(R.v).length > 1) {}
		if (J) {
			if (J.v.masterFXSwitch == null) J.v.masterFXSwitch = {
				t: "bool",
				v: !0
			};
			ia.sB(J.v)
		}
	}
	return b
};

// LayerStyleResource.setName — rename style (Nm field)
d1.Pl = function(l, d) {
	l.Zc.Nm.v = d
};

// LayerStyleResource.exportToBuffer — style list → .asl file bytes
d1.IN = function(l) {
	var d = new GrowableByteBuffer,
		G = 0;
	X.pg(d, G, 2);
	G += 2;
	X.zr(d, G, "8BSL");
	G += 4;
	X.pg(d, G, 3);
	G += 2;
	var b = G;
	G += 4;
	G = fv.WQ(d, G, l.rL);
	X._b(d, b, G - b - 4);
	var V = l.RY.length;
	X._b(d, G, V);
	G += 4;
	for (var A = 0; A < V; A++) {
		G += 4;
		var Q = G,
			t = l.RY[A];
		X._b(d, G, 16);
		G += 4;
		G += jO.TH(d, t.Zc, G);
		var I = t.x1.Lefx;
		if (I) {
			t.x1.Lefx = JSON.parse(JSON.stringify(I));
			ia.Kk(t.x1.Lefx.v)
		}
		X._b(d, G, 16);
		G += 4;
		G += jO.TH(d, t.x1, G);
		if (I) t.x1.Lefx = I;
		X._b(d, Q - 4, G - Q)
	}
	return d.data.slice(0, G).buffer
};


// iX - SelectiveColorHelper (selc adjustment preset binary codec)
function iX() {}
const SelectiveColorHelper = iX;

// SelectiveColorHelper.readFromPsd — parse selc preset block → adjustment descriptor
iX.nj = function(l, d, G) {
	var b = X.TD(l, d);
	d += 2;
	var V = {};
	V.h4 = X.TD(l, d) == 1;
	d += 2;
	V.m6 = [];
	for (var A = 0; A < 10; A++) {
		var Q = [];
		V.m6.push(Q);
		for (var t = 0; t < 4; t++) Q.push(X.Ar(l, d + t * 2));
		d += 8
	}
	var I = FilterHelper.oT("selc");
	I.Mthd.v.CrcM = V.h4 ? "Absl" : "Rltv";
	for (var A = 1; A < 10; A++) iX.fZ(I, A - 1, V.m6[A]);
	return I
};

iX.K6 = "Rds Ylws Grns Cyns Bls Mgnt Whts Ntrl Blks".split(" ");
// SelectiveColorHelper.makeColorRef — build color-range enum reference object
iX.M_ = function(l, A) {
	var d = ["Cmps", "Rd", "Grn", "Bl"],
		G = {
			t: "obj ",
			v: [{
				t: "Enmr",
				v: {
					classID: "Chnl",
					typeID: "Chnl",
					enum: d[A]
				}
			}]
		};
	return {
		classID: l,
		Chnl: G
	}
};

// SelectiveColorHelper.findColorIndex — find ClrC entry by color name
iX._o = function(l, d) {
	var G = iX.K6;
	for (var A = 0; A < l.length; A++) {
		var b = l[A].v,
			V = G.indexOf(b.Clrs.v.Clrs);
		if (V == d) return A
	}
	return -1
};

// SelectiveColorHelper.setColorAdjust — write CMYK offsets for one color range
iX.fZ = function(l, d, G) {
	var b = ["Cyn", "Mgnt", "Ylw", "Blck"],
		V = {
			classID: "ClrC",
			Clrs: {
				t: "enum",
				v: {
					Clrs: iX.K6[d]
				}
			}
		};
	for (var Q = 0; Q < 4; Q++) V[b[Q]] = {
		t: "UntF",
		v: {
			type: "#Prc",
			val: G[Q]
		}
	};
	V = {
		t: "Objc",
		v: V
	};
	var t = l.ClrC.v,
		I = iX._o(t, d);
	if (I == -1) t.push(V);
	else t[I] = V
};

// SelectiveColorHelper.getColorAdjust — read [C,M,Y,K] offsets for color range
iX.RX = function(l, d) {
	var G = [0, 0, 0, 0],
		b = l.ClrC.v,
		V = iX._o(b, d);
	if (V == -1) return G;
	var Q = ["Cyn", "Mgnt", "Ylw", "Blck"];
	for (var A = 0; A < 4; A++)
		if (b[V].v[Q[A]]) G[A] = b[V].v[Q[A]].v.val;
	return G
};

// SelectiveColorHelper.writeToPsd — selc descriptor → preset binary block
iX.qJ = function(l, d, G) {
	var b = {
		h4: G.Mthd.v.CrcM == "Absl",
		m6: [
			[0, 0, 0, 0]
		]
	};
	for (var A = 0; A < 9; A++) b.m6.push(iX.RX(G, A));
	l.ensureCapacity(d, 84);
	X.fh(l.data, d, 1);
	d += 2;
	X.fh(l.data, d, b.h4 ? 1 : 0);
	d += 2;
	for (var A = 0; A < 10; A++) {
		var V = b.m6[A];
		for (var Q = 0; Q < 4; Q++) X.RD(l.data, d + Q * 2, V[Q]);
		d += 8
	}
	return 84
};


// eU - ShapeResource (.csh custom shapes resource handler)
function eU() {}
// ShapeResource.createDefault — empty custom shape template
eU.oT = function() {
	return {
		W5: new Rect(0, 0, 50, 50),
		Zc: "",
		GC: "play",
		i: PixelUtil.path.shapes.fromFlatCoords([.1, .1, .9, .5, .1, .9], 0)
	}
};

// ShapeResource.importFromBuffer — parse .csh → shape descriptor list
eU.Cd = function(l) {
	l = new Uint8Array(l);
	var d = 0,
		G = [],
		b = Date.now(),
		V = X.Ko(l, 0, 4);
	d += 4;
	var Q = X.q(l, d);
	d += 4;
	var t = X.q(l, d);
	d += 4;
	for (var A = 0; A < t; A++) {
		var I = X.zf(l, d);
		d += I.length * 2 + 4 + 2;
		if ((I.length & 1) == 0) d += 2;
		d = eU.xl(l, d, I, G)
	}
	return G
};

// ShapeResource.readShapeRecord — read one shape record from .csh
eU.xl = function(l, d, G, b) {
	var V = X.q(l, d);
	d += 4;
	var Q = X.q(l, d);
	d += 4;
	var t = d,
		I = X.Qh(l, t).ip;
	t += I.length + 1;
	var y = X.NK(l, t);
	t += 16;
	var e = eU.xv(l, t, Q - (t - d)),
		M = PixelUtil.path.collectFlatCoords(e),
		R = PixelUtil.vec.boundingBox(M),
		J = 1 / R.m,
		n = 1 / R.n;
	PixelUtil.path.transformFlatCoords(e, new Matrix2D(J, 0, 0, n, -R.x * J, -R.y * n));
	b.push({
		GC: G,
		Zc: I,
		i: e,
		W5: y
	});
	d += Q;
	return d
};

// ShapeResource.setName — rename shape (Nm field)
eU.Pl = function(l, d) {
	l.GC = d
};

// ShapeResource.exportToBuffer — shape list → .csh file bytes
eU.IN = function(l) {
	var items = [];
	for (var hP = 0; hP < l.length; hP++) {
		var hQ = l[hP];
		if (hQ && hQ.GC != null && hQ.W5 && hQ.i) items.push(hQ)
	}
	l = items;
	var d = new GrowableByteBuffer,
		G = 0;
	X.zr(d, G, "cush");
	G += 4;
	X._b(d, G, 2);
	G += 4;
	X._b(d, G, l.length);
	G += 4;
	for (var A = 0; A < l.length; A++) {
		var b = l[A],
			V = b.GC + "\0";
		X.ZI(d, G, V);
		G += 4 + V.length * 2;
		if ((V.length & 1) == 1) G += 2;
		X._b(d, G, 1);
		G += 4;
		G += 4;
		var Q = G;
		X.OH(d, G, b.Zc);
		G += b.Zc.length + 1;
		X.ZE(d, G, b.W5);
		G += 16;
		d.ensureCapacity(G, b.i.length * 26);
		eU.nb(d.data, G, b.i, 1, 1);
		G += b.i.length * 26;
		var t = G - Q;
		if ((t & 3) != 0) t += 4 - (t & 3);
		X._b(d, Q - 4, t);
		G = Q + t
	}
	return d.data.slice(0, G).buffer
};

// ShapeResource.normalizePath — scale/translate shape path to unit bounds
eU.axP = function(l) {
	var d = [];
	for (var A = 0; A < l.length; A++) {
		var G = l[A],
			b = G.type,
			V = {
				type: b
			};
		d.push(V);
		if (b == 6) {} else if (b == 8) V.all = G.all;
		else if (b == 0 || b == 3) {
			V.length = G.length;
			V.frule = G.H$;
			V.third = G._M;
			V.prmA = G.c_;
			V.prmB = G.jt
		} else {
			V.c = [G.Wf.x, G.Wf.y, G.H.x, G.H.y, G.UU.x, G.UU.y]
		}
	}
	return d
};

// ShapeResource.pathBounds — compute bounding rect of shape path
eU.aK = function(l) {
	var d = [];
	for (var A = 0; A < l.length; A++) {
		var G = l[A],
			b = G.type,
			V = {
				type: b
			};
		d.push(V);
		if (b == 6) {} else if (b == 8) V.all = G.all;
		else if (b == 0 || b == 3) {
			V.length = G.length;
			V.H$ = G.frule;
			V._M = G.third;
			V.c_ = G.prmA;
			V.jt = G.prmB
		} else {
			var Q = G.c;
			V.Wf = new Point2D(Q[0], Q[1]);
			V.H = new Point2D(Q[2], Q[3]);
			V.UU = new Point2D(Q[4], Q[5])
		}
	}
	return d
};

// ShapeResource.writeShapeRecord — serialize one shape into .csh
eU.xv = function(l, d, G, b, V) {
	if (b == null) b = 1;
	if (V == null) V = 1;

	function Q(T, j, g) {
		var Y = X.any(T, j) * g,
			k = Math.round(Y);
		return Math.abs(Y - k) < 1e-6 ? k : Y
	}
	var t = X.Ar,
		I = [],
		y = Math.floor(G / 26);
	for (var A = 0; A < y; A++) {
		var e = d + A * 26,
			M = {},
			R = 0;
		I.push(M);
		M.type = t(l, e);
		e += 2;
		if (M.type == 6) {
			R = 24
		}
		if (M.type == 8) {
			M.all = t(l, e);
			e += 2;
			R = 22
		}
		if (M.type == 0 || M.type == 3) {
			M.length = t(l, e);
			e += 2;
			M.H$ = t(l, e);
			e += 2;
			M._M = t(l, e);
			e += 2;
			M.c_ = X.q(l, e);
			e += 4;
			M.jt = X.q(l, e);
			e += 4;
			R = 10
		}
		if (M.type == 1 || M.type == 2 || M.type == 4 || M.type == 5) {
			var J, n;
			n = Q(l, e, V);
			e += 4;
			J = Q(l, e, b);
			e += 4;
			M.Wf = new Point2D(J, n);
			n = Q(l, e, V);
			e += 4;
			J = Q(l, e, b);
			e += 4;
			M.H = new Point2D(J, n);
			n = Q(l, e, V);
			e += 4;
			J = Q(l, e, b);
			e += 4;
			M.UU = new Point2D(J, n);
			R = 0
		}
		for (var r = 0; r < R; r++)
			if (l[e + r] != 0) {
				console.log("Unexpected non-zero byte!", M, r, l[e + r])
			}
	}
	return I
};

// ShapeResource.writeShapeList — serialize all shapes into buffer
eU.nb = function(l, d, G, b, V) {
	var Q = X.RD,
		t = X.azT,
		I = G.length;
	for (var A = 0; A < I; A++) {
		var y = d + A * 26,
			e = G[A];
		Q(l, y, e.type);
		y += 2;
		if (e.type == 6) {}
		if (e.type == 8) Q(l, y, e.all);
		if (e.type == 0 || e.type == 3) {
			Q(l, y, e.length);
			y += 2;
			Q(l, y, e.H$);
			y += 2;
			Q(l, y, e._M);
			y += 2
		}
		if (e.type == 1 || e.type == 2 || e.type == 4 || e.type == 5) {
			t(l, y, e.Wf.y / V);
			y += 4;
			t(l, y, e.Wf.x / b);
			y += 4;
			t(l, y, e.H.y / V);
			y += 4;
			t(l, y, e.H.x / b);
			y += 4;
			t(l, y, e.UU.y / V);
			y += 4;
			t(l, y, e.UU.x / b);
			y += 4
		}
	}
};


// bA - SwatchResource (.aco color swatches resource handler)
function bA() {}
// SwatchResource.importFromBuffer — parse .aco → color swatch list
bA.Cd = function(l) {
	var d = new Uint8Array(l),
		G = [],
		b = 0;
	if (X.Ko(d, 0, 4) == "ASEF") G = bA.afj(d);
	else {
		b = bA.MR(d, b, G);
		if (b + 3 < d.length) {
			G = [];
			b = bA.MR(d, b, G)
		}
	}
	return G
};

// SwatchResource.readSwatch — read one ACO color entry
bA.afj = function(l) {
	var d = [],
		G = 8,
		b = X.q(l, G),
		V, Q = null,
		t, I, y, e;
	G += 4;
	for (var M = 0; M < b; M++) {
		var R = X.TD(l, G);
		G += 2;
		var J = X.q(l, G);
		G += 4;
		var n = G + J;
		if (R == 49153 || R == 1) {
			var r = X.TD(l, G);
			G += 2;
			var T = X.tj(l, G, r - 1);
			G += r * 2;
			if (R == 1) V = T;
			else Q = T
		}
		if (R == 1) {
			var j = X.Ko(l, G, 4);
			G += 4;
			t = X.f_(l, G);
			G += 4;
			I = X.f_(l, G);
			G += 4;
			y = X.f_(l, G);
			G += 4;
			if (j == "RGB ") {} else if (j == "CMYK") {
				e = X.f_(l, G);
				G += 4;
				var g = UDOC.Color.cmykToRgb([t, I, y, e]);
				t = g[0];
				I = g[1];
				y = g[2]
			} else alert("Unknown color space: " + j);
			d.push({
				o: t * 255,
				J: I * 255,
				k: y * 255,
				X$: (Q ? Q + " : " : "") + V
			})
		}
		G = n
	}
	return d
};

// SwatchResource.rgbToDescriptor — RGB (+optional name) → color descriptor
bA.MR = function(l, d, G) {
	var b = X.TD,
		V = X.Ar,
		Q = b(l, d);
	d += 2;
	var t = b(l, d);
	d += 2;
	for (var A = 0; A < t; A++) {
		var I = bA.eq(l, d);
		d += 10;
		if (Q == 2) {
			I.X$ = X.zf(l, d);
			d += 4 + I.X$.length * 2 + 2
		}
		G.push(I)
	}
	return d
};

// SwatchResource.descriptorToAco — color descriptor → ACO binary entry
bA.eq = function(l, d) {
	var G = X.TD,
		b = X.Ar,
		V = G(l, d),
		n = null;
	d += 2;
	var Q = G(l, d);
	d += 2;
	var t = G(l, d);
	d += 2;
	var I = G(l, d);
	d += 2;
	var y = G(l, d);
	d += 2;
	var e = 1 / 65535,
		M = 255 / 65535,
		R = 100 / 65535,
		J = 255 / 1e4;
	if (V == 0) n = {
		o: Q * M,
		J: t * M,
		k: I * M
	};
	else if (V == 1) {
		n = PixelUtil.hsbToRgb(Q * e, t * e, I * e);
		n.o *= 255;
		n.J *= 255;
		n.k *= 255
	} else if (V == 2) n = PixelUtil.color.sampleGradientColor({
		classID: "CMYC",
		Cyn: {
			t: "doub",
			v: 100 - Q * R
		},
		Mgnt: {
			t: "doub",
			v: 100 - t * R
		},
		Ylw: {
			t: "doub",
			v: 100 - I * R
		},
		Blck: {
			t: "doub",
			v: 100 - y * R
		}
	});
	else if (V == 7) {
		var r = PixelUtil.labToRgb(Q / 100, b(l, d - 6) / 100, b(l, d - 4) / 100);
		n = r
	} else if (V == 8) {
		n = {
			o: 255 - Q * J,
			J: 255 - t * J,
			k: 255 - I * J
		}
	} else if (V == 18) {
		var T = 255 * Q / 16384;
		n = {
			o: T,
			J: T,
			k: T
		}
	} else {
		throw V
	}
	return n
};

// SwatchResource.exportToBuffer — swatch list → .aco file bytes
bA.IN = function(l) {
	var d = new GrowableByteBuffer,
		G = 0,
		b = X.pg;
	b(d, G, 2);
	G += 2;
	b(d, G, l.length);
	G += 2;
	for (var A = 0; A < l.length; A++) {
		var V = l[A];
		d.ensureCapacity(G, 10);
		bA.L4(d.data, G, V);
		G += 10;
		var Q = (V.X$ ? V.X$ : "") + "\0";
		X.ZI(d, G, Q);
		G += 4 + Q.length * 2
	}
	return d.data.slice(0, G).buffer
};

// SwatchResource.setName — rename swatch
bA.Pl = function(l, d) {
	l.X$ = d
};

// SwatchResource.writeSwatchList — serialize swatches into buffer
bA.L4 = function(l, d, G) {
	var b = 65535 / 255,
		V = X.fh;
	V(l, d, 0);
	V(l, d + 2, Math.round(G.o * b));
	V(l, d + 4, Math.round(G.J * b));
	V(l, d + 6, Math.round(G.k * b));
	V(l, d + 8, 0)
};


// jn - ActionResource (.atn Photoshop actions resource handler)
function jn() {}
// ActionResource.importFromBuffer — parse .atn → action set tree
jn.Cd = function(l) {
	var d = new Uint8Array(l),
		G = 4,
		b = {};
	b.Il = X.zf(d, G);
	G += 4 + b.Il.length * 2 + 2;
	b.exp = d[G++] == 1;
	b.Vm = [];
	var V = X.q(d, G);
	G += 4;
	for (var A = 0; A < V; A++) {
		var Q = {};
		b.Vm.push(Q);
		Q.sy = X.TD(d, G);
		G += 2;
		Q.shift = d[G++] == 1;
		Q.a0c = d[G++] == 1;
		Q.color = X.TD(d, G);
		G += 2;
		Q.Il = X.zf(d, G);
		G += 4 + Q.Il.length * 2 + 2;
		Q.exp = d[G++] == 1;
		Q.Vm = [];
		var t = X.q(d, G);
		G += 4;
		for (var I = 0; I < t; I++) {
			var y = {};
			Q.Vm.push(y);
			y.exp = d[G++] == 1;
			y.p = d[G++] == 1;
			y.awX = d[G++] == 1;
			y.afl = d[G++];
			var e = X.Ko(d, G, 4);
			G += 4;
			if (e == "TEXT") {
				y.kT = jn.tG(d, G);
				G += 4 + y.kT.length
			} else if (e == "long") {
				y.kT = X.Ko(d, G, 4);
				G += 4
			} else throw "e";
			y.ZL = jn.tG(d, G);
			G += 4 + y.ZL.length;
			var M = X.YU(d, G);
			G += 4;
			if (M == -1) {
				y.a0 = {};
				var R = jO.V$(d, y.a0, G);
				G += R
			}
		}
	}
	console.log(b);
	var J = new Uint8Array(jn.IN(b));
	for (var A = 0; A < J.length; A++)
		if (J[A] != d[A] && X.Ko(d, A + 1, 4) != "None") {
			console.log(d.length, J.length);
			var n = 4 * (A >>> 2) - 16;
			console.log(X.Ly(d, n, 64));
			console.log(X.Ly(J, n, 64));
			console.log(d.slice(n, n + 64));
			console.log(J.slice(n, n + 64));
			throw "i"
		}
	return [b]
};

// ActionResource.setName — rename action set
jn.tG = function(l, d) {
	var G = X.q(l, d);
	return X.Ko(l, d + 4, G)
};

// ActionResource.findAction — locate action by name in set
jn.Im = function(l, d, G) {
	X._b(l, d, G.length);
	X.zr(l, d + 4, G)
};

// ActionResource.exportToBuffer — action set → .atn file bytes
jn.IN = function(l) {
	var d = new GrowableByteBuffer,
		G = 0;
	X._b(d, G, 16);
	G += 4;
	X.ZI(d, G, l.Il + "\0");
	G += 4 + l.Il.length * 2 + 2;
	d.ensureCapacity(G, 1);
	d.data[G++] = l.exp ? 1 : 0;
	var b = l.Vm.length;
	X._b(d, G, b);
	G += 4;
	for (var A = 0; A < b; A++) {
		var V = l.Vm[A];
		X.pg(d, G, V.sy);
		G += 2;
		d.ensureCapacity(G, 2);
		d.data[G++] = V.shift ? 1 : 0;
		d.data[G++] = V.a0c ? 1 : 0;
		X.pg(d, G, V.color);
		G += 2;
		X.ZI(d, G, V.Il + "\0");
		G += 4 + V.Il.length * 2 + 2;
		d.ensureCapacity(G, 1);
		d.data[G++] = V.exp ? 1 : 0;
		var Q = V.Vm.length;
		X._b(d, G, Q);
		G += 4;
		for (var t = 0; t < Q; t++) {
			var I = V.Vm[t];
			d.ensureCapacity(G, 4);
			d.data[G++] = I.exp ? 1 : 0;
			d.data[G++] = I.p ? 1 : 0;
			d.data[G++] = I.awX ? 1 : 0;
			d.data[G++] = I.afl;
			var y = "LqFy Avrg GEfc PbPl Fbrs Bokh LnCr".split(" ").indexOf(I.kT) != -1;
			X.zr(d, G, y ? "long" : "TEXT");
			G += 4;
			if (!y) {
				jn.Im(d, G, I.kT);
				G += 4 + I.kT.length
			} else {
				X.zr(d, G, I.kT);
				G += 4
			}
			jn.Im(d, G, I.ZL);
			G += 4 + I.ZL.length;
			X.Kl(d, G, I.a0 ? -1 : 0);
			G += 4;
			if (I.a0) {
				var e = jO.TH(d, I.a0, G);
				G += e
			}
		}
	}
	return d.data.slice(0, G).buffer
};


// ei - MeshResource (3D displacement mesh preset resource handler)
function ei() {}
// MeshResource.importFromBuffer — parse mesh preset → { iJ, Tq, map }
ei.Cd = function(l) {
	var d = new Uint8Array(l),
		G = 0,
		b = X.q(d, G),
		y;
	G += 4;
	var V = X.Ko(d, G, 8);
	G += 8;
	var Q = X.Lv(d, G);
	G += 4;
	var t = X.Lv(d, G);
	G += 4;
	var I = X.Lv(d, G);
	G += 4;
	if (b == 2) {
		y = new Float32Array(l, 32, l.byteLength - 32 >>> 2)
	} else if (b == 3 || b == 4) {
		y = new Float32Array(t * I * 2);
		var e = 0,
			M = 0,
			R = !0;
		G = b == 3 ? 32 : 16 + 8 + 40;
		while (G < d.length) {
			var J = X.Lv(d, G);
			G += 4;
			if (R) M += J;
			else {
				for (var A = 0; A < J; A++) {
					y[e + M + A << 1] = X.kY(d, G);
					y[(e + M + A << 1) + 1] = X.kY(d, G + 4);
					G += 8
				}
				M += J
			}
			R = !R;
			if (J != 0 && M == t) {
				e += t;
				M = 0;
				R = !0;
				if (e == t * I) break
			}
		}
	} else throw "unknown Mesh version: " + b;
	return {
		iJ: t,
		Tq: I,
		map: y
	}
};

// MeshResource.exportToBuffer — mesh data → preset file bytes
ei.CO = function(l) {
	var d = l.iJ,
		G = l.Tq,
		b = l.map,
		V = new Uint8Array(32 + G * d * 8 + G * 8),
		Q = 0,
		t = 0;
	X.m1(V, Q, 3);
	Q += 4;
	X.KQ(V, Q, "yfqLhseM");
	Q += 8;
	X.iy(V, Q, 2);
	Q += 4;
	X.iy(V, Q, d);
	Q += 4;
	X.iy(V, Q, G);
	Q += 4;
	X.iy(V, Q, 0);
	Q += 4;
	X.iy(V, Q, 1);
	Q += 4;
	for (var I = 0; I < G; I++) {
		X.iy(V, Q, 0);
		Q += 4;
		X.iy(V, Q, d);
		Q += 4;
		for (var y = 0; y < d; y++) {
			X.pF(V, Q, b[t]);
			X.pF(V, Q + 4, b[t + 1]);
			t += 2;
			Q += 8
		}
	}
	return V.buffer
};


// hT - ContourResource (.shc layer style contours resource handler)
function hT() {}
// ContourResource.importFromBuffer — parse .shc → contour curve list
hT.Cd = function(l) {
	var d = new Uint8Array(l),
		G = 0,
		b = X.Ko(d, G, 4);
	G += 4;
	var V = X.TD(d, G);
	G += 2;
	var Q = X.q(d, G);
	G += 4;
	var t = [];
	for (var A = 0; A < Q; A++) {
		var I = X.q(d, G);
		G += 4;
		var y = {
			classID: "ShpC",
			Nm: {
				t: "TEXT",
				v: ""
			},
			Crv: {
				t: "VlLs",
				v: []
			}
		};
		t.push(y);
		var e = X.zf(d, G);
		y.Nm.v = e;
		G += 4 + e.length * 2 + 2;
		var M = X.TD(d, G);
		G += 2;
		var R = X.TD(d, G);
		G += 2;
		for (var J = 0; J < R; J++) {
			var n = PixelUtil.presetThumb.yR(0, 0, !0);
			n.v.Vrtc.v = X.TD(d, G);
			G += 2;
			n.v.Hrzn.v = X.TD(d, G);
			G += 2;
			y.Crv.v.push(n)
		}
		if (I == 1) {} else if (I == 2) {
			for (var J = 0; J < R; J++) {
				y.Crv.v[J].v.Cnty.v = d[G] == 1;
				G += 1
			}
		} else throw "error";
		var r = X.q(d, G);
		G += 4;
		var T = X.q(d, G);
		G += 4
	}
	return t
};

// ContourResource.setName — rename contour preset
hT.Pl = function(l, d) {
	l.Nm.v = d
};

// ContourResource.exportToBuffer — contour list → .shc file bytes
hT.IN = function(l) {
	var d = new GrowableByteBuffer,
		G = 0;
	X.zr(d, G, "8BFS");
	G += 4;
	X.pg(d, G, 1);
	G += 2;
	X._b(d, G, l.length);
	G += 4;
	for (var A = 0; A < l.length; A++) {
		X._b(d, G, 2);
		G += 4;
		var b = l[A];
		X.ZI(d, G, b.Nm.v + "\0");
		G += 4 + b.Nm.v.length * 2 + 2;
		X.pg(d, G, 2);
		G += 2;
		var V = b.Crv.v.length;
		X.pg(d, G, V);
		G += 2;
		for (var Q = 0; Q < V; Q++) {
			var t = b.Crv.v[Q];
			X.pg(d, G, t.v.Vrtc.v);
			G += 2;
			X.pg(d, G, t.v.Hrzn.v);
			G += 2
		}
		d.ensureCapacity(G, V);
		for (var Q = 0; Q < V; Q++) {
			d.data[G] = b.Crv.v[Q].v.Cnty.v;
			G++
		}
		X._b(d, G, 0);
		G += 4;
		X._b(d, G, 0);
		G += 4
	}
	return d.data.slice(0, G).buffer
};


// fv - PatternResource (.pat fill patterns resource handler)
function fv() {}
// PatternResource.importFromBuffer — parse .pat → pattern descriptor list
fv.Cd = function(l) {
	var d = new Uint8Array(l),
		G = 4,
		b = X.TD(d, G);
	G += 2;
	var V = X.q(d, G);
	G += 4;
	var Q = [];
	for (var A = 0; A < V; A++) {
		var t = {};
		Q.push(t);
		G = fv.Tj(d, G, t)
	}
	return Q
};

// PatternResource.setName — rename pattern
fv.Pl = function(l, d) {
	l.name = d
};

// PatternResource.exportToBuffer — pattern list → .pat file bytes
fv.IN = function(l) {
	var b = [];
	for (var A = 0; A < l.length; A++)
		if (l[A] && l[A].Rj) b.push(l[A]);
	var d = new GrowableByteBuffer,
		G = 0;
	X.zr(d, G, "8BPT");
	G += 4;
	X.pg(d, G, 1);
	G += 2;
	X._b(d, G, b.length);
	G += 4;
	for (var A = 0; A < b.length; A++) G = fv.Zh(d, G, b[A]);
	return d.data.slice(0, G).buffer
};

// PatternResource.readPatternList — read embedded pattern records from brush file
fv.V_ = function(l, d, G) {
	var b = d + G,
		V = [];
	while (d < b) {
		var Q = {},
			t = X.q(l, d);
		d += 4;
		var I = d;
		d = fv.Tj(l, d, Q);
		if (!Q.Rj[1].W6()) V.push(Q);
		if (t % 4 != 0) t += 4 - t % 4;
		d = I + t
	}
	return V
};

// PatternResource.writePatternList — write pattern records into brush file
fv.WQ = function(l, d, G) {
	for (var A = 0; A < G.length; A++) {
		var b = G[A];
		if (b == null || b.Rj == null) continue;
		d += 4;
		var V = d;
		d = fv.Zh(l, d, b);
		var Q = d - V;
		X._b(l, V - 4, Q);
		if (Q % 4 != 0) V += 4 - Q % 4;
		d = V + Q
	}
	return d
};

// PatternResource.readPattern — read one pattern tile + name
fv.Tj = function(l, d, G) {
	var b = X.q(l, d);
	d += 4;
	if (b != 1) alert("Unknown version of pattern");
	var V = X.q(l, d);
	d += 4;
	if (V != 1 && V != 2 && V != 3) console.log("Unsupported mode of pattern: " + V);
	var Q = X.TD(l, d);
	d += 2;
	var t = X.TD(l, d);
	d += 2;
	var I = new Rect(0, 0, t, Q);
	G.name = X.zf(l, d);
	d += 4 + 2 * G.name.length + 2;
	var y = l[d];
	d++;
	G.id = X.Ko(l, d, y);
	d += G.id.length;
	var e = -1;
	if (V == 2) {
		e = d;
		d += 3 * 256 + 4
	}
	var M = new WebGLContext.RgbaFloatPlanes(t * Q);
	d = fv.aea(l, d, M);
	if (V == 2) {
		for (var A = 0; A < M.o.length; A++) {
			var R = 3 * M.o[A];
			M.o[A] = l[e + R + 0];
			M.J[A] = l[e + R + 1];
			M.k[A] = l[e + R + 2]
		}
	}
	var J = PixelUtil.allocBytes(I.O() * 4);
	PixelUtil.channelPlanesToRgba(M, J);
	G.Rj = [J, I];
	return d
};

// PatternResource.decodePatternPixels — decompress pattern channel data
fv.Zh = function(l, d, G) {
	if (G == null || G.Rj == null) return d;
	var b = G.Rj[0],
		V = G.Rj[1];
	X._b(l, d, 1);
	d += 4;
	X._b(l, d, 3);
	d += 4;
	X.pg(l, d, V.n);
	d += 2;
	X.pg(l, d, V.m);
	d += 2;
	X.ZI(l, d, G.name + "\0");
	d += 4 + 2 * G.name.length + 2;
	X.s8(l, d, G.id.length);
	d++;
	X.zr(l, d, G.id);
	d += G.id.length;
	var Q = new WebGLContext.RgbaFloatPlanes(V.O());
	PixelUtil.rgbaToChannelPlanes(b, Q);
	d = fv.atL(l, d, Q, V);
	return d
};

// PatternResource.encodePatternPixels — compress pattern channel data
fv.aea = function(l, d, G) {
	var b = d,
		V = {
			vD: null,
			MX: [],
			a5X: null,
			Xd: null
		},
		Q = X.q(l, d);
	d += 4;
	var t = X.q(l, d);
	d += 4;
	V.vD = X.NK(l, d);
	d += 16;
	var I = X.q(l, d);
	d += 4;
	for (var A = 0; A < I + 2; A++) {
		var y = X.q(l, d);
		d += 4;
		if (y == 0) continue;
		var e = X.q(l, d);
		d += 4;
		if (e == 0) continue;
		var M = X.q(l, d);
		d += 4;
		var R = X.NK(l, d);
		d += 16;
		var J = X.TD(l, d);
		d += 2;
		var n = l[d];
		d++;
		var r = db.c7(!1, M, l, R.m, R.n, d, n);
		if (A < I) V.MX.push(r);
		if (A == I) V.a5X = r;
		if (A == I + 1) V.Xd = r;
		d += e - 23
	}
	if (!V.vD.W6()) {
		if (V.MX[0]) G.o = V.MX[0];
		if (V.MX[1]) G.J = V.MX[1];
		else G.J = V.MX[0].slice(0);
		if (V.MX[2]) G.k = V.MX[2];
		else G.k = V.MX[0].slice(0);
		if (V.Xd) G.aS = V.Xd;
		else G.aS.fill(255)
	}
	return d
};

// PatternResource.writePattern — serialize one pattern tile
fv.atL = function(l, d, G, b) {
	var V = d,
		Q = {
			vD: b,
			MX: [G.o, G.J, G.k],
			a5X: null,
			Xd: G.aS
		};
	X._b(l, d, 3);
	d += 4;
	X._b(l, d, 0);
	d += 4;
	X.ZE(l, d, b);
	d += 16;
	X._b(l, d, 24);
	d += 4;
	for (var A = 0; A < 24 + 2; A++) {
		var t = d,
			I = A < 3 || A == 25 ? 1 : 0;
		X._b(l, d, I);
		d += 4;
		if (I == 0) continue;
		X._b(l, d, 0);
		d += 4;
		X._b(l, d, 8);
		d += 4;
		X.ZE(l, d, b);
		d += 16;
		X.pg(l, d, 8);
		d += 2;
		X.s8(l, d, 1, 1);
		d++;
		var y = A < 3 ? Q.MX[A] : Q.Xd;
		l.ensureCapacity(d, b.O() + 2);
		d = db.hH(!1, y, l.data, b.m, b.n, d, 1);
		X._b(l, t + 4, d - t - 8)
	}
	X._b(l, V + 4, d - V - 8);
	return d
};


// eu - GradientResource (.grd gradients resource handler)
function eu() {}
// GradientResource.importFromBuffer — parse .grd → gradient descriptor list
eu.Cd = function(l) {
	var d = new Uint8Array(l),
		G = 0;
	if (d[0] == 71) return eu.aqi(d);
	var b = X.Ko(d, G, 4);
	G += 4;
	var V = X.TD(d, G);
	G += 2;
	var Q = [];
	if (V <= 3) {
		var t = X.TD(d, G);
		G += 2;
		for (var A = 0; A < t; A++) {
			var I = d[G++],
				y = X.Ko(d, G, I);
			G += I;
			var e = eu.l3(d, G, y),
				M = e[0];
			G = e[1];
			Q.push(M)
		}
	} else {
		var e = {},
			R = jO.V$(d, e, G + 4),
			J = e.GrdL.v;
		for (var A = 0; A < J.length; A++) Q[A] = J[A].v.Grad.v
	}
	return Q
};

// GradientResource.setName — rename gradient
eu.Pl = function(l, d) {
	l.Nm.v = d
};

// GradientResource.exportToBuffer — gradient list → .grd file bytes
eu.IN = function(l) {
	var d = new GrowableByteBuffer,
		G = 0;
	X.zr(d, G, "8BGR");
	G += 4;
	X.pg(d, G, 5);
	G += 2;
	X._b(d, G, 16);
	G += 4;
	var b = {
			classID: "null",
			GrdL: {
				t: "VlLs",
				v: []
			}
		},
		V = b.GrdL.v;
	for (var A = 0; A < l.length; A++) V[A] = {
		t: "Objc",
		v: {
			classID: "Grdn",
			__name: "Gradient ",
			Grad: {
				t: "Objc",
				v: l[A]
			}
		}
	};
	G += jO.TH(d, b, G);
	return d.data.slice(0, G).buffer
};

// GradientResource.readGradient — read one gradient definition
eu.l3 = function(l, d, G) {
	var b = {
			classID: "Grdn",
			Clrs: {
				t: "VlLs",
				v: []
			},
			GrdF: {
				t: "enum",
				v: {
					GrdF: "CstS"
				}
			},
			Intr: {
				t: "doub",
				v: 4096
			},
			Nm: {
				t: "TEXT",
				v: G
			},
			Trns: {
				t: "VlLs",
				v: []
			}
		},
		V = X.TD(l, d);
	d += 2;
	if (V == 0) throw "e";
	for (var A = 0; A < V; A++) {
		var Q = X.q(l, d),
			t = X.q(l, d + 4),
			I = bA.eq(l, d + 8),
			y = {
				t: "Objc",
				v: {
					classID: "Clrt",
					Clr: {
						t: "Objc",
						v: {
							classID: "RGBC",
							Rd: {
								t: "doub",
								v: I.o
							},
							Grn: {
								t: "doub",
								v: I.J
							},
							Bl: {
								t: "doub",
								v: I.k
							}
						}
					},
					Type: {
						t: "enum",
						v: {
							Clry: "UsrS"
						}
					},
					Lctn: {
						t: "long",
						v: Q
					},
					Mdpn: {
						t: "long",
						v: t
					}
				}
			};
		b.Clrs.v.push(y);
		d += 20
	}
	var e = X.TD(l, d);
	d += 2;
	for (var A = 0; A < e; A++) {
		var Q = X.q(l, d),
			t = X.q(l, d + 4),
			M = X.TD(l, d + 8),
			y = {
				t: "Objc",
				v: {
					classID: "TrnS",
					Opct: {
						t: "UntF",
						v: {
							type: "#Prc",
							val: Math.round(100 * M / 255)
						}
					},
					Lctn: {
						t: "long",
						v: Q
					},
					Mdpn: {
						t: "long",
						v: t
					}
				}
			};
		b.Trns.v.push(y);
		d += 10
	}
	var R = X.TD(l, d);
	d += 2;
	b.Intr.v = R == 2 ? X.TD(l, d) : 4096;
	d += 2;
	var J = X.TD(l, d);
	d += 2;
	return [b, d]
};

// GradientResource.writeGradient — serialize one gradient
eu.asL = function(l, d, G) {
	var b = G.Clrs.v.length;
	X.pg(l, d, b);
	d += 2;
	for (var A = 0; A < b; A++) {
		var V = G.Clrs.v[A];
		X._b(l, d, V.v.Lctn.v);
		X._b(l, d + 4, V.v.Mdpn.v);
		X.pg(l, d + 8, 0);
		var Q = PixelUtil.color.rgbColorDescriptor(PixelUtil.color.sampleGradientColor(V.v.Clr.v)),
			t = [Q.Rd.v, Q.Grn.v, Q.Bl.v, 0];
		for (var I = 0; I < 4; I++) X.pg(l, d + 10 + I * 2, Math.round(65535 * (t[I] / 255)));
		d += 20
	}
	var y = G.Trns.v.length;
	X.pg(l, d, y);
	d += 2;
	for (var A = 0; A < y; A++) {
		var V = G.Trns.v[A];
		X._b(l, d, V.v.Lctn.v);
		X._b(l, d + 4, V.v.Mdpn.v);
		X.pg(l, d + 8, Math.round(255 * V.v.Opct.v.val / 100));
		d += 10
	}
	X.pg(l, d, 2);
	d += 2;
	X.pg(l, d, G.Intr.v);
	d += 2;
	X.pg(l, d, 32);
	d += 2;
	return d
};

// GradientResource.interpolateColor — sample gradient at position t
eu.aqi = function(l) {
	var d = X.Kw(l, 0, l.length).split("\n"),
		G = parseFloat(d[2]),
		b = [],
		V = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("GrFl")]).Grad.v;
	V.Intr.v = 0;
	V.Nm.v = d[1];
	for (var A = 0; A < G; A++) {
		var Q = d[3 + A].split(" ").map(parseFloat),
			t = Q[11],
			I = Q[12];
		b.push([Q[0], Q.slice(3, 6), Q[6]]);
		if (I != 0) {
			var y = PixelUtil.rgbToHsb(Q[3], Q[4], Q[5]),
				e = PixelUtil.rgbToHsb(Q[7], Q[8], Q[9]),
				M = y.Tq,
				R = e.Tq;
			if (I == 1 && M > R) R++;
			if (I == 2 && M < R) M++;
			var J = Math.round(Math.abs(R - M) * 7);
			if (J > 1)
				for (var n = 0; n < J; n++) {
					var r = 1 - (n + 1) / (J + 1),
						T = 1 - r,
						j = PixelUtil.hsbToRgb(r * M + T * R, r * y.Lm + T * e.Lm, r * y.qv + T * e.qv);
					b.push([r * Q[0] + T * Q[2],
						[j.o, j.J, j.k], r * Q[6] + T * Q[10]
					])
				}
		}
		b.push([Q[2], Q.slice(7, 10), Q[10]])
	}
	b.sort(function(g, Y) {
		return g[0] - Y[0]
	});
	PixelUtil.color.stopsToDescriptor(b, V);
	return [V]
};


// cG - ToolPresetResource (.tpl tool presets resource handler)
function cG() {}
// ToolPresetResource.importFromBuffer — parse .tpl → tool preset descriptor list
cG.Cd = function(l) {
	var d = new Uint8Array(l),
		G = [],
		b = [],
		V = [],
		Q = [],
		t = [],
		I = 0,
		y = X.Ko(d, I, 4);
	I += 4;
	var e = X.q(d, I);
	I += 4;
	var M = X.q(d, I);
	I += 4;
	while (I < d.length) {
		var R = X.Ko(d, I, 4);
		I += 4;
		var J = X.Ko(d, I, 4);
		I += 4;
		var n = X.q(d, I);
		I += 4;
		if (J == "tppa") {
			b = fv.V_(d, I, n);
			I += n
		} else if (J == "tpbd") {
			V = d3.Vs(d, I, n, 1, 1);
			I += n
		} else if (J == "tptp") {
			var r = X.q(d, I);
			I += 4;
			for (var A = 0; A < r; A++) {
				var T = X.zf(d, I);
				I += 6 + T.length * 2;
				I += 4;
				var j = {};
				I += jO.V$(d, j, I);
				G.push([T, j])
			}
			while ((I & 3) != 0) I++
		} else if (J == "tpsh") {
			var g = I,
				Y = d.slice(I, I + n);
			while (I < g + n) {
				var k = X.q(d, I);
				I += 4;
				I = eU.xl(d, I, "Shape", Q)
			}
			I = g + n
		} else if (J == "tpst") {
			var g = I;
			I += 4;
			while (I < g + n) {
				var F = X.q(d, I);
				I += 4;
				var D = I,
					q = X.q(d, I);
				I += 4;
				var j = {
					Zc: {},
					x1: {}
				};
				t.push(j);
				I += 4;
				I += jO.V$(d, j.Zc, I);
				I += 4;
				I += jO.V$(d, j.x1, I);
				I = D + F;
				var H = j.x1.Lefx;
				if (H) {
					if (H.v.masterFXSwitch == null) H.v.masterFXSwitch = {
						t: "bool",
						v: !0
					};
					ia.sB(H.v)
				}
			}
			I = g + n
		} else {
			console.log(d.slice(I - 8, I + 64));
			console.log(X.Ko(d, I - 8, 64));
			throw J
		}
	}
	return {
		BF: V,
		yO: b,
		list: G,
		axe: Q,
		RY: t
	}
};

// ToolPresetResource.setName — rename tool preset
cG.Pl = function(l, d) {
	l[0] = d
};

// ToolPresetResource.exportToBuffer — preset list → .tpl file bytes
cG.IN = function(l) {
	var d = new GrowableByteBuffer,
		G = 0;
	X.zr(d, G, "8BTP");
	G += 4;
	X._b(d, G, 3);
	G += 4;
	X._b(d, G, 1);
	G += 4;
	var b = [l.yO, l.BF, l.list];
	for (var A = 0; A < 3; A++) {
		if (b[A].length == 0) continue;
		X.zr(d, G, "8BIM");
		G += 4;
		var V = ["tppa", "tpbd", "tptp"][A];
		X.zr(d, G, V);
		G += 4;
		var Q = G;
		G += 4;
		if (V == "tppa") {
			G = fv.WQ(d, G, l.yO)
		} else if (V == "tpbd") {
			G = d3.sD(d, G, l.BF)
		} else if (V == "tptp") {
			X._b(d, G, l.list.length);
			G += 4;
			for (var t = 0; t < l.list.length; t++) {
				var I = l.list[t];
				X.ZI(d, G, I[0] + "\0");
				G += 6 + I[0].length * 2;
				X._b(d, G, 16);
				G += 4;
				G += jO.TH(d, I[1], G)
			}
		}
		X._b(d, Q, G - Q - 4);
		while ((G & 3) != 0) G++;
		d.ensureCapacity(G, 0)
	}
	return d.data.slice(0, G).buffer
};


// iZ - LutProfileResource (Color Lookup LUT/ICC profile resource handler)
function iZ() {}
const LutProfileResource = iZ;

// LutProfileResource.importFromBuffer — parse .cube/.3dl/.look/.icc → Color Lookup descriptor
iZ.Cd = function(l, d) {
	var G = new Uint8Array(l),
		b;
	if (X.q(G, 0) == G.length) b = "icc";
	else if (G[0] == "<".charCodeAt(0)) b = "look";
	else if (X.dp(G, "LUT_3D_SIZE") != -1) b = "cube";
	else b = "3DL";
	if (b != "icc") {
		var V = iZ.am6(G, b),
			Q = iZ.axc(V[0], V[1]);
		G = Q
	}
	var t = [];
	for (var A = 0; A < G.length; A++) t.push(G[A]);
	return [{
		classID: "null",
		Dthr: {
			t: "bool",
			v: !0
		},
		Nm: {
			t: "TEXT",
			v: d ? d : "file.icc"
		},
		lookupType: {
			t: "enum",
			v: {
				colorLookupType: "abstractProfile"
			}
		},
		profile: {
			t: "tdta",
			v: t
		}
	}]
};

// LutProfileResource.exportToBuffer — descriptor → raw ICC profile bytes
iZ.IN = function(l) {
	var d = l[0],
		G = new Uint8Array(d.profile.v);
	return G.buffer
};

// LutProfileResource.setName — rename profile (Nm field)
iZ.Pl = function(l, d) {
	l.Nm.v = d
};

// LutProfileResource.buildIccFromLut — wrap 3D LUT grid as synthetic ICC profile (A2B0 table)
iZ.axc = function(l, d) {
	var G = new GrowableByteBuffer,
		b = 128;
	G.ensureCapacity(0, 128);
	var V = [0, 0, 14, 204, 65, 68, 66, 69, 4, 0, 0, 0, 108, 105, 110, 107, 82, 71, 66, 32, 82, 71, 66, 32, 7, 227, 0, 7, 0, 27, 0, 8, 0, 6, 0, 49, 97, 99, 115, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 246, 214, 0, 1, 0, 0, 0, 0, 211, 45, 65, 68, 66, 69, 219, 126, 245, 21, 206, 223, 186, 23, 165, 212, 201, 219, 250, 10, 33, 62];
	for (var A = 0; A < V.length; A++) G.data[A] = V[A];
	var Q = ["desc", "A2B0"],
		t = Q.length,
		I = 128 + 4 + t * 12;
	X._b(G, b, t);
	b += 4;
	for (var y = 0; y < t; y++) {
		var e = Q[y];
		X.zr(G, b, e);
		b += 4;
		X._b(G, b, I);
		b += 4;
		var M = I;
		if (e == "desc") {
			X.zr(G, M, "mluc");
			M += 4;
			M += 4;
			X._b(G, M, 1);
			M += 4;
			X._b(G, M, 12);
			M += 4;
			X.zr(G, M, "enUS");
			M += 4;
			var R = "ICC by Photopea\0",
				J = R.length * 2 + 2;
			X._b(G, M, J);
			M += 4;
			X._b(G, M, 28);
			M += 4;
			G.ensureCapacity(M, J);
			for (var A = 0; A < R.length; A++) G.data[M + A * 2 + 1] = R.charCodeAt(A);
			M += J
		}
		if (e == "A2B0") {
			X.zr(G, M, "mAB ");
			M += 4;
			M += 4;
			G.ensureCapacity(M, 4);
			G.data[M] = 3;
			G.data[M + 1] = 3;
			M += 4;
			G.ensureCapacity(M, 4 * 5);
			M += 4 * 3;
			X._b(G, M, M + 8 - I);
			M += 4;
			M += 4;
			G.ensureCapacity(M, 20);
			G.data[M] = l;
			G.data[M + 1] = l;
			G.data[M + 2] = l;
			M += 16;
			G.data[M] = 2;
			M += 4;
			var n = l * l * l * 3;
			G.ensureCapacity(M, n * 2);
			for (var A = 0; A < n; A++) X.fh(G.data, M + A * 2, Math.max(0, Math.min(65535, Math.round(d[A] * 65535))));
			M += n * 2
		}
		var r = M - I;
		while ((r & 3) != 0) r++;
		X._b(G, b, r);
		b += 4;
		I += r
	}
	X._b(G, 0, I);
	return G.data.slice(0, I)
};

// LutProfileResource.parseLutFile — parse CUBE / 3DL / LOOK text → [gridSize, rgbSamples]
iZ.am6 = function(l, d) {
	d = "LUTFormat" + d.toUpperCase();
	var G = [],
		b = 0,
		V = X.Kw(l, 0, l.length),
		Q = "";
	for (var A = 0; A < l.length && Q == ""; A++) {
		if (l[A] == 10) Q = "\n";
		else if (l[A] == 13) {
			Q = "\r";
			if (l[A + 1] == 10) Q += "\n"
		}
	}
	if (d == "LUTFormatCUBE") {
		var t = V.split(Q);
		for (var A = 0; A < t.length; A++) {
			if (t[A] == "" || t[A][0] == "#") continue;
			var I = t[A].split(" "),
				y = I[0];
			if (y == "LUT_3D_SIZE") {
				b = parseInt(I[1]);
				continue
			}
			if (["TITLE", "DOMAIN_MIN", "DOMAIN_MAX"].indexOf(y) != -1) continue;
			G.push(parseFloat(I[0]), parseFloat(I[1]), parseFloat(I[2]))
		}
		G = iZ.Rs(b, G)
	} else if (d == "LUTFormat3DL") {
		var t = V.split(Q),
			e = 1 / 4095;
		for (var A = 0; A < t.length; A++) {
			var M = t[A];
			if (M == "" || M == "3DMESH" || M.startsWith("Mesh") || M[0] == "#") continue;
			var I = M.split(" "),
				y = I[0];
			if (b == 0) {
				b = I.length;
				continue
			}
			G.push(parseFloat(I[0]) * e, parseFloat(I[1]) * e, parseFloat(I[2]) * e)
		}
	} else if (d == "LUTFormatLOOK") {
		var R = new DOMParser,
			J = R.parseFromString(V, "text/xml"),
			n = J.getElementsByTagName("LUT")[0],
			r = n.children[0].textContent;
		b = parseInt(JSON.parse(r));
		var T = n.children[1].textContent;
		T = T.replace(/"/g, "").replace(/\s/g, "");
		var j = 3 * b * b * b,
			g = j * 4,
			Y = new Uint8Array(g);
		for (var A = 0; A < g; A++) {
			var k = T.charCodeAt(A * 2),
				F = T.charCodeAt(A * 2 + 1),
				D = k < 58 ? k - 48 : k - 55,
				q = F < 58 ? F - 48 : F - 55;
			Y[A] = (D << 4) + q
		}
		for (var A = 0; A < j; A++) G.push(X.kY(Y, A << 2));
		G = iZ.Rs(b, G)
	} else throw d;
	return [b, G]
};

// LutProfileResource.exportToCube — LUT rgb samples → .cube file bytes
iZ.aqp = function(l, d, G) {
	var b = ["#Created by www.Photopea.com", "TITLE \"" + G + "\"", "", "#LUT size", "LUT_3D_SIZE " + d, "", "#data domain", "DOMAIN_MIN 0.0 0.0 0.0", "DOMAIN_MAX 1.0 1.0 1.0", "", "#LUT data points"],
		V = 6;
	for (var A = 0; A < l.length; A += 3) {
		b.push(l[A].toFixed(V) + " " + l[A + 1].toFixed(V) + " " + l[A + 2].toFixed(V))
	}
	b.push("");
	return X.zE(b.join("\n")).buffer
};

// LutProfileResource.reorderLutAxes — remap CUBE axis order to internal LUT grid order
iZ.Rs = function(l, d) {
	var G = [],
		b = l * l * l;
	for (var A = 0; A < b; A++) G.push(0, 0, 0);
	for (var V = 0; V < l; V++)
		for (var Q = 0; Q < l; Q++)
			for (var t = 0; t < l; t++) {
				var A = 3 * (t + Q * l + V * l * l),
					I = 3 * (V + Q * l + t * l * l);
				G[I] = d[A];
				G[I + 1] = d[A + 1];
				G[I + 2] = d[A + 2]
			}
	return G
};


// jO - ActionDescriptorCodec (Adobe ActionDescriptor binary read/write)
function jO() {}
// ActionDescriptorCodec.readDescriptor — parse ActionDescriptor from buffer at offset
jO.V$ = function(l, d, G, b, V) {
	var Q = G,
		t;
	if (V == null) V = 0;
	var I = X.q(l, G);
	if (I == 0) {
		t = "";
		G += 4
	} else {
		t = X.zf(l, G);
		G += 4 + 2 * t.length + 2
	}
	if (t != "") d.__name = t;
	d.classID = jO.eE(l, G);
	if (b) console.log("\t".repeat(V), "- reading descriptor", d.classID, G);
	G += jO.Hl(l, G);
	var y = X.YU(l, G);
	G += 4;
	for (var A = 0; A < y; A++) {
		var e = jO.eE(l, G);
		G += jO.Hl(l, G);
		var M = jO.Hd(l, G, b, V);
		d[e] = M;
		G += M.size;
		delete M.size
	}
	return G - Q
};

// ActionDescriptorCodec.writeDescriptor — serialize ActionDescriptor to GrowableByteBuffer
jO.TH = function(l, d, G, b) {
	var V = G,
		Q = d.__name;
	if (Q == null) Q = "";
	Q += "\0";
	X.ZI(l, G, Q);
	G += 4 + 2 * Q.length;
	jO.Dr(l, G, d.classID);
	G += jO.Hl(l.data, G);
	X.Kl(l, G, Object.keys(d).length - 1 - (d.__name == null ? 0 : 1));
	G += 4;
	for (var t in d) {
		if (t == "classID") continue;
		if (t == "__name") continue;
		jO.Dr(l, G, t);
		G += jO.Hl(l.data, G);
		G += jO.Fo(l, G, d[t])
	}
	return G - V
};

// ActionDescriptorCodec.readValue — read one typed descriptor value (obj/doub/bool/…)
jO.Hd = function(l, d, G, b) {
	var V = d,
		Q = X.Ko(l, d, 4);
	d += 4;
	var t = {
		size: 0,
		t: Q,
		v: null
	};
	if (G) console.log("\t".repeat(b), "reading key", Q, V);
	switch (Q) {
		case "obj ":
		case "VlLs":
			t.v = [];
			var I = X.q(l, d);
			d += 4;
			for (var A = 0; A < I; A++) {
				var y = jO.Hd(l, d, G, b + 1);
				d += y.size;
				delete y.size;
				t.v.push(y)
			}
			break;
		case "UntF":
			t.v = {
				type: X.Ko(l, d, 4),
				val: X.o_(l, d + 4)
			};
			d += 12;
			break;
		case "doub":
			t.v = X.o_(l, d);
			d += 8;
			break;
		case "bool":
			t.v = l[d] == 1;
			d += 1;
			break;
		case "long":
			t.v = X.YU(l, d);
			d += 4;
			break;
		case "comp":
			t.v = X.YU(l, d + 4);
			d += 8;
			break;
		case "Objc":
			t.v = {};
			var e = jO.V$(l, t.v, d, G, b + 1);
			d += e;
			break;
		case "TEXT":
			var M = X.q(l, d);
			if (M == 0) {
				t.v = "";
				d += 4
			} else {
				t.v = X.zf(l, d);
				d += 4 + t.v.length * 2 + 2
			}
			break;
		case "enum":
			var R = jO.eE(l, d);
			d += jO.Hl(l, d);
			var J = jO.eE(l, d);
			d += jO.Hl(l, d);
			t.v = {};
			t.v[R] = J;
			break;
		case "tdta":
			var n = X.YU(l, d);
			d += 4;
			t.v = [];
			for (var A = 0; A < n; A++) t.v.push(l[d + A]);
			d += n;
			break;
		case "ObAr":
			var r = X.q(l, d);
			d += 4;
			var T = X.zf(l, d);
			d += 4 + 2 * T.length + 2;
			if (T != "") throw T;
			var j = jO.eE(l, d);
			d += 4 + Math.max(4, j.length);
			t.v = {
				classID: j,
				arr: []
			};
			var g = X.q(l, d);
			d += 4;
			for (var A = 0; A < g; A++) {
				var j = jO.eE(l, d);
				d += 4 + Math.max(4, j.length);
				var R = X.Ko(l, d, 4);
				d += 4;
				var Y = X.Ko(l, d, 4);
				d += 4;
				var k = {
					id: j,
					type: R,
					uID: Y,
					arr: []
				};
				t.v.arr.push(k);
				var F = X.q(l, d, 4);
				d += 4;
				for (var D = 0; D < F; D++) {
					var q = X.o_(l, d);
					d += 8;
					k.arr.push(q)
				}
			}
			break;
		case "Pth ":
			var H = d,
				n = X.q(l, d);
			d += 4;
			var W = X.Ko(l, d, 4);
			d += 4;
			var Z = X.Lv(l, d);
			d += 4;
			var B = X.aza(l, d);
			d += 4 + B.length * 2;
			t.v = {
				sig: W,
				pth: B
			};
			break;
		case "Clss":
		case "type":
		case "rele":
			var B = X.zf(l, d);
			d += 4 + B.length * 2 + 2;
			var a = jO.eE(l, d);
			d += 4 + Math.max(4, a.length);
			t.v = {
				classID: a
			};
			if (B != "") t.v.__name = B;
			if (Q == "rele") {
				t.v.val = X.YU(l, d);
				d += 4
			}
			break;
		case "prop":
		case "Enmr":
		case "indx":
		case "name":
		case "Idnt":
			var m = jO.fX[Q],
				B = X.zf(l, d);
			d += 4 + B.length * 2 + 2;
			if (B.length != 0) {
				console.log(Q, B);
				throw "e"
			}
			t.v = {};
			for (var A = 0; A < m.length; A++) {
				var a = jO.eE(l, d);
				d += 4 + Math.max(4, a.length);
				t.v[m[A]] = a
			}
			if (Q == "name") {
				var B = X.zf(l, d);
				d += 4 + B.length * 2 + 2;
				t.v.val = B
			}
			if (Q == "indx" || Q == "Idnt") {
				t.v.val = X.q(l, d);
				d += 4
			}
			break;
		case "alis":
			var n = X.q(l, d);
			d += 4;
			t.v = X.Ko(l, d, n);
			d += n;
			break;
		default:
			{
				console.log("unknown oskey: " + Q + ", " + V);
				throw "e";
				return t
			}
	}
	if (G) {
		console.log("\t".repeat(b), t.v);
		console.log("\t".repeat(b), "======", d)
	}
	t.size = d - V;
	return t
};

jO.fX = {
	name: ["classID"],
	prop: ["classID", "keyID"],
	Enmr: ["classID", "typeID", "enum"],
	indx: ["classID"],
	Idnt: ["classID"]
};

// ActionDescriptorCodec.writeValue — write one typed descriptor value
jO.Fo = function(l, d, G) {
	var b = d,
		V = G.t;
	G = G.v;
	X.zr(l, d, V);
	d += 4;
	switch (V) {
		case "obj ":
		case "VlLs":
			X.Kl(l, d, G.length);
			d += 4;
			for (var Q = 0; Q < G.length; Q++) {
				var t = jO.Fo(l, d, G[Q]);
				d += t
			}
			break;
		case "UntF":
			X.zr(l, d, G.type);
			X.j_(l, d + 4, G.val);
			d += 12;
			break;
		case "doub":
			X.j_(l, d, G);
			d += 8;
			break;
		case "bool":
			X.s8(l, d, G ? 1 : 0, 1);
			d += 1;
			break;
		case "long":
			X.Kl(l, d, G);
			d += 4;
			break;
		case "comp":
			X.Kl(l, d + 4, G);
			d += 8;
			break;
		case "Objc":
			var t = jO.TH(l, G, d);
			d += t;
			break;
		case "TEXT":
			X.ZI(l, d, G + "\0");
			d += 4 + G.length * 2 + 2;
			break;
		case "enum":
			var I = Object.keys(G)[0],
				y = G[I];
			jO.Dr(l, d, I);
			d += jO.Hl(l.data, d);
			jO.Dr(l, d, y);
			d += jO.Hl(l.data, d);
			break;
		case "tdta":
			X._b(l, d, G.length);
			d += 4;
			X.i7(l, d, G);
			d += G.length;
			break;
		case "ObAr":
			X._b(l, d, G.arr[0].arr.length);
			d += 4;
			X.ZI(l, d, "\0");
			d += 6;
			jO.Dr(l, d, G.classID);
			d += 4 + Math.max(4, G.classID.length);
			X._b(l, d, G.arr.length);
			d += 4;
			for (var A = 0; A < G.arr.length; A++) {
				var e = G.arr[A];
				jO.Dr(l, d, e.id);
				d += 4 + Math.max(4, e.id.length);
				X.zr(l, d, e.type);
				d += 4;
				X.zr(l, d, e.uID);
				d += 4;
				X._b(l, d, e.arr.length);
				d += 4;
				for (var Q = 0; Q < e.arr.length; Q++) {
					X.j_(l, d, e.arr[Q]);
					d += 8
				}
			}
			break;
		case "Pth ":
			var M = G.pth.length * 2 + 4 + 8;
			X._b(l, d, M);
			d += 4;
			X.zr(l, d, G.sig);
			d += 4;
			X.zU(l, d, M);
			d += 4;
			X.a2D(l, d, G.pth);
			d += G.pth.length * 2 + 4;
			break;
		case "Clss":
		case "type":
		case "rele":
			var R = G.__name;
			if (R == null) R = "";
			X.ZI(l, d, R + "\0");
			d += 4 + R.length * 2 + 2;
			var J = G.classID;
			jO.Dr(l, d, J);
			d += 4 + Math.max(4, J.length);
			if (V == "rele") {
				X.Kl(l, d, G.val);
				d += 4
			}
			break;
		case "prop":
		case "Enmr":
		case "indx":
		case "name":
		case "Idnt":
			var n = jO.fX[V];
			X._b(l, d, 1);
			d += 6;
			for (var A = 0; A < n.length; A++) {
				var J = G[n[A]];
				jO.Dr(l, d, J);
				d += 4 + Math.max(4, J.length)
			}
			if (V == "name") {
				X.ZI(l, d, G.val + "\0");
				d += 4 + G.val.length * 2 + 2
			}
			if (V == "indx" || V == "Idnt") {
				X._b(l, d, G.val);
				d += 4
			}
			break;
		case "alis":
			var M = G.length;
			X._b(l, d, M);
			d += 4;
			X.zr(l, d, G);
			d += M;
			break;
		default:
			console.log("unknown oskey: " + V);
			d = b;
			break
	}
	return d - b
};

// ActionDescriptorCodec.readFourCharId — read 4-char type/class ID (padded ASCII)
jO.eE = function(l, d) {
	var G = X.YU(l, d);
	if (G > 1e3) throw "e";
	if (G == 0) G = 4;
	return X.Ko(l, d + 4, G).trim()
};

// ActionDescriptorCodec.fourCharIdLength — byte length of padded 4-char ID field
jO.Hl = function(l, d) {
	var G = X.YU(l, d);
	return G == 0 ? 8 : 4 + G
};

// ActionDescriptorCodec.writeFourCharId — write padded 4-char ID
jO.Dr = function(l, d, G) {
	var b = "warp list Comp None xx xy yx yy tx ty PinP PnRt PnOv PnDp xor PuX0 PuX1 PuX2 PuX3 PuY0 PuY1 PuY2 PuY3 base kana ruby box flow time hold trim then else".split(" "),
		V = 4 < G.length || b.indexOf(G) != -1;
	X.Kl(l, d, V ? G.length : 0);
	X.zr(l, d + 4, G);
	if (G.length < 4 && !V) {
		var Q = "";
		for (var A = G.length; A < 4; A++) Q += " ";
		X.zr(l, d + 4 + G.length, Q)
	}
};

// ActionDescriptorCodec.cloneDescriptor — deep clone ActionDescriptor tree
jO.axD = function(l) {
	var d = {};
	for (var G in l) {
		if (G == "classID") d[G] = l[G];
		else if (G == "__name") d[G] = l[G];
		else d[G] = jO.aAb(l[G])
	}
	return d
};

// ActionDescriptorCodec.unwrapValue — extract raw .v from typed descriptor node
jO.aAb = function(l) {
	if (l.sA == "Objc") return jO.axD(l.v);
	else if (l.sA == "VlLs") {
		var d = [];
		for (var A = 0; A < l.v.length; A++) d.push(jO.aAb(l.v[A]));
		return d
	} else if (l.sA == "UntF") return l.v.val;
	else return l.v
};


// ia - LayerAdditionalInfoParser (PSD layer extra data / tagged blocks parser)
function ia() {}
// LayerAdditionalInfoParser.readLayerInfo — parse 8BIM tagged blocks into layer.add
ia.ajh = function(l, d, G, b, V, Q) {
	while (d < G) {
		var t = X.Ko(l, d, 4);
		d += 4;
		if (t != "8BIM" && t != "8B64") {
			console.log("layer information signature error! " + t, "PSB = " + V);
			alert("Error in PSD file: wrong signature.");
			return G
		}
		var I = X.Ko(l, d, 4);
		d += 4;
		var y = X.q(l, d);
		d += 4;
		var e = V && "LMsk Lr16 Lr32 Layr Mt16 Mt32 Mtrn Alph FMsk lnk2 lnkE FEid FXid PxSD extn cinf artd pths".split(" ").indexOf(I) != -1;
		if (e) {
			y = y << 32 | X.YU(l, d);
			d += 4
		}
		var M = ["lrFX", "PlLd"];
		if (M.indexOf(I) != -1) {
			if (y % 4 != 0) y += 4 - y % 4;
			d += y;
			continue
		}
		switch (I) {
			case "iOpa":
				b[I] = l[d];
				break;
			case "brst":
				b[I] = [1, 1, 1];
				for (var A = 0; A < y; A += 4) b[I][X.q(l, d + A)] = 0;
				break;
			case "knko":
				b[I] = l[d];
				break;
			case "infx":
				b[I] = l[d];
				break;
			case "clbl":
				b[I] = l[d];
				break;
			case "lmgm":
				b[I] = l[d];
				break;
			case "vmgm":
				b[I] = l[d];
				break;
			case "fcmy":
				b[I] = l[d];
				break;
			case "lyid":
				b[I] = X.q(l, d);
				break;
			case "lsct":
				b[I] = {
					type: X.q(l, d)
				};
				if (y >= 12) b[I].blendModeKey = X.Ko(l, d + 8, 4);
				break;
			case "lsdk":
				b.lsct = {
					type: X.q(l, d)
				};
				break;
			case "lyvr":
				b[I] = X.q(l, d);
				break;
			case "lnsr":
				var R = {
					artb: 1,
					bgnd: 1,
					cont: 1,
					layr: 1,
					lset: 1,
					rend: 1,
					shap: 1,
					user: 1,
					____: null
				};
				b[I] = X.Ko(l, d, 4);
				break;
			case "lspf":
				b[I] = X.q(l, d);
				break;
			case "lclr":
				b[I] = X.TD(l, d);
				break;
			case "luni":
				b[I] = X.RP(l, d);
				break;
			case "fxrp":
				b[I] = new Point2D(X.o_(l, d), X.o_(l, d + 8));
				break;
			case "artb":
			case "artd":
				b[I] = {};
				jO.V$(l, b[I], d + 4);
				break;
			case "SoCo":
				b[I] = {};
				jO.V$(l, b[I], d + 4);
				break;
			case "GdFl":
				b[I] = {};
				jO.V$(l, b[I], d + 4);
				ia.Bp(b[I], I);
				break;
			case "PtFl":
				b[I] = {};
				jO.V$(l, b[I], d + 4);
				ia.Bp(b[I], I);
				break;
			case "CgEd":
				b[I] = {};
				jO.V$(l, b[I], d + 4);
				break;
			case "brit":
				var J = b.brit = FilterHelper.oT("brit"),
					n = {};
				J.Brgh.v = X.Ar(l, d);
				J.Cntr.v = X.Ar(l, d + 2);
				J.useLegacy.v = !0;
				break;
			case "levl":
				var r = l.buffer.slice(d, d + y);
				b[I] = hg.Cd(r);
				break;
			case "curv":
				b[I] = cb.nj(l, d, y);
				break;
			case "expA":
				var T = X.TD(l, d),
					j = b[I] = FilterHelper.oT("expA");
				j.Exps.v = X.f_(l, d + 2);
				j.Ofst.v = X.f_(l, d + 6);
				j.gammaCorrection.v = X.f_(l, d + 10);
				break;
			case "vibA":
				b[I] = {};
				jO.V$(l, b[I], d + 4);
				break;
			case "hue2":
				b[I] = d8.nj(l, d, y);
				break;
			case "blnc":
				var j = b[I] = FilterHelper.oT(I);
				j.PrsL.v = l[d + 18] == 1;
				var g = ["ShdL", "MdtL", "HghL"];
				for (var A = 0; A < 3; A++)
					for (var Y = 0; Y < 3; Y++) j[g[A]].v[Y].v = X.Ar(l, d + A * 6 + Y * 2);
				break;
			case "blwh":
				var k = {};
				jO.V$(l, k, d + 4);
				var j = FilterHelper.oT(I),
					F = "Bl Cyn Grn Mgnt Rd Yllw tintColor useTint".split(" ");
				for (var A = 0; A < F.length; A++) {
					j[F[A]] = k[F[A]];
					delete k[F[A]]
				}
				b[I] = j;
				break;
			case "phfl":
				var j = b[I] = FilterHelper.oT(I),
					D = j.Clr.v,
					T = X.TD(l, d);
				if (T == 3) {
					var q = [X.q(l, d + 2), X.q(l, d + 6), X.q(l, d + 10)],
						H = 32768,
						W = PixelUtil.xyzToLab(q[0] / H, q[1] / H, q[2] / H);
					D.Lmnc.v = W.Hm;
					D.A.v = W.aS;
					D.B.v = W.k
				}
				if (T == 2) {
					var Z = X.TD(l, d + 2);
					if (Z != 7) throw "e";
					D.Lmnc.v = X.Ar(l, d + 4) / 100;
					D.A.v = X.Ar(l, d + 6) / 100;
					D.B.v = X.Ar(l, d + 8) / 100
				}
				var B = d + 2 + (T == 3 ? 12 : 10);
				j.Dnst.v = X.q(l, B);
				B += 4;
				j.PrsL.v = l[B] == 1;
				break;
			case "mixr":
				var a = {
					Mo: X.TD(l, d + 2) == 1,
					Z: []
				};
				for (var A = 0; A < 20; A++) a.Z.push(X.Ar(l, d + 4 + A * 2));
				b[I] = LayerEffectsHelper.buildChannelMixerDescriptor(a);
				break;
			case "clrL":
			case "rplc":
				b[I] = {};
				jO.V$(l, b[I], d + 6);
				break;
			case "nvrt":
				b[I] = {};
				break;
			case "post":
				b[I] = FilterHelper.oT("post");
				b[I].Lvls.v = X.TD(l, d);
				break;
			case "thrs":
				b[I] = FilterHelper.oT("thrs");
				b[I].Lvl.v = X.TD(l, d);
				break;
			case "grdm":
				var m = d,
					p = l[d + 2] == 1,
					c = l[d + 3] == 1;
				m += 4;
				var v = X.Ko(l, m, 4);
				if (v == "Perc" || v == "Gcls" || v == "Lnr ") m += 4;
				var i = X.RP(l, m);
				m += 4 + i.length * 2;
				var z = eu.l3(l, m, i),
					P = z[0];
				m = z[1];
				var C = X.TD(l, m);
				m += 2;
				var h = X.q(l, m);
				m += 4;
				var L = X.TD(l, m) == 1;
				m += 2;
				var U = X.TD(l, m) == 1;
				m += 2;
				var S = X.q(l, m);
				m += 4;
				var E = X.TD(l, m);
				m += 2;
				var x = [],
					K = [];
				for (var A = 0; A < 4; A++) {
					x.push({
						t: "long",
						v: ~~(X.TD(l, m + A * 2) * 100 / 32768)
					});
					K.push({
						t: "long",
						v: ~~(X.TD(l, m + A * 2 + 8) * 100 / 32768)
					})
				}
				m += 16;
				var u = X.TD(l, m);
				m += 2;
				if (C == 1) P = {
					classID: "Grdn",
					Nm: {
						t: "TEXT",
						v: i
					},
					GrdF: {
						t: "enum",
						v: {
							GrdF: "ClNs"
						}
					},
					ShTr: {
						t: "bool",
						v: L
					},
					VctC: {
						t: "bool",
						v: U
					},
					ClrS: {
						t: "enum",
						v: {
							ClrS: "RGBC"
						}
					},
					RndS: {
						t: "long",
						v: h
					},
					Smth: {
						t: "long",
						v: S
					},
					Mnm: {
						t: "VlLs",
						v: x
					},
					Mxm: {
						t: "VlLs",
						v: K
					}
				};
				var bC = FilterHelper.oT("grdm");
				bC.Rvrs.v = p;
				bC.Grad.v = P;
				b[I] = bC;
				break;
			case "selc":
				b[I] = iX.nj(l, d, y);
				break;
			case "vmsk":
			case "vsms":
				var O = b.vmsk = new LayerRecord.VectorMask,
					$ = X.YU(l, d + 4),
					gX = ($ >> 0 & 1) == 1;
				O.cv = ($ >> 1 & 1) == 0;
				O.isEnabled = ($ >> 2 & 1) == 0;
				O.i = eU.xv(l, d + 8, y - 8, Q.m, Q.n);
				break;
			case "shmd":
				b[I] = {};
				var _ = X.q(l, d),
					B = d + 4;
				for (var A = 0; A < _; A++) {
					var t = X.Ko(l, B, 4);
					B += 4;
					var jI = X.Ko(l, B, 4);
					B += 4;
					var iw = l[B];
					B++;
					if (Math.max(l[B], l[B + 1]) != 0) throw "e";
					B += 3;
					var hn = X.q(l, B);
					B += 4;
					if (jI == "cust" || jI == "cmls" || jI == "extn" || jI == "mlst") {
						var jq = X.q(l, B);
						if (jq != 16) B += 4;
						if (X.q(l, B) == 16) {
							var k = {};
							jO.V$(l, k, B + 4, !1);
							b[I][jI] = k;
							if (jI == "cmls") f.hE.alO(b[I][jI])
						}
					} else {
						console.log("unknown shmd key: " + jI + ", size: " + hn)
					}
					B += hn
				}
				break;
			case "shpa":
				var T = X.q(l, d),
					iv = X.q(l, d + 4);
				if (iv != 0) console.log("some patterns present!");
				break;
			case "TySh":
				var kq = b[I] = {},
					T = X.TD(l, d);
				kq.D = X.Aw(l, d + 2);
				var eE = X.TD(l, d + 2 + 48);
				kq.wi = {};
				try {
					var e8 = jO.V$(l, kq.wi, d + 56)
				} catch (dk) {
					b[I] = null;
					break
				}
				var aI = dt.a8f();
				for (var dK in aI)
					if (kq.wi[dK] == null) kq.wi[dK] = aI[dK];
				kq.R8 = {};
				var jC = jO.V$(l, kq.R8, d + 56 + e8 + 6);
				kq.xZ = X.a1D(l, d + 56 + e8 + 6 + jC);
				kq.zC = gS.Cd(kq.wi.EngineData.v);
				dt.alx(kq.zC.EngineDict.StyleRun.RunArray);
				if (kq.zC.ResourceDict == null) kq.zC.ResourceDict = JSON.parse(JSON.stringify(kq.zC.DocumentResources));
				delete kq.wi.EngineData;
				break;
			case "lfx2":
			case "lmfx":
			case "lfxs":
				var d7 = X.q(l, d),
					ka = X.q(l, d + 4);
				b.lmfx = {};
				var e8 = jO.V$(l, b.lmfx, d + 8);
				ia.sB(b.lmfx);
				break;
			case "FMsk":
				b[I] = X.lK(l, d, y);
				break;
			case "Txt2":
				b[I] = {};
				b[I].raw = X.lK(l, d, y);
				b[I].lD = i0.Cd(b[I].raw);
				break;
			case "Patt":
				b[I] = fv.V_(l, d, y);
				break;
			case "SoLd":
				var hS = X.Ko(l, d, 4),
					eH = X.q(l, d + 4),
					kA = X.q(l, d + 8);
				b[I] = {};
				var gq = jO.V$(l, b[I], d + 12);
				if (b[I].nonAffineTransform == null) b[I].nonAffineTransform = JSON.parse(JSON.stringify(b[I].Trnf));
				if (b[I].Impr == null) b[I].Impr = {
					t: "Objc",
					v: {
						__name: "None",
						classID: "none"
					}
				};
				break;
			case "vstk":
			case "pths":
				var eH = X.q(l, d);
				b[I] = {};
				var gq = jO.V$(l, b[I], d + 4);
				break;
			case "vscg":
				var jI = X.Ko(l, d, 4),
					eH = X.q(l, d + 4);
				b[jI] = {};
				var gq = jO.V$(l, b[jI], d + 8);
				ia.Bp(b[jI], jI);
				break;
			case "vogk":
				var hb = X.q(l, d),
					eH = X.q(l, d + 4);
				b[I] = {};
				var gq = jO.V$(l, b[I], d + 8);
				b[I] = b[I].keyDescriptorList.v;
				for (var A = 0; A < b[I].length; A++) {
					var ex = b[I][A].v;
					if (!PixelUtil.X.TJ(ex)) continue;
					if (ex.keyOriginBoxCorners == null) {
						var fs = PixelUtil.X.xb(ex);
						ex.keyOriginBoxCorners = {
							t: "Objc",
							v: {
								classID: "null"
							}
						};
						var f_ = [fs[0], fs[1], fs[2], fs[1], fs[2], fs[3], fs[0], fs[3]];
						if (ex.keyOriginType.v == 4) f_ = PixelUtil.X.YK(PixelUtil.X.ik(ex), ex.keyOriginLineWeight.v);
						PixelUtil.X.Af(ex, "keyOriginBoxCorners", f_)
					}
				}
				break;
			case "lnk2":
			case "lnkD__":
			case "lnk3__":
				b[I] = [];
				var m = d;
				while (m < d + y) {
					var bD = new LayerRecord.aA;
					b[I].push(bD);
					var ae = X.fD(l, m);
					m += 8;
					var em = m;
					bD.type = X.Ko(l, m, 4);
					m += 4;
					if (bD.type != "liFD") {
						alert("Unknown Linked Layer type: " + bD.type);
						break;
						throw bD.type
					}
					bD.X7 = X.q(l, m);
					m += 4;
					var dY = X.Qh(l, m);
					m += 1 + dY.ip.length;
					bD.AN = dY.ip;
					bD.bf = X.zf(l, m);
					m += 4 + bD.bf.length * 2 + 2;
					bD.hA = X.Ko(l, m, 4);
					m += 4;
					bD.Rr = X.Ko(l, m, 4);
					m += 4;
					var f7 = X.fD(l, m);
					m += 8;
					bD.open = l[m];
					m += 1;
					if (bD.open != 0) {
						var bM = {},
							e8 = jO.V$(l, bM, m + 4);
						if (e8 % 4 != 0) e8 += 4 - e8 % 4;
						console.log(bM);
						m += e8 + 4
					}
					bD.open = 0;
					bD.raw = X.lK(l, m, f7);
					m = em + ae;
					if (ae % 4 != 0) m += 4 - ae % 4
				}
				break;
			case "FEid":
				var m = d;
				b[I] = [];
				var iP = m + y,
					T = X.q(l, m);
				m += 4;
				while (m < iP) {
					m += 4;
					var ae = X.q(l, m);
					m += 4;
					var z = {};
					b[I].push(z);
					z.id = X.Qh(l, m).ip;
					m += z.id.length + 1;
					var T = X.q(l, m);
					m += 4;
					m += 4;
					var jp = X.q(l, m);
					m += 4;
					z.rect = X.NK(l, m);
					m += 16;
					var hG = X.q(l, m);
					m += 4;
					var hf = X.q(l, m);
					m += 4;
					var d2 = new WebGLContext.RgbaFloatPlanes(0);
					for (var A = 0; A < hf + 2; A++) {
						var gu = X.q(l, m);
						m += 4;
						if (gu != 0) {
							m += 4;
							var jt = X.q(l, m),
								ip = null;
							m += 4;
							if (A < 3 || A == 25) ip = db.C1(!0, hG, l, z.rect.m, z.rect.n, m, jt);
							if (A == 0) d2.o = ip;
							if (A == 1) d2.J = ip;
							if (A == 2) d2.k = ip;
							if (A == 25) d2.aS = ip;
							m += jt
						}
					}
					z.buffer = PixelUtil.allocBytes(z.rect.O() * 4);
					PixelUtil.channelPlanesToRgba(d2, z.buffer);
					PixelUtil.cropRgbaAlphaOpaque(z);
					var aQ = l[m];
					m++;
					if (aQ != 0) {
						z.z = new LayerRecord.LayerMask;
						z.z.rect = X.NK(l, m);
						m += 16;
						m += 4;
						var iL = X.q(l, m);
						m += 4;
						z.z.channel = db.C1(!0, hG, l, z.z.rect.m, z.z.rect.n, m, iL);
						z.z.color = 255;
						z.z.dispose();
						m += iL
					}
					if (ae % 4 != 0) m += 4 - ae % 4
				}
				break;
			case "Lr16":
				c4.C7(Q, l, d);
				break;
			case "Anno":
				b[I] = [];
				var jx = d,
					ep = d + 4,
					iv = X.q(l, ep);
				ep += 4;
				for (var A = 0; A < iv; A++) {
					var ae = X.q(l, ep);
					ep += 4;
					var gz = X.Ko(l, ep, 4);
					ep += 4;
					if (gz != "txtA") throw gz;
					var ed = l[ep++],
						bo = l[ep++],
						d0 = X.TD(l, ep);
					ep += 2;
					var c0 = X.NK(l, ep);
					ep += 16;
					var cv = X.NK(l, ep);
					ep += 16;
					var D = bA.eq(l, ep);
					ep += 10;
					var iH = X.Qh(l, ep);
					ep += iH.length;
					var bS = X.Qh(l, ep);
					ep += bS.length;
					var gg = X.Qh(l, ep);
					ep += gg.length;
					var bG = X.q(l, ep);
					ep += 4;
					var jj = X.Ko(l, ep, 4);
					ep += 4;
					var ay = X.q(l, ep);
					ep += 4;
					var cH = X.tj(l, ep + 2, ay - 2 >> 1);
					ep += ay;
					b[I].push([c0.x, c0.y, D, iH.ip, cH])
				}
				break;
			default:
				break
		}
		var e6 = "Lr16 LMsk Txt2 artd extd luni pths extn tySh lfx2 cinf Anno".split(" ");
		if (e6.indexOf(I) == -1)
			if (y % 4 != 0) console.log("size not multiple of 4!!!", I);
		if (I != "luni" && I != "TySh" && I != "tySh" && I != "lfx2" && I != "iOpa")
			if (y % 4 != 0) y += 4 - y % 4;
		d += y
	}
	var n = b.CgEd;
	if (n) {
		var J = b.brit;
		if (J) {
			J.Brgh.v = n.Brgh ? n.Brgh.v : 0;
			J.Cntr.v = n.Cntr ? n.Cntr.v : 0;
			J.useLegacy.v = n.useLegacy ? n.useLegacy.v : 0
		}
		delete b.CgEd
	}
	var fi = [];
	for (var A = 0; A < fi.length; A++) delete b[fi[A]];
	return d
};

// LayerAdditionalInfoParser.readMergedLayerInfo — parse merged / artboard layer extras
ia.ad0 = function(l, d, G, b, V) {
	for (var Q in G)
		if (G[Q] == null) {
			alert("A bug occured (see console).");
			console.log("Please, report a bug, that \"" + Q + "\" tag was present with a null value.");
			delete G[Q]
		}
	for (var Q in G) {
		var t = b && "LMsk Lr16 Lr32 Layr Mt16 Mt32 Mtrn Alph FMsk lnk2 lnkE FEid FXid PxSD extn cinf artd pths".split(" ").indexOf(Q) != -1,
			y = 0;
		X.zr(l, d, t ? "8B64" : "8BIM");
		d += 4;
		var I = d;
		X.zr(l, d, Q);
		d += 4;
		X.Kl(l, d, 0);
		d += t ? 8 : 4;
		switch (Q) {
			case "iOpa":
				X.s8(l, d, G[Q], 1);
				y = 4;
				break;
			case "brst":
				y = 0;
				for (var A = 0; A < 3; A++)
					if (G[Q][A] == 0) {
						X._b(l, d + y, A);
						y += 4
					}
				break;
			case "knko":
				X.s8(l, d, G[Q], 1);
				y = 4;
				break;
			case "infx":
				X.s8(l, d, G[Q], 1);
				y = 4;
				break;
			case "clbl":
				X.s8(l, d, G[Q], 1);
				y = 4;
				break;
			case "lmgm":
				X.s8(l, d, G[Q], 1);
				y = 4;
				break;
			case "vmgm":
				X.s8(l, d, G[Q], 1);
				y = 4;
				break;
			case "fcmy":
				X.s8(l, d, G[Q], 1);
				y = 4;
				break;
			case "lyid":
				X._b(l, d, G[Q]);
				y = 4;
				break;
			case "lsct":
				X._b(l, d, G[Q].type);
				y = 4;
				if (G[Q].blendModeKey) {
					X.zr(l, d + 4, "8BIM");
					X.zr(l, d + 8, G[Q].blendModeKey);
					y = 12
				}
				break;
			case "lyvr":
				X._b(l, d, G[Q]);
				y = 4;
				break;
			case "lnsr":
				X.zr(l, d, G[Q]);
				y = 4;
				break;
			case "lspf":
				X._b(l, d, G[Q]);
				y = 4;
				break;
			case "lclr":
				X.pg(l, d, G[Q]);
				y = 8;
				break;
			case "luni":
				X.ZI(l, d, G[Q]);
				y = 4 + 2 * G[Q].length;
				break;
			case "fxrp":
				X.j_(l, d, G[Q].x);
				X.j_(l, d + 8, G[Q].y);
				y = 16;
				break;
			case "artb":
			case "artd":
				X._b(l, d, 16);
				y = jO.TH(l, G[Q], d + 4) + 4;
				break;
			case "SoCo":
				X._b(l, d, 16);
				y = jO.TH(l, G[Q], d + 4) + 4;
				break;
			case "GdFl":
				X._b(l, d, 16);
				y = jO.TH(l, G[Q], d + 4) + 4;
				break;
			case "PtFl":
				X._b(l, d, 16);
				y = jO.TH(l, G[Q], d + 4) + 4;
				break;
			case "CgEd":
				var e = {
						classID: "null",
						Vrsn: {
							t: "long",
							v: 1
						},
						Brgh: {
							t: "long",
							v: 24
						},
						Cntr: {
							t: "long",
							v: 54
						},
						means: {
							t: "long",
							v: 127
						},
						Lab: {
							t: "bool",
							v: !1
						},
						useLegacy: {
							t: "bool",
							v: !1
						},
						Auto: {
							t: "bool",
							v: !0
						}
					},
					M = e,
					R = G[Q];
				M.Brgh.v = R.Brgh.v;
				M.Cntr.v = R.Cntr.v;
				M.useLegacy.v = R.useLegacy.v;
				X._b(l, d, 16);
				y = jO.TH(l, e, d + 4) + 4;
				break;
			case "brit":
				l.ensureCapacity(d, 8);
				y = 8;
				break;
			case "levl":
				var J = new GrowableByteBuffer;
				y = hg.IN(J, G[Q]);
				X.i7(l, d, J.data);
				break;
			case "curv":
				y = cb.qJ(l, d, G[Q]);
				break;
			case "expA":
				y = 14;
				l.ensureCapacity(d, 14);
				X.fh(l.data, d, 1);
				X.kf(l.data, d + 2, G[Q].Exps ? G[Q].Exps.v : 0);
				X.kf(l.data, d + 6, G[Q].Ofst ? G[Q].Ofst.v : 0);
				X.kf(l.data, d + 10, G[Q].gammaCorrection ? G[Q].gammaCorrection.v : 1);
				break;
			case "vibA":
				X._b(l, d, 16);
				y = jO.TH(l, G[Q], d + 4) + 4;
				break;
			case "hue2":
				y = d8.qJ(l, d, G[Q]);
				break;
			case "blnc":
				y = 19;
				l.ensureCapacity(d, y);
				var n = ["ShdL", "MdtL", "HghL"];
				for (var A = 0; A < 3; A++) {
					var r = G[Q][n[A]].v;
					for (var T = 0; T < 3; T++) r.push(X.RD(l.data, d + A * 6 + T * 2, r[T].v))
				}
				l.data[d + 18] = G[Q].PrsL.v ? 1 : 0;
				break;
			case "blwh":
				var e = {
						classID: "null",
						bwPresetKind: {
							t: "long",
							v: 1
						},
						blackAndWhitePresetFileName: {
							t: "TEXT",
							v: ""
						}
					},
					j = "Bl Cyn Grn Mgnt Rd Yllw tintColor useTint".split(" ");
				for (var A = 0; A < j.length; A++) {
					e[j[A]] = G[Q][j[A]]
				}
				X._b(l, d, 16);
				y = jO.TH(l, e, d + 4) + 4;
				break;
			case "phfl":
				X.pg(l, d, 2);
				var g = G[Q].Clr.v;
				X.pg(l, d + 2, 7);
				X.pg(l, d + 4, Math.round(g.Lmnc.v * 100));
				X.pg(l, d + 6, Math.round(g.A.v * 100));
				X.pg(l, d + 8, Math.round(g.B.v * 100));
				X.pg(l, d + 10, 0);
				var Y = d + 2 + 10;
				l.ensureCapacity(Y, 5);
				X.m1(l.data, Y, G[Q].Dnst.v);
				Y += 4;
				l.data[Y] = G[Q].PrsL.v ? 1 : 0;
				Y++;
				y = Y - d;
				break;
			case "mixr":
				y = 44;
				l.ensureCapacity(d, y);
				var k = LayerEffectsHelper.parseChannelMixerDescriptor(G[Q]);
				X.fh(l.data, d, 1);
				X.fh(l.data, d + 2, k.Mo ? 1 : 0);
				for (var A = 0; A < 20; A++) X.RD(l.data, d + 4 + A * 2, k.Z[A]);
				break;
			case "clrL":
			case "rplc":
				X.pg(l, d, 1);
				X._b(l, d + 2, 16);
				y = jO.TH(l, G[Q], d + 6) + 6;
				break;
			case "nvrt":
				y = 0;
				break;
			case "post":
				X.pg(l, d, G[Q].Lvls.v);
				y = 2;
				break;
			case "thrs":
				X.pg(l, d, G[Q].Lvl.v);
				y = 2;
				break;
			case "grdm":
				var F = G[Q].Rvrs ? G[Q].Rvrs.v : !1,
					D = !1,
					q = 867527939,
					H = !1,
					W = !1,
					Z = 2048,
					B = [0, 0, 0, 0],
					a = [32768, 32768, 32768, 32768],
					m = G[Q].Grad.v,
					p, c, v = m.Clrs == null ? 1 : 0;
				if (v == 0) {
					p = m;
					c = JSON.parse(LayerStyleConstants.descriptorJsonFragments.a9B).v
				} else {
					p = FilterHelper.oT("grdm").Grad.v;
					c = m
				}
				l.ensureCapacity(d, 4);
				X.fh(l.data, d, 1);
				l.data[d + 2] = F ? 1 : 0;
				l.data[d + 3] = D ? 1 : 0;
				var i = d + 4;
				X.ZI(l, i, m.Nm.v);
				i += 4 + m.Nm.v.length * 2;
				i = eu.asL(l, i, p);
				X.pg(l, i, v);
				i += 2;
				X._b(l, i, c.RndS.v);
				i += 4;
				X.pg(l, i, c.ShTr.v ? 1 : 0);
				i += 2;
				X.pg(l, i, c.VctC.v ? 1 : 0);
				i += 2;
				X._b(l, i, c.Smth.v);
				i += 4;
				X.pg(l, i, 3);
				i += 2;
				for (var A = 0; A < 4; A++) X.pg(l, i + A * 2, B[A]);
				i += 8;
				for (var A = 0; A < 4; A++) X.pg(l, i + A * 2, a[A]);
				i += 8;
				i += 2;
				y = i - d;
				break;
			case "selc":
				y = iX.qJ(l, d, G[Q]);
				break;
			case "FMsk":
				X.i7(l, d, G[Q]);
				y = G[Q].length;
				break;
			case "Txt2":
				var z = new GrowableByteBuffer,
					P = i0.CO(G[Q].lD, z),
					C = PixelUtil.allocBytes(P, !0);
				for (var A = 0; A < P; A++) C[A] = z.data[A];
				X.i7(l, d, C);
				y = C.length;
				break;
			case "vmsk":
				var h = G[Q],
					L = 0;
				X._b(l, d, 3);
				if (!h.cv) L += 1 << 1;
				if (!h.isEnabled) L += 1 << 2;
				X._b(l, d + 4, L);
				y = 8;
				var U = h.i.length;
				l.ensureCapacity(d + 8, U * 26);
				eU.nb(l.data, d + 8, h.i, V.m, V.n);
				y += U * 26;
				break;
			case "shmd":
				X._b(l, d, Object.keys(G[Q]).length);
				var Y = d + 4;
				for (var S in G[Q]) {
					X.zr(l, Y, "8BIM");
					Y += 4;
					X.zr(l, Y, S);
					Y += 4;
					X._b(l, Y, 0);
					Y += 4;
					X._b(l, Y, 0);
					Y += 4;
					X._b(l, Y, 16);
					Y += 4;
					var E = jO.TH(l, G[Q][S], Y);
					if (E % 4 != 0) E += 4 - E % 4;
					X._b(l, Y - 8, E + 4);
					Y += E
				}
				y = Y - d;
				break;
			case "TySh":
				var Y = d;
				X.bz(l, Y, 1);
				Y += 2;
				var x = G[Q],
					z = new GrowableByteBuffer;
				x.zC.DocumentResources = JSON.parse(JSON.stringify(x.zC.ResourceDict));
				var P = gS.CO(x.zC, z),
					C = PixelUtil.allocBytes(P, !0);
				for (var A = 0; A < P; A++) C[A] = z.data[A];
				x.wi.EngineData = {
					t: "tdta",
					v: C
				};
				var K = x.zC.EngineDict.Editor.Text;
				x.wi.Txt.v = K.substring(0, K.length - 1);
				X.a6F(l, Y, x.D);
				Y += 48;
				X.bz(l, Y, 50);
				Y += 2;
				X._b(l, Y, 16);
				Y += 4;
				Y += jO.TH(l, x.wi, Y);
				X.bz(l, Y, 1);
				Y += 2;
				X._b(l, Y, 16);
				Y += 4;
				Y += jO.TH(l, x.R8, Y);
				X.apm(l, Y, x.xZ);
				Y += 16;
				y = Y - d;
				break;
			case "lmfx":
				X._b(l, d, 0);
				X._b(l, d + 4, 16);
				var e = JSON.parse(JSON.stringify(G[Q])),
					u = !1;
				ia.Kk(e);
				for (var A = 0; A < LayerStyleConstants.effectMultiKeys.length; A++)
					if (e[LayerStyleConstants.effectMultiKeys[A]] != null) u = !0;
				X.zr(l, I, u ? "lmfx" : "lfx2");
				y = jO.TH(l, e, d + 8) + 8;
				break;
			case "Patt":
				var Y = fv.WQ(l, d, G[Q]);
				y = Y - d;
				break;
			case "SoLd":
				X.zr(l, d, "soLD");
				X._b(l, d + 4, 4);
				X._b(l, d + 8, 16);
				y = jO.TH(l, G[Q], d + 12) + 12;
				break;
			case "vstk":
			case "pths":
				X._b(l, d, 16);
				y = jO.TH(l, G[Q], d + 4) + 4;
				break;
			case "vscg__":
				X.zr(l, d, G[Q].key);
				X._b(l, d + 4, 16);
				y = jO.TH(l, G[Q].Z, d + 8) + 8;
				break;
			case "vogk":
				X._b(l, d, 1);
				X._b(l, d + 4, 16);
				PixelUtil.X.a6l(G[Q]);
				for (var A = 0; A < G[Q].length; A++) {
					var bC = G[Q][A].v.keyOriginResolution;
					if (bC) bC.v = V.m7
				}
				var O = {
					classID: "null",
					keyDescriptorList: {
						t: "VlLs",
						v: G[Q]
					}
				};
				y = jO.TH(l, O, d + 8) + 8;
				break;
			case "lnkD":
			case "lnk2":
			case "lnk3":
				var i = d;
				for (var A = 0; A < G[Q].length; A++) {
					var $ = G[Q][A],
						gX = i;
					X.TB(l, i, 0);
					i += 8;
					X.zr(l, i, $.type);
					i += 4;
					X._b(l, i, $.X7);
					i += 4;
					l.ensureCapacity(i, 1);
					l.data[i] = $.AN.length;
					i++;
					X.zr(l, i, $.AN);
					i += $.AN.length;
					X.ZI(l, i, $.bf + "\0");
					i += 4 + $.bf.length * 2 + 2;
					X.zr(l, i, $.hA);
					i += 4;
					X.zr(l, i, $.Rr);
					i += 4;
					X.TB(l, i, $.raw.length);
					i += 8;
					l.ensureCapacity(i, 1);
					l.data[i] = $.open;
					i++;
					X.i7(l, i, $.raw);
					i += $.raw.length;
					X._b(l, i, 1);
					i += 4;
					i += 11;
					var _ = i - gX - 8;
					X.TB(l, gX, _);
					if (_ % 4 != 0) {
						l.ensureCapacity(i, 4 - _ % 4);
						i += 4 - _ % 4
					}
				}
				y = i - d;
				break;
			case "FEid":
				var i = d;
				X._b(l, i, 3);
				i += 4;
				for (var jI = 0; jI < G[Q].length; jI++) {
					var iw = G[Q][jI];
					i += 4;
					var hn = i;
					i += 4;
					X.OH(l, i, iw.id);
					i += iw.id.length + 1;
					X._b(l, i, 1);
					i += 4;
					var jq = PixelUtil.allocBytes(iw.rect.O()),
						iv = iw.rect,
						kq = PixelUtil.allocBytes(iv.O());
					i += 4;
					var eE = i;
					i += 4;
					X.ZE(l, i, iv);
					i += 16;
					X._b(l, i, 8);
					i += 4;
					X._b(l, i, 24);
					i += 4;
					for (var A = 0; A < 24 + 2; A++) {
						var e8 = -1;
						if (A == 0) e8 = 0;
						if (A == 1) e8 = 1;
						if (A == 2) e8 = 2;
						if (A == 25) e8 = 3;
						X._b(l, i, e8 != -1 ? 1 : 0);
						i += 4;
						if (e8 != -1) {
							PixelUtil.extractChannelFromRgba(iw.buffer, jq, e8);
							PixelUtil.copyBufferRect(jq, iw.rect, kq, iv);
							i += 4;
							var aI = i;
							i += 4;
							l.ensureCapacity(i, iv.O() + 2);
							i = db.L5(!0, kq, l.data, iv.m, iv.n, i, 3);
							X._b(l, aI, i - (aI + 4))
						}
					}
					X._b(l, eE, i - (eE + 4));
					l.ensureCapacity(i, 1);
					l.data[i] = iw.z ? 1 : 0;
					i++;
					if (iw.z != null) {
						var dK = iv,
							jC = PixelUtil.allocBytes(dK.O());
						jC.fill(iw.z.color);
						PixelUtil.copyBufferRect(iw.z.channel, iw.z.rect, jC, dK);
						X.ZE(l, i, dK);
						i += 16;
						i += 4;
						var d7 = i;
						i += 4;
						l.ensureCapacity(i, dK.O() + 2);
						i = db.L5(!0, jC, l.data, dK.m, dK.n, i, 3);
						X._b(l, d7, i - (d7 + 4))
					}
					var _ = i - (hn + 4);
					X._b(l, hn, _);
					if (_ % 4 != 0) i += 4 - _ % 4
				}
				y = i - d;
				break;
			case "Anno":
				var ka = d,
					hS = G[Q].length;
				X.pg(l, ka, 2);
				X.pg(l, ka + 2, 1);
				ka += 4;
				X._b(l, ka, hS);
				ka += 4;
				for (var A = 0; A < hS; A++) {
					var eH = G[Q][A],
						kA = eH[0],
						gq = eH[1],
						hb = ka;
					ka += 4;
					X.zr(l, ka, "txtA");
					ka += 4;
					l.ensureCapacity(ka, 2);
					l.data[ka] = 1;
					l.data[ka + 1] = 28;
					ka += 2;
					X.pg(l, ka, 1);
					ka += 2;
					X.ZE(l, ka, new Rect(kA, gq, 17, 21));
					ka += 16;
					X.ZE(l, ka, new Rect(kA + 8, gq + 10, 241, 141));
					ka += 16;
					l.ensureCapacity(ka, 10);
					bA.L4(l.data, ka, eH[2]);
					ka += 10;
					ka += X.OH(l, ka, eH[3]);
					ka += X.OH(l, ka, "");
					ka += X.OH(l, ka, "D:20211012120233+01'00'");
					var ex = eH[4].length * 2;
					X._b(l, ka, 12 + 2 + ex);
					ka += 4;
					X.zr(l, ka, "txtC");
					ka += 4;
					X._b(l, ka, 2 + ex);
					ka += 4;
					l.ensureCapacity(ka, 2);
					l.data[ka] = 254;
					l.data[ka + 1] = 255;
					ka += 2;
					X.awV(l, ka, eH[4]);
					ka += ex;
					X._b(l, hb, ka - hb)
				}
				y = ka - d;
				break;
			default:
				console.log("unknown layer tag: " + Q + ", size: " + y);
				d -= 12;
				continue
		}
		var fs = ["Txt2", "artd", "extd", "pths"];
		if (fs.indexOf(Q) == -1)
			if (y % 4 != 0) y += 4 - y % 4;
		if (t) X.TB(l, d - 8, y);
		else X._b(l, d - 4, y);
		if (Q != "luni" && Q != "TySh")
			if (y % 4 != 0) y += 4 - y % 4;
		d += y
	}
	return d
};

// LayerAdditionalInfoParser.readLayerName — read Pascal/Unicode layer name block
ia.sB = function(l) {
	for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) {
		var d = LayerStyleConstants.effectOrder[A],
			G = LayerStyleConstants.effectMultiKeys[A];
		if (l[G] == null) l[G] = {
			t: "VlLs",
			v: []
		};
		if (l[d] != null) {
			l[G].v.push(l[d]);
			delete l[d]
		}
		var b = [];
		for (var V = 0; V < l[G].v.length; V++) {
			var Q = l[G].v[V];
			if (Q.v.present == null || Q.v.present.v == !0) b.push(Q)
		}
		l[G].v = b
	}
};

// LayerAdditionalInfoParser.writeLayerName — serialize layer name block
ia.Kk = function(l) {
	for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) {
		var d = LayerStyleConstants.effectOrder[A],
			G = LayerStyleConstants.effectMultiKeys[A],
			b = l[G].v.length;
		if (b == 0) {
			delete l[G];
			continue
		}
		if (b == 1) {
			l[d] = l[G].v[0];
			delete l[G];
			continue
		}
	}
};

// LayerAdditionalInfoParser.readVectorMask — parse vector mask / path data
ia.Bp = function(l, d) {
	if (d == "GdFl") {
		if (l.Angl == null) l.Angl = {
			v: {
				type: "#Ang",
				val: 0
			},
			t: "UntF"
		};
		if (l.Algn == null) l.Algn = {
			v: !0,
			t: "bool"
		};
		if (l.Scl == null) l.Scl = {
			v: {
				type: "#Prc",
				val: 100
			},
			t: "UntF"
		};
		if (l.Ofst == null) l.Ofst = {
			v: {
				classID: "Pnt",
				Hrzn: {
					v: {
						type: "#Prc",
						val: 0
					},
					t: "UntF"
				},
				Vrtc: {
					v: {
						type: "#Prc",
						val: 0
					},
					t: "UntF"
				}
			},
			t: "Objc"
		};
		if (l.Rvrs == null) l.Rvrs = {
			v: !1,
			t: "bool"
		};
		if (l.Dthr == null) l.Dthr = {
			v: !1,
			t: "bool"
		}
	}
	if (d == "PtFl") {
		if (l.Algn == null) l.Algn = {
			v: !0,
			t: "bool"
		};
		if (l.Angl == null) l.Angl = {
			v: {
				type: "#Ang",
				val: 0
			},
			t: "UntF"
		};
		if (l.Scl == null) l.Scl = {
			v: {
				type: "#Prc",
				val: 100
			},
			t: "UntF"
		};
		if (l.phase == null) l.phase = {
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
	}
};

// LayerAdditionalInfoParser.cloneLayerExtras — deep clone layer.add object
ia.clone = function(l, d) {
	var G = {};
	if (l == "TySh") {
		G.D = d.D.clone();
		G.wi = JSON.parse(JSON.stringify(d.wi));
		G.R8 = JSON.parse(JSON.stringify(d.R8));
		G.xZ = d.xZ.clone();
		G.zC = JSON.parse(JSON.stringify(d.zC));
		if (d.add) G.add = {
			vmsk: d.add.vmsk.clone(),
			vogk: JSON.parse(JSON.stringify(d.add.vogk))
		};
		return G
	} else if (l == "fxrp") return d.clone();
	else if (l == "vmsk") return d.clone();
	else return JSON.parse(JSON.stringify(d))
};


// aZ - EmbeddedFileReader (linked / embedded smart object payload reader)
function aZ(l, d) {}
// EmbeddedFileReader.importFromBuffer — read embedded/linked file payload from smart object
aZ.Cd = function(l, d, G, b) {
	b = aZ.ana(l, d, G, b);
	return b
};

// EmbeddedFileReader.exportToBuffer — write embedded file payload
aZ.CO = function(l, d, G, b, V) {
	b = aZ.azo(l, d, G, b, V);
	return b
};

// EmbeddedFileReader.readPsdEmbedded — parse embedded PSD header + channel index
aZ.ana = function(l, d, G, b) {
	var V = b;
	l.rect = X.NK(G, b);
	b += 16;
	var Q = X.TD(G, b);
	b += 2;
	l.nB = [];
	var t = d.v_;
	for (var A = 0; A < Q; A++) {
		l.nB[A] = {
			id: X.Ar(G, b),
			length: (t ? X.fD : X.q)(G, b + 2)
		};
		b += t ? 10 : 6
	}
	var I = X.Ko(G, b, 4);
	b += 4;
	if (I != "8BIM") {
		console.log("Invalid Blend mode signature: " + I);
		alert("Error in Photoshop file: wrong signature.");
		throw "e"
	}
	l.blendModeKey = X.Ko(G, b, 4);
	b += 4;
	l.opacity = G[b];
	b += 1;
	l.usesClippingMask = G[b] == 1;
	b += 1;
	l.layerFlags = G[b];
	b += 1;
	if (G[b] != 0) console.log("error in filler!");
	b += 1;
	var y = X.q(G, b);
	b += 4;
	var e = b;
	b = aZ.a6S(l, G, b);
	b = aZ.akU(l, G, b);
	var M = X.Qh(G, b);
	l.name = M.ip;
	b += M.length;
	if (M.length % 4 != 0) b += 4 - M.length % 4;
	b = ia.ajh(G, b, e + y, l.add, t, d);
	if (l.add.lsct) {
		if (l.add.lsct.blendModeKey) l.blendModeKey = l.add.lsct.blendModeKey;
		l.add.lsct = l.add.lsct.type
	}
	return b
};

// EmbeddedFileReader.readRawEmbedded — parse raw embedded image data
aZ.azo = function(l, d, G, b, V) {
	var Q = b;
	X.ZE(G, b, l.rect);
	b += 16;
	var t = l.and();
	X.pg(G, b, t.length);
	b += 2;
	var I = d.v_;
	V.push(b);
	for (var A = 0; A < t.length; A++) {
		X.bz(G, b, t[A]);
		if (I) X.TB(G, b + 2, 0);
		else X._b(G, b + 2, 0);
		b += I ? 10 : 6
	}
	X.zr(G, b, "8BIM");
	b += 4;
	X.zr(G, b, l.blendModeKey);
	b += 4;
	X.s8(G, b, l.opacity, 1);
	b += 1;
	X.s8(G, b, l.usesClippingMask ? 1 : 0, 1);
	b += 1;
	X.s8(G, b, l.layerFlags, 1);
	b += 1;
	X.s8(G, b, 0, 1);
	b += 1;
	var y = b;
	X._b(G, b, 0);
	b += 4;
	var e = b;
	b = aZ.a1j(l, G, b);
	b = aZ.as$(l, G, b);
	var M = X.OH(G, b, l.name.slice(0, 255));
	b += M;
	if (M % 4 != 0) b += 4 - M % 4;
	if (l.add.lsct) {
		l.add.lsct = {
			type: l.add.lsct
		};
		if (l.blendModeKey == "pass") {
			l.add.lsct.blendModeKey = "pass";
			l.blendModeKey = "norm"
		}
	}
	if (l.blendModeKey == "pass") l.add.lsct = {
		type: l.add.lsct,
		Dz: "pass"
	};
	if (l.add.brit) l.add.CgEd = l.add.brit;
	b = ia.ad0(G, b, l.add, I, d);
	delete l.add.CgEd;
	if (l.add.lsct) {
		if (l.add.lsct.blendModeKey) l.blendModeKey = l.add.lsct.blendModeKey;
		l.add.lsct = l.add.lsct.type
	}
	var R = b - e;
	X._b(G, y, R);
	return b
};

// EmbeddedFileReader.decodeEmbeddedPixels — decompress embedded layer channels
aZ.a6S = function(l, d, G) {
	var b = X.q(d, G);
	G += 4;
	if (b == 0) return G;
	var V = G;
	l.z = new LayerRecord.LayerMask;
	l.z.rect = X.NK(d, G);
	G += 16;
	l.z.color = d[G];
	G += 1;
	var Q = aZ.azp(l.z, d, G);
	G += 1;
	if (Q) {
		var t = !1,
			I = 255,
			y = 0,
			e = 255,
			M = 0;
		for (var A = 0; A < l.nB.length; A++)
			if (l.nB[A].id == -3) t = !0;
		if (t) {
			l.UG = aZ.alF(d, G);
			G += 18
		}
		var R = G,
			J = d[G];
		G++;
		if (J >> 0 & 1) {
			I = d[G];
			G++
		}
		if (J >> 1 & 1) {
			y = X.o_(d, G);
			G += 8
		}
		if (J >> 2 & 1) {
			e = d[G];
			G++
		}
		if (J >> 3 & 1) {
			M = X.o_(d, G);
			G += 8
		}
		if ((G - R & 1) == 1) G++;
		l.P5 = [I, y, e, M]
	} else {
		if (b == 20) G += 2;
		else {
			l.UG = aZ.alF(d, G);
			G += 18
		}
	}
	return V + b
};

// EmbeddedFileReader.readEmbeddedDescriptor — read smart object linked file descriptor
aZ.a1j = function(l, d, G) {
	X._b(d, G, 0);
	G += 4;
	if (l.z == null) return G;
	var b = l.c3(),
		V = l.add.vmsk,
		Q = G,
		t = !0;
	X._b(d, G, 0);
	X.ZE(d, G, l.z.rect);
	G += 16;
	X.s8(d, G, l.z.color);
	G += 1;
	aZ.ayX(l.z, d, G, t);
	G += 1;
	if (t) {
		if (l.UG) {
			aZ.ar4(d, G, l.UG);
			G += 18
		}
		X.s8(d, G, 15);
		G += 1;
		X.s8(d, G, b ? b.Al : 255);
		G += 1;
		X.j_(d, G, b ? b.Vx : 0);
		G += 8;
		X.s8(d, G, V ? V.Al : 255);
		G += 1;
		X.j_(d, G, V ? V.Vx : 0);
		G += 8;
		G++
	}
	X._b(d, Q - 4, G - Q);
	return G
};

// EmbeddedFileReader.getEmbeddedBounds — read embedded document dimensions
aZ.alF = function(l, d) {
	var G = new LayerRecord.LayerMask;
	aZ.azp(G, l, d);
	d += 1;
	G.color = l[d];
	d += 1;
	G.rect = X.NK(l, d);
	d += 16;
	return G
};

// EmbeddedFileReader.readEmbeddedThumbnail — parse embedded preview JPEG/PNG
aZ.ar4 = function(l, d, G) {
	aZ.ayX(G, l, d, !1);
	d += 1;
	X.s8(l, d, G.color);
	d += 1;
	X.ZE(l, d, G.rect);
	d += 16
};

// EmbeddedFileReader.readEmbeddedMetadata — parse XMP / metadata block
aZ.azp = function(l, d, G) {
	var b = d[G];
	l.cv = (b >> 0 & 1) == 0;
	l.isEnabled = (b >> 1 & 1) == 0;
	l.CX = (b >> 3 & 1) == 1;
	return b >> 4 & 1
};

// EmbeddedFileReader.writeEmbeddedMetadata — serialize metadata block
aZ.ayX = function(l, d, G, b) {
	var V = 0;
	if (!l.cv) V += 1 << 0;
	if (!l.isEnabled) V += 1 << 1;
	if (l.CX) V += 1 << 3;
	if (b) V += 1 << 4;
	X.s8(d, G, V)
};

// EmbeddedFileReader.readEmbeddedTransform — parse smart object transform warp
aZ.akU = function(l, d, G) {
	var b = X.q(d, G);
	G += 4;
	for (var A = 0; A < b; A++) l.channelRectDefaults[A] = d[G + A];
	return G + b
};

// EmbeddedFileReader.writeEmbeddedTransform — serialize transform warp data
aZ.as$ = function(l, d, G) {
	X._b(d, G, l.channelRectDefaults.length);
	G += 4;
	d.ensureCapacity(G, 40);
	for (var A = 0; A < 40; A++) {
		d.data[G + A] = l.channelRectDefaults[A]
	}
	return G + 40
};


// db - PsdChannelCodec (encode/decode PSD layer channel image data)
function db() {}
// PsdChannelCodec.decodeLayer — decode all channels for one layer record
db.Cd = function(l, d, G, b) {
	b = db.avY(d, d.v_, d.dP, d.RU, l, G, b);
	return b
};

// PsdChannelCodec.encodeLayer — encode all channels for one layer record
db.IN = function(l, d, G, b, V, Q) {
	b = db.anc(l, d, G, b, V, Q);
	return b
};

// PsdChannelCodec.decodeChannels — per-channel RLE/zip decode into RgbaFloatPlanes
db.avY = function(l, d, G, b, V, Q, t) {
	var I = V.nB,
		y = {},
		e = t;
	for (var A = 0; A < I.length; A++) {
		var M = I[A],
			R = M.id,
			J = M.length,
			n;
		if (R == -2 && V.z == null) R = -1;
		if (R == -3) n = V.UG.rect;
		else if (R == -2) n = V.z.rect;
		else n = V.rect;
		var r = db.C1(d, G, Q, n.m, n.n, t, J);
		t += J;
		if (R == -3) V.UG.channel = r;
		else if (R == -2) V.z.channel = r;
		else y["c" + R] = r
	}
	var T = new WebGLContext.RgbaFloatPlanes(0);
	T.aS = null;
	if (b == 3) {
		T.o = y.c0;
		T.J = y.c1;
		T.k = y.c2;
		T.aS = y["c-1"]
	} else if (b == 1) {
		T.o = y.c0;
		T.J = y.c0;
		T.k = y.c0;
		T.aS = y["c-1"]
	} else if (b == 4) {
		var j = l.yQ.r1039,
			g = y.c0,
			Y = y.c1,
			k = y.c2,
			F = y.c3;
		if (j) {
			var D = j.a7_,
				q = 17;
			if (D == null) {
				var H = ICC.R(j.buffer);
				console.log(H);
				D = j.a7_ = ICC.U.sampleLUT(H, q)
			}
			var W = {
					o: g,
					J: Y,
					k: k,
					aS: F
				},
				Z = PixelUtil.allocBytes(g.length * 4);
			PixelUtil.channelPlanesToRgba(W, Z);
			PixelUtil.invertUint32Buffer(Z);
			ICC.U.applyLUT4(D, q, Z, Z);
			PixelUtil.rgbaToChannelPlanes(Z, W)
		} else {
			for (var A = 0; A < g.length; A++) {
				var B = 1 - g[A] * (1 / 255),
					a = 1 - Y[A] * (1 / 255),
					m = 1 - k[A] * (1 / 255),
					p = 1 - F[A] * (1 / 255),
					c = UDOC.Color.cmykToRgb([B, a, m, p]);
				g[A] = c[0] * 255;
				Y[A] = c[1] * 255;
				k[A] = c[2] * 255
			}
		}
		T.o = g;
		T.J = Y;
		T.k = k;
		T.aS = y["c-1"]
	}
	if (T.o == null) T.o = PixelUtil.allocBytes(0);
	if (T.aS == null && T.o != null) {
		T.aS = T.o.slice(0);
		T.aS.fill(255)
	}
	if (T.J == null) T.J = T.o.slice(0);
	if (T.k == null) T.k = T.o.slice(0);
	V.buffer = PixelUtil.allocBytes(Math.max(0, V.rect.O() * 4));
	PixelUtil.channelPlanesToRgba(T, V.buffer);
	return t
};

// PsdChannelCodec.encodeChannels — per-channel RLE/zip encode from RgbaFloatPlanes
db.anc = function(l, d, G, b, V, Q) {
	var t = d.and(),
		I = new WebGLContext.RgbaFloatPlanes(d.rect.O());
	PixelUtil.rgbaToChannelPlanes(d.buffer, I);
	for (var A = 0; A < t.length; A++) {
		var y = t[A],
			e, M;
		if (y == -3) e = d.UG.rect;
		else if (y == -2) e = d.z.rect;
		else e = d.rect;
		if (y == -3) M = d.UG.channel;
		if (y == -2) M = d.z.channel;
		if (y == -1) M = I.aS;
		if (y == 0) M = I.o;
		if (y == 1) M = I.J;
		if (y == 2) M = I.k;
		G.ensureCapacity(b, e.O() * 3 + 4);
		var R = b;
		b = db.L5(l, M, G.data, e.m, e.n, b, Q[1] ? 3 : 1);
		var J = b - R;
		if (l) X.ab6(G.data, V + A * 10 + 2, J);
		else X.m1(G.data, V + A * 6 + 2, J)
	}
	return b
};

// PsdChannelCodec.decodeChannel — decode single channel plane
db.C1 = function(l, d, G, b, V, Q, t) {
	var I = X.TD(G, Q);
	Q += 2;
	return db.c7(l, d, G, b, V, Q, I, t - 2)
};

// PsdChannelCodec.encodeChannel — encode single channel plane
db.L5 = function(l, d, G, b, V, Q, t) {
	X.RD(G, Q, t);
	Q += 2;
	Q = db.hH(l, d, G, b, V, Q, t);
	return Q
};

// PsdChannelCodec.decodeRle — RLE decompress one channel row set
db.c7 = function(l, d, G, b, V, Q, t, I) {
	var y, e = b * V * (d >>> 3),
		M = e & 3,
		R = e + (M == 0 ? 0 : 4 - M);
	if (I <= 0) {
		return PixelUtil.allocBytes(R)
	}
	if (t > 3) {
		console.log("unknown compression: " + t, b, V, b * V, I);
		t = 0
	}
	if (t == 0) {
		if (Q + R <= G.length) y = G.slice(Q, Q + R);
		else {
			y = PixelUtil.allocBytes(e);
			for (var A = 0; A < e; A++) y[A] = G[Q + A]
		}
		Q += e
	} else if (t == 1) {
		y = PixelUtil.allocBytes(e);
		var J = l ? 4 : 2,
			n = db.adm(G, y, b, V, Q, Q + J * V, J);
		Q += J * V + n
	} else if (t == 2 || t == 3) {
		var r = new Uint8Array(G.buffer, Q + 2, I - 6),
			T = PixelUtil.allocBytes(R);
		UZIP.inflateRaw(r, T);
		if (t == 3) {
			if (d == 8)
				for (var j = 0; j < V; j++) {
					var g = j * b + 1,
						k = g + b - 1,
						F = T[g - 1];
					for (var D = g; D < k; D++) {
						F += T[D];
						T[D] = F & 255
					}
				} else
					for (var j = 0; j < V; j++) {
						var g = j * b + 1,
							k = g + b - 1,
							F = T[2 * g - 2] << 8 | T[2 * g - 1];
						for (var D = g; D < k; D++) {
							var q = D << 1;
							F += T[q] << 8 | T[q + 1];
							T[q] = F >>> 8;
							T[q + 1] = F & 255
						}
					}
		}
		if (T.length == R) y = T;
		else {
			y = PixelUtil.allocBytes(R);
			for (var A = 0; A < T.length; A++) y[A] = T[A]
		}
	}
	if (d == 16) {
		var H = PixelUtil.allocBytes(b * V);
		for (var A = 0; A < e; A += 2) H[A >>> 1] = y[A];
		y = H
	}
	return y
};

// PsdChannelCodec.encodeRle — RLE compress one channel row set
db.hH = function(l, d, G, b, V, Q, t) {
	var I = b * V;
	if (t == 0)
		for (var A = 0; A < I; A++) G[Q++] = d[A];
	else if (t == 1) {
		var y = l ? 4 : 2,
			e = db.ak3(d, G, b, V, Q, Q + y * V, y);
		Q += y * V + e
	} else if (t == 2 || t == 3) {
		if (t == 3) {
			var M = new Uint8Array(d.length);
			for (var R = 0; R < V; R++) {
				var J = R * b + 1,
					n = J + b - 1,
					r = d[J - 1];
				M[J - 1] = r;
				for (var T = J; T < n; T++) {
					M[T] = d[T] + (256 - r) & 255;
					r = d[T]
				}
			}
			d = M
		}
		G[Q] = 120;
		G[Q + 1] = 156;
		Q += 2;
		var j = pako.deflateRaw(d, {
			asQ: 4
		});
		X.a65(G, Q, j);
		Q += j.length + 4
	} else console.log("Unknown compression: " + t);
	return Q
};

// PsdChannelCodec.decodeZip — ZIP/packBits decompress channel
db.adm = function(l, d, G, b, V, Q, t) {
	if (!(l instanceof Uint8Array) || !(d instanceof Uint8Array)) throw "e";
	var I = Q,
		y = b | 0;
	if (t == 2)
		for (var A = 0; A < y; A++) {
			var e = X.TD(l, V + (A << 1));
			db.YA(l, Q, e, d, A * G, G);
			Q += e
		} else
			for (var A = 0; A < y; A++) {
				var e = X.q(l, V + (A << 2));
				db.YA(l, Q, e, d, A * G, G);
				Q += e
			}
	return Q - I
};

// PsdChannelCodec.encodeZip — ZIP/packBits compress channel
db.ak3 = function(l, d, G, b, V, Q, t) {
	var I = Q;
	if (t == 2)
		for (var A = 0; A < b; A++) {
			var y = db.atC(l, A * G, G, d, Q);
			X.fh(d, V + A * 2, y);
			Q += y
		} else
			for (var A = 0; A < b; A++) {
				var y = db.atC(l, A * G, G, d, Q);
				X.m1(d, V + A * 4, y);
				Q += y
			}
	return Q - I
};

// PsdChannelCodec.applyAlphaMatte — apply layer alpha matte to color channels
db.atC = function(l, d, hZ, G, b) {
	var V, Q, t, I, y, f5, e;
	I = d + hZ;
	for (t = d, Q = b; hZ > 0; t = V, hZ -= f5) {
		e = hZ < 128 ? hZ : 128;
		if (t <= I - 3 && l[t + 1] == l[t + 0] && l[t + 2] == l[t + 0]) {
			for (V = t + 3; V < t + e && l[V] == l[t + 0];) ++V;
			f5 = V - t;
			G[Q++] = 1 + 256 - f5;
			G[Q++] = l[t + 0]
		} else {
			for (V = t; V < t + e;)
				if (V <= I - 3 && l[V + 1] == l[V + 0] && l[V + 2] == l[V + 0]) break;
				else ++V;
			f5 = V - t;
			G[Q++] = f5 - 1;
			for (var A = 0; A < f5; A++) G[Q + A] = l[t + A];
			Q += f5
		}
	}
	return Q - b
};

// PsdChannelCodec.copyRect — copy pixel rect between channel buffers
db.YA = function(l, d, G, b, V, Q) {
	for (var t = 0; t < G;) {
		var hZ = l[d++];
		if (hZ >= 128) {
			var I = l[d++],
				y = V + (257 - hZ);
			b.fill(I, V, y);
			V = y;
			t += 2
		} else {
			for (var A = 0; A <= hZ; A++) b[V + A] = l[d + A];
			d += hZ + 1;
			V += hZ + 1;
			t += 1 + 1 + hZ
		}
	}
};


// c4 - PsdReader (Adobe PSD file format reader)
function c4() {}
// PsdReader.debugLog — optional debug offset logger (disabled)
c4.fp = function(l, d, G) {
	return;
	var b = "",
		V = d;
	while (V != 0) {
		var Q = V % 1e3 + "";
		while (Q.length < 3) Q = "0" + Q;
		b = (b == "" ? Q : Q + " ") + b;
		V = Math.floor(V / 1e3)
	}
	while (b.startsWith("0") && b != "0") b = b.slice(1);
	while (b.length < 11) b = " " + b;
	console.log("===", b, "\t".repeat(l), ": " + G)
};

// PsdReader.readMinimal — quick read PSD dimensions + composite buffer only
c4.axw = function(l) {
	var d = {
			yQ: {}
		},
		b = 0,
		V = 0,
		I;
	d.v_ = !1;
	d.dP = 8;
	var G = new Uint8Array(l);
	V = c4.Zr(d, G, b);
	b = V;
	V = c4.apV(d, G, b);
	b = V;
	var Q = X.q(G, b);
	b += 4 + Q;
	var t = d.v_ ? 8 : 4;
	if (d.v_) I = X.fD(G, b);
	else I = X.q(G, b);
	b += t + I;
	V = c4.a04(d, G, b);
	return [{
		uA: new Rect(0, 0, d.m, d.n),
		data: d.buffer.buffer
	}]
};

// PsdReader.importFromBuffer — full PSD parse → document model
c4.Cd = function(l, d) {
	d.v_ = !1;
	d.dP = 8;
	var G = new Uint8Array(l),
		b = 0,
		V = 0,
		L, jq = !1,
		iv = !0,
		kq = !1,
		eE = 0,
		et = 0;
	V = c4.Zr(d, G, b);
	c4.fp(0, V - b, "PSD Header");
	b = V;
	V = c4.apV(d, G, b);
	c4.fp(0, V - b, "Color Mode Data");
	b = V;
	V = c4.a4V(d, G, b);
	c4.fp(0, V - b, "Image Resources");
	b = V;
	V = c4.ahD(d, G, b);
	c4.fp(0, V - b, "Layer And Mask Info");
	b = V;
	V = c4.a04(d, G, b);
	c4.fp(0, V - b, "Merged Image");
	b = V;
	if (d.B.length == 0) {
		var Q = d.V4();
		Q.tH("Background");
		d.B.push(Q);
		Q.buffer = d.buffer.slice(0);
		Q.rect = new Rect(0, 0, d.m, d.n)
	}
	if (d.yQ.r1005) {
		d.m7 = X.anN(d.yQ.r1005, 0)
	}
	if (d.yQ.r1026) {
		var G = d.yQ.r1026;
		for (var A = 0; A < G.length; A += 2) {
			var V = d.B[A >>> 1];
			if (V) V.folderStackIndex = X.TD(G, A)
		}
	}
	if (d.yQ.r1072) {
		var G = d.yQ.r1072;
		for (var A = 0; A < G.length; A++) {
			var V = d.B[A];
			if (V) V.layerLinkEnabled = G[A] == 1
		}
	}
	if (d.yQ.r1032) {
		d.qz = c4.aj_(d.yQ.r1032, 0)
	}
	delete d.yQ.r1036;
	d.Dm(d.yQ.r1039);
	if (d.yQ.r1050) {
		var t = X.q,
			I = d.yQ.r1050,
			y = X.q(I, 0);
		if (y == 6) {
			var e = 4,
				M = X.NK(I, e);
			e += 16;
			var R = X.RP(I, e);
			e += 4 + R.length * 2;
			var J = t(I, e);
			e += 4;
			var n = d.Vp;
			for (var A = 0; A < J; A++) {
				var r = f.UA.XN(),
					j;
				n.push(r);
				r = r.v;
				r.sliceID.v = t(I, e);
				e += 4;
				r.groupID.v = t(I, e);
				e += 4;
				var T = t(I, e);
				e += 4;
				if (T == 1) {
					j = t(I, e);
					e += 4
				}
				var R = X.RP(I, e);
				e += 4 + R.length * 2;
				var g = t(I, e);
				e += 4;
				var Y = [t(I, e), t(I, e + 4), t(I, e + 8), t(I, e + 12)];
				e += 16;
				f.UA.pI(n, n.length - 1, Y);
				var k = r.url.v = X.RP(I, e);
				e += 4 + k.length * 2;
				var F = r.null.v = X.RP(I, e);
				e += 4 + F.length * 2;
				var D = r.Msge.v = X.RP(I, e);
				e += 4 + D.length * 2;
				var q = r.altTag.v = X.RP(I, e);
				e += 4 + q.length * 2;
				r.cellTextIsHTML.v = I[e] == 1;
				e++;
				var H = r.cellText.v = X.RP(I, e);
				e += 4 + H.length * 2;
				var W = t(I, e);
				e += 4;
				var Z = t(I, e);
				e += 4;
				var B = I.slice(e, e + 4);
				e += 4;
				if (T != 2) n.pop()
			}
		} else if (y == 8) {
			var a = {};
			jO.V$(I, a, 8, !1);
			var I = d.Vp = a.slices.v;
			for (var A = 0; A < I.length; A++) {
				if (I[A].v.origin.v.ESliceOrigin != "userGenerated") {
					I.splice(A, 1);
					A--
				}
			}
		}
	}
	if (d.yQ.r1058) {
		var m = d.yQ.r1058,
			p = UTIF.decode(m.buffer, {
				parseMN: !1,
				debug: !1
			});
		xmpMetadata.exifIfdToMetadata(p[0], d.CD);
		delete d.yQ.r1058
	}
	if (d.yQ.r1060) {
		var c = X.Kw(d.yQ.r1060);
		xmpMetadata.parseXmpXmlToMetadata(c, d.CD);
		delete d.yQ.r1060
	}
	if (d.yQ.r1065) {
		var G = d.yQ.r1065;
		d.MV = {};
		jO.V$(G, d.MV, 4, !1)
	}
	if (d.yQ.r1069) {
		var G = d.yQ.r1069,
			v = [];
		for (var A = 2; A < G.length; A += 4) {
			var j = X.q(G, A);
			for (var i = 0; i < d.B.length; i++) {
				var V = d.B[i];
				if (V.add.lyid == j && V.add.lsct != 3) v.push(i)
			}
		}
		d.g = v
	}
	if (d.yQ.r1025) {
		var z = d.yQ.r1025;
		delete d.yQ.r1025;
		var P = eU.xv(z, 0, z.length, d.m, d.n),
			C = new LayerRecord.VectorMask;
		C.i = P;
		d.t_[0] = PsdDocument.HE("Working Path", {
			vmsk: C
		})
	}
	var h = d.add.pths;
	delete d.add.pths;
	var U = d.yQ.r3000;
	if (U) {
		L = {};
		jO.V$(U, L, 4, !1);
		delete d.yQ.r3000
	}
	if (h) {
		var S = h.pathSymmetrySelectedPath;
		if (S) {
			var E = h.pathList.v[S.v].v,
				x = E.pathUnicodeName.v;
			d.ZV = x.startsWith("Tile Symmetry")
		}
	}
	for (var K = 0; K <= 997; K++) {
		var u = "r" + (2e3 + K),
			z = d.yQ[u];
		if (z == null) break;
		var P = eU.xv(z, 0, z.length, d.m, d.n),
			x = "Path " + K;
		if (h) {
			var bC = h.pathList.v[K].v;
			x = bC.pathUnicodeName.v;
			if (x == "Tile Symmetry 1") continue
		}
		var O = L ? L.keyRootDescriptorList.v[K].v.keyDescriptorList.v : LayerRecord.Ba(P),
			C = new LayerRecord.VectorMask;
		C.i = P;
		d.t_.push(PsdDocument.HE(x, {
			vmsk: C,
			vogk: O
		}));
		delete d.yQ[u]
	}
	delete d.v_;
	if (d.yQ.r4000) {
		d.R7 = PixelUtil.R7.Cd(d.yQ.r4000)
	}
	var $ = d.yQ.r7000,
		gX = d.yQ.r7001;
	if ($) {
		var _ = X.Kw($);
		d.tJ = c4.a7b(_)
	}
	if (gX) {
		var _ = X.Kw(gX);
		d.rw = c4.asJ(_)
	}
	delete d.yQ.r7000;
	delete d.yQ.r7001;
	var jI = new Rect(0, 0, d.m, d.n),
		iw = d.add.Txt2,
		hn = iw;
	if (hn) {
		hn = hn.lD;
		if (hn._DocumentResources == null) hn = DescriptorMapper.decodeDescriptor(hn)
	}
	var e8 = -1;
	for (var A = 0; A < d.B.length; A++) {
		var V = d.B[A],
			aI = V.add.lsct,
			dK = V.add.vmsk,
			jC = V.c3();
		if (aI == LayerSectionType.divider) {
			eE++;
			V.add.lspf = 0
		} else if (aI == LayerSectionType.open || aI == LayerSectionType.closed) eE--;
		if (V.name == "") {
			V.name = "Layer " + (A + 1);
			kq = !0
		}
		if (kq && V.IQ() && V.blendModeKey == "norm") V.blendModeKey = "pass";
		if (V.aW() && V.vZ(d).z) {
			var d7 = V.vZ(d);
			d7.z.isEnabled = V.add.SoLd.filterFX.v.filterMaskEnable.v
		}
		if (dK && V.VF()) {
			var ka = LayerStyleConstants.strokeStyle.default;
			if (V.add.vstk == null) V.add.vstk = JSON.parse(JSON.stringify(ka));
			else {
				var hS = "strokeStyleLineDashSet";
				if (V.add.vstk[hS] == null) V.add.vstk[hS] = JSON.parse(JSON.stringify(ka[hS]))
			}
			V.add.vstk.strokeStyleResolution.v = d.m7
		}
		if (dK && (V.add.vogk == null || PixelUtil.path.Mh(dK.i) != V.add.vogk.length)) V.Ba();
		if (!1) {
			var eH = V.add.vogk,
				kA = !0;
			for (var gq = 0; gq < eH.length; gq++) {
				var hb = eH[gq].v.keyShapeInvalidated;
				if (hb == null || hb.v == !1) kA = !1
			}
			if (kA) V.Ba()
		}
		if (V.add.SoLd && V.rect.W6()) {
			console.log("redrawing smart instance");
			V.kX(d)
		}
		if (jC == null && V.z != null) {
			if (V.z.CX == !1) {
				V.z.CX = !0;
				V.UG = V.z.clone()
			}
		}
		jC = V.c3();
		if (V.P5) {
			var ka = V.P5,
				C = dK;
			if (jC) {
				jC.Al = ka[0];
				jC.Vx = ka[1]
			}
			if (C) {
				C.Al = ka[2];
				C.Vx = ka[3]
			}
			V.P5 = null
		}
		if (jC != null && dK != null && (jC.Vx + dK.Vx != 0 || jC.Al + dK.Al != 2 * 255)) V.QJ(d);
		else if (dK != null && !V.VF()) V.QJ();
		else if (jC && jC.Al != 255 && V.VF()) V.QJ(d);
		var ex = V.add.artb;
		if (ex && ex.artboardBackgroundType == null) ex.artboardBackgroundType = {
			t: "long",
			v: 1
		};
		if (ex && eE != 0) delete V.add.artb;
		var fs = V.add.vstk;
		if (V.VF() && (V.rect.W6() || dK && dK.Vx != 0 || fs && !fs.fillEnabled.v && (!fs.strokeEnabled.v || fs.strokeStyleLineWidth.v.val == 0))) V.Kq(d);
		if (V.add.TySh) {
			jq = !0;
			if (!V.rect.W6()) iv = !1
		}
		if (V.add.TySh && hn) {
			e8++;
			var f_ = V.add.TySh.zC,
				bD = dt.Cu(f_),
				ae = hn._DocumentObjects._TextObjects;
			if (ae.length <= e8) {
				console.log("Txt2 incomplete");
				continue
			}
			var em = ae[e8]._Model,
				dY = em._StyleRun ? em._StyleRun._RunArray : [],
				f7 = f_.EngineDict.StyleRun.RunArray;
			for (var bM = 0; bM < f7.length; bM++) {
				var iP = f7[bM].StyleSheet.StyleSheetData;
				if (dY[bM] == null) continue;
				var jp = dY[bM]._RunData._StyleSheet._Features;
				if (jp && jp._BaselineDirection) iP.BaselineDirection = parseInt(jp._BaselineDirection.slice(1));
				if (jp && jp._FillBackgroundFlag) iP._FillBackgroundFlag = jp._FillBackgroundFlag;
				if (jp && jp._FillBackgroundColor) {
					var hG = jp._FillBackgroundColor,
						hf = hG._Color._Values.slice(0);
					for (var i = 0; i < 4; i++) hf[i] = parseFloat(hf[i].slice(1));
					iP._FillBackgroundColor = {
						Type: 1,
						Values: hf
					}
				}
				if (jp && jp._LineWidth) iP._LineWidth = parseFloat(jp._LineWidth.slice(1))
			}
			var d2 = f_.EngineDict.ParagraphRun.RunArray,
				gu = em._ParagraphRun._RunArray;
			if (gu == null) gu = [];
			var jt = Math.min(gu.length, d2.length);
			for (var i = 0; i < jt; i++) {
				var ip = d2[i].ParagraphSheet.Properties,
					aQ = hn._DocumentResources._ParagraphSheetSet._Resources,
					iL = gu[i]._RunData._ParagraphSheet;
				if (typeof iL == "string") iL = aQ[parseInt(iL.slice(1))]._Resource;
				var jx = iL._Parent == null ? iL : aQ[parseInt(iL._Parent.slice(1))]._Resource;
				iL = iL._Features;
				jx = jx._Features;
				var ep = iL._ParagraphDirection;
				if (ep == null) ep = jx._ParagraphDirection;
				if (ep) ip._Direction = parseInt(ep.slice(1));
				if (iL._ComposerEngine) ip._ComposerEngine = parseInt(iL._ComposerEngine.slice(1))
			}
			if (em._AlternateGlyphRun) {
				var gu = em._AlternateGlyphRun._RunArray,
					jt = gu.length,
					gz = f_.EngineDict.AlternateGlyphRun = dt.aqz();
				for (var i = 0; i < jt; i++) {
					var iL = gu[i],
						ed = {},
						bo = iL._RunData._AlternateGlyphSheet;
					if (bo) ed.Glyph = parseInt(bo._Glyph.slice(1));
					gz.RunArray.push(ed);
					gz.RunLengthArray.push(parseInt(iL._Length.slice(1)))
				}
			}
			var d0 = hn._DocumentResources,
				c0 = d0._TextFrameSet._Resources,
				cv = c0[e8]._Resource,
				iH = cv._Data,
				bS = new Matrix2D(1, 0, 0, 1, 0, 0);
			if (cv._0) {
				var gg = parseFloat(cv._0[0].slice(1)),
					bG = parseFloat(cv._0[1].slice(1));
				bS.translate(gg, bG)
			}
			if (bD) {
				bS.translate(bD[0], bD[1]);
				dt.mt(f_, [0, 0, bD[2] - bD[0], bD[3] - bD[1]])
			} else {
				if (cv._Bezier && cv._Bezier._Points) {
					var P = cv._Bezier._Points,
						gg = parseFloat(P[0].slice(1)),
						bG = parseFloat(P[1].slice(1));
					if (gg != 0 || bG != 0) {
						bS.translate(gg, bG)
					}
				}
			}
			if (cv._Data && cv._Data._FrameMatrix) {
				var jj = cv._Data._FrameMatrix;
				jj = jj.map(function(ga) {
					return parseFloat(ga.slice(1))
				});
				bS.concat(new Matrix2D(jj[0], jj[1], jj[2], jj[3], jj[4], jj[5]))
			}
			bS.concat(V.add.TySh.D);
			V.add.TySh.D = bS;
			var g = iH._Type ? parseInt(iH._Type.slice(1)) : 0;
			if (g == 2 || g == 1 && iH._PathData && iH._PathData._Spacing == "i-3")
				if (cv._Bezier) {
					var ay = function(ga) {
							return parseFloat(ga.slice(1))
						},
						P = cv._Bezier._Points.map(ay);
					if (bD) PixelUtil.vec.transformCoords(P, new Matrix2D(1, 0, 0, 1, -bD[0], -bD[1]), P);
					var cH = iH._PathData ? iH._PathData._Reversed : !1,
						e6 = iH._TextOnPathTRange;
					if (e6 == null) e6 = ["f-3", "f-3"];
					f_.Curve = {
						Points: P,
						TextOnPathTRange: e6.map(ay),
						Reversed: cH == null ? !1 : cH
					};
					V.add.TySh.add = {
						vmsk: new LayerRecord.VectorMask,
						vogk: null
					};
					dt.MT(V.add.TySh)
				}
			if (iH._LineOrientation == "i2") f_._LineOrientation = 2
		}
	}
	f.hE.Uc(d, !0);
	var fi = {},
		aD = [];
	for (var A = 0; A < d.B.length; A++) {
		var c7 = d.B[A].add.lyid;
		if (c7 == null) continue;
		var et = Math.max(et, c7);
		if (fi[c7] != null) aD.push(A);
		else fi[c7] = !0
	}
	for (var A = 0; A < aD.length; A++) d.B[aD[A]].add.lyid = et + 1 + A
};

// PsdReader.readThumbnail — parse image resource thumbnail block
c4.aj_ = function(l, d) {
	var G = X.q(l, d + 12),
		b = [];
	for (var A = 0; A < G; A++) {
		var V = l[d + 16 + A * 5 + 4],
			Q = X.YU(l, d + 16 + A * 5) / 32;
		b.push([V, Q])
	}
	return b
};

// PsdReader.readGlobalLayerMask — parse global layer mask info
c4.a7b = function(l) {
	var d = new DOMParser,
		G = d.parseFromString(l, "text/xml").firstChild.children[0],
		b = G.getElementsByTagName("variables");
	if (b.length == 0) return [];
	b = b[0].children;
	var V = [],
		Q = "varName trait docRef placementMethod align valign clip".split(" ");
	for (var t = 0; t < b.length; t++) {
		var I = b[t],
			y = {};
		V.push(y);
		for (var e = 0; e < Q.length; e++) {
			var M = Q[e],
				R = I.getAttribute(M);
			if (R == null) continue;
			y[M] = R
		}
	}
	return V
};

// PsdReader.readResolutionInfo — parse resolution / print info block
c4.asJ = function(l) {
	var d = new DOMParser,
		G = d.parseFromString(l, "text/xml").firstChild.children,
		b = [
			[]
		];
	if (G == null) return b;
	for (var A = 0; A < G.length; A++) {
		var V = G[A],
			Q = [];
		b.push(Q);
		for (var t = 0; t < V.children.length; t++) {
			var I = V.children[t];
			if (A == 0) b[0].push(I.tagName);
			Q.push(I.textContent)
		}
	}
	return b
};

// PsdReader.exportToBuffer — document model → PSD file bytes
c4.CO = function(l, d, G) {
	f.hE.aw(l);
	f.hE.Uc(l, !1);
	l.v_ = G[3] == !0;
	var b = [],
		V = [],
		r = 0,
		j = 1,
		q = 16,
		kq = 0;
	for (var A = 0; A < l.B.length; A++) {
		var Q = l.B[A];
		if (Q.aW() && Q.vZ(l).z) {
			Q.add.SoLd.filterFX.v.filterMaskEnable.v = Q.vZ(l).z.isEnabled
		}
		if (Q.add.TySh) {
			var t = Q.add.TySh.zC,
				I = dt.WK(t);
			Q.add.TySh.wi.TextIndex = {
				t: "long",
				v: b.length
			};
			b.push(t);
			if (I == 2) dt.Sz(Q.add.TySh)
		}
		var y = Q.add.vstk;
		if (y) y.strokeStyleResolution.v = l.m7;
		if (Q.VF() || G[2] && Q.add.SoLd) {
			V[A] = [Q.rect, Q.buffer];
			Q.rect = new Rect;
			Q.buffer = PixelUtil.allocBytes(0);
			if (Q.add.SoLd) {
				var e = Q.vZ(l);
				if (e != null) {
					V[A].push(e.buffer);
					e.buffer = PixelUtil.allocBytes(e.buffer.length)
				}
			}
		}
	}
	if (b.length > 0) {
		var M = l.add.Txt2 ? l.add.Txt2.lD : null;
		if (l.add.Txt2 == null) l.add.Txt2 = {};
		l.add.Txt2.lD = actionHelper.buildTextEngineKeyedResources(b, null, M)
	}
	var R = [l.add.lnk2, l.add.FEid, l.add.Patt],
		J = l.apc(l.B);
	l.ah1(J);
	l.yQ.r1005 = new Uint8Array([0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 0, 2]);
	X.aeo(l.yQ.r1005, 0, l.m7);
	X.aeo(l.yQ.r1005, 8, l.m7);
	if (l.kg()) {
		l.yQ.r1022 = new Uint8Array([0, 3 + l.vj.length - 1, 0])
	} else delete l.yQ.r1022;
	var n = new Uint8Array(l.B.length * 2),
		T = new Uint8Array(l.B.length);
	for (var A = 0; A < l.B.length; A++) {
		var Q = l.B[A],
			g = Q.folderStackIndex,
			Y = Q.layerLinkEnabled ? 1 : 0;
		X.fh(n, A * 2, g);
		T[A] = Y;
		if (g > r) r = g;
		if (Y == 0) j = 0
	}
	if (r > 0) l.yQ.r1026 = n;
	if (j < 1) l.yQ.r1072 = T;
	var k = l.qz,
		F = k.length,
		D = l.yQ.r1032 = PixelUtil.allocBytes(16 + 5 * F, !0);
	X.m1(D, 0, 1);
	X.m1(D, 4, 576);
	X.m1(D, 8, 576);
	X.m1(D, 12, F);
	for (var A = 0; A < F; A++) {
		X.Mb(D, q, Math.round(k[A][1] * 32));
		D[q + 4] = k[A][0];
		q += 5
	}
	if (G[4] != !0) {
		var H = [l.buffer, new Rect(0, 0, l.m, l.n)],
			W = 0;
		PixelUtil.pyramidDownsampleRgba(H);
		while (H[W + 1].O() > 200 * 200) W += 2;
		var Z = FormatHandler.jA("jpg"),
			B = H[W + 1],
			a = new Uint8Array(Z.bi([
				[H[W].buffer]
			], B.m, B.n)),
			D = l.yQ.r1036 = PixelUtil.allocBytes(28 + a.length);
		X.m1(D, 0, 1);
		X.m1(D, 4, B.m);
		X.m1(D, 8, B.n);
		X.m1(D, 12, B.m * 3);
		X.m1(D, 16, B.O() * 3);
		X.m1(D, 20, a.length);
		X.fh(D, 24, 24);
		X.fh(D, 26, 1);
		D.set(a, 28)
	}
	var m = PixelUtil.hasTransparentAlpha(l.buffer),
		p = [];
	if (m) p.push({
		name: "Transparency",
		_A: {
			o: 255,
			J: 0,
			k: 0
		},
		bu: 100,
		Ts: 1
	});
	p = p.concat(l.vj);
	delete l.yQ.r1045;
	delete l.yQ.r1006;
	delete l.yQ.r1077;
	var c = new GrowableByteBuffer;
	q = 0;
	var v = new Uint8Array(4 + p.length * 13);
	v[3] = 1;
	for (var A = 0; A < p.length; A++) {
		var i = p[A],
			z = i.name + "\0";
		X.ZI(c, q, z);
		q += 4 + z.length * 2;
		var P = 4 + A * 13;
		bA.L4(v, P, i._A);
		v[P + 11] = i.bu;
		v[P + 12] = i.Ts
	}
	if (q != 0) l.yQ.r1045 = c.data.slice(0, q);
	l.yQ.r1077 = v;
	for (var A = 0; A < l.Vp.length; A++) l.Vp[l.Vp.length - A - 1].v.sliceID.v = 2 + A * 3;
	var C = {
			classID: "null",
			baseName: {
				t: "TEXT",
				v: "User"
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
			slices: {
				t: "VlLs",
				v: l.Vp
			}
		},
		c = new GrowableByteBuffer;
	X._b(c, 0, 8);
	X._b(c, 4, 16);
	var h = jO.TH(c, C, 8);
	l.yQ.r1050 = c.data.slice(0, h + 8);
	var c = new GrowableByteBuffer;
	X._b(c, 0, 16);
	var h = jO.TH(c, l.MV, 4);
	l.yQ.r1065 = c.data.slice(0, h + 4);
	var L = l.g;
	D = l.yQ.r1069 = PixelUtil.allocBytes(2 + L.length * 4, !0);
	X.fh(D, 0, L.length);
	for (var A = 0; A < L.length; A++) X.m1(D, 2 + 4 * A, l.B[L[A]].add.lyid);
	delete l.yQ.r1058;
	delete l.yQ.r1060;
	if (Object.keys(l.CD).length != 0) {
		var U = [{
			t274: [1],
			t282: [
				[72, 1]
			],
			t283: [
				[72, 1]
			],
			t296: [2]
		}, {
			t259: [6],
			t282: [
				[72, 1]
			],
			t283: [
				[72, 1]
			],
			t296: [2],
			t513: [302],
			t514: [0]
		}];
		xmpMetadata.metadataToExifIfd(l.CD, U[0], G[0] && G[1]);
		l.yQ.r1058 = new Uint8Array(UTIF.encode(U));
		var S = xmpMetadata.buildXmpXml(l.CD);
		l.yQ.r1060 = X.zE(S)
	}
	var E = [],
		x = [],
		K = l.t_.slice(0);
	if (l.ZV) {
		var u = eU.aK([{
				type: 6
			}, {
				type: 8,
				all: 0
			}, {
				type: 3,
				length: 5,
				frule: 1,
				third: 2,
				prmA: 0,
				prmB: 0
			}, {
				type: 5,
				c: [0, 0, 0, 0, 0, 0]
			}, {
				type: 5,
				c: [20, 0, 20, 0, 20, 0]
			}, {
				type: 5,
				c: [20, 20, 20, 20, 20, 20]
			}, {
				type: 5,
				c: [0, 20, 0, 20, 0, 20]
			}, {
				type: 5,
				c: [0, 0, 0, 0, 0, 0]
			}]),
			bC = new LayerRecord.VectorMask;
		bC.i = u;
		K.push(PsdDocument.HE("Tile Symmetry 1", {
			vmsk: bC,
			vogk: LayerRecord.Ba(u)
		}))
	}
	for (var A = 0; A < K.length; A++) {
		var O = K[A],
			u = O.add.vmsk.i;
		if (A == 0 && u.length == 2) continue;
		var $ = PixelUtil.allocBytes(u.length * 26);
		eU.nb($, 0, u, l.m, l.n);
		var gX = A == 0 ? 1025 : 2e3 + A - 1;
		l.yQ["r" + gX] = $;
		if (A != 0) {
			var _ = {
				classID: "pathInfoClass",
				pathUnicodeName: {
					t: "TEXT",
					v: O.name
				}
			};
			if (O.name == "Tile Symmetry 1") _.pathSymmetryClass = {
				t: "Objc",
				v: {
					classID: "pathSymmetryClass",
					pathSymmetryMode: {
						t: "enum",
						v: {
							pathSymmetryModeEnum: "pathSymmetryModeRectangularTile"
						}
					},
					pathSymmetryCount: {
						t: "long",
						v: 1
					}
				}
			};
			E.push({
				t: "Objc",
				v: _
			});
			x.push({
				t: "Objc",
				v: {
					classID: "null",
					keyDescriptorList: {
						t: "VlLs",
						v: O.add.vogk
					}
				}
			})
		}
	}
	if (E.length != 0) {
		l.add.pths = {
			classID: "pathsDataClass",
			pathList: {
				t: "VlLs",
				v: E
			}
		};
		if (l.ZV) l.add.pths.pathSymmetrySelectedPath = {
			t: "long",
			v: E.length - 1
		};
		x = {
			classID: "null",
			keyRootDescriptorList: {
				t: "VlLs",
				v: x
			}
		};
		var c = new GrowableByteBuffer;
		X._b(c, 0, 16);
		var h = jO.TH(c, x, 4);
		l.yQ.r3000 = c.data.slice(0, h + 4)
	} else {
		delete l.add.pths;
		delete l.yQ.r3000
	}
	if (l.R7) {}
	if (l.tJ.length != 0) {
		var jI = `<variableSets xmlns="http://ns.adobe.com/Variables/1.0/">
					<variableSet locked="none" varSetName="binding1">
					<variables>`;
		for (var A = 0; A < l.tJ.length; A++) {
			var iw = l.tJ[A],
				hn = [];
			for (var gX in iw) hn.push(gX + "=\"" + iw[gX] + "\"");
			jI += "<variable " + hn.join(" ") + "></variable>"
		}
		jI += `     </variables>
				</variableSet>
			</variableSets>`;
		l.yQ.r7000 = X.zE(jI)
	}
	if (l.rw.length != 0) {
		var jI = `<sampleDataSets psdPath="${l.name}">`;
		for (var A = 1; A < l.rw.length; A++) {
			var jq = l.rw[A];
			jI += `<sampleDataSet dataSetName="Data Set ${A}">`;
			for (var iv = 0; iv < jq.length; iv++) jI += "<" + l.rw[0][iv] + ">" + jq[iv].replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</" + l.rw[0][iv] + ">\n";
			jI += `</sampleDataSet>`
		}
		jI += `</sampleDataSets>`;
		l.yQ.r7001 = X.zE(jI)
	}
	kq = c4.a0C(l, d, kq, 3 + p.length);
	kq = c4.arf(l, d, kq);
	kq = c4.apH(l, d, kq);
	kq = c4.aa9(l, d, kq, G, m);
	kq = c4.ab5(l, d, kq, G[0], m);
	var eE = [1025, 2e3, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 7e3, 7001];
	for (var A = 0; A < eE.length; A++) delete l.yQ["r" + eE[A]];
	for (var A = 0; A < l.B.length; A++) {
		var Q = l.B[A];
		if (Q.VF() || G[2] && Q.add.SoLd) {
			Q.rect = V[A][0];
			Q.buffer = V[A][1];
			if (V[A][2]) {
				var e = Q.vZ(l);
				V[A].push(e.buffer);
				e.buffer = V[A][2]
			}
		}
	}
	l.ah1(R);
	f.hE.Uc(l, !0);
	delete l.v_;
	return kq
};

// PsdReader.readHeader — parse PSD file header (version, size, depth)
c4.Zr = function(l, d, G) {
	var b = X.Ko(d, G, 4);
	G += 4;
	if (b != "8BPS") alert("invalid header signature: " + b);
	var V = X.TD(d, G);
	G += 2;
	l.v_ = V == 2;
	if (V != 1 && V != 2) alert("invalid version: " + V);
	G += 6;
	l.oq = X.TD(d, G);
	G += 2;
	l.n = X.YU(d, G);
	G += 4;
	l.m = X.YU(d, G);
	G += 4;
	l.dP = X.TD(d, G);
	G += 2;
	l.RU = X.TD(d, G);
	G += 2;
	return G
};

// PsdReader.readLayerRecord — parse one layer record from layer info section
c4.a0C = function(l, d, G, b) {
	d.ensureCapacity(0, 64);
	X.KQ(d.data, G, "8BPS");
	G += 4;
	X.fh(d.data, G, l.v_ ? 2 : 1);
	G += 2;
	X.m1(d.data, G, 0);
	G += 4;
	X.fh(d.data, G, 0);
	G += 2;
	X.fh(d.data, G, b);
	G += 2;
	X.Mb(d.data, G, l.n);
	G += 4;
	X.Mb(d.data, G, l.m);
	G += 4;
	X.fh(d.data, G, 8);
	G += 2;
	X.fh(d.data, G, 3);
	G += 2;
	return G
};

// PsdReader.readColorModeData — skip/read color mode data section
c4.apV = function(l, d, G) {
	var b = X.YU(d, G);
	G += 4;
	if (b != 0) l.xe = d.slice(G, G + b);
	G += b;
	return G
};

// PsdReader.readImageResources — parse 8BIM image resources section
c4.arf = function(l, d, G) {
	X.Kl(d, G, 0);
	G += 4;
	return G
};

// PsdReader.readLayerAndMaskInfo — parse layer and mask information section
c4.a4V = function(l, d, G) {
	var b = X.q(d, G),
		V = 0;
	G += 4;
	var Q = [];
	while (V < b) {
		var t = X.Ko(d, G + V, 4);
		V += 4;
		var I = X.TD(d, G + V);
		V += 2;
		var y = X.Qh(d, G + V);
		V += y.length;
		if (t == "MeSa" && (I == 7e3 || I == 7001)) {} else if (t != "8BIM") {
			Q.push(I);
			console.log("Unknown Image Resources signature: " + t + ", ID: " + I)
		}
		var e = X.q(d, G + V);
		V += 4;
		if (l.yQ["r" + I] != null) console.log("--- two resources with same ID");
		l.yQ["r" + I] = X.lK(d, G + V, e);
		V += e + (e & 1)
	}
	for (var A = 0; A < Q.length; A++) delete l.yQ["r" + Q[A]];
	return G + b
};

// PsdReader.readLayerInfo — parse layer info sub-section
c4.apH = function(l, d, G) {
	var b = G,
		t = 0;
	G += 4;
	var V = [];
	for (var Q in l.yQ) {
		V.push(parseInt(Q.slice(1)))
	}
	V.sort(function(R, J) {
		return R - J
	});
	for (var A = 0; A < V.length; A++) {
		var I = V[A];
		X.zr(d, G + t, I == 7e3 || I == 7001 ? "MeSa" : "8BIM");
		t += 4;
		X.pg(d, G + t, I);
		t += 2;
		var y = X.OH(d, G + t, "");
		t += y;
		var e = l.yQ["r" + I],
			M = e.length;
		X._b(d, G + t, M);
		t += 4;
		X.i7(d, G + t, e);
		t += M;
		if (M % 2 == 1) t++
	}
	X._b(d, b, t);
	return G + t
};

// PsdReader.readGlobalLayerMaskInfo — parse global layer mask sub-section
c4.ahD = function(l, d, G) {
	var b = G,
		V, Q, t = l.v_ ? 8 : 4;
	if (l.v_) V = X.fD(d, G);
	else V = X.q(d, G);
	G += t;
	if (V == 0) return b + t;
	Q = c4.ads(l, d, G);
	c4.fp(1, Q - G, "Layer Info");
	G = Q;
	Q = c4.avv(l, d, G);
	c4.fp(1, Q - G, "Global Layer Mask Info");
	G = Q;
	Q = ia.ajh(d, G, b + t + V, l.add, l.v_, l);
	c4.fp(1, Q - G, "Project Add Info");
	G = Q;
	return b + t + V
};

// PsdReader.readAdditionalLayerInfo — parse tagged layer info at end of LM section
c4.aa9 = function(l, d, G, b, V) {
	var Q = G;
	X._b(d, G, 0);
	G += 4;
	if (l.v_) {
		X._b(d, G, 0);
		G += 4
	}
	G = c4.akH(l, d, G, b, V);
	G = c4.aqs(l, d, G);
	G = ia.ad0(d, G, l.add, l.v_, l);
	if (l.v_) X.TB(d, Q, G - Q - 8);
	else X._b(d, Q, G - Q - 4);
	return G
};

// PsdReader.readChannelImageData — read composite / layer channel image data
c4.ads = function(l, d, G) {
	var b, V = l.v_ ? 8 : 4;
	if (l.v_) b = X.fD(d, G);
	else b = X.q(d, G);
	G += V;
	if (b != 0) c4.C7(l, d, G);
	return G + b
};

// PsdReader.readPascalString — read 1-byte length Pascal string
c4.C7 = function(l, d, G) {
	var b = X.Ar(d, G);
	G += 2;
	var V = Math.abs(b);
	for (var A = 0; A < V; A++) {
		var Q = new LayerRecord;
		G = aZ.Cd(Q, l, d, G);
		l.B[A] = Q
	}
	var t = new Rect(0, 0, l.m, l.n);
	for (var A = 0; A < V; A++) {
		var I = l.B[A],
			y = I.c3(),
			e = db.Cd(I, l, d, G);
		if (e - G > 8) c4.fp(2, e - G, "Lay: " + I.getName());
		G = e;
		c4.at3(I, t);
		if (y) c4.at3(y, t)
	}
};

// PsdReader.skipPadding — align offset to 4-byte boundary (no-op stub)
c4.at3 = function(l, d) {};
// PsdReader.writeHeader — serialize PSD file header
c4.akH = function(l, d, G, b, V) {
	var Q = G,
		t = l.v_;
	G += t ? 8 : 4;
	G = c4.ank(l, d, G, b, V);
	var I = G - Q - (t ? 8 : 4);
	if (I % 2 != 0) I++;
	if (t) X.TB(d, Q, I);
	else X._b(d, Q, I);
	return Q + I + (t ? 8 : 4)
};

// PsdReader.writeColorModeData — serialize color mode data section
c4.ank = function(l, d, G, b, V) {
	var Q = l.B.length;
	X.bz(d, G, V ? -Q : Q);
	G += 2;
	var t = [];
	for (var A = 0; A < Q; A++) G = aZ.CO(l.B[A], l, d, G, t);
	for (var A = 0; A < Q; A++) G = db.IN(l.v_, l.B[A], d, G, t[A], b);
	return G
};

// PsdReader.writeImageResources — serialize image resources section
c4.avv = function(l, d, G) {
	var b = X.q(d, G);
	G += 4;
	G += b;
	return G
};

// PsdReader.writeLayerAndMaskInfo — serialize layer/mask section
c4.aqs = function(l, d, G) {
	var b = X._b(d, G, 0);
	G += 4;
	return G
};

// PsdReader.readCompositeImage — read merged composite channel data
c4.a04 = function(l, d, G) {
	var b = l.RU,
		V = "Bitmap Grayscale Indexed RGB CMYK Multichannel Duotone Lab".split(" "),
		Q = [1, 1, 1, 3, 4, 1, 1, 3],
		t, T;
	if (b != 3) {
		if (b == 1 || b == 2 || b == 4) console.log("Project will be converted from " + V[b] + " to " + V[3] + " mode.");
		else {
			alert("Color mode " + V[b] + " is not supported yet :(")
		}
		if (b == 4) l.add.fcmy = 1
	}
	if (l.yQ.r1045) {
		t = [];
		var I = l.yQ.r1045,
			y = 0;
		while (y < I.length) {
			var e = X.zf(I, y);
			t.push(e);
			y += 4 + 2 + e.length * 2
		}
	}
	var M = Q[b] + (t == null || t[0] == "Transparency" ? 1 : 0),
		R = l.m,
		J = l.n,
		n = R * J,
		r = X.TD(d, G);
	G += 2;
	l.buffer = PixelUtil.allocBytes(n * 4);
	PixelUtil.andMaskUint32(l.buffer, 4278190080);
	var j = G;
	for (var g = 0; g < l.oq; g++) {
		if (r == 0) {
			T = db.c7(l.v_, l.dP, d, R, J, G, r);
			G += n * (l.dP >>> 3)
		} else if (r == 1) {
			T = PixelUtil.allocBytes(n);
			var Y = l.v_ ? 4 : 2;
			if (g == 0) G += l.oq * J * Y;
			G += db.adm(d, T, R, J, j + g * J * Y, G, Y)
		} else {
			console.log("unknown compression of image data: ", r);
			return
		}
		if (g < M) {
			PixelUtil.writeChannelToRgba(T, l.buffer, g);
			if (l.oq == 1 && g == 0) {
				PixelUtil.writeChannelToRgba(T, l.buffer, 1);
				PixelUtil.writeChannelToRgba(T, l.buffer, 2)
			}
		} else {
			var k = new LayerRecord.LayerMask,
				F = g - M,
				D = g - Q[l.RU];
			k.name = t ? t[D] : "Alpha";
			if (k.name == "Quick Mask") {
				k.jv = !0;
				l.FB.push(F)
			}
			k.rect = new Rect(0, 0, R, J);
			k.channel = T;
			k.color = 0;
			k.dispose();
			l.vj[F] = k;
			if (l.yQ.r1077) {
				var I = l.yQ.r1077.slice(4 + D * 13);
				k._A = bA.eq(I, 0);
				k.bu = I[11];
				k.Ts = I[12];
				if (k.Ts == 2) k.jv = !0
			}
		}
	}
	l.oq = 4;
	if (l.RU == 2)
		for (var A = 0; A < n; A++) {
			var q = A * 4,
				H = l.buffer[q];
			l.buffer[q] = l.xe[0 + H];
			l.buffer[q + 1] = l.xe[256 + H];
			l.buffer[q + 2] = l.xe[512 + H]
		}
	return G
};

// PsdReader.writeCompositeImage — write merged composite channel data
c4.ab5 = function(l, d, G, b, V) {
	var Q = 1,
		t = 16,
		I = l.m,
		y = l.n,
		M, R;
	X.pg(d, G, Q);
	G += 2;
	var e = I * y;
	if (!b) {
		R = new WebGLContext.RgbaFloatPlanes(I * y);
		PixelUtil.rgbaToChannelPlanes(l.buffer, R);
		var J = R.o,
			n = R.J,
			r = R.k,
			T = R.aS;
		for (var A = 0; A < e; A++) {
			var j = T[A] * (1 / 255);
			J[A] = ~~(J[A] * j + 255 * (1 - j));
			n[A] = ~~(n[A] * j + 255 * (1 - j));
			r[A] = ~~(r[A] * j + 255 * (1 - j))
		}
	} else M = PixelUtil.allocBytes(e);
	var g = [M, M, M];
	if (!b) g = [R.o, R.J, R.k];
	if (V) g.push(b ? M : R.aS);
	for (var A = 0; A < l.vj.length; A++) {
		g.push(l.vj[A].Ua(new Rect(0, 0, l.m, l.n)))
	}
	var Y = G;
	for (var k = 0; k < g.length; k++) {
		d.ensureCapacity(G, I * y + 4);
		M = g[k];
		if (Q == 0 || Q == 2 || Q == 3) G = db.hH(l.v_, M, d.data, I, y, G, Q);
		else {
			var F = l.v_ ? 4 : 2;
			if (k == 0) G += g.length * y * F;
			var D = G;
			G += db.ak3(M, d.data, I, y, Y + k * y * F, G, F)
		}
	}
	return G
};


// gS - PdfDictReader (PDF/PostScript dictionary syntax parser)
function gS() {}
// PdfDictReader.parse — parse PDF dictionary bytes → JS object tree
gS.Cd = function(l) {
	var d = {};
	gS.M5(l, d, 0, 0);
	return d
};

// PdfDictReader.serialize — JS object tree → PDF dictionary bytes
gS.CO = function(l, d) {
	var G = 0;
	G = gS.Ms(l, d, G, 0);
	return G
};

// PdfDictReader.readDict — recursively read << … >> dictionary
gS.M5 = function(l, d, G, b) {
	while (l[G] != "<".charCodeAt(0)) G++;
	G += 2;
	while (!0) {
		if (l[G] == "/".charCodeAt(0)) {
			G++;
			var V = X.indexOf(l, " ".charCodeAt(0), G, G + 50),
				Q = X.indexOf(l, "\n".charCodeAt(0), G, G + 50);
			if (Q == -1) Q = Infinity;
			if (V == -1) V = Infinity;
			var t = Math.min(Q, V),
				I = X.Ko(l, G, t - G),
				y = gS.ZS(l, t + 1, b + 1, I);
			d[I] = y.Z;
			G = t + 1;
			G += y.size
		} else if (l[G] == ">".charCodeAt(0)) {
			G += 2;
			break
		} else {
			var e = l[G];
			if (e == 10 || e == 9 || e == 32) G++;
			else {
				console.log("unknown byte: " + e + ", char: " + String.fromCharCode(e), G);
				G++
			}
		}
	}
	return G
};

// PdfDictReader.writeDict — recursively write dictionary
gS.Ms = function(l, d, G, b) {
	X.zr(d, G, "<<\n");
	G += 3;
	var V = gS.a22;
	for (var Q in l) {
		X.s8(d, G, "\t".charCodeAt(0), b + 1);
		G += b + 1;
		X.zr(d, G, "/" + Q);
		G += 1 + Q.length;
		if (V(l[Q]) || l[Q] instanceof Array) {
			X.zr(d, G, " ");
			G++
		} else {
			X.zr(d, G, "\n");
			G++;
			X.s8(d, G, "\t".charCodeAt(0), b + 1);
			G += b + 1
		}
		G = gS.Zn(l[Q], d, G, b + 1);
		X.zr(d, G, "\n");
		G++
	}
	X.s8(d, G, "\t".charCodeAt(0), b);
	G += b;
	X.zr(d, G, ">>");
	G += 2;
	return G
};

// PdfDictReader.readValue — read one PDF value (dict/array/string/number)
gS.ZS = function(l, d, G, b) {
	var V = d,
		Q = {
			size: 0,
			Z: 0
		};
	while (!0) {
		while (l[d] == " ".charCodeAt(0) || l[d] == "\t".charCodeAt(0) || l[d] == "\n".charCodeAt(0)) d++;
		if (l[d] == "<".charCodeAt(0)) {
			Q.Z = {};
			d = gS.M5(l, Q.Z, d, G + 1);
			break
		} else if (l[d] == "(".charCodeAt(0)) {
			d += 3;
			var t = d;
			while (!0) {
				if (l[t - 1] != "\\".charCodeAt(0) && l[t] == ")".charCodeAt(0) && (l[t + 1] == "\n".charCodeAt(0) || l[t + 1] == " ".charCodeAt(0))) break;
				else t++
			}
			Q.Z = X.ac7(l, d, t);
			d = t + 2;
			break
		} else if (l[d] == "[".charCodeAt(0)) {
			d++;
			Q.Z = [];
			while (l[d] == " ".charCodeAt(0) || l[d] == "\t".charCodeAt(0) || l[d] == "\n".charCodeAt(0)) d++;
			while (l[d] != "]".charCodeAt(0)) {
				var I = gS.ZS(l, d, G + 1, b);
				Q.Z.push(I.Z);
				d += I.size;
				while (l[d] == " ".charCodeAt(0) || l[d] == "\t".charCodeAt(0) || l[d] == "\n".charCodeAt(0)) d++
			}
			d++;
			break
		} else {
			var y = X.indexOf(l, " ".charCodeAt(0), d, d + 50),
				e = X.indexOf(l, "\n".charCodeAt(0), d, d + 50);
			if (e == -1) e = Infinity;
			if (y == -1) y = Infinity;
			var M = X.Ko(l, d, Math.min(y, e) - d).trim(),
				R = parseFloat(M);
			if (!isNaN(R)) {
				Q.Z = parseFloat(M);
				d = Math.min(y, e) + 1;
				break
			} else if (M == "true" || M == "false") {
				Q.Z = M == "true";
				d = Math.min(y, e) + 1;
				break
			} else if (M == "null" || M == "NaN" || M == "undefined") {
				Q.Z = 0;
				d = Math.min(y, e) + 1;
				break
			} else {
				console.log("unknown identifier: " + M);
				throw "e"
			}
			d = Math.min(y, e) + 1
		}
	}
	Q.size = d - V;
	return Q
};

// PdfDictReader.writeValue — write one PDF value
gS.Zn = function(l, d, G, b) {
	if (l instanceof Array) {
		var V = l.length == 0 || typeof l[0] == "number";
		if (V) {
			X.zr(d, G, "[ ");
			G += 2;
			for (var A = 0; A < l.length; A++) {
				var Q = l[A] + " ";
				X.zr(d, G, Q);
				G += Q.length
			}
			X.zr(d, G, "]");
			G += 1
		} else {
			X.zr(d, G, "[\n");
			G += 2;
			for (var A = 0; A < l.length; A++) {
				X.s8(d, G, "\t".charCodeAt(0), b);
				G += b;
				G = gS.Zn(l[A], d, G, b);
				X.zr(d, G, "\n");
				G++
			}
			X.s8(d, G, "\t".charCodeAt(0), b);
			G += b;
			X.zr(d, G, "]");
			G += 1
		}
	} else if (l instanceof Object) {
		G = gS.Ms(l, d, G, b)
	} else if (typeof l == "string") {
		X.zr(d, G, "(");
		G++;
		X.s8(d, G, 254);
		G++;
		X.s8(d, G, 255);
		G++;
		G = X.a9h(d, G, l);
		X.zr(d, G, ")");
		G += 1
	} else {
		var Q = l + "";
		X.zr(d, G, Q);
		G += Q.length
	}
	return G
};

// PdfDictReader.isInlineValue — true if value should stay on same line
gS.a22 = function(l) {
	var d = typeof l;
	return d == "string" || d == "number" || d == "boolean"
};


// i0 - PdfDictWriter (serialize object tree to PDF dictionary syntax)
function i0() {}
// PdfDictWriter.parse — alias: parse PDF dictionary (delegates to gS)
i0.Cd = function(l) {
	var d = {};
	i0.a3f(l, d, 0, 0);
	return d
};

// PdfDictWriter.serialize — alias: serialize to PDF dictionary bytes
i0.CO = function(l, d) {
	var G = 0;
	X.zr(d, G, " ");
	G++;
	G = i0.al5(l, d, G, 0);
	G--;
	d.ensureCapacity(G, 2);
	d.data[G] = d.data[G + 1] = 0;
	G += 2;
	return G
};

// PdfDictWriter.readDict — read dictionary (shared with gS)
i0.M5 = function(l, d, G, b) {
	while (l[G] != "<".charCodeAt(0)) {
		G++;
		console.log("\u0161ipka")
	}
	G += 2;
	G = i0.a3f(l, d, G, b);
	return G
};

// PdfDictWriter.writeDict — write dictionary (shared with gS)
i0.Ms = function(l, d, G, b) {
	X.zr(d, G, "<< ");
	G += 3;
	G = i0.al5(l, d, G, b);
	X.zr(d, G, ">>");
	G += 2;
	return G
};

// PdfDictWriter.readStream — read PDF stream object + decode
i0.QW = function(l) {
	return l == 9 || l == 10 || l == 32
};

// PdfDictWriter.writeStream — write PDF stream object
i0.a3f = function(l, d, G, b) {
	while (!0) {
		while (i0.QW(l[G]) || l[G] == 0) G++;
		if (G >= l.length) break;
		if (l[G] == "/".charCodeAt(0)) {
			G++;
			var V = G;
			while (!i0.QW(l[V])) V++;
			var Q = X.Ko(l, G, V - G);
			G = V + 1;
			var t = i0.ZS(l, G, b, Q);
			d["_" + Q] = t.Z;
			G += t.size
		} else if (l[G] == ">".charCodeAt(0)) {
			G += 2;
			break
		} else {
			var I = l[G];
			console.log(X.Ko(l, G, G + 100));
			console.log("unknown byte: " + I + ", char: " + String.fromCharCode(I) + ", offset: " + G);
			G++;
			throw "e";
			return -1
		}
	}
	return G
};

// PdfDictWriter.readArray — read PDF array value
i0.al5 = function(l, d, G, b) {
	for (var V in l) {
		var Q = V.substring(1, V.length);
		X.zr(d, G, "/" + Q);
		G += 1 + Q.length;
		X.zr(d, G, " ");
		G++;
		G = i0.Zn(l[V], d, G, b + 1);
		X.zr(d, G, " ");
		G++
	}
	return G
};

// PdfDictWriter.readValue — read one PDF value
i0.ZS = function(l, d, G, b) {
	var V = d,
		Q = {
			type: "",
			size: 0,
			Z: 0
		};
	while (i0.QW(l[d])) d++;
	if (l[d] == "<".charCodeAt(0)) {
		Q.type = "Object";
		Q.Z = {};
		d = i0.M5(l, Q.Z, d, G + 1)
	} else if (l[d] == "(".charCodeAt(0)) {
		Q.type = "String";
		d++;
		if (l[d] == ")".charCodeAt(0)) {
			Q.Z = "e";
			d++
		} else {
			d += 2;
			var t = d,
				I = 0;
			while (!0) {
				if (l[t] == ")".charCodeAt(0) && l[t - 1] != "\\".charCodeAt(0)) break;
				else t += 1
			}
			Q.Z = "s" + X.ac7(l, d, t);
			d = t + 2
		}
	} else if (l[d] == "[".charCodeAt(0)) {
		d++;
		Q.Z = [];
		Q.type = "Array";
		while (i0.QW(l[d])) d++;
		while (l[d] != "]".charCodeAt(0)) {
			var y = i0.ZS(l, d, G + 1, b);
			if (y == -1) return -1;
			Q.Z.push(y.Z);
			d += y.size;
			delete y.size;
			while (i0.QW(l[d])) d++
		}
		d++
	} else {
		var e = d;
		while (!i0.QW(l[e])) e++;
		var M = X.Ko(l, d, e - d),
			R = parseFloat(M);
		if (!isNaN(R) && M.indexOf(".") != -1) {
			Q.type = "Float";
			var J = parseFloat(M);
			Q.Z = "f" + J
		} else if (!isNaN(R) && M.indexOf(".") == -1) {
			Q.type = "Integer";
			Q.Z = "i" + parseInt(M)
		} else if (M == "true" || M == "false") {
			Q.type = "Boolean";
			Q.Z = M == "true"
		} else if (M.charAt(0) == "/") {
			Q.type = "BString";
			Q.Z = M
		} else if (M == "NaN" || M == "undefined") {
			Q.type = "Float";
			Q.Z = "f0"
		} else {
			console.log("unknown value", JSON.stringify(M));
			throw "e"
		}
		d = e + 1
	}
	Q.size = d - V;
	return Q
};

// PdfDictWriter.isInlineValue — inline-value layout check
i0.a7Y = function(l) {
	if (l == Math.round(l)) return l + ".0";
	var d = l.toFixed(5);
	while (d.endsWith("0") && d[d.length - 2] != ".") d = d.slice(0, d.length - 1);
	if (0 < l && l < 1) d = d.slice(1);
	if (-1 < l && l < 0) d = "-" + d.slice(2);
	return d
};

// PdfDictWriter.writeValue — write one PDF value
i0.Zn = function(l, d, G, b) {
	var V = typeof l == "string" ? l.charAt(0) : "";
	if (l instanceof Array) {
		X.zr(d, G, "[ ");
		G += 2;
		for (var A = 0; A < l.length; A++) {
			G = i0.Zn(l[A], d, G, b);
			X.zr(d, G, " ");
			G++
		}
		X.zr(d, G, "]");
		G += 1
	} else if (l instanceof Object) {
		G = i0.Ms(l, d, G, b)
	} else if (V == "e") {
		X.zr(d, G, "()");
		G += 2
	} else if (V == "s") {
		X.zr(d, G, "(");
		G++;
		X.s8(d, G, 254);
		G++;
		X.s8(d, G, 255);
		G++;
		G = X.a9h(d, G, l.substring(1));
		X.zr(d, G, ")");
		G++
	} else if (V == "/") {
		X.zr(d, G, l);
		G += l.length
	} else if (V == "f") {
		var Q = parseFloat(l.substring(1)),
			t = i0.a7Y(Q);
		X.zr(d, G, t);
		G += t.length
	} else if (V == "i") {
		X.zr(d, G, l.substring(1));
		G += l.length - 1
	} else {
		var t = l + "";
		X.zr(d, G, t);
		G += t.length
	}
	return G
};


// X - BinaryUtil (big-endian binary read/write helpers for PSD and resources)
function X() {}
// BinaryUtil.int32ToFourChar — uint32 → 4-char ASCII string (big-endian)
X.a5J = function(hZ) {
	var l = "";
	for (var A = 3; A >= 0; A--) l += String.fromCharCode(hZ >> A * 8 & 255);
	return l
};

// BinaryUtil.fourCharToInt32 — 4-char ASCII string → uint32
X.afT = function(l) {
	var hZ = 0;
	for (var A = l.length - 1; A >= 0; A--) hZ |= l.charCodeAt(A) << (3 - A) * 8;
	return hZ
};

// BinaryUtil.indexOf — indexOf byte value in Uint8Array
X.indexOf = function(l, d, G, b) {
	if (G == null) G = 0;
	if (b == null) b = l.length;
	b = Math.min(b, l.length);
	for (var A = G; A < b; A++)
		if (l[A] == d) return A;
	return -1
};

// BinaryUtil.indexOfSequence — find byte subsequence in buffer
X.dp = function(l, d, G) {
	if (G == null) G = 0;
	var b = d.length,
		V = l.length - b;
	if (typeof d == "string") {
		var Q = [];
		for (var A = 0; A < b; A++) Q.push(d.charCodeAt(A));
		d = Q
	}
	if (d.length > 0) {
		var t = d[0];
		for (var A = G; A < V; A++)
			if (l[A] == t) {
				var I = !0;
				for (var y = 1; y < b; y++)
					if (d[y] != l[A + y]) {
						I = !1;
						break
					}
				if (I) return A
			}
	}
	return -1
};

// BinaryUtil.readPostScriptHexString — decode PostScript hex string pairs → Unicode
X.ac7 = function(l, d, G) {
	var b = [],
		Q = "";
	while (d < G) {
		var V = l[d++];
		if (V == "\\".charCodeAt(0)) b.push(l[d++]);
		else b.push(V)
	}
	for (var A = 0; A < b.length; A += 2) Q += String.fromCharCode(b[A] << 8 | b[A + 1]);
	return Q
};

// BinaryUtil.writePostScriptString — write PostScript escaped UTF-16BE string
X.aw0 = function(l, d, G) {
	var b = new Uint8Array(2);
	for (var A = 0; A < G.length; A++) {
		X.fh(b, 0, G.charCodeAt(A));
		if (b[0] == ")".charCodeAt(0) || b[0] == "(".charCodeAt(0) || b[0] == "\\".charCodeAt(0)) {
			l[d] = "\\".charCodeAt(0);
			d++
		}
		l[d] = b[0];
		d++;
		if (b[1] == ")".charCodeAt(0) || b[1] == "(".charCodeAt(0) || b[1] == "\\".charCodeAt(0)) {
			l[d] = "\\".charCodeAt(0);
			d++
		}
		l[d] = b[1];
		d++
	}
	return d
};

// BinaryUtil.writePostScriptStringToBuffer — GrowableByteBuffer wrapper for aw0
X.a9h = function(l, d, G) {
	l.ensureCapacity(d, 4 * G.length);
	return X.aw0(l.data, d, G)
};

// BinaryUtil.readUtf16LE — read count UTF-16LE code units → string
X.Di = function(l, d, G) {
	var b = "";
	for (var A = 0; A < G; A++) {
		var V = l[d++] | l[d++] << 8;
		b += String.fromCharCode(V)
	}
	return b
};

// BinaryUtil.readUtf16BE — read count UTF-16BE code units → string
X.tj = function(l, d, G) {
	var b = "";
	for (var A = 0; A < G; A++) {
		var V = l[d++] << 8 | l[d++];
		b += String.fromCharCode(V)
	}
	return b
};

// BinaryUtil.writeUtf16BE — write string as UTF-16BE code units
X.ayG = function(l, d, G) {
	for (var A = 0; A < G.length; A++) {
		var b = G.charCodeAt(A);
		X.qW(l, d + 2 * A, b)
	}
};

// BinaryUtil.writeUtf16LE — write string as UTF-16LE code units
X.a37 = function(l, d, G) {
	for (var A = 0; A < G.length; A++) {
		var b = G.charCodeAt(A);
		X.fh(l, d + 2 * A, b)
	}
};

// BinaryUtil.writeUtf16LEToBuffer — GrowableByteBuffer wrapper for a37
X.awV = function(l, d, G) {
	l.ensureCapacity(d, 2 * G.length);
	X.a37(l.data, d, G)
};

// BinaryUtil.readUtf8Codepoints — manual UTF-8 decode → codepoint array
X.aw8 = function(l, A, d) {
	var G = [],
		b = 0,
		V = 0;
	d += A;
	while (A < d) {
		b = l[A++];
		if ((b & 128) == 0) V = b;
		else if ((b & 224) == 192) {
			V = (b & 31) << 6;
			b = l[A++];
			V |= b & 63
		} else if ((b & 240) == 224) {
			V = (b & 15) << 12;
			b = l[A++];
			V |= (b & 63) << 6;
			b = l[A++];
			V |= b & 63
		} else if ((b & 248) == 240) {
			V = (b & 7) << 18;
			b = l[A++];
			V |= (b & 63) << 12;
			b = l[A++];
			V |= (b & 63) << 6;
			b = l[A++];
			V |= b & 63
		} else throw "e";
		G.push(V)
	}
	return G
};

X.az0 = window.TextDecoder ? new window.TextDecoder("utf8") : null;
// BinaryUtil.readUtf8 — UTF-8 bytes → JS string
X.Kw = function(l, d, G) {
	if (d == null) d = 0;
	if (G == null) G = l.length;
	if (X.az0 && d == 0 && G == l.length) return X.az0.decode(l);
	var b = X.aw8(l, d, G),
		V = b.length;
	for (var A = 0; A < V; A++) b[A] = String.fromCharCode(b[A]);
	return b.join("")
};

X.aqQ = window.TextEncoder ? new window.TextEncoder("utf8") : null;
// BinaryUtil.writeUtf8 — JS string → UTF-8 Uint8Array
X.zE = function(l) {
	if (X.aqQ) return X.aqQ.encode(l);
	var d = new Uint8Array(l.length * 4),
		G = X.nR(l, d, 0);
	return d.slice(0, G)
};

// BinaryUtil.writeUtf8Into — write UTF-8 into existing buffer, return byte count
X.nR = function(l, d, G) {
	var b = l.length,
		A = 0;
	for (var V = 0; V < b; V++) {
		var Q = l.charCodeAt(V);
		if ((Q & 4294967295 - (1 << 7) + 1) == 0) {
			d[G + A] = Q;
			A++
		} else if ((Q & 4294967295 - (1 << 11) + 1) == 0) {
			d[G + A] = 192 | Q >> 6;
			d[G + A + 1] = 128 | Q >> 0 & 63;
			A += 2
		} else if ((Q & 4294967295 - (1 << 16) + 1) == 0) {
			d[G + A] = 224 | Q >> 12;
			d[G + A + 1] = 128 | Q >> 6 & 63;
			d[G + A + 2] = 128 | Q >> 0 & 63;
			A += 3
		} else if ((Q & 4294967295 - (1 << 21) + 1) == 0) {
			d[G + A] = 240 | Q >> 18;
			d[G + A + 1] = 128 | Q >> 12 & 63;
			d[G + A + 2] = 128 | Q >> 6 & 63;
			d[G + A + 3] = 128 | Q >> 0 & 63;
			A += 4
		} else throw "e"
	}
	return A
};

// BinaryUtil.readPascalUtf8 — length-prefixed UTF-8 string
X.sC = function(l, d) {
	var G = X.q(l, d),
		b = X.Kw(l, d + 4, G - 1);
	return {
		Lm: b,
		_Z: 4 + G
	}
};

// BinaryUtil.readLengthPrefixedUtf16LE — uint32 length + UTF-16LE string
X.aza = function(l, d) {
	var G = X.Lv(l, d),
		b = X.Di(l, d + 4, G);
	return b
};

// BinaryUtil.readLengthPrefixedUtf16BE — uint32 length + UTF-16BE string
X.RP = function(l, d) {
	var G = X.q(l, d),
		b = X.tj(l, d + 4, G);
	return b
};

// BinaryUtil.readUnicodeString — PSD Unicode string (uint32 char count + UTF-16BE + nul)
X.zf = function(l, d) {
	var G = X.q(l, d),
		b = X.tj(l, d + 4, G - 1);
	return b
};

// BinaryUtil.writeLengthPrefixedUtf16BE — write uint32 length + UTF-16BE
X.anW = function(l, d, G) {
	X.iy(l, d, G.length);
	d += 4;
	X.ayG(l, d, G)
};

// BinaryUtil.writeUnicodeString — write PSD Unicode string
X.apI = function(l, d, G) {
	X.m1(l, d, G.length);
	d += 4;
	X.a37(l, d, G)
};

// BinaryUtil.writeUnicodeStringToBuffer — GrowableByteBuffer wrapper for apI
X.ZI = function(l, d, G) {
	l.ensureCapacity(d, 4 + 2 * G.length);
	X.apI(l.data, d, G)
};

// BinaryUtil.writeLengthPrefixedUtf16BEToBuffer — buffer wrapper for anW
X.a2D = function(l, d, G) {
	l.ensureCapacity(d, 4 + 2 * G.length);
	X.anW(l.data, d, G)
};

// BinaryUtil.readAsciiBytes — read count ASCII bytes → char array
X.Ly = function(l, d, G) {
	var b = [];
	for (var A = 0; A < G; A++) b.push(String.fromCharCode(l[d + A]));
	return b
};

// BinaryUtil.indexOfString — find ASCII substring in byte buffer
X.ahN = function(l, d, G) {
	var b = !1,
		V = l.length - G.length;
	for (var A = d; A < V; A++) {
		for (var Q = 0; Q < G.length; Q++) {
			if (l[A + Q] != G.charCodeAt(Q)) break;
			if (Q == G.length - 1) return A
		}
	}
};

// BinaryUtil.readAscii — read fixed-length ASCII string
X.Ko = function(l, d, G) {
	var b = "";
	for (var A = 0; A < G; A++) b += String.fromCharCode(l[d + A]);
	return b
};

// BinaryUtil.writeAscii — write fixed-length ASCII string
X.KQ = function(l, d, G) {
	for (var A = 0; A < G.length; A++) l[d + A] = G.charCodeAt(A)
};

// BinaryUtil.writeAsciiToBuffer — write ASCII to GrowableByteBuffer
X.zr = function(l, d, G) {
	l.ensureCapacity(d, G.length);
	X.KQ(l.data, d, G)
};

// BinaryUtil.writeAsciiPadded — write ASCII padded to 4-byte boundary
X.aAs = function(l, d, G) {
	var b = "";
	for (var A = 0; A < G; A++) {
		var V = l[d + A];
		if (V < 10) b += "  ";
		else if (V < 100) b += " ";
		b += V + ", "
	}
	return b
};

// BinaryUtil.readUint16BE — read big-endian uint16
X.TD = function(l, d) {
	return l[d] << 8 | l[d + 1]
};

// BinaryUtil.writeUint16BE — write big-endian uint16
X.fh = function(l, d, hZ) {
	l[d] = hZ >> 8 & 255;
	l[d + 1] = hZ & 255
};

// BinaryUtil.writeUint16BEToBuffer — buffer wrapper for fh
X.pg = function(l, d, hZ) {
	l.ensureCapacity(d, 4);
	X.fh(l.data, d, hZ)
};

// BinaryUtil.readFixedPointU16 — read 16.16 fixed-point (2× uint16 BE)
X.anN = function(l, d) {
	var G = X.TD(l, d),
		b = X.TD(l, d + 2);
	return G + b * (1 / 65536)
};

// BinaryUtil.writeFixedPointU16 — write 16.16 fixed-point
X.aeo = function(l, d, hZ) {
	var G = Math.floor(hZ),
		b = Math.floor((hZ - G) * 65536);
	X.fh(l, d, G);
	X.fh(l, d + 2, b)
};

// BinaryUtil.readUint16LE — read little-endian uint16
X._w = function(l, d) {
	return l[d + 1] << 8 | l[d]
};

// BinaryUtil.writeUint16LE — write little-endian uint16
X.qW = function(l, d, hZ) {
	l[d + 1] = hZ >> 8 & 255;
	l[d] = hZ & 255
};

// BinaryUtil.writeUint16LEToBuffer — buffer wrapper for qW
X.Ke = function(l, d, hZ) {
	l.ensureCapacity(d, 4);
	X.qW(l.data, d, hZ)
};

// BinaryUtil.readInt16LE — read little-endian int16
X.Ar = function(l, d) {
	X.DD[0] = l[d + 1];
	X.DD[1] = l[d];
	return X.Id[0]
};

// BinaryUtil.readInt16BE — read big-endian int16
X.V6 = function(l, d) {
	X.DD[0] = l[d];
	X.DD[1] = l[d + 1];
	return X.Id[0]
};

X.RD = X.fh;
X.bz = X.pg;
// BinaryUtil.readInt32BE — read big-endian int32
X.YU = function(l, d) {
	X.ou[0] = l[d + 3];
	X.ou[1] = l[d + 2];
	X.ou[2] = l[d + 1];
	X.ou[3] = l[d];
	return X.HP[0]
};

// BinaryUtil.writeInt32BE — write big-endian int32
X.Mb = function(l, d, hZ) {
	X.HP[0] = hZ;
	l[d + 3] = X.ou[0];
	l[d + 2] = X.ou[1];
	l[d + 1] = X.ou[2];
	l[d + 0] = X.ou[3]
};

// BinaryUtil.writeInt32BEToBuffer — buffer wrapper for Mb
X.Kl = function(l, d, hZ) {
	l.ensureCapacity(d, 4);
	X.Mb(l.data, d, hZ)
};

// BinaryUtil.readUint32Bytes — copy 4 bytes into typed array view
X.Nh = function(l, d, G, b) {
	G[b + 0] = l[d + 0];
	G[b + 1] = l[d + 1];
	G[b + 2] = l[d + 2];
	G[b + 3] = l[d + 3]
};

// BinaryUtil.readUint32BE — read big-endian uint32 (alias via DataView)
X.Lv = function(l, d) {
	X.Nh(l, d, X.ou, 0);
	return X.a3v[0]
};

// BinaryUtil.writeUint32BE — write big-endian uint32 (alias)
X.iy = function(l, d, hZ) {
	X.a3v[0] = hZ;
	X.Nh(X.ou, 0, l, d)
};

// BinaryUtil.writeUint32BEToBuffer — buffer wrapper for iy
X.zU = function(l, d, hZ) {
	l.ensureCapacity(d, 4);
	X.iy(l.data, d, hZ)
};

// BinaryUtil.readFloat32BE — read big-endian float32
X.EY = function(l, d) {
	X.Nh(l, d, X.ou, 0);
	return X.HP[0]
};

// BinaryUtil.writeFloat32BE — write big-endian float32
X.aum = function(l, d, hZ) {
	X.HP[0] = hZ;
	X.Nh(X.ou, 0, l, d)
};

// BinaryUtil.writeFloat32BEToBuffer — buffer wrapper
X.anQ = function(l, d, hZ) {
	l.ensureCapacity(d, 4);
	X.aum(l.data, d, hZ)
};

// BinaryUtil.readUint32BE — read big-endian uint32 (PSD standard)
X.q = function(l, d) {
	var G = l[d] * (256 * 256 * 256) + (l[d + 1] << 16 | l[d + 2] << 8 | l[d + 3]);
	return G
};

// BinaryUtil.writeUint32BEToBuffer — write uint32 via buffer (alias Kl path)
X.m1 = function(l, d, hZ) {
	l[d] = hZ >> 24 & 255;
	l[d + 1] = hZ >> 16 & 255;
	l[d + 2] = hZ >> 8 & 255;
	l[d + 3] = hZ >> 0 & 255
};

// BinaryUtil.writeUint32BEAt — write uint32 at offset in GrowableByteBuffer
X._b = function(l, d, hZ) {
	l.ensureCapacity(d, 4);
	X.m1(l.data, d, hZ)
};

// BinaryUtil.readUint64BE — read big-endian uint64 as Number
X.fD = function(l, d) {
	return X.q(l, d) << 32 | X.q(l, d + 4)
};

// BinaryUtil.writeUint64BE — write big-endian uint64
X.ab6 = function(l, d, hZ) {
	X.m1(l, d, hZ >> 16 >> 16);
	X.m1(l, d + 4, hZ & 4294967295)
};

// BinaryUtil.writeUint64BEToBuffer — buffer wrapper
X.TB = function(l, d, hZ) {
	l.ensureCapacity(d, 8);
	X.ab6(l.data, d, hZ)
};

// BinaryUtil.readFloat64BE — read big-endian float64
X.o_ = function(l, d) {
	var G = new Uint8Array(8);
	for (var A = 0; A < 8; A++) G[A] = l[d + 7 - A];
	var b = new Float64Array(G.buffer);
	return b[0]
};

// BinaryUtil.writeFloat64BE — write big-endian float64
X.Ub = function(l, d) {
	var G = new Uint8Array(8);
	for (var A = 0; A < 8; A++) G[A] = l[d + A];
	var b = new Float64Array(G.buffer);
	return b[0]
};

// BinaryUtil.writeFloat64BEToBuffer — buffer wrapper for Ub
X.jp = function(l, d, hZ) {
	var G = new Float64Array(1);
	G[0] = hZ;
	var b = new Uint8Array(G.buffer);
	for (var A = 0; A < 4; A++) {
		var V = b[A];
		b[A] = b[7 - A];
		b[7 - A] = V
	}
	for (var A = 0; A < 8; A++) l[d + A] = b[A]
};

// BinaryUtil.writeFloat64BEToBuffer — alias write path for descriptor doubles
X.j_ = function(l, d, hZ) {
	l.ensureCapacity(d, 8);
	X.jp(l.data, d, hZ)
};

// BinaryUtil.readFloat64LE — read little-endian float64
X.f_ = function(l, d) {
	X.ou[0] = l[d + 3];
	X.ou[1] = l[d + 2];
	X.ou[2] = l[d + 1];
	X.ou[3] = l[d + 0];
	return X.mL[0]
};

// BinaryUtil.readFloat64LEPair — read two float64 LE (mesh coords)
X.kY = function(l, d) {
	X.ou[0] = l[d + 0];
	X.ou[1] = l[d + 1];
	X.ou[2] = l[d + 2];
	X.ou[3] = l[d + 3];
	return X.mL[0]
};

// BinaryUtil.writeFloat64LE — write little-endian float64
X.kf = function(l, d, hZ) {
	X.mL[0] = hZ;
	l[d + 0] = X.ou[3];
	l[d + 1] = X.ou[2];
	l[d + 2] = X.ou[1];
	l[d + 3] = X.ou[0]
};

// BinaryUtil.writeFloat64LEToBuffer — buffer wrapper
X.ayS = function(l, d, hZ) {
	l.ensureCapacity(d, 4);
	X.kf(l.data, d, hZ)
};

// BinaryUtil.writeFloat64LEPair — write two float64 LE
X.pF = function(l, d, hZ) {
	X.mL[0] = hZ;
	l[d + 0] = X.ou[0];
	l[d + 1] = X.ou[1];
	l[d + 2] = X.ou[2];
	l[d + 3] = X.ou[3]
};

// BinaryUtil.writeFloat64LEPairToBuffer — buffer wrapper
X.awu = function(l, d, hZ) {
	l.ensureCapacity(d, 4);
	X.pF(l.data, d, hZ)
};

// BinaryUtil.readRectFloat64 — read Rect as four float64 BE values
X.any = function(l, d) {
	var G = X.YU(l, d),
		b = G * (1 / (1 << 24));
	return b
};

// BinaryUtil.writeRectFloat64 — write Rect as four float64 BE
X.azT = function(l, d, G) {
	var b = Math.floor(G * (1 << 24));
	X.Mb(l, d, b)
};

// BinaryUtil.writeRectFloat64ToBuffer — buffer wrapper
X.avk = function(l, d, G) {
	l.ensureCapacity(d, 4);
	X.azT(l.data, d, G)
};

// BinaryUtil.readUuid — read 16-byte UUID string from buffer
X.Qh = function(l, d) {
	var G = l[d],
		b = X.Ko(l, d + 1, G);
	G += 1 - G % 2;
	return {
		ip: b,
		length: G + 1
	}
};

// BinaryUtil.writeUuid — write UUID string to buffer
X.ar0 = function(l, d, G) {
	var b = G.length;
	l[d] = b;
	X.KQ(l, d + 1, G);
	if (b % 2 == 0) {
		l[d + 1 + b] = 0;
		++b
	}
	return b + 1
};

// BinaryUtil.writeUuidToBuffer — write UUID via GrowableByteBuffer
X.OH = function(l, d, G) {
	l.ensureCapacity(d, G.length + 2);
	return X.ar0(l.data, d, G)
};

// BinaryUtil.readLengthPrefixedBytes — uint32 length + raw bytes
X.Aw = function(l, d) {
	var G = new Matrix2D;
	G.aS = X.o_(l, d + 0 * 8);
	G.k = X.o_(l, d + 1 * 8);
	G.S5 = X.o_(l, d + 2 * 8);
	G.Qd = X.o_(l, d + 3 * 8);
	G.cI = X.o_(l, d + 4 * 8);
	G.xu = X.o_(l, d + 5 * 8);
	return G
};

// BinaryUtil.writeLengthPrefixedBytes — write length-prefixed byte array
X.YI = function(l, d, G) {
	X.jp(l, d + 0 * 8, G.aS);
	X.jp(l, d + 1 * 8, G.k);
	X.jp(l, d + 2 * 8, G.S5);
	X.jp(l, d + 3 * 8, G.Qd);
	X.jp(l, d + 4 * 8, G.cI);
	X.jp(l, d + 5 * 8, G.xu)
};

// BinaryUtil.writeLengthPrefixedBytesToBuffer — buffer wrapper
X.a6F = function(l, d, G) {
	l.ensureCapacity(d, 48);
	X.YI(l.data, d, G)
};

// BinaryUtil.readPascalString — 1-byte length + ASCII (PSD pascal string)
X.a1D = function(l, d) {
	var G = X.f_(l, d),
		b = X.f_(l, d + 4),
		V = X.f_(l, d + 8),
		Q = X.f_(l, d + 12);
	return new Rect(G, b, V - G, Q - b)
};

// BinaryUtil.writePascalString — write PSD pascal string
X.a4X = function(l, d, G) {
	X.kf(l, d, G.x);
	X.kf(l, d + 4, G.y);
	X.kf(l, d + 8, G.x + G.m);
	X.kf(l, d + 12, G.y + G.n)
};

// BinaryUtil.writePascalStringToBuffer — buffer wrapper
X.apm = function(l, d, G) {
	l.ensureCapacity(d, 16);
	X.a4X(l.data, d, G)
};

// BinaryUtil.readRectInt32 — read Rect (top,left,bottom,right) as 4× int32 BE
X.NK = function(l, d) {
	var G = X.YU(l, d),
		b = X.YU(l, d + 4),
		V = X.YU(l, d + 8),
		Q = X.YU(l, d + 12);
	return new Rect(b, G, Q - b, V - G)
};

// BinaryUtil.writeRectInt32 — write Rect as 4× int32 BE
X.a36 = function(l, d, G) {
	X.Mb(l, d, G.y);
	X.Mb(l, d + 4, G.x);
	X.Mb(l, d + 8, G.y + G.n);
	X.Mb(l, d + 12, G.x + G.m)
};

// BinaryUtil.writeRectInt32ToBuffer — buffer wrapper for a36
X.ZE = function(l, d, G) {
	l.ensureCapacity(d, 16);
	X.a36(l.data, d, G)
};

// BinaryUtil.readRectInt16 — read Rect as 4× int16 BE
X.lK = function(l, d, G) {
	var b = new Uint8Array(G);
	for (var A = 0; A < G; A++) b[A] = l[d + A];
	return b
};

// BinaryUtil.writeRectInt16 — write Rect as 4× int16 BE
X.a65 = function(l, d, G) {
	l.set(G, d)
};

// BinaryUtil.writeBytes — copy byte array into GrowableByteBuffer
X.i7 = function(l, d, G) {
	l.ensureCapacity(d, G.length);
	X.a65(l.data, d, G)
};

// BinaryUtil.writeByte — write single byte, optionally repeated
X.awS = function(l, d, G, hZ) {
	if (!hZ) hZ = 1;
	for (var A = 0; A < hZ; A++) l[d + A] = G
};

// BinaryUtil.writeBytesToBuffer — write raw bytes with optional repeat
X.s8 = function(l, d, G, hZ) {
	if (!hZ) hZ = 1;
	l.ensureCapacity(d, hZ);
	X.awS(l.data, d, G, hZ)
};

X.Id = new Int16Array(1);
X.DD = new Uint8Array(X.Id.buffer);
X.HP = new Int32Array(1);
X.a3v = new Uint32Array(X.HP.buffer);
X.ou = new Uint8Array(X.HP.buffer);
X.mL = new Float32Array(X.HP.buffer);

// az - XcfReader (GIMP XCF file format reader)
function az() {}
// XcfReader.importFromBuffer — parse GIMP .xcf → document model
az.Cd = function(l, d) {
	var G = new Uint8Array(l),
		b = 0,
		V = X.Ko(G, b, 9),
		I = 4,
		y = 100;
	b += 9;
	var Q = X.Ko(G, b, 4);
	b += 4;
	b++;
	d.m = X.q(G, b);
	b += 4;
	d.n = X.q(G, b);
	b += 4;
	var t = X.q(G, b);
	b += 4;
	if (t != 0) alert("Unsupported image format, not RGB!");
	if (["file", "v001", "v002", "v003"].indexOf(Q) == -1) {
		y = X.q(G, b);
		b += 4;
		if (parseInt(Q.slice(1)) >= 7) {
			y = y
		} else alert("Unknown XCF version: " + Q);
		I = 8
	}
	var e = {};
	b = az.Hi(G, b, e);
	var M = [];
	b = az.$H(G, b, M, I);
	var R = [];
	b = az.$H(G, b, R, I);
	d.Mk = 0;
	for (var A = 0; A < M.length; A++) az.a2S(G, M[A], d, e, I, y);
	while (d.Mk > 0) {
		d.B.push(d.En());
		d.Mk--
	}
	d.B.reverse();
	delete d.Mk;
	d.buffer = PixelUtil.allocBytes(d.m * d.n * 4);
	if (d.B.length == 0) console.log("No layers!!!");
	for (var A = 0; A < R.length; A++) {
		var J = az.a7R(G, R[A], e, I, y);
		if (J.Xt[BlendModeConstants.amw]) d.P = {
			channel: J.uD,
			rect: new Rect(0, 0, d.m, d.n)
		}
	}
};

// XcfReader.readProperty — read one XCF property record
az.a2S = function(l, d, G, b, V, Q) {
	var t = G.V4(),
		I = X.q(l, d),
		R = 0;
	d += 4;
	var y = X.q(l, d);
	d += 4;
	t.rect = new Rect(0, 0, I, y);
	var e = X.q(l, d);
	d += 4;
	var M = X.sC(l, d);
	d += M._Z;
	t.tH(M.Lm);
	var J = {};
	d = az.Hi(l, d, J);
	if (J[BlendModeConstants.arL]) {
		var n = J[BlendModeConstants.arL];
		R = n.length / 4 - 1
	}
	if (J[BlendModeConstants.mo]) {
		t.rect.x = X.YU(J[BlendModeConstants.mo], 0);
		t.rect.y = X.YU(J[BlendModeConstants.mo], 4)
	}
	if (J[BlendModeConstants.a9l]) {
		t.opacity = X.q(J[BlendModeConstants.a9l], 0)
	}
	if (J[BlendModeConstants.aeA]) {
		t.add.lsct = LayerSectionType.open;
		t.layerFlags = 24
	}
	if (J[BlendModeConstants.aci]) {
		var r = X.q(J[BlendModeConstants.aci], 0);
		t.blendModeKey = BlendModeConstants.PhotoshopModeKeys[r];
		if (t.IQ() && t.blendModeKey == "norm") t.blendModeKey = "pass"
	}
	if (J[BlendModeConstants.a6A]) {
		if (X.q(J[BlendModeConstants.a6A], 0) == 0) t.layerFlags += 2
	}
	if (J[BlendModeConstants.aqR]) {
		var T = X.q(J[BlendModeConstants.aqR], 0);
		t.add.lsct = T & 1 == 1 ? LayerSectionType.open : LayerSectionType.closed
	}
	if (J[BlendModeConstants.Mv]) {
		var j = J[BlendModeConstants.Mv];
		for (var g in j) {
			var Y = j[g];
			if (g == "gimp-text-layer") {
				var k = az.a2P(Y),
					F = k.text,
					D = k.font,
					q = k.color,
					H = k["font-size"];
				if (F == null && k.markup) {
					var W = new DOMParser,
						Z = W.parseFromString(k.markup, "image/svg+xml");
					while (Z.firstChild != null && Z.firstChild.tagName != null) {
						Z = Z.firstChild;
						var B = Z.getAttribute("font"),
							a = Z.getAttribute("foreground"),
							m = Z.getAttribute("size");
						if (B != null) D = B;
						if (a != null) {
							a = LayerStyleToCss.parseColorString(a);
							q = [1, a.o / 255, a.J / 255, a.k / 255]
						}
						if (m != null) {
							H = "" + parseFloat(m) / 245
						}
					}
					F = Z.textContent
				}
				t.add.lnsr = "rend";
				t.add.TySh = dt.Iu(0, 0);
				t.add.TySh.xZ = new Rect(0, 0, 100, 100);
				t.add.TySh.D = new Matrix2D(1, 0, 0, 1, t.rect.x, t.rect.y);
				var p = t.add.TySh.zC;
				dt.sT(p, 0, F);
				var c = dt.Au(p, 0, 0),
					v = k.justify,
					i = k["line-spacing"];
				if (q) c.xg.FillColor = {
					Type: 1,
					Values: [1, parseFloat(q[1]), parseFloat(q[2]), parseFloat(q[3])]
				};
				if (H) {
					H = Math.round(parseFloat(H));
					c.xg.FontSize = H;
					t.add.TySh.D.xu += Math.min(17, H * .17)
				}
				if (i) {
					i = Math.round(parseFloat(i) + c.xg.FontSize * 1.2);
					c.xg.Leading = i;
					c.xg.AutoLeading = !1
				}
				if (v) c.GB.Justification = ["left", "right", "center", "fill"].indexOf(v);
				if (D && D != "Sans-serif") {
					var z = D.toLowerCase(),
						P = "bold italic semi extra regular condensed light".split(" "),
						C = z.length;
					for (var A = 0; A < P.length; A++) {
						var h = z.indexOf(P[A]);
						if (h != -1 && h < C && z[h - 1] == " ") C = h
					}
					if (C != z.length) D = D.slice(0, C - 1).split(" ").join("") + "-" + D.slice(C).split(" ").join("");
					dt.Wr(c, D)
				}
				dt.rW(p, 0, F.length, c);
				var L = k["box-width"],
					U = k["box-height"],
					S = L ? parseFloat(L) : t.rect.m,
					E = U ? parseFloat(U) : t.rect.n;
				dt.AO(p, 1);
				dt.mt(p, [0, 0, Math.ceil(S), Math.ceil(E)])
			} else console.log("Unknown property " + g)
		}
	}
	while (G.Mk > R) {
		G.B.push(G.En());
		G.Mk--
	}
	G.Mk = R;
	if (t.add.lsct == LayerSectionType.open || t.add.lsct == LayerSectionType.closed) G.Mk++;
	var x = V == 4 ? X.q : X.fD,
		K = x(l, d);
	d += V;
	var u = x(l, d);
	d += V;
	if (t.Eo()) {
		t.buffer = PixelUtil.allocBytes(t.rect.O() * 4);
		var bC = new WebGLContext.RgbaFloatPlanes(t.rect.O());
		az.a3F(l, K, bC, b, V, Q);
		PixelUtil.channelPlanesToRgba(bC, t.buffer)
	}
	if (u != 0) {
		t.z = new LayerRecord.LayerMask;
		var O = az.a7R(l, u, b, V, Q);
		t.z.channel = O.uD;
		t.z.rect = t.rect.clone();
		if (J[BlendModeConstants.aaX]) t.z.isEnabled = X.q(J[BlendModeConstants.aaX], 0) == 1;
		t.z.color = t.z.channel[0];
		t.z.dispose()
	}
	if (t.IQ()) t.rect = new Rect;
	G.B.push(t)
};

// XcfReader.readPropList — read property list until sentinel
az.a2P = function(l) {
	var d = "(" + X.Kw(l, 0, l.length - 1) + ")",
		G = [],
		b = {};
	az.abV(d, 1, G);
	az.apf(G, b);
	return b
};

// XcfReader.readLayer — read one XCF layer record
az.apf = function(l, d) {
	for (var A = 0; A < l.length; A++) {
		var G = l[A],
			b = G[0];
		if (G.length == 2) d[b] = G[1];
		else d[b] = G.slice(1)
	}
};

// XcfReader.readChannel — read one XCF layer channel
az.abV = function(l, d, G) {
	while (!0) {
		if (d >= l.length) throw "e";
		var b = l.charAt(d);
		d++;
		if (b == "(") {
			var V = [];
			d = az.abV(l, d, V);
			G.push(V)
		} else if (b == " " || b == "\n" || b == "\r") {} else if (b == ")") return d;
		else if (b == "\"") {
			var Q = d;
			while (!0) {
				var t = l[d];
				d++;
				if (t == "\"") break;
				if (t == "\\") d++
			}
			G.push(JSON.parse(l.slice(Q - 1, d)))
		} else {
			var Q = d - 1;
			while (l[d] != " " && l[d] != ")") d++;
			G.push(l.slice(Q, d))
		}
	}
};

// XcfReader.readHierarchy — read XCF layer group hierarchy
az.a7R = function(l, d, G, b, V) {
	var Q = X.q(l, d);
	d += 4;
	var t = X.q(l, d);
	d += 4;
	var I = X.sC(l, d);
	d += I._Z;
	var y = {};
	d = az.Hi(l, d, y);
	var e = new WebGLContext.RgbaFloatPlanes(Q * t),
		M = b == 4 ? X.q : X.fD,
		R = M(l, d);
	d += b;
	az.a3F(l, R, e, G, b, V);
	return {
		uD: e.o,
		Xt: y
	}
};

// XcfReader.readTile — read RLE/zip tile for channel
az.a3F = function(l, d, G, b, V, Q) {
	var t = X.q(l, d);
	d += 4;
	var I = X.q(l, d);
	d += 4;
	var y = X.q(l, d);
	d += 4;
	var e = V == 4 ? X.q : X.fD,
		M = e(l, d);
	d += V;
	az.ann(l, M, G, b, y, V, Q)
};

// XcfReader.decodeTile — decompress tile pixels into buffer
az.ann = function(l, d, G, b, V, Q, t) {
	var I = X.q(l, d),
		M = 0,
		A = 0;
	d += 4;
	var y = X.q(l, d);
	d += 4;
	var e = new Rect(0, 0, I, y);
	if (t == 100 || t == 150) M = 1;
	else if (t == 200 || t == 250) M = 2;
	else if (t == 300 || t == 350) M = 4;
	else if (t == 500 || t == 550) M = 2;
	else if (t == 600 || t == 650) M = 4;
	else if (t == 700 || t == 750) M = 8;
	else {
		alert("unsupported bit depth " + t);
		throw "e"
	}
	var R = V / M,
		M = Math.round(V / R),
		J = [];
	d = az.$H(l, d, J, Q);
	var n = new WebGLContext.RgbaFloatPlanes(64 * 64 * M),
		r = new Rect,
		T = b[BlendModeConstants.atW][0],
		j = [n.o, n.J, n.k, n.aS];
	if (R == 3) n.aS.fill(255);
	var g = Date.now();
	if (J.length != 0)
		for (var Y = 0; Y < y; Y += 64)
			for (var k = 0; k < I; k += 64) {
				var F = Math.min(I - k, 64),
					D = Math.min(y - Y, 64),
					q = F * D;
				r.T6(k, Y, F, D);
				az.a6G(l, J[A++], q * M, T, R, j);
				if (t == 100 || t == 150) {} else if (t == 250) {
					for (var H = 0; H < R; H++) {
						var W = j[H];
						for (var Z = 0; Z < q; Z++) {
							var B = W[Z] << 8 | W[q + Z];
							W[Z] = Math.min(B >>> 8, 255)
						}
					}
				} else if (t == 600) {
					var a = az.ao6(),
						m = new Uint32Array(1),
						p = new Float32Array(m.buffer);
					for (var H = 0; H < R; H++) {
						var W = j[H];
						for (var Z = 0; Z < q; Z++) {
							m[0] = W[Z] << 24 | W[q + Z] << 16 | W[(q << 1) + Z] << 8 | W[(q << 1) + q + Z] << 0;
							var c = p[0];
							if (c < 0) c = 0;
							else if (c > 1) c = 1;
							W[Z] = a[~~(.5 + c * 1e3)]
						}
					}
				} else console.log("unknown data format", t);
				PixelUtil.copyChannelPlanesRect(n, r, G, e)
			}
};

// XcfReader.createEmptyDoc — default empty XCF document shell
az.ao6 = function() {
	var l = az.awK;
	if (l != null) return l;
	l = az.awK = new Uint8Array(1001);
	for (var A = 0; A < 1001; A++) l[A] = ~~(.49 + 255 * PixelUtil.linearToSrgb(A * .001));
	return l
};

// XcfReader.readParasites — read XCF parasite (metadata) records
az.a6G = function(l, d, G, b, V, Q) {
	if (b == 1) {
		for (var t = 0; t < V; t++) {
			var I = Q[t],
				y = 0;
			while (y < G) {
				var hZ = l[d];
				d++;
				if (hZ < 127) {
					var e = l[d];
					d++;
					hZ++;
					for (var A = 0; A < hZ; A++) I[y + A] = e
				} else if (hZ == 127) {
					var M = l[d];
					d++;
					var R = l[d];
					d++;
					var e = l[d];
					d++;
					hZ = M << 8 | R;
					for (var A = 0; A < hZ; A++) I[y + A] = e
				} else if (hZ == 128) {
					var M = l[d];
					d++;
					var R = l[d];
					d++;
					hZ = M << 8 | R;
					for (var A = 0; A < hZ; A++) I[y + A] = l[d + A];
					d += hZ
				} else {
					hZ = 256 - hZ;
					for (var A = 0; A < hZ; A++) I[y + A] = l[d + A];
					d += hZ
				}
				y += hZ
			}
		}
	} else if (b == 2) {
		var J = pako.inflate(l.slice(d)),
			n = Math.round(J.length / G);
		for (var A = 0; A < G; A++) {
			var r = A * n;
			Q[0][A] = J[r];
			Q[1][A] = J[r + 1];
			Q[2][A] = J[r + 2];
			Q[3][A] = n == 3 ? 255 : J[r + 3]
		}
	} else alert("Unknown compression " + b)
};

// XcfReader.readFloatingSelection — read XCF floating selection
az.$H = function(l, d, G, b) {
	var V = b == 4 ? X.q : X.fD;
	while (!0) {
		var Q = V(l, d);
		d += b;
		if (Q == 0) break;
		else G.push(Q)
	}
	return d
};

// XcfReader.readPath — read XCF vector path
az.Hi = function(l, d, G) {
	while (!0) {
		var b = X.q(l, d);
		d += 4;
		var V = X.q(l, d);
		d += 4;
		if (b == BlendModeConstants.ahL) break;
		else if (b == BlendModeConstants.Mv) G[b] = az.a7j(l, d, d + V);
		else G[b] = X.lK(l, d, V);
		d += V
	}
	return d
};

// XcfReader.readGuide — read XCF guide / grid info
az.a7j = function(l, d, G) {
	var b = {};
	while (d < G) {
		var V = X.sC(l, d);
		d += V._Z;
		var Q = X.q(l, d);
		d += 4;
		if (Q != 1) console.log("unknown flags", Q);
		var t = X.q(l, d);
		d += 4;
		b[V.Lm] = X.lK(l, d, t);
		d += t
	}
	return b
};

