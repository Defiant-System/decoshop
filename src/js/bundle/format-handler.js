

function FormatHandler() {}

FormatHandler.So = {
	acN: ["PNG", "JPG", "SVG", "GIF", "PDF"],
	akM: "WEBP BMP TIFF ICO DDS TGA PPM RAW EMF DXF".split(" ")
};

FormatHandler.eT = function(l, d) {
	var G = l.memory.buffer.byteLength;
	if (G < d) l.memory.grow((d - G >>> 16) + 1)
};

FormatHandler.RT = {
	Q6: function(l, d) {
		fetch(l).then(function(G) {
			return G.arrayBuffer()
		}).then(function(G) {
			var b = new Uint8Array(G),
				V = 0,
				y = "";
			if (d) {
				V = b.length;
				var Q = {
						level: 9
					},
					t = pako.deflateRaw(b, Q),
					I = UZIP.deflateRaw(b, Q);
				console.log(V, t.length, I.length);
				b = t.length < I.length ? t : I
			}
			for (var A = 0; A < b.length; A++) y += String.fromCharCode(b[A]);
			var e = btoa(y);
			console.log(JSON.stringify([V, e]))
		})
	},
	get: function(l, d) {
		var t = BINDB_DATA[l];
		if (t == null) {
			var G = BINDB[l];
			if (G && G.length === 2 && typeof G[1] === "string") {
				var V = atob(G[1]),
					Q = V.length;
				t = new Uint8Array(Q);
				for (var A = 0; A < Q; A++) t[A] = V.charCodeAt(A);
				if (G[0] != 0) {
					var I = new Uint8Array(G[0]);
					UZIP.inflateRaw(t, I);
					t = I
				}
			} else throw "BINDB missing: " + l
		}
		if (d) {
			var y = FormatHandler.aJ(t.buffer);
			t = FormatHandler.jA(y).gR(t.buffer)
		}
		return t
	}
};

FormatHandler.aJ = function(l) {
	if (!(l instanceof ArrayBuffer)) {
		console.log("Input is not ArrayBuffer")
	}
	var d = new Uint8Array(l),
		G = FormatHandler.r_,
		b, V = 0,
		Q = d.length - 1;
	if (G(d, [239, 187, 191])) V = 3;
	while (V < d.length && (d[V] == 9 || d[V] == 10 || d[V] == 13 || d[V] == 32)) V++;
	while (Q != 0 && (d[Q] == 9 || d[Q] == 10 || d[Q] == 13 || d[Q] == 32)) Q--;
	if (G(d, [56, 66, 80, 83])) b = "psd";
	if (G(d, [6, 6, 237, 245])) b = "indd";
	if (G(d, [68, 73, 67, 77], 128)) b = "dcm";
	if (G(d, [102, 116, 121, 112, 109, 105, 102, 49], 4) || G(d, [102, 116, 121, 112, 97, 118, 105, 102], 4)) b = "avif";
	if (G(d, [102, 116, 121, 112, 105, 115, 111, 109], 4)) b = "mp4";
	if (G(d, [102, 116, 121, 112, 109, 112, 52, 50], 4)) b = "mp4";
	if (G(d, [0, 255, 75, 65])) b = "afphoto";
	if (G(d, [67, 83, 70, 67, 72, 85, 78, 75])) b = "clip";
	if (G(d, [120])) b = "pxd";
	if (G(d, [80, 68, 78, 51])) b = "pdn";
	if (G(d, [103, 105, 109, 112, 32, 120, 99, 102, 32])) b = "xcf";
	if (G(d, [102, 105, 103, 45, 107, 105, 119, 105])) b = "fig";
	if (G(d, [137, 80, 78, 71, 13, 10, 26, 10])) {
		b = "png";
		var t = 8;
		while (t < d.length) {
			var I = X.q(d, t);
			t += 4;
			var y = X.Ko(d, t, 4);
			t += 4;
			if (y == "mkTS") b = "fpng";
			t += I + 4
		}
	}
	if (G(d, [87, 76])) b = "cdr";
	if (G(d, [82, 73, 70, 70])) {
		var e = RiffChunkParser.Cd(d),
			M = e.az;
		if (M == "WEBP") b = "webp";
		else if (M.slice(0, 3) == "CDR") b = "cdr";
		else b = M
	}
	if (G(d, [70, 79, 82, 77]) || G(d, [76, 73, 83, 84]) || G(d, [67, 65, 84, 32])) {
		var e = IffChunkParser.parse(d),
			M = e.az;
		if (M == "ILBM" || M == "ANIM") b = "ilbm";
		else b = M
	}
	if (G(d, [255, 216, 255])) b = "jpg";
	if (G(d, [0, 0, 0, 12, 106, 80, 32, 32])) b = "jpg";
	if (G(d, [48, 0, 1, 0], 4)) b = "jb2";
	if (G(d, [71, 73, 70, 56])) b = "gif";
	if (G(d, [0, 0, 0, 2, 121, 102, 113, 76])) b = "msh";
	if (G(d, [0, 0, 0, 3, 121, 102, 113, 76])) b = "msh";
	if (G(d, [0, 0, 0, 16])) b = "atn";
	if (G(d, [0, 1])) b = "aco";
	if (G(d, [0, 2])) b = "aco";
	if (G(d, [65, 83, 69, 70])) b = "aco";
	if ([0, 1].indexOf(d[1]) != -1 && [1, 2, 3, 9, 10, 11].indexOf(d[2]) != -1 && [0, 16, 24, 32].indexOf(d[7]) != -1) b = "tga";
	if (G(d, [0, 2, 56, 66, 83, 76])) b = "asl";
	if (G(d, [0, 1, 0, -1, 0, 2, 0])) b = "abr";
	if (G(d, [0, 2, 0, -1, 0, 2, 0])) b = "abr";
	if (G(d, [0, 6, 0, 1])) b = "abr";
	if (G(d, [0, 6, 0, 2])) b = "abr";
	if (G(d, [0, 7, 0, 2])) b = "abr";
	if (G(d, [0, 9, 0, 2])) b = "abr";
	if (G(d, [0, 10, 0, 2])) b = "abr";
	if (G(d, [56, 66, 70, 83])) b = "shc";
	if (G(d, [56, 66, 80, 84])) b = "pat";
	if (G(d, [56, 66, 71, 82])) b = "grd";
	if (G(d, [71, 73, 77, 80, 32, 71, 114, 97])) b = "grd";
	if (G(d, [56, 66, 84, 80])) b = "tpl";
	if (G(d, [0, 4, 0, 5])) b = "acv";
	if (G(d, [99, 117, 115, 104])) b = "csh";
	if (G(d, [0, 1, 0, 0, 0])) b = "otf";
	if (G(d, [79, 84, 84, 79])) b = "otf";
	if (G(d, [116, 116, 99, 102])) b = "otf";
	if (G(d, [68, 68, 83, 32])) b = "dds";
	if (G(d, [80, 86, 82, 3])) b = "pvr";
	if (G(d, [86, 84, 70, 0])) b = "vtf";
	if (G(d, [83, 73, 77, 80])) b = "fits";
	if ((G(d, [0, 0, 1, 0]) || G(d, [0, 0, 2, 0])) && d[4] != 0) b = "ico";
	if (G(d, [66, 77])) b = "bmp";
	if (G(d, [40, 0, 0, 0])) b = "bmp";
	if (G(d, [80, 49])) b = "ppm";
	if (G(d, [80, 50])) b = "ppm";
	if (G(d, [80, 51])) b = "ppm";
	if (G(d, [80, 52])) b = "ppm";
	if (G(d, [80, 53])) b = "ppm";
	if (G(d, [80, 54])) b = "ppm";
	if (G(d, [73, 73, 42, 0])) b = "tiff";
	if (G(d, [77, 77, 0, 42])) b = "tiff";
	if (G(d, [73, 73, 85, 0])) b = "tiff";
	if (G(d, [70, 85, 74, 73, 70, 73, 76, 77])) b = "raf";
	if (G(d, [112])) b = "lif";
	if (G(d, [73, 73, 26, 0])) b = "ciff";
	if (G(d, [83, 81, 76, 105])) b = "sketch";
	if (G(d, [80, 75])) {
		var R = UZIP.parse(l, !0);
		if (R["document.json"]) b = "sketch";
		else if (R.manifest) b = "xd";
		else if (R["maindoc.xml"]) b = "kra";
		else if (R["content/root.dat"]) b = "cdr";
		else if (R["canvas.fig"]) b = "fig";
		else b = "zip"
	}
	if (G(d, [123])) b = "json";
	if (X.q(d, 0) == d.length) b = "icc";
	if (G(d, [35])) b = "icc";
	if (G(d, [84, 73, 84, 76], V)) b = "icc";
	if (G(d, [76, 85, 84, 95], V)) b = "icc";
	if (G(d, [60, 63, 120, 109], V)) {
		if (X.dp(d, "<look>") != -1) b = "icc";
		else b = "svg"
	}
	if (G(d, [255, 254, 60, 0], V)) b = "svg";
	if (G(d, [60, 115, 118, 103], V)) b = "svg";
	if (G(d, [60, 33, 100, 111], V) || G(d, [60, 33, 68, 79], V) || G(d, [60, 33, 45, 45], V)) {
		if (X.dp(d, "<svg") != -1) b = "svg";
		else b = "html"
	}
	if (G(d, [37, 33]) || G(d, [197, 208, 211, 198])) {
		if (X.dp(d, "%AI9_PrivateDataBegin") != -1 || X.dp(d, "%AI5_BeginLayer") != -1) b = "ai";
		else b = "eps"
	}
	if (G(d, [37, 80, 68, 70], V)) {
		if (X.dp(d, "/AIMetaData ") != -1) b = "ai";
		else b = "pdf"
	} else if (G(d, [10, 69, 79, 70], Q - 3)) b = "dxf";
	if (G(d, [1, 0, 9, 0])) b = "wmf";
	if (G(d, [215, 205, 198, 154])) b = "wmf";
	if (G(d, [1, 0, 0, 0])) b = "emf";
	if (G(d, [118, 47, 49, 1])) b = "exr";
	if (G(d, [10, 10, 10, 10])) b = "jsx";
	if (G(d, [77, 90])) b = "exe";
	if (b == null && PixelUtil.raw.sg(d.length) != null) return "tiff";
	return b
};

FormatHandler.r_ = function(l, d, G) {
	if (G == null) G = 0;
	for (var A = 0; A < d.length; A++)
		if (d[A] != -1 && l[G + A] != d[A]) return !1;
	return !0
};

FormatHandler.jA = function(l) {
	var d = {
		BMP: FormatHandler.aAB,
		CDR: FormatHandler.K4,
		DDS: FormatHandler.K3,
		EMF: FormatHandler.uC,
		DXF: FormatHandler.Jz,
		EPS: FormatHandler.on,
		FIG: FormatHandler.pw,
		FPNG: FormatHandler.Cl,
		INDD: FormatHandler.AL,
		GIF: FormatHandler.st,
		ICO: FormatHandler.IW,
		ILBM: FormatHandler.SM,
		FITS: FormatHandler.pl,
		EXR: FormatHandler.SO,
		JPG: FormatHandler.na,
		LIF: FormatHandler.p$,
		DCM: FormatHandler.a6Y,
		PDF: FormatHandler.ZO,
		PDN: FormatHandler.sZ,
		PNG: FormatHandler.rn,
		PPM: FormatHandler.rR,
		PSD: FormatHandler.aZ,
		PXD: FormatHandler.A1,
		RAF: FormatHandler.Sy,
		RAW: FormatHandler.e4,
		SKETCH: FormatHandler.ZA,
		SVG: FormatHandler.r2,
		TGA: FormatHandler.lG,
		AVIF: FormatHandler.a6t,
		TIFF: FormatHandler.VZ,
		VTF: FormatHandler.Sx,
		WEBP: FormatHandler.zV,
		WMF: FormatHandler.Hr,
		XCF: FormatHandler.IS,
		XD: FormatHandler.PS,
		KRA: FormatHandler.nq,
		EXE: FormatHandler.tI,
		AI: FormatHandler.R5,
		AFPHOTO: FormatHandler.$r,
		CLIP: FormatHandler.Wb,
		MP4: FormatHandler.a3C
	};
	return d[l.toUpperCase()]
};

FormatHandler.EK = function(A) {
	var l = FormatHandler.So.acN,
		d = FormatHandler.So.akM,
		G, b = [];
	if (A == null) G = l.concat(d);
	else G = A == 0 ? l : d;
	for (var A = 0; A < G.length; A++)
		if (FormatHandler.jA(G[A]).bi) b.push(G[A]);
	return b
};

FormatHandler.ap_ = function() {
	var l;

	function d(b) {
		var V = b.target,
			Q = V.width,
			t = V.height,
			I = document.createElement("canvas");
		I.width = Q;
		I.height = t;
		var y = I.getContext("2d", { willReadFrequently: true });
		y.drawImage(V, 0, 0);
		l({
			uA: new Rect(0, 0, Q, t),
			data: y.getImageData(0, 0, Q, t).data.buffer
		})
	}

	function G(b, V, Q) {
		l = Q;
		var t = document.createElement("img");
		t.onload = d;
		t.src = "data:" + V + ";base64," + FormatHandler.zR(b)
	}
	return G
}();
FormatHandler.Tz = function(l, d, G, b, V) {
	var Q = FormatHandler.CY(l, d, G, b, V),
		t = FormatHandler.LE(Q);
	return t.buffer
};

FormatHandler.LE = function(l) {
	var d = atob(l.split(",").pop()),
		G = new Uint8Array(d.length);
	for (var A = 0; A < d.length; A++) G[A] = d.charCodeAt(A);
	return G
};

FormatHandler.CY = function(l, d, G, b, V, Q) {
	if (!(l instanceof ArrayBuffer)) throw "e";
	if (b == null) b = "png";
	if (b == "png" && Q == !0) {
		var t = FormatHandler.jA("PNG").bi([
			[l, 0]
		], d, G);
		return "data:image/png;base64," + FormatHandler.zR(t)
	}
	var I = FormatHandler.nv;
	if (I == null) I = FormatHandler.nv = document.createElement("canvas");
	if (I.width != d || I.height != G) {
		I.width = d;
		I.height = G
	}
	var y = I.getContext("2d", { willReadFrequently: true }),
		e = new ImageData(new Uint8ClampedArray(l, 0, d * G * 4), d, G);
	y.putImageData(e, 0, 0);
	return I.toDataURL("image/" + b, V)
};

FormatHandler.ajL = function(l, d, G, b, V) {
	if (V == null) V = 0;
	var Q = "<defs> \t<filter id=\"sofGlow\" height=\"300%\" width=\"300%\" x=\"-75%\" y=\"-75%\"> \t\t<!-- Thicken out the original shape --> \t<feMorphology operator=\"dilate\" radius=\"3\" in=\"SourceAlpha\" result=\"thicken\" /> \t\t<!-- Use a gaussian blur to create the soft blurriness of the glow -->\t\t<feGaussianBlur in=\"thicken\" stdDeviation=\"4\" result=\"blurred\" />\t\t<!-- Change the colour -->\t\t<feFlood flood-color=\"rgb(255,255,255)\" result=\"glowColor\" />\t\t<!-- Color in the glows -->\t\t<feComposite in=\"glowColor\" in2=\"blurred\" operator=\"in\" result=\"softGlow_colored\" />\t\t<!--\tLayer the effects together -->\t\t<feMerge>\t\t\t<feMergeNode in=\"softGlow_colored\"/>\t\t\t<feMergeNode in=\"SourceGraphic\"/>\t\t</feMerge>\t</filter></defs>",
		t = "<svg  xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"  width=\"128\"  height=\"128\"> " + Q + "<g transform=\"translate(64 64) scale(" + .25 + ")\">";
	if (l == 1) t += "<g transform=\"scale(0.07 0.07) translate(-550 -112)\"  style=\"fill:#ffffff; stroke:#000000; stroke-width:60px;\"><path d=\"m 555.1899,112.08836 0,120.71094 0,920.7109 232.42188,-232.42184 111.90429,270.44924 169.76363,-84.8828 -114.09371,-273.8555 320.71481,0 z\"/></g>";
	t += "<g filter=\"url(#sofGlow)\"><image transform=\"rotate(" + V + ")\" xlink:href=\"" + d + "\" x=\"" + 80 * G + "\" y=\"" + 80 * b + "\" height=\"80\" width=\"80\"/></g></g></svg>";
	var I = new Uint8Array(t.length);
	X.nR(t, I, 0);
	var y = "data:image/svg+xml;base64," + FormatHandler.zR(I.buffer);
	return {
		Wq: y,
		vD: new Rect(0, 0, 128, 128),
		Vl: new Point2D(64, 64)
	}
};

FormatHandler.zR = function(l) {
	var d = new Uint8Array(l),
		G = "";
	for (var A = 0; A < d.length; A++) G += String.fromCharCode(d[A]);
	return btoa(G)
};

FormatHandler.a1m = function(l) {
	var d = atob(l),
		G = d.length,
		b = new Uint8Array(G);
	for (var A = 0; A < G; A++) b[A] = d.charCodeAt(A);
	return b.buffer
};

FormatHandler.tm = function(l) {
	var d = [],
		G = [];
	for (var A = 0; A < l.B.length; A++) {
		var b = l.B[A];
		if (b.getName().slice(0, 3) == "_a_") {
			d.push(A);
			G.push(b.zD())
		}
	}
	return [d, G]
};

FormatHandler.h9 = function(l, d, G, b, V, Q) {
	if (G == null) G = l.m;
	if (b == null) b = l.n;
	var t = new Rect(0, 0, l.m, l.n),
		I = new Matrix2D(G / (l.m + .001), 0, 0, b / (l.n + .001), 0, 0),
		e;
	d = d.toUpperCase();
	var y = FormatHandler.jA(d);
	if (y.zm) {
		l.LT();
		e = y.bi(l, G, b, V, Q)
	} else {
		if (V) V = V.slice(0);
		var M = FormatHandler.tm(l),
			R = M[0],
			J = M[1],
			n = l.HB(),
			r = n && V ? V.pop() : !1,
			T = n && !r ? n[0] : null,
			j = null;
		if (l.vj.length != 0) {
			j = [];
			for (var A = 0; A < l.vj.length; A++) j.push(l.vj[A].Ua(t))
		}
		if (R.length < 2) {
			var g = FormatHandler.uZ(l.LT(), n, r, l),
				Y;
			if (G == l.m && b == l.n) Y = g.buffer;
			else {
				var k = f.NH.eJ([g, t], I);
				Y = k.buffer.buffer;
				if (j) {
					var F = PixelUtil.allocBytes(t.O() * 4);
					for (var A = 0; A < j.length; A++) {
						PixelUtil.writeChannelToRgba(j[A], F, 3);
						var k = f.NH.eJ([F, t], I),
							D = j[A] = PixelUtil.allocBytes(k.rect.O());
						PixelUtil.extractChannelFromRgba(k.buffer, D, 3)
					}
				}
			}
			e = y.bi([
				[Y, 0, l.m7, l.CD, j, T]
			], G, b, V)
		} else {
			var q = [];
			for (var A = 0; A < R.length; A++) {
				var H = R[A],
					Y;
				for (var W = 0; W < R.length; W++) l.B[R[W]].Oj(R[W] == H);
				l.vp();
				l.U();
				l.Po();
				if (G == l.m && b == l.n) Y = l.LT().buffer.slice(0);
				else {
					var k = f.NH.eJ([l.LT(), t], I);
					Y = k.buffer.buffer
				}
				Y = FormatHandler.uZ(new Uint8Array(Y), n, r, l).buffer;
				var Z = l.B[H].getName().split(",");
				q.push([Y, Z[1] ? parseInt(Z[1]) : 100, l.m7, l.CD, j, T])
			}
			for (var A = 0; A < R.length; A++) l.B[R[A]].Oj(J[A]);
			l.U();
			l.Po();
			if (V) {
				var B = V.length,
					a = V[B - 3],
					m = V[B - 2],
					p = V[B - 5] / 100,
					c = V[B - 1] / 100;
				if (p != 1)
					for (var A = 0; A < q.length; A++) q[A][1] = Math.round((q[A][1] == 0 ? 16 : q[A][1]) / p);
				if (c < 1) {
					var v = 0,
						i = [],
						C = 0,
						W = 0;
					for (var A = 0; A < q.length; ++A) {
						v += q[A][1];
						if (A > 0) {
							i.push(i[i.length - 1] + q[A - 1][1])
						} else {
							i.push(0)
						}
					}
					var z = c * q.length,
						P = v / z,
						h = [];
					for (var A = 0; A < z; ++A) {
						var L = 0;
						while (C > i[W] && W + 1 < q.length) {
							L += q[W][1];
							++W
						}
						if (L != 0) {
							var U = Math.round(Math.min(1, (i[W] - C) / q[W][1]) * L);
							h[h.length - 1][1] += L - U;
							if (q[W][1] < q[W - 1][1] / 2) {
								h.push(q[W - 1])
							} else {
								h.push(q[W])
							}
							h[h.length - 1][1] = q[W][1] + U
						} else if (W < q.length) {
							h.push(q[W])
						}
						C += P;
						++W
					}
					while (W < q.length) {
						h[h.length - 1][1] += q[W][1];
						++W
					}
					q = h
				}
				if (p != 1)
					for (var A = 0; A < q.length; A++) q[A][1] = Math.round((q[A][1] == 0 ? 16 : q[A][1]) / p);
				if (a) q.reverse();
				if (m) {
					var S = q.slice(1, q.length - 1);
					S.reverse();
					q = q.concat(S)
				}
			}
			e = y.bi(q, G, b, V)
		}
	}
	return e
};

FormatHandler.uZ = function(l, d, G, b) {
	var V = b.Pi();
	if (G) {
		l = l.slice(0);
		ICC.U.applyLUT(d[3], d[2], l, l)
	} else if (V && b.add.fcmy == 1) {
		l = l.slice(0);
		ICC.U.applyLUT(V[b.add.fcmy == 1 ? 5 : 3], V[2], l, l)
	}
	return l
};

FormatHandler.a2e = function(l, d) {
	var G = new Uint8Array(l.data),
		b = new Uint8Array(d.data),
		V = 0,
		Q = 0;
	for (var t = 0; t < G.length; t += 4) {
		var I = G[t] - b[t],
			y = G[t + 1] - b[t + 1],
			e = G[t + 2] - b[t + 2],
			M = G[t + 3] - b[t + 3],
			R = I * I + y * y + e * e + M * M >>> 2;
		V += R;
		if (R > 25) Q++
	}
	var J = Q / l.uA.O() < 1e-4;
	return J
};

FormatHandler.wP = function(l, d) {
	var G = d[0].ia && d[0].ia.startsWith("_a_"),
		b;
	if (G && !1) {
		var V = 0,
			Q = d.length;
		for (var A = 0; A < d.length - 1; A++) {
			var t = d[A],
				I = d[A + 1],
				y = FormatHandler.a2e(t, I);
			if (y) {
				var e = parseFloat(t.ia.split(",").pop()),
					M = parseFloat(I.ia.split(",").pop());
				t.ia = t.ia.split(",")[0] + "," + Math.round(e + M);
				d.splice(A + 1, 1);
				A--;
				V++
			}
		}
		if (V != 0) {
			alert("Deleted " + V + " frames out of " + Q + ".");
			for (var A = 0; A < d.length; A++) {
				var J = d[A],
					n = J.ia;
				J.ia = "_a_frm" + A + "," + n.split(",")[1]
			}
		}
	}
	var r = new PsdDocument(l + ".psd"),
		T = new Rect(0, 0, 1, 1);
	if (G) {
		b = r.V4();
		b.add.lsct = LayerSectionType.open;
		b.tH(l);
		b.blendModeKey = "pass";
		b.layerFlags = 24;
		b.Oj(!0);
		r.B.push(r.En())
	}
	for (var A = 0; A < d.length; A++) {
		var j = d[A];
		T = T.Cw(j.uA);
		var g = r.V4();
		g.Oj(A == 0);
		g.tH(d.length == 1 ? "Background" : "Layer " + A);
		if (A == 0 && j.m7) r.m7 = j.m7;
		if (A == 0 && j.CD) r.CD = j.CD;
		if (j.ia) g.tH(j.ia);
		if (j.E1)
			for (var A = 0; A < j.E1.length; A++) {
				var Y = j.E1[A],
					k = PsdDocument.HE(Y[0]);
				k.add.vmsk.i = Y[1];
				PixelUtil.path.transformFlatCoords(Y[1], new Matrix2D(T.m, 0, 0, T.n, 0, 0));
				r.t_.push(k)
			}
		if (j.qz) r.qz = j.qz;
		g.rect = j.uA.clone();
		g.buffer = new Uint8Array(j.data);
		if (A == 0 && j.W2) r.Dm(j.W2);
		PixelUtil.cropRgbaAlphaOpaque(g);
		r.B.push(g)
	}
	if (G) r.B.push(b);
	if (d[0].vj) {
		for (var A = 0; A < d[0].vj.length; A++) {
			var F = new LayerRecord.LayerMask;
			r.vj.push(F);
			F.rect = d[0].uA.clone();
			F.channel = d[0].vj[A]
		}
	}
	r.g = [G ? r.B.length - 1 : 0];
	r.m = T.m;
	r.n = T.n;
	r.buffer = PixelUtil.allocBytes(T.O() * 4);
	r.U();
	return r
};

FormatHandler.Lk = function(l, d, G) {
	var b = l.length - G,
		V = new Uint8Array(b);
	for (var A = 0; A < d; A++) V[A] = l[A];
	for (var A = d; A < b; A++) V[A] = l[A + G];
	return V
};

FormatHandler.ath = function(l, d, G, b, V, Q, t, I, y) {
	var e = new Action(ActionTypes.E.v, !0);
	e.G = f.lv;
	e.data = {
		a: "h_stepbck"
	};
	var M = {};
	for (var R = 1; R < G.length; R++) {
		var J = l.g.slice(0),
			n = FormatHandler.L3(l, y, d, G, b, R),
			r = "img" + R,
			T = G[0].indexOf(t);
		if (t != "") {
			if (T == -1) alert("Column " + t + " not found.");
			else r = G[R][T]
		}
		M[r + "." + V.toLowerCase()] = new Uint8Array(FormatHandler.h9(l, V, null, null, Q, I));
		for (var A = 0; A < n; A++) y.dispatch(e)
	}
	return UZIP.encode(M)
};

FormatHandler.L3 = function(l, d, G, b, V, Q) {
	var t = new Action(ActionTypes.E.L, !0),
		e = 0;
	t.data = {
		a: ActionTypes.$.WM
	};
	var I = new Action(ActionTypes.E.v, !0);
	I.G = f.yS;
	I.data = {
		a: LayerRecord.H0,
		wH: {
			buffer: null,
			rect: null
		}
	};
	var y = I.data.wH;
	for (var M = 0; M < G.length; M++) {
		var R = G[M],
			J = R.trait,
			n = parseInt(R.docRef.slice(4, -2)),
			r = -1;
		for (var A = 0; A < l.B.length; A++)
			if (l.B[A].add.lyid == n) r = A;
		if (r == -1) continue;
		var T = b[0].indexOf(R.varName);
		if (T == -1) {
			alert("Column " + R.varName + " is missing");
			return
		}
		var g = b[Q][T],
			Y = l.B[r];
		l.g = [r];
		if (J == "textcontent") {
			t.data.nM = "app.activeDocument.activeLayer.textItem.contents = " + JSON.stringify(g) + ";";
			d.dispatch(t);
			e++
		}
		if (J == "visibility" && Y.zD() + "" != g.toLowerCase()) {
			g = g.trim().toLowerCase();
			if (g != "true" && g != "false") g = g == "" ? "false" : "true";
			t.data.nM = "app.activeDocument.activeLayer.visible = " + g + ";";
			d.dispatch(t);
			e++
		}
		if (J == "fileref") {
			var k = g.split("/").pop(),
				F = null;
			for (var hZ in V)
				if (hZ.split("/").pop() == k) F = V[hZ];
			if (F == null) {
				alert("Image " + k + " is missing.")
			} else {
				var D = FormatHandler.jA(FormatHandler.aJ(F.buffer)).gR(F.buffer)[0],
					q = D.uA,
					H = Y.rect,
					a = 0,
					m = 0;
				if (Y.add.SoLd) {
					var W = f.NH.DO(Y.add.SoLd.nonAffineTransform);
					H = PixelUtil.vec.flattenPath(W)
				}
				var Z = H.m / H.n,
					B = q.m / q.n;
				if (Z > B) {
					m = H.n;
					a = ~~(m * B)
				} else {
					a = H.m;
					m = ~~(a / B)
				}
				t.data.nM = "app.activeDocument.activeLayer.visible = false;";
				d.dispatch(t);
				e++;
				var p = f.NH.eJ([new Uint8Array(D.data), q], new Matrix2D(a / q.m, 0, 0, m / q.n, 0, 0));
				y.rect = p.rect;
				y.buffer = p.buffer;
				p.rect.x = H.x + (H.m - a >>> 1);
				p.rect.y = H.y + (H.n - m >>> 1);
				d.dispatch(I);
				e++
			}
		}
	}
	return e
};

FormatHandler.rn = {};

FormatHandler.rn.bi = function(l, d, G, b) {
	if (b == null) b = [100, !1, 0, 0, 0];
	var V = {
		sRGB: 1,
		loop: b[3]
	};
	if (l[0][5] != null) {
		delete V.sRGB;
		V.iCCP = l[0][5]
	}
	if (l[0][2] != null) {
		var Q = Math.round(l[0][2] * (1e4 / 254));
		V.pHYs = [Q, Q, 1]
	}
	var t = b[0],
		I = t == 100 ? 0 : Math.max(2, Math.floor(t * 5));
	if (I == 5) I = 4;
	var y = [],
		e = [];
	for (var A = 0; A < l.length; A++) {
		y.push(l[A][0]);
		e.push(l[A][1])
	}
	var M = UPNG.encode(y, d, G, I, e, V, b[1]);
	return M
};

FormatHandler.rn.a7u = function(l, d, G) {
	return UPNG.encodeLL([l], d, G, 3, 1, 8)
};

FormatHandler.rn.gR = function(l) {
	var d = Date.now(),
		G = UPNG.decode(l),
		b = UPNG.toRGBA8(G),
		V = G.width,
		Q = G.height,
		t = 0,
		I = G.tabs.iCCP;
	if (G.tabs.pHYs) t = Math.round(G.tabs.pHYs[0] * 254 / 1e4);
	if (b.length == 1) return [{
		uA: new Rect(0, 0, V, Q),
		data: b[0],
		m7: t,
		W2: I
	}];
	var y = [];
	for (var A = 0; A < b.length; A++) {
		y.push({
			ia: "_a_frm" + A + "," + G.frames[A].delay,
			uA: new Rect(0, 0, V, Q),
			data: b[A],
			m7: t,
			W2: I
		})
	}
	return y
};

FormatHandler.rR = {};

FormatHandler.rR.bi = function(l, d, G, b) {
	var V = new Uint8Array(l[0][0]),
		Q = d * G,
		t = Q * 3,
		I = "P6\n" + d + " " + G + "\n255\n",
		y = I.length,
		e = PixelUtil.allocBytes(y + t, !0);
	for (var A = 0; A < y; A++) e[A] = I.charCodeAt(A);
	for (var A = 0; A < Q; A++) {
		var M = A * 4,
			R = A * 3 + y;
		e[R] = V[M];
		e[R + 1] = V[M + 1];
		e[R + 2] = V[M + 2]
	}
	return e.buffer
};

FormatHandler.rR.gR = function(l) {
	l = new Uint8Array(l);
	var d = [" ".charCodeAt(0), "\n".charCodeAt(0), "\t".charCodeAt(0), "\r".charCodeAt(0)],
		G = 0,
		b = String.fromCharCode(l[0]) + String.fromCharCode(l[1]),
		V = [],
		Q = 0,
		t = b == "P1" || b == "P4" ? 2 : 3;
	for (G = 2; G < l.length; G++) {
		var I = l[G],
			y = String.fromCharCode(I);
		if (I == "#".charCodeAt(0)) {
			while (l[G] != "\n".charCodeAt(0)) G++;
			continue
		}
		var e = d.indexOf(I) != -1;
		if (Q == 0 && !e) {
			V.push(y);
			Q = 1;
			continue
		}
		if (Q == 1 && !e) {
			V[V.length - 1] += y;
			continue
		}
		if (Q == 1 && e) {
			Q = 0;
			if (V.length == t) break;
			continue
		}
	}
	var M = parseInt(V[0]),
		R = parseInt(V[1]),
		J = M * R * 4,
		n = b == "P1" || b == "P4" ? 1 : 255 / parseInt(V[2]),
		r = PixelUtil.allocBytes(J);
	if (b == "P1" || b == "P2" || b == "P3") {
		var T = "",
			j = 0,
			Q = 0,
			g = "#".charCodeAt(0);
		for (var A = G; A < l.length; A++) {
			var I = l[A],
				y = String.fromCharCode(I),
				e = d.indexOf(I) != -1;
			if (I == g) {
				while (l[A] != "\n".charCodeAt(0)) A++
			} else if (Q == 0 && !e) {
				T = y;
				Q = 1
			} else if (Q == 1) {
				if (e) {
					Q = 0;
					var Y = parseInt(T);
					T = "";
					if (b == "P1") {
						r[j] = r[j + 1] = r[j + 2] = (1 - Y) * 255;
						r[j + 3] = 255;
						j += 4
					}
					if (b == "P2") {
						r[j] = r[j + 1] = r[j + 2] = Math.round(Y * n);
						r[j + 3] = 255;
						j += 4
					}
					if (b == "P3") {
						r[j] = Math.round(Y * n);
						j++;
						if ((j & 3) == 3) {
							r[j] = 255;
							j++
						}
					}
				} else T += y
			}
		}
	}
	var k = M * R;
	if (b == "P4")
		for (var F = 0; F < R; F++) {
			var D = F * 8 * Math.ceil(M / 8);
			for (var q = 0; q < M; q++) {
				var A = D + q,
					H = l[G + 1 + (A >> 3)];
				H = H >> 7 - (A & 7) & 1;
				var W = F * M + q << 2;
				r[W] = r[W + 1] = r[W + 2] = (1 - H) * 255;
				r[W + 3] = 255
			}
		}
	if (b == "P5")
		for (var A = 0; A < k; A++) {
			var W = 4 * A;
			r[W] = r[W + 1] = r[W + 2] = Math.round(l[G + 1 + A] * n);
			r[W + 3] = 255
		}
	if (b == "P6")
		for (var A = 0; A < k; A++) {
			var W = 4 * A,
				Z = G + 1 + 3 * A;
			r[W] = Math.round(l[Z] * n);
			r[W + 1] = Math.round(l[Z + 1] * n);
			r[W + 2] = Math.round(l[Z + 2] * n);
			r[W + 3] = 255
		}
	return [{
		uA: new Rect(0, 0, M, R),
		data: r.buffer
	}]
};

FormatHandler.K3 = {};

FormatHandler.K3.bi = function(l, d, G, b) {
	if (b == null) b = [0, !0];
	if (typeof b[0] == "boolean") b[0] = 0;
	var V = new Uint8Array(l[0][0]),
		Q = d & 3,
		t = G & 3;
	if (Q != 0 || t != 0) {
		var I = d + (Q == 0 ? 0 : 4 - Q),
			y = G + (t == 0 ? 0 : 4 - t),
			e = new Uint8Array(I * y * 4);
		PixelUtil.andMaskUint32(e, 4278190080);
		PixelUtil.blitRgbaRect(V, new Rect(0, 0, d, G), e, new Rect(0, 0, I, y));
		V = e;
		d = I;
		G = y
	}
	var M = UTEX.DDS.encode(V.buffer, d, G, b);
	if (!1) {
		var R = UTEX.DDS.decode(M)[0],
			e = new Uint8Array(R.hF),
			J = 0;
		for (var A = 0; A < V.length; A++) {
			var n = V[A] - e[A];
			J += n * n
		}
		console.log(J)
	}
	return M
};

FormatHandler.K3.gR = function(l) {
	var d = UTEX.DDS.decode(l)[0];
	return [{
		uA: new Rect(0, 0, d.width, d.height),
		data: d.image
	}]
};

FormatHandler.Sx = {};

FormatHandler.Sx.gR = function(l) {
	var d = UTEX.VTF.decode(l).pop();
	return [{
		uA: new Rect(0, 0, d.width, d.height),
		data: d.image
	}]
};

FormatHandler.na = {};

FormatHandler.na.nT = null;
FormatHandler.na.aua = function(l, d) {
	var G = FormatHandler.na.nT,
		b = l.byteLength,
		V = d.width,
		Q = d.height,
		t = V * Q,
		I = 5e6 + 2 * b + t * (d.progressive ? Math.max(2, d.numComponents) * 4 + 1 : 8),
		y = G.instance.exports;
	FormatHandler.eT(y, I);
	var e = new Uint8Array(y.memory.buffer),
		M = y.malloc(b);
	e.set(new Uint8Array(l), M);
	var R = y.malloc(4),
		J = y.malloc(4),
		hZ = y.malloc(4),
		n = y.stbi_load_from_memory(M, b, R, J, hZ, 4);
	y.free(M);
	y.free(R, J, hZ);
	y.free(n);
	var r = e.slice(n, n + t * 4);
	return r
};

(function() {
	var l = FormatHandler.RT.get("wasm/jpg").buffer;
	// if (window.WebAssembly == null) window.alert("Your browser is too old (no WebAssembly). Please, update it.");
	WebAssembly.instantiate(l).then(function(d) {
		FormatHandler.na.nT = d
	})
}());

FormatHandler.na.bi = function(l, d, G, b) {
	if (b == null) b = [85];
	var V = l[0],
		Q = new Uint8Array(V[0]);
	if (PixelUtil.hasTransparentAlpha(Q)) {
		var t = new Uint8Array(Q.length),
			I = new Rect(0, 0, d, G);
		PixelUtil.andMaskUint32(t, 4294967295);
		PixelUtil.blend.compositeBlend("norm", Q, I, t, I, I, 1);
		Q = t
	}
	var y = new Uint8Array(FormatHandler.Tz(Q.buffer, d, G, "jpeg", b[0] / 100));
	if (y.length < 2e4) {
		var e = X.dp(y, [255, 226]);
		if (e != -1) {
			var M = X.TD(y, e + 2);
			console.log(e, M);
			y = FormatHandler.Lk(y, e, M + 2)
		}
	}
	if (V[5] != null) {
		var R = FormatHandler.na.$K(y)[226][0] + 2,
			J = X.TD(y, R),
			n = V[5].length + 16,
			r = n - J,
			T = new Uint8Array(y.length + r);
		for (var A = 0; A < R + J; A++) T[A] = y[A];
		for (var A = R + J; A < y.length; A++) T[A + r] = y[A];
		X.fh(T, R, n);
		T.set(V[5], R + 16);
		y = T
	}
	if (V[2] != null) {
		var j = FormatHandler.na.$K(y)[224][0] + 2;
		j += 9;
		y[j] = 1;
		X.fh(y, j + 1, V[2]);
		X.fh(y, j + 3, V[2])
	}
	if (V[3] != null && b[1] == !0 && Object.keys(V[3]).length != 0) {
		var g = 0,
			Y = 0,
			k = 0,
			F = xmpMetadata.metadataToExifIfd(V[3]),
			D = new Uint8Array(UTIF.encode([F])),
			q = "http://ns.adobe.com/xap/1.0/",
			R = 20;
		g = 4 + 6 + D.length;
		var H = xmpMetadata.buildXmpXml(V[3]),
			W = X.zE(H);
		Y = 4 + q.length + 1 + W.length;
		var Z = xmpMetadata.metadataToIptcArray(V[3]);
		if (Z.length != 0) {
			var B = 0,
				p = 0;
			for (var A = 0; A < Z.length; A++) B += 5 + Z[A][1].length;
			var a = B + (B & 1),
				m = PixelUtil.allocBytes(14 + 4 + 4 + 4 + a);
			X.KQ(m, p, "Photoshop 3.0");
			p += 14;
			X.KQ(m, p, "8BIM");
			p += 4;
			m[p++] = 4;
			m[p++] = 4;
			p += 2;
			X.m1(m, p, B);
			p += 4;
			for (var A = 0; A < Z.length; A++) {
				var c = Z[A],
					v = c[1];
				m[p++] = 28;
				m[p++] = 2;
				m[p++] = c[0];
				X.fh(m, p, v.length);
				p += 2;
				X.KQ(m, p, v);
				p += v.length
			}
			k = 4 + m.length
		}
		var i = g + Y + k,
			z = new Uint8Array(y.length + i);
		for (var A = 0; A < 20; A++) z[A] = y[A];
		for (var A = 20; A < y.length; A++) z[A + i] = y[A];
		z[R] = 255;
		z[R + 1] = 225;
		X.fh(z, R + 2, g - 2);
		X.KQ(z, R + 4, "Exif");
		for (var A = 0; A < D.length; A++) z[R + 10 + A] = D[A];
		R += g;
		z[R] = 255;
		z[R + 1] = 225;
		X.fh(z, R + 2, Y - 2);
		X.KQ(z, R + 4, q);
		for (var A = 0; A < W.length; A++) z[R + 4 + q.length + 1 + A] = W[A];
		R += Y;
		if (k != 0) {
			z[R] = 255;
			z[R + 1] = 237;
			X.fh(z, R + 2, k - 2);
			for (var A = 0; A < m.length; A++) z[R + 4 + A] = m[A];
			R += k
		}
		y = z
	}
	return y.buffer
};

FormatHandler.na.$K = function(l) {
	var d = 0,
		G = [],
		b = l.length;
	while (d < b) {
		while (l[d] != 255 && d < b) d++;
		while (l[d] == 255) d++;
		if (d == b) break;
		var V = l[d];
		d++;
		if (G[V] == null) G[V] = [];
		G[V].push(d - 2);
		if (V == 216) continue;
		if (V == 217) break;
		if (224 <= V && V <= 239 || V == 218 || V == 219 || V == 192 || V == 193 || V == 194 || V == 196 || V == 221 || V == 254) {
			var Q = X.TD(l, d);
			d += Q;
			if (V == 218)
				while (d < b && (l[d] != 255 || (l[d + 1] == 0 || 208 <= l[d + 1] && l[d + 1] <= 215))) d++;
			continue
		}
		console.log("unknown marker ", V.toString(16), d);
		break
	}
	if (G[217] == null) {
		console.log("EOI marker missing");
		var t = l.length - 2;
		l[t] = 255;
		l[t + 1] = 217;
		G[217] = [t]
	}
	return G
};

FormatHandler.na.atv = function(l) {
	l = new Uint8Array(l);
	if (l[0] != 255) return l.buffer;
	var d = FormatHandler.na.$K(l),
		G = FormatHandler.na.B3(l, d);
	if (G.numComponents != 4) return l.buffer;
	var b = G.width,
		V = G.height,
		Q = FormatHandler.na.AE(l, d, !0);
	return FormatHandler.na.bi([
		[Q[0].data]
	], b, V, [85])
};

FormatHandler.na.B3 = function(l, d) {
	var G = (d[192] ? d[192] : d[193] ? d[193] : d[194])[0] + 4,
		b = {};
	b.progressive = d[194] != null;
	b.precision = l[G];
	G++;
	b.height = X.TD(l, G);
	G += 2;
	b.width = X.TD(l, G);
	G += 2;
	b.numComponents = l[G];
	G++;
	if (d[224]) {
		var V = b.jfif = {};
		G = d[224][0] + 2 + 2 + 5 + 2;
		V.densityUnits = l[G];
		G++;
		V.xDensity = X.TD(l, G);
		G += 2;
		V.yDensity = X.TD(l, G);
		G += 2
	}
	if (d[238]) {
		var V = b.adobe = {};
		G = d[238][0] + 2 + 2 + 6;
		V.version = l[G];
		G++;
		V.flags0 = X.TD(l, G);
		G += 2;
		V.flags1 = X.TD(l, G);
		G += 2;
		V.transform = l[G];
		G++
	}
	return b
};

FormatHandler.na.awn = function(l, d, G) {
	var b = d,
		V = X.TD(l, b);
	b += 2;
	var Q = X.Ko(l, b, 4);
	if (Q == "Exif") {
		b += 6;
		var t = l.slice(b, b + V - 8),
			I;
		try {
			I = UTIF.decode(t.buffer, {
				parseMN: !1,
				debug: !1
			})
		} catch (dk) {}
		if (I && I.length != 0) G.exif = I
	} else if (Q == "http") {
		var y = 0;
		while (l[b + y] != 0) y++;
		var e = X.Ko(l, b, y);
		b += y + 1;
		if (e == "http://ns.adobe.com/xmp/extension/") {
			var M = X.Ko(l, b, 32);
			b += 32;
			b += 8;
			var R = d + V - b;
			while (l[b + R - 1] == 0) R--;
			if (G.xmp_extn == null) G.xmp_extn = "";
			try {
				G.xmp_extn += X.Kw(l, b, R)
			} catch (dk) {}
		} else if (e == "http://ns.adobe.com/xap/1.0/") {
			var J = X.Kw(l.slice(b, b + V - y - 3));
			if (J[0] == "?") J = "<" + J;
			G.xmp = J
		}
	} else console.log(Q)
};

FormatHandler.na.AE = function(l, d, G) {
	var b = FormatHandler.na.B3(l, d),
		V = b.width,
		Q = b.height,
		t = V * Q,
		I, y = -1,
		F = 72,
		D, H, W = null;
	if (b.adobe) y = b.adobe.transform;
	if (G || V * Q > 15e7 || y == 0 || y == 2) {
		var e = new PDFJS.JpegImage;
		e.parse(l);
		var M = e.getData({
				width: V,
				height: Q,
				forceRGB: !0,
				isSourcePDF: G
			}),
			I = PixelUtil.allocBytes(t * 4);
		for (var A = 0; A < t; A++) {
			var R = A << 2,
				J = R - A;
			I[R] = M[J];
			I[R + 1] = M[J + 1];
			I[R + 2] = M[J + 2];
			I[R + 3] = 255
		}
	} else {
		I = FormatHandler.na.aua(l.buffer, b)
	}
	var n = d[225];
	if (n)
		for (var A = 0; A < n.length; A++) FormatHandler.na.awn(l, n[A] + 2, b);
	var r = d[226];
	if (r) {
		var T = r[0],
			j = X.TD(l, T + 2),
			g = X.Ko(l, T + 4, 11);
		if (g == "ICC_PROFILE") {
			var Y = X.q(l, T + 18);
			b.icc = l.slice(T + 18, T + 18 + Y)
		}
	}
	var k = d[217][0] + 2;
	if (k != l.length) b.suffix = l.slice(k);
	var q = [V, Q, 1, 0, 0, 0, 1, 0];
	if (b.jfif && b.jfif.densityUnits != 0) {
		F = Math.round([72, 1, 2.54][b.jfif.densityUnits] * b.jfif.xDensity)
	} else if (b.exif && b.exif[0].t282 != null) {
		var Z = b.exif[0].t282[0];
		F = Z[0] / Z[1]
	}
	if (b.exif) {
		var B = b.exif;
		D = xmpMetadata.exifIfdToMetadata(B[0]);
		var a = B[0].t274;
		if (a) a = a[0];
		if (a != null && a > 1 && a < 20) q = PixelUtil.raw.qP(a, V, Q)
	}
	if (b.xmp) {
		D = xmpMetadata.parseXmpXmlToMetadata(b.xmp, D)
	}
	if (b.icc) H = b.icc;
	var m = d[237],
		p = [],
		c = [];
	if (m) {
		var v = new Uint8Array(65536),
			i = 0,
			T = 0;
		for (var A = 0; A < m.length; A++) {
			T = m[A] + 2;
			var z = T + X.TD(l, T);
			T += 2;
			var P = T;
			while (l[T] != 0) T++;
			T++;
			var C = X.Ko(l, P, T - P - 1),
				h = z - T;
			if (h < 0) break;
			while (i + h > v.length) {
				var L = new Uint8Array(v.length * 2);
				L.set(v);
				v = L
			}
			var U = new Uint8Array(l.buffer, T, h);
			v.set(U, i);
			i += h
		}
		T = 0;
		l = v;
		while (T < i) {
			var S = X.Ko(l, T, 4);
			T += 4;
			var E = X.TD(l, T);
			T += 2;
			var x = l[T++],
				K = X.Ko(l, T, x);
			T += x;
			if ((x & 1) == 0) T++;
			var j = X.q(l, T);
			T += 4;
			var k = T + j + (j & 1);
			if (E == 1028) {
				while (T + 4 < k) {
					var u = l[T++],
						bC = l[T++],
						O = l[T++],
						$ = X.TD(l, T);
					T += 2;
					if (u == 28 && bC == 2) p.push([O, X.Ko(l, T, $)]);
					T += $
				}
			} else if (E == 1032) W = c4.aj_(l, T);
			else if ((E & 2e3) == 2e3) {
				var gX = eU.xv(l, T, j);
				c.push([K, gX])
			} else {}
			T = k
		}
		if (p.length != 0) D = xmpMetadata.mergeIptcIntoMetadata(p, D)
	}
	var _ = [{
			uA: new Rect(0, 0, V, Q),
			data: I.buffer,
			m7: F,
			CD: D,
			W2: H,
			E1: c.length == 0 ? null : c,
			qz: W
		}],
		D = b.xmp_extn;
	if (D) {
		var jI = new DOMParser,
			iw = jI.parseFromString(D, "image/svg+xml"),
			iw = iw.children[0].children[0].children[0],
			hn = [iw.getAttribute("GImage:Data"), iw.getAttribute("GDepth:Data")];
		for (var A = 0; A < hn.length; A++)
			if (hn[A]) {
				var jq = atob(hn[A]),
					iv = new Uint8Array(jq.length);
				X.KQ(iv, 0, jq);
				iv = iv.buffer;
				var kq = FormatHandler.aJ(iv),
					eE = FormatHandler.jA(kq).gR(iv);
				_.push(eE[0])
			}
	}
	if (b.suffix) {
		var e8 = b.suffix,
			aI = !1,
			dK = X.Ko(e8, 4, 4),
			jC = X.dp(e8, [255, 216, 255]);
		if (FormatHandler.r_(e8, [0, 0, 1, 10, 14, 0, 0, 0])) {
			if (aI) console.log("Samsung");
			var T = 0;
			while (T != e8.length) {
				var d7 = X._w(e8, T + 2);
				T += 4;
				var ka = {
					2272: 12,
					2320: 21,
					2561: 13,
					2625: 21,
					2721: 3,
					2608: 0
				}[d7];
				if (ka != null) {
					var hS = X.Lv(e8, T);
					T += 4;
					var eH = X.Ko(e8, T, hS);
					T += hS;
					var kA = X.Ko(e8, T, ka);
					T += ka;
					if (d7 == 2608) {
						var gq = T,
							hb = X.q(e8, T + 24);
						T += hb + 24;
						var ex = X.q(e8, T);
						T += ex;
						var fs = e8.slice(gq, T);
						FormatHandler.na.FU(fs)
					}
				} else if (d7 == 18502) {
					while (X.Ko(e8, T, 4) != "SEFT") T += 4;
					T += 4
				} else {
					break;
					console.log(X.Ly(e8, T, 128));
					console.log(e8.slice(T));
					throw d7.toString(16)
				}
			}
		} else if (dK == "ftyp") {
			if (aI) console.log("MP4 Video");
			FormatHandler.na.FU(e8)
		} else if (X.Ko(e8, 0, 4) == "fixe") {
			if (aI) console.log("fixe");
			alert("Unknown data - " + e8.length + " B - at the end of the file", 3e3);
			var T = 4,
				j = X.Lv(e8, T);
			T += 4;
			var f_ = X.Lv(e8, T);
			T += 4;
			var bD = X.Lv(e8, T);
			T += 4;
			console.log(j, f_, bD, e8.slice(T, T + 84));
			T += 84;
			var ae = X.Ko(e8, T, 32);
			T += 32;
			T += 8;
			var ae = X.Ko(e8, T, 32);
			T += 32
		} else if (X.Ko(e8, 8, 13) == "FocusShot_Map") {
			if (aI) console.log("FocusShot_Map");
			var em = X.q(e8, 0),
				$ = X.Lv(e8, 4),
				iv = PixelUtil.allocBytes(t * 4),
				dY = PixelUtil.allocBytes(t * 4);
			for (var f7 = 0; f7 < Q; f7++)
				for (var bM = 0; bM < V; bM++) {
					var A = f7 * V + bM,
						R = A << 2,
						iP = 8 + 13 + ((f7 >>> 1) * V + bM >>> 1),
						jp = e8[iP],
						hG = e8[iP + (t >>> 2)];
					iv[R] = iv[R + 1] = iv[R + 2] = jp;
					iv[R + 3] = 255;
					dY[R] = dY[R + 1] = dY[R + 2] = hG;
					dY[R + 3] = 255
				}
			_.push({
				uA: new Rect(0, 0, V, Q),
				data: iv.buffer
			}, {
				uA: new Rect(0, 0, V, Q),
				data: dY.buffer
			})
		} else if (dK == "edof") {
			if (aI) console.log("edof");
			var a = e8[8 + 7];
			console.log(a.toString(16));
			var T = 8 + 16,
				hf = X._w(e8, T),
				d2 = X._w(e8, T + 2),
				t = hf * d2;
			T += 4;
			T += 32 + 16;
			var gu = PixelUtil.allocBytes(t * 4);
			for (var A = 0; A < t; A++) {
				var R = A << 2;
				gu[R] = gu[R + 1] = gu[R + 2] = e8[T + A];
				gu[R + 3] = 255
			}
			if (a == 16) {} else if (a == 19) {
				var jt = gu.slice(0);
				PixelUtil.canvas.Bo(gu, jt, hf, d2);
				var ip = hf;
				hf = d2;
				d2 = ip;
				PixelUtil.canvas.U5(jt, gu, hf, d2)
			} else throw "Unknown orientation of a depth map";
			_.push({
				uA: new Rect(0, 0, hf, d2),
				data: gu.buffer
			})
		} else if (jC != -1 && !(e8[0] == 255 && e8[1] == 129)) {
			if (aI) console.log("another JPG at", jC);
			if (jC > 100 && X.Ko(e8, 0, 64).indexOf("DualShot") != -1) {
				var aQ = X.Lv,
					iL = X.Ko,
					jx = X._w,
					T = 0;

				function ep() {
					var i4 = aQ(e8, T);
					if (aQ(e8, T + 4) != 0) throw "e";
					T += 8;
					return i4
				}
				var gz = X.q(e8, T);
				T += 4;
				try {
					if (gz == 45066) {
						T = 1226;
						var V = ep(),
							Q = ep();
						T = 3445
					} else if (gz == 45322) {
						var ed = aQ(e8, T);
						T += 4;
						var ae = iL(e8, T, ed);
						T += ed;
						if (ae != "DualShot_DepthMap_1") throw ae;
						V = 1008;
						Q = 756
					} else throw gz;
					var bo = PixelUtil.allocBytes(V * Q * 4);
					bo.fill(255);
					PixelUtil.grayPlaneToRgbaChannels(e8.slice(T, T + V * Q), bo);
					_.push({
						uA: new Rect(0, 0, V, Q),
						data: bo.buffer
					})
				} catch (dk) {
					console.log("error reading a depth map")
				}
			}
			try {
				if (jC != 0) e8 = e8.slice(jC);
				var eE = FormatHandler.jA("jpg").gR(e8.buffer);
				for (var A = 0; A < eE.length; A++) _.push(eE[A])
			} catch (dk) {}
		} else if (X.Ko(e8, 0, 4) == "PMPD") {
			if (aI) console.log("Xiaomi stuff");
			var T = 4,
				d0 = X.Lv(e8, 12),
				c0 = X.Lv(e8, 16),
				hf = X.Lv(e8, 1060),
				d2 = X.Lv(e8, 1064),
				cv = hf > d2,
				iH = _[0].uA.m > _[0].uA.n,
				bS = e8.slice(e8.length - hf * d2 - 4),
				gg = PixelUtil.allocBytes(hf * d2);
			for (var f7 = 0; f7 < d2; f7++)
				for (var bM = 0; bM < hf; bM++) gg[f7 * hf + bM] = bS[(d2 - f7 - 1) * hf + bM];
			var bo = PixelUtil.allocBytes(hf * d2 * 4);
			bo.fill(255);
			PixelUtil.grayPlaneToRgbaChannels(gg, bo);
			if (cv != iH) {
				var jt = bo.slice(0);
				PixelUtil.canvas.Bo(bo, jt, hf, d2);
				var ip = hf;
				hf = d2;
				d2 = ip;
				PixelUtil.canvas.U5(jt, bo, hf, d2)
			}
			_.push({
				uA: new Rect(0, 0, hf, d2),
				data: bo.buffer
			})
		} else console.log(X.Ko(e8, 0, 4), e8)
	}
	if (_.length > 1) {
		var bG = _[0].uA,
			ay = !1,
			cH = !0;
		_[0].ia = "Main";
		var jj = [!1];
		for (var A = 1; A < _.length; A++) {
			jj[A] = FormatHandler.na.adJ(new Uint8Array(_[A].data));
			if (jj[A]) ay = !0;
			if (!_[A].uA.XB(_[0].uA)) cH = !1
		}
		if (!ay && !cH) _ = _.slice(0, 1);
		else
			for (var A = 1; A < _.length; A++) {
				_[A].ia = jj[A] ? "Depth Map" : null;
				var e6 = _[A].uA;
				if (!e6.XB(bG)) {
					var fi = bG.m / e6.m,
						et = bG.n / e6.n,
						aD = new Matrix2D;
					aD.scale(fi, et);
					var c7 = f.NH.cY([new Uint8Array(_[A].data), e6], 1, PixelUtil.canvas.pu(aD));
					_[A].uA = c7.rect;
					_[A].data = c7.buffer
				}
			}
	}
	if (FormatHandler.na.Fz == 1)
		if (q[2] != 1 || q[6] != 1)
			for (var A = 0; A < _.length; A++) {
				var ga = _[A],
					cY = new Uint8Array(ga.data),
					V = ga.uA.m,
					Q = ga.uA.n,
					hf = q[0],
					d2 = q[1],
					I = PixelUtil.allocBytes(hf * d2 * 4);
				PixelUtil.canvas.s7(cY, V, Q, I, q);
				ga.uA = new Rect(0, 0, hf, d2);
				ga.data = I.buffer
			}
		return _
};

FormatHandler.na.FU = function(l) {
	if (window.confirm("Photopea found a " + SaveForWebDialog.fa(l.length) + " MP4 video inside your image. Would you like to save it?", 4e3)) {
		i1.save(l.slice(0).buffer, "video.mp4")
	}
};

FormatHandler.na.adJ = function(l) {
	var d = !0;
	for (var A = 0; A < l.length; A += 4) {
		d = d && l[A] == l[A + 1] && l[A + 1] == l[A + 2]
	}
	return d
};

FormatHandler.na.Fz = 0;
FormatHandler.na.gR = function(l, d, G) {
	l = new Uint8Array(l);
	if (l[0] == 255) {
		var b = FormatHandler.na.$K(l);
		if (b[195] == null) {
			FormatHandler.na.Fz++;
			var V = FormatHandler.na.AE(l, b, !1);
			FormatHandler.na.Fz--;
			return V
		}
		var Q = X.TD(l, b[195][0] + 5),
			t = X.TD(l, b[195][0] + 7),
			I = UTIF.LosslessJpegDecode(l),
			y = t * Q,
			e = PixelUtil.allocBytes(y * 4);
		for (var A = 0; A < y; A++) {
			var M = A << 2,
				R = M - A;
			e[M] = I[R];
			e[M + 1] = I[R + 1];
			e[M + 2] = I[R + 2];
			e[M + 3] = 255
		}
		return [{
			uA: new Rect(0, 0, t, Q),
			data: e.buffer
		}]
	} else if (l[0] == 0 && l[4] == 48 && l[6] == 1) {
		var J = l,
			n = new PDFJS.Jbig2Image,
			r = [];
		if (d) r.push({
			data: d,
			start: 0,
			end: d.length
		});
		r.push({
			data: J,
			start: 0,
			end: J.length
		});
		var I = n.parseChunks(r);
		if (!G)
			for (var A = 0; A < I.length; A++) I[A] = ~I[A];
		var t = X.q(l, 11),
			Q = X.q(l, 15),
			T = Math.ceil(t / 8),
			j = PixelUtil.allocBytes(t * Q * 4);
		for (var g = 0; g < Q; g++) {
			var Y = g * T;
			for (var k = 0; k < t; k++) {
				var M = (g * t + k) * 4,
					F = I[Y + (k >>> 3)] >>> 7 - (k & 7) & 1,
					D = F * 255;
				j[M] = D;
				j[M + 1] = D;
				j[M + 2] = D;
				j[M + 3] = 255
			}
		}
		return [{
			uA: new Rect(0, 0, t, Q),
			data: j.buffer
		}]
	} else {
		var n = new PDFJS.JpxImage;
		n.parse(l);
		var t = n.width,
			Q = n.height,
			q = n.tiles,
			H = n.componentsCount,
			W = new Uint8Array(t * Q * 4),
			Z = new Rect(0, 0, t, Q);
		for (var n = 0; n < q.length; n++) {
			var B = q[n],
				a = B.width,
				m = B.height,
				p = a * m,
				c = B.items,
				v = new Rect(B.left, B.top, a, m),
				i = new Uint8Array(p * 4);
			if (H == 1)
				for (var A = 0; A < p; A++) {
					var z = c[A],
						M = A * 4;
					i[M] = z;
					i[M + 1] = z;
					i[M + 2] = z;
					i[M + 3] = 255
				} else if (H == 3)
					for (var A = 0; A < p; A++) {
						var R = A * 3,
							M = A * 4;
						i[M] = c[R];
						i[M + 1] = c[R + 1];
						i[M + 2] = c[R + 2];
						i[M + 3] = 255
					} else console.log("Unknown number of components: " + H);
			PixelUtil.blitRgbaRect(i, v, W, Z)
		}
		return [{
			uA: Z,
			data: W.buffer
		}]
	}
};

FormatHandler.zV = {};

FormatHandler.zV.bi = function(l, d, G, b) {
	if (b == null) b = [70, 0, 0, 0];
	var V = b[0] / 100,
		J = 0;
	if (l.length == 1) {
		var Q = new Uint8Array(FormatHandler.Tz(l[0][0], d, G, "webp", V));
		if (Q.length < 2e4) {
			var t = RiffChunkParser.Cd(Q.buffer),
				I = t.sub;
			for (var A = 0; A < I.length; A++)
				if (I[A].AN == "ICCP") {
					var y = I[A];
					Q = FormatHandler.Lk(Q, y.R - 8, y.size + 8);
					X.iy(Q, 4, t.size - (y.size + 8));
					break
				}
		}
		return Q.buffer
	}
	var e = X.zr,
		M = X.zU,
		R = new GrowableByteBuffer;
	e(R, J, "RIFF    WEBPVP8X");
	J += 16;
	M(R, J, 10);
	J += 4;
	M(R, J, 18);
	J += 4;
	M(R, J, d - 1);
	J += 3;
	M(R, J, G - 1);
	J += 3;
	e(R, J, "ANIM");
	J += 4;
	M(R, J, 6);
	J += 4;
	R.ensureCapacity(J, 4);
	R.data[J + 3] = 255;
	X.Ke(R, J + 4, b[2]);
	J += 6;
	var n = [];
	for (var A = 0; A < l.length; A++) {
		n.push(l[A][0])
	}
	var r = UPNG.encode.compress(n, d, G, V == 1 ? 0 : Math.max(2, Math.floor(V * 500)), [!1, !0, !0, 0, !0]).frames;

	function T(t, a, m, p) {
		var q = t.R - 8,
			H = t.size + 8;
		m.ensureCapacity(p, H);
		for (var A = 0; A < H; A++) m.data[p + A] = a[q + A];
		return p + H
	}
	for (var A = 0; A < l.length; A++) {
		e(R, J, "ANMF");
		J += 4;
		var j = J,
			q = 0,
			H = 0;
		J += 4;
		var g = r[A],
			Y = g.rect,
			k = [Y.x >>> 1, Y.y >>> 1, Y.width - 1, Y.height - 1, l[A][1]];
		for (var F = 0; F < 5; F++) M(R, J + 3 * F, k[F]);
		J += 15;
		R.ensureCapacity(J, 1);
		R.data[J] = 1 - g.blend << 1 | g.dispose;
		J++;
		var D = new Uint8Array(FormatHandler.Tz(g.img.buffer, Y.width, Y.height, "webp", 1)),
			I = RiffChunkParser.Cd(D.buffer).sub,
			W = {};
		for (var Z = 0; Z < I.length; Z++) W[I[Z].AN] = I[Z];
		if (W.VP8L) J = T(W.VP8L, D, R, J);
		else throw "e";
		var B = J - j - 4;
		M(R, j, B);
		if ((B & 1) == 1) {
			R.ensureCapacity(J, 1);
			J++
		}
	}
	M(R, 4, J - 8);
	return R.data.slice(0, J).buffer
};
(function() {
	var l = FormatHandler.RT.get("wasm/webp").buffer;
	WebAssembly.instantiate(l).then(function(d) {
		var G = d.instance.exports;
		FormatHandler.zV.exp = G
	})
}());
FormatHandler.zV.gR = function(l) {
	var d = new Uint8Array(l),
		G = FormatHandler.zV.amH,
		b = null,
		V = RiffChunkParser.Cd(l).sub,
		Q = {};
	for (var A = 0; A < V.length; A++) Q[V[A].AN] = V[A];
	var t = Q.ANIM,
		I = Q.VP8L,
		y = Q["VP8 "],
		e = Q.VP8X;
	if (t == null) {
		var M, R;
		if (y) {
			M = X._w(d, y.R + 6);
			R = X._w(d, y.R + 8)
		} else if (I) {
			var J = X.Lv(d, I.R + 1);
			M = (J & (1 << 14) - 1) + 1;
			R = (J >>> 14 & (1 << 14) - 1) + 1
		} else throw "e";
		var n = [G(b, l, {
			R: 0,
			size: d.length
		}, M, R)];
		return n
	}
	var r = e.R,
		M = 1 + (X.Lv(d, r + 4) & 16777215),
		R = 1 + (X.Lv(d, r + 7) & 16777215),
		T = [],
		j = new Rect(0, 0, M, R),
		g = PixelUtil.allocBytes(M * R * 4);
	for (var A = 0; A < V.length; A++) {
		var Y = V[A];
		if (Y.AN != "ANMF") continue;
		var k = [];
		for (var F = 0; F < 5; F++) k.push(X.Lv(d, Y.R + F * 3) & 16777215);
		var D = new Rect(k[0] * 2, k[1] * 2, k[2] + 1, k[3] + 1),
			q = k[4],
			H = G(b, l, {
				R: Y.R + 16,
				size: Y.size - 16
			}, M, R),
			W = new Uint8Array(H.data),
			Z = d[Y.R + 15];
		if (Z >>> 1 == 0) PixelUtil.blend.compositeBlend("norm", W, D, g, j, D, 1);
		else PixelUtil.blitRgbaRect(W, D, g, j);
		T.push({
			ia: "_a_" + T.length + "," + q,
			uA: j.clone(),
			data: g.buffer.slice(0)
		});
		if ((Z & 1) == 1) {
			PixelUtil.andMaskUint32(W, 0);
			PixelUtil.blitRgbaRect(W, D, g, j)
		}
	}
	return T
};

FormatHandler.zV.amH = function(l, d, G, b, V) {
	var Q = FormatHandler.zV.exp,
		t = Q.memory,
		I = 5e6 + 2 * G.size + b * V * 10;
	FormatHandler.eT(Q, I);
	var y = new Uint8Array(t.buffer),
		e = Q.malloc(G.size);
	y.set(new Uint8Array(d, G.R, G.size), e);
	var M = Q.malloc(8),
		R = Q.WebPDecodeARGB(e, G.size, M, M + 4),
		J = X.Lv(y, M),
		n = X.Lv(y, M + 4),
		r = J * n * 4,
		T = PixelUtil.allocBytes(r);
	for (var A = 0; A < r; A += 4) {
		T[A] = y[R + A + 1];
		T[A + 1] = y[R + A + 2];
		T[A + 2] = y[R + A + 3];
		T[A + 3] = y[R + A]
	}
	Q.WebPFree(R);
	Q.free(M);
	Q.free(e);
	return {
		uA: new Rect(0, 0, J, n),
		data: T.buffer
	}
};

FormatHandler.aAB = function() {
	function l(I, y, e, M) {
		var R = new Uint8Array(I[0][0]),
			J = new Uint32Array(R.buffer),
			n = [],
			r = {},
			j = 24,
			g = 0,
			q = 0;
		for (var A = 0; A < J.length; A++) {
			var T = J[A] & 16777215;
			if (r[T] == null) {
				r[T] = n.length;
				n.push(T);
				if (n.length > 256) {
					n = null;
					break
				}
			}
		}
		if (n) {
			j = 1;
			while (1 << j < n.length) j *= 2;
			if (j == 2) j = 4
		}
		var Y = {
				iJ: y,
				Tq: e,
				Wn: 1,
				hB: j,
				ts: 0,
				agH: g
			},
			k = 4 * Math.floor((Y.hB * Y.iJ + 31) / 32);
		Y.size = k * Y.Tq + 2;
		var F = new GrowableByteBuffer,
			D = n ? (1 << j) * 4 : 0;
		X.zr(F, q, "BM");
		q += 2;
		X.zU(F, q, k * e + 16 + 40 + D);
		q += 4;
		X.zU(F, q, 0);
		q += 4;
		X.zU(F, q, 54 + D);
		q += 4;
		F.ensureCapacity(q, 40);
		X.zU(F, q, 40);
		q += 4;
		t(F.data, q, Y, k);
		q += 36;
		if (n) {
			F.ensureCapacity(q, D);
			var H = F.data;
			for (var A = 0; A < n.length; A++) {
				var W = q + A * 4,
					Z = n[A] >>> 16,
					B = n[A] >>> 8 & 255,
					a = n[A] & 255;
				H[W] = Z;
				H[W + 1] = B;
				H[W + 2] = a
			}
			q += D
		}
		F.ensureCapacity(q, k * e);
		if (j == 24)
			for (var m = 0; m < e; m++) {
				var p = q + (e - 1 - m) * k;
				for (var c = 0; c < y; c++) {
					var v = (m * y + c) * 4;
					F.data[p + c * 3 + 2] = R[v];
					F.data[p + c * 3 + 1] = R[v + 1];
					F.data[p + c * 3 + 0] = R[v + 2]
				}
			} else if (j == 8)
				for (var m = 0; m < e; m++) {
					var p = q + (e - 1 - m) * k;
					for (var c = 0; c < y; c++) {
						var v = m * y + c,
							i = r[J[v] & 16777215];
						F.data[p + c] |= i
					}
				} else if (j == 4)
					for (var m = 0; m < e; m++) {
						var p = q + (e - 1 - m) * k;
						for (var c = 0; c < y; c++) {
							var v = m * y + c,
								i = r[J[v] & 16777215];
							F.data[p + (c >>> 1)] |= i << 4 - (c & 1) * 4
						}
					} else if (j == 1)
						for (var m = 0; m < e; m++) {
							var p = q + (e - 1 - m) * k;
							for (var c = 0; c < y; c++) {
								var v = m * y + c,
									i = r[J[v] & 16777215];
								F.data[p + (c >>> 3)] |= i << 7 - (c & 7)
							}
						}
					q += k * e + 2;
		return F.data.slice(0, q).buffer
	}

	function d(I) {
		I = new Uint8Array(I);
		if (X.Lv(I, 0) == 40) return [G(I.buffer, 0)];
		var y = 0,
			e = X.Ko(I, y, 2);
		y += 2;
		if (e != "BM") {
			alert("Unsupported BMP format: " + e);
			return
		}
		var M = X.Lv(I, y);
		y += 4;
		y += 4;
		var R = X.Lv(I, y);
		y += 4;
		return [G(I.buffer, y, R)]
	}

	function G(I, y, e) {
		I = new Uint8Array(I);
		var M = X.Lv(I, y),
			R = Q(I, y + 4);
		if (R.Wn != 1) alert("unsupported number of color planes: " + R.Wn);
		if (R.ts != 0 && R.ts != 1 && R.ts != 2 && R.ts != 3) {
			alert("Unsupported BMP compression: " + R.ts);
			return
		}
		y += M;
		var J = y,
			n = I;
		if (e == null) e = y;
		if (R.ts == 1 || R.ts == 2) {
			var r = V(I, e, R);
			R.hB = 8;
			I = r;
			e = 0
		}
		var T = 4 * Math.floor((R.hB * R.iJ + 31) / 32),
			j = R.iJ,
			g = Math.abs(R.Tq),
			Y = new Uint8Array(j * g * 4);
		Y.fill(255);
		if (R.hB == 32)
			for (var k = 0; k < g; k++) {
				var F = e + (g - 1 - k) * T;
				for (var D = 0; D < j; D++) {
					var q = (k * j + D) * 4;
					Y[q] = I[F + D * 4 + 2];
					Y[q + 1] = I[F + D * 4 + 1];
					Y[q + 2] = I[F + D * 4 + 0];
					Y[q + 3] = I[F + D * 4 + 3]
				}
			} else if (R.hB == 24)
				for (var k = 0; k < g; k++) {
					var F = e + (g - 1 - k) * T;
					for (var D = 0; D < j; D++) {
						var q = (k * j + D) * 4;
						Y[q] = I[F + D * 3 + 2];
						Y[q + 1] = I[F + D * 3 + 1];
						Y[q + 2] = I[F + D * 3 + 0]
					}
				} else if (R.hB == 16)
					for (var k = 0; k < g; k++) {
						var F = e + (g - 1 - k) * T;
						for (var D = 0; D < j; D++) {
							var q = (k * j + D) * 4,
								H = I[F + D * 2 + 1] << 8 | I[F + D * 2];
							Y[q] = (H >>> 11) * (255 / 31);
							Y[q + 1] = (H >>> 5 & 63) * (255 / 63);
							Y[q + 2] = (H & 31) * (255 / 31)
						}
					} else if (R.hB == 8)
						for (var k = 0; k < g; k++) {
							var F = e + (g - 1 - k) * T;
							for (var D = 0; D < j; D++) {
								var q = (k * j + D) * 4,
									W = I[F + D];
								Y[q] = n[J + 4 * W + 2];
								Y[q + 1] = n[J + 4 * W + 1];
								Y[q + 2] = n[J + 4 * W + 0]
							}
						} else if (R.hB == 4)
							for (var k = 0; k < g; k++) {
								var F = e + (g - 1 - k) * T;
								for (var D = 0; D < j; D++) {
									var q = (k * j + D) * 4,
										W = I[F + (D >> 1)];
									W = W >> 4 - 4 * (D & 1);
									W = W & 15;
									Y[q] = n[J + 4 * W + 2];
									Y[q + 1] = n[J + 4 * W + 1];
									Y[q + 2] = n[J + 4 * W + 0]
								}
							} else if (R.hB == 1)
								for (var k = 0; k < g; k++) {
									var F = e + (g - 1 - k) * T;
									for (var D = 0; D < j; D++) {
										var q = (k * j + D) * 4,
											Z = I[F + (D >> 3)];
										Z = Z >> 7 - (D & 7);
										Z = Z & 1;
										Y[q] = n[J + 4 * Z + 2];
										Y[q + 1] = n[J + 4 * Z + 1];
										Y[q + 2] = n[J + 4 * Z + 0]
									}
								} else throw "Unknown bit depth " + R.hB;
		if (R.Tq < 0) {
			var B = new Uint32Array(Y.buffer),
				a = g >>> 1;
			for (var k = 0; k < a; k++) {
				var m = k * j,
					p = (g - k - 1) * j;
				for (var D = 0; D < j; D++) {
					var c = B[m + D];
					B[m + D] = B[p + D];
					B[p + D] = c
				}
			}
		}
		return {
			uA: new Rect(0, 0, j, g),
			data: Y.buffer
		}
	}

	function b(I, A) {
		return I >>> 4 - ((A & 1) << 2) & 15
	}

	function V(I, y, e) {
		var M = e.iJ,
			R = Math.abs(e.Tq),
			J = new Uint8Array(M * R),
			n = 0,
			r = 0,
			A = 0;
		while (r < R) {
			var T = I[y++],
				j = I[y++],
				g = r * M + n;
			if (T > 0) {
				if (e.hB == 4)
					for (A = 0; A < T; A++) {
						J[g + A] = b(j, A)
					} else
						for (A = 0; A < T; A++) {
							J[g + A] = j
						}
				n += T
			} else if (T == 0 && j == 0) {
				r++;
				n = 0
			} else if (T == 0 && j == 1) {
				break
			} else if (T == 0 && j == 2) {
				n += I[y++];
				r += I[y++]
			} else {
				var Y = j;
				if (e.hB == 4) {
					for (A = 0; A < j; A++) {
						J[g + A] = b(I[y + (A >>> 1)], A)
					}
					Y = Math.ceil(j / 2)
				} else {
					for (A = 0; A < j; A++) {
						J[g + A] = I[y + A]
					}
				}
				if ((Y & 1) != 0) Y++;
				y += Y;
				n += j
			}
		}
		return J
	}

	function Q(I, y) {
		var e = X.EY,
			M = X.Lv,
			R = X._w,
			J = {};
		J.iJ = e(I, y);
		y += 4;
		J.Tq = e(I, y);
		y += 4;
		J.Wn = R(I, y);
		y += 2;
		J.hB = R(I, y);
		y += 2;
		J.ts = M(I, y);
		y += 4;
		J.size = M(I, y);
		y += 4;
		var n = e(I, y);
		y += 4;
		var r = e(I, y);
		y += 4;
		J.agH = M(I, y);
		y += 4;
		y += 4;
		return J
	}

	function t(I, y, e, M) {
		X.iy(I, y, e.iJ);
		y += 4;
		X.iy(I, y, e.Tq);
		y += 4;
		X.qW(I, y, e.Wn);
		y += 2;
		X.qW(I, y, e.hB);
		y += 2;
		X.iy(I, y, e.ts);
		y += 4;
		X.iy(I, y, e.size);
		y += 4;
		X.iy(I, y, 2834);
		y += 4;
		X.iy(I, y, 2834);
		y += 4;
		X.iy(I, y, e.agH);
		y += 4;
		y += 4
	}
	return {
		gR: d,
		bi: l,
		amE: G
	}
}();
FormatHandler.st = {};

FormatHandler.st.bi = function(l, d, G, b) {
	if (b == null) b = [100, !1, 0, 0, 0, 0];
	var V = [],
		Q = [],
		t = d * G * 4,
		T = null;
	for (var I = 0; I < l.length; I++) {
		var y = new Uint8Array(l[I][0].slice(0));
		for (var A = 0; A < t; A += 4) {
			var e = y[A + 3] = y[A + 3] > 127 ? 255 : 0;
			if (e == 0) y[A] = y[A + 1] = y[A + 2] = 0
		}
		V.push(y.buffer);
		Q.push(l[I][1])
	}
	var M = Math.round(2 + 254 * b[0] / 100),
		R = UPNG.encode.compress(V, d, G, M, [!0, !1, !1, 8, !1, b[1]]),
		J = R.plte,
		n = new Uint8Array(4),
		r = new Uint32Array(n.buffer);
	for (var A = 0; A < J.length; A++) {
		r[0] = J[A];
		var j = n[0];
		n[0] = n[2];
		n[2] = j;
		J[A] = r[0];
		if (r[0] == 0) T = A
	}
	while (J.length < 256) J.push(0);
	var g = new Uint8Array(2e4 + Math.round(1.5 * d * G * l.length)),
		Y = b[3],
		k = {
			palette: J
		};
	if (Y != 1) k.loop = Y == 0 ? 0 : Y - 1;
	var F = new GifWriter(g, d, G, k);
	for (var A = 0; A < l.length; A++) {
		var D = R.frames[A],
			q = D.rect,
			H = D.blend,
			W = D.dispose,
			Z = Math.round(Q[A] / 10);
		if (Z < 2) Z = 2;
		F.addFrame(q.x, q.y, q.width, q.height, D.img, {
			transparent: T,
			disposal: W + 1,
			delay: Z
		})
	}
	return g.slice(0, F.end()).buffer
};

FormatHandler.st.gR = function(l) {
	var d = Date.now(),
		G = [],
		b = UGIF.decode(l),
		V = UGIF.toRGBA8(b),
		Q = new Rect(0, 0, b.width, b.height);
	for (var A = 0; A < V.length; A++) {
		var t = b.frames[A];
		G.push({
			uA: Q.clone(),
			ia: "_a_frm" + A + "," + t.delay * 10,
			data: V[A]
		})
	}
	return G
};

FormatHandler.IW = {};

FormatHandler.IW.bi = function(l, d, G, b) {
	console.log(l);
	if (d > 256 || G > 256) {
		alert("Maximum ICO size is 256x256 px. Will be cropped.", 4e3);
		var V = Math.min(d, 256),
			Q = Math.min(G, 256),
			t = new Rect(0, 0, V, Q),
			I = PixelUtil.allocBytes(t.O() * 4),
			y = new Rect(0, 0, d, G),
			e = new Uint8Array(l[0][0]);
		PixelUtil.blitRgbaRect(e, y, I, t);
		l[0][0] = I.buffer;
		d = V;
		G = Q
	}
	var M = new GrowableByteBuffer,
		R = 0,
		J = b && b[0] == !0;
	X.Ke(M, R, 0);
	R += 2;
	X.Ke(M, R, J ? 2 : 1);
	R += 2;
	X.Ke(M, R, 1);
	R += 2;
	var n = new Uint8Array(FormatHandler.jA("png").bi(l, d, G));
	M.ensureCapacity(R, 16);
	M.data[R] = d == 256 ? 0 : d;
	R++;
	M.data[R] = G == 256 ? 0 : G;
	R++;
	R += 2;
	X.Ke(M, R, J ? Math.round(d / 2) : 1);
	R += 2;
	X.Ke(M, R, J ? Math.round(G / 2) : 32);
	R += 2;
	X.zU(M, R, n.length);
	R += 4;
	X.zU(M, R, 6 + 16);
	R += 4;
	M.ensureCapacity(R, n.length);
	for (var A = 0; A < n.length; A++) M.data[R + A] = n[A];
	R += n.length;
	var r = new Uint8Array(R);
	for (var A = 0; A < R; A++) r[A] = M.data[A];
	return r.buffer
};

FormatHandler.IW.gR = function(l) {
	l = new Uint8Array(l);
	var d = 4,
		G = X._w(l, d);
	d += 2;
	var b = [];
	for (var A = 0; A < G; A++) {
		var V = FormatHandler.IW.agg(l, d + A * 16),
			Q = l.buffer.slice(V.offset, V.offset + V.size),
			t = FormatHandler.aJ(Q);
		t = t ? t : "bmp";
		if (t == "png") {
			var I = FormatHandler.jA(t),
				y = I.gR(Q);
			V.z1 = y[0]
		} else {
			var e = FormatHandler.jA("BMP").amE(Q, 0),
				Q = PixelUtil.allocBytes(V.iJ * V.Tq * 4);
			PixelUtil.blitRgbaRect(new Uint8Array(e.data), new Rect(0, 0, e.uA.m, e.uA.n), Q, new Rect(0, V.Tq, V.iJ, V.Tq));
			e.data = Q.buffer;
			e.uA.n = V.Tq;
			V.z1 = e
		}
		b.push(V)
	}
	b.sort(function(M, R) {
		if (M.iJ != R.iJ) return M.iJ - R.iJ;
		return M.a1C - R.a1C
	});
	return [b.pop().z1]
};

FormatHandler.IW.agg = function(l, d) {
	var G = {};
	G.iJ = l[d];
	d++;
	if (G.iJ == 0) G.iJ = 256;
	G.Tq = l[d];
	d++;
	if (G.Tq == 0) G.Tq = 256;
	G.aq2 = l[d];
	d++;
	d++;
	G.a32 = X._w(l, d);
	d += 2;
	G.a1C = X._w(l, d);
	d += 2;
	G.size = X.Lv(l, d);
	d += 4;
	G.offset = X.Lv(l, d);
	d += 4;
	return G
};

FormatHandler.VZ = {};

FormatHandler.VZ.gR = function(l) {
	var d = Date.now(),
		b, q = !0;
	if (PixelUtil.raw.sg(l.byteLength)) return [PixelUtil.raw.aaa(l)];
	var G = UTIF.decode(l);
	if (G[0].t33421) b = G[0];
	else if (G[0].subIFD && G[0].t271 && G[0].t271[0] == "Hasselblad") {
		b = G[0].subIFD[0];
		b.t33421 = [2, 2]
	} else if (G[0].subIFD && G[0].subIFD[0].t33421) {
		b = G[0].subIFD[0];
		if (b.t50706 == null) {
			if (b.t258[0] == 8) b.t258[0] = 12
		}
	} else if (G[0].subIFD && G[0].subIFD[0] && G[0].subIFD[0].t262 && G[0].subIFD[0].t262[0] == 34892) b = G[0].subIFD[0];
	else if (G[0].t50706) b = G[0];
	else if (G[0].subIFD && G[0].subIFD[1] && G[0].subIFD[1].t33421) b = G[0].subIFD[1];
	else if (G[0].subIFD && G[0].subIFD[2] && G[0].subIFD[2].t33421) b = G[0].subIFD[2];
	else if (G[3] && G[3].t50648) {
		var V = G[0].exifIFD,
			Q = V.makerNote;
		b = G[3];
		var t = Q.t224[1],
			I = Q.t224[2];
		b.t256 = [t];
		b.t257 = [I];
		b.t258 = [16];
		b.t259 = [7];
		b.t262 = [32803];
		b.t277 = [1];
		b.t33421 = [2, 2];
		var y = b.t50656[0],
			e = PixelUtil.raw.Uk[y];
		if (e == null) throw "e";
		b.t33422 = e
	} else if (G[0].t1 && G[0].t1.length == 4) {
		var M = G[0],
			R = {
				2: 256,
				3: 257,
				8: 277,
				11: 259,
				271: 271,
				272: 272,
				279: 279,
				280: 273,
				278: 278
			};
		b = {};
		for (var J in R)
			if (M["t" + J]) b["t" + R[J]] = M["t" + J];
		b.t2 = M.t2;
		b.t3 = M.t3;
		b.t10 = M.t10;
		b.t45 = M.t45;
		b.t258 = [16];
		b.t33421 = [2, 2];
		var n = M.t9[0];
		b.t33422 = [
			[0, 1, 1, 2],
			[1, 0, 2, 1],
			[1, 2, 0, 1],
			[2, 1, 1, 0]
		][n - 1];
		var r = M.t4[0],
			T = M.t5[0],
			j = M.t6[0],
			g = M.t7[0];
		b.t50829 = [r, T, j, g];
		var Y = M.t36[0],
			k = M.t37[0],
			F = M.t38[0];
		b.t50728 = [k / Y, k / k, k / F]
	}
	if (b) {
		UTIF.decodeImage(l, b, G);
		for (var D in G[0])
			if ((D[0] == "t" || D[0] == "e" || D[0] == "d") && b[D] == null) b[D] = G[0][D];
		b.oK = G[0].t274 ? G[0].t274[0] : 1;
		return [b]
	}
	var H = 1 / 256;
	for (var A = 0; A < G.length; A++)
		if (G[A].t258 && G[A].t258[0] == 16 && G[A].t277 && G[A].t277[0] == 1) {} else q = !1;
	if (q) {
		var W = 0,
			Z = 0,
			B = 0;
		for (var A = 0; A < G.length; A++) {
			UTIF.decodeImage(l, G[A], G);
			var a = G[A].data;
			for (var m = 0; m < a.length; m += 2) {
				var p = a[m + 1] << 8 | a[m];
				if (p > W) W = p;
				Z += p;
				B++
			}
		}
		H = 1 / 256 * 65535 / (.5 * W + .5 * (2 * Z / B))
	}
	var c = [];
	for (var A = 0; A < G.length; A++) {
		var v = G[A],
			i = 72;
		UTIF.decodeImage(l, v, G);
		var z = v.t282,
			P = v.t296;
		if (z != null && P != null) {
			i = z[0][0] / z[0][1];
			if (P[0] == 3) i = Math.round(i / 2.54)
		}
		if (v.width == null) continue;
		var C = UTIF.toRGBA8(v, H).buffer,
			h = xmpMetadata.exifIfdToMetadata(v);
		console.log(v);
		c.push({
			uA: new Rect(0, 0, v.width, v.height),
			data: C,
			m7: i,
			CD: h,
			W2: v.t34675 ? v.t34675.slice(0) : null
		})
	}
	return c
};

FormatHandler.VZ.bi = function(l, d, G, b) {
	if (b == null) b = [!1];
	var V = {},
		Q = l[0];
	if (Q[3] != null && b[0]) V = xmpMetadata.metadataToExifIfd(Q[3]);
	if (Q[2] != null) {
		V.t282 = V.t283 = [
			[Math.round(Q[2]), 1]
		];
		V.t296 = [2]
	}
	return UTIF.encodeImage(Q[0], d, G, V)
};

FormatHandler.aZ = {};

FormatHandler.aZ.zm = !0;
FormatHandler.aZ.gR = function(l, d) {
	c4.Cd(l, d)
};

FormatHandler.aZ.auh = function(l, d, G, b) {
	if (b == null) b = [!1, !1, !1, !1, !1];
	if (!b[0]) l.LT();
	var V = new GrowableByteBuffer,
		Q = c4.CO(l, V, b);
	return [V.data.buffer, Q]
};

FormatHandler.aZ.bi = function(l, d, G, b) {
	var V = FormatHandler.aZ.auh(l, d, G, b),
		Q = V[0],
		t = V[1];
	return Q.byteLength == t ? Q : Q.slice(0, t)
};

FormatHandler.A1 = {};

FormatHandler.A1.zm = !0;
FormatHandler.A1.gR = function(l, d) {
	var G = pako.inflate(new Uint8Array(l)),
		b = X.TD(G, 0),
		V = X.TD(G, 2),
		Q = 4;
	d.m = X.q(G, Q);
	Q += 4;
	d.n = X.q(G, Q);
	Q += 4;
	d.buffer = PixelUtil.allocBytes(d.m * d.n * 4);
	var t = X.TD(G, Q);
	Q += 2;
	Q += 4;
	for (var I = 0; I < t; I++) {
		var y = d.V4(),
			r = 0,
			i = 1,
			z = 2,
			P = 3,
			C = 0;
		d.B.push(y);
		var e = X.q(G, Q);
		Q += 4;
		var M = Q,
			R = X.TD(G, M);
		M += 2;
		var J = X.Kw(G, M, R);
		M += R;
		y.tH(J);
		var n = G[M];
		M++;
		if (n != 0 && n != 1) throw n;
		y.rect.x = X.YU(G, M);
		M += 4;
		y.rect.y = X.YU(G, M);
		M += 4;
		y.rect.m = X.q(G, M);
		M += 4;
		y.rect.n = X.q(G, M);
		M += 4;
		if (b > 3) {
			r = X.YU(G, M);
			M += 4
		}
		y.opacity = Math.round(255 * G[M] / 100);
		M++;
		var T = G[M];
		M++;
		y.Oj(T != 0);
		y.blendModeKey = "norm,lddg,norm,dark,diff,norm,hLit,norm,norm,lite,mul ,over,scrn,fsub".split(",")[G[M]];
		M++;
		var j = G[M];
		M++;
		if (j) y.add.lspf = 1 << 31;
		if (b > 3) {
			var g = X.TD(G, M);
			M += 2;
			if (g != 0) {
				var Y = JSON.parse(X.Kw(G, M, g));
				M += g;
				var k = Y.text,
					F = Y.textSettings,
					D = F.font,
					q = F.size,
					H = F.padding,
					W = parseInt(F.color.slice(1), 16);
				y.add.lnsr = "rend";
				y.add.TySh = dt.Iu(0, 0);
				y.add.TySh.xZ = new Rect(0, 0, 100, 100);
				var Z = y.add.TySh.D = new Matrix2D,
					B = y.rect.m / 2,
					a = y.rect.n / 2;
				Z.translate(-B, -a);
				Z.rotate(-r * Math.PI / 180);
				Z.translate(B, a);
				Z.translate(y.rect.x + H, y.rect.y + H);
				var m = y.add.TySh.zC;
				dt.AO(m, 1);
				dt.mt(m, [0, 0, y.rect.m - H * 2, y.rect.n]);
				dt.sT(m, 0, k);
				var p = dt.Au(m, 0, 1);
				p.xg.FontSize = q;
				p.xg.FillColor = {
					Type: 1,
					Values: [1, (W >>> 16 & 255) / 255, (W >>> 8 & 255) / 255, (W >>> 0 & 255) / 255]
				};
				if (F.bold) D += "-Bold";
				dt.Wr(p, D);
				p.GB.Justification = ["left", "right", "center"].indexOf(F.align);
				dt.rW(m, 0, k.length, p)
			}
		}
		var c = X.q(G, M);
		M += 4;
		if (c != y.rect.O() * 4) {
			for (var A = y.rect.m; A > y.rect.m / 2; A--) {
				var v = c / (A * 4);
				if (v == Math.round(v)) {
					y.rect.m = A;
					y.rect.n = v;
					break
				}
			}
		}
		y.buffer = PixelUtil.allocBytes(y.rect.O() * 4);
		if (b > 3) {
			i = 0;
			z = 1;
			P = 2;
			C = 3
		}
		for (var A = 0; A < c; A += 4) {
			y.buffer[A] = G[M + A + i];
			y.buffer[A + 1] = G[M + A + z];
			y.buffer[A + 2] = G[M + A + P];
			y.buffer[A + 3] = G[M + A + C]
		}
		M += c;
		var h = X.q(G, M);
		M += 4;
		if (h == 0 && b > 3) {
			Q += e;
			continue
		}
		var L = G[M];
		M++;
		var U = X.TD(G, M);
		M += 2;
		if (h != 0) {
			y.z = new LayerRecord.LayerMask;
			y.z.rect = y.rect.clone();
			y.z.channel = PixelUtil.allocBytes(y.rect.O());
			for (var A = 0; A < h; A += 4) y.z.channel[A >>> 2] = G[M + A + 1];
			M += h
		}
		if (L != 0) {
			var S = JSON.parse(LayerStyleConstants.defaultLayerStyleJson);
			y.add.lmfx = S;
			for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) S[LayerStyleConstants.effectMultiKeys[A]] = {
				t: "VlLs",
				v: []
			};
			var E = {
				"102": 9,
				"101": 2,
				"103": 0,
				"104": 3,
				"105": 8
			};
			for (var A = 0; A < L; A++) {
				var x = X.TD(G, M),
					K = M + x + 4,
					u = G.slice(M, K),
					bC = G[M + 2];
				M += 3;
				var O = E[bC + ""],
					$ = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[O]);
				S[LayerStyleConstants.effectMultiKeys[O]].v.push({
					t: "Objc",
					v: $
				});
				if (O != 0) {
					$.Md.v.BlnM = au.ci("norm");
					$.Opct.v.val = G[M];
					M++;
					if (O == 9 || O == 2) {
						$.Dstn.v.val = G[M + 1];
						M += 2
					} else M += 2;
					$.blur.v.val = Math.round(G[M] * 1.2);
					M++;
					if (O == 9 || O == 2) {
						$.uglg.v = !1;
						$.lagl.v.val = 180 - X.TD(G, M);
						M += 2
					}
					$.Clr.v = PixelUtil.color.rgbColorDescriptor({
						o: G[M + 1],
						J: G[M + 2],
						k: G[M + 3]
					})
				} else {
					$.hglM.v.BlnM = $.sdwM.v.BlnM = au.ci("norm");
					M += 2;
					var gX = G[M++],
						_ = G[M++];
					$.blur.v.val = Math.round(Math.sqrt(_ * gX) * 1.3);
					$.srgR.v.val = Math.round(100 * gX / _);
					$.uglg.v = !1;
					$.lagl.v.val = 180 - X.TD(G, M);
					M += 2;
					$.hglO.v.val = G[M++];
					$.hglC.v = PixelUtil.color.rgbColorDescriptor({
						o: G[M + 1],
						J: G[M + 2],
						k: G[M + 3]
					});
					M += 4;
					$.sdwO.v.val = G[M++];
					$.sdwC.v = PixelUtil.color.rgbColorDescriptor({
						o: G[M + 1],
						J: G[M + 2],
						k: G[M + 3]
					});
					M += 4
				}
				M = K
			}
		}
		if (M - Q < e) {
			var jI = X.q(G, M),
				jq = 0;
			M += 4;
			M++;
			var R = X.TD(G, M);
			M += 2;
			var k = X.Kw(G, M, R);
			M += R;
			k = k.replace(/\r/g, "\n");
			var R = X.TD(G, M);
			M += 2;
			var D = X.Kw(G, M, R);
			M += R;
			var q = X.TD(G, M);
			M += 2;
			var iw = y.rect.x,
				hn = y.rect.m;
			if (jI & 4) jq = 1;
			if (jI & 2) jq = 2;
			var iv = Math.round(q * .4);
			if (jq == 0 || jq == 2) hn += iv;
			if (jq == 1 || jq == 2) {
				hn += iv;
				iw -= iv
			}
			y.add.lnsr = "rend";
			y.add.TySh = dt.Iu(0, 0);
			y.add.TySh.xZ = new Rect(0, 0, 100, 100);
			y.add.TySh.D = new Matrix2D(1, 0, 0, 1, iw, y.rect.y + q * .25);
			var m = y.add.TySh.zC;
			dt.AO(m, 1);
			dt.mt(m, [0, 0, hn, y.rect.n]);
			dt.sT(m, 0, k);
			var p = dt.Au(m, 0, 1);
			p.xg.FontSize = q;
			p.xg.FillColor = {
				Type: 1,
				Values: [1, G[M + 1] / 255, G[M + 2] / 255, G[M + 3] / 255]
			};
			M += 4;
			if (G[M + 5]) D += "-Bold";
			if (G[M + 6]) D += "-Italic";
			dt.Wr(p, D);
			p.GB.Justification = jq;
			M += 8;
			dt.rW(m, 0, k.length, p)
		}
		Q += e
	}
};

FormatHandler.nq = {};

FormatHandler.nq.zm = !0;
FormatHandler.nq.gR = function(l, d) {
	i5.Cd(l, d)
};
var i5 = function() {
	function l(R, J) {
		var n = Date.now(),
			r = UZIP.parse(R);
		console.log(r);
		console.log(Date.now() - n);
		n = Date.now();
		var T = r["maindoc.xml"],
			j = new DOMParser,
			g = j.parseFromString(X.Kw(T), "image/svg+xml").children[0].children[0],
			Y = g.getAttribute("name"),
			k = J.m = e(g, "width"),
			F = J.n = e(g, "height");
		J.m7 = Math.round(e(g, "x-res"));
		var D = g.children[0].children;
		d(D, J, {
			VX: Y,
			kh: r,
			Xn: null
		});
		console.log(Date.now() - n);
		n = Date.now()
	}

	function d(R, J, n) {
		for (var r = 0; r < R.length; r++) {
			var T = R[R.length - 1 - r],
				j = T.getAttribute("nodetype");
			if (j == "transparencymask") {
				n.Xn.z = M(T, n);
				continue
			}
			var g = T.getAttribute("compositeop"),
				Y = T.getAttribute("filename"),
				k = T.getAttribute("channelflags"),
				F = T.children;
			F = F.length == 0 ? null : F[0].children;
			var D = J.V4();
			if (j == "paintlayer") {
				var q = e(T, "x"),
					H = e(T, "y"),
					W = n.kh[n.VX + "/layers/" + Y + ".defaultpixel"],
					Z = n.kh[n.VX + "/layers/" + Y],
					B = y(Z);
				D.rect = B[0];
				D.rect.offset(q, H);
				D.buffer = B[1];
				if (D.rect.W6() && W.join() != "0,0,0,0") {
					D.add.SoCo = {
						classID: "null",
						Clr: {
							t: "Objc",
							v: PixelUtil.color.rgbColorDescriptor({
								o: W[0],
								J: W[1],
								k: W[2]
							})
						}
					};
					D.QJ(J)
				}
			} else if (j == "grouplayer") {
				D.add.lsct = LayerSectionType.open;
				D.blendModeKey = "pass";
				D.layerFlags |= 24;
				J.B.push(J.En());
				var a = n.Xn;
				n.Xn = D;
				d(F, J, n);
				n.Xn = a
			} else if (j == "shapelayer") {
				var Z = n.kh[n.VX + "/layers/" + Y + ".shapelayer/content.svg"],
					m = X.Kw(Z),
					p = J.rM(Z, D.getName(), 0, 0);
				D = p;
				var c = new Rect(0, 0, J.m, J.n),
					v = PixelUtil.vec.simplifyPath(c).C;
				D.add.SoLd.Trnf = f.NH.gx(v);
				D.add.SoLd.nonAffineTransform = f.NH.gx(v);
				D.kX(J, !1)
			} else if (j == "clonelayer") {
				var A = -1;
				for (var i = 0; i < R.length; i++)
					if (R[i].getAttribute("name") == T.getAttribute("clonefrom")) A = i;
				if (A != -1) {
					d([R[A]], J, n);
					D = J.B.pop()
				}
			} else console.log(j, T);
			D.tH(T.getAttribute("name"));
			if (e(T, "locked") == 1) D.add.lspf = 1 << 31;
			D.Oj(e(T, "visible") == 1);
			var z = {
				normal: "norm",
				multiply: "mul ",
				diff: "diff",
				hard_light: "hLit"
			}[g];
			if (z) D.blendModeKey = z;
			else console.log(g);
			D.opacity = e(T, "opacity");
			if (k == "1110") D.usesClippingMask = !0;
			var P = F ? F[0] : null;
			if (P && P.tagName == "mask") D.z = M(P, n);
			J.B.push(D)
		}
	}

	function G(R, J) {
		var n = 0,
			r = 0,
			T = R.length,
			j, g, Y;
		while (n < T) {
			j = R[n++];
			if (j > 31) {
				g = j >>> 5;
				if (g == 7) g = 7 + R[n++];
				Y = (j & 31) << 8 | R[n++];
				var k = r - Y - 1,
					F = g >>> 1;
				J[r++] = J[k++];
				J[r++] = J[k++];
				for (var A = 0; A < F; A++) {
					J[r++] = J[k++];
					J[r++] = J[k++]
				}
				if ((g & 1) == 1) J[r++] = J[k++]
			} else {
				for (var A = 0; A <= j; A++) {
					J[r++] = R[n++]
				}
			}
		}
	}

	function b(R, J) {
		var n = 0;
		while (R[J + n] != 10) n++;
		return X.Ko(R, J, n)
	}
	var V = new Rect(0, 0, 64, 64),
		Q = new Uint8Array(64 * 64 * 4),
		t = new Uint8Array(64 * 64 * 4);

	function I() {
		for (var A = 0; A < 4096; A++) {
			var R = A << 2;
			Q[R + 0] = t[A + 8192];
			Q[R + 1] = t[A + 4096];
			Q[R + 2] = t[A];
			Q[R + 3] = t[A + 12288]
		}
	}

	function y(R) {
		var J = 0,
			n = {};
		for (var A = 0; A < 5; A++) {
			var r = b(R, J);
			J += r.length + 1;
			r = r.split(" ");
			n[r[0]] = parseInt(r[1])
		}
		var T = n.PIXELSIZE,
			j = [],
			g = new Rect;
		while (J < R.length) {
			var r = b(R, J),
				Y = r.split(",");
			J += r.length + 1;
			if (Y[2] != "LZF") throw Y[2];
			V.x = parseInt(Y[0]);
			V.y = parseInt(Y[1]);
			g = g.Cw(V);
			var k = parseInt(Y[3]);
			j.push([V.clone(), new Uint8Array(R.buffer, J + 1, k - 1)]);
			J += k
		}
		var F = PixelUtil.allocBytes(g.O() * T);
		for (var A = 0; A < j.length; A++) {
			var D = j[A];
			G(D[1], t);
			if (T == 4) {
				I();
				PixelUtil.blitRgbaRect(Q, D[0], F, g)
			} else PixelUtil.copyBufferRect(t, D[0], F, g)
		}
		return [g, F]
	}

	function e(R, J) {
		return parseInt(R.getAttribute(J))
	}

	function M(R, J) {
		var n = R.getAttribute("filename"),
			r = J.kh[J.VX + "/layers/" + n + ".pixelselection"],
			T = y(r),
			j = new LayerRecord.LayerMask;
		j.lQ = e(R, "visible") == 1;
		j.rect = T[0];
		j.channel = T[1];
		return j
	}
	return {
		Cd: l
	}
}();
FormatHandler.ZA = {};

FormatHandler.ZA.zm = !0;
FormatHandler.ZA.gR = function(l, d) {
	kf.Cd(l, d)
};

FormatHandler.PS = {};

FormatHandler.PS.zm = !0;
FormatHandler.PS.gR = function(l, d) {
	cK.Cd(l, d)
};

FormatHandler.pw = {};

FormatHandler.pw.zm = !0;
FormatHandler.pw.gR = function(l, d) {
	fm.Cd(l, d)
};

FormatHandler.IS = {};

FormatHandler.IS.zm = !0;
FormatHandler.IS.gR = function(l, d) {
	az.Cd(l, d)
};

FormatHandler.Cl = {};

FormatHandler.Cl.zm = !0;
FormatHandler.Cl.gR = function(l, d) {
	aJ.Cd(l, d)
};

FormatHandler.$r = {};

FormatHandler.$r.zm = !0;
FormatHandler.$r.gR = function(l, d) {
	id.Cd(l, d)
};

FormatHandler.r2 = {};

FormatHandler.r2.zm = !0;
FormatHandler.r2.bi = function(l, d, G, b, V) {
	if (b == null) b = [!0, !1, !1, !1, !0];
	var Q = i9.IN(l, {
		qu: b[0],
		hidden: b[1],
		axS: b[2],
		aa$: b[3],
		hR: b[4],
		ai3: d,
		afR: G
	}, V.Hg);
	return Q
};

FormatHandler.r2.gR = function(l, d, G) {
	i9.Cd(l, d, G)
};

FormatHandler.on = {};

FormatHandler.on.zm = !0;
FormatHandler.on.gR = function(l, d) {
	var G = 150,
		b = new Matrix2D(1, 0, 0, -1, 0, 0);
	b.scale(G / 72, G / 72);
	d.m7 = G;
	var V = new a7(d, b, !0);
	FromPS.Parse(l, V)
};

FormatHandler.ZO = {};

FormatHandler.ZO.zm = !0;
FormatHandler.ZO.bi = function(l, d, G, b, V) {
	if (b == null) b = ["", 100, !1, !1, !1, 0, !1];
	b[7] = ["jpg"];
	var Q = new ToPDF;
	colorSpaceHelper.exportDocumentToPdf(l, b, Q, V.Hg, d, G);
	return Q.buffer
};

FormatHandler.ZO.gR = function(l, d, G) {
	var b = 2;
	while (!0) {
		var V = b * 72,
			Q = new Matrix2D(1, 0, 0, -1, 0, 0);
		Q.scale(V / 72, V / 72);
		d.m7 = V;
		var t = new a7(d, Q, !0);
		FromPDF.Parse(l, t);
		var I = Math.max(d.m, d.n);
		if (G && I < Math.max(G[0], G[1])) {
			d.B = [];
			var y = b;
			while (I * (b / y) < Math.max(G[0], G[1])) b++
		} else break
	}
};

FormatHandler.Hr = {};

FormatHandler.Hr.zm = !0;
FormatHandler.Hr.gR = function(l, d) {
	var G = 72,
		b = new Matrix2D(1, 0, 0, 1, 0, 0);
	b.scale(G / 72, G / 72);
	d.m7 = G;
	var V = new a7(d, b, !1);
	FromWMF.Parse(l, V)
};

FormatHandler.uC = {};

FormatHandler.uC.ve = !0;
FormatHandler.uC.zm = !0;
FormatHandler.uC.bi = function(l, d, G, b, V) {
	if (b == null) b = ["", 100, !1, !1, !1, 0, !1];
	b[7] = [];
	var Q = new ToEMF;
	colorSpaceHelper.exportDocumentToPdf(l, b, Q, V.Hg);
	return Q.buffer
};

FormatHandler.uC.gR = function(l, d) {
	var G = 72,
		b = new Matrix2D(1, 0, 0, 1, 0, 0);
	b.scale(G / 72, G / 72);
	d.m7 = G;
	var V = new a7(d, b, !1);
	FromEMF.Parse(l, V)
};

FormatHandler.K4 = {};

FormatHandler.K4.zm = !0;
FormatHandler.K4.gR = function(l, d) {
	return RiffChunkParser.Cd(l, d)
};

FormatHandler.SM = {};

FormatHandler.SM.gR = function() {
	var l, d, G, b, V, Q, t = 0,
		I = 0,
		y = 0,
		e = 0,
		M = 0;

	function R(T) {
		var j = IffChunkParser.parse(T),
			g = j.az,
			Y = new Uint8Array(T),
			H = 0,
			W, Z;
		if (g == "ILBM") return J(j, Y);
		var k = X.TD,
			F = X.q,
			D = j.sub,
			q = J(D[0], Y);
		for (var B = 1; B < D.length - 2; B++) {
			var a = q[Math.max(0, B - 2)].aeK.slice(0),
				m = D[B];
			for (var p = 0; p < m.sub.length; p++) {
				var c = m.sub[p],
					v = c.R;
				if (c.AN == "ANHD") {
					var i = Y[v++];
					if (i != 5) throw i;
					var b = Y[v++];
					v += 8;
					var z = k(Y, v);
					v += 2;
					W = k(Y, v);
					v += 2;
					v++;
					v++;
					Z = k(Y, v);
					v += 2
				} else if (c.AN == "DLTA") {
					var P = [],
						C = v;
					for (var A = 0; A < 16; A++) P.push(F(Y, v + A * 4));
					v += 64;
					var h = Q;
					for (var L = 0; L < V; L++) {
						if (P[L] == 0) continue;
						v = C + P[L];
						for (var U = 0; U < h; U++) {
							var S = Y[v++],
								E = 0;
							if (S == 0) continue;
							for (var A = 0; A < S; A++) {
								var x = Y[v++];
								if (x == 0) {
									var K = Y[v++],
										u = Y[v++];
									for (var bC = 0; bC < K; bC++) {
										a[(E * V + L) * h + U] = u;
										E++
									}
								} else if (x < 128) {
									E += x
								} else {
									x -= 128;
									for (var bC = 0; bC < x; bC++) {
										a[(E * V + L) * h + U] = Y[v + bC];
										E++
									}
									v += x
								}
							}
						}
					}
				} else console.log(c.AN)
			}
			var O = W == 0 ? 17 : Math.round((W - H) * 1e3 / 60);
			q.push({
				data: r(Y, a),
				uA: new Rect(0, 0, l, d),
				aeK: a,
				ia: "_a_frm" + B + "," + O
			});
			H = W
		}
		q[0].ia = q[1].ia;
		return q
	}

	function J(T, j) {
		var g, Y;
		t = 0;
		I = 0;
		y = 0;
		e = 0;
		M = 0;
		for (var k = 0; k < T.sub.length; k++) {
			var F = T.sub[k],
				D = F.R;
			if (F.AN == "BMHD") {
				var q = [];
				for (var A = 0; A < 4; A++) q[A] = X.TD(j, D + 2 * A);
				D += 8;
				var H = q[2],
					W = q[3];
				l = q[0];
				d = q[1];
				G = j[D++];
				b = j[D++];
				var Z = j[D++];
				if (Z != 1) throw Z;
				Q = l + 15 >>> 4 << 1;
				V = G + b
			} else if (F.AN == "CMAP") t = D;
			else if (F.AN == "CAMG") {
				var B = X.q(j, D);
				I = B & 32768, y = B & 4, e = B & 2048;
				M = B & 128
			} else if (F.AN == "BODY") {
				Y = PixelUtil.allocBytes(Q * d * V);
				db.YA(j, D, F.size, Y, 0, Y.length)
			}
		}
		g = r(j, Y);
		return [{
			uA: new Rect(0, 0, l, d),
			data: g.buffer,
			aeK: Y
		}]
	}

	function n(T, hZ) {
		return T[hZ >>> 3] >>> 7 - (hZ & 7) & 1
	}

	function r(T, j) {
		var g = G - 2,
			Y = (1 << g) - 1,
			k = Math.round(255 / Y),
			F, D, q, H = Q * 8,
			W = PixelUtil.allocBytes(l * d * 4);
		for (var Z = 0; Z < d; Z++)
			for (var B = 0; B < l; B++) {
				var a = 0;
				for (var m = 0; m < V; m++) {
					var p = (Z * V + m) * H + B,
						c = n(j, p);
					a |= c << m
				}
				a = a & (1 << G) - 1;
				var A = Z * l + B,
					v = A << 2;
				if (t != 0) {
					if (e != 0 && a >>> g != 0) {
						var i = a >>> g,
							z = (a & Y) * k;
						if (i == 1) q = z;
						else if (i == 2) F = z;
						else if (i == 3) D = z
					} else {
						var z = t + a * 3;
						F = T[z + 0];
						D = T[z + 1];
						q = T[z + 2]
					}
				} else {
					F = a >>> 0 & 255;
					D = a >>> 8 & 255;
					q = a >>> 16 & 255
				}
				W[v + 0] = F;
				W[v + 1] = D;
				W[v + 2] = q;
				W[v + 3] = 255
			}
		return W
	}
	return R
}();
FormatHandler.lG = {};

FormatHandler.lG.zm = !1;
FormatHandler.lG.bi = function(l, d, G, b) {
	var V = l[0][4],
		Q = new Uint8Array(l[0][0]),
		t = 2,
		I = V ? !0 : !1,
		y = I ? 4 : 3,
		e = new Uint8Array(d * G * y);
	for (var M = 0; M < G; M++)
		for (var R = 0; R < d; R++) {
			var J = M * d + R << 2,
				n = ((G - M - 1) * d + R) * y;
			e[n] = Q[J + 2];
			e[n + 1] = Q[J + 1];
			e[n + 2] = Q[J + 0];
			if (I) e[n + 3] = V[0][M * d + R]
		}
	if (!0) {
		var r = e.length,
			T = 0,
			j = new Uint8Array(r * 2),
			g = 0,
			Y = 0,
			k = d * y;
		while (Y < r) {
			var F = Y,
				D = 0,
				q = k * (Math.floor(Y / k) + 1);
			while (F < q && D < 128) {
				var H = !0;
				for (var A = 0; A < y; A++) H = H & e[Y + A] == e[F + A];
				if (!H) break;
				F += y;
				D++
			}
			if (D == 1) {
				var W = 1;
				while (W < 128 && Y + (W + 1) * y < q) {
					var H = !0,
						Z = Y + W * y;
					for (var A = 0; A < y; A++) H = H & e[Z + A] == e[Z + y + A];
					if (H) break;
					W++
				}
				j[g++] = W - 1;
				for (var B = 0; B < W; B++)
					for (var A = 0; A < y; A++) j[g++] = e[Y++]
			} else {
				j[g++] = 127 + D;
				for (var A = 0; A < y; A++) j[g + A] = e[Y + A];
				g += y;
				Y += y * D;
				T += D
			}
		}
		e = j.slice(0, g);
		t += 8
	}
	var a = new Uint8Array(18 + e.length + 26);
	a[2] = t;
	X.qW(a, 12, d);
	X.qW(a, 14, G);
	a[16] = y * 8;
	a[17] = y == 4 ? 8 : 0;
	a.set(e, 18);
	X.KQ(a, 18 + e.length + 8, "TRUEVISION-XFILE.");
	return a.buffer
};

FormatHandler.lG.gR = function(l) {
	var d = new Uint8Array(l),
		G = 0,
		b = d[0],
		V = d[1],
		Q = d[2],
		t = d[4] * 256 + d[3],
		I = d[6] * 256 + d[5],
		y = d[7],
		e = d[9] * 256 + d[8],
		M = d[11] * 256 + d[10],
		R = d[13] * 256 + d[12],
		J = d[15] * 256 + d[14],
		n = d[16],
		r = d[17],
		T = r >>> 4,
		j = X.Ko(d, 18, b),
		g = PixelUtil.allocBytes(R * J * 4),
		G = 18 + b + (I * y >>> 3),
		Y = new Uint8Array(d.buffer, G);
	if (Q > 3) {
		var k = 0,
			F = d,
			D = new Uint8Array(R * J * n >>> 3),
			q = G,
			H = 0,
			W = d.length,
			Z = n >>> 3;
		while (H < D.length) {
			var hZ = F[q];
			q++;
			if (hZ < 128)
				for (var A = 0; A < hZ + 1; A++) {
					for (var B = 0; B < Z; B++) {
						D[H] = F[q];
						H++;
						q++
					}
				} else {
					for (var A = 0; A < hZ - 127; A++) {
						for (var B = 0; B < Z; B++) {
							D[H] = F[q + B];
							H++
						}
					}
					q += Z
				}
		}
		Q -= 8;
		Y = D;
		G = q
	} else G += R * J * n >>> 3;
	var a = new Uint8Array(4),
		m = FormatHandler.lG.a9S;
	for (var p = 0; p < J; p++)
		for (var c = 0; c < R; c++) {
			var v = (T & 2) == 0 ? (J - p - 1) * R + c : p * R + c,
				i = p * R + c,
				z, P, C, h = 255,
				L = v * n >>> 3;
			if (Q == 1) {
				var U = 0;
				if (n == 8) U = Y[L];
				else throw "e";
				m(d, 18 + b + t + (U * y >>> 3), y, a);
				z = a[0];
				P = a[1];
				C = a[2];
				h = a[3]
			} else if (Q == 2) {
				m(Y, L, n, a);
				z = a[0];
				P = a[1];
				C = a[2];
				h = a[3]
			} else if (Q == 3) {
				if (n == 8) z = P = C = Y[L];
				else throw "e"
			}
			var S = i * 4;
			g[S] = z;
			g[S + 1] = P;
			g[S + 2] = C;
			g[S + 3] = h
		}
	var a = {
		uA: new Rect(0, 0, R, J),
		data: g.buffer,
		ia: j
	};
	if (PixelUtil.hasTransparentAlpha(g)) {
		var E = PixelUtil.allocBytes(R * J);
		PixelUtil.extractChannelFromRgba(g, E, 3);
		PixelUtil.andMaskUint32(g, 4278190080, 16777215);
		a.vj = [E]
	}
	return [a]
};

FormatHandler.lG.a9S = function(l, d, G, b) {
	var V, Q, t, I = 255;
	if (G == 24 || G == 32) {
		t = l[d];
		Q = l[d + 1];
		V = l[d + 2];
		if (G == 32) I = l[d + 3]
	} else if (G == 16) {
		var y = l[d + 1] << 8 | l[d + 0];
		V = y >>> 10 & 31;
		Q = y >>> 5 & 31;
		t = y >>> 0 & 31;
		V = Math.round(V * (255 / 31));
		Q = Math.round(Q * (255 / 31));
		t = Math.round(t * (255 / 31))
	} else throw "e";
	b[0] = V;
	b[1] = Q;
	b[2] = t;
	b[3] = I
};

FormatHandler.a6t = function() {
	var l, d = [],
		G = !1;

	function b(t, I, y, e) {
		l = y;
		d.push(t, e);
		V()
	}

	function V() {
		if (G || d.length == 0) return;
		G = !0;
		FormatHandler.ap_(d.shift(), "image/avif", Q)
	}

	function Q(t) {
		l(null, [t], d.shift());
		G = !1;
		V()
	}
	return {
		zm: !1,
		Lz: !0,
		gR: b
	}
}();
FormatHandler.a3C = function() {
	var l, d = [],
		G = !1,
		b, V, Q, t = 10,
		I, y, e, M = 0,
		J;

	function R(k, F, D, q, H) {
		l = D;
		d.push(k, q);
		var W = dy.Cd(k),
			Z = dy.azs(W, "vide"),
			B = Z.tkhd,
			a = Z.mdia.minf.stbl,
			m = B.duration / W.moov.mvhd.CN,
			p = a.stsz.length,
			c = Math.round(p / m);
		console.log(W);
		b = B.iJ;
		V = B.Tq;
		var v = b + " \xD7 " + V + " px, " + p + " frames, " + SaveForWebDialog.fa(b * V * 4 * p) + " decoded<br/>";
		v += m.toFixed(2) + " seconds, " + c + " FPS";
		var i = new Action(ActionTypes.E.L, !0);
		i.data = {
			a: ActionTypes.$.SN,
			GU: "setFPS",
			mS: t,
			Fk: T,
			ax4: v
		};
		H.dispatch(i)
	}

	function n() {
		if (G || d.length == 0) return;
		G = !0;
		var k = d.shift(),
			F = dy.Cd(k),
			D = dy.azs(F, "vide"),
			q = D.tkhd,
			H = D.mdia.minf.stbl,
			W = H.stsd.aj0.avcC,
			Z = q.duration / F.moov.mvhd.CN,
			B = H.stsz.length,
			a = Math.round(B / Z),
			m = Math.max(1, Math.round(a / t)),
			v = 0;
		if (H.stsd.kk == "hvc1") alert("HVC1 codec not supported");
		J = Date.now();
		b = q.iJ;
		V = q.Tq;
		Q = [];
		I = document.createElement("canvas");
		y = I.getContext("2d", { willReadFrequently: true });
		I.width = b;
		I.height = V;
		var p = new Uint8Array(k),
			c = [],
			i = new VideoDecoder({
				output: function(L) {
					if (v % m == 0) {
						y.drawImage(L, 0, 0);
						L.close();
						var U = y.getImageData(0, 0, b, V).data.buffer,
							S = Q.length;
						Q[S] = {
							ia: "_a_" + S + "," + Math.round(m * 1e3 / a),
							uA: new Rect(0, 0, b, V),
							data: U
						}
					} else L.close();
					clearTimeout(M);
					M = setTimeout(r, 100);
					v++
				},
				error: function(L) {
					console.log(L.message)
				}
			}),
			z = {
				codec: "vp09.00.10.08",
				codedWidth: b,
				codedHeight: V
			};
		if (W) {
			z.codec = "avc1.640034";
			z.description = p.slice(W.R, W.R + W.E3)
		}
		i.configure(z);
		for (var A = 0; A < B; A++) {
			var P = dy.a8N(F, "vide", A),
				C = new Uint8Array(k, P[0], P[1]),
				h = new EncodedVideoChunk({
					timestamp: A,
					duration: 1e3,
					type: A == 0 ? "key" : "delta",
					data: C
				});
			i.decode(h)
		}
	}

	function r() {
		l(null, Q, d.shift());
		G = !1;
		console.log(Date.now() - J);
		n()
	}

	function T(k) {
		t = Math.max(1, Math.min(60, k));
		if (window.VideoDecoder) n();
		else j()
	}

	function j() {
		if (G || d.length == 0) return;
		G = !0;
		I = document.createElement("canvas");
		y = I.getContext("2d", { willReadFrequently: true });
		e = document.createElement("video");
		var k = "data:video/mp4;base64," + FormatHandler.zR(d.shift());
		e.src = k;
		e.muted = !0;
		e.currentTime = 0;
		e.addEventListener("canplay", g, !1);
		e.addEventListener("timeupdate", Y, !1)
	}

	function g(k) {
		e.removeEventListener("canplay", g);
		b = I.width = e.videoWidth;
		V = I.height = e.videoHeight;
		Q = [];
		e.play()
	}

	function Y(k) {
		clearTimeout(M);
		y.drawImage(e, 0, 0);
		Q.push({
			ia: "_a_" + Q.length + "," + Math.round(1e3 / t),
			uA: new Rect(0, 0, b, V),
			data: y.getImageData(0, 0, b, V).data.buffer
		});
		var F = e.currentTime + 1 / t;
		if (F < e.duration && k) {
			e.currentTime = F;
			M = setTimeout(Y, 1e3)
		} else {
			l(null, Q, d.shift());
			e.removeEventListener("timeupdate", Y);
			G = !1;
			j();
			Q = null
		}
	}
	return {
		zm: !1,
		Lz: !0,
		gR: R
	}
}();
FormatHandler.p$ = {};

FormatHandler.p$.gR = function(l) {
	var d = new Uint8Array(l),
		G = 0,
		b = 112,
		V = 42,
		Q = X.Lv,
		M;
	G += 8;
	var t = d[G];
	G++;
	if (t != V) throw "e";
	var I = Q(d, G);
	G += 4;
	var y = X.Di(d, G, I);
	G += I * 2;
	var e = [];
	while (G < d.length) {
		M = Q(d, G);
		G += 4;
		if (M != b) throw M;
		G += 4;
		M = d[G];
		G++;
		if (M != V) throw M;
		var R = Q(d, G);
		G += 4;
		var J = d[G];
		G++;
		if (J != V) {
			G -= 5;
			R = Q(d, G);
			G += 8;
			M = d[G];
			G++;
			if (M != V) throw M
		}
		var n = Q(d, G) * 2;
		G += 4;
		if (R > 0) e.push(G + n);
		G += n + R
	}
	var r = new DOMParser,
		T = r.parseFromString(y, "image/svg+xml").firstChild.firstChild,
		j = [];
	FormatHandler.p$.g7(T, d, e, j);
	return j
};

FormatHandler.p$.g7 = function(l, d, G, b) {
	var V = l.firstChild.firstChild;
	if (V.tagName == "Image") {
		var Q = V.getElementsByTagName("ImageDescription")[0],
			t = Q.children[0].children,
			I = Q.children[1].children,
			y = G.shift(),
			e = [];
		for (var A = 0; A < I.length; A++) e.push(parseInt(I[A].getAttribute("NumberOfElements")));
		while (e.length > 3) e[2] *= e.pop();
		var M = t.length,
			R = e[0],
			J = e[1],
			n = e[2],
			r = parseInt(I[0].getAttribute("BytesInc"));
		for (var T = 0; T < n; T++) {
			var j = PixelUtil.allocBytes(R * J * 4);
			PixelUtil.andMaskUint32(j, 4278190080);
			for (var g = 0; g < M; g++) {
				var Y = PixelUtil.allocBytes(R * J);
				if (r == 1)
					for (var k = 0; k < Y.length; k++) Y[k] = d[y + k];
				else if (r == 2)
					for (var k = 0; k < Y.length; k++) Y[k] = Math.min(255, (d[y + k * 2 + 1] << 8 | d[y + k * 2]) >>> 2);
				else throw r;
				if (g != 3) PixelUtil.writeChannelToRgba(Y, j, g);
				if (M == 1) {
					PixelUtil.writeChannelToRgba(Y, j, 1);
					PixelUtil.writeChannelToRgba(Y, j, 2)
				}
				y += R * J * r
			}
			b.push({
				uA: new Rect(0, 0, R, J),
				data: j.buffer
			})
		}
	} else {
		var F = l.children,
			D = 0;
		while (D < F.length && F[D].tagName != "Children") D++;
		if (D == F.length) throw "e";
		F = F[D].children;
		for (var q = 0; q < F.length; q++) FormatHandler.p$.g7(F[q], d, G, b)
	}
};

FormatHandler.a6Y = function() {
	function l(t, I, y, e, M) {
		var R = new Int8Array(t.buffer),
			J = new Int8Array(e.buffer),
			n = I + y;
		while (I < n) {
			var hZ = R[I];
			I++;
			if (hZ >= 0 && hZ < 128)
				for (var A = 0; A < hZ + 1; A++) {
					J[M] = R[I];
					M++;
					I++
				}
			if (hZ >= -127 && hZ < 0) {
				for (var A = 0; A < -hZ + 1; A++) {
					J[M] = R[I];
					M++
				}
				I++
			}
		}
		return M
	}

	function d(t, I, y, e, M, R) {
		var J = I * y * e >>> 3,
			n = PixelUtil.allocBytes(J * M),
			r = b(t, 0, 0)[0];
		for (var T = 0; T < M; T++) {
			var j = r[T + 1];
			if (R) {
				var g = FormatHandler.jA("jpg").gR(j.buffer),
					Y = PixelUtil.allocBytes(J);
				PixelUtil.rgbaToGrayPlane(new Uint8Array(g[0].data), Y);
				n.set(Y, J * T)
			} else if (j[0] == 255 && j[1] == 216 && j[2] == 255) {
				var k = UTIF.LosslessJpegDecode(j);
				n.set(new Uint8Array(k.buffer), J * T)
			} else l(j, 64, j.length, n, J * T)
		}
		return n
	}

	function G(t) {
		var I = new Uint8Array(t),
			y = 0,
			e = X.Ko(I, 0, 128);
		y += 128;
		var M = X.Ko(I, y, 4);
		y += 4;
		var R = V(I, y, 0)[0],
			J = R.g28;
		if (J == null) {
			alert("No image.");
			return []
		}
		var n = J.cols,
			r = J.rows,
			T = n * r,
			j = J.photoInterpret,
			g = J.bitsAlloc,
			Y = J.bitsStored,
			k = J.lossyCompr;
		if (k == null) k = R.g8.lossyCompr;
		var F = R.g7fe0.pixelData,
			D = J.numOfFrames;
		D = D ? parseInt(D) : 1;
		var q = new Uint8Array(F.buffer),
			H = T * g >>> 3;
		if (q.length != H * D) {
			F = d(F, n, r, g, D, k)
		} else {}
		if (g == 16) F = new Uint16Array(F.buffer);
		console.log(J);
		console.log(R);
		var W = [];
		for (var Z = 0; Z < D; Z++) {
			var B = Z * H,
				t = PixelUtil.allocBytes(n * r * 4);
			t.fill(255);
			if (j == "MONOCHROME2") {
				var a = 0,
					m = 255,
					p = J.largestValue,
					c = J.smallestValue;
				if (p != null) {
					m = p;
					a = c
				} else if (Y != 8) {
					m = 0;
					a = 1e9;
					for (var A = 0; A < T; A++) {
						var v = F[B + A];
						if (v > 1 << Y - 8) {
							if (v > m) m = v;
							if (v < a) a = v
						}
					}
				}
				var i = 255 / (m - a);
				for (var A = 0; A < T; A++) {
					var v = Math.max(0, Math.min(255, (F[B + A] - a) * i)),
						z = A * 4;
					t[z] = t[z + 1] = t[z + 2] = v
				}
			} else if (j == "PALETTE COLOR") {
				var P = J.pltRed,
					C = J.pltGreen,
					h = J.pltBlue;
				for (var A = 0; A < T; A++) {
					var L = F[B + A],
						z = A * 4;
					t[z] = P[L] >>> 8;
					t[z + 1] = C[L] >>> 8;
					t[z + 2] = h[L] >>> 8
				}
			} else throw j;
			W.push({
				uA: new Rect(0, 0, n, r),
				data: t.buffer
			})
		}
		return W
	}

	function b(t, I, y) {
		var e = X._w,
			M = X.V6,
			R = X.Lv,
			J = [],
			n = I;
		while (I < t.length) {
			var r = e(t, I);
			I += 2;
			var T = e(t, I);
			I += 2;
			var j = R(t, I);
			I += 4;
			if (r == 65534 && T == 57344) {
				if (j == 4294967295) {
					var g = V(t, I, y + 1);
					J.push(g[0]);
					I = g[1]
				} else {
					J.push(t.slice(I, I + j));
					I += j
				}
			} else if (r == 65534 && T == 57357) {} else if (r == 65534 && T == 57565) break;
			else throw "e"
		}
		return [J, I]
	}

	function V(t, I, y) {
		var e = X._w,
			M = X.V6,
			R = X.Lv,
			J = {},
			n = "\t".repeat(y);
		while (I < t.length) {
			var r = e(t, I),
				Y = "",
				k = 0,
				D = null;
			I += 2;
			var T = e(t, I);
			I += 2;
			var j = r.toString(16),
				g = T.toString(16);
			if (r == 65532) break;
			if (r == 65534 && T == 57357) {
				I -= 4;
				break
			}
			if (r == 65534 && T == 57565) throw "e";
			if (T == 0) {
				I += 8;
				continue
			}
			if (65 <= t[I + 1]) {
				Y = X.Ko(t, I, 2);
				I += 2;
				if (Y == "OB" || Y == "SQ" || Y == "OW") {
					k = R(t, I + 2);
					I += 6
				} else {
					k = e(t, I);
					I += 2
				}
			} else {
				Y = Q[j][g].split(",")[1];
				k = R(t, I);
				I += 4
			}
			var F = Q[j][g];
			if (F) F = F.split(",")[0];
			if (F == null) {
				F = "t" + g
			}
			if (Y == "SQ") {
				var q = b(t, I, y);
				D = q[0];
				I = q[1];
				k = 0
			} else if (Y == "US") D = e(t, I);
			else if (Y == "SS") D = M(t, I);
			else if (Y == "UL") D = R(t, I);
			else if (Y == "FL") D = X.kY(t, I);
			else if (Y == "AT") D = [e(t, I), e(t, I + 2)];
			else if (Y == "OB") D = t.slice(I, I + k);
			else if (Y == "OW") D = new Uint16Array(t.slice(I, I + k).buffer);
			else if ("UI CS DA TM DT SH LO ST LT PN AE AS DS IS".split(" ").indexOf(Y) != -1) {
				var H = I + k;
				while (t[H - 1] == 0) H--;
				D = X.Ko(t, I, H - I).trim()
			} else {
				console.log(n, JSON.stringify(X.Ko(t, I, Math.min(k, 32))));
				throw Y
			}
			if (J["g" + j] == null) J["g" + j] = {};
			J["g" + j][F] = D;
			I += k
		}
		return [J, I]
	}
	var Q = {
		"2": {
			"1": "fmiVersion",
			"2": "classUID",
			"3": "instanceUID",
			"10": "syntaxUID",
			"12": "icUID",
			"13": "implVerName",
			"16": "appTitle"
		},
		"4": {
			"1130": "fileSetID"
		},
		"8": {
			"5": "charSet",
			"8": "imageType,CS",
			"16": "classUID,UI",
			"18": "instanceUID,UI",
			"20": "studyDate",
			"21": "seriesDate",
			"22": "acqDate",
			"23": "contentDate",
			"2a": "acqDateTime",
			"30": "studyTime",
			"32": "acqTime",
			"33": "contentTime",
			"50": "accNumber",
			"60": "modality,CS",
			"64": "convType,CS",
			"70": "manufacturer",
			"80": "institutionName",
			"81": "institutionAddress",
			"90": "rpName",
			"1010": "stationName",
			"1030": "studyDescription",
			"103e": "seriesDesc",
			"1050": "ppName",
			"1090": "modelName",
			"1150": "rclassUID",
			"1155": "rinstanceUID",
			"2110": "lossyCompr",
			"2112": "imageSequence"
		},
		"9": {},
		"10": {
			"10": "patientName,PN",
			"20": "patientID,LO",
			"30": "patientBirthDate",
			"40": "patientSex",
			"1010": "patientAge"
		},
		"18": {
			"60": "KVP",
			"1020": "swVersion",
			"1063": "frameTime",
			"1150": "expTime",
			"1151": "xrayTubeCurrent",
			"1152": "exposure",
			"1155": "radiation",
			"1500": "posMotion",
			"1510": "posAngle0",
			"1511": "posAngle1"
		},
		"19": {},
		"20": {
			d: "studyUID,UI",
			e: "seriesUID,UI",
			"10": "studyID",
			"11": "seriesNumber",
			"12": "acqNumber,IS",
			"13": "instanceNumber,IS",
			"20": "patientOrientation"
		},
		"21": {},
		"28": {
			"2": "spp,US",
			"4": "photoInterpret,CS",
			"8": "numOfFrames",
			"9": "frameIncPointer",
			"10": "rows,US",
			"11": "cols,US",
			"30": "pixelSpacing",
			"100": "bitsAlloc,US",
			"101": "bitsStored,US",
			"102": "highBit,US",
			"103": "pixRepresentation,US",
			"106": "smallestValue",
			"107": "largestValue",
			"120": "pixPaddingValue",
			"1040": "pixIntensityRelation",
			"1050": "windCenter",
			"1051": "windWidth",
			"1090": "viewMode",
			"1101": "pdRed",
			"1102": "pdGreen",
			"1103": "pdBlue",
			"1199": "paletteUID",
			"1201": "pltRed",
			"1202": "pltGreen",
			"1203": "pltBlue",
			"2110": "lossyCompr",
			"6010": "repFrameNum",
			"6020": "foi",
			"6022": "foiDescription",
			"6040": "rWavePointer",
			"6100": "maskSubtraction",
			"6101": "maskOp",
			"6110": "maskFrameNum"
		},
		"29": {},
		"37": {},
		"50": {
			"4": "calibImage"
		},
		"5000": {
			"5": "curveDim",
			"10": "numOfPoints",
			"20": "typeOfData",
			"30": "axisUnits",
			"103": "dataValRepr",
			"104": "minCrdValue",
			"105": "maxCrdValue",
			"106": "curveRange",
			"110": "curveDataDesc",
			"112": "crdStartValue",
			"114": "crdStepValue",
			"3000": "curveData"
		},
		"7fe0": {
			"10": "pixelData,OB"
		}
	};
	return {
		gR: G
	}
}();
FormatHandler.pl = {};

FormatHandler.pl.gR = function(l) {
	var d = new Uint8Array(l),
		G = 0,
		b = {},
		M = 1e9;
	for (var A = 0; A < 306; A++) {
		var V = X.Ko(d, G, 8).trim(),
			Q = X.Ko(d, G + 9, 71).split("/")[0].trim();
		b[V] = Q;
		G += 80;
		if (V == "END") {
			G = Math.ceil(G / 2880) * 2880;
			break
		}
	}
	var t = parseInt(b.NAXIS1),
		I = parseInt(b.NAXIS2),
		y = t * I,
		e = parseInt(b.BITPIX),
		R = -1e9,
		J = new Float32Array(y),
		n = new Float32Array(l, G, l.byteLength - G >>> 2);
	for (var A = 0; A < y; A++) {
		var r = A << 2,
			T = A << 1;
		if (e == -32) {
			var j = d[G + r + 0];
			d[G + r + 0] = d[G + r + 3];
			d[G + r + 3] = j;
			var j = d[G + r + 1];
			d[G + r + 1] = d[G + r + 2];
			d[G + r + 2] = j;
			J[A] = n[A]
		} else if (e == 16) {
			J[A] = X._w(d, G + T)
		} else throw e;
		var g = J[A];
		if (g < M) M = g;
		if (g > R) R = g
	}
	var Y = PixelUtil.allocBytes(y * 4),
		k = 1 / R;
	for (var F = 0; F < I; F++)
		for (var D = 0; D < t; D++) {
			var A = F * t + D,
				q = (I - F - 1) * t + D,
				r = q << 2,
				g = J[A] * k;
			Y[r] = Y[r + 1] = Y[r + 2] = 255 * g;
			Y[r + 3] = 255
		}
	return [{
		uA: new Rect(0, 0, t, I),
		data: Y,
		ia: b.OBJECT
	}]
};

FormatHandler.Sy = {};

FormatHandler.Sy.gR = function(l) {
	var d = new Uint8Array(l),
		G = 16,
		b = X.Ko(d, G, 4),
		Q = 32,
		g = 0,
		Y = 0,
		k = !1,
		P;
	G += 4;
	var V = X.Ko(d, G, 8);
	G += 8;
	while (d[G + Q - 1] == 0) Q--;
	var t = X.Ko(d, G, Q);
	G += 32;
	var I = X.Ko(d, G, 4);
	G += 4;
	G += 20;
	var y = X.q(d, G);
	G += 4;
	var e = X.q(d, G);
	G += 4;
	var M = X.q(d, G);
	G += 4;
	var R = X.q(d, G);
	G += 4;
	var J = X.q(d, G);
	G += 4;
	var n = X.q(d, G);
	G += 4;
	var r = "FujiFilm " + t,
		T = [0, 1, 1, 2];
	if (r == "FujiFilm X10") {
		r = "FujiFilm FinePix X10";
		T = [2, 1, 1, 0]
	}
	var j = {
		t271: ["FujiFilm"],
		t272: [r],
		t277: [1],
		t33421: [2, 2],
		t33422: T,
		oK: 1
	};
	G = M;
	var F = [],
		D = X.TD,
		q = X.q(d, G);
	G += 4;
	for (var A = 0; A < q; A++) {
		var H = D(d, G);
		G += 2;
		var W = D(d, G);
		G += 2;
		if (H == 256) {
			Y = D(d, G);
			g = D(d, G + 2)
		} else if (H == 272) {
			F = [D(d, G), D(d, G + 2)]
		} else if (H == 273) {
			F.push(D(d, G), D(d, G + 2))
		} else if (H == 304) {
			k = !(d[G] >>> 7)
		} else if (H == 305) {
			var Z = Math.round(Math.sqrt(W)),
				B = [];
			for (var a = 0; a < W; a++) B.push(d[G + a]);
			B.reverse();
			j.t33421 = [Z, Z];
			j.t33422 = B
		} else if (H == 12272) {
			var m = D(d, G),
				p = D(d, G + 2),
				c = D(d, G + 6);
			j.t50728 = [m / p, 1, m / c]
		}
		G += W
	}
	var v = g < Y,
		i = d.slice(J, J + n),
		z = Math.round(n * 8 / (g * Y));
	if (i[0] == 73 && i[1] == 73 && i[2] == 42) {
		P = UTIF.decode(i.buffer)[0].fujiIFD;
		z = P.t61443[0];
		var C = P.t61454,
			h = P.t61450;
		if (h) j.t50714 = h;
		if (C) j.t50728 = [C[0] / C[1], 1, C[0] / C[2]];
		var L = P.t61447[0];
		i = i.slice(L, L + P.t61448[0])
	}
	var n = i.length,
		U = n * 8 < g * Y * z;
	if (U) {
		console.log("compressed");
		var S = j.t33422,
			E = ~~Math.sqrt(S.length),
			x = [];
		for (var A = 0; A < E; A++) x[A] = S.slice(A * E, A * E + E);
		i = new Uint8Array(UTIF._decompressRAF(i, x).buffer);
		n = i.length
	}

	function K(gX, _, jI) {
		jI = jI << 8 - (_ & 7);
		var iw = _ >>> 3;
		gX[iw] |= jI >>> 16;
		gX[iw + 1] |= jI >>> 8;
		gX[iw + 2] |= jI
	}
	var u = n * 8 / (g * Y);
	if (u == 16)
		for (var A = 0; A < n; A += 2) {
			var bC = i[A];
			i[A] = i[A + 1];
			i[A + 1] = bC
		} else if (u == 14) {
			for (var A = 0; A < n; A += 4) {
				var bC = i[A];
				i[A] = i[A + 3];
				i[A + 3] = bC;
				bC = i[A + 1];
				i[A + 1] = i[A + 2];
				i[A + 2] = bC
			}
		} else if (u == 12)
		for (var A = 0; A < n; A += 3) {
			var O = i[A + 2] << 16 | i[A + 1] << 8 | i[A + 0];
			O = O >>> 12 | (O & 4095) << 12;
			i[A] = O >>> 16 & 255;
			i[A + 1] = O >>> 8 & 255;
			i[A + 2] = O & 255
		}
	if (v) i = FormatHandler.Sy.a5Y(i, g, Y);
	var $ = v ? 2 : 1;
	g *= $;
	j.t256 = [g];
	j.t257 = [Y];
	j.t258 = [z];
	j.t50719 = [F[1], F[0] * $];
	j.t50720 = [F[3], F[2] * $];
	j.width = g;
	j.height = Y;
	j.data = new Uint8Array(i.buffer);
	return [j]
};

FormatHandler.Sy.a5Y = function(l, d, G) {
	l = new Uint16Array(l.buffer);
	var b = new Uint16Array(d * G * 2);
	for (var V = 0; V < G; V += 2)
		for (var Q = 0; Q < d; Q++) {
			var t = V * d + Q,
				I = t * 2,
				y = l[t],
				e = l[t + d];
			b[I + 1] = b[I + 2 * d] = e;
			if (((V >>> 1) + Q & 1) == 0) {
				b[I] = y;
				b[I + 2 * d + 1] = l[t + 1]
			} else {
				b[I] = l[t - 1];
				b[I + 2 * d + 1] = y
			}
		}
	return b
};

FormatHandler.e4 = {};

FormatHandler.e4.ve = !0;
FormatHandler.e4.bi = function(l, d, G, b) {
	var V = new Uint8Array(l[0][0]),
		Q = d * G,
		t = [1, 3, 4][b[0]],
		I = 8 + 8 * b[1],
		y = b[2];
	if (t == 1) {
		var e = new Uint8Array(d * G);
		PixelUtil.extractChannelFromRgba(V, e, 0);
		V = e
	}
	if (t == 3) {
		var e = new Uint8Array(d * G * 3);
		for (var A = 0; A < Q; A++) {
			var M = A * 4,
				R = A * 3;
			e[R] = V[M];
			e[R + 1] = V[M + 1];
			e[R + 2] = V[M + 2]
		}
		V = e
	}
	if (I == 16) {
		var J = V.length,
			e = new Uint8Array(J * 2);
		for (var A = 0; A < J; A++) {
			var n = Math.round(V[A] * (65535 / 255));
			e[A * 2 + y] = n >>> 8;
			e[A * 2 + 1 - y] = n & 255
		}
		V = e
	}
	return V.buffer
};

FormatHandler.SO = {};

FormatHandler.SO.gR = function(l, d) {
	function G(y) {
		return ~~(.5 + PixelUtil.linearToSrgb(Math.max(0, Math.min(1, y))) * 255)
	}
	var b = EXRLoader.parse(l),
		V = b.width,
		Q = b.height,
		t = PixelUtil.allocBytes(V * Q * 4);
	for (var I = 0; I < Q; I++)
		for (var y = 0; y < V; y++) {
			var A = (I * V + y) * 4,
				e = ((Q - I - 1) * V + y) * 4;
			t[A] = G(b.data[e + 0]);
			t[A + 1] = G(b.data[e + 1]);
			t[A + 2] = G(b.data[e + 2]);
			t[A + 3] = G(b.data[e + 3])
		}
	return [{
		uA: new Rect(0, 0, V, Q),
		data: t.buffer
	}]
};

FormatHandler.Jz = {};

FormatHandler.Jz.ve = !0;
FormatHandler.Jz.zm = !0;
FormatHandler.Jz.bi = function(l, d, G, b, V) {
	b = ["", 100, !1, !1, !1, 0, !1];
	b[7] = ["jpg"];
	var Q = new ToDXF;
	colorSpaceHelper.exportDocumentToPdf(l, b, Q, V.Hg);
	return Q.buffer
};

FormatHandler.Jz.gR = function(l, d) {
	var G = 72,
		b = new Matrix2D(1, 0, 0, 1, 0, 0);
	b.scale(G / 72, G / 72);
	d.m7 = G;
	var V = new a7(d, b, !1);
	FromDXF.Parse(l, V)
};

FormatHandler.tI = {};

FormatHandler.tI.gR = function() {
	return;
	if (!window.X) return setTimeout(FormatHandler.tI.gR, 150); // hbi add
	var l = X._w,
		d = X.Lv,
		G = X.Ko,
		b;

	function V(t, I, y, e, M) {
		var R = d(t, y),
			J = d(t, y + 4),
			n = d(t, y + 8),
			r = l(t, y + 12),
			T = l(t, y + 14);
		y += 16;
		var j = {};
		for (var A = 0; A < r + T; A++) {
			var g = d(t, y),
				Y = d(t, y + 4),
				k, F;
			if (g >>> 31 == 1) {
				g = g & 16777215
			}
			if (A < r) k = X.Di(t, I + g + 2, l(t, I + g));
			else k = "id" + g;
			var D = e.slice(0);
			D.push(k);
			if (Y >>> 31 == 1) {
				Y = Y & 268435455;
				F = V(t, I, I + Y, D, M)
			} else {
				var q = d(t, I + Y),
					H = d(t, I + Y + 4),
					W = d(t, I + Y + 8),
					Z = d(t, I + Y + 12);
				if (Z != 0) throw "e";
				if (q < M[0] || q > M[0] + M[1]) throw "e";
				var B = M[2] + q - M[0];
				F = t.slice(B, B + H);
				var a = FormatHandler.aJ(F.buffer);
				if (a && ["bmp", "png", "ico"].indexOf(a) != -1) {
					var m = FormatHandler.jA(a);
					if (!m.zm) {
						var p = null;
						try {
							p = m.gR(F.buffer)
						} catch (dk) {}
						if (p) {
							p[0].ia = D[1];
							b.push(p[0])
						}
					}
				} else if (a) console.log(a)
			}
			j[k] = F;
			y += 8
		}
		return j
	}

	function Q(t) {
		b = [];
		var I = new Uint8Array(t),
			y = 0,
			e = l(I, y);
		y += 2;
		y += 58;
		var M = d(I, y);
		y += 4;
		y = M;
		var R = G(I, y, 4);
		y += 4;
		var J = l(I, y);
		y += 2;
		var n = l(I, y);
		y += 2;
		var r = d(I, y);
		y += 4;
		var T = d(I, y);
		y += 4;
		var j = d(I, y);
		y += 4;
		var g = l(I, y);
		y += 2;
		var Y = l(I, y);
		y += 2;
		y += g;
		var k = {};
		for (var A = 0; A < n; A++) {
			var F = y;
			while (I[F] != 0) F++;
			var D = G(I, y, F - y),
				q = d(I, y + 8),
				H = d(I, y + 12),
				W = d(I, y + 16),
				Z = d(I, y + 20),
				B = d(I, y + 24),
				a = d(I, y + 28),
				m = l(I, y + 32),
				p = l(I, y + 34),
				Y = d(I, y + 36);
			k[D] = [H, q, Z, W, Y];
			if (B + a != 0) throw "e";
			y += 40
		}
		for (var c in k) {
			var v = k[c];
			y = v[2];
			if (c == ".rsrc") {
				var i = V(I, y, y, [], v),
					z = "id134"
			}
		}
		return b
	}
	return Q
}();

FormatHandler.R5 = {};

FormatHandler.R5.zm = !0;
FormatHandler.R5.gR = function(l, d, G) {
	cp.Cd(l, d, G)
};
(function() {
	var l = FormatHandler.RT.get("wasm/zstd").buffer;
	WebAssembly.instantiate(l).then(function(d) {
		var G = d.instance.exports;
		FormatHandler.R5.aqZ = G
	})
}());
FormatHandler.R5.OY = function(l, d) {
	var G = FormatHandler.R5.aqZ,
		b = l.length,
		V = G.memory,
		Q = 2 * b + 1e6,
		y = 8;
	FormatHandler.eT(G, Q);
	var t = new Uint8Array(V.buffer),
		I = G.malloc(b);
	t.set(l, I);
	while (!0) {
		var e = d == null ? b * y : d;
		FormatHandler.eT(G, Q + e);
		var M = G.malloc(e),
			R = G.ZSTD_decompress(M, e, I, b);
		if (R == -70) {
			G.free(M);
			y += y >>> 1;
			if (d != null) throw "error"
		} else {
			t = new Uint8Array(V.buffer);
			l = t.slice(M, M + R);
			G.free(M);
			break
		}
	}
	G.free(I);
	return l
};

FormatHandler.sZ = {};

FormatHandler.sZ.zm = !0;
FormatHandler.sZ.gR = function() {
	var l = 0,
		d = 1,
		G = 2,
		b = 3,
		V = 4,
		Q = 5,
		t = 6,
		I = 7,
		y = 1,
		e = 2,
		M = 7,
		R = 8,
		J = 9,
		n, r, T, j, g;

	function Y() {
		var hZ = X.EY(n, r);
		r += 4;
		return hZ
	}

	function k() {
		var P = 0,
			C = 0;
		for (var A = 0; A < 5; A++) {
			var h = n[r++];
			P += (h & 127) << C;
			C += 7;
			if ((h & 128) == 0) break
		}
		return P
	}

	function F() {
		var P = k(),
			C = X.Kw(n, r, P);
		r += P;
		return C
	}

	function D() {
		return {
			typeName: F(),
			afW: Y()
		}
	}

	function q() {
		var P = Y(),
			C = F(),
			h = [],
			L = Y();
		for (var A = 0; A < L; A++) h.push([F()]);
		return {
			id: P,
			MS: C,
			aAa: h
		}
	}

	function H(P) {
		var C = P.aAa,
			h = [];
		for (var A = 0; A < C.length; A++) C[A].push(n[r++]);
		for (var A = 0; A < C.length; A++) {
			var L = C[A][1],
				U;
			C[A].push(W(L))
		}
	}

	function W(P) {
		var C;
		if (P == l) C = n[r++];
		else if (P == b) C = F();
		else if (P == V) C = D();
		else if (P == d || P == G || P == t || P == Q) {} else throw P;
		return C
	}

	function Z(P, C, h) {
		var L;
		if (P == l) {
			if (C == y) L = n[r++] == 1;
			else if (C == e) {
				L = n[r++]
			} else if (C == R) L = Y();
			else if (C == J) {
				L = Y();
				Y()
			} else throw C
		} else if (P == b) {
			L = p(h + 1)
		} else if (P == V) {
			L = p(h + 1)
		} else if (P == Q) {
			L = p(h + 1)
		} else if (P == d) {
			L = p(h + 1)
		} else if (P == t) {
			L = p(h + 1)
		} else throw P;
		return L
	}

	function B(P, C) {
		var h = T["c" + P],
			L = h.aAa,
			U = {
				_class: h.MS
			};
		for (var A = 0; A < L.length; A++) {
			var S = L[A],
				E = S[1],
				x = S[2],
				K = Z(E, x, C),
				u = S[0];
			U[u] = K
		}
		return U
	}

	function a(P, C, h, L) {
		var U = [];
		for (var A = 0; A < P; A++) {
			var S = Z(C, h, L);
			if (S.sA && S.sA == "null_count") {
				var E = S.qv;
				for (var x = 0; x < E; x++) U.push(null);
				A += E - 1
			} else U.push(S)
		}
		return U
	}

	function m() {
		return [Y(), Y()]
	}

	function p(P) {
		if (P == null) throw "e";
		var C = null,
			h = n[r],
			L = null;
		r++;
		if (h == 0) {
			var U = Y(),
				S = Y(),
				E = Y(),
				x = Y();
			C = [U, S, E, x]
		} else if (h == 1) {
			L = Y();
			var K = Y();
			C = B(K, P)
		} else if (h == 4) {
			var u = q();
			L = u.id;
			H(u);
			T["c" + u.id] = u;
			C = B(u.id, P)
		} else if (h == 5) {
			var u = q();
			L = u.id;
			H(u);
			var bC = Y();
			T["c" + u.id] = u;
			C = B(u.id, P)
		} else if (h == 6) {
			L = Y();
			var O = F();
			C = O
		} else if (h == 7) {
			L = Y();
			var $ = n[r++];
			if ($ != 0) throw $;
			var gX = Y();
			if (gX != 1) throw gX;
			var _ = Y(),
				jI = n[r++],
				iw = W(jI);
			C = a(_, jI, iw, P)
		} else if (h == 9) {
			var hn = Y();
			C = {
				sA: "ref",
				qv: hn
			};
			g["o" + hn] = !0
		} else if (h == 10) {
			C = {
				sA: "null_count",
				qv: 1
			}
		} else if (h == 11) {
			C = {
				sA: "end"
			}
		} else if (h == 12) {
			var bC = Y(),
				jq = F()
		} else if (h == 13) {
			var iv = n[r++];
			C = {
				sA: "null_count",
				qv: iv
			}
		} else if (h == 16) {
			var kq = m();
			L = kq[0];
			C = a(kq[1], V, null, P)
		} else if (h == 17) {
			var kq = m();
			L = kq[0];
			C = a(kq[1], d, null, P)
		} else throw "e";
		if (L != null && L > 0) {
			if (j["o" + L] != null) throw "e";
			j["o" + L] = C
		}
		return C
	}

	function c(P, j) {
		if (P instanceof Array) {
			for (var A = 0; A < P.length; A++) P[A] = v(P[A], j)
		} else if (P instanceof Object) {
			for (var C in P) P[C] = v(P[C], j)
		}
	}

	function v(P, j) {
		if (P && P.sA && P.sA == "ref") return j["o" + P.qv];
		else return P
	}

	function i(P, C, h) {
		n = new Uint8Array(P);
		r = 0;
		T = {};
		j = {};
		g = {};
		var L = X.Ko(n, 0, 4);
		if (L != "PDN3") throw L;
		r += 4;
		var U = X._w(n, r) + n[r + 2] * 256 * 256;
		r += 3;
		var S = X.Ko(n, r, U);
		r += U;
		r += 2;
		while (!0) {
			var E = p(0);
			if (E && E.sA && E.sA == "end") break
		}
		for (var x in g)
			if (j[x] == null) throw x;
		for (var x in j) c(j[x], j);
		var K = j.o1;
		console.log(K);
		C.m = K.width;
		C.n = K.height;
		C.buffer = PixelUtil.allocBytes(C.m * C.n * 4);
		var u = K.layers["ArrayList+_items"];
		for (var A = 0; A < u.length; A++) {
			var bC = u[A];
			if (bC == null) continue;
			console.log(bC);
			var O = bC["Layer+width"],
				$ = bC["Layer+height"],
				gX = bC["Layer+properties"],
				_ = bC.properties,
				jI = _.blendOp._class.split("+").pop();
			jI = jI.slice(0, jI.length - 7);
			var iw = {
					Normal: "norm",
					Multiply: "mul ",
					Additive: "lddg",
					ColorBurn: "idiv",
					ColorDodge: "div ",
					Reflect: "lddg",
					Glow: "hMix",
					Overlay: "over",
					Difference: "diff",
					Negation: "smud",
					Lighten: "lite",
					Darken: "dark",
					Screen: "scrn",
					Xor: "smud"
				}[jI],
				hn = C.V4();
			hn.tH(gX.name);
			hn.opacity = gX.opacity;
			hn.Oj(gX.visible);
			hn.blendModeKey = iw;
			var jq = 1 << 16,
				iv = Math.ceil(O * $ / jq);
			hn.rect = new Rect(0, 0, O, $);
			hn.buffer = PixelUtil.allocBytes(O * $ * 4);
			var kq = hn.buffer;
			r += 5;
			for (var eE = 0; eE < iv; eE++) {
				var e8 = z();
				kq.set(e8[1], e8[0] * jq * 4)
			}
			for (var aI = 0; aI < kq.length; aI += 4) {
				var dK = kq[aI + 0];
				kq[aI + 0] = kq[aI + 2];
				kq[aI + 2] = dK
			}
			C.B.push(hn)
		}
	}

	function z() {
		var P = X.q(n, r);
		r += 4;
		var C = X.q(n, r);
		r += 4;
		var h = pako.inflateRaw(n.slice(r + 10));
		r += C;
		return [P, h]
	}
	return i
}();
FormatHandler.AL = {};

FormatHandler.AL.zm = !0;
FormatHandler.AL.gR = function(l, d) {
	f2.Cd(l, d)
};

FormatHandler.Wb = {};

FormatHandler.Wb.zm = !0;
FormatHandler.Wb.gR = function() {
	var l, d, j = null,
		W, Z;

	function G() {
		var z = l[d];
		d += 1;
		return z
	}

	function b() {
		var z = X.TD(l, d);
		d += 2;
		return z
	}

	function V() {
		var z = X.q(l, d);
		d += 4;
		return z
	}

	function Q() {
		var z = X.YU(l, d);
		d += 4;
		return z
	}

	function t() {
		var z = X.fD(l, d);
		d += 8;
		return z
	}

	function I() {
		var z = V();
		if (z > 200) throw z;
		var P = X.tj(l, d, z);
		d += z * 2;
		return P
	}

	function y() {
		var z = X.o_(l, d);
		d += 8;
		return z
	}

	function e() {
		var z = X.f_(l, d);
		d += 4;
		return z
	}

	function M() {
		var z = V();
		if (V() != 4) throw "e";
		var P = [];
		for (var A = 0; A < z; A++) P.push(V());
		return P
	}

	function R(z, P, C) {
		for (var A = 0; A < z.length; A++)
			if (z[A][P] == C) return z[A]
	}

	function J(z, P) {
		var C = Date.now();
		l = new Uint8Array(z);
		d = X.dp(l, "CHNKSQLi") + 8;
		var h = t(),
			L = PdfParser.parse(l.buffer.slice(d, d + h)),
			U = PdfParser.atw(L, !0);
		console.log(U);
		var S = U.Canvas[0],
			E = S.Width,
			x = S.Height,
			K = S.Unit,
			u = P.m7 = S.Resolution;
		if (K == 0) {} else if (K == 2) {
			E = Math.round(E * u / 25.4);
			x = Math.round(x * u / 25.4)
		} else if (K == 3) {
			E = Math.round(E * u);
			x = Math.round(x * u)
		} else if (K == 5) {
			E = Math.round(E * u / 72);
			x = Math.round(x * u / 72)
		} else {
			console.log(S);
			throw K
		}
		P.m = E;
		P.n = x;
		P.buffer = PixelUtil.allocBytes(E * x * 4);
		console.log(Date.now() - C);
		var bC = R(U.Layer, "MainId", S.RootFolder);
		p(U, l, P, bC.FirstChildIndex, 0);
		console.log(Date.now() - C)
	}

	function n() {
		var z = X._w(l, d);
		d += 2;
		return z
	}

	function r() {
		var z = X.Lv(l, d);
		d += 4;
		return z
	}

	function T() {
		var z = X.EY(l, d);
		d += 4;
		return z
	}

	function g(z) {
		var P = {
				11: "runs",
				31: "font",
				32: "size",
				33: "unit",
				34: "colr",
				42: "bbox",
				57: "fnts",
				63: "bdim",
				64: "bplg"
			},
			h = 0;
		l = z;
		d = 0;
		var C = {};
		while (d < l.length) {
			var L = r(),
				U = r(),
				S = d + U;
			if (U == 0) continue;
			var E = [];
			if (L == 11) {
				var x = r();
				for (var K = 0; K < x; K++) {
					var u = [r(), r()];
					E.push(u);
					h += u[1];
					var bC = d + r() - 4;
					u.push(n(), n(), n(), n());
					u.push(X.Ub(l, d));
					d += 8;
					var O = n();
					u.push(X.Di(l, d, O));
					d += O * 2;
					if (d != bC) throw "e"
				}
			} else if (L == 31) {
				E = X.Kw(l, d, U);
				d += U
			} else if (L == 34)
				for (var A = 0; A < 3; A++) E.push(r() >>> 16);
			else if (L == 42)
				for (var A = 0; A < 4; A++) E.push(T());
			else if ([32, 33, 35, 37, 38, 43, 44, 45, 46, 48, 49, 50, 51, 52, 53, 55, 58, 59, 60, 61, 62].indexOf(L) != -1) {
				if (U != 4) throw "e";
				E = r();
				if ([37, 45, 46, 51, 53, 55, 61, 62].indexOf(L) != -1) {
					if (E != 0 && E != 1) throw L + ":" + E;
					d = S;
					continue
				}
			} else if (L == 47) {
				var $ = n();
				if (r() != 50) throw "e";
				if (r() != 0) throw "e";
				var gX = n();
				E = X.Ko(l, d, gX);
				d += gX
			} else if (L == 57) {
				var x = n();
				for (var A = 0; A < x; A++) {
					var _ = n(),
						jI = X.Ko(l, d, _);
					d += _;
					var iw = n(),
						hn = X.Ko(l, d, iw);
					d += iw;
					E.push([jI, hn])
				}
				var jq = r();
				for (var A = 0; A < x; A++) E[A].push(jq)
			} else if (L == 39 || L == 63) E.push(r(), r());
			else if (L == 64) {
				for (var A = 0; A < 8; A++) E.push(X.EY(l, d + A * 4) / 100);
				d += 32
			} else {
				E = l.slice(d, S);
				d += U
			}
			var iv = P[L];
			if (iv == null) iv = "t" + L;
			if (C[iv]) throw "e";
			C[iv] = E;
			if (d != S) throw L
		}
		if (j) {}
		j = C;
		return C
	}

	function Y(z) {
		l = z;
		d = 0;
		var P = V();
		if (P != z.length) throw "e";
		var C = V(),
			h = I(),
			L = V(),
			U = y(),
			S = [V() / 4294967295, V() / 4294967295, V() / 4294967295];
		return [L, U, S]
	}

	function k(z, P) {
		function C() {
			var hG = [];
			for (var A = 0; A < 4; A++) hG.push(X.YU(l, d + A * 4));
			d += 16;
			return hG
		}

		function h(hZ) {
			var hG = [];
			for (var A = 0; A < hZ; A++) hG.push(e());
			return hG
		}

		function L(hG) {
			var hf = "";
			for (var A = d; A < hG; A += 4) hf += l.slice(A, A + 4).join(", ") + "\n";
			return hf
		}
		l = z;
		d = P + 8;
		var U = t(),
			S = d + U;
		d += 56;
		if (d == S) return;
		var E = [],
			x = [],
			K = [],
			u = [],
			bC = [];
		while (d < S) {
			var O = V(),
				kq = 1;
			if (O != 88 && O != 96) throw O;
			var O = V();
			if (O != 72) throw "e";
			var $ = V();
			if ($ != 88 && $ != 104 && $ != 120) throw $;
			var O = V();
			if (O != 88) throw "e";
			var gX = V(),
				_ = V(),
				jI = C(),
				iw = [];
			K.push(iw);
			for (var A = 0; A < 6; A++) {
				iw.push(D(V()))
			}
			var hn = y(),
				jq = V();
			if (jq == 16 || jq == 1040 || jq == 304) {
				V();
				jq = V()
			}
			if (jq != 0 && jq != 1 && jq != 2 && jq != 3 && jq != 4 && jq != 5 && jq != 8 && jq != 9 && jq != 22) throw jq;
			var iv = y();
			u.push(iv);
			var eE = V(),
				e8 = (_ & 256) != 0,
				aI = [],
				dK = [],
				jC = {
					88: 1,
					104: 2,
					120: 3
				}[$];
			for (var A = 0; A < gX; A++) {
				var d7 = A == 0 ? 1 : jC;
				for (var ka = 0; ka < d7; ka++) aI.push(y(), y());
				dK.push(d7 == 1 ? A == 0 ? "M" : "L" : d7 == 2 ? "Q" : "C");
				var hS = C(),
					eH = V();
				kq = e();
				var kA = h(10),
					gq = V(),
					hb = V()
			}
			bC.push(kq);
			if ($ == 104) {
				var ex = y(),
					fs = y();
				if (e8) {
					dK.push("Q");
					aI.push(ex, fs, aI[0], aI[1])
				}
			}
			if ($ == 120) {
				var ex = y(),
					fs = y(),
					f_ = y(),
					bD = y();
				if (e8) {
					dK.push("C");
					aI.push(ex, fs, f_, bD, aI[0], aI[1])
				}
			}
			if (_ & 128) {
				var ae = ["M"],
					em = [aI[0], aI[1]],
					dY = aI.length >>> 1,
					f7 = PixelUtil.vec.transformCoordsH(aI);
				for (var A = 0; A < dY; A++) {
					var bM = aI[2 * A],
						iP = aI[2 * A + 1],
						jp = .7;
					for (var ka = 0; ka < 2; ka++) {
						f7[A * 4 + ka * 2] = jp * f7[A * 4 + ka * 2] + (1 - jp) * bM;
						f7[A * 4 + ka * 2 + 1] = jp * f7[A * 4 + ka * 2 + 1] + (1 - jp) * iP
					}
				}
				for (var A = 1; A < dY; A++) {
					ae.push("C");
					em.push(f7[A * 4 - 2], f7[A * 4 - 1], f7[A * 4], f7[A * 4 + 1], aI[A * 2], aI[A * 2 + 1])
				}
				if (e8) {
					ae.push("C");
					em.push(f7[dY * 4 - 2], f7[dY * 4 - 1], f7[0], f7[1], aI[0], aI[1])
				}
				aI = em;
				dK = ae
			}
			if (e8) dK.push("Z");
			x = x.concat(aI);
			E = E.concat(dK)
		}
		if (d != S) throw "e";
		return [{
			C: x,
			F: E
		}, K, u, bC]
	}

	function F(z, P) {
		l = z;
		d = P + 8;
		var C = t(),
			h = d + C,
			L = 0;
		d += 56;
		var U = [];
		while (d < h) {
			var S = V(),
				E = d + S - 4;
			if (E > h) throw "e";
			if (S == 11) {
				d -= 4;
				var x = I(),
					K = V();
				if (K != 12) throw "e";
				var u = M(),
					bC = I(),
					K = V();
				if (K != 12) throw "e";
				var O = M();
				if (d != h) throw "e"
			} else {
				var $ = I(),
					gX = V();
				if (gX != L) throw gX;
				L++;
				var _ = b();
				if (_ != 0 && _ != 1 && _ != 2 && _ != 5) throw _;
				var jI = G();
				if (jI != 0 && jI != 32 && jI != 64) throw jI;
				if (V() != 1) throw "e";
				if (V() != 1) throw "e";
				if (G() != 0) throw "e";
				if (V() == 1) {
					var iw = V(),
						hn = X.Lv(l, d);
					if (iw != hn + 4) throw "e";
					U.push(new Uint8Array(l.buffer, d + 4, hn));
					d += iw
				} else U.push(new Uint8Array(0));
				var jq = I();
				if (d != E) throw d
			}
		}
		return U
	}

	function D(z) {
		return Math.min(255, Math.round(z / 16777216))
	}

	function q(z) {
		l = z;
		d = 0;
		var P = V();
		if (P != 16) throw P;
		var C = V();
		if (C != 102) throw C;
		var h = V();
		if (h != 42 && h != 58) throw h;
		var L = V();
		if (z.length - L != 118 + h) throw z.length - L;
		var U = I();
		if (U != "Parameter") throw U;
		var S = V(),
			E = V(),
			x = V(),
			K = V(),
			u = [];
		for (var A = 0; A < 16; A++) u.push(V());
		var U = I();
		if (U != "InitColor") throw U;
		if (V() != 20) throw "e";
		var bC = V(),
			O = V(),
			$ = V();
		if (V() != 4) throw "e";
		if (h == 58) {
			var gX = [];
			u.push(gX);
			for (var A = 0; A < 4; A++) gX.push(D(V()))
		}
		var U = I();
		if (U != "BlockSize") throw U;
		var _ = V();
		if (_ != 12) throw _;
		var jI = M();
		if (d != l.length) throw "e";
		return [S, E, x, K, bC * 255, u]
	}

	function H(z, P) {
		var C = X.Ko(P, 0, 40),
			h = R(z["ExternalChunk"], "ExternalID", C);
		if (h == null) {
			console.log("chnk not found", C)
		}
		return h ? h.Offset : -1
	}

	function B(z, P, C, h) {
		if (W == null) {
			W = PixelUtil.allocBytes(256 * 256 * 4);
			Z = PixelUtil.allocBytes(256 * 256)
		}
		var L = z.Mipmap,
			U = z.MipmapInfo,
			S = z.Offscreen,
			E = R(L, "MainId", C),
			x = R(U, "MainId", E.BaseMipmapInfo),
			K = R(S, "MainId", x.Offscreen),
			u = H(z, K.BlockData),
			J = null;
		if (u == -1) return null;
		var bC = F(P, u),
			O = q(K.Attribute),
			$ = O[0],
			gX = O[1],
			_ = O[2],
			jI = O[3],
			iw = O[4],
			hn = O[5],
			jq = hn[16],
			iv = hn[1],
			kq = hn[2],
			eE = iv + kq;
		if (kq != hn[5]) throw "e";
		if (iv != hn[7]) throw "e";
		var e8 = PixelUtil.allocBytes(256 * (hn[6] + hn[8])),
			aI = new Rect;
		if (jq) aI = new Rect(0, 0, $, gX);
		else {
			for (var dK = 0; dK < jI; dK++)
				for (var jC = 0; jC < _; jC++) {
					var d7 = bC[dK * _ + jC];
					if (d7.length == 0) continue;
					aI = aI.Cw(new Rect(jC << 8, dK << 8, 256, 256))
				}
		}
		var ka = aI.wD(new Rect(0, 0, $, gX)),
			hS = PixelUtil.allocBytes(ka.O() * (eE == 1 ? 1 : 4));
		if (jq) new Uint32Array(hS.buffer).fill(255 << 24 | jq[0] << 16 | jq[1] << 8 | jq[2]);
		if (eE == 1) hS.fill(iw);
		for (var dK = 0; dK < jI; dK++)
			for (var jC = 0; jC < _; jC++) {
				var d7 = bC[dK * _ + jC];
				if (d7.length == 0) continue;
				var eH = new Uint8Array(d7.buffer, d7.byteOffset + 2, d7.length - 6),
					kA = new Rect(jC << 8, dK << 8, 256, 256);
				UZIP.inflateRaw(eH, e8);
				if (eE == 1) {
					if (hn[8] == 32) {
						a(e8, 0, Z);
						PixelUtil.copyBufferRect(Z, kA, hS, ka)
					} else PixelUtil.copyBufferRect(e8, kA, hS, ka)
				} else if (eE == 2) {
					if (hn[8] == 32) {
						new Uint32Array(W.buffer).fill(4278190335);
						a(e8, 0, Z);
						PixelUtil.writeChannelToRgba(Z, W, 3);
						a(e8, 256 * 32, Z);
						PixelUtil.grayPlaneToRgbaChannels(Z, W)
					} else
						for (var A = 0; A < 262144; A += 4) {
							var jq = e8[65536 + (A >>> 2)];
							W[A] = jq;
							W[A + 1] = jq;
							W[A + 2] = jq;
							W[A + 3] = e8[A >>> 2]
						}
					PixelUtil.blitRgbaRect(W, kA, hS, ka)
				} else if (eE == 5) {
					for (var A = 0; A < 262144; A += 4) {
						W[A] = e8[65536 + A + 2];
						W[A + 1] = e8[65536 + A + 1];
						W[A + 2] = e8[65536 + A + 0];
						W[A + 3] = e8[A >>> 2]
					}
					PixelUtil.blitRgbaRect(W, kA, hS, ka)
				} else throw eE
			}
		if (h && eE == 1) {
			var gq = PixelUtil.allocBytes($ * gX * 4);
			PixelUtil.writeChannelToRgba(hS, gq, 3);
			hS = gq
		}
		return [ka, hS, iw]
	}

	function a(z, d, P) {
		for (var A = 0; A < P.length; A++) {
			P[A] = (z[d + (A >>> 3)] >>> 7 - (A & 7) & 1) * 255
		}
	}
	var m = ["norm", "dark", "mul ", "idiv", "lbrn", null, "dkCl", "lite", "scrn", "div ", null, "lddg", "lddg", null, "over", null, "hLit", null, null, null, null, null, "smud", null, null, null, null, null, null, null, "pass", null, null, null, null, null, "fdiv"];

	function p(z, P, C, h, L) {
		var U = z.Layer,
			S = z.Canvas[0];
		while (h != 0) {
			var E = R(U, "MainId", h),
				x = E.Type,
				_ = !1;
			console.log(E);
			var K = C.V4();
			K.tH(E.Name);
			K.opacity = Math.min(255, E.Opacity);
			K.Oj((E.Visibility & 1) != 0);
			K.blendModeKey = m[E.Composite];
			if (K.blendModeKey == null) {
				alert("Unknown blend mode " + E.Composite);
				K.blendModeKey = "norm"
			}
			K.usesClippingMask = E.Clip == 1;
			C.B.push(K);
			var u = E.LayerMaskMipmap;
			if (u != 0) {
				var bC = B(z, P, u, !1);
				if (bC) {
					K.z = new LayerRecord.LayerMask;
					K.z.rect = bC[0];
					K.z.channel = bC[1];
					K.z.color = bC[2];
					c(K.z.rect, E, "Mask", "Mask");
					K.z.dispose()
				}
			}
			var O = [];
			for (var A = 0; A < 3; A++) O.push(D(E["DrawColorMain" + ["Red", "Green", "Blue"][A]]));
			var $ = {
					t: "Objc",
					v: PixelUtil.color.rgbColorDescriptor({
						o: O[0],
						J: O[1],
						k: O[2]
					})
				},
				gX = JSON.parse(LayerStyleConstants.defaultLayerStyleJson);
			for (var A = 0; A < LayerStyleConstants.effectOrder.length; A++) gX[LayerStyleConstants.effectMultiKeys[A]] = {
				t: "VlLs",
				v: []
			};
			if (E.DrawColorEnable == 1 && x != 1584) {
				_ = !0;
				var jI = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("SoFi")]);
				jI.Clr = $;
				gX.solidFillMulti.v.push({
					t: "Objc",
					v: jI
				})
			}
			if (E.EffectInfo) {
				var iw = Y(E.EffectInfo),
					O = iw[2];
				if (iw[0] == 1) {
					_ = !0;
					var jI = JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[LayerStyleConstants.effectOrder.indexOf("FrFX")]);
					jI.Clr.v = PixelUtil.color.rgbColorDescriptor({
						o: O[0] * 255,
						J: O[1] * 255,
						k: O[2] * 255
					});
					jI.Sz.v.val = Math.round(iw[1]);
					gX.frameFXMulti.v.push({
						t: "Objc",
						v: jI
					})
				}
			}
			if (E.FilterLayerInfo) {
				l = E.FilterLayerInfo;
				d = 0;
				var hn = V(),
					jq = V();
				if (jq != l.length - d) throw "e";
				var iv = {
					1: "brit",
					3: "curv",
					4: "hue2",
					5: "blnc",
					6: "nvrt",
					9: "grdm"
				}[hn];
				if (iv != null) {
					var kq = FilterHelper.oT(iv);
					K.add[iv] = kq ? kq : {};
					if (iv == "brit") FilterHelper.It["g" + iv](kq, [Q(), Q(), !0]);
					if (iv == "hue2") d8.fZ(kq, 0, [Q(), Q(), Q()]);
					if (iv == "curv") {
						var eE = [],
							e8 = d;
						for (var A = 0; A < 32; A++) {
							d = e8 + A * 130;
							var aI = b(),
								dK = [];
							eE.push(dK);
							for (var jC = 0; jC < aI; jC++) dK.push(b() / 65535, b() / 65535)
						}
						for (var A = 0; A < 4; A++) {
							var dK = eE[A],
								d7 = cb.RX(kq, A),
								ka = d7[0];
							for (var jC = 0; jC < dK.length; jC += 2) {
								var hS = d7[jC >>> 1] = JSON.parse(JSON.stringify(ka));
								hS.v.Hrzn.v = Math.round(dK[jC] * 255);
								hS.v.Vrtc.v = Math.round(dK[jC + 1] * 255)
							}
							cb.fZ(kq, A, d7)
						}
					}
					if (iv == "grdm") {
						var eH = kq.Grad.v,
							kA = [],
							gq = V();
						if (gq != jq - 4) throw gq;
						var hb = V();
						if (hb != 16) throw hb;
						var ex = V();
						if (ex != 28) throw ex;
						var fs = V();
						for (var A = 0; A < fs; A++) {
							var f_ = 0,
								bD = [];
							for (var jC = 0; jC < 7; jC++) bD.push(V());
							kA.push([bD[6] / 32768, [bD[1] / 4294967295, bD[2] / 4294967295, bD[3] / 4294967295], bD[4] / 4294967295])
						}
						PixelUtil.color.stopsToDescriptor(kA, eH)
					}
					if (iv == "blnc") {
						kq.PrsL.v = V() == 1;
						for (var A = 0; A < 3; A++) {
							var ae = kq[["ShdL", "MdtL", "HghL"][A]].v;
							for (var jC = 0; jC < 3; jC++) ae[jC].v = Q()
						}
					}
				} else console.log("Unknown adjustment", hn, jq, K.getName())
			}
			if (x == 1584) {
				K.layerFlags |= 16;
				K.add.SoCo = {
					classID: "null",
					Clr: $
				};
				K.QJ(C)
			} else if (x == 800) {
				C.B.pop()
			} else if (E.Folder != 0) {
				K.add.lsct = (E.Folder & 16) != 0 ? LayerSectionType.closed : LayerSectionType.open;
				K.blendModeKey = "pass";
				C.B.pop();
				C.B.push(C.En());
				p(z, P, C, E.FirstChildIndex, L + 1);
				C.B.push(K)
			} else if (x == 0 || x == 1 || x == 2 || x == 3) {
				var bC = B(z, P, E.RenderMipmap, !0);
				if (bC) {
					K.rect = bC[0];
					K.buffer = bC[1];
					c(K.rect, E, "Render", "");
					K.ww()
				}
				if (E.TextLayerType != null) {
					var em = "TextLayerString",
						dY = "TextLayerAttributes",
						f7 = [E[em]],
						bM = [E[dY]];
					if (E[em + "Array"]) {
						l = E[em + "Array"];
						d = 0;
						while (d < l.length) {
							var jq = r();
							f7.push(l.slice(d, d + jq));
							d += jq
						}
						l = E[dY + "Array"];
						d = 0;
						while (d < l.length) {
							var jq = r();
							bM.push(l.slice(d, d + jq));
							d += jq
						}
					}
					var iP = K;
					C.B.pop();
					for (var jp = 0; jp < f7.length; jp++) {
						var K = iP.clone();
						C.B.push(K);
						var hf = g(bM[jp]),
							gu = hf.runs,
							ip = hf.fnts,
							aQ = hf.bplg,
							iL = hf.bbox,
							jx = iL[2] - iL[0],
							ep = iL[3] - iL[1],
							gz = aQ[2] - aQ[0],
							ed = aQ[3] - aQ[1],
							bo = new Matrix2D;
						bo.translate(-jx / 2, -ep / 2);
						bo.rotate(Math.atan2(-ed, gz));
						bo.translate(jx / 2, ep / 2);
						var d0 = iL[0] + E.OffsetX,
							c0 = iL[1] + E.OffsetY;
						bo.translate(d0, c0);
						K.add.lnsr = "rend";
						K.add.TySh = dt.Iu(0, 0);
						K.add.TySh.xZ = new Rect(0, 0, 500, 500);
						K.add.TySh.D = bo;
						var cv = K.add.TySh.zC,
							iH = X.Kw(f7[jp]);
						K.tH(iH);
						dt.sT(cv, 0, iH);
						dt.AO(cv, 1);
						dt.mt(cv, [0, 0, jx, ep]);
						for (var A = 0; A < gu.length; A++) {
							var bS = gu[A],
								gg = bS[0],
								bG = gg + bS[1],
								jj = bS[2],
								ay = dt.Au(cv, gg, bG),
								cH = C.m7 / 72 * hf.size / 100;
							if ((jj & 512) != 0) cH *= bS[6] / 100;
							ay.xg.FontSize = Math.round(cH);
							var $ = (jj & 256) != 0 ? bS.slice(3) : hf.colr;
							ay.xg.FillColor = {
								Type: 1,
								Values: [1, $[0] / 65535, $[1] / 65535, $[2] / 65535]
							};
							var e6 = bS[7] == "" ? hf.font : bS[7];
							if (ip) {
								if (ip[A]) e6 = ip[A][1];
								else
									for (var jC = 0; jC < ip.length; jC++)
										if (ip[jC][0] == e6) e6 = ip[jC][1]
							}
							dt.Wr(ay, e6);
							dt.rW(cv, gg, bG, ay)
						}
						if (K.rect.O() == 0) C.ya = !0;
						else {
							K.rect = new Rect(d0, c0, jx, ep);
							K.buffer = PixelUtil.allocBytes(K.rect.O() * 4);
							PixelUtil.blitRgbaRect(iP.buffer, iP.rect, K.buffer, K.rect)
						}
					}
				}
			}
			var fi = z.VectorObjectList;
			if (E.VectorNormalType != null && fi && R(fi, "LayerId", h)) {
				var et = R(fi, "LayerId", h).VectorData,
					aD = H(z, et),
					c7 = k(P, aD);
				if (c7) {
					var ga = null;
					if (K.add.TySh) {
						var ga = K.clone();
						C.B.push(ga);
						delete K.add.TySh
					}
					v(K, E, c7[0]);
					if (K.IQ()) {
						K.layerFlags |= 24;
						var cY = C.V4();
						cY.tH(K.getName());
						cY.opacity = K.opacity;
						C.B.push(cY);
						v(cY, E, c7[0]);
						i(cY, c7);
						cY.QJ(C)
					} else {
						i(K, c7, ga != null)
					}
					K.QJ(C);
					if (ga) {
						ga.add.TySh.D.concat(new Matrix2D(1, 0, 0, 1, K.rect.x + K.rect.m / 2, K.rect.y + K.rect.n / 2))
					}
				}
			}
			if (_) K.add.lmfx = gX;
			if (h == S.CurrentLayer) C.g = [C.B.indexOf(K)];
			h = E.NextIndex
		}
	}

	function c(z, P, C, h) {
		z.x += P[C + "OffscrOffsetX"] + P[h + "OffsetX"];
		z.y += P[C + "OffscrOffsetY"] + P[h + "OffsetY"]
	}

	function v(z, P, C) {
		z.add.vmsk = new LayerRecord.VectorMask;
		PixelUtil.vec.transformCoords(C.C, new Matrix2D(1, 0, 0, 1, P.OffsetX, P.OffsetY), C.C);
		z.add.vmsk.i = PixelUtil.vec.QO(C);
		z.Ba()
	}

	function i(z, P, C) {
		var h = P[1][0],
			L = P[2][0] * P[3][0];
		z.layerFlags |= 16;
		var U = z.add.vstk = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default));
		U.strokeEnabled.v = !0;
		U.fillEnabled.v = C == !0;
		z.add.SoCo = {
			classID: "null",
			Clr: {
				t: "Objc",
				v: PixelUtil.color.rgbColorDescriptor({
					o: 255,
					J: 255,
					k: 255
				})
			}
		};
		U.strokeStyleContent.v.Clr.v = PixelUtil.color.rgbColorDescriptor({
			o: h[0],
			J: h[1],
			k: h[2]
		});
		U.strokeStyleLineWidth.v.val = L * 2;
		U.strokeStyleLineCapType.v.strokeStyleLineCapType = "strokeStyleRoundCap"
	}
	return J
}();


