
function FontHelper(l) {
	EventEmitter.call(this);
	this.tD = {};
	this.Dk = {};
	this.aqw = 0;
	this.akW = {};
	this.Ws = [];
	this.aj1 = 0;
	this.uw = l;
	FontHelper.pa = this
}

FontHelper.a4K = function(l, d) {
	var A = 0,
		G = FontHelper.Uq;
	while (A < G.length) {
		if ((d >>> A & 1) == 1) break;
		A++
	}
	if (A != 0 && FontHelper.LS(l, [33, 126]) > .7) A = 0;
	if (d == 0 || G[A][1] == "") {
		if ((d & 15) != 0 && FontHelper.LS(l, [33, 126]) > .7) A = 0;
		else if (d == 0) A = 0;
		else {
			A = 0
		}
	}
	return G[A][1]
};

FontHelper.IM = 120;

FontHelper.vm = 20;

FontHelper.cols = 16;

FontHelper.Ot = function(l) {
	var d = l.name.postScriptName;
	if (d == null) return null;
	return d.replace(/ /g, "-")
};

FontHelper.SY = function(l) {
	var d = l.name,
		G = d.typoFamilyName,
		b = d.typoSubfamilyName,
		V = G & b,
		Q = V ? G : d.fontFamily,
		t = V ? b : d.fontSubfamily;
	if (t == null) t = "Regular";
	var I = FontHelper.a3d,
		y = Q.toLowerCase();
	for (var A = 0; A < I.length; A++) {
		if (I[A] == "roman") continue;
		if (y.endsWith(" " + I[A]) || y.endsWith("-" + I[A])) {
			var e = Q.length - I[A].length,
				M = Q.slice(e);
			Q = Q.slice(0, e - 1);
			if (M != "") {
				if (t == "Regular" || t == Q + " Regular") t = M;
				else t = M + " " + t
			}
			break
		}
	}
	var R = "BPdots,Baloo,Diner,EB Garamond Initials,Encode Sans Semi Condensed,Encode Sans Semi Expanded,Changa,HVD Poster,IM FELL DW,IM FELL Double,IM FELL English,IM FELL FLOWERS,IM FELL French Canon,IM FELL Great Primer,itsadzoke,JUICE,Lacuna,Latin Modern Mono,Latin Modern Sans,Latin Modern Roman,Latinia,Libre Barcode,Libre Caslon,Londrina,Panefresco,Qomolangma,UnifrakturMaguntia,WC Rhesus,WC Sold Out,WC Wunderbach,Walkway".split(",");
	for (var A = 0; A < R.length; A++)
		if (Q.startsWith(R[A])) {
			var M = Q.slice(R[A].length);
			Q = R[A];
			if (M.startsWith(" ") || M.startsWith("-")) M = M.slice(1);
			if (M != "") {
				if (t == "Regular") t = M;
				else t = M + " " + t
			}
			break
		}
	var J = {
			"Caudex-BoldItalic": "Bold Italic",
			"Comfortaa-Light": "Light",
			"Comfortaa-Medium": "Medium",
			"Comfortaa-SemiBold": "SemiBold",
			DevroyeSCOSF: "Regular SCOSF",
			DevroyeUnicode: "Regular Unicode",
			"LeagueScriptThin-Regular": "Regular",
			"Monda-Bold": "Bold",
			"Nobile-Bold": "Bold",
			"Oswald-BoldItalic": "Bold Italic",
			"Oswald-HeavyItalic": "Heavy Italic",
			"Oswald-LightItalic": "Light Italic",
			"Oswald-MediumItalic": "Medium Italic",
			"Oswald-RegularItalic": "Regular Italic",
			"PaloAlto-Italic": "Heavy Italic"
		},
		n = J[FontHelper.Ot(l)];
	if (n) t = n;
	return [Q, t]
};

FontHelper.prototype.acA = function(l) {
	var d = this.H7();
	for (var G in d)
		if (d[G][0] == l) this.U6(G)
};

FontHelper.prototype.a2w = function() {
	return Object.keys(this.Dk).length != 0
};

FontHelper.prototype.U6 = function(l, d) {
	if (this.tD[l]) return this.tD[l];
	if (this.Dk[l]) return null;
	var G = null,
		b = this.H7();
	if (b[l] != null) G = b[l][5];
	if (G == null) {
		var V = FontHelper.bR[l];
		if (V == null) {
			var Q = "DejaVuSans DejaVuSans-Bold DejaVuSans-Oblique DejaVuSans-BoldOblique DejaVuSerif DejaVuSerif-Bold DejaVuSerif-Italic DejaVuSerif-BoldItalic".split(" "),
				t = l.toLowerCase(),
				I = 0;
			if (t.indexOf("sans") != -1) I = 0;
			else if (t.indexOf("serif") != -1) I = 4;
			var y = t.indexOf("bold") != -1 || t.indexOf("-black") != -1,
				e = t.indexOf("italic") != -1 || t.indexOf("oblique") != -1 || t.endsWith("-it");
			if (y && e) I += 3;
			else if (e) I += 2;
			else if (y) I += 1;
			V = Q[I]
		}
		if (d != null && d > 128) V = this.c0(d, V);
		if (this.akW[l] == null) {
			this.akW[l] = 1;
			var M = Date.now() - this.aqw > 2e3 ? 2e3 : 0;
			this.aqw = Date.now();
			alert(l + " \u27A1 " + V, M)
		}
		return this.U6(V, d)
	}
	this.Dk[l] = "a";
	this.uw(G)
};

FontHelper.prototype.c0 = function(l, d, G) {
	var b = this.tD[d];
	if (b && Typr.U.codeToGlyph(b, l) != 0) return d;
	var V = this.H7(),
		Q = FontHelper.a6w(l),
		t = Q[0];
	if (V[d] && (V[d][3] & t) == 0) {
		if (G)
			for (var A = 0; A < G.length; A++) {
				var I = G[A].Name,
					y = V[I];
				if (y && (y[3] & t) != 0) return I
			}
		var I = FontHelper.Uq[Q[1]][4];
		if (V[I]) return I
	}
	return d
};

FontHelper.a6w = function(l) {
	var d = FontHelper.Uq,
		G = [0];
	for (var A = 0; A < d.length; A++) {
		var b = d[A][2];
		for (var V = 0; V < b.length; V += 2)
			if (b[V] <= l && l <= b[V + 1]) {
				G[0] += 1 << A;
				G.push(A)
			}
	}
	if (G.length == 1) G.push(0);
	return G
};

FontHelper.prototype.apM = function() {
	var l = this.Ws,
		d = l[0],
		G = l.length - 1;
	// hbi
	// alert("Font" + " " + d + (G == 0 ? "" : ", ... (" + G + ")") + " " + "loaded" + ".", 1500);
	this.Ws = []
};

FontHelper.prototype.aym = function(l, d) {
	if (d != !0) {
		this.Ws.push(l.name.fullName);
		clearTimeout(this.aj1);
		this.aj1 = setTimeout(this.apM.bind(this), 300)
	}
	var G = FontHelper.Ot(l),
		b = this.H7(),
		V = b[G],
		Q = FontHelper.azt(l);
	if (V == null) {
		var t = document.createElement("canvas"),
			I = t.getContext("2d", { willReadFrequently: true });
		t.width = FontHelper.IM;
		t.height = FontHelper.vm;
		var y = FontHelper.vm * 1.2 / l.head.unitsPerEm;
		I.translate(4, FontHelper.vm * .9);
		I.scale(y, -y);
		I.fillStyle = "#000000";
		var e = Typr.U.shape(l, FontHelper.a4K(l, Q[3]), !0);
		Typr.U.pathToContext(Typr.U.shapeToPath(l, e), I);
		I.fill();
		Q.a1u = t.toDataURL();
		this.Z7(Q)
	}
	delete this.Dk[G];
	this.tD[G] = l
};

FontHelper.a4q = function() {
	var l = FontHelper.Uq,
		d = [];
	for (var A = 0; A < l.length; A++) d.push(l[A][0]);
	return d
};

FontHelper.Uq = [
	["Latin-1", "Preview", [161, 169, 192, 246, 248, 255], .7, "DejaVuSans"],
	["Latin Ext. A", "", [256, 383], .7, "DejaVuSans"],
	["Greek", "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC", [913, 929, 931, 969], .7, "DejaVuSans"],
	["Cyrillic", "\u041F\u0440\u0438\u0432\u0435\u0442", [1040, 1119], .7, "DejaVuSans"],
	["Hebrew", "\u05E2\u05D1\u05E8\u05D9\u05EA", [1473, 1479, 1488, 1514, 1520, 1524], .7, "DejaVuSans"],
	["Arabic", "\u0627\u064E\u0644\u0652\u0639\u064E\u0631\u064E\u0628\u0650\u064A\u064E\u0651\u0629\u064F", [1569, 1594, 1600, 1749], .4, "DejaVuSans"],
	["Hangul", "\uC608\uACE0\uD3B8", [4352, 4607, 44032, 55203, 12593, 12686], .7, "NotoSansKR-Regular"],
	["Chi-Jap-Kor", "\u9810\u7FD2", [12288, 12351, 12352, 12447, 12448, 12543, 19968, 40895], .05, "DroidSansFallback"],
	["Tibetan", "\u0F50\u0F74\u0F42\u0F66\u0F0B\u0F62\u0F97\u0F7A\u0F0B\u0F46\u0F7A\u0F0D", [3840, 3948, 3953, 4044], .7, "NotoSansTibetan"],
	["Devanagari", "\u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928", [2304, 2431], .7, "Hind-Regular"],
	["Thai", "\u0E20\u0E32\u0E1E\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07", [3585, 3642, 3647, 3675], .7, "K2D-Regular"],
	["Khmer", "\u1798\u17BE\u179B\u1787\u17B6\u1798\u17BB\u1793", [6016, 6109, 6112, 6121, 6128, 6137], .7, "Battambang-Regular"],
	["Vietnamese", "Xem tr\u01B0\u1EDBc", [192, 195, 200, 202, 204, 205, 210, 213, 217, 218, 221, 221, 224, 227, 232, 234, 236, 237, 242, 245, 249, 250, 253, 253, 258, 259, 272, 273, 296, 297, 360, 361, 416, 417, 431, 432, 7840, 7929], .95, "DejaVuSans"],
	["Bengali", "\u09B8\u09CD\u09AC\u09BE\u09A7\u09C0\u09A8\u09AD\u09BE\u09AC\u09C7", [2432, 2559], .2, "FreeSans"],
	["Emoji", "", [9728, 10095, 127744, 129535], .01, "DejaVuSans"]
];

FontHelper.azt = function(l, d, G) {
	var b = l.name,
		y = 0;
	if (FontHelper.Ot(l) == null) {
		console.log(l);
		throw "No postScriptName!"
	}
	var V = FontHelper.Uq,
		Q = [];
	for (var A = 0; A < V.length; A++) {
		var t = V[A][2],
			I = V[A][3];
		Q[A] = FontHelper.LS(l, t) > I ? 1 : 0
	}
	for (var A = 0; A < Q.length; A++) y += Q[A] << A;
	var e = FontHelper.SY(l);
	return [e[0], e[1], FontHelper.Ot(l), y, G, d]
};

FontHelper.LS = function(l, d) {
	var G = 0,
		b = 0;
	for (var V = 0; V < d.length; V += 2) {
		for (var Q = d[V]; Q <= d[V + 1]; Q++) {
			var t = Typr.U.codeToGlyph(l, Q);
			if (t == 0) b++;
			else G++
		}
	}
	return G / (G + b)
};

FontHelper.aml = function(l, d) {
	if (l[2] < d[2]) return -1;
	if (l[2] > d[2]) return 1;
	return 0
};

FontHelper.afU = function(l, d) {
	if (l[5] == "fs/" + l[2] + ".otf") l[5] = "";
	else if (l[5] == "gf/" + l[2] + ".otf") l[5] = "a";
	if (l[2] == (l[0] + "-" + l[1]).replace(/\s/g, "")) {
		l[2] = ""
	} else if (l[2] == l[0].replace(/\s/g, "")) {
		l[2] = "a"
	}
	if (d) {
		if (l[0] == d[0]) l[0] = "";
		if (l[1] == d[1]) l[1] = "";
		if (l[3] == d[3]) l[3] = "";
		if (l[4] == d[4]) l[4] = ""
	}
	return l.join(",")
};

FontHelper.a2B = function(l, d) {
	l = l.split(",");
	if (l[0] == "") l[0] = d[0];
	if (l[1] == "") l[1] = d[1];
	if (l[3] == "") l[3] = d[3];
	else l[3] = parseInt(l[3]);
	if (l[4] == "") l[4] = d[4];
	else l[4] = parseInt(l[4]);
	if (l[2] == "") l[2] = (l[0] + "-" + l[1]).replace(/\s/g, "");
	else if (l[2] == "a") l[2] = l[0].replace(/\s/g, "");
	if (l[5] == "") l[5] = "fs/" + l[2] + ".otf";
	else if (l[5] == "a") l[5] = "gf/" + l[2] + ".otf";
	return l
};

FontHelper.bR = {
	ArialMT: "LiberationSans",
	"Arial-BoldMT": "LiberationSans-Bold",
	"Arial-ItalicMT": "LiberationSans-Italic",
	"Arial-BoldItalicMT": "LiberationSans-BoldItalic",
	TimesNewRomanPSMT: "LiberationSerif",
	"TimesNewRomanPS-BoldMT": "LiberationSerif-Bold",
	"TimesNewRomanPS-ItalicMT": "LiberationSerif-Italic",
	"TimesNewRomanPS-BoldItalicMT": "LiberationSerif-BoldItalic",
	CourierNewPSMT: "CourierPrime",
	"CourierNewPS-BoldMT": "CourierPrime-Bold",
	"CourierNewPS-ItalicMT": "CourierPrime-Italic",
	"CourierNewPS-BoldItalicMT": "CourierPrime-BoldItalic",
	Courier: "CourierPrime",
	"Courier-Bold": "CourierPrime-Bold",
	TrebuchetMS: "SourceSansPro-Regular",
	"TrebuchetMS-Bold": "SourceSansPro-Semibold",
	"TrebuchetMS-Italic": "SourceSansPro-It",
	"TrebuchetMS-BoldItalic": "SourceSansPro-SemiboldIt",
	"Times-Roman": "LiberationSerif",
	Impact: "Anton-Regular",
	Calibri: "SourceSansPro-Regular",
	"Calibri-Italic": "SourceSansPro-It",
	"Calibri-Bold": "SourceSansPro-Bold",
	CalibriBold: "SourceSansPro-Bold",
	"Times-Roman": "LiberationSerif",
	"Times-Italic": "LiberationSerif-Italic",
	"Times-Bold": "LiberationSerif-Bold",
	"Helvetica-Bold": "LiberationSans-Bold",
	"HelveticaNeue-Thin": "Roboto-Thin",
	"HelveticaNeue-Light": "Roboto-Light",
	HelveticaNeue: "Roboto-Regular",
	"HelveticaNeue-Roman": "Roboto-Regular",
	"HelveticaNeue-Medium": "Roboto-Medium",
	"HelveticaNeue-Bold": "Roboto-Bold",
	"HelveticaNeue-BoldItalic": "Roboto-BoldItalic",
	"HelveticaNeue-Black": "Roboto-Black",
	"HelveticaNeue-Heavy": "Roboto-Black",
	"BasisGrotesque-Regular": "Roboto-Regular",
	"BasisGrotesque-Medium": "Roboto-Medium",
	"BasisGrotesque-Bold": "Roboto-Bold",
	ElementaPro: "FreeMono",
	"ElementaPro-Bold": "FreeMonoBold",
	"SFProText-Light": "Roboto-Light",
	"SFProText-Regular": "Roboto-Regular",
	"SFProText-Roman": "Roboto-Regular",
	"SFProText-Medium": "Roboto-Medium",
	"SFProText-Semibold": "Roboto-Medium",
	"SFProText-Bold": "Roboto-Bold",
	"SFProText-BoldItalic": "Roboto-BoldItalic",
	"SFProText-Black": "Roboto-Black",
	"SFProText-Heavy": "Roboto-Black",
	"SFProDisplay-Light": "Roboto-Light",
	"SFProDisplay-Regular": "Roboto-Regular",
	"SFProDisplay-Roman": "Roboto-Regular",
	"SFProDisplay-Medium": "Roboto-Medium",
	"SFProDisplay-Semibold": "Roboto-Medium",
	"SFProDisplay-Bold": "Roboto-Bold",
	"SFProDisplay-BoldItalic": "SFProDisplay-BoldItalic",
	"SFProDisplay-Black": "Roboto-Black",
	"SFProDisplay-Heavy": "Roboto-Black",
	"SFUIText-Light": "Roboto-Light",
	"SFUIText-Regular": "Roboto-Regular",
	"SFUIText-Roman": "Roboto-Regular",
	"SFUIText-Medium": "Roboto-Medium",
	"SFUIText-Semibold": "Roboto-Medium",
	"SFUIText-Bold": "Roboto-Bold",
	"SFUIText-BoldItalic": "SFUIText-BoldItalic",
	"SFUIText-Black": "Roboto-Black",
	"SFUIText-Heavy": "Roboto-Black",
	Verdana: "DejaVuSans",
	"Verdana-Bold": "DejaVuSans-Bold",
	"Verdana-Italic": "DejaVuSans-Oblique",
	"Verdana-BoldItalic": "DejaVuSans-BoldOblique",
	"MyriadPro-Regular": "PTSans-Regular",
	"MyriadPro-Bold": "PTSans-Bold",
	"MyriadPro-LightIt": "PTSans-Italic",
	"MyriadPro-Semibold": "PTSans-Bold",
	"MyriadPro-Black": "PTSans-Bold",
	"MyriadPro-BlackCond": "PTSans-NarrowBold",
	"MyriadPro-SemiboldCond": "PTSans-NarrowBold",
	"MyriadPro-BoldCond": "PTSans-NarrowBold",
	Cambria: "Oranienbaum-Regular",
	Georgia: "CharisSIL",
	"Georgia-Bold": "CharisSIL-Bold",
	"Georgia-Italic": "CharisSIL-Italic",
	"Georgia-BoldItalic": "CharisSIL-BoldItalic",
	"AGaramondPro-Regular": "EBGaramond08-Regular",
	"AGaramondPro-Bold": "EBGaramond08-Bold",
	"AGaramondPro-Italic": "EBGaramond08-Italic",
	Garamond: "EBGaramond08-Regular",
	FontAwesome: "FontAwesome5FreeSolid",
	"ProximaNova-Regular": "Metropolis-Regular",
	"ProximaNova-Semibold": "Metropolis-SemiBold",
	"ProximaNova-Light": "Metropolis-Light",
	BellMT: "GalatiaSIL",
	"MinionPro-Regular": "CrimsonText-Regular",
	"LyonDisplay-Medium": "Buenard-Regular",
	"LyonText-Regular": "Buenard-Regular",
	"LyonDisplay-Black": "Buenard-Bold",
	"LyonText-Bold": "Buenard-Bold",
	"Interstate-Light": "Overpass-Light",
	"Interstate-Regular": "Overpass-Regular",
	"Interstate-Bold": "Overpass-Bold",
	"Interstate-BlackCondensed": "Overpass-Black",
	PalatinoLinotype: "TeXGyrePagella-Regular",
	"PalatinoLinotype-Bold": "TeXGyrePagella-Bold",
	"PalatinoLinotype-Italic": "TeXGyrePagella-Italic",
	"PalatinoLinotype-BoldItalic": "TeXGyrePagella-BoldItalic"
};

FontHelper.prototype.H7 = function() {
	if (FNTS.map == null) {
		var l = FNTS.list,
			d = [];
		for (var A = 0; A < l.length; A++) {
			d[A] = FontHelper.a2B(l[A], d[A - 1]);
			d[A].sy = A;
			this.Z7(d[A])
		}
	}
	return FNTS.map
};

FontHelper.prototype.Z7 = function(l) {
	var d = l[0],
		G = l[1],
		b = l[5];
	if (FNTS.map == null) FNTS.map = {};
	FNTS.map[l[2]] = l;
	if (FNTS.mapFS == null) FNTS.mapFS = {};
	var V = FNTS.mapFS[d + "---" + G];
	FNTS.mapFS[d + "---" + G] = l;
	if (FNTS.mapSub == null) FNTS.mapSub = {};
	var Q = FNTS.mapSub[d];
	if (Q == null) Q = FNTS.mapSub[d] = [];
	var t = Q.indexOf(G);
	if (t == -1) Q.push(G);
	else Q[t] = G
};

FontHelper.aok = function(l, d) {
	return FontHelper.Hy(l) - FontHelper.Hy(d)
};

FontHelper.Hy = function(l) {
	l = l.toLowerCase();
	var d = FontHelper.axh(l) + (FontHelper.awE(l) << 1);
	if (l.indexOf("cond") == -1) d += 1 << 25;
	return d
};

FontHelper.axh = function(l) {
	return l.indexOf("italic") != -1 || l.indexOf("oblique") != -1 ? 1 : 0
};

FontHelper.a3d = "two,four,eight,hair,thin,ultralight,extralight,exlight,light,regular,roman,book,medium,semi bold,semibold,demibold,extra bold,extrabold,bold,heavy,ultra,x black,black,extra".split(",");

FontHelper.a76 = ["two", "four", "eight", "hair", "thin", "ultralight", "extralight", "light", ["regular", "roman", "book"], "medium", ["semibold", "demibold"], "bold", "extrabold", "heavy", "ultra", "black", "x black"];

FontHelper.awE = function(l) {
	var d = FontHelper.a76,
		G = -1,
		b = -1;
	for (var A = 0; A < d.length; A++) {
		var V = d[A];
		if (V instanceof Array)
			for (var Q = 0; Q < V.length; Q++) {
				var t = V[Q];
				if (l.indexOf(t) != -1 && (G == -1 || b < t.length)) {
					G = A;
					b = t.length
				}
			} else if (l.indexOf(V) != -1 && (G == -1 || b < V.length)) {
				G = A;
				b = V.length
			}
	}
	if (G == -1) G = 8;
	return G
};

FontHelper.bw = function(l, d) {
	var G = 1e9,
		b = null,
		V = FontHelper.Hy(d);
	for (var A = 0; A < l.length; A++) {
		var Q = Math.abs(FontHelper.Hy(l[A]) - V);
		if (Q < G) {
			G = Q;
			b = l[A]
		}
	}
	return b
};

FontHelper.prototype.FX = function(l, d) {
	this.H7();
	return FNTS.mapFS[l + "---" + d]
};

FontHelper.prototype.Th = function(l) {
	this.H7();
	return FNTS.mapSub[l]
};

FontHelper.prototype.OV = function() {
	this.H7();
	return FNTS.mapSub
};
