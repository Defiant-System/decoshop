
function PsdDocument(l) {
	this.o8 = "psd";
	this.vs = !1;
	this.name = l;
	this.RU = -1;
	this.ZV = !1;
	this.pb = null;
	this.$a = null;
	this.Ta = null;
	this.yi = null;
	this.m = 0;
	this.n = 0;
	this.buffer = null;
	this.B = [];
	this.yQ = {};
	this.add = {};
	this.oq = 4;
	this.xe = null;
	this.m7 = 72;
	this.CD = {};
	this.g = [];
	this.qz = [];
	this.HH = !1;
	this.Vp = [];
	this.Ci = [];
	this.t_ = [PsdDocument.HE("Work Path")];
	this.yK = [];
	this.jP = null;
	this.MV = {
		classID: "CompList",
		list: {
			t: "VlLs",
			v: []
		}
	};
	this.tJ = [];
	this.rw = [];
	this.root = null;
	this.tP = null;
	this.ya = !1;
	this.a00 = !1;
	this.a8Q = !1;
	this.BE = !1;
	this.Of = !1;
	this.uK = !1;
	this.bV = !1;
	this.i_ = !1;
	this.Va = !1;
	this.DF = !1;
	this.Gg = null;
	this.Ch = null;
	this.P = null;
	this.vj = [];
	this.FB = [];
	this.I = {
		He: {},
		jf: [],
		g2: [],
		Qg: [],
		Bt: null,
		Y1: null,
		Cj: null,
		Ru: null,
		nO: null,
		iT: [],
		P4: [],
		Iq: null
	};
	// Undo/redo: history is a linear list of states; historyIndex = current index, savedHistoryIndex = last-saved index
	this.history = [new HistoryState([1, 0], null)]; // initial state ("Open" / doc start)
	this.historyIndex = 0;  // current history index (undo = go back, redo = go forward)
	this.savedHistoryIndex = 0;  // history index at last save (used to detect unsaved changes)
	this.T_ = 0;
	this.u = new DocumentViewState(this);
	this.Cg = null;
	this.xE = null
}

PsdDocument.T2 = function() {
	var l = 8,
		d = [0, 0, 0, .145, .051, .051, .263, .071, .067, .416, .051, .055, .573, .102, .11, .71, .122, .141, .851, .122, .149, .929, .122, .141, .075, .149, .078, .153, .153, .078, .275, .153, .055, .424, .157, .071, .569, .153, .114, .706, .165, .141, .855, .161, .153, .933, .196, .141, .118, .282, .133, .18, .29, .129, .286, .29, .122, .427, .294, .114, .573, .298, .129, .71, .294, .149, .855, .298, .153, .941, .306, .133, .035, .431, .224, .157, .427, .212, .294, .431, .204, .427, .435, .18, .569, .431, .165, .71, .435, .161, .851, .431, .153, .953, .435, .133, .012, .576, .278, .145, .569, .271, .29, .576, .259, .427, .576, .239, .569, .576, .212, .706, .573, .184, .855, .576, .157, .969, .569, .118, .114, .698, .294, .165, .702, .29, .29, .714, .286, .424, .714, .271, .573, .718, .243, .71, .714, .204, .855, .714, .153, .988, .714, .078, .314, .722, .282, .329, .722, .278, .392, .737, .275, .478, .757, .259, .584, .788, .239, .714, .827, .2, .859, .859, .125, .996, .855, 0, .412, .741, .271, .427, .745, .267, .471, .753, .259, .533, .773, .251, .624, .8, .227, .725, .835, .2, .843, .875, .137, .973, .925, .075, .055, .059, .137, .141, .059, .141, .271, .059, .149, .424, .043, .149, .576, .098, .157, .714, .122, .153, .859, .122, .153, .929, .114, .176, .02, .145, .141, .137, .137, .137, .282, .141, .137, .431, .141, .145, .576, .145, .141, .714, .149, .145, .859, .141, .153, .933, .192, .184, .012, .286, .145, .145, .286, .141, .286, .286, .141, .431, .29, .141, .576, .286, .141, .714, .286, .149, .855, .286, .153, .941, .302, .176, .027, .427, .22, .153, .431, .216, .29, .427, .2, .427, .431, .18, .576, .431, .165, .714, .427, .161, .859, .431, .153, .949, .427, .165, .039, .576, .278, .153, .573, .271, .282, .573, .259, .431, .576, .239, .569, .573, .212, .71, .573, .184, .859, .576, .153, .969, .569, .165, .114, .698, .294, .165, .702, .29, .286, .718, .286, .424, .714, .267, .576, .722, .243, .714, .714, .204, .855, .714, .153, .988, .71, .137, .314, .722, .282, .341, .725, .278, .396, .737, .275, .486, .761, .259, .588, .788, .239, .714, .831, .2, .859, .855, .145, .996, .859, .129, .416, .741, .271, .439, .749, .271, .482, .757, .263, .537, .776, .251, .631, .804, .231, .725, .831, .196, .851, .878, .133, .969, .925, .18, .075, .075, .278, .145, .063, .29, .282, .067, .286, .424, .082, .294, .573, .102, .298, .714, .118, .298, .855, .11, .298, .933, .11, .306, .063, .141, .278, .137, .141, .286, .286, .137, .282, .427, .145, .286, .573, .141, .286, .714, .141, .29, .863, .149, .294, .937, .188, .302, 0, .29, .29, .141, .286, .286, .29, .286, .286, .427, .29, .29, .573, .29, .29, .718, .29, .286, .859, .282, .286, .941, .302, .302, 0, .427, .286, .145, .431, .29, .286, .427, .29, .424, .427, .286, .573, .427, .29, .718, .427, .286, .859, .427, .282, .953, .431, .302, 0, .573, .282, .145, .576, .282, .286, .573, .282, .427, .573, .282, .576, .573, .282, .71, .569, .282, .859, .573, .278, .969, .569, .306, .114, .698, .294, .176, .702, .29, .286, .718, .286, .427, .718, .282, .576, .714, .278, .718, .722, .294, .855, .71, .278, .988, .71, .286, .329, .725, .282, .349, .729, .278, .4, .737, .278, .486, .761, .29, .592, .792, .298, .714, .835, .306, .859, .859, .278, 1, .855, .286, .431, .745, .267, .451, .749, .267, .482, .757, .259, .549, .776, .247, .639, .804, .224, .733, .839, .224, .855, .882, .275, .973, .929, .306, .141, .133, .392, .165, .133, .408, .29, .141, .42, .416, .141, .424, .561, .133, .431, .71, .122, .439, .859, .082, .435, .929, .098, .431, .137, .184, .408, .176, .169, .424, .282, .157, .431, .424, .145, .424, .573, .141, .427, .714, .145, .427, .859, .137, .427, .929, .173, .427, 0, .286, .427, .141, .29, .431, .29, .29, .431, .427, .29, .427, .576, .286, .427, .718, .29, .431, .859, .286, .427, .941, .298, .431, 0, .427, .424, .145, .427, .427, .286, .427, .427, .427, .427, .427, .569, .427, .424, .718, .431, .431, .863, .427, .427, .949, .424, .431, 0, .573, .427, .125, .573, .427, .282, .573, .427, .431, .576, .431, .569, .573, .427, .714, .573, .424, .851, .569, .424, .965, .569, .431, .082, .706, .427, .133, .71, .427, .282, .71, .424, .424, .714, .424, .576, .718, .427, .714, .714, .424, .863, .718, .427, .984, .71, .427, .322, .729, .404, .345, .733, .408, .404, .745, .412, .478, .765, .42, .588, .796, .424, .718, .843, .431, .863, .863, .435, 1, .863, .435, .439, .749, .341, .455, .753, .341, .494, .765, .345, .557, .784, .349, .643, .812, .373, .733, .843, .388, .851, .89, .424, .976, .941, .451, .169, .184, .51, .176, .176, .522, .298, .176, .537, .416, .169, .541, .553, .153, .557, .698, .118, .553, .847, .094, .557, .929, .133, .565, .161, .212, .529, .18, .184, .541, .294, .184, .553, .427, .173, .561, .565, .153, .561, .718, .157, .565, .851, .157, .565, .933, .196, .565, .075, .29, .561, .141, .286, .573, .286, .29, .576, .424, .286, .573, .576, .29, .576, .718, .29, .576, .859, .286, .573, .933, .298, .569, 0, .427, .573, .141, .427, .573, .286, .427, .573, .427, .427, .569, .573, .427, .573, .718, .431, .576, .859, .427, .573, .945, .424, .569, 0, .573, .573, .149, .576, .576, .286, .573, .576, .427, .573, .573, .573, .573, .573, .718, .576, .576, .859, .573, .573, .961, .565, .573, 0, .714, .573, .133, .714, .573, .278, .71, .573, .427, .714, .576, .573, .718, .573, .718, .714, .573, .859, .714, .576, .98, .71, .576, .325, .741, .537, .345, .745, .537, .404, .757, .545, .482, .78, .553, .588, .808, .565, .718, .851, .573, .859, .859, .569, 1, .863, .573, .439, .761, .49, .451, .761, .486, .49, .776, .498, .557, .796, .51, .635, .82, .518, .737, .855, .537, .863, .906, .561, .976, .953, .588, .165, .231, .588, .227, .231, .592, .31, .235, .592, .408, .227, .588, .525, .227, .588, .635, .227, .584, .761, .239, .588, .878, .243, .588, .173, .255, .608, .216, .255, .604, .314, .255, .604, .408, .255, .6, .525, .255, .6, .643, .255, .596, .761, .267, .6, .882, .267, .596, .141, .314, .639, .208, .318, .639, .306, .318, .639, .42, .314, .631, .541, .318, .631, .659, .318, .624, .784, .325, .62, .91, .337, .624, .012, .431, .718, .149, .431, .714, .294, .431, .71, .431, .431, .702, .573, .427, .69, .71, .431, .678, .835, .435, .671, .945, .435, .667, 0, .573, .714, .145, .573, .718, .29, .576, .718, .427, .573, .714, .576, .573, .714, .71, .569, .71, .859, .573, .714, .957, .569, .71, 0, .71, .71, .129, .714, .714, .278, .714, .71, .427, .714, .714, .576, .718, .718, .714, .714, .714, .859, .718, .714, .973, .706, .714, .322, .753, .667, .337, .757, .667, .4, .769, .671, .482, .792, .686, .588, .824, .698, .714, .867, .718, .859, .863, .714, .996, .855, .714, .435, .773, .62, .459, .78, .627, .49, .788, .631, .557, .808, .643, .647, .835, .659, .749, .875, .675, .867, .918, .702, .988, .969, .725, .212, .29, .624, .243, .29, .62, .318, .29, .62, .396, .286, .62, .486, .286, .616, .58, .282, .608, .686, .282, .608, .788, .29, .608, .216, .306, .631, .251, .306, .631, .314, .306, .627, .392, .306, .627, .49, .302, .624, .58, .302, .62, .686, .302, .616, .796, .314, .616, .224, .345, .655, .255, .345, .659, .318, .345, .651, .396, .345, .651, .494, .345, .643, .592, .345, .639, .702, .353, .635, .816, .373, .643, .212, .424, .71, .247, .424, .706, .318, .424, .702, .412, .42, .694, .525, .431, .694, .635, .447, .698, .749, .459, .69, .859, .467, .69, .133, .569, .816, .2, .565, .812, .31, .569, .808, .443, .569, .792, .576, .569, .78, .694, .569, .765, .812, .58, .761, .914, .584, .753, 0, .714, .855, .133, .714, .859, .286, .714, .863, .431, .714, .859, .573, .714, .859, .718, .714, .863, .859, .714, .839, .969, .706, .82, .302, .765, .796, .329, .769, .796, .392, .784, .808, .471, .804, .82, .588, .839, .847, .718, .859, .859, .859, .859, .859, .988, .855, .855, .439, .788, .749, .451, .792, .749, .498, .804, .757, .553, .82, .769, .647, .851, .784, .753, .886, .812, .871, .933, .839, .996, .984, .863, .224, .325, .643, .251, .325, .643, .306, .322, .639, .38, .322, .635, .459, .318, .631, .545, .318, .631, .631, .314, .624, .725, .322, .624, .235, .333, .647, .263, .337, .651, .31, .333, .647, .38, .333, .643, .463, .333, .639, .545, .333, .635, .631, .325, .627, .737, .337, .627, .251, .365, .671, .275, .365, .667, .318, .365, .667, .384, .361, .659, .467, .361, .655, .549, .361, .651, .651, .376, .651, .757, .4, .659, .255, .427, .71, .275, .42, .702, .329, .42, .702, .4, .42, .694, .486, .431, .698, .58, .447, .698, .686, .467, .702, .8, .494, .71, .278, .529, .78, .306, .533, .78, .373, .541, .78, .455, .545, .776, .553, .557, .776, .643, .569, .773, .749, .592, .776, .843, .604, .773, .275, .694, .898, .302, .694, .894, .384, .69, .886, .49, .698, .878, .604, .706, .871, .718, .706, .855, .812, .714, .847, .898, .722, .839, .31, .784, .925, .333, .788, .925, .388, .8, .941, .471, .824, .961, .592, .855, .973, .725, .851, .949, .859, .851, .929, .957, .855, .914, .435, .8, .867, .443, .804, .867, .494, .816, .875, .557, .835, .886, .651, .867, .91, .757, .906, .933, .878, .953, .969, 1, 1, 1];
	d = iZ.Rs(l, d);
	return [l, d]
}();

PsdDocument.prototype.Dm = function(l) {
	if (l) {
		if (l.length == 30240) {
			this.Dm(null);
			return
		}
		this.yQ.r1039 = l;
		var d = ICC.R(l.buffer),
			V = null,
			Q = 17,
			y, e;
		if (d == null) {
			this.Dm(null);
			return
		}
		var G = d.header.spaceIn.toLowerCase(),
			b = JSON.stringify(d.tags.desc).toLowerCase();
		try {
			V = ICC.U.profileName(d)
		} catch (dk) {}
		if (G != "rgb " || V == null || b.indexOf("srgb") != -1) {
			this.Dm(null);
			return
		}
		try {
			var t = ICC.U.sampleLUT(d, Q)
		} catch (dk) {
			this.Dm(null);
			return
		}
		var I = t.slice(0),
			M = PixelUtil.allocBytes(4),
			R = PsdDocument.T2[0],
			J = PsdDocument.T2[1];
		for (var A = 0; A < t.length; A += 3) {
			M[0] = t[A] * 255;
			M[1] = t[A + 1] * 255;
			M[2] = t[A + 2] * 255;
			ICC.U.applyLUT(J, R, M, M);
			I[A] = M[0] / 255;
			I[A + 1] = M[1] / 255;
			I[A + 2] = M[2] / 255
		}
		if (WebGLContext.webglAvailable) {
			y = new WebGLContext.RgbaTexture(Q, Q * Q);
			y.set(ICC.U.lutToRGBA8(t, Q));
			e = new WebGLContext.RgbaTexture(Q, Q * Q);
			e.set(ICC.U.lutToRGBA8(I, Q))
		}
		this.Cg = [l, d, Q, t, y, I, e]
	} else {
		delete this.yQ.r1039;
		this.Cg = null
	}
};

PsdDocument.prototype.HB = function() {
	return this.Cg
};

PsdDocument.prototype.Pi = function() {
	if (this.Cg) return this.Cg;
	if (this.add.fcmy == 1) {
		if (this.xE == null) {
			var l = PsdDocument.T2[0],
				d = PsdDocument.T2[1],
				G;
			if (WebGLContext.webglAvailable) {
				G = new WebGLContext.RgbaTexture(l, l * l);
				G.set(ICC.U.lutToRGBA8(d, l))
			}
			this.xE = [null, null, l, null, null, d, G]
		}
		return this.xE
	}
};

PsdDocument.prototype.adQ = function() {
	var l = this;
	if (l.u.MX.join("") != "111") {
		l.u.MX = [1, 1, 1];
		l.uK = !0
	}
	for (var A = 0; A < l.B.length; A++) {
		var d = l.B[A],
			G = d.add.vmsk;
		if (d.aW()) {
			var b = d.vZ(l);
			if (b && b.z && b.z.jv) {
				b.z.jv = !1;
				l.uK = !0
			}
		}
		var V = d.c3();
		if (V && V.jv) {
			V.jv = !1;
			l.uK = !0
		}
		if (G) {
			if (G.g.length != 0) G.g = [];
			if (G.OE.length != 0) G.OE = []
		}
	}
};

PsdDocument.prototype.P9 = function() {
	var l = this;
	return l.P != null || l.LW()[1].length != 0 || l.g.length > 1
};

PsdDocument.prototype.Ww = function() {
	var l = this.qz,
		d = [];
	for (var A = 0; A < l.length; A++) d[A] = -1;
	var G = this.root.children;
	for (var A = 0; A < G.length; A++) {
		var b = G[A],
			V = b.j.add.artb;
		if (V == null) continue;
		var Q = V.guideIndeces;
		Q = Q ? Q.v : [];
		for (var t = 0; t < Q.length; t++) d[Q[t].v] = b.index
	}
	return [JSON.parse(JSON.stringify(l)), d]
};

PsdDocument.prototype.Y$ = function(l) {
	this.qz = JSON.parse(JSON.stringify(l[0]));
	var d = l[1],
		G = this.root.children;
	for (var A = 0; A < G.length; A++) {
		var b = G[A],
			V = b.j.add.artb;
		if (V == null) continue;
		V.guideIndeces = {
			t: "VlLs",
			v: []
		}
	}
	for (var A = 0; A < d.length; A++)
		if (d[A] != -1) this.B[d[A]].add.artb.guideIndeces.v.push({
			t: "long",
			v: A
		})
};

PsdDocument.prototype.ah1 = function(l) {
	var d = this;
	if (l[0]) d.add.lnk2 = l[0];
	else delete d.add.lnk2;
	if (l[1]) d.add.FEid = l[1];
	else delete d.add.FEid;
	if (l[2]) d.add.Patt = l[2];
	else delete d.add.Patt
};

PsdDocument.prototype.apc = function(l) {
	var d = this,
		G = [],
		b = [],
		V = [],
		r = null,
		T = null,
		j = null;
	for (var A = 0; A < l.length; A++) {
		var Q = l[A];
		if (Q.add.SoLd) {
			G.push(Q.add.SoLd.Idnt.v);
			b.push(Q.add.SoLd.placed.v)
		}
		if (Q.add.PtFl) V.push(Q.add.PtFl.Ptrn.v.Idnt.v);
		if (Q.add.lmfx) {
			for (var t = 0; t < LayerStyleConstants.effectMultiKeys.length; t++) {
				var I = Q.add.lmfx[LayerStyleConstants.effectMultiKeys[t]].v;
				for (var y = 0; y < I.length; y++)
					if (I[y].v.Ptrn) {
						var e = I[y].v;
						if (e.classID == "FrFX" && e.PntT.v.FrFl != "Ptrn") continue;
						V.push(e.Ptrn.v.Idnt.v)
					}
			}
		}
		var M = Q.add.vstk;
		if (M && M.strokeStyleContent.v.classID == "patternLayer") {
			V.push(M.strokeStyleContent.v.Ptrn.v.Idnt.v)
		}
	}
	var R = d.add.lnk2,
		J = d.add.FEid,
		n = d.add.Patt;
	if (R) {
		r = [];
		for (var A = 0; A < R.length; A++)
			if (G.indexOf(R[A].AN) != -1) r.push(R[A]);
		if (r.length == 0) r = null
	}
	if (J) {
		T = [];
		for (var A = 0; A < J.length; A++)
			if (b.indexOf(J[A].id) != -1) T.push(J[A]);
		if (T.length == 0) T = null
	}
	if (n) {
		j = [];
		for (var A = 0; A < n.length; A++)
			if (V.indexOf(n[A].id) != -1) j.push(n[A]);
		if (j.length == 0) j = null
	}
	return [r, T, j]
};

PsdDocument.prototype.jq = function(l) {
	var d = this,
		G = d.root.O4(l == null ? d.g[0] : l),
		b = !1;
	while (G.parent != null) {
		b = b || G.j.Ka(31);
		G = G.parent
	}
	return b
};

PsdDocument.prototype.kg = function() {
	var l = this.vj,
		d = this.vj.length;
	if (d != 0 && l[d - 1].name == "Quick Mask") return l[d - 1]
};

PsdDocument.prototype.pT = function() {
	return this.o8 == "sketch" || this.o8 == "xd";
};

PsdDocument.prototype._8 = function(l) {
	var d = this.add.artd;
	if (l != 0) this.add.artd = {
		classID: "null",
		Cnt: {
			t: "long",
			v: l
		},
		autoExpandOffset: {
			t: "Objc",
			v: {
				classID: "Pnt",
				Hrzn: {
					t: "doub",
					v: 0
				},
				Vrtc: {
					t: "doub",
					v: 0
				}
			}
		},
		origin: {
			t: "Objc",
			v: {
				classID: "Pnt",
				Hrzn: {
					t: "doub",
					v: 0
				},
				Vrtc: {
					t: "doub",
					v: 0
				}
			}
		},
		autoExpandEnabled: {
			t: "bool",
			v: !0
		},
		autoNestEnabled: {
			t: "bool",
			v: !0
		},
		autoPositionEnabled: {
			t: "bool",
			v: !0
		}
	};
	else delete this.add.artd
};

PsdDocument.prototype.p_ = function(l) {
	if (this.add.FEid == null) this.add.FEid = [];
	if (this.add.FEid.indexOf(l) == -1) this.add.FEid.push(l)
};

PsdDocument.prototype.mP = function(l) {
	var d = this.add.FEid.indexOf(l);
	this.add.FEid.splice(d, 1);
	if (this.add.FEid.length == 0) delete this.add.FEid
};

PsdDocument.prototype.U = function(l) {
	if (l == null) l = new Rect(0, 0, this.m, this.n);
	if (this.Gg == null) this.Gg = l;
	else this.Gg = this.Gg.Cw(l)
};

PsdDocument.prototype.ajH = function(l) {
	return this.Gg != null
};

PsdDocument.prototype.Hz = function(l) {
	var d = this.B[l],
		G = this.root.O4(l);
	if (G == null) return !1;
	if (d.IQ() || G.parent.children.indexOf(G) == 0) return !1;
	return !0
};

PsdDocument.aag = function(l) {
	if (l.add.lnk2)
		for (var A = 0; A < l.add.lnk2.length; A++) {
			var d = l.add.lnk2[A].AN;
			l.add.lnk2[A].AN = PsdDocument.Xb() + d.slice(8);
			for (var G = 0; G < l.B.length; G++) {
				var b = l.B[G].add.SoLd;
				if (b && b.Idnt.v == d) b.Idnt.v = l.add.lnk2[A].AN
			}
		}
};

PsdDocument.prototype.LA = function(l, d, G) {
	l.sort(function(R, J) {
		return R - J
	});
	var top = l[l.length - 1],
		b = this.B.slice(0),
		V = this.g.slice(0),
		Q = [],
		t = [];
	for (var A = 0; A < this.B.length; A++) {
		if (l.indexOf(A) != -1) t.push(this.B[A]);
		else Q.push(this.B[A])
	}
	this.g8(t);
	this.g = [];
	var I = this.root.Pa(this, !0);
	if (d) I = I.wD(d);
	if (G) I = I.Cw(G);
	if (I.W6()) I = new Rect(0, 0, 100, 100);
	var y = new Rect(-I.x, -I.y, this.m, this.n),
		e = new Uint8Array(FormatHandler.jA("PSD").bi(this, 0, 0, [!0, !1]));
	this.g8(b);
	this.g = V;
	var M = new PsdDocument(this.B[top].getName());
	FormatHandler.jA("PSD").gR(e.buffer, M);
	delete M.add.artd;
	M.Vp = [];
	M.g8(M.B);
	M.Y$([
		[],
		[]
	]);
	PsdDocument.aag(M);
	f.Gt.UP(M, I);
	M.U();
	M.Po();
	M.LT();
	return [M, I, Q, top]
};

PsdDocument.prototype.ayT = function(l, d, G) {
	var b = this.LA(l),
		V = b[0],
		Q = b[1],
		t = b[2],
		top = b[3],
		I;
	if (G == "jpg") I = new Uint8Array(FormatHandler.jA("JPG").bi([
		[V.LT().buffer]
	], V.m, V.n, [80]));
	else I = new Uint8Array(FormatHandler.jA("PSD").bi(V, null, null, [!0, !1]));
	if (d) t = this.B.slice(0);
	var y = this.rM(I, V.name, Q.x, Q.y);
	if (top == this.B.length - 1) t.push(y);
	else t.splice(d ? top + 1 : top - l.length + 1, 0, y);
	this.g8(t);
	this.g = [t.indexOf(y)]
};

PsdDocument.Xb = function(l) {
	if (l == null) l = "";
	var d = "";
	while (d == "" || d == l) {
		d = "";
		for (var A = 0; A < 8; A++) d += Math.floor(Math.random() * 16).toString(16)
	}
	return d
};

PsdDocument.prototype.wJ = function(l) {
	if (l == null) return;
	if (this.add.Patt == null) this.add.Patt = [];
	var d = this.add.Patt;
	for (var A = 0; A < d.length; A++)
		if (d[A].id == l.id) return;
	d.push(l)
};

PsdDocument.prototype.rM = function(l, d, G, b, V, Q, t) {
	if (this.add.lnk2 == null) this.add.lnk2 = [];
	var I = null,
		n = !1;
	for (var A = 0; A < this.add.lnk2.length; A++)
		if (PixelUtil.rgbaBuffersEqual(l, this.add.lnk2[A].raw)) {
			I = this.add.lnk2[A].AN;
			break
		}
	if (I == null) {
		var y = FormatHandler.aJ(l.buffer);
		I = PsdDocument.Xb() + "-d71c-11e5-b1ae-a548a96e5f9f";
		var e = new LayerRecord.aA;
		e.AN = I;
		e.Rr = y == "psd" ? "8BIM" : "    ";
		e.bf = d + "." + y;
		e.hA = y == "psd" ? "8BPB" : "    ";
		e.open = 0;
		e.raw = l;
		e.type = "liFD";
		e.X7 = 2;
		this.add.lnk2.push(e)
	}
	var M = this.a7(I, null, null, null, Q, t),
		R = PsdDocument.Xb() + "-d71c-11e5-b1ae-a548a96e5f9f",
		J = this.V4();
	J.tH(d);
	if (M != null) {
		var r = G == null,
			T = 0,
			j = 0;
		if (G == null) G = b = 0;
		var g = this.m,
			Y = this.n;
		if (V) {
			T = V.x;
			j = V.y;
			g = V.m;
			Y = V.n
		}
		var k = J.rect = M.hF[1].clone();
		k.offset(T + G, j + b);
		var F = Math.max(k.m / g, k.n / Y),
			n = V != null && F > 1.0001;
		if (n) {
			k.m = Math.round(k.m / F);
			k.n = Math.round(k.n / F)
		} else if (V != null && FormatHandler.aJ(l.buffer) == "pdf" && this.m7 != 144) {
			var F = 144 / this.m7;
			k.m = Math.round(k.m / F);
			k.n = Math.round(k.n / F);
			n = !0
		}
		if (n || r) {
			k.x = Math.round(T + (g - k.m) / 2);
			k.y = Math.round(j + (Y - k.n) / 2)
		}
		J.buffer = PixelUtil.allocBytes(k.O() * 4);
		if (!n) PixelUtil.copyByteBuffer(M.hF[0], J.buffer)
	}
	J.add.SoLd = {
		classID: "null",
		Idnt: {
			t: "TEXT",
			v: I
		},
		Impr: {
			t: "Objc",
			v: {
				__name: "None",
				classID: "none"
			}
		},
		placed: {
			t: "TEXT",
			v: R
		},
		PgNm: {
			t: "long",
			v: 1
		},
		totalPages: {
			t: "long",
			v: 1
		},
		frameStep: {
			t: "Objc",
			v: {
				classID: "null",
				numerator: {
					t: "long",
					v: 0
				},
				denominator: {
					t: "long",
					v: 600
				}
			}
		},
		duration: {
			t: "Objc",
			v: {
				classID: "null",
				numerator: {
					t: "long",
					v: 0
				},
				denominator: {
					t: "long",
					v: 600
				}
			}
		},
		frameCount: {
			t: "long",
			v: 1
		},
		Annt: {
			t: "long",
			v: 16
		},
		Type: {
			t: "long",
			v: 2
		},
		Trnf: null,
		nonAffineTransform: null,
		warp: {
			t: "Objc",
			v: PixelUtil.textWarp.Q(M ? M.hF[1] : J.rect)
		},
		Sz: {
			t: "Objc",
			v: {
				classID: "Pnt",
				Wdth: {
					t: "doub",
					v: J.rect.m
				},
				Hght: {
					t: "doub",
					v: J.rect.n
				}
			}
		},
		Rslt: {
			t: "UntF",
			v: {
				type: "#Rsl",
				val: M ? M.m7 : 72
			}
		}
	};
	var D = PixelUtil.vec.simplifyPath(J.rect).C;
	J.add.SoLd.Trnf = f.NH.gx(D);
	J.add.SoLd.nonAffineTransform = f.NH.gx(D);
	if (n) J.kX(this, !1);
	return J
};

PsdDocument.prototype.LT = function(l) {
	if (l != null) {
		this.U();
		this.Po(l);
		var d = this.buffer;
		if (WebGLContext.webglAvailable) this.tP.get(d);
		else d = d.slice(0);
		this.U();
		this.Po();
		return d
	}
	if (this.Gg) {
		this.Po();
		this.Gg = null
	}
	if (WebGLContext.webglAvailable && this.Ch) {
		this.tP.get(this.buffer);
		this.Ch = null;
		this.bV = !0
	}
	return this.buffer
};

PsdDocument.prototype.a2U = function() {
	for (var A = 0; A < this.B.length; A++) this.B[A].a79();
	this.U()
};

PsdDocument.prototype.a3Y = function() {
	for (var A = 0; A < this.B.length; A++)
		if (this.B[A].add.lmfx) this.B[A].hD.q6 = !0
};

PsdDocument.prototype.NE = function() {
	var l = this.yQ.r1044;
	if (l == null) {
		l = this.yQ.r1044 = new Uint8Array(4);
		var d = 0;
		for (var A = 0; A < this.B.length; A++) d = Math.max(d, this.B[A].add.lyid);
		X.m1(l, 0, d)
	}
	var G = X.q(l, 0);
	X.m1(l, 0, G + 1);
	return G + 1
};

PsdDocument.prototype.T8 = function(l, d, G) {
	if (l == null) l = !0;
	var b = this;
	if (b.FB.length != 0) return !0;
	if (b.g.length != 1) {
		if (l) alert(b.g.length == 0 ? "Select a layer first." : "More than one layer selected.");
		return !1
	}
	return this.fU(l, d, G)
};

PsdDocument.prototype.fU = function(l, d, G) {
	if (l == null) l = !0;
	if (d == null) d = !1;
	var b = this;
	if (b.FB.length != 0) return !0;
	for (var A = 0; A < b.g.length; A++) {
		var V = b.B[b.g[A]],
			Q = d || V.ht <= 0;
		if (V.add.lsct != null && V.add.lsct != LayerSectionType.none && V.ht != 1) {
			if (l) alert("Layer is not editable.");
			return !1
		}
		if (Q && !V.Eo()) {
			if (l) alert("Layer is not editable.");
			return !1
		}
		if (Q && V.add.TySh) {
			return this.ag1(l, [15, 7, 3], G)
		}
		if (Q && V.add.SoLd) {
			return this.ag1(l, [15, 7, 4], G)
		}
		if (V.Ka(1) || b.jq(b.g[A])) {
			if (l) alert("This layer is Locked.");
			return !1
		}
	}
	return !0
};

PsdDocument.prototype.ag1 = function(l, d, G) {
	if (l && typeof l == "object") {
		var b = new Action(ActionTypes.E.L);
		b.data = {
			a: ActionTypes.$.SN,
			GU: "confirm"
		};
		b.data.Z = languageManager.get(d) + ". Rasterize?";
		var V = l;
		b.data.Fk = function() {
			var Q = new Action(ActionTypes.E.g5, !0);
			Q.data = {
				kT: "rasterizeLayer",
				a0: {
					classID: "rasterizeLayer",
					null: PsdDescriptorHelper.Fw("Lyr", !0)
				}
			};
			V.dispatch(Q)
		};
		l.dispatch(b);
		return !1
	}
	if (l) alert(languageManager.get(d));
	return !1
};

PsdDocument.prototype.auD = function(l) {
	var d = this.root.O4(l);
	if (d.parent) return d.j.zD() && this.auD(d.parent.index);
	else return d.j.zD()
};

PsdDocument.prototype.bZ = function(l) {
	var d = this;
	if (l) {
		var G = 0;
		for (var A = 0; A < d.g.length; A++)
			if (d.B[d.g[A]].add.artb) G++;
		if (G > 1) return -1
	}
	if (d.add.artd && d.g.length != 0) {
		var b = d.root.O4(d.g[0]);
		while (b.parent.parent) b = b.parent;
		if (b.j.add.artb) return b.index
	}
	return -1
};

PsdDocument.prototype.acG = function() {
	var l = this.B[this.g[0]];
	if (l.ht <= 0 && !l.rect.N1(this.P.rect)) {
		alert("Selected area is empty.");
		return !1
	}
	if (this.g.length == 1 && this.P) {
		var d = PixelUtil.allocBytes(this.P.channel.length);
		PixelUtil.copyAlphaFromRgba(l.buffer, l.rect, d, this.P.rect);
		PixelUtil.multiplyBuffersPerChannel(this.P.channel, d);
		if (PixelUtil.bufferUniformValue(d, 0)) {
			alert("Selected area is empty.");
			return !1
		}
	}
	return !0
};

PsdDocument.prototype.ie = function() {
	if (this.yQ["r" + 1037] == null) this.Sn(30);
	return X.YU(this.yQ["r" + 1037], 0)
};

PsdDocument.prototype.Sn = function(l) {
	if (this.yQ["r" + 1037] == null) this.yQ["r" + 1037] = new Uint8Array(4);
	if (X.YU(this.yQ["r" + 1037], 0) == l) return;
	X.Mb(this.yQ["r" + 1037], 0, l);
	this.a3Y()
};

PsdDocument.prototype.Yf = function() {
	if (this.yQ["r" + 1049] == null) this.Q1(30);
	return X.YU(this.yQ["r" + 1049], 0)
};

PsdDocument.prototype.Q1 = function(l) {
	if (this.yQ["r" + 1049] == null) this.yQ["r" + 1049] = new Uint8Array(4);
	if (X.YU(this.yQ["r" + 1049], 0) == l) return;
	X.Mb(this.yQ["r" + 1049], 0, l);
	this.a3Y()
};

PsdDocument.prototype.Lu = function(l) {
	if (this.add.lnk2 == null) return null;
	for (var A = 0; A < this.add.lnk2.length; A++)
		if (this.add.lnk2[A].AN == l) return this.add.lnk2[A];
	return null
};

PsdDocument.prototype.akz = function(l) {
	var d = this.Lu(l);
	if (d == null) return !1;
	var G = FormatHandler.aJ(d.raw.buffer);
	if (G == null) return !1;
	if (FormatHandler.jA(G) != null || G == "psd") return !0;
	return !1
};

PsdDocument.prototype.a7 = function(l, d, G, b, V, Q) {
	var t = this.Lu(l);
	if (t == null) return null;
	t.LT(d, G, b, V, Q);
	if (t.hF) return t
};

PsdDocument.prototype.azG = function() {
	var l = this.m,
		d = this.n;
	if (WebGLContext.webglAvailable && this.tP == null) this.tP = new WebGLContext.RgbaTexture(l, d, !0);
	if (this.buffer == null || this.buffer.length != l * d * 4 || WebGLContext.webglAvailable && (this.tP.m != l || this.tP.n != d)) {
		this.buffer = PixelUtil.allocBytes(l * d * 4);
		if (this.tP) this.tP.delete();
		if (WebGLContext.webglAvailable) this.tP = new WebGLContext.RgbaTexture(l, d, !0)
	}
};

PsdDocument.prototype.a93 = function() {
	this.azG();
	if (WebGLContext.webglAvailable) {
		this.tP.set(this.buffer)
	}
};

PsdDocument.prototype.Po = function(l) {
	var d = this.m,
		G = this.n,
		b = new Rect(0, 0, d, G),
		V = this.ZV ? b : b.wD(this.Gg);
	this.azG();
	if (V.W6()) return;
	if (!V.XB(b)) {
		if (!WebGLContext.webglAvailable) {
			var Q = PixelUtil.getScratchByteBuffer(V.O() * 4);
			PixelUtil.blitRgbaRect(Q, V, this.buffer, b)
		}
		if (WebGLContext.webglAvailable) {
			WebGLContext.setFramebufferViewport(this.tP, V);
			WebGLContext.clearWithColorMask(0)
		}
	} else {
		if (WebGLContext.webglAvailable) {
			this.tP.set(null)
		} else {
			this.buffer.fill(0)
		}
	}
	var t = Date.now(),
		I = WebGLContext.webglAvailable ? this.tP : this.buffer;
	if (l == null) l = 1e9;
	var y = this.root.children;
	for (var A = 0; A < y.length; A++) {
		var e = y[A].j;
		if (e.zD() && e.add.artb && this.add.artd) {
			var M = e.dA(),
				R = V.wD(M),
				J = e.jL();
			if (J != 0) {
				if (WebGLContext.webglAvailable) {
					WebGLContext.setFramebufferViewport(I, R);
					WebGLContext.clearWithColorMask(J);
					WebGLContext.clearWithColorMask(J)
				} else PixelUtil.fillRectWithColor(I, b, R, J)
			}
		}
	}
	this.root.Zf(I, b, V, this, [], l);
	this.Ch = this.Gg.clone()
};

PsdDocument.prototype.V4 = function(l) {
	var d = new LayerRecord;
	d.rect = new Rect(0, 0, 0, 0);
	d.buffer = PixelUtil.allocBytes(1);
	d.add.luni = new Point2D(0, 0);
	if (l != !0) d.add.lyid = this.NE();
	d.add.lsct = LayerSectionType.none;
	d.add.lclr = 0;
	d.add.fxrp = new Point2D(0, 0);
	return d
};

PsdDocument.prototype.En = function(l) {
	var d = this.V4(l);
	d.tH("</Layer group>");
	d.add.lsct = LayerSectionType.divider;
	d.layerFlags = 24;
	return d
};
// True if document has unsaved changes (current position != position at last save)

PsdDocument.prototype.hasUnsavedChanges = function() {
	return this.historyIndex !== this.savedHistoryIndex
};
// Add a new history state (called after each undoable action). Drops any "future" states if we were not at tip.

PsdDocument.prototype.pushHistoryState = function(l) {
	while (this.history.length > this.historyIndex + 1) this.history.pop(); // discard redo branch
	if (this.savedHistoryIndex > this.historyIndex) this.savedHistoryIndex = -1;
	if (l.G.id != f.X6) {
		this.BE = !0;
		if (this.MV.lastAppliedComp) {
			delete this.MV.lastAppliedComp;
			this.bV = !0
		}
	}
	this.history.push(l);
	this.historyIndex++;
	this.bV = !0;
	// Cap history length: keep only last d non-skip (Wk) states (30 or 60)
	// Offline build: always treat as Premium
	var d = 60,
		G = 0;
	for (var A = this.history.length - 1; A >= 0; A--) {
		var b = this.history[A];
		if (b.skipInHistoryPanel) continue;
		G++;
		if (G == d) {
			this.historyIndex -= A;
			this.history = this.history.slice(A);
			break
		}
	}
	// event: canvas added
	var event = new Action(ActionTypes.E.hbi, !0);
	event.data = { type: "history-changed", doc: this };
	PP.dispatch(event);
};
// Current head state (only valid when at tip); used when building next state

PsdDocument.prototype.getHeadHistoryState = function() {
	if (this.historyIndex !== this.history.length - 1) return null;
	return this.history[this.history.length - 1]
};

PsdDocument.prototype.OM = function(l, d, G, b) {
	if (l == null) l = !1;
	var V = d != null ? [d] : this.g.slice(0);
	if (b) {
		var Q = [];
		for (var A = 0; A < V.length; A++) {
			var t = this.B[V[A]],
				I = t.folderStackIndex;
			if (t.layerLinkEnabled && I != 0 && Q.indexOf(I) == -1) Q.push(I)
		}
		if (Q.length != 0)
			for (var A = 0; A < this.B.length; A++) {
				var t = this.B[A],
					I = t.folderStackIndex;
				if (t.layerLinkEnabled && I != 0 && Q.indexOf(I) != -1 && V.indexOf(A) == -1) V.push(A)
			}
	}
	var y = [];
	for (var A = 0; A < V.length; A++) {
		var e = this.CL(V[A], l);
		for (var M = 0; M < e.length; M++)
			if (y.indexOf(e[M]) == -1) y.push(e[M]);
		if (G) {
			var hZ = this.root.O4(V[A]);
			while (hZ.parent != null && hZ.parent.parent != null) {
				hZ = hZ.parent;
				if (y.indexOf(hZ.index) == -1) {
					y.push(hZ.index, hZ.Vd)
				}
			}
		}
	}
	return y
};

PsdDocument.prototype.OB = function(l, d, G) {
	var b = this,
		V = b.OM(!1, l, null, G);
	V.sort(function(k, F) {
		return k - F
	});
	var Q = {};
	for (var t = 0; t < b.B.length; t++) {
		var I = b.B[t].getName();
		Q[I] = !0
	}
	var y = [];
	for (var A = 0; A < V.length; A++) {
		var e = b.B[V[A]].clone(),
			j, g;
		e.add.lyid = b.NE();
		e.add.lspf = 0;
		if (e.aW()) {
			var M = e.vZ(b),
				R = PsdDocument.aff(M);
			b.p_(R);
			e.add.SoLd.placed.v = R.id
		} else if (e.add.SoLd) {
			var J = e.add.SoLd.placed.v;
			e.add.SoLd.placed.v = PsdDocument.Xb(J.slice(0, 8)) + J.slice(8)
		}
		e.QJ(b);
		var n = e.getName(),
			r = n.length;
		while (48 <= n.charCodeAt(r - 1) && n.charCodeAt(r - 1) <= 57) r--;
		var T = parseInt(n.slice(r));
		if (isNaN(T)) {
			if (n.endsWith(" copy")) {
				T = 1;
				j = n.slice(0, n.length - 5)
			} else {
				T = 0;
				j = n
			}
		} else if (n.slice(0, r).endsWith(" copy ")) {
			T = T;
			j = n.slice(0, r - 6)
		} else {
			T = 0;
			j = n
		}
		T++;
		while (!0) {
			g = j + " copy" + (T == 1 ? "" : " " + T);
			if (Q[g] == null) break;
			T++
		}
		var Y = V.indexOf(this.root.O4(V[A]).parent.index) != -1;
		if (n == "Background" && b.B.length == 1) g = "Layer 1";
		if (d != !0 && !Y) e.tH(g);
		Q[g] = !0;
		y.push(e)
	}
	return y
};

PsdDocument.aff = function(l) {
	return {
		id: PsdDocument.Xb(l.id.slice(0, 8)) + l.id.slice(8),
		buffer: l.buffer.slice(0),
		rect: l.rect.clone(),
		z: l.z ? l.z.clone() : null
	}
};

PsdDocument.auv = function(l) {
	return {
		id: l,
		rect: new Rect,
		buffer: PixelUtil.allocBytes(1),
		z: new LayerRecord.LayerMask
	}
};

PsdDocument.HE = function(l, d) {
	if (d == null) d = {
		vmsk: new LayerRecord.VectorMask
	};
	if (d.vogk == null) {
		d.vogk = [];
		var G = PixelUtil.path.Mh(d.vmsk.i);
		for (var b = 0; b < G; b++) d.vogk.push(PixelUtil.X.UH())
	}
	return {
		name: l,
		sy: 0,
		add: d
	}
};

PsdDocument.prototype.LW = function(l) {
	var d = [],
		G = [],
		b = this;
	for (var A = 1; A < b.t_.length; A++) {
		var V = b.t_[A];
		V.sy = -1 - A;
		d.push(V);
		if (b.yK.indexOf(A) != -1) G.push(d.length - 1)
	}
	if (b.t_[0].add.vmsk.i.length > 2) {
		var V = b.t_[0];
		V.sy = -1;
		d.push(V);
		if (b.yK.indexOf(0) != -1) G.push(d.length - 1)
	}
	var Q = b.jP == null;
	if (Q) b.jP = [];
	for (var A = b.g.length - 1; A >= 0; A--) {
		var t = b.g[A],
			I = b.B[t],
			y = I.add.TySh;
		if (I.add.vmsk != null) {
			var V = PsdDocument.HE("\"" + I.getName() + "\" Shape Path", I.add);
			V.sy = t;
			d.push(V);
			if (Q && (I.VM || I.VF())) b.jP.push(t);
			if (b.jP.indexOf(t) != -1) G.push(d.length - 1)
		}
		if (l != !0 && y && y.add && PixelUtil.textWarp.T9(y.R8)) {
			var V = PsdDocument.HE("\"" + I.getName().slice(0, 10) + "..\" Text Path", y.add);
			V.sy = 1e6 + b.g[A];
			d.push(V);
			G.push(d.length - 1)
		}
	}
	if (G.length == 0 && l) {
		b.t_[0].sy = -1;
		b.yK = [0];
		G.push(d.length);
		d.push(b.t_[0])
	}
	return [d, G]
};

PsdDocument.prototype.CL = function(A, l) {
	var d = [],
		hZ = this.root.O4(A);
	if (hZ) hZ.Ou(d, l);
	return d
};

PsdDocument.prototype.vo = function() {
	this.root.Gx(this, new Rect(0, 0, this.m, this.n))
};

PsdDocument.prototype.g8 = function(l) {
	for (var A = 0; A < this.B.length; A++) {
		var d = this.B[A];
		if (l.indexOf(d) == -1) {
			d.hD.ap4();
			d.U()
		}
	}
	var G = 0;
	for (var A = 0; A < l.length; A++)
		if (l[A].add.artb) G++;
	this._8(G);
	this.B = l.slice(0);
	this.vp()
};

PsdDocument.prototype.vp = function() {
	var l = this.B,
		d = l.length;
	this.root = new LayerTreeNode;
	var G = this.V4(!0);
	G.blendModeKey = "pass";
	G.add.lsct = LayerSectionType.open;
	G.tH("");
	var b = this.En(!0),
		V = [b];
	for (var A = 0; A < d; A++) V.push(l[A]);
	V.push(G);
	this.root.anv(V, 0, 0);
	if (this.g.length == 0) this.g = [d - 1]
};

PsdDocument.prototype.rf = function() {
	if (this.g.length != 1) return;
	var l = this.root.O4(this.g[0]);
	while (l.parent != null) {
		var d = l.parent.j;
		d.add.lsct = LayerSectionType.open;
		l = l.parent
	}
	this.uK = this.a3x = !0
};

PsdDocument.prototype.a83 = function() {
	this.vp();
	var l = [this.root],
		k8 = 0;
	while (l.length != 0) {
		var top = l.pop();
		k8++;
		if (top.j.add.lsct == LayerSectionType.open)
			for (var A = 0; A < top.children.length; A++) l.push(top.children[A])
	}
	if (k8 > 1e3) {
		var d = this.root.children;
		for (var A = 0; A < d.length; A++)
			if (d[A].j.add.lsct == LayerSectionType.open) d[A].j.add.lsct = LayerSectionType.closed
	}
};

PsdDocument.Cy = function(l, d, G, b, V, Q, t, I) {
	if (I == null) I = "sRGB IEC61966-2.1";
	var y = {
		__name: "Make",
		classID: "Mk",
		Nw: {
			t: "Objc",
			v: {
				classID: "Dcmn",
				Nm: {
					t: "TEXT",
					v: b
				},
				artboard: {
					t: "bool",
					v: Q
				},
				Md: {
					t: "type",
					v: {
						classID: "RGBM"
					}
				},
				Wdth: {
					t: "UntF",
					v: {
						type: "#Rlt",
						val: l * 72 / G
					}
				},
				Hght: {
					t: "UntF",
					v: {
						type: "#Rlt",
						val: d * 72 / G
					}
				},
				Rslt: {
					t: "UntF",
					v: {
						type: "#Rsl",
						val: G
					}
				},
				pixelScaleFactor: {
					t: "doub",
					v: 1
				},
				Fl: {
					t: "enum",
					v: {
						Fl: V
					}
				},
				Dpth: {
					t: "long",
					v: 8
				},
				profile: {
					t: "TEXT",
					v: I
				}
			}
		}
	};
	if (V == "Clr") y.Nw.v.FlCl = {
		t: "Objc",
		v: t
	};
	return {
		kT: "make",
		a0: y
	}
};

PsdDocument.akm = function(l, d) {
	var G = 0,
		b = 0,
		V = 72,
		Q = d.al2,
		t = l.preset && l.preset.v == "Clipboard";
	if (t) {
		G = Q.m;
		b = Q.n
	} else {
		G = l.Wdth.v.val;
		b = l.Hght.v.val;
		V = l.Rslt.v.val;
		G = Math.round(G * V / 72);
		b = Math.round(b * V / 72)
	}
	var I = new PsdDocument((l.Nm ? l.Nm.v : "New Project") + ".psd");
	I.m = G;
	I.n = b;
	I.m7 = V;
	var y = l.Fl ? l.Fl.v.Fl : "Wht";
	if (l.artboard && l.artboard.v) {
		var e = I.V4();
		e.tH("Artboard 1");
		e.add.lsct = LayerSectionType.open;
		e.P3(new Rect(0, 0, G, b));
		e.add.artb.artboardBackgroundType = {
			t: "long",
			v: {
				Wht: 1,
				Blck: 2,
				Trns: 3,
				BckC: 1,
				Clr: 4
			}[y]
		};
		if (y == "Clr") e.add.artb.Clr = {
			t: "Objc",
			v: PixelUtil.color.rgbColorDescriptor(PixelUtil.color.sampleGradientColor(l.FlCl.v))
		};
		e.blendModeKey = "pass";
		e.layerFlags = 24;
		var M = I.V4();
		M.tH("Layer 1");
		I.g8([I.En(), M, e]);
		I._8(1);
		I.g = [1]
	} else {
		var R = I.V4(),
			J = 0;
		R.tH("Background");
		I.g8([R]);
		R.add.lspf = 1 << 2;
		if (y == "Clr") {
			J = PixelUtil.color.sampleGradientColor(l.FlCl.v);
			J = 255 << 24 | Math.round(J.k) << 16 | Math.round(J.J) << 8 | Math.round(J.o)
		} else {
			var n = d.GF;
			n = (n & 255) << 16 | (n >>> 8 & 255) << 8 | n >>> 16;
			J = {
				Trns: 0,
				Wht: 4294967295,
				Blck: 4278190080,
				BckC: 255 << 24 | n
			}[y]
		}
		R.rect = new Rect(0, 0, G, b);
		R.buffer = PixelUtil.allocBytes(G * b * 4);
		PixelUtil.andMaskUint32(R.buffer, J)
	}
	I.buffer = PixelUtil.allocBytes(G * b * 4);
	var r = l.profile;
	if (r) {
		var T = {
			"Adobe RGB (1998)": "icc/adobe",
			"ProPhoto RGB": "icc/prophoto",
			"image P3": "icc/displayp3"
		}[r.v];
		if (T) I.Dm(FormatHandler.RT.get(T))
	}
	return I
};

